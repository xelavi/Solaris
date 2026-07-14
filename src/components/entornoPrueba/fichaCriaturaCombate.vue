<template>
  <div class="ficha-root">
    <div class="mx-auto" style="width: 1280px">
      <div v-if="criatura">
        <!-- Fila 1: identidad + puntos de vida -->
        <div class="fx-row1">
          <div class="fx-panel fx-ident">
            <div class="fx-portrait">
              {{ (criatura.nombre || "?").charAt(0).toUpperCase() }}
            </div>
            <div class="fx-ident-info">
              <h1>{{ criatura.nombre || "Sin nombre" }}</h1>
              <div class="fx-role">{{ rolTexto }}</div>
              <div class="fx-chips">
                <span class="fx-chip">Dificultad {{ criatura.dificultad }}</span>
                <span class="fx-chip">{{ criatura.experiencia }} XP</span>
              </div>
            </div>
            <div class="fx-ident-stats">
              <button
                type="button"
                class="fx-mini fx-mini-click"
                title="Tirar Iniciativa (2d12 + Iniciativa)"
                @click="tirarIniciativa"
              >
                <span class="fx-mini-l">Iniciativa</span>
                <span class="fx-mini-v tnum">{{
                  formatoMod(criatura.atributos.iniciativa)
                }}</span>
              </button>
            </div>
          </div>

          <div class="fx-panel">
            <div class="fx-phead">
              <span class="fx-grow">Puntos de vida</span>
              <button
                v-if="tokenVinculado"
                class="fx-gear"
                :class="{ on: editVida }"
                title="Ajustar vida"
                aria-label="Ajustar vida"
                @click="editVida = !editVida"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm7.4 3.5c0-.3 0-.6-.06-.9l1.7-1.32a.4.4 0 0 0 .1-.52l-1.6-2.77a.4.4 0 0 0-.5-.18l-2 .8a6 6 0 0 0-1.56-.9l-.3-2.13a.4.4 0 0 0-.4-.34h-3.2a.4.4 0 0 0-.4.34l-.3 2.13c-.56.23-1.08.53-1.56.9l-2-.8a.4.4 0 0 0-.5.18l-1.6 2.77a.4.4 0 0 0 .1.52l1.7 1.32c-.04.3-.06.6-.06.9s.02.6.06.9l-1.7 1.32a.4.4 0 0 0-.1.52l1.6 2.77c.1.18.32.25.5.18l2-.8c.48.37 1 .67 1.56.9l.3 2.13c.03.2.2.34.4.34h3.2c.2 0 .37-.14.4-.34l.3-2.13c.56-.23 1.08-.53 1.56-.9l2 .8c.18.07.4 0 .5-.18l1.6-2.77a.4.4 0 0 0-.1-.52l-1.7-1.32c.04-.3.06-.6.06-.9Z"
                  />
                </svg>
              </button>
            </div>
            <div class="fx-hpwrap">
              <div class="fx-hpmain">
                <div class="fx-hpbox cur">
                  <div class="fx-hp-cap">Vida</div>
                  <div class="fx-hp-field tnum">{{ vidaActual }}</div>
                </div>
                <div class="fx-hpbox">
                  <div class="fx-hp-cap">Máximo</div>
                  <div class="fx-hp-field tnum">{{ vidaMax }}</div>
                </div>
              </div>
              <div v-if="editVida && tokenVinculado" class="fx-hpedit">
                <span class="fx-hpedit-l">Vida actual</span>
                <input
                  type="number"
                  class="fx-hpinput tnum"
                  min="0"
                  :value="vidaActual"
                  @input="
                    fijarVidaToken(($event.target as HTMLInputElement).value)
                  "
                />
              </div>
              <div class="fx-hpbar"><span :style="{ width: hpPct + '%' }"></span></div>
            </div>
          </div>
        </div>

        <!-- Fila 2: atributos + armadura/velocidad -->
        <div class="fx-row2">
          <div class="fx-panel">
            <div class="fx-phead"><span class="fx-grow">Atributos</span></div>
            <div class="fx-attrs">
              <div class="fx-attr" style="--c: var(--cu)">
                <div class="fx-attr-top">
                  <span class="fx-attr-name">Cuerpo</span>
                  <div class="fx-hex"><span class="tnum">{{ criatura.atributos.cuerpo }}</span></div>
                </div>
                <div class="fx-attr-rows">
                  <div class="fx-arow"><span>Poderío</span><b class="tnum">{{ criatura.atributos.poderio }}</b></div>
                  <div class="fx-arow"><span>Movimiento</span><b class="tnum">{{ criatura.atributos.movimiento }}</b></div>
                  <div class="fx-arow"><span>Resistencia</span><b class="tnum">{{ criatura.atributos.resistencia }}</b></div>
                </div>
              </div>

              <div class="fx-attr" style="--c: var(--ag)">
                <div class="fx-attr-top">
                  <span class="fx-attr-name">Agilidad</span>
                  <div class="fx-hex"><span class="tnum">{{ criatura.atributos.agilidad }}</span></div>
                </div>
                <div class="fx-attr-rows">
                  <div class="fx-arow"><span>Esquiva</span><b class="tnum">{{ criatura.atributos.evasion }}</b></div>
                  <div class="fx-arow"><span>Iniciativa</span><b class="tnum">{{ formatoMod(criatura.atributos.iniciativa) }}</b></div>
                  <div class="fx-arow"><span>Puntería</span><b class="tnum">{{ criatura.atributos.punteria }}</b></div>
                </div>
              </div>

              <div class="fx-attr" style="--c: var(--me)">
                <div class="fx-attr-top">
                  <span class="fx-attr-name">Mente</span>
                  <div class="fx-hex"><span class="tnum">{{ criatura.atributos.mente }}</span></div>
                </div>
                <div class="fx-attr-rows">
                  <div class="fx-arow"><span>Regeneración</span><b class="tnum">{{ criatura.atributos.regeneracion }}</b></div>
                  <div class="fx-arow"><span>Acciones</span><b class="tnum">{{ criatura.atributos.acciones }}</b></div>
                  <div class="fx-arow"><span>Reacciones</span><b class="tnum">{{ criatura.atributos.reacciones }}</b></div>
                </div>
              </div>
            </div>
          </div>

          <div class="fx-panel">
            <div class="fx-phead"><span class="fx-grow">Armadura / Velocidad</span></div>
            <div class="fx-acspeed">
              <div class="fx-ac">
                <div class="fx-ac-lbl">Armadura</div>
                <div class="fx-shields">
                  <div class="fx-sh l">
                    <span class="fx-sh-cap">L</span>
                    <div class="fx-sh-fig"><span class="tnum">{{ criatura.armadura.lacerante }}</span></div>
                  </div>
                  <div class="fx-sh p">
                    <span class="fx-sh-cap">P</span>
                    <div class="fx-sh-fig"><span class="tnum">{{ criatura.armadura.perforante }}</span></div>
                  </div>
                  <div class="fx-sh c">
                    <span class="fx-sh-cap">C</span>
                    <div class="fx-sh-fig"><span class="tnum">{{ criatura.armadura.contundente }}</span></div>
                  </div>
                </div>
              </div>
              <div class="fx-sp">
                <div class="fx-ac-lbl">Movimiento</div>
                <div class="fx-sp-val tnum">
                  {{ criatura.atributos.movimiento }}<small> ecsas</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Fila 3: habilidades | técnicas -->
        <div class="fx-row3">
          <!-- Izquierda: habilidades -->
          <div class="fx-stack">
            <div class="fx-panel">
              <div class="fx-phead">
                <span class="fx-grow">Habilidades</span>
                <button class="fx-toggle" @click="mostrarTodas = !mostrarTodas">
                  {{ mostrarTodas ? "Solo competentes" : "Ver todas" }}
                </button>
              </div>
              <div class="fx-skills">
                <div
                  v-for="hab in habilidadesVisibles"
                  :key="hab.nombre"
                  :class="['fx-skill', 'fx-usable', hab.competente ? 'comp' : 'dim']"
                  @click="usarHabilidad(hab)"
                >
                  <span :class="['fx-prof', { on: hab.competente }]"></span>
                  <span :class="['fx-atag', tagAtributo(hab.atributo).c]">{{
                    tagAtributo(hab.atributo).t
                  }}</span>
                  <span class="fx-sname">{{ hab.nombre }}</span>
                  <span class="fx-sval tnum">{{ formatoMod(hab.total) }}</span>
                </div>
                <div v-if="!habilidadesVisibles.length" class="fx-empty">
                  Sin habilidades competentes
                </div>
              </div>
            </div>
          </div>

          <!-- Derecha: técnicas -->
          <div class="fx-stack">
            <div class="fx-panel">
              <div class="fx-sect"><span class="fx-grow">Técnicas</span></div>
              <div class="fx-rpad">
                <div
                  v-for="(tecnica, i) in tecnicas"
                  :key="i"
                  :class="['fx-exp', { open: tecnica.abierto }]"
                >
                  <div
                    class="fx-exp-h"
                    :class="{
                      'fx-usable': tieneDano(tecnica),
                      'fx-sel': tieneDano(tecnica) && tecnicaSeleccionadaId === i,
                    }"
                    @click="tieneDano(tecnica) && seleccionarTecnica(i)"
                  >
                    <span class="fx-exp-n">{{ tecnica.nombre }}</span>
                    <span
                      v-if="esUsable(tecnica.tipoEjecucion) && !tieneDano(tecnica)"
                      class="fx-use-btn"
                      role="button"
                      title="Usar"
                      @click.stop="usarTecnica(tecnica)"
                      >Usar</span
                    >
                    <span class="fx-tags">
                      <span :class="['fx-tag', claseEjecucion(tecnica.tipoEjecucion)]">{{
                        etiquetaEjecucion(tecnica.tipoEjecucion)
                      }}</span>
                      <span
                        v-if="tecnica.tipoEjecucion === 'accion' && tecnica.acciones"
                        class="fx-tag fx-tag-acc"
                        >{{ tecnica.acciones }} acc.</span
                      >
                      <span v-if="tecnica.tipoAccion" class="fx-tag fx-tag-tipo">{{
                        tecnica.tipoAccion === "mental" ? "Mental" : "Física"
                      }}</span>
                    </span>
                    <button
                      type="button"
                      class="fx-exp-toggle"
                      @click.stop="tecnica.abierto = !tecnica.abierto"
                      title="Ver detalles"
                    >
                      <svg class="fx-chev" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  <!-- Alcance / crítico / daño: siempre visibles para técnicas de ataque -->
                  <div v-if="tieneDano(tecnica)" class="fx-tec-atk">
                    <span class="fx-tec-stat">{{
                      tecnica.alcance > 0 ? tecnica.alcance + " ecsas" : "Cuerpo a cuerpo"
                    }}</span>
                    <span class="fx-tec-stat">×{{ tecnica.multiplicadorCritico }} · {{ tecnica.rangoCritico }}-24</span>
                    <div class="fx-dmgcell">
                      <span
                        v-if="tecnica.dano.lacerante > 0"
                        class="fx-dchip l tnum fx-dpick"
                        :class="{ 'fx-dsel': tecnicaSeleccionadaId === i && tipoDanoSeleccionado === 'lacerante' }"
                        @click.stop="seleccionarDanoTecnica(i, 'lacerante')"
                        >L {{ tecnica.dano.lacerante }}</span
                      >
                      <span
                        v-if="tecnica.dano.perforante > 0"
                        class="fx-dchip p tnum fx-dpick"
                        :class="{ 'fx-dsel': tecnicaSeleccionadaId === i && tipoDanoSeleccionado === 'perforante' }"
                        @click.stop="seleccionarDanoTecnica(i, 'perforante')"
                        >P {{ tecnica.dano.perforante }}</span
                      >
                      <span
                        v-if="tecnica.dano.contundente > 0"
                        class="fx-dchip c tnum fx-dpick"
                        :class="{ 'fx-dsel': tecnicaSeleccionadaId === i && tipoDanoSeleccionado === 'contundente' }"
                        @click.stop="seleccionarDanoTecnica(i, 'contundente')"
                        >C {{ tecnica.dano.contundente }}</span
                      >
                    </div>
                  </div>

                  <div v-if="tecnica.abierto" class="fx-exp-b">
                    <p v-if="tecnica.requisito" class="fx-exp-meta">
                      <span class="fx-exp-meta-l">Requisito:</span> {{ tecnica.requisito }}
                    </p>
                    <p v-if="tecnica.usable_si" class="fx-exp-meta">
                      <span class="fx-exp-meta-l">Usable si:</span> {{ tecnica.usable_si }}
                    </p>
                    <p v-if="tecnica.descripcion" class="fx-exp-d">
                      <DescripcionConEstados :texto="tecnica.descripcion" />
                    </p>
                  </div>
                </div>
                <div v-if="!tecnicas.length" class="fx-empty">Sin técnicas</div>
              </div>
            </div>

            <!-- Botón de ataque: usa la técnica y el tipo de daño seleccionados -->
            <button
              v-if="tecnicasConDano.length"
              class="fx-attack-btn"
              :disabled="!puedeAtacarTecnica"
              @click="confirmarAtaqueTecnica"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.92 5H5l9 9 1.42-1.42L6.92 5Zm9.66-1 2.83 2.83-3.54 3.54 1.42 1.41 1.4-1.4 1.42 1.4L21 11l-1.42-1.42L21 8.17 16.58 3.75 15.17 5.17 16.58 4ZM3 17.25V21h3.75l9.06-9.06-3.75-3.75L3 17.25Z"
                />
              </svg>
              <span>Atacar</span>
            </button>

            <!-- Ventaja / Desventaja: afecta a todas las tiradas de la ficha -->
            <div
              class="fx-adv"
              :class="{ adv: ventajaTirada > 0, dis: ventajaTirada < 0 }"
            >
              <button type="button" class="fx-adv-b dis" title="Añadir desventaja" @click="ajustarVentaja(-1)">−</button>
              <button type="button" class="fx-adv-lbl" title="Reiniciar a Normal" @click="reiniciarVentaja">
                {{ textoVentaja }}
              </button>
              <button type="button" class="fx-adv-b adv" title="Añadir ventaja" @click="ajustarVentaja(1)">＋</button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="fx-panel fx-tabpad">
        <p class="fx-empty">No se encontró la criatura.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type {
  CriaturaData,
  Tecnica,
  TipoEjecucion,
  DanoPorTipo,
} from "../../domain/Criatura";
import { obtenerCriatura } from "../../domain/storage/criaturasRepo";
import { tirar2d12, etiquetaVentaja } from "../../domain/dados";
import { usePartida } from "../../domain/usePartida";
import type { PayloadTirada } from "../../domain/usePartida";
import habilidadesData from "../../assets/habilidades.json";
import DescripcionConEstados from "../DescripcionConEstados.vue";

