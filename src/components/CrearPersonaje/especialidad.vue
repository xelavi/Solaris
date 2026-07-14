<template>
  <div>
    <label class="label">Selecciona tu especialidad</label>
    <select v-model="selectedEspecialidad" class="input" :disabled="enSubidaNivel">
      <option value="">Elige una especialidad...</option>
      <option
        v-for="especialidad in especialidadesDetallados"
        :key="especialidad.id"
        :value="especialidad.nombre"
      >
        {{ especialidad.nombre }}
      </option>
    </select>
  </div>

  <div v-if="especialidadActual && datosCompletosCargados" class="space-y-6">
    <!-- Descripción -->
    <div class="panel p-6">
      <h3 class="section-title mb-2">
        {{ especialidadActual.nombre }}
      </h3>
      <p class="text-sm leading-relaxed text-gray-600">
        {{ especialidadActual.descripcion }}
      </p>
    </div>

    <!-- Equipo inicial -->
    <div v-if="especialidadActual.equipoInicial.length" class="panel p-6">
      <h4 class="label mb-2">Equipo inicial</h4>
      <ul class="list-disc space-y-1 pl-5 text-sm text-gray-600">
        <li v-for="(item, idx) in especialidadActual.equipoInicial" :key="idx">
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- Innatas -->
    <div v-if="especialidadActual.innatas.length" class="panel p-6">
      <h4 class="label mb-4">Innatas</h4>
      <div class="space-y-4">
        <div v-for="(innata, idx) in especialidadActual.innatas" :key="idx">
          <div class="mb-1 font-semibold text-gray-900">
            {{ innata.nombre }}
          </div>
          <p class="text-sm leading-relaxed text-gray-600">
            <DescripcionConEstados :texto="innata.descripcion" />
          </p>
          <template v-for="(bloque, bi) in innata.bloques || []" :key="bi">
            <div v-if="bloque.tipo === 'puntos'" class="mt-2">
              <div v-if="bloque.titulo" class="mb-1 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                {{ bloque.titulo }}
              </div>
              <ul class="list-disc space-y-1 pl-5 text-sm text-gray-600">
                <li v-for="(it, ii) in bloque.items" :key="ii">{{ it }}</li>
              </ul>
            </div>
            <div v-else-if="bloque.tipo === 'tabla'" class="mt-2">
              <div v-if="bloque.titulo" class="mb-1 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                {{ bloque.titulo }}
              </div>
              <div class="overflow-x-auto rounded-lg border border-gray-200">
                <table class="w-full text-left text-sm">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        v-for="(c, ci) in bloque.cabeceras"
                        :key="ci"
                        class="px-3 py-1.5 font-semibold text-gray-700"
                      >
                        {{ c }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="(fila, fi) in bloque.filas" :key="fi">
                      <td
                        v-for="(celda, cdi) in fila"
                        :key="cdi"
                        class="px-3 py-1.5 text-gray-600"
                      >
                        {{ celda }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Arquetipos -->
    <div v-if="especialidadActual.arquetipos.length" class="panel p-6">
      <h4 class="label mb-4">Arquetipos</h4>
      <div class="space-y-4">
        <div v-for="(arquetipo, idx) in especialidadActual.arquetipos" :key="idx">
          <div class="mb-1 font-semibold text-gray-900">
            {{ arquetipo.nombre }}
          </div>
          <p class="text-sm leading-relaxed text-gray-600">
            {{ arquetipo.descripcion }}
          </p>
        </div>
      </div>
    </div>

    <!-- Habilidades -->
    <div class="panel p-6">
      <div class="mb-3 flex items-center justify-between">
        <h4 class="label mb-0">
          Habilidades de clase (elige {{ especialidadActual.numHabilidades }})
        </h4>
        <span class="badge badge-muted">
          {{ habilidadesSeleccionadas.length }} /
          {{ especialidadActual.numHabilidades }}
        </span>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <button
          v-for="habilidad in especialidadActual.habilidadesNombres"
          :key="habilidad"
          @click="toggleHabilidad(habilidad)"
          :class="[
            'option-tile',
            estaHabilidadSeleccionada(habilidad) ? 'option-tile-selected' : '',
          ]"
          :disabled="
            enSubidaNivel ||
            estaHabilidadEnTrasfondo(habilidad) ||
            (!estaHabilidadSeleccionada(habilidad) &&
              habilidadesSeleccionadas.length >= especialidadActual.numHabilidades)
          "
          :title="
            estaHabilidadEnTrasfondo(habilidad)
              ? 'Ya seleccionada en Trasfondo'
              : ''
          "
        >
          <span class="flex items-center gap-2.5">
            <span
              :class="[
                'option-check',
                estaHabilidadSeleccionada(habilidad) ? 'option-check-on' : '',
              ]"
            >
              <span v-if="estaHabilidadSeleccionada(habilidad)">✓</span>
            </span>
            {{ habilidad }}
          </span>
        </button>
      </div>
    </div>

    <!-- Dotes -->
    <div class="panel p-6">
      <div class="mb-4 flex items-center justify-between">
        <h4 class="label mb-0">
          Dotes de clase (1 por nivel · nivel {{ characterData.nivel }})
        </h4>
        <span class="badge badge-muted">
          {{ dotesSeleccionadas.length }} / {{ especialidadActual.numDotes }}
        </span>
      </div>

      <!-- Dotes Normales -->
      <div class="space-y-6">
        <div
          v-for="grupo in especialidadActual.gruposDotes"
          :key="grupo.categoria"
          class="space-y-4"
        >
          <h5
            class="border-b border-gray-200 pb-2 text-xs font-semibold tracking-wider text-gray-600 uppercase"
          >
            {{ grupo.categoria }}
          </h5>

          <div class="space-y-3">
            <div v-for="dote in grupo.dotes" :key="dote.id" class="ml-0">
              <!-- Línea de conexión para requisitos -->
              <div v-if="dote.requiere" class="mb-2 flex items-start">
                <div
                  class="mr-2 h-4 w-8 rounded-bl-lg border-b border-l border-gray-300"
                ></div>
                <span class="text-xs text-gray-500 italic"
                  >Requiere: {{ getNombreDote(dote.requiere) }}</span
                >
              </div>

              <button
                @click="toggleDote(dote)"
                :disabled="
                  esDoteBloqueada(dote.id) ||
                  (!estaDoteSeleccionada(dote.id) &&
                    dotesSeleccionadas.length >= especialidadActual.numDotes) ||
                  !puedeSeleccionarDote(dote)
                "
                :class="[
                  'option-tile p-4',
                  estaDoteSeleccionada(dote.id) ? 'option-tile-selected' : '',
                  dote.requiere ? 'ml-8 w-[calc(100%-2rem)]' : '',
                ]"
              >
                <div class="flex items-start gap-3">
                  <span
                    :class="[
                      'option-check mt-0.5',
                      estaDoteSeleccionada(dote.id) ? 'option-check-on' : '',
                    ]"
                  >
                    <span v-if="estaDoteSeleccionada(dote.id)">✓</span>
                  </span>
                  <div class="flex-1">
                    <div class="mb-1 flex items-center gap-2 font-semibold text-gray-900">
                      {{ dote.nombre }}
                      <span
                        v-if="esDoteBloqueada(dote.id)"
                        class="badge badge-muted"
                        title="Dote de un nivel anterior"
                        >🔒 Bloqueada</span
                      >
                    </div>
                    <p class="text-sm text-gray-600">
                      <DescripcionConEstados :texto="dote.descripcion" />
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
import especialidadesData from "../../assets/especialidades/especialidades.json";
import habilidadesData from "../../assets/habilidades.json";
import { useCharacterCreation } from "../../domain/useCharacterCreation";
import DescripcionConEstados from "../DescripcionConEstados.vue";

