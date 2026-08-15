[CmdletBinding()]
param(
  [Parameter(Mandatory)]
  [ValidateSet('SelfTest','CredentialSelfTest','Baseline','AddStructuralSmtp','Provision','Deploy','VerifyReady','VerifyExpiredAndCleanup','Status','Compensate')]
  [string]$Operation,
  [string]$Origin = ''
)

$ErrorActionPreference = 'Stop'
$canonicalWorkspace = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
$expectedBranch = 'codex/029T-readiness-boundary-recovery-after-inert-preview'
$expectedHead = 'd822c027c58ad88ec7472e35986e7a33d6a3d6c9'
$projectId = 'prj_6To7czLpCEGL6fInkQwE4egePPpq'
$acceptedDeployment = 'dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf'
$inert029NDeployment = 'dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB'
$inert029ODeployment = 'dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq'
$inert029SPreview = 'dpl_7MTexxU6RecGHZvCE9BukUwZU6Hx'
$liveTarget = 'PrecisionPerformance/029T/PreflightBearer'
$testTarget = 'PrecisionPerformance/029T/SyntheticTest'
$script:OwnedDeploymentId = ''

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
  'BASELINE_029T_DEPLOYMENT_REFUSED',
  'BASELINE_EXPECTED_ALIAS_INVENTORY_REFUSED',
  'BASELINE_ACCEPTED_DEPLOYMENT_REFUSED',
  'BASELINE_029N_ALIAS_REFUSED',
  'BASELINE_029O_ALIAS_REFUSED',
  'BASELINE_RETAINED_PREVIEW_REFUSED'
)

foreach ($scope in @('Global','Script')) {
  if (Get-Variable -Name Transcript -Scope $scope -ErrorAction SilentlyContinue) { throw 'TRANSCRIPT_REFUSED' }
}

Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public static class PP029TCredential {
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
  if (-not [PP029TCredential]::Read($Target, 1, 0, [ref]$pointer)) {
    if ([Runtime.InteropServices.Marshal]::GetLastWin32Error() -eq 1168) { return $false }
    throw 'CREDENTIAL_READ_REFUSED'
  }
  [PP029TCredential]::CredFree($pointer)
  return $true
}

function Set-FixedCredential([string]$Target, [string]$PlainText, [bool]$AllowOverwrite = $false) {
  if (-not $AllowOverwrite -and (Test-FixedCredential $Target)) { throw 'CREDENTIAL_TARGET_EXISTS' }
  $secure = ConvertTo-SecureString $PlainText -AsPlainText -Force
  $blob = [Runtime.InteropServices.Marshal]::SecureStringToGlobalAllocUnicode($secure)
  try {
    $credential = New-Object PP029TCredential+CREDENTIAL
    $credential.Type = 1
    $credential.TargetName = $Target
    $credential.Persist = 2
    $credential.CredentialBlob = $blob
    $credential.CredentialBlobSize = [Text.Encoding]::Unicode.GetByteCount($PlainText)
    $credential.UserName = 'sprint-029t'
    if (-not [PP029TCredential]::Write([ref]$credential, 0)) { throw 'CREDENTIAL_WRITE_REFUSED' }
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeGlobalAllocUnicode($blob)
    $secure.Dispose()
  }
}

function Read-FixedCredential([string]$Target) {
  $pointer = [IntPtr]::Zero
  if (-not [PP029TCredential]::Read($Target, 1, 0, [ref]$pointer)) { throw 'CREDENTIAL_ABSENT' }
  try {
    $credential = [Runtime.InteropServices.Marshal]::PtrToStructure($pointer, [type][PP029TCredential+CREDENTIAL])
    return [Runtime.InteropServices.Marshal]::PtrToStringUni($credential.CredentialBlob, [int]($credential.CredentialBlobSize / 2))
  } finally {
    [PP029TCredential]::CredFree($pointer)
  }
}

