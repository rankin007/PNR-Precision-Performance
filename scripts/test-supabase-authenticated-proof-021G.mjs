import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["scripts/supabase-authenticated-proof-021G.mjs", "--self-test=true"], { cwd: process.cwd(), encoding: "utf8", env: {} });
if (result.status !== 0) throw new Error("021G harness self-tests failed");
const output = JSON.parse(result.stdout.trim());
if (output.state !== "passed" || output.messageCode !== "SELF_TESTS_COMPLETE") throw new Error("Unexpected 021G self-test result");
if (!Array.isArray(output.checks) || output.checks.length !== 15 || output.checks.some(check => !check.endsWith(":pass"))) throw new Error("Incomplete 021G self-test coverage");
process.stdout.write("Sprint 021G harness self-tests passed.\n");
