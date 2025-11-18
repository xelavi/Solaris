<template>
      <div class="space-y-6">
        <!-- Puntos Disponibles -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold uppercase tracking-wide opacity-90">Puntos Disponibles</div>
              <div class="text-4xl font-bold mt-1">{{ puntosDisponibles }}</div>
            </div>
            <div class="text-right opacity-90">
              <div class="text-sm">Límite por habilidad</div>
              <div class="text-2xl font-semibold">{{ limiteRangosPorHabilidad }}</div>
            </div>
            <div class="text-right opacity-90">
              <div class="text-sm">Habilidades extras</div>
              <div class="text-2xl font-semibold">{{ habilidadesExtrasMarcadas }} / {{ habilidadesExtrasDisponibles }}</div>
            </div>
          </div>
        </div>

        <!-- Tabla de Habilidades Generales -->
        <div class="bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden">
          <!-- Header de la tabla -->
          <div class="bg-blue-600 text-white px-6 py-3">
            <h3 class="text-xl font-bold">Habilidades Generales</h3>
          </div>
          <div class="bg-blue-600 text-white grid grid-cols-12 gap-4 px-6 py-4 font-semibold text-sm">
            <div class="col-span-1 text-center">Activa</div>
            <div class="col-span-3">Habilidad</div>
            <div class="col-span-2 text-center">Mod. Atributo</div>
            <div class="col-span-2 text-center">Puntos Rangos</div>
            <div class="col-span-2 text-center">Bonif. Diversos</div>
            <div class="col-span-2 text-center">Total</div>
          </div>

          <!-- Filas de habilidades generales -->
          <div class="divide-y divide-blue-200 max-h-200 overflow-y-auto">
            <div 
              v-for="habilidad in habilidadesGenerales" 
              :key="habilidad.id"
              class="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-100 transition-colors"
            >
              <!-- Checkbox Activa -->
              <div class="col-span-1 flex justify-center">
                <input 
                  type="checkbox" 
                  v-model="habilidad.activa"
                  :disabled="esHabilidadBloqueada(habilidad) || (!habilidad.activa && habilidadesExtrasMarcadas >= habilidadesExtrasDisponibles)"
                  @change="guardarDatos"
                  :class="[
                    'w-6 h-6 text-blue-600 rounded border-2 border-blue-300 focus:ring-blue-500 cursor-pointer',
                    esHabilidadBloqueada(habilidad) ? 'opacity-70 cursor-not-allowed' : 'disabled:opacity-50 disabled:cursor-not-allowed'
                  ]"
                />
              </div>

              <!-- Nombre de la habilidad -->
              <div class="col-span-3">
                <div class="font-semibold text-blue-700">
                  {{ habilidad.nombre }}
                  <span v-if="habilidad.origenTrasfondo" class="text-xs text-purple-600 ml-1">(Trasfondo)</span>
                  <span v-if="habilidad.origenOficio" class="text-xs text-green-600 ml-1">(Oficio)</span>
                </div>
                <div class="text-xs text-blue-500">({{ habilidad.atributo }})</div>
              </div>

              <!-- Modificador de Atributo -->
              <div class="col-span-2 text-center">
                <div class="inline-flex items-center justify-center bg-white border-2 border-blue-300 rounded-lg px-4 py-2 font-bold text-blue-700 min-w-[60px]">
                  {{ habilidad.modAtributo >= 0 ? '+' : '' }}{{ habilidad.modAtributo }}
                </div>
              </div>

              <!-- Puntos Rangos (Editable) -->
              <div class="col-span-2 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="modificarRangos(habilidad, -1)"
                    :disabled="habilidad.rangos <= 0"
                    class="w-8 h-8 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    v-model.number="habilidad.rangos"
                    @focus="habilidad.rangosAnteriores = habilidad.rangos"
                    @input="validarRangos(habilidad)"
                    @change="guardarDatos"
                    class="w-16 text-center bg-white border-2 border-blue-300 rounded-lg px-2 py-2 font-bold text-blue-700 focus:outline-none focus:border-blue-500"
                    min="0"
                    :max="limiteRangosPorHabilidad"
                  />
                  <button
                    @click="modificarRangos(habilidad, 1)"
                    :disabled="puntosDisponibles < (habilidad.activa ? 1 : 2) || habilidad.rangos >= limiteRangosPorHabilidad"
                    class="w-8 h-8 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed transition-colors"
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
                  class="w-20 text-center bg-white border-2 border-blue-300 rounded-lg px-2 py-2 font-bold text-blue-700 focus:outline-none focus:border-blue-500"
                />
              </div>

              <!-- Total -->
              <div class="col-span-2 text-center">
                <div class="inline-flex items-center justify-center bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-lg min-w-[60px] shadow-md">
                  {{ calcularTotal(habilidad) >= 0 ? '+' : '' }}{{ calcularTotal(habilidad) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla de Habilidades de Artesanía -->
        <div class="bg-green-50 border-2 border-green-200 rounded-lg overflow-hidden">
          <!-- Header de la tabla -->
          <div class="bg-green-600 text-white px-6 py-3">
            <h3 class="text-xl font-bold">Habilidades de Artesanía</h3>
          </div>
          <div class="bg-green-600 text-white grid grid-cols-12 gap-4 px-6 py-4 font-semibold text-sm">
            <div class="col-span-1 text-center">Activa</div>
            <div class="col-span-3">Habilidad</div>
            <div class="col-span-2 text-center">Mod. Atributo</div>
            <div class="col-span-2 text-center">Puntos Rangos</div>
            <div class="col-span-2 text-center">Bonif. Diversos</div>
            <div class="col-span-2 text-center">Total</div>
          </div>

          <!-- Filas de habilidades de artesanía -->
          <div class="divide-y divide-green-200">
            <div 
              v-for="habilidad in habilidadesArtesania" 
              :key="habilidad.id"
              class="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-green-50 opacity-60"
            >
              <!-- Checkbox Activa (deshabilitado) -->
              <div class="col-span-1 flex justify-center">
                <input 
                  type="checkbox" 
                  :checked="false"
                  disabled
                  class="w-6 h-6 text-green-600 rounded border-2 border-green-300 opacity-50 cursor-not-allowed"
                />
              </div>

              <!-- Nombre de la habilidad -->
              <div class="col-span-3">
                <div class="font-semibold text-green-700">{{ habilidad.nombre }}</div>
                <div class="text-xs text-green-500">({{ habilidad.atributo }})</div>
              </div>

              <!-- Modificador de Atributo -->
              <div class="col-span-2 text-center">
                <div class="inline-flex items-center justify-center bg-white border-2 border-green-300 rounded-lg px-4 py-2 font-bold text-green-700 min-w-[60px]">
                  {{ habilidad.modAtributo >= 0 ? '+' : '' }}{{ habilidad.modAtributo }}
                </div>
              </div>

              <!-- Puntos Rangos (Editable) -->
              <div class="col-span-2 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="modificarRangos(habilidad, -1)"
                    :disabled="habilidad.rangos <= 0"
                    class="w-8 h-8 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:bg-green-200 disabled:cursor-not-allowed transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    v-model.number="habilidad.rangos"
                    @input="validarRangos(habilidad)"
                    class="w-16 text-center bg-white border-2 border-green-300 rounded-lg px-2 py-2 font-bold text-green-700 focus:outline-none focus:border-green-500"
                    min="0"
                  />
                  <button
                    @click="modificarRangos(habilidad, 1)"
                    :disabled="puntosDisponibles <= 0"
                    class="w-8 h-8 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:bg-green-200 disabled:cursor-not-allowed transition-colors"
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
                  class="w-20 text-center bg-white border-2 border-green-300 rounded-lg px-2 py-2 font-bold text-green-700 focus:outline-none focus:border-green-500"
                />
              </div>

              <!-- Total -->
              <div class="col-span-2 text-center">
                <div class="inline-flex items-center justify-center bg-green-600 text-white rounded-lg px-4 py-2 font-bold text-lg min-w-[60px] shadow-md">
                  {{ calcularTotal(habilidad) >= 0 ? '+' : '' }}{{ calcularTotal(habilidad) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla de Habilidades de Recolección -->
        <div class="bg-amber-50 border-2 border-amber-200 rounded-lg overflow-hidden">
          <!-- Header de la tabla -->
          <div class="bg-amber-600 text-white px-6 py-3">
            <h3 class="text-xl font-bold">Habilidades de Recolección</h3>
          </div>
          <div class="bg-amber-600 text-white grid grid-cols-12 gap-4 px-6 py-4 font-semibold text-sm">
            <div class="col-span-1 text-center">Comp.</div>
            <div class="col-span-3">Habilidad</div>
            <div class="col-span-2 text-center">Mod. Atributo</div>
            <div class="col-span-2 text-center">Puntos Rangos</div>
            <div class="col-span-2 text-center">Bonif. Diversos</div>
            <div class="col-span-2 text-center">Total</div>
          </div>

          <!-- Filas de habilidades de recolección -->
          <div class="divide-y divide-amber-200">
            <div 
              v-for="habilidad in habilidadesRecoleccion" 
              :key="habilidad.id"
              class="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-amber-50 opacity-60"
            >
              <!-- Checkbox Activa (deshabilitado) -->
              <div class="col-span-1 flex justify-center">
                <input 
                  type="checkbox" 
                  :checked="false"
                  disabled
                  class="w-6 h-6 text-amber-600 rounded border-2 border-amber-300 opacity-50 cursor-not-allowed"
                />
              </div>

              <!-- Nombre de la habilidad -->
              <div class="col-span-3">
                <div class="font-semibold text-amber-700">{{ habilidad.nombre }}</div>
                <div class="text-xs text-amber-500">({{ habilidad.atributo }})</div>
              </div>

              <!-- Modificador de Atributo -->
              <div class="col-span-2 text-center">
                <div class="inline-flex items-center justify-center bg-white border-2 border-amber-300 rounded-lg px-4 py-2 font-bold text-amber-700 min-w-[60px]">
                  {{ habilidad.modAtributo >= 0 ? '+' : '' }}{{ habilidad.modAtributo }}
                </div>
              </div>

              <!-- Puntos Rangos (Editable) -->
              <div class="col-span-2 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="modificarRangos(habilidad, -1)"
                    :disabled="habilidad.rangos <= 0"
                    class="w-8 h-8 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:bg-amber-200 disabled:cursor-not-allowed transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    v-model.number="habilidad.rangos"
                    @focus="habilidad.rangosAnteriores = habilidad.rangos"
                    @input="validarRangos(habilidad)"
                    class="w-16 text-center bg-white border-2 border-amber-300 rounded-lg px-2 py-2 font-bold text-amber-700 focus:outline-none focus:border-amber-500"
                    min="0"
                  />
                  <button
                    @click="modificarRangos(habilidad, 1)"
                    :disabled="puntosDisponibles < 1 || habilidad.rangos >= limiteRangosPorHabilidad"
                    class="w-8 h-8 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:bg-amber-200 disabled:cursor-not-allowed transition-colors"
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
                  class="w-20 text-center bg-white border-2 border-amber-300 rounded-lg px-2 py-2 font-bold text-amber-700 focus:outline-none focus:border-amber-500"
                />
              </div>

              <!-- Total -->
              <div class="col-span-2 text-center">
                <div class="inline-flex items-center justify-center bg-amber-600 text-white rounded-lg px-4 py-2 font-bold text-lg min-w-[60px] shadow-md">
                  {{ calcularTotal(habilidad) >= 0 ? '+' : '' }}{{ calcularTotal(habilidad) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Leyenda -->
        <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h4 class="font-semibold text-blue-700 mb-2">Leyenda:</h4>
          <div class="text-sm text-blue-600 space-y-1">
            <div><span class="font-semibold">Comp.:</span> Indica si tienes competencia en esta habilidad (otorgado por clase/trasfondo)</div>
            <div><span class="font-semibold">Mod. Atributo:</span> Modificador del atributo asociado a la habilidad</div>
            <div><span class="font-semibold">Puntos Rangos:</span> Puntos que asignas para mejorar esta habilidad</div>
            <div><span class="font-semibold">Bonif. Diversos:</span> Bonificadores adicionales de objetos, dotes o efectos temporales</div>
            <div><span class="font-semibold">Total:</span> Suma de todos los modificadores (este es el valor que usarás en tus tiradas)</div>
          </div>
        </div>
        </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useCharacterCreation } from '../../domain/useCharacterCreation';
import habilidadesData from '../../assets/habilidades.json';

interface Habilidad {
  id: number;
  nombre: string;
  atributo: string;
  activa: boolean;
  origenTrasfondo: boolean;
  origenOficio: boolean;
  modAtributo: number;
  rangos: number;
  bonifDiversos: number;
  rangosAnteriores?: number; // Para guardar el valor anterior al validar
}

const { characterData, loadCharacterData, saveCharacterData } = useCharacterCreation();

// Puntos máximos y límite de habilidad desde los atributos del personaje
const puntosMaximos = computed(() => characterData.value.atributos?.puntosHabilidad);
const limiteRangosPorHabilidad = computed(() => characterData.value.atributos?.limiteHabilidad || 5);

// Número de habilidades obligatorias (trasfondo + oficio)
const habilidadesObligatorias = computed(() => {
  const trasfondo = characterData.value.trasfondo_habilidades?.length || 0;
  const oficio = characterData.value.oficio_habilidades?.length || 0;
  return trasfondo + oficio;
});

// Número de habilidades extras que el usuario puede seleccionar manualmente
const habilidadesExtrasDisponibles = computed(() => {
  return characterData.value.atributos?.habilidadesExtra || 0;
});

// Cargar habilidades desde JSON
const habilidades = ref<Habilidad[]>([]);

// Inicializar habilidades
function inicializarHabilidades() {
  const habilidadesCompetentesTrasfondo = characterData.value.trasfondo_habilidades || [];
  const habilidadesCompetentesOficio = characterData.value.oficio_habilidades || [];
  
  console.log('🔄 Inicializando habilidades');
  console.log('  Trasfondo:', habilidadesCompetentesTrasfondo);
  console.log('  Oficio:', habilidadesCompetentesOficio);
  
  // Cargar datos guardados si existen
  let habilidadesGuardadas: any[] = [];
  try {
    habilidadesGuardadas = characterData.value.habilidades ? JSON.parse(characterData.value.habilidades) : [];
  } catch (e) {
    habilidadesGuardadas = [];
  }

  habilidades.value = habilidadesData.habilidades.map(hab => {
    const esTrasfondo = habilidadesCompetentesTrasfondo.includes(hab.nombre);
    const esOficio = habilidadesCompetentesOficio.includes(hab.nombre);
    const guardada = habilidadesGuardadas.find((h: any) => h.id === hab.id);
    
    // Si es de trasfondo u oficio, SIEMPRE debe estar activa
    const debeEstarActiva = esTrasfondo || esOficio;
    
    // Calcular modAtributo según el atributo de la habilidad
    let modAtributo = 0;
    if (hab.atributo === 'Cuerpo') {
      modAtributo = characterData.value.atributos?.cuerpo || 0;
    } else if (hab.atributo === 'Agilidad') {
      modAtributo = characterData.value.atributos?.agilidad || 0;
    } else if (hab.atributo === 'Mente' || hab.atributo === 'Artesania' || hab.atributo === 'Recoleccion') {
      modAtributo = characterData.value.atributos?.mente || 0;
    }
    
    // Determinar si debe estar activa
    let activa: boolean;
    if (debeEstarActiva) {
      // Forzar activa para trasfondo/oficio
      activa = true;
    } else if (guardada) {
      // Si estaba guardada pero YA NO es de trasfondo/oficio, verificar si debe permanecer activa
      // Si guardada.origenTrasfondo o guardada.origenOficio era true pero ahora no lo es, desmarcar
      const eraTrasfondoAntes = guardada.origenTrasfondo ?? false;
      const eraOficioAntes = guardada.origenOficio ?? false;
      
      if ((eraTrasfondoAntes || eraOficioAntes) && !debeEstarActiva) {
        // Ya no es de trasfondo/oficio, desmarcar
        activa = false;
        console.log(`  ✗ ${hab.nombre} desmarcada (ya no es de Trasfondo/Oficio)`);
      } else {
        // Mantener valor guardado
        activa = guardada.activa ?? false;
      }
    } else {
      activa = false;
    }
    
    if (esTrasfondo || esOficio) {
      console.log(`  ✓ ${hab.nombre} marcada como activa (${esTrasfondo ? 'Trasfondo' : 'Oficio'})`);
    }
    
    return {
      id: hab.id,
      nombre: hab.nombre,
      atributo: hab.atributo,
      activa: activa,
      origenTrasfondo: esTrasfondo,
      origenOficio: esOficio,
      modAtributo: modAtributo,
      rangos: guardada?.rangos ?? 0,
      bonifDiversos: guardada?.bonifDiversos ?? 0
    };
  });
  
  // Guardar inmediatamente después de inicializar para reflejar cambios en trasfondo/oficio/atributos
  guardarDatos();
}

const puntosAsignados = computed(() => {
  return habilidades.value.reduce((total, habilidad) => {
    if (habilidad.rangos > 0) {
      // Para habilidades generales: si está activa cuesta 1 punto, si no está activa cuesta 2 puntos
      // Para habilidades de artesanía/recolección: siempre cuesta 1 punto (no se pueden marcar)
      const esArtesaniaORecoleccion = habilidad.atributo === 'Artesania' || habilidad.atributo === 'Recoleccion';
      const costoPorRango = esArtesaniaORecoleccion ? 1 : (habilidad.activa ? 1 : 2);
      return total + (habilidad.rangos * costoPorRango);
    }
    return total;
  }, 0);
});

const puntosDisponibles = computed(() => {
  return puntosMaximos.value - puntosAsignados.value;
});

const habilidadesSeleccionadas = computed(() => {
  return habilidades.value.filter(h => h.activa).length;
});

// Habilidades extras que el usuario ha marcado manualmente (no incluye trasfondo ni oficio)
const habilidadesExtrasMarcadas = computed(() => {
  return habilidades.value.filter(h => h.activa && !h.origenTrasfondo && !h.origenOficio).length;
});

// Filtrar habilidades por categoría
const habilidadesGenerales = computed(() => {
  return habilidades.value.filter(hab => hab.atributo !== 'Artesania' && hab.atributo !== 'Recoleccion');
});

const habilidadesArtesania = computed(() => {
  return habilidades.value.filter(hab => hab.atributo === 'Artesania');
});

const habilidadesRecoleccion = computed(() => {
  return habilidades.value.filter(hab => hab.atributo === 'Recoleccion');
});

// Verificar si una habilidad está bloqueada (no se puede desmarcar)
function esHabilidadBloqueada(habilidad: Habilidad): boolean {
  return habilidad.origenTrasfondo || habilidad.origenOficio;
}

// Watch para el checkbox de activa
watch(() => habilidades.value.map(h => h.activa), () => {
  // Validar que no se exceda el límite de habilidades extras manuales
  const extrasMarcadas = habilidades.value.filter(h => h.activa && !h.origenTrasfondo && !h.origenOficio).length;
  
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
}, { deep: true });

// Marcar como competente las habilidades seleccionadas en oficio y trasfondo
onMounted(() => {
  loadCharacterData();
  inicializarHabilidades();
});

// Debug watch para ver los valores
watch([puntosMaximos, puntosAsignados, puntosDisponibles], ([maximos, asignados, disponibles]) => {
  console.log('Puntos Maximos:', maximos);
  console.log('Puntos Asignados:', asignados);
  console.log('Puntos Disponibles:', disponibles);
});

// Actualizar cuando cambien las selecciones de oficio o trasfondo
watch(() => [characterData.value.oficio_habilidades, characterData.value.trasfondo_habilidades, characterData.value.atributos], () => {
  inicializarHabilidades();
}, { deep: true });

function calcularTotal(habilidad: Habilidad): number {
  const competenciaBonus = (habilidad.origenTrasfondo || habilidad.origenOficio) ? 2 : 0;
  return habilidad.modAtributo + habilidad.rangos + habilidad.bonifDiversos + competenciaBonus;
}

function modificarRangos(habilidad: Habilidad, cantidad: number) {
  const nuevoValor = habilidad.rangos + cantidad;
  
  // Para habilidades generales: si está activa cuesta 1 punto, si no está activa cuesta 2 puntos
  // Para habilidades de artesanía/recolección: siempre cuesta 1 punto
  const esArtesaniaORecoleccion = habilidad.atributo === 'Artesania' || habilidad.atributo === 'Recoleccion';
  const costoPorRango = esArtesaniaORecoleccion ? 1 : (habilidad.activa ? 1 : 2);
  
  if (nuevoValor >= 0 && nuevoValor <= limiteRangosPorHabilidad.value) {
    if (cantidad > 0) {
      // Al aumentar, verificar si hay suficientes puntos disponibles
      const costoAumento = costoPorRango;
      if (puntosDisponibles.value >= costoAumento) {
        habilidad.rangos = nuevoValor;
        guardarDatos();
      }
    } else if (cantidad < 0) {
      // Al disminuir, siempre permitir
      habilidad.rangos = nuevoValor;
      guardarDatos();
    }
  }
}

function validarRangos(habilidad: Habilidad) {
  const valorAnterior = habilidad.rangosAnteriores ?? 0;
  const nuevoValor = habilidad.rangos;
  
  // Validar rango básico
  if (nuevoValor < 0) {
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
  const esArtesaniaORecoleccion = habilidad.atributo === 'Artesania' || habilidad.atributo === 'Recoleccion';
  const costoPorRango = esArtesaniaORecoleccion ? 1 : (habilidad.activa ? 1 : 2);
  
  // Calcular puntos usados por OTRAS habilidades (sin esta)
  const puntosUsadosPorOtras = habilidades.value.reduce((total, h) => {
    if (h.id === habilidad.id) return total; // Saltar esta habilidad
    if (h.rangos > 0) {
      const esArte = h.atributo === 'Artesania' || h.atributo === 'Recoleccion';
      const coste = esArte ? 1 : (h.activa ? 1 : 2);
      return total + (h.rangos * coste);
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

function guardarDatos() {
  // Guardar habilidades en characterData
  const habilidadesParaGuardar = habilidades.value.map(h => {
    const total = calcularTotal(h);
    return {
      id: h.id,
      nombre: h.nombre,
      activa: h.activa,
      origenTrasfondo: h.origenTrasfondo,
      origenOficio: h.origenOficio,
      rangos: h.rangos,
      bonifDiversos: h.bonifDiversos,
      modAtributo: h.modAtributo,
      total: total
    };
  });
  
  console.log('💾 Guardando habilidades. Activas:', habilidadesParaGuardar.filter(h => h.activa).map(h => h.nombre));
  characterData.value.habilidades = JSON.stringify(habilidadesParaGuardar);
  saveCharacterData();
}

 </script>
<style scoped>
/* Responsive tablas habilidades */
.max-h-200 {
  max-height: 400px;
}
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
  .p-6 {
    padding: 0.75rem !important;
  }
  .text-4xl {
    font-size: 2rem !important;
  }
}
</style>