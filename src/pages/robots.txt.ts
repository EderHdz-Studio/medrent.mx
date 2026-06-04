/**
 * src/pages/robots.txt.ts
 * 
 * Robots.txt dinámico generado desde la configuración centralizada.
 * Se actualiza automáticamente basado en:
 * - Rutas estáticas definidas en siteMetadata.ts
 * - Datos dinámicos desde Strapi (productos, blog, etc.)
 * 
 * Acceso: GET https://www.medrent.mx/robots.txt
 */

import type { APIRoute } from 'astro';
import { ROBOTS_CONFIG, SITE_INFO, STATIC_ROUTES } from '@lib/siteMetadata';
// ✅ CAMBIO: Importar desde archivos específicos en lugar de @server/api
import { getCategories } from '@server/api/categories';
import { getProducts } from '@server/api/products';
import { getArticles as getBlogPosts } from '@server/api/articles';

export const GET: APIRoute = async () => {
  // Obtener TODOS los datos dinámicos en UNA SOLA llamada
  const [categories, products, blogPosts] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
    getBlogPosts().catch(() => [])
  ]);

  // Generar paths dinámicos
  const specialtyPaths = categories
    .filter((c: any) => c?.slug)
    .map((c: any) => `/especialidades/${c.slug}`);
  
  const productPaths = products
    .filter((p: any) => p?.slug)
    .map((p: any) => `/productos/${p.slug}`);
  
  const blogPaths = blogPosts
    .filter((b: any) => b?.slug)
    .map((b: any) => `/blog/${b.slug}`);

  // Si no hay datos dinámicos, usar defaults de STATIC_ROUTES
  const finalSpecialtyPaths = specialtyPaths.length > 0 
    ? specialtyPaths 
    : Object.values(STATIC_ROUTES).filter(route => route.includes('/especialidades/'));

  // ============================================
  // Construcción de robots.txt
  // ============================================
  const robotsTxt = `# ============================================
# MedRent Robots.txt
# Directivas de rastreo para buscadores (crawlers)
# ============================================
# Último actualizado: ${SITE_INFO.lastUpdated}
# Sitio canónico: ${SITE_INFO.canonicalUrl}
# Contact: ${SITE_INFO.email}
#
# Este archivo se genera dinámicamente desde:
# - src/lib/siteMetadata.ts (configuración)
# - Datos del CMS Strapi (URLs dinámicas)
#
# ============================================

# --- Regla GLOBAL para todos los bots ---
User-agent: *

# Retraso de rastreo (respetado por bots responsables)
Crawl-delay: 1

# --- BLOQUEOS: Superficies internas (no públicas) ---
${ROBOTS_CONFIG.disallowed.map(path => `Disallow: ${path}`).join('\n')}

# --- BLOQUEOS: Parámetros (facets, UTM, etc.) ---
${ROBOTS_CONFIG.disallowParams ? 'Disallow: /*?' : '# Permite parámetros'}

# --- PERMITE: Recursos necesarios para renderizado (Astro + Assets) ---
${ROBOTS_CONFIG.allowedAssets.map(path => `Allow: ${path}`).join('\n')}

# --- Rutas públicas específicas (explícitamente permitidas) ---
Allow: /
Allow: /especialidades/
Allow: /productos/
Allow: /blog/
Allow: /contacto
Allow: /eventos
Allow: /acerca-de-nosotros
Allow: /nuestras-marcas/
Allow: /financiamiento

# ============================================
# URLs DINÁMICAS DESDE CMS
# ============================================

# --- ESPECIALIDADES (${finalSpecialtyPaths.length}) ---
${finalSpecialtyPaths.length > 0 
  ? finalSpecialtyPaths.map(path => `Allow: ${path}`).join('\n')
  : '# No hay especialidades disponibles'}

# --- PRODUCTOS (${productPaths.length}) ---
${productPaths.length > 0 
  ? productPaths.map(path => `Allow: ${path}`).join('\n')
  : '# No hay productos disponibles'}

# --- BLOG (${blogPaths.length}) ---
${blogPaths.length > 0 
  ? blogPaths.map(path => `Allow: ${path}`).join('\n')
  : '# No hay artículos disponibles'}

# ============================================
# Configuración específica: Google
# ============================================
User-agent: Googlebot
Crawl-delay: 0
${ROBOTS_CONFIG.disallowed.map(path => `Disallow: ${path}`).join('\n')}
Allow: /

# ============================================
# Configuración específica: Bing
# ============================================
User-agent: bingbot
Crawl-delay: ${ROBOTS_CONFIG.bots.bingbot.crawlDelay}
${ROBOTS_CONFIG.disallowed.map(path => `Disallow: ${path}`).join('\n')}
Allow: /

# ============================================
# Otros bots comerciales (respetuosos)
# ============================================
User-agent: DuckDuckGo
Disallow:

User-agent: Teoma
Disallow:

User-agent: Slurp
Disallow:

# ============================================
# Bots malintencionados / scrapers (bloqueados)
# ============================================
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: baiduspider
Disallow: /

User-agent: YandexBot
Disallow: /

# ============================================
# SITEMAPS: Índice central de URLs
# ============================================
Sitemap: ${SITE_INFO.canonicalUrl}/sitemap-index.xml
Sitemap: ${SITE_INFO.canonicalUrl}/sitemap-pages.xml

# ============================================
# Notas de implementación
# ============================================
# Este archivo es GENERADO AUTOMÁTICAMENTE.
# Cambios manuales en /public/robots.txt serán ignorados.
# 
# Para actualizar rutas:
# 1. Edita src/lib/siteMetadata.ts (rutas estáticas)
# 2. Actualiza Strapi CMS (contenido dinámico)
# 3. El sistema regenerará este archivo en cada build
#
# ============================================
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    }
  });
};