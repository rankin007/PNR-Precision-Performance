import { builtinModules, createRequire } from "node:module";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve("C:/Users/rrank/OneDrive/PNR Precision Performance Canonical");
const base = "fcbe38d94f1701c96095edd65bd3a636a476d4c1";
const source = "3dce7add2909fe4f6c0fbf6244c49611e3f6347b";
const branch = "codex/034G-product-and-database-integration";
const manifestPath = "planning/reviews/034G-product-and-database-source-manifest.json";
const expectedCounts = {
  "manifest/scope": 431,
  "package/imports": 20,
  migrations: 46,
  roles: 18,
  "auth/RLS": 24,
  evidence: 16,
  "enquiries/commerce": 16,
  "JSON/config": 10,
  "exclusions/cleanup": 10,
};
const results = [];

function git(args, binary = false) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: binary ? undefined : "utf8",
    maxBuffer: 256 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function read(relative) {
  return fs.readFileSync(path.join(root, ...relative.split("/")));
}

function text(relative) {
  return read(relative).toString("utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function sqlLexicallyClean(value) {
  const dollarQuotes = value.match(/\$\$/g)?.length ?? 0;
  return value.trim().length > 0 && value.includes(";") && !value.includes("\u0000")
    && !value.includes("<<<<<<<") && !value.includes("=======") && !value.includes(">>>>>>>")
    && dollarQuotes % 2 === 0;
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

function equal(left, right) {
  return JSON.stringify(stable(left)) === JSON.stringify(stable(right));
}

function assert(category, id, description, condition, detail = "") {
  results.push({ category, id, description, passed: Boolean(condition), detail });
}

function parseDiffRecords() {
  const named = [
    ".env.example",
    "docs/DESIGN_AND_MESSAGING_AUTHORITY.md",
    "eslint.config.mjs",
    "middleware.ts",
    "next.config.ts",
    "package-lock.json",
    "package.json",
    "tailwind.config.ts",
    "tsconfig.json",
    "vercel.json",
  ];
  const raw = git([
    "diff", "--name-status", "-z", "--find-renames", base, source, "--",
    "app", "components", "lib", "public", "supabase", ...named,
  ]);
  const fields = raw.split("\0").filter(Boolean);
  const parsed = [];
  for (let index = 0; index < fields.length;) {
    const status = fields[index++];
    if (/^R\d+$/.test(status)) {
      parsed.push({ status, sourcePath: fields[index++].replaceAll("\\", "/"), targetPath: fields[index++].replaceAll("\\", "/") });
    } else {
      parsed.push({ status, path: fields[index++].replaceAll("\\", "/") });
    }
  }
  return parsed;
}

function identity(record) {
  return record.status === "R100"
    ? { status: record.status, sourcePath: record.sourcePath, targetPath: record.targetPath }
    : { status: record.status, path: record.path };
}

if (path.resolve(process.cwd()).toLowerCase() !== root.toLowerCase()) {
  throw new Error(`Run from canonical root: ${root}`);
}

const manifest = JSON.parse(text(manifestPath));
const observedRecords = parseDiffRecords();

// manifest/scope: 210 record identities + 156 target hashes + 55 absences + 10 aggregates = 431.
for (let index = 0; index < 210; index += 1) {
  assert(
    "manifest/scope",
    `record-${String(index + 1).padStart(3, "0")}`,
    "immutable diff record identity/status/path",
    equal(identity(manifest.records[index]), identity(observedRecords[index])),
  );
}
let targetNumber = 0;
let absenceNumber = 0;
for (const record of manifest.records) {
  if (record.status === "D") {
    absenceNumber += 1;
    assert("manifest/scope", `absence-${String(absenceNumber).padStart(3, "0")}`, "deleted target is absent", !fs.existsSync(path.join(root, record.path)));
  } else if (record.status === "R100") {
    targetNumber += 1;
    assert("manifest/scope", `target-${String(targetNumber).padStart(3, "0")}`, "rename destination hash matches manifest", sha256(read(record.targetPath)) === record.expectedTargetSha256);
    absenceNumber += 1;
    assert("manifest/scope", `absence-${String(absenceNumber).padStart(3, "0")}`, "rename source is absent", !fs.existsSync(path.join(root, record.sourcePath)));
  } else {
    targetNumber += 1;
    assert("manifest/scope", `target-${String(targetNumber).padStart(3, "0")}`, "materialised target hash matches manifest", sha256(read(record.path)) === record.expectedTargetSha256);
  }
}
const allManifestPaths = manifest.records.flatMap((record) => record.status === "R100" ? [record.sourcePath, record.targetPath] : [record.path]);
const unsafePath = allManifestPaths.some((value) => path.posix.isAbsolute(value) || /^[A-Za-z]:/.test(value) || value.split("/").some((segment) => !segment || segment === "." || segment === ".."));
const approvedNamed = [".env.example", "docs/DESIGN_AND_MESSAGING_AUTHORITY.md", "eslint.config.mjs", "middleware.ts", "next.config.ts", "package-lock.json", "package.json", "tailwind.config.ts", "tsconfig.json", "vercel.json"];
const approvedPrefixes = ["app/", "components/", "lib/", "public/", "supabase/"];
const statusArithmetic = manifest.records.reduce((counts, record) => ({ ...counts, [record.status]: (counts[record.status] ?? 0) + 1 }), {});
assert("manifest/scope", "aggregate-01", "manifest record total is 210", manifest.records.length === 210 && manifest.expected.records === 210);
assert("manifest/scope", "aggregate-02", "status arithmetic is A91/D54/M64/R100-1", equal(statusArithmetic, { A: 91, D: 54, M: 64, R100: 1 }));
assert("manifest/scope", "aggregate-03", "base commit is immutable expected commit", manifest.baseCommit === base && git(["cat-file", "-t", base]).trim() === "commit");
assert("manifest/scope", "aggregate-04", "source commit is immutable expected commit", manifest.sourceCommit === source && git(["cat-file", "-t", source]).trim() === "commit");
assert("manifest/scope", "aggregate-05", "branch identity is expected", manifest.branch === branch && git(["branch", "--show-current"]).trim() === branch);
assert("manifest/scope", "aggregate-06", "approved prefixes are exact", equal(manifest.approvedPrefixes, approvedPrefixes));
assert("manifest/scope", "aggregate-07", "approved named files are exact", equal(manifest.approvedNamedFiles, approvedNamed));
const exactTransformations = ["app/(ops)/data-entry/submissions/page.tsx:remove-extra-final-blank-line", "app/(portal)/portal/reports/page.tsx:remove-extra-final-blank-line", "components/sections/platform-pillars.tsx:remove-extra-final-blank-line", "components/sections/public-cta-strip.tsx:remove-extra-final-blank-line", "lib/auth/access.ts:same-origin-redirect-hardening", "package.json:bounded-seven-script-current-branch-set"].sort();
assert("manifest/scope", "aggregate-08", "exact bounded transformation allowlist exists", equal(manifest.transformations.map((item) => `${item.path}:${item.kind}`).sort(), exactTransformations) && manifest.records.filter((record) => record.transformation).length === 6);
assert("manifest/scope", "aggregate-09", "no absolute/traversal/unapproved path", !unsafePath && allManifestPaths.every((value) => approvedPrefixes.some((prefix) => value.startsWith(prefix)) || approvedNamed.includes(value)));
assert("manifest/scope", "aggregate-10", "no case-colliding path", new Set(allManifestPaths.map((value) => value.toLowerCase())).size === allManifestPaths.length);

// package/imports: 20.
const packageJson = JSON.parse(text("package.json"));
const sourcePackage = JSON.parse(git(["show", `${source}:package.json`]));
const lock = JSON.parse(text("package-lock.json"));
const scriptKeys = ["dev", "build", "start", "lint", "db:bundle", "typecheck", "test:product-database-034G"];
const expectedScripts = { ...Object.fromEntries(scriptKeys.slice(0, 6).map((key) => [key, sourcePackage.scripts[key]])), "test:product-database-034G": "node scripts/test-product-database-integration-034G.mjs" };
for (const key of scriptKeys) assert("package/imports", `script-${key}`, `script ${key} is exact`, packageJson.scripts[key] === expectedScripts[key]);
assert("package/imports", "script-order", "script key set/order is bounded", equal(Object.keys(packageJson.scripts), scriptKeys));
assert("package/imports", "dependencies", "runtime dependencies equal continuity", equal(packageJson.dependencies, sourcePackage.dependencies));
assert("package/imports", "dev-dependencies", "development dependencies equal continuity", equal(packageJson.devDependencies, sourcePackage.devDependencies));
assert("package/imports", "lock-version", "lockfile version is 3", lock.lockfileVersion === 3);
assert("package/imports", "lock-runtime", "lock root runtime dependencies equal package", equal(lock.packages[""].dependencies, packageJson.dependencies));
assert("package/imports", "lock-dev", "lock root development dependencies equal package", equal(lock.packages[""].devDependencies, packageJson.devDependencies));
const sourceFiles = [];
for (const start of ["app", "components", "lib"]) {
  const queue = [path.join(root, start)];
  while (queue.length) {
    const current = queue.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const child = path.join(current, entry.name);
      if (entry.isDirectory()) queue.push(child);
      else if (/\.(?:ts|tsx|js|jsx|mjs)$/.test(entry.name)) sourceFiles.push(child);
    }
  }
}
sourceFiles.push(path.join(root, "middleware.ts"), path.join(root, "next.config.ts"), path.join(root, "eslint.config.mjs"));
const builtins = new Set([...builtinModules, ...builtinModules.map((value) => `node:${value}`)]);
const imports = new Set();
for (const file of sourceFiles) {
  const body = fs.readFileSync(file, "utf8");
  const pattern = /(?:^|\n)\s*(?:import|export)\s+(?:type\s+)?(?:[^"'\n]+?\s+from\s+)?["']([^"']+)["']|\b(?:import|require)\s*\(\s*["']([^"']+)["']/g;
  for (const match of body.matchAll(pattern)) {
    const specifier = match[1] ?? match[2];
    if (specifier.startsWith(".") || specifier.startsWith("@/")) continue;
    if (builtins.has(specifier)) continue;
    const packageName = specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];
    imports.add(packageName);
  }
}
const declared = new Set([...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.devDependencies)]);
assert("package/imports", "external-resolution", "all Product external imports are declared", [...imports].every((value) => declared.has(value)), [...imports].filter((value) => !declared.has(value)).join(","));
assert("package/imports", "server-only", "server-only runtime contract is pinned", packageJson.dependencies["server-only"] === "0.0.1");
assert("package/imports", "nodemailer-runtime", "nodemailer runtime is exact", packageJson.dependencies.nodemailer === "9.0.4");
assert("package/imports", "nodemailer-types", "nodemailer types are exact", packageJson.devDependencies["@types/nodemailer"] === "8.0.1");
assert("package/imports", "supabase-cli", "local Supabase CLI is pinned", packageJson.devDependencies.supabase === "^2.109.1");
assert("package/imports", "deferred-scripts", "deferred continuity scripts are absent", Object.keys(sourcePackage.scripts).filter((key) => !scriptKeys.includes(key)).every((key) => !(key in packageJson.scripts)));
const packageWithBoundedScripts = structuredClone(sourcePackage);
packageWithBoundedScripts.scripts = expectedScripts;
assert("package/imports", "only-script-transformation", "package differs from continuity only by bounded scripts", equal(packageJson, packageWithBoundedScripts));

