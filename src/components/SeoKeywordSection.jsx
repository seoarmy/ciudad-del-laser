import { Check } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { buildWhatsappLink } from '../data/site';

export default function SeoKeywordSection({ title, paragraph, highlights, image, serviceName }) {
  const waMessage = `Hola! Quiero cotizar: ${serviceName}.`;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative rounded-xl overflow-hidden border border-gray-lighter order-2 md:order-1">
          <img src={image.src} alt={image.alt} className="w-full h-64 md:h-full object-cover" loading="lazy" />
          {/* blueprint-style corner accent, refuerza precisión digital */}
          <div className="absolute inset-3 border border-orange/50 rounded-lg pointer-events-none" />
          <span className="absolute top-5 left-5 font-mono text-[10px] text-orange bg-carbon/70 rounded px-2 py-1">
            ± 0.1mm
          </span>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="font-heading text-2xl md:text-3xl mb-4">{title}</h2>
          <p className="text-gray-text leading-relaxed mb-6">{paragraph}</p>

          <ul className="flex flex-col gap-2.5 mb-8">
            {highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2.5 bg-white border border-gray-lighter rounded-lg px-4 py-2.5 text-sm text-carbon"
              >
                <span className="shrink-0 w-5 h-5 rounded-full bg-orange/10 flex items-center justify-center">
                  <Check size={12} className="text-orange" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <MagneticButton
            href={buildWhatsappLink(waMessage)}
            target="_blank"
            rel="noreferrer"
            className="bg-accent-gradient text-white font-bold rounded-lg px-6 py-3 text-sm"
          >
            Cotizar por WhatsApp
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
