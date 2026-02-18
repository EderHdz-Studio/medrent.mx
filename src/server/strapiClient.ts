const STRAPI_URL = import.meta.env.STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN;

export async function strapiFetch(path: string) {
    console.log(`Fetching from Strapi: ${STRAPI_URL}${path}`);
  const res = await fetch(`${STRAPI_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Strapi error ${res.status}: ${error}`);
  }

  return res.json();
}
