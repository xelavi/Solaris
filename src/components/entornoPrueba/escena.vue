// Dibuja un círculo alrededor de una posición (por defecto el personaje) //
color: string o número (hex), radio: number, soloBorde: boolean, grosor: number
opcional

<template>
  <div class="w-full h-screen relative">
    <div ref="canvasContainer" class="w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { MapControls } from "three/addons/controls/MapControls.js";
import * as THREE from "three";
import { astar, Cell } from '../../domain/composables/pathfinder';
let cubes: THREE.Mesh[] = [];
let lastPathCubes: THREE.Mesh[] = [];
import type { PersonajeInstancia, PartidaData } from "../../domain/Partida";
const props = defineProps<{ partidaId?: string }>();

// Referencias
const canvasContainer = ref<HTMLDivElement | null>(null);

// Variables de Three.js
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: MapControls;
let rafId = 0;

// Raycasting
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickables: THREE.Object3D[] = [];
let hoveredHex: THREE.Mesh | null = null;

// Configuración de la cuadrícula
const GRID_WIDTH = 40;
const GRID_HEIGHT = 40;
const CUBE_SIZE = 1;

const partidaActual = ref<PartidaData | null>(null);
const personajeSeleccionado = ref<PersonajeInstancia | null>(null);

function init() {
  if (!canvasContainer) return;
  const el = canvasContainer.value;
  const width = el.clientWidth;
  const height = el.clientHeight;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x1a1a2e); // Fondo oscuro
  el.appendChild(renderer.domElement);

  // Escena
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x1a1a2e, 50, 200);

  // Cámara
  const aspect = width / height;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000);
  const cameraDistance = 50;
  camera.position.set(cameraDistance, cameraDistance, cameraDistance);
  camera.lookAt(0, 0, 0);

  // Controles tipo Diablo/LoL
  controls = new MapControls(camera, renderer.domElement);
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE,
  };
  controls.touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_PAN,
  };
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2.5;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Iluminación
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(20, 40, 30);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0x4a90e2, 0.3);
  dirLight2.position.set(-20, 20, -30);
  scene.add(dirLight2);
  cargarPartida();
  animate();
  createCharacter();
  //mostrarCirculoSuelo({ color: 0x00ff00, radio: 1 });
}
function animate() {
  rafId = requestAnimationFrame(animate);
  controls.update();
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
  update();
}
// Referencia global al mesh del personaje y al círculo
let characterMesh: THREE.Mesh | null = null;
let circleMesh: THREE.Mesh | null = null;

