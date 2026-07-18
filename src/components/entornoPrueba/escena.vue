<template>
  <div class="w-full h-screen relative">
    <div
      ref="canvasContainer"
      class="w-full h-full"
      @dragover.prevent="onDragOver"
      @drop.prevent="onDrop"
      @mouseleave="onCanvasLeave"
    ></div>

    <!-- UI Overlay -->
    <PanelCharacter
      v-if="panelVisible && panelData"
      :x="panelPosition.x"
      :y="panelPosition.y"
      :nombre="panelData.nombre"
      :vida-actual="panelData.vidaActual"
      :vida-max="panelData.vidaMax"
    />

    <VentanaFlotante
      v-for="(ficha, idx) in fichasFlotantes"
      :key="ficha.uid"
      :titulo="`Ficha — ${ficha.nombre}`"
      :ancho="1340"
      :alto="960"
      :zoom="zoomFicha"
      :desplazamiento="idx"
      @close="cerrarFicha(ficha.uid)"
    >
      <Ficha
        v-if="ficha.tipo === 'instancia'"
        :personaje-externo="ficha.data"
        embebido
        @tirar="onTirarFicha($event, ficha.nombre)"
      />
      <FichaCriaturaCombate
        v-else-if="ficha.tipo === 'criatura'"
        :criatura-id="ficha.id"
        :diario-id="ficha.diarioId"
        @tirar="onTirarFicha($event, ficha.nombre)"
      />
      <Ficha
        v-else
        :character-id="ficha.id"
        :diario-id="ficha.diarioId"
        embebido
        @tirar="onTirarFicha($event, ficha.nombre)"
        @rango-arma="onRangoArmaFicha(ficha, $event)"
      />
    </VentanaFlotante>

    <!-- Control de tamaño de las fichas flotantes (redimensiona la ventana). -->
    <ControlZoom
      v-if="fichasFlotantes.length"
      :zoom="zoomFicha"
      @reducir="reducirZoomFicha"
      @aumentar="aumentarZoomFicha"
      @restablecer="restablecerZoomFicha"
    />

    <!-- Menú contextual (clic derecho sobre un token) -->
    <div
      v-if="menuContextual"
      class="absolute z-50 min-w-[9rem] overflow-hidden rounded-lg border border-gray-700 bg-gray-900/95 text-sm text-gray-100 shadow-2xl backdrop-blur-md"
      :style="{ left: `${menuContextual.x}px`, top: `${menuContextual.y}px` }"
      @contextmenu.prevent
    >
      <div
        class="truncate border-b border-gray-700 px-3 py-2 text-xs font-bold tracking-wide text-indigo-300"
      >
        {{ menuContextual.nombre }}
      </div>
      <!-- Editor rápido de vida -->
      <div
        v-if="vidaTokenMenu"
        class="flex items-center gap-1.5 border-b border-gray-700 px-3 py-2"
      >
        <span class="text-red-400">❤️</span>
        <button
          class="flex h-6 w-6 items-center justify-center rounded bg-gray-800 text-base leading-none transition-colors hover:bg-red-600/70"
          title="Quitar 1"
          @click="ajustarVidaMenu(-1)"
        >
          −
        </button>
        <input
          type="number"
          class="w-12 rounded border border-gray-600 bg-gray-800 px-1 py-0.5 text-center text-sm text-gray-100 focus:border-indigo-500 focus:outline-none"
          :value="vidaTokenMenu.actual"
          min="0"
          :max="vidaTokenMenu.max"
          @change="fijarVidaMenu(($event.target as HTMLInputElement).value)"
          @keyup.enter="fijarVidaMenu(($event.target as HTMLInputElement).value)"
        />
        <span class="text-xs text-gray-400">/ {{ vidaTokenMenu.max }}</span>
        <button
          class="flex h-6 w-6 items-center justify-center rounded bg-gray-800 text-base leading-none transition-colors hover:bg-green-600/70"
          title="Curar 1"
          @click="ajustarVidaMenu(1)"
        >
          +
        </button>
      </div>
      <button
        class="block w-full px-3 py-2 text-left transition-colors hover:bg-indigo-600/70"
        @click="menuVerFicha"
      >
        📄 Ver Ficha
      </button>
      <button
        class="block w-full px-3 py-2 text-left transition-colors hover:bg-indigo-600/70"
        @click="menuMover"
      >
        🥾 Mover
      </button>
      <button
        class="block w-full px-3 py-2 text-left transition-colors hover:bg-indigo-600/70"
        @click="menuSaltar"
      >
        🐇 Saltar
      </button>
      <button
        v-if="menuContextual.volador"
        class="block w-full px-3 py-2 text-left transition-colors hover:bg-indigo-600/70"
        @click="menuVolar"
      >
        🕊️ Volar
      </button>
      <!-- Altura de vuelo (solo Voladores): el token flota sobre su casilla -->
      <div
        v-if="menuContextual.volador"
        class="flex items-center gap-1.5 border-b border-gray-700 px-3 py-2"
      >
        <span title="Altura de vuelo">☁️</span>
        <button
          class="flex h-6 w-6 items-center justify-center rounded bg-gray-800 text-base leading-none transition-colors hover:bg-sky-600/70"
          title="Bajar 1 nivel"
          @click="ajustarAlturaMenu(-1)"
        >
          −
        </button>
        <span class="w-8 text-center text-sm font-bold tnum">{{
          alturaTokenMenu
        }}</span>
        <button
          class="flex h-6 w-6 items-center justify-center rounded bg-gray-800 text-base leading-none transition-colors hover:bg-sky-600/70"
          title="Subir 1 nivel"
          @click="ajustarAlturaMenu(1)"
        >
          +
        </button>
        <span class="text-xs text-gray-400">niveles</span>
      </div>
      <button
        class="block w-full px-3 py-2 text-left transition-colors hover:bg-indigo-600/70"
        @click="menuAtacar"
      >
        ⚔️ Atacar
      </button>
      <button
        class="block w-full px-3 py-2 text-left transition-colors hover:bg-indigo-600/70"
        @click="menuAnadirEstado"
      >
        ✨ Estados
      </button>
      <button
        class="block w-full border-t border-gray-700 px-3 py-2 text-left text-red-400 transition-colors hover:bg-red-600/70 hover:text-white"
        @click="menuEliminar"
      >
        🗑️ Eliminar
      </button>
    </div>

    <!-- Panel de selección de estado alterado -->
    <div
      v-if="panelEstados"
      class="absolute z-50 flex max-h-[70vh] w-64 flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-900/95 text-sm text-gray-100 shadow-2xl backdrop-blur-md"
      :style="{ left: `${panelEstados.x}px`, top: `${panelEstados.y}px` }"
      @contextmenu.prevent
    >
      <div
        class="flex items-center justify-between border-b border-gray-700 px-3 py-2"
      >
        <span class="text-xs font-bold tracking-wide text-indigo-300"
          >Estados</span
        >
        <button
          class="text-gray-400 hover:text-white"
          @click="panelEstados = null"
        >
          ✕
        </button>
      </div>
      <div class="overflow-y-auto p-2">
        <!-- Estados aplicados: clic para quitarlos -->
        <div
          v-if="estadosAplicadosPanel.length"
          class="mb-3 border-b border-gray-700 pb-2"
        >
          <div
            class="px-1 py-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
          >
            Aplicados · clic para quitar
          </div>
          <div class="flex flex-wrap gap-1 px-1">
            <button
              v-for="est in estadosAplicadosPanel"
              :key="est.estadoId"
              class="flex items-center gap-1 rounded border border-gray-600 bg-gray-800 px-1.5 py-1 text-xs transition-colors hover:border-red-500 hover:bg-red-600/30"
              :title="`Quitar ${est.etiqueta}`"
              @click="quitarEstadoPanel(est.estadoId)"
            >
              <span class="text-sm leading-none">{{ est.icono }}</span>
              <span class="max-w-[7rem] truncate">{{ est.etiqueta }}</span>
              <span class="text-gray-400">✕</span>
            </button>
          </div>
        </div>

        <div v-for="cat in CATEGORIAS_ESTADO" :key="cat.id" class="mb-2">
          <div
            class="px-1 py-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
          >
            {{ cat.label }}
          </div>
          <button
            v-for="estado in estadosPorCategoria[cat.id]"
            :key="estado.id"
            class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition-colors hover:bg-indigo-600/70"
            :title="estado.descripcion"
            @click="aplicarEstado(estado)"
          >
            <span class="w-5 text-center text-base">{{
              iconoEstado(estado.id)
            }}</span>
            <span class="flex-1 truncate">{{ estado.nombre }}</span>
            <span
              v-if="estado.acumulable"
              class="text-[10px] text-gray-500"
              title="Estado acumulable (valor X)"
              >X</span
            >
          </button>
        </div>
      </div>
    </div>

    <!-- Menú flotante para poner el valor X de un estado numérico -->
    <div
      v-if="panelValorEstado"
      class="absolute z-50 flex w-56 flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-900/95 text-sm text-gray-100 shadow-2xl backdrop-blur-md"
      :style="{ left: `${panelValorEstado.x}px`, top: `${panelValorEstado.y}px` }"
      @contextmenu.prevent
    >
      <div
        class="flex items-center gap-2 border-b border-gray-700 px-3 py-2"
      >
        <span class="text-base leading-none">{{
          iconoEstado(panelValorEstado.estado.id)
        }}</span>
        <span class="flex-1 truncate text-xs font-bold tracking-wide text-indigo-300">{{
          panelValorEstado.estado.nombre
        }}</span>
        <button
          class="text-gray-400 hover:text-white"
          @click="panelValorEstado = null"
        >
          ✕
        </button>
      </div>
      <div class="flex flex-col gap-2 p-3">
        <div
          v-if="panelValorEstado.valorActual > 0"
          class="text-[11px] text-gray-400"
        >
          Valor actual:
          <span class="font-bold text-gray-100">{{
            panelValorEstado.valorActual
          }}</span>
        </div>
        <input
          type="number"
          min="1"
          class="w-full rounded border border-gray-600 bg-gray-800 px-2 py-1.5 text-center text-lg font-bold text-gray-100 focus:border-indigo-500 focus:outline-none"
          v-model.number="panelValorEstado.entrada"
          @keyup.enter="fijarValorEstado"
          autofocus
        />
        <button
          class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-indigo-500"
          @click="fijarValorEstado"
        >
          Establecer valor
        </button>
        <button
          v-if="panelValorEstado.valorActual > 0"
          class="rounded border border-red-500/60 bg-red-600/20 px-3 py-1.5 text-sm font-semibold text-red-300 transition-colors hover:bg-red-600/40"
          :title="`Suma al valor actual (${panelValorEstado.valorActual})`"
          @click="aumentarValorEstado"
        >
          🩸 Aumentar (+{{ Math.max(1, Math.floor(panelValorEstado.entrada) || 1) }})
        </button>
      </div>
    </div>

    <!-- HUD sobre cada token: nombre + barra de vida + iconos de estado -->
    <div
      v-for="hud in tokenHuds"
      v-show="hud.visible && hudsVisibles"
      :key="hud.id"
      class="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-full"
      :style="{ left: `${hud.x}px`, top: `${hud.y}px` }"
    >
      <!-- Iconos de estado -->
      <div
        v-if="hud.estados.length"
        class="pointer-events-auto mb-1 flex flex-wrap justify-center gap-0.5"
      >
        <button
          v-for="est in hud.estados"
          :key="est.estadoId"
          class="group relative flex h-5 min-w-5 items-center justify-center rounded border border-gray-700 bg-gray-900/85 px-0.5 text-xs leading-none shadow transition-transform hover:scale-110"
          @click="quitarEstadoHud(hud.id, est.estadoId)"
        >
          {{ est.icono }}
          <!-- Tooltip: nombre (+ número) al pasar el ratón -->
          <span
            class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 hidden -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded border border-gray-700 bg-gray-900/95 px-2 py-1 text-[11px] font-semibold text-gray-100 shadow-lg group-hover:flex"
          >
            <span>{{ est.nombre }}</span>
            <span
              v-if="est.valor != null"
              class="flex h-4 min-w-4 items-center justify-center rounded bg-indigo-600 px-1 text-[10px] font-bold leading-none text-white"
              >{{ est.valor }}</span
            >
          </span>
        </button>
      </div>
      <!-- Nombre del token -->
      <div
        class="mb-0.5 truncate text-center text-[10px] font-bold text-white"
        style="text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9)"
      >
        {{ hud.nombre }}
      </div>
      <!-- Barra de vida -->
      <div
        class="h-1.5 w-14 overflow-hidden rounded-full border border-black/40 bg-gray-800/90 shadow"
      >
        <div
          class="h-full rounded-full transition-all duration-200"
          :style="{
            width: `${Math.max(0, Math.min(100, (hud.vidaActual / hud.vidaMax) * 100))}%`,
            backgroundColor: colorBarraVida(hud.vidaActual, hud.vidaMax),
          }"
        ></div>
      </div>
    </div>

    <PanelLateral />
    <GestorMapas />
    <MenuIzquierdo />

    <!-- Etiqueta de la medición de distancia (punto medio de la línea) -->
    <div
      v-if="medicionLabel?.visible"
      class="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2 rounded-md border border-yellow-500/50 bg-gray-900/90 px-2 py-0.5 font-mono text-sm font-bold text-yellow-300 shadow-lg"
      :style="{ left: `${medicionLabel.x}px`, top: `${medicionLabel.y}px` }"
    >
      {{ medicionLabel.texto }}
    </div>

    <!-- Etiqueta de la plantilla de área / cono (nº de casillas) -->
    <div
      v-if="plantillaLabel?.visible"
      class="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2 rounded-md border border-sky-500/50 bg-gray-900/90 px-2 py-0.5 font-mono text-sm font-bold text-sky-300 shadow-lg"
      :style="{ left: `${plantillaLabel.x}px`, top: `${plantillaLabel.y}px` }"
    >
      {{ plantillaLabel.texto }}
    </div>

    <!-- Info del personaje seleccionado -->
    <div
      class="absolute bottom-4 left-20 text-white bg-black/50 p-4 rounded pointer-events-none"
    >
      <p v-if="tokenSeleccionadoNombre">
        Token:
        <span class="font-bold text-yellow-400">{{
          tokenSeleccionadoNombre
        }}</span>
        <span class="ml-2 text-xs text-gray-300"
          >— <strong>M</strong> mover · <strong>S</strong> saltar ·
          <strong>F</strong> volar · <strong>A</strong> atacar</span
        >
      </p>
      <p v-else-if="personajeActivo">
        Seleccionado:
        <span class="font-bold text-yellow-400">{{
          personajeActivo.nombre
        }}</span>
      </p>
      <p v-else>Coloca un token desde el Diario y haz clic para seleccionarlo</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { MapControls } from "three/addons/controls/MapControls.js";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import Stats from "three/addons/libs/stats.module.js";
