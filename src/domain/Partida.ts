// src/domain/Partida.ts
import { Character } from './Character'

// Tipos para el sistema de gestión de partidas
export interface PersonajeInstancia {
  instanciaId: string;
  personajeId: string;
  // Datos básicos
  nombre: string;
  nivel: number;
  oficio: string;
  estilo_marcial: string;
  trasfondo: string;
  raza: string;
  // Datos completos del personaje
  oficio_habilidades: string[];
  oficio_dotes: number[];
  estilo_marcial_dotes: string[];
  trasfondo_habilidades: string[];
  arbol: string;
  habilidades: string;
  armas: number[];
  armaduras: number[];
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
}

export interface Equipo {
  id: string;
  nombre: string;
  personajes: PersonajeInstancia[];
}

export interface PartidaData {
  id: string;
  nombre: string;
  equipos: Equipo[];
  fechaCreacion: string;
  // Sistema de combate
  combateActivo: boolean;
  rondaActual: number;
  ordenIniciativa: OrdenIniciativa[];
  turnoActualIndex: number;
  logs: LogEvento[];
}

// Interfaz para el orden de iniciativa
export interface OrdenIniciativa {
  instanciaId: string;
  personajeNombre: string;
  iniciativa: number;
  dado1: number;
  dado2: number;
  accionesRestantes: number;
  accionesMaximas: number;
}

// Interfaz para los logs de eventos
export interface LogEvento {
  id: string;
  timestamp: string;
  tipo: 'iniciativa' | 'turno' | 'ataque' | 'movimiento' | 'ronda' | 'sistema';
  mensaje: string;
}

// Clase original de Partida (para uso en memoria)
export class Partida {
  characters = new Map<string, Character>()
  addCharacter(c: Character) { this.characters.set(c.id, c) }
  getCharacter(id: string) { return this.characters.get(id) }

  getCharactersList() {
    return Array.from(this.characters.values())
  }
}

// Interfaz para los datos de un arma
export interface ArmaData {
  id: number;
  nombre: string;
  penetrante: number;
  lacerante: number;
  contundente: number;
  critico: string;
  rango_critico: number | null;
}

// Interfaz para la defensa del defensor
export interface DefensaData {
  lacerante: number;
  penetrante: number;
  contundente: number;
}

// Interfaz para el resultado del ataque
export interface ResultadoAtaque {
  exito: boolean;
  esCritico: boolean;
  tirada: number;
  dado1: number;
  dado2: number;
  danioBase: {
    penetrante: number;
    lacerante: number;
    contundente: number;
  };
  danioFinal: {
    penetrante: number;
    lacerante: number;
    contundente: number;
  };
  danioTotalFinal: number;
  vidaRestante: number;
  mensaje: string;
}

// Función auxiliar para tirar un d12
function tirarD12(): number {
  return Math.floor(Math.random() * 12) + 1
}

