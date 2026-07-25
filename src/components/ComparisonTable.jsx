export default function ComparisonTable({ headers, rows, recommendedIndex }) {
  return (
    <div>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-lighter">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-carbon text-white">
              <th className="text-left px-4 py-3 font-semibold w-1/4">&nbsp;</th>
              {headers.map((h, i) => (
                <th
                  key={h}
                  className={`px-4 py-3 font-semibold relative ${
                    i === recommendedIndex ? 'bg-orange text-carbon' : ''
                  }`}
                >
                  {i === recommendedIndex && (
                    <span className="block text-[10px] uppercase font-bold tracking-wide mb-1">Recomendado</span>
                  )}
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row.label} className={ri % 2 ? 'bg-gray-light' : 'bg-white'}>
                <td className="text-left px-4 py-3 font-medium">{row.label}</td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3 text-center text-gray-text ${
                      i === recommendedIndex ? 'border-x-2 border-orange font-semibold text-carbon' : ''
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards per column */}
      <div className="md:hidden flex flex-col gap-4">
        {headers.map((h, i) => (
          <div
            key={h}
            className={`rounded-xl border p-4 ${
              i === recommendedIndex ? 'border-orange border-2' : 'border-gray-lighter'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-heading text-base">{h}</p>
              {i === recommendedIndex && (
                <span className="text-[10px] uppercase font-bold tracking-wide bg-orange text-carbon rounded px-2 py-1">
                  Recomendado
                </span>
              )}
            </div>
            <dl className="space-y-2">
              {rows.map((row) => (
                <div key={row.label} className="flex justify-between text-sm gap-3">
                  <dt className="text-gray-text">{row.label}</dt>
                  <dd className="font-medium text-right">{row.values[i]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
