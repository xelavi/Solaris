<template>
  <div
    class="panel-scroll fixed top-0 right-0 z-50 flex h-screen w-80 flex-col overflow-hidden border-l border-gray-700 bg-gray-900/95 text-gray-100 shadow-2xl backdrop-blur-md"
  >
    <!-- Cabecera -->
    <div class="flex items-center gap-2.5 border-b border-gray-700 px-4 py-3">
      <span
        class="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-600/20 text-sm text-indigo-300"
        >✦</span
      >
      <div class="leading-none">
        <h2 class="font-serif text-lg font-bold tracking-wide text-white">
          Solaris
        </h2>
        <p class="mt-0.5 text-[10px] tracking-widest text-gray-500 uppercase">
          Mesa de juego
        </p>
      </div>
    </div>

    <!-- Pestañas -->
    <div class="flex border-b border-gray-700">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="tabActiva = tab.id"
        class="relative flex flex-1 items-center justify-center gap-2 py-3 text-xs font-bold tracking-widest uppercase transition-colors"
        :class="
          tabActiva === tab.id
            ? 'bg-gray-800 text-white'
            : 'text-gray-500 hover:bg-gray-800/50 hover:text-gray-300'
        "
      >
        <span class="text-sm">{{ tab.icon }}</span>
        {{ tab.label }}
        <span
          v-if="tabActiva === tab.id"
          class="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500"
        ></span>
      </button>
    </div>

    <!-- ===================== CHAT ===================== -->
    <div v-show="tabActiva === 'chat'" class="flex min-h-0 flex-1 flex-col">
      <div
        ref="logContainer"
        class="chat-feed flex-1 space-y-2.5 overflow-y-auto p-3"
      >
        <div
          v-for="msg in mensajesChat"
          :key="msg.id"
          class="chat-msg"
          :style="msg.color ? { '--msg': msg.color } : {}"
        >
          <!-- Cabecera: autor + acción + hora -->
          <div class="chat-head">
            <span v-if="msg.autor" class="chat-author">{{ msg.autor }}</span>
            <span class="chat-action">{{ msg.texto }}</span>
            <span class="chat-time">{{ msg.hora }}</span>
          </div>

          <!-- Etiqueta acción / reacción -->
          <span
            v-if="msg.tipoEjecucion"
            class="chat-badge"
            :class="msg.tipoEjecucion"
            >{{ labelEjecucion(msg.tipoEjecucion) }}</span
          >

          <!-- Resultado de la tirada -->
          <div v-if="msg.tirada" class="chat-roll">
            <div class="chat-total">
              <span class="chat-total-n">{{ msg.tirada.total }}</span>
              <span class="chat-formula">{{ msg.tirada.formula }}</span>
              <span
                v-if="msg.tirada.ventaja > 0"
                class="chat-vtag adv"
                >Ventaja ×{{ msg.tirada.ventaja }}</span
              >
              <span
                v-else-if="msg.tirada.ventaja < 0"
                class="chat-vtag dis"
                >Desventaja ×{{ -msg.tirada.ventaja }}</span
              >
            </div>

            <button class="chat-toggle" @click="toggleDesglose(msg.id)">
              {{ desgloseAbierto.has(msg.id) ? "▾ Ocultar desglose" : "▸ Ver desglose" }}
            </button>

            <div v-if="desgloseAbierto.has(msg.id)" class="chat-break">
              <div class="chat-break-row">
                <span class="chat-break-l">Dados (d12)</span>
                <span class="chat-dice">
                  <span
                    v-for="(d, i) in msg.tirada.dadosTirados"
                    :key="i"
                    class="chat-die"
                    :class="{ used: msg.tirada.indicesUsados.includes(i) }"
                    >{{ d }}</span
                  >
                </span>
              </div>
              <div class="chat-break-row">
                <span class="chat-break-l">Suma de dados</span>
                <span class="chat-break-v">{{ msg.tirada.sumaDados }}</span>
              </div>
              <div class="chat-break-row">
                <span class="chat-break-l">{{ msg.tirada.modificadorLabel }}</span>
                <span class="chat-break-v"
                  >{{ msg.tirada.modificador >= 0 ? "+" : "" }}{{ msg.tirada.modificador }}</span
                >
              </div>
              <div class="chat-break-row total">
                <span class="chat-break-l">Total</span>
                <span class="chat-break-v">{{ msg.tirada.total }}</span>
              </div>
            </div>
          </div>

          <!-- Daño plano del ataque -->
          <div
            v-if="msg.dano"
            class="chat-dmg"
            :style="msg.danoColor ? { '--dmg': msg.danoColor } : {}"
          >
            <span class="chat-dmg-l">⚔ Daño</span>
            <span class="chat-dmg-v">{{ msg.dano }}</span>
          </div>

          <!-- Descripción de la acción / reacción -->
          <p v-if="msg.descripcion" class="chat-desc">{{ msg.descripcion }}</p>
        </div>

        <div
          v-if="mensajesChat.length === 0"
          class="flex flex-col items-center gap-2 pt-10 text-center"
        >
          <span class="text-2xl opacity-40">📜</span>
          <p class="text-sm text-gray-600 italic">Sin mensajes todavía.</p>
        </div>
      </div>

      <div class="border-t border-gray-700 p-2">
        <div class="flex gap-2">
          <input
            v-model="mensaje"
            type="text"
            placeholder="Escribe un mensaje…"
            class="flex-1 rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
            @keyup.enter="enviar"
          />
          <button
            @click="enviar"
            :disabled="!mensaje.trim()"
            class="rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ➤
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== DIARIO ===================== -->
    <div v-show="tabActiva === 'diario'" class="flex min-h-0 flex-1 flex-col">
      <div class="border-b border-gray-700 p-3">
        <button
          @click="abrirModal"
          class="w-full rounded-lg bg-indigo-600 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-500"
        >
          <span class="mr-1">＋</span> Añadir entidad
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-3">
        <!-- Sección Personajes -->
        <div class="mb-3">
          <button
            @click="secciones.personajes = !secciones.personajes"
            class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[11px] font-bold tracking-widest text-gray-400 uppercase transition-colors hover:bg-gray-800 hover:text-gray-200"
          >
            <span class="flex items-center gap-2">
              <span
                class="text-[9px] text-indigo-400 transition-transform"
                :class="secciones.personajes ? 'rotate-90' : ''"
                >▶</span
              >
              Personajes
            </span>
            <span
              class="rounded-full border border-gray-700 bg-gray-800 px-2 text-[10px] font-semibold text-gray-400"
              >{{ personajes.length }}</span
            >
          </button>
          <div v-show="secciones.personajes" class="mt-1.5 space-y-1.5">
            <p
              v-if="personajes.length === 0"
              class="px-2 py-2 text-xs text-gray-600 italic"
            >
              No hay personajes en el diario.
            </p>
            <div
              v-for="entrada in personajes"
              :key="entrada.id"
              draggable="true"
              @dragstart="onDragStart($event, entrada)"
              @click="abrirFichaGuardado(entrada.refId, entrada.nombre, entrada.id)"
              @contextmenu.prevent="abrirFichaGuardado(entrada.refId, entrada.nombre, entrada.id)"
              title="Clic para ver la ficha · arrastra al mapa"
              class="group flex cursor-pointer items-center gap-2.5 rounded-lg border border-gray-700 bg-gray-800/60 px-3 py-2 transition-colors hover:border-indigo-500/50 hover:bg-gray-800 active:cursor-grabbing"
            >
              <span
                class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-b from-indigo-600 to-indigo-800 text-sm font-bold text-white"
                >{{ inicial(entrada.nombre) }}</span
              >
              <span class="flex-1 truncate text-sm text-gray-200">{{
                entrada.nombre
              }}</span>
              <div class="flex items-center gap-1.5">
                <button
                  v-if="!tieneTokenColocado(entrada.id)"
                  @click.stop="colocarToken(entrada)"
                  class="text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-indigo-400"
                  title="Colocar en el mapa"
                >
                  📍
                </button>
                <span
                  v-else
                  class="text-[10px] text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100"
                  title="Ya está en el mapa"
                >
                  En el mapa
                </span>
                <button
                  @click.stop="quitarDelDiario(entrada.id)"
                  class="text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400"
                  title="Quitar del diario"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección Bestiario -->
        <div>
          <button
            @click="secciones.criaturas = !secciones.criaturas"
            class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[11px] font-bold tracking-widest text-gray-400 uppercase transition-colors hover:bg-gray-800 hover:text-gray-200"
          >
            <span class="flex items-center gap-2">
              <span
                class="text-[9px] text-indigo-400 transition-transform"
                :class="secciones.criaturas ? 'rotate-90' : ''"
                >▶</span
              >
              Bestiario
            </span>
            <span
              class="rounded-full border border-gray-700 bg-gray-800 px-2 text-[10px] font-semibold text-gray-400"
              >{{ criaturas.length }}</span
            >
          </button>
          <div v-show="secciones.criaturas" class="mt-1.5 space-y-1.5">
            <p
              v-if="criaturas.length === 0"
              class="px-2 py-2 text-xs text-gray-600 italic"
            >
              No hay criaturas en el diario.
            </p>
            <div
              v-for="entrada in criaturas"
              :key="entrada.id"
              draggable="true"
              @dragstart="onDragStart($event, entrada)"
              @click="abrirFichaCriatura(entrada.refId, entrada.nombre, entrada.id)"
              @contextmenu.prevent="abrirFichaCriatura(entrada.refId, entrada.nombre, entrada.id)"
              title="Clic para ver la ficha · arrastra al mapa"
              class="group flex cursor-pointer items-center gap-2.5 rounded-lg border border-gray-700 bg-gray-800/60 px-3 py-2 transition-colors hover:border-indigo-500/50 hover:bg-gray-800 active:cursor-grabbing"
            >
              <span
                class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-b from-red-700 to-red-900 text-sm font-bold text-white"
                >{{ inicial(entrada.nombre) }}</span
              >
              <span class="flex-1 truncate text-sm text-gray-200">{{
                entrada.nombre
              }}</span>
              <div class="flex items-center gap-1.5">
                <button
                  v-if="!tieneTokenColocado(entrada.id)"
                  @click.stop="colocarToken(entrada)"
                  class="text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-indigo-400"
                  title="Colocar en el mapa"
                >
                  📍
                </button>
                <span
                  v-else
                  class="text-[10px] text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100"
                  title="Ya está en el mapa"
                >
                  En el mapa
                </span>
                <button
                  @click.stop="quitarDelDiario(entrada.id)"
                  class="text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400"
                  title="Quitar del diario"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== MODAL AÑADIR ENTIDAD ===================== -->
    <div
      v-if="modalAbierto"
      class="absolute inset-0 z-10 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      @click.self="cerrarModal"
    >
      <div
        class="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-2xl"
      >
        <div
          class="flex items-center justify-between border-b border-gray-700 p-3"
        >
          <h3 class="text-sm font-bold text-white">
            {{ tipoElegido ? tituloLista : "Añadir entidad" }}
          </h3>
          <button @click="cerrarModal" class="text-gray-500 hover:text-gray-300">
            ✕
          </button>
        </div>

        <!-- Paso 1: elegir tipo -->
        <div v-if="!tipoElegido" class="grid grid-cols-2 gap-3 p-4">
          <button
            @click="elegirTipo('personaje')"
            class="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 py-7 text-sm font-bold text-gray-200 transition-colors hover:border-indigo-500 hover:bg-gray-700"
          >
            Personaje
          </button>
          <button
            @click="elegirTipo('criatura')"
            class="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 py-7 text-sm font-bold text-gray-200 transition-colors hover:border-indigo-500 hover:bg-gray-700"
          >
            Bestiario
          </button>
        </div>

        <!-- Paso 2: lista de existentes -->
        <div v-else class="min-h-0 flex-1 overflow-y-auto p-3">
          <button
            @click="tipoElegido = null"
            class="mb-3 text-xs text-gray-500 transition-colors hover:text-gray-300"
          >
            ← Cambiar tipo
          </button>

          <p
            v-if="disponibles.length === 0"
            class="py-6 text-center text-sm text-gray-500"
          >
            No hay {{ tipoElegido === "personaje" ? "personajes" : "criaturas" }}
            disponibles.
          </p>

          <div v-else class="space-y-2">
            <button
              v-for="item in disponibles"
              :key="item.id"
              @click="seleccionar(item)"
              class="flex w-full items-center gap-2.5 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-left transition-colors hover:border-indigo-500 hover:bg-gray-700"
            >
              <span
                class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-sm font-bold text-white"
                :class="
                  tipoElegido === 'personaje'
                    ? 'bg-gradient-to-b from-indigo-600 to-indigo-800'
                    : 'bg-gradient-to-b from-red-700 to-red-900'
                "
                >{{ inicial(item.nombre) }}</span
              >
              <span class="flex-1 text-sm font-semibold text-gray-100">{{
                item.nombre
              }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, nextTick, onMounted } from "vue";
