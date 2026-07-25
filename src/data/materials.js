// Datos transcriptos del PDF oficial del cliente ("Cómo armar tu archivo").
// stock: 'siempre' | 'a-pedido' | 'consultar'

export const MATERIAL_FAMILIES = [
  {
    id: 'madera-mdf',
    label: 'Madera / MDF',
    items: [
      { material: 'MDF', cortar: true, marcar: true, grabar: true, espesor: '1 y 2mm', tamaño: '600x300mm', stock: 'siempre' },
      { material: 'MDF', cortar: true, marcar: true, grabar: true, espesor: '3, 5.5, 9 y 12mm', tamaño: '900x600mm', stock: 'siempre' },
      { material: 'Madera terciada', cortar: true, marcar: true, grabar: true, espesor: '3mm', tamaño: '900x600mm', stock: 'consultar' },
    ],
  },
  {
    id: 'acrilicos',
    label: 'Acrílicos',
    items: [
      { material: 'Acrílico cristal', cortar: true, marcar: true, grabar: true, espesor: '2, 3, 4 y 5mm', tamaño: '900x600mm', stock: 'siempre' },
      { material: 'Acrílico blanco/negro', cortar: true, marcar: true, grabar: true, espesor: '3, 5, 6 y 8mm', tamaño: '900x600mm', stock: 'consultar' },
      { material: 'Acrílico color', cortar: true, marcar: true, grabar: true, espesor: 'hasta 12mm', tamaño: '900x600mm', stock: 'consultar' },
    ],
  },
  {
    id: 'alto-impacto',
    label: 'Alto impacto',
    items: [
      { material: 'Alto impacto blanco', cortar: true, marcar: true, grabar: false, espesor: '1, 2 y 3mm', tamaño: '900x600mm', stock: 'siempre' },
      { material: 'Alto impacto color', cortar: true, marcar: true, grabar: false, espesor: 'hasta 3mm', tamaño: '900x600mm', stock: 'a-pedido' },
    ],
  },
  {
    id: 'petg',
    label: 'PETG',
    items: [
      { material: 'PETG cristal', cortar: true, marcar: true, grabar: false, espesor: '0.5 y 1mm', tamaño: '900x600mm', stock: 'siempre' },
    ],
  },
  {
    id: 'papel-carton',
    label: 'Papel / Cartón',
    items: [
      { material: 'Cartón y papel', cortar: true, marcar: true, grabar: true, espesor: 'hasta 10mm', tamaño: '900x600mm', stock: 'a-pedido' },
    ],
  },
  {
    id: 'tela-cuero',
    label: 'Tela / Cuero',
    items: [
      { material: 'Tela y cuero', cortar: true, marcar: true, grabar: true, espesor: 'hasta 2mm', tamaño: '900x600mm', stock: 'a-pedido' },
    ],
  },
  {
    id: 'otros',
    label: 'Otros',
    items: [
      { material: 'Polyfan', cortar: true, marcar: false, grabar: false, espesor: '10, 20, 25 y 30mm', tamaño: '900x600mm', stock: 'siempre' },
      { material: 'Goma EVA', cortar: true, marcar: true, grabar: true, espesor: 'hasta 15mm', tamaño: '900x600mm', stock: 'a-pedido' },
      { material: 'Corcho', cortar: true, marcar: true, grabar: true, espesor: 'hasta 5mm', tamaño: '900x600mm', stock: 'a-pedido' },
    ],
  },
];

export const MATERIAL_COMPARISON = {
  headers: ['MDF', 'Acrílico', 'Alto impacto'],
  recommendedIndex: 0,
  rows: [
    { label: 'Precio relativo', values: ['$', '$$', '$'] },
    { label: 'Resistencia', values: ['Media', 'Alta (rígido)', 'Alta (flexible)'] },
    { label: 'Uso recomendado', values: ['Decoración, piezas técnicas', 'Letras, displays, señalética', 'Cartelería exterior, plantillas'] },
    { label: 'Tiempo de entrega', values: ['Rápido', 'Rápido', 'Rápido'] },
  ],
};

// Distancia mínima entre línea, línea paralela y piezas (tip 5 del instructivo)
export const MIN_DISTANCE_TABLE = [
  { material: 'MDF', espesor: 'hasta 9mm', distancia: '1mm' },
  { material: 'MDF', espesor: '12 y 15mm', distancia: '2mm' },
  { material: 'Acrílico', espesor: 'hasta 3mm', distancia: '3mm' },
  { material: 'Acrílico', espesor: 'de 4 a 10mm', distancia: '5mm' },
  { material: 'Alto impacto', espesor: '1 y 2mm', distancia: '3mm' },
  { material: 'Alto impacto', espesor: '3mm', distancia: '5mm' },
  { material: 'PETG cristal', espesor: '1mm', distancia: '3mm' },
  { material: 'Cartón gris', espesor: '1, 2 y 3mm', distancia: '1mm' },
  { material: 'Goma EVA', espesor: 'hasta 5mm', distancia: '3mm' },
];
