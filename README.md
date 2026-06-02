# MedRent.mx

Sitio web corporativo y catalogo de productos medicos para MedRent. El proyecto presenta especialidades, marcas, productos, eventos, blog, formularios de contacto y llamadas a accion para solicitud de asesoria o cotizacion.

## 1. Descripcion general

| Tema | Detalle |
| --- | --- |
| Proposito | Mostrar el catalogo comercial de equipos medicos, facilitar busqueda por especialidad/marca/producto y capturar leads para seguimiento comercial. |
| Audiencia | Profesionales de la salud, instituciones medicas, distribuidores y equipo interno de marketing/ventas. |
| Estado actual | Sitio Astro en modo server, preparado para despliegue en Vercel y conectado a Strapi CMS mediante endpoints server-side. |
| Dominio configurado | `https://www.medrent.mx` en `astro.config.mjs`. |

Nota: el `package.json` conserva el nombre tecnico `evolved-earth`. Pendiente de confirmar si debe renombrarse a un identificador de MedRent.

## 2. Stack tecnico

| Capa | Tecnologia detectada |
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

No se detectaron scripts directos de GA4, Meta Pixel, Hotjar o HubSpot embed en el codigo revisado. Si existen, deberian estar configurados dentro de GTM. Pendiente de confirmar en el contenedor GTM.

## 3. Arquitectura general

El proyecto separa responsabilidades en paginas Astro, componentes reutilizables, servicios server-side para Strapi, utilidades de dominio y scripts publicos de interaccion.

