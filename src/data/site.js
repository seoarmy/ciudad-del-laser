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
  instagramUrl: 'https://www.instagram.com/ciudad.del.laser/?hl=es',
  tiktokUrl: 'https://www.tiktok.com/@ciudad.del.laser',
  facebookUrl: 'https://www.facebook.com/ciudadelaser',
  youtubeUrl: 'https://www.youtube.com/channel/UCGcYTNwii4LfPLpYHG3iJmw/videos',
  email: 'contacto@ciudaddellaser.com.ar',
  fileSubmissionEmail: 'contacto@ciudaddellaser.com.ar',
  city: 'Buenos Aires, Argentina',
  yearsOfTrayectory: 10,
  address: 'C. Dr. Juan Felipe Aranguren 1870, C1406 Cdad. Autónoma de Buenos Aires, Argentina',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('C. Dr. Juan Felipe Aranguren 1870, C1406 CABA, Argentina') +
    '&output=embed',
};

export const SUCURSALES = [
  {
    name: 'Flores - CABA',
    address: 'Dr. Juan Felipe Aranguren 1870, Flores, CABA',
    hours: 'Lun - Vie: Con cita previa',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=' +
      encodeURIComponent('C. Dr. Juan Felipe Aranguren 1870, C1406 CABA, Argentina') +
      '&output=embed',
    mapsLink:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('C. Dr. Juan Felipe Aranguren 1870, C1406 CABA, Argentina'),
  },
  {
    name: 'Ciudadela - GBA',
    address: 'Félix Ballester 333, Ciudadela, GBA',
    hours: 'Lun - Vie: Con cita previa',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=' +
      encodeURIComponent('Félix Ballester 333, Ciudadela, Buenos Aires, Argentina') +
      '&output=embed',
    mapsLink:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Félix Ballester 333, Ciudadela, Buenos Aires, Argentina'),
  },
];

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
