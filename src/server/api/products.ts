import { strapiFetch } from "../strapiClient";
import { mapStrapiProduct } from "@lib/domain/product/mapper";
import type { Product } from "@lib/domain/product/types";

export async function getProducts(filters?: {
  brands?: string[];
  categories?: string[];
  subcategories?: string[];
}): Promise<Product[]> {

  const params = new URLSearchParams();

  /* ---------------- POPULATE ---------------- */

  params.append("populate[gallery]", "true");
  params.append("populate[brand]", "true");
  params.append("populate[subcategory][populate][category]", "true");

  /* ---------------- FILTERS ---------------- */

  filters?.brands?.forEach((brand, index) => {
    params.append(
      `filters[brand][slug][$in][${index}]`,
      brand
    );
  });

  filters?.categories?.forEach((category, index) => {
    params.append(
      `filters[subcategory][category][slug][$in][${index}]`,
      category
    );
  });

  filters?.subcategories?.forEach((subcategory, index) => {
    params.append(
      `filters[subcategory][slug][$in][${index}]`,
      subcategory
    );
  });

  /* ---------------- OPTIONAL: ONLY ACTIVE ---------------- */

  params.append("filters[isActive][$eq]", "true");

  /* ---------------- BUILD URL ---------------- */

  const url = `/products?${params.toString()}`;

  const res = await strapiFetch(url);

  return res.data.map(mapStrapiProduct);
}