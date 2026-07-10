import type { ArbolAttributes } from "./Character";

/** Tipo de daño elemental compartido con armas y armaduras. */
export type TipoDano = "lacerante" | "penetrante" | "contundente";

/** Reparto de daño por los 3 tipos, igual que armas/armaduras. */
export interface DanoPorTipo {
  lacerante: number;
  penetrante: number;
  contundente: number;
}

/**
 * Técnica de una criatura. Es el equivalente a las dotes/activas de un
 * personaje, pero simplificado: puede ser activa o pasiva, física o mental,
 * hace daño repartido en los 3 tipos y tiene una descripción.
 */
export interface Tecnica {
  nombre: string;
  descripcion: string;
  /** true = activa, false = pasiva */
  activa: boolean;
  /** true = mental, false = física */
  esMental: boolean;
  dano: DanoPorTipo;
}

/**
 * Criatura del bestiario. Comparte las mismas stats numéricas que los
 * personajes (`atributos`), pero no tiene clases (oficio/estilo/trasfondo).
 * En su lugar tiene técnicas. Añade metadatos propios del bestiario:
 * dificultad, etiquetas de tipo, descripción y experiencia otorgada.
 */
export interface CriaturaData {
  id: string;
  nombre: string;
  /** Nivel de desafío de la criatura. */
  dificultad: number;
  /** Puntos de experiencia que reciben los jugadores al derrotarla. */
  experiencia: number;
  /** Tipos/categorías (bestia, no-muerto, etc.). */
  etiquetas: string[];
  descripcion: string;
  /** Armadura por tipo de daño (las criaturas no equipan armaduras). */
  armadura: DanoPorTipo;
  atributos: ArbolAttributes;
  tecnicas: Tecnica[];
  fechaGuardado?: string;
}

/** Atributos por defecto de una criatura recién creada. */
export function crearAtributosCriatura(): ArbolAttributes {
  return {
    cuerpo: 0,
    agilidad: 0,
    mente: 0,
    rangoCritico: 24,
    habilidadesExtra: 0,
    limiteHabilidad: 5,
    acciones: 2,
    reacciones: 1,
    hp: 10,
    poderio: 0,
    movimiento: 3,
    resistencia: 0,
    regeneracion: 2,
    evasion: 12,
    iniciativa: 0,
    punteria: 0,
    puntosHabilidad: 0,
  };
}

/** Técnica vacía para el formulario de creación. */
export function crearTecnicaVacia(): Tecnica {
  return {
    nombre: "",
    descripcion: "",
    activa: true,
    esMental: false,
    dano: { lacerante: 0, penetrante: 0, contundente: 0 },
  };
}

/** Criatura vacía con valores por defecto. */
export function crearCriaturaVacia(id: string): CriaturaData {
  return {
    id,
    nombre: "",
    dificultad: 1,
    experiencia: 0,
    etiquetas: [],
    descripcion: "",
    armadura: { lacerante: 0, penetrante: 0, contundente: 0 },
    atributos: crearAtributosCriatura(),
    tecnicas: [],
  };
}
