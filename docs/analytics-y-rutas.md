# Analytics y rutas de marcas

## Google Tag Manager (SSR)

El snippet de GTM vive en `src/layouts/Layout.astro`. La condición para **no** cargarlo en desarrollo debe basarse en `import.meta.env.DEV`, no en `Astro.url.hostname`.

En despliegues SSR (p. ej. Vercel), `Astro.url` en el servidor no coincide con el dominio público (`www.medrent.mx`). Si se usaba `hostname === "localhost"`, muchas peticiones SSR se clasificaban mal y **el HTML servido no incluía GTM** en rutas con `prerender = false` (blog, catálogo de productos, PLP por marca, subcategorías de especialidades, etc.).

## `/nuestras-marcas/undefined`

Cuando un producto o marca en el CMS no tiene `slug`, las plantillas pueden generar la ruta literal `/nuestras-marcas/undefined`.

- **Redirección:** en `src/pages/nuestras-marcas/[brand].astro`, cualquier slug no usable (vacío, `undefined`, `null` como texto) responde con **301** a `/productos`.
- **Enlaces:** `src/lib/brandSlug.ts` expone `isUsableBrandSlug()` para que tarjetas, navbar, búsqueda, slider de marcas y PDP no enlacen a esa URL; en su lugar se usa texto sin enlace o se apunta a `/productos` según el componente.

Tras desplegar, conviene comprobar con una petición HTTP que `/nuestras-marcas/undefined` devuelva `301` con `Location: /productos`.