function Remove-FixedCredential([string]$Target) {
  if (-not [PP029TCredential]::Delete($Target, 1, 0)) {
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
    @{ Class='environment-list'; Args=@('env','ls','production','--format','json','--no-color'); Input=$false },
    @{ Class='alias-list'; Args=@('alias','ls','--format','json','--limit','100','--no-color'); Input=$false },
    @{ Class='deployment-list'; Args=@('list','--meta','pp_sprint=029T','--format','json','--no-color'); Input=$false },
    @{ Class='deploy'; Args=@('deploy','--prod','--skip-domain','--yes','--format','json','--no-color','--meta','pp_sprint=029T'); Input=$false }
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

  if ($CommandArgs.Count -eq 6 -and $CommandArgs[0] -ceq 'env' -and $CommandArgs[1] -ceq 'add' -and
    $CommandArgs[2] -cin $structuralNames -and $CommandArgs[3] -ceq 'production' -and
    $CommandArgs[4] -ceq '--yes' -and $CommandArgs[5] -ceq '--no-color' -and $InputWasBound) { return 'environment-add-public' }

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
  if ($vectorClass -like 'environment-add-*' -or $vectorClass -eq 'environment-remove') {
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
      if ($name -cin $ownedProductionNames) { throw 'ENVIRONMENT_SCOPE_REFUSED' }
      $ownedProductionNames.Add($name)
    } elseif ($name -cin $genericNames -and $targets -ccontains 'production' -and -not $branchScoped) {
      if ($name -cin $genericProductionNames) { throw 'VERCEL_JSON_REFUSED' }
      $genericProductionNames.Add($name)
    }
  }
  return [pscustomobject]@{
    Dedicated=@($dedicatedNames | Where-Object { $_ -cin $ownedProductionNames }).Count
    Temporary=@($temporaryNames | Where-Object { $_ -cin $ownedProductionNames }).Count
    Generic=$genericProductionNames.Count
    Names=@(@($ownedProductionNames) + @($genericProductionNames))
  }
}

