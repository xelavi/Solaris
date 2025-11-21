<template>
  <div>
    <label class="block text-sm font-semibold text-blue-700 mb-2">
      Selecciona tu Oficio
    </label>
    <select
      v-model="selectedOficio"
      class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-blue-900"
    >
      <option value="">Elige un oficio...</option>
      <option
        v-for="oficio in oficiosDetallados"
        :key="oficio.id"
        :value="oficio.nombre"
      >
        {{ oficio.nombre }}
      </option>
    </select>

    <p v-if="selectedOficio" style="margin-top: 8px"></p>
  </div>

  <div v-if="oficioActual && datosCompletosCargados" class="space-y-8">
    <!-- Descripción -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
      <h3 class="text-xl font-bold text-blue-700 mb-3">
        {{ oficioActual.nombre }}
      </h3>
      <p class="text-blue-600 leading-relaxed">
        {{ oficioActual.descripcion }}
      </p>
    </div>

    <!-- Habilidades -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-blue-700 mb-3">
        Habilidades de Clase (Elige {{ oficioActual.numHabilidades }})
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          v-for="habilidad in oficioActual.habilidadesNombres"
          :key="habilidad"
          @click="toggleHabilidad(habilidad)"
          :class="[
            'text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2',
            estaHabilidadSeleccionada(habilidad)
              ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
              : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50',
          ]"
          :disabled="
            !estaHabilidadSeleccionada(habilidad) &&
            habilidadesSeleccionadas.length >= oficioActual.numHabilidades
          "
        >
          <span class="flex items-center gap-2">
            <span
              :class="[
                'flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0',
                estaHabilidadSeleccionada(habilidad)
                  ? 'bg-white border-white'
                  : 'bg-transparent border-blue-300',
              ]"
            >
              <span
                v-if="estaHabilidadSeleccionada(habilidad)"
                class="text-blue-500 text-xs"
                >✓</span
              >
            </span>
            {{ habilidad }}
          </span>
        </button>
      </div>
      <p class="text-sm text-blue-600 mt-3">
        Seleccionadas: {{ habilidadesSeleccionadas.length }} /
        {{ oficioActual.numHabilidades }}
      </p>
    </div>

    <!-- Dotes -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-blue-700 mb-4">
        Dotes de Clase (1 por nivel - Nivel {{ characterData.nivel }})
      </h4>
      <p class="text-sm text-blue-600 mb-6">
        Seleccionadas: {{ dotesSeleccionadas.length }} /
        {{ oficioActual.numDotes }}
      </p>

      <!-- Dotes Normales -->
      <div class="space-y-6">
        <div
          v-for="grupo in oficioActual.gruposDotes"
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
                    dotesSeleccionadas.length >= oficioActual.numDotes) ||
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
                    <div class="font-semibold mb-1">{{ dote.nombre }}</div>
                    <p
                      :class="[
                        'text-sm',
                        estaDoteSeleccionada(dote.id)
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
import oficiosData from "../../assets/oficios/oficios.json";
import habilidadesData from "../../assets/habilidades.json";
import { useCharacterCreation } from "../../domain/useCharacterCreation";

const { characterData, loadCharacterData, saveCharacterData } =
  useCharacterCreation();

const selectedOficio = ref("");
const dotesSeleccionadas = ref([]);
const habilidadesSeleccionadas = ref([]);
const datosCompletosCargados = ref(false);
const estaCargandoDatos = ref(true);

// Crear un mapa de ID a nombre de habilidad
const habilidadesMap = computed(() => {
  const map = {};
  habilidadesData.habilidades.forEach((hab) => {
    map[hab.id] = hab.nombre;
  });
  return map;
});

// Transformar los oficios para convertir IDs de habilidades a nombres
const oficiosDetallados = computed(() => {
  return oficiosData.oficios.map((oficio) => ({
    ...oficio,
    habilidadesNombres: oficio.habilidades.map(
      (id) => habilidadesMap.value[id] || `Habilidad ${id}`,
    ),
    numHabilidades: oficio.habilidades.length,
    numDotes: characterData.value.nivel || 1, // 1 dote por nivel de personaje
    // Organizar dotes por requisitos (árbol de dependencias)
    gruposDotes: organizarDotesEnGrupos(oficio.dotes),
  }));
});

// Función para organizar las dotes en grupos basándose en requisitos
function organizarDotesEnGrupos(dotes) {
  const grupos = [];
  const dotesBase = dotes.filter(
    (d) => !d.requisito_dote || d.requisito_dote === "",
  );
  const dotesConRequisito = dotes.filter(
    (d) => d.requisito_dote && d.requisito_dote !== "",
  );

  // Crear un grupo principal con todas las dotes
  if (dotes.length > 0) {
    grupos.push({
      categoria: "Dotes de Clase",
      dotes: dotes.map((dote) => ({
        ...dote,
        requiere: dote.requisito_dote ? parseInt(dote.requisito_dote) : null,
      })),
    });
  }

  return grupos;
}

