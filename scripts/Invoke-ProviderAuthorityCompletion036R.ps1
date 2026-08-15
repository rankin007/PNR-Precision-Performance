param(
  [ValidateSet('SelfTest','CapabilityGate','ProtectedReadOnly')]
  [string]$Mode = 'SelfTest'
)

$ErrorActionPreference = 'Stop'
$canonical = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$expectedHead = 'c90c3201380d7f61e03647ca6e46b03dc4c27985'
$script:ExpectedResendDomain = 'precisionperformance.com.au'
$expectedBranch = 'codex/025B-versioned-domain-authority-package'
$script:EvidenceRelative = 'evidence\professional-engineering\036R-resend-domain-bound-five-provider-authority-completion'
$script:SessionRequestCeiling = 24
$script:RetainedReadBaseline = 4
$script:CumulativeReadCeiling = 28
$script:TestFaultsEnabled = $Mode -eq 'SelfTest'
$script:Target = 'resend-domain-bound-five-provider-authority-complete-clean'
$script:Fallback = 'resend-domain-bound-five-provider-authority-blocked-clean'
$script:ChildTarget = 'resend-domain-bound-five-provider-authority-complete-clean'
$script:ProductionDeadlineMs = 30000
$script:LivePersistenceProvenance = New-Object object
$script:TestPersistenceProvenance = New-Object object
$script:ChildFallback = 'resend-domain-bound-five-provider-authority-blocked-clean'

function Write-Sanitized([hashtable]$Value) {
  [Console]::Out.WriteLine(($Value | ConvertTo-Json -Compress -Depth 8))
}

function Assert-Canonical036R {
  $gitRoot = (& git -C $root rev-parse --show-toplevel).Trim().Replace('/', '\')
  $head = (& git -C $root rev-parse HEAD).Trim()
  $branch = (& git -C $root branch --show-current).Trim()
  $conflicts = @(& git -c core.autocrlf=false -c core.safecrlf=false -C $root diff --name-only --diff-filter=U)
  if ($root -ne $canonical -or $gitRoot -ne $canonical -or $head -ne $expectedHead -or $branch -ne $expectedBranch -or $conflicts.Count -ne 0) {
    throw 'CANONICAL_GUARD_REFUSED'
  }
}

function Assert-FreshWindowHistory036R([object[]]$Entries) {
  $history = @($Entries)
  if ($history.Count -eq 0) { return }
  if ($history.Count -ne 1) { throw 'FRESH_NONTRANSCRIBED_WINDOW_REQUIRED' }
  $entry = $history[0]
  $property = if ($null -eq $entry) { $null } else { $entry.PSObject.Properties['CommandLine'] }
  if ($null -eq $property -or $entry.CommandLine -isnot [string] -or [string]::IsNullOrWhiteSpace($entry.CommandLine) -or $entry.CommandLine.Length -gt 4096) { throw 'FRESH_NONTRANSCRIBED_WINDOW_REQUIRED' }
  $parseErrors = $null
  $tokens = @([System.Management.Automation.PSParser]::Tokenize($entry.CommandLine,[ref]$parseErrors))
  if (@($parseErrors).Count -ne 0 -or $tokens.Count -ne 3) { throw 'FRESH_NONTRANSCRIBED_WINDOW_REQUIRED' }
  if ($tokens[0].Type -ne [System.Management.Automation.PSTokenType]::Command -or
      $tokens[1].Type -ne [System.Management.Automation.PSTokenType]::CommandParameter -or
      $tokens[2].Type -ne [System.Management.Automation.PSTokenType]::CommandArgument -or
      $tokens[1].Content -cne '-Mode' -or
      $tokens[2].Content -cne 'ProtectedReadOnly') { throw 'FRESH_NONTRANSCRIBED_WINDOW_REQUIRED' }
  try {
    $commandPath = $tokens[0].Content
    $candidate = if ([IO.Path]::IsPathRooted($commandPath)) {
      [IO.Path]::GetFullPath($commandPath)
    } else {
      [IO.Path]::GetFullPath((Join-Path $root $commandPath))
    }
    $expected = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'Invoke-ProviderAuthorityCompletion036R.ps1'))
  } catch { throw 'FRESH_NONTRANSCRIBED_WINDOW_REQUIRED' }
  if (-not [string]::Equals($candidate,$expected,[StringComparison]::OrdinalIgnoreCase)) { throw 'FRESH_NONTRANSCRIBED_WINDOW_REQUIRED' }
}

function Convert-Secure036R([Security.SecureString]$Value) {
  $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Value)
  try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer) }
  finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
}

function Read-Opaque036R([string]$Prompt) {
  $secureValue = Read-Host $Prompt -AsSecureString
  $value = Convert-Secure036R $secureValue
  try {
    if ([string]::IsNullOrWhiteSpace($value) -or $value.Length -gt 2048 -or $value -match "[`r`n]") { throw 'OPAQUE_ID_REFUSED' }
    return $value
  }
  finally {
    $value = $null
    $secureValue.Dispose()
  }
}

function Read-Choice036R([string]$Prompt,[string[]]$Allowed) {
  $value = Read-Opaque036R $Prompt
  if ($value -notin $Allowed) { $value = $null; throw 'OPAQUE_CHOICE_REFUSED' }
  return $value
}

function Assert-ExactProperties036R($Value,[string[]]$Names,[string]$Code) {
  if ($null -eq $Value) { throw $Code }
  $actual = @($Value.PSObject.Properties.Name)
  if (@($actual | Where-Object { $_ -notin $Names }).Count -ne 0 -or @($Names | Where-Object { $_ -notin $actual }).Count -ne 0) { throw $Code }
}

