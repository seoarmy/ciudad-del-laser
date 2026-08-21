import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SERVICES, pickRandomImage } from '../data/services';
import { MATERIAL_FAMILIES } from '../data/materials';
import { buildWhatsappLink } from '../data/site';
import Seo from '../components/Seo';
import MarqueeGallery from '../components/MarqueeGallery';
import LogoCarousel from '../components/LogoCarousel';
import MeshBlobs from '../components/MeshBlobs';
import MagneticButton from '../components/MagneticButton';
import AnimatedCounter from '../components/AnimatedCounter';
import Testimonials from '../components/Testimonials';
import { TESTIMONIALS } from '../data/testimonials';
import FAQAccordion from '../components/FAQAccordion';
import { GENERAL_FAQS } from '../data/faqs';

const HOME_GALLERY = SERVICES.flatMap((s) => s.gallery.slice(0, 2));

function ServiceTile({ service }) {
  const Icon = Icons[service.icon] || Icons.Scissors;
  const image = useMemo(() => pickRandomImage(service.gallery), [service]);
  return (
    <Link
      to={`/${service.slug}`}
      className="group relative bg-surface border border-white/10 rounded-xl p-5 flex flex-col justify-between overflow-hidden hover:border-orange/60 transition-colors h-[190px]"
    >
      <img
        src={image.img}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/20" />
      <div className="relative flex items-center justify-between">
        <Icon className="text-orange" size={22} strokeWidth={1.5} />
        <Icons.ArrowUpRight
          className="text-gray-text opacity-0 group-hover:opacity-100 group-hover:text-orange transition-opacity"
          size={16}
        />
      </div>
      <div className="relative">
        <p className="font-heading text-sm text-white leading-snug mb-2">{service.title}</p>
        <p className="text-xs text-gray-text max-h-0 group-hover:max-h-16 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
          {service.heroSubtitle}
        </p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Corte y grabado láser a medida en Buenos Aires"
        description="Corte y grabado láser en MDF, acrílico, metal, madera y más. Cotizá online por WhatsApp, personalizá tu producto y recibí tu trabajo a medida en Buenos Aires."
      />

      <section
        className="relative bg-carbon text-white overflow-hidden bg-noise bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(13,13,13,0.8), rgba(13,13,13,0.85), #0D0D0D), url('/portada%201.jpg')" }}
      >
        <MeshBlobs />
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-28 md:py-40 text-center">
          <img
            src="/logo%20ciudad%20del%20laser%20png.png"
            alt="Ciudad del Láser"
            className="h-16 md:h-20 mx-auto mb-6"
          />
          <span className="font-mono text-xs text-gray-text border border-white/10 rounded-full px-3 py-1 inline-block mb-6">
            infraestructura de fabricación de precisión
          </span>
          <h1 className="font-heading text-4xl md:text-6xl leading-tight mb-6">
            Corte y grabado láser,{' '}
            <span className="text-accent-gradient">así de simple es pedirlo</span>
          </h1>
          <p className="text-gray-text text-base md:text-lg max-w-2xl mx-auto mb-10">
            MDF, acrílico, metal, madera, mármol y más: precisión de máquina, cotización en minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              href={buildWhatsappLink('Hola! Quiero cotizar un trabajo de corte/grabado láser.')}
              target="_blank"
              rel="noreferrer"
              className="bg-accent-gradient text-carbon font-semibold rounded-lg px-8 py-3 shadow-lg shadow-orange/20"
            >
              Cotizar por WhatsApp
            </MagneticButton>
            <MagneticButton
              href="#servicios"
              className="glass text-white font-semibold rounded-lg px-8 py-3"
            >
              Ver servicios
            </MagneticButton>
          </div>
        </div>
      </section>

      <section id="servicios" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h2 className="font-heading text-2xl md:text-4xl text-center mb-3">Nuestros servicios</h2>
        <p className="text-gray-text text-center max-w-xl mx-auto mb-12">
          Diez líneas de trabajo especializadas, cada una con su propio proceso y materiales recomendados.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SERVICES.map((s) => (
            <ServiceTile key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section className="bg-gray-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-4xl text-center mb-3">Materiales que trabajamos</h2>
          <p className="text-gray-text text-center max-w-xl mx-auto mb-12">
            De MDF a mármol: si tenés dudas sobre tu material, consultanos.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MATERIAL_FAMILIES.map((fam) => (
              <div
                key={fam.id}
                className="bg-white border border-gray-lighter rounded-xl p-6 text-center hover:border-orange transition-colors"
              >
                <p className="font-heading text-sm">{fam.label}</p>
                <p className="font-mono text-[11px] text-gray-text mt-1">{fam.items.length} variantes</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/materiales" className="text-orange-dark font-semibold hover:underline">
              Ver todos los materiales →
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h2 className="font-heading text-2xl md:text-4xl text-center mb-3">Personalizá tu producto</h2>
        <p className="text-gray-text text-center max-w-xl mx-auto mb-12">
          Armá tu mate personalizado antes de pedir presupuesto.
        </p>
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-gray-lighter rounded-xl p-8 text-center hover:border-orange transition-colors">
            <img
              src="/images/METALES/5.webp"
              alt="Personalizador de mates"
              className="rounded-lg mb-6 w-full h-48 object-cover"
            />
            <p className="font-heading text-xl mb-2">Mates</p>
            <p className="text-gray-text text-sm mb-6">Elegí texto, tipografía y logo para tu mate personalizado.</p>
            <Link
              to="/personalizador"
              className="inline-block bg-accent-gradient text-carbon font-semibold rounded-lg px-6 py-3 text-sm"
            >
              Personalizar mate
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-4xl text-center mb-3">Galería de trabajos</h2>
          <p className="text-gray-text text-center max-w-xl mx-auto mb-12">
            Una muestra de lo que hacemos todos los días en el taller.
          </p>
          <MarqueeGallery items={HOME_GALLERY} speed={50} />
          <div className="text-center mt-8">
            <Link to="/galeria" className="text-orange-dark font-semibold hover:underline">
              Ver galería completa →
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h2 className="font-heading text-2xl md:text-4xl text-center mb-3">Preguntas frecuentes</h2>
        <p className="text-gray-text text-center max-w-xl mx-auto mb-12">
          Las dudas más comunes antes de pedir tu cotización.
        </p>
        <FAQAccordion faqs={GENERAL_FAQS} />
        <p className="text-center mt-8">
          <Link to="/preguntas-frecuentes" className="text-orange-dark font-semibold hover:underline">
            Ver todas las preguntas frecuentes →
          </Link>
        </p>
      </section>

      <section className="relative bg-carbon text-white py-16 md:py-24 text-center overflow-hidden bg-noise">
        <h2 className="font-heading text-2xl md:text-4xl mb-10">Confían en nosotros</h2>
        <div className="mb-14">
          <LogoCarousel />
        </div>
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div>
            <p className="font-heading text-4xl md:text-5xl text-accent-gradient mb-2">
              <AnimatedCounter value={10} prefix="+" />
            </p>
            <p className="text-gray-text text-sm">años de trayectoria</p>
          </div>
          <div>
            <p className="font-heading text-4xl md:text-5xl text-accent-gradient mb-2">
              <AnimatedCounter value={500} prefix="+" />
            </p>
            <p className="text-gray-text text-sm">empresas e instituciones</p>
          </div>
          <div>
            <p className="font-heading text-4xl md:text-5xl text-accent-gradient mb-2">
              <AnimatedCounter value={1000} prefix="+" />
            </p>
            <p className="text-gray-text text-sm">particulares atendidos</p>
          </div>
        </div>
      </section>

      <Testimonials items={TESTIMONIALS.slice(0, 6)} />
    </>
  );
}
