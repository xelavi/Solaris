// src/domain/useArbolAttributes.ts
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import arbolData from '../assets/arbol.json'

export interface ArbolNode {
  nodeId: number
  skillName: string
  type: string
  layer: number
  index: number
  description: string
  isTrasfondo?: boolean
}

export interface ArbolAttributes {
  // Atributos principales (cuentan nodos)
  cuerpo: number
  agilidad: number
  mente: number
  
  // Atributos que suman 1 por nodo
  rangoCritico: number
  habilidadesExtra: number
  limiteHabilidad: number
  acciones: number
  reacciones: number
  
  // Atributos que suman 3 por nodo + 3 por cada nodo principal
  poderio: number
  movimiento: number
  resistencia: number
  regeneracion: number
  evasion: number
  iniciativa: number
  punteria: number
  puntosHabilidad: number
}

export function useArbolAttributes(selectedNodes: ComputedRef<ArbolNode[]>) {
  
  // Función para obtener el atributo ID de un nodo
  function getNodeAttributeId(nodeId: number): number | null {
    const nodo = arbolData.arbol.nodos.find(n => n.id === nodeId)
    if (!nodo) return null
    return typeof nodo.atributo === 'string' ? parseInt(nodo.atributo) : nodo.atributo
  }
  
  // Función para contar nodos por atributo ID
  function countNodesByAttributeId(attributeId: number): number {
    return selectedNodes.value.filter(node => {
      const nodeAttrId = getNodeAttributeId(node.nodeId)
      return nodeAttrId === attributeId
    }).length
  }
  
  // Atributos principales
  const cuerpo = computed(() => countNodesByAttributeId(1)) // ID 1 = Cuerpo
  const agilidad = computed(() => countNodesByAttributeId(2)) // ID 2 = Agilidad
  const mente = computed(() => countNodesByAttributeId(3)) // ID 3 = Mente
  
  // Total de nodos principales para bonificación
  const totalNodosPrincipales = computed(() => 
    cuerpo.value + agilidad.value + mente.value
  )
  
  // Atributos que suman 1 por nodo
  const rangoCritico = computed(() => countNodesByAttributeId(18)) // ID 18 = Rango de Critico
  const habilidadesExtra = computed(() => countNodesByAttributeId(17)) // ID 17 = Habilidades extras
  const limiteHabilidad = computed(() => countNodesByAttributeId(16)) // ID 16 = Limite de Habilidad
  const acciones = computed(() => countNodesByAttributeId(12)) // ID 12 = Acciones
  const reacciones = computed(() => countNodesByAttributeId(13)) // ID 13 = Reacciones
  
  // Atributos que suman 3 por nodo + 3 por cada nodo principal
  const poderio = computed(() => {
    const nodosDirectos = countNodesByAttributeId(4) // ID 4 = Poderío
    return (nodosDirectos * 3) + (totalNodosPrincipales.value * 3)
  })
  
  const movimiento = computed(() => {
    const nodosDirectos = countNodesByAttributeId(5) // ID 5 = Movimiento
    return (nodosDirectos * 3) + (totalNodosPrincipales.value * 3)
  })
  
  const resistencia = computed(() => {
    const nodosDirectos = countNodesByAttributeId(6) // ID 6 = Resistencia
    return (nodosDirectos * 3) + (totalNodosPrincipales.value * 3)
  })
  
  const regeneracion = computed(() => {
    const nodosDirectos = countNodesByAttributeId(8) // ID 8 = Regeneración
    return (nodosDirectos * 3) + (totalNodosPrincipales.value * 3)
  })
  
  const evasion = computed(() => {
    const nodosDirectos = countNodesByAttributeId(9) // ID 9 = Evasión
    return (nodosDirectos * 3) + (totalNodosPrincipales.value * 3)
  })
  
  const iniciativa = computed(() => {
    const nodosDirectos = countNodesByAttributeId(10) // ID 10 = Iniciativa
    return (nodosDirectos * 3) + (totalNodosPrincipales.value * 3)
  })
  
  const punteria = computed(() => {
    const nodosDirectos = countNodesByAttributeId(11) // ID 11 = Puntería
    return (nodosDirectos * 3) + (totalNodosPrincipales.value * 3)
  })
  
  const puntosHabilidad = computed(() => {
    const nodosDirectos = countNodesByAttributeId(14) // ID 14 = Puntos de Habilidad
    return (nodosDirectos * 3) + (totalNodosPrincipales.value * 3)
  })
  
  // Objeto con todos los atributos calculados
  const attributes = computed<ArbolAttributes>(() => ({
    cuerpo: cuerpo.value,
    agilidad: agilidad.value,
    mente: mente.value,
    rangoCritico: rangoCritico.value,
    habilidadesExtra: habilidadesExtra.value,
    limiteHabilidad: limiteHabilidad.value,
    acciones: acciones.value,
    reacciones: reacciones.value,
    poderio: poderio.value,
    movimiento: movimiento.value,
    resistencia: resistencia.value,
    regeneracion: regeneracion.value,
    evasion: evasion.value,
    iniciativa: iniciativa.value,
    punteria: punteria.value,
    puntosHabilidad: puntosHabilidad.value
  }))
  
  return {
    // Atributos individuales
    cuerpo,
    agilidad,
    mente,
    rangoCritico,
    habilidadesExtra,
    limiteHabilidad,
    acciones,
    reacciones,
    poderio,
    movimiento,
    resistencia,
    regeneracion,
    evasion,
    iniciativa,
    punteria,
    puntosHabilidad,
    
    // Objeto completo
    attributes
  }
}
