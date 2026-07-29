import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { safeEvidenceStatus } from "../components/ops/test-evidence-state.ts";

const manifest = JSON.parse(readFileSync(new URL("./fixtures/026-test-evidence/manifest.json", import.meta.url), "utf8"));
const contracts = readFileSync(new URL("../lib/evidence/contracts.ts", import.meta.url), "utf8");
const repository = readFileSync(new URL("../lib/evidence/server/repository.ts", import.meta.url), "utf8");
const manager = readFileSync(new URL("../components/ops/test-evidence-manager.tsx", import.meta.url), "utf8");
const upload = readFileSync(new URL("../components/ops/test-evidence-upload.tsx", import.meta.url), "utf8");

for (const state of manifest.states) {
  const [label, context] = safeEvidenceStatus(state);
  assert.ok(label.length > 3 && context.length > 10, `${state} has non-colour copy`);
}
assert.deepEqual(safeEvidenceStatus("forged-state"), ["Status unavailable", "The evidence state is unexpected. No action is available."]);
assert.match(repository, /select\("id,display_name,file_category,size_bytes,state,version_no,created_at,updated_at,replaces_id,replaced_by_id,restore_until,purge_eligible_at"\)/);
for (const forbidden of ["object_key", "bucket_id", "token", "signedUrl", "hash"]) {
  assert.doesNotMatch(contracts.match(/export type SafeEvidenceMetadata[\s\S]*?\n};/)?.[0] ?? "", new RegExp(forbidden, "i"));
}
assert.match(repository, /permissionCodes\?\.includes\("evidence\.purge"\)/);
assert.match(repository, /purgeEligible && !held/);
assert.match(repository, /restore: administrator/);
assert.match(repository, /replace: row\.state === "available" && !row\.replaced_by_id/);
assert.doesNotMatch(manager, /requestEvidenceDownload|href=.*evidence|preview/i);
assert.match(manager, /window\.confirm/);
assert.match(manager, /disabled=\{pending\}/);
assert.match(manager, /aria-live="polite"/);
assert.match(manager, /min-h-11/);
assert.match(manager, /Singapore, outside Australia/);
assert.match(upload, /accept="image\/jpeg,image\/png,application\/pdf"/);
assert.match(upload, /CSV remains disabled/);
assert.match(upload, /upsert: false/);
assert.match(upload, /predecessorId \? await replaceEvidence/);
assert.match(upload, /useState\(false\)/);
console.log("Sprint 026 evidence-management contracts passed.");
