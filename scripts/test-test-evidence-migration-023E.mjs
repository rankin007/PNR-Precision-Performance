import assert from "node:assert/strict";
import fs from "node:fs";

const path = "supabase/migrations/0018_test_evidence_upload_and_storage.sql";
const sql = fs.readFileSync(path, "utf8");
const inventory = sql.indexOf("legacy inventory requires governed remediation");
const backfill = sql.indexOf("update public.biochemistry_test_uploads");
const drop = sql.indexOf("drop constraint biochemistry_test_uploads_file_category_check");
assert(inventory > 0 && inventory < backfill && backfill < drop, "inventory/backfill/constraint order");
for (const token of [
  "biochemistry_test_uploads_size_bytes_check", "legacy_unverified", "uploads_test_horse_stable_fk",
  "biochemistry_tests_id_horse_stable_uq", "version_group_id", "uploads_version_uq",
  "invalid evidence lineage", "cyclic evidence lineage", "pg_advisory_xact_lock",
  "evidence_upload_attempts", "evidence_csv_registry", "evidence_holds", "evidence_audit_events",
  "enable row level security", "revoke insert, update, delete",
]) assert(sql.includes(token), token);
assert.match(sql, /size_bytes between 1 and 5242880/);
assert.match(sql, /state <> 'available'.*scan_outcome='clean'.*sanitisation_outcome='passed'/s);
const migrations = fs.readdirSync("supabase/migrations").filter((name) => /^\d{4}_/.test(name)).sort();
assert(migrations.includes("0018_test_evidence_upload_and_storage.sql"));
assert.equal(migrations.at(-1), "0020_schema_qualified_pgcrypto_initiation.sql");
assert.equal(migrations.length, 20);
console.log("023E migration structural proof passed (candidate SQL not applied).");
