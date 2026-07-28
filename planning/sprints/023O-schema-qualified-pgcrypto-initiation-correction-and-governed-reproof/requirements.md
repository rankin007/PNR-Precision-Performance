# Sprint 023O - Schema-Qualified Pgcrypto Initiation Correction And Governed Reproof Requirements

## Governing Boundary

Builder executes under the `strict` profile in the existing controlled Sprint 023L/023N worktree `C:\tmp\pnr-023l-remote-application-and-hosted-proof` on branch `codex/023L-remote-application-and-hosted-proof`.

Preserve all approved uncommitted 023L/023N sprint and evidence files. Sprint 023O may create one additive migration `0020`, focused local tests/ledger alignment, 023O evidence and required durable-state updates. It must not edit migrations `0001` through `0019`.

The diagnosed defect is exact: `public.initiate_test_evidence_upload` has `search_path = pg_catalog, public`; `pgcrypto.digest(text,text)` exists only in `extensions`; migration `0019` calls `digest(...)` unqualified. Signature, security-definer status, authenticated grant and application RPC arguments are correct.

## Mandatory Continuation Baseline

Before Pack application verify:

- Git HEAD `a15d89b2f95382d77a3f3ed450e1f4f16f254b51` with clean index;
- existing worktree delta is exactly the approved 023L/023N planning, sprint and evidence set;
- Sprint 023N outcome `governed-initiation-failure-classified-clean` and classification `database-function-resolution-or-grant-defect`;
- linked Supabase target `uvskssaecdhxcgytkasc`, Singapore `ap-southeast-1`;
- remote/local ledger exactly `0001` through `0019`, once each, nothing pending;
- migration `0019` unchanged with SHA-256 `67C0877038738EC5D3C4965DE10F3048D37D4E920407C4E675CB948C3450B80A`;
- post-application structural verification passed;
- Auth/application/Storage/recovery and orphan state `0/0/0/0`; and
- no Preview configuration or deployment occurred.

Apply this Pack in the existing worktree. Stop `pgcrypto-correction-baseline-blocked-clean` on any mismatch.

## Additive Migration `0020`

Create only:

`supabase/migrations/0020_schema_qualified_pgcrypto_initiation.sql`

Migration `0020` must:

- `CREATE OR REPLACE` only the exact existing `public.initiate_test_evidence_upload(uuid,text,text,integer,text,boolean,uuid)` function;
- preserve its parameter names/types/default, table return shape, PL/pgSQL volatility, security-definer property and `search_path = pg_catalog, public`;
- preserve every authority, acknowledgement, category/MIME/size/quota, replacement, lock, idempotency, audit, opaque-key, expiry and return behavior from migration `0019`;
- change the diagnosed call only from `digest(p_idempotency_key,'sha256')` to `extensions.digest(p_idempotency_key,'sha256')`;
- explicitly preserve/reassert revocation from `public` and `anon` and execute grant to `authenticated` without granting any other role;
- update the function comment to identify the additive 023O resolution while preserving the fail-closed contract;
- fail if the `pgcrypto` extension or exact `extensions.digest(text,text)` dependency is absent rather than broadening search path; and
- contain no destructive DDL, data rewrite, Storage change, policy change, role expansion or provider configuration.

Do not add `extensions` to any function search path. Do not relocate the extension, create an alias/wrapper, edit PostgREST exposed schemas or hide another change inside the replacement body.

## Local Proof And Candidate Gate

Add focused tests proving:

- migrations `0001` through `0019` are byte-identical;
- exact contiguous candidate ledger `0001` through `0020`, with missing/gap/duplicate/renamed/`0021+` rejection;
- migration `0020` replaces only the diagnosed function;
- function identity, return shape, security mode and search path remain exact;
- the body agrees semantically with migration `0019` except schema qualification and approved comment/grant assertions;
- `extensions.digest(...)` is exact and unqualified `digest(...)` is absent from the corrected function body;
- no `extensions` search-path widening;
- exact revoke/grant behavior; and
- no source, Storage policy, dependency or unrelated migration change.

