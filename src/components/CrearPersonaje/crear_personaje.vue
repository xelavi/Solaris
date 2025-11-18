<template>
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen p-6">
    <div class="max-w-350 mx-auto">
      <!-- Botón Volver a Personajes -->
      <div class="mb-4">
        <button
          @click="volverAPersonajes"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg flex items-center gap-2"
        >
          ← Volver a Personajes
        </button>
      </div>

      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-600 mb-2 drop-shadow-lg">
          Creación de Personaje
        </h1>
        
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-4 shadow-xl">
            <h2 class="text-lg font-bold text-gray-700 mb-4 pb-3 border-b border-gray-200">
              Índice
            </h2>
            <nav class="space-y-2">
              <button
                v-for="(step, index) in steps"
                :key="index"
                @click="currentStep = index"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200',
                  currentStep === index
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-blue-50 text-gray-700 hover:bg-gray-100 hover:text-gray-800'
                ]"
              >
                <span class="flex items-center gap-3">
                  <span :class="[
                    'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                    currentStep === index
                      ? 'bg-white text-blue-500'
                      : 'bg-gray-200 text-blue-700'
                  ]">
                    {{ index + 1 }}
                  </span>
                  {{ step }}
                </span>
              </button>
            </nav>
          </div>
        </div>

        <div class="flex-1">
          <div class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-8 shadow-xl min-h-[500px]">
            <h2 class="text-3xl font-bold text-gray-600 mb-6 pb-4 border-b border-gray-200">
              {{ steps[currentStep] }}
            </h2>
            <div v-if="currentStep === 0" class="space-y-6">
                <general></general>
            </div>
            <div v-if="currentStep === 1" class="space-y-6">
                <trasfondo></trasfondo>
            </div>
             <div v-if="currentStep === 2" class="space-y-6">
                <oficio></oficio>
            </div>
            <div v-if="currentStep === 3" class="space-y-6">
                <estilo_marcial></estilo_marcial>
            </div>
             <div v-if="currentStep === 4" class="space-y-6">
                <arbol></arbol>
            </div>
            <div v-if="currentStep === 5" class="space-y-6">
                <habilidades></habilidades>
            </div>
            <div v-if="currentStep === 6" class="space-y-6">
                <equipo></equipo>
            </div>

            <div class="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                @click="currentStep = Math.max(0, currentStep - 1)"
                :disabled="currentStep === 0"
                :class="[
                  'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg'
                ]"
              >
                ← Anterior
              </button>

              <button
                @click="currentStep = Math.min(steps.length - 1, currentStep + 1)"
                :disabled="currentStep === steps.length - 1"
                :class="[
                  'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
                  currentStep === steps.length - 1
                    ? 'bg-blue-100 text-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30'
                ]"
              >
                Siguiente →
              </button>

              <div class="border-l-2 border-gray-300 h-10 mx-2"></div>

              <button
                @click="debugDatos"
                class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
              >
                � Debug
              </button>

              <div class="px-6 py-3 text-green-500 font-semibold flex items-center gap-2">
                <span>✓</span>
                <span>Guardado automático</span>
              </div>

              <button
                @click="verFicha"
                class="px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30 flex items-center gap-2"
              >
                <span>📋</span>
                <span>Ver Ficha</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, watch } from 'vue'
import general from './general.vue'
import trasfondo from './trasfondo.vue' 
import oficio from './oficio.vue' 
import estilo_marcial from './estilo_marcial.vue'
import arbol from './arbol.vue'
import habilidades from './habilidades.vue'
import equipo from './equipo.vue'
import { useCharacterCreation } from '../../domain/useCharacterCreation'

const currentStep = ref(0)

const steps = [
  'Información General',
  'Trasfondo',
  'Oficio',
  'Estilo Marcial',
  'Arbol',
  'Habilidades',
  'Equipo'
]

const { characterData, saveCharacterData, loadCharacterData, getCurrentCharacter, resetCharacterData } = useCharacterCreation()

// Inject navigation functions from App.vue
const navigateToFicha = inject<(id: string) => void>('navigateToFicha')
const navigateToCharacters = inject<() => void>('navigateToCharacters')

function volverAPersonajes() {
  // Verificar si el personaje está completo
  const character = getCurrentCharacter()
  const id = personajeId.value || localStorage.getItem('personaje_en_creacion_id')
  
  // Si el personaje no tiene los datos esenciales, eliminarlo
  if (id && character) {
    const tieneNombre = character.name && character.name.trim() !== ''
    const tieneTrasfondo = character.trasfondo && character.trasfondo.trim() !== ''
    const tieneOficio = character.oficio && character.oficio.trim() !== ''
    const tieneEstiloMarcial = character.estilo_marcial && character.estilo_marcial.trim() !== ''
    
    if (!tieneNombre || !tieneTrasfondo || !tieneOficio || !tieneEstiloMarcial) {
      console.log('⚠️ Personaje incompleto, eliminando del localStorage...')
      
      // Eliminar el personaje del localStorage
      localStorage.removeItem(id)
      
      // Eliminar de la lista de personajes
      const listaString = localStorage.getItem('lista_personajes')
      if (listaString) {
        const lista: string[] = JSON.parse(listaString)
        const listaFiltrada = lista.filter(personajeId => personajeId !== id)
        localStorage.setItem('lista_personajes', JSON.stringify(listaFiltrada))
      }
      
      // Limpiar el ID de personaje en creación
      localStorage.removeItem('personaje_en_creacion_id')
      
      // Resetear los datos del personaje en memoria
      resetCharacterData()
      
      console.log('✅ Personaje incompleto eliminado')
    }
  }
  
  if (navigateToCharacters) {
    navigateToCharacters()
  }
}

