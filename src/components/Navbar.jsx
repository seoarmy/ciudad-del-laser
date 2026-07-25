import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SERVICES } from '../data/services';
import { buildWhatsappLink } from '../data/site';
import MagneticButton from './MagneticButton';

const navItem = 'text-sm font-semibold text-white/80 hover:text-white transition-colors';

const RESOURCE_LINKS = [
  { label: 'Galería', to: '/galeria' },
  { label: 'Cómo cotizar', to: '/como-armar-tu-archivo' },
  { label: 'Preguntas frecuentes', to: '/preguntas-frecuentes' },
  { label: 'Dónde estamos', to: '/donde-estamos' },
  { label: 'Envíos y pagos', to: '/envios-y-pagos' },
  { label: 'Blog', to: '/blog' },
];

function Dropdown({ label, items, open, setOpen }) {
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={`${navItem} flex items-center gap-1`}>
        {label} <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2 w-56">
          <div className="bg-surface border border-white/10 rounded-xl py-2 shadow-lg">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const serviceLinks = SERVICES.map((s) => ({ label: s.shortTitle, to: `/servicios/${s.slug}` }));

  return (
    <header className="sticky top-0 z-50 bg-carbon/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
        <Link to="/" className="font-heading text-lg text-white">
          CIUDAD<span className="text-accent-gradient">DEL</span>LÁSER
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <Dropdown label="Servicios" items={serviceLinks} open={servicesOpen} setOpen={setServicesOpen} />
          <NavLink to="/materiales" className={navItem}>Materiales</NavLink>
          <NavLink to="/personalizador" className={navItem}>Personalizador</NavLink>
          <Dropdown label="Recursos" items={RESOURCE_LINKS} open={resourcesOpen} setOpen={setResourcesOpen} />
          <NavLink to="/contacto" className={navItem}>Contacto</NavLink>
        </nav>

        <MagneticButton
          href={buildWhatsappLink('Hola! Quiero cotizar un trabajo de corte/grabado láser.')}
          target="_blank"
          rel="noreferrer"
          className="hidden lg:inline-block bg-accent-gradient text-white font-bold rounded-lg px-5 py-2 text-sm"
        >
          Cotizar
        </MagneticButton>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Abrir menú">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-carbon border-t border-white/10 px-4 py-4 flex flex-col gap-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <p className="text-xs font-bold uppercase text-gray-text mt-1">Servicios</p>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/servicios/${s.slug}`}
              onClick={() => setOpen(false)}
              className="text-sm text-white/80 pl-2"
            >
              {s.shortTitle}
            </Link>
          ))}

          <Link to="/materiales" onClick={() => setOpen(false)} className={`${navItem} mt-2`}>Materiales</Link>
          <Link to="/personalizador" onClick={() => setOpen(false)} className={navItem}>Personalizador</Link>

          <p className="text-xs font-bold uppercase text-gray-text mt-2">Recursos</p>
          {RESOURCE_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="text-sm text-white/80 pl-2"
            >
              {item.label}
            </Link>
          ))}

          <Link to="/contacto" onClick={() => setOpen(false)} className={`${navItem} mt-2`}>Contacto</Link>
          <a
            href={buildWhatsappLink('Hola! Quiero cotizar un trabajo de corte/grabado láser.')}
            target="_blank"
            rel="noreferrer"
            className="bg-accent-gradient text-white font-bold rounded-lg px-5 py-2 text-sm text-center mt-2"
          >
            Cotizar
          </a>
        </div>
      )}
    </header>
  );
}
