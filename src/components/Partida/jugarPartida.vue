<template>
  <div class="w-full h-screen relative">
    <!-- Canvas container -->
    <div ref="canvasContainer" class="w-full h-full"></div>

    <!-- Barra de Orden de Turnos -->
    <div
      v-if="ordenTurnos.length > 0"
      class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl px-4 py-3"
    >
      <div class="flex items-center gap-3">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >Orden de Turnos:</span
        >
        <div class="flex gap-2">
          <div
            v-for="(resultado, index) in ordenTurnos"
            :key="resultado.personaje.instanciaId"
            :class="[
              'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
              index === turnoActual
                ? 'bg-gradient-to-r from-yellow-500 to-amber-500 ring-2 ring-yellow-300 scale-110 shadow-lg'
                : 'bg-gray-700 hover:bg-gray-600',
            ]"
          >
            <span
              :class="[
                'font-bold text-sm',
                index === turnoActual ? 'text-gray-900' : 'text-white',
              ]"
            >
              {{ index + 1 }}.
            </span>
            <span
              :class="[
                'font-semibold text-sm',
                index === turnoActual ? 'text-gray-900' : 'text-gray-200',
              ]"
            >
              {{ resultado.personaje.nombre }}
            </span>
            <span
              :class="[
                'text-xs font-mono px-2 py-0.5 rounded',
                index === turnoActual
                  ? 'bg-gray-900/20 text-gray-900'
                  : 'bg-gray-800 text-gray-400',
              ]"
            >
              {{ resultado.tirada }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- UI Overlay - Info de partida -->
    <div
      class="absolute top-20 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-2">Mapa de Combate</h2>
      <div v-if="partidaActual" class="mb-3 p-2 bg-blue-50 rounded">
        <p class="text-sm font-semibold text-blue-800">
          {{ partidaActual.nombre }}
        </p>
        <p class="text-xs text-blue-600">
          {{ contarTotalPersonajes() }} personajes
        </p>
      </div>
      <div class="space-y-2 text-sm text-gray-600">
        <p>🖱️ <strong>Clic Izquierdo:</strong> Mover cámara</p>
        <p>🖱️ <strong>Rueda:</strong> Zoom</p>
        <p>🖱️ <strong>Clic Derecho:</strong> Rotar</p>
      </div>
    </div>

    <!-- Ficha de Personaje -->
    <div
      v-if="personajeSeleccionado"
      class="absolute top-20 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 w-80 max-h-[85vh] overflow-y-auto"
    >
      <!-- Header con nombre -->
      <div class="mb-3 pb-3 border-b-2 border-gray-200">
        <h3 class="text-2xl font-bold text-gray-800">
          {{ personajeSeleccionado.nombre }}
        </h3>
        <p class="text-sm text-gray-600">
          Nivel {{ personajeSeleccionado.nivel }}
        </p>
        <div class="mt-2 text-xs text-blue-600 font-semibold">
          🎯 Turno Actual
        </div>
      </div>

      <!-- Vida -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-semibold text-gray-700">Vida</span>
          <span class="text-sm font-bold text-red-600">
            {{ personajeSeleccionado.vidaActual }} /
            {{ personajeSeleccionado.atributos.hp }}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            class="bg-gradient-to-r from-red-500 to-red-600 h-full transition-all duration-300"
            :style="{
              width: `${
                (personajeSeleccionado.vidaActual /
                  personajeSeleccionado.atributos.hp) *
                100
              }%`,
            }"
          ></div>
        </div>
        <div
          v-if="personajeSeleccionado.vidaTemporal > 0"
          class="mt-1 text-xs text-blue-600"
        >
          +{{ personajeSeleccionado.vidaTemporal }} vida temporal
        </div>
      </div>

      <!-- Información básica -->
      <div class="grid grid-cols-2 gap-2 mb-4">
        <div class="bg-blue-50 rounded p-2">
          <p class="text-xs text-blue-600 font-semibold">Oficio</p>
          <p class="text-sm text-gray-800 truncate">
            {{ personajeSeleccionado.oficio }}
          </p>
        </div>
        <div class="bg-purple-50 rounded p-2">
          <p class="text-xs text-purple-600 font-semibold">Estilo Marcial</p>
          <p class="text-sm text-gray-800 truncate">
            {{ personajeSeleccionado.estilo_marcial }}
          </p>
        </div>
        <div class="bg-green-50 rounded p-2">
          <p class="text-xs text-green-600 font-semibold">Trasfondo</p>
          <p class="text-sm text-gray-800 truncate">
            {{ personajeSeleccionado.trasfondo }}
          </p>
        </div>
        <div class="bg-orange-50 rounded p-2">
          <p class="text-xs text-orange-600 font-semibold">Raza</p>
          <p class="text-sm text-gray-800 truncate">
            {{ personajeSeleccionado.raza }}
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
              {{ personajeSeleccionado.atributos.cuerpo }}
            </p>
          </div>
          <div class="bg-green-50 rounded p-2 text-center">
            <p class="text-xs text-green-600 font-semibold">Agilidad</p>
            <p class="text-lg font-bold text-gray-800">
              {{ personajeSeleccionado.atributos.agilidad }}
            </p>
          </div>
          <div class="bg-blue-50 rounded p-2 text-center">
            <p class="text-xs text-blue-600 font-semibold">Mente</p>
            <p class="text-lg font-bold text-gray-800">
              {{ personajeSeleccionado.atributos.mente }}
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
              personajeSeleccionado.atributos.poderio
            }}</span>
          </div>
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">🎯 Puntería:</span>
            <span class="font-bold">{{
              personajeSeleccionado.atributos.punteria
            }}</span>
          </div>
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">🛡️ Evasión:</span>
            <span class="font-bold">{{
              personajeSeleccionado.atributos.evasion
            }}</span>
          </div>
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">🏃 Movimiento:</span>
            <span class="font-bold">{{
              personajeSeleccionado.atributos.movimiento
            }}</span>
          </div>
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">⚡ Iniciativa:</span>
            <span class="font-bold">{{
              personajeSeleccionado.atributos.iniciativa
            }}</span>
          </div>
          <div class="flex justify-between bg-gray-50 rounded p-2">
            <span class="text-gray-600">🔄 Acciones:</span>
            <span class="font-bold">{{
              personajeSeleccionado.atributos.acciones
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
              {{ calcularArmadura(personajeSeleccionado).penetrante }}
            </p>
          </div>
          <div class="bg-slate-100 rounded p-2 text-center">
            <p class="text-gray-600">Lacerante</p>
            <p class="font-bold text-gray-800">
              {{ calcularArmadura(personajeSeleccionado).lacerante }}
            </p>
          </div>
          <div class="bg-slate-100 rounded p-2 text-center">
            <p class="text-gray-600">Contundente</p>
            <p class="font-bold text-gray-800">
              {{ calcularArmadura(personajeSeleccionado).contundente }}
            </p>
          </div>
        </div>
      </div>

      <!-- Armas -->
      <div v-if="obtenerArmas(personajeSeleccionado).length > 0" class="mb-4">
        <h4 class="text-sm font-bold text-gray-700 mb-2">🗡️ Armas</h4>
        <div class="space-y-1">
          <div
            v-for="arma in obtenerArmas(personajeSeleccionado)"
            :key="arma.id"
            class="text-xs bg-amber-50 rounded p-2"
            :class="{
              'ring-2 ring-amber-500':
                arma.id === personajeSeleccionado.armaEquipada,
            }"
          >
            <p class="font-semibold text-gray-800">
              {{ arma.nombre }}
              <span
                v-if="arma.id === personajeSeleccionado.armaEquipada"
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

      <!-- Botones de Acción -->
      <div class="space-y-2">
        <div class="flex justify-between items-center mb-2">
          <h4 class="text-sm font-bold text-gray-700">⚡ Acciones</h4>
          <div class="flex gap-1">
            <div
              v-for="i in ACCIONES_POR_TURNO"
              :key="i"
              :class="[
                'w-3 h-3 rounded-full',
                i <= accionesRestantes ? 'bg-green-500' : 'bg-gray-300',
              ]"
            ></div>
          </div>
        </div>

        <!-- Atacar y Mover -->
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="activarModoAtaque"
            :class="[
              'px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200',
              modoAtaque
                ? 'bg-red-600 text-white hover:bg-red-700 ring-2 ring-red-300'
                : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg',
            ]"
          >
            {{ modoAtaque ? "✓ Atacando" : "⚔️ Atacar" }}
          </button>
          <button
            @click="activarModoMovimiento"
            :class="[
              'px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200',
              modoMovimiento
                ? 'bg-green-500 text-white hover:bg-green-600 ring-2 ring-green-300'
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg',
            ]"
          >
            {{ modoMovimiento ? "✓ Moviendo" : "🏃 Mover" }}
          </button>
        </div>

        <!-- Pasar Turno -->
        <button
          @click="pasarTurno"
          class="w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg"
        >
          ⏭️ Pasar Turno
        </button>

        <!-- Cambiar Arma -->
        <div class="bg-white rounded-lg p-2 border border-gray-300">
          <label class="text-xs font-semibold text-gray-600 block mb-1"
            >🗡️ Cambiar Arma</label
          >
          <select
            class="w-full px-2 py-1 text-sm rounded border border-blue-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Sin arma</option>
            <option
              v-for="arma in obtenerArmas(personajeSeleccionado)"
              :key="arma.id"
              :value="arma.id"
            >
              {{ arma.nombre }}
            </option>
          </select>
        </div>

        <!-- Usar Habilidad -->
        <div class="bg-white rounded-lg p-2 border border-gray-300">
          <label class="text-xs font-semibold text-gray-600 block mb-1"
            >📊 Usar Habilidad</label
          >
          <div class="flex gap-1">
            <select
              class="flex-1 px-2 py-1 text-sm rounded border border-blue-300 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Seleccionar...</option>
            </select>
            <button
              class="px-3 py-1 rounded-lg font-semibold text-sm transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600"
            >
              Tirar
            </button>
          </div>
        </div>

        <!-- Usar Activa -->
        <div class="bg-white rounded-lg p-2 border border-gray-300">
          <label class="text-xs font-semibold text-gray-600 block mb-1"
            >✨ Activas</label
          >

          <!-- Botón Carga -->
          <button
            @click="activarModoCarga"
            :class="[
              'w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 mb-1',
              modoCarga
                ? 'bg-orange-600 text-white hover:bg-orange-700 ring-2 ring-orange-300'
                : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg',
            ]"
          >
            {{ modoCarga ? "✓ Cargando" : "🏇 Carga" }}
          </button>

          <!-- Botón Empujar -->
          <button
            @click="activarModoEmpujar"
            :class="[
              'w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 mb-1',
              modoEmpujar
                ? 'bg-purple-600 text-white hover:bg-purple-700 ring-2 ring-purple-300'
                : 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg',
            ]"
          >
            {{ modoEmpujar ? "✓ Empujando" : "💥 Empujar" }}
          </button>

          <!-- Botón Curación -->
          <button
            @click="usarCuracion"
            :disabled="!procesarActivo && accionesRestantes < 1"
            :class="[
              'w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 mb-1',
              procesarActivo
                ? 'bg-green-600 text-white hover:bg-green-700 ring-2 ring-cyan-300'
                : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed',
            ]"
          >
            {{
              procesarActivo ? "💚 Curación (GRATIS)" : "💚 Curación (1 acción)"
            }}
          </button>

          <!-- Botón Adrenalina -->
          <button
            @click="usarAdrenalina"
            :disabled="
              adrenalinaActiva || (!procesarActivo && accionesRestantes < 1)
            "
            :class="[
              'w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 mb-1',
              adrenalinaActiva
                ? 'bg-yellow-600 text-white ring-2 ring-yellow-300'
                : procesarActivo
                ? 'bg-yellow-600 text-white hover:bg-yellow-700 ring-2 ring-cyan-300 disabled:bg-gray-400 disabled:cursor-not-allowed'
                : 'bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed',
            ]"
          >
            {{
              adrenalinaActiva
                ? "⚡ Adrenalina Activa"
                : procesarActivo
                ? "⚡ Adrenalina (GRATIS)"
                : "⚡ Adrenalina (1 acción)"
            }}
          </button>

          <!-- Botón Ataque Pesado -->
          <button
            @click="usarAtaquePesado"
            :disabled="accionesRestantes < 2"
            class="w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 mb-1 bg-red-700 text-white hover:bg-red-800 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            🔥 Ataque Pesado (2 acciones)
          </button>

          <!-- Botón Apuntar -->
          <button
            @click="usarApuntar"
            :disabled="accionesRestantes < 2 || apuntarActivo"
            :class="[
              'w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200',
              apuntarActivo
                ? 'bg-blue-700 text-white ring-2 ring-blue-300'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed',
            ]"
          >
            {{ apuntarActivo ? "🎯 Apuntando" : "🎯 Apuntar (2 acciones)" }}
          </button>

          <!-- Botón Procesar -->
          <button
            @click="usarProcesar"
            :disabled="procesarActivo"
            :class="[
              'w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200',
              procesarActivo
                ? 'bg-cyan-700 text-white ring-2 ring-cyan-300'
                : 'bg-cyan-600 text-white hover:bg-cyan-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed',
            ]"
          >
            {{
              procesarActivo ? "🧠 Procesar Activo" : "🧠 Procesar (0 acciones)"
            }}
          </button>

          <!-- Botón Instruir -->
          <button
            @click="activarModoInstruir"
            :class="[
              'w-full px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 mb-1',
              modoInstruir
                ? 'bg-orange-600 text-white hover:bg-orange-700 ring-2 ring-orange-300'
                : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg',
            ]"
          >
            {{ modoInstruir ? "✓ Instruyendo" : "🏇 Instruir" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Chat de Logs -->
    <div
      ref="logPanel"
      :style="{
        left: logPosition.x ? `${logPosition.x}px` : 'auto',
        top: logPosition.y ? `${logPosition.y}px` : 'auto',
        bottom: logPosition.x || logPosition.y ? 'auto' : '1rem',
        right: logPosition.x || logPosition.y ? 'auto' : '1rem',
      }"
      class="absolute bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl w-96 h-64 flex flex-col"
    >
      <!-- Header del chat (área para arrastrar) -->
      <div
        @mousedown="startDraggingLog"
        class="bg-gray-800 rounded-t-lg px-4 py-2 border-b border-gray-700 cursor-move select-none hover:bg-gray-700 transition-colors"
      >
        <h4 class="text-sm font-bold text-white flex items-center gap-2">
          <span class="text-gray-500">⋮⋮</span>
          📜 Logs de Combate
        </h4>
      </div>

      <!-- Área de mensajes -->
      <div
        ref="logContainer"
        class="flex-1 overflow-y-auto p-3 space-y-2 text-xs"
      >
        <div
          v-for="(log, index) in logs"
          :key="index"
          class="text-gray-300 leading-relaxed"
        >
          <span class="text-gray-500"
            >[{{ formatearHora(log.timestamp) }}]</span
          >
          <span
            :class="{
              'text-blue-400': log.tipo === 'sistema',
              'text-red-400': log.tipo === 'ataque',
              'text-green-400': log.tipo === 'movimiento',
              'text-yellow-400': log.tipo === 'habilidad',
              'text-purple-400': log.tipo === 'activa',
            }"
          >
            {{ log.mensaje }}
          </span>
        </div>
        <div v-if="logs.length === 0" class="text-gray-500 text-center py-8">
          No hay logs todavía...
        </div>
      </div>
    </div>

    <!-- Popup de Reacción -->
    <div
      v-if="mostrarPopupReaccion && defensorActual"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="seleccionarReaccion(TipoReaccion.NINGUNA)"
    >
      <div
        class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 border-2 border-yellow-500/50"
      >
        <!-- Header -->
        <div class="text-center mb-6">
          <h3 class="text-3xl font-bold text-yellow-400 mb-2">⚡ REACCIÓN</h3>
          <p class="text-gray-300 text-sm">
            <span class="text-red-400 font-semibold">{{
              atacanteActual?.nombre
            }}</span>
            está atacando a
            <span class="text-blue-400 font-semibold">{{
              defensorActual.nombre
            }}</span>
          </p>
          <p class="text-gray-400 text-xs mt-2">¿Qué quieres hacer?</p>
        </div>

        <!-- Opciones de Reacción -->
        <div class="space-y-3">
          <!-- Parry -->
          <button
            @click="seleccionarReaccion(TipoReaccion.PARRY)"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg border-2 border-blue-400/50"
          >
            <div class="flex items-center justify-between">
              <div class="text-left">
                <div class="text-xl">🛡️ Parry</div>
                <div class="text-xs text-blue-200 mt-1">
                  Aumenta tu evasión en +{{ defensorActual.nivel }} para este
                  ataque
                </div>
              </div>
              <div class="text-2xl">→</div>
            </div>
          </button>

          <!-- Contraataque -->
          <button
            @click="seleccionarReaccion(TipoReaccion.CONTRAATAQUE)"
            class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg border-2 border-red-400/50"
          >
            <div class="flex items-center justify-between">
              <div class="text-left">
                <div class="text-xl">⚔️ Contraataque</div>
                <div class="text-xs text-red-200 mt-1">
                  Ataca a {{ atacanteActual?.nombre }} antes de recibir su
                  ataque
                </div>
              </div>
              <div class="text-2xl">→</div>
            </div>
          </button>

          <!-- Tensión -->
          <button
            @click="seleccionarReaccion(TipoReaccion.TENSION)"
            class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg border-2 border-purple-400/50"
          >
            <div class="flex items-center justify-between">
              <div class="text-left">
                <div class="text-xl">💪 Tensión</div>
                <div class="text-xs text-purple-200 mt-1">
                  Aumenta tu resistencia en +3 (Armadura P/L/C +3) para este
                  ataque
                </div>
              </div>
              <div class="text-2xl">→</div>
            </div>
          </button>

          <!-- Interceptar (solo si hay aliados adyacentes) -->
          <button
            v-if="aliadosAdyacentes.length > 0"
            @click="seleccionarReaccion(TipoReaccion.INTERCEPTAR)"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg border-2 border-green-400/50"
          >
            <div class="flex items-center justify-between">
              <div class="text-left">
                <div class="text-xl">🛡️ Interceptar</div>
                <div class="text-xs text-green-200 mt-1">
                  Un aliado adyacente recibe el ataque en tu lugar
                </div>
                <div class="text-xs text-green-300 mt-1 font-semibold">
                  Aliados disponibles:
                  {{ aliadosAdyacentes.map((a) => a.nombre).join(", ") }}
                </div>
              </div>
              <div class="text-2xl">→</div>
            </div>
          </button>

          <!-- No Reaccionar -->
          <button
            @click="seleccionarReaccion(TipoReaccion.NINGUNA)"
            class="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border-2 border-gray-600/50"
          >
            <div class="flex items-center justify-center gap-2">
              <span>✋ No Reaccionar</span>
            </div>
          </button>
        </div>

        <!-- Timer visual (opcional) -->
        <div class="mt-6 text-center text-gray-500 text-xs">
          Selecciona una opción para continuar
        </div>
      </div>
    </div>

    <!-- Popup de Ataque de Oportunidad -->
    <div
      v-if="
        mostrarPopupOportunidad &&
        atacanteOportunidadActual &&
        enemigoMoviendose
      "
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        class="bg-gradient-to-br from-yellow-900 to-orange-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 border-2 border-yellow-400/70 animate-pulse-slow"
      >
        <!-- Header -->
        <div class="text-center mb-6">
          <h3 class="text-3xl font-bold text-yellow-300 mb-2">
            ⚡ ATAQUE DE OPORTUNIDAD
          </h3>
          <p class="text-gray-200 text-sm">
            <span class="text-blue-400 font-semibold">{{
              enemigoMoviendose.nombre
            }}</span>
            <span v-if="tipoOportunidadActual === 'salida'"
              >está saliendo de</span
            >
            <span v-else>está entrando a</span>
            tu rango de ataque,
            <span class="text-red-400 font-semibold">{{
              atacanteOportunidadActual.nombre
            }}</span
            >!
          </p>
          <p class="text-yellow-300 text-xs mt-2 font-semibold">
            ¿Aprovechar esta oportunidad?
          </p>
        </div>

        <!-- Opciones -->
        <div class="space-y-3">
          <!-- Atacar -->
          <button
            @click="seleccionarDecisionOportunidad('atacar')"
            class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg border-2 border-red-400/50"
          >
            <div class="flex items-center justify-between">
              <div class="text-left">
                <div class="text-2xl">⚔️ ¡Atacar!</div>
                <div class="text-xs text-red-200 mt-1">
                  Realizar un ataque gratuito contra
                  {{ enemigoMoviendose.nombre }}
                </div>
                <div class="text-xs text-red-300 mt-1 font-semibold">
                  (No consume acción)
                </div>
              </div>
              <div class="text-3xl">→</div>
            </div>
          </button>

          <!-- Dejar Pasar -->
          <button
            @click="seleccionarDecisionOportunidad('pasar')"
            class="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border-2 border-gray-600/50"
          >
            <div class="flex items-center justify-center gap-2">
              <span>✋ Dejar Pasar</span>
            </div>
          </button>
        </div>

        <!-- Info adicional -->
        <div class="mt-6 text-center text-yellow-200 text-xs">
          Los ataques de oportunidad son gratuitos y no gastan reacciones
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";
import type { PersonajeInstancia, PartidaData } from "../../domain/Partida";

