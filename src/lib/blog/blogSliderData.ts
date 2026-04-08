import { strapiFetch } from "@server/strapiClient";
import {
    isBlogArticleListed,
    normalizeBlogArticleFromApi,
} from "@lib/strapi/blogArticle";
import { buildClassificationTagByArticleKeyMap } from "./classification";

/** Carrusel: 3 cards por vista en desktop → 9 artículos = 3 “páginas” de avance. */
export const BLOG_SLIDER_ARTICLE_LIMIT = 9;

/**
 * Pedimos más filas de las que mostramos por si el CMS excluye entradas al normalizar;
 * luego nos quedamos con los `BLOG_SLIDER_ARTICLE_LIMIT` más nuevos.
 */
export const BLOG_SLIDER_LIST_QUERY = `/blog-articles?sort=publishedAt:desc&pagination[pageSize]=50&populate[heroImage]=true&populate[writer][populate][avatar]=true`;

/**
 * Listado del carrusel: mismo criterio que `isBlogArticleListed` (Strapi v4 envía campos en `attributes`).
 * Tras ordenar por fecha, solo los N más recientes (`BLOG_SLIDER_ARTICLE_LIMIT`).
 */
export function normalizeArticlesForBlogSlider(raw: unknown): any[] {
  if (!Array.isArray(raw)) return [];
  const list = raw
    .map((entry) => normalizeBlogArticleFromApi(entry))
    .filter((a): a is NonNullable<typeof a> => a != null && isBlogArticleListed(a));
  const sorted = [...list].sort((a: any, b: any) => {
    const tb = new Date(b.publishedAt ?? b.createdAt ?? 0).getTime();
    const ta = new Date(a.publishedAt ?? a.createdAt ?? 0).getTime();
    return tb - ta;
  });
  return sorted.slice(0, BLOG_SLIDER_ARTICLE_LIMIT);
}

export type BlogSliderData = {
  articulos: any[];
  tagByArticleKey: Map<string, string>;
};

/** Artículos del carrusel + mapa de etiquetas (misma lógica en index y eventos). */
export async function fetchBlogSliderData(): Promise<BlogSliderData> {
  let tagByArticleKey = new Map<string, string>();
  let articulos: any[] = [];

  try {
    const [articulosAPI, clsRes] = await Promise.all([
      strapiFetch(BLOG_SLIDER_LIST_QUERY),
      strapiFetch(
        "/article-classifications?pagination[pageSize]=100&sort=tag:asc&populate[articles]=true",
      ).catch(() => ({ data: [] })),
    ]);
    try {
      tagByArticleKey = buildClassificationTagByArticleKeyMap(
        Array.isArray(clsRes?.data) ? clsRes.data : [],
      );
    } catch {
      tagByArticleKey = new Map();
    }
    const raw = articulosAPI?.data ?? articulosAPI ?? [];
    articulos = normalizeArticlesForBlogSlider(raw);
  } catch (e) {
    console.error("Error blog-articles (slider, primario):", e);
    try {
      const fallback = await strapiFetch(
        "/blog-articles?populate=*&sort=publishedAt:desc&pagination[pageSize]=50",
      );
      const raw = fallback?.data ?? [];
      articulos = normalizeArticlesForBlogSlider(raw);
    } catch (e2) {
      console.error("Error blog-articles (slider, fallback):", e2);
      articulos = [];
    }
  }

  return { articulos, tagByArticleKey };
}
