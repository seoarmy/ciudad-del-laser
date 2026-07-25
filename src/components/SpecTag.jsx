export default function SpecTag({ parts, className = '' }) {
  return (
    <span
      className={`font-mono text-xs tracking-tight text-gray-text bg-surface/60 border border-white/10 rounded px-2 py-1 ${className}`}
    >
      {parts.filter(Boolean).join(' · ')}
    </span>
  );
}
