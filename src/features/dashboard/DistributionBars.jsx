/** Simple accessible horizontal bars. rows: [{ id, label, value, color }] */
export default function DistributionBars({ title, rows }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <section className="panel p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="mt-4 space-y-3">
        {rows.map((r) => (
          <li key={r.id}>
            <div className="flex justify-between text-sm">
              <span className="font-medium">{r.label}</span>
              <span className="font-semibold">{r.value}</span>
            </div>
            <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-paper-line" aria-hidden="true">
              <div className="h-full rounded-full" style={{ width: `${(r.value / max) * 100}%`, background: r.color }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
