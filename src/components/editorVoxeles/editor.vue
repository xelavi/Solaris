<template>
  <div
    class="relative w-screen h-screen overflow-hidden"
    :class="darkMode ? 'bg-gray-900' : 'bg-gray-100'"
  >
    <!-- Canvas (Full Viewport) -->
    <div ref="canvasContainer" class="absolute inset-0"></div>

    <!-- Hidden Input for Import -->
    <input
      type="file"
      ref="fileInput"
      accept=".json"
      class="hidden"
      @change="handleFileImport"
    />

    <!-- CONFIRMATION MODAL -->
    <div
      v-if="showClearModal"
      class="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        class="p-6 rounded-xl shadow-2xl transform transition-all scale-100 max-w-sm w-full mx-4"
        :class="
          darkMode
            ? 'bg-gray-800 border border-gray-700 text-white'
            : 'bg-white text-gray-900'
        "
      >
        <h3 class="text-xl font-bold mb-2">Clear Scene?</h3>
        <p class="mb-6 opacity-80 text-sm">
          This will remove all voxels. This action cannot be undone via history.
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
            Cancel
          </button>
          <button
            @click="confirmClear"
            class="px-4 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-500 shadow-lg transition-transform active:scale-95"
          >
            Yes, Clear All
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay Controls - Top Left -->
    <div class="absolute top-4 left-4 flex flex-col gap-2 z-10">
      <div class="flex gap-2">
        <button
          @click="darkMode = !darkMode"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg"
          :class="
            darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          "
        >
          {{ darkMode ? "☀️" : "🌙" }}
        </button>
        <button
          @click="triggerImport"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg"
          :class="
            darkMode
              ? 'bg-purple-600 text-white hover:bg-purple-500'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          "
        >
          📂 Load
        </button>
        <button
          @click="exportVoxels"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg"
          :class="
            darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          "
        >
          💾 Save
        </button>
        <button
          @click="requestClear"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg"
          :class="
            darkMode
              ? 'bg-red-600 text-white hover:bg-red-500'
              : 'bg-red-500 text-white hover:bg-red-600'
          "
        >
          🗑️ Clear
        </button>
      </div>
      <div class="flex gap-2">
        <button
          @click="undo"
          :disabled="historyIndex < 0"
          class="flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg disabled:opacity-50"
          :class="
            darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          "
        >
          ↩️ Undo
        </button>
        <button
          @click="redo"
          :disabled="historyIndex >= history.length - 1"
          class="flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg disabled:opacity-50"
          :class="
            darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          "
        >
          ↪️ Redo
        </button>
      </div>
    </div>

    <!-- Material Properties Panel - Right Overlay -->
    <div
      class="absolute top-4 right-4 bottom-4 w-80 rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col"
      :class="
        darkMode
          ? 'bg-gray-800 border-2 border-gray-700'
          : 'bg-white border-2 border-gray-300'
      "
    >
      <div
        class="px-4 py-3 flex-shrink-0"
        :class="darkMode ? 'bg-gray-700' : 'bg-blue-500'"
      >
        <h3 class="font-bold text-lg text-white">🎨 Voxel Painter</h3>
        <p class="text-xs text-white opacity-75 mt-1">
          <strong>Click</strong>: add • <strong>Shift</strong>: remove
        </p>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-3">
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
            <span>Current Material</span>
            <span>{{ sectionsOpen.currentMaterial ? "▼" : "▶" }}</span>
          </button>
          <div v-if="sectionsOpen.currentMaterial" class="px-3 pb-3 space-y-2">
            <div>
              <label
                class="text-xs font-semibold block mb-1"
                :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
                >Color</label
              >
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="currentMaterial.color"
                  class="w-10 h-10 rounded border-2 cursor-pointer"
                  :class="darkMode ? 'border-gray-600' : 'border-gray-300'"
                />
                <input
                  type="text"
                  v-model="currentMaterial.color"
                  class="flex-1 px-2 py-1 text-xs rounded border focus:outline-none font-mono"
                  :class="
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  "
                />
              </div>
            </div>
            <div>
              <label
                class="text-xs font-semibold block mb-1"
                :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
                >Opacity: {{ currentMaterial.opacity.toFixed(2) }}</label
              >
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                v-model.number="currentMaterial.opacity"
                class="w-full"
              />
            </div>
            <div>
              <label
                class="text-xs font-semibold block mb-1"
                :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
                >Emissive</label
              >
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="currentMaterial.emissive"
                  class="w-10 h-10 rounded border-2 cursor-pointer"
                  :class="darkMode ? 'border-gray-600' : 'border-gray-300'"
                />
                <input
                  type="text"
                  v-model="currentMaterial.emissive"
                  class="flex-1 px-2 py-1 text-xs rounded border focus:outline-none font-mono"
                  :class="
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  "
                />
              </div>
            </div>
            <div>
              <label
                class="text-xs font-semibold block mb-1"
                :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
                >Intensity:
                {{ currentMaterial.emissiveIntensity.toFixed(2) }}</label
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
                class="text-xs font-semibold block mb-1"
                :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
                >Metalness: {{ currentMaterial.metalness.toFixed(2) }}</label
              >
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                v-model.number="currentMaterial.metalness"
                class="w-full"
              />
            </div>
            <div>
              <label
                class="text-xs font-semibold block mb-1"
                :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
                >Roughness: {{ currentMaterial.roughness.toFixed(2) }}</label
              >
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                v-model.number="currentMaterial.roughness"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div
          class="rounded-lg border"
          :class="
            darkMode
              ? 'bg-gray-700 border-gray-600'
              : 'bg-gray-50 border-gray-300'
          "
        >
          <button
            @click="sectionsOpen.presets = !sectionsOpen.presets"
            class="w-full px-3 py-2 flex items-center justify-between font-semibold text-sm"
            :class="darkMode ? 'text-white' : 'text-gray-700'"
          >
            <span>Quick Presets</span>
            <span>{{ sectionsOpen.presets ? "▼" : "▶" }}</span>
          </button>
          <div v-if="sectionsOpen.presets" class="px-3 pb-3">
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="setPreset('default')"
                class="px-2 py-2 bg-orange-400 text-white rounded-lg text-xs font-semibold hover:bg-orange-500"
              >
                Default
              </button>
              <button
                @click="setPreset('metal')"
                class="px-2 py-2 bg-gray-400 text-white rounded-lg text-xs font-semibold hover:bg-gray-500"
              >
                Metal
              </button>
              <button
                @click="setPreset('glow')"
                class="px-2 py-2 bg-green-400 text-white rounded-lg text-xs font-semibold hover:bg-green-500"
              >
                Glow
              </button>
              <button
                @click="setPreset('wood')"
                class="px-2 py-2 bg-amber-700 text-white rounded-lg text-xs font-semibold hover:bg-amber-800"
              >
                Wood
              </button>
              <button
                @click="setPreset('glass')"
                class="px-2 py-2 bg-cyan-400 text-white rounded-lg text-xs font-semibold hover:bg-cyan-500"
              >
                Glass
              </button>
              <button
                @click="setPreset('plastic')"
                class="px-2 py-2 bg-pink-400 text-white rounded-lg text-xs font-semibold hover:bg-pink-500"
              >
                Plastic
              </button>
            </div>
          </div>
        </div>

        <div
          class="rounded-lg border px-3 py-2 text-center"
          :class="
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-700'
          "
        >
          <div class="text-xs font-semibold">Total Voxels</div>
          <div class="text-2xl font-bold">{{ voxelData.length }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { PMREMGenerator } from "three";
import { toRaw } from "vue";

// CUSTOM SHADER FOR INFINITE GRID
const GridShader = {
  vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vWorldPosition;
    uniform vec3 uColor;
    uniform float uSize;
    uniform vec3 uCursorPos;

    float getGrid(float size) {
        vec2 r = vWorldPosition.xz / size;
        vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
        float line = min(grid.x, grid.y);
        return 1.0 - min(line, 1.0);
    }

    void main() {
        float grid = getGrid(uSize);
        
        float distOrigin = distance(vWorldPosition.xz, vec2(0.0));
        float alphaOrigin = 1.0 - smoothstep(400.0, 1000.0, distOrigin);

        float distCursor = distance(vWorldPosition.xz, uCursorPos.xz);
        float alphaCursor = 1.0 - smoothstep(200.0, 400.0, distCursor);

        float combinedAlpha = max(alphaOrigin * 0.5, alphaCursor); 
        combinedAlpha *= grid;

        if (combinedAlpha <= 0.0) discard;

        gl_FragColor = vec4(uColor, combinedAlpha);
    }
  `,
};

export default {
  name: "VoxelPainter",
  data() {
    return {
      darkMode: true,
      showClearModal: false, // New Modal State
      sectionsOpen: { currentMaterial: true, presets: false, palette: true },
      currentMaterial: {
        color: "#feb74c",
        emissive: "#000000",
        metalness: 0,
        roughness: 1.0,
        emissiveIntensity: 0,
        opacity: 1,
        transparent: false,
      },
      usedMaterials: [],
      voxelData: [],
      historyIndex: -1,
    };
  },
  created() {
    this.history = [];
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.composer = null;
    this.controls = null;
    this.plane = null;
    this.infiniteGrid = null;
    this.pointer = null;
    this.raycaster = null;
    this.rollOverMesh = null;
    this.rollOverMaterial = null;
    this.sharedGeometry = null;
    this.objects = [];
    this.isShiftDown = false;
    this.voxelSize = 25;
  },
  watch: {
    darkMode(newVal) {
      if (this.scene) {
        this.scene.background = new THREE.Color(newVal ? 0x1a1a1a : 0xf0f0f0);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.animate();
    });
  },
  beforeUnmount() {
    if (this.controls) this.controls.dispose();
    if (this.renderer && this.$refs.canvasContainer) {
      this.$refs.canvasContainer.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
    if (this.sharedGeometry) this.sharedGeometry.dispose();
    window.removeEventListener("resize", this.onWindowResize);
    document.removeEventListener("keydown", this.onDocumentKeyDown);
    document.removeEventListener("keyup", this.onDocumentKeyUp);
  },
  methods: {
    init() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.set(500, 800, 1300);
      this.camera.lookAt(0, 0, 0);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(
        this.darkMode ? 0x1a1a1a : 0xf0f0f0
      );
      // Low intensity env to keep non-emissive blocks below threshold
      this.scene.environmentIntensity = 0.3;

      this.sharedGeometry = new THREE.BoxGeometry(
        this.voxelSize,
        this.voxelSize,
        this.voxelSize
      );

      this.rollOverMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true,
      });
      this.rollOverMesh = new THREE.Mesh(
        this.sharedGeometry,
        this.rollOverMaterial
      );
      this.scene.add(this.rollOverMesh);

      this.createInfiniteGrid();

      this.raycaster = new THREE.Raycaster();
      this.pointer = new THREE.Vector2();

      const geometry = new THREE.PlaneGeometry(50000, 50000);
      geometry.rotateX(-Math.PI / 2);
      this.plane = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ visible: false })
      );
      this.plane.receiveShadow = true;
      this.scene.add(this.plane);
      this.objects.push(this.plane);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.toneMapping = THREE.NoToneMapping;
      this.renderer.toneMappingExposure = 0.8;

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      if (this.$refs.canvasContainer.firstChild) {
        this.$refs.canvasContainer.removeChild(
          this.$refs.canvasContainer.firstChild
        );
      }
      this.$refs.canvasContainer.appendChild(this.renderer.domElement);

      const pmremGenerator = new PMREMGenerator(this.renderer);
      this.scene.environment = pmremGenerator.fromScene(
        new RoomEnvironment(),
        0.04
      ).texture;

      // Directional Light: 0.5 (Moderate Sun)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(200, 400, 100);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      const d = 1000;
      directionalLight.shadow.camera.left = -d;
      directionalLight.shadow.camera.right = d;
      directionalLight.shadow.camera.top = d;
      directionalLight.shadow.camera.bottom = -d;
      directionalLight.shadow.bias = -0.0005;
      this.scene.add(directionalLight);

      const renderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        {
          type: THREE.HalfFloatType,
          format: THREE.RGBAFormat,
          encoding: THREE.sRGBEncoding,
        }
      );

      this.composer = new EffectComposer(this.renderer, renderTarget);
      this.composer.addPass(new RenderPass(this.scene, this.camera));

      this.composer.addPass(
        new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.2,
          0.75,
          0.4
        )
      );

      this.composer.addPass(new OutputPass());

      const fxaaPass = new ShaderPass(FXAAShader);
      const pixelRatio = this.renderer.getPixelRatio();
      fxaaPass.material.uniforms["resolution"].value.x =
        1 / (window.innerWidth * pixelRatio);
      fxaaPass.material.uniforms["resolution"].value.y =
        1 / (window.innerHeight * pixelRatio);
      this.composer.addPass(fxaaPass);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.mouseButtons = {
        LEFT: null,
        MIDDLE: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.ROTATE,
      };

      this.renderer.domElement.addEventListener(
        "pointermove",
        this.onPointerMove
      );
      this.renderer.domElement.addEventListener(
        "pointerdown",
        this.onPointerDown
      );
      this.renderer.domElement.addEventListener("contextmenu", (e) =>
        e.preventDefault()
      );
      document.addEventListener("keydown", this.onDocumentKeyDown);
      document.addEventListener("keyup", this.onDocumentKeyUp);
      window.addEventListener("resize", this.onWindowResize);
    },
    createInfiniteGrid() {
      const geometry = new THREE.PlaneGeometry(50000, 50000);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uSize: { value: 25.0 },
          uColor: { value: new THREE.Color(0x888888) },
          uCursorPos: { value: new THREE.Vector3(0, 0, 0) },
        },
        vertexShader: GridShader.vertexShader,
        fragmentShader: GridShader.fragmentShader,
        transparent: true,
        depthWrite: false,
        extensions: { derivatives: true },
      });

      this.infiniteGrid = new THREE.Mesh(geometry, material);
      this.infiniteGrid.rotation.x = -Math.PI / 2;
      this.infiniteGrid.position.y = 0.1;
      this.scene.add(this.infiniteGrid);
    },
    animate() {
      if (!this.renderer) return;
      requestAnimationFrame(this.animate);
      if (this.controls) this.controls.update();

      if (this.infiniteGrid && this.rollOverMesh) {
        this.infiniteGrid.material.uniforms.uCursorPos.value.copy(
          this.rollOverMesh.position
        );
      }

      if (this.composer) this.composer.render();
    },
    recordAction(action) {
      if (this.historyIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.historyIndex + 1);
      }
      this.history.push(action);
      this.historyIndex++;
      if (this.history.length > 500) {
        this.history.shift();
        this.historyIndex--;
      }
    },
    undo() {
      if (this.historyIndex < 0) return;
      const action = this.history[this.historyIndex];
      if (action.type === "add") {
        this.removeVoxel(action.mesh, action.data, false);
      } else if (action.type === "remove") {
        this.addVoxel(action.data, false);
        action.mesh = this.objects[this.objects.length - 1];
      }
      this.historyIndex--;
    },
    redo() {
      if (this.historyIndex >= this.history.length - 1) return;
      this.historyIndex++;
      const action = this.history[this.historyIndex];
      if (action.type === "add") {
        this.addVoxel(action.data, false);
        action.mesh = this.objects[this.objects.length - 1];
      } else if (action.type === "remove") {
        this.removeVoxel(action.mesh, action.data, false);
      }
    },
    addVoxel(data, record = true) {
      const transparent = data.opacity < 1;
      const cubeMaterial = new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.emissive,
        metalness: data.metalness,
        roughness: data.roughness,
        emissiveIntensity: data.emissiveIntensity,
        opacity: data.opacity,
        transparent: transparent,
      });
      const voxel = new THREE.Mesh(this.sharedGeometry, cubeMaterial);
      voxel.position.set(data.x, data.y, data.z);
      voxel.castShadow = true;
      voxel.receiveShadow = true;
      this.scene.add(voxel);
      this.objects.push(voxel);
      this.voxelData.push(data);
      if (record) this.recordAction({ type: "add", data: data, mesh: voxel });
    },
    removeVoxel(mesh, data, record = true) {
      if (!mesh) {
        mesh = this.objects.find(
          (obj) =>
            obj.position.x === data.x &&
            obj.position.y === data.y &&
            obj.position.z === data.z &&
            obj !== this.plane
        );
        if (!mesh) return;
      }
      this.scene.remove(mesh);
      const objIndex = this.objects.indexOf(mesh);
      if (objIndex > -1) this.objects.splice(objIndex, 1);
      const dataIndex = this.voxelData.findIndex(
        (v) => v.x === data.x && v.y === data.y && v.z === data.z
      );
      if (dataIndex !== -1) this.voxelData.splice(dataIndex, 1);
      if (mesh.material) mesh.material.dispose();
      if (record) this.recordAction({ type: "remove", data: data, mesh: mesh });
    },
    onPointerDown(event) {
      if (event.button !== 0) return;
      this.pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.objects, false);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        if (this.isShiftDown) {
          if (intersect.object !== this.plane) {
            const pos = intersect.object.position;
            const data = { x: pos.x, y: pos.y, z: pos.z };
            this.removeVoxel(intersect.object, data, true);
          }
        } else {
          const pos = new THREE.Vector3()
            .copy(intersect.point)
            .add(intersect.face.normal);
          pos
            .divideScalar(this.voxelSize)
            .floor()
            .multiplyScalar(this.voxelSize)
            .addScalar(this.voxelSize / 2);
          const existing = this.voxelData.find(
            (v) => v.x === pos.x && v.y === pos.y && v.z === pos.z
          );
          if (existing) return;
          const data = {
            x: pos.x,
            y: pos.y,
            z: pos.z,
            ...toRaw(this.currentMaterial),
          };
          this.addVoxel(data, true);
          this.addToMaterialPalette(this.currentMaterial);
        }
      }
    },
    onDocumentKeyDown(event) {
      if (event.keyCode === 16) this.isShiftDown = true;
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "z" &&
        !event.shiftKey
      ) {
        event.preventDefault();
        this.undo();
      }
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key.toLowerCase() === "y" ||
          (event.shiftKey && event.key.toLowerCase() === "z"))
      ) {
        event.preventDefault();
        this.redo();
      }
    },
    onDocumentKeyUp(event) {
      if (event.keyCode === 16) this.isShiftDown = false;
    },
    onWindowResize() {
      if (!this.camera || !this.renderer) return;
      const w = window.innerWidth,
        h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.composer.setSize(w, h);
    },
    onPointerMove(event) {
      if (!this.pointer || !this.raycaster) return;
      this.pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.objects, false);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        this.rollOverMesh.position
          .copy(intersect.point)
          .add(intersect.face.normal);
        this.rollOverMesh.position
          .divideScalar(this.voxelSize)
          .floor()
          .multiplyScalar(this.voxelSize)
          .addScalar(this.voxelSize / 2);
      }
    },
    exportVoxels() {
      const exportData = {
        version: 1,
        voxels: this.voxelData,
        gridSize: this.voxelSize,
        timestamp: new Date().toISOString(),
      };
      const dataStr = JSON.stringify(exportData, null, 2);
      const url = URL.createObjectURL(
        new Blob([dataStr], { type: "application/json" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = `voxel-model-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
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
            this.clearAllScene(); // Internal clear
            json.voxels.forEach((v) => {
              this.addVoxel(v, false);
              this.addToMaterialPalette(v);
            });
            event.target.value = "";
          }
        } catch (err) {
          console.error(err);
          alert("Invalid JSON");
        }
      };
      reader.readAsText(file);
    },
    requestClear() {
      this.showClearModal = true;
    },
    confirmClear() {
      this.clearAllScene();
      this.showClearModal = false;
    },
    clearAllScene() {
      const toRemove = this.objects.filter((obj) => obj !== this.plane);
      toRemove.forEach((obj) => {
        this.scene.remove(obj);
        if (obj.material) obj.material.dispose();
      });
      this.objects = [this.plane];
      this.voxelData = [];
      this.history = [];
      this.historyIndex = -1;
      this.usedMaterials = [];
    },
    clearAll() {
      this.requestClear(); // Redirect old calls
    },
    setPreset(type) {
      const presets = {
        default: {
          color: "#feb74c",
          emissive: "#000000",
          metalness: 0,
          roughness: 1.0,
          emissiveIntensity: 0,
          opacity: 1,
        },
        metal: {
          color: "#c0c0c0",
          emissive: "#000000",
          metalness: 1,
          roughness: 0.2,
          emissiveIntensity: 0,
          opacity: 1,
        },
        glow: {
          color: "#ffffff",
          emissive: "#00ff00",
          metalness: 0,
          roughness: 0.8,
          emissiveIntensity: 5.0,
          opacity: 1,
        },
        wood: {
          color: "#8b4513",
          emissive: "#000000",
          metalness: 0,
          roughness: 0.9,
          emissiveIntensity: 0,
          opacity: 1,
        },
        glass: {
          color: "#88ccff",
          emissive: "#000000",
          metalness: 0.1,
          roughness: 0.1,
          emissiveIntensity: 0,
          opacity: 0.3,
        },
        plastic: {
          color: "#ff69b4",
          emissive: "#000000",
          metalness: 0,
          roughness: 0.3,
          emissiveIntensity: 0,
          opacity: 1,
        },
      };
      this.currentMaterial = { ...presets[type] };
    },
    addToMaterialPalette(material) {
      const exists = this.usedMaterials.some(
        (m) =>
          m.color === material.color &&
          m.emissive === material.emissive &&
          m.metalness === material.metalness &&
          m.roughness === material.roughness &&
          m.opacity === material.opacity
      );
      if (!exists) this.usedMaterials.push({ ...material });
    },
    loadMaterial(material) {
      this.currentMaterial = { ...material };
    },
  },
};
</script>

<style scoped>
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
