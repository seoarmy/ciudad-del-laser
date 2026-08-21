import { Link, useParams, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { getServiceBySlug, pickRandomImage } from '../data/services';
import { buildWhatsappLink, SITE_URL, SITE } from '../data/site';
import { FILE_PROGRAMS, LINE_COLORS } from '../data/fileGuide';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import MaterialTable from '../components/MaterialTable';
import MarqueeGallery from '../components/MarqueeGallery';
import FAQAccordion from '../components/FAQAccordion';
import ComparisonTable from '../components/ComparisonTable';
import WhatsIncluded from '../components/WhatsIncluded';
import QuoteForm from '../components/QuoteForm';
import SeoKeywordSection from '../components/SeoKeywordSection';
import MagneticButton from '../components/MagneticButton';
import Testimonials from '../components/Testimonials';
import { getTestimonialsForService } from '../data/testimonials';

const TECHNIQUE_COMPARISON = {
  headers: ['Corte', 'Grabado', 'Corte + Grabado'],
  recommendedIndex: 2,
  rows: [
    { label: 'Qué hace', values: ['Separa el material siguiendo un contorno', 'Marca la superficie sin atravesar el material', 'Combina ambas técnicas en una pieza'] },
    { label: 'Cuándo conviene', values: ['Piezas, letras, formas recortadas', 'Textos, logos, detalles superficiales', 'Piezas con forma propia + detalle grabado'] },
    { label: 'Tiempo de producción', values: ['Rápido', 'Rápido', 'Medio'] },
  ],
};

export default function ServiceLanding() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  const randomImage = useMemo(() => (service ? pickRandomImage(service.gallery) : null), [service]);

  if (!service) return <Navigate to="/" replace />;

  const applicableColors = LINE_COLORS.filter((c) => service.materials.some((m) => m[c.key]));
  const CUT_ONLY_SERVICES = ['corte-laser', 'corte-laser-acrilico', 'corte-laser-maquetas'];
  const needsFileSubmissionGuide = CUT_ONLY_SERVICES.includes(service.slug);

  const waMessage = `Hola! Quiero cotizar: ${service.title}.`;
  const pageUrl = `${SITE_URL}/${service.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    serviceType: service.title,
    url: pageUrl,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Buenos Aires, Argentina',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: service.title, item: pageUrl },
    ],
  };

  return (
    <>
      <Seo title={service.heroTitle} description={service.metaDescription} image={service.gallery[0].img} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-carbon text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <h1 className="font-heading text-3xl md:text-5xl uppercase mb-5 max-w-3xl mx-auto">{service.heroTitle}</h1>
          <p className="text-gray-200 max-w-2xl mx-auto mb-8">{service.heroSubtitle}</p>
          <MagneticButton
            href={buildWhatsappLink(waMessage)}
            target="_blank"
            rel="noreferrer"
            className="bg-accent-gradient text-carbon font-semibold rounded-lg px-8 py-3"
          >
            Cotizar por WhatsApp
          </MagneticButton>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20">
        {service.description.map((p, i) => (
          <p key={i} className="text-gray-text mb-4 leading-relaxed">
            {p}
          </p>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-14 md:pb-20">
        <WhatsIncluded
          mailTo={!needsFileSubmissionGuide ? SITE.fileSubmissionEmail : undefined}
          mailSubject={`Diseño ${service.title}`}
        />
      </section>

      <section className="bg-gray-light py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-8">Materiales y espesores</h2>
          <MaterialTable rows={service.materials} />
        </div>
      </section>

      {needsFileSubmissionGuide && (
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-2">Cómo enviarnos tu diseño</h2>
        <p className="text-gray-text text-center mb-10">3 pasos y listo para cotizar.</p>

        <div className="flex flex-col gap-8">
          {applicableColors.length > 0 && (
            <div className="flex gap-4 items-start">
              <span className="font-heading text-orange text-3xl leading-none shrink-0 select-none w-8 text-center">1</span>
              <div>
                <p className="font-semibold text-carbon mb-3">
                  Marcá con estos colores de línea qué tiene que hacer el láser en cada trazo
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {applicableColors.map((c) => (
                    <li key={c.key} className="flex items-center gap-2 text-sm text-gray-text">
                      <span className={`w-4 h-4 rounded-full ${c.dot} inline-block`} /> {c.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex gap-4 items-start">
            <span className="font-heading text-orange text-3xl leading-none shrink-0 select-none w-8 text-center">
              {applicableColors.length > 0 ? '2' : '1'}
            </span>
            <div>
              <p className="font-semibold text-carbon mb-3">Guardá tu archivo en alguno de estos formatos</p>
              <ul className="flex flex-wrap gap-2">
                {FILE_PROGRAMS.map((p) => (
                  <li key={p} className="bg-gray-light rounded-lg px-3 py-2 text-sm text-carbon">{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="font-heading text-orange text-3xl leading-none shrink-0 select-none w-8 text-center">
              {applicableColors.length > 0 ? '3' : '2'}
            </span>
            <div>
              <p className="font-semibold text-carbon mb-4">Enviánoslo y te cotizamos</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE.fileSubmissionEmail}?subject=Diseño ${service.title}`}
                  className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-carbon font-semibold rounded-lg px-6 py-3 text-sm transition-colors"
                >
                  <Mail size={16} /> Enviar diseño a {SITE.fileSubmissionEmail}
                </a>
                <Link
                  to="/como-armar-tu-archivo"
                  className="inline-flex items-center gap-1.5 border border-gray-lighter hover:border-orange text-carbon font-semibold rounded-lg px-6 py-3 text-sm transition-colors"
                >
                  Ver guía completa <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {service.accessories && (
        <section className="bg-gray-light py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-8">Accesorios disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.accessories.map((acc) => (
                <div key={acc.title} className="bg-white border border-gray-lighter rounded-xl p-6">
                  <p className="font-heading uppercase mb-2">{acc.title}</p>
                  <p className="text-sm text-gray-text">{acc.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SeoKeywordSection
        title={`Todo sobre ${service.shortTitle.toLowerCase()} en ${SITE.name}`}
        paragraph={service.seoParagraph}
        highlights={service.highlights}
        image={randomImage}
        serviceName={service.title}
      />

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-8">Corte vs Grabado vs Corte + Grabado</h2>
        <ComparisonTable {...TECHNIQUE_COMPARISON} />
      </section>

      <section className="bg-gray-light py-14 md:py-20">
        <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-8">Trabajos realizados</h2>
        <MarqueeGallery items={service.gallery} />
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-8">Preguntas frecuentes</h2>
        <FAQAccordion faqs={service.faqs} />
      </section>

      <Testimonials items={getTestimonialsForService(service.slug)} />

      <section className="bg-carbon text-white py-16 md:py-20">
        <div className="max-w-md mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-4xl uppercase mb-4">¿Listo para cotizar?</h2>
          <p className="text-gray-300 mb-8">Completá el formulario y lo enviamos directo a nuestro WhatsApp.</p>
          <div className="bg-white rounded-xl p-6">
            <QuoteForm serviceName={service.title} />
          </div>
          <p className="mt-6 text-gray-300">
            o escribinos a{' '}
            <a href={`mailto:${SITE.email}?subject=Consulta ${service.title}`} className="underline hover:text-orange">
              {SITE.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
