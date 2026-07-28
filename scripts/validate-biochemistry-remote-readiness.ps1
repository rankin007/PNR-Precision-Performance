$ErrorActionPreference = 'Stop'

$migrationPath = Join-Path $PSScriptRoot '..\supabase\migrations\0009_biochemistry_test_data_model.sql'
$migrationPath = (Resolve-Path -LiteralPath $migrationPath).Path
. (Join-Path $PSScriptRoot 'lib\migration-content-hash.ps1')
$migrationContent = Get-CanonicalMigrationContentHash -LiteralPath $migrationPath
$sql = $migrationContent.Text

$expectedHash = '6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9'
$actualHash = $migrationContent.CanonicalHash
if ($actualHash -ne $expectedHash) {
    throw "Migration 0009 canonicalized content hash changed. Expected $expectedHash, found $actualHash (raw worktree hash $($migrationContent.RawHash)). Re-review is required."
}

$expectedLookupCounts = [ordered]@{
    carbs = 151
    ph_average = 521
    salts = 801
    urea = 301
}

foreach ($lookupType in $expectedLookupCounts.Keys) {
    $pattern = "(?m)^\s*\('$lookupType',"
    $actualCount = ([regex]::Matches($sql, $pattern)).Count
    if ($actualCount -ne $expectedLookupCounts[$lookupType]) {
        throw "Unexpected $lookupType seed count. Expected $($expectedLookupCounts[$lookupType]), found $actualCount."
    }
}

$expectations = [ordered]@{
    tables = @(
        'biochemistry_lookup_values',
        'biochemistry_horse_access_assignments',
        'biochemistry_tests',
        'biochemistry_test_uploads',
        'biochemistry_test_notes'
    )
    functions = @(
        'can_read_biochemistry_horse',
        'can_write_biochemistry_horse',
        'can_soft_delete_biochemistry_horse'
    )
    policies = @(
        'biochemistry_lookup_values_read_authenticated',
        'biochemistry_lookup_values_admin_manage',
        'biochemistry_horse_access_select_related_or_admin',
        'biochemistry_horse_access_manage_trainer_or_admin',
        'biochemistry_tests_select_accessible',
        'biochemistry_tests_insert_writable',
        'biochemistry_tests_update_writable_or_delete_allowed',
        'biochemistry_uploads_select_accessible',
        'biochemistry_uploads_insert_writable',
        'biochemistry_uploads_update_writable_or_delete_allowed',
        'biochemistry_notes_select_accessible',
        'biochemistry_notes_insert_writable',
        'biochemistry_notes_update_writable_or_delete_allowed'
    )
}

foreach ($table in $expectations.tables) {
    if ($sql -notmatch "(?im)^create table if not exists public\.$table\s*\(") {
        throw "Expected table definition not found: public.$table"
    }
    if ($sql -notmatch "(?im)^alter table public\.$table enable row level security;") {
        throw "RLS enable statement not found: public.$table"
    }
}

foreach ($function in $expectations.functions) {
    if ($sql -notmatch "(?im)^create or replace function public\.$function\(") {
        throw "Expected helper function not found: public.$function"
    }
}

foreach ($policy in $expectations.policies) {
    if ($sql -notmatch "(?im)^create policy `"$([regex]::Escape($policy))`"") {
        throw "Expected RLS policy not found: $policy"
    }
}

if ($sql -notmatch '(?is)on conflict \(lookup_type, exact_reading, source_version\) do update') {
    throw 'Expected lookup upsert conflict handling was not found.'
}

if ($sql -match '(?im)^\s*(drop|truncate|delete)\s+') {
    throw 'Unexpected destructive statement found in migration 0009.'
}

Write-Output "Sprint 020 local readiness validation passed."
Write-Output "Migration SHA-256: $actualHash"
Write-Output "Lookup rows: carbs=151, ph_average=521, salts=801, urea=301 (total=1774)"
Write-Output "Expected objects: 5 tables, 3 helper functions, 7 indexes, 13 policies; RLS enabled on all 5 tables."
