export const SERVICES = [
  {
    slug: 'corte-laser-mdf',
    icon: 'Scissors',
    title: 'Corte láser MDF',
    shortTitle: 'Corte láser MDF',
    keyword: 'corte láser mdf',
    metaDescription:
      'Corte láser de MDF en Buenos Aires. Precisión milimétrica, espesores de 3 a 9mm, entrega rápida. Cotizá tu placa de MDF cortada a medida.',
    heroTitle: 'Corte láser de MDF en Buenos Aires',
    heroSubtitle:
      'Piezas técnicas, decorativas y de diseño cortadas con precisión milimétrica sobre MDF, en el espesor que necesites.',
    description: [
      'El MDF es uno de los materiales más pedidos para corte láser por su versatilidad: sirve tanto para piezas técnicas y prototipos como para objetos decorativos, cajas, letras corpóreas y muebles a medida.',
      'Trabajamos espesores desde 3mm hasta 9mm, con cortes limpios y sin quemado excesivo del borde gracias a la calibración de potencia y velocidad según cada espesor.',
      'Enviás tu archivo vectorial (o te ayudamos a armarlo) y te cotizamos según superficie de corte y cantidad de piezas.',
    ],
    materials: [
      { material: 'MDF 3mm', cortar: true, marcar: true, grabar: true, espesor: '3mm', tamaño: 'hasta 900x600mm', stock: true },
      { material: 'MDF 5.5mm', cortar: true, marcar: true, grabar: true, espesor: '5.5mm', tamaño: 'hasta 900x600mm', stock: true },
      { material: 'MDF 9mm', cortar: true, marcar: true, grabar: true, espesor: '9mm', tamaño: 'hasta 900x600mm', stock: true },
    ],
    seoParagraph:
      'Ya sea una sola pieza o una tirada grande para producción, cotizamos el corte de MDF según espesor y superficie de la placa. También podés sumar grabado en la misma pieza, sin costo adicional de setup.',
    secondaryKeywords: [
      'corte de mdf',
      'mdf para corte láser',
      'cortes mdf',
      'corte láser mdf precio',
      'corte y grabado láser mdf',
    ],
    highlights: [
      'Espesores de 3mm a 9mm disponibles',
      'Corte y grabado en la misma pieza, sin costo extra',
      'Cotización sin cargo por WhatsApp en el día',
    ],
    faqs: [
      { q: '¿Qué espesor de MDF conviene para mi proyecto?', a: 'Depende del uso: para piezas decorativas o letras chicas, 3-5.5mm. Para piezas estructurales o que soporten peso, 9mm o más.' },
      { q: '¿El corte deja marca de quemado en el borde?', a: 'Sí, es normal en MDF por el proceso láser. Se puede lijar o pintar después para disimularlo.' },
      { q: '¿Puedo pedir grabado además del corte?', a: 'Sí, se puede combinar corte y grabado láser en MDF en la misma pieza sin costo adicional de setup.' },
      { q: '¿Cuál es el tamaño máximo de placa?', a: 'Trabajamos placas de 900x600mm y 600x300mm. Para piezas más grandes se arman por partes.' },
      { q: '¿Cuál es el precio del corte láser de MDF?', a: 'El precio depende del espesor, la superficie de corte y la cantidad de piezas. Escribinos por WhatsApp con tu diseño y te pasamos el precio sin cargo.' },
    ],
    gallery: Array.from({ length: 10 }).map((_, i) => ({
      img: `/images/MDF/${i + 1}.webp`,
      alt: `Pieza de MDF cortada con láser ${i + 1}`,
    })),
  },
  {
    slug: 'grabado-laser-metal',
    icon: 'Flame',
    title: 'Grabado láser en metal',
    shortTitle: 'Grabado en metal',
    keyword: 'grabado de metales',
    metaDescription:
      'Grabado láser en metal en Buenos Aires: acero inoxidable, aluminio, bronce. Marcado permanente para placas, herramientas e identificación industrial.',
    heroTitle: 'Grabado láser en metal en Buenos Aires',
    heroSubtitle:
      'Marcado permanente sobre acero inoxidable, aluminio y bronce para identificación, placas y piezas industriales.',
    description: [
      'El grabado láser sobre metal deja una marca permanente, resistente a la intemperie, al roce y a la limpieza, ideal para placas identificatorias, numeración de piezas, herramientas y cartelería industrial.',
      'Trabajamos sobre acero inoxidable, aluminio anodizado y bronce, con distintos niveles de contraste y profundidad según el acabado que busques.',
      'Es un proceso sin tintas ni adhesivos: el grabado es parte de la superficie del metal, por lo que no se despega ni se borra con el tiempo.',
    ],
    materials: [
      { material: 'Acero inoxidable', cortar: false, marcar: true, grabar: true, espesor: '0.5-3mm', tamaño: 'a medida', stock: false },
      { material: 'Aluminio anodizado', cortar: false, marcar: true, grabar: true, espesor: '0.5-2mm', tamaño: 'a medida', stock: false },
      { material: 'Bronce', cortar: false, marcar: true, grabar: true, espesor: '1-3mm', tamaño: 'a medida', stock: false },
      { material: 'Aluminio natural', cortar: false, marcar: true, grabar: false, espesor: '0.5-2mm', tamaño: 'a medida', stock: false },
    ],
    seoParagraph:
      'Trabajamos piezas de precisión, identificación industrial y objetos personalizados sobre distintos metales. El precio varía según el material, la cantidad y el detalle del grabado, así que consultanos con tu proyecto.',
    secondaryKeywords: [
      'grabado láser en metal precio',
      'grabado sobre metal',
      'grabado en metal',
      'grabado de metales por láser',
      'acero inoxidable grabado láser',
    ],
    highlights: [
      'Acero inoxidable, aluminio y bronce',
      'Marca permanente, no se despega ni se borra',
      'Numeración correlativa para series industriales',
    ],
    faqs: [
      { q: '¿El grabado se puede borrar con el tiempo?', a: 'No, el grabado láser modifica la superficie del metal de forma permanente, no es una impresión.' },
      { q: '¿Puedo traer mi propia pieza metálica para grabar?', a: 'Sí, podés traer o enviar la pieza y coordinamos el grabado sobre tu material.' },
      { q: '¿Hacen numeración correlativa para piezas industriales?', a: 'Sí, es uno de los usos más comunes: series numeradas o códigos para trazabilidad.' },
      { q: '¿Cuál es el precio del grabado láser en metal?', a: 'Depende del material, la cantidad de piezas y el detalle del grabado. Enviános tu consulta por WhatsApp y te pasamos el precio sin cargo.' },
    ],
    gallery: Array.from({ length: 10 }).map((_, i) => ({
      img: `/images/METALES/${i + 1}.webp`,
      alt: `Grabado láser en metal ${i + 1}`,
    })),
  },
  {
    slug: 'grabado-laser-madera',
    icon: 'TreePine',
    title: 'Corte y grabado láser en madera',
    shortTitle: 'Corte/grabado en madera',
    keyword: 'corte de madera por láser',
    metaDescription:
      'Corte de madera por láser y grabado láser en maderas nobles. Piezas decorativas, cuadros, cajas y regalos personalizados en Buenos Aires.',
    heroTitle: 'Corte de madera por láser en Buenos Aires',
    heroSubtitle:
      'Grabado láser en maderas nobles y corte de piezas decorativas: cuadros, cajas, souvenirs y regalos personalizados.',
    description: [
      'Trabajamos maderas terciadas y nobles para corte y grabado láser, ideal para piezas decorativas, cajas, cuadros con frases o fotos, y regalos empresariales personalizados.',
      'El grabado láser (también conocido como impresión láser en madera) resalta la veta natural, logrando un acabado cálido que no se consigue con otras técnicas de marcado.',
      'También cortamos piezas técnicas y de ensamble en madera terciada para maquetas, organizadores y estructuras simples.',
    ],
    materials: [
      { material: 'Terciado 3mm', cortar: true, marcar: true, grabar: true, espesor: '3mm', tamaño: 'hasta 900x600mm', stock: true },
      { material: 'Terciado 6mm', cortar: true, marcar: true, grabar: true, espesor: '6mm', tamaño: 'hasta 900x600mm', stock: true },
      { material: 'Terciado 9mm', cortar: true, marcar: false, grabar: true, espesor: '9mm', tamaño: 'hasta 900x600mm', stock: false },
      { material: 'Madera maciza (roble, pino)', cortar: true, marcar: false, grabar: true, espesor: 'variable', tamaño: 'a medida', stock: false },
    ],
    seoParagraph:
      'El corte y el grabado se pueden combinar en la misma pieza: cortamos la forma y grabamos texto, logos o imágenes sobre la superficie. El precio varía según el tipo de madera y el espesor, así que consultanos con tu proyecto.',
    secondaryKeywords: [
      'corte de madera por láser',
      'corte láser madera precios',
      'impresión láser en madera',
      'grabado en maderas',
      'grabado láser en madera precio',
    ],
    highlights: [
      'Terciado y maderas nobles',
      'El grabado resalta la veta natural',
      'Ideal para regalos y souvenirs empresariales',
    ],
    faqs: [
      { q: '¿Puedo grabar una foto sobre madera?', a: 'Sí, convertimos la foto a escala de grises y la grabamos con distintos niveles de profundidad para simular el detalle.' },
      { q: '¿Qué maderas dan mejor contraste al grabar?', a: 'Maderas claras como el terciado de álamo o pino suelen dar mejor contraste que las maderas muy oscuras.' },
      { q: '¿Hacen cantidades grandes para regalos empresariales?', a: 'Sí, trabajamos tiradas de piezas iguales o personalizadas una a una (ej. con nombres distintos).' },
      { q: '¿Cuál es el precio del corte y grabado láser en madera?', a: 'Varía según el tipo de madera, el espesor y la cantidad de piezas. Consultanos por WhatsApp con tu proyecto y te damos el precio sin cargo.' },
    ],
    gallery: Array.from({ length: 10 }).map((_, i) => ({
      img: `/images/MADERA/${i + 1}.webp`,
      alt: `Corte y grabado láser en madera ${i + 1}`,
    })),
  },
  {
    slug: 'corte-laser-acrilico',
    icon: 'Gem',
    title: 'Corte láser acrílico',
    shortTitle: 'Corte láser acrílico',
    keyword: 'acrílico corte láser',
    metaDescription:
      'Corte láser y grabado en acrílico en Buenos Aires: cristal, opal, colores. Letras corpóreas, displays y señalética con terminación prolija.',
    heroTitle: 'Corte láser de acrílico en Buenos Aires',
    heroSubtitle:
      'Corte y grabado láser en acrílico con bordes pulidos, colores cristal y opal, ideal para letras corpóreas, displays, señalética y diseños personalizados.',
    description: [
      'El acrílico cortado con láser tiene un plus que otros materiales no logran: el borde queda pulido directamente al cortar, sin necesidad de proceso adicional.',
      'Además del corte, el grabado permite sumar texto, logos e ilustraciones sobre la pieza, ideal para diseños que combinan forma y detalle en un mismo trabajo.',
      'Es el material elegido para letras corpóreas, displays de producto, señalética, trofeos y piezas de diseño donde la terminación importa tanto como la forma.',
      'Trabajamos acrílico cristal (transparente), opal (blanco translúcido) y en color, en distintos espesores según el uso.',
    ],
    materials: [
      { material: 'Acrílico cristal 3mm', cortar: true, marcar: false, grabar: true, espesor: '3mm', tamaño: 'hasta 900x600mm', stock: true },
      { material: 'Acrílico cristal 5mm', cortar: true, marcar: false, grabar: true, espesor: '5mm', tamaño: 'hasta 900x600mm', stock: true },
      { material: 'Acrílico opal 3mm', cortar: true, marcar: false, grabar: true, espesor: '3mm', tamaño: 'hasta 900x600mm', stock: true },
      { material: 'Acrílico color', cortar: true, marcar: false, grabar: true, espesor: '3-5mm', tamaño: 'hasta 900x600mm', stock: false },
    ],
    seoParagraph:
      'El corte define la forma de la pieza y el grabado suma detalle, texto o logo sobre la superficie: dos procesos que combinamos en un mismo diseño para lograr una terminación prolija.',
    secondaryKeywords: [
      'diseños en acrílico corte láser',
      'grabado en acrílico',
      'grabado de acrílico',
      'grabado láser en acrílico',
      'acrílico grabado láser',
    ],
    highlights: [
      'Cristal, opal y en color',
      'Borde pulido directo al cortar, sin retoque',
      'Corte y grabado combinados en un mismo diseño',
    ],
    faqs: [
      { q: '¿El corte de acrílico deja el borde pulido?', a: 'Sí, es una de las ventajas del acrílico: el láser derrite y pule el borde al mismo tiempo que corta.' },
      { q: '¿Puedo combinar acrílico transparente con grabado en la superficie?', a: 'Sí, es un combo muy pedido: grabado superficial + corte de contorno, ideal para letras y displays.' },
      { q: '¿Qué espesor conviene para letras corpóreas de pared?', a: 'Depende del tamaño de la letra: para letras chicas 3mm alcanza, para letras grandes recomendamos 5mm o más.' },
    ],
    gallery: Array.from({ length: 10 }).map((_, i) => ({
      img: `/images/ACRILICO/${i + 1}.webp`,
      alt: `Corte láser de acrílico ${i + 1}`,
    })),
  },
  {
    slug: 'placas-conmemorativas',
    icon: 'Award',
    title: 'Placas conmemorativas',
    shortTitle: 'Placas conmemorativas',
    keyword: 'placas conmemorativas',
    metaDescription:
      'Placas conmemorativas grabadas con láser en Buenos Aires, con terminación que simula acero o bronce. Para instituciones, empresas y homenajes personales.',
    heroTitle: 'Placas conmemorativas en Buenos Aires',
    heroSubtitle:
      'Placas homenaje con terminación que simula acero o bronce, grabadas con láser para instituciones, empresas y aniversarios, con texto, logo y fecha de forma permanente.',
    description: [
      'Hacemos placas conmemorativas con terminación que simula el acero y el bronce: fondo color bronce o color acero, con el texto en negro. Son aptas para exterior y mantienen el contraste con el paso del tiempo.',
      'Podemos colocar una madera enchapada negra de fondo, para darle más cuerpo a la placa.',
      'Coordinamos el diseño del layout de texto y logo antes de producir, para que apruebes el arte final antes del grabado.',
      'Podemos hacer factura A o C, cada una con sus respectivos costos impositivos.',
    ],
    materials: [
      { material: 'Fondo color bronce', cortar: false, marcar: false, grabar: true, espesor: 'a medida', tamaño: 'personalizada', stock: false },
      { material: 'Fondo color acero', cortar: false, marcar: false, grabar: true, espesor: 'a medida', tamaño: 'personalizada', stock: false },
      { material: 'Acrílico color', cortar: true, marcar: false, grabar: true, espesor: '3-5mm', tamaño: 'a medida', stock: true },
      { material: 'MDF con pintura', cortar: true, marcar: false, grabar: true, espesor: '9mm', tamaño: 'a medida', stock: true },
    ],
    sizePriceTable: {
      note: 'Podemos hacer medidas personalizadas, pero las más solicitadas son estas:',
      rows: [
        { size: '10x10', price: 20000 },
        { size: '20x20', price: 30000 },
        { size: '30x20', price: 40000 },
        { size: '30x30', price: 48000 },
        { size: '40x30', price: 55000 },
        { size: '40x40', price: 70000 },
        { size: '50x40', price: 80000 },
        { size: '50x50', price: 90000 },
        { size: '60x50', price: 120000 },
        { size: '60x60', price: 140000 },
        { size: '70x60', price: 160000 },
      ],
    },
    productionNote:
      'El tiempo de demora es de 72hs hábiles máximo, una vez que se acredita el pago de la seña. La cual debe ser del 50% del trabajo.',
    accessories: [
      {
        title: 'Pies de apoyo',
        text: 'Soporte resistente y discreto para una presentación elegante, ideal para exhibir la placa sobre un escritorio o mostrador.',
      },
      {
        title: 'Embellecedores',
        text: 'Acabado premium que realza cada detalle. Disponibles en dos terminaciones: bronce o acero, a juego con la placa.',
      },
      {
        title: 'Cajas para placas personalizables',
        text: 'Protección, presentación y valor agregado. Personalización mediante grabado láser, disponibles únicamente para placas de 20x20cm y 30x30cm.',
      },
    ],
    seoParagraph:
      'Producimos placas para inauguraciones, aniversarios y actos institucionales, además de reconocimientos personalizados para premiar logros de empleados, socios o instituciones. Cada placa se graba con texto y logo a medida, con terminación que simula acero o bronce.',
    secondaryKeywords: [
      'placa conmemorativa personalizada',
      'placas conmemorativas grabadas',
      'placas homenaje personalizadas',
      'placas de reconocimiento personalizadas',
      'placa homenaje grabada',
    ],
    highlights: [
      'Texto, logo y fecha grabados con precisión',
      'Terminación que simula acero o bronce, apta para exterior',
      'Aprobás el diseño final antes de producir',
    ],
    faqs: [
      { q: '¿Puedo enviar mi propio diseño de placa?', a: 'Sí, podés enviar el arte o el texto/logo y armamos el layout final para tu aprobación.' },
      { q: '¿Las placas son de acero o bronce real?', a: 'No, son placas con terminación que simula el acero o el bronce (fondo color bronce o acero con texto en negro), aptas para exterior.' },
      { q: '¿Qué accesorios puedo sumar a mi placa?', a: 'Pies de apoyo, embellecedores en bronce o acero, y cajas personalizables (disponibles para placas de 20x20cm y 30x30cm).' },
      { q: '¿Cuánto tardan en producir una placa conmemorativa?', a: 'El tiempo de demora es de 72hs hábiles máximo, una vez acreditado el pago de la seña (50% del trabajo).' },
      { q: '¿Puedo pedir factura?', a: 'Sí, podemos hacer factura A o C, cada una con sus respectivos costos impositivos.' },
    ],
    gallery: Array.from({ length: 10 }).map((_, i) => ({
      img: `/images/PLACAS%20CONMEMORATIVAS/${i + 1}.webp`,
      alt: `Placa conmemorativa grabada con láser ${i + 1}`,
    })),
  },
  {
    slug: 'grabado-en-marmol',
    icon: 'Mountain',
    title: 'Grabado en mármol',
    shortTitle: 'Grabado en mármol',
    keyword: 'grabado en marmol',
    metaDescription:
      'Grabado en mármol en Buenos Aires: texto, fotos e imágenes grabadas con láser sobre placas de mármol para homenajes, lápidas y piezas decorativas.',
    heroTitle: 'Grabado en mármol en Buenos Aires',
    heroSubtitle:
      'Grabado láser de precisión sobre placas de mármol, ideal para homenajes, lápidas y piezas decorativas de alta durabilidad.',
    description: [
      'El grabado en mármol con láser permite marcar texto, fechas, fotos e imágenes sobre la piedra con un detalle que no se logra con técnicas manuales, manteniendo un acabado prolijo y duradero.',
      'Es un material elegido para homenajes, lápidas y piezas conmemorativas por su resistencia a la intemperie y su terminación premium.',
      'Trabajamos sobre placas de mármol de distintos tamaños; contanos las medidas y el diseño que necesitás grabar.',
    ],
    materials: [
      { material: 'Mármol blanco', cortar: false, marcar: false, grabar: true, espesor: 'variable', tamaño: 'a medida', stock: false },
      { material: 'Mármol negro', cortar: false, marcar: false, grabar: true, espesor: 'variable', tamaño: 'a medida', stock: false },
      { material: 'Granito', cortar: false, marcar: false, grabar: true, espesor: 'variable', tamaño: 'a medida', stock: false },
    ],
    seoParagraph:
      'Es una alternativa premium a las placas metálicas para homenajes y piezas decorativas. También trabajamos sobre granito y otras piedras compatibles con láser, con la misma precisión que en las placas conmemorativas.',
    secondaryKeywords: [
      'grabado sobre mármol',
      'placas de mármol grabadas',
      'grabado láser en piedra',
      'grabado en granito',
    ],
    highlights: [
      'Mármol blanco, negro y granito',
      'Foto grabada disponible, igual que en metal',
      'Resiste sol y lluvia sin perder detalle',
    ],
    faqs: [
      { q: '¿Se puede grabar una foto sobre mármol?', a: 'Sí, convertimos la foto a escala de grises y la grabamos con distintos niveles de profundidad para simular el detalle, igual que en metal.' },
      { q: '¿El grabado en mármol resiste la intemperie?', a: 'Sí, es uno de los materiales más resistentes al sol, la lluvia y el paso del tiempo sin perder legibilidad.' },
      { q: '¿Puedo traer mi propia placa de mármol?', a: 'Sí, podés traer o enviarnos tu placa y coordinamos el grabado sobre tu material.' },
      { q: '¿Cuál es el precio del grabado en mármol?', a: 'Depende del tamaño de la placa y el detalle del grabado. Escribinos por WhatsApp y te pasamos el precio sin cargo.' },
    ],
    gallery: Array.from({ length: 10 }).map((_, i) => ({
      img: `/images/MARMOL/${i + 1}.webp`,
      alt: `Grabado en mármol ${i + 1}`,
    })),
  },
  {
    slug: 'placas-para-nicho',
    icon: 'Landmark',
    title: 'Placas para nicho / cementerio',
    shortTitle: 'Placas para nicho',
    keyword: 'placa de cementerio',
    metaDescription:
      'Placas para nicho y placas de cementerio grabadas con láser en Buenos Aires. Texto, foto e imágenes religiosas grabadas de forma permanente y resistente a la intemperie.',
    heroTitle: 'Placas para nicho y cementerio en Buenos Aires',
    heroSubtitle:
      'Placas homenaje grabadas con láser, resistentes a la intemperie, con texto, foto e imágenes religiosas a pedido.',
    description: [
      'Elaboramos placas para nicho y lápidas con grabado láser permanente, pensadas para resistir años de exposición a la intemperie sin perder legibilidad.',
      'Podés incluir texto personalizado, fechas, foto grabada de la persona e imágenes religiosas u ornamentos según se prefiera.',
      'Trabajamos con materiales de bajo mantenimiento (acero inoxidable, bronce, acrílico) que no requieren pintura ni retoque posterior.',
    ],
    materials: [
      { material: 'Acero inoxidable', cortar: false, marcar: true, grabar: true, espesor: '1-2mm', tamaño: 'a medida', stock: false },
      { material: 'Bronce', cortar: false, marcar: true, grabar: true, espesor: '2-3mm', tamaño: 'a medida', stock: false },
      { material: 'Acrílico color', cortar: true, marcar: false, grabar: true, espesor: '3mm', tamaño: 'a medida', stock: true },
    ],
    seoParagraph:
      'Hacemos placas en distintos tamaños y materiales, con foto grabada e imágenes religiosas a pedido. Se graban con láser para máxima durabilidad a la intemperie.',
    secondaryKeywords: [
      'placa para nicho',
      'placa nicho',
      'placa de cementerio',
      'placa homenaje para lápida',
    ],
    highlights: [
      'Resistente a la intemperie por años',
      'Foto e imágenes religiosas a pedido',
      'Coordinamos envío al cementerio',
    ],
    faqs: [
      { q: '¿Puedo pedir una foto grabada en la placa?', a: 'Sí, se puede grabar una foto convertida a escala de grises directamente sobre metal o acrílico.' },
      { q: '¿Qué tan resistente es el grabado a la intemperie?', a: 'Muy resistente: al ser parte de la superficie del material, no se borra ni decolora con el sol o la lluvia.' },
      { q: '¿Hacen envío al cementerio o solo retiro?', a: 'Coordinamos envío según zona; consultanos por WhatsApp la logística para tu caso.' },
    ],
    gallery: Array.from({ length: 10 }).map((_, i) => ({
      img: `/images/PLACAS%20DE%20NICHO%20-%20CEMENTERIO/${i + 1}.webp`,
      alt: `Placa para nicho grabada con láser ${i + 1}`,
    })),
  },
  {
    slug: 'corte-laser-maquetas',
    icon: 'Building2',
    title: 'Corte láser para maquetas',
    shortTitle: 'Maquetas',
    keyword: 'corte láser para maquetas',
    metaDescription:
      'Corte láser para maquetas arquitectónicas y de estudio en Buenos Aires. Precisión milimétrica en cartón, MDF, acrílico y polifan.',
    heroTitle: 'Corte láser para maquetas en Buenos Aires',
    heroSubtitle:
      'Piezas de precisión milimétrica para maquetas arquitectónicas, de estudio y de producto, en múltiples materiales.',
    description: [
      'El corte láser es el estándar para maquetas por la precisión que logra en piezas pequeñas, ensambles y detalles que serían imposibles a mano.',
      'Trabajamos con estudiantes de arquitectura y diseño, estudios profesionales y makers, cortando desde una sola pieza hasta maquetas completas con múltiples partes.',
      'Podés enviarnos el archivo de corte por capas (por material o color de línea) y te asesoramos si es tu primera vez armando un archivo para láser.',
    ],
    materials: [
      { material: 'Cartón/cartulina', cortar: true, marcar: true, grabar: false, espesor: '1-3mm', tamaño: 'hasta 900x600mm', stock: true },
      { material: 'MDF 3mm', cortar: true, marcar: true, grabar: true, espesor: '3mm', tamaño: 'hasta 900x600mm', stock: true },
      { material: 'Acrílico cristal', cortar: true, marcar: false, grabar: true, espesor: '2-3mm', tamaño: 'hasta 900x600mm', stock: true },
      { material: 'Polifan', cortar: true, marcar: true, grabar: false, espesor: '5-10mm', tamaño: 'hasta 900x600mm', stock: false },
    ],
    seoParagraph:
      'Trabajamos con estudiantes y estudios de arquitectura, desde una maqueta de estudio simple hasta modelos con múltiples piezas y materiales combinados.',
    secondaryKeywords: [
      'corte láser maquetas arquitectura',
      'corte maquetas láser',
      'corte láser de maquetas',
      'corte láser maquetas',
    ],
    highlights: [
      'Precisión milimétrica en piezas chicas',
      'Cartón, MDF, acrílico y polifan',
      'Te asesoramos si es tu primer archivo',
    ],
    faqs: [
      { q: '¿Es mi primera maqueta, me ayudan a armar el archivo?', a: 'Sí, te asesoramos con las líneas de corte, espesores y distancias mínimas según el material.' },
      { q: '¿Qué material conviene para maquetas de estudio (entrega rápida)?', a: 'Cartón o MDF 3mm suelen ser los más rápidos y económicos para entregas de facultad.' },
      { q: '¿Puedo pedir piezas transparentes para ventanas?', a: 'Sí, usamos acrílico cristal cortado a la medida exacta de cada abertura.' },
    ],
    gallery: Array.from({ length: 1 }).map((_, i) => ({
      img: `/images/MAQUETAS/${i + 1}.webp`,
      alt: `Corte láser para maqueta ${i + 1}`,
    })),
  },
  {
    slug: 'trabajos-personalizados',
    icon: 'Sparkles',
    title: 'Trabajos personalizados',
    shortTitle: 'Personalizados',
    keyword: 'trabajos personalizados láser',
    metaDescription:
      'Trabajos personalizados de corte y grabado láser en Buenos Aires: regalos, souvenirs, merchandising y piezas a medida para empresas y particulares.',
    heroTitle: 'Trabajos personalizados de corte y grabado láser',
    heroSubtitle:
      'Regalos, souvenirs, merchandising empresarial y piezas únicas, personalizadas con tu texto, logo o diseño.',
    description: [
      'Si tu proyecto no encaja en una sola categoría, esta es la línea de trabajo pensada para pedidos a medida: regalos personalizados, merchandising de marca, souvenirs de eventos y piezas únicas.',
      'Combinamos materiales y técnicas (corte, marcado, grabado) según lo que necesite tu proyecto, con asesoramiento incluido si no sabés bien por dónde empezar.',
      'Usá nuestro personalizador online para armar una idea inicial de mates o placas, o contanos tu proyecto directo por WhatsApp.',
    ],
    materials: [
      { material: 'MDF', cortar: true, marcar: true, grabar: true, espesor: 'variable', tamaño: 'a medida', stock: true },
      { material: 'Acrílico', cortar: true, marcar: false, grabar: true, espesor: 'variable', tamaño: 'a medida', stock: true },
      { material: 'Cuero', cortar: true, marcar: false, grabar: true, espesor: 'variable', tamaño: 'a medida', stock: false },
      { material: 'Corcho', cortar: true, marcar: false, grabar: true, espesor: 'variable', tamaño: 'a medida', stock: false },
    ],
    seoParagraph:
      'Ideal para regalos de cumpleaños, egresos o aniversarios, y para merchandising de marca en eventos y lanzamientos. También armamos souvenirs para bodas y eventos corporativos.',
    secondaryKeywords: [
      'regalos personalizados láser',
      'merchandising grabado láser',
      'souvenirs personalizados',
      'trabajos personalizados láser',
    ],
    highlights: [
      'Pedidos unitarios o en cantidad',
      'Enviá tu vectorial o te ayudamos a armarlo',
      'Ideal para merchandising de marca y eventos',
    ],
    faqs: [
      { q: '¿Hacen pedidos de una sola unidad?', a: 'Sí, tomamos tanto pedidos unitarios (regalo puntual) como tiradas grandes de merchandising.' },
      { q: '¿Puedo probar mi idea en el personalizador antes de cotizar?', a: 'Sí, en /personalizador podés armar una vista previa de mates o placas antes de pedir presupuesto.' },
      { q: '¿Qué formato de logo necesitan para grabar?', a: 'Preferentemente vectorial (.ai, .pdf, .svg); si solo tenés el logo en imagen, consultanos si es viable.' },
    ],
    gallery: Array.from({ length: 10 }).map((_, i) => ({
      img: `/images/PERSONALIZADOS/${i + 1}.webp`,
      alt: `Trabajo personalizado en láser ${i + 1}`,
    })),
  },
  {
    slug: 'senaletica-carteleria',
    icon: 'SignpostBig',
    title: 'Señalética y cartelería láser',
    shortTitle: 'Señalética y cartelería',
    keyword: 'señalética láser',
    metaDescription:
      'Señalética y cartelería cortada y grabada con láser en Buenos Aires. Carteles institucionales, indicadores y letreros a medida para locales y empresas.',
    heroTitle: 'Señalética y cartelería láser en Buenos Aires',
    heroSubtitle:
      'Carteles, letreros e indicadores cortados y grabados con láser para locales, oficinas y espacios institucionales.',
    description: [
      'Fabricamos señalética y cartelería para locales comerciales, oficinas, consultorios y espacios institucionales, con corte y grabado láser de precisión.',
      'Trabajamos indicadores de ambientes, carteles con logo, numeración de puertas y letreros exteriores, en el material que mejor se adapte al uso interior o exterior.',
      'Coordinamos diseño de layout y tipografía antes de producir, para asegurar consistencia visual en todo el cartel.',
    ],
    materials: [
      { material: 'Acrílico color', cortar: true, marcar: false, grabar: true, espesor: '3-5mm', tamaño: 'a medida', stock: true },
      { material: 'MDF con pintura', cortar: true, marcar: false, grabar: true, espesor: '9mm', tamaño: 'a medida', stock: true },
      { material: 'Acero inoxidable', cortar: false, marcar: true, grabar: true, espesor: '1-3mm', tamaño: 'a medida', stock: false },
      { material: 'Aluminio anodizado', cortar: false, marcar: true, grabar: true, espesor: '0.5-2mm', tamaño: 'a medida', stock: false },
    ],
    seoParagraph:
      'Producimos señalética interior y exterior para locales, oficinas y espacios institucionales: indicadores, numeración y carteles con logo. El precio varía según material, tamaño y cantidad, consultanos con tu proyecto.',
    secondaryKeywords: [
      'cartelería láser',
      'señalética para locales',
      'carteles institucionales',
      'letreros cortados con láser',
      'indicadores de ambientes',
    ],
    highlights: [
      'Interior y exterior según material',
      'Diseño de layout antes de producir',
      'Numeración e indicadores a medida',
    ],
    faqs: [
      { q: '¿Hacen cartelería para exterior?', a: 'Sí, en acero inoxidable o aluminio anodizado, resistentes a la intemperie.' },
      { q: '¿Puedo pedir varios carteles iguales con numeración distinta?', a: 'Sí, es un pedido frecuente: mismo diseño base con numeración o texto correlativo.' },
      { q: '¿Cuál es el precio de la señalética láser?', a: 'Depende del material, tamaño y cantidad de piezas. Escribinos por WhatsApp con tu proyecto y te pasamos el precio sin cargo.' },
    ],
    gallery: Array.from({ length: 10 }).map((_, i) => ({
      img: `/images/Se%C3%B1al%C3%A9tica%20y%20Carteleria/${i + 1}.webp`,
      alt: `Señalética láser ${i + 1}`,
    })),
  },
];

export const getServiceBySlug = (slug) => SERVICES.find((s) => s.slug === slug);

export const pickRandomImage = (gallery) => gallery[Math.floor(Math.random() * gallery.length)];
