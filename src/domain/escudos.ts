/**
 * Los escudos existen a la vez como arma y como armadura (p. ej. "Escudo de
 * torre" es el arma 24 y la armadura 17). Este módulo los empareja por nombre
 * para que seleccionar uno en un apartado lo seleccione también en el otro.
 */

import armasData from "../assets/armas.json";
import armadurasData from "../assets/armaduras.json";

const normalizar = (s: string) => s.trim().toLowerCase();

const armaduraPorArma = new Map<number, number>();
const armaPorArmadura = new Map<number, number>();

for (const armadura of armadurasData.armaduras) {
  if (armadura.categoria !== "Escudo") continue;
  const arma = armasData.armas.find(
    (a) => normalizar(a.nombre) === normalizar(armadura.nombre),
  );
  if (arma) {
    armaduraPorArma.set(arma.id, armadura.id);
    armaPorArmadura.set(armadura.id, arma.id);
  }
}

/** Id de la armadura vinculada a un arma-escudo, o undefined si no es escudo. */
export function armaduraVinculada(armaId: number): number | undefined {
  return armaduraPorArma.get(armaId);
}

/** Id del arma vinculada a una armadura-escudo, o undefined si no es escudo. */
export function armaVinculada(armaduraId: number): number | undefined {
  return armaPorArmadura.get(armaduraId);
}

/** true si la armadura con ese id es de categoría Escudo. */
export function esArmaduraEscudo(armaduraId: number): boolean {
  return (
    armadurasData.armaduras.find((a) => a.id === armaduraId)?.categoria ===
    "Escudo"
  );
}

/**
 * Las armaduras no son acumulables: de todas las que posee el personaje, solo
 * están activas como mucho UNA armadura (no escudo) y UN escudo a la vez.
 *
 * `armaduraEquipada` / `escudoEquipado` son los slots elegidos por el jugador:
 * - undefined (personajes guardados antes de existir el slot): se activa la
 *   primera de cada tipo que posea.
 * - null: ese slot está deliberadamente vacío.
 * - Un id que ya no posee o del tipo equivocado se ignora (vuelve al defecto).
 */
export function armadurasActivas(
  armaduras: number[],
  armaduraEquipada?: number | null,
  escudoEquipado?: number | null,
): number[] {
  const normales = armaduras.filter((id) => !esArmaduraEscudo(id));
  const escudos = armaduras.filter((id) => esArmaduraEscudo(id));

  const resolver = (
    poseidas: number[],
    slot: number | null | undefined,
  ): number | null => {
    if (slot === null) return null;
    if (slot !== undefined && poseidas.includes(slot)) return slot;
    return poseidas[0] ?? null;
  };

  const activas: number[] = [];
  const armadura = resolver(normales, armaduraEquipada);
  if (armadura !== null) activas.push(armadura);
  const escudo = resolver(escudos, escudoEquipado);
  if (escudo !== null) activas.push(escudo);
  return activas;
}
