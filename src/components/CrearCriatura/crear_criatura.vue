<template>
  <div class="page">
    <div class="page-container">
      <div class="mb-6">
        <button @click="volver" class="btn btn-ghost btn-sm -ml-2">
          ← Volver al bestiario
        </button>
        <h1 class="page-title mt-1">Creación de criatura</h1>
        <p class="page-subtitle">
          Define los atributos y técnicas de una nueva criatura del bestiario.
        </p>
      </div>

      <div class="card space-y-8 p-6 sm:p-8">
        <!-- Información General -->
        <section>
          <div class="section-heading">
            <h2 class="section-title">Información general</h2>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="label">Nombre</label>
              <input
                v-model="criatura.nombre"
                type="text"
                placeholder="Nombre de la criatura"
                class="input"
              />
            </div>
            <div>
              <label class="label">Etiquetas</label>
              <div class="relative">
                <div
                  class="flex min-h-[38px] w-full flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 transition-colors focus-within:border-indigo-500"
                >
                  <span
                    v-for="etiqueta in criatura.etiquetas"
                    :key="etiqueta"
                    :class="[
                      'badge',
                      clasesEtiqueta(etiqueta, catalogoEtiquetas),
                    ]"
                  >
                    {{ etiqueta }}
                    <button
                      type="button"
                      @click="quitarEtiqueta(etiqueta)"
                      class="hover:opacity-60"
                      title="Quitar etiqueta"
                    >
                      ✕
                    </button>
                  </span>
                  <input
                    v-model="busquedaEtiqueta"
                    type="text"
                    placeholder="Añadir etiqueta..."
                    class="min-w-[120px] flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                    @focus="mostrarSugerencias = true"
                    @blur="mostrarSugerencias = false"
                    @keydown.enter.prevent="anadirEtiqueta(busquedaEtiqueta)"
                  />
                </div>
                <div
                  v-if="
                    mostrarSugerencias &&
                    (sugerenciasEtiquetas.length > 0 || puedeCrearEtiqueta)
                  "
                  class="absolute z-10 mt-1 max-h-48 w-full space-y-1 overflow-y-auto rounded-lg border border-gray-300 bg-white p-2 shadow-xl"
                >
                  <button
                    v-for="etiqueta in sugerenciasEtiquetas"
                    :key="etiqueta.nombre"
                    type="button"
                    @mousedown.prevent="anadirEtiqueta(etiqueta.nombre)"
                    class="w-full rounded px-2 py-1.5 text-left hover:bg-gray-100"
                  >
                    <span :class="['badge', COLORES_ETIQUETA[etiqueta.color]]">
                      {{ etiqueta.nombre }}
                    </span>
                  </button>
                  <button
                    v-if="puedeCrearEtiqueta"
                    type="button"
                    @mousedown.prevent="anadirEtiqueta(busquedaEtiqueta)"
                    class="w-full rounded px-2 py-1.5 text-left text-sm text-gray-600 hover:bg-gray-100"
                  >
                    + Crear
                    <span class="font-semibold text-gray-800"
                      >"{{ busquedaEtiqueta.trim() }}"</span
                    >
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label class="label">Dificultad</label>
              <input
                v-model.number="criatura.dificultad"
                type="number"
                min="0"
                class="input"
              />
            </div>
            <div>
              <label class="label">Experiencia (XP al derrotarla)</label>
              <input
                v-model.number="criatura.experiencia"
                type="number"
                min="0"
                class="input"
              />
            </div>
            <div>
              <label class="label">Estilo marcial (mod. de ataque)</label>
              <input
                v-model.number="criatura.estiloMarcial"
                type="number"
                class="input"
              />
            </div>
            <div class="md:col-span-2">
              <label class="label">Descripción</label>
              <textarea
                v-model="criatura.descripcion"
                rows="3"
                placeholder="Descripción / lore de la criatura"
                class="input resize-y"
              ></textarea>
            </div>
          </div>
        </section>

        <!-- Atributos -->
        <section>
          <div class="section-heading">
            <h2 class="section-title">Atributos</h2>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div
              v-for="grupo in gruposAtributos"
              :key="grupo.titulo"
              :class="['rounded-lg border p-4', grupo.clases.card]"
            >
              <h3
                :class="[
                  'mb-3 border-b pb-2 text-center text-xs font-bold tracking-wider uppercase',
                  grupo.clases.titulo,
                ]"
              >
                {{ grupo.icono }} {{ grupo.titulo }}
              </h3>
              <div class="space-y-2">
                <div
                  v-for="campo in grupo.campos"
                  :key="campo.key"
                  class="flex items-center justify-between gap-2"
                >
                  <label class="text-sm font-medium text-gray-700">{{
                    campo.label
                  }}</label>
                  <input
                    v-model.number="criatura.atributos[campo.key]"
                    type="number"
                    :class="[
                      'w-20 rounded-lg border bg-white px-2 py-1 text-center font-bold focus:outline-none',
                      grupo.clases.input,
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="panel mt-4">
            <h3
              class="mb-3 border-b border-gray-200 pb-2 text-center text-xs font-bold tracking-wider text-gray-700 uppercase"
            >
              🛡 Armadura (por tipo de daño)
            </h3>
            <div class="mx-auto grid max-w-md grid-cols-3 gap-4">
              <div
                v-for="tipo in tiposDano"
                :key="tipo.key"
                class="text-center"
              >
                <label class="label mb-1">{{ tipo.label }}</label>
                <input
                  v-model.number="criatura.armadura[tipo.key]"
                  type="number"
                  min="0"
                  class="input-number w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Técnicas -->
        <section>
          <div class="section-heading">
            <h2 class="section-title">Técnicas</h2>
            <button @click="agregarTecnica" class="btn btn-secondary btn-sm">
              + Añadir técnica
            </button>
          </div>

          <div
            v-if="criatura.tecnicas.length === 0"
            class="rounded-lg border border-dashed border-gray-200 py-6 text-center text-sm text-gray-500"
          >
            Sin técnicas. Añade una con el botón de arriba.
          </div>

          <div class="space-y-4">
            <div
              v-for="(tecnica, i) in criatura.tecnicas"
              :key="i"
              class="panel relative p-4"
            >
              <button
                @click="eliminarTecnica(i)"
                class="btn-icon absolute top-3 right-3"
                title="Eliminar técnica"
              >
                ✕
              </button>

              <div class="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label class="label">Nombre</label>
                  <input v-model="tecnica.nombre" type="text" class="input" />
                </div>
                <div class="flex flex-wrap items-end gap-3 pb-1">
                  <div>
                    <label class="label">Ejecución</label>
                    <select
                      v-model="tecnica.tipoEjecucion"
                      @change="alCambiarTipoEjecucion(tecnica)"
                      class="input"
                    >
                      <option
                        v-for="op in tiposEjecucion"
                        :key="op.value"
                        :value="op.value"
                      >
                        {{ op.label }}
                      </option>
                    </select>
                  </div>
                  <div
                    v-if="tecnica.tipoEjecucion !== 'pasiva'"
                    class="flex overflow-hidden rounded-lg border border-gray-300"
                  >
                    <button
                      type="button"
                      @click="tecnica.tipoAccion = 'fisica'"
                      :class="[
                        'cursor-pointer px-3 py-1.5 text-sm font-semibold transition-colors duration-150',
                        tecnica.tipoAccion === 'fisica'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-500 hover:bg-gray-100',
                      ]"
                    >
                      Física
                    </button>
                    <button
                      type="button"
                      @click="tecnica.tipoAccion = 'mental'"
                      :class="[
                        'cursor-pointer px-3 py-1.5 text-sm font-semibold transition-colors duration-150',
                        tecnica.tipoAccion === 'mental'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-500 hover:bg-gray-100',
                      ]"
                    >
                      Mental
                    </button>
                  </div>
                  <div v-if="tecnica.tipoEjecucion === 'accion'">
                    <label class="label">Acciones</label>
                    <input
                      v-model.number="tecnica.acciones"
                      type="number"
                      min="0"
                      class="input-number w-20"
                    />
                  </div>
                </div>
              </div>

              <div class="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label class="label">Requisito</label>
                  <input v-model="tecnica.requisito" type="text" class="input" />
                </div>
                <div>
                  <label class="label">Usable si</label>
                  <input
                    v-model="tecnica.usable_si"
                    type="text"
                    class="input"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="label">Descripción</label>
                <textarea
                  v-model="tecnica.descripcion"
                  rows="2"
                  class="input resize-y"
                ></textarea>
              </div>

              <div>
                <label class="label">Daño</label>
                <div class="grid max-w-md grid-cols-3 gap-4">
                  <div v-for="tipo in tiposDano" :key="tipo.key">
                    <label class="mb-1 block text-xs text-gray-500">{{
                      tipo.label
                    }}</label>
                    <input
                      v-model.number="tecnica.dano[tipo.key]"
                      type="number"
                      min="0"
                      class="input-number w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Acciones -->
        <div class="flex justify-end gap-3 border-t border-gray-200 pt-6">
          <button @click="volver" class="btn btn-ghost">Cancelar</button>
          <button @click="guardarYVerFicha" class="btn btn-primary">
            Guardar y ver ficha
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from "vue";
import {
  crearCriaturaVacia,
  crearTecnicaVacia,
  type CriaturaData,
  type DanoPorTipo,
  type Tecnica,
  type TipoEjecucion,
} from "../../domain/Criatura";
import {
  COLORES_ETIQUETA,
  cargarCatalogoEtiquetas,
  obtenerOCrearEtiqueta,
  clasesEtiqueta,
  type Etiqueta,
} from "../../domain/Etiquetas";
import type { ArbolAttributes } from "../../domain/Personaje";
import {
  guardarCriatura,
  obtenerCriatura,
  obtenerOCrearIdEnCreacion,
  limpiarIdEnCreacion,
} from "../../domain/storage/criaturasRepo";

