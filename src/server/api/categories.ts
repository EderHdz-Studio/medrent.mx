import { strapiFetch } from "../strapiClient";
import {
  asAttributes,
  asCollection,
  filterVisibleProducts,
  isStrictlyActive,
  mapProductSummary,
  mediaUrl,
} from "./catalogVisibility";

export async function getCategories() {
  const params = new URLSearchParams();

  params.append("filters[isActive][$eq]", "true");
  params.append("populate[subcategories][sort][0]", "order:asc");
  params.append("populate[subcategories][populate][image]", "true");
  params.append("populate[subcategories][populate][products][populate][brand]", "true");
  params.append("populate[figure]", "true");
  params.append("populate[heroImage]", "true");
  params.append("populate[listImage]", "true");
  params.append("populate[sliderHero][populate][desktopImage]", "true");
  params.append("populate[sliderHero][populate][mobileImage]", "true");

  const res = await strapiFetch(`/categories?${params.toString()}`);

  // Mapear los datos correctamente
  return (
    res.data?.flatMap((c: any) => {
      const attrs = asAttributes(c);
      if (!isStrictlyActive(c)) return [];

      const subcategories =
        asCollection(attrs.subcategories).flatMap((sub: any) => {
          const subAttrs = asAttributes(sub);
          if (!isStrictlyActive(sub)) return [];

          const products = filterVisibleProducts(asCollection(subAttrs.products), {
            category: c,
            subcategory: sub,
          }).map(mapProductSummary);

          if (products.length === 0) return [];

          return {
            id: sub.id,
            name: subAttrs.name ?? "",
            slug: subAttrs.slug ?? "",
            image: mediaUrl(subAttrs.image),
            description: subAttrs.description ?? "",
            isActive: subAttrs.isActive,
            products,
          };
        }) ?? [];

      if (subcategories.length === 0) return [];

      return {
        id: c.id,
        name: attrs.name ?? "",
        slug: attrs.slug ?? "",
        isActive: attrs.isActive,
        figure: { url: mediaUrl(attrs.figure) },
        listImage: mediaUrl(attrs.listImage),
        heroImage: mediaUrl(attrs.heroImage),
        shortDescription: attrs.shortDescription ?? "",
        heroDescription: attrs.heroDescription ?? attrs.description ?? "",
        sliderHero: attrs.sliderHero,
        subcategories,
      };
    }) ?? []
  );
}
