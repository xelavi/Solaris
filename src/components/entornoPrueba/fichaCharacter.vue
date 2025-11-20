<template>
  <div class="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 w-80 max-h-[85vh] overflow-y-auto">
    <!-- Header con nombre -->
    <div class="mb-3 pb-3 border-b-2 border-gray-200">
      <h3 class="text-2xl font-bold text-gray-800">
        {{ personaje.nombre }}
      </h3>
      <p class="text-sm text-gray-600">
        Nivel {{ personaje.nivel }}
      </p>
    </div>

    <!-- Vida -->
    <div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm font-semibold text-gray-700">Vida</span>
        <span class="text-sm font-bold text-red-600">
          {{ personaje.vidaActual }} /
          {{ personaje.atributos.hp }}
        </span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          class="bg-gradient-to-r from-red-500 to-red-600 h-full transition-all duration-300"
          :style="{
            width: `${
              (personaje.vidaActual /
                personaje.atributos.hp) *
              100
            }%`,
          }"
        ></div>
      </div>
      <div
        v-if="personaje.vidaTemporal > 0"
        class="mt-1 text-xs text-blue-600"
      >
        +{{ personaje.vidaTemporal }} vida temporal
      </div>
    </div>

    <!-- Información básica -->
    <div class="grid grid-cols-2 gap-2 mb-4">
      <div class="bg-blue-50 rounded p-2">
        <p class="text-xs text-blue-600 font-semibold">Oficio</p>
        <p class="text-sm text-gray-800 truncate">
          {{ personaje.oficio }}
        </p>
      </div>
      <div class="bg-purple-50 rounded p-2">
        <p class="text-xs text-purple-600 font-semibold">Estilo Marcial</p>
        <p class="text-sm text-gray-800 truncate">
          {{ personaje.estilo_marcial }}
        </p>
      </div>
      <div class="bg-green-50 rounded p-2">
        <p class="text-xs text-green-600 font-semibold">Trasfondo</p>
        <p class="text-sm text-gray-800 truncate">
          {{ personaje.trasfondo }}
        </p>
      </div>
      <div class="bg-orange-50 rounded p-2">
        <p class="text-xs text-orange-600 font-semibold">Raza</p>
        <p class="text-sm text-gray-800 truncate">
          {{ personaje.raza }}
        </p>
      </div>
    </div>

    <!-- Atributos principales -->
    <div class="mb-4">
      <h4 class="text-sm font-bold text-gray-700 mb-2">Atributos</h4>
      <div class="grid grid-cols-3 gap-2">
        <div class="bg-red-50 rounded p-2 text-center">
          <p class="text-xs text-red-600 font-semibold">Cuerpo</p>
          <p class="text-lg font-bold text-gray-800">
            {{ personaje.atributos.cuerpo }}
          </p>
        </div>
        <div class="bg-green-50 rounded p-2 text-center">
          <p class="text-xs text-green-600 font-semibold">Agilidad</p>
          <p class="text-lg font-bold text-gray-800">
            {{ personaje.atributos.agilidad }}
          </p>
        </div>
        <div class="bg-blue-50 rounded p-2 text-center">
          <p class="text-xs text-blue-600 font-semibold">Mente</p>
          <p class="text-lg font-bold text-gray-800">
            {{ personaje.atributos.mente }}
          </p>
        </div>
      </div>
    </div>

    <!-- Estadísticas de combate -->
    <div class="mb-4">
      <h4 class="text-sm font-bold text-gray-700 mb-2">Combate</h4>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div class="flex justify-between bg-gray-50 rounded p-2">
          <span class="text-gray-600">⚔️ Poderío:</span>
          <span class="font-bold">{{
            personaje.atributos.poderio
          }}</span>
        </div>
        <div class="flex justify-between bg-gray-50 rounded p-2">
          <span class="text-gray-600">🎯 Puntería:</span>
          <span class="font-bold">{{
            personaje.atributos.punteria
          }}</span>
        </div>
        <div class="flex justify-between bg-gray-50 rounded p-2">
          <span class="text-gray-600">🛡️ Evasión:</span>
          <span class="font-bold">{{
            personaje.atributos.evasion
          }}</span>
        </div>
        <div class="flex justify-between bg-gray-50 rounded p-2">
          <span class="text-gray-600">🏃 Movimiento:</span>
          <span class="font-bold">{{
            personaje.atributos.movimiento
          }}</span>
        </div>
        <div class="flex justify-between bg-gray-50 rounded p-2">
          <span class="text-gray-600">⚡ Iniciativa:</span>
          <span class="font-bold">{{
            personaje.atributos.iniciativa
          }}</span>
        </div>
        <div class="flex justify-between bg-gray-50 rounded p-2">
          <span class="text-gray-600">🔄 Acciones:</span>
          <span class="font-bold">{{
            personaje.atributos.acciones
          }}</span>
        </div>
      </div>
    </div>

    <!-- Armadura -->
    <div class="mb-4">
      <h4 class="text-sm font-bold text-gray-700 mb-2">🛡️ Armadura</h4>
      <div class="grid grid-cols-3 gap-2 text-xs">
        <div class="bg-slate-100 rounded p-2 text-center">
          <p class="text-gray-600">Penetrante</p>
          <p class="font-bold text-gray-800">
            {{ calcularArmadura(personaje).penetrante }}
          </p>
        </div>
        <div class="bg-slate-100 rounded p-2 text-center">
          <p class="text-gray-600">Lacerante</p>
          <p class="font-bold text-gray-800">
            {{ calcularArmadura(personaje).lacerante }}
          </p>
        </div>
        <div class="bg-slate-100 rounded p-2 text-center">
          <p class="text-gray-600">Contundente</p>
          <p class="font-bold text-gray-800">
            {{ calcularArmadura(personaje).contundente }}
          </p>
        </div>
      </div>
    </div>

    <!-- Armas -->
    <div v-if="obtenerArmas(personaje).length > 0" class="mb-4">
      <h4 class="text-sm font-bold text-gray-700 mb-2">🗡️ Armas</h4>
      <div class="space-y-1">
        <div
          v-for="arma in obtenerArmas(personaje)"
          :key="arma.id"
          class="text-xs bg-amber-50 rounded p-2"
          :class="{
            'ring-2 ring-amber-500':
              arma.id === personaje.armaEquipada,
          }"
        >
          <p class="font-semibold text-gray-800">
            {{ arma.nombre }}
            <span
              v-if="arma.id === personaje.armaEquipada"
              class="text-amber-600"
            >
              (Equipada)</span
            >
          </p>
          <p class="text-gray-600">
            P:{{ arma.penetrante }} L:{{ arma.lacerante }} C:{{
              arma.contundente
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PersonajeInstancia } from "../../domain/Partida";
import armasData from "../../assets/armas.json";
import armadurasData from "../../assets/armaduras.json";

defineProps<{
  personaje: PersonajeInstancia;
}>();

function calcularArmadura(personaje: PersonajeInstancia) {
  const resistencia = personaje.atributos.resistencia || 0;

  // Obtener armaduras equipadas
  let armaduraTotal = {
    penetrante: resistencia,
    lacerante: resistencia,
    contundente: resistencia,
  };

  // Sumar las armaduras equipadas
  if (personaje.armaduras && personaje.armaduras.length > 0) {
    personaje.armaduras.forEach((armaduraId) => {
      const armadura = armadurasData.armaduras.find(
        (a: any) => a.id === armaduraId
      );
      if (armadura) {
        armaduraTotal.penetrante += armadura.penetrante || 0;
        armaduraTotal.lacerante += armadura.lacerante || 0;
        armaduraTotal.contundente += armadura.contundente || 0;
      }
    });
  }

  return armaduraTotal;
}

function obtenerArmas(personaje: PersonajeInstancia) {
  if (!personaje.armas || personaje.armas.length === 0) return [];

  return personaje.armas
    .map((armaId) => {
      return armasData.armas.find((a: any) => a.id === armaId);
    })
    .filter((arma) => arma !== undefined);
}
</script>