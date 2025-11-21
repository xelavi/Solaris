<template>
  <div
    class="relative w-screen h-screen overflow-hidden font-sans select-none"
    :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'"
  >
    <!-- Canvas -->
    <div
      ref="canvasContainer"
      class="absolute inset-0"
      :class="{ 'cursor-crosshair': currentTool !== 'select' }"
    ></div>

    <input
      type="file"
      ref="fileInput"
      accept=".json"
      class="hidden"
      @change="handleFileImport"
    />

    <!-- TOP BAR -->
    <div
      class="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 pointer-events-none"
    >
      <div
        class="flex gap-2 pointer-events-auto flex-wrap max-w-[calc(100%-4rem)]"
      >
        <button
          @click="darkMode = !darkMode"
          class="btn-icon"
          :class="btnClass"
          title="Tema"
        >
          {{ darkMode ? "☀️" : "🌙" }}
        </button>
        <button
          @click="toggleCamera"
          class="btn-icon"
          :class="btnClass"
          title="Cámara"
        >
          {{ isOrthographic ? "🎲" : "👁️" }}
        </button>
        <button
          @click="takeScreenshot"
          class="btn-icon"
          :class="btnClass"
          title="Captura"
        >
          📷
        </button>
        <button
          @click="showHelpModal = true"
          class="btn-icon"
          :class="btnClass"
          title="Ayuda"
        >
          ?
        </button>

        <div class="w-px h-10 bg-gray-400 opacity-30 mx-1"></div>

        <button
          @click="undo"
          :disabled="historyIndex < 0"
          class="btn-icon"
          :class="btnClass"
        >
          ↩️
        </button>
        <button
          @click="redo"
          :disabled="historyIndex >= historyLength - 1"
          class="btn-icon"
          :class="btnClass"
        >
          ↪️
        </button>

        <div class="w-px h-10 bg-gray-400 opacity-30 mx-1"></div>

        <button
          @click="triggerImport"
          class="btn-icon bg-purple-600 text-white hover:bg-purple-500 shadow-lg border-none"
        >
          📂
        </button>
        <button
          @click="exportVoxels"
          class="btn-icon bg-blue-600 text-white hover:bg-blue-500 shadow-lg border-none"
        >
          💾
        </button>
        <button
          @click="requestClear"
          class="btn-icon bg-red-600 text-white hover:bg-red-500 shadow-lg border-none"
        >
          🗑️
        </button>
      </div>

      <!-- Panel Toggle -->
      <button
        @click="isPanelOpen = !isPanelOpen"
        class="pointer-events-auto btn-icon text-xl z-50 shadow-xl transition-transform duration-300"
        :class="[btnClass, isPanelOpen ? 'rotate-0' : 'rotate-180']"
        title="Alternar Panel"
      >
        →
      </button>
    </div>

    <!-- BOTTOM BAR -->
    <div
      class="absolute bottom-8 left-4 right-4 z-20 pointer-events-none flex justify-between items-end"
    >
      <div
        class="pointer-events-auto flex items-end gap-3 flex-wrap max-w-[70%]"
      >
        <!-- Level -->
        <div
          class="flex items-center gap-1 px-2 py-2 rounded-xl shadow-2xl border backdrop-blur-md transition-colors"
          :class="panelClass"
        >
          <button
            @click="adjustLevel(-1)"
            class="w-8 h-8 rounded hover:bg-gray-500/20 font-bold flex items-center justify-center"
          >
            ⬇
          </button>
          <div class="px-2 text-center min-w-[3rem]">
            <div
              class="text-[9px] uppercase opacity-60 font-bold tracking-wider"
            >
              Nivel
            </div>
            <div class="text-lg font-bold leading-none">{{ currentLevel }}</div>
          </div>
          <button
            @click="adjustLevel(1)"
            class="w-8 h-8 rounded hover:bg-gray-500/20 font-bold flex items-center justify-center"
          >
            ⬆
          </button>
        </div>

        <!-- Grid Snap -->
        <div class="flex flex-col justify-end items-center">
          <div
            class="bg-black/80 text-white text-[9px] px-2 py-0.5 rounded-t-md font-bold tracking-wider"
          >
            GRID
          </div>
          <div
            class="flex items-center px-2 py-2 rounded-xl shadow-2xl border gap-1 backdrop-blur-md"
            :class="panelClass"
          >
            <button
              v-for="n in [1, 2, 4, 8]"
              :key="n"
              @click="gridSnap = n"
              class="w-8 h-8 rounded-lg font-bold text-xs transition-all border-2"
              :class="
                gridSnap === n
                  ? 'bg-blue-500 text-white border-blue-600 scale-110'
                  : 'border-transparent hover:bg-gray-500/20'
              "
            >
              {{ n }}
            </button>
          </div>
        </div>

        <!-- Symmetry -->
        <div class="flex flex-col justify-end items-center">
          <div
            class="bg-black/80 text-white text-[9px] px-2 py-0.5 rounded-t-md font-bold tracking-wider"
          >
            SIMETRÍA
          </div>
          <div
            class="flex items-center px-2 py-2 rounded-xl shadow-2xl border gap-2 backdrop-blur-md"
            :class="panelClass"
          >
            <button
              v-for="axis in ['x', 'z']"
              :key="axis"
              @click="toggleSymmetry(axis)"
              class="w-8 h-8 rounded-lg font-bold text-xs uppercase border-2 transition-all"
              :class="
                symmetries[axis]
                  ? 'bg-purple-500 text-white border-purple-600 scale-110'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:bg-gray-500/20'
              "
            >
              {{ axis }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL -->
    <div
      class="absolute top-16 right-4 bottom-4 w-80 z-30 transition-all duration-300 ease-in-out pointer-events-none flex flex-col"
      :class="
        isPanelOpen
          ? 'translate-x-0 opacity-100'
          : 'translate-x-[110%] opacity-0'
      "
    >
      <div
        class="flex-1 rounded-2xl shadow-2xl border backdrop-blur-xl overflow-hidden flex flex-col pointer-events-auto"
        :class="
          darkMode
            ? 'bg-gray-900/95 border-gray-700'
            : 'bg-white/95 border-gray-200'
        "
      >
        <div
          class="px-4 py-3 border-b flex-shrink-0"
          :class="
            darkMode
              ? 'border-gray-700 bg-gray-800/50'
              : 'border-gray-200 bg-gray-50/50'
          "
        >
          <h3 class="font-bold text-sm uppercase tracking-wider opacity-80">
            Editor Vóxel
          </h3>
        </div>

        <div class="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
          <!-- Tools -->
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="t in tools"
              :key="t.id"
              @click="setTool(t.id)"
              class="aspect-square flex flex-col items-center justify-center rounded-xl border-2 transition-all shadow-sm group"
              :class="[
                currentTool === t.id
                  ? 'bg-blue-500 border-blue-600 text-white scale-105 z-10'
                  : darkMode
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300',
              ]"
              :title="t.label"
            >
              <span
                class="text-2xl group-hover:scale-110 transition-transform"
                >{{ t.icon }}</span
              >
              <span class="text-[9px] font-bold mt-1 uppercase opacity-70">{{
                t.label
              }}</span>
            </button>
          </div>

          <!-- Selection Transform Options -->
          <div
            v-if="currentTool === 'select'"
            class="rounded-xl border overflow-hidden p-3 animate-fadeIn space-y-2"
            :class="
              darkMode
                ? 'border-gray-700 bg-gray-800/50'
                : 'border-gray-200 bg-gray-50/50'
            "
          >
            <div class="text-[10px] font-bold uppercase opacity-60 mb-1">
              Modo Transformación (R)
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="setTransformMode('translate')"
                class="py-1.5 rounded-lg text-xs font-bold uppercase transition-all border"
                :class="
                  transformMode === 'translate'
                    ? 'bg-blue-500 border-blue-600 text-white'
                    : darkMode
                      ? 'border-gray-600 hover:bg-gray-700'
                      : 'border-gray-300 hover:bg-gray-100'
                "
              >
                Mover
              </button>
              <button
                @click="setTransformMode('rotate')"
                class="py-1.5 rounded-lg text-xs font-bold uppercase transition-all border"
                :class="
                  transformMode === 'rotate'
                    ? 'bg-blue-500 border-blue-600 text-white'
                    : darkMode
                      ? 'border-gray-600 hover:bg-gray-700'
                      : 'border-gray-300 hover:bg-gray-100'
                "
              >
                Rotar
              </button>
            </div>
            <button
              @click="confirmSelection"
              class="w-full py-2 mt-2 rounded-lg font-bold text-xs uppercase bg-green-600 text-white hover:bg-green-500 transition-all shadow-lg"
            >
              ✓ Aceptar (Enter)
            </button>
          </div>

          <!-- Material -->
          <div
            class="rounded-xl border overflow-hidden"
            :class="
              darkMode
                ? 'border-gray-700 bg-gray-800/50'
                : 'border-gray-200 bg-gray-50/50'
            "
          >
            <button
              class="w-full p-3 text-xs font-bold uppercase tracking-wider flex justify-between hover:bg-black/5 transition-colors"
              @click="sectionsOpen.mat = !sectionsOpen.mat"
            >
              <span>Material</span
              ><span class="opacity-50">{{
                sectionsOpen.mat ? "−" : "+"
              }}</span>
            </button>

            <div v-if="sectionsOpen.mat" class="p-3 pt-0 animate-fadeIn">
              <div class="flex gap-3 mb-4">
                <div
                  class="w-16 h-16 rounded-lg border-2 shadow-sm relative overflow-hidden bg-gray-500/10 flex-shrink-0"
                  :class="darkMode ? 'border-gray-600' : 'border-gray-300'"
                >
                  <img
                    v-if="currentMaterialPreview"
                    :src="currentMaterialPreview"
                    class="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>

                <div class="flex-1 flex flex-col justify-center gap-2">
                  <div class="flex items-center justify-between">
                    <label
                      class="text-[10px] font-bold opacity-60 uppercase tracking-wide text-right"
                      >Color</label
                    >
                    <div class="flex items-center gap-2">
                      <input
                        type="color"
                        v-model="currentMaterial.color"
                        class="w-5 h-5 rounded-full cursor-pointer border-none p-0 flex-shrink-0 shadow-sm ring-1 ring-black/10"
                      />
                      <input
                        type="text"
                        v-model="currentMaterial.color"
                        class="w-16 text-[10px] bg-black/5 rounded py-0.5 px-1 font-mono text-center uppercase outline-none focus:bg-blue-500/10 focus:text-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <label
                      class="text-[10px] font-bold opacity-60 uppercase tracking-wide text-right"
                      >Emisión</label
                    >
                    <div class="flex items-center gap-2">
                      <input
                        type="color"
                        v-model="currentMaterial.emissive"
                        class="w-5 h-5 rounded-full cursor-pointer border-none p-0 flex-shrink-0 shadow-sm ring-1 ring-black/10"
                      />
                      <input
                        type="text"
                        v-model="currentMaterial.emissive"
                        class="w-16 text-[10px] bg-black/5 rounded py-0.5 px-1 font-mono text-center uppercase outline-none focus:bg-blue-500/10 focus:text-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <div v-for="(conf, key) in sliders" :key="key">
                  <div
                    class="flex justify-between text-[10px] font-bold uppercase opacity-60 mb-1"
                  >
                    <span>{{ conf.label }}</span
                    ><span>{{ currentMaterial[key] }}</span>
                  </div>
                  <input
                    type="range"
                    :min="conf.min"
                    :max="conf.max"
                    :step="conf.step"
                    v-model.number="currentMaterial[key]"
                    class="w-full h-1.5 bg-gray-500/30 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Brush / Mix -->
          <div
            v-if="currentTool === 'brush' || currentTool === 'box'"
            class="rounded-xl border overflow-hidden"
            :class="
              darkMode
                ? 'border-gray-700 bg-gray-800/50'
                : 'border-gray-200 bg-gray-50/50'
            "
          >
            <button
              class="w-full p-3 text-xs font-bold uppercase tracking-wider flex justify-between hover:bg-black/5 transition-colors"
              @click="sectionsOpen.brush = !sectionsOpen.brush"
            >
              <span>Pincel & Mezcla</span
              ><span class="opacity-50">{{
                sectionsOpen.brush ? "−" : "+"
              }}</span>
            </button>

            <div
              v-if="sectionsOpen.brush"
              class="p-3 pt-0 animate-fadeIn space-y-4"
            >
              <div v-if="currentTool === 'brush'">
                <div class="grid grid-cols-4 gap-1 mb-3">
                  <button
                    v-for="(l, s) in shapes"
                    :key="s"
                    @click="brush.shape = s"
                    class="py-1 text-[9px] rounded border uppercase tracking-wide transition-colors"
                    :class="
                      brush.shape === s
                        ? 'bg-blue-500 text-white border-blue-600 font-bold'
                        : darkMode
                          ? 'border-gray-600 hover:bg-gray-700'
                          : 'border-gray-300 hover:bg-gray-100'
                    "
                  >
                    {{ l }}
                  </button>
                </div>
                <div>
                  <div
                    class="flex justify-between text-[10px] font-bold uppercase opacity-60 mb-1"
                  >
                    <span>Radio Pincel</span> <span>{{ brush.size }}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    v-model.number="brush.size"
                    class="w-full h-1.5 bg-gray-500/30 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
                  />
                </div>
              </div>

              <div
                class="border-t pt-3"
                :class="darkMode ? 'border-gray-700' : 'border-gray-200'"
              >
                <div class="flex justify-between items-center mb-2">
                  <label class="text-[10px] font-bold opacity-70"
                    >VARIACIÓN (RANDOM)</label
                  >
                  <button
                    @click="addToBrushPalette"
                    class="text-[9px] px-2 py-1 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-500 active:scale-95 transition-transform"
                  >
                    + Usar Actual
                  </button>
                </div>

                <div
                  v-if="brushPalette.length > 0"
                  class="space-y-1.5 max-h-32 overflow-y-auto pr-1 scrollbar-thin"
                >
                  <div
                    v-for="(item, idx) in brushPalette"
                    :key="idx"
                    class="flex items-center gap-2 bg-black/5 p-1.5 rounded-lg"
                  >
                    <div
                      class="w-6 h-6 rounded shadow-sm border flex-shrink-0"
                      :class="darkMode ? 'border-gray-600' : 'border-gray-300'"
                    >
                      <img
                        v-if="item.preview"
                        :src="item.preview"
                        class="w-full h-full object-contain"
                      />
                      <div
                        v-else
                        class="w-full h-full"
                        :style="{ backgroundColor: item.mat.color }"
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      v-model.number="item.weight"
                      class="flex-1 h-1 accent-green-500 cursor-pointer"
                    />
                    <button
                      @click="brushPalette.splice(idx, 1)"
                      class="text-red-500 font-bold px-1.5 hover:bg-red-500/10 rounded"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div
                  v-else
                  class="text-[10px] opacity-40 text-center italic py-2 border rounded border-dashed"
                  :class="darkMode ? 'border-gray-700' : 'border-gray-300'"
                >
                  Solo material actual
                </div>
                <button
                  v-if="brushPalette.length > 0"
                  @click="brushPalette = []"
                  class="w-full text-[9px] text-red-400 hover:text-red-300 mt-2 font-bold uppercase tracking-wide"
                >
                  Limpiar todo
                </button>
              </div>
            </div>
          </div>

          <!-- History -->
          <div
            class="rounded-xl border overflow-hidden flex-1 flex flex-col min-h-0"
            :class="
              darkMode
                ? 'border-gray-700 bg-gray-800/50'
                : 'border-gray-200 bg-white'
            "
          >
            <div
              class="p-3 font-bold text-sm flex justify-between cursor-pointer"
              @click="sectionsOpen.pal = !sectionsOpen.pal"
            >
              <span>Historial</span
              ><span>{{ sectionsOpen.pal ? "▼" : "▶" }}</span>
            </div>
            <div
              v-if="sectionsOpen.pal"
              class="p-3 pt-0 grid grid-cols-5 gap-1.5 content-start"
            >
              <button
                v-for="(m, i) in usedMaterials"
                :key="i"
                @click="loadMaterial(m)"
                class="aspect-square rounded-lg border hover:scale-110 transition-transform relative group overflow-hidden shadow-sm"
                :class="
                  darkMode
                    ? 'border-gray-600 bg-gray-700'
                    : 'border-gray-300 bg-gray-100'
                "
                :title="m.color"
              >
                <img
                  v-if="m.preview"
                  :src="m.preview"
                  class="w-full h-full object-contain"
                />
                <div
                  v-else
                  class="w-full h-full"
                  :style="{ backgroundColor: m.color }"
                ></div>
              </button>
              <div
                v-if="usedMaterials.length === 0"
                class="col-span-5 text-[10px] text-center opacity-40 py-4 italic"
              >
                Sin materiales usados
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div
      v-if="showClearModal"
      class="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        class="p-6 rounded-2xl shadow-2xl max-w-xs w-full mx-4 bg-white text-gray-900 transform scale-100 transition-all"
      >
        <h3 class="font-bold text-xl mb-2">¿Borrar Todo?</h3>
        <p class="text-sm opacity-70 mb-6">
          Esta acción no se puede deshacer con el historial.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showClearModal = false"
            class="px-4 py-2 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirmClear"
            class="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 shadow-lg shadow-red-600/30 transition-colors"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showHelpModal"
      class="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      @click.self="showHelpModal = false"
    >
      <div
        class="bg-white p-6 rounded-2xl shadow-2xl max-w-md text-gray-900 w-full mx-4"
      >
        <div class="flex justify-between items-center mb-4 border-b pb-2">
          <h3 class="font-bold text-lg">Atajos de Teclado</h3>
          <button
            @click="showHelpModal = false"
            class="text-xl font-bold text-gray-400 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <div class="grid grid-cols-2 gap-6 text-sm mb-6">
          <div>
            <h4
              class="font-bold text-blue-600 mb-2 text-xs uppercase tracking-wider"
            >
              Herramientas
            </h4>
            <ul class="space-y-1.5">
              <li class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >B</span
                >
                Pincel
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >V</span
                >
                Caja
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >M</span
                >
                Selección
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >Esc</span
                >
                Cancelar
              </li>
            </ul>
          </div>
          <div>
            <h4
              class="font-bold text-blue-600 mb-2 text-xs uppercase tracking-wider"
            >
              Ratón
            </h4>
            <ul class="space-y-1.5">
              <li><b>Click Izq:</b> Pintar</li>
              <li><b>Click Der:</b> Rotar</li>
              <li><b>Click Cen:</b> Panear</li>
              <li><b>Rueda:</b> Zoom</li>
            </ul>
          </div>
          <div class="col-span-2">
            <h4
              class="font-bold text-blue-600 mb-2 text-xs uppercase tracking-wider"
            >
              Modificadores
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <div class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >R</span
                >
                Rotar / Mover
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >Shift</span
                >
                Borrar
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >Alt</span
                >
                Gotero
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >Ctrl+Z</span
                >
                Deshacer
              </div>
            </div>
          </div>
        </div>
        <button
          @click="showHelpModal = false"
          class="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { VoxelEngine } from "./voxelEngine";
