<template>
  <div>
    <label class="block text-sm font-semibold text-blue-700 mb-2">
      Selecciona tu EstiloMarcial
    </label>
    <select
      v-model="selectedEstiloMarcial"
      class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-blue-900"
    >
      <option value="">Elige un estiloMarcial...</option>
      <option v-for="t in estiloMarcials" :key="t.nombre" :value="t.nombre">
        {{ t.nombre }}
      </option>
    </select>

    <p v-if="selectedEstiloMarcial" style="margin-top: 8px"></p>
  </div>

  <div v-if="estiloMarcialActual && datosCompletosCargados" class="space-y-8">
    <!-- Descripción -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
      <h3 class="text-xl font-bold text-blue-700 mb-3">
        {{ estiloMarcialActual.nombre }}
      </h3>
      <p class="text-blue-600 leading-relaxed">
        {{ estiloMarcialActual.descripcion }}
      </p>
    </div>

    <!-- Habilidades -->

    <!-- Dotes -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-blue-700 mb-4">
        Dotes de Clase (Elige {{ estiloMarcialActual.numDotes }})
      </h4>
      <p class="text-sm text-blue-600 mb-6">
        Seleccionadas: {{ dotesSeleccionadas.length }} /
        {{ estiloMarcialActual.numDotes }}
      </p>

      <!-- Dotes Normales -->
      <div class="space-y-6">
        <div
          v-for="grupo in estiloMarcialActual.gruposDotes"
          :key="grupo.categoria"
          class="space-y-4"
        >
          <h5
            class="text-md font-semibold text-blue-700 uppercase tracking-wide border-b border-blue-300 pb-2"
          >
            {{ grupo.categoria }}
          </h5>

          <div class="space-y-3">
            <div v-for="dote in grupo.dotes" :key="dote.id" class="ml-0">
              <!-- Línea de conexión para requisitos -->
              <div v-if="dote.requiere" class="flex items-start mb-2">
                <div
                  class="w-8 border-l-2 border-blue-300 h-4 border-b-2 rounded-bl-lg mr-2"
                ></div>
                <span class="text-xs text-blue-500 italic"
                  >Requiere: {{ getNombreDote(dote.requiere) }}</span
                >
              </div>

              <button
                @click="toggleDote(dote)"
                :disabled="
                  (!estaDoteSeleccionada(dote.id) &&
                    dotesSeleccionadas.length >=
                      estiloMarcialActual.numDotes) ||
                  !puedeSeleccionarDote(dote)
                "
                :class="[
                  'w-full text-left p-4 rounded-lg transition-all duration-200 border-2',
                  estaDoteSeleccionada(dote.id)
                    ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                    : puedeSeleccionarDote(dote)
                      ? 'bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:shadow-md'
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50',
                  dote.requiere ? 'ml-8' : '',
                ]"
              >
                <div class="flex items-start gap-3">
                  <span
                    :class="[
                      'flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5',
                      estaDoteSeleccionada(dote.id)
                        ? 'bg-white border-white'
                        : 'bg-transparent border-blue-300',
                    ]"
                  >
                    <span
                      v-if="estaDoteSeleccionada(dote.id)"
                      class="text-blue-500 text-xs"
                      >✓</span
                    >
                  </span>
                  <div class="flex-1">
                    <div class="font-semibold mb-1 flex items-center gap-2">
                      {{ dote.nombre }}
                      <span
                        v-if="dote.activaId"
                        class="text-xs px-2 py-0.5 bg-blue-600 text-white rounded-full"
                        >ACTIVA</span
                      >
                    </div>
                    <p
                      :class="[
                        'text-sm',
                        dotesSeleccionadas.includes(dote.id)
                          ? 'text-blue-100'
                          : 'text-blue-600',
                      ]"
                    >
                      {{ dote.descripcion }}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import estiloMarcialData from "../../assets/estiloMarcial/estiloMarcial.json";
import activasData from "../../assets/activas.json";
import { useCharacterCreation } from "../../domain/useCharacterCreation";

const { characterData, loadCharacterData, saveCharacterData } =
  useCharacterCreation();

const selectedEstiloMarcial = ref("");
const dotesSeleccionadas = ref([]);
const datosCompletosCargados = ref(false);
const estaCargandoDatos = ref(true);

// Cargar los datos desde el JSON
const estiloMarcials = estiloMarcialData.estiloMarcial;
const activas = activasData.activas;

// Crear un mapa de activas por ID para búsqueda rápida
const activasMap = computed(() => {
  const map = new Map();
  activas.forEach((activa) => {
    map.set(activa.id.toString(), activa);
  });
  return map;
});

const habilidadesSeleccionadas = ref([]);

// Computed para verificar dotes seleccionadas de manera reactiva
const dotesSeleccionadasSet = computed(() => {
  return new Set(dotesSeleccionadas.value);
});

