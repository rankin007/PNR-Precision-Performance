import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const normalize = (text) => text.replace(/\r\n?/g, "\n");
const migration20 = normalize(fs.readFileSync("supabase/migrations/0020_schema_qualified_pgcrypto_initiation.sql", "utf8"));
const migration21 = normalize(fs.readFileSync("supabase/migrations/0021_postgresql_filename_extension_parser_correction.sql", "utf8"));
const extractFunction = (sql) => sql.match(/create or replace function public\.initiate_test_evidence_upload\([\s\S]*?\nend \$\$;/i)?.[0] ?? "";
const function20 = extractFunction(migration20);
const function21 = extractFunction(migration21);
assert(function20 && function21);

const broken = "substring(normal_name from '\\\\.([A-Za-z0-9]+)$')";
const corrected = "substring(normal_name from '\\.([A-Za-z0-9]+)$')";
assert(function20.includes(broken), "0020 must retain the classified double-backslash baseline");
assert(function21.includes(corrected), "0021 must use the single-backslash PostgreSQL regex");
assert(!function21.includes(broken), "0021 must remove the classified regex defect");
assert.equal(function21, function20.replace(broken, () => corrected), "0021 function may differ from 0020 only at the regex literal");

assert.match(function21, /p_replaces_id uuid default null/);
assert.match(function21, /returns table\(attempt_id uuid,upload_id uuid,bucket_id text,object_key text,expires_at timestamptz\)/);
assert.match(function21, /language plpgsql volatile security definer/);
assert.match(function21, /set search_path = pg_catalog, public/);
assert.match(function21, /extensions\.digest\(p_idempotency_key,'sha256'\)/);
assert.doesNotMatch(function21, /search_path[^\n]*extensions/i);
assert.match(migration21, /to_regprocedure\('extensions\.digest\(text,text\)'\) is null/);
assert.match(migration21, /revoke all on function public\.initiate_test_evidence_upload\(uuid,text,text,integer,text,boolean,uuid\) from public, anon/);
assert.match(migration21, /grant execute on function public\.initiate_test_evidence_upload\(uuid,text,text,integer,text,boolean,uuid\) to authenticated/);
assert.doesNotMatch(migration21, /grant execute[^;]*to (?:public|anon|service_role)/i);
assert.equal((migration21.match(/create or replace function/gi) ?? []).length, 1);
assert.equal((migration21.match(/\bcreate\s+(?:table|policy|index|trigger|extension)\b/gi) ?? []).length, 0);

const classify = (name, mime) => {
  const match = name.match(/\.([A-Za-z0-9]+)$/);
  const extension = match?.[1]?.toLowerCase() ?? null;
  if (["jpg", "jpeg"].includes(extension) && mime.toLowerCase() === "image/jpeg") return "jpeg";
  if (extension === "png" && mime.toLowerCase() === "image/png") return "png";
  if (extension === "pdf" && mime.toLowerCase() === "application/pdf") return "pdf";
  return null;
};
for (const [name, mime, expected] of [
  ["proof.jpg", "image/jpeg", "jpeg"], ["proof.jpeg", "image/jpeg", "jpeg"],
  ["proof.png", "image/png", "png"], ["proof.pdf", "application/pdf", "pdf"],
  ["proof.JPG", "image/jpeg", "jpeg"], ["proof.PnG", "image/png", "png"],
]) assert.equal(classify(name, mime), expected);
for (const [name, mime] of [
  ["proof.jpg", "image/png"], ["proof", "image/jpeg"], ["proof.xyz", "image/jpeg"],
  ["proof.jpg.exe", "image/jpeg"], ["proof.jpg.", "image/jpeg"], ["proof.csv", "text/csv"],
  ["proof.CSV", "application/csv"],
]) assert.equal(classify(name, mime), null);

for (let version = 1; version <= 20; version += 1) {
  const prefix = `${String(version).padStart(4, "0")}_`;
  const file = fs.readdirSync("supabase/migrations").find((name) => name.startsWith(prefix));
  assert(file, `missing immutable migration ${prefix}`);
  execFileSync("git", ["diff", "--exit-code", "HEAD", "--", `supabase/migrations/${file}`], { stdio: "pipe" });
}
console.log("023P filename parser semantic, security and input-matrix proof passed.");
