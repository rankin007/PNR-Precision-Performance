param(
  [Parameter(Mandatory = $true)]
  [string]$InputPath,

  [Parameter(Mandatory = $true)]
  [string]$OutputPath,

  [int]$MaxWidth = 1280,
  [int]$Crf = 30,
  [string]$Preset = "slow",
  [string]$AudioBitrate = "96k"
)

$ErrorActionPreference = "Stop"

function Resolve-FfmpegTool {
  param(
    [Parameter(Mandatory = $true)]
    [string]$ToolName
  )

  $command = Get-Command $ToolName -ErrorAction SilentlyContinue
  if ($command) {
    return $command.Source
  }

  $wingetRoot = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages"
  if (Test-Path $wingetRoot) {
    $tool = Get-ChildItem -Path $wingetRoot -Recurse -Filter "$ToolName.exe" -ErrorAction SilentlyContinue |
      Select-Object -First 1 -ExpandProperty FullName
    if ($tool) {
      return $tool
    }
  }

  throw "$ToolName.exe was not found. Install FFmpeg first."
}

$resolvedInput = Resolve-Path -LiteralPath $InputPath
$resolvedOutput = [System.IO.Path]::GetFullPath($OutputPath)
$outputDir = Split-Path -Parent $resolvedOutput

if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$ffmpeg = Resolve-FfmpegTool -ToolName "ffmpeg"

& $ffmpeg -y `
  -i $resolvedInput `
  -vf "scale=$MaxWidth:-2" `
  -c:v libx264 `
  -preset $Preset `
  -crf $Crf `
  -movflags +faststart `
  -c:a aac `
  -b:a $AudioBitrate `
  $resolvedOutput

if ($LASTEXITCODE -ne 0) {
  throw "FFmpeg failed with exit code $LASTEXITCODE."
}
