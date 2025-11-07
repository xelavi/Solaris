<template>
  <div ref="box" class="w-250 h-250 relative"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";

const box = ref<HTMLDivElement | null>(null);
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: MapControls;
let rafId = 0;
let baseColor = 0xbcbcbc;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickables: THREE.Object3D[] = [];
let hovered: THREE.Mesh | null = null;
let selected: THREE.Mesh | null = null;

// Mouse interaction variables
const mouse = new THREE.Vector2();
let tooltip: HTMLElement | null = null;

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

  // Add mouse event listeners
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('click', onClick);

  // Escena
  scene = new THREE.Scene();

  const aspect = width / height;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000); // FIX
  const cameraDistance = 200;
  camera.position.set(0, cameraDistance, 0);
  camera.lookAt(0, 0, 0);

  // === Controles tipo Diablo/LoL ===
  controls = new MapControls(camera, renderer.domElement);
  controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY };
  controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2.5;
  controls.enableDamping = true;

  // Luz
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Brighter ambient
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5); // Brighter directional
  dirLight.position.set(10, 20, 15);
  dirLight.castShadow = false; // Shadows can be expensive, disable for now
  scene.add(dirLight);

  const base = new THREE.Mesh(
    new THREE.CircleGeometry(100, 200),
    new THREE.MeshStandardMaterial({ color: baseColor })
  );
  base.rotation.x = -Math.PI / 2;
 // scene.add(base);

  // Function to create text sprite
  function createTextSprite(text: string, color = "#ffffff", fontSize = 72) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    // Set canvas size larger for better quality
    canvas.width = 512;
    canvas.height = 256;

    // Clear canvas with transparent background
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Configure text style
    context.font = `bold ${fontSize}px Arial`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Add text stroke for better visibility
    context.strokeStyle = "#000000";
    context.lineWidth = 6;
    context.strokeText(text, canvas.width / 2, canvas.height / 2);

    // Fill text with main color
    context.fillStyle = color;
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Create texture and sprite
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture,
      transparent: true,
      alphaTest: 0.05,
      depthTest: false  // Para que siempre se vea por encima
    });
    const sprite = new THREE.Sprite(spriteMaterial);

    // Scale sprite más grande
    sprite.scale.set(10, 5, 1);

    return sprite;
  }

  let circles: THREE.Mesh[] = [];
  let connections: THREE.Line[] = []; // Array to store all connections
  const rSmall = 8; // circle radius

  // Define layers: [number of circles, radius from center, skill names]
  const layers = [
    { count: 3, radius: 15, skills: ["A", "MIND", "B"] },
    {
      count: 12,
      radius: 45,
      skills: ["DE", "", "", "", "H", "", "", "", "R", "M", "CAR", "COUNT"],
      shape: [
        "circle",
        "circle",
        "circle",
        "circle",
        "circle",
        "circle",
        "circle",
        "circle",
        "circle",
        "circle",
        "square",
        "square",
      ],
    },
    {
      count: 24,
      radius: 90,
      skills: [
        "AC",
        "IC",
        "INI",
        "",
        "APU",
        "",
        "",
        "PRO",
        "WP",
        "CAP",
        "",
        "SKIL",
        "",
        "",
        "HP",
        "",
        "DL ",
        "",
        "INTER",
        "",
        "DL",
        "",
        "DE",
      ],
      shape: [
        "circle",
        "circle",
        "circle",
        "circle",
        "square",
        "circle",
        "circle",
        "square",
        "circle",
        "circle",
        "circle",
        "circle",
        "circle",
        "circle",
        "circle",
        "circle",
        "circle ",
        "circle",
        "square",
        "circle",
        "circle",
        "circle",
        "circle",
      ],
    },
    {
      count: 24,
      radius: 135,
      skills: [
        "OPO",
        "INI",
        "PARR",
        "",
        "AC",
        "",
        "H",
        "CAP",
        "INS",
        "SKILL",
        "WP",
        "",
        "",
        "",
        "TENS",
        "",
        "M",
        "HEA",
        "HP",
        "ADR",
        "R",
        "REAC",
        "",
        "",
      ],
      shape: [
        "square",
        "circle",
        "square",
        "circle",
        "square",
        "circle",
        "circle",
        "circle",
        "square",
        "circle",
        "circle", 
        "circle",
        "circle",
        "square",
        "circle",
        "circle",
        "square ",
        "circle",
        "square",
        "circle",
        "square",
        "circle",
        "circle",
      ],
    },
  ];

  // Function to create curved line between two points
  function createCurvedLine(
    start: THREE.Vector3,
    end: THREE.Vector3,
    isRadial = false
  ) {
    const points = [];
    const segments = 50;

    if (isRadial) {
      // Straight line for radial connections
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const point = start.clone().lerp(end, t);
        point.y = 0.05; // Just above the ground
        points.push(point);
      }
    } else {
      // Curved line for same-layer connections
      const center = new THREE.Vector3(0, 0, 0);
      const radius = start.distanceTo(center);

      // Calculate angles
      const startAngle = Math.atan2(start.z, start.x);
      const endAngle = Math.atan2(end.z, end.x);

      // Handle angle wrapping
      let angleDiff = endAngle - startAngle;
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const angle = startAngle + angleDiff * t;
        const point = new THREE.Vector3(
          Math.cos(angle) * radius,
          0.05,
          Math.sin(angle) * radius
        );
        points.push(point);
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.7,
    });
    return new THREE.Line(geometry, material);
  }

  // Store circle positions for connection creation
  const circlePositions: THREE.Vector3[][] = [];

  // Create circles for each layer
  layers.forEach((layer, layerIndex) => {
    const step = (2 * Math.PI) / layer.count;
    const layerPositions: THREE.Vector3[] = [];

    for (let i = 0; i < layer.count; i++) {
      // Create circle
      if(layer.shape && layer.shape[i] === "square") {
        // Create square
        const square = new THREE.Mesh(
          new THREE.BoxGeometry(rSmall * 2, 1, rSmall * 2),
          new THREE.MeshBasicMaterial({
            color: 0x538987,
            side: THREE.DoubleSide,
          })
        );
       

        const theta = i * step;
        const position = new THREE.Vector3(
          Math.cos(theta + Math.PI / 6) * layer.radius,
          0.1,
          Math.sin(theta + Math.PI / 6) * layer.radius
        );

        square.position.copy(position);
        layerPositions.push(position.clone());

        // Add interactive data to square
        square.userData = {
          skillName: layer.skills[i] || `Skill ${layerIndex}-${i}`,
          description: `Habilidad de layer ${layerIndex}, posición ${i}. Esta es una habilidad cuadrada con efectos especiales.`,
          isSelected: false,
          originalColor: 0x538987,
          selectedColor: 0x00ff00, // Verde
          hoverColor: 0x88cc88,    // Verde claro
          type: 'square',
          layer: layerIndex,
          index: i
        };

        scene.add(square);
        circles.push(square);
        clickables.push(square); // Hacer clickeable

        // Add text sprite
        const skillName = layer.skills[i] || ``;
        if(skillName == '') {
          square.visible = false;
        } else {
          const textSprite = createTextSprite(skillName, "#ffffff", 200);
          textSprite.position.copy(square.position);
          
          scene.add(textSprite);
        }

        continue; // Skip circle creation
      }
      const circle = new THREE.Mesh(
        new THREE.CircleGeometry(rSmall, 64),
        new THREE.MeshBasicMaterial({
          color: 0x538987,
            
          side: THREE.DoubleSide,
        })
      );

      // Position circle on XZ plane
      circle.rotation.x = -Math.PI / 2;

      const theta = i * step;
      const position = new THREE.Vector3(
        Math.cos(theta + Math.PI / 6) * layer.radius,
        0.1,
        Math.sin(theta + Math.PI / 6) * layer.radius
      );

      circle.position.copy(position);
      layerPositions.push(position.clone());

      // Add interactive data to circle
      circle.userData = {
        skillName: layer.skills[i] || `Skill ${layerIndex}-${i}`,
        description: `Habilidad de layer ${layerIndex}, posición ${i}. Esta habilidad otorga bonificaciones especiales a tu personaje.`,
        isSelected: false,
        originalColor: 0x538987,
        selectedColor: 0x00ff00, // Verde
        hoverColor: 0x88cc88,    // Verde claro
        type: 'circle',
        layer: layerIndex,
        index: i
      };

      scene.add(circle);
      circles.push(circle);
      clickables.push(circle); // Hacer clickeable

      // Add text sprite
      const skillName = layer.skills[i] || ``;
      if(skillName == '') {
        circle.visible = false;
      } else {
        const textSprite = createTextSprite(skillName, "#ffffff", 200);
        textSprite.position.copy(circle.position);
        
        scene.add(textSprite);
      }
    }

    circlePositions.push(layerPositions);
  });

  // No connections created by default - they will be added dynamically

  // Function to get circle position by layer and index
  function getCirclePosition(
    layerIndex: number,
    circleIndex: number
  ): THREE.Vector3 | null {
    if (layerIndex < 0 || layerIndex >= circlePositions.length) return null;
    const layer = circlePositions[layerIndex];
    if (!layer || circleIndex < 0 || circleIndex >= layer.length) return null;
    return layer[circleIndex].clone();
  }

  // Function to create a connection between any two circles
  function createConnection(
    fromLayer: number,
    fromCircle: number,
    toLayer: number,
    toCircle: number,
    connectionType: "straight" | "curved" = "straight",
    color: number = 0x666666,
    connectionId?: string
  ): string | null {
    const startPos = getCirclePosition(fromLayer, fromCircle);
    const endPos = getCirclePosition(toLayer, toCircle);

    if (!startPos || !endPos) {
      console.warn("Invalid circle positions for connection");
      return null;
    }

    // Determine if this should be a curved or straight line
    const isRadial = connectionType === "straight";
    const connection = createCurvedLine(startPos, endPos, isRadial);

    // Generate unique ID if not provided
    const id =
      connectionId ||
      `${fromLayer}-${fromCircle}_to_${toLayer}-${toCircle}_${Date.now()}`;

    connection.userData = {
      id,
      type: connectionType,
      fromLayer,
      fromCircle,
      toLayer,
      toCircle,
      color,
    };

    // Set line color
    (connection.material as THREE.LineBasicMaterial).color.setHex(color);

    scene.add(connection);
    connections.push(connection);

    return id;
  }

  // Function to remove a specific connection by ID
  function removeConnection(connectionId: string): boolean {
    const index = connections.findIndex(
      (conn) => conn.userData.id === connectionId
    );
    if (index !== -1) {
      const connection = connections[index];
      scene.remove(connection);
      connection.geometry.dispose();
      (connection.material as THREE.Material).dispose();
      connections.splice(index, 1);
      return true;
    }
    return false;
  }

  // Function to remove all connections between two specific circles
  function removeConnectionsBetween(
    fromLayer: number,
    fromCircle: number,
    toLayer: number,
    toCircle: number
  ): number {
    let removedCount = 0;
    for (let i = connections.length - 1; i >= 0; i--) {
      const conn = connections[i];
      if (
        conn.userData.fromLayer === fromLayer &&
        conn.userData.fromCircle === fromCircle &&
        conn.userData.toLayer === toLayer &&
        conn.userData.toCircle === toCircle
      ) {
        scene.remove(conn);
        conn.geometry.dispose();
        (conn.material as THREE.Material).dispose();
        connections.splice(i, 1);
        removedCount++;
      }
    }
    return removedCount;
  }

  // Function to clear all connections
  function clearAllConnections(): void {
    while (connections.length > 0) {
      const connection = connections.pop()!;
      scene.remove(connection);
      connection.geometry.dispose();
      (connection.material as THREE.Material).dispose();
    }
  }

  // Function to create a ring of connections within a layer
  function createLayerRing(
    layerIndex: number,
    color: number = 0x666666
  ): string[] {
    const connectionIds: string[] = [];
    const layer = circlePositions[layerIndex];
    if (!layer) return connectionIds;

    for (let i = 0; i < layer.length; i++) {
      const nextIndex = (i + 1) % layer.length;
      const id = createConnection(
        layerIndex,
        i,
        layerIndex,
        nextIndex,
        "curved",
        color
      );
      if (id) connectionIds.push(id);
    }
    return connectionIds;
  }

  // Create API object
  const skillTreeAPI = {
    createConnection,
    removeConnection,
    removeConnectionsBetween,
    clearAllConnections,
    createLayerRing,
    getCirclePosition,
  };

  // Make functions available globally for testing
  (window as any).skillTreeAPI = skillTreeAPI;

  //skillTreeAPI.createConnection(1, 3, 1, 8, 'curved', 0x0000ff);   // Blue curved line

  //Conexiones entre layer 1

  skillTreeAPI.createConnection(1, 9, 1, 10, "curved", 0x000000); // Cyan curved line

  // Conexiones entre layer 2
  skillTreeAPI.createConnection(2, 0, 2, 22, "curved", 0x000000); // Cyan curved line
  skillTreeAPI.createConnection(2, 9, 2, 11, "curved", 0x000000); // Cyan curved line
  skillTreeAPI.createConnection(2, 11, 2, 14, "curved", 0x000000); // Cyan curved line
  skillTreeAPI.createConnection(2, 16, 2, 18, "curved", 0x000000); // Cyan curved line
  skillTreeAPI.createConnection(2, 2, 2, 4, "curved", 0x000000);
  //Conexiones entre layer 3
  skillTreeAPI.createConnection(3, 16, 3, 17, "curved", 0x000000);
  skillTreeAPI.createConnection(3, 17, 3, 18, "curved", 0x000000);
  skillTreeAPI.createConnection(3, 18, 3, 19, "curved", 0x000000);
  skillTreeAPI.createConnection(3, 0, 3, 1, "curved", 0x000000);
  skillTreeAPI.createConnection(3, 1, 3, 2, "curved", 0x000000);
  skillTreeAPI.createConnection(3, 2, 3, 4, "curved", 0x000000);
  skillTreeAPI.createConnection(3, 4, 3, 6, "curved", 0x000000);
  skillTreeAPI.createConnection(3, 6, 3, 7, "curved", 0x000000);
  skillTreeAPI.createConnection(3, 7, 3, 8, "curved", 0x000000);
  skillTreeAPI.createConnection(3, 8, 3, 9, "curved", 0x000000);
   skillTreeAPI.createConnection(3, 10, 3, 14, "curved", 0x000000);
   skillTreeAPI.createConnection(3, 21, 3, 0, "curved", 0x000000);
  // Conexiones entre layer 0 y 1
  skillTreeAPI.createConnection(0, 0, 1, 0, "straight", 0x000000); // Cyan straight line
  skillTreeAPI.createConnection(0, 1, 1, 4, "straight", 0x000000); // Cyan straight line
  skillTreeAPI.createConnection(0, 2, 1, 8, "straight", 0x000000); // Cyan straight line
  skillTreeAPI.createConnection(0, 2, 1, 9, "straight", 0x000000); 

  // conexiones entre layer 1 y 2
  skillTreeAPI.createConnection(1, 0, 2, 0, "straight", 0x000000); // Cyan straight line
  skillTreeAPI.createConnection(1, 0, 2, 1, "straight", 0x000000); // Cyan straight line
  skillTreeAPI.createConnection(1, 0, 2, 2, "straight", 0x000000); // Cyan straight line
  skillTreeAPI.createConnection(1, 8, 2, 16, "straight", 0x000000);
  skillTreeAPI.createConnection(1, 8, 2, 14, "straight", 0x000000);
  skillTreeAPI.createConnection(1, 4, 2, 7, "straight", 0x000000);
  skillTreeAPI.createConnection(1, 4, 2, 8, "straight", 0x000000);
 skillTreeAPI.createConnection(1, 4, 2, 9, "straight", 0x000000);
 skillTreeAPI.createConnection(1, 11, 2, 22, "straight", 0x000000);
  // conexiones entre layer 2 y 3
  skillTreeAPI.createConnection(2, 20, 3, 21, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 22, 3, 21, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 16, 3, 16, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 18, 3, 18, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 18, 3, 20, "straight", 0x000000);
   skillTreeAPI.createConnection(2, 20, 3, 20, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 0, 3, 0, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 1, 3, 2, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 7, 3, 7, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 8, 3, 8, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 9, 3, 9, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 9, 3, 10, "straight", 0x000000);
  skillTreeAPI.createConnection(2, 14, 3, 14, "straight", 0x000000);
  
}