const props = defineProps<{
  criaturaId?: string;
  // id de la entrada del diario: localiza el token de esta instancia en el
  // mapa para mostrar y editar su vida actual (sincronizada con el escenario).
  diarioId?: string;
}>();

const { partidaActual, establecerVidaToken } = usePartida();
const tokenVinculado = computed(() =>
  props.diarioId
    ? partidaActual.value?.tokens?.find((t) => t.diarioId === props.diarioId)
    : undefined,
);
const vidaMax = computed(() => criatura.value?.atributos.hp ?? 0);
const vidaActual = computed(() => tokenVinculado.value?.vida?.actual ?? vidaMax.value);
const hpPct = computed(() => {
  const max = vidaMax.value || 1;
  return Math.max(0, Math.min(100, Math.round((vidaActual.value / max) * 100)));
});
const editVida = ref(false);
function fijarVidaToken(valor: string | number) {
  if (!tokenVinculado.value) return;
  establecerVidaToken(tokenVinculado.value.id, Number(valor));
}

// Igual que la ficha del personaje en partida: al usar una habilidad/técnica o
// tirar iniciativa se emite "tirar" con la tirada resuelta para el chat lateral.
const emit = defineEmits<{ (e: "tirar", payload: PayloadTirada): void }>();

const criatura = ref<CriaturaData | null>(null);