import { usePartida } from "../../domain/usePartida";
import type { EntradaDiario } from "../../domain/Partida";
import { listarPersonajes } from "../../domain/storage/personajesRepo";
import { listarCriaturas } from "../../domain/storage/criaturasRepo";
import { esPersonajeCompleto, type PersonajeGuardado } from "../../domain/Personaje";
import type { CriaturaData } from "../../domain/Criatura";

const {
  mensajesChat,
  partidaActual,
  enviarMensajeChat,
  agregarAlDiario,
  quitarDelDiario,
  colocarToken,
  abrirFichaGuardado,
  abrirFichaCriatura,
} = usePartida();

const tabs = [
  { id: "chat" as const, label: "Chat", icon: "💬" },
  { id: "diario" as const, label: "Diario", icon: "📖" },
];
const tabActiva = ref<"chat" | "diario">("chat");

// --- Chat ---
const mensaje = ref("");
const logContainer = ref<HTMLDivElement | null>(null);

// Mensajes de tirada con el desglose desplegado.
const desgloseAbierto = reactive<Set<number>>(new Set());
function toggleDesglose(id: number) {
  if (desgloseAbierto.has(id)) desgloseAbierto.delete(id);
  else desgloseAbierto.add(id);
}

// Etiqueta legible del tipo de ejecución (acción/reacción).
function labelEjecucion(tipo?: string): string {
  if (tipo === "accion") return "Acción";
  if (tipo === "reaccion") return "Reacción";
  if (tipo === "ritual") return "Ritual";
  if (tipo === "pasiva") return "Pasiva";
  return tipo ?? "";
}

