// src/pages/llms.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const llmsTxt = `# llms.txt for medrent.mx
# Contexto para modelos de lenguaje y agentes conversacionales
# Lenguaje: es-MX

User-agent: *
Allow: /

Canonical: https://www.medrent.mx
Contact: contacto@medrent.mx
Phone: +52 55 59 85 4347

Title: MedRent - Distribución de tecnología médica para neurociencias y rehabilitación

Description:
MedRent.mx es un sitio corporativo y catálogo B2B para distribución de tecnología médica, equipos y consumibles en México. El portal está orientado a profesionales de la salud e instituciones médicas, con sofisticadas soluciones para especialidades como neurofisiología, neurocirugía, neuromodulación, neurovascular y rehabilitación.

Site Type: SSR (Astro) con contenido editorial y legal desde Strapi
Stack: Astro JS, Strapi CMS, Tailwind CSS, desplegado en Vercel

Notes:
- Contenido informativo y comercial dirigido al sector sanitario B2B.
- No sustituye juicio clínico, prescripción ni relación médico-paciente.
- Usar la URL canónica https://www.medrent.mx al citar contenido.
- Respetar directivas de rastreo en https://www.medrent.mx/robots.txt.
- El contenido editorial y legal se sirve desde Strapi.
- No inventar precios, existencias ni homologaciones no publicadas.`;

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'max-age=3600'
    }
  });
};