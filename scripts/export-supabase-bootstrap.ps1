$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$migrationDir = Join-Path $repoRoot "supabase\migrations"
$outputDir = Join-Path $repoRoot "supabase\bootstrap"
$outputPath = Join-Path $outputDir "remote-init.sql"

if (!(Test-Path $migrationDir)) {
  throw "Migration directory not found: $migrationDir"
}

if (!(Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$migrationFiles = Get-ChildItem -LiteralPath $migrationDir -Filter "*.sql" | Sort-Object Name

if ($migrationFiles.Count -eq 0) {
  throw "No migration files found in $migrationDir"
}

$lines = @()
$lines += "-- Generated file: supabase/bootstrap/remote-init.sql"
$lines += "-- Source migrations are concatenated in lexical order from supabase/migrations."
$lines += "-- Regenerate with: npm run db:bundle"
$lines += ""

foreach ($file in $migrationFiles) {
  $lines += "-- >>> BEGIN $($file.Name)"
  $lines += Get-Content -LiteralPath $file.FullName
  $lines += ""
  $lines += "-- <<< END $($file.Name)"
  $lines += ""
}

Set-Content -LiteralPath $outputPath -Value $lines
Write-Output "Supabase bootstrap SQL written to $outputPath"
