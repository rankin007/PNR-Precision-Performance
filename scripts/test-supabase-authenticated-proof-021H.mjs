import assert from "node:assert/strict";
import { ACTORS, LIMITS, cleanupPlan, identities, selfTests } from "./supabase-authenticated-proof-021H.mjs";

const checks = await selfTests();
assert.equal(checks.length, 15);
assert.ok(checks.every(check => check.endsWith(":pass")));
assert.equal(ACTORS.length, 10);
assert.equal(new Set(Object.values(identities("021H-RLS-20260721-01"))).size, 10);
assert.equal(cleanupPlan({counts:Object.fromEntries(Object.keys(LIMITS).map(key=>[key,0])),directAnchors:true,unambiguousOwnership:true,authLast:true}).at(-1), "authIdentities");
process.stdout.write("021H harness self-tests passed (15/15).\n");
