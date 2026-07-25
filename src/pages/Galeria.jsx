import { useState, useMemo } from 'react';
import { SERVICES } from '../data/services';
import Seo from '../components/Seo';
import Gallery from '../components/Gallery';

const ALL_ITEMS = SERVICES.flatMap((s) =>
  s.gallery.map((item, i) => ({ ...item, category: s.slug, categoryLabel: s.shortTitle, key: `${s.slug}-${i}` }))
);

export default function Galeria() {
  const [filter, setFilter] = useState('todos');

  const items = useMemo(
    () => (filter === 'todos' ? ALL_ITEMS : ALL_ITEMS.filter((i) => i.category === filter)),
    [filter]
  );

  return (
    <>
      <Seo
        title="Galería de trabajos"
        description="Mirá trabajos reales de corte y grabado láser en MDF, acrílico, metal, madera y más, filtrados por categoría de servicio."
      />
      <section className="bg-carbon text-white text-center py-16 md:py-20 px-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">Galería</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">Trabajos reales de corte y grabado láser por categoría.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setFilter('todos')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === 'todos' ? 'bg-orange text-carbon' : 'bg-gray-light text-carbon hover:bg-gray-lighter'
            }`}
          >
            Todos
          </button>
          {SERVICES.map((s) => (
            <button
              key={s.slug}
              onClick={() => setFilter(s.slug)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === s.slug ? 'bg-orange text-carbon' : 'bg-gray-light text-carbon hover:bg-gray-lighter'
              }`}
            >
              {s.shortTitle}
            </button>
          ))}
        </div>

        <Gallery items={items} />
      </section>
    </>
  );
}
