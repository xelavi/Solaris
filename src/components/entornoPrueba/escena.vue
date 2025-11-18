<template>
  <div class="w-full h-screen relative">
    <div ref="canvasContainer" class="w-full h-full"></div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { MapControls } from "three/addons/controls/MapControls.js";
import * as THREE from "three";


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
const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const HEX_SIZE = 2;
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

   animate();
   createCharacter();
}
function animate() {
  rafId = requestAnimationFrame(animate);
  controls.update();
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}
function createCharacter() {
    // Crea un personaje simple (cubo) y lo añade a la escena
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
    const character = new THREE.Mesh(geometry, material);
    character.position.set(0, 1, 0);
    scene.add(character);
}
function createGrid() {
  // Crea un suelo de cubos (BoxGeometry) en una cuadrícula
  const boxSize = HEX_SIZE;
  const offsetX = -(GRID_WIDTH * boxSize) / 2 + boxSize / 2;
  const offsetZ = -(GRID_HEIGHT * boxSize) / 2 + boxSize / 2;
  const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let z = 0; z < GRID_HEIGHT; z++) {
      const geometry = new THREE.BoxGeometry(boxSize, 1, boxSize);
      const cube = new THREE.Mesh(geometry, material.clone());
      cube.position.set(offsetX + x * boxSize, -0.5, offsetZ + z * boxSize);
      cube.castShadow = false;
      cube.receiveShadow = true;
      scene.add(cube);
    }
  }
}
onMounted(() => {
  init();
  createGrid();
  //window.addEventListener("resize", handleResize);
});
</script>

<style scoped></style>
