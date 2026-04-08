/**
 * Slugs inválidos (p. ej. producto sin marca en CMS) generaban /nuestras-marcas/undefined.
 */
export function isUsableBrandSlug(slug: unknown): slug is string {
  return (
    typeof slug === "string" &&
    slug.trim().length > 0 &&
    slug !== "undefined" &&
    slug !== "null"
  );
}
