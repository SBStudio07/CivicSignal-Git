/**
 * Single source of truth for categories, statuses, priority levels and the
 * score model. The backend must use the same ids (see docs/DATA_CONTRACT.md).
 */

export const CATEGORIES = [
  { id: 'pothole', label: 'Pothole', hint: 'Damaged or broken road surface', icon: 'Construction' },
  { id: 'streetlight', label: 'Streetlight', hint: 'Light not working or flickering', icon: 'Lightbulb' },
  { id: 'water_leak', label: 'Water leak', hint: 'Leaking pipe or flooding', icon: 'Droplets' },
  { id: 'garbage', label: 'Garbage', hint: 'Overflowing or uncollected bins', icon: 'Trash2' },
];

export const STATUSES = [
  { id: 'open', label: 'Open', badge: 'bg-slate-100 text-slate-700 ring-slate-300' },
  { id: 'acknowledged', label: 'Acknowledged', badge: 'bg-blue-50 text-blue-800 ring-blue-200' },
  { id: 'in_progress', label: 'In progress', badge: 'bg-violet-50 text-violet-800 ring-violet-200' },
  { id: 'resolved', label: 'Resolved', badge: 'bg-emerald-50 text-emerald-800 ring-emerald-200' },
];

export const PRIORITY_LEVELS = [
  { id: 'critical', label: 'Critical', hex: '#C21F3A', badge: 'bg-priority-critical text-white' },
  { id: 'high', label: 'High', hex: '#E2620F', badge: 'bg-priority-high text-white' },
  { id: 'medium', label: 'Medium', hex: '#C99700', badge: 'bg-priority-medium text-white' },
  { id: 'low', label: 'Low', hex: '#2E8B57', badge: 'bg-priority-low text-white' },
];

export const SEVERITY_HINTS = [
  { id: 'minor', label: 'Minor inconvenience' },
  { id: 'moderate', label: 'Needs attention soon' },
  { id: 'severe', label: 'Dangerous right now' },
];

/**
 * The four transparent score components. `max` values are the proposed
 * weights (they sum to 100) and must match the backend scoring function.
 */
export const SCORE_COMPONENTS = [
  { key: 'severity', label: 'Severity', max: 40, help: 'How serious the problem is for its category and reported condition.' },
  { key: 'contextualRisk', label: 'Contextual risk', max: 25, help: 'Added risk from the surroundings, such as a school, hospital or busy road nearby.' },
  { key: 'independentReports', label: 'Independent reports', max: 25, help: 'Distinct people who reported the same problem. One person cannot raise this alone.' },
  { key: 'age', label: 'Time unresolved', max: 10, help: 'Issues that stay open for longer rise in priority.' },
];

export const MAX_PHOTO_MB = 5;
export const MIN_DESCRIPTION_LENGTH = 10;

export const byId = (list, id) => list.find((item) => item.id === id);
export const categoryLabel = (id) => byId(CATEGORIES, id)?.label ?? id;
export const statusMeta = (id) => byId(STATUSES, id) ?? STATUSES[0];
export const priorityMeta = (id) => byId(PRIORITY_LEVELS, id) ?? PRIORITY_LEVELS[3];
