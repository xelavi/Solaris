<template>
  <div class="w-full h-screen relative">
    <div ref="canvasContainer" class="w-full h-full"></div>

    <!-- UI Overlay -->
    <PanelCharacter
      v-if="panelVisible && panelData"
      :x="panelPosition.x"
      :y="panelPosition.y"
      :nombre="panelData.nombre"
      :vida-actual="panelData.vidaActual"
      :vida-max="panelData.vidaMax"
    />

    <FichaCharacter
      v-if="personajeSeleccionado"
      :personaje="personajeSeleccionado"
      class="absolute top-4 left-4 z-50"
    />

    <PanelIniciativa
      v-if="ordenTurnos.length > 0"
      :orden-turnos="ordenTurnos"
      :turno-actual="turnoActual"
    />

    <BarraHabilidades />

    <!-- Turn Info / Actions -->
    <div
      class="absolute bottom-4 right-4 text-white bg-black/50 p-4 rounded pointer-events-none"
    >
      <p v-if="personajeActivo">
        Turno de:
        <span class="font-bold text-yellow-400">{{
          personajeActivo.nombre
        }}</span>
      </p>
      <p v-else>Esperando inicio...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { MapControls } from "three/addons/controls/MapControls.js";
import * as THREE from "three";
import PanelCharacter from "./panelCharacter.vue";
import FichaCharacter from "./fichaCharacter.vue";
import BarraHabilidades from "./barraHabilidades.vue";
import PanelIniciativa from "./panelIniciativa.vue";
import { usePartida } from "../../domain/usePartida";
import { useMapa } from "../../domain/useMapa";
import type { PersonajeInstancia } from "../../domain/Partida";

const props = defineProps<{ partidaId?: string }>();

// Composables
const {
  partidaActual,
  ordenTurnos,
  turnoActual,
  personajeActivo,
  iniciarPartida,
  moverPersonajeActivo,
} = usePartida();

const { mapa, obtenerAlcance } = useMapa();

// Local State for UI
const personajeSeleccionado = ref<PersonajeInstancia | null>(null);
const highlightedCubes = ref<Set<string>>(new Set());
const panelVisible = ref(false);
const panelPosition = ref({ x: 0, y: 0 });
const panelData = ref<{
  nombre: string;
  vidaActual: number;
  vidaMax: number;
} | null>(null);

// Three.js Variables
const canvasContainer = ref<HTMLDivElement | null>(null);
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: MapControls;
let rafId = 0;

// Raycasting
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickables: THREE.Object3D[] = [];
let cubes: THREE.Mesh[] = [];

// Character Meshes Map (ID -> Mesh)
const characterMeshes = new Map<string, THREE.Mesh>();
let circleMesh: THREE.Mesh | null = null;

// Constants
const CUBE_SIZE = 1;

// --- Initialization ---
function init() {
  if (!canvasContainer.value) return;
  const el = canvasContainer.value!;
  const width = el.clientWidth;
  const height = el.clientHeight;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x1a1a2e);
  el.appendChild(renderer.domElement);

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x1a1a2e, 20, 100);

  // Camera
  const aspect = width / height;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000);
  camera.position.set(20, 20, 20);
  camera.lookAt(0, 0, 0);

  // Controls
  controls = new MapControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 5;
  controls.maxDistance = 100;
  controls.maxPolarAngle = Math.PI / 2.5;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(20, 40, 30);
  scene.add(dirLight);

  // Start Game Logic
  if (props.partidaId) {
    iniciarPartida(props.partidaId);
  }

  animate();
}

// --- Rendering ---

// Watch for Map Changes
watch(
  mapa,
  (newMapa) => {
    if (newMapa && newMapa.length > 0) {
      renderMap(newMapa);
    }
  },
  { deep: true, immediate: true },
);

function renderMap(grid: any[][]) {
  // Clear existing cubes
  cubes.forEach((c) => scene.remove(c));
  cubes = [];

  const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
  const geometry = new THREE.BoxGeometry(CUBE_SIZE, 1, CUBE_SIZE);

  grid.forEach((row) => {
    row.forEach((cell) => {
      if (!cell) return;
      const cube = new THREE.Mesh(geometry, material.clone());

      cube.position.set(cell.x * CUBE_SIZE, 0, cell.z * CUBE_SIZE);

      // Visual differentiation for blocked/walls
      if (cell.blocked) {
        cube.position.y = 1; // Raise walls
        cube.material.color.set(0x555555);
      } else if (highlightedCubes.value.has(`${cell.x},${cell.z}`)) {
        cube.material.color.set(0x4ade80); // Green for reachable
      }

      cube.userData.grid = { x: cell.x, z: cell.z, blocked: cell.blocked };

      scene.add(cube);
      cubes.push(cube);
    });
  });
  updateClickables();
}

