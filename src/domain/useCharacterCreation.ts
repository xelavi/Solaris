// src/domain/useCharacterCreation.ts
import { ref, watch } from 'vue'
import { usePartida } from './usePartida'

const CURRENT_CHARACTER_ID = 'character-in-creation'

export function useCharacterCreation() {
  const { addCharacter, getCharacter } = usePartida()

  // Estado reactivo para los datos del personaje
  const characterData = ref({
    nombre: '',
    nivel: 1,
    oficio: '',
    oficio_habilidades: [] as string[],
    estilo_marcial: '',
    estilo_marcial_dotes: [] as string[],
    trasfondo: '',
    trasfondo_habilidades: [] as string[],
    raza: '',
    arbol: ''
  })

  // Función para obtener o crear el personaje en creación
  function getCurrentCharacter() {
    let character = getCharacter(CURRENT_CHARACTER_ID)
    if (!character) {
      addCharacter(CURRENT_CHARACTER_ID, '')
      character = getCharacter(CURRENT_CHARACTER_ID)
    }
    return character
  }

  // Función para cargar datos del personaje al estado local
  function loadCharacterData() {
    const character = getCurrentCharacter()
    if (character) {
      characterData.value.nombre = character.name || ''
      characterData.value.nivel = character.nivel || 1
      characterData.value.oficio = character.oficio || ''
      characterData.value.oficio_habilidades = character.oficio_habilidades || []
      characterData.value.estilo_marcial = character.estilo_marcial || ''
      characterData.value.estilo_marcial_dotes = character.estilo_marcial_dotes || []
      characterData.value.trasfondo = character.trasfondo || ''
      characterData.value.trasfondo_habilidades = character.trasfondo_habilidades || []
      characterData.value.raza = character.raza || ''
      characterData.value.arbol = character.arbol || ''
    }
  }

  // Función para guardar datos del estado local al personaje
  function saveCharacterData() {
    const character = getCurrentCharacter()
    if (character) {
      character.name = characterData.value.nombre
      character.nivel = characterData.value.nivel
      character.oficio = characterData.value.oficio
      character.oficio_habilidades = characterData.value.oficio_habilidades
      character.estilo_marcial = characterData.value.estilo_marcial
      character.estilo_marcial_dotes = characterData.value.estilo_marcial_dotes
      character.trasfondo = characterData.value.trasfondo
      character.trasfondo_habilidades = characterData.value.trasfondo_habilidades
      character.raza = characterData.value.raza
      character.arbol = characterData.value.arbol
    }
  }

  // Watchers para sincronización automática
  watch(() => characterData.value.nombre, () => saveCharacterData())
  watch(() => characterData.value.nivel, () => saveCharacterData())
  watch(() => characterData.value.oficio, () => saveCharacterData())
  watch(() => characterData.value.oficio_habilidades, () => saveCharacterData(), { deep: true })
  watch(() => characterData.value.estilo_marcial, () => saveCharacterData())
  watch(() => characterData.value.estilo_marcial_dotes, () => saveCharacterData(), { deep: true })
  watch(() => characterData.value.trasfondo, () => saveCharacterData())
  watch(() => characterData.value.trasfondo_habilidades, () => saveCharacterData(), { deep: true })
  watch(() => characterData.value.raza, () => saveCharacterData())
  watch(() => characterData.value.arbol, () => saveCharacterData())

  return {
    characterData,
    getCurrentCharacter,
    loadCharacterData,
    saveCharacterData
  }
}