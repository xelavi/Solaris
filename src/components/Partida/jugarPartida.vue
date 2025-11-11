<template>
  <div class="w-full h-screen relative">
    <!-- Canvas container -->
    <div ref="canvasContainer" class="w-full h-full"></div>
    
    <!-- UI Overlay - Info de partida -->
    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs">
      <h2 class="text-xl font-bold text-gray-800 mb-2">Mapa de Combate</h2>
      <div v-if="partidaActual" class="mb-3 p-2 bg-blue-50 rounded">
        <p class="text-sm font-semibold text-blue-800">{{ partidaActual.nombre }}</p>
        <p class="text-xs text-blue-600">{{ contarTotalPersonajes() }} personajes</p>
      </div>
      <div class="space-y-2 text-sm text-gray-600">
        <p>🖱️ <strong>Clic Izquierdo:</strong> Mover cámara</p>
        <p>🖱️ <strong>Rueda:</strong> Zoom</p>
        <p>🖱️ <strong>Clic Derecho:</strong> Rotar</p>
      </div>
    </div>

    <!-- Ficha de Personaje -->
    <div 
      v-if="personajeSeleccionado"
      class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 w-80 max-h-[90vh] overflow-y-auto"
    >
      <!-- Header con nombre -->
      <div class="flex justify-between items-start mb-3 pb-3 border-b-2 border-gray-200">
        <div>
          <h3 class="text-2xl font-bold text-gray-800">{{ personajeSeleccionado.nombre }}</h3>
          <p class="text-sm text-gray-600">Nivel {{ personajeSeleccionado.nivel }}</p>
        </div>
        <button
          @click="cerrarFicha"
          class="text-gray-400 hover:text-gray-600 text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <!-- Vida -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-semibold text-gray-700">Vida</span>
          <span class="text-sm font-bold text-red-600">
            {{ personajeSeleccionado.vidaActual }} / {{ personajeSeleccionado.atributos.hp }}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            class="bg-gradient-to-r from-red-500 to-red-600 h-full transition-all duration-300"
            :style="{ width: `${(personajeSeleccionado.vidaActual / personajeSeleccionado.atributos.hp) * 100}%` }"
          ></div>
        </div>
        <div v-if="personajeSeleccionado.vidaTemporal > 0" class="mt-1 text-xs text-blue-600">
          +{{ personajeSeleccionado.vidaTemporal }} vida temporal
        </div>
      </div>

      <!-- Información básica -->
      <div class="grid grid-cols-2 gap-2 mb-4">
        <div class="bg-blue-50 rounded p-2">
          <p class="text-xs text-blue-600 font-semibold">Oficio</p>
          <p class="text-sm text-gray-800 truncate">{{ personajeSeleccionado.oficio }}</p>
        </div>
        <div class="bg-purple-50 rounded p-2">
          <p class="text-xs text-purple-600 font-semibold">Estilo Marcial</p>
          <p class="text-sm text-gray-800 truncate">{{ personajeSeleccionado.estilo_marcial }}</p>
        </div>
        <div class="bg-green-50 rounded p-2">
          <p class="text-xs text-green-600 font-semibold">Trasfondo</p>
          <p class="text-sm text-gray-800 truncate">{{ personajeSeleccionado.trasfondo }}</p>
        </div>
        <div class="bg-orange-50 rounded p-2">
          <p class="text-xs text-orange-600 font-semibold">Raza</p>
          <p class="text-sm text-gray-800 truncate">{{ personajeSeleccionado.raza }}</p>
        </div>
      </div>

      <!-- Atributos principales -->
      <div class="mb-4">
        <h4 class="text-sm font-bold text-gray-700 mb-2">Atributos</h4>
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-red-50 rounded p-2 text-center">
            <p class="text-xs text-red-600 font-semibold">Cuerpo</p>
            <p class="text-lg font-bold text-gray-800">{{ personajeSeleccionado.atributos.cuerpo }}</p>
          </div>
          <div class="bg-green-50 rounded p-2 text-center">
            <p class="text-xs text-green-600 font-semibold">Agilidad</p>
            <p class="text-lg font-bold text-gray-800">{{ personajeSeleccionado.atributos.agilidad }}</p>
          </div>
          <div class="bg-blue-50 rounded p-2 text-center">
            <p class="text-xs text-blue-600 font-semibold">Mente</p>
            <p class="text-lg font-bold text-gray-800">{{ personajeSeleccionado.atributos.mente }}</p>
          </div>
        </div>
      </div>

      <!-- Estadísticas de combate -->
      <div class="mb-4">
        <h4 class="text-sm font-bold text-gray-700 mb-2">Combate</h4>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">⚔️ Poderío:</span>
            <span class="font-bold">{{ personajeSeleccionado.atributos.poderio }}</span>
          </div>
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">🎯 Puntería:</span>
            <span class="font-bold">{{ personajeSeleccionado.atributos.punteria }}</span>
          </div>
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">🛡️ Evasión:</span>
            <span class="font-bold">{{ personajeSeleccionado.atributos.evasion }}</span>
          </div>
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">🏃 Movimiento:</span>
            <span class="font-bold">{{ personajeSeleccionado.atributos.movimiento }}</span>
          </div>
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">⚡ Iniciativa:</span>
            <span class="font-bold">{{ personajeSeleccionado.atributos.iniciativa }}</span>
          </div>
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">🔄 Acciones:</span>
            <span class="font-bold">{{ personajeSeleccionado.atributos.acciones }}</span>
          </div>
        </div>
      </div>

      <!-- Armadura -->
      <div class="mb-4">
        <h4 class="text-sm font-bold text-gray-700 mb-2">🛡️ Armadura</h4>
        <div class="grid grid-cols-3 gap-2 text-xs">
          <div class="bg-slate-100 rounded p-2 text-center">
            <p class="text-gray-600">Penetrante</p>
            <p class="font-bold text-gray-800">{{ calcularArmadura(personajeSeleccionado).penetrante }}</p>
          </div>
          <div class="bg-slate-100 rounded p-2 text-center">
            <p class="text-gray-600">Lacerante</p>
            <p class="font-bold text-gray-800">{{ calcularArmadura(personajeSeleccionado).lacerante }}</p>
          </div>
          <div class="bg-slate-100 rounded p-2 text-center">
            <p class="text-gray-600">Contundente</p>
            <p class="font-bold text-gray-800">{{ calcularArmadura(personajeSeleccionado).contundente }}</p>
          </div>
        </div>
      </div>

      <!-- Armas -->
      <div v-if="obtenerArmas(personajeSeleccionado).length > 0" class="mb-4">
        <h4 class="text-sm font-bold text-gray-700 mb-2">🗡️ Armas</h4>
        <div class="space-y-1">
          <div 
            v-for="arma in obtenerArmas(personajeSeleccionado)" 
            :key="arma.id"
            class="text-xs bg-amber-50 rounded p-2"
            :class="{ 'ring-2 ring-amber-500': arma.id === personajeSeleccionado.armaEquipada }"
          >
            <p class="font-semibold text-gray-800">
              {{ arma.nombre }}
              <span v-if="arma.id === personajeSeleccionado.armaEquipada" class="text-amber-600"> (Equipada)</span>
            </p>
            <p class="text-gray-600">
              P:{{ arma.penetrante }} L:{{ arma.lacerante }} C:{{ arma.contundente }}
            </p>
          </div>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="space-y-2">
        <h4 class="text-sm font-bold text-gray-700 mb-2">⚡ Acciones</h4>
        
        <!-- Atacar y Mover -->
        <div class="grid grid-cols-2 gap-2">
          <button
            class="px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-red-500 text-white hover:bg-red-600 hover:shadow-lg"
          >
            ⚔️ Atacar
          </button>
          <button
            @click="activarModoMovimiento"
            :class="[
              'px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200',
              modoMovimiento 
                ? 'bg-green-500 text-white hover:bg-green-600 ring-2 ring-green-300' 
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
            ]"
          >
            {{ modoMovimiento ? '✓ Moviendo' : '🏃 Mover' }}
          </button>
        </div>

        <!-- Pasar Turno -->
        <button
          class="w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg"
        >
          ⏭️ Pasar Turno
        </button>

        <!-- Cambiar Arma -->
        <div class="bg-white rounded-lg p-2 border border-gray-300">
          <label class="text-xs font-semibold text-gray-600 block mb-1">🗡️ Cambiar Arma</label>
          <select
            class="w-full px-2 py-1 text-sm rounded border border-blue-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Sin arma</option>
            <option v-for="arma in obtenerArmas(personajeSeleccionado)" :key="arma.id" :value="arma.id">
              {{ arma.nombre }}
            </option>
          </select>
        </div>

        <!-- Usar Habilidad -->
        <div class="bg-white rounded-lg p-2 border border-gray-300">
          <label class="text-xs font-semibold text-gray-600 block mb-1">📊 Usar Habilidad</label>
          <div class="flex gap-1">
            <select class="flex-1 px-2 py-1 text-sm rounded border border-blue-300 focus:border-blue-500 focus:outline-none">
              <option value="">Seleccionar...</option>
            </select>
            <button
              class="px-3 py-1 rounded-lg font-semibold text-sm transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600"
            >
              Tirar
            </button>
          </div>
        </div>

        <!-- Usar Activa -->
        <div class="bg-white rounded-lg p-2 border border-gray-300">
          <label class="text-xs font-semibold text-gray-600 block mb-1">✨ Usar Activa</label>
          <div class="flex gap-1">
            <select class="flex-1 px-2 py-1 text-sm rounded border border-purple-300 focus:border-purple-500 focus:outline-none">
              <option value="">Seleccionar...</option>
            </select>
            <button
              class="px-3 py-1 rounded-lg font-semibold text-sm transition-all duration-200 bg-purple-500 text-white hover:bg-purple-600"
            >
              Usar
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Chat de Logs -->
    <div class="absolute bottom-4 right-4 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl w-96 h-64 flex flex-col">
      <!-- Header del chat -->
      <div class="bg-gray-800 rounded-t-lg px-4 py-2 border-b border-gray-700">
        <h4 class="text-sm font-bold text-white flex items-center gap-2">
          📜 Logs de Combate
        </h4>
      </div>

      <!-- Área de mensajes -->
      <div ref="logContainer" class="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
        <div
          v-for="(log, index) in logs"
          :key="index"
          class="text-gray-300 leading-relaxed"
        >
          <span class="text-gray-500">[{{ formatearHora(log.timestamp) }}]</span>
          <span
            :class="{
              'text-blue-400': log.tipo === 'sistema',
              'text-red-400': log.tipo === 'ataque',
              'text-green-400': log.tipo === 'movimiento',
              'text-yellow-400': log.tipo === 'habilidad',
              'text-purple-400': log.tipo === 'activa'
            }"
          >
            {{ log.mensaje }}
          </span>
        </div>
        <div v-if="logs.length === 0" class="text-gray-500 text-center py-8">
          No hay logs todavía...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as THREE from 'three'