// Cargar datos al montar el componente
onMounted(async () => {
  estaCargandoDatos.value = true;
  await loadCharacterData();
  selectedEstiloMarcial.value = characterData.value.estilo_marcial || "";
  dotesSeleccionadas.value = [
    ...(characterData.value.estilo_marcial_dotes || []),
  ];

  datosCompletosCargados.value = true;
  console.log("Cargado estilo marcial:", selectedEstiloMarcial.value);
  console.log("Cargado dotes:", dotesSeleccionadas.value);
  // Dar tiempo para que Vue actualice antes de activar los watchers
  await nextTick();
  estaCargandoDatos.value = false;
});

// Watcher para guardar el estilo marcial seleccionado
watch(selectedEstiloMarcial, (newValue, oldValue) => {
  if (estaCargandoDatos.value) return; // No guardar durante la carga inicial

  characterData.value.estilo_marcial = newValue;
  // Resetear dotes solo si cambió de un estilo a otro (no en la carga inicial)
  if (oldValue && oldValue !== newValue) {
    dotesSeleccionadas.value = [];
    characterData.value.estilo_marcial_dotes = [];
  }
  saveCharacterData();
  console.log("Guardado estilo marcial:", newValue);
});

// Watcher para guardar las dotes seleccionadas
watch(
  dotesSeleccionadas,
  (newValue) => {
    if (estaCargandoDatos.value) return; // No guardar durante la carga inicial
    console.log("Dotes seleccionadas cambiaron:", newValue);
    characterData.value.estilo_marcial_dotes = [...newValue];
    saveCharacterData();
    console.log("Guardado dotes:", newValue);
  },
  { deep: true },
);

const estiloMarcialActual = computed(() => {
  const estilo = estiloMarcials.find(
    (t) => t.nombre === selectedEstiloMarcial.value,
  );
  if (!estilo) return null;

  // Procesar las dotes para agruparlas por categoría
  const dotesConCategoria = estilo.dotes.filter((d) => d.categoria);
  const dotesSinCategoria = estilo.dotes.filter((d) => !d.categoria);

  // Agrupar dotes por categoría
  const categorias = new Map();

  dotesConCategoria.forEach((dote) => {
    if (!categorias.has(dote.categoria)) {
      categorias.set(dote.categoria, []);
    }
    categorias.get(dote.categoria).push(dote);
  });

  // Crear grupos de dotes
  const gruposDotes = [];

  // Añadir dotes sin categoría primero
  if (dotesSinCategoria.length > 0) {
    gruposDotes.push({
      categoria: "Dotes Generales",
      dotes: dotesSinCategoria.map((d) => ({
        id: `${estilo.nombre}_${d.id}`,
        nombre: d.nombre,
        descripcion: d.descripcion,
        requiere: d.requisito_dote
          ? `${estilo.nombre}_${d.requisito_dote}`
          : null,
        activaId: d.activa,
      })),
    });
  }

  // Añadir grupos con categoría
  categorias.forEach((dotes, categoria) => {
    gruposDotes.push({
      categoria: categoria,
      dotes: dotes.map((d) => ({
        id: `${estilo.nombre}_${d.id}`,
        nombre: d.nombre,
        descripcion: d.descripcion,
        requiere: d.requisito_dote
          ? `${estilo.nombre}_${d.requisito_dote}`
          : null,
        activaId: d.activa,
      })),
    });
  });

  return {
    nombre: estilo.nombre,
    descripcion: estilo.descripcion,
    numDotes: characterData.value.nivel || 1,
    gruposDotes,
  };
});

const LIMITE = 3;

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

function toggleDote(dote) {
  const idx = dotesSeleccionadas.value.indexOf(dote.id);
  if (idx !== -1) {
    // Quitar y remover dependientes
    dotesSeleccionadas.value.splice(idx, 1);
    removerDotesDependientes(dote);
  } else if (
    dotesSeleccionadas.value.length < estiloMarcialActual.value.numDotes
  ) {
    // Añadir si no superamos el límite
    dotesSeleccionadas.value.push(dote.id);
  }
}

function puedeSeleccionarDote(dote) {
  if (!dote.requiere) {
    return true; // No tiene requisito
  }
  return dotesSeleccionadas.value.includes(dote.requiere);
}

function estaDoteSeleccionada(doteId) {
  return dotesSeleccionadasSet.value.has(doteId);
}

function getNombreDote(doteId) {
  for (const grupo of estiloMarcialActual.value?.gruposDotes || []) {
    for (const dote of grupo.dotes) {
      if (dote.id === doteId) {
        return dote.nombre;
      }
    }
  }
  return doteId; // Fallback al ID si no se encuentra
}

function removerDotesDependientes(dote) {
  estiloMarcialActual.value.gruposDotes.forEach((grupo) => {
    grupo.dotes.forEach((d) => {
      if (d.requiere === dote.id) {
        const idx = dotesSeleccionadas.value.indexOf(d.id);
        if (idx !== -1) {
          dotesSeleccionadas.value.splice(idx, 1);
          removerDotesDependientes(d); // Llamada recursiva
        }
      }
    });
  });
}
</script>