import { Pathfinding } from "three-pathfinding";
import PanelCharacter from "./panelCharacter.vue";
import Ficha from "../VerPersonaje/ficha.vue";
import FichaCriaturaCombate from "./fichaCriaturaCombate.vue";
import VentanaFlotante from "./ventanaFlotante.vue";
import ControlZoom from "../ControlZoom.vue";
import { useZoomFicha } from "../../domain/useZoomFicha";
import PanelLateral from "./panelLateral.vue";
import GestorMapas from "./gestorMapas.vue";
import MenuIzquierdo from "./menuIzquierdo.vue";
import { usePartida } from "../../domain/usePartida";
import type { PayloadTirada } from "../../domain/usePartida";
import { useMapa } from "../../domain/useMapa";
import { useHerramientas } from "../../domain/useHerramientas";
import type { PersonajeInstancia, TokenPartida } from "../../domain/Partida";
import { obtenerPersonaje } from "../../domain/storage/personajesRepo";
import { obtenerCriatura } from "../../domain/storage/criaturasRepo";
import armasData from "../../assets/armas.json";
import {
  CATALOGO_ESTADOS,
  iconoEstado,
  obtenerEstado,
  nombreEstadoAplicado,
  type CategoriaEstado,
  type EstadoAlterado,
} from "../../domain/EstadosAlterados";
import {
  centroHex,
  alturaSuperficie,
  calcularCasillas,
  claveCelda,
  type MapaHex,
  type MapaHexCelda,
} from "../../domain/mapaHex";
import { emojiDeForma, type FormaMarca } from "../../domain/MarcasMapa";
import {
  saltoHorizontal,
  saltoVertical,
  esVolador,
} from "../../domain/locomocion";

const props = defineProps<{ partidaId?: string }>();

// Composables
const {
  partidaActual,
  personajeActivo,
  seleccionarPersonaje,
  iniciarPartida,
  detenerRealtimePartida,
  moverPersonajeActivo,
  colocarToken,
  moverToken,
  quitarToken,
  colocarMarca,
  quitarMarcaEnCelda,
  enviarTiradaChat,
  fichasFlotantes,
  abrirFichaInstancia,
  abrirFichaGuardado,
  abrirFichaCriatura,
  cerrarFicha,
  establecerVidaToken,
  ajustarVidaToken,
  agregarEstadoToken,
  establecerValorEstadoToken,
  quitarEstadoToken,
  establecerAlturaVueloToken,
  bonosDeFicha,
  tokenSenalado,
} = usePartida();

// Tamaño inicial de la ficha flotante: grande y ajustado al viewport (deja
// margen para la barra izquierda y el panel lateral derecho). El usuario puede
// seguir redimensionándola con el tirador de la esquina.
// Zoom (tamaño) de las fichas flotantes: el control −/+ redimensiona la ventana
// entera. Ajustable por el usuario y persistido.
const {
  zoom: zoomFicha,
  aumentar: aumentarZoomFicha,
  reducir: reducirZoomFicha,
  restablecer: restablecerZoomFicha,
} = useZoomFicha("ventanaFicha", 1280);

// Vuelca al chat lateral una tirada / uso de habilidad desde una ficha flotante.
function onTirarFicha(payload: PayloadTirada, nombre?: string) {
  enviarTiradaChat(nombre ?? "Alguien", payload);
}

const { mapa } = useMapa();
const {
  herramientaActiva,
  formaMarcaActiva,
  desactivar: desactivarHerramienta,
} = useHerramientas();

// --- Herramienta de medir distancias ---
// Dos puntos de mundo clicados (puede ser sobre el terreno o en el vacío). La
// distancia se da en "casillas": el lado de un hexágono (= hexRadius) equivale a
// 1. `puntoPreview` es la posición del cursor mientras se coloca el 2º punto.
let medPuntoA: THREE.Vector3 | null = null;
let medPuntoB: THREE.Vector3 | null = null;
let medPreview: THREE.Vector3 | null = null;
let medLinea: THREE.Line | null = null;
let medMatLinea: THREE.LineBasicMaterial | null = null;
const medMarcadores: THREE.Mesh[] = [];
// Plano horizontal y=0 para poder medir clicando "en medio de la nada".
const medPlano = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

// --- Herramienta de ping ---
// Destello temporal (anillo que crece y se desvanece) para señalar un punto
// del mapa a los demás jugadores en pantalla. Es puramente visual: no se
// persiste en la partida, cada uno desaparece solo tras `PING_DURACION`.
const PING_DURACION = 1.1; // segundos
const pings: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; inicio: number }[] = [];

function crearPing(p: THREE.Vector3) {
  const geo = new THREE.RingGeometry(0.05, 0.28, 32);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xff8822,
    transparent: true,
    opacity: 1,
    depthTest: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(p);
  mesh.position.y += 0.05;
  mesh.rotation.x = -Math.PI / 2;
  mesh.renderOrder = 999;
  scene.add(mesh);
  pings.push({ mesh, mat, inicio: Date.now() });
}

// Hace crecer y desvanecer cada ping activo; los retira al terminar su vida.
function actualizarPings() {
  if (pings.length === 0) return;
  const ahora = Date.now();
  for (let i = pings.length - 1; i >= 0; i--) {
    const ping = pings[i];
    const t = (ahora - ping.inicio) / 1000 / PING_DURACION;
    if (t >= 1) {
      scene.remove(ping.mesh);
      ping.mesh.geometry.dispose();
      ping.mat.dispose();
      pings.splice(i, 1);
      continue;
    }
    const escala = 1 + t * 3;
    ping.mesh.scale.set(escala, escala, escala);
    ping.mat.opacity = 1 - t;
  }
}
// Etiqueta HTML con la distancia, posicionada en el punto medio de la línea.
const medicionLabel = ref<{
  x: number;
  y: number;
  texto: string;
  visible: boolean;
} | null>(null);

// --- Plantillas de área / cono (medición en casillas) ---
// Casilla de origen (donde se clicó) y si la plantilla está congelada. Mientras
// no lo esté, la plantilla crece siguiendo al cursor.
let plantillaOrigen: { col: number; row: number; y: number } | null = null;
let plantillaFijada = false;
const plantillaMarcadores: THREE.Mesh[] = [];
let plantillaMat: THREE.MeshBasicMaterial | null = null;
// Etiqueta con el nº de casillas pintadas (anclada a la casilla del cursor).
let plantillaLabelWorld: THREE.Vector3 | null = null;
let plantillaLabelTexto = "";
const plantillaLabel = ref<{
  x: number;
  y: number;
  texto: string;
  visible: boolean;
} | null>(null);

// Local State for UI
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
// Meshes del mapa hexagonal activo (prismas). Se limpian al cambiar de mapa.
const hexMeshes: THREE.Object3D[] = [];
// Casillas seleccionables del mapa activo: prismas con hueco libre suficiente
// por encima (ver calcularCasillas). Clave "col,row,y". Un prisma tapado por
// otro justo encima (o a distancia <= HUECO_ENTIDAD) no entra aquí y no se
// puede seleccionar/mover a él.
const casillasValidas = new Set<string>();
// Índice clave "col,row,y" -> celda del mapa hex activo. Sirve para colocar los
// marcadores de rango de movimiento sobre la cara superior de cada casilla.
const celdaPorClave = new Map<string, MapaHexCelda>();

// Character Meshes Map (ID -> Mesh)
const characterMeshes = new Map<string, THREE.Mesh>();
let activeIndicatorMesh: THREE.Mesh | null = null;
const stats = new Stats();