// migrations: 25 ledger + 10 invariants + 2 SQL tests + 9 verification assets = 46.
const expectedMigrations = Array.from({ length: 25 }, (_, index) => {
  const number = String(index + 1).padStart(4, "0");
  const names = {
    "0001": "initial_schema", "0002": "rls_policies", "0003": "staff_scope_and_permissions", "0004": "staff_rls_extension", "0005": "membership_level_seeds",
    "0006": "stripe_checkout_persistence", "0007": "test_product_seeds", "0008": "launch_membership_permission_seeds", "0009": "biochemistry_test_data_model",
    "0010": "secure_helper_execution", "0011": "definitive_role_matrix_and_comments", "0012": "role_lifecycle_policy_hardening", "0013": "atomic_initial_administrator_claim",
    "0014": "authenticated_biochemistry_comment_soft_delete", "0015": "hardened_authenticated_biochemistry_comment_soft_delete", "0016": "null_safe_authenticated_biochemistry_comment_soft_delete",
    "0017": "valid_null_safe_authenticated_biochemistry_comment_soft_delete", "0018": "test_evidence_upload_and_storage", "0019": "test_evidence_remote_contract_completion",
    "0020": "schema_qualified_pgcrypto_initiation", "0021": "postgresql_filename_extension_parser_correction", "0022": "public_trainer_enquiries",
    "0023": "public_trainer_enquiry_retention_correction", "0024": "versioned_four_loss_biochemistry_scoring", "0025": "user_trend_view_preferences",
  };
  return `${number}_${names[number]}.sql`;
});
const migrationFiles = fs.readdirSync(path.join(root, "supabase/migrations")).filter((value) => value.endsWith(".sql")).sort();
expectedMigrations.forEach((name, index) => assert("migrations", `ledger-${String(index + 1).padStart(2, "0")}`, `migration ledger entry ${index + 1}`, migrationFiles[index] === name));
const migrationText = Object.fromEntries(migrationFiles.map((name) => [name, text(`supabase/migrations/${name}`).toLowerCase()]));
const conflicts = ["0008_client_applications.sql", "0008_professional_equipment_products.sql", "0009_client_applications_policy_fix.sql", "0010_trainer_biochemistry_capture.sql", "0011_biochemistry_session_context.sql", "0014_horse_gallery_storage.sql", "0014_update_professional_kit_price.sql", "0015_etrakka_csv_row_alignment.sql", "0016_etrakka_sheet_preservation.sql"];
assert("migrations", "invariant-01", "migration count is 25", migrationFiles.length === 25);
assert("migrations", "invariant-02", "migration numeric prefixes are unique", new Set(migrationFiles.map((value) => value.slice(0, 4))).size === 25);
assert("migrations", "invariant-03", "migration prefixes are contiguous 0001-0025", migrationFiles.every((value, index) => value.startsWith(String(index + 1).padStart(4, "0"))));
assert("migrations", "invariant-04", "conflicting old-main migration names are absent", conflicts.every((value) => !migrationFiles.includes(value)));
assert("migrations", "invariant-05", "all migrations are lexically clean and statement-bearing", migrationFiles.every((value) => sqlLexicallyClean(text(`supabase/migrations/${value}`))));
assert("migrations", "invariant-06", "helper execution pins search path", migrationText[expectedMigrations[9]].includes("set search_path"));
assert("migrations", "invariant-07", "role hardening includes biochemistry access", migrationText[expectedMigrations[11]].includes("biochemistry"));
assert("migrations", "invariant-08", "initial administrator claim is authenticated and anon-revoked", migrationText[expectedMigrations[12]].includes("auth.uid()") && migrationText[expectedMigrations[12]].includes("anon"));
assert("migrations", "invariant-09", "evidence migration links actor-owned storage objects", migrationText[expectedMigrations[17]].includes("storage.objects.name") && migrationText[expectedMigrations[17]].includes("evidence_upload_attempt"));
assert("migrations", "invariant-10", "enquiry migration defines private trainer enquiries", migrationText[expectedMigrations[21]].includes("trainer_enquiries"));
const sqlTests = ["021_candidate_structure.test.sql", "028B_user_trend_view_preferences.test.sql"];
sqlTests.forEach((name, index) => { const body = text(`supabase/tests/${name}`).toLowerCase(); assert("migrations", `sql-test-${index + 1}`, `SQL test ${name} is transactional pgTAP`, sqlLexicallyClean(body) && body.includes("begin;") && body.includes("select plan(") && body.includes("rollback;")); });
const verificationSql = ["020-biochemistry-readiness.sql", "020C-database-audit.sql", "020E-audit-role-cleanup.sql", "020E-audit-role-setup.sql", "020E-structural-audit.sql", "020F-remote-structure-inventory.sql", "020F-temporary-role-cleanup.sql", "020G-clean-project-verification.sql", "021-role-matrix-structure.sql"];
verificationSql.forEach((name, index) => { const body = text(`supabase/verification/${name}`); assert("migrations", `verification-${index + 1}`, `verification SQL ${name} is lexically clean`, sqlLexicallyClean(body)); });

