import { ref, computed } from "vue";
import type { PartidaData, PersonajeInstancia } from "./Partida";
import { Character } from "./Character";
import { calcularIniciativas, type ResultadoIniciativa } from "./Activas";
import { useMapa } from "./useMapa";

// Estado global de la partida (Singleton pattern para este composable)
const partidaActual = ref<PartidaData | null>(null);
const personajesCreados = ref<Map<string, Character>>(new Map());
const ordenTurnos = ref<ResultadoIniciativa[]>([]);
const turnoActual = ref(0);
const accionesRestantes = ref(3); // 3 acciones por turno según reglas
const logs = ref<string[]>([]);

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

    // Validar que es caminable
    if (!esCaminable(destino.x, destino.z)) {
      return { exito: false, mensaje: "Destino no caminable" };
    }

    // Calcular camino
    const camino = obtenerCamino(
      { x: personaje.posicion.x, z: personaje.posicion.z },
      destino,
    );

    if (!camino) {
      return { exito: false, mensaje: "No hay camino válido" };
    }

    // Validar distancia vs Movimiento
    // El camino incluye el inicio, así que la distancia es length - 1
    const distancia = camino.length - 1;
    const movimientoMax = personaje.atributos.movimiento;

    if (distancia > movimientoMax) {
      return {
        exito: false,
        mensaje: `Fuera de rango (Max: ${movimientoMax}, Necesario: ${distancia})`,
      };
    }

    // Ejecutar movimiento (actualizar estado)
    personaje.posicion.x = destino.x;
    personaje.posicion.z = destino.z;

    // Consumir acción
    accionesRestantes.value--;
    agregarLog(
      `${personaje.nombre} se movió a (${destino.x}, ${destino.z}). Acciones restantes: ${accionesRestantes.value}`,
    );

    return { exito: true, camino }; // Devolvemos el camino para que el frontend pueda animarlo
  }

  function addCharacter(id: string, name: string) {
    const newChar = new Character(id, name);
    personajesCreados.value.set(id, newChar);
  }

  function getCharacter(id: string) {
    return personajesCreados.value.get(id);
  }

  return {
    partidaActual,
    ordenTurnos,
    turnoActual,
    accionesRestantes,
    personajeActivo,
    logs,
    iniciarPartida,
    pasarTurno,
    moverPersonajeActivo,
    addCharacter,
    getCharacter,
  };
}
