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
  WALL_THICKNESS,
  WALL_THICKNESS_THICK,
  WALL_SNAP,
  type HexCellData,
  type HexWallData,
  type HexMaterial,
  type HexEngineCallbacks,
  type HexHistoryAction,
  type HexShape,
  type HexTool,
  type MuroMode,
} from "./types";

// --- Matemática hexagonal (pointy-top, offset odd-r, igual que jugarPartida) ---

const parity = (n: number) => ((n % 2) + 2) % 2;

function cellKey(col: number, row: number, y: number) {
  return `${col},${row},${y}`;
}

// Clave de muro independiente del orden de los extremos.
function wallKey(
  x0: number,
  z0: number,
  x1: number,
  z1: number,
  y: number
) {
  const f = (n: number) => n.toFixed(2);
  const a = `${f(x0)},${f(z0)}`;
  const b = `${f(x1)},${f(z1)}`;
  const [p, q] = a <= b ? [a, b] : [b, a];
  return `${p}|${q}|${y}`;
}

function wallKeyOf(w: HexWallData) {
  return wallKey(w.x0, w.z0, w.x1, w.z1, w.y);
}

const snapCoord = (n: number) => Math.round(n / WALL_SNAP) * WALL_SNAP;

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

// Redondeo cúbico de coordenadas axiales fraccionarias al hexágono más cercano.
function axialRound(qf: number, rf: number) {
  const sf = -qf - rf;
  let q = Math.round(qf);
  let r = Math.round(rf);
  const s = Math.round(sf);
  const dq = Math.abs(q - qf);
  const dr = Math.abs(r - rf);
  const ds = Math.abs(s - sf);
  if (dq > dr && dq > ds) q = -r - s;
  else if (dr > ds) r = -q - s;
  return { q, r };
}

