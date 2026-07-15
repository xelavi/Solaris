<template>
  <div class="cx-root">
    <ControlZoom
      :zoom="zoom"
      @reducir="reducir"
      @aumentar="aumentar"
      @restablecer="restablecer"
    />
    <div class="mx-auto" :style="{ width: '1100px', zoom }">
      <!-- Barra superior -->
      <div class="cx-topbar">
        <button @click="volver" class="cx-back">← Volver al bestiario</button>
        <button @click="editar" class="cx-edit">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-8.5 8.5a1 1 0 0 1-.44.26l-3 .857a.5.5 0 0 1-.617-.618l.857-3a1 1 0 0 1 .26-.439l8.5-8.5Z" />
          </svg>
          Editar
        </button>
      </div>

      <div v-if="!criatura" class="cx-panel cx-tabpad">
        <p class="cx-empty">Cargando criatura...</p>
      </div>

      <template v-else>
        <!-- Fila 1: identidad + puntos de vida -->
        <div class="cx-row1">
          <div class="cx-panel cx-ident">
            <div class="cx-portrait">
              {{ (criatura.nombre || "?").charAt(0).toUpperCase() }}
            </div>
            <div class="cx-ident-info">
              <h1>{{ criatura.nombre || "Sin nombre" }}</h1>
              <div v-if="criatura.estiloMarcial.nombre" class="cx-role">
                {{ criatura.estiloMarcial.nombre }}
              </div>
              <div class="cx-chips">
                <span
                  v-for="etiqueta in criatura.etiquetas"
                  :key="etiqueta"
                  :class="['badge', clasesEtiqueta(etiqueta, catalogoEtiquetas)]"
                >
                  {{ etiqueta }}
                </span>
                <span v-if="!criatura.etiquetas.length" class="cx-chip">Criatura</span>
              </div>
            </div>
            <div class="cx-ident-stats">
              <div class="cx-mini">
                <span class="cx-mini-l">Dificultad</span>
                <span class="cx-mini-v tnum">{{ criatura.dificultad }}</span>
              </div>
              <div class="cx-mini">
                <span class="cx-mini-l">Experiencia</span>
                <span class="cx-mini-v tnum">{{ criatura.experiencia }}</span>
              </div>
            </div>
          </div>

          <div class="cx-panel">
            <div class="cx-phead"><span class="cx-grow">Puntos de vida</span></div>
            <div class="cx-hpwrap">
              <div class="cx-hpmain">
                <div class="cx-hpbox cur">
                  <div class="cx-hp-cap">Vida</div>
                  <div class="cx-hp-field tnum">{{ criatura.atributos.hp }}</div>
                </div>
                <div class="cx-hpbox">
                  <div class="cx-hp-cap">Regeneración</div>
                  <div class="cx-hp-field tnum">+{{ criatura.atributos.regeneracion }}</div>
                </div>
              </div>
              <div class="cx-hpbar"><span :style="{ width: '100%' }"></span></div>
            </div>
          </div>
        </div>

        <!-- Descripción -->
        <div v-if="criatura.descripcion" class="cx-panel cx-desc-panel">
          <p class="cx-desc">{{ criatura.descripcion }}</p>
        </div>

        <!-- Fila 2: atributos + armadura -->
        <div class="cx-row2">
          <div class="cx-panel">
            <div class="cx-phead"><span class="cx-grow">Atributos</span></div>
            <div class="cx-attrs">
              <div class="cx-attr" style="--c: var(--cu)">
                <div class="cx-attr-top">
                  <span class="cx-attr-name">Cuerpo</span>
                  <div class="cx-hex"><span class="tnum">{{ criatura.atributos.cuerpo }}</span></div>
                </div>
                <div class="cx-attr-rows">
                  <div class="cx-arow"><span>Poderío</span><b class="tnum">{{ criatura.atributos.poderio }}</b></div>
                  <div class="cx-arow"><span>Movimiento</span><b class="tnum">{{ criatura.atributos.movimiento }}</b></div>
                  <div class="cx-arow"><span>Resistencia</span><b class="tnum">{{ criatura.atributos.resistencia }}</b></div>
                </div>
              </div>

              <div class="cx-attr" style="--c: var(--ag)">
                <div class="cx-attr-top">
                  <span class="cx-attr-name">Agilidad</span>
                  <div class="cx-hex"><span class="tnum">{{ criatura.atributos.agilidad }}</span></div>
                </div>
                <div class="cx-attr-rows">
                  <div class="cx-arow"><span>Esquiva</span><b class="tnum">{{ criatura.atributos.evasion }}</b></div>
                  <div class="cx-arow"><span>Iniciativa</span><b class="tnum">{{ formatoMod(criatura.atributos.iniciativa) }}</b></div>
                  <div class="cx-arow"><span>Puntería</span><b class="tnum">{{ criatura.atributos.punteria }}</b></div>
                </div>
              </div>

              <div class="cx-attr" style="--c: var(--me)">
                <div class="cx-attr-top">
                  <span class="cx-attr-name">Mente</span>
                  <div class="cx-hex"><span class="tnum">{{ criatura.atributos.mente }}</span></div>
                </div>
                <div class="cx-attr-rows">
                  <div class="cx-arow"><span>Regeneración</span><b class="tnum">{{ criatura.atributos.regeneracion }}</b></div>
                  <div class="cx-arow"><span>Voluntad</span><b class="tnum">{{ criatura.atributos.voluntad }}</b></div>
                  <div class="cx-arow"><span>Acciones</span><b class="tnum">{{ criatura.atributos.acciones }}</b></div>
                  <div class="cx-arow"><span>Reacciones</span><b class="tnum">{{ criatura.atributos.reacciones }}</b></div>
                </div>
              </div>
            </div>
          </div>

          <div class="cx-panel">
            <div class="cx-phead"><span class="cx-grow">Armadura</span></div>
            <div class="cx-ac">
              <div class="cx-shields">
                <div
                  v-for="tipo in tiposEscudoVisibles"
                  :key="tipo.key"
                  class="cx-sh"
                  :style="{ '--dc': tipo.color }"
                >
                  <span class="cx-sh-cap">{{ tipo.abbr }}</span>
                  <div class="cx-sh-fig">
                    <span class="tnum">{{ criatura.armadura[tipo.key] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Habilidades -->
        <div class="cx-panel cx-desc-panel-gap">
          <div class="cx-phead"><span class="cx-grow">Habilidades</span></div>
          <div v-if="!habilidadesConRango.length" class="cx-empty">
            Sin habilidades con rangos asignados.
          </div>
          <div v-else class="cx-skills">
            <div v-for="hab in habilidadesConRango" :key="hab.id" class="cx-skill">
              <span class="cx-sname">{{ hab.nombre }}</span>
              <span class="cx-srangos tnum">{{ hab.rangos }} rangos</span>
              <span class="cx-sval tnum">{{ formatoMod(hab.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Técnicas -->
        <div class="cx-panel">
          <div class="cx-phead"><span class="cx-grow">Técnicas</span></div>
          <div v-if="!criatura.tecnicas.length" class="cx-empty">Sin técnicas.</div>
          <div v-else class="cx-tecs">
            <div
              v-for="(tecnica, i) in criatura.tecnicas"
              :key="i"
              class="cx-tec"
            >
              <div class="cx-tec-head">
                <span class="cx-tec-n">{{ tecnica.nombre }}</span>
                <span class="cx-tags">
                  <span :class="['cx-tag', claseEjecucion(tecnica.tipoEjecucion)]">{{
                    etiquetaEjecucion(tecnica.tipoEjecucion)
                  }}</span>
                  <span
                    v-if="tecnica.tipoEjecucion === 'accion'"
                    class="cx-tag cx-tag-acc"
                    >{{ tecnica.acciones }} acc.</span
                  >
                  <span v-if="tecnica.tipoAccion" class="cx-tag cx-tag-tipo">{{
                    tecnica.tipoAccion === "mental" ? "Mental" : "Física"
                  }}</span>
                </span>
              </div>
              <p v-if="tecnica.requisito" class="cx-tec-meta">
                <span class="cx-tec-meta-l">Requisito:</span> {{ tecnica.requisito }}
              </p>
              <p v-if="tecnica.usable_si" class="cx-tec-meta">
                <span class="cx-tec-meta-l">Usable si:</span> {{ tecnica.usable_si }}
              </p>
              <p v-if="tecnica.descripcion" class="cx-tec-d"><DescripcionConEstados :texto="tecnica.descripcion" /></p>
              <div class="cx-tec-stats">
                <span class="cx-tec-stat">Alcance: {{ tecnica.alcance > 0 ? tecnica.alcance + " ecsas" : "Cuerpo a cuerpo" }}</span>
                <span class="cx-tec-stat">Crítico: ×{{ tecnica.multiplicadorCritico }} · {{ tecnica.rangoCritico }}-24</span>
              </div>
              <div v-if="tieneDano(tecnica)" class="cx-dmgcell">
                <span
                  v-for="tipo in danoActivo(tecnica)"
                  :key="tipo.key"
                  class="cx-dchip tnum"
                  :style="{ '--dc': tipo.color }"
                  >{{ tipo.abbr }} {{ tipo.valor }}</span
                >
              </div>
              <div v-if="tecnica.estadosAplicados.length" class="cx-tec-estados">
                <span
                  v-for="(ea, ei) in tecnica.estadosAplicados"
                  :key="ei"
                  class="cx-tag cx-tag-estado"
                  >{{ nombreEstado(ea.estadoId) }} (Dif. {{ ea.dificultad }})</span
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from "vue";
import type {
  CriaturaData,
  DanoPorTipo,
  Tecnica,
  TipoEjecucion,
} from "../../domain/Criatura";
import { obtenerEstado } from "../../domain/EstadosAlterados";
import {
  cargarCatalogoEtiquetas,
  clasesEtiqueta,
  type Etiqueta,
} from "../../domain/Etiquetas";
import {
  obtenerCriatura,
  editarCriaturaExistente,
} from "../../domain/storage/criaturasRepo";
import { useZoomFicha } from "../../domain/useZoomFicha";
import ControlZoom from "../ControlZoom.vue";
import DescripcionConEstados from "../DescripcionConEstados.vue";
import habilidadesData from "../../assets/habilidades.json";

// Zoom ajustable por el usuario (persistido).
const { zoom, aumentar, reducir, restablecer } = useZoomFicha("criatura", 1100);

const catalogoEtiquetas = ref<Etiqueta[]>([]);

const props = defineProps<{
  criaturaId?: string;
}>();

const criatura = ref<CriaturaData | null>(null);

const navigateToBestiario = inject<() => void>("navigateToBestiario");
const navigateToCrearCriatura = inject<() => void>("navigateToCrearCriatura");

function volver() {
  if (navigateToBestiario) navigateToBestiario();
}

function editar() {
  if (!props.criaturaId) return;
  editarCriaturaExistente(props.criaturaId);
  navigateToCrearCriatura?.();
}

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
  if (tipo === "reaccion") return "cx-tag-reaccion";
  if (tipo === "ritual") return "cx-tag-ritual";
  if (tipo === "pasiva") return "cx-tag-pasiva";
  return "cx-tag-accion";
}

// Formatea un modificador con su signo (+3 / −2 / 0).
function formatoMod(valor: number): string {
  if (valor > 0) return `+${valor}`;
  if (valor < 0) return `−${Math.abs(valor)}`;
  return "0";
}

// Tipos de daño compartidos por armadura y técnicas, con abreviatura y color.
const TIPOS_DANO: Array<{ key: keyof DanoPorTipo; abbr: string; color: string }> = [
  { key: "lacerante", abbr: "L", color: "var(--lac)" },
  { key: "perforante", abbr: "P", color: "var(--pen)" },
  { key: "contundente", abbr: "C", color: "var(--con)" },
  { key: "pyro", abbr: "Py", color: "#e8590c" },
  { key: "cryo", abbr: "Cr", color: "#1098ad" },
  { key: "acido", abbr: "Ac", color: "#66a80f" },
  { key: "luz", abbr: "Lu", color: "#f08c00" },
  { key: "oscuridad", abbr: "Os", color: "#495057" },
  { key: "radiacion", abbr: "Ra", color: "#94d82d" },
  { key: "espiral", abbr: "Es", color: "#9c36b5" },
];

const TIPOS_DANO_PRINCIPALES = new Set(["lacerante", "perforante", "contundente"]);

// Escudos principales siempre visibles; el resto solo si tienen valor > 0.
const tiposEscudoVisibles = computed(() =>
  TIPOS_DANO.filter(
    (tipo) => TIPOS_DANO_PRINCIPALES.has(tipo.key) || (criatura.value?.armadura[tipo.key] ?? 0) > 0,
  ),
);

function tieneDano(tecnica: Tecnica): boolean {
  return TIPOS_DANO.some((tipo) => tecnica.dano[tipo.key] > 0);
}

function danoActivo(tecnica: Tecnica) {
  return TIPOS_DANO.filter((tipo) => tecnica.dano[tipo.key] > 0).map((tipo) => ({
    ...tipo,
    valor: tecnica.dano[tipo.key],
  }));
}

function nombreEstado(estadoId: number): string {
  return obtenerEstado(estadoId)?.nombre ?? "Estado desconocido";
}

// --- Habilidades ---
function modAtributoHabilidad(atributo: string): number {
  const a = criatura.value?.atributos;
  if (!a) return 0;
  if (atributo === "Cuerpo") return a.cuerpo;
  if (atributo === "Agilidad") return a.agilidad;
  return a.mente; // Mente / Artesanía / Recolección
}

const habilidadesConRango = computed(() => {
  if (!criatura.value) return [];
  return criatura.value.habilidades
    .filter((h) => h.rangos > 0)
    .map((h) => {
      const info = habilidadesData.habilidades.find((x) => x.id === h.id);
      const atributo = info?.atributo ?? "Mente";
      return {
        id: h.id,
        nombre: info?.nombre ?? "Habilidad desconocida",
        rangos: h.rangos,
        total: modAtributoHabilidad(atributo) + h.rangos,
      };
    })
    .sort((a, b) => b.total - a.total);
});

async function cargarCriatura() {
  if (!props.criaturaId) {
    console.warn("No se proporcionó ID de criatura.");
    return;
  }
  criatura.value = await obtenerCriatura(props.criaturaId);
  if (!criatura.value) {
    console.warn(`No se encontró criatura con ID: ${props.criaturaId}`);
  }
}

onMounted(async () => {
  catalogoEtiquetas.value = await cargarCatalogoEtiquetas();
  await cargarCriatura();
});
</script>

<style scoped>
.cx-root {
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
  --ag: #0e9488;
  --me: #6d5ae6;

  --lac: #d8365f;
  --pen: #2f7fd8;
  --con: #cc7d10;
  --hp: #d8365f;

  padding: 20px;
}

.tnum {
  font-variant-numeric: tabular-nums;
}

/* ---------- Barra superior ---------- */
.cx-topbar {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}
.cx-back {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 2px;
}
.cx-back:hover {
  color: var(--ink);
}
.cx-edit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: var(--accent);
  border: none;
  border-radius: 9px;
  padding: 8px 14px;
  cursor: pointer;
}
.cx-edit svg {
  width: 15px;
  height: 15px;
}
.cx-edit:hover {
  filter: brightness(1.05);
}

/* ---------- Panel base ---------- */
.cx-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(20, 22, 31, 0.04),
    0 10px 30px -20px rgba(20, 22, 31, 0.25);
  overflow: hidden;
}
.cx-tabpad {
  padding: 20px;
}
.cx-phead {
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
.cx-grow {
  flex: 1;
}
.cx-empty {
  padding: 16px 14px;
  font-size: 12.5px;
  color: var(--faint);
  font-style: italic;
}

/* ---------- Fila 1: identidad + HP ---------- */
.cx-row1 {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}
.cx-ident {
  display: flex;
  gap: 16px;
  padding: 16px;
  align-items: center;
}
.cx-portrait {
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
.cx-ident-info {
  min-width: 0;
}
.cx-ident-info h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.4px;
}
.cx-role {
  margin-top: 3px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--muted);
}
.cx-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 9px;
}
.cx-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  color: var(--muted);
  background: var(--surface-2);
}
.cx-ident-stats {
  margin-left: auto;
  display: flex;
  gap: 8px;
}
.cx-mini {
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 8px 14px;
  text-align: center;
  min-width: 82px;
  background: var(--surface);
}
.cx-mini-l {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--faint);
}
.cx-mini-v {
  display: block;
  font-size: 20px;
  font-weight: 800;
  color: var(--accent);
  line-height: 1.2;
}

