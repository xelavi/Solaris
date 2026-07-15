<template>
  <!-- Control de tamaño de la ficha. Position fixed: SIEMPRE visible y
       alcanzable, aunque la ficha sea más grande que la pantalla. -->
  <div class="ctrl-zoom">
    <button title="Reducir tamaño" @click="$emit('reducir')">−</button>
    <span>{{ Math.round(zoom * 100) }}%</span>
    <button title="Aumentar tamaño" @click="$emit('aumentar')">+</button>
    <button title="Tamaño normal" @click="$emit('restablecer')">⟲</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ zoom: number }>();
defineEmits<{
  (e: "reducir"): void;
  (e: "aumentar"): void;
  (e: "restablecer"): void;
}>();
</script>

<style scoped>
.ctrl-zoom {
  position: fixed;
  left: 12px;
  bottom: 12px;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: 9px;
  background: rgba(17, 24, 39, 0.92);
  color: #e5e7eb;
  border: 1px solid #374151;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  font-size: 12px;
  backdrop-filter: blur(4px);
}
.ctrl-zoom button {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #1f2937;
  color: #e5e7eb;
  border: 1px solid #374151;
  cursor: pointer;
  line-height: 1;
  font-size: 14px;
}
.ctrl-zoom button:hover {
  background: #374151;
}
.ctrl-zoom span {
  min-width: 36px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
</style>
