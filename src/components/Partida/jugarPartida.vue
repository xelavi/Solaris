<template>
  <div class="w-full h-screen relative">
    <!-- Canvas container -->
    <div ref="canvasContainer" class="w-full h-full"></div>

    <!-- UI Overlay - Info de partida -->
    <div
      class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-2">Mapa</h2>
      <div v-if="partidaActual" class="mb-3 p-2 bg-blue-50 rounded">
        <p class="text-sm font-semibold text-blue-800">
          {{ partidaActual.nombre }}
        </p>
        <p class="text-xs text-blue-600">
          {{ totalPersonajes }} personajes
        </p>
      </div>
      <div class="space-y-2 text-sm text-gray-600">
        <p>🖱️ <strong>Clic Izquierdo:</strong> Mover cámara</p>
        <p>🖱️ <strong>Rueda:</strong> Zoom</p>
        <p>🖱️ <strong>Clic Derecho:</strong> Rotar</p>
        <p>👤 <strong>Clic en personaje:</strong> Seleccionar</p>
        <p>⬡ <strong>Clic en hexágono libre:</strong> Mover seleccionado</p>
      </div>
    </div>

    <!-- Ficha del Personaje Seleccionado -->
    <div
      v-if="personajeSeleccionado"
      class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 w-80 max-h-[85vh] overflow-y-auto"
    >
      <!-- Header con nombre -->
      <div class="mb-3 pb-3 border-b-2 border-gray-200">
        <h3 class="text-2xl font-bold text-gray-800">
          {{ personajeSeleccionado.nombre }}
        </h3>
        <p class="text-sm text-gray-600">
          Nivel {{ personajeSeleccionado.nivel }}
        </p>
      </div>

      <!-- Vida -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-semibold text-gray-700">Vida</span>
          <span class="text-sm font-bold text-red-600">
            {{ personajeSeleccionado.vidaActual }} /
            {{ personajeSeleccionado.atributos.hp }}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            class="bg-gradient-to-r from-red-500 to-red-600 h-full transition-all duration-300"
            :style="{
              width: `${
                (personajeSeleccionado.vidaActual /
                  personajeSeleccionado.atributos.hp) *
                100
              }%`,
            }"
          ></div>
        </div>
      </div>

      <!-- Información básica -->
      <div class="grid grid-cols-2 gap-2 mb-4">
        <div class="bg-blue-50 rounded p-2">
          <p class="text-xs text-blue-600 font-semibold">Especialidad</p>
          <p class="text-sm text-gray-800 truncate">
            {{ personajeSeleccionado.especialidad }}
          </p>
        </div>
        <div class="bg-purple-50 rounded p-2">
          <p class="text-xs text-purple-600 font-semibold">Estilo Marcial</p>
          <p class="text-sm text-gray-800 truncate">
            {{ personajeSeleccionado.estilo_marcial }}
          </p>
        </div>
        <div class="bg-green-50 rounded p-2">
          <p class="text-xs text-green-600 font-semibold">Trasfondo</p>
          <p class="text-sm text-gray-800 truncate">
            {{ personajeSeleccionado.trasfondo }}
          </p>
        </div>
        <div class="bg-orange-50 rounded p-2">
          <p class="text-xs text-orange-600 font-semibold">Raza</p>
          <p class="text-sm text-gray-800 truncate">
            {{ personajeSeleccionado.raza }}
          </p>
        </div>
      </div>

      <!-- Atributos principales -->
      <div class="mb-4">
        <h4 class="text-sm font-bold text-gray-700 mb-2">Atributos</h4>
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-red-50 rounded p-2 text-center">
            <p class="text-xs text-red-600 font-semibold">Cuerpo</p>
            <p class="text-lg font-bold text-gray-800">
              {{ personajeSeleccionado.atributos.cuerpo }}
            </p>
          </div>
          <div class="bg-green-50 rounded p-2 text-center">
            <p class="text-xs text-green-600 font-semibold">Agilidad</p>
            <p class="text-lg font-bold text-gray-800">
              {{ personajeSeleccionado.atributos.agilidad }}
            </p>
          </div>
          <div class="bg-blue-50 rounded p-2 text-center">
            <p class="text-xs text-blue-600 font-semibold">Mente</p>
            <p class="text-lg font-bold text-gray-800">
              {{ personajeSeleccionado.atributos.mente }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat de Logs -->
    <div
      ref="logPanel"
      :style="{
        left: logPosition.x ? `${logPosition.x}px` : 'auto',
        top: logPosition.y ? `${logPosition.y}px` : 'auto',
        bottom: logPosition.x || logPosition.y ? 'auto' : '1rem',
        right: logPosition.x || logPosition.y ? 'auto' : '1rem',
      }"
      class="absolute bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl w-96 h-64 flex flex-col"
    >
      <!-- Header del chat (área para arrastrar) -->
      <div
        @mousedown="startDraggingLog"
        class="bg-gray-800 rounded-t-lg px-4 py-2 border-b border-gray-700 cursor-move select-none hover:bg-gray-700 transition-colors"
      >
        <h4 class="text-sm font-bold text-white flex items-center gap-2">
          <span class="text-gray-500">⋮⋮</span>
          📜 Logs
        </h4>
      </div>

      <!-- Área de mensajes -->
      <div
        ref="logContainer"
        class="flex-1 overflow-y-auto p-3 space-y-2 text-xs"
      >
        <div
          v-for="(log, index) in logs"
          :key="index"
          class="text-gray-300 leading-relaxed"
        >
          <span class="text-gray-500"
            >[{{ formatearHora(log.timestamp) }}]</span
          >
          <span
            :class="{
              'text-blue-400': log.tipo === 'sistema',
              'text-green-400': log.tipo === 'movimiento',
            }"
          >
            {{ log.mensaje }}
          </span>
        </div>
        <div v-if="logs.length === 0" class="text-gray-500 text-center py-8">
          No hay logs todavía...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";