// Técnicas con estado de despliegue (como las activas del personaje).
interface TecnicaView extends Tecnica {
  abierto: boolean;
}
const tecnicas = ref<TecnicaView[]>([]);

onMounted(async () => {
  if (!props.criaturaId) return;
  const c = await obtenerCriatura(props.criaturaId);
  criatura.value = c;
  tecnicas.value = (c?.tecnicas ?? []).map((t) => ({ ...t, abierto: false }));
});

const rolTexto = computed(() => {
  const et = criatura.value?.etiquetas ?? [];
  return et.length ? et.join(" · ") : "Criatura";
});

// --- Ventaja / Desventaja (global a todas las tiradas de esta ficha) ---
const ventajaTirada = ref(0);
function ajustarVentaja(delta: number) {
  ventajaTirada.value = Math.max(-6, Math.min(6, ventajaTirada.value + delta));
}
function reiniciarVentaja() {
  ventajaTirada.value = 0;
}
const textoVentaja = computed(() => etiquetaVentaja(ventajaTirada.value));

// Formatea un modificador con su signo (+3 / −2 / 0).
function formatoMod(valor: number): string {
  if (valor > 0) return `+${valor}`;
  if (valor < 0) return `−${Math.abs(valor)}`;
  return "0";
}

// --- Habilidades ---
// El total de cada habilidad es el modificador del atributo asociado más los
// rangos que se le hayan asignado en la creación de la criatura.
function modAtributo(atributo: string): number {
  const a = criatura.value?.atributos;
  if (!a) return 0;
  if (atributo === "Cuerpo") return a.cuerpo;
  if (atributo === "Agilidad") return a.agilidad;
  return a.mente; // Mente / Artesanía / Recolección
}
function rangosHabilidad(id: number): number {
  return criatura.value?.habilidades.find((h) => h.id === id)?.rangos ?? 0;
}
const habilidades = computed(() =>
  (
    habilidadesData.habilidades as { id: number; nombre: string; atributo: string }[]
  ).map((h) => {
    const rangos = rangosHabilidad(h.id);
    return {
      nombre: h.nombre,
      atributo: h.atributo,
      competente: rangos > 0,
      total: modAtributo(h.atributo) + rangos,
    };
  }),
);
const mostrarTodas = ref(true);
const habilidadesOrdenadas = computed(() =>
  [...habilidades.value].sort((a, b) => b.total - a.total),
);
const habilidadesVisibles = computed(() =>
  mostrarTodas.value
    ? habilidadesOrdenadas.value
    : habilidadesOrdenadas.value.filter((h) => h.competente),
);

