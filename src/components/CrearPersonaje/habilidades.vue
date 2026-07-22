<template>
  <div class="space-y-6">
    <!-- Puntos Disponibles -->
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div class="stat-tile">
        <div class="stat-label">Puntos disponibles</div>
        <div
          :class="[
            'stat-value',
            puntosDisponibles < 0 ? 'text-red-600' : 'text-indigo-600',
          ]"
        >
          {{ puntosDisponibles }}
        </div>
      </div>
      <div class="stat-tile">
        <div class="stat-label">Límite por habilidad</div>
        <div class="stat-value">{{ limiteRangosPorHabilidad }}</div>
      </div>
      <div class="stat-tile">
        <div class="stat-label">Habilidades extras</div>
        <div class="stat-value">
          {{ habilidadesExtrasMarcadas }} / {{ habilidadesExtrasDisponibles }}
        </div>
      </div>
    </div>

    <!-- Tabla de Habilidades Generales -->
    <div class="data-table">
      <h3 class="data-table-title">Habilidades generales</h3>

      <!-- Buscador + filtro por atributo -->
      <div class="flex flex-col gap-2 px-1 pb-3 sm:flex-row">
        <input
          type="text"
          v-model="busquedaHabilidad"
          placeholder="Buscar habilidad..."
          class="input w-full"
        />
        <select
          v-model="filtroAtributo"
          class="input w-full sm:w-48 sm:flex-shrink-0"
        >
          <option value="">Todos los atributos</option>
          <option
            v-for="atributo in ordenAtributosGenerales"
            :key="atributo"
            :value="atributo"
          >
            {{ atributo }}
          </option>
        </select>
        <select
          v-model="filtroCompetencia"
          class="input w-full sm:w-48 sm:flex-shrink-0"
        >
          <option value="">Clase y foráneas</option>
          <option value="clase">Solo de clase</option>
          <option value="foranea">Solo foráneas</option>
        </select>
      </div>

      <div class="tabla-scroll max-h-[500px] overflow-y-auto">
        <div class="data-table-head tabla-grid grid-cols-12">
          <div class="col-span-1 text-center">Activa</div>
          <div class="col-span-3">Habilidad</div>
          <div class="col-span-2 text-center">Mod. Atributo</div>
          <div class="col-span-2 text-center">Rangos</div>
          <div class="col-span-2 text-center">Bonif. Diversos</div>
          <div class="col-span-2 text-center">Total</div>
        </div>

        <!-- Filas de habilidades generales, agrupadas por atributo -->
        <div class="divide-y divide-gray-200">
          <template
            v-for="grupo in gruposHabilidadesGenerales"
            :key="grupo.atributo"
          >
            <div
              v-if="grupo.habilidades.length"
              class="grupo-atributo tabla-grid bg-gray-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-600"
            >
              {{ grupo.atributo }}
            </div>
            <div
              v-for="habilidad in grupo.habilidades"
              :key="habilidad.id"
              class="data-table-row tabla-grid grid-cols-12"
            >
            <!-- Checkbox Activa -->
            <div class="col-span-1 flex justify-center">
              <input
                type="checkbox"
                v-model="habilidad.activa"
                :disabled="
                  esHabilidadBloqueada(habilidad) ||
                  (!habilidad.activa &&
                    habilidadesExtrasMarcadas >= habilidadesExtrasDisponibles)
                "
                @change="guardarDatos"
                :class="[
                  'h-4.5 w-4.5 cursor-pointer rounded border-gray-400 bg-white accent-indigo-500',
                  esHabilidadBloqueada(habilidad)
                    ? 'cursor-not-allowed opacity-70'
                    : 'disabled:cursor-not-allowed disabled:opacity-40',
                ]"
              />
            </div>

            <!-- Nombre de la habilidad -->
            <div class="col-span-3">
              <div class="text-sm font-semibold text-gray-900">
                {{ habilidad.nombre }}
                <span
                  v-if="habilidad.origenTrasfondo"
                  class="ml-1 text-xs font-medium text-purple-600"
                  >(Trasfondo)</span
                >
                <span
                  v-if="habilidad.origenEspecialidad"
                  class="ml-1 text-xs font-medium text-emerald-600"
                  >(Especialidad)</span
                >
              </div>
              <div class="text-xs text-gray-500">
                {{ habilidad.atributo }}
              </div>
            </div>

            <!-- Modificador de Atributo -->
            <div class="col-span-2 text-center">
              <span class="badge badge-muted min-w-12 justify-center">
                {{ habilidad.modAtributo >= 0 ? "+" : ""
                }}{{ habilidad.modAtributo }}
              </span>
            </div>

            <!-- Puntos Rangos (Editable) -->
            <div class="col-span-2 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button
                  @click="modificarRangos(habilidad, -1)"
                  :disabled="habilidad.rangos <= rangosMinimos(habilidad)"
                  class="btn btn-secondary h-7 w-7 !p-0"
                >
                  −
                </button>
                <input
                  type="number"
                  v-model.number="habilidad.rangos"
                  @focus="habilidad.rangosAnteriores = habilidad.rangos"
                  @input="validarRangos(habilidad)"
                  @change="guardarDatos"
                  class="input-number w-14"
                  min="0"
                  :max="limiteRangosPorHabilidad"
                />
                <button
                  @click="modificarRangos(habilidad, 1)"
                  :disabled="
                    puntosDisponibles < (habilidad.activa ? 1 : 2) ||
                    habilidad.rangos >= limiteRangosPorHabilidad
                  "
                  class="btn btn-secondary h-7 w-7 !p-0"
                  title="Coste: {{habilidad.activa ? '1 punto' : '2 puntos'}}"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Bonificadores Diversos (Editable) -->
            <div class="col-span-2 text-center">
              <input
                type="number"
                v-model.number="habilidad.bonifDiversos"
                @change="guardarDatos"
                class="input-number w-16"
              />
            </div>

            <!-- Total -->
            <div class="col-span-2 text-center">
              <span
                class="inline-flex min-w-12 items-center justify-center rounded-lg bg-indigo-100 px-3 py-1.5 text-sm font-bold text-indigo-600"
              >
                {{ calcularTotal(habilidad) >= 0 ? "+" : ""
                }}{{ calcularTotal(habilidad) }}
              </span>
            </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Tabla de Habilidades de Artesanía -->
    <div class="data-table">
      <h3 class="data-table-title">Habilidades de artesanía</h3>
      <div class="tabla-scroll">
        <div class="data-table-head tabla-grid grid-cols-12">
          <div class="col-span-1 text-center">Activa</div>
          <div class="col-span-3">Habilidad</div>
          <div class="col-span-2 text-center">Mod. Atributo</div>
          <div class="col-span-2 text-center">Rangos</div>
          <div class="col-span-2 text-center">Bonif. Diversos</div>
          <div class="col-span-2 text-center">Total</div>
        </div>

        <!-- Filas de habilidades de artesanía -->
        <div class="divide-y divide-gray-200 opacity-60">
          <div
            v-for="habilidad in habilidadesArtesania"
            :key="habilidad.id"
            class="data-table-row tabla-grid grid-cols-12"
          >
            <!-- Checkbox Activa (deshabilitado) -->
            <div class="col-span-1 flex justify-center">
              <input
                type="checkbox"
                :checked="false"
                disabled
                class="h-4.5 w-4.5 cursor-not-allowed rounded border-gray-400 bg-white opacity-50 accent-indigo-500"
              />
            </div>

            <!-- Nombre de la habilidad -->
            <div class="col-span-3">
              <div class="text-sm font-semibold text-gray-900">
                {{ habilidad.nombre }}
              </div>
              <div class="text-xs text-gray-500">
                {{ habilidad.atributo }}
              </div>
            </div>

            <!-- Modificador de Atributo -->
            <div class="col-span-2 text-center">
              <span class="badge badge-muted min-w-12 justify-center">
                {{ habilidad.modAtributo >= 0 ? "+" : ""
                }}{{ habilidad.modAtributo }}
              </span>
            </div>

            <!-- Puntos Rangos (Editable) -->
            <div class="col-span-2 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button
                  @click="modificarRangos(habilidad, -1)"
                  :disabled="habilidad.rangos <= rangosMinimos(habilidad)"
                  class="btn btn-secondary h-7 w-7 !p-0"
                >
                  −
                </button>
                <input
                  type="number"
                  v-model.number="habilidad.rangos"
                  @input="validarRangos(habilidad)"
                  class="input-number w-14"
                  min="0"
                />
                <button
                  @click="modificarRangos(habilidad, 1)"
                  :disabled="puntosDisponibles <= 0"
                  class="btn btn-secondary h-7 w-7 !p-0"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Bonificadores Diversos (Editable) -->
            <div class="col-span-2 text-center">
              <input
                type="number"
                v-model.number="habilidad.bonifDiversos"
                class="input-number w-16"
              />
            </div>

            <!-- Total -->
            <div class="col-span-2 text-center">
              <span
                class="inline-flex min-w-12 items-center justify-center rounded-lg bg-indigo-100 px-3 py-1.5 text-sm font-bold text-indigo-600"
              >
                {{ calcularTotal(habilidad) >= 0 ? "+" : ""
                }}{{ calcularTotal(habilidad) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de Habilidades de Recolección -->
    <div class="data-table">
      <h3 class="data-table-title">Habilidades de recolección</h3>
      <div class="tabla-scroll">
        <div class="data-table-head tabla-grid grid-cols-12">
          <div class="col-span-1 text-center">Comp.</div>
          <div class="col-span-3">Habilidad</div>
          <div class="col-span-2 text-center">Mod. Atributo</div>
          <div class="col-span-2 text-center">Rangos</div>
          <div class="col-span-2 text-center">Bonif. Diversos</div>
          <div class="col-span-2 text-center">Total</div>
        </div>

        <!-- Filas de habilidades de recolección -->
        <div class="divide-y divide-gray-200 opacity-60">
          <div
            v-for="habilidad in habilidadesRecoleccion"
            :key="habilidad.id"
            class="data-table-row tabla-grid grid-cols-12"
          >
            <!-- Checkbox Activa (deshabilitado) -->
            <div class="col-span-1 flex justify-center">
              <input
                type="checkbox"
                :checked="false"
                disabled
                class="h-4.5 w-4.5 cursor-not-allowed rounded border-gray-400 bg-white opacity-50 accent-indigo-500"
              />
            </div>

            <!-- Nombre de la habilidad -->
            <div class="col-span-3">
              <div class="text-sm font-semibold text-gray-900">
                {{ habilidad.nombre }}
              </div>
              <div class="text-xs text-gray-500">
                {{ habilidad.atributo }}
              </div>
            </div>

            <!-- Modificador de Atributo -->
            <div class="col-span-2 text-center">
              <span class="badge badge-muted min-w-12 justify-center">
                {{ habilidad.modAtributo >= 0 ? "+" : ""
                }}{{ habilidad.modAtributo }}
              </span>
            </div>

            <!-- Puntos Rangos (Editable) -->
            <div class="col-span-2 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button
                  @click="modificarRangos(habilidad, -1)"
                  :disabled="habilidad.rangos <= rangosMinimos(habilidad)"
                  class="btn btn-secondary h-7 w-7 !p-0"
                >
                  −
                </button>
                <input
                  type="number"
                  v-model.number="habilidad.rangos"
                  @focus="habilidad.rangosAnteriores = habilidad.rangos"
                  @input="validarRangos(habilidad)"
                  class="input-number w-14"
                  min="0"
                />
                <button
                  @click="modificarRangos(habilidad, 1)"
                  :disabled="
                    puntosDisponibles < 1 ||
                    habilidad.rangos >= limiteRangosPorHabilidad
                  "
                  class="btn btn-secondary h-7 w-7 !p-0"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Bonificadores Diversos (Editable) -->
            <div class="col-span-2 text-center">
              <input
                type="number"
                v-model.number="habilidad.bonifDiversos"
                @change="guardarDatos"
                class="input-number w-16"
              />
            </div>

            <!-- Total -->
            <div class="col-span-2 text-center">
              <span
                class="inline-flex min-w-12 items-center justify-center rounded-lg bg-indigo-100 px-3 py-1.5 text-sm font-bold text-indigo-600"
              >
                {{ calcularTotal(habilidad) >= 0 ? "+" : ""
                }}{{ calcularTotal(habilidad) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Leyenda -->
    <div class="panel">
      <h4 class="label">Leyenda</h4>
      <div class="space-y-1 text-sm text-gray-600">
        <div>
          <span class="font-semibold text-gray-800">Comp.:</span> Indica si
          tienes competencia en esta habilidad (otorgado por clase/trasfondo)
        </div>
        <div>
          <span class="font-semibold text-gray-800">Mod. Atributo:</span>
          Modificador del atributo asociado a la habilidad
        </div>
        <div>
          <span class="font-semibold text-gray-800">Rangos:</span> Puntos que
          asignas para mejorar esta habilidad
        </div>
        <div>
          <span class="font-semibold text-gray-800">Bonif. Diversos:</span>
          Bonificadores adicionales de objetos, dotes o efectos temporales
        </div>
        <div>
          <span class="font-semibold text-gray-800">Total:</span> Suma de
          todos los modificadores (este es el valor que usarás en tus tiradas)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useCharacterCreation } from "../../domain/useCharacterCreation";
import habilidadesData from "../../assets/habilidades.json";

interface Habilidad {
  id: number;
  nombre: string;
  atributo: string;
  activa: boolean;
  origenTrasfondo: boolean;
  origenEspecialidad: boolean;
  modAtributo: number;
  rangos: number;
  bonifDiversos: number;
  rangosAnteriores?: number; // Para guardar el valor anterior al validar
}

const { characterData, loadCharacterData, saveCharacterData, enSubidaNivel, subidaNivelBase } =
  useCharacterCreation();

// En modo "subir de nivel": rangos y competencias que ya tenía el personaje
// antes de subir. Los rangos no pueden bajar de aquí y una competencia marcada
// no se puede desmarcar.
const baselineHabilidades = computed(() => {
  const map = new Map<number, { rangos: number; activa: boolean }>();
  if (!enSubidaNivel.value || !subidaNivelBase.value?.habilidades) return map;
  try {
    const arr = JSON.parse(subidaNivelBase.value.habilidades);
    for (const h of arr)
      map.set(h.id, { rangos: h.rangos ?? 0, activa: !!h.activa });
  } catch {
    /* base sin habilidades guardadas */
  }
  return map;
});
function rangosMinimos(habilidad: Habilidad): number {
  return baselineHabilidades.value.get(habilidad.id)?.rangos ?? 0;
}
function esActivaBloqueada(habilidad: Habilidad): boolean {
  return (
    enSubidaNivel.value &&
    (baselineHabilidades.value.get(habilidad.id)?.activa ?? false)
  );
}

// Puntos máximos y límite de habilidad desde los atributos del personaje
const puntosMaximos = computed(
  () => characterData.value.atributos?.puntosHabilidad,
);
const limiteRangosPorHabilidad = computed(
  () => characterData.value.atributos?.limiteHabilidad || 5,
);

// Número de habilidades obligatorias (trasfondo + especialidad)
const habilidadesObligatorias = computed(() => {
  const trasfondo = characterData.value.trasfondo_habilidades?.length || 0;
  const especialidad = characterData.value.especialidad_habilidades?.length || 0;
  return trasfondo + especialidad;
});

// Número de habilidades extras que el usuario puede seleccionar manualmente
const habilidadesExtrasDisponibles = computed(() => {
  return characterData.value.atributos?.habilidadesExtra || 0;
});

// Cargar habilidades desde JSON
const habilidades = ref<Habilidad[]>([]);

// Inicializar habilidades
function inicializarHabilidades() {
  const habilidadesCompetentesTrasfondo =
    characterData.value.trasfondo_habilidades || [];
  const habilidadesCompetentesEspecialidad =
    characterData.value.especialidad_habilidades || [];

  console.log("🔄 Inicializando habilidades");
  console.log("  Trasfondo:", habilidadesCompetentesTrasfondo);
  console.log("  Especialidad:", habilidadesCompetentesEspecialidad);

  // Cargar datos guardados si existen
  let habilidadesGuardadas: any[] = [];
  try {
    habilidadesGuardadas = characterData.value.habilidades
      ? JSON.parse(characterData.value.habilidades)
      : [];
  } catch (e) {
    habilidadesGuardadas = [];
  }

  habilidades.value = habilidadesData.habilidades.map((hab) => {
    const esTrasfondo = habilidadesCompetentesTrasfondo.includes(hab.nombre);
    const esEspecialidad = habilidadesCompetentesEspecialidad.includes(hab.nombre);
    const guardada = habilidadesGuardadas.find((h: any) => h.id === hab.id);

    // Si es de trasfondo u especialidad, SIEMPRE debe estar activa
    const debeEstarActiva = esTrasfondo || esEspecialidad;

    // Calcular modAtributo según el atributo de la habilidad
    let modAtributo = 0;
    if (hab.atributo === "Cuerpo") {
      modAtributo = characterData.value.atributos?.cuerpo || 0;
    } else if (hab.atributo === "Agilidad") {
      modAtributo = characterData.value.atributos?.agilidad || 0;
    } else if (
      hab.atributo === "Mente" ||
      hab.atributo === "Artesania" ||
      hab.atributo === "Recoleccion"
    ) {
      modAtributo = characterData.value.atributos?.mente || 0;
    }

    // Determinar si debe estar activa
    let activa: boolean;
    if (debeEstarActiva) {
      // Forzar activa para trasfondo/especialidad
      activa = true;
    } else if (guardada) {
      // Si estaba guardada pero YA NO es de trasfondo/especialidad, verificar si debe permanecer activa
      // Si guardada.origenTrasfondo o guardada.origenEspecialidad era true pero ahora no lo es, desmarcar
      const eraTrasfondoAntes = guardada.origenTrasfondo ?? false;
      const eraEspecialidadAntes = guardada.origenEspecialidad ?? false;

      if ((eraTrasfondoAntes || eraEspecialidadAntes) && !debeEstarActiva) {
        // Ya no es de trasfondo/especialidad, desmarcar
        activa = false;
        console.log(
          `  ✗ ${hab.nombre} desmarcada (ya no es de Trasfondo/Especialidad)`,
        );
      } else {
        // Mantener valor guardado
        activa = guardada.activa ?? false;
      }
    } else {
      activa = false;
    }

    if (esTrasfondo || esEspecialidad) {
      console.log(
        `  ✓ ${hab.nombre} marcada como activa (${esTrasfondo ? "Trasfondo" : "Especialidad"})`,
      );
    }

    return {
      id: hab.id,
      nombre: hab.nombre,
      atributo: hab.atributo,
      activa: activa,
      origenTrasfondo: esTrasfondo,
      origenEspecialidad: esEspecialidad,
      modAtributo: modAtributo,
      rangos: guardada?.rangos ?? 0,
      bonifDiversos: guardada?.bonifDiversos ?? 0,
    };
  });

  // Guardar inmediatamente después de inicializar para reflejar cambios en trasfondo/especialidad/atributos
  guardarDatos();
}

const puntosAsignados = computed(() => {
  return habilidades.value.reduce((total, habilidad) => {
    if (habilidad.rangos > 0) {
      // Para habilidades generales: si está activa cuesta 1 punto, si no está activa cuesta 2 puntos
      // Para habilidades de artesanía/recolección: siempre cuesta 1 punto (no se pueden marcar)
      const esArtesaniaORecoleccion =
        habilidad.atributo === "Artesania" ||
        habilidad.atributo === "Recoleccion";
      const costoPorRango = esArtesaniaORecoleccion
        ? 1
        : habilidad.activa
          ? 1
          : 2;
      return total + habilidad.rangos * costoPorRango;
    }
    return total;
  }, 0);
});

const puntosDisponibles = computed(() => {
  return puntosMaximos.value - puntosAsignados.value;
});

const habilidadesSeleccionadas = computed(() => {
  return habilidades.value.filter((h) => h.activa).length;
});

// Habilidades extras que el usuario ha marcado manualmente (no incluye trasfondo ni especialidad)
const habilidadesExtrasMarcadas = computed(() => {
  return habilidades.value.filter(
    (h) => h.activa && !h.origenTrasfondo && !h.origenEspecialidad,
  ).length;
});

// Texto del buscador de habilidades generales
const busquedaHabilidad = ref("");

// Filtro por atributo ("" = todos)
const filtroAtributo = ref("");

// Filtro por competencia: "" = todas, "clase" = activas, "foranea" = no activas
const filtroCompetencia = ref("");

// Orden de los grupos de atributos en la tabla de habilidades generales
const ordenAtributosGenerales = ["Agilidad", "Cuerpo", "Mente"];

// Habilidades generales agrupadas por atributo (Agilidad, Cuerpo, Mente),
// filtradas por el buscador y el filtro de atributo, y ordenadas
// alfabéticamente dentro de cada grupo
const gruposHabilidadesGenerales = computed(() => {
  const termino = busquedaHabilidad.value.trim().toLowerCase();
  return ordenAtributosGenerales
    .filter((atributo) => !filtroAtributo.value || atributo === filtroAtributo.value)
    .map((atributo) => ({
      atributo,
      habilidades: habilidades.value
        .filter(
          (hab) =>
            hab.atributo === atributo &&
            (!termino || hab.nombre.toLowerCase().includes(termino)) &&
            (filtroCompetencia.value === "" ||
              (filtroCompetencia.value === "clase" && hab.activa) ||
              (filtroCompetencia.value === "foranea" && !hab.activa)),
        )
        .sort((a, b) => a.nombre.localeCompare(b.nombre, "es")),
    }));
});

const habilidadesArtesania = computed(() => {
  return habilidades.value.filter((hab) => hab.atributo === "Artesania");
});

const habilidadesRecoleccion = computed(() => {
  return habilidades.value.filter((hab) => hab.atributo === "Recoleccion");
});

// Verificar si una habilidad está bloqueada (no se puede desmarcar)
function esHabilidadBloqueada(habilidad: Habilidad): boolean {
  return (
    habilidad.origenTrasfondo ||
    habilidad.origenEspecialidad ||
    esActivaBloqueada(habilidad)
  );
}

// Watch para el checkbox de activa
watch(
  () => habilidades.value.map((h) => h.activa),
  () => {
    // Validar que no se exceda el límite de habilidades extras manuales
    const extrasMarcadas = habilidades.value.filter(
      (h) => h.activa && !h.origenTrasfondo && !h.origenEspecialidad,
    ).length;

    if (extrasMarcadas > habilidadesExtrasDisponibles.value) {
      // Desmarcar la última habilidad extra marcada manualmente
      for (let i = habilidades.value.length - 1; i >= 0; i--) {
        const habilidad = habilidades.value[i];
        if (habilidad && habilidad.activa && !esHabilidadBloqueada(habilidad)) {
          habilidad.activa = false;
          break;
        }
      }
    }
  },
  { deep: true },
);

// Marcar como competente las habilidades seleccionadas en especialidad y trasfondo
onMounted(async () => {
  await loadCharacterData();
  inicializarHabilidades();
});

// Debug watch para ver los valores
watch(
  [puntosMaximos, puntosAsignados, puntosDisponibles],
  ([maximos, asignados, disponibles]) => {
    console.log("Puntos Maximos:", maximos);
    console.log("Puntos Asignados:", asignados);
    console.log("Puntos Disponibles:", disponibles);
  },
);

// Actualizar cuando cambien las selecciones de especialidad o trasfondo
watch(
  () => [
    characterData.value.especialidad_habilidades,
    characterData.value.trasfondo_habilidades,
    characterData.value.atributos,
  ],
  () => {
    inicializarHabilidades();
  },
  { deep: true },
);

function calcularTotal(habilidad: Habilidad): number {
  const competenciaBonus =
    habilidad.origenTrasfondo || habilidad.origenEspecialidad ? 2 : 0;
  return (
    habilidad.modAtributo +
    habilidad.rangos +
    habilidad.bonifDiversos +
    competenciaBonus
  );
}

function modificarRangos(habilidad: Habilidad, cantidad: number) {
  const nuevoValor = habilidad.rangos + cantidad;

  // Para habilidades generales: si está activa cuesta 1 punto, si no está activa cuesta 2 puntos
  // Para habilidades de artesanía/recolección: siempre cuesta 1 punto
  const esArtesaniaORecoleccion =
    habilidad.atributo === "Artesania" || habilidad.atributo === "Recoleccion";
  const costoPorRango = esArtesaniaORecoleccion ? 1 : habilidad.activa ? 1 : 2;

  if (nuevoValor >= rangosMinimos(habilidad) && nuevoValor <= limiteRangosPorHabilidad.value) {
    if (cantidad > 0) {
      // Al aumentar, verificar si hay suficientes puntos disponibles
      const costoAumento = costoPorRango;
      if (puntosDisponibles.value >= costoAumento) {
        habilidad.rangos = nuevoValor;
        guardarDatos();
      }
    } else if (cantidad < 0) {
      // Al disminuir, permitir salvo por debajo del mínimo del nivel anterior
      habilidad.rangos = nuevoValor;
      guardarDatos();
    }
  }
}

function validarRangos(habilidad: Habilidad) {
  const minRangos = rangosMinimos(habilidad);
  const valorAnterior = Math.max(habilidad.rangosAnteriores ?? 0, minRangos);
  const nuevoValor = habilidad.rangos;

  // Validar rango básico (no por debajo del mínimo del nivel anterior)
  if (nuevoValor < minRangos) {
    habilidad.rangos = valorAnterior;
    return;
  }
  if (isNaN(nuevoValor)) {
    habilidad.rangos = 0;
    habilidad.rangosAnteriores = 0;
    guardarDatos();
    return;
  }
  if (nuevoValor > limiteRangosPorHabilidad.value) {
    habilidad.rangos = limiteRangosPorHabilidad.value;
  }

  // Calcular el coste de todas las habilidades sin incluir esta
  const esArtesaniaORecoleccion =
    habilidad.atributo === "Artesania" || habilidad.atributo === "Recoleccion";
  const costoPorRango = esArtesaniaORecoleccion ? 1 : habilidad.activa ? 1 : 2;

  // Calcular puntos usados por OTRAS habilidades (sin esta)
  const puntosUsadosPorOtras = habilidades.value.reduce((total, h) => {
    if (h.id === habilidad.id) return total; // Saltar esta habilidad
    if (h.rangos > 0) {
      const esArte = h.atributo === "Artesania" || h.atributo === "Recoleccion";
      const coste = esArte ? 1 : h.activa ? 1 : 2;
      return total + h.rangos * coste;
    }
    return total;
  }, 0);

  // Calcular puntos disponibles para esta habilidad
  const puntosDisponiblesParaEsta = puntosMaximos.value - puntosUsadosPorOtras;

  // Verificar si el nuevo valor cabe en el presupuesto
  const costoNuevo = habilidad.rangos * costoPorRango;

  if (costoNuevo > puntosDisponiblesParaEsta) {
    // No hay suficientes puntos, revertir
    habilidad.rangos = valorAnterior;
    return;
  }

  // Actualizar el valor anterior para el siguiente cambio
  habilidad.rangosAnteriores = habilidad.rangos;
  guardarDatos();
}

async function guardarDatos() {
  // Guardar habilidades en characterData
  const habilidadesParaGuardar = habilidades.value.map((h) => {
    const total = calcularTotal(h);
    return {
      id: h.id,
      nombre: h.nombre,
      activa: h.activa,
      origenTrasfondo: h.origenTrasfondo,
      origenEspecialidad: h.origenEspecialidad,
      rangos: h.rangos,
      bonifDiversos: h.bonifDiversos,
      modAtributo: h.modAtributo,
      total: total,
    };
  });

  console.log(
    "💾 Guardando habilidades. Activas:",
    habilidadesParaGuardar.filter((h) => h.activa).map((h) => h.nombre),
  );
  characterData.value.habilidades = JSON.stringify(habilidadesParaGuardar);
  await saveCharacterData();
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