// Mouse event functions
function onMouseMove(event: MouseEvent) {
  const rect = renderer!.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickables);
  
  // Remove hover effect from previous object
  if (hovered && hovered !== selected) {
    (hovered.material as THREE.MeshStandardMaterial).color.setHex(hovered.userData.originalColor);
  }
  
  if (intersects.length > 0) {
    const intersect = intersects[0];
    const object = intersect.object as THREE.Mesh;
    
    // Apply hover effect if not selected
    if (object !== selected) {
      hovered = object;
      (object.material as THREE.MeshStandardMaterial).color.setHex(object.userData.hoverColor);
    }
    
    // Show tooltip
    showTooltip(event, object);
    renderer!.domElement.style.cursor = 'pointer';
  } else {
    hovered = null;
    hideTooltip();
    renderer!.domElement.style.cursor = 'default';
  }
}

function onClick(event: MouseEvent) {
  const rect = renderer!.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickables);
  
  if (intersects.length > 0) {
    const object = intersects[0].object as THREE.Mesh;
    
    // Check if clicking on already selected object (toggle off)
    if (selected === object) {
      // Deselect current object
      selected.userData.isSelected = false;
      (selected.material as THREE.MeshStandardMaterial).color.setHex(selected.userData.originalColor);
      selected = null;
      
      console.log(`Deselected skill: ${object.userData.skillName}`);
    } else {
      // Deselect previous object if exists
      if (selected) {
        selected.userData.isSelected = false;
        (selected.material as THREE.MeshStandardMaterial).color.setHex(selected.userData.originalColor);
      }
      
      // Select new object
      selected = object;
      object.userData.isSelected = true;
      (object.material as THREE.MeshStandardMaterial).color.setHex(object.userData.selectedColor);
      
      console.log(`Selected skill: ${object.userData.skillName} (Layer ${object.userData.layer}, Index ${object.userData.index})`);
    }
  }
}