function enviar() {
  if (!mensaje.value.trim()) return;
  enviarMensajeChat(mensaje.value);
  mensaje.value = "";
}

watch(
  mensajesChat,
  () => {
    nextTick(() => {
      if (logContainer.value) {
        logContainer.value.scrollTop = logContainer.value.scrollHeight;
      }
    });
  },
  { deep: true },
);

// --- Diario ---
const secciones = reactive({ personajes: true, criaturas: true });

const entradas = computed<EntradaDiario[]>(
  () => partidaActual.value?.diario ?? [],
);
const personajes = computed(() =>
  entradas.value.filter((e) => e.tipo === "personaje"),
);
const criaturas = computed(() =>
  entradas.value.filter((e) => e.tipo === "criatura"),
);

function inicial(nombre: string): string {
  return nombre?.trim().charAt(0).toUpperCase() || "?";
}

// Una entrada del diario solo puede tener un token en el mapa a la vez.
function tieneTokenColocado(entradaId: string): boolean {
  return (partidaActual.value?.tokens ?? []).some(
    (t) => t.diarioId === entradaId,
  );
}

// --- Modal añadir entidad ---
interface ItemDisponible {
  id: string;
  nombre: string;
}

const modalAbierto = ref(false);
const tipoElegido = ref<EntradaDiario["tipo"] | null>(null);

