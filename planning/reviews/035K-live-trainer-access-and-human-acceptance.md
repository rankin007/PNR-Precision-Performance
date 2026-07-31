# Sprint 035K — Live Trainer Access And Human Acceptance

## Pre-mutation baseline — 2026-08-01

- Branch/worktree: `codex/035K-live-trainer-access-and-human-acceptance` in the dedicated clean worktree, opened directly from closed 035I SHA `fe27561e7452909e588182ac1e47155882fc0c8c`.
- Local and remote 035I authority matched exactly before branching. Dirty `develop` was excluded. Sprint 035J remains unapplied.
- Approved Supabase target: `uvskssaecdhxcgytkasc`, project `Precision Performance Clean Rebuild`, production branch. Prohibited old target `tagnbgkroihagjmvehlx` is hard-refused by the helper.
- Current Vercel production: `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, Ready/production. Current application source authority is `7d12e0d229324d8b07bcff7cb76bcc11f4d6477a`.
- Compatible rollback: `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, Ready/production.
- Five stable aliases reconcile across Vercel deployment inspection and alias inventory: apex, `www`, project alias, team project alias and legacy team-qualified project alias. No alias or DNS mutation occurred during baseline proof.
- Supabase Site URL remains `https://precisionperformance.com.au`.
- Auth callbacks are exactly production plus the superseded temporary Preview callback. There is no wildcard. Rotation is deferred until an exact new Preview exists.
- Custom SMTP is enabled with Resend host classification, approved Precision Performance sender, 60-second minimum per-user interval and a saved protected password that was neither revealed nor accessed.
- Magic Link/OTP template classification is exactly one `.Token`, zero `ConfirmationURL` and zero HTTP links. Email OTP length is `6`; expiry is `3600` seconds.
- Preserved identity count remains governed by the prior exact three-identity closeout and zero intervening identity mutation. No unrelated identity was enumerated during this baseline.
- Public website, pricing, visibly disabled enquiry, commerce, schema/migrations/RLS/roles, DNS and unrelated production data remain outside mutation scope.

## Exact production-source-to-035I review

The application-relevant diff from production source `7d12e0d229324d8b07bcff7cb76bcc11f4d6477a` to 035I contains:

- email OTP normalization and allowlisted diagnostics in `app/auth/actions.ts` and `lib/auth/otp-verification.ts`;
- private recovery entry without an extra send in `components/auth/sign-in-form.tsx` and `lib/auth/otp-entry-flow.ts`;
- idempotent authenticated user/profile bootstrap in `lib/auth/bootstrap.ts` and `lib/auth/bootstrap-concurrency.ts`; and
- a Preview-only manual session route retained as historical harness infrastructure. It is unavailable in production and will not be used for 035K human acceptance.

The remaining 035F–035I additions are repository-only protected harnesses/tests and do not add production routes, provider integrations or mailbox automation to the accepted human journey. No Gmail/OAuth helper will be executed.

## Field-minimal synthetic fixture manifest

| Surface | Exact ceiling | Synthetic value/purpose |
| --- | ---: | --- |
| Auth identity | 1 | Exact privately entered tester; reuse unambiguous identity or create one confirmed identity without preparation email |
| Application user | 1 | Active trainer role, private email retained only in governed provider/application storage |
| Member profile | 1 | `Sprint 035K Pilot Trainer` |
| Trainer membership | 1 | Existing `trainer` membership with existing `horse.records.write` link |
| Stable | 1 | `Sprint 035K Synthetic Pilot Stable`, code `PP035K-PILOT` |
| Trainer row | 1 | `Sprint 035K Pilot Trainer` |
| Horse | 1 | `Sprint 035K Synthetic Pilot Horse` |
| Horse assignment | 1 | Existing trainer/write assignment contract |
| Biochemistry access | 1 | Existing trainer/write access contract |
| Biochemistry tests/notes/uploads | 0 | Honest `no-result` state exposes existing capture action |
| Wrong-horse record | 0 | Generated nonexistent UUID; denial proof creates no second horse |
| Storage objects | 0 | No upload or object is permitted |

No real horse, stable, trainer-business, owner, customer, clinical or free-text information is permitted.

