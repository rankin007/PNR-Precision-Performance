import assert from "node:assert/strict";
import { selfTests } from "./supabase-authenticated-proof-021J.mjs";
const checks=await selfTests();
assert.equal(checks.length,19);
assert.ok(checks.every(check=>check.endsWith(":pass")));
process.stdout.write("021J harness self-tests passed (19/19).\n");