const oficioActual = computed(() => {
  return oficiosDetallados.value.find((o) => o.nombre === selectedOficio.value);
});

// Computed para verificar dotes seleccionadas de manera reactiva
const dotesSeleccionadasSet = computed(() => {
  return new Set(dotesSeleccionadas.value);
});

// Computed para verificar habilidades seleccionadas de manera reactiva
const habilidadesSeleccionadasSet = computed(() => {
  return new Set(habilidadesSeleccionadas.value);
});

// Cargar datos al montar
onMounted(async () => {
  estaCargandoDatos.value = true;
  await loadCharacterData();
  selectedOficio.value = characterData.value.oficio || "";
  habilidadesSeleccionadas.value = [
    ...(characterData.value.oficio_habilidades || []),
  ];
  dotesSeleccionadas.value = [...(characterData.value.oficio_dotes || [])];
  datosCompletosCargados.value = true;
  console.log("Cargado oficio:", selectedOficio.value);
  console.log("Cargado habilidades:", habilidadesSeleccionadas.value);
  console.log("Cargado dotes:", dotesSeleccionadas.value);
  await nextTick();
  estaCargandoDatos.value = false;
});

// Guardar oficio seleccionado
watch(selectedOficio, (newValue, oldValue) => {
  if (estaCargandoDatos.value) return; // No guardar durante la carga inicial

  characterData.value.oficio = newValue;
  // Resetear habilidades y dotes solo si cambió de un oficio a otro
  if (oldValue && oldValue !== newValue) {
    habilidadesSeleccionadas.value = [];
    dotesSeleccionadas.value = [];
    characterData.value.oficio_habilidades = [];
    characterData.value.oficio_dotes = [];
  }
  saveCharacterData();
  console.log("Guardado oficio:", newValue);
});

// Guardar habilidades seleccionadas
watch(
  habilidadesSeleccionadas,
  (newValue) => {
    if (estaCargandoDatos.value) return; // No guardar durante la carga inicial

    characterData.value.oficio_habilidades = [...newValue];
    saveCharacterData();
    console.log("Guardado habilidades:", newValue);
  },
  { deep: true },
);

// Guardar dotes seleccionadas
watch(
  dotesSeleccionadas,
  (newValue) => {
    if (estaCargandoDatos.value) return; // No guardar durante la carga inicial

    characterData.value.oficio_dotes = [...newValue];
    saveCharacterData();
    console.log("Guardado dotes:", newValue);
  },
  { deep: true },
);

function estaHabilidadSeleccionada(habilidad) {
  return habilidadesSeleccionadasSet.value.has(habilidad);
}

function estaDoteSeleccionada(doteId) {
  return dotesSeleccionadasSet.value.has(doteId);
}

function toggleHabilidad(habilidad) {
  const idx = habilidadesSeleccionadas.value.indexOf(habilidad);
  if (idx !== -1) {
    habilidadesSeleccionadas.value.splice(idx, 1);
  } else if (
    oficioActual.value &&
    habilidadesSeleccionadas.value.length < oficioActual.value.numHabilidades
  ) {
    habilidadesSeleccionadas.value.push(habilidad);
  }
}

function toggleDote(dote) {
  const idx = dotesSeleccionadas.value.indexOf(dote.id);
  if (idx !== -1) {
    // Quitar la dote y todas sus dependientes
    dotesSeleccionadas.value.splice(idx, 1);
    removerDotesDependientes(dote);
  } else if (
    oficioActual.value &&
    dotesSeleccionadas.value.length < oficioActual.value.numDotes
  ) {
    dotesSeleccionadas.value.push(dote.id);
  }
}

function puedeSeleccionarDote(dote) {
  if (!dote.requiere) {
    return true;
  }
  return dotesSeleccionadas.value.includes(dote.requiere);
}

function getNombreDote(doteId) {
  if (!oficioActual.value) return doteId;

  for (const grupo of oficioActual.value.gruposDotes) {
    for (const dote of grupo.dotes) {
      if (dote.id === doteId) {
        return dote.nombre;
      }
    }
  }
  return `Dote ${doteId}`;
}

function removerDotesDependientes(dote) {
  if (!oficioActual.value) return;

  oficioActual.value.gruposDotes.forEach((grupo) => {
    grupo.dotes.forEach((d) => {
      if (d.requiere === dote.id) {
        const idx = dotesSeleccionadas.value.indexOf(d.id);
        if (idx !== -1) {
          dotesSeleccionadas.value.splice(idx, 1);
          removerDotesDependientes(d);
        }
      }
    });
  });
}
</script>