// roles: 18 executable assertions.
const roleMatrix = await import(pathToFileURL(path.join(root, "lib/auth/role-matrix.ts")).href);
const managed = await import(pathToFileURL(path.join(root, "lib/auth/managed-access-contract.ts")).href);
const exactRoles = ["administrator", "trainer", "stable_manager", "veterinarian", "consultant", "stable_hand"];
exactRoles.forEach((value, index) => assert("roles", `vocabulary-${index + 1}`, `role ${value} is exact`, roleMatrix.OPERATIONAL_ROLES[index] === value));
assert("roles", "reject-null", "null role fails closed", roleMatrix.isOperationalRole(null) === false);
assert("roles", "reject-empty", "empty role fails closed", roleMatrix.isOperationalRole("") === false);
assert("roles", "reject-ambiguous", "near-match role fails closed", roleMatrix.isOperationalRole("admin") === false);
assert("roles", "admin-edit", "administrator edits scoped horse", roleMatrix.canRoleEditHorse("administrator", true) === true);
assert("roles", "trainer-edit", "trainer edits scoped horse", roleMatrix.canRoleEditHorse("trainer", true) === true);
assert("roles", "manager-edit", "stable manager edits scoped horse", roleMatrix.canRoleEditHorse("stable_manager", true) === true);
assert("roles", "vet-read-only", "veterinarian does not edit horse", roleMatrix.canRoleEditHorse("veterinarian", true) === false);
assert("roles", "hand-read-only", "stable hand does not edit horse", roleMatrix.canRoleEditHorse("stable_hand", true) === false);
assert("roles", "scope-required", "actor without scope cannot edit", roleMatrix.canRoleEditHorse("administrator", false) === false);
assert("roles", "managed-vet", "veterinarian is a managed reader", managed.parseManagedAccessRole("veterinarian") === "veterinarian");
assert("roles", "managed-hand", "stable hand is a managed reader", managed.parseManagedAccessRole("stable_hand") === "stable_hand");
assert("roles", "managed-trainer-rejected", "trainer is not parsed as managed reader", managed.parseManagedAccessRole("trainer") === null);

