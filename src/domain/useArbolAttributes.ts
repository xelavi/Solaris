// src/domain/useArbolAttributes.ts
import { computed } from "vue";
import type { ComputedRef } from "vue";
import arbolData from "../assets/arbol.json";
import atributosData from "../assets/atributos.json";

export interface ArbolNode {
  nodeId: number;
  skillName: string;
  type: string;
  layer: number;
  index: number;
  description: string;
  isTrasfondo?: boolean;
}

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
}

export function useArbolAttributes(
  selectedNodes: ComputedRef<ArbolNode[]>,
  nivel: ComputedRef<number> = computed(() => 1),
) {
  // Función para obtener el atributo ID de un nodo
  function getNodeAttributeId(nodeId: number): number | null {
    const nodo = arbolData.arbol.nodos.find((n) => n.id === nodeId);
    if (!nodo) return null;
    return typeof nodo.atributo === "string"
      ? parseInt(nodo.atributo)
      : nodo.atributo;
  }

  // Función para contar nodos por atributo ID
  function countNodesByAttributeId(attributeId: number): number {
    return selectedNodes.value.filter((node) => {
      const nodeAttrId = getNodeAttributeId(node.nodeId);
      return nodeAttrId === attributeId;
    }).length;
  }

  // Función para obtener el tipo de un atributo (indica qué atributo principal lo multiplica)
  function getAttributeType(attributeId: number): number {
    const atributo = atributosData.caracteristicasSecundarias.find(
      (a) => a.id === attributeId,
    );
    return atributo?.tipo ?? 0;
  }

  // Atributos principales
  const cuerpo = computed(() => countNodesByAttributeId(1)); // ID 1 = Cuerpo
  const agilidad = computed(() => countNodesByAttributeId(2)); // ID 2 = Agilidad
  const mente = computed(() => countNodesByAttributeId(3)); // ID 3 = Mente

  // Función auxiliar para calcular atributos con multiplicador
  // tipo 1 = multiplica por Cuerpo, tipo 2 = Agilidad, tipo 3 = Mente
  function calculateAttributeWithMultiplier(
    attributeId: number,
    base: number = 0,
    factor1: number = 3,
    nivel: number = 0,
    factor2: number = factor1,
  ): number {
    const nodosDirectos = countNodesByAttributeId(attributeId);
    const tipo = getAttributeType(attributeId);

    let multiplier = 0;
    // Contar TODOS los nodos que tienen el atributo correspondiente según el tipo
    if (tipo === 1) {
      // Tipo 1 multiplica por todos los nodos de Cuerpo (ID 1)
      multiplier = selectedNodes.value.filter((node) => {
        const nodeAttrId = getNodeAttributeId(node.nodeId);
        return nodeAttrId === 1;
      }).length;
    } else if (tipo === 2) {
      // Tipo 2 multiplica por todos los nodos de Agilidad (ID 2)
      multiplier = selectedNodes.value.filter((node) => {
        const nodeAttrId = getNodeAttributeId(node.nodeId);
        return nodeAttrId === 2;
      }).length;
    } else if (tipo === 3) {
      // Tipo 3 multiplica por todos los nodos de Mente (ID 3)
      multiplier = selectedNodes.value.filter((node) => {
        const nodeAttrId = getNodeAttributeId(node.nodeId);
        return nodeAttrId === 3;
      }).length;
    }

    return base + (nodosDirectos * factor2 + (multiplier + nivel) * factor1);
  }

  // Atributos que suman 1 por nodo
  const rangoCritico = computed(() => 24 - countNodesByAttributeId(18)); // ID 18 = Rango de Critico
  const habilidadesExtra = computed(() => countNodesByAttributeId(17)); // ID 17 = Habilidades extras

  // Límite de habilidad: base según nivel (5 por cada rango de 5 niveles) + nodos directos + mente
  // Nivel 1-5: base 5, Nivel 6-10: base 10, Nivel 11-15: base 15, etc.
  const limiteHabilidad = computed(() => {
    const baseSegunNivel = Math.ceil(nivel.value / 5) * 5;
    const nodosDirectos = countNodesByAttributeId(16); // ID 16 = Limite de Habilidad
    return baseSegunNivel + nodosDirectos + mente.value;
  });

  const acciones = computed(() => 3 + countNodesByAttributeId(12)); // ID 12 = Acciones

  // Atributos que suman 3 por nodo + 3 por atributo principal según su tipo
  const hp = computed(() =>
    calculateAttributeWithMultiplier(7, 10, 2 * nivel.value, 1, 3),
  ); // ID 7 = HP (base = nivel, tipo 1 = Cuerpo)
  const poderio = computed(() => calculateAttributeWithMultiplier(4)); // ID 4 = Poderío (tipo 1 = Cuerpo)
  const movimiento = computed(() => calculateAttributeWithMultiplier(5, 3, 1)); // ID 5 = Movimiento (tipo 1 = Cuerpo)
  const resistencia = computed(() => calculateAttributeWithMultiplier(6)); // ID 6 = Resistencia (tipo 1 = Cuerpo)
  const regeneracion = computed(() =>
    calculateAttributeWithMultiplier(8, 2, 1),
  ); // ID 8 = Regeneración (tipo 1 = Cuerpo)
  const evasion = computed(() => calculateAttributeWithMultiplier(9, 12)); // ID 9 = Evasión (tipo 2 = Agilidad)
  const iniciativa = computed(() => calculateAttributeWithMultiplier(10)); // ID 10 = Iniciativa (tipo 2 = Agilidad)
  const punteria = computed(() => calculateAttributeWithMultiplier(11)); // ID 11 = Puntería (tipo 2 = Agilidad)
  const puntosHabilidad = computed(() =>
    calculateAttributeWithMultiplier(14, 10, 2 * nivel.value, 1, 3),
  ); // ID 14 = Puntos de Habilidad (tipo 3 = Mente)
  const reacciones = computed(() => calculateAttributeWithMultiplier(13, 1, 1)); // ID 13 = Reacciones

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
    puntosHabilidad: puntosHabilidad.value,
    hp: hp.value,
  }));

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
    hp,

    // Objeto completo
    attributes,
  };
}