function createCharacter() {
  if (!partidaActual.value) return;
  // Solo un personaje de prueba en el centro
  const geometry = new THREE.BoxGeometry(1, 2, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
  characterMesh = new THREE.Mesh(geometry, material);
  characterMesh.position.set(0, 1, 0);
  scene.add(characterMesh);
  // Hacer clickeable
  characterMesh.userData.isCharacter = true;
  clickables.push(characterMesh);
}
const solid = new Set<string>();

function key(gx: number, gy: number, gz: number) {
  return `${gx},${gy},${gz}`;
}

function isSolid(gx: number, gy: number, gz: number): boolean {
  return solid.has(key(gx, gy, gz));
}
let minGX: number, maxGX: number;
let minGY: number, maxGY: number;
let minGZ: number, maxGZ: number;
let sizeX: number;
let sizeZ: number;
let walkable: boolean[][];
let heightMap: number[][];
let blocked: boolean[][];

function markWallsFromCubes(cubes: THREE.Mesh[]) {
  for (const cube of cubes) {
    // Opcional: solo marcar los que quieras como pared
    // if (!cube.userData.isWall) continue;

    const { ix, iz } = worldToGridIndices(cube.position);
    if (
      ix < 0 || iz < 0 ||
      ix >= sizeX || iz >= sizeZ
    ) continue;

    blocked[ix][iz] = true; // esta celda es una pared
  }
}

function createGrid() {
  // Crea un suelo de cubos (BoxGeometry) en una cuadrícula y los hace clickeables
  const boxSize = CUBE_SIZE;
  const offsetX = -(GRID_WIDTH * boxSize) / 2 + boxSize / 2;
  const offsetZ = -(GRID_HEIGHT * boxSize) / 2 + boxSize / 2;
  const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
  cubes = [];
  minGX = Infinity;
  maxGX = -Infinity;
  minGY = Infinity;
  maxGY = -Infinity;
  minGZ = Infinity;
  maxGZ = -Infinity;
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let z = 0; z < GRID_HEIGHT; z++) {
      const geometry = new THREE.BoxGeometry(boxSize, 1, boxSize);
      const cube = new THREE.Mesh(geometry, material.clone());
      cube.position.set(offsetX + x * boxSize, 0, offsetZ + z * boxSize); // Y=0 para estar sobre el plano
      cube.castShadow = false;
      cube.receiveShadow = true;
      cube.userData.grid = { x, z };
      const gx = Math.round(cube.position.x / CUBE_SIZE);
      const gy = Math.round(cube.position.y / CUBE_SIZE);
      const gz = Math.round(cube.position.z / CUBE_SIZE);

      solid.add(key(gx, gy, gz));

      if (gx < minGX) minGX = gx;
      if (gx > maxGX) maxGX = gx;
      if (gy < minGY) minGY = gy;
      if (gy > maxGY) maxGY = gy;
      if (gz < minGZ) minGZ = gz;
      if (gz > maxGZ) maxGZ = gz;

      scene.add(cube);
      clickables.push(cube);
      cubes.push(cube);
    }
  }
  let walls = [];
  for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(boxSize, 1, boxSize);
    const cube = new THREE.Mesh(geometry, material.clone());
     cube.position.set(offsetX + i+5 * boxSize, 1, offsetZ+5 + 0 * boxSize); // Y=0 para estar sobre el plano
    cube.castShadow = false;
    cube.receiveShadow = true;
    walls.push(cube);
    scene.add(cube);
  }
  
  sizeX = maxGX - minGX + 1;
  sizeZ = maxGZ - minGZ + 1;

  heightMap = new Array(sizeX);
  walkable = new Array(sizeX);

  for (let ix = 0; ix < sizeX; ix++) {
    heightMap[ix] = new Array(sizeZ);
    walkable[ix] = new Array(sizeZ);

    for (let iz = 0; iz < sizeZ; iz++) {
      const gx = minGX + ix;
      const gz = minGZ + iz;

      let topY: number | null = null;

      // buscamos el bloque más alto en esta columna
      for (let gy = minGY; gy <= maxGY; gy++) {
        if (isSolid(gx, gy, gz)) {
          topY = gy;
        }
      }

      if (topY === null) {
        heightMap[ix][iz] = -1;
        walkable[ix][iz] = false;
      } else {
        heightMap[ix][iz] = topY;
        // caminable si hay suelo y no hay bloque justo encima
        const hasHeadroom = !isSolid(gx, topY + 1, gz);
        walkable[ix][iz] = hasHeadroom;
      }
    }
  }
  blocked = walkable.map(
  row => row.map(() => false)
  
);  
markWallsFromCubes(walls);
}

function canWalk(ix: number, iz: number): boolean {
  return walkable[ix][iz] && !blocked[ix][iz];
}
function worldToGridIndices(pos: THREE.Vector3) {
  const gx = Math.round(pos.x / CUBE_SIZE);
  const gz = Math.round(pos.z / CUBE_SIZE);

  const ix = gx - minGX;
  const iz = gz - minGZ;

  return { ix, iz, gx, gz };
}

function gridIndexToWorld(ix: number, iz: number): THREE.Vector3 {
  const gx = minGX + ix;
  const gz = minGZ + iz;
  const gy = heightMap[ix][iz];

  return new THREE.Vector3(
    gx * CUBE_SIZE,
    (gy + 1) * CUBE_SIZE, // encima del bloque
    gz * CUBE_SIZE
  );
}
function mostrarCirculoSuelo({
  x = 0,
  z = 0,
  color = 0x00ff00,
  radio = 2,
  soloBorde = false,
  grosor = 0.15,
} = {}) {
  let circleMesh: THREE.Mesh | THREE.Line;
  if (soloBorde) {
    // Circunferencia (grosor configurable)
    const segments = 64;
    const geometry = new THREE.TorusGeometry(radio, grosor, 8, segments);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.7,
    });
    circleMesh = new THREE.Mesh(geometry, material);
    circleMesh.rotation.x = Math.PI / 2;
    circleMesh.position.set(x, 0.01, z);
  } else {
    // Círculo relleno
    const geometry = new THREE.CircleGeometry(radio, 64);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    circleMesh = new THREE.Mesh(geometry, material);
    circleMesh.rotation.x = -Math.PI / 2;
    circleMesh.position.set(x, 0.02, z);
  }
  scene.add(circleMesh);
  return circleMesh;
}


