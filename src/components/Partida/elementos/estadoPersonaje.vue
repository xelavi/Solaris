<template>
  <!-- Ficha de Personaje y menú lateral -->
  <div v-if="personajeSeleccionado" class="estado-personaje-panel">
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

    <!-- Botones de Acción -->
    <div class="space-y-2">
      <button @click="activarModoAtaque" :class="['w-full px-3 py-2 rounded-lg font-semibold text-sm', modoAtaque ? 'bg-red-600 text-white' : 'bg-red-500 text-white']">
        {{ modoAtaque ? '✓ Atacando' : '⚔️ Atacar' }}
      </button>
      <button @click="activarModoMovimiento" :class="['w-full px-3 py-2 rounded-lg font-semibold text-sm', modoMovimiento ? 'bg-green-600 text-white' : 'bg-blue-500 text-white']">
        {{ modoMovimiento ? '✓ Moviendo' : '🏃 Mover' }}
      </button>
      <button @click="activarModoCarga" :class="['w-full px-3 py-2 rounded-lg font-semibold text-sm', modoCarga ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white']">
        {{ modoCarga ? '✓ Cargando' : '🏇 Carga' }}
      </button>
      <button @click="activarModoEmpujar" :class="['w-full px-3 py-2 rounded-lg font-semibold text-sm', modoEmpujar ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white']">
        {{ modoEmpujar ? '✓ Empujando' : '💥 Empujar' }}
      </button>
      <button @click="activarModoInstruir" :class="['w-full px-3 py-2 rounded-lg font-semibold text-sm', modoInstruir ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white']">
        {{ modoInstruir ? '✓ Instruyendo' : '🏇 Instruir' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Importar props y lógica necesaria desde el padre
import { ref } from 'vue'
import * as THREE from 'three'
import type { PersonajeInstancia, PartidaData } from '../../domain/Partida'

// Define props for personajeSeleccionado, accionesRestantes, modos, y funciones
const props = defineProps<{
  personajeSeleccionado: PersonajeInstancia | null,
  accionesRestantes: number,
  partidaActual: PartidaData | null,
  personajesMeshes: Map<string, THREE.Mesh>,
  hexagonosOcupados: Set<string>,
  // ...otras props necesarias
  activarModoAtaque: () => void,
  activarModoMovimiento: () => void,
  activarModoCarga: () => void,
  activarModoEmpujar: () => void,
  activarModoInstruir: () => void,
  pasarTurno: () => void,
  usarCuracion: () => void,
  usarAdrenalina: () => void,
  usarAtaquePesado: () => void,
  usarApuntar: () => void,
  usarProcesar: () => void,
  // ...otras funciones necesarias
}>()

// Estados locales para modos y acciones
const modoAtaque = ref(false)
const modoMovimiento = ref(false)
const modoCarga = ref(false)
const modoEmpujar = ref(false)
const modoInstruir = ref(false)

// Ejemplo: función para activar modo ataque
function activarModoAtaque() {
  modoAtaque.value = !modoAtaque.value
  // Aquí puedes manipular los meshs, resaltar objetivos, etc.
  // Ejemplo:
  // if (modoAtaque.value && props.personajeSeleccionado) {
  //   // Buscar objetivos y resaltar
  // }
}
function activarModoMovimiento() {
      const aliados = ref<PersonajeInstancia[]>([])
      const aliadoSeleccionable = ref(false)
  modoMovimiento.value = !modoMovimiento.value
}
function activarModoCarga() {
  modoCarga.value = !modoCarga.value
}
function activarModoEmpujar() {
  modoEmpujar.value = !modoEmpujar.value
}
function activarModoInstruir() {
  modoInstruir.value = !modoInstruir.value
}

// Repite para los demás modos y acciones...

// Ejemplo: función para resaltar aliados
function resaltarAliados() {
  if (!props.personajeSeleccionado || !props.partidaActual) return
  let aliados: PersonajeInstancia[] = []
  props.partidaActual.equipos.forEach(eq => {
    if (eq.personajes.some(p => p.instanciaId === props.personajeSeleccionado!.instanciaId)) {
      aliados = eq.personajes.filter(p => p.instanciaId !== props.personajeSeleccionado!.instanciaId)
    }
  })
  aliados.forEach(a => {
    const mesh = props.personajesMeshes.get(a.instanciaId)
    if (mesh) mesh.material.emissive?.setHex(0xffe066)
  })
}

// Ejemplo: función para resetear resaltado
function resetearResaltadoAliados() {
  if (!props.personajeSeleccionado || !props.partidaActual) return
  let aliados: PersonajeInstancia[] = []
  props.partidaActual.equipos.forEach(eq => {
    if (eq.personajes.some(p => p.instanciaId === props.personajeSeleccionado!.instanciaId)) {
      aliados = eq.personajes.filter(p => p.instanciaId !== props.personajeSeleccionado!.instanciaId)
    }
  })
  aliados.forEach(a => {
    const mesh = props.personajesMeshes.get(a.instanciaId)
    if (mesh) mesh.material.emissive?.setHex(0x000000)
  })
}

// ...aquí iría la lógica de los botones y acciones, usando los datos y meshs recibidos
</script>

<style scoped>
.estado-personaje-panel {
  position: absolute;
  top: 5rem;
  right: 1rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.15);
  width: 20rem;
  max-height: 85vh;
  overflow-y: auto;
  padding: 2rem;
}
</style>
