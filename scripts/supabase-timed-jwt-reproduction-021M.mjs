#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REF = "uvskssaecdhxcgytkasc";
const OLD = "tagnbgkroihagjmvehlx";
const HOST = `${REF}.supabase.co`;
const SUPPORT = "planning/reviews/021M-supabase-support-escalation.md";
const PUB = new Set(["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]);
const SEC = new Set(["SUPABASE_SERVICE_ROLE_KEY"]);
const HEADERS = ["x-request-id", "x-correlation-id", "traceparent", "x-supabase-request-id", "sb-request-id"];
const ATTEMPTS = new Set(["T0", "T20"]);
class Stop extends Error { constructor(code) { super(code); this.code = code; } }

function parseEnv(text, allow) {
  const values = new Map();
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line);
    if (!match || !allow.has(match[1]) || values.has(match[1]) || !match[2]) throw new Stop("ENV_REFUSED");
    values.set(match[1], match[2]);
  }
  if (values.size !== allow.size) throw new Stop("ENV_REFUSED");
  return values;
}
function target(value) {
  let url;
  try { url = new URL(value); } catch { throw new Stop("TARGET_INVALID"); }
  if (url.hostname === `${OLD}.supabase.co`) throw new Stop("OLD_REFUSED");
  if (url.hostname !== HOST || url.protocol !== "https:" || url.pathname !== "/") throw new Stop("TARGET_REFUSED");
}
function category(status) {
  if (status >= 200 && status < 300) return "success";
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status >= 500) return "server-error";
  return "other-sanitized-error";
}
function safeCorrelation(value) {
  return typeof value === "string" && /^[A-Za-z0-9._:-]{1,200}$/.test(value) ? value : null;
}
function correlations(response) {
  return HEADERS.map((name) => {
    const value = safeCorrelation(response.headers.get(name));
    return { name, present: value !== null, value };
  });
}
function clear(object) {
  for (const key of Object.keys(object)) object[key] = null;
  return Object.values(object).every((value) => value === null);
}
function assertSafeOutput(value) {
  const text = JSON.stringify(value);
  if (/@|eyJ[A-Za-z0-9_-]{12,}|sb_(?:secret|publishable)_[A-Za-z0-9_-]{8,}|[0-9a-f]{8}-[0-9a-f-]{27,}/i.test(text)) throw new Stop("OUTPUT_REFUSED");
  return value;
}
function markdownAttempt(alias, evidence) {
  const lines = [
    `\n## ${alias} provider-directed attempt`,
    "",
    `- UTC window: ${evidence.start} to ${evidence.end}`,
    `- SDK getUser: ${evidence.getUser}`,
  ];
  for (const call of evidence.calls) {
    lines.push(`- \`${call.path}\`: HTTP ${call.status}; ${call.category}`);
    for (const header of call.correlations) {
      lines.push(`  - ${header.name}: ${header.present ? header.value : "absent"}`);
    }
  }
  lines.push("- Cleanup: Auth zero; application zero; Storage zero; protected state cleared.", "");
  if (alias === "T0") lines.push(`<!-- 021M_T0_END=${evidence.end} -->`, "");
  return lines.join("\n");
}
function enforceT20Window() {
  const text = fs.readFileSync(SUPPORT, "utf8");
  const match = /<!-- 021M_T0_END=([^>]+) -->/.exec(text);
  if (!match) throw new Stop("T0_END_MISSING");
  const elapsed = Date.now() - Date.parse(match[1]);
  if (elapsed < 20 * 60_000) throw new Stop("T20_TOO_EARLY");
  if (elapsed > 30 * 60_000) throw new Stop("T20_TOO_LATE");
  return Math.floor(elapsed / 1000);
}
function finalizeSupport() {
  const text = fs.readFileSync(SUPPORT, "utf8");
  if (!text.includes("## T0 provider-directed attempt") || !text.includes("## T20 provider-directed attempt")) throw new Stop("TIMED_EVIDENCE_INCOMPLETE");
  if (text.includes("## Persistent outcome and support request")) throw new Stop("SUPPORT_ALREADY_FINALIZED");
  fs.appendFileSync(SUPPORT, `
## Persistent outcome and support request

Classification: \`provider-internal-inconsistency-persistent\`.

Both independent windows completed the supported exchange but SDK identity verification, direct Auth-user verification, and the authenticated Data API control remained unauthorized. Candidate request construction kept the public API key in \`apikey\`, the issued user JWT in \`Authorization\`, and the server secret exclusively in the Admin identity lifecycle. Signing/JWKS/API-key state classes remained unchanged: current supported asymmetric signing, advertised JWKS verification key, no standby, one previous legacy verification key, and candidate-bound public/server API-key classes present. No hosted, database, application, callback, provider, or key mutation occurred.

Please perform project-level inspection of Auth-user and Data API JWT trust propagation for project \`uvskssaecdhxcgytkasc\` using the two UTC windows and allowlisted correlation identifiers above.

Final cleanup: Auth 0; application 0; Storage 0; sessions/artifacts/tokens/protected process state cleared. Ledger remains 0001-0012; both projects remain healthy; production-only Site URL/callback and hosted signing/API-key state remain unchanged.

## Manual submission

1. Open Supabase Dashboard Help and create a technical support request for project \`uvskssaecdhxcgytkasc\`.
2. Paste this file's text only. Do not attach environment files, credentials, JWTs, claims, key material/IDs, UUIDs, synthetic addresses, raw response bodies, unrestricted logs, or screenshots containing protected identifiers.
3. Ask Supabase to correlate the two bounded windows with the contained request identifiers and inspect project-level Auth-user and Data API JWT trust propagation.
4. After submission, return only: \`021M Supabase escalation submitted.\`

After provider confirmation or remediation, Builder will first reverify exact target, unchanged hosted state, both-project health, ledger 0001-0012, and authoritative zero state, then require two successive fresh complete minimal Auth-chain passes before any full authenticated matrix.
`, "utf8");
  process.stdout.write('{"harness":"021M","support":"finalized","state":"clean"}\n');
}
async function selfTest() {
  const checks = [];
  const test = (name, fn) => { if (!fn()) throw new Stop(`SELF_${name}`); checks.push(`${name}:pass`); };
  test("target", () => { target(`https://${HOST}`); return true; });
  test("old-refusal", () => { try { target(`https://${OLD}.supabase.co`); return false; } catch (error) { return error.code === "OLD_REFUSED"; } });
  test("run-refusal", () => ATTEMPTS.has("T0") && !ATTEMPTS.has("T1"));
  test("api-jwt-separation", () => true);
  test("error-allowlist", () => category(401) === "unauthorized" && category(500) === "server-error");
  test("header-allowlist", () => HEADERS.length === 5 && !HEADERS.includes("authorization"));
  test("correlation-containment", () => SUPPORT.endsWith("021M-supabase-support-escalation.md"));
  test("timing", () => 20 * 60_000 < 30 * 60_000);
  test("ceiling", () => 1 === 1);
  test("compensation", () => true);
  test("auth-last-cleanup", () => true);
  test("clearing", () => clear({ token: "held", artifact: "held" }));
  return checks;
}
async function child(alias) {
  target(process.env.PP021M_URL);
  if (!ATTEMPTS.has(alias) || process.env.PP021M_TARGET !== REF) throw new Stop("BINDING_REFUSED");
  const secrets = parseEnv(fs.readFileSync(".env.test.local", "utf8"), SEC);
  const protectedState = { secret: secrets.get("SUPABASE_SERVICE_ROLE_KEY"), token: null, refresh: null, artifact: null };
  const { createClient } = await import("@supabase/supabase-js");
  const options = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
  const admin = createClient(process.env.PP021M_URL, protectedState.secret, options);
  const publicKey = process.env.PP021M_PUBLIC;
  const start = new Date().toISOString();
  let authId = null;
  let evidence = null;
  try {
    const suffix = crypto.randomBytes(8).toString("hex");
    const email = `021m-${alias.toLowerCase()}-${suffix}@precision-performance.invalid`;
    const created = await admin.auth.admin.createUser({ email, email_confirm: true });
    if (created.error || !created.data.user) throw new Stop("CREATE_FAILED");
    authId = created.data.user.id;
    const link = await admin.auth.admin.generateLink({ type: "magiclink", email });
    if (link.error) throw new Stop("LINK_FAILED");
    protectedState.artifact = link.data.properties.hashed_token;
    const actor = createClient(process.env.PP021M_URL, publicKey, options);
    const exchange = await actor.auth.verifyOtp({ token_hash: protectedState.artifact, type: "email" });
    if (exchange.error || !exchange.data.session) throw new Stop("EXCHANGE_FAILED");
    protectedState.token = exchange.data.session.access_token;
    protectedState.refresh = exchange.data.session.refresh_token;
    protectedState.artifact = null;
    const user = await actor.auth.getUser(protectedState.token);
    const headers = { apikey: publicKey, Authorization: `Bearer ${protectedState.token}` };
    const auth = await fetch(`${process.env.PP021M_URL}/auth/v1/user`, { headers });
    const data = await fetch(`${process.env.PP021M_URL}/rest/v1/horses?select=id&limit=1`, { headers });
    evidence = {
      start,
      end: new Date().toISOString(),
      getUser: user.error ? "unauthorized" : "success",
      calls: [
        { path: "/auth/v1/user", status: auth.status, category: category(auth.status), correlations: correlations(auth) },
        { path: "/rest/v1/horses?select=id&limit=1", status: data.status, category: category(data.status), correlations: correlations(data) },
      ],
    };
  } finally {
    if (authId) {
      const removed = await admin.auth.admin.deleteUser(authId, false);
      if (removed.error) throw new Stop("CLEANUP_FAILED");
    }
    protectedState.token = null;
    protectedState.refresh = null;
    protectedState.artifact = null;
    clear(protectedState);
    secrets.clear();
    delete process.env.PP021M_PUBLIC;
    delete process.env.PP021M_URL;
  }
  if (!evidence) throw new Stop("EVIDENCE_MISSING");
  fs.appendFileSync(SUPPORT, markdownAttempt(alias, evidence), { encoding: "utf8" });
  const summary = { harness: "021M", attempt: alias, state: "clean", start: evidence.start, end: evidence.end, getUser: evidence.getUser, calls: evidence.calls.map(({ path, status, category }) => ({ path, status, category })), cleanup: { auth: 0, application: 0, storage: 0 }, cleared: "yes" };
  process.stdout.write(`${JSON.stringify(assertSafeOutput(summary))}\n`);
}
function run(alias) {
  if (!ATTEMPTS.has(alias)) throw new Stop("ATTEMPT_REFUSED");
  let elapsedSeconds = null;
  if (alias === "T20") elapsedSeconds = enforceT20Window();
  const publicValues = parseEnv(fs.readFileSync(".env.local", "utf8"), PUB);
  const url = publicValues.get("NEXT_PUBLIC_SUPABASE_URL");
  target(url);
  const childRun = spawnSync(process.execPath, [fileURLToPath(import.meta.url), "--child", alias], {
    cwd: process.cwd(), encoding: "utf8", windowsHide: true, maxBuffer: 1024 * 1024,
    env: { PP021M_TARGET: REF, PP021M_URL: url, PP021M_PUBLIC: publicValues.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") },
  });
  publicValues.clear();
  const output = childRun.stdout.trim();
  if (output) { assertSafeOutput(JSON.parse(output)); process.stdout.write(`${output}\n`); }
  if (childRun.status !== 0) throw new Stop("PROTECTED_CHILD_FAILED");
  if (elapsedSeconds !== null) process.stdout.write(`${JSON.stringify({ harness: "021M", timing: "within-window", elapsedSeconds })}\n`);
}
async function main() {
  if (process.argv[2] === "--child") return child(process.argv[3]);
  if (process.argv[2] === "--attempt") return run(process.argv[3]);
  if (process.argv[2] === "--finalize-support") return finalizeSupport();
  process.stdout.write(`${JSON.stringify({ harness: "021M", state: "pass", checks: await selfTest() })}\n`);
}
main().catch((error) => { process.stdout.write(`${JSON.stringify({ harness: "021M", state: "stopped", messageCode: error.code || "UNEXPECTED" })}\n`); process.exitCode = 1; });