import {
  claveCelda,
  centroHex,
  alturaSuperficie,
  type MapaHex,
} from "../../domain/mapaHex";
import { usePartidaHex, HEX_SIZE } from "../../domain/usePartidaHex";

interface Props {
  partidaId: string;
}

const props = defineProps<Props>();

// --- Lógica de partida (estado y reglas, agnóstica de Three.js) ---
const {
  partida: partidaActual,
  mapa: mapaActual,
  casillas,
  posiciones,
  seleccionado,
  seleccionadoPersonaje: personajeSeleccionado,
  logs,
  cargar,
  personajePorId,
  colocarInicial,
  seleccionar,
  mover,
} = usePartidaHex();

const totalPersonajes = computed(
  () =>
    partidaActual.value?.equipos.reduce(
      (total, equipo) => total + equipo.personajes.length,
      0,
    ) ?? 0,
);

// Referencias
const canvasContainer = ref<HTMLDivElement | null>(null);

// Variables de Three.js
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: MapControls;
let rafId = 0;

// Casillas clicables donde puede haber una entidad. Con mapa cargado son las
// caras superiores de los prismas con hueco libre; sin mapa, la cuadrícula
// plana. Claves y nombres siempre incluyen el nivel: `col,row,nivel`.
const hexagons: THREE.Mesh[] = [];
const hexMap = new Map<string, THREE.Mesh>();

// Personajes (instanciaId -> mesh)
const personajesMeshes = new Map<string, THREE.Mesh>();

// Referencias del panel de logs (UI arrastrable)
const logContainer = ref<HTMLDivElement | null>(null);
const logPanel = ref<HTMLDivElement | null>(null);

// Variables para hacer el chat movible
const isDraggingLog = ref(false);
const logPosition = ref({ x: 0, y: 0 });
const dragOffset = ref({ x: 0, y: 0 });

// Raycasting
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickables: THREE.Object3D[] = [];

// Colores para los personajes
const COLORES_PERSONAJES = [
  0xff0000, // Rojo
  0x0000ff, // Azul
  0x00ff00, // Verde
  0xffff00, // Amarillo
  0xff00ff, // Magenta
  0x00ffff, // Cyan
  0xff8800, // Naranja
  0x8800ff, // Púrpura
  0x00ff88, // Verde agua
  0xff0088, // Rosa
  0x88ff00, // Lima
  0x0088ff, // Azul cielo
];

