[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('SelfTest', 'Prepare', 'Verify', 'Retain', 'Cleanup')]
    [string]$Operation
)

$ErrorActionPreference = 'Stop'
$allowedBranches = @(
    'codex/035K-live-trainer-access-and-human-acceptance',
    'codex/036G-immediate-trainer-access-recovery-and-minimal-production-cutover'
)
$expectedProjectUrl = 'https://uvskssaecdhxcgytkasc.supabase.co/'
$helperRelativePath = 'scripts/live-trainer-access-035K-core.mjs'
$protectedOperations = @('Prepare', 'Verify', 'Cleanup')
$allowedCodes = @(
    'NONE', 'NON_INTERACTIVE_REFUSED', 'TRANSCRIPTION_REFUSED', 'BRANCH_REFUSED',
    'CONFLICT_REFUSED', 'HELPER_MISSING', 'NODE_MISSING', 'SECRET_INPUT_CANCELLED',
    'HELPER_CONTRACT_REFUSED', 'OPEN_LEDGER_REFUSED', 'OWNERSHIP_LEDGER_MISSING',
    'OWNERSHIP_LEDGER_INVALID', 'PROTECTED_OUTPUT_REFUSED', 'HELPER_FAILED_SANITIZED',
    'UNEXPECTED'
)

function Write-SanitizedStop035K([string]$Code) {
    if ($allowedCodes -notcontains $Code) { $Code = 'UNEXPECTED' }
    [Console]::Out.WriteLine("state=failed-sanitized")
    [Console]::Out.WriteLine("code=$Code")
    exit 2
}

function Test-Transcription035K {
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
    Write-SanitizedStop035K 'NON_INTERACTIVE_REFUSED'
}
if (Test-Transcription035K) { Write-SanitizedStop035K 'TRANSCRIPTION_REFUSED' }
if ([Environment]::GetEnvironmentVariable('PP035K_SERVICE_ROLE_KEY', 'Process')) { Write-SanitizedStop035K 'PROTECTED_OUTPUT_REFUSED' }

$repoRoot = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($repoRoot)) { Write-SanitizedStop035K 'BRANCH_REFUSED' }
$repoRoot = [IO.Path]::GetFullPath($repoRoot.Trim())
$branch = (& git -C $repoRoot branch --show-current 2>$null).Trim()
if ($LASTEXITCODE -ne 0 -or $allowedBranches -notcontains $branch) { Write-SanitizedStop035K 'BRANCH_REFUSED' }
$conflicts = @(& git -c core.safecrlf=false -C $repoRoot diff --name-only --diff-filter=U 2>$null)
if ($LASTEXITCODE -ne 0 -or $conflicts.Count -ne 0) { Write-SanitizedStop035K 'CONFLICT_REFUSED' }

$helperPath = Join-Path $repoRoot $helperRelativePath
if (-not (Test-Path -LiteralPath $helperPath -PathType Leaf)) { Write-SanitizedStop035K 'HELPER_MISSING' }
$node = Get-Command node -CommandType Application -ErrorAction SilentlyContinue
if ($null -eq $node) { Write-SanitizedStop035K 'NODE_MISSING' }
$helperSource = Get-Content -LiteralPath $helperPath -Raw
foreach ($contract in @(
    'uvskssaecdhxcgytkasc', 'tagnbgkroihagjmvehlx', 'PP035K_SUPABASE_URL',
    'PP035K_SERVICE_ROLE_KEY', 'hiddenInput', 'getUserById', 'horse.records.write',
    '--prepare', '--verify', '--retain', '--cleanup', 'auth-last-if-created'
)) {
    if (-not $helperSource.Contains($contract)) { Write-SanitizedStop035K 'HELPER_CONTRACT_REFUSED' }
}
$helperSource = $null

$mode = if ($Operation -eq 'SelfTest') { '--self-test' } else { '--' + $Operation.ToLowerInvariant() }
$run = '035K-' + ([Guid]::NewGuid().ToString('N').Substring(0, 12).ToUpperInvariant())
$serviceSecure = $null
$serviceBstr = [IntPtr]::Zero
$servicePlain = $null
$startInfo = $null
$child = $null

try {
    if ($protectedOperations -contains $Operation) {
        $serviceSecure = Read-Host 'Protected Supabase service-role value' -AsSecureString
        if ($null -eq $serviceSecure -or $serviceSecure.Length -eq 0) { throw 'SECRET_INPUT_CANCELLED' }
        $serviceBstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($serviceSecure)
        $servicePlain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($serviceBstr)
        if ([string]::IsNullOrWhiteSpace($servicePlain)) { throw 'SECRET_INPUT_CANCELLED' }
    }

    $startInfo = [Diagnostics.ProcessStartInfo]::new()
    $startInfo.FileName = $node.Source
    $startInfo.Arguments = "`"$helperPath`" $mode"
    $startInfo.WorkingDirectory = $repoRoot
    $startInfo.UseShellExecute = $false
    $startInfo.RedirectStandardInput = $false
    $startInfo.RedirectStandardOutput = $false
    $startInfo.RedirectStandardError = $false
    $startInfo.EnvironmentVariables['PP035K_SUPABASE_URL'] = $expectedProjectUrl
    $startInfo.EnvironmentVariables['PP035K_RUN'] = $run
    if ($null -ne $servicePlain) { $startInfo.EnvironmentVariables['PP035K_SERVICE_ROLE_KEY'] = $servicePlain }

    $child = [Diagnostics.Process]::new()
    $child.StartInfo = $startInfo
    if (-not $child.Start()) { throw 'HELPER_FAILED_SANITIZED' }
    $startInfo.EnvironmentVariables.Remove('PP035K_SERVICE_ROLE_KEY')
    $servicePlain = $null
    $child.WaitForExit()
    exit $child.ExitCode
}
catch {
    $safeCode = if ($_.Exception.Message -in $allowedCodes) { $_.Exception.Message } else { 'HELPER_FAILED_SANITIZED' }
    Write-SanitizedStop035K $safeCode
}
finally {
    if ($null -ne $startInfo) {
        $startInfo.EnvironmentVariables.Remove('PP035K_SERVICE_ROLE_KEY')
        $startInfo.EnvironmentVariables.Remove('PP035K_SUPABASE_URL')
        $startInfo.EnvironmentVariables.Remove('PP035K_RUN')
    }
    [Environment]::SetEnvironmentVariable('PP035K_SERVICE_ROLE_KEY', $null, 'Process')
    [Environment]::SetEnvironmentVariable('PP035K_SUPABASE_URL', $null, 'Process')
    [Environment]::SetEnvironmentVariable('PP035K_RUN', $null, 'Process')
    $servicePlain = $null
    if ($serviceBstr -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($serviceBstr) }
    if ($null -ne $serviceSecure) { $serviceSecure.Dispose() }
    if ($null -ne $child) { $child.Dispose() }
}
