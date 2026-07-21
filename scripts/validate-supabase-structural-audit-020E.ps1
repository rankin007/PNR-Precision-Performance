$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$setupPath = Join-Path $root 'supabase\verification\020E-audit-role-setup.sql'
$auditPath = Join-Path $root 'supabase\verification\020E-structural-audit.sql'
$cleanupPath = Join-Path $root 'supabase\verification\020E-audit-role-cleanup.sql'
$roleName = 'pp_audit_020e_20260720'
foreach ($path in @($setupPath, $auditPath, $cleanupPath)) {
  if (-not (Test-Path -LiteralPath $path)) { throw "Missing 020E SQL artifact: $path" }
}
$setup = Get-Content -LiteralPath $setupPath -Raw
$audit = Get-Content -LiteralPath $auditPath -Raw
$cleanup = Get-Content -LiteralPath $cleanupPath -Raw
foreach ($marker in @(
  "create role $roleName", 'nologin', 'nosuperuser', 'nocreatedb',
  'nocreaterole', 'noinherit', 'noreplication', 'nobypassrls',
  "grant usage on schema public to $roleName"
)) {
  if ($setup -notmatch [regex]::Escape($marker)) { throw "Setup is missing: $marker" }
}
if (($setup | Select-String -Pattern "(?im)^\s*create\s+role\s+$roleName\b" -AllMatches).Matches.Count -ne 1) {
  throw 'Setup must create the exact role exactly once.'
}
if ($setup -match '(?i)\b(password|valid\s+until|all\s+privileges|pg_read_all_data)\b') {
  throw 'Setup contains a forbidden privilege or credential marker.'
}
$requiredAudit = @(
  'begin transaction read only;', "set local role $roleName;",
  "current_user <> '$roleName'", "current_setting('transaction_read_only')",
  'pg_catalog.pg_namespace', 'pg_catalog.pg_extension', 'pg_catalog.pg_class',
  'pg_catalog.pg_attribute', 'pg_catalog.pg_constraint', 'pg_catalog.pg_index',
  'pg_catalog.pg_proc', 'pg_catalog.pg_trigger', 'pg_catalog.pg_policy',
  'pg_catalog.pg_default_acl', 'pg_catalog.pg_publication',
  'supabase_migrations.schema_migrations', 'rollback;'
)
foreach ($marker in $requiredAudit) {
  if ($audit -notmatch [regex]::Escape($marker)) { throw "Audit is missing: $marker" }
}
$setRolePosition = $audit.IndexOf("set local role $roleName;", [StringComparison]::OrdinalIgnoreCase)
$assertEnd = $audit.IndexOf('$assert$;', [StringComparison]::OrdinalIgnoreCase)
$firstInventoryPosition = $audit.IndexOf('select', $assertEnd + 9, [StringComparison]::OrdinalIgnoreCase)
if ($setRolePosition -lt 0 -or $firstInventoryPosition -lt 0 -or
    $setRolePosition -gt $firstInventoryPosition) {
  throw 'SET LOCAL ROLE must precede structural inventory.'
}
$auditForbidden = '(?im)^\s*(create|alter|grant|revoke|insert|update|delete|truncate|drop|comment|security\s+label|copy|call)\s'
if ($audit -match $auditForbidden) { throw "Audit contains forbidden mutation: $($Matches[0].Trim())" }
if ($audit -match '(?i)\b(auth\.(users|identities|sessions|refresh_tokens)|storage\.(objects|buckets)|vault\.|decrypted_secrets)\b') {
  throw 'Audit references a prohibited row-bearing relation.'
}
if ($audit -match '(?i)(postgres(?:ql)?://|service_role\s*=|supabase_access_token|password\s*=)') {
  throw 'Audit contains a possible secret-bearing pattern.'
}
foreach ($marker in @(
  "revoke usage on schema public from $roleName",
  'set role pg_database_owner',
  'reset role',
  "revoke $roleName from postgres",
  "drop role $roleName",
  'pg_catalog.pg_shdepend', 'pg_catalog.pg_stat_activity', 'remaining_role_count'
)) {
  if ($cleanup -notmatch [regex]::Escape($marker)) { throw "Cleanup is missing: $marker" }
}
if (($cleanup | Select-String -Pattern "(?im)^\s*drop\s+role\s+$roleName\b" -AllMatches).Matches.Count -ne 1) {
  throw 'Cleanup must drop the exact role exactly once.'
}
if ($cleanup -match '(?i)\b(reassign\s+owned|drop\s+owned|pg_terminate_backend|truncate|drop\s+database)\b') {
  throw 'Cleanup contains a broad or destructive statement.'
}
$combined = $setup + [Environment]::NewLine + $audit + [Environment]::NewLine + $cleanup
if (($combined | Select-String -Pattern $roleName -AllMatches).Matches.Count -lt 12) {
  throw 'Exact audit role is not consistently pinned.'
}
Write-Output 'Sprint 020E setup, audit, and cleanup SQL passed static safety validation.'
