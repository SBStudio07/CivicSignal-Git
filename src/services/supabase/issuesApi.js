import { supabase } from '@/lib/supabaseClient';
import { toIssue, toIssueUpdate } from './mappers';

export async function listIssues() {
  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .order('priority_score', { ascending: false });
  if (error) throw error;
  return data.map(toIssue);
}

export async function getIssue(id) {
  const { data, error } = await supabase.from('issues').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? toIssue(data) : null;
}

export async function listIssueUpdates(issueId) {
  const { data, error } = await supabase
    .from('issue_updates')
    .select('*')
    .eq('issue_id', issueId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(toIssueUpdate);
}

/** Admin only. Enforced by the RPC and Row Level Security on the backend. */
export async function updateIssueStatus({ issueId, status, note }) {
  const { error } = await supabase.rpc('admin_update_issue_status', {
    p_issue_id: issueId,
    p_status: status,
    p_note: note ?? '',
  });
  if (error) throw error;
}
