<template>
  <div
    class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen p-6"
  >
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-600 mb-2 drop-shadow-lg"
        >
          Bestiario
        </h1>
      </div>

      <!-- Barra superior con botones -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          @click="volver"
          class="px-8 py-4 rounded-lg font-semibold transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg flex items-center gap-3 text-lg"
        >
          ← Volver
        </button>
        <button
          @click="crearNuevaCriatura"
          class="px-8 py-4 rounded-lg font-semibold transition-all duration-200 bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 flex items-center gap-3 text-lg"
        >
          <span>Crear Nueva Criatura</span>
        </button>
      </div>

      <div
        v-if="criaturas.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="criatura in criaturas"
          :key="criatura.id"
          class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative"
        >
          <!-- Botón eliminar -->
          <button
            @click.stop="eliminarCriatura(criatura.id)"
            class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg z-10"
            title="Eliminar criatura"
          >
            ✕
          </button>

          <div @click="verFicha(criatura.id)">
            <h2
              class="text-2xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-2 pr-8"
            >
              {{ criatura.nombre }}
            </h2>
            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="etiqueta in criatura.etiquetas"
                :key="etiqueta"
                class="px-2 py-0.5 bg-emerald-500 text-white text-xs font-semibold rounded-full"
              >
                {{ etiqueta }}
              </span>
            </div>
            <div class="space-y-2 text-gray-600">
              <div class="flex justify-between items-center">
                <span class="font-semibold text-emerald-600">Dificultad:</span>
                <span class="font-bold text-lg">{{ criatura.dificultad }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-semibold text-emerald-600">Experiencia:</span>
                <span class="font-medium">{{ criatura.experiencia }} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-16">
        <p class="text-xl text-gray-500">
          No tienes criaturas guardadas todavía.
        </p>
        <p class="text-gray-400 mt-2">¡Crea la primera del bestiario!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";

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
const navigateToCharacters = inject<() => void>("navigateToCharacters");

function volver() {
  if (navigateToCharacters) navigateToCharacters();
}

function cargarCriaturas() {
  try {
    const listaString = localStorage.getItem("lista_criaturas");
    if (!listaString) return;

    const listaIds: string[] = JSON.parse(listaString);
    const cargadas: CriaturaInfo[] = [];

    listaIds.forEach((id) => {
      const criaturaString = localStorage.getItem(id);
      if (criaturaString) {
        const datos = JSON.parse(criaturaString);
        if (datos.nombre) {
          cargadas.push({
            id: datos.id,
            nombre: datos.nombre,
            dificultad: datos.dificultad ?? 0,
            experiencia: datos.experiencia ?? 0,
            etiquetas: datos.etiquetas ?? [],
          });
        }
      }
    });

    criaturas.value = cargadas;
  } catch (error) {
    console.error("Error al cargar las criaturas:", error);
  }
}

function verFicha(id: string) {
  if (navigateToFichaCriatura) navigateToFichaCriatura(id);
}

function crearNuevaCriatura() {
  localStorage.removeItem("criatura_en_creacion_id");
  if (navigateToCrearCriatura) navigateToCrearCriatura();
}

function eliminarCriatura(id: string) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta criatura?")) return;

  try {
    localStorage.removeItem(id);
    const listaString = localStorage.getItem("lista_criaturas");
    if (listaString) {
      const lista: string[] = JSON.parse(listaString);
      localStorage.setItem(
        "lista_criaturas",
        JSON.stringify(lista.filter((cid) => cid !== id)),
      );
    }
    criaturas.value = criaturas.value.filter((c) => c.id !== id);
  } catch (error) {
    console.error("Error al eliminar criatura:", error);
    alert("Error al eliminar la criatura. Inténtalo de nuevo.");
  }
}

onMounted(cargarCriaturas);
</script>

<style scoped></style>
