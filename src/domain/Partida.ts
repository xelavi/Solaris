// src/domain/Partida.ts
import { Character } from "./Character";
import type { MapaHex } from "./mapaHex";
import type { EstadoAplicado } from "./EstadosAlterados";
import type { DesgloseTirada } from "./dados";
import type { FormaMarca } from "./MarcasMapa";

// Tipos para el sistema de gestión de partidas
export interface PersonajeInstancia {
  instanciaId: string;
  personajeId: string;
  // Datos básicos
  nombre: string;
  nivel: number;
  especialidad: string;
  estilo_marcial: string;
  trasfondo: string;
  raza: string;
  // Datos completos del personaje
  especialidad_habilidades: string[];
  especialidad_dotes: number[];
  estilo_marcial_dotes: string[];
  trasfondo_habilidades: string[];
  arbol: string;
  habilidades: string;
  armas: number[];
  armaduras: number[];
  // Slots de armadura/escudo activos (ver domain/escudos.ts). Opcionales para
  // no romper las partidas guardadas antes de existir.
  armadura_equipada?: number | null;
  escudo_equipado?: number | null;
  atributos: {
    cuerpo: number;
    agilidad: number;
    mente: number;
    rangoCritico: number;
    habilidadesExtra: number;
    limiteHabilidad: number;
    acciones: number;
    reacciones: number;
    hp: number;
    poderio: number;
    movimiento: number;
    resistencia: number;
    regeneracion: number;
    evasion: number;
    iniciativa: number;
    punteria: number;
    puntosHabilidad: number;
  };
  // Datos de combate/partida
  vidaActual: number;
  vidaTemporal: number;
  posicion: { x: number; y: number; z: number };
  armaEquipada: number | null; // ID del arma actualmente en mano (null = sin arma)
  // Estados alterados activos sobre esta instancia (ver EstadosAlterados.ts).
  // Se persisten dentro del JSON de la partida. Opcional para no romper las
  // partidas ya guardadas en localStorage antes de existir este campo.
  estados?: EstadoAplicado[];
}

export interface Equipo {
  id: string;
  nombre: string;
  personajes: PersonajeInstancia[];
}

/**
 * Entrada del Diario de la partida (estilo Roll20): una referencia a un
 * personaje o criatura ya creado que se ha añadido a esta partida. Guarda el
 * id de origen para poder recuperar la ficha completa, más el nombre para
 * mostrarlo sin tener que leer el original.
 */
export interface EntradaDiario {
  /** id único de la entrada dentro del diario. */
  id: string;
  /** id del personaje/criatura de origen (clave en localStorage). */
  refId: string;
  tipo: "personaje" | "criatura";
  nombre: string;
}

/**
 * Token colocado en el mapa: una instancia visible de una entrada del diario,
 * con su posición en la cuadrícula hexagonal (col,row,nivel). Se puede tener
 * más de un token de la misma entrada (p. ej. varias criaturas iguales).
 */
export interface TokenPartida {
  id: string;
  /** id del personaje/criatura de origen. */
  refId: string;
  /** id de la entrada del diario que originó este token: solo puede haber un
   * token en el mapa por cada entrada del diario. */
  diarioId?: string;
  tipo: "personaje" | "criatura";
  nombre: string;
  pos: { col: number; row: number; nivel: number };
  /** Vida actual/máxima del token (para la barra sobre el personaje). */
  vida?: { actual: number; max: number };
  /** Esencia actual/máxima del token (solo personajes Pugilista). */
  esencia?: { actual: number; max: number };
  /** Estados alterados aplicados sobre este token (iconos sobre el personaje). */
  estados?: EstadoAplicado[];
  /** Niveles de prisma que el token flota por encima de su casilla (solo
   * criaturas Voladoras; 0/ausente = posado en el suelo). La posición lógica
   * sigue siendo la casilla (col,row,nivel); esto es solo la altura de vuelo. */
  alturaVuelo?: number;
}

/**
 * Marca pintada sobre una casilla del mapa (trampa, objeto, punto de interés…).
 * Es puramente visual/informativa: no afecta a movimiento ni combate.
 */
