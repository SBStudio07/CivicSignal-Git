import { isSupabaseConfigured } from '@/config/env';
import * as supabaseIssues from './supabase/issuesApi';
import * as supabaseReports from './supabase/reportsApi';
import * as supabaseAuth from './supabase/authApi';
import * as demo from './demo/demoApi';

/**
 * The only place that decides which backend the UI talks to. Features and
 * hooks import `api` and never import Supabase directly, so the data source
 * can change without touching any component.
 */
export const api = isSupabaseConfigured
  ? { ...supabaseIssues, ...supabaseReports, ...supabaseAuth }
  : demo;

export const isDemoMode = !isSupabaseConfigured;
export { DemoModeError } from './errors';