import { MapControls } from 'three/addons/controls/MapControls.js'
import type { PersonajeInstancia, PartidaData } from '../../domain/Partida'
import armasData from '../../assets/armas.json'
import armadurasData from '../../assets/armaduras.json'

interface Props {
  partidaId: string
}

const props = defineProps<Props>()

// Referencias
const canvasContainer = ref<HTMLDivElement | null>(null)

// Variables de Three.js
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let controls: MapControls
let rafId = 0

// Hexágonos
const hexagons: THREE.Mesh[] = []
const hexMap = new Map<string, THREE.Mesh>()

// Personajes
const personajesMeshes = new Map<string, THREE.Mesh>()
const hexagonosOcupados = new Set<string>()

// Datos de la partida
const partidaActual = ref<PartidaData | null>(null)
const personajeSeleccionado = ref<PersonajeInstancia | null>(null)

// Modo de movimiento
const modoMovimiento = ref(false)
const hexagonosMovimiento = ref<THREE.Mesh[]>([])

// Logs
interface LogEntry {
  timestamp: Date
  tipo: 'sistema' | 'ataque' | 'movimiento' | 'habilidad' | 'activa'
  mensaje: string
}

const logs = ref<LogEntry[]>([])
const logContainer = ref<HTMLDivElement | null>(null)

