# Metodología de pull requests (MedRent)

Objetivo: **integrar cambios en trozos revisables**, mantener `main` estable y permitir optimización continua sin un único PR gigante.

## Principios

1. **Un eje por PR** — Un cambio debe tener una historia clara (p. ej. “PLP”, “blog”, “capa Strapi”). Si hace falta explicar dos cosas no relacionadas, conviene partir.
2. **Tamaño** — Ideal: diff que un revisor entienda en **15–30 minutos**. Si supera ~400–600 líneas útiles, valorar partir por dominio o por commit.
3. **Convenciones de commit** — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:` (Conventional Commits). El título del PR puede repetir el del commit principal.
4. **CI verde** — Cada PR debe pasar `npm run build` (y lo que defináis en CI) **antes** de merge.
5. **Sin sorpresas en `main`** — Evitar mezclar “refactor masivo + feature nueva + bump de deps” en el mismo merge si se puede.

## Orden sugerido (dependencias)

Cuando partís **una sola rama grande**, el orden importa para reducir conflictos al cherry-pick o al apilar PRs:

```mermaid
flowchart LR
  A[01 Docs y limpieza] --> B[02 Build y deps]
  B --> C[03 Datos Strapi]
  C --> D[04 PLP]
  D --> E[05 Navegación]
  E --> F[06 Blog]
  F --> G[07 Newsletter y formularios]
  G --> H[08 Layout SEO y carcasa]
```

- **01** no bloquea nada; puede ir primero.
- **02** (Astro, Vercel, lockfile) conviene temprano para que el resto compile igual que en producción.
- **03** alimenta páginas que consumen API; muchas features lo asumen.
- **04–07** son dominios de producto en orden razonable (catálogo → descubrimiento → contenido → captación).
- **08** suele tocar **`Layout.astro`**, **schemas SEO**, **`global.css`** y muchas páginas: va **al final** o cuando el resto ya está en `main`, para minimizar rebases en CSS compartido.

## Apilado de PRs (stacked)

Dos formas habituales:

| Enfoque | Cuándo usarlo |
|--------|----------------|
| **Ramas secuenciales desde `main`** | Cherry-picks o PRs pequeños mergeados uno tras otro; cada uno sale de `main` actualizado. |
| **Stack (PR B apunta a rama de PR A)** | GitHub permite base distinta de `main`; cuando A mergea, retargetear B a `main` y resolver conflictos. |

Para equipos pequeños, **merge lineal desde `main`** con ramas cortas suele ser más simple que stacks largos.

## Archivos compartidos (`global.css`, `Layout.astro`)

- **`global.css`**: muchas features añaden tokens o utilidades. Opciones:
  - **A)** Un PR dedicado a “estilos globales” al final (recomendado si ya tenéis todo en una rama: **08**).
  - **B)** Partir con `git add -p` y llevar solo el bloque de cada feature en su PR (más trabajo, menos conflicto al final).
- **`Layout.astro`**: si solo cambia SEO/meta, puede ir con **08**. Si un feature necesita un slot nuevo, documentarlo en el PR de ese feature y aceptar un rebase.

## Checklist por PR

- [ ] Descripción enlaza al doc `docs/pr/NN-*.md` o resume alcance en 3–5 viñetas.
- [ ] `npm run build` local (o CI).
- [ ] Capturas o nota “sin cambio visual” si aplica.
- [ ] Riesgos conocidos (API Strapi, env vars) en la descripción.

## Crecimiento futuro del proyecto

- **Features nuevas**: mismo criterio — PR por dominio (p. ej. “checkout”, “cuenta”, “nuevo listado”).
- **Refactor global**: fase aparte, acordada; no mezclar con features salvo que sea imprescindible.
- **Tests**: cuando existan, cada PR que toque lógica debería añadir o actualizar tests en el mismo PR (ver `TESTING.md`).

## Índice de cuerpos de PR listos para pegar

Ver **[docs/pr/README.md](./pr/README.md)**.
