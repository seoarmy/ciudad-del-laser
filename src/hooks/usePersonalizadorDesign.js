import { useEffect, useRef, useState } from 'react';
import { FONTS } from '../components/personalizador/FontSelector';
import { saveDesign, loadDesign, clearDesign, generateDesignId } from '../utils/personalizadorStorage';

const DEFAULT_TEXT_POS = { x: 50, y: 50 };
const DEFAULT_LOGO_POS = { x: 50, y: 30 };

// Estado compartido por MateCustomizer y PlacaCustomizer: texto, fuente, logo,
// posiciones/rotaciones arrastrables y persistencia en localStorage por producto.
// `key` identifica el producto ('mate' | 'placa') para no mezclar diseños guardados.
export function usePersonalizadorDesign(key, defaultText, defaultFontSize) {
  const persisted = useRef(loadDesign(key));

  const [text, setText] = useState(persisted.current?.text ?? defaultText);
  const [font, setFont] = useState(
    FONTS.find((f) => f.id === persisted.current?.fontId) || FONTS[0]
  );
  const [fontSize, setFontSize] = useState(persisted.current?.fontSize ?? defaultFontSize);
  const [align, setAlign] = useState(persisted.current?.align ?? 'middle');
  const [textRotation, setTextRotation] = useState(persisted.current?.textRotation ?? 0);
  const [textPos, setTextPos] = useState(persisted.current?.textPos ?? DEFAULT_TEXT_POS);

  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [logoWarning, setLogoWarning] = useState(null);
  const [logoScale, setLogoScale] = useState(persisted.current?.logoScale ?? 1);
  const [logoRotation, setLogoRotation] = useState(persisted.current?.logoRotation ?? 0);
  const [logoPos, setLogoPos] = useState(persisted.current?.logoPos ?? DEFAULT_LOGO_POS);
  const [restoredLogoName] = useState(persisted.current?.logoFileName ?? null);

  const [designId] = useState(persisted.current?.designId ?? generateDesignId());

  function selectLogo(file, url) {
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogoFile(file);
    setLogoUrl(url);
    setLogoPos(DEFAULT_LOGO_POS);
    setLogoScale(1);
    setLogoRotation(0);
  }

  function removeLogo() {
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogoFile(null);
    setLogoUrl(null);
    setLogoWarning(null);
  }

  useEffect(() => {
    return () => {
      if (logoUrl) URL.revokeObjectURL(logoUrl);
    };
  }, [logoUrl]);

  useEffect(() => {
    saveDesign(key, {
      designId,
      text,
      fontId: font.id,
      fontSize,
      align,
      textRotation,
      textPos,
      logoFileName: logoFile?.name ?? null,
      logoScale,
      logoRotation,
      logoPos,
    });
  }, [key, designId, text, font, fontSize, align, textRotation, textPos, logoFile, logoScale, logoRotation, logoPos]);

  function reset() {
    setText(defaultText);
    setFont(FONTS[0]);
    setFontSize(defaultFontSize);
    setAlign('middle');
    setTextRotation(0);
    setTextPos(DEFAULT_TEXT_POS);
    removeLogo();
    clearDesign(key);
  }

  return {
    designId,
    text, setText,
    font, setFont,
    fontSize, setFontSize,
    align, setAlign,
    textRotation, setTextRotation,
    textPos, setTextPos,
    logoFile, logoUrl, logoWarning, setLogoWarning, selectLogo, removeLogo,
    logoScale, setLogoScale,
    logoRotation, setLogoRotation,
    logoPos, setLogoPos,
    restoredLogoName,
    reset,
  };
}
