const STRAPI_URL = import.meta.env.STRAPI_URL;
const STRAPI_API_TOKEN = import.meta.env.STRAPI_API_TOKEN;

const fetchWithCache = async (endpoint: string) => {
  const res = await fetch(`${STRAPI_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    next: {
      revalidate: 300, // ⏱️ cache 5 min
    },
  });

  if (!res.ok) {
    throw new Error("Strapi fetch error");
  }

  return res.json();
};

export const getSiteConfig = async () => {
  try {
    const response = await fetchWithCache("/site-setting?populate=*");
    
    return response?.data || {};
  } catch {
    return {};
  }
};