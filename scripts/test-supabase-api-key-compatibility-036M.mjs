#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createSupabaseApiKeyFetch, isOpaqueSupabaseApiKey } from "../lib/supabase/api-key-fetch.ts";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };

for (const value of ["sb_publishable_example"]) equal(isOpaqueSupabaseApiKey(value), true);
for (const value of ["eyJlegacy"]) equal(isOpaqueSupabaseApiKey(value), false);

async function capture(apiKey, authorization) {
  let captured;
  const fakeFetch = async (_input, init) => { captured = new Headers(init?.headers); return new Response("{}", { status: 200, headers: { "content-type": "application/json" } }); };
  const wrapped = createSupabaseApiKeyFetch(apiKey, fakeFetch);
  await wrapped("https://example.invalid/rest/v1/", { headers: authorization ? { Authorization: authorization } : {} });
  return captured;
}

for (const key of ["sb_publishable_example", "sb_secret_example"]) {
  const headers = await capture(key, `Bearer ${key}`);
  equal(headers.get("apikey"), key);
  equal(headers.has("authorization"), false);
}
const jwt = "eyJ-user-session-jwt";
const authenticated = await capture("sb_publishable_example", `Bearer ${jwt}`);
equal(authenticated.get("apikey"), "sb_publishable_example");
equal(authenticated.get("authorization"), `Bearer ${jwt}`);
const legacy = await capture("eyJlegacy", "Bearer eyJlegacy");
equal(legacy.has("apikey"), false);
equal(legacy.get("authorization"), "Bearer eyJlegacy");

const surfaces = [
  ["lib/supabase/client.ts", "createSupabaseApiKeyFetch(supabaseEnv.anonKey!)"],
  ["lib/supabase/server.ts", "createSupabaseApiKeyFetch(supabaseEnv.anonKey!)"],
  ["lib/supabase/admin.ts", "createSupabaseApiKeyFetch(supabaseEnv.serviceRoleKey!)"],
  ["lib/supabase/middleware.ts", "createSupabaseApiKeyFetch(supabaseEnv.anonKey!)"],
  ["app/auth/callback/route.ts", "createSupabaseApiKeyFetch(supabaseEnv.anonKey!)"],
];
for (const [path, marker] of surfaces) {
  const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
  check(source.includes('from "@/lib/supabase/api-key-fetch"'), `${path} imports compatibility fetch`);
  check(source.includes(marker), `${path} installs correct key fetch`);
  check(source.includes("global:"), `${path} passes a global fetch option`);
}
const callback = await readFile(new URL("../app/auth/callback/route.ts", import.meta.url), "utf8");
check(callback.includes("exchangeCodeForSession(code)"), "PKCE code exchange remains present");
check(callback.includes("await supabase.auth.getUser()"), "PKCE authenticated user read remains present");
const helper = await readFile(new URL("../lib/supabase/api-key-fetch.ts", import.meta.url), "utf8");
check(helper.includes('headers.delete("Authorization")'), "opaque duplicate authorization removed");
check(helper.includes('headers.set("apikey", apiKey)'), "opaque key is installed as apikey");
check(helper.includes("authorization === `Bearer ${apiKey}`"), "only exact key duplication is removed");

assert.equal(assertions, 30, `expected exactly 30 compatibility assertions, received ${assertions}`);
console.log(`Sprint 036M Supabase API-key compatibility assertions passed: ${assertions}/30.`);
