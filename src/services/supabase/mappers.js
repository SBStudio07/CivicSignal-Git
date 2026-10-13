import { supabase } from '@/lib/supabaseClient';
import { env } from '@/config/env';

function photoUrlFor(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return supabase.storage.from(env.photoBucket).getPublicUrl(path).data.publicUrl;
}

/** DB row (snake_case) -> Issue (camelCase). Keep all column knowledge here. */
export function toIssue(row) {
  const b = row.score_breakdown ?? {};
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    category: row.category,
    status: row.status,
    lat: row.lat,
    lng: row.lng,
    address: row.address ?? '',
    priorityScore: Number(row.priority_score ?? 0),
    priorityLevel: row.priority_level ?? 'low',
    breakdown: {
      severity: Number(b.severity ?? 0),
      contextualRisk: Number(b.contextual_risk ?? 0),
      independentReports: Number(b.independent_reports ?? 0),
      age: Number(b.age ?? 0),
      riskFactors: b.risk_factors ?? [],
    },
    reportCount: Number(row.report_count ?? 1),
    photoUrl: photoUrlFor(row.photo_path),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    resolvedAt: row.resolved_at ?? null,
  };
}

export function toIssueUpdate(row) {
  return { id: row.id, status: row.status, note: row.note ?? '', createdAt: row.created_at };
}
