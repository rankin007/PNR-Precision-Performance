$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$migrationDir = Join-Path $root 'supabase/migrations'
$verificationPath = Join-Path $root 'supabase/verification/020G-clean-project-verification.sql'
$oldRef = 'tagnbgkroihagjmvehlx'
$newRef = 'uvskssaecdhxcgytkasc'
$legacyNames = @('Test User','Test User_id_seq','client_applications','etrakka_sessions',
  'etrakka_biochem_comparison','horse_biochemistry_results','horse_gallery_items')
. (Join-Path $PSScriptRoot 'lib\migration-ledger-validation.ps1')
$ledger = Test-CandidateMigrationLedger -MigrationDirectory $migrationDir
$migrations = $ledger.Migrations
$ledger.Diagnostic
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
$atomicMigration = Get-Content -LiteralPath ($migrations | Where-Object Name -Like '0013*').FullName -Raw
foreach ($marker in @('function public.claim_initial_administrator()','security definer',
  'set search_path = pg_catalog, public','auth.uid()','pg_advisory_xact_lock(581732104913021)',
  'revoke execute on function public.claim_initial_administrator() from public, anon',
  'grant execute on function public.claim_initial_administrator() to authenticated')) {
if ($atomicMigration -notmatch [regex]::Escape($marker)) { throw "0013 missing marker: $marker" }
}
$softDeleteMigrationFiles = @($migrations | Where-Object Name -Like '0014*')
if ($softDeleteMigrationFiles.Count -ne 1) { throw 'Migration chain must contain exactly one 0014 migration.' }
$softDeleteMigration = Get-Content -LiteralPath $softDeleteMigrationFiles[0].FullName -Raw
$softDeleteMarkers = @(
  'function\s+public\.soft_delete_biochemistry_comment\s*\(\s*target_note_id\s+uuid\s*,\s*target_test_id\s+uuid\s*\)',
  'returns\s+boolean',
  'language\s+plpgsql',
  '\bvolatile\b',
  'security\s+invoker',
  'set\s+search_path\s*=\s*pg_catalog\s*,\s*public',
  'public\.current_app_user_id\s*\(\s*\)',
  'update\s+public\.biochemistry_test_notes',
  '\bid\s*=\s*target_note_id\b',
  '\btest_id\s*=\s*target_test_id\b',
  '\bdeleted_at\s+is\s+null\b',
  'get\s+diagnostics[\s\S]*\brow_count\b',
  'revoke\s+all\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+from\s+public',
  'revoke\s+all\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+from\s+anon',
  'grant\s+execute\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+to\s+authenticated'
)
foreach ($marker in $softDeleteMarkers) {
  if ($softDeleteMigration -notmatch "(?i)$marker") { throw "0014 missing required safety marker: $marker" }
}
foreach ($prohibited in @(
  'security\s+definer',
  '\breturning\b',
  '\b(?:create|alter|drop)\s+(?:policy|table|column|trigger|role)\b',
  'grant\s+(?:all|execute)\s+on\s+function[\s\S]*?\s+to\s+(?:public|anon)\b'
)) {
  if ($softDeleteMigration -match "(?i)$prohibited") { throw "0014 contains prohibited contract marker: $prohibited" }
}
$softDeleteSignature = [regex]::Match($softDeleteMigration,
  '(?is)function\s+public\.soft_delete_biochemistry_comment\s*\((?<parameters>.*?)\)\s*returns\s+boolean')
