/**
 * src/pages/humans.txt.ts
 *
 * Humans.txt dinámico - Presentación del equipo, tecnología y valores
 * Convenio: https://humanstxt.org/
 *
 * Fuentes:
 * - Configuración centralizada: src/lib/siteMetadata.ts
 * - Datos dinámicos: Strapi CMS (productos, blog, especialidades)
 *
 * Acceso: GET https://www.medrent.mx/humans.txt
 * Regenera automáticamente cada hora (cache)
 */

import type { APIRoute } from 'astro';
import {
  TEAM,
  SITE_INFO,
  BUSINESS_CONTEXT,
  SPECIALTIES,
  SOCIAL_MEDIA
} from '@lib/siteMetadata';
import { getCategories } from '@server/api/categories';
import { getProducts } from '@server/api/products';
import { getArticles } from '@server/api/articles';

/**
 * Obtiene datos dinámicos para humanizar el sitio
 * (URLs públicas, especialidades, contenido)
 */
async function getDynamicSiteData() {
  try {
    const [categories, products, articles] = await Promise.all([
      getCategories().catch(() => []),
      getProducts().catch(() => []),
      getArticles().catch(() => [])
    ]);
    
    const specialityCount = Array.isArray(categories) ? categories.length : 0;
    const productsCount = Array.isArray(products) ? products.length : 0;
    const articlesCount = Array.isArray(articles) ? articles.length : 0;
    
    return {
      specialityCount,
      productsCount,
      articlesCount,
      lastUpdated: new Date().toISOString().split('T')[0],
      buildDate: new Date().toLocaleString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Mexico_City'
      })
    };
  } catch (error) {
    console.warn('⚠️ Error fetching dynamic site data for humans.txt');
    return {
      specialityCount: Object.keys(SPECIALTIES).length,
      productsCount: 0,
      articlesCount: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      buildDate: new Date().toLocaleString('es-MX')
    };
  }
}