const { characterData, loadCharacterData, saveCharacterData, enSubidaNivel, subidaNivelBase } =
  useCharacterCreation();

// En modo "subir de nivel": dotes y habilidades que ya estaban asignadas antes
// de subir. No se pueden quitar; solo se pueden añadir nuevas.
const dotesBloqueadas = computed(
  () => new Set(subidaNivelBase.value?.especialidad_dotes ?? []),
);
function esDoteBloqueada(doteId) {
  return enSubidaNivel.value && dotesBloqueadas.value.has(doteId);
}

const selectedEspecialidad = ref("");
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

// Transformar los especialidades para convertir IDs de habilidades a nombres
const especialidadesDetallados = computed(() => {
  return especialidadesData.especialidades.map((especialidad) => ({
    ...especialidad,
    equipoInicial: especialidad.equipoInicial || [],
    innatas: especialidad.innatas || [],
    arquetipos: especialidad.arquetipos || [],
    habilidadesNombres: especialidad.habilidades.map(
      (id) => habilidadesMap.value[id] || `Habilidad ${id}`,
    ),
    numHabilidades: 3,
    numDotes: characterData.value.nivel || 1, // 1 dote por nivel de personaje
    // Organizar dotes por requisitos (árbol de dependencias)
    gruposDotes: organizarDotesEnGrupos(especialidad.dotes),
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

const especialidadActual = computed(() => {
  return especialidadesDetallados.value.find((o) => o.nombre === selectedEspecialidad.value);
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
  selectedEspecialidad.value = characterData.value.especialidad || "";
  habilidadesSeleccionadas.value = [
    ...(characterData.value.especialidad_habilidades || []),
  ];
  dotesSeleccionadas.value = [...(characterData.value.especialidad_dotes || [])];
  datosCompletosCargados.value = true;
  console.log("Cargado especialidad:", selectedEspecialidad.value);
  console.log("Cargado habilidades:", habilidadesSeleccionadas.value);
  console.log("Cargado dotes:", dotesSeleccionadas.value);
  await nextTick();
  estaCargandoDatos.value = false;
});

// Guardar especialidad seleccionado
watch(selectedEspecialidad, async (newValue, oldValue) => {
  if (estaCargandoDatos.value) return; // No guardar durante la carga inicial

  characterData.value.especialidad = newValue;
  // Resetear habilidades y dotes solo si cambió de un especialidad a otro
  if (oldValue && oldValue !== newValue) {
    habilidadesSeleccionadas.value = [];
    dotesSeleccionadas.value = [];
    characterData.value.especialidad_habilidades = [];
    characterData.value.especialidad_dotes = [];
  }
  await saveCharacterData();
  console.log("Guardado especialidad:", newValue);
});

// Guardar habilidades seleccionadas
watch(
  habilidadesSeleccionadas,
  (newValue) => {
    if (estaCargandoDatos.value) return; // No guardar durante la carga inicial

    characterData.value.especialidad_habilidades = [...newValue];
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

    characterData.value.especialidad_dotes = [...newValue];
    saveCharacterData();
    console.log("Guardado dotes:", newValue);
  },
  { deep: true },
);

function estaHabilidadSeleccionada(habilidad) {
  return habilidadesSeleccionadasSet.value.has(habilidad);
}

function estaHabilidadEnTrasfondo(habilidad) {
  return (characterData.value.trasfondo_habilidades || []).includes(habilidad);
}

function estaDoteSeleccionada(doteId) {
  return dotesSeleccionadasSet.value.has(doteId);
}

function toggleHabilidad(habilidad) {
  const idx = habilidadesSeleccionadas.value.indexOf(habilidad);
  if (idx !== -1) {
    habilidadesSeleccionadas.value.splice(idx, 1);
  } else if (
    especialidadActual.value &&
    habilidadesSeleccionadas.value.length < especialidadActual.value.numHabilidades
  ) {
    habilidadesSeleccionadas.value.push(habilidad);
  }
}

function toggleDote(dote) {
  const idx = dotesSeleccionadas.value.indexOf(dote.id);
  if (idx !== -1) {
    // Al subir de nivel no se pueden quitar dotes que ya estaban asignadas
    if (esDoteBloqueada(dote.id)) return;
    // Quitar la dote y todas sus dependientes
    dotesSeleccionadas.value.splice(idx, 1);
    removerDotesDependientes(dote);
  } else if (
    especialidadActual.value &&
    dotesSeleccionadas.value.length < especialidadActual.value.numDotes
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
  if (!especialidadActual.value) return doteId;

  for (const grupo of especialidadActual.value.gruposDotes) {
    for (const dote of grupo.dotes) {
      if (dote.id === doteId) {
        return dote.nombre;
      }
    }
  }
  return `Dote ${doteId}`;
}

function removerDotesDependientes(dote) {
  if (!especialidadActual.value) return;

  especialidadActual.value.gruposDotes.forEach((grupo) => {
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
