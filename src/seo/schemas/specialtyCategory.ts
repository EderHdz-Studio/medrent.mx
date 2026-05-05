import { localizePath } from "@lib/locale";

export const buildSpecialtyCategorySchema = ({
  especialidad,
  canonicalUrl,
  baseUrl,
  breadcrumbId,
  logoUrl,
  currentPathname,
  site,
  language,
}: {
  especialidad: any;
  canonicalUrl: string;
  baseUrl: string;
  breadcrumbId: string;
  logoUrl?: string;
  currentPathname: string;
  site?: string | URL;
  language: string;
}) => {
  const subs = Array.isArray(especialidad?.subcategories)
    ? especialidad.subcategories.filter((s: any) => s?.slug)
    : [];
  const specialtyId = `${canonicalUrl}#specialty`;
  const listId = `${canonicalUrl}#applications`;
  const itemListElement = subs.slice(0, 12).map((s: any, index: number) => {
    const subSlug = s?.slug;
    const subUrl = new URL(
      localizePath(`/especialidades/${especialidad?.slug ?? ""}/${subSlug}`, currentPathname),
      site,
    ).toString();
    const subName = s?.name ?? s?.Nombre ?? s?.title ?? "Aplicaci\u00f3n";

    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MedicalSpecialty",
        "@id": `${subUrl}#specialty`,
        name: subName,
        url: subUrl,
      },
      url: subUrl,
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${especialidad?.name ?? "Especialidad"} | Aplicaciones cl\u00ednicas y tecnolog\u00eda m\u00e9dica | MedRent`,
        description:
          especialidad?.heroDescription ||
          "Tecnolog\u00eda m\u00e9dica para diagn\u00f3stico, terapia y rehabilitaci\u00f3n con soporte especializado de MedRent.",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#organization` },
        inLanguage: language,
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": listId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: especialidad?.heroImage || logoUrl,
        },
      },
      {
        "@type": "MedicalSpecialty",
        "@id": specialtyId,
        name: especialidad?.name ?? "Especialidad",
        url: canonicalUrl,
        description: especialidad?.heroDescription,
        relevantSpecialty: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": listId,
        name: `${especialidad?.name ?? "Especialidad"} \u2014 aplicaciones cl\u00ednicas`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement,
      },
    ],
  };
};
