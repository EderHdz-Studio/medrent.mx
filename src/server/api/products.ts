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

const PDP_POPULATE = `
    &populate[gallery]=true
    &populate[documents]=true
    &populate[benefit][populate][icon]=true
    &populate[faqItem]=true
    &populate[technicalSheet][populate][technicalFeature]=true
    &populate[technicalSpecifications]=true
    &populate[relatedConsumables][populate][gallery]=true
    &populate[relatedProducts][populate][gallery]=true
    &populate[relatedProducts][populate][brand]=true
    &populate[variants]=true
    &populate[subcategory]=true
    &populate[brand]=true
`.replace(/\s+/g, '');

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await strapiFetch(
    `/products?filters[slug][$eq]=${slug}${PDP_POPULATE}`
  );

  if (!res.data.length) return null;

//   return res.data[0];
  return mapStrapiProduct(res.data[0]);
}