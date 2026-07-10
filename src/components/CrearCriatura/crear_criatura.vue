<template>
  <div
    class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen p-6"
  >
    <div class="max-w-5xl mx-auto">
      <div class="mb-4">
        <button
          @click="volver"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg flex items-center gap-2"
        >
          ← Volver al Bestiario
        </button>
      </div>

      <div class="text-center mb-8">
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-600 mb-2 drop-shadow-lg"
        >
          Creación de Criatura
        </h1>
      </div>

      <div
        class="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-xl space-y-8"
      >
        <!-- Información General -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-700 mb-4 pb-2 border-b border-gray-200"
          >
            Información General
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-emerald-600 mb-1"
                >Nombre</label
              >
              <input
                v-model="criatura.nombre"
                type="text"
                placeholder="Nombre de la criatura"
                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-emerald-600 mb-1"
                >Etiquetas (separadas por comas)</label
              >
              <input
                v-model="etiquetasTexto"
                type="text"
                placeholder="bestia, no-muerto, volador"
                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-emerald-600 mb-1"
                >Dificultad</label
              >
              <input
                v-model.number="criatura.dificultad"
                type="number"
                min="0"
                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-emerald-600 mb-1"
                >Experiencia (XP al derrotarla)</label
              >
              <input
                v-model.number="criatura.experiencia"
                type="number"
                min="0"
                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-emerald-600 mb-1"
                >Descripción</label
              >
              <textarea
                v-model="criatura.descripcion"
                rows="3"
                placeholder="Descripción / lore de la criatura"
                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none resize-y"
              ></textarea>
            </div>
          </div>
        </section>

        <!-- Atributos -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-700 mb-4 pb-2 border-b border-gray-200"
          >
            Atributos
          </h2>
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3"
          >
            <div v-for="campo in camposAtributos" :key="campo.key">
              <label class="block text-xs font-semibold text-gray-600 mb-1">{{
                campo.label
              }}</label>
              <input
                v-model.number="criatura.atributos[campo.key]"
                type="number"
                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <h3 class="text-lg font-bold text-gray-700 mt-6 mb-3">
            Armadura (por tipo de daño)
          </h3>
          <div class="grid grid-cols-3 gap-4 max-w-md">
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1"
                >Lacerante</label
              >
              <input
                v-model.number="criatura.armadura.lacerante"
                type="number"
                min="0"
                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1"
                >Penetrante</label
              >
              <input
                v-model.number="criatura.armadura.penetrante"
                type="number"
                min="0"
                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1"
                >Contundente</label
              >
              <input
                v-model.number="criatura.armadura.contundente"
                type="number"
                min="0"
                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </section>

        <!-- Técnicas -->
        <section>
          <div
            class="flex justify-between items-center mb-4 pb-2 border-b border-gray-200"
          >
            <h2 class="text-2xl font-bold text-gray-700">Técnicas</h2>
            <button
              @click="agregarTecnica"
              class="px-4 py-2 rounded-lg font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-200"
            >
              + Añadir Técnica
            </button>
          </div>

          <div
            v-if="criatura.tecnicas.length === 0"
            class="text-center text-gray-400 py-6"
          >
            Sin técnicas. Añade una con el botón de arriba.
          </div>

          <div class="space-y-4">
            <div
              v-for="(tecnica, i) in criatura.tecnicas"
              :key="i"
              class="border-2 border-gray-200 rounded-lg p-4 relative"
            >
              <button
                @click="eliminarTecnica(i)"
                class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
                title="Eliminar técnica"
              >
                ✕
              </button>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label
                    class="block text-sm font-semibold text-emerald-600 mb-1"
                    >Nombre</label
                  >
                  <input
                    v-model="tecnica.nombre"
                    type="text"
                    class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div class="flex gap-6 items-end pb-1">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="tecnica.activa" />
                    <span class="text-sm font-semibold text-gray-600">{{
                      tecnica.activa ? "Activa" : "Pasiva"
                    }}</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="tecnica.esMental" />
                    <span class="text-sm font-semibold text-gray-600">{{
                      tecnica.esMental ? "Mental" : "Física"
                    }}</span>
                  </label>
                </div>
              </div>

              <div class="mb-3">
                <label class="block text-sm font-semibold text-emerald-600 mb-1"
                  >Descripción</label
                >
                <textarea
                  v-model="tecnica.descripcion"
                  rows="2"
                  class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none resize-y"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-600 mb-1"
                  >Daño</label
                >
                <div class="grid grid-cols-3 gap-4 max-w-md">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1"
                      >Lacerante</label
                    >
                    <input
                      v-model.number="tecnica.dano.lacerante"
                      type="number"
                      min="0"
                      class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1"
                      >Penetrante</label
                    >
                    <input
                      v-model.number="tecnica.dano.penetrante"
                      type="number"
                      min="0"
                      class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1"
                      >Contundente</label
                    >
                    <input
                      v-model.number="tecnica.dano.contundente"
                      type="number"
                      min="0"
                      class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Acciones -->
        <div
          class="flex justify-center gap-4 pt-4 border-t border-gray-200"
        >
          <button
            @click="guardarYVerFicha"
            class="px-8 py-3 rounded-lg font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <span>💾</span>
            <span>Guardar y Ver Ficha</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import {
  crearCriaturaVacia,
  crearTecnicaVacia,
  type CriaturaData,
} from "../../domain/Criatura";
import type { ArbolAttributes } from "../../domain/Character";