// --- ADVANTAGE/DISADVANTAGE STATE HELPERS ---

// --- INICIO: Lógica de instruir aliado ---

const ventajaInstruir = new Map<string, boolean>();

function aplicarVentajaInstruir(aliadoId: string) {
  ventajaInstruir.set(aliadoId, true);
  // Buscar el personaje y aplicar ventaja
  const aliado = buscarPersonajePorId(aliadoId);
  if (aliado) {
    setVentaja(aliado, 1, "Instruir");
    console.log(
      `📢 ${aliado.nombre} ha sido instruido y tendrá ventaja en su próxima tirada.`
    );
    agregarLog(
      "sistema",
      `📢 ${aliado.nombre} ha sido instruido y tendrá ventaja en su próxima tirada.`
    );
  }
}

function buscarPersonajePorId(id: string) {
  if (!partidaActual.value) return null;
  for (const eq of partidaActual.value.equipos) {
    for (const pj of eq.personajes) {
      if (pj.instanciaId === id) return pj;
    }
  }
  return null;
}

function consumirVentajaSiCorresponde(personaje: any) {
  if (ventajaInstruir.has(personaje.instanciaId)) {
    clearVentaja(personaje);
    ventajaInstruir.delete(personaje.instanciaId);
    agregarLog(
      "sistema",
      `🎲 ${personaje.nombre} ha usado la ventaja de Instruir.`
    );
  }
}

function instruirAliadoListener(e: Event) {
  const custom = e as CustomEvent;
  if (custom.detail && custom.detail.aliadoId) {
    aplicarVentajaInstruir(custom.detail.aliadoId);
  }
}

onMounted(() => {
  window.addEventListener(
    "instruir-aliado",
    instruirAliadoListener as EventListener
  );
});
onBeforeUnmount(() => {
  window.removeEventListener(
    "instruir-aliado",
    instruirAliadoListener as EventListener
  );
});
// --- FIN: Lógica de instruir aliado ---
// We extend PersonajeInstancia at runtime with:
//   ventajaPendiente?: 0 | 1 | -1; // 1=adv, -1=dis, 0|undefined=none
//   ventajaFuente?: string; // e.g. 'Instruir', 'Condición', etc.

function setVentaja(personaje: any, tipo: 0 | 1 | -1, fuente = "") {
  personaje.ventajaPendiente = tipo;
  personaje.ventajaFuente = fuente;
}

function clearVentaja(personaje: any) {
  personaje.ventajaPendiente = 0;
  personaje.ventajaFuente = "";
}

function getVentaja(personaje: any): 0 | 1 | -1 {
  return personaje.ventajaPendiente || 0;
}

function tieneVentaja(personaje: any) {
  return personaje.ventajaPendiente === 1;
}

function tieneDesventaja(personaje: any) {
  return personaje.ventajaPendiente === -1;
}
import {
  realizarEmpujar,
  calcularIniciativas,
  realizarParry,
  realizarContraataque,
  realizarTension,
  realizarInterceptar,
  realizarAtaqueOportunidad,
  TipoReaccion,
  type ResultadoIniciativa,
  type ResultadoReaccion,
} from "../../domain/Activas";
import armasData from "../../assets/armas.json";
import armadurasData from "../../assets/armaduras.json";

interface Props {
  partidaId: string;
}

const props = defineProps<Props>();

// Referencias
const canvasContainer = ref<HTMLDivElement | null>(null);

// Variables de Three.js
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: MapControls;
let rafId = 0;

// Hexágonos
const hexagons: THREE.Mesh[] = [];
const hexMap = new Map<string, THREE.Mesh>();

// Personajes
const personajesMeshes = new Map<string, THREE.Mesh>();
const hexagonosOcupados = new Set<string>();

// Datos de la partida
const partidaActual = ref<PartidaData | null>(null);
const personajeSeleccionado = ref<PersonajeInstancia | null>(null);

// Modo de movimiento
const modoMovimiento = ref(false);
const hexagonosMovimiento = ref<THREE.Mesh[]>([]);

// Modo de ataque
const modoAtaque = ref(false);
const hexagonosAtaque = ref<THREE.Mesh[]>([]);
const objetivosAtaque = ref<THREE.Mesh[]>([]);

// Modo de carga
const modoCarga = ref(false);
const hexagonosCarga = ref<THREE.Mesh[]>([]);
const objetivosCarga = ref<THREE.Mesh[]>([]);

// Modo de empujar
const modoEmpujar = ref(false);
const objetivosEmpujar = ref<THREE.Mesh[]>([]);

// Modo instruir
const modoInstruir = ref(false);
const objetivosInstruir = ref<THREE.Mesh[]>([]);

// Activas normales
const apuntarActivo = ref(false); // Si el personaje está apuntando y listo para el próximo ataque
const adrenalinaActiva = ref(false); // Si el buff de Adrenalina está activo
const ataquePesadoActivo = ref(false); // Si el próximo ataque será pesado (x2 daño)
const procesarActivo = ref(false); // Si Procesar está activo (próxima acción mental de 1 acción es gratis)

// Sistema de turnos
const ordenTurnos = ref<ResultadoIniciativa[]>([]);
const turnoActual = ref(0);
const accionesRestantes = ref(2); // Cada personaje tiene 2 acciones por turno
const ACCIONES_POR_TURNO = 2;

// Sistema de reacciones
const mostrarPopupReaccion = ref(false);
const atacanteActual = ref<PersonajeInstancia | null>(null);
const defensorActual = ref<PersonajeInstancia | null>(null);
const meshAtacanteActual = ref<THREE.Mesh | null>(null);
const meshDefensorActual = ref<THREE.Mesh | null>(null);
const reaccionSeleccionada = ref<string | null>(null);
const aliadosAdyacentes = ref<PersonajeInstancia[]>([]); // Para Interceptar

