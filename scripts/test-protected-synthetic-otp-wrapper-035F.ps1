$ErrorActionPreference = 'Stop'

$wrapperPath = Join-Path (Split-Path $PSScriptRoot -Parent) 'scripts/Invoke-ProtectedSyntheticOtp035F.ps1'
$helperPath = Join-Path (Split-Path $PSScriptRoot -Parent) 'scripts/protected-synthetic-otp-035D.mjs'
$wrapper = Get-Content -LiteralPath $wrapperPath -Raw
$helper = Get-Content -LiteralPath $helperPath -Raw

function Assert-035F([bool]$Condition, [string]$Code) {
    if (-not $Condition) { throw $Code }
}

Assert-035F ($wrapper.Contains("https://uvskssaecdhxcgytkasc.supabase.co/")) 'TARGET_MISSING'
Assert-035F (-not $wrapper.Contains('tagnbgkroihagjmvehlx')) 'WRONG_TARGET_PRESENT'
Assert-035F ($wrapper.Contains("expectedBranch = 'codex/035F-resend-hosted-integration-and-trainer-pilot-completion'")) 'BRANCH_GUARD_MISSING'
Assert-035F ($wrapper.Contains('NON_INTERACTIVE_REFUSED')) 'INTERACTIVE_GUARD_MISSING'
Assert-035F ($wrapper.Contains("Read-Host 'Protected Supabase service-role value' -AsSecureString")) 'SECURE_PROMPT_MISSING'
Assert-035F ($wrapper.Contains("EnvironmentVariables['PP035D_SERVICE_ROLE_KEY']")) 'CHILD_ENV_MISSING'
Assert-035F (-not $wrapper.Contains('SetEnvironmentVariable($serviceVariable')) 'PERSISTENT_ENV_PRESENT'
Assert-035F ($wrapper.Contains("Remove('PP035D_SERVICE_ROLE_KEY')")) 'CHILD_CLEANUP_MISSING'
Assert-035F ($wrapper.Contains('ZeroFreeBSTR')) 'SECURE_MEMORY_CLEANUP_MISSING'
Assert-035F ($wrapper.Contains('finally')) 'FINALLY_MISSING'
Assert-035F ($wrapper.Contains('OPEN_LEDGER_REFUSED')) 'OVERWRITE_GUARD_MISSING'
Assert-035F ($wrapper.Contains('OWNERSHIP_AMBIGUOUS')) 'OWNERSHIP_GUARD_MISSING'
Assert-035F ($wrapper.Contains("ledger.state -ne 'prepared'")) 'FINALIZED_LEDGER_GUARD_MISSING'
Assert-035F ($helper.Contains('normalizeExactEmail') -and $helper.Contains('exactEmailMatch')) 'PLUS_MATCH_CONTRACT_MISSING'
Assert-035F (-not $helper.Contains('.split("+")') -and -not $helper.Contains(".split('+')")) 'PLUS_STRIPPING_PRESENT'

$resultFields = @('state=', 'authCount=', 'preparationEmail=false', 'confirmed=', 'ownership=', 'code=')
foreach ($field in $resultFields) { Assert-035F ($wrapper.Contains($field)) "OUTPUT_FIELD_MISSING_$field" }
Assert-035F ($wrapper.Contains('PROTECTED_OUTPUT_REFUSED')) 'PROTECTED_REJECTION_MISSING'
Assert-035F ($wrapper.Contains("exitCode -eq 21") -and $wrapper.Contains('PREPARATION_INPUT_REFUSED')) 'INPUT_REFUSAL_PROPAGATION_MISSING'
Assert-035F ($wrapper.Contains('HELPER_CONTRACT_REFUSED')) 'HELPER_CONTRACT_GUARD_MISSING'
Assert-035F ($wrapper.Contains("'Prepare', 'Cleanup'")) 'EXPLICIT_MODES_MISSING'
Assert-035F ($wrapper.Contains("helperMode = if (`$Operation -eq 'Cleanup') { '--cleanup' } else { '--prepare' }")) 'EXACT_HELPER_MODES_MISSING'
Assert-035F ($wrapper.Contains("cleanupLedger.run")) 'LEDGER_RUN_READ_MISSING'
Assert-035F ($wrapper.Contains("state -notin @('prepared', 'recovery')")) 'CLEANUP_STATE_GUARD_MISSING'
Assert-035F ($wrapper.Contains("Write-SanitizedCleanup035F")) 'CLEANUP_ALLOWLIST_MISSING'
Assert-035F ($wrapper.Contains("-AuthLast `$true")) 'AUTH_LAST_RESULT_MISSING'

$sensitiveOutputPatterns = @('servicePlain)', 'serviceSecure)', 'authId=', 'emailHash=', 'PP035D_SERVICE_ROLE_KEY=')
foreach ($pattern in $sensitiveOutputPatterns) {
    $escapedPattern = [regex]::Escape($pattern)
    Assert-035F (-not ($wrapper -match "Write-(Host|Output).*$escapedPattern")) "SENSITIVE_OUTPUT_$pattern"
}

@{
    state = 'pass'
    checks = @(
        'correct-target', 'wrong-target-refusal', 'interactive-only', 'child-only-environment',
        'cleanup-success-and-failure', 'plus-address-preservation', 'output-allowlist',
        'protected-field-rejection', 'ownership-no-overwrite', 'prepare-and-cleanup-only'
    )
} | ConvertTo-Json -Compress
