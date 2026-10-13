import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { distanceMeters } from '@/lib/geo';
import { useIssues } from '@/hooks/useIssues';
import { categoryLabel } from '@/config/constants';

const RADIUS_M = 150;

/**
 * Informational preview only: lists open issues of the same category close to
 * the pin. The authoritative duplicate check runs on the backend at submit.
 */
export default function NearbyIssues({ category, position }) {
  const { data: issues = [] } = useIssues();
  const nearby = useMemo(() => {
    if (!category || !position) return [];
    return issues
      .filter((i) => i.category === category && i.status !== 'resolved')
      .map((i) => ({ issue: i, meters: distanceMeters(position, i) }))
      .filter((n) => n.meters <= RADIUS_M)
      .sort((a, b) => a.meters - b.meters)
      .slice(0, 3);
  }, [issues, category, position]);

  if (nearby.length === 0) return null;

  return (
    <div className="rounded-xl border border-signal/30 bg-signal-tint p-4 text-sm">
      <p className="font-semibold text-signal-dark">
        {categoryLabel(category)} issues already reported within {RADIUS_M} m
      </p>
      <p className="mt-0.5 text-ink-soft">If yours is the same problem, submit anyway. It will be matched and counted as another report.</p>
      <ul className="mt-2 space-y-1">
        {nearby.map(({ issue, meters }) => (
          <li key={issue.id}>
            <Link to={`/issues/${issue.id}`} className="font-medium text-signal-dark hover:underline" target="_blank" rel="noreferrer">
              {issue.title}
            </Link>
            <span className="text-ink-muted"> ({Math.round(meters)} m away)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