async function init() {
  if (!canvasContainer.value) return;

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

  // Cargar partida (la lógica decide qué casillas existen)
  await cargar(props.partidaId);

  if (mapaActual.value) {
    createMapaGrid(mapaActual.value);
  } else {
    createHexGrid();
  }

  // Colocar y dibujar los personajes según el estado de la partida
  colocarInicial();
  crearPersonajes();

  // Centrar cámara en la cuadrícula
  centerCamera();

  // Event listeners
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);

  // Iniciar loop de render
  animate();
}

function createHexGrid() {
  const size = HEX_SIZE;
  const hexWidth = Math.sqrt(3) * size;
  const rowStep = 1.5 * size;

  // Geometría y material compartidos
  const hexGeo = new THREE.CylinderGeometry(size, size, 0.3, 6);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x2d4059,
    flatShading: true,
    metalness: 0.1,
    roughness: 0.8,
  });

  // Crear borde para cada hexágono
  const edgeGeo = new THREE.CylinderGeometry(size * 0.95, size * 0.95, 0.35, 6);
  const edgeMat = new THREE.MeshBasicMaterial({
    color: 0x4a90e2,
    transparent: true,
    opacity: 0.5,
  });

  casillas.value.forEach((cas) => {
    const hex = new THREE.Mesh(hexGeo, baseMat);

    // Calcular posición (offset odd-r, pointy-top)
    const offset = (cas.row % 2) * (hexWidth / 2);
    hex.position.x = cas.col * hexWidth + offset;
    hex.position.z = cas.row * rowStep;
    hex.position.y = 0;

    // Nombre y datos
    hex.name = `hex_${cas.col}_${cas.row}_${cas.y}`;
    (hex as any).gridX = cas.col;
    (hex as any).gridY = cas.row;
    (hex as any).gridNivel = cas.y;

    // Guardar en estructuras
    hexagons.push(hex);
    hexMap.set(claveCelda(cas.col, cas.row, cas.y), hex);
    clickables.push(hex);

    // Crear borde
    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.position.copy(hex.position);
    edge.position.y = 0.05;

    scene.add(hex);
    scene.add(edge);
  });

  console.log(`✅ Cuadrícula creada: ${hexagons.length} hexágonos`);
}

