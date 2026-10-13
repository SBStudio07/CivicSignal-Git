import { useEffect, useRef, useState } from 'react';
import { Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { LocateFixed, Search } from 'lucide-react';
import BaseMap from '@/features/map/BaseMap';
import Button from '@/components/ui/Button';
import { searchPlace } from '@/services/geocoding';

const pickIcon = L.divIcon({
  className: '',
  html: '<div class="cs-pin" style="background:#1F4FE0;width:30px;height:30px"></div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

function ClickToPick({ onPick }) {
  useMapEvents({ click: (e) => onPick({ lat: e.latlng.lat, lng: e.latlng.lng }) });
  return null;
}

function Recenter({ position }) {
  const map = useMap();
  const first = useRef(true);
  useEffect(() => {
    if (!position) return;
    if (first.current) { first.current = false; }
    map.flyTo([position.lat, position.lng], Math.max(map.getZoom(), 16), { duration: 0.5 });
  }, [position?.lat, position?.lng]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function LocationPicker({ value, onChange, error }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const locateMe = () => {
    if (!navigator.geolocation) { setStatus('Your browser cannot share location. Click the map instead.'); return; }
    setStatus('Finding your location');
    navigator.geolocation.getCurrentPosition(
      (pos) => { setStatus(''); onChange({ lat: pos.coords.latitude, lng: pos.coords.longitude }); },
      () => setStatus('Location access was denied. Search for a place or click the map.'),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const search = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setStatus('Searching');
    try {
      const hit = await searchPlace(query);
      if (hit) { setStatus(''); onChange({ lat: hit.lat, lng: hit.lng }); }
      else setStatus('No match found. Try a nearby landmark.');
    } catch {
      setStatus('Search is unavailable right now. Click the map instead.');
    }
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        <form onSubmit={search} className="flex min-w-0 flex-1 gap-2">
          <label htmlFor="place-search" className="sr-only">Search for a place</label>
          <input id="place-search" className="field-input" placeholder="Search a street or landmark"
            value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button type="submit" variant="secondary" aria-label="Search"><Search className="h-4 w-4" /></Button>
        </form>
        <Button type="button" variant="secondary" onClick={locateMe}>
          <LocateFixed className="h-4 w-4" aria-hidden="true" /> Use my location
        </Button>
      </div>

      <div className={`h-72 overflow-hidden rounded-xl border ${error ? 'border-priority-critical' : 'border-paper-line'}`}>
        <BaseMap>
          <ClickToPick onPick={onChange} />
          <Recenter position={value} />
          {value && (
            <Marker
              position={[value.lat, value.lng]}
              icon={pickIcon}
              draggable
              eventHandlers={{ dragend: (e) => { const p = e.target.getLatLng(); onChange({ lat: p.lat, lng: p.lng }); } }}
            />
          )}
        </BaseMap>
      </div>

      <p className="mt-1.5 text-sm text-ink-soft" aria-live="polite">
        {status || (value ? 'Drag the pin to fine-tune the spot.' : 'Click the map to drop a pin where the problem is.')}
      </p>
      {error && <p className="mt-1 text-sm font-medium text-priority-critical">{error}</p>}
    </div>
  );
}
