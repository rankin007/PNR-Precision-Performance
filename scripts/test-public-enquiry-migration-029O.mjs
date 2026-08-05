import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const predecessor = readFileSync("supabase/migrations/0022_public_trainer_enquiries.sql");
const sql = readFileSync("supabase/migrations/0023_public_trainer_enquiry_retention_correction.sql", "utf8");
const cleanupBody = sql.match(/create or replace function public\.cleanup_trainer_enquiry_abuse_buckets[\s\S]*?\n\$\$;/i)?.[0] ?? "";
const acceptBody = sql.match(/create or replace function public\.accept_trainer_enquiry[\s\S]*?\n\$\$;/i)?.[0] ?? "";
const proofBody = sql.match(/create or replace function public\.prove_trainer_enquiry_retention[\s\S]*?\n\$\$;/i)?.[0] ?? "";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const match = (pattern, message) => { assertions += 1; assert.match(sql, pattern, message); };

check(createHash("sha256").update(predecessor).digest("hex").toUpperCase() === "F3945FFE4DACE017B0B78CDE80A0FBE823D399DF92BC6CD657230C3C9BB7DF59", "0022 remains byte-identical");
match(/Sprint 029O: correct public trainer-enquiry abuse-hash retention/i, "additive correction identity");
check(!/create table public\.trainer_enquir/i.test(sql), "0023 does not recreate tables");
match(/drop constraint trainer_enquiries_abuse_bucket_hash_fkey/i, "old restrictive FK removed");
match(/alter column abuse_bucket_hash drop not null/i, "temporary link made nullable");
match(/add constraint trainer_enquiries_abuse_bucket_hash_fkey[\s\S]*foreign key \(abuse_bucket_hash\)/i, "replacement FK explicit");
match(/references public\.trainer_enquiry_abuse_buckets\(bucket_hash\)[\s\S]*on delete set null/i, "bucket deletion nulls the link");
check(!/on delete restrict/i.test(sql), "restrict relationship is not recreated");
match(/drop constraint trainer_enquiry_bucket_expiry_check/i, "old expiry constraint removed");
match(/update public\.trainer_enquiry_abuse_buckets[\s\S]*set expires_at = window_started_at \+ interval '2 hours'/i, "existing buckets shortened safely");
match(/add constraint trainer_enquiry_bucket_expiry_check/i, "corrected expiry constraint restored");
match(/check \(expires_at = window_started_at \+ interval '2 hours'\)/i, "two-hour expiry enforced");
check(!/interval '24 hours'/i.test(sql), "no 24-hour bucket retention remains in correction");
match(/v_now \+ interval '90 days'/i, "future enquiry retention remains 90 days");

