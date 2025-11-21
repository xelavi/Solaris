<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";
import CharacterInfo from "./CharacterInfo.vue";
import { usePartida } from "../domain/usePartida";
import { X } from "lucide-react";

const box = ref<HTMLDivElement | null>(null);

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: MapControls;
let rafId = 0;
let baseColor = 0xbcbcbc;
class Character {
  name: string;
  health: number;
  mesh: THREE.Mesh;
  level: number;
  tile: THREE.Mesh | null;
  constructor(name: string, health: number, level: number) {
    this.name = name;
    this.health = health;
    this.level = level;
    this.tile = null;
    this.mesh = null;
  }
}

let characters: Character[] = [];

// Raycasting & puntero ------------- // NEW
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickables: THREE.Object3D[] = [];
let hovered: THREE.Mesh | null = null;
let selected: THREE.Mesh | null = null;
// -----------------------------------hex
const hexs = [];
// Hashmap to store meshes by their grid coordinates
const meshMap = new Map<string, THREE.Mesh>();
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

  // Escena
  scene = new THREE.Scene();

  const aspect = width / height;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000); // FIX
  const cameraDistance = 80;
  camera.position.set(cameraDistance, cameraDistance, cameraDistance);
  camera.lookAt(0, 0, 0);

  // === Controles tipo Diablo/LoL ===
  controls = new MapControls(camera, renderer.domElement);
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE,
  };
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

  // === Grilla de Hexágonos (Corregida) ===
  const size = 2; // Hexagon radius
  const hexWidth = Math.sqrt(3) * size;
  const hexHeight = 2 * size;

  // Create geometry and material once and reuse
  const hexGeo = new THREE.CylinderGeometry(size, size, 0.5, 6); // Flatter hexes
  const mat = new THREE.MeshStandardMaterial({
    color: 0xbcbcbc, // A nice gray
    flatShading: true, // Gives a low-poly look
  });

  const gridWidth = 80;
  const gridHeight = 80;

  for (let j = 0; j < gridHeight; j++) {
    // Rows (Z axis)
    for (let i = 0; i < gridWidth; i++) {
      // Columns (X axis)
      // IMPORTANTE: empezar con material compartido
      const hex = new THREE.Mesh(hexGeo, mat);
      const w = Math.sqrt(3) * size * 1.05;
      const h = 2 * size * 1.05;
      const rowStep = (3 / 4) * h;
      hex.name = `${i}_${j}`;
      hex.position.x = i * w + (j % 2) * (w / 2);
      hex.position.z = j * rowStep;
      hexs.push(hex);

      // Store in hashmap using coordinates as key
      const coordKey = `${i},${j}`;
      meshMap.set(coordKey, hex);

      // Store grid coordinates on the mesh for easy access
      (hex as any).gridX = i;
      (hex as any).gridY = j;

      // Guarda referencias
      (hex as any).mat = mat; // NEW: guardamos el ref para restaurar
      (hex as any).isHighlighted = false; // NEW
      (hex as any).isSelected = false; // NEW

      scene.add(hex);
      clickables.push(hex); // NEW
    }
  }

  let character = new Character("Chara", 100, 1);
  characters.push(character);
  const characterMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  character.mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.5, 3, 20),
    characterMaterial,
  );
  // Use hashmap to get tile at coordinates (40, 40) - center of 80x80 grid
  const startTile = getMeshAt(40, 40);
  if (startTile) {
    character.tile = startTile;
    character.mesh.position.set(
      startTile.position.x,
      startTile.position.y + 1.5,
      startTile.position.z,
    );
    console.log("Character placed at tile:", startTile.name);
  }

  // Store original material reference like with hexagons
  (character.mesh as any).mat = characterMaterial;
  (character.mesh as any).isHighlighted = false;
  (character.mesh as any).isSelected = false;

  console.log(hexs.length);
  console.log(character.tile);
  character.mesh.name = "Character";
  scene.add(character.mesh);
  clickables.push(character.mesh);

  // === Centrar la cámara en la grilla ===
  const totalGridWidth = (gridWidth + 0.5) * hexWidth;
  const totalGridHeight = (gridHeight - 1) * hexHeight * 0.75;
  const gridCenter = new THREE.Vector3(
    totalGridWidth / 2,
    0,
    totalGridHeight / 2,
  );

  controls.target.copy(gridCenter);
  // Update camera position to look at the new target from its offset
  camera.position
    .copy(gridCenter)
    .add(new THREE.Vector3(cameraDistance, cameraDistance, cameraDistance));
  controls.update(); // Sync controls
  // Eventos de puntero ------------------------------ // NEW
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);
}

// Hashmap helper functions ----------------------------------------- // NEW
function getMeshAt(x: number, y: number): THREE.Mesh | undefined {
  const key = `${x},${y}`;
  return meshMap.get(key);
}

function getMeshCoordinates(mesh: THREE.Mesh): { x: number; y: number } | null {
  const x = (mesh as any).gridX;
  const y = (mesh as any).gridY;
  if (x !== undefined && y !== undefined) {
    return { x, y };
  }
  return null;
}

