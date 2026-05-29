import { strapiFetch } from "../strapiClient";
import {
  asAttributes,
  asCollection,
  filterVisibleProducts,
  isStrictlyActive,
  mapProductSummary,
  mediaUrl,
} from "./catalogVisibility";

export async function getAllSubcategories() {
  const res = await strapiFetch(
    `/subcategories?filters[isActive][$eq]=true&populate[category]=true&populate[image]=true&populate[products][populate][brand]=true`
  );

  return (res.data ?? []).flatMap((sub: any) => {
    const attrs = asAttributes(sub);
    const category = attrs.category;
    const products = filterVisibleProducts(asCollection(attrs.products), {
      category,
      subcategory: sub,
    }).map(mapProductSummary);

    if (!isStrictlyActive(sub) || !isStrictlyActive(category) || products.length === 0) return [];

    return {
      id: sub.id,
      name: attrs.name ?? "",
      slug: attrs.slug ?? "",
      isActive: attrs.isActive,
      image: mediaUrl(attrs.image),
      category,
      products,
    };
  });
}

export async function getSubcategoryBySlug(slug: string) {
  const res = await strapiFetch(
    `/subcategories?filters[slug][$eq]=${encodeURIComponent(slug)}&filters[isActive][$eq]=true&populate[category]=true&populate[image]=true&populate[SEO]=true&populate[products][populate][brand]=true`
  );

  if (!Array.isArray(res?.data) || !res.data.length) return null;
  const subcategory = res.data[0];
  const attrs = asAttributes(subcategory);
  const category = attrs.category;
  const products = filterVisibleProducts(asCollection(attrs.products), {
    category,
    subcategory,
  }).map(mapProductSummary);

  if (!isStrictlyActive(subcategory) || !isStrictlyActive(category) || products.length === 0) return null;

  return {
    ...attrs,
    id: subcategory.id,
    image: mediaUrl(attrs.image),
    category,
    products,
  };
}
