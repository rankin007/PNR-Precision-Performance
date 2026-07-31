[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('Prepare')]
    [string]$Operation
)

$ErrorActionPreference = 'Stop'
$expectedBranch = 'codex/035F-resend-hosted-integration-and-trainer-pilot-completion'
$expectedRemote = 'https://github.com/rankin007/PNR-Precision-Performance.git'
$expectedProjectUrl = 'https://uvskssaecdhxcgytkasc.supabase.co/'
$helperRelativePath = 'scripts/protected-synthetic-otp-035D.mjs'
$ledgerPath = Join-Path ([IO.Path]::GetTempPath()) 'pnr-035d-synthetic-otp-owned.json'
$allowedCodes = @(
    'NONE', 'NON_INTERACTIVE_REFUSED', 'TRANSCRIPTION_REFUSED', 'BRANCH_REFUSED',
    'REMOTE_HEAD_UNAVAILABLE', 'REMOTE_HEAD_MISMATCH', 'CONFLICT_REFUSED',
    'HELPER_MISSING', 'NODE_MISSING', 'OPEN_LEDGER_REFUSED', 'SECRET_INPUT_CANCELLED',
    'HELPER_CONTRACT_REFUSED', 'HELPER_FAILED_SANITIZED', 'OWNERSHIP_AMBIGUOUS',
    'PROTECTED_OUTPUT_REFUSED', 'UNEXPECTED'
)

function Write-SanitizedResult035F {
    param(
        [ValidateSet('prepared', 'blocked', 'failed-sanitized')][string]$State,
        [ValidateSet(0, 1)][int]$AuthCount,
        [bool]$Confirmed,
        [ValidateSet('exact-owned', 'none', 'ambiguous')][string]$Ownership,
        [string]$Code
    )
    if ($allowedCodes -notcontains $Code) { $Code = 'UNEXPECTED' }
    @(
        "state=$State"
        "authCount=$AuthCount"
        'preparationEmail=false'
        "confirmed=$($Confirmed.ToString().ToLowerInvariant())"
        "ownership=$Ownership"
        "code=$Code"
    ) | ForEach-Object { [Console]::Out.WriteLine($_) }
}

function Stop-Wrapper035F([string]$Code, [string]$Ownership = 'none') {
    $state = if ($Code -in @('NON_INTERACTIVE_REFUSED', 'TRANSCRIPTION_REFUSED', 'OPEN_LEDGER_REFUSED')) { 'blocked' } else { 'failed-sanitized' }
    $owned = if ($Ownership -eq 'ambiguous') { 'ambiguous' } else { 'none' }
    Write-SanitizedResult035F -State $state -AuthCount 0 -Confirmed $false -Ownership $owned -Code $Code
    exit 2
}

function Test-Transcription035F {
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

if ($Operation -ne 'Prepare') { Stop-Wrapper035F 'UNEXPECTED' }
if (-not [Environment]::UserInteractive -or [Console]::IsInputRedirected -or [Console]::IsOutputRedirected -or $Host.Name -ne 'ConsoleHost') {
    Stop-Wrapper035F 'NON_INTERACTIVE_REFUSED'
}
if (Test-Transcription035F) { Stop-Wrapper035F 'TRANSCRIPTION_REFUSED' }
if ([Environment]::GetEnvironmentVariable('PP035D_SERVICE_ROLE_KEY', 'Process')) { Stop-Wrapper035F 'PROTECTED_OUTPUT_REFUSED' }
if (Test-Path -LiteralPath $ledgerPath) { Stop-Wrapper035F 'OPEN_LEDGER_REFUSED' 'ambiguous' }

$repoRoot = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($repoRoot)) { Stop-Wrapper035F 'BRANCH_REFUSED' }
$repoRoot = [IO.Path]::GetFullPath($repoRoot.Trim())
$branch = (& git -C $repoRoot branch --show-current 2>$null).Trim()
if ($LASTEXITCODE -ne 0 -or $branch -ne $expectedBranch) { Stop-Wrapper035F 'BRANCH_REFUSED' }
$conflicts = @(& git -C $repoRoot diff --name-only --diff-filter=U 2>$null)
if ($LASTEXITCODE -ne 0 -or $conflicts.Count -ne 0) { Stop-Wrapper035F 'CONFLICT_REFUSED' }
$head = (& git -C $repoRoot rev-parse HEAD 2>$null).Trim()
$remoteLine = @(& git ls-remote $expectedRemote "refs/heads/$expectedBranch" 2>$null)
if ($LASTEXITCODE -ne 0 -or $remoteLine.Count -ne 1) { Stop-Wrapper035F 'REMOTE_HEAD_UNAVAILABLE' }
$remoteHead = (($remoteLine[0] -split '\s+')[0]).Trim()
if ($head -ne $remoteHead) { Stop-Wrapper035F 'REMOTE_HEAD_MISMATCH' }

$helperPath = Join-Path $repoRoot $helperRelativePath
if (-not (Test-Path -LiteralPath $helperPath -PathType Leaf)) { Stop-Wrapper035F 'HELPER_MISSING' }
$node = Get-Command node -CommandType Application -ErrorAction SilentlyContinue
if ($null -eq $node) { Stop-Wrapper035F 'NODE_MISSING' }

