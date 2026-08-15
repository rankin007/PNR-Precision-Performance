[CmdletBinding()]
param(
  [Parameter(Mandatory)]
  [ValidateSet('SelfTest','Provision','VerifyReady','VerifyExpiredAndCleanup','Status','Compensate')]
  [string]$Operation,
  [string]$Origin = ''
)

$ErrorActionPreference = 'Stop'
$canonicalWorkspace = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
$expectedBranch = 'codex/029S-preflight-origin-hardening-bounded-provider-projection-and-readiness-recovery'
$expectedHead = 'd822c027c58ad88ec7472e35986e7a33d6a3d6c9'
$projectId = 'prj_6To7czLpCEGL6fInkQwE4egePPpq'
$liveTarget = 'PrecisionPerformance/029S/PreflightBearer'
$testTarget = 'PrecisionPerformance/029S/SyntheticTest'
$remoteNames = @(
  'PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256',
  'PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE',
  'PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT'
)

foreach ($scope in @('Global','Script')) {
  if (Get-Variable -Name Transcript -Scope $scope -ErrorAction SilentlyContinue) { throw 'TRANSCRIPT_REFUSED' }
}

Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public static class PP029SCredential {
 [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]
 public struct CREDENTIAL {
  public UInt32 Flags; public UInt32 Type; public string TargetName; public string Comment;
  public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten; public UInt32 CredentialBlobSize;
  public IntPtr CredentialBlob; public UInt32 Persist; public UInt32 AttributeCount; public IntPtr Attributes;
  public string TargetAlias; public string UserName;
 }
 [DllImport("advapi32", EntryPoint="CredWriteW", CharSet=CharSet.Unicode, SetLastError=true)]
 public static extern bool Write(ref CREDENTIAL credential, UInt32 flags);
 [DllImport("advapi32", EntryPoint="CredReadW", CharSet=CharSet.Unicode, SetLastError=true)]
 public static extern bool Read(string target, UInt32 type, UInt32 flags, out IntPtr credential);
 [DllImport("advapi32", EntryPoint="CredDeleteW", CharSet=CharSet.Unicode, SetLastError=true)]
 public static extern bool Delete(string target, UInt32 type, UInt32 flags);
 [DllImport("advapi32", SetLastError=true)] public static extern void CredFree(IntPtr credential);
}
'@

function Test-FixedCredential([string]$Target) {
  $pointer = [IntPtr]::Zero
  if (-not [PP029SCredential]::Read($Target, 1, 0, [ref]$pointer)) {
    if ([Runtime.InteropServices.Marshal]::GetLastWin32Error() -eq 1168) { return $false }
    throw 'CREDENTIAL_READ_REFUSED'
  }
  [PP029SCredential]::CredFree($pointer)
  return $true
}

function Write-FixedCredential([string]$Target, [string]$PlainText) {
  if (Test-FixedCredential $Target) { throw 'CREDENTIAL_TARGET_EXISTS' }
  $secure = ConvertTo-SecureString $PlainText -AsPlainText -Force
  $blob = [Runtime.InteropServices.Marshal]::SecureStringToGlobalAllocUnicode($secure)
  try {
    $credential = New-Object PP029SCredential+CREDENTIAL
    $credential.Type = 1
    $credential.TargetName = $Target
    $credential.Persist = 2
    $credential.CredentialBlob = $blob
    $credential.CredentialBlobSize = [Text.Encoding]::Unicode.GetByteCount($PlainText)
    $credential.UserName = 'sprint-029s'
    if (-not [PP029SCredential]::Write([ref]$credential, 0)) { throw 'CREDENTIAL_WRITE_REFUSED' }
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeGlobalAllocUnicode($blob)
    $secure.Dispose()
  }
}

function Read-FixedCredential([string]$Target) {
  $pointer = [IntPtr]::Zero
  if (-not [PP029SCredential]::Read($Target, 1, 0, [ref]$pointer)) { throw 'CREDENTIAL_ABSENT' }
  try {
    $credential = [Runtime.InteropServices.Marshal]::PtrToStructure($pointer, [type][PP029SCredential+CREDENTIAL])
    return [Runtime.InteropServices.Marshal]::PtrToStringUni($credential.CredentialBlob, [int]($credential.CredentialBlobSize / 2))
  } finally {
    [PP029SCredential]::CredFree($pointer)
  }
}

