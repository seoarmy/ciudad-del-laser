import { MapPin, Truck } from 'lucide-react';
import Seo from '../components/Seo';
import { SITE, SERVICE_ZONES, buildWhatsappLink } from '../data/site';

export default function DondeEstamos() {
  return (
    <>
      <Seo
        title="Dónde estamos"
        description="Conocé la trayectoria de Ciudad del Láser y las zonas de Buenos Aires donde trabajamos: CABA, Zona Norte, Zona Oeste, Zona Sur y envíos al resto del país."
      />
      <section className="bg-carbon text-white text-center py-16 md:py-20 px-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">Dónde estamos</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Nuestra trayectoria y las zonas de {SITE.city} donde trabajamos.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <h2 className="font-heading text-2xl uppercase mb-4">Quiénes somos</h2>
        <p className="text-gray-text mb-4 leading-relaxed">
          {SITE.name} es una empresa de corte y grabado láser con más de {SITE.yearsOfTrayectory} años de trayectoria,
          realizando trabajos técnicos y personalizados para empresas, instituciones y particulares en {SITE.city}.
        </p>
        <p className="text-gray-text leading-relaxed mb-4">
          No contamos con atención por mostrador: todo el proceso de consulta, cotización y coordinación de entrega
          se realiza por WhatsApp o mail, para agilizar los tiempos y trabajar con clientes de toda la zona.
        </p>
        <p className="text-gray-text leading-relaxed">
          Nuestro taller está en {SITE.address}.
        </p>
      </section>

      <section className="bg-gray-light py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl uppercase text-center mb-8">Zonas de cobertura</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICE_ZONES.map((zone) => (
              <div key={zone} className="bg-white border border-gray-lighter rounded-xl p-5 flex items-start gap-3">
                <MapPin className="text-orange shrink-0 mt-0.5" size={20} />
                <span className="text-sm text-carbon">{zone}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-lighter h-72 mt-6">
            <iframe
              title="Ubicación de Ciudad del Láser"
              src={SITE.mapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20 text-center">
        <Truck className="text-orange mx-auto mb-4" size={32} />
        <h2 className="font-heading text-2xl uppercase mb-4">¿Tu zona no está en la lista?</h2>
        <p className="text-gray-text mb-6">Consultanos, coordinamos envíos a otras zonas según el proyecto.</p>
        <a
          href={buildWhatsappLink('Hola! Quiero consultar si hacen envíos a mi zona.')}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-orange hover:bg-orange-dark text-carbon font-bold rounded-lg px-8 py-3"
        >
          Consultar por WhatsApp
        </a>
      </section>
    </>
  );
}
