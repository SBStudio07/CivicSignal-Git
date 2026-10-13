# Backend contract

The frontend never touches Supabase outside `src/services/supabase/`. This file lists
exactly what that folder expects, so the backend can be built to match.

## Tables

### `issues` (read by everyone, written only by RPCs)
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| title | text | |
| description | text | |
| category | text | `pothole`, `streetlight`, `water_leak`, `garbage` |
| status | text | `open`, `acknowledged`, `in_progress`, `resolved` |
| lat, lng | double precision | |
| address | text | |
| priority_score | numeric | 0-100 |
| priority_level | text | `critical`, `high`, `medium`, `low` |
| score_breakdown | jsonb | `{ severity, contextual_risk, independent_reports, age, risk_factors: [text] }` |
| report_count | int | independent reporters merged into the issue |
| photo_path | text | path inside the photo bucket, or a full URL |
| created_at, updated_at, resolved_at | timestamptz | |

Score weights are defined in `src/config/constants.js` (`SCORE_COMPONENTS`):
severity 40, contextual risk 25, independent reports 25, age 10. Change them in both places.

### `issue_updates` (read by everyone)
`id`, `issue_id`, `status`, `note`, `created_at`. One row per status change.

## RPC functions

### `submit_report(...)` -> jsonb
Arguments: `p_category, p_description, p_lat, p_lng, p_address, p_severity_hint
('minor'|'moderate'|'severe'), p_photo_path, p_reporter_token`.
Runs duplicate detection (distance + category + text similarity), then merges into an
existing issue or creates one, recomputes priority, and returns
`{ issue_id, merged, report_count }`.

### `admin_update_issue_status(p_issue_id, p_status, p_note)`
Checks the caller is an admin, updates `issues.status`, and inserts an `issue_updates` row.

## Storage
Public-read bucket named by `VITE_PHOTO_BUCKET` (default `issue-photos`).
Anonymous users may upload to `<reporter_token>/...` only.

## Auth
Admins sign in with email and password. A user is an admin when
`app_metadata.role = 'admin'` (set from the Supabase dashboard or a service-role script).
