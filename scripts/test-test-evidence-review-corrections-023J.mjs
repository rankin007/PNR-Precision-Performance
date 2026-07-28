import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";

const operationSource = fs.readFileSync("lib/evidence/storage-operations.ts", "utf8")
  .replace('import type { SafeEvidenceResult } from "./contracts";\n', "");
const operationJs = ts.transpileModule(operationSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { deleteVerifyAndComplete } = await import(`data:text/javascript;base64,${Buffer.from(operationJs).toString("base64")}`);

const actions = fs.readFileSync("app/(ops)/data-entry/biochemistry/evidence-actions.ts", "utf8");
const repository = fs.readFileSync("lib/evidence/server/repository.ts", "utf8");
const migration = fs.readFileSync("supabase/migrations/0019_test_evidence_remote_contract_completion.sql", "utf8");

assert(actions.includes("initiateUpload(actor, { ...input, replacesId: predecessorId })"));
assert(!actions.includes('lifecycleMutation(actor, "replace"'));
assert.match(migration, /where id=p_replaces_id and test_id=target\.id and state='available' and replaced_by_id is null for update/);
assert.match(migration, /if predecessor\.id is null then raise exception 'evidence request unavailable'/);
assert.match(migration, /state='blocked',prior_state='uploaded_unverified',reason_code='safety_services_unavailable'/);
assert(!/update public\.biochemistry_test_uploads set[^;]*replaced_by_id/si.test(migration), "unavailable successor must not cut over predecessor");

assert.match(migration, /public\.has_permission\('evidence\.purge'\) is not true/);
assert.match(migration, /upload\.state not in \('soft_deleted','purge_pending'\)/);
assert.match(migration, /exists\(select 1 from public\.evidence_holds where upload_id=upload\.id and released_at is null\)/);
assert.match(migration, /set state='purge_pending',reason_code='storage_delete_pending'/);
assert.match(migration, /complete_test_evidence_purge/);
assert.match(migration, /upload\.state<>'purge_pending'[\s\S]*exists\(select 1 from storage\.objects/);
assert.match(migration, /state='purged'[\s\S]*reason_code='governed_purge_complete'/);

async function scenario({ remove = true, complete = true, bucket = "test-evidence", key = "v1/a/b" } = {}) {
  const calls = [];
  const result = await deleteVerifyAndComplete(
    { uploadId: "upload", testId: "test", bucket, key },
    {
      remove: async () => { calls.push("remove"); return remove; },
      complete: async () => { calls.push("complete"); return complete; },
    },
  );
  return { result, calls };
}

assert.deepEqual(await scenario(), { result: { ok: true, value: undefined }, calls: ["remove", "complete"] });
assert.deepEqual(await scenario({ remove: false }), { result: { ok: false, code: "temporary" }, calls: ["remove"] });
assert.deepEqual(await scenario({ complete: false }), { result: { ok: false, code: "temporary" }, calls: ["remove", "complete"] });
assert.deepEqual((await scenario({ bucket: "other", key: "path" })).result, { ok: false, code: "denied" });

assert(repository.includes('.storage.from(bucket).remove([key])'));
assert(!repository.includes('.schema("storage")'));
assert(!repository.includes("storageObjectExists"));
assert(repository.includes("complete_test_evidence_purge"));
assert(repository.includes("complete_test_evidence_compensation"));
assert.match(migration, /pg_try_advisory_xact_lock\(23019001\)/);
assert.match(migration, /for update skip locked limit p_limit/);
assert.match(migration, /u\.reconciled_at<pg_catalog\.now\(\)-interval '1 minute'/);
assert.match(migration, /expired_object_compensation_pending/);
assert.match(migration, /attempt\.state='expired' and upload\.state='failed' then return true/);
assert.match(migration, /exists\(select 1 from storage\.objects where bucket_id=attempt\.bucket_id and name=attempt\.object_key\)/);
assert.match(migration, /if upload\.state='purged' then return true/);
assert.match(migration, /attempt\.state='expired' and upload\.state='failed' then return true/);
assert.match(migration, /grant execute on function public\.complete_test_evidence_purge\(uuid,uuid\) to service_role/);
assert.match(migration, /grant execute on function public\.complete_test_evidence_compensation\(uuid,uuid\) to service_role/);
assert(!/grant execute on function public\.complete_test_evidence_(purge|compensation)[^;]*to authenticated/i.test(migration));
assert(!repository.includes("console.") && !actions.includes("console."));
assert(repository.includes("return { ok: !failed, processed }"));
assert(!/return \{\s*ok:\s*!failed,\s*processed,\s*(object|bucket|key)/s.test(repository), "server compensation must not return object identity");

console.log("023J replacement, two-phase purge and expired-object compensation behavioral proof passed.");
