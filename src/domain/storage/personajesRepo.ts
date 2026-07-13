// src/domain/storage/personajesRepo.ts
// Repositorio de personajes. Encapsula las claves de almacenamiento y el formato
// de guardado; los componentes no conocen ninguna de las dos cosas.
//
// Las lecturas/escrituras de DATOS son asíncronas (van al backend, que puede ser
// Supabase). El puntero "en creación" es estado LOCAL del dispositivo y se
// mantiene síncrono sobre localStorage (ver almacen.ts).

import type { PersonajeGuardado } from "../Personaje";
import {
  leerJSON,
  guardarJSON,
  eliminarClave,
  leerListaIds,
  agregarAListaIds,
  quitarDeListaIds,
  leerPunteroLocal,
  guardarPunteroLocal,
  eliminarPunteroLocal,
} from "./almacen";

const CLAVE_LISTA = "lista_personajes";
const CLAVE_EN_CREACION = "personaje_en_creacion_id";

/** Todos los personajes guardados (completos o a medio crear). */
export async function listarPersonajes(): Promise<PersonajeGuardado[]> {
  const ids = await leerListaIds(CLAVE_LISTA);
  const personajes = await Promise.all(ids.map((id) => obtenerPersonaje(id)));
  return personajes.filter(
    (personaje): personaje is PersonajeGuardado => personaje !== null,
  );
}

export async function obtenerPersonaje(
  id: string,
): Promise<PersonajeGuardado | null> {
  return leerJSON<PersonajeGuardado>(id);
}

/** Guarda el personaje (sellando la fecha) y lo registra en la lista. */
export async function guardarPersonaje(
  personaje: PersonajeGuardado,
): Promise<void> {
  await guardarJSON(personaje.id, {
    ...personaje,
    fechaGuardado: new Date().toISOString(),
  });
  await agregarAListaIds(CLAVE_LISTA, personaje.id);
}

export async function eliminarPersonaje(id: string): Promise<void> {
  await eliminarClave(id);
  await quitarDeListaIds(CLAVE_LISTA, id);
}

// --- Personaje "en creación": el asistente mantiene un ID aparte para poder
// reanudar la creación si el usuario sale a mitad. Es un puntero LOCAL del
// dispositivo (síncrono, siempre en localStorage). ---

export function obtenerIdEnCreacion(): string | null {
  return leerPunteroLocal(CLAVE_EN_CREACION);
}

/**
 * Apunta el puntero "en creación" a un personaje ya existente. Lo usa el editor
 * para reutilizar el flujo del asistente (que edita el personaje señalado por
 * este puntero) sobre un personaje guardado.
 */
export function establecerIdEnCreacion(id: string): void {
  guardarPunteroLocal(CLAVE_EN_CREACION, id);
}

export function obtenerOCrearIdEnCreacion(): string {
  const existente = obtenerIdEnCreacion();
  if (existente) return existente;
  const nuevo = `personaje_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 9)}`;
  guardarPunteroLocal(CLAVE_EN_CREACION, nuevo);
  return nuevo;
}

export function limpiarIdEnCreacion(): void {
  eliminarPunteroLocal(CLAVE_EN_CREACION);
}
