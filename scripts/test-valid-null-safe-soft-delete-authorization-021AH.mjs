#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const migration = fs.readFileSync(
  "supabase/migrations/0017_valid_null_safe_authenticated_biochemistry_comment_soft_delete.sql",
  "utf8",
);
const normalized = migration.toLowerCase().replace(/\s+/g, " ");

for (const marker of [
  "actor_is_admin := public.is_admin() is true",
  "actor_is_author := (target_note.created_by_user_id = actor_ids[1]) is true",
  "actor_can_comment := public.can_comment_biochemistry_horse(target_note.horse_id) is true",
  "authorized := actor_is_admin or (actor_is_author and actor_can_comment)",
  "if authorized is not true then",
]) assert.ok(normalized.includes(marker), `missing exact-true marker: ${marker}`);

assert.doesNotMatch(normalized, /(?:pg_catalog|public)\.(?:coalesce|nullif|greatest|least)\s*\(/);
assert.doesNotMatch(normalized, /if\s+not\s*\(\s*public\.is_admin/);
assert.doesNotMatch(normalized, /\breturning\b|\bexception\b|\bexecute\s+format\b/);

const exactTrue = (value) => value === true;
const authorize = (admin, author, canComment) =>
  exactTrue(admin) || (exactTrue(author) && exactTrue(canComment));

for (const values of [
  [null, false, false], [null, null, null], [false, null, null],
  [false, true, null], [false, null, true], [false, false, true],
]) assert.equal(authorize(...values), false);
for (const values of [[true, false, false], [true, null, null], [false, true, true]]) {
  assert.equal(authorize(...values), true);
}

const migration0016 = fs.readFileSync(
  "supabase/migrations/0016_null_safe_authenticated_biochemistry_comment_soft_delete.sql",
  "utf8",
);
assert.match(migration0016, /pg_catalog\.coalesce\s*\(/i, "regression fixture must detect invalid 0016 expression shape");
assert.doesNotMatch(migration, /pg_catalog\.coalesce\s*\(/i);

console.log("021AH valid null-safe soft-delete parser and truth-table contract passed.");
