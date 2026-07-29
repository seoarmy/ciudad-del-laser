import { useState } from 'react';
import { buildWhatsappLink } from '../data/site';

export default function QuoteForm({ serviceName }) {
  const [form, setForm] = useState({ nombre: '', telefono: '', detalle: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const message = [
      `Hola! Quiero cotizar: ${serviceName}.`,
      `Nombre: ${form.nombre}`,
      form.telefono && `Teléfono: ${form.telefono}`,
      form.detalle && `Detalle: ${form.detalle}`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(buildWhatsappLink(message), '_blank', 'noreferrer');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
      <input
        required
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="border border-gray-lighter rounded-lg px-4 py-3 text-sm text-carbon focus:outline-none focus:border-orange"
      />
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        placeholder="Teléfono (opcional)"
        className="border border-gray-lighter rounded-lg px-4 py-3 text-sm text-carbon focus:outline-none focus:border-orange"
      />
      <textarea
        name="detalle"
        value={form.detalle}
        onChange={handleChange}
        placeholder="Contanos brevemente tu proyecto (material, tamaño, cantidad...)"
        rows={3}
        className="border border-gray-lighter rounded-lg px-4 py-3 text-sm text-carbon focus:outline-none focus:border-orange resize-none"
      />
      <button
        type="submit"
        className="bg-orange hover:bg-orange-dark text-carbon font-semibold rounded-lg px-6 py-3 text-sm"
      >
        Enviar consulta por WhatsApp
      </button>
    </form>
  );
}
