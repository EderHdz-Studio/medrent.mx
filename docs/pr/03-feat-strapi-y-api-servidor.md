# PR 3 — Capa de datos Strapi y API

**Título sugerido:** `feat: cliente Strapi, endpoints servidor y proxy API`

**Base:** `main`  
**Rama:** `feat/strapi-y-api-servidor`

## Resumen

Centraliza acceso a Strapi (`strapiClient`), endpoints en `src/server/api/*` y proxy bajo `src/pages/api/strapi/*` para que las páginas consuman datos de forma coherente.

## Alcance (archivos orientativos)

- `src/server/strapiClient.ts`
- `src/server/api/brands.ts`
- `src/server/api/promotions.ts`
- `src/server/api/subcategories.ts`
- `src/pages/api/strapi/[...slug].ts`
- `src/lib/utils.js` (helpers de imágenes Strapi, fechas, slugs — usados en varias vistas)

> Si `utils.js` mezcla lógica no Strapi y queréis PR más pequeño, extraed funciones a módulos por dominio en un follow-up.

## Verificación

- [ ] `npm run build`
- [ ] Llamadas a marcas/promociones/subcategorías responden en dev (según env)

## Riesgos

Errores 400 por `populate` o campos Strapi pueden aparecer en build SSR; documentar en el PR si son conocidos.