// Función para calcular el ataque
export function realizarAtaque(
  atacante: PersonajeInstancia,
  defensor: PersonajeInstancia,
  arma: ArmaData | null,
  defensaDefensor: DefensaData
): ResultadoAtaque {
  // Tirar 2d12
  const dado1 = tirarD12()
  const dado2 = tirarD12()
  
  // Verificar fallo automático (cualquier dado es 1)
  if (dado1 === 1 || dado2 === 1) {
    return {
      exito: false,
      esCritico: false,
      tirada: 0,
      dado1,
      dado2,
      danioBase: {
        penetrante: 0,
        lacerante: 0,
        contundente: 0
      },
      danioFinal: {
        penetrante: 0,
        lacerante: 0,
        contundente: 0
      },
      danioTotalFinal: 0,
      vidaRestante: defensor.vidaActual,
      mensaje: `${atacante.nombre} ataca a ${defensor.nombre}!\n` +
               `🎲 Tirada: ${dado1} + ${dado2}\n` +
               `💀 ¡FALLO CRÍTICO! (sacó un 1)\n` +
               `El ataque falla estrepitosamente.`
    }
  }
  
  const tirada = dado1 + dado2 + atacante.nivel
  const evasionDefensor = defensor.atributos.evasion || 12
  
  // Verificar si el ataque falla por evasión
  if (tirada < evasionDefensor) {
    return {
      exito: false,
      esCritico: false,
      tirada,
      dado1,
      dado2,
      danioBase: {
        penetrante: 0,
        lacerante: 0,
        contundente: 0
      },
      danioFinal: {
        penetrante: 0,
        lacerante: 0,
        contundente: 0
      },
      danioTotalFinal: 0,
      vidaRestante: defensor.vidaActual,
      mensaje: `${atacante.nombre} ataca a ${defensor.nombre}!\n` +
               `🎲 Tirada: ${dado1} + ${dado2} + ${atacante.nivel} = ${tirada}\n` +
               `🛡️ ¡FALLO! (Evasión: ${evasionDefensor})\n` +
               `El ataque no logra conectar.`
    }
  }
  
  const poderio = atacante.atributos.poderio || 0
  const punteria = atacante.atributos.punteria || 0
  
  // Verificar crítico
  const rangoCriticoArma = arma?.rango_critico || 999 // Si no tiene, imposible de alcanzar
  const rangoCriticoPersonaje = atacante.atributos.rangoCritico || 24
  const rangoCriticoFinal = Math.min(rangoCriticoArma, rangoCriticoPersonaje)
  const esCritico = tirada >= rangoCriticoFinal
  
  // Parsear el multiplicador de crítico (ej: "x2" -> 2, "x3" -> 3)
  let multiplicadorCritico = 1
  if (esCritico && arma?.critico) {
    const match = arma.critico.match(/x(\d+)/)
    if (match && match[1]) {
      multiplicadorCritico = parseInt(match[1])
    }
  }
  
  // Calcular daño base del arma + poderío
  let danioPenetrante = (arma?.penetrante || 0) + poderio
  let danioLacerante = (arma?.lacerante || 0) + poderio
  let danioContundente = (arma?.contundente || 0) + poderio
  
  // Aplicar multiplicador de crítico
  if (esCritico) {
    danioPenetrante *= multiplicadorCritico
    danioLacerante *= multiplicadorCritico
    danioContundente *= multiplicadorCritico
  }
  
  // Aplicar puntería: reduce la armadura del defensor (mínimo 0)
  const defensaPenetrante = Math.max(0, defensaDefensor.penetrante - punteria)
  const defensaLacerante = Math.max(0, defensaDefensor.lacerante - punteria)
  const defensaContundente = Math.max(0, defensaDefensor.contundente - punteria)
  
  // Restar la defensa correspondiente a cada tipo de daño
  const danioFinalPenetrante = Math.max(0, danioPenetrante - defensaPenetrante)
  const danioFinalLacerante = Math.max(0, danioLacerante - defensaLacerante)
  const danioFinalContundente = Math.max(0, danioContundente - defensaContundente)
  
  // Sumar todos los tipos de daño final
  const danioTotalFinal = Math.max(danioFinalPenetrante, danioFinalLacerante, danioFinalContundente)
  
  // Restar vida al defensor
  let vidaRestante = defensor.vidaActual - danioTotalFinal
  if (vidaRestante < 0) vidaRestante = 0
  
  const resultado: ResultadoAtaque = {
    exito: true,
    esCritico,
    tirada,
    dado1,
    dado2,
    danioBase: {
      penetrante: danioPenetrante,
      lacerante: danioLacerante,
      contundente: danioContundente
    },
    danioFinal: {
      penetrante: danioFinalPenetrante,
      lacerante: danioFinalLacerante,
      contundente: danioFinalContundente
    },
    danioTotalFinal,
    vidaRestante,
    mensaje: `${atacante.nombre} ataca a ${defensor.nombre}!\n` +
             `🎲 Tirada: ${dado1} + ${dado2} + ${atacante.nivel} = ${tirada} (Evasión: ${evasionDefensor})\n` +
             (esCritico ? `⭐ ¡CRÍTICO! ${arma?.critico || 'x2'} (Rango: ${rangoCriticoFinal})\n` : '') +
             `🎯 Puntería: ${punteria} (reduce armadura)\n` +
             `💥 Daño: P:${danioFinalPenetrante} L:${danioFinalLacerante} C:${danioFinalContundente} = ${danioTotalFinal} total`
  }
  
  return resultado
}

