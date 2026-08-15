[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('SelfTest', 'CapabilityGate', 'ProtectedWindow')]
    [string]$Operation
)

$ErrorActionPreference = 'Stop'
$expectedRoot = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
$expectedHead = 'd822c027c58ad88ec7472e35986e7a33d6a3d6c9'
$expectedBranch = 'codex/025B-versioned-domain-authority-package'
$helper = 'scripts/prelaunch-provider-036M.mjs'
$safeCodes = @('NONE', 'NON_INTERACTIVE_REFUSED', 'TRANSCRIPTION_REFUSED', 'ROOT_REFUSED', 'GIT_REFUSED', 'CONFLICT_REFUSED', 'HELPER_REFUSED', 'HELPER_FAILED_SANITIZED', 'CONCURRENT_WINDOW_REFUSED', 'SECOND_WINDOW_REFUSED', 'CHILD_PROTOCOL_REFUSED', 'PROTECTED_WINDOW_BLOCKED', 'UNEXPECTED')

function Stop-Sanitized036M([string]$Code) {
    if ($safeCodes -notcontains $Code) { $Code = 'UNEXPECTED' }
    [Console]::Out.WriteLine('{"state":"failed-sanitized","code":"' + $Code + '"}')
    exit 2
}

function Test-Transcription036M {
    foreach ($scope in @('Global', 'Script')) {
        if (Get-Variable -Name Transcript -Scope $scope -ErrorAction SilentlyContinue) { return $true }
    }
    foreach ($policyPath in @('HKLM:\Software\Policies\Microsoft\Windows\PowerShell\Transcription', 'HKCU:\Software\Policies\Microsoft\Windows\PowerShell\Transcription')) {
        $policy = Get-ItemProperty -LiteralPath $policyPath -ErrorAction SilentlyContinue
        if ($null -ne $policy -and $policy.EnableTranscripting -eq 1) { return $true }
    }
    return $false
}

function Read-Masked036M([string]$Prompt) {
    $secure = Read-Host -Prompt $Prompt -AsSecureString
    if ($null -eq $secure -or $secure.Length -eq 0) { Stop-Sanitized036M 'PROTECTED_WINDOW_BLOCKED' }
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
        $secure.Dispose()
    }
}

function Send-ChildRequest036M($Process, [int]$Id, [string]$Phase, [hashtable]$Payload) {
    $request = @{ id = $Id; operation = 'phase'; phase = $Phase; payload = $Payload } | ConvertTo-Json -Compress -Depth 8
    try {
        $Process.StandardInput.WriteLine($request)
        $Process.StandardInput.Flush()
        $line = $Process.StandardOutput.ReadLine()
    }
    finally {
        $request = $null
        foreach ($key in @($Payload.Keys)) { $Payload[$key] = $null }
        $Payload.Clear()
    }
    if ($Process.StderrRead036M.IsCompleted -and $Process.StderrRead036M.GetAwaiter().GetResult() -ne 0) { Stop-Sanitized036M 'CHILD_PROTOCOL_REFUSED' }
    if ([string]::IsNullOrWhiteSpace($line) -or $line.Length -gt 65536) { Stop-Sanitized036M 'CHILD_PROTOCOL_REFUSED' }
    try { $result = $line | ConvertFrom-Json -Depth 8 }
    catch { Stop-Sanitized036M 'CHILD_PROTOCOL_REFUSED' }
    $allowed = @('id', 'code', 'state', 'counts', 'ordinal', 'time', 'externalMutations', 'residue', 'legacyAttempted', 'nextPhase', 'pending')
    if ($result.id -ne $Id -or @($result.PSObject.Properties.Name | Where-Object { $allowed -notcontains $_ }).Count -ne 0) { Stop-Sanitized036M 'CHILD_PROTOCOL_REFUSED' }
    if ($result.state -in @('unchanged-blocking', 'blocked-material', 'failed-sanitized')) { Stop-Sanitized036M 'PROTECTED_WINDOW_BLOCKED' }
    [Console]::Out.WriteLine(($result | ConvertTo-Json -Compress -Depth 8))
    return $result
}

function New-ControllerChild036M([string]$NodePath, [string]$HelperPath, [string]$Mode = 'protected-window-child') {
    $start = [Diagnostics.ProcessStartInfo]::new()
    $start.FileName = $NodePath
    $start.Arguments = '"' + $HelperPath.Replace('"', '\"') + '" ' + $Mode
    $start.UseShellExecute = $false
    $start.CreateNoWindow = $true
    $start.RedirectStandardInput = $true
    $start.RedirectStandardOutput = $true
    $start.RedirectStandardError = $true
    $start.WorkingDirectory = $expectedRoot
    $process = [Diagnostics.Process]::new()
    $process.StartInfo = $start
    if (-not $process.Start()) { Stop-Sanitized036M 'HELPER_REFUSED' }
    $stderrBuffer = [byte[]]::new(4097)
    $stderrRead = $process.StandardError.BaseStream.ReadAsync($stderrBuffer, 0, $stderrBuffer.Length)
    $process | Add-Member -MemberType NoteProperty -Name StderrRead036M -Value $stderrRead
    return $process
}

