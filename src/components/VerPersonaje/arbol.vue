<template>
  <div class="w-full h-[600px] relative" ref="box"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";
import arbolData from "../../assets/arbol.json";
import atributosData from "../../assets/atributos.json";
import activasData from "../../assets/activas.json";

// Props
const props = defineProps<{
  arbolData: string; // JSON string con los nodos seleccionados
}>();

const box = ref<HTMLDivElement | null>(null);
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: MapControls;
let rafId = 0;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clickables: THREE.Object3D[] = [];

let circles: THREE.Mesh[] = [];
let connections: THREE.Line[] = [];
let tooltip: HTMLElement | null = null;

// Parse selected nodes from prop
const selectedNodeIds = ref<number[]>([]);

watch(
  () => props.arbolData,
  (newData) => {
    if (newData) {
      try {
        const parsed = JSON.parse(newData);
        selectedNodeIds.value = parsed.map((node: any) => node.nodeId);
        updateNodeVisuals();
      } catch (error) {
        console.error("Error parsing arbol data:", error);
      }
    }
  },
  { immediate: true },
);

function init() {
  const el = box.value!;
  const width = el.clientWidth;
  const height = el.clientHeight;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0xf3f4f6);
  el.appendChild(renderer.domElement);

  // Add mouse event listener only for tooltip
  renderer.domElement.addEventListener("mousemove", onMouseMove);

  // Scene
  scene = new THREE.Scene();

  const aspect = width / height;
  camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 2000);
  const cameraDistance = 250;
  camera.position.set(0, cameraDistance, 0);
  camera.lookAt(0, 0, 0);

  // Controls
  controls = new MapControls(camera, renderer.domElement);
  controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY };
  controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2.5;
  controls.minDistance = 80;
  controls.maxDistance = 250;
  controls.enableDamping = true;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
  dirLight.position.set(10, 20, 15);
  scene.add(dirLight);

  // Create text sprite function
  function createTextSprite(text: string, color = "#ffffff", fontSize = 180) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    canvas.width = 1024;
    canvas.height = 1024;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `bold ${fontSize}px Arial`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.strokeStyle = "#000000";
    context.lineWidth = 12;
    context.strokeText(text, canvas.width / 2, canvas.height / 2);

    context.fillStyle = color;
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.05,
      depthTest: false,
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(16, 16, 1);

    return sprite;
  }

  // Helper functions
  function getDiminutivo(atributoId: string | number, shape: string): string {
    const id =
      typeof atributoId === "string" ? parseInt(atributoId) : atributoId;

    if (shape === "circle") {
      const atributo = atributosData.caracteristicasSecundarias.find(
        (a) => a.id === id,
      );
      return atributo?.diminutivo || "";
    } else {
      const activa = activasData.activas.find((a) => a.id === id);
      return activa?.diminutivo || "";
    }
  }

  function getDescription(atributoId: string | number, shape: string): string {
    const id =
      typeof atributoId === "string" ? parseInt(atributoId) : atributoId;

    if (shape === "circle") {
      const atributo = atributosData.caracteristicasSecundarias.find(
        (a) => a.id === id,
      );
      return atributo?.descripcion || "";
    } else {
      const activa = activasData.activas.find((a) => a.id === id);
      return activa?.descripcion || "";
    }
  }

  // Build layers
  const rSmall = 8;
  const layerSizes = [3, 12, 24, 24];
  const layerRadii = [15, 45, 90, 135];

  const layers: Array<{
    count: number;
    radius: number;
    skills: string[];
    shape: string[];
    nodeData: Array<{ id: number; atributo: string }>;
  }> = layerSizes.map((count, idx) => ({
    count,
    radius: layerRadii[idx],
    skills: new Array(count).fill(""),
    shape: new Array(count).fill("circle"),
    nodeData: new Array(count).fill(null),
  }));

  // Populate layers
  arbolData.arbol.nodos.forEach((nodo) => {
    const layer = layers[nodo.layer];
    if (layer && nodo.posicion < layer.count) {
      const diminutivo = getDiminutivo(nodo.atributo, nodo.shape);
      layer.skills[nodo.posicion] = diminutivo;
      layer.shape[nodo.posicion] = nodo.shape;
      layer.nodeData[nodo.posicion] = { id: nodo.id, atributo: nodo.atributo };
    }
  });

  // Create curved line
  function createCurvedLine(
    start: THREE.Vector3,
    end: THREE.Vector3,
    isRadial = false,
  ) {
    const points = [];
    const segments = 50;

    if (isRadial) {
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const point = start.clone().lerp(end, t);
        point.y = -0.1;
        points.push(point);
      }
    } else {
      const center = new THREE.Vector3(0, 0, 0);
      const radius = start.distanceTo(center);

      const startAngle = Math.atan2(start.z, start.x);
      const endAngle = Math.atan2(end.z, end.x);

      let angleDiff = endAngle - startAngle;
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const angle = startAngle + angleDiff * t;
        const point = new THREE.Vector3(
          Math.cos(angle) * radius,
          -0.1,
          Math.sin(angle) * radius,
        );
        points.push(point);
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.7,
      depthTest: true,
      depthWrite: false,
    });
    return new THREE.Line(geometry, material);
  }

  const circlePositions: THREE.Vector3[][] = [];

  // Create circles
  layers.forEach((layer, layerIndex) => {
    const step = (2 * Math.PI) / layer.count;
    const layerPositions: THREE.Vector3[] = [];

    for (let i = 0; i < layer.count; i++) {
      const nodeData = layer.nodeData[i];

      if (!nodeData) {
        layerPositions.push(new THREE.Vector3(0, 0, 0));
        continue;
      }

      const theta = i * step;
      const position = new THREE.Vector3(
        Math.cos(theta + Math.PI / 6) * layer.radius,
        0.1,
        Math.sin(theta + Math.PI / 6) * layer.radius,
      );

      if (layer.shape && layer.shape[i] === "square") {
        const square = new THREE.Mesh(
          new THREE.BoxGeometry(rSmall * 2, 1, rSmall * 2),
          new THREE.MeshBasicMaterial({
            color: 0x4a90e2,
            side: THREE.DoubleSide,
          }),
        );

        square.position.copy(position);
        layerPositions.push(position.clone());

        const skillName = layer.skills[i] || "";
        const description = getDescription(nodeData.atributo, "square");

        square.userData = {
          nodeId: nodeData.id,
          skillName: skillName,
          description: description,
          originalColor: 0x4a90e2,
          selectedColor: 0x00ff00,
          type: "square",
          layer: layerIndex,
          index: i,
        };

        scene.add(square);
        circles.push(square);
        clickables.push(square);

        if (skillName) {
          const textSprite = createTextSprite(skillName, "#ffffff", 350);
          textSprite.position.copy(square.position);
          scene.add(textSprite);
        }
      } else {
        const circle = new THREE.Mesh(
          new THREE.CircleGeometry(rSmall, 64),
          new THREE.MeshBasicMaterial({
            color: 0x4a90e2,
            side: THREE.DoubleSide,
          }),
        );

        circle.rotation.x = -Math.PI / 2;
        circle.position.copy(position);
        layerPositions.push(position.clone());

        const skillName = layer.skills[i] || "";
        const description = getDescription(nodeData.atributo, "circle");

        circle.userData = {
          nodeId: nodeData.id,
          skillName: skillName,
          description: description,
          originalColor: 0x4a90e2,
          selectedColor: 0x00ff00,
          type: "circle",
          layer: layerIndex,
          index: i,
        };

        scene.add(circle);
        circles.push(circle);
        clickables.push(circle);

        if (skillName) {
          const textSprite = createTextSprite(skillName, "#ffffff", 350);
          textSprite.position.copy(circle.position);
          scene.add(textSprite);
        }
      }
    }

    circlePositions.push(layerPositions);
  });

  // Create connections
  const nodeIdToPosition = new Map<
    number,
    { layer: number; position: number }
  >();
  arbolData.arbol.nodos.forEach((nodo) => {
    nodeIdToPosition.set(nodo.id, {
      layer: nodo.layer,
      position: nodo.posicion,
    });
  });

  function getCirclePosition(
    layerIndex: number,
    circleIndex: number,
  ): THREE.Vector3 | null {
    if (layerIndex < 0 || layerIndex >= circlePositions.length) return null;
    const layer = circlePositions[layerIndex];
    if (!layer || circleIndex < 0 || circleIndex >= layer.length) return null;
    return layer[circleIndex].clone();
  }

  arbolData.arbol.conexiones.forEach((conexion) => {
    const origen = nodeIdToPosition.get(conexion.origen);
    const destino = nodeIdToPosition.get(conexion.destino);

    if (origen && destino) {
      const startPos = getCirclePosition(origen.layer, origen.position);
      const endPos = getCirclePosition(destino.layer, destino.position);

      if (startPos && endPos) {
        const isRadial = origen.layer !== destino.layer;
        const connection = createCurvedLine(startPos, endPos, isRadial);
        scene.add(connection);
        connections.push(connection);
      }
    }
  });

  // Update node colors based on selection
  updateNodeVisuals();
}

