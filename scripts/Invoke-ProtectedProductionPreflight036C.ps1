[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('SelfTest', 'ProviderConfig', 'RetainedPilotVerify')]
    [string]$Operation
)

$ErrorActionPreference = 'Stop'
$expectedRoot = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
$expectedBranch = 'codex/036C-protected-production-preflight-and-live-trainer-acceptance'
$expectedProjectUrl = 'https://uvskssaecdhxcgytkasc.supabase.co/'
$expected035KSha256 = '603FF16B9F6EB30D2B5E26A39218E8307731D66008D4D384FB9696095CD3AB5A'
$providerRelativePath = 'scripts/protected-production-preflight-036C-core.mjs'
$testRelativePath = 'scripts/test-protected-production-preflight-036C.mjs'
$pilotRelativePath = 'scripts/live-trainer-access-035K-core.mjs'
$protectedNames = @('PP036C_MANAGEMENT_API_TOKEN', 'PP035K_SERVICE_ROLE_KEY')
$allowedCodes = @(
    'BRANCH_REFUSED', 'CONFLICT_REFUSED', 'HELPER_CONTRACT_REFUSED', 'HELPER_FAILED_SANITIZED',
    'HELPER_MISSING', 'NODE_MISSING', 'NON_INTERACTIVE_REFUSED', 'PROTECTED_ENVIRONMENT_REFUSED',
    'SECRET_INPUT_CANCELLED', 'SELF_TEST_FAILED', 'TRANSCRIPTION_REFUSED', 'UNEXPECTED',
    'WORKSPACE_REFUSED'
)

function Write-SanitizedStop036C([string]$Code) {
    if ($allowedCodes -notcontains $Code) { $Code = 'UNEXPECTED' }
    [Console]::Out.WriteLine('state=failed-sanitized')
    [Console]::Out.WriteLine("code=$Code")
    exit 2
}

