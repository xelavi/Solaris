<template>
  <div class="space-y-8">
    <!-- Tabla de Armas -->
    <div>
      <div class="mb-3 flex items-center justify-between">
        <h3 class="section-title">Armas</h3>
        <span class="badge badge-muted">
          Seleccionadas: {{ armasSeleccionadas.length }}
        </span>
      </div>

      <div class="data-table">
        <div class="tabla-scroll max-h-96 overflow-y-auto">
          <!-- Header de la tabla de armas -->
          <div class="data-table-head tabla-grid grid-cols-12">
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
          <div class="divide-y divide-gray-200">
            <div
              v-for="arma in armas"
              :key="arma.id"
              @click="toggleArma(arma.id)"
              :class="[
                'data-table-row tabla-grid grid-cols-12 cursor-pointer',
                armasSeleccionadas.includes(arma.id)
                  ? 'bg-indigo-50 hover:bg-indigo-100'
                  : '',
              ]"
            >
              <!-- Checkbox -->
              <div class="col-span-1 flex justify-center">
                <div
                  :class="[
                    'option-check',
                    armasSeleccionadas.includes(arma.id)
                      ? 'option-check-on'
                      : '',
                  ]"
                >
                  <span v-if="armasSeleccionadas.includes(arma.id)">✓</span>
                </div>
              </div>

              <!-- Nombre -->
              <div class="col-span-2">
                <div class="text-sm font-semibold text-gray-900">
                  {{ arma.nombre }}
                </div>
              </div>

              <!-- Daño Penetrante -->
              <div class="col-span-1 text-center text-sm text-gray-700">
                {{ arma.penetrante }}
              </div>

              <!-- Daño Lacerante -->
              <div class="col-span-1 text-center text-sm text-gray-700">
                {{ arma.lacerante }}
              </div>

              <!-- Daño Contundente -->
              <div class="col-span-1 text-center text-sm text-gray-700">
                {{ arma.contundente }}
              </div>

              <!-- Categoría -->
              <div class="col-span-3 text-sm text-gray-600">
                {{ arma.categoria }}
              </div>

              <!-- Crítico -->
              <div
                class="col-span-1 text-center text-sm font-semibold text-gray-800"
              >
                {{ arma.critico }}
              </div>

              <!-- Rango Crítico -->
              <div class="col-span-1 text-center text-sm text-gray-700">
                {{ formatRangoCritico(arma.rango_critico) }}
              </div>

              <!-- Distancia -->
              <div class="col-span-1 text-center text-sm text-gray-700">
                {{ formatDistancia(arma.distancia_min, arma.distancia_max) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de Armaduras -->
    <div>
      <div class="mb-3 flex items-center justify-between">
        <h3 class="section-title">Armaduras</h3>
        <span class="badge badge-muted">
          Seleccionadas: {{ armadurasSeleccionadas.length }}
        </span>
      </div>

      <div class="data-table">
        <div class="tabla-scroll max-h-96 overflow-y-auto">
          <!-- Header de la tabla de armaduras -->
          <div class="data-table-head tabla-grid grid-cols-12">
            <div class="col-span-1 text-center">Sel.</div>
            <div class="col-span-3">Armadura</div>
            <div class="col-span-2 text-center">Pen.</div>
            <div class="col-span-2 text-center">Lac.</div>
            <div class="col-span-2 text-center">Con.</div>
            <div class="col-span-2">Categoría</div>
          </div>

          <!-- Filas de armaduras -->
          <div class="divide-y divide-gray-200">
            <div
              v-for="armadura in armaduras"
              :key="armadura.id"
              @click="toggleArmadura(armadura.id)"
              :class="[
                'data-table-row tabla-grid grid-cols-12 cursor-pointer',
                armadurasSeleccionadas.includes(armadura.id)
                  ? 'bg-indigo-50 hover:bg-indigo-100'
                  : '',
              ]"
            >
              <!-- Checkbox -->
              <div class="col-span-1 flex justify-center">
                <div
                  :class="[
                    'option-check',
                    armadurasSeleccionadas.includes(armadura.id)
                      ? 'option-check-on'
                      : '',
                  ]"
                >
                  <span v-if="armadurasSeleccionadas.includes(armadura.id)"
                    >✓</span
                  >
                </div>
              </div>

              <!-- Nombre -->
              <div class="col-span-3">
                <div class="text-sm font-semibold text-gray-900">
                  {{ armadura.nombre }}
                </div>
              </div>

              <!-- Daño Penetrante -->
              <div class="col-span-2 text-center text-sm text-gray-700">
                {{ armadura.penetrante }}
              </div>

              <!-- Daño Lacerante -->
              <div class="col-span-2 text-center text-sm text-gray-700">
                {{ armadura.lacerante }}
              </div>

              <!-- Daño Contundente -->
              <div class="col-span-2 text-center text-sm text-gray-700">
                {{ armadura.contundente }}
              </div>

              <!-- Categoría -->
              <div class="col-span-2 text-sm text-gray-600">
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
onMounted(async () => {
  await loadCharacterData();
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
/* Permitir scroll horizontal de las tablas en pantallas estrechas */
.tabla-scroll {
  overflow-x: auto;
}
.tabla-grid {
  min-width: 760px;
}
</style>
