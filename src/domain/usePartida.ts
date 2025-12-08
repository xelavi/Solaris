import { ref, computed } from "vue";
import type { PartidaData, PersonajeInstancia } from "./Partida";
import { Character } from "./Character";
import { calcularIniciativas, type ResultadoIniciativa } from "./Activas";
import { useMapa } from "./useMapa";
import { realizarAtaque } from "./Partida";

// Estado global de la partida (Singleton pattern para este composable)
const partidaActual = ref<PartidaData | null>(null);
const personajesCreados = ref<Map<string, Character>>(new Map());
const ordenTurnos = ref<ResultadoIniciativa[]>([]);
const turnoActual = ref(0);
const accionesRestantes = ref(3); // 3 acciones por turno según reglas
const logs = ref<string[]>([]);
const accionPreparada = ref<any | null>(null);

export function usePartida() {
  const { generarMapa, obtenerCamino, esCaminable } = useMapa();

  const personajeActivo = computed(() => {
    if (ordenTurnos.value.length === 0) return null;
    return ordenTurnos.value[turnoActual.value].personaje;
  });

  function agregarLog(mensaje: string) {
    logs.value.push(`[${new Date().toLocaleTimeString()}] ${mensaje}`);
  }

  function iniciarPartida(partidaId: string) {
    try {
      const partidaString = localStorage.getItem(partidaId);
      if (!partidaString) {
        console.error("❌ No se encontró la partida");
        return;
      }

      partidaActual.value = JSON.parse(partidaString);

      // Generar mapa lógico
      generarMapa();

      // Calcular iniciativas
      if (partidaActual.value) {
        const todosPersonajes: PersonajeInstancia[] = [];
        partidaActual.value.equipos.forEach((equipo) => {
          todosPersonajes.push(...equipo.personajes);
        });
        ordenTurnos.value = calcularIniciativas(todosPersonajes);
        turnoActual.value = 0;
        accionesRestantes.value = 3;

        agregarLog("Partida iniciada. Iniciativas calculadas.");
      }
    } catch (error) {
      console.error("❌ Error al cargar la partida:", error);
    }
  }

  function pasarTurno() {
    if (ordenTurnos.value.length === 0) return;

    turnoActual.value = (turnoActual.value + 1) % ordenTurnos.value.length;
    accionesRestantes.value = 3;
    agregarLog(`Turno de ${personajeActivo.value?.nombre}`);
  }

  async function moverPersonajeActivo(destino: { x: number; z: number }) {
    const personaje = personajeActivo.value;
    if (!personaje) return { exito: false, mensaje: "No hay personaje activo" };

    if (accionesRestantes.value <= 0) {
      return { exito: false, mensaje: "No quedan acciones" };
    }

    // Since we are using NavMesh on frontend, we assume the path is valid if frontend sends it.
    // However, we should do basic distance validation.
    const currentPos = { x: personaje.posicion.x, z: personaje.posicion.z };
    const dx = destino.x - currentPos.x;
    const dz = destino.z - currentPos.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    const movimientoMax = personaje.atributos.movimiento;

    // Allow some margin for pathfinding deviations
    if (distance > movimientoMax * 1.5) {
      return {
        exito: false,
        mensaje: `Fuera de rango (Max: ${movimientoMax}, Necesario: ${distance.toFixed(1)})`,
      };
    }

    // Ejecutar movimiento (actualizar estado)
    personaje.posicion.x = destino.x;
    personaje.posicion.z = destino.z;

    // Consumir acción
    accionesRestantes.value--;
    agregarLog(
      `${personaje.nombre} se movió a (${destino.x.toFixed(1)}, ${destino.z.toFixed(1)}). Acciones restantes: ${accionesRestantes.value}`,
    );

    return { exito: true, camino: [destino] };
  }

  function addCharacter(id: string, name: string) {
    const newChar = new Character(id, name);
    personajesCreados.value.set(id, newChar);
  }

  function getCharacter(id: string) {
    return personajesCreados.value.get(id);
  }

  function setAccionPreparada(accion: any | null) {
    accionPreparada.value = accion;
  }

  function usarActiva(instanciaId: string, nombreActiva: string) {
    const personaje = personajeActivo.value;
    if (!personaje || personaje.instanciaId !== instanciaId) {
      return { exito: false, mensaje: "No es tu turno" };
    }

    if (accionesRestantes.value <= 0) {
      return { exito: false, mensaje: "No quedan acciones" };
    }

    accionesRestantes.value--;
    agregarLog(`${personaje.nombre} usa ${nombreActiva}.`);
    return { exito: true };
  }

  function ejecutarAtaque(atacanteId: string, defensorId: string) {
    const personaje = personajeActivo.value;
    if (!personaje || personaje.instanciaId !== atacanteId) {
      return { exito: false, mensaje: "No es tu turno" };
    }

    if (accionesRestantes.value <= 0) {
      return { exito: false, mensaje: "No quedan acciones" };
    }

    // Buscar defensor en partidaActual
    if (!partidaActual.value) return { exito: false, mensaje: "No hay partida" };
    let defensor: PersonajeInstancia | undefined;

    // We assume atacanteId and defensorId are names or instanceIds.
    // In escena.vue we passed the whole object but simpler to pass ID if we can search.
    // Given the current setup, let's search by name (as ID) since that is what we used before.
    // Or simpler, search in all teams.

    for(const equipo of partidaActual.value.equipos) {
        const found = equipo.personajes.find(p => p.nombre === defensorId || p.instanciaId === defensorId);
        if (found) {
            defensor = found;
            break;
        }
    }

    if (!defensor) return { exito: false, mensaje: "Defensor no encontrado" };

    // Realizar ataque (Pure logic)
    // Need dummy weapon/defense for now or real ones if available
    const arma = null; // Should fetch from personaje.armaEquipada
    const defensa = { lacerante: 0, penetrante: 0, contundente: 0 }; // Should fetch from defensor.armaduras

    const resultado = realizarAtaque(personaje, defensor, arma, defensa);

    // Apply results (Mutate state)
    defensor.vidaActual = resultado.vidaRestante;

    accionesRestantes.value--;

    // Log detailed result
    agregarLog(resultado.mensaje);

    return { exito: true, resultado };
  }

  return {
    partidaActual,
    ordenTurnos,
    turnoActual,
    accionesRestantes,
    personajeActivo,
    logs,
    accionPreparada,
    setAccionPreparada,
    usarActiva,
    ejecutarAtaque,
    iniciarPartida,
    pasarTurno,
    moverPersonajeActivo,
    addCharacter,
    getCharacter,
  };
}
