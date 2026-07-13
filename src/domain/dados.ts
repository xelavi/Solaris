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