// Sistema de ataques de oportunidad
const mostrarPopupOportunidad = ref(false);
const atacanteOportunidadActual = ref<PersonajeInstancia | null>(null);
const tipoOportunidadActual = ref<"salida" | "entrada">("salida");
const enemigoMoviendose = ref<PersonajeInstancia | null>(null);
const destinoMovimiento = ref<THREE.Mesh | null>(null);
const personajesConOportunidad = ref<
  Array<{ personaje: PersonajeInstancia; tipo: "salida" | "entrada" }>
>([]);
const oportunidadActualIndex = ref(0);
const decisionOportunidad = ref<"atacar" | "pasar" | null>(null);

// Logs
interface LogEntry {
  timestamp: Date;
  tipo: "sistema" | "ataque" | "movimiento" | "habilidad" | "activa";
  mensaje: string;
}

const logs = ref<LogEntry[]>([]);
const logContainer = ref<HTMLDivElement | null>(null);
const logPanel = ref<HTMLDivElement | null>(null);

// Variables para hacer el chat movible
const isDraggingLog = ref(false);
const logPosition = ref({ x: 0, y: 0 });
const dragOffset = ref({ x: 0, y: 0 });

// Raycasting
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickables: THREE.Object3D[] = [];
let hoveredHex: THREE.Mesh | null = null;

// Configuración de la cuadrícula
const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const HEX_SIZE = 2;

// Colores para los personajes
const COLORES_PERSONAJES = [
  0xff0000, // Rojo
  0x0000ff, // Azul
  0x00ff00, // Verde
  0xffff00, // Amarillo
  0xff00ff, // Magenta
  0x00ffff, // Cyan
  0xff8800, // Naranja
  0x8800ff, // Púrpura
  0x00ff88, // Verde agua
  0xff0088, // Rosa
  0x88ff00, // Lima
  0x0088ff, // Azul cielo
];

function init() {
  if (!canvasContainer.value) return;

  const el = canvasContainer.value;
  const width = el.clientWidth;
  const height = el.clientHeight;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x1a1a2e); // Fondo oscuro
  el.appendChild(renderer.domElement);

  // Escena
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x1a1a2e, 50, 200);

  // Cámara
  const aspect = width / height;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000);
  const cameraDistance = 50;
  camera.position.set(cameraDistance, cameraDistance, cameraDistance);
  camera.lookAt(0, 0, 0);

  // Controles tipo Diablo/LoL
  controls = new MapControls(camera, renderer.domElement);
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE,
  };
  controls.touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_PAN,
  };
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2.5;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Iluminación
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(20, 40, 30);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0x4a90e2, 0.3);
  dirLight2.position.set(-20, 20, -30);
  scene.add(dirLight2);

  // Crear cuadrícula de hexágonos
  createHexGrid();

  // Cargar partida y crear personajes
  cargarPartida();
  crearPersonajes();

  // Centrar cámara en la cuadrícula
  centerCamera();

  // Event listeners
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);

  // Iniciar loop de render
  animate();
}

function createHexGrid() {
  const size = HEX_SIZE;
  const hexWidth = Math.sqrt(3) * size;
  const hexHeight = 2 * size;
  const rowStep = (3 / 4) * hexHeight;

  // Geometría y material compartidos
  const hexGeo = new THREE.CylinderGeometry(size, size, 0.3, 6);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x2d4059,
    flatShading: true,
    metalness: 0.1,
    roughness: 0.8,
  });

  // Crear borde para cada hexágono
  const edgeGeo = new THREE.CylinderGeometry(size * 0.95, size * 0.95, 0.35, 6);
  const edgeMat = new THREE.MeshBasicMaterial({
    color: 0x4a90e2,
    transparent: true,
    opacity: 0.5, // Aumentado de 0.3 a 0.5 para más visibilidad
  });

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      // Crear hexágono - IMPORTANTE: empezar con material compartido
      const hex = new THREE.Mesh(hexGeo, baseMat);

      // Calcular posición
      const offset = (row % 2) * (hexWidth / 2);
      hex.position.x = col * hexWidth + offset;
      hex.position.z = row * rowStep;
      hex.position.y = 0;

      // Nombre y datos
      hex.name = `hex_${col}_${row}`;
      (hex as any).gridX = col;
      (hex as any).gridY = row;
      (hex as any).mat = baseMat; // Guardar referencia al material compartido
      (hex as any).isHighlighted = false;

      // Guardar en estructuras
      hexagons.push(hex);
      hexMap.set(`${col},${row}`, hex);
      clickables.push(hex);

      // Crear borde
      const edge = new THREE.Mesh(edgeGeo, edgeMat);
      edge.position.copy(hex.position);
      edge.position.y = 0.05;

      scene.add(hex);
      scene.add(edge);
    }
  }

  console.log(
    `✅ Cuadrícula creada: ${hexagons.length} hexágonos (${GRID_WIDTH}x${GRID_HEIGHT})`
  );
}

function centerCamera() {
  const hexWidth = Math.sqrt(3) * HEX_SIZE;
  const hexHeight = 2 * HEX_SIZE;
  const rowStep = (3 / 4) * hexHeight;

  const totalGridWidth = (GRID_WIDTH - 1) * hexWidth + hexWidth / 2;
  const totalGridHeight = (GRID_HEIGHT - 1) * rowStep;

  const gridCenter = new THREE.Vector3(
    totalGridWidth / 2,
    0,
    totalGridHeight / 2
  );

  controls.target.copy(gridCenter);
  const cameraDistance = 50;
  camera.position
    .copy(gridCenter)
    .add(new THREE.Vector3(cameraDistance, cameraDistance, cameraDistance));
  controls.update();
}

function cargarPartida() {
  try {
    const partidaString = localStorage.getItem(props.partidaId);
    if (!partidaString) {
      console.error("❌ No se encontró la partida");
      agregarLog("sistema", "❌ Error: No se encontró la partida");
      return;
    }

    partidaActual.value = JSON.parse(partidaString);
    console.log("✅ Partida cargada:", partidaActual.value?.nombre);
    console.log("📊 Total personajes:", contarTotalPersonajes());

    agregarLog(
      "sistema",
      `✅ Partida "${partidaActual.value?.nombre}" cargada`
    );
    agregarLog(
      "sistema",
      `📊 ${contarTotalPersonajes()} personajes en combate`
    );
  } catch (error) {
    console.error("❌ Error al cargar la partida:", error);
    agregarLog("sistema", "❌ Error al cargar la partida");
  }
}

function contarTotalPersonajes(): number {
  if (!partidaActual.value) return 0;
  return partidaActual.value.equipos.reduce(
    (total, equipo) => total + equipo.personajes.length,
    0
  );
}

function obtenerHexagonoAleatorioLibre(): { col: number; row: number } | null {
  const maxIntentos = 100;
  for (let i = 0; i < maxIntentos; i++) {
    const col = Math.floor(Math.random() * GRID_WIDTH);
    const row = Math.floor(Math.random() * GRID_HEIGHT);
    const key = `${col},${row}`;

    if (!hexagonosOcupados.has(key)) {
      return { col, row };
    }
  }
  console.error("❌ No se pudo encontrar un hexágono libre");
  return null;
}

function crearPersonajes() {
  if (!partidaActual.value) return;

  let colorIndex = 0;

  partidaActual.value.equipos.forEach((equipo) => {
    equipo.personajes.forEach((personaje) => {
      const posicion = obtenerHexagonoAleatorioLibre();
      if (!posicion) return;

      const hexagono = getMeshAt(posicion.col, posicion.row);
      if (!hexagono) return;

      // Marcar hexágono como ocupado
      hexagonosOcupados.add(`${posicion.col},${posicion.row}`);

      // Crear cilindro para el personaje
      const color = COLORES_PERSONAJES[colorIndex % COLORES_PERSONAJES.length];
      const geometry = new THREE.CylinderGeometry(1, 1, 3, 20);
      const material = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.3,
        roughness: 0.7,
      });
      const cilindro = new THREE.Mesh(geometry, material);

      // Posicionar sobre el hexágono
      cilindro.position.set(
        hexagono.position.x,
        hexagono.position.y + 1.5, // Altura del cilindro
        hexagono.position.z
      );

      // Guardar datos del personaje en el mesh
      cilindro.name = `personaje_${personaje.instanciaId}`;
      (cilindro as any).personajeData = personaje;
      (cilindro as any).hexCol = posicion.col;
      (cilindro as any).hexRow = posicion.row;

      scene.add(cilindro);
      personajesMeshes.set(personaje.instanciaId, cilindro);
      clickables.push(cilindro);

      const colorHex = (color || 0xffffff).toString(16).padStart(6, "0");
      console.log(
        `👤 ${personaje.nombre} creado en (${posicion.col}, ${posicion.row}) - Color: #${colorHex}`
      );

      colorIndex++;
    });
  });

  console.log(`✅ ${personajesMeshes.size} personajes creados en el mapa`);
  agregarLog(
    "sistema",
    `⚔️ ${personajesMeshes.size} combatientes preparados para la batalla`
  );

  // Tirar iniciativas después de crear personajes
  inicializarTurnos();
}

function inicializarTurnos() {
  if (!partidaActual.value) return;

  // Recopilar todos los personajes de todos los equipos
  const todosPersonajes: PersonajeInstancia[] = [];
  partidaActual.value.equipos.forEach((equipo) => {
    todosPersonajes.push(...equipo.personajes);
  });

  // Calcular iniciativas
  const resultadosIniciativa = calcularIniciativas(todosPersonajes);
  ordenTurnos.value = resultadosIniciativa;
  turnoActual.value = 0;
  accionesRestantes.value = ACCIONES_POR_TURNO;

  // Seleccionar automáticamente el primer personaje
  if (ordenTurnos.value.length > 0 && ordenTurnos.value[0]) {
    personajeSeleccionado.value = ordenTurnos.value[0].personaje;
  }

  // Log de iniciativas
  agregarLog("sistema", "🎲 ═══ INICIATIVAS ═══");
  resultadosIniciativa.forEach((resultado, index) => {
    const { personaje, tirada, dado1, dado2 } = resultado;
    agregarLog(
      "sistema",
      `${index + 1}. ${personaje.nombre}: ${dado1} + ${dado2} + ${
        personaje.nivel
      } = ${tirada}`
    );
  });
  agregarLog("sistema", "═══════════════════");
  if (ordenTurnos.value[0]) {
    agregarLog(
      "sistema",
      `🎯 Turno de ${ordenTurnos.value[0].personaje.nombre}`
    );
  }
}

function getMeshAt(col: number, row: number): THREE.Mesh | undefined {
  return hexMap.get(`${col},${row}`);
}

function getHexCoordinates(mesh: THREE.Mesh): { x: number; y: number } | null {
  const x = (mesh as any).gridX;
  const y = (mesh as any).gridY;
  if (x !== undefined && y !== undefined) {
    return { x, y };
  }
  return null;
}

function getNeighbors(col: number, row: number, range: number): THREE.Mesh[] {
  const neighbors: THREE.Mesh[] = [];
  const visited = new Set<string>();
  const queue: Array<{ x: number; y: number; distance: number }> = [
    { x: col, y: row, distance: 0 },
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const { x: currentX, y: currentY, distance } = current;
    const key = `${currentX},${currentY}`;

    if (visited.has(key)) continue;
    visited.add(key);

    // Don't include the starting position, only neighbors
    if (distance > 0) {
      const mesh = getMeshAt(currentX, currentY);
      if (mesh) neighbors.push(mesh);
    }

    // If we haven't reached the maximum range, add neighbors to queue
    if (distance < range) {
      const isEven = currentY % 2 === 0;
      const offsets: [number, number][] = isEven
        ? [
            [-1, -1],
            [0, -1],
            [1, 0],
            [0, 1],
            [-1, 1],
            [-1, 0],
          ] // Even row offsets
        : [
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 0],
          ]; // Odd row offsets

      for (const [dx, dy] of offsets) {
        const nextX = currentX + dx;
        const nextY = currentY + dy;
        const nextKey = `${nextX},${nextY}`;

        if (!visited.has(nextKey)) {
          queue.push({ x: nextX, y: nextY, distance: distance + 1 });
        }
      }
    }
  }

  return neighbors;
}

function highlightHexagons(hexagons: THREE.Mesh[], color: number) {
  hexagons.forEach((hex) => {
    const baseMat = (hex as any).mat as THREE.MeshStandardMaterial;
    if (!baseMat) {
      console.error("Base material not found for hex:", hex.name);
      return;
    }

    // Clonar el material base
    const clone = baseMat.clone();
    const baseColor = baseMat.color.clone();
    const highlightColor = new THREE.Color(color);
    // Mezcla 70% base + 30% highlight para un efecto más sutil
    clone.color.lerpColors(baseColor, highlightColor, 0.3);
    hex.material = clone;
    (hex as any).isHighlighted = true;
  });
}

function resetHexagonsColor(hexagons: THREE.Mesh[]) {
  hexagons.forEach((hex) => {
    const baseMat = (hex as any).mat as THREE.MeshStandardMaterial;
    if (baseMat) {
      // Disponer del material clonado si existe
      const currentMat = hex.material as THREE.MeshStandardMaterial;
      if (currentMat !== baseMat) {
        currentMat.dispose();
      }
      // Restaurar material original
      hex.material = baseMat;
      (hex as any).isHighlighted = false;
    }
  });
}

