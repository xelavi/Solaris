---
name: verify
description: Cómo compilar, lanzar y conducir Solaris (Vue + Vite + localStorage) para verificar cambios en ejecución real.
---

# Verificar Solaris

## Compilar / lanzar

- `npx vite build` — bundle sin typecheck (~4 s). **Ojo:** `npm run build` ejecuta `vue-tsc -b` y falla por ~130 errores de tipos preexistentes (ThreePlayground, editorVoxeles, jugarPartida...); no usarlo como señal de un cambio nuevo.
- Servidor dev: `npx vite --port <puerto>` — pero es habitual que el usuario ya tenga uno corriendo en `http://localhost:5173/Solaris/` (base `/Solaris/`, redirige `/` → `/Solaris/`). Comprobar con `curl -sI http://localhost:5173/` antes de arrancar otro.
- Node local es 20.18 (Vite avisa que quiere 20.19+; funciona igualmente).

## Conducir la app

No hay Playwright en el repo. Receta que funciona: en el scratchpad,
`npm i playwright-core` (con `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`) y lanzar
Chrome del sistema:

```js
chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});
```

- Perfil nuevo ⇒ localStorage vacío ⇒ la app arranca en la lista de personajes vacía.
- Todo el estado variable vive en localStorage (claves: `lista_personajes`, `lista_criaturas`, `personaje_en_creacion_id`, `criatura_en_creacion_id`, `catalogo_etiquetas`, y una clave por entidad con su id `personaje_*`/`criatura_*`). Sembrar fixtures con `page.evaluate` + `localStorage.setItem` y recargar es la vía rápida para probar fichas/listas.
- La navegación es por estado interno (sin router): tras recargar siempre se vuelve a "Personajes". Los `confirm`/`alert` nativos se usan para borrar/validar — registrar `page.on("dialog")`.

## Flujos que merece la pena conducir

- Crear personaje: "Nuevo personaje" → escribir en `placeholder="Introduce el nombre..."` → el autoguardado (debounce 500 ms) crea `personaje_en_creacion_id` y la entrada en localStorage. Cambiar de paso y volver debe conservar el estado (estado singleton en `useCharacterCreation`).
- Salir del asistente con personaje incompleto (sin trasfondo/oficio/estilo) lo descarta del almacén.
- Bestiario: crear criatura, guardar (sin nombre ⇒ alert), tarjeta en la lista, ficha.

## Trampas de selectores

- El botón "Bestiario" del nav choca con "← Volver al bestiario": usar `exact: true`.
- El botón de eliminar en las tarjetas solo aparece con hover (`.card:hover`).
- 404 de `favicon.ico` en consola: preexistente (index.html no declara favicon), ignorar.
