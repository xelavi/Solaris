<template>
  <div>
    <label class="label">Selecciona tu trasfondo</label>
    <select v-model="selectedTrasfondo" class="input">
      <option value="">Elige un trasfondo...</option>
      <option
        v-for="t in trasfondosDetallados"
        :key="t.nombre"
        :value="t.nombre"
      >
        {{ t.nombre }}
      </option>
    </select>
  </div>

  <div v-if="trasfondoActual" class="panel space-y-6 p-6">
    <div>
      <h3 class="section-title mb-2">
        {{ trasfondoActual.nombre }}
      </h3>
      <p class="text-sm leading-relaxed text-gray-600">
        {{ trasfondoActual.descripcion }}
      </p>
    </div>

    <div v-if="trasfondoActual.equipoInicial?.length">
      <h4 class="label mb-2">Objetos iniciales y dinero</h4>
      <ul class="list-disc space-y-1 pl-5 text-sm text-gray-600">
        <li v-for="(item, idx) in trasfondoActual.equipoInicial" :key="idx">
          {{ item }}
        </li>
        <li v-if="trasfondoActual.dinero !== undefined">
          {{ trasfondoActual.dinero }} monedas
        </li>
      </ul>
    </div>

    <div>
      <h4 class="label">Bonificaciones de atributos</h4>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="atributoId in trasfondoActual.atributos"
          :key="atributoId"
          class="stat-tile min-w-32 flex-1"
        >
          <div class="text-lg font-bold text-indigo-600">
            {{ getNombreAtributo(atributoId) }}
          </div>
          <div class="stat-label mt-1">Nodo del árbol</div>
        </div>
      </div>

      <!-- Mostrar atributos calculados del personaje -->
      <div v-if="characterData.atributos" class="panel mt-4">
        <h5 class="label">Atributos actuales del personaje</h5>
        <div class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
          <div class="text-gray-600">
            <span class="font-semibold text-gray-800">Cuerpo:</span>
            {{ characterData.atributos.cuerpo }}
          </div>
          <div class="text-gray-600">
            <span class="font-semibold text-gray-800">Agilidad:</span>
            {{ characterData.atributos.agilidad }}
          </div>
          <div class="text-gray-600">
            <span class="font-semibold text-gray-800">Mente:</span>
            {{ characterData.atributos.mente }}
          </div>
          <div class="text-gray-600">
            <span class="font-semibold text-gray-800">HP:</span>
            {{ characterData.atributos.hp }}
          </div>
          <div class="text-gray-600">
            <span class="font-semibold text-gray-800">Puntos Hab:</span>
            {{ characterData.atributos.puntosHabilidad }}
          </div>
          <div class="text-gray-600">
            <span class="font-semibold text-gray-800">Límite Hab:</span>
            {{ characterData.atributos.limiteHabilidad }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="mb-3 flex items-center justify-between">
        <h4 class="label mb-0">Habilidades disponibles (elige 3)</h4>
        <span class="badge badge-muted">
          {{ habilidadesSeleccionadas.length }} / 3
        </span>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <button
          v-for="habilidad in trasfondoActual.habilidades"
          :key="habilidad"
          @click="toggleHabilidad(habilidad)"
          :class="[
            'option-tile',
            habilidadesSeleccionadas.includes(habilidad)
              ? 'option-tile-selected'
              : '',
          ]"
          :disabled="
            !habilidadesSeleccionadas.includes(habilidad) &&
            habilidadesSeleccionadas.length >= 3
          "
        >
          <span class="flex items-center gap-2.5">
            <span
              :class="[
                'option-check',
                habilidadesSeleccionadas.includes(habilidad)
                  ? 'option-check-on'
                  : '',
              ]"
            >
              <span v-if="habilidadesSeleccionadas.includes(habilidad)"
                >✓</span
              >
            </span>
            {{ habilidad }}
          </span>
        </button>
      </div>
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
  return trasfondosDetallados.value.find(
    (t) => t.nombre === selectedTrasfondo.value,
  );
});

// Función para obtener el nombre del atributo a partir del ID del nodo
function getNombreAtributo(nodeId) {
  // Buscar el nodo en arbol.json
  const nodo = arbolData.arbol.nodos.find((n) => n.id === nodeId);
  if (!nodo) return "Desconocido";

  // Dependiendo del shape, buscar en atributos o activas
  if (nodo.shape === "circle") {
    const atributo = atributosData.caracteristicasSecundarias.find(
      (a) => a.id === parseInt(nodo.atributo),
    );
    return atributo ? atributo.nombre : "Desconocido";
  } else {
    const activa = activasData.activas.find(
      (a) => a.id === parseInt(nodo.atributo),
    );
    return activa ? activa.nombre : "Desconocido";
  }
}

const LIMITE = 3;

// Cargar datos al montar el componente
onMounted(async () => {
  await loadCharacterData();
  selectedTrasfondo.value = characterData.value.trasfondo || "";
  habilidadesSeleccionadas.value =
    characterData.value.trasfondo_habilidades || [];
});

// Watcher para guardar el trasfondo seleccionado
watch(selectedTrasfondo, (newValue) => {
  characterData.value.trasfondo = newValue;
});

// Guardar habilidades seleccionadas
watch(
  habilidadesSeleccionadas,
  (newValue) => {
    characterData.value.trasfondo_habilidades = [...newValue];
  },
  { deep: true },
);

// Resetear habilidades cuando cambia el trasfondo
watch(trasfondoActual, (newTrasfondo, oldTrasfondo) => {
  // Solo resetear si realmente cambió el trasfondo (no en el primer load)
  if (oldTrasfondo && newTrasfondo?.nombre !== oldTrasfondo?.nombre) {
    habilidadesSeleccionadas.value = [];
    characterData.value.trasfondo_habilidades = [];
  }
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
<style scoped></style>
