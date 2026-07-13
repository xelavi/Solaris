import { ref, computed } from "vue";
import type {
  PartidaData,
  PersonajeInstancia,
  EntradaDiario,
  TokenPartida,
  MensajeChat,
} from "./Partida";
import { Character } from "./Character";
import { useMapa } from "./useMapa";
import { guardarPartida } from "./storage/partidasRepo";
import type { MapaGuardado } from "./storage/mapasRepo";
import { calcularCasillas, claveCelda } from "./mapaHex";
import { obtenerPersonaje } from "./storage/personajesRepo";
import { obtenerPartida } from "./storage/partidasRepo";
import { obtenerCriatura } from "./storage/criaturasRepo";
import { obtenerEstado } from "./EstadosAlterados";
import { obtenerClienteSupabase, TABLA } from "./storage/supabaseBackend";
import type { RealtimeChannel } from "@supabase/supabase-js";

// El chat vive DENTRO de la partida (MensajeChat en Partida.ts) para que se
// comparta en tiempo real y persista como el resto del estado.
export type { MensajeChat };

// Carga útil que emite la ficha al usar algo (sin los campos que fija el chat).
export type PayloadTirada = Omit<MensajeChat, "id" | "hora" | "clase" | "autor">;

// Estado global de la partida (Singleton pattern para este composable)
const partidaActual = ref<PartidaData | null>(null);

// --- Tiempo real (Supabase Realtime) ---
// Suscripción a la fila `kv` de la partida activa: cuando OTRO cliente la
// guarda, recibimos el JSON nuevo y actualizamos `partidaActual` sin recargar.
// En modo localStorage (sin Supabase) no hay suscripción y todo sigue igual.
let canalPartida: RealtimeChannel | null = null;
// Guardados propios "en vuelo": Realtime también nos notifica lo que NOSOTROS
// escribimos, así que contamos cada guardado para ignorar su propio eco.
let guardadosPropiosPendientes = 0;

