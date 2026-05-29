import { strapiFetch } from "../strapiClient";
import { getProducts } from "./products";
import {
  asAttributes,
  asCollection,
  isStrictlyActive,
  mapProductSummary,
  mediaUrl,
} from "./catalogVisibility";

export async function getBrands() {
  const [res, visibleProducts] = await Promise.all([
    strapiFetch("/brands?populate=*"),
    getProducts(),
  ]);

  const productsByBrandSlug = new Map<string, any[]>();
  visibleProducts.forEach((product: any) => {
    const brandSlug = product?.brand?.slug;
    if (!brandSlug) return;
    const products = productsByBrandSlug.get(brandSlug) ?? [];
    products.push(product);
    productsByBrandSlug.set(brandSlug, products);
  });

  return (res.data ?? []).flatMap((brand: any) => {
    const attrs = asAttributes(brand);
    const brandProducts = productsByBrandSlug.get(attrs.slug) ?? [];

    if (!isStrictlyActive(brand) || brandProducts.length === 0) return [];

    return {
      id: brand.id,
      name: attrs?.name ?? "",
      slug: attrs?.slug ?? "",
      isActive: attrs?.isActive,
      displayOrder: attrs?.displayOrder,
      primaryColor: attrs?.primaryColor,
      textColor: attrs?.textColor,
      title: attrs?.title,
      description: attrs?.description,
      logo: attrs?.logo,
      logoUrl: mediaUrl(attrs?.logo),
      categories: asCollection(attrs?.categories),
      brandEspecialties: asCollection(attrs?.brandEspecialties),
      products: brandProducts.map(mapProductSummary),
    };
  });
}

export async function getBrandBySlug(slug: string) {
  const res = await strapiFetch(
    `/brands?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[SEO]=true`
  );

  if (!Array.isArray(res?.data) || !res.data.length) return null;
  return isStrictlyActive(res.data[0]) ? res.data[0] : null;
}

export async function getBrandLandingBySlug(slug: string) {
  const params = new URLSearchParams();

  params.append("filters[slug][$eq]", slug);
  params.append("populate[logo]", "true");
  params.append("populate[SEO][populate][ogImage]", "true");
  params.append("populate[products][populate][subcategory][populate][category]", "true");
  params.append("populate[featuredProducts][populate][subcategory][populate][category]", "true");
  params.append("populate[interstitialLogo]", "true");
  params.append("populate[sliderHero][populate][desktopImage]", "true");
  params.append("populate[sliderHero][populate][mobileImage]", "true");
  params.append("populate[interestitialCard][populate][image]", "true");
  params.append("populate[interestitialCard][populate][products][populate][subcategory][populate][category]", "true");


  const res = await strapiFetch(`/brands?${params.toString()}`);

  if (!Array.isArray(res?.data) || !res.data.length) return null;

  const brand = res.data[0];
  const attrs = asAttributes(brand);
  const brandProducts = await getProducts({ brands: [attrs.slug] });
  if (!isStrictlyActive(brand) || brandProducts.length === 0) return null;

  const visibleProductBySlug = new Map(brandProducts.map((product) => [product.slug, product]));
  const featuredProducts = asCollection(attrs.featuredProducts)
    .map(mapProductSummary)
    .map((product) => visibleProductBySlug.get(product.slug))
    .filter(Boolean)
    .map(mapProductSummary);

  return {
    id: brand.id,
    name: attrs.name ?? "",
    slug: attrs.slug ?? "",
    title: attrs.title ?? "",
    description: attrs.description ?? "",
    primaryColor: attrs.primaryColor ?? "#ffffff",
    interstitialColor: attrs.interstitialColor ?? attrs.primaryColor ?? "#00827F",
    logo: attrs.logo,
    logoUrl: mediaUrl(attrs.logo),
    interstitialLogo: mediaUrl(attrs.interstitialLogo),
    seoTitle: attrs.SEO?.seoTitle ?? attrs.SEO?.title ?? "",
    seoDescription: attrs.SEO?.seoDescription ?? attrs.SEO?.description ?? "",
    seoOgImage: attrs.SEO?.ogImage?.url ?? "/OG_Default_Medrent.jpeg",
    sliderHero: asCollection(attrs.sliderHero),
    featuredProducts,
    interestitialCard: asCollection(attrs.interestitialCard)
      .filter((card: any) => isStrictlyActive(card))
      .sort((a: any, b: any) => {
        const normalizeOrder = (value: unknown) => {
          const order = Number(value ?? 0);
          return order > 0 ? order : Number.MAX_SAFE_INTEGER;
        };
        const orderA = normalizeOrder(a?.order ?? a?.displayOrder);
        const orderB = normalizeOrder(b?.order ?? b?.displayOrder);
        return orderA - orderB;
      })
      .map((card: any) => {
        const cardProducts = asCollection(card?.products)
          .map(mapProductSummary)
          .map((product) => visibleProductBySlug.get(product.slug))
          .filter(Boolean);
        const products = card.allProducts ? brandProducts : cardProducts;
        return {
          id: card.id,
          name: card.name ?? card.title ?? "",
          slug: card.slug ?? "",
          description: card.description ?? "",
          allProducts: card.allProducts ?? false,
          image: mediaUrl(card.image),
          isActive: card.isActive,
          products: products.map(mapProductSummary),
        };
      })
      .filter((card: any) => card.products.length > 0),
  };
}
