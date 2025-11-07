<template>
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen p-6">
    <div class="max-w-350 mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-600 mb-2 drop-shadow-lg">
          Creación de Personaje
        </h1>
        
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-4 shadow-xl">
            <h2 class="text-lg font-bold text-gray-700 mb-4 pb-3 border-b border-gray-200">
              Índice
            </h2>
            <nav class="space-y-2">
              <button
                v-for="(step, index) in steps"
                :key="index"
                @click="currentStep = index"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200',
                  currentStep === index
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-blue-50 text-gray-700 hover:bg-gray-100 hover:text-gray-800'
                ]"
              >
                <span class="flex items-center gap-3">
                  <span :class="[
                    'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                    currentStep === index
                      ? 'bg-white text-blue-500'
                      : 'bg-gray-200 text-blue-700'
                  ]">
                    {{ index + 1 }}
                  </span>
                  {{ step }}
                </span>
              </button>
            </nav>
          </div>
        </div>

        <div class="flex-1">
          <div class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-8 shadow-xl min-h-[500px]">
            <h2 class="text-3xl font-bold text-gray-600 mb-6 pb-4 border-b border-gray-200">
              {{ steps[currentStep] }}
            </h2>
            <div v-if="currentStep === 0" class="space-y-6">
                <general></general>
            </div>
            <div v-if="currentStep === 1" class="space-y-6">
                <trasfondo></trasfondo>
            </div>
             <div v-if="currentStep === 2" class="space-y-6">
                <oficio></oficio>
            </div>
            <div v-if="currentStep === 3" class="space-y-6">
                <estilo_marcial></estilo_marcial>
            </div>
             <div v-if="currentStep === 4" class="space-y-6">
                <arbol></arbol>
            </div>
            <div v-if="currentStep === 5" class="space-y-6">
                <habilidades></habilidades>
            </div>
            <div v-if="currentStep === 6" class="space-y-6">
                <equipo></equipo>
            </div>

            <div class="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                @click="currentStep = Math.max(0, currentStep - 1)"
                :disabled="currentStep === 0"
                :class="[
                  'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg'
                ]"
              >
                ← Anterior
              </button>

              <button
                @click="currentStep = Math.min(steps.length - 1, currentStep + 1)"
                :disabled="currentStep === steps.length - 1"
                :class="[
                  'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
                  currentStep === steps.length - 1
                    ? 'bg-blue-100 text-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30'
                ]"
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import general from './general.vue'
import trasfondo from './trasfondo.vue' 
import oficio from './oficio.vue' 
import estilo_marcial from './estilo_marcial.vue'
import arbol from './arbol.vue'
import habilidades from './habilidades.vue'
import equipo from './equipo.vue'

const currentStep = ref(0)

const steps = [
  'Información General',
  'Trasfondo',
  'Oficio',
  'Estilo Marcial',
  'Arbol',
  'Habilidades',
  'Equipo'
]


</script>
<style scoped>
</style>