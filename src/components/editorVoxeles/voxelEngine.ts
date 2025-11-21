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
import { TransformControls } from "./transformControls";
import { baseGridShader, cursorGridShader } from "./gridShaders";
import { ChunkManager } from "./chunkManager";
import type {
  VoxelData,
  VoxelMaterial,
  BrushSettings,
  PaletteItem,
  EngineCallbacks,
  HistoryAction,
  ToolMode,
  Symmetries,
} from "./types";

export class VoxelEngine {
  private container: HTMLElement;
  private callbacks: EngineCallbacks;

  // State
  public voxelSize: number = 12.5;
  public currentLevel: number = 0;
  private gridSnap: number = 1;
  public isShiftDown: boolean = false;
  public isAltDown: boolean = false;
  private symmetries: Symmetries = { x: false, z: false };
  private currentTool: ToolMode = "brush";

  // Input State
  private isPointerDown: boolean = false;
  private pointerStart = new THREE.Vector2();
  private isDraggingCamera: boolean = false;
  private isPainting: boolean = false;

  // Buffered Stroke State
  private tempVoxels: Map<string, VoxelData> = new Map();
  private strokePreviewMesh!: THREE.InstancedMesh;

  // Box Tool State
  private boxStart: THREE.Vector3 | null = null;
  private boxPreviewMesh!: THREE.Mesh;

  // Selection Tool State
  private selectionStart: THREE.Vector3 | null = null;
  private selectionEnd: THREE.Vector3 | null = null;
  private selectionBox!: THREE.BoxHelper;
  private selectionGroup!: THREE.Group;
  private selectionPreviewBox!: THREE.Mesh;
  private transformControls!: TransformControls;
  private isTransforming: boolean = false;

  // Core Three.js
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  private perspectiveCamera!: THREE.PerspectiveCamera;
  private orthoCamera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private renderPass!: RenderPass;
  private controls!: OrbitControls;
  private raycaster!: THREE.Raycaster;
  private pointer!: THREE.Vector2;
  private fxaaPass!: ShaderPass;

  // Managers
  private chunkManager!: ChunkManager;

  // Objects
  private plane!: THREE.Mesh;
  private infiniteGrid!: THREE.Mesh;
  private cursorGrid!: THREE.Mesh;
  private brushPreviewMesh!: THREE.InstancedMesh;
  private dummy!: THREE.Object3D;

  private history: HistoryAction[] = [];
  private historyIndex: number = -1;

  private brush: BrushSettings = { shape: "cube", size: 0, axis: "y" };
  private brushPalette: PaletteItem[] = [];
  private currentMaterial: VoxelMaterial = {
    color: "#ffffff",
    emissive: "#000000",
    metalness: 0,
    roughness: 1,
    emissiveIntensity: 0,
    opacity: 1,
    transparent: false,
  };

  private thumbScene?: THREE.Scene;
  private thumbCamera?: THREE.PerspectiveCamera;
  private thumbRenderer?: THREE.WebGLRenderer;
  private thumbMesh?: THREE.Mesh;

  constructor(container: HTMLElement, callbacks: EngineCallbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.init();
    this.initThumbnailGenerator();
    this.animate();
  }

