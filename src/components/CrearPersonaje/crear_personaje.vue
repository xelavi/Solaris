<template>
  <div class="page">
    <div class="mx-auto w-full max-w-7xl">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <button @click="volverAPersonajes" class="btn btn-ghost btn-sm -ml-2">
            ← Volver a personajes
          </button>
          <h1 class="page-title mt-1">Creación de personaje</h1>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="badge badge-success"
            title="Los cambios se guardan automáticamente"
          >
            <svg
              class="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              />
            </svg>
            Guardado automático
          </span>
          <button @click="verFicha" class="btn btn-secondary">Ver ficha</button>
        </div>
      </div>

      <div class="flex flex-col gap-6 lg:flex-row">
        <aside class="flex-shrink-0 lg:w-64">
          <div class="card sticky top-20 p-3">
            <p
              class="px-3 pt-1 pb-2 text-[11px] font-semibold tracking-wider text-gray-500 uppercase"
            >
              Pasos
            </p>
            <nav class="space-y-1">
              <button
                v-for="(step, index) in steps"
                :key="index"
                @click="currentStep = index"
                :class="[
                  'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
                  currentStep === index
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800',
                ]"
              >
                <span
                  :class="[
                    'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    currentStep === index
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-600',
                  ]"
                >
                  {{ index + 1 }}
                </span>
                {{ step }}
              </button>
            </nav>
          </div>
        </aside>

        <div class="min-w-0 flex-1">
          <div class="card min-h-[500px] p-6 sm:p-8">
            <div class="section-heading">
              <h2 class="text-xl font-bold text-gray-900">
                {{ steps[currentStep] }}
              </h2>
              <span class="text-xs font-medium text-gray-500">
                Paso {{ currentStep + 1 }} de {{ steps.length }}
              </span>
            </div>
            <div v-if="currentStep === 0" class="space-y-6">
              <general></general>
            </div>
            <div v-if="currentStep === 1" class="space-y-6">
              <trasfondo></trasfondo>
            </div>
            <div v-if="currentStep === 2" class="space-y-6">
              <especialidad></especialidad>
            </div>
            <div v-if="currentStep === 3" class="space-y-6">
              <estilo_marcial></estilo_marcial>
            </div>
            <div v-if="currentStep === 4" class="space-y-6">
              <arbol></arbol>
            </div>
            <div v-if="currentStep === 5" class="space-y-6">
              <habilidades></habilidades>
            </div>
            <div v-if="currentStep === 6" class="space-y-6">
              <equipo></equipo>
            </div>

            <div
              class="mt-8 flex items-center justify-between border-t border-gray-200 pt-6"
            >
              <button
                @click="currentStep = Math.max(0, currentStep - 1)"
                :disabled="currentStep === 0"
                class="btn btn-secondary"
              >
                ← Anterior
              </button>

              <button
                @click="
                  currentStep = Math.min(steps.length - 1, currentStep + 1)
                "
                :disabled="currentStep === steps.length - 1"
                class="btn btn-primary"
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import general from "./general.vue";
import trasfondo from "./trasfondo.vue";
import especialidad from "./especialidad.vue";
import estilo_marcial from "./estilo_marcial.vue";
import arbol from "./arbol.vue";
import habilidades from "./habilidades.vue";
import equipo from "./equipo.vue";
import { useCharacterCreation } from "../../domain/useCharacterCreation";
import { esPersonajeCompleto } from "../../domain/Personaje";
import {
  obtenerIdEnCreacion,
  eliminarPersonaje,
  limpiarIdEnCreacion,
} from "../../domain/storage/personajesRepo";

const currentStep = ref(0);

const steps = [
  "Información General",
  "Trasfondo",
  "Especialidad",
  "Estilo Marcial",
  "Arbol",
  "Habilidades",
  "Equipo",
];

const {
  characterData,
  saveCharacterData,
  loadCharacterData,
  resetCharacterData,
} = useCharacterCreation();

// Inject navigation functions from App.vue
const navigateToFicha = inject<(id: string) => void>("navigateToFicha");
const navigateToCharacters = inject<() => void>("navigateToCharacters");

async function volverAPersonajes() {
  // Un personaje sin los datos esenciales se descarta al salir del asistente.
  if (!esPersonajeCompleto(characterData.value)) {
    const id = obtenerIdEnCreacion();
    if (id) await eliminarPersonaje(id);
    limpiarIdEnCreacion();
    resetCharacterData();
  }

  navigateToCharacters?.();
}

async function verFicha() {
  if (!characterData.value.nombre) {
    alert("⚠️ Por favor, ponle un nombre al personaje antes de ver la ficha");
    return;
  }

  // Asegurar que lo último editado está persistido antes de salir.
  await saveCharacterData();
  navigateToFicha?.(characterData.value.id);
}

onMounted(async () => {
  await loadCharacterData();
});
</script>
<style scoped></style>