import { toRaw } from "vue";

export default {
  name: "VoxelEditor",
  data() {
    return {
      darkMode: true,
      isPanelOpen: true, // Default Open
      showClearModal: false,
      showHelpModal: false,
      tools: [
        { id: "brush", label: "Pincel", icon: "🖌️" },
        { id: "box", label: "Caja", icon: "📦" },
        { id: "select", label: "Selección", icon: "✂️" },
        { id: "picker", label: "Gotero", icon: "🧪" },
      ],
      currentTool: "brush",
      transformMode: "translate", // 'translate' | 'rotate'
      currentLevel: 0,
      gridSnap: 1,
      symmetries: { x: false, z: false },
      voxelCount: 0,
      historyIndex: -1,
      historyLength: 0,
      isOrthographic: false,
      sectionsOpen: { mat: true, brush: true, pal: true, mix: true },
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
      sliders: {
        opacity: { label: "Opacidad", min: 0, max: 1, step: 0.1 },
        emissiveIntensity: {
          label: "Intensidad Luz",
          min: 0,
          max: 10,
          step: 0.1,
        },
        metalness: { label: "Metal", min: 0, max: 1, step: 0.1 },
        roughness: { label: "Rugosidad", min: 0, max: 1, step: 0.1 },
      },
      brush: { shape: "cube", size: 0, axis: "y" },
      shapes: {
        cube: "Cubo",
        sphere: "Esfera",
        square: "Plano",
        circle: "Disco",
      },
      brushPalette: [],
    };
  },
  computed: {
    btnClass() {
      return this.darkMode
        ? "bg-gray-800 text-white hover:bg-gray-700 shadow-lg border border-gray-700"
        : "bg-white text-gray-800 hover:bg-gray-50 shadow-lg border border-gray-200";
    },
    panelClass() {
      return this.darkMode
        ? "bg-gray-900/90 border-gray-700 text-white"
        : "bg-white/90 border-gray-200 text-gray-800";
    },
    inputClass() {
      return this.darkMode
        ? "bg-gray-800 border-gray-600 text-white focus:border-blue-500"
        : "bg-gray-50 border-gray-300 text-black focus:border-blue-500";
    },
  },
  mounted() {
    this.engine = new VoxelEngine(this.$refs.canvasContainer, {
      onVoxelCountChange: (c) => (this.voxelCount = c),
      onHistoryChange: (i, l) => {
        this.historyIndex = i;
        this.historyLength = l;
      },
      onMaterialPick: (m) => {
        this.loadMaterial(m);
        if (this.currentTool === "picker") this.setTool("brush");
      },
      onToolChange: (t) => (this.currentTool = t),
      onActionRecord: () => this.addToUsedMaterials(this.currentMaterial),
    });
    this.updateEngine();
    setTimeout(() => this.updatePreview(), 100);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  },
  beforeUnmount() {
    if (this.engine) this.engine.dispose();
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  },
  watch: {
    darkMode(v) {
      this.engine?.setDarkMode(v);
    },
    currentMaterial: {
      handler() {
        this.updateEngine();
        this.updatePreview();
      },
      deep: true,
    },
    brush: {
      handler() {
        this.updateEngine();
      },
      deep: true,
    },
    brushPalette: {
      handler() {
        this.updateEngine();
      },
      deep: true,
    },
    gridSnap(v) {
      this.engine?.setGridSnap(v);
    },
    symmetries: {
      handler(v) {
        this.engine?.setSymmetries(toRaw(v));
      },
      deep: true,
    },
    currentTool(v) {
      this.engine?.setTool(v);
      if (v !== "select") this.transformMode = "translate";
    },
  },
  methods: {
    updateEngine() {
      if (!this.engine) return;
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
    setTool(t) {
      this.currentTool = t;
    },
    setTransformMode(m) {
      this.transformMode = m;
      this.engine.setTransformMode(m);
    },
    confirmSelection() {
      this.engine.confirmSelection();
    },
    toggleSymmetry(axis) {
      this.symmetries[axis] = !this.symmetries[axis];
    },
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
    takeScreenshot() {
      this.engine.takeScreenshot((url) => {
        const l = document.createElement("a");
        l.download = "voxel-art.png";
        l.href = url;
        l.click();
      });
    },
    requestClear() {
      this.showClearModal = true;
    },
    confirmClear() {
      this.engine.clearAll();
      this.showClearModal = false;
    },
    addToBrushPalette() {
      const mat = toRaw(this.currentMaterial);
      const thumb = this.engine.generateMaterialThumbnail(mat);
      this.brushPalette.push({ mat: { ...mat }, weight: 50, preview: thumb });
      this.addToUsedMaterials(mat);
    },
    addToUsedMaterials(m) {
      const mat = toRaw(m);
      const exists = this.usedMaterials.some(
        (x) =>
          x.color === mat.color &&
          x.emissive === mat.emissive &&
          x.metalness === mat.metalness &&
          x.roughness === mat.roughness &&
          x.emissiveIntensity === mat.emissiveIntensity &&
          x.opacity === mat.opacity
      );
      if (!exists) {
        const thumb = this.engine.generateMaterialThumbnail(mat);
        this.usedMaterials.push({ ...mat, preview: thumb });
      }
    },
    loadMaterial(m) {
      this.currentMaterial = { ...this.currentMaterial, ...m };
      delete this.currentMaterial.preview;
    },
    onKeyDown(e) {
      if (e.target.tagName === "INPUT") return;
      if (e.key === "Shift") this.engine.setModifiers(true, e.altKey);
      if (e.key === "Alt") this.engine.setModifiers(e.shiftKey, true);
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        this.undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        this.redo();
      }
      if (e.key === "b") this.setTool("brush");
      if (e.key === "v") this.setTool("box");
      if (e.key === "m") this.setTool("select");
      if (e.key === "PageUp") this.adjustLevel(1);
      if (e.key === "PageDown") this.adjustLevel(-1);

      if (e.key === "r" && this.currentTool === "select") {
        const newMode =
          this.transformMode === "translate" ? "rotate" : "translate";
        this.setTransformMode(newMode);
      }
    },
    onKeyUp(e) {
      if (e.key === "Shift" || e.key === "Alt")
        this.engine.setModifiers(false, false);
    },
    triggerImport() {
      this.$refs.fileInput.click();
    },
    handleFileImport(e) {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target.result);
          if (json.voxels) {
            this.engine.clearAll();
            json.voxels.forEach((v) => {
              this.engine.addVoxelMesh(v);
              this.addToUsedMaterials(v);
            });
          }
        } catch (err) {
          alert("Error JSON");
        }
      };
      r.readAsText(f);
    },
    exportVoxels() {
      this.engine.exportVoxels();
    },
  },
};
</script>

<style scoped>
.btn-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  font-weight: 700;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-icon:active {
  transform: scale(0.9);
}
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.3);
  border-radius: 2px;
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
