$ErrorActionPreference = "Stop"

$requiredTokens = @(
  "#12352f", "#111d2b", "#f4f1e9", "#ffffff", "#278bc2",
  "#c3a15b", "#68747a", "#36845b", "#d39a2e", "#c8514a"
)
$css = Get-Content -LiteralPath "app/globals.css" -Raw
foreach ($token in $requiredTokens) {
  if (-not $css.Contains($token)) { throw "Missing required design token: $token" }
}

$metadata = Get-Content -LiteralPath "app/layout.tsx" -Raw
$siteConfig = Get-Content -LiteralPath "lib/site-config.ts" -Raw
$holding = Get-Content -LiteralPath "app/page.tsx" -Raw
$status = Get-Content -LiteralPath "components/ui/status-indicator.tsx" -Raw
$result = Get-Content -LiteralPath "components/ops/biochemistry-result-panel.tsx" -Raw

if (-not $metadata.Contains("Equine Precision Performance")) { throw "Root metadata brand is missing." }
if (-not $siteConfig.Contains("Precision Performance Portal")) { throw "Portal product name is missing." }
if (-not $holding.Contains("index: false") -or -not $holding.Contains("follow: false")) { throw "Holding-page robots protection changed." }
if (-not $holding.Contains('href="/sign-in"')) { throw "Operator sign-in path is missing." }
if (-not $status.Contains('aria-hidden="true"') -or -not $status.Contains("label")) { throw "Status marker semantics are incomplete." }
if (-not $result.Contains("Biochemistry Trend Score") -or -not $result.Contains("healthScore")) { throw "Display-only score terminology compatibility is incomplete." }

Write-Output "Sprint 019 design-system validation passed."
