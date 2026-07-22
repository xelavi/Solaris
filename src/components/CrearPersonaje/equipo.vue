<template>
  <div class="space-y-8">
    <!-- Buscador + filtro por etiquetas (armas y armaduras) -->
    <div class="space-y-3">
      <div class="relative">
        <svg
          class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 3.415 9.812l3.636 3.637a.75.75 0 1 0 1.061-1.06l-3.636-3.638A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar armas y armaduras..."
          class="w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-9 text-sm text-gray-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
        />
      </div>
      <div class="flex flex-wrap items-start gap-2">
        <SelectorEtiquetasEquipo
          v-model="etiquetasSeleccionadas"
          :etiquetas="etiquetas"
          class="flex-1"
        />
        <button
          v-if="filtroActivo"
          type="button"
          @click="limpiarFiltros"
          class="mt-2 text-xs font-medium whitespace-nowrap text-indigo-600 hover:text-indigo-800"
        >
          Limpiar filtros
        </button>
      </div>
    </div>

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
            <div class="th-sort col-span-2" @click="ordenar('arma', 'nombre')">
              Arma{{ flecha("arma", "nombre") }}
            </div>
            <div
              class="th-sort col-span-1 text-center"
              @click="ordenar('arma', 'perforante')"
            >
              Pen.{{ flecha("arma", "perforante") }}
            </div>
            <div
              class="th-sort col-span-1 text-center"
              @click="ordenar('arma', 'lacerante')"
            >
              Lac.{{ flecha("arma", "lacerante") }}
            </div>
            <div
              class="th-sort col-span-1 text-center"
              @click="ordenar('arma', 'contundente')"
            >
              Con.{{ flecha("arma", "contundente") }}
            </div>
            <div class="th-sort col-span-3" @click="ordenar('arma', 'categoria')">
              Categoría{{ flecha("arma", "categoria") }}
            </div>
            <div
              class="th-sort col-span-1 text-center"
              @click="ordenar('arma', 'critico')"
            >
              Crítico{{ flecha("arma", "critico") }}
            </div>
            <div
              class="th-sort col-span-1 text-center"
              @click="ordenar('arma', 'rango_critico')"
            >
              Rango Crít.{{ flecha("arma", "rango_critico") }}
            </div>
            <div
              class="th-sort col-span-1 text-center"
              @click="ordenar('arma', 'distancia')"
            >
              Distancia{{ flecha("arma", "distancia") }}
            </div>
          </div>
          <!-- Filas de armas -->
          <div class="divide-y divide-gray-200">
            <div
              v-if="armasOrdenadas.length === 0"
              class="px-4 py-6 text-center text-sm text-gray-400"
            >
              Ninguna arma coincide con la búsqueda.
            </div>
            <div
              v-for="arma in armasOrdenadas"
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

              <!-- Daño Perforante -->
              <div class="col-span-1 text-center text-sm text-gray-700">
                {{ arma.perforante }}
              </div>

              <!-- Daño Lacerante -->
              <div class="col-span-1 text-center text-sm text-gray-700">
                {{ arma.lacerante }}
              </div>

              <!-- Daño Contundente -->
              <div class="col-span-1 text-center text-sm text-gray-700">
                {{ arma.contundente }}
              </div>

              <!-- Etiquetas -->
              <div class="col-span-3 flex flex-wrap gap-1">
                <span
                  v-for="etiqueta in resolverEtiquetas(arma.etiquetas)"
                  :key="etiqueta.id"
                  :class="['etiqueta-chip', clasesEtiquetaEquipo(etiqueta)]"
                >
                  {{ etiqueta.nombre }}
                </span>
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
            <div
              class="th-sort col-span-3"
              @click="ordenar('armadura', 'nombre')"
            >
              Armadura{{ flecha("armadura", "nombre") }}
            </div>
            <div
              class="th-sort col-span-2 text-center"
              @click="ordenar('armadura', 'perforante')"
            >
              Pen.{{ flecha("armadura", "perforante") }}
            </div>
            <div
              class="th-sort col-span-2 text-center"
              @click="ordenar('armadura', 'lacerante')"
            >
              Lac.{{ flecha("armadura", "lacerante") }}
            </div>
            <div
              class="th-sort col-span-2 text-center"
              @click="ordenar('armadura', 'contundente')"
            >
              Con.{{ flecha("armadura", "contundente") }}
            </div>
            <div
              class="th-sort col-span-2"
              @click="ordenar('armadura', 'categoria')"
            >
              Categoría{{ flecha("armadura", "categoria") }}
            </div>
          </div>

          <!-- Filas de armaduras -->
          <div class="divide-y divide-gray-200">
            <div
              v-if="armadurasOrdenadas.length === 0"
              class="px-4 py-6 text-center text-sm text-gray-400"
            >
              Ninguna armadura coincide con la búsqueda.
            </div>
            <div
              v-for="armadura in armadurasOrdenadas"
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

              <!-- Daño Perforante -->
              <div class="col-span-2 text-center text-sm text-gray-700">
                {{ armadura.perforante }}
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
              <div class="col-span-2">
                <span
                  :class="[
                    'etiqueta-chip',
                    clasesEtiquetaEquipo(armadura.categoria),
                  ]"
                >
                  {{ armadura.categoria }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import armasData from "../../assets/armas.json";
import armadurasData from "../../assets/armaduras.json";
import { useCharacterCreation } from "../../domain/useCharacterCreation";
import {
  resolverEtiquetas,
  nombresEtiquetas,
  clasesEtiquetaEquipo,
} from "../../domain/etiquetasEquipo";
import { useEquipoFiltro } from "../../domain/useEquipoFiltro";
import SelectorEtiquetasEquipo from "../SelectorEtiquetasEquipo.vue";
import { armaduraVinculada, armaVinculada } from "../../domain/escudos";

const armas = ref(armasData.armas);
const armaduras = ref(armadurasData.armaduras);

// Búsqueda + filtro por etiquetas, compartido con el editor.
const {
  busqueda,
  etiquetas,
  etiquetasSeleccionadas,
  armasFiltradas,
  armadurasFiltradas,
  limpiarFiltros,
  filtroActivo,
} = useEquipoFiltro(armas, armaduras);

// --- Ordenación por columna (clic en la cabecera) ---
// Cada clic cicla: sin orden -> ascendente -> descendente -> sin orden.

type Tabla = "arma" | "armadura";
type Direccion = "asc" | "desc";
type EstadoOrden = { campo: string | null; dir: Direccion };

type Arma = (typeof armasData.armas)[number];
type Armadura = (typeof armadurasData.armaduras)[number];

const orden = ref<Record<Tabla, EstadoOrden>>({
  arma: { campo: null, dir: "asc" },
  armadura: { campo: null, dir: "asc" },
});

// Valor por el que se ordena cada columna (número o texto).
const accesoArma: Record<string, (a: Arma) => number | string> = {
  nombre: (a) => a.nombre.toLowerCase(),
  perforante: (a) => a.perforante,
  lacerante: (a) => a.lacerante,
  contundente: (a) => a.contundente,
  categoria: (a) => (nombresEtiquetas(a.etiquetas)[0] ?? "").toLowerCase(),
  critico: (a) => parseFloat(String(a.critico).replace(/[^0-9.]/g, "")) || 0,
  rango_critico: (a) => parseInt(formatRangoCritico(a.rango_critico), 10) || 0,
  distancia: (a) => a.distancia_min ?? a.distancia_max ?? 0,
};

const accesoArmadura: Record<string, (a: Armadura) => number | string> = {
  nombre: (a) => a.nombre.toLowerCase(),
  perforante: (a) => a.perforante,
  lacerante: (a) => a.lacerante,
  contundente: (a) => a.contundente,
  categoria: (a) => a.categoria.toLowerCase(),
};

function comparar(a: number | string, b: number | string): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}