// auth/RLS: 24 structural negative-boundary assertions.
const authPatterns = [
  ["0002_rls_policies.sql", "enable row level security"], ["0002_rls_policies.sql", "users_select_self_or_admin"], ["0002_rls_policies.sql", "horses_select_accessible"], ["0002_rls_policies.sql", "horses_manage_admin_only"],
  ["0011_definitive_role_matrix_and_comments.sql", "can_read_biochemistry_horse"], ["0011_definitive_role_matrix_and_comments.sql", "can_write_biochemistry_horse"], ["0011_definitive_role_matrix_and_comments.sql", "can_comment_biochemistry_horse"], ["0011_definitive_role_matrix_and_comments.sql", "can_manage_biochemistry_comment"],
  ["0011_definitive_role_matrix_and_comments.sql", "from public, anon"], ["0011_definitive_role_matrix_and_comments.sql", "to authenticated"],
  ["0013_atomic_initial_administrator_claim.sql", "claim_initial_administrator"], ["0013_atomic_initial_administrator_claim.sql", "auth.uid()"], ["0013_atomic_initial_administrator_claim.sql", "from public, anon"], ["0013_atomic_initial_administrator_claim.sql", "to authenticated"],
  ["0014_authenticated_biochemistry_comment_soft_delete.sql", "soft_delete_biochemistry_comment"], ["0014_authenticated_biochemistry_comment_soft_delete.sql", "actor_user_id is null"], ["0015_hardened_authenticated_biochemistry_comment_soft_delete.sql", "security definer"], ["0015_hardened_authenticated_biochemistry_comment_soft_delete.sql", "set search_path"],
  ["0016_null_safe_authenticated_biochemistry_comment_soft_delete.sql", "is distinct from true"], ["0016_null_safe_authenticated_biochemistry_comment_soft_delete.sql", "authenticated"], ["0017_valid_null_safe_authenticated_biochemistry_comment_soft_delete.sql", "revoke all"], ["0017_valid_null_safe_authenticated_biochemistry_comment_soft_delete.sql", "grant execute"],
];
authPatterns.forEach(([name, needle], index) => assert("auth/RLS", `contract-${String(index + 1).padStart(2, "0")}`, `${name} contains ${needle}`, text(`supabase/migrations/${name}`).toLowerCase().includes(needle)));
const access = await import(pathToFileURL(path.join(root, "lib/auth/access.ts")).href);
const unsafeRedirects = ["//evil.example", "/\\evil.example", "/%5C%5Cevil.example", "/%2F%2Fevil.example", "/safe\u0000evil", "/safe\r\nevil", "https://evil.example", "javascript:alert(1)"];
assert("auth/RLS", "redirect-negative", "network, backslash, encoded and control-character redirects fail closed", unsafeRedirects.every((value) => access.normalizeAppRedirectPath(value) === "/portal"));
assert("auth/RLS", "redirect-positive", "same-origin local redirect is canonical and preserved", access.normalizeAppRedirectPath("/data-entry?tab=1#focus") === "/data-entry?tab=1#focus");

