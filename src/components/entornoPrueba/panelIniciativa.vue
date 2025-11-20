<template>
  <div
    v-if="ordenTurnos.length > 0"
    class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl px-4 py-3 z-50"
  >
    <div class="flex items-center gap-3">
      <span class="text-xs font-bold text-gray-400 uppercase tracking-wide"
        >Orden de Turnos:</span
      >
      <div class="flex gap-2">
        <div
          v-for="(resultado, index) in ordenTurnos"
          :key="resultado.personaje.instanciaId"
          :class="[
            'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
            index === turnoActual
              ? 'bg-gradient-to-r from-yellow-500 to-amber-500 ring-2 ring-yellow-300 scale-110 shadow-lg'
              : 'bg-gray-700 hover:bg-gray-600',
          ]"
        >
          <span
            :class="[
              'font-bold text-sm',
              index === turnoActual ? 'text-gray-900' : 'text-white',
            ]"
          >
            {{ index + 1 }}.
          </span>
          <span
            :class="[
              'font-semibold text-sm',
              index === turnoActual ? 'text-gray-900' : 'text-gray-200',
            ]"
          >
            {{ resultado.personaje.nombre }}
          </span>
          <span
            :class="[
              'text-xs font-mono px-2 py-0.5 rounded',
              index === turnoActual
                ? 'bg-gray-900/20 text-gray-900'
                : 'bg-gray-800 text-gray-400',
            ]"
          >
            {{ resultado.tirada }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResultadoIniciativa } from "../../domain/Activas";

defineProps<{
  ordenTurnos: ResultadoIniciativa[];
  turnoActual: number;
}>();
</script>
