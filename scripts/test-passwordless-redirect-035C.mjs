import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolvePasswordlessRedirectOrigin } from "../lib/auth/redirect-origin.ts";

const preview = "https://pnr-precision-performance-osu11rk3f-rankin007s-projects.vercel.app";
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: preview, configuredOrigin: null }), preview);
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: preview, configuredOrigin: "https://precisionperformance.com.au" }), preview);
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: "https://malformed.example", configuredOrigin: null }), null);
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: "https://pnr-precision-performance-osu11rk3f-rankin007s-projects.vercel.app.evil.example", configuredOrigin: null }), null);
assert.equal(resolvePasswordlessRedirectOrigin({ requestOrigin: "https://pnr-precision-performance-osu11rk3f-rankin007s-projects.vercel.app/auth/callback", configuredOrigin: null }), null);

const action = readFileSync("app/auth/actions.ts", "utf8");
assert(action.includes('requestHeaders.get("origin")'));
assert(action.includes("resolvePasswordlessRedirectOrigin"));
assert(!action.includes('process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"'));
console.log("Sprint 035C passwordless redirect-origin tests passed.");