// evidence: 16 structural safety/ownership assertions.
const evidencePatterns = [
  ["lib/evidence/contracts.ts", "EVIDENCE_MAX_BYTES"], ["lib/evidence/contracts.ts", "EVIDENCE_MAX_FILES_PER_TEST"], ["lib/evidence/contracts.ts", "EVIDENCE_MAX_TEST_BYTES"], ["lib/evidence/contracts.ts", "authorised to upload"], ["lib/evidence/contracts.ts", 'bucket: "test-evidence"'],
  ["lib/evidence/validation.ts", 'mime: "image/jpeg"'], ["lib/evidence/validation.ts", 'mime: "image/png"'], ["lib/evidence/validation.ts", 'mime: "application/pdf"'], ["lib/evidence/validation.ts", 'return { ok: false, code: "unavailable" }'], ["lib/evidence/validation.ts", "EVIDENCE_MAX_BYTES"],
  ["lib/evidence/storage-operations.ts", 'work.bucket !== "test-evidence"'], ["lib/evidence/storage-operations.ts", '!work.key?.startsWith("v1/")'], ["lib/evidence/storage-operations.ts", 'code: "denied"'],
  ["app/api/internal/evidence/reconcile/route.ts", 'header.startsWith("Bearer ")'], ["app/api/internal/evidence/reconcile/route.ts", "process.env.CRON_SECRET"], ["app/api/internal/evidence/reconcile/route.ts", "reconcileBatch(25)"],
];
evidencePatterns.forEach(([file, needle], index) => assert("evidence", `contract-${String(index + 1).padStart(2, "0")}`, `${file} contains evidence contract`, text(file).includes(needle)));

