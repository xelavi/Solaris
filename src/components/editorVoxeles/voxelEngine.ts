import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PMREMGenerator } from 'three';
import { baseGridShader, cursorGridShader } from './gridShaders';
import type { VoxelData, VoxelMaterial, BrushSettings, PaletteItem, EngineCallbacks, HistoryAction } from './types';

export class VoxelEngine {
  private container: HTMLElement;
  private callbacks: EngineCallbacks;

  // Config
  public voxelSize: number = 12.5;
  public currentLevel: number = 0;
  public isShiftDown: boolean = false;
  public isAltDown: boolean = false;
  private symmetryMode: boolean = false;

  // Core Three.js
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  private perspectiveCamera!: THREE.PerspectiveCamera;
  private orthoCamera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private renderPass!: RenderPass;
  private fxaaPass!: ShaderPass;
  private controls!: OrbitControls;
  private raycaster!: THREE.Raycaster;
  private pointer!: THREE.Vector2;

  // World Objects
  private plane!: THREE.Mesh;
  private infiniteGrid!: THREE.Mesh;
  private cursorGrid!: THREE.Mesh;
  private sharedGeometry!: THREE.BoxGeometry;
  
  // Brushes
  private brushPreviewMesh!: THREE.InstancedMesh;
  private dummy!: THREE.Object3D;

  // State
  private voxelMap: Map<string, { mesh: THREE.Mesh; data: VoxelData }>;
  private objects: THREE.Object3D[] = [];
  private history: HistoryAction[] = [];
  private historyIndex: number = -1;

  // Settings
  private brush: BrushSettings = { shape: 'cube', size: 0, axis: 'y' };
  private brushPalette: PaletteItem[] = [];
  private currentMaterial: VoxelMaterial = { 
    color: '#ffffff', emissive: '#000000', metalness: 0, 
    roughness: 1, emissiveIntensity: 0, opacity: 1, transparent: false 
  };

  // Thumbnails
  private thumbScene?: THREE.Scene;
  private thumbCamera?: THREE.PerspectiveCamera;
  private thumbRenderer?: THREE.WebGLRenderer;
  private thumbMesh?: THREE.Mesh;

  // Layering / Compositing
  private renderTargets: Map<number, THREE.WebGLRenderTarget> = new Map();
  private compositeScene?: THREE.Scene;
  private compositeCamera?: THREE.OrthographicCamera;
  private compositeMaterial?: THREE.MeshBasicMaterial;

  constructor(container: HTMLElement, callbacks: EngineCallbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.voxelMap = new Map();
    
    this.init();
    this.initThumbnailGenerator();
    this.animate();
  }

  private init() {
    // Cameras
    const aspect = window.innerWidth / window.innerHeight;
    this.perspectiveCamera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
    this.perspectiveCamera.position.set(250, 400, 650);

    const frustumSize = 1000;
    this.orthoCamera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2, frustumSize * aspect / 2, 
      frustumSize / 2, frustumSize / -2, 
      1, 10000
    );
    this.orthoCamera.position.set(250, 400, 650);
    this.orthoCamera.zoom = 2;
    this.orthoCamera.updateProjectionMatrix();

    this.camera = this.perspectiveCamera;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.environmentIntensity = 0.3;

    // Geometry
    this.sharedGeometry = new THREE.BoxGeometry(this.voxelSize, this.voxelSize, this.voxelSize);

    // Brush Preview
    const previewMat = new THREE.MeshBasicMaterial({ color: 0x44aaff, opacity: 0.3, transparent: true, depthTest: false });
    this.brushPreviewMesh = new THREE.InstancedMesh(this.sharedGeometry, previewMat, 4000);
    this.brushPreviewMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.scene.add(this.brushPreviewMesh);
    this.dummy = new THREE.Object3D();

    // Raycaster
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.createWorldObjects();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.toneMappingExposure = 0.8;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Environment
    const pmremGenerator = new PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    // Lights
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