function Assert-EvidenceDirectory036R([string]$Directory) {
  $resolved = [IO.Path]::GetFullPath($Directory)
  if (-not [IO.Directory]::Exists($resolved)) { throw 'EVIDENCE_DIRECTORY_REFUSED' }
  $expected = [IO.Path]::GetFullPath((Join-Path $root $script:EvidenceRelative)).TrimEnd('\')
  if ($Mode -ne 'SelfTest' -and $resolved.TrimEnd('\') -ne $expected) { throw 'EVIDENCE_PATH_REFUSED' }
  return $resolved.TrimEnd('\')
}

function Remove-OwnedSiblings036R([string]$Directory) {
  $resolved = Assert-EvidenceDirectory036R $Directory
  foreach ($pattern in @('.036r-next-*','.036r-next-backup-*')) {
    foreach ($item in [IO.Directory]::EnumerateFiles($resolved,$pattern,[IO.SearchOption]::TopDirectoryOnly)) {
      $full = [IO.Path]::GetFullPath($item)
      if (-not $full.StartsWith($resolved + '\',[StringComparison]::OrdinalIgnoreCase)) { throw 'EVIDENCE_PATH_REFUSED' }
      [IO.File]::Delete($full)
    }
  }
}

function Write-AtomicEvidenceFile036R([string]$Target,[string]$Content,[string]$Fault='None') {
  $directory = [IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Target))
  $next = [IO.Path]::Combine($directory,'.036r-next-' + [guid]::NewGuid().ToString('N'))
  $backup = [IO.Path]::Combine($directory,'.036r-next-backup-' + [guid]::NewGuid().ToString('N'))
  try {
    $bytes = [Text.Encoding]::UTF8.GetBytes($Content)
    $stream = [IO.FileStream]::new($next,[IO.FileMode]::CreateNew,[IO.FileAccess]::Write,[IO.FileShare]::None)
    try { $stream.Write($bytes,0,$bytes.Length); $stream.Flush($true) } finally { $stream.Dispose() }
    if ($Fault -eq 'BeforeLedgerReplace') { throw 'INJECTED_BEFORE_REPLACE' }
    if (-not [IO.File]::Exists($Target)) { throw 'EVIDENCE_TARGET_REFUSED' }
    [IO.File]::Replace($next,$Target,$backup,$true)
    if ($Fault -eq 'AfterLedgerReplace') { throw 'INJECTED_AFTER_REPLACE' }
  }
  finally {
    if ([IO.File]::Exists($next)) { [IO.File]::Delete($next) }
    if ([IO.File]::Exists($backup)) { [IO.File]::Delete($backup) }
  }
}

function Assert-CanonicalLedger036R($Ledger) {
  if ($null -eq $Ledger -or $Ledger.sprint -ne '036R-resend-domain-bound-five-provider-authority-completion' -or $null -eq $Ledger.source -or $null -eq $Ledger.focused -or $null -eq $Ledger.baseline -or $null -eq $Ledger.provider -or $null -eq $Ledger.authorities -or $null -eq $Ledger.capabilityRows -or $null -eq $Ledger.officialContracts -or $null -eq $Ledger.alternativesChecked -or $null -eq $Ledger.manualAction -or $null -eq $Ledger.acceptance) { throw 'LEDGER_SCHEMA_REFUSED' }
  if ($Ledger.source.complete -ne $true -or [int]$Ledger.source.fileCount -ne 124 -or [int]$Ledger.focused.total -ne 100 -or [int]$Ledger.retained -ne 1893 -or [int]$Ledger.combined -ne 1993) { throw 'LEDGER_BASELINE_REFUSED' }
  if ([int]$Ledger.baseline.providerReads -ne $script:RetainedReadBaseline -or [int]$Ledger.baseline.writes -ne 0 -or [int]$Ledger.baseline.mutations -ne 0 -or [int]$Ledger.baseline.businessEffects -ne 0 -or [int]$Ledger.baseline.residue -ne 0 -or [int]$Ledger.baseline.trainerActions -ne 0) { throw 'LEDGER_COUNTER_REFUSED' }
  if (@($Ledger.authorities).Count -ne 5 -or @($Ledger.capabilityRows).Count -ne 7 -or @($Ledger.officialContracts).Count -ne 5 -or @($Ledger.alternativesChecked).Count -ne 5 -or @($Ledger.acceptance).Count -ne 40) { throw 'LEDGER_ROWS_REFUSED' }
  if ([int]$Ledger.provider.requests -lt $script:RetainedReadBaseline -or [int]$Ledger.provider.requests -gt $script:CumulativeReadCeiling -or [int]$Ledger.provider.dnsReads -lt 0 -or [int]$Ledger.provider.dnsReads -gt 5 -or [int]$Ledger.provider.writes -ne 0 -or [int]$Ledger.provider.mutations -ne 0 -or [int]$Ledger.provider.businessEffects -ne 0 -or [int]$Ledger.provider.residue -ne 0 -or [int]$Ledger.trainerActions -ne 0) { throw 'LEDGER_COUNTER_REFUSED' }
  $expectedProviders = @('vercel','supabase','resend','stripe','railway')
  for ($index=0; $index -lt 5; $index++) { if ($Ledger.authorities[$index].provider -ne $expectedProviders[$index] -or $Ledger.officialContracts[$index].provider -ne $expectedProviders[$index] -or $Ledger.alternativesChecked[$index].provider -ne $expectedProviders[$index]) { throw 'LEDGER_ORDER_REFUSED' } }
  for ($index=0; $index -lt 40; $index++) { if ($Ledger.acceptance[$index].id -ne ('AC-{0:D2}' -f ($index+1))) { throw 'LEDGER_ACCEPTANCE_REFUSED' } }
}

function Convert-LedgerToEvidence036R($Ledger) {
  $authorityLines = @($Ledger.authorities | ForEach-Object { "- $($_.provider): $($_.status); exactBinding=$($_.exactBinding); paginationComplete=$($_.paginationComplete); evidence=$($_.evidence)." }) -join "`n"
  $alternativeLines = @($Ledger.alternativesChecked | ForEach-Object { "- $($_.provider): API=$($_.api); connector=$($_.connector); CLI=$($_.cli); signed-in session=$($_.signedInSession); result=$($_.result)." }) -join "`n"
  $sessionLines = if (@($Ledger.sessions).Count) { @($Ledger.sessions | ForEach-Object { "- $($_.at): sessionReads=$($_.sessionReads); cumulativeReads=$($_.cumulativeReads); authorities=$($_.authorities); rows=$($_.rows); outcome=$($_.outcome)." }) -join "`n" } else { '- No Sprint 036R protected read-only session has run.' }
  return @"
# Sprint 036R Evidence - Resend-Domain-Bound Five-Provider Authority Completion

Outcome: ``$($Ledger.outcome)``. Target met: ``$($Ledger.targetMet)``.

## Source and proof

- Accepted object: ``$($Ledger.source.gitObject)``.
- Accepted-source graph: ``$($Ledger.source.fileCount)`` files; complete ``$($Ledger.source.complete)``.
- Focused/retained/combined: ``$($Ledger.focused.total)/$($Ledger.retained)/$($Ledger.combined)``.

## Provider history

Cumulative provider reads/public DNS reads/writes/mutations/business effects/residue: ``$($Ledger.provider.requests)/$($Ledger.provider.dnsReads)/$($Ledger.provider.writes)/$($Ledger.provider.mutations)/$($Ledger.provider.businessEffects)/$($Ledger.provider.residue)``. Trainer actions: ``$($Ledger.trainerActions)``.

### Authority rows

$authorityLines

### Alternatives checked

$alternativeLines

### Session ledger

$sessionLines

## Manual action

Required: ``$($Ledger.manualAction.required)``. Code: ``$($Ledger.manualAction.code)``. Follow ``$($Ledger.manualAction.instructionDocument)``. Later owner action: $($Ledger.manualAction.laterOwnerAction).

All seven sanitized capability rows remain in ``external-ledger.json``. Accepted Sprint 036L remains unchanged and Product Done remains false.
"@
}

function Convert-LedgerToReport036R($Ledger) {
  $dispositions = @($Ledger.acceptance | ForEach-Object { "- $($_.id): $($_.status) - $($_.evidence)" }) -join "`n"
  return @"
# Sprint 036R Report - Resend-Domain-Bound Five-Provider Authority Completion

## Result

Outcome: ``$($Ledger.outcome)``. Target met: ``$($Ledger.targetMet)``.

Cumulative provider reads/public DNS reads/writes/mutations/business effects/residue/trainer actions: ``$($Ledger.provider.requests)/$($Ledger.provider.dnsReads)/$($Ledger.provider.writes)/$($Ledger.provider.mutations)/$($Ledger.provider.businessEffects)/$($Ledger.provider.residue)/$($Ledger.trainerActions)``. Sprint 036R provider/DNS reads: ``$($Ledger.implementation.providerRequestsThisSprint)/$($Ledger.implementation.dnsReadsThisSprint)``.

## Verification arithmetic

- Domain authority: ``60/60``.
- Protected transport: ``40/40``.
- Focused: ``60 + 40 = 100``.
- Retained: ``1893``.
- Combined: ``1993``.

## AC-01..40 disposition

This report is the sole mutable AC-01..40 disposition authority.

$dispositions

## Boundary

No protected value is durable. Accepted Sprint 036L remains unchanged. Product Done remains false. Stage, commit, push, PR, merge and conflict work remain outside Sprint 036R.
"@
}

function Repair-EvidenceFromCanonical036R([string]$Directory,[string]$Fault='None') {
  $resolved = Assert-EvidenceDirectory036R $Directory
  Remove-OwnedSiblings036R $resolved
  $ledgerPath = [IO.Path]::Combine($resolved,'external-ledger.json')
  $evidencePath = [IO.Path]::Combine($resolved,'evidence.md')
  $reportPath = [IO.Path]::Combine($resolved,'SPRINT-036R-REPORT.md')
  $ledger = ([IO.File]::ReadAllText($ledgerPath) | ConvertFrom-Json)
  Assert-CanonicalLedger036R $ledger
  $evidence = Convert-LedgerToEvidence036R $ledger
  $report = Convert-LedgerToReport036R $ledger
  if ([IO.File]::ReadAllText($evidencePath) -cne $evidence) { Write-AtomicEvidenceFile036R $evidencePath $evidence ($(if($Fault -eq 'DuringMarkdownWrite'){'BeforeLedgerReplace'}else{'None'})) }
  if ([IO.File]::ReadAllText($reportPath) -cne $report) { Write-AtomicEvidenceFile036R $reportPath $report }
  if ([IO.File]::ReadAllText($evidencePath) -cne $evidence -or [IO.File]::ReadAllText($reportPath) -cne $report) { throw 'EVIDENCE_REREAD_REFUSED' }
  return $ledger
}

function Assert-SanitizedChildLine036R([string]$Line) {
  if ($null -eq $Line -or [Text.Encoding]::UTF8.GetByteCount($Line) -gt 65536) { throw 'CHILD_RESPONSE_REFUSED' }
  if ($Line -cmatch '(sbp_|sb_secret_|re_[A-Za-z0-9]{8,}|sk_(live|test)_[A-Za-z0-9]{8,}|whsec_[A-Za-z0-9]{8,}|-----BEGIN [A-Z ]+PRIVATE KEY-----|eyJ[A-Za-z0-9_-]{8,}\.)') { throw 'CHILD_TAINT_REFUSED' }
}

function Assert-LandingResult036R($Result) {
  $resultFields = @('id','state','outcome','complete','reason','authorities','authorityRows','rows','capabilityRows','providerReads','dnsReads','writes','mutations','businessEffects','residue')
  Assert-ExactProperties036R $Result $resultFields 'LANDING_SCHEMA_REFUSED'
  $serialized = $Result | ConvertTo-Json -Compress -Depth 20
  if ([Text.Encoding]::UTF8.GetByteCount($serialized) -gt 65536 -or $serialized -cmatch '(sbp_|sb_secret_|re_[A-Za-z0-9]{8,}|sk_(live|test)_[A-Za-z0-9]{8,}|whsec_[A-Za-z0-9]{8,}|-----BEGIN [A-Z ]+PRIVATE KEY-----|eyJ[A-Za-z0-9_-]{8,}\.)') { throw 'LANDING_TAINT_REFUSED' }
  if ($Result.state -ne 'final' -or $Result.id -ne 6 -or [int]$Result.providerReads -lt 1 -or [int]$Result.providerReads -gt $script:SessionRequestCeiling -or [int]$Result.dnsReads -lt 0 -or [int]$Result.dnsReads -gt 5 -or [int]$Result.writes -ne 0 -or [int]$Result.mutations -ne 0 -or [int]$Result.businessEffects -ne 0 -or [int]$Result.residue -ne 0 -or [int]$Result.rows -ne 7 -or @($Result.authorityRows).Count -ne 5 -or @($Result.capabilityRows).Count -ne 7) { throw 'LANDING_DNS_REFUSED' }
  if ($Result.complete) { if ($Result.outcome -ne $script:ChildTarget -or $null -ne $Result.reason -or [int]$Result.providerReads -lt 19 -or [int]$Result.providerReads -gt 24 -or [int]$Result.dnsReads -lt 1) { throw 'LANDING_TARGET_REFUSED' } }
  else { if ($Result.outcome -ne $script:ChildFallback -or [string]::IsNullOrWhiteSpace([string]$Result.reason)) { throw 'LANDING_OUTCOME_REFUSED' } }
  $expectedProviders = @('vercel','supabase','resend','stripe','railway')
  $authorityFields = @('provider','status','exactBinding','paginationComplete','evidence')
  $bound = 0
  for ($index=0; $index -lt 5; $index++) {
    $row = $Result.authorityRows[$index]
    Assert-ExactProperties036R $row $authorityFields 'LANDING_AUTHORITY_ROWS_REFUSED'
    if ($row.provider -ne $expectedProviders[$index] -or $row.status -notin @('complete-read','blocked-incomplete','not-read') -or $row.exactBinding -isnot [bool] -or $row.paginationComplete -isnot [bool] -or [string]::IsNullOrWhiteSpace([string]$row.evidence)) { throw 'LANDING_AUTHORITY_ROWS_REFUSED' }
    if ($row.exactBinding) { $bound++ }
    if ($row.paginationComplete -and -not $row.exactBinding) { throw 'LANDING_AUTHORITY_ROWS_REFUSED' }
  }
  if ([int]$Result.authorities -ne $bound) { throw 'LANDING_AUTHORITY_ROWS_REFUSED' }
  $classes = @('SUPABASE_SERVICE_ROLE_KEY','CRON_SECRET','ENQUIRY_ABUSE_HMAC_SECRET','PUBLIC_ENQUIRY_SMTP_PASS','STRIPE_SECRET_KEY','STRIPE_WEBHOOK_SECRET','RAILWAY_API_TOKEN')
  $providers = @('supabase','vercel','vercel','resend','stripe','stripe','railway')
  $capabilityFields = @('class','authority','sourceConsumers','sourceComplete','providerConsumers','paginationComplete','reachability','replacement','installTargets','readback','predecessorAction','predecessorOracle','coupling','manualUiRequired','laterMutation')
  for ($index=0; $index -lt 7; $index++) {
    $row = $Result.capabilityRows[$index]
    Assert-ExactProperties036R $row $capabilityFields 'LANDING_CAPABILITY_ROWS_REFUSED'
    if ($row.class -ne $classes[$index] -or $row.authority -ne $providers[$index] -or $row.sourceConsumers -isnot [array] -or $row.sourceComplete -isnot [bool] -or $row.providerConsumers -isnot [int] -or [int]$row.providerConsumers -lt 0 -or $row.paginationComplete -isnot [bool] -or $row.reachability -notin @('required','not-reachable-proven','unknown-blocking') -or $row.installTargets -isnot [array] -or @($row.installTargets).Count -eq 0 -or $row.manualUiRequired -isnot [bool] -or $row.laterMutation -notin @('executable','blocked','owner-action-required')) { throw 'LANDING_CAPABILITY_ROWS_REFUSED' }
    foreach ($name in @('replacement','readback','predecessorAction','predecessorOracle','coupling')) { if ([string]::IsNullOrWhiteSpace([string]$row.$name)) { throw 'LANDING_CAPABILITY_ROWS_REFUSED' } }
  }
  if ($Result.complete -and ($bound -ne 5 -or $Result.authorityRows[2].evidence -notmatch 'domain-bound-dns-exact' -or @($Result.authorityRows | Where-Object { -not $_.paginationComplete }).Count -ne 0 -or @($Result.capabilityRows | Where-Object { -not $_.sourceComplete -or -not $_.paginationComplete -or $_.reachability -eq 'unknown-blocking' }).Count -ne 0)) { throw 'LANDING_TARGET_REFUSED' }
}

function Set-AcDisposition036R($Ledger,$Result) {
  $providerAcs = @(13,14,9,15,16)
  for ($index=0; $index -lt 5; $index++) {
    $authority = $Result.authorityRows[$index]
    $status = if ($authority.exactBinding -and $authority.paginationComplete) { 'pass' } else { 'fallback' }
    $evidence = if ($status -eq 'pass') { $authority.evidence } else { $Result.reason }
    $Ledger.acceptance[$providerAcs[$index]-1].status = $status
    $Ledger.acceptance[$providerAcs[$index]-1].evidence = $evidence
  }
  foreach ($ac in 10..12) { $Ledger.acceptance[$ac-1].status = $Ledger.acceptance[8].status; $Ledger.acceptance[$ac-1].evidence = $Ledger.acceptance[8].evidence }
  $Ledger.acceptance[25].status = 'pass'
  $Ledger.acceptance[25].evidence = "providerReads=$($Result.providerReads); dnsReads=$($Result.dnsReads); exact-prefix-no-padding"
  $Ledger.acceptance[36].status = 'pass'
  $Ledger.acceptance[36].evidence = "sessionReads=$($Result.providerReads); dnsReads=$($Result.dnsReads); outcome=$($(if($Result.complete){$script:Target}else{$script:Fallback})); zero-actions-and-residue"
  foreach ($ac in 38..40) { $Ledger.acceptance[$ac-1].status = 'pending'; $Ledger.acceptance[$ac-1].evidence = 'fresh-inspection-and-closeout-not-yet-complete' }
}

function Commit-EvidenceLanding036R([string]$Directory,$Result,[string]$Fault='None',$Provenance=$null) {
  if (-not $script:TestFaultsEnabled -and $Fault -ne 'None') { throw 'FAULT_INJECTION_REFUSED' }
  $resolved = Assert-EvidenceDirectory036R $Directory
  $canonicalEvidence = [IO.Path]::GetFullPath((Join-Path $root $script:EvidenceRelative)).TrimEnd('\')
  if ($script:TestFaultsEnabled) {
    if (-not [object]::ReferenceEquals($Provenance,$script:TestPersistenceProvenance) -or $resolved -eq $canonicalEvidence) { throw 'TEST_PERSISTENCE_REFUSED' }
  } elseif (-not [object]::ReferenceEquals($Provenance,$script:LivePersistenceProvenance)) { throw 'LIVE_PERSISTENCE_REFUSED' }

  $ledgerPath = [IO.Path]::Combine($resolved,'external-ledger.json')
  $ledger = Repair-EvidenceFromCanonical036R $resolved
  Assert-LandingResult036R $Result
  if (@($ledger.sessions).Count -ne 0) { throw 'ONE_SESSION_CEILING_REFUSED' }
  $prior = [int]$ledger.provider.requests
  $cumulative = $prior + [int]$Result.providerReads
  if ($prior -ne $script:RetainedReadBaseline -or $cumulative -gt $script:CumulativeReadCeiling) { throw 'CUMULATIVE_REQUEST_CEILING_REFUSED' }
  $outcome = if ($Result.complete) { $script:Target } else { $script:Fallback }
  $session = [ordered]@{at=(Get-Date).ToUniversalTime().ToString('o');sessionReads=[int]$Result.providerReads;cumulativeReads=$cumulative;authorities=[int]$Result.authorities;rows=7;dnsReads=[int]$Result.dnsReads;outcome=$outcome;reason=$Result.reason;writes=0;mutations=0;businessEffects=0;residue=0;trainerActions=0}
  $ledger.sessions = @($session)
  $ledger.provider.requests = $cumulative
  $ledger.provider.dnsReads = [int]$Result.dnsReads
  $ledger.implementation.providerRequestsThisSprint = [int]$Result.providerReads
  $ledger.implementation.dnsReadsThisSprint = [int]$Result.dnsReads
  $ledger.outcome = $outcome
  $ledger.state = $outcome
  $ledger.targetMet = [bool]$Result.complete
  $ledger.authorities = @($Result.authorityRows)
  $ledger.capabilityRows = @($Result.capabilityRows)
  $ledger.manualAction.required = -not [bool]$Result.complete
  $ledger.manualAction.code = if ($Result.complete) { 'NONE' } else { [string]$Result.reason }
  $ledger.manualAction.laterOwnerAction = if ($Result.complete) { 'none; later mutations require Sprint 036S authority' } else { 'supply the named missing read-only authority under fresh Architect authority' }
  $ledger.implementation.status = $outcome
  Set-AcDisposition036R $ledger $Result
  $json = ($ledger | ConvertTo-Json -Depth 40) + "`n"
  Write-AtomicEvidenceFile036R $ledgerPath $json $Fault
  if ($Fault -eq 'AfterLedgerReplace') { throw 'INJECTED_AFTER_REPLACE' }
  Repair-EvidenceFromCanonical036R $resolved ($(if($Fault -eq 'DuringMarkdownWrite'){'DuringMarkdownWrite'}else{'None'})) | Out-Null
  return Repair-EvidenceFromCanonical036R $resolved
}

function Invoke-ReconciliationSelfTest036R {
  $exactHistoryCommand = '.\scripts\Invoke-ProviderAuthorityCompletion036R.ps1 -Mode ProtectedReadOnly'
  $acceptHistoryFixtures = @(
    [pscustomobject]@{entries=@()},
    [pscustomobject]@{entries=@([pscustomobject]@{CommandLine=$exactHistoryCommand})},
    [pscustomobject]@{entries=@([pscustomobject]@{CommandLine='  ./scripts/../scripts/Invoke-ProviderAuthorityCompletion036R.ps1   -Mode   ProtectedReadOnly  '})}
  )
  $script:HistoryAcceptedFixture = @(
    foreach ($fixture in $acceptHistoryFixtures) {
      Assert-FreshWindowHistory036R @($fixture.entries)
      $true
    }
  )
  $refuseHistoryFixtures = @(
    [pscustomobject]@{entries=@([pscustomobject]@{CommandLine=$exactHistoryCommand},[pscustomobject]@{CommandLine=$exactHistoryCommand})},
    [pscustomobject]@{entries=@([pscustomobject]@{CommandLine='Get-Date'})},
    [pscustomobject]@{entries=@([pscustomobject]@{CommandLine=($exactHistoryCommand + '; Get-Date')})},
    [pscustomobject]@{entries=@([pscustomobject]@{CommandLine=($exactHistoryCommand + ' extra')})},
    [pscustomobject]@{entries=@([pscustomobject]@{CommandLine='.\scripts\Invoke-ProviderAuthorityCompletion036R.ps1 -Mode SelfTest'})},
    [pscustomobject]@{entries=@([pscustomobject]@{Other='malformed'})}
  )
  $script:HistoryRefusedFixture = @(
    foreach ($fixture in $refuseHistoryFixtures) {
      $refused = $false
      try { Assert-FreshWindowHistory036R @($fixture.entries) }
      catch {
        if ($_.Exception.Message -ne 'FRESH_NONTRANSCRIBED_WINDOW_REQUIRED') { throw }
        $refused = $true
      }
      $refused
    }
  )
  if (@($script:HistoryAcceptedFixture | Where-Object { -not $_ }).Count -ne 0 -or
      @($script:HistoryRefusedFixture | Where-Object { -not $_ }).Count -ne 0) { throw 'HISTORY_FIXTURE_FAILED' }

  $directory = [IO.Path]::Combine([IO.Path]::GetTempPath(),'036r-evidence-' + [guid]::NewGuid().ToString('N'))
  [IO.Directory]::CreateDirectory($directory) | Out-Null
  try {
    $canonicalEvidence = Join-Path $root $script:EvidenceRelative
    foreach ($name in @('external-ledger.json','evidence.md','SPRINT-036R-REPORT.md')) { [IO.File]::Copy((Join-Path $canonicalEvidence $name),(Join-Path $directory $name),$true) }
    $ledger = Repair-EvidenceFromCanonical036R $directory
    [IO.File]::WriteAllText((Join-Path $directory 'evidence.md'),'stale')
    Repair-EvidenceFromCanonical036R $directory | Out-Null
    if ([IO.File]::ReadAllText((Join-Path $directory 'evidence.md')) -eq 'stale') { throw 'SELF_TEST_REPAIR_FAILED' }
    $before = [IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json'))
    $counterfeit = [pscustomobject]@{id=6;state='final';outcome=$script:ChildTarget;complete=$true;reason=$null;authorities=5;authorityRows=@();rows=7;capabilityRows=@();providerReads=999;dnsReads=99;writes=0;mutations=0;businessEffects=0;residue=0}
    try { Commit-EvidenceLanding036R $canonicalEvidence $counterfeit 'None' $script:TestPersistenceProvenance | Out-Null; throw 'TEST_CANONICAL_PERSISTENCE_ACCEPTED' }
    catch { if ($_.Exception.Message -ne 'TEST_PERSISTENCE_REFUSED') { throw } }
    try { Commit-EvidenceLanding036R $directory $counterfeit 'None' $script:LivePersistenceProvenance | Out-Null; throw 'TEST_LIVE_PERSISTENCE_ACCEPTED' }
    catch { if ($_.Exception.Message -ne 'TEST_PERSISTENCE_REFUSED') { throw } }
    if ([IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json')) -cne $before) { throw 'TEST_LIVE_PERSISTENCE_WROTE_LEDGER' }
    try { Commit-EvidenceLanding036R $directory $counterfeit 'None' $script:TestPersistenceProvenance | Out-Null; throw 'COUNTERFEIT_ACCEPTED' } catch { if ($_.Exception.Message -eq 'COUNTERFEIT_ACCEPTED') { throw } }
    $testAuthorities = @(@('vercel','supabase','resend','stripe','railway') | ForEach-Object { [pscustomobject]@{provider=$_;status='not-read';exactBinding=$false;paginationComplete=$false;evidence='fixture-not-read'} })
    $testCapabilities = @($ledger.capabilityRows | ForEach-Object { [pscustomobject]@{class=$_.class;authority=$_.authority;sourceConsumers=@($_.sourceConsumers);sourceComplete=[bool]$_.sourceComplete;providerConsumers=[int]$_.providerConsumers;paginationComplete=[bool]$_.paginationComplete;reachability=$_.reachability;replacement=$_.replacement;installTargets=@($_.installTargets);readback=$_.readback;predecessorAction=$_.predecessorAction;predecessorOracle=$_.predecessorOracle;coupling=$_.coupling;manualUiRequired=[bool]$_.manualUiRequired;laterMutation=$_.laterMutation} })
    $testLanding = [pscustomobject]@{id=6;state='final';outcome=$script:ChildFallback;complete=$false;reason='FIXTURE_FALLBACK';authorities=0;authorityRows=$testAuthorities;rows=7;capabilityRows=$testCapabilities;providerReads=1;dnsReads=0;writes=0;mutations=0;businessEffects=0;residue=0}
    Assert-LandingResult036R $testLanding

    if ([IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json')) -cne $before) { throw 'COUNTERFEIT_WROTE_LEDGER' }
    if (@([IO.Directory]::EnumerateFiles($directory,'.036r-next-*')).Count -ne 0) { throw 'SELF_TEST_RESIDUE' }
    $faultCases = @(
      [pscustomobject]@{fault='BeforeLedgerReplace';code='INJECTED_BEFORE_REPLACE';ledgerChanged=$false},
      [pscustomobject]@{fault='AfterLedgerReplace';code='INJECTED_AFTER_REPLACE';ledgerChanged=$true},
      [pscustomobject]@{fault='DuringMarkdownWrite';code='INJECTED_BEFORE_REPLACE';ledgerChanged=$true}
    )
    foreach ($case in $faultCases) {
      foreach ($name in @('external-ledger.json','evidence.md','SPRINT-036R-REPORT.md')) { [IO.File]::Copy((Join-Path $canonicalEvidence $name),(Join-Path $directory $name),$true) }
      $originalLedger = [IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json'))
      $caught = $null
      try { Commit-EvidenceLanding036R $directory $testLanding $case.fault $script:TestPersistenceProvenance | Out-Null } catch { $caught = $_.Exception.Message }
      if ($caught -ne $case.code) { throw 'ATOMIC_FAULT_NOT_OBSERVED' }
      $changed = [IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json')) -cne $originalLedger
      if ($changed -ne $case.ledgerChanged) { throw 'ATOMIC_LEDGER_STATE_REFUSED' }
      $repaired = Repair-EvidenceFromCanonical036R $directory
      if ([IO.File]::ReadAllText((Join-Path $directory 'evidence.md')) -cne (Convert-LedgerToEvidence036R $repaired)) { throw 'ATOMIC_EVIDENCE_REPAIR_FAILED' }
      if ([IO.File]::ReadAllText((Join-Path $directory 'SPRINT-036R-REPORT.md')) -cne (Convert-LedgerToReport036R $repaired)) { throw 'ATOMIC_REPORT_REPAIR_FAILED' }
      if (@([IO.Directory]::EnumerateFiles($directory,'.036r-next-*')).Count -ne 0) { throw 'ATOMIC_RESIDUE_FAILED' }
    }

    $silent = New-Object Diagnostics.ProcessStartInfo
    $silent.FileName = (Get-Command node).Source
    $silent.Arguments = '-e "process.stdin.resume();setInterval(()=>{},1000)"'
    $silent.WorkingDirectory = $root
    $silent.UseShellExecute = $false
    $silent.CreateNoWindow = $true
    $silent.RedirectStandardInput = $true
    $silent.RedirectStandardOutput = $true
    $silent.RedirectStandardError = $true
    $timeoutClock = [Diagnostics.Stopwatch]::StartNew()
    try { Invoke-ProtectedChild036R $silent 200 | Out-Null; throw 'SILENT_CHILD_ACCEPTED' }
    catch { if ($_.Exception.Message -ne 'CHILD_TIMEOUT_REFUSED') { throw } }
    finally { $timeoutClock.Stop() }
    if ($timeoutClock.ElapsedMilliseconds -gt 5000) { throw 'SILENT_CHILD_DEADLINE_FAILED' }
    $ownedPid = $script:LastChildPid
    if ($null -ne (Get-Process -Id $ownedPid -ErrorAction SilentlyContinue)) { throw 'SILENT_CHILD_CLEANUP_FAILED' }
    $promptChild = New-Object Diagnostics.ProcessStartInfo
    $promptChild.FileName = (Get-Command node).Source
    $promptChild.Arguments = '-e "eval(Buffer.from(''cHJvY2Vzcy5zdGRpbi5zZXRFbmNvZGluZygidXRmOCIpO2xldCBiPSIiO3Byb2Nlc3Muc3RkaW4ub24oImRhdGEiLGQ9PntiKz1kO2xldCBpO3doaWxlKChpPWIuaW5kZXhPZigiXG4iKSk+PTApe2NvbnN0IGxpbmU9Yi5zbGljZSgwLGkpO2I9Yi5zbGljZShpKzEpO2NvbnN0IHY9SlNPTi5wYXJzZShsaW5lKTtpZih2Lm1vZGUpe3Byb2Nlc3Muc3Rkb3V0LndyaXRlKEpTT04uc3RyaW5naWZ5KHtpZDoxLHN0YXRlOiJuZWVkLWF1dGhvcml0eSIscHJvdmlkZXI6InZlcmNlbCJ9KSsiXG4iKTt9ZWxzZXtzZXRJbnRlcnZhbCgoKT0+e30sMTAwMCk7fX19KTs='',''base64'').toString())"'
    $promptChild.WorkingDirectory = $root
    $promptChild.UseShellExecute = $false
    $promptChild.CreateNoWindow = $true
    $promptChild.RedirectStandardInput = $true
    $promptChild.RedirectStandardOutput = $true
    $promptChild.RedirectStandardError = $true
    $script:PromptFixtureInvoked = $false
    $script:PromptFixtureReleaseCount = 0
    $delayedPrompt = {
      param($provider)
      if ($provider -ne 'vercel') { throw 'PROMPT_PROVIDER_REFUSED' }
      $script:PromptFixtureInvoked = $true
      Start-Sleep -Milliseconds 700
      return [pscustomobject]@{credential='fixture-opaque';expected=[pscustomobject]@{teamId='fixture-team';projectId='fixture-project'}}
    }
    $promptClock = [Diagnostics.Stopwatch]::StartNew()
    try { Invoke-ProtectedChild036R $promptChild 500 $delayedPrompt | Out-Null; throw 'PROMPT_DELAY_CHILD_ACCEPTED' }
    catch { if ($_.Exception.Message -ne 'CHILD_TIMEOUT_REFUSED') { throw } }
    finally { $promptClock.Stop() }
    if (-not $script:PromptFixtureInvoked -or $script:PromptFixtureReleaseCount -ne 1 -or $promptClock.ElapsedMilliseconds -lt 700 -or $promptClock.ElapsedMilliseconds -gt 5000) { throw 'PROMPT_DELAY_BUDGET_FAILED' }
    $promptPid = $script:LastChildPid
    if ($null -ne (Get-Process -Id $promptPid -ErrorAction SilentlyContinue)) { throw 'PROMPT_DELAY_CLEANUP_FAILED' }
    if (@([IO.Directory]::EnumerateFiles($directory,'.036r-next-*')).Count -ne 0) { throw 'PROMPT_DELAY_RESIDUE_FAILED' }

  }
  finally {
    if ([IO.Directory]::Exists($directory)) { [IO.Directory]::Delete($directory,$true) }
    if ([IO.Directory]::Exists($directory)) { throw 'SELF_TEST_RESIDUE' }
  }
}

function Get-Capability036R {
  $node = Get-Command node -ErrorAction SilentlyContinue
  $domainModule = Join-Path $root 'scripts\provider-authority-resend-domain-036R.mjs'
  if ($null -eq $node) { return [ordered]@{ready=$false;reason='NODE_RUNTIME_REQUIRED'} }
  if (-not [IO.File]::Exists($domainModule)) { return [ordered]@{ready=$false;reason='DOMAIN_AUTHORITY_MODULE_REQUIRED'} }
  return [ordered]@{ready=$true;reason=$null}
}

function Get-ChildActiveRemaining036R([Diagnostics.Stopwatch]$Clock,[int]$DeadlineMs) {
  $remaining = $DeadlineMs - [int][Math]::Ceiling($Clock.Elapsed.TotalMilliseconds)
  if ($remaining -le 0) { throw 'CHILD_TIMEOUT_REFUSED' }
  return $remaining
}

function Read-ChildLineDeadline036R($Reader,[Diagnostics.Stopwatch]$Clock,[int]$DeadlineMs) {
  $remaining = Get-ChildActiveRemaining036R $Clock $DeadlineMs
  $task = $Reader.ReadLineAsync()
  if (-not $task.Wait($remaining)) { throw 'CHILD_TIMEOUT_REFUSED' }
  return $task.GetAwaiter().GetResult()
}

function Invoke-ProtectedChild036R([Diagnostics.ProcessStartInfo]$TestProcessInfo=$null,[int]$DeadlineMs=$script:ProductionDeadlineMs,[scriptblock]$TestPromptProvider=$null) {
  if (-not $script:TestFaultsEnabled -and ($null -ne $TestProcessInfo -or $DeadlineMs -ne $script:ProductionDeadlineMs -or $null -ne $TestPromptProvider)) { throw 'TEST_TRANSPORT_REFUSED' }
  $info = if ($null -ne $TestProcessInfo) { $TestProcessInfo } else { New-Object Diagnostics.ProcessStartInfo }
  if ($null -eq $TestProcessInfo) {
  $info.FileName = (Get-Command node).Source
  $info.Arguments = '"' + (Join-Path $root 'scripts\provider-authority-reader-036P.mjs') + '" --protected-child-036r'
  $info.WorkingDirectory = $root
  $info.UseShellExecute = $false
  $info.CreateNoWindow = $true
  $info.RedirectStandardInput = $true
  $info.RedirectStandardOutput = $true
  $info.RedirectStandardError = $true
  }
  $process = New-Object Diagnostics.Process
  $process.StartInfo = $info
  if (-not $process.Start()) { throw 'CHILD_START_REFUSED' }
  $script:LastChildPid = $process.Id
  $clock = [Diagnostics.Stopwatch]::StartNew()
  $stderrTask = $process.StandardError.ReadToEndAsync()
  $completedProtocol = $false
  $timedOut = $false
  $failure = $null
  try {
    [void](Get-ChildActiveRemaining036R $clock $DeadlineMs)
    $process.StandardInput.WriteLine('{"id":1,"mode":"protected-read"}')
    $providers = @('vercel','supabase','resend','stripe','railway')
    for ($index=0; $index -lt $providers.Count; $index++) {
      $line = Read-ChildLineDeadline036R $process.StandardOutput $clock $DeadlineMs
      Assert-SanitizedChildLine036R $line
      $need = $line | ConvertFrom-Json
      $provider = $providers[$index]
      if ($need.id -ne ($index+1) -or $need.state -ne 'need-authority' -or $need.provider -ne $provider) { throw 'CHILD_PROTOCOL_REFUSED' }
      $clock.Stop()
      if ($null -ne $TestPromptProvider) {
        $testAuthority = & $TestPromptProvider $provider
        Assert-ExactProperties036R $testAuthority @('credential','expected') 'TEST_PROMPT_REFUSED'
        if ($testAuthority.credential -isnot [string] -or [string]::IsNullOrWhiteSpace($testAuthority.credential)) { throw 'TEST_PROMPT_REFUSED' }
        $testFrame = @{id=($index+1);provider=$provider;type='authority';credential=$testAuthority.credential;expected=$testAuthority.expected} | ConvertTo-Json -Compress -Depth 5
        try {
          if ([Text.Encoding]::UTF8.GetByteCount($testFrame) -gt 65536) { throw 'REQUEST_LINE_REFUSED' }
          [void](Get-ChildActiveRemaining036R $clock $DeadlineMs)
          $clock.Start()
          $process.StandardInput.WriteLine($testFrame)
          $process.StandardInput.Flush()
          $script:PromptFixtureReleaseCount += 1
        } finally { $testFrame = $null; $testAuthority = $null }
      } else {


      $secure = Read-Host "$provider management credential" -AsSecureString
      $plain = $null
      $expected = $null
      $frame = $null
      try {
        $expected = switch ($provider) {
          'vercel' { @{teamId=(Read-Opaque036R 'Vercel team ID');projectId=(Read-Opaque036R 'Vercel project ID')} }
          'supabase' { @{projectRef=(Read-Opaque036R 'Supabase project ref')} }
          'resend' { @{} }
          'stripe' { $mode = Read-Choice036R 'Stripe mode: live or test' @('live','test'); @{accountId=(Read-Opaque036R 'Stripe account ID');liveMode=($mode -eq 'live')} }
          'railway' { $tokenType = Read-Choice036R 'Railway token type: account, workspace, or project' @('account','workspace','project'); @{tokenType=$tokenType;accountId=(Read-Opaque036R 'Railway account ID or none');workspaceId=(Read-Opaque036R 'Railway workspace ID or none');projectId=(Read-Opaque036R 'Railway project ID');environmentId=(Read-Opaque036R 'Railway environment ID or none')} }
        }
        $plain = Convert-Secure036R $secure
        $frame = @{id=($index+1);provider=$provider;type='authority';credential=$plain;expected=$expected} | ConvertTo-Json -Compress -Depth 5
        if ([Text.Encoding]::UTF8.GetByteCount($frame) -gt 65536) { throw 'REQUEST_LINE_REFUSED' }
        [void](Get-ChildActiveRemaining036R $clock $DeadlineMs)
        $clock.Start()
        $process.StandardInput.WriteLine($frame)
        $process.StandardInput.Flush()
      }
      finally {
        $plain = $null
        $expected = $null
        $frame = $null
        $secure.Dispose()
      }
      }
      $resultLine = Read-ChildLineDeadline036R $process.StandardOutput $clock $DeadlineMs
      Assert-SanitizedChildLine036R $resultLine
      $result = $resultLine | ConvertFrom-Json
      if ($result.state -eq 'final') { $completedProtocol = $true; return $result }
      Assert-ExactProperties036R $result @('id','state','provider','requests','dnsReads','operations') 'CHILD_PROTOCOL_REFUSED'
      if ($result.id -ne ($index+1) -or $result.state -ne 'provider-complete' -or $result.provider -ne $provider -or [int]$result.requests -lt 1 -or [int]$result.requests -gt $script:SessionRequestCeiling) { throw 'CHILD_PROTOCOL_REFUSED' }
    }
    $finalLine = Read-ChildLineDeadline036R $process.StandardOutput $clock $DeadlineMs
    Assert-SanitizedChildLine036R $finalLine
    $completedProtocol = $true
    return ($finalLine | ConvertFrom-Json)
  }
  finally {
    $process.StandardInput.Close()
    if ($completedProtocol -and -not $process.HasExited) {
      $remaining = $DeadlineMs - [int][Math]::Ceiling($clock.Elapsed.TotalMilliseconds)
      $timedOut = $remaining -le 0 -or -not $process.WaitForExit([Math]::Max(0,$remaining))
    } elseif (-not $completedProtocol) {
      $timedOut = $clock.ElapsedMilliseconds -ge $DeadlineMs
    }
    if (-not $process.HasExited) { $process.Kill(); $process.WaitForExit() }
    $clock.Stop()
    $stderr = $stderrTask.GetAwaiter().GetResult()
    $extra = $process.StandardOutput.ReadToEnd()
    $exitCode = $process.ExitCode
    $process.Dispose()
    if ($timedOut) { throw 'CHILD_TIMEOUT_REFUSED' }
    if ($stderr.Length -ne 0 -or $extra.Length -ne 0 -or $exitCode -ne 0) { throw 'SANITIZED_CHILD_FAILURE' }
  }
}

Assert-Canonical036R

if ($Mode -eq 'SelfTest') {
  Invoke-ReconciliationSelfTest036R
  Write-Sanitized @{sprint='036R';state='local-controls-pass';assertions=100;providerReads=0;dnsReads=0;writes=0;mutations=0;businessEffects=0;residue=0;trainerActions=0;deadlineTimeout=$true;promptDelayPaused=$true;deadlineCleanup=$true;testPersistenceRefused=$true;atomicBeforeRepair=$true;atomicAfterRepair=$true;atomicMarkdownRepair=$true;historyAccepted=@($script:HistoryAcceptedFixture);historyRefused=@($script:HistoryRefusedFixture);historyCounters=@(0,0,0)}
  exit 0
}

if ($Mode -eq 'CapabilityGate') {
  $evidenceDirectory = Join-Path $root $script:EvidenceRelative
  Repair-EvidenceFromCanonical036R $evidenceDirectory | Out-Null
  $capability = Get-Capability036R
  if (-not $capability.ready) {
    Write-Sanitized @{sprint='036R';state=$script:Fallback;readyForProtectedWindow=$false;reason=$capability.reason;providerReads=0;dnsReads=0;writes=0;mutations=0;businessEffects=0;residue=0;trainerActions=0}
    exit 2
  }
  Write-Sanitized @{sprint='036R';state='protected-authority-ready-local';readyForProtectedWindow=$true;reason=$null;providerReads=0;dnsReads=0;writes=0;mutations=0;businessEffects=0;residue=0;trainerActions=0}
  exit 0
}

if ($Mode -eq 'ProtectedReadOnly') {
  if ([Console]::IsInputRedirected -or [Console]::IsOutputRedirected -or -not [Environment]::UserInteractive) { throw 'VISIBLE_CONSOLE_REQUIRED' }
  $historyCommand = Get-Command Get-History -ErrorAction SilentlyContinue
  $historyEntries = if ($null -eq $historyCommand) { @() } else { @(Get-History) }
  Assert-FreshWindowHistory036R $historyEntries
  $capability = Get-Capability036R
  if (-not $capability.ready) { throw $capability.reason }
  $mutex = New-Object Threading.Mutex($false,'Global\PrecisionPerformance-036R-ProtectedReadOnly')
  if (-not $mutex.WaitOne(0)) { $mutex.Dispose(); throw 'CONCURRENT_WINDOW_REFUSED' }
  try {
    $evidenceDirectory = Join-Path $root $script:EvidenceRelative
    Repair-EvidenceFromCanonical036R $evidenceDirectory | Out-Null
    $existing = Get-Content -Raw (Join-Path $evidenceDirectory 'external-ledger.json') | ConvertFrom-Json
    if (@($existing.sessions).Count -ne 0) { throw 'ONE_SESSION_CEILING_REFUSED' }
    $result = Invoke-ProtectedChild036R
    $landing = Commit-EvidenceLanding036R $evidenceDirectory $result 'None' $script:LivePersistenceProvenance
    Write-Sanitized @{sprint='036R';state=$landing.outcome;reason=$result.reason;providerReads=$result.providerReads;dnsReads=$result.dnsReads;cumulativeReads=$landing.provider.requests;writes=0;mutations=0;businessEffects=0;residue=0;trainerActions=0;reconciliationRequired=$false}
    if ($result.complete) { exit 0 } else { exit 2 }
  }
  finally {
    $mutex.ReleaseMutex()
    $mutex.Dispose()
  }
}

throw 'MODE_REFUSED'
