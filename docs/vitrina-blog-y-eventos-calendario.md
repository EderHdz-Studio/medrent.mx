# Vitrina de blog (home / eventos) y calendario en Eventos

Notas para **Paz**, **Eder** y quien mantenga estas piezas.

## Vitrina de artículos (`SlideArticles`)

- **Archivo:** `src/components/blog/slideArticles.astro`
- **Datos:** `src/lib/blog/blogSliderData.ts` — función `fetchBlogSliderData()` usada en **home** (`index.astro`) y **eventos** (`eventos.astro`).
- **Contenido:** hasta **9** artículos, los más recientes (`publishedAt` / `createdAt`). Normalización Strapi v4 con `normalizeBlogArticleFromApi` + `isBlogArticleListed` (no filtrar solo por `attributes` a mano).
- **UI:** carrusel **sin Glide** en esta vitrina: fila con `flex` + `overflow-x-auto`, **3 cards** visibles en `lg`, 2 en `sm`, 1 en móvil. Flechas avanzan un bloque completo; contador y igualado de altura de cards en cliente.
- **CSS global:** en `global.css` solo padding en `.sliderArticulosRelacionados .glide__slide` por si otras secciones siguen usando Glide (`ArticleRelatedMobile`, PDP, etc.).

## Glide (resto del sitio)

- **Layout:** `src/layouts/Layout.astro` importa `@glidejs/glide/dist/css/glide.core.min.css` en el bundle para sliders que **sí** usan Glide (marcas, promos, productos, relacionados móvil, etc.).

## Eventos — sincronía calendario ↔ lista

- **Archivo:** `src/pages/eventos.astro` (script cliente).
- **Problema resuelto:** el mes del calendario no debe adelantarse (p. ej. a abril) mientras el usuario **sigue leyendo marzo** en la lista.
- **Lógica:** `getEventosMonthKeyClosestToListAnchor()` usa el **último** mes cuyo título `[data-month-toggle]` ya **cruzó** la línea bajo el header (`getLayoutHeaderOffsetPx() + 56`), no la distancia mínima al centro del título.

## Commits / PR

- Incluir pruebas manuales: home y `/eventos` — vitrina con varias cards y scroll; en eventos, scroll largo en un mes con muchos eventos y comprobar que el mes del calendario solo cambia al llegar al siguiente bloque.