// Etiqueta corta y clase de color según el atributo de la habilidad.
function tagAtributo(atributo: string): { t: string; c: string } {
  if (atributo === "Cuerpo") return { t: "CUE", c: "cu" };
  if (atributo === "Agilidad") return { t: "AGI", c: "ag" };
  return { t: "MEN", c: "me" };
}

const COLOR_ATRIBUTO: Record<string, string> = {
  Cuerpo: "#d81f4a",
  Agilidad: "#0e9488",
  Mente: "#6d5ae6",
};
function colorAtributo(attr?: string): string {
  return (attr && COLOR_ATRIBUTO[attr]) || "#6d5ae6";
}

function usarHabilidad(hab: { nombre: string; total: number; atributo: string }) {
  const tirada = tirar2d12(hab.total, hab.nombre, ventajaTirada.value);
  emit("tirar", {
    texto: `usa ${hab.nombre}`,
    tirada,
    color: colorAtributo(hab.atributo),
  });
}

function tirarIniciativa() {
  if (!criatura.value) return;
  const tirada = tirar2d12(
    criatura.value.atributos.iniciativa,
    "Iniciativa",
    ventajaTirada.value,
  );
  emit("tirar", {
    texto: "tira Iniciativa",
    tirada,
    color: COLOR_ATRIBUTO.Agilidad,
  });
}

