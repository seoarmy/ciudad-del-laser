import { useState } from 'react';
import Seo from '../components/Seo';
import ComparisonTable from '../components/ComparisonTable';
import WhatsIncluded from '../components/WhatsIncluded';
import MateCustomizer from '../components/personalizador/MateCustomizer';
import PlacaCustomizer from '../components/personalizador/PlacaCustomizer';

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

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${
        active ? 'bg-orange text-carbon' : 'bg-gray-light text-carbon hover:bg-gray-lighter'
      }`}
    >
      {children}
    </button>
  );
}

export default function Personalizador() {
  const [tab, setTab] = useState('mates');

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

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="flex gap-3 justify-center mb-12">
          <TabButton active={tab === 'mates'} onClick={() => setTab('mates')}>Mates</TabButton>
          <TabButton active={tab === 'placas'} onClick={() => setTab('placas')}>Placas</TabButton>
        </div>

        {tab === 'mates' ? <MateCustomizer /> : <PlacaCustomizer />}
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-14 md:pb-20">
        <WhatsIncluded items={PERSONALIZADOR_INCLUDES} />
      </section>

      {tab === 'placas' && (
        <section className="bg-gray-light py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-8">Tamaños de placa disponibles</h2>
            <ComparisonTable {...SIZE_COMPARISON} />
          </div>
        </section>
      )}
    </>
  );
}
