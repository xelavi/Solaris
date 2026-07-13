<template>
  <div class="page">
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Partidas</h1>
          <p class="page-subtitle">
            Organiza encuentros y dirige el combate de tus equipos.
          </p>
        </div>
        <button @click="crearNuevaPartida" class="btn btn-primary">
          <svg
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
            />
          </svg>
          Nueva partida
        </button>
      </div>

      <div
        v-if="partidas.length > 0"
        class="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div
          v-for="partida in partidas"
          :key="partida.id"
          class="card card-hover group relative p-5"
        >
          <!-- Botón eliminar -->
          <button
            @click.stop="eliminarPartida(partida.id)"
            class="btn-icon absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100"
            title="Eliminar partida"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482 41.03 41.03 0 0 0-2.365-.298V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Contenido de la partida -->
          <div>
            <h2 class="pr-8 text-lg font-semibold text-gray-900">
              {{ partida.nombre }}
            </h2>
            <p class="mt-0.5 text-xs text-gray-500">
              Creada el {{ formatearFecha(partida.fechaCreacion) }}
            </p>

            <div class="mt-3 flex gap-2">
              <span class="badge badge-muted">
                {{ partida.equipos.length }}
                {{ partida.equipos.length === 1 ? "equipo" : "equipos" }}
              </span>
              <span class="badge badge-muted">
                {{ contarPersonajes(partida) }}
                {{
                  contarPersonajes(partida) === 1 ? "personaje" : "personajes"
                }}
              </span>
            </div>

            <!-- Botones de acción -->
            <div
              class="mt-4 flex flex-wrap gap-2 border-t border-gray-200 pt-4"
            >
              <button
                @click.stop="abrirPartida(partida.id)"
                class="btn btn-secondary btn-sm flex-1"
              >
                Vista clásica
              </button>
              <button
                @click.stop="jugarPartida(partida.id)"
                class="btn btn-primary btn-sm flex-1"
              >
                Mapa 3D
              </button>
              <button
                @click.stop="irAEscena(partida.id)"
                class="btn btn-secondary btn-sm flex-1"
              >
                Escena
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <p class="empty-title">No tienes partidas creadas todavía</p>
        <p class="empty-hint">Crea una para empezar a jugar.</p>
        <button @click="crearNuevaPartida" class="btn btn-primary mt-6">
          Crear partida
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import type { PartidaData } from "../../domain/Partida";
import {
  listarPartidas,
  eliminarPartida as eliminarPartidaRepo,
} from "../../domain/storage/partidasRepo";

const partidas = ref<PartidaData[]>([]);

const navigateToCrearPartida = inject<() => void>("navigateToCrearPartida");
const navigateToVerPartida = inject<(id: string) => void>(
  "navigateToVerPartida",
);
const navigateToJugarPartida = inject<(id: string) => void>(
  "navigateToJugarPartida",
);

const navigateToEscena = inject<(id?: string) => void>("navigateToEscena");

function irAEscena(id: string) {
  if (navigateToEscena) {
    navigateToEscena(id);
  }
}

async function cargarPartidas() {
  try {
    partidas.value = await listarPartidas();
  } catch (error) {
    console.error("Error al cargar las partidas:", error);
  }
}

function crearNuevaPartida() {
  if (navigateToCrearPartida) {
    navigateToCrearPartida();
  }
}

function abrirPartida(id: string) {
  if (navigateToVerPartida) {
    navigateToVerPartida(id);
  }
}

function jugarPartida(id: string) {
  if (navigateToJugarPartida) {
    navigateToJugarPartida(id);
  }
}

async function eliminarPartida(id: string) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta partida?")) {
    return;
  }

  try {
    console.log("🗑️ Eliminando partida con ID:", id);

    // Eliminar del backend (borra la clave y la quita de la lista de ids).
    await eliminarPartidaRepo(id);

    // Eliminar de la UI
    partidas.value = partidas.value.filter((partida) => partida.id !== id);

    console.log("✅ Partida eliminada correctamente");
  } catch (error) {
    console.error("❌ Error al eliminar partida:", error);
    alert("Error al eliminar la partida. Por favor, inténtalo de nuevo.");
  }
}

function contarPersonajes(partida: PartidaData): number {
  return partida.equipos.reduce(
    (total, equipo) => total + equipo.personajes.length,
    0,
  );
}

function formatearFecha(fecha: string): string {
  const date = new Date(fecha);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

onMounted(() => {
  void cargarPartidas();
});
</script>

<style scoped></style>
