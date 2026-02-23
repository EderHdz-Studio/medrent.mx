export const prerender = false;
import type { APIRoute } from "astro";

const STRAPI_URL = import.meta.env.STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN;

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const slug = params.slug?.join("/") ?? "";
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
    return new Response(
      JSON.stringify({ error: "Strapi proxy failed" }),
      { status: 500 }
    );
  }
};