// Raycasting
function setPointerFromEvent(event: PointerEvent) {
  if (!renderer) return;
  const rect = renderer.domElement.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  pointer.set(x * 2 - 1, -(y * 2 - 1));
}

function pick(event: PointerEvent): THREE.Mesh | null {
  setPointerFromEvent(event);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickables, false);
  return hits.length ? (hits[0].object as THREE.Mesh) : null;
}

function onPointerMove(event: PointerEvent) {
  const mesh = pick(event);

  // Si estamos en modo empujar
  if (modoEmpujar.value) {
    if (mesh && mesh.name.startsWith("personaje_")) {
      const esObjetivoValido = objetivosEmpujar.value.includes(mesh);
      if (renderer) {
        renderer.domElement.style.cursor = esObjetivoValido
          ? "pointer"
          : "not-allowed";
      }
    } else {
      if (renderer) {
        renderer.domElement.style.cursor = "default";
      }
    }
    return;
  }

  // Si estamos en modo ataque
  if (modoAtaque.value) {
    if (mesh && mesh.name.startsWith("personaje_")) {
      const esObjetivoValido = objetivosAtaque.value.includes(mesh);
      if (renderer) {
        renderer.domElement.style.cursor = esObjetivoValido
          ? "crosshair"
          : "not-allowed";
      }
    } else {
      if (renderer) {
        renderer.domElement.style.cursor = "default";
      }
    }
    return;
  }

  // Si estamos en modo carga
  if (modoCarga.value) {
    if (mesh && mesh.name.startsWith("personaje_")) {
      const esObjetivoValido = objetivosCarga.value.includes(mesh);
      if (renderer) {
        renderer.domElement.style.cursor = esObjetivoValido
          ? "pointer"
          : "not-allowed";
      }
    } else {
      if (renderer) {
        renderer.domElement.style.cursor = "default";
      }
    }
    return;
  }

  // Si estamos en modo movimiento
  if (modoMovimiento.value) {
    if (mesh && mesh.name.startsWith("hex_")) {
      const esHexValido = hexagonosMovimiento.value.includes(mesh);
      if (renderer) {
        renderer.domElement.style.cursor = esHexValido
          ? "pointer"
          : "not-allowed";
      }
    } else {
      if (renderer) {
        renderer.domElement.style.cursor = "default";
      }
    }
    return;
  }

  // Cambiar cursor cuando se pase sobre un personaje
  if (mesh && mesh.name.startsWith("personaje_")) {
    if (renderer) {
      renderer.domElement.style.cursor = "pointer";
    }
  } else {
    if (renderer) {
      renderer.domElement.style.cursor = "default";
    }
  }
}

function onPointerDown(event: PointerEvent) {
  const mesh = pick(event);


  // Si estamos en modo instruir
  if (modoInstruir.value) {
    if (mesh && mesh.name.startsWith("personaje_")) {
      // Obtener el id del personaje
      const aliadoId = mesh.name.replace("personaje_", "");
      aplicarVentajaInstruir(aliadoId);
      desactivarModoInstruir();
      return;
    }
    // Si se hace clic en cualquier otro sitio, desactivar modo instruir
    desactivarModoInstruir();
    return;
  }

  // Si estamos en modo empujar
  if (modoEmpujar.value) {
    if (mesh && mesh.name.startsWith("personaje_")) {
      const esObjetivoValido = objetivosEmpujar.value.includes(mesh);
      if (esObjetivoValido) {
        realizarEmpujarHacia(mesh);
        return;
      }
    }
    desactivarModoEmpujar();
    return;
  }

  // Si estamos en modo ataque
  if (modoAtaque.value) {
    if (mesh && mesh.name.startsWith("personaje_")) {
      const esObjetivoValido = objetivosAtaque.value.includes(mesh);
      if (esObjetivoValido) {
        realizarAtaque(mesh);
        return;
      }
    }
    desactivarModoAtaque();
    return;
  }

  // Si estamos en modo carga
  if (modoCarga.value) {
    if (mesh && mesh.name.startsWith("personaje_")) {
      const esObjetivoValido = objetivosCarga.value.includes(mesh);
      if (esObjetivoValido) {
        realizarCargaHacia(mesh);
        return;
      }
    }
    desactivarModoCarga();
    return;
  }

  // Si estamos en modo movimiento y se hace clic en un hexágono válido
  if (modoMovimiento.value && mesh && mesh.name.startsWith("hex_")) {
    const esHexValido = hexagonosMovimiento.value.includes(mesh);
    if (esHexValido) {
      moverPersonaje(mesh);
    } else {
      agregarLog("sistema", "⚠️ No puedes moverte a esa casilla");
    }
    return;
  }

  // Deshabilitar selección manual - solo se puede ver el personaje del turno actual
  // Si se hace clic en un personaje, no hacer nada
  if (mesh && mesh.name.startsWith("personaje_")) {
    return;
  }

  // Si se hace clic en un hexágono (fuera del modo movimiento)
  if (mesh && mesh.name.startsWith("hex_")) {
    const coords = getHexCoordinates(mesh);
    if (coords) {
      console.log(`🎯 Hexágono seleccionado: (${coords.x}, ${coords.y})`);
    }
  }

  if (modoInstruir.value) {
    console.log("Instruyendo a aliado:", mesh);
    // Si se hace clic en un personaje objetivo válido
    if (mesh && mesh.name.startsWith("personaje_")) {
      const esObjetivoValido = objetivosInstruir.value.includes(mesh);
      if (esObjetivoValido) {
        //setVentaja(mesh);
        return;
      }
    }
    // Si se hace clic en cualquier otro sitio, desactivar modo instruir
    desactivarModoInstruir();
    return;
  }
}

async function moverPersonaje(hexDestino: THREE.Mesh) {
  if (!personajeSeleccionado.value) return;
  // Verificar que hay acciones disponibles
  if (accionesRestantes.value <= 0) {
    agregarLog("sistema", "⚠️ No te quedan acciones disponibles");
    return;
  }

  const meshPersonaje = personajesMeshes.get(
    personajeSeleccionado.value.instanciaId
  );
  if (!meshPersonaje) return;

  const coordsOrigen = {
    col: (meshPersonaje as any).hexCol,
    row: (meshPersonaje as any).hexRow,
  };

  const coordsDestino = getHexCoordinates(hexDestino);
  if (!coordsDestino) return;

  // 🔍 DETECTAR ATAQUES DE OPORTUNIDAD
  // Buscar todos los enemigos (personajes de otros equipos)
  personajesConOportunidad.value = [];
  console.log("coordsDestino, coordsOrigen", coordsDestino, coordsOrigen);
  if (partidaActual.value) {
    // Encontrar el equipo del personaje que se mueve
    const equipoActual = partidaActual.value.equipos.find((equipo) =>
      equipo.personajes.some(
        (p) => p.instanciaId === personajeSeleccionado.value!.instanciaId
      )
    );

    if (equipoActual) {
      // Iterar sobre todos los equipos enemigos
      partidaActual.value.equipos.forEach((equipo) => {
        if (equipo.id === equipoActual.id) return; // Saltar equipo aliado

        // Revisar cada personaje enemigo
        equipo.personajes.forEach((personaje) => {
          const meshEnemigo = personajesMeshes.get(personaje.instanciaId);
          if (!meshEnemigo) return;

          const coordsEnemigo = {
            col: (meshEnemigo as any).hexCol,
            row: (meshEnemigo as any).hexRow,
          };

          // Calcular rango de ataque del enemigo
          const armaId = personaje.armaEquipada;
          let rangoAtaque = 1; // Default cuerpo a cuerpo

          if (armaId) {
            const arma = armasData.armas.find((a: any) => a.id === armaId);
            if (arma && arma.distancia_max) {
              rangoAtaque = arma.distancia_max;
            }
          }

          // MÉTODO SIMPLE: Obtener todas las casillas en rango de ataque del enemigo
          const casillasEnRango = getNeighbors(
            coordsEnemigo.col,
            coordsEnemigo.row,
            rangoAtaque
          );
          console.log("adfdfadf");
          // Verificar si la casilla de ORIGEN está en rango
          const origenEnRango = casillasEnRango.some((hex) => {
            const coords = getHexCoordinates(hex);
            return (
              coords &&
              coords.x === coordsOrigen.col &&
              coords.y === coordsOrigen.row
            );
          });
          console.log("origenEnRango:", origenEnRango);
          // Verificar si la casilla de DESTINO está en rango
          const destinoEnRango = casillasEnRango.some((hex) => {
            const coords = getHexCoordinates(hex);
            return (
              coords &&
              coords.x === coordsDestino.x &&
              coords.y === coordsDestino.y
            );
          });

          // LÓGICA SIMPLE:
          // - Origen NO en rango + Destino SÍ en rango = ENTRADA
          // - Origen SÍ en rango + Destino NO en rango = SALIDA
          // - Ambos en rango o ambos fuera = NO HAY OPORTUNIDAD

          if (!origenEnRango && destinoEnRango) {
            // ENTRANDO al rango
            console.log(
              `� ${personaje.nombre} detecta ENTRADA: ${
                personajeSeleccionado.value!.nombre
              } entra a rango ${rangoAtaque}`
            );
            personajesConOportunidad.value.push({ personaje, tipo: "entrada" });
          } else if (origenEnRango && !destinoEnRango) {
            // SALIENDO del rango
            console.log(
              `� ${personaje.nombre} detecta SALIDA: ${
                personajeSeleccionado.value!.nombre
              } sale de rango ${rangoAtaque}`
            );
            personajesConOportunidad.value.push({ personaje, tipo: "salida" });
          } else if (origenEnRango && destinoEnRango) {
            // Movimiento DENTRO del rango - NO HAY OPORTUNIDAD
            console.log(
              `⚪ ${personaje.nombre}: ${
                personajeSeleccionado.value!.nombre
              } se mueve DENTRO del rango ${rangoAtaque} - sin oportunidad`
            );
          }
        });
      });
    }
  }

  // Si hay ataques de oportunidad, procesarlos secuencialmente
  if (personajesConOportunidad.value.length > 0) {
    enemigoMoviendose.value = personajeSeleccionado.value;
    destinoMovimiento.value = hexDestino;
    oportunidadActualIndex.value = 0;

    // Log detallado de cada oportunidad
    personajesConOportunidad.value.forEach((opp, index) => {
      const tipoTexto = opp.tipo === "entrada" ? "entra a" : "sale de";
      agregarLog(
        "sistema",
        `⚡ ${index + 1}. ${opp.personaje.nombre} puede atacar (${
          personajeSeleccionado.value?.nombre
        } ${tipoTexto} su rango)`
      );
    });

    // Procesar todas las oportunidades
    await procesarAtaquesDeOportunidad();

    // Si el personaje murió durante las oportunidades, cancelar movimiento
    if (enemigoMoviendose.value.vidaActual <= 0) {
      agregarLog(
        "activa",
        `💀 ${enemigoMoviendose.value.nombre} murió antes de completar el movimiento`
      );
      desactivarModoMovimiento();

      // Resetear variables de oportunidad
      enemigoMoviendose.value = null;
      destinoMovimiento.value = null;
      personajesConOportunidad.value = [];
      return;
    }
  }

  // EJECUTAR MOVIMIENTO (si sobrevivió a las oportunidades)
  // Liberar hexágono anterior
  hexagonosOcupados.delete(`${coordsOrigen.col},${coordsOrigen.row}`);

  // Ocupar nuevo hexágono
  hexagonosOcupados.add(`${coordsDestino.x},${coordsDestino.y}`);

  // Mover el mesh del personaje
  meshPersonaje.position.set(
    hexDestino.position.x,
    hexDestino.position.y + 1.5,
    hexDestino.position.z
  );

  // Actualizar coordenadas guardadas
  (meshPersonaje as any).hexCol = coordsDestino.x;
  (meshPersonaje as any).hexRow = coordsDestino.y;

  // Cancelar Apuntar si estaba activo (se movió)
  if (apuntarActivo.value) {
    apuntarActivo.value = false;
    agregarLog("sistema", "🎯 Apuntar cancelado (el personaje se movió)");
  }

  // Consumir acción
  accionesRestantes.value--;

  agregarLog(
    "movimiento",
    `🏃 ${personajeSeleccionado.value.nombre} se movió a (${coordsOrigen.col}, ${coordsOrigen.row}) → (${coordsDestino.x}, ${coordsDestino.y}) [${accionesRestantes.value} acciones restantes]`
  );

  // Resetear variables de oportunidad
  enemigoMoviendose.value = null;
  destinoMovimiento.value = null;
  personajesConOportunidad.value = [];

  // Desactivar modo movimiento (esto resetea los colores)
  desactivarModoMovimiento();

  // Si no quedan acciones, pasar turno automáticamente
  if (accionesRestantes.value <= 0) {
    setTimeout(() => pasarTurno(), 500);
  }
}

function desactivarModoInstruir() {
  // Resetear resaltado de aliados
  if (personajeSeleccionado.value && partidaActual.value) {
    let aliados: PersonajeInstancia[] = [];
    partidaActual.value.equipos.forEach((eq) => {
      if (
        eq.personajes.some(
          (p) => p.instanciaId === personajeSeleccionado.value!.instanciaId
        )
      ) {
        aliados = eq.personajes.filter(
          (p) => p.instanciaId !== personajeSeleccionado.value!.instanciaId
        );
      }
    });
    aliados.forEach((a) => {
      const mesh = personajesMeshes.get(a.instanciaId);
      if (mesh) {
        mesh.material.emissive?.setHex(0x000000);
      }
    });
  }
  modoInstruir.value = false;
  agregarLog("sistema", "📢 Modo instruir desactivado");
}

