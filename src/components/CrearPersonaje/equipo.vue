<template>

<h2 class="text-3xl font-bold text-blue-600 mb-6 pb-4 border-b border-blue-200">
        Equipo
      </h2>
      
      <div class="space-y-8">
        <!-- Tabla de Armas -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold text-blue-700">Armas</h3>
            <div class="text-sm text-blue-600">
              Seleccionadas: <span class="font-bold">{{ armasSeleccionadas.length }}</span>
            </div>
          </div>

          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden">
            <!-- Header de la tabla de armas -->
            <div class="bg-blue-600 text-white grid grid-cols-12 gap-3 px-4 py-3 font-semibold text-sm">
              <div class="col-span-1 text-center">Sel.</div>
              <div class="col-span-2">Arma</div>
              <div class="col-span-1 text-center">Lac.</div>
              <div class="col-span-1 text-center">Cor.</div>
              <div class="col-span-1 text-center">Con.</div>
              <div class="col-span-3">Etiquetas</div>
              <div class="col-span-1 text-center">Crítico</div>
              <div class="col-span-1 text-center">Rango Crít.</div>
              <div class="col-span-1 text-center">Distancia</div>
            </div>

            <!-- Filas de armas -->
            <div class="divide-y divide-blue-200 max-h-96 overflow-y-auto">
              <div 
                v-for="arma in armas" 
                :key="arma.id"
                @click="toggleArma(arma.id)"
                :class="[
                  'grid grid-cols-12 gap-3 px-4 py-3 items-center cursor-pointer transition-colors',
                  armasSeleccionadas.includes(arma.id) 
                    ? 'bg-blue-200 hover:bg-blue-250' 
                    : 'bg-white hover:bg-blue-100'
                ]"
              >
                <!-- Checkbox -->
                <div class="col-span-1 flex justify-center">
                  <div :class="[
                    'w-6 h-6 rounded border-2 flex items-center justify-center transition-colors',
                    armasSeleccionadas.includes(arma.id)
                      ? 'bg-blue-500 border-blue-500' 
                      : 'bg-white border-blue-300'
                  ]">
                    <span v-if="armasSeleccionadas.includes(arma.id)" class="text-white text-sm font-bold">✓</span>
                  </div>
                </div>

                <!-- Nombre -->
                <div class="col-span-2">
                  <div class="font-semibold text-blue-700">{{ arma.nombre }}</div>
                </div>

                <!-- Daño Lacerante -->
                <div class="col-span-1 text-center">
                  <div class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]">
                    {{ arma.danoLacerante }}
                  </div>
                </div>

                <!-- Daño Cortante -->
                <div class="col-span-1 text-center">
                  <div class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]">
                    {{ arma.danoCortante }}
                  </div>
                </div>

                <!-- Daño Contundente -->
                <div class="col-span-1 text-center">
                  <div class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]">
                    {{ arma.danoContundente }}
                  </div>
                </div>

                <!-- Etiquetas -->
                <div class="col-span-3">
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="etiqueta in arma.etiquetas" 
                      :key="etiqueta"
                      class="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full font-medium"
                    >
                      {{ etiqueta }}
                    </span>
                  </div>
                </div>

                <!-- Crítico -->
                <div class="col-span-1 text-center">
                  <div class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-bold text-sm">
                    x{{ arma.critico }}
                  </div>
                </div>

                <!-- Rango Crítico -->
                <div class="col-span-1 text-center">
                  <div class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm">
                    {{ arma.rangoCritico }}
                  </div>
                </div>

                <!-- Distancia -->
                <div class="col-span-1 text-center">
                  <div class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm">
                    {{ arma.distancia }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla de Armaduras -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold text-blue-700">Armaduras</h3>
            <div class="text-sm text-blue-600">
              Seleccionadas: <span class="font-bold">{{ armadurasSeleccionadas.length }}</span>
            </div>
          </div>

          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden">
            <!-- Header de la tabla de armaduras -->
            <div class="bg-blue-600 text-white grid grid-cols-12 gap-3 px-4 py-3 font-semibold text-sm">
              <div class="col-span-1 text-center">Sel.</div>
              <div class="col-span-3">Armadura</div>
              <div class="col-span-2 text-center">Lac.</div>
              <div class="col-span-2 text-center">Cor.</div>
              <div class="col-span-2 text-center">Con.</div>
              <div class="col-span-2">Etiquetas</div>
            </div>

            <!-- Filas de armaduras -->
            <div class="divide-y divide-blue-200 max-h-96 overflow-y-auto">
              <div 
                v-for="armadura in armaduras" 
                :key="armadura.id"
                @click="toggleArmadura(armadura.id)"
                :class="[
                  'grid grid-cols-12 gap-3 px-4 py-3 items-center cursor-pointer transition-colors',
                  armadurasSeleccionadas.includes(armadura.id)
                    ? 'bg-blue-200 hover:bg-blue-250' 
                    : 'bg-white hover:bg-blue-100'
                ]"
              >
                <!-- Checkbox -->
                <div class="col-span-1 flex justify-center">
                  <div :class="[
                    'w-6 h-6 rounded border-2 flex items-center justify-center transition-colors',
                    armadurasSeleccionadas.includes(armadura.id)
                      ? 'bg-blue-500 border-blue-500' 
                      : 'bg-white border-blue-300'
                  ]">
                    <span v-if="armadurasSeleccionadas.includes(armadura.id)" class="text-white text-sm font-bold">✓</span>
                  </div>
                </div>

                <!-- Nombre -->
                <div class="col-span-3">
                  <div class="font-semibold text-blue-700">{{ armadura.nombre }}</div>
                </div>

                <!-- Daño Lacerante -->
                <div class="col-span-2 text-center">
                  <div class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]">
                    {{ armadura.danoLacerante }}
                  </div>
                </div>

                <!-- Daño Cortante -->
                <div class="col-span-2 text-center">
                  <div class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]">
                    {{ armadura.danoCortante }}
                  </div>
                </div>

                <!-- Daño Contundente -->
                <div class="col-span-2 text-center">
                  <div class="inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]">
                    {{ armadura.danoContundente }}
                  </div>
                </div>

                <!-- Etiquetas -->
                <div class="col-span-2">
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="etiqueta in armadura.etiquetas" 
                      :key="etiqueta"
                      class="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full font-medium"
                    >
                      {{ etiqueta }}
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
import { ref } from 'vue'
const armas = ref([
            {
              id: 1,
              nombre: 'Espada Larga',
              danoLacerante: 4,
              danoCortante: 8,
              danoContundente: 0,
              etiquetas: ['Versátil', 'Militar'],
              critico: 2,
              rangoCritico: '19/20',
              distancia: 0
            },
            {
              id: 2,
              nombre: 'Daga',
              danoLacerante: 2,
              danoCortante: 4,
              danoContundente: 0,
              etiquetas: ['Ligera', 'Arrojadiza', 'Simple'],
              critico: 2,
              rangoCritico: '19/20',
              distancia: 10
            },
            {
              id: 3,
              nombre: 'Hacha de Batalla',
              danoLacerante: 0,
              danoCortante: 12,
              danoContundente: 0,
              etiquetas: ['A Dos Manos', 'Hacha', 'Militar'],
              critico: 3,
              rangoCritico: '20',
              distancia: 0
            },
            {
              id: 4,
              nombre: 'Martillo de Guerra',
              danoLacerante: 0,
              danoCortante: 0,
              danoContundente: 10,
              etiquetas: ['Versátil', 'Contundente', 'Militar'],
              critico: 3,
              rangoCritico: '20',
              distancia: 0
            },
            {
              id: 5,
              nombre: 'Arco Largo',
              danoLacerante: 8,
              danoCortante: 0,
              danoContundente: 0,
              etiquetas: ['A Dos Manos', 'Arco', 'Militar'],
              critico: 3,
              rangoCritico: '20',
              distancia: 100
            },
            {
              id: 6,
              nombre: 'Lanza',
              danoLacerante: 6,
              danoCortante: 0,
              danoContundente: 0,
              etiquetas: ['Enastada', 'Arrojadiza', 'Simple'],
              critico: 3,
              rangoCritico: '20',
              distancia: 20
            },
            {
              id: 7,
              nombre: 'Escudo',
              danoLacerante: 0,
              danoCortante: 0,
              danoContundente: 4,
              etiquetas: ['Escudo', 'Defensivo'],
              critico: 2,
              rangoCritico: '20',
              distancia: 0
            },
            {
              id: 8,
              nombre: 'Espada Corta',
              danoLacerante: 3,
              danoCortante: 6,
              danoContundente: 0,
              etiquetas: ['Ligera', 'Perforante', 'Militar'],
              critico: 2,
              rangoCritico: '19/20',
              distancia: 0
            },
            {
              id: 9,
              nombre: 'Alabarda',
              danoLacerante: 4,
              danoCortante: 8,
              danoContundente: 4,
              etiquetas: ['A Dos Manos', 'Enastada', 'Pesada', 'Militar'],
              critico: 3,
              rangoCritico: '20',
              distancia: 0
            },
            {
              id: 10,
              nombre: 'Ballesta Pesada',
              danoLacerante: 10,
              danoCortante: 0,
              danoContundente: 0,
              etiquetas: ['A Dos Manos', 'Ballesta', 'Pesada'],
              critico: 2,
              rangoCritico: '19/20',
              distancia: 120
            }
          ]);