// enquiries/commerce: 16 executable/static assertions.
const enquiries = await import(pathToFileURL(path.join(root, "lib/enquiries/contract.ts")).href);
const validEnquiry = { trainerName: "Alex Trainer", stableName: "River Stable", stableAddress: "Brisbane", phone: "+61 400 000 000", email: "alex@example.com", horseVolume: 12, referredBy: "Referral", acknowledgement: true, website: "", requestId: "123e4567-e89b-12d3-a456-426614174000" };
assert("enquiries/commerce", "parse-object", "non-object enquiry fails", enquiries.parseEnquiryPayload(null).ok === false);
assert("enquiries/commerce", "unknown-key", "unknown enquiry key fails", enquiries.parseEnquiryPayload({ ...validEnquiry, extra: true }).kind === "unknown");
assert("enquiries/commerce", "honeypot", "honeypot enquiry fails", enquiries.parseEnquiryPayload({ ...validEnquiry, website: "bot" }).kind === "honeypot");
assert("enquiries/commerce", "control-char", "control characters fail", enquiries.parseEnquiryPayload({ ...validEnquiry, trainerName: "Alex\u0000" }).ok === false);
assert("enquiries/commerce", "acknowledgement", "missing acknowledgement fails", enquiries.parseEnquiryPayload({ ...validEnquiry, acknowledgement: false }).ok === false);
assert("enquiries/commerce", "horse-volume", "out-of-range horse volume fails", enquiries.parseEnquiryPayload({ ...validEnquiry, horseVolume: 0 }).ok === false);
assert("enquiries/commerce", "valid", "valid enquiry is normalized and accepted", enquiries.parseEnquiryPayload(validEnquiry).ok === true);
assert("enquiries/commerce", "request-id", "invalid request id fails", enquiries.parseEnquiryPayload({ ...validEnquiry, requestId: "bad" }).ok === false);
assert("enquiries/commerce", "origin-null", "missing origin fails", enquiries.requestOriginIsSameHost("https://example.com/api", null, null) === false);
assert("enquiries/commerce", "origin-http", "non-HTTPS origin fails", enquiries.requestOriginIsSameHost("https://example.com/api", "http://example.com", null) === false);
assert("enquiries/commerce", "origin-cross-host", "cross-host origin fails", enquiries.requestOriginIsSameHost("https://example.com/api", "https://evil.example", null) === false);
assert("enquiries/commerce", "origin-valid", "same HTTPS host passes", enquiries.requestOriginIsSameHost("https://example.com/api", "https://example.com", null) === true);
const commerce = text("lib/commerce/commercial-authority.ts");
assert("enquiries/commerce", "commerce-disabled", "commerce is disabled safe", commerce.includes('posture: "commerce-disabled-safe"'));
assert("enquiries/commerce", "checkout-disabled", "checkout is disabled", commerce.includes("checkoutEnabled: false"));
assert("enquiries/commerce", "no-online-payment", "authority states website collects no payment", commerce.includes("The website collects no payment."));
assert("enquiries/commerce", "consultation-led", "authority is consultation-led", commerce.includes("Consultation and accepted written quote only"));