interface GrupoAtributos {
  titulo: string;
  icono: string;
  /** Clases Tailwind del grupo (literales para que el JIT las detecte). */
  clases: { card: string; titulo: string; input: string };
  campos: Array<{ key: keyof ArbolAttributes; label: string }>;
}

const gruposAtributos: GrupoAtributos[] = [
  {
    titulo: "Vitalidad",
    icono: "❤️",
    clases: {
      card: "bg-rose-50 border-rose-200",
      titulo: "text-rose-600 border-rose-200",
      input: "text-rose-600 border-rose-200 focus:border-rose-400",
    },
    campos: [
      { key: "hp", label: "HP" },
      { key: "resistencia", label: "Resistencia" },
      { key: "regeneracion", label: "Voluntad" },
    ],
  },
  {
    titulo: "Combate",
    icono: "⚔️",
    clases: {
      card: "bg-orange-50 border-orange-200",
      titulo: "text-orange-600 border-orange-200",
      input: "text-orange-600 border-orange-200 focus:border-orange-400",
    },
    campos: [
      { key: "poderio", label: "Poderío" },
      { key: "punteria", label: "Deadeye" },
      { key: "evasion", label: "Esquiva" },
      { key: "iniciativa", label: "Iniciativa" },
    ],
  },
  {
    titulo: "Turno",
    icono: "🎯",
    clases: {
      card: "bg-purple-50 border-purple-200",
      titulo: "text-purple-600 border-purple-200",
      input: "text-purple-600 border-purple-200 focus:border-purple-400",
    },
    campos: [
      { key: "movimiento", label: "Movimiento" },
      { key: "acciones", label: "Acciones" },
      { key: "reacciones", label: "Reacciones" },
    ],
  },
];

