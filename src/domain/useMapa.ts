import { ref } from "vue";
import { astar } from "./composables/pathfinder";

export interface Casilla {
  x: number;
  z: number;
  y: number; // Altura
  walkable: boolean;
  blocked: boolean;
}

const GRID_WIDTH = 40;
const GRID_HEIGHT = 40;
const CUBE_SIZE = 1;

// Estado del mapa
const mapa = ref<Casilla[][]>([]);
const minGX = ref(0);
const minGZ = ref(0);

export function useMapa() {
  function generarMapa() {
    const newMapa: Casilla[][] = [];
    const offsetX = -(GRID_WIDTH * CUBE_SIZE) / 2 + CUBE_SIZE / 2;
    const offsetZ = -(GRID_HEIGHT * CUBE_SIZE) / 2 + CUBE_SIZE / 2;

    // Calcular índices mínimos (para el sistema de coordenadas de pathfinder)
    // En este caso simple, asumimos que empieza en 0,0 relativo al grid
    // Pero para mantener consistencia con worldToGrid de Three.js:
    let minX = Infinity;
    let minZ = Infinity;

    // 1. Generar suelo base
    for (let x = 0; x < GRID_WIDTH; x++) {
      newMapa[x] = [];
      for (let z = 0; z < GRID_HEIGHT; z++) {
        // Coordenadas de mundo aproximadas (para lógica interna)
        const gx = Math.round((offsetX + x * CUBE_SIZE) / CUBE_SIZE);
        const gz = Math.round((offsetZ + z * CUBE_SIZE) / CUBE_SIZE);

        if (gx < minX) minX = gx;
        if (gz < minZ) minZ = gz;

        newMapa[x][z] = {
          x: gx,
          z: gz,
          y: 0, // Nivel del suelo
          walkable: true,
          blocked: false,
        };
      }
    }

    minGX.value = minX;
    minGZ.value = minZ;

    // 2. Añadir paredes (Hardcoded por ahora como en escena.vue)
    // "walls" loop from escena.vue: 5 walls at specific positions
    // cube.position.set(offsetX + i+5 * boxSize, 1, offsetZ+5 + 0 * boxSize);
    for (let i = 0; i < 5; i++) {
      const gridX = i + 5;
      const gridZ = 5;

      if (
        gridX < GRID_WIDTH &&
        gridZ < GRID_HEIGHT &&
        newMapa[gridX] &&
        newMapa[gridX][gridZ]
      ) {
        newMapa[gridX][gridZ].blocked = true;
        newMapa[gridX][gridZ].walkable = false;
        newMapa[gridX][gridZ].y = 1; // Altura de pared
      }
    }

    mapa.value = newMapa;
  }

  function obtenerCamino(
    start: { x: number; z: number },
    end: { x: number; z: number },
  ) {
    // Convertir coordenadas de mundo a índices de array
    // Asumimos que start y end vienen en coordenadas de mundo (gx, gz)

    // Indices array
    const startIx = start.x - minGX.value;
    const startIz = start.z - minGZ.value;
    const endIx = end.x - minGX.value;
    const endIz = end.z - minGZ.value;

    // Validar límites
    if (
      startIx < 0 ||
      startIx >= GRID_WIDTH ||
      startIz < 0 ||
      startIz >= GRID_HEIGHT ||
      endIx < 0 ||
      endIx >= GRID_WIDTH ||
      endIz < 0 ||
      endIz >= GRID_HEIGHT
    ) {
      return null;
    }

    // Preparar arrays para astar (que espera boolean[][])
    const walkableGrid = mapa.value.map((row) => row.map((c) => c.walkable));

    // Función canWalk para astar
    const canWalk = (x: number, z: number): boolean => {
      return !!(walkableGrid[x] && walkableGrid[x][z]);
    };

    const path = astar(
      { x: startIx, z: startIz },
      { x: endIx, z: endIz },
      walkableGrid,
      canWalk,
    );

    if (!path) return null;

    // Convertir de vuelta a coordenadas de mundo
    return path.map((p) => ({
      x: p.x + minGX.value,
      z: p.z + minGZ.value,
    }));
  }

  function esCaminable(x: number, z: number) {
    const ix = x - minGX.value;
    const iz = z - minGZ.value;
    if (ix < 0 || ix >= GRID_WIDTH || iz < 0 || iz >= GRID_HEIGHT) return false;
    const row = mapa.value[ix];
    if (!row) return false;
    const cell = row[iz];
    if (!cell) return false;
    return cell.walkable && !cell.blocked;
  }

  function obtenerAlcance(
    origen: { x: number; z: number },
    rango: number,
  ): { x: number; z: number }[] {
    const alcanzables: { x: number; z: number }[] = [];
    const startIx = origen.x - minGX.value;
    const startIz = origen.z - minGZ.value;

    // BFS simple para encontrar celdas alcanzables dentro del rango
    const queue: { x: number; z: number; dist: number }[] = [
      { x: startIx, z: startIz, dist: 0 },
    ];
    const visited = new Set<string>();
    visited.add(`${startIx},${startIz}`);

    while (queue.length > 0) {
      const current = queue.shift()!;

      // Si no es el origen, lo añadimos a alcanzables
      if (current.dist > 0) {
        alcanzables.push({
          x: current.x + minGX.value,
          z: current.z + minGZ.value,
        });
      }

      if (current.dist < rango) {
        const neighbors = [
          { x: current.x + 1, z: current.z },
          { x: current.x - 1, z: current.z },
          { x: current.x, z: current.z + 1 },
          { x: current.x, z: current.z - 1 },
        ];

        for (const n of neighbors) {
          const key = `${n.x},${n.z}`;
          if (
            n.x >= 0 &&
            n.x < GRID_WIDTH &&
            n.z >= 0 &&
            n.z < GRID_HEIGHT &&
            !visited.has(key)
          ) {
            // Verificar si es caminable usando la lógica interna
            const row = mapa.value[n.x];
            if (row) {
              const cell = row[n.z];
              if (cell && cell.walkable && !cell.blocked) {
                visited.add(key);
                queue.push({ x: n.x, z: n.z, dist: current.dist + 1 });
              }
            }
          }
        }
      }
    }
    return alcanzables;
  }

  return {
    mapa,
    generarMapa,
    obtenerCamino,
    esCaminable,
    obtenerAlcance,
    GRID_WIDTH,
    GRID_HEIGHT,
    CUBE_SIZE,
    minGX,
    minGZ,
  };
}