// Raycasting
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
const clickables: THREE.Object3D[] = []
let hoveredHex: THREE.Mesh | null = null

// Configuración de la cuadrícula
const GRID_WIDTH = 20
const GRID_HEIGHT = 20
const HEX_SIZE = 2

// Colores para los personajes
const COLORES_PERSONAJES = [
  0xff0000, // Rojo
  0x0000ff, // Azul
  0x00ff00, // Verde
  0xffff00, // Amarillo
  0xff00ff, // Magenta
  0x00ffff, // Cyan
  0xff8800, // Naranja
  0x8800ff, // Púrpura
  0x00ff88, // Verde agua
  0xff0088, // Rosa
  0x88ff00, // Lima
  0x0088ff, // Azul cielo
]

function init() {
  if (!canvasContainer.value) return
  
  const el = canvasContainer.value
  const width = el.clientWidth
  const height = el.clientHeight

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.setClearColor(0x1a1a2e) // Fondo oscuro
  el.appendChild(renderer.domElement)

  // Escena
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x1a1a2e, 50, 200)

  // Cámara
  const aspect = width / height
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000)
  const cameraDistance = 50
  camera.position.set(cameraDistance, cameraDistance, cameraDistance)
  camera.lookAt(0, 0, 0)

  // Controles tipo Diablo/LoL
  controls = new MapControls(camera, renderer.domElement)
  controls.mouseButtons = { 
    LEFT: THREE.MOUSE.PAN, 
    MIDDLE: THREE.MOUSE.DOLLY, 
    RIGHT: THREE.MOUSE.ROTATE 
  }
  controls.touches = { 
    ONE: THREE.TOUCH.PAN, 
    TWO: THREE.TOUCH.DOLLY_PAN 
  }
  controls.minPolarAngle = 0
  controls.maxPolarAngle = Math.PI / 2.5
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // Iluminación
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)
  
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
  dirLight.position.set(20, 40, 30)
  scene.add(dirLight)
  
  const dirLight2 = new THREE.DirectionalLight(0x4a90e2, 0.3)
  dirLight2.position.set(-20, 20, -30)
  scene.add(dirLight2)

  // Crear cuadrícula de hexágonos
  createHexGrid()

  // Cargar partida y crear personajes
  cargarPartida()
  crearPersonajes()

  // Centrar cámara en la cuadrícula
  centerCamera()

  // Event listeners
  renderer.domElement.addEventListener('pointermove', onPointerMove)
  renderer.domElement.addEventListener('pointerdown', onPointerDown)

  // Iniciar loop de render
  animate()
}

