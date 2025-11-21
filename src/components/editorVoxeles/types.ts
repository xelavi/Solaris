import * as THREE from 'three';

export interface VoxelMaterial {
  color: string;
  emissive: string;
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
  shape: 'cube' | 'sphere' | 'square' | 'circle';
  size: number;
  axis: 'x' | 'y' | 'z';
}

export interface PaletteItem {
  mat: VoxelMaterial;
  weight: number;
  preview?: string;
}

export interface EngineCallbacks {
  onVoxelCountChange?: (count: number) => void;
  onHistoryChange?: (index: number, length: number) => void;
  onMaterialPick?: (material: VoxelMaterial) => void;
  onActionRecord?: () => void;
}

export interface HistoryChangeAdd {
  mesh: THREE.Mesh;
  data: VoxelData;
}

export interface HistoryChangeRemove {
  mesh?: THREE.Mesh | null;
  data: VoxelData;
}

export interface HistoryAction {
  type: 'batch';
  changes: {
    added: HistoryChangeAdd[];
    removed: HistoryChangeRemove[];
  };
}