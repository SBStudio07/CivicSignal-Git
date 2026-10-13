import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useIssues } from '@/hooks/useIssues';
import PriorityBadge from '@/features/issues/PriorityBadge';
import StatusBadge from '@/features/issues/StatusBadge';
import { categoryLabel } from '@/config/constants';

export default function TopPriorityList({ limit = 5, title = 'Needs attention first' }) {
  const { data = [] } = useIssues();
  const top = useMemo(
    () => data.filter((i) => i.status !== 'resolved').sort((a, b) => b.priorityScore - a.priorityScore).slice(0, limit),
    [data, limit],
  );

  return (
    <section className="panel p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      {top.length === 0 ? (
        <p className="mt-3 text-sm text-ink-soft">No open issues right now.</p>
      ) : (
        <ol className="mt-3 divide-y divide-paper-line">
          {top.map((issue) => (
            <li key={issue.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <Link to={`/issues/${issue.id}`} className="block truncate font-semibold hover:text-signal-dark hover:underline">{issue.title}</Link>
                <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
                  {categoryLabel(issue.category)} <StatusBadge status={issue.status} />
                </p>
              </div>
              <PriorityBadge level={issue.priorityLevel} score={issue.priorityScore} className="shrink-0" />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
