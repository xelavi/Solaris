<template>
  <span
    class="group relative cursor-help font-semibold text-purple-700 underline decoration-dotted underline-offset-2"
  >
    {{ activa.nombre }}
    <span
      class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 hidden w-64 -translate-x-1/2 flex-col rounded border border-gray-700 bg-gray-900/95 px-2 py-1.5 text-left text-xs font-normal normal-case text-gray-100 shadow-lg group-hover:flex"
    >
      <span class="mb-0.5 font-semibold text-purple-300">{{ activa.nombre }}</span>
      <span>{{ activa.descripcion }}</span>
    </span>
  </span>
</template>

<script setup>
defineProps({
  activa: {
    type: Object,
    required: true,
  },
});
</script>
