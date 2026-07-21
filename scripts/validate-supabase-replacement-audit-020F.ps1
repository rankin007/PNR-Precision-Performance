$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$cleanupPath = Join-Path $root 'supabase\verification\020F-temporary-role-cleanup.sql'
$inventoryPath = Join-Path $root 'supabase\verification\020F-remote-structure-inventory.sql'
if (-not (Test-Path -LiteralPath $cleanupPath)) { throw "Missing cleanup SQL: $cleanupPath" }
if (-not (Test-Path -LiteralPath $inventoryPath)) { throw "Missing inventory SQL: $inventoryPath" }
$cleanup = Get-Content -LiteralPath $cleanupPath -Raw
$inventory = Get-Content -LiteralPath $inventoryPath -Raw
$role = 'pp_audit_020e_20260720'
foreach ($marker in @(
  "rolname = '$role'", "granted.rolname = '$role'",
  "member_role.rolname = 'postgres'", "grantor_role.rolname = 'supabase_admin'",
  'membership.admin_option', 'not membership.inherit_option',
  'not membership.set_option', "grantee.rolname = '$role'",
  "grantor.rolname = 'pg_database_owner'", "set role pg_database_owner",
  "revoke usage on schema public from $role", 'reset role',
  "drop role $role", 'remaining_role_count', 'remaining_membership_count'
)) {
  if ($cleanup -notmatch [regex]::Escape($marker)) { throw "Cleanup missing marker: $marker" }
}
if (($cleanup | Select-String -Pattern "(?im)^\s*drop\s+role\s+$role\b" -AllMatches).Matches.Count -ne 1) {
  throw 'Cleanup must drop the exact role exactly once.'
}
if (($cleanup | Select-String -Pattern '(?im)^\s*revoke\s+usage\s+on\s+schema\s+public' -AllMatches).Matches.Count -ne 1) {
  throw 'Cleanup must revoke only the exact public schema usage once.'
}
if ($cleanup -match '(?i)\b(reassign\s+owned|drop\s+owned|cascade|pg_terminate_backend|truncate|drop\s+database|alter\s+role|supabase_admin\s*;)') {
  throw 'Cleanup contains a forbidden broad/destructive statement.'
}
if ($cleanup -match '(?i)(password\s*=|postgres(?:ql)?://|supabase_access_token|service_role\s*=)') {
  throw 'Cleanup contains a possible secret-bearing pattern.'
}
foreach ($marker in @('begin transaction read only',"current_setting('transaction_read_only')",'pg_catalog.pg_namespace',
'pg_catalog.pg_extension','pg_catalog.pg_class','pg_catalog.pg_attribute','pg_catalog.pg_constraint','pg_catalog.pg_index',
'pg_catalog.pg_proc','pg_catalog.pg_trigger','pg_catalog.pg_policy','pg_catalog.pg_default_acl','pg_catalog.pg_publication',
'remote_migration_history_relation_count','rollback')) {
  if ($inventory -notmatch [regex]::Escape($marker)) { throw "Inventory missing marker: $marker" }
}
if ($inventory -match '(?im)^\s*(insert|update|delete|truncate|drop|alter|create|grant|revoke|commit|copy)\b') {
  throw 'Inventory contains a prohibited mutating statement.'
}
Write-Output 'Sprint 020F exact temporary-role cleanup passed static validation.'
Write-Output 'Sprint 020F remote metadata inventory passed static validation.'
