import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { PMREMGenerator } from "three";
import {
  HEX_RADIUS,
  PRISM_HEIGHT,
  HEX_WIDTH,
  ROW_STEP,
  type HexCellData,
  type HexMaterial,
  type HexEngineCallbacks,
  type HexHistoryAction,
  type HexShape,
  type HexTool,
} from "./types";

// --- Matemática hexagonal (pointy-top, offset odd-r, igual que jugarPartida) ---

const parity = (n: number) => ((n % 2) + 2) % 2;

function cellKey(col: number, row: number, y: number) {
  return `${col},${row},${y}`;
}

function hexCenter(col: number, row: number, y: number): THREE.Vector3 {
  return new THREE.Vector3(
    col * HEX_WIDTH + parity(row) * (HEX_WIDTH / 2),
    y * PRISM_HEIGHT,
    row * ROW_STEP
  );
}

function offsetToAxial(col: number, row: number) {
  return { q: col - (row - parity(row)) / 2, r: row };
}

function axialToOffset(q: number, r: number) {
  return { col: q + (r - parity(r)) / 2, row: r };
}

function worldToCell(x: number, z: number) {
  const qf = ((Math.sqrt(3) / 3) * x - z / 3) / HEX_RADIUS;
  const rf = ((2 / 3) * z) / HEX_RADIUS;
  // Redondeo cúbico
  const sf = -qf - rf;
  let q = Math.round(qf);
  let r = Math.round(rf);
  const s = Math.round(sf);
  const dq = Math.abs(q - qf);
  const dr = Math.abs(r - rf);
  const ds = Math.abs(s - sf);
  if (dq > dr && dq > ds) q = -r - s;
  else if (dr > ds) r = -q - s;
  return axialToOffset(q, r);
}

const AXIAL_DIRS: [number, number][] = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

// Prisma con base en y=0 y tapa en y=PRISM_HEIGHT, centrado en el eje del hexágono.
// "half" es media cara: el hexágono cortado por la diagonal entre dos vértices opuestos.
function buildPrismGeometry(shape: HexShape): THREE.BufferGeometry {
  const pts: THREE.Vector2[] = [];
  const last = shape === "full" ? 5 : 3;
  for (let k = 0; k <= last; k++) {
    const a = (k * Math.PI) / 3;
    pts.push(
      new THREE.Vector2(HEX_RADIUS * Math.sin(a), HEX_RADIUS * Math.cos(a))
    );
  }
  const geo = new THREE.ExtrudeGeometry(new THREE.Shape(pts), {
    depth: PRISM_HEIGHT,
    bevelEnabled: false,
  });
  // El shape vive en XY y se extruye en +Z: lo giramos para que la
  // sección quede en XZ y la extrusión sea vertical (+Y).
  geo.rotateX(-Math.PI / 2);
  return geo;
}

interface Hit {
  object: THREE.Object3D;
  point: THREE.Vector3;
  normal: THREE.Vector3;
  instanceId?: number;
}

interface CellTarget {
  col: number;
  row: number;
  y: number;
}

const UP = new THREE.Vector3(0, 1, 0);

export class HexEngine {
  private container: HTMLElement;
  private callbacks: HexEngineCallbacks;

  // Estado
  public currentLevel: number = 0;
  public currentRot: number = 0;
  private currentTool: HexTool = "prisma";
  private isShiftDown: boolean = false;
  private isAltDown: boolean = false;
  private currentMaterial: HexMaterial = {
    color: "#feb74c",
    emissive: "#000000",
    metalness: 0,
    roughness: 1,
    emissiveIntensity: 0,
  };

  // Datos
  private cells: Map<string, HexCellData> = new Map();
  private history: HexHistoryAction[] = [];
  private historyIndex: number = -1;

  // Trazo en curso
  private isPainting: boolean = false;
  private strokeBatch: HexHistoryAction = { added: [], removed: [] };
  private strokeApplied: Set<string> = new Set();
  // Nivel fijado por el primer prisma del trazo: al arrastrar no se trepa
  // sobre los prismas recién colocados.
  private strokeY: number | null = null;