function Get-EnvironmentProjection {
  $result = Invoke-VercelCaptured -CommandArgs @('env','ls','production','--format','json','--no-color')
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

function ConvertTo-DeploymentListProjection {
  param([Parameter(Mandatory)][AllowEmptyCollection()][object[]]$Rows)
  $ids = New-Object System.Collections.Generic.List[string]
  foreach ($row in $Rows) {
    Assert-ExactJsonObject -Value $row -AllowedFields @('id','url','name','state','target','customEnvironment','createdAt','buildingAt','ready','creator','meta') -RequiredFields @('id','state','target')
    $id = $row.id
    if ($id -isnot [string] -or $id -notmatch '^dpl_[A-Za-z0-9]+$') { throw 'VERCEL_JSON_REFUSED' }
    [void](Get-KnownDeploymentTargetClass -Target $row.target -AllowNullPreview $true)
    if (($row.PSObject.Properties.Name -ccontains 'customEnvironment') -and $null -ne $row.customEnvironment) { throw 'DEPLOYMENT_REFUSED' }
    $ids.Add($id)
  }
  if ($ids.Count -ne @($ids | Sort-Object -Unique -CaseSensitive).Count) { throw 'VERCEL_JSON_REFUSED' }
  return @($ids)
}

function Get-DeploymentListProjection {
  $result = Invoke-VercelCaptured -CommandArgs @('list','--meta','pp_sprint=029T','--format','json','--no-color')
  $rows = Get-JsonRows -Json $result.Json -ContainerName 'deployments' -AllowedTopLevelFields @('contextName','deployments','pagination') -RequiredTopLevelFields @('contextName','deployments','pagination')
  return ConvertTo-DeploymentListProjection -Rows $rows
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
  if ($id -cne $DeploymentId -or $ready -cne 'READY') { throw 'DEPLOYMENT_REFUSED' }
  return [pscustomobject]@{
    DeploymentId=$id
    TargetClass=$targetClass
    ReadinessClass='ready'
    AliasCount=$aliasesValue.Count
    MetadataClass=$(if($meta -and $meta.PSObject.Properties.Name -ccontains 'pp_sprint' -and $meta.pp_sprint -ceq '029T'){'exact-029T'}else{'historical'})
    SourceClass=$(if($sourceSha -ceq $expectedHead -or $DeploymentId -cin $fixedInspectIds){'exact-canonical'}else{'refused'})
  }
}

function Get-DeploymentProjection([string]$DeploymentId) {
  $result = Invoke-VercelCaptured -CommandArgs @('inspect',$DeploymentId,'--format','json','--no-color')
  return ConvertTo-DeploymentProjection -Value $result.Json -DeploymentId $DeploymentId
}

function ConvertTo-DeployResultProjection {
  param([Parameter(Mandatory)][pscustomobject]$Value)
  Assert-ExactJsonObject -Value $Value -AllowedFields @('id','url','inspectorUrl','readyState','target','deploymentApiUrl','error') -RequiredFields @('id','url','inspectorUrl','readyState','target','deploymentApiUrl') -RefusalCode 'DEPLOYMENT_REFUSED'
  if (($Value.PSObject.Properties.Name -ccontains 'error') -or $Value.id -isnot [string] -or
    $Value.id -notmatch '^dpl_[A-Za-z0-9]+$' -or $Value.readyState -cne 'READY' -or
    (Get-KnownDeploymentTargetClass -Target $Value.target) -cne 'production') { throw 'DEPLOYMENT_REFUSED' }
  return [pscustomobject]@{ DeploymentId=$Value.id; TargetClass='production'; ReadinessClass='ready' }
}

function Assert-BaselineProjection {
  param(
    [Parameter(Mandatory)][pscustomobject]$Environment,
    [Parameter(Mandatory)][bool]$CredentialPresent,
    [Parameter(Mandatory)][int]$SprintDeploymentCount,
    [Parameter(Mandatory)][pscustomobject]$AliasProjection,
    [Parameter(Mandatory)][pscustomobject]$AcceptedDeploymentProjection,
    [Parameter(Mandatory)][pscustomobject]$PreviewDeploymentProjection
  )
  if ($Environment.Dedicated -ne 0 -or $Environment.Temporary -ne 0 -or $Environment.Generic -ne 5) { Stop-BaselineFailure 'BASELINE_ENVIRONMENT_REFUSED' }
  if ($CredentialPresent) { Stop-BaselineFailure 'BASELINE_CREDENTIAL_REFUSED' }
  if ($SprintDeploymentCount -ne 0) { Stop-BaselineFailure 'BASELINE_029T_DEPLOYMENT_REFUSED' }
  if ($AliasProjection.AliasCount -ne 5 -or $AliasProjection.ExpectedAcceptedCount -ne 5 -or $AliasProjection.AcceptedCount -ne 5) { Stop-BaselineFailure 'BASELINE_EXPECTED_ALIAS_INVENTORY_REFUSED' }
  if ($AcceptedDeploymentProjection.TargetClass -ne 'production' -or $AcceptedDeploymentProjection.ReadinessClass -ne 'ready') { Stop-BaselineFailure 'BASELINE_ACCEPTED_DEPLOYMENT_REFUSED' }
  if ($AliasProjection.Inert029NAliasCount -ne 0) { Stop-BaselineFailure 'BASELINE_029N_ALIAS_REFUSED' }
  if ($AliasProjection.Inert029OAliasCount -ne 0) { Stop-BaselineFailure 'BASELINE_029O_ALIAS_REFUSED' }
  if ($PreviewDeploymentProjection.TargetClass -ne 'preview' -or $PreviewDeploymentProjection.ReadinessClass -ne 'ready' -or $AliasProjection.RetainedPreviewAliasCount -ne 0) { Stop-BaselineFailure 'BASELINE_RETAINED_PREVIEW_REFUSED' }
  return $true
}

function Read-LiveRecord {
  $plain = Read-FixedCredential $liveTarget
  try {
    $record = $plain | ConvertFrom-Json
    if ($record.version -ne 1 -or $record.remoteNames.Count -ne 3 -or
      @($record.remoteNames | Where-Object { $_ -notin $temporaryNames }).Count -ne 0 -or
      ($record.deploymentId -and $record.deploymentId -notmatch '^dpl_[A-Za-z0-9]+$')) { throw 'CREDENTIAL_RECORD_REFUSED' }
    return $record
  } finally { $plain = $null }
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

function Add-RemoteValue([string]$Name, [string]$Value) {
  if ($Name -cin $structuralNames) {
    [void](Invoke-VercelCaptured -CommandArgs @('env','add',$Name,'production','--yes','--no-color') -InputValue $Value)
  } elseif ($Name -cin $temporaryNames) {
    [void](Invoke-VercelCaptured -CommandArgs @('env','add',$Name,'production','--sensitive','--yes','--no-color') -InputValue $Value)
  } else { throw 'REMOTE_NAME_REFUSED' }
}

function Remove-RemoteValue([string]$Name) {
  if ($Name -cnotin $ownedNames) { throw 'REMOTE_NAME_REFUSED' }
  [void](Invoke-VercelCaptured -CommandArgs @('env','rm',$Name,'production','--yes','--no-color'))
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

function Remove-TemporaryResources([pscustomobject]$Record) {
  foreach ($name in $Record.remoteNames) { Remove-RemoteValue $name }
  Remove-FixedCredential $liveTarget
  $environment = Get-EnvironmentProjection
  if ($environment.Temporary -ne 0 -or (Test-FixedCredential $liveTarget)) { throw 'CLEANUP_REFUSED' }
}

function Invoke-ControllerSelfTest {
  $calls = New-Object System.Collections.Generic.List[object]
  $runner = {
    param([string[]]$CapturedArgs, [bool]$InputWasBound, [AllowNull()][string]$InputValue, [string]$VectorClass)
    $calls.Add([pscustomobject]@{ Args=@($CapturedArgs); InputWasBound=$InputWasBound; InputLength=$(if($InputWasBound){$InputValue.Length}else{0}); VectorClass=$VectorClass })
    [pscustomobject]@{ ExitCode=0; Stdout='{}'; Stderr='synthetic-stderr'; VectorClass=$VectorClass }
  }
  $allowed = New-Object System.Collections.Generic.List[object]
  $allowed.Add(@{ Args=@('env','ls','production','--format','json','--no-color'); Input=$false })
  $allowed.Add(@{ Args=@('alias','ls','--format','json','--limit','100','--no-color'); Input=$false })
  $allowed.Add(@{ Args=@('list','--meta','pp_sprint=029T','--format','json','--no-color'); Input=$false })
  $allowed.Add(@{ Args=@('deploy','--prod','--skip-domain','--yes','--format','json','--no-color','--meta','pp_sprint=029T'); Input=$false })
  foreach ($id in $fixedInspectIds) { $allowed.Add(@{ Args=@('inspect',$id,'--format','json','--no-color'); Input=$false }) }
  foreach ($name in $structuralNames) { $allowed.Add(@{ Args=@('env','add',$name,'production','--yes','--no-color'); Input=$true }) }
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

  function Test-LostAutomaticVector { param([string[]]$Args) return @($Args).Count }
  function Test-SafeCommandVector { param([string[]]$CommandArgs) return @($CommandArgs).Count }
  $discriminator = @('inspect','dpl_synthetic','--format','json')
  if ((Test-LostAutomaticVector $discriminator) -ne 0 -or (Test-SafeCommandVector $discriminator) -ne 4) { throw 'SELF_TEST_REFUSED' }

  $processTransfer = Invoke-CapturedChildProcess -ExecutablePath $env:ComSpec -CommandArgs @('/d','/s','/c','echo','PP029T_ONE','PP029T_TWO','PP029T_THREE','PP029T_FOUR') -InputWasBound $false -InputValue $null -VectorClass 'self-test-process'
  if ($processTransfer.ExitCode -ne 0 -or $processTransfer.VectorClass -cne 'self-test-process' -or
    $processTransfer.Stdout.Trim() -cne 'PP029T_ONE PP029T_TWO PP029T_THREE PP029T_FOUR' -or $processTransfer.Stderr) { throw 'SELF_TEST_REFUSED' }

  $genericFixture = @($genericNames | ForEach-Object {
    [pscustomobject]@{ key=$_; type='encrypted'; target=@('development','preview','production'); gitBranch=$null }
  })
  $genericProjection = ConvertTo-EnvironmentProjection -Rows $genericFixture
  if ($genericProjection.Generic -ne 5 -or $genericProjection.Dedicated -ne 0 -or $genericProjection.Temporary -ne 0) { throw 'SELF_TEST_REFUSED' }
  $ownedScopeRefusalCount = 0
  foreach ($fixture in @(
    [pscustomobject]@{ key='PUBLIC_ENQUIRY_SMTP_HOST'; type='encrypted'; target=@('preview','production'); gitBranch=$null },
    [pscustomobject]@{ key='PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256'; type='encrypted'; target=@('production'); gitBranch='synthetic-scoped-branch' }
  )) {
    $didRefuse = $false
    try { [void](ConvertTo-EnvironmentProjection -Rows @($fixture)) } catch { if ($_.Exception.Message -eq 'ENVIRONMENT_SCOPE_REFUSED') { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $ownedScopeRefusalCount += 1
  }

  $aliasFixtureRows = @($aliases | ForEach-Object { [pscustomobject]@{ alias=$_; deploymentId=$acceptedDeployment } })
  $aliasFixtureProjection = ConvertTo-AliasProjection -Rows $aliasFixtureRows
  if ($aliasFixtureProjection.AliasCount -ne 5 -or $aliasFixtureProjection.ExpectedAcceptedCount -ne 5 -or
    $aliasFixtureProjection.AcceptedCount -ne 5 -or $aliasFixtureProjection.Inert029NAliasCount -ne 0 -or
    $aliasFixtureProjection.Inert029OAliasCount -ne 0 -or $aliasFixtureProjection.RetainedPreviewAliasCount -ne 0) { throw 'SELF_TEST_REFUSED' }
  $aliasTruncationRefusalCount = 0
  $truncatedAliasFixture = @(0..99 | ForEach-Object { [pscustomobject]@{ alias="synthetic-alias-$_"; deploymentId=$acceptedDeployment } })
  try { [void](ConvertTo-AliasProjection -Rows $truncatedAliasFixture) } catch { if ($_.Exception.Message -eq 'ALIAS_PROJECTION_REFUSED') { $aliasTruncationRefusalCount = 1 } else { throw } }
  if ($aliasTruncationRefusalCount -ne 1) { throw 'SELF_TEST_REFUSED' }

  $jsonShapeRefusalCount = 0
  foreach ($shapeCase in @(
    @{ Code='VERCEL_JSON_REFUSED'; Run={ [void](Get-JsonRows -Json ([pscustomobject]@{ envs=@(); extra='refuse' }) -ContainerName 'envs' -AllowedTopLevelFields @('envs') -RequiredTopLevelFields @('envs')) } },
    @{ Code='VERCEL_JSON_REFUSED'; Run={ [void](ConvertTo-EnvironmentProjection -Rows @([pscustomobject]@{ key='SMTP_HOST'; type='encrypted'; target=@('production'); extra='refuse' })) } },
    @{ Code='ALIAS_PROJECTION_REFUSED'; Run={ [void](ConvertTo-AliasProjection -Rows @([pscustomobject]@{ alias='www.precisionperformance.com.au'; deploymentId=$acceptedDeployment; extra='refuse' })) } },
    @{ Code='VERCEL_JSON_REFUSED'; Run={ [void](ConvertTo-DeploymentListProjection -Rows @([pscustomobject]@{ id='dpl_synthetic'; state='READY'; target='production'; extra='refuse' })) } },
    @{ Code='DEPLOYMENT_REFUSED'; Run={ [void](ConvertTo-DeploymentProjection -Value ([pscustomobject]@{ id=$acceptedDeployment; name='synthetic'; url='synthetic.example'; target='production'; readyState='READY'; extra='refuse' }) -DeploymentId $acceptedDeployment) } },
    @{ Code='DEPLOYMENT_REFUSED'; Run={ [void](ConvertTo-DeployResultProjection -Value ([pscustomobject]@{ id='dpl_synthetic'; url='https://synthetic.example'; inspectorUrl=$null; readyState='READY'; target='production'; deploymentApiUrl='https://api.vercel.com/v13/deployments/dpl_synthetic'; extra='refuse' })) } }
  )) {
    $didRefuse = $false
    try { & $shapeCase.Run } catch { if ($_.Exception.Message -ceq $shapeCase.Code) { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $jsonShapeRefusalCount += 1
  }

  $deploymentTargetRefusalCount = 0
  foreach ($targetCase in @(
    { [void](ConvertTo-DeploymentProjection -Value ([pscustomobject]@{ id=$acceptedDeployment; name='synthetic'; url='synthetic.example'; target='staging'; readyState='READY' }) -DeploymentId $acceptedDeployment) },
    { [void](ConvertTo-DeploymentListProjection -Rows @([pscustomobject]@{ id='dpl_synthetic'; state='READY'; target='staging' })) },
    { [void](ConvertTo-DeployResultProjection -Value ([pscustomobject]@{ id='dpl_synthetic'; url='https://synthetic.example'; inspectorUrl=$null; readyState='READY'; target='preview'; deploymentApiUrl='https://api.vercel.com/v13/deployments/dpl_synthetic' })) }
  )) {
    $didRefuse = $false
    try { & $targetCase } catch { if ($_.Exception.Message -ceq 'DEPLOYMENT_REFUSED') { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $deploymentTargetRefusalCount += 1
  }

  $baselineFixturePassCount = 0
  $baselineFailureFixtureCount = 0
  $baseEnvironment = [pscustomobject]@{ Dedicated=0; Temporary=0; Generic=5 }
  $baseAliases = [pscustomobject]@{ AliasCount=5; ExpectedAcceptedCount=5; AcceptedCount=5; Inert029NAliasCount=0; Inert029OAliasCount=0; RetainedPreviewAliasCount=0 }
  $baseAccepted = [pscustomobject]@{ TargetClass='production'; ReadinessClass='ready' }
  $basePreview = [pscustomobject]@{ TargetClass='preview'; ReadinessClass='ready' }
  if (Assert-BaselineProjection -Environment $baseEnvironment -CredentialPresent $false -SprintDeploymentCount 0 -AliasProjection $baseAliases -AcceptedDeploymentProjection $baseAccepted -PreviewDeploymentProjection $basePreview) { $baselineFixturePassCount = 1 }
  foreach ($failureCode in $baselineFailureCodes) {
    $environmentFixture = [pscustomobject]@{ Dedicated=0; Temporary=0; Generic=5 }
    $credentialFixture = $false
    $deploymentCountFixture = 0
    $aliasesFixture = [pscustomobject]@{ AliasCount=5; ExpectedAcceptedCount=5; AcceptedCount=5; Inert029NAliasCount=0; Inert029OAliasCount=0; RetainedPreviewAliasCount=0 }
    $acceptedFixture = [pscustomobject]@{ TargetClass='production'; ReadinessClass='ready' }
    $previewFixture = [pscustomobject]@{ TargetClass='preview'; ReadinessClass='ready' }
    switch -CaseSensitive ($failureCode) {
      'BASELINE_ENVIRONMENT_REFUSED' { $environmentFixture.Generic = 4 }
      'BASELINE_CREDENTIAL_REFUSED' { $credentialFixture = $true }
      'BASELINE_029T_DEPLOYMENT_REFUSED' { $deploymentCountFixture = 1 }
      'BASELINE_EXPECTED_ALIAS_INVENTORY_REFUSED' { $aliasesFixture.ExpectedAcceptedCount = 4 }
      'BASELINE_ACCEPTED_DEPLOYMENT_REFUSED' { $acceptedFixture.TargetClass = 'preview' }
      'BASELINE_029N_ALIAS_REFUSED' { $aliasesFixture.Inert029NAliasCount = 1 }
      'BASELINE_029O_ALIAS_REFUSED' { $aliasesFixture.Inert029OAliasCount = 1 }
      'BASELINE_RETAINED_PREVIEW_REFUSED' { $previewFixture.TargetClass = 'production' }
      default { throw 'SELF_TEST_REFUSED' }
    }
    $didRefuse = $false
    try {
      [void](Assert-BaselineProjection -Environment $environmentFixture -CredentialPresent $credentialFixture -SprintDeploymentCount $deploymentCountFixture -AliasProjection $aliasesFixture -AcceptedDeploymentProjection $acceptedFixture -PreviewDeploymentProjection $previewFixture)
    } catch { if ($_.Exception.Message -ceq $failureCode) { $didRefuse = $true } else { throw } }
    if (-not $didRefuse) { throw 'SELF_TEST_REFUSED' }
    $baselineFailureFixtureCount += 1
  }
  if ($baselineFixturePassCount -ne 1 -or $baselineFailureFixtureCount -ne $baselineFailureCodes.Count) { throw 'SELF_TEST_REFUSED' }

  $refused = @(
    @(),
    @('deploy'),
    @('env','ls','production'),
    @('env','ls','--format','json','production','--no-color'),
    @('env','ls','production','--format','json','--no-color','--no-color'),
    @('env','ls','preview','--format','json','--no-color'),
    @('deploy','--prod','--skip-domain','--yes','--format','json','--no-color','--meta','pp_sprint=029T','--force'),
    @('deploy','--prod','--yes','--format','json','--no-color','--meta','pp_sprint=029T'),
    @('inspect','dpl_synthetic','--format','json','--no-color'),
    @('list','--meta','pp_sprint=other','--format','json','--no-color'),
    @('env','add','PUBLIC_ENQUIRY_SMTP_PASS','production','--sensitive','--yes','--no-color'),
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
  [pscustomobject]@{controller='029T';operation='self-test';state='pass';allowedVectorCount=$allowed.Count;refusedVectorCount=$refused.Count;lostArgsCount=0;safeArgsCount=4;processTransferArgCount=4;processTransferState='pass';genericProductionIncludingCount=$genericProjection.Generic;ownedScopeRefusalCount=$ownedScopeRefusalCount;aliasInventoryFixtureCount=$aliasFixtureProjection.AliasCount;aliasTruncationRefusalCount=$aliasTruncationRefusalCount;jsonShapeRefusalCount=$jsonShapeRefusalCount;deploymentTargetRefusalCount=$deploymentTargetRefusalCount;baselineFixturePassCount=$baselineFixturePassCount;baselineFailureCodeCount=$baselineFailureFixtureCount;runnerResidue=0} | ConvertTo-Json -Compress
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
  '{"controller":"029T","operation":"credential-self-test","state":"pass","credentialResidue":0}'
  exit 0
}

if ($Operation -eq 'Baseline') {
  try { $environment = Get-EnvironmentProjection } catch { Stop-BaselineFailure 'BASELINE_ENVIRONMENT_REFUSED' }
  try { $credentialPresent = Test-FixedCredential $liveTarget } catch { Stop-BaselineFailure 'BASELINE_CREDENTIAL_REFUSED' }
  try { $sprintDeployments = Get-DeploymentListProjection } catch { Stop-BaselineFailure 'BASELINE_029T_DEPLOYMENT_REFUSED' }
  try { $aliasesProjection = Get-AliasProjection } catch { Stop-BaselineFailure 'BASELINE_EXPECTED_ALIAS_INVENTORY_REFUSED' }
  try { $accepted = Get-DeploymentProjection $acceptedDeployment } catch { Stop-BaselineFailure 'BASELINE_ACCEPTED_DEPLOYMENT_REFUSED' }
  try { $preview = Get-DeploymentProjection $inert029SPreview } catch { Stop-BaselineFailure 'BASELINE_RETAINED_PREVIEW_REFUSED' }
  [void](Assert-BaselineProjection -Environment $environment -CredentialPresent $credentialPresent -SprintDeploymentCount $sprintDeployments.Count -AliasProjection $aliasesProjection -AcceptedDeploymentProjection $accepted -PreviewDeploymentProjection $preview)
  [pscustomobject]@{controller='029T';operation='baseline';state='pass';projectClass='exact';dedicatedSmtpRowCount=0;temporaryAuthRowCount=0;genericSmtpRowCount=5;credentialState='absent';sprintDeploymentCount=0;retainedPreviewClass='ready-preview-inert';retainedPreviewAliasCount=0;priorCandidateCount=2;priorCandidateAliasCount=0;acceptedDeploymentClass='ready';acceptedAliasTargetCount=5} | ConvertTo-Json -Compress
  exit 0
}

if ($Operation -eq 'AddStructuralSmtp') {
  $environment = Get-EnvironmentProjection
  if ($environment.Dedicated -ne 1 -or $environment.Temporary -ne 0 -or
    'PUBLIC_ENQUIRY_SMTP_PASS' -cnotin $environment.Names -or
    @($structuralNames | Where-Object { $_ -cin $environment.Names }).Count -ne 0) { throw 'BASELINE_REFUSED' }
  $created = New-Object System.Collections.Generic.List[string]
  try {
    foreach ($name in $structuralNames) { Add-RemoteValue $name $structuralValues[$name]; $created.Add($name) }
    $after = Get-EnvironmentProjection
    if ($after.Dedicated -ne 4 -or $after.Temporary -ne 0 -or $after.Generic -ne 5) { throw 'CONFIGURATION_REFUSED' }
  } catch {
    foreach ($name in $created) { try { Remove-RemoteValue $name } catch {} }
    throw
  }
  '{"controller":"029T","operation":"add-structural-smtp","state":"pass","dedicatedSmtpRowCount":4,"temporaryAuthRowCount":0}'
  exit 0
}

if ($Operation -eq 'Provision') {
  if (Test-FixedCredential $liveTarget) { throw 'CREDENTIAL_TARGET_EXISTS' }
  $environment = Get-EnvironmentProjection
  if ($environment.Dedicated -ne 4 -or $environment.Temporary -ne 0 -or $environment.Generic -ne 5) { throw 'BASELINE_REFUSED' }
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
    $record = [ordered]@{version=1;runId=[guid]::NewGuid().ToString('N');bearer=$bearer;verifier=$verifier;notBefore=(Format-CanonicalUtc $notBefore);expiresAt=(Format-CanonicalUtc $expiresAt);remoteNames=$temporaryNames;deploymentId=$null}
    Set-FixedCredential $liveTarget ($record | ConvertTo-Json -Compress)
    Add-RemoteValue $temporaryNames[0] $record.verifier; $created.Add($temporaryNames[0])
    Add-RemoteValue $temporaryNames[1] $record.notBefore; $created.Add($temporaryNames[1])
    Add-RemoteValue $temporaryNames[2] $record.expiresAt; $created.Add($temporaryNames[2])
    $after = Get-EnvironmentProjection
    if ($after.Dedicated -ne 4 -or $after.Temporary -ne 3) { throw 'CONFIGURATION_REFUSED' }
    '{"controller":"029T","operation":"provision","state":"pass","bindingCount":3,"windowClass":"bounded","credentialState":"present"}'
  } catch {
    foreach ($name in $created) { try { Remove-RemoteValue $name } catch {} }
    Remove-FixedCredential $liveTarget
    throw
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
    if ($environment.Dedicated -ne 4 -or $environment.Temporary -ne 3 -or (Get-DeploymentListProjection).Count -ne 0) { throw 'BASELINE_REFUSED' }
    $deployed = Invoke-VercelCaptured -CommandArgs @('deploy','--prod','--skip-domain','--yes','--format','json','--no-color','--meta','pp_sprint=029T')
    $deployProjection = ConvertTo-DeployResultProjection -Value $deployed.Json
    $id = $deployProjection.DeploymentId
    $script:OwnedDeploymentId = $id
    $inspection = Get-DeploymentProjection $id
    if ($inspection.TargetClass -ne 'production' -or $inspection.ReadinessClass -ne 'ready' -or $inspection.AliasCount -ne 0 -or
      $inspection.MetadataClass -ne 'exact-029T' -or $inspection.SourceClass -ne 'exact-canonical') { throw 'DEPLOYMENT_REFUSED' }
    $record.deploymentId = $id
    Set-FixedCredential $liveTarget ($record | ConvertTo-Json -Compress) $true
    [pscustomobject]@{controller='029T';operation='deploy';state='pass';deploymentId=$id;targetClass='production';readinessClass='ready';aliasCount=0;metadataClass='exact-029T';sourceClass='exact-canonical'} | ConvertTo-Json -Compress
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
    if ($candidate.TargetClass -ne 'production' -or $candidate.MetadataClass -ne 'exact-029T') { throw 'DEPLOYMENT_REFUSED' }
    $candidateClass = $candidate.ReadinessClass
    $candidateAliasCount = $candidate.AliasCount
  } elseif ($deploymentIds.Count -gt 1) { throw 'DEPLOYMENT_REFUSED' }
  [pscustomobject]@{controller='029T';operation='status';state='pass';dedicatedSmtpRowCount=$environment.Dedicated;temporaryAuthRowCount=$environment.Temporary;genericSmtpRowCount=$environment.Generic;credentialState=$(if(Test-FixedCredential $liveTarget){'present'}else{'absent'});sprintDeploymentCount=$deploymentIds.Count;candidateClass=$candidateClass;candidateAliasCount=$candidateAliasCount;acceptedAliasTargetCount=$aliasesProjection.AcceptedCount} | ConvertTo-Json -Compress
  exit 0
}

if ($Operation -eq 'Compensate') {
  if (Test-FixedCredential $liveTarget) {
    $record = Read-LiveRecord
    try { foreach ($name in $record.remoteNames) { Remove-RemoteValue $name } } finally { if($record){$record.bearer=$null;$record.verifier=$null};Remove-FixedCredential $liveTarget }
  }
  $environment = Get-EnvironmentProjection
  foreach ($name in $dedicatedNames) { if ($name -cin $environment.Names) { Remove-RemoteValue $name } }
  $after = Get-EnvironmentProjection
  if ($after.Dedicated -ne 0 -or $after.Temporary -ne 0 -or (Test-FixedCredential $liveTarget)) { throw 'CLEANUP_REFUSED' }
  '{"controller":"029T","operation":"compensate","state":"pass","bindingResidue":0,"credentialResidue":0}'
  exit 0
}

$record = Read-LiveRecord
try {
  if ($Operation -eq 'VerifyReady') {
    $candidateOrigin = Assert-Origin $Origin
    if (-not $record.deploymentId) { throw 'DEPLOYMENT_REFUSED' }
    $current = [DateTime]::UtcNow
    if ($current -lt [DateTime]::Parse($record.notBefore).ToUniversalTime() -or
      $current -ge [DateTime]::Parse($record.expiresAt).ToUniversalTime()) { throw 'WINDOW_REFUSED' }
    $result = Invoke-Candidate $candidateOrigin $record.bearer
    if ($result.StatusCode -ne 200) { throw 'PREFLIGHT_REFUSED' }
    try { $value = $result.Body | ConvertFrom-Json } catch { throw 'PREFLIGHT_REFUSED' }
    if ($value.result -cne 'smtp-preflight' -or $value.status -cne 'ready' -or
      $value.providerClass -cne 'resend' -or $null -ne $value.errorClass) { throw 'PREFLIGHT_REFUSED' }
    '{"controller":"029T","operation":"verify-ready","state":"pass","requestCount":1,"providerClass":"resend","errorClass":null}'
  } elseif ($Operation -eq 'VerifyExpiredAndCleanup') {
    $candidateOrigin = Assert-Origin $Origin
    if ([DateTime]::UtcNow -lt [DateTime]::Parse($record.expiresAt).ToUniversalTime()) { throw 'EXPIRY_NOT_REACHED' }
    $result = Invoke-Candidate $candidateOrigin $record.bearer
    if ($result.StatusCode -ne 404) { throw 'EXPIRED_DENIAL_REFUSED' }
    Remove-TemporaryResources $record
    '{"controller":"029T","operation":"expired-denial-cleanup","state":"pass","requestCount":1,"httpClass":"not-found","bindingResidue":0,"credentialResidue":0}'
  }
} finally {
  if($record){$record.bearer=$null;$record.verifier=$null};$result=$null;$value=$null;$record=$null
}
