[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('A', 'B', 'C')]
    [string]$Alias,
    [Parameter(Mandatory = $true)]
    [ValidateSet('Apply', 'Contain', 'Verify')]
    [string]$Operation
)

$ErrorActionPreference = 'Stop'
$expectedBranch = 'codex/035C-trainer-participation-and-final-mvp-acceptance'
$expectedRemote = 'https://github.com/rankin007/PNR-Precision-Performance.git'
$expectedProjectUrl = 'https://uvskssaecdhxcgytkasc.supabase.co'
$helperRelativePath = 'scripts/supabase-participant-handoff-035C.mjs'
$serviceVariable = 'PP035C_SERVICE_ROLE_KEY'
$urlVariable = 'PP035C_SUPABASE_URL'

function Stop-Handoff035C([string]$Code) {
    [Console]::Error.WriteLine($Code)
    exit 2
}

function Test-Transcription035C {
    foreach ($scope in @('Global', 'Script')) {
        if (Get-Variable -Name Transcript -Scope $scope -ErrorAction SilentlyContinue) { return $true }
    }
    foreach ($policyPath in @(
        'HKLM:\Software\Policies\Microsoft\Windows\PowerShell\Transcription',
        'HKCU:\Software\Policies\Microsoft\Windows\PowerShell\Transcription'
    )) {
        $policy = Get-ItemProperty -LiteralPath $policyPath -ErrorAction SilentlyContinue
        if ($null -ne $policy -and $policy.EnableTranscripting -eq 1) { return $true }
    }
    return $false
}

if (-not [Environment]::UserInteractive -or [Console]::IsInputRedirected -or [Console]::IsOutputRedirected -or $Host.Name -ne 'ConsoleHost') {
    Stop-Handoff035C 'NON_INTERACTIVE_REFUSED'
}
if (Test-Transcription035C) { Stop-Handoff035C 'TRANSCRIPTION_REFUSED' }
if ($Operation -eq 'Contain' -and $Alias -ne 'A') { Stop-Handoff035C 'CONTAINMENT_ALIAS_REFUSED' }
if ([Environment]::GetEnvironmentVariable($serviceVariable, 'Process')) { Stop-Handoff035C 'PARENT_SECRET_ENV_REFUSED' }

$repoRoot = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($repoRoot)) { Stop-Handoff035C 'REPOSITORY_REFUSED' }
$repoRoot = [IO.Path]::GetFullPath($repoRoot.Trim())
$branch = (& git -C $repoRoot branch --show-current 2>$null).Trim()
if ($LASTEXITCODE -ne 0 -or $branch -ne $expectedBranch) { Stop-Handoff035C 'BRANCH_REFUSED' }
$head = (& git -C $repoRoot rev-parse HEAD 2>$null).Trim()
if ($LASTEXITCODE -ne 0 -or $head -notmatch '^[0-9a-f]{40}$') { Stop-Handoff035C 'HEAD_REFUSED' }
$remoteLine = (& git ls-remote $expectedRemote "refs/heads/$expectedBranch" 2>$null)
if ($LASTEXITCODE -ne 0 -or @($remoteLine).Count -ne 1) { Stop-Handoff035C 'REMOTE_HEAD_UNAVAILABLE' }
$remoteHead = (($remoteLine -split '\s+')[0]).Trim()
if ($head -ne $remoteHead) { Stop-Handoff035C 'HEAD_REFUSED' }
$dirty = (& git -C $repoRoot status --porcelain=v1 --untracked-files=all 2>$null)
if ($LASTEXITCODE -ne 0 -or @($dirty).Count -ne 0) { Stop-Handoff035C 'DIRTY_WORKTREE_REFUSED' }

$helperPath = Join-Path $repoRoot $helperRelativePath
if (-not (Test-Path -LiteralPath $helperPath -PathType Leaf)) { Stop-Handoff035C 'HELPER_MISSING' }
if ($expectedProjectUrl -ne 'https://uvskssaecdhxcgytkasc.supabase.co') { Stop-Handoff035C 'TARGET_REFUSED' }

$serviceSecure = $null
$serviceBstr = [IntPtr]::Zero
$servicePlain = $null
$startInfo = $null
$child = $null
$childExitCode = 2

try {
    $serviceSecure = Read-Host 'Protected Supabase service-role value' -AsSecureString
    if ($null -eq $serviceSecure -or $serviceSecure.Length -eq 0) { throw 'SECRET_INPUT_CANCELLED' }

    $serviceBstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($serviceSecure)
    $servicePlain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($serviceBstr)
    if ([string]::IsNullOrWhiteSpace($servicePlain)) { throw 'SECRET_INPUT_CANCELLED' }

    $startInfo = [Diagnostics.ProcessStartInfo]::new()
    $startInfo.FileName = 'node'
    $escapedHelperPath = $helperPath.Replace('"', '\"')
    $helperMode = if ($Operation -eq 'Contain') { '--contain-one' } elseif ($Operation -eq 'Verify') { '--verify-one' } else { '--apply-one' }
    $startInfo.Arguments = "`"$escapedHelperPath`" $helperMode $Alias"
    $startInfo.WorkingDirectory = $repoRoot
    $startInfo.UseShellExecute = $false
    $startInfo.RedirectStandardInput = $false
    $startInfo.RedirectStandardOutput = $false
    $startInfo.RedirectStandardError = $false
    $startInfo.EnvironmentVariables[$urlVariable] = $expectedProjectUrl
    $startInfo.EnvironmentVariables[$serviceVariable] = $servicePlain

    $child = [Diagnostics.Process]::new()
    $child.StartInfo = $startInfo
    if (-not $child.Start()) { throw 'CHILD_START_FAILED' }

    $startInfo.EnvironmentVariables.Remove($serviceVariable)
    $servicePlain = $null
    $child.WaitForExit()
    $childExitCode = $child.ExitCode
}
catch {
    [Console]::Error.WriteLine('HANDOFF_FAILED_SANITIZED')
    $childExitCode = 2
}
finally {
    if ($null -ne $startInfo) { $startInfo.EnvironmentVariables.Remove($serviceVariable) }
    [Environment]::SetEnvironmentVariable($serviceVariable, $null, 'Process')
    $servicePlain = $null
    if ($serviceBstr -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($serviceBstr)
        $serviceBstr = [IntPtr]::Zero
    }
    if ($null -ne $serviceSecure) {
        $serviceSecure.Dispose()
        $serviceSecure = $null
    }
    if ($null -ne $child) {
        $child.Dispose()
        $child = $null
    }
    $startInfo = $null
    $helperMode = $null
    $remoteLine = $null
    $remoteHead = $null
    $head = $null
}

exit $childExitCode
