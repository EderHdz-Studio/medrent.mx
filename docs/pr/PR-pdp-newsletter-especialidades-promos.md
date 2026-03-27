# PR: PDP — newsletter, promociones, especialidades, títulos y enlaces

**Rama:** `feature/pdp-mejoras` → `main` (repo `Ederhdz/medrent`)

**Commit:** `842d1cd` — `feat(pdp): newsletter, promociones, especialidades y títulos unificados`

## Resumen

Mejoras en la ficha de producto (PDP), datos compartidos de especialidades para el home y estandarización de titulares de sección.

## Cambios

### PDP (`src/pages/productos/[slug].astro`)

- Newsletter (`FormNewsletter`) al final del contenido, antes del footer.
- Orden inferior: **Productos relacionados** → **Promociones** (`PromotionSlider` + `getPromotionSlides`) → **Especialidades** (slider).
- `PromotionSlider` con `disableHorizontalPadding` y `pdpSectionTitle` para alinear padding y tipografía con el resto de la PDP.

### Especialidades

- Nuevo `src/lib/homeEspecialidades.ts`: lista única `HOME_ESPECIALIDADES` + `getHomeEspecialidadesForSlider()` (sin Consumibles en el carrusel).
- Nuevo `src/components/sections/EspecialidadesSlider.astro`: Glide con la misma UX que `ProductSlider` (contador, flechas, alturas).
- Enlaces **Ver aplicaciones** → `/especialidades/{slug}` (hub de aplicaciones), no PLP por query.

### Home (`src/pages/index.astro`)

- Importa `HOME_ESPECIALIDADES`; mismos enlaces a `/especialidades/{slug}` en el mosaico.

### Promociones (`PromotionSlider.astro`)

- Props opcionales: `disableHorizontalPadding`, `pdpSectionTitle`.

### Tipografía PDP

- `src/styles/global.css`: variable `--Schemes-On-Surface`, clase `.pdp-section-title` (24px / 32px / 700 / Lato).
- Aplicada en: `ProductSlider`, `TechnicalSheet`, bloques de especificaciones y FAQ en PDP, y título de promos en PDP vía prop.

## Integración con `main`

La rama `feature/pdp-mejoras` está basada en el historial del fork; **`main` de `Ederhdz/medrent` tiene commits adicionales**. Al fusionar puede haber conflictos (p. ej. `ProductSlider`, `Layout`, `Navbar`). Conviene **actualizar la rama con `main`** (merge o rebase) y resolver en local antes del merge final.

## Checklist

- [ ] `npm run build`
- [ ] Revisar PDP con y sin promociones en Strapi
- [ ] Revisar enlaces a especialidades

## Review

Para **@Ederhdz** o quien mantenga `Ederhdz/medrent`.
