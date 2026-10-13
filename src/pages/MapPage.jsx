import { useMemo, useState } from 'react';
import { MapPinned } from 'lucide-react';
import { useIssues } from '@/hooks/useIssues';
import { filterAndSort } from '@/lib/issueUtils';
import IssueMap from '@/features/map/IssueMap';
import MapLegend from '@/features/map/MapLegend';
import IssueCard from '@/features/issues/IssueCard';
import IssueFilters, { DEFAULT_FILTERS } from '@/features/issues/IssueFilters';
import Spinner from '@/components/ui/Spinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function MapPage() {
  const { data = [], isLoading, error } = useIssues();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState(null);
  const visible = useMemo(() => filterAndSort(data, filters), [data, filters]);

  if (isLoading) return <Spinner label="Loading issues" />;
  if (error) return <div className="mx-auto max-w-3xl p-6"><ErrorMessage title="Could not load issues" error={error} /></div>;

  return (
    <div className="mx-auto grid max-w-[1600px] gap-4 px-4 py-4 sm:px-6 lg:h-[calc(100vh-7rem)] lg:grid-cols-[400px_1fr]">
      <aside className="flex min-h-0 flex-col gap-3">
        <div className="panel p-4"><IssueFilters value={filters} onChange={setFilters} /></div>
        <p className="text-sm text-ink-soft">{visible.length} {visible.length === 1 ? 'issue' : 'issues'} shown</p>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 lg:max-h-none max-h-96">
          {visible.length === 0 && (
            <EmptyState icon={MapPinned} title="No issues match"
              action={<Button variant="secondary" onClick={() => setFilters(DEFAULT_FILTERS)}>Clear filters</Button>}>
              Try removing a filter, or be the first to report a problem here.
            </EmptyState>
          )}
          {visible.map((issue) => (
            <IssueCard key={issue.id} issue={issue} selected={issue.id === selectedId} onSelect={() => setSelectedId(issue.id)} />
          ))}
        </div>
      </aside>

      <div className="flex min-h-[420px] flex-col gap-2">
        <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-paper-line">
          <IssueMap issues={visible} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <MapLegend />
      </div>
    </div>
  );
}
