import type { APIRoute } from 'astro';

const BASE_URL = 'https://www.medrent.mx';

const PAGES: { path: string; priority: string }[] = [
    { path: '/', priority: '1.0' },
    //   { path: '/financiamiento', priority: '0.8' },
    { path: '/especialidades', priority: '0.8' },
    { path: '/especialidades/neurocirugia', priority: '0.8' },
    { path: '/especialidades/neurofisiologia', priority: '0.8' },
    { path: '/especialidades/neuromodulacion', priority: '0.8' },
    { path: '/especialidades/rehabilitacion', priority: '0.8' },

    { path: '/aplicaciones', priority: '0.8' },
    { path: '/acerca-de-nosotros', priority: '0.7' },
    { path: '/nuestras-marcas', priority: '0.7' },
    //   { path: '/contacto', priority: '0.9' },
];

export const GET: APIRoute = () => {
  const urls = PAGES.map(
    ({ path, priority }) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <priority>${priority}</priority>
  </url>`
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};