function createHexGrid() {
  const size = HEX_SIZE
  const hexWidth = Math.sqrt(3) * size
  const hexHeight = 2 * size
  const rowStep = (3 / 4) * hexHeight

  // Geometría y material compartidos
  const hexGeo = new THREE.CylinderGeometry(size, size, 0.3, 6)
  const baseMat = new THREE.MeshStandardMaterial({ 
    color: 0x2d4059,
    flatShading: true,
    metalness: 0.1,
    roughness: 0.8
  })

  // Crear borde para cada hexágono
  const edgeGeo = new THREE.CylinderGeometry(size * 0.95, size * 0.95, 0.35, 6)
  const edgeMat = new THREE.MeshBasicMaterial({ 
    color: 0x4a90e2,
    transparent: true,
    opacity: 0.5  // Aumentado de 0.3 a 0.5 para más visibilidad
  })

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      // Crear hexágono
      const hex = new THREE.Mesh(hexGeo, baseMat.clone())
      
      // Calcular posición
      const offset = (row % 2) * (hexWidth / 2)
      hex.position.x = col * hexWidth + offset
      hex.position.z = row * rowStep
      hex.position.y = 0
      
      // Nombre y datos
      hex.name = `hex_${col}_${row}`
      ;(hex as any).gridX = col
      ;(hex as any).gridY = row
      ;(hex as any).baseMat = hex.material
      ;(hex as any).isHovered = false
      
      // Guardar en estructuras
      hexagons.push(hex)
      hexMap.set(`${col},${row}`, hex)
      clickables.push(hex)
      
      // Crear borde
      const edge = new THREE.Mesh(edgeGeo, edgeMat)
      edge.position.copy(hex.position)
      edge.position.y = 0.05
      
      scene.add(hex)
      scene.add(edge)
    }
  }

  console.log(`✅ Cuadrícula creada: ${hexagons.length} hexágonos (${GRID_WIDTH}x${GRID_HEIGHT})`)
}

