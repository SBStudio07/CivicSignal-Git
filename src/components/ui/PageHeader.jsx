export default function PageHeader({ title, children, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {children && <p className="mt-1 max-w-2xl text-ink-soft">{children}</p>}
      </div>
      {actions}
    </div>
  );
}
