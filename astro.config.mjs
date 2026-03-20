import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import alpinejs from "@astrojs/alpinejs";
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.medrent.mx',
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
  },
  adapter: vercel(),
});