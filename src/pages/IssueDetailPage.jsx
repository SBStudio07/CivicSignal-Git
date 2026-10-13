import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Users } from 'lucide-react';
import { useIssue } from '@/hooks/useIssues';
import { useAuth } from '@/hooks/useAuth';
import { categoryLabel } from '@/config/constants';
import { formatDate, pluralize, timeAgo } from '@/lib/format';
import BaseMap from '@/features/map/BaseMap';
import { Marker } from 'react-leaflet';
import { pinIcon } from '@/features/map/pinIcon';
import PriorityBadge from '@/features/issues/PriorityBadge';
import StatusBadge from '@/features/issues/StatusBadge';
import ScoreBreakdown from '@/features/issues/ScoreBreakdown';
import IssueTimeline from '@/features/issues/IssueTimeline';
import StatusControls from '@/features/admin/StatusControls';
import Spinner from '@/components/ui/Spinner';
import EmptyState from '@/components/ui/EmptyState';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Button from '@/components/ui/Button';

export default function IssueDetailPage() {
  const { id } = useParams();
  const { data: issue, isLoading, error } = useIssue(id);
  const { isAdmin } = useAuth();

  if (isLoading) return <Spinner label="Loading issue" />;
  if (error) return <div className="mx-auto max-w-3xl p-6"><ErrorMessage title="Could not load this issue" error={error} /></div>;
  if (!issue) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <EmptyState title="Issue not found" action={<Button to="/map" variant="secondary">Back to the map</Button>}>
          It may have been removed, or the link is wrong.
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link to="/map" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-ink-soft hover:text-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the map
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="panel overflow-hidden">
            {issue.photoUrl && <img src={issue.photoUrl} alt={`Photo of ${issue.title}`} className="h-72 w-full object-cover" />}
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={issue.status} />
                {issue.status !== 'resolved' && <PriorityBadge level={issue.priorityLevel} score={issue.priorityScore} />}
                <span className="text-sm text-ink-soft">{categoryLabel(issue.category)}</span>
              </div>
              <h1 className="mt-3 text-3xl font-bold">{issue.title}</h1>
              {issue.address && (
                <p className="mt-2 flex items-center gap-1.5 text-ink-soft"><MapPin className="h-4 w-4" aria-hidden="true" />{issue.address}</p>
              )}
              {issue.description && <p className="mt-4 max-w-prose">{issue.description}</p>}
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
                <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" aria-hidden="true" />{pluralize(issue.reportCount, 'independent report')}</span>
                <span>First reported {formatDate(issue.createdAt)} ({timeAgo(issue.createdAt)})</span>
                {issue.resolvedAt && <span>Resolved {formatDate(issue.resolvedAt)}</span>}
              </p>
            </div>
          </section>

          <div className="h-64 overflow-hidden rounded-xl border border-paper-line">
            <BaseMap center={[issue.lat, issue.lng]} zoom={16} scrollWheelZoom={false}>
              <Marker position={[issue.lat, issue.lng]} icon={pinIcon(issue, false)} />
            </BaseMap>
          </div>
        </div>

        <div className="space-y-6">
          {issue.status !== 'resolved' && <ScoreBreakdown issue={issue} />}
          <IssueTimeline issueId={issue.id} />
          {isAdmin && (
            <section className="panel p-5">
              <h2 className="mb-3 text-lg font-bold">Update this issue</h2>
              <StatusControls issue={issue} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
