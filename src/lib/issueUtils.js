export const SORTS = [
  { id: 'priority', label: 'Highest priority', fn: (a, b) => b.priorityScore - a.priorityScore },
  { id: 'newest', label: 'Newest', fn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
  { id: 'reports', label: 'Most reports', fn: (a, b) => b.reportCount - a.reportCount },
];

export function filterAndSort(issues, { status = 'all', category = 'all', query = '', sort = 'priority' } = {}) {
  const q = query.trim().toLowerCase();
  const sorter = SORTS.find((s) => s.id === sort)?.fn ?? SORTS[0].fn;
  return issues
    .filter((i) => (status === 'all' ? true : i.status === status))
    .filter((i) => (category === 'all' ? true : i.category === category))
    .filter((i) => !q || `${i.title} ${i.address} ${i.description}`.toLowerCase().includes(q))
    .sort(sorter);
}

export function computeStats(issues) {
  const byStatus = {};
  const byCategory = {};
  const byPriority = {};
  for (const i of issues) {
    byStatus[i.status] = (byStatus[i.status] ?? 0) + 1;
    byCategory[i.category] = (byCategory[i.category] ?? 0) + 1;
    if (i.status !== 'resolved') byPriority[i.priorityLevel] = (byPriority[i.priorityLevel] ?? 0) + 1;
  }
  const totalReports = issues.reduce((sum, i) => sum + i.reportCount, 0);
  return {
    totalIssues: issues.length,
    totalReports,
    mergedReports: Math.max(totalReports - issues.length, 0),
    byStatus,
    byCategory,
    byPriority,
  };
}
