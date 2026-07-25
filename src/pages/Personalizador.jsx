import { useEffect, useMemo, useState } from 'react';
import { Upload, AlertTriangle } from 'lucide-react';
import { buildWhatsappLink } from '../data/site';
import Seo from '../components/Seo';
import ComparisonTable from '../components/ComparisonTable';
import WhatsIncluded from '../components/WhatsIncluded';

const PERSONALIZADOR_INCLUDES = [
  { label: 'Vista previa personalizada', included: true },
  { label: 'Asesoramiento de tipografía y tamaño', included: true },
  { label: 'Corte y grabado de precisión', included: true },
  { label: 'Control de calidad', included: true },
  { label: 'Empaquetado', included: true },
  { label: 'Coordinación de envío/retiro', included: false },
];

const FONTS = [
  { id: 'heading', label: 'Archivo Black', css: 'var(--font-heading)', family: 'Space Grotesk' },
  { id: 'body', label: 'Inter', css: 'var(--font-body)', family: 'Geist' },
  { id: 'serif', label: 'Georgia (clásica)', css: 'Georgia, serif', family: 'Georgia' },
];

const SIZE_COMPARISON = {
  headers: ['15x10cm', '20x15cm', '30x20cm'],
  recommendedIndex: 1,
  rows: [
    { label: 'Uso recomendado', values: ['Escritorio, souvenir', 'Pared, oficina', 'Institucional, exterior'] },
    { label: 'Materiales sugeridos', values: ['Acrílico, MDF', 'Acrílico, MDF, metal', 'Metal, bronce'] },
  ],
};

// 5mm libres al borde, según el instructivo de armado de archivo
const MARGIN_CM = 0.5;
// tamaño mínimo recomendado para que el grabado/corte de texto sea legible
const MIN_PLATE_SIDE_CM = 5;

let measureCanvas;
function measureTextWidth(text, family, sizePx) {
  if (!measureCanvas) measureCanvas = document.createElement('canvas');
  const ctx = measureCanvas.getContext('2d');
  ctx.font = `${sizePx}px ${family}`;
  return ctx.measureText(text || '').width;
}

// Google Fonts carga async: measureTextWidth mide con la fuente de fallback del
// navegador hasta que document.fonts.ready resuelve. Este flag fuerza un recálculo
// del useMemo de medición en cuanto Space Grotesk/Geist ya estén disponibles.
function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    document.fonts.ready.then(() => setReady(true));
  }, []);
  return ready;
}