function getNeighbors(x: number, y: number, range: number = 5): THREE.Mesh[] {
  const neighbors: THREE.Mesh[] = [];
  const visited = new Set<string>();
  const queue: Array<{ x: number; y: number; distance: number }> = [
    { x, y, distance: 0 },
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const { x: currentX, y: currentY, distance } = current;
    const key = `${currentX},${currentY}`;

    if (visited.has(key)) continue;
    visited.add(key);

    // Don't include the starting position, only neighbors
    if (distance > 0) {
      const mesh = getMeshAt(currentX, currentY);
      if (mesh) neighbors.push(mesh);
    }

    // If we haven't reached the maximum range, add neighbors to queue
    if (distance < range) {
      const isEven = currentY % 2 === 0;
      const offsets: [number, number][] = isEven
        ? [
            [-1, -1],
            [0, -1],
            [1, 0],
            [0, 1],
            [-1, 1],
            [-1, 0],
          ] // Even row offsets
        : [
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 0],
          ]; // Odd row offsets

      for (const [dx, dy] of offsets) {
        const nextX = currentX + dx;
        const nextY = currentY + dy;
        const nextKey = `${nextX},${nextY}`;

        if (!visited.has(nextKey)) {
          queue.push({ x: nextX, y: nextY, distance: distance + 1 });
        }
      }
    }
  }

  return neighbors;
}

// Raycasting helpers ----------------------------------------------- // NEW
function setPointerFromEvent(event: PointerEvent) {
  const rect = renderer!.domElement.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  pointer.set(x * 2 - 1, -(y * 2 - 1));
}

function pick(event: PointerEvent) {
  setPointerFromEvent(event);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickables, false);
  return hits.length ? (hits[0].object as THREE.Mesh) : null;
}

function highlight(mesh: THREE.Mesh | null) {
  if (mesh === hovered) return;

  if (mesh && mesh.name === "Character") {
    return;
  }
  // Quita highlight previo (si no está seleccionado)
  if (hovered && !(hovered as any).isSelected) {
    const m = hovered.material as THREE.MeshStandardMaterial;
    if (m !== (hovered as any).mat) {
      m.dispose();
      hovered.material = (hovered as any).mat;
    }
    (hovered as any).isHighlighted = false;
  }

  hovered = mesh;

  // Aplica highlight al nuevo
  if (hovered && !(hovered as any).isSelected) {
    // Clon perezoso para no afectar a todos los hex
    const base = (hovered as any).mat as THREE.MeshStandardMaterial;
    const clone = base.clone();
    clone.color = base.color.clone().offsetHSL(0, 0.1, 0.15); // un poco más claro
    hovered.material = clone;
    (hovered as any).isHighlighted = true;
    renderer!.domElement.style.cursor = "pointer";
  } else {
    renderer!.domElement.style.cursor = "grab";
  }
}
function changeColor(mesh: THREE.Mesh, color: number) {
  const m = mesh.material as THREE.MeshStandardMaterial;
  if (m !== (mesh as any).mat) m.dispose();
  const base = (mesh as any).mat as THREE.MeshStandardMaterial;

  // Safety check to prevent undefined error
  if (!base) {
    console.error("Base material not found for mesh:", mesh.name);
    return;
  }

  const clone = base.clone();
  clone.color = new THREE.Color(color);
  mesh.material = clone;
}

function toggleSelect(mesh: THREE.Mesh) {
  const wasSelected = (mesh as any).isSelected;
  if (mesh.name === "Character") {
    console.log("Character clicked, ignoring selection toggle.");

    if (characters[0].tile.isSelected) {
      changeColor(characters[0].tile, baseColor);
      characters[0].tile.isSelected = false;
    } else {
      changeColor(characters[0].tile, 0x808080);
      characters[0].tile.isSelected = true;
    }

    console.log(characters[0].tile);

    let neighbors = getNeighbors(
      characters[0].tile.gridX,
      characters[0].tile.gridY,
      15,
    );

    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i] && !neighbors[i].isSelected) {
        changeColor(neighbors[i], 0x808080);
        neighbors[i].isSelected = true;
      } else if (neighbors[i] && neighbors[i].isSelected) {
        changeColor(neighbors[i], baseColor);
        neighbors[i].isSelected = false;
      }
    }

    return; // Prevent selecting the character
  }

  if (mesh.isSelected) {
    move(mesh);
  }
}

function move(mesh: THREE.Mesh) {
  const coords = getMeshCoordinates(mesh);
  if (coords) {
    const character = characters[0];
    const targetTile = getMeshAt(coords.x, coords.y);
    let neigthbors = getNeighbors(
      character.tile.gridX,
      character.tile.gridY,
      15,
    );
    changeColor(character.tile, baseColor);
    character.tile.isSelected = false;
    for (let i = 0; i < neigthbors.length; i++) {
      changeColor(neigthbors[i], baseColor);
      neigthbors[i].isSelected = false;
    }
    if (targetTile) {
      character.tile = targetTile;
      character.mesh.position.set(
        targetTile.position.x,
        targetTile.position.y + 1.5,
        targetTile.position.z,
      );
      console.log(`Character moved to tile: ${targetTile.name}`);
    }
  }
}

// Eventos de puntero ----------------------------------------------- // NEW
function onPointerMove(event: PointerEvent) {
  const hit = pick(event);
  //highlight(hit)
}

function onPointerDown(event: PointerEvent) {
  const hit = pick(event);
  if (hit) {
    toggleSelect(hit);
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

  // 3. Dispose renderer
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

<template>
  <div
    ref="box"
    style="
      width: 100dvw;
      height: 100dvh;
      background-color: #f3f4f6;
      cursor: grab;
    "
  />
  <CharacterInfo
    v-if="selected"
    :character="{ name: 'Hexagon', health: 100, level: 1 }"
  />
</template>