export const GET: APIRoute = async () => {
  const dynamics = await getDynamicSiteData();

  const humansTxt = `/* ============================================
   MedRent (Medrent®) - Humans.txt
   https://humanstxt.org/ | ISO/IEC 80000-1:2009
   ============================================

   Información sobre el equipo humano, valores y tecnología
   que hicieron posible esta plataforma de distribuición
   de tecnología médica en México.

   Última actualización: ${dynamics.lastUpdated}
   Fecha de compilación: ${dynamics.buildDate}
   Zona horaria: América/México (CST)
*/

/* ============================================
   ESTADÍSTICAS DINÁMICAS (desde CMS)
   ============================================ */

Total Especialidades: ${dynamics.specialityCount}
Total Productos: ${dynamics.productsCount}
Total Artículos Blog: ${dynamics.articlesCount}

/* ============================================
   EQUIPO - PRODUCT LEAD & UX STRATEGY
   ============================================ */

/* Product Lead & UX Strategy */
Name: ${TEAM.leads[0].name}
Role: ${TEAM.leads[0].role}
Expertise: ${TEAM.leads[0].description}
Contact: ${TEAM.leads[0].contact}
Contribution: Information architecture, UX/UI design, accessibility standards (WCAG 2.1 AA), atomic design system, technical SEO, CRO optimization
Location: México


/* ============================================
   EQUIPO - DESARROLLO (FULL-STACK & FRONTEND)
   ============================================ */

/* Principal Full-Stack Developer */
Name: ${TEAM.developers[0].name}
Role: ${TEAM.developers[0].role}
Expertise: ${TEAM.developers[0].description}
Contribution: Astro + Strapi architecture, Performance optimization (Lighthouse +85), CMS modeling, Structured data (Schema.org), Component refactoring, Vercel deployments
Contact GitHub: ${TEAM.developers[0].contactGitHub}
Studio: ${TEAM.developers[0].studio}
LinkedIn: ${TEAM.developers[0].linkedIn}
Contact Email: ${TEAM.developers[0].contactEmail}
Contact: ${TEAM.developers[0].contact}
Location: México

/* Frontend Developer Jr. */
Name: ${TEAM.developers[1].name}
Role: ${TEAM.developers[1].role}
Expertise: ${TEAM.developers[1].description}
Contribution: Frontend development, UI/UX redesign, bug fixing, QA, Strapi CMS administration (content modeling & population), cross-browser testing, and performance optimization
Contact GitHub: ${TEAM.developers[1].contactGitHub}
LinkedIn: ${TEAM.developers[1].linkedIn}
Contact Email: ${TEAM.developers[1].contactEmail}
Location: México

/* ============================================
   DIRECCIÓN & NEGOCIO
   ============================================ */

Name: ${TEAM.direction[0].name}
Role: ${TEAM.direction[0].role}
Expertise: ${TEAM.direction[0].description}
Contribution: Marketing strategy, brand supervision, business alignment, clinical content validation
Department: MedRent Leadership


/* ============================================
   INFORMACIÓN DEL SITIO
   ============================================ */

Project Name: ${SITE_INFO.name}
Description: ${SITE_INFO.description}
Website: ${SITE_INFO.canonicalUrl}
Canonical URL: ${SITE_INFO.canonicalUrl}
Language: ${SITE_INFO.language}
Region: México | Colombia

Contact Email: ${SITE_INFO.email}
Contact Phone: ${SITE_INFO.phone}
Business Hours: Lunes–Viernes, 09:00–18:00 CST


/* ============================================
   STACK TECNOLÓGICO
   ============================================ */

Framework: ${SITE_INFO.stack.framework}
CMS (Headless): ${SITE_INFO.stack.cms}
Styling Framework: ${SITE_INFO.stack.styling}
Hosting: ${SITE_INFO.stack.hosting}
Analytics: ${SITE_INFO.stack.analytics.join(', ')}
CRM Integration: ${SITE_INFO.stack.crm}

Standards & Conventions:
- HTML5 Semantic Markup
- CSS3 (Tailwind CSS utility-first)
- JavaScript/TypeScript (ES2020+)
- SSR (Server-Side Rendering) with Astro
- Schema.org Microdata (MedicalDevice, Organization, WebPage, Product)
- Open Graph & Twitter Cards
- Mobile-first responsive design
- Accessibility: WCAG 2.1 Level AA


/* ============================================
   ESTRUCTURA DEL SITIO & LÍNEAS TERAPÉUTICAS
   ============================================ */

Main Sections:
- Home: Institutional overview and therapeutic portfolio positioning
- Specialties: ${dynamics.specialityCount} therapeutic lines
- Products: ${BUSINESS_CONTEXT.specializations.join(', ')}
- Brands: Multiple medical device manufacturers
- Financing: Korum Capital structured financing
- Blog: Educational content in medical technology
- Events: Medical congresses, workshops, product launches
- Contact & Support: Direct communication channels
- Legal & Compliance: Privacy, Terms, ARCO rights

Specialty Categories (Clinical Focus):
${Object.values(SPECIALTIES)
  .map(spec => `- ${spec.label} (/${spec.slug})`)
  .join('\n')}

Dynamic Content Types:
- Product Catalog (SKU, specs, FAQs, downloadables)
- Brand Pages (manufacturer information & portfolio)
- Blog Articles (clinical innovation, medical education)
- Event Calendar (seminars, conferences, webinars)
- Application Pages (clinical use cases by specialty)


/* ============================================
   POLÍTICAS & CONFORMIDAD REGULATORIA
   ============================================ */

Data Protection Framework: ${BUSINESS_CONTEXT.dataHandling.law}
Data Infrastructure: ${BUSINESS_CONTEXT.dataHandling.infrastructure}

Data Protection Department:
Address: ${BUSINESS_CONTEXT.dataHandling.department.address}
Phone: ${BUSINESS_CONTEXT.dataHandling.department.phone}

Market Type: B2B Healthcare (Professionals & Institutions)
Regulatory Focus:
- Medical device distribution compliance
- Mexican healthcare standards
- Data privacy (LFPDPPP)
- Clinical content accuracy
- No telemedicine, diagnosis or doctor-patient substitution

Clinical Disclaimer:
Este sitio promueve equipamiento y servicios comerciales para profesionales
sanitarios e instituciones. No ofrece telemedicina ni diagnóstico clínico.
El contenido es informativo y educativo; no sustituye juicio médico,
prescripción profesional ni la relación médico-paciente.


/* ============================================
   REDES SOCIALES & CANALES DE DISTRIBUCIÓN
   ============================================ */

LinkedIn: ${SOCIAL_MEDIA.linkedin}
Instagram: ${SOCIAL_MEDIA.instagram}
Facebook: ${SOCIAL_MEDIA.facebook}
YouTube: ${SOCIAL_MEDIA.youtube}


/* ============================================
   PERFORMANCE & ACCESIBILIDAD
   ============================================ */

Performance Baseline:
- Lighthouse score target: +85 optimization
- Core Web Vitals: Optimized
- First Contentful Paint (FCP): <2s
- Largest Contentful Paint (LCP): <2.5s
- Cumulative Layout Shift (CLS): <0.1

Accessibility:
- WCAG 2.1 Level AA compliance (progressive)
- Semantic HTML5 structure
- Accessible navigation & focus states
- ARIA labels and roles for complex components
- Medical content hierarchy with structured headings

Media Optimization:
- AVIF & WebP formats with fallbacks
- Responsive images (srcset, sizes)
- Lazy loading for galleries & product assets
- CDN edge propagation (Vercel)


/* ============================================
   ROADMAP & VALORES
   ============================================ */

Core Values:
1. Clinical Accuracy: All medical content validated by specialists
2. User-Centric Design: Intuitive navigation for healthcare professionals
3. Performance: Fast, responsive, optimized for medical workflows
4. Security: Encrypted data handling, role-based access
5. Transparency: Clear sourcing of medical information & pricing
6. Scalability: Multi-region support (MX, CO) with future expansion

Long-term Vision:
- Expand therapeutic specialization coverage
- Strengthen B2B partnerships with healthcare providers
- Integrate advanced clinical education tools
- Develop mobile-first features for field professionals


/* ============================================
   CONTENIDO & FUENTES DE VERDAD
   ============================================ */

Content Sources:
- Static Content: Astro components + Vercel Edge cache
- Dynamic Content: Strapi Headless CMS (products, blog, events)
- Real-time Data: Product availability, pricing, stock (partner integrations)

SEO & Indexation:
- robots.txt: ${SITE_INFO.canonicalUrl}/robots.txt
- Sitemap Index: ${SITE_INFO.canonicalUrl}/sitemap-index.xml
- Sitemap Pages: ${SITE_INFO.canonicalUrl}/sitemap-pages.xml
- Schema.org: Organization, MedicalDevice, Product, BlogPosting

Related Files:
- robots.txt: Directivas de rastreo para motores de búsqueda
- llms.txt: Contexto para modelos de lenguaje IA
- Privacy Policy: ${SITE_INFO.canonicalUrl}/aviso-de-privacidad
- Terms of Use: ${SITE_INFO.canonicalUrl}/condiciones-de-uso


/* ============================================
   METODOLOGÍA & NOTAS DE DESARROLLO
   ============================================ */

Development Methodology:
- Component-based architecture (Atomic Design)
- Server-Side Rendering (SSR) for SEO
- Static Generation (SSG) where applicable
- Git-based version control
- Automated testing & performance monitoring
- Continuous deployment via Vercel

Build & Deploy:
- Build tool: Vite (esbuild minification)
- CSS minimization: Tailwind + Vite
- HTML compression: Astro compressHTML
- Inline optimization: auto (small CSS inline, large external)

Code Quality:
- TypeScript strict mode
- ESLint configuration
- Atomic design system
- DRY principle (Don't Repeat Yourself)
- Accessible components by default


/* ============================================
   ATTRIBUTIONS & SPECIAL THANKS
   ============================================ */

To the neurosurgeons, neurologists, rehabilitation specialists,
and healthcare professionals who trust our technology — thank you.

To our partners and customers who drive innovation in medical
device distribution and clinical practice advancement.

Medical technology, deployed by real humans.
Built in Mexico for advanced clinical practice.

Crafted with ❤️ in México City.


/* ============================================
   DOCUMENTO AUTO-GENERADO
   ============================================

Este archivo se genera dinámicamente desde:
- src/pages/humans.txt.ts (este archivo)
- src/lib/siteMetadata.ts (configuración centralizada)
- Strapi CMS (contenido dinámico)

Si necesitas cambiar información:
1. Información estática: edita src/lib/siteMetadata.ts
2. Contenido dinámico: actualiza Strapi CMS
3. El sistema regenerará este archivo automáticamente

Cambios manuales en /public/humans.txt serán ignorados.
La verdad única está en el código + CMS.

Última generación: ${dynamics.buildDate}
*/`;

  return new Response(humansTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache 1 hora
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    }
  });
};