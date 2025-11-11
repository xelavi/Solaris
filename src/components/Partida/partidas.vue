<template>
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen p-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-600 mb-2 drop-shadow-lg">
          Partidas
        </h1>
      </div>

      <div class="flex justify-between items-center mb-8">
        <button
          @click="volverAPersonajes"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg flex items-center gap-2"
        >
          ← Volver a Personajes
        </button>

        <button
          @click="crearNuevaPartida"
          class="px-8 py-4 rounded-lg font-semibold transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-3 text-lg"
        >
          <span class="text-2xl">＋</span>
          <span>Crear Nueva Partida</span>
        </button>
      </div>

      <div v-if="partidas.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="partida in partidas"
          :key="partida.id"
          class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative"
        >
          <!-- Botón eliminar -->
          <button
            @click.stop="eliminarPartida(partida.id)"
            class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg z-10"
            title="Eliminar partida"
          >
            ✕
          </button>

          <!-- Contenido de la partida -->
          <div>
            <h2 class="text-2xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-2">
              {{ partida.nombre }}
            </h2>
            <div class="space-y-2 text-gray-600">
              <div class="flex justify-between items-center">
                <span class="font-semibold text-blue-600">Equipos:</span>
                <span class="font-bold text-lg">{{ partida.equipos.length }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-semibold text-blue-600">Total Personajes:</span>
                <span class="font-medium">{{ contarPersonajes(partida) }}</span>
              </div>
              <div class="text-xs text-gray-400 mt-2">
                Creada: {{ formatearFecha(partida.fechaCreacion) }}
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="mt-4 flex gap-2">
              <button
                @click.stop="abrirPartida(partida.id)"
                class="flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg flex items-center justify-center gap-2"
              >
                📋 Vista Clásica
              </button>
              <button
                @click.stop="jugarPartida(partida.id)"
                class="flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg flex items-center justify-center gap-2"
              >
                🎮 Mapa 3D
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-16">
        <p class="text-xl text-gray-500">No tienes partidas creadas todavía.</p>
        <p class="text-gray-400 mt-2">¡Crea una para empezar a jugar!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import type { PersonajeInstancia, Equipo, PartidaData } from '../../domain/Partida'

const partidas = ref<PartidaData[]>([]);

const navigateToCrearPartida = inject<() => void>('navigateToCrearPartida')
const navigateToCharacters = inject<() => void>('navigateToCharacters')
const navigateToVerPartida = inject<(id: string) => void>('navigateToVerPartida')
const navigateToJugarPartida = inject<(id: string) => void>('navigateToJugarPartida')

function cargarPartidas() {
  try {
    const listaIdsString = localStorage.getItem('lista_partidas');
    if (!listaIdsString) {
      console.log('No se encontró lista de partidas.');
      return;
    }

    const listaIds: string[] = JSON.parse(listaIdsString);
    const partidasCargadas: PartidaData[] = [];

    listaIds.forEach(id => {
      const partidaString = localStorage.getItem(id);
      if (partidaString) {
        const datos = JSON.parse(partidaString);
        partidasCargadas.push(datos);
      }
    });

    partidas.value = partidasCargadas;
  } catch (error) {
    console.error('Error al cargar las partidas:', error);
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

function volverAPersonajes() {
  if (navigateToCharacters) {
    navigateToCharacters();
  }
}

function eliminarPartida(id: string) {
  if (!confirm('¿Estás seguro de que quieres eliminar esta partida?')) {
    return;
  }

  try {
    console.log('🗑️ Eliminando partida con ID:', id);

    // Eliminar del localStorage
    localStorage.removeItem(id);

    // Eliminar de la lista de partidas
    const listaString = localStorage.getItem('lista_partidas');
    if (listaString) {
      const lista: string[] = JSON.parse(listaString);
      const listaFiltrada = lista.filter(partidaId => partidaId !== id);
      localStorage.setItem('lista_partidas', JSON.stringify(listaFiltrada));
    }

    // Eliminar de la UI
    partidas.value = partidas.value.filter(partida => partida.id !== id);

    console.log('✅ Partida eliminada correctamente');
  } catch (error) {
    console.error('❌ Error al eliminar partida:', error);
    alert('Error al eliminar la partida. Por favor, inténtalo de nuevo.');
  }
}

function contarPersonajes(partida: PartidaData): number {
  return partida.equipos.reduce((total, equipo) => total + equipo.personajes.length, 0);
}

function formatearFecha(fecha: string): string {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

onMounted(() => {
  cargarPartidas();
});
</script>

<style scoped>
</style>