let currentPath: THREE.Vector3[] | null = null;
let currentPathIndex = 0;

function movePlayerTo(targetWorld: THREE.Vector3) {
  const start = worldToGridIndices(characterMesh.position);
  const goal = worldToGridIndices(targetWorld);

  if (
    start.ix < 0 ||
    start.ix >= sizeX ||
    start.iz < 0 ||
    start.iz >= sizeZ ||
    goal.ix < 0 ||
    goal.ix >= sizeX ||
    goal.iz < 0 ||
    goal.iz >= sizeZ
  )
    return;

  if (!walkable[goal.ix][goal.iz]) return;

  // Usar astar importado
  const pathCells = astar(
    { x: start.ix, z: start.iz },
    { x: goal.ix, z: goal.iz },
    walkable,
    canWalk
  );

  if (!pathCells) return;

  currentPath = pathCells.map((c) => gridIndexToWorld(c.x, c.z));
  currentPathIndex = 0;
}

// en tu bucle de animación
const clock = new THREE.Clock();
const moveSpeed = 6;

function update() {
  const delta = clock.getDelta();

  if (currentPath && currentPathIndex < currentPath.length) {
    const target = currentPath[currentPathIndex];
    const dir = new THREE.Vector3().subVectors(target, characterMesh.position);
    const dist = dir.length();

    // Aumenta el umbral para evitar quedarse atascado
    const threshold = Math.max(0.1, moveSpeed * delta * 1.5);
    if (dist < threshold) {
      characterMesh.position.copy(target); // Asegura que llegue exactamente
      currentPathIndex++;
    } else {
      dir.normalize();
      characterMesh.position.addScaledVector(dir, moveSpeed * delta);
    }
  }
}
function cargarPartida() {
  try {
    const partidaString = localStorage.getItem(props.partidaId);
    if (!partidaString) {
      console.error("❌ No se encontró la partida");
      // agregarLog("sistema", "❌ Error: No se encontró la partida");
      return;
    }

    partidaActual.value = JSON.parse(partidaString);
    //console.log("✅ Partida cargada:", partidaActual.value?.nombre);
    // console.log("📊 Total personajes:", contarTotalPersonajes());
  
  } catch (error) {
    console.error("❌ Error al cargar la partida:", error);
  }
}

function onCanvasClick(event: MouseEvent) {
  if (!renderer || !camera) return;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(clickables, false);
  if (intersects.length > 0) {
    const obj = intersects[0].object;
    if (obj.userData.isCharacter) {
      // Alternar círculo
      if (circleMesh) {
        scene.remove(circleMesh);
        circleMesh = null;
      } else {
        circleMesh = mostrarCirculoSuelo({
          x: obj.position.x,
          z: obj.position.z,
          color: 0x00ff00,
          radio: 1.5,
          soloBorde: true,
          grosor: 0.12,
        });
      }
    } else if (obj.userData.grid) {
      // Clic en cubo de la cuadrícula
      handleCubeClick(obj);
    }
  }
}

function handleCubeClick(cube: THREE.Mesh) {
  // Limpiar colores previos
  cubes.forEach((c) => c.material.color.set(0x3b82f6));
  lastPathCubes.forEach((c) => c.material.color.set(0x3b82f6));
  lastPathCubes = [];

  // Obtener posición de inicio (personaje) y destino (cubo clicado)
  if (!characterMesh) return;
  const start = characterMesh.position.clone();
  const end = cube.position.clone();
  movePlayerTo(end);
 
}

onMounted(() => {
  init();
  createGrid();
  //window.addEventListener("resize", handleResize);
  // Añadir listener de click al canvas
  nextTick(() => {
    if (renderer) {
      renderer.domElement.addEventListener("click", onCanvasClick);
    }
  });
});

onBeforeUnmount(() => {
  if (renderer) {
    renderer.domElement.removeEventListener("click", onCanvasClick);
  }
});
</script>

<style scoped></style>
