import { strapiFetch } from "../strapiClient";

export async function getArticles() {
  const allArticles = [];
  let page = 1;
  const pageSize = 25;
  let total = 0;
  let fetched = 0;

  do {
    const params = new URLSearchParams();
    params.append("pagination[page]", String(page));
    params.append("pagination[pageSize]", String(pageSize));
    const url = `/blog-articles?${params.toString()}`;
    const res = await strapiFetch(url);
    const articles = res.data || [];
    allArticles.push(...articles);
    total = res.meta?.pagination?.total || articles.length;
    fetched += articles.length;
    page++;
  } while (fetched < total);
  return allArticles;
}