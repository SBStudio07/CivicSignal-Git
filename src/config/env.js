function parseCenter(value) {
  if (!value) return null;
  const [lat, lng] = value.split(',').map((n) => Number(n.trim()));
  return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;
}

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const env = {
  supabaseUrl: url,
  supabaseAnonKey: anonKey,
  photoBucket: import.meta.env.VITE_PHOTO_BUCKET || 'issue-photos',
  mapCenter: parseCenter(import.meta.env.VITE_MAP_CENTER) ?? [20.5937, 78.9629],
  mapZoom: Number(import.meta.env.VITE_MAP_ZOOM) || 5,
};

export const isSupabaseConfigured = Boolean(url && anonKey);
