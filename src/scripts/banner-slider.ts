import Glide from '@glidejs/glide';

const initBannerSlider = () => {
  const slider = document.querySelector<HTMLElement>('#bannerSlider');
  if (!slider || slider.dataset.mounted === 'true') return;

  const progressItems = Array.from(
    slider.querySelectorAll<HTMLElement>('[data-banner-progress-item]')
  );

  const glide = new Glide('#bannerSlider', {
    type: 'carousel',
    perView: 1,
    focusAt: 'center',
    gap: 0,
    autoplay: 8000,
    hoverpause: true,
    rewind: true,
    animationDuration: 700,
    dragThreshold: 80,
    swipeThreshold: 80,
    breakpoints: {
      800: {
        perView: 1,
      },
      480: {
        perView: 1,
      },
    },
  });

  const updateProgress = () => {
    if (!progressItems.length) return;

    progressItems.forEach((item, index) => {
      const fill = item.querySelector<HTMLElement>('.banner-progress__fill');
      if (!fill) return;

      const isActive = index === glide.index;
      fill.classList.toggle('is-active', isActive);

      if (isActive) {
        fill.style.animationPlayState = 'running';
        void fill.offsetWidth;
        fill.classList.add('animate-fill');
      } else {
        fill.classList.remove('animate-fill');
        fill.style.animationPlayState = '';
      }
    });
  };

  const setProgressState = (state: 'paused' | 'running') => {
    progressItems.forEach((item, index) => {
      const fill = item.querySelector<HTMLElement>('.banner-progress__fill');
      if (!fill || !fill.classList.contains('is-active')) return;

      fill.style.animationPlayState = state;
    });
  };

  glide.on(['mount.after', 'run.after'], updateProgress);
  slider.addEventListener('mouseenter', () => setProgressState('paused'));
  slider.addEventListener('mouseleave', () => setProgressState('running'));
  glide.mount();
  slider.dataset.mounted = 'true';
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBannerSlider, { once: true });
} else {
  initBannerSlider();
}
