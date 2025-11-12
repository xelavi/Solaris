// src/domain/Activas.ts
import type { PersonajeInstancia } from './Partida'

/**
 * Interfaz para el resultado de una activa
 */
export interface ResultadoActiva {
  exito: boolean
  mensaje: string
  nuevaPosicion?: { x: number; y: number }
  objetivoId?: string
}

/**
 * Carga: El personaje se mueve hacia un objetivo y realiza un ataque
 * Se coloca en la posición más cercana al objetivo en la dirección de donde venía
 * 
 * @param atacante - El personaje que realiza la carga
 * @param objetivo - El personaje objetivo de la carga
 * @param posicionAtacante - Posición actual del atacante {col, row}
 * @param posicionObjetivo - Posición del objetivo {col, row}
 * @param hexagonosDisponibles - Array de coordenadas {x, y} de hexágonos disponibles para moverse
 * @returns ResultadoActiva con la información del movimiento
 */
export function realizarCarga(
  atacante: PersonajeInstancia,
  objetivo: PersonajeInstancia,
  posicionAtacante: { col: number; row: number },
  posicionObjetivo: { col: number; row: number },
  hexagonosDisponibles: Array<{ x: number; y: number }>
): ResultadoActiva {
  // Calcular la dirección del movimiento
  const direccionX = posicionObjetivo.col - posicionAtacante.col
  const direccionY = posicionObjetivo.row - posicionAtacante.row
  
  // Normalizar la dirección
  const distancia = Math.sqrt(direccionX * direccionX + direccionY * direccionY)
  
  if (distancia === 0) {
    return {
      exito: false,
      mensaje: '⚠️ Ya estás en la posición del objetivo'
    }
  }
  
  // Buscar la posición más cercana al objetivo desde los hexágonos disponibles
  let mejorPosicion: { x: number; y: number } | null = null
  let menorDistancia = Infinity
  
  hexagonosDisponibles.forEach(hex => {
    // Calcular distancia desde este hexágono al objetivo
    const dx = posicionObjetivo.col - hex.x
    const dy = posicionObjetivo.row - hex.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    // Verificar que esté en la dirección correcta (hacia el objetivo)
    const dirHaciaObjetivoX = hex.x - posicionAtacante.col
    const dirHaciaObjetivoY = hex.y - posicionAtacante.row
    
    // Producto escalar para verificar que vamos en la dirección correcta
    const productoEscalar = (dirHaciaObjetivoX * direccionX) + (dirHaciaObjetivoY * direccionY)
    
    if (dist < menorDistancia && productoEscalar > 0) {
      menorDistancia = dist
      mejorPosicion = hex
    }
  })
  
  if (!mejorPosicion) {
    return {
      exito: false,
      mensaje: '⚠️ No hay posiciones disponibles hacia el objetivo'
    }
  }
  
  return {
    exito: true,
    mensaje: `🏃‍♂️ ${atacante.nombre} carga hacia ${objetivo.nombre}!`,
    nuevaPosicion: mejorPosicion,
    objetivoId: objetivo.instanciaId
  }
}

/**
 * Obtener los hexágonos vecinos inmediatos a una posición (rango 1)
 * Útil para encontrar posiciones adyacentes al objetivo
 */
export function obtenerVecinosInmediatos(
  col: number,
  row: number,
  hexagonosOcupados: Set<string>
): Array<{ x: number; y: number }> {
  const vecinos: Array<{ x: number; y: number }> = []
  const isEven = row % 2 === 0
  
  // Offsets para filas pares e impares en grilla hexagonal
  const offsets: [number, number][] = isEven 
    ? [[-1, -1], [0, -1], [1, 0], [0, 1], [-1, 1], [-1, 0]] // Even row offsets
    : [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 0]]  // Odd row offsets
  
  for (const [dx, dy] of offsets) {
    const nextX = col + dx
    const nextY = row + dy
    const key = `${nextX},${nextY}`
    
    // Solo agregar si no está ocupado
    if (!hexagonosOcupados.has(key)) {
      vecinos.push({ x: nextX, y: nextY })
    }
  }
  
  return vecinos
}

/**
 * Interfaz para el resultado de empujar
 */
