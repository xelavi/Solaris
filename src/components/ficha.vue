<template> 

<body class="bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
  <div id="app" class="max-w-7xl mx-auto">
    <div class="bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-8 shadow-xl">
      <h2 class="text-4xl font-bold text-gray-600 mb-6 pb-4 border-b border-gray-200 text-center">
        {{ personaje.nombre }}
      </h2>
      
      <!-- Grid Principal -->
      <div class="grid grid-cols-12 gap-6">
        
        <!-- Columna Izquierda -->
        <div class="col-span-4 space-y-6">
          
          <!-- Información Básica -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
            <h3 class="text-base font-bold text-gray-700 mb-2 pb-2 border-b border-blue-300">Información Básica</h3>
            <div class="space-y-2">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Nombre</div>
                  <div class="text-base font-bold text-gray-800">{{ personaje.nombre }}</div>
                </div>
                <div>
                  <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Nivel</div>
                  <div class="text-lg font-bold text-gray-800">{{ personaje.nivel }}</div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Oficio</div>
                  <div class="text-sm font-bold text-gray-800">{{ personaje.oficio }}</div>
                </div>
                <div>
                  <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Trasfondo</div>
                  <div class="text-sm font-bold text-gray-800">{{ personaje.trasfondo }}</div>
                </div>
              </div>
              <div>
                <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Estilo Marcial</div>
                <div class="text-sm font-bold text-gray-800">{{ personaje.estiloMarcial }}</div>
              </div>
            </div>
          </div>

          <!-- Dotes de Oficio -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 class="text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300">Dotes de Oficio</h3>
            <div class="max-h-64 overflow-y-auto pr-2 space-y-2">
              <div 
                v-for="dote in personaje.dotesOficio" 
                :key="dote.nombre"
                class="bg-white border border-blue-300 rounded-lg p-3"
              >
                <div class="font-semibold text-gray-600 text-sm">{{ dote.nombre }}</div>
                <div class="text-xs text-blue-600 mt-1">{{ dote.descripcion }}</div>
              </div>
            </div>
          </div>

          <!-- Dotes de Estilo Marcial -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 class="text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300">Dotes de Estilo Marcial</h3>
            <div class="max-h-64 overflow-y-auto pr-2 space-y-2">
              <div 
                v-for="dote in personaje.dotesEstilo" 
                :key="dote.nombre"
                class="bg-white border border-blue-300 rounded-lg p-3"
              >
                <div class="font-semibold text-gray-600 text-sm">{{ dote.nombre }}</div>
                <div class="text-xs text-blue-600 mt-1">{{ dote.descripcion }}</div>
              </div>
            </div>
          </div>

          <!-- Habilidades Activas -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 class="text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300">Habilidades Activas</h3>
            <div class="space-y-2">
              <div 
                v-for="activa in personaje.activas" 
                :key="activa.nombre"
                class="bg-white border border-blue-300 rounded-lg p-3"
              >
                <div class="font-semibold text-gray-600 text-sm">{{ activa.nombre }}</div>
                <div class="text-xs text-blue-600 mt-1">{{ activa.descripcion }}</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Columna Central -->
        <div class="col-span-4 space-y-6">
          
          <!-- HP -->
          <div class="bg-gradient-to-r from-green-300 to-green-400 border-2 border-green-700     rounded-lg p-4 shadow-lg">
            <div class="text-white text-center">
              <div class="text-xs font-bold uppercase tracking-wide opacity-90 mb-1">Puntos de Vida</div>
              <div class="text-4xl font-bold">{{ personaje.hp.actual }}</div>
              
            </div>
          </div>

          <!-- Estadísticas de Cuerpo -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2 pb-2 border-b border-blue-300">
              <h3 class="text-base font-bold text-gray-700">Cuerpo</h3>
              <div class="text-2xl font-bold text-blue-600">{{ personaje.cuerpo.total }}</div>
            </div>
            <div class="grid grid-cols-3 gap-1">
              <div class="bg-white border border-blue-300 rounded-lg p-2 text-center">
                <div class="text-xs font-semibold text-gray-600 mb-1">Poderío</div>
                <div class="text-base font-bold text-blue-600">{{ personaje.cuerpo.poderio }}</div>
              </div>
              <div class="bg-white border border-blue-300 rounded-lg p-2 text-center">
                <div class="text-xs font-semibold text-gray-600 mb-1">Movimiento</div>
                <div class="text-base font-bold text-blue-600">{{ personaje.cuerpo.movimiento }}</div>
              </div>
              <div class="bg-white border border-blue-300 rounded-lg p-2 text-center">
                <div class="text-xs font-semibold text-gray-600 mb-1">Resistencia</div>
                <div class="text-base font-bold text-blue-600">{{ personaje.cuerpo.resistencia }}</div>
              </div>
            </div>
          </div>

          <!-- Estadísticas de Agilidad -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2 pb-2 border-b border-blue-300">
              <h3 class="text-base font-bold text-gray-700">Agilidad</h3>
              <div class="text-2xl font-bold text-blue-600">{{ personaje.agilidad.total }}</div>
            </div>
            <div class="grid grid-cols-3 gap-1 mb-3">
              <div class="bg-white border border-blue-300 rounded-lg p-2 text-center">
                <div class="text-xs font-semibold text-gray-600 mb-1">Esquiva</div>
                <div class="text-base font-bold text-blue-600">{{ personaje.agilidad.esquiva }}</div>
              </div>
              <div class="bg-white border border-blue-300 rounded-lg p-2 text-center">
                <div class="text-xs font-semibold text-gray-600 mb-1">Iniciativa</div>
                <div class="text-base font-bold text-blue-600">{{ personaje.agilidad.iniciativa }}</div>
              </div>
              <div class="bg-white border border-blue-300 rounded-lg p-2 text-center">
                <div class="text-xs font-semibold text-gray-600 mb-1">Deadeye</div>
                <div class="text-base font-bold text-blue-600">{{ personaje.agilidad.deadeye }}</div>
              </div>
            </div>
            <!-- Acciones y Reacciones -->
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 text-center">
                <div class="text-xs font-bold text-blue-gray uppercase tracking-wide mb-1">Acciones</div>
                <div class="text-2xl font-bold text-blue-600">{{ personaje.acciones }}</div>
              </div>
              <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 text-center">
                <div class="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">Reacciones</div>
                <div class="text-2xl font-bold text-blue-600">{{ personaje.reacciones }}</div>
              </div>
            </div>
          </div>

          <!-- Estadísticas de Mente -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2 pb-2 border-b border-blue-300">
              <h3 class="text-base font-bold text-gray-700">Mente</h3>
              <div class="text-2xl font-bold text-blue-600">{{ personaje.mente.total }}</div>
            </div>
            <div class="grid grid-cols-2 gap-1">
              <div class="bg-white border border-blue-300 rounded-lg p-2 text-center">
                <div class="text-xs font-semibold text-gray-600 mb-1">Voluntad</div>
                <div class="text-base font-bold text-blue-600">{{ personaje.mente.voluntad }}</div>
              </div>
              <div class="bg-white border border-blue-300 rounded-lg p-2 text-center">
                <div class="text-xs font-semibold text-gray-600 mb-1">Pts. Habilidad</div>
                <div class="text-base font-bold text-blue-600">{{ personaje.mente.puntosHabilidadRestantes }}</div>
              </div>
            </div>
          </div>

          <!-- Armas y Armaduras -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 class="text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300">Armas</h3>
            <div class=" gap-2 mb-4">
              <div 
                v-for="arma in personaje.armas" 
                :key="arma.nombre"
                class="bg-white border border-blue-300 rounded-lg p-2"
              >
                <div class="flex justify-between items-start mb-1">
                  <div class="font-semibold text-gray-600 text-sm">{{ arma.nombre }}</div>
                  <div class="flex gap-1 flex-wrap">
                    <span 
                      v-for="etiqueta in arma.etiquetas" 
                      :key="etiqueta"
                      class="px-1 py-0.5 bg-blue-500 text-white text-xs rounded-full"
                    >
                      {{ etiqueta }}
                    </span>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-1 text-xs mb-1">
                  <div class="bg-blue-50 rounded p-1 text-center">
                    <div class="text-blue-600 font-semibold">Lac: {{ arma.lac }}</div>
                  </div>
                  <div class="bg-blue-50 rounded p-1 text-center">
                    <div class="text-blue-600 font-semibold">Cor: {{ arma.cor }}</div>
                  </div>
                  <div class="bg-blue-50 rounded p-1 text-center">
                    <div class="text-blue-600 font-semibold">Con: {{ arma.con }}</div>
                  </div>
                </div>
                <div class="flex justify-between text-xs text-blue-600">
                  <span>Crít: x{{ arma.critico }} ({{ arma.rangoCritico }})</span>
                  <span v-if="arma.distancia > 0">Dist: {{ arma.distancia }}m</span>
                </div>
              </div>
            </div>

            <div class="border-t-2 border-blue-300 pt-4 mt-4">
              <h3 class="text-lg font-bold text-gray-700 mb-3">Armaduras</h3>
              <div class=" gap-2">
                <div 
                  v-for="armadura in personaje.armaduras" 
                  :key="armadura.nombre"
                  class="bg-white border border-blue-300 rounded-lg p-2"
                >
                  <div class="flex justify-between items-start mb-1">
                    <div class="font-semibold text-gray-600 text-sm">{{ armadura.nombre }}</div>
                    <div class="flex gap-1 flex-wrap">
                      <span 
                        v-for="etiqueta in armadura.etiquetas" 
                        :key="etiqueta"
                        class="px-1 py-0.5 bg-blue-500 text-white text-xs rounded-full"
                      >
                        {{ etiqueta }}
                      </span>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-1 text-xs">
                    <div class="bg-blue-50 rounded p-1 text-center">
                      <div class="text-blue-600 font-semibold">Lac: {{ armadura.lac }}</div>
                    </div>
                    <div class="bg-blue-50 rounded p-1 text-center">
                      <div class="text-blue-600 font-semibold">Cor: {{ armadura.cor }}</div>
                    </div>
                    <div class="bg-blue-50 rounded p-1 text-center">
                      <div class="text-blue-600 font-semibold">Con: {{ armadura.con }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Columna Derecha -->
        <div class="col-span-4 space-y-6">
          
          <!-- Habilidades -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 class="text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300">Habilidades</h3>
            <div class="max-h-[900px] overflow-y-auto pr-2 space-y-1">
              <div 
                v-for="habilidad in personaje.habilidades" 
                :key="habilidad.nombre"
                class="flex justify-between items-center bg-white border border-blue-300 rounded-lg p-2 hover:bg-blue-100 transition-colors"
              >
                <div class="flex items-center gap-2">
                  <div v-if="habilidad.competente" class="w-4 h-4 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-xs font-bold">✓</span>
                  </div>
                  <div v-else class="w-4 h-4 border-2 border-blue-300 rounded flex-shrink-0"></div>
                  <span class="font-semibold text-gray-600 text-sm">{{ habilidad.nombre }}</span>
                </div>
                <span class="text-lg font-bold text-blue-800">{{ habilidad.total >= 0 ? '+' : '' }}{{ habilidad.total }}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</body>
</template>  


<script setup lang="ts">
import { ref} from 'vue';
const personaje = ref({
            nombre: 'Thorin Escudo de Hierro',
            nivel: 8,
            trasfondo: 'Soldado',
            oficio: 'Guerrero',
            estiloMarcial: 'Espada y Escudo',
            
            hp: {
              actual: 85,
              maximo: 120
            },
            
            cuerpo: {
              total: 16,
              poderio: 18,
              movimiento: 12,
              resistencia: 15
            },
            
            agilidad: {
              total: 14,
              esquiva: 16,
              iniciativa: 15,
              deadeye: 11
            },
            
            mente: {
              total: 12,
              voluntad: 14,
              puntosHabilidadRestantes: 3
            },
            
            acciones: 2,
            reacciones: 1,
            
            dotesOficio: [
              { nombre: 'Ataque Potente', descripcion: 'Sacrificas precisión por poder. -2 ataque, +5 daño.' },
              { nombre: 'Defensa Mejorada', descripcion: 'Tu CA aumenta en +1 mientras llevas armadura pesada.' },
              { nombre: 'Segundo Aliento', descripcion: 'Recuperas 1d10 + nivel en PV como acción bonus.' }
            ],
            
            dotesEstilo: [
              { nombre: 'Maestro del Escudo', descripcion: 'Puedes usar tu escudo para hacer ataques de oportunidad.' },
              { nombre: 'Muro Defensivo', descripcion: 'Los aliados adyacentes obtienen +2 CA mientras usas escudo.' }
            ],
            
            activas: [
              { nombre: 'Carga', descripcion: 'Te mueves hasta tu velocidad y realizas un ataque cuerpo a cuerpo con bonificador.' },
              { nombre: 'Salto', descripcion: 'Saltas una distancia mayor ignorando terreno difícil.' },
              { nombre: 'Apuntar', descripcion: 'Te concentras en tu objetivo para obtener ventaja en el próximo ataque.' }
            ],
            
            habilidades: [
              { nombre: 'Acrobacias', competente: true, total: 7 },
              { nombre: 'Arcano', competente: false, total: 1 },
              { nombre: 'Atletismo', competente: true, total: 12 },
              { nombre: 'Engaño', competente: false, total: 0 },
              { nombre: 'Historia', competente: true, total: 5 },
              { nombre: 'Intimidación', competente: true, total: 8 },
              { nombre: 'Investigación', competente: false, total: 1 },
              { nombre: 'Juego de Manos', competente: false, total: 3 },
              { nombre: 'Medicina', competente: false, total: 2 },
              { nombre: 'Naturaleza', competente: false, total: 1 },
              { nombre: 'Percepción', competente: true, total: 10 },
              { nombre: 'Perspicacia', competente: true, total: 6 },
              { nombre: 'Persuasión', competente: false, total: 2 },
              { nombre: 'Religión', competente: false, total: 1 },
              { nombre: 'Sigilo', competente: false, total: 3 },
              { nombre: 'Supervivencia', competente: true, total: 9 },
              { nombre: 'Trato con Animales', competente: false, total: 2 }
            ],
            
            armas: [
              {
                nombre: 'Espada Larga',
                lac: 4,
                cor: 8,
                con: 0,
                etiquetas: ['Versátil'],
                critico: 2,
                rangoCritico: '19/20',
                distancia: 0
              },
              {
                nombre: 'Escudo de Acero',
                lac: 0,
                cor: 0,
                con: 4,
                etiquetas: ['Escudo'],
                critico: 2,
                rangoCritico: '20',
                distancia: 0
              }
            ],
            
            armaduras: [
              {
                nombre: 'Armadura de Placas',
                lac: 8,
                cor: 8,
                con: 6,
                etiquetas: ['Pesada', 'Metal']
              }
            ]
          }
);
        
</script>