# MedRent.mx

Sitio web corporativo y catálogo de productos médicos para MedRent. El proyecto presenta especialidades, marcas, productos, eventos, blog, formularios de contacto y llamadas a acción para solicitud de asesoría o cotización.

## 1. Descripción General

| Tema | Detalle |
| --- | --- |
| Propósito | Mostrar el catálogo comercial de equipos médicos, facilitar la búsqueda por especialidad, marca o producto, y capturar leads para seguimiento comercial. |
| Audiencia | Profesionales de la salud, instituciones médicas, distribuidores y equipo interno de marketing/ventas. |
| Estado actual | Sitio Astro en modo server, preparado para despliegue en Vercel y conectado a Strapi CMS mediante endpoints server-side. |
| Dominio configurado | `https://www.medrent.mx` en `astro.config.mjs`. |

Nota: el `package.json` conserva el nombre técnico `evolved-earth`. Pendiente de confirmar si debe renombrarse a un identificador de MedRent.

## 2. Stack Técnico

| Capa | Tecnología detectada |
| --- | --- |
| Framework | Astro `^5.15.9` |
| UI / estilos | Tailwind CSS `^4.1.18`, CSS global en `src/styles/global.css` |
| Componentes interactivos | Alpine.js, React, scripts vanilla en `src/scripts` y `public/scripts` |
| Sliders | `@glidejs/glide`, `glider-js` |
| Scroll | `lenis` |
| Fechas | `dayjs` |
| CMS | Strapi, consumido con `STRAPI_URL` y `STRAPI_API_TOKEN` |
| Render de bloques | `@strapi/blocks-react-renderer` |
| Hosting / deploy | Vercel con `@astrojs/vercel` |
| Tracking detectado | Google Tag Manager desde `Layout.astro` usando `siteConfig.gtmId`; eventos enviados a `window.dataLayer` |
| CRM / formularios | HubSpot CRM API via endpoint interno `/api/contact` y token `HUBSPOT_PAT_TK` |

No se detectaron scripts directos de GA4, Meta Pixel, Hotjar o HubSpot embed en el código revisado. Si existen, deberían estar configurados dentro de GTM. Pendiente de confirmar en el contenedor GTM.

## 3. Arquitectura General

El proyecto separa responsabilidades en páginas Astro, componentes reutilizables, servicios server-side para Strapi, utilidades de dominio y scripts públicos de interacción.

```text
.
├── public/
│   ├── fonts/                  # Fuentes Lato usadas por el layout
│   ├── scripts/                # Validadores, tracking UTM/dataLayer y utilidades de teléfono
│   ├── temp/                   # Assets estáticos temporales o fallback
│   ├── robots.txt
│   └── OG_Default_Medrent.jpeg
├── src/
│   ├── components/             # Componentes Astro reutilizables
│   ├── layouts/                # Layout global
│   ├── lib/                    # Constantes, helpers, mappers y lógica de dominio
│   ├── pages/                  # Rutas Astro y API routes
│   ├── scripts/                # Scripts importados por el cliente
│   ├── seo/                    # Builders de schemas JSON-LD
│   ├── server/                 # Cliente Strapi y servicios server-side
│   ├── styles/                 # CSS global
│   └── types/                  # Tipos locales para librerias sin typings
├── astro.config.mjs
├── vercel.json
├── package.json
└── tsconfig.json
```

### Componentes principales

| Área | Ubicación | Responsabilidad |
| --- | --- | --- |
| Layout | `src/layouts/Layout.astro` | HTML base, SEO global, favicons desde Strapi, header, footer, CTA sticky, Lenis, GTM y alternates de locale. |
| Header/Footer | `src/components/layout/header`, `src/components/layout/footer` | Navegación superior, buscador, upperbar y pie de página. |
| Secciones | `src/components/sections` | Sliders de banners, marcas, productos, promociones, especialidades, testimonios y grids. |
| Formularios | `src/components/forms` | Campos base, teléfono, select, checkbox, botón y wrapper `BaseForm`. |
| Newsletter | `src/components/newsletter`, `src/components/FormNewsletter.astro` | Formulario de newsletter con validación y envío a `/api/contact`. |
| Catálogo/producto | `src/components/product` | PLP, PDP, filtros, cards, grillas, ficha técnica, variantes, galería y botones de compartir. |
| Blog | `src/components/blog` | Cards, sliders, artículos relacionados y social sharing. |
| SEO | `src/components/seo`, `src/seo/schemas` | Schemas JSON-LD para Organization, WebSite, Breadcrumb, eventos y especialidades. |
| Servicios CMS | `src/server` | Cliente Strapi con cache, configuración global y servicios de catálogo. |
| Helpers | `src/lib` | Constantes de sitio, locale, imágenes Strapi, slugs, mappers de producto y helpers de blog. |

