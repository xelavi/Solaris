<template>
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen p-6">
    <div class="max-w-6xl mx-auto">
      <div class="mb-4">
        <button
          @click="volver"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg flex items-center gap-2"
        >
          ← Volver a Partidas
        </button>
      </div>

      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-600 mb-2 drop-shadow-lg">
          Crear Partida
        </h1>
      </div>

      <div class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-8 shadow-xl">
        <!-- Nombre de la Partida -->
        <div class="mb-8">
          <label class="block text-lg font-bold text-gray-700 mb-2">
            Nombre de la Partida
          </label>
          <input
            v-model="nombrePartida"
            type="text"
            placeholder="Ej: La Caída del Reino"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
          />
        </div>

        <!-- Equipos -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-gray-700">Equipos</h2>
            <button
              @click="agregarEquipo"
              class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-green-500 text-white hover:bg-green-600 hover:shadow-lg flex items-center gap-2"
            >
              <span class="text-xl">＋</span>
              <span>Agregar Equipo</span>
            </button>
          </div>

          <div v-if="equipos.length === 0" class="text-center py-8 text-gray-500">
            <p>No hay equipos creados. Agrega al menos uno para continuar.</p>
          </div>

          <div v-else class="space-y-6">
            <div
              v-for="(equipo, index) in equipos"
              :key="equipo.id"
              class="bg-gray-50 border-2 border-gray-300 rounded-xl p-6"
            >
              <div class="flex justify-between items-start mb-4">
                <div class="flex-1 mr-4">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    Nombre del Equipo
                  </label>
                  <input
                    v-model="equipo.nombre"
                    type="text"
                    :placeholder="`Equipo ${index + 1}`"
                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <button
                  @click="eliminarEquipo(equipo.id)"
                  class="px-3 py-2 rounded-lg font-semibold transition-all duration-200 bg-red-500 text-white hover:bg-red-600 mt-7"
                >
                  Eliminar
                </button>
              </div>

              <!-- Personajes del Equipo -->
              <div class="mt-4">
                <div class="flex justify-between items-center mb-3">
                  <h3 class="text-lg font-bold text-gray-700">Personajes</h3>
                  <button
                    @click="mostrarModalPersonajes(equipo.id)"
                    class="px-3 py-1 rounded-lg font-semibold transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 text-sm"
                  >
                    + Agregar Personaje
                  </button>
                </div>

                <div v-if="equipo.personajes.length === 0" class="text-center py-4 text-gray-400 text-sm">
                  No hay personajes en este equipo
                </div>

                <div v-else class="space-y-2">
                  <div
                    v-for="personaje in equipo.personajes"
                    :key="personaje.instanciaId"
                    class="bg-white border border-gray-300 rounded-lg p-3"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <div class="flex-1">
                        <span class="font-bold text-gray-700 text-lg">{{ personaje.nombre }}</span>
                        <span class="text-sm text-gray-500 ml-2">Nv. {{ personaje.nivel }}</span>
                      </div>
                      <button
                        @click="eliminarPersonajeDeEquipo(equipo.id, personaje.instanciaId)"
                        class="text-red-500 hover:text-red-700 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                    <div class="text-sm text-gray-600 space-y-1">
                      <div class="flex justify-between">
                        <span>Vida:</span>
                        <span class="font-medium">{{ personaje.vidaActual }} / {{ personaje.atributos?.hp || 10 }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Posición:</span>
                        <span class="font-mono text-xs">
                          ({{ personaje.posicion.x }}, {{ personaje.posicion.y }}, {{ personaje.posicion.z }})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="flex justify-center gap-4 pt-6 border-t border-gray-200">
          <button
            @click="volver"
            class="px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg"
          >
            Cancelar
          </button>
          <button
            @click="guardarPartida"
            :disabled="!nombrePartida || equipos.length === 0"
            :class="[
              'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
              !nombrePartida || equipos.length === 0
                ? 'bg-blue-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30'
            ]"
          >
            Guardar Partida
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para seleccionar personajes -->
    <div
      v-if="mostrarModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="cerrarModal"
    >
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-gray-700">Seleccionar Personaje</h3>
          <button
            @click="cerrarModal"
            class="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div v-if="personajesDisponibles.length === 0" class="text-center py-8 text-gray-500">
          <p>No hay personajes disponibles.</p>
          <p class="text-sm mt-2">Crea personajes primero para agregarlos a la partida.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="personaje in personajesDisponibles"
            :key="personaje.id"
            @click="agregarPersonajeAEquipo(personaje)"
            class="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <h4 class="font-bold text-gray-700 mb-2">{{ personaje.nombre }}</h4>
            <div class="text-sm text-gray-600 space-y-1">
              <div><span class="font-semibold">Nivel:</span> {{ personaje.nivel }}</div>
              <div><span class="font-semibold">Oficio:</span> {{ personaje.oficio }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import type { PersonajeInstancia, Equipo } from '../../domain/Partida'

interface PersonajeInfo {
  id: string;
  nombre: string;
  nivel: number;
  oficio: string;
  estilo_marcial: string;
}

const nombrePartida = ref('')
const equipos = ref<Equipo[]>([])
const personajesDisponibles = ref<PersonajeInfo[]>([])
const mostrarModal = ref(false)
const equipoSeleccionado = ref<string>('')

const navigateToPartidas = inject<() => void>('navigateToPartidas')

function volver() {
  if (navigateToPartidas) {
    navigateToPartidas()
  }
}

function agregarEquipo() {
  const nuevoEquipo: Equipo = {
    id: `equipo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    nombre: `Equipo ${equipos.value.length + 1}`,
    personajes: []
  }
  equipos.value.push(nuevoEquipo)
}

function eliminarEquipo(equipoId: string) {
  equipos.value = equipos.value.filter(e => e.id !== equipoId)
}

function mostrarModalPersonajes(equipoId: string) {
  equipoSeleccionado.value = equipoId
  mostrarModal.value = true
}

function cerrarModal() {
  mostrarModal.value = false
  equipoSeleccionado.value = ''
}

function agregarPersonajeAEquipo(personaje: PersonajeInfo) {
  const equipo = equipos.value.find(e => e.id === equipoSeleccionado.value)
  if (equipo) {
    // Cargar todos los datos del personaje desde localStorage
    const personajeCompleto = cargarPersonajeCompleto(personaje.id)
    if (!personajeCompleto) {
      alert('Error al cargar los datos del personaje')
      return
    }

    const nuevaInstancia: PersonajeInstancia = {
      instanciaId: `instancia_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      personajeId: personaje.id,
      // Datos básicos
      nombre: personajeCompleto.nombre,
      nivel: personajeCompleto.nivel,
      oficio: personajeCompleto.oficio,
      estilo_marcial: personajeCompleto.estilo_marcial,
      trasfondo: personajeCompleto.trasfondo,
      raza: personajeCompleto.raza || '',
      // Datos completos
      oficio_habilidades: personajeCompleto.oficio_habilidades || [],
      oficio_dotes: personajeCompleto.oficio_dotes || [],
      estilo_marcial_dotes: personajeCompleto.estilo_marcial_dotes || [],
      trasfondo_habilidades: personajeCompleto.trasfondo_habilidades || [],
      arbol: personajeCompleto.arbol || '',
      habilidades: personajeCompleto.habilidades || '',
      armas: personajeCompleto.armas || [],
      armaduras: personajeCompleto.armaduras || [],
      atributos: personajeCompleto.atributos || {},
      // Datos de combate/partida (valores iniciales)
      vidaActual: personajeCompleto.atributos?.hp || 10,
      vidaTemporal: 0,
      posicion: { x: 0, y: 0, z: 0 }
    }
    equipo.personajes.push(nuevaInstancia)
  }
  cerrarModal()
}

