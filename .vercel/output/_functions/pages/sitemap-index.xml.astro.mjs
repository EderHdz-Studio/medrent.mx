export { renderers } from '../renderers.mjs';

const BASE_URL = "https://www.medrent.mx";
const GET = () => {
  const sitemaps = [
    `${BASE_URL}/sitemap-pages.xml`
    // FUTURE SITEMAPS (V2)
    // `${BASE_URL}/sitemap-products.xml`,
    // `${BASE_URL}/sitemap-blog.xml`,
  ];
  const sitemapEntries = sitemaps.map(
    (url) => `
            <sitemap>
                <loc>${url}</loc>
            </sitemap>`
  ).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${sitemapEntries}
        </sitemapindex>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
