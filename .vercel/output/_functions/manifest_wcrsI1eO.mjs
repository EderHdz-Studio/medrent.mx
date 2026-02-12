import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_ogVGQPpc.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BVTGhsCs.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/Eder/Documents/GitHub/medrent.mx/","cacheDir":"file:///Users/Eder/Documents/GitHub/medrent.mx/node_modules/.astro/","outDir":"file:///Users/Eder/Documents/GitHub/medrent.mx/dist/","srcDir":"file:///Users/Eder/Documents/GitHub/medrent.mx/src/","publicDir":"file:///Users/Eder/Documents/GitHub/medrent.mx/public/","buildClientDir":"file:///Users/Eder/Documents/GitHub/medrent.mx/dist/client/","buildServerDir":"file:///Users/Eder/Documents/GitHub/medrent.mx/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"acerca-de-nosotros/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/acerca-de-nosotros","isIndex":false,"type":"page","pattern":"^\\/acerca-de-nosotros\\/?$","segments":[[{"content":"acerca-de-nosotros","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/acerca-de-nosotros.astro","pathname":"/acerca-de-nosotros","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contacto/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contacto","isIndex":false,"type":"page","pattern":"^\\/contacto\\/?$","segments":[[{"content":"contacto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacto.astro","pathname":"/contacto","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"especialidades/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/especialidades","isIndex":true,"type":"page","pattern":"^\\/especialidades\\/?$","segments":[[{"content":"especialidades","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/especialidades/index.astro","pathname":"/especialidades","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"nuestras-marcas/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/nuestras-marcas","isIndex":false,"type":"page","pattern":"^\\/nuestras-marcas\\/?$","segments":[[{"content":"nuestras-marcas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nuestras-marcas.astro","pathname":"/nuestras-marcas","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DogxaioH.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DogxaioH.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.js","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DogxaioH.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/sitemap-index.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap-index\\.xml\\/?$","segments":[[{"content":"sitemap-index.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap-index.xml.ts","pathname":"/sitemap-index.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DogxaioH.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/sitemap-pages.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap-pages\\.xml\\/?$","segments":[[{"content":"sitemap-pages.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap-pages.xml.ts","pathname":"/sitemap-pages.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://medrent.mx","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/Eder/Documents/GitHub/medrent.mx/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/Eder/Documents/GitHub/medrent.mx/src/pages/acerca-de-nosotros.astro",{"propagation":"none","containsHead":true}],["/Users/Eder/Documents/GitHub/medrent.mx/src/pages/contacto.astro",{"propagation":"none","containsHead":true}],["/Users/Eder/Documents/GitHub/medrent.mx/src/pages/especialidades/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/Eder/Documents/GitHub/medrent.mx/src/pages/especialidades/index.astro",{"propagation":"none","containsHead":true}],["/Users/Eder/Documents/GitHub/medrent.mx/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/Eder/Documents/GitHub/medrent.mx/src/pages/nuestras-marcas.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/acerca-de-nosotros@_@astro":"pages/acerca-de-nosotros.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@js":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/contacto@_@astro":"pages/contacto.astro.mjs","\u0000@astro-page:src/pages/especialidades/[slug]@_@astro":"pages/especialidades/_slug_.astro.mjs","\u0000@astro-page:src/pages/especialidades/index@_@astro":"pages/especialidades.astro.mjs","\u0000@astro-page:src/pages/nuestras-marcas@_@astro":"pages/nuestras-marcas.astro.mjs","\u0000@astro-page:src/pages/sitemap-index.xml@_@ts":"pages/sitemap-index.xml.astro.mjs","\u0000@astro-page:src/pages/sitemap-pages.xml@_@ts":"pages/sitemap-pages.xml.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_wcrsI1eO.mjs","/Users/Eder/Documents/GitHub/medrent.mx/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B9hChwxy.mjs","astro:scripts/page.js":"_astro/page.DogxaioH.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/acerca-de-nosotros.LQLkBliU.css","/apple-touch-icon.png","/favicon-16x16.png","/favicon-32x32.png","/favicon-512.png","/favicon.ico","/humans.txt","/llms.txt","/robots.txt","/_astro/page.DogxaioH.js","/fonts/Lato-Bold.ttf","/fonts/Lato-Regular.ttf","/temp/Financiamiento.png","/temp/FinanciamientoMobile.png","/temp/Logotipo_Medrent.png","/temp/bg-404.png","/temp/categorias/img - especialidad-1.png","/temp/categorias/img - especialidad-2.png","/temp/categorias/img - especialidad-3.png","/temp/categorias/img - especialidad-4.png","/temp/categorias/img - especialidad-5.png","/temp/categorias/img - especialidad.png","/temp/especialidades/Neurocirugia.jpg","/temp/especialidades/Neurofisiologia.jpg","/temp/especialidades/Neuromodulacion.jpg","/temp/especialidades/Neurovascular.jpg","/temp/especialidades/Rehabilitacion.jpg","/temp/especialidades/especialidadesHero.png","/temp/promociones/image 1.png","/temp/marcas/Ambu.png","/temp/marcas/Astar.png","/temp/marcas/Cadwell.png","/temp/marcas/Deymed.png","/temp/marcas/Electrocap.png","/temp/marcas/Esaote.png","/temp/marcas/Hasomed - Logotipo.png","/temp/marcas/Luciole medical.png","/temp/marcas/NE.png","/temp/marcas/Physiomed.png","/temp/marcas/Rehacom.png","/temp/marcas/Rimed.png","/temp/marcas/Samsung Medison.png","/temp/marcas/Spine Guard - logotipo.png","/temp/marcas/Syneika - Logotipo.png","/temp/marcas/Weaver.png","/temp/marcas/spes.png","/temp/marcas/tVNS Health - Logotipo.png","/temp/especialidades/neurocirugia/Mconsumibles.png","/temp/especialidades/neurocirugia/Mguia-dinamica-cirugia.png","/temp/especialidades/neurocirugia/Mmicroscopio-exoscopio.png","/temp/especialidades/neurocirugia/Mneuronavegacion.png","/temp/especialidades/neurocirugia/consumibles.png","/temp/especialidades/neurocirugia/guia-dinamica-cirugia.png","/temp/especialidades/neurocirugia/hero.png","/temp/especialidades/neurocirugia/microscopio-exoscopio.png","/temp/especialidades/neurocirugia/neuronavegacion.png","/temp/especialidades/neurovascular/Mmonitoreo-cerebral.png","/temp/especialidades/neurovascular/Mtdc.png","/temp/especialidades/neurovascular/hero.png","/temp/especialidades/neurovascular/monitoreo-cerebral.png","/temp/especialidades/neurovascular/tdc.png","/temp/especialidades/neuromodulacion/Mconsumibles-neuromodulacion.png","/temp/especialidades/neuromodulacion/Mtdcs.png","/temp/especialidades/neuromodulacion/Mterapia-cognitiva.png","/temp/especialidades/neuromodulacion/Mtms.png","/temp/especialidades/neuromodulacion/Mvns.png","/temp/especialidades/neuromodulacion/consumibles-neuromodulacion.png","/temp/especialidades/neuromodulacion/hero.png","/temp/especialidades/neuromodulacion/tdcs.png","/temp/especialidades/neuromodulacion/terapia-cognitiva.png","/temp/especialidades/neuromodulacion/tms.png","/temp/especialidades/neuromodulacion/vns.png","/temp/especialidades/neurofisiologia/IONM.png","/temp/especialidades/neurofisiologia/MIONM.png","/temp/especialidades/neurofisiologia/MNMUS.png","/temp/especialidades/neurofisiologia/MPSG.png","/temp/especialidades/neurofisiologia/MPoligrafo.png","/temp/especialidades/neurofisiologia/Mconsumibles-eeg-emg-ep-ncs.png","/temp/especialidades/neurofisiologia/Meeg.png","/temp/especialidades/neurofisiologia/Memg.png","/temp/especialidades/neurofisiologia/Mep.png","/temp/especialidades/neurofisiologia/Mncs.png","/temp/especialidades/neurofisiologia/NMUS.png","/temp/especialidades/neurofisiologia/PSG.png","/temp/especialidades/neurofisiologia/Poligrafo.png","/temp/especialidades/neurofisiologia/consumibles-eeg-emg-ep-ncs.png","/temp/especialidades/neurofisiologia/eeg.png","/temp/especialidades/neurofisiologia/emg.png","/temp/especialidades/neurofisiologia/ep.png","/temp/especialidades/neurofisiologia/hero.png","/temp/especialidades/neurofisiologia/ncs.png","/temp/especialidades/rehabilitacion/Melectroterapia.png","/temp/especialidades/rehabilitacion/Misocinesia.png","/temp/especialidades/rehabilitacion/Mlaser-alta-potencia.png","/temp/especialidades/rehabilitacion/Mondas-de-choque.png","/temp/especialidades/rehabilitacion/Moscilacion-profunda.png","/temp/especialidades/rehabilitacion/Mradiofrecuencia.png","/temp/especialidades/rehabilitacion/Mterapia-combinada.png","/temp/especialidades/rehabilitacion/Multrasonido-terapeutico.png","/temp/especialidades/rehabilitacion/electroterapia.png","/temp/especialidades/rehabilitacion/hero.png","/temp/especialidades/rehabilitacion/isocinesia.png","/temp/especialidades/rehabilitacion/laser-alta-potencia.png","/temp/especialidades/rehabilitacion/ondas-de-choque.png","/temp/especialidades/rehabilitacion/oscilacion-profunda.png","/temp/especialidades/rehabilitacion/radiofrecuencia.png","/temp/especialidades/rehabilitacion/terapia-combinada.png","/temp/especialidades/rehabilitacion/ultrasonido-terapeutico.png","/_astro/page.DogxaioH.js","/404.html","/acerca-de-nosotros/index.html","/contacto/index.html","/especialidades/index.html","/nuestras-marcas/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"gl25wSee+PAJzu9kreN55IcCFA4CYga39GFfTWzb5xM="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
