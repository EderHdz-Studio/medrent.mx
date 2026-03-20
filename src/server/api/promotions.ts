import { strapiFetch } from "../strapiClient";

export async function getPromotionSlides() {
  const res = await strapiFetch(
    "/promo-sliders?populate[desktopImage]=true&populate[mobileImage]=true&sort=displayOrder:asc",
  );

  return Array.isArray(res?.data) ? res.data : [];
}