const tiposDano: Array<{ key: keyof DanoPorTipo; label: string }> = [
  { key: "lacerante", label: "Lacerante" },
  { key: "penetrante", label: "Penetrante" },
  { key: "contundente", label: "Contundente" },
];

const tiposEjecucion: Array<{ value: TipoEjecucion; label: string }> = [
  { value: "accion", label: "Acción" },
  { value: "reaccion", label: "Reacción" },
  { value: "pasiva", label: "Pasiva" },
  { value: "ritual", label: "Ritual" },
];

/** Ajusta los campos dependientes al cambiar el tipo de ejecución. */
function alCambiarTipoEjecucion(tecnica: Tecnica) {
  if (tecnica.tipoEjecucion === "pasiva") {
    tecnica.tipoAccion = "";
    tecnica.acciones = 0;
  } else {
    if (tecnica.tipoAccion === "") tecnica.tipoAccion = "fisica";
    // Reacciones y rituales no cuestan acciones.
    tecnica.acciones =
      tecnica.tipoEjecucion === "accion" ? tecnica.acciones || 1 : 0;
  }
}

const navigateToBestiario = inject<() => void>("navigateToBestiario");
const navigateToFichaCriatura = inject<(id: string) => void>(
  "navigateToFichaCriatura",
);

const criaturaId = obtenerOCrearIdEnCreacion();
const criatura = ref<CriaturaData>(crearCriaturaVacia(criaturaId));

