<template>
  <div
    class="relative w-screen h-screen overflow-hidden"
    :class="darkMode ? 'bg-gray-900' : 'bg-gray-100'"
  >
    <!-- Canvas -->
    <div
      ref="canvasContainer"
      class="absolute inset-0"
      :class="{ 'cursor-crosshair': isAltDown }"
    ></div>

    <!-- Input Oculto para Importar -->
    <input
      type="file"
      ref="fileInput"
      accept=".json"
      class="hidden"
      @change="handleFileImport"
    />

    <!-- MODAL DE CONFIRMACIÓN -->
    <div
      v-if="showClearModal"
      class="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        class="p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4"
        :class="
          darkMode
            ? 'bg-gray-800 border border-gray-700 text-white'
            : 'bg-white text-gray-900'
        "
      >
        <h3 class="text-xl font-bold mb-2">¿Borrar Escena?</h3>
        <p class="mb-6 opacity-80 text-sm">
          Esto eliminará todos los vóxeles. Esta acción no se puede deshacer
          mediante el historial.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showClearModal = false"
            class="px-4 py-2 rounded-lg font-semibold transition-colors"
            :class="
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            "
          >
            Cancelar
          </button>
          <button
            @click="confirmClear"
            class="px-4 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-500 shadow-lg transition-transform active:scale-95"
          >
            Sí, Borrar Todo
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL DE AYUDA -->
    <div
      v-if="showHelpModal"
      class="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      @click.self="showHelpModal = false"
    >
      <div
        class="p-6 rounded-xl shadow-2xl max-w-md w-full mx-4"
        :class="
          darkMode
            ? 'bg-gray-800 border border-gray-700 text-white'
            : 'bg-white text-gray-900'
        "
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Atajos y Controles</h3>
          <button
            @click="showHelpModal = false"
            class="text-2xl leading-none hover:text-red-500"
          >
            &times;
          </button>
        </div>
        <ul class="space-y-2 text-sm opacity-80 font-mono">
          <li class="flex justify-between">
            <span>Pintar</span> <span>Clic Izquierdo</span>
          </li>
          <li class="flex justify-between">
            <span>Borrar</span> <span>Shift + Clic</span>
          </li>
          <li class="flex justify-between">
            <span>Rotar Cámara</span> <span>Clic Derecho / Arrastrar</span>
          </li>
          <li class="flex justify-between">
            <span>Mover Cámara</span> <span>Clic Central / Arrastrar</span>
          </li>
          <li class="flex justify-between text-blue-400 font-bold">
            <span>Cuentagotas</span> <span>Alt + Clic</span>
          </li>
          <li class="flex justify-between">
            <span>Subir/Bajar Nivel</span> <span>RePág / AvPág</span>
          </li>
          <li class="flex justify-between">
            <span>Deshacer</span> <span>Ctrl + Z</span>
          </li>
          <li class="flex justify-between">
            <span>Rehacer</span> <span>Ctrl + Y</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- CONTROLES - ARRIBA IZQUIERDA -->
    <div class="absolute top-4 left-4 flex flex-col gap-2 z-10">
      <!-- Acciones Principales -->
      <div class="flex gap-2">
        <button
          @click="darkMode = !darkMode"
          class="w-10 h-10 flex items-center justify-center rounded-lg font-semibold shadow-lg text-xl"
          :class="
            darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          "
          title="Cambiar Tema"
        >
          {{ darkMode ? "☀️" : "🌙" }}
        </button>

        <button
          @click="toggleCamera"
          class="w-10 h-10 flex items-center justify-center rounded-lg font-semibold shadow-lg text-xl"
          :class="
            darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          "
          title="Cámara (Perspectiva/Ortográfica)"
        >
          {{ isOrthographic ? "🎲" : "👁️" }}
        </button>

        <button
          @click="toggleSymmetry"
          class="w-10 h-10 flex items-center justify-center rounded-lg font-semibold shadow-lg text-xl border-2"
          :class="[
            darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100',
            symmetryMode
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent',
          ]"
          title="Simetría en X"
        >
          🦋
        </button>

        <button
          @click="takeScreenshot"
          class="w-10 h-10 flex items-center justify-center rounded-lg font-semibold shadow-lg text-xl"
          :class="
            darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          "
          title="Captura de Pantalla"
        >
          📷
        </button>

        <button
          @click="showHelpModal = true"
          class="w-10 h-10 flex items-center justify-center rounded-lg font-semibold shadow-lg text-xl"
          :class="
            darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          "
          title="Ayuda"
        >
          ?
        </button>
      </div>

      <!-- Archivo -->
      <div class="flex gap-2">
        <button
          @click="triggerImport"
          class="px-4 py-2 rounded-lg font-semibold shadow-lg text-sm"
          :class="
            darkMode
              ? 'bg-purple-600 text-white hover:bg-purple-500'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          "
        >
          📂 Abrir
        </button>
        <button
          @click="exportVoxels"
          class="px-4 py-2 rounded-lg font-semibold shadow-lg text-sm"
          :class="
            darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          "
        >
          💾 Guardar
        </button>
        <button
          @click="requestClear"
          class="px-4 py-2 rounded-lg font-semibold shadow-lg text-sm"
          :class="
            darkMode
              ? 'bg-red-600 text-white hover:bg-red-500'
              : 'bg-red-500 text-white hover:bg-red-600'
          "
        >
          🗑️ Borrar
        </button>
      </div>

      <!-- Historial -->
      <div class="flex gap-2">
        <button
          @click="undo"
          :disabled="historyIndex < 0"
          class="flex-1 px-4 py-2 rounded-lg font-semibold shadow-lg disabled:opacity-50 text-sm"
          :class="
            darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
          "
        >
          ↩️ Deshacer
        </button>
        <button
          @click="redo"
          :disabled="historyIndex >= historyLength - 1"
          class="flex-1 px-4 py-2 rounded-lg font-semibold shadow-lg disabled:opacity-50 text-sm"
          :class="
            darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
          "
        >
          ↪️ Rehacer
        </button>
      </div>
    </div>

    <!-- ANDAMIO / NIVELES -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-3"
    >
      <div
        class="flex items-center gap-1 px-2 py-2 rounded-xl shadow-2xl border-2 transition-opacity duration-200"
        :class="[
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300',
          screenshotMode ? 'opacity-0' : 'opacity-100',
        ]"
      >
        <button
          @click="adjustLevel(-1)"
          class="w-10 h-10 rounded-lg font-bold text-xl transition-all"
          :class="
            darkMode
              ? 'text-white hover:bg-gray-700'
              : 'text-gray-700 hover:bg-gray-100'
          "
          title="Bajar Nivel"
        >
          ⬇
        </button>
        <div class="px-4 text-center min-w-[100px]">
          <div
            class="text-xs font-bold opacity-50 uppercase tracking-wider"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
          >
            Andamio
          </div>
          <div
            class="text-lg font-bold"
            :class="darkMode ? 'text-white' : 'text-gray-900'"
          >
            Nivel {{ currentLevel }}
          </div>
        </div>
        <button
          @click="adjustLevel(1)"
          class="w-10 h-10 rounded-lg font-bold text-xl transition-all"
          :class="
            darkMode
              ? 'text-white hover:bg-gray-700'
              : 'text-gray-700 hover:bg-gray-100'
          "
          title="Subir Nivel"
        >
          ⬆
        </button>
      </div>
    </div>

    <!-- PANEL DE PROPIEDADES (DERECHA) -->
    <div
      class="absolute top-4 right-4 bottom-4 w-80 rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col transition-opacity duration-200"
      :class="[
        darkMode
          ? 'bg-gray-800 border-2 border-gray-700'
          : 'bg-white border-2 border-gray-300',
        screenshotMode ? 'opacity-0' : 'opacity-100',
      ]"
    >
      <div
        class="px-4 py-3 flex-shrink-0"
        :class="darkMode ? 'bg-gray-700' : 'bg-blue-500'"
      >
        <h3 class="font-bold text-lg text-white">🎨 Editor Vóxel</h3>
        <p class="text-xs text-white opacity-75 mt-1">
          <span v-if="isAltDown" class="text-yellow-300 font-bold animate-pulse"
            >CUENTAGOTAS ACTIVO</span
          >
          <span v-else
            ><strong>Clic</strong>: pintar • <strong>Shift</strong>:
            borrar</span
          >
        </p>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <!-- MATERIAL ACTUAL -->
        <div
          class="rounded-lg border"
          :class="
            darkMode
              ? 'bg-gray-700 border-gray-600'
              : 'bg-gray-50 border-gray-300'
          "
        >
          <button
            @click="
              sectionsOpen.currentMaterial = !sectionsOpen.currentMaterial
            "
            class="w-full px-3 py-2 flex items-center justify-between font-semibold text-sm"
            :class="darkMode ? 'text-white' : 'text-gray-700'"
          >
            <span>Material Actual</span>
            <span>{{ sectionsOpen.currentMaterial ? "▼" : "▶" }}</span>
          </button>
          <div v-if="sectionsOpen.currentMaterial" class="px-3 pb-3 space-y-2">
            <!-- Previsualización 3D -->
            <div class="flex gap-3 mb-3">
              <!-- Icono sin borde -->
              <div class="w-16 h-16 relative">
                <img
                  v-if="currentMaterialPreview"
                  :src="currentMaterialPreview"
                  class="w-full h-full object-contain drop-shadow-xl"
                />
              </div>
              <div class="flex-1 flex flex-col justify-center gap-2">
                <!-- Color Picker + HEX Input Restaurado -->
                <div class="flex items-center gap-2">
                  <label
                    class="text-[10px] font-bold uppercase w-14 opacity-70"
                    :class="darkMode ? 'text-white' : 'text-black'"
                    >Color</label
                  >
                  <input
                    type="color"
                    v-model="currentMaterial.color"
                    class="w-6 h-6 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    v-model="currentMaterial.color"
                    class="w-16 px-1 text-[10px] rounded border font-mono h-6 uppercase"
                    :class="
                      darkMode
                        ? 'bg-gray-800 text-white border-gray-600'
                        : 'bg-white text-black border-gray-300'
                    "
                  />
                </div>
                <!-- Emissive Picker -->
                <div class="flex items-center gap-2">
                  <label
                    class="text-[10px] font-bold uppercase w-14 opacity-70"
                    :class="darkMode ? 'text-white' : 'text-black'"
                    >Luz</label
                  >
                  <input
                    type="color"
                    v-model="currentMaterial.emissive"
                    class="w-6 h-6 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    v-model="currentMaterial.emissive"
                    class="w-16 px-1 text-[10px] rounded border font-mono h-6 uppercase"
                    :class="
                      darkMode
                        ? 'bg-gray-800 text-white border-gray-600'
                        : 'bg-white text-black border-gray-300'
                    "
                  />
                </div>
              </div>
            </div>

            <!-- Sliders -->
            <div class="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <label
                  class="text-[10px] font-bold uppercase opacity-70"
                  :class="darkMode ? 'text-white' : 'text-black'"
                  >Opacidad</label
                >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  v-model.number="currentMaterial.opacity"
                  class="w-full"
                />
              </div>
              <div>
                <label
                  class="text-[10px] font-bold uppercase opacity-70"
                  :class="darkMode ? 'text-white' : 'text-black'"
                  >Emisión</label
                >
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  v-model.number="currentMaterial.emissiveIntensity"
                  class="w-full"
                />
              </div>
              <div>
                <label
                  class="text-[10px] font-bold uppercase opacity-70"
                  :class="darkMode ? 'text-white' : 'text-black'"
                  >Metal</label
                >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  v-model.number="currentMaterial.metalness"
                  class="w-full"
                />
              </div>
              <div>
                <label
                  class="text-[10px] font-bold uppercase opacity-70"
                  :class="darkMode ? 'text-white' : 'text-black'"
                  >Rugosidad</label
                >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  v-model.number="currentMaterial.roughness"
                  class="w-full"
                />
              </div>
            </div>

            <button
              @click="addToBrushPalette"
              class="w-full mt-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded transition-colors"
            >
              + Añadir al Pincel
            </button>
          </div>
        </div>

        <!-- AJUSTES DE PINCEL -->
        <div
          class="rounded-lg border"
          :class="
            darkMode
              ? 'bg-gray-700 border-gray-600'
              : 'bg-gray-50 border-gray-300'
          "
        >
          <button
            @click="sectionsOpen.brush = !sectionsOpen.brush"
            class="w-full px-3 py-2 flex items-center justify-between font-semibold text-sm"
            :class="darkMode ? 'text-white' : 'text-gray-700'"
          >
            <span>Pincel</span>
            <span>{{ sectionsOpen.brush ? "▼" : "▶" }}</span>
          </button>
          <div v-if="sectionsOpen.brush" class="px-3 pb-3 space-y-3">
            <!-- Selector de Forma -->
            <div>
              <label
                class="text-xs font-bold block mb-1"
                :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
                >Forma</label
              >
              <div class="grid grid-cols-2 gap-1">
                <button
                  v-for="(label, s) in {
                    cube: 'Cubo',
                    sphere: 'Esfera',
                    square: 'Cuadrado',
                    circle: 'Círculo',
                  }"
                  :key="s"
                  @click="brush.shape = s"
                  class="px-2 py-1 text-xs rounded capitalize border"
                  :class="
                    brush.shape === s
                      ? 'bg-blue-500 text-white border-blue-600'
                      : darkMode
                        ? 'bg-gray-800 border-gray-600 text-gray-300'
                        : 'bg-white border-gray-300 text-gray-700'
                  "
                >
                  {{ label }}
                </button>
              </div>
            </div>

            <!-- Tamaño -->
            <div>
              <label
                class="text-xs font-bold block mb-1"
                :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
              >
                Radio: {{ brush.size }}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                v-model.number="brush.size"
                class="w-full"
              />
            </div>

            <!-- Orientación (Solo pinceles 2D) -->
            <div v-if="brush.shape === 'square' || brush.shape === 'circle'">
              <label
                class="text-xs font-bold block mb-1"
                :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
                >Eje / Orientación</label
              >
              <div class="flex gap-1">
                <button
                  v-for="axis in ['x', 'y', 'z']"
                  :key="axis"
                  @click="brush.axis = axis"
                  class="flex-1 px-2 py-1 text-xs rounded uppercase border"
                  :class="
                    brush.axis === axis
                      ? 'bg-green-500 text-white border-green-600'
                      : darkMode
                        ? 'bg-gray-800 border-gray-600 text-gray-300'
                        : 'bg-white border-gray-300 text-gray-700'
                  "
                >
                  {{ axis }}
                </button>
              </div>
            </div>

            <!-- Paleta de Mezcla -->
            <div>
              <div class="flex justify-between items-end mb-1">
                <label
                  class="text-xs font-bold"
                  :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
                  >Mezclar Materiales</label
                >
                <button
                  @click="brushPalette = []"
                  v-if="brushPalette.length > 0"
                  class="text-[10px] text-red-400 hover:text-red-300"
                >
                  Limpiar
                </button>
              </div>

              <div
                v-if="brushPalette.length === 0"
                class="text-[10px] italic opacity-60 mb-2"
                :class="darkMode ? 'text-white' : 'text-black'"
              >
                Vacío: Usando solo Material Actual.
              </div>

              <div class="space-y-2 max-h-32 overflow-y-auto pr-1">
                <div
                  v-for="(item, idx) in brushPalette"
                  :key="idx"
                  class="flex items-center gap-2 bg-black bg-opacity-10 p-1 rounded"
                >
                  <!-- Icono Flotante -->
                  <div class="w-6 h-6 relative">
                    <img
                      v-if="item.preview"
                      :src="item.preview"
                      class="w-full h-full object-contain drop-shadow-sm"
                    />
                    <div
                      v-else
                      class="w-full h-full rounded"
                      :style="{ backgroundColor: item.mat.color }"
                    ></div>
                  </div>
                  <!-- Slider Peso -->
                  <div class="flex-1">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      v-model.number="item.weight"
                      class="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div
                    class="text-[10px] font-mono w-6 text-right"
                    :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
                  >
                    {{ item.weight }}
                  </div>
                  <button
                    @click="brushPalette.splice(idx, 1)"
                    class="text-red-500 font-bold px-1"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- HISTORIAL DE MATERIALES -->
        <div
          class="rounded-lg border"
          :class="
            darkMode
              ? 'bg-gray-700 border-gray-600'
              : 'bg-gray-50 border-gray-300'
          "
        >
          <button
            @click="sectionsOpen.palette = !sectionsOpen.palette"
            class="w-full px-3 py-2 flex items-center justify-between font-semibold text-sm"
            :class="darkMode ? 'text-white' : 'text-gray-700'"
          >
            <span>Historial ({{ usedMaterials.length }})</span>
            <span>{{ sectionsOpen.palette ? "▼" : "▶" }}</span>
          </button>
          <div v-if="sectionsOpen.palette" class="px-3 pb-3">
            <div
              v-if="usedMaterials.length === 0"
              class="text-xs text-center py-3 opacity-50"
            >
              Sin materiales aún
            </div>
            <div v-else class="grid grid-cols-5 gap-1">
              <!-- Botón Historial -->
              <button
                v-for="(mat, index) in usedMaterials"
                :key="index"
                @click="loadMaterial(mat)"
                class="w-10 h-10 transition-transform hover:scale-110 relative group"
                :title="`Color: ${mat.color}`"
              >
                <img
                  v-if="mat.preview"
                  :src="mat.preview"
                  class="w-full h-full object-contain drop-shadow-md"
                />
                <div
                  v-else
                  class="w-full h-full rounded"
                  :style="{ backgroundColor: mat.color }"
                ></div>
              </button>
            </div>
          </div>
        </div>

        <!-- CONTADOR -->
        <div
          class="rounded-lg border px-3 py-2 text-center"
          :class="
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-700'
          "
        >
          <div class="text-xs font-semibold">Bloques Totales</div>
          <div class="text-2xl font-bold">{{ voxelCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Asegúrate de que VoxelEngine.ts está en la misma carpeta
import { VoxelEngine } from "./voxelEngine";
import { toRaw } from "vue";

export default {
  name: "VoxelPainter",
  data() {
    return {
      // Estado UI
      darkMode: true,
      showClearModal: false,
      showHelpModal: false,
      screenshotMode: false,

      // Flags de Teclado/Estado
      isAltDown: false,
      isOrthographic: false,
      symmetryMode: false,

      // Sincronización con Motor
      currentLevel: 0,
      voxelCount: 0,
      historyIndex: -1,
      historyLength: 0,

      // Datos
      sectionsOpen: { currentMaterial: true, brush: true, palette: true },
      brush: { shape: "cube", size: 0, axis: "y" },
      brushPalette: [],
      currentMaterial: {
        color: "#feb74c",
        emissive: "#000000",
        metalness: 0,
        roughness: 1.0,
        emissiveIntensity: 0,
        opacity: 1,
        transparent: false,
      },
      currentMaterialPreview: null,
      usedMaterials: [],
    };
  },
  mounted() {
    // Inicializar Motor
    // Usamos $refs para pasar el contenedor del DOM
    this.engine = new VoxelEngine(this.$refs.canvasContainer, {
      onVoxelCountChange: (count) => {
        this.voxelCount = count;
      },
      onHistoryChange: (idx, len) => {
        this.historyIndex = idx;
        this.historyLength = len; // Actualizamos la variable Vue
      },
      onMaterialPick: (mat) => {
        this.loadMaterial(mat);
      },
      onActionRecord: () => {
        this.addToMaterialPalette(this.currentMaterial);
      },
    });

    // Sincronizar estado inicial
    this.updateEngineSettings();
    this.updatePreview();

    // Listeners globales
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  },
  beforeUnmount() {
    if (this.engine) this.engine.dispose(); // Limpieza memoria
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  },
  watch: {
    darkMode(val) {
      if (this.engine) this.engine.setDarkMode(val);
    },
    currentMaterial: {
      handler() {
        this.updateEngineSettings();
        this.updatePreview();
      },
      deep: true,
    },
    brush: {
      handler() {
        this.updateEngineSettings();
      },
      deep: true,
    },
    brushPalette: {
      handler() {
        this.updateEngineSettings();
      },
      deep: true,
    },
  },
  methods: {
    updateEngineSettings() {
      if (this.engine)
        this.engine.updateSettings(
          toRaw(this.currentMaterial),
          toRaw(this.brush),
          toRaw(this.brushPalette)
        );
    },
    updatePreview() {
      if (this.engine)
        this.currentMaterialPreview = this.engine.generateMaterialThumbnail(
          toRaw(this.currentMaterial)
        );
    },
    onKeyDown(e) {
      if (e.key === "Shift") this.engine.setModifiers(true, this.isAltDown);
      if (e.key === "Alt") {
        this.isAltDown = true;
        this.engine.setModifiers(this.engine.isShiftDown, true);
      }

      // Deshacer/Rehacer
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "z" &&
        !e.shiftKey
      ) {
        e.preventDefault();
        this.undo();
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key.toLowerCase() === "y" ||
          (e.shiftKey && e.key.toLowerCase() === "z"))
      ) {
        e.preventDefault();
        this.redo();
      }

      // Andamio
      if (e.key === "PageUp") this.adjustLevel(1);
      if (e.key === "PageDown") this.adjustLevel(-1);
    },
    onKeyUp(e) {
      if (e.key === "Shift") this.engine.setModifiers(false, this.isAltDown);
      if (e.key === "Alt") {
        this.isAltDown = false;
        this.engine.setModifiers(this.engine.isShiftDown, false);
      }
    },

    // Delegación de acciones al motor
    adjustLevel(d) {
      this.engine.adjustLevel(d);
      this.currentLevel = this.engine.currentLevel;
    },
    undo() {
      this.engine.undo();
    },
    redo() {
      this.engine.redo();
    },
    toggleCamera() {
      this.isOrthographic = !this.isOrthographic;
      this.engine.toggleCamera(this.isOrthographic);
    },
    toggleSymmetry() {
      this.symmetryMode = !this.symmetryMode;
      this.engine.toggleSymmetry();
    },
    takeScreenshot() {
      this.screenshotMode = true;
      this.$nextTick(() => {
        requestAnimationFrame(() => {
          this.engine.takeScreenshot((url) => {
            const link = document.createElement("a");
            link.download = `voxel-art-${Date.now()}.png`;
            link.href = url;
            link.click();
            this.screenshotMode = false;
          });
        });
      });
    },
    clearAll() {
      this.requestClear();
    },
    requestClear() {
      this.showClearModal = true;
    },
    confirmClear() {
      this.engine.clearAll();
      this.showClearModal = false;
    },

    // Lógica de Paleta
    addToBrushPalette() {
      const mat = toRaw(this.currentMaterial);
      const thumb = this.engine.generateMaterialThumbnail(mat);
      this.brushPalette.push({ mat, weight: 50, preview: thumb });
    },
    addToMaterialPalette(mat) {
      // Comprobación simple de duplicados
      const raw = toRaw(mat);
      const exists = this.usedMaterials.some(
        (m) =>
          m.color === raw.color &&
          m.emissive === raw.emissive &&
          m.metalness === raw.metalness &&
          m.roughness === raw.roughness &&
          m.opacity === raw.opacity
      );
      if (!exists) {
        const thumb = this.engine.generateMaterialThumbnail(raw);
        this.usedMaterials.push({ ...raw, preview: thumb });
      }
    },
    loadMaterial(mat) {
      this.currentMaterial = { ...mat };
      delete this.currentMaterial.preview; // No queremos la imagen en los datos del material
    },

    // Importar/Exportar
    exportVoxels() {
      this.engine.exportVoxels();
    },
    triggerImport() {
      this.$refs.fileInput.click();
    },
    handleFileImport(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          if (json.voxels && Array.isArray(json.voxels)) {
            this.engine.clearAll();
            json.voxels.forEach((v) => {
              this.engine.addVoxelMesh(v);
              this.addToMaterialPalette(v);
            });
            event.target.value = "";
          }
        } catch (err) {
          console.error("Error al analizar JSON", err);
          alert("Archivo JSON inválido");
        }
      };
      reader.readAsText(file);
    },
  },
};
</script>

<style scoped>
/* Scrollbar personalizado para el modo oscuro */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}
</style>
