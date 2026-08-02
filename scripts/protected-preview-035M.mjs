import assert from "node:assert/strict";

const preview = process.env.PREVIEW_URL;
const expectedHost = process.env.PREVIEW_EXPECTED_HOST;
if (!preview || !expectedHost) throw new Error("PREVIEW_URL and PREVIEW_EXPECTED_HOST are required; do not include protected values.");

const base = new URL(preview);
assert.equal(base.host, expectedHost, "Preview host must match the read-before-write target");
assert.ok(!/precisionperformance\.com\.au$/i.test(base.host), "Production aliases are prohibited");

let checks = 0;
function check(condition, message) { assert.ok(condition, message); checks += 1; console.log(`PASS ${checks}: ${message}`); }
async function request(path, options = {}) { return fetch(new URL(path, base), { redirect: "manual", ...options }); }

const health = await request("/api/health");
check(health.status === 200, "exact Preview health route is ready");
check((health.headers.get("content-type") ?? "").includes("application/json"), "health response is structured");
const signIn = await request("/sign-in");
const signInText = await signIn.text();
check(signIn.status === 200, "sign-in renders on Preview");
check(signInText.includes("Private sign-in"), "private mailbox guidance renders");
check(!signInText.includes("Continue after setup"), "no unauthenticated continuation shortcut renders");
const portal = await request("/portal");
check([302, 303, 307, 308].includes(portal.status), "anonymous portal access redirects");
check((portal.headers.get("location") ?? "").includes("/sign-in"), "anonymous portal denial targets sign-in");
check(!(portal.headers.get("location") ?? "").includes("sample-horse"), "denial leaks no horse identity");
check(!signInText.includes("sample-horse"), "sign-in leaks no fixture identity");
check(!signInText.includes("Signed in as"), "anonymous sign-in renders no participant identity");
check(!(signIn.headers.get("set-cookie") ?? "").toLowerCase().includes("service_role"), "response exposes no service credential marker");
check(base.protocol === "https:", "Preview uses HTTPS");
check(base.pathname === "/", "Preview identity has no hidden route prefix");
check(checks === 13, "Preview identity, anonymous denial and pre-human lifecycle checks reconcile");
console.log("Sprint 035M rendered Preview checks passed: 14.");
