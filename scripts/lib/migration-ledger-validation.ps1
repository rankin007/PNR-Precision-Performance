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
  $expected = 1..25 | ForEach-Object { '{0:D4}' -f $_ }
  $actual = $migrations | ForEach-Object { $_.Name.Substring(0,4) }
  if (Compare-Object $expected $actual) { throw 'Candidate repository migration versions must be exactly 0001 through 0025.' }
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
  $parserCorrection = @($migrations | Where-Object Name -EQ '0021_postgresql_filename_extension_parser_correction.sql')
  if ($parserCorrection.Count -ne 1) { throw 'Candidate repository chain requires exact 0021_postgresql_filename_extension_parser_correction.sql.' }
  $parserBytes = [IO.File]::ReadAllBytes($parserCorrection[0].FullName)
  if ($parserBytes.Length -ge 3 -and $parserBytes[0] -eq 0xEF -and $parserBytes[1] -eq 0xBB -and $parserBytes[2] -eq 0xBF) { throw 'Candidate 0021 must be UTF-8 without BOM.' }
  $parserSql = [Text.UTF8Encoding]::new($false,$true).GetString($parserBytes)
  foreach ($marker in @(
    'initiate_test_evidence_upload',"substring(normal_name from '\.([A-Za-z0-9]+)$')",
    'extensions.digest(p_idempotency_key','set search_path = pg_catalog, public',
    "to_regprocedure('extensions.digest(text,text)')",'revoke all on function','to authenticated',
    'Sprint 023P additive PostgreSQL filename extension parser correction'
  )) { if (-not $parserSql.Contains($marker)) { throw "Candidate 0021 missing identity marker: $marker" } }
  if ($parserSql -match 'search_path[^\r\n]*extensions') { throw 'Candidate 0021 must not widen the function search path.' }
  $enquiryMigration = @($migrations | Where-Object Name -EQ '0022_public_trainer_enquiries.sql')
  if ($enquiryMigration.Count -ne 1) { throw 'Candidate repository chain requires exact 0022_public_trainer_enquiries.sql.' }
  $enquiryBytes = [IO.File]::ReadAllBytes($enquiryMigration[0].FullName)
  if ($enquiryBytes.Length -ge 3 -and $enquiryBytes[0] -eq 0xEF -and $enquiryBytes[1] -eq 0xBB -and $enquiryBytes[2] -eq 0xBF) { throw 'Candidate 0022 must be UTF-8 without BOM.' }
  [void][Text.UTF8Encoding]::new($false,$true).GetString($enquiryBytes)
  $retentionCorrection = @($migrations | Where-Object Name -EQ '0023_public_trainer_enquiry_retention_correction.sql')
  if ($retentionCorrection.Count -ne 1) { throw 'Candidate repository chain requires exact 0023_public_trainer_enquiry_retention_correction.sql.' }
  $retentionBytes = [IO.File]::ReadAllBytes($retentionCorrection[0].FullName)
  if ($retentionBytes.Length -ge 3 -and $retentionBytes[0] -eq 0xEF -and $retentionBytes[1] -eq 0xBB -and $retentionBytes[2] -eq 0xBF) { throw 'Candidate 0023 must be UTF-8 without BOM.' }
  $retentionSql = [Text.UTF8Encoding]::new($false,$true).GetString($retentionBytes)
  foreach ($marker in @(
    'alter column abuse_bucket_hash drop not null','on delete set null',"interval '2 hours'",
    'cleanup_trainer_enquiry_abuse_buckets','for update skip locked','prove_trainer_enquiry_retention',
    'trainer_enquiry_retention_status','trainer-enquiry-abuse-cleanup-hourly','5 * * * *',
    'revoke all on function','to service_role','Sprint 029O'
  )) { if ($retentionSql -notmatch [regex]::Escape($marker)) { throw "Candidate 0023 missing identity marker: $marker" } }
  $scoringMigration = @($migrations | Where-Object Name -EQ '0024_versioned_four_loss_biochemistry_scoring.sql')
  if ($scoringMigration.Count -ne 1) { throw 'Candidate repository chain requires exact 0024_versioned_four_loss_biochemistry_scoring.sql.' }
  $scoringBytes = [IO.File]::ReadAllBytes($scoringMigration[0].FullName)
  if ($scoringBytes.Length -ge 3 -and $scoringBytes[0] -eq 0xEF -and $scoringBytes[1] -eq 0xBB -and $scoringBytes[2] -eq 0xBF) { throw 'Candidate 0024 must be UTF-8 without BOM.' }
  $scoringSql = [Text.UTF8Encoding]::new($false,$true).GetString($scoringBytes)
  foreach ($marker in @(
    'Sprint 025C - versioned four-loss biochemistry scoring','validate_biochemistry_v2_scored_snapshot',
    "formula_version = 'biochemistry-score-v2'",'HORSE Energy Loss Version 3 no urea or age.xlsx',
    'on conflict (lookup_type, exact_reading, source_version) do update'
  )) { if ($scoringSql -notmatch [regex]::Escape($marker)) { throw "Candidate 0024 missing identity marker: $marker" } }
  $trendMigration = @($migrations | Where-Object Name -EQ '0025_user_trend_view_preferences.sql')
  if ($trendMigration.Count -ne 1) { throw 'Candidate repository chain requires exact 0025_user_trend_view_preferences.sql.' }
  $trendBytes = [IO.File]::ReadAllBytes($trendMigration[0].FullName)
  if ($trendBytes.Length -ge 3 -and $trendBytes[0] -eq 0xEF -and $trendBytes[1] -eq 0xBB -and $trendBytes[2] -eq 0xBF) { throw 'Candidate 0025 must be UTF-8 without BOM.' }
  $trendSql = [Text.UTF8Encoding]::new($false,$true).GetString($trendBytes)
  foreach ($marker in @(
    'Sprint 028B - self-only saved longitudinal trend view preferences','user_trend_view_preferences',
    'set_default_biochemistry_trend_preference','enable row level security',
    'idx_user_trend_view_preferences_one_default','to authenticated'
  )) { if ($trendSql -notmatch [regex]::Escape($marker)) { throw "Candidate 0025 missing identity marker: $marker" } }
  [pscustomobject]@{
    Migrations=$migrations
    Candidate=$parserCorrection[0]
    Head=$trendMigration[0]
    LocalOnlyVersions=@('0024','0025')
    RemoteStatusInspected=$false
    Diagnostic='Candidate repository migration chain is aligned locally through 0025; migrations 0024 and 0025 are local-only; no applied or remote status was inspected.'
  }
}
