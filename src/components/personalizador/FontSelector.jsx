export const FONTS = [
  { id: 'heading', label: 'Space Grotesk', css: 'var(--font-heading)', family: 'Space Grotesk' },
  { id: 'body', label: 'Inter', css: 'var(--font-body)', family: 'Inter' },
  { id: 'serif', label: 'Georgia (clásica)', css: 'Georgia, serif', family: 'Georgia' },
];

export default function FontSelector({ font, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">Tipografía</label>
      <div className="flex flex-wrap gap-2">
        {FONTS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange(f)}
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
  );
}
