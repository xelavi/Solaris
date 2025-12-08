<template>
  <div
    class="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-5 w-80 max-h-[85vh] overflow-y-auto border border-gray-200 transition-all duration-300"
  >
    <!-- Header -->
    <div class="mb-4 pb-3 border-b border-gray-200 flex justify-between items-start">
      <div>
        <h3 class="text-2xl font-bold text-gray-800 leading-tight">
          {{ personaje.nombre }}
        </h3>
        <p class="text-sm font-medium text-gray-500 mt-1">Nivel {{ personaje.nivel }}</p>
      </div>
      <div v-if="esActivo" class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
        ACTIVO
      </div>
    </div>

    <!-- Vida -->
    <div class="mb-5 bg-gray-50 p-3 rounded-lg border border-gray-100">
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Puntos de Vida</span>
        <span class="text-sm font-bold text-gray-800">
          <span :class="{'text-red-600': porcentajeVida < 30}">{{ personaje.vidaActual }}</span>
          <span class="text-gray-400">/</span>
          {{ personaje.atributos.hp }}
        </span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
        <div
          class="h-full transition-all duration-500 ease-out"
          :class="colorBarraVida"
          :style="{ width: `${porcentajeVida}%` }"
        ></div>
      </div>
      <div v-if="personaje.vidaTemporal > 0" class="mt-2 text-xs font-bold text-blue-600 flex items-center gap-1">
        <span>🛡️</span> +{{ personaje.vidaTemporal }} vida temporal
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 gap-3 mb-5">
       <div class="space-y-1">
          <div class="text-xs text-gray-500 uppercase">Oficio</div>
          <div class="font-medium text-gray-800 truncate" :title="personaje.oficio">{{ personaje.oficio }}</div>
       </div>
       <div class="space-y-1">
          <div class="text-xs text-gray-500 uppercase">Estilo</div>
          <div class="font-medium text-gray-800 truncate" :title="personaje.estilo_marcial">{{ personaje.estilo_marcial }}</div>
       </div>
       <div class="space-y-1">
          <div class="text-xs text-gray-500 uppercase">Raza</div>
          <div class="font-medium text-gray-800 truncate" :title="personaje.raza">{{ personaje.raza }}</div>
       </div>
       <div class="space-y-1">
          <div class="text-xs text-gray-500 uppercase">Trasfondo</div>
          <div class="font-medium text-gray-800 truncate" :title="personaje.trasfondo">{{ personaje.trasfondo }}</div>
       </div>
    </div>

    <!-- Atributos Principales -->
    <div class="grid grid-cols-3 gap-3 mb-5">
      <div class="bg-red-50 rounded-lg p-2 text-center border border-red-100">
        <div class="text-[10px] font-bold text-red-600 uppercase mb-1">Cuerpo</div>
        <div class="text-xl font-black text-gray-800">{{ personaje.atributos.cuerpo }}</div>
      </div>
      <div class="bg-green-50 rounded-lg p-2 text-center border border-green-100">
        <div class="text-[10px] font-bold text-green-600 uppercase mb-1">Agilidad</div>
        <div class="text-xl font-black text-gray-800">{{ personaje.atributos.agilidad }}</div>
      </div>
      <div class="bg-blue-50 rounded-lg p-2 text-center border border-blue-100">
        <div class="text-[10px] font-bold text-blue-600 uppercase mb-1">Mente</div>
        <div class="text-xl font-black text-gray-800">{{ personaje.atributos.mente }}</div>
      </div>
    </div>

    <!-- Combate Detallado -->
    <div class="mb-5">
      <h4 class="text-xs font-bold text-gray-500 uppercase mb-3 border-b border-gray-100 pb-1">Estadísticas de Combate</h4>
      <div class="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
        <div class="flex justify-between items-center">
           <span class="text-gray-600 flex items-center gap-1">⚔️ Poderío</span>
           <span class="font-bold text-gray-800">{{ personaje.atributos.poderio }}</span>
        </div>
        <div class="flex justify-between items-center">
           <span class="text-gray-600 flex items-center gap-1">🎯 Puntería</span>
           <span class="font-bold text-gray-800">{{ personaje.atributos.punteria }}</span>
        </div>
        <div class="flex justify-between items-center">
           <span class="text-gray-600 flex items-center gap-1">🛡️ Evasión</span>
           <span class="font-bold text-gray-800">{{ personaje.atributos.evasion }}</span>
        </div>
        <div class="flex justify-between items-center">
           <span class="text-gray-600 flex items-center gap-1">⚡ Iniciativa</span>
           <span class="font-bold text-gray-800">{{ personaje.atributos.iniciativa }}</span>
        </div>
         <div class="flex justify-between items-center">
           <span class="text-gray-600 flex items-center gap-1">🏃 Movimiento</span>
           <span class="font-bold text-gray-800">{{ personaje.atributos.movimiento }}m</span>
        </div>
        <div class="flex justify-between items-center">
           <span class="text-gray-600 flex items-center gap-1">🔄 Acciones</span>
           <span class="font-bold text-gray-800">{{ personaje.atributos.acciones }}</span>
        </div>
      </div>
    </div>

    <!-- Armadura -->
    <div class="mb-5">
       <div class="flex justify-between items-center mb-2">
         <h4 class="text-xs font-bold text-gray-500 uppercase">Armadura Total</h4>
       </div>
       <div class="flex rounded-lg overflow-hidden border border-gray-200 text-center text-xs">
          <div class="flex-1 bg-slate-50 p-2 border-r border-gray-200">
            <div class="font-bold text-gray-800 text-lg">{{ armaduraTotal.penetrante }}</div>
            <div class="text-gray-500 text-[10px] uppercase">Penetrante</div>
          </div>
          <div class="flex-1 bg-slate-50 p-2 border-r border-gray-200">
            <div class="font-bold text-gray-800 text-lg">{{ armaduraTotal.lacerante }}</div>
            <div class="text-gray-500 text-[10px] uppercase">Lacerante</div>
          </div>
          <div class="flex-1 bg-slate-50 p-2">
            <div class="font-bold text-gray-800 text-lg">{{ armaduraTotal.contundente }}</div>
            <div class="text-gray-500 text-[10px] uppercase">Contundente</div>
          </div>
       </div>
    </div>

    <!-- Armas -->
    <div v-if="armasDisponibles.length > 0">
      <h4 class="text-xs font-bold text-gray-500 uppercase mb-3 border-b border-gray-100 pb-1">Armamento</h4>
      <div class="space-y-3">
        <div
          v-for="arma in armasDisponibles"
          :key="arma.id"
          class="bg-white rounded-lg border transition-all duration-200 relative overflow-hidden group"
          :class="arma.id === personaje.armaEquipada ? 'border-amber-400 shadow-md ring-1 ring-amber-400' : 'border-gray-200 hover:border-gray-300'"
        >
          <!-- Active Indicator -->
          <div v-if="arma.id === personaje.armaEquipada" class="absolute top-0 right-0 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
            EQUIPADA
          </div>

          <div class="p-3">
            <div class="flex justify-between items-start mb-1">
               <p class="font-bold text-gray-800 text-sm">{{ arma.nombre }}</p>
            </div>

            <div class="flex gap-2 text-[10px] text-gray-500 mb-2">
               <span class="bg-gray-100 px-1.5 py-0.5 rounded">{{ arma.categoria }}</span>
               <span v-if="arma.distancia_max" class="bg-gray-100 px-1.5 py-0.5 rounded">Rango: {{ arma.distancia_max }}m</span>
            </div>

            <div class="flex justify-between items-end">
               <div class="text-xs text-gray-600 font-mono">
                 P:{{ arma.penetrante }} L:{{ arma.lacerante }} C:{{ arma.contundente }}
               </div>

               <button
                 v-if="arma.id !== personaje.armaEquipada && esActivo"
                 @click="cambiarArma(arma.id)"
                 class="px-3 py-1 bg-gray-800 text-white text-xs font-bold rounded hover:bg-black transition-colors shadow-sm"
               >
                 Equipar (1 AP)
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PersonajeInstancia } from "../../domain/Partida";
import armasData from "../../assets/armas.json";
import armadurasData from "../../assets/armaduras.json";
import { usePartida } from "../../domain/usePartida";