// --- Técnicas ---
const ETIQUETAS_EJECUCION: Record<TipoEjecucion, string> = {
  accion: "Acción",
  reaccion: "Reacción",
  pasiva: "Pasiva",
  ritual: "Ritual",
};
function etiquetaEjecucion(tipo: TipoEjecucion): string {
  return ETIQUETAS_EJECUCION[tipo] ?? tipo;
}
function claseEjecucion(tipo: TipoEjecucion): string {
  if (tipo === "reaccion") return "fx-tag-reaccion";
  if (tipo === "ritual") return "fx-tag-ritual";
  if (tipo === "pasiva") return "fx-tag-pasiva";
  return "fx-tag-accion";
}
// Solo las acciones y reacciones se pueden "usar" (volcar al chat).
function esUsable(tipo?: string): boolean {
  return tipo === "accion" || tipo === "reaccion";
}
function tieneDano(tecnica: Tecnica): boolean {
  const d = tecnica.dano;
  return d.lacerante > 0 || d.perforante > 0 || d.contundente > 0;
}
// Cadena legible del daño de una técnica ("8 lacerante · 2 contundente").
function textoDano(dano: DanoPorTipo): string {
  const partes: string[] = [];
  if (dano.lacerante > 0) partes.push(`${dano.lacerante} lacerante`);
  if (dano.perforante > 0) partes.push(`${dano.perforante} perforante`);
  if (dano.contundente > 0) partes.push(`${dano.contundente} contundente`);
  return partes.join(" · ");
}

// Usa una técnica: vuelca su descripción al chat. Si hace daño, tira además para
// impactar con 2d12 + Estilo marcial e incluye el daño plano de la técnica.
function usarTecnica(tecnica: Tecnica) {
  if (!criatura.value) return;
  const golpea = tieneDano(tecnica);
  const esReaccion = tecnica.tipoEjecucion === "reaccion";
  emit("tirar", {
    texto: `usa ${tecnica.nombre}`,
    descripcion: tecnica.descripcion || undefined,
    tipoEjecucion: tecnica.tipoEjecucion,
    tirada: golpea
      ? tirar2d12(criatura.value.estiloMarcial, "Estilo marcial", ventajaTirada.value)
      : undefined,
    dano: golpea ? textoDano(tecnica.dano) : undefined,
    danoColor: golpea ? "#d8365f" : undefined,
    color: esReaccion ? "#cc7d10" : golpea ? "#d8365f" : "#4f46e5",
  });
}

// --- Selección de ataque: igual que las armas del personaje, se elige la
// técnica y uno de sus 3 tipos de daño antes de confirmar con "Atacar". ---
type TipoDanoTecnica = "lacerante" | "perforante" | "contundente";
const tecnicaSeleccionadaId = ref<number | null>(null);
const tipoDanoSeleccionado = ref<TipoDanoTecnica | null>(null);

function seleccionarTecnica(i: number) {
  if (tecnicaSeleccionadaId.value !== i) {
    tecnicaSeleccionadaId.value = i;
    tipoDanoSeleccionado.value = null;
  }
}

function seleccionarDanoTecnica(i: number, tipo: TipoDanoTecnica) {
  tecnicaSeleccionadaId.value = i;
  tipoDanoSeleccionado.value = tipo;
}

const tecnicasConDano = computed(() => tecnicas.value.filter(tieneDano));

const tecnicaSeleccionada = computed(() =>
  tecnicaSeleccionadaId.value !== null
    ? (tecnicas.value[tecnicaSeleccionadaId.value] ?? null)
    : null,
);

const puedeAtacarTecnica = computed(
  () => !!tecnicaSeleccionada.value && !!tipoDanoSeleccionado.value,
);

const ETIQUETA_DANO_TECNICA: Record<TipoDanoTecnica, string> = {
  lacerante: "lacerante",
  perforante: "perforante",
  contundente: "contundente",
};
const COLOR_DANO_TECNICA: Record<TipoDanoTecnica, string> = {
  lacerante: "#d8365f",
  perforante: "#2f7fd8",
  contundente: "#cc7d10",
};

// Ataque con técnica: tira 2d12 + Estilo marcial para impactar y aplica el
// daño plano del tipo elegido, usando el rango/multiplicador de crítico
// propios de la técnica.
function confirmarAtaqueTecnica() {
  if (
    !criatura.value ||
    !tecnicaSeleccionada.value ||
    !tipoDanoSeleccionado.value
  )
    return;
  const tecnica = tecnicaSeleccionada.value;
  const tipo = tipoDanoSeleccionado.value;
  const valor = tecnica.dano[tipo];
  const tirada = tirar2d12(
    criatura.value.estiloMarcial,
    "Estilo marcial",
    ventajaTirada.value,
  );
  emit("tirar", {
    texto: `ataca con ${tecnica.nombre}`,
    tirada,
    dano: `${valor} ${ETIQUETA_DANO_TECNICA[tipo]}`,
    danoColor: COLOR_DANO_TECNICA[tipo],
    color: COLOR_DANO_TECNICA[tipo],
  });
}
</script>

