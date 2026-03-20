# Performance Roadmap

## Implemented in codebase

- Added reusable `ImageResponsive` component in `src/components/media/ImageResponsive.astro`:
  - uses `srcset` from Strapi formats when available
  - supports `sizes`, `loading`, `decoding`, and `fetchpriority`
  - preserves `width`/`height` to reduce CLS
- Applied `ImageResponsive` in:
  - `src/components/sections/BrandSlider.astro`
  - `src/components/blog/articleCard.astro`
- Optimized `BrandSlider` runtime:
  - lazy mount with `IntersectionObserver` + `requestIdleCallback`
  - autoplay pause/resume when slider leaves/enters viewport
- Added early connection hints in `src/layouts/Layout.astro`:
  - `preconnect` to `cdn.jsdelivr.net`
  - `preconnect` to `www.googletagmanager.com`
  - font preloads now include `crossorigin`
- Added long-cache headers in `vercel.json` for built assets and static media/font files.

## Pending (external infra / credentials)

- Tiny + Sharp pipeline from Strapi webhooks (compression, AVIF/WebP/JPG, LQIP, upload to object storage).
- CDN image provider integration in Strapi (Cloudinary/ImageKit/Cloudflare Images).
- Global image domain preconnects to final CDN domain (once selected).
- Deferred loading by interaction for heavy embeds (if HubSpot iframe/embed scripts are reintroduced).
- HTML cache policy (`s-maxage` + `stale-while-revalidate`) after agreeing SSR/static strategy with team.

## Validation checklist

- Run `npm run build` and verify all routes compile.
- Run Lighthouse for `/` and key templates (`/productos/[slug]`, `/blog/[article]`).
- Verify LCP images:
  - no `loading="lazy"`
  - `fetchpriority="high"`
  - stable dimensions (`width`/`height` or fixed aspect ratio).