function ordenar(tabla: Tabla, campo: string) {
  const estado = orden.value[tabla];
  if (estado.campo !== campo) {
    estado.campo = campo;
    estado.dir = "asc";
  } else if (estado.dir === "asc") {
    estado.dir = "desc";
  } else {
    estado.campo = null; // tercer clic: vuelve al orden original
    estado.dir = "asc";
  }
}

/** Indicador de la cabecera: '▲' asc, '▼' desc, '' sin orden por esa columna. */
function flecha(tabla: Tabla, campo: string): string {
  const estado = orden.value[tabla];
  if (estado.campo !== campo) return "";
  return estado.dir === "asc" ? " ▲" : " ▼";
}

const armasOrdenadas = computed(() => {
  const { campo, dir } = orden.value.arma;
  if (!campo) return armasFiltradas.value;
  const acc = accesoArma[campo];
  if (!acc) return armasFiltradas.value;
  const lista = [...armasFiltradas.value].sort((a, b) =>
    comparar(acc(a), acc(b)),
  );
  return dir === "desc" ? lista.reverse() : lista;
});

const armadurasOrdenadas = computed(() => {
  const { campo, dir } = orden.value.armadura;
  if (!campo) return armadurasFiltradas.value;
  const acc = accesoArmadura[campo];
  if (!acc) return armadurasFiltradas.value;
  const lista = [...armadurasFiltradas.value].sort((a, b) =>
    comparar(acc(a), acc(b)),
  );
  return dir === "desc" ? lista.reverse() : lista;
});

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

function fijarSeleccion(lista: number[], id: number, seleccionado: boolean) {
  const index = lista.indexOf(id);
  if (seleccionado && index === -1) lista.push(id);
  if (!seleccionado && index !== -1) lista.splice(index, 1);
}

function toggleArma(armaId: number) {
  const seleccionar = !armasSeleccionadas.value.includes(armaId);
  fijarSeleccion(armasSeleccionadas.value, armaId, seleccionar);
  // Los escudos son a la vez arma y armadura: mantener ambos apartados en sincronía
  const armaduraId = armaduraVinculada(armaId);
  if (armaduraId !== undefined) {
    fijarSeleccion(armadurasSeleccionadas.value, armaduraId, seleccionar);
  }
}
function toggleArmadura(armaduraId: number) {
  const seleccionar = !armadurasSeleccionadas.value.includes(armaduraId);
  fijarSeleccion(armadurasSeleccionadas.value, armaduraId, seleccionar);
  const armaId = armaVinculada(armaduraId);
  if (armaId !== undefined) {
    fijarSeleccion(armasSeleccionadas.value, armaId, seleccionar);
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
.etiqueta-chip {
  display: inline-flex;
  align-items: center;
  border-width: 1px;
  border-radius: 9999px;
  padding: 0.125rem 0.5rem;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1rem;
  white-space: nowrap;
}
/* Cabeceras ordenables */
.th-sort {
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: color 0.12s;
}
.th-sort:hover {
  color: var(--accent, #4f46e5);
}
</style>
