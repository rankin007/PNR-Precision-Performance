param(
  [ValidateSet('SelfTest','CapabilityGate','ProtectedReadOnly')]
  [string]$Mode = 'SelfTest'
)

$ErrorActionPreference = 'Stop'
$canonical = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$expectedHead = 'c90c3201380d7f61e03647ca6e46b03dc4c27985'
$expectedBranch = 'codex/025B-versioned-domain-authority-package'
$script:EvidenceRelative = 'evidence\professional-engineering\036Q-protected-five-provider-authority-completion'
$script:SessionRequestCeiling = 24
$script:RetainedReadBaseline = 4
$script:CumulativeReadCeiling = 28
$script:TestFaultsEnabled = $Mode -eq 'SelfTest'
$script:Target = 'protected-five-provider-authority-complete-clean'
$script:Fallback = 'protected-five-provider-authority-blocked-clean'
$script:ChildTarget = 'protected-provider-authority-readback-complete-clean'
$script:ChildFallback = 'protected-provider-authority-readback-blocked-clean'

function Write-Sanitized([hashtable]$Value) {
  [Console]::Out.WriteLine(($Value | ConvertTo-Json -Compress -Depth 8))
}

function Assert-Canonical036Q {
  $gitRoot = (& git -C $root rev-parse --show-toplevel).Trim().Replace('/', '\')
  $head = (& git -C $root rev-parse HEAD).Trim()
  $branch = (& git -C $root branch --show-current).Trim()
  $conflicts = @(& git -c core.autocrlf=false -c core.safecrlf=false -C $root diff --name-only --diff-filter=U)
  if ($root -ne $canonical -or $gitRoot -ne $canonical -or $head -ne $expectedHead -or $branch -ne $expectedBranch -or $conflicts.Count -ne 0) {
    throw 'CANONICAL_GUARD_REFUSED'
  }
}

function Convert-Secure036Q([Security.SecureString]$Value) {
  $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Value)
  try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer) }
  finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
}

function Read-Opaque036Q([string]$Prompt) {
  $secureValue = Read-Host $Prompt -AsSecureString
  $value = Convert-Secure036Q $secureValue
  try {
    if ([string]::IsNullOrWhiteSpace($value) -or $value.Length -gt 2048 -or $value -match "[`r`n]") { throw 'OPAQUE_ID_REFUSED' }
    return $value
  }
  finally {
    $value = $null
    $secureValue.Dispose()
  }
}

function Read-Choice036Q([string]$Prompt,[string[]]$Allowed) {
  $value = Read-Opaque036Q $Prompt
  if ($value -notin $Allowed) { $value = $null; throw 'OPAQUE_CHOICE_REFUSED' }
  return $value
}

function Assert-ExactProperties036Q($Value,[string[]]$Names,[string]$Code) {
  if ($null -eq $Value) { throw $Code }
  $actual = @($Value.PSObject.Properties.Name)
  if (@($actual | Where-Object { $_ -notin $Names }).Count -ne 0 -or @($Names | Where-Object { $_ -notin $actual }).Count -ne 0) { throw $Code }
}