function Confirm-Finite036M([string]$Prompt) {
    $answer = Read-Host -Prompt ($Prompt + ' [yes/no]')
    if ($answer -notin @('yes', 'no')) { Stop-Sanitized036M 'PROTECTED_WINDOW_BLOCKED' }
    return $answer -eq 'yes'
}

if ($Operation -ne 'SelfTest' -and (-not [Environment]::UserInteractive -or [Console]::IsInputRedirected -or [Console]::IsOutputRedirected -or $Host.Name -ne 'ConsoleHost')) { Stop-Sanitized036M 'NON_INTERACTIVE_REFUSED' }
if (Test-Transcription036M) { Stop-Sanitized036M 'TRANSCRIPTION_REFUSED' }

$root = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($root)) { Stop-Sanitized036M 'GIT_REFUSED' }
$root = [IO.Path]::GetFullPath($root.Trim())
if ($root -ne $expectedRoot) { Stop-Sanitized036M 'ROOT_REFUSED' }
$head = (& git -C $root rev-parse HEAD 2>$null).Trim()
$branch = (& git -C $root branch --show-current 2>$null).Trim()
if ($LASTEXITCODE -ne 0 -or $head -ne $expectedHead -or $branch -ne $expectedBranch) { Stop-Sanitized036M 'GIT_REFUSED' }
$conflicts = @(& git -c core.safecrlf=false -C $root diff --name-only --diff-filter=U 2>$null)
if ($LASTEXITCODE -ne 0 -or $conflicts.Count -ne 0) { Stop-Sanitized036M 'CONFLICT_REFUSED' }

$helperPath = Join-Path $root $helper
if (-not (Test-Path -LiteralPath $helperPath -PathType Leaf)) { Stop-Sanitized036M 'HELPER_REFUSED' }
$node = Get-Command node -CommandType Application -ErrorAction SilentlyContinue
if ($null -eq $node) { Stop-Sanitized036M 'HELPER_REFUSED' }
$mode = if ($Operation -eq 'SelfTest') { 'self-test' } elseif ($Operation -eq 'CapabilityGate') { 'capability-gate' } else { 'protected-window-child' }

if ($Operation -eq 'SelfTest') {
    $testChild = New-ControllerChild036M $node.Source $helperPath 'stderr-canary-test'
    try {
        $testChild.StandardInput.Close()
        $stdout = $testChild.StandardOutput.ReadToEnd()
        $testChild.WaitForExit()
        $stderrBytes = $testChild.StderrRead036M.GetAwaiter().GetResult()
        if ($testChild.ExitCode -ne 0 -or $stderrBytes -le 0 -or $stderrBytes -gt 4096 -or $stdout.Contains('transport-private-canary')) { Stop-Sanitized036M 'CHILD_PROTOCOL_REFUSED' }
        [Console]::Out.WriteLine('{"state":"pass","transport":"stderr-captured-sanitized","externalMutations":0}')
        exit 0
    }
    finally { if ($null -ne $testChild) { $testChild.Dispose() }; $stdout = $null }
}

