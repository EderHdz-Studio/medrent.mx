import { strapiFetch } from "../strapiClient";

export async function getCategories() {
  const res = await strapiFetch(
    "/categories?populate[subcategories][sort][0]=order:asc&populate[subcategories][populate][image]=true&populate[subcategories][populate][products]=true&populate[figure]=true&populate[heroImage]=true&populate[listImage]=true&populate[sliderHero][populate][desktopImage]=true&populate[sliderHero][populate][mobileImage]=true&filters[isActive][$eq]=true",
  );

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

  // Mapear los datos correctamente
  return (
    res.data?.map((c: any) => {
      const attrs = c.attributes || c;
      return {
        id: c.id,
        name: attrs.name ?? "",
        slug: attrs.slug ?? "",
        isActive: attrs.isActive ?? true,
        figure: { url: mediaUrl(attrs.figure) },
        listImage: mediaUrl(attrs.listImage),
        heroImage: mediaUrl(attrs.heroImage),
        heroDescription: attrs.heroDescription ?? attrs.description ?? "",
        sliderHero: attrs.sliderHero,
        subcategories:
          asCollection(attrs.subcategories).flatMap((sub: any) => {
            const subAttrs = sub.attributes || sub;
            const products = asCollection(subAttrs.products).map((prod: any) => ({
              id: prod.id,
              name: prod.attributes?.name ?? prod.name,
              slug: prod.attributes?.slug ?? prod.slug,
            }));

            if (products.length === 0) return [];

            return {
              id: sub.id,
              name: subAttrs.name ?? "",
              slug: subAttrs.slug ?? "",
              image: mediaUrl(subAttrs.image),
              description: subAttrs.description ?? "",
              products,
            };
          }) ?? [],
      };
    }) ?? []
  );
}
