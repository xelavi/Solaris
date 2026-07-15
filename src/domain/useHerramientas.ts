import { ref } from "vue";
import type { FormaMarca } from "./MarcasMapa";

// Herramienta de la barra lateral izquierda que requiere interactuar con el
// lienzo 3D (la escena la lee para cambiar el comportamiento de los clics).
//   "medir" → medir distancias entre dos puntos (en ecsas).
//   "area"  → plantilla de área: casillas dentro de un radio (en casillas).
//   "cono"  → plantilla de cono/triángulo desde una casilla (en casillas).
//   "marca" → pintar una marca (trampa, objeto…) sobre la casilla clicada.
//   "ping"  → señalar un punto del mapa con un destello temporal (no persiste).
// Estado a nivel de módulo → compartido entre el menú y la escena (mismo patrón
// que useMapa/usePartida).
export type Herramienta = "medir" | "area" | "cono" | "marca" | "ping";

const herramientaActiva = ref<Herramienta | null>(null);
// Forma elegida en el desplegable de marcas; se usa al pintar con "marca".
const formaMarcaActiva = ref<FormaMarca>("trampa");

export function useHerramientas() {
  // Activa la herramienta o la desactiva si ya estaba activa (toggle).
  function alternar(h: Herramienta) {
    herramientaActiva.value = herramientaActiva.value === h ? null : h;
  }
  // Activa la herramienta sin comportamiento de toggle (para el desplegable de
  // marcas: elegir una forma siempre deja la herramienta activa).
  function activar(h: Herramienta) {
    herramientaActiva.value = h;
  }
  function desactivar() {
    herramientaActiva.value = null;
  }
  return { herramientaActiva, formaMarcaActiva, alternar, activar, desactivar };
}
