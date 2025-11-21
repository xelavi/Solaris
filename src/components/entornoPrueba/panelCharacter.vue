<template>
  <div
    class="absolute bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl border border-gray-700 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-4 z-50 min-w-[150px]"
    :style="{ left: x + 'px', top: y + 'px' }"
  >
    <div class="font-bold text-lg mb-2 text-center text-blue-300">
      {{ nombre }}
    </div>

    <div class="space-y-1">
      <div class="flex justify-between text-xs text-gray-400 mb-1">
        <span>HP</span>
        <span>{{ vidaActual }} / {{ vidaMax }}</span>
      </div>
      <div class="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-300"
          :class="getColorVida(vidaActual, vidaMax)"
          :style="{
            width: `${Math.max(0, Math.min(100, (vidaActual / vidaMax) * 100))}%`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  x: number;
  y: number;
  nombre: string;
  vidaActual: number;
  vidaMax: number;
}>();

function getColorVida(actual: number, max: number): string {
  const porcentaje = (actual / max) * 100;
  if (porcentaje > 50) return "bg-green-500";
  if (porcentaje > 25) return "bg-yellow-500";
  return "bg-red-500";
}
</script>
