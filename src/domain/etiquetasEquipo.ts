/**
 * Etiquetas de equipo (armas y armaduras), definidas en assets/etiquetas.json.
 * Las armas referencian estas etiquetas por id (campo `etiquetas`); las
 * armaduras siguen usando `categoria` por nombre. Los colores reutilizan la
 * paleta Tailwind de COLORES_ETIQUETA (domain/etiquetas.ts).
 */

import etiquetasData from "../assets/etiquetas.json";
import { COLORES_ETIQUETA, type ColorEtiqueta } from "./Etiquetas";

export interface EtiquetaEquipo {
  id: number;
  nombre: string;
  color: ColorEtiqueta;
}

export const ETIQUETAS_EQUIPO: EtiquetaEquipo[] =
  etiquetasData.etiquetas as EtiquetaEquipo[];

const porId = new Map(ETIQUETAS_EQUIPO.map((e) => [e.id, e]));
const porNombre = new Map(
  ETIQUETAS_EQUIPO.map((e) => [e.nombre.toLowerCase(), e]),
);

/** Resuelve una lista de ids a sus etiquetas, ignorando ids desconocidos. */
export function resolverEtiquetas(ids: number[] | undefined): EtiquetaEquipo[] {
  return (ids ?? [])
    .map((id) => porId.get(id))
    .filter((e): e is EtiquetaEquipo => e !== undefined);
}

/** Nombres de las etiquetas de un arma a partir de sus ids. */
export function nombresEtiquetas(ids: number[] | undefined): string[] {
  return resolverEtiquetas(ids).map((e) => e.nombre);
}

export function etiquetaPorNombre(
  nombre: string,
): EtiquetaEquipo | undefined {
  return porNombre.get(nombre.trim().toLowerCase());
}

/** Clases Tailwind para una etiqueta de equipo; gris si no está en el catálogo. */
export function clasesEtiquetaEquipo(
  etiqueta: EtiquetaEquipo | string,
): string {
  const resuelta =
    typeof etiqueta === "string" ? etiquetaPorNombre(etiqueta) : etiqueta;
  return COLORES_ETIQUETA[resuelta?.color ?? "gray"] ?? COLORES_ETIQUETA.gray;
}
