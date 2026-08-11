# Migración a Sanity CMS + SSR (Next.js / Firebase App Hosting)

Fecha: 2026-08-11

## Contexto

El sitio actual es una SPA Vite + React 19 + React Router 7. Todo el contenido
(servicios, materiales, FAQs, testimonios, blog, datos de sitio/sucursales)
vive hardcodeado en `src/data/*.js`. Cualquier cambio de contenido requiere
tocar código y redeployar. El objetivo es mover todo el contenido a Sanity
CMS y que los cambios se reflejen en producción sin build/deploy manual, con
SSR real para SEO.

## Alcance

- Migrar **todo** el contenido a Sanity de una: `services.js`, `materials.js`,
  `faqs.js`, `testimonials.js`, `blog.js`, `site.js`.
- Reescribir el frontend en **Next.js (App Router)** con SSR.
- Hosting en **Firebase App Hosting**.
- El **personalizador** (iframe a `https://ember.com.ar/virolas/index.php`)
  se porta tal cual, sin cambios ni integración con Sanity.

## Arquitectura

- Next.js 15 App Router reemplaza Vite + React Router.
- Sanity Studio embebido en `/studio` dentro del mismo repo Next
  (`next-sanity`), usando auth propia de Sanity.
- Capa de datos: `lib/sanity/queries.ts` con GROQ por colección, tageadas
  con `next: { tags: [...] }` para revalidación selectiva.
- Cache: NO dynamic-sin-cache. Se usa `revalidateTag` disparado por un
  webhook de Sanity (`on publish` → `POST /api/revalidate`) para invalidar
  al instante la colección que cambió. Fallback de seguridad:
  `revalidate: 60` por si el webhook falla (nunca más de 60s desactualizado).
- Rutas dinámicas (`/servicios/[slug]`, `/blog/[slug]`) **sin**
  `generateStaticParams`: resolución 100% on-demand en request, así un
  servicio o post nuevo en Sanity aparece sin redeploy. Quedan cacheados
  por tag hasta el próximo publish en Sanity.
- Server Components por defecto (Navbar, Footer, WhatsappFloatingButton,
  la mayoría de páginas). `'use client'` solo en lo interactivo: QuoteForm,
  FAQAccordion, AnimatedCounter, MagneticButton, wrapper del iframe del
  personalizador.
- SEO: `generateMetadata` por página + JSON-LD inyectado server-side
  (reemplaza `Seo.jsx`/`JsonLd.jsx`), `app/sitemap.ts` y `app/robots.ts`
  generados dinámicamente desde Sanity.
- Imágenes servidas desde Sanity Assets CDN vía `next-sanity-image`.

## Modelado de datos (Sanity schemas)

- `service`: slug, título, hero, specs, refs a `material` y `faq`, campos SEO.
- `material`: nombre, specs, datos de tabla comparativa.
- `faq`: pregunta, respuesta, categoría.
- `testimonial`: nombre, texto, rating, foto.
- `blogPost`: título, slug, cuerpo (Portable Text), autor, imagen, SEO, fecha.
- `siteSettings` (singleton): contacto, sucursales (incluye `mapsEmbedUrl`
  para los iframes de mapas en Contacto/DondeEstamos), redes sociales.

## Mapeo de rutas

| Actual (React Router) | Nuevo (Next App Router) |
|---|---|
| `/` | `app/page.tsx` |
| `/servicios/:slug` | `app/servicios/[slug]/page.tsx` |
| `/materiales` | `app/materiales/page.tsx` |
| `/galeria` | `app/galeria/page.tsx` |
| `/personalizador` | `app/personalizador/page.tsx` (iframe intacto) |
| `/como-armar-tu-archivo` | `app/como-armar-tu-archivo/page.tsx` |
| `/envios-y-pagos` | `app/envios-y-pagos/page.tsx` |
| `/preguntas-frecuentes` | `app/preguntas-frecuentes/page.tsx` |
| `/donde-estamos` | `app/donde-estamos/page.tsx` |
| `/contacto` | `app/contacto/page.tsx` |
| `/blog` | `app/blog/page.tsx` |
| `/blog/:slug` | `app/blog/[slug]/page.tsx` |

## Hosting

Firebase App Hosting (no Cloud Functions + Hosting legacy): detecta Next.js
automático, deploy con git push, soporta SSR + revalidación on-demand.
`minInstances: 1` recomendado para evitar cold starts de Cloud Run en el
primer request tras inactividad.

## Plan de migración

1. Setup proyecto Sanity + schemas + Studio embebido; seed script que carga
   el contenido actual desde `src/data/*.js` a Sanity (evita carga manual
   doble).
2. Setup app Next.js en paralelo, capa de datos GROQ, layout base y
   componentes portados desde la SPA actual.
3. Migrar página por página (Home primero), cada una leyendo de Sanity en
   vez de `import` estático de `src/data`.
4. Migrar SEO/JSON-LD, sitemap y robots dinámicos.
5. Configurar Firebase App Hosting + webhook de revalidación en Sanity.
6. QA: Lighthouse, verificar SSR real (`view-source` trae contenido, no
   shell vacío), probar edición en Sanity → confirmar reflejo inmediato en
   prod.
7. Cutover de DNS, redirects 301 si cambia alguna URL, apagar la SPA vieja.

## Riesgos

- Doble mantenimiento de contenido durante la migración → mitigado con seed
  script en vez de carga manual duplicada.
- Cold start de Cloud Run en Firebase App Hosting → mitigado con
  `minInstances: 1`.
- Iframe de `ember.com.ar` queda fuera de control del proyecto (dependencia
  externa preexistente, sin cambio de riesgo).

## Testing

- Cada página verificada con datos reales de Sanity antes del cutover.
- Smoke test de las 12 rutas.
- Core Web Vitals no deben empeorar respecto a la SPA actual.
- Prueba end-to-end de "publish en Sanity → cambio visible en prod" antes
  de dar por cerrada la migración.
