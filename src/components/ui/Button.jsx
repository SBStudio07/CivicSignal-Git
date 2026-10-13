import clsx from 'clsx';
import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-signal text-white hover:bg-signal-dark disabled:bg-signal/40',
  secondary: 'border border-paper-line bg-white text-ink hover:bg-paper',
  ghost: 'text-ink-soft hover:bg-paper-line/60',
  danger: 'bg-priority-critical text-white hover:opacity-90',
};
const SIZES = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2.5 text-sm', lg: 'px-5 py-3 text-base' };

export default function Button({ as, to, variant = 'primary', size = 'md', className, ...props }) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed',
    VARIANTS[variant], SIZES[size], className,
  );
  if (to) return <Link to={to} className={classes} {...props} />;
  const Tag = as ?? 'button';
  return <Tag className={classes} {...props} />;
}