<style scoped>
.ficha-root {
  --surface: #ffffff;
  --surface-2: #f5f6f9;
  --surface-3: #eef0f4;
  --border: #e5e7eb;
  --border-2: #eceef2;
  --border-strong: #cbd0da;
  --ink: #14161f;
  --ink-2: #363a47;
  --muted: #6b7080;
  --faint: #9297a4;
  --accent: #4f46e5;
  --accent-soft: #edeefe;

  --cu: #d81f4a;
  --cu-soft: #fdedf1;
  --ag: #0e9488;
  --ag-soft: #e6f5f2;
  --me: #6d5ae6;
  --me-soft: #efedfe;

  --lac: #d8365f;
  --pen: #2f7fd8;
  --con: #cc7d10;
  --hp: #d8365f;

  padding: 16px;
  background: var(--surface-3);
  min-height: 100%;
}

.tnum {
  font-variant-numeric: tabular-nums;
}

/* ---------- Panel base ---------- */
.fx-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(20, 22, 31, 0.04),
    0 10px 30px -20px rgba(20, 22, 31, 0.25);
  overflow: hidden;
}
.fx-tabpad {
  padding: 20px;
}
.fx-phead,
.fx-sect {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}
.fx-grow {
  flex: 1;
}
.fx-toggle {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  letter-spacing: 0;
  text-transform: none;
}
.fx-toggle:hover {
  text-decoration: underline;
}
.fx-empty {
  padding: 16px 14px;
  font-size: 12.5px;
  color: var(--faint);
  font-style: italic;
}
.fx-rpad {
  padding: 2px 14px 6px;
}

/* ---------- Fila 1: identidad + HP ---------- */
.fx-row1 {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}
.fx-ident {
  display: flex;
  gap: 16px;
  padding: 16px;
  align-items: center;
}
.fx-portrait {
  width: 74px;
  height: 74px;
  border-radius: 14px;
  flex-shrink: 0;
  background: linear-gradient(140deg, var(--cu), var(--me));
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1px;
  box-shadow: 0 8px 18px -8px color-mix(in srgb, var(--cu) 55%, transparent);
}
.fx-ident-info {
  min-width: 0;
}
.fx-ident-info h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.4px;
}
.fx-role {
  font-size: 13px;
  color: var(--muted);
  margin-top: 2px;
  font-weight: 600;
  text-transform: capitalize;
}
.fx-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 9px;
}
.fx-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  color: var(--muted);
  background: var(--surface-2);
}
.fx-ident-stats {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.fx-mini {
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 8px 14px;
  text-align: center;
  min-width: 92px;
  background: var(--surface);
  font: inherit;
}
.fx-mini-l {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--faint);
}
.fx-mini-v {
  display: block;
  font-size: 20px;
  font-weight: 800;
  color: var(--accent);
  line-height: 1.2;
}
.fx-mini-click {
  cursor: pointer;
  transition: background 0.12s ease, box-shadow 0.12s ease, transform 0.08s ease;
}
.fx-mini-click:hover {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1px var(--accent);
}
.fx-mini-click:active {
  transform: translateY(1px);
}

