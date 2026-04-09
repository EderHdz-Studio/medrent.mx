import { initGlide } from "@lib/glide";

document.addEventListener("DOMContentLoaded", () => {
  initGlide("#BrandSlider", {
    type: "carousel",
    perView: 8,
    gap: 0,
    autoplay: 2000,
    hoverpause: true,
    rewind: false,
    breakpoints: {
      1024: {
        perView: 4,
      },
      640: {
        perView: 2,
      },
    },
  });

  initGlide("#PromotionSlider", {
    type: "slider",
    perView: 1,
    gap: 0,
    hoverpause: true,
    breakpoints: {
      1024: {
        perView: 1,
      },
      640: {
        perView: 1,
      },
    },
  });

  initGlide("#MetricsSlider", {
    type: "carousel",
    perView: 5,
    gap: 24,
    autoplay: 2000,
    hoverpause: true,
    rewind: false,
    breakpoints: {
      1024: {
        perView: 3,
      },
      640: {
        perView: 1,
      },
    },
  });
});
