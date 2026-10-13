import { useIssues } from '@/hooks/useIssues';
import { useAuth } from '@/hooks/useAuth';
import PageHeader from '@/components/ui/PageHeader';
import Spinner from '@/components/ui/Spinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Button from '@/components/ui/Button';
import AdminIssueList from '@/features/admin/AdminIssueList';

export default function AdminPage() {
  const { data = [], isLoading, error } = useIssues();
  const { signOut } = useAuth();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <PageHeader title="Admin" actions={<Button variant="secondary" onClick={signOut}>Sign out</Button>}>
        Issues are sorted by priority. Open one to acknowledge it, post an update, or mark it resolved.
      </PageHeader>
      {isLoading && <Spinner label="Loading issues" />}
      {error && <ErrorMessage title="Could not load issues" error={error} />}
      {!isLoading && !error && <AdminIssueList issues={data} />}
    </div>
  );
}
