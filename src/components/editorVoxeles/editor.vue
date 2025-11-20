<template>
  <div class="relative w-screen h-screen overflow-hidden" :class="darkMode ? 'bg-gray-900' : 'bg-gray-100'">
    <!-- Canvas (Full Viewport) -->
    <div ref="canvasContainer" class="absolute inset-0"></div>

    <!-- Overlay Controls - Top Left -->
    <div class="absolute top-4 left-4 flex gap-2 z-10">
      <button
        @click="darkMode = !darkMode"
        class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg"
        :class="darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'"
      >
        {{ darkMode ? '☀️' : '🌙' }}
      </button>
      <button
        @click="exportVoxels"
        class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg"
        :class="darkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-600'"
      >
        💾 Export
      </button>
      <button
        @click="clearAll"
        class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg"
        :class="darkMode ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-500 text-white hover:bg-red-600'"
      >
        🗑️ Clear
      </button>
    </div>

    <!-- Material Properties Panel - Right Overlay -->
    <div 
      class="absolute top-4 right-4 bottom-4 w-80 rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col"
      :class="darkMode ? 'bg-gray-800 border-2 border-gray-700' : 'bg-white border-2 border-gray-300'"
    >
      <!-- Header -->
      <div class="px-4 py-3 flex-shrink-0" :class="darkMode ? 'bg-gray-700' : 'bg-blue-500'">
        <h3 class="font-bold text-lg text-white">🎨 Voxel Painter</h3>
        <p class="text-xs text-white opacity-75 mt-1">
          <strong>Click</strong>: add • <strong>Shift</strong>: remove
        </p>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <!-- Current Material Section -->
        <div 
          class="rounded-lg border"
          :class="darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'"
        >
          <button
            @click="sectionsOpen.currentMaterial = !sectionsOpen.currentMaterial"
            class="w-full px-3 py-2 flex items-center justify-between font-semibold text-sm"
            :class="darkMode ? 'text-white' : 'text-gray-700'"
          >
            <span>Current Material</span>
            <span>{{ sectionsOpen.currentMaterial ? '▼' : '▶' }}</span>
          </button>
          <div v-if="sectionsOpen.currentMaterial" class="px-3 pb-3 space-y-2">
            <!-- Color -->
            <div>
              <label class="text-xs font-semibold block mb-1" :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
                Color
              </label>
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
                  :class="darkMode ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'"
                />
              </div>
            </div>

            <!-- Transparency -->
            <div>
              <label class="text-xs font-semibold block mb-1" :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
                Opacity: {{ currentMaterial.opacity.toFixed(2) }}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                v-model.number="currentMaterial.opacity"
                class="w-full"
              />
            </div>

            <!-- Emissive -->
            <div>
              <label class="text-xs font-semibold block mb-1" :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
                Emissive
              </label>
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
                  :class="darkMode ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'"
                />
              </div>
            </div>

            <!-- Emissive Intensity -->
            <div>
              <label class="text-xs font-semibold block mb-1" :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
                Intensity: {{ currentMaterial.emissiveIntensity.toFixed(2) }}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                v-model.number="currentMaterial.emissiveIntensity"
                class="w-full"
              />
            </div>

            <!-- Metalness -->
            <div>
              <label class="text-xs font-semibold block mb-1" :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
                Metalness: {{ currentMaterial.metalness.toFixed(2) }}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                v-model.number="currentMaterial.metalness"
                class="w-full"
              />
            </div>

            <!-- Roughness -->
            <div>
              <label class="text-xs font-semibold block mb-1" :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
                Roughness: {{ currentMaterial.roughness.toFixed(2) }}
              </label>
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

        <!-- Quick Presets Section -->
        <div 
          class="rounded-lg border"
          :class="darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'"
        >
          <button
            @click="sectionsOpen.presets = !sectionsOpen.presets"
            class="w-full px-3 py-2 flex items-center justify-between font-semibold text-sm"
            :class="darkMode ? 'text-white' : 'text-gray-700'"
          >
            <span>Quick Presets</span>
            <span>{{ sectionsOpen.presets ? '▼' : '▶' }}</span>
          </button>
          <div v-if="sectionsOpen.presets" class="px-3 pb-3">
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="setPreset('default')"
                class="px-2 py-2 bg-orange-400 text-white rounded-lg text-xs font-semibold hover:bg-orange-500 transition-all"
              >
                Default
              </button>
              <button
                @click="setPreset('metal')"
                class="px-2 py-2 bg-gray-400 text-white rounded-lg text-xs font-semibold hover:bg-gray-500 transition-all"
              >
                Metal
              </button>
              <button
                @click="setPreset('glow')"
                class="px-2 py-2 bg-green-400 text-white rounded-lg text-xs font-semibold hover:bg-green-500 transition-all"
              >
                Glow
              </button>
              <button
                @click="setPreset('wood')"
                class="px-2 py-2 bg-amber-700 text-white rounded-lg text-xs font-semibold hover:bg-amber-800 transition-all"
              >
                Wood
              </button>
              <button
                @click="setPreset('glass')"
                class="px-2 py-2 bg-cyan-400 text-white rounded-lg text-xs font-semibold hover:bg-cyan-500 transition-all"
              >
                Glass
              </button>
              <button
                @click="setPreset('plastic')"
                class="px-2 py-2 bg-pink-400 text-white rounded-lg text-xs font-semibold hover:bg-pink-500 transition-all"
              >
                Plastic
              </button>
            </div>
          </div>
        </div>

        <!-- Used Materials Palette Section -->
        <div 
          class="rounded-lg border"
          :class="darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'"
        >
          <button
            @click="sectionsOpen.palette = !sectionsOpen.palette"
            class="w-full px-3 py-2 flex items-center justify-between font-semibold text-sm"
            :class="darkMode ? 'text-white' : 'text-gray-700'"
          >
            <span>Material Palette ({{ usedMaterials.length }})</span>
            <span>{{ sectionsOpen.palette ? '▼' : '▶' }}</span>
          </button>
          <div v-if="sectionsOpen.palette" class="px-3 pb-3">
            <div v-if="usedMaterials.length === 0" class="text-xs text-center py-3" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
              No materials used yet
            </div>
            <div v-else class="grid grid-cols-4 gap-2">
              <button
                v-for="(mat, index) in usedMaterials"
                :key="index"
                @click="loadMaterial(mat)"
                :style="{ backgroundColor: mat.color, opacity: mat.opacity }"
                class="w-12 h-12 rounded-lg border-2 cursor-pointer hover:scale-110 transition-transform"
                :class="darkMode ? 'border-gray-600' : 'border-gray-300'"
                :title="`Color: ${mat.color}, Opacity: ${mat.opacity}, Metalness: ${mat.metalness}`"
              ></button>
            </div>
          </div>
        </div>

        <!-- Voxel Count -->
        <div 
          class="rounded-lg border px-3 py-2 text-center"
          :class="darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-700'"
        >
          <div class="text-xs font-semibold">Total Voxels</div>
          <div class="text-2xl font-bold">{{ voxelData.length }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

export default {
  name: 'VoxelPainter',
  data() {
    return {
      darkMode: true,
      sectionsOpen: {
        currentMaterial: true,
        presets: false,
        palette: true
      },
      currentMaterial: {
        color: '#feb74c',
        emissive: '#000000',
        metalness: 0,
        roughness: 0.5,
        emissiveIntensity: 0,
        opacity: 1,
        transparent: false
      },
      usedMaterials: [],
      voxelData: [], 
    };
  },
  created() {
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.composer = null;
    this.bloomPass = null;
    this.fxaaPass = null;
    this.controls = null;
    this.plane = null;
    this.pointer = null;
    this.raycaster = null;
    this.isShiftDown = false;
    this.rollOverMesh = null;
    this.rollOverMaterial = null;
    this.cubeGeo = null;
    this.objects = []; 
    this.customGrid = null;
  },
  watch: {
    darkMode(newVal) {
      if (this.scene) {
        this.scene.background = new THREE.Color(newVal ? 0x1a1a1a : 0xf0f0f0);
      }
    }
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
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    document.removeEventListener('keyup', this.onDocumentKeyUp);
  },
  methods: {
    init() {
      // Camera
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.set(500, 800, 1300);
      this.camera.lookAt(0, 0, 0);

      // Scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(this.darkMode ? 0x1a1a1a : 0xf0f0f0);

      // Roll-over helper
      const rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
      this.rollOverMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true
      });
      this.rollOverMesh = new THREE.Mesh(rollOverGeo, this.rollOverMaterial);
      this.scene.add(this.rollOverMesh);

      // Cube geometry
      this.cubeGeo = new THREE.BoxGeometry(50, 50, 50);

      // Custom 3D Grid
      this.createCustomGrid();

      // Raycaster
      this.raycaster = new THREE.Raycaster();
      this.pointer = new THREE.Vector2();

      // Plane
      const geometry = new THREE.PlaneGeometry(1000, 1000);
      geometry.rotateX(-Math.PI / 2);
      this.plane = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ visible: false })
      );
      this.scene.add(this.plane);
      this.objects.push(this.plane);

      // Lights
      const ambientLight = new THREE.AmbientLight(0x606060, 3);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(1, 0.75, 0.5).normalize();
      this.scene.add(directionalLight);

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1;
      
      if (this.$refs.canvasContainer.firstChild) {
        this.$refs.canvasContainer.removeChild(this.$refs.canvasContainer.firstChild);
      }
      this.$refs.canvasContainer.appendChild(this.renderer.domElement);

      // Post-processing
      this.composer = new EffectComposer(this.renderer);
      const renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);

      // Bloom
      this.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5, 0.4, 0.85
      );
      this.composer.addPass(this.bloomPass);

      // FXAA
      this.fxaaPass = new ShaderPass(FXAAShader);
      const pixelRatio = this.renderer.getPixelRatio();
      this.fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio);
      this.fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio);
      this.composer.addPass(this.fxaaPass);

      // Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.mouseButtons = {
        LEFT: null,
        MIDDLE: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.ROTATE
      };

      // Listeners
      this.renderer.domElement.addEventListener('pointermove', this.onPointerMove);
      this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown);
      this.renderer.domElement.addEventListener('contextmenu', this.onContextMenu);
      document.addEventListener('keydown', this.onDocumentKeyDown);
      document.addEventListener('keyup', this.onDocumentKeyUp);
      window.addEventListener('resize', this.onWindowResize);
    },
    createCustomGrid() {
      const size = 1000;
      const step = 50;
      const radius = 0.8; // Line thickness
      const color = 0x888888;

      const divisions = size / step;
      const count = (divisions + 1) * 2;

      const geometry = new THREE.CylinderGeometry(radius, radius, size, 8);
      geometry.rotateZ(Math.PI / 2); 
      
      const material = new THREE.MeshBasicMaterial({ 
        color: color,
        toneMapped: false 
      });

      this.customGrid = new THREE.InstancedMesh(geometry, material, count);
      this.customGrid.instanceMatrix.setUsage(THREE.StaticDrawUsage);

      const matrix = new THREE.Matrix4();
      const halfSize = size / 2;
      let index = 0;

      // X-axis lines
      for (let i = 0; i <= divisions; i++) {
        const z = -halfSize + i * step;
        matrix.makeTranslation(0, 0, z);
        this.customGrid.setMatrixAt(index++, matrix);
      }

      // Z-axis lines
      const rotation = new THREE.Quaternion();
      rotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

      for (let i = 0; i <= divisions; i++) {
        const x = -halfSize + i * step;
        const position = new THREE.Vector3(x, 0, 0);
        matrix.compose(position, rotation, new THREE.Vector3(1, 1, 1));
        this.customGrid.setMatrixAt(index++, matrix);
      }

      this.customGrid.position.y = 0;
      this.scene.add(this.customGrid);
    },
    animate() {
      if (!this.renderer) return;
      requestAnimationFrame(this.animate);
      if (this.controls) this.controls.update();
      this.renderScene();
    },
    renderScene() {
      // Simple, single-pass rendering. 
      // The Composer handles Opaque -> Transparent sorting automatically.
      if (this.composer) {
        this.composer.render();
      }
    },
    onWindowResize() {
      if (!this.camera || !this.renderer) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = this.renderer.getPixelRatio();

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      
      this.renderer.setSize(width, height);
      this.composer.setSize(width, height);

      if (this.fxaaPass) {
        this.fxaaPass.material.uniforms['resolution'].value.x = 1 / (width * pixelRatio);
        this.fxaaPass.material.uniforms['resolution'].value.y = 1 / (height * pixelRatio);
      }
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
        this.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
        this.rollOverMesh.position
          .divideScalar(50)
          .floor()
          .multiplyScalar(50)
          .addScalar(25);
      }
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
            const voxelPos = intersect.object.position;
            const voxelIndex = this.voxelData.findIndex(
              v => v.x === voxelPos.x && v.y === voxelPos.y && v.z === voxelPos.z
            );
            if (voxelIndex !== -1) {
              this.voxelData.splice(voxelIndex, 1);
            }

            this.scene.remove(intersect.object);
            const index = this.objects.indexOf(intersect.object);
            if (index > -1) this.objects.splice(index, 1);
            
            intersect.object.geometry.dispose();
            intersect.object.material.dispose();
          }
        } else {
          const transparent = this.currentMaterial.opacity < 1;
          const cubeMaterial = new THREE.MeshStandardMaterial({
            color: this.currentMaterial.color,
            emissive: this.currentMaterial.emissive,
            metalness: this.currentMaterial.metalness,
            roughness: this.currentMaterial.roughness,
            emissiveIntensity: this.currentMaterial.emissiveIntensity,
            opacity: this.currentMaterial.opacity,
            transparent: transparent
          });
          
          const voxel = new THREE.Mesh(this.cubeGeo, cubeMaterial);
          voxel.position.copy(intersect.point).add(intersect.face.normal);
          voxel.position
            .divideScalar(50)
            .floor()
            .multiplyScalar(50)
            .addScalar(25);
            
          this.scene.add(voxel);
          this.objects.push(voxel);

          const voxelInfo = {
            x: voxel.position.x,
            y: voxel.position.y,
            z: voxel.position.z,
            color: this.currentMaterial.color,
            emissive: this.currentMaterial.emissive,
            metalness: this.currentMaterial.metalness,
            roughness: this.currentMaterial.roughness,
            emissiveIntensity: this.currentMaterial.emissiveIntensity,
            opacity: this.currentMaterial.opacity
          };
          this.voxelData.push(voxelInfo);

          this.addToMaterialPalette({
            color: this.currentMaterial.color,
            emissive: this.currentMaterial.emissive,
            metalness: this.currentMaterial.metalness,
            roughness: this.currentMaterial.roughness,
            emissiveIntensity: this.currentMaterial.emissiveIntensity,
            opacity: this.currentMaterial.opacity
          });
        }
      }
    },
    onContextMenu(event) {
      event.preventDefault();
    },
    onDocumentKeyDown(event) {
      if (event.keyCode === 16) this.isShiftDown = true;
    },
    onDocumentKeyUp(event) {
      if (event.keyCode === 16) this.isShiftDown = false;
    },
    setPreset(type) {
      const presets = {
        default: { color: '#feb74c', emissive: '#000000', metalness: 0, roughness: 0.5, emissiveIntensity: 0, opacity: 1 },
        metal: { color: '#c0c0c0', emissive: '#000000', metalness: 1, roughness: 0.2, emissiveIntensity: 0, opacity: 1 },
        glow: { color: '#ffffff', emissive: '#00ff00', metalness: 0, roughness: 0.8, emissiveIntensity: 1.5, opacity: 1 },
        wood: { color: '#8b4513', emissive: '#000000', metalness: 0, roughness: 0.9, emissiveIntensity: 0, opacity: 1 },
        glass: { color: '#88ccff', emissive: '#000000', metalness: 0.1, roughness: 0.1, emissiveIntensity: 0, opacity: 0.3 },
        plastic: { color: '#ff69b4', emissive: '#000000', metalness: 0, roughness: 0.3, emissiveIntensity: 0, opacity: 1 }
      };
      this.currentMaterial = { ...presets[type] };
    },
    addToMaterialPalette(material) {
      const exists = this.usedMaterials.some(
        m => m.color === material.color &&
             m.emissive === material.emissive &&
             m.metalness === material.metalness &&
             m.roughness === material.roughness &&
             m.opacity === material.opacity
      );
      if (!exists) {
        this.usedMaterials.push({ ...material });
      }
    },
    loadMaterial(material) {
      this.currentMaterial = { ...material };
    },
    clearAll() {
      const toRemove = this.objects.filter(
        obj => obj.type === 'Mesh' && obj.material.type !== 'MeshBasicMaterial'
      );
      toRemove.forEach(obj => {
        this.scene.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      this.objects = this.objects.filter(
        obj => obj.type !== 'Mesh' || obj.material.type === 'MeshBasicMaterial'
      );
      this.voxelData = [];
    },
    exportVoxels() {
      const exportData = {
        version: 1,
        voxels: this.voxelData,
        gridSize: 50,
        timestamp: new Date().toISOString()
      };
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `voxel-model-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  }
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