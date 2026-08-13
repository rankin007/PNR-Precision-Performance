import { strict as assert } from "node:assert";
import { spawn, spawnSync } from "node:child_process";
import { Reader036PError, createAuthorityHandle, createReadSession, sanitizeProjection, closeReadSession, beforeRequest } from "./provider-authority-reader-036P.mjs";

let count = 0;
const equal = (actual, expected) => { assert.deepEqual(actual, expected); count += 1; };
const ok = (value) => { assert.ok(value); count += 1; };
const refuses = (operation, code) => { assert.throws(operation, (error) => error instanceof Reader036PError && error.code === code); count += 1; };

const expected = {
  vercelTeamId: "team_exact", vercelProjectId: "project_exact", supabaseProjectRef: "projectrefexact",
  resendTeamId: "resend_team", stripeAccountId: "acct_exact", stripeLiveMode: true,
  railwayTokenType: "project", railwayAccountId: "rail_account", railwayWorkspaceId: "rail_workspace",
  railwayProjectId: "rail_project", railwayEnvironmentId: "rail_environment",
};

const authority = createAuthorityHandle(expected);
const session = createReadSession(authority, ["transport-canary-secret"]);
ok(Object.keys(authority).join() === "snapshot" && Object.keys(session).join() === "snapshot" && Object.isFrozen(authority) && Object.isFrozen(session) && authority.vercelTeamId === undefined && session.captured === undefined);

refuses(() => sanitizeProjection(session, { arbitrary: "transport-canary-secret" }), "TAINT_REFUSED");
ok(sanitizeProjection(session, { provider: "resend", teamBound: false, rows: 0 }));
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
ok(capabilityBody.providerReads === 0 && capabilityBody.writes === 0 && capabilityBody.mutations === 0 && capabilityBody.residue === 0);
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
const oversized = await child(JSON.stringify({ mode: "capability", pad: "x".repeat(65536) }) + "\n");
equal(oversized.exitCode, 1);
equal(oversized.stdout, "");
equal(oversized.stderr.trim(), "SANITIZED_CHILD_FAILURE");

const wrapper = "scripts/Invoke-ProviderAuthorityReadback036P.ps1";
const run = (mode) => spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", wrapper, "-Mode", mode], { encoding: "utf8", windowsHide: true });
const capabilityRun = run("CapabilityGate");
equal(capabilityRun.status, 2);
const wrapperBody = JSON.parse(capabilityRun.stdout.trim());
equal(wrapperBody.state, "protected-authority-required");
ok(wrapperBody.providerReads === 0 && wrapperBody.writes === 0 && wrapperBody.mutations === 0 && wrapperBody.residue === 0);
ok(!capabilityRun.stdout.includes("transport-canary-secret") && !capabilityRun.stderr.includes("transport-canary-secret"));
const protectedRedirected = run("ProtectedReadOnly");
ok(protectedRedirected.status !== 0);
ok(protectedRedirected.stdout === "");
ok(/VISIBLE_CONSOLE_REQUIRED/.test(protectedRedirected.stderr));
ok(!protectedRedirected.stderr.includes("transport-canary-secret"));

const invalidMode = spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", wrapper, "-Mode", "Mutation"], { encoding: "utf8", windowsHide: true });
ok(invalidMode.status !== 0);
ok(/ValidateSet/.test(invalidMode.stderr));
ok(!Object.values(process.env).includes("transport-canary-secret") && !process.argv.join(" ").includes("transport-canary-secret"));
equal(capabilityBody.writes, 0);
equal(capabilityBody.mutations, 0);
equal(capabilityBody.residue, 0);
ok(capabilityBody.complete === false && !capability.stdout.includes("landing-preview"));

assert.equal(count, 40);
console.log(`provider-authority-transport-036P ${count}/40 PASS`);
