// src/domain/storage/personajesOrganizacionRepo.ts
// Organización visual de los personajes: carpetas y orden de los personajes
// dentro de cada contenedor. Es estado de presentación, independiente de los
// datos de cada personaje (que viven en personajesRepo). Se guarda como un
// único JSON. Refleja el mismo patrón que bestiarioOrganizacionRepo.

import { leerJSON, guardarJSON } from "./almacen";

const CLAVE = "personajes_organizacion";

/** Clave del contenedor raíz (personajes que no están en ninguna carpeta). */
export const RAIZ = "raiz";

export interface CarpetaPersonajes {
  id: string;
  nombre: string;
}

/** Modo de presentación de las tarjetas de personajes. */
export type VistaPersonajes = "grid" | "lista";

export interface OrganizacionPersonajes {
  /** Carpetas en su orden de aparición. */
  carpetas: CarpetaPersonajes[];
  /** Orden de ids de personaje por contenedor: RAIZ o el id de una carpeta. */
  orden: Record<string, string[]>;
  /** Carpetas plegadas/desplegadas (id -> abierta). */
  abiertas: Record<string, boolean>;
  /** Modo de vista: cuadrícula o lista vertical. */
  vista: VistaPersonajes;
}

function organizacionVacia(): OrganizacionPersonajes {
  return { carpetas: [], orden: { [RAIZ]: [] }, abiertas: {}, vista: "grid" };
}

export async function cargarOrganizacion(): Promise<OrganizacionPersonajes> {
  const guardada = await leerJSON<OrganizacionPersonajes>(CLAVE);
  if (!guardada) return organizacionVacia();
  return {
    carpetas: guardada.carpetas ?? [],
    orden: { [RAIZ]: [], ...(guardada.orden ?? {}) },
    abiertas: guardada.abiertas ?? {},
    vista: guardada.vista ?? "grid",
  };
}

export async function guardarOrganizacion(
  org: OrganizacionPersonajes,
): Promise<void> {
  await guardarJSON(CLAVE, org);
}

/**
 * Ajusta la organización a los personajes que existen de verdad:
 *  - elimina de las listas de orden los ids que ya no existen,
 *  - añade a la raíz los personajes nuevos (que aún no están en ningún sitio),
 *  - descarta contenedores de carpetas que ya no existen.
 * Devuelve la organización saneada (muta y devuelve el mismo objeto).
 */
export function reconciliar(
  org: OrganizacionPersonajes,
  idsExistentes: string[],
): OrganizacionPersonajes {
  const existentes = new Set(idsExistentes);
  const contenedoresValidos = new Set<string>([
    RAIZ,
    ...org.carpetas.map((c) => c.id),
  ]);

  // Contenedores obsoletos fuera; listas depuradas de ids inexistentes.
  const colocados = new Set<string>();
  const ordenLimpio: Record<string, string[]> = {};
  for (const clave of contenedoresValidos) {
    const lista = (org.orden[clave] ?? []).filter((id) => {
      if (!existentes.has(id) || colocados.has(id)) return false;
      colocados.add(id);
      return true;
    });
    ordenLimpio[clave] = lista;
  }

  // Personajes nuevos (o huérfanos) a la raíz.
  const raiz = ordenLimpio[RAIZ] ?? (ordenLimpio[RAIZ] = []);
  for (const id of idsExistentes) {
    if (!colocados.has(id)) raiz.push(id);
  }

  org.orden = ordenLimpio;
  return org;
}

export function crearIdCarpeta(): string {
  return `carpeta_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
