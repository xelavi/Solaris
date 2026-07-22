<template>
  <div class="sel-raiz" ref="raiz">
    <div class="sel-box" @click="enfocar">
      <!-- Etiquetas ya elegidas, como fichas quitables -->
      <span
        v-for="et in seleccionadas"
        :key="et.id"
        :class="['sel-token', clasesEtiquetaEquipo(et)]"
      >
        {{ et.nombre }}
        <button
          type="button"
          class="sel-token-x"
          title="Quitar etiqueta"
          @click.stop="quitar(et.id)"
        >
          ×
        </button>
      </span>

      <input
        ref="input"
        v-model="texto"
        type="text"
        class="sel-input"
        :placeholder="
          seleccionadas.length ? 'Añadir etiqueta...' : 'Filtrar por etiquetas...'
        "
        @focus="abierto = true"
        @keydown.enter.prevent="anadirResaltada"
        @keydown.down.prevent="mover(1)"
        @keydown.up.prevent="mover(-1)"
        @keydown.backspace="quitarUltimaSiVacio"
        @keydown.esc="abierto = false"
      />
    </div>

    <!-- Desplegable de coincidencias -->
    <ul v-if="abierto && opciones.length" class="sel-dropdown">
      <li
        v-for="(op, i) in opciones"
        :key="op.id"
        :class="['sel-option', { activa: i === resaltado }]"
        @mousedown.prevent="anadir(op.id)"
        @mouseenter="resaltado = i"
      >
        <span :class="['sel-punto', clasesEtiquetaEquipo(op)]"></span>
        {{ op.nombre }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from "vue";
import {
  clasesEtiquetaEquipo,
  type EtiquetaEquipo,
} from "../domain/etiquetasEquipo";

const props = defineProps<{ etiquetas: EtiquetaEquipo[] }>();

// Ids de las etiquetas seleccionadas (v-model).
const model = defineModel<number[]>({ default: () => [] });

const raiz = ref<HTMLElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const texto = ref("");
const abierto = ref(false);
const resaltado = ref(0);

/** Etiquetas elegidas, en su orden de selección. */
const seleccionadas = computed(() =>
  model.value
    .map((id) => props.etiquetas.find((e) => e.id === id))
    .filter((e): e is EtiquetaEquipo => e !== undefined),
);

/** Etiquetas aún no elegidas que coinciden con el texto escrito. */
const opciones = computed(() => {
  const t = texto.value.trim().toLowerCase();
  return props.etiquetas.filter(
    (e) =>
      !model.value.includes(e.id) &&
      (t === "" || e.nombre.toLowerCase().includes(t)),
  );
});

// Al cambiar las coincidencias, reancla el resaltado al principio.
watch(opciones, () => {
  resaltado.value = 0;
});

function enfocar() {
  input.value?.focus();
  abierto.value = true;
}

function anadir(id: number) {
  if (!model.value.includes(id)) model.value = [...model.value, id];
  texto.value = "";
  resaltado.value = 0;
  input.value?.focus();
}

function anadirResaltada() {
  const op = opciones.value[resaltado.value] ?? opciones.value[0];
  if (op) anadir(op.id);
}

function quitar(id: number) {
  model.value = model.value.filter((x) => x !== id);
}

function quitarUltimaSiVacio() {
  if (texto.value === "" && model.value.length > 0) {
    model.value = model.value.slice(0, -1);
  }
}

function mover(delta: number) {
  const n = opciones.value.length;
  if (n === 0) return;
  abierto.value = true;
  resaltado.value = (resaltado.value + delta + n) % n;
}

// Cerrar el desplegable al hacer clic fuera del componente.
function alClicarFuera(e: MouseEvent) {
  if (raiz.value && !raiz.value.contains(e.target as Node)) {
    abierto.value = false;
  }
}
onMounted(() => document.addEventListener("mousedown", alClicarFuera));
onBeforeUnmount(() => document.removeEventListener("mousedown", alClicarFuera));
</script>

<style scoped>
.sel-raiz {
  position: relative;
}
.sel-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 5px 8px;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  background: #fff;
  cursor: text;
}
.sel-box:focus-within {
  border-color: #818cf8;
  box-shadow: 0 0 0 3px #e0e7ff;
}
.sel-token {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-width: 1px;
  border-radius: 9999px;
  padding: 2px 4px 2px 9px;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1rem;
  white-space: nowrap;
}
.sel-token-x {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border: none;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.08);
  color: inherit;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
}
.sel-token-x:hover {
  background: rgba(0, 0, 0, 0.2);
}
.sel-input {
  flex: 1;
  min-width: 120px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13.5px;
  color: #1f2937;
  padding: 3px 2px;
}
.sel-dropdown {
  position: absolute;
  z-index: 30;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 240px;
  overflow-y: auto;
  margin: 0;
  padding: 4px;
  list-style: none;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.15),
    0 4px 10px -6px rgba(0, 0, 0, 0.1);
}
.sel-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 9px;
  border-radius: 7px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
}
.sel-option.activa {
  background: #eef2ff;
  color: #3730a3;
}
.sel-punto {
  width: 10px;
  height: 10px;
  border-width: 1px;
  border-radius: 9999px;
  flex-shrink: 0;
}
</style>
