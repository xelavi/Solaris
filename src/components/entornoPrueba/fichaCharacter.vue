<template>
  <div class="w-full p-5 text-gray-100">

    <!-- Header -->
    <div class="mb-4 pb-3 border-b border-gray-700 flex justify-between items-start">
      <div>
        <h3 class="text-2xl font-bold text-white leading-tight font-serif tracking-wide">
          {{ personaje.nombre }}
        </h3>
        <p class="text-sm font-medium text-gray-400 mt-1">Nivel {{ personaje.nivel }}</p>
      </div>

      <div class="flex flex-col items-end">
         <div v-if="esActivo" class="px-2 py-0.5 bg-green-900/50 text-green-400 text-[10px] font-bold rounded border border-green-700 mb-1 tracking-wider uppercase">
            Tu Turno
         </div>

         <!-- Action Points Visual -->
         <div class="flex flex-col items-end gap-1">
            <div class="text-xs font-bold text-yellow-500 uppercase tracking-widest">Acciones</div>
            <div class="flex gap-1.5">
                <div
                   v-for="i in personaje.atributos.acciones"
                   :key="i"
                   class="w-3 h-3 rotate-45 border"
                   :class="isActionAvailable(i) ? 'bg-yellow-500 border-yellow-300 shadow-[0_0_5px_rgba(234,179,8,0.8)]' : 'bg-gray-800 border-gray-600'"
                ></div>
            </div>
         </div>
      </div>
    </div>

    <!-- Vida -->
    <div class="mb-5 bg-gray-800/50 p-3 rounded-lg border border-gray-700 relative overflow-hidden group">
      <div class="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div class="flex justify-between items-center mb-2 relative z-10">
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">HP / Vida</span>
        <span class="text-sm font-bold font-mono">
          <span :class="{'text-red-400': porcentajeVida < 30, 'text-white': porcentajeVida >= 30}">{{ personaje.vidaActual }}</span>
          <span class="text-gray-600">/</span>
          <span class="text-gray-400">{{ personaje.atributos.hp }}</span>
        </span>
      </div>

      <!-- Barra HP Custom -->
      <div class="w-full h-3 bg-gray-900 rounded-sm overflow-hidden border border-gray-700 relative">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-20" style="background-image: repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 4px);"></div>

          <!-- Fill -->
          <div
            class="h-full transition-all duration-500 ease-out relative"
            :class="colorBarraVida"
            :style="{ width: `${porcentajeVida}%` }"
          >
             <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
          </div>
      </div>

      <div v-if="personaje.vidaTemporal > 0" class="mt-2 text-xs font-bold text-blue-400 flex items-center gap-1">
        <span class="animate-pulse">🛡️</span> +{{ personaje.vidaTemporal }} temporal
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 gap-2 mb-5 text-xs">
       <div class="bg-gray-800/50 p-2 rounded border border-gray-700">
          <div class="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Especialidad</div>
          <div class="text-gray-200 truncate" :title="personaje.especialidad">{{ personaje.especialidad }}</div>
       </div>
       <div class="bg-gray-800/50 p-2 rounded border border-gray-700">
          <div class="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Estilo</div>
          <div class="text-gray-200 truncate" :title="personaje.estilo_marcial">{{ personaje.estilo_marcial }}</div>
       </div>
       <div class="bg-gray-800/50 p-2 rounded border border-gray-700">
          <div class="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Raza</div>
          <div class="text-gray-200 truncate" :title="personaje.raza">{{ personaje.raza }}</div>
       </div>
       <div class="bg-gray-800/50 p-2 rounded border border-gray-700">
          <div class="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Trasfondo</div>
          <div class="text-gray-200 truncate" :title="personaje.trasfondo">{{ personaje.trasfondo }}</div>
       </div>
    </div>

    <!-- Atributos Principales -->
    <div class="grid grid-cols-3 gap-3 mb-5">
      <div class="bg-gradient-to-b from-red-900/20 to-gray-800 rounded-lg p-2 text-center border border-red-900/30 shadow-inner">
        <div class="text-[9px] font-bold text-red-500 uppercase mb-1 tracking-widest">Cuerpo</div>
        <div class="text-xl font-black text-red-100 font-serif">{{ personaje.atributos.cuerpo }}</div>
      </div>
      <div class="bg-gradient-to-b from-green-900/20 to-gray-800 rounded-lg p-2 text-center border border-green-900/30 shadow-inner">
        <div class="text-[9px] font-bold text-green-500 uppercase mb-1 tracking-widest">Agilidad</div>
        <div class="text-xl font-black text-green-100 font-serif">{{ personaje.atributos.agilidad }}</div>
      </div>
      <div class="bg-gradient-to-b from-blue-900/20 to-gray-800 rounded-lg p-2 text-center border border-blue-900/30 shadow-inner">
        <div class="text-[9px] font-bold text-blue-500 uppercase mb-1 tracking-widest">Mente</div>
        <div class="text-xl font-black text-blue-100 font-serif">{{ personaje.atributos.mente }}</div>
      </div>
    </div>

    <!-- Combate Detallado -->
    <div class="mb-5 bg-gray-800/30 p-3 rounded-lg border border-gray-700/50">
      <h4 class="text-[10px] font-bold text-gray-500 uppercase mb-3 border-b border-gray-700 pb-1 flex justify-between">
          <span>Estadísticas de Combate</span>
          <span>📊</span>
      </h4>
      <div class="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-mono">
        <div class="flex justify-between items-center group">
           <span class="text-gray-500 group-hover:text-gray-300 transition-colors">Poderío</span>
           <span class="font-bold text-white">{{ personaje.atributos.poderio }}</span>
        </div>
        <div class="flex justify-between items-center group">
           <span class="text-gray-500 group-hover:text-gray-300 transition-colors">Puntería</span>
           <span class="font-bold text-white">{{ personaje.atributos.punteria }}</span>
        </div>
        <div class="flex justify-between items-center group">
           <span class="text-gray-500 group-hover:text-gray-300 transition-colors">Evasión</span>
           <span class="font-bold text-white">{{ personaje.atributos.evasion }}</span>
        </div>
        <div class="flex justify-between items-center group">
           <span class="text-gray-500 group-hover:text-gray-300 transition-colors">Iniciativa</span>
           <span class="font-bold text-white">{{ personaje.atributos.iniciativa }}</span>
        </div>
         <div class="flex justify-between items-center group">
           <span class="text-gray-500 group-hover:text-gray-300 transition-colors">Movimiento</span>
           <span class="font-bold text-white">{{ personaje.atributos.movimiento }}m</span>
        </div>
      </div>
    </div>

    <!-- Armadura -->
    <div class="mb-5">
       <div class="flex justify-between items-center mb-2">
         <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Defensa / Armadura</h4>
       </div>
       <div class="flex rounded overflow-hidden border border-gray-700 text-center text-xs bg-gray-800">
          <div class="flex-1 p-2 border-r border-gray-700 hover:bg-gray-700 transition-colors">
            <div class="font-bold text-white text-lg font-mono">{{ armaduraTotal.perforante }}</div>
            <div class="text-gray-500 text-[8px] uppercase tracking-tighter">Perforante</div>
          </div>
          <div class="flex-1 p-2 border-r border-gray-700 hover:bg-gray-700 transition-colors">
            <div class="font-bold text-white text-lg font-mono">{{ armaduraTotal.lacerante }}</div>
            <div class="text-gray-500 text-[8px] uppercase tracking-tighter">Lacerante</div>
          </div>
          <div class="flex-1 p-2 hover:bg-gray-700 transition-colors">
            <div class="font-bold text-white text-lg font-mono">{{ armaduraTotal.contundente }}</div>
            <div class="text-gray-500 text-[8px] uppercase tracking-tighter">Contundente</div>
          </div>
       </div>
    </div>

    <!-- Armas -->
    <div v-if="armasDisponibles.length > 0">
      <h4 class="text-[10px] font-bold text-gray-500 uppercase mb-3 border-b border-gray-700 pb-1">Inventario: Armas</h4>
      <div class="space-y-3">
        <div
          v-for="arma in armasDisponibles"
          :key="arma.id"
          class="bg-gray-800 rounded border transition-all duration-200 relative overflow-hidden group"
          :class="arma.id === personaje.armaEquipada ? 'border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]' : 'border-gray-700 hover:border-gray-500'"
        >
          <!-- Active Indicator -->
          <div v-if="arma.id === personaje.armaEquipada" class="absolute top-0 right-0 bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl shadow-sm">
            EQUIPADA
          </div>

          <div class="p-3">
            <div class="flex justify-between items-start mb-1">
               <p class="font-bold text-gray-200 text-sm group-hover:text-amber-400 transition-colors">{{ arma.nombre }}</p>
            </div>

            <div class="flex gap-2 text-[9px] text-gray-500 mb-2">
               <span class="bg-gray-900 px-1.5 py-0.5 rounded border border-gray-700">{{ arma.categoria }}</span>
               <span v-if="arma.distancia_max" class="bg-gray-900 px-1.5 py-0.5 rounded border border-gray-700">Rango: {{ arma.distancia_max }}m</span>
            </div>

            <div class="flex justify-between items-end">
               <div class="text-[10px] text-gray-400 font-mono">
                 P:<span class="text-gray-300">{{ arma.perforante }}</span> L:<span class="text-gray-300">{{ arma.lacerante }}</span> C:<span class="text-gray-300">{{ arma.contundente }}</span>
               </div>

               <button
                 v-if="arma.id !== personaje.armaEquipada && esActivo"
                 @click="cambiarArma(arma.id)"
                 class="px-2 py-1 bg-gray-700 text-white text-[10px] font-bold rounded hover:bg-amber-600 hover:text-white transition-all shadow border border-gray-600 hover:border-amber-500"
               >
                 EQUIPAR (1 AP)
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

const { cambiarArmaActivo, personajeActivo, accionesRestantes } = usePartida();

const esActivo = computed(() => {
    return personajeActivo.value && personajeActivo.value.instanciaId === props.personaje.instanciaId;
});

function isActionAvailable(index: number) {
    if (esActivo.value) {
        return index <= accionesRestantes.value;
    }
    // For non-active characters, show full actions (or empty if you prefer)
    // Usually in RPGs, you see max capacity.
    return true;
}

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
    perforante: resistencia,
    lacerante: resistencia,
    contundente: resistencia,
  };

  if (props.personaje.armaduras && props.personaje.armaduras.length > 0) {
    props.personaje.armaduras.forEach((armaduraId) => {
      const armadura = armadurasData.armaduras.find(
        (a: any) => a.id === armaduraId,
      );
      if (armadura) {
        total.perforante += armadura.perforante || 0;
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
