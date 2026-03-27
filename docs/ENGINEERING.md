# Guía de ingeniería frontend (réplica en repo)

> Copia versionada de las convenciones descritas en `.cursor/rules/medrent-engineering.mdc` (carpeta `.cursor/` está en `.gitignore`). Mantener ambos alineados cuando cambien las reglas.

## Objetivo

Una fuente de verdad por dominio, componentes componibles, tokens compartidos y build Astro/Vite alineado a producción. Normalización **incremental**.

## Atomic design

| Capa | Ubicación típica |
|------|------------------|
| Tokens | `src/styles/global.css`, `src/styles/*-module.css` |
| Átomos / moléculas / organismos | `src/components/**/` |
| Páginas | `src/pages/`, `src/layouts/` |

## Build

- JS: minify esbuild (Vite). CSS: minify en build.
- HTML estático: `compressHTML: true` en `astro.config.mjs`.
- Estilos: `inlineStylesheets: 'auto'`.

## Core Web Vitals

Lighthouse/PageSpeed en producción. Ver tabla en la regla Cursor completa (LCP / INP / CLS).

## Deuda

Tests automatizados pendientes; fuentes WOFF2; Lighthouse CI opcional.
