<template>
 <h2 class="text-3xl font-bold text-blue-600 mb-6 pb-4 border-b border-blue-200">
        Habilidades
      </h2>
      
      <div class="space-y-6">
        <!-- Puntos Disponibles -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold uppercase tracking-wide opacity-90">Puntos Disponibles</div>
              <div class="text-4xl font-bold mt-1">{{ puntosDisponibles }}</div>
            </div>
            <div class="text-right opacity-90">
              <div class="text-sm">Total asignado</div>
              <div class="text-2xl font-semibold">{{ puntosAsignados }} / {{ puntosMaximos }}</div>
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
            <div class="col-span-1 text-center">Comp.</div>
            <div class="col-span-3">Habilidad</div>
            <div class="col-span-2 text-center">Mod. Atributo</div>
            <div class="col-span-2 text-center">Puntos Rangos</div>
            <div class="col-span-2 text-center">Bonif. Diversos</div>
            <div class="col-span-2 text-center">Total</div>
          </div>

          <!-- Filas de habilidades generales -->
          <div class="divide-y divide-blue-200">
            <div 
              v-for="habilidad in habilidadesGenerales" 
              :key="habilidad.id"
              class="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-100 transition-colors"
            >
              <!-- Checkbox Competencia -->
              <div class="col-span-1 flex justify-center">
                <div :class="[
                  'w-6 h-6 rounded border-2 flex items-center justify-center',
                  habilidad.competente 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'bg-white border-blue-300'
                ]">
                  <span v-if="habilidad.competente" class="text-white text-sm font-bold">✓</span>
                </div>
              </div>

              <!-- Nombre de la habilidad -->
              <div class="col-span-3">
                <div class="font-semibold text-blue-700">{{ habilidad.nombre }}</div>
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
                    @input="validarRangos(habilidad)"
                    class="w-16 text-center bg-white border-2 border-blue-300 rounded-lg px-2 py-2 font-bold text-blue-700 focus:outline-none focus:border-blue-500"
                    min="0"
                  />
                  <button
                    @click="modificarRangos(habilidad, 1)"
                    :disabled="puntosDisponibles <= 0"
                    class="w-8 h-8 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed transition-colors"
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
            <div class="col-span-1 text-center">Comp.</div>
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
              class="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-green-100 transition-colors"
            >
              <!-- Checkbox Competencia -->
              <div class="col-span-1 flex justify-center">
                <div :class="[
                  'w-6 h-6 rounded border-2 flex items-center justify-center',
                  habilidad.competente 
                    ? 'bg-green-500 border-green-500' 
                    : 'bg-white border-green-300'
                ]">
                  <span v-if="habilidad.competente" class="text-white text-sm font-bold">✓</span>
                </div>
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
              class="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-amber-100 transition-colors"
            >
              <!-- Checkbox Competencia -->
              <div class="col-span-1 flex justify-center">
                <div :class="[
                  'w-6 h-6 rounded border-2 flex items-center justify-center',
                  habilidad.competente 
                    ? 'bg-amber-500 border-amber-500' 
                    : 'bg-white border-amber-300'
                ]">
                  <span v-if="habilidad.competente" class="text-white text-sm font-bold">✓</span>
                </div>
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
                    @input="validarRangos(habilidad)"
                    class="w-16 text-center bg-white border-2 border-amber-300 rounded-lg px-2 py-2 font-bold text-amber-700 focus:outline-none focus:border-amber-500"
                    min="0"
                  />
                  <button
                    @click="modificarRangos(habilidad, 1)"
                    :disabled="puntosDisponibles <= 0"
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

const { characterData, loadCharacterData } = useCharacterCreation();

// Cargar habilidades desde JSON
const habilidades = ref(
  habilidadesData.habilidades.map(hab => ({
    id: hab.id,
    nombre: hab.nombre,
    atributo: hab.atributo,
    competente: false, // Se determinará en onMounted
    modAtributo: 0,
    rangos: 0,
    bonifDiversos: 0
  }))
);

const puntosMaximos = 20;
const puntosAsignados = computed(() => {
  return habilidades.value.reduce((total, habilidad) => total + habilidad.rangos, 0);
});
const puntosDisponibles = computed(() => {
  return puntosMaximos - puntosAsignados.value;
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

// Marcar como competente las habilidades seleccionadas en oficio y trasfondo
onMounted(() => {
  loadCharacterData();
  
  // Obtener las habilidades seleccionadas desde oficio y trasfondo
  const habilidadesCompetentes = [
    ...(characterData.value.oficio_habilidades || []),
    ...(characterData.value.trasfondo_habilidades || [])
  ];
  
  // Marcar como competente las habilidades que están en la lista
  habilidades.value.forEach(hab => {
    hab.competente = habilidadesCompetentes.includes(hab.nombre);
  });
});

// Actualizar competencia cuando cambien las selecciones de oficio o trasfondo
watch(() => [characterData.value.oficio_habilidades, characterData.value.trasfondo_habilidades], () => {
  const habilidadesCompetentes = [
    ...(characterData.value.oficio_habilidades || []),
    ...(characterData.value.trasfondo_habilidades || [])
  ];
  
  habilidades.value.forEach(hab => {
    hab.competente = habilidadesCompetentes.includes(hab.nombre);
  });
}, { deep: true });
function calcularTotal(habilidad: any): number {
  const competenciaBonus = habilidad.competente ? 2 : 0; // Asumiendo un bono fijo de competencia
  return habilidad.modAtributo + habilidad.rangos + habilidad.bonifDiversos + competenciaBonus;
}
function modificarRangos(habilidad: any, cantidad: any) {
  const nuevoValor = habilidad.rangos + cantidad;
  if (nuevoValor >= 0 && (cantidad < 0 || puntosDisponibles.value > 0)) {
    habilidad.rangos = nuevoValor;
  }
}
function validarRangos(habilidad: any) {
          if (habilidad.rangos < 0) {
            habilidad.rangos = 0;
          }
          if (isNaN(habilidad.rangos)) {
            habilidad.rangos = 0;
          } 
        }


</script>