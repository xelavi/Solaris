<template>
  <div class="flex gap-4">
    <div ref="box" class="w-250 h-150 relative"></div>
    <div class="flex flex-col gap-4">
      <!-- Panel de Nodos Seleccionados -->
      <div class="w-64 bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
        <h3 class="text-lg font-bold mb-3">Nodos Seleccionados</h3>
        <div class="mb-4">
          <p class="text-sm">
            <span class="font-medium">Nivel de Personaje: </span>
            <span class="font-bold">{{ characterLevel }}</span>
          </p>
        </div>
        <div class="mb-4">
          <p class="text-sm">
            <span class="font-semibold">Puntos disponibles: </span>
            <span :class="remainingNodes < 0 ? 'text-red-600' : 'text-green-600'">
              {{ remainingNodes }}
            </span>
          </p>
        </div>
        <div class="max-h-60 overflow-y-auto">
          <div 
            v-for="node in selectedNodes" 
            :key="node.nodeId"
            :class="[
              'mb-2 p-2 rounded text-sm',
              node.isTrasfondo ? 'bg-blue-100 border-2 border-blue-400' : 'bg-gray-100'
            ]"
          >
            <div class="font-semibold">
              {{ node.skillName }}
              <span v-if="node.isTrasfondo" class="text-xs text-blue-600 ml-1">(Trasfondo)</span>
            </div>
            <div class="text-xs text-gray-600">
              {{ node.type === 'circle' ? 'Atributo' : 'Activa' }} - Layer {{ node.layer }}
            </div>
          </div>
        </div>
      </div>

      <!-- Panel de Atributos Calculados -->
      <div class="w-64 bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
        <h3 class="text-lg font-bold mb-3">Atributos</h3>
        <div class="space-y-2 text-sm">
          <!-- Atributos principales -->
          <div class="font-semibold text-blue-700 mb-2">Principales</div>
          <div class="flex justify-between">
            <span>Cuerpo:</span>
            <span class="font-bold">{{ cuerpo }}</span>
          </div>
          <div class="flex justify-between">
            <span>Agilidad:</span>
            <span class="font-bold">{{ agilidad }}</span>
          </div>
          <div class="flex justify-between">
            <span>Mente:</span>
            <span class="font-bold">{{ mente }}</span>
          </div>
          
          <!-- Atributos derivados (+3 por nodo) -->
          <div class="font-semibold text-green-700 mt-3 mb-2">Derivados (×3)</div>
          <div class="flex justify-between">
            <span>Poderío:</span>
            <span class="font-bold">{{ poderio }}</span>
          </div>
          <div class="flex justify-between">
            <span>Movimiento:</span>
            <span class="font-bold">{{ movimiento }}</span>
          </div>
          <div class="flex justify-between">
            <span>Resistencia:</span>
            <span class="font-bold">{{ resistencia }}</span>
          </div>
          <div class="flex justify-between">
            <span>Regeneración:</span>
            <span class="font-bold">{{ regeneracion }}</span>
          </div>
          <div class="flex justify-between">
            <span>Evasión:</span>
            <span class="font-bold">{{ evasion }}</span>
          </div>
          <div class="flex justify-between">
            <span>Iniciativa:</span>
            <span class="font-bold">{{ iniciativa }}</span>
          </div>
          <div class="flex justify-between">
            <span>Puntería:</span>
            <span class="font-bold">{{ punteria }}</span>
          </div>
          <div class="flex justify-between">
            <span>Pts Habilidad:</span>
            <span class="font-bold">{{ puntosHabilidad }}</span>
          </div>
          
          <!-- Atributos simples (+1 por nodo) -->
          <div class="font-semibold text-purple-700 mt-3 mb-2">Especiales (×1)</div>
          <div class="flex justify-between">
            <span>Rango Crítico:</span>
            <span class="font-bold">{{ rangoCritico }}</span>
          </div>
          <div class="flex justify-between">
            <span>Habilidades Extra:</span>
            <span class="font-bold">{{ habilidadesExtra }}</span>
          </div>
          <div class="flex justify-between">
            <span>Límite Habilidad:</span>
            <span class="font-bold">{{ limiteHabilidad }}</span>
          </div>
          <div class="flex justify-between">
            <span>Acciones:</span>
            <span class="font-bold">{{ acciones }}</span>
          </div>
          <div class="flex justify-between">
            <span>Reacciones:</span>
            <span class="font-bold">{{ reacciones }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from "vue";
import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";
import arbolData from "../../assets/arbol.json";
import atributosData from "../../assets/atributos.json";
import activasData from "../../assets/activas.json";
import trasfondosData from "../../assets/trasfondos/trasfondos.json";
import { useCharacterCreation } from "../../domain/useCharacterCreation";
import { useArbolAttributes } from "../../domain/useArbolAttributes";

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

// Use character creation composable
const { characterData, loadCharacterData } = useCharacterCreation();

// Character level from characterData
const characterLevel = computed({
  get: () => characterData.value.nivel,
  set: (value: number) => {
    characterData.value.nivel = value;
  }
});

const maxNodes = computed(() => characterLevel.value * 2);

// Define selectedNodes first before using it
const selectedNodes = ref<Array<{
  nodeId: number;
  skillName: string;
  type: string;
  layer: number;
  index: number;
  description: string;
  isTrasfondo?: boolean;
}>>([]);

// Get trasfondo node IDs
const trasfondoNodeIds = computed(() => {
  if (!characterData.value.trasfondo) return [];
  
  const trasfondo = trasfondosData.trasfondos.find(
    t => t.nombre === characterData.value.trasfondo
  );
  
  return trasfondo ? trasfondo.atributos : [];
});

// Filter selected nodes to separate trasfondo nodes from regular nodes
const regularSelectedNodes = computed(() => 
  selectedNodes.value.filter(node => !trasfondoNodeIds.value.includes(node.nodeId))
);

const remainingNodes = computed(() => maxNodes.value - regularSelectedNodes.value.length);

// Use arbol attributes composable to calculate stats
const {
  cuerpo,
  agilidad,
  mente,
  rangoCritico,
  habilidadesExtra,
  limiteHabilidad,
  acciones,
  reacciones,
  poderio,
  movimiento,
  resistencia,
  regeneracion,
  evasion,
  iniciativa,
  punteria,
  puntosHabilidad,
  attributes
} = useArbolAttributes(selectedNodes);

// Watch attributes and update characterData
watch(attributes, (newAttributes) => {
  characterData.value.atributos = { ...newAttributes };
}, { deep: true });

// Watch selectedNodes and save to characterData.arbol
watch(selectedNodes, (newNodes) => {
  characterData.value.arbol = JSON.stringify(newNodes);
}, { deep: true });

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
  camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 2000); // Reduced FOV for better framing
  const cameraDistance = 250; // Closer to the skill tree
  camera.position.set(0, cameraDistance, 0);
  camera.lookAt(0, 0, 0);

  // === Controles tipo Diablo/LoL ===
  controls = new MapControls(camera, renderer.domElement);
  controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY };
  controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2.5;
  controls.minDistance = 80; // Prevent zooming too close
  controls.maxDistance = 250  ; // Prevent zooming too far
  controls.enableDamping = true;

  // Luz
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Brighter ambient
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 2.0); // Brighter directional
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
  function createTextSprite(text: string, color = "#ffffff", fontSize = 180) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    // Set canvas size larger for better quality
    canvas.width = 1024;
    canvas.height = 1024;

    // Clear canvas with transparent background
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Configure text style
    context.font = `bold ${fontSize}px Arial`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Add text stroke for better visibility
    context.strokeStyle = "#000000";
    context.lineWidth = 12;
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

    // Scale sprite mucho más grande para ocupar casi todo el círculo/cuadrado
    sprite.scale.set(16, 16, 1);

    return sprite;
  }

  let circles: THREE.Mesh[] = [];
  let connections: THREE.Line[] = []; // Array to store all connections
  const rSmall = 8; // circle radius - increased for better visibility

  // Helper function to get diminutivo from atributos or activas
  function getDiminutivo(atributoId: string | number, shape: string): string {
    const id = typeof atributoId === 'string' ? parseInt(atributoId) : atributoId;
    
    if (shape === "circle") {
      const atributo = atributosData.caracteristicasSecundarias.find(a => a.id === id);
      return atributo?.diminutivo || "";
    } else {
      const activa = activasData.activas.find(a => a.id === id);
      return activa?.diminutivo || "";  
    }
  }

  // Helper function to get description
  function getDescription(atributoId: string | number, shape: string): string {
    const id = typeof atributoId === 'string' ? parseInt(atributoId) : atributoId;
    
    if (shape === "circle") {
      const atributo = atributosData.caracteristicasSecundarias.find(a => a.id === id);
      return atributo?.descripcion || "";
    } else {
      const activa = activasData.activas.find(a => a.id === id);
      return activa?.descripcion || "";
    }
  }

  // Build layers structure from arbol.json
  const layerSizes = [3, 12, 24, 24];
  const layerRadii = [15, 45, 90, 135];
  
  // Initialize layers with empty arrays
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

  // Populate layers with data from arbol.json
  arbolData.arbol.nodos.forEach((nodo) => {
    const layer = layers[nodo.layer];
    if (layer && nodo.posicion < layer.count) {
      const diminutivo = getDiminutivo(nodo.atributo, nodo.shape);
      layer.skills[nodo.posicion] = diminutivo;
      layer.shape[nodo.posicion] = nodo.shape;
      layer.nodeData[nodo.posicion] = { id: nodo.id, atributo: nodo.atributo };
    }
  });

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
        point.y = -0.1; // Below the ground to avoid z-fighting
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
          -0.1, // Negative Y to render below the meshes
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
      depthTest: true, // Enable depth testing
      depthWrite: false, // Don't write to depth buffer
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
      const nodeData = layer.nodeData[i];
      
      // Skip if no node data for this position
      if (!nodeData) {
        // Still need to add a null position for proper indexing
        layerPositions.push(new THREE.Vector3(0, 0, 0));
        continue;
      }

      const theta = i * step;
      const position = new THREE.Vector3(
        Math.cos(theta + Math.PI / 6) * layer.radius,
        0.1,
        Math.sin(theta + Math.PI / 6) * layer.radius
      );

      // Create square or circle based on shape
      if(layer.shape && layer.shape[i] === "square") {
        // Create square
        const square = new THREE.Mesh(
          new THREE.BoxGeometry(rSmall * 2, 1, rSmall * 2),
          new THREE.MeshBasicMaterial({
            color: 0x4A90E2, // Azul vibrante
            side: THREE.DoubleSide,
          })
        );

        square.position.copy(position);
        layerPositions.push(position.clone());

        const skillName = layer.skills[i] || "";
        const description = getDescription(nodeData.atributo, "square");

        // Add interactive data to square
        square.userData = {
          nodeId: nodeData.id,
          skillName: skillName,
          description: description,
          isSelected: false,
          originalColor: 0x4A90E2, // Azul vibrante
          selectedColor: 0x00ff00, // Verde brillante
          hoverColor: 0x7EC8E3,    // Azul claro
          trasfondoNodeColor: 0x6366F1, // Indigo para nodos de trasfondo
          type: 'square',
          layer: layerIndex,
          index: i
        };

        scene.add(square);
        circles.push(square);
        clickables.push(square);

        // Add text sprite
        if(skillName) {
          const textSprite = createTextSprite(skillName, "#ffffff", 350);
          textSprite.position.copy(square.position);
          scene.add(textSprite);
        }
      } else {
        // Create circle
        const circle = new THREE.Mesh(
          new THREE.CircleGeometry(rSmall, 64),
          new THREE.MeshBasicMaterial({
            color: 0x4A90E2, // Azul vibrante
            side: THREE.DoubleSide,
          })
        );

        // Position circle on XZ plane
        circle.rotation.x = -Math.PI / 2;
        circle.position.copy(position);
        layerPositions.push(position.clone());

        const skillName = layer.skills[i] || "";
        const description = getDescription(nodeData.atributo, "circle");

        // Add interactive data to circle
        circle.userData = {
          nodeId: nodeData.id,
          skillName: skillName,
          description: description,
          isSelected: false,
          originalColor: 0x4A90E2, // Azul vibrante
          selectedColor: 0x00ff00, // Verde brillante
          hoverColor: 0x7EC8E3,    // Azul claro
          trasfondoNodeColor: 0x6366F1, // Indigo para nodos de trasfondo
          type: 'circle',
          layer: layerIndex,
          index: i
        };

        scene.add(circle);
        circles.push(circle);
        clickables.push(circle);

        // Add text sprite
        if(skillName) {
          const textSprite = createTextSprite(skillName, "#ffffff", 350);
          textSprite.position.copy(circle.position);
          scene.add(textSprite);
        }
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

  // Create a map from node ID to layer and position
  const nodeIdToPosition = new Map<number, { layer: number; position: number }>();
  arbolData.arbol.nodos.forEach((nodo) => {
    nodeIdToPosition.set(nodo.id, { layer: nodo.layer, position: nodo.posicion });
  });

  // Create connections from arbol.json
  arbolData.arbol.conexiones.forEach((conexion) => {
    const origen = nodeIdToPosition.get(conexion.origen);
    const destino = nodeIdToPosition.get(conexion.destino);

    if (origen && destino) {
      // Determine connection type: straight if different layers, curved if same layer
      const connectionType = origen.layer === destino.layer ? "curved" : "straight";
      skillTreeAPI.createConnection(
        origen.layer,
        origen.position,
        destino.layer,
        destino.position,
        connectionType,
        0x000000
      );
    }
  });

  // Restore visual selection state for loaded nodes
  function restoreSelectionState() {
    selectedNodes.value.forEach(savedNode => {
      const mesh = circles.find(circle => circle.userData.nodeId === savedNode.nodeId);
      if (mesh) {
        mesh.userData.isSelected = true;
        // Always use green selected color for all selected nodes
        (mesh.material as THREE.MeshBasicMaterial).color.setHex(mesh.userData.selectedColor);
      }
    });
  }

  // Call after scene is fully set up
  restoreSelectionState();
}

