// src/composables/usePartida.ts
import { reactive, computed } from 'vue'
import { Partida } from './Partida'
import { Character } from './Character'

// Hacemos reactiva la instancia de Partida
const partida = reactive(new Partida())

export function usePartida() {
  // Aseguramos que los Character dentro del Map sean reactivos
  function addCharacter(id: string, name: string) {
    const c = reactive(new Character(id, name)) as Character
    partida.addCharacter(c)
  }

  // Lista computada para v-for (más cómodo que iterar el Map)
  const charactersList = computed(() =>
    Array.from(partida.characters.values())
  )

  // helpers opcionales
  function getCharacter(id: string) {
    return partida.getCharacter(id)
  }

  return {
    partida,            // por si te interesa acceder al Map
    charactersList,     // ideal para la UI
    addCharacter,
    getCharacter,
  }
}
