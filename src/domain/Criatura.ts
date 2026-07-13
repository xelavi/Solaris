import type { ArbolAttributes } from "./Character";

/** Tipo de daño elemental compartido con armas y armaduras. */
export type TipoDano = "lacerante" | "penetrante" | "contundente";

/** Reparto de daño por los 3 tipos, igual que armas/armaduras. */
export interface DanoPorTipo {
  lacerante: number;
  penetrante: number;
  contundente: number;
}

/** Cómo se ejecuta una técnica/activa. Compartido con activas y estiloMarcial. */
export type TipoEjecucion = "accion" | "reaccion" | "pasiva" | "ritual";

/** Naturaleza de la acción. `""` en pasivas. Compartido con activas y estiloMarcial. */
export type TipoAccion = "fisica" | "mental" | "";

/**
 * Técnica de una criatura. Es el equivalente a las dotes/activas de un
 * personaje. Usa el mismo sistema de campos que activas/estiloMarcial
 * (tipoEjecucion, tipoAccion, acciones, requisito, usable_si) y además
 * hace daño repartido en los 3 tipos.
 */
export interface Tecnica {
  nombre: string;
  descripcion: string;
  /** accion | reaccion | pasiva | ritual */
  tipoEjecucion: TipoEjecucion;
  /** fisica | mental | "" (pasivas) */
  tipoAccion: TipoAccion;
  /** Número de acciones que cuesta (0 en pasivas/reacciones/rituales). */
  acciones: number;
  /** Requisito para poder tenerla/usarla. */
  requisito: string;
  /** Condición de uso. */
  usable_si: string;
  dano: DanoPorTipo;
}

/**
 * Criatura del bestiario. Comparte las mismas stats numéricas que los
 * personajes (`atributos`), pero no tiene clases (especialidad/estilo/trasfondo).
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
  /**
   * Modificador numérico de "estilo marcial": se suma al 2d12 en las tiradas de
   * ataque de las técnicas que hacen daño (equivalente al Nivel del personaje).
   */
  estiloMarcial: number;
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
    tipoEjecucion: "accion",
    tipoAccion: "fisica",
    acciones: 1,
    requisito: "",
    usable_si: "",
    dano: { lacerante: 0, penetrante: 0, contundente: 0 },
  };
}

/**
 * Normaliza una técnica al formato unificado. Migra las guardadas en el
 * formato antiguo (`activa`/`esMental` booleanos) al nuevo sistema de campos.
 */
export function normalizarTecnica(t: any): Tecnica {
  const dano: DanoPorTipo = t?.dano ?? {
    lacerante: 0,
    penetrante: 0,
    contundente: 0,
  };

  // Formato nuevo: ya tiene tipoEjecucion.
  if (typeof t?.tipoEjecucion === "string") {
    return {
      nombre: t.nombre ?? "",
      descripcion: t.descripcion ?? "",
      tipoEjecucion: t.tipoEjecucion,
      tipoAccion: t.tipoAccion ?? "",
      acciones: typeof t.acciones === "number" ? t.acciones : 0,
      requisito: t.requisito ?? "",
      usable_si: t.usable_si ?? "",
      dano,
    };
  }

  // Formato antiguo: activa/esMental.
  const esActiva = t?.activa !== false;
  return {
    nombre: t?.nombre ?? "",
    descripcion: t?.descripcion ?? "",
    tipoEjecucion: esActiva ? "accion" : "pasiva",
    tipoAccion: esActiva ? (t?.esMental ? "mental" : "fisica") : "",
    acciones: esActiva ? 1 : 0,
    requisito: "",
    usable_si: "",
    dano,
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
    estiloMarcial: 0,
    atributos: crearAtributosCriatura(),
    tecnicas: [],
  };
}
