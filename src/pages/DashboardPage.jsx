import { useStats } from '@/hooks/useIssues';
import { CATEGORIES, PRIORITY_LEVELS, STATUSES } from '@/config/constants';
import PageHeader from '@/components/ui/PageHeader';
import Spinner from '@/components/ui/Spinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import StatCard from '@/features/dashboard/StatCard';
import DistributionBars from '@/features/dashboard/DistributionBars';
import TopPriorityList from '@/features/dashboard/TopPriorityList';

const STATUS_COLORS = { open: '#64748B', acknowledged: '#2563EB', in_progress: '#7C3AED', resolved: '#2E8B57' };

export default function DashboardPage() {
  const { stats, isLoading, error } = useStats();
  if (isLoading) return <Spinner label="Loading dashboard" />;
  if (error) return <div className="mx-auto max-w-3xl p-6"><ErrorMessage title="Could not load the dashboard" error={error} /></div>;

  const open = stats.totalIssues - (stats.byStatus.resolved ?? 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader title="Public dashboard">
        Live counts of reported issues, how urgent they are, and what the authority has done about them.
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Citizen reports" value={stats.totalReports} />
        <StatCard label="Consolidated issues" value={stats.totalIssues} note={`${stats.mergedReports} duplicate reports merged`} />
        <StatCard label="Still open" value={open} />
        <StatCard label="Resolved" value={stats.byStatus.resolved ?? 0} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <DistributionBars title="By status" rows={STATUSES.map((s) => ({ id: s.id, label: s.label, value: stats.byStatus[s.id] ?? 0, color: STATUS_COLORS[s.id] }))} />
        <DistributionBars title="Open issues by priority" rows={PRIORITY_LEVELS.map((p) => ({ id: p.id, label: p.label, value: stats.byPriority[p.id] ?? 0, color: p.hex }))} />
        <DistributionBars title="By category" rows={CATEGORIES.map((c) => ({ id: c.id, label: c.label, value: stats.byCategory[c.id] ?? 0, color: '#1F4FE0' }))} />
      </div>

      <div className="mt-6"><TopPriorityList limit={6} /></div>
    </div>
  );
}
