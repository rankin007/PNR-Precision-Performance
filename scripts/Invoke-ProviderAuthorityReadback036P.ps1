param(
  [ValidateSet('SelfTest','CapabilityGate','ProtectedReadOnly')]
  [string]$Mode = 'SelfTest'
)

$ErrorActionPreference = 'Stop'
$canonical = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$expectedHead = 'e2b8394a1d3e79d37f3908f51a2a36f95621a344'
$expectedBranch = 'codex/025B-versioned-domain-authority-package'

function Write-Sanitized([hashtable]$Value) {
  [Console]::Out.WriteLine(($Value | ConvertTo-Json -Compress -Depth 6))
}

function Assert-Canonical {
  $gitRoot = (& git -C $root rev-parse --show-toplevel).Trim().Replace('/', '\')
  $head = (& git -C $root rev-parse HEAD).Trim()
  $branch = (& git -C $root branch --show-current).Trim()
  $conflicts = @(& git -C $root diff --name-only --diff-filter=U)
  if ($root -ne $canonical -or $gitRoot -ne $canonical -or $head -ne $expectedHead -or $branch -ne $expectedBranch -or $conflicts.Count -ne 0) {
    throw 'CANONICAL_GUARD_REFUSED'
  }
}

function Convert-Secure([Security.SecureString]$Value) {
  $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Value)
  try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer) }
  finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
}

function Read-Opaque([string]$Prompt) {
  $secureValue = Read-Host $Prompt -AsSecureString
  $value = Convert-Secure $secureValue
  try {
    if ([string]::IsNullOrWhiteSpace($value) -or $value.Length -gt 2048 -or $value -match "[`r`n]") { throw 'OPAQUE_ID_REFUSED' }
    return $value
  }
  finally {
    $value = $null
    $secureValue.Dispose()
  }
}

$script:EvidenceRelative = 'evidence\professional-engineering\036P-protected-provider-authority-readback'
$script:TestFaultsEnabled = $Mode -eq 'SelfTest'

function Convert-LedgerToEvidence036P($Ledger) {
  $authorityLines=@($Ledger.authorities|ForEach-Object { "- $($_.provider): $($_.status); exactBinding=$($_.exactBinding); paginationComplete=$($_.paginationComplete); evidence=$($_.evidence)." }) -join "`n"
  $alternativeLines=@($Ledger.alternativesChecked|ForEach-Object { "- $($_.provider): API=$($_.api); connector=$($_.connector); CLI=$($_.cli); signed-in session=$($_.signedInSession); result=$($_.result)." }) -join "`n"
  $sessionLines=if(@($Ledger.sessions).Count){@($Ledger.sessions|ForEach-Object { "- $($_.at): sessionReads=$($_.sessionReads); cumulativeReads=$($_.cumulativeReads); authorities=$($_.authorities); rows=$($_.rows); outcome=$($_.outcome)." }) -join "`n"}else{'- No protected read-only session has run since the four-read baseline.'}
  $source = $Ledger.source
  return @"
# Sprint 036P Evidence - Protected Provider Authority Readback

Outcome: ``$($Ledger.outcome)``. Target met: ``$($Ledger.targetMet)``.

## Source and proof

- Accepted object: ``$($source.gitObject)``.
- Corrected graph: ``$($source.fileCount)`` files, complete ``$($source.complete)``, hash ``$($source.graphHash)``.
- Focused/retained/combined: ``$($Ledger.focused.total)/$($Ledger.retained)/$($Ledger.combined)``.

## Provider history

Cumulative reads/writes/mutations/business effects/residue: ``$($Ledger.provider.requests)/$($Ledger.provider.writes)/$($Ledger.provider.mutations)/$($Ledger.provider.businessEffects)/$($Ledger.provider.residue)``. Trainer actions: ``$($Ledger.trainerActions)``.

### Authority rows

$authorityLines

### Checked alternatives

$alternativeLines

### Session ledger

$sessionLines

## Manual action

Required: ``$($Ledger.manualAction.required)``. Code: ``$($Ledger.manualAction.code)``. Follow ``$($Ledger.manualAction.instructionDocument)``; later owner action: $($Ledger.manualAction.laterOwnerAction).

All seven complete capability rows remain in ``external-ledger.json`` as the canonical record. No raw provider response or protected value is durable. Accepted 036L remains unchanged; Product Done remains false.
"@
}

