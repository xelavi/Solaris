import * as THREE from "three";
import {
  CHUNK_SIZE,
  type VoxelMaterial,
  type MeshingResult,
  type GeometryData,
} from "./types";

function compareMaterials(
  a: VoxelMaterial | null,
  b: VoxelMaterial | null
): boolean {
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

function createGeometryData(): GeometryData {
  return {
    positions: [],
    normals: [],
    colors: [],
    indices: [],
    roughness: [],
    metalness: [],
    emissiveIntensity: [],
    emissiveColor: [],
  };
}

// Generate a unique key for transparent materials to group them
function getMaterialHash(m: VoxelMaterial): string {
  return `${m.color}-${m.opacity}-${m.roughness}-${m.metalness}-${m.emissive}-${m.emissiveIntensity}`;
}

export function generateChunkGeometry(
  cx: number,
  cy: number,
  cz: number,
  getVoxelFn: (x: number, y: number, z: number) => VoxelMaterial | null
): MeshingResult {
  // separate opaque from transparent groups
  const opaque = createGeometryData();
  const transparent = new Map<
    string,
    GeometryData & { material: VoxelMaterial }
  >();

  const startX = cx * CHUNK_SIZE;
  const startY = cy * CHUNK_SIZE;
  const startZ = cz * CHUNK_SIZE;

  for (const dim of [0, 1, 2]) {
    for (const dir of [-1, 1]) {
      const u = (dim + 1) % 3;
      const v = (dim + 2) % 3;

      const x = [0, 0, 0];
      const q = [0, 0, 0];
      q[dim] = dir;

      for (x[dim] = 0; x[dim] < CHUNK_SIZE; x[dim]++) {
        const mask: (VoxelMaterial | null)[] = new Array(
          CHUNK_SIZE * CHUNK_SIZE
        ).fill(null);

        for (x[v] = 0; x[v] < CHUNK_SIZE; x[v]++) {
          for (x[u] = 0; x[u] < CHUNK_SIZE; x[u]++) {
            const gx = startX + x[0]!;
            const gy = startY + x[1]!;
            const gz = startZ + x[2]!;

            const current = getVoxelFn(gx, gy, gz);
            if (!current) continue;

            const nx = gx + q[0]!;
            const ny = gy + q[1]!;
            const nz = gz + q[2]!;
            const neighbor = getVoxelFn(nx, ny, nz);

            let visible = true;
            if (neighbor) {
              // Standard culling: if neighbor is opaque, cull.
              // If neighbor is same transparent material, cull (internal faces of glass).
              if (neighbor.opacity === 1.0) visible = false;
              else if (compareMaterials(current, neighbor)) visible = false;
            }

            if (visible) {
              mask[x[u] + x[v] * CHUNK_SIZE] = current;
            }
          }
        }

        let n = 0;
        for (let j = 0; j < CHUNK_SIZE; j++) {
          for (let i = 0; i < CHUNK_SIZE; ) {
            const mat = mask[n];
            if (mat) {
              let w = 1;
              while (
                i + w < CHUNK_SIZE &&
                compareMaterials(mask[n + w]!, mat)
              ) {
                w++;
              }

              let h = 1;
              let heightValid = true;
              while (j + h < CHUNK_SIZE && heightValid) {
                for (let k = 0; k < w; k++) {
                  if (!compareMaterials(mask[n + k + h * CHUNK_SIZE]!, mat)) {
                    heightValid = false;
                    break;
                  }
                }
                if (heightValid) h++;
              }

              // Select correct buffer
              let targetData: GeometryData;
              if (mat.opacity === 1.0) {
                targetData = opaque;
              } else {
                const hash = getMaterialHash(mat);
                if (!transparent.has(hash)) {
                  transparent.set(hash, {
                    ...createGeometryData(),
                    material: mat,
                  });
                }
                targetData = transparent.get(hash)!;
              }

              addQuad(targetData, dim, dir, x[dim], i, j, w, h, mat);

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

  return { opaque, transparent };
}

function addQuad(
  data: GeometryData,
  axis: number,
  dir: number,
  depth: number,
  u: number,
  v: number,
  w: number,
  h: number,
  mat: VoxelMaterial
) {
  const indexOffset = data.positions.length / 3;
  const du = [0, 0, 0];
  const dv = [0, 0, 0];
  const origin = [0, 0, 0];

  if (axis === 0) {
    origin[0] = depth + (dir === 1 ? 1 : 0);
    origin[1] = u;
    origin[2] = v;
    du[1] = w;
    dv[2] = h;
  } else if (axis === 1) {
    origin[0] = v;
    origin[1] = depth + (dir === 1 ? 1 : 0);
    origin[2] = u;
    du[2] = w;
    dv[0] = h;
  } else {
    origin[0] = u;
    origin[1] = v;
    origin[2] = depth + (dir === 1 ? 1 : 0);
    du[0] = w;
    dv[1] = h;
  }

  const p0 = [origin[0], origin[1], origin[2]];
  const p1 = [origin[0] + du[0]!, origin[1] + du[1]!, origin[2] + du[2]!];
  const p2 = [origin[0] + dv[0]!, origin[1] + dv[1]!, origin[2] + dv[2]!];
  const p3 = [
    origin[0] + du[0]! + dv[0]!,
    origin[1] + du[1]! + dv[1]!,
    origin[2] + du[2]! + dv[2]!,
  ];

  const cObj = new THREE.Color(mat.color);
  const eObj = new THREE.Color(mat.emissive);
  const verts = [p0, p1, p2, p3];

  for (let i = 0; i < 4; i++) {
    data.positions.push(verts[i]![0]!, verts[i]![1]!, verts[i]![2]!);
    data.normals.push(
      axis === 0 ? dir : 0,
      axis === 1 ? dir : 0,
      axis === 2 ? dir : 0
    );
    data.colors.push(cObj.r, cObj.g, cObj.b);
    data.roughness.push(mat.roughness);
    data.metalness.push(mat.metalness);
    data.emissiveIntensity.push(mat.emissiveIntensity);
    data.emissiveColor.push(eObj.r, eObj.g, eObj.b);
  }

  if (dir === 1) {
    data.indices.push(indexOffset, indexOffset + 1, indexOffset + 2);
    data.indices.push(indexOffset + 2, indexOffset + 1, indexOffset + 3);
  } else {
    data.indices.push(indexOffset + 2, indexOffset + 1, indexOffset);
    data.indices.push(indexOffset + 3, indexOffset + 1, indexOffset + 2);
  }
}