export interface ResultadoEmpujar {
  exito: boolean
  acerto: boolean
  mensaje: string
  distanciaEmpuje: number
  nuevaPosicionObjetivo?: { x: number; y: number }
  tirada: number
  dado1: number
  dado2: number
}

/**
 * Empujar: Arremete contra un enemigo (o aliado) para desplazarlo
 * Requiere tirada de ataque vs evasión
 * Distancia de empuje = max(0, (Poderío atacante - Poderío defensor) / 3)
 * 
 * @param atacante - El personaje que empuja
 * @param defensor - El personaje que es empujado
 * @param posicionAtacante - Posición actual del atacante {col, row}
 * @param posicionDefensor - Posición actual del defensor {col, row}
 * @param hexagonosDisponibles - Array de coordenadas {x, y} de hexágonos libres en la dirección del empuje
 * @returns ResultadoEmpujar con información del empuje
 */
export function realizarEmpujar(
  atacante: PersonajeInstancia,
  defensor: PersonajeInstancia,
  posicionAtacante: { col: number; row: number },
  posicionDefensor: { col: number; row: number },
  hexagonosDisponibles: Array<{ x: number; y: number }>
): ResultadoEmpujar {
  // Tirar 2d12
  const tirarD12 = () => Math.floor(Math.random() * 12) + 1
  const dado1 = tirarD12()
  const dado2 = tirarD12()
  
  // Verificar fallo automático (cualquier dado es 1)
  if (dado1 === 1 || dado2 === 1) {
    return {
      exito: false,
      acerto: false,
      mensaje: `${atacante.nombre} intenta empujar a ${defensor.nombre}!\n` +
               `🎲 Tirada: ${dado1} + ${dado2}\n` +
               `💀 ¡FALLO CRÍTICO! (sacó un 1)\n` +
               `El empuje falla estrepitosamente.`,
      distanciaEmpuje: 0,
      tirada: 0,
      dado1,
      dado2
    }
  }
  
  const tirada = dado1 + dado2 + atacante.nivel
  const evasionDefensor = defensor.atributos.evasion || 12
  
  // Verificar si el empuje falla por evasión
  if (tirada < evasionDefensor) {
    return {
      exito: false,
      acerto: false,
      mensaje: `${atacante.nombre} intenta empujar a ${defensor.nombre}!\n` +
               `🎲 Tirada: ${dado1} + ${dado2} + ${atacante.nivel} = ${tirada}\n` +
               `🛡️ ¡FALLO! (Evasión: ${evasionDefensor})\n` +
               `${defensor.nombre} evade el empuje.`,
      distanciaEmpuje: 0,
      tirada,
      dado1,
      dado2
    }
  }
  
  // Calcular distancia de empuje
  const poderioAtacante = atacante.atributos.poderio || 0
  const poderioDefensor = defensor.atributos.poderio || 0
  const distanciaEmpuje = Math.max(0, Math.floor((poderioAtacante - poderioDefensor) / 3))
  
  if (distanciaEmpuje === 0) {
    return {
      exito: false,
      acerto: true,
      mensaje: `${atacante.nombre} empuja a ${defensor.nombre}!\n` +
               `🎲 Tirada: ${dado1} + ${dado2} + ${atacante.nivel} = ${tirada} (Evasión: ${evasionDefensor})\n` +
               `💪 ¡ACIERTO! pero ${defensor.nombre} es demasiado fuerte para ser empujado\n` +
               `Poderío ${poderioAtacante} vs ${poderioDefensor} = 0 casillas`,
      distanciaEmpuje: 0,
      tirada,
      dado1,
      dado2
    }
  }
  
  // Calcular dirección del empuje (desde atacante hacia defensor)
  const direccionX = posicionDefensor.col - posicionAtacante.col
  const direccionY = posicionDefensor.row - posicionAtacante.row
  const magnitud = Math.sqrt(direccionX * direccionX + direccionY * direccionY)
  
  // Normalizar dirección
  const dirNormX = direccionX / magnitud
  const dirNormY = direccionY / magnitud
  
  // Buscar hexágonos en la dirección del empuje hasta la distancia calculada
  let mejorHexagono: { x: number; y: number } | null = null
  let distanciaAlcanzada = 0
  
  for (let dist = 1; dist <= distanciaEmpuje; dist++) {
    const targetX = Math.round(posicionDefensor.col + dirNormX * dist)
    const targetY = Math.round(posicionDefensor.row + dirNormY * dist)
    
    // Verificar si este hexágono está disponible
    const hexDisponible = hexagonosDisponibles.find(h => h.x === targetX && h.y === targetY)
    
    if (hexDisponible) {
      mejorHexagono = hexDisponible
      distanciaAlcanzada = dist
    } else {
      // Si encontramos un obstáculo, nos quedamos con la última posición válida
      break
    }
  }
  
  if (!mejorHexagono) {
    return {
      exito: false,
      acerto: true,
      mensaje: `${atacante.nombre} empuja a ${defensor.nombre}!\n` +
               `🎲 Tirada: ${dado1} + ${dado2} + ${atacante.nivel} = ${tirada} (Evasión: ${evasionDefensor})\n` +
               `💪 ¡ACIERTO! pero no hay espacio para empujar (bloqueado)\n` +
               `Distancia teórica: ${distanciaEmpuje} casillas`,
      distanciaEmpuje: 0,
      tirada,
      dado1,
      dado2
    }
  }
  
  return {
    exito: true,
    acerto: true,
    mensaje: `${atacante.nombre} empuja a ${defensor.nombre}!\n` +
             `🎲 Tirada: ${dado1} + ${dado2} + ${atacante.nivel} = ${tirada} (Evasión: ${evasionDefensor})\n` +
             `💪 ¡EMPUJE EXITOSO!\n` +
             `Poderío ${poderioAtacante} vs ${poderioDefensor} = ${distanciaAlcanzada} casillas`,
    distanciaEmpuje: distanciaAlcanzada,
    nuevaPosicionObjetivo: mejorHexagono,
    tirada,
    dado1,
    dado2
  }
}

