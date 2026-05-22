import { strapiFetch } from "../strapiClient";

const asCollection = (value: any) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
};

const mediaUrl = (value: any) => {
  if (!value) return null;
  if (typeof value?.url === "string") return value.url;
  if (typeof value?.data?.attributes?.url === "string") return value.data.attributes.url;
  if (typeof value?.data?.url === "string") return value.data.url;
  return null;
};

const mapProductSummary = (product: any) => {
  const attrs = product?.attributes || product;
  return {
    id: product?.id,
    name: attrs?.name ?? "",
    slug: attrs?.slug ?? "",
  };
};

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

export async function getBrandBySlug(slug: string) {
  const res = await strapiFetch(
    `/brands?filters[slug][$eq]=${slug}&populate[SEO]=true`
  );

  if (!Array.isArray(res?.data) || !res.data.length) return null;
  return res.data[0];
}

export async function getBrandLandingBySlug(slug: string) {
  const params = new URLSearchParams();

  params.append("filters[slug][$eq]", slug);
  params.append("populate[logo]", "true");
  params.append("populate[SEO]", "true");
  params.append("populate[featuredProducts]", "true");
  params.append("populate[interstitialLogo]", "true");
  params.append("populate[sliderHero][populate][desktopImage]", "true");
  params.append("populate[sliderHero][populate][mobileImage]", "true");
  params.append("populate[interestitialCard][populate][image]", "true");
  params.append("populate[interestitialCard][populate][products]", "true");


  const res = await strapiFetch(`/brands?${params.toString()}`);

  if (!Array.isArray(res?.data) || !res.data.length) return null;

  const brand = res.data[0];
  const attrs = brand.attributes || brand;
  const featuredProducts = asCollection(attrs.featuredProducts).map(mapProductSummary);

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
    sliderHero: asCollection(attrs.sliderHero),
    featuredProducts,
    interestitialCard: asCollection(attrs.interestitialCard)
      .filter((card: any) => card?.isActive ?? true)
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
        const cardProducts = asCollection(card?.products).map(mapProductSummary);
        return {
          id: card.id,
          name: card.name ?? card.title ?? "",
          slug: card.slug ?? "",
          description: card.description ?? "",
          allProducts: card.allProducts ?? false,
          image: mediaUrl(card.image),
          products: card.allProducts ? featuredProducts : cardProducts,
        };
      }),
  };
}
