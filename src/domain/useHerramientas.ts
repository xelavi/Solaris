import { ref } from "vue";

// Herramienta de la barra lateral izquierda que requiere interactuar con el
// lienzo 3D (la escena la lee para cambiar el comportamiento de los clics).
//   "medir" → medir distancias entre dos puntos (en ecsas).
//   "area"  → plantilla de área: casillas dentro de un radio (en casillas).
//   "cono"  → plantilla de cono/triángulo desde una casilla (en casillas).
// Estado a nivel de módulo → compartido entre el menú y la escena (mismo patrón
// que useMapa/usePartida).
export type Herramienta = "medir" | "area" | "cono";

const herramientaActiva = ref<Herramienta | null>(null);

export function useHerramientas() {
  // Activa la herramienta o la desactiva si ya estaba activa (toggle).
  function alternar(h: Herramienta) {
    herramientaActiva.value = herramientaActiva.value === h ? null : h;
  }
  function desactivar() {
    herramientaActiva.value = null;
  }
  return { herramientaActiva, alternar, desactivar };
}
