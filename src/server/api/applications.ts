import { strapiFetch } from "../strapiClient";

export async function getApplicationsByCategory(categorySlug: string) {
  const res = await strapiFetch(
    `/subcategories?filters[category][slug][$eq]=${categorySlug}&populate[image]=true&populate[SEO]=true&populate[category]=true&populate[products]=true`
  );

  return res.data;
  // return res.data.map((a: any) => ({
  //   id: a.id,
  //   name: a.name,
  //   slug: a.slug,
  // }));
}