import { useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Seo from '../components/Seo';
import ComparisonTable from '../components/ComparisonTable';
import WhatsIncluded from '../components/WhatsIncluded';
import { buildWhatsappLink } from '../data/site';

const MATE_STEPS = [
  {
    title: 'Dibujá la ubicación del grabado',
    text: 'En una hoja dibujá un círculo representando la virola del mate vista desde arriba y marcá dónde querés ubicar cada diseño.',
  },
  {
    title: 'Enviá una foto y los archivos',
    text: 'Sacale una foto al dibujo y enviala junto con los logos, escudos o diseños (JPG, PDF, PNG) por mail o WhatsApp.',
  },
  {
    title: 'Elegí la tipografía',
    text: 'Para los textos podés elegir cualquier fuente disponible en Word o enviarnos el link para descargarla gratis.',
  },
  {
    title: 'Recibí y confirmá el boceto',
    text: 'Con la información recibida realizamos un boceto digital para mostrarte cómo quedará el grabado.',
  },
  {
    title: 'Grabado final',
    text: 'Una vez que recibimos tu confirmación, comenzamos con el grabado definitivo.',
  },
];

const MATE_WARNINGS = [
  {
    title: 'Dejá la referencia',
    text: 'Cuando entregues el mate, colocá dentro del mismo el papel utilizado para el dibujo de referencia.',
  },
  {
    title: 'Identificá el mate',
    text: 'La bolsa o el mate deben tener el nombre del dueño o emprendimiento. Esto evita confusiones con otros trabajos.',
  },
];

const PERSONALIZADOR_INCLUDES = [
  { label: 'Vista previa personalizada', included: true },
  { label: 'Asesoramiento de tipografía y tamaño', included: true },
  { label: 'Corte y grabado de precisión', included: true },
  { label: 'Control de calidad', included: true },
  { label: 'Empaquetado', included: true },
  { label: 'Coordinación de envío/retiro', included: false },
];

const SIZE_COMPARISON = {
  headers: ['15x10cm', '20x15cm', '30x20cm'],
  recommendedIndex: 1,
  rows: [
    { label: 'Uso recomendado', values: ['Escritorio, souvenir', 'Pared, oficina', 'Institucional, exterior'] },
    { label: 'Materiales sugeridos', values: ['Acrílico, MDF', 'Acrílico, MDF, metal', 'Metal, bronce'] },
  ],
};

const IFRAME_WIDTH = 1024;
const IFRAME_HEIGHT = 900;

function VirolasIframe() {
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.offsetWidth / IFRAME_WIDTH));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: IFRAME_HEIGHT * scale }}>
      <iframe
        src="https://ember.com.ar/virolas/index.php"
        title="Personalizador de mates y placas"
        loading="lazy"
        className="block mx-auto border-0 rounded-xl origin-top"
        style={{ width: IFRAME_WIDTH, height: IFRAME_HEIGHT, transform: `scale(${scale})` }}
      />
    </div>
  );
}

export default function Personalizador() {
  return (
    <>
      <Seo
        title="Personalizador de mates y placas"
        description="Personalizá tu mate o placa online: elegí texto, tipografía y tamaño, y pedí tu cotización por WhatsApp al instante."
      />
      <section className="bg-carbon text-white text-center py-16 md:py-20 px-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">Personalizador</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Armá una vista previa de tu mate o placa antes de pedir presupuesto.
        </p>
      </section>

      <section className="px-4 md:px-8 py-14 md:py-20">
        <VirolasIframe />
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-14 md:pb-20">
        <WhatsIncluded items={PERSONALIZADOR_INCLUDES} />
      </section>

      <section className="bg-gray-light py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-8">Tamaños de placa disponibles</h2>
          <ComparisonTable {...SIZE_COMPARISON} />
        </div>
      </section>

      <section className="bg-gray-light py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-4">
              Cómo enviarnos tu diseño de mate
            </h2>
            <p className="text-gray-text text-center max-w-2xl mx-auto mb-12">
              Pasos a seguir para poder grabar el mate.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 mb-12">
              {MATE_STEPS.map((step, i) => (
                <div key={step.title} className="flex gap-4 items-start">
                  <span className="font-heading text-orange text-4xl leading-none shrink-0 select-none">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-sm uppercase mb-1">{step.title}</p>
                    <p className="text-sm text-gray-text">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-orange/10 border border-orange rounded-xl p-6">
              <p className="flex items-center gap-2 font-heading uppercase text-orange-dark mb-4">
                <AlertTriangle size={20} /> Importante
              </p>
              <div className="flex flex-col gap-4">
                {MATE_WARNINGS.map((w) => (
                  <div key={w.title}>
                    <p className="font-semibold text-sm">{w.title}</p>
                    <p className="text-sm text-gray-text">{w.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={buildWhatsappLink('Hola! Quiero enviar mi diseño para grabado en mate.')}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-8 bg-orange hover:bg-orange-dark text-carbon font-semibold rounded-lg px-6 py-3 text-sm"
            >
              Enviar diseño de mate por WhatsApp
            </a>
          </div>
        </section>
    </>
  );
}
