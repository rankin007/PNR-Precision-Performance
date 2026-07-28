$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'lib\migration-content-hash.ps1')
$source = (Resolve-Path (Join-Path $PSScriptRoot '..\supabase\migrations\0009_biochemistry_test_data_model.sql')).Path
$tempRoot = Join-Path ([IO.Path]::GetTempPath()) ('023f-hash-' + [guid]::NewGuid().ToString('N'))
$expected = '6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9'
$utf8 = [Text.UTF8Encoding]::new($false, $true)
function Assert-Throws([scriptblock]$Action, [string]$Name) {
    try { & $Action; throw "$Name did not fail." } catch { if ($_.Exception.Message -eq "$Name did not fail.") { throw } }
}
try {
    New-Item -ItemType Directory -Path $tempRoot | Out-Null
    $raw = [IO.File]::ReadAllBytes($source)
    $text = $utf8.GetString($raw).Replace("`r`n", "`n")
    $lf = Join-Path $tempRoot 'lf.sql'; $crlf = Join-Path $tempRoot 'crlf.sql'
    [IO.File]::WriteAllBytes($lf, $utf8.GetBytes($text))
    [IO.File]::WriteAllBytes($crlf, $utf8.GetBytes($text.Replace("`n", "`r`n")))
    $lfResult = Get-CanonicalMigrationContentHash $lf
    $crlfResult = Get-CanonicalMigrationContentHash $crlf
    if ($lfResult.CanonicalHash -ne $expected -or $crlfResult.CanonicalHash -ne $expected) { throw 'LF/CRLF canonical hash failed.' }
    if ($lfResult.RawHash -eq $crlfResult.RawHash) { throw 'Raw hashes unexpectedly agree.' }
    $mutations = [ordered]@{
        content = $text.Replace('create table', 'create  table')
        trailing_space = $text.Replace("`n", " `n")
        final_newline = $(if ($text.EndsWith("`n")) { $text.Substring(0,$text.Length-1) } else { $text + "`n" })
        lone_cr = $text.Substring(0, $text.IndexOf("`n")) + "`r" + $text.Substring($text.IndexOf("`n") + 1)
    }
    foreach ($name in $mutations.Keys) {
        $path = Join-Path $tempRoot "$name.sql"; [IO.File]::WriteAllBytes($path,$utf8.GetBytes($mutations[$name]))
        if ((Get-CanonicalMigrationContentHash $path).CanonicalHash -eq $expected) { throw "$name mutation was hidden." }
    }
    $bom = Join-Path $tempRoot 'bom.sql'; [IO.File]::WriteAllBytes($bom, [byte[]](0xEF,0xBB,0xBF) + $utf8.GetBytes($text)); Assert-Throws { Get-CanonicalMigrationContentHash $bom } 'BOM'
    $invalid = Join-Path $tempRoot 'invalid.sql'; [IO.File]::WriteAllBytes($invalid,[byte[]](0xC3,0x28)); Assert-Throws { Get-CanonicalMigrationContentHash $invalid } 'invalid UTF-8'
    'Sprint 023F migration hash portability tests passed.'
} finally {
    if (Test-Path $tempRoot) { Remove-Item -LiteralPath $tempRoot -Recurse -Force }
}
if (Test-Path $tempRoot) { throw 'Temporary test directory was not removed.' }
