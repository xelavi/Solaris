// src/domain/usePartidaHex.ts
// Estado y reglas de una partida sobre cuadrícula hexagonal, agnósticos del
// motor 3D. La escena (jugarPartida.vue) solo renderiza y traduce eventos de
// entrada a llamadas de este composable; toda la verdad del juego vive aquí.
import { ref, computed } from "vue";
import type { PartidaData, PersonajeInstancia } from "./Partida";
import {
  validarMapaHex,
  calcularCasillas,
  claveCelda,
  type MapaHex,
  type CasillaMapa,
} from "./mapaHex";
import {
  obtenerEstado,
  nombreEstadoAplicado,
  type EstadoAplicado,
} from "./EstadosAlterados";
import { guardarJSON } from "./storage/almacen";
import { obtenerPartida } from "./storage/partidasRepo";

// Cuadrícula plana por defecto (partidas sin mapa exportado del editor).
export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 20;
export const HEX_SIZE = 2;

// Posición lógica de una entidad sobre una casilla del mapa.
export interface PosicionHex {
  col: number;
  row: number;
  nivel: number;
}

export interface LogPartida {
  timestamp: Date;
  tipo: "sistema" | "movimiento";
  mensaje: string;
}

export interface ResultadoMovimiento {
  ok: boolean;
  motivo?: string;
}

export interface ResultadoEstado {
  ok: boolean;
  motivo?: string;
}

