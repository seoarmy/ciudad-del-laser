import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import FAQAccordion from '../components/FAQAccordion';
import { GENERAL_FAQS } from '../data/faqs';
import { SERVICES } from '../data/services';
import { buildWhatsappLink } from '../data/site';

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GENERAL_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export default function PreguntasFrecuentes() {
  return (
    <>
      <Seo
        title="Preguntas frecuentes"
        description="Respuestas a las preguntas más frecuentes sobre cotización, envíos, formatos de archivo y zonas de cobertura de Ciudad del Láser."
      />
      <JsonLd data={FAQ_SCHEMA} />
      <section className="bg-carbon text-white text-center py-16 md:py-20 px-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">Preguntas frecuentes</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Las dudas más comunes sobre cotizar, enviar tu archivo y coordinar tu pedido.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <FAQAccordion faqs={GENERAL_FAQS} />
      </section>

      <section className="bg-gray-light py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-2xl uppercase mb-4">¿Tu pregunta es sobre un servicio puntual?</h2>
          <p className="text-gray-text mb-6">Cada servicio tiene su propia sección de preguntas frecuentes.</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/servicios/${s.slug}`}
                className="bg-white border border-gray-lighter hover:border-orange rounded-lg px-4 py-2 text-sm font-semibold"
              >
                {s.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 text-center px-4">
        <h2 className="font-heading text-2xl uppercase mb-4">¿No encontraste tu respuesta?</h2>
        <a
          href={buildWhatsappLink('Hola! Tengo una consulta que no encontré en las preguntas frecuentes.')}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-orange hover:bg-orange-dark text-carbon font-bold rounded-lg px-8 py-3"
        >
          Preguntar por WhatsApp
        </a>
      </section>
    </>
  );
}
