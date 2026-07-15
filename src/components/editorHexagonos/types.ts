// Misma cara que la partida 3D (jugarPartida.vue: HEX_SIZE = 2, pointy-top)
export const HEX_RADIUS = 2;
// Altura fija: todos los prismas son iguales
export const PRISM_HEIGHT = 2;
export const HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
export const ROW_STEP = 1.5 * HEX_RADIUS;
// Grosor de la losa de los muros rectos (fino y grueso).
export const WALL_THICKNESS = 0.4;
export const WALL_THICKNESS_THICK = 1.2;
// Rejilla fina a la que se ajustan los extremos de los muros rectos.
export const WALL_SNAP = 1;

// Modo de la herramienta muro:
//  - "hex":    cadena de prismas hexagonales
//  - "recto":  losa fina recta (ángulo libre)
//  - "grueso": losa gruesa recta
export type MuroMode = "hex" | "recto" | "grueso";

export type HexTool =
  | "prisma"
  | "media"
  | "area"
  | "muro"
  | "cubo"
  | "picker";
export type HexShape = "full" | "half";

export interface HexMaterial {
  color: string;
  emissive: string;
  metalness: number;
  roughness: number;
  emissiveIntensity: number;
}

export interface HexCellData extends HexMaterial {
  col: number;
  row: number;
  y: number;
  shape: HexShape;
  // Orientación del medio prisma en pasos de 60° (0..5). Siempre 0 para "full".
  rot: number;
}

// Muro recto: losa que une dos puntos libres del plano (x,z) en un nivel.
// No es una celda de la rejilla, pero cuenta como muro.
export interface HexWallData extends HexMaterial {
  x0: number;
  z0: number;
  x1: number;
  z1: number;
  y: number; // nivel base
  height: number; // alto en niveles
  thickness: number; // grosor de la losa
}

export interface HexHistoryAction {
  added: HexCellData[];
  removed: HexCellData[];
  addedWalls?: HexWallData[];
  removedWalls?: HexWallData[];
}

export interface HexEngineCallbacks {
  onCellCountChange?: (count: number) => void;
  onHistoryChange?: (index: number, length: number) => void;
  onMaterialPick?: (material: HexMaterial) => void;
  onActionRecord?: () => void;
}