export function usePartidaHex() {
  const partida = ref<PartidaData | null>(null);
  // Geometría del mapa (para que la escena dibuje el terreno). Null = plano.
  const mapa = ref<MapaHex | null>(null);
  // Casillas donde puede posarse una entidad (cara superior con hueco libre).
  const casillas = ref<CasillaMapa[]>([]);
  // instanciaId -> posición sobre el mapa.
  const posiciones = ref<Map<string, PosicionHex>>(new Map());
  // claveCelda -> instanciaId que la ocupa.
  const ocupacion = ref<Map<string, string>>(new Map());
  const seleccionado = ref<string | null>(null);
  const logs = ref<LogPartida[]>([]);

  const clavesValidas = computed(
    () => new Set(casillas.value.map((c) => claveCelda(c.col, c.row, c.y))),
  );

  function agregarLog(tipo: LogPartida["tipo"], mensaje: string) {
    logs.value.push({ timestamp: new Date(), tipo, mensaje });
  }

  function personajes(): PersonajeInstancia[] {
    if (!partida.value) return [];
    return partida.value.equipos.flatMap((e) => e.personajes);
  }

  function personajePorId(id: string): PersonajeInstancia | undefined {
    return personajes().find((p) => p.instanciaId === id);
  }

  const seleccionadoPersonaje = computed<PersonajeInstancia | null>(() =>
    seleccionado.value ? personajePorId(seleccionado.value) ?? null : null,
  );

  // Casillas de la cuadrícula plana (todas al nivel 0).
  function casillasFlat(): CasillaMapa[] {
    const lista: CasillaMapa[] = [];
    for (let row = 0; row < GRID_HEIGHT; row++) {
      for (let col = 0; col < GRID_WIDTH; col++) {
        lista.push({ col, row, y: 0 });
      }
    }
    return lista;
  }

  async function cargar(partidaId: string): Promise<boolean> {
    try {
      const cargada = await obtenerPartida(partidaId);
      if (!cargada) {
        console.error("❌ No se encontró la partida");
        agregarLog("sistema", "❌ Error: No se encontró la partida");
        return false;
      }

      partida.value = cargada;
      mapa.value = partida.value.mapa
        ? validarMapaHex(partida.value.mapa)
        : null;
      casillas.value = mapa.value ? calcularCasillas(mapa.value) : casillasFlat();

      posiciones.value = new Map();
      ocupacion.value = new Map();
      seleccionado.value = null;

      agregarLog("sistema", `✅ Partida "${partida.value.nombre}" cargada`);
      if (mapa.value) {
        agregarLog(
          "sistema",
          `🗺️ Mapa cargado: ${mapa.value.cells.length} prismas, ${casillas.value.length} casillas disponibles`,
        );
      }
      return true;
    } catch (error) {
      console.error("❌ Error al cargar la partida:", error);
      agregarLog("sistema", "❌ Error al cargar la partida");
      return false;
    }
  }

  function casillaLibre(c: PosicionHex): boolean {
    const clave = claveCelda(c.col, c.row, c.nivel);
    return clavesValidas.value.has(clave) && !ocupacion.value.has(clave);
  }

  function casillaAleatoriaLibre(): CasillaMapa | null {
    const libres = casillas.value.filter(
      (c) => !ocupacion.value.has(claveCelda(c.col, c.row, c.y)),
    );
    if (libres.length === 0) return null;
    return libres[Math.floor(Math.random() * libres.length)]!;
  }

  // Coloca cada personaje de la partida en una casilla libre al azar.
  function colocarInicial(): void {
    for (const p of personajes()) {
      const casilla = casillaAleatoriaLibre();
      if (!casilla) {
        agregarLog(
          "sistema",
          "❌ No hay casillas libres para colocar personajes",
        );
        break;
      }
      const pos: PosicionHex = {
        col: casilla.col,
        row: casilla.row,
        nivel: casilla.y,
      };
      posiciones.value.set(p.instanciaId, pos);
      ocupacion.value.set(
        claveCelda(pos.col, pos.row, pos.nivel),
        p.instanciaId,
      );
    }
    agregarLog("sistema", `👥 ${posiciones.value.size} personajes en el mapa`);
  }

  function seleccionar(id: string | null): void {
    seleccionado.value = id;
    if (id) {
      const p = personajePorId(id);
      if (p) agregarLog("sistema", `👤 ${p.nombre} seleccionado`);
    }
  }

  // Mueve un personaje a una casilla destino, validando que exista y esté libre.
  function mover(id: string, destino: PosicionHex): ResultadoMovimiento {
    const p = personajePorId(id);
    if (!p) return { ok: false, motivo: "Personaje inexistente" };

    const claveDestino = claveCelda(destino.col, destino.row, destino.nivel);
    if (!clavesValidas.value.has(claveDestino)) {
      return { ok: false, motivo: "Casilla no válida" };
    }
    const ocupante = ocupacion.value.get(claveDestino);
    if (ocupante && ocupante !== id) {
      agregarLog("sistema", "⚠️ Esa casilla está ocupada");
      return { ok: false, motivo: "Casilla ocupada" };
    }

    const origen = posiciones.value.get(id);
    if (origen) {
      ocupacion.value.delete(
        claveCelda(origen.col, origen.row, origen.nivel),
      );
    }
    ocupacion.value.set(claveDestino, id);
    posiciones.value.set(id, { ...destino });

    agregarLog(
      "movimiento",
      origen
        ? `🏃 ${p.nombre} se movió de (${origen.col}, ${origen.row}) a (${destino.col}, ${destino.row})`
        : `🏃 ${p.nombre} se movió a (${destino.col}, ${destino.row})`,
    );
    return { ok: true };
  }

  // Persiste la partida actual en el backend (bajo su propia clave = id). Es
  // "fire-and-forget": los llamantes (aplicarEstado/quitarEstado) no esperan;
  // los errores se registran aquí para no dejar promesas rechazadas sin capturar.
  async function guardarPartida(): Promise<void> {
    if (!partida.value) return;
    try {
      await guardarJSON(partida.value.id, partida.value);
    } catch (error) {
      console.error("❌ Error al guardar la partida:", error);
    }
  }

  // --- Estados alterados (ver EstadosAlterados.ts) ---

  function estadosDe(instanciaId: string): EstadoAplicado[] {
    return personajePorId(instanciaId)?.estados ?? [];
  }

  /**
   * Aplica un estado a una instancia. En los estados acumulables (Sangrado,
   * Inhibido, Ímpetu) suma el valor al contador existente; en el resto marca
   * el estado una sola vez. Persiste la partida y devuelve el resultado.
   */
  function aplicarEstado(
    instanciaId: string,
    estadoId: number,
    valor?: number,
  ): ResultadoEstado {
    const p = personajePorId(instanciaId);
    if (!p) return { ok: false, motivo: "Personaje inexistente" };

    const estado = obtenerEstado(estadoId);
    if (!estado) return { ok: false, motivo: "Estado desconocido" };

    if (!p.estados) p.estados = [];
    const existente = p.estados.find((e) => e.estadoId === estadoId);

    if (estado.acumulable) {
      const suma = valor ?? 1;
      if (existente) existente.valor = (existente.valor ?? 0) + suma;
      else p.estados.push({ estadoId, valor: suma });
    } else {
      if (existente) return { ok: false, motivo: "El estado ya está activo" };
      p.estados.push({ estadoId });
    }

    const aplicado = p.estados.find((e) => e.estadoId === estadoId)!;
    guardarPartida();
    agregarLog("sistema", `🩸 ${p.nombre}: ${nombreEstadoAplicado(aplicado)}`);
    return { ok: true };
  }

  /**
   * Quita un estado de una instancia. En los acumulables, si se pasa `valor`
   * resta esa cantidad al contador (eliminándolo si llega a 0); sin `valor`,
   * elimina el estado por completo.
   */
  function quitarEstado(
    instanciaId: string,
    estadoId: number,
    valor?: number,
  ): ResultadoEstado {
    const p = personajePorId(instanciaId);
    if (!p?.estados) return { ok: false, motivo: "Personaje sin estados" };

    const existente = p.estados.find((e) => e.estadoId === estadoId);
    if (!existente) return { ok: false, motivo: "El estado no está activo" };

    const estado = obtenerEstado(estadoId);
    if (estado?.acumulable && valor != null) {
      existente.valor = (existente.valor ?? 0) - valor;
      if (existente.valor > 0) {
        guardarPartida();
        agregarLog(
          "sistema",
          `🩹 ${p.nombre}: ${nombreEstadoAplicado(existente)}`,
        );
        return { ok: true };
      }
    }

    p.estados = p.estados.filter((e) => e.estadoId !== estadoId);
    guardarPartida();
    agregarLog("sistema", `🩹 ${p.nombre} pierde ${estado?.nombre ?? "estado"}`);
    return { ok: true };
  }

  function tieneEstado(instanciaId: string, estadoId: number): boolean {
    return estadosDe(instanciaId).some((e) => e.estadoId === estadoId);
  }

  return {
    // Estado
    partida,
    mapa,
    casillas,
    posiciones,
    ocupacion,
    seleccionado,
    seleccionadoPersonaje,
    logs,
    // Acciones
    agregarLog,
    cargar,
    personajes,
    personajePorId,
    casillaLibre,
    casillaAleatoriaLibre,
    colocarInicial,
    seleccionar,
    mover,
    guardarPartida,
    // Estados alterados
    estadosDe,
    aplicarEstado,
    quitarEstado,
    tieneEstado,
  };
}
