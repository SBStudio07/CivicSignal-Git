import { FlaskConical } from 'lucide-react';
import { isDemoMode } from '@/services';

export default function DemoBanner() {
  if (!isDemoMode) return null;
  return (
    <div className="border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950">
      <FlaskConical className="mr-1.5 inline h-4 w-4 align-[-2px]" aria-hidden="true" />
      <strong className="font-semibold">Sample data.</strong> Supabase is not connected, so issues shown are read-only
      examples and reporting and admin actions are turned off.
    </div>
  );
}
