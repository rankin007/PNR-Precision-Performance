[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('SelfTest', 'ManagementLifecycle', 'RetainedPilotVerify')]
    [string]$Operation,

    [Parameter(Mandatory = $false)]
    [ValidateSet(
        '',
        'ClipboardClearFailureAfterCreation',
        'HelperStartFailure',
        'MissingCredentialAfterCreation',
        'RevocationConfirmationFailure',
        'InvalidationFailureNoRetry',
        'InvalidationFailureRetrySuccess',
        'InvalidationFailureRetryFailure',
        'CleanupEnvironmentProof',
        'ProtectedChildEnvironmentIsolation',
        'DecisionAccepted',
        'DecisionWrongKey',
        'DecisionBufferedInput',
        'DecisionPostReadBufferedInput'
    )]
    [string]$SelfTestScenario = '',

    [Parameter(Mandatory = $false)]
    [string]$SelfTestFixtureDirectory = ''
)

$ErrorActionPreference = 'Stop'
$expectedRoot = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
$expectedBranch = 'codex/036F-corrected-wrapper-live-lifecycle-retry'
$expectedNodePath = 'C:\Program Files\nodejs\node.exe'
$expectedProjectUrl = 'https://uvskssaecdhxcgytkasc.supabase.co/'
$expected036CCoreSha256 = '0860B6490D477578ADD79514148C0CC899A13C56F496D17A7516FD7F06518B42'
$expected036CTestSha256 = 'CD7B39BCC3AD5907DE526D15C348AA8222FC7B9D084D13A928BDAAFDD18826E0'
$expected036CWrapperSha256 = '95CCE22AACBCFEAC8E231CB9358997A28141E94C59DED1326683BC9EA89278DC'
$expected035KCoreSha256 = '603FF16B9F6EB30D2B5E26A39218E8307731D66008D4D384FB9696095CD3AB5A'
$coreRelativePath = 'scripts/protected-management-lifecycle-036D-core.mjs'
$testRelativePath = 'scripts/test-protected-management-lifecycle-036D.mjs'
$providerRelativePath = 'scripts/protected-production-preflight-036C-core.mjs'
$providerTestRelativePath = 'scripts/test-protected-production-preflight-036C.mjs'
$providerWrapperRelativePath = 'scripts/Invoke-ProtectedProductionPreflight036C.ps1'
$pilotRelativePath = 'scripts/live-trainer-access-035K-core.mjs'
$protectedNames = @('PP036D_MANAGEMENT_API_TOKEN', 'PP035K_SERVICE_ROLE_KEY')
$managementSafeChildNames = @(
    'PP036D_PRIOR_PROVIDER_PASS', 'PP036D_CLEANUP_AFTER_FAILED_PROVIDER',
    'PP036D_REVOCATION_CONFIRMED', 'PP036D_REQUEST_COUNT', 'PP036D_RETRY_JUSTIFIED'
)
$serviceRoleSafeChildNames = @('PP035K_SUPABASE_URL', 'PP035K_RUN')
$safeChildNames = @($managementSafeChildNames + $serviceRoleSafeChildNames)
$allowedCodes = @(
    'BRANCH_REFUSED', 'CLIPBOARD_CLEAR_FAILED',
    'BUFFERED_INPUT_REFUSED', 'CLIPBOARD_SAFETY_CONFIRMATION_REQUIRED', 'CONFLICT_REFUSED',
    'CONSOLE_INPUT_STATE_REFUSED', 'CREATION_CONFIRMATION_REQUIRED',
    'HELPER_CONTRACT_REFUSED', 'HELPER_FAILED_SANITIZED', 'HELPER_MISSING',
    'INVALIDATION_RETRY_NOT_JUSTIFIED', 'NODE_MISSING', 'NON_INTERACTIVE_REFUSED',
    'NODE_EXECUTABLE_REFUSED', 'PROTECTED_CHILD_ENVIRONMENT_REFUSED',
    'NON_SECRET_CONTROL_REFUSED', 'OPERATOR_PREFLIGHT_REQUIRED', 'PROTECTED_ENVIRONMENT_REFUSED', 'REVOCATION_CONFIRMATION_REQUIRED',
    'REVOCATION_INVALIDATION_UNPROVEN', 'SECRET_INPUT_CANCELLED', 'SELF_TEST_FAILED',
    'SELF_TEST_FIXTURE_REFUSED', 'SELF_TEST_SCENARIO_REFUSED', 'TOKEN_CLASS_REFUSED', 'TOKEN_SCOPE_CONFIRMATION_REQUIRED',
    'TRANSCRIPTION_REFUSED', 'UNEXPECTED', 'WORKSPACE_REFUSED'
)

function ConvertTo-LowerBoolean036D([bool]$Value) {
    return $Value.ToString().ToLowerInvariant()
}

function Get-SanitizedCode036D($ErrorRecord) {
    $candidate = if ($null -ne $ErrorRecord -and $null -ne $ErrorRecord.Exception) {
        $ErrorRecord.Exception.Message
    }
    elseif ($null -ne $ErrorRecord) {
        [string]$ErrorRecord
    }
    else {
        'UNEXPECTED'
    }
    if ($allowedCodes -contains $candidate) { return $candidate }
    return 'HELPER_FAILED_SANITIZED'
}

function Write-SanitizedStop036D([string]$Code) {
    if ($allowedCodes -notcontains $Code) { $Code = 'UNEXPECTED' }
    [Console]::Out.WriteLine('state=failed-sanitized')
    [Console]::Out.WriteLine("code=$Code")
    [Console]::Out.WriteLine('protectedValuesEmitted=false')
    exit 2
}

function Get-RevocationManualInterventionLines036D {
    return @(
        'manualInterventionRequired=true',
        'blocked=exact-token-revocation-or-invalidation-unproven',
        'evidenceChecked=post-creation-compensation-ran-with-incomplete-cleanup-proof',
        'manualStep1=privately-open-the-official-supabase-account-token-page',
        'manualStep2=locate-only-the-exact-token-name-stem-shown-above',
        'manualStep3=revoke-only-that-exact-token-if-it-is-still-listed',
        'manualStep4=confirm-that-exact-token-row-is-absent-without-sharing-token-list-content',
        'manualStep5=do-not-create-a-replacement-or-run-any-downstream-operation',
        'builderNextVerification=fixed-same-token-invalidation-proof-only',
        'credentialMayStillBeActive=true',
        'vercelProductionContinuation=false',
        'protectedValuesEmitted=false'
    )
}

function Write-RevocationBlocked036D([string]$Code, [string]$TokenName, [int]$RequestCount, $Result) {
    if ($allowedCodes -notcontains $Code) { $Code = 'REVOCATION_INVALIDATION_UNPROVEN' }
    [Console]::Out.WriteLine('state=management-access-revocation-blocked')
    [Console]::Out.WriteLine("code=$Code")
    [Console]::Out.WriteLine("tokenNameStem=$TokenName")
    [Console]::Out.WriteLine("requestCount=$RequestCount")
    [Console]::Out.WriteLine("credentialCreated=$(ConvertTo-LowerBoolean036D $Result.credentialCreated)")
    [Console]::Out.WriteLine("credentialRevoked=$(ConvertTo-LowerBoolean036D $Result.credentialRevoked)")
    [Console]::Out.WriteLine("postRevokeListAbsent=$(ConvertTo-LowerBoolean036D $Result.postRevokeListAbsent)")
    [Console]::Out.WriteLine("sameTokenInvalidationAttempted=$(ConvertTo-LowerBoolean036D $Result.invalidationAttempted)")
    [Console]::Out.WriteLine("revocationVerified=$(ConvertTo-LowerBoolean036D $Result.revocationVerified)")
    foreach ($line in Get-RevocationManualInterventionLines036D) { [Console]::Out.WriteLine($line) }
    exit 3
}