// Línea recta de hexágonos entre dos celdas offset (interpolación en cubo).
function hexLine(
  c0: number,
  r0: number,
  c1: number,
  r1: number
): { col: number; row: number }[] {
  const a = offsetToAxial(c0, r0);
  const b = offsetToAxial(c1, r1);
  const dist =
    (Math.abs(a.q - b.q) +
      Math.abs(a.q + a.r - b.q - b.r) +
      Math.abs(a.r - b.r)) /
    2;
  const out: { col: number; row: number }[] = [];
  const n = Math.max(1, dist);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const { q, r } = axialRound(a.q + (b.q - a.q) * t, a.r + (b.r - a.r) * t);
    out.push(axialToOffset(q, r));
  }
  return out;
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
  // Altura (en niveles) que extruye la herramienta "cubo".
  public boxHeight: number = 3;
  // Alto (en niveles) de los muros rectos.
  public wallHeight: number = 1;
  private currentTool: HexTool = "prisma";
  private muroMode: MuroMode = "hex";
  private isShiftDown: boolean = false;
  private isAltDown: boolean = false;
  private isCtrlDown: boolean = false;
  private currentMaterial: HexMaterial = {
    color: "#feb74c",
    emissive: "#000000",
    metalness: 0,
    roughness: 1,
    emissiveIntensity: 0,
  };

  // Datos
  private cells: Map<string, HexCellData> = new Map();
  private walls: Map<string, HexWallData> = new Map();
  private history: HexHistoryAction[] = [];
  private historyIndex: number = -1;

  // Trazo de muro recto en curso (punto de inicio en el plano)
  private wallStart: { x: number; z: number } | null = null;
  private wallStrokeAdded: HexWallData[] = [];
  private wallStrokeRemoved: HexWallData[] = [];

  // Trazo en curso
  private isPainting: boolean = false;
  private strokeBatch: HexHistoryAction = { added: [], removed: [] };
  private strokeApplied: Set<string> = new Set();
  // Nivel fijado por el primer prisma del trazo: al arrastrar no se trepa
  // sobre los prismas recién colocados.
  private strokeY: number | null = null;

  // Herramientas de forma (área / muro): se previsualiza en vivo desde una
  // celda de inicio fija hasta la celda bajo el cursor y se confirma al soltar.
  private shapeStart: CellTarget | null = null;
  // Clave -> celda original antes de la previsualización (null si estaba vacía).
  private shapePreview: Map<string, HexCellData | null> = new Map();

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

  // Muros rectos (losas finas)
  private wallGeo!: THREE.BufferGeometry;
  private wallMesh!: THREE.InstancedMesh;
  private wallCapacity: number = 0;
  private wallKeys: string[] = [];
  private wallGhost!: THREE.Mesh;

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

    // Muros rectos: caja unitaria centrada, escalada por instancia.
    this.wallGeo = new THREE.BoxGeometry(1, 1, 1);
    this.wallMesh = this.makeInstancedMesh(this.wallGeo, 256);
    this.wallCapacity = 256;
    this.wallGhost = new THREE.Mesh(this.wallGeo, ghostMat());
    this.wallGhost.visible = false;
    this.scene.add(this.wallGhost);
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

  private emitCount() {
    if (this.callbacks.onCellCountChange)
      this.callbacks.onCellCountChange(this.cells.size + this.walls.size);
  }

  // Coloca/orienta/escala un objeto como losa recta entre dos puntos del plano,
  // en pie sobre el nivel indicado, con alto (niveles) y grosor dados.
  private applyWallTransform(
    obj: THREE.Object3D,
    x0: number,
    z0: number,
    x1: number,
    z1: number,
    y: number,
    height: number,
    thickness: number
  ) {
    const dx = x1 - x0;
    const dz = z1 - z0;
    const len = Math.max(0.0001, Math.hypot(dx, dz));
    const h = Math.max(1, height) * PRISM_HEIGHT;
    obj.position.set((x0 + x1) / 2, y * PRISM_HEIGHT + h / 2, (z0 + z1) / 2);
    // El eje +Z local de la caja se alinea con la dirección del muro.
    obj.rotation.set(0, Math.atan2(dx, dz), 0);
    obj.scale.set(thickness, h, len);
  }

  private rebuildWallMesh() {
    const list = Array.from(this.walls.entries());
    if (list.length > this.wallCapacity) {
      this.disposeInstancedMesh(this.wallMesh);
      while (this.wallCapacity < list.length) this.wallCapacity *= 2;
      this.wallMesh = this.makeInstancedMesh(this.wallGeo, this.wallCapacity);
    }

    const mesh = this.wallMesh;
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

    list.forEach(([, w], i) => {
      this.applyWallTransform(
        this.dummy,
        w.x0,
        w.z0,
        w.x1,
        w.z1,
        w.y,
        w.height,
        w.thickness
      );
      this.dummy.updateMatrix();
      mesh.setMatrixAt(i, this.dummy.matrix);
      mesh.setColorAt(i, color.set(w.color));
      rough.setX(i, w.roughness);
      metal.setX(i, w.metalness);
      emInt.setX(i, w.emissiveIntensity);
      eColor.set(w.emissive);
      emCol.setXYZ(i, eColor.r, eColor.g, eColor.b);
    });

    mesh.count = list.length;
    mesh.computeBoundingSphere();
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    rough.needsUpdate = true;
    metal.needsUpdate = true;
    emInt.needsUpdate = true;
    emCol.needsUpdate = true;
    this.wallKeys = list.map(([k]) => k);
  }

  // --- ENTRADA ---

  private isWallMode(): boolean {
    return (
      this.currentTool === "muro" &&
      (this.muroMode === "recto" || this.muroMode === "grueso")
    );
  }

  private currentWallThickness(): number {
    return this.muroMode === "grueso" ? WALL_THICKNESS_THICK : WALL_THICKNESS;
  }

  private isShapeTool(): boolean {
    return (
      this.currentTool === "area" ||
      this.currentTool === "muro" ||
      this.currentTool === "cubo"
    );
  }

  private onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    if (this.currentTool === "picker" || this.isAltDown) {
      const hit = this.raycast(event);
      if (hit) this.pickMaterialAt(hit);
      return;
    }

    // Muro recto (losa fina): trazo con inicio fijo o borrado por arrastre.
    if (this.isWallMode()) {
      this.isPainting = true;
      this.wallStrokeAdded = [];
      this.wallStrokeRemoved = [];
      if (this.isShiftDown) {
        this.wallStart = null;
        this.wallGhost.visible = false;
        this.eraseWallAt(event);
      } else {
        this.wallStart = this.planePointFromPointer();
        this.wallGhost.visible = false;
      }
      return;
    }

    // Herramientas de forma: fijan la celda de inicio sobre el plano del nivel
    // actual y previsualizan hasta que se suelta el botón.
    if (this.isShapeTool()) {
      const pc = this.planeCellFromPointer();
      this.isPainting = true;
      this.shapePreview = new Map();
      this.strokeY = this.currentLevel;
      if (pc) {
        this.shapeStart = { col: pc.col, row: pc.row, y: this.currentLevel };
        this.updateShapePreview(pc);
      } else {
        this.shapeStart = null;
      }
      return;
    }

    const hit = this.raycast(event);
    if (!hit) return;
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

    if (this.isWallMode()) {
      if (this.isShiftDown) {
        this.wallGhost.visible = false;
        if (this.isPainting) this.eraseWallAt(event);
      } else if (this.isPainting && this.wallStart) {
        const raw = this.planePointFromPointer();
        this.updateWallGhost(raw && this.wallEndPoint(this.wallStart, raw));
      } else {
        this.wallGhost.visible = false;
      }
      return;
    }

    if (this.isShapeTool()) {
      const pc = this.planeCellFromPointer();
      this.updateShapeGhost(pc);
      if (this.isPainting && pc) this.updateShapePreview(pc);
      return;
    }

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

    if (this.isWallMode()) {
      if (!this.isShiftDown && this.wallStart) {
        const raw = this.planePointFromPointer();
        const end = raw ? this.wallEndPoint(this.wallStart, raw) : null;
        if (
          end &&
          Math.hypot(end.x - this.wallStart.x, end.z - this.wallStart.z) > 1e-3
        ) {
          this.placeWall(this.wallStart, end);
        }
      }
      this.wallGhost.visible = false;
      this.wallStart = null;
      this.commitWallStroke();
      return;
    }

    if (this.isShapeTool()) {
      this.commitShape();
      return;
    }

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

  // --- HERRAMIENTAS DE FORMA (ÁREA / MURO) ---

  // Celda bajo el cursor proyectada SOLO sobre el plano del nivel activo, para
  // que la previsualización no trepe sobre los prismas ya colocados.
  private planeCellFromPointer(): { col: number; row: number } | null {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObject(this.plane, false);
    const h = hits[0];
    if (!h) return null;
    return worldToCell(h.point.x, h.point.z);
  }

  // Punto libre sobre el plano (x,z), ajustado a la rejilla fina de muros.
  private planePointFromPointer(): { x: number; z: number } | null {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObject(this.plane, false);
    const h = hits[0];
    if (!h) return null;
    return { x: snapCoord(h.point.x), z: snapCoord(h.point.z) };
  }

  // Extremo del muro desde el inicio hasta el cursor. Con Ctrl fija el ángulo
  // a incrementos de 45° (permite ángulos rectos y diagonales).
  private wallEndPoint(
    start: { x: number; z: number },
    raw: { x: number; z: number }
  ): { x: number; z: number } {
    if (!this.isCtrlDown) return raw;
    const dx = raw.x - start.x;
    const dz = raw.z - start.z;
    const len = Math.hypot(dx, dz);
    if (len < 1e-4) return { ...start };
    const step = Math.PI / 4;
    const ang = Math.round(Math.atan2(dz, dx) / step) * step;
    return {
      x: snapCoord(start.x + Math.cos(ang) * len),
      z: snapCoord(start.z + Math.sin(ang) * len),
    };
  }

  // Lista de celdas (col,row) que abarca la forma entre inicio y fin.
  private computeShapeCells(
    start: CellTarget,
    end: { col: number; row: number }
  ): { col: number; row: number }[] {
    if (this.currentTool === "muro") {
      return hexLine(start.col, start.row, end.col, end.row);
    }
    // Área y cubo comparten la misma huella: rectángulo en coordenadas offset
    // (crece en vertical y horizontal). El cubo luego se extruye en altura.
    const minCol = Math.min(start.col, end.col);
    const maxCol = Math.max(start.col, end.col);
    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);
    const out: { col: number; row: number }[] = [];
    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        out.push({ col, row });
      }
    }
    return out;
  }

  // Restaura las celdas a su estado previo a la previsualización.
  private revertShapePreview() {
    this.shapePreview.forEach((orig, key) => {
      if (orig) this.cells.set(key, orig);
      else this.cells.delete(key);
    });
    this.shapePreview.clear();
  }

  private updateShapePreview(end: { col: number; row: number }) {
    this.revertShapePreview();
    if (!this.shapeStart) return;
    const baseY = this.strokeY ?? this.currentLevel;
    // El cubo extruye la huella hacia arriba tantos niveles como la altura.
    const yLevels: number[] = [];
    if (this.currentTool === "cubo") {
      const h = Math.max(1, Math.round(this.boxHeight));
      for (let i = 0; i < h; i++) yLevels.push(baseY + i);
    } else {
      yLevels.push(baseY);
    }
    const footprint = this.computeShapeCells(this.shapeStart, end);
    for (const { col, row } of footprint) {
      for (const y of yLevels) {
        const key = cellKey(col, row, y);
        const existing = this.cells.get(key) ?? null;
        if (this.isShiftDown) {
          if (!existing) continue;
          this.shapePreview.set(key, existing);
          this.cells.delete(key);
        } else {
          const cell: HexCellData = {
            col,
            row,
            y,
            shape: "full",
            rot: 0,
            ...this.currentMaterial,
          };
          if (existing && this.sameCell(existing, cell)) continue;
          this.shapePreview.set(key, existing);
          this.cells.set(key, cell);
        }
      }
    }
    this.rebuildMeshes();
    this.emitCount();
  }

  private commitShape() {
    const added: HexCellData[] = [];
    const removed: HexCellData[] = [];
    this.shapePreview.forEach((orig, key) => {
      const now = this.cells.get(key) ?? null;
      if (orig && (!now || !this.sameCell(orig, now))) removed.push(orig);
      if (now && (!orig || !this.sameCell(orig, now))) added.push(now);
    });
    this.shapePreview.clear();
    this.shapeStart = null;
    this.strokeY = null;
    if (added.length > 0 || removed.length > 0) {
      this.recordAction({ added, removed });
      if (this.callbacks.onActionRecord) this.callbacks.onActionRecord();
    }
  }

  private updateShapeGhost(pc: { col: number; row: number } | null) {
    this.fullGhost.visible = false;
    this.halfGhost.visible = false;
    // Durante el trazo la propia previsualización ya muestra la forma.
    if (this.isPainting || !pc) return;
    this.fullGhost.visible = true;
    this.fullGhost.position.copy(hexCenter(pc.col, pc.row, this.currentLevel));
    this.fullGhost.rotation.y = 0;
    (this.fullGhost.material as THREE.MeshBasicMaterial).color.setHex(
      this.isShiftDown ? 0xff4444 : 0x44aaff
    );
  }

  // --- MURO RECTO (LOSA) ---

  private updateWallGhost(pc: { x: number; z: number } | null | undefined) {
    if (!this.wallStart || !pc) {
      this.wallGhost.visible = false;
      return;
    }
    if (Math.hypot(pc.x - this.wallStart.x, pc.z - this.wallStart.z) < 1e-3) {
      this.wallGhost.visible = false;
      return;
    }
    this.wallGhost.visible = true;
    this.applyWallTransform(
      this.wallGhost,
      this.wallStart.x,
      this.wallStart.z,
      pc.x,
      pc.z,
      this.currentLevel,
      this.wallHeight,
      this.currentWallThickness()
    );
    (this.wallGhost.material as THREE.MeshBasicMaterial).color.setHex(0x44aaff);
  }

  private sameWall(a: HexWallData, b: HexWallData): boolean {
    return (
      a.height === b.height &&
      a.thickness === b.thickness &&
      a.color === b.color &&
      a.emissive === b.emissive &&
      a.metalness === b.metalness &&
      a.roughness === b.roughness &&
      a.emissiveIntensity === b.emissiveIntensity
    );
  }

  private placeWall(
    a: { x: number; z: number },
    b: { x: number; z: number }
  ) {
    const key = wallKey(a.x, a.z, b.x, b.z, this.currentLevel);
    const wall: HexWallData = {
      x0: a.x,
      z0: a.z,
      x1: b.x,
      z1: b.z,
      y: this.currentLevel,
      height: this.wallHeight,
      thickness: this.currentWallThickness(),
      ...this.currentMaterial,
    };
    const existing = this.walls.get(key);
    if (existing && this.sameWall(existing, wall)) return;
    if (existing) this.wallStrokeRemoved.push(existing);
    this.walls.set(key, wall);
    this.wallStrokeAdded.push(wall);
    this.rebuildWallMesh();
    this.emitCount();
  }

  private eraseWallAt(event: PointerEvent) {
    const hit = this.raycast(event);
    if (!hit || hit.object !== this.wallMesh || hit.instanceId === undefined)
      return;
    const key = this.wallKeys[hit.instanceId];
    if (!key) return;
    const wall = this.walls.get(key);
    if (!wall) return;
    this.wallStrokeRemoved.push(wall);
    this.walls.delete(key);
    this.rebuildWallMesh();
    this.emitCount();
  }

  private commitWallStroke() {
    if (this.wallStrokeAdded.length > 0 || this.wallStrokeRemoved.length > 0) {
      this.recordAction({
        added: [],
        removed: [],
        addedWalls: [...this.wallStrokeAdded],
        removedWalls: [...this.wallStrokeRemoved],
      });
      if (this.callbacks.onActionRecord) this.callbacks.onActionRecord();
    }
    this.wallStrokeAdded = [];
    this.wallStrokeRemoved = [];
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
    if (this.wallMesh.count > 0) objects.push(this.wallMesh);
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
    if (hit.instanceId === undefined) return null;
    if (hit.object !== this.fullMesh && hit.object !== this.halfMesh)
      return null;
    const keys = hit.object === this.fullMesh ? this.fullKeys : this.halfKeys;
    const key = keys[hit.instanceId];
    if (!key) return null;
    return this.cells.get(key) ?? null;
  }

  private getWallFromHit(hit: Hit): HexWallData | null {
    if (hit.object !== this.wallMesh || hit.instanceId === undefined)
      return null;
    const key = this.wallKeys[hit.instanceId];
    if (!key) return null;
    return this.walls.get(key) ?? null;
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
    this.emitCount();
  }

  private pickMaterialAt(hit: Hit) {
    const src = this.getCellFromHit(hit) ?? this.getWallFromHit(hit);
    if (src && this.callbacks.onMaterialPick) {
      this.callbacks.onMaterialPick({
        color: src.color,
        emissive: src.emissive,
        metalness: src.metalness,
        roughness: src.roughness,
        emissiveIntensity: src.emissiveIntensity,
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
    action.addedWalls?.forEach((w) => this.walls.delete(wallKeyOf(w)));
    action.removedWalls?.forEach((w) => this.walls.set(wallKeyOf(w), w));
    this.historyIndex--;
    this.rebuildMeshes();
    this.rebuildWallMesh();
    if (this.callbacks.onHistoryChange)
      this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
    this.emitCount();
  }

  public redo() {
    if (this.historyIndex >= this.history.length - 1) return;
    this.historyIndex++;
    const action = this.history[this.historyIndex]!;
    action.removed.forEach((c) =>
      this.cells.delete(cellKey(c.col, c.row, c.y))
    );
    action.added.forEach((c) => this.cells.set(cellKey(c.col, c.row, c.y), c));
    action.removedWalls?.forEach((w) => this.walls.delete(wallKeyOf(w)));
    action.addedWalls?.forEach((w) => this.walls.set(wallKeyOf(w), w));
    this.rebuildMeshes();
    this.rebuildWallMesh();
    if (this.callbacks.onHistoryChange)
      this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
    this.emitCount();
  }

  // --- API PÚBLICA ---

  public setTool(tool: HexTool) {
    this.currentTool = tool;
    this.wallGhost.visible = false;
    this.wallStart = null;
  }

  public setMuroMode(mode: MuroMode) {
    this.muroMode = mode;
    this.wallGhost.visible = false;
    this.wallStart = null;
  }

  public setRot(rot: number) {
    this.currentRot = ((rot % 6) + 6) % 6;
  }

  public rotate(d: number) {
    this.setRot(this.currentRot + d);
  }

  public setBoxHeight(h: number) {
    this.boxHeight = Math.max(1, Math.round(h));
  }

  public updateMaterial(m: HexMaterial) {
    this.currentMaterial = { ...m };
  }

  public setModifiers(shift: boolean, alt: boolean, ctrl: boolean = false) {
    this.isShiftDown = shift;
    this.isAltDown = alt;
    this.isCtrlDown = ctrl;
  }

  public setWallHeight(h: number) {
    this.wallHeight = Math.max(1, Math.round(h));
  }

  public adjustLevel(d: number) {
    this.currentLevel += d;
    const y = this.currentLevel * PRISM_HEIGHT;
    this.plane.position.y = y;
    this.gridLines.position.y = y + 0.03;
  }

  public clearAll() {
    this.cells.clear();
    this.walls.clear();
    this.history = [];
    this.historyIndex = -1;
    this.rebuildMeshes();
    this.rebuildWallMesh();
    if (this.callbacks.onHistoryChange)
      this.callbacks.onHistoryChange(this.historyIndex, this.history.length);
    this.emitCount();
  }

  public loadWalls(list: Partial<HexWallData>[]) {
    this.walls.clear();
    list.forEach((w) => {
      if (
        typeof w.x0 !== "number" ||
        typeof w.z0 !== "number" ||
        typeof w.x1 !== "number" ||
        typeof w.z1 !== "number" ||
        typeof w.y !== "number"
      )
        return;
      const wall: HexWallData = {
        x0: w.x0,
        z0: w.z0,
        x1: w.x1,
        z1: w.z1,
        y: w.y,
        height: typeof w.height === "number" ? Math.max(1, w.height) : 1,
        thickness: typeof w.thickness === "number" ? w.thickness : WALL_THICKNESS,
        color: w.color ?? "#ffffff",
        emissive: w.emissive ?? "#000000",
        metalness: w.metalness ?? 0,
        roughness: w.roughness ?? 1,
        emissiveIntensity: w.emissiveIntensity ?? 0,
      };
      this.walls.set(wallKeyOf(wall), wall);
    });
    this.rebuildWallMesh();
    this.emitCount();
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
    this.emitCount();
  }

  public exportHexes() {
    const exportData = {
      version: 1,
      type: "hex-prisma",
      hexRadius: HEX_RADIUS,
      prismHeight: PRISM_HEIGHT,
      timestamp: new Date().toISOString(),
      cells: Array.from(this.cells.values()),
      walls: Array.from(this.walls.values()),
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