/**
 * Interfaz para el resultado de una tirada de iniciativa
 */
export interface ResultadoIniciativa {
  personaje: PersonajeInstancia
  tirada: number
  dado1: number
  dado2: number
}

/**
 * Calcula las iniciativas de todos los personajes y devuelve el orden de turnos
 * Iniciativa = 2d12 + nivel del personaje
 * 
 * @param personajes - Array de todos los personajes en combate
 * @returns Array ordenado de mayor a menor iniciativa
 */
export function calcularIniciativas(personajes: PersonajeInstancia[]): ResultadoIniciativa[] {
  const iniciativas: ResultadoIniciativa[] = personajes.map(personaje => {
    // Tirar 2d12
    const dado1 = Math.floor(Math.random() * 12) + 1
    const dado2 = Math.floor(Math.random() * 12) + 1
    const tirada = dado1 + dado2 + personaje.nivel
    
    return {
      personaje,
      tirada,
      dado1,
      dado2
    }
  })
  
  // Ordenar de mayor a menor iniciativa
  // En caso de empate, el orden es aleatorio (ya que vienen en orden aleatorio del map)
  iniciativas.sort((a, b) => b.tirada - a.tirada)
  
  return iniciativas
}

/**
 * Tipos de reacciones disponibles
 */
export const TipoReaccion = {
  PARRY: 'parry',
  CONTRAATAQUE: 'contraataque',
  TENSION: 'tension',
  INTERCEPTAR: 'interceptar',
  ATAQUE_OPORTUNIDAD: 'ataque_oportunidad',
  NINGUNA: 'ninguna'
} as const

export type TipoReaccion = typeof TipoReaccion[keyof typeof TipoReaccion]

/**
 * Interfaz para el resultado de una reacción
 */
export interface ResultadoReaccion {
  tipo: TipoReaccion
  exito: boolean
  mensaje: string
  modificadorEvasion?: number    // Para Parry
  modificadorResistencia?: number // Para Tensión
  nuevoDefensor?: PersonajeInstancia // Para Interceptar
  ataqueContra?: {                // Para Contraataque y Ataque de Oportunidad
    tirada: number
    dado1: number
    dado2: number
    danio: number
  }
}

