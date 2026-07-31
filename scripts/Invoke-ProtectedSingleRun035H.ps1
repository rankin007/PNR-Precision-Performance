[CmdletBinding()]
param([ValidateSet('Readiness','Live','Recover')][string]$Mode = 'Readiness')
$ErrorActionPreference = 'Stop'
$expected = 'codex/035H-protected-single-run-authentication-acceptance-harness'
if ((git branch --show-current).Trim() -ne $expected) { throw 'SOURCE_REFUSED' }
if (git diff --name-only --diff-filter=U) { throw 'SOURCE_REFUSED' }
if ($Host.Name -notmatch 'ConsoleHost') { throw 'PROTECTED_CONSOLE_REQUIRED' }
if ($Mode -eq 'Live') { throw 'LIVE_GATE_REFUSED: compliant mailbox secure-store adapter is not established' }
$arg = if ($Mode -eq 'Recover') { '--recover' } else { '--readiness' }
& node scripts/protected-single-run-035H.mjs $arg
exit $LASTEXITCODE
