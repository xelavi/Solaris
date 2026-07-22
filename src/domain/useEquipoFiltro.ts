// src/domain/useEquipoFiltro.ts
// Lógica de búsqueda y filtrado por etiquetas para las tablas/listas de equipo
// (armas y armaduras). Es puramente de presentación y la comparten el asistente
// de creación (equipo.vue) y el editor (editarPersonaje.vue), para que ambos se
// comporten igual.
//
// El filtro por etiquetas es unificado: las etiquetas de arma se referencian por
// id (campo `etiquetas`); las armaduras usan `categoria` por nombre, y ese nombre
// coincide con una etiqueta del catálogo (Ligera, Media, Pesada, Escudo, Guante).
// Semántica OR: un ítem pasa el filtro si tiene ALGUNA de las etiquetas activas.

import { computed, ref, toValue, type MaybeRefOrGetter } from "vue";
import {
  ETIQUETAS_EQUIPO,
  nombresEtiquetas,
  type EtiquetaEquipo,
} from "./etiquetasEquipo";

interface ArmaFiltrable {
  nombre: string;
  etiquetas: number[];
}

interface ArmaduraFiltrable {
  nombre: string;
  categoria: string;
}

export function useEquipoFiltro<
  A extends ArmaFiltrable,
  D extends ArmaduraFiltrable,
>(armas: MaybeRefOrGetter<A[]>, armaduras: MaybeRefOrGetter<D[]>) {
  const busqueda = ref("");
  const etiquetasSeleccionadas = ref<number[]>([]);

  /** Todas las etiquetas del catálogo, para pintar los chips de filtro. */
  const etiquetas: EtiquetaEquipo[] = ETIQUETAS_EQUIPO;

  const termino = computed(() => busqueda.value.trim().toLowerCase());

  /** Nombres (en minúscula) de las etiquetas activas, para cruzar con `categoria`. */
  const nombresSeleccionados = computed(() => {
    const nombres = new Set<string>();
    for (const id of etiquetasSeleccionadas.value) {
      const etiqueta = ETIQUETAS_EQUIPO.find((e) => e.id === id);
      if (etiqueta) nombres.add(etiqueta.nombre.toLowerCase());
    }
    return nombres;
  });

  function coincideTexto(nombre: string, extra: string[]): boolean {
    const t = termino.value;
    if (!t) return true;
    if (nombre.toLowerCase().includes(t)) return true;
    return extra.some((e) => e.toLowerCase().includes(t));
  }

  const armasFiltradas = computed(() =>
    toValue(armas).filter((arma) => {
      if (!coincideTexto(arma.nombre, nombresEtiquetas(arma.etiquetas)))
        return false;
      if (etiquetasSeleccionadas.value.length === 0) return true;
      return arma.etiquetas.some((id) =>
        etiquetasSeleccionadas.value.includes(id),
      );
    }),
  );

  const armadurasFiltradas = computed(() =>
    toValue(armaduras).filter((armadura) => {
      if (!coincideTexto(armadura.nombre, [armadura.categoria])) return false;
      if (etiquetasSeleccionadas.value.length === 0) return true;
      return nombresSeleccionados.value.has(armadura.categoria.toLowerCase());
    }),
  );

  function etiquetaActiva(id: number): boolean {
    return etiquetasSeleccionadas.value.includes(id);
  }

  function alternarEtiqueta(id: number): void {
    const i = etiquetasSeleccionadas.value.indexOf(id);
    if (i === -1) etiquetasSeleccionadas.value.push(id);
    else etiquetasSeleccionadas.value.splice(i, 1);
  }

  function limpiarFiltros(): void {
    busqueda.value = "";
    etiquetasSeleccionadas.value = [];
  }

  /** ¿Hay algún filtro (texto o etiquetas) activo? */
  const filtroActivo = computed(
    () => termino.value !== "" || etiquetasSeleccionadas.value.length > 0,
  );

  return {
    busqueda,
    etiquetasSeleccionadas,
    etiquetas,
    armasFiltradas,
    armadurasFiltradas,
    etiquetaActiva,
    alternarEtiqueta,
    limpiarFiltros,
    filtroActivo,
  };
}
