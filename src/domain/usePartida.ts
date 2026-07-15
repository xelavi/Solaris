import { ref, computed } from "vue";
import type {
  PartidaData,
  PersonajeInstancia,
  EntradaDiario,
  TokenPartida,
  MensajeChat,
  MarcaPartida,
} from "./Partida";
import type { FormaMarca } from "./MarcasMapa";
import { Character } from "./Character";
import { useMapa } from "./useMapa";
import { useHerramientas } from "./useHerramientas";
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
  | { uid: number; clave: string; tipo: "guardado"; nombre: string; id: string; diarioId?: string }
  | { uid: number; clave: string; tipo: "criatura"; nombre: string; id: string; diarioId?: string };
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

// Arma seleccionada por ficha (para recordarla al cerrar y reabrir la ventana
// flotante durante la sesión). Misma clave e igual de efímera que los bonos.
const armaSeleccionadaPartida = ref<Record<string, number | null>>({});

// --- Orden de iniciativa ---
// Vive a nivel de módulo (como bonosPartida) para sobrevivir a cerrar y
// reabrir el panel de iniciativa (que destruye el componente): sin esto, cada
// apertura del panel volvía a tirar los dados desde cero. No se persiste en
// localStorage: es propio de la sesión, como el resto del estado efímero.
export interface EntradaIniciativa {
  tokenId: string;
  nombre: string;
  tipo: "personaje" | "criatura";
  modificador: number; // atributo de iniciativa
  tirada: number; // total 2d12 + iniciativa
}
const ordenIniciativa = ref<EntradaIniciativa[]>([]);
const turnoIniciativa = ref(0);

