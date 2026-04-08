/**
 * Normaliza entradas de `blog-articles` entre Strapi v4 (attributes / data) y respuestas planas.
 */

export function unwrapStrapiEntry(raw: unknown): Record<string, unknown> | null {
  if (raw == null || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  if ("data" in r && r.data != null) {
    const data = r.data;
    if (Array.isArray(data)) {
      const first = data[0];
      return first != null && typeof first === "object" ? unwrapStrapiEntry(first) : null;
    }
    if (typeof data === "object") {
      return unwrapStrapiEntry(data);
    }
  }

  const attrs = r.attributes;
  if (attrs && typeof attrs === "object") {
    return {
      ...(attrs as Record<string, unknown>),
      id: r.id,
      documentId: r.documentId,
    };
  }

  return r;
}

function unwrapMediaLike(raw: unknown): { url?: string } | undefined {
  const flat = unwrapStrapiEntry(raw);
  if (!flat) return undefined;
  const url = flat.url;
  return typeof url === "string" && url.length > 0 ? { url } : undefined;
}

/** Imagen de cabecera / perfil en Writer (Strapi); distinta del avatar pequeño. */
const WRITER_HERO_MEDIA_KEYS = [
  "heroImage",
  "hero_image",
  "imagenHero",
  "ImagenHero",
  "imageHero",
  "coverImage",
  "cover_image",
  "cover",
  "banner",
  "bannerImage",
  "profileBanner",
  "photo",
  "picture",
] as const;

function firstHeroLikeMediaFromWriter(w: Record<string, unknown>): { url?: string } | undefined {
  for (const key of WRITER_HERO_MEDIA_KEYS) {
    const m = unwrapMediaLike(w[key]);
    if (m?.url) return m;
  }
  return undefined;
}

export type NormalizedWriter = {
  slug?: string;
  fullName?: string;
  shortDescription?: string;
  longDescription?: unknown;
  heroImage?: { url?: string };
  speciality?: string;
  avatar?: { url?: string };
};

export function normalizeWriterFromApi(raw: unknown): NormalizedWriter | undefined {
  const w = unwrapStrapiEntry(raw);
  if (!w) return undefined;
  const slug = typeof w.slug === "string" ? w.slug : undefined;
  const fullName = typeof w.fullName === "string" ? w.fullName : undefined;
  const shortDescription =
    typeof w.shortDescription === "string" ? w.shortDescription : undefined;
  const longDescription = w.longDescription;
  const speciality = typeof w.speciality === "string" ? w.speciality : undefined;
  const heroImage =
    firstHeroLikeMediaFromWriter(w) ??
    unwrapMediaLike(w.heroImage ?? w.hero_image);
  const avatar = unwrapMediaLike(w.avatar);
  return {
    slug,
    fullName,
    shortDescription,
    longDescription,
    heroImage,
    speciality,
    avatar,
  };
}

export type NormalizedBlogArticle = Record<string, unknown> & {
  isActive?: boolean;
  writer?: NormalizedWriter;
  slug?: string;
  title?: string;
  shortDescription?: string;
  createdAt?: string;
  publishedAt?: string;
  heroImage?: { url?: string };
};

export function normalizeBlogArticleFromApi(raw: unknown): NormalizedBlogArticle | null {
  const flat = unwrapStrapiEntry(raw);
  if (!flat) return null;

  const writer = normalizeWriterFromApi(flat.writer ?? flat.author);
  let heroImage = unwrapMediaLike(flat.heroImage ?? flat.hero_image);
  if (!heroImage && flat.heroImage && typeof flat.heroImage === "object") {
    const h = flat.heroImage as Record<string, unknown>;
    if (typeof h.url === "string" && h.url.length > 0) {
      heroImage = { url: h.url };
    }
  }

  return {
    ...flat,
    writer,
    ...(heroImage ? { heroImage } : {}),
  } as NormalizedBlogArticle;
}

/** Visible en listados: no ocultar si el CMS no envía `isActive` explícito. */
export function isBlogArticleListed(a: NormalizedBlogArticle): boolean {
  if (a.isActive === false) return false;
  if (a.isActive === true) return true;
  return Boolean(a.publishedAt || a.createdAt);
}