/**
 * Parry: Aumenta la evasión del defensor por su nivel durante un ataque
 * 
 * @param defensor - El personaje que usa Parry
 * @returns ResultadoReaccion con el modificador de evasión
 */
export function realizarParry(defensor: PersonajeInstancia): ResultadoReaccion {
  const modificador = defensor.nivel
  
  return {
    tipo: TipoReaccion.PARRY,
    exito: true,
    mensaje: `🛡️ ${defensor.nombre} usa Parry!\n` +
             `Evasión aumentada temporalmente en +${modificador}`,
    modificadorEvasion: modificador
  }
}

/**
 * Contraataque: El defensor realiza un ataque al atacante antes de recibir el ataque
 * 
 * @param defensor - El personaje que usa Contraataque (ahora atacante)
 * @param atacanteOriginal - El atacante original (ahora defensor)
 * @param armaDefensor - Arma equipada del defensor
 * @param defensaAtacanteOriginal - Armadura del atacante original
 * @returns ResultadoReaccion con los datos del contraataque
 */
export function realizarContraataque(
  defensor: PersonajeInstancia,
  atacanteOriginal: PersonajeInstancia,
  armaDefensor: any,
  defensaAtacanteOriginal: { penetrante: number; lacerante: number; contundente: number }
): ResultadoReaccion {
  // Tirar ataque del defensor contra el atacante original
  const dado1 = Math.floor(Math.random() * 12) + 1
  const dado2 = Math.floor(Math.random() * 12) + 1
  const tirada = dado1 + dado2 + defensor.nivel
  
  const evasionAtacanteOriginal = atacanteOriginal.atributos.evasion || 0
  
  // Verificar si falla por dados críticos (algún dado = 1)
  if (dado1 === 1 || dado2 === 1) {
    return {
      tipo: TipoReaccion.CONTRAATAQUE,
      exito: false,
      mensaje: `⚔️ ${defensor.nombre} intenta un Contraataque!\n` +
               `🎲 Tirada: ${dado1} + ${dado2} + ${defensor.nivel} = ${tirada}\n` +
               `💥 ¡FALLO CRÍTICO! (dado = 1)\n` +
               `El contraataque falla estrepitosamente.`
    }
  }
  
  // Verificar si falla por evasión
  if (tirada < evasionAtacanteOriginal) {
    return {
      tipo: TipoReaccion.CONTRAATAQUE,
      exito: false,
      mensaje: `⚔️ ${defensor.nombre} intenta un Contraataque!\n` +
               `🎲 Tirada: ${dado1} + ${dado2} + ${defensor.nivel} = ${tirada}\n` +
               `🛡️ ¡FALLO! (Evasión: ${evasionAtacanteOriginal})\n` +
               `${atacanteOriginal.nombre} esquiva el contraataque.`
    }
  }
  
  // Calcular daño
  const poderio = defensor.atributos.poderio || 0
  const punteria = defensor.atributos.punteria || 0
  
  // Verificar crítico
  const rangoCriticoArma = armaDefensor?.rango_critico ? parseInt(armaDefensor.rango_critico) : 999
  const rangoCriticoPersonaje = defensor.atributos.rangoCritico || 24
  const rangoCriticoFinal = Math.min(rangoCriticoArma, rangoCriticoPersonaje)
  const esCritico = tirada >= rangoCriticoFinal
  
  let multiplicadorCritico = 1
  if (esCritico && armaDefensor?.critico) {
    const match = armaDefensor.critico.match(/x(\d+)/)
    if (match && match[1]) {
      multiplicadorCritico = parseInt(match[1])
    }
  }
  
  // Calcular daño base
  let danioPenetrante = (armaDefensor?.penetrante || 0) + poderio
  let danioLacerante = (armaDefensor?.lacerante || 0) + poderio
  let danioContundente = (armaDefensor?.contundente || 0) + poderio
  
  // Aplicar crítico
  if (esCritico) {
    danioPenetrante *= multiplicadorCritico
    danioLacerante *= multiplicadorCritico
    danioContundente *= multiplicadorCritico
  }
  
  // Aplicar puntería
  const defensaPenetrante = Math.max(0, defensaAtacanteOriginal.penetrante - punteria)
  const defensaLacerante = Math.max(0, defensaAtacanteOriginal.lacerante - punteria)
  const defensaContundente = Math.max(0, defensaAtacanteOriginal.contundente - punteria)
  
  // Daño final
  const danioFinalPenetrante = Math.max(0, danioPenetrante - defensaPenetrante)
  const danioFinalLacerante = Math.max(0, danioLacerante - defensaLacerante)
  const danioFinalContundente = Math.max(0, danioContundente - defensaContundente)
  
  const danioTotal = Math.max(danioFinalPenetrante, danioFinalLacerante, danioFinalContundente)
  
  const mensaje = 
    `⚔️ ${defensor.nombre} usa Contraataque!\n` +
    `🎲 Tirada: ${dado1} + ${dado2} + ${defensor.nivel} = ${tirada} (Evasión: ${evasionAtacanteOriginal})\n` +
    (esCritico ? `⭐ ¡CRÍTICO! ${armaDefensor?.critico || 'x2'} (Rango: ${rangoCriticoFinal})\n` : '') +
    `🎯 Puntería: ${punteria}\n` +
    `💥 Daño: P:${danioFinalPenetrante} L:${danioFinalLacerante} C:${danioFinalContundente} = ${danioTotal} total`
  
  return {
    tipo: TipoReaccion.CONTRAATAQUE,
    exito: true,
    mensaje,
    ataqueContra: {
      tirada,
      dado1,
      dado2,
      danio: danioTotal
    }
  }
}

