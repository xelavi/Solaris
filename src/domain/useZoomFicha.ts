// src/domain/useZoomFicha.ts
// Zoom de una ficha, ajustable por el usuario y persistido. El valor inicial se
// autoajusta si la pantalla es más estrecha que el ancho de diseño; a partir de
// ahí, los botones −/+ (ver ControlZoom.vue) mandan y la preferencia se guarda.
import { ref, watch } from "vue";

const MIN = 0.4;
const MAX = 1.3;
const PASO = 0.1;

function redondear(v: number): number {
  return Math.round(v * 100) / 100;
}

export function useZoomFicha(clave: string, anchoDiseno = 1280) {
  const CLAVE = `zoom_ficha_${clave}`;
  const guardado = Number(localStorage.getItem(CLAVE));
  // Autoajuste inicial: si la ventana es más estrecha que el diseño, empieza
  // encogida para que quepa; si no, tamaño normal.
  const auto = Math.min(1, redondear(window.innerWidth / anchoDiseno));
  const zoom = ref(guardado > 0 ? guardado : auto);

  watch(zoom, (v) => localStorage.setItem(CLAVE, String(v)));

  const aumentar = () => (zoom.value = redondear(Math.min(MAX, zoom.value + PASO)));
  const reducir = () => (zoom.value = redondear(Math.max(MIN, zoom.value - PASO)));
  const restablecer = () => (zoom.value = 1);

  return { zoom, aumentar, reducir, restablecer };
}
