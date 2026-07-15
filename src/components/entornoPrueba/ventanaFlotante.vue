<template>
  <div
    class="fixed z-50 flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900/95 text-gray-100 shadow-2xl backdrop-blur-md"
    :style="estilo"
  >
    <!-- Barra de título (arrastrable) -->
    <div
      class="flex cursor-move items-center justify-between border-b border-gray-700 bg-gray-800/80 px-3 py-2 select-none"
      @mousedown.prevent="iniciarArrastre"
    >
      <span
        class="truncate text-xs font-bold tracking-widest text-gray-300 uppercase"
      >
        {{ titulo }}
      </span>
      <button
        class="ml-2 flex h-5 w-5 items-center justify-center rounded text-gray-400 transition-colors hover:bg-red-600/80 hover:text-white"
        title="Cerrar"
        @mousedown.stop
        @click="$emit('close')"
      >
        ✕
      </button>
    </div>

    <!-- Contenido: el scroll vive en un contenedor SIN zoom (para que
         scrollHeight se calcule sobre el tamaño real de la ventana); el
         escalado visual se aplica en un div interno, evitando el recorte que
         provoca aplicar `zoom` y `overflow-auto` sobre el mismo elemento. -->
    <div class="min-h-0 flex-1 overflow-auto">
      <div :style="{ zoom }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";

const props = withDefaults(
  defineProps<{
    titulo?: string;
    // Tamaño de DISEÑO (al 100%). El tamaño real de la ventana es diseño × zoom.
    ancho?: number;
    alto?: number;
    // Factor de tamaño de la ventana ENTERA (contenido incluido).
    zoom?: number;
    // Escalonado para que varias ventanas abiertas no queden superpuestas.
    desplazamiento?: number;
  }>(),
  { titulo: "Ventana", ancho: 1280, alto: 960, zoom: 1, desplazamiento: 0 },
);

defineEmits<{ (e: "close"): void }>();

const ANCHO_MIN = 220;
const ALTO_MIN = 160;
const MARGEN = 12; // margen mínimo con los bordes de la pantalla

const CASCADA = 34;
const offset = ((props.desplazamiento || 0) % 6) * CASCADA;

// Tamaño objetivo = diseño × zoom, sin pasarse nunca del viewport.
function anchoObjetivo() {
  return Math.max(
    ANCHO_MIN,
    Math.min(props.ancho * props.zoom, window.innerWidth - MARGEN),
  );
}
function altoObjetivo() {
  return Math.max(
    ALTO_MIN,
    Math.min(props.alto * props.zoom, window.innerHeight - MARGEN),
  );
}

const estado = reactive({
  w: anchoObjetivo(),
  h: altoObjetivo(),
  x: 0,
  y: 0,
});
// Centrar al abrir (con escalonado para las ventanas apiladas).
estado.x = Math.max(0, (window.innerWidth - estado.w) / 2 + offset);
estado.y = Math.max(0, (window.innerHeight - estado.h) / 2 + offset);

// Recalcula tamaño (a partir del zoom) y reencuadra dentro de la pantalla, de
// modo que la barra de título y su botón de cerrar queden siempre visibles.
function ajustarAlViewport() {
  estado.w = anchoObjetivo();
  estado.h = altoObjetivo();
  estado.x = Math.min(
    Math.max(0, estado.x),
    Math.max(0, window.innerWidth - estado.w),
  );
  estado.y = Math.min(
    Math.max(0, estado.y),
    Math.max(0, window.innerHeight - estado.h),
  );
}

// Al cambiar el zoom, la ventana entera cambia de tamaño.
watch(() => props.zoom, ajustarAlViewport);

const estilo = computed(() => ({
  left: `${estado.x}px`,
  top: `${estado.y}px`,
  width: `${estado.w}px`,
  height: `${estado.h}px`,
}));

// --- Arrastre ---
let arrastre: { dx: number; dy: number } | null = null;

function iniciarArrastre(e: MouseEvent) {
  arrastre = { dx: e.clientX - estado.x, dy: e.clientY - estado.y };
  window.addEventListener("mousemove", moverArrastre);
  window.addEventListener("mouseup", finArrastre);
}

function moverArrastre(e: MouseEvent) {
  if (!arrastre) return;
  const maxX = window.innerWidth - estado.w;
  const maxY = window.innerHeight - estado.h;
  estado.x = Math.min(Math.max(0, e.clientX - arrastre.dx), Math.max(0, maxX));
  estado.y = Math.min(Math.max(0, e.clientY - arrastre.dy), Math.max(0, maxY));
}

function finArrastre() {
  arrastre = null;
  window.removeEventListener("mousemove", moverArrastre);
  window.removeEventListener("mouseup", finArrastre);
}

onMounted(() => window.addEventListener("resize", ajustarAlViewport));

onBeforeUnmount(() => {
  finArrastre();
  window.removeEventListener("resize", ajustarAlViewport);
});
</script>
