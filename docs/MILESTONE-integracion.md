# Hito: integración PLP · blog · newsletter · Strapi (marzo 2026)

Rama canónica: **`feature/integrate-plp-megamenu`**  
Remoto de trabajo: fork **`Gio-vidaurri/medrent`** → PR hacia **`Ederhdz/medrent`** (`main` o la base acordada).

## Qué incluye esta versión

| Área | Contenido |
|------|-----------|
| PLP / catálogo | Listados unificados, rutas de especialidades, componentes de producto |
| Navegación | Navbar / megamenú, upperbar, CTAs sticky, limpieza `NavbarOriginal` |
| Blog | Índice (filtros, chips, SSR/cliente), artículo, autor, `lib/blog/classification` |
| Newsletter | Módulo atómico + `newsletter-module.css` |
| UI global | Breadcrumb, `global.css`, home / acerca / marcas |
| Build | Astro 5, Vite/minify, utilidades `utils.js` |
| Docs | `ENGINEERING.md`, `TESTING.md`, `PR-METHODOLOGY.md`, `docs/pr/*` |
| **Fixes Strapi** | Populate válido en home, `blog/index` y `blog/[article]`; vitrina en home no vacía marcas/promos si falla el blog |

## Commits recientes atómicos (sobre la integración previa)

1. `docs:` guías + metodología PRs + limpieza  
2. `chore(build):` astro + utils  
3. `feat(plp):` layout + especialidades  
4. `feat(blog):` filtros, clasificación, cards  
5. `feat(newsletter):` módulo  
6. `feat(ui):` breadcrumb + global + páginas clave  
7. `fix(strapi):` blog índice + artículo populate  
8. `fix(home):` vitrina blog + separación de cargas  

## PR único de merge

Usar el texto en **[PR-BODY-integrate-plp-megamenu.md](./PR-BODY-integrate-plp-megamenu.md)** (actualizado con sección “Versión final”).

Para dividir el trabajo en PRs más chicos en el futuro: **[pr/README.md](./pr/README.md)** + **[PR-METHODOLOGY.md](./PR-METHODOLOGY.md)**.

## Verificación antes de merge

- `npm run build`
- Home: vitrina blog con tarjetas; `/blog` índice y un artículo
- Una PLP y una PDP
