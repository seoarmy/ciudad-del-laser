import { useEffect, useMemo, useState } from 'react';

let measureCanvas;
function measureTextWidth(text, family, sizePx) {
  if (!measureCanvas) measureCanvas = document.createElement('canvas');
  const ctx = measureCanvas.getContext('2d');
  ctx.font = `${sizePx}px ${family}`;
  return (text || '')
    .split('\n')
    .reduce((max, line) => Math.max(max, ctx.measureText(line).width), 0);
}

// Google Fonts carga async: measureTextWidth mide con la fuente de fallback del
// navegador hasta que document.fonts.ready resuelve. Este flag fuerza un recálculo
// del useMemo de medición en cuanto la fuente elegida ya esté disponible.
export function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    document.fonts.ready.then(() => setReady(true));
  }, []);
  return ready;
}

export function useTextMeasurement(text, family, sizePx) {
  const fontsReady = useFontsReady();
  const width = useMemo(
    () => measureTextWidth(text, family, sizePx),
    [text, family, sizePx, fontsReady]
  );
  const lineCount = Math.max(1, (text || '').split('\n').length);
  return { width, lineCount };
}
