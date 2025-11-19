<template>
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen p-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-600 mb-2 drop-shadow-lg">
          Selección de Personajes
        </h1>
      </div>

      <!-- Barra superior con botones -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          @click="crearNuevoPersonaje"
          class="px-8 py-4 rounded-lg font-semibold transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-3 text-lg"
        >
        
          <span>Crear Nuevo Personaje</span>
        </button>
        <button
          @click="irAPartidas"
          class="px-8 py-4 rounded-lg font-semibold transition-all duration-200 bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30 flex items-center gap-3 text-lg"
        >
          
          <span>Partidas</span>
        </button>
        <button
          @click="irAEditorVoxeles"
          class="px-8 py-4 rounded-lg font-semibold transition-all duration-200 bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30 flex items-center gap-3 text-lg"
        >
          
          <span>Editor de Voxeles</span>
        </button>
      </div>

      <div v-if="personajes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="personaje in personajes"
          :key="personaje.id"
          class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative"
        >
          <!-- Botón eliminar -->
          <button
            @click.stop="eliminarPersonaje(personaje.id)"
            class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg z-10"
            title="Eliminar personaje"
          >
            ✕
          </button>

          <!-- Contenido del personaje (clickable) -->
          <div @click="verFicha(personaje.id)">
            <h2 class="text-2xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-2">
              {{ personaje.nombre }}
            </h2>
            <div class="space-y-2 text-gray-600">
              <div class="flex justify-between items-center">
                <span class="font-semibold text-blue-600">Nivel:</span>
                <span class="font-bold text-lg">{{ personaje.nivel }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-semibold text-blue-600">Oficio:</span>
                <span class="font-medium">{{ personaje.oficio || 'No definido' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-semibold text-blue-600">Estilo Marcial:</span>
                <span class="font-medium">{{ personaje.estilo_marcial || 'No definido' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-16">
        <p class="text-xl text-gray-500">No tienes personajes guardados todavía.</p>
        <p class="text-gray-400 mt-2">¡Anímate a crear uno!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'

interface PersonajeInfo {
  id: string;
  nombre: string;
  nivel: number;
  oficio: string;
  estilo_marcial: string;
}

const personajes = ref<PersonajeInfo[]>([]);

const navigateToFicha = inject<(id: string) => void>('navigateToFicha')
const navigateToCrear = inject<() => void>('navigateToCrear')
const navigateToPartidas = inject<() => void>('navigateToPartidas')
const navigateToEditorVoxeles = inject<() => void>('navigateToEditorVoxeles')

function cargarPersonajes() {
  try {
    const listaIdsString = localStorage.getItem('lista_personajes');
    if (!listaIdsString) {
      console.log('No se encontró lista de personajes.');
      return;
    }

    const listaIds: string[] = JSON.parse(listaIdsString);
    const personajesCargados: PersonajeInfo[] = [];

    listaIds.forEach(id => {
      const personajeString = localStorage.getItem(id);
      if (personajeString) {
        const datos = JSON.parse(personajeString);
        
        // Solo agregar personajes que tengan nombre, trasfondo, oficio y estilo marcial
        if (datos.nombre && datos.trasfondo && datos.oficio && datos.estilo_marcial) {
          personajesCargados.push({
            id: datos.id,
            nombre: datos.nombre,
            nivel: datos.nivel,
            oficio: datos.oficio,
            estilo_marcial: datos.estilo_marcial,
          });
        }
      }
    });

    personajes.value = personajesCargados;
  } catch (error) {
    console.error('Error al cargar los personajes:', error);
  }
}

function verFicha(id: string) {
  if (navigateToFicha) {
    navigateToFicha(id);
  }
}

function crearNuevoPersonaje() {
  if (navigateToCrear) {
    navigateToCrear();
  }
}

function irAPartidas() {
  if (navigateToPartidas) {
    navigateToPartidas();
  }
}

function irAEditorVoxeles() {
  if (navigateToEditorVoxeles) {
    navigateToEditorVoxeles();
  }
}

function eliminarPersonaje(id: string) {
  // Confirmar eliminación
  if (!confirm('¿Estás seguro de que quieres eliminar este personaje?')) {
    return;
  }

  try {
    console.log('🗑️ Eliminando personaje con ID:', id);

    // Eliminar del localStorage
    localStorage.removeItem(id);

    // Eliminar de la lista de personajes
    const listaString = localStorage.getItem('lista_personajes');
    if (listaString) {
      const lista: string[] = JSON.parse(listaString);
      const listaFiltrada = lista.filter(personajeId => personajeId !== id);
      localStorage.setItem('lista_personajes', JSON.stringify(listaFiltrada));
    }

    // Eliminar de la UI
    personajes.value = personajes.value.filter(personaje => personaje.id !== id);

    console.log('✅ Personaje eliminado correctamente');
  } catch (error) {
    console.error('❌ Error al eliminar personaje:', error);
    alert('Error al eliminar el personaje. Por favor, inténtalo de nuevo.');
  }
}

onMounted(() => {
  cargarPersonajes();
});
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