/* HP */
.cx-hpwrap {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cx-hpmain {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.cx-hpbox {
  text-align: center;
}
.cx-hp-cap {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 4px;
}
.cx-hp-field {
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 10px 6px;
  background: var(--surface-2);
  font-size: 28px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1;
}
.cx-hpbox.cur .cx-hp-field {
  color: var(--hp);
  border-color: color-mix(in srgb, var(--hp) 45%, var(--border));
  background: color-mix(in srgb, var(--hp) 6%, var(--surface));
}
.cx-hpbar {
  height: 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--muted) 16%, transparent);
  overflow: hidden;
}
.cx-hpbar > span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #e0a41c, var(--hp));
}

/* ---------- Descripción ---------- */
.cx-desc-panel {
  margin-bottom: 14px;
  padding: 13px 15px;
}
.cx-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: var(--muted);
  font-style: italic;
}

/* ---------- Fila 2: atributos + armadura ---------- */
.cx-row2 {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}
.cx-attrs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.cx-attrs > * + * {
  border-left: 1px solid var(--border);
}
.cx-attr {
  padding: 13px 12px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.cx-attr-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
}
.cx-attr-name {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--c);
}
.cx-hex {
  position: relative;
  width: 58px;
  height: 66px;
  display: grid;
  place-items: center;
}
.cx-hex::before,
.cx-hex::after {
  content: "";
  position: absolute;
  inset: 0;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
.cx-hex::before {
  background: color-mix(in srgb, var(--c) 42%, var(--border));
}
.cx-hex::after {
  inset: 2px;
  background: color-mix(in srgb, var(--c) 9%, var(--surface));
}
.cx-hex span {
  position: relative;
  z-index: 1;
  font-size: 26px;
  font-weight: 800;
  color: var(--c);
  line-height: 1;
}
.cx-attr-rows {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.cx-arow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12.5px;
  padding: 3px 5px;
  border-radius: 6px;
}
.cx-arow span {
  color: var(--muted);
}
.cx-arow b {
  font-weight: 800;
  color: var(--ink);
}
.cx-arow:nth-child(odd) {
  background: var(--surface-2);
}

/* Armadura */
.cx-ac {
  padding: 20px 14px;
  display: flex;
  justify-content: center;
}
.cx-shields {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 8px;
  justify-content: center;
}
.cx-sh {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.cx-sh-cap {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.cx-sh-fig {
  position: relative;
  width: 58px;
  height: 64px;
  display: grid;
  place-items: center;
}
.cx-sh-fig::before,
.cx-sh-fig::after {
  content: "";
  position: absolute;
  inset: 0;
  clip-path: polygon(50% 0%, 100% 22%, 100% 66%, 50% 100%, 0% 66%, 0% 22%);
}
.cx-sh-fig span {
  position: relative;
  z-index: 1;
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1;
}
.cx-sh .cx-sh-cap {
  color: var(--dc);
}
.cx-sh .cx-sh-fig::before {
  background: color-mix(in srgb, var(--dc) 42%, var(--border));
}
.cx-sh .cx-sh-fig::after {
  inset: 2px;
  background: color-mix(in srgb, var(--dc) 9%, var(--surface));
}

/* ---------- Habilidades ---------- */
.cx-desc-panel-gap {
  margin-bottom: 14px;
}
.cx-skills {
  padding: 4px 12px;
}
.cx-skill {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 2px;
  border-bottom: 1px solid var(--border-2);
}
.cx-skill:last-child {
  border-bottom: none;
}
.cx-sname {
  font-size: 12.5px;
  color: var(--ink-2);
  font-weight: 600;
}
.cx-srangos {
  margin-left: auto;
  font-size: 11.5px;
  color: var(--muted);
}
.cx-sval {
  font-size: 13px;
  font-weight: 800;
  color: var(--accent);
  min-width: 30px;
  text-align: center;
  border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--border));
  border-radius: 6px;
  padding: 1px 0;
  background: var(--accent-soft);
  flex-shrink: 0;
}

/* ---------- Técnicas ---------- */
.cx-tec-stats {
  display: flex;
  gap: 14px;
  margin: 0 0 8px;
  font-size: 11.5px;
  color: var(--muted);
  font-weight: 600;
}
.cx-tecs {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cx-tec {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 13px;
  background: var(--surface);
}
.cx-tec-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.cx-tec-n {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--ink);
}
.cx-tags {
  display: inline-flex;
  gap: 4px;
  margin-left: auto;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.cx-tag {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 5px;
  padding: 2px 6px;
  border: 1px solid var(--border);
  white-space: nowrap;
}
.cx-tag-accion {
  color: var(--accent);
  background: var(--accent-soft);
  border-color: color-mix(in srgb, var(--accent) 25%, var(--border));
}
.cx-tag-pasiva {
  color: var(--muted);
  background: var(--surface-2);
}
.cx-tag-reaccion {
  color: #b45309;
  background: #fef3c7;
  border-color: #fcd9a5;
}
.cx-tag-ritual {
  color: #7c3aed;
  background: #f3e8ff;
  border-color: #e0c8fb;
}
.cx-tag-tipo,
.cx-tag-acc {
  color: var(--muted);
  background: var(--surface-2);
}
.cx-tec-meta {
  margin: 0 0 2px;
  font-size: 11.5px;
  color: var(--muted);
}
.cx-tec-meta-l {
  font-weight: 700;
  color: var(--ink-2);
}
.cx-tec-d {
  margin: 4px 0 8px;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--muted);
}
.cx-dmgcell {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.cx-dchip {
  flex: 1;
  text-align: center;
  font-size: 11.5px;
  font-weight: 800;
  border-radius: 6px;
  padding: 4px 0;
}
.cx-dchip {
  color: var(--dc);
  background: color-mix(in srgb, var(--dc) 10%, var(--surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--dc) 25%, var(--border));
}
.cx-tec-estados {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}
.cx-tag-estado {
  color: #7c3aed;
  background: #f3e8ff;
  border-color: #e0c8fb;
}

@media (max-width: 720px) {
  .cx-row1,
  .cx-row2 {
    grid-template-columns: 1fr;
  }
}
</style>
