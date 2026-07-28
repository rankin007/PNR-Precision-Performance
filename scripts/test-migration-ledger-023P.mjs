import assert from "node:assert/strict";
import fs from "node:fs";

const actual = fs.readdirSync("supabase/migrations").filter((name) => /^\d/.test(name)).sort();
const expected = Array.from({ length: 21 }, (_, index) => String(index + 1).padStart(4, "0"));
function validate(names) {
  assert(names.every((name) => /^\d{4}_.+\.sql$/.test(name)), "malformed filename");
  const versions = names.map((name) => name.slice(0, 4));
  assert.equal(new Set(versions).size, versions.length, "duplicate version");
  assert.deepEqual(versions, expected, "ledger must be exactly 0001-0021");
  assert.equal(names.at(-1), "0021_postgresql_filename_extension_parser_correction.sql", "0021 identity");
}
validate(actual);
const mustReject = (mutate) => assert.throws(() => validate(mutate([...actual])));
mustReject((names) => names.filter((name) => !name.startsWith("0007_")));
mustReject((names) => [...names, "0007_duplicate.sql"].sort());
mustReject((names) => names.map((name) => name.startsWith("0021_") ? "0021_renamed.sql" : name));
mustReject((names) => [...names, "0022_future.sql"].sort());
mustReject((names) => names.map((name) => name.startsWith("0012_") ? "012_bad.sql" : name));
console.log("023P exact/adversarial candidate ledger proof passed.");
