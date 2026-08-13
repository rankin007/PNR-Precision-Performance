import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

export const SUPABASE_SELF_TESTS = [
  "scripts/test-supabase-auth-jwt-reconciliation-021L.mjs",
  "scripts/test-supabase-authenticated-proof-021E.mjs",
  "scripts/test-supabase-authenticated-proof-021G.mjs",
  "scripts/test-supabase-authenticated-proof-021H.mjs",
  "scripts/test-supabase-authenticated-proof-021J.mjs",
  "scripts/test-supabase-authenticated-proof-021K.mjs",
  "scripts/test-supabase-authenticated-proof-021L.mjs",
  "scripts/test-supabase-authenticated-proof-021M.mjs",
  "scripts/test-supabase-timed-jwt-reproduction-021M.mjs",
];

export const STATIC_VALIDATORS = [
  "scripts/validate-design-system-019.ps1",
  "scripts/validate-biochemistry-remote-readiness.ps1",
  "scripts/validate-database-audit-020C.ps1",
  "scripts/validate-supabase-structural-audit-020E.ps1",
  "scripts/validate-supabase-replacement-audit-020F.ps1",
  "scripts/validate-supabase-clean-rebuild-020G.ps1",
  "scripts/validate-role-matrix-021.ps1",
];

export function platformCommands(platform = process.platform) {
  return {
    node: platform === "win32" && existsSync("node_modules/node/bin/node.exe")
      ? "node_modules/node/bin/node.exe"
      : existsSync("node_modules/node/bin/node") ? "node_modules/node/bin/node" : process.execPath,
    npm: platform === "win32" ? "npm.cmd" : "npm",
    npmExecPath: process.env.npm_execpath || null,
    powershell: platform === "win32" ? "powershell" : "pwsh",
  };
}

export function isRetryableBuildFailure(output) {
  return /Generating static pages|Collecting page data/i.test(output)
    && !/Failed to compile|Type error|ESLint.*(?:error|failed)|Module not found/i.test(output);
}

export function workingTreeSnapshot() {
  const result = spawnSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], { encoding: "utf8" });
  if (result.status !== 0) throw new Error("unable to capture build source snapshot");
  return result.stdout;
}

