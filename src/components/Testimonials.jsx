import { Star, Quote } from 'lucide-react';

export default function Testimonials({ items, title = 'Lo que dicen nuestros clientes' }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
      <h2 className="font-heading text-2xl md:text-3xl text-center mb-2">{title}</h2>
      <p className="text-gray-text text-center text-sm mb-10">Reseñas reales de Google</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <div key={i} className="bg-white border border-gray-lighter rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="text-orange" fill="currentColor" />
                ))}
              </div>
              <Quote className="text-gray-lighter" size={22} />
            </div>
            <p className="text-sm text-carbon leading-relaxed">"{t.quote}"</p>
            <p className="font-mono text-xs text-gray-text mt-auto">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
