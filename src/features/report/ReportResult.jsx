import { CheckCircle2, GitMerge } from 'lucide-react';
import Button from '@/components/ui/Button';
import { pluralize } from '@/lib/format';

export default function ReportResult({ result, onReset }) {
  const Icon = result.merged ? GitMerge : CheckCircle2;
  return (
    <div className="panel p-8 text-center" role="status">
      <Icon className="mx-auto h-12 w-12 text-priority-low" aria-hidden="true" />
      <h2 className="mt-4 text-2xl font-bold">
        {result.merged ? 'Matched to an existing issue' : 'New issue created'}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-ink-soft">
        {result.merged
          ? `Someone already reported this problem. Your report was added, and it now has ${pluralize(result.reportCount, 'report')}.`
          : 'Thanks. This is the first report for this problem, and it is now visible on the map.'}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button to={`/issues/${result.issueId}`}>View the issue</Button>
        <Button variant="secondary" onClick={onReset}>Report another</Button>
      </div>
    </div>
  );
}
