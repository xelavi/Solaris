<script setup lang="ts">
import { ref, provide } from 'vue'
import CrearPersonaje from './components/CrearPersonaje/crear_personaje.vue'
import ficha from './components/ficha.vue'

const currentView = ref<'crear' | 'ficha'>('crear')
const characterName = ref<string>('')

// Provide navigation functions
provide('navigateToFicha', (name: string) => {
  characterName.value = name
  currentView.value = 'ficha'
})

provide('navigateToCrear', () => {
  currentView.value = 'crear'
})
</script>

<template>
  <crear-personaje v-if="currentView === 'crear'"></crear-personaje>
  <ficha v-else-if="currentView === 'ficha'" :character-name="characterName"></ficha>
</template>

<style scoped>

</style>
