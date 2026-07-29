const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf'];
const MIN_RASTER_DIMENSION = 300; // px, por debajo de esto el grabado sale pixelado
const EXTREME_ASPECT_RATIO = 4; // ancho:alto o alto:ancho más allá de esto se recorta feo

export function validateFileType(file) {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Formato no soportado. Usá PNG, JPG, SVG o PDF.';
  }
  return null;
}

// Solo aplica a raster (PNG/JPG); SVG es vectorial y PDF no se puede inspeccionar en el navegador.
export function checkRasterImage(file, url) {
  return new Promise((resolve) => {
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      resolve({ warning: null });
      return;
    }
    const img = new Image();
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const ratio = Math.max(w / h, h / w);
      if (w < MIN_RASTER_DIMENSION || h < MIN_RASTER_DIMENSION) {
        resolve({ warning: `Imagen de baja resolución (${w}×${h}px). El grabado puede salir pixelado.` });
      } else if (ratio > EXTREME_ASPECT_RATIO) {
        resolve({ warning: 'La imagen tiene una proporción muy alargada, puede recortarse mal en el área grabable.' });
      } else {
        resolve({ warning: null });
      }
    };
    img.onerror = () => resolve({ warning: null });
    img.src = url;
  });
}

// Emojis y símbolos raros no siempre graban bien en el láser; letras/números/acentos sí.
const UNSAFE_CHARS_REGEX = /[^\p{L}\p{N}\s.,¡!¿?'"()/:-]/gu;

export function findUnsafeCharacters(text) {
  const matches = text.match(UNSAFE_CHARS_REGEX);
  return matches ? [...new Set(matches)] : [];
}