## 4. Rutas Principales

Rutas detectadas en `src/pages`:

| Ruta | Archivo | Descripción |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Home con contenido CMS, sliders, promociones, eventos y secciones destacadas. |
| `/acerca-de-nosotros` | `src/pages/acerca-de-nosotros.astro` | Página institucional conectada a Strapi `about`. |
| `/financiamiento` | `src/pages/financiamiento.astro` | Página de financiamiento. |
| `/nuestras-marcas` | `src/pages/nuestras-marcas/index.astro` | Listado de marcas. |
| `/nuestras-marcas/[brand]` | `src/pages/nuestras-marcas/[brand]/index.astro` | Landing de marca por slug. |
| `/nuestras-marcas/[brand]/[interestitial]` | `src/pages/nuestras-marcas/[brand]/[interestitial]/index.astro` | Vista intermedia por marca/interés. |
| `/especialidades` | `src/pages/especialidades/index.astro` | Listado de especialidades. |
| `/especialidades/[category]` | `src/pages/especialidades/[category]/index.astro` | Landing de especialidad/categoría. |
| `/especialidades/[category]/[subcategory]` | `src/pages/especialidades/[category]/[subcategory]/index.astro` | Vista de aplicación/subcategoría dentro de especialidad. |
| `/productos` | `src/pages/productos/index.astro` | PLP de catálogo de productos. |
| `/productos/[slug]` | `src/pages/productos/[slug].astro` | PDP de producto. |
| `/eventos` | `src/pages/eventos.astro` | Página de eventos con filtros, calendario y popup de registro. |
| `/contacto` | `src/pages/contacto.astro` | Formulario de contacto y solicitud de demo. |
| `/blog` | `src/pages/blog/index.astro` | Listado de artículos. |
| `/blog/[article]` | `src/pages/blog/[article].astro` | Detalle de artículo. |
| `/blog/autor/[autor]` | `src/pages/blog/autor/[autor].astro` | Archivo por autor. |
| `/blog/autores` | `src/pages/blog/autores/index.astro` | Listado de autores. |
| `/blog/autores/[autor]` | `src/pages/blog/autores/[autor].astro` | Perfil o archivo de autor. |
| `/aviso-de-privacidad`, `/condiciones-de-uso`, etc. | `src/pages/[legal_page].astro` | Páginas legales dinámicas desde Strapi. |
| `/team-medrent` | `src/pages/team-medrent.astro` | Ruta legacy; `vercel.json` redirecciona a `/blog/autor/team-medrent`. |
| `/404` | `src/pages/404.astro` | Página de error. |
| `/co/...` | `src/pages/co/*` | Variante localizada o regional para Colombia. |
| `/sitemap-index.xml`, `/sitemap-pages.xml` | `src/pages/sitemap-*.xml.ts` | Sitemaps generados. |

No existe una ruta raíz `/aplicaciones/[aplicacion]`. La vista equivalente se maneja como `/especialidades/[category]/[subcategory]`.

## 5. Instalación Local

### Requisitos previos

- Node.js `>=20.17.0`
- npm
- Acceso a las variables de entorno requeridas para Strapi y HubSpot si se probarán datos reales o formularios.

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Astro levanta normalmente en `http://localhost:4321`. El endpoint de contacto permite CORS para `localhost:4321` y `localhost:4322`.

### Build de producción

```bash
npm run build
```

### Preview local

```bash
npm run preview
```

## 6. Variables de Entorno

Variables detectadas en el código:

| Variable | Uso | Requerida |
| --- | --- | --- |
| `STRAPI_URL` | URL base de Strapi. `src/server/strapiClient.ts` normaliza agregando `/api` si falta. `src/server/siteConfig.ts` la usa directamente para `/site-setting`. | Sí |
| `STRAPI_API_TOKEN` | Bearer token para consumir Strapi desde server-side y proxy interno. | Sí |
| `HUBSPOT_PAT_TK` | Private App Token de HubSpot para crear contactos desde `/api/contact`. | Sí, para formularios |

No se deben commitear valores reales. Usar `.env` local y variables configuradas en Vercel para producción.

Se incluye `.env.example` con las variables necesarias sin valores.

## 7. Integración con Strapi CMS

La integracion principal vive en `src/server/strapiClient.ts`:

- Usa `STRAPI_URL` y `STRAPI_API_TOKEN`.
- Normaliza la URL para apuntar a `/api`.
- Aplica cache en memoria por 60 segundos.
- Aplica cache best-effort en disco en `.cache/strapi`.
- Deduplica requests concurrentes con `inFlightRequests`.

Tambien existe `src/pages/api/strapi/[...slug].ts`, un proxy server-side para consumir Strapi desde rutas internas sin exponer el token.

