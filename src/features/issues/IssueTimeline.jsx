import { useIssueUpdates } from '@/hooks/useIssues';
import { formatDate } from '@/lib/format';
import StatusBadge from './StatusBadge';

export default function IssueTimeline({ issueId }) {
  const { data = [], isLoading } = useIssueUpdates(issueId);

  return (
    <section className="panel p-5" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="text-lg font-bold">Status history</h2>
      {isLoading && <p className="mt-3 text-sm text-ink-soft">Loading history</p>}
      {!isLoading && data.length === 0 && (
        <p className="mt-3 text-sm text-ink-soft">No updates from the authority yet.</p>
      )}
      <ol className="mt-4 space-y-4 border-l-2 border-paper-line pl-5">
        {data.map((u) => (
          <li key={u.id} className="relative">
            <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white bg-signal" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={u.status} />
              <time className="text-xs text-ink-muted" dateTime={u.createdAt}>{formatDate(u.createdAt)}</time>
            </div>
            {u.note && <p className="mt-1 text-sm text-ink-soft">{u.note}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
