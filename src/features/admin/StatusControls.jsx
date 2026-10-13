import { useState } from 'react';
import { STATUSES } from '@/config/constants';
import { useUpdateIssueStatus } from '@/hooks/useIssues';
import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';

/** Admin-only: change status and leave a public note. Backend enforces permissions. */
export default function StatusControls({ issue }) {
  const [status, setStatus] = useState(issue.status);
  const [note, setNote] = useState('');
  const mutation = useUpdateIssueStatus();
  const changed = status !== issue.status || note.trim() !== '';

  const save = (e) => {
    e.preventDefault();
    mutation.mutate({ issueId: issue.id, status, note: note.trim() }, { onSuccess: () => setNote('') });
  };

  return (
    <form onSubmit={save} className="space-y-3">
      <div>
        <label htmlFor={`status-${issue.id}`} className="field-label">Status</label>
        <select id={`status-${issue.id}`} className="field-input" value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={`note-${issue.id}`} className="field-label">Public note (optional)</label>
        <textarea id={`note-${issue.id}`} rows={2} className="field-input" value={note} onChange={(e) => setNote(e.target.value)}
          placeholder="Shown to citizens in the status history." />
      </div>
      {mutation.isError && <ErrorMessage title="Update failed" error={mutation.error} />}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={!changed || mutation.isPending}>{mutation.isPending ? 'Saving' : 'Save update'}</Button>
        {mutation.isSuccess && !changed && <span className="text-sm font-medium text-priority-low" role="status">Saved</span>}
      </div>
    </form>
  );
}
