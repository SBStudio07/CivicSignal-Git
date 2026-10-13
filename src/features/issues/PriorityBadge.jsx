import clsx from 'clsx';
import { priorityMeta } from '@/config/constants';

export default function PriorityBadge({ level, score, className }) {
  const meta = priorityMeta(level);
  return (
    <span className={clsx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold', meta.badge, className)}>
      {meta.label}
      {score != null && <span className="opacity-80">{Math.round(score)}</span>}
    </span>
  );
}
