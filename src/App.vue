<script setup lang="ts">
import { ref, provide } from 'vue'
import Characters from './components/characters.vue'
import CrearPersonaje from './components/CrearPersonaje/crear_personaje.vue'
import Ficha from './components/VerPersonaje/ficha.vue'
import Partidas from './components/Partida/partidas.vue'
import CrearPartida from './components/Partida/crear_partida.vue'
import Partida from './components/Partida/partida.vue'
import JugarPartida from './components/Partida/jugarPartida.vue'
import Escena from './components/entornoPrueba/escena.vue'
//import Editor from './components/editorVoxeles.vue'
const currentView = ref<'characters' | 'crear' | 'ficha' | 'partidas' | 'crearPartida' | 'verPartida' | 'jugarPartida' | 'escena' | 'editorVoxeles'>('characters')

provide('navigateToEditorVoxeles', () => {
  currentView.value = 'editorVoxeles';
});
const characterId = ref<string>('')
const partidaId = ref<string>('')
const escenaPartidaId = ref<string>('')

// Provide navigation functions
provide('navigateToFicha', (id: string) => {
  characterId.value = id
  currentView.value = 'ficha'
})

provide('navigateToCrear', () => {
  // Limpiar el ID del personaje en creación para empezar uno nuevo
  localStorage.removeItem('personaje_en_creacion_id')
  currentView.value = 'crear'
})

provide('navigateToCharacters', () => {
  currentView.value = 'characters'
})

provide('navigateToPartidas', () => {
  currentView.value = 'partidas'
})

provide('navigateToCrearPartida', () => {
  currentView.value = 'crearPartida'
})

provide('navigateToVerPartida', (id: string) => {
  partidaId.value = id
  currentView.value = 'verPartida'
})

provide('navigateToJugarPartida', (id: string) => {
  partidaId.value = id
  currentView.value = 'jugarPartida'
})
provide('navigateToEscena', (id?: string) => {
  if (id) escenaPartidaId.value = id;
  currentView.value = 'escena';
})


</script>

<template>
  <characters v-if="currentView === 'characters'"></characters>
  <crear-personaje v-else-if="currentView === 'crear'"></crear-personaje>
  <ficha v-else-if="currentView === 'ficha'" :character-id="characterId"></ficha>
  <partidas v-else-if="currentView === 'partidas'"></partidas>
  <crear-partida v-else-if="currentView === 'crearPartida'"></crear-partida>
  <partida v-else-if="currentView === 'verPartida'" :partida-id="partidaId"></partida>
  <jugar-partida v-else-if="currentView === 'jugarPartida'" :partida-id="partidaId"></jugar-partida>
  <escena v-else-if="currentView === 'escena'" :partida-id="escenaPartidaId"></escena>
  <editor v-else-if="currentView === 'editorVoxeles'"></editor>
</template>

<style scoped>

</style>
