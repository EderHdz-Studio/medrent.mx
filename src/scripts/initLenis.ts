import Lenis from "lenis";

declare global {
  interface Window {
    __LENIS_CONFIG__?: {
      durationDesktop?: number;
      durationTouch?: number;
      smoothTouch?: boolean;
      touchMultiplier?: number;
      wheelMultiplier?: number;
    };
  }
}

const bootLenis = () => {
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const runtimeConfig = window.__LENIS_CONFIG__ || {};

  const lenis = new Lenis({
    duration: isCoarsePointer
      ? runtimeConfig.durationTouch ?? 1.1
      : runtimeConfig.durationDesktop ?? 1.5,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: runtimeConfig.smoothTouch ?? true,
    touchMultiplier: runtimeConfig.touchMultiplier ?? 1,
    wheelMultiplier: runtimeConfig.wheelMultiplier ?? 1.15,
    prevent: (node: HTMLElement) => {
      return !!node?.closest?.("[data-lenis-prevent]");
    },
    autoRaf: false,
  });

  let rafId = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  const start = () => {
    if (!rafId) rafId = requestAnimationFrame(raf);
  };

  const stop = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  window.addEventListener("pagehide", stop);
  // Avoid `beforeunload`: it commonly disqualifies the page from the back/forward cache (Lighthouse bfcache audit).
  start();
};

const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSmallViewport = window.matchMedia("(max-width: 1023px)").matches;
const isElectron = /\bElectron\//.test(navigator.userAgent);

// Keep native scrolling on touch devices, smaller viewports, and reduced-motion users.
if (!isCoarsePointer && !prefersReducedMotion && !isSmallViewport && !isElectron) {
  requestAnimationFrame(bootLenis);
}
