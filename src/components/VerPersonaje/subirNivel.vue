<template>
  <div class="page ed-root">
    <div class="mx-auto w-full max-w-[1200px]">
      <!-- Barra superior: volver + pestañas + confirmar -->
      <div class="ed-topbar">
        <button @click="cancelar" class="ed-back">← Descartar y volver</button>
        <div class="ed-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['ed-tab', { on: currentTab === tab.id }]"
            @click="currentTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
        <button
          @click="confirmar"
          class="ed-save"
          :disabled="!todoCompleto"
          :title="todoCompleto ? '' : 'Completa todos los pasos para confirmar'"
        >
          Confirmar subida
        </button>
      </div>

      <!-- Encabezado con la subida de nivel en vivo -->
      <div class="ed-hero">
        <div class="ed-avatar">
          {{ (characterData.nombre || "?").charAt(0).toUpperCase() }}
        </div>
        <div>
          <div class="ed-hero-name">
            {{ characterData.nombre || "Sin nombre" }}
          </div>
          <div class="ed-hero-sub">
            {{
              [characterData.especialidad, characterData.estilo_marcial]
                .filter(Boolean)
                .join(" · ") || "Subiendo de nivel"
            }}
          </div>
        </div>
        <div class="ed-lvlup">
          Nivel <b>{{ nivelAnterior }}</b> → <b>{{ characterData.nivel }}</b>
        </div>
      </div>

      <!-- Lista de comprobación: hay que completar todos los pasos -->
      <div class="ed-guide">
        <span class="ed-guide-title">
          Completa todos los pasos para confirmar la subida:
        </span>
        <ul class="ed-checklist">
          <li v-for="paso in pasos" :key="paso.label" :class="{ done: paso.ok }">
            <span class="ed-check">{{ paso.ok ? "✓" : "○" }}</span>
            {{ paso.label }}
          </li>
        </ul>
        <span class="ed-guide-note">
          Repartir tus nuevos puntos de habilidad es opcional. Lo que ya tenías
          (dotes, nodos y rangos) queda bloqueado: solo puedes añadir, nunca
          quitar ni reducir.
        </span>
      </div>

      <!-- Los pasos hijos no se montan hasta que la subida de nivel está lista
           (iniciarSubidaNivel es asíncrono): así su onMounted lee el estado ya
           preparado por el padre en vez de una copia a medio cargar. -->
      <template v-if="listo">
        <!-- ============= ESPECIALIDAD ============= -->
        <div v-if="currentTab === 'especialidad'" class="ed-panel ed-tabpad">
          <Especialidad />
        </div>

        <!-- ============= ESTILO MARCIAL ============= -->
        <div v-else-if="currentTab === 'estilo'" class="ed-panel ed-tabpad">
          <EstiloMarcial />
        </div>

        <!-- ============= ÁRBOL ============= -->
        <div v-else-if="currentTab === 'arbol'" class="ed-panel ed-tabpad">
          <Arbol />
        </div>

        <!-- ============= HABILIDADES ============= -->
        <div v-else-if="currentTab === 'habilidades'" class="ed-panel ed-tabpad">
          <Habilidades />
        </div>
      </template>

      <!-- Barra de acciones inferior -->
      <div class="ed-actions">
        <button @click="cancelar" class="ed-btn ed-btn-ghost">
          Descartar subida
        </button>
        <button
          @click="confirmar"
          class="ed-btn ed-btn-primary"
          :disabled="!todoCompleto"
          :title="todoCompleto ? '' : 'Completa todos los pasos para confirmar'"
        >
          Confirmar subida de nivel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import Especialidad from "../CrearPersonaje/especialidad.vue";
import EstiloMarcial from "../CrearPersonaje/estilo_marcial.vue";
import Arbol from "../CrearPersonaje/arbol.vue";
import Habilidades from "../CrearPersonaje/habilidades.vue";
import { useCharacterCreation } from "../../domain/useCharacterCreation";
import { limpiarIdEnCreacion } from "../../domain/storage/personajesRepo";
import trasfondosData from "../../assets/trasfondos/trasfondos.json";

const props = defineProps<{ characterId?: string }>();

const navigateToFicha = inject<(id: string) => void>("navigateToFicha");

const {
  characterData,
  resetCharacterData,
  iniciarSubidaNivel,
  finalizarSubidaNivel,
  cancelarSubidaNivel,
  subidaNivelBase,
} = useCharacterCreation();

const tabs = [
  { id: "especialidad", label: "Especialidad" },
  { id: "estilo", label: "Estilo marcial" },
  { id: "arbol", label: "Árbol" },
  { id: "habilidades", label: "Habilidades" },
] as const;
const currentTab = ref<(typeof tabs)[number]["id"]>("especialidad");

// Nivel del personaje antes de subir (para mostrar la transición).
const nivelAnterior = computed(() => subidaNivelBase.value?.nivel ?? characterData.value.nivel - 1);

// ---- Comprobación de "todos los pasos hechos" ----
// Solo se permite confirmar cuando el jugador ha añadido la dote de
// Especialidad, la de Estilo marcial y los 2 nodos del árbol. Repartir los
// puntos de habilidad es opcional. Cada paso se mide como diferencia respecto a
// la base bloqueada (lo que ya tenía antes de subir).

// Ids de nodos que aporta el trasfondo (no cuentan como nodos "gastados").
const trasfondoNodeIds = computed(() => {
  const t = trasfondosData.trasfondos.find(
    (x) => x.nombre === characterData.value.trasfondo,
  );
  return new Set<number>(t?.atributos ?? []);
});

