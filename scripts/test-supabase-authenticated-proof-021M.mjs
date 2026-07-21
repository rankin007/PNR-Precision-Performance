import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
const run = spawnSync(process.execPath, ["scripts/supabase-authenticated-proof-021M.mjs"], { encoding: "utf8", windowsHide: true });
assert.equal(run.status, 0);
assert.equal(JSON.parse(run.stdout).state, "nonmutating");
process.stdout.write("021M proof-gate self-test passed.\n");