function suscribirseRealtimePartida(id: string) {
  const sb = obtenerClienteSupabase();
  if (!sb) return; // modo localStorage: sin tiempo real
  detenerRealtimePartida();
  guardadosPropiosPendientes = 0;
  canalPartida = sb
    .channel(`partida:${id}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: TABLA, filter: `key=eq.${id}` },
      (payload) => {
        // Ignora el eco de nuestros propios guardados (last-write-wins).
        if (guardadosPropiosPendientes > 0) {
          guardadosPropiosPendientes--;
          return;
        }
        const nuevo = (payload.new as { value?: PartidaData } | null)?.value;
        if (nuevo) partidaActual.value = nuevo;
      },
    )
    .subscribe();
}

/** Cierra la suscripción en tiempo real (llamar al salir de la partida). */
function detenerRealtimePartida() {
  if (!canalPartida) return;
  obtenerClienteSupabase()?.removeChannel(canalPartida);
  canalPartida = null;
  guardadosPropiosPendientes = 0;
}
const personajesCreados = ref<Map<string, Character>>(new Map());
const personajeActivo = ref<PersonajeInstancia | null>(null);
const logs = ref<string[]>([]);
// El chat es una vista de solo lectura del chat guardado en la partida activa;
// se comparte y persiste con ella (los mensajes se añaden vía enviarMensajeChat/
// enviarTiradaChat, nunca mutando este computed directamente).
const mensajesChat = computed<MensajeChat[]>(
  () => partidaActual.value?.mensajesChat ?? [],
);
let _chatSeq = 0;

// id de mensaje único incluso entre dispositivos: evita colisiones de `:key`
// al mezclarse los chats de varios clientes por el sync en tiempo real.
function nuevoIdMensaje(): number {
  return Date.now() * 1000 + (_chatSeq++ % 1000);
}

// Ficha flotante abierta en la escena de juego. Puede provenir de una instancia
// de la partida (clic en el token 3D) o de un personaje guardado por id (clic en
// el Diario del panel lateral). La escena la renderiza; cualquier componente
// puede abrirla/cerrarla a través de este estado compartido.
// Cada ficha abierta lleva un `uid` (para cerrarla individualmente) y una
// `clave` de identidad (para no abrir dos ventanas del mismo personaje/criatura).
type FichaFlotante =
  | { uid: number; clave: string; tipo: "instancia"; nombre: string; data: PersonajeInstancia }
  | { uid: number; clave: string; tipo: "guardado"; nombre: string; id: string }
  | { uid: number; clave: string; tipo: "criatura"; nombre: string; id: string };
// Varias fichas pueden estar abiertas a la vez sobre la escena de juego.
const fichasFlotantes = ref<FichaFlotante[]>([]);
let _fichaSeq = 0;

// Bonos temporales de combate por ficha (ajustes de atributos/armadura/vida que
// se hacen desde la ficha flotante durante la partida). NO se persisten en
// localStorage: viven mientras dura la sesión de la partida. Se guardan aquí, a
// nivel de módulo, para que sobrevivan al cerrar y reabrir la ficha flotante
// (que destruye el componente). Clave externa = identidad de la ficha
// (instanciaId o characterId); valor = record de bonos por atributo.
const bonosPartida = ref<Record<string, Record<string, number>>>({});

export function usePartida() {
  const { generarMapa } = useMapa();

  function agregarLog(mensaje: string) {
    logs.value.push(`[${new Date().toLocaleTimeString()}] ${mensaje}`);
  }

  async function iniciarPartida(partidaId: string) {
    try {
      const partida = await obtenerPartida(partidaId);
      if (!partida) {
        console.error("❌ No se encontró la partida");
        return;
      }

      if (!partida.diario) partida.diario = [];
      partidaActual.value = partida;

      // Escucha en tiempo real los cambios de esta partida hechos desde otros
      // dispositivos (no hace nada en modo localStorage).
      suscribirseRealtimePartida(partidaId);

      // Los bonos temporales son propios de cada sesión: se descartan al cargar.
      bonosPartida.value = {};

      // Generar mapa lógico
      generarMapa();

      // Seleccionar el primer personaje por defecto
      personajeActivo.value =
        partidaActual.value?.equipos[0]?.personajes[0] ?? null;

      agregarLog("Partida cargada.");
    } catch (error) {
      console.error("❌ Error al cargar la partida:", error);
    }
  }

  function seleccionarPersonaje(personaje: PersonajeInstancia | null) {
    personajeActivo.value = personaje;
  }

  // --- Fichas flotantes ---
  // Abre una ficha nueva. Si ya hay una del mismo personaje/criatura (misma
  // `clave`), la trae al frente en vez de duplicarla.
  function agregarFicha(ficha: FichaFlotante) {
    const i = fichasFlotantes.value.findIndex((f) => f.clave === ficha.clave);
    if (i >= 0) {
      const [ya] = fichasFlotantes.value.splice(i, 1);
      if (ya) fichasFlotantes.value.push(ya);
      return;
    }
    fichasFlotantes.value.push(ficha);
  }

  function abrirFichaInstancia(personaje: PersonajeInstancia) {
    agregarFicha({
      uid: ++_fichaSeq,
      clave: `instancia:${personaje.instanciaId}`,
      tipo: "instancia",
      nombre: personaje.nombre,
      data: personaje,
    });
  }

  function abrirFichaGuardado(id: string, nombre: string) {
    agregarFicha({
      uid: ++_fichaSeq,
      clave: `guardado:${id}`,
      tipo: "guardado",
      nombre,
      id,
    });
  }

  function abrirFichaCriatura(id: string, nombre: string) {
    agregarFicha({
      uid: ++_fichaSeq,
      clave: `criatura:${id}`,
      tipo: "criatura",
      nombre,
      id,
    });
  }

  // Cierra una ficha concreta por su uid.
  function cerrarFicha(uid: number) {
    fichasFlotantes.value = fichasFlotantes.value.filter((f) => f.uid !== uid);
  }

  // Devuelve (creándolo si hace falta) el record reactivo de bonos temporales de
  // una ficha. La ficha flotante muta este mismo objeto, de modo que los ajustes
  // persisten aunque se cierre y se reabra la ventana durante la partida.
  function bonosDeFicha(clave: string): Record<string, number> {
    if (!bonosPartida.value[clave]) bonosPartida.value[clave] = {};
    return bonosPartida.value[clave];
  }

  async function moverPersonajeActivo(destino: { x: number; z: number }) {
    const personaje = personajeActivo.value;
    if (!personaje) return { exito: false, mensaje: "No hay personaje seleccionado" };

    personaje.posicion.x = destino.x;
    personaje.posicion.z = destino.z;

    agregarLog(
      `${personaje.nombre} se movió a (${destino.x.toFixed(1)}, ${destino.z.toFixed(1)}).`,
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

  // Persiste la partida actual en el backend (a través del repositorio). Es
  // "fire-and-forget": los llamantes (mutaciones disparadas por la UI) no
  // necesitan esperar; los errores se registran aquí para no dejar promesas
  // rechazadas sin capturar.
  async function guardarPartidaActual() {
    if (!partidaActual.value) return;
    // Cuenta este guardado ANTES de escribir para poder ignorar su eco de
    // Realtime cuando vuelva (solo si hay suscripción activa).
    if (canalPartida) guardadosPropiosPendientes++;
    try {
      await guardarPartida(partidaActual.value);
    } catch (error) {
      if (canalPartida) guardadosPropiosPendientes--;
      console.error("❌ Error al guardar la partida:", error);
    }
  }

  // --- Chat ---
  // Añade un mensaje al chat de la partida y lo persiste (se comparte en tiempo
  // real como el resto del estado). Sin partida activa no hay chat.
  function agregarMensajeChat(mensaje: MensajeChat) {
    if (!partidaActual.value) return;
    if (!partidaActual.value.mensajesChat) partidaActual.value.mensajesChat = [];
    partidaActual.value.mensajesChat.push(mensaje);
    guardarPartidaActual();
  }

  // Un mensaje escrito a mano por el jugador.
  function enviarMensajeChat(texto: string) {
    const mensaje = texto.trim();
    if (!mensaje) return;
    agregarMensajeChat({
      id: nuevoIdMensaje(),
      hora: new Date().toLocaleTimeString(),
      autor: "",
      clase: "texto",
      texto: mensaje,
    });
  }

  // Vuelca al chat una tirada o el uso de una acción/reacción desde la ficha.
  function enviarTiradaChat(autor: string, payload: PayloadTirada) {
    agregarMensajeChat({
      id: nuevoIdMensaje(),
      hora: new Date().toLocaleTimeString(),
      autor,
      clase: "tirada",
      ...payload,
    });
  }

  // --- Diario ---
  function agregarAlDiario(
    tipo: EntradaDiario["tipo"],
    refId: string,
    nombre: string,
  ) {
    if (!partidaActual.value) return;
    if (!partidaActual.value.diario) partidaActual.value.diario = [];
    // Evita duplicar la misma referencia en el diario.
    if (partidaActual.value.diario.some((e) => e.refId === refId)) return;

    partidaActual.value.diario.push({
      id: `diario_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      refId,
      tipo,
      nombre,
    });
    guardarPartidaActual();
    agregarLog(`📖 ${nombre} añadido al diario.`);
  }

  function quitarDelDiario(entradaId: string) {
    if (!partidaActual.value?.diario) return;
    partidaActual.value.diario = partidaActual.value.diario.filter(
      (e) => e.id !== entradaId,
    );
    guardarPartidaActual();
  }

  // --- Mapa activo ---
  // Marca un mapa del catálogo como activo de esta partida. Copia el MapaHex
  // a `mapa` (inline) para no romper a los consumidores que lo leen así.
  function seleccionarMapa(mapaGuardado: MapaGuardado) {
    if (!partidaActual.value) return;
    partidaActual.value.mapaActivoId = mapaGuardado.id;
    partidaActual.value.mapa = mapaGuardado.mapa;
    // Al poner un mapa nuevo se vacía el tablero: los personajes/criaturas del
    // diario no aparecen hasta colocarlos a mano (evita que queden en casillas
    // del mapa anterior que quizá ya no existen).
    partidaActual.value.tokens = [];
    guardarPartidaActual();
    agregarLog(`🗺️ Mapa activo: ${mapaGuardado.nombre}`);
  }

  function quitarMapaActivo() {
    if (!partidaActual.value) return;
    partidaActual.value.mapaActivoId = undefined;
    partidaActual.value.mapa = undefined;
    guardarPartidaActual();
  }

  // --- Tokens sobre el mapa ---
  // Vida máxima del personaje/criatura de origen de un token.
  async function vidaMaximaDe(
    entrada: Pick<EntradaDiario, "refId" | "tipo">,
  ): Promise<number> {
    const guardado =
      entrada.tipo === "criatura"
        ? await obtenerCriatura(entrada.refId)
        : await obtenerPersonaje(entrada.refId);
    return guardado?.atributos?.hp ?? 10;
  }

  // Coloca un token de una entrada del diario. Si se pasa `posDestino` (p. ej.
  // al arrastrar y soltar sobre un hexágono), se usa esa posición; si no, se
  // busca la primera casilla libre del mapa hexagonal activo.
  async function colocarToken(
    entrada: Pick<EntradaDiario, "refId" | "tipo" | "nombre">,
    posDestino?: { col: number; row: number; nivel: number },
  ) {
    const p = partidaActual.value;
    if (!p) return;
    if (!p.tokens) p.tokens = [];

    let pos = posDestino ?? { col: 0, row: 0, nivel: 0 };
    if (!posDestino && p.mapa) {
      const ocupadas = new Set(
        p.tokens.map((t) => claveCelda(t.pos.col, t.pos.row, t.pos.nivel)),
      );
      const casillas = calcularCasillas(p.mapa);
      const libre =
        casillas.find(
          (c) => !ocupadas.has(claveCelda(c.col, c.row, c.y)),
        ) ?? casillas[0];
      if (libre) pos = { col: libre.col, row: libre.row, nivel: libre.y };
    }

    const max = await vidaMaximaDe(entrada);
    p.tokens.push({
      id: `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      refId: entrada.refId,
      tipo: entrada.tipo,
      nombre: entrada.nombre,
      pos,
      vida: { actual: max, max },
      estados: [],
    });
    guardarPartidaActual();
    agregarLog(`📍 ${entrada.nombre} colocado en el mapa.`);
  }

  // --- Vida de un token ---
  // Asegura que el token tenga el objeto vida inicializado (tokens antiguos no
  // lo tenían) y devuelve su vida máxima.
  async function asegurarVida(
    token: TokenPartida,
  ): Promise<{ actual: number; max: number }> {
    if (!token.vida) {
      const max = await vidaMaximaDe(token);
      token.vida = { actual: max, max };
    }
    return token.vida;
  }

  // Fija la vida actual del token (se limita entre 0 y el máximo).
  async function establecerVidaToken(tokenId: string, actual: number) {
    const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
    if (!token) return;
    const vida = await asegurarVida(token);
    const n = Number.isFinite(actual) ? Math.round(actual) : vida.actual;
    vida.actual = Math.max(0, Math.min(vida.max, n));
    guardarPartidaActual();
  }

  // Suma (o resta) puntos a la vida actual del token.
  async function ajustarVidaToken(tokenId: string, delta: number) {
    const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
    if (!token) return;
    const vida = await asegurarVida(token);
    await establecerVidaToken(tokenId, vida.actual + delta);
  }

  // --- Estados alterados sobre un token ---
  // Aplica un estado al token. Los acumulables (Sangrado, Inhibido, Ímpetu…)
  // suman `valor` sobre el existente; el resto no se duplican.
  function agregarEstadoToken(
    tokenId: string,
    estadoId: number,
    valor?: number,
  ) {
    const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
    if (!token) return;
    if (!token.estados) token.estados = [];
    const def = obtenerEstado(estadoId);
    const existente = token.estados.find((e) => e.estadoId === estadoId);
    if (def?.acumulable) {
      const suma = valor ?? 1;
      if (existente) existente.valor = (existente.valor ?? 0) + suma;
      else token.estados.push({ estadoId, valor: suma });
    } else if (!existente) {
      token.estados.push({ estadoId });
    }
    guardarPartidaActual();
    agregarLog(`✨ ${token.nombre} gana el estado ${def?.nombre ?? estadoId}.`);
  }

  // Fija el valor X de un estado acumulable (Sangrado, Inhibido, Ímpetu…) a
  // `valor` exacto, creándolo si no existe. A diferencia de agregarEstadoToken,
  // no suma sobre el existente: lo reemplaza. Si `valor` <= 0 se retira.
  function establecerValorEstadoToken(
    tokenId: string,
    estadoId: number,
    valor: number,
  ) {
    const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
    if (!token) return;
    if (!token.estados) token.estados = [];
    const def = obtenerEstado(estadoId);
    const nuevo = Math.max(0, Math.floor(valor));
    const existente = token.estados.find((e) => e.estadoId === estadoId);
    if (nuevo <= 0) {
      token.estados = token.estados.filter((e) => e.estadoId !== estadoId);
    } else if (existente) {
      existente.valor = nuevo;
    } else {
      token.estados.push({ estadoId, valor: nuevo });
    }
    guardarPartidaActual();
    agregarLog(
      `✨ ${token.nombre}: ${def?.nombre ?? estadoId} = ${nuevo}.`,
    );
  }

  function quitarEstadoToken(tokenId: string, estadoId: number) {
    const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
    if (!token?.estados) return;
    token.estados = token.estados.filter((e) => e.estadoId !== estadoId);
    guardarPartidaActual();
  }

  function moverToken(
    id: string,
    pos: { col: number; row: number; nivel: number },
  ) {
    const p = partidaActual.value;
    const token = p?.tokens?.find((t) => t.id === id);
    if (!token) return;
    token.pos = pos;
    guardarPartidaActual();
  }

  function quitarToken(id: string) {
    const p = partidaActual.value;
    if (!p?.tokens) return;
    p.tokens = p.tokens.filter((t) => t.id !== id);
    guardarPartidaActual();
  }

  return {
    partidaActual,
    personajeActivo,
    logs,
    mensajesChat,
    fichasFlotantes,
    abrirFichaInstancia,
    abrirFichaGuardado,
    abrirFichaCriatura,
    cerrarFicha,
    bonosDeFicha,
    agregarLog,
    iniciarPartida,
    detenerRealtimePartida,
    seleccionarPersonaje,
    moverPersonajeActivo,
    addCharacter,
    getCharacter,
    guardarPartidaActual,
    enviarMensajeChat,
    enviarTiradaChat,
    agregarAlDiario,
    quitarDelDiario,
    seleccionarMapa,
    quitarMapaActivo,
    colocarToken,
    moverToken,
    quitarToken,
    establecerVidaToken,
    ajustarVidaToken,
    agregarEstadoToken,
    establecerValorEstadoToken,
    quitarEstadoToken,
  };
}