function contarNodosRegulares(arbolJson?: string): number {
  if (!arbolJson) return 0;
  try {
    const nodos = JSON.parse(arbolJson) as Array<{
      nodeId: number;
      isTrasfondo?: boolean;
    }>;
    return nodos.filter(
      (n) => !n.isTrasfondo && !trasfondoNodeIds.value.has(n.nodeId),
    ).length;
  } catch {
    return 0;
  }
}

// Paso 1: dote de Especialidad añadida.
const doteEspecialidadOk = computed(
  () =>
    (characterData.value.especialidad_dotes?.length ?? 0) >
    (subidaNivelBase.value?.especialidad_dotes?.length ?? 0),
);

// Paso 2: dote de Estilo marcial añadida.
const doteEstiloOk = computed(
  () =>
    (characterData.value.estilo_marcial_dotes?.length ?? 0) >
    (subidaNivelBase.value?.estilo_marcial_dotes?.length ?? 0),
);

// Paso 3: 2 nodos nuevos colocados en el árbol.
const nodosOk = computed(
  () =>
    contarNodosRegulares(characterData.value.arbol) -
      contarNodosRegulares(subidaNivelBase.value?.arbol) >=
    2,
);

const pasos = computed(() => [
  { label: "Añadir 1 dote de Especialidad", ok: doteEspecialidadOk.value },
  { label: "Añadir 1 dote de Estilo marcial", ok: doteEstiloOk.value },
  { label: "Colocar 2 nodos nuevos en el árbol", ok: nodosOk.value },
]);

const todoCompleto = computed(() => pasos.value.every((p) => p.ok));

// Se entra en modo subida de nivel al arrancar el setup, ANTES de montar los
// pasos hijos (Especialidad, Árbol...). Como iniciarSubidaNivel ahora es
// asíncrono (lee el personaje del backend), los pasos se ocultan con `listo`
// hasta que termina: así su onMounted lee el estado ya preparado por el padre
// (su loadCharacterData ve el mismo id ya cargado y no lo recarga).
const listo = ref(false);
if (props.characterId) {
  iniciarSubidaNivel(props.characterId).then(() => {
    listo.value = true;
  });
} else {
  listo.value = true;
}

function salir(id: string) {
  limpiarIdEnCreacion();
  resetCharacterData();
  navigateToFicha?.(id);
}

async function confirmar() {
  if (!todoCompleto.value) return;
  const id = characterData.value.id || props.characterId || "";
  await finalizarSubidaNivel();
  salir(id);
}

async function cancelar() {
  const id = props.characterId || characterData.value.id || "";
  await cancelarSubidaNivel();
  salir(id);
}
</script>

<style scoped>
.ed-root {
  --surface: #ffffff;
  --surface-2: #f5f6f9;
  --border: #e5e7eb;
  --border-strong: #cbd0da;
  --ink: #14161f;
  --muted: #6b7080;
  --faint: #9297a4;
  --accent: #4f46e5;
  --accent-soft: #edeefe;
}

/* Barra superior */
.ed-topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.ed-back {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 2px;
}
.ed-back:hover {
  color: var(--ink);
}
.ed-tabs {
  display: flex;
  gap: 2px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 3px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
}
.ed-tab {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  padding: 7px 14px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background: transparent;
}
.ed-tab.on {
  color: var(--ink);
  background: var(--surface-2);
  box-shadow: inset 0 0 0 1px var(--border);
}
.ed-save {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: var(--accent);
  border: none;
  border-radius: 9px;
  padding: 8px 16px;
  cursor: pointer;
}
.ed-save:hover {
  filter: brightness(1.05);
}
.ed-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: none;
}

/* Hero */
.ed-hero {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}
.ed-avatar {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  flex-shrink: 0;
  background: linear-gradient(140deg, var(--accent), #6d5ae6);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 22px;
  font-weight: 800;
}
.ed-hero-name {
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.3px;
}
.ed-hero-sub {
  font-size: 13px;
  color: var(--muted);
  font-weight: 600;
  margin-top: 2px;
}
.ed-lvlup {
  margin-left: auto;
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, var(--border));
  padding: 8px 14px;
  border-radius: 999px;
}
.ed-lvlup b {
  font-variant-numeric: tabular-nums;
}

/* Guía */
.ed-guide {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: var(--muted);
}
.ed-guide-title {
  font-weight: 800;
  color: var(--ink);
}
.ed-guide ul {
  margin: 8px 0;
  padding-left: 20px;
  list-style: disc;
  display: grid;
  gap: 3px;
}
.ed-checklist {
  list-style: none;
  padding-left: 0;
  gap: 5px;
}
.ed-checklist li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--muted);
}
.ed-checklist li.done {
  color: #0e9488;
}
.ed-check {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  color: var(--faint);
}
.ed-checklist li.done .ed-check {
  background: #e6f5f2;
  border-color: #b8e2db;
  color: #0e9488;
}
.ed-guide-note {
  display: block;
  margin-top: 6px;
  font-style: italic;
  color: var(--faint);
}

/* Panel */
.ed-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(20, 22, 31, 0.04),
    0 10px 30px -20px rgba(20, 22, 31, 0.25);
  overflow: hidden;
}
.ed-tabpad {
  padding: 20px;
}

/* Acciones inferiores */
.ed-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}
.ed-btn {
  font-size: 14px;
  font-weight: 700;
  border-radius: 9px;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid transparent;
}
.ed-btn-ghost {
  background: var(--surface);
  border-color: var(--border-strong);
  color: var(--muted);
}
.ed-btn-ghost:hover {
  color: var(--ink);
}
.ed-btn-primary {
  background: var(--accent);
  color: #fff;
}
.ed-btn-primary:hover {
  filter: brightness(1.05);
}
.ed-btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: none;
}
</style>
