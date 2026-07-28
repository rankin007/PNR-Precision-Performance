function Get-CanonicalMigrationContentHash {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$LiteralPath)

    $resolved = (Resolve-Path -LiteralPath $LiteralPath).Path
    $bytes = [IO.File]::ReadAllBytes($resolved)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        throw 'UTF-8 BOM is not permitted in governed migration content.'
    }
    $utf8 = [Text.UTF8Encoding]::new($false, $true)
    $text = $utf8.GetString($bytes)
    $canonicalText = $text.Replace("`r`n", "`n")
    $canonicalBytes = $utf8.GetBytes($canonicalText)
    $sha = [Security.Cryptography.SHA256]::Create()
    try {
        $rawHash = [BitConverter]::ToString($sha.ComputeHash($bytes)).Replace('-', '')
        $canonicalHash = [BitConverter]::ToString($sha.ComputeHash($canonicalBytes)).Replace('-', '')
    } finally {
        $sha.Dispose()
    }
    [pscustomobject]@{ RawHash = $rawHash; CanonicalHash = $canonicalHash; Text = $text }
}
