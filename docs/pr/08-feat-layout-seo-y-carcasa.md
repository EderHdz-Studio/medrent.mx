# PR 8 — Layout, SEO, home y carcasa del sitio

**Título sugerido:** `feat: Layout, schemas SEO, estilos globales y páginas marketing`

**Base:** `main`  
**Rama:** `feat/layout-seo-y-carcasa`

## Resumen

Cierra la integración visual y de plantilla: `Layout`, meta/OG, JSON-LD, `global.css`, home, marcas, legales, sliders, footer e imagen responsive donde aplique.

## Alcance (archivos orientativos)

- `src/layouts/Layout.astro`
- `src/components/seo/BreadcrumbSchema.astro`
- `src/components/seo/OrganizationSchema.astro`
- `src/components/seo/WebSiteSchema.astro`
- `src/styles/global.css`
- `src/scripts/initLenis.ts`
- `src/pages/index.astro`
- `src/pages/acerca-de-nosotros.astro`
- `src/pages/eventos.astro`
- `src/pages/financiamiento.astro`
- `src/pages/nuestras-marcas/index.astro`
- `src/pages/nuestras-marcas/[brand].astro`
- `src/pages/[legal_page].astro`
- `src/components/layout/footer/Footer.astro`
- `src/components/sections/BrandSlider.astro`
- `src/components/sections/ProductSlider.astro`
- `src/components/sections/PromotionSlider.astro`
- `src/components/media/ImageResponsive.astro`
- `docs/performance-roadmap.md` (si no fue en PR 1)

## Verificación

- [ ] `npm run build`
- [ ] Smoke: home, una marca, GTM/meta en vista fuente si aplica
- [ ] Lighthouse rápido en home (opcional)

## Notas

Este PR suele ser el **más propenso a conflictos** si otros PRs tocaron `global.css` o `Layout.astro`. Por eso va al final en la metodología recomendada.