// Mouse event functions
function onMouseMove(event: MouseEvent) {
  const rect = renderer!.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickables);
  
  // Remove hover effect from previous object
  if (hovered && !hovered.userData.isSelected) {
    (hovered.material as THREE.MeshStandardMaterial).color.setHex(hovered.userData.originalColor);
  }
  
  if (intersects.length > 0) {
    const intersect = intersects[0];
    const object = intersect.object as THREE.Mesh;
    
    // Apply hover effect if not selected
    if (!object.userData.isSelected) {
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
    
    // Check if this is a trasfondo node (cannot be deselected)
    const isTrasfondoNode = trasfondoNodeIds.value.includes(object.userData.nodeId);
    
    // Check if clicking on already selected object (toggle off)
    if (object.userData.isSelected) {
      // Prevent deselecting trasfondo nodes
      if (isTrasfondoNode) {
        console.warn(`No puedes deseleccionar un nodo de trasfondo`);
        return;
      }
      
      // Deselect current object
      object.userData.isSelected = false;
      (object.material as THREE.MeshStandardMaterial).color.setHex(object.userData.originalColor);
      
      // Remove from selectedNodes array
      const index = selectedNodes.value.findIndex(n => n.nodeId === object.userData.nodeId);
      if (index !== -1) {
        selectedNodes.value.splice(index, 1);
      }
      
      console.log(`Deselected skill: ${object.userData.skillName}`);
    } else {
      // Check if we've reached the maximum number of nodes (excluding trasfondo nodes)
      if (remainingNodes.value <= 0) {
        console.warn(`No quedan puntos disponibles!`);
        return;
      }
      
      // Select new object
      object.userData.isSelected = true;
      // Always use green selected color for all selected nodes
      (object.material as THREE.MeshStandardMaterial).color.setHex(object.userData.selectedColor);
      
      // Add to selectedNodes array
      selectedNodes.value.push({
        nodeId: object.userData.nodeId,
        skillName: object.userData.skillName,
        type: object.userData.type,
        layer: object.userData.layer,
        index: object.userData.index,
        description: object.userData.description,
        isTrasfondo: isTrasfondoNode
      });
      
      console.log(`Selected skill: ${object.userData.skillName} (Layer ${object.userData.layer}, Index ${object.userData.index})`);
      console.log(`Puntos restantes: ${remainingNodes.value}`);
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
  <strong>${object.userData.nodeId}</strong><br>
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

// Watch for trasfondo changes and update selected nodes
watch(() => characterData.value.trasfondo, (newTrasfondo, oldTrasfondo) => {
  if (newTrasfondo !== oldTrasfondo) {
    // Reset the entire tree when trasfondo changes
    // First, reset all visual states
    circles.forEach(mesh => {
      mesh.userData.isSelected = false;
      (mesh.material as THREE.MeshBasicMaterial).color.setHex(mesh.userData.originalColor);
    });
    
    // Clear all selected nodes
    selectedNodes.value = [];
    
    // Add new trasfondo nodes if a trasfondo is selected
    if (newTrasfondo) {
      addTrasfondoNodes();
      // Update visual state after adding trasfondo nodes
      nextTick(() => {
        updateTrasfondoVisuals();
      });
    }
  }
});

// Function to add trasfondo nodes to selected nodes
function addTrasfondoNodes() {
  const trasfondo = trasfondosData.trasfondos.find(
    t => t.nombre === characterData.value.trasfondo
  );
  
  if (!trasfondo) return;
  
  trasfondo.atributos.forEach(nodeId => {
    // Check if node is already selected
    if (!selectedNodes.value.find(n => n.nodeId === nodeId)) {
      // Find node data from arbol.json
      const nodo = arbolData.arbol.nodos.find(n => n.id === nodeId);
      if (!nodo) return;
      
      // Get skill name based on shape
      const getDiminutivo = (atributoId: string | number, shape: string): string => {
        const id = typeof atributoId === 'string' ? parseInt(atributoId) : atributoId;
        
        if (shape === "circle") {
          const atributo = atributosData.caracteristicasSecundarias.find(a => a.id === id);
          return atributo?.diminutivo || "";
        } else {
          const activa = activasData.activas.find(a => a.id === id);
          return activa?.diminutivo || "";
        }
      };
      
      const getDescription = (atributoId: string | number, shape: string): string => {
        const id = typeof atributoId === 'string' ? parseInt(atributoId) : atributoId;
        
        if (shape === "circle") {
          const atributo = atributosData.caracteristicasSecundarias.find(a => a.id === id);
          return atributo?.descripcion || "";
        } else {
          const activa = activasData.activas.find(a => a.id === id);
          return activa?.descripcion || "";
        }
      };
      
      const skillName = getDiminutivo(nodo.atributo, nodo.shape);
      const description = getDescription(nodo.atributo, nodo.shape);
      
      selectedNodes.value.push({
        nodeId: nodeId,
        skillName: skillName,
        type: nodo.shape === 'circle' ? 'circle' : 'square',
        layer: nodo.layer,
        index: nodo.posicion,
        description: description,
        isTrasfondo: true
      });
    }
  });
}

// Function to update visual state of trasfondo nodes
function updateTrasfondoVisuals() {
  selectedNodes.value.forEach(savedNode => {
    if (savedNode.isTrasfondo) {
      const mesh = circles.find(circle => circle.userData.nodeId === savedNode.nodeId);
      if (mesh) {
        mesh.userData.isSelected = true;
        (mesh.material as THREE.MeshBasicMaterial).color.setHex(mesh.userData.selectedColor);
      }
    }
  });
}

onMounted(() => {
  if (box.value) {
    console.log("Mounted arbol.vue");
    
    // Load character data
    loadCharacterData();
    
    // Load saved tree nodes if they exist
    if (characterData.value.arbol) {
      try {
        const savedNodes = JSON.parse(characterData.value.arbol);
        selectedNodes.value = savedNodes;
      } catch (error) {
        console.error("Error loading saved tree nodes:", error);
      }
    }
    
    // Add trasfondo nodes if trasfondo is selected
    if (characterData.value.trasfondo) {
      addTrasfondoNodes();
    }
    
    init();
    animate();
  }
});

onBeforeUnmount(() => {
  dispose();
});
</script>
