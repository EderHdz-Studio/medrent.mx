# PR 6 — Blog

**Título sugerido:** `feat: blog — hero, filtros, tarjetas y clasificación Strapi`

**Base:** `main`  
**Rama:** `feat/blog`

## Resumen

Mejoras de UX y accesibilidad en índice y artículo de blog, tarjetas y sliders, más utilidades de clasificación contra Strapi.

## Alcance (archivos orientativos)

- `src/pages/blog/index.astro`
- `src/pages/blog/[article].astro`
- `src/pages/blog/autor/[autor].astro`
- `src/components/blog/articleCard.astro`
- `src/components/blog/slideArticles.astro`
- `src/lib/blog/**` (p. ej. `classification.ts`)

> Estilos tipo `.blog-chips-scroll`: si están en `global.css`, incluid solo ese bloque (`git add -p`) o dejadlo para PR 8.

## Verificación

- [ ] `npm run build`
- [ ] Smoke: `/blog`, un artículo, filtros/chips en móvil

## Riesgos

Populate `articleClassification` u otros campos Strapi pueden fallar en build; documentar estado del CMS.