function verFicha() {
  const character = getCurrentCharacter()
  if (!character || !character.name) {
    alert('⚠️ Por favor, guarda el personaje primero antes de ver la ficha')
    return
  }
  
  // Verificar que hay datos guardados en localStorage con el ID actual
  const id = obtenerOGenerarId()
  const personajeGuardado = localStorage.getItem(id)
  if (!personajeGuardado) {
    alert('⚠️ No hay personaje guardado. Por favor, guarda el personaje primero.')
    return
  }
  
  // Navegar a la ficha con el ID del personaje
  if (navigateToFicha) {
    navigateToFicha(id)
  }
}

function debugDatos() {
  console.log('=== DEBUG DATOS ===')
  console.log('personajeId.value:', personajeId.value)
  console.log('characterData.value:', characterData.value)
  const character = getCurrentCharacter()
  console.log('character from partida:', character)
  console.log('character keys:', character ? Object.keys(character) : 'no character')
  console.log('character.name:', character?.name)
  console.log('character.nivel:', character?.nivel)
  console.log('character.oficio:', character?.oficio)
  console.log('character.trasfondo:', character?.trasfondo)
  console.log('character.estilo_marcial:', character?.estilo_marcial)
  console.log('character.arbol:', character?.arbol)
  console.log('character.atributos:', character?.atributos)
  
  // Mostrar lista de personajes guardados
  const listaString = localStorage.getItem('lista_personajes')
  const lista = listaString ? JSON.parse(listaString) : []
  console.log('Lista de personajes guardados:', lista)
  lista.forEach((id: string) => {
    const personaje = localStorage.getItem(id)
    if (personaje) {
      const datos = JSON.parse(personaje)
      console.log(`  - ${id}: ${datos.nombre} (nivel ${datos.nivel})`)
    }
  })
  
  console.log('==================')
}

// ID único del personaje actual (se genera una vez y se mantiene)
const personajeId = ref<string>('')