function centerCamera() {
  const hexWidth = Math.sqrt(3) * HEX_SIZE
  const hexHeight = 2 * HEX_SIZE
  const rowStep = (3 / 4) * hexHeight

  const totalGridWidth = (GRID_WIDTH - 1) * hexWidth + (hexWidth / 2)
  const totalGridHeight = (GRID_HEIGHT - 1) * rowStep

  const gridCenter = new THREE.Vector3(
    totalGridWidth / 2,
    0,
    totalGridHeight / 2
  )

  controls.target.copy(gridCenter)
  const cameraDistance = 50
  camera.position.copy(gridCenter).add(new THREE.Vector3(
    cameraDistance, 
    cameraDistance, 
    cameraDistance
  ))
  controls.update()
}

function cargarPartida() {
  try {
    const partidaString = localStorage.getItem(props.partidaId)
    if (!partidaString) {
      console.error('❌ No se encontró la partida')
      agregarLog('sistema', '❌ Error: No se encontró la partida')
      return
    }

    partidaActual.value = JSON.parse(partidaString)
    console.log('✅ Partida cargada:', partidaActual.value?.nombre)
    console.log('📊 Total personajes:', contarTotalPersonajes())
    
    agregarLog('sistema', `✅ Partida "${partidaActual.value?.nombre}" cargada`)
    agregarLog('sistema', `📊 ${contarTotalPersonajes()} personajes en combate`)
  } catch (error) {
    console.error('❌ Error al cargar la partida:', error)
    agregarLog('sistema', '❌ Error al cargar la partida')
  }
}

function contarTotalPersonajes(): number {
  if (!partidaActual.value) return 0
  return partidaActual.value.equipos.reduce((total, equipo) => 
    total + equipo.personajes.length, 0
  )
}

function obtenerHexagonoAleatorioLibre(): { col: number, row: number } | null {
  const maxIntentos = 100
  for (let i = 0; i < maxIntentos; i++) {
    const col = Math.floor(Math.random() * GRID_WIDTH)
    const row = Math.floor(Math.random() * GRID_HEIGHT)
    const key = `${col},${row}`
    
    if (!hexagonosOcupados.has(key)) {
      return { col, row }
    }
  }
  console.error('❌ No se pudo encontrar un hexágono libre')
  return null
}

function crearPersonajes() {
  if (!partidaActual.value) return

  let colorIndex = 0
  
  partidaActual.value.equipos.forEach((equipo) => {
    equipo.personajes.forEach((personaje) => {
      const posicion = obtenerHexagonoAleatorioLibre()
      if (!posicion) return

      const hexagono = getMeshAt(posicion.col, posicion.row)
      if (!hexagono) return

      // Marcar hexágono como ocupado
      hexagonosOcupados.add(`${posicion.col},${posicion.row}`)

      // Crear cilindro para el personaje
      const color = COLORES_PERSONAJES[colorIndex % COLORES_PERSONAJES.length]
      const geometry = new THREE.CylinderGeometry(1, 1, 3, 20)
      const material = new THREE.MeshStandardMaterial({ 
        color,
        metalness: 0.3,
        roughness: 0.7
      })
      const cilindro = new THREE.Mesh(geometry, material)

      // Posicionar sobre el hexágono
      cilindro.position.set(
        hexagono.position.x,
        hexagono.position.y + 1.5, // Altura del cilindro
        hexagono.position.z
      )

      // Guardar datos del personaje en el mesh
      cilindro.name = `personaje_${personaje.instanciaId}`
      ;(cilindro as any).personajeData = personaje
      ;(cilindro as any).hexCol = posicion.col
      ;(cilindro as any).hexRow = posicion.row

      scene.add(cilindro)
      personajesMeshes.set(personaje.instanciaId, cilindro)
      clickables.push(cilindro)

      const colorHex = (color || 0xffffff).toString(16).padStart(6, '0')
      console.log(`👤 ${personaje.nombre} creado en (${posicion.col}, ${posicion.row}) - Color: #${colorHex}`)

      colorIndex++
    })
  })

  console.log(`✅ ${personajesMeshes.size} personajes creados en el mapa`)
  agregarLog('sistema', `⚔️ ${personajesMeshes.size} combatientes preparados para la batalla`)
}

