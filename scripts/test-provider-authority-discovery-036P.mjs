import { strict as assert } from "node:assert";
import {
  SOURCE,
  MANAGER_PATH,
  MANAGER_BLOB,
  CLASSES,
  Discovery036PError,
  isConventionalTestPath,
  isAdmittedSourcePath,
  buildAcceptedSourceGraph,
  assertAcceptedSourceGraph,
  sourceClassMap,
} from "./provider-authority-discovery-036P.mjs";

let count = 0;
const equal = (actual, expected) => { assert.deepEqual(actual, expected); count += 1; };
const ok = (value) => { assert.ok(value); count += 1; };
const refuses = (operation, code) => { assert.throws(operation, (error) => error instanceof Discovery036PError && error.code === code); count += 1; };

const blobFor = (index) => index.toString(16).padStart(40, "0");
const baseFiles = Object.freeze({
  "components/ops/test-evidence-manager.tsx": "export const manager = true;",
  "app/(ops)/data-entry/biochemistry/[testId]/page.tsx": "import { manager } from '@/components/ops/test-evidence-manager'; export default function Page(){return manager}",
  "lib/env.ts": "export const service = process.env.SUPABASE_SERVICE_ROLE_KEY; export const stripe = process.env.STRIPE_SECRET_KEY; export const hook = process.env.STRIPE_WEBHOOK_SECRET;",
  "lib/supabase/admin.ts": "import { service } from '../env'; export const admin = service;",
  "app/(portal)/portal/page.tsx": "import { admin } from '@/lib/supabase/admin'; export default function Portal(){return admin}",
  "app/api/internal/evidence/reconcile/route.ts": "export const cron = process.env.CRON_SECRET;",
  "lib/runtime/platform-status.ts": "export const railway = process.env.RAILWAY_API_TOKEN;",
  "app/layout.tsx": "import './globals.css'; export default function Layout(){return null}",
  "app/sample.test.ts": "process.env.PUBLIC_ENQUIRY_SMTP_PASS",
  "components/test-widget.tsx": "export const production = true;",
  "components/widget.spec.tsx": "process.env.ENQUIRY_ABUSE_HMAC_SECRET",
  "app/__tests__/hidden.ts": "process.env.PUBLIC_ENQUIRY_SMTP_PASS",
  "vercel.json": "{\"crons\":[]}",
});

function fakeGit(files = baseFiles, options = {}) {
  const entries = Object.keys(files).map((file, index) => ({
    file,
    mode: options.mode?.[file] ?? "100644",
    blob: file === MANAGER_PATH ? (options.managerBlob ?? MANAGER_BLOB) : blobFor(index + 1),
  }));
  const byBlob = new Map(entries.map((entry) => [entry.blob, Buffer.from(files[entry.file])]));
  return (command, args) => {
    assert.equal(command, "git");
    if (args[0] === "ls-tree") return Buffer.from(entries.map((entry) => `${entry.mode} blob ${entry.blob}\t${entry.file}\0`).join(""));
    if (args[0] === "cat-file") {
      const result = byBlob.get(args[2]);
      if (!result) throw new Error("missing blob");
      return result;
    }
    throw new Error(`unexpected command ${args.join(" ")}`);
  };
}

ok(SOURCE.length === 40 && MANAGER_PATH === "components/ops/test-evidence-manager.tsx" && MANAGER_BLOB.length === 40 && CLASSES.length === 7 && new Set(CLASSES).size === 7);

ok(Object.isFrozen(CLASSES));
equal(isConventionalTestPath("app/a.test.ts"), true);
equal(isConventionalTestPath("app/a.spec.tsx"), true);
equal(isConventionalTestPath("app/__tests__/a.ts"), true);
equal(isConventionalTestPath("app/test/a.ts"), true);
equal(isConventionalTestPath("components/test-evidence-manager.tsx"), false);
equal(isConventionalTestPath("components/testing-panel.tsx"), false);
equal(isAdmittedSourcePath(MANAGER_PATH), true);
equal(isAdmittedSourcePath("app/a.test.ts"), false);
equal(isAdmittedSourcePath("scripts/a.ts"), false);
equal(isAdmittedSourcePath("middleware.ts"), true);

const graph = buildAcceptedSourceGraph(fakeGit());
equal(graph.source, SOURCE);
equal(graph.manager.path, MANAGER_PATH);
equal(graph.manager.mode, "100644");
equal(graph.manager.blob, MANAGER_BLOB);
equal(graph.fileCount, 10);
ok(graph.totalBytes > 0);
equal(graph.graphHash.length, 64);
equal(graph.complete, true);
equal(graph.unresolved.length, 0);
equal(graph.classes.length, 7);
ok(Object.isFrozen(graph));
ok(Object.isFrozen(graph.classes));
ok(graph.edges.some((edge) => edge.from.includes("biochemistry") && edge.to === MANAGER_PATH));
equal(graph.edges.some((edge) => edge.to.endsWith("globals.css")), false);
equal(assertAcceptedSourceGraph(graph), graph);