// Función para tirar iniciativa
export function tirarIniciativa(personaje: PersonajeInstancia): OrdenIniciativa {
  const dado1 = tirarD12()
  const dado2 = tirarD12()
  const iniciativaPersonaje = personaje.atributos.iniciativa || 0
  const accionesMaximas = personaje.atributos.acciones || 1
  
  return {
    instanciaId: personaje.instanciaId,
    personajeNombre: personaje.nombre,
    iniciativa: dado1 + dado2 + iniciativaPersonaje,
    dado1,
    dado2,
    accionesRestantes: accionesMaximas,
    accionesMaximas
  }
}

// Función para iniciar combate con todos los personajes
export function iniciarCombate(partida: PartidaData): PartidaData {
  const todosPersonajes: PersonajeInstancia[] = []
  partida.equipos.forEach(equipo => {
    todosPersonajes.push(...equipo.personajes)
  })
  
  // Tirar iniciativa para cada personaje
  const ordenIniciativa = todosPersonajes.map(p => tirarIniciativa(p))
  
  // Ordenar de mayor a menor
  ordenIniciativa.sort((a, b) => b.iniciativa - a.iniciativa)
  
  const logs: LogEvento[] = [{
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    tipo: 'sistema',
    mensaje: '⚔️ ¡COMBATE INICIADO!'
  }]
  
  // Agregar logs de iniciativa
  ordenIniciativa.forEach((orden, index) => {
    logs.push({
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      tipo: 'iniciativa',
      mensaje: `${index + 1}. ${orden.personajeNombre}: ${orden.dado1} + ${orden.dado2} + ${orden.iniciativa - orden.dado1 - orden.dado2} = ${orden.iniciativa}`
    })
  })
  
  logs.push({
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    tipo: 'ronda',
    mensaje: '🔄 === RONDA 1 ==='
  })
  
  if (ordenIniciativa.length > 0 && ordenIniciativa[0]) {
    logs.push({
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      tipo: 'turno',
      mensaje: `▶️ Turno de ${ordenIniciativa[0].personajeNombre} (${ordenIniciativa[0].accionesRestantes} acciones)`
    })
  }
  
  return {
    ...partida,
    combateActivo: true,
    rondaActual: 1,
    ordenIniciativa,
    turnoActualIndex: 0,
    logs
  }
}

// Función para pasar al siguiente turno
export function siguienteTurno(partida: PartidaData): PartidaData {
  if (!partida.combateActivo) return partida
  
  const logs = [...partida.logs]
  let turnoActualIndex = partida.turnoActualIndex + 1
  let rondaActual = partida.rondaActual
  
  // Si llegamos al final de la ronda, iniciar nueva ronda
  if (turnoActualIndex >= partida.ordenIniciativa.length) {
    turnoActualIndex = 0
    rondaActual += 1
    
    // Restaurar acciones de todos los personajes
    partida.ordenIniciativa.forEach(orden => {
      orden.accionesRestantes = orden.accionesMaximas
    })
    
    logs.push({
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      tipo: 'ronda',
      mensaje: `🔄 === RONDA ${rondaActual} ===`
    })
  }
  
  const turnoActual = partida.ordenIniciativa[turnoActualIndex]
  if (turnoActual) {
    logs.push({
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      tipo: 'turno',
      mensaje: `▶️ Turno de ${turnoActual.personajeNombre} (${turnoActual.accionesRestantes} acciones)`
    })
  }
  
  return {
    ...partida,
    rondaActual,
    turnoActualIndex,
    logs
  }
}

// Función para gastar una acción
export function gastarAccion(partida: PartidaData, instanciaId: string): PartidaData {
  const orden = partida.ordenIniciativa.find(o => o.instanciaId === instanciaId)
  if (!orden || orden.accionesRestantes <= 0) return partida
  
  orden.accionesRestantes -= 1
  
  return {
    ...partida,
    ordenIniciativa: [...partida.ordenIniciativa]
  }
}

// Función para agregar log
export function agregarLog(partida: PartidaData, tipo: LogEvento['tipo'], mensaje: string): PartidaData {
  const nuevoLog: LogEvento = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    tipo,
    mensaje
  }
  
  return {
    ...partida,
    logs: [...partida.logs, nuevoLog]
  }
}