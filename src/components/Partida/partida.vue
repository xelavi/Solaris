<template>
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-6 flex justify-between items-center">
        <button
          @click="volverAPartidas"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg flex items-center gap-2"
        >
          ← Volver a Partidas
        </button>
        
        <!-- Control de combate -->
        <div v-if="!partidaActual?.combateActivo">
          <button
            @click="iniciarCombateHandler"
            class="px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-green-500 text-white hover:bg-green-600 hover:shadow-lg text-lg"
          >
            ⚔️ Iniciar Combate
          </button>
        </div>
        <div v-else class="flex items-center gap-4">
          <div class="bg-white rounded-lg px-4 py-2 shadow-md border-2 border-blue-500">
            <span class="text-sm font-semibold text-gray-600">Ronda:</span>
            <span class="text-lg font-bold text-blue-600 ml-2">{{ partidaActual.rondaActual }}</span>
          </div>
          <button
            @click="siguienteTurnoHandler"
            class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
          >
            ▶️ Siguiente Turno
          </button>
        </div>
      </div>

      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-600 mb-2 drop-shadow-lg">
          {{ partidaActual?.nombre || 'Partida' }}
        </h1>
      </div>

      <!-- Grid: Personajes + Chat de Logs -->
      <div v-if="partidaActual" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Columna de personajes (2/3) -->
        <div class="lg:col-span-2 space-y-8">
          <div
            v-for="equipo in partidaActual.equipos"
            :key="equipo.id"
            class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-6 shadow-xl"
          >
          <h2 class="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-blue-500 pb-2">
            {{ equipo.nombre }}
          </h2>

          <div v-if="equipo.personajes.length === 0" class="text-center py-8 text-gray-500">
            No hay personajes en este equipo
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="personaje in equipo.personajes"
              :key="personaje.instanciaId"
              :class="[
                'rounded-xl p-4 shadow-md hover:shadow-lg transition-all relative',
                esTurnoActual(personaje.instanciaId) 
                  ? 'bg-yellow-100 border-4 border-yellow-500' 
                  : 'bg-gray-50 border-2 border-gray-300'
              ]"
            >
              <!-- Indicador de turno actual -->
              <div v-if="esTurnoActual(personaje.instanciaId)" class="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                ▶️ TURNO ({{ accionesRestantes(personaje.instanciaId) }} acciones)
              </div>
              
              <!-- Nombre y Nivel -->
              <div class="mb-4 border-b border-gray-300 pb-2">
                <h3 class="text-xl font-bold text-gray-700">{{ personaje.nombre }}</h3>
                <p class="text-sm text-gray-500">Nivel {{ personaje.nivel }}</p>
              </div>

              <!-- Estadísticas de Combate -->
              <div class="space-y-2">
                <!-- Vida -->
                <div class="bg-white rounded-lg p-2 border border-gray-300">
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-xs font-semibold text-red-600">VIDA</span>
                    <span class="text-sm font-bold text-red-700">
                      {{ personaje.vidaActual }} / {{ personaje.atributos.hp }}
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-red-500 h-2 rounded-full transition-all"
                      :style="{ width: `${(personaje.vidaActual / personaje.atributos.hp) * 100}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Vida Temporal -->
                <div class="bg-white rounded-lg p-2 border border-gray-300">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-semibold text-blue-600">VIDA TEMPORAL</span>
                    <input
                      v-model.number="personaje.vidaTemporal"
                      type="number"
                      min="0"
                      class="w-16 px-2 py-1 text-sm text-right border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                      @change="guardarCambios"
                    />
                  </div>
                </div>

                <!-- Evasión -->
                <div class="bg-white rounded-lg p-2 border border-gray-300">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-semibold text-green-600">EVASIÓN</span>
                    <span class="text-sm font-bold text-gray-700">
                      {{ calcularEvasionTotal(personaje) }}
                    </span>
                  </div>
                </div>

                <!-- Poderío -->
                <div class="bg-white rounded-lg p-2 border border-gray-300">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-semibold text-orange-600">PODERÍO</span>
                    <span class="text-sm font-bold text-gray-700">
                      {{ personaje.atributos.poderio || 0 }}
                    </span>
                  </div>
                </div>

                <!-- Puntería -->
                <div class="bg-white rounded-lg p-2 border border-gray-300">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-semibold text-yellow-600">PUNTERÍA</span>
                    <span class="text-sm font-bold text-gray-700">
                      {{ personaje.atributos.punteria || 0 }}
                    </span>
                  </div>
                </div>

                <!-- Armadura (Defensa) -->
                <div class="bg-white rounded-lg p-2 border border-gray-300">
                  <div class="mb-1">
                    <span class="text-xs font-semibold text-purple-600">ARMADURA</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <div class="text-center">
                      <div class="text-gray-500">L</div>
                      <div class="font-bold text-gray-700">{{ calcularDefensa(personaje, 'lacerante') }}</div>
                    </div>
                    <div class="text-center">
                      <div class="text-gray-500">P</div>
                      <div class="font-bold text-gray-700">{{ calcularDefensa(personaje, 'penetrante') }}</div>
                    </div>
                    <div class="text-center">
                      <div class="text-gray-500">C</div>
                      <div class="font-bold text-gray-700">{{ calcularDefensa(personaje, 'contundente') }}</div>
                    </div>
                  </div>
                </div>

                <!-- Arma -->
                <div class="bg-white rounded-lg p-2 border border-gray-300">
                  <div class="mb-1">
                    <span class="text-xs font-semibold text-red-600">ARMA</span>
                  </div>
                  <div v-if="obtenerArma(personaje)" class="text-xs space-y-1">
                    <div class="font-medium text-gray-700">{{ obtenerArma(personaje)?.nombre }}</div>
                    <div class="flex justify-between text-gray-600">
                      <span>P: {{ obtenerArma(personaje)?.penetrante }}</span>
                      <span>L: {{ obtenerArma(personaje)?.lacerante }}</span>
                      <span>C: {{ obtenerArma(personaje)?.contundente }}</span>
                    </div>
                    <div class="text-gray-500">Crit: {{ obtenerArma(personaje)?.critico }}</div>
                  </div>
                  <div v-else class="text-xs text-gray-400">Sin arma</div>
                </div>

                <!-- Posición (solo lectura) -->
                <div class="bg-white rounded-lg p-2 border border-gray-300">
                  <div class="text-xs font-semibold text-gray-600 mb-1">POSICIÓN</div>
                  <div class="text-xs text-center font-mono text-gray-700">
                    ({{ personaje.posicion.x }}, {{ personaje.posicion.y }}, {{ personaje.posicion.z }})
                  </div>
                </div>
              </div>

              <!-- Botones de acción -->
              <div class="mt-4 space-y-2">
                <div class="grid grid-cols-2 gap-2">
                  <button
                    @click="iniciarAtaque(personaje)"
                    class="px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-red-500 text-white hover:bg-red-600 hover:shadow-lg"
                  >
                    ⚔️ Atacar
                  </button>
                  <button
                    class="px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
                  >
                    🏃 Moverse
                  </button>
                </div>
                <button
                  @click="resetearVida(personaje)"
                  class="w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-green-500 text-white hover:bg-green-600 hover:shadow-lg"
                >
                  ❤️ Reset Vida
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        <!-- Columna de chat de logs (1/3) -->
        <div class="lg:col-span-1">
          <div class="bg-white border-2 border-gray-300 rounded-xl shadow-xl sticky top-6">
            <div class="bg-blue-500 text-white px-4 py-3 rounded-t-xl">
              <h3 class="font-bold text-lg">📜 Registro de Combate</h3>
            </div>
            <div 
              ref="logContainer"
              class="p-4 h-[600px] overflow-y-auto space-y-2 bg-gray-50"
            >
              <div
                v-for="log in partidaActual.logs || []"
                :key="log.id"
                :class="[
                  'p-2 rounded text-sm border-l-4',
                  log.tipo === 'sistema' ? 'bg-green-100 border-green-500 font-bold' :
                  log.tipo === 'ronda' ? 'bg-blue-100 border-blue-500 font-bold text-center' :
                  log.tipo === 'turno' ? 'bg-yellow-100 border-yellow-500 font-semibold' :
                  log.tipo === 'ataque' ? 'bg-red-100 border-red-500' :
                  log.tipo === 'iniciativa' ? 'bg-purple-100 border-purple-500' :
                  'bg-gray-100 border-gray-500'
                ]"
              >
                {{ log.mensaje }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <p class="text-xl text-gray-500">No se encontró la partida.</p>
      </div>
    </div>

    <!-- Modal de selección de objetivo -->
    <div
      v-if="mostrarModalAtaque"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="cerrarModalAtaque"
    >
      <div class="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-gray-700">
            {{ atacanteActual?.nombre }} - Seleccionar Objetivo
          </h3>
          <button
            @click="cerrarModalAtaque"
            class="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div v-if="objetivosPosibles.length === 0" class="text-center py-8 text-gray-500">
          <p>No hay objetivos disponibles.</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="equipo in partidaActual!.equipos"
            :key="equipo.id"
            class="border-2 border-gray-200 rounded-lg p-4"
          >
            <h4 class="text-lg font-bold text-gray-700 mb-3">{{ equipo.nombre }}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                v-for="personaje in equipo.personajes"
                :key="personaje.instanciaId"
                @click="ejecutarAtaque(personaje)"
                :disabled="personaje.instanciaId === atacanteActual?.instanciaId"
                :class="[
                  'text-left p-3 rounded-lg border-2 transition-all',
                  personaje.instanciaId === atacanteActual?.instanciaId
                    ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-gray-300 hover:border-red-500 hover:bg-red-50 cursor-pointer'
                ]"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <div class="font-bold text-gray-700">{{ personaje.nombre }}</div>
                    <div class="text-sm text-gray-500">Nivel {{ personaje.nivel }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs text-gray-500">Vida</div>
                    <div class="font-bold text-red-600">
                      {{ personaje.vidaActual }} / {{ personaje.atributos.hp }}
                    </div>
                  </div>
                </div>
                <div v-if="personaje.instanciaId === atacanteActual?.instanciaId" class="text-xs text-gray-400 mt-1">
                  (Atacante)
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje de resultado del ataque -->
    <div
      v-if="mensajeAtaque"
      class="fixed bottom-4 right-4 bg-white border-2 border-red-500 rounded-lg p-4 shadow-xl max-w-md z-50 animate-slide-up"
    >
      <div class="flex justify-between items-start mb-2">
        <h4 class="font-bold text-red-600">⚔️ Resultado del Ataque</h4>
        <button @click="mensajeAtaque = ''" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      <pre class="text-gray-700 text-sm whitespace-pre-wrap font-sans">{{ mensajeAtaque }}</pre>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, computed, nextTick } from 'vue'
