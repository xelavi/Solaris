// src/domain/storage/criaturasRepo.ts
// Repositorio de criaturas del bestiario. Mismo patrón que personajesRepo:
// datos asíncronos (backend intercambiable) + puntero "en creación" local.

import type { CriaturaData } from "../Criatura";
import { normalizarTecnica } from "../Criatura";
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

const CLAVE_LISTA = "lista_criaturas";
const CLAVE_EN_CREACION = "criatura_en_creacion_id";

export async function listarCriaturas(): Promise<CriaturaData[]> {
  const ids = await leerListaIds(CLAVE_LISTA);
  const criaturas = await Promise.all(ids.map((id) => obtenerCriatura(id)));
  return criaturas.filter(
    (criatura): criatura is CriaturaData => criatura !== null,
  );
}

export async function obtenerCriatura(
  id: string,
): Promise<CriaturaData | null> {
  const criatura = await leerJSON<CriaturaData>(id);
  if (!criatura) return null;
  // Migra técnicas del formato antiguo (activa/esMental) al unificado y
  // garantiza el campo estiloMarcial (criaturas antiguas no lo tenían).
  return {
    ...criatura,
    estiloMarcial: criatura.estiloMarcial ?? 0,
    tecnicas: (criatura.tecnicas ?? []).map(normalizarTecnica),
    habilidades: criatura.habilidades ?? [],
  };
}

/** Guarda la criatura (sellando la fecha) y la registra en la lista. */
export async function guardarCriatura(criatura: CriaturaData): Promise<void> {
  await guardarJSON(criatura.id, {
    ...criatura,
    fechaGuardado: new Date().toISOString(),
  });
  await agregarAListaIds(CLAVE_LISTA, criatura.id);
}

export async function eliminarCriatura(id: string): Promise<void> {
  await eliminarClave(id);
  await quitarDeListaIds(CLAVE_LISTA, id);
}

// --- Criatura "en creación", análogo al personaje en creación. Puntero LOCAL
// del dispositivo (síncrono, siempre en localStorage). ---

export function obtenerIdEnCreacion(): string | null {
  return leerPunteroLocal(CLAVE_EN_CREACION);
}

export function obtenerOCrearIdEnCreacion(): string {
  const existente = obtenerIdEnCreacion();
  if (existente) return existente;
  const nuevo = `criatura_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 9)}`;
  guardarPunteroLocal(CLAVE_EN_CREACION, nuevo);
  return nuevo;
}

export function limpiarIdEnCreacion(): void {
  eliminarPunteroLocal(CLAVE_EN_CREACION);
}

/** Apunta el puntero "en creación" a una criatura ya existente, para editarla
 * reutilizando la pantalla de creación. */
export function editarCriaturaExistente(id: string): void {
  guardarPunteroLocal(CLAVE_EN_CREACION, id);
}
