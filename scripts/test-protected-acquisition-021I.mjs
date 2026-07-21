#!/usr/bin/env node

import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

const EXPECTED_REF = "uvskssaecdhxcgytkasc";
const OLD_REF = "tagnbgkroihagjmvehlx";
const EXPECTED_HOST = `${EXPECTED_REF}.supabase.co`;

class BoundaryError extends Error {
  constructor(code) { super(code); this.code = code; }
}

function exactCandidate(raw) {
  let parsed;
  try { parsed = new URL(raw); } catch { throw new BoundaryError("TARGET_INVALID"); }
  if (parsed.hostname === `${OLD_REF}.supabase.co`) throw new BoundaryError("OLD_PROJECT_REFUSED");
  if (parsed.protocol !== "https:" || parsed.hostname !== EXPECTED_HOST || parsed.pathname !== "/" || parsed.username || parsed.password || parsed.port) {
    throw new BoundaryError("UNEXPECTED_PROJECT_REFUSED");
  }
  return true;
}

function category(value) {
  if (typeof value !== "string" || value.length < 32) throw new BoundaryError("PROTECTED_VALUE_MISSING_OR_INVALID");
  return value.startsWith("sb_secret_") ? "modern-secret" : "legacy-service-role";
}

function sanitize(result) {
  const allowed = new Set(["mechanism","target","presence","category","remoteRequest","fileWrite","commandArgument","output","cleared","state","checks"]);
  for (const key of Object.keys(result)) if (!allowed.has(key)) throw new BoundaryError("STATUS_FIELD_REFUSED");
  const rendered = JSON.stringify(result);
  if (/sb_(?:secret|publishable)_[A-Za-z0-9_-]{8,}|eyJ[A-Za-z0-9_-]{20,}\.|@|access[_-]?token|refresh[_-]?token|[0-9a-f]{8}-[0-9a-f-]{27,}/i.test(rendered)) {
    throw new BoundaryError("PROTECTED_OUTPUT_REFUSED");
  }
  return result;
}

function clearProtected(container) {
  for (const key of Object.keys(container)) container[key] = null;
  return Object.values(container).every(value => value === null);
}

function selfTests() {
  const checks = [];
  const test = (name, fn) => { const passed = fn(); if (!passed) throw new BoundaryError(`SELF_TEST_FAILED_${name}`); checks.push(`${name}:pass`); };
  test("exact-candidate", () => exactCandidate(`https://${EXPECTED_HOST}`));
  test("old-project-refusal", () => { try { exactCandidate(`https://${OLD_REF}.supabase.co`); return false; } catch (error) { return error.code === "OLD_PROJECT_REFUSED"; } });
  test("unexpected-project-refusal", () => { try { exactCandidate("https://unexpected.supabase.co"); return false; } catch (error) { return error.code === "UNEXPECTED_PROJECT_REFUSED"; } });
  test("protected-output-refusal", () => { try { sanitize({output:["sb", "secret", "examplevalue"].join("_")}); return false; } catch (error) { return error.code === "PROTECTED_OUTPUT_REFUSED"; } });
  test("status-allowlist", () => Boolean(sanitize({state:"pass",checks:[]})));
  test("clearing", () => clearProtected({secret:"placeholder",handle:"placeholder"}));
  return checks;
}

function main() {
  const checks = selfTests();
  loadEnvConfig(process.cwd(), false, console, true);
  const protectedState = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
  let secretCategory;
  try {
    exactCandidate(protectedState.url);
    secretCategory = category(protectedState.secret);
  } finally {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    const cleared = clearProtected(protectedState)
      && process.env.SUPABASE_SERVICE_ROLE_KEY === undefined
      && process.env.NEXT_PUBLIC_SUPABASE_URL === undefined;
    if (!cleared) throw new BoundaryError("PROTECTED_CLEAR_FAILED");
  }
  const result = sanitize({
    mechanism:"existing-next-environment-loader",
    target:"exact-candidate",
    presence:"yes",
    category:secretCategory,
    remoteRequest:"no",
    fileWrite:"no",
    commandArgument:"no",
    output:"sanitized-only",
    cleared:"yes",
    state:"pass",
    checks,
  });
  process.stdout.write(`${JSON.stringify(result)}\n`);
}

try { main(); } catch (error) {
  process.stdout.write(`${JSON.stringify({state:"stopped",checks:[error instanceof BoundaryError ? error.code : "UNEXPECTED_FAILURE"]})}\n`);
  process.exitCode = 1;
}
