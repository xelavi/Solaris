<template>
  <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
    <div
      class="bg-gray-900/90 backdrop-blur-md p-2 rounded-xl border border-gray-700 shadow-2xl flex gap-3 items-end"
    >
      <div v-for="activa in activas" :key="activa.id" class="relative group">
        <!-- Tooltip (Positioned above) -->
        <div
          class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        >
          <div
            class="bg-gray-800 text-white rounded-lg p-3 shadow-xl border border-gray-600"
          >
            <div class="font-bold text-amber-400 text-sm mb-1">
              {{ activa.nombre }}
            </div>
            <div class="text-gray-300 text-xs leading-relaxed">
              {{ activa.descripcion }}
            </div>
            <div class="mt-2 text-xs text-gray-500 font-mono">
              {{ activa.diminutivo }} - {{ activa.atributo }}
            </div>
          </div>
          <!-- Arrow -->
          <div
            class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-8 border-transparent border-t-gray-800"
          ></div>
        </div>

        <!-- Button -->
        <button
          @click="toggleActiva(activa)"
          class="w-14 h-14 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border-2 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group-hover:shadow-amber-500/20"
          :class="{
            'border-amber-500 shadow-amber-500/50 ring-2 ring-amber-500':
              accionPreparada === activa,
            'border-gray-600 hover:border-amber-500':
              accionPreparada !== activa,
          }"
        >
          <span class="text-xs font-bold text-white">{{
            activa.diminutivo
          }}</span>
        </button>

        <!-- Hotkey indicator -->
        <div
          class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-gray-400 text-[10px] px-1.5 rounded border border-gray-700 font-mono"
        >
          {{ activa.id }}
        </div>
      </div>
    </div>

    <!-- Targeting Indicator -->
    <div
      v-if="accionPreparada"
      class="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-amber-500/80 text-black px-4 py-2 rounded-full font-bold animate-pulse whitespace-nowrap pointer-events-auto flex items-center gap-2"
    >
      <span>Selecciona objetivo para {{ accionPreparada.nombre }}</span>
      <button
        @click="cancelarSeleccion"
        class="bg-black/20 hover:bg-black/40 rounded-full w-6 h-6 inline-flex items-center justify-center transition-colors"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import activasData from "../../assets/activas.json";
import { usePartida } from "../../domain/usePartida";

const { personajeActivo, usarActiva, accionPreparada, setAccionPreparada } =
  usePartida();
const activas = ref(activasData.activas);

function toggleActiva(activa: any) {
  if (accionPreparada.value === activa) {
    setAccionPreparada(null);
  } else {
    setAccionPreparada(activa);
  }
}

function cancelarSeleccion() {
  setAccionPreparada(null);
}

function onCharacterClicked(e: CustomEvent) {
  if (accionPreparada.value && personajeActivo.value) {
    const target = e.detail; // PersonajeInstancia

    // Apply action
    console.log(
      `Applying ${accionPreparada.value.nombre} on ${target.nombre}`,
    );

    // Call usePartida.usarActiva logic
    usarActiva(
      personajeActivo.value.instanciaId,
      accionPreparada.value.nombre,
    );

    cancelarSeleccion();
  }
}

onMounted(() => {
  window.addEventListener(
    "character-clicked",
    onCharacterClicked as EventListener,
  );
});

onBeforeUnmount(() => {
  window.removeEventListener(
    "character-clicked",
    onCharacterClicked as EventListener,
  );
});
</script>