import type { PersonajeInstancia, PartidaData } from '../../domain/Partida'
import { realizarAtaque, type ArmaData, type ResultadoAtaque, type DefensaData, iniciarCombate, siguienteTurno, gastarAccion, agregarLog } from '../../domain/Partida'
import armasData from '../../assets/armas.json'
import armadurasData from '../../assets/armaduras.json'

interface Props {
  partidaId: string
}

const props = defineProps<Props>()

const partidaActual = ref<PartidaData | null>(null)
const navigateToPartidas = inject<() => void>('navigateToPartidas')

// Estado para el modal de ataque
const mostrarModalAtaque = ref(false)
const atacanteActual = ref<PersonajeInstancia | null>(null)
const mensajeAtaque = ref('')

// Referencia para el contenedor de logs
const logContainer = ref<HTMLElement | null>(null)

interface Arma {
  id: number
  nombre: string
  categoria: string
  critico: string
  rango_critico: number | null
  penetrante: number
  lacerante: number
  contundente: number
}

interface Armadura {
  id: number
  nombre: string
  penetrante: number
  lacerante: number
  contundente: number
  categoria: string
}

const armas = computed(() => armasData.armas as Arma[])
const armaduras = computed(() => armadurasData.armaduras as Armadura[])

const objetivosPosibles = computed(() => {
  if (!partidaActual.value) return []
  
  // Todos los personajes de todos los equipos
  const todosPersonajes: PersonajeInstancia[] = []
  partidaActual.value.equipos.forEach(equipo => {
    todosPersonajes.push(...equipo.personajes)
  })
  
  return todosPersonajes
})