Run focused 023E/023J/023N tests, migration/ledger tests, JSON, static/CI/local validation, TypeScript, full ESLint, production build where maintained, secret/privacy scan and `git diff --check`.

After local proof, stop `pgcrypto-initiation-correction-ready-for-commit`. Do not stage or commit without a separate instruction. Report complete combined 023L/023N/023O manifest and exact migration `0020` SHA-256.

Only an exact clean commit created after separate instruction may be remotely applied. Any later correction invalidates that remote-apply candidate.

## Remote And Data Boundary

After the clean candidate commit exists, Builder may resume this sprint using only:

- organisation `hohxquwkfehiuyrysufu`;
- project `uvskssaecdhxcgytkasc`;
- region `ap-southeast-1`, Singapore;
- synthetic non-personal fixtures; and
- protected ignored bindings already validated for this exact project.

Before mutation reconfirm exact target, ledger `0001` through `0019`, only local `0020` pending, zero state and supported dry run selecting only `0020`.

Apply only migration `0020` through the supported linked migration mechanism. Never reset, repair, retry blindly, force, seed, edit history or run unrestricted SQL. Stop on any partial/error result.

## Governed Reproof And Recovery

After remote ledger and read-only function metadata prove exact `0001` through `0020`, exact restricted search path, schema-qualified dependency and expected grant:

1. create one exact-owned synthetic Auth/application lineage through the protected scoped harness;
2. invoke governed initiation once with valid JPEG metadata, bounded bytes, acknowledgement `true`, unique idempotency key and `replacesId = null`;
3. prove an exact intent is returned without exposing object key or signed token;
4. transfer one synthetic object only through the governed exact-intent Storage path with overwrite disabled;
5. finalise only to the expected unavailable/fail-closed state while safety adapters remain absent;
6. export the exact unavailable object through protected TLS, compute its SHA-256, encrypt the recovery copy with DPAPI CurrentUser, restore/decrypt and prove byte agreement;
7. remove the governed Storage object through the approved lifecycle/compensation path, delete recovery/restored copies, and verify logical absence; and
8. clean exact fixtures with Auth last and prove final Auth/application/Storage/recovery `0/0/0/0`, no attempts/audits/holds/leases/orphans.

Do not enable availability, preview/download UI, CSV, scanner/sanitiser fake, Vercel configuration, Preview deployment or Production Cron. Do not manually create/delete Storage catalog rows or bypass governed operations.

## Approved File Set

Builder may create/edit only:

- `supabase/migrations/0020_schema_qualified_pgcrypto_initiation.sql`;
- focused `scripts/test-*023O*.mjs` and `scripts/supabase-*023O*.mjs`;
- exact migration-ledger/static validator and focused test files only where necessary to recognise `0020` without weakening earlier checks;
- `package.json` only for test aliases, with no dependency change;
- `planning/sprints/023O-schema-qualified-pgcrypto-initiation-correction-and-governed-reproof/**`;
- `planning/reviews/023O-local-correction-and-validation.md`;
- `planning/reviews/023O-remote-0020-and-function-proof.md`;
- `planning/reviews/023O-governed-initiation-and-recovery-proof.md`;
- `planning/reviews/023O-cleanup-and-023L-resumption-boundary.md`;
- `planning/reviews/023O-closeout.md`;
- existing `planning/reviews/023L-closeout.md` and `planning/reviews/023N-closeout.md` only to append outcome linkage;
- `planning/STATUS.json`, `planning/STATE.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/EVIDENCE_INDEX.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md` only as required for durable outcome; and
- existing approved uncommitted 023L/023N files without unrelated rewriting.

No other production source, schema, provider, package/lockfile or configuration file may change.

## Manual Intervention Rule

For every blocker record what failed, evidence checked, exact operator action, step-by-step action and Builder verification afterward. Never request or expose credentials, tokens, object keys, filenames, signed URLs or payloads.
