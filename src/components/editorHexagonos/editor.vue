<template>
  <div
    class="relative w-screen h-screen overflow-hidden font-sans select-none"
    :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'"
  >
    <!-- Canvas -->
    <div
      ref="canvasContainer"
      class="absolute inset-0"
      :class="{ 'cursor-crosshair': currentTool !== 'picker' }"
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
          title="Importar JSON"
        >
          📂
        </button>
        <button
          @click="exportHexes"
          class="btn-icon bg-blue-600 text-white hover:bg-blue-500 shadow-lg border-none"
          title="Exportar JSON"
        >
          💾
        </button>
        <button
          @click="requestClear"
          class="btn-icon bg-red-600 text-white hover:bg-red-500 shadow-lg border-none"
          title="Borrar todo"
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

        <!-- Modo del muro -->
        <div v-if="currentTool === 'muro'" class="flex flex-col justify-end items-center">
          <div
            class="bg-black/80 text-white text-[9px] px-2 py-0.5 rounded-t-md font-bold tracking-wider"
          >
            TIPO DE MURO
          </div>
          <div
            class="flex items-center gap-1 px-1.5 py-1.5 rounded-xl shadow-2xl border backdrop-blur-md"
            :class="panelClass"
          >
            <button
              @click="setMuroMode('hex')"
              class="px-2.5 h-8 rounded-lg text-xs font-bold transition-colors"
              :class="
                muroMode === 'hex'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-500/20'
              "
            >
              ⬡ Hex
            </button>
            <button
              @click="setMuroMode('recto')"
              class="px-2.5 h-8 rounded-lg text-xs font-bold transition-colors"
              :class="
                muroMode === 'recto'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-500/20'
              "
            >
              ▬ Fino
            </button>
            <button
              @click="setMuroMode('grueso')"
              class="px-2.5 h-8 rounded-lg text-xs font-bold transition-colors"
              :class="
                muroMode === 'grueso'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-500/20'
              "
            >
              ▮ Grueso
            </button>
          </div>
        </div>

        <!-- Altura del muro -->
        <div
          v-if="currentTool === 'muro' && muroMode !== 'hex'"
          class="flex flex-col justify-end items-center"
        >
          <div
            class="bg-black/80 text-white text-[9px] px-2 py-0.5 rounded-t-md font-bold tracking-wider"
          >
            ALTURA (+/−)
          </div>
          <div
            class="flex items-center gap-1 px-2 py-2 rounded-xl shadow-2xl border backdrop-blur-md"
            :class="panelClass"
          >
            <button
              @click="adjustWallHeight(-1)"
              class="w-8 h-8 rounded hover:bg-gray-500/20 font-bold flex items-center justify-center"
            >
              −
            </button>
            <div class="px-2 text-center min-w-[3rem]">
              <div class="text-lg font-bold leading-none">{{ wallHeight }}</div>
            </div>
            <button
              @click="adjustWallHeight(1)"
              class="w-8 h-8 rounded hover:bg-gray-500/20 font-bold flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        <!-- Altura del cubo -->
        <div v-if="currentTool === 'cubo'" class="flex flex-col justify-end items-center">
          <div
            class="bg-black/80 text-white text-[9px] px-2 py-0.5 rounded-t-md font-bold tracking-wider"
          >
            ALTURA (+/−)
          </div>
          <div
            class="flex items-center gap-1 px-2 py-2 rounded-xl shadow-2xl border backdrop-blur-md"
            :class="panelClass"
          >
            <button
              @click="adjustBoxHeight(-1)"
              class="w-8 h-8 rounded hover:bg-gray-500/20 font-bold flex items-center justify-center"
            >
              −
            </button>
            <div class="px-2 text-center min-w-[3rem]">
              <div class="text-lg font-bold leading-none">{{ boxHeight }}</div>
            </div>
            <button
              @click="adjustBoxHeight(1)"
              class="w-8 h-8 rounded hover:bg-gray-500/20 font-bold flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        <!-- Rotación del medio prisma -->
        <div v-if="currentTool === 'media'" class="flex flex-col justify-end items-center">
          <div
            class="bg-black/80 text-white text-[9px] px-2 py-0.5 rounded-t-md font-bold tracking-wider"
          >
            ROTACIÓN (R)
          </div>
          <div
            class="flex items-center gap-1 px-2 py-2 rounded-xl shadow-2xl border backdrop-blur-md"
            :class="panelClass"
          >
            <button
              @click="rotateHalf(-1)"
              class="w-8 h-8 rounded hover:bg-gray-500/20 font-bold flex items-center justify-center"
            >
              ↺
            </button>
            <div class="px-2 text-center min-w-[3rem]">
              <div class="text-lg font-bold leading-none">{{ rot * 60 }}°</div>
            </div>
            <button
              @click="rotateHalf(1)"
              class="w-8 h-8 rounded hover:bg-gray-500/20 font-bold flex items-center justify-center"
            >
              ↻
            </button>
          </div>
        </div>
      </div>

      <!-- Contador -->
      <div
        class="pointer-events-auto px-3 py-2 rounded-xl shadow-2xl border backdrop-blur-md text-xs font-bold"
        :class="panelClass"
      >
        ⬡ {{ cellCount }}
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
            Editor de Hexágonos
          </h3>
        </div>

        <div class="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
          <!-- Tools -->
          <div class="grid grid-cols-3 gap-2">
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
                  >1</span
                >
                Prisma
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >2</span
                >
                Medio prisma
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >3</span
                >
                Área (arrastrar)
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >4</span
                >
                Muro (Hex / Recto)
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >5</span
                >
                Cubo (arrastrar + altura)
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >+ / −</span
                >
                Altura del cubo
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >R</span
                >
                Rotar medio (60°)
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
              <li><b>Click Izq:</b> Colocar</li>
              <li><b>Click Der:</b> Rotar cámara</li>
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
                  >Ctrl</span
                >
                Muro en ángulo recto
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >AvPág / RePág</span
                >
                Nivel
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
import { HexEngine } from "./hexEngine";
import { toRaw } from "vue";

