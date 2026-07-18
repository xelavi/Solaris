<template>
  <div class="page ed-root">
    <div class="mx-auto w-full max-w-[1200px]">
      <!-- Barra superior: volver + pestañas + guardar -->
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
        <button @click="guardar" class="ed-save">Guardar y volver</button>
      </div>

      <!-- Encabezado con datos en vivo -->
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
                .join(" · ") || "Editando personaje"
            }}
            · Nivel {{ characterData.nivel }}
          </div>
        </div>
        <span class="ed-autosave">Cambios guardados automáticamente</span>
      </div>

      <!-- ============= GENERAL ============= -->
      <div v-show="currentTab === 'general'" class="ed-panel">
        <div class="ed-phead">Datos generales</div>
        <div class="ed-body ed-grid">
          <label class="ed-field ed-col2">
            <span class="ed-label">Nombre</span>
            <input
              v-model="characterData.nombre"
              type="text"
              class="ed-input"
              placeholder="Nombre del personaje"
            />
          </label>

          <label class="ed-field">
            <span class="ed-label">Nivel</span>
            <input
              v-model.number="characterData.nivel"
              type="number"
              min="1"
              max="20"
              class="ed-input"
            />
          </label>

          <label class="ed-field">
            <span class="ed-label">Raza</span>
            <input
              v-model="characterData.raza"
              type="text"
              class="ed-input"
              placeholder="Raza del personaje"
            />
          </label>
        </div>
        <p class="ed-hint">
          El trasfondo, la especialidad y el estilo marcial se editan en sus
          propias pestañas, ya que afectan a habilidades, dotes y al árbol.
          Cambiar el nivel recalcula los atributos automáticamente.
        </p>
      </div>

      <!-- ============= TRASFONDO ============= -->
      <div v-if="currentTab === 'trasfondo'" class="ed-panel ed-tabpad">
        <Trasfondo />
      </div>

      <!-- ============= ESPECIALIDAD ============= -->
      <div v-else-if="currentTab === 'especialidad'" class="ed-panel ed-tabpad">
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

      <!-- ============= EQUIPO ============= -->
      <div v-else-if="currentTab === 'equipo'" class="ed-panel">
        <div class="ed-phead">
          <span class="ed-grow">Armas</span>
          <span class="ed-count">{{ characterData.armas.length }} equipada(s)</span>
        </div>
        <div class="ed-list">
          <button
            v-for="arma in armas"
            :key="arma.id"
            type="button"
            :class="['ed-item', { on: characterData.armas.includes(arma.id) }]"
            @click="toggleArma(arma.id)"
          >
            <span class="ed-check"><span v-if="characterData.armas.includes(arma.id)">✓</span></span>
            <span class="ed-item-n">{{ arma.nombre }}</span>
            <span class="ed-item-tag">{{
              nombresEtiquetas(arma.etiquetas).join(", ")
            }}</span>
            <span class="ed-dmg">
              <span class="ed-dchip l">{{ arma.lacerante }}</span>
              <span class="ed-dchip p">{{ arma.perforante }}</span>
              <span class="ed-dchip c">{{ arma.contundente }}</span>
            </span>
          </button>
        </div>

        <div class="ed-phead ed-phead-mt">
          <span class="ed-grow">Armaduras</span>
          <span class="ed-count">{{ characterData.armaduras.length }} equipada(s)</span>
        </div>
        <div class="ed-list">
          <button
            v-for="arm in armaduras"
            :key="arm.id"
            type="button"
            :class="['ed-item', { on: characterData.armaduras.includes(arm.id) }]"
            @click="toggleArmadura(arm.id)"
          >
            <span class="ed-check"><span v-if="characterData.armaduras.includes(arm.id)">✓</span></span>
            <span class="ed-item-n">{{ arm.nombre }}</span>
            <span class="ed-item-tag">{{ arm.categoria }}</span>
            <span class="ed-dmg">
              <span class="ed-dchip l">{{ arm.lacerante }}</span>
              <span class="ed-dchip p">{{ arm.perforante }}</span>
              <span class="ed-dchip c">{{ arm.contundente }}</span>
            </span>
          </button>
        </div>
      </div>

      <!-- Barra de acciones inferior -->
      <div class="ed-actions">
        <button @click="cancelar" class="ed-btn ed-btn-ghost">
          Descartar cambios
        </button>
        <button @click="guardar" class="ed-btn ed-btn-primary">
          Guardar y volver
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import armasData from "../../assets/armas.json";
import armadurasData from "../../assets/armaduras.json";
import Trasfondo from "../CrearPersonaje/trasfondo.vue";
import Especialidad from "../CrearPersonaje/especialidad.vue";
import EstiloMarcial from "../CrearPersonaje/estilo_marcial.vue";
import Arbol from "../CrearPersonaje/arbol.vue";
import Habilidades from "../CrearPersonaje/habilidades.vue";
import { useCharacterCreation } from "../../domain/useCharacterCreation";
import { nombresEtiquetas } from "../../domain/etiquetasEquipo";
import { armaduraVinculada, armaVinculada } from "../../domain/escudos";
import type { PersonajeGuardado } from "../../domain/Personaje";
import {
  obtenerPersonaje,
  guardarPersonaje,
  limpiarIdEnCreacion,
} from "../../domain/storage/personajesRepo";

const props = defineProps<{ characterId?: string }>();

