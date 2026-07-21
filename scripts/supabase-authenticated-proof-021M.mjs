#!/usr/bin/env node
const modes = new Set(["preflight", "full-proof"]);
const mode = process.argv[2] || "preflight";
if (!modes.has(mode)) {
  process.stdout.write('{"harness":"021M-proof","state":"stopped","messageCode":"MODE_REFUSED"}\n');
  process.exitCode = 1;
} else {
  process.stdout.write(`${JSON.stringify({ harness: "021M-proof", mode, state: "nonmutating", messageCode: mode === "full-proof" ? "STABLE_AUTH_GATE_REQUIRED" : "PREFLIGHT_READY" })}\n`);
}
