import { strapiFetch } from "../strapiClient";

export async function getCategories() {
  const res = await strapiFetch(
    "/categories?fields[0]=name&fields[1]=slug"
  );

  return res.data.map((c: any) => ({
    id: c.id,
    name: c?.name ?? "",
    slug: c?.slug ?? "",
  }));
}
