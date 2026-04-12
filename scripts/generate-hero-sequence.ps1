param(
  [string]$InputPath = "public/meatflip (1).mp4",
  [string]$OutputDir = "public/hero-sequence",
  [int]$Frames = 48,
  [int]$Width = 1280
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  throw "ffmpeg is not installed or not available in PATH."
}

if (-not (Test-Path -LiteralPath $InputPath)) {
  throw "Input video not found: $InputPath"
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
Get-ChildItem -LiteralPath $OutputDir -Filter "frame_*.webp" -ErrorAction SilentlyContinue | Remove-Item -Force

$tempOutputDir = Join-Path ([System.IO.Path]::GetTempPath()) ("hero-sequence-" + [System.Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force -Path $tempOutputDir | Out-Null

$framePattern = Join-Path $tempOutputDir "frame_%04d.webp"
$filter = "fps=$($Frames / 8),scale=${Width}:-1:flags=lanczos"

ffmpeg `
  -y `
  -i "$InputPath" `
  -vf $filter `
  -an `
  -sn `
  -start_number 1 `
  -c:v libwebp `
  -quality 80 `
  -compression_level 6 `
  "$framePattern"

Get-ChildItem -LiteralPath $tempOutputDir -Filter "frame_*.webp" | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $OutputDir $_.Name) -Force
}

Remove-Item -LiteralPath $tempOutputDir -Recurse -Force

Write-Host "Generated hero sequence into $OutputDir"
