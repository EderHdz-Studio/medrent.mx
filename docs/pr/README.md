# PRs sugeridos (cuerpos listos para GitHub/GitLab)

**Merge único de hito:** usá [PR-BODY-integrate-plp-megamenu.md](../PR-BODY-integrate-plp-megamenu.md) + [MILESTONE-integracion.md](../MILESTONE-integracion.md).

---

Orden de merge recomendado y archivos **orientativos** según `git diff main` en la rama de integración. Ajustá rutas si tu diff difiere.

| Orden | Rama sugerida | Documento |
|------|----------------|-----------|
| 1 | `chore/docs-y-limpieza` | [01-chore-documentacion-y-limpieza.md](./01-chore-documentacion-y-limpieza.md) |
| 2 | `chore/build-y-deps` | [02-chore-build-y-deps.md](./02-chore-build-y-deps.md) |
| 3 | `feat/strapi-y-api-servidor` | [03-feat-strapi-y-api-servidor.md](./03-feat-strapi-y-api-servidor.md) |
| 4 | `feat/plp-y-catalogo` | [04-feat-plp-y-catalogo.md](./04-feat-plp-y-catalogo.md) |
| 5 | `feat/navegacion-y-ctas` | [05-feat-navegacion-y-ctas.md](./05-feat-navegacion-y-ctas.md) |
| 6 | `feat/blog` | [06-feat-blog.md](./06-feat-blog.md) |
| 7 | `feat/newsletter-y-formularios` | [07-feat-newsletter-y-formularios.md](./07-feat-newsletter-y-formularios.md) |
| 8 | `feat/layout-seo-y-carcasa` | [08-feat-layout-seo-y-carcasa.md](./08-feat-layout-seo-y-carcasa.md) |

**Metodología** (principios, `global.css`, stacks): [PR-METHODOLOGY.md](../PR-METHODOLOGY.md).

### Cómo usar esto con una sola rama grande

1. Desde `main`, creá la rama del PR 1 y traé solo los cambios de ese alcance (`git checkout -p`, cherry-pick, o commits atómicos desde el principio).
2. Merge a `main`, actualizá local, repetí con PR 2 desde `main`, etc.
3. Si ya tenéis todo en una rama: podés abrir PRs apilados o un único PR grande; estos docs sirven para **dividir antes del merge** o para **documentar** el alcance por área.
