// src/domain/Personaje.ts
// Modelo canónico del personaje tal y como se guarda en el navegador.

/**
 * Atributos derivados del árbol de talentos. Definición única para todo el
 * proyecto: personajes, criaturas y cálculo del árbol la comparten.
 */
export interface ArbolAttributes {
  // Atributos principales (cuentan nodos)
  cuerpo: number;
  agilidad: number;
  mente: number;

  // Atributos que suman 1 por nodo
  rangoCritico: number;
  habilidadesExtra: number;
  limiteHabilidad: number;
  acciones: number;
  reacciones: number;

  // Atributos que suman 3 por nodo + 3 por atributo principal según su tipo
  hp: number;
  poderio: number;
  movimiento: number;
  resistencia: number;
  regeneracion: number;
  evasion: number;
  iniciativa: number;
  punteria: number;
  puntosHabilidad: number;
  voluntad: number;
}

/** Id de la pseudo-arma "Sin Armas", disponible para todos los personajes. */
export const ID_SIN_ARMAS = -1;

/**
 * Configuración de visualización de un objeto de equipo en la ficha:
 * su orden (por la posición en el array) y si se muestra o no.
 */
export interface VistaEquipo {
  /** Id del arma/armadura. -1 (ID_SIN_ARMAS) para la pseudo-arma "Sin Armas". */
  id: number;
  visible: boolean;
}

/**
 * Personaje tal y como se persiste en localStorage (clave = id).
 * Es también el formato que consumen las partidas al montar equipos,
 * así que cualquier cambio aquí debe mantener compatibilidad con los
 * personajes ya guardados.
 */
export interface PersonajeGuardado {
  id: string;
  nombre: string;
  nivel: number;
  especialidad: string;
  especialidad_habilidades: string[];
  especialidad_dotes: number[];
  estilo_marcial: string;
  estilo_marcial_dotes: string[];
  trasfondo: string;
  trasfondo_habilidades: string[];
  raza: string;
  /** Nodos del árbol seleccionados, serializados como JSON. */
  arbol: string;
  /** Habilidades con rangos asignados, serializadas como JSON. */
  habilidades: string;
  /** IDs de las armas seleccionadas. */
  armas: number[];
  /** IDs de las armaduras seleccionadas. */
  armaduras: number[];
  /**
   * Slot de armadura activa (no escudo). Las armaduras no se acumulan: solo
   * una activa a la vez, más un escudo. undefined = la primera que posea;
   * null = ninguna. Ver domain/escudos.ts (armadurasActivas).
   */
  armadura_equipada?: number | null;
  /** Slot del escudo activo, mismas reglas que armadura_equipada. */
  escudo_equipado?: number | null;
  /** Orden y visibilidad de las armas en la ficha (incluye "Sin Armas"). */
  armas_vista?: VistaEquipo[];
  /** Orden y visibilidad de las armaduras en la ficha. */
  armaduras_vista?: VistaEquipo[];
  atributos: ArbolAttributes;
  /** Contador de puntos de "Arma predilecta" (innata del Vagabond). */
  arma_predilecta_puntos?: number;
  fechaGuardado?: string;
}

/**
 * Valores iniciales de los atributos antes de recalcularlos desde el árbol
 * (el recálculo los sobreescribe en cuanto hay nodos o nivel).
 */
export function crearAtributosPorDefecto(): ArbolAttributes {
  return {
    cuerpo: 0,
    agilidad: 0,
    mente: 0,
    rangoCritico: 0,
    habilidadesExtra: 0,
    limiteHabilidad: 0,
    acciones: 0,
    reacciones: 0,
    hp: 10,
    poderio: 0,
    movimiento: 3,
    resistencia: 0,
    regeneracion: 2,
    evasion: 12,
    iniciativa: 0,
    punteria: 0,
    puntosHabilidad: 10,
    voluntad: 2,
  };
}

/** Personaje vacío con valores por defecto para el asistente de creación. */
export function crearPersonajeVacio(id = ""): PersonajeGuardado {
  return {
    id,
    nombre: "",
    nivel: 1,
    especialidad: "",
    especialidad_habilidades: [],
    especialidad_dotes: [],
    estilo_marcial: "",
    estilo_marcial_dotes: [],
    trasfondo: "",
    trasfondo_habilidades: [],
    raza: "",
    arbol: "",
    habilidades: "",
    armas: [],
    armaduras: [],
    atributos: crearAtributosPorDefecto(),
  };
}

/**
 * Un personaje se considera completo (y por tanto se lista y conserva)
 * cuando tiene nombre, trasfondo, especialidad y estilo marcial.
 */
export function esPersonajeCompleto(
  personaje: Pick<
    PersonajeGuardado,
    "nombre" | "trasfondo" | "especialidad" | "estilo_marcial"
  >,
): boolean {
  return (
    (personaje.nombre ?? "").trim() !== "" &&
    (personaje.trasfondo ?? "").trim() !== "" &&
    (personaje.especialidad ?? "").trim() !== "" &&
    (personaje.estilo_marcial ?? "").trim() !== ""
  );
}