// Token que hay que señalar en la escena 3D (centrar cámara + resaltar), p.
// ej. al hacer clic en una entrada del Diario que ya tiene token en el mapa.
// Lleva un `seq` incremental para que dos clics seguidos sobre el mismo token
// disparen el watch en la escena aunque el `tokenId` no cambie.
const tokenSenalado = ref<{ tokenId: string; seq: number } | null>(null);
let _senalSeq = 0;

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
      armaSeleccionadaPartida.value = {};
      ordenIniciativa.value = [];
      turnoIniciativa.value = 0;

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

  // Pide a la escena 3D que centre la cámara sobre un token y lo resalte
  // brevemente (p. ej. al hacer clic en una entrada del Diario).
  function senalarToken(tokenId: string) {
    tokenSenalado.value = { tokenId, seq: ++_senalSeq };
  }

  // --- Fichas flotantes ---
  // Abre una ficha nueva. Si ya hay una del mismo personaje/criatura (misma
  // `clave`), la trae al frente en vez de duplicarla.
  function agregarFicha(ficha: FichaFlotante) {
    useHerramientas().desactivar();
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

  // `diarioId` distingue instancias repetidas del mismo personaje/criatura
  // (p. ej. "Goblin (1)" y "Goblin (2)"): sin él, las dos abrirían la misma
  // ventana flotante al compartir `id` (el personaje/criatura de origen).
  function abrirFichaGuardado(id: string, nombre: string, diarioId?: string) {
    agregarFicha({
      uid: ++_fichaSeq,
      clave: `guardado:${diarioId ?? id}`,
      tipo: "guardado",
      nombre,
      id,
      diarioId,
    });
  }

  function abrirFichaCriatura(id: string, nombre: string, diarioId?: string) {
    agregarFicha({
      uid: ++_fichaSeq,
      clave: `criatura:${diarioId ?? id}`,
      tipo: "criatura",
      nombre,
      id,
      diarioId,
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

  // Arma seleccionada de una ficha: se guarda al cerrarla y se recupera al
  // volver a abrirla (misma sesión de partida).
  function armaSeleccionadaDeFicha(clave: string): number | null {
    return armaSeleccionadaPartida.value[clave] ?? null;
  }

  function guardarArmaSeleccionada(clave: string, armaId: number | null) {
    armaSeleccionadaPartida.value[clave] = armaId;
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

  // Vacía el historial de chat de la partida (acción manual, sin confirmación
  // aquí: la pide la UI antes de llamarla).
  function limpiarChat() {
    if (!partidaActual.value) return;
    partidaActual.value.mensajesChat = [];
    guardarPartidaActual();
  }

  // --- Diario ---
  // Se puede añadir el mismo personaje/criatura varias veces: cada alta es una
  // entrada (y, más adelante, un token) independiente, aunque compartan
  // `refId`. Para distinguirlas se numera el nombre: "Goblin (1)", "Goblin (2)"…
  function agregarAlDiario(
    tipo: EntradaDiario["tipo"],
    refId: string,
    nombre: string,
  ) {
    if (!partidaActual.value) return;
    if (!partidaActual.value.diario) partidaActual.value.diario = [];

    const repeticiones = partidaActual.value.diario.filter(
      (e) => e.refId === refId && e.tipo === tipo,
    ).length;
    // La primera entrada conserva el nombre tal cual; solo a partir de la
    // segunda se numera: "Goblin", "Goblin (2)", "Goblin (3)"…
    const nombreNumerado = repeticiones === 0 ? nombre : `${nombre} (${repeticiones + 1})`;

    partidaActual.value.diario.push({
      id: `diario_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      refId,
      tipo,
      nombre: nombreNumerado,
    });
    guardarPartidaActual();
    agregarLog(`📖 ${nombreNumerado} añadido al diario.`);
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

  // Esencia máxima del personaje de origen de un token (solo Pugilista). 6
  // puntos base, +6 por cada estrato (1 estrato cada 5 niveles). Criaturas y
  // personajes de otro estilo marcial no tienen Esencia (undefined).
  async function esenciaMaximaDe(
    entrada: Pick<EntradaDiario, "refId" | "tipo">,
  ): Promise<number | undefined> {
    if (entrada.tipo === "criatura") return undefined;
    const guardado = await obtenerPersonaje(entrada.refId);
    if (guardado?.estilo_marcial !== "Pugilista") return undefined;
    const estrato = Math.ceil((guardado.nivel || 1) / 5);
    return 6 * estrato;
  }

  // Coloca un token de una entrada del diario. Si se pasa `posDestino` (p. ej.
  // al arrastrar y soltar sobre un hexágono), se usa esa posición; si no, se
  // busca la primera casilla libre del mapa hexagonal activo.
  // Cada entrada del diario solo puede tener UN token en el mapa a la vez
  // (aunque varias entradas compartan `refId` por ser el mismo personaje
  // añadido más de una vez): si ya está colocada, no hace nada.
  async function colocarToken(
    entrada: Pick<EntradaDiario, "id" | "refId" | "tipo" | "nombre">,
    posDestino?: { col: number; row: number; nivel: number },
  ) {
    const p = partidaActual.value;
    if (!p) return;
    if (!p.tokens) p.tokens = [];
    if (p.tokens.some((t) => t.diarioId === entrada.id)) {
      agregarLog(`⚠️ ${entrada.nombre} ya está en el mapa.`);
      return;
    }

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
    const esenciaMax = await esenciaMaximaDe(entrada);
    p.tokens.push({
      id: `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      refId: entrada.refId,
      diarioId: entrada.id,
      tipo: entrada.tipo,
      nombre: entrada.nombre,
      pos,
      vida: { actual: max, max },
      esencia: esenciaMax ? { actual: 0, max: esenciaMax } : undefined,
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

  // Sube (o baja) la vida MÁXIMA del token, arrastrando la vida actual el mismo
  // delta (p. ej. al subir el atributo Cuerpo durante la partida). El máximo no
  // baja de 1 y la actual queda entre 0 y el nuevo máximo.
  async function ajustarVidaMaximaToken(tokenId: string, delta: number) {
    const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
    if (!token) return;
    const vida = await asegurarVida(token);
    vida.max = Math.max(1, vida.max + delta);
    vida.actual = Math.max(0, Math.min(vida.max, vida.actual + delta));
    guardarPartidaActual();
  }

  // --- Esencia de un token (solo personajes Pugilista) ---
  // Asegura que el token tenga el objeto esencia inicializado (tokens creados
  // antes de esta función, o cuyo personaje se convirtió en Pugilista después
  // de colocarse en el mapa) y devuelve su esencia, o undefined si no aplica.
  async function asegurarEsencia(
    token: TokenPartida,
  ): Promise<{ actual: number; max: number } | undefined> {
    if (!token.esencia) {
      const max = await esenciaMaximaDe(token);
      if (!max) return undefined;
      token.esencia = { actual: 0, max };
    }
    return token.esencia;
  }

  // Fija la esencia actual del token (se limita entre 0 y el máximo).
  async function establecerEsenciaToken(tokenId: string, actual: number) {
    const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
    if (!token) return;
    const esencia = await asegurarEsencia(token);
    if (!esencia) return;
    const n = Number.isFinite(actual) ? Math.round(actual) : esencia.actual;
    esencia.actual = Math.max(0, Math.min(esencia.max, n));
    guardarPartidaActual();
  }

  // Suma (o resta) puntos a la esencia actual del token.
  async function ajustarEsenciaToken(tokenId: string, delta: number) {
    const token = partidaActual.value?.tokens?.find((t) => t.id === tokenId);
    if (!token) return;
    const esencia = await asegurarEsencia(token);
    if (!esencia) return;
    await establecerEsenciaToken(tokenId, esencia.actual + delta);
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

  // --- Marcas sobre el mapa (trampas, objetos…) ---
  // Pinta una marca de la forma elegida sobre una casilla. Es puramente visual.
  function colocarMarca(
    forma: FormaMarca,
    pos: { col: number; row: number; nivel: number },
  ) {
    const p = partidaActual.value;
    if (!p) return;
    if (!p.marcas) p.marcas = [];
    const marca: MarcaPartida = {
      id: `marca_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      forma,
      pos,
    };
    p.marcas.push(marca);
    guardarPartidaActual();
  }

  function quitarMarca(id: string) {
    const p = partidaActual.value;
    if (!p?.marcas) return;
    p.marcas = p.marcas.filter((m) => m.id !== id);
    guardarPartidaActual();
  }

  // Quita la marca que haya en una celda concreta, si la hay (para poder
  // "alternar" con un clic: quitar la existente en vez de apilar otra encima).
  // Devuelve true si había una marca y se ha quitado.
  function quitarMarcaEnCelda(pos: {
    col: number;
    row: number;
    nivel: number;
  }): boolean {
    const p = partidaActual.value;
    if (!p?.marcas) return false;
    const antes = p.marcas.length;
    p.marcas = p.marcas.filter(
      (m) =>
        !(m.pos.col === pos.col && m.pos.row === pos.row && m.pos.nivel === pos.nivel),
    );
    if (p.marcas.length === antes) return false;
    guardarPartidaActual();
    return true;
  }

  return {
    partidaActual,
    personajeActivo,
    logs,
    mensajesChat,
    fichasFlotantes,
    ordenIniciativa,
    turnoIniciativa,
    tokenSenalado,
    senalarToken,
    abrirFichaInstancia,
    abrirFichaGuardado,
    abrirFichaCriatura,
    cerrarFicha,
    bonosDeFicha,
    armaSeleccionadaDeFicha,
    guardarArmaSeleccionada,
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
    limpiarChat,
    agregarAlDiario,
    quitarDelDiario,
    seleccionarMapa,
    quitarMapaActivo,
    colocarToken,
    moverToken,
    quitarToken,
    establecerVidaToken,
    ajustarVidaToken,
    ajustarVidaMaximaToken,
    establecerEsenciaToken,
    ajustarEsenciaToken,
    agregarEstadoToken,
    establecerValorEstadoToken,
    quitarEstadoToken,
    colocarMarca,
    quitarMarca,
    quitarMarcaEnCelda,
  };
}
