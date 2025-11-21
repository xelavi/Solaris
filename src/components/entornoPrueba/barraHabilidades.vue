<template>
  <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
    <div
      class="bg-gray-900/90 backdrop-blur-md p-2 rounded-xl border border-gray-700 shadow-2xl flex gap-3 items-end"
    >
      <div v-for="skill in skills" :key="skill.id" class="relative group">
        <!-- Tooltip (Positioned above) -->
        <div
          class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        >
          <div
            class="bg-gray-800 text-white rounded-lg p-3 shadow-xl border border-gray-600"
          >
            <div class="font-bold text-amber-400 text-sm mb-1">
              {{ skill.name }}
            </div>
            <div class="text-gray-300 text-xs leading-relaxed">
              {{ skill.description }}
            </div>
            <div class="mt-2 text-xs text-gray-500 font-mono">
              Coste: {{ skill.cost }} AP
            </div>
          </div>
          <!-- Arrow -->
          <div
            class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-8 border-transparent border-t-gray-800"
          ></div>
        </div>

        <!-- Button -->
        <button
          class="w-14 h-14 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border-2 border-gray-600 hover:border-amber-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group-hover:shadow-amber-500/20"
        >
          <span class="text-2xl filter drop-shadow-md">{{ skill.icon }}</span>
        </button>

        <!-- Hotkey indicator -->
        <div
          class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-gray-400 text-[10px] px-1.5 rounded border border-gray-700 font-mono"
        >
          {{ skill.hotkey }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Skill {
  id: number;
  name: string;
  description: string;
  icon: string;
  cost: number;
  hotkey: string;
}

const skills = ref<Skill[]>([
  {
    id: 1,
    name: "Golpe Certero",
    description:
      "Un ataque preciso que ignora parte de la armadura del objetivo.",
    icon: "⚔️",
    cost: 2,
    hotkey: "1",
  },
  {
    id: 2,
    name: "Guardia",
    description:
      "Adopta una postura defensiva, aumentando la probabilidad de bloqueo.",
    icon: "🛡️",
    cost: 1,
    hotkey: "2",
  },
  {
    id: 3,
    name: "Curación Menor",
    description:
      "Restaura una pequeña cantidad de salud al objetivo o a ti mismo.",
    icon: "✨",
    cost: 2,
    hotkey: "3",
  },
  {
    id: 4,
    name: "Bola de Fuego",
    description: "Lanza un proyectil ígneo que explota al impactar.",
    icon: "🔥",
    cost: 3,
    hotkey: "4",
  },
  {
    id: 5,
    name: "Paso Sombra",
    description: "Te teletransportas instantáneamente a una casilla adyacente.",
    icon: "👻",
    cost: 1,
    hotkey: "5",
  },
]);
</script>
