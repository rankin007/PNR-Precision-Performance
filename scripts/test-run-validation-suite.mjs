import assert from "node:assert/strict";
import {
  SUPABASE_SELF_TESTS,
  commandPlan,
  executePlan,
  isRetryableBuildFailure,
  planIsRemoteSafe,
  platformCommands,
} from "./run-validation-suite.mjs";

assert.equal(platformCommands("win32").powershell, "powershell");
assert.equal(platformCommands("linux").powershell, "pwsh");
assert.equal(SUPABASE_SELF_TESTS.length, 9);
assert.ok(SUPABASE_SELF_TESTS.every((path) => path.startsWith("scripts/test-supabase-")));
assert.ok(planIsRemoteSafe(commandPlan("ci", { node: "node", npm: "npm", powershell: "pwsh" })));
assert.equal(isRetryableBuildFailure("Generating static pages then worker exited"), true);
assert.equal(isRetryableBuildFailure("Generating static pages\nType error: bad"), false);

const calls = [];
const failed = executePlan([
  ["one", "node", []],
  ["two", "node", []],
  ["three", "node", []],
], { mode: "ci", run: (gate) => { calls.push(gate[0]); return { status: gate[0] === "two" ? 7 : 0, output: "" }; }, snapshot: () => "same" });
assert.equal(failed, 7);
assert.deepEqual(calls, ["one", "two"]);

let buildRuns = 0;
const retried = executePlan([["build", "npm", []]], {
  mode: "local",
  run: () => ({ status: ++buildRuns === 1 ? 1 : 0, output: "Generating static pages then worker exited" }),
  snapshot: () => "same",
});
assert.equal(retried, 0);
assert.equal(buildRuns, 2);

let changedRuns = 0;
const snapshots = ["before", "after"];
const refused = executePlan([["build", "npm", []]], {
  mode: "local",
  run: () => { changedRuns += 1; return { status: 1, output: "Generating static pages then worker exited" }; },
  snapshot: () => snapshots.shift(),
});
assert.equal(refused, 1);
assert.equal(changedRuns, 1);

console.log("Validation orchestrator self-test passed: 12 cases.");