  // Three.js
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private fxaaPass!: ShaderPass;
  private controls!: OrbitControls;
  private raycaster!: THREE.Raycaster;
  private pointer!: THREE.Vector2;
  private dummy = new THREE.Object3D();
  private animationId: number = 0;

  // Objetos
  private plane!: THREE.Mesh;
  private gridLines!: THREE.LineSegments;
  private fullGeo!: THREE.BufferGeometry;
  private halfGeo!: THREE.BufferGeometry;
  private cellMaterial!: THREE.MeshStandardMaterial;
  private fullMesh!: THREE.InstancedMesh;
  private halfMesh!: THREE.InstancedMesh;
  private fullCapacity: number = 0;
  private halfCapacity: number = 0;
  private fullKeys: string[] = [];
  private halfKeys: string[] = [];
  private fullGhost!: THREE.Mesh;
  private halfGhost!: THREE.Mesh;

  // Miniaturas de material
  private thumbScene?: THREE.Scene;
  private thumbCamera?: THREE.PerspectiveCamera;
  private thumbRenderer?: THREE.WebGLRenderer;
  private thumbMesh?: THREE.Mesh;

  private onPointerDownBound = this.onPointerDown.bind(this);
  private onPointerMoveBound = this.onPointerMove.bind(this);
  private onPointerUpBound = this.onPointerUp.bind(this);
  private onWindowResizeBound = this.onWindowResize.bind(this);

  constructor(container: HTMLElement, callbacks: HexEngineCallbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.init();
    this.initThumbnailGenerator();
    this.animate();
  }

  private init() {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 2000);
    this.camera.position.set(35, 45, 70);

    this.scene = new THREE.Scene();
    this.scene.environmentIntensity = 0.3;

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

    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      { type: THREE.HalfFloatType, format: THREE.RGBAFormat }
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
    this.fxaaPass = new ShaderPass(FXAAShader);
    this.updateFXAA();
    this.composer.addPass(this.fxaaPass);

    const pmremGenerator = new PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(40, 80, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    dirLight.shadow.camera.left = -80;
    dirLight.shadow.camera.right = 80;
    dirLight.shadow.camera.top = 80;
    dirLight.shadow.camera.bottom = -80;
    dirLight.shadow.camera.far = 300;
    this.scene.add(dirLight);

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.createWorldObjects();

    const dom = this.renderer.domElement;
    dom.addEventListener("pointerdown", this.onPointerDownBound);
    dom.addEventListener("pointermove", this.onPointerMoveBound);
    dom.addEventListener("pointerup", this.onPointerUpBound);
    dom.addEventListener("contextmenu", (e) => e.preventDefault());
    window.addEventListener("resize", this.onWindowResizeBound);
  }