function getMeshAt(col: number, row: number): THREE.Mesh | undefined {
  return hexMap.get(`${col},${row}`)
}

function getHexCoordinates(mesh: THREE.Mesh): { x: number, y: number } | null {
  const x = (mesh as any).gridX
  const y = (mesh as any).gridY
  if (x !== undefined && y !== undefined) {
    return { x, y }
  }
  return null
}

function getNeighbors(col: number, row: number, range: number): THREE.Mesh[] {
  const neighbors: THREE.Mesh[] = []
  const visited = new Set<string>()
  const queue: Array<{x: number, y: number, distance: number}> = [{x: col, y: row, distance: 0}]
  
  while (queue.length > 0) {
    const current = queue.shift()!
    const {x: currentX, y: currentY, distance} = current
    const key = `${currentX},${currentY}`
    
    if (visited.has(key)) continue
    visited.add(key)
    
    // Don't include the starting position, only neighbors
    if (distance > 0) {
      const mesh = getMeshAt(currentX, currentY)
      if (mesh) neighbors.push(mesh)
    }
    
    // If we haven't reached the maximum range, add neighbors to queue
    if (distance < range) {
      const isEven = currentY % 2 === 0
      const offsets: [number, number][] = isEven 
        ? [[-1, -1], [0, -1], [1, 0], [0, 1], [-1, 1], [-1, 0]] // Even row offsets
        : [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 0]]  // Odd row offsets
      
      for (const [dx, dy] of offsets) {
        const nextX = currentX + dx
        const nextY = currentY + dy
        const nextKey = `${nextX},${nextY}`
        
        if (!visited.has(nextKey)) {
          queue.push({x: nextX, y: nextY, distance: distance + 1})
        }
      }
    }
  }
  
  return neighbors
}

function highlightHexagons(hexagons: THREE.Mesh[], color: number) {
  hexagons.forEach(hex => {
    const mat = hex.material as THREE.MeshStandardMaterial
    // Color más sutil mezclando con el color base
    const baseMat = (hex as any).baseMat as THREE.MeshStandardMaterial
    if (baseMat) {
      const baseColor = baseMat.color.clone()
      const highlightColor = new THREE.Color(color)
      // Mezcla 70% base + 30% highlight para un efecto más sutil
      mat.color.lerpColors(baseColor, highlightColor, 0.3)
    } else {
      mat.color.set(color)
    }
  })
}

function resetHexagonsColor(hexagons: THREE.Mesh[]) {
  hexagons.forEach(hex => {
    const baseMat = (hex as any).baseMat as THREE.MeshStandardMaterial
    if (baseMat) {
      hex.material = baseMat
    }
  })
}

// Raycasting
function setPointerFromEvent(event: PointerEvent) {
  if (!renderer) return
  const rect = renderer.domElement.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  pointer.set(x * 2 - 1, -(y * 2 - 1))
}

function pick(event: PointerEvent): THREE.Mesh | null {
  setPointerFromEvent(event)
  raycaster.setFromCamera(pointer, camera)
  const hits = raycaster.intersectObjects(clickables, false)
  return hits.length ? (hits[0].object as THREE.Mesh) : null
}

