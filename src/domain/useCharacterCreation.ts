// src/domain/useCharacterCreation.ts
// Estado del asistente de creación de personaje. Es un singleton de módulo:
// todos los pasos del asistente (general, trasfondo, especialidad, árbol...) editan
// el mismo objeto reactivo, y un único watcher lo persiste en el repositorio
// con debounce en cuanto el personaje tiene nombre.

import { ref, watch, computed } from "vue";
import { useArbolAttributes, type ArbolNode } from "./useArbolAttributes";
import { crearPersonajeVacio, type PersonajeGuardado } from "./Personaje";
import {
  obtenerPersonaje,
  guardarPersonaje,
  obtenerIdEnCreacion,
  obtenerOCrearIdEnCreacion,
  establecerIdEnCreacion,
} from "./storage/personajesRepo";
import trasfondosData from "../assets/trasfondos/trasfondos.json";

const characterData = ref<PersonajeGuardado>(crearPersonajeVacio());

// Copia del personaje ANTES de subir de nivel. Mientras no sea null estamos en
// modo "subir de nivel": los pasos del asistente (dotes, árbol, habilidades)
// bloquean quitar lo ya asignado y solo dejan añadir sobre esta base.
const subidaNivelBase = ref<PersonajeGuardado | null>(null);
const enSubidaNivel = computed(() => subidaNivelBase.value !== null);

// ID de creación con el que está sincronizado el estado en memoria.
// `undefined` = aún no se ha cargado nada en esta sesión.
let idCargado: string | null | undefined = undefined;
let saveTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Carga el personaje en creación desde el repositorio. Es seguro llamarla
 * al montar cada paso del asistente: solo recarga cuando cambia el ID en
 * creación (personaje nuevo o reanudado), nunca pisa ediciones en curso.
 */
async function loadCharacterData() {
  const id = obtenerIdEnCreacion();
  if (idCargado !== undefined && id === idCargado) return;

  characterData.value =
    (id ? await obtenerPersonaje(id) : null) ?? crearPersonajeVacio(id ?? "");
  idCargado = id;
  recalcularAtributos();
}

/** Persiste el estado actual inmediatamente (si ya tiene nombre). */
async function saveCharacterData() {
  if (!characterData.value.nombre) return;
  const id = obtenerOCrearIdEnCreacion();
  if (characterData.value.id !== id) characterData.value.id = id;
  idCargado = id;
  try {
    await guardarPersonaje(characterData.value);
  } catch (error) {
    console.error("Error al guardar el personaje:", error);
  }
}

/** Vacía el estado en memoria (p. ej. tras descartar un personaje). */
function resetCharacterData() {
  characterData.value = crearPersonajeVacio();
  idCargado = undefined;
}

/**
 * Adopta un personaje ya guardado para editarlo con este mismo estado (y con
 * los pasos del asistente, que leen de aquí). Apunta el puntero "en creación"
 * al id indicado y fuerza la recarga en memoria, ignorando el caché de idCargado.
 */
async function editarPersonajeExistente(id: string) {
  establecerIdEnCreacion(id);
  characterData.value = (await obtenerPersonaje(id)) ?? crearPersonajeVacio(id);
  idCargado = id;
  recalcularAtributos();
}

/**
 * Entra en modo "subir de nivel": adopta el personaje guardado, guarda una
 * copia de su estado actual como base bloqueada y sube su nivel en 1 (lo que
 * amplía automáticamente los topes de dotes, nodos del árbol y puntos de
 * habilidad). Los pasos del asistente comparan contra `subidaNivelBase` para
 * impedir quitar lo que ya estaba asignado.
 */
async function iniciarSubidaNivel(id: string) {
  establecerIdEnCreacion(id);
  const original = (await obtenerPersonaje(id)) ?? crearPersonajeVacio(id);
  characterData.value = original;
  idCargado = id;
  subidaNivelBase.value = JSON.parse(JSON.stringify(original));
  characterData.value.nivel = (characterData.value.nivel || 1) + 1;
  recalcularAtributos();
}

/** Confirma la subida de nivel: persiste los cambios y sale del modo. */
async function finalizarSubidaNivel() {
  await saveCharacterData();
  subidaNivelBase.value = null;
}

/** Cancela la subida de nivel: restaura el estado previo y lo persiste. */
async function cancelarSubidaNivel() {
  if (subidaNivelBase.value) {
    characterData.value = JSON.parse(JSON.stringify(subidaNivelBase.value));
    try {
      await guardarPersonaje(characterData.value);
    } catch (error) {
      console.error("Error al guardar el personaje:", error);
    }
  }
  subidaNivelBase.value = null;
}

/** Recalcula los atributos a partir del árbol, el trasfondo y el nivel. */
function recalcularAtributos() {
  try {
    const selectedNodes: ArbolNode[] = characterData.value.arbol
      ? JSON.parse(characterData.value.arbol)
      : [];

    // Los trasfondos aportan nodos de árbol propios.
    if (characterData.value.trasfondo) {
      const trasfondo = trasfondosData.trasfondos.find(
        (t) => t.nombre === characterData.value.trasfondo,
      );
      trasfondo?.atributos?.forEach((nodeId: number) => {
        if (!selectedNodes.find((n) => n.nodeId === nodeId)) {
          selectedNodes.push({
            nodeId,
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

    const { attributes } = useArbolAttributes(
      computed(() => selectedNodes),
      computed(() => characterData.value.nivel),
    );
    characterData.value.atributos = { ...attributes.value };
  } catch (error) {
    console.error("Error recalculando atributos:", error);
  }
}

// Los atributos dependen de nivel, trasfondo y árbol.
watch(
  () => [
    characterData.value.nivel,
    characterData.value.trasfondo,
    characterData.value.arbol,
  ],
  () => recalcularAtributos(),
);

// Guardado automático: cualquier cambio persiste a los 500 ms.
watch(
  characterData,
  () => {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      void saveCharacterData();
    }, 500);
  },
  { deep: true },
);

export function useCharacterCreation() {
  return {
    characterData,
    loadCharacterData,
    saveCharacterData,
    resetCharacterData,
    recalcularAtributos,
    editarPersonajeExistente,
    subidaNivelBase,
    enSubidaNivel,
    iniciarSubidaNivel,
    finalizarSubidaNivel,
    cancelarSubidaNivel,
  };
}