export default {
  name: "HexEditor",
  data() {
    return {
      darkMode: true,
      isPanelOpen: true,
      showClearModal: false,
      showHelpModal: false,
      tools: [
        { id: "prisma", label: "Prisma", icon: "⬢" },
        { id: "media", label: "Medio", icon: "◐" },
        { id: "area", label: "Área", icon: "▦" },
        { id: "muro", label: "Muro", icon: "▬" },
        { id: "cubo", label: "Cubo", icon: "🧊" },
        { id: "picker", label: "Gotero", icon: "🧪" },
      ],
      currentTool: "prisma",
      currentLevel: 0,
      rot: 0,
      boxHeight: 3,
      muroMode: "hex",
      wallHeight: 1,
      cellCount: 0,
      historyIndex: -1,
      historyLength: 0,
      sectionsOpen: { mat: true, pal: true },
      currentMaterial: {
        color: "#feb74c",
        emissive: "#000000",
        metalness: 0,
        roughness: 1.0,
        emissiveIntensity: 0,
      },
      currentMaterialPreview: null,
      usedMaterials: [],
      sliders: {
        emissiveIntensity: {
          label: "Intensidad Luz",
          min: 0,
          max: 10,
          step: 0.1,
        },
        metalness: { label: "Metal", min: 0, max: 1, step: 0.1 },
        roughness: { label: "Rugosidad", min: 0, max: 1, step: 0.1 },
      },
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
  },
  mounted() {
    this.engine = new HexEngine(this.$refs.canvasContainer, {
      onCellCountChange: (c) => (this.cellCount = c),
      onHistoryChange: (i, l) => {
        this.historyIndex = i;
        this.historyLength = l;
      },
      onMaterialPick: (m) => {
        this.loadMaterial(m);
        if (this.currentTool === "picker") this.setTool("prisma");
      },
      onActionRecord: () => this.addToUsedMaterials(this.currentMaterial),
    });
    this.engine.setDarkMode(this.darkMode);
    this.engine.setBoxHeight(this.boxHeight);
    this.engine.setWallHeight(this.wallHeight);
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
    currentTool(v) {
      this.engine?.setTool(v);
    },
  },
  methods: {
    updateEngine() {
      if (!this.engine) return;
      this.engine.updateMaterial(toRaw(this.currentMaterial));
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
    rotateHalf(d) {
      this.rot = (((this.rot + d) % 6) + 6) % 6;
      this.engine.setRot(this.rot);
    },
    adjustBoxHeight(d) {
      this.boxHeight = Math.max(1, this.boxHeight + d);
      this.engine.setBoxHeight(this.boxHeight);
    },
    setMuroMode(mode) {
      this.muroMode = mode;
      this.engine.setMuroMode(mode);
    },
    adjustWallHeight(d) {
      this.wallHeight = Math.max(1, this.wallHeight + d);
      this.engine.setWallHeight(this.wallHeight);
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
    takeScreenshot() {
      this.engine.takeScreenshot((url) => {
        const l = document.createElement("a");
        l.download = "hex-art.png";
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
    addToUsedMaterials(m) {
      const mat = toRaw(m);
      const exists = this.usedMaterials.some(
        (x) =>
          x.color === mat.color &&
          x.emissive === mat.emissive &&
          x.metalness === mat.metalness &&
          x.roughness === mat.roughness &&
          x.emissiveIntensity === mat.emissiveIntensity
      );
      if (!exists) {
        const thumb = this.engine.generateMaterialThumbnail(mat);
        this.usedMaterials.push({ ...mat, preview: thumb });
      }
    },
    loadMaterial(m) {
      this.currentMaterial = {
        color: m.color,
        emissive: m.emissive,
        metalness: m.metalness,
        roughness: m.roughness,
        emissiveIntensity: m.emissiveIntensity,
      };
    },
    onKeyDown(e) {
      if (e.target.tagName === "INPUT") return;
      if (e.key === "Shift" || e.key === "Alt" || e.key === "Control")
        this.engine.setModifiers(e.shiftKey, e.altKey, e.ctrlKey);
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        this.undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        this.redo();
      }
      if (e.key === "1") this.setTool("prisma");
      if (e.key === "2") this.setTool("media");
      if (e.key === "3") this.setTool("area");
      if (e.key === "4") this.setTool("muro");
      if (e.key === "5") this.setTool("cubo");
      if (e.key === "r") this.rotateHalf(1);
      if (this.currentTool === "cubo") {
        if (e.key === "+" || e.key === "=") this.adjustBoxHeight(1);
        if (e.key === "-" || e.key === "_") this.adjustBoxHeight(-1);
      }
      if (this.currentTool === "muro" && this.muroMode !== "hex") {
        if (e.key === "+" || e.key === "=") this.adjustWallHeight(1);
        if (e.key === "-" || e.key === "_") this.adjustWallHeight(-1);
      }
      if (e.key === "PageUp") this.adjustLevel(1);
      if (e.key === "PageDown") this.adjustLevel(-1);
    },
    onKeyUp(e) {
      if (e.key === "Shift" || e.key === "Alt" || e.key === "Control")
        this.engine.setModifiers(e.shiftKey, e.altKey, e.ctrlKey);
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
          if (Array.isArray(json.cells)) {
            this.engine.loadCells(json.cells);
            json.cells.forEach((c) => this.addToUsedMaterials(c));
          }
          this.engine.loadWalls(Array.isArray(json.walls) ? json.walls : []);
          if (Array.isArray(json.walls))
            json.walls.forEach((w) => this.addToUsedMaterials(w));
        } catch (err) {
          alert("Error JSON");
        }
      };
      r.readAsText(f);
      e.target.value = "";
    },
    exportHexes() {
      this.engine.exportHexes();
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
