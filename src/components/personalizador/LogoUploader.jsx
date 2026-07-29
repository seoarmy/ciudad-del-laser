import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { validateFileType, checkRasterImage } from '../../utils/logoValidation';

export default function LogoUploader({ logoFile, logoUrl, onSelect, onRemove, warning, onWarning }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    const typeError = validateFileType(file);
    if (typeError) {
      onWarning(typeError);
      return;
    }
    const url = URL.createObjectURL(file);
    const { warning: resWarning } = await checkRasterImage(file, url);
    onWarning(resWarning);
    onSelect(file, url);
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">Logo (opcional)</label>

      {logoFile ? (
        <div className="flex items-center gap-3 border border-gray-lighter rounded-lg px-3 py-2">
          <img src={logoUrl} alt="" className="w-10 h-10 object-contain rounded bg-gray-light shrink-0" />
          <span className="text-sm truncate flex-1">{logoFile.name}</span>
          <button
            type="button"
            onClick={onRemove}
            className="text-gray-text hover:text-orange shrink-0"
            aria-label="Quitar logo"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          className={`flex items-center gap-2 border border-dashed rounded-lg px-4 py-3 text-sm cursor-pointer transition-colors ${
            dragOver ? 'border-orange bg-orange/5' : 'border-gray-lighter hover:border-orange'
          }`}
        >
          <Upload size={18} />
          Subir o arrastrar imagen/logo (PNG, JPG, SVG, PDF)
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/svg+xml,application/pdf"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </label>
      )}

      {warning && (
        <p className="text-xs text-orange-dark mt-2">{warning}</p>
      )}
    </div>
  );
}
