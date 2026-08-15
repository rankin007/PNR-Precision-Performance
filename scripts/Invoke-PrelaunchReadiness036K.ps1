[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('SelfTest', 'CapabilityGate')]
    [string]$Operation
)

$ErrorActionPreference = 'Stop'
$expectedRoot = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
$expectedHead = 'd822c027c58ad88ec7472e35986e7a33d6a3d6c9'
$expectedBranch = 'codex/025B-versioned-domain-authority-package'
$helper = 'scripts/prelaunch-provider-036K.mjs'
$safeCodes = @('NONE', 'NON_INTERACTIVE_REFUSED', 'TRANSCRIPTION_REFUSED', 'ROOT_REFUSED', 'GIT_REFUSED', 'CONFLICT_REFUSED', 'HELPER_REFUSED', 'HELPER_FAILED_SANITIZED', 'UNEXPECTED')

function Stop-Sanitized036K([string]$Code) {
    if ($safeCodes -notcontains $Code) { $Code = 'UNEXPECTED' }
    [Console]::Out.WriteLine('{"state":"failed-sanitized","code":"' + $Code + '"}')
    exit 2
}

function Test-Transcription036K {
    foreach ($scope in @('Global', 'Script')) {
        if (Get-Variable -Name Transcript -Scope $scope -ErrorAction SilentlyContinue) { return $true }
    }
    foreach ($policyPath in @('HKLM:\Software\Policies\Microsoft\Windows\PowerShell\Transcription', 'HKCU:\Software\Policies\Microsoft\Windows\PowerShell\Transcription')) {
        $policy = Get-ItemProperty -LiteralPath $policyPath -ErrorAction SilentlyContinue
        if ($null -ne $policy -and $policy.EnableTranscripting -eq 1) { return $true }
    }
    return $false
}

if (-not [Environment]::UserInteractive -or [Console]::IsInputRedirected -or [Console]::IsOutputRedirected -or $Host.Name -ne 'ConsoleHost') { Stop-Sanitized036K 'NON_INTERACTIVE_REFUSED' }
if (Test-Transcription036K) { Stop-Sanitized036K 'TRANSCRIPTION_REFUSED' }

$root = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($root)) { Stop-Sanitized036K 'GIT_REFUSED' }
$root = [IO.Path]::GetFullPath($root.Trim())
if ($root -ne $expectedRoot) { Stop-Sanitized036K 'ROOT_REFUSED' }
$head = (& git -C $root rev-parse HEAD 2>$null).Trim()
$branch = (& git -C $root branch --show-current 2>$null).Trim()
if ($LASTEXITCODE -ne 0 -or $head -ne $expectedHead -or $branch -ne $expectedBranch) { Stop-Sanitized036K 'GIT_REFUSED' }
$conflicts = @(& git -C $root diff --name-only --diff-filter=U 2>$null)
if ($LASTEXITCODE -ne 0 -or $conflicts.Count -ne 0) { Stop-Sanitized036K 'CONFLICT_REFUSED' }

$helperPath = Join-Path $root $helper
if (-not (Test-Path -LiteralPath $helperPath -PathType Leaf)) { Stop-Sanitized036K 'HELPER_REFUSED' }
$node = Get-Command node -CommandType Application -ErrorAction SilentlyContinue
if ($null -eq $node) { Stop-Sanitized036K 'HELPER_REFUSED' }
$mode = if ($Operation -eq 'SelfTest') { 'self-test' } else { 'capability-gate' }

try {
    & $node.Source $helperPath $mode
    exit $LASTEXITCODE
}
catch {
    Stop-Sanitized036K 'HELPER_FAILED_SANITIZED'
}
