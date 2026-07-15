// src/domain/storage/bestiarioOrganizacionRepo.ts
// Organización visual del bestiario: carpetas y orden de las criaturas dentro
// de cada contenedor. Es estado de presentación, independiente de los datos de
// cada criatura (que viven en criaturasRepo). Se guarda como un único JSON.

import { leerJSON, guardarJSON } from "./almacen";

const CLAVE = "bestiario_organizacion";

/** Clave del contenedor raíz (criaturas que no están en ninguna carpeta). */
export const RAIZ = "raiz";

export interface CarpetaBestiario {
  id: string;
  nombre: string;
}

/** Modo de presentación de las tarjetas del bestiario. */
export type VistaBestiario = "grid" | "lista";

export interface OrganizacionBestiario {
  /** Carpetas en su orden de aparición. */
  carpetas: CarpetaBestiario[];
  /** Orden de ids de criatura por contenedor: RAIZ o el id de una carpeta. */
  orden: Record<string, string[]>;
  /** Carpetas plegadas/desplegadas (id -> abierta). */
  abiertas: Record<string, boolean>;
  /** Modo de vista: cuadrícula o lista vertical. */
  vista: VistaBestiario;
}

function organizacionVacia(): OrganizacionBestiario {
  return { carpetas: [], orden: { [RAIZ]: [] }, abiertas: {}, vista: "grid" };
}

export async function cargarOrganizacion(): Promise<OrganizacionBestiario> {
  const guardada = await leerJSON<OrganizacionBestiario>(CLAVE);
  if (!guardada) return organizacionVacia();
  return {
    carpetas: guardada.carpetas ?? [],
    orden: { [RAIZ]: [], ...(guardada.orden ?? {}) },
    abiertas: guardada.abiertas ?? {},
    vista: guardada.vista ?? "grid",
  };
}

export async function guardarOrganizacion(
  org: OrganizacionBestiario,
): Promise<void> {
  await guardarJSON(CLAVE, org);
}

/**
 * Ajusta la organización a las criaturas que existen de verdad:
 *  - elimina de las listas de orden los ids que ya no existen,
 *  - añade a la raíz las criaturas nuevas (que aún no están en ningún sitio),
 *  - descarta contenedores de carpetas que ya no existen.
 * Devuelve la organización saneada (muta y devuelve el mismo objeto).
 */
export function reconciliar(
  org: OrganizacionBestiario,
  idsExistentes: string[],
): OrganizacionBestiario {
  const existentes = new Set(idsExistentes);
  const contenedoresValidos = new Set<string>([
    RAIZ,
    ...org.carpetas.map((c) => c.id),
  ]);

  // Contenedores obsoletos fuera; listas depuradas de ids inexistentes.
  const colocadas = new Set<string>();
  const ordenLimpio: Record<string, string[]> = {};
  for (const clave of contenedoresValidos) {
    const lista = (org.orden[clave] ?? []).filter((id) => {
      if (!existentes.has(id) || colocadas.has(id)) return false;
      colocadas.add(id);
      return true;
    });
    ordenLimpio[clave] = lista;
  }

  // Criaturas nuevas (o huérfanas) a la raíz.
  const raiz = ordenLimpio[RAIZ] ?? (ordenLimpio[RAIZ] = []);
  for (const id of idsExistentes) {
    if (!colocadas.has(id)) raiz.push(id);
  }

  org.orden = ordenLimpio;
  return org;
}

export function crearIdCarpeta(): string {
  return `carpeta_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
