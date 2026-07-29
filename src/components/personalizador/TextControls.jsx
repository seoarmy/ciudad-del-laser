import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const ALIGN_OPTIONS = [
  { value: 'start', icon: AlignLeft, label: 'Izquierda' },
  { value: 'middle', icon: AlignCenter, label: 'Centro' },
  { value: 'end', icon: AlignRight, label: 'Derecha' },
];

export default function TextControls({
  text,
  onTextChange,
  maxLength,
  fontSize,
  onFontSizeChange,
  minSize,
  maxSize,
  align,
  onAlignChange,
  rotation,
  onRotationChange,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Texto</label>
          <span className="text-xs text-gray-text">
            {text.length}/{maxLength}
          </span>
        </div>
        <textarea
          value={text}
          maxLength={maxLength}
          onChange={(e) => onTextChange(e.target.value)}
          rows={3}
          className="w-full border border-gray-lighter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Tamaño de texto: {fontSize}px</label>
        <input
          type="range"
          min={minSize}
          max={maxSize}
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="w-full accent-orange"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Alineación</label>
          <div className="flex gap-2">
            {ALIGN_OPTIONS.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onAlignChange(value)}
                aria-label={label}
                title={label}
                className={`p-2 rounded-lg border transition-colors ${
                  align === value ? 'border-orange bg-orange/10 text-orange' : 'border-gray-lighter hover:border-orange'
                }`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Rotación: {rotation}°</label>
          <input
            type="range"
            min={-45}
            max={45}
            value={rotation}
            onChange={(e) => onRotationChange(Number(e.target.value))}
            className="w-full accent-orange"
          />
        </div>
      </div>
    </div>
  );
}