// JSON/config: 10.
assert("JSON/config", "package-json", "package JSON parses", typeof packageJson.name === "string");
assert("JSON/config", "lock-json", "lock JSON parses", typeof lock.name === "string");
const tsconfig = JSON.parse(text("tsconfig.json"));
const vercel = JSON.parse(text("vercel.json"));
assert("JSON/config", "tsconfig-json", "tsconfig JSON parses", tsconfig.compilerOptions.strict === true);
assert("JSON/config", "vercel-json", "Vercel JSON parses", vercel.framework === "nextjs");
const envKeys = text(".env.example").split(/\r?\n/).map((line) => /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/.exec(line)?.[1]).filter(Boolean).sort();
const sourceEnvKeys = git(["show", `${source}:.env.example`]).split(/\r?\n/).map((line) => /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/.exec(line)?.[1]).filter(Boolean).sort();
assert("JSON/config", "env-template-keys", "environment template key names equal continuity", equal(envKeys, sourceEnvKeys));
assert("JSON/config", "middleware-matcher", "middleware excludes static assets", text("middleware.ts").includes("_next/static") && text("middleware.ts").includes("robots.txt"));
assert("JSON/config", "vercel-cron", "enquiry cron route is exact", vercel.crons.length === 1 && vercel.crons[0].path === "/api/internal/enquiries");
assert("JSON/config", "design-authority", "design and messaging authority is present", text("docs/DESIGN_AND_MESSAGING_AUTHORITY.md").toLowerCase().includes("design and messaging authority"));
assert("JSON/config", "next-strict", "Next strict mode is enabled", text("next.config.ts").includes("reactStrictMode: true"));
assert("JSON/config", "path-alias", "TypeScript root alias is exact", equal(tsconfig.compilerOptions.paths["@/*"], ["./*"]));