function Remove-FixedCredential([string]$Target) {
  if (-not [PP029SCredential]::Delete($Target, 1, 0)) {
    if ([Runtime.InteropServices.Marshal]::GetLastWin32Error() -ne 1168) { throw 'CREDENTIAL_DELETE_REFUSED' }
  }
}

function Assert-Workspace {
  $current = [IO.Path]::GetFullPath((Get-Location).Path).TrimEnd('\')
  $top = [IO.Path]::GetFullPath((& git rev-parse --show-toplevel).Trim()).TrimEnd('\')
  $branch = (& git branch --show-current).Trim()
  $head = (& git rev-parse HEAD).Trim()
  if ($current -cne $canonicalWorkspace -or $top -cne $canonicalWorkspace -or $branch -cne $expectedBranch -or $head -cne $expectedHead) {
    throw 'WORKSPACE_REFUSED'
  }
}

function Assert-Project {
  $link = Get-Content -Raw -LiteralPath '.vercel/project.json' | ConvertFrom-Json
  if ($link.projectId -cne $projectId) { throw 'PROJECT_REFUSED' }
}

function Invoke-VercelCaptured([string[]]$Arguments, [AllowNull()][string]$InputValue = $null) {
  $savedErrorActionPreference = $ErrorActionPreference
  $inputWasBound = $PSBoundParameters.ContainsKey('InputValue')
  $exitCode = $null
  try {
    $ErrorActionPreference = 'Continue'
    $global:LASTEXITCODE = $null
    if (-not $inputWasBound) {
      $captured = & npx.cmd vercel @Arguments 2>&1 | Out-String
    } else {
      $captured = $InputValue | & npx.cmd vercel @Arguments 2>&1 | Out-String
    }
    $exitCode = $global:LASTEXITCODE
  } finally {
    $ErrorActionPreference = $savedErrorActionPreference
  }
  if ($null -eq $exitCode -or $exitCode -ne 0) { throw 'VERCEL_OPERATION_REFUSED' }
  return ($captured -replace "`e\[[0-9;]*[A-Za-z]", '')
}

function Get-RemotePresence {
  $listing = Invoke-VercelCaptured @('env','ls','production')
  $present = @{}
  foreach ($name in $remoteNames) { $present[$name] = [regex]::IsMatch($listing, "(?m)^\s*$([regex]::Escape($name))\s") }
  return $present
}

function Add-RemoteValue([string]$Name, [string]$Value) {
  if ($Name -notin $remoteNames) { throw 'REMOTE_NAME_REFUSED' }
  [void](Invoke-VercelCaptured @('env','add',$Name,'production','--sensitive','--yes') $Value)
}

function Remove-RemoteValue([string]$Name) {
  if ($Name -notin $remoteNames) { throw 'REMOTE_NAME_REFUSED' }
  [void](Invoke-VercelCaptured @('env','rm',$Name,'production','--yes'))
}

function Read-LiveRecord {
  $plain = Read-FixedCredential $liveTarget
  try {
    $record = $plain | ConvertFrom-Json
    if ($record.version -ne 1 -or $record.remoteNames.Count -ne 3 -or
      @($record.remoteNames | Where-Object { $_ -notin $remoteNames }).Count -ne 0) { throw 'CREDENTIAL_RECORD_REFUSED' }
    return $record
  } finally {
    $plain = $null
  }
}

function Format-CanonicalUtc([DateTime]$Value) {
  return $Value.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fff'Z'", [Globalization.CultureInfo]::InvariantCulture)
}

function Assert-Origin([string]$Value) {
  if (-not $Value -or $Value -cne $Value.Trim()) { throw 'ORIGIN_REFUSED' }
  try { $uri = [uri]$Value } catch { throw 'ORIGIN_REFUSED' }
  if (-not $uri.IsAbsoluteUri -or $uri.Scheme -cne 'https' -or $uri.UserInfo -or
    $uri.Port -ne 443 -or $uri.AbsolutePath -cne '/' -or $uri.Query -or $uri.Fragment -or
    $uri.Host -notmatch '^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$') {
    throw 'ORIGIN_REFUSED'
  }
  return $uri.GetLeftPart([UriPartial]::Authority)
}

function Test-OriginMatrix {
  $valid = 'https://pnr-precision-performance-abc123-rankin007s-projects.vercel.app'
  $cases = @(
    @{ Value=$valid; Expected=$true },
    @{ Value="$valid`:443"; Expected=$true },
    @{ Value="$valid`:444"; Expected=$false },
    @{ Value=('https://user' + '@pnr-precision-performance-abc123-rankin007s-projects.vercel.app'); Expected=$false },
    @{ Value="$valid/path"; Expected=$false },
    @{ Value="$valid?query=1"; Expected=$false },
    @{ Value="$valid#fragment"; Expected=$false },
    @{ Value=$valid.Replace('https:','http:'); Expected=$false },
    @{ Value='https://precisionperformance.com.au'; Expected=$false }
  )
  $passed = 0
  foreach ($case in $cases) {
    $accepted = $true
    try { [void](Assert-Origin $case.Value) } catch { $accepted = $false }
    if ($accepted -ne $case.Expected) { throw 'ORIGIN_SELF_TEST_REFUSED' }
    $passed += 1
  }
  return $passed
}

function Invoke-Candidate([string]$CandidateOrigin, [string]$Bearer) {
  Add-Type -AssemblyName System.Net.Http
  $client = New-Object Net.Http.HttpClient
  $request = New-Object Net.Http.HttpRequestMessage([Net.Http.HttpMethod]::Post, "$CandidateOrigin/api/internal/enquiries")
  $request.Headers.Authorization = New-Object Net.Http.Headers.AuthenticationHeaderValue('Bearer', $Bearer)
  $request.Content = New-Object Net.Http.StringContent('{"action":"smtp-preflight"}', [Text.Encoding]::UTF8, 'application/json')
  try {
    $response = $client.SendAsync($request).GetAwaiter().GetResult()
    $body = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
    return @{ StatusCode = [int]$response.StatusCode; Body = $body }
  } finally {
    $request.Dispose()
    $client.Dispose()
  }
}

function Remove-OwnedTemporaryResources([pscustomobject]$Record) {
  foreach ($name in $Record.remoteNames) { Remove-RemoteValue $name }
  Remove-FixedCredential $liveTarget
  $presence = Get-RemotePresence
  if (($remoteNames | Where-Object { $presence[$_] }).Count -ne 0 -or (Test-FixedCredential $liveTarget)) { throw 'CLEANUP_REFUSED' }
}

Assert-Workspace
Assert-Project

if ($Operation -eq 'SelfTest') {
  if (Test-FixedCredential $testTarget) { throw 'SYNTHETIC_TARGET_EXISTS' }
  try {
    Write-FixedCredential $testTarget 'synthetic-fixture-only'
    $roundTrip = Read-FixedCredential $testTarget
    if ($roundTrip -cne 'synthetic-fixture-only') { throw 'CREDENTIAL_ROUNDTRIP_REFUSED' }
  } finally {
    $roundTrip = $null
    Remove-FixedCredential $testTarget
  }
  if (Test-FixedCredential $testTarget) { throw 'SYNTHETIC_DELETE_REFUSED' }
  $canonicalFixture = Format-CanonicalUtc ([DateTime]::SpecifyKind([DateTime]'2026-08-06T02:03:04.567', [DateTimeKind]::Utc))
  if ($canonicalFixture -cne '2026-08-06T02:03:04.567Z') { throw 'CANONICAL_UTC_REFUSED' }
  $originCases = Test-OriginMatrix
  [pscustomobject]@{controller='029S';operation='self-test';state='pass';originCases=$originCases;credentialResidue=0} | ConvertTo-Json -Compress
  exit 0
}

if ($Operation -eq 'Provision') {
  if (Test-FixedCredential $liveTarget) { throw 'CREDENTIAL_TARGET_EXISTS' }
  $presence = Get-RemotePresence
  if (($remoteNames | Where-Object { $presence[$_] }).Count -ne 0) { throw 'REMOTE_NAME_EXISTS' }
  $bytes = New-Object byte[] 32
  $generator = [Security.Cryptography.RandomNumberGenerator]::Create()
  $created = New-Object System.Collections.Generic.List[string]
  try {
    $generator.GetBytes($bytes)
    $bearer = [Convert]::ToBase64String($bytes).TrimEnd('=').Replace('+','-').Replace('/','_')
    $sha = [Security.Cryptography.SHA256]::Create()
    try {
      $verifier = ([BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($bearer)))).Replace('-','').ToLowerInvariant()
    } finally { $sha.Dispose() }
    $notBefore = [DateTime]::UtcNow.AddMinutes(-1)
    $expiresAt = $notBefore.AddMinutes(15)
    $record = [ordered]@{
      version=1; runId=[guid]::NewGuid().ToString('N'); bearer=$bearer; verifier=$verifier;
      notBefore=(Format-CanonicalUtc $notBefore); expiresAt=(Format-CanonicalUtc $expiresAt); remoteNames=$remoteNames
    }
    Write-FixedCredential $liveTarget ($record | ConvertTo-Json -Compress)
    Add-RemoteValue $remoteNames[0] $record.verifier; $created.Add($remoteNames[0])
    Add-RemoteValue $remoteNames[1] $record.notBefore; $created.Add($remoteNames[1])
    Add-RemoteValue $remoteNames[2] $record.expiresAt; $created.Add($remoteNames[2])
    '{"controller":"029S","operation":"provision","state":"pass","bindingCount":3,"windowClass":"bounded","credentialState":"present"}'
  } catch {
    foreach ($name in $created) { try { Remove-RemoteValue $name } catch {} }
    Remove-FixedCredential $liveTarget
    throw
  } finally {
    [Array]::Clear($bytes, 0, $bytes.Length)
    $generator.Dispose()
    $bearer = $null; $verifier = $null; $record = $null
  }
  exit 0
}

if ($Operation -eq 'Status') {
  $presence = Get-RemotePresence
  $count = @($remoteNames | Where-Object { $presence[$_] }).Count
  [pscustomobject]@{controller='029S';operation='status';state='pass';bindingCount=$count;credentialState=if(Test-FixedCredential $liveTarget){'present'}else{'absent'}} | ConvertTo-Json -Compress
  exit 0
}

$record = Read-LiveRecord
try {
  if ($Operation -eq 'VerifyReady') {
    $candidateOrigin = Assert-Origin $Origin
    $current = [DateTime]::UtcNow
    if ($current -lt [DateTime]::Parse($record.notBefore).ToUniversalTime() -or
      $current -ge [DateTime]::Parse($record.expiresAt).ToUniversalTime()) { throw 'WINDOW_REFUSED' }
    $result = Invoke-Candidate $candidateOrigin $record.bearer
    if ($result.StatusCode -ne 200) { throw 'PREFLIGHT_REFUSED' }
    try { $value = $result.Body | ConvertFrom-Json } catch { throw 'PREFLIGHT_REFUSED' }
    if ($value.result -cne 'smtp-preflight' -or $value.status -cne 'ready' -or
      $value.providerClass -cne 'resend' -or $null -ne $value.errorClass) { throw 'PREFLIGHT_REFUSED' }
    '{"controller":"029S","operation":"verify-ready","state":"pass","requestCount":1,"providerClass":"resend","errorClass":null}'
  } elseif ($Operation -eq 'VerifyExpiredAndCleanup') {
    $candidateOrigin = Assert-Origin $Origin
    if ([DateTime]::UtcNow -lt [DateTime]::Parse($record.expiresAt).ToUniversalTime()) { throw 'EXPIRY_NOT_REACHED' }
    $result = Invoke-Candidate $candidateOrigin $record.bearer
    if ($result.StatusCode -ne 404) { throw 'EXPIRED_DENIAL_REFUSED' }
    Remove-OwnedTemporaryResources $record
    '{"controller":"029S","operation":"expired-denial-cleanup","state":"pass","requestCount":1,"httpClass":"not-found","bindingResidue":0,"credentialResidue":0}'
  } elseif ($Operation -eq 'Compensate') {
    Remove-OwnedTemporaryResources $record
    '{"controller":"029S","operation":"compensate","state":"pass","bindingResidue":0,"credentialResidue":0}'
  }
} finally {
  if ($record) { $record.bearer = $null; $record.verifier = $null }
  $result = $null; $value = $null; $record = $null
}
