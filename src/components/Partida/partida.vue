<template>
  <div class="page">
    <div class="mx-auto w-full max-w-7xl">
      <!-- Header -->
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <button @click="volverAPartidas" class="btn btn-ghost btn-sm -ml-2">
            ← Volver a partidas
          </button>
          <h1 class="page-title mt-1">
            {{ partidaActual?.nombre || "Partida" }}
          </h1>
        </div>
      </div>

      <!-- Personajes por equipo -->
      <div v-if="partidaActual" class="space-y-6">
        <div
          v-for="equipo in partidaActual.equipos"
          :key="equipo.id"
          class="card p-6"
        >
          <h2
            class="mb-5 border-b border-gray-200 pb-3 text-lg font-bold text-gray-900"
          >
            {{ equipo.nombre }}
          </h2>

          <div
            v-if="equipo.personajes.length === 0"
            class="py-8 text-center text-sm text-gray-500"
          >
            No hay personajes en este equipo
          </div>

          <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="personaje in equipo.personajes"
              :key="personaje.instanciaId"
              class="relative rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors"
            >
              <!-- Nombre y Nivel -->
              <div class="mb-3 border-b border-gray-200 pb-2">
                <h3 class="text-base font-bold text-gray-900">
                  {{ personaje.nombre }}
                </h3>
                <p class="text-xs text-gray-500">
                  Nivel {{ personaje.nivel }}
                </p>
              </div>

              <!-- Estadísticas -->
              <div class="space-y-2">
                <!-- Vida -->
                <div class="panel p-2">
                  <div class="mb-1 flex items-center justify-between">
                    <span class="stat-label text-red-500">Vida</span>
                    <span class="text-sm font-bold text-red-700">
                      {{ personaje.vidaActual }} /
                      {{ personaje.atributos.hp }}
                    </span>
                  </div>
                  <div class="h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      class="h-1.5 rounded-full bg-red-500 transition-all"
                      :style="{
                        width: `${(personaje.vidaActual / personaje.atributos.hp) * 100}%`,
                      }"
                    ></div>
                  </div>
                </div>

                <!-- Vida Temporal -->
                <div class="panel p-2">
                  <div class="flex items-center justify-between">
                    <span class="stat-label">Vida temporal</span>
                    <input
                      v-model.number="personaje.vidaTemporal"
                      type="number"
                      min="0"
                      class="input-number w-16 py-1 text-xs"
                      @change="guardarCambios"
                    />
                  </div>
                </div>

                <!-- Evasión / Poderío / Puntería -->
                <div class="grid grid-cols-3 gap-2">
                  <div class="panel p-2 text-center">
                    <div class="stat-label">Evasión</div>
                    <div class="text-sm font-bold text-gray-900">
                      {{ personaje.atributos.evasion || 0 }}
                    </div>
                  </div>
                  <div class="panel p-2 text-center">
                    <div class="stat-label">Poderío</div>
                    <div class="text-sm font-bold text-gray-900">
                      {{ personaje.atributos.poderio || 0 }}
                    </div>
                  </div>
                  <div class="panel p-2 text-center">
                    <div class="stat-label">Puntería</div>
                    <div class="text-sm font-bold text-gray-900">
                      {{ personaje.atributos.punteria || 0 }}
                    </div>
                  </div>
                </div>

                <!-- Arma equipada -->
                <div class="panel p-2">
                  <label class="stat-label mb-1 block">Arma equipada</label>
                  <select
                    v-model="personaje.armaEquipada"
                    @change="guardarCambios"
                    class="input px-2 py-1 text-xs"
                  >
                    <option :value="null">Sin arma</option>
                    <option
                      v-for="armaId in personaje.armas"
                      :key="armaId"
                      :value="armaId"
                    >
                      {{ obtenerNombreArma(armaId) }}
                    </option>
                  </select>
                </div>

                <!-- Posición (solo lectura) -->
                <div class="panel p-2">
                  <div class="stat-label mb-1">Posición</div>
                  <div class="text-center font-mono text-xs text-gray-700">
                    ({{ personaje.posicion.x }}, {{ personaje.posicion.y }},
                    {{ personaje.posicion.z }})
                  </div>
                </div>
              </div>

              <!-- Acciones de gestión -->
              <div class="mt-4">
                <button
                  @click="resetearVida(personaje)"
                  class="btn btn-success btn-sm w-full"
                >
                  ❤ Reset vida
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <p class="empty-title">No se encontró la partida.</p>
      </div>
    </div>

    <!-- Mensaje de confirmación -->
    <div
      v-if="mensaje"
      class="animate-slide-up fixed right-4 bottom-4 z-50 max-w-md rounded-xl border border-emerald-300 bg-white p-4 shadow-2xl"
    >
      <div class="mb-2 flex items-start justify-between">
        <h4 class="text-sm font-bold text-emerald-700">Partida</h4>
        <button
          @click="mensaje = ''"
          class="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <pre class="font-sans text-sm whitespace-pre-wrap text-gray-700">{{
        mensaje
      }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, computed } from "vue";
import type { PersonajeInstancia, PartidaData } from "../../domain/Partida";
import armasData from "../../assets/armas.json";
import {
  obtenerPartida,
  guardarPartida,
} from "../../domain/storage/partidasRepo";

interface Props {
  partidaId: string;
}

const props = defineProps<Props>();

const partidaActual = ref<PartidaData | null>(null);
const navigateToPartidas = inject<() => void>("navigateToPartidas");

const mensaje = ref("");

interface Arma {
  id: number;
  nombre: string;
  etiquetas: number[];
  critico: string;
  rango_critico: number | null;
  perforante: number;
  lacerante: number;
  contundente: number;
}

const armas = computed(() => armasData.armas as Arma[]);

function obtenerNombreArma(armaId: number): string {
  const arma = armas.value.find((a) => a.id === armaId);
  return arma?.nombre || "Desconocida";
}

function resetearVida(personaje: PersonajeInstancia) {
  personaje.vidaActual = personaje.atributos.hp;
  personaje.vidaTemporal = 0;

  guardarCambios();

  mensaje.value = `✨ ${personaje.nombre} ha sido curado completamente!`;
  setTimeout(() => {
    mensaje.value = "";
  }, 3000);
}

async function cargarPartida() {
  try {
    const partida = await obtenerPartida(props.partidaId);
    if (!partida) {
      console.error("No se encontró la partida");
      return;
    }

    // Asegurar que cada personaje tenga vidaTemporal inicializada
    partida.equipos.forEach((equipo: any) => {
      equipo.personajes.forEach((personaje: any) => {
        if (personaje.vidaTemporal === undefined) {
          personaje.vidaTemporal = 0;
        }
      });
    });

    partidaActual.value = partida;
  } catch (error) {
    console.error("Error al cargar la partida:", error);
  }
}

async function volverAPartidas() {
  // Guardar cambios antes de salir
  await guardarCambios();
  if (navigateToPartidas) {
    navigateToPartidas();
  }
}

async function guardarCambios() {
  if (!partidaActual.value) return;

  try {
    await guardarPartida(partidaActual.value);
    console.log("✅ Cambios guardados");
  } catch (error) {
    console.error("❌ Error al guardar cambios:", error);
  }
}

onMounted(() => {
  void cargarPartida();
});
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