```text
.
├── public/
│   ├── fonts/                  # Fuentes Lato usadas por el layout
│   ├── scripts/                # Validadores, tracking UTM/dataLayer y utilidades de telefono
│   ├── temp/                   # Assets estaticos temporales o fallback
│   ├── robots.txt
│   └── OG_Default_Medrent.jpeg
├── src/
│   ├── components/             # Componentes Astro reutilizables
│   ├── layouts/                # Layout global
│   ├── lib/                    # Constantes, helpers, mappers y logica de dominio
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

| Area | Ubicacion | Responsabilidad |
| --- | --- | --- |
| Layout | `src/layouts/Layout.astro` | HTML base, SEO global, favicons desde Strapi, header, footer, CTA sticky, Lenis, GTM y alternates de locale. |
| Header/Footer | `src/components/layout/header`, `src/components/layout/footer` | Navegacion superior, buscador, upperbar y pie de pagina. |
| Secciones | `src/components/sections` | Sliders de banners, marcas, productos, promociones, especialidades, testimonios y grids. |
| Formularios | `src/components/forms` | Campos base, telefono, select, checkbox, boton y wrapper `BaseForm`. |
| Newsletter | `src/components/newsletter`, `src/components/FormNewsletter.astro` | Formulario de newsletter con validacion y envio a `/api/contact`. |
| Catalogo/producto | `src/components/product` | PLP, PDP, filtros, cards, grillas, ficha tecnica, variantes, galeria y botones de compartir. |
| Blog | `src/components/blog` | Cards, sliders, articulos relacionados y social sharing. |
| SEO | `src/components/seo`, `src/seo/schemas` | Schemas JSON-LD para Organization, WebSite, Breadcrumb, eventos y especialidades. |
| Servicios CMS | `src/server` | Cliente Strapi con cache, configuracion global y servicios de catalogo. |
| Helpers | `src/lib` | Constantes de sitio, locale, imagenes Strapi, slugs, mappers de producto y helpers de blog. |

## 4. Rutas principales

Rutas detectadas en `src/pages`:

| Ruta | Archivo | Descripcion |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Home con contenido CMS, sliders, promociones, eventos y secciones destacadas. |
| `/acerca-de-nosotros` | `src/pages/acerca-de-nosotros.astro` | Pagina institucional conectada a Strapi `about`. |
| `/financiamiento` | `src/pages/financiamiento.astro` | Pagina de financiamiento. |
| `/nuestras-marcas` | `src/pages/nuestras-marcas/index.astro` | Listado de marcas. |
| `/nuestras-marcas/[brand]` | `src/pages/nuestras-marcas/[brand]/index.astro` | Landing de marca por slug. |
| `/nuestras-marcas/[brand]/[interestitial]` | `src/pages/nuestras-marcas/[brand]/[interestitial]/index.astro` | Vista intermedia por marca/interes. |
| `/especialidades` | `src/pages/especialidades/index.astro` | Listado de especialidades. |
| `/especialidades/[category]` | `src/pages/especialidades/[category]/index.astro` | Landing de especialidad/categoria. |
| `/especialidades/[category]/[subcategory]` | `src/pages/especialidades/[category]/[subcategory]/index.astro` | Vista de aplicacion/subcategoria dentro de especialidad. |
| `/productos` | `src/pages/productos/index.astro` | PLP de catalogo de productos. |
| `/productos/[slug]` | `src/pages/productos/[slug].astro` | PDP de producto. |
| `/eventos` | `src/pages/eventos.astro` | Pagina de eventos con filtros, calendario y popup de registro. |
| `/contacto` | `src/pages/contacto.astro` | Formulario de contacto y solicitud de demo. |
| `/blog` | `src/pages/blog/index.astro` | Listado de articulos. |
| `/blog/[article]` | `src/pages/blog/[article].astro` | Detalle de articulo. |
| `/blog/autor/[autor]` | `src/pages/blog/autor/[autor].astro` | Archivo por autor. |
| `/blog/autores` | `src/pages/blog/autores/index.astro` | Listado de autores. |
| `/blog/autores/[autor]` | `src/pages/blog/autores/[autor].astro` | Perfil o archivo de autor. |
| `/aviso-de-privacidad`, `/condiciones-de-uso`, etc. | `src/pages/[legal_page].astro` | Paginas legales dinamicas desde Strapi. |
| `/team-medrent` | `src/pages/team-medrent.astro` | Ruta legacy; `vercel.json` redirecciona a `/blog/autor/team-medrent`. |
| `/404` | `src/pages/404.astro` | Pagina de error. |
| `/co/...` | `src/pages/co/*` | Variante localizada o regional para Colombia. |
| `/sitemap-index.xml`, `/sitemap-pages.xml` | `src/pages/sitemap-*.xml.ts` | Sitemaps generados. |

No existe una ruta top-level `/aplicaciones/[aplicacion]`. La vista equivalente se maneja como `/especialidades/[category]/[subcategory]`.

## 5. Instalacion local

### Requisitos previos

- Node.js `>=20.17.0`
- npm
- Acceso a las variables de entorno requeridas para Strapi y HubSpot si se probaran datos reales o formularios.

### Instalacion

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Astro levanta normalmente en `http://localhost:4321`. El endpoint de contacto permite CORS para `localhost:4321` y `localhost:4322`.

### Build de produccion

```bash
npm run build
```

### Preview local

```bash
npm run preview
```

## 6. Variables de entorno

Variables detectadas en el codigo:

| Variable | Uso | Requerida |
| --- | --- | --- |
| `STRAPI_URL` | URL base de Strapi. `src/server/strapiClient.ts` normaliza agregando `/api` si falta. `src/server/siteConfig.ts` la usa directamente para `/site-setting`. | Si |
| `STRAPI_API_TOKEN` | Bearer token para consumir Strapi desde server-side y proxy interno. | Si |
| `HUBSPOT_PAT_TK` | Private App Token de HubSpot para crear contactos desde `/api/contact`. | Si para formularios |

No se deben commitear valores reales. Usar `.env` local y variables configuradas en Vercel para produccion.

Se incluye `.env.example` con las variables necesarias sin valores.

## 7. Integracion con Strapi CMS

La integracion principal vive en `src/server/strapiClient.ts`:

- Usa `STRAPI_URL` y `STRAPI_API_TOKEN`.
- Normaliza la URL para apuntar a `/api`.
- Aplica cache en memoria por 60 segundos.
- Aplica cache best-effort en disco en `.cache/strapi`.
- Deduplica requests concurrentes con `inFlightRequests`.

Tambien existe `src/pages/api/strapi/[...slug].ts`, un proxy server-side para consumir Strapi desde rutas internas sin exponer el token.

### Contenido CMS inferido

| Endpoint / coleccion | Uso detectado |
| --- | --- |
| `/site-setting?populate=*` | Configuracion global: favicons, `gtmId` y otros ajustes globales. |
| `/home-page` | Contenido de Home y slider hero. |
| `/promo-sliders` | Promociones del sitio. |
| `/about?populate=*` | Pagina Acerca de nosotros. |
| `/events-page` | Hero, textos y eventos. |
| `/products` | Catalogo PLP/PDP, galeria, documentos, beneficios, FAQ, ficha tecnica, relacionados, variantes, marca y subcategoria. |
| `/categories` | Especialidades/categorias con subcategorias, imagenes y productos relacionados. |
| `/subcategories` | Aplicaciones o subcategorias por especialidad. |
| `/brands` | Marcas, landing de marca, colores, logo, productos destacados e interstitial cards. |
| `/blog-articles` | Blog, articulos relacionados y listados. |
| `/article-classifications` | Clasificaciones/tags de articulos. |
| `/writers` | Autores del blog. |
| `/legal-content` | Paginas legales dinamicas. |
| `/testimonials` | Testimoniales activos. |

### Fallbacks y contenido estatico

Varias paginas incluyen fallbacks estaticos cuando Strapi no responde o un campo viene vacio. Tambien hay assets temporales en `public/temp` y constantes en `src/lib/site.ts`.

Partes que siguen siendo mayormente estaticas o con contenido local:

- Textos SEO de algunas paginas.
- Componentes de layout, estructura visual y formularios.
- Algunos assets fallback en `public/temp`.
- Logica de filtros, sliders y UI cliente.

## 8. Formularios e integraciones

### Endpoint de contacto

`src/pages/api/contact.js` recibe solicitudes `POST`, valida datos basicos y crea contactos en HubSpot:

- Requiere `HUBSPOT_PAT_TK`.
- Envia a `https://api.hubapi.com/crm/v3/objects/contacts`.
- Normaliza nombre y apellido.
- Valida telefono mexicano de 10 digitos y lo envia con prefijo `+52`.
- Mapea `specialty` a la propiedad HubSpot `especialidad_medica`.
- Convierte arrays de checkbox a strings separados por `;`.
- Permite CORS para dominios configurados en el archivo.

### Formularios detectados

| Formulario | Ubicacion | Envio | Tracking |
| --- | --- | --- | --- |
| Contacto / demo | `src/pages/contacto.astro` con `BaseForm` | `/api/contact` via `public/scripts/formValidator.js` | `generate_lead` a `dataLayer` |
| Newsletter | `src/components/FormNewsletter.astro` | `/api/contact` | `generate_lead` a `dataLayer` |
| Cotizacion PDP | `src/components/popup/popUpSolicitarCotizacion.astro` | Logica actual muestra exito temprano; contiene codigo posterior no alcanzado para envio externo. Pendiente de confirmar flujo final. | Tiene helper para `dataLayer` en codigo posterior no alcanzado |
| Eventos | `src/components/popup/popupEvento.astro` y `src/pages/eventos.astro` | Usa componentes de formulario y validadores compartidos. | `generate_lead` via validador si usa `initForm` |

### Validaciones compartidas

`public/scripts/formValidator.js` centraliza validaciones de:

- Nombre.
- Email.
- Telefono.
- Especialidad.
- Estado.
- Institucion.
- Medio por el que nos conocio.
- Mensaje opcional.
- Checkbox de aviso de privacidad.
- Campos UTM.

La utilidad `public/scripts/phoneUtils.js` ayuda a extraer digitos del telefono.

## 9. Tracking y marketing

### GTM y dataLayer

`src/layouts/Layout.astro` carga Google Tag Manager con `siteConfig?.gtmId`, que viene de Strapi `site-setting`.

Adicionalmente se carga:

```html
<script src="/scripts/setEventsDataLayer.js" defer></script>
```

Los formularios empujan eventos a `window.dataLayer`, principalmente `generate_lead`, con datos de formulario, pagina y tracking UTM.

### Recomendaciones

- Centralizar GA4, Meta Pixel, Hotjar, conversiones y etiquetas de remarketing dentro de GTM.
- Evitar instalar scripts directos en `Layout.astro` si ya existen tags equivalentes en GTM.
- Mantener un inventario de eventos `dataLayer` y nombres de eventos.
- Revisar duplicados cuando se agreguen nuevos formularios, popups o botones CTA.
- Validar que `siteConfig.gtmId` este configurado en Strapi y en el ambiente de produccion.

## 10. Flujo de desarrollo Git

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

El proyecto esta configurado para Vercel:

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
- Confirmar que `HUBSPOT_PAT_TK` esta vigente y con permisos para crear contactos.
- Revisar que `site-setting` en Strapi tenga favicons y `gtmId`.
- Probar formularios en entorno preview.
- Revisar rutas dinamicas de productos, marcas, especialidades y blog.
- Revisar que no haya secretos en commits, logs o archivos publicos.

## 12. Checklist de entrega

- [ ] Build exitoso con `npm run build`.
- [ ] Rutas principales revisadas.
- [ ] Responsive validado en mobile, tablet y desktop.
- [ ] Formularios probados contra HubSpot o entorno de pruebas.
- [ ] SEO basico validado: title, description, canonical, OG image y schemas.
- [ ] GTM/analytics revisado en preview y produccion.
- [ ] Variables de entorno configuradas en Vercel.
- [ ] Sin claves, tokens o valores sensibles expuestos.
- [ ] Sitemap y robots revisados.
- [ ] README actualizado.

## 13. Mantenimiento

### Agregar nuevas paginas

1. Crear el archivo en `src/pages`.
2. Usar `Layout.astro` para heredar SEO global, header, footer y tracking.
3. Agregar `BreadcrumbSchema` y `Breadcrumb` si aplica.
4. Definir `title`, `description`, `keywords` y `ogImage`.
5. Si consume Strapi, usar `strapiFetch` o crear un servicio en `src/server/api`.

### Agregar nuevas secciones

1. Crear el componente en `src/components/sections`.
2. Mantener props claras y reutilizables.
3. Evitar duplicar logica de fetch dentro de muchos componentes si puede vivir en `src/server`.
4. Reutilizar `ImageResponsive` para imagenes CMS o estaticas.

### Conectar nuevas colecciones de Strapi

1. Crear un servicio en `src/server/api`.
2. Consumir con `strapiFetch`.
3. Usar `URLSearchParams` para filtros, populate y paginacion.
4. Mapear datos a una estructura estable antes de pasarlos a componentes.
5. Definir fallbacks para campos opcionales.
6. No exponer `STRAPI_API_TOKEN` en codigo cliente.

### Agregar o modificar formularios

1. Reutilizar `BaseForm`, `FormField`, `PhoneField`, `SelectField`, `CheckboxField` y `SubmitButton`.
2. Inicializar validacion con `initForm("id-del-form")` cuando aplique.
3. Enviar datos a `/api/contact` si el destino es HubSpot.
4. Confirmar mapeo de propiedades HubSpot antes de publicar.
5. Agregar o actualizar eventos `dataLayer` sin duplicar nombres.

### Manejar tracking sin duplicados

1. Usar GTM como punto central para tags externos.
2. Enviar eventos desde el sitio solo a `window.dataLayer`.
3. Documentar cada nuevo evento con nombre, payload y formulario/origen.
4. Evitar cargar GA4, Meta Pixel, Hotjar o scripts similares directamente si ya estan en GTM.
5. Probar con Tag Assistant o vista preview de GTM antes de deploy.

## 14. Notas pendientes de confirmar

- Si el nombre tecnico del paquete debe cambiar de `evolved-earth` a un nombre relacionado con MedRent.
- Configuracion exacta de GA4, Meta Pixel, Hotjar u otras etiquetas dentro del contenedor GTM.
- Flujo final esperado del popup de cotizacion PDP, ya que el codigo actual muestra exito antes de ejecutar el envio externo posterior.
- Politica final de regiones/locales para rutas `/co`.
