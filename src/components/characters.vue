<template>
  <div class="page">
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Personajes</h1>
          <p class="page-subtitle">
            Gestiona tus héroes y continúa donde lo dejaste.
          </p>
        </div>
        <button @click="crearNuevoPersonaje" class="btn btn-primary">
          <svg
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
            />
          </svg>
          Nuevo personaje
        </button>
      </div>

      <!-- Barra de herramientas: buscador + ordenar + vista + nueva carpeta -->
      <div class="mb-6 flex flex-wrap items-center gap-3">
        <div class="relative min-w-[200px] flex-1">
          <svg
            class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 3.415 9.812l3.636 3.637a.75.75 0 1 0 1.061-1.06l-3.636-3.638A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar personajes..."
            class="w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-9 text-sm text-gray-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
          />
        </div>
        <button
          @click="ordenar"
          class="btn btn-secondary"
          :title="`Ordenar por ${criterioOrden.etiqueta} (clic para cambiar de criterio)`"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M3 4.75A.75.75 0 0 1 3.75 4h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 3 4.75Zm0 4A.75.75 0 0 1 3.75 8h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 3 8.75Zm0 4a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm11.28-6.53a.75.75 0 0 0-1.06 0l-2 2a.75.75 0 1 0 1.06 1.06l.72-.72V15a.75.75 0 0 0 1.5 0V8.56l.72.72a.75.75 0 1 0 1.06-1.06l-2-2Z"
            />
          </svg>
          Ordenar: {{ criterioOrden.etiqueta }}
        </button>
        <button
          @click="alternarVista"
          class="btn btn-secondary"
          :title="org.vista === 'grid' ? 'Ver en lista' : 'Ver en cuadrícula'"
        >
          <svg
            v-if="org.vista === 'grid'"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M3 4.75A.75.75 0 0 1 3.75 4h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 4.75Zm3.5 0A.75.75 0 0 1 7.25 4h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75ZM3 10a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 10Zm3.5 0a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9A.75.75 0 0 1 6.5 10Zm-3.5 5.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm3.5 0a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Z"
            />
          </svg>
          <svg
            v-else
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M4.25 3A1.25 1.25 0 0 0 3 4.25v2.5A1.25 1.25 0 0 0 4.25 8h2.5A1.25 1.25 0 0 0 8 6.75v-2.5A1.25 1.25 0 0 0 6.75 3h-2.5Zm9 0A1.25 1.25 0 0 0 12 4.25v2.5A1.25 1.25 0 0 0 13.25 8h2.5A1.25 1.25 0 0 0 17 6.75v-2.5A1.25 1.25 0 0 0 15.75 3h-2.5Zm-9 9A1.25 1.25 0 0 0 3 13.25v2.5A1.25 1.25 0 0 0 4.25 17h2.5A1.25 1.25 0 0 0 8 15.75v-2.5A1.25 1.25 0 0 0 6.75 12h-2.5Zm9 0A1.25 1.25 0 0 0 12 13.25v2.5A1.25 1.25 0 0 0 13.25 17h2.5A1.25 1.25 0 0 0 17 15.75v-2.5A1.25 1.25 0 0 0 15.75 12h-2.5Z"
            />
          </svg>
          {{ org.vista === "grid" ? "Lista" : "Cuadrícula" }}
        </button>
        <button
          @click="crearCarpeta"
          class="btn btn-secondary"
          title="Crear carpeta"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M3.75 3A1.75 1.75 0 0 0 2 4.75v10.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 15.25V6.75A1.75 1.75 0 0 0 16.25 5h-6.19l-1.2-1.44A1.75 1.75 0 0 0 7.52 3H3.75Zm6.5 5.75a.75.75 0 0 0-1.5 0v1.5h-1.5a.75.75 0 0 0 0 1.5h1.5v1.5a.75.75 0 0 0 1.5 0v-1.5h1.5a.75.75 0 0 0 0-1.5h-1.5v-1.5Z"
            />
          </svg>
          Nueva carpeta
        </button>
      </div>

      <div v-if="cargando" class="loading-state">
        <div class="spinner"></div>
        <p class="loading-text">Cargando personajes...</p>
      </div>

      <div v-else-if="vacio" class="empty-state">
        <p class="empty-title">No tienes personajes guardados todavía</p>
        <p class="empty-hint">Crea el primero para empezar a jugar.</p>
        <button @click="crearNuevoPersonaje" class="btn btn-primary mt-6">
          Crear personaje
        </button>
      </div>

      <template v-else>
        <!-- Carpetas -->
        <section
          v-for="carpeta in org.carpetas"
          :key="carpeta.id"
          class="mb-4 rounded-xl border border-gray-200 bg-gray-50/60 transition-colors"
          :class="{ 'ring-2 ring-indigo-300': contenedorActivo === carpeta.id }"
          @dragover.prevent="contenedorActivo = carpeta.id"
          @dragleave="onDragLeave(carpeta.id)"
          @drop="soltarEnContenedor(carpeta.id)"
        >
          <header
            class="flex items-center gap-2 px-4 py-3"
            @click="alternarCarpeta(carpeta.id)"
          >
            <button class="btn-icon" @click.stop="alternarCarpeta(carpeta.id)">
              <svg
                class="h-4 w-4 transition-transform"
                :class="{ 'rotate-90': abierta(carpeta.id) }"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <svg
              class="h-5 w-5 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M3.75 3A1.75 1.75 0 0 0 2 4.75v10.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 15.25V6.75A1.75 1.75 0 0 0 16.25 5h-6.19l-1.2-1.44A1.75 1.75 0 0 0 7.52 3H3.75Z"
              />
            </svg>
            <h3 class="flex-1 text-sm font-semibold text-gray-800">
              {{ carpeta.nombre }}
              <span class="ml-1 font-normal text-gray-400">
                ({{ (org.orden[carpeta.id] ?? []).length }})
              </span>
            </h3>
            <button
              class="btn-icon"
              title="Renombrar carpeta"
              @click.stop="renombrarCarpeta(carpeta)"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828Z"
                />
              </svg>
            </button>
            <button
              class="btn-icon"
              title="Eliminar carpeta"
              @click.stop="eliminarCarpeta(carpeta)"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482 41.03 41.03 0 0 0-2.365-.298V3.75A2.75 2.75 0 0 0 11.25 1h-2.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </header>

          <div v-if="abierta(carpeta.id)" class="px-4 pb-4">
            <div v-if="itemsVisibles(carpeta.id).length > 0" :class="claseGrid">
              <div
                v-for="{ personaje, indice } in itemsVisibles(carpeta.id)"
                :key="personaje.id"
                @dragover.prevent.stop
                @drop.stop="soltarEnCard(carpeta.id, indice)"
              >
                <PersonajeCard
                  :personaje="personaje"
                  draggable="true"
                  :class="{ 'opacity-40': arrastrando === personaje.id }"
                  @dragstart="iniciarArrastre(personaje.id)"
                  @dragend="finArrastre"
                  @click="verFicha(personaje.id)"
                  @eliminar="eliminarPersonaje(personaje.id)"
                />
              </div>
            </div>
            <p v-else class="py-4 text-center text-sm text-gray-400">
              Arrastra personajes aquí.
            </p>
          </div>
        </section>

        <!-- Personajes sueltos (raíz) -->
        <section
          class="rounded-xl transition-colors"
          :class="{ 'ring-2 ring-indigo-300': contenedorActivo === RAIZ }"
          @dragover.prevent="contenedorActivo = RAIZ"
          @dragleave="onDragLeave(RAIZ)"
          @drop="soltarEnContenedor(RAIZ)"
        >
          <div v-if="itemsVisibles(RAIZ).length > 0" :class="claseGrid">
            <div
              v-for="{ personaje, indice } in itemsVisibles(RAIZ)"
              :key="personaje.id"
              @dragover.prevent.stop
              @drop.stop="soltarEnCard(RAIZ, indice)"
            >
              <PersonajeCard
                :personaje="personaje"
                draggable="true"
                :class="{ 'opacity-40': arrastrando === personaje.id }"
                @dragstart="iniciarArrastre(personaje.id)"
                @dragend="finArrastre"
                @click="verFicha(personaje.id)"
                @eliminar="eliminarPersonaje(personaje.id)"
              />
            </div>
          </div>
          <p
            v-else-if="org.carpetas.length > 0"
            class="rounded-xl border border-dashed border-gray-200 py-6 text-center text-sm text-gray-400"
          >
            {{
              busqueda
                ? "Ningún personaje suelto coincide con la búsqueda."
                : "Arrastra aquí para sacar personajes de las carpetas."
            }}
          </p>
        </section>
      </template>
    </div>

    <!-- Ventana emergente: crear / renombrar carpeta -->
    <div
      v-if="modal.visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm"
      @click.self="cerrarModal"
    >
      <div class="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        <h3 class="mb-1 text-lg font-semibold text-gray-900">
          {{ modal.modo === "crear" ? "Nueva carpeta" : "Renombrar carpeta" }}
        </h3>
        <p class="mb-4 text-sm text-gray-500">
          {{
            modal.modo === "crear"
              ? "Ponle un nombre a la carpeta para organizar tus personajes."
              : "Escribe el nuevo nombre de la carpeta."
          }}
        </p>
        <input
          ref="inputModal"
          v-model="modal.nombre"
          type="text"
          placeholder="Nombre de la carpeta"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
          @keydown.enter="confirmarModal"
          @keydown.esc="cerrarModal"
        />
        <div class="mt-6 flex justify-end gap-2">
          <button @click="cerrarModal" class="btn btn-secondary">Cancelar</button>
          <button
            @click="confirmarModal"
            class="btn btn-primary"
            :disabled="!modal.nombre.trim()"
          >
            {{ modal.modo === "crear" ? "Crear" : "Guardar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, inject } from "vue";
import PersonajeCard, { type PersonajeInfo } from "./PersonajeCard.vue";
import { esPersonajeCompleto } from "../domain/Personaje";
import {
  listarPersonajes,
  eliminarPersonaje as eliminarPersonajeGuardado,
} from "../domain/storage/personajesRepo";
import {
  RAIZ,
  cargarOrganizacion,
  guardarOrganizacion,
  reconciliar,
  crearIdCarpeta,
  type OrganizacionPersonajes,
  type CarpetaPersonajes,
} from "../domain/storage/personajesOrganizacionRepo";

const personajes = ref<PersonajeInfo[]>([]);
const org = ref<OrganizacionPersonajes>({
  carpetas: [],
  orden: { [RAIZ]: [] },
  abiertas: {},
  vista: "grid",
});
const busqueda = ref("");
const cargando = ref(true);

const arrastrando = ref<string | null>(null);
const contenedorActivo = ref<string | null>(null);

const inputModal = ref<HTMLInputElement | null>(null);
const modal = ref<{
  visible: boolean;
  modo: "crear" | "renombrar";
  nombre: string;
  carpeta: CarpetaPersonajes | null;
}>({ visible: false, modo: "crear", nombre: "", carpeta: null });

const claseGrid = computed(() =>
  org.value.vista === "lista"
    ? "grid grid-cols-1 gap-3"
    : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
);

const navigateToFicha = inject<(id: string) => void>("navigateToFicha");
const navigateToCrear = inject<() => void>("navigateToCrear");

const personajesPorId = computed(() => {
  const mapa = new Map<string, PersonajeInfo>();
  for (const p of personajes.value) mapa.set(p.id, p);
  return mapa;
});

const vacio = computed(
  () => personajes.value.length === 0 && org.value.carpetas.length === 0,
);

/** Personajes de un contenedor que pasan el filtro de búsqueda, con su índice
 * real dentro del contenedor (necesario para insertar al reordenar). */
function itemsVisibles(clave: string) {
  const termino = busqueda.value.trim().toLowerCase();
  const ids = org.value.orden[clave] ?? [];
  const resultado: { personaje: PersonajeInfo; indice: number }[] = [];
  ids.forEach((id, indice) => {
    const personaje = personajesPorId.value.get(id);
    if (!personaje) return;
    if (termino && !coincide(personaje, termino)) return;
    resultado.push({ personaje, indice });
  });
  return resultado;
}

function coincide(personaje: PersonajeInfo, termino: string): boolean {
  if (personaje.nombre.toLowerCase().includes(termino)) return true;
  if (personaje.especialidad.toLowerCase().includes(termino)) return true;
  return personaje.estilo_marcial.toLowerCase().includes(termino);
}

// --- Persistencia de la organización ---

async function persistir() {
  await guardarOrganizacion(org.value);
}

// --- Arrastrar y soltar ---

function iniciarArrastre(id: string) {
  arrastrando.value = id;
}

function finArrastre() {
  arrastrando.value = null;
  contenedorActivo.value = null;
}

function onDragLeave(clave: string) {
  if (contenedorActivo.value === clave) contenedorActivo.value = null;
}

function contenedorDe(id: string): string | null {
  for (const clave of Object.keys(org.value.orden)) {
    if ((org.value.orden[clave] ?? []).includes(id)) return clave;
  }
  return null;
}

function moverPersonaje(id: string, destino: string, indice: number | null) {
  const origen = contenedorDe(id);
  if (origen === null) return;
  const listaOrigen = org.value.orden[origen] ?? [];
  const posOrigen = listaOrigen.indexOf(id);
  listaOrigen.splice(posOrigen, 1);

  let idx = indice;
  if (idx !== null && origen === destino && posOrigen < idx) idx--;

  const listaDestino =
    org.value.orden[destino] ?? (org.value.orden[destino] = []);
  if (idx === null || idx < 0 || idx >= listaDestino.length) {
    listaDestino.push(id);
  } else {
    listaDestino.splice(idx, 0, id);
  }
  persistir();
}

/** Soltar sobre el fondo de un contenedor: al final. */
function soltarEnContenedor(clave: string) {
  if (arrastrando.value) moverPersonaje(arrastrando.value, clave, null);
  finArrastre();
}

/** Soltar sobre una tarjeta concreta: insertar antes de ella. */
function soltarEnCard(clave: string, indice: number) {
  if (arrastrando.value) moverPersonaje(arrastrando.value, clave, indice);
  finArrastre();
}

// --- Carpetas ---

function abierta(id: string): boolean {
  return org.value.abiertas[id] !== false; // por defecto, abiertas
}

function alternarCarpeta(id: string) {
  org.value.abiertas[id] = !abierta(id);
  persistir();
}

function abrirModal(
  modo: "crear" | "renombrar",
  carpeta: CarpetaPersonajes | null,
) {
  modal.value = {
    visible: true,
    modo,
    nombre: carpeta?.nombre ?? "",
    carpeta,
  };
  nextTick(() => {
    inputModal.value?.focus();
    inputModal.value?.select();
  });
}

function cerrarModal() {
  modal.value.visible = false;
}

function confirmarModal() {
  const nombre = modal.value.nombre.trim();
  if (!nombre) return;
  if (modal.value.modo === "crear") {
    const id = crearIdCarpeta();
    org.value.carpetas.push({ id, nombre });
    org.value.orden[id] = [];
    org.value.abiertas[id] = true;
  } else if (modal.value.carpeta) {
    modal.value.carpeta.nombre = nombre;
  }
  persistir();
  cerrarModal();
}

function crearCarpeta() {
  abrirModal("crear", null);
}

function renombrarCarpeta(carpeta: CarpetaPersonajes) {
  abrirModal("renombrar", carpeta);
}

function eliminarCarpeta(carpeta: CarpetaPersonajes) {
  if (
    !confirm(
      `¿Eliminar la carpeta "${carpeta.nombre}"? Los personajes volverán a la lista general.`,
    )
  )
    return;
  const contenido = org.value.orden[carpeta.id] ?? [];
  const raiz = org.value.orden[RAIZ] ?? (org.value.orden[RAIZ] = []);
  raiz.push(...contenido);
  delete org.value.orden[carpeta.id];
  delete org.value.abiertas[carpeta.id];
  org.value.carpetas = org.value.carpetas.filter((c) => c.id !== carpeta.id);
  persistir();
}

// --- Ordenar ---
// Un único botón que rota entre criterios: A-Z -> por nivel -> A-Z ...

type ClaveOrden = "alfabetico" | "nivel";

const criteriosOrden: {
  clave: ClaveOrden;
  etiqueta: string;
  comparar: (a: PersonajeInfo, b: PersonajeInfo) => number;
}[] = [
  {
    clave: "alfabetico",
    etiqueta: "A-Z",
    comparar: (a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()),
  },
  {
    clave: "nivel",
    etiqueta: "nivel",
    comparar: (a, b) => b.nivel - a.nivel, // mayor nivel primero
  },
];

const indiceOrden = ref(0);
const criterioOrden = computed(() => criteriosOrden[indiceOrden.value]);

/** Ordena por el criterio actual y avanza al siguiente para el próximo clic. */
function ordenar() {
  const { clave: criterio, comparar } = criterioOrden.value;
  const personajeDe = (id: string) => personajesPorId.value.get(id);
  for (const clave of Object.keys(org.value.orden)) {
    org.value.orden[clave] = [...(org.value.orden[clave] ?? [])].sort((a, b) => {
      const pa = personajeDe(a);
      const pb = personajeDe(b);
      if (!pa || !pb) return 0;
      return comparar(pa, pb);
    });
  }
  if (criterio === "alfabetico") {
    org.value.carpetas = [...org.value.carpetas].sort((a, b) =>
      a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()),
    );
  }
  indiceOrden.value = (indiceOrden.value + 1) % criteriosOrden.length;
  persistir();
}

// --- Vista ---

function alternarVista() {
  org.value.vista = org.value.vista === "grid" ? "lista" : "grid";
  persistir();
}

// --- Navegación / CRUD de personajes ---

function verFicha(id: string) {
  navigateToFicha?.(id);
}

function crearNuevoPersonaje() {
  navigateToCrear?.();
}

async function eliminarPersonaje(id: string) {
  if (!confirm("¿Estás seguro de que quieres eliminar este personaje?")) return;
  await eliminarPersonajeGuardado(id);
  personajes.value = personajes.value.filter((p) => p.id !== id);
  quitarDeOrganizacion(id);
}

/** Quita el personaje eliminado de la organización. */
function quitarDeOrganizacion(id: string) {
  const origen = contenedorDe(id);
  if (origen) {
    org.value.orden[origen] = (org.value.orden[origen] ?? []).filter(
      (x) => x !== id,
    );
    persistir();
  }
}

async function cargarPersonajes() {
  // Los personajes a medio crear no se listan.
  const guardados = await listarPersonajes();
  personajes.value = guardados.filter(esPersonajeCompleto).map((p) => ({
    id: p.id,
    nombre: p.nombre,
    nivel: p.nivel,
    especialidad: p.especialidad,
    estilo_marcial: p.estilo_marcial,
  }));
}

onMounted(async () => {
  try {
    await cargarPersonajes();
    const organizacion = await cargarOrganizacion();
    reconciliar(
      organizacion,
      personajes.value.map((p) => p.id),
    );
    org.value = organizacion;
    await persistir();
  } finally {
    cargando.value = false;
  }
});
</script>

<style scoped></style>
