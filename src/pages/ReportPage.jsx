import PageHeader from '@/components/ui/PageHeader';
import ReportForm from '@/features/report/ReportForm';

export default function ReportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader title="Report an issue">
        Takes about a minute. Reports of the same problem are combined, so you never need to worry about duplicates.
      </PageHeader>
      <ReportForm />
    </div>
  );
}