function pasarTurno() {
  // Desactivar todos los modos
  if (modoMovimiento.value) desactivarModoMovimiento();
  if (modoAtaque.value) desactivarModoAtaque();
  if (modoCarga.value) desactivarModoCarga();
  if (modoEmpujar.value) desactivarModoEmpujar();
  if (modoInstruir.value) desactivarModoInstruir();
  // Remover buff de Adrenalina del personaje actual (si lo tenía)
  if (adrenalinaActiva.value && personajeSeleccionado.value) {
    personajeSeleccionado.value.atributos.cuerpo -= 1;
    agregarLog(
      "sistema",
      `⚡ Adrenalina de ${personajeSeleccionado.value.nombre} se desvanece (-1 Cuerpo)`
    );
    adrenalinaActiva.value = false;
  }

  // Avanzar al siguiente turno
  turnoActual.value = (turnoActual.value + 1) % ordenTurnos.value.length;

  // Resetear acciones
  accionesRestantes.value = ACCIONES_POR_TURNO;

  // Seleccionar el personaje del nuevo turno
  const siguienteTurno = ordenTurnos.value[turnoActual.value];
  if (siguienteTurno) {
    personajeSeleccionado.value = siguienteTurno.personaje;
    agregarLog("sistema", `═══════════════════`);
    agregarLog("sistema", `🎯 Turno de ${siguienteTurno.personaje.nombre}`);
  }
}

function activarModoMovimiento() {
  if (!personajeSeleccionado.value) {
    agregarLog("sistema", "⚠️ Debes seleccionar un personaje primero");
    return;
  }

  // Si ya está en modo movimiento, desactivar
  if (modoMovimiento.value) {
    desactivarModoMovimiento();
    return;
  }

  // Desactivar todos los demás modos
  if (modoAtaque.value) {
    desactivarModoAtaque();
  }
  if (modoCarga.value) {
    desactivarModoCarga();
  }
  if (modoEmpujar.value) {
    desactivarModoEmpujar();
  }
  if (modoInstruir.value) {
    desactivarModoInstruir();
  }

  const personaje = personajeSeleccionado.value;
  const movimiento = personaje.atributos.movimiento || 0;

  if (movimiento === 0) {
    agregarLog(
      "sistema",
      `⚠️ ${personaje.nombre} no tiene movimiento disponible`
    );
    return;
  }

  // Obtener posición actual del personaje
  const meshPersonaje = personajesMeshes.get(personaje.instanciaId);
  if (!meshPersonaje) {
    agregarLog("sistema", "⚠️ No se pudo encontrar el personaje en el mapa");
    return;
  }

  const col = (meshPersonaje as any).hexCol;
  const row = (meshPersonaje as any).hexRow;

  // Obtener hexágonos vecinos
  const vecinos = getNeighbors(col, row, movimiento);

  // Filtrar hexágonos ocupados
  const vecinosLibres = vecinos.filter((hex) => {
    const coords = getHexCoordinates(hex);
    if (!coords) return false;
    const key = `${coords.x},${coords.y}`;
    return !hexagonosOcupados.has(key);
  });

  hexagonosMovimiento.value = vecinosLibres;
  modoMovimiento.value = true;

  // Resaltar hexágonos de movimiento en verde
  highlightHexagons(vecinosLibres, 0x00ff00);

  agregarLog(
    "movimiento",
    `🏃 Modo movimiento activado: ${vecinosLibres.length} casillas disponibles (Rango: ${movimiento})`
  );
}

function desactivarModoMovimiento() {
  if (hexagonosMovimiento.value.length > 0) {
    resetHexagonsColor(hexagonosMovimiento.value);
    hexagonosMovimiento.value = [];
  }
  modoMovimiento.value = false;
  agregarLog("sistema", "🏃 Modo movimiento desactivado");
}

function activarModoAtaque() {
  if (!personajeSeleccionado.value) {
    agregarLog("sistema", "⚠️ Debes seleccionar un personaje primero");
    return;
  }

  // Si ya está en modo ataque, desactivar
  if (modoAtaque.value) {
    desactivarModoAtaque();
    return;
  }

  desactivarModos();

  const personaje = personajeSeleccionado.value;

  // Obtener el arma equipada
  const armaEquipadaId = personaje.armaEquipada;
  let alcance = 1; // Alcance por defecto (cuerpo a cuerpo)

  if (armaEquipadaId) {
    const arma = armasData.armas.find((a: any) => a.id === armaEquipadaId);
    if (arma) {
      // Si el arma tiene distancia_max, usamos ese valor como alcance
      // Si no, usamos 1 (cuerpo a cuerpo)
      if (arma.distancia_max) {
        alcance = arma.distancia_max;
      }
    }
  }

  // Obtener posición actual del personaje
  const meshPersonaje = personajesMeshes.get(personaje.instanciaId);
  if (!meshPersonaje) {
    agregarLog("sistema", "⚠️ No se pudo encontrar el personaje en el mapa");
    return;
  }

  const col = (meshPersonaje as any).hexCol;
  const row = (meshPersonaje as any).hexRow;

  // Obtener hexágonos en rango de ataque
  const hexagonosEnRango = getNeighbors(col, row, alcance);

  // Encontrar objetivos (personajes enemigos) en esos hexágonos
  const objetivos: THREE.Mesh[] = [];
  hexagonosEnRango.forEach((hex) => {
    const coords = getHexCoordinates(hex);
    if (!coords) return;

    // Buscar si hay un personaje en este hexágono
    personajesMeshes.forEach((mesh, instanciaId) => {
      const meshCol = (mesh as any).hexCol;
      const meshRow = (mesh as any).hexRow;
      if (
        meshCol === coords.x &&
        meshRow === coords.y &&
        instanciaId !== personaje.instanciaId
      ) {
        objetivos.push(mesh);
      }
    });
  });

  hexagonosAtaque.value = hexagonosEnRango;
  objetivosAtaque.value = objetivos;
  modoAtaque.value = true;

  // Resaltar hexágonos de ataque en rojo
  highlightHexagons(hexagonosEnRango, 0xff0000);

  const mensajeObjetivos =
    objetivos.length > 0
      ? `${objetivos.length} objetivo(s) en rango`
      : "sin objetivos en rango";
  agregarLog(
    "ataque",
    `⚔️ Modo ataque activado: ${mensajeObjetivos} (Alcance: ${alcance})`
  );
}

function desactivarModoAtaque() {
  if (hexagonosAtaque.value.length > 0) {
    resetHexagonsColor(hexagonosAtaque.value);
    hexagonosAtaque.value = [];
  }
  objetivosAtaque.value = [];
  modoAtaque.value = false;
  agregarLog("sistema", "⚔️ Modo ataque desactivado");
}

function realizarAtaque(objetivoMesh: THREE.Mesh) {
  if (!personajeSeleccionado.value) return;

  // Verificar que hay acciones disponibles
  if (accionesRestantes.value <= 0) {
    agregarLog("sistema", "⚠️ No te quedan acciones disponibles");
    return;
  }

  const atacante = personajeSeleccionado.value;
  const defensor = (objetivoMesh as any).personajeData as PersonajeInstancia;

  if (!defensor) return;

  // Guardar referencias para el popup de reacción
  atacanteActual.value = atacante;
  defensorActual.value = defensor;
  meshAtacanteActual.value = personajesMeshes.get(atacante.instanciaId) || null;
  meshDefensorActual.value = objetivoMesh;

  // Buscar aliados adyacentes del defensor para la opción de Interceptar
  aliadosAdyacentes.value = [];
  if (partidaActual.value) {
    const equipoDefensor = partidaActual.value.equipos.find((eq) =>
      eq.personajes.some((p) => p.instanciaId === defensor.instanciaId)
    );

    if (equipoDefensor) {
      const meshDefensor = meshDefensorActual.value;
      if (meshDefensor) {
        const colDefensor = (meshDefensor as any).hexCol;
        const rowDefensor = (meshDefensor as any).hexRow;

        // Obtener hexágonos adyacentes (distancia 1)
        const hexagonosAdyacentes = getNeighbors(colDefensor, rowDefensor, 1);

        // Buscar aliados en esas posiciones
        equipoDefensor.personajes.forEach((aliado) => {
          if (aliado.instanciaId === defensor.instanciaId) return; // No incluir al defensor mismo

          const meshAliado = personajesMeshes.get(aliado.instanciaId);
          if (meshAliado) {
            const colAliado = (meshAliado as any).hexCol;
            const rowAliado = (meshAliado as any).hexRow;

            // Verificar si está en una casilla adyacente
            const estaAdyacente = hexagonosAdyacentes.some((hex) => {
              const coords = getHexCoordinates(hex);
              return coords && coords.x === colAliado && coords.y === rowAliado;
            });

            if (estaAdyacente) {
              aliadosAdyacentes.value.push(aliado);
            }
          }
        });
      }
    }
  }

  // Mostrar popup de reacción y esperar
  mostrarPopupReaccion.value = true;
}

async function seleccionarReaccion(tipo: string) {
  mostrarPopupReaccion.value = false;
  reaccionSeleccionada.value = tipo;

  // Continuar con el ataque después de la reacción
  await procesarAtaqueConReaccion();
}

