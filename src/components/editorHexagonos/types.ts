// Misma cara que la partida 3D (jugarPartida.vue: HEX_SIZE = 2, pointy-top)
export const HEX_RADIUS = 2;
// Altura fija: todos los prismas son iguales
export const PRISM_HEIGHT = 2;
export const HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
export const ROW_STEP = 1.5 * HEX_RADIUS;

export type HexTool = "prisma" | "media" | "picker";
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
