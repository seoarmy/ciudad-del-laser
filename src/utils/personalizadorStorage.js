const PREFIX = 'personalizador:';

// Nota: el logo (blob URL) no sobrevive a un reload, solo se persiste el nombre
// como referencia; el usuario tiene que volver a adjuntarlo si recarga la página.
export function saveDesign(key, design) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(design));
  } catch {
    // localStorage puede fallar en modo privado o con cuota llena; no es crítico.
  }
}

export function loadDesign(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearDesign(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    // no-op
  }
}

export function generateDesignId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `d-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPngFromSvg(svgEl, filename, widthPx, heightPx) {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgEl);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const scale = 3; // resolución export > resolución en pantalla
    const canvas = document.createElement('canvas');
    canvas.width = widthPx * scale;
    canvas.height = heightPx * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0, widthPx, heightPx);
    URL.revokeObjectURL(url);

    canvas.toBlob((blob) => {
      const pngUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(pngUrl);
    }, 'image/png');
  };
  img.src = url;
}
