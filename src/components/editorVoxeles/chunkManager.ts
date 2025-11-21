import * as THREE from "three";
import { generateChunkGeometry } from "./greedyMeshing";
import { CHUNK_SIZE, type VoxelMaterial, type GeometryData } from "./types";

class Chunk {
  // A chunk now holds an array of meshes (1 opaque + N transparent)
  public meshes: THREE.Mesh[] = [];
  public isDirty: boolean = false;
  public data: (VoxelMaterial | null)[];

  constructor() {
    this.data = new Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE).fill(null);
  }
}

export class ChunkManager {
  public chunks: Map<string, Chunk> = new Map();
  private scene: THREE.Scene;
  // This material is for the Opaque mesh (uses attributes for varying materials)
  private opaqueMaterial: THREE.MeshStandardMaterial;
  public voxelSize: number = 12.5;

  constructor(scene: THREE.Scene, voxelSize: number) {
    this.scene = scene;
    this.voxelSize = voxelSize;
    this.opaqueMaterial = this.createCustomMaterial();
  }

  // Public because VoxelEngine needs it for the Brush Preview
  public createCustomMaterial(
    baseParams: THREE.MeshStandardMaterialParameters = {}
  ) {
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      side: THREE.FrontSide,
      shadowSide: THREE.BackSide,
      ...baseParams,
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
    return chunk.data[lx + ly * CHUNK_SIZE + lz * CHUNK_SIZE * CHUNK_SIZE]!;
  };

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
      if (!mat) return;
      chunk = new Chunk();
      this.chunks.set(key, chunk);
    }

    const idx = lx + ly * CHUNK_SIZE + lz * CHUNK_SIZE * CHUNK_SIZE;
    if (chunk.data[idx] !== mat) {
      chunk.data[idx] = mat;
      chunk.isDirty = true;
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
        const [cx, cy, cz] = key.split(",").map(Number);
        this.rebuildChunk(cx!, cy!, cz!, chunk);
        chunk.isDirty = false;
      }
    }
  }

  private createGeometry(data: GeometryData): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(data.positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(data.normals, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(data.colors, 3)
    );
    geometry.setAttribute(
      "roughness",
      new THREE.Float32BufferAttribute(data.roughness, 1)
    );
    geometry.setAttribute(
      "metalness",
      new THREE.Float32BufferAttribute(data.metalness, 1)
    );
    geometry.setAttribute(
      "emissiveIntensity",
      new THREE.Float32BufferAttribute(data.emissiveIntensity, 1)
    );
    geometry.setAttribute(
      "emissiveColor",
      new THREE.Float32BufferAttribute(data.emissiveColor, 3)
    );
    geometry.setIndex(data.indices);
    return geometry;
  }

  private rebuildChunk(cx: number, cy: number, cz: number, chunk: Chunk) {
    // Dispose old meshes
    chunk.meshes.forEach((mesh) => {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      // Do not dispose the shared opaque material, but dispose unique transparent ones if needed
      if (mesh.material !== this.opaqueMaterial) {
        (mesh.material as THREE.Material).dispose();
      }
    });
    chunk.meshes = [];

    const result = generateChunkGeometry(cx, cy, cz, this.getVoxel);
    const posOffset = new THREE.Vector3(
      cx * CHUNK_SIZE * this.voxelSize,
      cy * CHUNK_SIZE * this.voxelSize,
      cz * CHUNK_SIZE * this.voxelSize
    );

    // 1. Build Opaque Mesh
    if (result.opaque.positions.length > 0) {
      const geo = this.createGeometry(result.opaque);
      const mesh = new THREE.Mesh(geo, this.opaqueMaterial);
      mesh.scale.set(this.voxelSize, this.voxelSize, this.voxelSize);
      mesh.position.copy(posOffset);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { isChunk: true, chunkKey: this.getChunkKey(cx, cy, cz) };
      this.scene.add(mesh);
      chunk.meshes.push(mesh);
    }

    // 2. Build Transparent Meshes (Layers)
    // Each transparent group gets its own mesh with specific material settings
    result.transparent.forEach((data) => {
      const geo = this.createGeometry(data);

      // For transparent shells, we don't strictly need the attribute-based shader
      // because the material is uniform for the whole group.
      // However, using the Custom Material ensures consistent lighting with the rest of the world.
      const mat = this.createCustomMaterial({
        transparent: true,
        opacity: data.material.opacity,
        // Important: depthWrite=true ensures we don't see "through" the block to its backface
        // if DoubleSide is off. But for glass we often want to see the back.
        // With Greedy Meshing culling internal faces, the "Shell" is hollow.
        // depthWrite: false is standard for glass to allow seeing other glass behind it.
        depthWrite: false,
        side: THREE.DoubleSide, // See the back of the glass block
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.set(this.voxelSize, this.voxelSize, this.voxelSize);
      mesh.position.copy(posOffset);
      mesh.castShadow = false; // Transparent usually doesn't cast sharp shadows
      mesh.receiveShadow = true;
      // Render Order needs to be higher for transparents?
      // Three.js handles transparent sorting automatically if depthWrite is false.

      mesh.userData = { isChunk: true, chunkKey: this.getChunkKey(cx, cy, cz) };
      this.scene.add(mesh);
      chunk.meshes.push(mesh);
    });
  }

  public clear() {
    for (const chunk of this.chunks.values()) {
      chunk.meshes.forEach((m) => {
        this.scene.remove(m);
        m.geometry.dispose();
      });
    }
    this.chunks.clear();
  }

  public getVoxelCount(): number {
    let count = 0;
    this.chunks.forEach((c) => {
      c.data.forEach((v) => {
        if (v) count++;
      });
    });
    return count;
  }
}