const catalogoEtiquetas = ref<Etiqueta[]>([]);
const busquedaEtiqueta = ref("");
const mostrarSugerencias = ref(false);

const sugerenciasEtiquetas = computed(() =>
  catalogoEtiquetas.value.filter(
    (e) =>
      !tieneEtiqueta(e.nombre) &&
      e.nombre
        .toLowerCase()
        .includes(busquedaEtiqueta.value.trim().toLowerCase()),
  ),
);

const puedeCrearEtiqueta = computed(() => {
  const texto = busquedaEtiqueta.value.trim();
  return (
    texto.length > 0 &&
    !catalogoEtiquetas.value.some(
      (e) => e.nombre.toLowerCase() === texto.toLowerCase(),
    ) &&
    !tieneEtiqueta(texto)
  );
});

function tieneEtiqueta(nombre: string): boolean {
  return criatura.value.etiquetas.some(
    (e) => e.toLowerCase() === nombre.trim().toLowerCase(),
  );
}

async function anadirEtiqueta(nombre: string) {
  const texto = nombre.trim();
  if (!texto || tieneEtiqueta(texto)) return;
  const etiqueta = await obtenerOCrearEtiqueta(texto);
  criatura.value.etiquetas.push(etiqueta.nombre);
  catalogoEtiquetas.value = await cargarCatalogoEtiquetas();
  busquedaEtiqueta.value = "";
}

function quitarEtiqueta(nombre: string) {
  criatura.value.etiquetas = criatura.value.etiquetas.filter(
    (e) => e !== nombre,
  );
}

function agregarTecnica() {
  criatura.value.tecnicas.push(crearTecnicaVacia());
}

function eliminarTecnica(index: number) {
  criatura.value.tecnicas.splice(index, 1);
}

function volver() {
  if (navigateToBestiario) navigateToBestiario();
}

async function guardar(): Promise<boolean> {
  if (!criatura.value.nombre.trim()) {
    alert("⚠️ La criatura necesita un nombre antes de guardarse.");
    return false;
  }

  try {
    await guardarCriatura(criatura.value);
    // La criatura ya está guardada: liberamos el ID de creación.
    limpiarIdEnCreacion();
    return true;
  } catch (error) {
    console.error("Error al guardar la criatura:", error);
    alert("Error al guardar la criatura. Inténtalo de nuevo.");
    return false;
  }
}

async function guardarYVerFicha() {
  if (!(await guardar())) return;
  if (navigateToFichaCriatura) navigateToFichaCriatura(criatura.value.id);
}

onMounted(async () => {
  catalogoEtiquetas.value = await cargarCatalogoEtiquetas();
  // Reanudar una criatura en creación si el ID ya tenía datos guardados.
  const guardada = await obtenerCriatura(criaturaId);
  if (guardada) {
    criatura.value = guardada;
    criatura.value.etiquetas ??= [];
  }
});
</script>

<style scoped></style>
