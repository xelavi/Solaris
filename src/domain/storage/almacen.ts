// src/domain/storage/almacen.ts
// Acceso ASÍNCRONO a los datos variables (personajes, criaturas, partidas,
// mapas, etiquetas). Toda la app pasa por aquí en lugar de tocar el backend
// directamente.
//
// El backend es INTERCAMBIABLE: hoy es localStorage (envuelto en promesas);
// mañana puede ser Supabase implementando la misma interfaz `BackendAlmacen`.
// Para migrar a Supabase basta con implementar el backend (una tabla clave→JSON,
// o una tabla por colección) y llamar a `configurarBackend(supabaseBackend)` en
// el arranque (main.ts). Ni los repos ni los componentes cambian.

/**
 * Contrato mínimo de almacenamiento clave→valor. Cualquier backend (localStorage,
 * Supabase, IndexedDB...) que lo implemente es intercambiable sin tocar el resto
 * de la aplicación.
 */
export interface BackendAlmacen {
  getItem(clave: string): Promise<string | null>;
  setItem(clave: string, valor: string): Promise<void>;
  removeItem(clave: string): Promise<void>;
}

/** Backend por defecto: el localStorage del navegador, envuelto en promesas. */
const backendLocalStorage: BackendAlmacen = {
  getItem: (clave) => Promise.resolve(localStorage.getItem(clave)),
  setItem: (clave, valor) => {
    localStorage.setItem(clave, valor);
    return Promise.resolve();
  },
  removeItem: (clave) => {
    localStorage.removeItem(clave);
    return Promise.resolve();
  },
};

let backend: BackendAlmacen = backendLocalStorage;

/**
 * Cambia el backend de almacenamiento. Llamar una sola vez en el arranque, antes
 * de que se lea/escriba nada (p. ej. `configurarBackend(crearBackendSupabase(...))`).
 */
export function configurarBackend(nuevo: BackendAlmacen): void {
  backend = nuevo;
}

export async function leerJSON<T>(clave: string): Promise<T | null> {
  const json = await backend.getItem(clave);
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.error(`Error al leer "${clave}":`, error);
    return null;
  }
}

export async function guardarJSON(clave: string, valor: unknown): Promise<void> {
  await backend.setItem(clave, JSON.stringify(valor, null, 2));
}

export async function eliminarClave(clave: string): Promise<void> {
  await backend.removeItem(clave);
}

// --- Colecciones: una clave contiene la lista de IDs y cada elemento se
// guarda en su propia clave (el patrón usado por personajes y criaturas). ---

export async function leerListaIds(claveLista: string): Promise<string[]> {
  return (await leerJSON<string[]>(claveLista)) ?? [];
}

export async function agregarAListaIds(
  claveLista: string,
  id: string,
): Promise<void> {
  const lista = await leerListaIds(claveLista);
  if (!lista.includes(id)) {
    lista.push(id);
    await guardarJSON(claveLista, lista);
  }
}

export async function quitarDeListaIds(
  claveLista: string,
  id: string,
): Promise<void> {
  const lista = await leerListaIds(claveLista);
  await guardarJSON(
    claveLista,
    lista.filter((elemento) => elemento !== id),
  );
}

// --- Punteros de sesión (síncronos, SIEMPRE en localStorage) ---
// El puntero "en creación" (personaje/criatura que el asistente está editando)
// es estado LOCAL del dispositivo, no un dato compartido: debe seguir en
// localStorage aunque el backend de datos sea Supabase, para que la reanudación
// de la creación sea por-dispositivo y no requiera ida y vuelta a la red.

export function leerPunteroLocal(clave: string): string | null {
  return localStorage.getItem(clave);
}

export function guardarPunteroLocal(clave: string, valor: string): void {
  localStorage.setItem(clave, valor);
}

export function eliminarPunteroLocal(clave: string): void {
  localStorage.removeItem(clave);
}