function obtenerOGenerarId(): string {
  if (personajeId.value) {
    return personajeId.value
  }
  
  // Intentar recuperar el ID del localStorage si existe un personaje en creación
  const idEnCreacion = localStorage.getItem('personaje_en_creacion_id')
  if (idEnCreacion) {
    personajeId.value = idEnCreacion
    return idEnCreacion
  }
  
  // Generar nuevo ID único
  const nuevoId = `personaje_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  personajeId.value = nuevoId
  localStorage.setItem('personaje_en_creacion_id', nuevoId)
  return nuevoId
}

function agregarAListaPersonajes(id: string) {
  try {
    const listaString = localStorage.getItem('lista_personajes')
    const lista: string[] = listaString ? JSON.parse(listaString) : []
    
    if (!lista.includes(id)) {
      lista.push(id)
      localStorage.setItem('lista_personajes', JSON.stringify(lista))
    }
  } catch (error) {
    console.error('Error al actualizar lista de personajes:', error)
  }
}

function guardarPersonaje() {
  try {
    // Usar directamente characterData que contiene todos los datos actualizados
    console.log('💾 Guardando personaje con characterData:', characterData.value)
    
    if (!characterData.value.nombre) {
      console.log('⚠️ No hay nombre de personaje, no se guarda')
      return
    }
    
    // Obtener o generar el ID del personaje
    const id = obtenerOGenerarId()
    
    // Guardar todos los datos de characterData directamente
    const datosParaGuardar = {
      id: id,
      nombre: characterData.value.nombre,
      nivel: characterData.value.nivel,
      oficio: characterData.value.oficio,
      oficio_habilidades: characterData.value.oficio_habilidades,
      oficio_dotes: characterData.value.oficio_dotes,
      estilo_marcial: characterData.value.estilo_marcial,
      estilo_marcial_dotes: characterData.value.estilo_marcial_dotes,
      trasfondo: characterData.value.trasfondo,
      trasfondo_habilidades: characterData.value.trasfondo_habilidades,
      raza: characterData.value.raza,
      arbol: characterData.value.arbol,
      habilidades: characterData.value.habilidades,
      armas: characterData.value.armas,
      armaduras: characterData.value.armaduras,
      atributos: characterData.value.atributos,
      fechaGuardado: new Date().toISOString()
    }
    
    console.log('✅ Datos preparados para guardar con ID:', id, datosParaGuardar)
    
    // Guardar en localStorage con el ID como clave
    localStorage.setItem(id, JSON.stringify(datosParaGuardar, null, 2))
    
    // Agregar a la lista de personajes
    agregarAListaPersonajes(id)
    
    console.log('✅ Guardado en localStorage completado')
  } catch (error) {
    console.error('❌ Error al guardar personaje:', error)
  }
}

onMounted(() => {
  // Cargar los datos del personaje en creación
  loadCharacterData()
  
  // Intentar cargar personaje existente si hay uno en creación
  const idEnCreacion = localStorage.getItem('personaje_en_creacion_id')
  if (idEnCreacion) {
    const personajeGuardado = localStorage.getItem(idEnCreacion)
    if (personajeGuardado) {
      try {
        const datos = JSON.parse(personajeGuardado)
        console.log('Personaje en creación encontrado:', datos)
        console.log('ID:', datos.id)
        console.log('Fecha de guardado:', datos.fechaGuardado)
        personajeId.value = idEnCreacion
      } catch (error) {
        console.error('Error al cargar personaje en creación:', error)
      }
    }
  } else {
    console.log('No hay personaje en creación actualmente')
  }
  
  // Después de cargar, configurar el guardado automático
  setTimeout(() => {
    isFirstLoad = false
  }, 1000)
})

// Watcher para guardar automáticamente en localStorage cuando cambien los datos del personaje
let isFirstLoad = true
let saveTimeout: ReturnType<typeof setTimeout> | null = null

// Vigilar cambios en characterData para guardar en localStorage
watch(() => {
  // Forzar la carga de datos del character al characterData antes de vigilar
  const character = getCurrentCharacter()
  if (character) {
    // Sincronizar characterData con los datos del character
    return JSON.stringify({
      nombre: character.name,
      nivel: character.nivel,
      oficio: character.oficio,
      oficio_habilidades: character.oficio_habilidades,
      oficio_dotes: character.oficio_dotes,
      estilo_marcial: character.estilo_marcial,
      estilo_marcial_dotes: character.estilo_marcial_dotes,
      trasfondo: character.trasfondo,
      trasfondo_habilidades: character.trasfondo_habilidades,
      raza: character.raza,
      arbol: character.arbol,
      habilidades: character.habilidades,
      armas: character.armas,
      armaduras: character.armaduras,
      atributos: character.atributos
    })
  }
  return JSON.stringify(characterData.value)
}, () => {
  if (isFirstLoad) return
  
  console.log('💾 Detectado cambio, guardando en localStorage...')
  
  // Cancelar el timeout anterior si existe
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  
  // Usar debounce para evitar guardados excesivos
  saveTimeout = setTimeout(() => {
    const character = getCurrentCharacter()
    if (character && character.name) {
      // Actualizar characterData con los datos más recientes del character
      characterData.value.nombre = character.name
      characterData.value.nivel = character.nivel
      characterData.value.oficio = character.oficio
      characterData.value.oficio_habilidades = character.oficio_habilidades || []
      characterData.value.oficio_dotes = character.oficio_dotes || []
      characterData.value.estilo_marcial = character.estilo_marcial
      characterData.value.estilo_marcial_dotes = character.estilo_marcial_dotes || []
      characterData.value.trasfondo = character.trasfondo
      characterData.value.trasfondo_habilidades = character.trasfondo_habilidades || []
      characterData.value.raza = character.raza
      characterData.value.arbol = character.arbol
      characterData.value.habilidades = character.habilidades
      characterData.value.armas = character.armas || []
      characterData.value.armaduras = character.armaduras || []
      characterData.value.atributos = character.atributos
      
      guardarPersonaje()
    } else {
      console.log('⚠️ No se guarda porque no hay nombre todavía')
    }
  }, 500)
})




</script>
<style scoped>
/* Ajustes responsivos para móvil */
.max-w-350 {
  max-width: 350px;
}
@media (max-width: 640px) {
  .max-w-350 {
    max-width: 100vw;
    padding: 0 !important;
  }
  .p-6 {
    padding: 0.5rem !important;
  }
  .p-8 {
    padding: 1rem !important;
  }
  .rounded-xl {
    border-radius: 0.75rem !important;
  }
  .lg\\:flex-row {
    flex-direction: column !important;
  }
  .lg\\:w-64 {
    width: 100% !important;
  }
  .flex-col {
    gap: 1rem !important;
  }
  .shadow-xl {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10) !important;
  }
  .text-4xl, .text-5xl, .text-3xl {
    font-size: 1.5rem !important;
  }
  .min-h-\[500px\] {
    min-height: 300px !important;
  }
  .border-l-2 {
    border-left: none !important;
    margin: 0 !important;
    height: 0 !important;
  }
  .flex {
    flex-wrap: wrap !important;
  }
  .items-center {
    align-items: stretch !important;
  }
}
</style>