# Sprint 023O - Local Correction And Validation

## Baseline

The existing controlled 023L/023N worktree and evidence were preserved with a clean index at commit `a15d89b2f95382d77a3f3ed450e1f4f16f254b51`. Read-only linked verification returned remote/local migrations exactly `0001`–`0019`, once each. Protected exact-project count verification returned Auth/application/Storage/recovery `0/0/0/0` and zero upload, attempt, audit and hold orphans. Migration `0019` canonical SHA-256 remained `67C0877038738EC5D3C4965DE10F3048D37D4E920407C4E675CB948C3450B80A`.

## Additive candidate

Created only `supabase/migrations/0020_schema_qualified_pgcrypto_initiation.sql`. It fails closed unless `pgcrypto` is installed in `extensions` and exact `extensions.digest(text,text)` is present. It then replaces only `public.initiate_test_evidence_upload(uuid,text,text,integer,text,boolean,uuid)`.

Semantic comparison proves the complete function definition is identical to migration `0019` except that the diagnosed unqualified dependency becomes `extensions.digest(p_idempotency_key,'sha256')`. Signature/default, table return, PL/pgSQL volatility, security-definer mode, exact `pg_catalog, public` search path, authority, acknowledgement, MIME/category/size/quota, replacement, lock, idempotency, audit, opaque key, expiry and return behavior are preserved. The migration reasserts Public/anon revocation and authenticated execution, adds the approved comment, creates no other function and contains no destructive or Storage/policy/provider change.

Canonical migration `0020` properties:

- SHA-256: `6E8D9B53C30A988E019796DBD326D7C952CED128623E8F10DF11DE5C4E418F67`;
- byte length: `6557`;
- UTF-8 without BOM, LF endings, one terminating newline.

## Local validation

Passed:

- focused 023O semantic/security/grant proof;
- exact/adversarial `0001`–`0020` ledger proof;
- maintained Sprint 023G ledger adversarial tests;
- focused 023E implementation and migration tests;
- focused 023J signed-direct, migration, replacement, purge and reconciliation tests;
- canonical `validate:ci` and `validate:local` matrices;
- JSON, domain, roles, Supabase self-tests and every static validator;
- full ESLint with zero warnings/errors;
- TypeScript;
- two production builds through the canonical CI/local matrices;
- migration immutability, approved-path, privacy/secret and diff checks at closeout.

The temporary dependency junction and generated `.next` output used for validation were removed without changing the dependency target. No dependency, package or lockfile changed.

Outcome: `pgcrypto-initiation-correction-ready-for-commit`.