// Tokens colocados sobre el mapa (tokenId -> mesh) + token seleccionado.
const tokenMeshes = new Map<string, THREE.Mesh>();
const tokenSeleccionado = ref<string | null>(null);
// Token resaltado temporalmente (al señalarlo desde la barra derecha).
let resaltadoTimeout: ReturnType<typeof setTimeout> | null = null;
const COLORES_TOKENS = [
  0xff4d4d, 0x4d79ff, 0x4dff88, 0xffd24d, 0xff4dd2, 0x4dffff, 0xff8c1a,
  0xa64dff, 0x1aff8c, 0xff1a66, 0x8cff1a, 0x1a8cff,
];

// --- Marcas sobre el mapa (trampas, objetos…) ---
// Un plano con la textura de la forma (emoji dibujado en canvas), tumbado sobre
// la cara superior de la casilla. Las texturas se cachean por forma: varias
// marcas de la misma forma comparten el mismo THREE.Texture.
const marcaMeshes = new Map<string, THREE.Mesh>();
const marcaTexturas = new Map<FormaMarca, THREE.Texture>();

function texturaDeForma(forma: FormaMarca): THREE.Texture {
  let tex = marcaTexturas.get(forma);
  if (tex) return tex;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "92px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emojiDeForma(forma), 64, 68);
  tex = new THREE.CanvasTexture(canvas);
  marcaTexturas.set(forma, tex);
  return tex;
}
// --- Menú contextual + rango de movimiento sobre tokens ---
// Menú que aparece al hacer clic derecho sobre un token (Ver Ficha / Mover).
const menuContextual = ref<{
  x: number;
  y: number;
  tokenId: string;
  nombre: string;
  // Se rellena en diferido al abrir el menú (hay que leer la criatura guardada
  // para mirar sus etiquetas): muestra Volar y el control de altura de vuelo.
  volador: boolean;
} | null>(null);
// Token cuyo rango de movimiento se está mostrando (modo "mover"). Al estar
// activo, un clic sobre una casilla alcanzable mueve el token allí. `tipo`
// distingue qué rango se pintó (andar/saltar/volar) para que cada atajo de
// teclado (M/S/F) alterne solo su propio modo.
const modoMovimiento = ref<{
  tokenId: string;
  tipo: "mover" | "saltar" | "volar";
} | null>(null);
// Token cuyo rango de ataque se está mostrando (modo "atacar"). A diferencia del
// modo mover, es solo visualización: un clic cualquiera lo cierra sin mover.
const modoAtaque = ref<{ tokenId: string } | null>(null);
// Alcance (distancia_max) de cada arma indexado por id, para calcular el rango
// de ataque a partir de las armas que lleva el personaje.
const ARMAS_POR_ID = new Map<number, { distancia_max: number | null }>(
  (armasData.armas as { id: number; distancia_max: number | null }[]).map(
    (a) => [a.id, a],
  ),
);
// Casillas alcanzables actuales: clave "col,row,y" -> posición del token.
const celdasAlcanzables = new Map<
  string,
  { col: number; row: number; nivel: number }
>();
// Marcadores 3D translúcidos que pintan el rango; se retiran al mover/cancelar.
const marcadoresRango: THREE.Mesh[] = [];
let matRango: THREE.MeshBasicMaterial | null = null;

// Panel para elegir un estado alterado a aplicar sobre un token (desde el menú).
const panelEstados = ref<{ x: number; y: number; tokenId: string } | null>(
  null,
);
// Menú flotante (a la derecha del panel de estados) para poner el valor X de un
// estado numérico/acumulable (Sangrado, Inhibido, Ímpetu…). `valorActual` es la
// X ya aplicada, si la hay, para poder aumentarla (Sangrado se acumula).
const panelValorEstado = ref<{
  x: number;
  y: number;
  tokenId: string;
  estado: EstadoAlterado;
  valorActual: number;
  entrada: number;
} | null>(null);
// Catálogo de estados agrupado por categoría, para el panel.
const CATEGORIAS_ESTADO: { id: CategoriaEstado; label: string }[] = [
  { id: "fisica", label: "Físicos" },
  { id: "mental", label: "Mentales" },
  { id: "agotamiento", label: "Agotamiento" },
];
const estadosPorCategoria = computed<Record<CategoriaEstado, EstadoAlterado[]>>(
  () => ({
    fisica: CATALOGO_ESTADOS.filter((e) => e.categoria === "fisica"),
    mental: CATALOGO_ESTADOS.filter((e) => e.categoria === "mental"),
    agotamiento: CATALOGO_ESTADOS.filter((e) => e.categoria === "agotamiento"),
  }),
);
// Estados actualmente aplicados sobre el token del panel (para poder quitarlos).
const estadosAplicadosPanel = computed(() => {
  const tokenId = panelEstados.value?.tokenId;
  if (!tokenId) return [];
  const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
  return (token?.estados ?? []).map((e) => ({
    estadoId: e.estadoId,
    icono: iconoEstado(e.estadoId),
    etiqueta: nombreEstadoAplicado(e),
  }));
});

// HUDs (barra de vida + iconos de estado) proyectados sobre cada token.
interface TokenHud {
  id: string;
  nombre: string;
  x: number;
  y: number;
  visible: boolean;
  vidaActual: number;
  vidaMax: number;
  estados: {
    estadoId: number;
    icono: string;
    nombre: string;
    valor?: number;
    etiqueta: string;
  }[];
}
const tokenHuds = ref<TokenHud[]>([]);
// Visibilidad global de los HUDs (nombre + vida + estados) sobre los tokens.
// Se puede alternar con la tecla V.
const hudsVisibles = ref(true);

// Constants
const CUBE_SIZE = 1;

