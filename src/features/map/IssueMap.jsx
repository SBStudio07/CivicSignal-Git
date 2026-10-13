import { useEffect, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import BaseMap from './BaseMap';
import { pinIcon } from './pinIcon';
import PriorityBadge from '@/features/issues/PriorityBadge';

function FitToIssues({ issues }) {
  const map = useMap();
  const fitted = useRef(false);
  useEffect(() => {
    if (fitted.current || issues.length === 0) return;
    map.fitBounds(issues.map((i) => [i.lat, i.lng]), { padding: [48, 48], maxZoom: 16 });
    fitted.current = true;
  }, [issues, map]);
  return null;
}

function FlyToSelected({ issue }) {
  const map = useMap();
  useEffect(() => {
    if (issue) map.flyTo([issue.lat, issue.lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
  }, [issue, map]);
  return null;
}

export default function IssueMap({ issues, selectedId, onSelect }) {
  const selected = issues.find((i) => i.id === selectedId) ?? null;
  return (
    <BaseMap>
      <FitToIssues issues={issues} />
      <FlyToSelected issue={selected} />
      {issues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.lat, issue.lng]}
          icon={pinIcon(issue, issue.id === selectedId)}
          eventHandlers={{ click: () => onSelect?.(issue.id) }}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="font-semibold">{issue.title}</p>
              <div className="mt-1.5 flex items-center gap-2">
                {issue.status !== 'resolved' && <PriorityBadge level={issue.priorityLevel} score={issue.priorityScore} />}
                <span className="text-xs">{issue.reportCount} {issue.reportCount === 1 ? 'report' : 'reports'}</span>
              </div>
              <Link to={`/issues/${issue.id}`} className="mt-2 inline-block text-sm font-semibold text-signal">View details</Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </BaseMap>
  );
}
