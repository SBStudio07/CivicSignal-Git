import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Radar } from 'lucide-react';
import clsx from 'clsx';
import Button from '@/components/ui/Button';

const NAV = [
  { to: '/map', label: 'Issue map' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/admin', label: 'Admin' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) => clsx(
    'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
    isActive ? 'bg-signal-tint text-signal-dark' : 'text-ink-soft hover:bg-paper-line/60',
  );

  return (
    <header className="sticky top-0 z-[1100] border-b border-paper-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-signal text-white">
            <Radar className="h-5 w-5" aria-hidden="true" />
          </span>
          CivicSignal
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => <NavLink key={item.to} to={item.to} className={linkClass}>{item.label}</NavLink>)}
          <Button to="/report" size="sm" className="ml-2">Report an issue</Button>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="flex flex-col gap-1 border-t border-paper-line bg-white px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>{item.label}</NavLink>
          ))}
          <Button to="/report" className="mt-2" onClick={() => setOpen(false)}>Report an issue</Button>
        </nav>
      )}
    </header>
  );
}
