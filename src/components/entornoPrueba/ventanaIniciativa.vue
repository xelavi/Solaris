<template>
  <VentanaFlotante titulo="Iniciativa" :ancho="300" :alto="440" @close="$emit('close')">
    <div class="flex h-full flex-col">
      <!-- Barra de acciones (esquina superior): reordenar/tirar + configurar -->
      <div
        class="flex items-center justify-between gap-2 border-b border-gray-700 bg-gray-800/60 px-3 py-2"
      >
        <span class="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
          {{ orden.length }} {{ orden.length === 1 ? "combatiente" : "combatientes" }}
        </span>
        <div class="flex items-center gap-1.5">
          <button
            class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-700 bg-gray-900/70 text-gray-300 transition-colors hover:border-indigo-500/60 hover:bg-gray-800 hover:text-white"
            title="Resetear y volver a tirar"
            @click="tirarIniciativa"
          >
            <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 1 1-2.64-6.36" />
              <path d="M21 3v6h-6" />
            </svg>
          </button>
          <button
            class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-700 bg-gray-900/70 text-gray-300 transition-colors hover:border-indigo-500/60 hover:bg-gray-800 hover:text-white"
            :class="{ 'border-indigo-500/70 text-indigo-300': configAbierta }"
            title="Configurar el orden"
            @click="configAbierta = !configAbierta"
          >
            <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Lista ordenada (mayor a menor) -->
      <div class="min-h-0 flex-1 overflow-y-auto p-2">
        <p
          v-if="orden.length === 0"
          class="flex flex-col items-center gap-2 pt-10 text-center text-sm text-gray-600 italic"
        >
          <span class="text-2xl opacity-40">🎲</span>
          Coloca tokens en el mapa y pulsa el botón de tirar.
        </p>

        <ul v-else class="space-y-1.5">
          <li
            v-for="(e, i) in orden"
            :key="e.tokenId"
            class="flex cursor-pointer items-center gap-2.5 rounded-lg border px-2.5 py-2 transition-colors"
            :class="
              i === turnoActual
                ? 'border-indigo-500/70 bg-indigo-600/20'
                : 'border-gray-700 bg-gray-800/60 hover:border-gray-600 hover:bg-gray-800'
            "
            title="Marcar como turno actual"
            @click="turnoActual = i"
          >
            <span
              class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold"
              :class="
                i === turnoActual
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-900 text-gray-400'
              "
              >{{ i + 1 }}</span
            >
            <span
              class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold text-white"
              :class="
                e.tipo === 'criatura'
                  ? 'bg-gradient-to-b from-red-700 to-red-900'
                  : 'bg-gradient-to-b from-indigo-600 to-indigo-800'
              "
              >{{ inicial(e.nombre) }}</span
            >
            <span class="flex-1 truncate text-sm text-gray-100">{{ e.nombre }}</span>
            <span
              class="flex h-7 min-w-9 items-center justify-center rounded-md bg-gray-900 px-1.5 font-mono text-sm font-bold text-yellow-400"
              :title="`2d12 ${e.modificador >= 0 ? '+' : '−'} ${Math.abs(e.modificador)} (Iniciativa)`"
              >{{ e.tirada }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </VentanaFlotante>

  <!-- Ventana de configuración del orden -->
  <VentanaFlotante
    v-if="configAbierta"
    titulo="Configurar orden"
    :ancho="300"
    :alto="400"
    @close="configAbierta = false"
  >
    <div class="flex h-full flex-col">
      <p class="border-b border-gray-700 px-3 py-2 text-[11px] text-gray-500 italic">
        Arrastra o usa las flechas para reordenar.
      </p>
      <div class="min-h-0 flex-1 overflow-y-auto p-2">
        <p
          v-if="orden.length === 0"
          class="pt-8 text-center text-sm text-gray-600 italic"
        >
          No hay combatientes.
        </p>
        <ul v-else class="space-y-1.5">
          <li
            v-for="(e, i) in orden"
            :key="e.tokenId"
            draggable="true"
            class="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/60 px-2 py-1.5 transition-colors hover:border-gray-600"
            :class="{ 'opacity-40': arrastrandoIdx === i }"
            @dragstart="arrastrandoIdx = i"
            @dragend="arrastrandoIdx = null"
            @dragover.prevent
            @drop="soltarEn(i)"
          >
            <span class="cursor-grab text-gray-500 select-none active:cursor-grabbing">⠿</span>
            <span class="w-5 text-center font-mono text-xs text-gray-500">{{ i + 1 }}</span>
            <span class="flex-1 truncate text-sm text-gray-100">{{ e.nombre }}</span>
            <span class="mr-1 font-mono text-xs text-gray-500">{{ e.tirada }}</span>
            <button
              class="flex h-6 w-6 items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              :disabled="i === 0"
              title="Subir"
              @click="mover(i, -1)"
            >
              ▲
            </button>
            <button
              class="flex h-6 w-6 items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              :disabled="i === orden.length - 1"
              title="Bajar"
              @click="mover(i, 1)"
            >
              ▼
            </button>
          </li>
        </ul>
      </div>
    </div>
  </VentanaFlotante>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VentanaFlotante from "./ventanaFlotante.vue";
import { usePartida } from "../../domain/usePartida";
import type { TokenPartida } from "../../domain/Partida";
import { tirar2d12 } from "../../domain/dados";
import { obtenerPersonaje } from "../../domain/storage/personajesRepo";
import { obtenerCriatura } from "../../domain/storage/criaturasRepo";

defineEmits<{ (e: "close"): void }>();

// `orden` y `turnoActual` viven en usePartida (a nivel de módulo) para que el
// orden tirado sobreviva a cerrar y reabrir este panel, en vez de perderse al
// destruirse el componente.
const { partidaActual, ordenIniciativa: orden, turnoIniciativa: turnoActual } =
  usePartida();
const configAbierta = ref(false);
const arrastrandoIdx = ref<number | null>(null);

function inicial(nombre: string): string {
  return nombre?.trim().charAt(0).toUpperCase() || "?";
}

// Atributo de iniciativa del personaje/criatura de origen del token.
async function iniciativaDeToken(token: TokenPartida): Promise<number> {
  const origen =
    token.tipo === "criatura"
      ? await obtenerCriatura(token.refId)
      : await obtenerPersonaje(token.refId);
  return origen?.atributos?.iniciativa ?? 0;
}

// Tira iniciativa (2d12 + iniciativa) para cada token y ordena de mayor a menor.
// Empates: mayor atributo primero y, si persiste, aleatorio.
async function tirarIniciativa() {
  const tokens = partidaActual.value?.tokens ?? [];
  const entradas = await Promise.all(
    tokens.map(async (t) => {
      const modificador = await iniciativaDeToken(t);
      return {
        tokenId: t.id,
        nombre: t.nombre,
        tipo: t.tipo,
        modificador,
        tirada: tirar2d12(modificador, "Iniciativa").total,
      };
    }),
  );
  orden.value = entradas.sort(
    (a, b) =>
      b.tirada - a.tirada ||
      b.modificador - a.modificador ||
      Math.random() - 0.5,
  );
  turnoActual.value = 0;
}

// Mueve una entrada una posición arriba (-1) o abajo (+1).
function mover(i: number, dir: -1 | 1) {
  const j = i + dir;
  if (j < 0 || j >= orden.value.length) return;
  const arr = orden.value;
  [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  turnoActual.value = 0;
}

// Suelta la entrada arrastrada en la posición `destino` (drag & drop).
function soltarEn(destino: number) {
  const origen = arrastrandoIdx.value;
  arrastrandoIdx.value = null;
  if (origen == null || origen === destino) return;
  const arr = orden.value;
  const [movida] = arr.splice(origen, 1);
  if (movida) arr.splice(destino, 0, movida);
  turnoActual.value = 0;
}

// Solo se tira automáticamente la primera vez (sin orden ya calculado); si el
// panel se cierra y se reabre, el orden guardado en usePartida se conserva.
if (orden.value.length === 0) tirarIniciativa();
</script>
