import clsx from 'clsx';
import { statusMeta } from '@/config/constants';

export default function StatusBadge({ status, className }) {
  const meta = statusMeta(status);
  return (
    <span className={clsx('inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset', meta.badge, className)}>
      {meta.label}
    </span>
  );
}
