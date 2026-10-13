import { env } from '@/config/env';

/**
 * Sample issues used ONLY when Supabase is not configured, so the UI can be
 * previewed. They are read-only and always labelled as sample data in the app.
 * Positions are offsets (in degrees) around the configured map centre.
 */
const [cLat, cLng] = env.mapCenter;
const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000).toISOString();

const make = (n, o) => ({
  id: `demo-${n}`,
  description: '',
  address: '',
  photoUrl: null,
  resolvedAt: null,
  updatedAt: hoursAgo(1),
  ...o,
  lat: cLat + o.dLat,
  lng: cLng + o.dLng,
});

const bd = (severity, contextualRisk, independentReports, age, riskFactors = []) => (
  { severity, contextualRisk, independentReports, age, riskFactors }
);

export const demoIssues = [
  make(1, { title: 'Deep pothole on main crossing', category: 'pothole', status: 'acknowledged', dLat: 0.004, dLng: 0.006, address: 'Main crossing, near bus stop', description: 'Two-wheelers are swerving to avoid it. Fills with water when it rains.', priorityScore: 88, priorityLevel: 'critical', reportCount: 9, createdAt: hoursAgo(96), breakdown: bd(36, 20, 22, 10, ['Busy road', 'Bus stop within 50 m']) }),
  make(2, { title: 'Water main leaking beside school gate', category: 'water_leak', status: 'open', dLat: -0.006, dLng: 0.003, address: 'School lane', description: 'Constant flow across the footpath, children walking on the road.', priorityScore: 81, priorityLevel: 'critical', reportCount: 6, createdAt: hoursAgo(40), breakdown: bd(30, 25, 18, 8, ['School within 100 m']) }),
  make(3, { title: 'Streetlight out on hospital approach', category: 'streetlight', status: 'in_progress', dLat: 0.009, dLng: -0.004, address: 'Hospital road', description: 'Three lights in a row are dark after sunset.', priorityScore: 67, priorityLevel: 'high', reportCount: 4, createdAt: hoursAgo(120), breakdown: bd(24, 20, 13, 10, ['Hospital within 150 m']) }),
  make(4, { title: 'Market bins overflowing', category: 'garbage', status: 'open', dLat: -0.002, dLng: -0.009, address: 'Central market, east entrance', description: 'Not collected for several days; waste spilling onto the lane.', priorityScore: 58, priorityLevel: 'high', reportCount: 7, createdAt: hoursAgo(72), breakdown: bd(18, 10, 20, 10, ['High footfall area']) }),
  make(5, { title: 'Cracked road edge near park', category: 'pothole', status: 'open', dLat: 0.011, dLng: 0.01, address: 'Park side road', priorityScore: 41, priorityLevel: 'medium', reportCount: 2, createdAt: hoursAgo(30), breakdown: bd(18, 8, 8, 7) }),
  make(6, { title: 'Flickering streetlight on side street', category: 'streetlight', status: 'acknowledged', dLat: -0.01, dLng: 0.008, address: 'Side street 4', priorityScore: 33, priorityLevel: 'medium', reportCount: 2, createdAt: hoursAgo(150), breakdown: bd(10, 5, 8, 10) }),
  make(7, { title: 'Small pipe seep at corner shop', category: 'water_leak', status: 'open', dLat: 0.002, dLng: -0.012, address: 'Corner shop lane', priorityScore: 27, priorityLevel: 'low', reportCount: 1, createdAt: hoursAgo(10), breakdown: bd(12, 5, 4, 6) }),
  make(8, { title: 'Bin lid broken at bus depot', category: 'garbage', status: 'open', dLat: -0.013, dLng: -0.003, address: 'Bus depot gate', priorityScore: 19, priorityLevel: 'low', reportCount: 1, createdAt: hoursAgo(20), breakdown: bd(8, 3, 4, 4) }),
  make(9, { title: 'Pothole patched on ring road', category: 'pothole', status: 'resolved', dLat: 0.006, dLng: -0.011, address: 'Ring road', priorityScore: 0, priorityLevel: 'low', reportCount: 5, createdAt: hoursAgo(300), resolvedAt: hoursAgo(48), breakdown: bd(0, 0, 0, 0) }),
  make(10, { title: 'Streetlight replaced near library', category: 'streetlight', status: 'resolved', dLat: -0.004, dLng: 0.012, address: 'Library street', priorityScore: 0, priorityLevel: 'low', reportCount: 3, createdAt: hoursAgo(260), resolvedAt: hoursAgo(80), breakdown: bd(0, 0, 0, 0) }),
];

export const demoUpdates = {
  'demo-1': [
    { id: 'u2', status: 'acknowledged', note: 'Road works team assigned.', createdAt: hoursAgo(20) },
    { id: 'u1', status: 'open', note: 'First report received.', createdAt: hoursAgo(96) },
  ],
};
