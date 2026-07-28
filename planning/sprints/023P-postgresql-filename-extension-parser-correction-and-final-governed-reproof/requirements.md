# Sprint 023P - PostgreSQL Filename Extension Parser Correction And Final Governed Reproof Requirements

## Exact Boundary

Execute in the existing controlled worktree `C:\tmp\pnr-023l-remote-application-and-hosted-proof` on branch `codex/023L-remote-application-and-hosted-proof`.

The classified runtime defect is exact: under standard-conforming PostgreSQL string semantics, migration `0020` uses a double-backslash regular-expression literal for the filename dot. A valid `.jpg` extension is therefore not extracted, `normal_category` remains null and `public.initiate_test_evidence_upload` raises SQLSTATE `P0001` before authority lookup and before `extensions.digest(...)`.

Sprint 023P may create one additive migration `0021`, focused tests/ledger alignment and approved evidence. It must not edit migrations `0001` through `0020`, application source, Storage policies, dependencies or provider configuration.

## Continuation Baseline

Before Pack application verify:

- HEAD `0330ea8faf09ad7026d186cdac84f2c14bbfc7c0`, parent `a15d89b2f95382d77a3f3ed450e1f4f16f254b51`;
- clean index;
- existing uncommitted delta is limited to the approved 023O runtime proof/evidence harness correction files;
- linked target is exact project `uvskssaecdhxcgytkasc`, Singapore `ap-southeast-1`;
- remote/local ledger exactly `0001` through `0020`, once each, nothing pending;
- migration `0020` applied exactly once and has SHA-256 `6E8D9B53C30A988E019796DBD326D7C952CED128623E8F10DF11DE5C4E418F67`;
- safe runtime classification is SQLSTATE `P0001`, function `public.initiate_test_evidence_upload`, declared extension/MIME validation stage;
- no application RPC or synthetic authority defect exists;
- Auth/application/Storage/recovery and orphan state is `0/0/0/0`; and
- no Vercel Preview configuration or deployment occurred.

Apply this Pack in the existing worktree and preserve all approved 023L/023N/023O evidence. Stop `extension-parser-correction-baseline-blocked-clean` only for a material mismatch.

## Additive Migration `0021`

Create only:

`supabase/migrations/0021_postgresql_filename_extension_parser_correction.sql`

Migration `0021` must:

- `CREATE OR REPLACE` only `public.initiate_test_evidence_upload(uuid,text,text,integer,text,boolean,uuid)`;
- reproduce the exact applied migration `0020` function signature, defaults, table return, volatility, `SECURITY DEFINER`, `search_path = pg_catalog, public` and body semantics;
- change only the extension parser from the diagnosed double-backslash PostgreSQL regex literal to the approved single-backslash regex form that matches the literal dot before the final extension;
- preserve `extensions.digest(p_idempotency_key,'sha256')` and its fail-closed dependency precondition;
- preserve authority, acknowledgement, filename normalisation, MIME/category/size/count/quota, replacement, advisory lock, idempotency, audit, opaque key, expiry and return behavior;
- preserve explicit revocation from `public` and `anon` and execution grant only to `authenticated`;
- update only the function comment needed to identify the additive 023P correction; and
- contain no data rewrite, destructive DDL, policy/Storage/grant expansion or unrelated change.

Do not broaden search path, change accepted formats, enable CSV, weaken fail-closed validation or add another migration.

## Local Proof And Commit Gate

Add focused tests proving:

- migrations `0001` through `0020` are byte-identical;
- candidate ledger is exactly `0001` through `0021`, with missing/gap/duplicate/renamed/`0022+` refusal;
- the `0021` function is semantically identical to `0020` except the exact regex literal and approved comment;
- `.jpg`, `.jpeg`, `.png` and `.pdf` extract and match only their approved MIME types;
- uppercase extensions normalise correctly;
- absent extension, double extension edge cases, trailing text, mismatched MIME, CSV and unknown extensions fail closed;
- `extensions.digest(...)`, restricted search path, signature, return shape and grants remain exact; and
- no production source, Storage policy, dependency or unrelated migration changes.

Run focused 023E/023J/023O/023P tests, exact/adversarial ledger tests, migration immutability, JSON, static/CI/local suites, TypeScript, full ESLint, production build where maintained, approved-path, privacy/secret, generated-artifact and `git diff --check` gates.

Stop `extension-parser-correction-ready-for-commit`, report the combined approved manifest and exact `0021` SHA-256, and request a separate commit instruction. No remote apply may use an uncommitted candidate.

## Remote Apply And Final Governed Proof

After the separate clean commit exists:

1. reconfirm exact target, clean commit, remote ledger `0001` through `0020`, only local `0021` pending, and exact `0/0/0/0`;
2. require supported dry run to select only `0021`;
3. apply `0021` once through the supported linked migration mechanism;
4. verify remote/local ledger exactly `0001` through `0021`;
5. accept the committed migration plus successful governed runtime as primary proof; do not stop for unavailable redundant Docker/schema-dump tooling;
6. create one exact-owned synthetic authority lineage;
7. invoke governed initiation once with valid JPEG metadata, acknowledgement true, unique idempotency key and null replacement;
8. if intent succeeds, transfer one synthetic JPEG with overwrite disabled, finalise fail-closed/unavailable, export over TLS, verify SHA-256, DPAPI encrypt/decrypt and byte agreement;
9. remove the exact object through governed lifecycle/compensation, delete local recovery/restored copies and verify absence; and
10. clean exact fixtures with Auth last and prove final `0/0/0/0` plus zero attempts/audits/holds/leases/orphans.

No blind retry is permitted after a classified runtime result. Do not configure Vercel or deploy during 023P.

## Approved Files

Builder may create/edit only:

- `supabase/migrations/0021_postgresql_filename_extension_parser_correction.sql`;
- focused `scripts/test-*023P*.mjs` and `scripts/supabase-*023P*.mjs`;
- existing approved 023O proof harness/tests only for the already classified reporter/counting corrections, without product-scope expansion;
- exact migration-ledger/static validators and tests only to recognise `0021` without weakening checks;
- `package.json` only for test aliases, with no dependency change;
- `planning/sprints/023P-postgresql-filename-extension-parser-correction-and-final-governed-reproof/**`;
- `planning/reviews/023P-local-parser-correction-and-validation.md`;
- `planning/reviews/023P-remote-0021-and-governed-reproof.md`;
- `planning/reviews/023P-recovery-cleanup-and-023L-resumption.md`;
- `planning/reviews/023P-closeout.md`;
- existing 023L/023N/023O closeouts only to append current linkage;
- `planning/STATUS.json`, `planning/STATE.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/EVIDENCE_INDEX.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md` only for durable outcome; and
- existing approved uncommitted 023O runtime evidence files.

## Manual Intervention And Evidence Proportionality

Stop only for material target, migration, runtime, integrity, privacy/secret or cleanup risk. Use equivalent or stronger evidence when optional tooling is unavailable. Do not create another sprint for Docker, browser automation, reporter, credential, empty-array or redundant metadata-tool limitations.

If genuinely blocked, record the five-part Manual Intervention Rule. Never expose credentials, object keys, filenames, signed URLs, payloads or personal identifiers.
