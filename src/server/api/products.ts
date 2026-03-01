import { strapiFetch } from "../strapiClient";
import { mapStrapiProduct } from "@lib/domain/product/mapper";
import type { Product } from "@lib/domain/product/types";

const PLP_POPULATE = `
    ?populate[gallery]=true
    &populate[brand]=true
`.replace(/\s+/g, '');
export async function getProducts(filters?: {
  brands?: string[];
  categories?: string[];
  subcategories?: string[];
}): Promise<Product[]> {

  const params = new URLSearchParams();

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

  const queryString = params.toString();
  const url = `/products${PLP_POPULATE}${queryString ? `&${queryString}` : ""}`;

  const res = await strapiFetch(url);

  return res.data.map(mapStrapiProduct);
}