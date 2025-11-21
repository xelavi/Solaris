export const CHUNK_SIZE = 8;

export type ToolMode = "brush" | "box" | "select" | "picker";

export interface Symmetries {
  x: boolean;
  z: boolean;
}

// types.ts
export interface GeometryData {
  positions: number[];
  normals: number[];
  colors: number[];
  indices: number[];
  roughness: number[];
  metalness: number[];
  emissiveIntensity: number[];
  emissiveColor: number[];
}

export interface MeshingResult {
  opaque: GeometryData;
  transparent: Map<string, GeometryData & { material: VoxelMaterial }>;
}

export interface VoxelMaterial {
  color: string | number;
  emissive: string | number;
  metalness: number;
  roughness: number;
  emissiveIntensity: number;
  opacity: number;
  transparent: boolean;
}

export interface VoxelData extends VoxelMaterial {
  x: number;
  y: number;
  z: number;
}

export interface BrushSettings {
  shape: "cube" | "sphere" | "square" | "circle";
  size: number;
  axis: "x" | "y" | "z";
}

export interface PaletteItem {
  mat: VoxelMaterial;
  weight: number;
  preview?: string;
}

export interface HistoryChangeAdd {
  data: VoxelData;
}
export interface HistoryChangeRemove {
  data: VoxelData;
}

export interface HistoryAction {
  type: "batch";
  changes: {
    added: HistoryChangeAdd[];
    removed: HistoryChangeRemove[];
  };
}

export interface EngineCallbacks {
  onVoxelCountChange?: (count: number) => void;
  onHistoryChange?: (index: number, length: number) => void;
  onMaterialPick?: (material: VoxelMaterial) => void;
  onActionRecord?: () => void;
  onToolChange?: (tool: ToolMode) => void;
}
