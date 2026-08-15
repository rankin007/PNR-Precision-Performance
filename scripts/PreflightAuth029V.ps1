[CmdletBinding()]
param(
  [Parameter(Mandatory)]
  [ValidateSet('SelfTest','CredentialSelfTest','Baseline','Inventory','AcceptPrivatePasswordBaseline','AddStructuralSmtp','Provision','Deploy','VerifyPublicGate','VerifyReady','VerifyExpiredAndCleanup','Status','Compensate')]
  [string]$Operation,
  [string]$Origin = ''
)

$ErrorActionPreference = 'Stop'
$canonicalWorkspace = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
$expectedBranch = 'codex/029V-vercel-agent-envelope-and-alias-isolation-recovery'
$expectedHead = 'd822c027c58ad88ec7472e35986e7a33d6a3d6c9'
$projectId = 'prj_6To7czLpCEGL6fInkQwE4egePPpq'
$acceptedDeployment = 'dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf'
$inert029NDeployment = 'dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB'
$inert029ODeployment = 'dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq'
$inert029SPreview = 'dpl_7MTexxU6RecGHZvCE9BukUwZU6Hx'
$liveTarget = 'PrecisionPerformance/029V/PreflightBearer'
$testTarget = 'PrecisionPerformance/029V/SyntheticTest'
$script:OwnedDeploymentId = ''
$script:DeployInvocationStarted = $false

$structuralNames = @(
  'PUBLIC_ENQUIRY_SMTP_HOST',
  'PUBLIC_ENQUIRY_SMTP_PORT',
  'PUBLIC_ENQUIRY_SMTP_USER'
)
$dedicatedNames = @($structuralNames + 'PUBLIC_ENQUIRY_SMTP_PASS')
$temporaryNames = @(
  'PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256',
  'PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE',
  'PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT'
)
$ownedNames = @($dedicatedNames + $temporaryNames)
$activationName = 'PUBLIC_ENQUIRY_SUBMISSION_ENABLED'
$structuralValues = @{
  'PUBLIC_ENQUIRY_SMTP_HOST' = 'smtp.resend.com'
  'PUBLIC_ENQUIRY_SMTP_PORT' = '465'
  'PUBLIC_ENQUIRY_SMTP_USER' = 'resend'
}
$genericNames = @('SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS','SMTP_FROM')
$fixedInspectIds = @($acceptedDeployment,$inert029NDeployment,$inert029ODeployment,$inert029SPreview)
$aliases = @(
  'precisionperformance.com.au',
  'www.precisionperformance.com.au',
  'pnr-precision-performance.vercel.app',
  'pnr-precision-performance-rankin007s-projects.vercel.app',
  'pnr-precision-performance-rankin007-rankin007s-projects.vercel.app'
)
$baselineFailureCodes = @(
  'BASELINE_ENVIRONMENT_REFUSED',
  'BASELINE_CREDENTIAL_REFUSED',
  'BASELINE_029V_DEPLOYMENT_REFUSED',
  'BASELINE_EXPECTED_ALIAS_INVENTORY_REFUSED',
  'BASELINE_ACCEPTED_DEPLOYMENT_REFUSED',
  'BASELINE_029N_DEPLOYMENT_REFUSED',
  'BASELINE_029O_DEPLOYMENT_REFUSED',
  'BASELINE_RETAINED_PREVIEW_REFUSED'
)

foreach ($scope in @('Global','Script')) {
  if (Get-Variable -Name Transcript -Scope $scope -ErrorAction SilentlyContinue) { throw 'TRANSCRIPT_REFUSED' }
}

Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public static class PP029VCredential {
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
  if (-not [PP029VCredential]::Read($Target, 1, 0, [ref]$pointer)) {
    if ([Runtime.InteropServices.Marshal]::GetLastWin32Error() -eq 1168) { return $false }
    throw 'CREDENTIAL_READ_REFUSED'
  }
  [PP029VCredential]::CredFree($pointer)
  return $true
}

function Set-FixedCredential([string]$Target, [string]$PlainText, [bool]$AllowOverwrite = $false) {
  if (-not $AllowOverwrite -and (Test-FixedCredential $Target)) { throw 'CREDENTIAL_TARGET_EXISTS' }
  $secure = ConvertTo-SecureString $PlainText -AsPlainText -Force
  $blob = [Runtime.InteropServices.Marshal]::SecureStringToGlobalAllocUnicode($secure)
  try {
    $credential = New-Object PP029VCredential+CREDENTIAL
    $credential.Type = 1
    $credential.TargetName = $Target
    $credential.Persist = 2
    $credential.CredentialBlob = $blob
    $credential.CredentialBlobSize = [Text.Encoding]::Unicode.GetByteCount($PlainText)
    $credential.UserName = 'sprint-029v'
    if (-not [PP029VCredential]::Write([ref]$credential, 0)) { throw 'CREDENTIAL_WRITE_REFUSED' }
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeGlobalAllocUnicode($blob)
    $secure.Dispose()
  }
}

function Read-FixedCredential([string]$Target) {
  $pointer = [IntPtr]::Zero
  if (-not [PP029VCredential]::Read($Target, 1, 0, [ref]$pointer)) { throw 'CREDENTIAL_ABSENT' }
  try {
    $credential = [Runtime.InteropServices.Marshal]::PtrToStructure($pointer, [type][PP029VCredential+CREDENTIAL])
    return [Runtime.InteropServices.Marshal]::PtrToStringUni($credential.CredentialBlob, [int]($credential.CredentialBlobSize / 2))
  } finally {
    [PP029VCredential]::CredFree($pointer)
  }
}

function Remove-FixedCredential([string]$Target) {
  if (-not [PP029VCredential]::Delete($Target, 1, 0)) {
    if ([Runtime.InteropServices.Marshal]::GetLastWin32Error() -ne 1168) { throw 'CREDENTIAL_DELETE_REFUSED' }
  }
}

