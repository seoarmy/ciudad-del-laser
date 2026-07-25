export const WHATSAPP_NUMBER = '5491127183968';

export function buildWhatsappLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

// TODO: reemplazar con el dominio final del sitio
export const SITE_URL = 'https://www.ciudaddellaser.com.ar';

export const SITE = {
  name: 'Ciudad del Láser',
  instagram: '@ciudad.del.laser',
  instagramUrl: 'https://instagram.com/ciudad.del.laser',
  email: 'contacto@ciudaddellaser.com.ar',
  // el PDF de instructivo pide enviar los archivos de corte a esta casilla puntual
  fileSubmissionEmail: 'ciudaddellaser@gmail.com',
  city: 'Buenos Aires, Argentina',
  yearsOfTrayectory: 10,
  address: 'C. Dr. Juan Felipe Aranguren 1870, C1406 Cdad. Autónoma de Buenos Aires, Argentina',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('C. Dr. Juan Felipe Aranguren 1870, C1406 CABA, Argentina') +
    '&output=embed',
};

// TODO: confirmar zonas reales de cobertura con el cliente
export const SERVICE_ZONES = [
  'Ciudad Autónoma de Buenos Aires (CABA)',
  'Zona Norte del GBA (San Isidro, Vicente López, Tigre, San Fernando)',
  'Zona Oeste del GBA (Morón, Ituzaingó, Hurlingham)',
  'Zona Sur del GBA (Avellaneda, Lanús, Quilmes)',
  'Envíos al resto del país a coordinar',
];

export const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Materiales', to: '/materiales' },
  { label: 'Galería', to: '/galeria' },
  { label: 'Personalizador', to: '/personalizador' },
  { label: 'Cómo cotizar', to: '/como-armar-tu-archivo' },
  { label: 'Preguntas frecuentes', to: '/preguntas-frecuentes' },
  { label: 'Dónde estamos', to: '/donde-estamos' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contacto', to: '/contacto' },
];
