import { strapiFetch } from "../strapiClient";
import { mapStrapiProduct } from "@lib/domain/product/mapper";
import type { Product } from "@lib/domain/product/types";
import { isVisibleProduct } from "./catalogVisibility";

export async function getProducts(filters?: {
  slugs?: string[];
  brands?: string[];
  categories?: string[];
  subcategories?: string[];
}): Promise<Product[]> {
  const allProducts: Product[] = [];
  let page = 1;
  let pageSize = 25;
  let total = 0;
  let fetched = 0;

  do {
    const params = new URLSearchParams();

    /* ---------------- POPULATE ---------------- */

    params.append("populate[gallery]", "true");
    params.append("populate[brand]", "true");
    params.append("populate[subcategory][populate][category]", "true");

    /* ---------------- FILTERS ---------------- */

    filters?.slugs?.forEach((slug, index) => {
      params.append(
        `filters[slug][$in][${index}]`,
        slug
      );
    });

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

    params.append("pagination[page]", String(page));
    params.append("pagination[pageSize]", String(pageSize));
    const url = `/products?${params.toString()}`;

    const res = await strapiFetch(url);
    const rawProducts = Array.isArray(res.data) ? res.data : [];
    const products = rawProducts.filter(isVisibleProduct).map(mapStrapiProduct);
    allProducts.push(...products);
    // Actualizar meta
    total = res.meta?.pagination?.total || products.length;
    fetched += rawProducts.length;
    page++;
  } while (fetched < total);
  return allProducts;
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
    `/products?filters[slug][$eq]=${encodeURIComponent(slug)}&filters[isActive][$eq]=true${PDP_POPULATE}`
  );

  if (!res.data.length) return null;

//   return res.data[0];
  const product = res.data.find(isVisibleProduct);
  return product ? mapStrapiProduct(product) : null;
}
