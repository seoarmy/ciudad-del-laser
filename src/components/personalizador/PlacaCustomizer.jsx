import { useState } from 'react';
import { buildWhatsappLink } from '../../data/site';
import { useTextMeasurement } from '../../hooks/useTextMeasurement';
import { usePersonalizadorDesign } from '../../hooks/usePersonalizadorDesign';
import { downloadJson, downloadPngFromSvg } from '../../utils/personalizadorStorage';
import { buildPersonalizadorMessage } from '../../utils/personalizadorMessage';
import { findUnsafeCharacters } from '../../utils/logoValidation';
import FontSelector from './FontSelector';
import TextControls from './TextControls';
import LogoUploader from './LogoUploader';
import LogoControls from './LogoControls';
import DesignPreview from './DesignPreview';
import PreviewToolbar from './PreviewToolbar';
import ProductionWarning from './ProductionWarning';

// 5mm libres al borde, según el instructivo de armado de archivo
const MARGIN_CM = 0.5;
// tamaño mínimo recomendado para que el grabado/corte de texto sea legible
const MIN_PLATE_SIDE_CM = 5;
const MAX_SIDE_PX = 340;

export default function PlacaCustomizer() {
  const [widthCm, setWidthCm] = useState(20);
  const [heightCm, setHeightCm] = useState(15);
  const d = usePersonalizadorDesign('placa', 'Placa personalizada', 16);
  const [grid, setGrid] = useState(false);
  const [svgRef, setSvgRef] = useState(null);

  const scale = Math.min(MAX_SIDE_PX / widthCm, MAX_SIDE_PX / heightCm, 8);
  const marginPx = MARGIN_CM * scale;
  const plateWidthPx = widthCm * scale;
  const plateHeightPx = heightCm * scale;
  const printableBox = {
    x: marginPx,
    y: marginPx,
    width: Math.max(plateWidthPx - marginPx * 2, 0),
    height: Math.max(plateHeightPx - marginPx * 2, 0),
  };

  const { width: textWidth, lineCount } = useTextMeasurement(d.text, d.font.family, d.fontSize);
  const textHeight = lineCount * d.fontSize * 1.2;
  const overflowsPrintableArea =
    textWidth > printableBox.width || textHeight > printableBox.height;
  const belowMinSize = widthCm < MIN_PLATE_SIDE_CM || heightCm < MIN_PLATE_SIDE_CM;
  const unsafeChars = findUnsafeCharacters(d.text);

  const message = buildPersonalizadorMessage(
    'una placa personalizada',
    [
      { label: 'Tamaño', value: `${widthCm}x${heightCm}cm` },
      { label: 'Texto', value: d.text },
      { label: 'Tipografía', value: d.font.label },
      { label: 'Logo adjunto', value: d.logoFile?.name },
    ],
    [
      overflowsPrintableArea && 'Texto no entra en el área imprimible según el simulador',
      belowMinSize && 'Tamaño por debajo del mínimo recomendado para grabado legible',
      unsafeChars.length > 0 && `Caracteres que pueden no grabarse bien: ${unsafeChars.join(' ')}`,
      d.logoWarning,
    ]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Ancho (cm): {widthCm}</label>
            <input
              type="range"
              min={1}
              max={100}
              value={widthCm}
              onChange={(e) => setWidthCm(Number(e.target.value))}
              className="w-full accent-orange"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Alto (cm): {heightCm}</label>
            <input
              type="range"
              min={1}
              max={60}
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full accent-orange"
            />
          </div>
        </div>

        <TextControls
          text={d.text}
          onTextChange={d.setText}
          maxLength={80}
          fontSize={d.fontSize}
          onFontSizeChange={d.setFontSize}
          minSize={8}
          maxSize={28}
          align={d.align}
          onAlignChange={d.setAlign}
          rotation={d.textRotation}
          onRotationChange={d.setTextRotation}
        />
        <FontSelector font={d.font} onChange={d.setFont} />
        <LogoUploader
          logoFile={d.logoFile}
          logoUrl={d.logoUrl}
          onSelect={d.selectLogo}
          onRemove={d.removeLogo}
          warning={d.logoWarning}
          onWarning={d.setLogoWarning}
        />
        {d.logoFile && (
          <LogoControls
            scale={d.logoScale}
            onScaleChange={d.setLogoScale}
            rotation={d.logoRotation}
            onRotationChange={d.setLogoRotation}
          />
        )}

        {belowMinSize && (
          <ProductionWarning title="Tamaño chico para grabado legible">
            Tamaño mínimo recomendado {MIN_PLATE_SIDE_CM}×{MIN_PLATE_SIDE_CM}cm para que el grabado quede legible.
          </ProductionWarning>
        )}
        {overflowsPrintableArea && (
          <ProductionWarning title="El texto no entra en el área imprimible">
            El texto no entra en el área imprimible (quedan {MARGIN_CM * 10}mm libres de margen a cada lado).
            Achicá el texto o agrandá la placa.
          </ProductionWarning>
        )}
        {unsafeChars.length > 0 && (
          <ProductionWarning title="Algunos caracteres especiales no graban bien">
            Estos caracteres pueden no grabarse correctamente: {unsafeChars.join(' ')}
          </ProductionWarning>
        )}

        <div className="flex gap-2 mt-2">
          <a
            href={buildWhatsappLink(message)}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center bg-orange hover:bg-orange-dark text-carbon font-semibold rounded-lg px-6 py-3 text-sm"
          >
            Solicitar cotización con esta personalización
          </a>
          <button
            type="button"
            onClick={d.reset}
            className="px-4 py-3 rounded-lg text-sm border border-gray-lighter hover:border-orange"
          >
            Restablecer
          </button>
        </div>
      </div>

      <PreviewToolbar
        grid={grid}
        onGridChange={setGrid}
        onExportPng={() =>
          svgRef && downloadPngFromSvg(svgRef, `placa-${d.designId}.png`, plateWidthPx, plateHeightPx)
        }
        onExportJson={() =>
          downloadJson(`placa-${d.designId}.json`, {
            designId: d.designId,
            product: 'placa',
            widthCm,
            heightCm,
            text: d.text,
            font: d.font.label,
            fontSize: d.fontSize,
            align: d.align,
            textRotation: d.textRotation,
            textPos: d.textPos,
            logo: d.logoFile?.name ?? null,
            logoScale: d.logoScale,
            logoRotation: d.logoRotation,
            logoPos: d.logoPos,
          })
        }
      >
        <div style={{ width: plateWidthPx, height: plateHeightPx }}>
          <DesignPreview
            svgRef={setSvgRef}
            viewBox={`0 0 ${plateWidthPx} ${plateHeightPx}`}
            printableBox={printableBox}
            grid={grid}
            overflowColor={overflowsPrintableArea ? '#FF2D78' : '#FF5C33'}
            text={{
              value: d.text || 'Placa personalizada',
              x: d.textPos.x,
              y: d.textPos.y,
              fontSize: d.fontSize,
              align: d.align,
              rotation: d.textRotation,
              fontCss: d.font.css,
            }}
            onTextDrag={(x, y) => d.setTextPos({ x, y })}
            logo={
              d.logoUrl
                ? {
                    url: d.logoUrl,
                    x: d.logoPos.x,
                    y: d.logoPos.y,
                    scale: d.logoScale,
                    rotation: d.logoRotation,
                    baseSize: Math.min(printableBox.width, printableBox.height) * 0.5,
                  }
                : null
            }
            onLogoDrag={(x, y) => d.setLogoPos({ x, y })}
          >
            <rect x="0" y="0" width={plateWidthPx} height={plateHeightPx} fill="#0D0D0D" rx="4" />
            <rect
              x={printableBox.x}
              y={printableBox.y}
              width={printableBox.width}
              height={printableBox.height}
              fill="none"
              stroke={overflowsPrintableArea ? '#FF2D78' : 'rgba(242,124,26,0.5)'}
              strokeWidth="1"
              strokeDasharray="4 3"
            />
          </DesignPreview>
        </div>
      </PreviewToolbar>
      <p className="text-xs text-gray-text text-center md:col-span-2 -mt-6">
        Vista previa orientativa ({widthCm}×{heightCm}cm): arrastrá el texto o el logo para ubicarlos. No es el
        diseño final de fabricación.
      </p>
    </div>
  );
}
