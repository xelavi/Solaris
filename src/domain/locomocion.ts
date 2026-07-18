// src/domain/locomocion.ts
// Fórmulas de salto y vuelo, compartidas por las fichas y la escena de juego.
//
// Salto (todas las criaturas y personajes):
//  - Horizontal (ecsas): la carrerilla (Movimiento) aporta la mitad y la fuerza
//    (Poderío) un tercio. Un humano medio (mov 3, poderío 0) salta 1 ecsa; uno
//    muy fuerte y rápido (mov 6, poderío 6) salta 5.
//  - Vertical (niveles de prisma): depende solo de la fuerza. Base 1 nivel,
//    +1 por cada 4 puntos de Poderío.
//
// Vuelo (solo criaturas con la etiqueta "Volador"): la velocidad de vuelo es el
// mismo Movimiento, aplicado por igual en horizontal y en vertical (cada nivel
// de subida/bajada cuesta 1 ecsa de movimiento).

/** Distancia de salto horizontal en ecsas. */
export function saltoHorizontal(movimiento: number, poderio: number): number {
  return Math.max(1, Math.floor(movimiento / 2) + Math.floor(poderio / 3));
}

/** Altura de salto vertical en niveles de prisma. */
export function saltoVertical(poderio: number): number {
  return Math.max(1, 1 + Math.floor(poderio / 4));
}

/** ¿Tiene la etiqueta "Volador"? (sin distinguir mayúsculas/acentos básicos). */
export function esVolador(etiquetas?: string[]): boolean {
  return (etiquetas ?? []).some((e) => e.trim().toLowerCase() === "volador");
}
