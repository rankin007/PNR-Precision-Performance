import assert from "node:assert/strict";
import fs from "node:fs";

const path = "supabase/migrations/0019_test_evidence_remote_contract_completion.sql";
const sql = fs.readFileSync(path, "utf8");

for (const marker of [
  "insert into storage.buckets", "'test-evidence'", "false,5242880",
  "array['image/jpeg','image/png','application/pdf']", "test_evidence_exact_intent_insert",
  "can_insert_test_evidence_object", "a.expires_at>pg_catalog.now()",
  "initiate_test_evidence_upload", "auth.uid()", "can_write_biochemistry_horse",
  "pg_advisory_xact_lock", "idempotency_key_hash", "31457280", "p_acknowledgement is not true",
  "mutate_test_evidence_lifecycle", "safety_services_unavailable",
  "reconcile_test_evidence_batch", "pg_try_advisory_xact_lock", "for update skip locked",
  "complete_test_evidence_purge", "complete_test_evidence_compensation",
  "storage_delete_pending", "expired_object_compensation_pending", "object_absence_verified",
  "evidence.purge", "to service_role", "candidate repository contract",
]) assert(sql.includes(marker), marker);

const bucketStatement = sql.match(/insert into storage\.buckets[\s\S]*?;/i)?.[0] ?? "";
assert(!bucketStatement.includes("text/csv") && !bucketStatement.includes("application/csv"), "CSV must not be enabled in bucket MIME types");
const policyStatements = [...sql.matchAll(/create\s+policy[\s\S]*?;/gi)].map((match) => match[0]);
assert.equal(policyStatements.length, 1);
assert(!policyStatements.some((statement) => /for\s+(select|update|delete)/i.test(statement)), "ordinary Storage read/update/delete policy prohibited");
assert(!/with\s+check\s*\(\s*true\s*\)/i.test(sql), "permissive policy prohibited");
assert.match(sql, /revoke all on function public\.reconcile_test_evidence_batch\(integer\) from public, anon, authenticated/i);
assert.match(sql, /p_operation not in \('finalise','cancel','soft_delete','request_restore','restore','create_hold','release_hold','purge'\)/);
assert.match(sql, /state='blocked',prior_state='uploaded_unverified',reason_code='safety_services_unavailable'/);
assert.match(sql, /revoke all on function public\.complete_test_evidence_purge\(uuid,uuid\) from public, anon, authenticated/i);
assert.match(sql, /revoke all on function public\.complete_test_evidence_compensation\(uuid,uuid\) from public, anon, authenticated/i);
assert.match(sql, /grant execute on function public\.complete_test_evidence_purge\(uuid,uuid\) to service_role/i);
assert.match(sql, /grant execute on function public\.complete_test_evidence_compensation\(uuid,uuid\) to service_role/i);
assert.match(sql, /if upload\.state='purged' then return true/);
assert.match(sql, /if attempt\.state='expired' and upload\.state='failed' then return true/);

const migrations = fs.readdirSync("supabase/migrations").filter((name) => /^\d{4}_/.test(name)).sort();
assert.deepEqual(migrations.map((name) => name.slice(0, 4)), Array.from({ length: 21 }, (_, i) => String(i + 1).padStart(4, "0")));
assert.equal(migrations.at(-1), "0021_postgresql_filename_extension_parser_correction.sql");
console.log("023J additive migration/RPC/private Storage contract proof passed (candidate only; not applied). ");