function esTurnoActual(instanciaId: string): boolean {
  if (!partidaActual.value?.combateActivo || !partidaActual.value.ordenIniciativa) return false
  const turnoActual = partidaActual.value.ordenIniciativa[partidaActual.value.turnoActualIndex]
  return turnoActual?.instanciaId === instanciaId
}

function accionesRestantes(instanciaId: string): number {
  if (!partidaActual.value?.ordenIniciativa) return 0
  const orden = partidaActual.value.ordenIniciativa.find(o => o.instanciaId === instanciaId)
  return orden?.accionesRestantes || 0
}

function iniciarCombateHandler() {
  if (!partidaActual.value) return
  partidaActual.value = iniciarCombate(partidaActual.value)
  guardarCambios()
  scrollLogsToBottom()
}

function siguienteTurnoHandler() {
  if (!partidaActual.value) return
  partidaActual.value = siguienteTurno(partidaActual.value)
  guardarCambios()
  scrollLogsToBottom()
}

function scrollLogsToBottom() {
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight
    }
  })
}

function iniciarAtaque(atacante: PersonajeInstancia) {
  atacanteActual.value = atacante
  mostrarModalAtaque.value = true
  mensajeAtaque.value = ''
}

function cerrarModalAtaque() {
  mostrarModalAtaque.value = false
  atacanteActual.value = null
}

