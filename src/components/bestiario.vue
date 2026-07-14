<template>
  <div class="page">
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Bestiario</h1>
          <p class="page-subtitle">
            Catálogo de criaturas para tus encuentros.
          </p>
        </div>
        <button @click="crearNuevaCriatura" class="btn btn-primary">
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
          Nueva criatura
        </button>
      </div>

      <div
        v-if="criaturas.length > 0"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="criatura in criaturas"
          :key="criatura.id"
          class="card card-hover group relative cursor-pointer p-5"
          @click="verFicha(criatura.id)"
        >
          <!-- Botones editar / eliminar -->
          <div
            class="absolute top-3 right-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <button
              @click.stop="editarCriatura(criatura.id)"
              class="btn-icon"
              title="Editar criatura"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828Z"
                />
              </svg>
            </button>
            <button
              @click.stop="eliminarCriatura(criatura.id)"
              class="btn-icon"
              title="Eliminar criatura"
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
          </div>

          <div>
            <h2 class="pr-8 text-base font-semibold text-gray-900">
              {{ criatura.nombre }}
            </h2>
            <div class="mt-2 mb-3 flex flex-wrap gap-1">
              <span
                v-for="etiqueta in criatura.etiquetas"
                :key="etiqueta"
                :class="['badge', clasesEtiqueta(etiqueta, catalogoEtiquetas)]"
              >
                {{ etiqueta }}
              </span>
            </div>
            <dl class="space-y-2 border-t border-gray-200 pt-3 text-sm">
              <div class="flex items-center justify-between">
                <dt class="text-gray-500">Dificultad</dt>
                <dd class="font-semibold text-gray-800">
                  {{ criatura.dificultad }}
                </dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-gray-500">Experiencia</dt>
                <dd class="font-medium text-gray-800">
                  {{ criatura.experiencia }} XP
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <p class="empty-title">No tienes criaturas guardadas todavía</p>
        <p class="empty-hint">¡Crea la primera del bestiario!</p>
        <button @click="crearNuevaCriatura" class="btn btn-primary mt-6">
          Crear criatura
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import {
  cargarCatalogoEtiquetas,
  clasesEtiqueta,
  type Etiqueta,
} from "../domain/Etiquetas";
import {
  listarCriaturas,
  eliminarCriatura as eliminarCriaturaGuardada,
  limpiarIdEnCreacion,
  editarCriaturaExistente,
} from "../domain/storage/criaturasRepo";

const catalogoEtiquetas = ref<Etiqueta[]>([]);

interface CriaturaInfo {
  id: string;
  nombre: string;
  dificultad: number;
  experiencia: number;
  etiquetas: string[];
}

const criaturas = ref<CriaturaInfo[]>([]);

const navigateToFichaCriatura = inject<(id: string) => void>(
  "navigateToFichaCriatura",
);
const navigateToCrearCriatura = inject<() => void>("navigateToCrearCriatura");

async function cargarCriaturas() {
  const lista = await listarCriaturas();
  criaturas.value = lista
    .filter((c) => c.nombre)
    .map((c) => ({
      id: c.id,
      nombre: c.nombre,
      dificultad: c.dificultad ?? 0,
      experiencia: c.experiencia ?? 0,
      etiquetas: c.etiquetas ?? [],
    }));
}

function verFicha(id: string) {
  navigateToFichaCriatura?.(id);
}

function crearNuevaCriatura() {
  limpiarIdEnCreacion();
  navigateToCrearCriatura?.();
}

function editarCriatura(id: string) {
  editarCriaturaExistente(id);
  navigateToCrearCriatura?.();
}

async function eliminarCriatura(id: string) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta criatura?")) return;

  await eliminarCriaturaGuardada(id);
  criaturas.value = criaturas.value.filter((c) => c.id !== id);
}

onMounted(async () => {
  catalogoEtiquetas.value = await cargarCatalogoEtiquetas();
  await cargarCriaturas();
});
</script>

<style scoped></style>
