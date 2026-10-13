import { AlertTriangle } from 'lucide-react';

export default function ErrorMessage({ title = 'Something went wrong', error }) {
  return (
    <div role="alert" className="flex gap-3 rounded-xl border border-priority-critical/30 bg-red-50 p-4 text-sm text-red-900">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        {error?.message && <p className="mt-0.5">{error.message}</p>}
      </div>
    </div>
  );
}
