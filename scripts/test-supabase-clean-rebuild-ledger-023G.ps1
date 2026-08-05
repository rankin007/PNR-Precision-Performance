$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'lib\migration-ledger-validation.ps1')
$root = Join-Path ([IO.Path]::GetTempPath()) ('023g-ledger-'+[guid]::NewGuid().ToString('N'))
$utf8=[Text.UTF8Encoding]::new($false,$true)
$markers=@('legacy inventory requires governed remediation','update public.biochemistry_test_uploads','biochemistry_test_uploads_file_category_check','biochemistry_test_uploads_size_bytes_check','legacy_unverified','uploads_test_horse_stable_fk','version_group_id','validate_evidence_lineage','evidence_upload_attempts','evidence_csv_registry','evidence_holds','evidence_audit_events','pg_advisory_xact_lock','enable row level security','revoke insert, update, delete')
function New-Case([string]$Name) {
  $dir=Join-Path $root $Name; New-Item -ItemType Directory -Path $dir|Out-Null
  1..17|ForEach-Object{[IO.File]::WriteAllText((Join-Path $dir ('{0:D4}_synthetic.sql'-f $_)),'select 1;',$utf8)}
  [IO.File]::WriteAllText((Join-Path $dir '0018_test_evidence_upload_and_storage.sql'),($markers -join "`n"),$utf8)
  $completion=@('initiate_test_evidence_upload','mutate_test_evidence_lifecycle','reconcile_test_evidence_batch','test-evidence','test_evidence_exact_intent_insert','can_insert_test_evidence_object',"array['image/jpeg','image/png','application/pdf']",'evidence.purge','safety_services_unavailable','revoke all on function','to service_role','complete_test_evidence_purge','complete_test_evidence_compensation','object_absence_verified')
  [IO.File]::WriteAllText((Join-Path $dir '0019_test_evidence_remote_contract_completion.sql'),($completion -join "`n"),$utf8)
  $correction=@('initiate_test_evidence_upload','extensions.digest(p_idempotency_key','set search_path = pg_catalog, public',"to_regprocedure('extensions.digest(text,text)')",'required pgcrypto dependency unavailable','revoke all on function','to authenticated','Sprint 023O additive pgcrypto resolution')
  [IO.File]::WriteAllText((Join-Path $dir '0020_schema_qualified_pgcrypto_initiation.sql'),($correction -join "`n"),$utf8)
  $parser=@('initiate_test_evidence_upload',"substring(normal_name from '\.([A-Za-z0-9]+)$')",'extensions.digest(p_idempotency_key','set search_path = pg_catalog, public',"to_regprocedure('extensions.digest(text,text)')",'revoke all on function','to authenticated','Sprint 023P additive PostgreSQL filename extension parser correction')
  [IO.File]::WriteAllText((Join-Path $dir '0021_postgresql_filename_extension_parser_correction.sql'),($parser -join "`n"),$utf8)
  [IO.File]::WriteAllText((Join-Path $dir '0022_public_trainer_enquiries.sql'),'select 1;',$utf8)
  $retention=@('alter column abuse_bucket_hash drop not null','on delete set null',"interval '2 hours'",'cleanup_trainer_enquiry_abuse_buckets','for update skip locked','prove_trainer_enquiry_retention','trainer_enquiry_retention_status','trainer-enquiry-abuse-cleanup-hourly','5 * * * *','revoke all on function','to service_role','Sprint 029O')
  [IO.File]::WriteAllText((Join-Path $dir '0023_public_trainer_enquiry_retention_correction.sql'),($retention -join "`n"),$utf8); $dir
}
function Must-Fail([scriptblock]$Action,[string]$Name){try{&$Action|Out-Null;throw "$Name accepted"}catch{if($_.Exception.Message -eq "$Name accepted"){throw}}}
$passed=0
function Pass { $script:passed++ }
try {
  New-Item -ItemType Directory -Path $root|Out-Null
  $valid=New-Case valid; $result=Test-CandidateMigrationLedger $valid
  if($result.Migrations.Count-ne 23){throw 'valid migration count failed'}; Pass
  if($result.Diagnostic-notmatch 'aligned through 0023'){throw 'valid repository diagnostic failed'}; Pass
  if($result.Diagnostic-notmatch 'no applied or remote status was inspected' -or $result.Diagnostic-match '(?i)applied successfully|remote applied'){throw 'remote-status diagnostic failed'}; Pass
  $missing=New-Case missing; Get-ChildItem $missing -Filter '0023*'|Remove-Item; Must-Fail {Test-CandidateMigrationLedger $missing} missing; Pass
  $gap=New-Case gap; Get-ChildItem $gap -Filter '0007*'|Remove-Item; Must-Fail {Test-CandidateMigrationLedger $gap} gap; Pass
  $dup=New-Case duplicate; [IO.File]::WriteAllText((Join-Path $dup '0007_duplicate.sql'),'select 1;',$utf8); Must-Fail {Test-CandidateMigrationLedger $dup} duplicate; Pass
  $renamed=New-Case renamed; Get-ChildItem $renamed -Filter '0021*'|Rename-Item -NewName '0021_other.sql'; Must-Fail {Test-CandidateMigrationLedger $renamed} renamed; Pass
  $empty=New-Case empty; [IO.File]::WriteAllText((Join-Path $empty '0021_postgresql_filename_extension_parser_correction.sql'),'',$utf8); Must-Fail {Test-CandidateMigrationLedger $empty} placeholder; Pass
  $future=New-Case future; [IO.File]::WriteAllText((Join-Path $future '0024_future.sql'),'select 1;',$utf8); Must-Fail {Test-CandidateMigrationLedger $future} future; Pass
  $malformed=New-Case malformed; [IO.File]::WriteAllText((Join-Path $malformed '019_bad.sql'),'select 1;',$utf8); Must-Fail {Test-CandidateMigrationLedger $malformed} malformed; Pass
  $unrelated=New-Case unrelated; [IO.File]::WriteAllText((Join-Path $unrelated 'README.sql'),'notes',$utf8); if((Test-CandidateMigrationLedger $unrelated).Migrations.Count-ne 23){throw 'unrelated file affected ledger'}; Pass
  $bom=New-Case bom; $bomPath=Join-Path $bom '0022_public_trainer_enquiries.sql'; $bomBody=[Text.Encoding]::UTF8.GetBytes('select 1;'); [IO.File]::WriteAllBytes($bomPath,([byte[]](0xEF,0xBB,0xBF)+$bomBody)); Must-Fail {Test-CandidateMigrationLedger $bom} bom; Pass
} finally { if(Test-Path $root){Remove-Item -LiteralPath $root -Recurse -Force} }
if(Test-Path $root){throw 'Temporary ledger tests were not cleaned.'}
Pass
if($passed-ne 13){throw "Expected 13 ledger assertions, received $passed."}
"Sprint 023G candidate ledger adversarial tests passed ($passed/13)."
