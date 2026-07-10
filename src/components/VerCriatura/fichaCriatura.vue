<template>
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <div
        class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-8 shadow-xl"
      >
        <!-- Botón Volver -->
        <div class="mb-4">
          <button
            @click="volver"
            class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg flex items-center gap-2"
          >
            ← Volver al Bestiario
          </button>
        </div>

        <div v-if="!criatura" class="text-center py-16">
          <p class="text-2xl text-gray-500">Cargando criatura...</p>
        </div>

        <template v-else>
          <!-- Cabecera -->
          <div class="text-center mb-6 pb-4 border-b border-gray-200">
            <h2 class="text-4xl font-bold text-gray-600">
              {{ criatura.nombre }}
            </h2>
            <div class="flex justify-center flex-wrap gap-2 mt-3">
              <span
                v-for="etiqueta in criatura.etiquetas"
                :key="etiqueta"
                class="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full"
              >
                {{ etiqueta }}
              </span>
            </div>
            <p
              v-if="criatura.descripcion"
              class="text-gray-500 mt-3 max-w-3xl mx-auto italic"
            >
              {{ criatura.descripcion }}
            </p>
          </div>

          <div class="grid grid-cols-12 gap-6">
            <!-- Columna Izquierda: stats -->
            <div class="col-span-12 lg:col-span-5 space-y-4">
              <!-- Dificultad / Experiencia -->
              <div class="grid grid-cols-2 gap-3">
                <div
                  class="bg-amber-50 border-2 border-amber-300 rounded-lg p-3 text-center"
                >
                  <div
                    class="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1"
                  >
                    Dificultad
                  </div>
                  <div class="text-2xl font-bold text-amber-600">
                    {{ criatura.dificultad }}
                  </div>
                </div>
                <div
                  class="bg-amber-50 border-2 border-amber-300 rounded-lg p-3 text-center"
                >
                  <div
                    class="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1"
                  >
                    Experiencia
                  </div>
                  <div class="text-2xl font-bold text-amber-600">
                    {{ criatura.experiencia }}
                  </div>
                </div>
              </div>

              <!-- HP y Armadura -->
              <div class="grid grid-cols-2 gap-3">
                <div
                  class="bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-400 rounded-lg p-3 shadow-lg text-center"
                >
                  <div
                    class="text-xs font-bold uppercase tracking-wide text-gray-700 mb-1"
                  >
                    HP
                  </div>
                  <div class="text-3xl font-bold text-blue-600">
                    {{ criatura.atributos.hp }}
                  </div>
                </div>
                <div
                  class="bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-400 rounded-lg p-3 shadow-lg"
                >
                  <div
                    class="text-xs font-bold uppercase tracking-wide text-gray-700 mb-2 text-center"
                  >
                    Armadura
                  </div>
                  <div class="grid grid-cols-3 gap-1">
                    <div class="text-center">
                      <div class="text-lg font-bold text-gray-700">L</div>
                      <div class="text-2xl font-bold text-blue-600">
                        {{ criatura.armadura.lacerante }}
                      </div>
                    </div>
                    <div class="text-center">
                      <div class="text-lg font-bold text-gray-700">P</div>
                      <div class="text-2xl font-bold text-blue-600">
                        {{ criatura.armadura.penetrante }}
                      </div>
                    </div>
                    <div class="text-center">
                      <div class="text-lg font-bold text-gray-700">C</div>
                      <div class="text-2xl font-bold text-blue-600">
                        {{ criatura.armadura.contundente }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Atributos principales -->
              <div class="grid grid-cols-3 gap-2">
                <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-2">
                  <div class="text-center mb-2 pb-1 border-b border-blue-300">
                    <h3 class="text-sm font-bold text-gray-700">Cuerpo</h3>
                    <div class="text-xl font-bold text-blue-600">
                      {{ criatura.atributos.cuerpo }}
                    </div>
                  </div>
                  <div class="space-y-1">
                    <div class="flex justify-between items-center text-xs px-1">
                      <span class="text-gray-600">Poderío</span>
                      <span class="font-bold text-blue-600">{{
                        criatura.atributos.poderio
                      }}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs px-1">
                      <span class="text-gray-600">Movimiento</span>
                      <span class="font-bold text-blue-600">{{
                        criatura.atributos.movimiento
                      }}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs px-1">
                      <span class="text-gray-600">Resistencia</span>
                      <span class="font-bold text-blue-600">{{
                        criatura.atributos.resistencia
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-2">
                  <div class="text-center mb-2 pb-1 border-b border-blue-300">
                    <h3 class="text-sm font-bold text-gray-700">Agilidad</h3>
                    <div class="text-xl font-bold text-blue-600">
                      {{ criatura.atributos.agilidad }}
                    </div>
                  </div>
                  <div class="space-y-1">
                    <div class="flex justify-between items-center text-xs px-1">
                      <span class="text-gray-600">Esquiva</span>
                      <span class="font-bold text-blue-600">{{
                        criatura.atributos.evasion
                      }}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs px-1">
                      <span class="text-gray-600">Iniciativa</span>
                      <span class="font-bold text-blue-600">{{
                        criatura.atributos.iniciativa
                      }}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs px-1">
                      <span class="text-gray-600">Deadeye</span>
                      <span class="font-bold text-blue-600">{{
                        criatura.atributos.punteria
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-2">
                  <div class="text-center mb-2 pb-1 border-b border-blue-300">
                    <h3 class="text-sm font-bold text-gray-700">Mente</h3>
                    <div class="text-xl font-bold text-blue-600">
                      {{ criatura.atributos.mente }}
                    </div>
                  </div>
                  <div class="space-y-1">
                    <div class="flex justify-between items-center text-xs px-1">
                      <span class="text-gray-600">Voluntad</span>
                      <span class="font-bold text-blue-600">{{
                        criatura.atributos.regeneracion
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Acciones y Reacciones -->
              <div class="grid grid-cols-2 gap-2">
                <div
                  class="bg-purple-50 border-2 border-purple-300 rounded-lg p-2 text-center"
                >
                  <div
                    class="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1"
                  >
                    Acciones
                  </div>
                  <div class="text-2xl font-bold text-purple-600">
                    {{ criatura.atributos.acciones }}
                  </div>
                </div>
                <div
                  class="bg-purple-50 border-2 border-purple-300 rounded-lg p-2 text-center"
                >
                  <div
                    class="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1"
                  >
                    Reacciones
                  </div>
                  <div class="text-2xl font-bold text-purple-600">
                    {{ criatura.atributos.reacciones }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Columna Derecha: técnicas -->
            <div class="col-span-12 lg:col-span-7">
              <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
                <h3
                  class="text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300"
                >
                  Técnicas
                </h3>
                <div
                  v-if="criatura.tecnicas.length === 0"
                  class="text-center text-gray-400 py-6"
                >
                  Sin técnicas.
                </div>
                <div class="space-y-3">
                  <div
                    v-for="(tecnica, i) in criatura.tecnicas"
                    :key="i"
                    class="bg-white border border-blue-300 rounded-lg p-3"
                  >
                    <div class="flex justify-between items-start mb-2 gap-2">
                      <div class="font-semibold text-gray-700">
                        {{ tecnica.nombre }}
                      </div>
                      <div class="flex gap-1 flex-wrap flex-shrink-0">
                        <span
                          :class="[
                            'px-2 py-0.5 text-xs font-semibold rounded-full text-white',
                            tecnica.activa ? 'bg-blue-500' : 'bg-gray-500',
                          ]"
                        >
                          {{ tecnica.activa ? "Activa" : "Pasiva" }}
                        </span>
                        <span
                          :class="[
                            'px-2 py-0.5 text-xs font-semibold rounded-full text-white',
                            tecnica.esMental ? 'bg-indigo-500' : 'bg-orange-500',
                          ]"
                        >
                          {{ tecnica.esMental ? "Mental" : "Física" }}
                        </span>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                      {{ tecnica.descripcion }}
                    </p>
                    <div
                      v-if="tieneDano(tecnica)"
                      class="grid grid-cols-3 gap-1 text-xs"
                    >
                      <div class="bg-blue-50 rounded p-1 text-center">
                        <span class="text-blue-600 font-semibold"
                          >L: {{ tecnica.dano.lacerante }}</span
                        >
                      </div>
                      <div class="bg-blue-50 rounded p-1 text-center">
                        <span class="text-blue-600 font-semibold"
                          >P: {{ tecnica.dano.penetrante }}</span
                        >
                      </div>
                      <div class="bg-blue-50 rounded p-1 text-center">
                        <span class="text-blue-600 font-semibold"
                          >C: {{ tecnica.dano.contundente }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import type { CriaturaData, Tecnica } from "../../domain/Criatura";

const props = defineProps<{
  criaturaId?: string;
}>();

const criatura = ref<CriaturaData | null>(null);

const navigateToBestiario = inject<() => void>("navigateToBestiario");

function volver() {
  if (navigateToBestiario) navigateToBestiario();
}

function tieneDano(tecnica: Tecnica): boolean {
  return (
    tecnica.dano.lacerante > 0 ||
    tecnica.dano.penetrante > 0 ||
    tecnica.dano.contundente > 0
  );
}

function cargarCriatura() {
  if (!props.criaturaId) {
    console.warn("No se proporcionó ID de criatura.");
    return;
  }
  const json = localStorage.getItem(props.criaturaId);
  if (!json) {
    console.warn(`No se encontró criatura con ID: ${props.criaturaId}`);
    return;
  }
  try {
    criatura.value = JSON.parse(json);
  } catch (error) {
    console.error("Error al cargar la criatura:", error);
  }
}

onMounted(cargarCriatura);
</script>

<style scoped></style>
