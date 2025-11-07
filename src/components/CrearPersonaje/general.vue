<template>

    <div>
    <label class="block text-sm font-semibold text-gray-700 mb-2">
        Nombre del Personaje
    </label>
    <input
        type="text"
        v-model="characterData.nombre"
        class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
        placeholder="Introduce el nombre..."
    />
    </div>

    <div>
    <label class="block text-sm font-semibold text-gray-700 mb-2">
        Nivel
    </label>
    <input
        type="number"
        min="1"
        max="20"
        v-model="characterData.nivel"
        class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors"
    />
    </div>

    
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCharacterCreation } from '../../domain/useCharacterCreation'

const { characterData, loadCharacterData } = useCharacterCreation()

// Cargar datos al montar el componente
onMounted(() => {
  loadCharacterData()
})

</script>
<style scoped>
</style>