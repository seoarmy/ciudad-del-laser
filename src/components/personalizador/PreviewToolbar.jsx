import { useEffect, useState } from 'react';
import { Grid3x3, Maximize, Minimize, ZoomIn, ZoomOut, Download, FileJson } from 'lucide-react';

export default function PreviewToolbar({
  children,
  grid,
  onGridChange,
  onExportPng,
  onExportJson,
}) {
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!fullscreen) return undefined;
    function handleKeyDown(e) {
      if (e.key === 'Escape') setFullscreen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreen]);

  function toggleFullscreen() {
    setFullscreen((f) => !f);
  }

  return (
    <div className={fullscreen ? 'fixed inset-0 z-50 bg-gray-light flex flex-col gap-3 p-6' : 'flex flex-col gap-3'}>
      <div
        className={`bg-gray-light rounded-xl p-10 flex items-center justify-center overflow-hidden ${
          fullscreen ? 'flex-1' : ''
        }`}
      >
        <div style={{ transform: `scale(${zoom})`, transition: 'transform 0.15s ease' }}>
          {children}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 justify-center">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
          className="p-2 rounded-lg border border-gray-lighter hover:border-orange"
          aria-label="Alejar"
        >
          <ZoomOut size={16} />
        </button>
        <span className="text-xs text-gray-text w-10 text-center">{Math.round(zoom * 100)}%</span>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(2, +(z + 0.25).toFixed(2)))}
          className="p-2 rounded-lg border border-gray-lighter hover:border-orange"
          aria-label="Acercar"
        >
          <ZoomIn size={16} />
        </button>
        <button
          type="button"
          onClick={() => onGridChange(!grid)}
          className={`p-2 rounded-lg border transition-colors ${
            grid ? 'border-orange bg-orange/10 text-orange' : 'border-gray-lighter hover:border-orange'
          }`}
          aria-label="Mostrar grilla"
        >
          <Grid3x3 size={16} />
        </button>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-2 rounded-lg border border-gray-lighter hover:border-orange"
          aria-label="Pantalla completa"
        >
          {fullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
        <button
          type="button"
          onClick={onExportPng}
          className="p-2 rounded-lg border border-gray-lighter hover:border-orange"
          aria-label="Descargar PNG"
          title="Descargar PNG"
        >
          <Download size={16} />
        </button>
        <button
          type="button"
          onClick={onExportJson}
          className="p-2 rounded-lg border border-gray-lighter hover:border-orange"
          aria-label="Descargar configuración (JSON)"
          title="Descargar configuración (JSON)"
        >
          <FileJson size={16} />
        </button>
      </div>
    </div>
  );
}
