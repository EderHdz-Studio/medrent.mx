import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import alpinejs from "@astrojs/alpinejs";
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

/**
 * Build producción: Vite minifica JS (esbuild) y CSS en el pipeline.
 * HTML estático: compressHTML reduce marcado (no sustituye optimización de imágenes/fonts).
 * @see .cursor/rules/medrent-engineering.mdc
 */
export default defineConfig({
  site: 'https://www.medrent.mx',
  compressHTML: true,
  build: {
    /** auto: inline CSS pequeño; CSS grande en archivo (balance LCP / caché) */
    inlineStylesheets: 'auto',
  },
  integrations: [alpinejs(), react()],
  vite: {
    plugins: [tailwind()],
    resolve: {
      alias: {
        '@components': '/src/components',
        '@server': '/src/server',
        '@layouts': '/src/layouts',
        '@lib': '/src/lib',
        '@pages': '/src/pages',
      },
    },
    build: {
      /** Producción: minify por defecto es esbuild; explícito para documentación */
      minify: 'esbuild',
      cssMinify: true,
      target: 'es2020',
    },
  },
  adapter: vercel(),
});