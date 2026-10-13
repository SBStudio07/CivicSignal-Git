import { PRIORITY_LEVELS } from '@/config/constants';

export default function MapLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
      {PRIORITY_LEVELS.map((p) => (
        <span key={p.id} className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ background: p.hex }} aria-hidden="true" />{p.label}
        </span>
      ))}
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-slate-500 opacity-60" aria-hidden="true" />Resolved
      </span>
      <span>Number on pin = reports merged</span>
    </div>
  );
}
