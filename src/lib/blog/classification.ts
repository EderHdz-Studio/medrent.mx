/** Formato anidado Strapi v4/v5: `{ data: { id, attributes } }`. */
function unwrapStrapiRelation(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const data = r.data;
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    const attrs = d.attributes;
    if (attrs && typeof attrs === "object") {
      return { ...(attrs as Record<string, unknown>), id: d.id, documentId: d.documentId };
    }
    return d as Record<string, unknown>;
  }
  return r;
}

/** Relación Strapi blog-articles → article-classification (nombre del campo puede variar). */
export function getArticleClassificationRef(article: Record<string, unknown> | null | undefined) {
  if (!article || typeof article !== "object") return null;
  const a = article as Record<string, unknown>;
  const raw =
    a.articleClassification ??
    a.article_classification ??
    a.classification ??
    a.classifications ??
    a.articleClassificationRelation;
  if (Array.isArray(raw)) {
    const first = raw[0];
    return unwrapStrapiRelation(first) ?? (typeof first === "object" && first ? (first as Record<string, unknown>) : null);
  }
  return unwrapStrapiRelation(raw);
}

function classificationTagFromRef(ref: Record<string, unknown>): string {
  const tag =
    (ref.tag as string | undefined) ??
    (ref.TAG as string | undefined) ??
    ((ref.attributes as Record<string, unknown> | undefined)?.tag as string | undefined);
  return typeof tag === "string" ? tag.trim() : "";
}

/** Lista de artículos enlazados desde una entrada de clasificación (campo `articles` en el CMS). */
function unwrapArticlesArray(raw: unknown): Record<string, unknown>[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((item) => unwrapStrapiRelation(item) ?? (typeof item === "object" && item ? (item as Record<string, unknown>) : null))
      .filter((x): x is Record<string, unknown> => x != null);
  }
  if (typeof raw === "object") {
    const r = raw as Record<string, unknown>;
    const data = r.data;
    if (Array.isArray(data)) {
      return data
        .map((item) => unwrapStrapiRelation(item) ?? (typeof item === "object" && item ? (item as Record<string, unknown>) : null))
        .filter((x): x is Record<string, unknown> => x != null);
    }
    if (data && typeof data === "object" && !Array.isArray(data)) {
      const one = unwrapStrapiRelation(data) ?? (data as Record<string, unknown>);
      return [one];
    }
  }
  return [];
}

function articleLookupKeys(art: Record<string, unknown>): string[] {
  const keys: string[] = [];
  const id = art.id;
  const documentId = art.documentId;
  const slug = art.slug;
  if (id != null) keys.push(String(id));
  if (documentId != null) keys.push(String(documentId));
  if (typeof slug === "string" && slug) keys.push(`slug:${slug}`);
  return keys;
}

/**
 * Mapa artículo → TAG usando la relación inversa en el CMS (cada clasificación tiene `articles`).
 * Necesario cuando `blog-articles` no devuelve la relación hacia la clasificación.
 */
export function buildClassificationTagByArticleKeyMap(
  classificationsFromCms: unknown[] | null | undefined,
): Map<string, string> {
  const map = new Map<string, string>();
  const list = Array.isArray(classificationsFromCms) ? classificationsFromCms : [];
  for (const raw of list) {
    const c = unwrapStrapiRelation(raw) ?? (raw as Record<string, unknown>);
    const tag = tagFromClassificationEntry(c);
    if (!tag) continue;
    const articlesRaw =
      c.articles ?? c.blog_articles ?? c.blogArticles ?? c.blog_article ?? c.article;
    for (const art of unwrapArticlesArray(articlesRaw)) {
      for (const key of articleLookupKeys(art)) {
        map.set(key, tag);
      }
    }
  }
  return map;
}

