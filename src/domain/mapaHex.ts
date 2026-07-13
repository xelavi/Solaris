// src/domain/mapaHex.ts
// Mapas de prismas hexagonales exportados por el Editor de Hexágonos
// (formato "hex-prisma"). El JSON solo contiene geometría; las casillas
// válidas para entidades se calculan al cargar el mapa en la partida, de
// forma que la regla pueda cambiar sin invalidar mapas ya exportados.

export interface MapaHexCelda {
  col: number;
  row: number;
  y: number;
  shape: "full" | "half";
  rot: number;
  color: string;
  emissive: string;
  metalness: number;
  roughness: number;
  emissiveIntensity: number;
}

export interface MapaHex {
  version: number;
  type: "hex-prisma";
  hexRadius: number;
  prismHeight: number;
  timestamp?: string;
  cells: MapaHexCelda[];
}

// Celdas libres necesarias encima de un prisma para poder albergar una
// entidad (jugador, criatura u objeto) sobre su cara superior.
export const HUECO_ENTIDAD = 2;

export function claveCelda(col: number, row: number, y: number): string {
  return `${col},${row},${y}`;
}

export function validarMapaHex(json: unknown): MapaHex | null {
  const data = json as Partial<MapaHex> | null;
  if (!data || data.type !== "hex-prisma" || !Array.isArray(data.cells))
    return null;

  const cells: MapaHexCelda[] = [];
  for (const c of data.cells as Partial<MapaHexCelda>[]) {
    if (
      !c ||
      typeof c.col !== "number" ||
      typeof c.row !== "number" ||
      typeof c.y !== "number"
    )
      continue;
    cells.push({
      col: c.col,
      row: c.row,
      y: c.y,
      shape: c.shape === "half" ? "half" : "full",
      rot: typeof c.rot === "number" ? ((c.rot % 6) + 6) % 6 : 0,
      color: typeof c.color === "string" ? c.color : "#ffffff",
      emissive: typeof c.emissive === "string" ? c.emissive : "#000000",
      metalness: typeof c.metalness === "number" ? c.metalness : 0,
      roughness: typeof c.roughness === "number" ? c.roughness : 1,
      emissiveIntensity:
        typeof c.emissiveIntensity === "number" ? c.emissiveIntensity : 0,
    });
  }
  if (cells.length === 0) return null;

  return {
    version: typeof data.version === "number" ? data.version : 1,
    type: "hex-prisma",
    hexRadius: typeof data.hexRadius === "number" ? data.hexRadius : 2,
    prismHeight: typeof data.prismHeight === "number" ? data.prismHeight : 2,
    timestamp: typeof data.timestamp === "string" ? data.timestamp : undefined,
    cells,
  };
}

// Casilla: prisma cuya cara superior puede albergar una entidad.
export interface CasillaMapa {
  col: number;
  row: number;
  y: number;
}

// Un prisma es casilla si las HUECO_ENTIDAD celdas por encima están libres.
export function calcularCasillas(mapa: MapaHex): CasillaMapa[] {
  const ocupadas = new Set(
    mapa.cells.map((c) => claveCelda(c.col, c.row, c.y))
  );
  return mapa.cells
    .filter((c) => {
      for (let i = 1; i <= HUECO_ENTIDAD; i++) {
        if (ocupadas.has(claveCelda(c.col, c.row, c.y + i))) return false;
      }
      return true;
    })
    .map((c) => ({ col: c.col, row: c.row, y: c.y }));
}

// --- Disposición en el mundo (pointy-top, offset odd-r, igual que el editor
// y que la cuadrícula plana de jugarPartida) ---

const paridad = (n: number) => ((n % 2) + 2) % 2;

export function centroHex(
  mapa: MapaHex,
  col: number,
  row: number
): { x: number; z: number } {
  const ancho = Math.sqrt(3) * mapa.hexRadius;
  return {
    x: col * ancho + paridad(row) * (ancho / 2),
    z: row * 1.5 * mapa.hexRadius,
  };
}

// Altura (mundo) de la cara superior del prisma de la celda y.
export function alturaSuperficie(mapa: MapaHex, y: number): number {
  return (y + 1) * mapa.prismHeight;
}
