<template>
  <div class="page">
    <div class="page-container">
      <div class="mb-6">
        <button @click="volver" class="btn btn-ghost btn-sm -ml-2">
          ← Volver a partidas
        </button>
        <h1 class="page-title mt-1">Crear partida</h1>
        <p class="page-subtitle">
          Ponle un nombre y entrarás a una escena vacía donde montar el
          encuentro.
        </p>
      </div>

      <div class="card p-6 sm:p-8">
        <div class="mb-8">
          <label class="label">Nombre de la partida</label>
          <input
            v-model="nombrePartida"
            type="text"
            placeholder="Ej: La Caída del Reino"
            class="input"
            @keyup.enter="crear"
          />
        </div>

        <div class="flex justify-end gap-3 border-t border-gray-200 pt-6">
          <button @click="volver" class="btn btn-ghost">Cancelar</button>
          <button
            @click="crear"
            :disabled="!nombrePartida.trim()"
            class="btn btn-primary"
          >
            Crear partida
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { crearPartidaVacia } from "../../domain/storage/partidasRepo";

const nombrePartida = ref("");

const navigateToPartidas = inject<() => void>("navigateToPartidas");
const navigateToEscena = inject<(id?: string) => void>("navigateToEscena");

function volver() {
  navigateToPartidas?.();
}

async function crear() {
  const nombre = nombrePartida.value.trim();
  if (!nombre) return;

  const partida = await crearPartidaVacia(nombre);
  navigateToEscena?.(partida.id);
}
</script>

<style scoped></style>
