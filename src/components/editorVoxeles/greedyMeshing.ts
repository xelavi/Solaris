import * as THREE from 'three';
import { CHUNK_SIZE, type VoxelMaterial, type MeshingResult } from './types';

// Helper: Compare two materials for equality to determine if faces can merge
function compareMaterials(a: VoxelMaterial | null, b: VoxelMaterial | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  
  return (
    a.color === b.color &&
    a.emissive === b.emissive &&
    a.metalness === b.metalness &&
    a.roughness === b.roughness &&
    a.emissiveIntensity === b.emissiveIntensity &&
    a.opacity === b.opacity
  );
}

/**
 * Generates geometry data for a specific chunk using Greedy Meshing.
 * @param cx Chunk X
 * @param cy Chunk Y
 * @param cz Chunk Z
 * @param getVoxelFn Function to get a voxel from Global Coordinates (x,y,z)
 */
export function generateChunkGeometry(
  cx: number, 
  cy: number, 
  cz: number, 
  getVoxelFn: (x: number, y: number, z: number) => VoxelMaterial | null
): MeshingResult {

  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const roughness: number[] = [];
  const metalness: number[] = [];
  const emissiveIntensity: number[] = [];
  const emissiveColor: number[] = [];

  const startX = cx * CHUNK_SIZE;
  const startY = cy * CHUNK_SIZE;
  const startZ = cz * CHUNK_SIZE;

  // Sweep over 3 axes
  for (const dim of [0, 1, 2]) { 
    // Sweep over 2 directions (Negative face, Positive face)
    for (const dir of [-1, 1]) { 
      
      const u = (dim + 1) % 3;
      const v = (dim + 2) % 3;
      
      const x = [0,0,0];
      const q = [0,0,0];
      q[dim] = dir; // Direction vector for neighbor check

      // Iterate through the chunk slices
      for (x[dim] = 0; x[dim] < CHUNK_SIZE; x[dim]++) {
        
        const mask: (VoxelMaterial | null)[] = new Array(CHUNK_SIZE * CHUNK_SIZE).fill(null);

        // 1. Build Mask for this slice
        for (x[v] = 0; x[v] < CHUNK_SIZE; x[v]++) {
          for (x[u] = 0; x[u] < CHUNK_SIZE; x[u]++) {
            
            // Global coordinates of current voxel
            const gx = startX + x[0];
            const gy = startY + x[1];
            const gz = startZ + x[2];

            const current = getVoxelFn(gx, gy, gz);
            
            if (!current) continue; // Air doesn't have faces

            // Check neighbor
            const nx = gx + q[0];
            const ny = gy + q[1];
            const nz = gz + q[2];
            
            const neighbor = getVoxelFn(nx, ny, nz);

            // CULLING LOGIC:
            // 1. If neighbor exists and is opaque, cull face.
            // 2. If neighbor exists, is transparent, but looks exactly the same, cull face.
            let visible = true;
            if (neighbor) {
                if (neighbor.opacity === 1.0) visible = false;
                else if (compareMaterials(current, neighbor)) visible = false;
            }

            if (visible) {
              mask[x[u] + x[v] * CHUNK_SIZE] = current;
            }
          }
        }

        // 2. Greedy Merge
        let n = 0;
        for (let j = 0; j < CHUNK_SIZE; j++) {
          for (let i = 0; i < CHUNK_SIZE; ) {
            const mat = mask[n];
            if (mat) {
              // Compute width
              let w = 1;
              while (i + w < CHUNK_SIZE && compareMaterials(mask[n + w], mat)) {
                w++;
              }
              
              // Compute height
              let h = 1;
              let heightValid = true;
              while (j + h < CHUNK_SIZE && heightValid) {
                for (let k = 0; k < w; k++) {
                  if (!compareMaterials(mask[n + k + h * CHUNK_SIZE], mat)) {
                    heightValid = false;
                    break;
                  }
                }
                if (heightValid) h++;
              }

              // Add Quad to Geometry
              addQuad(
                positions, normals, colors, indices,
                roughness, metalness, emissiveIntensity, emissiveColor,
                dim, dir, 
                x[dim], i, j, w, h, 
                mat
              );

              // Clear mask
              for (let yy = 0; yy < h; yy++) {
                for (let xx = 0; xx < w; xx++) {
                  mask[n + xx + yy * CHUNK_SIZE] = null;
                }
              }
              
              i += w;
              n += w;
            } else {
              i++;
              n++;
            }
          }
        }
      }
    }
  }

  return { positions, normals, colors, indices, roughness, metalness, emissiveIntensity, emissiveColor };
}

function addQuad(
  pos: number[], norm: number[], col: number[], idx: number[], 
  rough: number[], metal: number[], emInt: number[], emCol: number[],
  axis: number, dir: number, 
  depth: number, u: number, v: number, w: number, h: number, 
  mat: VoxelMaterial
) {
  const indexOffset = pos.length / 3;
  
  // Axis 0(X): d=X, u=Y, v=Z
  // Axis 1(Y): d=Y, u=Z, v=X
  // Axis 2(Z): d=Z, u=X, v=Y
  
  const du = [0,0,0]; 
  const dv = [0,0,0];
  const origin = [0,0,0];
  
  if (axis === 0) {
    origin[0] = depth + (dir === 1 ? 1 : 0); origin[1] = u; origin[2] = v;
    du[1] = w; dv[2] = h;
  } else if (axis === 1) {
    origin[0] = v; origin[1] = depth + (dir === 1 ? 1 : 0); origin[2] = u;
    du[2] = w; dv[0] = h;
  } else {
    origin[0] = u; origin[1] = v; origin[2] = depth + (dir === 1 ? 1 : 0);
    du[0] = w; dv[1] = h;
  }
  
  // Vertices
  const p0 = [origin[0], origin[1], origin[2]];
  const p1 = [origin[0] + du[0], origin[1] + du[1], origin[2] + du[2]];
  const p2 = [origin[0] + dv[0], origin[1] + dv[1], origin[2] + dv[2]];
  // FIX: p3 calculation was broken, causing geometry explosions
  const p3 = [
      origin[0] + du[0] + dv[0], 
      origin[1] + du[1] + dv[1], 
      origin[2] + du[2] + dv[2]
  ];

  // Parse Colors
  const cObj = new THREE.Color(mat.color);
  const eObj = new THREE.Color(mat.emissive);

  // Push 4 vertices
  const verts = [p0, p1, p2, p3];
  for(let i=0; i<4; i++) {
    pos.push(verts[i][0], verts[i][1], verts[i][2]);
    norm.push(axis === 0 ? dir : 0, axis === 1 ? dir : 0, axis === 2 ? dir : 0);
    col.push(cObj.r, cObj.g, cObj.b);
    rough.push(mat.roughness);
    metal.push(mat.metalness);
    emInt.push(mat.emissiveIntensity);
    emCol.push(eObj.r, eObj.g, eObj.b);
  }

  // Indices
  if (dir === 1) {
    idx.push(indexOffset, indexOffset + 1, indexOffset + 2);
    idx.push(indexOffset + 2, indexOffset + 1, indexOffset + 3);
  } else {
    idx.push(indexOffset + 2, indexOffset + 1, indexOffset);
    idx.push(indexOffset + 3, indexOffset + 1, indexOffset + 2);
  }
}