import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildPasswordlessCallbackUrl, resolvePasswordlessRedirectOrigin } from "../lib/auth/redirect-origin.ts";

const preview = "https://pnr-precision-performance-osu11rk3f-rankin007s-projects.vercel.app";
const production = "https://precisionperformance.com.au";
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: null, forwardedHost: new URL(preview).host, forwardedProto: "https", configuredOrigin: production }), preview);
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: production, forwardedHost: new URL(preview).host, forwardedProto: "https", configuredOrigin: production }), preview);
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: null, forwardedHost: new URL(production).host, forwardedProto: "https", configuredOrigin: preview }), production);
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: "https://malformed.example", forwardedHost: null, forwardedProto: null, configuredOrigin: production }), null);
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: null, forwardedHost: "pnr-precision-performance-osu11rk3f-rankin007s-projects.vercel.app.evil.example", forwardedProto: "https", configuredOrigin: production }), null);
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: null, forwardedHost: new URL(preview).host, forwardedProto: "http", configuredOrigin: production }), null);
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: production, forwardedHost: "malformed.example", forwardedProto: "https", configuredOrigin: production }), null);
assert.equal(buildPasswordlessCallbackUrl(preview, "/portal"), `${preview}/auth/callback?next=%2Fportal`);
assert.equal(buildPasswordlessCallbackUrl(production, "/portal"), `${production}/auth/callback?next=%2Fportal`);

const action = readFileSync("app/auth/actions.ts", "utf8");
assert(action.includes('requestHeaders.get("origin")'));
assert(action.includes('requestHeaders.get("x-forwarded-host")'));
assert(action.includes('requestHeaders.get("x-forwarded-proto")'));
assert(action.includes("resolvePasswordlessRedirectOrigin"));
assert(action.includes("emailRedirectTo: buildPasswordlessCallbackUrl(origin, next)"));
assert(!action.includes('process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"'));
console.log("Sprint 035C passwordless redirect-origin tests passed.");
