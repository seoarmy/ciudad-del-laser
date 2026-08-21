import { Star } from 'lucide-react';

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} {...props}>
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47a5.54 5.54 0 0 1-2.4 3.64v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export default function Testimonials({ items, title = 'Lo que dicen nuestros clientes' }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
      <h2 className="font-heading text-2xl md:text-3xl text-center mb-2">{title}</h2>
      <p className="text-gray-text text-center text-sm mb-10">Reseñas reales de Google</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <div key={i} className="bg-white border border-gray-lighter rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {t.photo ? (
                  <img src={t.photo} alt={t.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-orange/15 text-orange font-heading text-sm flex items-center justify-center shrink-0">
                    {initials(t.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-carbon text-sm leading-tight truncate">{t.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={12} className="text-orange" fill="currentColor" />
                      ))}
                    </div>
                    {t.date && <span className="text-xs text-gray-text whitespace-nowrap">{t.date}</span>}
                  </div>
                </div>
              </div>
              <GoogleIcon className="shrink-0 mt-0.5" />
            </div>

            <p className="text-sm text-carbon leading-relaxed">{t.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