// Prisma hexagonal pointy-top con base en y=0, igual que en el editor
function crearGeometriaPrisma(
  radio: number,
  altura: number,
  mitad: boolean,
): THREE.BufferGeometry {
  const pts: THREE.Vector2[] = [];
  const ultimo = mitad ? 3 : 5;
  for (let k = 0; k <= ultimo; k++) {
    const a = (k * Math.PI) / 3;
    pts.push(new THREE.Vector2(radio * Math.sin(a), radio * Math.cos(a)));
  }
  const geo = new THREE.ExtrudeGeometry(new THREE.Shape(pts), {
    depth: altura,
    bevelEnabled: false,
  });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function createMapaGrid(mapa: MapaHex) {
  const alturaPrisma = mapa.prismHeight;

  // Terreno: prismas instanciados con el color de cada celda
  const geoCompleto = crearGeometriaPrisma(mapa.hexRadius, alturaPrisma, false);
  const geoMedio = crearGeometriaPrisma(mapa.hexRadius, alturaPrisma, true);
  const matTerreno = new THREE.MeshStandardMaterial({
    metalness: 0.1,
    roughness: 0.8,
  });
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  const crearInstancias = (
    geo: THREE.BufferGeometry,
    celdas: typeof mapa.cells,
  ) => {
    if (celdas.length === 0) return;
    const mesh = new THREE.InstancedMesh(geo, matTerreno, celdas.length);
    celdas.forEach((c, i) => {
      const p = centroHex(mapa, c.col, c.row);
      dummy.position.set(p.x, c.y * alturaPrisma, p.z);
      dummy.rotation.set(0, c.shape === "half" ? (c.rot * Math.PI) / 3 : 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.set(c.color));
    });
    scene.add(mesh);
  };
  crearInstancias(
    geoCompleto,
    mapa.cells.filter((c) => c.shape !== "half"),
  );
  crearInstancias(
    geoMedio,
    mapa.cells.filter((c) => c.shape === "half"),
  );

  // Casillas: caras superiores con hueco libre → marcadores clicables
  const celdasPorClave = new Map(
    mapa.cells.map((c) => [claveCelda(c.col, c.row, c.y), c]),
  );
  const matCasilla = new THREE.MeshBasicMaterial({
    color: 0x4a90e2,
    transparent: true,
    opacity: 0.35,
  });
  const geoMarcador = crearGeometriaPrisma(mapa.hexRadius * 0.95, 0.08, false);
  const geoMarcadorMedio = crearGeometriaPrisma(
    mapa.hexRadius * 0.95,
    0.08,
    true,
  );

  casillas.value.forEach((cas) => {
    const celda = celdasPorClave.get(claveCelda(cas.col, cas.row, cas.y))!;
    const marcador = new THREE.Mesh(
      celda.shape === "half" ? geoMarcadorMedio : geoMarcador,
      matCasilla,
    );
    const p = centroHex(mapa, cas.col, cas.row);
    marcador.position.set(p.x, alturaSuperficie(mapa, cas.y) + 0.02, p.z);
    if (celda.shape === "half")
      marcador.rotation.y = (celda.rot * Math.PI) / 3;

    marcador.name = `hex_${cas.col}_${cas.row}_${cas.y}`;
    (marcador as any).gridX = cas.col;
    (marcador as any).gridY = cas.row;
    (marcador as any).gridNivel = cas.y;

    hexagons.push(marcador);
    hexMap.set(claveCelda(cas.col, cas.row, cas.y), marcador);
    clickables.push(marcador);
    scene.add(marcador);
  });
}

function centerCamera() {
  if (hexagons.length === 0) return;

  const box = new THREE.Box3();
  hexagons.forEach((h) => box.expandByPoint(h.position));
  const gridCenter = box.getCenter(new THREE.Vector3());
  const tamano = box.getSize(new THREE.Vector3()).length();

  controls.target.copy(gridCenter);
  const cameraDistance = Math.max(30, tamano * 0.6);
  camera.position
    .copy(gridCenter)
    .add(new THREE.Vector3(cameraDistance, cameraDistance, cameraDistance));
  controls.update();
}

function crearPersonajes() {
  let colorIndex = 0;

  posiciones.value.forEach((pos, instanciaId) => {
    const personaje = personajePorId(instanciaId);
    if (!personaje) return;

    const hexagono = hexMap.get(claveCelda(pos.col, pos.row, pos.nivel));
    if (!hexagono) return;

    // Crear cilindro para el personaje
    const color = COLORES_PERSONAJES[colorIndex % COLORES_PERSONAJES.length];
    const geometry = new THREE.CylinderGeometry(1, 1, 3, 20);
    const material = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.3,
      roughness: 0.7,
    });
    const cilindro = new THREE.Mesh(geometry, material);

    // Posicionar sobre el hexágono
    cilindro.position.set(
      hexagono.position.x,
      hexagono.position.y + 1.5, // Altura del cilindro
      hexagono.position.z,
    );

    // Guardar datos del personaje en el mesh
    cilindro.name = `personaje_${instanciaId}`;
    (cilindro as any).personajeData = personaje;
    (cilindro as any).instanciaId = instanciaId;

    scene.add(cilindro);
    personajesMeshes.set(instanciaId, cilindro);
    clickables.push(cilindro);

    colorIndex++;
  });
}

function getHexCoordinates(
  mesh: THREE.Mesh,
): { x: number; y: number; nivel: number } | null {
  const x = (mesh as any).gridX;
  const y = (mesh as any).gridY;
  if (x !== undefined && y !== undefined) {
    return { x, y, nivel: (mesh as any).gridNivel ?? 0 };
  }
  return null;
}

// Raycasting
function setPointerFromEvent(event: PointerEvent) {
  if (!renderer) return;
  const rect = renderer.domElement.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  pointer.set(x * 2 - 1, -(y * 2 - 1));
}