// Catálogos cargados de forma asíncrona (el backend de almacenamiento puede ser
// remoto). Se refrescan al abrir el paso de selección para reflejar altas
// recientes; `disponibles` es un computed puro que solo lee de estos refs.
const personajesGuardados = ref<PersonajeGuardado[]>([]);
const criaturasGuardadas = ref<CriaturaData[]>([]);

async function cargarDisponibles() {
  [personajesGuardados.value, criaturasGuardadas.value] = await Promise.all([
    listarPersonajes(),
    listarCriaturas(),
  ]);
}
onMounted(cargarDisponibles);

const tituloLista = computed(() =>
  tipoElegido.value === "personaje" ? "Elegir personaje" : "Elegir criatura",
);

const disponibles = computed<ItemDisponible[]>(() => {
  if (tipoElegido.value === "personaje") {
    return personajesGuardados.value
      .filter((p) => esPersonajeCompleto(p))
      .map((p) => ({ id: p.id, nombre: p.nombre }));
  }
  if (tipoElegido.value === "criatura") {
    return criaturasGuardadas.value.map((c) => ({ id: c.id, nombre: c.nombre }));
  }
  return [];
});

function abrirModal() {
  tipoElegido.value = null;
  modalAbierto.value = true;
}

function cerrarModal() {
  modalAbierto.value = false;
  tipoElegido.value = null;
}

function elegirTipo(tipo: EntradaDiario["tipo"]) {
  tipoElegido.value = tipo;
  void cargarDisponibles();
}

