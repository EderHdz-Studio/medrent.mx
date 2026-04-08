# Página de autor del blog y ruta Team Medrent

## Objetivo

La ruta `/blog/autor/[slug]` muestra el perfil del autor con artículos desde Strapi, alineada visualmente con el listado de productos (grid, “Ver más”, contadores). La entrada **Team Medrent** puede fusionarse con el writer del mismo slug cuando el CMS envía datos en fragmentos.

## Datos (Strapi)

- Los artículos se obtienen de la colección de blog (p. ej. `blog-articles`) con populate de `writer` y metadatos necesarios.
- La normalización vive en `src/lib/strapi/blogArticle.ts`:
  - Soporta formas **v4** (`attributes` / `data`) y respuestas **planas**.
  - **Writer:** se unifican `heroImage` y campos alternativos (hero, cover, banner, etc.); el **avatar** se trata aparte.
  - **Listado:** `isBlogArticleListed()` considera `isActive` y fechas de publicación; si el CMS no envía `isActive`, no se ocultan entradas con fecha válida.

### Retrato en cabecera

1. Imagen “hero” del writer (normalizada).
2. Si no hay hero, **avatar** del writer.
3. Si aún falta, se intenta enriquecer el writer con **`GET /api/writers`** filtrado por `slug` y `populate=*` (requiere `STRAPI_API_TOKEN` en el servidor).
4. Último recurso: bloque de color y favicon, como antes.

En local o sin token, la API pública puede responder **403**; en producción (Vercel) debe configurarse el token para SSR.

## UX: grid y paginación

- Misma lógica de “catálogo”: **9** tarjetas iniciales, botón **“Ver más artículos”** carga **9** más, textos **“Mostrando X de Y”** arriba y abajo.
- Orden de artículos configurable con query `?sort=` (fecha ascendente/descendente).
- Sección **“Otros autores”** con paginación propia.

## Ruta `/team-medrent`

Enlace corto usado en redes o material antiguo:

- **`vercel.json`:** redirección **301** de `/team-medrent` → `/blog/autor/team-medrent`.
- **`src/pages/team-medrent.astro`:** `prerender = false` y `Astro.redirect(..., 301)` para que el adapter SSR registre la ruta y el **301** sea coherente con el despliegue (el comentario en el archivo explica la interacción con el Build Output API).

## Verificación manual

1. `/blog/autor/team-medrent` carga perfil y listado con paginación.
2. `/team-medrent` responde **301** a la URL del autor.
3. Con token en preview/producción, comprobar retrato y lista cuando el writer solo viene completo vía `/writers`.