function Assert-Workspace {
  $current = [IO.Path]::GetFullPath((Get-Location).Path).TrimEnd('\')
  $top = [IO.Path]::GetFullPath((& git rev-parse --show-toplevel).Trim()).TrimEnd('\')
  $branch = (& git branch --show-current).Trim()
  $head = (& git rev-parse HEAD).Trim()
  if ($current -cne $canonicalWorkspace -or $top -cne $canonicalWorkspace -or
    $branch -cne $expectedBranch -or $head -cne $expectedHead) { throw 'WORKSPACE_REFUSED' }
}

function Assert-Project {
  $link = Get-Content -Raw -LiteralPath '.vercel/project.json' | ConvertFrom-Json
  if ($link.projectId -cne $projectId) { throw 'PROJECT_REFUSED' }
}

function Resolve-VercelCliVersion {
  $vercelCommand = Get-Command vercel.cmd -ErrorAction Stop
  $result = Invoke-CapturedChildProcess -ExecutablePath $vercelCommand.Source -CommandArgs @('--version') -InputWasBound $false -InputValue $null -VectorClass 'version'
  if ($result.ExitCode -ne 0) { throw 'CLI_VERSION_REFUSED' }
  $lines = @(@($result.Stdout,$result.Stderr) | ForEach-Object { @($_ -split "`r?`n") } | ForEach-Object { $_.Trim() } | Where-Object { $_ })
  if ($lines.Count -lt 1 -or $lines.Count -gt 2) { throw 'CLI_VERSION_REFUSED' }
  $versions = @($lines | ForEach-Object { if ($_ -notmatch '^(?:Vercel CLI )?(50\.42\.0)$') { throw 'CLI_VERSION_REFUSED' }; $Matches[1] } | Sort-Object -Unique -CaseSensitive)
  if ($versions.Count -ne 1 -or $versions[0] -cne '50.42.0') { throw 'CLI_VERSION_REFUSED' }
  return $versions[0]
}

function Assert-VercelCliVersion {
  param([scriptblock]$Resolver = ${function:Resolve-VercelCliVersion})
  $version = & $Resolver
  if ($version -isnot [string] -or $version -cne '50.42.0') { throw 'CLI_VERSION_REFUSED' }
  return $version
}
function Test-ExactVector([string[]]$Left, [string[]]$Right) {
  if ($null -eq $Left -or $null -eq $Right -or $Left.Count -ne $Right.Count) { return $false }
  for ($index = 0; $index -lt $Left.Count; $index += 1) {
    if ($Left[$index] -cne $Right[$index]) { return $false }
  }
  return $true
}

function Stop-BaselineFailure([string]$Code) {
  if ($Code -cnotin $baselineFailureCodes) { throw 'BASELINE_CODE_REFUSED' }
  throw $Code
}

function Assert-AllowedVercelVector {
  param(
    [Parameter(Mandatory)][AllowEmptyCollection()][string[]]$CommandArgs,
    [Parameter(Mandatory)][bool]$InputWasBound
  )
  if ($null -eq $CommandArgs -or $CommandArgs.Count -eq 0 -or @($CommandArgs | Where-Object { $null -eq $_ -or $_ -eq '' }).Count -ne 0) {
    throw 'VERCEL_VECTOR_REFUSED'
  }

  $fixed = @(
    @{ Class='environment-list'; Args=@('env','ls','--format','json','--no-color'); Input=$false },
    @{ Class='alias-list'; Args=@('alias','ls','--format','json','--limit','100','--no-color'); Input=$false },
    @{ Class='deployment-list-owned'; Args=@('list','--meta','pp_sprint=029V','--format','json','--no-color'); Input=$false },
    @{ Class='deployment-list-full'; Args=@('list','--format','json','--no-color'); Input=$false },
    @{ Class='deploy'; Args=@('deploy','--prod','--skip-domain','--yes','--format','json','--no-color','--meta','pp_sprint=029V'); Input=$false }
  )
  foreach ($item in $fixed) {
    if ((Test-ExactVector $CommandArgs $item.Args) -and $InputWasBound -eq $item.Input) { return $item.Class }
  }

  if ($CommandArgs.Count -eq 5 -and $CommandArgs[0] -ceq 'inspect' -and
    $CommandArgs[2] -ceq '--format' -and $CommandArgs[3] -ceq 'json' -and $CommandArgs[4] -ceq '--no-color' -and
    -not $InputWasBound) {
    $allowedIds = @($fixedInspectIds)
    if ($script:OwnedDeploymentId) { $allowedIds += $script:OwnedDeploymentId }
    if ($CommandArgs[1] -cin $allowedIds) { return 'inspect' }
  }

  if ($CommandArgs.Count -eq 6 -and $CommandArgs[0] -ceq 'list' -and
    $CommandArgs[1] -ceq '--format' -and $CommandArgs[2] -ceq 'json' -and
    $CommandArgs[3] -ceq '--no-color' -and $CommandArgs[4] -ceq '--next' -and
    $CommandArgs[5] -match '^[0-9]{1,16}$' -and -not $InputWasBound) { return 'deployment-list-full-next' }

  if ($CommandArgs.Count -eq 8 -and $CommandArgs[0] -ceq 'list' -and
    $CommandArgs[1] -ceq '--meta' -and $CommandArgs[2] -ceq 'pp_sprint=029V' -and
    $CommandArgs[3] -ceq '--format' -and $CommandArgs[4] -ceq 'json' -and
    $CommandArgs[5] -ceq '--no-color' -and $CommandArgs[6] -ceq '--next' -and
    $CommandArgs[7] -match '^[0-9]{1,16}$' -and -not $InputWasBound) { return 'deployment-list-owned-next' }
  if ($CommandArgs.Count -eq 5 -and $CommandArgs[0] -ceq 'remove' -and
    $CommandArgs[1] -ceq $script:OwnedDeploymentId -and $CommandArgs[1] -match '^dpl_[A-Za-z0-9]+$' -and
    $CommandArgs[2] -ceq '--safe' -and $CommandArgs[3] -ceq '--yes' -and
    $CommandArgs[4] -ceq '--no-color' -and -not $InputWasBound) { return 'deployment-remove-owned' }
  if ($CommandArgs.Count -eq 7 -and $CommandArgs[0] -ceq 'env' -and $CommandArgs[1] -ceq 'add' -and
    $CommandArgs[2] -cin $structuralNames -and $CommandArgs[3] -ceq 'production' -and
    $CommandArgs[4] -ceq '--sensitive' -and $CommandArgs[5] -ceq '--yes' -and
    $CommandArgs[6] -ceq '--no-color' -and $InputWasBound) { return 'environment-add-sensitive' }

  if ($CommandArgs.Count -eq 7 -and $CommandArgs[0] -ceq 'env' -and $CommandArgs[1] -ceq 'add' -and
    $CommandArgs[2] -cin $temporaryNames -and $CommandArgs[3] -ceq 'production' -and
    $CommandArgs[4] -ceq '--sensitive' -and $CommandArgs[5] -ceq '--yes' -and
    $CommandArgs[6] -ceq '--no-color' -and $InputWasBound) { return 'environment-add-sensitive' }

  if ($CommandArgs.Count -eq 6 -and $CommandArgs[0] -ceq 'env' -and $CommandArgs[1] -ceq 'rm' -and
    $CommandArgs[2] -cin $ownedNames -and $CommandArgs[3] -ceq 'production' -and
    $CommandArgs[4] -ceq '--yes' -and $CommandArgs[5] -ceq '--no-color' -and -not $InputWasBound) { return 'environment-remove' }

  throw 'VERCEL_VECTOR_REFUSED'
}

function Invoke-CapturedChildProcess {
  param(
    [Parameter(Mandatory)][string]$ExecutablePath,
    [Parameter(Mandatory)][AllowEmptyCollection()][string[]]$CommandArgs,
    [Parameter(Mandatory)][bool]$InputWasBound,
    [AllowNull()][string]$InputValue,
    [Parameter(Mandatory)][string]$VectorClass
  )
  if (-not $ExecutablePath -or $ExecutablePath.Contains('"') -or -not [IO.Path]::IsPathRooted($ExecutablePath)) { throw 'PROCESS_TARGET_REFUSED' }
  $start = New-Object Diagnostics.ProcessStartInfo
  $start.FileName = $env:ComSpec
  $start.Arguments = '/d /s /c "set NO_UPDATE_NOTIFIER=1&& call ""' + $ExecutablePath + '"" ' + ($CommandArgs -join ' ') + '"'
  $start.WorkingDirectory = $canonicalWorkspace
  $start.UseShellExecute = $false
  $start.CreateNoWindow = $true
  $start.RedirectStandardOutput = $true
  $start.RedirectStandardError = $true
  $start.RedirectStandardInput = $InputWasBound
  $process = New-Object Diagnostics.Process
  $process.StartInfo = $start
  try {
    if (-not $process.Start()) { throw 'VERCEL_OPERATION_REFUSED' }
    if ($VectorClass -ceq 'deploy') { $script:DeployInvocationStarted = $true }
    $stdoutTask = $process.StandardOutput.ReadToEndAsync()
    $stderrTask = $process.StandardError.ReadToEndAsync()
    if ($InputWasBound) {
      $process.StandardInput.Write($InputValue)
      $process.StandardInput.Close()
    }
    $process.WaitForExit()
    $stdout = $stdoutTask.GetAwaiter().GetResult()
    $stderr = $stderrTask.GetAwaiter().GetResult()
    return [pscustomobject]@{ ExitCode=$process.ExitCode; Stdout=$stdout; Stderr=$stderr; VectorClass=$VectorClass }
  } finally {
    $stdout = $null; $stderr = $null; $InputValue = $null
    $process.Dispose()
  }
}

function Invoke-RealVercelRunner {
  param([string[]]$CommandArgs, [bool]$InputWasBound, [AllowNull()][string]$InputValue, [string]$VectorClass)
  if (@($CommandArgs | Where-Object { $_ -notmatch '^[A-Za-z0-9_.=:-]+$' }).Count -ne 0) { throw 'VERCEL_VECTOR_REFUSED' }
  $vercelCommand = Get-Command vercel.cmd -ErrorAction Stop
  return Invoke-CapturedChildProcess -ExecutablePath $vercelCommand.Source -CommandArgs $CommandArgs -InputWasBound $InputWasBound -InputValue $InputValue -VectorClass $VectorClass
}

function Invoke-VercelCaptured {
  param(
    [Parameter(Mandatory)][AllowEmptyCollection()][string[]]$CommandArgs,
    [AllowNull()][string]$InputValue = $null,
    [scriptblock]$Runner = ${function:Invoke-RealVercelRunner}
  )
  $inputWasBound = $PSBoundParameters.ContainsKey('InputValue')
  $vectorClass = Assert-AllowedVercelVector -CommandArgs $CommandArgs -InputWasBound $inputWasBound
  $result = & $Runner $CommandArgs $inputWasBound $InputValue $vectorClass
  $InputValue = $null
  if ($null -eq $result -or $null -eq $result.ExitCode -or $result.ExitCode -ne 0 -or
    $result.VectorClass -cne $vectorClass -or $result.Stdout -isnot [string] -or $result.Stderr -isnot [string]) {
    throw 'VERCEL_OPERATION_REFUSED'
  }
  if ($vectorClass -like 'environment-add-*' -or $vectorClass -eq 'environment-remove' -or $vectorClass -eq 'deployment-remove-owned') {
    return [pscustomobject]@{ VectorClass=$vectorClass; Json=$null }
  }
  if (-not $result.Stdout -or $result.Stdout.Length -gt 4194304) { throw 'VERCEL_JSON_REFUSED' }
  try { $json = $result.Stdout | ConvertFrom-Json } catch { throw 'VERCEL_JSON_REFUSED' }
  return [pscustomobject]@{ VectorClass=$vectorClass; Json=$json }
}

function Assert-ExactJsonObject {
  param(
    [AllowNull()][object]$Value,
    [Parameter(Mandatory)][string[]]$AllowedFields,
    [Parameter(Mandatory)][AllowEmptyCollection()][string[]]$RequiredFields,
    [string]$RefusalCode = 'VERCEL_JSON_REFUSED'
  )
  if ($null -eq $Value -or $Value -isnot [pscustomobject]) { throw $RefusalCode }
  $fields = @($Value.PSObject.Properties.Name)
  if (@($fields | Where-Object { $_ -cnotin $AllowedFields }).Count -ne 0 -or
    @($RequiredFields | Where-Object { $_ -cnotin $fields }).Count -ne 0) { throw $RefusalCode }
}

function Get-JsonRows {
  param(
    [AllowNull()][object]$Json,
    [Parameter(Mandatory)][string]$ContainerName,
    [Parameter(Mandatory)][string[]]$AllowedTopLevelFields,
    [Parameter(Mandatory)][string[]]$RequiredTopLevelFields
  )
  Assert-ExactJsonObject -Value $Json -AllowedFields $AllowedTopLevelFields -RequiredFields $RequiredTopLevelFields
  if ($Json.$ContainerName -isnot [array]) { throw 'VERCEL_JSON_REFUSED' }
  return @($Json.$ContainerName)
}

function Get-KnownDeploymentTargetClass {
  param([AllowNull()][object]$Target, [bool]$AllowNullPreview = $false)
  if ($null -eq $Target -and $AllowNullPreview) { return 'preview' }
  if ($Target -isnot [string]) { throw 'DEPLOYMENT_REFUSED' }
  switch -CaseSensitive ($Target) {
    'production' { return 'production' }
    'preview' { return 'preview' }
    default { throw 'DEPLOYMENT_REFUSED' }
  }
}

function ConvertTo-EnvironmentProjection {
  param([Parameter(Mandatory)][AllowEmptyCollection()][object[]]$Rows)
  $ownedProductionNames = New-Object System.Collections.Generic.List[string]
  $genericProductionNames = New-Object System.Collections.Generic.List[string]
  $activationProductionCount = 0
  foreach ($row in $Rows) {
    Assert-ExactJsonObject -Value $row -AllowedFields @('key','value','type','target','gitBranch','configurationId','createdAt','updatedAt') -RequiredFields @('key','type','target')
    if ($row.PSObject.Properties.Name -ccontains 'value') { throw 'PRIVACY_REFUSED' }
    $name = $row.key
    if ($name -isnot [string] -or -not $name) { throw 'VERCEL_JSON_REFUSED' }
    $targets = @($row.target)
    if ($targets.Count -eq 0 -or @($targets | Where-Object { $_ -isnot [string] -or $_ -cnotin @('production','preview','development') }).Count -ne 0 -or
      $targets.Count -ne @($targets | Sort-Object -Unique -CaseSensitive).Count) { throw 'ENVIRONMENT_SCOPE_REFUSED' }
    $branchScoped = ($row.PSObject.Properties.Name -ccontains 'gitBranch') -and [bool]$row.gitBranch
    if ($name -cin $ownedNames) {
      if ($targets.Count -ne 1 -or $targets[0] -cne 'production' -or $branchScoped) { throw 'ENVIRONMENT_SCOPE_REFUSED' }
      if ($row.type -isnot [string] -or $row.type -cne 'sensitive') { throw 'ENVIRONMENT_SENSITIVITY_REFUSED' }
      if ($name -cin $ownedProductionNames) { throw 'ENVIRONMENT_SCOPE_REFUSED' }
      $ownedProductionNames.Add($name)
    } elseif ($name -ceq $activationName) {
      if ($targets.Count -ne 1 -or $targets[0] -cne 'production' -or $branchScoped -or $activationProductionCount -ne 0) { throw 'ENVIRONMENT_SCOPE_REFUSED' }
      $activationProductionCount = 1
    } elseif ($name -cin $genericNames -and $targets -ccontains 'production' -and -not $branchScoped) {
      if ($name -cin $genericProductionNames) { throw 'VERCEL_JSON_REFUSED' }
      $genericProductionNames.Add($name)
    }
  }
  return [pscustomobject]@{
    Dedicated=@($dedicatedNames | Where-Object { $_ -cin $ownedProductionNames }).Count
    Temporary=@($temporaryNames | Where-Object { $_ -cin $ownedProductionNames }).Count
    Activation=$activationProductionCount
    Generic=$genericProductionNames.Count
    Names=@(@($ownedProductionNames) + @($genericProductionNames))
  }
}

function Get-EnvironmentProjection {
  $result = Invoke-VercelCaptured -CommandArgs @('env','ls','--format','json','--no-color')
  $rows = Get-JsonRows -Json $result.Json -ContainerName 'envs' -AllowedTopLevelFields @('envs') -RequiredTopLevelFields @('envs')
  return ConvertTo-EnvironmentProjection -Rows $rows
}

function ConvertTo-AliasProjection {
  param([Parameter(Mandatory)][AllowEmptyCollection()][object[]]$Rows)
  if ($Rows.Count -ge 100) { throw 'ALIAS_PROJECTION_REFUSED' }
  $expected = @{}
  $allAliases = @{}
  $acceptedCount = 0
  $oldNCount = 0
  $oldOCount = 0
  $previewCount = 0
  foreach ($row in $Rows) {
    Assert-ExactJsonObject -Value $row -AllowedFields @('alias','deploymentId','url','createdAt') -RequiredFields @('alias','deploymentId') -RefusalCode 'ALIAS_PROJECTION_REFUSED'
    $alias = $row.alias
    $deployment = $row.deploymentId
    if ($alias -isnot [string] -or -not $alias -or $deployment -isnot [string] -or $deployment -notmatch '^dpl_[A-Za-z0-9]+$' -or $allAliases.ContainsKey($alias)) { throw 'ALIAS_PROJECTION_REFUSED' }
    $allAliases[$alias] = $deployment
    if ($alias -cin $aliases) {
      if ($expected.ContainsKey($alias)) { throw 'ALIAS_PROJECTION_REFUSED' }
      $expected[$alias] = $deployment
    }
    if ($deployment -ceq $acceptedDeployment) { $acceptedCount += 1 }
    elseif ($deployment -ceq $inert029NDeployment) { $oldNCount += 1 }
    elseif ($deployment -ceq $inert029ODeployment) { $oldOCount += 1 }
    elseif ($deployment -ceq $inert029SPreview) { $previewCount += 1 }
  }
  $expectedAcceptedCount = @($aliases | Where-Object { $expected[$_] -ceq $acceptedDeployment }).Count
  return [pscustomobject]@{
    AliasCount=$expected.Count
    ExpectedAcceptedCount=$expectedAcceptedCount
    AcceptedCount=$acceptedCount
    Inert029NAliasCount=$oldNCount
    Inert029OAliasCount=$oldOCount
    RetainedPreviewAliasCount=$previewCount
  }
}

function Get-AliasProjection {
  $result = Invoke-VercelCaptured -CommandArgs @('alias','ls','--format','json','--limit','100','--no-color')
  $rows = Get-JsonRows -Json $result.Json -ContainerName 'aliases' -AllowedTopLevelFields @('aliases','pagination') -RequiredTopLevelFields @('aliases','pagination')
  return ConvertTo-AliasProjection -Rows $rows
}

function ConvertTo-DeploymentInventoryRows {
  param([Parameter(Mandatory)][AllowEmptyCollection()][object[]]$Rows)
  $projected = New-Object System.Collections.Generic.List[object]
  $ids = New-Object System.Collections.Generic.HashSet[string]([StringComparer]::Ordinal)
  foreach ($row in $Rows) {
    Assert-ExactJsonObject -Value $row -AllowedFields @('id','url','name','state','target','customEnvironment','createdAt','buildingAt','ready') -RequiredFields @('id','state','target','createdAt')
    $id = $row.id
    if ($id -isnot [string] -or $id -notmatch '^dpl_[A-Za-z0-9]+$' -or -not $ids.Add($id) -or
      $row.state -isnot [string] -or $row.state -cnotin @('READY','ERROR','CANCELED','BUILDING','INITIALIZING','QUEUED') -or
      $row.createdAt -isnot [long] -and $row.createdAt -isnot [int]) { throw 'VERCEL_JSON_REFUSED' }
    $targetClass = Get-KnownDeploymentTargetClass -Target $row.target -AllowNullPreview $true
    if (($row.PSObject.Properties.Name -ccontains 'customEnvironment') -and $null -ne $row.customEnvironment) { throw 'DEPLOYMENT_REFUSED' }
    $projected.Add([pscustomobject]@{DeploymentId=$id;StateClass=$row.state;TargetClass=$targetClass;CreatedAt=[long]$row.createdAt})
  }
  return $projected.ToArray()
}

function ConvertTo-DeploymentPagination {
  param([Parameter(Mandatory)][pscustomobject]$Value)
  Assert-ExactJsonObject -Value $Value -AllowedFields @('count','next','prev') -RequiredFields @('count','next','prev')
  if ($Value.count -isnot [int] -and $Value.count -isnot [long]) { throw 'VERCEL_JSON_REFUSED' }
  if ($Value.count -lt 0 -or $Value.count -gt 20) { throw 'VERCEL_JSON_REFUSED' }
  foreach ($cursor in @($Value.next,$Value.prev)) {
    if ($null -ne $cursor -and (($cursor -isnot [long] -and $cursor -isnot [int]) -or $cursor -lt 0)) { throw 'VERCEL_JSON_REFUSED' }
  }
  return [pscustomobject]@{Count=[int]$Value.count;Next=$Value.next;Prev=$Value.prev}
}

function Get-DeploymentPage {
  param([bool]$OwnedOnly, [AllowNull()][object]$Next = $null)
  $args = if ($OwnedOnly) { @('list','--meta','pp_sprint=029V','--format','json','--no-color') } else { @('list','--format','json','--no-color') }
  if ($null -ne $Next) { $args += @('--next',[string]$Next) }
  $result = Invoke-VercelCaptured -CommandArgs $args
  $rows = @(Get-JsonRows -Json $result.Json -ContainerName 'deployments' -AllowedTopLevelFields @('contextName','deployments','pagination') -RequiredTopLevelFields @('contextName','deployments','pagination'))
  $pagination = ConvertTo-DeploymentPagination -Value $result.Json.pagination
  if ($pagination.Count -ne $rows.Count) { throw 'VERCEL_JSON_REFUSED' }
  return [pscustomobject]@{Rows=@(ConvertTo-DeploymentInventoryRows -Rows $rows);Pagination=$pagination}
}

function Test-DeploymentHeadEqual {
  param([object[]]$Left,[object[]]$Right)
  return (($Left | ConvertTo-Json -Compress -Depth 4) -ceq ($Right | ConvertTo-Json -Compress -Depth 4))
}

function Invoke-DeploymentWalk {
  param([bool]$OwnedOnly)
  $first = Get-DeploymentPage -OwnedOnly $OwnedOnly
  $all = New-Object System.Collections.Generic.List[object]
  foreach ($row in $first.Rows) { $all.Add($row) }
  $pages = 1
  $next = $first.Pagination.Next
  $seen = New-Object System.Collections.Generic.HashSet[string]([StringComparer]::Ordinal)
  foreach ($row in $first.Rows) { if (-not $seen.Add($row.DeploymentId)) { throw 'DEPLOYMENT_SNAPSHOT_REFUSED' } }
  while ($null -ne $next) {
    if ($pages -ge 10 -or $all.Count -ge 200) { throw 'DEPLOYMENT_SNAPSHOT_REFUSED' }
    $page = Get-DeploymentPage -OwnedOnly $OwnedOnly -Next $next
    $pages += 1
    foreach ($row in $page.Rows) {
      if (-not $seen.Add($row.DeploymentId)) { throw 'DEPLOYMENT_SNAPSHOT_REFUSED' }
      $all.Add($row)
      if ($all.Count -gt 200) { throw 'DEPLOYMENT_SNAPSHOT_REFUSED' }
    }
    if ($page.Pagination.Next -eq $next) { throw 'DEPLOYMENT_SNAPSHOT_REFUSED' }
    $next = $page.Pagination.Next
  }
  $head = Get-DeploymentPage -OwnedOnly $OwnedOnly
  return [pscustomobject]@{Rows=$all.ToArray();Pages=$pages;FirstHead=@($first.Rows);RevalidatedHead=@($head.Rows);HeadStable=(Test-DeploymentHeadEqual $first.Rows $head.Rows)}
}

function Get-StableDeploymentInventory {
  param([bool]$OwnedOnly)
  for ($attempt=0; $attempt -lt 2; $attempt += 1) {
    $walk = Invoke-DeploymentWalk -OwnedOnly $OwnedOnly
    if ($walk.HeadStable) {
      return [pscustomobject]@{Rows=@($walk.Rows);Pages=$walk.Pages;RestartCount=$attempt;HeadStable=$true}
    }
  }
  throw 'DEPLOYMENT_SNAPSHOT_REFUSED'
}

function Get-StableFullDeploymentInventory {
  return Get-StableDeploymentInventory -OwnedOnly $false
}

function Get-StableOwnedDeploymentInventory {
  return Get-StableDeploymentInventory -OwnedOnly $true
}

function Get-DeploymentListProjection {
  $inventory = Get-StableOwnedDeploymentInventory
  return @($inventory.Rows | ForEach-Object { $_.DeploymentId })
}

function Get-ActiveDeploymentCount([object[]]$Rows) {
  return @($Rows | Where-Object { $_.StateClass -cin @('BUILDING','INITIALIZING','QUEUED') }).Count
}

function Assert-AliasAndQueueSafety {
  $inventory = Get-StableFullDeploymentInventory
  if ((Get-ActiveDeploymentCount $inventory.Rows) -ne 0) { throw 'ACTIVE_DEPLOYMENT_REFUSED' }
  $aliasProjection = Get-AliasProjection
  if ($aliasProjection.AliasCount -ne 5 -or $aliasProjection.ExpectedAcceptedCount -ne 5 -or
    $aliasProjection.AcceptedCount -ne 5 -or $aliasProjection.Inert029NAliasCount -ne 0 -or
    $aliasProjection.Inert029OAliasCount -ne 0 -or $aliasProjection.RetainedPreviewAliasCount -ne 0) {
    throw 'ALIAS_SAFETY_REFUSED'
  }
  return [pscustomobject]@{Inventory=$inventory;Aliases=$aliasProjection}
}
function ConvertTo-DeploymentProjection {
  param([Parameter(Mandatory)][pscustomobject]$Value, [Parameter(Mandatory)][string]$DeploymentId)
  Assert-ExactJsonObject -Value $Value -AllowedFields @('id','name','url','target','readyState','createdAt','aliases','builds','routes','contextName','meta','sourceSha') -RequiredFields @('id','name','url','target','readyState') -RefusalCode 'DEPLOYMENT_REFUSED'
  $id = $Value.id
  $targetClass = Get-KnownDeploymentTargetClass -Target $Value.target
  $ready = $Value.readyState
  $aliasesValue = if ($value.PSObject.Properties.Name -ccontains 'aliases') { @($value.aliases) } else { @() }
  if (@($aliasesValue | Where-Object { $_ -isnot [string] -or -not $_ }).Count -ne 0) { throw 'DEPLOYMENT_REFUSED' }
  $meta = if ($value.PSObject.Properties.Name -ccontains 'meta') { $value.meta } else { $null }
  $sourceSha = if ($value.PSObject.Properties.Name -ccontains 'sourceSha') { $value.sourceSha }
    elseif ($meta -and $meta.PSObject.Properties.Name -ccontains 'pp_source_sha') { $meta.pp_source_sha } else { $null }
  if ($id -cne $DeploymentId -or $ready -cne 'READY' -or $Value.url -isnot [string]) { throw 'DEPLOYMENT_REFUSED' }
  $candidateOrigin = Assert-Origin $(if($Value.url.StartsWith('https://')){$Value.url}else{'https://' + $Value.url})
  return [pscustomobject]@{
    DeploymentId=$id
    Origin=$candidateOrigin
    TargetClass=$targetClass
    ReadinessClass='ready'
    AliasCount=$aliasesValue.Count
    MetadataClass=$(if($meta -and $meta.PSObject.Properties.Name -ccontains 'pp_sprint' -and $meta.pp_sprint -ceq '029V'){'exact-029V'}else{'historical'})
    SourceClass=$(if($sourceSha -ceq $expectedHead -or $DeploymentId -cin $fixedInspectIds){'exact-canonical'}else{'refused'})
  }
}

function Get-DeploymentProjection([string]$DeploymentId) {
  $result = Invoke-VercelCaptured -CommandArgs @('inspect',$DeploymentId,'--format','json','--no-color')
  return ConvertTo-DeploymentProjection -Value $result.Json -DeploymentId $DeploymentId
}
function Get-RequiredHistoricalDeploymentProjection {
  param(
    [Parameter(Mandatory)][string]$DeploymentId,
    [Parameter(Mandatory)][string]$FailureCode,
    [scriptblock]$Resolver = { param([string]$Id) Get-DeploymentProjection $Id }
  )
  $expectedCode = if ($DeploymentId -ceq $inert029NDeployment) { 'BASELINE_029N_DEPLOYMENT_REFUSED' }
    elseif ($DeploymentId -ceq $inert029ODeployment) { 'BASELINE_029O_DEPLOYMENT_REFUSED' }
    else { throw 'DEPLOYMENT_REFUSED' }
  if ($FailureCode -cne $expectedCode) { throw 'BASELINE_CODE_REFUSED' }
  try { $projection = & $Resolver $DeploymentId } catch { Stop-BaselineFailure $FailureCode }
  if ($null -eq $projection) { Stop-BaselineFailure $FailureCode }
  return $projection
}

function ConvertTo-RawDeployResultProjection {
  param([Parameter(Mandatory)][pscustomobject]$Value)
  $fields = @('id','url','inspectorUrl','readyState','target','deploymentApiUrl')
  Assert-ExactJsonObject -Value $Value -AllowedFields $fields -RequiredFields $fields -RefusalCode 'DEPLOYMENT_REFUSED'
  if ($Value.id -isnot [string] -or $Value.id -notmatch '^dpl_[A-Za-z0-9]+$' -or
    $Value.readyState -cne 'READY' -or (Get-KnownDeploymentTargetClass -Target $Value.target) -cne 'production' -or
    $Value.deploymentApiUrl -cne ('https://api.vercel.com/v13/deployments/' + $Value.id) -or
    ($null -ne $Value.inspectorUrl -and ($Value.inspectorUrl -isnot [string] -or -not $Value.inspectorUrl.StartsWith('https://vercel.com/')))) {
    throw 'DEPLOYMENT_REFUSED'
  }
  $origin = Assert-Origin $Value.url
  return [pscustomobject]@{
    DeploymentId=$Value.id
    TargetClass='production'
    ReadinessClass='ready'
    Origin=$origin
    Host=([uri]$origin).Host
    Form='raw'
  }
}

function ConvertTo-AgentDeployResultProjection {
  param([Parameter(Mandatory)][pscustomobject]$Value)
  Assert-ExactJsonObject -Value $Value -AllowedFields @('status','deployment','message','next') -RequiredFields @('status','deployment','message','next') -RefusalCode 'DEPLOYMENT_REFUSED'
  if ($Value.status -cne 'ok' -or $Value.next -isnot [array] -or @($Value.next).Count -ne 2) { throw 'DEPLOYMENT_REFUSED' }
  $nested = ConvertTo-RawDeployResultProjection -Value $Value.deployment
  $expected = @(
    [pscustomobject]@{ command=('vercel inspect ' + $nested.Host + ' --no-color'); when='Inspect deployment' },
    [pscustomobject]@{ command='vercel deploy --prod --no-color'; when='Promote to production' }
  )
  if ($Value.message -cne ('Deployment ' + $nested.Host + ' ready.')) { throw 'DEPLOYMENT_REFUSED' }
  for ($index=0; $index -lt 2; $index += 1) {
    Assert-ExactJsonObject -Value $Value.next[$index] -AllowedFields @('command','when') -RequiredFields @('command','when') -RefusalCode 'DEPLOYMENT_REFUSED'
    if ($Value.next[$index].command -cne $expected[$index].command -or $Value.next[$index].when -cne $expected[$index].when) { throw 'DEPLOYMENT_REFUSED' }
  }
  $nested.Form='agent'
  return $nested
}

function ConvertTo-DeployResultProjection {
  param([Parameter(Mandatory)][pscustomobject]$Value)
  $fields = @($Value.PSObject.Properties.Name)
  if ($fields.Count -eq 6 -and @('id','url','inspectorUrl','readyState','target','deploymentApiUrl' | Where-Object { $_ -cnotin $fields }).Count -eq 0) {
    return ConvertTo-RawDeployResultProjection -Value $Value
  }
  return ConvertTo-AgentDeployResultProjection -Value $Value
}

function Assert-ExactOwnedCandidate {
  param([Parameter(Mandatory)][string]$DeploymentId)
  $script:OwnedDeploymentId = $DeploymentId
  $candidate = Get-DeploymentProjection $DeploymentId
  if ($candidate.TargetClass -ne 'production' -or $candidate.ReadinessClass -ne 'ready' -or
    $candidate.AliasCount -ne 0 -or $candidate.MetadataClass -ne 'exact-029V' -or
    $candidate.SourceClass -ne 'exact-canonical') { throw 'DEPLOYMENT_OWNERSHIP_REFUSED' }
  return $candidate
}

function Remove-ExactOwnedDeployment {
  param([Parameter(Mandatory)][string]$DeploymentId)
  [void](Assert-ExactOwnedCandidate -DeploymentId $DeploymentId)
  [void](Invoke-VercelCaptured -CommandArgs @('remove',$DeploymentId,'--safe','--yes','--no-color'))
  $remaining = @(Get-DeploymentListProjection)
  if ($remaining.Count -ne 0) { throw 'DEPLOYMENT_CLEANUP_REFUSED' }
}

function Get-BoundedOwnedDeploymentObservations {
  $counts = New-Object System.Collections.Generic.List[int]
  $ids = New-Object System.Collections.Generic.HashSet[string]([StringComparer]::Ordinal)
  for ($index=0; $index -lt 3; $index += 1) {
    $current = @(Get-DeploymentListProjection)
    $counts.Add($current.Count)
    foreach ($id in $current) { [void]$ids.Add($id) }
    if ($index -lt 2) { Start-Sleep -Seconds 5 }
  }
  return [pscustomobject]@{Counts=$counts.ToArray();Ids=@($ids)}
}

function Invoke-DeployWithReconciliation {
  param([Parameter(Mandatory)][pscustomobject]$PreInventory)
  $script:DeployInvocationStarted = $false
  $direct = $null
  $directFailure = $null
  try {
    $deployed = Invoke-VercelCaptured -CommandArgs @('deploy','--prod','--skip-domain','--yes','--format','json','--no-color','--meta','pp_sprint=029V')
    $direct = ConvertTo-DeployResultProjection -Value $deployed.Json
  } catch {
    $directFailure = $_.Exception.Message
  }

  if (-not $script:DeployInvocationStarted) {
    $known = @(Get-DeploymentListProjection)
    if ($known.Count -ne 0) { throw 'DEPLOYMENT_AMBIGUOUS_MATERIAL' }
    if ($directFailure) { throw $directFailure }
    throw 'DEPLOYMENT_OPERATION_REFUSED'
  }

  $observed = Get-BoundedOwnedDeploymentObservations
  if ($observed.Ids.Count -ne 1 -or $observed.Counts[-1] -ne 1) { throw 'DEPLOYMENT_AMBIGUOUS_MATERIAL' }
  $id = @($observed.Ids)[0]
  $candidate = Assert-ExactOwnedCandidate -DeploymentId $id

  if ($null -eq $direct -or $direct.DeploymentId -cne $id -or $direct.Origin -cne $candidate.Origin) {
    Remove-ExactOwnedDeployment -DeploymentId $id
    throw 'DEPLOYMENT_ATTEMPT_FAILED_CLEANED'
  }

  $postInventory = Get-StableFullDeploymentInventory
  if ((Get-ActiveDeploymentCount $postInventory.Rows) -ne 0) { throw 'DEPLOYMENT_COMPETING_MATERIAL' }
  $preIds = @($PreInventory.Rows | ForEach-Object { $_.DeploymentId })
  $postIds = @($postInventory.Rows | ForEach-Object { $_.DeploymentId })
  $added = @($postIds | Where-Object { $_ -cnotin $preIds })
  $removed = @($preIds | Where-Object { $_ -cnotin $postIds })
  if ($added.Count -ne 1 -or $added[0] -cne $id -or $removed.Count -ne 0) { throw 'DEPLOYMENT_COMPETING_MATERIAL' }

  return [pscustomobject]@{
    DeploymentId=$id
    Candidate=$candidate
    Direct=$direct
    ObservationCounts=@($observed.Counts)
    PreInventory=$PreInventory
    PostInventory=$postInventory
  }
}
function Assert-BaselineProjection {
  param(
    [Parameter(Mandatory)][pscustomobject]$Environment,
    [Parameter(Mandatory)][bool]$CredentialPresent,
    [Parameter(Mandatory)][int]$SprintDeploymentCount,
    [Parameter(Mandatory)][pscustomobject]$AliasProjection,
    [Parameter(Mandatory)][pscustomobject]$AcceptedDeploymentProjection,
    [Parameter(Mandatory)][pscustomobject]$Prior029NDeploymentProjection,
    [Parameter(Mandatory)][pscustomobject]$Prior029ODeploymentProjection,
    [Parameter(Mandatory)][pscustomobject]$PreviewDeploymentProjection
  )
  if ($Environment.Dedicated -ne 0 -or $Environment.Temporary -ne 0 -or $Environment.Activation -ne 0 -or $Environment.Generic -ne 5) { Stop-BaselineFailure 'BASELINE_ENVIRONMENT_REFUSED' }
  if ($CredentialPresent) { Stop-BaselineFailure 'BASELINE_CREDENTIAL_REFUSED' }
  if ($SprintDeploymentCount -ne 0) { Stop-BaselineFailure 'BASELINE_029V_DEPLOYMENT_REFUSED' }
  if ($AliasProjection.AliasCount -ne 5 -or $AliasProjection.ExpectedAcceptedCount -ne 5 -or $AliasProjection.AcceptedCount -ne 5) { Stop-BaselineFailure 'BASELINE_EXPECTED_ALIAS_INVENTORY_REFUSED' }
  if ($AcceptedDeploymentProjection.TargetClass -ne 'production' -or $AcceptedDeploymentProjection.ReadinessClass -ne 'ready') { Stop-BaselineFailure 'BASELINE_ACCEPTED_DEPLOYMENT_REFUSED' }
  if ($Prior029NDeploymentProjection.TargetClass -ne 'production' -or $Prior029NDeploymentProjection.ReadinessClass -ne 'ready' -or
    $Prior029NDeploymentProjection.AliasCount -ne 0 -or $AliasProjection.Inert029NAliasCount -ne 0) { Stop-BaselineFailure 'BASELINE_029N_DEPLOYMENT_REFUSED' }
  if ($Prior029ODeploymentProjection.TargetClass -ne 'production' -or $Prior029ODeploymentProjection.ReadinessClass -ne 'ready' -or
    $Prior029ODeploymentProjection.AliasCount -ne 0 -or $AliasProjection.Inert029OAliasCount -ne 0) { Stop-BaselineFailure 'BASELINE_029O_DEPLOYMENT_REFUSED' }
  if ($PreviewDeploymentProjection.TargetClass -ne 'preview' -or $PreviewDeploymentProjection.ReadinessClass -ne 'ready' -or $AliasProjection.RetainedPreviewAliasCount -ne 0) { Stop-BaselineFailure 'BASELINE_RETAINED_PREVIEW_REFUSED' }
  return $true
}

function Assert-LiveRecord {
  param([Parameter(Mandatory)][pscustomobject]$Record)
  $fields = @('version','runId','bearer','verifier','notBefore','expiresAt','remoteNames','deploymentId','phase','deployAttemptCount','publicGateAttemptCount','readinessAttemptCount','expiryAttemptCount')
  Assert-ExactJsonObject -Value $Record -AllowedFields $fields -RequiredFields $fields -RefusalCode 'CREDENTIAL_RECORD_REFUSED'
  if ($Record.version -ne 1 -or $Record.runId -isnot [string] -or $Record.runId -notmatch '^[a-f0-9]{32}$' -or
    $Record.bearer -isnot [string] -or $Record.bearer.Length -lt 43 -or
    $Record.verifier -isnot [string] -or $Record.verifier -notmatch '^[a-f0-9]{64}$' -or
    $Record.remoteNames -isnot [array] -or $Record.remoteNames.Count -ne 3 -or
    @($Record.remoteNames | Sort-Object -Unique -CaseSensitive).Count -ne 3 -or
    @($Record.remoteNames | Where-Object { $_ -cnotin $temporaryNames }).Count -ne 0 -or
    ($null -ne $Record.deploymentId -and ($Record.deploymentId -isnot [string] -or $Record.deploymentId -notmatch '^dpl_[A-Za-z0-9]+$'))) { throw 'CREDENTIAL_RECORD_REFUSED' }
  foreach ($counter in @('deployAttemptCount','publicGateAttemptCount','readinessAttemptCount','expiryAttemptCount')) {
    if ($Record.$counter -isnot [int] -and $Record.$counter -isnot [long]) { throw 'CREDENTIAL_RECORD_REFUSED' }
    if ($Record.$counter -lt 0 -or $Record.$counter -gt 1) { throw 'CREDENTIAL_RECORD_REFUSED' }
  }
  $expected = switch -CaseSensitive ($Record.phase) {
    'provisioned' { @(0,0,0,0,$false) }
    'deploy-attempted' { @(1,0,0,0,$false) }
    'deployed' { @(1,0,0,0,$true) }
    'public-gate-attempted' { @(1,1,0,0,$true) }
    'public-gate-verified' { @(1,1,0,0,$true) }
    'readiness-attempted' { @(1,1,1,0,$true) }
    'readiness-verified' { @(1,1,1,0,$true) }
    'expiry-attempted' { @(1,1,1,1,$true) }
    default { throw 'CREDENTIAL_RECORD_REFUSED' }
  }
  if ($Record.deployAttemptCount -ne $expected[0] -or $Record.publicGateAttemptCount -ne $expected[1] -or
    $Record.readinessAttemptCount -ne $expected[2] -or $Record.expiryAttemptCount -ne $expected[3] -or
    ([bool]$Record.deploymentId) -ne $expected[4]) { throw 'CREDENTIAL_RECORD_REFUSED' }
  return $Record
}

function Read-LiveRecord {
  $plain = Read-FixedCredential $liveTarget
  try {
    $record = $plain | ConvertFrom-Json
    return Assert-LiveRecord -Record $record
  } finally { $plain = $null }
}

function Write-LiveRecord {
  param([Parameter(Mandatory)][pscustomobject]$Record)
  [void](Assert-LiveRecord -Record $Record)
  Set-FixedCredential $liveTarget ($Record | ConvertTo-Json -Compress) $true
}

function Start-LiveAttempt {
  param(
    [Parameter(Mandatory)][pscustomobject]$Record,
    [Parameter(Mandatory)][string]$ExpectedPhase,
    [Parameter(Mandatory)][ValidateSet('deployAttemptCount','publicGateAttemptCount','readinessAttemptCount','expiryAttemptCount')][string]$CounterName,
    [Parameter(Mandatory)][string]$StartedPhase,
    [scriptblock]$Writer = { param([pscustomobject]$Value) Write-LiveRecord $Value }
  )
  [void](Assert-LiveRecord -Record $Record)
  if ($Record.phase -cne $ExpectedPhase -or $Record.$CounterName -ne 0) { throw 'ATTEMPT_CEILING_REFUSED' }
  $Record.$CounterName = 1
  $Record.phase = $StartedPhase
  [void](Assert-LiveRecord -Record $Record)
  [void](& $Writer $Record)
  return $Record
}

function Complete-LivePhase {
  param(
    [Parameter(Mandatory)][pscustomobject]$Record,
    [Parameter(Mandatory)][string]$ExpectedPhase,
    [Parameter(Mandatory)][string]$CompletedPhase,
    [AllowNull()][string]$DeploymentId = $null,
    [scriptblock]$Writer = { param([pscustomobject]$Value) Write-LiveRecord $Value }
  )
  [void](Assert-LiveRecord -Record $Record)
  if ($Record.phase -cne $ExpectedPhase) { throw 'ATTEMPT_ORDER_REFUSED' }
  $Record.phase = $CompletedPhase
  if ($PSBoundParameters.ContainsKey('DeploymentId')) { $Record.deploymentId = $DeploymentId }
  [void](Assert-LiveRecord -Record $Record)
  [void](& $Writer $Record)
  return $Record
}

function Format-CanonicalUtc([DateTime]$Value) {
  return $Value.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fff'Z'", [Globalization.CultureInfo]::InvariantCulture)
}

function Assert-Origin([string]$Value) {
  if (-not $Value -or $Value -cne $Value.Trim()) { throw 'ORIGIN_REFUSED' }
  try { $uri = [uri]$Value } catch { throw 'ORIGIN_REFUSED' }
  if (-not $uri.IsAbsoluteUri -or $uri.Scheme -cne 'https' -or $uri.UserInfo -or $uri.Port -ne 443 -or
    $uri.AbsolutePath -cne '/' -or $uri.Query -or $uri.Fragment -or
    $uri.Host -notmatch '^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$') { throw 'ORIGIN_REFUSED' }
  return $uri.GetLeftPart([UriPartial]::Authority)
}

function Resolve-RecordedCandidateOrigin {
  param(
    [Parameter(Mandatory)][pscustomobject]$Record,
    [Parameter(Mandatory)][string]$SuppliedOrigin,
    [scriptblock]$Resolver = { param([string]$Id) Assert-ExactOwnedCandidate -DeploymentId $Id }
  )
  [void](Assert-LiveRecord -Record $Record)
  if (-not $Record.deploymentId) { throw 'DEPLOYMENT_REFUSED' }
  $provided = Assert-Origin $SuppliedOrigin
  $candidate = & $Resolver $Record.deploymentId
  if ($null -eq $candidate -or $candidate.Origin -isnot [string] -or $candidate.Origin -cne $provided) { throw 'ORIGIN_BINDING_REFUSED' }
  return $candidate.Origin
}

function Invoke-OriginBoundRequest {
  param(
    [Parameter(Mandatory)][pscustomobject]$Record,
    [Parameter(Mandatory)][string]$SuppliedOrigin,
    [Parameter(Mandatory)][scriptblock]$Requester,
    [scriptblock]$Resolver = { param([string]$Id) Assert-ExactOwnedCandidate -DeploymentId $Id }
  )
  $candidateOrigin = Resolve-RecordedCandidateOrigin -Record $Record -SuppliedOrigin $SuppliedOrigin -Resolver $Resolver
  return & $Requester $candidateOrigin $Record
}

function Add-RemoteValue([string]$Name, [string]$Value) {
  if ($Name -cin $ownedNames) {
    [void](Invoke-VercelCaptured -CommandArgs @('env','add',$Name,'production','--sensitive','--yes','--no-color') -InputValue $Value)
  } else { throw 'REMOTE_NAME_REFUSED' }
}

function Remove-RemoteValue([string]$Name) {
  if ($Name -cnotin $ownedNames) { throw 'REMOTE_NAME_REFUSED' }
  [void](Invoke-VercelCaptured -CommandArgs @('env','rm',$Name,'production','--yes','--no-color'))
}
function Invoke-OwnedEnvironmentCleanup {
  param(
    [Parameter(Mandatory)][string[]]$Names,
    [Parameter(Mandatory)][scriptblock]$Projector,
    [Parameter(Mandatory)][scriptblock]$Remover,
    [AllowNull()][scriptblock]$OnClean = $null
  )
  if ($Names.Count -eq 0 -or $Names.Count -ne @($Names | Sort-Object -Unique -CaseSensitive).Count -or
    @($Names | Where-Object { $_ -cnotin $ownedNames }).Count -ne 0) { throw 'REMOTE_NAME_REFUSED' }
  $before = & $Projector
  $attempted = 0
  $failures = 0
  foreach ($name in $Names) {
    if ($name -cin @($before.Names)) {
      $attempted += 1
      try { & $Remover $name } catch { $failures += 1 }
    }
  }
  $after = & $Projector
  $residue = @($Names | Where-Object { $_ -cin @($after.Names) }).Count
  if ($residue -eq 0 -and $OnClean) { & $OnClean }
  return [pscustomobject]@{ Attempted=$attempted; Failures=$failures; Residue=$residue }
}

function Complete-OwnedEnvironmentCleanup {
  param(
    [Parameter(Mandatory)][string[]]$Names,
    [Parameter(Mandatory)][bool]$RemoveCredential
  )
  $projector = { Get-EnvironmentProjection }
  $remover = { param([string]$Name) Remove-RemoteValue $Name }
  $removeCredentialOnClean = $RemoveCredential
  $onClean = {
    if ($removeCredentialOnClean -and (Test-FixedCredential $liveTarget)) { Remove-FixedCredential $liveTarget }
  }.GetNewClosure()
  $outcome = Invoke-OwnedEnvironmentCleanup -Names $Names -Projector $projector -Remover $remover -OnClean $onClean
  $after = Get-EnvironmentProjection
  if ($outcome.Residue -ne 0 -or @($Names | Where-Object { $_ -cin @($after.Names) }).Count -ne 0 -or
    ($RemoveCredential -and (Test-FixedCredential $liveTarget))) { throw 'CLEANUP_REFUSED' }
  return $outcome
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
    return @{ StatusCode=[int]$response.StatusCode; Body=$body }
  } finally { $request.Dispose(); $client.Dispose() }
}

function Invoke-PublicGate([string]$CandidateOrigin) {
  Add-Type -AssemblyName System.Net.Http
  $client = New-Object Net.Http.HttpClient
  $request = New-Object Net.Http.HttpRequestMessage([Net.Http.HttpMethod]::Post, "$CandidateOrigin/api/enquiries")
  [void]$request.Headers.TryAddWithoutValidation('Origin', $CandidateOrigin)
  try {
    $response = $client.SendAsync($request).GetAwaiter().GetResult()
    $body = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
    return @{ StatusCode=[int]$response.StatusCode; Body=$body }
  } finally { $request.Dispose(); $client.Dispose() }
}

function Remove-TemporaryResources([pscustomobject]$Record) {
  if (@($Record.remoteNames).Count -ne 3 -or @($Record.remoteNames | Sort-Object -Unique -CaseSensitive).Count -ne 3 -or
    @($Record.remoteNames | Where-Object { $_ -cnotin $temporaryNames }).Count -ne 0) { throw 'CREDENTIAL_RECORD_REFUSED' }
  [void](Complete-OwnedEnvironmentCleanup -Names $temporaryNames -RemoveCredential $true)
}

function Invoke-ControllerSelfTest {
  $calls = New-Object System.Collections.Generic.List[object]
  $runner = {
    param([string[]]$CapturedArgs, [bool]$InputWasBound, [AllowNull()][string]$InputValue, [string]$VectorClass)
    $calls.Add([pscustomobject]@{ Args=@($CapturedArgs); InputWasBound=$InputWasBound; InputLength=$(if($InputWasBound){$InputValue.Length}else{0}); VectorClass=$VectorClass })
    [pscustomobject]@{ ExitCode=0; Stdout='{}'; Stderr='synthetic-stderr'; VectorClass=$VectorClass }
  }
  $allowed = New-Object System.Collections.Generic.List[object]
  $allowed.Add(@{ Args=@('env','ls','--format','json','--no-color'); Input=$false })
  $allowed.Add(@{ Args=@('alias','ls','--format','json','--limit','100','--no-color'); Input=$false })
  $allowed.Add(@{ Args=@('list','--meta','pp_sprint=029V','--format','json','--no-color'); Input=$false })
  $allowed.Add(@{ Args=@('list','--format','json','--no-color'); Input=$false })
  $allowed.Add(@{ Args=@('list','--format','json','--no-color','--next','1234567890'); Input=$false })
  $allowed.Add(@{ Args=@('list','--meta','pp_sprint=029V','--format','json','--no-color','--next','1234567890'); Input=$false })
  $allowed.Add(@{ Args=@('deploy','--prod','--skip-domain','--yes','--format','json','--no-color','--meta','pp_sprint=029V'); Input=$false })
  $script:OwnedDeploymentId = 'dpl_Synthetic029V'
  $allowed.Add(@{ Args=@('remove','dpl_Synthetic029V','--safe','--yes','--no-color'); Input=$false })
  foreach ($id in $fixedInspectIds) { $allowed.Add(@{ Args=@('inspect',$id,'--format','json','--no-color'); Input=$false }) }
  foreach ($name in $structuralNames) { $allowed.Add(@{ Args=@('env','add',$name,'production','--sensitive','--yes','--no-color'); Input=$true }) }
  foreach ($name in $temporaryNames) { $allowed.Add(@{ Args=@('env','add',$name,'production','--sensitive','--yes','--no-color'); Input=$true }) }
  foreach ($name in $ownedNames) { $allowed.Add(@{ Args=@('env','rm',$name,'production','--yes','--no-color'); Input=$false }) }
  foreach ($case in $allowed) {
    $before = $calls.Count
    if ($case.Input) { [void](Invoke-VercelCaptured -CommandArgs $case.Args -InputValue 'synthetic-stdin-only' -Runner $runner) }
    else { [void](Invoke-VercelCaptured -CommandArgs $case.Args -Runner $runner) }
    $captured = $calls[$before]
    if ($calls.Count -ne $before + 1 -or -not (Test-ExactVector $captured.Args $case.Args) -or
      $captured.InputWasBound -ne $case.Input -or ($case.Input -and $captured.InputLength -ne 20)) { throw 'SELF_TEST_REFUSED' }
  }

  $script:OwnedDeploymentId = ''
  function Test-LostAutomaticVector { param([string[]]$Args) return @($Args).Count }
  function Test-SafeCommandVector { param([string[]]$CommandArgs) return @($CommandArgs).Count }
  $discriminator = @('inspect','dpl_synthetic','--format','json')
  if ((Test-LostAutomaticVector $discriminator) -ne 0 -or (Test-SafeCommandVector $discriminator) -ne 4) { throw 'SELF_TEST_REFUSED' }

  $processTransfer = Invoke-CapturedChildProcess -ExecutablePath $env:ComSpec -CommandArgs @('/d','/s','/c','echo','PP029V_ONE','PP029V_TWO','PP029V_THREE','PP029V_FOUR') -InputWasBound $false -InputValue $null -VectorClass 'self-test-process'
  if ($processTransfer.ExitCode -ne 0 -or $processTransfer.VectorClass -cne 'self-test-process' -or
    $processTransfer.Stdout.Trim() -cne 'PP029V_ONE PP029V_TWO PP029V_THREE PP029V_FOUR' -or $processTransfer.Stderr) { throw 'SELF_TEST_REFUSED' }

  $genericFixture = @($genericNames | ForEach-Object {
    [pscustomobject]@{ key=$_; type='encrypted'; target=@('development','preview','production'); gitBranch=$null }
  })
  $genericProjection = ConvertTo-EnvironmentProjection -Rows $genericFixture
  if ($genericProjection.Generic -ne 5 -or $genericProjection.Dedicated -ne 0 -or $genericProjection.Temporary -ne 0 -or $genericProjection.Activation -ne 0) { throw 'SELF_TEST_REFUSED' }
  $ownedScopeRefusalCount = 0
  foreach ($fixture in @(
    [pscustomobject]@{ key='PUBLIC_ENQUIRY_SMTP_HOST'; type='sensitive'; target=@('preview','production'); gitBranch=$null },
    [pscustomobject]@{ key='PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256'; type='sensitive'; target=@('production'); gitBranch='synthetic-scoped-branch' }
  )) {
    $didRefuse = $false
    try { [void](ConvertTo-EnvironmentProjection -Rows @($fixture)) } catch { if ($_.Exception.Message -eq 'ENVIRONMENT_SCOPE_REFUSED') { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $ownedScopeRefusalCount += 1
  }
  $allTargetDuplicateRefused = $false
  $allTargetDuplicate = @(
    [pscustomobject]@{ key='PUBLIC_ENQUIRY_SMTP_HOST'; type='sensitive'; target=@('production'); gitBranch=$null },
    [pscustomobject]@{ key='PUBLIC_ENQUIRY_SMTP_HOST'; type='sensitive'; target=@('preview'); gitBranch=$null }
  )
  try { [void](ConvertTo-EnvironmentProjection -Rows $allTargetDuplicate) }
  catch { if ($_.Exception.Message -ceq 'ENVIRONMENT_SCOPE_REFUSED') { $allTargetDuplicateRefused = $true } else { throw } }
  if (-not $allTargetDuplicateRefused) { throw 'SELF_TEST_REFUSED' }
  $ownedSensitivityRefusalCount = 0
  foreach ($fixture in @(
    [pscustomobject]@{ key='PUBLIC_ENQUIRY_SMTP_PASS'; type='encrypted'; target=@('production'); gitBranch=$null },
    [pscustomobject]@{ key='PUBLIC_ENQUIRY_SMTP_HOST'; type='plain'; target=@('production'); gitBranch=$null },
    [pscustomobject]@{ key='PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256'; type='encrypted'; target=@('production'); gitBranch=$null }
  )) {
    $didRefuse = $false
  $cleanupFailurePositionCount = 0
  foreach ($failureName in $temporaryNames) {
    $cleanupState = [pscustomobject]@{
      Present=(New-Object System.Collections.Generic.List[string])
      FailName=$failureName
      FailConsumed=$false
      CleanCount=0
    }
    foreach ($name in $temporaryNames) { $cleanupState.Present.Add($name) }
    $cleanupProjector = { [pscustomobject]@{ Names=@($cleanupState.Present) } }.GetNewClosure()
    $cleanupRemover = {
      param([string]$Name)
      if ($Name -ceq $cleanupState.FailName -and -not $cleanupState.FailConsumed) {
        $cleanupState.FailConsumed = $true
        throw 'SYNTHETIC_DELETE_FAILURE'
      }
      [void]$cleanupState.Present.Remove($Name)
    }.GetNewClosure()
    $cleanupOnClean = { $cleanupState.CleanCount += 1 }.GetNewClosure()
    $firstCleanup = Invoke-OwnedEnvironmentCleanup -Names $temporaryNames -Projector $cleanupProjector -Remover $cleanupRemover -OnClean $cleanupOnClean
    if ($firstCleanup.Attempted -ne 3 -or $firstCleanup.Failures -ne 1 -or $firstCleanup.Residue -ne 1 -or
      $cleanupState.CleanCount -ne 0 -or $failureName -cnotin @($cleanupState.Present)) { throw 'SELF_TEST_REFUSED' }
    $secondCleanup = Invoke-OwnedEnvironmentCleanup -Names $temporaryNames -Projector $cleanupProjector -Remover $cleanupRemover -OnClean $cleanupOnClean
    if ($secondCleanup.Attempted -ne 1 -or $secondCleanup.Failures -ne 0 -or $secondCleanup.Residue -ne 0 -or
      $cleanupState.CleanCount -ne 1 -or $cleanupState.Present.Count -ne 0) { throw 'SELF_TEST_REFUSED' }
    $cleanupFailurePositionCount += 1
  }
  if ($cleanupFailurePositionCount -ne 3) { throw 'SELF_TEST_REFUSED' }
    try { [void](ConvertTo-EnvironmentProjection -Rows @($fixture)) } catch { if ($_.Exception.Message -eq 'ENVIRONMENT_SENSITIVITY_REFUSED') { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $ownedSensitivityRefusalCount += 1
  }
  $missingTypeRefusalCount = 0
  try { [void](ConvertTo-EnvironmentProjection -Rows @([pscustomobject]@{ key='PUBLIC_ENQUIRY_SMTP_HOST'; target=@('production'); gitBranch=$null })) }
  catch { if ($_.Exception.Message -eq 'VERCEL_JSON_REFUSED') { $missingTypeRefusalCount = 1 } else { throw } }
  if ($missingTypeRefusalCount -ne 1) { throw 'SELF_TEST_REFUSED' }

  $nonReadyHistoricalRefused = $false
  try {
    [void](ConvertTo-DeploymentProjection -Value ([pscustomobject]@{ id=$inert029NDeployment; name='synthetic'; url='pnr-precision-performance-synthetic-rankin007s-projects.vercel.app'; target='production'; readyState='ERROR'; aliases=@() }) -DeploymentId $inert029NDeployment)
  } catch { if ($_.Exception.Message -ceq 'DEPLOYMENT_REFUSED') { $nonReadyHistoricalRefused = $true } else { throw } }
  if (-not $nonReadyHistoricalRefused) { throw 'SELF_TEST_REFUSED' }
  $aliasFixtureRows = @($aliases | ForEach-Object { [pscustomobject]@{ alias=$_; deploymentId=$acceptedDeployment } })
  $aliasFixtureProjection = ConvertTo-AliasProjection -Rows $aliasFixtureRows
  if ($aliasFixtureProjection.AliasCount -ne 5 -or $aliasFixtureProjection.ExpectedAcceptedCount -ne 5 -or
    $aliasFixtureProjection.AcceptedCount -ne 5 -or $aliasFixtureProjection.Inert029NAliasCount -ne 0 -or
    $aliasFixtureProjection.Inert029OAliasCount -ne 0 -or $aliasFixtureProjection.RetainedPreviewAliasCount -ne 0) { throw 'SELF_TEST_REFUSED' }
  $aliasTruncationRefusalCount = 0
  $truncatedAliasFixture = @(0..99 | ForEach-Object { [pscustomobject]@{ alias="synthetic-alias-$_"; deploymentId=$acceptedDeployment } })
  try { [void](ConvertTo-AliasProjection -Rows $truncatedAliasFixture) } catch { if ($_.Exception.Message -eq 'ALIAS_PROJECTION_REFUSED') { $aliasTruncationRefusalCount = 1 } else { throw } }
  if ($aliasTruncationRefusalCount -ne 1) { throw 'SELF_TEST_REFUSED' }

  $emptyDeploymentRows = @(Get-JsonRows -Json ([pscustomobject]@{ contextName='synthetic'; deployments=@(); pagination=[pscustomobject]@{} }) -ContainerName 'deployments' -AllowedTopLevelFields @('contextName','deployments','pagination') -RequiredTopLevelFields @('contextName','deployments','pagination'))
  $emptyDeploymentProjection = @(ConvertTo-DeploymentInventoryRows -Rows $emptyDeploymentRows)
  if ($emptyDeploymentRows.Count -ne 0 -or $emptyDeploymentProjection.Count -ne 0) { throw 'SELF_TEST_REFUSED' }
  $cliVersionFixturePassCount = 0
  if ((Assert-VercelCliVersion -Resolver { '50.42.0' }) -ceq '50.42.0') { $cliVersionFixturePassCount = 1 }
  $wrongVersionRefused = $false
  try { [void](Assert-VercelCliVersion -Resolver { '50.43.0' }) } catch { if ($_.Exception.Message -ceq 'CLI_VERSION_REFUSED') { $wrongVersionRefused = $true } else { throw } }
  if ($cliVersionFixturePassCount -ne 1 -or -not $wrongVersionRefused) { throw 'SELF_TEST_REFUSED' }

  $rawDeployFixture = [pscustomobject]@{
    id='dpl_Synthetic029V'
    url='https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app'
    inspectorUrl=$null
    readyState='READY'
    target='production'
    deploymentApiUrl='https://api.vercel.com/v13/deployments/dpl_Synthetic029V'
  }
  $agentDeployFixture = [pscustomobject]@{
    status='ok'
    deployment=$rawDeployFixture
    message='Deployment pnr-precision-performance-synthetic-rankin007s-projects.vercel.app ready.'
    next=@(
      [pscustomobject]@{command='vercel inspect pnr-precision-performance-synthetic-rankin007s-projects.vercel.app --no-color';when='Inspect deployment'},
      [pscustomobject]@{command='vercel deploy --prod --no-color';when='Promote to production'}
    )
  }
  $agentProjection = ConvertTo-AgentDeployResultProjection -Value $agentDeployFixture
  $agentEnvelopeFixturePassCount = if($agentProjection.DeploymentId -ceq 'dpl_Synthetic029V' -and $agentProjection.Form -ceq 'agent'){1}else{0}
  $agentEnvelopeRefusalCount = 0
  $agentRefusals = @(
    '{"status":"OK","deployment":{"id":"dpl_Synthetic029V","url":"https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app","inspectorUrl":null,"readyState":"READY","target":"production","deploymentApiUrl":"https://api.vercel.com/v13/deployments/dpl_Synthetic029V"},"message":"Deployment pnr-precision-performance-synthetic-rankin007s-projects.vercel.app ready.","next":[{"command":"vercel inspect pnr-precision-performance-synthetic-rankin007s-projects.vercel.app --no-color","when":"Inspect deployment"},{"command":"vercel deploy --prod --no-color","when":"Promote to production"}]}',
    '{"status":"ok","deployment":{"id":"dpl_Synthetic029V","url":"https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app","inspectorUrl":null,"readyState":"READY","target":"production","deploymentApiUrl":"https://api.vercel.com/v13/deployments/dpl_Synthetic029V"},"message":"Deployment https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app ready.","next":[{"command":"vercel inspect pnr-precision-performance-synthetic-rankin007s-projects.vercel.app --no-color","when":"Inspect deployment"},{"command":"vercel deploy --prod --no-color","when":"Promote to production"}]}',
    '{"status":"ok","deployment":{"id":"dpl_Synthetic029V","url":"https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app","inspectorUrl":null,"readyState":"READY","target":"production","deploymentApiUrl":"https://api.vercel.com/v13/deployments/dpl_Synthetic029V"},"message":"Deployment pnr-precision-performance-synthetic-rankin007s-projects.vercel.app ready.","next":[{"command":"vercel inspect https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app --no-color","when":"Inspect deployment"},{"command":"vercel deploy --prod --no-color","when":"Promote to production"}]}',
    '{"status":"ok","deployment":{"id":"dpl_Synthetic029V","url":"https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app","inspectorUrl":null,"readyState":"READY","target":"production","deploymentApiUrl":"https://api.vercel.com/v13/deployments/dpl_Synthetic029V"},"message":"Deployment pnr-precision-performance-synthetic-rankin007s-projects.vercel.app ready.","next":[{"command":"vercel deploy --prod --no-color","when":"Promote to production"},{"command":"vercel inspect pnr-precision-performance-synthetic-rankin007s-projects.vercel.app --no-color","when":"Inspect deployment"}]}',
    '{"status":"ok","deployment":{"id":"dpl_Synthetic029V","url":"https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app","inspectorUrl":null,"readyState":"READY","target":"production","deploymentApiUrl":"https://api.vercel.com/v13/deployments/dpl_Synthetic029V","extra":0},"message":"Deployment pnr-precision-performance-synthetic-rankin007s-projects.vercel.app ready.","next":[{"command":"vercel inspect pnr-precision-performance-synthetic-rankin007s-projects.vercel.app --no-color","when":"Inspect deployment"},{"command":"vercel deploy --prod --no-color","when":"Promote to production"}]}',
    '{"status":"ok","deployment":{"id":"dpl_Synthetic029V","url":"https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app","inspectorUrl":null,"readyState":"READY","target":"production","deploymentApiUrl":"https://api.vercel.com/v13/deployments/dpl_Synthetic029V"},"message":"Deployment pnr-precision-performance-synthetic-rankin007s-projects.vercel.app ready.","next":[{"command":"vercel inspect pnr-precision-performance-synthetic-rankin007s-projects.vercel.app --no-color","when":"Inspect deployment"},{"command":"vercel deploy --prod --no-color --force","when":"Promote to production"}]}',
    '{"status":"error","message":"synthetic","next":[]}'
  )
  foreach ($json in $agentRefusals) {
    $didRefuse = $false
    try { [void](ConvertTo-DeployResultProjection -Value ($json | ConvertFrom-Json)) } catch { if ($_.Exception.Message -ceq 'DEPLOYMENT_REFUSED') { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $agentEnvelopeRefusalCount += 1
  }
  if ($agentEnvelopeFixturePassCount -ne 1 -or $agentEnvelopeRefusalCount -ne 7) { throw 'SELF_TEST_REFUSED' }

  $paginationFixturePassCount = 0
  $pagination = ConvertTo-DeploymentPagination -Value ([pscustomobject]@{count=20;next=1234567890;prev=$null})
  if ($pagination.Count -eq 20 -and $pagination.Next -eq 1234567890) { $paginationFixturePassCount = 1 }
  $paginationRefusalCount = 0
  foreach ($fixture in @(
    [pscustomobject]@{count=21;next=$null;prev=$null},
    [pscustomobject]@{count=0;next=$null}
  )) {
    try { [void](ConvertTo-DeploymentPagination -Value $fixture) } catch { if ($_.Exception.Message -ceq 'VERCEL_JSON_REFUSED') { $paginationRefusalCount += 1 } else { throw } }
  }
  if ($paginationFixturePassCount -ne 1 -or $paginationRefusalCount -ne 2) { throw 'SELF_TEST_REFUSED' }
  $protectedInventoryRefusalCount = 0
  foreach ($protectedFixture in @(
    [pscustomobject]@{id='dpl_ProtectedCreator029V';state='READY';target='production';createdAt=1;creator=[pscustomobject]@{uid='protected'}},
    [pscustomobject]@{id='dpl_ProtectedMeta029V';state='READY';target='production';createdAt=1;meta=[pscustomobject]@{pp_sprint='029V'}}
  )) {
    $didRefuse = $false
    try { [void](ConvertTo-DeploymentInventoryRows -Rows @($protectedFixture)) } catch { if ($_.Exception.Message -ceq 'VERCEL_JSON_REFUSED') { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $protectedInventoryRefusalCount += 1
  }
  if ($protectedInventoryRefusalCount -ne 2) { throw 'SELF_TEST_REFUSED' }

  $syntheticRecord = [pscustomobject]@{
    version=1;runId='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';bearer='bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';verifier='cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc';notBefore='2026-08-07T00:00:00.000Z';expiresAt='2026-08-07T00:15:00.000Z';
    remoteNames=@($temporaryNames);deploymentId=$null;phase='provisioned';deployAttemptCount=0;publicGateAttemptCount=0;readinessAttemptCount=0;expiryAttemptCount=0
  }
  $phaseWriteState = [pscustomobject]@{Count=0}
  $phaseWriter = { param([pscustomobject]$Value) $phaseWriteState.Count += 1 }.GetNewClosure()
  $syntheticRecord = Start-LiveAttempt -Record $syntheticRecord -ExpectedPhase 'provisioned' -CounterName 'deployAttemptCount' -StartedPhase 'deploy-attempted' -Writer $phaseWriter
  $phaseRefusalCount = 0
  foreach ($phaseCase in @(
    { [void](Start-LiveAttempt -Record $syntheticRecord -ExpectedPhase 'provisioned' -CounterName 'deployAttemptCount' -StartedPhase 'deploy-attempted' -Writer $phaseWriter) },
    { [void](Start-LiveAttempt -Record $syntheticRecord -ExpectedPhase 'public-gate-verified' -CounterName 'readinessAttemptCount' -StartedPhase 'readiness-attempted' -Writer $phaseWriter) }
  )) {
    try { & $phaseCase } catch { if ($_.Exception.Message -cin @('ATTEMPT_CEILING_REFUSED','ATTEMPT_ORDER_REFUSED')) { $phaseRefusalCount += 1 } else { throw } }
  }
  $syntheticRecord = Complete-LivePhase -Record $syntheticRecord -ExpectedPhase 'deploy-attempted' -CompletedPhase 'deployed' -DeploymentId 'dpl_SyntheticPhase029V' -Writer $phaseWriter
  try { [void](Start-LiveAttempt -Record $syntheticRecord -ExpectedPhase 'public-gate-verified' -CounterName 'readinessAttemptCount' -StartedPhase 'readiness-attempted' -Writer $phaseWriter) } catch { if ($_.Exception.Message -cin @('ATTEMPT_CEILING_REFUSED','ATTEMPT_ORDER_REFUSED')) { $phaseRefusalCount += 1 } else { throw } }
  $syntheticRecord = Start-LiveAttempt -Record $syntheticRecord -ExpectedPhase 'deployed' -CounterName 'publicGateAttemptCount' -StartedPhase 'public-gate-attempted' -Writer $phaseWriter
  try { [void](Start-LiveAttempt -Record $syntheticRecord -ExpectedPhase 'deployed' -CounterName 'publicGateAttemptCount' -StartedPhase 'public-gate-attempted' -Writer $phaseWriter) } catch { if ($_.Exception.Message -cin @('ATTEMPT_CEILING_REFUSED','ATTEMPT_ORDER_REFUSED')) { $phaseRefusalCount += 1 } else { throw } }
  $syntheticRecord = Complete-LivePhase -Record $syntheticRecord -ExpectedPhase 'public-gate-attempted' -CompletedPhase 'public-gate-verified' -Writer $phaseWriter
  $syntheticRecord = Start-LiveAttempt -Record $syntheticRecord -ExpectedPhase 'public-gate-verified' -CounterName 'readinessAttemptCount' -StartedPhase 'readiness-attempted' -Writer $phaseWriter
  $syntheticRecord = Complete-LivePhase -Record $syntheticRecord -ExpectedPhase 'readiness-attempted' -CompletedPhase 'readiness-verified' -Writer $phaseWriter
  $syntheticRecord = Start-LiveAttempt -Record $syntheticRecord -ExpectedPhase 'readiness-verified' -CounterName 'expiryAttemptCount' -StartedPhase 'expiry-attempted' -Writer $phaseWriter
  $phaseFixturePassCount = if($syntheticRecord.phase -ceq 'expiry-attempted' -and $phaseWriteState.Count -eq 7 -and $phaseRefusalCount -eq 4){1}else{0}
  if ($phaseFixturePassCount -ne 1) { throw 'SELF_TEST_REFUSED' }

  $originRecord = [pscustomobject]@{
    version=1;runId='dddddddddddddddddddddddddddddddd';bearer='eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';verifier='ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';notBefore='2026-08-07T00:00:00.000Z';expiresAt='2026-08-07T00:15:00.000Z';
    remoteNames=@($temporaryNames);deploymentId='dpl_SyntheticOrigin029V';phase='deployed';deployAttemptCount=1;publicGateAttemptCount=0;readinessAttemptCount=0;expiryAttemptCount=0
  }
  $acceptedOriginFixture = 'https://pnr-precision-performance-accepted029v-rankin007s-projects.vercel.app'
  $wrongOriginFixture = 'https://pnr-precision-performance-wrong029v-rankin007s-projects.vercel.app'
  $originResolver = { param([string]$Id) if($Id -cne 'dpl_SyntheticOrigin029V'){throw 'DEPLOYMENT_REFUSED'}; [pscustomobject]@{Origin=$acceptedOriginFixture} }.GetNewClosure()
  $originRequestState = [pscustomobject]@{Positive=0;Mismatch=0;BearerExposure=0}
  $positiveRequester = { param([string]$BoundOrigin,[pscustomobject]$BoundRecord) $originRequestState.Positive += 1; [pscustomobject]@{Origin=$BoundOrigin} }.GetNewClosure()
  $originResult = Invoke-OriginBoundRequest -Record $originRecord -SuppliedOrigin $acceptedOriginFixture -Resolver $originResolver -Requester $positiveRequester
  $originBindingPassCount = if($originRequestState.Positive -eq 1 -and $originResult.Origin -ceq $acceptedOriginFixture){1}else{0}
  $negativeRequester = { param([string]$BoundOrigin,[pscustomobject]$BoundRecord) $originRequestState.Mismatch += 1; if($BoundRecord.bearer){$originRequestState.BearerExposure += 1} }.GetNewClosure()
  $originMismatchRefusalCount = 0
  try { [void](Invoke-OriginBoundRequest -Record $originRecord -SuppliedOrigin $wrongOriginFixture -Resolver $originResolver -Requester $negativeRequester) } catch { if ($_.Exception.Message -ceq 'ORIGIN_BINDING_REFUSED') { $originMismatchRefusalCount = 1 } else { throw } }
  $originMismatchRequestCount = $originRequestState.Mismatch
  $originMismatchBearerExposureCount = $originRequestState.BearerExposure
  if ($originBindingPassCount -ne 1 -or $originMismatchRefusalCount -ne 1 -or $originMismatchRequestCount -ne 0 -or $originMismatchBearerExposureCount -ne 0) { throw 'SELF_TEST_REFUSED' }

  $jsonShapeRefusalCount = 0
  foreach ($shapeCase in @(
    @{ Code='VERCEL_JSON_REFUSED'; Run={ [void](Get-JsonRows -Json ([pscustomobject]@{ envs=@(); extra='refuse' }) -ContainerName 'envs' -AllowedTopLevelFields @('envs') -RequiredTopLevelFields @('envs')) } },
    @{ Code='VERCEL_JSON_REFUSED'; Run={ [void](ConvertTo-EnvironmentProjection -Rows @([pscustomobject]@{ key='SMTP_HOST'; type='encrypted'; target=@('production'); extra='refuse' })) } },
    @{ Code='ALIAS_PROJECTION_REFUSED'; Run={ [void](ConvertTo-AliasProjection -Rows @([pscustomobject]@{ alias='www.precisionperformance.com.au'; deploymentId=$acceptedDeployment; extra='refuse' })) } },
    @{ Code='VERCEL_JSON_REFUSED'; Run={ [void](ConvertTo-DeploymentInventoryRows -Rows @([pscustomobject]@{ id='dpl_synthetic'; state='READY'; target='production'; createdAt=1; extra='refuse' })) } },
    @{ Code='DEPLOYMENT_REFUSED'; Run={ [void](ConvertTo-DeploymentProjection -Value ([pscustomobject]@{ id=$acceptedDeployment; name='synthetic'; url='pnr-precision-performance-synthetic-rankin007s-projects.vercel.app'; target='production'; readyState='READY'; extra='refuse' }) -DeploymentId $acceptedDeployment) } },
    @{ Code='DEPLOYMENT_REFUSED'; Run={ [void](ConvertTo-DeployResultProjection -Value ([pscustomobject]@{ id='dpl_synthetic'; url='https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app'; inspectorUrl=$null; readyState='READY'; target='production'; deploymentApiUrl='https://api.vercel.com/v13/deployments/dpl_synthetic'; extra='refuse' })) } }
  )) {
    $didRefuse = $false
    try { & $shapeCase.Run } catch { if ($_.Exception.Message -ceq $shapeCase.Code) { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $jsonShapeRefusalCount += 1
  }

  $deploymentTargetRefusalCount = 0
  foreach ($targetCase in @(
    { [void](ConvertTo-DeploymentProjection -Value ([pscustomobject]@{ id=$acceptedDeployment; name='synthetic'; url='pnr-precision-performance-synthetic-rankin007s-projects.vercel.app'; target='staging'; readyState='READY' }) -DeploymentId $acceptedDeployment) },
    { [void](ConvertTo-DeploymentInventoryRows -Rows @([pscustomobject]@{ id='dpl_synthetic'; state='READY'; target='staging'; createdAt=1 })) },
    { [void](ConvertTo-DeployResultProjection -Value ([pscustomobject]@{ id='dpl_synthetic'; url='https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app'; inspectorUrl=$null; readyState='READY'; target='preview'; deploymentApiUrl='https://api.vercel.com/v13/deployments/dpl_synthetic' })) }
  )) {
    $didRefuse = $false
    try { & $targetCase } catch { if ($_.Exception.Message -ceq 'DEPLOYMENT_REFUSED') { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $deploymentTargetRefusalCount += 1
  }

  $baselineFixturePassCount = 0
  $baselineFailureFixtureCount = 0
  $baseEnvironment = [pscustomobject]@{ Dedicated=0; Temporary=0; Activation=0; Generic=5 }
  $baseAliases = [pscustomobject]@{ AliasCount=5; ExpectedAcceptedCount=5; AcceptedCount=5; Inert029NAliasCount=0; Inert029OAliasCount=0; RetainedPreviewAliasCount=0 }
  $baseAccepted = [pscustomobject]@{ TargetClass='production'; ReadinessClass='ready' }
  $basePrior029N = [pscustomobject]@{ TargetClass='production'; ReadinessClass='ready'; AliasCount=0 }
  $basePrior029O = [pscustomobject]@{ TargetClass='production'; ReadinessClass='ready'; AliasCount=0 }
  $basePreview = [pscustomobject]@{ TargetClass='preview'; ReadinessClass='ready' }
  if (Assert-BaselineProjection -Environment $baseEnvironment -CredentialPresent $false -SprintDeploymentCount 0 -AliasProjection $baseAliases -AcceptedDeploymentProjection $baseAccepted -Prior029NDeploymentProjection $basePrior029N -Prior029ODeploymentProjection $basePrior029O -PreviewDeploymentProjection $basePreview) { $baselineFixturePassCount = 1 }
  foreach ($failureCode in $baselineFailureCodes) {
    $environmentFixture = [pscustomobject]@{ Dedicated=0; Temporary=0; Activation=0; Generic=5 }
    $credentialFixture = $false
    $deploymentCountFixture = 0
    $aliasesFixture = [pscustomobject]@{ AliasCount=5; ExpectedAcceptedCount=5; AcceptedCount=5; Inert029NAliasCount=0; Inert029OAliasCount=0; RetainedPreviewAliasCount=0 }
    $acceptedFixture = [pscustomobject]@{ TargetClass='production'; ReadinessClass='ready' }
    $prior029NFixture = [pscustomobject]@{ TargetClass='production'; ReadinessClass='ready'; AliasCount=0 }
    $prior029OFixture = [pscustomobject]@{ TargetClass='production'; ReadinessClass='ready'; AliasCount=0 }
    $previewFixture = [pscustomobject]@{ TargetClass='preview'; ReadinessClass='ready' }
    switch -CaseSensitive ($failureCode) {
      'BASELINE_ENVIRONMENT_REFUSED' { $environmentFixture.Generic = 4 }
      'BASELINE_CREDENTIAL_REFUSED' { $credentialFixture = $true }
      'BASELINE_029V_DEPLOYMENT_REFUSED' { $deploymentCountFixture = 1 }
      'BASELINE_EXPECTED_ALIAS_INVENTORY_REFUSED' { $aliasesFixture.ExpectedAcceptedCount = 4 }
      'BASELINE_ACCEPTED_DEPLOYMENT_REFUSED' { $acceptedFixture.TargetClass = 'preview' }
      'BASELINE_029N_DEPLOYMENT_REFUSED' { $prior029NFixture.TargetClass = 'preview' }
      'BASELINE_029O_DEPLOYMENT_REFUSED' { $prior029OFixture.AliasCount = 1 }
      'BASELINE_RETAINED_PREVIEW_REFUSED' { $previewFixture.TargetClass = 'production' }
      default { throw 'SELF_TEST_REFUSED' }
    }
    $didRefuse = $false
    try {
      [void](Assert-BaselineProjection -Environment $environmentFixture -CredentialPresent $credentialFixture -SprintDeploymentCount $deploymentCountFixture -AliasProjection $aliasesFixture -AcceptedDeploymentProjection $acceptedFixture -Prior029NDeploymentProjection $prior029NFixture -Prior029ODeploymentProjection $prior029OFixture -PreviewDeploymentProjection $previewFixture)
    } catch { if ($_.Exception.Message -ceq $failureCode) { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $baselineFailureFixtureCount += 1
  }
  if ($baselineFixturePassCount -ne 1 -or $baselineFailureFixtureCount -ne $baselineFailureCodes.Count) { throw 'SELF_TEST_REFUSED' }

  $historicalMissingRefusalCount = 0
  foreach ($missingCase in @(
    @{ Id=$inert029NDeployment; Code='BASELINE_029N_DEPLOYMENT_REFUSED' },
    @{ Id=$inert029ODeployment; Code='BASELINE_029O_DEPLOYMENT_REFUSED' }
  )) {
    $didRefuse = $false
    try { [void](Get-RequiredHistoricalDeploymentProjection -DeploymentId $missingCase.Id -FailureCode $missingCase.Code -Resolver { param([string]$Id) throw 'SYNTHETIC_MISSING' }) }
    catch { if ($_.Exception.Message -ceq $missingCase.Code) { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $historicalMissingRefusalCount += 1
  }
  if ($historicalMissingRefusalCount -ne 2) { throw 'SELF_TEST_REFUSED' }

  $refused = @(
    @(),
    @('deploy'),
    @('env','ls','production'),
    @('env','ls','--format','json','production','--no-color'),
    @('env','ls','production','--format','json','--no-color','--no-color'),
    @('env','ls','preview','--format','json','--no-color'),
    @('deploy','--prod','--skip-domain','--yes','--format','json','--no-color','--meta','pp_sprint=029V','--force'),
    @('deploy','--prod','--yes','--format','json','--no-color','--meta','pp_sprint=029V'),
    @('inspect','dpl_synthetic','--format','json','--no-color'),
    @('list','--meta','pp_sprint=other','--format','json','--no-color'),
    @('env','add','PUBLIC_ENQUIRY_SMTP_PASS','production','--sensitive','--yes','--no-color'),
    @('env','add','PUBLIC_ENQUIRY_SMTP_HOST','production','--yes','--no-color'),
    @('env','add','PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256','production','--yes','--no-color'),
    @('env','add','PUBLIC_ENQUIRY_SMTP_HOST','production','--value','synthetic','--yes','--no-color'),
    @('env','rm','SMTP_HOST','production','--yes','--no-color'),
    @('--token','synthetic')
  )
  foreach ($vector in $refused) {
    $before = $calls.Count
    $didRefuse = $false
    try { [void](Invoke-VercelCaptured -CommandArgs $vector -Runner $runner) } catch { if ($_.Exception.Message -eq 'VERCEL_VECTOR_REFUSED') { $didRefuse = $true } else { throw } }
    if (-not $didRefuse -or $calls.Count -ne $before) { throw 'SELF_TEST_REFUSED' }
  }
  [pscustomobject]@{controller='029V';operation='self-test';state='pass';allowedVectorCount=$allowed.Count;refusedVectorCount=$refused.Count;lostArgsCount=0;safeArgsCount=4;processTransferArgCount=4;processTransferState='pass';genericProductionIncludingCount=$genericProjection.Generic;activationRowCount=$genericProjection.Activation;ownedScopeRefusalCount=$ownedScopeRefusalCount;ownedSensitivityRefusalCount=$ownedSensitivityRefusalCount;missingTypeRefusalCount=$missingTypeRefusalCount;aliasInventoryFixtureCount=$aliasFixtureProjection.AliasCount;aliasTruncationRefusalCount=$aliasTruncationRefusalCount;jsonShapeRefusalCount=$jsonShapeRefusalCount;deploymentTargetRefusalCount=$deploymentTargetRefusalCount;baselineFixturePassCount=$baselineFixturePassCount;baselineFailureCodeCount=$baselineFailureFixtureCount;cliVersionFixturePassCount=$cliVersionFixturePassCount;agentEnvelopeFixturePassCount=$agentEnvelopeFixturePassCount;agentEnvelopeRefusalCount=$agentEnvelopeRefusalCount;paginationFixturePassCount=$paginationFixturePassCount;paginationRefusalCount=$paginationRefusalCount;protectedInventoryRefusalCount=$protectedInventoryRefusalCount;phaseFixturePassCount=$phaseFixturePassCount;phaseRefusalCount=$phaseRefusalCount;originBindingPassCount=$originBindingPassCount;originMismatchRefusalCount=$originMismatchRefusalCount;originMismatchRequestCount=$originMismatchRequestCount;originMismatchBearerExposureCount=$originMismatchBearerExposureCount;runnerResidue=0} | ConvertTo-Json -Compress
}

Assert-Workspace
Assert-Project

if ($Operation -eq 'SelfTest') { Invoke-ControllerSelfTest; exit 0 }

if ($Operation -eq 'CredentialSelfTest') {
  if (Test-FixedCredential $testTarget) { throw 'SYNTHETIC_TARGET_EXISTS' }
  try {
    Set-FixedCredential $testTarget 'synthetic-fixture-only'
    $roundTrip = Read-FixedCredential $testTarget
    if ($roundTrip -cne 'synthetic-fixture-only') { throw 'CREDENTIAL_ROUNDTRIP_REFUSED' }
  } finally { $roundTrip=$null; Remove-FixedCredential $testTarget }
  if (Test-FixedCredential $testTarget) { throw 'SYNTHETIC_DELETE_REFUSED' }
  '{"controller":"029V","operation":"credential-self-test","state":"pass","credentialResidue":0}'
  exit 0
}

[void](Assert-VercelCliVersion)

if ($Operation -eq 'Inventory') {
  $inventory = Get-StableFullDeploymentInventory
  $active = Get-ActiveDeploymentCount $inventory.Rows
  [pscustomobject]@{
    controller='029V'
    operation='inventory'
    state='pass'
    deploymentCount=$inventory.Rows.Count
    activeDeploymentCount=$active
    pageCount=$inventory.Pages
    restartCount=$inventory.RestartCount
    headStable=$inventory.HeadStable
    rows=@($inventory.Rows)
  } | ConvertTo-Json -Compress -Depth 5
  exit 0
}
if ($Operation -eq 'Baseline') {
  try { $environment = Get-EnvironmentProjection } catch { Stop-BaselineFailure 'BASELINE_ENVIRONMENT_REFUSED' }
  try { $credentialPresent = Test-FixedCredential $liveTarget } catch { Stop-BaselineFailure 'BASELINE_CREDENTIAL_REFUSED' }
  try { $sprintDeployments = Get-DeploymentListProjection } catch { Stop-BaselineFailure 'BASELINE_029V_DEPLOYMENT_REFUSED' }
  try { $aliasesProjection = Get-AliasProjection } catch { Stop-BaselineFailure 'BASELINE_EXPECTED_ALIAS_INVENTORY_REFUSED' }
  try { $accepted = Get-DeploymentProjection $acceptedDeployment } catch { Stop-BaselineFailure 'BASELINE_ACCEPTED_DEPLOYMENT_REFUSED' }
  $prior029N = Get-RequiredHistoricalDeploymentProjection -DeploymentId $inert029NDeployment -FailureCode 'BASELINE_029N_DEPLOYMENT_REFUSED'
  $prior029O = Get-RequiredHistoricalDeploymentProjection -DeploymentId $inert029ODeployment -FailureCode 'BASELINE_029O_DEPLOYMENT_REFUSED'
  try { $preview = Get-DeploymentProjection $inert029SPreview } catch { Stop-BaselineFailure 'BASELINE_RETAINED_PREVIEW_REFUSED' }
  [void](Assert-BaselineProjection -Environment $environment -CredentialPresent $credentialPresent -SprintDeploymentCount $sprintDeployments.Count -AliasProjection $aliasesProjection -AcceptedDeploymentProjection $accepted -Prior029NDeploymentProjection $prior029N -Prior029ODeploymentProjection $prior029O -PreviewDeploymentProjection $preview)
  $priorCandidateCount = @($prior029N,$prior029O).Count
  [pscustomobject]@{controller='029V';operation='baseline';state='pass';projectClass='exact';dedicatedSmtpRowCount=0;temporaryAuthRowCount=0;activationRowCount=0;genericSmtpRowCount=5;credentialState='absent';sprintDeploymentCount=0;retainedPreviewClass='ready-preview-inert';retainedPreviewAliasCount=0;priorCandidateCount=$priorCandidateCount;priorCandidateAliasCount=0;acceptedDeploymentClass='ready';acceptedAliasTargetCount=5} | ConvertTo-Json -Compress
  exit 0
}

if ($Operation -eq 'AcceptPrivatePasswordBaseline') {
  [void](Assert-AliasAndQueueSafety)
  if (Test-FixedCredential $liveTarget) { throw 'CREDENTIAL_TARGET_EXISTS' }
  $environment = Get-EnvironmentProjection
  $deploymentIds = Get-DeploymentListProjection
  $aliasesProjection = Get-AliasProjection
  if ($environment.Dedicated -ne 1 -or $environment.Temporary -ne 0 -or $environment.Activation -ne 0 -or
    $environment.Generic -ne 5 -or $deploymentIds.Count -ne 0 -or
    @($environment.Names | Where-Object { $_ -cin $ownedNames }).Count -ne 1 -or
    'PUBLIC_ENQUIRY_SMTP_PASS' -cnotin $environment.Names -or
    $aliasesProjection.AliasCount -ne 5 -or $aliasesProjection.ExpectedAcceptedCount -ne 5 -or
    $aliasesProjection.AcceptedCount -ne 5 -or $aliasesProjection.Inert029NAliasCount -ne 0 -or
    $aliasesProjection.Inert029OAliasCount -ne 0 -or $aliasesProjection.RetainedPreviewAliasCount -ne 0) { throw 'PRIVATE_PASSWORD_BASELINE_REFUSED' }
  '{"controller":"029V","operation":"accept-private-password-baseline","state":"pass","dedicatedSmtpRowCount":1,"temporaryAuthRowCount":0,"activationRowCount":0,"genericSmtpRowCount":5,"passwordSensitivityClass":"exact-sensitive-production","sprintDeploymentCount":0,"acceptedAliasTargetCount":5}'
  exit 0
}

if ($Operation -eq 'AddStructuralSmtp') {
  [void](Assert-AliasAndQueueSafety)
  $environment = Get-EnvironmentProjection
  if ($environment.Dedicated -ne 1 -or $environment.Temporary -ne 0 -or $environment.Activation -ne 0 -or $environment.Generic -ne 5 -or
    'PUBLIC_ENQUIRY_SMTP_PASS' -cnotin $environment.Names -or
    @($structuralNames | Where-Object { $_ -cin $environment.Names }).Count -ne 0) { throw 'BASELINE_REFUSED' }
  $created = New-Object System.Collections.Generic.List[string]
  try {
    foreach ($name in $structuralNames) { Add-RemoteValue $name $structuralValues[$name]; $created.Add($name) }
    $after = Get-EnvironmentProjection
    if ($after.Dedicated -ne 4 -or $after.Temporary -ne 0 -or $after.Activation -ne 0 -or $after.Generic -ne 5) { throw 'CONFIGURATION_REFUSED' }
  } catch {
    $operationFailure = $_.Exception.Message
    if ($created.Count -gt 0) {
      try { [void](Complete-OwnedEnvironmentCleanup -Names @($created) -RemoveCredential $false) } catch { throw 'CLEANUP_REFUSED' }
    }
    throw $operationFailure
  }
  '{"controller":"029V","operation":"add-structural-smtp","state":"pass","dedicatedSmtpRowCount":4,"temporaryAuthRowCount":0,"activationRowCount":0,"sensitivityClass":"all-exact-sensitive-production"}'
  exit 0
}

if ($Operation -eq 'Provision') {
  [void](Assert-AliasAndQueueSafety)
  if (Test-FixedCredential $liveTarget) { throw 'CREDENTIAL_TARGET_EXISTS' }
  $environment = Get-EnvironmentProjection
  if ($environment.Dedicated -ne 4 -or $environment.Temporary -ne 0 -or $environment.Activation -ne 0 -or $environment.Generic -ne 5) { throw 'BASELINE_REFUSED' }
  $bytes = New-Object byte[] 32
  $generator = [Security.Cryptography.RandomNumberGenerator]::Create()
  $created = New-Object System.Collections.Generic.List[string]
  try {
    $generator.GetBytes($bytes)
    $bearer = [Convert]::ToBase64String($bytes).TrimEnd('=').Replace('+','-').Replace('/','_')
    $sha = [Security.Cryptography.SHA256]::Create()
    try { $verifier = ([BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($bearer)))).Replace('-','').ToLowerInvariant() } finally { $sha.Dispose() }
    $notBefore = [DateTime]::UtcNow.AddMinutes(-1)
    $expiresAt = $notBefore.AddMinutes(15)
    $record = [pscustomobject][ordered]@{version=1;runId=[guid]::NewGuid().ToString('N');bearer=$bearer;verifier=$verifier;notBefore=(Format-CanonicalUtc $notBefore);expiresAt=(Format-CanonicalUtc $expiresAt);remoteNames=$temporaryNames;deploymentId=$null;phase='provisioned';deployAttemptCount=0;publicGateAttemptCount=0;readinessAttemptCount=0;expiryAttemptCount=0}
    [void](Assert-LiveRecord -Record $record)
    Set-FixedCredential $liveTarget ($record | ConvertTo-Json -Compress)
    Add-RemoteValue $temporaryNames[0] $record.verifier; $created.Add($temporaryNames[0])
    Add-RemoteValue $temporaryNames[1] $record.notBefore; $created.Add($temporaryNames[1])
    Add-RemoteValue $temporaryNames[2] $record.expiresAt; $created.Add($temporaryNames[2])
    $after = Get-EnvironmentProjection
    if ($after.Dedicated -ne 4 -or $after.Temporary -ne 3 -or $after.Activation -ne 0 -or $after.Generic -ne 5) { throw 'CONFIGURATION_REFUSED' }
    '{"controller":"029V","operation":"provision","state":"pass","bindingCount":3,"windowClass":"bounded","credentialState":"present","activationRowCount":0,"sensitivityClass":"all-seven-exact-sensitive-production"}'
  } catch {
    $operationFailure = $_.Exception.Message
    try { [void](Complete-OwnedEnvironmentCleanup -Names $temporaryNames -RemoveCredential $true) } catch { throw 'CLEANUP_REFUSED' }
    throw $operationFailure
  } finally {
    [Array]::Clear($bytes,0,$bytes.Length);$generator.Dispose();$bearer=$null;$verifier=$null;$record=$null
  }
  exit 0
}

if ($Operation -eq 'Deploy') {
  $record = Read-LiveRecord
  try {
    if ($record.deploymentId) { throw 'DEPLOYMENT_EXISTS' }
    $environment = Get-EnvironmentProjection
    $safety = Assert-AliasAndQueueSafety
    if ($environment.Dedicated -ne 4 -or $environment.Temporary -ne 3 -or
      $environment.Activation -ne 0 -or $environment.Generic -ne 5 -or
      (Get-DeploymentListProjection).Count -ne 0) { throw 'BASELINE_REFUSED' }
    $record = Start-LiveAttempt -Record $record -ExpectedPhase 'provisioned' -CounterName 'deployAttemptCount' -StartedPhase 'deploy-attempted'
    $result = Invoke-DeployWithReconciliation -PreInventory $safety.Inventory
    $id = $result.DeploymentId
    $record = Complete-LivePhase -Record $record -ExpectedPhase 'deploy-attempted' -CompletedPhase 'deployed' -DeploymentId $id
    [void](Assert-AliasAndQueueSafety)
    [pscustomobject]@{
      controller='029V'
      operation='deploy'
      state='pass'
      deploymentId=$id
      candidateOrigin=$result.Candidate.Origin
      responseForm=$result.Direct.Form
      targetClass='production'
      readinessClass='ready'
      aliasCount=0
      metadataClass='exact-029V'
      sourceClass='exact-canonical'
      reconciliationObservationCount=$result.ObservationCounts.Count
      fullDeploymentDeltaCount=1
    } | ConvertTo-Json -Compress
  } finally { if($record){$record.bearer=$null;$record.verifier=$null};$record=$null }
  exit 0
}

if ($Operation -eq 'Status') {
  $environment = Get-EnvironmentProjection
  $aliasesProjection = Get-AliasProjection
  $deploymentIds = Get-DeploymentListProjection
  $candidateClass = 'absent'
  $candidateAliasCount = 0
  if ($deploymentIds.Count -eq 1) {
    $script:OwnedDeploymentId = $deploymentIds[0]
    $candidate = Get-DeploymentProjection $deploymentIds[0]
    if ($candidate.TargetClass -ne 'production' -or $candidate.MetadataClass -ne 'exact-029V') { throw 'DEPLOYMENT_REFUSED' }
    $candidateClass = $candidate.ReadinessClass
    $candidateAliasCount = $candidate.AliasCount
  } elseif ($deploymentIds.Count -gt 1) { throw 'DEPLOYMENT_REFUSED' }
  [pscustomobject]@{controller='029V';operation='status';state='pass';dedicatedSmtpRowCount=$environment.Dedicated;temporaryAuthRowCount=$environment.Temporary;activationRowCount=$environment.Activation;genericSmtpRowCount=$environment.Generic;credentialState=$(if(Test-FixedCredential $liveTarget){'present'}else{'absent'});sprintDeploymentCount=$deploymentIds.Count;candidateClass=$candidateClass;candidateAliasCount=$candidateAliasCount;acceptedAliasTargetCount=$aliasesProjection.AcceptedCount} | ConvertTo-Json -Compress
  exit 0
}

if ($Operation -eq 'Compensate') {
  $record = $null
  try {
    if (Test-FixedCredential $liveTarget) { $record = Read-LiveRecord }
    $owned = @(Get-DeploymentListProjection)
    if ($owned.Count -gt 1) { throw 'DEPLOYMENT_AMBIGUOUS_MATERIAL' }
    if ($owned.Count -eq 1) { Remove-ExactOwnedDeployment -DeploymentId $owned[0] }
    [void](Complete-OwnedEnvironmentCleanup -Names $ownedNames -RemoveCredential $true)
    $after = Get-EnvironmentProjection
    $remaining = @(Get-DeploymentListProjection)
    $inventory = Get-StableFullDeploymentInventory
    $aliasesAfter = Get-AliasProjection
    if ($after.Dedicated -ne 0 -or $after.Temporary -ne 0 -or $after.Activation -ne 0 -or
      (Test-FixedCredential $liveTarget) -or $remaining.Count -ne 0 -or
      (Get-ActiveDeploymentCount $inventory.Rows) -ne 0 -or
      $aliasesAfter.AliasCount -ne 5 -or $aliasesAfter.ExpectedAcceptedCount -ne 5 -or $aliasesAfter.AcceptedCount -ne 5) {
      throw 'CLEANUP_REFUSED'
    }
    '{"controller":"029V","operation":"compensate","state":"pass","bindingResidue":0,"credentialResidue":0,"deploymentResidue":0,"acceptedAliasTargetCount":5}'
  } finally { if($record){$record.bearer=$null;$record.verifier=$null};$record=$null }
  exit 0
}

$record = Read-LiveRecord
try {
  [void](Assert-AliasAndQueueSafety)
  if ($Operation -eq 'VerifyPublicGate') {
    $record = Start-LiveAttempt -Record $record -ExpectedPhase 'deployed' -CounterName 'publicGateAttemptCount' -StartedPhase 'public-gate-attempted'
    $result = Invoke-OriginBoundRequest -Record $record -SuppliedOrigin $Origin -Requester { param([string]$BoundOrigin,[pscustomobject]$BoundRecord) Invoke-PublicGate $BoundOrigin }
    if ($result.StatusCode -ne 503) { throw 'PUBLIC_GATE_REFUSED' }
    try { $value = $result.Body | ConvertFrom-Json } catch { throw 'PUBLIC_GATE_REFUSED' }
    Assert-ExactJsonObject -Value $value -AllowedFields @('result','message') -RequiredFields @('result','message') -RefusalCode 'PUBLIC_GATE_REFUSED'
    if ($value.result -cne 'unavailable' -or $value.message -cne 'Online enquiries are temporarily unavailable. Please try again later.') { throw 'PUBLIC_GATE_REFUSED' }
    $record = Complete-LivePhase -Record $record -ExpectedPhase 'public-gate-attempted' -CompletedPhase 'public-gate-verified'
    '{"controller":"029V","operation":"verify-public-gate","state":"pass","requestCount":1,"httpClass":"service-unavailable","responseClass":"sanitized","productActionCount":0}'
  } elseif ($Operation -eq 'VerifyReady') {
    $current = [DateTime]::UtcNow
    if ($current -lt [DateTime]::Parse($record.notBefore).ToUniversalTime() -or
      $current -ge [DateTime]::Parse($record.expiresAt).ToUniversalTime()) { throw 'WINDOW_REFUSED' }
    $record = Start-LiveAttempt -Record $record -ExpectedPhase 'public-gate-verified' -CounterName 'readinessAttemptCount' -StartedPhase 'readiness-attempted'
    $result = Invoke-OriginBoundRequest -Record $record -SuppliedOrigin $Origin -Requester { param([string]$BoundOrigin,[pscustomobject]$BoundRecord) Invoke-Candidate $BoundOrigin $BoundRecord.bearer }
    if ($result.StatusCode -ne 200) { throw 'PREFLIGHT_REFUSED' }
    try { $value = $result.Body | ConvertFrom-Json } catch { throw 'PREFLIGHT_REFUSED' }
    if ($value.result -cne 'smtp-preflight' -or $value.status -cne 'ready' -or
      $value.providerClass -cne 'resend' -or $null -ne $value.errorClass) { throw 'PREFLIGHT_REFUSED' }
    $record = Complete-LivePhase -Record $record -ExpectedPhase 'readiness-attempted' -CompletedPhase 'readiness-verified'
    '{"controller":"029V","operation":"verify-ready","state":"pass","requestCount":1,"providerClass":"resend","errorClass":null}'
  } elseif ($Operation -eq 'VerifyExpiredAndCleanup') {
    if ($record.phase -cne 'readiness-verified' -or $record.expiryAttemptCount -ne 0) { throw 'ATTEMPT_ORDER_REFUSED' }
    if ([DateTime]::UtcNow -lt [DateTime]::Parse($record.expiresAt).ToUniversalTime()) { throw 'EXPIRY_NOT_REACHED' }
    $record = Start-LiveAttempt -Record $record -ExpectedPhase 'readiness-verified' -CounterName 'expiryAttemptCount' -StartedPhase 'expiry-attempted'
    $result = Invoke-OriginBoundRequest -Record $record -SuppliedOrigin $Origin -Requester { param([string]$BoundOrigin,[pscustomobject]$BoundRecord) Invoke-Candidate $BoundOrigin $BoundRecord.bearer }
    if ($result.StatusCode -ne 404) { throw 'EXPIRED_DENIAL_REFUSED' }
    Remove-TemporaryResources $record
    '{"controller":"029V","operation":"expired-denial-cleanup","state":"pass","requestCount":1,"httpClass":"not-found","bindingResidue":0,"credentialResidue":0}'
  }
} finally {
  if($record){$record.bearer=$null;$record.verifier=$null};$result=$null;$value=$null;$record=$null
}