export interface MarcaPartida {
  id: string;
  forma: FormaMarca;
  pos: { col: number; row: number; nivel: number };
}

/**
 * Mensaje del chat de la partida. Puede ser texto plano o el desglose de una
 * tirada (2d12 + mod) y/o una acción/reacción. Se guarda DENTRO de la partida
 * para que se comparta (tiempo real) y persista como el resto del estado.
 */
export interface MensajeChat {
  id: number;
  hora: string;
  autor: string;
  clase: "texto" | "tirada";
  texto: string;
  tirada?: DesgloseTirada;
  dano?: string; // daño plano de un ataque (p. ej. "8 lacerante")
  danoColor?: string; // color del daño
  // Ataque dirigido a una entidad del escenario: etiqueta del objetivo
  // (nombre · Esquiva) y si la tirada la alcanza (empate impacta).
  objetivo?: string;
  impacto?: boolean;
  descripcion?: string; // descripción de la acción/reacción
  tipoEjecucion?: string; // "accion" | "reaccion" | …
  color?: string; // color de acento del mensaje
}

export interface PartidaData {
  id: string;
  nombre: string;
  equipos: Equipo[];
  fechaCreacion: string;
  // Mapa de prismas hexagonales exportado por el Editor de Hexágonos.
  // Opcional: sin él, la partida usa la cuadrícula plana por defecto.
  mapa?: MapaHex;
  // Diario de la partida: personajes y criaturas añadidos desde la escena.
  // Opcional para no romper las partidas guardadas antes de que existiera.
  diario?: EntradaDiario[];
  // id del mapa activo dentro del catálogo global de mapas (mapasRepo). El
  // mapa en sí se copia también a `mapa` para conservar compatibilidad con los
  // consumidores que lo leen inline (jugarPartida). Opcional.
  mapaActivoId?: string;
  // Tokens colocados sobre el mapa. Opcional (partidas antiguas no lo tienen).
  tokens?: TokenPartida[];
  // Marcas pintadas sobre casillas (trampas, objetos…). Opcional (partidas
  // antiguas no lo tienen).
  marcas?: MarcaPartida[];
  // Chat de la partida (texto y tiradas). Se comparte y persiste como el resto
  // del estado. Opcional (partidas antiguas no lo tienen).
  mensajesChat?: MensajeChat[];
  // Ajustes hechos desde las fichas flotantes durante la partida (bonos de
  // atributos/armadura/movimiento… por ficha), indexados por la clave de la
  // ficha (diarioId, instanciaId o id del personaje). Se persisten para que
  // sobrevivan a salir y volver a entrar en la partida. Opcional.
  bonosFichas?: Record<string, Record<string, number>>;
  // Arma seleccionada en cada ficha flotante, misma clave que bonosFichas.
  armasSeleccionadas?: Record<string, number | null>;
  // Campos heredados del antiguo sistema de combate.
  // Se mantienen para no romper las partidas ya guardadas en localStorage.
  combateActivo: boolean;
  rondaActual: number;
  ordenIniciativa: OrdenIniciativa[];
  turnoActualIndex: number;
  logs: LogEvento[];
}

// Interfaz para el orden de iniciativa (formato heredado en localStorage)
export interface OrdenIniciativa {
  instanciaId: string;
  personajeNombre: string;
  iniciativa: number;
  dado1: number;
  dado2: number;
  accionesRestantes: number;
  accionesMaximas: number;
}

// Interfaz para los logs de eventos (formato heredado en localStorage)
export interface LogEvento {
  id: string;
  timestamp: string;
  tipo: "iniciativa" | "turno" | "ataque" | "movimiento" | "ronda" | "sistema";
  mensaje: string;
}

// Clase original de Partida (para uso en memoria)
export class Partida {
  characters = new Map<string, Character>();
  addCharacter(c: Character) {
    this.characters.set(c.id, c);
  }
  getCharacter(id: string) {
    return this.characters.get(id);
  }

  getCharactersList() {
    return Array.from(this.characters.values());
  }
}
