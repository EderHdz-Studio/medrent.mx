export const prerender = false;
import type { APIRoute } from "astro";

const RAW_STRAPI_URL = import.meta.env.STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN;

function normalizeStrapiBaseUrl(rawUrl: string) {
  const trimmed = (rawUrl || "").replace(/\/+$/, "");
  if (!trimmed) return "";
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

const STRAPI_URL = normalizeStrapiBaseUrl(RAW_STRAPI_URL);

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const slugParam = params.slug;
    const slug = Array.isArray(slugParam)
      ? slugParam.join("/")
      : slugParam ?? "";
    const query = new URL(request.url).search;

    const url = `${STRAPI_URL}/${slug}${query}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Log detallado para depurar el origen del 500 (DNS/red/config),
    // sin incluir el token.
    console.log("Strapi proxy failed:", {
      message: error instanceof Error ? error.message : String(error),
    });
    return new Response(
      JSON.stringify({ error: "Strapi proxy failed" }),
      { status: 500 }
    );
  }
};
