import { strapiFetch } from "../strapiClient";

export async function getCategories() {
  const res = await strapiFetch(
    "/categories?populate[subcategories][populate][image]=true&populate[subcategories][populate][products]=true&populate[heroImage]=true&populate[listImage]=true&filters[isActive][$eq]=true",
  );

  // Mapear los datos correctamente
  return (
    res.data?.map((c: any) => {
      const attrs = c.attributes || c;
      return {
        id: c.id,
        name: attrs.name ?? "",
        slug: attrs.slug ?? "",
        isActive: attrs.isActive ?? true,
        listImage: attrs.listImage?.url ?? null,
        heroImage: attrs.heroImage?.url ?? null,
        subcategories:
          attrs.subcategories?.data?.map((sub: any) => {
            const subAttrs = sub.attributes || sub;
            return {
              id: sub.id,
              name: subAttrs.name ?? "",
              slug: subAttrs.slug ?? "",
              image: subAttrs.image?.url ?? null,
              products:
                subAttrs.products?.data?.map((prod: any) => ({
                  id: prod.id,
                  name: prod.attributes?.name ?? prod.name,
                  slug: prod.attributes?.slug ?? prod.slug,
                })) ?? [],
            };
          }) ?? [],
      };
    }) ?? []
  );
}
