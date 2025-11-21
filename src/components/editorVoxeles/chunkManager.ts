import * as THREE from 'three';
import { generateChunkGeometry } from './greedyMeshing';
import { CHUNK_SIZE, type VoxelMaterial } from './types';

class Chunk {
  public mesh: THREE.Mesh | null = null;
  public isDirty: boolean = false;
  public data: (VoxelMaterial | null)[];

  constructor() {
    this.data = new Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE).fill(null);
  }
}

export class ChunkManager {
  public chunks: Map<string, Chunk> = new Map();
  private scene: THREE.Scene;
  private material: THREE.MeshStandardMaterial;
  public voxelSize: number = 12.5;
  
  constructor(scene: THREE.Scene, voxelSize: number) {
    this.scene = scene;
    this.voxelSize = voxelSize;
    this.material = this.createCustomMaterial();
  }

  private createCustomMaterial() {
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      side: THREE.FrontSide,
      shadowSide: THREE.BackSide
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
      `.replace('#include <begin_vertex>', `
        #include <begin_vertex>
        vRoughness = roughness;
        vMetalness = metalness;
        vEmissiveIntensity = emissiveIntensity;
        vEmissiveColor = emissiveColor;
      `);

      shader.fragmentShader = `
        varying float vRoughness;
        varying float vMetalness;
        varying float vEmissiveIntensity;
        varying vec3 vEmissiveColor;
        ${shader.fragmentShader}
      `.replace('#include <roughnessmap_fragment>', `
        float roughnessFactor = vRoughness;
      `).replace('#include <metalnessmap_fragment>', `
        float metalnessFactor = vMetalness;
      `).replace('#include <emissivemap_fragment>', `
        vec3 emissiveColor = vEmissiveColor * vEmissiveIntensity;
        totalEmissiveRadiance += emissiveColor; 
      `);
    };
    return mat;
  }

  private getChunkKey(cx: number, cy: number, cz: number) {
    return `${cx},${cy},${cz}`;
  }

  public getVoxel = (x: number, y: number, z: number): VoxelMaterial | null => {
    const cx = Math.floor(x / CHUNK_SIZE);
    const cy = Math.floor(y / CHUNK_SIZE);
    const cz = Math.floor(z / CHUNK_SIZE);
    
    const chunk = this.chunks.get(this.getChunkKey(cx, cy, cz));
    if (!chunk) return null;

    const lx = x - cx * CHUNK_SIZE;
    const ly = y - cy * CHUNK_SIZE;
    const lz = z - cz * CHUNK_SIZE;
    return chunk.data[lx + ly * CHUNK_SIZE + lz * CHUNK_SIZE * CHUNK_SIZE];
  }

  public setVoxel(x: number, y: number, z: number, mat: VoxelMaterial | null) {
    const cx = Math.floor(x / CHUNK_SIZE);
    const cy = Math.floor(y / CHUNK_SIZE);
    const cz = Math.floor(z / CHUNK_SIZE);
    
    const lx = x - cx * CHUNK_SIZE;
    const ly = y - cy * CHUNK_SIZE;
    const lz = z - cz * CHUNK_SIZE;

    const key = this.getChunkKey(cx, cy, cz);
    let chunk = this.chunks.get(key);

    if (!chunk) {
      if (!mat) return; // Don't create chunks just to remove air
      chunk = new Chunk();
      this.chunks.set(key, chunk);
    }

    const idx = lx + ly * CHUNK_SIZE + lz * CHUNK_SIZE * CHUNK_SIZE;
    if (chunk.data[idx] !== mat) {
        chunk.data[idx] = mat;
        chunk.isDirty = true;
        
        // Flag neighbors if on border to update faces that touch this voxel
        if (lx === 0) this.flagDirty(cx - 1, cy, cz);
        if (lx === CHUNK_SIZE - 1) this.flagDirty(cx + 1, cy, cz);
        if (ly === 0) this.flagDirty(cx, cy - 1, cz);
        if (ly === CHUNK_SIZE - 1) this.flagDirty(cx, cy + 1, cz);
        if (lz === 0) this.flagDirty(cx, cy, cz - 1);
        if (lz === CHUNK_SIZE - 1) this.flagDirty(cx, cy, cz + 1);
    }
  }

  private flagDirty(cx: number, cy: number, cz: number) {
    const chunk = this.chunks.get(this.getChunkKey(cx, cy, cz));
    if (chunk) chunk.isDirty = true;
  }

  public update() {
    for (const [key, chunk] of this.chunks.entries()) {
      if (chunk.isDirty) {
        const [cx, cy, cz] = key.split(',').map(Number);
        this.rebuildChunk(cx, cy, cz, chunk);
        chunk.isDirty = false;
      }
    }
  }

  private rebuildChunk(cx: number, cy: number, cz: number, chunk: Chunk) {
    if (chunk.mesh) {
      this.scene.remove(chunk.mesh);
      chunk.mesh.geometry.dispose();
      chunk.mesh = null;
    }

    const data = generateChunkGeometry(cx, cy, cz, this.getVoxel);
    
    if (data.positions.length === 0) return;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(data.normals, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(data.colors, 3));
    geometry.setAttribute('roughness', new THREE.Float32BufferAttribute(data.roughness, 1));
    geometry.setAttribute('metalness', new THREE.Float32BufferAttribute(data.metalness, 1));
    geometry.setAttribute('emissiveIntensity', new THREE.Float32BufferAttribute(data.emissiveIntensity, 1));
    geometry.setAttribute('emissiveColor', new THREE.Float32BufferAttribute(data.emissiveColor, 3));
    geometry.setIndex(data.indices);

    chunk.mesh = new THREE.Mesh(geometry, this.material);
    
    // FIX: Correct positioning logic
    // 1. Scale (geometry is 0..8, so we scale by voxel size)
    chunk.mesh.scale.set(this.voxelSize, this.voxelSize, this.voxelSize);
    
    // 2. Position (move the whole chunk to its world location)
    chunk.mesh.position.set(
        cx * CHUNK_SIZE * this.voxelSize, 
        cy * CHUNK_SIZE * this.voxelSize, 
        cz * CHUNK_SIZE * this.voxelSize
    );
    
    chunk.mesh.castShadow = true;
    chunk.mesh.receiveShadow = true;
    chunk.mesh.userData = { isChunk: true, chunkKey: this.getChunkKey(cx, cy, cz) };
    
    this.scene.add(chunk.mesh);
  }

  public clear() {
    for (const chunk of this.chunks.values()) {
      if (chunk.mesh) {
        this.scene.remove(chunk.mesh);
        chunk.mesh.geometry.dispose();
      }
    }
    this.chunks.clear();
  }

  public getVoxelCount(): number {
      let count = 0;
      this.chunks.forEach(c => {
          c.data.forEach(v => { if(v) count++ });
      });
      return count;
  }
}