match(/create or replace function public\.cleanup_trainer_enquiry_abuse_buckets\(p_limit integer default 500\)/i, "bucket-only cleanup function");
check(/p_limit not between 1 and 500/i.test(cleanupBody), "cleanup batch validated");
check(/for update skip locked/i.test(cleanupBody), "cleanup concurrency safe");
check(/limit p_limit/i.test(cleanupBody), "cleanup is bounded");
check(/delete from public\.trainer_enquiry_abuse_buckets[\s\S]*using targets/i.test(cleanupBody), "cleanup physically deletes buckets");
check(!/not exists\s*\(select 1 from public\.trainer_enquiries/i.test(cleanupBody), "cleanup does not wait for enquiry deletion");

check(/create or replace function public\.accept_trainer_enquiry/i.test(acceptBody), "accept function replaced");
check(/cleanup_trainer_enquiry_abuse_buckets\(25\)/i.test(acceptBody), "accepted traffic performs bounded opportunistic cleanup");
check(/p_window_started_at \+ interval '2 hours'/i.test(acceptBody), "accepted bucket uses short expiry");
check(acceptBody.indexOf("where e.idempotency_hash = p_idempotency_hash") < acceptBody.indexOf("cleanup_trainer_enquiry_abuse_buckets(25)"), "replay returns before cleanup or rate consumption");
match(/create or replace function public\.maintain_trainer_enquiries/i, "maintenance function replaced");
match(/select public\.cleanup_trainer_enquiry_abuse_buckets\(p_limit\) into v_buckets/i, "maintenance uses independent bucket cleanup");
match(/create or replace function public\.trainer_enquiry_fixture_status/i, "fixture status remains nullable-link aware");
match(/left join public\.trainer_enquiry_abuse_buckets b on b\.bucket_hash = e\.abuse_bucket_hash/i, "fixture status tolerates a nulled link");
match(/if v_bucket is not null then[\s\S]*else[\s\S]*v_buckets := 0/i, "fixture deletion tolerates a nulled link");
match(/create or replace function public\.prove_trainer_enquiry_rate_limit/i, "rate-limit proof retained");
match(/values\(p_bucket_hash, p_window_started_at, 5, p_window_started_at \+ interval '2 hours'\)/i, "rate-limit proof uses corrected expiry");

match(/create or replace function public\.prove_trainer_enquiry_retention\(\)/i, "retention proof function");
match(/returns table\(enquiry_retained integer, bucket_deleted integer, link_nulled integer, fixture_residue integer\)/i, "retention proof returns only sanitized counts");
check(/2000-01-01 00:00:00\+00/i.test(proofBody) && /2000-01-01 02:00:00\+00/i.test(proofBody), "proof creates an expired two-hour bucket");
check(/insert into public\.trainer_enquiries/i.test(proofBody), "proof creates a surviving linked enquiry");
check(/pg_catalog\.now\(\) \+ interval '90 days'/i.test(proofBody), "proof enquiry remains unexpired");
check(/cleanup_trainer_enquiry_abuse_buckets\(500\)/i.test(proofBody), "proof executes the real bounded cleanup");
check(/v_enquiry_retained[\s\S]*expires_at > pg_catalog\.now\(\)/i.test(proofBody), "proof counts retained enquiry");
check(/v_bucket_deleted[\s\S]*trainer_enquiry_abuse_buckets where bucket_hash = v_bucket_hash/i.test(proofBody), "proof counts physical bucket deletion");
check(/v_link_nulled[\s\S]*abuse_bucket_hash is null/i.test(proofBody), "proof counts nulled FK link");
check(/delete from public\.trainer_enquiries where public_reference = v_reference[\s\S]*v_fixture_residue/i.test(proofBody), "proof self-cleans and reports exact residue");

match(/create or replace function public\.trainer_enquiry_retention_status\(\)/i, "sanitized retention status function");
match(/nullable_link_count integer[\s\S]*not a\.attnotnull/i, "status proves nullable column");
match(/set_null_fk_count integer[\s\S]*ON DELETE SET NULL/i, "status proves set-null FK");
check(/bucket_row_count integer/i.test(sql) && /cleanup_job_count integer/i.test(sql) && /cleanup_job_active_count integer/i.test(sql), "status includes aggregate and exact job counts");
check(/create extension if not exists pg_cron;/i.test(sql) && /trainer-enquiry-abuse-cleanup-hourly/g.test(sql) && /'5 \* \* \* \*'/g.test(sql) && /select public\.cleanup_trainer_enquiry_abuse_buckets\(500\);/g.test(sql), "database-owned minute-5 hourly job has exact identity");
check(/if v_count > 1/i.test(sql) && /v_active is distinct from true/i.test(sql) && /raise exception 'trainer enquiry cleanup job conflict'/i.test(sql), "job conflict and inactive state fail closed");
check(/set search_path = pg_catalog, public/g.test(sql) && /revoke all on function public\.prove_trainer_enquiry_retention\(\) from public, anon, authenticated/i.test(sql) && /grant execute on function public\.prove_trainer_enquiry_retention\(\) to service_role/i.test(sql) && !/create policy|grant execute[\s\S]*to (?:anon|authenticated)|smtp|notification_claim/i.test(cleanupBody), "new functions remain service-only, safe-search-path and bucket-only");

if (assertions !== 48) throw new Error(`Sprint 029O migration assertion target changed: ${assertions}/48`);
console.log(`Sprint 029O migration correction contract passed (${assertions}/${assertions}).`);
