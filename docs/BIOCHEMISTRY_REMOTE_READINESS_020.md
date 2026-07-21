# Sprint 020 - Biochemistry Remote Readiness

## Outcome

Readiness preflight completed on 2026-07-19. Follow-up Sprint 020B operator verification established that the production remote state is **fully applied and structurally verified**. A transaction-wrapped replay attempt stopped on a pre-existing policy and rolled back; no additional remote change was made. See `planning/sprints/020B-remote-biochemistry-verification/VERIFICATION.md`.

## Intended Project Identity

Safe local configuration evidence consistently identifies Supabase project reference `tagnbgkroihagjmvehlx`:

- `.env.local`: `NEXT_PUBLIC_SUPABASE_URL` hostname identifies the project reference.
- `.env.vercel.production`: the same public URL hostname identifies the same project reference.
- `supabase/config.toml`: local development project ID is `pnr-precision-performance`; this is a local label, not the remote project reference.

No secret value or fragment was printed or retained. The intended environment must still be confirmed by the operator as production, staging, or another classification before any write.

## Reviewed Migration

- File: `supabase/migrations/0009_biochemistry_test_data_model.sql`
- SHA-256: `6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9`
- Size: 198,267 bytes
- Expected lookup rows: Carbs `151`, pH Average `521`, Salts `801`, Urea `301`; total `1,774`

Expected effects:

- five tables: lookup values, horse access assignments, tests, uploads metadata, and notes
- three `security definer` access helper functions with fixed `public` search paths
- seven explicit indexes, including the active horse/date/time uniqueness index
- RLS enabled on all five tables
- thirteen named RLS policies
- exact lookup seed upserts keyed by lookup type, exact reading, and source version

The migration depends on existing `public.users`, `public.member_profiles`, `public.stables`, and `public.horses` tables plus helper functions from migrations 0001-0004. It uses `gen_random_uuid()`, which is already used by the existing baseline.

## Safety Review

The migration contains no `drop`, `truncate`, or `delete` statement. Tables and indexes use `if not exists`; helpers use `create or replace`; lookup seeds use conflict-safe updates. Policy creation is intentionally migration-once behavior and would fail on a blind replay if the named policies already exist. The migration is not wrapped in an explicit transaction, so a failed manual SQL-editor execution could leave a partial state. For that reason, do not replay it against an unknown or partial target.

No explicit grants are present. Access therefore depends on the baseline schema privileges plus RLS. Post-apply verification must inspect effective policies and grants before live application smoke. Role-boundary expansion and definitive cross-role proof remain Sprint 021 scope.

## Remote Classification Procedure

Run `supabase/verification/020-biochemistry-readiness.sql` through an approved read-only SQL session. Classify the result:

- **unapplied**: none of the five tables, three helpers, or thirteen policies exists
- **fully applied**: every expected object exists, RLS is enabled, policies/indexes match, lookup counts and uniqueness match
- **partially applied**: only some expected objects exist or lookup counts are incomplete
- **divergent**: objects exist but definitions, constraints, policies, grants, or lookup uniqueness/counts differ
- **inaccessible**: a safe read-only inventory cannot be run

The current classification is **inaccessible**, not unapplied. Local evidence cannot prove remote absence.

## Exact Apply Gate

Do not execute a remote write until all of the following are recorded:

1. Operator confirms project reference `tagnbgkroihagjmvehlx` and its environment classification.
2. Operator confirms a current backup/PITR or an accepted forward-fix posture.
3. Read-only inventory classifies the target as unapplied with dependencies present and no divergence.
4. The file hash still equals the reviewed SHA-256 above.
5. The exact approved migration path applies only migration `0009` after migrations 0001-0008.
6. The user explicitly authorizes that remote mutation after reviewing this evidence.

Expected write volume is five tables, three helpers, seven indexes, thirteen policies, and 1,774 lookup upserts. No customer, horse, stable, trainer, or test fixture row is part of the migration.

## Post-Apply Verification

Immediately rerun the read-only verification SQL and confirm:

- all five tables exist with RLS enabled
- all three helper functions exist once and retain security-definer behavior
- all thirteen policies and seven indexes exist
- exact counts are `151`, `521`, `801`, and `301`, with matching unique reading/version counts
- expected columns, constraints, defaults, foreign keys, and effective grants match migration 0009
- unrelated migration history and schema objects are unchanged
- local scoring/recommendation validators, lint, TypeScript, and build remain green

Authenticated fixtures and application smoke must not begin until fixture ownership and role access are approved.

## Recovery Strategy

If apply fails, stop all writes. Preserve only sanitized error evidence, rerun read-only inventory, classify the partial state, and prepare a reviewed forward-fix. Do not drop tables, truncate rows, reset the database, replay broadly, or delete remote data under Sprint 020.

## Synthetic Fixture Plan

A later non-production smoke needs synthetic-only records owned by a named operator:

1. one synthetic stable
2. one synthetic horse assigned to that stable
3. one synthetic active member/profile with the minimum existing operational-write role
4. one synthetic horse assignment/access row
5. one biochemistry test using the documented scoring fixture readings
6. optional synthetic manual note; no upload fixture

The fixture owner must record environment, identifiers, creation time, purpose, and cleanup responsibility. Do not use real client, trainer, stable, horse, pathology, or customer data. Sprint 021 owns definitive cross-role RLS and denial proof.

## Manual Intervention: Read-Only Remote Access

What is blocked: remote schema/migration classification and environment confirmation.

Evidence checked:

- both safe public environment identities point to project reference `tagnbgkroihagjmvehlx`
- `supabase/.temp` linked-project metadata is absent
- no installed/cached Supabase CLI is available
- no approved database or SQL-editor session is available to Builder

Exact user/operator action needed:

1. Sign in to Supabase without sharing credentials or tokens.
2. Open project reference `tagnbgkroihagjmvehlx` and confirm whether it is production, staging, or another environment.
3. Confirm backup/PITR status without exposing sensitive values.
4. Run `supabase/verification/020-biochemistry-readiness.sql` using a read-only-capable role or approved SQL Editor session.
5. Return the sanitized result sets only; do not include access tokens, passwords, connection strings, customer rows, or other secrets.

Builder will verify the project identity, classify remote state, compare objects/RLS/policies/indexes/counts, and prepare the exact mutation approval gate. No migration will be applied without a new explicit user authorization.

## Manual Intervention: Remote Mutation Approval

What is blocked: migration 0009 application.

Evidence checked: the local migration is reviewed and reproducibly validated, but remote state, environment classification, recovery posture, and explicit mutation approval are absent.

Exact user/operator action needed after read-only preflight passes:

1. Review this document and the sanitized remote inventory.
2. Confirm the verified project reference and environment.
3. Confirm the recovery posture.
4. Explicitly authorize applying the reviewed migration hash.

Builder will recheck the hash, apply only the exact approved migration through the approved path, stop on any mismatch, and run the post-apply read-only verification.