const navigateToFicha = inject<(id: string) => void>("navigateToFicha");

const {
  characterData,
  saveCharacterData,
  resetCharacterData,
  editarPersonajeExistente,
} = useCharacterCreation();

const tabs = [
  { id: "general", label: "General" },
  { id: "trasfondo", label: "Trasfondo" },
  { id: "especialidad", label: "Especialidad" },
  { id: "estilo", label: "Estilo marcial" },
  { id: "arbol", label: "Árbol" },
  { id: "habilidades", label: "Habilidades" },
  { id: "equipo", label: "Equipo" },
] as const;
const currentTab = ref<(typeof tabs)[number]["id"]>("general");

const armas = ref(armasData.armas);
const armaduras = ref(armadurasData.armaduras);

// Copia intacta del personaje al entrar, para poder descartar los cambios.
// (La edición se autoguarda sobre el personaje real; "Descartar" restaura esto.)
let snapshot: PersonajeGuardado | null = null;

onMounted(async () => {
  if (!props.characterId) return;
  const original = await obtenerPersonaje(props.characterId);
  if (original) snapshot = JSON.parse(JSON.stringify(original));
  await editarPersonajeExistente(props.characterId);
});

function fijarSeleccion(lista: number[], id: number, seleccionado: boolean) {
  const i = lista.indexOf(id);
  if (seleccionado && i === -1) lista.push(id);
  if (!seleccionado && i !== -1) lista.splice(i, 1);
}

function toggleArma(id: number) {
  const seleccionar = !characterData.value.armas.includes(id);
  fijarSeleccion(characterData.value.armas, id, seleccionar);
  // Los escudos son a la vez arma y armadura: mantener ambos apartados en sincronía
  const armaduraId = armaduraVinculada(id);
  if (armaduraId !== undefined) {
    fijarSeleccion(characterData.value.armaduras, armaduraId, seleccionar);
  }
}

function toggleArmadura(id: number) {
  const seleccionar = !characterData.value.armaduras.includes(id);
  fijarSeleccion(characterData.value.armaduras, id, seleccionar);
  const armaId = armaVinculada(id);
  if (armaId !== undefined) {
    fijarSeleccion(characterData.value.armas, armaId, seleccionar);
  }
}

// Suelta el puntero "en creación" y limpia el estado en memoria antes de salir.
function salir(id: string) {
  limpiarIdEnCreacion();
  resetCharacterData();
  navigateToFicha?.(id);
}

async function guardar() {
  const id = characterData.value.id || props.characterId || "";
  await saveCharacterData();
  salir(id);
}

async function cancelar() {
  const id = props.characterId || characterData.value.id || "";
  // Restaura el personaje tal y como estaba al entrar, deshaciendo el autoguardado.
  if (snapshot) await guardarPersonaje(snapshot);
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
  --lac: #d8365f;
  --pen: #2f7fd8;
  --con: #cc7d10;
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
.ed-autosave {
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  color: #0e9488;
  background: #e6f5f2;
  border: 1px solid #b8e2db;
  padding: 5px 10px;
  border-radius: 999px;
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
.ed-phead {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}
.ed-phead-mt {
  border-top: 1px solid var(--border);
}
.ed-grow {
  flex: 1;
}
.ed-count {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0;
  text-transform: none;
}

/* Formulario general */
.ed-body {
  padding: 18px;
}
.ed-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.ed-col2 {
  grid-column: 1 / -1;
}
.ed-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ed-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--faint);
}
.ed-input {
  border: 1px solid var(--border-strong);
  border-radius: 9px;
  padding: 9px 11px;
  font-size: 14px;
  color: var(--ink);
  background: var(--surface);
  width: 100%;
}
.ed-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.ed-hint {
  padding: 0 18px 16px;
  font-size: 12px;
  color: var(--faint);
  font-style: italic;
}

/* Listas de equipo */
.ed-list {
  max-height: 340px;
  overflow-y: auto;
}
.ed-item {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 9px 14px;
  border: none;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  text-align: left;
}
.ed-item:last-child {
  border-bottom: none;
}
.ed-item:hover {
  background: var(--surface-2);
}
.ed-item.on {
  background: var(--accent-soft);
}
.ed-check {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  flex-shrink: 0;
  border: 2px solid var(--border-strong);
  background: var(--surface);
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 800;
  color: #fff;
}
.ed-item.on .ed-check {
  background: var(--accent);
  border-color: var(--accent);
}
.ed-item-n {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink);
}
.ed-item-tag {
  font-size: 11px;
  color: var(--muted);
  flex: 1;
}
.ed-dmg {
  display: flex;
  gap: 5px;
  flex-shrink: 0;
}
.ed-dchip {
  min-width: 24px;
  text-align: center;
  font-size: 12px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  padding: 2px 5px;
  border-radius: 6px;
}
.ed-dchip.l {
  color: var(--lac);
  background: color-mix(in srgb, var(--lac) 12%, var(--surface));
}
.ed-dchip.p {
  color: var(--pen);
  background: color-mix(in srgb, var(--pen) 12%, var(--surface));
}
.ed-dchip.c {
  color: var(--con);
  background: color-mix(in srgb, var(--con) 12%, var(--surface));
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

@media (max-width: 640px) {
  .ed-grid {
    grid-template-columns: 1fr;
  }
}
</style>
