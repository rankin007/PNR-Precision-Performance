[CmdletBinding()]
param([Parameter(Mandatory)][ValidateSet('WriteClient','WriteRefresh','ReadClient','ReadRefresh','DeleteClient','DeleteRefresh','SelfTest')][string]$Operation)
$ErrorActionPreference='Stop'
$targets=@{Client='PrecisionPerformance/035I/DesktopClient';Refresh='PrecisionPerformance/035I/RefreshToken';Test='PrecisionPerformance/035I/SyntheticTest'}
Add-Type -TypeDefinition @'
using System; using System.Runtime.InteropServices;
public static class PP035ICredential {
 [StructLayout(LayoutKind.Sequential,CharSet=CharSet.Unicode)] public struct CREDENTIAL { public UInt32 Flags; public UInt32 Type; public string TargetName; public string Comment; public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten; public UInt32 CredentialBlobSize; public IntPtr CredentialBlob; public UInt32 Persist; public UInt32 AttributeCount; public IntPtr Attributes; public string TargetAlias; public string UserName; }
 [DllImport("advapi32",EntryPoint="CredWriteW",CharSet=CharSet.Unicode,SetLastError=true)] public static extern bool Write(ref CREDENTIAL c,UInt32 f);
 [DllImport("advapi32",EntryPoint="CredReadW",CharSet=CharSet.Unicode,SetLastError=true)] public static extern bool Read(string t,UInt32 type,UInt32 f,out IntPtr p);
 [DllImport("advapi32",EntryPoint="CredDeleteW",CharSet=CharSet.Unicode,SetLastError=true)] public static extern bool Delete(string t,UInt32 type,UInt32 f);
 [DllImport("advapi32",SetLastError=true)] public static extern void CredFree(IntPtr p);
}
'@
function Write-Fixed([string]$Target,[Security.SecureString]$Secret){$b=[Runtime.InteropServices.Marshal]::SecureStringToGlobalAllocUnicode($Secret);try{$c=New-Object PP035ICredential+CREDENTIAL;$c.Type=1;$c.TargetName=$Target;$c.Persist=2;$c.CredentialBlob=$b;$c.CredentialBlobSize=$Secret.Length*2;$c.UserName='current-user';if(-not [PP035ICredential]::Write([ref]$c,0)){throw 'CREDENTIAL_WRITE_REFUSED'}}finally{[Runtime.InteropServices.Marshal]::ZeroFreeGlobalAllocUnicode($b)}}
function Read-Fixed([string]$Target){$p=[IntPtr]::Zero;if(-not [PP035ICredential]::Read($Target,1,0,[ref]$p)){throw 'CREDENTIAL_ABSENT'};try{$c=[Runtime.InteropServices.Marshal]::PtrToStructure($p,[type][PP035ICredential+CREDENTIAL]);$chars=[int]($c.CredentialBlobSize/2);$secure=New-Object Security.SecureString;for($i=0;$i -lt $chars;$i++){$secure.AppendChar([char][Runtime.InteropServices.Marshal]::ReadInt16($c.CredentialBlob,$i*2))};$secure.MakeReadOnly();return $secure}finally{[PP035ICredential]::CredFree($p)}}
function Delete-Fixed([string]$Target){if(-not [PP035ICredential]::Delete($Target,1,0)){if([Runtime.InteropServices.Marshal]::GetLastWin32Error()-ne 1168){throw 'CREDENTIAL_DELETE_REFUSED'}}}
if($Operation -eq 'SelfTest'){$s=ConvertTo-SecureString 'synthetic-fixture-only' -AsPlainText -Force;Write-Fixed $targets.Test $s;$r=Read-Fixed $targets.Test;if($r.Length-ne 22){throw 'CREDENTIAL_ROUNDTRIP_REFUSED'};Delete-Fixed $targets.Test;'credential-manager-self-test=pass';exit 0}
$kind=if($Operation -match 'Client$'){'Client'}else{'Refresh'};$target=$targets[$kind]
if($Operation -match '^Write'){Write-Fixed $target (Read-Host 'Protected value' -AsSecureString);'credential-write=pass'}elseif($Operation -match '^Read'){[void](Read-Fixed $target);'credential-read=pass'}else{Delete-Fixed $target;'credential-delete=pass'}
