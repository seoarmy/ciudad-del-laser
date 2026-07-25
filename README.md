# Ciudad del Láser — Sitio Web

Frontend del nuevo sitio web de Ciudad del Láser (corte y grabado láser, Buenos Aires), desarrollado para MANYA SAS.

**Sitio en vivo (demo):** https://ciudad-del-laser.web.app
**Repositorio:** https://github.com/seoarmy/ciudad-del-laser

---

## Qué incluye el sitio

### Páginas

| Página | Ruta | Descripción |
|---|---|---|
| Inicio | `/` | Hero, grilla de servicios, materiales, personalizador, galería, FAQ, testimonios, estadísticas |
| Servicios (9) | `/servicios/:slug` | Landing individual por servicio, cada una con su propio SEO |
| Materiales | `/materiales` | Ficha técnica completa: qué se puede cortar/marcar/grabar por material |
| Galería | `/galeria` | Trabajos realizados, filtrable por categoría |
| Personalizador | `/personalizador` | Simulador de mates y placas personalizadas |
| Cómo armar tu archivo | `/como-armar-tu-archivo` | Instructivo oficial para preparar el archivo de corte |
| Envíos y pagos | `/envios-y-pagos` | Información de envío y formas de pago |
| Preguntas frecuentes | `/preguntas-frecuentes` | FAQ general del negocio |
| Dónde estamos | `/donde-estamos` | Dirección, mapa y zonas de cobertura |
| Contacto | `/contacto` | Formulario, mapa, WhatsApp |
| Blog | `/blog` y `/blog/:slug` | Artículos de contenido/SEO |

Los 9 servicios: Corte láser MDF, Grabado láser en metal, Corte y grabado láser en madera, Corte láser acrílico, Placas conmemorativas, Grabado en mármol, Placas para nicho/cementerio, Corte láser para maquetas, Trabajos personalizados.

### Funcionalidades principales

- **Cotización por WhatsApp** en cada página: botón flotante + formularios que arman el mensaje automáticamente con los datos cargados.
- **Personalizador de mates y placas**: vista previa en vivo, con reglas de producción reales (margen de 5mm, tamaño mínimo legible) tomadas del instructivo oficial del cliente.
- **Galería con carrusel automático** de trabajos reales por servicio.
- **Testimonios** reales de Google (curados, sin los que tenían algún conflicto).
- **SEO técnico completo**: meta title/description por página, canonical, Open Graph, Twitter Card, datos estructurados (schema.org: LocalBusiness, Service, FAQPage, BreadcrumbList, BlogPosting), `sitemap.xml`, `robots.txt` y `llms.txt` (para buscadores con IA).
- **Diseño responsive**, mobile-first.

---

## Cómo editar el contenido

Todo el contenido vive en archivos de datos en `src/data/`, separado del diseño. No hace falta tocar componentes para actualizar texto:

| Archivo | Qué contiene |
|---|---|
| `src/data/services.js` | Los 9 servicios: título, descripción, materiales, FAQs, galería, keywords SEO |
| `src/data/materials.js` | Ficha técnica de materiales (la del PDF oficial) |
| `src/data/faqs.js` | Preguntas frecuentes generales |
| `src/data/testimonials.js` | Testimonios mostrados en Home y en cada servicio |
| `src/data/blog.js` | Artículos del blog |
| `src/data/site.js` | Datos de la empresa: WhatsApp, mail, dirección, zonas de cobertura |

### Reemplazar fotos

Todas las imágenes son placeholders de `picsum.photos` (marcadas con `{/* TODO: reemplazar con foto real del cliente */}` en el código). Cuando el cliente envíe el material fotográfico organizado por categoría, se reemplazan las URLs en `services.js` y `blog.js`.

---

## Cómo correr el proyecto

```bash
npm install       # instalar dependencias
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run build      # build de producción a /dist
npm run preview    # previsualizar el build de producción
```

## Deploy

El sitio se despliega a Firebase Hosting:

```bash
npm run build
firebase deploy --only hosting
```

Configuración en `firebase.json` / `.firebaserc` (proyecto Firebase: `ciudad-del-laser`).

---

## Stack técnico

- React 19 + Vite
- React Router (rutas del lado del cliente)
- Tailwind CSS v4
- Sin backend: es un frontend estático. Los formularios envían por WhatsApp/mail, no hay base de datos ni panel de administración todavía.

---

## Pendientes antes de pasar a producción

- [ ] **Dominio final**: hoy `SITE_URL` apunta a `https://www.ciudaddellaser.com.ar` como placeholder — confirmar el dominio real y actualizar en `src/data/site.js`, `index.html`, `public/sitemap.xml` y `public/robots.txt`.
- [ ] **Fotos reales** del cliente (proceso, piezas terminadas) vía Drive, organizadas por categoría de servicio.
- [ ] **Imagen Open Graph** propia (1200×630px) para que los links compartidos en redes se vean con la marca real, no el placeholder actual.
- [ ] **Rating de Google** (cantidad de reseñas y estrellas) para agregar `aggregateRating` al schema de structured data.
- [ ] **Panel de administración**, integración de Google Analytics/Ads, y migración de hosting: quedaron fuera del alcance de este frontend (requieren backend/infraestructura aparte).

---

## Contacto del desarrollo

Sitio desarrollado por **MANYA SAS** — https://manyadigital.com.ar