// exclusions/cleanup: 10 metadata-only checks; protected file contents are never opened.
const trackedDocx = git(["ls-files", "--", "delivery_road_map.docx"]).trim();
const docxDiff = git(["diff", "--name-only", base, "--", "delivery_road_map.docx"]).trim();
const protectedDiff = git(["diff", "--name-only", base, "--", ".env.vercel.production"]).trim();
assert("exclusions/cleanup", "docx-untracked", "excluded DOCX is not tracked", trackedDocx === "");
assert("exclusions/cleanup", "docx-no-diff", "excluded DOCX is absent from diff", docxDiff === "");
assert("exclusions/cleanup", "protected-env-no-diff", "protected environment path is absent from diff", protectedDiff === "");
assert("exclusions/cleanup", "protected-env-no-manifest", "protected environment path is absent from manifest", !allManifestPaths.includes(".env.vercel.production"));
const approvedCurrent = (value) => approvedPrefixes.some((prefix) => value.startsWith(prefix)) || approvedNamed.includes(value)
  || value === "scripts/test-product-database-integration-034G.mjs"
  || value === "delivery_road_map.md"
  || value.startsWith("planning/sprints/034G-product-and-database-integration/")
  || value === "planning/architect-packs/architect-pack-034G-product-and-database-integration.md"
  || value === "planning/reviews/034G-product-and-database-source-manifest.json"
  || value === "planning/reviews/034G-product-and-database-integration.md"
  || ["planning/STATE.md", "planning/DECISIONS.md", "planning/RISKS.md", "planning/QUESTIONS.md", "planning/ROADMAP.md", "planning/STATUS.json", "planning/ARCHITECT_BRIEFING.md"].includes(value);
const changedTracked = git(["diff", "--name-only", base]).split(/\r?\n/).filter(Boolean).map((value) => value.replaceAll("\\", "/"));
const untracked = git(["ls-files", "--others", "--exclude-standard"]).split(/\r?\n/).filter(Boolean).map((value) => value.replaceAll("\\", "/"));
assert("exclusions/cleanup", "tracked-scope", "all tracked changes are in approved 034G scope", changedTracked.every(approvedCurrent), changedTracked.filter((value) => !approvedCurrent(value)).join(","));
assert("exclusions/cleanup", "untracked-scope", "all untracked paths are approved or excluded DOCX", untracked.every((value) => approvedCurrent(value) || value === "delivery_road_map.docx"), untracked.filter((value) => !approvedCurrent(value) && value !== "delivery_road_map.docx").join(","));
assert("exclusions/cleanup", "unstaged-index", "index remains untouched", git(["diff", "--cached", "--name-only"]).trim() === "");
assert("exclusions/cleanup", "head-base", "HEAD remains exact opening base", git(["rev-parse", "HEAD"]).trim() === base);
assert("exclusions/cleanup", "bootstrap-clean", "temporary Fly helper directory is absent", !fs.existsSync(path.join(root, ".fly-bootstrap")));
assert("exclusions/cleanup", "placeholder-clean", "no 034G placeholder/config artifact remains", !fs.readdirSync(root).some((value) => /^\.env.*034g/i.test(value) || /^034g-.*(?:tmp|pid)$/i.test(value)));

const categoryOutput = {};
let totalPassed = 0;
let totalFailed = 0;
for (const [category, expected] of Object.entries(expectedCounts)) {
  const categoryResults = results.filter((result) => result.category === category);
  if (categoryResults.length !== expected) {
    throw new Error(`Assertion inventory drift for ${category}: expected ${expected}, observed ${categoryResults.length}`);
  }
  const failed = categoryResults.filter((result) => !result.passed);
  const passed = categoryResults.length - failed.length;
  categoryOutput[category] = { expected, passed, failed: failed.length };
  totalPassed += passed;
  totalFailed += failed.length;
}
if (results.length !== 591) throw new Error(`Assertion total drift: ${results.length}`);

for (const [category, summary] of Object.entries(categoryOutput)) {
  console.log(`${category}: ${summary.passed}/${summary.expected} passed; ${summary.failed} failed`);
}
console.log(`total: ${totalPassed}/591 passed; ${totalFailed} failed`);
for (const failure of results.filter((result) => !result.passed)) {
  console.error(`FAIL ${failure.category}/${failure.id}: ${failure.description}${failure.detail ? ` (${failure.detail})` : ""}`);
}
if (totalFailed > 0) process.exitCode = 1;
