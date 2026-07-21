$ErrorActionPreference = 'Stop'
$auditSql = Join-Path $PSScriptRoot '..\supabase\verification\020C-database-audit.sql'
$operations = Join-Path $PSScriptRoot '..\planning\sprints\020C-temporary-database-audit-access-and-review\OPERATIONS.md'
if (-not (Test-Path -LiteralPath $auditSql)) { throw "Missing audit SQL: $auditSql" }
if (-not (Test-Path -LiteralPath $operations)) { throw "Missing operator procedure: $operations" }
$sql = Get-Content -LiteralPath $auditSql -Raw
foreach ($item in @(
  'begin transaction read only',
  'set local role pp_audit_020e_20260720',
  'current_database()', 'pg_roles', 'pg_auth_members', 'pg_attribute',
  'pg_attrdef', 'pg_policy', 'pg_index', 'procedure.proacl',
  'aclexplode(', 'has_function_privilege(', 'pg_default_acl', 'rollback;'
)) {
  if ($sql -notmatch [regex]::Escape($item)) { throw "Audit SQL is missing required marker: $item" }
}
$forbidden = '(?im)^\s*(create|alter|grant|revoke|insert|update|delete|truncate|drop|comment|security\s+label|copy)\s'
if ($sql -match $forbidden) { throw "Audit SQL contains a forbidden mutation: $($Matches[0].Trim())" }
if ($sql -match '(?i)\b(auth|storage|vault)\s*\.') { throw 'Audit SQL references a prohibited schema.' }
if ($sql -match '(?i)(password\s*=|postgres(?:ql)?://|supabase_access_token)') {
  throw 'Audit SQL contains a possible secret-bearing pattern.'
}
$procedure = Get-Content -LiteralPath $operations -Raw
foreach ($stale in @(
  'pp_audit_020c_20260719', 'createuser', '--pwprompt',
  'audit password', 'valid until', 'connection-limit=1'
)) {
  if ($procedure -match [regex]::Escape($stale)) { throw "Stale 020C procedure marker remains: $stale" }
}
foreach ($marker in @(
  'pp_audit_020e_20260720', 'NOLOGIN',
  '020E-audit-role-setup.sql', '020E-structural-audit.sql',
  '020E-audit-role-cleanup.sql', 'REASSIGN OWNED', 'DROP OWNED'
)) {
  if ($procedure -notmatch [regex]::Escape($marker)) { throw "Operator procedure is missing: $marker" }
}
Write-Output 'Sprint 020C compatibility audit artifacts passed static safety validation.'
