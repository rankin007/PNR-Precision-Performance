import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const migration19Path = "supabase/migrations/0019_test_evidence_remote_contract_completion.sql";
const migration20Path = "supabase/migrations/0020_schema_qualified_pgcrypto_initiation.sql";
const migration19 = fs.readFileSync(migration19Path, "utf8").replace(/\r\n?/g, "\n");
const migration20 = fs.readFileSync(migration20Path, "utf8").replace(/\r\n?/g, "\n");
const canonicalHash = (text) => crypto.createHash("sha256").update(Buffer.from(text.replace(/^\uFEFF/, "").replace(/\n*$/, "") + "\n", "utf8")).digest("hex").toUpperCase();

assert.equal(canonicalHash(migration19), "67C0877038738EC5D3C4965DE10F3048D37D4E920407C4E675CB948C3450B80A");
for (let version = 1; version <= 19; version += 1) {
  const prefix = String(version).padStart(4, "0") + "_";
  const file = fs.readdirSync("supabase/migrations").find((name) => name.startsWith(prefix));
  assert(file, `missing immutable migration ${prefix}`);
  execFileSync("git", ["diff", "--exit-code", "HEAD", "--", `supabase/migrations/${file}`], { stdio: "pipe" });
}

const extractFunction = (sql) => sql.match(/create or replace function public\.initiate_test_evidence_upload\([\s\S]*?\nend \$\$;/i)?.[0] ?? "";
const function19 = extractFunction(migration19);
const function20 = extractFunction(migration20);
assert(function19 && function20);
const expected20 = function19.replace("digest(p_idempotency_key,'sha256')", "extensions.digest(p_idempotency_key,'sha256')");
assert.equal(function20, expected20, "0020 function must differ from 0019 only by schema qualification");
assert.match(function20, /p_replaces_id uuid default null/);
assert.match(function20, /returns table\(attempt_id uuid,upload_id uuid,bucket_id text,object_key text,expires_at timestamptz\)/);
assert.match(function20, /language plpgsql volatile security definer/);
assert.match(function20, /set search_path = pg_catalog, public/);
assert.match(function20, /extensions\.digest\(p_idempotency_key,'sha256'\)/);
assert.doesNotMatch(function20, /(?<![.])\bdigest\(p_idempotency_key/);
assert.doesNotMatch(function20, /search_path[^\n]*extensions/i);

assert.match(migration20, /pg_catalog\.to_regprocedure\('extensions\.digest\(text,text\)'\) is null/);
assert.match(migration20, /raise exception 'required pgcrypto dependency unavailable'/);
assert.equal((migration20.match(/create or replace function/gi) ?? []).length, 1);
assert.equal((migration20.match(/\bcreate\s+(?:table|policy|index|trigger|extension)\b/gi) ?? []).length, 0);
assert.doesNotMatch(migration20, /^\s*(?:drop\b|truncate\b|delete\s+from\b|update\s+)/im);
assert.match(migration20, /revoke all on function public\.initiate_test_evidence_upload\(uuid,text,text,integer,text,boolean,uuid\) from public, anon/);
assert.match(migration20, /grant execute on function public\.initiate_test_evidence_upload\(uuid,text,text,integer,text,boolean,uuid\) to authenticated/);
assert.doesNotMatch(migration20, /grant execute[^;]*to (?:public|anon|service_role)/i);
assert.match(migration20, /Sprint 023O additive pgcrypto resolution/);

const migrations = fs.readdirSync("supabase/migrations").filter((name) => /^\d{4}_.+\.sql$/.test(name)).sort();
assert.deepEqual(migrations.map((name) => name.slice(0, 4)), Array.from({ length: 20 }, (_, i) => String(i + 1).padStart(4, "0")));
assert.equal(migrations.at(-1), "0020_schema_qualified_pgcrypto_initiation.sql");
console.log(`023O pgcrypto correction semantic/security proof passed; 0020 SHA-256 ${canonicalHash(migration20)}`);
