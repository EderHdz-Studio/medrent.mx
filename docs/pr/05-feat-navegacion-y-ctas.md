# PR 5 — Navegación, megamenú y CTAs relacionadas

**Título sugerido:** `feat: navbar, upperbar, breadcrumbs y CTAs sticky/popup`

**Base:** `main`  
**Rama:** `feat/navegacion-y-ctas`

## Resumen

Mejora navegación principal (megamenú, upperbar), breadcrumb unificado y componentes de CTA que acompañan el recorrido de compra (sticky, popup cotización).

## Alcance (archivos orientativos)

- `src/components/layout/header/Navbar.astro`
- `src/components/layout/header/Upperbar.astro`
- `src/components/navigation/Breadcrumb.astro`
- `src/components/layout/overlays/StickyCta.astro`
- `src/components/buttonPDPSticky.astro`
- `src/components/popup/popUpSolicitarCotizacion.astro`

## Verificación

- [ ] `npm run build`
- [ ] Smoke: abrir megamenú, mobile/desktop; breadcrumb en blog y PLP

## Notas

Si `BreadcrumbSchema.astro` lo movéis aquí o al PR 8, mantened coherencia con una sola fuente de verdad para URLs en JSON-LD.