function pick(event: PointerEvent): THREE.Mesh | null {
  setPointerFromEvent(event);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickables, false);
  return hits.length ? (hits[0].object as THREE.Mesh) : null;
}

function onPointerMove(event: PointerEvent) {
  if (!renderer) return;
  const mesh = pick(event);

  if (mesh && mesh.name.startsWith("personaje_")) {
    renderer.domElement.style.cursor = "pointer";
  } else if (
    mesh &&
    mesh.name.startsWith("hex_") &&
    personajeSeleccionado.value
  ) {
    renderer.domElement.style.cursor = "pointer";
  } else {
    renderer.domElement.style.cursor = "default";
  }
}

function onPointerDown(event: PointerEvent) {
  const mesh = pick(event);

  // Clic en un personaje: seleccionarlo
  if (mesh && mesh.name.startsWith("personaje_")) {
    seleccionar((mesh as any).instanciaId as string);
    return;
  }

  // Clic en un hexágono: mover el personaje seleccionado (si está libre)
  if (mesh && mesh.name.startsWith("hex_") && seleccionado.value) {
    moverPersonaje(mesh);
  }
}

function moverPersonaje(hexDestino: THREE.Mesh) {
  const id = seleccionado.value;
  if (!id) return;

  const meshPersonaje = personajesMeshes.get(id);
  if (!meshPersonaje) return;

  const coordsDestino = getHexCoordinates(hexDestino);
  if (!coordsDestino) return;

  // La lógica valida el movimiento (casilla válida y libre) y actualiza estado
  const resultado = mover(id, {
    col: coordsDestino.x,
    row: coordsDestino.y,
    nivel: coordsDestino.nivel,
  });
  if (!resultado.ok) return;

  // Reflejar el nuevo estado en la escena
  meshPersonaje.position.set(
    hexDestino.position.x,
    hexDestino.position.y + 1.5,
    hexDestino.position.z,
  );
}

function startDraggingLog(event: MouseEvent) {
  if (!logPanel.value) return;

  isDraggingLog.value = true;
  const rect = logPanel.value.getBoundingClientRect();
  dragOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };

  event.preventDefault();
}

function onDragLog(event: MouseEvent) {
  if (!isDraggingLog.value || !logPanel.value) return;

  const container = logPanel.value.parentElement;
  if (!container) return;

  const containerRect = container.getBoundingClientRect();

  // Calcular nueva posición
  let newX = event.clientX - containerRect.left - dragOffset.value.x;
  let newY = event.clientY - containerRect.top - dragOffset.value.y;

  // Limitar a los bordes del contenedor
  const panelRect = logPanel.value.getBoundingClientRect();
  newX = Math.max(0, Math.min(newX, containerRect.width - panelRect.width));
  newY = Math.max(0, Math.min(newY, containerRect.height - panelRect.height));

  logPosition.value = { x: newX, y: newY };
}

function stopDraggingLog() {
  isDraggingLog.value = false;
}

function formatearHora(timestamp: Date): string {
  const date = new Date(timestamp);
  const horas = date.getHours().toString().padStart(2, "0");
  const minutos = date.getMinutes().toString().padStart(2, "0");
  const segundos = date.getSeconds().toString().padStart(2, "0");
  return `${horas}:${minutos}:${segundos}`;
}

function animate() {
  rafId = requestAnimationFrame(animate);
  controls.update();
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

function handleResize() {
  if (!canvasContainer.value || !renderer || !camera) return;

  const width = canvasContainer.value.clientWidth;
  const height = canvasContainer.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

onMounted(() => {
  void init();
  window.addEventListener("resize", handleResize);
  window.addEventListener("mousemove", onDragLog);
  window.addEventListener("mouseup", stopDraggingLog);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("mousemove", onDragLog);
  window.removeEventListener("mouseup", stopDraggingLog);

  if (rafId) {
    cancelAnimationFrame(rafId);
  }

  if (renderer) {
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);

    scene.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      }
    });

    renderer.dispose();
    renderer = null;
  }
});
</script>

<style scoped>
/* Evitar scroll en el canvas */
canvas {
  display: block;
  outline: none;
}
</style>