  private init() {
    const aspect = window.innerWidth / window.innerHeight;
    this.perspectiveCamera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
    this.perspectiveCamera.position.set(250, 400, 650);
    this.orthoCamera = new THREE.OrthographicCamera(
      -1000,
      1000,
      1000,
      -1000,
      1,
      10000
    );
    this.orthoCamera.position.set(250, 400, 650);
    this.camera = this.perspectiveCamera;

    this.scene = new THREE.Scene();
    this.scene.environmentIntensity = 0.3;

    this.chunkManager = new ChunkManager(this.scene, this.voxelSize);
    this.dummy = new THREE.Object3D();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.mouseButtons = {
      LEFT: null,
      MIDDLE: THREE.MOUSE.PAN,
      RIGHT: THREE.MOUSE.ROTATE,
    };

    // Initialize TransformControls
    this.transformControls = new TransformControls(
      this.camera,
      this.renderer.domElement
    );
    this.transformControls.addEventListener(
      "dragging-changed",
      (event: any) => {
        this.controls.enabled = !event.value;
        this.isTransforming = event.value;
      }
    );

    this.initToolsHelpers();

    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      { type: THREE.HalfFloatType, format: THREE.RGBAFormat }
    );
    this.composer = new EffectComposer(this.renderer, renderTarget);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.2,
        0.75,
        0.4
      )
    );
    this.composer.addPass(new OutputPass());

    this.fxaaPass = new ShaderPass(FXAAShader);
    this.updateFXAA();
    this.composer.addPass(this.fxaaPass);

    const pmremGenerator = new PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(200, 400, 100);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    this.scene.add(dirLight);

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.createWorldObjects();

    this.renderer.domElement.addEventListener(
      "pointermove",
      this.onPointerMove.bind(this)
    );
    this.renderer.domElement.addEventListener(
      "pointerdown",
      this.onPointerDown.bind(this)
    );
    this.renderer.domElement.addEventListener(
      "pointerup",
      this.onPointerUp.bind(this)
    );
    this.renderer.domElement.addEventListener("contextmenu", (e) =>
      e.preventDefault()
    );
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.clearSelection(true);
      if (e.key === "Enter" && this.currentTool === "select")
        this.clearSelection(false);
    });
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  private initToolsHelpers() {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x44aaff,
      opacity: 0.4,
      transparent: true,
      depthTest: false,
    });
    this.brushPreviewMesh = new THREE.InstancedMesh(geo, mat, 4000);
    this.brushPreviewMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.brushPreviewMesh.frustumCulled = false;
    this.scene.add(this.brushPreviewMesh);

    // Stroke Preview (for buffered drawing)
    const strokeMat = new THREE.MeshStandardMaterial({});
    this.strokePreviewMesh = new THREE.InstancedMesh(geo, strokeMat, 10000);
    this.strokePreviewMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.strokePreviewMesh.visible = false;
    this.strokePreviewMesh.frustumCulled = false;
    this.scene.add(this.strokePreviewMesh);

    this.boxPreviewMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x44aaff,
        opacity: 0.5,
        transparent: true,
        depthTest: false,
      })
    );
    this.boxPreviewMesh.visible = false;
    this.scene.add(this.boxPreviewMesh);

    this.selectionPreviewBox = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true,
        depthTest: false,
      })
    );
    this.selectionPreviewBox.visible = false;
    this.scene.add(this.selectionPreviewBox);

    this.selectionGroup = new THREE.Group();
    this.scene.add(this.selectionGroup);
    this.selectionBox = new THREE.BoxHelper(this.selectionGroup, 0xffff00);
    this.scene.add(this.selectionBox);

    this.scene.add(this.transformControls);
    this.transformControls.detach();
    this.transformControls.visible = false;

    // Set Default Snaps
    this.transformControls.setTranslationSnap(this.voxelSize);
    this.transformControls.setRotationSnap(Math.PI / 2);
  }

  private createWorldObjects() {
    const geometry = new THREE.PlaneGeometry(50000, 50000);
    geometry.rotateX(-Math.PI / 2);
    this.plane = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ visible: false })
    );
    this.scene.add(this.plane);

    const floorMat = new THREE.ShaderMaterial({
      uniforms: {
        uSize: { value: this.voxelSize },
        uColor: { value: new THREE.Color(0x888888) },
      },
      vertexShader: baseGridShader.vertexShader,
      fragmentShader: baseGridShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      extensions: { derivatives: true },
    });
    this.infiniteGrid = new THREE.Mesh(geometry, floorMat);
    this.infiniteGrid.position.y = 0.1;
    this.scene.add(this.infiniteGrid);

    const cursorMat = new THREE.ShaderMaterial({
      uniforms: {
        uSize: { value: this.voxelSize },
        uColor: { value: new THREE.Color(0x00ffff) },
        uWorldOffset: { value: new THREE.Vector3() },
      },
      vertexShader: cursorGridShader.vertexShader,
      fragmentShader: cursorGridShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      extensions: { derivatives: true },
    });
    this.cursorGrid = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      cursorMat
    );
    this.cursorGrid.rotation.x = -Math.PI / 2;
    this.scene.add(this.cursorGrid);
  }

  public setTool(tool: ToolMode) {
    this.currentTool = tool;
    this.brushPreviewMesh.visible = tool === "brush";
    this.strokePreviewMesh.visible = false;

    // Hide cursor grid if selecting
    if (this.cursorGrid) this.cursorGrid.visible = tool !== "select";

    // Reset tools
    if (tool !== "box") {
      this.boxStart = null;
      this.boxPreviewMesh.visible = false;
    }

    if (tool === "select") {
      this.brushPreviewMesh.visible = false;
      if (this.selectionGroup.children.length > 0) {
        this.transformControls.attach(this.selectionGroup);
        this.transformControls.visible = true;
        this.transformControls.enabled = true;
        // Default to translate when re-selecting tool
        this.transformControls.setMode("translate");
      }
    } else {
      if (this.selectionGroup.children.length > 0) {
        this.clearSelection(false);
      }
      this.selectionStart = null;
      this.selectionPreviewBox.visible = false;
      this.transformControls.detach();
      this.transformControls.enabled = false;
      this.transformControls.visible = false;
    }
  }

  public setGridSnap(val: number) {
    this.gridSnap = val;
    // Update transform controls snap
    if (this.transformControls) {
      this.transformControls.setTranslationSnap(this.voxelSize * this.gridSnap);
    }
  }

  public setTransformMode(mode: "translate" | "rotate") {
    if (this.transformControls) {
      this.transformControls.setMode(mode);
    }
  }

  public confirmSelection() {
    this.clearSelection(false);
  }

  public setSymmetries(s: Symmetries) {
    this.symmetries = s;
  }
  public updateSettings(m: VoxelMaterial, b: BrushSettings, p: PaletteItem[]) {
    this.currentMaterial = m;
    this.brush = b;
    this.brushPalette = p;
  }

  // --- INPUT ---

  private onPointerDown(event: MouseEvent) {
    if (event.button !== 0) return;
    this.isPointerDown = true;
    this.pointerStart.set(event.clientX, event.clientY);
    this.isDraggingCamera = false;

    if (this.isTransforming) return;

    // Fix for "Click then Drag" issue:
    // Check if we are hovering the TransformGizmo. If so, do nothing here, let controls handle it.
    if (this.currentTool === "select" && this.transformControls.axis !== null) {
      return;
    }

    const hit = this.raycast(event);
    if (!hit) return;

    const { gridPos, normal } = hit;

    if (this.currentTool === "picker" || this.isAltDown) {
      const pickPos = gridPos
        .clone()
        .sub(normal.clone().multiplyScalar(0.01))
        .floor();
      const mat = this.chunkManager.getVoxel(pickPos.x, pickPos.y, pickPos.z);
      if (mat && this.callbacks.onMaterialPick)
        this.callbacks.onMaterialPick(mat);
      return;
    }

    if (this.currentTool === "select") {
      if (this.selectionGroup.children.length === 0) {
        const snap = this.gridSnap;
        const start = gridPos.clone().floor();
        start.x = Math.floor(start.x / snap) * snap;
        start.y = Math.floor(start.y / snap) * snap;
        start.z = Math.floor(start.z / snap) * snap;
        this.selectionStart = start;
      } else {
        // Clicking outside the group (and not on gizmo) -> Deselect
        this.clearSelection(false);
      }
      return;
    }

    if (this.currentTool === "box") {
      const p = this.isShiftDown
        ? gridPos.clone().sub(normal.clone().multiplyScalar(0.01)).floor()
        : gridPos.clone().add(normal.clone().multiplyScalar(0.01)).floor();

      const snap = this.gridSnap;
      p.x = Math.floor(p.x / snap) * snap;
      p.y = Math.floor(p.y / snap) * snap;
      p.z = Math.floor(p.z / snap) * snap;
      this.boxStart = p;
      return;
    }

    const isTouch = (event as any).pointerType === "touch";
    if (!isTouch && this.currentTool === "brush") {
      this.isPainting = true;
      this.tempVoxels.clear(); // Reset buffer
      this.strokePreviewMesh.visible = true;
      this.strokePreviewMesh.count = 0;

      this.calculateBrushStroke(hit);
    }
  }

  private onPointerMove(event: PointerEvent) {
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    if (this.isTransforming) return;

    if (this.isPointerDown) {
      const dist = new THREE.Vector2(event.clientX, event.clientY).distanceTo(
        this.pointerStart
      );
      if (dist > 10 && !this.isPainting) {
        this.isDraggingCamera = true;
      }
    }

    const hit = this.raycast(event);

    if (
      this.isPainting &&
      this.currentTool === "brush" &&
      !this.isDraggingCamera &&
      hit
    ) {
      this.updateCursorGrid(hit);
      this.calculateBrushStroke(hit);
      this.updateBrushPreview(hit);
      return;
    }

    if (hit) {
      this.updateCursorGrid(hit);

      if (
        this.currentTool === "brush" &&
        !this.isTransforming &&
        !this.isPainting
      ) {
        this.updateBrushPreview(hit);
      }

      if (this.currentTool === "box" && this.boxStart) {
        let target = this.isShiftDown
          ? hit.gridPos
              .clone()
              .sub(hit.normal.clone().multiplyScalar(0.01))
              .floor()
          : hit.gridPos
              .clone()
              .add(hit.normal.clone().multiplyScalar(0.01))
              .floor();
        const snap = this.gridSnap;
        target.x = Math.floor(target.x / snap) * snap;
        target.y = Math.floor(target.y / snap) * snap;
        target.z = Math.floor(target.z / snap) * snap;
        this.updateBoxPreview(this.boxStart, target);
      }

      if (this.currentTool === "select" && this.selectionStart) {
        let target = hit.gridPos.clone().floor();
        const snap = this.gridSnap;
        target.x = Math.floor(target.x / snap) * snap;
        target.y = Math.floor(target.y / snap) * snap;
        target.z = Math.floor(target.z / snap) * snap;
        this.updateSelectionPreview(this.selectionStart, target);
      }
    } else {
      this.brushPreviewMesh.visible = false;
    }
  }

  private onPointerUp(event: MouseEvent) {
    this.isPointerDown = false;

    if (this.isTransforming) return;

    if (this.isPainting) {
      this.isPainting = false;
      this.commitBrushStroke();
      this.strokePreviewMesh.visible = false;
      this.strokePreviewMesh.count = 0;
      this.tempVoxels.clear();
      return;
    }

    const hit = this.raycast(event);
    if (!hit) return;

    if (this.currentTool === "box" && this.boxStart) {
      let target = this.isShiftDown
        ? hit.gridPos
            .clone()
            .sub(hit.normal.clone().multiplyScalar(0.01))
            .floor()
        : hit.gridPos
            .clone()
            .add(hit.normal.clone().multiplyScalar(0.01))
            .floor();
      const snap = this.gridSnap;
      target.x = Math.floor(target.x / snap) * snap;
      target.y = Math.floor(target.y / snap) * snap;
      target.z = Math.floor(target.z / snap) * snap;

      this.applyBoxAction(this.boxStart, target);
      this.boxStart = null;
      this.boxPreviewMesh.visible = false;
    }

    if (this.currentTool === "select" && this.selectionStart) {
      let end = hit.gridPos.clone().floor();
      const snap = this.gridSnap;
      end.x = Math.floor(end.x / snap) * snap;
      end.y = Math.floor(end.y / snap) * snap;
      end.z = Math.floor(end.z / snap) * snap;

      this.selectionEnd = end;
      this.createSelection(this.selectionStart, this.selectionEnd);
      this.selectionStart = null;
      this.selectionPreviewBox.visible = false;
    }
  }

  private raycast(event: MouseEvent) {
    const objects = [
      this.plane,
      ...this.scene.children.filter((c) => c.userData.isChunk),
    ];
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(objects, true);

    for (let i = 0; i < intersects.length; i++) {
      const hit = intersects[i];
      if (!hit.object.visible) continue;
      if (
        hit.object === this.brushPreviewMesh ||
        hit.object === this.boxPreviewMesh ||
        hit.object === this.selectionPreviewBox
      )
        continue;

      return {
        point: hit.point,
        normal: hit.face!.normal,
        gridPos: hit.point.clone().divideScalar(this.voxelSize),
      };
    }
    return null;
  }

  private updateCursorGrid(hit: { point: THREE.Vector3 }) {
    if (!this.cursorGrid) return;

    // Hide cursor if in selection mode to reduce clutter
    if (this.currentTool === "select") {
      this.cursorGrid.visible = false;
      return;
    } else {
      this.cursorGrid.visible = true;
    }

    const y = this.infiniteGrid.position.y + 0.05;
    const s = this.voxelSize * this.gridSnap;

    const cx = Math.floor(hit.point.x / s) * s + s / 2;
    const cz = Math.floor(hit.point.z / s) * s + s / 2;

    this.cursorGrid.position.set(cx, y, cz);
    // @ts-ignore
    this.cursorGrid.material.uniforms.uWorldOffset.value.copy(
      this.cursorGrid.position
    );
    // @ts-ignore
    this.cursorGrid.material.uniforms.uSize.value = s;
  }

  private updateBrushPreview(hit: {
    gridPos: THREE.Vector3;
    normal: THREE.Vector3;
  }) {
    this.brushPreviewMesh.visible = true;

    let origin = this.isShiftDown
      ? hit.gridPos.clone().sub(hit.normal.clone().multiplyScalar(0.01)).floor()
      : hit.gridPos
          .clone()
          .add(hit.normal.clone().multiplyScalar(0.01))
          .floor();

    const snap = this.gridSnap;
    if (snap > 1) {
      origin.x = Math.floor(origin.x / snap) * snap;
      origin.y = Math.floor(origin.y / snap) * snap;
      origin.z = Math.floor(origin.z / snap) * snap;
    }

    const centers = [origin.clone()];
    if (this.symmetries.x)
      centers.push(new THREE.Vector3(-origin.x - snap, origin.y, origin.z));
    if (this.symmetries.z) {
      const len = centers.length;
      for (let i = 0; i < len; i++)
        centers.push(
          new THREE.Vector3(centers[i].x, centers[i].y, -centers[i].z - snap)
        );
    }

    const offsets = this.getBrushOffsets();
    let instanceIdx = 0;
    const totalInstances = centers.length * offsets.length;
    this.brushPreviewMesh.count = totalInstances;

    centers.forEach((c) => {
      offsets.forEach((off) => {
        const tx = c.x + off.x * snap;
        const ty = c.y + off.y * snap;
        const tz = c.z + off.z * snap;

        this.dummy.position.set(
          tx * this.voxelSize + this.voxelSize * snap * 0.5,
          ty * this.voxelSize + this.voxelSize * snap * 0.5,
          tz * this.voxelSize + this.voxelSize * snap * 0.5
        );

        this.dummy.scale.setScalar(snap * this.voxelSize);
        this.dummy.updateMatrix();
        this.brushPreviewMesh.setMatrixAt(instanceIdx++, this.dummy.matrix);
      });
    });

    this.brushPreviewMesh.instanceMatrix.needsUpdate = true;
    // @ts-ignore
    this.brushPreviewMesh.material.color.setHex(
      this.isShiftDown ? 0xff0000 : 0x44aaff
    );
  }

  private calculateBrushStroke(hit: {
    gridPos: THREE.Vector3;
    normal: THREE.Vector3;
  }) {
    const origin = this.isShiftDown
      ? hit.gridPos.clone().sub(hit.normal.clone().multiplyScalar(0.01)).floor()
      : hit.gridPos
          .clone()
          .add(hit.normal.clone().multiplyScalar(0.01))
          .floor();

    const snap = this.gridSnap;
    if (snap > 1) {
      origin.x = Math.floor(origin.x / snap) * snap;
      origin.y = Math.floor(origin.y / snap) * snap;
      origin.z = Math.floor(origin.z / snap) * snap;
    }

    const centers = [origin];
    if (this.symmetries.x)
      centers.push(new THREE.Vector3(-origin.x - snap, origin.y, origin.z));
    if (this.symmetries.z) {
      const len = centers.length;
      for (let i = 0; i < len; i++)
        centers.push(
          new THREE.Vector3(centers[i].x, centers[i].y, -centers[i].z - snap)
        );
    }

    centers.forEach((center) => {
      const offsets = this.getBrushOffsets();
      offsets.forEach((off) => {
        for (let sx = 0; sx < snap; sx++) {
          for (let sy = 0; sy < snap; sy++) {
            for (let sz = 0; sz < snap; sz++) {
              const tx = center.x + off.x * snap + sx;
              const ty = center.y + off.y * snap + sy;
              const tz = center.z + off.z * snap + sz;

              const key = `${tx},${ty},${tz}`;

              if (!this.tempVoxels.has(key)) {
                const existing = this.chunkManager.getVoxel(tx, ty, tz);

                if (this.isShiftDown) {
                  if (existing) {
                    this.tempVoxels.set(key, {
                      ...existing,
                      x: tx,
                      y: ty,
                      z: tz,
                    });
                  }
                } else {
                  const mat = this.pickMaterial();
                  this.tempVoxels.set(key, { x: tx, y: ty, z: tz, ...mat });
                }
              }
            }
          }
        }
      });
    });

    this.updateStrokePreview();
  }

  private updateStrokePreview() {
    if (this.isShiftDown) {
      this.strokePreviewMesh.visible = false;
      return;
    }

    this.strokePreviewMesh.visible = true;
    let i = 0;
    this.tempVoxels.forEach((v) => {
      this.dummy.position.set(
        (v.x + 0.5) * this.voxelSize,
        (v.y + 0.5) * this.voxelSize,
        (v.z + 0.5) * this.voxelSize
      );
      this.dummy.scale.setScalar(this.voxelSize);
      this.dummy.updateMatrix();
      this.strokePreviewMesh.setMatrixAt(i, this.dummy.matrix);
      this.strokePreviewMesh.setColorAt(i, new THREE.Color(v.color));
      i++;
    });
    this.strokePreviewMesh.count = i;
    this.strokePreviewMesh.instanceMatrix.needsUpdate = true;
    if (this.strokePreviewMesh.instanceColor)
      this.strokePreviewMesh.instanceColor.needsUpdate = true;
  }

  private commitBrushStroke() {
    const batchChanges: HistoryAction["changes"] = { added: [], removed: [] };

    this.tempVoxels.forEach((v, key) => {
      const { x, y, z } = v;
      const existing = this.chunkManager.getVoxel(x, y, z);

      if (this.isShiftDown) {
        if (existing) {
          batchChanges.removed.push({ data: { ...existing, x, y, z } });
          this.chunkManager.setVoxel(x, y, z, null);
        }
      } else {
        if (existing)
          batchChanges.removed.push({ data: { ...existing, x, y, z } });
        this.chunkManager.setVoxel(x, y, z, v);
        batchChanges.added.push({ data: v });
      }
    });

    if (batchChanges.added.length > 0 || batchChanges.removed.length > 0) {
      this.recordAction({ type: "batch", changes: batchChanges });
      if (this.callbacks.onActionRecord) this.callbacks.onActionRecord();
    }
  }

  private performVoxelOp(
    x: number,
    y: number,
    z: number,
    batch: HistoryAction["changes"]
  ) {
    const existing = this.chunkManager.getVoxel(x, y, z);
    if (this.isShiftDown) {
      if (existing) {
        batch.removed.push({ data: { ...existing, x, y, z } });
        this.chunkManager.setVoxel(x, y, z, null);
      }
    } else {
      if (existing) batch.removed.push({ data: { ...existing, x, y, z } });
      const mat = this.pickMaterial();
      const data = { x, y, z, ...mat };
      this.chunkManager.setVoxel(x, y, z, data);
      batch.added.push({ data });
    }
  }

  private applyBoxAction(start: THREE.Vector3, end: THREE.Vector3) {
    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const maxY = Math.max(start.y, end.y);
    const minZ = Math.min(start.z, end.z);
    const maxZ = Math.max(start.z, end.z);

    const snap = this.gridSnap;
    const trueMaxX = maxX + snap - 1;
    const trueMaxY = maxY + snap - 1;
    const trueMaxZ = maxZ + snap - 1;

    const batch: HistoryAction["changes"] = { added: [], removed: [] };
    for (let x = minX; x <= trueMaxX; x++) {
      for (let y = minY; y <= trueMaxY; y++) {
        for (let z = minZ; z <= trueMaxZ; z++) {
          this.performVoxelOp(x, y, z, batch);
        }
      }
    }
    if (batch.added.length > 0 || batch.removed.length > 0) {
      this.recordAction({ type: "batch", changes: batch });
      if (this.callbacks.onActionRecord) this.callbacks.onActionRecord();
    }
  }

  private createSelection(start: THREE.Vector3, end: THREE.Vector3) {
    this.clearSelection(false);
    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const maxY = Math.max(start.y, end.y);
    const minZ = Math.min(start.z, end.z);
    const maxZ = Math.max(start.z, end.z);

    const snap = this.gridSnap;
    const trueMaxX = maxX + snap - 1;
    const trueMaxY = maxY + snap - 1;
    const trueMaxZ = maxZ + snap - 1;

    const extracted: VoxelData[] = [];

    // Calculate geometric center of the selection in World Space
    // Width in voxels
    const width = trueMaxX - minX + 1;
    const height = trueMaxY - minY + 1;
    const depth = trueMaxZ - minZ + 1;

    // Center point in grid coords (can be .5)
    const centerGridX = minX + width / 2;
    const centerGridY = minY + height / 2;
    const centerGridZ = minZ + depth / 2;

    for (let x = minX; x <= trueMaxX; x++) {
      for (let y = minY; y <= trueMaxY; y++) {
        for (let z = minZ; z <= trueMaxZ; z++) {
          const v = this.chunkManager.getVoxel(x, y, z);
          if (v) {
            const vd = { ...v, x, y, z };
            extracted.push(vd);
            this.chunkManager.setVoxel(x, y, z, null);
          }
        }
      }
    }
    if (extracted.length === 0) return;

    const geo = new THREE.BoxGeometry(
      this.voxelSize,
      this.voxelSize,
      this.voxelSize
    );
    const mesh = new THREE.InstancedMesh(
      geo,
      new THREE.MeshStandardMaterial({ color: 0xffffff }),
      extracted.length
    );
    const dummy = new THREE.Object3D();

    extracted.forEach((v, i) => {
      // Offset relative to the calculated center
      const offsetX = (v.x + 0.5 - centerGridX) * this.voxelSize;
      const offsetY = (v.y + 0.5 - centerGridY) * this.voxelSize;
      const offsetZ = (v.z + 0.5 - centerGridZ) * this.voxelSize;

      dummy.position.set(offsetX, offsetY, offsetZ);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, new THREE.Color(v.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.userData = { originalVoxels: extracted };

    if (mesh) {
      this.selectionGroup.add(mesh);
    }

    // Place group at World Center
    this.selectionGroup.position.set(
      centerGridX * this.voxelSize,
      centerGridY * this.voxelSize,
      centerGridZ * this.voxelSize
    );

    // Explicitly show and attach gizmo
    this.transformControls.attach(this.selectionGroup);
    this.transformControls.visible = true;
    this.transformControls.enabled = true;

    // Ensure current snap is applied
    this.transformControls.setTranslationSnap(this.voxelSize * this.gridSnap);

    this.selectionBox.update();
  }

  public clearSelection(cancel: boolean) {
    if (this.selectionGroup.children.length > 0) {
      const mesh = this.selectionGroup.children[0] as THREE.InstancedMesh;
      const original = mesh.userData.originalVoxels as VoxelData[];

      if (cancel) {
        original.forEach((v) => this.chunkManager.setVoxel(v.x, v.y, v.z, v));
      } else {
        const mat = new THREE.Matrix4();
        const batchChanges: HistoryAction["changes"] = {
          added: [],
          removed: [],
        };

        // Original voxels are conceptually removed from their start positions
        batchChanges.removed = original.map((v) => ({ data: v }));

        for (let i = 0; i < original.length; i++) {
          mesh.getMatrixAt(i, mat);
          const pos = new THREE.Vector3().setFromMatrixPosition(mat);
          pos.applyMatrix4(this.selectionGroup.matrixWorld);

          // FIX: Use Math.round to correctly snap rotated coordinates (avoiding floating point floor errors)
          const gx = Math.round(pos.x / this.voxelSize);
          const gy = Math.round(pos.y / this.voxelSize);
          const gz = Math.round(pos.z / this.voxelSize);

          const newVoxel = { ...original[i], x: gx, y: gy, z: gz };

          // Check if we are overwriting something that wasn't part of the original selection
          const existing = this.chunkManager.getVoxel(gx, gy, gz);
          if (existing) {
            batchChanges.removed.push({
              data: { ...existing, x: gx, y: gy, z: gz },
            });
          }

          this.chunkManager.setVoxel(gx, gy, gz, newVoxel);
          batchChanges.added.push({ data: newVoxel });
        }

        if (batchChanges.added.length > 0 || batchChanges.removed.length > 0) {
          this.recordAction({ type: "batch", changes: batchChanges });
          if (this.callbacks.onActionRecord) this.callbacks.onActionRecord();
        }
      }
      this.selectionGroup.remove(mesh);
      mesh.dispose();
    }
    this.transformControls.detach();
    this.transformControls.enabled = false;
    this.transformControls.visible = false;
    this.selectionGroup.position.set(0, 0, 0);
    this.selectionGroup.rotation.set(0, 0, 0);
    this.selectionGroup.scale.set(1, 1, 1);
    this.selectionBox.update();
  }

  private getBrushOffsets() {
    const offsets: { x: number; y: number; z: number }[] = [];
    const r = this.brush.size;
    const shape = this.brush.shape;
    const axis = this.brush.axis;
    if (r === 0) return [{ x: 0, y: 0, z: 0 }];

    for (let x = -r; x <= r; x++) {
      for (let y = 0; y <= r * 2; y++) {
        for (let z = -r; z <= r; z++) {
          let include = false;
          const cy = y - r;
          if (shape === "cube") include = true;
          else if (shape === "sphere") {
            if (Math.sqrt(x * x + cy * cy + z * z) <= r + 0.5) include = true;
          } else if (shape === "square") {
            if (axis === "y" && y === 0) include = true;
            if (axis === "x" && x === 0) include = true;
            if (axis === "z" && z === 0) include = true;
          } else if (shape === "circle") {
            if (axis === "y" && y === 0 && Math.sqrt(x * x + z * z) <= r + 0.5)
              include = true;
            if (
              axis === "x" &&
              x === 0 &&
              Math.sqrt(cy * cy + z * z) <= r + 0.5
            )
              include = true;
            if (
              axis === "z" &&
              z === 0 &&
              Math.sqrt(x * x + cy * cy) <= r + 0.5
            )
              include = true;
          }
          if (include) offsets.push({ x, y: y, z });
        }
      }
    }
    return offsets;
  }

  private pickMaterial(): VoxelMaterial {
    if (!this.brushPalette || this.brushPalette.length === 0)
      return { ...this.currentMaterial };
    const totalWeight = this.brushPalette.reduce(
      (sum, item) => sum + item.weight,
      0
    );
    let random = Math.random() * totalWeight;
    for (const item of this.brushPalette) {
      if (random < item.weight) return { ...item.mat };
      random -= item.weight;
    }
    return { ...this.brushPalette[0]!.mat };
  }

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
    if (this.callbacks.onHistoryChange)
      this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
    if (this.callbacks.onVoxelCountChange)
      this.callbacks.onVoxelCountChange(this.chunkManager.getVoxelCount());
  }

  public undo() {
    if (this.historyIndex < 0) return;
    const action = this.history[this.historyIndex];
    if (action.type === "batch") {
      action.changes.added.forEach((item) => {
        this.chunkManager.setVoxel(item.data.x, item.data.y, item.data.z, null);
      });
      action.changes.removed.forEach((item) => {
        this.chunkManager.setVoxel(
          item.data.x,
          item.data.y,
          item.data.z,
          item.data
        );
      });
    }
    this.historyIndex--;
    if (this.callbacks.onHistoryChange)
      this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
  }

  public redo() {
    if (this.historyIndex >= this.history.length - 1) return;
    this.historyIndex++;
    const action = this.history[this.historyIndex];
    if (action.type === "batch") {
      action.changes.removed.forEach((item) => {
        this.chunkManager.setVoxel(item.data.x, item.data.y, item.data.z, null);
      });
      action.changes.added.forEach((item) => {
        this.chunkManager.setVoxel(
          item.data.x,
          item.data.y,
          item.data.z,
          item.data
        );
      });
    }
    if (this.callbacks.onHistoryChange)
      this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
  }

  public adjustLevel(d: number) {
    this.currentLevel += d;
    const y = this.currentLevel * this.voxelSize;
    this.plane.position.y = y;
    this.infiniteGrid.position.y = y + 0.1;
  }

  public toggleCamera(iso: boolean) {
    const oldPos = this.camera.position.clone();
    const oldTarget = this.controls.target.clone();
    this.camera = iso ? this.orthoCamera : this.perspectiveCamera;
    this.camera.position.copy(oldPos);
    this.camera.lookAt(oldTarget);
    this.controls.dispose();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.copy(oldTarget);
    this.controls.mouseButtons = {
      LEFT: null,
      MIDDLE: THREE.MOUSE.PAN,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    this.renderPass.camera = this.camera;

    // Update transform controls camera
    this.transformControls.camera = this.camera;
  }

  public setDarkMode(d: boolean) {
    this.scene.background = new THREE.Color(d ? 0x1a1a1a : 0xf0f0f0);
  }
  public setModifiers(shift: boolean, alt: boolean) {
    if (this.isShiftDown !== shift || this.isAltDown !== alt) {
      this.isShiftDown = shift;
      this.isAltDown = alt;
      this.brushPreviewMesh.visible = false;
    }
  }
  public takeScreenshot(cb: any) {
    this.renderScene();
    cb(this.renderer.domElement.toDataURL("image/png"));
  }
  public clearAll() {
    this.chunkManager.clear();
    this.history = [];
    this.historyIndex = -1;
  }

  public addVoxelMesh(d: VoxelData) {
    // Chunk manager setVoxel is safe, but ensure data is valid
    if (d && typeof d.x === "number") {
      this.chunkManager.setVoxel(d.x, d.y, d.z, d);
    }
    return null;
  }

  private initThumbnailGenerator() {
    this.thumbScene = new THREE.Scene();
    // @ts-ignore
    this.thumbScene.background = null;
    this.thumbCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    this.thumbCamera.position.set(1.5, 1.2, 1.5);
    this.thumbCamera.lookAt(0, 0, 0);
    this.thumbRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.thumbRenderer.setSize(64, 64);
    this.thumbRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    const pmremGenerator = new PMREMGenerator(this.thumbRenderer);
    this.thumbScene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(1, 1, 2);
    this.thumbScene.add(dirLight);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-1, -1, -1);
    this.thumbScene.add(backLight);
    const geo = new THREE.BoxGeometry(1, 1, 1);
    this.thumbMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial());
    this.thumbScene.add(this.thumbMesh);
  }

  public generateMaterialThumbnail(m: VoxelMaterial): string | null {
    if (
      !this.thumbRenderer ||
      !this.thumbMesh ||
      !this.thumbScene ||
      !this.thumbCamera
    )
      return null;
    const mat = this.thumbMesh.material as THREE.MeshStandardMaterial;
    mat.color.set(m.color);
    mat.emissive.set(m.emissive);
    mat.emissiveIntensity = m.emissiveIntensity;
    mat.roughness = m.roughness;
    mat.metalness = m.metalness;
    mat.opacity = m.opacity;
    mat.transparent = m.opacity < 1;
    mat.needsUpdate = true;
    this.thumbRenderer.clear();
    this.thumbRenderer.render(this.thumbScene, this.thumbCamera);
    return this.thumbRenderer.domElement.toDataURL();
  }

  public exportVoxels() {
    const voxels: VoxelData[] = [];
    this.chunkManager.chunks.forEach((chunk, key) => {
      const [cx, cy, cz] = key.split(",").map(Number);
      const chunkSize = 8;
      chunk.data.forEach((mat, idx) => {
        if (mat) {
          const lx = idx % chunkSize;
          const ly = Math.floor(idx / chunkSize) % chunkSize;
          const lz = Math.floor(idx / (chunkSize * chunkSize));
          voxels.push({
            x: cx * chunkSize + lx,
            y: cy * chunkSize + ly,
            z: cz * chunkSize + lz,
            ...mat,
          });
        }
      });
    });
    const exportData = {
      version: 1,
      voxels: voxels,
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
  }

  private updateBoxPreview(start: THREE.Vector3, end: THREE.Vector3) {
    this.boxPreviewMesh.visible = true;
    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const maxY = Math.max(start.y, end.y);
    const minZ = Math.min(start.z, end.z);
    const maxZ = Math.max(start.z, end.z);

    const snap = this.gridSnap;
    const w = (maxX - minX + snap) * this.voxelSize;
    const h = (maxY - minY + snap) * this.voxelSize;
    const d = (maxZ - minZ + snap) * this.voxelSize;

    this.boxPreviewMesh.scale.set(w, h, d);
    this.boxPreviewMesh.position.set(
      minX * this.voxelSize + w / 2,
      minY * this.voxelSize + h / 2,
      minZ * this.voxelSize + d / 2
    );
  }

  private updateSelectionPreview(start: THREE.Vector3, end: THREE.Vector3) {
    this.selectionPreviewBox.visible = true;
    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const maxY = Math.max(start.y, end.y);
    const minZ = Math.min(start.z, end.z);
    const maxZ = Math.max(start.z, end.z);

    const snap = this.gridSnap;
    const w = (maxX - minX + snap) * this.voxelSize;
    const h = (maxY - minY + snap) * this.voxelSize;
    const d = (maxZ - minZ + snap) * this.voxelSize;

    this.selectionPreviewBox.scale.set(w, h, d);
    this.selectionPreviewBox.position.set(
      minX * this.voxelSize + w / 2,
      minY * this.voxelSize + h / 2,
      minZ * this.voxelSize + d / 2
    );
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
      this.orthoCamera.left = (-s * (w / h)) / 2;
      this.orthoCamera.right = (s * (w / h)) / 2;
      this.orthoCamera.top = s / 2;
      this.orthoCamera.bottom = -s / 2;
      this.orthoCamera.updateProjectionMatrix();
    }
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
    this.updateFXAA();
  }

  private updateFXAA() {
    if (this.fxaaPass) {
      const pixelRatio = this.renderer.getPixelRatio();
      this.fxaaPass.material.uniforms["resolution"].value.x =
        1 / (window.innerWidth * pixelRatio);
      this.fxaaPass.material.uniforms["resolution"].value.y =
        1 / (window.innerHeight * pixelRatio);
    }
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.chunkManager.update();
    this.selectionBox.visible = this.selectionGroup.children.length > 0;
    if (this.selectionBox.visible) this.selectionBox.update();

    this.renderScene();
  }

  private renderScene() {
    this.composer.render();
  }
  public dispose() {
    this.controls.dispose();
    this.renderer.dispose();
    this.transformControls.dispose();
    this.thumbRenderer?.dispose();
    window.removeEventListener("resize", this.onWindowResize);
  }
}
