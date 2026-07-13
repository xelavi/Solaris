// src/domain/storage/partidasRepo.ts
// Repositorio de partidas. Encapsula las claves de almacenamiento y el formato
// de guardado, igual que personajesRepo/criaturasRepo. Datos asíncronos sobre
// el backend intercambiable (localStorage hoy, Supabase mañana).

import type { PartidaData } from "../Partida";
import {
  leerJSON,
  guardarJSON,
  eliminarClave,
  leerListaIds,
  agregarAListaIds,
  quitarDeListaIds,
} from "./almacen";

const CLAVE_LISTA = "lista_partidas";

export async function listarPartidas(): Promise<PartidaData[]> {
  const ids = await leerListaIds(CLAVE_LISTA);
  const partidas = await Promise.all(ids.map((id) => obtenerPartida(id)));
  return partidas.filter(
    (partida): partida is PartidaData => partida !== null,
  );
}

export async function obtenerPartida(id: string): Promise<PartidaData | null> {
  return leerJSON<PartidaData>(id);
}

/** Guarda la partida y la registra en la lista. */
export async function guardarPartida(partida: PartidaData): Promise<void> {
  await guardarJSON(partida.id, partida);
  await agregarAListaIds(CLAVE_LISTA, partida.id);
}

export async function eliminarPartida(id: string): Promise<void> {
  await eliminarClave(id);
  await quitarDeListaIds(CLAVE_LISTA, id);
}

/**
 * Crea una partida vacía (sin equipos ni mapa) con solo un nombre, la guarda
 * y la devuelve. Los equipos, personajes y el mapa se añaden después desde la
 * propia escena. Rellena los campos heredados con valores neutros para no
 * romper los consumidores antiguos (vista clásica, mapa 3D).
 */
export async function crearPartidaVacia(nombre: string): Promise<PartidaData> {
  const partida: PartidaData = {
    id: `partida_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    nombre: nombre.trim(),
    equipos: [],
    fechaCreacion: new Date().toISOString(),
    combateActivo: false,
    rondaActual: 0,
    ordenIniciativa: [],
    turnoActualIndex: 0,
    logs: [],
  };
  await guardarPartida(partida);
  return partida;
}
