param(
  [Parameter(Mandatory = $true)]
  [string] $Command,

  [int] $TimeoutSeconds = 120,

  [int] $TailLines = 120,

  [string] $LogDir = ""
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$stamp = Get-Date -Format "yyyyMMdd-HHmmss-fff"
$logDirFallback = $false

if ([string]::IsNullOrWhiteSpace($LogDir)) {
  $requestedLogDir = Join-Path $repoRoot ".validation-logs"
} elseif ([System.IO.Path]::IsPathRooted($LogDir)) {
  $requestedLogDir = $LogDir
} else {
  $requestedLogDir = Join-Path $repoRoot $LogDir
}

try {
  New-Item -ItemType Directory -Force -Path $requestedLogDir | Out-Null
  $resolvedLogDir = Resolve-Path $requestedLogDir
} catch {
  $fallbackRoot = Join-Path ([System.IO.Path]::GetTempPath()) "pnr-validation-logs"
  New-Item -ItemType Directory -Force -Path $fallbackRoot | Out-Null
  $resolvedLogDir = Resolve-Path $fallbackRoot
  $logDirFallback = $true
}

$stdout = Join-Path $resolvedLogDir "$stamp.stdout.log"
$stderr = Join-Path $resolvedLogDir "$stamp.stderr.log"
$beforeIds = @(Get-Process node,npm -ErrorAction SilentlyContinue | ForEach-Object { $_.Id })
$startedAt = Get-Date

Write-Output "COMMAND: $Command"
Write-Output "TIMEOUT_SECONDS: $TimeoutSeconds"
if ($logDirFallback) {
  Write-Output "LOG_DIR_FALLBACK: requested '$requestedLogDir' but using '$resolvedLogDir'"
}
Write-Output "STDOUT_LOG: $stdout"
Write-Output "STDERR_LOG: $stderr"

$process = Start-Process `
  -FilePath "cmd.exe" `
  -ArgumentList @("/d", "/s", "/c", $Command) `
  -WorkingDirectory $repoRoot `
  -RedirectStandardOutput $stdout `
  -RedirectStandardError $stderr `
  -PassThru `
  -WindowStyle Hidden

$completed = $process.WaitForExit($TimeoutSeconds * 1000)
$process.Refresh()

if (-not $completed) {
  $statusCode = 124
  Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue

  $after = @(Get-Process node,npm -ErrorAction SilentlyContinue | Where-Object {
    ($beforeIds -notcontains $_.Id) -and ($_.StartTime -ge $startedAt.AddSeconds(-2))
  })

  foreach ($child in $after) {
    Stop-Process -Id $child.Id -Force -ErrorAction SilentlyContinue
  }

  Write-Output "STATUS: timeout after ${TimeoutSeconds}s"
} else {
  $statusCode = if ($null -ne $process.ExitCode) { [int] $process.ExitCode } else { 0 }
  Write-Output "STATUS: exited $statusCode"
}

Write-Output "--- stdout tail ---"
if (Test-Path $stdout) {
  Get-Content $stdout -Tail $TailLines
}

Write-Output "--- stderr tail ---"
if (Test-Path $stderr) {
  Get-Content $stderr -Tail $TailLines
}

exit $statusCode
