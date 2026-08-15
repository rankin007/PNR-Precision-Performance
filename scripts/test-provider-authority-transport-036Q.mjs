import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import { Reader036PError, createAuthorityHandle, createReadSession, sanitizeProjection, closeReadSession, beforeRequest } from "./provider-authority-reader-036P.mjs";

let count = 0;
const ok = (value) => { assert.ok(value); count += 1; };
const equal = (actual, expected) => { assert.deepEqual(actual, expected); count += 1; };
const refuses = (operation, code) => { assert.throws(operation, (error) => error instanceof Reader036PError && error.code === code); count += 1; };

const wrapper = "scripts/Invoke-ProviderAuthorityCompletion036Q.ps1";
const source = readFileSync(wrapper, "utf8");
ok(source.includes("RedirectStandardInput = $true") && source.includes("RedirectStandardOutput = $true") && source.includes("RedirectStandardError = $true") && source.includes("provider-authority-reader-036P.mjs") && source.includes("--protected-child"));
ok(!source.includes("Start-Transcript") && !source.includes("Set-Clipboard") && !source.includes("Get-Clipboard"));
ok(source.includes("Read-Host \"$provider management credential\" -AsSecureString") && source.includes("ZeroFreeBSTR"));
ok(source.includes("Global\\PrecisionPerformance-036Q-ProtectedReadOnly") && source.includes("WaitForExit(30000)") && source.includes("$process.Kill()"));
ok(source.includes("SANITIZED_CHILD_FAILURE") && source.includes("VISIBLE_CONSOLE_REQUIRED") && source.includes("FRESH_NONTRANSCRIBED_WINDOW_REQUIRED"));
ok(source.includes("$providers = @('vercel','supabase','resend','stripe','railway')") && source.includes("$process.StandardInput.WriteLine($frame)") && source.includes("$process.StandardInput.Flush()"));

const expected = {
  vercelTeamId: "team_exact", vercelProjectId: "project_exact", supabaseProjectRef: "projectrefexact",
  resendTeamId: "resend_team", stripeAccountId: "acct_exact", stripeLiveMode: true,
  railwayTokenType: "project", railwayAccountId: "rail_account", railwayWorkspaceId: "rail_workspace",
  railwayProjectId: "rail_project", railwayEnvironmentId: "rail_environment",
};
const authority = createAuthorityHandle(expected);
const session = createReadSession(authority, ["transport-canary-secret"]);
ok(Object.isFrozen(authority) && Object.isFrozen(session));
ok(authority.vercelTeamId === undefined && session.captured === undefined);
refuses(() => sanitizeProjection(session, { arbitrary: "transport-canary-secret" }), "TAINT_REFUSED");
ok(sanitizeProjection(session, { provider: "resend", exactBinding: false, rows: 0 }));
equal(beforeRequest(session), 1);
equal(closeReadSession(session).closed, true);
refuses(() => beforeRequest(session), "SESSION_REFUSED");

async function child(input) {
  const childProcess = spawn(process.execPath, ["scripts/provider-authority-reader-036P.mjs", "--protected-child"], { stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
  let stdout = "";
  let stderr = "";
  childProcess.stdout.on("data", (chunk) => { stdout += chunk; });
  childProcess.stderr.on("data", (chunk) => { stderr += chunk; });
  childProcess.stdin.end(input);
  const exitCode = await new Promise((resolve) => childProcess.on("close", resolve));
  return { exitCode, stdout, stderr };
}

const capability = await child('{"mode":"capability"}\n');
equal(capability.exitCode, 0);
equal(capability.stderr, "");
equal(capability.stdout.trim().split(/\r?\n/).length, 1);
const capabilityBody = JSON.parse(capability.stdout);
equal(capabilityBody.state, "protected-provider-authority-readback-blocked-clean");
ok(capabilityBody.complete === false && capabilityBody.providerReads === 0 && capabilityBody.writes === 0 && capabilityBody.mutations === 0 && capabilityBody.residue === 0);
ok(!capability.stdout.includes("transport-canary-secret"));
const handshakeEof = await child('{"id":1,"mode":"protected-read"}\n');
equal(handshakeEof.exitCode, 1);
const handshakeLines = handshakeEof.stdout.trim().split(/\r?\n/).map(JSON.parse);
equal(handshakeLines[0], { id: 1, state: "need-authority", provider: "vercel" });
equal(handshakeEof.stderr.trim(), "SANITIZED_CHILD_FAILURE");
ok(!handshakeEof.stdout.includes("transport-canary-secret") && !handshakeEof.stderr.includes("transport-canary-secret"));
const malformed = await child('{"mode":');
equal(malformed.exitCode, 1);
equal(malformed.stdout, "");
equal(malformed.stderr.trim(), "SANITIZED_CHILD_FAILURE");
const unknown = await child('{"mode":"mutation"}\n');
equal(unknown.exitCode, 1);
equal(unknown.stdout, "");
equal(unknown.stderr.trim(), "SANITIZED_CHILD_FAILURE");

const run = (mode) => spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", wrapper, "-Mode", mode], { encoding: "utf8", windowsHide: true });
const capabilityRun = run("CapabilityGate");
ok([0, 2].includes(capabilityRun.status));
equal(capabilityRun.stderr, "");
const wrapperBody = JSON.parse(capabilityRun.stdout.trim());
ok(wrapperBody.providerReads === 0 && wrapperBody.writes === 0 && wrapperBody.mutations === 0 && wrapperBody.residue === 0);
ok(!capabilityRun.stdout.includes("transport-canary-secret"));
const protectedRedirected = run("ProtectedReadOnly");
ok(protectedRedirected.status !== 0);
equal(protectedRedirected.stdout, "");
ok(/VISIBLE_CONSOLE_REQUIRED/.test(protectedRedirected.stderr));
ok(!protectedRedirected.stderr.includes("transport-canary-secret"));
const invalidMode = spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", wrapper, "-Mode", "Mutation"], { encoding: "utf8", windowsHide: true });
ok(invalidMode.status !== 0 && /ValidateSet/.test(invalidMode.stderr));
ok(!Object.values(process.env).includes("transport-canary-secret") && !process.argv.join(" ").includes("transport-canary-secret"));
ok(!source.includes("$env:") && !source.includes("EnvironmentVariables"));

assert.equal(count, 40);
console.log(`provider-authority-transport-036Q ${count}/40 PASS`);
