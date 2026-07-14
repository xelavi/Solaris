// Catálogo de formas de marca que se pueden pintar sobre una casilla del mapa
// (trampas, objetos, puntos de interés…). Compartido entre el menú izquierdo
// (selector) y la escena (dibujado + datos de la partida).
export type FormaMarca = "trampa" | "x" | "circulo" | "estrella" | "calavera";

export interface DefinicionFormaMarca {
  id: FormaMarca;
  emoji: string;
  label: string;
}

export const FORMAS_MARCA: DefinicionFormaMarca[] = [
  { id: "trampa", emoji: "⚠️", label: "Trampa" },
  { id: "x", emoji: "✕", label: "Marca X" },
  { id: "circulo", emoji: "●", label: "Círculo" },
  { id: "estrella", emoji: "★", label: "Punto de interés" },
  { id: "calavera", emoji: "💀", label: "Peligro" },
];

export function emojiDeForma(forma: FormaMarca): string {
  return FORMAS_MARCA.find((f) => f.id === forma)?.emoji ?? "✕";
}