function ejecutarAtaque(defensor: PersonajeInstancia) {
  if (!atacanteActual.value) return
  
  // Obtener el arma del atacante
  const armaAtacante = obtenerArma(atacanteActual.value)
  const armaData: ArmaData | null = armaAtacante ? {
    id: armaAtacante.id,
    nombre: armaAtacante.nombre,
    penetrante: armaAtacante.penetrante,
    lacerante: armaAtacante.lacerante,
    contundente: armaAtacante.contundente,
    critico: armaAtacante.critico,
    rango_critico: armaAtacante.rango_critico
  } : null
  
  // Calcular la defensa del defensor
  const defensaDefensor: DefensaData = {
    lacerante: calcularDefensa(defensor, 'lacerante'),
    penetrante: calcularDefensa(defensor, 'penetrante'),
    contundente: calcularDefensa(defensor, 'contundente')
  }
  
  // Realizar el ataque
  const resultado = realizarAtaque(atacanteActual.value, defensor, armaData, defensaDefensor)
  
  // Actualizar la vida del defensor solo si el ataque tuvo éxito
  if (resultado.exito) {
    defensor.vidaActual = resultado.vidaRestante
  }
  
  // Gastar acción si el combate está activo
  if (partidaActual.value?.combateActivo) {
    partidaActual.value = gastarAccion(partidaActual.value, atacanteActual.value.instanciaId)
    // Agregar log de ataque
    partidaActual.value = agregarLog(partidaActual.value, 'ataque', resultado.mensaje)
  }
  
  // Guardar cambios
  guardarCambios()
  
  // Mostrar mensaje
  mensajeAtaque.value = resultado.mensaje
  
  // Cerrar modal
  cerrarModalAtaque()
  
  // Scroll al final de los logs
  scrollLogsToBottom()
  
  // Auto-ocultar mensaje después de 5 segundos
  setTimeout(() => {
    mensajeAtaque.value = ''
  }, 5000)
}

