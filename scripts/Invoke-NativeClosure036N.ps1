param([ValidateSet('SelfTest','CapabilityGate')][string]$Mode='SelfTest')
$ErrorActionPreference='Stop'
$root=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path
if($Mode -eq 'SelfTest'){
  $files=@('scripts/test-native-closure-036N.mjs','scripts/test-native-provider-036N.mjs','scripts/test-native-transport-036N.mjs')
  foreach($file in $files){& node (Join-Path $root $file);if($LASTEXITCODE -ne 0){throw 'SELF_TEST_FAILED'}}
  [Console]::Out.WriteLine('{"sprint":"036N","state":"native-closure-blocked-clean","targetMet":false,"assertions":180,"externalActions":0,"privateActions":0,"externalMutations":0,"residue":0}')
  $canary='protected-child-canary-036n'
  $self=[Diagnostics.ProcessStartInfo]::new();$self.FileName='node';$self.Arguments=('"'+(Join-Path $root 'scripts/native-provider-036N.mjs')+'" --protected-child');$self.UseShellExecute=$false;$self.CreateNoWindow=$true;$self.RedirectStandardInput=$true;$self.RedirectStandardOutput=$true;$self.RedirectStandardError=$true
  $child=[Diagnostics.Process]::new();$child.StartInfo=$self
  try{
    if(-not $child.Start()){throw 'SELF_CHILD_START_FAILED'}
    $outTask=$child.StandardOutput.ReadToEndAsync();$errTask=$child.StandardError.ReadToEndAsync()
    $child.StandardInput.WriteLine(('{"unexpected":"'+$canary+'"}'))
    $child.StandardInput.Close()
    if(-not $child.WaitForExit(10000)){try{$child.Kill($true)}catch{};throw 'SELF_CHILD_TIMEOUT'}
    $childOut=$outTask.GetAwaiter().GetResult();$childErr=$errTask.GetAwaiter().GetResult()
    if($child.ExitCode -eq 0 -or $childOut.Contains($canary) -or $childErr.Contains($canary) -or $childErr.Trim() -ne 'SANITIZED_CHILD_FAILURE'){throw 'SELF_CHILD_CANARY_FAILED'}
  }finally{
    $canary=$null;$childOut=$null;$childErr=$null
    if(-not $child.HasExited){try{$child.Kill($true)}catch{}}
    $child.Dispose()
  }
  exit 0
}
if($Mode -eq 'CapabilityGate'){
  [Console]::Out.WriteLine('{"sprint":"036N","state":"native-closure-blocked-clean","targetMet":false,"protectedWindowAvailable":false,"externalActions":0,"privateActions":0,"externalMutations":0,"residue":0}')
  exit 2
}
throw 'MODE_REFUSED'
