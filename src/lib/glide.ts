import Glide from '@glidejs/glide';

export function initGlide(
  selector: string,
  options: Record<string, any> = {}
) {
  const element = document.querySelector(selector);

  if (!element) return;

  new Glide(element as HTMLElement, options).mount();
}