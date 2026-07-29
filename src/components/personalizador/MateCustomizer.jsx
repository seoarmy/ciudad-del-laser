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

const VIEW_W = 220;
const VIEW_H = 260;
const ELLIPSE_CX = 110;
const ELLIPSE_CY = 170;
const ELLIPSE_RX = 75;
const ELLIPSE_RY = 55;
const PRINTABLE_BOX = {
  x: ELLIPSE_CX - ELLIPSE_RX,
  y: ELLIPSE_CY - ELLIPSE_RY,
  width: ELLIPSE_RX * 2,
  height: ELLIPSE_RY * 2,
};

export default function MateCustomizer() {
  const d = usePersonalizadorDesign('mate', 'Mi Mate', 22);
  const [grid, setGrid] = useState(false);
  const [svgRef, setSvgRef] = useState(null);

  const { width: textWidth, lineCount } = useTextMeasurement(d.text, d.font.family, d.fontSize);
  const textHeight = lineCount * d.fontSize * 1.2;
  const overflowsPrintableArea =
    textWidth > PRINTABLE_BOX.width || textHeight > PRINTABLE_BOX.height;

  const unsafeChars = findUnsafeCharacters(d.text);

  const message = buildPersonalizadorMessage(
    'un mate personalizado',
    [
      { label: 'Texto', value: d.text },
      { label: 'Tipografía', value: d.font.label },
      { label: 'Logo adjunto', value: d.logoFile?.name },
    ],
    [
      overflowsPrintableArea && 'Texto no entra en el área grabable según el simulador',
      unsafeChars.length > 0 && `Caracteres que pueden no grabarse bien: ${unsafeChars.join(' ')}`,
      d.logoWarning,
    ]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div className="flex flex-col gap-5">
        <TextControls
          text={d.text}
          onTextChange={d.setText}
          maxLength={40}
          fontSize={d.fontSize}
          onFontSizeChange={d.setFontSize}
          minSize={12}
          maxSize={32}
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

        {overflowsPrintableArea && (
          <ProductionWarning title="El área grabable del mate es limitada">
            El texto es muy largo para el área grabable del mate. Achicalo, usá una tipografía más angosta o
            bajá el tamaño.
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
        onExportPng={() => svgRef && downloadPngFromSvg(svgRef, `mate-${d.designId}.png`, VIEW_W, VIEW_H)}
        onExportJson={() =>
          downloadJson(`mate-${d.designId}.json`, {
            designId: d.designId,
            product: 'mate',
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
        <div className="w-full max-w-md">
          <DesignPreview
            svgRef={setSvgRef}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            printableBox={PRINTABLE_BOX}
            grid={grid}
            overflowColor={overflowsPrintableArea ? '#FF2D78' : '#FF5C33'}
            text={{
              value: d.text || 'Mi Mate',
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
                    baseSize: 50,
                  }
                : null
            }
            onLogoDrag={(x, y) => d.setLogoPos({ x, y })}
          >
            <ellipse cx={ELLIPSE_CX} cy={ELLIPSE_CY} rx="90" ry="80" fill="#2B2B2B" />
            <ellipse cx={ELLIPSE_CX} cy="90" rx="45" ry="16" fill="#2B2B2B" />
            <ellipse cx={ELLIPSE_CX} cy="86" rx="38" ry="12" fill="#F4F4F4" />
            <ellipse
              cx={ELLIPSE_CX}
              cy={ELLIPSE_CY}
              rx={ELLIPSE_RX}
              ry={ELLIPSE_RY}
              fill="none"
              stroke={overflowsPrintableArea ? '#FF2D78' : '#FF5C33'}
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.6"
            />
          </DesignPreview>
        </div>
      </PreviewToolbar>
      <p className="text-xs text-gray-text text-center md:col-span-2 -mt-6">
        Vista previa orientativa: arrastrá el texto o el logo para ubicarlos. No es el diseño final de fabricación.
      </p>
    </div>
  );
}
