export const asAttributes = (item: any) => {
  if (item?.data && !Array.isArray(item.data)) return asAttributes(item.data);
  return item?.attributes || item || {};
};

export const asCollection = (value: any) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
};

export const isStrictlyActive = (item: any) => {
  const attrs = asAttributes(item);
  return attrs?.isActive === true;
};

export const mediaUrl = (value: any) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value?.url === "string") return value.url;
  if (typeof value?.data?.attributes?.url === "string") return value.data.attributes.url;
  if (typeof value?.data?.url === "string") return value.data.url;
  return null;
};

export const mapProductSummary = (product: any) => {
  const attrs = asAttributes(product);
  return {
    id: product?.id,
    name: attrs?.name ?? "",
    slug: attrs?.slug ?? "",
    isActive: attrs?.isActive,
  };
};

export function isVisibleProduct(product: any, context?: { brand?: any; category?: any; subcategory?: any }) {
  const attrs = asAttributes(product);
  const brand = context?.brand ?? attrs?.brand;
  const subcategory = context?.subcategory ?? attrs?.subcategory;
  const subcategoryAttrs = asAttributes(subcategory);
  const category = context?.category ?? subcategoryAttrs?.category;

  if (attrs?.isActive !== true) return false;
  if (brand && !isStrictlyActive(brand)) return false;
  if (subcategory && !isStrictlyActive(subcategory)) return false;
  if (category && !isStrictlyActive(category)) return false;

  return true;
}

export function filterVisibleProducts(
  products: any[],
  context?: { brand?: any; category?: any; subcategory?: any },
) {
  return products.filter((product) => isVisibleProduct(product, context));
}
