import type { TokenPartida } from "./Partida";
import type { DanoPorTipo } from "./Criatura";
import { obtenerCriatura } from "./storage/criaturasRepo";
import { obtenerPersonaje } from "./storage/personajesRepo";
import armadurasData from "../assets/armaduras.json";
import { armadurasActivas } from "./escudos";

/**
 * Datos defensivos de un objetivo de ataque, unificados para personajes y
 * criaturas. La armadura se expresa por tipo de daño; los tipos ausentes
 * cuentan como 0 (p. ej. un personaje solo tiene armadura física).
 */
export interface ObjetivoCombate {
  nombre: string;
  esquiva: number;
  armadura: Partial<Record<keyof DanoPorTipo, number>>;
}

/**
 * Resuelve un token del escenario a sus datos defensivos de combate.
 * - Criaturas: Esquiva = evasión y armadura por tipo tal cual.
 * - Personajes: Esquiva = evasión; armadura = Resistencia + armaduras
 *   equipadas (solo tipos físicos lacerante/perforante/contundente).
 * Devuelve null si la entidad de origen ya no existe.
 */
export async function resolverObjetivoCombate(
  token: Pick<TokenPartida, "refId" | "tipo" | "nombre">,
): Promise<ObjetivoCombate | null> {
  if (token.tipo === "criatura") {
    const c = await obtenerCriatura(token.refId);
    if (!c) return null;
    return {
      nombre: c.nombre,
      esquiva: c.atributos.evasion ?? 0,
      armadura: c.armadura,
    };
  }

  const p = await obtenerPersonaje(token.refId);
  if (!p) return null;
  const r = p.atributos.resistencia ?? 0;
  const armadura: Partial<Record<keyof DanoPorTipo, number>> = {
    lacerante: r,
    perforante: r,
    contundente: r,
  };
  // Solo cuentan la armadura y el escudo activos (no se acumulan armaduras)
  const activas = armadurasActivas(
    p.armaduras ?? [],
    p.armadura_equipada,
    p.escudo_equipado,
  );
  for (const id of activas) {
    const a = armadurasData.armaduras.find((x) => x.id === id);
    if (!a) continue;
    armadura.lacerante = (armadura.lacerante ?? 0) + a.lacerante;
    armadura.perforante = (armadura.perforante ?? 0) + a.perforante;
    armadura.contundente = (armadura.contundente ?? 0) + a.contundente;
  }
  return {
    nombre: p.nombre,
    esquiva: p.atributos.evasion ?? 0,
    armadura,
  };
}

/** Armadura del objetivo frente a un tipo de daño (0 si no la tiene). */
export function armaduraContra(
  objetivo: ObjetivoCombate,
  tipo: keyof DanoPorTipo,
): number {
  return objetivo.armadura[tipo] ?? 0;
}

/**
 * Resuelve un ataque contra un objetivo aplicando la penetración de armadura:
 * la puntería del atacante reduce la armadura efectiva del objetivo (mínimo 0)
 * y el daño neto es el daño menos esa armadura efectiva (mínimo 0). Impacta si
 * el total de la tirada alcanza la Esquiva (empate impacta).
 */
export function resolverImpacto(opts: {
  totalTirada: number;
  esquiva: number;
  dano: number;
  armadura: number;
  punteria: number;
}): { impacta: boolean; armaduraEfectiva: number; danoNeto: number } {
  const armaduraEfectiva = Math.max(0, opts.armadura - opts.punteria);
  return {
    impacta: opts.totalTirada >= opts.esquiva,
    armaduraEfectiva,
    danoNeto: Math.max(0, opts.dano - armaduraEfectiva),
  };
}