/* HP */
.fx-hpwrap {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.fx-hpmain {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.fx-hpbox {
  text-align: center;
}
.fx-hp-cap {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 4px;
}
.fx-hp-field {
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 10px 6px;
  background: var(--surface-2);
  font-size: 28px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1;
}
.fx-hpbox.cur .fx-hp-field {
  color: var(--hp);
  border-color: color-mix(in srgb, var(--hp) 45%, var(--border));
  background: color-mix(in srgb, var(--hp) 6%, var(--surface));
}
.fx-hpbar {
  height: 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--muted) 16%, transparent);
  overflow: hidden;
}
.fx-hpbar > span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #e0a41c, var(--hp));
}
.fx-gear {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  cursor: pointer;
}
.fx-gear svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
  transition: transform 0.25s ease;
}
.fx-gear:hover {
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 30%, var(--border));
}
.fx-gear:hover svg {
  transform: rotate(45deg);
}
.fx-gear.on {
  color: var(--accent);
  background: var(--accent-soft);
  border-color: color-mix(in srgb, var(--accent) 30%, var(--border));
}
.fx-hpedit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 8px 0 2px;
}
.fx-hpedit-l {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--faint);
}
.fx-hpinput {
  width: 54px;
  height: 26px;
  padding: 0 6px;
  border: 1px solid var(--border-strong);
  border-radius: 6px;
  background: var(--surface);
  color: #16a34a;
  font-size: 15px;
  font-weight: 800;
  text-align: center;
}
.fx-hpinput:focus {
  outline: none;
  border-color: color-mix(in srgb, #16a34a 55%, var(--border-strong));
  box-shadow: 0 0 0 2px color-mix(in srgb, #16a34a 22%, transparent);
}

/* ---------- Fila 2: atributos + armadura/velocidad ---------- */
.fx-row2 {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}
.fx-attrs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.fx-attrs > * + * {
  border-left: 1px solid var(--border);
}
.fx-attr {
  padding: 13px 12px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.fx-attr-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
}
.fx-attr-name {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--c);
}
.fx-hex {
  position: relative;
  width: 58px;
  height: 66px;
  display: grid;
  place-items: center;
}
.fx-hex::before,
.fx-hex::after {
  content: "";
  position: absolute;
  inset: 0;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
.fx-hex::before {
  background: color-mix(in srgb, var(--c) 42%, var(--border));
}
.fx-hex::after {
  inset: 2px;
  background: color-mix(in srgb, var(--c) 9%, var(--surface));
}
.fx-hex span {
  position: relative;
  z-index: 1;
  font-size: 26px;
  font-weight: 800;
  color: var(--c);
  line-height: 1;
}
.fx-attr-rows {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.fx-arow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12.5px;
  padding: 3px 5px;
  border-radius: 6px;
}
.fx-arow span {
  color: var(--muted);
}
.fx-arow b {
  font-weight: 800;
  color: var(--ink);
}
.fx-arow:nth-child(odd) {
  background: var(--surface-2);
}

/* Armadura + velocidad */
.fx-row2 > .fx-panel {
  display: flex;
  flex-direction: column;
}
.fx-acspeed {
  flex: 1;
  display: grid;
  grid-template-columns: 1.7fr 1fr;
}
.fx-acspeed > .fx-sp {
  border-left: 1px solid var(--border);
}
.fx-ac {
  padding: 13px 14px;
}
.fx-ac-lbl {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 11px;
}
.fx-shields {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.fx-sh {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.fx-sh-cap {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.fx-sh-fig {
  position: relative;
  width: 52px;
  height: 58px;
  display: grid;
  place-items: center;
}
.fx-sh-fig::before,
.fx-sh-fig::after {
  content: "";
  position: absolute;
  inset: 0;
  clip-path: polygon(50% 0%, 100% 22%, 100% 66%, 50% 100%, 0% 66%, 0% 22%);
}
.fx-sh-fig span {
  position: relative;
  z-index: 1;
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1;
}
.fx-sh.l .fx-sh-cap {
  color: var(--lac);
}
.fx-sh.l .fx-sh-fig::before {
  background: color-mix(in srgb, var(--lac) 42%, var(--border));
}
.fx-sh.l .fx-sh-fig::after {
  inset: 2px;
  background: color-mix(in srgb, var(--lac) 9%, var(--surface));
}
.fx-sh.p .fx-sh-cap {
  color: var(--pen);
}
.fx-sh.p .fx-sh-fig::before {
  background: color-mix(in srgb, var(--pen) 42%, var(--border));
}
.fx-sh.p .fx-sh-fig::after {
  inset: 2px;
  background: color-mix(in srgb, var(--pen) 9%, var(--surface));
}
.fx-sh.c .fx-sh-cap {
  color: var(--con);
}
.fx-sh.c .fx-sh-fig::before {
  background: color-mix(in srgb, var(--con) 42%, var(--border));
}
.fx-sh.c .fx-sh-fig::after {
  inset: 2px;
  background: color-mix(in srgb, var(--con) 9%, var(--surface));
}
.fx-sp {
  padding: 13px 14px;
  display: flex;
  flex-direction: column;
}
.fx-sp-val {
  font-size: 30px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1;
}
.fx-sp-val small {
  font-size: 14px;
  color: var(--muted);
  font-weight: 600;
}

/* ---------- Fila 3 ---------- */
.fx-row3 {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 14px;
  align-items: start;
}
.fx-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Habilidades */
.fx-skills {
  max-height: 560px;
  overflow-y: auto;
}
.fx-skill {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 12px;
  border-bottom: 1px solid var(--border-2);
}
.fx-skill:last-child {
  border-bottom: none;
}
.fx-prof {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid var(--border-strong);
  background: var(--surface);
}
.fx-prof.on {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: inset 0 0 0 2px var(--surface);
}
.fx-atag {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--muted);
  background: var(--surface-3);
  border-radius: 4px;
  padding: 2px 4px;
  width: 28px;
  text-align: center;
  flex-shrink: 0;
}
.fx-atag.cu {
  color: var(--cu);
  background: var(--cu-soft);
}
.fx-atag.ag {
  color: var(--ag);
  background: var(--ag-soft);
}
.fx-atag.me {
  color: var(--me);
  background: var(--me-soft);
}
.fx-sname {
  font-size: 12.5px;
  color: var(--ink-2);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fx-skill.comp .fx-sname {
  color: var(--ink);
  font-weight: 600;
}
.fx-skill.dim {
  opacity: 0.62;
}
.fx-sval {
  margin-left: auto;
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
  min-width: 30px;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1px 0;
  background: var(--surface-2);
  flex-shrink: 0;
}
.fx-skill.comp .fx-sval {
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 30%, var(--border));
}
.fx-usable {
  cursor: pointer;
}
.fx-skill.fx-usable:hover {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1px var(--accent);
  border-radius: 8px;
}

/* Técnicas (expandibles, como las activas del personaje) */
.fx-exp {
  border-bottom: 1px solid var(--border-2);
}
.fx-exp:last-child {
  border-bottom: none;
}
.fx-exp-h {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 2px;
  background: none;
  border: none;
  text-align: left;
  color: inherit;
}
.fx-exp-n {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
}
.fx-tags {
  display: inline-flex;
  gap: 4px;
  margin-left: auto;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.fx-tag {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 5px;
  padding: 2px 5px;
  border: 1px solid var(--border);
  white-space: nowrap;
}
.fx-tag-accion {
  color: var(--accent);
  background: var(--accent-soft);
  border-color: color-mix(in srgb, var(--accent) 25%, var(--border));
}
.fx-tag-pasiva {
  color: var(--muted);
  background: var(--surface-2);
}
.fx-tag-reaccion {
  color: #b45309;
  background: #fef3c7;
  border-color: #fcd9a5;
}
.fx-tag-ritual {
  color: #7c3aed;
  background: #f3e8ff;
  border-color: #e0c8fb;
}
.fx-tag-tipo,
.fx-tag-acc {
  color: var(--muted);
  background: var(--surface-2);
}
.fx-use-btn {
  margin-left: 6px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: var(--accent);
  border-radius: 6px;
  cursor: pointer;
  line-height: 1.4;
}
.fx-use-btn:hover {
  filter: brightness(1.08);
}
.fx-chev {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  fill: none;
  stroke: var(--faint);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.18s ease;
}
.fx-exp.open .fx-chev {
  transform: rotate(180deg);
}
.fx-exp-b {
  padding: 0 2px 11px;
}
.fx-exp-d {
  margin: 4px 0 8px;
  font-size: 12px;
  color: var(--muted);
  line-height: 1.5;
}
.fx-exp-meta {
  margin: 0 0 3px;
  font-size: 11.5px;
  color: var(--muted);
}
.fx-exp-meta-l {
  font-weight: 700;
  color: var(--ink-2);
}
.fx-dmgcell {
  display: flex;
  gap: 6px;
}
.fx-dchip {
  min-width: 46px;
  text-align: center;
  font-size: 11.5px;
  font-weight: 800;
  border-radius: 6px;
  padding: 3px 8px;
}
.fx-dchip.l {
  color: var(--lac);
  background: color-mix(in srgb, var(--lac) 10%, var(--surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--lac) 25%, var(--border));
}
.fx-dchip.p {
  color: var(--pen);
  background: color-mix(in srgb, var(--pen) 10%, var(--surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--pen) 25%, var(--border));
}
.fx-dchip.c {
  color: var(--con);
  background: color-mix(in srgb, var(--con) 10%, var(--surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--con) 25%, var(--border));
}

/* Técnica seleccionada para atacar (persistente, no solo hover). */
.fx-exp-h.fx-sel,
.fx-exp-h.fx-sel:hover {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1.5px var(--accent);
  border-radius: 8px;
}
.fx-exp-h.fx-usable:hover .fx-exp-n {
  color: var(--accent);
}
.fx-exp-toggle {
  flex-shrink: 0;
  display: inline-flex;
  border: none;
  background: none;
  padding: 2px;
  cursor: pointer;
}

/* Alcance / crítico / daño de una técnica de ataque (siempre visibles). */
.fx-tec-atk {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 2px 8px;
  flex-wrap: wrap;
}
.fx-tec-stat {
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
  white-space: nowrap;
}

/* Chips de daño seleccionables y su estado activo. */
.fx-dchip.fx-dpick {
  cursor: pointer;
}
.fx-dchip.fx-dpick:hover {
  filter: brightness(1.12);
}
.fx-dchip.l.fx-dsel {
  color: #fff;
  background: var(--lac);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--lac) 55%, transparent);
}
.fx-dchip.p.fx-dsel {
  color: #fff;
  background: var(--pen);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--pen) 55%, transparent);
}
.fx-dchip.c.fx-dsel {
  color: #fff;
  background: var(--con);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--con) 55%, transparent);
}