function seleccionar(item: ItemDisponible) {
  if (!tipoElegido.value) return;
  agregarAlDiario(tipoElegido.value, item.id, item.nombre);
}

// Arrastrar una entrada del diario hacia el mapa: la escena leerá estos datos
// en su `drop` y colocará el token en el hexágono soltado.
function onDragStart(e: DragEvent, entrada: EntradaDiario) {
  if (!e.dataTransfer) return;
  e.dataTransfer.setData(
    "application/json",
    JSON.stringify({
      id: entrada.id,
      refId: entrada.refId,
      tipo: entrada.tipo,
      nombre: entrada.nombre,
    }),
  );
  e.dataTransfer.effectAllowed = "copy";
}
</script>

<style scoped>
/* Scrollbars oscuros: los del tema global son claros y desentonan sobre la
   escena 3D. Se aplican a todos los contenedores scrollables del panel. */
.panel-scroll :deep(*) {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.4) transparent;
}
.panel-scroll :deep(*::-webkit-scrollbar) {
  width: 7px;
}
.panel-scroll :deep(*::-webkit-scrollbar-thumb) {
  background-color: rgba(99, 102, 241, 0.35);
  border-radius: 8px;
}
.panel-scroll :deep(*::-webkit-scrollbar-thumb:hover) {
  background-color: rgba(99, 102, 241, 0.55);
}
.panel-scroll :deep(*::-webkit-scrollbar-track) {
  background: transparent;
}

/* ===================== CHAT ===================== */
.chat-feed {
  font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
  font-size: 14px;
}
.chat-msg {
  --msg: #6366f1;
  border-left: 3px solid var(--msg);
  border-radius: 8px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.03);
}
.chat-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;
  line-height: 1.35;
}
.chat-author {
  font-weight: 800;
  color: var(--msg);
}
.chat-action {
  color: #e5e7eb;
}
.chat-time {
  margin-left: auto;
  font-size: 10px;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}

.chat-badge {
  display: inline-block;
  margin-top: 6px;
  padding: 1px 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fff;
  background: #6366f1;
}
.chat-badge.reaccion {
  background: #cc7d10;
}
.chat-badge.ritual {
  background: #7c3aed;
}
.chat-badge.pasiva {
  background: #4b5563;
}

/* Resultado de la tirada */
.chat-roll {
  margin-top: 8px;
}
.chat-total {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.chat-total-n {
  font-size: 26px;
  font-weight: 900;
  line-height: 1;
  color: var(--msg);
  font-variant-numeric: tabular-nums;
}
.chat-formula {
  font-size: 12px;
  color: #9ca3af;
  font-variant-numeric: tabular-nums;
}
.chat-vtag {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 2px 8px;
  border-radius: 999px;
}
.chat-vtag.adv {
  color: #34d399;
  background: rgba(16, 185, 129, 0.15);
  box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.4);
}
.chat-vtag.dis {
  color: #f87171;
  background: rgba(239, 68, 68, 0.15);
  box-shadow: inset 0 0 0 1px rgba(239, 68, 68, 0.4);
}

.chat-toggle {
  margin-top: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.12s ease;
}
.chat-toggle:hover {
  color: #e5e7eb;
}

.chat-break {
  margin-top: 6px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.chat-break-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 2px 0;
  font-size: 12px;
  color: #9ca3af;
}
.chat-break-row.total {
  margin-top: 4px;
  padding-top: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #e5e7eb;
  font-weight: 800;
}
.chat-break-v {
  font-variant-numeric: tabular-nums;
  color: #e5e7eb;
  font-weight: 700;
}
.chat-dice {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.chat-die {
  min-width: 22px;
  padding: 2px 4px;
  text-align: center;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-variant-numeric: tabular-nums;
  text-decoration: line-through;
  text-decoration-color: rgba(148, 163, 184, 0.5);
}
.chat-die.used {
  color: #fff;
  background: var(--msg);
  border-color: transparent;
  text-decoration: none;
}

/* Daño plano */
.chat-dmg {
  --dmg: #d8365f;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 4px 12px;
  border-radius: 8px;
  color: var(--dmg);
  background: color-mix(in srgb, var(--dmg) 14%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--dmg) 40%, transparent);
}
.chat-dmg-l {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.chat-dmg-v {
  font-size: 15px;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}

/* Descripción de acción / reacción */
.chat-desc {
  margin-top: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.5;
  color: #cbd5e1;
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