export function commandPlan(mode, commands = platformCommands()) {
  const node = commands.node;
  const npm = commands.npm;
  const npmCommand = commands.npmExecPath ? node : npm;
  const npmPrefix = commands.npmExecPath ? [commands.npmExecPath] : [];
  const ps = commands.powershell;
  const groups = {
    json: [
      ["json-self-test", node, ["scripts/test-validate-json-files.mjs"]],
      ["json-files", node, ["scripts/validate-json-files.mjs", "package.json", "package-lock.json", "planning/STATUS.json", "planning/reviews/017B-file-classification.json", "planning/reviews/017D-staging-manifest.json", "planning/reviews/017E-staging-manifest.json", "planning/reviews/017F-staging-manifest.json"]],
    ],
    domain: [
      ["biochemistry-scoring", node, ["--experimental-strip-types", "scripts/validate-biochemistry-scoring.ts"]],
      ["biochemistry-recommendations", node, ["--experimental-strip-types", "scripts/validate-biochemistry-recommendations.ts"]],
      ["biochemistry-workflow-022", node, ["--experimental-strip-types", "scripts/test-biochemistry-workflow-022.mjs"]],
      ["biochemistry-authority-025", node, ["--experimental-strip-types", "scripts/test-biochemistry-authority-025.mjs"]],
      ["biochemistry-scoring-025c", node, ["--experimental-strip-types", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/test-biochemistry-scoring-025C.mjs"]],
      ["biochemistry-migration-025c", node, ["--experimental-strip-types", "scripts/test-biochemistry-migration-025C.mjs"]],
      ["biochemistry-workflow-025c", node, ["--experimental-strip-types", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/test-biochemistry-workflow-025C.mjs"]],
      ["test-evidence-026", node, ["--experimental-strip-types", "scripts/test-test-evidence-026.mjs"]],
      ["biochemistry-voice-027", node, ["--experimental-strip-types", "scripts/test-biochemistry-voice-027.mjs"]],
      ["stable-workspace-028", node, ["--experimental-strip-types", "scripts/test-stable-workspace-028.mjs"]],
      ["biochemistry-trends-028b", node, ["--experimental-strip-types", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/test-biochemistry-trends-028B.mjs"]],
      ["trainer-cockpit-035r", node, ["--experimental-strip-types", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/test-trainer-cockpit-035R.mjs"]],
      ["commerce-disabled-030", node, ["--conditions=react-server", "--experimental-strip-types", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/test-commerce-disabled-030.mjs"]],
      ["commercial-schedule-030b", node, ["--conditions=react-server", "--experimental-strip-types", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/test-commercial-schedule-030B.mjs"]],
      ["field-trial-controls-031", node, ["scripts/test-field-trial-controls-031.mjs"]],
      ["protected-preview-transport-031b", node, ["scripts/test-protected-preview-transport-031B.mjs"]],
      ["field-trial-controls-031c", node, ["scripts/test-field-trial-controls-031C.mjs"]],
      ["operational-readiness-033b", node, ["scripts/test-operational-readiness-033B.mjs"]],
      ["migration-ledger-033b", node, ["scripts/test-migration-ledger-033B.mjs"]],
    ],
    roles: [["role-tests", node, ["--experimental-strip-types", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/test-role-matrix-021.mjs"]]],
    "prelaunch-036k": [
      ["prelaunch-readiness-036k", node, ["scripts/test-prelaunch-readiness-036K.mjs"]],
      ["prelaunch-provider-036k", node, ["scripts/test-prelaunch-provider-036K.mjs"]],
    ],
    "prelaunch-036m": [
      ["prelaunch-recovery-036m", node, ["scripts/test-prelaunch-recovery-036M.mjs"]],
      ["prelaunch-provider-036m", node, ["scripts/test-prelaunch-provider-036M.mjs"]],
      ["prelaunch-identity-036m", node, ["scripts/test-prelaunch-identity-036M.mjs"]],
      ["prelaunch-trainer-036m", node, ["scripts/test-prelaunch-trainer-036M.mjs"]],
      ["supabase-api-key-compatibility-036m", node, ["--experimental-strip-types", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/test-supabase-api-key-compatibility-036M.mjs"]],
    ],
    "prelaunch-036n": [
      ["native-closure-036n", node, ["scripts/test-native-closure-036N.mjs"]],
      ["native-provider-036n", node, ["scripts/test-native-provider-036N.mjs"]],
      ["native-transport-036n", node, ["scripts/test-native-transport-036N.mjs"]],
    ],
    "provider-authority-036o": [
      ["provider-authority-discovery-036o", node, ["scripts/test-provider-authority-discovery-036O.mjs"]],
      ["provider-authority-projections-036o", node, ["scripts/test-provider-authority-projections-036O.mjs"]],
      ["provider-authority-transport-036o", node, ["scripts/test-provider-authority-transport-036O.mjs"]],
    ],    "provider-authority-036p": [
      ["provider-authority-discovery-036p", node, ["scripts/test-provider-authority-discovery-036P.mjs"]],
      ["provider-authority-reader-036p", node, ["scripts/test-provider-authority-reader-036P.mjs"]],
      ["provider-authority-transport-036p", node, ["scripts/test-provider-authority-transport-036P.mjs"]],
    ],
    "supabase-self": SUPABASE_SELF_TESTS.map((path) => [`self:${path}`, node, [path]]),
    static: [
      ["encoding", node, ["scripts/validate-text-encoding.mjs"]],
      ...STATIC_VALIDATORS.map((path) => [`static:${path}`, ps, ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", path]]),
    ],
  };
  const components = [...groups.json, ...groups.domain, ...groups.roles, ...groups["prelaunch-036n"], ...groups["provider-authority-036o"], ...groups["provider-authority-036p"], ...groups["supabase-self"], ...groups.static];
  const quality = [
    ["lint", npmCommand, [...npmPrefix, "run", "lint"]],
    ["typecheck", npmCommand, [...npmPrefix, "run", "typecheck"]],
    ["build", npmCommand, [...npmPrefix, "run", "build"]],
  ];
  if (groups[mode]) return groups[mode];
  if (mode === "ci" || mode === "local") return [...components, ...quality];
  throw new Error(`unsupported validation mode: ${mode}`);
}

export function planIsRemoteSafe(plan) {
  return plan.every(([, command, args]) => {
    const tokens = [command, ...args].map((token) => token.replaceAll("\\", "/"));
    return tokens.every((token) => !/^scripts\/supabase-.*\.mjs$/i.test(token)
      && !/(?:^|\s)(login|link|deploy|publish|push|fetch|pull)(?:\s|$)/i.test(token));
  });
}

function runGate([name, command, args], options = {}) {
  const result = spawnSync(command, args, { encoding: "utf8", stdio: ["inherit", "pipe", "pipe"] });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) return { name, status: 1, output: `${result.stdout ?? ""}${result.stderr ?? ""}`, error: result.error };
  return { name, status: result.status ?? 1, output: `${result.stdout ?? ""}${result.stderr ?? ""}`, options };
}

export function executePlan(plan, { mode, run = runGate, snapshot = workingTreeSnapshot } = {}) {
  for (const gate of plan) {
    const started = Date.now();
    console.log(`VALIDATION_START ${gate[0]}`);
    const beforeBuild = mode === "local" && gate[0] === "build" ? snapshot() : null;
    let result = run(gate);
    if (result.status !== 0 && mode === "local" && gate[0] === "build" && isRetryableBuildFailure(result.output)) {
      if (snapshot() !== beforeBuild) {
        console.error("VALIDATION_FAIL build source/index changed; retry refused");
        return result.status;
      }
      console.log("VALIDATION_RETRY build unchanged page-generation failure");
      result = run(gate, { retry: true });
    }
    const duration = ((Date.now() - started) / 1000).toFixed(1);
    if (result.status !== 0) {
      console.error(`VALIDATION_FAIL ${gate[0]} exit=${result.status} duration=${duration}s`);
      return result.status;
    }
    console.log(`VALIDATION_PASS ${gate[0]} duration=${duration}s`);
  }
  return 0;
}

const mode = process.argv[2];
if (mode) {
  try {
    const plan = commandPlan(mode);
    if (!planIsRemoteSafe(plan)) throw new Error("validation plan contains a prohibited remote/protected harness");
    process.exitCode = executePlan(plan, { mode });
  } catch (error) {
    console.error(`VALIDATION_CONFIG_FAIL ${error.message}`);
    process.exitCode = 1;
  }
}
