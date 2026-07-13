<template>
  <div>
    <label class="label">Nombre del personaje</label>
    <input
      type="text"
      v-model="characterData.nombre"
      class="input"
      placeholder="Introduce el nombre..."
    />
  </div>

  <div>
    <label class="label">Nivel</label>
    <input
      type="number"
      min="1"
      max="20"
      v-model="characterData.nivel"
      class="input max-w-40"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCharacterCreation } from "../../domain/useCharacterCreation";

const { characterData, loadCharacterData } = useCharacterCreation();

// Cargar datos al montar el componente
onMounted(async () => {
  await loadCharacterData();
});
</script>
<style scoped></style>