function Test-Transcription036C {
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

$currentRoot = [IO.Path]::GetFullPath((Get-Location).Path).TrimEnd('\')
$gitRoot = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($gitRoot)) { Write-SanitizedStop036C 'WORKSPACE_REFUSED' }
$gitRoot = [IO.Path]::GetFullPath($gitRoot.Trim()).TrimEnd('\')
if ($currentRoot -cne $expectedRoot -or $gitRoot -cne $expectedRoot) { Write-SanitizedStop036C 'WORKSPACE_REFUSED' }

$branch = (& git -C $gitRoot branch --show-current 2>$null).Trim()
if ($LASTEXITCODE -ne 0 -or $branch -cne $expectedBranch) { Write-SanitizedStop036C 'BRANCH_REFUSED' }
$conflicts = @(& git -c core.safecrlf=false -C $gitRoot diff --name-only --diff-filter=U 2>$null)
if ($LASTEXITCODE -ne 0 -or $conflicts.Count -ne 0) { Write-SanitizedStop036C 'CONFLICT_REFUSED' }

$providerPath = Join-Path $gitRoot $providerRelativePath
$testPath = Join-Path $gitRoot $testRelativePath
$pilotPath = Join-Path $gitRoot $pilotRelativePath
foreach ($path in @($providerPath, $testPath, $pilotPath)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { Write-SanitizedStop036C 'HELPER_MISSING' }
}
$node = Get-Command node -CommandType Application -ErrorAction SilentlyContinue
if ($null -eq $node) { Write-SanitizedStop036C 'NODE_MISSING' }

$pilotHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $pilotPath).Hash
if ($pilotHash -cne $expected035KSha256) { Write-SanitizedStop036C 'HELPER_CONTRACT_REFUSED' }
$pilotSource = Get-Content -Raw -LiteralPath $pilotPath
foreach ($contract in @(
    'uvskssaecdhxcgytkasc', 'tagnbgkroihagjmvehlx', 'PP035K_SUPABASE_URL',
    'PP035K_SERVICE_ROLE_KEY', 'hiddenInput', 'getUserById', '--verify',
    'FIXTURE_AGREEMENT_FAILED', 'wrongHorseRows'
)) {
    if (-not $pilotSource.Contains($contract)) { Write-SanitizedStop036C 'HELPER_CONTRACT_REFUSED' }
}
if ($pilotSource.Contains('listUsers') -or $pilotSource.Contains('perPage')) { Write-SanitizedStop036C 'HELPER_CONTRACT_REFUSED' }
$pilotSource = $null

if ($Operation -eq 'SelfTest') {
    & $node.Source $testPath
    if ($LASTEXITCODE -ne 0) { Write-SanitizedStop036C 'SELF_TEST_FAILED' }
    & $node.Source $providerPath '--self-test'
    if ($LASTEXITCODE -ne 0) { Write-SanitizedStop036C 'SELF_TEST_FAILED' }
    [Console]::Out.WriteLine('state=pass')
    [Console]::Out.WriteLine('mode=self-test')
    [Console]::Out.WriteLine('protectedValuesEmitted=false')
    [Console]::Out.WriteLine('remoteMutation=none')
    exit 0
}

if (
    -not [Environment]::UserInteractive -or
    [Console]::IsInputRedirected -or
    [Console]::IsOutputRedirected -or
    [Console]::IsErrorRedirected -or
    $Host.Name -cne 'ConsoleHost'
) { Write-SanitizedStop036C 'NON_INTERACTIVE_REFUSED' }
if (Test-Transcription036C) { Write-SanitizedStop036C 'TRANSCRIPTION_REFUSED' }
foreach ($name in $protectedNames) {
    if ([Environment]::GetEnvironmentVariable($name, 'Process')) { Write-SanitizedStop036C 'PROTECTED_ENVIRONMENT_REFUSED' }
}

$secureValue = $null
$protectedBstr = [IntPtr]::Zero
$protectedPlain = $null
$startInfo = $null
$child = $null
$childExitCode = 2

try {
    if ($Operation -eq 'ProviderConfig') {
        $secureValue = Read-Host 'Protected Supabase Management API bearer credential' -AsSecureString
    } else {
        $secureValue = Read-Host 'Protected Supabase service-role value' -AsSecureString
    }
    if ($null -eq $secureValue -or $secureValue.Length -eq 0) { throw 'SECRET_INPUT_CANCELLED' }
    $protectedBstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureValue)
    $protectedPlain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($protectedBstr)
    if ([string]::IsNullOrWhiteSpace($protectedPlain)) { throw 'SECRET_INPUT_CANCELLED' }

    $startInfo = [Diagnostics.ProcessStartInfo]::new()
    $startInfo.FileName = $node.Source
    $startInfo.WorkingDirectory = $gitRoot
    $startInfo.UseShellExecute = $false
    $startInfo.RedirectStandardInput = $false
    $startInfo.RedirectStandardOutput = $false
    $startInfo.RedirectStandardError = $false
    foreach ($name in $protectedNames) { $startInfo.EnvironmentVariables.Remove($name) }

    if ($Operation -eq 'ProviderConfig') {
        $startInfo.Arguments = "`"$providerPath`" --provider-config"
        $startInfo.EnvironmentVariables['PP036C_MANAGEMENT_API_TOKEN'] = $protectedPlain
    } else {
        $run = '035K-' + ([Guid]::NewGuid().ToString('N').Substring(0, 12).ToUpperInvariant())
        $startInfo.Arguments = "`"$pilotPath`" --verify"
        $startInfo.EnvironmentVariables['PP035K_SUPABASE_URL'] = $expectedProjectUrl
        $startInfo.EnvironmentVariables['PP035K_RUN'] = $run
        $startInfo.EnvironmentVariables['PP035K_SERVICE_ROLE_KEY'] = $protectedPlain
    }

    $child = [Diagnostics.Process]::new()
    $child.StartInfo = $startInfo
    if (-not $child.Start()) { throw 'HELPER_FAILED_SANITIZED' }
    foreach ($name in $protectedNames) { $startInfo.EnvironmentVariables.Remove($name) }
    $protectedPlain = $null
    $child.WaitForExit()
    $childExitCode = $child.ExitCode
}
catch {
    $safeCode = if ($_.Exception.Message -in $allowedCodes) { $_.Exception.Message } else { 'HELPER_FAILED_SANITIZED' }
    Write-SanitizedStop036C $safeCode
}
finally {
    if ($null -ne $startInfo) {
        foreach ($name in @($protectedNames + @('PP035K_SUPABASE_URL', 'PP035K_RUN'))) {
            $startInfo.EnvironmentVariables.Remove($name)
        }
    }
    foreach ($name in @($protectedNames + @('PP035K_SUPABASE_URL', 'PP035K_RUN'))) {
        [Environment]::SetEnvironmentVariable($name, $null, 'Process')
    }
    $protectedPlain = $null
    if ($protectedBstr -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($protectedBstr) }
    if ($null -ne $secureValue) { $secureValue.Dispose() }
    if ($null -ne $child) { $child.Dispose() }
}

exit $childExitCode
