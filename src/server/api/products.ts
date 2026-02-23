import { strapiFetch } from "../strapiClient";
import { mapStrapiProduct } from "@lib/domain/product/mapper";
import type { Product } from "@lib/domain/product/types";

const PLP_POPULATE = `
    ?populate[gallery]=true
    &populate[brand]=true
`.replace(/\s+/g, '');

export async function getProducts(filters?: {
  brand?: string;
  category?: string;
  subcategory?: string;
}): Promise<Product[]> {
  let filterQuery = "";

  if (filters?.brand) {
    filterQuery += `&filters[brand][slug][$eq]=${filters.brand}`;
  }

  if (filters?.category) {
    filterQuery += `&filters[subcategory][category][slug][$eq]=${filters.category}`;
  }

  if (filters?.subcategory) {
    filterQuery += `&filters[subcategory][slug][$eq]=${filters.subcategory}`;
  }

  const res = await strapiFetch(
    `/products${PLP_POPULATE}${filterQuery}`
  );

//   return res.data;
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

