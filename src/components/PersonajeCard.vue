<template>
  <div class="card card-hover group relative cursor-pointer p-5">
    <!-- Botón eliminar -->
    <button
      @click.stop="$emit('eliminar')"
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
        <span class="badge badge-accent mt-1"> Nivel {{ personaje.nivel }} </span>
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
</template>

<script setup lang="ts">
export interface PersonajeInfo {
  id: string;
  nombre: string;
  nivel: number;
  especialidad: string;
  estilo_marcial: string;
}

defineProps<{
  personaje: PersonajeInfo;
}>();

defineEmits<{
  (e: "eliminar"): void;
}>();
</script>

<style scoped></style>
