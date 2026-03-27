import { strapiFetch } from "../strapiClient";

export async function getBrands() {
  const res = await strapiFetch(
    "/brands?fields[0]=name&fields[1]=slug"
  );

  return res.data.map((b: any) => ({
    id: b.id,
    name: b?.name ?? "",
    slug: b?.slug ?? "",
  }));
}

export async function getBrandBySlug(slug: string) {
  const res = await strapiFetch(
    `/brands?filters[slug][$eq]=${slug}&populate[SEO]=true`
  );

  if (!Array.isArray(res?.data) || !res.data.length) return null;
  return res.data[0];
}