### Contenido CMS inferido

| Endpoint / colección | Uso detectado |
| --- | --- |
| `/site-setting?populate=*` | Configuración global: favicons, `gtmId` y otros ajustes globales. |
| `/home-page` | Contenido de Home y slider hero. |
| `/promo-sliders` | Promociones del sitio. |
| `/about?populate=*` | Página Acerca de nosotros. |
| `/events-page` | Hero, textos y eventos. |
| `/products` | Catálogo PLP/PDP, galería, documentos, beneficios, FAQ, ficha técnica, relacionados, variantes, marca y subcategoría. |
| `/categories` | Especialidades/categorías con subcategorías, imágenes y productos relacionados. |
| `/subcategories` | Aplicaciones o subcategorías por especialidad. |
| `/brands` | Marcas, landing de marca, colores, logo, productos destacados e interstitial cards. |
| `/blog-articles` | Blog, artículos relacionados y listados. |
| `/article-classifications` | Clasificaciones/tags de artículos. |
| `/writers` | Autores del blog. |
| `/legal-content` | Páginas legales dinámicas. |
| `/testimonials` | Testimoniales activos. |

### Fallbacks y contenido estático

Varias páginas incluyen fallbacks estáticos cuando Strapi no responde o un campo viene vacío. También hay assets temporales en `public/temp` y constantes en `src/lib/site.ts`.

Partes que siguen siendo mayormente estáticas o con contenido local:

- Textos SEO de algunas páginas.
- Componentes de layout, estructura visual y formularios.
- Algunos assets fallback en `public/temp`.
- Logica de filtros, sliders y UI cliente.

## 8. Formularios e Integraciones

### Endpoint de contacto

`src/pages/api/contact.js` recibe solicitudes `POST`, valida datos básicos y crea contactos en HubSpot:

- Requiere `HUBSPOT_PAT_TK`.
- Envia a `https://api.hubapi.com/crm/v3/objects/contacts`.
- Normaliza nombre y apellido.
- Valida teléfono mexicano de 10 dígitos y lo envía con prefijo `+52`.
- Mapea `specialty` a la propiedad HubSpot `especialidad_medica`.
- Convierte arrays de checkbox a strings separados por `;`.
- Permite CORS para dominios configurados en el archivo.

### Formularios detectados

| Formulario | Ubicación | Envío | Tracking |
| --- | --- | --- | --- |
| Contacto / demo | `src/pages/contacto.astro` con `BaseForm` | `/api/contact` via `public/scripts/formValidator.js` | `generate_lead` a `dataLayer` |
| Newsletter | `src/components/FormNewsletter.astro` | `/api/contact` | `generate_lead` a `dataLayer` |
| Cotización PDP | `src/components/popup/popUpSolicitarCotizacion.astro` | Lógica actual muestra éxito temprano; contiene código posterior no alcanzado para envío externo. Pendiente de confirmar flujo final. | Tiene helper para `dataLayer` en código posterior no alcanzado |
| Eventos | `src/components/popup/popupEvento.astro` y `src/pages/eventos.astro` | Usa componentes de formulario y validadores compartidos. | `generate_lead` vía validador si usa `initForm` |

### Validaciones compartidas

`public/scripts/formValidator.js` centraliza validaciones de:

- Nombre.
- Email.
- Teléfono.
- Especialidad.
- Estado.
- Institucion.
- Medio por el que nos conoció.
- Mensaje opcional.
- Checkbox de aviso de privacidad.
- Campos UTM.

La utilidad `public/scripts/phoneUtils.js` ayuda a extraer dígitos del teléfono.

## 9. Tracking y Marketing

### GTM y dataLayer

`src/layouts/Layout.astro` carga Google Tag Manager con `siteConfig?.gtmId`, que viene de Strapi `site-setting`.

Adicionalmente se carga:

```html
<script src="/scripts/setEventsDataLayer.js" defer></script>
```

Los formularios empujan eventos a `window.dataLayer`, principalmente `generate_lead`, con datos de formulario, página y tracking UTM.

### Recomendaciones

- Centralizar GA4, Meta Pixel, Hotjar, conversiones y etiquetas de remarketing dentro de GTM.
- Evitar instalar scripts directos en `Layout.astro` si ya existen tags equivalentes en GTM.
- Mantener un inventario de eventos `dataLayer` y nombres de eventos.
- Revisar duplicados cuando se agreguen nuevos formularios, popups o botones CTA.
- Validar que `siteConfig.gtmId` esté configurado en Strapi y en el ambiente de producción.

## 10. Flujo de Desarrollo Git

Estrategia recomendada:

- `main` como rama estable y desplegable.
- Ramas cortas por bloque funcional:
  - `feature/catalog-static`
  - `feature/forms-integration`
  - `fix/scroll-behavior`
  - `docs/project-readme`