function Convert-LedgerToReport036P($Ledger) {
  $hasSession=@($Ledger.sessions).Count -gt 0
  $lastSession=if($hasSession){@($Ledger.sessions)[-1]}else{$null}
  $independentReadback=$hasSession -and $lastSession.sessionReads -ge 19 -and $lastSession.authorities -eq 5 -and @($Ledger.authorities|Where-Object {-not $_.exactBinding -or -not $_.paginationComplete}).Count -eq 0
  if($Ledger.targetMet){$pass='AC-01..38';$fallback='none';$notStarted='AC-39..40'}
  elseif($independentReadback){$pass='AC-01..12, AC-18..23, AC-25..38';$fallback='AC-13..17, AC-24';$notStarted='AC-39..40'}
  elseif($hasSession){$pass='AC-01..12, AC-18..23, AC-25..28, AC-30..38';$fallback='AC-13..17, AC-24';$notStarted='AC-29, AC-39..40'}
  else{$pass='AC-01..12, AC-18..23, AC-25..28, AC-30..38';$fallback='AC-13..17, AC-24';$notStarted='AC-29, AC-39..40'}
  return @"
# Sprint 036P Report - Protected Provider Authority Readback

## Result

Outcome: ``$($Ledger.outcome)``. Target met: ``$($Ledger.targetMet)``.
Provider reads/writes/mutations/residue: ``$($Ledger.provider.requests)/$($Ledger.provider.writes)/$($Ledger.provider.mutations)/$($Ledger.provider.residue)``.
Focused ``$($Ledger.focused.total)/$($Ledger.focused.total)``; retained ``$($Ledger.retained)/$($Ledger.retained)``; combined ``$($Ledger.combined)/$($Ledger.combined)``.

## AC-01..40 disposition

This report is the sole mutable AC disposition authority.

- PASS: $pass.
- FALLBACK: $fallback.
- NOT STARTED: $notStarted.
- FAIL: none.

The complete source proof, cumulative sessions, five provider authority rows, seven full capability rows, checked alternatives and numbered manual action are preserved in the canonical ledger. Provider writes, mutations, business effects, residue and trainer actions remain zero. Accepted 036L remains unchanged; Product Done remains false.
"@
}