function resetearVida(personaje: PersonajeInstancia) {

  
  personaje.vidaActual = personaje.atributos.hp
  personaje.vidaTemporal = 0
  
  guardarCambios()
  
  // Mostrar confirmación
  mensajeAtaque.value = `✨ ${personaje.nombre} ha sido curado completamente!`
  setTimeout(() => {
    mensajeAtaque.value = ''
  }, 3000)
}

function cargarPartida() {
  try {
    const partidaString = localStorage.getItem(props.partidaId)
    if (!partidaString) {
      console.error('No se encontró la partida')
      return
    }

    const partida = JSON.parse(partidaString)
    
    // Asegurar que cada personaje tenga vidaTemporal inicializada
    partida.equipos.forEach((equipo: any) => {
      equipo.personajes.forEach((personaje: any) => {
        if (personaje.vidaTemporal === undefined) {
          personaje.vidaTemporal = 0
        }
      })
    })
    
    // Inicializar campos de combate si no existen
    if (partida.combateActivo === undefined) {
      partida.combateActivo = false
      partida.rondaActual = 0
      partida.ordenIniciativa = []
      partida.turnoActualIndex = 0
      partida.logs = []
    }
    
    partidaActual.value = partida
  } catch (error) {
    console.error('Error al cargar la partida:', error)
  }
}

function volverAPartidas() {
  // Guardar cambios antes de salir
  guardarCambios()
  if (navigateToPartidas) {
    navigateToPartidas()
  }
}

function guardarCambios() {
  if (!partidaActual.value) return

  try {
    localStorage.setItem(props.partidaId, JSON.stringify(partidaActual.value, null, 2))
    console.log('✅ Cambios guardados')
  } catch (error) {
    console.error('❌ Error al guardar cambios:', error)
  }
}

function calcularEvasionTotal(personaje: PersonajeInstancia): number {
  const evasionBase = personaje.atributos.evasion || 12
  // La armadura puede modificar la evasión en el futuro
  return evasionBase
}

function calcularDefensa(personaje: PersonajeInstancia, tipo: 'lacerante' | 'penetrante' | 'contundente'): number {
  const resistencia = personaje.atributos.resistencia || 0
  const armadura = obtenerArmadura(personaje)
  const escudo = obtenerEscudo(personaje)
  
  const defensaArmadura = armadura ? armadura[tipo] : 0
  const defensaEscudo = escudo ? escudo[tipo] : 0
  
  return resistencia + defensaArmadura + defensaEscudo
}

function calcularDL(personaje: PersonajeInstancia): number {
  // DL = Cuerpo + Resistencia + Armadura
  const cuerpo = personaje.atributos.cuerpo || 0
  const resistencia = personaje.atributos.resistencia || 0
  const armadura = obtenerArmadura(personaje)
  
  // Suma de las defensas de la armadura (promedio o máximo)
  const defensaArmadura = armadura 
    ? Math.max(armadura.penetrante, armadura.lacerante, armadura.contundente)
    : 0
  
  return cuerpo + resistencia + defensaArmadura
}

function obtenerArma(personaje: PersonajeInstancia): Arma | null {
  if (!personaje.armas || personaje.armas.length === 0) return null
  
  // Obtener la primera arma equipada
  const armaId = personaje.armas[0]
  return armas.value.find(a => a.id === armaId) || null
}

function obtenerArmadura(personaje: PersonajeInstancia): Armadura | null {
  if (!personaje.armaduras || personaje.armaduras.length === 0) return null
  
  // Obtener la primera armadura equipada
  const armaduraId = personaje.armaduras[0]
  return armaduras.value.find(a => a.id === armaduraId) || null
}

function obtenerEscudo(personaje: PersonajeInstancia): Armadura | null {
  if (!personaje.armaduras || personaje.armaduras.length < 2) return null
  
  // Obtener el segundo item como escudo (si existe)
  const escudoId = personaje.armaduras[1]
  return armaduras.value.find(a => a.id === escudoId) || null
}

onMounted(() => {
  cargarPartida()
})
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