/* Botón de ataque */
.fx-attack-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--accent) 90%, #fff),
    var(--accent)
  );
  border: 1px solid color-mix(in srgb, var(--accent) 70%, #000);
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--accent) 60%, transparent);
  transition: filter 0.15s ease, transform 0.1s ease;
}
.fx-attack-btn svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
.fx-attack-btn:hover:not(:disabled) {
  filter: brightness(1.08);
}
.fx-attack-btn:active:not(:disabled) {
  transform: translateY(1px);
}
.fx-attack-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

/* Ventaja / Desventaja */
.fx-adv {
  --tint: var(--border-strong);
  display: flex;
  align-items: stretch;
  gap: 6px;
  padding: 4px;
  border-radius: 10px;
  background: var(--surface-2);
  border: 1px solid var(--tint);
  transition: border-color 0.15s ease;
}
.fx-adv.adv {
  --tint: #0e9488;
}
.fx-adv.dis {
  --tint: #d81f4a;
}
.fx-adv-b {
  width: 40px;
  border: none;
  border-radius: 7px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--border-strong);
  font-size: 18px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  color: var(--muted);
  transition: background 0.12s ease, color 0.12s ease;
}
.fx-adv-b.adv:hover {
  background: #0e9488;
  color: #fff;
}
.fx-adv-b.dis:hover {
  background: #d81f4a;
  color: #fff;
}
.fx-adv-lbl {
  flex: 1;
  border: none;
  border-radius: 7px;
  background: transparent;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  cursor: pointer;
  color: var(--muted);
}
.fx-adv.adv .fx-adv-lbl {
  color: #0e9488;
}
.fx-adv.dis .fx-adv-lbl {
  color: #d81f4a;
}

@media (max-width: 720px) {
  .fx-row1,
  .fx-row2,
  .fx-row3 {
    grid-template-columns: 1fr;
  }
}
</style>
