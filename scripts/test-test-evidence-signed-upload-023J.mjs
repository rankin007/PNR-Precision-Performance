import assert from "node:assert/strict";
import fs from "node:fs";

const repository = fs.readFileSync("lib/evidence/server/repository.ts", "utf8");
const actions = fs.readFileSync("app/(ops)/data-entry/biochemistry/evidence-actions.ts", "utf8");
const ui = fs.readFileSync("components/ops/test-evidence-upload.tsx", "utf8");
const route = fs.readFileSync("app/api/internal/evidence/reconcile/route.ts", "utf8");

for (const marker of [
  "p_acknowledgement: input.acknowledgement", "p_replaces_id: input.replacesId ?? null",
  "createSignedUploadUrl(row.object_key, { upsert: false })", "signed.data.token",
  "uploadToSignedUrl", "contentType: file.type, upsert: false", "finaliseEvidenceUpload",
  "cancelEvidenceUpload", "crypto.randomUUID()", "CSV remains disabled",
  "approved safety services are not configured",
]) assert((repository + ui).includes(marker), marker);

assert(actions.includes('lifecycleMutation(actor, "finalise"'));
assert(actions.includes("initiateUpload(actor, { ...input, replacesId: predecessorId })"));
assert(!actions.includes('lifecycleMutation(actor, "replace"'));
assert(route.includes("timingSafeEqual") && route.includes("Math.min(Math.max(limit, 1), 50)") === false);
assert(repository.includes("Math.min(Math.max(limit, 1), 50)"));
assert(repository.includes("governedPurge") && repository.includes("complete_test_evidence_purge"));
assert(repository.includes("complete_test_evidence_compensation"));
assert(!repository.includes('.schema("storage")'));
assert(!ui.includes("signedUrl") && !ui.includes("signed.signedUrl"), "signed URL must not be persisted or exposed to upload UI");
assert(!repository.includes("console.") && !ui.includes("console.") && !route.includes("console."));
assert(!ui.includes("text/csv") && !ui.includes("application/csv"));
console.log("023J signed-direct upload and fail-closed UI contract proof passed.");
