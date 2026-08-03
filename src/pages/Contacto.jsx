import { useState } from 'react';
import { Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { SERVICES } from '../data/services';
import { SITE, SUCURSALES, buildWhatsappLink } from '../data/site';
import Seo from '../components/Seo';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', servicio: '', mensaje: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Seo
        title="Contacto"
        description="Contactá a Ciudad del Láser por WhatsApp, mail o formulario. Sin atención por mostrador, cotizá tu proyecto de corte y grabado láser online."
      />
      <section className="bg-carbon text-white text-center py-16 md:py-20 px-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">Contacto</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          No tenemos atención por mostrador: todo el contacto es por WhatsApp o mail.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading text-2xl uppercase mb-6">Escribinos</h2>
          {sent ? (
            <div className="bg-orange/10 border border-orange rounded-xl p-6 text-carbon font-semibold">
              ¡Gracias! Recibimos tu consulta y te vamos a responder a la brevedad.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                required
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="border border-gray-lighter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange"
              />
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Mail"
                className="border border-gray-lighter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange"
              />
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="border border-gray-lighter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange"
              />
              <select
                name="servicio"
                value={form.servicio}
                onChange={handleChange}
                className="border border-gray-lighter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange"
              >
                <option value="">Servicio de interés</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.shortTitle}</option>
                ))}
              </select>
              <textarea
                required
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Contanos tu proyecto"
                rows={5}
                className="border border-gray-lighter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange resize-none"
              />
              <button
                type="submit"
                className="bg-orange hover:bg-orange-dark text-carbon font-semibold rounded-lg px-6 py-3 text-sm"
              >
                Enviar consulta
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {SUCURSALES.map((suc) => (
            <div key={suc.name} className="bg-gray-light rounded-xl p-6">
              <p className="font-semibold mb-3">{suc.name}</p>
              <div className="rounded-xl overflow-hidden border border-gray-lighter h-48 mb-4">
                <iframe
                  title={`Ubicación ${suc.name}`}
                  src={suc.mapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex items-start gap-3 mb-2">
                <MapPin className="text-orange shrink-0 mt-0.5" size={18} />
                <span className="text-sm text-gray-text">{suc.address}</span>
              </div>
              <div className="flex items-start gap-3 mb-2">
                <Clock className="text-orange shrink-0 mt-0.5" size={18} />
                <span className="text-sm text-gray-text">{suc.hours}</span>
              </div>
              <a
                href={suc.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-orange-dark hover:underline"
              >
                Abrir en Maps <ExternalLink size={14} />
              </a>
            </div>
          ))}
          <div className="bg-gray-light rounded-xl p-6 flex items-start gap-4">
            <Mail className="text-orange shrink-0" size={22} />
            <div>
              <p className="font-semibold">Mail</p>
              <a href={`mailto:${SITE.email}`} className="text-sm text-orange-dark hover:underline">{SITE.email}</a>
            </div>
          </div>
          <a
            href={buildWhatsappLink('Hola! Quiero hacer una consulta.')}
            target="_blank"
            rel="noreferrer"
            className="text-center bg-carbon text-white hover:bg-black rounded-xl px-6 py-4 font-bold text-sm"
          >
            Escribinos directo por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
