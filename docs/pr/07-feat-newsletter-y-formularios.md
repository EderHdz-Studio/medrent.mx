# PR 7 — Newsletter y formularios base

**Título sugerido:** `feat: módulo newsletter atómico y campos de formulario reutilizables`

**Base:** `main`  
**Rama:** `feat/newsletter-y-formularios`

## Resumen

Refactor de `FormNewsletter` con componentes en `src/components/newsletter/`, estilos en `newsletter-module.css`, y ajustes en campos de formulario compartidos.

## Alcance (archivos orientativos)

- `src/components/FormNewsletter.astro`
- `src/components/newsletter/**`
- `src/styles/newsletter-module.css`
- `src/components/forms/FormField.astro`
- `src/components/forms/PhoneField.astro`
- `src/components/forms/SelectField.astro`
- `src/pages/contacto.astro` (si los cambios son solo formularios)

> Import de `newsletter-module.css` en `global.css`: bloque dedicado; si el PR 8 ya lleva todo `global.css`, coordinar para no duplicar.

## Verificación

- [ ] `npm run build`
- [ ] Smoke: newsletter en página donde se monte; contacto si aplica
