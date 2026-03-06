import { strapiFetch } from "../strapiClient";

export async function getCategories() {
  const res = await strapiFetch(
    "/categories?populate[subcategories][populate][image]=true&populate[subcategories][populate][products]=true&populate[heroImage]=true&populate[listImage]=true",
  );

  return res.data;
  return res.data.map((c: any) => ({
    id: c.id,
    name: c?.name ?? "",
    slug: c?.slug ?? "",
  }));
}
