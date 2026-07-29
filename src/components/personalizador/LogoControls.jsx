export default function LogoControls({ scale, onScaleChange, rotation, onRotationChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Tamaño de logo: {Math.round(scale * 100)}%</label>
        <input
          type="range"
          min={0.4}
          max={2}
          step={0.05}
          value={scale}
          onChange={(e) => onScaleChange(Number(e.target.value))}
          className="w-full accent-orange"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Rotación de logo: {rotation}°</label>
        <input
          type="range"
          min={-180}
          max={180}
          value={rotation}
          onChange={(e) => onRotationChange(Number(e.target.value))}
          className="w-full accent-orange"
        />
      </div>
    </div>
  );
}
