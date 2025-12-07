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
  accionPreparada,
  iniciarPartida,
  moverPersonajeActivo,
} = usePartida();

const { mapa, obtenerAlcance } = useMapa();

// Local State for UI
const personajeSeleccionado = ref<PersonajeInstancia | null>(null);
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
let activeIndicatorMesh: THREE.Mesh | null = null;
let rangeIndicatorMesh: THREE.Mesh | null = null;

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
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x111111);
  el.appendChild(renderer.domElement);

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x111111, 20, 100);

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
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(20, 40, 30);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -50;
  dirLight.shadow.camera.left = -50;
  dirLight.shadow.camera.right = 50;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 200;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
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
        const geom = new THREE.BoxGeometry(CUBE_SIZE, 1.5, CUBE_SIZE);
        geom.translate(x, 1.5/2, z);
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

    // Create a texture or shader for the floor grid
    const size = 40;
    const divisions = 40;

    const material = new THREE.MeshStandardMaterial({
        color: 0x222222,
        side: THREE.DoubleSide,
        roughness: 0.8,
        metalness: 0.2,
    });

    navMesh = new THREE.Mesh(mergedGeometry, material);
    navMesh.receiveShadow = true;
    navMesh.name = "NavMesh";
    scene.add(navMesh);

    // Add a GridHelper on top for visual clarity
    const gridHelper = new THREE.GridHelper(size, divisions, 0x444444, 0x333333);
    // Align grid helper to center if needed, or create custom grid texture.
    // Assuming map is centered around 0,0 roughly.
    // gridHelper.position.y = 0.01;
    // scene.add(gridHelper);

    // Initialize Pathfinding
    // three-pathfinding expects a Mesh
    const zone = Pathfinding.createZone(mergedGeometry);
    pathfinding.setZoneData(ZONE, zone);
  }

  // Create Walls
  if (wallGeometries.length > 0) {
    const mergedWalls = BufferGeometryUtils.mergeGeometries(wallGeometries);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.7 });
    const wallMesh = new THREE.Mesh(mergedWalls, wallMaterial);
    wallMesh.castShadow = true;
    wallMesh.receiveShadow = true;
    wallMesh.name = "Walls";
    scene.add(wallMesh);
    cubes.push(wallMesh);
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

// Watch for Active Character / Action to update indicators
watch(
  [personajeActivo, accionPreparada],
  ([pj, accion]) => {
    updateActiveCharacterVisuals(pj);
    updateRangeIndicator(pj, accion);
  },
  { immediate: true },
);

function updateActiveCharacterVisuals(pj: PersonajeInstancia | null) {
  if (activeIndicatorMesh) {
    scene.remove(activeIndicatorMesh);
    activeIndicatorMesh = null;
  }

  if (!pj) return;

  const mesh = characterMeshes.get(pj.nombre);
  if (mesh) {
    // Add a floating marker above
    const geometry = new THREE.ConeGeometry(0.2, 0.5, 4);
    geometry.rotateX(Math.PI); // Point down
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    activeIndicatorMesh = new THREE.Mesh(geometry, material);

    // Position it above the character
    activeIndicatorMesh.position.copy(mesh.position);
    activeIndicatorMesh.position.y += 2.5;

    scene.add(activeIndicatorMesh);
  }
}

function updateRangeIndicator(pj: PersonajeInstancia | null, accion: any) {
  if (rangeIndicatorMesh) {
    scene.remove(rangeIndicatorMesh);
    rangeIndicatorMesh = null;
  }

  if (!pj) return;

  const mesh = characterMeshes.get(pj.nombre);
  if (!mesh) return;

  let range = 0;
  let color = 0x00ff00; // Default move green

  if (accion) {
      // Offensive action mode
      if (accion.nombre === "Carga") {
          // Special logic for Charge: Move + Attack?
          // Let's assume range is Movement * 2 for visual feedback of "Reach"
          range = pj.atributos.movimiento + 2; // +2 for attack range approx
          color = 0xff4400;
      } else {
          // Standard action range logic (placeholder)
          range = 5;
          color = 0xff0000;
      }

      // Highlight Targets
      highlightTargets(pj, range);

  } else {
      // Movement mode
      range = pj.atributos.movimiento;
      color = 0x4ade80;
      clearHighlights();
  }

  // Draw Range Circle
  const geometry = new THREE.RingGeometry(range - 0.1, range, 64);
  geometry.rotateX(-Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
  });

  rangeIndicatorMesh = new THREE.Mesh(geometry, material);
  rangeIndicatorMesh.position.copy(mesh.position);
  rangeIndicatorMesh.position.y = 0.05; // Slightly above ground
  scene.add(rangeIndicatorMesh);
}

