import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { configurarBackend } from "./domain/storage/almacen";
import {
  supabaseConfigurado,
  crearBackendSupabase,
} from "./domain/storage/supabaseBackend";

// Si hay credenciales de Supabase (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY),
// la app usa Supabase como backend de datos; si no, sigue con localStorage.
if (supabaseConfigurado) {
  configurarBackend(crearBackendSupabase());
}

createApp(App).mount("#app");
