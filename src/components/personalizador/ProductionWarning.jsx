import { AlertTriangle } from 'lucide-react';

export default function ProductionWarning({ title, children }) {
  return (
    <div
      className="flex items-start gap-2 bg-orange/10 border border-orange/40 rounded-lg px-3 py-2 text-xs text-carbon"
      title={title}
    >
      <AlertTriangle size={15} className="text-orange shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}
