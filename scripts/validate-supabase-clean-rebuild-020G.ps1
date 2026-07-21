$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$migrationDir = Join-Path $root 'supabase/migrations'
$verificationPath = Join-Path $root 'supabase/verification/020G-clean-project-verification.sql'
$oldRef = 'tagnbgkroihagjmvehlx'
$newRef = 'uvskssaecdhxcgytkasc'
$legacyNames = @('Test User','Test User_id_seq','client_applications','etrakka_sessions',
  'etrakka_biochem_comparison','horse_biochemistry_results','horse_gallery_items')
$migrations = Get-ChildItem -LiteralPath $migrationDir -Filter '*.sql' | Sort-Object Name
$expected = 1..12 | ForEach-Object { '{0:D4}' -f $_ }
$actual = $migrations | ForEach-Object { $_.BaseName.Substring(0,4) }
if (Compare-Object $expected $actual) { throw 'Migration versions must be exactly 0001 through 0012.' }
$allSql = ($migrations | Get-Content -Raw) -join [Environment]::NewLine
foreach ($legacy in $legacyNames) {
  if ($allSql -match [regex]::Escape($legacy)) { throw "Migration chain references retired legacy surface: $legacy" }
}
if ($allSql -match [regex]::Escape($oldRef)) { throw 'Migration chain is coupled to old project.' }
if ($allSql -match '(?i)\b(drop\s+database|truncate\s+table|reassign\s+owned|drop\s+owned|migration\s+repair)\b') {
  throw 'Migration chain contains prohibited SQL.'
}
$securityMigration = Get-Content -LiteralPath ($migrations | Where-Object Name -Like '0010*').FullName -Raw
$helpers = @('current_app_user_id()','has_permission(text)','is_admin()','current_member_profile_id()',
  'can_access_horse(uuid)','can_manage_horse_records(uuid)','has_stable_scope(uuid)','can_write_stable_scope(uuid)',
  'can_read_biochemistry_horse(uuid)','can_write_biochemistry_horse(uuid)','can_soft_delete_biochemistry_horse(uuid)')
foreach ($helper in $helpers) {
  foreach ($marker in @("alter function public.$helper set search_path = pg_catalog, public",
    "revoke execute on function public.$helper from public, anon","grant execute on function public.$helper to authenticated")) {
    if ($securityMigration -notmatch [regex]::Escape($marker)) { throw "0010 missing marker: $marker" }
  }
}
if (-not (Test-Path -LiteralPath $verificationPath)) { throw 'Missing 020G verification SQL.' }
$verification = Get-Content -LiteralPath $verificationPath -Raw
foreach ($marker in @('begin transaction read only','legacy_count','public_execute_count','anon_execute_count',
  'total_lookup_count','duplicate_key_count','migration_version_count','rollback')) {
  if ($verification -notmatch [regex]::Escape($marker)) { throw "Verification missing marker: $marker" }
}
if ($verification -match '(?im)^\s*(insert|update|delete|truncate|drop|alter|create|grant|revoke|commit|copy)\b') {
  throw 'Verification SQL contains a mutating statement.'
}
$approvedDocs = @('planning/reviews/020G-new-project-manifest.md','planning/STATE.md',
  'planning/STATUS.json','planning/ARCHITECT_BRIEFING.md')
$identityText = ($approvedDocs | ForEach-Object { Get-Content -LiteralPath (Join-Path $root $_) -Raw }) -join [Environment]::NewLine
if ($identityText -notmatch [regex]::Escape($newRef)) { throw 'Missing candidate reference.' }
if ($identityText -notmatch [regex]::Escape($oldRef)) { throw 'Missing rollback reference.' }
$harnessPath = Join-Path $root 'scripts/supabase-synthetic-auth-rls-020G.mjs'
if (-not (Test-Path -LiteralPath $harnessPath)) { throw 'Missing approved 020G synthetic Auth/RLS harness.' }
$harness = Get-Content -LiteralPath $harnessPath -Raw
foreach ($requiredMarker in @(
  'const EXPECTED_REF="uvskssaecdhxcgytkasc"',
  'const OLD_REF="tagnbgkroihagjmvehlx"',
  '"preflight","create-fixtures","verify-aggregates","cleanup"',
  'CREATE-020G-FIXTURES',
  'CLEANUP-020G-FIXTURES',
  'PARTIAL_CREATION_COMPENSATION_FAILED_STOP_ALL_TESTING',
  'APPLICATION_CLEANUP_FAILED_AUTH_DELETE_REFUSED',
  'UNEXPECTED_CANDIDATE_REFUSED',
  'OLD_PROJECT_REFUSED',
  'LIMITED_HARNESS_PREFLIGHT_COMPLETE',
  'RUN_ANCHORS_NOT_ZERO'
)) {
  if (-not $harness.Contains($requiredMarker)) { throw "Harness missing safety marker: $requiredMarker" }
}
if ($harness -match 'console\.(log|debug|info|warn|error)') { throw 'Harness must not use console output.' }
if ($harness -match '(?i)truncate|migration\s+repair|reset\s+database') { throw 'Harness contains a prohibited broad/destructive operation.' }
Write-Output 'Sprint 020G migration, target, and verification safety checks passed.'
