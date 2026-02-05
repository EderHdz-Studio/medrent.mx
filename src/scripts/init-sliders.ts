import { initGlide } from '@lib/glide';

document.addEventListener('DOMContentLoaded', () => {
   initGlide('#BrandSlider', {
    type: 'carousel',
    perView: 8,
    gap: 0,
    autoplay: 2000, // 2 segundos
    hoverpause: true,
    rewind: false, // para que sea infinito
    breakpoints: {
      1024: {
        perView: 4
      },
      640: {
        perView: 2
      }
    }
  });

  initGlide('#PromotionSlider', {
    type: 'slider',
    perView: 1,
    gap: 0,
    // autoplay: 2000, // 2 segundos
    hoverpause: true,
    //rewind: false, // para que sea infinito
    breakpoints: {
      1024: {
        perView: 1
      },
      640: {
        perView: 1
      }
    }
  });
});