import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // En Vercel la app se sirve en la raíz ("/"); en GitHub Pages, bajo "/Solaris/".
  // Vercel define la variable de entorno VERCEL=1 durante su build.
  base: process.env.VERCEL ? "/" : "/Solaris/",
});
