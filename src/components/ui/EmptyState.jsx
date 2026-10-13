export default function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-paper-line bg-white/60 px-6 py-12 text-center">
      {Icon && <Icon className="mb-3 h-8 w-8 text-ink-muted" aria-hidden="true" />}
      <h3 className="text-lg font-bold">{title}</h3>
      {children && <p className="mt-1 max-w-md text-sm text-ink-soft">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
