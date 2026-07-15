// Misma cara que la partida 3D (jugarPartida.vue: HEX_SIZE = 2, pointy-top)
export const HEX_RADIUS = 2;
// Altura fija: todos los prismas son iguales
export const PRISM_HEIGHT = 2;
export const HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
export const ROW_STEP = 1.5 * HEX_RADIUS;

// Modo de la herramienta muro:
//  - "hex":    cadena de prismas hexagonales completos (silueta escalonada)
//  - "recto":  misma cadena de hexágonos, pero se rellenan las muescas entre
//              hexágonos contiguos con cuñas para que la cara del muro sea una
//              recta continua. Cada hexágono sigue siendo una casilla; las
//              cuñas son geometría decorativa que pertenece al hexágono.
export type MuroMode = "hex" | "recto";

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
  // Celda colocada con el muro "recto": genera cuñas de relleno hacia los
  // hexágonos de muro contiguos para formar una cara recta continua. No afecta
  // a las casillas (sigue siendo un hexágono completo).
  wall: boolean;
}

export interface HexHistoryAction {
  added: HexCellData[];
  removed: HexCellData[];
}

export interface HexEngineCallbacks {
  onCellCountChange?: (count: number) => void;
  onHistoryChange?: (index: number, length: number) => void;
  onMaterialPick?: (material: HexMaterial) => void;
  onActionRecord?: () => void;
}