/**
 * Tensión: Aumenta la resistencia del defensor en +3 durante un ataque
 * Esto añade +3 a la armadura P/L/C efectiva
 * 
 * @param defensor - El personaje que usa Tensión
 * @returns ResultadoReaccion con el modificador de resistencia
 */
export function realizarTension(defensor: PersonajeInstancia): ResultadoReaccion {
  const modificador = 3
  
  return {
    tipo: TipoReaccion.TENSION,
    exito: true,
    mensaje: `💪 ${defensor.nombre} usa Tensión!\n` +
             `Resistencia aumentada en +${modificador} para este ataque\n` +
             `(Armadura P/L/C +${modificador})`,
    modificadorResistencia: modificador
  }
}

/**
 * Interceptar: Un aliado adyacente puede recibir el ataque en lugar del defensor original
 * 
 * @param interceptor - El personaje que intercepta el ataque
 * @param defensorOriginal - El defensor original que iba a recibir el ataque
 * @returns ResultadoReaccion indicando el cambio de defensor
 */
export function realizarInterceptar(
  interceptor: PersonajeInstancia,
  defensorOriginal: PersonajeInstancia
): ResultadoReaccion {
  return {
    tipo: TipoReaccion.INTERCEPTAR,
    exito: true,
    mensaje: `🛡️ ${interceptor.nombre} intercepta el ataque!\n` +
             `${interceptor.nombre} se interpone para proteger a ${defensorOriginal.nombre}\n` +
             `El ataque ahora va dirigido a ${interceptor.nombre}`,
    nuevoDefensor: interceptor
  }
}

/**
 * Ataque de Oportunidad: Ataca a un enemigo que entra o sale de tu rango de ataque
 * Este ataque se realiza con las mecánicas normales de combate
 * 
 * @param atacante - El personaje que realiza el ataque de oportunidad
 * @param objetivo - El personaje que se mueve (entra o sale del rango)
 * @param armaAtacante - Arma equipada del atacante
 * @param defensaObjetivo - Armadura del objetivo
 * @returns ResultadoReaccion con los datos del ataque de oportunidad
 */
