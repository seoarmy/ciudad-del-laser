import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { SERVICES } from '../data/services';
import { SITE, SUCURSALES, buildWhatsappLink } from '../data/site';
import MagneticButton from './MagneticButton';

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-carbon text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-heading text-lg mb-3">
            CIUDAD<span className="text-accent-gradient">DEL</span>LÁSER
          </p>
          <p className="text-sm text-gray-text mb-4">Corte y grabado láser a medida en {SITE.city}.</p>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-text hover:text-orange"
          >
            <InstagramIcon /> {SITE.instagram}
          </a>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide mb-3 text-orange">Servicios</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicios/${s.slug}`} className="text-sm text-gray-text hover:text-white">
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide mb-3 text-orange">Contacto</p>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm text-gray-text hover:text-white mb-3">
            <Mail size={16} /> {SITE.email}
          </a>
          {SUCURSALES.map((suc) => (
            <a
              key={suc.name}
              href={suc.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-2 text-sm text-gray-text hover:text-white mb-2"
            >
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span>{suc.name} — {suc.address}</span>
            </a>
          ))}
          <MagneticButton
            href={buildWhatsappLink('Hola! Quiero hacer una consulta.')}
            target="_blank"
            rel="noreferrer"
            className="bg-accent-gradient text-white font-semibold rounded-lg px-5 py-2.5 text-sm"
          >
            Escribinos por WhatsApp
          </MagneticButton>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center text-xs text-gray-text">
        <span>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</span>
        <span className="hidden sm:inline">·</span>
        <span>
          Powered by{' '}
          <a
            href="https://manyadigital.com.ar/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-text hover:text-orange underline"
          >
            MANYA SAS
          </a>
        </span>
      </div>
    </footer>
  );
}
