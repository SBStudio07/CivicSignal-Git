const BASE = 'https://nominatim.openstreetmap.org';

/** Free OpenStreetMap geocoder. Keep calls infrequent (usage policy: max 1/sec). */
export async function reverseGeocode(lat, lng, signal) {
  const res = await fetch(`${BASE}/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18`, {
    signal,
    headers: { 'Accept-Language': 'en' },
  });
  if (!res.ok) throw new Error('Address lookup failed');
  const data = await res.json();
  return data.display_name ?? '';
}

export async function searchPlace(query, signal) {
  const res = await fetch(`${BASE}/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`, { signal });
  if (!res.ok) throw new Error('Place search failed');
  const [hit] = await res.json();
  return hit ? { lat: Number(hit.lat), lng: Number(hit.lon), label: hit.display_name } : null;
}