export function realizarAtaqueOportunidad(
  atacante: PersonajeInstancia,
  objetivo: PersonajeInstancia,
  armaAtacante: any,
  defensaObjetivo: { penetrante: number; lacerante: number; contundente: number }
): ResultadoReaccion {
  // Tirar ataque
  const dado1 = Math.floor(Math.random() * 12) + 1
  const dado2 = Math.floor(Math.random() * 12) + 1
  const tirada = dado1 + dado2 + atacante.nivel
  
  const evasionObjetivo = objetivo.atributos.evasion || 0
  
  // Verificar si falla por dados críticos (algún dado = 1)
  if (dado1 === 1 || dado2 === 1) {
    return {
      tipo: TipoReaccion.ATAQUE_OPORTUNIDAD,
      exito: false,
      mensaje: `⚡ ${atacante.nombre} intenta un Ataque de Oportunidad!\n` +
               `🎲 Tirada: ${dado1} + ${dado2} + ${atacante.nivel} = ${tirada}\n` +
               `💥 ¡FALLO CRÍTICO! (dado = 1)\n` +
               `El ataque de oportunidad falla estrepitosamente.`
    }
  }
  
  // Verificar si falla por evasión
  if (tirada < evasionObjetivo) {
    return {
      tipo: TipoReaccion.ATAQUE_OPORTUNIDAD,
      exito: false,
      mensaje: `⚡ ${atacante.nombre} intenta un Ataque de Oportunidad!\n` +
               `🎲 Tirada: ${dado1} + ${dado2} + ${atacante.nivel} = ${tirada}\n` +
               `🛡️ ¡FALLO! (Evasión: ${evasionObjetivo})\n` +
               `${objetivo.nombre} esquiva el ataque de oportunidad.`
    }
  }
  
  // Calcular daño
  const poderio = atacante.atributos.poderio || 0
  const punteria = atacante.atributos.punteria || 0
  
  // Verificar crítico
  const rangoCriticoArma = armaAtacante?.rango_critico ? parseInt(armaAtacante.rango_critico) : 999
  const rangoCriticoPersonaje = atacante.atributos.rangoCritico || 24
  const rangoCriticoFinal = Math.min(rangoCriticoArma, rangoCriticoPersonaje)
  const esCritico = tirada >= rangoCriticoFinal
  
  let multiplicadorCritico = 1
  if (esCritico && armaAtacante?.critico) {
    const match = armaAtacante.critico.match(/x(\d+)/)
    if (match && match[1]) {
      multiplicadorCritico = parseInt(match[1])
    }
  }
  
  // Calcular daño base
  let danioPenetrante = (armaAtacante?.penetrante || 0) + poderio
  let danioLacerante = (armaAtacante?.lacerante || 0) + poderio
  let danioContundente = (armaAtacante?.contundente || 0) + poderio
  
  // Aplicar crítico
  if (esCritico) {
    danioPenetrante *= multiplicadorCritico
    danioLacerante *= multiplicadorCritico
    danioContundente *= multiplicadorCritico
  }
  
  // Aplicar puntería
  const defensaPenetrante = Math.max(0, defensaObjetivo.penetrante - punteria)
  const defensaLacerante = Math.max(0, defensaObjetivo.lacerante - punteria)
  const defensaContundente = Math.max(0, defensaObjetivo.contundente - punteria)
  
  // Daño final
  const danioFinalPenetrante = Math.max(0, danioPenetrante - defensaPenetrante)
  const danioFinalLacerante = Math.max(0, danioLacerante - defensaLacerante)
  const danioFinalContundente = Math.max(0, danioContundente - defensaContundente)
  
  const danioTotal = Math.max(danioFinalPenetrante, danioFinalLacerante, danioFinalContundente)
  
  const mensaje = 
    `⚡ ${atacante.nombre} realiza un Ataque de Oportunidad contra ${objetivo.nombre}!\n` +
    `🎲 Tirada: ${dado1} + ${dado2} + ${atacante.nivel} = ${tirada} (Evasión: ${evasionObjetivo})\n` +
    (esCritico ? `⭐ ¡CRÍTICO! ${armaAtacante?.critico || 'x2'} (Rango: ${rangoCriticoFinal})\n` : '') +
    `🎯 Puntería: ${punteria}\n` +
    `💥 Daño: P:${danioFinalPenetrante} L:${danioFinalLacerante} C:${danioFinalContundente} = ${danioTotal} total`
  
  return {
    tipo: TipoReaccion.ATAQUE_OPORTUNIDAD,
    exito: true,
    mensaje,
    ataqueContra: {
      tirada,
      dado1,
      dado2,
      danio: danioTotal
    }
  }
}
