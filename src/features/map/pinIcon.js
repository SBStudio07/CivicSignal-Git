import L from 'leaflet';
import { priorityMeta } from '@/config/constants';

const cache = new Map();

/** Coloured circle by priority level, showing how many reports were merged. */
export function pinIcon(issue, selected) {
  const key = `${issue.priorityLevel}-${issue.reportCount}-${issue.status === 'resolved'}-${selected}`;
  if (!cache.has(key)) {
    const color = issue.status === 'resolved' ? '#64748B' : priorityMeta(issue.priorityLevel).hex;
    const classes = ['cs-pin', selected && 'is-selected', issue.status === 'resolved' && 'is-resolved'].filter(Boolean).join(' ');
    cache.set(key, L.divIcon({
      className: '',
      html: `<div class="${classes}" style="background:${color}">${issue.reportCount}</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -18],
    }));
  }
  return cache.get(key);
}
