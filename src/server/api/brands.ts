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
