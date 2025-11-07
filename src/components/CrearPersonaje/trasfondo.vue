<template>
  <div>
    <label class="block text-sm font-semibold text-blue-700 mb-2">
      Selecciona tu Trasfondo
    </label>
    <select
      v-model="selectedTrasfondo"
      class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-blue-900"
    >
      <option value="">Elige un trasfondo...</option>
      <option
        v-for="t in trasfondosDetallados"
        :key="t.nombre"
        :value="t.nombre"
      >
        {{ t.nombre }}
      </option>
    </select>

    <p v-if="selectedTrasfondo" style="margin-top: 8px">
      Seleccionaste: <strong>{{ selectedTrasfondo }}</strong>
    </p>
  </div>

  <div
    v-if="trasfondoActual"
    class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 space-y-6"
  >
    <div>
      <h3 class="text-xl font-bold text-blue-700 mb-3">
        {{ trasfondoActual.nombre }}
      </h3>
      <p class="text-blue-600 leading-relaxed">
        {{ trasfondoActual.descripcion }}
      </p>
    </div>

    <div>
      <h4 class="text-lg font-semibold text-blue-700 mb-3">
        Bonificaciones de Atributos
      </h4>
      <div class="flex gap-3">
        <div
          v-for="atributoId in trasfondoActual.atributos"
          :key="atributoId"
          class="flex-1 bg-white border-2 border-blue-300 rounded-lg p-4 text-center"
        >
          <div class="text-2xl font-bold text-blue-600">
            +3
          </div>
          <div class="text-sm text-blue-700 font-medium">
            {{ getNombreAtributo(atributoId) }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <h4 class="text-lg font-semibold text-blue-700 mb-3">
        Habilidades Disponibles (Elige 3)
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          v-for="habilidad in trasfondoActual.habilidades"
          :key="habilidad"
          @click="toggleHabilidad(habilidad)"
          :class="[
            'text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2',
            habilidadesSeleccionadas.includes(habilidad)
              ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
              : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50',
          ]"
          :disabled="
            !habilidadesSeleccionadas.includes(habilidad) &&
            habilidadesSeleccionadas.length >= 3
          "
        >
          <span class="flex items-center gap-2">
            <span
              :class="[
                'flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0',
                habilidadesSeleccionadas.includes(habilidad)
                  ? 'bg-white border-white'
                  : 'bg-transparent border-blue-300',
              ]"
            >
              <span
                v-if="habilidadesSeleccionadas.includes(habilidad)"
                class="text-blue-500 text-xs"
                >✓</span
              >
            </span>
            {{ habilidad }}
          </span>
        </button>
      </div>
      <p class="text-sm text-blue-600 mt-3">
        Seleccionadas: {{ habilidadesSeleccionadas.length }} / 3
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import trasfondosData from "../../assets/trasfondos/trasfondos.json";
import habilidadesData from "../../assets/habilidades.json";
import arbolData from "../../assets/arbol.json";
import atributosData from "../../assets/atributos.json";
import activasData from "../../assets/activas.json";
import { useCharacterCreation } from "../../domain/useCharacterCreation";

const { characterData, loadCharacterData } = useCharacterCreation();

const selectedTrasfondo = ref("");

// Crear un mapa de ID a nombre de habilidad para búsqueda rápida
const habilidadesMap = computed(() => {
  const map = {};
  habilidadesData.habilidades.forEach((hab) => {
    map[hab.id.toString()] = hab.nombre;
  });
  return map;
});

// Transformar los trasfondos para reemplazar IDs por nombres de habilidades
const trasfondosDetallados = computed(() => {
  return trasfondosData.trasfondos.map((trasfondo) => ({
    ...trasfondo,
    habilidades: trasfondo.habilidades.map((id) => {
      const idLimpio = id.trim();
      return habilidadesMap.value[idLimpio] || `Habilidad ${idLimpio}`;
    }),
  }));
});

const habilidadesSeleccionadas = ref([]);

const trasfondoActual = computed(() => {
  console.log("Trasfondo seleccionado:", selectedTrasfondo.value);
  return trasfondosDetallados.value.find((t) => t.nombre === selectedTrasfondo.value);
});

// Función para obtener el nombre del atributo a partir del ID del nodo
function getNombreAtributo(nodeId) {
  // Buscar el nodo en arbol.json
  const nodo = arbolData.arbol.nodos.find(n => n.id === nodeId);
  if (!nodo) return "Desconocido";
  
  // Dependiendo del shape, buscar en atributos o activas
  if (nodo.shape === "circle") {
    const atributo = atributosData.caracteristicasSecundarias.find(a => a.id === parseInt(nodo.atributo));
    return atributo ? atributo.nombre : "Desconocido";
  } else {
    const activa = activasData.activas.find(a => a.id === parseInt(nodo.atributo));
    return activa ? activa.nombre : "Desconocido";
  }
}

const LIMITE = 3;

// Cargar datos al montar el componente
onMounted(() => {
  loadCharacterData();
  selectedTrasfondo.value = characterData.value.trasfondo || "";
  habilidadesSeleccionadas.value = characterData.value.trasfondo_habilidades || [];
});

// Watcher para guardar el trasfondo seleccionado
watch(selectedTrasfondo, (newValue) => {
  characterData.value.trasfondo = newValue;
});

// Guardar habilidades seleccionadas
watch(habilidadesSeleccionadas, (newValue) => {
  characterData.value.trasfondo_habilidades = [...newValue];
}, { deep: true });

// Resetear habilidades cuando cambia el trasfondo
watch(trasfondoActual, () => {
  habilidadesSeleccionadas.value = [];
});

function toggleHabilidad(habilidad) {
  const idx = habilidadesSeleccionadas.value.indexOf(habilidad);
  if (idx !== -1) {
    // Quitar
    habilidadesSeleccionadas.value.splice(idx, 1);
  } else if (habilidadesSeleccionadas.value.length < LIMITE) {
    // Añadir si no superamos el límite
    habilidadesSeleccionadas.value.push(habilidad);
  }
}
</script>