// Watch for Game State Changes (Characters)
watch(
  partidaActual,
  (newPartida) => {
    if (newPartida) {
      updateCharacterMeshes(newPartida);
    }
  },
  { deep: true, immediate: true },
);

// Watch for Active Character to update selection circle
watch(
  personajeActivo,
  (pj) => {
    if (pj) {
      updateSelectionCircle(pj);
    }
  },
  { immediate: true },
);

// Watch for Selection to highlight range
watch(personajeSeleccionado, (pj) => {
  highlightedCubes.value.clear();
  if (
    pj &&
    personajeActivo.value &&
    pj.nombre === personajeActivo.value.nombre
  ) {
    const range = obtenerAlcance(pj.posicion, pj.atributos.movimiento);
    range.forEach((c) => highlightedCubes.value.add(`${c.x},${c.z}`));
  }
  // Re-render map to show highlights
  if (mapa.value.length > 0) renderMap(mapa.value);
});

function updateCharacterMeshes(partida: any) {
  const activeIds = new Set<string>();

  partida.equipos.forEach((equipo: any) => {
    equipo.personajes.forEach((pj: PersonajeInstancia) => {
      // Use name as ID for now
      const id = pj.nombre;
      activeIds.add(id);

      let mesh = characterMeshes.get(id);
      if (!mesh) {
        // Create new mesh
        const geometry = new THREE.BoxGeometry(0.8, 1.8, 0.8);
        const material = new THREE.MeshStandardMaterial({
          color: Math.random() * 0xffffff,
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        characterMeshes.set(id, mesh);
      }

      // Update Data
      mesh.userData.isCharacter = true;
      mesh.userData.characterData = pj;

      // Target Position
      const targetPos = new THREE.Vector3(pj.posicion.x, 1, pj.posicion.z);

      // Only update targetPos if we are NOT currently animating a path for this character
      // AND not waiting for a path calculation (to avoid teleport glitches)
      if (!mesh.userData.isMoving && !mesh.userData.isWaitingForPath) {
        mesh.userData.targetPos = targetPos;
        // Initial snap if far away (first load)
        if (mesh.position.distanceTo(targetPos) > 10) {
          mesh.position.copy(targetPos);
        }
      }
    });
  });

  // Remove dead/removed characters
  for (const [id, mesh] of characterMeshes) {
    if (!activeIds.has(id)) {
      scene.remove(mesh);
      characterMeshes.delete(id);
    }
  }
  updateClickables();
}

function updateClickables() {
  clickables.length = 0;
  clickables.push(...cubes);
  characterMeshes.forEach((m) => clickables.push(m));
}

function updateSelectionCircle(pj: PersonajeInstancia) {
  if (circleMesh) {
    scene.remove(circleMesh);
    circleMesh = null;
  }

  // Find mesh for this character
  const mesh = characterMeshes.get(pj.nombre);
  if (mesh) {
    circleMesh = mostrarCirculoSuelo({
      x: mesh.position.x,
      z: mesh.position.z,
      color: 0x00ff00,
      radio: 1.2,
      soloBorde: true,
    });
  }
}

function mostrarCirculoSuelo({ x, z, color, radio, soloBorde }: any) {
  let mesh;
  if (soloBorde) {
    const geometry = new THREE.TorusGeometry(radio, 0.1, 8, 32);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.8,
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
  } else {
    const geometry = new THREE.CircleGeometry(radio, 32);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.3,
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
  }
  mesh.position.set(x, 0.1, z);
  scene.add(mesh);
  return mesh;
}

// --- Animation Loop ---
function animate() {
  rafId = requestAnimationFrame(animate);
  controls.update();

  // Interpolate Character Positions
  characterMeshes.forEach((mesh) => {
    if (
      mesh.userData.isMoving &&
      mesh.userData.pathQueue &&
      mesh.userData.pathQueue.length > 0
    ) {
      const target = mesh.userData.pathQueue[0];
      const dir = new THREE.Vector3().subVectors(target, mesh.position);
      const dist = dir.length();
      const speed = 0.1; // Reduced speed for smoother animation

      if (dist < speed) {
        mesh.position.copy(target);
        mesh.userData.pathQueue.shift();
        if (mesh.userData.pathQueue.length === 0) {
          mesh.userData.isMoving = false;
          // Sync final position just in case
          if (mesh.userData.targetPos)
            mesh.position.copy(mesh.userData.targetPos);
        }
      } else {
        dir.normalize();
        mesh.position.add(dir.multiplyScalar(speed));
      }
      // Update circle if this is the active character
      if (
        personajeActivo.value &&
        mesh.userData.characterData.nombre === personajeActivo.value.nombre &&
        circleMesh
      ) {
        circleMesh.position.set(mesh.position.x, 0.1, mesh.position.z);
      }
    } else if (mesh.userData.targetPos) {
      const target = mesh.userData.targetPos;
      if (mesh.position.distanceTo(target) > 0.05) {
        const dir = new THREE.Vector3()
          .subVectors(target, mesh.position)
          .normalize();
        const speed = 0.2; // Adjust speed
        mesh.position.add(dir.multiplyScalar(speed));

        // Update circle if this is the active character
        if (
          personajeActivo.value &&
          mesh.userData.characterData.nombre === personajeActivo.value.nombre &&
          circleMesh
        ) {
          circleMesh.position.set(mesh.position.x, 0.1, mesh.position.z);
        }
      } else {
        mesh.position.copy(target);
      }
    }
  });

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// --- Interaction ---
async function onCanvasClick(event: MouseEvent) {
  if (!renderer || !camera) return;

  // Calculate mouse position
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(clickables, false);

  if (intersects.length > 0) {
    const obj = intersects[0].object;

    if (obj.userData.isCharacter) {
      // Select character for inspection
      personajeSeleccionado.value = obj.userData
        .characterData as PersonajeInstancia;
    } else if (obj.userData.grid) {
      // Move active character
      // Only if selected character is the active one
      if (
        personajeActivo.value &&
        personajeSeleccionado.value &&
        personajeSeleccionado.value.nombre === personajeActivo.value.nombre
      ) {
        const target = { x: obj.userData.grid.x, z: obj.userData.grid.z };

        // Optional: Check if target is in highlighted range
        if (!highlightedCubes.value.has(`${target.x},${target.z}`)) {
          console.log("Fuera de rango o no caminable");
          return;
        }

        // Set flag to prevent 'watch' from snapping position while we wait for path
        const mesh = characterMeshes.get(personajeActivo.value.nombre);
        if (mesh) mesh.userData.isWaitingForPath = true;

        const result = await moverPersonajeActivo(target);

        if (mesh) mesh.userData.isWaitingForPath = false;

        if (result.exito && result.camino) {
          // Start animation
          if (mesh) {
            mesh.userData.isMoving = true;
            // Convert path to Vector3s
            mesh.userData.pathQueue = result.camino.map(
              (c: any) => new THREE.Vector3(c.x, 1, c.z),
            );
            // Remove first point if it's current position
            if (
              mesh.userData.pathQueue.length > 0 &&
              mesh.userData.pathQueue[0].distanceTo(mesh.position) < 0.1
            ) {
              mesh.userData.pathQueue.shift();
            }
          }
          // Clear highlights after move
          highlightedCubes.value.clear();
          renderMap(mapa.value);
        } else {
          console.log("Movimiento fallido:", result.mensaje);
        }
      }
    }
  }
}

function onMouseMove(event: MouseEvent) {
  if (!renderer || !camera) return;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(clickables, false);

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    if (obj.userData.isCharacter) {
      panelVisible.value = true;
      panelPosition.value = { x: event.clientX, y: event.clientY };
      const data = obj.userData.characterData as PersonajeInstancia;
      panelData.value = {
        nombre: data.nombre,
        vidaActual: data.vidaActual,
        vidaMax: data.atributos.hp,
      };
      return;
    }
  }
  panelVisible.value = false;
}

onMounted(() => {
  init();
  nextTick(() => {
    if (renderer) {
      renderer.domElement.addEventListener("click", onCanvasClick);
      renderer.domElement.addEventListener("mousemove", onMouseMove);
    }
  });
});

onBeforeUnmount(() => {
  if (renderer) {
    renderer.domElement.removeEventListener("click", onCanvasClick);
    renderer.domElement.removeEventListener("mousemove", onMouseMove);
  }
  cancelAnimationFrame(rafId);
  if (renderer) {
    renderer.dispose();
  }
});
</script>