function highlightTargets(attacker: PersonajeInstancia, range: number) {
  // Simple distance check against all other characters
  characterMeshes.forEach((mesh, id) => {
     if (id === attacker.nombre) return;

     const targetData = mesh.userData.characterData as PersonajeInstancia;
     const dist = mesh.position.distanceTo(characterMeshes.get(attacker.nombre)!.position);

     if (dist <= range) {
         // Valid target
         (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x550000);
     } else {
         // Out of range
         (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
     }
  });
}

function clearHighlights() {
    characterMeshes.forEach((mesh) => {
        (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
    });
}


function updateCharacterMeshes(partida: any) {
  const activeIds = new Set<string>();

  partida.equipos.forEach((equipo: any) => {
    equipo.personajes.forEach((pj: PersonajeInstancia) => {
      const id = pj.nombre;
      activeIds.add(id);

      let mesh = characterMeshes.get(id);
      if (!mesh) {
        // Create new mesh
        const geometry = new THREE.CapsuleGeometry(0.4, 1, 4, 8);
        const material = new THREE.MeshStandardMaterial({
          color: Math.random() * 0xffffff,
          roughness: 0.3,
          metalness: 0.1
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 0.9; // Half height
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        characterMeshes.set(id, mesh);
      }

      // Update Data
      mesh.userData.isCharacter = true;
      mesh.userData.characterData = pj;

      // Target Position
      const targetPos = new THREE.Vector3(pj.posicion.x, 0.9, pj.posicion.z); // y=0.9 for capsule center

      if (!mesh.userData.isMoving && !mesh.userData.isWaitingForPath) {
        if (mesh.position.distanceTo(targetPos) > 10) {
          mesh.position.copy(targetPos);
        } else {
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

// --- Animation Loop ---
function animate() {
  rafId = requestAnimationFrame(animate);
  controls.update();

  const dt = 0.016; // Approx delta time
  const now = Date.now() * 0.002;

  // Animate Active Indicator
  if (activeIndicatorMesh && characterMeshes.get(personajeActivo.value?.nombre || '')) {
      const charPos = characterMeshes.get(personajeActivo.value!.nombre)!.position;
      activeIndicatorMesh.position.set(charPos.x, charPos.y + 1.8 + Math.sin(now) * 0.2, charPos.z);
      activeIndicatorMesh.rotation.y += dt;
  }

  // Sync Range Indicator Position
  if (rangeIndicatorMesh && characterMeshes.get(personajeActivo.value?.nombre || '')) {
      const charPos = characterMeshes.get(personajeActivo.value!.nombre)!.position;
      rangeIndicatorMesh.position.set(charPos.x, 0.05, charPos.z);
  }

  // Interpolate Character Positions
  characterMeshes.forEach((mesh) => {
    if (
      mesh.userData.isMoving &&
      mesh.userData.pathQueue &&
      mesh.userData.pathQueue.length > 0
    ) {
      const target = mesh.userData.pathQueue[0];
      const currentPos = mesh.position.clone();
      target.y = currentPos.y;

      const dir = new THREE.Vector3().subVectors(target, currentPos);
      const dist = dir.length();
      const speed = 10 * dt;

      if (dist < speed) {
        mesh.position.copy(target);
        mesh.userData.pathQueue.shift();

        if (mesh.userData.pathQueue.length === 0) {
          mesh.userData.isMoving = false;
          mesh.userData.justFinishedMove = true;
        }
      } else {
        dir.normalize();
        mesh.position.add(dir.multiplyScalar(speed));

        // Rotate towards direction
        const targetRotation = Math.atan2(dir.x, dir.z);
        // Basic rotation smoothing
        let rotDiff = targetRotation - mesh.rotation.y;
        while (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
        while (rotDiff < -Math.PI) rotDiff += Math.PI * 2;
        mesh.rotation.y += rotDiff * 0.1;
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
        // If an action is prepared, maybe clicking ground cancels it or moves?
        // Usually, RPGs allow moving even if skill is selected (or clicking ground cancels skill).
        // Let's assume clicking ground moves unless cancelled.
        // But if action is prepared, we might not want to move accidentally.
        if (accionPreparada.value) {
            // Cancel action or ignore? Let's ignore movement if targeting.
            return;
        }

      // Move active character
      if (
        personajeActivo.value &&
        personajeSeleccionado.value &&
        personajeSeleccionado.value.nombre === personajeActivo.value.nombre
      ) {
        const mesh = characterMeshes.get(personajeActivo.value.nombre);
        if (!mesh) return;

        const startPos = mesh.position.clone();
        startPos.y = 0;

        // Find group ID (closest node)
        const groupId = pathfinding.getGroup(ZONE, startPos);

        // Find path
        const path = pathfinding.findPath(startPos, point, ZONE, groupId);

        if (path && path.length > 0) {

            // Calculate total path length
            let totalDist = 0;
            let current = startPos;
            for(const p of path) {
                totalDist += current.distanceTo(p);
                current = p;
            }

            const movimientoMax = personajeActivo.value.atributos.movimiento;
            if (totalDist > movimientoMax * 1.5) {
                 console.log("Too far!", totalDist);
                 // Optional: visual feedback for invalid move
                 return;
            }

            // Start animation locally
            mesh.userData.isMoving = true;
            // Use correct height (0.9 for capsule)
            mesh.userData.pathQueue = path.map(p => new THREE.Vector3(p.x, 0.9, p.z));

            // Update backend
            const finalPos = path[path.length - 1];

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
