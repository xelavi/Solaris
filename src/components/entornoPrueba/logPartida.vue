<template>
  <div
    class="fixed top-4 right-4 z-50 w-80 max-h-60 bg-black/70 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden flex flex-col font-mono text-xs"
  >
    <div class="bg-gray-800 p-2 border-b border-gray-700 font-bold text-gray-300">
      Historial de Combate
    </div>
    <div ref="logContainer" class="flex-1 overflow-y-auto p-2 space-y-1">
      <div v-for="(log, index) in logs" :key="index" class="text-gray-300 break-words whitespace-pre-wrap">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { usePartida } from "../../domain/usePartida";

const { logs } = usePartida();
const logContainer = ref<HTMLDivElement | null>(null);

// Auto-scroll to bottom
watch(
  logs,
  () => {
    nextTick(() => {
      if (logContainer.value) {
        logContainer.value.scrollTop = logContainer.value.scrollHeight;
      }
    });
  },
  { deep: true },
);
</script>
