<template>
  <span>
    <template v-for="(segmento, i) in segmentos" :key="i">
      <span v-if="segmento.tipo === 'texto'">{{ segmento.texto }}</span>
      <span
        v-else
        class="group relative cursor-help font-semibold text-purple-700 underline decoration-dotted underline-offset-2"
      >
        {{ segmento.nombre }}
        <span
          class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 hidden w-64 -translate-x-1/2 flex-col rounded border border-gray-700 bg-gray-900/95 px-2 py-1.5 text-left text-xs font-normal normal-case text-gray-100 shadow-lg group-hover:flex"
        >
          <span class="mb-0.5 font-semibold text-purple-300">{{ segmento.nombre }}</span>
          <span>{{ segmento.descripcion }}</span>
        </span>
      </span>
    </template>
  </span>
</template>

<script setup>
import { computed } from "vue";
import { parsearDescripcionEstados } from "../domain/DescripcionEstados";

const props = defineProps({
  texto: {
    type: String,
    default: "",
  },
});

const segmentos = computed(() => parsearDescripcionEstados(props.texto));
</script>