async function procesarAtaqueConReaccion() {
  if (!atacanteActual.value || !defensorActual.value) return;

  const atacante = atacanteActual.value;
  const defensor = defensorActual.value;
  const objetivoMesh = meshDefensorActual.value;

  if (!objetivoMesh) return;

  // Obtener el arma equipada del atacante
  const armaEquipadaId = atacante.armaEquipada;
  const armaAtacante = armaEquipadaId
    ? armasData.armas.find((a: any) => a.id === armaEquipadaId)
    : null;

  // Obtener el arma del defensor para contraataque
  const armaDefensorId = defensor.armaEquipada;
  const armaDefensor = armaDefensorId
    ? armasData.armas.find((a: any) => a.id === armaDefensorId)
    : null;

  // Calcular defensa del defensor
  const calcularDefensa = (
    personaje: PersonajeInstancia,
    tipo: "penetrante" | "lacerante" | "contundente"
  ): number => {
    const resistencia = personaje.atributos.resistencia || 0;
    let armaduraTotal = resistencia;

    if (personaje.armaduras && personaje.armaduras.length > 0) {
      personaje.armaduras.forEach((armaduraId) => {
        const armadura = armadurasData.armaduras.find(
          (a: any) => a.id === armaduraId
        );
        if (armadura) {
          armaduraTotal += armadura[tipo] || 0;
        }
      });
    }

    return armaduraTotal;
  };

  const defensaAtacante = {
    penetrante: calcularDefensa(atacante, "penetrante"),
    lacerante: calcularDefensa(atacante, "lacerante"),
    contundente: calcularDefensa(atacante, "contundente"),
  };

  // PROCESAR REACCIÓN
  let modificadorEvasion = 0;
  let modificadorResistencia = 0;
  let defensorFinal = defensor; // Puede cambiar con Interceptar
  let meshDefensorFinal = objetivoMesh; // Puede cambiar con Interceptar

  if (reaccionSeleccionada.value === TipoReaccion.PARRY) {
    const resultadoParry = realizarParry(defensorFinal);
    agregarLog("activa", resultadoParry.mensaje);
    modificadorEvasion = resultadoParry.modificadorEvasion || 0;
  } else if (reaccionSeleccionada.value === TipoReaccion.CONTRAATAQUE) {
    const resultadoContra = realizarContraataque(
      defensorFinal,
      atacante,
      armaDefensor,
      defensaAtacante
    );
    agregarLog("activa", resultadoContra.mensaje);

    // Si el contraataque tuvo éxito, aplicar daño al atacante
    if (resultadoContra.exito && resultadoContra.ataqueContra) {
      atacante.vidaActual = Math.max(
        0,
        atacante.vidaActual - resultadoContra.ataqueContra.danio
      );

      // Actualizar en la partida
      if (partidaActual.value) {
        partidaActual.value.equipos.forEach((equipo) => {
          const personajeEnEquipo = equipo.personajes.find(
            (p) => p.instanciaId === atacante.instanciaId
          );
          if (personajeEnEquipo) {
            personajeEnEquipo.vidaActual = atacante.vidaActual;
          }
        });
        localStorage.setItem(
          props.partidaId,
          JSON.stringify(partidaActual.value)
        );
      }

      agregarLog(
        "sistema",
        `❤️ ${atacante.nombre}: ${atacante.vidaActual}/${atacante.atributos.hp} HP`
      );
    }
  } else if (reaccionSeleccionada.value === TipoReaccion.TENSION) {
    const resultadoTension = realizarTension(defensorFinal);
    agregarLog("activa", resultadoTension.mensaje);
    modificadorResistencia = resultadoTension.modificadorResistencia || 0;
  } else if (reaccionSeleccionada.value === TipoReaccion.INTERCEPTAR) {
    // Mostrar selector de aliado si hay varios
    if (aliadosAdyacentes.value.length > 0) {
      // Por ahora, seleccionar el primero automáticamente
      // TODO: En el futuro se puede hacer un segundo popup para elegir quién intercepta
      const interceptor = aliadosAdyacentes.value[0]!;
      const resultadoInterceptar = realizarInterceptar(
        interceptor,
        defensorFinal
      );
      agregarLog("activa", resultadoInterceptar.mensaje);

      // Cambiar el defensor al interceptor
      if (resultadoInterceptar.nuevoDefensor) {
        defensorFinal = resultadoInterceptar.nuevoDefensor;
        meshDefensorFinal =
          personajesMeshes.get(defensorFinal.instanciaId) || objetivoMesh;
      }
    }
  } else {
    agregarLog("sistema", `${defensorFinal.nombre} no reacciona`);
  }

  // Recalcular defensa del defensor final (puede haber cambiado con Interceptar)
  const defensaDefensorFinal = {
    penetrante:
      calcularDefensa(defensorFinal, "penetrante") + modificadorResistencia,
    lacerante:
      calcularDefensa(defensorFinal, "lacerante") + modificadorResistencia,
    contundente:
      calcularDefensa(defensorFinal, "contundente") + modificadorResistencia,
  };

  // Resetear reacción
  reaccionSeleccionada.value = null;

  // CONTINUAR CON EL ATAQUE ORIGINAL (ahora contra defensorFinal)
  // Tirar 2d12
  // Centralized dice rolling with advantage/disadvantage
  /**
   * Roll d12 dice for actions, supporting advantage/disadvantage mechanics.
   * @param {0|1|-1} ventaja 0=normal, 1=advantage, -1=disadvantage
   * @param {number} extraDice Number of extra dice to roll (default 0, usually 0 or 1)
   * @returns {{all: number[], used: number[], type: 'normal'|'adv'|'dis', total: number}}
   */
  function tirarDadosD12(ventaja = 0, extraDice = 0) {
    // Always roll at least 2 dice
    // Si el personaje tiene ventaja por instruir, consumirla
    if (
      arguments.length > 2 &&
      typeof arguments[2] === "object" &&
      arguments[2] &&
      arguments[2].personaje
    ) {
      consumirVentajaSiCorresponde(arguments[2].personaje);
    }
    const numDice = 2 + Math.max(0, extraDice);
    const rolls = Array.from(
      { length: numDice },
      () => Math.floor(Math.random() * 12) + 1
    );
    let used: number[];
    let type: "normal" | "adv" | "dis" = "normal";
    if (ventaja === 1) {
      // Advantage: keep 2 highest
      used = [...rolls].sort((a, b) => b - a).slice(0, 2);
      type = "adv";
    } else if (ventaja === -1) {
      // Disadvantage: keep 2 lowest
      used = [...rolls].sort((a, b) => a - b).slice(0, 2);
      type = "dis";
    } else {
      // Normal: just first 2
      used = rolls.slice(0, 2);
    }
    return {
      all: rolls,
      used,
      type,
      total: used[0] + used[1],
    };
  }
  // USO CORRECTO: ejemplo de tirada de ataque con ventaja/desventaja
  // const { all, used, type, total } = tirarDadosD12(ventaja, extraDice)
  // if (used[0] === 1 || used[1] === 1) { ... }
  // --- DICE ROLLING LOGIC ---
  // (tirarDadosD12 is now defined above)
  // Example usage for attack:
  // const { all, used, type, total } = tirarDadosD12(ventaja, extraDice)

  // Replace all usages of tirarD12/dado1/dado2 below with tirarDadosD12

  // Example for attack (replace this block):
  // const dado1 = tirarD12()
  // const dado2 = tirarD12()
  // ...
  // if (dado1 === 1 || dado2 === 1) { ... }

  // Instead, use:
  // const { all, used, type, total } = tirarDadosD12(ventaja, extraDice)
  // if (used[0] === 1 || used[1] === 1) { ... }

  // (The actual replacement will be done in the next step for all usages)

  // Tirada de dados con ventaja/desventaja
  const { all, used, type, total } = tirarDadosD12(ventaja, extraDice, { personaje: atacante });

  // Verificar fallo automático (cualquier dado es 1)
  if (used[0] === 1 || used[1] === 1) {
    agregarLog(
      "ataque",
      `⚔️ ${atacante.nombre} ataca a ${defensorFinal.nombre}!\n` +
        `🎲 Tirada: ${used[0]} + ${used[1]}${type === 'adv' ? ' (Ventaja)' : type === 'dis' ? ' (Desventaja)' : ''}\n` +
        `💀 ¡FALLO CRÍTICO! (sacó un 1)\n` +
        `El ataque falla estrepitosamente.`
    );

    // Consumir acción
    accionesRestantes.value--;
    agregarLog("sistema", `⚡ Acciones restantes: ${accionesRestantes.value}`);

    desactivarModoAtaque();

    // Si no quedan acciones, pasar turno automáticamente
    if (accionesRestantes.value <= 0) {
      setTimeout(() => pasarTurno(), 1000);
    }
    return;
  }

  const tirada = used[0] + used[1] + atacante.nivel;
  const evasionBase = defensorFinal.atributos.evasion || 12;
  const evasionDefensor = evasionBase + modificadorEvasion; // Aplicar modificador de Parry

  // Verificar si el ataque falla por evasión
  if (tirada < evasionDefensor) {
    const mensajeParry =
      modificadorEvasion > 0
        ? ` (Base: ${evasionBase} + Parry: ${modificadorEvasion})`
        : "";
    agregarLog(
      "ataque",
      `⚔️ ${atacante.nombre} ataca a ${defensorFinal.nombre}!\n` +
        `🎲 Tirada: ${used[0]} + ${used[1]} + ${atacante.nivel} = ${tirada}\n` +
        `🛡️ ¡FALLO! (Evasión: ${evasionDefensor}${mensajeParry})\n` +
        `El ataque no logra conectar.`
    );

    // Consumir acción
    accionesRestantes.value--;
    agregarLog("sistema", `⚡ Acciones restantes: ${accionesRestantes.value}`);

    desactivarModoAtaque();

    // Si no quedan acciones, pasar turno automáticamente
    if (accionesRestantes.value <= 0) {
      setTimeout(() => pasarTurno(), 1000);
    }
    return;
  }

  const poderio = atacante.atributos.poderio || 0;
  const punteria = atacante.atributos.punteria || 0;

  // Verificar crítico
  const rangoCriticoArma = armaAtacante?.rango_critico
    ? parseInt(armaAtacante.rango_critico as any)
    : 999;
  const rangoCriticoPersonaje = atacante.atributos.rangoCritico || 24;
  const rangoCriticoFinal = Math.min(rangoCriticoArma, rangoCriticoPersonaje);
  const esCritico = tirada >= rangoCriticoFinal;

  // Parsear multiplicador de crítico
  let multiplicadorCritico = 1;
  if (esCritico && armaAtacante?.critico) {
    const match = armaAtacante.critico.match(/x(\d+)/);
    if (match && match[1]) {
      multiplicadorCritico = parseInt(match[1]);
    }
  }

  // Calcular daño base
  let danioPenetrante = (armaAtacante?.penetrante || 0) + poderio;
  let danioLacerante = (armaAtacante?.lacerante || 0) + poderio;
  let danioContundente = (armaAtacante?.contundente || 0) + poderio;

  // Aplicar multiplicador de crítico
  if (esCritico) {
    danioPenetrante *= multiplicadorCritico;
    danioLacerante *= multiplicadorCritico;
    danioContundente *= multiplicadorCritico;
  }

  // Aplicar bonus de Apuntar (suma puntería al daño)
  let bonusApuntar = 0;
  if (apuntarActivo.value) {
    bonusApuntar = punteria;
    danioPenetrante += bonusApuntar;
    danioLacerante += bonusApuntar;
    danioContundente += bonusApuntar;

    // Consumir el buff de Apuntar después de usarlo
    apuntarActivo.value = false;
  }

  // Aplicar Ataque Pesado (x2 daño)
  const esAtaquePesado = ataquePesadoActivo.value;
  if (esAtaquePesado) {
    danioPenetrante *= 2;
    danioLacerante *= 2;
    danioContundente *= 2;

    // Consumir el flag de Ataque Pesado
    ataquePesadoActivo.value = false;
  }

  // Aplicar puntería: reduce la armadura del defensor (ya incluye modificador de Tensión)
  const defensaPenetrante = Math.max(
    0,
    defensaDefensorFinal.penetrante - punteria
  );
  const defensaLacerante = Math.max(
    0,
    defensaDefensorFinal.lacerante - punteria
  );
  const defensaContundente = Math.max(
    0,
    defensaDefensorFinal.contundente - punteria
  );

  // Calcular daño final
  const danioFinalPenetrante = Math.max(0, danioPenetrante - defensaPenetrante);
  const danioFinalLacerante = Math.max(0, danioLacerante - defensaLacerante);
  const danioFinalContundente = Math.max(
    0,
    danioContundente - defensaContundente
  );

  // Sumar el daño total (se toma el mayor)
  const danioTotalFinal = Math.max(
    danioFinalPenetrante,
    danioFinalLacerante,
    danioFinalContundente
  );

  // Actualizar vida del defensor final
  defensorFinal.vidaActual = Math.max(
    0,
    defensorFinal.vidaActual - danioTotalFinal
  );

  // Actualizar en la partida
  if (partidaActual.value) {
    partidaActual.value.equipos.forEach((equipo) => {
      const personajeEnEquipo = equipo.personajes.find(
        (p) => p.instanciaId === defensorFinal.instanciaId
      );
      if (personajeEnEquipo) {
        personajeEnEquipo.vidaActual = defensorFinal.vidaActual;
      }
    });

    // Guardar en localStorage
    localStorage.setItem(props.partidaId, JSON.stringify(partidaActual.value));
  }

  // Mensaje completo del ataque
  const mensajeTension =
    modificadorResistencia > 0
      ? ` (Armadura +${modificadorResistencia} por Tensión)`
      : "";
  const mensajeApuntar =
    bonusApuntar > 0 ? ` (+${bonusApuntar} por Apuntar)` : "";
  const mensajeAtaquePesado = esAtaquePesado ? " 🔥 ATAQUE PESADO (x2)" : "";
  const mensaje =
    `⚔️ ${atacante.nombre} ataca a ${defensorFinal.nombre}!${mensajeAtaquePesado}\n` +
  `🎲 Tirada: ${used[0]} + ${used[1]} + ${atacante.nivel} = ${tirada} (Evasión: ${evasionDefensor})\n` +
    (esCritico
      ? `⭐ ¡CRÍTICO! ${
          armaAtacante?.critico || "x2"
        } (Rango: ${rangoCriticoFinal})\n`
      : "") +
    `🎯 Puntería: ${punteria}${mensajeApuntar}${mensajeTension}\n` +
    `💥 Daño: P:${danioFinalPenetrante} L:${danioFinalLacerante} C:${danioFinalContundente} = ${danioTotalFinal} total\n` +
    `❤️ ${defensorFinal.nombre}: ${defensorFinal.vidaActual}/${defensorFinal.atributos.hp} HP`;

  agregarLog("ataque", mensaje);

  // Consumir acciones (2 si es Ataque Pesado, 1 si es normal)
  const accionesConsumidas = esAtaquePesado ? 2 : 1;
  accionesRestantes.value -= accionesConsumidas;
  agregarLog("sistema", `⚡ Acciones restantes: ${accionesRestantes.value}`);

  // Desactivar modo ataque
  desactivarModoAtaque();

  // Si no quedan acciones, pasar turno automáticamente
  if (accionesRestantes.value <= 0) {
    setTimeout(() => pasarTurno(), 1000);
  }
}

// Procesar ataques de oportunidad secuencialmente
async function procesarAtaquesDeOportunidad() {
  if (!enemigoMoviendose.value) return;

  // Procesar cada oportunidad secuencialmente
  for (let i = 0; i < personajesConOportunidad.value.length; i++) {
    const { personaje: atacante, tipo } = personajesConOportunidad.value[i]!;

    // Verificar si el personaje que se mueve sigue vivo
    if (enemigoMoviendose.value.vidaActual <= 0) {
      agregarLog(
        "activa",
        `⚡ El movimiento se interrumpe - ${enemigoMoviendose.value.nombre} ha sido derrotado`
      );
      break;
    }

    // Mostrar popup de decisión al atacante
    const decision = await mostrarDecisionOportunidad(atacante, tipo);

    if (decision === "atacar") {
      // Realizar ataque de oportunidad
      const objetivo = enemigoMoviendose.value;
      const armaAtacanteId = atacante.armaEquipada;
      const armaAtacante = armaAtacanteId
        ? armasData.armas.find((a: any) => a.id === armaAtacanteId)
        : null;

      // Calcular defensa del objetivo
      const calcularDefensa = (
        personaje: PersonajeInstancia,
        tipo: "penetrante" | "lacerante" | "contundente"
      ): number => {
        const resistencia = personaje.atributos.resistencia || 0;
        let armaduraTotal = resistencia;

        if (personaje.armaduras && personaje.armaduras.length > 0) {
          personaje.armaduras.forEach((armaduraId) => {
            const armadura = armadurasData.armaduras.find(
              (a: any) => a.id === armaduraId
            );
            if (armadura) {
              armaduraTotal += armadura[tipo] || 0;
            }
          });
        }

        return armaduraTotal;
      };

      const defensaObjetivo = {
        penetrante: calcularDefensa(objetivo, "penetrante"),
        lacerante: calcularDefensa(objetivo, "lacerante"),
        contundente: calcularDefensa(objetivo, "contundente"),
      };

      // Llamar a la función de ataque de oportunidad
      const resultado = realizarAtaqueOportunidad(
        atacante,
        objetivo,
        armaAtacante,
        defensaObjetivo
      );

      // Mostrar mensaje
      agregarLog("activa", resultado.mensaje);

      // Si el ataque tuvo éxito, aplicar daño
      if (resultado.exito && resultado.ataqueContra) {
        objetivo.vidaActual = Math.max(
          0,
          objetivo.vidaActual - resultado.ataqueContra.danio
        );

        // Actualizar en la partida
        if (partidaActual.value) {
          partidaActual.value.equipos.forEach((equipo) => {
            const personajeEnEquipo = equipo.personajes.find(
              (p) => p.instanciaId === objetivo.instanciaId
            );
            if (personajeEnEquipo) {
              personajeEnEquipo.vidaActual = objetivo.vidaActual;
            }
          });
          localStorage.setItem(
            props.partidaId,
            JSON.stringify(partidaActual.value)
          );
        }

        agregarLog(
          "sistema",
          `❤️ ${objetivo.nombre}: ${objetivo.vidaActual}/${objetivo.atributos.hp} HP`
        );
      }
    } else {
      agregarLog(
        "activa",
        `⚡ ${atacante.nombre} deja pasar a ${enemigoMoviendose.value.nombre}`
      );
    }
  }
}

