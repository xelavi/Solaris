<template>
  <!-- Pestaña para ocultar/mostrar la barra (pegada a su borde derecho) -->
  <button
    class="fixed top-1/2 z-40 flex h-12 w-5 -translate-y-1/2 items-center justify-center rounded-r-lg border border-l-0 border-gray-700 bg-gray-900/95 text-gray-400 shadow-lg backdrop-blur-md transition-all duration-200 hover:text-white"
    :class="visible ? 'left-16' : 'left-0'"
    :title="visible ? 'Ocultar menú' : 'Mostrar menú'"
    @click="visible = !visible"
  >
    {{ visible ? "‹" : "›" }}
  </button>

  <!-- Barra lateral izquierda a pantalla completa -->
  <div
    class="fixed top-0 left-0 z-40 flex h-screen w-16 flex-col items-center gap-2 border-r border-gray-700 bg-gray-900/95 py-3 shadow-2xl backdrop-blur-md transition-transform duration-200"
    :class="visible ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Marca -->
    <div
      class="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/40 bg-indigo-600/20 text-indigo-300"
      title="Solaris"
    >
      ✦
    </div>
    <div class="my-1 h-px w-8 bg-gray-700"></div>

    <!-- Herramientas -->
    <button
      v-for="opcion in opciones"
      :key="opcion.id"
      class="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-700 bg-gray-800/70 text-gray-300 transition-colors hover:border-indigo-500/60 hover:bg-gray-800 hover:text-white"
      :class="{
        'border-indigo-500/70 bg-indigo-600/20 text-indigo-300': opcion.activa(),
      }"
      :title="opcion.label"
      @click="opcion.accion"
    >
      <span v-html="opcion.icono"></span>
      <!-- Tooltip lateral -->
      <span
        class="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-md border border-gray-700 bg-gray-900/95 px-2 py-1 text-xs font-semibold text-gray-100 shadow-lg group-hover:block"
      >
        {{ opcion.label }}
      </span>
    </button>

    <!-- Marcas: pintar trampas/objetos sobre una casilla (desplegable de formas) -->
    <div ref="marcasWrapRef" class="relative">
      <button
        class="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-700 bg-gray-800/70 text-gray-300 transition-colors hover:border-indigo-500/60 hover:bg-gray-800 hover:text-white"
        :class="{
          'border-indigo-500/70 bg-indigo-600/20 text-indigo-300':
            herramientaActiva === 'marca',
        }"
        title="Marcas (trampas, objetos…)"
        @click="onClickBotonMarcas"
      >
        <span class="text-lg leading-none">{{ emojiDeForma(formaMarcaActiva) }}</span>
        <span
          v-if="!marcasAbierto"
          class="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-md border border-gray-700 bg-gray-900/95 px-2 py-1 text-xs font-semibold text-gray-100 shadow-lg group-hover:block"
        >
          Marcas (trampas, objetos…)
        </span>
      </button>

      <div
        v-if="marcasAbierto"
        class="absolute top-0 left-full ml-2 flex flex-col gap-0.5 rounded-xl border border-gray-700 bg-gray-900/95 p-1.5 shadow-2xl backdrop-blur-md"
      >
        <button
          v-for="f in FORMAS_MARCA"
          :key="f.id"
          class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm whitespace-nowrap text-gray-200 transition-colors hover:bg-indigo-600/70"
          :class="{
            'bg-indigo-600/30 text-indigo-200':
              herramientaActiva === 'marca' && formaMarcaActiva === f.id,
          }"
          @click="elegirForma(f.id)"
        >
          <span class="w-5 text-center text-base">{{ f.emoji }}</span>
          <span>{{ f.label }}</span>
        </button>
      </div>
    </div>
  </div>

  <VentanaIniciativa v-if="iniciativaAbierta" @close="iniciativaAbierta = false" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import VentanaIniciativa from "./ventanaIniciativa.vue";
import { useHerramientas } from "../../domain/useHerramientas";
import { FORMAS_MARCA, emojiDeForma, type FormaMarca } from "../../domain/MarcasMapa";

const { herramientaActiva, formaMarcaActiva, alternar, activar, desactivar } =
  useHerramientas();
const iniciativaAbierta = ref(false);

// Visibilidad de la barra (la pestaña del borde la oculta/muestra).
const visible = ref(true);

// --- Desplegable de marcas ---
const marcasAbierto = ref(false);
const marcasWrapRef = ref<HTMLDivElement | null>(null);

// Clic en el botón principal: si la herramienta ya está activa, la desactiva
// (mismo gesto de toggle que el resto de herramientas); si no, abre/cierra el
// desplegable para elegir forma.
function onClickBotonMarcas() {
  if (herramientaActiva.value === "marca") {
    desactivar();
    marcasAbierto.value = false;
  } else {
    marcasAbierto.value = !marcasAbierto.value;
  }
}

// Elegir una forma activa la herramienta; volver a elegir la misma forma ya
// activa la desactiva (mismo gesto que el resto de herramientas de toggle).
function elegirForma(forma: FormaMarca) {
  if (herramientaActiva.value === "marca" && formaMarcaActiva.value === forma) {
    desactivar();
  } else {
    formaMarcaActiva.value = forma;
    activar("marca");
  }
  marcasAbierto.value = false;
}

// Cierra el desplegable al clicar fuera de él.
function onDocClick(e: MouseEvent) {
  if (!marcasAbierto.value) return;
  if (marcasWrapRef.value && !marcasWrapRef.value.contains(e.target as Node)) {
    marcasAbierto.value = false;
  }
}
onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));

interface OpcionMenu {
  id: string;
  label: string;
  icono: string;
  accion: () => void;
  activa: () => boolean;
}

// Iconos SVG inline (heredan el color con currentColor).
const iconoIniciativa = `
<svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="3" />
  <path d="M8 8h.01M12 12h.01M16 16h.01M16 8h.01M8 16h.01" />
</svg>`;

const iconoMedir = `
<svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 15 15 3l6 6L9 21z" />
  <path d="M7 11l1.5 1.5M10 8l1.5 1.5M13 5l1.5 1.5" />
</svg>`;

const iconoArea = `
<svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9" stroke-dasharray="3 3" />
  <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
</svg>`;

const iconoCono = `
<svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3 4 20h16z" stroke-dasharray="3 3" />
  <circle cx="12" cy="3" r="1.5" fill="currentColor" stroke="none" />
</svg>`;

const iconoPing = `
<svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
  <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none" />
</svg>`;

const opciones: OpcionMenu[] = [
  {
    id: "iniciativa",
    label: "Tirar iniciativa",
    icono: iconoIniciativa,
    accion: () => {
      desactivar();
      iniciativaAbierta.value = true;
    },
    activa: () => iniciativaAbierta.value,
  },
  {
    id: "medir",
    label: "Medir distancias",
    icono: iconoMedir,
    accion: () => alternar("medir"),
    activa: () => herramientaActiva.value === "medir",
  },
  {
    id: "area",
    label: "Medir área",
    icono: iconoArea,
    accion: () => alternar("area"),
    activa: () => herramientaActiva.value === "area",
  },
  {
    id: "cono",
    label: "Medir cono / triángulo",
    icono: iconoCono,
    accion: () => alternar("cono"),
    activa: () => herramientaActiva.value === "cono",
  },
  {
    id: "ping",
    label: "Ping: marcar un punto en el mapa",
    icono: iconoPing,
    accion: () => alternar("ping"),
    activa: () => herramientaActiva.value === "ping",
  },
];
</script>
