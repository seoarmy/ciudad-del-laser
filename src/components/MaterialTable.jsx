import { Check, X } from 'lucide-react';

function Mark({ ok }) {
  return ok ? (
    <Check className="text-orange mx-auto" size={18} strokeWidth={3} />
  ) : (
    <X className="text-gray-text/40 mx-auto" size={18} strokeWidth={3} />
  );
}

const STOCK_LABELS = {
  siempre: { label: 'Siempre', className: 'bg-green-check/10 text-green-check' },
  'a-pedido': { label: 'A pedido', className: 'bg-orange/10 text-orange-dark' },
  consultar: { label: 'Consultar', className: 'bg-gray-lighter text-gray-text' },
};

function StockCell({ stock }) {
  if (typeof stock === 'string') {
    const info = STOCK_LABELS[stock] ?? { label: stock, className: 'bg-gray-lighter text-gray-text' };
    return (
      <span className={`inline-block text-xs font-semibold rounded-full px-2.5 py-1 ${info.className}`}>
        {info.label}
      </span>
    );
  }
  return <Mark ok={stock} />;
}

export default function MaterialTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-lighter">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-carbon text-white">
            <th className="text-left px-4 py-3 font-semibold">Material</th>
            <th className="px-4 py-3 font-semibold">Cortar</th>
            <th className="px-4 py-3 font-semibold">Marcar</th>
            <th className="px-4 py-3 font-semibold">Grabar</th>
            <th className="px-4 py-3 font-semibold">Espesor</th>
            <th className="px-4 py-3 font-semibold">Tamaño</th>
            <th className="px-4 py-3 font-semibold">Stock</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.material}-${r.espesor}`} className={i % 2 ? 'bg-gray-light' : 'bg-white'}>
              <td className="text-left px-4 py-3 font-medium">{r.material}</td>
              <td className="px-4 py-3"><Mark ok={r.cortar} /></td>
              <td className="px-4 py-3"><Mark ok={r.marcar} /></td>
              <td className="px-4 py-3"><Mark ok={r.grabar} /></td>
              <td className="px-4 py-3 text-center text-gray-text">{r.espesor}</td>
              <td className="px-4 py-3 text-center text-gray-text">{r.tamaño}</td>
              <td className="px-4 py-3 text-center"><StockCell stock={r.stock} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