const classes = sourceClassMap(graph);
equal(Object.keys(classes).length, 7);
equal(classes.SUPABASE_SERVICE_ROLE_KEY.roots, ["lib/env.ts"]);
ok(classes.SUPABASE_SERVICE_ROLE_KEY.consumers.includes("lib/supabase/admin.ts"));
ok(classes.SUPABASE_SERVICE_ROLE_KEY.consumers.includes("app/(portal)/portal/page.tsx"));
equal(classes.CRON_SECRET.roots, ["app/api/internal/evidence/reconcile/route.ts"]);
equal(classes.STRIPE_SECRET_KEY.roots, ["lib/env.ts"]);
equal(classes.STRIPE_WEBHOOK_SECRET.roots, ["lib/env.ts"]);
equal(classes.RAILWAY_API_TOKEN.roots, ["lib/runtime/platform-status.ts"]);
equal(classes.PUBLIC_ENQUIRY_SMTP_PASS.sourceExcluded, true);
equal(classes.ENQUIRY_ABUSE_HMAC_SECRET.sourceExcluded, true);
ok(Object.values(classes).every((row) => row.complete));
ok(Object.values(classes).every(Object.isFrozen));

refuses(() => assertAcceptedSourceGraph({ ...graph }), "SOURCE_GRAPH_AUTHORITY_REFUSED");
refuses(() => buildAcceptedSourceGraph(fakeGit(baseFiles, { managerBlob: blobFor(999) })), "SOURCE_MANAGER_REFUSED");
refuses(() => buildAcceptedSourceGraph(fakeGit(baseFiles, { mode: { [MANAGER_PATH]: "100755" } })), "SOURCE_MANAGER_REFUSED");
refuses(() => buildAcceptedSourceGraph((command, args) => args[0] === "ls-tree" ? Buffer.from("bad-tree\\0") : Buffer.from("")), "SOURCE_TREE_PARSE_REFUSED");

const incomplete = buildAcceptedSourceGraph(fakeGit({ ...baseFiles, "app/missing.ts": "import './not-there';" }));
equal(incomplete.complete, false);
equal(incomplete.unresolved.length, 1);
equal(incomplete.unresolved[0].specifier, "./not-there");
equal(incomplete.classes.every((row) => row.complete === false), true);

refuses(() => buildAcceptedSourceGraph(fakeGit({ ...baseFiles, "app/client.tsx": "'use client'; process.env.CRON_SECRET" })), "CLIENT_SECRET_REFUSED");
const dynamic = buildAcceptedSourceGraph(fakeGit({ ...baseFiles, "lib/dynamic.ts": "const key='X'; process.env[key]" }));
equal(dynamic.complete, false);
equal(dynamic.classes.every((row) => row.dynamicEnvironment), true);
equal(dynamic.classes.every((row) => !row.complete), true);

const ambiguousFiles = { ...baseFiles, "lib/thing.ts": "export {}", "lib/thing/index.ts": "export {}", "app/ambiguous.ts": "import '@/lib/thing'" };
refuses(() => buildAcceptedSourceGraph(fakeGit(ambiguousFiles)), "SOURCE_IMPORT_AMBIGUOUS");
const tooMany = Object.fromEntries(Array.from({ length: 5001 }, (_, index) => [`app/f${index}.ts`, "export {}"]));
tooMany[MANAGER_PATH] = "export const manager=true";
refuses(() => buildAcceptedSourceGraph(fakeGit(tooMany)), "SOURCE_FILE_CEILING_REFUSED");
refuses(() => buildAcceptedSourceGraph(fakeGit({ ...baseFiles, "lib/huge.ts": "x".repeat(1024 * 1024 + 1) })), "SOURCE_FILE_BYTES_REFUSED");

const real = buildAcceptedSourceGraph();
equal(real.complete, true);
equal(real.unresolved.length, 0);
equal(real.manager.blob, MANAGER_BLOB);
ok(real.fileCount > 100);
equal(sourceClassMap(real).SUPABASE_SERVICE_ROLE_KEY.sourceExcluded, false);
equal(sourceClassMap(real).PUBLIC_ENQUIRY_SMTP_PASS.sourceExcluded, true);

assert.equal(count, 60);
console.log(`provider-authority-discovery-036P ${count}/60 PASS`);