/** Etiqueta visible (TAG en CMS). Opcional: mapa inverso desde clasificaciones con `articles` poblados. Fallback: subcategoría legada. */
export function getClassificationTag(
  article: Record<string, unknown> | null | undefined,
  tagByArticleKey?: Map<string, string> | null,
): string {
  const ref = getArticleClassificationRef(article);
  if (ref && typeof ref === "object") {
    const t = classificationTagFromRef(ref);
    if (t) return t;
  }
  if (tagByArticleKey && article && typeof article === "object") {
    const a = article as Record<string, unknown>;
    for (const key of articleLookupKeys(a)) {
      const found = tagByArticleKey.get(key);
      if (found) return found;
    }
  }
  const sub = article?.subcategory as Record<string, unknown> | undefined;
  const name = sub?.name as string | undefined;
  return typeof name === "string" ? name : "";
}

export function classificationRefId(ref: Record<string, unknown> | null | undefined): string | number | null {
  if (!ref || typeof ref !== "object") return null;
  const id = ref.id ?? ref.documentId ?? (ref.attributes as Record<string, unknown> | undefined)?.id;
  if (typeof id === "number" || typeof id === "string") return id;
  return null;
}

function tagFromClassificationEntry(c: Record<string, unknown>): string {
  return (
    (c.tag as string | undefined) ??
    (c.TAG as string | undefined) ??
    ((c.attributes as Record<string, unknown> | undefined)?.tag as string | undefined) ??
    ""
  ).trim();
}

function idTagFromClassificationEntry(c: Record<string, unknown>): string {
  return (
    (c.idTag as string | undefined) ??
    (c.idtag as string | undefined) ??
    (c.IDTAG as string | undefined) ??
    ((c.attributes as Record<string, unknown> | undefined)?.idTag as string | undefined) ??
    ""
  ).trim();
}

export type ClassificationChip = {
  id: string | number;
  tag: string;
  idTag: string;
  count: number;
};

/**
 * Id estable de clasificación para filtrar en cliente (coincide con `data-classification-id` en chips).
 * Prioriza la relación en el artículo; si falta, empareja por tag con `chips` del CMS o fallback.
 */
export function getArticleClassificationIdString(
  article: Record<string, unknown> | null | undefined,
  chips: ClassificationChip[],
  tagByArticleKey?: Map<string, string> | null,
): string {
  const ref = getArticleClassificationRef(article);
  const rid = classificationRefId(ref);
  if (rid != null) return String(rid);
  const tag = getClassificationTag(article, tagByArticleKey);
  if (!tag) return "";
  const chip = chips.find((c) => c.tag === tag);
  return chip ? String(chip.id) : "";
}

/** Cuenta artículos activos por clasificación; si la lista del CMS viene vacía, agrupa por etiqueta desde artículos. */
export function buildClassificationChips(
  classificationsFromCms: unknown[] | null | undefined,
  activeArticles: Record<string, unknown>[],
  tagByArticleKey?: Map<string, string> | null,
): ClassificationChip[] {
  const articles = Array.isArray(activeArticles) ? activeArticles : [];
  const list = Array.isArray(classificationsFromCms) ? classificationsFromCms : [];

  if (list.length > 0) {
    const built = list
      .map((raw, idx) => {
        const c = unwrapStrapiRelation(raw) ?? (raw as Record<string, unknown>);
        const id = (c.id ?? c.documentId ?? `classification-${idx}`) as string | number;
        const tag = tagFromClassificationEntry(c);
        const idTag = idTagFromClassificationEntry(c);
        const count = articles.filter((a) => getClassificationTag(a, tagByArticleKey) === tag).length;
        return { id, tag, idTag, count };
      })
      .filter((x) => x.tag);
    if (built.length > 0) return built;
  }

  const map = new Map<string, number>();
  for (const a of articles) {
    const label = getClassificationTag(a, tagByArticleKey);
    if (!label) continue;
    map.set(label, (map.get(label) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([tag, count], i) => ({
    id: `fallback-${i}`,
    tag,
    idTag: tag,
    count,
  }));
}

export function formatChipCount(n: number): string {
  return n < 10 ? String(n).padStart(2, "0") : String(n);
}