function Test-Transcription036D {
    try {
        $hostUi = $Host.UI
        if ($null -eq $hostUi) { return $true }
        $hostUiType = $hostUi.GetType()
        if ($null -eq $hostUiType -or $hostUiType.FullName -cne 'System.Management.Automation.Internal.Host.InternalHostUserInterface') {
            return $true
        }
        $bindingFlags = [Reflection.BindingFlags]'Instance,NonPublic'
        $isTranscribingProperty = $hostUiType.GetProperty('IsTranscribing', $bindingFlags)
        if (
            $null -eq $isTranscribingProperty -or
            $isTranscribingProperty.PropertyType -ne [bool] -or
            $null -eq $isTranscribingProperty.GetGetMethod($true)
        ) {
            return $true
        }
        $isTranscribing = $isTranscribingProperty.GetValue($hostUi, $null)
        if ($isTranscribing -isnot [bool]) { return $true }
        if ($isTranscribing) { return $true }
    }
    catch {
        return $true
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

function Assert-PrivateConsole036D {
    if (Test-Transcription036D) { Write-SanitizedStop036D 'TRANSCRIPTION_REFUSED' }
    if (
        -not [Environment]::UserInteractive -or
        [Console]::IsInputRedirected -or
        [Console]::IsOutputRedirected -or
        [Console]::IsErrorRedirected -or
        $Host.Name -cne 'ConsoleHost'
    ) { Write-SanitizedStop036D 'NON_INTERACTIVE_REFUSED' }
    foreach ($name in @($protectedNames + $safeChildNames)) {
        if ([Environment]::GetEnvironmentVariable($name, 'Process')) {
            Write-SanitizedStop036D 'PROTECTED_ENVIRONMENT_REFUSED'
        }
    }
}

function Write-BeginnerOrientation036E([scriptblock]$Emit) {
    & $Emit 'BEGINNER-SAFE PROTECTED FLOW'
    & $Emit '1. DO NOT CREATE A CREDENTIAL YET.'
    & $Emit '2. NON-SECRET CONTROL checkpoints never accept a credential and never display the key pressed.'
    & $Emit '3. The wrapper will explicitly announce the only PROTECTED CREDENTIAL ENTRY prompt.'
    & $Emit '4. Credential creation happens only after every non-secret checkpoint is complete.'
    & $Emit '5. After the provider check, revoke the exact named credential and prove that it is invalid.'
    & $Emit '6. Any ambiguity stops the lifecycle and may require private revocation before anything else.'
}

function Invoke-NonSecretDecisionReader036E {
    param(
        [Parameter(Mandatory = $true)][string]$Id,
        [Parameter(Mandatory = $true)][string]$Prompt,
        [Parameter(Mandatory = $true)][Collections.IDictionary]$AcceptedKeys,
        [Parameter(Mandatory = $true)][scriptblock]$KeyAvailable,
        [Parameter(Mandatory = $true)][scriptblock]$ReadKey,
        [Parameter(Mandatory = $true)][scriptblock]$Emit
    )

    & $Emit 'NON-SECRET CONTROL - NEVER TYPE OR PASTE A CREDENTIAL HERE'
    & $Emit "control=$Id"
    & $Emit "prompt=$Prompt"

    $drainedCount = 0
    try {
        $available = & $KeyAvailable
        if ($available -isnot [bool]) { throw 'CONSOLE_INPUT_STATE_REFUSED' }
        while ($available) {
            if ($drainedCount -ge 1024) { throw 'CONSOLE_INPUT_STATE_REFUSED' }
            $null = & $ReadKey
            $drainedCount += 1
            $available = & $KeyAvailable
            if ($available -isnot [bool]) { throw 'CONSOLE_INPUT_STATE_REFUSED' }
        }
    }
    catch {
        $code = Get-SanitizedCode036D $_
        if ($code -eq 'HELPER_FAILED_SANITIZED') { $code = 'CONSOLE_INPUT_STATE_REFUSED' }
        throw $code
    }
    if ($drainedCount -gt 0) { throw 'BUFFERED_INPUT_REFUSED' }

    $keyInfo = $null
    try {
        $keyInfo = & $ReadKey
        if ($null -eq $keyInfo -or $null -eq $keyInfo.Key) { throw 'CONSOLE_INPUT_STATE_REFUSED' }

        $available = & $KeyAvailable
        if ($available -isnot [bool]) { throw 'CONSOLE_INPUT_STATE_REFUSED' }
        while ($available) {
            if ($drainedCount -ge 1024) { throw 'CONSOLE_INPUT_STATE_REFUSED' }
            $null = & $ReadKey
            $drainedCount += 1
            $available = & $KeyAvailable
            if ($available -isnot [bool]) { throw 'CONSOLE_INPUT_STATE_REFUSED' }
        }
    }
    catch {
        $keyInfo = $null
        $code = Get-SanitizedCode036D $_
        if ($code -eq 'HELPER_FAILED_SANITIZED') { $code = 'CONSOLE_INPUT_STATE_REFUSED' }
        throw $code
    }
    if ($drainedCount -gt 0) {
        $keyInfo = $null
        throw 'BUFFERED_INPUT_REFUSED'
    }

    $keyName = [string]$keyInfo.Key
    $keyInfo = $null
    if (-not $AcceptedKeys.Contains($keyName)) { throw 'NON_SECRET_CONTROL_REFUSED' }
    return [string]$AcceptedKeys[$keyName]
}

function Clear-ClipboardWithoutReading036D {
    try {
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.Clipboard]::Clear()
        [Console]::Out.WriteLine('clipboardCleared=true')
    }
    catch {
        throw 'CLIPBOARD_CLEAR_FAILED'
    }
}

function Get-ValidatedNodePath036D {
    try {
        if (-not [IO.Path]::IsPathRooted($expectedNodePath)) { throw 'NODE_EXECUTABLE_REFUSED' }
        if (-not (Test-Path -LiteralPath $expectedNodePath -PathType Leaf)) { throw 'NODE_EXECUTABLE_REFUSED' }
        $resolvedNode = Resolve-Path -LiteralPath $expectedNodePath -ErrorAction Stop
        if ($resolvedNode.Provider.Name -cne 'FileSystem') { throw 'NODE_EXECUTABLE_REFUSED' }
        $resolvedNodePath = [IO.Path]::GetFullPath($resolvedNode.ProviderPath)
        if (-not [StringComparer]::OrdinalIgnoreCase.Equals($resolvedNodePath, $expectedNodePath)) {
            throw 'NODE_EXECUTABLE_REFUSED'
        }

        $commandNode = Get-Command node -CommandType Application -ErrorAction SilentlyContinue
        if ($null -eq $commandNode -or [string]::IsNullOrWhiteSpace($commandNode.Source)) {
            throw 'NODE_EXECUTABLE_REFUSED'
        }
        $commandNodePath = [IO.Path]::GetFullPath($commandNode.Source)
        if (-not [StringComparer]::OrdinalIgnoreCase.Equals($commandNodePath, $expectedNodePath)) {
            throw 'NODE_EXECUTABLE_REFUSED'
        }
        return $expectedNodePath
    }
    catch {
        throw 'NODE_EXECUTABLE_REFUSED'
    }
}

function Get-ValidatedWindowsRoot036D {
    try {
        $windowsFolder = [Environment]::GetFolderPath([Environment+SpecialFolder]::Windows)
        $systemDirectory = [Environment]::SystemDirectory
        if ([string]::IsNullOrWhiteSpace($windowsFolder) -or [string]::IsNullOrWhiteSpace($systemDirectory)) {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }
        if (-not [IO.Path]::IsPathRooted($windowsFolder) -or -not [IO.Path]::IsPathRooted($systemDirectory)) {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }

        $windowsPath = [IO.Path]::GetFullPath($windowsFolder).TrimEnd('\')
        $systemDirectoryPath = [IO.Path]::GetFullPath($systemDirectory).TrimEnd('\')
        if (-not (Test-Path -LiteralPath $windowsPath -PathType Container)) {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }
        if (-not (Test-Path -LiteralPath $systemDirectoryPath -PathType Container)) {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }

        $resolvedWindows = Resolve-Path -LiteralPath $windowsPath -ErrorAction Stop
        $resolvedSystemDirectory = Resolve-Path -LiteralPath $systemDirectoryPath -ErrorAction Stop
        if ($resolvedWindows.Provider.Name -cne 'FileSystem' -or $resolvedSystemDirectory.Provider.Name -cne 'FileSystem') {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }
        $resolvedWindowsPath = [IO.Path]::GetFullPath($resolvedWindows.ProviderPath).TrimEnd('\')
        $resolvedSystemDirectoryPath = [IO.Path]::GetFullPath($resolvedSystemDirectory.ProviderPath).TrimEnd('\')
        $systemDirectoryParent = [IO.Directory]::GetParent($resolvedSystemDirectoryPath)
        if ($null -eq $systemDirectoryParent) { throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED' }
        if (-not [StringComparer]::OrdinalIgnoreCase.Equals($resolvedWindowsPath, $windowsPath)) {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }
        if (-not [StringComparer]::OrdinalIgnoreCase.Equals($systemDirectoryParent.FullName.TrimEnd('\'), $resolvedWindowsPath)) {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }
        return $resolvedWindowsPath
    }
    catch {
        throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
    }
}

function Test-ExactStringSet036D([string[]]$Actual, [string[]]$Expected) {
    $actualSorted = @($Actual | Sort-Object)
    $expectedSorted = @($Expected | Sort-Object)
    if ($actualSorted.Count -ne $expectedSorted.Count) { return $false }
    for ($index = 0; $index -lt $actualSorted.Count; $index += 1) {
        if ($actualSorted[$index] -cne $expectedSorted[$index]) { return $false }
    }
    return $true
}

function Invoke-ProtectedNodeChild036D {
    param(
        [Parameter(Mandatory = $true)][Security.SecureString]$SecureValue,
        [Parameter(Mandatory = $true)][string]$ProtectedEnvironmentName,
        [Parameter(Mandatory = $true)][string]$ScriptPath,
        [Parameter(Mandatory = $true)][string]$Mode,
        [Parameter(Mandatory = $true)][hashtable]$SafeEnvironment,
        [Parameter(Mandatory = $true)][string]$NodePath,
        [Parameter(Mandatory = $true)][string]$WorkingDirectory,
        [Parameter(Mandatory = $true)][string]$SystemRootPath
    )

    $protectedBstr = [IntPtr]::Zero
    $protectedPlain = $null
    $startInfo = $null
    $child = $null
    $exitCode = 2
    $environmentCleanupFailed = $false
    try {
        if (-not [IO.Path]::IsPathRooted($NodePath) -or -not [StringComparer]::OrdinalIgnoreCase.Equals($NodePath, $expectedNodePath)) {
            throw 'NODE_EXECUTABLE_REFUSED'
        }
        if (-not (Test-Path -LiteralPath $NodePath -PathType Leaf)) { throw 'NODE_EXECUTABLE_REFUSED' }
        if (-not [IO.Path]::IsPathRooted($ScriptPath) -or -not (Test-Path -LiteralPath $ScriptPath -PathType Leaf)) {
            throw 'HELPER_MISSING'
        }
        if (-not [IO.Path]::IsPathRooted($WorkingDirectory) -or -not (Test-Path -LiteralPath $WorkingDirectory -PathType Container)) {
            throw 'WORKSPACE_REFUSED'
        }
        if (-not [IO.Path]::IsPathRooted($SystemRootPath) -or -not (Test-Path -LiteralPath $SystemRootPath -PathType Container)) {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }

        $approvedSafeNames = if ($ProtectedEnvironmentName -ceq 'PP036D_MANAGEMENT_API_TOKEN') {
            if ($Mode -ceq '--provider-pass') {
                @()
            }
            elseif ($Mode -in @('--invalidation-check', '--management-environment-test')) {
                @($managementSafeChildNames)
            }
            else {
                throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
            }
        }
        elseif ($ProtectedEnvironmentName -ceq 'PP035K_SERVICE_ROLE_KEY') {
            if ($Mode -notin @('--verify', '--service-role-environment-test')) {
                throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
            }
            @($serviceRoleSafeChildNames)
        }
        else {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }
        $suppliedSafeNames = @($SafeEnvironment.Keys | ForEach-Object { [string]$_ })
        if (-not (Test-ExactStringSet036D $suppliedSafeNames $approvedSafeNames)) {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }

        $startInfo = [Diagnostics.ProcessStartInfo]::new()
        $startInfo.FileName = $NodePath
        $startInfo.WorkingDirectory = $WorkingDirectory
        $startInfo.UseShellExecute = $false
        $startInfo.RedirectStandardInput = $false
        $startInfo.RedirectStandardOutput = $false
        $startInfo.RedirectStandardError = $false
        $startInfo.Arguments = "`"$ScriptPath`" $Mode"
        try {
            $startInfo.Environment.Clear()
        }
        catch {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }
        if ($startInfo.Environment.Count -ne 0) { throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED' }
        $startInfo.Environment['SystemRoot'] = $SystemRootPath
        foreach ($entry in $SafeEnvironment.GetEnumerator()) {
            $startInfo.Environment[$entry.Key] = [string]$entry.Value
        }
        $preCredentialKeys = @($startInfo.Environment.Keys | ForEach-Object { [string]$_ })
        if (-not (Test-ExactStringSet036D $preCredentialKeys (@('SystemRoot') + @($approvedSafeNames)))) {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }

        $protectedBstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureValue)
        $protectedPlain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($protectedBstr)
        if ([string]::IsNullOrWhiteSpace($protectedPlain)) { throw 'SECRET_INPUT_CANCELLED' }
        $startInfo.Environment[$ProtectedEnvironmentName] = $protectedPlain
        $finalEnvironmentKeys = @($startInfo.Environment.Keys | ForEach-Object { [string]$_ })
        if (-not (Test-ExactStringSet036D $finalEnvironmentKeys (@('SystemRoot') + @($approvedSafeNames) + @($ProtectedEnvironmentName)))) {
            throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
        }

        $child = [Diagnostics.Process]::new()
        $child.StartInfo = $startInfo
        if (-not $child.Start()) { throw 'HELPER_FAILED_SANITIZED' }
        try {
            $null = $startInfo.Environment.Remove($ProtectedEnvironmentName)
            $startInfo.Environment.Clear()
        }
        catch {
            $environmentCleanupFailed = $true
        }
        $protectedPlain = $null
        $child.WaitForExit()
        $exitCode = $child.ExitCode
        if ($environmentCleanupFailed) { throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED' }
    }
    finally {
        if ($null -ne $startInfo) {
            try {
                $null = $startInfo.Environment.Remove($ProtectedEnvironmentName)
                $startInfo.Environment.Clear()
            }
            catch {
                $environmentCleanupFailed = $true
            }
        }
        $protectedPlain = $null
        if ($protectedBstr -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($protectedBstr) }
        if ($null -ne $child) { $child.Dispose() }
        if ($environmentCleanupFailed) { throw 'PROTECTED_CHILD_ENVIRONMENT_REFUSED' }
    }
    return $exitCode
}

function Invoke-ManagementLifecycleFlow036D {
    param(
        [Parameter(Mandatory = $true)][string]$TokenName,
        [Parameter(Mandatory = $true)][scriptblock]$ReadDecision,
        [Parameter(Mandatory = $true)][scriptblock]$ReadSecure,
        [Parameter(Mandatory = $true)][scriptblock]$ClearClipboard,
        [Parameter(Mandatory = $true)][scriptblock]$InvokeChild,
        [Parameter(Mandatory = $true)][scriptblock]$NowUtc,
        [Parameter(Mandatory = $true)][scriptblock]$Emit
    )

    $managementSecure = $null
    $result = [ordered]@{
        tokenName = $TokenName
        tokenClass = $null
        inputMethod = $null
        creationInstructionIssued = $false
        credentialMayExist = $false
        credentialCreated = $false
        credentialAvailable = $false
        providerAttempted = $false
        providerAttemptCount = 0
        providerPass = $false
        revocationPromptAttempted = $false
        credentialRevoked = $false
        postRevokeListAbsent = $false
        invalidationAttempted = $false
        invalidationAttemptCount = 0
        retryAttempted = $false
        revocationVerified = $false
        requestCount = 0
        createdUtc = $null
        providerPassUtc = $null
        revokedUtc = $null
        invalidationUtc = $null
        primaryError = $null
        cleanupError = $null
        managementEnvironmentCleared = $false
        serviceRoleEnvironmentCleared = $false
        secureValueDisposed = $true
        cleanResultEligible = $false
    }

    try {
        try {
            & $Emit 'humanAction=private-provider-token-lifecycle'
            & $Emit 'automationOfTokenPage=false'
            & $Emit 'automationOfTokenCreation=false'
            & $Emit 'automationOfTokenRevocation=false'
            Write-BeginnerOrientation036E $Emit

            $operatorPreflight = & $ReadDecision 'operator-preflight' 'Press P after privately confirming approved-project access, MFA/recovery readiness, and no same-name token.' @{ P = 'OPERATOR-PREFLIGHT-PASS' }
            if ($operatorPreflight -cne 'OPERATOR-PREFLIGHT-PASS') { throw 'OPERATOR_PREFLIGHT_REQUIRED' }

            $result.tokenClass = & $ReadDecision 'token-class' 'Press F for fine-grained auth_config_read. No other Management credential class is permitted.' @{ F = 'fine-grained-auth-config-read' }
            if ($result.tokenClass -cne 'fine-grained-auth-config-read') { throw 'TOKEN_CLASS_REFUSED' }
            $scopeConfirmation = & $ReadDecision 'token-scope' 'Press S after privately confirming exact auth_config_read and the approved boundary only.' @{ S = 'TOKEN-SCOPE-CONFIRMED' }
            if ($scopeConfirmation -cne 'TOKEN-SCOPE-CONFIRMED') { throw 'TOKEN_SCOPE_CONFIRMATION_REQUIRED' }

            $result.inputMethod = & $ReadDecision 'input-method' 'Press T for direct typing, or P for protected paste.' @{ T = 'TYPE'; P = 'PASTE' }
            if ($result.inputMethod -cne 'TYPE' -and $result.inputMethod -cne 'PASTE') { throw 'TOKEN_CLASS_REFUSED' }
            if ($result.inputMethod -ceq 'PASTE') {
                $clipboardSafety = & $ReadDecision 'clipboard-safety' 'Press L after privately disabling clipboard history and cross-device sync.' @{ L = 'CLIPBOARD-SAFETY-CONFIRMED' }
                if ($clipboardSafety -cne 'CLIPBOARD-SAFETY-CONFIRMED') { throw 'CLIPBOARD_SAFETY_CONFIRMATION_REQUIRED' }
            }

            $creationReadiness = & $ReadDecision 'creation-readiness' 'Press R only when ready for the next visible prompt to be the sole protected credential-entry location.' @{ R = 'CREATION-READY' }
            if ($creationReadiness -cne 'CREATION-READY') { throw 'CREATION_CONFIRMATION_REQUIRED' }

            $result.creationInstructionIssued = $true
            $result.credentialMayExist = $true
            $result.credentialCreated = $true
            $result.createdUtc = & $NowUtc

            try {
                & $Emit "tokenNameStem=$TokenName"
                & $Emit 'instruction=CREATE THE CREDENTIAL NOW'
                & $Emit 'protectedPrompt=PROTECTED CREDENTIAL ENTRY - THIS IS THE ONLY CREDENTIAL PROMPT'
                $managementSecure = & $ReadSecure 'PROTECTED CREDENTIAL ENTRY - Supabase Management API bearer credential'
                if ($null -eq $managementSecure -or $managementSecure.Length -eq 0) { throw 'SECRET_INPUT_CANCELLED' }
                $result.credentialAvailable = $true
                $result.secureValueDisposed = $false
                if ($result.inputMethod -ceq 'PASTE') { & $ClearClipboard }

                $result.providerAttempted = $true
                $result.providerAttemptCount = 1
                $result.requestCount = 1
                $providerExitCode = & $InvokeChild $managementSecure '--provider-pass' @{}
                $result.providerPass = ($providerExitCode -eq 0)
                if ($result.providerPass) { $result.providerPassUtc = & $NowUtc }
            }
            catch {
                $result.primaryError = Get-SanitizedCode036D $_
            }
        }
        catch {
            $result.primaryError = Get-SanitizedCode036D $_
        }

        if ($result.credentialMayExist) {
            try {
                & $Emit "instruction=privately-revoke-exact-token-$TokenName-and-confirm-row-absent"
                $result.revocationPromptAttempted = $true
                $revocationConfirmation = & $ReadDecision 'revocation-confirmation' 'Press R after privately revoking only the named token and confirming its row absent.' @{ R = 'REVOKED-AND-ABSENT' }
                if ($revocationConfirmation -cne 'REVOKED-AND-ABSENT') { throw 'REVOCATION_CONFIRMATION_REQUIRED' }
                $result.credentialRevoked = $true
                $result.postRevokeListAbsent = $true
                $result.revokedUtc = & $NowUtc
            }
            catch {
                $result.cleanupError = Get-SanitizedCode036D $_
            }

            if ($result.credentialRevoked -and $result.postRevokeListAbsent) {
                if ($null -eq $managementSecure -or $managementSecure.Length -eq 0) {
                    $result.cleanupError = 'SECRET_INPUT_CANCELLED'
                }
                else {
                    $invalidationEnvironment = @{
                        PP036D_PRIOR_PROVIDER_PASS = if ($result.providerPass) { 'true' } else { 'false' }
                        PP036D_CLEANUP_AFTER_FAILED_PROVIDER = if ($result.providerPass) { 'false' } else { 'true' }
                        PP036D_REVOCATION_CONFIRMED = 'true'
                        PP036D_REQUEST_COUNT = '2'
                        PP036D_RETRY_JUSTIFIED = 'false'
                    }
                    $result.invalidationAttempted = $true
                    $result.invalidationAttemptCount = 1
                    $result.requestCount = 2
                    $invalidationExitCode = 2
                    try {
                        $invalidationExitCode = & $InvokeChild $managementSecure '--invalidation-check' $invalidationEnvironment
                    }
                    catch {
                        $invalidationExitCode = 2
                    }

                    if ($invalidationExitCode -ne 0) {
                        try {
                            $retryConfirmation = & $ReadDecision 'retry-confirmation' 'Press Y only with operator-confirmed propagation or rate-limit evidence; otherwise press N.' @{ Y = 'JUSTIFIED-INVALIDATION-RETRY'; N = 'NO-RETRY' }
                            if ($retryConfirmation -cne 'JUSTIFIED-INVALIDATION-RETRY') { throw 'REVOCATION_INVALIDATION_UNPROVEN' }
                            $result.retryAttempted = $true
                            $result.invalidationAttemptCount = 2
                            $result.requestCount = 3
                            $invalidationEnvironment.PP036D_REQUEST_COUNT = '3'
                            $invalidationEnvironment.PP036D_RETRY_JUSTIFIED = 'true'
                            try {
                                $invalidationExitCode = & $InvokeChild $managementSecure '--invalidation-check' $invalidationEnvironment
                            }
                            catch {
                                $invalidationExitCode = 2
                            }
                        }
                        catch {
                            $result.cleanupError = Get-SanitizedCode036D $_
                        }
                    }

                    if ($invalidationExitCode -eq 0) {
                        $result.revocationVerified = $true
                        $result.invalidationUtc = & $NowUtc
                        $result.cleanupError = $null
                    }
                    elseif ($null -eq $result.cleanupError) {
                        $result.cleanupError = 'REVOCATION_INVALIDATION_UNPROVEN'
                    }
                }
            }
        }
    }
    finally {
        $environmentClearSucceeded = $true
        foreach ($name in @($protectedNames + $safeChildNames)) {
            try {
                [Environment]::SetEnvironmentVariable($name, $null, 'Process')
            }
            catch {
                $environmentClearSucceeded = $false
            }
        }
        if ($null -ne $managementSecure) {
            try {
                $managementSecure.Dispose()
                $result.secureValueDisposed = $true
            }
            catch {
                $result.secureValueDisposed = $false
            }
        }
        $managementSecure = $null
        $result.managementEnvironmentCleared = $environmentClearSucceeded -and -not [Environment]::GetEnvironmentVariable('PP036D_MANAGEMENT_API_TOKEN', 'Process')
        $result.serviceRoleEnvironmentCleared = $environmentClearSucceeded -and -not [Environment]::GetEnvironmentVariable('PP035K_SERVICE_ROLE_KEY', 'Process')
        if (-not $result.managementEnvironmentCleared -or -not $result.serviceRoleEnvironmentCleared -or -not $result.secureValueDisposed) {
            $result.cleanupError = 'HELPER_FAILED_SANITIZED'
        }
    }

    $result.cleanResultEligible = (
        $result.credentialCreated -and
        $result.credentialAvailable -and
        $result.credentialRevoked -and
        $result.postRevokeListAbsent -and
        $result.revocationVerified -and
        $result.managementEnvironmentCleared -and
        $result.serviceRoleEnvironmentCleared -and
        $result.secureValueDisposed
    )
    return [pscustomobject]$result
}

function Get-ValidatedSelfTestFixtureDirectory036D([string]$FixtureDirectory) {
    try {
        if ([string]::IsNullOrWhiteSpace($FixtureDirectory) -or -not [IO.Path]::IsPathRooted($FixtureDirectory)) {
            throw 'SELF_TEST_FIXTURE_REFUSED'
        }
        $temporaryRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\') + '\'
        $fixturePath = [IO.Path]::GetFullPath($FixtureDirectory).TrimEnd('\')
        if (-not $fixturePath.StartsWith($temporaryRoot, [StringComparison]::OrdinalIgnoreCase)) {
            throw 'SELF_TEST_FIXTURE_REFUSED'
        }
        if (-not (Test-Path -LiteralPath $fixturePath -PathType Container)) {
            throw 'SELF_TEST_FIXTURE_REFUSED'
        }
        $resolvedFixture = Resolve-Path -LiteralPath $fixturePath -ErrorAction Stop
        if ($resolvedFixture.Provider.Name -cne 'FileSystem') { throw 'SELF_TEST_FIXTURE_REFUSED' }
        $resolvedFixturePath = [IO.Path]::GetFullPath($resolvedFixture.ProviderPath).TrimEnd('\')
        if (-not [StringComparer]::OrdinalIgnoreCase.Equals($resolvedFixturePath, $fixturePath)) {
            throw 'SELF_TEST_FIXTURE_REFUSED'
        }
        return $resolvedFixturePath
    }
    catch {
        throw 'SELF_TEST_FIXTURE_REFUSED'
    }
}

function Invoke-ProtectedChildEnvironmentIsolationScenario036D {
    param(
        [Parameter(Mandatory = $true)][string]$FixtureDirectory,
        [Parameter(Mandatory = $true)][string]$NodePath,
        [Parameter(Mandatory = $true)][string]$SystemRootPath,
        [Parameter(Mandatory = $true)][string]$WorkingDirectory
    )

    $fixturePath = Get-ValidatedSelfTestFixtureDirectory036D $FixtureDirectory
    $helperPath = Join-Path $fixturePath 'protected-child-environment-helper.mjs'
    if (-not (Test-Path -LiteralPath $helperPath -PathType Leaf)) { throw 'SELF_TEST_FIXTURE_REFUSED' }

    $managementSecure = $null
    $serviceRoleSecure = $null
    $managementExitCode = 2
    $serviceRoleExitCode = 2
    try {
        $managementSecure = ConvertTo-SecureString 'synthetic-036d-management-environment-value' -AsPlainText -Force
        $serviceRoleSecure = ConvertTo-SecureString 'synthetic-035k-service-role-environment-value' -AsPlainText -Force
        $managementExitCode = Invoke-ProtectedNodeChild036D `
            -SecureValue $managementSecure `
            -ProtectedEnvironmentName 'PP036D_MANAGEMENT_API_TOKEN' `
            -ScriptPath $helperPath `
            -Mode '--management-environment-test' `
            -SafeEnvironment @{
                PP036D_PRIOR_PROVIDER_PASS = 'true'
                PP036D_CLEANUP_AFTER_FAILED_PROVIDER = 'false'
                PP036D_REVOCATION_CONFIRMED = 'true'
                PP036D_REQUEST_COUNT = '2'
                PP036D_RETRY_JUSTIFIED = 'false'
            } `
            -NodePath $NodePath `
            -WorkingDirectory $WorkingDirectory `
            -SystemRootPath $SystemRootPath
        $serviceRoleExitCode = Invoke-ProtectedNodeChild036D `
            -SecureValue $serviceRoleSecure `
            -ProtectedEnvironmentName 'PP035K_SERVICE_ROLE_KEY' `
            -ScriptPath $helperPath `
            -Mode '--service-role-environment-test' `
            -SafeEnvironment @{
                PP035K_SUPABASE_URL = $expectedProjectUrl
                PP035K_RUN = '035K-SYNTHETIC-ENVIRONMENT-TEST'
            } `
            -NodePath $NodePath `
            -WorkingDirectory $WorkingDirectory `
            -SystemRootPath $SystemRootPath
    }
    finally {
        if ($null -ne $managementSecure) { $managementSecure.Dispose() }
        if ($null -ne $serviceRoleSecure) { $serviceRoleSecure.Dispose() }
    }

    [Console]::Out.WriteLine('state=protected-child-environment-self-test')
    [Console]::Out.WriteLine("managementChildExitCode=$managementExitCode")
    [Console]::Out.WriteLine("serviceRoleChildExitCode=$serviceRoleExitCode")
    [Console]::Out.WriteLine('protectedValuesEmitted=false')
    [Console]::Out.WriteLine('remoteMutation=none')
}

function Invoke-DeterministicSelfTestScenario036D(
    [string]$Scenario,
    [string]$FixtureDirectory,
    [string]$NodePath,
    [string]$SystemRootPath,
    [string]$WorkingDirectory
) {
    if ($Scenario -in @('DecisionAccepted', 'DecisionWrongKey', 'DecisionBufferedInput', 'DecisionPostReadBufferedInput')) {
        $decisionState = [ordered]@{
            initialAvailabilityChecked = $false
            acceptedKeyRead = $false
            bufferedQueue = [Collections.Generic.Queue[object]]::new()
            emitted = [Collections.Generic.List[string]]::new()
            drainedCount = 0
        }
        if ($Scenario -eq 'DecisionBufferedInput') {
            foreach ($character in ([char[]](('synthetic' + '-buffered-input-canary')))) {
                $decisionState.bufferedQueue.Enqueue([pscustomobject]@{ Key = 'X'; KeyChar = $character })
            }
        }
        elseif ($Scenario -eq 'DecisionPostReadBufferedInput') {
            foreach ($character in ([char[]](('synthetic' + '-post-read-buffer-canary')))) {
                $decisionState.bufferedQueue.Enqueue([pscustomobject]@{ Key = 'X'; KeyChar = $character })
            }
        }

        $keyAvailable = {
            if (-not $decisionState.initialAvailabilityChecked) {
                $decisionState.initialAvailabilityChecked = $true
                return ($Scenario -eq 'DecisionBufferedInput' -and $decisionState.bufferedQueue.Count -gt 0)
            }
            if ($Scenario -eq 'DecisionPostReadBufferedInput' -and $decisionState.acceptedKeyRead) {
                return ($decisionState.bufferedQueue.Count -gt 0)
            }
            return ($decisionState.bufferedQueue.Count -gt 0)
        }.GetNewClosure()
        $readKey = {
            if ($Scenario -eq 'DecisionPostReadBufferedInput' -and -not $decisionState.acceptedKeyRead) {
                $decisionState.acceptedKeyRead = $true
                return [pscustomobject]@{ Key = 'P'; KeyChar = [char]'P' }
            }
            if ($decisionState.bufferedQueue.Count -gt 0) {
                $decisionState.drainedCount += 1
                return $decisionState.bufferedQueue.Dequeue()
            }
            $decisionState.acceptedKeyRead = $true
            if ($Scenario -eq 'DecisionWrongKey') { return [pscustomobject]@{ Key = 'X'; KeyChar = [char]'X' } }
            return [pscustomobject]@{ Key = 'P'; KeyChar = [char]'P' }
        }.GetNewClosure()
        $emitDecision = { param([string]$Line) $decisionState.emitted.Add($Line) | Out-Null }.GetNewClosure()

        $decision = $null
        $decisionCode = 'NONE'
        try {
            $decision = Invoke-NonSecretDecisionReader036E `
                -Id 'self-test-decision' `
                -Prompt 'Press P for the synthetic accepted path.' `
                -AcceptedKeys @{ P = 'SELF-TEST-ACCEPTED' } `
                -KeyAvailable $keyAvailable `
                -ReadKey $readKey `
                -Emit $emitDecision
        }
        catch {
            $decisionCode = Get-SanitizedCode036D $_
        }

        [Console]::Out.WriteLine('state=non-secret-control-self-test')
        [Console]::Out.WriteLine("scenario=$Scenario")
        [Console]::Out.WriteLine("decision=$(if ($null -eq $decision) { 'NONE' } else { $decision })")
        [Console]::Out.WriteLine("code=$decisionCode")
        [Console]::Out.WriteLine("acceptedKeyRead=$(ConvertTo-LowerBoolean036D $decisionState.acceptedKeyRead)")
        [Console]::Out.WriteLine("drainedCount=$($decisionState.drainedCount)")
        [Console]::Out.WriteLine("labelPresent=$(ConvertTo-LowerBoolean036D ($decisionState.emitted -contains 'NON-SECRET CONTROL - NEVER TYPE OR PASTE A CREDENTIAL HERE'))")
        [Console]::Out.WriteLine('keyValuesEmitted=false')
        [Console]::Out.WriteLine('protectedValuesEmitted=false')
        [Console]::Out.WriteLine('remoteMutation=none')
        exit 0
    }

    if ($Scenario -ceq 'ProtectedChildEnvironmentIsolation') {
        Invoke-ProtectedChildEnvironmentIsolationScenario036D `
            -FixtureDirectory $FixtureDirectory `
            -NodePath $NodePath `
            -SystemRootPath $SystemRootPath `
            -WorkingDirectory $WorkingDirectory
        exit 0
    }

    $scenarioState = [ordered]@{
        providerCalls = 0
        invalidationCalls = 0
        secureReads = 0
        clipboardCalls = 0
        emitted = [Collections.Generic.List[string]]::new()
        events = [Collections.Generic.List[string]]::new()
        decisionIds = [Collections.Generic.List[string]]::new()
    }
    $readDecision = {
        param([string]$Id, [string]$Prompt, [Collections.IDictionary]$AcceptedKeys)
        $scenarioState.decisionIds.Add($Id) | Out-Null
        $scenarioState.events.Add("decision:$Id") | Out-Null
        switch ($Id) {
            'operator-preflight' { return 'OPERATOR-PREFLIGHT-PASS' }
            'token-class' { return 'fine-grained-auth-config-read' }
            'token-scope' { return 'TOKEN-SCOPE-CONFIRMED' }
            'input-method' { if ($Scenario -ceq 'ClipboardClearFailureAfterCreation') { return 'PASTE' }; return 'TYPE' }
            'clipboard-safety' { return 'CLIPBOARD-SAFETY-CONFIRMED' }
            'creation-readiness' { return 'CREATION-READY' }
            'revocation-confirmation' { if ($Scenario -ceq 'RevocationConfirmationFailure') { return 'NOT-CONFIRMED' }; return 'REVOKED-AND-ABSENT' }
            'retry-confirmation' {
                if ($Scenario -in @('InvalidationFailureRetrySuccess', 'InvalidationFailureRetryFailure')) {
                    return 'JUSTIFIED-INVALIDATION-RETRY'
                }
                return ''
            }
            default { throw 'UNEXPECTED' }
        }
    }.GetNewClosure()
    $readSecure = {
        param([string]$Prompt)
        $scenarioState.secureReads += 1
        $scenarioState.events.Add('secure-read') | Out-Null
        if ($Scenario -ceq 'MissingCredentialAfterCreation') { return $null }
        return ConvertTo-SecureString 'synthetic-management-self-test-value' -AsPlainText -Force
    }.GetNewClosure()
    $clearClipboard = {
        $scenarioState.clipboardCalls += 1
        if ($Scenario -ceq 'ClipboardClearFailureAfterCreation') { throw 'CLIPBOARD_CLEAR_FAILED' }
    }.GetNewClosure()
    $invokeChild = {
        param([Security.SecureString]$SecureValue, [string]$Mode, [hashtable]$SafeEnvironment)
        if ($Mode -ceq '--provider-pass') {
            $scenarioState.providerCalls += 1
            if ($Scenario -ceq 'HelperStartFailure') { throw 'HELPER_FAILED_SANITIZED' }
            return 0
        }
        if ($Mode -ceq '--invalidation-check') {
            $scenarioState.invalidationCalls += 1
            if ($Scenario -in @('InvalidationFailureNoRetry', 'InvalidationFailureRetrySuccess', 'InvalidationFailureRetryFailure')) {
                if ($Scenario -ceq 'InvalidationFailureRetrySuccess' -and $scenarioState.invalidationCalls -eq 2) { return 0 }
                return 2
            }
            return 0
        }
        throw 'UNEXPECTED'
    }.GetNewClosure()
    $nowUtc = { return '2026-08-04T00:00:00.000Z' }
    $emit = {
        param([string]$Line)
        $scenarioState.emitted.Add($Line) | Out-Null
        $scenarioState.events.Add("emit:$Line") | Out-Null
    }.GetNewClosure()

    if ($Scenario -ceq 'CleanupEnvironmentProof') {
        [Environment]::SetEnvironmentVariable('PP036D_MANAGEMENT_API_TOKEN', 'synthetic-self-test-only', 'Process')
        [Environment]::SetEnvironmentVariable('PP035K_SERVICE_ROLE_KEY', 'synthetic-self-test-only', 'Process')
        [Environment]::SetEnvironmentVariable('PP036D_REQUEST_COUNT', 'synthetic-self-test-only', 'Process')
    }

    $tokenName = 'precision-performance-036F-single-use-20260804T000000Z'
    $result = Invoke-ManagementLifecycleFlow036D `
        -TokenName $tokenName `
        -ReadDecision $readDecision `
        -ReadSecure $readSecure `
        -ClearClipboard $clearClipboard `
        -InvokeChild $invokeChild `
        -NowUtc $nowUtc `
        -Emit $emit

    [Console]::Out.WriteLine('state=deterministic-self-test-scenario')
    [Console]::Out.WriteLine("scenario=$Scenario")
    [Console]::Out.WriteLine("creationInstructionIssued=$(ConvertTo-LowerBoolean036D $result.creationInstructionIssued)")
    [Console]::Out.WriteLine("credentialMayExist=$(ConvertTo-LowerBoolean036D $result.credentialMayExist)")
    [Console]::Out.WriteLine("credentialCreated=$(ConvertTo-LowerBoolean036D $result.credentialCreated)")
    [Console]::Out.WriteLine("credentialAvailable=$(ConvertTo-LowerBoolean036D $result.credentialAvailable)")
    [Console]::Out.WriteLine("providerAttemptCount=$($result.providerAttemptCount)")
    [Console]::Out.WriteLine("providerPass=$(ConvertTo-LowerBoolean036D $result.providerPass)")
    [Console]::Out.WriteLine("revocationPromptAttempted=$(ConvertTo-LowerBoolean036D $result.revocationPromptAttempted)")
    [Console]::Out.WriteLine("credentialRevoked=$(ConvertTo-LowerBoolean036D $result.credentialRevoked)")
    [Console]::Out.WriteLine("postRevokeListAbsent=$(ConvertTo-LowerBoolean036D $result.postRevokeListAbsent)")
    [Console]::Out.WriteLine("invalidationAttemptCount=$($result.invalidationAttemptCount)")
    [Console]::Out.WriteLine("retryAttempted=$(ConvertTo-LowerBoolean036D $result.retryAttempted)")
    [Console]::Out.WriteLine("revocationVerified=$(ConvertTo-LowerBoolean036D $result.revocationVerified)")
    [Console]::Out.WriteLine("requestCount=$($result.requestCount)")
    [Console]::Out.WriteLine("primaryCode=$(if ($null -eq $result.primaryError) { 'NONE' } else { $result.primaryError })")
    [Console]::Out.WriteLine("cleanupCode=$(if ($null -eq $result.cleanupError) { 'NONE' } else { $result.cleanupError })")
    [Console]::Out.WriteLine("cleanResultEligible=$(ConvertTo-LowerBoolean036D $result.cleanResultEligible)")
    [Console]::Out.WriteLine("manualInterventionRequired=$(ConvertTo-LowerBoolean036D ($result.credentialCreated -and -not $result.cleanResultEligible))")
    [Console]::Out.WriteLine("managementEnvironmentCleared=$(ConvertTo-LowerBoolean036D $result.managementEnvironmentCleared)")
    [Console]::Out.WriteLine("serviceRoleEnvironmentCleared=$(ConvertTo-LowerBoolean036D $result.serviceRoleEnvironmentCleared)")
    [Console]::Out.WriteLine("secureValueDisposed=$(ConvertTo-LowerBoolean036D $result.secureValueDisposed)")
    [Console]::Out.WriteLine("secureReadCount=$($scenarioState.secureReads)")
    [Console]::Out.WriteLine("clipboardCallCount=$($scenarioState.clipboardCalls)")
    [Console]::Out.WriteLine("providerChildCallCount=$($scenarioState.providerCalls)")
    [Console]::Out.WriteLine("invalidationChildCallCount=$($scenarioState.invalidationCalls)")
    $orientationIndex = $scenarioState.events.IndexOf('emit:BEGINNER-SAFE PROTECTED FLOW')
    $firstDecisionIndex = -1
    for ($eventIndex = 0; $eventIndex -lt $scenarioState.events.Count; $eventIndex += 1) {
        if ($scenarioState.events[$eventIndex].StartsWith('decision:', [StringComparison]::Ordinal)) {
            $firstDecisionIndex = $eventIndex
            break
        }
    }
    $creationIndex = $scenarioState.events.IndexOf('emit:instruction=CREATE THE CREDENTIAL NOW')
    $protectedPromptIndex = $scenarioState.events.IndexOf('emit:protectedPrompt=PROTECTED CREDENTIAL ENTRY - THIS IS THE ONLY CREDENTIAL PROMPT')
    $secureReadIndex = $scenarioState.events.IndexOf('secure-read')
    [Console]::Out.WriteLine("orientationBeforeFirstDecision=$(ConvertTo-LowerBoolean036D ($orientationIndex -ge 0 -and $firstDecisionIndex -gt $orientationIndex))")
    [Console]::Out.WriteLine("creationProtectedAdjacency=$(ConvertTo-LowerBoolean036D ($creationIndex -ge 0 -and $protectedPromptIndex -eq ($creationIndex + 1) -and $secureReadIndex -eq ($protectedPromptIndex + 1)))")
    [Console]::Out.WriteLine("decisionSequence=$([string]::Join(',', $scenarioState.decisionIds))")
    [Console]::Out.WriteLine('downstreamOperationCount=0')
    if ($result.credentialCreated -and -not $result.cleanResultEligible) {
        foreach ($line in Get-RevocationManualInterventionLines036D) { [Console]::Out.WriteLine($line) }
    }
    [Console]::Out.WriteLine('protectedValuesEmitted=false')
    [Console]::Out.WriteLine('remoteMutation=none')
    exit 0
}

$currentRoot = [IO.Path]::GetFullPath((Get-Location).Path).TrimEnd('\')
$gitRoot = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($gitRoot)) { Write-SanitizedStop036D 'WORKSPACE_REFUSED' }
$gitRoot = [IO.Path]::GetFullPath($gitRoot.Trim()).TrimEnd('\')
if ($currentRoot -cne $expectedRoot -or $gitRoot -cne $expectedRoot) { Write-SanitizedStop036D 'WORKSPACE_REFUSED' }

$branch = (& git -C $gitRoot branch --show-current 2>$null).Trim()
if ($LASTEXITCODE -ne 0 -or $branch -cne $expectedBranch) { Write-SanitizedStop036D 'BRANCH_REFUSED' }
$conflicts = @(& git -c core.safecrlf=false -C $gitRoot diff --name-only --diff-filter=U 2>$null)
if ($LASTEXITCODE -ne 0 -or $conflicts.Count -ne 0) { Write-SanitizedStop036D 'CONFLICT_REFUSED' }

if (
    $Operation -ne 'SelfTest' -and (
        -not [string]::IsNullOrEmpty($SelfTestScenario) -or
        -not [string]::IsNullOrEmpty($SelfTestFixtureDirectory)
    )
) {
    Write-SanitizedStop036D 'SELF_TEST_SCENARIO_REFUSED'
}
if (
    $Operation -eq 'SelfTest' -and (
        ($SelfTestScenario -ceq 'ProtectedChildEnvironmentIsolation' -and [string]::IsNullOrWhiteSpace($SelfTestFixtureDirectory)) -or
        ($SelfTestScenario -cne 'ProtectedChildEnvironmentIsolation' -and -not [string]::IsNullOrEmpty($SelfTestFixtureDirectory))
    )
) {
    Write-SanitizedStop036D 'SELF_TEST_FIXTURE_REFUSED'
}

try {
    $validatedNodePath = Get-ValidatedNodePath036D
}
catch {
    Write-SanitizedStop036D 'NODE_EXECUTABLE_REFUSED'
}
try {
    $validatedSystemRoot = Get-ValidatedWindowsRoot036D
}
catch {
    Write-SanitizedStop036D 'PROTECTED_CHILD_ENVIRONMENT_REFUSED'
}

$corePath = Join-Path $gitRoot $coreRelativePath
$testPath = Join-Path $gitRoot $testRelativePath
$providerPath = Join-Path $gitRoot $providerRelativePath
$providerTestPath = Join-Path $gitRoot $providerTestRelativePath
$providerWrapperPath = Join-Path $gitRoot $providerWrapperRelativePath
$pilotPath = Join-Path $gitRoot $pilotRelativePath
foreach ($path in @($corePath, $testPath, $providerPath, $providerTestPath, $providerWrapperPath, $pilotPath)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { Write-SanitizedStop036D 'HELPER_MISSING' }
}

$expectedHashes = @{
    $providerPath = $expected036CCoreSha256
    $providerTestPath = $expected036CTestSha256
    $providerWrapperPath = $expected036CWrapperSha256
    $pilotPath = $expected035KCoreSha256
}
foreach ($entry in $expectedHashes.GetEnumerator()) {
    if ((Get-FileHash -Algorithm SHA256 -LiteralPath $entry.Key).Hash -cne $entry.Value) {
        Write-SanitizedStop036D 'HELPER_CONTRACT_REFUSED'
    }
}

$coreSource = Get-Content -Raw -LiteralPath $corePath
$pilotSource = Get-Content -Raw -LiteralPath $pilotPath
foreach ($contract in @(
    'https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth',
    '--provider-pass', '--invalidation-check', 'responseBodyRead', 'TOKEN_STILL_ACTIVE_REFUSED'
)) {
    if (-not $coreSource.Contains($contract)) { Write-SanitizedStop036D 'HELPER_CONTRACT_REFUSED' }
}
foreach ($contract in @(
    'uvskssaecdhxcgytkasc', 'tagnbgkroihagjmvehlx', 'PP035K_SUPABASE_URL',
    'PP035K_SERVICE_ROLE_KEY', 'hiddenInput', 'getUserById', '--verify',
    'FIXTURE_AGREEMENT_FAILED', 'wrongHorseRows'
)) {
    if (-not $pilotSource.Contains($contract)) { Write-SanitizedStop036D 'HELPER_CONTRACT_REFUSED' }
}
if ($coreSource.Contains('listUsers') -or $coreSource.Contains('perPage')) { Write-SanitizedStop036D 'HELPER_CONTRACT_REFUSED' }
if ($pilotSource.Contains('listUsers') -or $pilotSource.Contains('perPage')) { Write-SanitizedStop036D 'HELPER_CONTRACT_REFUSED' }
$coreSource = $null
$pilotSource = $null

if ($Operation -eq 'SelfTest' -and -not [string]::IsNullOrEmpty($SelfTestScenario)) {
    Invoke-DeterministicSelfTestScenario036D `
        -Scenario $SelfTestScenario `
        -FixtureDirectory $SelfTestFixtureDirectory `
        -NodePath $validatedNodePath `
        -SystemRootPath $validatedSystemRoot `
        -WorkingDirectory $gitRoot
}

if ($Operation -eq 'SelfTest') {
    & $validatedNodePath $testPath
    if ($LASTEXITCODE -ne 0) { Write-SanitizedStop036D 'SELF_TEST_FAILED' }
    & $validatedNodePath $corePath '--self-test'
    if ($LASTEXITCODE -ne 0) { Write-SanitizedStop036D 'SELF_TEST_FAILED' }
    [Console]::Out.WriteLine('state=pass')
    [Console]::Out.WriteLine('mode=self-test')
    [Console]::Out.WriteLine('checks=2')
    [Console]::Out.WriteLine('protectedValuesEmitted=false')
    [Console]::Out.WriteLine('remoteMutation=none')
    exit 0
}

Assert-PrivateConsole036D

if ($Operation -eq 'RetainedPilotVerify') {
    $serviceSecure = $null
    $pilotError = $null
    $pilotExitCode = 2
    try {
        $serviceSecure = Read-Host 'Protected Supabase service-role value' -AsSecureString
        if ($null -eq $serviceSecure -or $serviceSecure.Length -eq 0) { throw 'SECRET_INPUT_CANCELLED' }
        $run = '035K-' + ([Guid]::NewGuid().ToString('N').Substring(0, 12).ToUpperInvariant())
        $pilotExitCode = Invoke-ProtectedNodeChild036D `
            -SecureValue $serviceSecure `
            -ProtectedEnvironmentName 'PP035K_SERVICE_ROLE_KEY' `
            -ScriptPath $pilotPath `
            -Mode '--verify' `
            -SafeEnvironment @{ PP035K_SUPABASE_URL = $expectedProjectUrl; PP035K_RUN = $run } `
            -NodePath $validatedNodePath `
            -WorkingDirectory $gitRoot `
            -SystemRootPath $validatedSystemRoot
    }
    catch {
        $pilotError = Get-SanitizedCode036D $_
    }
    finally {
        foreach ($name in @($protectedNames + $safeChildNames)) { [Environment]::SetEnvironmentVariable($name, $null, 'Process') }
        if ($null -ne $serviceSecure) { $serviceSecure.Dispose() }
    }
    if ($null -ne $pilotError) { Write-SanitizedStop036D $pilotError }
    exit $pilotExitCode
}

$tokenName = 'precision-performance-036F-single-use-' + (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$realEmit = { param([string]$Line) [Console]::Out.WriteLine($Line) }
$realKeyAvailable = { return [Console]::KeyAvailable }
$realReadKey = { return [Console]::ReadKey($true) }
$realReadDecision = {
    param([string]$Id, [string]$Prompt, [Collections.IDictionary]$AcceptedKeys)
    return Invoke-NonSecretDecisionReader036E `
        -Id $Id `
        -Prompt $Prompt `
        -AcceptedKeys $AcceptedKeys `
        -KeyAvailable $realKeyAvailable `
        -ReadKey $realReadKey `
        -Emit $realEmit
}.GetNewClosure()
$realReadSecure = { param([string]$Prompt) return Read-Host $Prompt -AsSecureString }
$realClearClipboard = { Clear-ClipboardWithoutReading036D }
$realInvokeChild = {
    param([Security.SecureString]$SecureValue, [string]$Mode, [hashtable]$SafeEnvironment)
    return Invoke-ProtectedNodeChild036D `
        -SecureValue $SecureValue `
        -ProtectedEnvironmentName 'PP036D_MANAGEMENT_API_TOKEN' `
        -ScriptPath $corePath `
        -Mode $Mode `
        -SafeEnvironment $SafeEnvironment `
        -NodePath $validatedNodePath `
        -WorkingDirectory $gitRoot `
        -SystemRootPath $validatedSystemRoot
}.GetNewClosure()
$realNowUtc = { return (Get-Date).ToUniversalTime().ToString('o') }

$managementResult = Invoke-ManagementLifecycleFlow036D `
    -TokenName $tokenName `
    -ReadDecision $realReadDecision `
    -ReadSecure $realReadSecure `
    -ClearClipboard $realClearClipboard `
    -InvokeChild $realInvokeChild `
    -NowUtc $realNowUtc `
    -Emit $realEmit

if (-not $managementResult.credentialCreated) {
    $stopCode = if ($null -ne $managementResult.primaryError) { $managementResult.primaryError } else { 'UNEXPECTED' }
    Write-SanitizedStop036D $stopCode
}

if (-not $managementResult.cleanResultEligible) {
    $blockedCode = if ($null -ne $managementResult.cleanupError) {
        $managementResult.cleanupError
    }
    elseif ($null -ne $managementResult.primaryError) {
        $managementResult.primaryError
    }
    else {
        'REVOCATION_INVALIDATION_UNPROVEN'
    }
    Write-RevocationBlocked036D $blockedCode $tokenName $managementResult.requestCount $managementResult
}

if (-not $managementResult.providerPass -or $null -ne $managementResult.primaryError) {
    [Console]::Out.WriteLine('state=management-access-preflight-failed-revoked-clean')
    [Console]::Out.WriteLine('lifecycleState=cleared')
    [Console]::Out.WriteLine("tokenNameStem=$tokenName")
    [Console]::Out.WriteLine("tokenClass=$($managementResult.tokenClass)")
    [Console]::Out.WriteLine("createdUtc=$($managementResult.createdUtc)")
    [Console]::Out.WriteLine("revokedUtc=$($managementResult.revokedUtc)")
    [Console]::Out.WriteLine("invalidationUtc=$($managementResult.invalidationUtc)")
    [Console]::Out.WriteLine('credentialCreated=true')
    [Console]::Out.WriteLine('credentialRevoked=true')
    [Console]::Out.WriteLine('postRevokeListAbsent=true')
    [Console]::Out.WriteLine('revocationVerified=true')
    [Console]::Out.WriteLine('revocationResponseClass=unauthorized-or-forbidden')
    [Console]::Out.WriteLine("requestCount=$($managementResult.requestCount)")
    [Console]::Out.WriteLine('authUsersEnumerated=false')
    [Console]::Out.WriteLine('protectedValuesEmitted=false')
    [Console]::Out.WriteLine('remoteMutation=one-management-credential-created-and-revoked')
    exit 2
}

[Console]::Out.WriteLine('state=pass')
[Console]::Out.WriteLine('lifecycleState=cleared')
[Console]::Out.WriteLine("tokenNameStem=$tokenName")
[Console]::Out.WriteLine("tokenClass=$($managementResult.tokenClass)")
[Console]::Out.WriteLine("createdUtc=$($managementResult.createdUtc)")
[Console]::Out.WriteLine("providerPassUtc=$($managementResult.providerPassUtc)")
[Console]::Out.WriteLine("revokedUtc=$($managementResult.revokedUtc)")
[Console]::Out.WriteLine("invalidationUtc=$($managementResult.invalidationUtc)")
[Console]::Out.WriteLine('exactTarget=true')
[Console]::Out.WriteLine('credentialCreated=true')
[Console]::Out.WriteLine('providerPass=true')
[Console]::Out.WriteLine('credentialRevoked=true')
[Console]::Out.WriteLine('postRevokeListAbsent=true')
[Console]::Out.WriteLine('revocationVerified=true')
[Console]::Out.WriteLine('revocationResponseClass=unauthorized-or-forbidden')
[Console]::Out.WriteLine("requestCount=$($managementResult.requestCount)")
[Console]::Out.WriteLine('authUsersEnumerated=false')
[Console]::Out.WriteLine('protectedValuesEmitted=false')
[Console]::Out.WriteLine('remoteMutation=one-management-credential-created-and-revoked')
exit 0