function updateNodeVisuals() {
  circles.forEach((mesh) => {
    const isSelected = selectedNodeIds.value.includes(mesh.userData.nodeId);
    (mesh.material as THREE.MeshBasicMaterial).color.setHex(
      isSelected ? mesh.userData.selectedColor : mesh.userData.originalColor,
    );
  });
}

function onMouseMove(event: MouseEvent) {
  const rect = renderer!.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickables);

  if (intersects.length > 0) {
    const object = intersects[0].object as THREE.Mesh;
    showTooltip(event, object);
    renderer!.domElement.style.cursor = "pointer";
  } else {
    hideTooltip();
    renderer!.domElement.style.cursor = "default";
  }
}

function showTooltip(event: MouseEvent, object: THREE.Mesh) {
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.style.cssText = `
      position: fixed;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      pointer-events: none;
      z-index: 1000;
      max-width: 200px;
      line-height: 1.4;
    `;
    document.body.appendChild(tooltip);
  }

  tooltip.innerHTML = `
    <strong>${object.userData.skillName}</strong><br>
    <small>${object.userData.description}</small><br>
    <em>Tipo: ${object.userData.type === "circle" ? "Pasiva" : "Activa"}</em>
  `;

  tooltip.style.left = event.clientX + 10 + "px";
  tooltip.style.top = event.clientY - 10 + "px";
  tooltip.style.display = "block";
}

function hideTooltip() {
  if (tooltip) {
    tooltip.style.display = "none";
  }
}

function animate() {
  rafId = requestAnimationFrame(animate);
  controls.update();
  renderer!.render(scene, camera);
}

function dispose() {
  cancelAnimationFrame(rafId);
  controls.dispose();

  scene.traverse((object: THREE.Object3D) => {
    if (object instanceof THREE.Mesh) {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material: THREE.Material) => {
            material.dispose();
          });
        } else {
          (object.material as THREE.Material).dispose();
        }
      }
    }
  });

  if (tooltip) {
    document.body.removeChild(tooltip);
    tooltip = null;
  }

  if (renderer?.domElement) {
    renderer.domElement.removeEventListener("mousemove", onMouseMove);
  }

  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
    renderer = null;
  }
}

onMounted(() => {
  if (box.value) {
    init();
    animate();
  }
});

onBeforeUnmount(() => {
  dispose();
});
</script>

<style scoped></style>