function onPointerMove(event: PointerEvent) {
  const mesh = pick(event)
  
  // Si estamos en modo movimiento
  if (modoMovimiento.value) {
    if (mesh && mesh.name.startsWith('hex_')) {
      const esHexValido = hexagonosMovimiento.value.includes(mesh)
      if (renderer) {
        renderer.domElement.style.cursor = esHexValido ? 'pointer' : 'not-allowed'
      }
    } else {
      if (renderer) {
        renderer.domElement.style.cursor = 'default'
      }
    }
    return
  }
  
  // Cambiar cursor cuando se pase sobre un personaje
  if (mesh && mesh.name.startsWith('personaje_')) {
    if (renderer) {
      renderer.domElement.style.cursor = 'pointer'
    }
  } else {
    if (renderer) {
      renderer.domElement.style.cursor = 'default'
    }
  }
}

function onPointerDown(event: PointerEvent) {
  const mesh = pick(event)
  
  // Si estamos en modo movimiento y se hace clic en un hexágono válido
  if (modoMovimiento.value && mesh && mesh.name.startsWith('hex_')) {
    const esHexValido = hexagonosMovimiento.value.includes(mesh)
    if (esHexValido) {
      moverPersonaje(mesh)
    } else {
      agregarLog('sistema', '⚠️ No puedes moverte a esa casilla')
    }
    return
  }
  
  // Si se hace clic en un personaje
  if (mesh && mesh.name.startsWith('personaje_')) {
    const personajeData = (mesh as any).personajeData
    if (personajeData) {
      personajeSeleccionado.value = personajeData
      console.log('🎯 Personaje seleccionado:', personajeData.nombre)
      agregarLog('sistema', `👤 ${personajeData.nombre} seleccionado`)
    }
    return
  }
  
  // Si se hace clic en un hexágono (fuera del modo movimiento)
  if (mesh && mesh.name.startsWith('hex_')) {
    const coords = getHexCoordinates(mesh)
    if (coords) {
      console.log(`🎯 Hexágono seleccionado: (${coords.x}, ${coords.y})`)
    }
  }
}

function moverPersonaje(hexDestino: THREE.Mesh) {
  if (!personajeSeleccionado.value) return

  const meshPersonaje = personajesMeshes.get(personajeSeleccionado.value.instanciaId)
  if (!meshPersonaje) return

  const coordsOrigen = {
    col: (meshPersonaje as any).hexCol,
    row: (meshPersonaje as any).hexRow
  }

  const coordsDestino = getHexCoordinates(hexDestino)
  if (!coordsDestino) return

  // Liberar hexágono anterior
  hexagonosOcupados.delete(`${coordsOrigen.col},${coordsOrigen.row}`)

  // Ocupar nuevo hexágono
  hexagonosOcupados.add(`${coordsDestino.x},${coordsDestino.y}`)

  // Mover el mesh del personaje
  meshPersonaje.position.set(
    hexDestino.position.x,
    hexDestino.position.y + 1.5,
    hexDestino.position.z
  )

  // Actualizar coordenadas guardadas
  ;(meshPersonaje as any).hexCol = coordsDestino.x
  ;(meshPersonaje as any).hexRow = coordsDestino.y

  agregarLog('movimiento', `🏃 ${personajeSeleccionado.value.nombre} se movió a (${coordsDestino.x}, ${coordsDestino.y})`)

  // Desactivar modo movimiento (esto resetea los colores)
  desactivarModoMovimiento()
}

function cerrarFicha() {
  personajeSeleccionado.value = null
  agregarLog('sistema', '📋 Ficha cerrada')
  
  // Desactivar modo movimiento al cerrar ficha
  if (modoMovimiento.value) {
    desactivarModoMovimiento()
  }
}

