import { strapiFetch } from "../strapiClient";
import {
  asAttributes,
  asCollection,
  filterVisibleProducts,
  isStrictlyActive,
  mapProductSummary,
  mediaUrl,
} from "./catalogVisibility";

export async function getApplicationsByCategory(categorySlug: string) {
  const res = await strapiFetch(
    `/subcategories?filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}&filters[isActive][$eq]=true&populate[image]=true&populate[SEO]=true&populate[category]=true&populate[products][populate][brand]=true`
  );

  return (res.data ?? []).flatMap((subcategory: any) => {
    const attrs = asAttributes(subcategory);
    const category = attrs.category;
    const products = filterVisibleProducts(asCollection(attrs.products), {
      category,
      subcategory,
    }).map(mapProductSummary);

    if (!isStrictlyActive(subcategory) || !isStrictlyActive(category) || products.length === 0) return [];

    return {
      ...attrs,
      id: subcategory.id,
      image: mediaUrl(attrs.image),
      category,
      products,
    };
  });
  // return res.data.map((a: any) => ({
  //   id: a.id,
  //   name: a.name,
  //   slug: a.slug,
  // }));
}
