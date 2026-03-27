# PR: Blog — página artículo, relacionados y sistema tipográfico (marzo 2026)

> **Pegar en GitHub** al abrir el PR desde el fork (`compare` = `feature/blog-articulo`) hacia la base acordada (p. ej. `main` o `feature/integrate-plp-megamenu`).  
> **Título sugerido:** `feat(blog): artículo — relacionados móvil/desktop, tipografía Medrent y fixes UI`

## Resumen

PR centrado en la **página de artículo del blog** y sus bloques relacionados: breadcrumb, cabecera, cuerpo (Strapi blocks), aside de relacionados desktop, carrusel relacionado móvil/tablet, página autor, newsletter al pie y sistema tipográfico Medrent aplicado en blog.

**Base sugerida:** `feature/integrate-plp-megamenu` (o `main` si ya se integró).

---

## 1. Página de artículo (`blog/[article].astro`)

### Cabecera y estructura
- **Breadcrumb:** INICIO → BLOG → ARTÍCULO (`Breadcrumb.astro` con `class` opcional en `<nav>`).
- **Clasificación:** rótulo (eyebrow) en verde; **16px** entre rótulo y título.
- **Título:** `.blog-article-hero-title` — 28px/36px móvil, 32px/40px desktop, Lato 700.
- **Lead y fecha** según diseño.

### Compartir (SocialMedia)
- Fila en móvil; título “Compartir” con **headline/small** (24px / 32px) en `< lg`.
- Aside desktop: **headline/medium** (28px / 36px) con `.blog-aside-section-title`.

### Cuerpo (Strapi blocks, `.dinamicContent`)
- **h2:** 24/32 móvil, 28/36 desktop, peso 700; `strong` a 700.
- **Enlaces en texto:** color primario, subrayado; bloque Acreditado por excluido.

### Relacionados
- **Criterio:** clasificación CMS (tag) → subcategoría → recientes; excluye artículo actual.
- **Desktop (aside):** tarjetas horizontales; `.blog-related-card-title` (Medrent/title/medium, 16px/24px, letter-spacing 0.15px), subrayado **solo en hover**; **4px** entre rótulo y título (Figma).
- **Móvil/tablet (`< lg`):** `ArticleRelatedMobile.astro` — Glide + `ArticleCard`; `.blog-article-related-heading` (24/32); **16px** entre título “Relacionados” y card.

### Grilla y newsletter
- `gap-4` apilado móvil, `lg:gap-6` en dos columnas.
- **Newsletter:** ancho completo **debajo** del `main`, pegado al footer (no en aside).

### Autor
- Total de artículos activos del escritor (Strapi + fallback); copy “N artículo(s)”.

---

## 2. Página autor (`blog/autor/[autor].astro`)

- Paginación ampliada para conteos/listado.
- JSON-LD `numberOfItems` coherente con el total real cuando aplica.

---

## 3. Componentes y estilos

| Archivo | Cambios |
|---------|---------|
| `ArticleRelatedMobile.astro` | Nuevo: Glide 1/2 col, ArticleCard, controles tipo slideArticles |
| `articleCard.astro` | Espaciado categoría–título (16px en carrusel móvil) |
| `SocialMedia.astro` | Sin cambios de lógica; headline responsive vía CSS |
| `Breadcrumb.astro` | `class` opcional en `<nav>` |
| `global.css` | `.blog-article-hero-title`, `.blog-article-related-heading`, `.blog-related-card-title/excerpt`, `.dinamicContent` (h2/strong/enlaces), SocialMedia móvil headline/small |

---

## 4. Verificación

- [ ] `npm run build` OK
- [ ] `/blog` y un artículo en preview; relacionado móvil y desktop
- [ ] Tipografía y espaciados según Figma