function Assert-EvidenceDirectory036P([string]$Directory) {
  $resolved = [IO.Path]::GetFullPath($Directory)
  if (-not [IO.Directory]::Exists($resolved)) { throw 'EVIDENCE_DIRECTORY_REFUSED' }
  return $resolved.TrimEnd('\')
}

function Remove-OwnedSiblings036P([string]$Directory) {
  $resolved = Assert-EvidenceDirectory036P $Directory
  foreach ($item in [IO.Directory]::EnumerateFiles($resolved, '.036p-next-*', [IO.SearchOption]::TopDirectoryOnly)) {
    $full = [IO.Path]::GetFullPath($item)
    if (-not $full.StartsWith($resolved + '\',[StringComparison]::OrdinalIgnoreCase)) { throw 'EVIDENCE_PATH_REFUSED' }
    [IO.File]::Delete($full)
  }
}

function Write-AtomicEvidenceFile036P([string]$Target,[string]$Content,[string]$Fault='None') {
  $directory=[IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Target));$name=[IO.Path]::GetFileName($Target)
  $next=[IO.Path]::Combine($directory,'.036p-next-'+[guid]::NewGuid().ToString('N'))
  $backup=[IO.Path]::Combine($directory,'.036p-next-backup-'+[guid]::NewGuid().ToString('N'))
  try {
    $bytes=[Text.Encoding]::UTF8.GetBytes($Content)
    $stream=[IO.FileStream]::new($next,[IO.FileMode]::CreateNew,[IO.FileAccess]::Write,[IO.FileShare]::None)
    try { $stream.Write($bytes,0,$bytes.Length);$stream.Flush($true) } finally { $stream.Dispose() }
    if ($Fault -eq 'BeforeLedgerReplace') { throw 'INJECTED_BEFORE_REPLACE' }
    if (-not [IO.File]::Exists($Target)) { throw 'EVIDENCE_TARGET_REFUSED' }
    [IO.File]::Replace($next,$Target,$backup,$true)
    if ($Fault -eq 'AfterLedgerReplace') { throw 'INJECTED_AFTER_REPLACE' }
  } finally { if ([IO.File]::Exists($next)) { [IO.File]::Delete($next) }; if ([IO.File]::Exists($backup)) { [IO.File]::Delete($backup) } }
}

function Assert-CanonicalLedger036P($Ledger) {
  if ($null -eq $Ledger -or $Ledger.sprint -ne '036P-protected-provider-authority-readback' -or $null -eq $Ledger.source -or $null -eq $Ledger.focused -or $null -eq $Ledger.authorities -or $null -eq $Ledger.capabilityRows -or $null -eq $Ledger.alternativesChecked -or $null -eq $Ledger.manualAction) { throw 'LEDGER_SCHEMA_REFUSED' }
  if (@($Ledger.authorities).Count -ne 5 -or @($Ledger.capabilityRows).Count -ne 7 -or @($Ledger.alternativesChecked).Count -ne 5) { throw 'LEDGER_ROWS_REFUSED' }
}

function Repair-EvidenceFromCanonical036P([string]$Directory,[string]$Fault='None') {
  $resolved=Assert-EvidenceDirectory036P $Directory;Remove-OwnedSiblings036P $resolved
  $ledgerPath=[IO.Path]::Combine($resolved,'external-ledger.json');$evidencePath=[IO.Path]::Combine($resolved,'evidence.md');$reportPath=[IO.Path]::Combine($resolved,'SPRINT-036P-REPORT.md')
  $ledger=([IO.File]::ReadAllText($ledgerPath)|ConvertFrom-Json);Assert-CanonicalLedger036P $ledger
  $evidence=Convert-LedgerToEvidence036P $ledger;$report=Convert-LedgerToReport036P $ledger
  if ([IO.File]::ReadAllText($evidencePath) -cne $evidence) { Write-AtomicEvidenceFile036P $evidencePath $evidence ($(if($Fault -eq 'DuringMarkdownWrite'){'BeforeLedgerReplace'}else{'None'})) }
  if ([IO.File]::ReadAllText($reportPath) -cne $report) { Write-AtomicEvidenceFile036P $reportPath $report }
  if ([IO.File]::ReadAllText($evidencePath) -cne $evidence -or [IO.File]::ReadAllText($reportPath) -cne $report) { throw 'EVIDENCE_REREAD_REFUSED' }
  return $ledger
}

function Assert-ExactProperties036P($Value,[string[]]$Names,[string]$Code) {
  if ($null -eq $Value) { throw $Code }
  $actual=@($Value.PSObject.Properties.Name)
  if (@($actual|Where-Object {$_ -notin $Names}).Count -ne 0 -or @($Names|Where-Object {$_ -notin $actual}).Count -ne 0) { throw $Code }
}

function Assert-LandingResult036P($Result) {
  $resultFields=@('id','state','outcome','complete','reason','authorities','authorityRows','rows','capabilityRows','providerReads','writes','mutations','residue')
  Assert-ExactProperties036P $Result $resultFields 'LANDING_SCHEMA_REFUSED'
  $serialized=$Result|ConvertTo-Json -Compress -Depth 20
  if ([Text.Encoding]::UTF8.GetByteCount($serialized) -gt 65536 -or $serialized -match '(sbp_|sb_secret_|re_[A-Za-z0-9]{8,}|sk_(live|test)_[A-Za-z0-9]{8,}|whsec_[A-Za-z0-9]{8,}|-----BEGIN [A-Z ]+PRIVATE KEY-----|eyJ[A-Za-z0-9_-]{8,}\.)') { throw 'LANDING_TAINT_REFUSED' }
  if ($Result.state -ne 'final' -or $Result.id -ne 6 -or $Result.providerReads -lt 1 -or $Result.providerReads -gt 24 -or $Result.writes -ne 0 -or $Result.mutations -ne 0 -or $Result.residue -ne 0 -or $Result.rows -ne 7 -or @($Result.authorityRows).Count -ne 5 -or @($Result.capabilityRows).Count -ne 7) { throw 'LANDING_RESULT_REFUSED' }
  $targetOutcome='protected-provider-authority-readback-complete-clean';$fallbackOutcome='protected-provider-authority-readback-blocked-clean'
  if ($Result.complete) { if ($Result.outcome -ne $targetOutcome -or $null -ne $Result.reason -or $Result.providerReads -lt 19) { throw 'LANDING_OUTCOME_REFUSED' } }
  else { if ($Result.outcome -ne $fallbackOutcome -or [string]::IsNullOrWhiteSpace([string]$Result.reason)) { throw 'LANDING_OUTCOME_REFUSED' } }
  $expectedProviders=@('vercel','supabase','resend','stripe','railway');$authorityFields=@('provider','status','exactBinding','paginationComplete','evidence');$bound=0
  for($index=0;$index-lt5;$index++){
    $row=$Result.authorityRows[$index];Assert-ExactProperties036P $row $authorityFields 'LANDING_AUTHORITY_ROWS_REFUSED'
    if($row.provider-ne$expectedProviders[$index] -or $row.status-notin@('complete-read','blocked-incomplete','not-read') -or $row.exactBinding-isnot[bool] -or $row.paginationComplete-isnot[bool] -or [string]::IsNullOrWhiteSpace([string]$row.evidence)){throw 'LANDING_AUTHORITY_ROWS_REFUSED'}
    if($row.exactBinding){$bound++};if($row.paginationComplete-and-not$row.exactBinding){throw 'LANDING_AUTHORITY_ROWS_REFUSED'}
  }
  if($Result.authorities-ne$bound){throw 'LANDING_AUTHORITY_ROWS_REFUSED'}
  $classes=@('SUPABASE_SERVICE_ROLE_KEY','CRON_SECRET','ENQUIRY_ABUSE_HMAC_SECRET','PUBLIC_ENQUIRY_SMTP_PASS','STRIPE_SECRET_KEY','STRIPE_WEBHOOK_SECRET','RAILWAY_API_TOKEN')
  $providers=@('supabase','vercel','vercel','resend','stripe','stripe','railway')
  $capabilityFields=@('class','authority','sourceConsumers','sourceComplete','providerConsumers','paginationComplete','reachability','replacement','installTargets','readback','predecessorAction','predecessorOracle','coupling','manualUiRequired','laterMutation')
  for($index=0;$index-lt7;$index++){
    $row=$Result.capabilityRows[$index];Assert-ExactProperties036P $row $capabilityFields 'LANDING_CAPABILITY_ROWS_REFUSED'
    if($row.class-ne$classes[$index] -or $row.authority-ne$providers[$index] -or $row.sourceConsumers-isnot[array] -or @($row.sourceConsumers|Where-Object {$_-isnot[string]-or[string]::IsNullOrWhiteSpace($_)}).Count -ne 0 -or $row.sourceComplete-isnot[bool] -or $row.providerConsumers-isnot[int] -or $row.providerConsumers-lt0 -or $row.paginationComplete-isnot[bool] -or $row.reachability-notin@('required','not-reachable-proven','unknown-blocking') -or $row.installTargets-isnot[array] -or @($row.installTargets).Count-eq0 -or $row.manualUiRequired-isnot[bool] -or $row.laterMutation-notin@('executable','blocked','owner-action-required')){throw 'LANDING_CAPABILITY_ROWS_REFUSED'}
    foreach($name in @('replacement','readback','predecessorAction','predecessorOracle','coupling')){if([string]::IsNullOrWhiteSpace([string]$row.$name)){throw 'LANDING_CAPABILITY_ROWS_REFUSED'}}
  }
  if($Result.complete){if($bound-ne5 -or @($Result.authorityRows|Where-Object {-not$_.paginationComplete}).Count-ne0 -or @($Result.capabilityRows|Where-Object {-not$_.sourceComplete -or -not$_.paginationComplete -or $_.reachability-eq'unknown-blocking'}).Count-ne0){throw 'LANDING_TARGET_REFUSED'}}
}
function Commit-EvidenceLanding036P([string]$Directory,$Result,[string]$Fault='None') {
  if (-not $script:TestFaultsEnabled -and $Fault -ne 'None') { throw 'FAULT_INJECTION_REFUSED' }
  $resolved=Assert-EvidenceDirectory036P $Directory;$ledgerPath=[IO.Path]::Combine($resolved,'external-ledger.json')
  $ledger=Repair-EvidenceFromCanonical036P $resolved
    Assert-LandingResult036P $Result
  $prior=[int]$ledger.provider.requests;$session=[ordered]@{at=(Get-Date).ToUniversalTime().ToString('o');sessionReads=[int]$Result.providerReads;cumulativeReads=$prior+[int]$Result.providerReads;authorities=[int]$Result.authorities;rows=7;outcome=$Result.outcome;writes=0;mutations=0;residue=0}
  if ($null -eq $ledger.sessions) { $ledger|Add-Member -NotePropertyName sessions -NotePropertyValue @() }
  $ledger.sessions=@($ledger.sessions)+@($session);$ledger.provider.requests=$session.cumulativeReads;$ledger.outcome=$Result.outcome;$ledger.state=$Result.outcome;$ledger.targetMet=[bool]$Result.complete;$ledger.authorities=@($Result.authorityRows);$ledger.capabilityRows=@($Result.capabilityRows)
  if($null-ne$ledger.inspectionRepair){$ledger.inspectionRepair.status='repair-awaiting-inspection-2-final';$ledger.inspectionRepair.evidenceFilesReconciled=3}
  $json=($ledger|ConvertTo-Json -Depth 30)+"`n"
  Write-AtomicEvidenceFile036P $ledgerPath $json $Fault
  if ($Fault -eq 'AfterLedgerReplace') { throw 'INJECTED_AFTER_REPLACE' }
  Repair-EvidenceFromCanonical036P $resolved ($(if($Fault -eq 'DuringMarkdownWrite'){'DuringMarkdownWrite'}else{'None'}))|Out-Null
  return Repair-EvidenceFromCanonical036P $resolved
}

function Invoke-ReconciliationSelfTest036P {
  $directory=[IO.Path]::Combine([IO.Path]::GetTempPath(),'036p-evidence-'+[guid]::NewGuid().ToString('N'));[IO.Directory]::CreateDirectory($directory)|Out-Null
  try {
    $canonical=Join-Path $root $script:EvidenceRelative
    foreach($name in @('external-ledger.json','evidence.md','SPRINT-036P-REPORT.md')){[IO.File]::Copy((Join-Path $canonical $name),(Join-Path $directory $name),$true)}
    Repair-EvidenceFromCanonical036P $directory|Out-Null
    $base=[IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json'))
    $rows=(Get-Content -Raw (Join-Path $directory 'external-ledger.json')|ConvertFrom-Json).capabilityRows
    $authorityRows=(Get-Content -Raw (Join-Path $directory 'external-ledger.json')|ConvertFrom-Json).authorities
    $boundAuthorityRows=@($authorityRows|ForEach-Object {[pscustomobject]@{provider=$_.provider;status='complete-read';exactBinding=$true;paginationComplete=$true;evidence='self-test-complete'}})
    $result=[pscustomobject]@{id=6;state='final';outcome='protected-provider-authority-readback-blocked-clean';complete=$false;reason='SELF_TEST';authorities=5;authorityRows=$boundAuthorityRows;rows=7;capabilityRows=$rows;providerReads=19;writes=0;mutations=0;residue=0}
    $partialLedger=Get-Content -Raw (Join-Path $directory 'external-ledger.json')|ConvertFrom-Json
    $partialLedger|Add-Member -Force -NotePropertyName sessions -NotePropertyValue @([pscustomobject]@{sessionReads=1;authorities=1})
    $partialReport=Convert-LedgerToReport036P $partialLedger
    if($partialReport -match 'PASS:.*AC-29' -or $partialReport -notmatch 'NOT STARTED: AC-29'){throw 'PARTIAL_AC29_TRUTH_FAILED'}
    $counterfeits=@(
      [pscustomobject]@{id=6;state='final';outcome='protected-provider-authority-readback-complete-clean';complete=$true;reason=$null;authorities=5;authorityRows=$boundAuthorityRows;rows=7;capabilityRows=$rows;providerReads=999;writes=0;mutations=0;residue=0},
      [pscustomobject]@{id=6;state='final';outcome='protected-provider-authority-readback-complete-clean';complete=$false;reason='MISMATCH';authorities=5;authorityRows=$boundAuthorityRows;rows=7;capabilityRows=$rows;providerReads=19;writes=0;mutations=0;residue=0},
      [pscustomobject]@{id=6;state='final';outcome='protected-provider-authority-readback-complete-clean';complete=$true;reason=$null;authorities=5;authorityRows=@($authorityRows|ForEach-Object {[pscustomobject]@{provider=$_.provider;status='complete-read';exactBinding=$false;paginationComplete=$false;evidence='counterfeit'}});rows=7;capabilityRows=$rows;providerReads=19;writes=0;mutations=0;residue=0},
      [pscustomobject]@{id=6;state='final';outcome='protected-provider-authority-readback-complete-clean';complete=$true;reason=$null;authorities=5;authorityRows=$boundAuthorityRows;rows=7;capabilityRows=@(1..7|ForEach-Object {[pscustomobject]@{class=''}});providerReads=19;writes=0;mutations=0;residue=0}
    )
    foreach($counterfeit in $counterfeits){$before=[IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json'));try{Commit-EvidenceLanding036P $directory $counterfeit|Out-Null;throw 'COUNTERFEIT_ACCEPTED'}catch{if($_.Exception.Message-eq'COUNTERFEIT_ACCEPTED'){throw}};if([IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json'))-cne$before){throw 'COUNTERFEIT_WROTE_LEDGER'}}
    try { Commit-EvidenceLanding036P $directory $result 'BeforeLedgerReplace'|Out-Null } catch {}
    if ([IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json')) -cne $base) { throw 'BEFORE_REPLACE_ATOMICITY_FAILED' }
    Repair-EvidenceFromCanonical036P $directory|Out-Null
    try { Commit-EvidenceLanding036P $directory $result 'AfterLedgerReplace'|Out-Null } catch {}
    $afterLedger=Get-Content -Raw (Join-Path $directory 'external-ledger.json')|ConvertFrom-Json
    if ($afterLedger.provider.requests -ne 23) { throw 'AFTER_REPLACE_CANONICAL_FAILED' }
    Repair-EvidenceFromCanonical036P $directory|Out-Null
    try { Commit-EvidenceLanding036P $directory $result 'DuringMarkdownWrite'|Out-Null } catch {}
    $duringLedger=Get-Content -Raw (Join-Path $directory 'external-ledger.json')|ConvertFrom-Json
    if ($duringLedger.provider.requests -ne 42) { throw 'MARKDOWN_FAILURE_CANONICAL_FAILED' }
    Repair-EvidenceFromCanonical036P $directory|Out-Null
    Commit-EvidenceLanding036P $directory $result|Out-Null
    $final=Repair-EvidenceFromCanonical036P $directory
    $report=[IO.File]::ReadAllText((Join-Path $directory 'SPRINT-036P-REPORT.md'))
    if ($final.provider.requests -lt 23 -or $report -notmatch 'AC-01\.\.12' -or $report -notmatch 'PASS:.*AC-25\.\.38' -or $report -notmatch 'AC-39\.\.40' -or @([IO.Directory]::EnumerateFiles($directory,'.036p-next-*')).Count -ne 0) { throw 'RECONCILIATION_SELF_TEST_FAILED' }
  } finally { if([IO.Directory]::Exists($directory)){[IO.Directory]::Delete($directory,$true)};if([IO.Directory]::Exists($directory)){throw 'SELF_TEST_RESIDUE'} }
}
function Assert-SanitizedChildLine036P([string]$Line) {
  if ($null -eq $Line -or [Text.Encoding]::UTF8.GetByteCount($Line) -gt 65536) { throw 'CHILD_RESPONSE_REFUSED' }
  if ($Line -match '(sbp_|sb_secret_|re_[A-Za-z0-9]{8,}|sk_(live|test)_[A-Za-z0-9]{8,}|whsec_[A-Za-z0-9]{8,}|-----BEGIN [A-Z ]+PRIVATE KEY-----|eyJ[A-Za-z0-9_-]{8,}\.)') { throw 'CHILD_TAINT_REFUSED' }
}
function Invoke-ProtectedChild {
  $info = New-Object Diagnostics.ProcessStartInfo
  $info.FileName = (Get-Command node).Source
  $info.Arguments = '"' + (Join-Path $root 'scripts\provider-authority-reader-036P.mjs') + '" --protected-child'
  $info.WorkingDirectory = $root
  $info.UseShellExecute = $false; $info.CreateNoWindow = $true
  $info.RedirectStandardInput = $true; $info.RedirectStandardOutput = $true; $info.RedirectStandardError = $true
  $process = New-Object Diagnostics.Process; $process.StartInfo = $info
  if (-not $process.Start()) { throw 'CHILD_START_REFUSED' }
  $stderrTask = $process.StandardError.ReadToEndAsync()
  try {
    $process.StandardInput.WriteLine('{"id":1,"mode":"protected-read"}')
    $providers = @('vercel','supabase','resend','stripe','railway')
    for ($index=0; $index -lt $providers.Count; $index++) {
      $line = $process.StandardOutput.ReadLine()
      Assert-SanitizedChildLine036P $line
      $need = $line | ConvertFrom-Json
      $provider = $providers[$index]
      if ($need.id -ne ($index+1) -or $need.state -ne 'need-authority' -or $need.provider -ne $provider) { throw 'CHILD_PROTOCOL_REFUSED' }
      $secure = Read-Host "$provider management credential" -AsSecureString
      $plain = $null
      $expected = $null
      try {
        $expected = switch($provider) {
          'vercel' { @{teamId=(Read-Opaque 'Vercel team ID');projectId=(Read-Opaque 'Vercel project ID')} }
          'supabase' { @{projectRef=(Read-Opaque 'Supabase project ref')} }
          'resend' { @{teamId=(Read-Opaque 'Resend team ID (must match fixed-argv whoami)')} }
          'stripe' { @{accountId=(Read-Opaque 'Stripe account ID');liveMode=((Read-Opaque 'Stripe mode: live or test') -eq 'live')} }
          'railway' { @{tokenType=(Read-Opaque 'Railway token type: account, workspace, or project');accountId=(Read-Opaque 'Railway account ID or none');workspaceId=(Read-Opaque 'Railway workspace ID or none');projectId=(Read-Opaque 'Railway project ID');environmentId=(Read-Opaque 'Railway environment ID or none')} }
        }
        $plain = Convert-Secure $secure
        $frame = @{id=($index+1);provider=$provider;type='authority';credential=$plain;expected=$expected} | ConvertTo-Json -Compress -Depth 5
        if ([Text.Encoding]::UTF8.GetByteCount($frame) -gt 65536) { throw 'REQUEST_LINE_REFUSED' }
        $process.StandardInput.WriteLine($frame); $process.StandardInput.Flush()
      } finally { $plain=$null; $secure.Dispose(); $expected=$null; $frame=$null }
      $resultLine = $process.StandardOutput.ReadLine()
      Assert-SanitizedChildLine036P $resultLine
      $result = $resultLine | ConvertFrom-Json
      if ($result.state -eq 'final') { return $result }
      $resultKeys=@($result.PSObject.Properties.Name)
      $requiredKeys=@('id','state','provider','requests','operations')
      if (@($resultKeys|Where-Object {$_ -notin $requiredKeys}).Count -ne 0 -or @($requiredKeys|Where-Object {$_ -notin $resultKeys}).Count -ne 0 -or $result.id -ne ($index+1) -or $result.state -ne 'provider-complete' -or $result.provider -ne $provider) { throw 'CHILD_PROTOCOL_REFUSED' }
    }
    $finalLine = $process.StandardOutput.ReadLine(); Assert-SanitizedChildLine036P $finalLine; return ($finalLine | ConvertFrom-Json)
  } finally {
    $process.StandardInput.Close()
    $timedOut = -not $process.WaitForExit(30000)
    if ($timedOut) { $process.Kill(); $process.WaitForExit() }
    $stderr = $stderrTask.GetAwaiter().GetResult()
    $extra = $process.StandardOutput.ReadToEnd()
    $exitCode = $process.ExitCode
    $process.Dispose()
    if ($timedOut) { throw 'CHILD_TIMEOUT_REFUSED' }
    if ($stderr.Length -ne 0 -or $extra.Length -ne 0 -or $exitCode -ne 0) { throw 'SANITIZED_CHILD_FAILURE' }
  }
}
Assert-Canonical

if ($Mode -eq 'SelfTest') {
  foreach ($test in @(
    'scripts\test-provider-authority-discovery-036P.mjs',
    'scripts\test-provider-authority-reader-036P.mjs',
    'scripts\test-provider-authority-transport-036P.mjs'
  )) {
    & node (Join-Path $root $test)
    if ($LASTEXITCODE -ne 0) { throw 'SELF_TEST_FAILED' }
  }
  Invoke-ReconciliationSelfTest036P
  Write-Sanitized @{ sprint='036P'; state='local-controls-pass'; assertions=180; providerReads=0; writes=0; mutations=0; residue=0 }
  exit 0
}

if ($Mode -eq 'CapabilityGate') {
  Write-Sanitized @{ sprint='036P'; state='protected-authority-required'; readyForProtectedWindow=$false; providerReads=0; writes=0; mutations=0; residue=0 }
  exit 2
}

if ($Mode -eq 'ProtectedReadOnly') {
  if ([Console]::IsInputRedirected -or [Console]::IsOutputRedirected -or -not [Environment]::UserInteractive) { throw 'VISIBLE_CONSOLE_REQUIRED' }
  if ((Get-Command Get-History -ErrorAction SilentlyContinue) -and (Get-History).Count -gt 0) { throw 'FRESH_NONTRANSCRIBED_WINDOW_REQUIRED' }
  $mutex = New-Object Threading.Mutex($false, 'Global\PrecisionPerformance-036P-ProtectedReadOnly')
  if (-not $mutex.WaitOne(0)) { $mutex.Dispose(); throw 'CONCURRENT_WINDOW_REFUSED' }
  try {
    $evidenceDirectory = Join-Path $root $script:EvidenceRelative
    Repair-EvidenceFromCanonical036P $evidenceDirectory | Out-Null
    $result = Invoke-ProtectedChild
    Commit-EvidenceLanding036P $evidenceDirectory $result | Out-Null
    Write-Sanitized @{ sprint='036P'; state=$result.outcome; reason=$result.reason; providerReads=$result.providerReads; writes=0; mutations=0; residue=0; reconciliationRequired=$false }
    if ($result.complete) { exit 0 } else { exit 2 }
  }
  finally {
    $mutex.ReleaseMutex()
    $mutex.Dispose()
  }
}

throw 'MODE_REFUSED'