if (-not $softDeleteSignature.Success) { throw '0014 exact soft-delete signature could not be inspected.' }
if ($softDeleteSignature.Groups['parameters'].Value -match '(?i)\b(actor|user|app_user)\w*\s+uuid\b') {
  throw '0014 must not accept a caller-supplied actor parameter.'
}
$hardenedSoftDeleteFiles = @($migrations | Where-Object Name -Like '0015*')
if ($hardenedSoftDeleteFiles.Count -ne 1) { throw 'Migration chain must contain exactly one 0015 migration.' }
$hardenedSoftDelete = Get-Content -LiteralPath $hardenedSoftDeleteFiles[0].FullName -Raw
$hardenedMarkers = @(
  'function\s+public\.soft_delete_biochemistry_comment\s*\(\s*target_note_id\s+uuid\s*,\s*target_test_id\s+uuid\s*\)',
  'returns\s+boolean', 'language\s+plpgsql', '\bvolatile\b', 'security\s+definer',
  'set\s+search_path\s*=\s*pg_catalog\s*,\s*public', 'auth\.uid\s*\(\s*\)',
  'from\s+public\.users', "u\.status\s*=\s*'active'", 'from\s+public\.member_profiles',
  'mp\.is_active', 'from\s+public\.biochemistry_test_notes', '\bfor\s+update\b',
  '\bn\.id\s*=\s*target_note_id\b', '\bn\.test_id\s*=\s*target_test_id\b',
  '\bn\.deleted_at\s+is\s+null\b', 'public\.is_admin\s*\(\s*\)',
  'public\.can_comment_biochemistry_horse\s*\(', 'update\s+public\.biochemistry_test_notes',
  'get\s+diagnostics[\s\S]*\brow_count\b',
  'revoke\s+all\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+from\s+public',
  'revoke\s+all\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+from\s+anon',
  'grant\s+execute\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+to\s+authenticated'
)
foreach ($marker in $hardenedMarkers) {
  if ($hardenedSoftDelete -notmatch "(?i)$marker") { throw "0015 missing required safety marker: $marker" }
}
foreach ($prohibited in @(
  '\bexecute\s+(?:format|immediate)\b', '\bformat\s*\(', '\breturning\b',
  '\b(?:create|alter|drop)\s+(?:policy|table|column|trigger|role)\b',
  'grant\s+(?:all|execute)\s+on\s+function[\s\S]*?\s+to\s+(?:public|anon)\b'
)) {
  if ($hardenedSoftDelete -match "(?i)$prohibited") { throw "0015 contains prohibited contract marker: $prohibited" }
}
$hardenedSignature = [regex]::Match($hardenedSoftDelete,
  '(?is)function\s+public\.soft_delete_biochemistry_comment\s*\((?<parameters>.*?)\)\s*returns\s+boolean')
if (-not $hardenedSignature.Success) { throw '0015 exact soft-delete signature could not be inspected.' }
if ($hardenedSignature.Groups['parameters'].Value -match '(?i)\b(actor|user|role)\w*\b') {
  throw '0015 must not accept caller-supplied actor, user, or role input.'
}
$nullSafeFiles = @($migrations | Where-Object Name -Like '0016*')
if ($nullSafeFiles.Count -ne 1) { throw 'Migration chain must contain exactly one 0016 migration.' }
$nullSafe = Get-Content -LiteralPath $nullSafeFiles[0].FullName -Raw
$nullSafeMarkers = @(
  'function\s+public\.soft_delete_biochemistry_comment\s*\(\s*target_note_id\s+uuid\s*,\s*target_test_id\s+uuid\s*\)',
  'returns\s+boolean', 'language\s+plpgsql', '\bvolatile\b', 'security\s+definer',
  'set\s+search_path\s*=\s*pg_catalog\s*,\s*public', 'auth\.uid\s*\(\s*\)',
  'u\.status\s*=\s*''active''', 'mp\.is_active', '\bn\.id\s*=\s*target_note_id\b',
  '\bn\.test_id\s*=\s*target_test_id\b', '\bn\.deleted_at\s+is\s+null\b', 'for\s+update',
  'actor_is_admin\s*:=\s*pg_catalog\.coalesce\s*\(\s*public\.is_admin\s*\(\s*\)\s*,\s*false\s*\)',
  'actor_is_author\s*:=\s*pg_catalog\.coalesce\s*\(\s*target_note\.created_by_user_id\s*=\s*actor_ids\[1\]\s*,\s*false\s*\)',
  'actor_can_comment\s*:=\s*pg_catalog\.coalesce\s*\([\s\S]*public\.can_comment_biochemistry_horse\s*\(',
  'authorized\s*:=\s*actor_is_admin\s+or\s*\(\s*actor_is_author\s+and\s+actor_can_comment\s*\)',
  'if\s+authorized\s+is\s+distinct\s+from\s+true\s+then',
  'mutation_time\s*:=\s*pg_catalog\.now\s*\(\s*\)', 'get\s+diagnostics[\s\S]*\brow_count\b',
  'revoke\s+all\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+from\s+public',
  'revoke\s+all\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+from\s+anon',
  'grant\s+execute\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+to\s+authenticated'
)
foreach ($marker in $nullSafeMarkers) {
  if ($nullSafe -notmatch "(?i)$marker") { throw "0016 missing required null-safe marker: $marker" }
}
foreach ($prohibited in @(
  'if\s+not\s*\(\s*public\.is_admin', '\bexecute\s+(?:format|immediate)\b', '\bformat\s*\(',
  '\breturning\b', '\bexception\b', '\b(?:create|alter|drop)\s+(?:policy|table|column|trigger|role)\b',
  'grant\s+(?:all|execute)\s+on\s+function[\s\S]*?\s+to\s+(?:public|anon)\b'
)) {
  if ($nullSafe -match "(?i)$prohibited") { throw "0016 contains prohibited contract marker: $prohibited" }
}
$nullSafeSignature = [regex]::Match($nullSafe,
  '(?is)function\s+public\.soft_delete_biochemistry_comment\s*\((?<parameters>.*?)\)\s*returns\s+boolean')