- Pull Request por bloque funcional.
- Revisar build, rutas afectadas y formularios antes de merge.
- Usar Conventional Commits.

Ejemplos de commits:

```bash
feat(catalog): add product filters
fix(forms): normalize phone validation
docs(readme): add final project documentation
chore(env): add environment example file
```

Commits sugeridos para estos cambios:

```bash
docs(readme): add final project documentation
chore(env): add environment example file
```

## 11. Despliegue

El proyecto está configurado para Vercel:

- Adapter: `@astrojs/vercel`
- `output: "server"` en `astro.config.mjs`
- Build command: `npm run build`
- Output generado por Astro: `dist/`
- Headers de cache para assets configurados en `vercel.json`
- Redirect configurado: `/team-medrent` -> `/blog/autor/team-medrent`

### Variables necesarias en Vercel

Configurar en el proyecto de Vercel:

- `STRAPI_URL`
- `STRAPI_API_TOKEN`
- `HUBSPOT_PAT_TK`

### Checklist antes de deploy

- Ejecutar `npm run build`.
- Confirmar que `STRAPI_URL` apunta al CMS correcto.
- Confirmar que el token de Strapi tiene permisos de lectura necesarios.
- Confirmar que `HUBSPOT_PAT_TK` está vigente y con permisos para crear contactos.
- Revisar que `site-setting` en Strapi tenga favicons y `gtmId`.
- Probar formularios en entorno preview.
- Revisar rutas dinamicas de productos, marcas, especialidades y blog.
- Revisar que no haya secretos en commits, logs o archivos publicos.

## 12. Checklist de Entrega

- [ ] Build exitoso con `npm run build`.
- [ ] Rutas principales revisadas.
- [ ] Responsive validado en mobile, tablet y desktop.
- [ ] Formularios probados contra HubSpot o entorno de pruebas.
- [ ] SEO básico validado: title, description, canonical, OG image y schemas.
- [ ] GTM/analytics revisado en preview y producción.
- [ ] Variables de entorno configuradas en Vercel.
- [ ] Sin claves, tokens o valores sensibles expuestos.
- [ ] Sitemap y robots revisados.
- [ ] README actualizado.

## 13. Mantenimiento

### Agregar nuevas páginas

1. Crear el archivo en `src/pages`.
2. Usar `Layout.astro` para heredar SEO global, header, footer y tracking.
3. Agregar `BreadcrumbSchema` y `Breadcrumb` si aplica.
4. Definir `title`, `description`, `keywords` y `ogImage`.
5. Si consume Strapi, usar `strapiFetch` o crear un servicio en `src/server/api`.

### Agregar nuevas secciones

1. Crear el componente en `src/components/sections`.
2. Mantener props claras y reutilizables.
3. Evitar duplicar lógica de fetch dentro de muchos componentes si puede vivir en `src/server`.
4. Reutilizar `ImageResponsive` para imágenes CMS o estáticas.

### Conectar nuevas colecciones de Strapi

1. Crear un servicio en `src/server/api`.
2. Consumir con `strapiFetch`.
3. Usar `URLSearchParams` para filtros, populate y paginación.
4. Mapear datos a una estructura estable antes de pasarlos a componentes.
5. Definir fallbacks para campos opcionales.
6. No exponer `STRAPI_API_TOKEN` en código cliente.

### Agregar o modificar formularios

1. Reutilizar `BaseForm`, `FormField`, `PhoneField`, `SelectField`, `CheckboxField` y `SubmitButton`.
2. Inicializar validación con `initForm("id-del-form")` cuando aplique.
3. Enviar datos a `/api/contact` si el destino es HubSpot.
4. Confirmar mapeo de propiedades HubSpot antes de publicar.
5. Agregar o actualizar eventos `dataLayer` sin duplicar nombres.

### Manejar tracking sin duplicados

1. Usar GTM como punto central para tags externos.
2. Enviar eventos desde el sitio solo a `window.dataLayer`.
3. Documentar cada nuevo evento con nombre, payload y formulario/origen.
4. Evitar cargar GA4, Meta Pixel, Hotjar o scripts similares directamente si ya están en GTM.
5. Probar con Tag Assistant o vista preview de GTM antes de deploy.

## 14. Notas Pendientes de Confirmar

- Si el nombre técnico del paquete debe cambiar de `evolved-earth` a un nombre relacionado con MedRent.
- Configuración exacta de GA4, Meta Pixel, Hotjar u otras etiquetas dentro del contenedor GTM.
- Flujo final esperado del popup de cotización PDP, ya que el código actual muestra éxito antes de ejecutar el envío externo posterior.
- Política final de regiones/locales para rutas `/co`.
