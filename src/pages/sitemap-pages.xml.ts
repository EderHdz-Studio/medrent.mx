import type { APIRoute } from "astro";
import { getCategories } from "@server/api/categories";

const BASE_URL = "https://www.medrent.mx";

/** Páginas estáticas del sitio (sin `/aplicaciones`: no existe ruta; el hub real es `/especialidades`). */
const STATIC_PAGES: { path: string; priority: string }[] = [
  { path: "/", priority: "1.0" },
  { path: "/especialidades", priority: "0.8" },
  { path: "/productos", priority: "0.9" },
  { path: "/blog", priority: "0.85" },
  { path: "/contacto", priority: "0.75" },
  { path: "/eventos", priority: "0.7" },
  { path: "/acerca-de-nosotros", priority: "0.7" },
  { path: "/nuestras-marcas", priority: "0.7" },
  { path: "/financiamiento", priority: "0.8" },
];

/** Si Strapi no responde en el request del sitemap, no omitir especialidades conocidas. */
const FALLBACK_ESPECIALIDADES: { path: string; priority: string }[] = [
  { path: "/especialidades/neurocirugia", priority: "0.8" },
  { path: "/especialidades/neurofisiologia", priority: "0.8" },
  { path: "/especialidades/neuromodulacion", priority: "0.8" },
  { path: "/especialidades/neurovascular", priority: "0.8" },
  { path: "/especialidades/rehabilitacion", priority: "0.8" },
];

async function getEspecialidadPaths(): Promise<{ path: string; priority: string }[]> {
  try {
    const categories = await getCategories();
    if (!Array.isArray(categories) || categories.length === 0) {
      return FALLBACK_ESPECIALIDADES;
    }
    const paths = categories
      .map((c: { slug?: string }) => c?.slug)
      .filter(
        (slug): slug is string =>
          typeof slug === "string" && slug.trim().length > 0 && slug !== "undefined" && slug !== "null",
      )
      .map((slug) => ({ path: `/especialidades/${slug}`, priority: "0.8" }));
    return paths.length > 0 ? paths : FALLBACK_ESPECIALIDADES;
  } catch {
    return FALLBACK_ESPECIALIDADES;
  }
}

function mergePages(
  staticPages: { path: string; priority: string }[],
  dynamic: { path: string; priority: string }[],
): { path: string; priority: string }[] {
  const byPath = new Map<string, { path: string; priority: string }>();
  for (const p of staticPages) {
    byPath.set(p.path, p);
  }
  for (const p of dynamic) {
    byPath.set(p.path, p);
  }
  return Array.from(byPath.values()).sort((a, b) => {
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;
    return a.path.localeCompare(b.path);
  });
}

export const GET: APIRoute = async () => {
  const especialidades = await getEspecialidadPaths();
  const pages = mergePages(STATIC_PAGES, especialidades);

  const urls = pages
    .map(
      ({ path, priority }) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
