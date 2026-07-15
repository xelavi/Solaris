<template>
  <div class="page">
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Personajes</h1>
          <p class="page-subtitle">
            Gestiona tus héroes y continúa donde lo dejaste.
          </p>
        </div>
        <button @click="crearNuevoPersonaje" class="btn btn-primary">
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
          Nuevo personaje
        </button>
      </div>

      <div v-if="cargando" class="loading-state">
        <div class="spinner"></div>
        <p class="loading-text">Cargando personajes...</p>
      </div>

      <div
        v-else-if="personajes.length > 0"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="personaje in personajes"
          :key="personaje.id"
          class="card card-hover group relative cursor-pointer p-5"
          @click="verFicha(personaje.id)"
        >
          <button
            @click.stop="eliminarPersonaje(personaje.id)"
            class="btn-icon absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100"
            title="Eliminar personaje"
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

          <div class="mb-4 flex items-center gap-3">
            <div
              class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50 text-lg font-bold text-indigo-600"
            >
              {{ personaje.nombre.charAt(0).toUpperCase() }}
            </div>
            <div class="min-w-0">
              <h2 class="truncate text-base font-semibold text-gray-900">
                {{ personaje.nombre }}
              </h2>
              <span class="badge badge-accent mt-1">
                Nivel {{ personaje.nivel }}
              </span>
            </div>
          </div>

          <dl class="space-y-2 border-t border-gray-200 pt-3 text-sm">
            <div class="flex items-center justify-between">
              <dt class="text-gray-500">Especialidad</dt>
              <dd class="font-medium text-gray-800">
                {{ personaje.especialidad || "No definido" }}
              </dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-gray-500">Estilo marcial</dt>
              <dd class="font-medium text-gray-800">
                {{ personaje.estilo_marcial || "No definido" }}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div v-else class="empty-state">
        <p class="empty-title">No tienes personajes guardados todavía</p>
        <p class="empty-hint">Crea el primero para empezar a jugar.</p>
        <button @click="crearNuevoPersonaje" class="btn btn-primary mt-6">
          Crear personaje
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { esPersonajeCompleto } from "../domain/Personaje";
import {
  listarPersonajes,
  eliminarPersonaje as eliminarPersonajeGuardado,
} from "../domain/storage/personajesRepo";

interface PersonajeInfo {
  id: string;
  nombre: string;
  nivel: number;
  especialidad: string;
  estilo_marcial: string;
}

const personajes = ref<PersonajeInfo[]>([]);
const cargando = ref(true);

const navigateToFicha = inject<(id: string) => void>("navigateToFicha");
const navigateToCrear = inject<() => void>("navigateToCrear");

async function cargarPersonajes() {
  // Los personajes a medio crear no se listan.
  const guardados = await listarPersonajes();
  personajes.value = guardados
    .filter(esPersonajeCompleto)
    .map((p) => ({
      id: p.id,
      nombre: p.nombre,
      nivel: p.nivel,
      especialidad: p.especialidad,
      estilo_marcial: p.estilo_marcial,
    }));
}

function verFicha(id: string) {
  navigateToFicha?.(id);
}

function crearNuevoPersonaje() {
  navigateToCrear?.();
}

async function eliminarPersonaje(id: string) {
  if (!confirm("¿Estás seguro de que quieres eliminar este personaje?")) {
    return;
  }

  await eliminarPersonajeGuardado(id);
  personajes.value = personajes.value.filter(
    (personaje) => personaje.id !== id,
  );
}

onMounted(async () => {
  try {
    await cargarPersonajes();
  } finally {
    cargando.value = false;
  }
});
</script>

<style scoped></style>
