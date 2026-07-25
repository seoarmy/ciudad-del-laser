import { useState } from 'react';
import { X } from 'lucide-react';

export default function Gallery({ items }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setLightbox(item)}
            className="mb-4 block w-full break-inside-avoid rounded-xl overflow-hidden border border-gray-lighter hover:border-orange transition-colors"
          >
            {/* TODO: reemplazar con foto real del cliente */}
            <img src={item.img} alt={item.alt} className="w-full h-auto object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-carbon/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white"
            aria-label="Cerrar"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <img
            src={lightbox.img}
            alt={lightbox.alt}
            className="max-h-[85vh] max-w-full rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