function ProductionWarning({ children }) {
  return (
    <div className="flex items-start gap-2 bg-orange/10 border border-orange/40 rounded-lg px-3 py-2 text-xs text-carbon">
      <AlertTriangle size={15} className="text-orange shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${
        active ? 'bg-orange text-carbon' : 'bg-gray-light text-carbon hover:bg-gray-lighter'
      }`}
    >
      {children}
    </button>
  );
}

const MATE_PRINTABLE_WIDTH = 150; // viewBox units, ancho útil del cuerpo del mate

function MateCustomizer() {
  const [text, setText] = useState('Mi Mate');
  const [font, setFont] = useState(FONTS[0]);
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogoFile(file);
    setLogoUrl(URL.createObjectURL(file));
  }

  useEffect(() => {
    return () => {
      if (logoUrl) URL.revokeObjectURL(logoUrl);
    };
  }, [logoUrl]);

  const fontsReady = useFontsReady();
  const fontSize = text.length > 10 ? 18 : 24;
  const textWidth = useMemo(
    () => measureTextWidth(text, font.family, fontSize),
    [text, font, fontSize, fontsReady]
  );
  const overflowsPrintableArea = textWidth > MATE_PRINTABLE_WIDTH;

  const message = `Hola! Quiero cotizar un mate personalizado.\nTexto: ${text}\nTipografía: ${font.label}${
    logoFile ? `\nLogo adjunto: ${logoFile.name}` : ''
  }${overflowsPrintableArea ? '\n⚠️ Texto no entra en el área grabable según el simulador' : ''}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Texto</label>
          <input
            value={text}
            maxLength={16}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-lighter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Tipografía</label>
          <div className="flex flex-wrap gap-2">
            {FONTS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFont(f)}
                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                  font.id === f.id ? 'border-orange bg-orange/10' : 'border-gray-lighter hover:border-orange'
                }`}
                style={{ fontFamily: f.css }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Logo (opcional)</label>
          <label className="flex items-center gap-2 border border-dashed border-gray-lighter rounded-lg px-4 py-3 text-sm cursor-pointer hover:border-orange">
            <Upload size={18} />
            {logoFile?.name || 'Subir imagen/logo'}
            <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
          </label>
        </div>

        {overflowsPrintableArea && (
          <ProductionWarning>
            El texto es muy largo para el área grabable del mate. Achicalo o usá una tipografía más angosta.
          </ProductionWarning>
        )}

        {/* El warning no bloquea el envío a propósito: preferimos recibir la consulta
            igual (con la alerta incluida en el mensaje) y que el humano la resuelva,
            antes que perder el lead por un bloqueo duro. */}
        <a
          href={buildWhatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          className="text-center bg-orange hover:bg-orange-dark text-carbon font-bold rounded-lg px-6 py-3 text-sm mt-2"
        >
          Solicitar cotización con esta personalización
        </a>
      </div>

      <div className="flex flex-col gap-3">
      <div className="bg-gray-light rounded-xl p-10 flex items-center justify-center">
        <svg viewBox="0 0 220 260" className="w-56">
          <defs>
            <clipPath id="mate-printable-area">
              <ellipse cx="110" cy="170" rx={MATE_PRINTABLE_WIDTH / 2} ry="55" />
            </clipPath>
          </defs>
          <ellipse cx="110" cy="170" rx="90" ry="80" fill="#2B2B2B" />
          <ellipse cx="110" cy="90" rx="45" ry="16" fill="#2B2B2B" />
          <ellipse cx="110" cy="86" rx="38" ry="12" fill="#F4F4F4" />

          {logoUrl && (
            <image
              href={logoUrl}
              x="80"
              y="130"
              width="60"
              height="60"
              preserveAspectRatio="xMidYMid meet"
              clipPath="url(#mate-printable-area)"
            />
          )}

          {/* área grabable segura, 5mm proporcional de margen respecto al cuerpo del mate */}
          <ellipse
            cx="110"
            cy="170"
            rx={MATE_PRINTABLE_WIDTH / 2}
            ry="55"
            fill="none"
            stroke={overflowsPrintableArea ? '#FF2D78' : '#FF5C33'}
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.6"
          />
          <text
            x="110"
            y={logoUrl ? 210 : 180}
            textAnchor="middle"
            fill={overflowsPrintableArea ? '#FF2D78' : '#FF5C33'}
            fontSize={fontSize}
            style={{ fontFamily: font.css }}
          >
            {text || 'Mi Mate'}
          </text>
        </svg>
      </div>
        <p className="text-xs text-gray-text text-center">
          Vista previa orientativa: te ayuda a imaginar la idea, no es el diseño final de fabricación.
        </p>
      </div>
    </div>
  );
}

function PlacaCustomizer() {
  const [widthCm, setWidthCm] = useState(20);
  const [heightCm, setHeightCm] = useState(15);
  const [text, setText] = useState('Placa personalizada');
  const [font, setFont] = useState(FONTS[0]);
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogoFile(file);
    setLogoUrl(URL.createObjectURL(file));
  }

  useEffect(() => {
    return () => {
      if (logoUrl) URL.revokeObjectURL(logoUrl);
    };
  }, [logoUrl]);

  const maxSide = 200;
  const scale = Math.min(maxSide / widthCm, maxSide / heightCm, 8);
  const marginPx = MARGIN_CM * scale;
  const plateWidthPx = widthCm * scale;
  const plateHeightPx = heightCm * scale;
  const printableWidthPx = Math.max(plateWidthPx - marginPx * 2, 0);
  const fontSizePx = Math.max(10, Math.min(20, plateWidthPx / 12));

  const fontsReady = useFontsReady();
  const textWidthPx = useMemo(
    () => measureTextWidth(text, font.family, fontSizePx),
    [text, font, fontSizePx, fontsReady]
  );
  const overflowsPrintableArea = textWidthPx > printableWidthPx;
  const belowMinSize = widthCm < MIN_PLATE_SIDE_CM || heightCm < MIN_PLATE_SIDE_CM;

  const message = `Hola! Quiero cotizar una placa personalizada.\nTamaño: ${widthCm}x${heightCm}cm\nTexto: ${text}\nTipografía: ${font.label}${
    logoFile ? `\nLogo adjunto: ${logoFile.name}` : ''
  }${overflowsPrintableArea ? '\n⚠️ Texto no entra en el área imprimible según el simulador' : ''}${
    belowMinSize ? '\n⚠️ Tamaño por debajo del mínimo recomendado para grabado legible' : ''
  }`;

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
        <div>
          <label className="block text-sm font-semibold mb-2">Texto</label>
          <input
            value={text}
            maxLength={40}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-lighter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Tipografía</label>
          <div className="flex flex-wrap gap-2">
            {FONTS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFont(f)}
                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                  font.id === f.id ? 'border-orange bg-orange/10' : 'border-gray-lighter hover:border-orange'
                }`}
                style={{ fontFamily: f.css }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Logo (opcional)</label>
          <label className="flex items-center gap-2 border border-dashed border-gray-lighter rounded-lg px-4 py-3 text-sm cursor-pointer hover:border-orange">
            <Upload size={18} />
            {logoFile?.name || 'Adjuntar logo'}
            <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
          </label>
        </div>

        {belowMinSize && (
          <ProductionWarning>
            Tamaño mínimo recomendado {MIN_PLATE_SIDE_CM}×{MIN_PLATE_SIDE_CM}cm para que el grabado quede legible.
          </ProductionWarning>
        )}
        {overflowsPrintableArea && (
          <ProductionWarning>
            El texto no entra en el área imprimible (quedan {MARGIN_CM * 10}mm libres de margen a cada lado). Achicá
            el texto o agrandá la placa.
          </ProductionWarning>
        )}

        {/* El warning no bloquea el envío a propósito: preferimos recibir la consulta
            igual (con la alerta incluida en el mensaje) y que el humano la resuelva,
            antes que perder el lead por un bloqueo duro. */}
        <a
          href={buildWhatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          className="text-center bg-orange hover:bg-orange-dark text-carbon font-bold rounded-lg px-6 py-3 text-sm mt-2"
        >
          Solicitar cotización con esta personalización
        </a>
      </div>

      <div className="flex flex-col gap-3">
      <div className="bg-gray-light rounded-xl p-10 flex items-center justify-center">
        <div
          className="relative bg-carbon flex items-center justify-center rounded-md"
          style={{ width: plateWidthPx, height: plateHeightPx }}
        >
          {/* guía de margen: 5mm libres al borde, según el instructivo de armado de archivo */}
          <div
            className="absolute border border-dashed pointer-events-none"
            style={{
              inset: marginPx,
              borderColor: overflowsPrintableArea ? '#FF2D78' : 'rgba(255,92,51,0.5)',
            }}
          />
          {logoUrl && (
            <img
              src={logoUrl}
              alt=""
              className="absolute pointer-events-none"
              style={{
                inset: marginPx,
                width: `calc(100% - ${marginPx * 2}px)`,
                height: `calc(100% - ${marginPx * 2}px)`,
                objectFit: 'contain',
                opacity: 0.9,
              }}
            />
          )}
          <span
            className="px-2 text-center"
            style={{
              fontFamily: font.css,
              fontSize: fontSizePx,
              color: overflowsPrintableArea ? '#FF2D78' : '#FF5C33',
            }}
          >
            {text || 'Placa personalizada'}
          </span>
        </div>
      </div>
        <p className="text-xs text-gray-text text-center">
          Vista previa orientativa: te ayuda a imaginar la idea, no es el diseño final de fabricación.
        </p>
      </div>
    </div>
  );
}

export default function Personalizador() {
  const [tab, setTab] = useState('mates');

  return (
    <>
      <Seo
        title="Personalizador de mates y placas"
        description="Personalizá tu mate o placa online: elegí texto, tipografía y tamaño, y pedí tu cotización por WhatsApp al instante."
      />
      <section className="bg-carbon text-white text-center py-16 md:py-20 px-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">Personalizador</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Armá una vista previa de tu mate o placa antes de pedir presupuesto.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="flex gap-3 justify-center mb-12">
          <TabButton active={tab === 'mates'} onClick={() => setTab('mates')}>Mates</TabButton>
          <TabButton active={tab === 'placas'} onClick={() => setTab('placas')}>Placas</TabButton>
        </div>

        {tab === 'mates' ? <MateCustomizer /> : <PlacaCustomizer />}
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-14 md:pb-20">
        <WhatsIncluded items={PERSONALIZADOR_INCLUDES} />
      </section>

      {tab === 'placas' && (
        <section className="bg-gray-light py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <h2 className="font-heading text-2xl md:text-3xl uppercase text-center mb-8">Tamaños de placa disponibles</h2>
            <ComparisonTable {...SIZE_COMPARISON} />
          </div>
        </section>
      )}
    </>
  );
}
