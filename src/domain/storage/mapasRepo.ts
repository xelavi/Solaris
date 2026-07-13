// src/domain/storage/mapasRepo.ts
// Catálogo GLOBAL de mapas (compartido entre todas las partidas), siguiendo el
// mismo patrón de repos que personajes/criaturas: una lista de IDs + una clave
// por mapa. Cada mapa es un JSON de tipo MapaHex exportado por el Editor de
// Hexágonos. Datos asíncronos sobre el backend intercambiable.

import type { MapaHex } from "../mapaHex";
import {
  leerJSON,
  guardarJSON,
  eliminarClave,
  leerListaIds,
  agregarAListaIds,
  quitarDeListaIds,
} from "./almacen";

const CLAVE_LISTA = "lista_mapas";

export interface MapaGuardado {
  id: string;
  nombre: string;
  mapa: MapaHex;
  fechaGuardado: string;
}

export async function listarMapas(): Promise<MapaGuardado[]> {
  const ids = await leerListaIds(CLAVE_LISTA);
  const mapas = await Promise.all(ids.map((id) => obtenerMapa(id)));
  return mapas.filter((m): m is MapaGuardado => m !== null);
}

export async function obtenerMapa(id: string): Promise<MapaGuardado | null> {
  return leerJSON<MapaGuardado>(id);
}

/** Guarda un mapa nuevo en el catálogo y devuelve la entrada creada. */
export async function guardarMapa(
  nombre: string,
  mapa: MapaHex,
): Promise<MapaGuardado> {
  const entrada: MapaGuardado = {
    id: `mapa_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    nombre: nombre.trim() || "Mapa sin nombre",
    mapa,
    fechaGuardado: new Date().toISOString(),
  };
  await guardarJSON(entrada.id, entrada);
  await agregarAListaIds(CLAVE_LISTA, entrada.id);
  return entrada;
}

export async function eliminarMapa(id: string): Promise<void> {
  await eliminarClave(id);
  await quitarDeListaIds(CLAVE_LISTA, id);
}
