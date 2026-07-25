import { Check, Circle } from 'lucide-react';

const DEFAULT_ITEMS = [
  { label: 'Diseño de archivo asistido', included: true },
  { label: 'Corte de precisión', included: true },
  { label: 'Acabado y pulido de bordes', included: true },
  { label: 'Control de calidad', included: true },
  { label: 'Empaquetado', included: true },
  { label: 'Coordinación de envío/retiro', included: false },
];

export default function WhatsIncluded({ items = DEFAULT_ITEMS, title = '¿Qué incluye tu cotización?' }) {
  return (
    <div>
      <h3 className="font-heading text-xl md:text-2xl uppercase mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 bg-white border border-gray-lighter rounded-lg px-4 py-3"
          >
            {item.included ? (
              <Check className="text-orange shrink-0" size={20} strokeWidth={3} />
            ) : (
              <Circle className="text-gray-text/40 shrink-0" size={18} />
            )}
            <span className={`text-sm ${item.included ? 'text-carbon font-medium' : 'text-gray-text'}`}>
              {item.label}
              {!item.included && <span className="block text-xs text-gray-text/70">A coordinar</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