    // Post Processing
    const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
    });

    this.composer = new EffectComposer(this.renderer, renderTarget);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    
    // Bloom settings
    this.composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.2, 0.75, 0.4));
    
    this.composer.addPass(new OutputPass());
    
    this.fxaaPass = new ShaderPass(FXAAShader);
    this.updateFXAA();
    this.composer.addPass(this.fxaaPass);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; 
    this.controls.dampingFactor = 0.05;
    this.controls.mouseButtons = { LEFT: null, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };

    // Events
    this.renderer.domElement.addEventListener('pointermove', this.onPointerMove.bind(this));
    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown.bind(this));
    this.renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private createWorldObjects() {
    // Physics Plane
    const geometry = new THREE.PlaneGeometry(50000, 50000);
    geometry.rotateX(-Math.PI / 2);
    this.plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
    this.objects.push(this.plane);

    // Base Grid
    const floorMat = new THREE.ShaderMaterial({
      uniforms: { uSize: { value: this.voxelSize }, uColor: { value: new THREE.Color(0x888888) } },
      vertexShader: baseGridShader.vertexShader,
      fragmentShader: baseGridShader.fragmentShader,
      transparent: true,
      depthWrite: false,
    });
    this.infiniteGrid = new THREE.Mesh(geometry, floorMat);
    this.infiniteGrid.position.y = 0.1;
    this.scene.add(this.infiniteGrid);

    // Cursor Grid
    const cursorGeo = new THREE.PlaneGeometry(500, 500);
    const cursorMat = new THREE.ShaderMaterial({
      uniforms: { 
        uSize: { value: this.voxelSize }, 
        uColor: { value: new THREE.Color(0x00ffff) }, 
        uWorldOffset: { value: new THREE.Vector3(0,0,0) } 
      },
      vertexShader: cursorGridShader.vertexShader,
      fragmentShader: cursorGridShader.fragmentShader,
      transparent: true,
      depthWrite: false,
    });
    this.cursorGrid = new THREE.Mesh(cursorGeo, cursorMat);
    this.cursorGrid.rotation.x = -Math.PI / 2;
    this.scene.add(this.cursorGrid);
  }

  private initThumbnailGenerator() {
    this.thumbScene = new THREE.Scene();
    // @ts-ignore
    this.thumbScene.background = null; 
    
    this.thumbCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    this.thumbCamera.position.set(1.5, 1.2, 1.5);
    this.thumbCamera.lookAt(0, 0, 0);
    
    this.thumbRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    this.thumbRenderer.setSize(64, 64);
    this.thumbRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    // @ts-ignore
    this.thumbRenderer.outputEncoding = THREE.sRGBEncoding;

    const pmremGenerator = new PMREMGenerator(this.thumbRenderer);
    this.thumbScene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(1, 1, 2);
    this.thumbScene.add(dirLight);
    
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-1, -1, -1);
    this.thumbScene.add(backLight);

    // Use isometric box for preview
    const geo = new THREE.BoxGeometry(1, 1, 1);
    this.thumbMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial());
    this.thumbScene.add(this.thumbMesh);
  }

  public generateMaterialThumbnail(matProps: VoxelMaterial): string | null {
    if (!this.thumbRenderer || !this.thumbMesh || !this.thumbScene || !this.thumbCamera) return null;
    
    const mat = this.thumbMesh.material as THREE.MeshStandardMaterial;
    mat.color.set(matProps.color);
    mat.emissive.set(matProps.emissive);
    mat.emissiveIntensity = matProps.emissiveIntensity;
    mat.roughness = matProps.roughness;
    mat.metalness = matProps.metalness;
    mat.opacity = matProps.opacity;
    mat.transparent = matProps.opacity < 1;
    mat.needsUpdate = true;

    this.thumbRenderer.clear();
    this.thumbRenderer.render(this.thumbScene, this.thumbCamera);
    return this.thumbRenderer.domElement.toDataURL();
  }

  // --- PUBLIC API ---

  public updateSettings(currentMaterial: VoxelMaterial, brush: BrushSettings, palette: PaletteItem[]) {
    this.currentMaterial = currentMaterial;
    this.brush = brush;
    this.brushPalette = palette;
    this.updateBrushPreview();
  }

  public setDarkMode(isDark: boolean) {
    this.scene.background = new THREE.Color(isDark ? 0x1a1a1a : 0xf0f0f0);
  }

  public toggleCamera(isOrthographic: boolean) {
    const oldPos = this.camera.position.clone();
    const oldTarget = this.controls.target.clone();
    
    this.camera = isOrthographic ? this.orthoCamera : this.perspectiveCamera;
    
    this.camera.position.copy(oldPos);
    this.camera.lookAt(oldTarget);
    
    this.controls.dispose();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; 
    this.controls.dampingFactor = 0.05;
    this.controls.mouseButtons = { LEFT: null, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
    this.controls.target.copy(oldTarget);
    this.renderPass.camera = this.camera;
  }

  public toggleSymmetry() {
    this.symmetryMode = !this.symmetryMode;
    this.updateBrushPreview();
  }

  public setModifiers(shift: boolean, alt: boolean) {
    if (this.isShiftDown !== shift || this.isAltDown !== alt) {
      this.isShiftDown = shift;
      this.isAltDown = alt;
      this.updateCursorLogic();
    }
  }

  public adjustLevel(delta: number) {
    this.currentLevel += delta;
    const newY = this.currentLevel * this.voxelSize;
    this.plane.position.y = newY;
    this.plane.updateMatrixWorld();
    this.infiniteGrid.position.y = newY + 0.1;
  }

  public takeScreenshot(callback: (url: string) => void) {
    this.renderScene(); // Ensure up to date
    callback(this.renderer.domElement.toDataURL('image/png'));
  }

  // --- CORE LOGIC ---

  private getKey(x: number, y: number, z: number): string {
    return `${x},${y},${z}`;
  }

  public addVoxelMesh(data: VoxelData): THREE.Mesh | null {
    const key = this.getKey(data.x, data.y, data.z);
    if (this.voxelMap.has(key)) return null; 

    const transparent = data.opacity < 1;
    const mat = new THREE.MeshStandardMaterial({
      color: data.color, 
      emissive: data.emissive, 
      metalness: data.metalness, 
      roughness: data.roughness,
      emissiveIntensity: data.emissiveIntensity, 
      opacity: data.opacity, 
      transparent: transparent,
      depthWrite: !transparent, 
      side: THREE.DoubleSide 
    });
    
    const voxel = new THREE.Mesh(this.sharedGeometry, mat);
    voxel.position.set(data.x, data.y, data.z);
    voxel.castShadow = true; 
    voxel.receiveShadow = true;
    voxel.userData = { ...data };
    
    this.scene.add(voxel);
    this.objects.push(voxel);
    this.voxelMap.set(key, { mesh: voxel, data: data });
    
    if (this.callbacks.onVoxelCountChange) this.callbacks.onVoxelCountChange(this.voxelMap.size);
    return voxel;
  }

  private removeVoxelByCoord(x: number, y: number, z: number) {
    const key = this.getKey(x, y, z);
    const item = this.voxelMap.get(key);
    if (!item) return;

    this.scene.remove(item.mesh);
    const idx = this.objects.indexOf(item.mesh);
    if (idx > -1) this.objects.splice(idx, 1);
    
    if (Array.isArray(item.mesh.material)) {
        item.mesh.material.forEach(m => m.dispose());
    } else {
        item.mesh.material.dispose();
    }
    
    this.voxelMap.delete(key);
    if (this.callbacks.onVoxelCountChange) this.callbacks.onVoxelCountChange(this.voxelMap.size);
  }

  public clearAll() {
    const toRemove = this.objects.filter(obj => obj !== this.plane);
    toRemove.forEach(obj => { 
        this.scene.remove(obj); 
        // @ts-ignore
        if (obj.material) obj.material.dispose(); 
    });
    
    this.objects = [this.plane];
    this.voxelMap.clear();
    this.history = [];
    this.historyIndex = -1;
    this.currentLevel = 0;
    this.adjustLevel(0);
    
    if (this.callbacks.onVoxelCountChange) this.callbacks.onVoxelCountChange(0);
    if (this.callbacks.onHistoryChange) this.callbacks.onHistoryChange(-1, 0);
  }

  // --- HISTORY ---

  private recordAction(action: HistoryAction) {
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    this.history.push(action);
    this.historyIndex++;
    if (this.history.length > 100) {
      this.history.shift();
      this.historyIndex--;
    }
    if (this.callbacks.onHistoryChange) this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
  }

  public undo() {
    if (this.historyIndex < 0) return;
    const action = this.history[this.historyIndex];
    
    if (action!.type === 'batch') {
      // 1. Remove added
      action!.changes.added.forEach(item => {
        this.removeVoxelByCoord(item.data.x, item.data.y, item.data.z);
      });
      // 2. Restore removed
      action!.changes.removed.forEach(item => {
        const mesh = this.addVoxelMesh(item.data);
        if (mesh) item.mesh = mesh;
      });
    }
    this.historyIndex--;
    if (this.callbacks.onHistoryChange) this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
  }

  public redo() {
    if (this.historyIndex >= this.history.length - 1) return;
    this.historyIndex++;
    const action = this.history[this.historyIndex];
    
    if (action!.type === 'batch') {
      // 1. Remove previously removed
      action!.changes.removed.forEach(item => {
        this.removeVoxelByCoord(item.data.x, item.data.y, item.data.z);
      });
      // 2. Add previously added
      action!.changes.added.forEach(item => {
        const mesh = this.addVoxelMesh(item.data);
        if (mesh) item.mesh = mesh;
      });
    }
    if (this.callbacks.onHistoryChange) this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
  }

  // --- INPUT & BRUSH LOGIC ---

  private onPointerDown(event: MouseEvent) {
    if (event.button !== 0) return;
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, false);
    
    if (intersects.length === 0) return;
    const intersect = intersects[0];

    // Eyedropper
    if (this.isAltDown) {
      if (intersect!.object !== this.plane && intersect!.object.userData) {
        if (this.callbacks.onMaterialPick) {
            this.callbacks.onMaterialPick(intersect!.object.userData as VoxelMaterial);
        }
      }
      return;
    }

    // Paint Logic
    const centerPos = new THREE.Vector3();
    if (this.isShiftDown) {
      // Erase logic: center is the existing block
      if (intersect!.object !== this.plane) centerPos.copy(intersect!.object.position);
      else return; 
    } else {
      // Build logic: center is offset from face
      // @ts-ignore
      centerPos.copy(intersect.point).add(intersect.face.normal);
      centerPos.divideScalar(this.voxelSize).floor().multiplyScalar(this.voxelSize).addScalar(this.voxelSize / 2);
    }

    this.applyBrushAction(centerPos);
  }

  private applyBrushAction(origin: THREE.Vector3) {
    const batchChanges: HistoryAction['changes'] = { added: [], removed: [] };
    const actions = [origin];
    
    if (this.symmetryMode) {
      actions.push(new THREE.Vector3(-origin.x, origin.y, origin.z));
    }

    const offsets = this.getBrushOffsets();

    actions.forEach(center => {
      offsets.forEach(off => {
        const tx = center.x + (off.x * this.voxelSize);
        const ty = center.y + (off.y * this.voxelSize);
        const tz = center.z + (off.z * this.voxelSize);
        const key = this.getKey(tx, ty, tz);
        const existingItem = this.voxelMap.get(key);

        if (this.isShiftDown) {
          // ERASE
          if (existingItem) {
            batchChanges.removed.push({ data: { ...existingItem.data }, mesh: null });
            this.removeVoxelByCoord(tx, ty, tz);
          }
        } else {
          // PAINT
          if (existingItem) {
            // Destroy overlapping
            batchChanges.removed.push({ data: { ...existingItem.data }, mesh: null });
            this.removeVoxelByCoord(tx, ty, tz);
          }
          // Create New
          const matProps = this.pickMaterial();
          const data: VoxelData = { x: tx, y: ty, z: tz, ...matProps };
          const newMesh = this.addVoxelMesh(data);
          if (newMesh) batchChanges.added.push({ mesh: newMesh, data: data });
        }
      });
    });

    if (batchChanges.added.length > 0 || batchChanges.removed.length > 0) {
      if (this.callbacks.onActionRecord && !this.isShiftDown) this.callbacks.onActionRecord();
      this.recordAction({ type: 'batch', changes: batchChanges });
    }
  }

  private getBrushOffsets() {
    const offsets: {x: number, y: number, z: number}[] = [];
    const r = this.brush.size;
    const shape = this.brush.shape;
    const axis = this.brush.axis;

    if (r === 0) return [{x:0, y:0, z:0}];

    for (let x = -r; x <= r; x++) {
      for (let y = 0; y <= r * 2; y++) { // Bottom origin
        for (let z = -r; z <= r; z++) {
          let include = false;
          const cy = y - r;

          if (shape === 'cube') include = true;
          else if (shape === 'sphere') { 
            if (Math.sqrt(x*x + cy*cy + z*z) <= r + 0.5) include = true; 
          }
          else if (shape === 'square') {
            if (axis === 'y' && y === 0) include = true; 
            if (axis === 'x' && x === 0) include = true; 
            if (axis === 'z' && z === 0) include = true;
          } else if (shape === 'circle') {
            if (axis === 'y' && y === 0 && Math.sqrt(x*x + z*z) <= r + 0.5) include = true;
            if (axis === 'x' && x === 0 && Math.sqrt(cy*cy + z*z) <= r + 0.5) include = true;
            if (axis === 'z' && z === 0 && Math.sqrt(x*x + cy*cy) <= r + 0.5) include = true;
          }

          if (include) offsets.push({x, y, z});
        }
      }
    }
    return offsets;
  }

  private updateBrushPreview(centerPos?: THREE.Vector3) {
    if (!this.brushPreviewMesh) return;
    const pos = centerPos || this.brushPreviewMesh.position;
    this.brushPreviewMesh.position.copy(pos);
    
    const offsets = this.getBrushOffsets();
    let totalInstances = offsets.length;
    if (this.symmetryMode) totalInstances *= 2;
    
    this.brushPreviewMesh.count = totalInstances;
    let instanceIdx = 0;

    // Normal Brush
    for (let i = 0; i < offsets.length; i++) {
      const off = offsets[i]!;
      this.dummy.position.set(off.x * this.voxelSize, off.y * this.voxelSize, off.z * this.voxelSize);
      this.dummy.updateMatrix();
      this.brushPreviewMesh.setMatrixAt(instanceIdx++, this.dummy.matrix);
    }

    // Symmetry Ghost
    if (this.symmetryMode) {
      const relX = (-pos.x) - pos.x;
      for (let i = 0; i < offsets.length; i++) {
        const off = offsets[i]!;
        this.dummy.position.set(
            relX + (-off.x * this.voxelSize), 
            off.y * this.voxelSize, 
            off.z * this.voxelSize
        );
        this.dummy.updateMatrix();
        this.brushPreviewMesh.setMatrixAt(instanceIdx++, this.dummy.matrix);
      }
    }
    this.brushPreviewMesh.instanceMatrix.needsUpdate = true;
  }

  private updateCursorLogic() {
    if (!this.pointer || !this.raycaster) return;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, false);
    
    if (intersects.length > 0) {
      const intersect = intersects[0];
      const centerPos = new THREE.Vector3();
      
      if (this.isShiftDown) {
        // Delete: Snap to object center
        if (intersect!.object !== this.plane) {
          centerPos.copy(intersect!.object.position);
          this.brushPreviewMesh.visible = true;
        } else {
          this.brushPreviewMesh.visible = false;
          return;
        }
      } else {
        // Build: Snap to grid
        this.brushPreviewMesh.visible = true;
        // @ts-ignore
        centerPos.copy(intersect.point).add(intersect.face.normal);
        centerPos.divideScalar(this.voxelSize).floor().multiplyScalar(this.voxelSize).addScalar(this.voxelSize / 2);
      }
      this.updateBrushPreview(centerPos);
    }
  }

  private pickMaterial(): VoxelMaterial {
    if (!this.brushPalette || this.brushPalette.length === 0) return { ...this.currentMaterial };
    
    const totalWeight = this.brushPalette.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    for (const item of this.brushPalette) {
      if (random < item.weight) return { ...item.mat };
      random -= item.weight;
    }
    return { ...this.brushPalette[0]!.mat };
  }

  private onPointerMove(event: PointerEvent) {
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.updateCursorLogic();
  }

  private animate() {
  if (!this.renderer) return;
  requestAnimationFrame(this.animate.bind(this));
  if (this.controls) this.controls.update();
  
  // Sync Cursor Grid
  if (this.cursorGrid && this.brushPreviewMesh) {
    // We add a tiny offset (+0.05) so it sits just on top of the main ground grid.
    const y = this.infiniteGrid.position.y + 0.05; 
    
    this.cursorGrid.position.set(
      this.brushPreviewMesh.position.x, 
      y, 
      this.brushPreviewMesh.position.z
    );

    // Ensure the shader knows the offset so grid lines align perfectly
    // @ts-ignore
    this.cursorGrid.material.uniforms.uWorldOffset.value.copy(this.cursorGrid.position);
    
    const color = this.isShiftDown ? 0xff0000 : 0x44aaff;
    // @ts-ignore
    this.brushPreviewMesh.material.color.setHex(color);
  }

  this.renderScene();
}

  private renderScene() {
    if (!this.composer) return;

    const opaqueMeshes: THREE.Object3D[] = [];
    const transparentMeshes: THREE.Mesh[] = [];
    
    this.scene.traverse(obj => {
        if (obj.type === 'Mesh' && obj !== this.plane && obj !== this.infiniteGrid && obj !== this.cursorGrid && obj !== this.brushPreviewMesh && obj !== this.thumbMesh) {
            const mesh = obj as THREE.Mesh;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat.transparent && mat.opacity < 1) {
                transparentMeshes.push(mesh);
                mesh.visible = false; 
            } else {
                opaqueMeshes.push(mesh);
            }
        }
    });

    // Render Opaque
    this.composer.render();

    // Render Transparent (Composite Layers)
    if (transparentMeshes.length > 0) {
        const currentBackground = this.scene.background;
        this.scene.background = null;
        
        opaqueMeshes.forEach(m => m.visible = false);
        this.infiniteGrid.visible = false; 
        this.cursorGrid.visible = false; 
        this.brushPreviewMesh.visible = false;

        const opacityGroups = new Map<number, THREE.Mesh[]>();
        transparentMeshes.forEach(mesh => {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            const opacity = Math.round(mat.opacity * 20) / 20;
            if (!opacityGroups.has(opacity)) opacityGroups.set(opacity, []);
            opacityGroups.get(opacity)!.push(mesh);
        });

        const sortedOpacities = Array.from(opacityGroups.keys()).sort((a, b) => a - b);
        
        sortedOpacities.forEach(opacity => {
            const meshes = opacityGroups.get(opacity)!;
            
            if (!this.renderTargets.has(opacity)) {
                this.renderTargets.set(opacity, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { 
                    minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, type: THREE.UnsignedByteType 
                }));
            }
            const target = this.renderTargets.get(opacity)!;

            // Render Solid Mask
            meshes.forEach(mesh => { 
                mesh.visible = true; 
                const mat = mesh.material as THREE.MeshStandardMaterial;
                mat.opacity = 1.0; 
                mat.transparent = false; 
                mat.depthWrite = true; 
            });

            this.renderer.setRenderTarget(target);
            this.renderer.clear();
            this.renderer.render(this.scene, this.camera);
            this.renderer.setRenderTarget(null);

            // Restore Props
            meshes.forEach(mesh => { 
                mesh.visible = false; 
                const mat = mesh.material as THREE.MeshStandardMaterial;
                mat.opacity = opacity; 
                mat.transparent = true; 
                mat.depthWrite = false; 
            });

            this.compositeTexture(target.texture, opacity);
        });

        // Restore State
        this.scene.background = currentBackground;
        opaqueMeshes.forEach(m => m.visible = true);
        transparentMeshes.forEach(m => m.visible = true);
        this.infiniteGrid.visible = true; 
        this.cursorGrid.visible = true; 
        this.brushPreviewMesh.visible = true;
    }
  }

  private compositeTexture(texture: THREE.Texture, opacity: number) {
    if (!this.compositeScene) {
      this.compositeScene = new THREE.Scene();
      this.compositeCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      this.compositeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: opacity, depthTest: false, depthWrite: false, blending: THREE.NormalBlending });
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.compositeMaterial);
      this.compositeScene.add(quad);
    } else {
      if (this.compositeMaterial) {
          this.compositeMaterial.map = texture;
          this.compositeMaterial.opacity = opacity;
      }
    }
    const oldAutoClear = this.renderer.autoClear;
    this.renderer.autoClear = false;
    // @ts-ignore
    this.renderer.render(this.compositeScene, this.compositeCamera);
    this.renderer.autoClear = oldAutoClear;
  }

  private onWindowResize() {
    if (!this.camera || !this.renderer) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    if (this.perspectiveCamera) {
        this.perspectiveCamera.aspect = w / h;
        this.perspectiveCamera.updateProjectionMatrix();
    }
    if (this.orthoCamera) {
        const s = 1000;
        this.orthoCamera.left = -s * (w/h) / 2; 
        this.orthoCamera.right = s * (w/h) / 2;
        this.orthoCamera.top = s / 2; 
        this.orthoCamera.bottom = -s / 2;
        this.orthoCamera.updateProjectionMatrix();
    }
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
    this.renderTargets.forEach(rt => rt.setSize(w, h));
    this.updateFXAA();
  }

  private updateFXAA() {
    if (this.fxaaPass) {
      const pixelRatio = this.renderer.getPixelRatio();
      this.fxaaPass.material.uniforms['resolution']!.value.x = 1 / (window.innerWidth * pixelRatio);
      this.fxaaPass.material.uniforms['resolution']!.value.y = 1 / (window.innerHeight * pixelRatio);
    }
  }

  public exportVoxels() {
    const voxels = Array.from(this.voxelMap.values()).map(v => v.data);
    const exportData = { 
        version: 1, 
        voxels: voxels, 
        gridSize: this.voxelSize, 
        timestamp: new Date().toISOString() 
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const url = URL.createObjectURL(new Blob([dataStr], { type: 'application/json' }));
    const link = document.createElement('a'); 
    link.href = url; 
    link.download = `voxel-model-${Date.now()}.json`; 
    link.click(); 
    URL.revokeObjectURL(url);
  }

  public dispose() {
    this.controls.dispose();
    this.renderer.dispose();
    this.sharedGeometry.dispose();
    this.thumbRenderer?.dispose();
    this.renderTargets.forEach(rt => rt.dispose());
    window.removeEventListener('resize', this.onWindowResize);
  }
}