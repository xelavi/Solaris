<script setup lang="ts">
import { ref, computed, provide } from "vue";
import Characters from "./components/characters.vue";
import CrearPersonaje from "./components/CrearPersonaje/crear_personaje.vue";
import Ficha from "./components/VerPersonaje/ficha.vue";
import EditarPersonaje from "./components/VerPersonaje/editarPersonaje.vue";
import SubirNivel from "./components/VerPersonaje/subirNivel.vue";
import Partidas from "./components/Partida/partidas.vue";
import CrearPartida from "./components/Partida/crear_partida.vue";
import Partida from "./components/Partida/partida.vue";
import JugarPartida from "./components/Partida/jugarPartida.vue";
import Escena from "./components/entornoPrueba/escena.vue";
import Editor from "./components/editorVoxeles/editor.vue";
import EditorHexagonos from "./components/editorHexagonos/editor.vue";
import Bestiario from "./components/bestiario.vue";
import CrearCriatura from "./components/CrearCriatura/crear_criatura.vue";
import FichaCriatura from "./components/VerCriatura/fichaCriatura.vue";
import { limpiarIdEnCreacion } from "./domain/storage/personajesRepo";
const currentView = ref<
  | "characters"
  | "crear"
  | "ficha"
  | "editarPersonaje"
  | "subirNivel"
  | "partidas"
  | "crearPartida"
  | "verPartida"
  | "jugarPartida"
  | "escena"
  | "editorVoxeles"
  | "editorHexagonos"
  | "bestiario"
  | "crearCriatura"
  | "fichaCriatura"
>("characters");

const characterId = ref<string>("");
const partidaId = ref<string>("");
const escenaPartidaId = ref<string>("");
const criaturaId = ref<string>("");

// Vistas 2D que muestran la barra de navegación (las vistas 3D van a pantalla completa)
const vistasConNav = new Set([
  "characters",
  "crear",
  "ficha",
  "editarPersonaje",
  "subirNivel",
  "partidas",
  "crearPartida",
  "verPartida",
  "bestiario",
  "crearCriatura",
  "fichaCriatura",
]);
const mostrarNav = computed(() => vistasConNav.has(currentView.value));

const seccionActiva = computed(() => {
  if (
    ["characters", "crear", "ficha", "editarPersonaje", "subirNivel"].includes(
      currentView.value,
    )
  )
    return "personajes";
  if (["partidas", "crearPartida", "verPartida"].includes(currentView.value))
    return "partidas";
  if (
    ["bestiario", "crearCriatura", "fichaCriatura"].includes(currentView.value)
  )
    return "bestiario";
  return "";
});

const navItems = [
  { id: "personajes", label: "Personajes", view: "characters" as const },
  { id: "partidas", label: "Partidas", view: "partidas" as const },
  { id: "bestiario", label: "Bestiario", view: "bestiario" as const },
  { id: "editor", label: "Editor de Vóxeles", view: "editorVoxeles" as const },
  {
    id: "editorHex",
    label: "Editor de Hexágonos",
    view: "editorHexagonos" as const,
  },
];

// Provide navigation functions
provide("navigateToFicha", (id: string) => {
  characterId.value = id;
  currentView.value = "ficha";
});

provide("navigateToEditarPersonaje", (id: string) => {
  characterId.value = id;
  currentView.value = "editarPersonaje";
});

provide("navigateToSubirNivel", (id: string) => {
  characterId.value = id;
  currentView.value = "subirNivel";
});

provide("navigateToCrear", () => {
  // Limpiar el ID del personaje en creación para empezar uno nuevo
  limpiarIdEnCreacion();
  currentView.value = "crear";
});

provide("navigateToCharacters", () => {
  currentView.value = "characters";
});

provide("navigateToPartidas", () => {
  currentView.value = "partidas";
});

provide("navigateToCrearPartida", () => {
  currentView.value = "crearPartida";
});

provide("navigateToVerPartida", (id: string) => {
  partidaId.value = id;
  currentView.value = "verPartida";
});

provide("navigateToJugarPartida", (id: string) => {
  partidaId.value = id;
  currentView.value = "jugarPartida";
});
provide("navigateToEscena", (id?: string) => {
  if (id) escenaPartidaId.value = id;
  currentView.value = "escena";
});
provide("navigateToEditorVoxeles", () => {
  currentView.value = "editorVoxeles";
});
provide("navigateToEditorHexagonos", () => {
  currentView.value = "editorHexagonos";
});
provide("navigateToBestiario", () => {
  currentView.value = "bestiario";
});
provide("navigateToCrearCriatura", () => {
  currentView.value = "crearCriatura";
});
provide("navigateToFichaCriatura", (id: string) => {
  criaturaId.value = id;
  currentView.value = "fichaCriatura";
});
</script>

<template>
  <header
    v-if="mostrarNav"
    class="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur"
  >
    <div
      class="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-4 sm:px-6 lg:px-8"
    >
      <button
        @click="currentView = 'characters'"
        class="flex cursor-pointer items-center gap-2.5"
      >
        <span
          class="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 text-sm font-bold text-white"
          >S</span
        >
        <span class="text-base font-bold tracking-tight text-gray-900"
          >Solaris</span
        >
      </button>

      <nav class="flex items-center gap-1 overflow-x-auto">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="currentView = item.view"
          :class="[
            'rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
            seccionActiva === item.id
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800',
          ]"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>
  </header>

  <characters v-if="currentView === 'characters'"></characters>
  <crear-personaje v-else-if="currentView === 'crear'"></crear-personaje>
  <ficha
    v-else-if="currentView === 'ficha'"
    :character-id="characterId"
  ></ficha>
  <editar-personaje
    v-else-if="currentView === 'editarPersonaje'"
    :character-id="characterId"
  ></editar-personaje>
  <subir-nivel
    v-else-if="currentView === 'subirNivel'"
    :character-id="characterId"
  ></subir-nivel>
  <partidas v-else-if="currentView === 'partidas'"></partidas>
  <crear-partida v-else-if="currentView === 'crearPartida'"></crear-partida>
  <partida
    v-else-if="currentView === 'verPartida'"
    :partida-id="partidaId"
  ></partida>
  <jugar-partida
    v-else-if="currentView === 'jugarPartida'"
    :partida-id="partidaId"
  ></jugar-partida>
  <escena
    v-else-if="currentView === 'escena'"
    :partida-id="escenaPartidaId"
  ></escena>
  <editor v-else-if="currentView === 'editorVoxeles'"></editor>
  <editor-hexagonos
    v-else-if="currentView === 'editorHexagonos'"
  ></editor-hexagonos>
  <bestiario v-else-if="currentView === 'bestiario'"></bestiario>
  <crear-criatura v-else-if="currentView === 'crearCriatura'"></crear-criatura>
  <ficha-criatura
    v-else-if="currentView === 'fichaCriatura'"
    :criatura-id="criaturaId"
  ></ficha-criatura>
</template>

<style scoped></style>
