export const buildEventsSchema = ({
  events = [],
  canonicalUrl,
  baseUrl,
  breadcrumbId,
  heroImageUrl,
  description,
}: {
  events: any[];
  canonicalUrl: string;
  baseUrl: string;
  breadcrumbId: string;
  heroImageUrl?: string;
  description?: string;
}) => {
  const slice = events.slice(0, 12);

  const itemListElement = slice.map((evento, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Event",
      "@id": `${canonicalUrl}#event-${index + 1}`,
      name:
        evento?.title ||
        evento?.eventType ||
        `Evento ${index + 1}`,
      description:
        evento?.subtitle ||
        evento?.description ||
        "",
      startDate: evento?.startDate,
      endDate: evento?.endDate,
      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: evento?.image?.url
        ? [evento.image.url]
        : undefined,
      location: evento?.locationLabel
        ? {
            "@type": "Place",
            name: evento.locationLabel,
            url: evento?.locationUrlMaps,
          }
        : undefined,
      organizer: { "@id": `${baseUrl}/#organization` },
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name:
          "Eventos MedRent | Congresos, talleres y presentaciones médicas",
        description:
          "Explora congresos, talleres y presentaciones...",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#organization` },
        inLanguage: "es-MX",
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": `${canonicalUrl}#event-list` },
        primaryImageOfPage: heroImageUrl
          ? {
              "@type": "ImageObject",
              url: heroImageUrl,
            }
          : undefined,
      },
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#event-collection`,
        url: canonicalUrl,
        name: "Eventos médicos y de tecnología | MedRent",
        description:
          description ||
          "Eventos médicos, congresos...",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#organization` },
        inLanguage: "es-MX",
        mainEntity: { "@id": `${canonicalUrl}#event-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#event-list`,
        name: "Eventos médicos y de tecnología MedRent",
        itemListOrder:
          "https://schema.org/ItemListUnordered",
        itemListElement,
      },
    ],
  };
};