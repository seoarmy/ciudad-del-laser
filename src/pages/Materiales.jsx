import { useState } from 'react';
import { MATERIAL_FAMILIES, MATERIAL_COMPARISON } from '../data/materials';
import { buildWhatsappLink } from '../data/site';
import Seo from '../components/Seo';
import MaterialTable from '../components/MaterialTable';
import ComparisonTable from '../components/ComparisonTable';

export default function Materiales() {
  const [active, setActive] = useState(MATERIAL_FAMILIES[0].id);
  const activeFamily = MATERIAL_FAMILIES.find((f) => f.id === active);

  return (
    <>
      <Seo
        title="Materiales para corte y grabado láser"
        description="Qué materiales cortamos, marcamos y grabamos con láser: MDF, acrílico, alto impacto, PETG, cartón, cuero, corcho y más. Espesores y tamaños disponibles."
      />
      <section className="bg-carbon text-white text-center py-16 md:py-20 px-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">Materiales</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Qué se puede cortar, marcar y grabar en cada material, con espesores y tamaños disponibles.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {MATERIAL_FAMILIES.map((fam) => (
            <button
              key={fam.id}
              onClick={() => setActive(fam.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                active === fam.id
                  ? 'bg-orange text-carbon'
                  : 'bg-gray-light text-carbon hover:bg-gray-lighter'
              }`}
            >
              {fam.label}
            </button>
          ))}
        </div>

        <MaterialTable rows={activeFamily.items} />

        <div className="mt-8 bg-orange/10 border border-orange rounded-xl p-6 text-center">
          <p className="font-semibold text-carbon mb-3">¿Tu material no está en la lista? Consultanos.</p>
          <a
            href={buildWhatsappLink('Hola! Quiero consultar por un material que no vi en la web.')}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-orange hover:bg-orange-dark text-carbon font-semibold rounded-lg px-6 py-2 text-sm"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-gray-light py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-8">MDF vs Acrílico vs Alto impacto</h2>
          <ComparisonTable {...MATERIAL_COMPARISON} />
        </div>
      </section>
    </>
  );
}
