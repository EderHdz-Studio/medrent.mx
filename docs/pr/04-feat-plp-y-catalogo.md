# PR 4 — PLP y catálogo (especialidades / productos)

**Título sugerido:** `feat: listados PLP, filtros y rutas de catálogo`

**Base:** `main`  
**Rama:** `feat/plp-y-catalogo`

## Resumen

Unifica experiencia de listados de productos: layout PLP, tarjetas, filtros, texto SEO y rutas bajo especialidades y productos.

## Alcance (archivos orientativos)

- `src/components/product/PLPLayout.astro`
- `src/components/product/PLPProductsSection.astro`
- `src/components/product/PLPSeoText.astro`
- `src/components/product/ProductCard.astro`
- `src/components/product/SidebarFilters.astro`
- `src/pages/especialidades/index.astro`
- `src/pages/especialidades/[category]/index.astro`
- `src/pages/especialidades/[category]/[subcategory]/index.astro`
- `src/pages/productos/index.astro`
- `src/pages/productos/[slug].astro`

> No incluir aquí `global.css` completo si ya está partido: usad `git add -p` solo para estilos PLP, o dejad CSS PLP para el PR 8.

## Verificación

- [ ] `npm run build`
- [ ] Smoke: una categoría, una subcategoría, PDP

## Dependencias

Idealmente mergeado después del PR 3 si las páginas dependen de datos/API nuevos.
