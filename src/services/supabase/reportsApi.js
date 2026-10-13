import { supabase } from '@/lib/supabaseClient';
import { env } from '@/config/env';
import { getReporterId } from '@/lib/reporterId';

async function uploadPhoto(file, reporterId) {
  if (!file) return null;
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${reporterId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(env.photoBucket)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return path;
}

/**
 * Uploads the photo, then asks the backend to run duplicate detection and
 * either merge the report into an existing issue or create a new one.
 * @param {import('@/lib/types').SubmitReportInput} input
 * @returns {Promise<import('@/lib/types').SubmitReportResult>}
 */
export async function submitReport(input) {
  const reporterId = getReporterId();
  const photoPath = await uploadPhoto(input.photo, reporterId);

  const { data, error } = await supabase.rpc('submit_report', {
    p_category: input.category,
    p_description: input.description,
    p_lat: input.lat,
    p_lng: input.lng,
    p_address: input.address,
    p_severity_hint: input.severityHint,
    p_photo_path: photoPath,
    p_reporter_token: reporterId,
  });
  if (error) throw error;

  return {
    issueId: data.issue_id,
    merged: Boolean(data.merged),
    reportCount: Number(data.report_count ?? 1),
  };
}
