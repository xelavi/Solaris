<template>
  <div>
    <label class="label">Selecciona tu estilo marcial</label>
    <select v-model="selectedEstiloMarcial" class="input" :disabled="enSubidaNivel">
      <option value="">Elige un estilo marcial...</option>
      <option v-for="t in estiloMarcials" :key="t.nombre" :value="t.nombre">
        {{ t.nombre }}
      </option>
    </select>
  </div>

  <div v-if="estiloMarcialActual && datosCompletosCargados" class="space-y-6">
    <!-- Descripción -->
    <div class="panel p-6">
      <h3 class="section-title mb-2">
        {{ estiloMarcialActual.nombre }}
      </h3>
      <p class="text-sm leading-relaxed text-gray-600">
        {{ estiloMarcialActual.descripcion }}
      </p>
    </div>

    <!-- Equipo inicial y Competencias -->
    <div
      v-if="
        estiloMarcialActual.equipoInicial.length ||
        estiloMarcialActual.competencias
      "
      class="panel p-6"
    >
      <div v-if="estiloMarcialActual.equipoInicial.length" class="mb-4">
        <h4 class="label mb-2">Equipo inicial</h4>
        <ul class="list-disc space-y-1 pl-5 text-sm text-gray-600">
          <li v-for="(item, idx) in estiloMarcialActual.equipoInicial" :key="idx">
            {{ item }}
          </li>
        </ul>
      </div>
      <div v-if="estiloMarcialActual.competencias">
        <h4 class="label mb-2">Competencias con armas y armaduras</h4>
        <p class="text-sm leading-relaxed text-gray-600">
          {{ estiloMarcialActual.competencias }}
        </p>
      </div>
    </div>

    <!-- Innatas -->
    <div v-if="estiloMarcialActual.innatas.length" class="panel p-6">
      <h4 class="label mb-4">Innatas</h4>
      <div class="space-y-4">
        <div v-for="(innata, idx) in estiloMarcialActual.innatas" :key="idx">
          <div class="mb-1 font-semibold text-gray-900">
            {{ innata.nombre }}
          </div>
          <p class="text-sm leading-relaxed text-gray-600">
            {{ innata.descripcion }}
          </p>
        </div>
      </div>
    </div>

    <!-- Dotes -->
    <div class="panel p-6">
      <div class="mb-4 flex items-center justify-between">
        <h4 class="label mb-0">
          Dotes de clase (elige {{ estiloMarcialActual.numDotes }})
        </h4>
        <span class="badge badge-muted">
          {{ dotesSeleccionadas.length }} / {{ estiloMarcialActual.numDotes }}
        </span>
      </div>

      <!-- Dotes Normales -->
      <div class="space-y-6">
        <div
          v-for="grupo in estiloMarcialActual.gruposDotes"
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
                    dotesSeleccionadas.length >=
                      estiloMarcialActual.numDotes) ||
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
                    <div
                      class="mb-1 flex items-center gap-2 font-semibold text-gray-900"
                    >
                      {{ dote.nombre }}
                      <span
                        v-if="esDoteBloqueada(dote.id)"
                        class="badge badge-muted"
                        title="Dote de un nivel anterior"
                        >🔒 Bloqueada</span
                      >
                      <span
                        v-if="dote.tipoEjecucion"
                        :class="[
                          'badge',
                          dote.tipoEjecucion === 'accion'
                            ? 'badge-accent'
                            : 'badge-muted',
                        ]"
                        >{{
                          dote.tipoEjecucion === "accion" ? "Acción" : "Pasiva"
                        }}</span
                      >
                      <span
                        v-if="
                          dote.tipoEjecucion === 'accion' && dote.tipoAccion
                        "
                        class="badge badge-muted"
                        >{{
                          dote.tipoAccion === "fisica" ? "Física" : "Mental"
                        }}</span
                      >
                    </div>
                    <p class="text-sm text-gray-600">
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

const { characterData, loadCharacterData, saveCharacterData, enSubidaNivel, subidaNivelBase } =
  useCharacterCreation();

// En modo "subir de nivel": dotes que ya estaban asignadas antes de subir.
// No se pueden quitar; solo se pueden añadir nuevas.
const dotesBloqueadas = computed(
  () => new Set(subidaNivelBase.value?.estilo_marcial_dotes ?? []),
);
function esDoteBloqueada(doteId) {
  return enSubidaNivel.value && dotesBloqueadas.value.has(doteId);
}

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
  void saveCharacterData();
  console.log("Guardado estilo marcial:", newValue);
});

// Watcher para guardar las dotes seleccionadas
watch(
  dotesSeleccionadas,
  (newValue) => {
    if (estaCargandoDatos.value) return; // No guardar durante la carga inicial
    console.log("Dotes seleccionadas cambiaron:", newValue);
    characterData.value.estilo_marcial_dotes = [...newValue];
    void saveCharacterData();
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
        tipoEjecucion: d.tipoEjecucion,
        tipoAccion: d.tipoAccion,
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
        tipoEjecucion: d.tipoEjecucion,
        tipoAccion: d.tipoAccion,
      })),
    });
  });

  return {
    nombre: estilo.nombre,
    descripcion: estilo.descripcion,
    equipoInicial: estilo.equipoInicial || [],
    competencias: estilo.competencias || "",
    innatas: estilo.innatas || [],
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
    // Al subir de nivel no se pueden quitar dotes que ya estaban asignadas
    if (esDoteBloqueada(dote.id)) return;
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
