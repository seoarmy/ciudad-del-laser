export const BLOG_POSTS = [
  {
    slug: 'como-armar-tu-archivo-para-corte-laser',
    category: 'Guías',
    title: 'Cómo armar tu archivo para corte láser sin errores',
    date: '2026-05-12',
    readingTime: '6 min',
    cover: 'https://picsum.photos/seed/blog-archivo/1200/600',
    excerpt: 'Los 4 pasos y los errores más comunes al preparar un archivo vectorial para cortar y grabar con láser.',
    relatedServices: ['corte-laser', 'corte-laser-acrilico', 'corte-laser-maquetas'],
    content: [
      { type: 'h2', text: 'Por qué falla la mayoría de los archivos' },
      { type: 'p', text: 'La mayoría de los archivos que recibimos con errores comparten el mismo problema: las líneas de corte, marcado y grabado no están separadas por color, o los textos no están convertidos a curvas. Esto retrasa la cotización y el corte.' },
      { type: 'cta', service: 'corte-laser', text: '¿Necesitás cortar MDF? Cotizalo ahora' },
      { type: 'h2', text: 'Los 4 pasos básicos' },
      { type: 'p', text: 'Definí materialidad y espesor, dibujá el rectángulo de tamaño real, asigná colores por función (rojo corte, azul marcado, verde grabado) y enviá el archivo en un formato aceptado.' },
      { type: 'h2', text: 'Formatos aceptados' },
      { type: 'p', text: 'Trabajamos con Rhinoceros (.3dm), AutoCAD (.dwg/.dxf), CorelDraw (.cdr) e Illustrator (.ai/.pdf).' },
      { type: 'cta', service: 'corte-laser-acrilico', text: '¿Tenés un diseño en acrílico? Pedí tu cotización' },
    ],
  },
  {
    slug: 'que-material-elegir-para-tu-proyecto-laser',
    category: 'Materiales',
    title: 'Qué material elegir para tu proyecto de corte láser',
    date: '2026-06-02',
    readingTime: '5 min',
    cover: 'https://picsum.photos/seed/blog-materiales/1200/600',
    excerpt: 'MDF, acrílico o alto impacto: comparamos precio, resistencia y uso recomendado para elegir bien desde el principio.',
    relatedServices: ['corte-laser', 'corte-laser-acrilico'],
    content: [
      { type: 'h2', text: 'MDF: el más versátil' },
      { type: 'p', text: 'Es el material más elegido para piezas decorativas y técnicas por su buena relación precio-resistencia.' },
      { type: 'cta', service: 'corte-laser', text: '¿Necesitás cortar MDF? Cotizalo ahora' },
      { type: 'h2', text: 'Acrílico: terminación premium' },
      { type: 'p', text: 'El borde queda pulido al cortar, ideal para letras corpóreas y displays de producto.' },
      { type: 'cta', service: 'corte-laser-acrilico', text: 'Cotizá tu pieza en acrílico' },
    ],
  },
];

export const getPostBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug);
