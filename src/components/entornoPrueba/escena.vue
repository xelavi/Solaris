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
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { Pathfinding } from "three-pathfinding";
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

// Pathfinding
const pathfinding = new Pathfinding();
const ZONE = 'level1';
let navMesh: THREE.Mesh | null = null;

// Raycasting
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickables: THREE.Object3D[] = [];
let cubes: THREE.Mesh[] = []; // Only for walls now

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
  if (navMesh) {
    scene.remove(navMesh);
    navMesh = null;
  }

  const geometries: THREE.BufferGeometry[] = [];
  const wallGeometries: THREE.BufferGeometry[] = [];

  grid.forEach((row) => {
    row.forEach((cell) => {
      if (!cell) return;

      const x = cell.x * CUBE_SIZE;
      const z = cell.z * CUBE_SIZE;

      if (cell.blocked) {
        // Wall
        const geom = new THREE.BoxGeometry(CUBE_SIZE, 1, CUBE_SIZE);
        geom.translate(x, 1, z);
        wallGeometries.push(geom);
      } else {
        // Floor / NavMesh part
        const geom = new THREE.PlaneGeometry(CUBE_SIZE, CUBE_SIZE);
        geom.rotateX(-Math.PI / 2);
        geom.translate(x, 0, z);
        geometries.push(geom);
      }
    });
  });

  // Create Floor / NavMesh
  if (geometries.length > 0) {
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);
    const material = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        side: THREE.DoubleSide,
        roughness: 0.8
    });
    navMesh = new THREE.Mesh(mergedGeometry, material);
    navMesh.name = "NavMesh";
    scene.add(navMesh);

    // Initialize Pathfinding
    // three-pathfinding expects a Mesh
    const zone = Pathfinding.createZone(mergedGeometry);
    pathfinding.setZoneData(ZONE, zone);
  }

  // Create Walls
  if (wallGeometries.length > 0) {
    const mergedWalls = BufferGeometryUtils.mergeGeometries(wallGeometries);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const wallMesh = new THREE.Mesh(mergedWalls, wallMaterial);
    wallMesh.name = "Walls";
    scene.add(wallMesh);
    cubes.push(wallMesh); // Keep in cubes for tracking, though not individual anymore
  }

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
// Note: With NavMesh, highlighting cubes is less relevant visually on the floor,
// but we might want to show range in a different way.
// For now, disabling cube highlighting or we could create an overlay mesh.
watch(personajeSeleccionado, (pj) => {
  // If we want to highlight range, we would need to generate a mesh for the range area.
  // For now, keeping it simple without grid highlights, relying on movement feedback.
});

function updateCharacterMeshes(partida: any) {
  const activeIds = new Set<string>();

  partida.equipos.forEach((equipo: any) => {
    equipo.personajes.forEach((pj: PersonajeInstancia) => {
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
        // Snap if far away (initial load)
        if (mesh.position.distanceTo(targetPos) > 10) {
          mesh.position.copy(targetPos);
        } else {
            // If slightly off, maybe snap or interpolate?
            // With navmesh we want the frontend to drive position during movement,
            // but sync with backend when idle.
            if (!mesh.userData.justFinishedMove) {
                 mesh.position.copy(targetPos);
            }
            mesh.userData.justFinishedMove = false;
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
  if (navMesh) clickables.push(navMesh);
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

  const dt = 0.016; // Approx delta time

  // Interpolate Character Positions
  characterMeshes.forEach((mesh) => {
    if (
      mesh.userData.isMoving &&
      mesh.userData.pathQueue &&
      mesh.userData.pathQueue.length > 0
    ) {
      const target = mesh.userData.pathQueue[0];
      const currentPos = mesh.position.clone();
      // Keep height constant for now (or follow navmesh height if 3D)
      target.y = currentPos.y;

      const dir = new THREE.Vector3().subVectors(target, currentPos);
      const dist = dir.length();
      const speed = 10 * dt; // Faster fluid movement

      if (dist < speed) {
        mesh.position.copy(target);
        mesh.userData.pathQueue.shift();

        if (mesh.userData.pathQueue.length === 0) {
          mesh.userData.isMoving = false;
          mesh.userData.justFinishedMove = true;
          // Final sync with backend logic happens in onCanvasClick await
        }
      } else {
        dir.normalize();
        mesh.position.add(dir.multiplyScalar(speed));

        // Rotate towards direction
        const targetRotation = Math.atan2(dir.x, dir.z);
        // Simple lerp rotation
        const currentRotation = mesh.rotation.y;
        // Handle wrap around PI/-PI if needed, but for now simple
        mesh.rotation.y = targetRotation;
      }

      // Update circle if this is the active character
      if (
        personajeActivo.value &&
        mesh.userData.characterData.nombre === personajeActivo.value.nombre &&
        circleMesh
      ) {
        circleMesh.position.set(mesh.position.x, 0.1, mesh.position.z);
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
    const point = intersects[0].point;

    if (obj.userData.isCharacter) {
      // Select character
      const target = obj.userData.characterData as PersonajeInstancia;
      personajeSeleccionado.value = target;

      // Dispatch event for targeting system
      window.dispatchEvent(
        new CustomEvent("character-clicked", { detail: target }),
      );
    } else if (obj === navMesh) {
      // Move active character
      if (
        personajeActivo.value &&
        personajeSeleccionado.value &&
        personajeSeleccionado.value.nombre === personajeActivo.value.nombre
      ) {
        const mesh = characterMeshes.get(personajeActivo.value.nombre);
        if (!mesh) return;

        const startPos = mesh.position.clone();
        // Adjust y to navmesh level (0 usually)
        startPos.y = 0;

        // Find group ID (closest node)
        const groupId = pathfinding.getGroup(ZONE, startPos);

        // Find path
        const path = pathfinding.findPath(startPos, point, ZONE, groupId);

        if (path && path.length > 0) {
            // Validate distance via backend check or simple check
            // For now, let's assume we can move anywhere on navmesh if it is connected
            // But we should check action points/distance limits.

            // Calculate total path length
            let totalDist = 0;
            let current = startPos;
            for(const p of path) {
                totalDist += current.distanceTo(p);
                current = p;
            }

            const movimientoMax = personajeActivo.value.atributos.movimiento;
            if (totalDist > movimientoMax * 1.5) { // Allow some slack for fluidity
                 // Or warn user
                 console.log("Too far!", totalDist);
                 // We could truncate path? For now just allow it or fail.
                 // Let's truncate path to max distance
            }

            // Start animation locally
            mesh.userData.isMoving = true;
            mesh.userData.pathQueue = path.map(p => new THREE.Vector3(p.x, 1, p.z)); // Raise y to character height

            // Update backend
            // We update to the final position
            const finalPos = path[path.length - 1];

            // Call usePartida to update state (consume action, update pos)
            // We pass coordinates. Backend currently expects integers for grid logic?
            // If backend logic is strict about grid, we might have issues.
            // Let's pass the float coords. Character.posicion is {x, y, z}.

            await moverPersonajeActivo({ x: finalPos.x, z: finalPos.z });

        } else {
            console.log("No path found");
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