function cargarPersonajeCompleto(personajeId: string): any {
  try {
    const personajeString = localStorage.getItem(personajeId)
    if (!personajeString) return null
    return JSON.parse(personajeString)
  } catch (error) {
    console.error('Error al cargar personaje completo:', error)
    return null
  }
}

function eliminarPersonajeDeEquipo(equipoId: string, instanciaId: string) {
  const equipo = equipos.value.find(e => e.id === equipoId)
  if (equipo) {
    equipo.personajes = equipo.personajes.filter(p => p.instanciaId !== instanciaId)
  }
}

function cargarPersonajesDisponibles() {
  try {
    const listaIdsString = localStorage.getItem('lista_personajes')
    if (!listaIdsString) return

    const listaIds: string[] = JSON.parse(listaIdsString)
    const personajes: PersonajeInfo[] = []

    listaIds.forEach(id => {
      const personajeString = localStorage.getItem(id)
      if (personajeString) {
        const datos = JSON.parse(personajeString)
        // Solo cargar personajes completos
        if (datos.nombre && datos.trasfondo && datos.oficio && datos.estilo_marcial) {
          personajes.push({
            id: datos.id,
            nombre: datos.nombre,
            nivel: datos.nivel,
            oficio: datos.oficio,
            estilo_marcial: datos.estilo_marcial
          })
        }
      }
    })

    personajesDisponibles.value = personajes
  } catch (error) {
    console.error('Error al cargar personajes:', error)
  }
}

function guardarPartida() {
  if (!nombrePartida.value || equipos.value.length === 0) {
    alert('⚠️ Por favor, completa el nombre de la partida y agrega al menos un equipo.')
    return
  }

  try {
    const id = `partida_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    
    const datosPartida = {
      id: id,
      nombre: nombrePartida.value,
      equipos: equipos.value,
      fechaCreacion: new Date().toISOString()
    }

    // Guardar en localStorage
    localStorage.setItem(id, JSON.stringify(datosPartida, null, 2))

    // Agregar a la lista de partidas
    const listaString = localStorage.getItem('lista_partidas')
    const lista: string[] = listaString ? JSON.parse(listaString) : []
    
    if (!lista.includes(id)) {
      lista.push(id)
      localStorage.setItem('lista_partidas', JSON.stringify(lista))
    }

    console.log('✅ Partida guardada correctamente')
    
    // Volver a la lista de partidas
    volver()
  } catch (error) {
    console.error('❌ Error al guardar partida:', error)
    alert('Error al guardar la partida. Por favor, inténtalo de nuevo.')
  }
}

onMounted(() => {
  cargarPersonajesDisponibles()
})
</script>

<style scoped>
</style>
