// src/domain/useCharacterCreation.ts
import { ref, watch, computed } from "vue";
import { usePartida } from "./usePartida";
import { useArbolAttributes, type ArbolNode } from "./useArbolAttributes";
import trasfondosData from "../assets/trasfondos/trasfondos.json";

const CURRENT_CHARACTER_ID = "character-in-creation";

export function useCharacterCreation() {
  const { addCharacter, getCharacter } = usePartida();

  // Estado reactivo para los datos del personaje
  const characterData = ref({
    nombre: "",
    nivel: 1,
    oficio: "",
    oficio_habilidades: [] as string[],
    oficio_dotes: [] as number[],
    estilo_marcial: "",
    estilo_marcial_dotes: [] as string[],
    trasfondo: "",
    trasfondo_habilidades: [] as string[],
    raza: "",
    arbol: "",
    habilidades: "", // JSON string de habilidades con rangos asignados
    armas: [] as number[], // IDs de las armas seleccionadas
    armaduras: [] as number[], // IDs de las armaduras seleccionadas
    // Atributos del árbol
    atributos: {
      cuerpo: 0,
      agilidad: 0,
      mente: 0,
      rangoCritico: 0,
      habilidadesExtra: 0,
      limiteHabilidad: 0,
      acciones: 0,
      reacciones: 0,
      poderio: 0,
      movimiento: 3,
      resistencia: 0,
      regeneracion: 2,
      evasion: 12,
      iniciativa: 0,
      punteria: 0,
      puntosHabilidad: 10,
      hp: 10,
    },
  });

  // Función para obtener o crear el personaje en creación
  function getCurrentCharacter() {
    let character = getCharacter(CURRENT_CHARACTER_ID);
    if (!character) {
      addCharacter(CURRENT_CHARACTER_ID, "");
      character = getCharacter(CURRENT_CHARACTER_ID);
    }
    return character;
  }

  // Función para cargar datos del personaje al estado local
  function loadCharacterData() {
    const character = getCurrentCharacter();
    if (character) {
      characterData.value.nombre = character.name || "";
      characterData.value.nivel = character.nivel || 1;
      characterData.value.oficio = character.oficio || "";
      characterData.value.oficio_habilidades =
        character.oficio_habilidades || [];
      characterData.value.oficio_dotes = character.oficio_dotes || [];
      characterData.value.estilo_marcial = character.estilo_marcial || "";
      characterData.value.estilo_marcial_dotes =
        character.estilo_marcial_dotes || [];
      characterData.value.trasfondo = character.trasfondo || "";
      characterData.value.trasfondo_habilidades =
        character.trasfondo_habilidades || [];
      characterData.value.raza = character.raza || "";
      characterData.value.arbol = character.arbol || "";
      characterData.value.habilidades = character.habilidades || "";
      characterData.value.armas = character.armas || [];
      characterData.value.armaduras = character.armaduras || [];
      characterData.value.atributos = character.atributos || {
        cuerpo: 0,
        agilidad: 0,
        mente: 0,
        rangoCritico: 24,
        habilidadesExtra: 0,
        limiteHabilidad: 5,
        acciones: 0,
        reacciones: 0,
        poderio: 0,
        movimiento: 3,
        resistencia: 0,
        regeneracion: 2,
        evasion: 12,
        iniciativa: 0,
        punteria: 0,
        puntosHabilidad: 10,
        hp: 10,
      };
    }
    // Calcular atributos después de cargar
    recalcularAtributos();
  }

  // Función para guardar datos del estado local al personaje
  function saveCharacterData() {
    const character = getCurrentCharacter();
    if (character) {
      character.name = characterData.value.nombre;
      character.nivel = characterData.value.nivel;
      character.oficio = characterData.value.oficio;
      character.oficio_habilidades = characterData.value.oficio_habilidades;
      character.oficio_dotes = characterData.value.oficio_dotes;
      character.estilo_marcial = characterData.value.estilo_marcial;
      character.estilo_marcial_dotes = characterData.value.estilo_marcial_dotes;
      character.trasfondo = characterData.value.trasfondo;
      character.trasfondo_habilidades =
        characterData.value.trasfondo_habilidades;
      character.raza = characterData.value.raza;
      character.arbol = characterData.value.arbol;
      character.habilidades = characterData.value.habilidades;
      character.armas = characterData.value.armas;
      character.armaduras = characterData.value.armaduras;
      character.atributos = characterData.value.atributos;
    }
  }

  // Función para recalcular los atributos basándose en los nodos del árbol
  function recalcularAtributos() {
    try {
      // Parsear los nodos del árbol
      let selectedNodes: ArbolNode[] = characterData.value.arbol
        ? JSON.parse(characterData.value.arbol)
        : [];

      // Agregar nodos del trasfondo si existen
      if (characterData.value.trasfondo) {
        const trasfondo = trasfondosData.trasfondos.find(
          (t) => t.nombre === characterData.value.trasfondo,
        );

        if (trasfondo && trasfondo.atributos) {
          // Agregar cada nodo del trasfondo si no está ya en selectedNodes
          trasfondo.atributos.forEach((nodeId: number) => {
            if (!selectedNodes.find((n) => n.nodeId === nodeId)) {
              selectedNodes.push({
                nodeId: nodeId,
                skillName: "",
                type: "circle",
                layer: 0,
                index: 0,
                description: "",
                isTrasfondo: true,
              });
            }
          });
        }
      }

      // Crear computed ref para los nodos
      const nodosComputed = computed(() => selectedNodes);
      const nivelComputed = computed(() => characterData.value.nivel);

      // Calcular atributos usando useArbolAttributes
      const { attributes } = useArbolAttributes(nodosComputed, nivelComputed);

      // Actualizar los atributos en characterData
      characterData.value.atributos = { ...attributes.value };
    } catch (error) {
      console.error("Error recalculando atributos:", error);
    }
  }

  // Watchers para sincronización automática
  watch(
    () => characterData.value.nombre,
    () => saveCharacterData(),
  );
  watch(
    () => characterData.value.nivel,
    () => {
      recalcularAtributos();
      saveCharacterData();
    },
  );
  watch(
    () => characterData.value.oficio,
    () => saveCharacterData(),
  );
  watch(
    () => characterData.value.oficio_habilidades,
    () => saveCharacterData(),
    { deep: true },
  );
  watch(
    () => characterData.value.oficio_dotes,
    () => saveCharacterData(),
    { deep: true },
  );
  watch(
    () => characterData.value.estilo_marcial,
    () => saveCharacterData(),
  );
  watch(
    () => characterData.value.estilo_marcial_dotes,
    () => saveCharacterData(),
    { deep: true },
  );
  watch(
    () => characterData.value.trasfondo,
    () => {
      recalcularAtributos();
      saveCharacterData();
    },
  );
  watch(
    () => characterData.value.trasfondo_habilidades,
    () => saveCharacterData(),
    { deep: true },
  );
  watch(
    () => characterData.value.raza,
    () => saveCharacterData(),
  );
  watch(
    () => characterData.value.arbol,
    () => {
      recalcularAtributos();
      saveCharacterData();
    },
  );
  watch(
    () => characterData.value.armas,
    () => saveCharacterData(),
    { deep: true },
  );
  watch(
    () => characterData.value.armaduras,
    () => saveCharacterData(),
    { deep: true },
  );
  watch(
    () => characterData.value.atributos,
    () => saveCharacterData(),
    { deep: true },
  );

  // Función para resetear todos los datos del personaje
  function resetCharacterData() {
    characterData.value = {
      nombre: "",
      nivel: 1,
      oficio: "",
      oficio_habilidades: [],
      oficio_dotes: [],
      estilo_marcial: "",
      estilo_marcial_dotes: [],
      trasfondo: "",
      trasfondo_habilidades: [],
      raza: "",
      arbol: "",
      habilidades: "",
      armas: [],
      armaduras: [],
      atributos: {
        cuerpo: 0,
        agilidad: 0,
        mente: 0,
        rangoCritico: 0,
        habilidadesExtra: 0,
        limiteHabilidad: 0,
        acciones: 0,
        reacciones: 0,
        poderio: 0,
        movimiento: 3,
        resistencia: 0,
        regeneracion: 2,
        evasion: 12,
        iniciativa: 0,
        punteria: 0,
        puntosHabilidad: 10,
        hp: 10,
      },
    };

    // También resetear el personaje en la partida
    const character = getCurrentCharacter();
    if (character) {
      character.name = "";
      character.nivel = 1;
      character.oficio = "";
      character.oficio_habilidades = [];
      character.oficio_dotes = [];
      character.estilo_marcial = "";
      character.estilo_marcial_dotes = [];
      character.trasfondo = "";
      character.trasfondo_habilidades = [];
      character.raza = "";
      character.arbol = "";
      character.habilidades = "";
      character.armas = [];
      character.armaduras = [];
      character.atributos = {
        cuerpo: 0,
        agilidad: 0,
        mente: 0,
        rangoCritico: 0,
        habilidadesExtra: 0,
        limiteHabilidad: 0,
        acciones: 0,
        reacciones: 0,
        poderio: 0,
        movimiento: 3,
        resistencia: 0,
        regeneracion: 2,
        evasion: 12,
        iniciativa: 0,
        punteria: 0,
        puntosHabilidad: 10,
        hp: 10,
      };
    }
  }

  return {
    characterData,
    getCurrentCharacter,
    loadCharacterData,
    saveCharacterData,
    recalcularAtributos,
    resetCharacterData,
  };
}