## Ownership ledger and cleanup order

The protected helper creates one atomic temporary ledger at `%TEMP%/pnr-035k-live-trainer-access-owned.json`. Durable evidence never contains the tester email, its hash, UUIDs, credentials, OTP, session material or private identifiers. The ledger records exact generated row identifiers, whether Auth was created or adopted, a private email digest, a generated nonexistent denial target and state.

Cleanup order is:

1. biochemistry horse access;
2. horse assignment;
3. horse;
4. trainer;
5. stable;
6. membership;
7. member profile;
8. application user; and
9. Auth last only when 035K created it.

An adopted pre-existing Auth identity is preserved. Cleanup stops on missing/invalid ownership, identity mismatch, partial deletion or non-zero exact-owned verification.

## Deterministic evidence

- Focused 035K helper/auth/dashboard tests: pass.
- Existing email OTP, redirect, bootstrap concurrency, OTP recovery and trainer dashboard tests: pass.
- JSON, domain, roles, Supabase-self and static validation: pass. The first clean-worktree aggregate lacked Playwright resolution; the disposable physical-dependency validation copy supplied equivalent full transport proof, which passed.
- TypeScript: pass.
- Lint: pass with zero warnings/errors.
- Production build: pass from disposable physical-dependency copy; `/sign-in`, `/portal` and `/portal/horses/[horseId]` are present.
- PowerShell parser, `node --check`, encoding and `git diff --check`: pass.
- Tester/provider/fixture/deployment mutation count at this checkpoint: zero.

## Human acceptance status

Not started. The tester must enter their email and OTP privately. No mailbox inspection or automation is permitted. Preview deployment, callback rotation and fixture preparation remain pending the exact committed candidate.

## Acceptance-boundary correction — 2026-08-01

Before repository-history or external mutation, Builder review found that the first helper revision used paginated Auth `listUsers` lookup and did not make every destructive ownership check executable. The user required correction inside the approved 035K files. No live provider call or mutation was used for the correction.

Corrections now enforced:

- Full Auth-user enumeration is absent. Adopted identities require a privately entered exact Auth ID and exact email agreement through `getUserById`. With no exact ID, one confirmed creation may occur; a duplicate response without an exact returned identity fails `EXACT_IDENTITY_CONTRACT_REQUIRED` without processing unrelated identities.
- Every one of the eight application records is reread by exact ledger ID and compared against its synthetic ownership fields before deletion. Missing, replaced, mismatched or unverifiable rows stop `OWNED_ROW_MISMATCH_RECOVERY_REQUIRED` or another sanitized recovery code.
- After dependency-order deletion, the helper independently proves zero for biochemistry access, horse assignment, horse, trainer, stable, membership, member profile and application user. Created Auth is exact-ID/email-digest reverified, deleted last and proven absent. Adopted Auth is exact-ID/email-digest reverified and preserved.
- The ledger remains present and moves to `recovery` on partial deletion, ownership mismatch or failed absence proof. It is removed only after complete proof.
- Retention requires the exact non-sensitive sentence through hidden interactive input. Arguments, environment variables, variants and inference are not accepted; refusal leaves ledger and records unchanged.

Executable deterministic evidence uses an in-memory fake adapter/store and no live provider. It passes **85 assertions**, covering approved/prohibited targets, duplicate-existing ambiguity without enumeration, exact created provisioning, exact adopted matching, fixture collision ceilings, digest mismatch, exact retention/cancellation, deletion order, eight independent zero checks, partial cleanup ledger preservation, Auth-last created cleanup, adopted Auth preservation, replaced-row refusal, private-detail sanitization and zero external mutation across all fake scenarios.

The direct focused command `node --experimental-strip-types scripts/test-live-trainer-access-035K.mjs` passes. The earlier `npm exec` path remains an npm-cache `EPERM` supporting-tool limitation; direct Node execution and the established disposable physical-dependency copy provide equivalent maintained test, typecheck, lint, canonical and production-build proof. This is not a sprint blocker.

External mutation remains zero: no tester provisioning, fixture, callback, provider, deployment, stage, commit or push has occurred.