const camposAtributos: Array<{ key: keyof ArbolAttributes; label: string }> = [
  { key: "hp", label: "HP" },
  { key: "cuerpo", label: "Cuerpo" },
  { key: "agilidad", label: "Agilidad" },
  { key: "mente", label: "Mente" },
  { key: "poderio", label: "Poderío" },
  { key: "movimiento", label: "Movimiento" },
  { key: "resistencia", label: "Resistencia" },
  { key: "evasion", label: "Esquiva" },
  { key: "iniciativa", label: "Iniciativa" },
  { key: "punteria", label: "Deadeye" },
  { key: "regeneracion", label: "Voluntad" },
  { key: "acciones", label: "Acciones" },
  { key: "reacciones", label: "Reacciones" },
];

const navigateToBestiario = inject<() => void>("navigateToBestiario");
const navigateToFichaCriatura = inject<(id: string) => void>(
  "navigateToFichaCriatura",
);

const criaturaId = obtenerOGenerarId();
const criatura = ref<CriaturaData>(crearCriaturaVacia(criaturaId));
const etiquetasTexto = ref("");

function obtenerOGenerarId(): string {
  const existente = localStorage.getItem("criatura_en_creacion_id");
  if (existente) return existente;
  const nuevo = `criatura_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 9)}`;
  localStorage.setItem("criatura_en_creacion_id", nuevo);
  return nuevo;
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

function guardar(): boolean {
  if (!criatura.value.nombre.trim()) {
    alert("⚠️ La criatura necesita un nombre antes de guardarse.");
    return false;
  }

  criatura.value.etiquetas = etiquetasTexto.value
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);
  criatura.value.fechaGuardado = new Date().toISOString();

  try {
    localStorage.setItem(
      criatura.value.id,
      JSON.stringify(criatura.value, null, 2),
    );

    const listaString = localStorage.getItem("lista_criaturas");
    const lista: string[] = listaString ? JSON.parse(listaString) : [];
    if (!lista.includes(criatura.value.id)) {
      lista.push(criatura.value.id);
      localStorage.setItem("lista_criaturas", JSON.stringify(lista));
    }

    // La criatura ya está guardada: liberamos el ID de creación.
    localStorage.removeItem("criatura_en_creacion_id");
    return true;
  } catch (error) {
    console.error("Error al guardar la criatura:", error);
    alert("Error al guardar la criatura. Inténtalo de nuevo.");
    return false;
  }
}

function guardarYVerFicha() {
  if (!guardar()) return;
  if (navigateToFichaCriatura) navigateToFichaCriatura(criatura.value.id);
}

onMounted(() => {
  // Reanudar una criatura en creación si el ID ya tenía datos guardados.
  const guardada = localStorage.getItem(criaturaId);
  if (guardada) {
    try {
      const datos: CriaturaData = JSON.parse(guardada);
      criatura.value = datos;
      etiquetasTexto.value = (datos.etiquetas ?? []).join(", ");
    } catch (error) {
      console.error("Error al reanudar criatura en creación:", error);
    }
  }
});
</script>

<style scoped></style>