function activarModoMovimiento() {
  if (!personajeSeleccionado.value) {
    agregarLog('sistema', '⚠️ Debes seleccionar un personaje primero')
    return
  }

  // Si ya está en modo movimiento, desactivar
  if (modoMovimiento.value) {
    desactivarModoMovimiento()
    return
  }

  const personaje = personajeSeleccionado.value
  const movimiento = personaje.atributos.movimiento || 0

  if (movimiento === 0) {
    agregarLog('sistema', `⚠️ ${personaje.nombre} no tiene movimiento disponible`)
    return
  }

  // Obtener posición actual del personaje
  const meshPersonaje = personajesMeshes.get(personaje.instanciaId)
  if (!meshPersonaje) {
    agregarLog('sistema', '⚠️ No se pudo encontrar el personaje en el mapa')
    return
  }

  const col = (meshPersonaje as any).hexCol
  const row = (meshPersonaje as any).hexRow

  // Obtener hexágonos vecinos
  const vecinos = getNeighbors(col, row, movimiento)
  
  // Filtrar hexágonos ocupados
  const vecinosLibres = vecinos.filter(hex => {
    const coords = getHexCoordinates(hex)
    if (!coords) return false
    const key = `${coords.x},${coords.y}`
    return !hexagonosOcupados.has(key)
  })

  hexagonosMovimiento.value = vecinosLibres
  modoMovimiento.value = true

  // Resaltar hexágonos de movimiento en verde
  highlightHexagons(vecinosLibres, 0x00ff00)

  agregarLog('movimiento', `🏃 Modo movimiento activado: ${vecinosLibres.length} casillas disponibles (Rango: ${movimiento})`)
}

function desactivarModoMovimiento() {
  if (hexagonosMovimiento.value.length > 0) {
    resetHexagonsColor(hexagonosMovimiento.value)
    hexagonosMovimiento.value = []
  }
  modoMovimiento.value = false
  agregarLog('sistema', '🏃 Modo movimiento desactivado')
}

function calcularArmadura(personaje: PersonajeInstancia) {
  const resistencia = personaje.atributos.resistencia || 0
  
  // Obtener armaduras equipadas
  let armaduraTotal = {
    penetrante: resistencia,
    lacerante: resistencia,
    contundente: resistencia
  }
  
  // Sumar las armaduras equipadas
  if (personaje.armaduras && personaje.armaduras.length > 0) {
    personaje.armaduras.forEach(armaduraId => {
      const armadura = armadurasData.armaduras.find((a: any) => a.id === armaduraId)
      if (armadura) {
        armaduraTotal.penetrante += armadura.penetrante || 0
        armaduraTotal.lacerante += armadura.lacerante || 0
        armaduraTotal.contundente += armadura.contundente || 0
      }
    })
  }
  
  return armaduraTotal
}

function obtenerArmas(personaje: PersonajeInstancia) {
  if (!personaje.armas || personaje.armas.length === 0) return []
  
  return personaje.armas.map(armaId => {
    return armasData.armas.find((a: any) => a.id === armaId)
  }).filter(arma => arma !== undefined)
}

function agregarLog(tipo: LogEntry['tipo'], mensaje: string) {
  logs.value.push({
    timestamp: new Date(),
    tipo,
    mensaje
  })
  
  // Auto-scroll al final
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight
    }
  })
}

function formatearHora(timestamp: Date): string {
  const date = new Date(timestamp)
  const horas = date.getHours().toString().padStart(2, '0')
  const minutos = date.getMinutes().toString().padStart(2, '0')
  const segundos = date.getSeconds().toString().padStart(2, '0')
  return `${horas}:${minutos}:${segundos}`
}

function animate() {
  rafId = requestAnimationFrame(animate)
  controls.update()
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

function handleResize() {
  if (!canvasContainer.value || !renderer || !camera) return
  
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
  
  if (renderer) {
    renderer.domElement.removeEventListener('pointermove', onPointerMove)
    renderer.domElement.removeEventListener('pointerdown', onPointerDown)
    
    scene.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose()
        if (object.material instanceof THREE.Material) {
          object.material.dispose()
        }
      }
    })
    
    renderer.dispose()
    renderer = null
  }
})
</script>

<style scoped>
/* Evitar scroll en el canvas */
canvas {
  display: block;
  outline: none;
}
</style>