if (-not $nullSafeSignature.Success) { throw '0016 exact soft-delete signature could not be inspected.' }
if ($nullSafeSignature.Groups['parameters'].Value -match '(?i)\b(actor|user|role)\w*\b') {
  throw '0016 must not accept caller-supplied actor, user, or role input.'
}
$validNullSafeFiles = @($migrations | Where-Object Name -Like '0017*')
if ($validNullSafeFiles.Count -ne 1) { throw 'Migration chain must contain exactly one 0017 migration.' }
$validNullSafe = Get-Content -LiteralPath $validNullSafeFiles[0].FullName -Raw
$validNullSafeMarkers = @(
  'function\s+public\.soft_delete_biochemistry_comment\s*\(\s*target_note_id\s+uuid\s*,\s*target_test_id\s+uuid\s*\)',
  'returns\s+boolean', 'language\s+plpgsql', '\bvolatile\b', 'security\s+definer',
  'set\s+search_path\s*=\s*pg_catalog\s*,\s*public', 'auth\.uid\s*\(\s*\)',
  'u\.status\s*=\s*''active''', 'mp\.is_active', '\bn\.id\s*=\s*target_note_id\b',
  '\bn\.test_id\s*=\s*target_test_id\b', '\bn\.deleted_at\s+is\s+null\b', 'for\s+update',
  'actor_is_admin\s*:=\s*public\.is_admin\s*\(\s*\)\s+is\s+true',
  'actor_is_author\s*:=\s*\(\s*target_note\.created_by_user_id\s*=\s*actor_ids\[1\]\s*\)\s+is\s+true',
  'actor_can_comment\s*:=\s*public\.can_comment_biochemistry_horse\s*\(\s*target_note\.horse_id\s*\)\s+is\s+true',
  'authorized\s*:=\s*actor_is_admin\s+or\s*\(\s*actor_is_author\s+and\s+actor_can_comment\s*\)',
  'if\s+authorized\s+is\s+not\s+true\s+then',
  'mutation_time\s*:=\s*pg_catalog\.now\s*\(\s*\)', 'get\s+diagnostics[\s\S]*\brow_count\b',
  'revoke\s+all\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+from\s+public',
  'revoke\s+all\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+from\s+anon',
  'grant\s+execute\s+on\s+function\s+public\.soft_delete_biochemistry_comment\s*\(\s*uuid\s*,\s*uuid\s*\)\s+to\s+authenticated'
)
foreach ($marker in $validNullSafeMarkers) {
  if ($validNullSafe -notmatch "(?i)$marker") { throw "0017 missing required valid null-safe marker: $marker" }
}
foreach ($prohibited in @(
  '(?:pg_catalog|public)\.(?:coalesce|nullif|greatest|least)\s*\(',
  'if\s+not\s*\(\s*public\.is_admin', '\bexecute\s+(?:format|immediate)\b', '\bformat\s*\(',
  '\breturning\b', '\bexception\b', '\b(?:create|alter|drop)\s+(?:policy|table|column|trigger|role|function)\b',
  'grant\s+(?:all|execute)\s+on\s+function[\s\S]*?\s+to\s+(?:public|anon)\b'
)) {
  if ($validNullSafe -match "(?i)$prohibited") { throw "0017 contains prohibited contract marker: $prohibited" }
}
$validNullSafeSignature = [regex]::Match($validNullSafe,
  '(?is)function\s+public\.soft_delete_biochemistry_comment\s*\((?<parameters>.*?)\)\s*returns\s+boolean')
if (-not $validNullSafeSignature.Success) { throw '0017 exact soft-delete signature could not be inspected.' }
if ($validNullSafeSignature.Groups['parameters'].Value -match '(?i)\b(actor|user|role)\w*\b') {
  throw '0017 must not accept caller-supplied actor, user, or role input.'
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
Write-Output 'Candidate repository migration chain 0001-0021, target, and verification safety checks passed; applied/remote status was not inspected.'