function showTooltip(event: MouseEvent, object: THREE.Mesh) {
  if (!tooltip) {
    tooltip = document.createElement('div');
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
    <em>Tipo: ${object.userData.type === 'circle' ? 'Círculo' : 'Cuadrado'}</em>
  `;
  
  tooltip.style.left = event.clientX + 10 + 'px';
  tooltip.style.top = event.clientY - 10 + 'px';
  tooltip.style.display = 'block';
}

function hideTooltip() {
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}

function animate() {
  rafId = requestAnimationFrame(animate);

  // Required for damping to work
  controls.update();

  renderer!.render(scene, camera);
}
function dispose() {
  cancelAnimationFrame(rafId);

  // 1. Dispose controls
  controls.dispose();

  // 2. Dispose all scene objects (geometries, materials)
  scene.traverse((object: THREE.Object3D) => {
    // <-- Type 'object' here
    // Check if it's a Mesh, SkinnedMesh, etc. (anything with geometry/material)
    if (object instanceof THREE.Mesh) {
      // Dispose geometry
      if (object.geometry) {
        object.geometry.dispose();
      }

      // Dispose material(s)
      if (object.material) {
        if (Array.isArray(object.material)) {
          // Loop over array of materials
          object.material.forEach((material: THREE.Material) => {
            // <-- Type 'material' here
            material.dispose();
          });
        } else {
          // Dispose single material
          (object.material as THREE.Material).dispose();
        }
      }
    }
  });

  // 3. Remove tooltip
  if (tooltip) {
    document.body.removeChild(tooltip);
    tooltip = null;
  }

  // 4. Remove event listeners
  if (renderer?.domElement) {
    renderer.domElement.removeEventListener('mousemove', onMouseMove);
    renderer.domElement.removeEventListener('click', onClick);
  }

  // 5. Dispose renderer
  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
    renderer = null;
  }
}

onMounted(() => {
  if (box.value) {
    console.log("Mounted arbol.vue");
    init();
    animate();
  }
});

onBeforeUnmount(() => {
  dispose();
});
</script>
