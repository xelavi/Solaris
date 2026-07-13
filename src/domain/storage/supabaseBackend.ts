// src/domain/storage/supabaseBackend.ts
// Backend de almacenamiento sobre Supabase (Postgres). Implementa la interfaz
// `BackendAlmacen` (ver almacen.ts): un almacén clave→JSON. Se apoya en una
// única tabla `kv (key text primary key, value jsonb, ...)`, de modo que TODO
// lo que hoy guarda la app en localStorage (personajes, criaturas, partidas,
// mapas, etiquetas y sus listas de ids) se persiste sin cambiar el formato.
//
// Se activa desde main.ts solo si están definidas las variables de entorno
// (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Si no, la app sigue usando
// localStorage.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { BackendAlmacen } from "./almacen";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** true si hay credenciales de Supabase configuradas. */
export const supabaseConfigurado = Boolean(url && anonKey);

export const TABLA = "kv";

// Cliente Supabase compartido (singleton). Se reutiliza tanto para el backend
// de almacenamiento como para las suscripciones en tiempo real (Realtime).
let cliente: SupabaseClient | null = null;

/** Devuelve el cliente Supabase compartido, o null si no está configurado. */
export function obtenerClienteSupabase(): SupabaseClient | null {
  if (!supabaseConfigurado) return null;
  if (!cliente) cliente = createClient(url!, anonKey!);
  return cliente;
}

/**
 * Crea el backend de Supabase. Llamar solo cuando `supabaseConfigurado` es true.
 * Cada valor se guarda como JSON (jsonb) bajo su clave; getItem lo re-serializa
 * a string para respetar el contrato de BackendAlmacen.
 */
export function crearBackendSupabase(): BackendAlmacen {
  const sb = obtenerClienteSupabase()!;

  return {
    async getItem(clave) {
      const { data, error } = await sb
        .from(TABLA)
        .select("value")
        .eq("key", clave)
        .maybeSingle();
      if (error) throw error;
      return data ? JSON.stringify(data.value) : null;
    },

    async setItem(clave, valor) {
      const { error } = await sb
        .from(TABLA)
        .upsert({ key: clave, value: JSON.parse(valor) });
      if (error) throw error;
    },

    async removeItem(clave) {
      const { error } = await sb.from(TABLA).delete().eq("key", clave);
      if (error) throw error;
    },
  };
}