// Mostrar popup de decisión para ataque de oportunidad
async function mostrarDecisionOportunidad(
  atacante: PersonajeInstancia,
  tipo: "salida" | "entrada"
): Promise<"atacar" | "pasar"> {
  return new Promise((resolve) => {
    // Configurar popup
    atacanteOportunidadActual.value = atacante;
    tipoOportunidadActual.value = tipo;
    decisionOportunidad.value = null;
    mostrarPopupOportunidad.value = true;

    // Esperar decisión
    const checkDecision = setInterval(() => {
      if (decisionOportunidad.value) {
        clearInterval(checkDecision);
        mostrarPopupOportunidad.value = false;
        resolve(decisionOportunidad.value);
      }
    }, 100);
  });
}

// Seleccionar decisión de oportunidad
function seleccionarDecisionOportunidad(decision: "atacar" | "pasar") {
  decisionOportunidad.value = decision;
}

function activarModoCarga() {
  if (!personajeSeleccionado.value) {
    agregarLog("sistema", "⚠️ Debes seleccionar un personaje primero");
    return;
  }

  // Si ya está en modo carga, desactivar
  if (modoCarga.value) {
    desactivarModoCarga();
    return;
  }

  // Desactivar todos los demás modos
  if (modoMovimiento.value) {
    desactivarModoMovimiento();
  }
  if (modoAtaque.value) {
    desactivarModoAtaque();
  }
  if (modoEmpujar.value) {
    desactivarModoEmpujar();
  }

  if (modoInstruir.value) {
    desactivarModoInstruir();
  }

  const personaje = personajeSeleccionado.value;
  const movimiento = personaje.atributos.movimiento || 0;

  if (movimiento === 0) {
    agregarLog(
      "sistema",
      `⚠️ ${personaje.nombre} no tiene movimiento disponible`
    );
    return;
  }

  // Obtener posición actual del personaje
  const meshPersonaje = personajesMeshes.get(personaje.instanciaId);
  if (!meshPersonaje) {
    agregarLog("sistema", "⚠️ No se pudo encontrar el personaje en el mapa");
    return;
  }

  const col = (meshPersonaje as any).hexCol;
  const row = (meshPersonaje as any).hexRow;

  // Obtener hexágonos en rango de movimiento
  const hexagonosEnRango = getNeighbors(col, row, movimiento);

  // Encontrar todos los objetivos (personajes enemigos), independientemente del rango
  const objetivos: THREE.Mesh[] = [];

  personajesMeshes.forEach((mesh, instanciaId) => {
    if (instanciaId === personaje.instanciaId) return;
    objetivos.push(mesh);
  });

  hexagonosCarga.value = hexagonosEnRango;
  objetivosCarga.value = objetivos;
  modoCarga.value = true;

  // Resaltar hexágonos de movimiento en amarillo/naranja
  highlightHexagons(hexagonosEnRango, 0xffa500);

  const mensajeObjetivos =
    objetivos.length > 0
      ? `${objetivos.length} objetivo(s) disponible(s)`
      : "sin objetivos";
  agregarLog(
    "activa",
    `🏇 Modo carga activado: ${mensajeObjetivos} (Movimiento: ${movimiento})`
  );
}

function desactivarModoCarga() {
  if (hexagonosCarga.value.length > 0) {
    resetHexagonsColor(hexagonosCarga.value);
    hexagonosCarga.value = [];
  }
  objetivosCarga.value = [];
  modoCarga.value = false;
  agregarLog("sistema", "🏇 Modo carga desactivado");
}

function realizarCargaHacia(objetivoMesh: THREE.Mesh) {
  if (!personajeSeleccionado.value) return;

  // Verificar que hay acciones disponibles
  if (accionesRestantes.value <= 0) {
    agregarLog("sistema", "⚠️ No te quedan acciones disponibles");
    return;
  }

  const atacante = personajeSeleccionado.value;
  const objetivo = (objetivoMesh as any).personajeData as PersonajeInstancia;

  if (!objetivo) return;

  // Obtener posiciones
  const meshAtacante = personajesMeshes.get(atacante.instanciaId);
  if (!meshAtacante) return;

  const posicionAtacante = {
    col: (meshAtacante as any).hexCol,
    row: (meshAtacante as any).hexRow,
  };

  const posicionObjetivo = {
    col: (objetivoMesh as any).hexCol,
    row: (objetivoMesh as any).hexRow,
  };

  // Obtener todas las casillas adyacentes al objetivo
  const vecinosObjetivo: Array<{ x: number; y: number }> = [];
  const isEven = posicionObjetivo.row % 2 === 0;

  // Offsets para filas pares e impares en grilla hexagonal
  const offsets: [number, number][] = isEven
    ? [
        [-1, -1],
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 1],
        [-1, 0],
      ]
    : [
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 0],
      ];

  for (const [dx, dy] of offsets) {
    const nextX = posicionObjetivo.col + dx;
    const nextY = posicionObjetivo.row + dy;
    const key = `${nextX},${nextY}`;

    // Verificar que no esté ocupado
    if (!hexagonosOcupados.has(key)) {
      vecinosObjetivo.push({ x: nextX, y: nextY });
    }
  }

  if (vecinosObjetivo.length === 0) {
    agregarLog("sistema", "⚠️ No hay casillas libres adyacentes al objetivo");
    desactivarModoCarga();
    return;
  }

  // Filtrar vecinos que estén en el rango de movimiento
  const vecinosEnRango = vecinosObjetivo.filter((vecino) =>
    hexagonosCarga.value.some((hex: THREE.Mesh) => {
      const coords = getHexCoordinates(hex);
      return coords && coords.x === vecino.x && coords.y === vecino.y;
    })
  );

  if (vecinosEnRango.length === 0) {
    agregarLog("sistema", "⚠️ El objetivo está fuera del rango de carga");
    desactivarModoCarga();
    return;
  }

  // Encontrar la casilla adyacente más cercana al punto de origen del atacante
  let mejorVecino: { x: number; y: number } = vecinosEnRango[0]!;
  let menorDistancia = Infinity;

  vecinosEnRango.forEach((vecino) => {
    // Calcular distancia desde el atacante (punto de origen) hasta este vecino
    const dx = vecino.x - posicionAtacante.col;
    const dy = vecino.y - posicionAtacante.row;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < menorDistancia) {
      menorDistancia = distancia;
      mejorVecino = vecino;
    }
  });

  const nuevaPosicion = mejorVecino;
  const hexDestino = getMeshAt(nuevaPosicion.x, nuevaPosicion.y);

  if (!hexDestino) {
    agregarLog("sistema", "⚠️ Error al encontrar hexágono de destino");
    desactivarModoCarga();
    return;
  }

  // Liberar hexágono anterior
  hexagonosOcupados.delete(`${posicionAtacante.col},${posicionAtacante.row}`);

  // Ocupar nuevo hexágono
  hexagonosOcupados.add(`${nuevaPosicion.x},${nuevaPosicion.y}`);

  // Mover el mesh del personaje
  meshAtacante.position.set(
    hexDestino.position.x,
    hexDestino.position.y + 1.5,
    hexDestino.position.z
  );

  // Actualizar coordenadas guardadas
  (meshAtacante as any).hexCol = nuevaPosicion.x;
  (meshAtacante as any).hexRow = nuevaPosicion.y;

  agregarLog("activa", `🏇 ${atacante.nombre} carga hacia ${objetivo.nombre}!`);

  // Consumir acción por el movimiento (el ataque consumirá otra)
  accionesRestantes.value--;
  agregarLog("sistema", `⚡ Acciones restantes: ${accionesRestantes.value}`);

  // Desactivar modo carga
  desactivarModoCarga();

  // Realizar ataque automático al objetivo
  agregarLog("activa", `⚔️ Ataque de carga contra ${objetivo.nombre}!`);

  // Simular un pequeño delay para que se vea el movimiento antes del ataque
  setTimeout(() => {
    realizarAtaque(objetivoMesh);
  }, 100);
}

function desactivarModos() {
  if (modoMovimiento.value) {
    desactivarModoMovimiento();
  }
  if (modoAtaque.value) {
    desactivarModoAtaque();
  }
  if (modoEmpujar.value) {
    desactivarModoEmpujar();
  }
  if (modoCarga.value) {
    desactivarModoCarga();
  }
  if (modoInstruir.value) {
    desactivarModoInstruir();
  }
}

function activarModoInstruir() {
  if (!personajeSeleccionado.value) {
    agregarLog("sistema", "⚠️ Debes seleccionar un personaje primero");
    return;
  }

  // Si ya está en modo instruir, desactivar
  if (modoInstruir.value) {
    desactivarModoInstruir();
    return;
  }

  desactivarModos();
  modoInstruir.value = true;
  agregarLog("activa", `📢 Modo instruir activado`);

  const personaje = personajeSeleccionado.value;

  // Obtener aliados del mismo equipo (excluyendo a sí mismo)
  let aliados: PersonajeInstancia[] = [];
  if (partidaActual.value) {
    partidaActual.value.equipos.forEach((eq) => {
      if (eq.personajes.some((p) => p.instanciaId === personaje.instanciaId)) {
        aliados = eq.personajes.filter(
          (p) => p.instanciaId !== personaje.instanciaId
        );
      }
    });
  }

  if (aliados.length === 0) {
    agregarLog("sistema", "⚠️ No hay aliados disponibles para instruir");
    modoInstruir.value = false;
    return;
  }

  // Resaltar aliados en el UI (opcional: visual feedback)
  aliados.forEach((a) => {
    const mesh = personajesMeshes.get(a.instanciaId);
    if (mesh) {
      // Ejemplo: cambiar color del mesh temporalmente
      mesh.material.emissive?.setHex(0xffe066);
    }
  });

  // Si el usuario cancela, desactivar modo instruir y quitar resaltado
  // (esto se maneja en la función de cancelar y en desactivarModoInstruir)
}

function activarModoEmpujar() {
  if (!personajeSeleccionado.value) {
    agregarLog("sistema", "⚠️ Debes seleccionar un personaje primero");
    return;
  }

  // Si ya está en modo empujar, desactivar
  if (modoEmpujar.value) {
    desactivarModoEmpujar();
    return;
  }
  if (modoInstruir.value) {
    desactivarModoInstruir();
  }

  // Desactivar otros modos
  if (modoMovimiento.value) {
    desactivarModoMovimiento();
  }
  if (modoAtaque.value) {
    desactivarModoAtaque();
  }
  if (modoCarga.value) {
    desactivarModoCarga();
  }

  const personaje = personajeSeleccionado.value;

  // Obtener posición actual del personaje
  const meshPersonaje = personajesMeshes.get(personaje.instanciaId);
  if (!meshPersonaje) {
    agregarLog("sistema", "⚠️ No se pudo encontrar el personaje en el mapa");
    return;
  }

  const col = (meshPersonaje as any).hexCol;
  const row = (meshPersonaje as any).hexRow;

  // Obtener hexágonos adyacentes (distancia 1)
  const hexagonosAdyacentes = getNeighbors(col, row, 1);

  // Encontrar todos los objetivos (personajes) en las casillas adyacentes
  const objetivos: THREE.Mesh[] = [];

  personajesMeshes.forEach((mesh, instanciaId) => {
    if (instanciaId === personaje.instanciaId) return;

    const targetCol = (mesh as any).hexCol;
    const targetRow = (mesh as any).hexRow;

    // Verificar si está en una casilla adyacente
    const estaAdyacente = hexagonosAdyacentes.some((hex) => {
      const coords = getHexCoordinates(hex);
      return coords && coords.x === targetCol && coords.y === targetRow;
    });

    if (estaAdyacente) {
      objetivos.push(mesh);
    }
  });

  objetivosEmpujar.value = objetivos;
  modoEmpujar.value = true;

  // Resaltar hexágonos adyacentes en púrpura
  highlightHexagons(hexagonosAdyacentes, 0x9b59b6);

  const mensajeObjetivos =
    objetivos.length > 0
      ? `${objetivos.length} objetivo(s) adyacente(s)`
      : "sin objetivos adyacentes";
  agregarLog("activa", `👊 Modo empujar activado: ${mensajeObjetivos}`);
}

function desactivarModoEmpujar() {
  // Resetear hexágonos resaltados (los adyacentes)
  if (personajeSeleccionado.value) {
    const meshPersonaje = personajesMeshes.get(
      personajeSeleccionado.value.instanciaId
    );
    if (meshPersonaje) {
      const col = (meshPersonaje as any).hexCol;
      const row = (meshPersonaje as any).hexRow;
      const hexagonosAdyacentes = getNeighbors(col, row, 1);
      resetHexagonsColor(hexagonosAdyacentes);
    }
  }

  objetivosEmpujar.value = [];
  modoEmpujar.value = false;
  agregarLog("sistema", "👊 Modo empujar desactivado");
}

