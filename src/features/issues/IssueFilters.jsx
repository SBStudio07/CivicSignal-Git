import { Search } from 'lucide-react';
import { CATEGORIES, STATUSES } from '@/config/constants';
import { SORTS } from '@/lib/issueUtils';

export default function IssueFilters({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch });
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="relative sm:col-span-2">
        <label htmlFor="issue-search" className="sr-only">Search issues</label>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
        <input id="issue-search" className="field-input pl-9" placeholder="Search by title or place"
          value={value.query} onChange={(e) => set({ query: e.target.value })} />
      </div>
      <div>
        <label htmlFor="filter-category" className="sr-only">Category</label>
        <select id="filter-category" className="field-input" value={value.category} onChange={(e) => set({ category: e.target.value })}>
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="filter-status" className="sr-only">Status</label>
        <select id="filter-status" className="field-input" value={value.status} onChange={(e) => set({ status: e.target.value })}>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="filter-sort" className="sr-only">Sort by</label>
        <select id="filter-sort" className="field-input" value={value.sort} onChange={(e) => set({ sort: e.target.value })}>
          {SORTS.map((s) => <option key={s.id} value={s.id}>Sort: {s.label}</option>)}
        </select>
      </div>
    </div>
  );
}

export const DEFAULT_FILTERS = { query: '', category: 'all', status: 'all', sort: 'priority' };
