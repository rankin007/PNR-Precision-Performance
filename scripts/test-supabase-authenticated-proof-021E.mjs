import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["scripts/supabase-authenticated-proof-021E.mjs", "--self-test=true"], {
  cwd: process.cwd(), encoding: "utf8", env: {}
});
if (result.status !== 0) throw new Error("021E harness self-tests failed");
const output = JSON.parse(result.stdout.trim());
if (output.state !== "passed" || output.messageCode !== "SELF_TESTS_COMPLETE") throw new Error("Unexpected self-test result");
if (!Array.isArray(output.checks) || output.checks.length !== 16 || output.checks.some(x => !x.endsWith(":pass"))) {
  throw new Error("Incomplete self-test coverage");
}
process.stdout.write("Sprint 021E harness self-tests passed.\n");
