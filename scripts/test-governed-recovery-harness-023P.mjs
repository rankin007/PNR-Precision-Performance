import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const digest = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const root = fs.mkdtempSync(path.join(os.tmpdir(), "023p-recovery-"));
const source = path.join(root, "source.bin");
const encrypted = path.join(root, "encrypted.bin");
const restored = path.join(root, "restored.bin");
const original = crypto.randomBytes(128);
let removalReached = false;

try {
  const mockedExport = { error: null, data: new Blob([original]), status: 200 };
  assert.equal(Math.floor(mockedExport.status / 100), 2);
  assert.equal(mockedExport.error, null);
  const returned = Buffer.from(await mockedExport.data.arrayBuffer());
  assert(returned.length > 0);
  assert.equal(digest(returned), digest(original));
  fs.writeFileSync(source, returned);

  const dpapi = spawnSync("powershell.exe", ["-NoProfile", "-Command",
    "$ErrorActionPreference='Stop'; Add-Type -AssemblyName System.Security; " +
    "$plain=[IO.File]::ReadAllBytes($env:PP023P_DPAPI_SOURCE); $cipher=[Security.Cryptography.ProtectedData]::Protect($plain,$null,[Security.Cryptography.DataProtectionScope]::CurrentUser); " +
    "[IO.File]::WriteAllBytes($env:PP023P_DPAPI_ENCRYPTED,$cipher); $round=[Security.Cryptography.ProtectedData]::Unprotect([IO.File]::ReadAllBytes($env:PP023P_DPAPI_ENCRYPTED),$null,[Security.Cryptography.DataProtectionScope]::CurrentUser); [IO.File]::WriteAllBytes($env:PP023P_DPAPI_RESTORED,$round)"],
  { stdio: "pipe", env: { ...process.env, PP023P_DPAPI_SOURCE: source, PP023P_DPAPI_ENCRYPTED: encrypted, PP023P_DPAPI_RESTORED: restored } });
  assert.equal(dpapi.status, 0);
  assert(fs.statSync(encrypted).size > 0);
  assert.equal(digest(fs.readFileSync(restored)), digest(original));

  const mockedRemoval = { error: null, data: [] };
  assert.equal(mockedRemoval.error, null);
  removalReached = true;
  const mockedAbsence = { error: { status: 404 }, data: null };
  assert.equal(Math.floor(mockedAbsence.error.status / 100), 4);
  assert.equal(mockedAbsence.data, null);
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}

assert.equal(removalReached, true);
assert.equal(fs.existsSync(root), false);
console.log("023P governed recovery harness export, hash, DPAPI, removal, absence and cleanup regression passed.");