  private createWorldObjects() {
    // Plano invisible para raycast (se eleva con el nivel)
    const planeGeo = new THREE.PlaneGeometry(5000, 5000);
    planeGeo.rotateX(-Math.PI / 2);
    this.plane = new THREE.Mesh(
      planeGeo,
      new THREE.MeshBasicMaterial({ visible: false })
    );
    this.scene.add(this.plane);

    // Rejilla hexagonal visible
    const positions: number[] = [];
    const range = 14;
    for (let row = -range; row <= range; row++) {
      for (let col = -range; col <= range; col++) {
        const c = hexCenter(col, row, 0);
        for (let k = 0; k < 6; k++) {
          const a1 = (k * Math.PI) / 3;
          const a2 = (((k + 1) % 6) * Math.PI) / 3;
          positions.push(
            c.x + HEX_RADIUS * Math.sin(a1),
            0,
            c.z + HEX_RADIUS * Math.cos(a1),
            c.x + HEX_RADIUS * Math.sin(a2),
            0,
            c.z + HEX_RADIUS * Math.cos(a2)
          );
        }
      }
    }
    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this.gridLines = new THREE.LineSegments(
      gridGeo,
      new THREE.LineBasicMaterial({
        color: 0x888888,
        transparent: true,
        opacity: 0.35,
      })
    );
    this.gridLines.position.y = 0.03;
    this.scene.add(this.gridLines);

    // Geometrías base y mallas instanciadas
    this.fullGeo = buildPrismGeometry("full");
    this.halfGeo = buildPrismGeometry("half");
    this.cellMaterial = this.createCustomMaterial();
    this.fullMesh = this.makeInstancedMesh(this.fullGeo, 1024);
    this.fullCapacity = 1024;
    this.halfMesh = this.makeInstancedMesh(this.halfGeo, 1024);
    this.halfCapacity = 1024;

    // Fantasmas de previsualización
    const ghostMat = () =>
      new THREE.MeshBasicMaterial({
        color: 0x44aaff,
        opacity: 0.45,
        transparent: true,
        depthTest: false,
      });
    this.fullGhost = new THREE.Mesh(this.fullGeo, ghostMat());
    this.halfGhost = new THREE.Mesh(this.halfGeo, ghostMat());
    this.fullGhost.visible = false;
    this.halfGhost.visible = false;
    this.scene.add(this.fullGhost, this.halfGhost);
  }

