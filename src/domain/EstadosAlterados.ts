/**
 * Catálogo de estados alterados del juego (ver docs "1.2. Estados alterados").
 * Los datos viven en src/assets/estadosAlterados.json y son parte de la lógica
 * de las partidas: una instancia de personaje/criatura puede tener varios
 * estados aplicados, que se persisten dentro del JSON de la partida.
 */

import estadosData from "../assets/estadosAlterados.json";

export type CategoriaEstado = "fisica" | "mental" | "agotamiento";

/** Definición de un estado en el catálogo (fila de estadosAlterados.json). */
export interface EstadoAlterado {
  id: number;
  nombre: string;
  categoria: CategoriaEstado;
  /** true para estados paramétricos con valor X (Inhibido, Ímpetu, Sangrado). */
  acumulable: boolean;
  descripcion: string;
}

/**
 * Estado aplicado sobre una instancia concreta durante la partida. Referencia
 * al catálogo por id; `valor` es la X de los estados acumulables (contadores
 * de Sangrado, grado de Inhibido/Ímpetu...).
 */
export interface EstadoAplicado {
  estadoId: number;
  valor?: number;
}

export const CATALOGO_ESTADOS: EstadoAlterado[] = (
  estadosData.estados as EstadoAlterado[]
).slice();

export function obtenerEstado(id: number): EstadoAlterado | undefined {
  return CATALOGO_ESTADOS.find((e) => e.id === id);
}

export function estadosPorCategoria(
  categoria: CategoriaEstado,
): EstadoAlterado[] {
  return CATALOGO_ESTADOS.filter((e) => e.categoria === categoria);
}

/** Icono (emoji) por id de estado, para mostrarlo sobre los personajes. */
const ICONOS_ESTADO: Record<number, string> = {
  1: "🤼",
  2: "🕸️",
  3: "🔗",
  4: "🪤",
  5: "🙈",
  6: "⬇️",
  7: "🔇",
  8: "💀",
  9: "🧊",
  10: "🐌",
  11: "🔽",
  12: "🔼",
  13: "💔",
  14: "🆘",
  15: "🩸",
  16: "😨",
  17: "😱",
  18: "😡",
  19: "😵‍💫",
  20: "🤤",
  21: "😴",
  22: "💫",
  23: "🌀",
  24: "😪",
  25: "😓",
  26: "🥵",
};

const ICONO_CATEGORIA: Record<CategoriaEstado, string> = {
  fisica: "💪",
  mental: "🧠",
  agotamiento: "🥵",
};

/** Emoji representativo de un estado; recurre al de su categoría si no hay uno. */
export function iconoEstado(id: number): string {
  const especifico = ICONOS_ESTADO[id];
  if (especifico) return especifico;
  const estado = obtenerEstado(id);
  return estado ? ICONO_CATEGORIA[estado.categoria] : "❔";
}

/** Texto para mostrar un estado aplicado, añadiendo la X si es acumulable. */
export function nombreEstadoAplicado(aplicado: EstadoAplicado): string {
  const estado = obtenerEstado(aplicado.estadoId);
  if (!estado) return "Estado desconocido";
  if (estado.acumulable && aplicado.valor != null) {
    return `${estado.nombre} ${aplicado.valor}`;
  }
  return estado.nombre;
}
