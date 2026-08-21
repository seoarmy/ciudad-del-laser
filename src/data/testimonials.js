export const TESTIMONIALS = [
  {
    name: 'Claudio Torres',
    quote: '20 placas para la empresa, mejor precio por lejos y un diseño espectacular. Rapidísimos y atentos.',
    service: 'placas-conmemorativas',
  },
  {
    name: 'Florencia Araujo',
    quote: 'Llamé a las 12 del mediodía y a las 2 de la tarde ya tenía mis piezas de acrílico cortadas y perfectas.',
    service: 'corte-laser-acrilico',
  },
  {
    name: 'Horacio Giralt',
    quote: 'Concurrí a la Iglesia frente a Plaza Flores y quedé impactado con la placa en mármol de la entrada. Pregunté y me dijeron que la grabaron en Ciudad Láser.',
    service: 'grabado-en-marmol',
  },
  {
    name: 'Claudio Torres',
    quote: 'Excelente precio y atención para un grabado en mármol que pedí, con diseño incluido.',
    service: 'grabado-en-marmol',
  },
  {
    name: 'Daniela Franceschetti',
    quote: 'Me ayudaron a concretar uno de los primeros regalos personalizados en cuero para mi emprendimiento. No solo buscaron soluciones, cumplieron con la fecha de entrega.',
    service: 'grabado-laser-personalizado',
  },
  {
    name: 'Sharon Cohen',
    quote: 'Quedó hermoso, unos genios. El primer dibujo de mi hijo para el día del padre.',
    service: 'grabado-laser-personalizado',
  },
  {
    name: 'Mariana Troitiño',
    quote: 'Excelente atención, precio súper razonable. Te envían un boceto sin cargo y el trabajo: impecable.',
    service: null,
  },
  {
    name: 'Guada Astudillo',
    quote: 'Hicimos un pedido de grabado de botellas térmicas para la empresa donde trabajo y el resultado fue excelente. Quedamos muy satisfechos.',
    service: 'grabado-laser',
  },
  {
    name: 'Nicolas Alvarez',
    quote: '10 puntos el grabado láser sobre una medalla de metal. Excelente servicio.',
    service: 'grabado-laser',
  },
  {
    name: 'Joaquín V. González',
    quote: 'Buen trabajo en el grabado de medallas para un establecimiento educativo y rapidez en la entrega.',
    service: 'grabado-laser',
  },
];

export function getTestimonialsForService(slug, limit = 3) {
  const matched = TESTIMONIALS.filter((t) => t.service === slug);
  if (matched.length >= limit) return matched.slice(0, limit);

  const generic = TESTIMONIALS.filter((t) => t.service !== slug);
  return [...matched, ...generic].slice(0, limit);
}
