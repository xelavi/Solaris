<template>
  <div
    ref="ventana"
    class="fixed z-50 flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900/95 text-gray-100 shadow-2xl backdrop-blur-md"
    :style="estilo"
  >
    <!-- Barra de título (arrastrable) -->
    <div
      class="flex cursor-move items-center justify-between border-b border-gray-700 bg-gray-800/80 px-3 py-2 select-none"
      @mousedown.prevent="iniciarArrastre"
    >
      <span class="truncate text-xs font-bold tracking-widest text-gray-300 uppercase">
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

    <!-- Contenido -->
    <div class="min-h-0 flex-1 overflow-auto">
      <slot />
    </div>

    <!-- Tirador de redimensionado (esquina inferior derecha) -->
    <div
      class="absolute right-0 bottom-0 h-4 w-4 cursor-nwse-resize"
      @mousedown.stop.prevent="iniciarRedim"
    >
      <div
        class="absolute right-0.5 bottom-0.5 h-2.5 w-2.5 border-r-2 border-b-2 border-gray-500"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeUnmount } from "vue";

const props = withDefaults(
  defineProps<{
    titulo?: string;
    ancho?: number;
    alto?: number;
    // Índice de cascada: desplaza la posición inicial para que varias ventanas
    // abiertas a la vez no queden perfectamente superpuestas.
    desplazamiento?: number;
  }>(),
  { titulo: "Ventana", ancho: 340, alto: 520, desplazamiento: 0 },
);

defineEmits<{ (e: "close"): void }>();

const ANCHO_MIN = 220;
const ALTO_MIN = 160;

// Estado de la ventana. Se centra en pantalla al montar (con un pequeño
// escalonado por `desplazamiento` para las ventanas que se apilan).
const CASCADA = 34;
// Se envuelve cada 6 ventanas para no salirse de la pantalla.
const offset = ((props.desplazamiento || 0) % 6) * CASCADA;
const estado = reactive({
  x: Math.max(0, (window.innerWidth - props.ancho) / 2 + offset),
  y: Math.max(0, (window.innerHeight - props.alto) / 2 + offset),
  w: props.ancho,
  h: props.alto,
});

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

// --- Redimensionado ---
let redim: { x: number; y: number; w: number; h: number } | null = null;

function iniciarRedim(e: MouseEvent) {
  redim = { x: e.clientX, y: e.clientY, w: estado.w, h: estado.h };
  window.addEventListener("mousemove", moverRedim);
  window.addEventListener("mouseup", finRedim);
}

function moverRedim(e: MouseEvent) {
  if (!redim) return;
  estado.w = Math.max(ANCHO_MIN, redim.w + (e.clientX - redim.x));
  estado.h = Math.max(ALTO_MIN, redim.h + (e.clientY - redim.y));
}

function finRedim() {
  redim = null;
  window.removeEventListener("mousemove", moverRedim);
  window.removeEventListener("mouseup", finRedim);
}

onBeforeUnmount(() => {
  finArrastre();
  finRedim();
});
</script>
