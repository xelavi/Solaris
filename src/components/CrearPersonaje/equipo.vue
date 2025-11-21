<template>
  <div class="space-y-8">
    <!-- Tabla de Armas -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-2xl font-bold text-blue-700">Armas</h3>
        <div class="text-sm text-blue-600">
          Seleccionadas:
          <span class="font-bold">{{ armasSeleccionadas.length }}</span>
        </div>
      </div>

      <div
        class="bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden"
      >
        <!-- Header de la tabla de armas -->
        <div
          class="bg-blue-600 text-white grid grid-cols-12 gap-3 px-4 py-3 font-semibold text-sm"
        >
          <div class="col-span-1 text-center">Sel.</div>
          <div class="col-span-2">Arma</div>
          <div class="col-span-1 text-center">Pen.</div>
          <div class="col-span-1 text-center">Lac.</div>
          <div class="col-span-1 text-center">Con.</div>
          <div class="col-span-3">Categoría</div>
          <div class="col-span-1 text-center">Crítico</div>
          <div class="col-span-1 text-center">Rango Crít.</div>
          <div class="col-span-1 text-center">Distancia</div>
        </div>
        <!-- Filas de armas -->
        <div class="divide-y divide-blue-200 max-h-96 overflow-y-auto">
          <div
            v-for="arma in armas"
            :key="arma.id"
            @click="toggleArma(arma.id)"
            :class="[
              'grid grid-cols-12 gap-3 px-4 py-3 items-center cursor-pointer transition-colors',
              armasSeleccionadas.includes(arma.id)
                ? 'bg-blue-200 hover:bg-blue-250'
                : 'bg-white hover:bg-blue-100',
            ]"
          >
            <!-- Checkbox -->
            <div class="col-span-1 flex justify-center">
              <div
                :class="[
                  'w-6 h-6 rounded border-2 flex items-center justify-center transition-colors',
                  armasSeleccionadas.includes(arma.id)
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-white border-blue-300',
                ]"
              >
                <span
                  v-if="armasSeleccionadas.includes(arma.id)"
                  class="text-white text-sm font-bold"
                  >✓</span
                >
              </div>
            </div>

            <!-- Nombre -->
            <div class="col-span-2">
              <div class="font-semibold text-blue-700">{{ arma.nombre }}</div>
            </div>

            <!-- Daño Penetrante -->
            <div class="col-span-1 text-center">
              <div
                class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]"
              >
                {{ arma.penetrante }}
              </div>
            </div>

            <!-- Daño Lacerante -->
            <div class="col-span-1 text-center">
              <div
                class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]"
              >
                {{ arma.lacerante }}
              </div>
            </div>

            <!-- Daño Contundente -->
            <div class="col-span-1 text-center">
              <div
                class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]"
              >
                {{ arma.contundente }}
              </div>
            </div>

            <!-- Categoría -->
            <div class="col-span-3">
              <div class="text-sm text-blue-700">
                {{ arma.categoria }}
              </div>
            </div>

            <!-- Crítico -->
            <div class="col-span-1 text-center">
              <div
                class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-bold text-sm"
              >
                {{ arma.critico }}
              </div>
            </div>

            <!-- Rango Crítico -->
            <div class="col-span-1 text-center">
              <div
                class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm"
              >
                {{ formatRangoCritico(arma.rango_critico) }}
              </div>
            </div>

            <!-- Distancia -->
            <div class="col-span-1 text-center">
              <div
                class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm"
              >
                {{ formatDistancia(arma.distancia_min, arma.distancia_max) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de Armaduras -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-2xl font-bold text-blue-700">Armaduras</h3>
        <div class="text-sm text-blue-600">
          Seleccionadas:
          <span class="font-bold">{{ armadurasSeleccionadas.length }}</span>
        </div>
      </div>

      <div
        class="bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden"
      >
        <!-- Header de la tabla de armaduras -->
        <div
          class="bg-blue-600 text-white grid grid-cols-12 gap-3 px-4 py-3 font-semibold text-sm"
        >
          <div class="col-span-1 text-center">Sel.</div>
          <div class="col-span-3">Armadura</div>
          <div class="col-span-2 text-center">Pen.</div>
          <div class="col-span-2 text-center">Lac.</div>
          <div class="col-span-2 text-center">Con.</div>
          <div class="col-span-2">Categoría</div>
        </div>

        <!-- Filas de armaduras -->
        <div class="divide-y divide-blue-200 max-h-96 overflow-y-auto">
          <div
            v-for="armadura in armaduras"
            :key="armadura.id"
            @click="toggleArmadura(armadura.id)"
            :class="[
              'grid grid-cols-12 gap-3 px-4 py-3 items-center cursor-pointer transition-colors',
              armadurasSeleccionadas.includes(armadura.id)
                ? 'bg-blue-200 hover:bg-blue-250'
                : 'bg-white hover:bg-blue-100',
            ]"
          >
            <!-- Checkbox -->
            <div class="col-span-1 flex justify-center">
              <div
                :class="[
                  'w-6 h-6 rounded border-2 flex items-center justify-center transition-colors',
                  armadurasSeleccionadas.includes(armadura.id)
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-white border-blue-300',
                ]"
              >
                <span
                  v-if="armadurasSeleccionadas.includes(armadura.id)"
                  class="text-white text-sm font-bold"
                  >✓</span
                >
              </div>
            </div>

            <!-- Nombre -->
            <div class="col-span-3">
              <div class="font-semibold text-blue-700">
                {{ armadura.nombre }}
              </div>
            </div>

            <!-- Daño Penetrante -->
            <div class="col-span-2 text-center">
              <div
                class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]"
              >
                {{ armadura.penetrante }}
              </div>
            </div>

            <!-- Daño Lacerante -->
            <div class="col-span-2 text-center">
              <div
                class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]"
              >
                {{ armadura.lacerante }}
              </div>
            </div>

            <!-- Daño Contundente -->
            <div class="col-span-2 text-center">
              <div
                class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]"
              >
                {{ armadura.contundente }}
              </div>
            </div>

            <!-- Categoría -->
            <div class="col-span-2">
              <div class="text-sm text-blue-700">
                {{ armadura.categoria }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import armasData from "../../assets/armas.json";
import armadurasData from "../../assets/armaduras.json";
import { useCharacterCreation } from "../../domain/useCharacterCreation";

const armas = ref(armasData.armas);
const armaduras = ref(armadurasData.armaduras);

// Use character creation composable
const { characterData, loadCharacterData } = useCharacterCreation();

// Use characterData's armas and armaduras directly
const armasSeleccionadas = ref<number[]>([]);
const armadurasSeleccionadas = ref<number[]>([]);

// Load character data on mount
onMounted(() => {
  loadCharacterData();
  // Initialize local refs with characterData values
  armasSeleccionadas.value = [...characterData.value.armas];
  armadurasSeleccionadas.value = [...characterData.value.armaduras];
});

// Watch local refs and sync with characterData
watch(
  armasSeleccionadas,
  (newValue) => {
    characterData.value.armas = [...newValue];
  },
  { deep: true },
);

watch(
  armadurasSeleccionadas,
  (newValue) => {
    characterData.value.armaduras = [...newValue];
  },
  { deep: true },
);

function formatRangoCritico(rango: string | null): string {
  if (rango === null) {
    return "24";
  }
  return rango;
}

function formatDistancia(min: number | null, max: number | null): string {
  if (min === null && max === null) {
    return "-";
  }
  if (min !== null && max !== null) {
    return `${min} | ${max}`;
  }
  if (min !== null) {
    return `${min}`;
  }
  if (max !== null) {
    return `${max}`;
  }
  return "-";
}

function toggleArma(armaId: number) {
  const index = armasSeleccionadas.value.indexOf(armaId);
  if (index === -1) {
    armasSeleccionadas.value.push(armaId);
  } else {
    armasSeleccionadas.value.splice(index, 1);
  }
}
function toggleArmadura(armaduraId: number) {
  const index = armadurasSeleccionadas.value.indexOf(armaduraId);
  if (index === -1) {
    armadurasSeleccionadas.value.push(armaduraId);
  } else {
    armadurasSeleccionadas.value.splice(index, 1);
  }
}
</script>
<style scoped>
/* Responsive tablas equipo */
@media (max-width: 900px) {
  .bg-blue-50.border-2 {
    overflow-x: auto !important;
  }
  .grid-cols-12 {
    min-width: 700px !important;
    display: grid;
    grid-template-columns: repeat(12, minmax(60px, 1fr));
  }
  .divide-y > div {
    min-width: 700px !important;
  }
}
@media (max-width: 640px) {
  .bg-blue-50.border-2 {
    overflow-x: auto !important;
    padding: 0 !important;
  }
  .grid-cols-12 {
    min-width: 700px !important;
    font-size: 0.95rem !important;
  }
  .divide-y > div {
    min-width: 700px !important;
    font-size: 0.95rem !important;
  }
  .p-4,
  .px-4,
  .py-3 {
    padding: 0.75rem !important;
  }
  .text-2xl {
    font-size: 1.3rem !important;
  }
}
</style>