$helperSource = Get-Content -LiteralPath $helperPath -Raw
$requiredContracts = @(
    'uvskssaecdhxcgytkasc', 'PP035D_SUPABASE_URL', 'PP035D_SERVICE_ROLE_KEY',
    'PP035D_RUN', 'createdWithoutEmail: true', 'preparationEmailSent: false',
    '--prepare', 'exactEmailMatch', 'normalizeExactEmail'
)
foreach ($contract in $requiredContracts) {
    if (-not $helperSource.Contains($contract)) { Stop-Wrapper035F 'HELPER_CONTRACT_REFUSED' }
}
$helperSource = $null

$run = '035D-035F-' + ([Guid]::NewGuid().ToString('N').Substring(0, 12).ToUpperInvariant())
$serviceSecure = $null
$serviceBstr = [IntPtr]::Zero
$servicePlain = $null
$startInfo = $null
$child = $null
$exitCode = 2

try {
    $serviceSecure = Read-Host 'Protected Supabase service-role value' -AsSecureString
    if ($null -eq $serviceSecure -or $serviceSecure.Length -eq 0) { throw 'SECRET_INPUT_CANCELLED' }
    $serviceBstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($serviceSecure)
    $servicePlain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($serviceBstr)
    if ([string]::IsNullOrWhiteSpace($servicePlain)) { throw 'SECRET_INPUT_CANCELLED' }

    $startInfo = [Diagnostics.ProcessStartInfo]::new()
    $startInfo.FileName = $node.Source
    $startInfo.Arguments = "`"$helperPath`" --prepare"
    $startInfo.WorkingDirectory = $repoRoot
    $startInfo.UseShellExecute = $false
    $startInfo.RedirectStandardInput = $false
    $startInfo.RedirectStandardOutput = $false
    $startInfo.RedirectStandardError = $false
    $startInfo.EnvironmentVariables['PP035D_SUPABASE_URL'] = $expectedProjectUrl
    $startInfo.EnvironmentVariables['PP035D_RUN'] = $run
    $startInfo.EnvironmentVariables['PP035D_SERVICE_ROLE_KEY'] = $servicePlain

    $child = [Diagnostics.Process]::new()
    $child.StartInfo = $startInfo
    if (-not $child.Start()) { throw 'HELPER_FAILED_SANITIZED' }
    $startInfo.EnvironmentVariables.Remove('PP035D_SERVICE_ROLE_KEY')
    $startInfo.EnvironmentVariables.Remove('PP035D_SUPABASE_URL')
    $startInfo.EnvironmentVariables.Remove('PP035D_RUN')
    $servicePlain = $null
    $child.WaitForExit()
    $exitCode = $child.ExitCode
}
catch {
    $safeCode = if ($_.Exception.Message -in $allowedCodes) { $_.Exception.Message } else { 'HELPER_FAILED_SANITIZED' }
    Write-SanitizedResult035F -State 'failed-sanitized' -AuthCount 0 -Confirmed $false -Ownership 'none' -Code $safeCode
    exit 2
}
finally {
    if ($null -ne $startInfo) {
        $startInfo.EnvironmentVariables.Remove('PP035D_SERVICE_ROLE_KEY')
        $startInfo.EnvironmentVariables.Remove('PP035D_SUPABASE_URL')
        $startInfo.EnvironmentVariables.Remove('PP035D_RUN')
    }
    [Environment]::SetEnvironmentVariable('PP035D_SERVICE_ROLE_KEY', $null, 'Process')
    [Environment]::SetEnvironmentVariable('PP035D_SUPABASE_URL', $null, 'Process')
    [Environment]::SetEnvironmentVariable('PP035D_RUN', $null, 'Process')
    $servicePlain = $null
    if ($serviceBstr -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($serviceBstr)
        $serviceBstr = [IntPtr]::Zero
    }
    if ($null -ne $serviceSecure) { $serviceSecure.Dispose(); $serviceSecure = $null }
    if ($null -ne $child) { $child.Dispose(); $child = $null }
    $startInfo = $null
}

if ($exitCode -ne 0 -or -not (Test-Path -LiteralPath $ledgerPath -PathType Leaf)) {
    Write-SanitizedResult035F -State 'failed-sanitized' -AuthCount 0 -Confirmed $false -Ownership 'none' -Code 'HELPER_FAILED_SANITIZED'
    exit 2
}

try {
    $ledger = Get-Content -LiteralPath $ledgerPath -Raw | ConvertFrom-Json
    $keys = @($ledger.PSObject.Properties.Name | Sort-Object)
    $expectedKeys = @('authId', 'createdWithoutEmail', 'emailHash', 'project', 'run')
    if (Compare-Object $expectedKeys $keys) { Stop-Wrapper035F 'OWNERSHIP_AMBIGUOUS' 'ambiguous' }
    if ($ledger.project -ne 'uvskssaecdhxcgytkasc' -or $ledger.run -ne $run -or $ledger.createdWithoutEmail -ne $true) {
        Stop-Wrapper035F 'OWNERSHIP_AMBIGUOUS' 'ambiguous'
    }
    if ($ledger.authId -notmatch '^[0-9a-f-]{36}$' -or $ledger.emailHash -notmatch '^[0-9a-f]{64}$') {
        Stop-Wrapper035F 'OWNERSHIP_AMBIGUOUS' 'ambiguous'
    }
    Write-SanitizedResult035F -State 'prepared' -AuthCount 1 -Confirmed $true -Ownership 'exact-owned' -Code 'NONE'
}
catch {
    Stop-Wrapper035F 'OWNERSHIP_AMBIGUOUS' 'ambiguous'
}

