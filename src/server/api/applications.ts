import { strapiFetch } from "../strapiClient";

export async function getApplicationsByCategory(categorySlug: string) {
  const res = await strapiFetch(
    `/subcategories?filters[category][slug][$eq]=${categorySlug}&fields[0]=name&fields[1]=slug`
  );

  return res.data.map((a: any) => ({
    id: a.id,
    name: a.name,
    slug: a.slug,
  }));
}