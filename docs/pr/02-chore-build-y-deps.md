# PR 2 — Build, dependencias y despliegue

**Título sugerido:** `chore: Astro, Vercel y dependencias alineadas al entorno`

**Base:** `main` (tras merge del PR 1 si tocó `.gitignore`)  
**Rama:** `chore/build-y-deps`

## Resumen

Alinea toolchain de build y despliegue: Astro, Vite, lockfile y configuración Vercel, sin features de producto.

## Alcance (archivos orientativos)

- `package.json`, `package-lock.json`
- `astro.config.mjs`
- `vercel.json`
- `src/types/glider-js.d.ts`
- `.vscode/settings.json` (solo si el equipo versiona preferencias compartidas)

## Verificación

- [ ] `npm run build`
- [ ] Revisar que el output de Vercel/local no rompe rutas estáticas

## Riesgos

Cambios de minify/target pueden afectar CWV; validar en preview si hay regresiones en CSS/JS.
