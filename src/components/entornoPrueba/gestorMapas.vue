<template>
  <!-- Botón flotante, a la izquierda del panel lateral (w-80 = 20rem) -->
  <button
    @click="abierto = !abierto"
    class="fab-layers fixed top-4 right-[21rem] z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-gray-700 bg-gray-900/95 text-gray-200 shadow-2xl backdrop-blur-md transition-colors hover:bg-gray-800"
    :class="{ 'ring-2 ring-indigo-500': abierto }"
    title="Gestionar mapas"
    v-html="layersIcon"
  ></button>

  <!-- Panel superior de gestión de mapas -->
  <div
    v-if="abierto"
    class="map-scroll fixed top-3 left-3 right-[25rem] z-40 overflow-hidden rounded-xl border border-gray-700 bg-gray-900/95 text-gray-100 shadow-2xl backdrop-blur-md"
  >
    <div class="flex items-center justify-between border-b border-gray-700 px-4 py-3">
      <div class="flex items-center gap-2.5">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-600/20 text-sm text-indigo-300"
          >🗺️</span
        >
        <div class="leading-none">
          <h3 class="font-serif text-base font-bold tracking-wide text-white">
            Mapas
          </h3>
          <p class="mt-0.5 text-[10px] tracking-widest text-gray-500 uppercase">
            {{ mapas.length }} {{ mapas.length === 1 ? "mapa" : "mapas" }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="triggerCargar"
          class="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-indigo-500"
        >
          <span class="mr-1">＋</span> Cargar mapa
        </button>
        <button @click="abierto = false" class="text-gray-500 hover:text-gray-300">
          ✕
        </button>
      </div>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept=".json"
      class="hidden"
      @change="cargarArchivo"
    />

    <!-- Lista horizontal de mapas (estilo "pages") -->
    <div class="flex gap-3 overflow-x-auto p-4">
      <div
        v-if="mapas.length === 0"
        class="flex items-center gap-3 py-6 text-sm text-gray-500 italic"
      >
        <span class="text-2xl opacity-40">📭</span>
        <span
          >No hay mapas cargados. Usa
          <span class="text-indigo-400 not-italic">“Cargar mapa”</span> para
          añadir uno exportado desde el Editor de Hexágonos.</span
        >
      </div>

      <div
        v-for="m in mapas"
        :key="m.id"
        @click="seleccionar(m)"
        class="group relative w-40 flex-shrink-0 cursor-pointer"
      >
        <div
          class="flex h-24 items-center justify-center rounded-lg border-2 bg-gray-800 text-3xl transition-all"
          :class="
            m.id === mapaActivoId
              ? 'border-indigo-500 bg-indigo-900/30 shadow-[0_0_16px_rgba(99,102,241,0.25)]'
              : 'border-gray-700 group-hover:-translate-y-0.5 group-hover:border-gray-500'
          "
          style="
            background-image: repeating-linear-gradient(
              45deg,
              rgba(148, 163, 184, 0.06) 0,
              rgba(148, 163, 184, 0.06) 8px,
              transparent 8px,
              transparent 16px
            );
          "
        >
          <span class="drop-shadow-lg">🗺️</span>
        </div>
        <div class="mt-1.5 flex items-center justify-between gap-1">
          <span
            class="truncate text-xs font-semibold"
            :class="m.id === mapaActivoId ? 'text-indigo-300' : 'text-gray-300'"
            :title="m.nombre"
          >
            {{ m.nombre }}
          </span>
          <button
            @click.stop="eliminar(m)"
            class="text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400"
            title="Eliminar mapa"
          >
            ✕
          </button>
        </div>
        <span
          v-if="m.id === mapaActivoId"
          class="absolute top-1.5 left-1.5 flex items-center gap-1 rounded bg-indigo-600 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase"
        >
          ● Activo
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
// Icono de capas (Flaticon fi-sr-layers). Se importa el SVG en crudo para
// inyectarlo inline y que herede el color del botón (currentColor).
import layersRaw from "../../assets/icons/layers.svg?raw";
import { usePartida } from "../../domain/usePartida";

// Normaliza el SVG: quita tamaños fijos (los controla el CSS) y fuerza a que
// el relleno herede el color del texto del botón.
const layersIcon = layersRaw
  .replace(/\s(width|height)="[^"]*"/g, "")
  .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"');
import {
  listarMapas,
  guardarMapa,
  eliminarMapa,
  type MapaGuardado,
} from "../../domain/storage/mapasRepo";
import { validarMapaHex, calcularCasillas } from "../../domain/mapaHex";

const { partidaActual, seleccionarMapa, quitarMapaActivo } = usePartida();

const abierto = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const mapas = ref<MapaGuardado[]>([]);

const mapaActivoId = computed(() => partidaActual.value?.mapaActivoId);

async function refrescar() {
  mapas.value = await listarMapas();
}
onMounted(refrescar);

function triggerCargar() {
  fileInput.value?.click();
}

function cargarArchivo(e: Event) {
  const input = e.target as HTMLInputElement;
  const archivo = input.files?.[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = async (ev) => {
    try {
      const json = JSON.parse(ev.target?.result as string);
      const mapaValidado = validarMapaHex(json);
      if (!mapaValidado) {
        alert(
          "⚠️ El archivo no es un mapa de hexágonos válido (expórtalo desde el Editor de Hexágonos).",
        );
        return;
      }
      if (calcularCasillas(mapaValidado).length === 0) {
        alert(
          "⚠️ El mapa no tiene ninguna casilla libre donde colocar entidades.",
        );
        return;
      }
      const nombre = archivo.name.replace(/\.json$/i, "");
      const guardado = await guardarMapa(nombre, mapaValidado);
      await refrescar();
      // Al cargar un mapa nuevo, lo marcamos como activo directamente.
      seleccionar(guardado);
    } catch {
      alert("⚠️ Error al leer el archivo JSON.");
    }
  };
  lector.readAsText(archivo);
  input.value = "";
}

function seleccionar(m: MapaGuardado) {
  seleccionarMapa(m);
}

async function eliminar(m: MapaGuardado) {
  if (!confirm(`¿Eliminar el mapa "${m.nombre}"?`)) return;
  await eliminarMapa(m.id);
  if (mapaActivoId.value === m.id) quitarMapaActivo();
  await refrescar();
}
</script>

<style scoped>
/* Tamaño del icono SVG inyectado en el botón flotante. Hereda el color del
   botón vía `currentColor`. */
.fab-layers :deep(svg) {
  width: 1.35rem;
  height: 1.35rem;
}

/* Scrollbar oscuro para la lista horizontal (el global es claro). */
.map-scroll :deep(*) {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.4) transparent;
}
.map-scroll :deep(*::-webkit-scrollbar) {
  height: 7px;
}
.map-scroll :deep(*::-webkit-scrollbar-thumb) {
  background-color: rgba(99, 102, 241, 0.35);
  border-radius: 8px;
}
.map-scroll :deep(*::-webkit-scrollbar-thumb:hover) {
  background-color: rgba(99, 102, 241, 0.55);
}
.map-scroll :deep(*::-webkit-scrollbar-track) {
  background: transparent;
}
</style>