const armaduras = ref([
            {
              id: 1,
              nombre: 'Armadura de Cuero',
              danoLacerante: 2,
              danoCortante: 2,
              danoContundente: 0,
              etiquetas: ['Ligera']
            },
            {
              id: 2,
              nombre: 'Cota de Mallas',
              danoLacerante: 5,
              danoCortante: 6,
              danoContundente: 3,
              etiquetas: ['Media', 'Metal']
            },
            {
              id: 3,
              nombre: 'Armadura de Placas',
              danoLacerante: 8,
              danoCortante: 8,
              danoContundente: 6,
              etiquetas: ['Pesada', 'Metal']
            },
            {
              id: 4,
              nombre: 'Armadura Acolchada',
              danoLacerante: 1,
              danoCortante: 1,
              danoContundente: 2,
              etiquetas: ['Ligera', 'Tela']
            },
            {
              id: 5,
              nombre: 'Cota de Escamas',
              danoLacerante: 4,
              danoCortante: 5,
              danoContundente: 2,
              etiquetas: ['Media', 'Metal']
            },
            {
              id: 6,
              nombre: 'Coraza',
              danoLacerante: 6,
              danoCortante: 6,
              danoContundente: 4,
              etiquetas: ['Media', 'Metal']
            },
            {
              id: 7,
              nombre: 'Armadura de Cuero Tachonado',
              danoLacerante: 3,
              danoCortante: 3,
              danoContundente: 1,
              etiquetas: ['Ligera', 'Reforzada']
            },
            {
              id: 8,
              nombre: 'Armadura Completa',
              danoLacerante: 10,
              danoCortante: 10,
              danoContundente: 8,
              etiquetas: ['Pesada', 'Metal', 'Completa']
            }
          ]);

const armasSeleccionadas = ref<number[]>([]);
const armadurasSeleccionadas = ref<number[]>([]);
function toggleArma(armaId: number) {
    const index = armasSeleccionadas.value.indexOf(armaId);
    if (index === -1) {
        armasSeleccionadas.value.push(armaId);
    } else {
        armasSeleccionadas.value.splice(index, 1);
    }
}
function toggleArmadura(armaduraId: number) {
    const index = armadurasSeleccionadas.value.indexOf(armaduraId);
    if (index === -1) {
        armadurasSeleccionadas.value.push(armaduraId);
    } else {
        armadurasSeleccionadas.value.splice(index, 1);
    }
}
</script>