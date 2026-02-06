// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import alpinejs from "@astrojs/alpinejs";


// https://astro.build/config
export default defineConfig({
  site: 'https://medrent.mx',
  integrations: [alpinejs()],
  vite: {
    plugins: [tailwind()],
    resolve: {
      alias: {
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@lib': '/src/lib',
        '@pages': '/src/pages',
      },
    },
  },
});
