// src/domain/useAjusteEscala.ts
// Escala ("zoom") un contenido de ancho de diseño FIJO para que quepa en el
// ancho disponible: pantallas pequeñas (portátiles) o dentro de una ventana
// flotante. Devuelve el `ref` del contenedor a medir (el elemento raíz) y el
// factor de `zoom` a aplicar al contenido interno de ancho fijo.
//
// Se mide el contenedor (no el contenido escalado), así que el `zoom` del hijo
// no afecta a la medición y no hay bucle de realimentación.
import { ref, onMounted, onBeforeUnmount } from "vue";

export function useAjusteEscala(anchoDiseno: number, margen = 32) {
  const contenedor = ref<HTMLElement | null>(null);
  const zoom = ref(1);
  let ro: ResizeObserver | null = null;

  function recalcular() {
    const disponible = (contenedor.value?.clientWidth ?? 0) - margen;
    if (disponible <= 0) return;
    // Solo reduce (nunca amplía por encima del tamaño de diseño).
    zoom.value = Math.min(1, disponible / anchoDiseno);
  }

  onMounted(() => {
    recalcular();
    if (contenedor.value && "ResizeObserver" in window) {
      ro = new ResizeObserver(recalcular);
      ro.observe(contenedor.value);
    }
    window.addEventListener("resize", recalcular);
  });

  onBeforeUnmount(() => {
    ro?.disconnect();
    window.removeEventListener("resize", recalcular);
  });

  return { contenedor, zoom };
}