if ($Operation -eq 'ProtectedWindow') {
    $mutex = [Threading.Mutex]::new($false, 'Local\PrecisionPerformance-036M-ProtectedWindow-v1')
    if (-not $mutex.WaitOne(0)) { $mutex.Dispose(); Stop-Sanitized036M 'CONCURRENT_WINDOW_REFUSED' }
    $marker = Join-Path ([IO.Path]::GetTempPath()) '036M-protected-window-consumed-v1.marker'
    if (Test-Path -LiteralPath $marker) { $mutex.ReleaseMutex(); $mutex.Dispose(); Stop-Sanitized036M 'SECOND_WINDOW_REFUSED' }
    $markerStream = $null
    $child = $null
    try {
        $markerStream = [IO.File]::Open($marker, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write, [IO.FileShare]::None)
        $markerStream.WriteByte(1)
        $markerStream.Flush($true)
        $markerStream.Dispose()
        $markerStream = $null
        $child = New-ControllerChild036M $node.Source $helperPath
        $id = 1
        $baselinePayload = @{
            projectRef = Read-Masked036M 'Exact Supabase project reference'
            managementToken = Read-Masked036M 'Scoped Supabase Management token'
            originalPublicBinding = Read-Masked036M 'Original public Supabase binding'
            originalServiceBinding = Read-Masked036M 'Original server Supabase binding'
            operatorUserJwt = Read-Masked036M 'Existing authorized operator user session JWT for zero-business probe'
            originalAliasDeployment = Read-Masked036M 'Original fixed-five alias deployment identifier'
        }
        Send-ChildRequest036M $child $id 'baseline' $baselinePayload | Out-Null; $id++
        Send-ChildRequest036M $child $id 'pair-prepare' @{ approvePair = Confirm-Finite036M 'Approve exact publishable/named-secret pair preparation' } | Out-Null; $id++
        Send-ChildRequest036M $child $id 'bindings-candidate-probes' @{ approveProduction = Confirm-Finite036M 'Approve exact-source candidate, three bindings, probes and fixed aliases' } | Out-Null; $id++
        Send-ChildRequest036M $child $id 'legacy-deactivate-readback' @{ step = 'preflight' } | Out-Null; $id++
        Send-ChildRequest036M $child $id 'legacy-deactivate-readback' @{ step = 'attempt'; approveLegacyDeactivation = Confirm-Finite036M 'Approve irreversible legacy API-key deactivation' } | Out-Null; $id++
        Send-ChildRequest036M $child $id 'legacy-deactivate-readback' @{ step = 'old-deployment-readback' } | Out-Null; $id++
        Send-ChildRequest036M $child $id 'credential-dispositions' @{} | Out-Null; $id++
        $identityPayload = @{}
        foreach ($ordinal in 1..2) {
            $identityPayload["identity$($ordinal)AuthId"] = Read-Masked036M "Identity $ordinal exact Auth ID"
            $identityPayload["identity$($ordinal)Address"] = Read-Masked036M "Identity $ordinal exact address identity"
            $identityPayload["identity$($ordinal)Decision"] = Read-Host -Prompt "Identity $ordinal decision [retain-real/delete-obsolete/unresolved]"
            $identityPayload["identity$($ordinal)Session"] = Read-Masked036M "Identity $ordinal exact normal-session access token, or protected unavailable marker"
        }
        foreach ($graphOrdinal in 1..8) {
            $identityPayload["trainerGraph$($graphOrdinal)"] = Read-Masked036M "Exact synthetic trainer graph ID $graphOrdinal"
        }
        $trainerOrdinal = 1
        $identityPayload['trainerAuthId'] = Read-Masked036M 'Exact real trainer Auth ID'
        $identityPayload['trainerOwnerApproved'] = Confirm-Finite036M 'Owner approves this exact Auth identity as the one real trainer'
        Send-ChildRequest036M $child $id 'identity-dispositions' $identityPayload | Out-Null; $id++
        Send-ChildRequest036M $child $id 'trainer-prepare-deliver' @{ step = 'prepare'; trainerOrdinal = $trainerOrdinal } | Out-Null; $id++
        Send-ChildRequest036M $child $id 'trainer-prepare-deliver' @{
            step = 'deliver'
            trainerOrdinal = $trainerOrdinal
            messageObserved = Confirm-Finite036M 'Trainer pressed Send exactly once in phone UI'
            verificationObserved = Confirm-Finite036M 'Trainer submitted received code exactly once in phone UI'
        } | Out-Null; $id++
        $journey = @{}
        foreach ($name in @('portal','dashboard','syntheticHorse','noSubmitReview','wrongHorseDenied','signOut','signedOutDenied','anonymousDenied')) {
            $journey[$name] = Confirm-Finite036M "Trainer phone observation: $name"
        }
        Send-ChildRequest036M $child $id 'trainer-observe-cleanup' $journey | Out-Null; $id++
        Send-ChildRequest036M $child $id 'final-readback' @{ approveFinalReadback = $true } | Out-Null
        $child.StandardInput.Close()
        $child.WaitForExit()
        if ($child.ExitCode -ne 0) { Stop-Sanitized036M 'HELPER_FAILED_SANITIZED' }
        $stderrBytes = $child.StderrRead036M.GetAwaiter().GetResult()
        if ($stderrBytes -ne 0) { Stop-Sanitized036M 'CHILD_PROTOCOL_REFUSED' }
        exit 0
    }
    catch { Stop-Sanitized036M 'HELPER_FAILED_SANITIZED' }
    finally {
        if ($null -ne $markerStream) { $markerStream.Dispose() }
        if ($null -ne $child -and -not $child.HasExited) { $child.Kill($true) }
        if ($null -ne $child) { $child.Dispose() }
        try { $mutex.ReleaseMutex() } catch {}
        $mutex.Dispose()
    }
}
try {
    & $node.Source $helperPath $mode
    exit $LASTEXITCODE
}
catch {
    Stop-Sanitized036M 'HELPER_FAILED_SANITIZED'
}
