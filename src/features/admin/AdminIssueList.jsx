import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { filterAndSort } from '@/lib/issueUtils';
import { timeAgo } from '@/lib/format';
import PriorityBadge from '@/features/issues/PriorityBadge';
import StatusBadge from '@/features/issues/StatusBadge';
import IssueFilters, { DEFAULT_FILTERS } from '@/features/issues/IssueFilters';
import StatusControls from './StatusControls';
import EmptyState from '@/components/ui/EmptyState';

export default function AdminIssueList({ issues }) {
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, status: 'open' });
  const [openId, setOpenId] = useState(null);
  const visible = useMemo(() => filterAndSort(issues, filters), [issues, filters]);

  return (
    <div className="space-y-4">
      <div className="panel p-4"><IssueFilters value={filters} onChange={setFilters} /></div>
      {visible.length === 0 && <EmptyState title="Nothing matches these filters">Try a different status or category.</EmptyState>}
      <ul className="space-y-3">
        {visible.map((issue) => {
          const expanded = openId === issue.id;
          return (
            <li key={issue.id} className="panel">
              <button type="button" className="flex w-full items-center justify-between gap-3 p-4 text-left"
                aria-expanded={expanded} onClick={() => setOpenId(expanded ? null : issue.id)}>
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{issue.title}</span>
                  <span className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
                    <StatusBadge status={issue.status} />
                    <span>{issue.reportCount} {issue.reportCount === 1 ? 'report' : 'reports'}</span>
                    <span>Reported {timeAgo(issue.createdAt)}</span>
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  {issue.status !== 'resolved' && <PriorityBadge level={issue.priorityLevel} score={issue.priorityScore} />}
                  <ChevronDown className={clsx('h-5 w-5 transition-transform', expanded && 'rotate-180')} aria-hidden="true" />
                </span>
              </button>
              {expanded && (
                <div className="border-t border-paper-line p-4">
                  <StatusControls issue={issue} />
                  <Link to={`/issues/${issue.id}`} className="mt-4 inline-block text-sm font-semibold text-signal hover:underline">Open full details</Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
