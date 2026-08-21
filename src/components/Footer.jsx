import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { SERVICES } from '../data/services';
import { SITE, SUCURSALES, buildWhatsappLink } from '../data/site';
import MagneticButton from './MagneticButton';

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...props}>
      <path d="M16.6 5.82c-1.02-.98-1.66-2.36-1.66-3.82h-3.3v14.03c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9c.3 0 .58.05.85.13V9.9a6.3 6.3 0 0 0-.85-.06 6.24 6.24 0 1 0 6.24 6.24V8.55a9.53 9.53 0 0 0 5.56 1.78V7.03a5.94 5.94 0 0 1-3.94-1.21z" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...props}>
      <path d="M13.5 21v-7.8h2.62l.39-3.04h-3.01V8.24c0-.88.24-1.48 1.5-1.48h1.6V4.05C15.94 4 15.08 3.94 14.08 3.94c-2.1 0-3.53 1.28-3.53 3.63v2.59H8v3.04h2.55V21h2.95z" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...props}>
      <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.9 4.75 12 4.75 12 4.75s-5.9 0-7.64.49a2.75 2.75 0 0 0-1.94 1.95A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.95c1.74.49 7.64.49 7.64.49s5.9 0 7.64-.49a2.75 2.75 0 0 0 1.94-1.95A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.42-4.81zM10 15.02V8.98L15.27 12 10 15.02z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { name: 'Instagram', href: SITE.instagramUrl, Icon: InstagramIcon },
  { name: 'TikTok', href: SITE.tiktokUrl, Icon: TikTokIcon },
  { name: 'Facebook', href: SITE.facebookUrl, Icon: FacebookIcon },
  { name: 'YouTube', href: SITE.youtubeUrl, Icon: YoutubeIcon },
];

export default function Footer() {
  return (
    <footer className="bg-carbon text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <img src="/Ciudad-Del-Laser-Logo-2.png" alt="Ciudad del Láser" className="h-10 w-auto mb-3" />
          <p className="text-sm text-gray-text mb-4">Corte y grabado láser a medida en {SITE.city}.</p>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-text hover:text-orange mb-4"
          >
            <InstagramIcon /> {SITE.instagram}
          </a>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-text hover:text-orange hover:bg-white/10 transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide mb-3 text-orange">Servicios</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/${s.slug}`} className="text-sm text-gray-text hover:text-white">
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
            className="bg-accent-gradient text-carbon font-semibold rounded-lg px-5 py-2.5 text-sm"
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