function realizarEmpujarHacia(objetivoMesh: THREE.Mesh) {
  if (!personajeSeleccionado.value) return;

  // Verificar que hay acciones disponibles
  if (accionesRestantes.value <= 0) {
    agregarLog("sistema", "⚠️ No te quedan acciones disponibles");
    return;
  }

  const atacante = personajeSeleccionado.value;
  const defensor = (objetivoMesh as any).personajeData as PersonajeInstancia;

  if (!defensor) return;

  // Obtener posiciones
  const meshAtacante = personajesMeshes.get(atacante.instanciaId);
  const meshDefensor = objetivoMesh;

  if (!meshAtacante) return;

  const posicionAtacante = {
    col: (meshAtacante as any).hexCol,
    row: (meshAtacante as any).hexRow,
  };

  const posicionDefensor = {
    col: (meshDefensor as any).hexCol,
    row: (meshDefensor as any).hexRow,
  };

  // Calcular dirección del empuje (desde atacante hacia defensor)
  const direccionX = posicionDefensor.col - posicionAtacante.col;
  const direccionY = posicionDefensor.row - posicionAtacante.row;
  const magnitud = Math.sqrt(direccionX * direccionX + direccionY * direccionY);

  // Normalizar dirección
  const dirNormX = direccionX / magnitud;
  const dirNormY = direccionY / magnitud;

  // Obtener todos los hexágonos disponibles en la dirección del empuje
  // Buscamos hasta 10 casillas en esa dirección
  const hexagonosDisponibles: Array<{ x: number; y: number }> = [];

  for (let dist = 1; dist <= 10; dist++) {
    const targetX = Math.round(posicionDefensor.col + dirNormX * dist);
    const targetY = Math.round(posicionDefensor.row + dirNormY * dist);
    const key = `${targetX},${targetY}`;

    // Verificar que el hexágono existe y no está ocupado
    const hexMesh = getMeshAt(targetX, targetY);
    if (hexMesh && !hexagonosOcupados.has(key)) {
      hexagonosDisponibles.push({ x: targetX, y: targetY });
    }
  }

  // Ejecutar lógica de empujar
  const resultado = realizarEmpujar(
    atacante,
    defensor,
    posicionAtacante,
    posicionDefensor,
    hexagonosDisponibles
  );

  // Mostrar resultado en log
  agregarLog("activa", resultado.mensaje);

  // Si el empuje tuvo éxito y hay una nueva posición
  if (resultado.exito && resultado.nuevaPosicionObjetivo) {
    const nuevaPosicion = resultado.nuevaPosicionObjetivo;
    const hexDestino = getMeshAt(nuevaPosicion.x, nuevaPosicion.y);

    if (hexDestino) {
      // Liberar hexágono anterior del defensor
      hexagonosOcupados.delete(
        `${posicionDefensor.col},${posicionDefensor.row}`
      );

      // Ocupar nuevo hexágono
      hexagonosOcupados.add(`${nuevaPosicion.x},${nuevaPosicion.y}`);

      // Mover el mesh del defensor
      meshDefensor.position.set(
        hexDestino.position.x,
        hexDestino.position.y + 1.5,
        hexDestino.position.z
      );

      // Actualizar coordenadas guardadas
      (meshDefensor as any).hexCol = nuevaPosicion.x;
      (meshDefensor as any).hexRow = nuevaPosicion.y;

      // Actualizar en la partida
      if (partidaActual.value) {
        partidaActual.value.equipos.forEach((equipo) => {
          const personajeEnEquipo = equipo.personajes.find(
            (p) => p.instanciaId === defensor.instanciaId
          );
          if (personajeEnEquipo) {
            personajeEnEquipo.posicion = {
              x: nuevaPosicion.x,
              y: nuevaPosicion.y,
              z: 0,
            };
          }
        });

        // Guardar en localStorage
        localStorage.setItem(
          props.partidaId,
          JSON.stringify(partidaActual.value)
        );
      }
    }
  }

  // Consumir acción
  accionesRestantes.value--;
  agregarLog("sistema", `⚡ Acciones restantes: ${accionesRestantes.value}`);

  // Desactivar modo empujar
  desactivarModoEmpujar();

  // Si no quedan acciones, pasar turno automáticamente
  if (accionesRestantes.value <= 0) {
    setTimeout(() => pasarTurno(), 1000);
  }
}

// ============ ACTIVAS NORMALES ============

// Curación: Te curas 12 hp (1 acción) - Mental
function usarCuracion() {
  if (!personajeSeleccionado.value) return;

  // Verificar acciones solo si Procesar no está activo
  if (!procesarActivo.value && accionesRestantes.value < 1) {
    agregarLog("sistema", "⚠️ No tienes suficientes acciones");
    return;
  }

  const personaje = personajeSeleccionado.value;
  const hpMax = personaje.atributos.hp;
  const hpAntes = personaje.vidaActual;

  // Curar 12 hp sin exceder el máximo
  personaje.vidaActual = Math.min(hpMax, personaje.vidaActual + 12);
  const hpCurado = personaje.vidaActual - hpAntes;

  // Actualizar en la partida
  if (partidaActual.value) {
    partidaActual.value.equipos.forEach((equipo) => {
      const personajeEnEquipo = equipo.personajes.find(
        (p) => p.instanciaId === personaje.instanciaId
      );
      if (personajeEnEquipo) {
        personajeEnEquipo.vidaActual = personaje.vidaActual;
      }
    });
    localStorage.setItem(props.partidaId, JSON.stringify(partidaActual.value));
  }

  agregarLog(
    "activa",
    `💚 ${personaje.nombre} usa Curación y recupera ${hpCurado} HP`
  );
  agregarLog(
    "sistema",
    `❤️ ${personaje.nombre}: ${personaje.vidaActual}/${hpMax} HP`
  );

  // Verificar si Procesar está activo (Curación es mental de 1 acción)
  let accionesAConsumir = 1;
  if (procesarActivo.value) {
    accionesAConsumir = 0;
    procesarActivo.value = false; // Consumir Procesar
    agregarLog(
      "sistema",
      `🧠 Procesar consumido - Curación no consume acciones`
    );
  }

  // Consumir acción (0 si Procesar estaba activo)
  accionesRestantes.value -= accionesAConsumir;
  agregarLog("sistema", `⚡ Acciones restantes: ${accionesRestantes.value}`);

  // Si no quedan acciones, pasar turno automáticamente
  if (accionesRestantes.value <= 0) {
    setTimeout(() => pasarTurno(), 1000);
  }
}

// Adrenalina: +1 Cuerpo hasta el principio del próximo turno (1 acción) - Mental
function usarAdrenalina() {
  if (!personajeSeleccionado.value) return;

  // Verificar acciones solo si Procesar no está activo
  if (!procesarActivo.value && accionesRestantes.value < 1) {
    agregarLog("sistema", "⚠️ No tienes suficientes acciones");
    return;
  }

  if (adrenalinaActiva.value) {
    agregarLog("sistema", "⚠️ Ya tienes Adrenalina activa");
    return;
  }

  const personaje = personajeSeleccionado.value;

  // Activar buff
  adrenalinaActiva.value = true;
  personaje.atributos.cuerpo += 1;

  agregarLog(
    "activa",
    `⚡ ${personaje.nombre} usa Adrenalina! +1 Cuerpo hasta el próximo turno`
  );
  agregarLog("sistema", `💪 Cuerpo: ${personaje.atributos.cuerpo}`);

  // Verificar si Procesar está activo (Adrenalina es mental de 1 acción)
  let accionesAConsumir = 1;
  if (procesarActivo.value) {
    accionesAConsumir = 0;
    procesarActivo.value = false; // Consumir Procesar
    agregarLog(
      "sistema",
      `🧠 Procesar consumido - Adrenalina no consume acciones`
    );
  }

  // Consumir acción (0 si Procesar estaba activo)
  accionesRestantes.value -= accionesAConsumir;
  agregarLog("sistema", `⚡ Acciones restantes: ${accionesRestantes.value}`);

  // Si no quedan acciones, pasar turno automáticamente
  if (accionesRestantes.value <= 0) {
    setTimeout(() => pasarTurno(), 1000);
  }
}

// Ataque Pesado: Consume 2 acciones haciendo el doble de daño (2 acciones)
// Se activa el modo ataque normal pero con un multiplicador x2
function usarAtaquePesado() {
  if (!personajeSeleccionado.value) return;

  if (accionesRestantes.value < 2) {
    agregarLog("sistema", "⚠️ Necesitas 2 acciones para Ataque Pesado");
    return;
  }

  // Activar flag de ataque pesado
  ataquePesadoActivo.value = true;

  agregarLog(
    "activa",
    `🔥 ${personajeSeleccionado.value.nombre} prepara un Ataque Pesado! (x2 daño)`
  );
  agregarLog(
    "sistema",
    "⚔️ Selecciona un objetivo para atacar con el doble de daño"
  );

  // Activar modo ataque normal (la lógica de x2 se maneja en realizarAtaque)
  activarModoAtaque();
}

// Apuntar: 2 acciones. Mientras no se mueva, el próximo ataque suma Puntería al daño (2 acciones)
function usarApuntar() {
  if (!personajeSeleccionado.value) return;

  if (accionesRestantes.value < 2) {
    agregarLog("sistema", "⚠️ Necesitas 2 acciones para Apuntar");
    return;
  }

  if (apuntarActivo.value) {
    agregarLog("sistema", "⚠️ Ya estás apuntando");
    return;
  }

  const personaje = personajeSeleccionado.value;
  const punteria = personaje.atributos.punteria || 0;

  // Activar estado de apuntar
  apuntarActivo.value = true;

  agregarLog(
    "activa",
    `🎯 ${personaje.nombre} usa Apuntar! El próximo ataque añade +${punteria} de daño`
  );
  agregarLog("sistema", "⚠️ Se cancela si te mueves");

  // Consumir 2 acciones
  accionesRestantes.value -= 2;
  agregarLog("sistema", `⚡ Acciones restantes: ${accionesRestantes.value}`);

  // Si no quedan acciones, pasar turno automáticamente
  if (accionesRestantes.value <= 0) {
    setTimeout(() => pasarTurno(), 1000);
  }
}

// Procesar: No consume acciones. Permite que la siguiente activa mental de 1 acción sea gratis
function usarProcesar() {
  if (!personajeSeleccionado.value) return;

  if (procesarActivo.value) {
    agregarLog("sistema", "⚠️ Procesar ya está activo");
    return;
  }

  const personaje = personajeSeleccionado.value;

  // Activar estado de procesar
  procesarActivo.value = true;

  agregarLog(
    "activa",
    `🧠 ${personaje.nombre} usa Procesar! La próxima acción mental de 1 acción es gratis`
  );
  agregarLog(
    "sistema",
    "💡 Se aplica solo a acciones mentales que costarían 1 acción"
  );

  // No consume acciones
}

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

function agregarLog(tipo: LogEntry["tipo"], mensaje: string) {
  logs.value.push({
    timestamp: new Date(),
    tipo,
    mensaje,
  });

  // Auto-scroll al final
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
  });
}

function startDraggingLog(event: MouseEvent) {
  if (!logPanel.value) return;

  isDraggingLog.value = true;
  const rect = logPanel.value.getBoundingClientRect();
  dragOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };

  event.preventDefault();
}

function onDragLog(event: MouseEvent) {
  if (!isDraggingLog.value || !logPanel.value) return;

  const container = logPanel.value.parentElement;
  if (!container) return;

  const containerRect = container.getBoundingClientRect();

  // Calcular nueva posición
  let newX = event.clientX - containerRect.left - dragOffset.value.x;
  let newY = event.clientY - containerRect.top - dragOffset.value.y;

  // Limitar a los bordes del contenedor
  const panelRect = logPanel.value.getBoundingClientRect();
  newX = Math.max(0, Math.min(newX, containerRect.width - panelRect.width));
  newY = Math.max(0, Math.min(newY, containerRect.height - panelRect.height));

  logPosition.value = { x: newX, y: newY };
}

function stopDraggingLog() {
  isDraggingLog.value = false;
}

function formatearHora(timestamp: Date): string {
  const date = new Date(timestamp);
  const horas = date.getHours().toString().padStart(2, "0");
  const minutos = date.getMinutes().toString().padStart(2, "0");
  const segundos = date.getSeconds().toString().padStart(2, "0");
  return `${horas}:${minutos}:${segundos}`;
}

function animate() {
  rafId = requestAnimationFrame(animate);
  controls.update();
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

function handleResize() {
  if (!canvasContainer.value || !renderer || !camera) return;

  const width = canvasContainer.value.clientWidth;
  const height = canvasContainer.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

onMounted(() => {
  init();
  window.addEventListener("resize", handleResize);
  window.addEventListener("mousemove", onDragLog);
  window.addEventListener("mouseup", stopDraggingLog);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("mousemove", onDragLog);
  window.removeEventListener("mouseup", stopDraggingLog);

  if (rafId) {
    cancelAnimationFrame(rafId);
  }

  if (renderer) {
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);

    scene.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      }
    });

    renderer.dispose();
    renderer = null;
  }
});
</script>

<style scoped>
/* Evitar scroll en el canvas */
canvas {
  display: block;
  outline: none;
}

/* Animación suave para popup de oportunidad */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.01);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}
</style>
