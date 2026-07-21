import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
const run = spawnSync(process.execPath, ["scripts/supabase-timed-jwt-reproduction-021M.mjs"], { encoding: "utf8", windowsHide: true });
assert.equal(run.status, 0);
const output = JSON.parse(run.stdout);
assert.equal(output.checks.length, 12);
assert.ok(output.checks.every((item) => item.endsWith(":pass")));
process.stdout.write("021M timed reproduction self-tests passed (12/12).\n");
