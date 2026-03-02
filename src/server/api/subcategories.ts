import { strapiFetch } from "../strapiClient";

export async function getAllSubcategories() {
  const res = await strapiFetch(
    `/subcategories?populate[category]=true&populate[image]=true`
  );

  return res.data;
}