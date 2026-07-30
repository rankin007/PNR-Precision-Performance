$ErrorActionPreference = 'Stop'
$path = Join-Path (Split-Path -Parent $PSScriptRoot) 'scripts/Invoke-SupabaseParticipantHandoff035C.ps1'
$source = Get-Content -LiteralPath $path -Raw
$parseErrors = $null
[void][Management.Automation.Language.Parser]::ParseFile($path, [ref]$null, [ref]$parseErrors)

function Assert-035C([bool]$Condition, [string]$Code) {
    if (-not $Condition) { throw $Code }
}

Assert-035C ($parseErrors.Count -eq 0) 'WRAPPER_PARSE'
Assert-035C ($source -match "\[ValidateSet\('A', 'B', 'C'\)\]") 'ALIAS_ALLOWLIST'
Assert-035C ($source -match "\[ValidateSet\('Apply', 'Contain'\)\]" -and $source -match 'CONTAINMENT_ALIAS_REFUSED') 'CONTAINMENT_MODE'
Assert-035C ($source -match [regex]::Escape("`$expectedProjectUrl = 'https://uvskssaecdhxcgytkasc.supabase.co'")) 'PROJECT_GUARD'
Assert-035C ($source -match 'BRANCH_REFUSED' -and $source -match 'HEAD_REFUSED' -and $source -match 'DIRTY_WORKTREE_REFUSED') 'REPOSITORY_GUARDS'
Assert-035C ($source -match '\$startInfo\.EnvironmentVariables\[\$serviceVariable\] = \$servicePlain') 'CHILD_SECRET_ENV'
Assert-035C ($source -notmatch 'Arguments\s*=.*servicePlain' -and $source -notmatch 'ArgumentList.*servicePlain') 'NO_SECRET_ARGUMENT'
Assert-035C (([regex]::Matches($source, 'SecureStringToBSTR\(').Count) -eq 1) 'ONE_BSTR_ALLOCATION'
Assert-035C (([regex]::Matches($source, 'ZeroFreeBSTR\(').Count) -eq 1) 'ONE_BSTR_ZERO_FREE'
Assert-035C (([regex]::Matches($source, '\$serviceSecure\.Dispose\(\)').Count) -eq 1) 'ONE_SECURESTRING_DISPOSE'
Assert-035C ($source -match 'finally\s*\{' -and $source -match '\$childExitCode = \$child\.ExitCode' -and $source -match 'HANDOFF_FAILED_SANITIZED' -and $source -match 'SECRET_INPUT_CANCELLED') 'ALL_CLEANUP_PATHS'
Assert-035C ($source -match 'UseShellExecute = \$false' -and $source -match 'RedirectStandardInput = \$false' -and $source -match 'RedirectStandardOutput = \$false') 'INTERACTIVE_CHILD'
Assert-035C ($source -match 'TRANSCRIPTION_REFUSED' -and $source -notmatch 'Start-Transcript|Add-Content|Set-Content|Out-File|Export-Clixml|WriteAllText|WriteAllBytes') 'NO_TRANSCRIPT_OR_FILE_WRITE'
Assert-035C ($source -notmatch 'Write-Output|Write-Host' -and $source -match 'exit \$childExitCode') 'SANITIZED_PASSTHROUGH_ONLY'
Assert-035C ($source -match 'PARENT_SECRET_ENV_REFUSED' -and $source.Contains("[Environment]::SetEnvironmentVariable(`$serviceVariable, `$null, 'Process')")) 'PARENT_ENV_CLEAR'

Write-Output 'Sprint 035C participant wrapper static self-test passed.'
