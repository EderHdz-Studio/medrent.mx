import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_-nNWChc1.mjs';
import { manifest } from './manifest_BNlL1mT7.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/acerca-de-nosotros.astro.mjs');
const _page3 = () => import('./pages/api/contact.astro.mjs');
const _page4 = () => import('./pages/contacto.astro.mjs');
const _page5 = () => import('./pages/especialidades/_slug_.astro.mjs');
const _page6 = () => import('./pages/especialidades.astro.mjs');
const _page7 = () => import('./pages/nuestras-marcas.astro.mjs');
const _page8 = () => import('./pages/sitemap-index.xml.astro.mjs');
const _page9 = () => import('./pages/sitemap-pages.xml.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/acerca-de-nosotros.astro", _page2],
    ["src/pages/api/contact.js", _page3],
    ["src/pages/contacto.astro", _page4],
    ["src/pages/especialidades/[slug].astro", _page5],
    ["src/pages/especialidades/index.astro", _page6],
    ["src/pages/nuestras-marcas.astro", _page7],
    ["src/pages/sitemap-index.xml.ts", _page8],
    ["src/pages/sitemap-pages.xml.ts", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "8008b391-237d-48e9-a2ae-b8bdfde49e1a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
