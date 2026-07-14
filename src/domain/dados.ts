// Motor de tiradas de Solaris.
//
// La fórmula base del juego es 2d12 + modificador. La ventaja/desventaja NO
// cambian el modificador: hacen que se tiren d12 adicionales y se conserven los
// dos mejores (ventaja) o los dos peores (desventaja). Ventaja y desventaja son
// excluyentes y acumulables, por lo que se representan con un único entero:
//   ventaja > 0  → Ventaja ×N   (2 + N dados, se quedan los 2 mejores)
//   ventaja < 0  → Desventaja ×N (2 + N dados, se quedan los 2 peores)
//   ventaja = 0  → tirada normal (2 dados)

export interface DesgloseTirada {
  formula: string; // p. ej. "2d12 + 5"
  ventaja: number; // neto: >0 ventaja, <0 desventaja, 0 normal
  dadosTirados: number[]; // todos los d12 lanzados
  dadosUsados: number[]; // los 2 conservados (valores)
  indicesUsados: number[]; // posiciones conservadas dentro de dadosTirados
  sumaDados: number; // suma de los 2 conservados
  modificador: number;
  modificadorLabel: string; // qué representa el modificador (Nivel, atributo…)
  total: number;
  caras?: number; // caras del dado tirado (por defecto 12, tiradas de /roll pueden usar otro)
}

function d12(): number {
  return Math.floor(Math.random() * 12) + 1;
}

export function tirar2d12(
  modificador: number,
  modificadorLabel: string,
  ventaja = 0,
): DesgloseTirada {
  const extra = Math.abs(ventaja);
  const cantidad = 2 + extra;
  const dadosTirados = Array.from({ length: cantidad }, () => d12());

  // Índices de los dos dados conservados (para poder resaltarlos en el desglose).
  const orden = dadosTirados
    .map((v, i) => ({ v, i }))
    .sort((a, b) => b.v - a.v);

  let usados: { v: number; i: number }[];
  if (ventaja > 0) usados = orden.slice(0, 2); // los 2 mejores
  else if (ventaja < 0) usados = orden.slice(-2); // los 2 peores
  else usados = orden; // normal: se usan ambos

  const dadosUsados = usados.map((u) => u.v);
  const indicesUsados = usados.map((u) => u.i);
  const sumaDados = dadosUsados.reduce((a, b) => a + b, 0);
  const total = sumaDados + modificador;

  const signo =
    modificador >= 0 ? `+ ${modificador}` : `− ${Math.abs(modificador)}`;

  return {
    formula: `2d12 ${signo}`,
    ventaja,
    dadosTirados,
    dadosUsados,
    indicesUsados,
    sumaDados,
    modificador,
    modificadorLabel,
    total,
  };
}

// Etiqueta legible del estado de ventaja/desventaja.
export function etiquetaVentaja(ventaja: number): string {
  if (ventaja > 0) return `Ventaja ×${ventaja}`;
  if (ventaja < 0) return `Desventaja ×${-ventaja}`;
  return "Normal";
}

// --- Comando de chat /roll ---
//
// Tirada libre para el chat de la partida, independiente de la fórmula fija
// 2d12 del personaje: XdY [v|d] [+/- mod]. Con v/d y 2 o más dados se
// conservan solo los 2 mejores (v) o peores (d), igual que la ventaja del
// personaje; sin v/d se suman todos los dados tirados.
export interface ComandoRoll {
  cantidad: number;
  caras: number;
  modo: number; // 1 ventaja (mejores 2), -1 desventaja (peores 2), 0 normal
  modificador: number;
}

// Reconoce "/roll 3d12 v + 2", "/roll2d20d-1", "/roll4d6+3"… con espacios
// opcionales entre las partes. Devuelve null si el texto no es un /roll válido.
export function parseComandoRoll(texto: string): ComandoRoll | null {
  const m = texto
    .trim()
    .match(/^\/roll\s*(\d+)\s*d\s*(\d+)\s*(v|d)?\s*(?:([+-])\s*(\d+))?\s*$/i);
  if (!m) return null;

  const cantidad = Number(m[1]);
  const caras = Number(m[2]);
  if (cantidad < 1 || caras < 1) return null;

  const modo = m[3]?.toLowerCase() === "v" ? 1 : m[3]?.toLowerCase() === "d" ? -1 : 0;
  const modificador = m[4] ? Number(`${m[4]}${m[5]}`) : 0;

  return { cantidad, caras, modo, modificador };
}

// Tirada genérica de XdY con ventaja/desventaja opcional (conservar los 2
// mejores/peores) y modificador plano. Usada por el comando /roll del chat.
export function tirarDados(
  cantidad: number,
  caras: number,
  modo: number,
  modificador: number,
): DesgloseTirada {
  const dadoN = () => Math.floor(Math.random() * caras) + 1;
  const dadosTirados = Array.from({ length: cantidad }, dadoN);

  const conservaDos = modo !== 0 && cantidad >= 2;
  const orden = dadosTirados
    .map((v, i) => ({ v, i }))
    .sort((a, b) => b.v - a.v);

  let usados: { v: number; i: number }[];
  if (conservaDos && modo > 0) usados = orden.slice(0, 2); // los 2 mejores
  else if (conservaDos && modo < 0) usados = orden.slice(-2); // los 2 peores
  else usados = orden; // sin v/d: se suman todos los dados tirados

  const dadosUsados = usados.map((u) => u.v);
  const indicesUsados = usados.map((u) => u.i);
  const sumaDados = dadosUsados.reduce((a, b) => a + b, 0);
  const total = sumaDados + modificador;
  const ventaja = conservaDos ? (modo > 0 ? cantidad - 2 : -(cantidad - 2)) : 0;

  const signo =
    modificador >= 0 ? `+ ${modificador}` : `− ${Math.abs(modificador)}`;
  const sufijoModo = conservaDos ? (modo > 0 ? " (ventaja)" : " (desventaja)") : "";

  return {
    formula: `${cantidad}d${caras}${sufijoModo} ${signo}`,
    ventaja,
    dadosTirados,
    dadosUsados,
    indicesUsados,
    sumaDados,
    modificador,
    modificadorLabel: "Modificador",
    total,
    caras,
  };
}
