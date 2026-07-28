function Test-CandidateMigrationLedger {
  [CmdletBinding()]
  param([Parameter(Mandatory)][string]$MigrationDirectory)
  $files = @(Get-ChildItem -LiteralPath $MigrationDirectory -File -Filter '*.sql')
  foreach ($file in $files) {
    if ($file.Name -match '^\d' -and $file.Name -notmatch '^\d{4}_.+\.sql$') { throw "Malformed migration filename: $($file.Name)" }
  }
  $migrations = @($files | Where-Object Name -Match '^\d{4}_.+\.sql$' | Sort-Object { [int]$_.Name.Substring(0,4) }, Name)
  $groups = $migrations | Group-Object { $_.Name.Substring(0,4) }
  if ($groups | Where-Object Count -ne 1) { throw 'Candidate repository migration chain contains a duplicate version.' }
  $expected = 1..20 | ForEach-Object { '{0:D4}' -f $_ }
  $actual = $migrations | ForEach-Object { $_.Name.Substring(0,4) }
  if (Compare-Object $expected $actual) { throw 'Candidate repository migration versions must be exactly 0001 through 0020.' }
  $candidate = @($migrations | Where-Object Name -EQ '0018_test_evidence_upload_and_storage.sql')
  if ($candidate.Count -ne 1) { throw 'Candidate repository chain requires exact 0018_test_evidence_upload_and_storage.sql.' }
  $bytes = [IO.File]::ReadAllBytes($candidate[0].FullName)
  if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) { throw 'Candidate 0018 must be UTF-8 without BOM.' }
  $sql = [Text.UTF8Encoding]::new($false,$true).GetString($bytes)
  foreach ($marker in @(
    'legacy inventory requires governed remediation','update public.biochemistry_test_uploads',
    'biochemistry_test_uploads_file_category_check','biochemistry_test_uploads_size_bytes_check',
    'legacy_unverified','uploads_test_horse_stable_fk','version_group_id','validate_evidence_lineage',
    'evidence_upload_attempts','evidence_csv_registry','evidence_holds','evidence_audit_events',
    'pg_advisory_xact_lock','enable row level security','revoke insert, update, delete'
  )) { if ($sql -notmatch [regex]::Escape($marker)) { throw "Candidate 0018 missing identity marker: $marker" } }
  $completion = @($migrations | Where-Object Name -EQ '0019_test_evidence_remote_contract_completion.sql')
  if ($completion.Count -ne 1) { throw 'Candidate repository chain requires exact 0019_test_evidence_remote_contract_completion.sql.' }
  $completionBytes = [IO.File]::ReadAllBytes($completion[0].FullName)
  if ($completionBytes.Length -ge 3 -and $completionBytes[0] -eq 0xEF -and $completionBytes[1] -eq 0xBB -and $completionBytes[2] -eq 0xBF) { throw 'Candidate 0019 must be UTF-8 without BOM.' }
  $completionSql = [Text.UTF8Encoding]::new($false,$true).GetString($completionBytes)
  foreach ($marker in @(
    'initiate_test_evidence_upload','mutate_test_evidence_lifecycle','reconcile_test_evidence_batch',
    'test-evidence','test_evidence_exact_intent_insert','can_insert_test_evidence_object',
    "array['image/jpeg','image/png','application/pdf']",'evidence.purge',
    'safety_services_unavailable','revoke all on function','to service_role',
    'complete_test_evidence_purge','complete_test_evidence_compensation','object_absence_verified'
  )) { if ($completionSql -notmatch [regex]::Escape($marker)) { throw "Candidate 0019 missing identity marker: $marker" } }
  $correction = @($migrations | Where-Object Name -EQ '0020_schema_qualified_pgcrypto_initiation.sql')
  if ($correction.Count -ne 1) { throw 'Candidate repository chain requires exact 0020_schema_qualified_pgcrypto_initiation.sql.' }
  $correctionBytes = [IO.File]::ReadAllBytes($correction[0].FullName)
  if ($correctionBytes.Length -ge 3 -and $correctionBytes[0] -eq 0xEF -and $correctionBytes[1] -eq 0xBB -and $correctionBytes[2] -eq 0xBF) { throw 'Candidate 0020 must be UTF-8 without BOM.' }
  $correctionSql = [Text.UTF8Encoding]::new($false,$true).GetString($correctionBytes)
  foreach ($marker in @(
    'initiate_test_evidence_upload','extensions.digest(p_idempotency_key','set search_path = pg_catalog, public',
    "to_regprocedure('extensions.digest(text,text)')",'required pgcrypto dependency unavailable',
    'revoke all on function','to authenticated','Sprint 023O additive pgcrypto resolution'
  )) { if ($correctionSql -notmatch [regex]::Escape($marker)) { throw "Candidate 0020 missing identity marker: $marker" } }
  if ($correctionSql -match 'search_path[^\r\n]*extensions') { throw 'Candidate 0020 must not widen the function search path.' }
  [pscustomobject]@{ Migrations=$migrations; Candidate=$correction[0]; Diagnostic='Candidate repository migration chain is aligned through 0020; no applied or remote status was inspected.' }
}
