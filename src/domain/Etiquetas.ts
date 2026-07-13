/**
 * Catálogo global de etiquetas de criaturas, persistido como JSON en
 * localStorage bajo la clave "catalogo_etiquetas". Cada etiqueta tiene un
 * color fijo (estilo Notion) que se asigna al crearla y se reutiliza en
 * todas las fichas donde aparezca.
 */

import { leerJSON, guardarJSON } from "./storage/almacen";

const CLAVE_CATALOGO = "catalogo_etiquetas";

// El catálogo se lee/escribe de forma asíncrona (backend intercambiable). Los
// componentes lo cargan una vez con `cargarCatalogoEtiquetas()` en `onMounted`,
// lo guardan en un `ref` y se lo pasan a `clasesEtiqueta`, que es una función
// pura y síncrona pensada para usarse en las plantillas.

/** Clases Tailwind por color (literales para que el JIT las detecte). */
export const COLORES_ETIQUETA = {
  gray: "bg-gray-100 text-gray-700 border-gray-300",
  red: "bg-red-100 text-red-700 border-red-300",
  orange: "bg-orange-100 text-orange-700 border-orange-300",
  amber: "bg-amber-100 text-amber-700 border-amber-300",
  green: "bg-green-100 text-green-700 border-green-300",
  teal: "bg-teal-100 text-teal-700 border-teal-300",
  blue: "bg-blue-100 text-blue-700 border-blue-300",
  indigo: "bg-indigo-100 text-indigo-700 border-indigo-300",
  purple: "bg-purple-100 text-purple-700 border-purple-300",
  pink: "bg-pink-100 text-pink-700 border-pink-300",
} as const;

export type ColorEtiqueta = keyof typeof COLORES_ETIQUETA;

export interface Etiqueta {
  nombre: string;
  color: ColorEtiqueta;
}

export async function cargarCatalogoEtiquetas(): Promise<Etiqueta[]> {
  return (await leerJSON<Etiqueta[]>(CLAVE_CATALOGO)) ?? [];
}

/**
 * Devuelve la etiqueta del catálogo con ese nombre (ignorando mayúsculas),
 * creándola con el siguiente color de la paleta y guardándola si no existía.
 */
export async function obtenerOCrearEtiqueta(nombre: string): Promise<Etiqueta> {
  const catalogo = await cargarCatalogoEtiquetas();
  const normalizado = nombre.trim();
  const existente = catalogo.find(
    (e) => e.nombre.toLowerCase() === normalizado.toLowerCase(),
  );
  if (existente) return existente;

  const colores = Object.keys(COLORES_ETIQUETA) as ColorEtiqueta[];
  const nueva: Etiqueta = {
    nombre: normalizado,
    color: colores[catalogo.length % colores.length] ?? "gray",
  };
  catalogo.push(nueva);
  await guardarJSON(CLAVE_CATALOGO, catalogo);
  return nueva;
}

/**
 * Clases de color para una etiqueta por su nombre. Función PURA y SÍNCRONA
 * (apta para plantillas): recibe el catálogo ya cargado. Si la etiqueta no está
 * en el catálogo (p. ej. criaturas guardadas antes de que existiera), gris.
 */
export function clasesEtiqueta(nombre: string, catalogo: Etiqueta[]): string {
  const etiqueta = catalogo.find(
    (e) => e.nombre.toLowerCase() === nombre.trim().toLowerCase(),
  );
  return COLORES_ETIQUETA[etiqueta?.color ?? "gray"] ?? COLORES_ETIQUETA.gray;
}