// --- Initialization ---
function init() {
  if (!canvasContainer.value) return;
  const el = canvasContainer.value!;
  const width = el.clientWidth;
  const height = el.clientHeight;
  
  
  el.appendChild(stats.dom);  
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

// Watch for Map Changes (cuadrícula plana de fallback, solo si NO hay mapa
// hexagonal activo en la partida).
watch(
  mapa,
  (newMapa) => {
    if (partidaActual.value?.mapa) return;
    if (newMapa && newMapa.length > 0) {
      renderMap(newMapa);
    }
  },
  { deep: true, immediate: true },
);

// Watch del mapa hexagonal activo de la partida: al seleccionarlo/cambiarlo en
// el gestor de mapas, se repinta el terreno de prismas.
//
// El sync remoto (usePartida.ts) reemplaza `partidaActual.value` entero ante
// CUALQUIER cambio (mover un token, un mensaje de chat, etc.), así que
// `.mapa` es una referencia nueva aunque el mapa activo sea el mismo. Por eso
// no podemos recentrar la cámara aquí en cada disparo: solo cuando el mapa
// activo realmente cambia (comparado por `mapaActivoId`), para no resetear
// la vista de otros jugadores en cada sync ajeno.
let mapaActivoIdRenderizado: string | undefined;
watch(
  () => partidaActual.value?.mapa,
  (mapaHex) => {
    if (mapaHex) {
      const cambioDeMapa =
        partidaActual.value?.mapaActivoId !== mapaActivoIdRenderizado;
      mapaActivoIdRenderizado = partidaActual.value?.mapaActivoId;
      renderMapaHex(mapaHex, cambioDeMapa);
    } else {
      mapaActivoIdRenderizado = undefined;
      limpiarMapaHex();
    }
  },
  { immediate: true },
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

// --- Render del mapa hexagonal (portado de jugarPartida.vue) ---

// Prisma hexagonal pointy-top con base en y=0, igual que en el editor.
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

// ¿Se puede seleccionar/mover a esta celda? Solo si es una casilla válida
// (tiene el hueco libre necesario por encima).
function celdaSeleccionable(celda: MapaHexCelda): boolean {
  return casillasValidas.has(claveCelda(celda.col, celda.row, celda.y));
}

function limpiarMapaHex() {
  casillasValidas.clear();
  celdaPorClave.clear();
  limpiarRango();
  if (!scene) return;
  hexMeshes.forEach((m) => {
    scene.remove(m);
    const obj = m as THREE.Mesh;
    obj.geometry?.dispose();
    const mat = obj.material;
    if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
    else mat?.dispose();
  });
  hexMeshes.length = 0;
}

function renderMapaHex(mapaHex: MapaHex, recentrarCamara: boolean) {
  if (!scene) return;

  // Quitar terreno previo (hex + cuadrícula plana/paredes).
  limpiarMapaHex();
  cubes.forEach((c) => scene.remove(c));
  cubes = [];
  if (navMesh) {
    scene.remove(navMesh);
    navMesh = null;
  }

  // Recalcular las casillas seleccionables del mapa (prismas con hueco libre
  // encima). Se hace al cargar/cambiar el mapa, no en cada clic. Debe ir
  // después de limpiarMapaHex(), que vacía el set.
  for (const c of calcularCasillas(mapaHex)) {
    casillasValidas.add(claveCelda(c.col, c.row, c.y));
  }
  celdaPorClave.clear();
  for (const c of mapaHex.cells) {
    celdaPorClave.set(claveCelda(c.col, c.row, c.y), c);
  }

  const alturaPrisma = mapaHex.prismHeight;
  const geoCompleto = crearGeometriaPrisma(mapaHex.hexRadius, alturaPrisma, false);
  const geoMedio = crearGeometriaPrisma(mapaHex.hexRadius, alturaPrisma, true);
  const matTerreno = new THREE.MeshStandardMaterial({
    metalness: 0.1,
    roughness: 0.8,
  });
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  const crearInstancias = (
    geo: THREE.BufferGeometry,
    celdas: MapaHexCelda[],
  ) => {
    if (celdas.length === 0) return;
    const mesh = new THREE.InstancedMesh(geo, matTerreno, celdas.length);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    celdas.forEach((c, i) => {
      const p = centroHex(mapaHex, c.col, c.row);
      dummy.position.set(p.x, c.y * alturaPrisma, p.z);
      dummy.rotation.set(0, c.shape === "half" ? (c.rot * Math.PI) / 3 : 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.set(c.color));
    });
    // Guardamos las celdas en orden para poder mapear un instanceId del
    // raycast → celda (col,row,y) al mover un token.
    mesh.userData.celdas = celdas;
    scene.add(mesh);
    hexMeshes.push(mesh);
  };
  crearInstancias(
    geoCompleto,
    mapaHex.cells.filter((c) => c.shape !== "half"),
  );
  crearInstancias(
    geoMedio,
    mapaHex.cells.filter((c) => c.shape === "half"),
  );

  if (recentrarCamara) centrarCamaraHex(mapaHex);
  syncTokens();
  syncMarcas();
  updateClickables();
}

// --- Tokens sobre el mapa ---

// Altura del cilindro de un token según su tipo. Las criaturas usan un cilindro
// la mitad de bajo para distinguirlas de un vistazo de los personajes.
const ALTURA_TOKEN_PERSONAJE = 3;
const ALTURA_TOKEN_CRIATURA = 1.5;
function alturaToken(tipo: TokenPartida["tipo"]): number {
  return tipo === "criatura" ? ALTURA_TOKEN_CRIATURA : ALTURA_TOKEN_PERSONAJE;
}

// Posición de mundo de un token según el mapa hexagonal activo. La `y` deja el
// cilindro apoyado sobre la superficie (centro a media altura del cilindro),
// más la altura de vuelo si el token está flotando (criaturas Voladoras).
function posicionMundoToken(
  pos: { col: number; row: number; nivel: number },
  altura = ALTURA_TOKEN_PERSONAJE,
  alturaVuelo = 0,
): THREE.Vector3 {
  const m = partidaActual.value?.mapa;
  if (m) {
    const p = centroHex(m, pos.col, pos.row);
    return new THREE.Vector3(
      p.x,
      alturaSuperficie(m, pos.nivel) + alturaVuelo * m.prismHeight + altura / 2,
      p.z,
    );
  }
  // Sin mapa hexagonal: reparto plano aproximado.
  return new THREE.Vector3(pos.col * 2, alturaVuelo + altura / 2, pos.row * 2);
}

// Sincroniza los meshes de token con el estado de la partida (crea/actualiza/
// elimina) y refleja la selección con un tono emisivo.
function syncTokens() {
  if (!scene) return;
  const tokens = partidaActual.value?.tokens ?? [];
  const activos = new Set<string>();

  tokens.forEach((t, idx) => {
    activos.add(t.id);
    const altura = alturaToken(t.tipo);
    let mesh = tokenMeshes.get(t.id);
    if (!mesh) {
      const geometry = new THREE.CylinderGeometry(1, 1, altura, 20);
      const material = new THREE.MeshStandardMaterial({
        color: COLORES_TOKENS[idx % COLORES_TOKENS.length],
        metalness: 0.3,
        roughness: 0.7,
      });
      mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.userData.tokenId = t.id;
      mesh.userData.altura = altura;
      scene.add(mesh);
      tokenMeshes.set(t.id, mesh);
    }
    mesh.position.copy(posicionMundoToken(t.pos, altura, t.alturaVuelo ?? 0));
    const mat = mesh.material as THREE.MeshStandardMaterial;
    mat.emissive.set(t.id === tokenSeleccionado.value ? 0x555500 : 0x000000);
  });

  for (const [id, mesh] of tokenMeshes) {
    if (!activos.has(id)) {
      scene.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      tokenMeshes.delete(id);
    }
  }
  updateClickables();
}

// Sincroniza los meshes de marcas con el estado de la partida (crea/mueve/
// elimina). No dispone las texturas (se cachean por forma y se reutilizan).
function syncMarcas() {
  if (!scene) return;
  const mapaHex = partidaActual.value?.mapa;
  const marcas = partidaActual.value?.marcas ?? [];
  const activos = new Set<string>();

  marcas.forEach((m) => {
    activos.add(m.id);
    let mesh = marcaMeshes.get(m.id);
    if (!mesh) {
      const geometry = new THREE.PlaneGeometry(1.3, 1.3);
      geometry.rotateX(-Math.PI / 2);
      const material = new THREE.MeshBasicMaterial({
        map: texturaDeForma(m.forma),
        transparent: true,
        depthWrite: false,
      });
      mesh = new THREE.Mesh(geometry, material);
      mesh.renderOrder = 2;
      mesh.userData.marcaId = m.id;
      scene.add(mesh);
      marcaMeshes.set(m.id, mesh);
    }
    if (mapaHex) {
      const p = centroHex(mapaHex, m.pos.col, m.pos.row);
      mesh.position.set(p.x, alturaSuperficie(mapaHex, m.pos.nivel) + 0.06, p.z);
    }
  });

  for (const [id, mesh] of marcaMeshes) {
    if (!activos.has(id)) {
      scene.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      marcaMeshes.delete(id);
    }
  }
  updateClickables();
}

// Repinta los tokens cuando cambian (colocar/mover/quitar desde el diario) y
// reconstruye los HUD (barra de vida + estados) sobre cada uno.
watch(
  () => partidaActual.value?.tokens,
  () => {
    syncTokens();
    reconstruirHuds();
  },
  { deep: true, immediate: true },
);

// Repinta las marcas cuando cambian (pintar/quitar con la herramienta).
watch(
  () => partidaActual.value?.marcas,
  () => syncMarcas(),
  { deep: true, immediate: true },
);

// Señalar un token desde la barra derecha (Diario): centra la cámara sobre él
// (conservando el ángulo/distancia actuales) y lo resalta en verde un
// instante para indicar dónde está en el mapa.
watch(
  () => tokenSenalado.value,
  (v) => {
    if (!v) return;
    const mesh = tokenMeshes.get(v.tokenId);
    if (!mesh) return;

    if (controls && camera) {
      const destino = mesh.position.clone();
      const offset = camera.position.clone().sub(controls.target);
      controls.target.copy(destino);
      camera.position.copy(destino).add(offset);
      controls.update();
    }

    const mat = mesh.material as THREE.MeshStandardMaterial;
    mat.emissive.set(0x22cc55);
    if (resaltadoTimeout) clearTimeout(resaltadoTimeout);
    const tokenId = v.tokenId;
    resaltadoTimeout = setTimeout(() => {
      const m = tokenMeshes.get(tokenId);
      if (!m) return;
      const mm = m.material as THREE.MeshStandardMaterial;
      mm.emissive.set(tokenId === tokenSeleccionado.value ? 0x555500 : 0x000000);
    }, 1600);
  },
);

// (Re)crea las entradas de HUD a partir del estado de los tokens. Solo el
// contenido (vida/estados); la posición en pantalla se actualiza cada frame en
// el bucle de render (proyectando la posición 3D del token).
function reconstruirHuds() {
  const tokens = partidaActual.value?.tokens ?? [];
  tokenHuds.value = tokens.map((t) => {
    const previo = tokenHuds.value.find((h) => h.id === t.id);
    const max = t.vida?.max ?? 10;
    return {
      id: t.id,
      nombre: t.nombre,
      x: previo?.x ?? 0,
      y: previo?.y ?? 0,
      visible: previo?.visible ?? false,
      vidaActual: t.vida?.actual ?? max,
      vidaMax: max,
      estados: (t.estados ?? []).map((e) => ({
        estadoId: e.estadoId,
        icono: iconoEstado(e.estadoId),
        nombre: obtenerEstado(e.estadoId)?.nombre ?? "Estado",
        valor: e.valor,
        etiqueta: nombreEstadoAplicado(e),
      })),
    };
  });
}

// Color de la barra de vida según el porcentaje restante.
function colorBarraVida(actual: number, max: number): string {
  const pct = max > 0 ? (actual / max) * 100 : 0;
  if (pct > 50) return "#22c55e";
  if (pct > 25) return "#eab308";
  return "#ef4444";
}

// Proyecta la posición 3D de cada token a coordenadas de pantalla y actualiza
// la posición de su HUD. Se llama en cada frame desde animate().
const vecProyeccion = new THREE.Vector3();
function actualizarPosicionesHuds() {
  if (!renderer || !camera || tokenHuds.value.length === 0) return;
  const rect = renderer.domElement.getBoundingClientRect();
  for (const hud of tokenHuds.value) {
    const mesh = tokenMeshes.get(hud.id);
    if (!mesh) {
      hud.visible = false;
      continue;
    }
    // Un poco por encima de la cabeza del cilindro (según su altura: el centro
    // está a media altura, así que la cima es +altura/2 y dejamos 0.9 de aire).
    const alturaMesh = (mesh.userData.altura as number) ?? ALTURA_TOKEN_PERSONAJE;
    vecProyeccion.copy(mesh.position);
    vecProyeccion.y += alturaMesh / 2 + 0.9;
    vecProyeccion.project(camera);
    hud.visible = vecProyeccion.z < 1;
    hud.x = rect.left + (vecProyeccion.x * 0.5 + 0.5) * rect.width;
    hud.y = rect.top + (-vecProyeccion.y * 0.5 + 0.5) * rect.height;
  }
}

const tokenSeleccionadoNombre = computed(
  () =>
    partidaActual.value?.tokens?.find((t) => t.id === tokenSeleccionado.value)
      ?.nombre ?? null,
);

// --- Hexágono bajo el ratón (mecanismo reutilizable) ---
// Detecta sobre qué casilla del mapa está el cursor y la resalta con un tono
// más claro. `hexHovered` queda expuesto como estado para otras funciones
// futuras (colocar, medir, seleccionar área...).
const hexHovered = ref<{ col: number; row: number; nivel: number } | null>(
  null,
);
const BLANCO = new THREE.Color(0xffffff);
// Tono para señalar una casilla tapada (no seleccionable) bajo el cursor.
const ROJO_BLOQUEO = new THREE.Color(0xff3333);
const colorTmp = new THREE.Color();
let hexResaltado: { mesh: THREE.InstancedMesh; instanceId: number } | null =
  null;

interface HexRaycast {
  mesh: THREE.InstancedMesh;
  instanceId: number;
  celda: MapaHexCelda;
}

// Raycast a los prismas del mapa y resuelve la celda concreta bajo el puntero.
function hexEnPuntero(clientX: number, clientY: number): HexRaycast | null {
  if (!renderer || !camera || hexMeshes.length === 0) return null;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(hexMeshes, false);
  const hit = hits[0];
  if (!hit || hit.instanceId == null) return null;
  const mesh = hit.object as THREE.InstancedMesh;
  const celda = (mesh.userData.celdas as MapaHexCelda[])?.[hit.instanceId];
  if (!celda) return null;
  return { mesh, instanceId: hit.instanceId, celda };
}

function limpiarResaltado() {
  if (!hexResaltado) return;
  const { mesh, instanceId } = hexResaltado;
  const celda = (mesh.userData.celdas as MapaHexCelda[])?.[instanceId];
  if (celda) {
    mesh.setColorAt(instanceId, colorTmp.set(celda.color));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }
  hexResaltado = null;
}

function resaltarHex(res: HexRaycast | null) {
  // Si cambia el hex resaltado, restaura el anterior primero.
  if (
    hexResaltado &&
    (!res ||
      hexResaltado.mesh !== res.mesh ||
      hexResaltado.instanceId !== res.instanceId)
  ) {
    limpiarResaltado();
  }
  if (!res) return;
  // Blanco si es una casilla seleccionable; rojo si está tapada.
  const destino = celdaSeleccionable(res.celda) ? BLANCO : ROJO_BLOQUEO;
  colorTmp.set(res.celda.color).lerp(destino, 0.4);
  res.mesh.setColorAt(res.instanceId, colorTmp);
  if (res.mesh.instanceColor) res.mesh.instanceColor.needsUpdate = true;
  hexResaltado = { mesh: res.mesh, instanceId: res.instanceId };
}

// Actualiza resaltado + estado del hex bajo el cursor.
function actualizarHexHover(clientX: number, clientY: number) {
  const res = hexEnPuntero(clientX, clientY);
  resaltarHex(res);
  hexHovered.value = res
    ? { col: res.celda.col, row: res.celda.row, nivel: res.celda.y }
    : null;
}

function onCanvasLeave() {
  resaltarHex(null);
  hexHovered.value = null;
}

// --- Arrastrar y soltar una entrada del diario sobre el mapa ---
function onDragOver(e: DragEvent) {
  if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
  actualizarHexHover(e.clientX, e.clientY);
}

function onDrop(e: DragEvent) {
  const raw = e.dataTransfer?.getData("application/json");
  if (!raw) return;
  let data: {
    id: string;
    refId: string;
    tipo: "personaje" | "criatura";
    nombre: string;
  };
  try {
    data = JSON.parse(raw);
  } catch {
    return;
  }
  const res = hexEnPuntero(e.clientX, e.clientY);
  // Solo se coloca sobre la casilla apuntada si es seleccionable; si está
  // tapada, se deja sin posición para que colocarToken busque la primera libre.
  const pos =
    res && celdaSeleccionable(res.celda)
      ? { col: res.celda.col, row: res.celda.row, nivel: res.celda.y }
      : undefined;
  colocarToken(data, pos);
  onCanvasLeave();
}

// Encaja la cámara sobre el mapa hexagonal cargado.
function centrarCamaraHex(mapaHex: MapaHex) {
  if (!controls || !camera || mapaHex.cells.length === 0) return;
  const box = new THREE.Box3();
  mapaHex.cells.forEach((c) => {
    const p = centroHex(mapaHex, c.col, c.row);
    box.expandByPoint(
      new THREE.Vector3(p.x, c.y * mapaHex.prismHeight, p.z),
    );
  });
  const center = box.getCenter(new THREE.Vector3());
  const tamano = box.getSize(new THREE.Vector3()).length();
  controls.target.copy(center);
  const dist = Math.max(20, tamano * 0.6);
  camera.position
    .copy(center)
    .add(new THREE.Vector3(dist, dist, dist));
  controls.update();
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

// Watch for Selected Character to update indicators
watch(
  personajeActivo,
  (pj) => {
    updateActiveCharacterVisuals(pj);
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
        const dist = mesh.position.distanceTo(targetPos);
        if (dist > 10) {
          mesh.position.copy(targetPos);
        } else if (dist > 0.1) {
             // Animate short distance updates (e.g. Charge or Sync)
             if (!mesh.userData.justFinishedMove) {
                 mesh.userData.isMoving = true;
                 mesh.userData.pathQueue = [targetPos.clone()];
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
  tokenMeshes.forEach((m) => clickables.push(m));
  // Prismas del mapa hex: destino para mover el token seleccionado.
  hexMeshes.forEach((m) => clickables.push(m));
}

// --- Animation Loop ---
function animate() {
  rafId = requestAnimationFrame(animate);
  stats.update();
  controls.update();

  const dt = 0.016; // Approx delta time
  const now = Date.now() * 0.002;

  // Animate Active Indicator
  if (activeIndicatorMesh && characterMeshes.get(personajeActivo.value?.nombre || '')) {
      const charPos = characterMeshes.get(personajeActivo.value!.nombre)!.position;
      activeIndicatorMesh.position.set(charPos.x, charPos.y + 1.8 + Math.sin(now) * 0.2, charPos.z);
      activeIndicatorMesh.rotation.y += dt;
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
      // Reduced speed for more realistic movement (approx 4m/s)
      const speed = 4 * dt;

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

  // Reposicionar los HUD (barra de vida + estados) sobre los tokens.
  actualizarPosicionesHuds();

  // Reposicionar la etiqueta de la medición activa.
  actualizarLabelMedicion();
  actualizarLabelPlantilla();
  actualizarPings();

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// --- Rango de movimiento (BFS sobre la cuadrícula hexagonal) ---

// Paridad de fila (0/1) para el trazado odd-r; igual que en mapaHex.centroHex.
const paridadFila = (n: number) => ((n % 2) + 2) % 2;

// Desplazamientos a los 6 vecinos en offset odd-r (pointy-top). El primer
// índice es la paridad de la fila de origen.
const VECINOS_ODDR: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
  // filas pares
  [
    [1, 0],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
  ],
  // filas impares
  [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 1],
  ],
];

function vecinosHex(col: number, row: number): [number, number][] {
  const tabla = VECINOS_ODDR[paridadFila(row)] ?? VECINOS_ODDR[0]!;
  return tabla.map(([dc, dr]) => [col + dc, row + dr] as [number, number]);
}

// Locomoción EFECTIVA del personaje/criatura de origen del token: atributos
// guardados + bonos temporales editados en su ficha de partida (bonosDeFicha,
// misma clave que usa la ficha flotante: la entrada del diario). Así, lo que se
// edita en la ficha cambia la distancia real mostrada en el mapa.
async function locomocionDeToken(token: TokenPartida): Promise<{
  movimiento: number;
  saltoH: number;
  saltoV: number;
  vuelo: number;
  volador: boolean;
}> {
  const guardado =
    token.tipo === "criatura"
      ? await obtenerCriatura(token.refId)
      : await obtenerPersonaje(token.refId);
  const bonos = bonosDeFicha(token.diarioId ?? token.refId);
  const b = (clave: string) => bonos[clave] || 0;
  // En personajes, cada punto temporal de Cuerpo arrastra +1 a Poderío y
  // Movimiento (misma cascada que aplica la ficha).
  const cascadaCuerpo = token.tipo === "criatura" ? 0 : b("cuerpo");
  const movimiento =
    (guardado?.atributos?.movimiento ?? 3) + b("movimiento") + cascadaCuerpo;
  const poderio =
    (guardado?.atributos?.poderio ?? 0) + b("poderio") + cascadaCuerpo;
  const volador =
    token.tipo === "criatura" &&
    esVolador((guardado as { etiquetas?: string[] } | null)?.etiquetas);
  return {
    movimiento,
    saltoH: saltoHorizontal(movimiento, poderio) + b("salto"),
    saltoV: saltoVertical(poderio) + b("saltoV"),
    vuelo: movimiento + b("vuelo"),
    volador,
  };
}

// Casillas alcanzables desde `origen` con `pasos` puntos de movimiento. Cada
// paso avanza a un vecino que sea casilla válida y cuya diferencia de altura
// sea de una casilla como mucho (se puede subir/bajar 1; más se considera una
// pared y no se puede atravesar). No incluye la casilla de origen.
function calcularAlcance(
  origen: { col: number; row: number; nivel: number },
  pasos: number,
): Map<string, { col: number; row: number; nivel: number }> {
  const resultado = new Map<
    string,
    { col: number; row: number; nivel: number }
  >();
  const dist = new Map<string, number>();
  const claveOrigen = claveCelda(origen.col, origen.row, origen.nivel);
  dist.set(claveOrigen, 0);
  const cola: { col: number; row: number; nivel: number }[] = [origen];

  while (cola.length > 0) {
    const actual = cola.shift()!;
    const d = dist.get(
      claveCelda(actual.col, actual.row, actual.nivel),
    )!;
    if (d >= pasos) continue;

    for (const [nc, nr] of vecinosHex(actual.col, actual.row)) {
      // Solo alturas a distancia 1 (subir/bajar un escalón); ±2 o más es pared.
      for (const ny of [actual.nivel - 1, actual.nivel, actual.nivel + 1]) {
        const clave = claveCelda(nc, nr, ny);
        if (!casillasValidas.has(clave)) continue;
        const previo = dist.get(clave);
        if (previo !== undefined && previo <= d + 1) continue;
        dist.set(clave, d + 1);
        const celda = { col: nc, row: nr, nivel: ny };
        resultado.set(clave, celda);
        cola.push(celda);
      }
    }
  }

  resultado.delete(claveOrigen);
  return resultado;
}

function limpiarRango() {
  marcadoresRango.forEach((m) => {
    if (scene) scene.remove(m);
    m.geometry.dispose();
  });
  marcadoresRango.length = 0;
  if (matRango) {
    matRango.dispose();
    matRango = null;
  }
  celdasAlcanzables.clear();
  modoMovimiento.value = null;
  modoAtaque.value = null;
}

// Pinta marcadores translúcidos sobre la cara superior de cada casilla
// alcanzable y las registra como destinos válidos (celdasAlcanzables).
// Compartido por los modos mover, saltar y volar (cambia solo el color).
function pintarAlcance(
  alcance: Map<string, { col: number; row: number; nivel: number }>,
  color: number,
) {
  const mapaHex = partidaActual.value?.mapa;
  if (!mapaHex || !scene) return;

  matRango = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });

  for (const [clave, celda] of alcance) {
    celdasAlcanzables.set(clave, celda);
    const info = celdaPorClave.get(clave);
    const geo = crearGeometriaPrisma(
      mapaHex.hexRadius * 0.9,
      0.12,
      info?.shape === "half",
    );
    const marcador = new THREE.Mesh(geo, matRango);
    const p = centroHex(mapaHex, celda.col, celda.row);
    marcador.position.set(p.x, alturaSuperficie(mapaHex, celda.nivel) + 0.05, p.z);
    if (info?.shape === "half") marcador.rotation.y = (info.rot * Math.PI) / 3;
    marcador.renderOrder = 1;
    scene.add(marcador);
    marcadoresRango.push(marcador);
  }
}

// Pinta el rango de movimiento del token (verde) y entra en modo "mover".
async function mostrarRango(tokenId: string) {
  limpiarRango();
  const mapaHex = partidaActual.value?.mapa;
  const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
  if (!mapaHex || !token || !scene) return;

  const loco = await locomocionDeToken(token);
  const alcance = calcularAlcance(token.pos, loco.movimiento);
  if (alcance.size === 0) return;

  pintarAlcance(alcance, 0x33ff99);
  modoMovimiento.value = { tokenId, tipo: "mover" };
}

// Casillas alcanzables de un salto: en línea recta por el aire (no recorre el
// camino, así que puede cruzar huecos y muros), a como mucho `saltoH` pasos
// hexagonales del origen. El destino no puede quedar más de `saltoV` niveles
// por ENCIMA del origen; hacia abajo se puede saltar cualquier altura.
function calcularAlcanceSalto(
  origen: { col: number; row: number; nivel: number },
  saltoH: number,
  saltoV: number,
): Map<string, { col: number; row: number; nivel: number }> {
  const resultado = new Map<
    string,
    { col: number; row: number; nivel: number }
  >();
  for (const celda of celdaPorClave.values()) {
    const clave = claveCelda(celda.col, celda.row, celda.y);
    if (!casillasValidas.has(clave)) continue;
    const d = distanciaHex(origen, celda);
    if (d < 1 || d > saltoH) continue;
    if (celda.y - origen.nivel > saltoV) continue;
    resultado.set(clave, { col: celda.col, row: celda.row, nivel: celda.y });
  }
  return resultado;
}

// Casillas alcanzables volando: el movimiento se gasta por igual en horizontal
// (pasos hexagonales) y en vertical (niveles de diferencia entre superficies),
// ignorando muros y desniveles intermedios. La altura de vuelo actual del token
// se conserva al moverse, así que no entra en el coste.
function calcularAlcanceVuelo(
  origen: { col: number; row: number; nivel: number },
  vuelo: number,
): Map<string, { col: number; row: number; nivel: number }> {
  const resultado = new Map<
    string,
    { col: number; row: number; nivel: number }
  >();
  const claveOrigen = claveCelda(origen.col, origen.row, origen.nivel);
  for (const celda of celdaPorClave.values()) {
    const clave = claveCelda(celda.col, celda.row, celda.y);
    if (clave === claveOrigen || !casillasValidas.has(clave)) continue;
    const coste = distanciaHex(origen, celda) + Math.abs(celda.y - origen.nivel);
    if (coste > vuelo) continue;
    resultado.set(clave, { col: celda.col, row: celda.row, nivel: celda.y });
  }
  return resultado;
}

// Pinta el rango de salto del token (ámbar) y entra en modo "mover" (un clic
// sobre una casilla alcanzable salta allí).
async function mostrarRangoSalto(tokenId: string) {
  limpiarRango();
  const mapaHex = partidaActual.value?.mapa;
  const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
  if (!mapaHex || !token || !scene) return;

  const loco = await locomocionDeToken(token);
  const alcance = calcularAlcanceSalto(token.pos, loco.saltoH, loco.saltoV);
  if (alcance.size === 0) return;

  pintarAlcance(alcance, 0xffc837);
  modoMovimiento.value = { tokenId, tipo: "saltar" };
}

// Pinta el rango de vuelo del token (celeste) y entra en modo "mover". Solo
// para criaturas con la etiqueta Volador: el menú ya lo filtra, y el guard de
// aquí cubre el atajo de teclado (F), que no pasa por el menú.
async function mostrarRangoVuelo(tokenId: string) {
  limpiarRango();
  const mapaHex = partidaActual.value?.mapa;
  const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
  if (!mapaHex || !token || !scene) return;

  const loco = await locomocionDeToken(token);
  if (!loco.volador) return;
  const alcance = calcularAlcanceVuelo(token.pos, loco.vuelo);
  if (alcance.size === 0) return;

  pintarAlcance(alcance, 0x66ccff);
  modoMovimiento.value = { tokenId, tipo: "volar" };
}

// Instancia de personaje de la partida (con su `armaEquipada`) a la que
// corresponde un token, buscándola por su id de origen (`refId` === personajeId).
function instanciaDeToken(token: TokenPartida): PersonajeInstancia | undefined {
  for (const equipo of partidaActual.value?.equipos ?? []) {
    const pj = equipo.personajes.find((p) => p.personajeId === token.refId);
    if (pj) return pj;
  }
  return undefined;
}

// Alcance de ataque (en casillas) del token según el arma equipada en la ficha.
// Un arma cuerpo a cuerpo (sin `distancia_max`) alcanza las casillas adyacentes
// (1); las armas a distancia usan su `distancia_max`. Se usa el arma seleccionada
// (`armaEquipada`); si no hay ninguna equipada, se ataca cuerpo a cuerpo (1). Las
// criaturas no equipan armas, así que atacan cuerpo a cuerpo (1).
function alcanceAtaqueDeToken(token: TokenPartida): number {
  if (token.tipo === "criatura") return 1;
  const idEquipada = instanciaDeToken(token)?.armaEquipada;
  if (idEquipada == null) return 1;
  return ARMAS_POR_ID.get(idEquipada)?.distancia_max ?? 1;
}

// Casillas (col,row) entre `min` y `max` pasos hexagonales desde el origen,
// ignorando la altura (un ataque alcanza cualquier nivel dentro de su rango, sin
// el escalonado ±1 del movimiento). No incluye la casilla de origen (mínimo
// efectivo siempre >= 1).
function hexesEnRango(
  origen: { col: number; row: number },
  min: number,
  max: number,
): Set<string> {
  const resultado = new Set<string>();
  const dist = new Map<string, number>();
  const claveOrigen = `${origen.col},${origen.row}`;
  dist.set(claveOrigen, 0);
  const cola: { col: number; row: number }[] = [{ col: origen.col, row: origen.row }];

  while (cola.length > 0) {
    const actual = cola.shift()!;
    const d = dist.get(`${actual.col},${actual.row}`)!;
    if (d >= max) continue;
    for (const [nc, nr] of vecinosHex(actual.col, actual.row)) {
      const clave = `${nc},${nr}`;
      if (dist.has(clave)) continue;
      const nd = d + 1;
      dist.set(clave, nd);
      if (nd >= min) resultado.add(clave);
      cola.push({ col: nc, row: nr });
    }
  }

  return resultado;
}

// Pinta el rango de ataque del token (marcadores rojizos sobre cada casilla que
// el arma puede alcanzar, entre `min` y `max`) y entra en modo "atacar". Es
// solo visualización: no mueve el token; cualquier clic posterior limpia el
// rango. Sin `alcance` explícito, se usa el del arma equipada (legado).
function mostrarRangoAtaque(
  tokenId: string,
  alcance?: { min: number; max: number },
) {
  limpiarRango();
  const mapaHex = partidaActual.value?.mapa;
  const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
  if (!mapaHex || !token || !scene) return;

  const { min, max } = alcance ?? { min: 1, max: alcanceAtaqueDeToken(token) };
  const enRadio = hexesEnRango(token.pos, min, max);
  if (enRadio.size === 0) return;

  matRango = new THREE.MeshBasicMaterial({
    color: 0xff4444,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });

  for (const celda of celdaPorClave.values()) {
    if (!enRadio.has(`${celda.col},${celda.row}`)) continue;
    const geo = crearGeometriaPrisma(
      mapaHex.hexRadius * 0.9,
      0.12,
      celda.shape === "half",
    );
    const marcador = new THREE.Mesh(geo, matRango);
    const p = centroHex(mapaHex, celda.col, celda.row);
    marcador.position.set(p.x, alturaSuperficie(mapaHex, celda.y) + 0.05, p.z);
    if (celda.shape === "half") marcador.rotation.y = (celda.rot * Math.PI) / 3;
    marcador.renderOrder = 1;
    scene.add(marcador);
    marcadoresRango.push(marcador);
  }

  modoAtaque.value = { tokenId };
}

// La ficha embebida de un personaje pide (o cancela) el resaltado del rango
// de ataque de su arma seleccionada. `ficha.diarioId` localiza el token de esa
// instancia concreta en el mapa (puede haber varias copias del mismo personaje).
function onRangoArmaFicha(
  ficha: { diarioId?: string },
  alcance: { min: number; max: number } | null,
) {
  const token = ficha.diarioId
    ? partidaActual.value?.tokens?.find((t) => t.diarioId === ficha.diarioId)
    : undefined;
  if (!token) return;
  if (!alcance) {
    limpiarRango();
    return;
  }
  mostrarRangoAtaque(token.id, alcance);
}

// --- Menú contextual (clic derecho sobre un token) ---
function onContextMenu(event: MouseEvent) {
  if (!renderer || !camera) return;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(
    Array.from(tokenMeshes.values()),
    false,
  );
  const tokenId = hits[0]?.object.userData.tokenId as string | undefined;
  if (!tokenId) {
    menuContextual.value = null;
    return;
  }
  // Evita el menú del navegador y la rotación de cámara sobre el token.
  event.preventDefault();
  const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
  menuContextual.value = {
    x: event.clientX,
    y: event.clientY,
    tokenId,
    nombre: token?.nombre ?? "",
    volador: false,
  };
  // Saber si es Volador requiere leer la criatura guardada (async): se rellena
  // en diferido y solo si el menú sigue abierto sobre el mismo token.
  if (token?.tipo === "criatura") {
    void obtenerCriatura(token.refId).then((c) => {
      if (
        menuContextual.value?.tokenId === tokenId &&
        esVolador(c?.etiquetas)
      ) {
        menuContextual.value.volador = true;
      }
    });
  }
}

function menuVerFicha() {
  const menu = menuContextual.value;
  if (!menu) return;
  const token = partidaActual.value?.tokens?.find((t) => t.id === menu.tokenId);
  if (token) {
    if (token.tipo === "criatura")
      abrirFichaCriatura(token.refId, token.nombre, token.diarioId);
    else abrirFichaGuardado(token.refId, token.nombre, token.diarioId);
  }
  menuContextual.value = null;
}

function menuMover() {
  const menu = menuContextual.value;
  if (!menu) return;
  tokenSeleccionado.value = menu.tokenId;
  syncTokens();
  mostrarRango(menu.tokenId);
  menuContextual.value = null;
}

function menuSaltar() {
  const menu = menuContextual.value;
  if (!menu) return;
  tokenSeleccionado.value = menu.tokenId;
  syncTokens();
  mostrarRangoSalto(menu.tokenId);
  menuContextual.value = null;
}

function menuVolar() {
  const menu = menuContextual.value;
  if (!menu) return;
  tokenSeleccionado.value = menu.tokenId;
  syncTokens();
  mostrarRangoVuelo(menu.tokenId);
  menuContextual.value = null;
}

// Altura de vuelo del token del menú (niveles sobre su casilla).
const alturaTokenMenu = computed(() => {
  const tokenId = menuContextual.value?.tokenId;
  if (!tokenId) return 0;
  const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
  return token?.alturaVuelo ?? 0;
});

// Sube/baja un nivel la altura de vuelo del token del menú (mínimo 0 = posado).
function ajustarAlturaMenu(delta: number) {
  const tokenId = menuContextual.value?.tokenId;
  if (!tokenId) return;
  establecerAlturaVueloToken(tokenId, alturaTokenMenu.value + delta);
}

function menuAtacar() {
  const menu = menuContextual.value;
  if (!menu) return;
  tokenSeleccionado.value = menu.tokenId;
  syncTokens();
  mostrarRangoAtaque(menu.tokenId);
  menuContextual.value = null;
}

// Vida del token abierto en el menú contextual (para el editor rápido).
const vidaTokenMenu = computed(() => {
  const tokenId = menuContextual.value?.tokenId;
  if (!tokenId) return null;
  const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
  return token?.vida ?? null;
});

// Fija la vida actual del token del menú desde el input.
function fijarVidaMenu(valor: string | number) {
  const tokenId = menuContextual.value?.tokenId;
  if (!tokenId) return;
  establecerVidaToken(tokenId, Number(valor));
}

// Suma/resta a la vida actual del token del menú (botones +/-).
function ajustarVidaMenu(delta: number) {
  const tokenId = menuContextual.value?.tokenId;
  if (tokenId) ajustarVidaToken(tokenId, delta);
}

// Abre el panel de selección de estado alterado para el token del menú.
function menuAnadirEstado() {
  const menu = menuContextual.value;
  if (!menu) return;
  panelEstados.value = { x: menu.x, y: menu.y, tokenId: menu.tokenId };
  menuContextual.value = null;
}

// Quita del Escenario el token del menú (pide confirmación).
function menuEliminar() {
  const menu = menuContextual.value;
  if (!menu) return;
  menuContextual.value = null;
  if (!confirm(`¿Quitar a "${menu.nombre}" del Escenario?`)) return;
  if (tokenSeleccionado.value === menu.tokenId) tokenSeleccionado.value = null;
  quitarToken(menu.tokenId);
}

// Aplica un estado del catálogo al token del panel. Los estados simples se
// aplican directamente; los numéricos (acumulables) abren un menú flotante a la
// derecha para poner el valor X de forma cómoda.
function aplicarEstado(estado: EstadoAlterado) {
  const panel = panelEstados.value;
  if (!panel) return;
  if (!estado.acumulable) {
    agregarEstadoToken(panel.tokenId, estado.id);
    return;
  }
  const token = partidaActual.value?.tokens?.find((t) => t.id === panel.tokenId);
  const actual =
    token?.estados?.find((e) => e.estadoId === estado.id)?.valor ?? 0;
  // Se abre a la derecha del panel de estados (ancho w-64 = 256px + separación).
  panelValorEstado.value = {
    x: panel.x + 272,
    y: panel.y,
    tokenId: panel.tokenId,
    estado,
    valorActual: actual,
    entrada: actual > 0 ? actual : 1,
  };
}

// Fija el valor X del estado numérico al número introducido (reemplaza).
function fijarValorEstado() {
  const p = panelValorEstado.value;
  if (!p) return;
  establecerValorEstadoToken(p.tokenId, p.estado.id, p.entrada);
  panelValorEstado.value = null;
}

// Suma el número introducido al valor actual (para acumular, p. ej. Sangrado).
function aumentarValorEstado() {
  const p = panelValorEstado.value;
  if (!p) return;
  const suma = Math.max(1, Math.floor(p.entrada) || 1);
  agregarEstadoToken(p.tokenId, p.estado.id, suma);
  panelValorEstado.value = null;
}

// Quita un estado al pulsar su icono en el HUD del token.
function quitarEstadoHud(tokenId: string, estadoId: number) {
  quitarEstadoToken(tokenId, estadoId);
}

// Quita un estado desde el panel (se mantiene abierto para retirar varios).
function quitarEstadoPanel(estadoId: number) {
  const tokenId = panelEstados.value?.tokenId;
  if (tokenId) quitarEstadoToken(tokenId, estadoId);
}

// Atajos de teclado: M activa/cancela el modo mover sobre el token
// seleccionado; V alterna la visibilidad de los HUD (nombre/vida/estados);
// Escape cancela el modo o cierra el menú contextual.
function onKeyDown(event: KeyboardEvent) {
  // No interceptar si se está escribiendo en un campo (chat, etc.).
  const destino = event.target as HTMLElement | null;
  if (
    destino &&
    (destino.tagName === "INPUT" ||
      destino.tagName === "TEXTAREA" ||
      destino.isContentEditable)
  )
    return;

  if (event.key === "m" || event.key === "M") {
    event.preventDefault();
    if (herramientaActiva.value) desactivarHerramienta();
    if (modoMovimiento.value?.tipo === "mover") {
      limpiarRango();
    } else if (tokenSeleccionado.value) {
      mostrarRango(tokenSeleccionado.value);
    }
  } else if (event.key === "s" || event.key === "S") {
    event.preventDefault();
    if (herramientaActiva.value) desactivarHerramienta();
    if (modoMovimiento.value?.tipo === "saltar") {
      limpiarRango();
    } else if (tokenSeleccionado.value) {
      mostrarRangoSalto(tokenSeleccionado.value);
    }
  } else if (event.key === "f" || event.key === "F") {
    event.preventDefault();
    if (herramientaActiva.value) desactivarHerramienta();
    if (modoMovimiento.value?.tipo === "volar") {
      limpiarRango();
    } else if (tokenSeleccionado.value) {
      // Solo pinta el rango si el token es Volador (lo comprueba dentro).
      mostrarRangoVuelo(tokenSeleccionado.value);
    }
  } else if (event.key === "a" || event.key === "A") {
    event.preventDefault();
    if (herramientaActiva.value) desactivarHerramienta();
    if (modoAtaque.value) {
      limpiarRango();
    } else if (tokenSeleccionado.value) {
      mostrarRangoAtaque(tokenSeleccionado.value);
    }
  } else if (event.key === "v" || event.key === "V") {
    event.preventDefault();
    hudsVisibles.value = !hudsVisibles.value;
  } else if (event.key === "Escape") {
    menuContextual.value = null;
    panelValorEstado.value = null;
    panelEstados.value = null;
    if (modoMovimiento.value || modoAtaque.value) limpiarRango();
    if (herramientaActiva.value) desactivarHerramienta();
  }
}

// --- Medir distancias ---

// Resuelve el punto de mundo bajo el cursor: la superficie del terreno hex si el
// rayo la toca, o su intersección con el plano y=0 en caso contrario (permite
// medir clicando en el vacío / fuera del mapa).
function puntoMundoEnPuntero(
  clientX: number,
  clientY: number,
): THREE.Vector3 | null {
  if (!renderer || !camera) return null;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(hexMeshes, false)[0];
  if (hit) return hit.point.clone();
  const p = new THREE.Vector3();
  return raycaster.ray.intersectPlane(medPlano, p) ? p.clone() : null;
}

// Distancia recta 3D entre dos puntos, en ecsas. La componente horizontal usa 1
// ecsa = distancia perpendicular entre dos lados opuestos del hexágono
// (across-flats = √3 · hexRadius); la vertical, 1 ecsa = altura de un nivel de
// prisma (prismHeight), coherente con el movimiento (subir/bajar 1 nivel = 1
// paso). Ambas se combinan en línea recta. Sin mapa hex, 1 unidad = 1 ecsa.
function distanciaEnEcsas(a: THREE.Vector3, b: THREE.Vector3): number {
  const mapaHex = partidaActual.value?.mapa;
  const unidadH = mapaHex ? mapaHex.hexRadius * Math.sqrt(3) : 1;
  const unidadV = mapaHex ? mapaHex.prismHeight : 1;
  const horiz = Math.hypot(a.x - b.x, a.z - b.z) / unidadH;
  const vert = (a.y - b.y) / unidadV;
  return Math.hypot(horiz, vert);
}

function medMarcador(p: THREE.Vector3) {
  const geo = new THREE.SphereGeometry(0.18, 12, 12);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffcc33, depthTest: false });
  const m = new THREE.Mesh(geo, mat);
  m.position.copy(p);
  m.renderOrder = 999;
  scene.add(m);
  medMarcadores.push(m);
}

// Crea o actualiza la línea recta entre a y b (siempre visible: depthTest off).
function medDibujarLinea(a: THREE.Vector3, b: THREE.Vector3) {
  if (!medLinea) {
    medMatLinea = new THREE.LineBasicMaterial({
      color: 0xffcc33,
      depthTest: false,
      transparent: true,
    });
    const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
    medLinea = new THREE.Line(geo, medMatLinea);
    medLinea.renderOrder = 999;
    scene.add(medLinea);
  } else {
    medLinea.geometry.setFromPoints([a, b]);
  }
}

function limpiarMedicion() {
  medPuntoA = null;
  medPuntoB = null;
  medPreview = null;
  if (medLinea) {
    scene.remove(medLinea);
    medLinea.geometry.dispose();
    medLinea = null;
  }
  medMatLinea?.dispose();
  medMatLinea = null;
  medMarcadores.forEach((m) => {
    scene.remove(m);
    m.geometry.dispose();
    (m.material as THREE.Material).dispose();
  });
  medMarcadores.length = 0;
  medicionLabel.value = null;
}

// Un clic coloca el 1º punto; el siguiente el 2º (y fija la medida); el
// siguiente reinicia una medición nueva.
function clicMedicion(event: MouseEvent) {
  const p = puntoMundoEnPuntero(event.clientX, event.clientY);
  if (!p) return;
  if (!medPuntoA || medPuntoB) {
    limpiarMedicion();
    medPuntoA = p;
    medMarcador(p);
  } else {
    medPuntoB = p;
    medMarcador(p);
    medDibujarLinea(medPuntoA, p);
  }
}

// Proyecta el punto medio de la medición a pantalla y actualiza la etiqueta con
// la distancia. Se llama cada frame desde animate().
const medVec = new THREE.Vector3();
function actualizarLabelMedicion() {
  const a = medPuntoA;
  const b = medPuntoB ?? medPreview;
  if (herramientaActiva.value !== "medir" || !a || !b || !renderer || !camera) {
    if (medicionLabel.value) medicionLabel.value = null;
    return;
  }
  medVec.copy(a).add(b).multiplyScalar(0.5);
  medVec.y += 0.35;
  medVec.project(camera);
  const rect = renderer.domElement.getBoundingClientRect();
  medicionLabel.value = {
    x: rect.left + (medVec.x * 0.5 + 0.5) * rect.width,
    y: rect.top + (-medVec.y * 0.5 + 0.5) * rect.height,
    texto: `${distanciaEnEcsas(a, b).toFixed(1)} ecsas`,
    visible: medVec.z < 1,
  };
}

// --- Plantillas de área / cono ---

// Coordenada cúbica de una casilla (offset odd-r pointy-top, igual que centroHex).
function hexACubo(col: number, row: number): { x: number; y: number; z: number } {
  const x = col - (row - (row & 1)) / 2;
  const z = row;
  return { x, y: -x - z, z };
}

// Inversa: de cúbica a offset (col,row).
function cuboAOffset(c: { x: number; z: number }): { col: number; row: number } {
  return { col: c.x + (c.z - (c.z & 1)) / 2, row: c.z };
}

// Las 6 direcciones hexagonales en cúbica, en orden angular (cada una a 60° de
// la siguiente); dos consecutivas comparten un vértice del hexágono.
const DIRS_CUBO: { x: number; y: number; z: number }[] = [
  { x: 1, y: -1, z: 0 },
  { x: 1, y: 0, z: -1 },
  { x: 0, y: 1, z: -1 },
  { x: -1, y: 1, z: 0 },
  { x: -1, y: 0, z: 1 },
  { x: 0, y: -1, z: 1 },
];

// Distancia en casillas (pasos hexagonales) entre dos celdas, ignorando altura.
function distanciaHex(
  a: { col: number; row: number },
  b: { col: number; row: number },
): number {
  const ca = hexACubo(a.col, a.row);
  const cb = hexACubo(b.col, b.row);
  return (
    (Math.abs(ca.x - cb.x) + Math.abs(ca.y - cb.y) + Math.abs(ca.z - cb.z)) / 2
  );
}

// Footprints (col,row) dentro de `radio` casillas del origen (incluye el origen).
function calcularArea(
  origen: { col: number; row: number },
  radio: number,
): Set<string> {
  const claves = new Set<string>();
  for (const celda of celdaPorClave.values()) {
    if (distanciaHex(origen, celda) <= radio) claves.add(`${celda.col},${celda.row}`);
  }
  return claves;
}

// Footprints (col,row) del cono/triángulo desde `origen` hacia `cursor`. Se
// construye como un sector simétrico de 60° en coordenadas cúbicas: se elige el
// vértice (par de direcciones adyacentes dA/dB) más alineado con la dirección
// origen→cursor y se rellena O + a·dA + b·dB con 1 ≤ a+b ≤ alcance. Así, a
// distancia 1 abarca las 2 casillas adyacentes a esas dos caras y crece como un
// triángulo perfecto, igual por ambos lados. Solo se cuentan casillas del mapa.
function calcularCono(
  origen: { col: number; row: number; y: number },
  cursor: { col: number; row: number },
): Set<string> {
  const claves = new Set<string>();
  const mapaHex = partidaActual.value?.mapa;
  const alcance = distanciaHex(origen, cursor);
  if (!mapaHex || alcance < 1) return claves;

  const o = centroHex(mapaHex, origen.col, origen.row);
  const c = centroHex(mapaHex, cursor.col, cursor.row);
  const aim = new THREE.Vector2(c.x - o.x, c.z - o.z);
  if (aim.lengthSq() === 0) return claves;
  aim.normalize();

  const oc = hexACubo(origen.col, origen.row);
  // Dirección de mundo de cada uno de los 6 vecinos (orden angular de DIRS_CUBO).
  const dirsMundo = DIRS_CUBO.map((d) => {
    const off = cuboAOffset({ x: oc.x + d.x, z: oc.z + d.z });
    const p = centroHex(mapaHex, off.col, off.row);
    return new THREE.Vector2(p.x - o.x, p.z - o.z).normalize();
  });
  // Vértice (par de direcciones adyacentes) cuyo bisector mejor apunta al cursor.
  let mejor = 0;
  let mejorDot = -Infinity;
  for (let i = 0; i < 6; i++) {
    const bis = dirsMundo[i]!.clone().add(dirsMundo[(i + 1) % 6]!).normalize();
    const d = bis.dot(aim);
    if (d > mejorDot) {
      mejorDot = d;
      mejor = i;
    }
  }
  const dA = DIRS_CUBO[mejor]!;
  const dB = DIRS_CUBO[(mejor + 1) % 6]!;

  // Footprints existentes del mapa, para no contar/pintar casillas fuera de él.
  const existentes = new Set<string>();
  for (const celda of celdaPorClave.values()) {
    existentes.add(`${celda.col},${celda.row}`);
  }

  for (let a = 0; a <= alcance; a++) {
    for (let b = 0; b <= alcance - a; b++) {
      if (a + b < 1) continue;
      const off = cuboAOffset({
        x: oc.x + dA.x * a + dB.x * b,
        z: oc.z + dA.z * a + dB.z * b,
      });
      const clave = `${off.col},${off.row}`;
      if (existentes.has(clave)) claves.add(clave);
    }
  }
  return claves;
}

// Pinta marcadores translúcidos sobre la cara superior de cada casilla indicada.
function pintarPlantilla(claves: Set<string>, color: number) {
  plantillaMarcadores.forEach((m) => {
    scene.remove(m);
    m.geometry.dispose();
  });
  plantillaMarcadores.length = 0;
  const mapaHex = partidaActual.value?.mapa;
  if (!mapaHex) return;
  if (!plantillaMat) {
    plantillaMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
  }
  plantillaMat.color.setHex(color);
  for (const celda of celdaPorClave.values()) {
    if (!claves.has(`${celda.col},${celda.row}`)) continue;
    const geo = crearGeometriaPrisma(
      mapaHex.hexRadius * 0.92,
      0.12,
      celda.shape === "half",
    );
    const m = new THREE.Mesh(geo, plantillaMat);
    const p = centroHex(mapaHex, celda.col, celda.row);
    m.position.set(p.x, alturaSuperficie(mapaHex, celda.y) + 0.05, p.z);
    if (celda.shape === "half") m.rotation.y = (celda.rot * Math.PI) / 3;
    m.renderOrder = 1;
    scene.add(m);
    plantillaMarcadores.push(m);
  }
}

// Recalcula y repinta la plantilla (área o cono) desde el origen hasta la casilla
// bajo el cursor, y actualiza la etiqueta con el nº de casillas.
function actualizarPlantilla(cursor: { col: number; row: number; y: number }) {
  if (!plantillaOrigen) return;
  const mapaHex = partidaActual.value?.mapa;
  if (!mapaHex) return;

  const esCono = herramientaActiva.value === "cono";
  const claves = esCono
    ? calcularCono(plantillaOrigen, cursor)
    : calcularArea(plantillaOrigen, distanciaHex(plantillaOrigen, cursor));
  pintarPlantilla(claves, esCono ? 0xff8c1a : 0x33aaff);

  const p = centroHex(mapaHex, cursor.col, cursor.row);
  plantillaLabelWorld = new THREE.Vector3(
    p.x,
    alturaSuperficie(mapaHex, cursor.y) + 0.4,
    p.z,
  );
  plantillaLabelTexto = `${claves.size} ${claves.size === 1 ? "casilla" : "casillas"}`;
}

function limpiarPlantilla() {
  plantillaMarcadores.forEach((m) => {
    scene.remove(m);
    m.geometry.dispose();
  });
  plantillaMarcadores.length = 0;
  plantillaMat?.dispose();
  plantillaMat = null;
  plantillaOrigen = null;
  plantillaFijada = false;
  plantillaLabelWorld = null;
  plantillaLabelTexto = "";
  plantillaLabel.value = null;
}

// Proyecta la etiqueta de la plantilla a pantalla. Se llama cada frame.
function actualizarLabelPlantilla() {
  const activa =
    herramientaActiva.value === "area" || herramientaActiva.value === "cono";
  if (!plantillaLabelWorld || !renderer || !camera || !activa) {
    if (plantillaLabel.value) plantillaLabel.value = null;
    return;
  }
  medVec.copy(plantillaLabelWorld).project(camera);
  const rect = renderer.domElement.getBoundingClientRect();
  plantillaLabel.value = {
    x: rect.left + (medVec.x * 0.5 + 0.5) * rect.width,
    y: rect.top + (-medVec.y * 0.5 + 0.5) * rect.height,
    texto: plantillaLabelTexto,
    visible: medVec.z < 1,
  };
}

// Al cambiar de herramienta: ajusta el cursor y limpia cualquier dibujo previo
// (medición y plantilla) para empezar en limpio con la nueva.
watch(herramientaActiva, (val) => {
  if (renderer) renderer.domElement.style.cursor = val ? "crosshair" : "";
  limpiarMedicion();
  limpiarPlantilla();
});

// --- Interaction ---
async function onCanvasClick(event: MouseEvent) {
  // Herramienta de medir: los clics colocan los puntos de medición y no
  // interactúan con tokens/personajes.
  if (herramientaActiva.value === "medir") {
    clicMedicion(event);
    return;
  }

  // Herramientas de plantilla (área / cono): 1er clic fija el origen (sobre una
  // casilla) y arranca la vista previa; el siguiente la congela; el siguiente
  // reinicia con un origen nuevo.
  if (herramientaActiva.value === "area" || herramientaActiva.value === "cono") {
    if (!plantillaOrigen || plantillaFijada) {
      const res = hexEnPuntero(event.clientX, event.clientY);
      if (!res) return; // hay que clicar sobre una casilla
      limpiarPlantilla();
      plantillaOrigen = {
        col: res.celda.col,
        row: res.celda.row,
        y: res.celda.y,
      };
      actualizarPlantilla(res.celda);
    } else {
      plantillaFijada = true;
    }
    return;
  }

  // Herramienta de ping: un clic señala el punto (sobre terreno o "en el
  // vacío") con un destello temporal. Se queda activa para poder pingear
  // varias veces seguidas.
  if (herramientaActiva.value === "ping") {
    const p = puntoMundoEnPuntero(event.clientX, event.clientY);
    if (p) crearPing(p);
    return;
  }

  // Herramienta de marcas: un clic sobre una casilla pinta la forma elegida; si
  // ya había una marca en esa casilla, la quita (permite "borrar" con un clic).
  // La herramienta se queda activa para poder seguir pintando varias casillas.
  if (herramientaActiva.value === "marca") {
    const res = hexEnPuntero(event.clientX, event.clientY);
    if (!res || !celdaSeleccionable(res.celda)) return;
    const pos = { col: res.celda.col, row: res.celda.row, nivel: res.celda.y };
    if (!quitarMarcaEnCelda(pos)) colocarMarca(formaMarcaActiva.value, pos);
    return;
  }

  // Cualquier clic sobre el lienzo cierra el menú contextual / panel abierto.
  menuContextual.value = null;
  panelValorEstado.value = null;
  panelEstados.value = null;

  // En modo "atacar" el rango es solo informativo: cualquier clic lo limpia.
  if (modoAtaque.value) {
    limpiarRango();
    return;
  }

  // En modo "mover": un clic sobre una casilla alcanzable mueve el token; un
  // clic fuera del rango cancela el modo. Se resuelve antes que el resto de la
  // interacción.
  if (modoMovimiento.value) {
    const res = hexEnPuntero(event.clientX, event.clientY);
    const tokenId = modoMovimiento.value.tokenId;
    const destino = res
      ? celdasAlcanzables.get(
          claveCelda(res.celda.col, res.celda.row, res.celda.y),
        )
      : undefined;
    limpiarRango();
    if (destino) {
      moverToken(tokenId, destino);
    }
    return;
  }

  if (!renderer || !camera) return;

  // Calculate mouse position
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(clickables, false);

  if (intersects.length > 0) {
    const hit = intersects[0];
    const obj = hit.object;
    const point = hit.point;

    // Clic en un token: seleccionarlo. El movimiento no ocurre con el clic
    // normal; hay que entrar antes en modo "mover" (menú contextual o tecla M).
    if (obj.userData.tokenId) {
      tokenSeleccionado.value = obj.userData.tokenId as string;
      syncTokens();
      return;
    }

    if (obj.userData.isCharacter) {
      // Select character
      const target = obj.userData.characterData as PersonajeInstancia;
      abrirFichaInstancia(target);
      seleccionarPersonaje(target);
    } else if (obj === navMesh) {
      // Move selected character
      if (personajeActivo.value) {
        const mesh = characterMeshes.get(personajeActivo.value.nombre);
        if (!mesh) return;

        const startPos = mesh.position.clone();
        startPos.y = 0;

        // Find group ID (closest node)
        const groupId = pathfinding.getGroup(ZONE, startPos);

        // Find path
        const path = pathfinding.findPath(startPos, point, ZONE, groupId);

        if (path && path.length > 0) {
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

  // Herramienta de medir: vista previa de la línea hacia el cursor mientras se
  // coloca el segundo punto. No se resalta hex ni se muestra el panel.
  if (herramientaActiva.value === "medir") {
    if (medPuntoA && !medPuntoB) {
      const p = puntoMundoEnPuntero(event.clientX, event.clientY);
      if (p) {
        medPreview = p;
        medDibujarLinea(medPuntoA, p);
      }
    }
    panelVisible.value = false;
    return;
  }

  // Plantillas de área / cono: mientras no estén congeladas, crecen siguiendo la
  // casilla bajo el cursor.
  if (herramientaActiva.value === "area" || herramientaActiva.value === "cono") {
    if (plantillaOrigen && !plantillaFijada) {
      const res = hexEnPuntero(event.clientX, event.clientY);
      if (res) actualizarPlantilla(res.celda);
    }
    panelVisible.value = false;
    return;
  }

  // Resaltar el hexágono bajo el cursor.
  actualizarHexHover(event.clientX, event.clientY);

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
      renderer.domElement.addEventListener("contextmenu", onContextMenu);
    }
  });
  window.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
  if (renderer) {
    renderer.domElement.removeEventListener("click", onCanvasClick);
    renderer.domElement.removeEventListener("mousemove", onMouseMove);
    renderer.domElement.removeEventListener("contextmenu", onContextMenu);
  }
  window.removeEventListener("keydown", onKeyDown);
  limpiarRango();
  cancelAnimationFrame(rafId);
  if (renderer) {
    renderer.dispose();
  }
  // Cierra la suscripción en tiempo real de la partida.
  detenerRealtimePartida();
});
</script>
