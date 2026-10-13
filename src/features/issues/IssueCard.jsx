import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';
import clsx from 'clsx';
import { CATEGORIES, byId } from '@/config/constants';
import { timeAgo, pluralize } from '@/lib/format';
import CategoryIcon from '@/components/ui/CategoryIcon';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

export default function IssueCard({ issue, selected = false, onSelect, compact = false }) {
  const category = byId(CATEGORIES, issue.category);
  const resolved = issue.status === 'resolved';

  return (
    <article
      className={clsx(
        'panel p-4 transition-shadow',
        selected && 'ring-2 ring-signal',
        onSelect && 'cursor-pointer hover:border-signal/50',
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-signal-tint text-signal-dark">
            <CategoryIcon name={category?.icon} className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="font-sans text-base font-semibold leading-snug">
              <Link to={`/issues/${issue.id}`} className="hover:text-signal-dark hover:underline">{issue.title}</Link>
            </h3>
            {issue.address && (
              <p className="mt-0.5 flex items-center gap-1 text-sm text-ink-soft">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{issue.address}</span>
              </p>
            )}
          </div>
        </div>
        {!resolved && <PriorityBadge level={issue.priorityLevel} score={issue.priorityScore} className="shrink-0" />}
      </div>

      {!compact && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
          <StatusBadge status={issue.status} />
          <span className="inline-flex items-center gap-1">
            <Users className="h-4 w-4" aria-hidden="true" />
            {pluralize(issue.reportCount, 'report')}
          </span>
          <span>Reported {timeAgo(issue.createdAt)}</span>
        </div>
      )}
    </article>
  );
}