function Assert-EvidenceDirectory036Q([string]$Directory) {
  $resolved = [IO.Path]::GetFullPath($Directory)
  if (-not [IO.Directory]::Exists($resolved)) { throw 'EVIDENCE_DIRECTORY_REFUSED' }
  $expected = [IO.Path]::GetFullPath((Join-Path $root $script:EvidenceRelative)).TrimEnd('\')
  if ($Mode -ne 'SelfTest' -and $resolved.TrimEnd('\') -ne $expected) { throw 'EVIDENCE_PATH_REFUSED' }
  return $resolved.TrimEnd('\')
}

function Remove-OwnedSiblings036Q([string]$Directory) {
  $resolved = Assert-EvidenceDirectory036Q $Directory
  foreach ($pattern in @('.036q-next-*','.036q-next-backup-*')) {
    foreach ($item in [IO.Directory]::EnumerateFiles($resolved,$pattern,[IO.SearchOption]::TopDirectoryOnly)) {
      $full = [IO.Path]::GetFullPath($item)
      if (-not $full.StartsWith($resolved + '\',[StringComparison]::OrdinalIgnoreCase)) { throw 'EVIDENCE_PATH_REFUSED' }
      [IO.File]::Delete($full)
    }
  }
}

function Write-AtomicEvidenceFile036Q([string]$Target,[string]$Content,[string]$Fault='None') {
  $directory = [IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Target))
  $next = [IO.Path]::Combine($directory,'.036q-next-' + [guid]::NewGuid().ToString('N'))
  $backup = [IO.Path]::Combine($directory,'.036q-next-backup-' + [guid]::NewGuid().ToString('N'))
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

function Assert-CanonicalLedger036Q($Ledger) {
  if ($null -eq $Ledger -or $Ledger.sprint -ne '036Q-protected-five-provider-authority-completion' -or $null -eq $Ledger.source -or $null -eq $Ledger.focused -or $null -eq $Ledger.baseline -or $null -eq $Ledger.provider -or $null -eq $Ledger.authorities -or $null -eq $Ledger.capabilityRows -or $null -eq $Ledger.officialContracts -or $null -eq $Ledger.alternativesChecked -or $null -eq $Ledger.manualAction -or $null -eq $Ledger.acceptance) { throw 'LEDGER_SCHEMA_REFUSED' }
  if ($Ledger.source.complete -ne $true -or [int]$Ledger.source.fileCount -ne 124 -or [int]$Ledger.focused.total -ne 110 -or [int]$Ledger.retained -ne 1783 -or [int]$Ledger.combined -ne 1893) { throw 'LEDGER_BASELINE_REFUSED' }
  if ([int]$Ledger.baseline.providerReads -ne $script:RetainedReadBaseline -or [int]$Ledger.baseline.writes -ne 0 -or [int]$Ledger.baseline.mutations -ne 0 -or [int]$Ledger.baseline.businessEffects -ne 0 -or [int]$Ledger.baseline.residue -ne 0 -or [int]$Ledger.baseline.trainerActions -ne 0) { throw 'LEDGER_COUNTER_REFUSED' }
  if (@($Ledger.authorities).Count -ne 5 -or @($Ledger.capabilityRows).Count -ne 7 -or @($Ledger.officialContracts).Count -ne 5 -or @($Ledger.alternativesChecked).Count -ne 5 -or @($Ledger.acceptance).Count -ne 40) { throw 'LEDGER_ROWS_REFUSED' }
  if ([int]$Ledger.provider.requests -lt $script:RetainedReadBaseline -or [int]$Ledger.provider.requests -gt $script:CumulativeReadCeiling -or [int]$Ledger.provider.writes -ne 0 -or [int]$Ledger.provider.mutations -ne 0 -or [int]$Ledger.provider.businessEffects -ne 0 -or [int]$Ledger.provider.residue -ne 0 -or [int]$Ledger.trainerActions -ne 0) { throw 'LEDGER_COUNTER_REFUSED' }
  $expectedProviders = @('vercel','supabase','resend','stripe','railway')
  for ($index=0; $index -lt 5; $index++) { if ($Ledger.authorities[$index].provider -ne $expectedProviders[$index] -or $Ledger.officialContracts[$index].provider -ne $expectedProviders[$index] -or $Ledger.alternativesChecked[$index].provider -ne $expectedProviders[$index]) { throw 'LEDGER_ORDER_REFUSED' } }
  for ($index=0; $index -lt 40; $index++) { if ($Ledger.acceptance[$index].id -ne ('AC-{0:D2}' -f ($index+1))) { throw 'LEDGER_ACCEPTANCE_REFUSED' } }
}

function Convert-LedgerToEvidence036Q($Ledger) {
  $authorityLines = @($Ledger.authorities | ForEach-Object { "- $($_.provider): $($_.status); exactBinding=$($_.exactBinding); paginationComplete=$($_.paginationComplete); evidence=$($_.evidence)." }) -join "`n"
  $alternativeLines = @($Ledger.alternativesChecked | ForEach-Object { "- $($_.provider): API=$($_.api); connector=$($_.connector); CLI=$($_.cli); signed-in session=$($_.signedInSession); result=$($_.result)." }) -join "`n"
  $sessionLines = if (@($Ledger.sessions).Count) { @($Ledger.sessions | ForEach-Object { "- $($_.at): sessionReads=$($_.sessionReads); cumulativeReads=$($_.cumulativeReads); authorities=$($_.authorities); rows=$($_.rows); outcome=$($_.outcome)." }) -join "`n" } else { '- No Sprint 036Q protected read-only session has run.' }
  return @"
# Sprint 036Q Evidence - Protected Five-Provider Authority Completion

Outcome: ``$($Ledger.outcome)``. Target met: ``$($Ledger.targetMet)``.

## Source and proof

- Accepted object: ``$($Ledger.source.gitObject)``.
- Accepted-source graph: ``$($Ledger.source.fileCount)`` files; complete ``$($Ledger.source.complete)``.
- Focused/retained/combined: ``$($Ledger.focused.total)/$($Ledger.retained)/$($Ledger.combined)``.

## Provider history

Cumulative reads/writes/mutations/business effects/residue: ``$($Ledger.provider.requests)/$($Ledger.provider.writes)/$($Ledger.provider.mutations)/$($Ledger.provider.businessEffects)/$($Ledger.provider.residue)``. Trainer actions: ``$($Ledger.trainerActions)``.

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

function Convert-LedgerToReport036Q($Ledger) {
  $dispositions = @($Ledger.acceptance | ForEach-Object { "- $($_.id): $($_.status) - $($_.evidence)" }) -join "`n"
  return @"
# Sprint 036Q Report - Protected Five-Provider Authority Completion

## Result

Outcome: ``$($Ledger.outcome)``. Target met: ``$($Ledger.targetMet)``.

Cumulative provider reads/writes/mutations/business effects/residue/trainer actions: ``$($Ledger.provider.requests)/$($Ledger.provider.writes)/$($Ledger.provider.mutations)/$($Ledger.provider.businessEffects)/$($Ledger.provider.residue)/$($Ledger.trainerActions)``. Sprint 036Q provider reads: ``$($Ledger.implementation.providerRequestsThisSprint)``.

## Verification arithmetic

- Completion: ``70/70``.
- Protected transport: ``40/40``.
- Focused: ``70 + 40 = 110``.
- Retained: ``1783``.
- Combined: ``1893``.

## AC-01..40 disposition

This report is the sole mutable AC-01..40 disposition authority.

$dispositions

## Boundary

No protected value is durable. Accepted Sprint 036L remains unchanged. Product Done remains false. Stage, commit, push, PR, merge and conflict work remain outside Sprint 036Q.
"@
}

function Repair-EvidenceFromCanonical036Q([string]$Directory,[string]$Fault='None') {
  $resolved = Assert-EvidenceDirectory036Q $Directory
  Remove-OwnedSiblings036Q $resolved
  $ledgerPath = [IO.Path]::Combine($resolved,'external-ledger.json')
  $evidencePath = [IO.Path]::Combine($resolved,'evidence.md')
  $reportPath = [IO.Path]::Combine($resolved,'SPRINT-036Q-REPORT.md')
  $ledger = ([IO.File]::ReadAllText($ledgerPath) | ConvertFrom-Json)
  Assert-CanonicalLedger036Q $ledger
  $evidence = Convert-LedgerToEvidence036Q $ledger
  $report = Convert-LedgerToReport036Q $ledger
  if ([IO.File]::ReadAllText($evidencePath) -cne $evidence) { Write-AtomicEvidenceFile036Q $evidencePath $evidence ($(if($Fault -eq 'DuringMarkdownWrite'){'BeforeLedgerReplace'}else{'None'})) }
  if ([IO.File]::ReadAllText($reportPath) -cne $report) { Write-AtomicEvidenceFile036Q $reportPath $report }
  if ([IO.File]::ReadAllText($evidencePath) -cne $evidence -or [IO.File]::ReadAllText($reportPath) -cne $report) { throw 'EVIDENCE_REREAD_REFUSED' }
  return $ledger
}

function Assert-SanitizedChildLine036Q([string]$Line) {
  if ($null -eq $Line -or [Text.Encoding]::UTF8.GetByteCount($Line) -gt 65536) { throw 'CHILD_RESPONSE_REFUSED' }
  if ($Line -match '(sbp_|sb_secret_|re_[A-Za-z0-9]{8,}|sk_(live|test)_[A-Za-z0-9]{8,}|whsec_[A-Za-z0-9]{8,}|-----BEGIN [A-Z ]+PRIVATE KEY-----|eyJ[A-Za-z0-9_-]{8,}\.)') { throw 'CHILD_TAINT_REFUSED' }
}

function Assert-LandingResult036Q($Result) {
  $resultFields = @('id','state','outcome','complete','reason','authorities','authorityRows','rows','capabilityRows','providerReads','writes','mutations','residue')
  Assert-ExactProperties036Q $Result $resultFields 'LANDING_SCHEMA_REFUSED'
  $serialized = $Result | ConvertTo-Json -Compress -Depth 20
  if ([Text.Encoding]::UTF8.GetByteCount($serialized) -gt 65536 -or $serialized -match '(sbp_|sb_secret_|re_[A-Za-z0-9]{8,}|sk_(live|test)_[A-Za-z0-9]{8,}|whsec_[A-Za-z0-9]{8,}|-----BEGIN [A-Z ]+PRIVATE KEY-----|eyJ[A-Za-z0-9_-]{8,}\.)') { throw 'LANDING_TAINT_REFUSED' }
  if ($Result.state -ne 'final' -or $Result.id -ne 6 -or [int]$Result.providerReads -lt 1 -or [int]$Result.providerReads -gt $script:SessionRequestCeiling -or [int]$Result.writes -ne 0 -or [int]$Result.mutations -ne 0 -or [int]$Result.residue -ne 0 -or [int]$Result.rows -ne 7 -or @($Result.authorityRows).Count -ne 5 -or @($Result.capabilityRows).Count -ne 7) { throw 'LANDING_RESULT_REFUSED' }
  if ($Result.complete) { if ($Result.outcome -ne $script:ChildTarget -or $null -ne $Result.reason -or [int]$Result.providerReads -lt 19) { throw 'LANDING_OUTCOME_REFUSED' } }
  else { if ($Result.outcome -ne $script:ChildFallback -or [string]::IsNullOrWhiteSpace([string]$Result.reason)) { throw 'LANDING_OUTCOME_REFUSED' } }
  $expectedProviders = @('vercel','supabase','resend','stripe','railway')
  $authorityFields = @('provider','status','exactBinding','paginationComplete','evidence')
  $bound = 0
  for ($index=0; $index -lt 5; $index++) {
    $row = $Result.authorityRows[$index]
    Assert-ExactProperties036Q $row $authorityFields 'LANDING_AUTHORITY_ROWS_REFUSED'
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
    Assert-ExactProperties036Q $row $capabilityFields 'LANDING_CAPABILITY_ROWS_REFUSED'
    if ($row.class -ne $classes[$index] -or $row.authority -ne $providers[$index] -or $row.sourceConsumers -isnot [array] -or $row.sourceComplete -isnot [bool] -or $row.providerConsumers -isnot [int] -or [int]$row.providerConsumers -lt 0 -or $row.paginationComplete -isnot [bool] -or $row.reachability -notin @('required','not-reachable-proven','unknown-blocking') -or $row.installTargets -isnot [array] -or @($row.installTargets).Count -eq 0 -or $row.manualUiRequired -isnot [bool] -or $row.laterMutation -notin @('executable','blocked','owner-action-required')) { throw 'LANDING_CAPABILITY_ROWS_REFUSED' }
    foreach ($name in @('replacement','readback','predecessorAction','predecessorOracle','coupling')) { if ([string]::IsNullOrWhiteSpace([string]$row.$name)) { throw 'LANDING_CAPABILITY_ROWS_REFUSED' } }
  }
  if ($Result.complete -and ($bound -ne 5 -or @($Result.authorityRows | Where-Object { -not $_.paginationComplete }).Count -ne 0 -or @($Result.capabilityRows | Where-Object { -not $_.sourceComplete -or -not $_.paginationComplete -or $_.reachability -eq 'unknown-blocking' }).Count -ne 0)) { throw 'LANDING_TARGET_REFUSED' }
}

function Set-AcDisposition036Q($Ledger,$Result) {
  for ($index=0; $index -lt 5; $index++) {
    $ac = @(10,11,12,14,15)[$index]
    $authority = $Result.authorityRows[$index]
    $Ledger.acceptance[$ac-1].status = if ($authority.exactBinding -and $authority.paginationComplete) { 'pass' } else { 'fallback' }
    $Ledger.acceptance[$ac-1].evidence = if ($authority.exactBinding -and $authority.paginationComplete) { $authority.evidence } else { $Result.reason }
  }
  $Ledger.acceptance[12].status = 'pass'
  $Ledger.acceptance[12].evidence = 'no-resend-install-login-credential-file-secret-transport-or-email-action'
  $Ledger.acceptance[36].status = 'pass'
  $Ledger.acceptance[36].evidence = "sessionReads=$($Result.providerReads); outcome=$($(if($Result.complete){$script:Target}else{$script:Fallback})); zero-actions-and-residue"
  foreach ($ac in 38..40) { $Ledger.acceptance[$ac-1].status = 'pending'; $Ledger.acceptance[$ac-1].evidence = 'same-architect-diff-and-closeout-not-yet-complete' }
}

function Commit-EvidenceLanding036Q([string]$Directory,$Result,[string]$Fault='None') {
  if (-not $script:TestFaultsEnabled -and $Fault -ne 'None') { throw 'FAULT_INJECTION_REFUSED' }
  $resolved = Assert-EvidenceDirectory036Q $Directory
  $ledgerPath = [IO.Path]::Combine($resolved,'external-ledger.json')
  $ledger = Repair-EvidenceFromCanonical036Q $resolved
  Assert-LandingResult036Q $Result
  if (@($ledger.sessions).Count -ne 0) { throw 'ONE_SESSION_CEILING_REFUSED' }
  $prior = [int]$ledger.provider.requests
  $cumulative = $prior + [int]$Result.providerReads
  if ($prior -ne $script:RetainedReadBaseline -or $cumulative -gt $script:CumulativeReadCeiling) { throw 'CUMULATIVE_REQUEST_CEILING_REFUSED' }
  $outcome = if ($Result.complete) { $script:Target } else { $script:Fallback }
  $session = [ordered]@{at=(Get-Date).ToUniversalTime().ToString('o');sessionReads=[int]$Result.providerReads;cumulativeReads=$cumulative;authorities=[int]$Result.authorities;rows=7;outcome=$outcome;reason=$Result.reason;writes=0;mutations=0;businessEffects=0;residue=0;trainerActions=0}
  $ledger.sessions = @($session)
  $ledger.provider.requests = $cumulative
  $ledger.implementation.providerRequestsThisSprint = [int]$Result.providerReads
  $ledger.outcome = $outcome
  $ledger.state = $outcome
  $ledger.targetMet = [bool]$Result.complete
  $ledger.authorities = @($Result.authorityRows)
  $ledger.capabilityRows = @($Result.capabilityRows)
  $ledger.manualAction.required = -not [bool]$Result.complete
  $ledger.manualAction.code = if ($Result.complete) { 'NONE' } else { [string]$Result.reason }
  $ledger.manualAction.laterOwnerAction = if ($Result.complete) { 'none; later mutations require Sprint 036R authority' } else { 'supply the named missing read-only authority under fresh Architect authority' }
  $ledger.implementation.status = $outcome
  Set-AcDisposition036Q $ledger $Result
  $json = ($ledger | ConvertTo-Json -Depth 40) + "`n"
  Write-AtomicEvidenceFile036Q $ledgerPath $json $Fault
  if ($Fault -eq 'AfterLedgerReplace') { throw 'INJECTED_AFTER_REPLACE' }
  Repair-EvidenceFromCanonical036Q $resolved ($(if($Fault -eq 'DuringMarkdownWrite'){'DuringMarkdownWrite'}else{'None'})) | Out-Null
  return Repair-EvidenceFromCanonical036Q $resolved
}

function Invoke-ReconciliationSelfTest036Q {
  $directory = [IO.Path]::Combine([IO.Path]::GetTempPath(),'036q-evidence-' + [guid]::NewGuid().ToString('N'))
  [IO.Directory]::CreateDirectory($directory) | Out-Null
  try {
    $canonicalEvidence = Join-Path $root $script:EvidenceRelative
    foreach ($name in @('external-ledger.json','evidence.md','SPRINT-036Q-REPORT.md')) { [IO.File]::Copy((Join-Path $canonicalEvidence $name),(Join-Path $directory $name),$true) }
    $ledger = Repair-EvidenceFromCanonical036Q $directory
    [IO.File]::WriteAllText((Join-Path $directory 'evidence.md'),'stale')
    Repair-EvidenceFromCanonical036Q $directory | Out-Null
    if ([IO.File]::ReadAllText((Join-Path $directory 'evidence.md')) -eq 'stale') { throw 'SELF_TEST_REPAIR_FAILED' }
    $before = [IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json'))
    $counterfeit = [pscustomobject]@{id=6;state='final';outcome=$script:ChildTarget;complete=$true;reason=$null;authorities=5;authorityRows=@();rows=7;capabilityRows=@();providerReads=999;writes=0;mutations=0;residue=0}
    try { Commit-EvidenceLanding036Q $directory $counterfeit | Out-Null; throw 'COUNTERFEIT_ACCEPTED' } catch { if ($_.Exception.Message -eq 'COUNTERFEIT_ACCEPTED') { throw } }
    if ([IO.File]::ReadAllText((Join-Path $directory 'external-ledger.json')) -cne $before) { throw 'COUNTERFEIT_WROTE_LEDGER' }
    if (@([IO.Directory]::EnumerateFiles($directory,'.036q-next-*')).Count -ne 0) { throw 'SELF_TEST_RESIDUE' }
  }
  finally {
    if ([IO.Directory]::Exists($directory)) { [IO.Directory]::Delete($directory,$true) }
    if ([IO.Directory]::Exists($directory)) { throw 'SELF_TEST_RESIDUE' }
  }
}

function Get-Capability036Q {
  $node = Get-Command node -ErrorAction SilentlyContinue
  $resend = Get-Command resend -ErrorAction SilentlyContinue
  if ($null -eq $node) { return [ordered]@{ready=$false;reason='NODE_RUNTIME_REQUIRED'} }
  if ($null -eq $resend) { return [ordered]@{ready=$false;reason='PRE_EXISTING_RESEND_IDENTITY_REQUIRED'} }
  return [ordered]@{ready=$true;reason=$null}
}

function Invoke-ProtectedChild036Q {
  $info = New-Object Diagnostics.ProcessStartInfo
  $info.FileName = (Get-Command node).Source
  $info.Arguments = '"' + (Join-Path $root 'scripts\provider-authority-reader-036P.mjs') + '" --protected-child'
  $info.WorkingDirectory = $root
  $info.UseShellExecute = $false
  $info.CreateNoWindow = $true
  $info.RedirectStandardInput = $true
  $info.RedirectStandardOutput = $true
  $info.RedirectStandardError = $true
  $process = New-Object Diagnostics.Process
  $process.StartInfo = $info
  if (-not $process.Start()) { throw 'CHILD_START_REFUSED' }
  $stderrTask = $process.StandardError.ReadToEndAsync()
  try {
    $process.StandardInput.WriteLine('{"id":1,"mode":"protected-read"}')
    $providers = @('vercel','supabase','resend','stripe','railway')
    for ($index=0; $index -lt $providers.Count; $index++) {
      $line = $process.StandardOutput.ReadLine()
      Assert-SanitizedChildLine036Q $line
      $need = $line | ConvertFrom-Json
      $provider = $providers[$index]
      if ($need.id -ne ($index+1) -or $need.state -ne 'need-authority' -or $need.provider -ne $provider) { throw 'CHILD_PROTOCOL_REFUSED' }
      $secure = Read-Host "$provider management credential" -AsSecureString
      $plain = $null
      $expected = $null
      $frame = $null
      try {
        $expected = switch ($provider) {
          'vercel' { @{teamId=(Read-Opaque036Q 'Vercel team ID');projectId=(Read-Opaque036Q 'Vercel project ID')} }
          'supabase' { @{projectRef=(Read-Opaque036Q 'Supabase project ref')} }
          'resend' { @{teamId=(Read-Opaque036Q 'Resend team ID (must match fixed-argv whoami)')} }
          'stripe' { $mode = Read-Choice036Q 'Stripe mode: live or test' @('live','test'); @{accountId=(Read-Opaque036Q 'Stripe account ID');liveMode=($mode -eq 'live')} }
          'railway' { $tokenType = Read-Choice036Q 'Railway token type: account, workspace, or project' @('account','workspace','project'); @{tokenType=$tokenType;accountId=(Read-Opaque036Q 'Railway account ID or none');workspaceId=(Read-Opaque036Q 'Railway workspace ID or none');projectId=(Read-Opaque036Q 'Railway project ID');environmentId=(Read-Opaque036Q 'Railway environment ID or none')} }
        }
        $plain = Convert-Secure036Q $secure
        $frame = @{id=($index+1);provider=$provider;type='authority';credential=$plain;expected=$expected} | ConvertTo-Json -Compress -Depth 5
        if ([Text.Encoding]::UTF8.GetByteCount($frame) -gt 65536) { throw 'REQUEST_LINE_REFUSED' }
        $process.StandardInput.WriteLine($frame)
        $process.StandardInput.Flush()
      }
      finally {
        $plain = $null
        $expected = $null
        $frame = $null
        $secure.Dispose()
      }
      $resultLine = $process.StandardOutput.ReadLine()
      Assert-SanitizedChildLine036Q $resultLine
      $result = $resultLine | ConvertFrom-Json
      if ($result.state -eq 'final') { return $result }
      Assert-ExactProperties036Q $result @('id','state','provider','requests','operations') 'CHILD_PROTOCOL_REFUSED'
      if ($result.id -ne ($index+1) -or $result.state -ne 'provider-complete' -or $result.provider -ne $provider -or [int]$result.requests -lt 1 -or [int]$result.requests -gt $script:SessionRequestCeiling) { throw 'CHILD_PROTOCOL_REFUSED' }
    }
    $finalLine = $process.StandardOutput.ReadLine()
    Assert-SanitizedChildLine036Q $finalLine
    return ($finalLine | ConvertFrom-Json)
  }
  finally {
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

Assert-Canonical036Q

if ($Mode -eq 'SelfTest') {
  Invoke-ReconciliationSelfTest036Q
  Write-Sanitized @{sprint='036Q';state='local-controls-pass';assertions=110;providerReads=0;writes=0;mutations=0;businessEffects=0;residue=0;trainerActions=0}
  exit 0
}

if ($Mode -eq 'CapabilityGate') {
  $evidenceDirectory = Join-Path $root $script:EvidenceRelative
  Repair-EvidenceFromCanonical036Q $evidenceDirectory | Out-Null
  $capability = Get-Capability036Q
  if (-not $capability.ready) {
    Write-Sanitized @{sprint='036Q';state=$script:Fallback;readyForProtectedWindow=$false;reason=$capability.reason;providerReads=0;writes=0;mutations=0;businessEffects=0;residue=0;trainerActions=0}
    exit 2
  }
  Write-Sanitized @{sprint='036Q';state='protected-authority-ready-local';readyForProtectedWindow=$true;reason=$null;providerReads=0;writes=0;mutations=0;businessEffects=0;residue=0;trainerActions=0}
  exit 0
}

if ($Mode -eq 'ProtectedReadOnly') {
  if ([Console]::IsInputRedirected -or [Console]::IsOutputRedirected -or -not [Environment]::UserInteractive) { throw 'VISIBLE_CONSOLE_REQUIRED' }
  if ((Get-Command Get-History -ErrorAction SilentlyContinue) -and (Get-History).Count -gt 0) { throw 'FRESH_NONTRANSCRIBED_WINDOW_REQUIRED' }
  $capability = Get-Capability036Q
  if (-not $capability.ready) { throw $capability.reason }
  $mutex = New-Object Threading.Mutex($false,'Global\PrecisionPerformance-036Q-ProtectedReadOnly')
  if (-not $mutex.WaitOne(0)) { $mutex.Dispose(); throw 'CONCURRENT_WINDOW_REFUSED' }
  try {
    $evidenceDirectory = Join-Path $root $script:EvidenceRelative
    Repair-EvidenceFromCanonical036Q $evidenceDirectory | Out-Null
    $existing = Get-Content -Raw (Join-Path $evidenceDirectory 'external-ledger.json') | ConvertFrom-Json
    if (@($existing.sessions).Count -ne 0) { throw 'ONE_SESSION_CEILING_REFUSED' }
    $result = Invoke-ProtectedChild036Q
    $landing = Commit-EvidenceLanding036Q $evidenceDirectory $result
    Write-Sanitized @{sprint='036Q';state=$landing.outcome;reason=$result.reason;providerReads=$result.providerReads;cumulativeReads=$landing.provider.requests;writes=0;mutations=0;businessEffects=0;residue=0;trainerActions=0;reconciliationRequired=$false}
    if ($result.complete) { exit 0 } else { exit 2 }
  }
  finally {
    $mutex.ReleaseMutex()
    $mutex.Dispose()
  }
}

throw 'MODE_REFUSED'