  // Material con atributos por instancia (mismo patrón que el editor de vóxeles)
  private createCustomMaterial() {
    const mat = new THREE.MeshStandardMaterial({
      side: THREE.FrontSide,
      shadowSide: THREE.BackSide,
    });
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = `
        attribute float roughness;
        attribute float metalness;
        attribute float emissiveIntensity;
        attribute vec3 emissiveColor;
        varying float vRoughness;
        varying float vMetalness;
        varying float vEmissiveIntensity;
        varying vec3 vEmissiveColor;
        ${shader.vertexShader}
      `.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>
        vRoughness = roughness;
        vMetalness = metalness;
        vEmissiveIntensity = emissiveIntensity;
        vEmissiveColor = emissiveColor;
      `
      );
      shader.fragmentShader = `
        varying float vRoughness;
        varying float vMetalness;
        varying float vEmissiveIntensity;
        varying vec3 vEmissiveColor;
        ${shader.fragmentShader}
      `
        .replace(
          "#include <roughnessmap_fragment>",
          `float roughnessFactor = vRoughness;`
        )
        .replace(
          "#include <metalnessmap_fragment>",
          `float metalnessFactor = vMetalness;`
        )
        .replace(
          "#include <emissivemap_fragment>",
          `
          vec3 emissiveColor = vEmissiveColor * vEmissiveIntensity;
          totalEmissiveRadiance += emissiveColor;
          `
        );
    };
    return mat;
  }

  private makeInstancedMesh(base: THREE.BufferGeometry, capacity: number) {
    const geo = base.clone();
    geo.setAttribute(
      "roughness",
      new THREE.InstancedBufferAttribute(new Float32Array(capacity), 1)
    );
    geo.setAttribute(
      "metalness",
      new THREE.InstancedBufferAttribute(new Float32Array(capacity), 1)
    );
    geo.setAttribute(
      "emissiveIntensity",
      new THREE.InstancedBufferAttribute(new Float32Array(capacity), 1)
    );
    geo.setAttribute(
      "emissiveColor",
      new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3)
    );
    const mesh = new THREE.InstancedMesh(geo, this.cellMaterial, capacity);
    // Pre-reservamos el color por instancia con el tamaño de la capacidad
    // (setColorAt lo crearía con el tamaño de count, que aquí empieza en 0).
    mesh.instanceColor = new THREE.InstancedBufferAttribute(
      new Float32Array(capacity * 3),
      3
    );
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.count = 0;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    this.scene.add(mesh);
    return mesh;
  }

  private disposeInstancedMesh(mesh: THREE.InstancedMesh) {
    this.scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.dispose();
  }

  private rebuildMeshes() {
    const fulls: [string, HexCellData][] = [];
    const halves: [string, HexCellData][] = [];
    this.cells.forEach((c, k) => {
      if (c.shape === "full") fulls.push([k, c]);
      else halves.push([k, c]);
    });

    if (fulls.length > this.fullCapacity) {
      this.disposeInstancedMesh(this.fullMesh);
      while (this.fullCapacity < fulls.length) this.fullCapacity *= 2;
      this.fullMesh = this.makeInstancedMesh(this.fullGeo, this.fullCapacity);
    }
    if (halves.length > this.halfCapacity) {
      this.disposeInstancedMesh(this.halfMesh);
      while (this.halfCapacity < halves.length) this.halfCapacity *= 2;
      this.halfMesh = this.makeInstancedMesh(this.halfGeo, this.halfCapacity);
    }

    this.fullKeys = this.fillMesh(this.fullMesh, fulls);
    this.halfKeys = this.fillMesh(this.halfMesh, halves);
  }

  private fillMesh(
    mesh: THREE.InstancedMesh,
    list: [string, HexCellData][]
  ): string[] {
    const rough = mesh.geometry.getAttribute(
      "roughness"
    ) as THREE.InstancedBufferAttribute;
    const metal = mesh.geometry.getAttribute(
      "metalness"
    ) as THREE.InstancedBufferAttribute;
    const emInt = mesh.geometry.getAttribute(
      "emissiveIntensity"
    ) as THREE.InstancedBufferAttribute;
    const emCol = mesh.geometry.getAttribute(
      "emissiveColor"
    ) as THREE.InstancedBufferAttribute;
    const color = new THREE.Color();
    const eColor = new THREE.Color();

    list.forEach(([, c], i) => {
      this.dummy.position.copy(hexCenter(c.col, c.row, c.y));
      this.dummy.rotation.set(
        0,
        c.shape === "half" ? (c.rot * Math.PI) / 3 : 0,
        0
      );
      this.dummy.scale.set(1, 1, 1);
      this.dummy.updateMatrix();
      mesh.setMatrixAt(i, this.dummy.matrix);
      mesh.setColorAt(i, color.set(c.color));
      rough.setX(i, c.roughness);
      metal.setX(i, c.metalness);
      emInt.setX(i, c.emissiveIntensity);
      eColor.set(c.emissive);
      emCol.setXYZ(i, eColor.r, eColor.g, eColor.b);
    });

    mesh.count = list.length;
    // Three.js cachea la bounding sphere del InstancedMesh la primera vez que
    // la calcula (aquí, con count=0 quedaría vacía para siempre): recalcular
    // en cada rebuild para que el raycast detecte los prismas y se pueda
    // colocar encima de ellos.
    mesh.computeBoundingSphere();
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    rough.needsUpdate = true;
    metal.needsUpdate = true;
    emInt.needsUpdate = true;
    emCol.needsUpdate = true;
    return list.map(([k]) => k);
  }

  // --- ENTRADA ---

  private onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    const hit = this.raycast(event);
    if (!hit) return;

    if (this.currentTool === "picker" || this.isAltDown) {
      this.pickMaterialAt(hit);
      return;
    }

    this.isPainting = true;
    this.strokeBatch = { added: [], removed: [] };
    this.strokeApplied = new Set();
    this.strokeY = null;
    const target = this.getTarget(hit);
    if (target) this.applyOp(target);
  }

  private onPointerMove(event: PointerEvent) {
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    const hit = this.raycast(event);
    this.updateGhost(hit);
    if (this.isPainting && hit) {
      const target = this.getTarget(hit);
      if (target) this.applyOp(target);
    }
  }

  private onPointerUp() {
    if (!this.isPainting) return;
    this.isPainting = false;
    if (
      this.strokeBatch.added.length > 0 ||
      this.strokeBatch.removed.length > 0
    ) {
      this.recordAction({
        added: [...this.strokeBatch.added],
        removed: [...this.strokeBatch.removed],
      });
      if (this.callbacks.onActionRecord) this.callbacks.onActionRecord();
    }
    this.strokeBatch = { added: [], removed: [] };
    this.strokeApplied.clear();
  }

  private raycast(event: MouseEvent): Hit | null {
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const objects: THREE.Object3D[] = [this.plane];
    if (this.fullMesh.count > 0) objects.push(this.fullMesh);
    if (this.halfMesh.count > 0) objects.push(this.halfMesh);
    const hits = this.raycaster.intersectObjects(objects, false);
    const h = hits[0];
    if (!h || !h.face) return null;
    return {
      object: h.object,
      point: h.point,
      normal: h.face.normal.clone(),
      instanceId: h.instanceId,
    };
  }

  private getCellFromHit(hit: Hit): HexCellData | null {
    if (hit.object === this.plane || hit.instanceId === undefined) return null;
    const keys = hit.object === this.fullMesh ? this.fullKeys : this.halfKeys;
    const key = keys[hit.instanceId];
    if (!key) return null;
    return this.cells.get(key) ?? null;
  }

  private getTarget(hit: Hit): CellTarget | null {
    if (hit.object === this.plane) {
      const { col, row } = worldToCell(hit.point.x, hit.point.z);
      return { col, row, y: this.currentLevel };
    }

    const cell = this.getCellFromHit(hit);
    if (!cell) return null;

    // Al borrar, el objetivo es la propia celda golpeada
    if (this.isShiftDown) return { col: cell.col, row: cell.row, y: cell.y };

    // La normal viene en espacio local de la geometría: aplicar la rotación de la instancia
    const n = hit.normal.clone();
    if (cell.shape === "half") n.applyAxisAngle(UP, (cell.rot * Math.PI) / 3);

    if (n.y > 0.5) return { col: cell.col, row: cell.row, y: cell.y + 1 };
    if (n.y < -0.5) return { col: cell.col, row: cell.row, y: cell.y - 1 };

    // Cara lateral: el vecino mejor alineado con la normal
    const center = hexCenter(cell.col, cell.row, cell.y);
    const { q, r } = offsetToAxial(cell.col, cell.row);
    let best: { col: number; row: number } | null = null;
    let bestDot = -Infinity;
    for (const [dq, dr] of AXIAL_DIRS) {
      const o = axialToOffset(q + dq, r + dr);
      const dir = hexCenter(o.col, o.row, cell.y).sub(center).normalize();
      const dot = dir.dot(n);
      if (dot > bestDot) {
        bestDot = dot;
        best = o;
      }
    }
    return best ? { col: best.col, row: best.row, y: cell.y } : null;
  }

  private sameCell(a: HexCellData, b: HexCellData): boolean {
    return (
      a.shape === b.shape &&
      a.rot === b.rot &&
      a.color === b.color &&
      a.emissive === b.emissive &&
      a.metalness === b.metalness &&
      a.roughness === b.roughness &&
      a.emissiveIntensity === b.emissiveIntensity
    );
  }

  private applyOp(target: CellTarget) {
    if (this.strokeY === null) this.strokeY = target.y;
    else if (target.y !== this.strokeY) return;
    const key = cellKey(target.col, target.row, target.y);
    if (this.strokeApplied.has(key)) return;
    const existing = this.cells.get(key);

    if (this.isShiftDown) {
      if (!existing) return;
      this.strokeBatch.removed.push(existing);
      this.cells.delete(key);
    } else {
      const shape: HexShape = this.currentTool === "media" ? "half" : "full";
      const cell: HexCellData = {
        col: target.col,
        row: target.row,
        y: target.y,
        shape,
        rot: shape === "half" ? this.currentRot : 0,
        ...this.currentMaterial,
      };
      if (existing && this.sameCell(existing, cell)) return;
      if (existing) this.strokeBatch.removed.push(existing);
      this.cells.set(key, cell);
      this.strokeBatch.added.push(cell);
    }

    this.strokeApplied.add(key);
    this.rebuildMeshes();
    if (this.callbacks.onCellCountChange)
      this.callbacks.onCellCountChange(this.cells.size);
  }

  private pickMaterialAt(hit: Hit) {
    const cell = this.getCellFromHit(hit);
    if (cell && this.callbacks.onMaterialPick) {
      this.callbacks.onMaterialPick({
        color: cell.color,
        emissive: cell.emissive,
        metalness: cell.metalness,
        roughness: cell.roughness,
        emissiveIntensity: cell.emissiveIntensity,
      });
    }
  }

  private updateGhost(hit: Hit | null) {
    this.fullGhost.visible = false;
    this.halfGhost.visible = false;
    if (!hit || this.currentTool === "picker" || this.isAltDown) return;

    const target = this.getTarget(hit);
    if (!target) return;
    // Durante un trazo, no anunciar posiciones fuera del nivel fijado
    if (this.isPainting && this.strokeY !== null && target.y !== this.strokeY)
      return;

    if (this.isShiftDown) {
      const cell = this.cells.get(cellKey(target.col, target.row, target.y));
      if (!cell) return;
      const ghost = cell.shape === "full" ? this.fullGhost : this.halfGhost;
      ghost.visible = true;
      ghost.position.copy(hexCenter(cell.col, cell.row, cell.y));
      ghost.rotation.y = cell.shape === "half" ? (cell.rot * Math.PI) / 3 : 0;
      (ghost.material as THREE.MeshBasicMaterial).color.setHex(0xff4444);
    } else {
      const shape: HexShape = this.currentTool === "media" ? "half" : "full";
      const ghost = shape === "full" ? this.fullGhost : this.halfGhost;
      ghost.visible = true;
      ghost.position.copy(hexCenter(target.col, target.row, target.y));
      ghost.rotation.y = shape === "half" ? (this.currentRot * Math.PI) / 3 : 0;
      (ghost.material as THREE.MeshBasicMaterial).color.setHex(0x44aaff);
    }
  }

  // --- HISTORIAL ---

  private recordAction(action: HexHistoryAction) {
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
  }

  public undo() {
    if (this.historyIndex < 0) return;
    const action = this.history[this.historyIndex]!;
    action.added.forEach((c) => this.cells.delete(cellKey(c.col, c.row, c.y)));
    action.removed.forEach((c) =>
      this.cells.set(cellKey(c.col, c.row, c.y), c)
    );
    this.historyIndex--;
    this.rebuildMeshes();
    if (this.callbacks.onHistoryChange)
      this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
    if (this.callbacks.onCellCountChange)
      this.callbacks.onCellCountChange(this.cells.size);
  }

  public redo() {
    if (this.historyIndex >= this.history.length - 1) return;
    this.historyIndex++;
    const action = this.history[this.historyIndex]!;
    action.removed.forEach((c) =>
      this.cells.delete(cellKey(c.col, c.row, c.y))
    );
    action.added.forEach((c) => this.cells.set(cellKey(c.col, c.row, c.y), c));
    this.rebuildMeshes();
    if (this.callbacks.onHistoryChange)
      this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
    if (this.callbacks.onCellCountChange)
      this.callbacks.onCellCountChange(this.cells.size);
  }

  // --- API PÚBLICA ---

  public setTool(tool: HexTool) {
    this.currentTool = tool;
  }

  public setRot(rot: number) {
    this.currentRot = ((rot % 6) + 6) % 6;
  }

  public rotate(d: number) {
    this.setRot(this.currentRot + d);
  }

  public updateMaterial(m: HexMaterial) {
    this.currentMaterial = { ...m };
  }

  public setModifiers(shift: boolean, alt: boolean) {
    this.isShiftDown = shift;
    this.isAltDown = alt;
  }

  public adjustLevel(d: number) {
    this.currentLevel += d;
    const y = this.currentLevel * PRISM_HEIGHT;
    this.plane.position.y = y;
    this.gridLines.position.y = y + 0.03;
  }

  public clearAll() {
    this.cells.clear();
    this.history = [];
    this.historyIndex = -1;
    this.rebuildMeshes();
    if (this.callbacks.onHistoryChange)
      this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
    if (this.callbacks.onCellCountChange)
      this.callbacks.onCellCountChange(this.cells.size);
  }

  public loadCells(list: Partial<HexCellData>[]) {
    this.cells.clear();
    list.forEach((c) => {
      if (
        typeof c.col !== "number" ||
        typeof c.row !== "number" ||
        typeof c.y !== "number"
      )
        return;
      const cell: HexCellData = {
        col: c.col,
        row: c.row,
        y: c.y,
        shape: c.shape === "half" ? "half" : "full",
        rot: typeof c.rot === "number" ? ((c.rot % 6) + 6) % 6 : 0,
        color: c.color ?? "#ffffff",
        emissive: c.emissive ?? "#000000",
        metalness: c.metalness ?? 0,
        roughness: c.roughness ?? 1,
        emissiveIntensity: c.emissiveIntensity ?? 0,
      };
      this.cells.set(cellKey(cell.col, cell.row, cell.y), cell);
    });
    this.history = [];
    this.historyIndex = -1;
    this.rebuildMeshes();
    if (this.callbacks.onHistoryChange)
      this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
    if (this.callbacks.onCellCountChange)
      this.callbacks.onCellCountChange(this.cells.size);
  }

  public exportHexes() {
    const exportData = {
      version: 1,
      type: "hex-prisma",
      hexRadius: HEX_RADIUS,
      prismHeight: PRISM_HEIGHT,
      timestamp: new Date().toISOString(),
      cells: Array.from(this.cells.values()),
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const url = URL.createObjectURL(
      new Blob([dataStr], { type: "application/json" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `hex-model-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  public takeScreenshot(cb: (url: string) => void) {
    this.composer.render();
    cb(this.renderer.domElement.toDataURL("image/png"));
  }

  public setDarkMode(d: boolean) {
    this.scene.background = new THREE.Color(d ? 0x1a1a1a : 0xf0f0f0);
  }

  // --- Miniaturas de material ---

  private initThumbnailGenerator() {
    this.thumbScene = new THREE.Scene();
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
    const geo = new THREE.CylinderGeometry(0.6, 0.6, 0.7, 6);
    this.thumbMesh = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({ flatShading: true })
    );
    this.thumbScene.add(this.thumbMesh);
  }

  public generateMaterialThumbnail(m: HexMaterial): string | null {
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
    mat.needsUpdate = true;
    this.thumbRenderer.clear();
    this.thumbRenderer.render(this.thumbScene, this.thumbCamera);
    return this.thumbRenderer.domElement.toDataURL();
  }

  // --- BUCLE ---

  private onWindowResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
    this.updateFXAA();
  }

  private updateFXAA() {
    const resolution = this.fxaaPass?.material.uniforms["resolution"];
    if (resolution) {
      const pixelRatio = this.renderer.getPixelRatio();
      resolution.value.x = 1 / (window.innerWidth * pixelRatio);
      resolution.value.y = 1 / (window.innerHeight * pixelRatio);
    }
  }

  private animate() {
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.composer.render();
  }

  public dispose() {
    cancelAnimationFrame(this.animationId);
    const dom = this.renderer.domElement;
    dom.removeEventListener("pointerdown", this.onPointerDownBound);
    dom.removeEventListener("pointermove", this.onPointerMoveBound);
    dom.removeEventListener("pointerup", this.onPointerUpBound);
    window.removeEventListener("resize", this.onWindowResizeBound);
    this.controls.dispose();
    this.renderer.dispose();
    this.thumbRenderer?.dispose();
  }
}
