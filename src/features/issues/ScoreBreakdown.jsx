import { SCORE_COMPONENTS, priorityMeta } from '@/config/constants';

/** Shows exactly how a priority score was built, using values from the backend. */
export default function ScoreBreakdown({ issue }) {
  const { breakdown } = issue;
  const color = priorityMeta(issue.priorityLevel).hex;

  return (
    <section className="panel p-5" aria-labelledby="score-heading">
      <div className="flex items-baseline justify-between">
        <h2 id="score-heading" className="text-lg font-bold">Why this priority</h2>
        <p className="font-display text-3xl font-bold" style={{ color }}>
          {Math.round(issue.priorityScore)}<span className="text-base font-medium text-ink-muted"> / 100</span>
        </p>
      </div>

      <ul className="mt-4 space-y-4">
        {SCORE_COMPONENTS.map(({ key, label, max, help }) => {
          const points = breakdown[key] ?? 0;
          return (
            <li key={key}>
              <div className="flex justify-between text-sm font-semibold">
                <span>{label}</span>
                <span>{Math.round(points)} / {max}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-paper-line"
                role="meter" aria-valuenow={points} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
                <div className="h-full rounded-full" style={{ width: `${Math.min(100, (points / max) * 100)}%`, background: color }} />
              </div>
              <p className="mt-1 text-xs text-ink-muted">{help}</p>
            </li>
          );
        })}
      </ul>

      {breakdown.riskFactors?.length > 0 && (
        <div className="mt-5 border-t border-paper-line pt-4">
          <h3 className="font-sans text-sm font-semibold">Risk factors found nearby</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {breakdown.riskFactors.map((f) => (
              <li key={f} className="rounded-full bg-signal-tint px-3 py-1 text-xs font-medium text-signal-dark">{f}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
