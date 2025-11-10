<template> 

<body class="bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
  <div id="app" class="max-w-7xl mx-auto">
    <div class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-8 shadow-xl">
      <!-- Botón Volver -->
      <div class="mb-4">
        <button
          @click="volver"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg flex items-center gap-2"
        >
          ← Volver a Personajes
        </button>
      </div>

      <!-- Navegación por pestañas -->
      <div class="mb-6">
        <nav class="flex gap-2 border-b-2 border-gray-200">
          <button
            @click="currentTab = 'ficha'"
            :class="[
              'px-6 py-3 font-semibold transition-all duration-200',
              currentTab === 'ficha'
                ? 'border-b-4 border-blue-500 text-blue-600 -mb-0.5'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            ]"
          >
            Ficha
          </button>
          <button
            @click="currentTab = 'arbol'"
            :class="[
              'px-6 py-3 font-semibold transition-all duration-200',
              currentTab === 'arbol'
                ? 'border-b-4 border-blue-500 text-blue-600 -mb-0.5'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            ]"
          >
            Árbol
          </button>
          <button
            @click="currentTab = 'inventario'"
            :class="[
              'px-6 py-3 font-semibold transition-all duration-200',
              currentTab === 'inventario'
                ? 'border-b-4 border-blue-500 text-blue-600 -mb-0.5'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            ]"
          >
            Inventario
          </button>
        </nav>
      </div>
      
      <h2 class="text-4xl font-bold text-gray-600 mb-6 pb-4 border-b border-gray-200 text-center">
        {{ personaje.nombre }}
      </h2>

      <!-- Contenido de Ficha -->
      <div v-if="currentTab === 'ficha'">
        <!-- Grid Principal -->
        <div class="grid grid-cols-12 gap-6">
        
        <!-- Columna Izquierda -->
        <div class="col-span-4 space-y-6">
          
          <!-- Información Básica -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
            <h3 class="text-base font-bold text-gray-700 mb-2 pb-2 border-b border-blue-300">Información Básica</h3>
            <div class="space-y-2">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Nombre</div>
                  <div class="text-base font-bold text-gray-800">{{ personaje.nombre }}</div>
                </div>
                <div>
                  <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Nivel</div>
                  <div class="text-lg font-bold text-gray-800">{{ personaje.nivel }}</div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Oficio</div>
                  <div class="text-sm font-bold text-gray-800">{{ personaje.oficio }}</div>
                </div>
                <div>
                  <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Trasfondo</div>
                  <div class="text-sm font-bold text-gray-800">{{ personaje.trasfondo }}</div>
                </div>
              </div>
              <div>
                <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Estilo Marcial</div>
                <div class="text-sm font-bold text-gray-800">{{ personaje.estiloMarcial }}</div>
              </div>
            </div>
          </div>

          <!-- Dotes de Oficio -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 class="text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300">Dotes de Oficio</h3>
            <div class="max-h-120 overflow-y-auto overflow-x-visible pr-2 space-y-2">
              <div 
                v-for="dote in personaje.dotesOficio" 
                :key="dote.nombre"
                class="bg-white border border-blue-300 rounded-lg p-3 relative group cursor-pointer hover:bg-blue-50 transition-colors"
                style="overflow: visible;"
              >
                <div class="font-semibold text-gray-600 text-sm">{{ dote.nombre }}</div>
                <!-- Tooltip con descripción al hover -->
                <div class="tooltip-box">
                  {{ dote.descripcion }}
                </div>
              </div>
            </div>
          </div>

          <!-- Dotes de Estilo Marcial -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 class="text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300">Dotes de Estilo Marcial</h3>
            <div class="max-h-64 overflow-y-auto overflow-x-visible pr-2 space-y-2">
              <div 
                v-for="dote in personaje.dotesEstilo" 
                :key="dote.nombre"
                class="bg-white border border-blue-300 rounded-lg p-3 relative group cursor-pointer hover:bg-blue-50 transition-colors"
                style="overflow: visible;"
              >
                <div class="font-semibold text-gray-600 text-sm">{{ dote.nombre }}</div>
                <!-- Tooltip con descripción al hover -->
                <div class="tooltip-box">
                  {{ dote.descripcion }}
                </div>
              </div>
            </div>
          </div>

          <!-- Habilidades Activas -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 class="text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300">Habilidades Activas</h3>
            <div class="space-y-2 overflow-x-visible">
              <div 
                v-for="activa in personaje.activas" 
                :key="activa.nombre"
                class="bg-white border border-blue-300 rounded-lg p-3 relative group cursor-pointer hover:bg-blue-50 transition-colors"
                style="overflow: visible;"
              >
                <div class="font-semibold text-gray-600 text-sm">{{ activa.nombre }}</div>
                <!-- Tooltip con descripción al hover -->
                <div class="tooltip-box">
                  {{ activa.descripcion }}
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Columna Central -->
        <div class="col-span-4 space-y-4">
          
          <!-- HP y Armadura -->
          <div class="grid grid-cols-2 gap-3">
            <!-- HP -->
            <div class="bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-400 text-gray-700 rounded-lg p-3 shadow-lg">
              <div class="text-white text-center">
                <div class="text-xs font-bold uppercase tracking-wide text-gray-700 mb-1">HP</div>
                <div class="text-3xl font-bold text-blue-600">{{ personaje.hp.actual }}</div>
              </div>
            </div>
            
            <!-- Armadura -->
            <div class="bg-gradient-to-r  from-blue-100 to-blue-200 border-2 border-blue-400 rounded-lg p-3 shadow-lg">
              <div class="text-white">
                <div class="text-xs font-bold uppercase tracking-wide text-gray-700 mb-2 text-center">Armadura</div>
                <div class="grid grid-cols-3 gap-1">
                  <div class="text-center">
                    <div class="text-lg font-bold text-gray-700">L</div>
                    <div class="text-2xl font-bold text-blue-600">{{ personaje.armadura.lacerante }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-lg font-bold text-gray-700">P</div>
                    <div class="text-2xl font-bold text-blue-600">{{ personaje.armadura.penetrante }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-lg font-bold text-gray-700">C</div>
                    <div class="text-2xl font-bold text-blue-600">{{ personaje.armadura.contundente }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Estadísticas Principales - Más compactas -->
          <div class="grid grid-cols-3 gap-2">
            <!-- Cuerpo -->
            <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-2">
              <div class="text-center mb-2 pb-1 border-b border-blue-300">
                <h3 class="text-sm font-bold text-gray-700">Cuerpo</h3>
                <div class="text-xl font-bold text-blue-600">{{ personaje.cuerpo.total }}</div>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between items-center text-xs px-1">
                  <span class="text-gray-600">Poderío</span>
                  <span class="font-bold text-blue-600">{{ personaje.cuerpo.poderio }}</span>
                </div>
                <div class="flex justify-between items-center text-xs px-1">
                  <span class="text-gray-600">Movimiento</span>
                  <span class="font-bold text-blue-600">{{ personaje.cuerpo.movimiento }}</span>
                </div>
                <div class="flex justify-between items-center text-xs px-1">
                  <span class="text-gray-600">Resistencia</span>
                  <span class="font-bold text-blue-600">{{ personaje.cuerpo.resistencia }}</span>
                </div>
              </div>
            </div>

            <!-- Agilidad -->
            <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-2">
              <div class="text-center mb-2 pb-1 border-b border-blue-300">
                <h3 class="text-sm font-bold text-gray-700">Agilidad</h3>
                <div class="text-xl font-bold text-blue-600">{{ personaje.agilidad.total }}</div>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between items-center text-xs px-1">
                  <span class="text-gray-600">Esquiva</span>
                  <span class="font-bold text-blue-600">{{ personaje.agilidad.esquiva }}</span>
                </div>
                <div class="flex justify-between items-center text-xs px-1">
                  <span class="text-gray-600">Iniciativa</span>
                  <span class="font-bold text-blue-600">{{ personaje.agilidad.iniciativa }}</span>
                </div>
                <div class="flex justify-between items-center text-xs px-1">
                  <span class="text-gray-600">Deadeye</span>
                  <span class="font-bold text-blue-600">{{ personaje.agilidad.deadeye }}</span>
                </div>
              </div>
            </div>

            <!-- Mente -->
            <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-2">
              <div class="text-center mb-2 pb-1 border-b border-blue-300">
                <h3 class="text-sm font-bold text-gray-700">Mente</h3>
                <div class="text-xl font-bold text-blue-600">{{ personaje.mente.total }}</div>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between items-center text-xs px-1">
                  <span class="text-gray-600">Voluntad</span>
                  <span class="font-bold text-blue-600">{{ personaje.mente.voluntad }}</span>
                </div>
                <div class="flex justify-between items-center text-xs px-1">
                  <span class="text-gray-600">Pts. Hab.</span>
                  <span class="font-bold text-blue-600">{{ personaje.mente.puntosHabilidadRestantes }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Acciones y Reacciones -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-purple-50 border-2 border-purple-300 rounded-lg p-2 text-center">
              <div class="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">Acciones</div>
              <div class="text-2xl font-bold text-purple-600">{{ personaje.acciones }}</div>
            </div>
            <div class="bg-purple-50 border-2 border-purple-300 rounded-lg p-2 text-center">
              <div class="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">Reacciones</div>
              <div class="text-2xl font-bold text-purple-600">{{ personaje.reacciones }}</div>
            </div>
          </div>

          <!-- Armas y Armaduras -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h3 class="text-base font-bold text-gray-700 mb-2 pb-2 border-b border-blue-300">Armas</h3>
            <div class="gap-2 mb-4">
              <div 
                v-for="arma in personaje.armas" 
                :key="arma.nombre"
                class="bg-white border border-blue-300 rounded-lg p-2 mb-2"
              >
                <div class="flex justify-between items-start mb-1">
                  <div class="font-semibold text-gray-600 text-sm">{{ arma.nombre }}</div>
                  <div class="flex gap-1 flex-wrap">
                    <span 
                      v-for="etiqueta in arma.etiquetas" 
                      :key="etiqueta"
                      class="px-1 py-0.5 bg-blue-500 text-white text-xs rounded-full"
                    >
                      {{ etiqueta }}
                    </span>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-1 text-xs mb-1">
                  <div class="bg-blue-50 rounded p-1 text-center">
                    <div class="text-blue-600 font-semibold">L: {{ arma.lac }}</div>
                  </div>
                  <div class="bg-blue-50 rounded p-1 text-center">
                    <div class="text-blue-600 font-semibold">P: {{ arma.cor }}</div>
                  </div>
                  <div class="bg-blue-50 rounded p-1 text-center">
                    <div class="text-blue-600 font-semibold">C: {{ arma.con }}</div>
                  </div>
                </div>
                <div class="flex justify-between text-xs text-blue-600">
                  <span>Crít: x{{ arma.critico }} ({{ arma.rangoCritico }})</span>
                  <span v-if="arma.distancia > 0">Dist: {{ arma.distancia }}m</span>
                </div>
              </div>
            </div>

            <div class="border-t-2 border-blue-300 pt-3 mt-3">
              <h3 class="text-base font-bold text-gray-700 mb-2">Armaduras Equipadas</h3>
              <div class="gap-2">
                <div 
                  v-for="armadura in personaje.armaduras" 
                  :key="armadura.nombre"
                  class="bg-white border border-blue-300 rounded-lg p-2 mb-2"
                >
                  <div class="flex justify-between items-start mb-1">
                    <div class="font-semibold text-gray-600 text-sm">{{ armadura.nombre }}</div>
                    <div class="flex gap-1 flex-wrap">
                      <span 
                        v-for="etiqueta in armadura.etiquetas" 
                        :key="etiqueta"
                        class="px-1 py-0.5 bg-gray-500 text-white text-xs rounded-full"
                      >
                        {{ etiqueta }}
                      </span>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-1 text-xs">
                    <div class="bg-gray-50 rounded p-1 text-center">
                      <div class="text-gray-600 font-semibold">L: {{ armadura.lac }}</div>
                    </div>
                    <div class="bg-gray-50 rounded p-1 text-center">
                      <div class="text-gray-600 font-semibold">P: {{ armadura.cor }}</div>
                    </div>
                    <div class="bg-gray-50 rounded p-1 text-center">
                      <div class="text-gray-600 font-semibold">C: {{ armadura.con }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Columna Derecha -->
        <div class="col-span-4 space-y-6">
          
          <!-- Habilidades -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 class="text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300">Habilidades</h3>
            <div class="max-h-[900px] overflow-y-auto pr-2 space-y-1">
              <div 
                v-for="habilidad in personaje.habilidades" 
                :key="habilidad.nombre"
                class="flex justify-between items-center bg-white border border-blue-300 rounded-lg p-2 hover:bg-blue-100 transition-colors"
              >
                <div class="flex items-center gap-2">
                  <div v-if="habilidad.competente" class="w-4 h-4 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-xs font-bold">✓</span>
                  </div>
                  <div v-else class="w-4 h-4 border-2 border-blue-300 rounded flex-shrink-0"></div>
                  <span class="font-semibold text-gray-600 text-sm">{{ habilidad.nombre }}</span>
                </div>
                <span class="text-lg font-bold text-blue-800">{{ habilidad.total >= 0 ? '+' : '' }}{{ habilidad.total }}</span>
              </div>
            </div>
          </div>

        </div>

        </div>
      </div>

      <!-- Contenido de Árbol -->
      <div v-if="currentTab === 'arbol'">
        <Arbol v-if="personajeGuardado" :arbol-data="personajeGuardado.arbol || '[]'" />
        <div v-else class="text-center py-16">
          <p class="text-2xl text-gray-500">Cargando árbol...</p>
        </div>
      </div>

      <!-- Contenido de Inventario -->
      <div v-if="currentTab === 'inventario'" class="text-center py-16">
        <p class="text-2xl text-gray-500">Vista de Inventario</p>
        <p class="text-gray-400 mt-2">Contenido próximamente...</p>
      </div>

    </div>
  </div>
</body>
</template>  


<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import armasData from '../../assets/armas.json'
import armadurasData from '../../assets/armaduras.json'
import oficiosData from '../../assets/oficios/oficios.json'
import estilosMarciales from '../../assets/estiloMarcial/estiloMarcial.json'
import activasData from '../../assets/activas.json'
import habilidadesData from '../../assets/habilidades.json'
import Arbol from './arbol.vue'

const props = defineProps<{
  characterId?: string
}>()

// Estado para controlar la pestaña activa
const currentTab = ref<'ficha' | 'arbol' | 'inventario'>('ficha')

// Inject navigation function from App.vue
const navigateToCharacters = inject<() => void>('navigateToCharacters')

function volver() {
  if (navigateToCharacters) {
    navigateToCharacters()
  }
}

// Datos cargados del localStorage
const personajeGuardado = ref<any>(null)

// Objeto del personaje formateado para la UI
const personaje = ref({
  nombre: '',
  nivel: 1,
  trasfondo: '',
  oficio: '',
  estiloMarcial: '',
  
  hp: {
    actual: 0,
    maximo: 0
  },
  
  armadura: {
    lacerante: 0,
    penetrante: 0,
    contundente: 0
  },
  
  cuerpo: {
    total: 0,
    poderio: 0,
    movimiento: 0,
    resistencia: 0
  },
  
  agilidad: {
    total: 0,
    esquiva: 0,
    iniciativa: 0,
    deadeye: 0
  },
  
  mente: {
    total: 0,
    voluntad: 0,
    puntosHabilidadRestantes: 0
  },
  
  acciones: 0,
  reacciones: 0,
  
  dotesOficio: [] as Array<{ nombre: string, descripcion: string }>,
  dotesEstilo: [] as Array<{ nombre: string, descripcion: string }>,
  activas: [] as Array<{ nombre: string, descripcion: string }>,
  habilidades: [] as Array<{ nombre: string, competente: boolean, total: number }>,
  armas: [] as Array<any>,
  armaduras: [] as Array<any>
})

// Función para cargar el personaje desde localStorage
function cargarPersonaje() {
  try {
    if (!props.characterId) {
      console.warn('No se proporcionó ID de personaje para cargar la ficha.');
      return;
    }

    const personajeJSON = localStorage.getItem(props.characterId);
    
    if (!personajeJSON) {
      console.warn(`No se encontró personaje guardado en localStorage con ID: ${props.characterId}`);
      return;
    }
    
    personajeGuardado.value = JSON.parse(personajeJSON)
    const datos = personajeGuardado.value
    
    // Información básica
    personaje.value.nombre = datos.nombre || ''
    personaje.value.nivel = datos.nivel || 1
    personaje.value.trasfondo = datos.trasfondo || ''
    personaje.value.oficio = datos.oficio || ''
    personaje.value.estiloMarcial = datos.estilo_marcial || ''
    
    // HP
    personaje.value.hp.maximo = datos.atributos?.hp || 10
    personaje.value.hp.actual = datos.atributos?.hp || 10 // Por defecto, vida completa
    
    // Atributos - Cuerpo
    personaje.value.cuerpo.total = datos.atributos?.cuerpo || 0
    personaje.value.cuerpo.poderio = datos.atributos?.poderio || 0
    personaje.value.cuerpo.movimiento = datos.atributos?.movimiento || 3
    personaje.value.cuerpo.resistencia = datos.atributos?.resistencia || 0
    
    // Atributos - Agilidad
    personaje.value.agilidad.total = datos.atributos?.agilidad || 0
    personaje.value.agilidad.esquiva = datos.atributos?.evasion || 12
    personaje.value.agilidad.iniciativa = datos.atributos?.iniciativa || 0
    personaje.value.agilidad.deadeye = datos.atributos?.punteria || 0
    
    // Atributos - Mente
    personaje.value.mente.total = datos.atributos?.mente || 0
    personaje.value.mente.voluntad = datos.atributos?.regeneracion || 2
    personaje.value.mente.puntosHabilidadRestantes = datos.atributos?.puntosHabilidad || 10
    
    // Acciones y Reacciones
    personaje.value.acciones = datos.atributos?.acciones || 0
    personaje.value.reacciones = datos.atributos?.reacciones || 0
    
    // Cargar dotes de oficio
    if (datos.oficio) {
      const oficio = oficiosData.oficios.find(o => o.nombre === datos.oficio)
      if (oficio && datos.oficio_dotes) {
        console.log('Dotes de oficio guardadas:', datos.oficio_dotes)
        
        personaje.value.dotesOficio = datos.oficio_dotes.map((doteId: number) => {
          const dote = oficio.dotes.find((d: any) => d.id === doteId)
          if (dote) {
            return {
              nombre: dote.nombre,
              descripcion: dote.descripcion
            }
          }
          return {
            nombre: `Dote ID: ${doteId}`,
            descripcion: 'Descripción no disponible'
          }
        })
        
        console.log('Dotes de oficio cargadas:', personaje.value.dotesOficio)
      } else if (oficio) {
        // Si no hay dotes guardadas, mostrar todas las dotes del oficio (comportamiento legacy)
        personaje.value.dotesOficio = oficio.dotes.map(dote => ({
          nombre: dote.nombre,
          descripcion: dote.descripcion
        }))
      }
    }
    
    // Cargar dotes de estilo marcial
    if (datos.estilo_marcial) {
      const estilo = estilosMarciales.estiloMarcial.find((e: any) => e.nombre === datos.estilo_marcial)
      if (estilo && datos.estilo_marcial_dotes) {
        console.log('Dotes guardadas:', datos.estilo_marcial_dotes)
        console.log('Estilo encontrado:', estilo.nombre)
        
        personaje.value.dotesEstilo = datos.estilo_marcial_dotes.map((doteId: string) => {
          // Extraer el número del ID (formato: "EstiloMarcial_123" -> 123)
          const partes = doteId.split('_')
          const idNumerico = partes.length > 1 && partes[1]
            ? parseInt(partes[1]) 
            : parseInt(doteId)
          
          // Buscar la dote por ID en el estilo marcial actual
          const dote = estilo.dotes.find((d: any) => d.id === idNumerico)
          
          if (dote) {
            console.log(`Dote encontrada: ${dote.nombre} (ID: ${idNumerico})`)
            return {
              nombre: dote.nombre,
              descripcion: dote.descripcion
            }
          } else {
            console.warn(`Dote no encontrada para ID: ${doteId} (numérico: ${idNumerico})`)
            return { 
              nombre: `Dote ID: ${doteId}`, 
              descripcion: 'Descripción no disponible' 
            }
          }
        })
        
        console.log('Dotes de estilo cargadas:', personaje.value.dotesEstilo)
      }
    }
    
    // Cargar activas desde el árbol
    if (datos.arbol) {
      try {
        const nodosArbol = JSON.parse(datos.arbol)
        const activasPersonaje: Array<{ nombre: string, descripcion: string }> = []
        
        nodosArbol.forEach((nodo: any) => {
          if (nodo.type === 'square') { // Los nodos cuadrados son activas
            const activa = activasData.activas.find(a => a.id === parseInt(nodo.nodeId))
            if (activa) {
              activasPersonaje.push({
                nombre: activa.nombre,
                descripcion: activa.descripcion
              })
            }
          }
        })
        
        personaje.value.activas = activasPersonaje
      } catch (error) {
        console.error('Error parseando árbol:', error)
      }
    }
    
    // Cargar habilidades - Construir siempre desde JSON completo
    try {
      console.log('Construyendo habilidades desde JSON completo')
      
      // Obtener las habilidades guardadas si existen
      let habilidadesGuardadas: any[] = []
      if (datos.habilidades) {
        if (typeof datos.habilidades === 'string') {
          habilidadesGuardadas = JSON.parse(datos.habilidades)
        } else {
          habilidadesGuardadas = datos.habilidades
        }
        console.log('Habilidades guardadas encontradas:', habilidadesGuardadas.length)
      }
      
      // Obtener habilidades del trasfondo y oficio
      const habilidadesTrasfondo = datos.trasfondo_habilidades || []
      const habilidadesOficio = datos.oficio_habilidades || []
      console.log('Habilidades de trasfondo:', habilidadesTrasfondo)
      console.log('Habilidades de oficio:', habilidadesOficio)
      
      // Construir lista completa desde habilidadesData.json - MOSTRAR TODAS
      personaje.value.habilidades = habilidadesData.habilidades
        .map(hab => {
          // Buscar si hay datos guardados para esta habilidad
          const guardada = habilidadesGuardadas.find((h: any) => h.id === hab.id || h.nombre === hab.nombre)
          
          // Verificar si viene del trasfondo u oficio
          const esDeTrasfondo = habilidadesTrasfondo.includes(hab.nombre)
          const esDeOficio = habilidadesOficio.includes(hab.nombre)
          
          // La habilidad está "activa/marcada" si:
          // 1. Está guardada como activa en habilidades.vue, O
          // 2. Viene del trasfondo/oficio (siempre marcada)
          const activa = guardada ? (guardada.activa === true) : (esDeTrasfondo || esDeOficio)
          
          // Calcular el modificador de atributo
          let modAtributo = 0
          if (hab.atributo === 'Cuerpo') {
            modAtributo = datos.atributos?.cuerpo || 0
          } else if (hab.atributo === 'Agilidad') {
            modAtributo = datos.atributos?.agilidad || 0
          } else if (hab.atributo === 'Mente' || hab.atributo === 'Artesania' || hab.atributo === 'Recoleccion') {
            modAtributo = datos.atributos?.mente || 0
          }
          
          // Calcular el total
          const rangos = guardada?.rangos || 0
          const bonifDiversos = guardada?.bonifDiversos || 0
          
          // Total = modificador de atributo + rangos + bonificadores diversos
          const total = modAtributo + rangos + bonifDiversos
          
          console.log(`${hab.nombre}: activa=${activa}, mod=${modAtributo}, rangos=${rangos}, bonif=${bonifDiversos}, total=${total}`)
          
          return {
            nombre: hab.nombre,
            competente: activa,
            total: total
          }
        })
        // NO FILTRAR - Mostrar TODAS las habilidades
      
      console.log('Total de habilidades mostradas:', personaje.value.habilidades.length)
    } catch (error) {
      console.error('Error construyendo habilidades:', error)
      personaje.value.habilidades = []
    }
    
    // Cargar armas
    if (datos.armas && Array.isArray(datos.armas)) {
      console.log('Cargando armas:', datos.armas)
      personaje.value.armas = datos.armas.map((armaId: number) => {
        const arma = armasData.armas.find(a => a.id === armaId)
        if (arma) {
          return {
            nombre: arma.nombre,
            lac: arma.lacerante,
            cor: arma.penetrante,
            con: arma.contundente,
            critico: arma.critico,
            rangoCritico: arma.rango_critico || '-',
            distancia: arma.distancia_max || 0,
            etiquetas: arma.categoria ? arma.categoria.split(',').map((e: string) => e.trim()) : []
          }
        }
        return null
      }).filter((arma: any) => arma !== null)
      console.log('Armas cargadas:', personaje.value.armas.length)
    }
    
    // Cargar armaduras
    if (datos.armaduras && Array.isArray(datos.armaduras)) {
      console.log('Cargando armaduras:', datos.armaduras)
      personaje.value.armaduras = datos.armaduras.map((armaduraId: number) => {
        const armadura = armadurasData.armaduras.find(a => a.id === armaduraId)
        if (armadura) {
          return {
            nombre: armadura.nombre,
            lac: armadura.lacerante,
            cor: armadura.penetrante,
            con: armadura.contundente,
            etiquetas: armadura.categoria ? [armadura.categoria] : []
          }
        }
        return null
      }).filter((armadura: any) => armadura !== null)
      console.log('Armaduras cargadas:', personaje.value.armaduras.length)
    }
    
    // Calcular armadura total (armaduras + resistencia)
    // La resistencia es el valor de Cuerpo.resistencia
    const resistencia = personaje.value.cuerpo.resistencia
    
    // Sumar todas las armaduras equipadas
    let armaduraTotal = {
      lacerante: resistencia,
      penetrante: resistencia,
      contundente: resistencia
    }
    
    personaje.value.armaduras.forEach((armadura: any) => {
      armaduraTotal.lacerante += armadura.lac
      armaduraTotal.penetrante += armadura.cor
      armaduraTotal.contundente += armadura.con
    })
    
    // TODO: Añadir escudo cuando esté implementado
    
    personaje.value.armadura = armaduraTotal
    console.log('Armadura total calculada:', armaduraTotal)
    
    console.log('✅ Personaje cargado exitosamente:', personaje.value)
  } catch (error) {
    console.error('❌ Error al cargar el personaje:', error)
  }
}

onMounted(() => {
  cargarPersonaje()
})

        
</script>

<style scoped>
/* Ocultar barra de scroll pero mantener funcionalidad */
.overflow-y-auto::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.overflow-y-auto {
  -ms-overflow-style: none;  /* IE y Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Estilos para los tooltips */
.tooltip-box {
  position: fixed;
  left: auto;
  top: auto;
  margin-top: 0.5rem;
  width: 20rem;
  max-width: 90vw;
  background-color: white;
  color: #374151;
  font-size: 0.75rem;
  line-height: 1.5rem;
  border-radius: 0.75rem;
  padding: 0.875rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  pointer-events: none;
  border: 1px solid #e5e7eb;
}

.group:hover .tooltip-box {
  opacity: 1;
  visibility: visible;
}

/* Permitir que el tooltip salga del contenedor */
.group {
  position: relative;
  z-index: 1;
}

.group:hover {
  z-index: 9998;
}
</style>

