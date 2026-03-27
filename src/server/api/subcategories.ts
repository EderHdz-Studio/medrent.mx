import { strapiFetch } from "../strapiClient";

export async function getAllSubcategories() {
  const res = await strapiFetch(
    `/subcategories?populate[category]=true&populate[image]=true`
  );

  return res.data;
}

export async function getSubcategoryBySlug(slug: string) {
  const res = await strapiFetch(
    `/subcategories?filters[slug][$eq]=${slug}&populate[category]=true&populate[image]=true&populate[SEO]=true`
  );

  if (!Array.isArray(res?.data) || !res.data.length) return null;
  return res.data[0];
}