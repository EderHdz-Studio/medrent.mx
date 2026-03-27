# PR 1 — Documentación y limpieza

**Título sugerido:** `docs: metodología de PRs, guías en repo y limpieza legacy`

**Base:** `main`  
**Rama:** `chore/docs-y-limpieza`

## Resumen

Introduce documentación de ingeniería y testing, metodología de PRs por áreas, y elimina código/archivos muertos sin cambiar comportamiento del sitio.

## Alcance (archivos orientativos)

- `docs/ENGINEERING.md`, `docs/TESTING.md`, `docs/README.md`
- `docs/PR-METHODOLOGY.md`, `docs/pr/*` (índice y cuerpos de PR)
- `.gitignore` (p. ej. `*.log` si no va en otro PR)
- Eliminación de `src/components/layout/header/NavbarOriginal.astro` (sin referencias)

> Si preferís mantener `.gitignore` junto al build, dejad solo docs + borrado en este PR y mové `.gitignore` al PR 2.

## Verificación

- [ ] `npm run build`
- [ ] Sin cambios visuales esperados

## Notas

Actualizad `docs/PR-BODY-integrate-plp-megamenu.md` si queréis que apunte a esta metodología como fuente principal de “cómo partir el trabajo”.