const props = defineProps<{
  personaje: PersonajeInstancia;
}>();

const { cambiarArmaActivo, personajeActivo } = usePartida();

const esActivo = computed(() => {
    return personajeActivo.value && personajeActivo.value.instanciaId === props.personaje.instanciaId;
});

const porcentajeVida = computed(() => {
  return Math.min(100, Math.max(0, (props.personaje.vidaActual / props.personaje.atributos.hp) * 100));
});

const colorBarraVida = computed(() => {
  if (porcentajeVida.value < 30) return 'bg-red-600';
  if (porcentajeVida.value < 60) return 'bg-yellow-500';
  return 'bg-green-500';
});

const armaduraTotal = computed(() => {
  const resistencia = props.personaje.atributos.resistencia || 0;
  let total = {
    penetrante: resistencia,
    lacerante: resistencia,
    contundente: resistencia,
  };

  if (props.personaje.armaduras && props.personaje.armaduras.length > 0) {
    props.personaje.armaduras.forEach((armaduraId) => {
      const armadura = armadurasData.armaduras.find(
        (a: any) => a.id === armaduraId,
      );
      if (armadura) {
        total.penetrante += armadura.penetrante || 0;
        total.lacerante += armadura.lacerante || 0;
        total.contundente += armadura.contundente || 0;
      }
    });
  }
  return total;
});

const armasDisponibles = computed(() => {
  if (!props.personaje.armas || props.personaje.armas.length === 0) return [];
  return props.personaje.armas
    .map((armaId) => {
      return armasData.armas.find((a: any) => a.id === armaId);
    })
    .filter((arma) => arma !== undefined);
});

function cambiarArma(id: number) {
    cambiarArmaActivo(id);
}
</script>
