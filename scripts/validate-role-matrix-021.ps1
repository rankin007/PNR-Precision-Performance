$ErrorActionPreference = 'Stop'
$migration = Get-Content -Raw 'supabase/migrations/0011_definitive_role_matrix_and_comments.sql'
$hardening = Get-Content -Raw 'supabase/migrations/0012_role_lifecycle_policy_hardening.sql'
$required = @(
  'primary_role_code', 'administrator', 'stable_manager', 'veterinarian', 'consultant', 'stable_hand',
  'stable_role_assignments', 'is_active_app_user()', 'current_primary_role()',
  'has_explicit_horse_role', 'can_comment_biochemistry_horse', 'can_manage_biochemistry_comment',
  'char_length(note_text) between 1 and 2000', 'idx_biochemistry_test_notes_active_test',
  'revoke execute on function public.can_comment_biochemistry_horse(uuid) from public, anon'
)
foreach ($token in $required) {
  if (-not $migration.Contains($token)) { throw "Missing Sprint 021 migration control: $token" }
}
$forbidden = @('tagnbgkroihagjmvehlx', 'service_role', 'anon key', 'delete from auth.users')
foreach ($token in $forbidden) {
  if ($migration.Contains($token)) { throw "Forbidden Sprint 021 migration content: $token" }
}
$hardeningRequired = @(
  'users_update_scoped_manager', 'can_manage_scoped_user',
  'can_manage_horse_access_assignment', 'can_manage_stable_role_assignment',
  'horses_insert_authorised_scope', 'horses_update_authorised_scope',
  'No DELETE policy', 'horse_ownership_history', 'record_horse_ownership_history',
  'horse.comments.write', 'users_status_check'
)
foreach ($token in $hardeningRequired) {
  if (-not $hardening.Contains($token)) { throw "Missing Sprint 021 hardening control: $token" }
}
foreach ($token in $forbidden) {
  if ($hardening.Contains($token)) { throw "Forbidden Sprint 021 hardening content: $token" }
}
$app = Get-Content -Raw 'app/(ops)/data-entry/biochemistry/actions.ts'
foreach ($token in @('validateCommentText', 'maxLength={2000}', 'updated_by_user_id')) {
  if ($token -eq 'maxLength={2000}') { continue }
  if (-not $app.Contains($token)) { throw "Missing Sprint 021 application control: $token" }
}
$page = Get-Content -Raw -LiteralPath 'app/(ops)/data-entry/biochemistry/[testId]/page.tsx'
if (-not $page.Contains('maxLength={2000}')) { throw 'Missing 2,000-character UI boundary.' }
if (-not $page.Contains('whitespace-pre-wrap')) { throw 'Missing plain-text safe rendering.' }
$historical = Get-ChildItem 'supabase/migrations' -Filter '*.sql' | Where-Object Name -lt '0011_definitive_role_matrix_and_comments.sql'
if ($historical.Count -ne 10) { throw 'Expected exactly ten historical migrations before 0011.' }
$bootstrap = Get-Content -Raw 'supabase/bootstrap/remote-init.sql'
$start0011 = $bootstrap.IndexOf('-- >>> BEGIN 0011_definitive_role_matrix_and_comments.sql')
$start0012 = $bootstrap.IndexOf('-- >>> BEGIN 0012_role_lifecycle_policy_hardening.sql')
if ($start0011 -lt 0 -or $start0012 -le $start0011) { throw 'Bootstrap migration order/equivalence markers are incomplete.' }
Write-Output 'Sprint 021 static role/comment validation passed.'
