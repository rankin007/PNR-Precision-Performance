# Sprint 021K - Administrator Read Correction And Authenticated Closeout Requirements

## Objective

Diagnose the Sprint 021J `HORSE_READ_FAILED_ADMIN` operation error to a proven root cause, apply only the cause-matched correction, rerun the complete authenticated role/RLS/comment/revocation/application-route proof, clean all synthetic state, and close Sprint 021 with evidence.

Sprint 021K is a consolidated diagnose-correct-reprove sprint. It must not close merely because the Administrator read is repaired. Successful closeout requires the full ten-actor matrix, representative application agreement, exact cleanup, and restoration.

## Workflow Profile

`strict`

## Authoritative Sources

- `AGENTS.md`
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, and `planning/SPRINT_SCHEDULE.md`
- applied Sprint 021 and 021B-021J artifacts and reviews
- `planning/reviews/021J-authenticated-proof-results.md`
- `planning/reviews/021J-authenticated-proof-manifest.md`
- `scripts/supabase-authenticated-proof-021J.mjs` as diagnosis and safety reference only
- `docs/SPRINT_021_PROGRESS.md`
- migrations `0001`-`0012`, especially `0011_definitive_role_matrix_and_comments.sql` and `0012_role_lifecycle_policy_hardening.sql`
- `supabase/bootstrap/remote-init.sql`
- `lib/auth/role-matrix.ts`, `lib/auth/app-context.ts`, and `lib/auth/bootstrap.ts`
- affected authenticated routes/actions used by the representative proof
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`

Sprint 021J proved target-first credential loading, genuine candidate user sessions, bounded fixture creation, stop-on-first-error behavior, and complete cleanup. It did not prove the authorization matrix. The generic harness code `HORSE_READ_FAILED_ADMIN` is not a root-cause diagnosis.

## Required Outcome Classes

Close with exactly one:

- **authenticated-role-rls-proof-passed-clean**: root cause is proved, any required correction is applied, the complete direct-RLS and representative application matrix passes, and cleanup/restoration pass;
- **authenticated-role-rls-proof-failed-clean**: a genuine authorization/application assertion fails after diagnosis/correction, the matrix stops, and cleanup/restoration pass;
- **diagnosis-complete-blocked-clean**: sanitized evidence proves the required correction lies outside the approved conditional file/remote scope, with zero run-owned state and unchanged/restored remote state;
- **blocked-clean**: an external prerequisite prevents safe diagnosis or reproof, with zero run-owned state and cleared protected state; or
- **credential-incident-contained-clean**: protected output or a target mismatch occurs, execution stops, unexpected remote use does not occur, and all state is zero/cleaned and cleared.

Incomplete cleanup/restoration is an active incident, not a closeout outcome. Email delivery and real passwordless callback certification remain outside 021K.

## Credential And Target Boundary

Reuse the working Sprint 021J operator-managed boundary unchanged:

- `.env.local`: public candidate variables only;
- `.env.test.local`: `SUPABASE_SERVICE_ROLE_KEY` only.

Builder must not edit, display, copy, hash, measure, stage, or inspect either file through tool output. Stage A validates exact candidate `uvskssaecdhxcgytkasc` from `.env.local` before a separate protected Stage B reads `.env.test.local`. Refuse old project `tagnbgkroihagjmvehlx`, unexpected targets, file-schema violations, and protected output.

No operator action is expected if both files remain compliant. If provisioning is missing or invalid, use the exact private two-file intervention from Sprint 021J and accept only the readiness phrase `021K candidate local configuration is ready.` Never request or accept a credential value.

## Phase-Gated Diagnosis Before Correction

Builder must create a new default-nonmutating 021K harness. Do not modify or re-enable the 021J harness.

Use the smallest bounded diagnostic topology: one fresh Administrator Auth identity, one matching application user and active profile, one Administrator membership, one stable, and one horse. Do not create the full ten-actor topology until diagnosis and correction validation pass.

The diagnostic must capture a sanitized PostgREST/database result containing only:

- operation alias;
- success/error class;
- stable provider/database error code where non-sensitive;
- sanitized message category from a fixed allowlist;
- expected/actual row-count class; and
- pass/fail.

Never emit SQL text returned by a provider, query parameters, URLs, credentials, tokens, cookies, UUIDs, identifiers, addresses, schema contents, row contents, or unrestricted error messages/details/hints.

Diagnose in this order:

1. **Session/request construction**
   - genuine session issuer and expiry class;
   - actor binding inside protected memory;
   - Authorization header/session-client behavior;
   - no service-key actor assertion;
   - a harmless authenticated Auth identity check.
2. **Application identity lifecycle**
   - `auth.uid()` maps to exactly one active `public.users` row;
   - exactly one active member profile exists;
   - primary role is `administrator`;
   - active Administrator membership and `platform.admin` permission mapping exist.
3. **Database privileges and helpers**
   - authenticated schema/table SELECT privilege class for `public.horses`;
   - execute availability for the relevant helpers;
   - sanitized boolean results for `is_active_app_user()`, `current_primary_role() = 'administrator'`, `is_admin()`, and `can_access_horse(target)`;
   - fixed search paths and no anonymous execution remain intact.
4. **Horse SELECT policy evaluation**
   - active policies and command/role class for `public.horses`;
   - recursion, permission-denied, ambiguous-overload, missing-function, stale-schema-cache, and generic-operation categories;
   - service-role control read only to prove fixture existence, never as actor evidence.
5. **Harness-vs-database isolation**
   - run the same Administrator user session through a minimal supported Supabase client request;
   - if needed, use an equivalent bounded REST request constructed from the same genuine access token in protected memory;
   - compare sanitized outcome classes to determine whether the fault is request construction or hosted authorization.

Root cause must be stated as one exact class with named evidence before any correction.

## Conditional Correction Branches

Choose exactly one primary branch. Do not combine branches speculatively.

### Branch A: Harness defect

Use when the genuine session and hosted RLS work through the supported control request, but the 021J/initial 021K client construction is wrong.

- Correct only the new 021K harness and its focused tests.
- Do not change application code, migrations, policies, grants, helpers, or hosted configuration.
- Prove the corrected request uses the genuine actor session and cannot silently fall back to anon or service role.

### Branch B: Database authorization defect

Use when sanitized hosted evidence proves a privilege, helper, policy, or recursion defect.

- Create exactly one forward-only migration: `supabase/migrations/0013_administrator_horse_read_correction.sql`.
- Never modify migrations 0001-0012.
- Make the smallest correction that preserves the definitive role matrix and all denial boundaries.
- Preserve fixed safe search paths, no anonymous helper execution, recoverable horse/stable deletion behavior, and existing ownership/comment controls.
- Update `supabase/bootstrap/remote-init.sql` to remain a faithful clean-rebuild equivalent of migration history.
- Extend `scripts/validate-role-matrix-021.ps1` and/or `scripts/test-role-matrix-021.mjs` only for the proven regression and denial guard.
- Validate migration syntax/order, exact diff, helper grants, policy shape, and clean bootstrap equivalence.
- Apply migration 0013 exactly once to candidate `uvskssaecdhxcgytkasc` only after local validation and opening remote guards pass.
- Verify genuine ledger becomes exactly `0001`-`0013`, with 0011/0012 hashes unchanged and 0013 once.
- Re-run Security Advisor and individually disposition any changed warning set; do not conceal or arithmetically merge hosted Auth exceptions.

### Branch C: Application session integration defect

Use only when direct RLS succeeds with the genuine Administrator session but the existing application integration misbinds or loses that session.

- Direct horse-read failure itself must first be explained; Branch C cannot be used to bypass a failing direct-RLS control.
- Edit only `lib/auth/app-context.ts` and/or `lib/auth/bootstrap.ts`, and only the directly proven session-binding lines.
- Add or update focused auth tests for the proven defect.
- Do not change UI, navigation, product behavior, role definitions, schema, RLS, or hosted configuration under this branch.

### Out-of-scope root cause

If the proven correction requires any other application file, dependency, provider setting, callback, password flow, plan/billing change, broad schema rewrite, or external infrastructure, clean completely and close `diagnosis-complete-blocked-clean` with the exact smallest future scope.

## Correction Validation Gate

Before the full matrix:

- rerun static role validation and focused role/comment tests;
- run new regression/refusal tests;
- run TypeScript, lint, and production build;
- verify source hashes and approved diff;
- for Branch B, verify candidate ledger/structure/advisors and immutable earlier migrations;
- recreate only the minimal diagnostic topology with a new fresh diagnostic identifier;
- prove Administrator horse read returns exactly one expected row as a genuine actor session;
- prove anonymous and one unassigned lower-role control remain denied;
- clean the diagnostic topology to zero before starting the full proof.

Do not reuse the diagnostic identity, fixtures, sessions, IDs, or run identifier for the full matrix.

## Full Authenticated Reproof

After the correction gate passes, select one fresh `021K-RLS-YYYYMMDD-NN` after authoritative zero baselines. Refuse all prior identifiers including `021J-RLS-20260721-01` and every diagnostic identifier.

Create the exact Sprint 021J ten actors with deterministic `.invalid` addresses, genuine supported Auth exchange, and isolated sessions:

`ADMIN`, `TRAINER_A`, `TRAINER_B`, `MANAGER_A`, `VET_X`, `CONSULTANT_X`, `HAND_A`, `OWNER_A`, `OWNER_B`, and `SUSPENDED`.

Recreate exactly two stables and four horses with the accepted 021J relationships and the same hard ceilings: 10 Auth identities, 10 application users, 10 profiles, 10 primary role/membership rows, 2 stables, 4 horses, 2 ownerships, 10 combined assignments, 4 biochemistry tests, 12 comments, and zero Storage objects.

Execute and record the complete matrix:

- Administrator global reads, bounded reversible administration, and cross-author comment soft-delete;
- Trainer scoped positives, cross-scope/wrong-horse/peer/escalation denials, and permitted lower-role grant/revoke;
- Manager A Stable A positives and Stable B/ownership/security/user-role denials;
- Vet, Consultant, and Hand assigned positives and unassigned/edit denials;
- Owner own-horse reads and all edit/comment/assignment/transfer/other-horse denials;
- SUSPENDED and anonymous zero protected access;
- comment creation, own mutation, cross-author denial, Administrator removal, Owner denial, and empty/over-2,000 rejection;
- immediate fresh-session revocation denial with historical attribution retained;
- direct RLS as genuine actors, never the service key; and
- representative protected application routes/actions for every role class with direct-RLS agreement and no resource-existence disclosure.

Record every mandatory assertion exactly once using sanitized aliases and result classes. Stop on the first failed assertion and begin cleanup.

## Immutable Remote And Safety Boundaries

- Candidate only: `uvskssaecdhxcgytkasc`; old project is refusal-only and health/non-contact evidence.
- Opening ledger is exactly 0001-0012. Closing ledger is 0001-0012 for Branch A/C or exactly 0001-0013 for Branch B.
- Site URL remains `https://precisionperformance.com.au` and the sole callback remains `https://precisionperformance.com.au/auth/callback`.
- Do not change providers, exposed schemas, passwordless-only posture, leaked-password exception, plan, billing, or credentials.
- No email delivery, mailbox/message access, OTP handling, fabricated JWTs, passwords, uploads, or Storage objects.
- No production deployment, Vercel environment mutation, cutover, DNS, public reopening, Stripe change, package installation, stage, commit, push, or PR.

## Cleanup And Restoration

- Maintain an in-memory ownership ledger for diagnostic and full-proof state.
- Compensate immediately on partial creation.
- Delete exact application state in reverse dependency order and Auth identities last.
- Refuse broad, wildcard, ambiguous, copied-ID, or ceiling-exceeding cleanup.
- Prove zero diagnostic and full-run Auth/application/Storage state.
- Stop runtime and clear sessions, cookies, artifacts, variables, process handles, and browser state.
- Confirm hosted Site URL/callback, project health, old-project non-contact, ledger, structure, advisors, and ignored credential-file status after cleanup.
- Leave `.env.local` and `.env.test.local` untouched and undisplayed for operator disposition.

## Approved File Set

Builder may create/update only:

- new `scripts/supabase-authenticated-proof-021K.mjs` and focused self-test;
- new `planning/reviews/021K-administrator-read-diagnosis.md`;
- new `planning/reviews/021K-authenticated-proof-manifest.md` and `planning/reviews/021K-authenticated-proof-results.md`;
- conditional Branch B: new `supabase/migrations/0013_administrator_horse_read_correction.sql`, `supabase/bootstrap/remote-init.sql`, `scripts/validate-role-matrix-021.ps1`, and `scripts/test-role-matrix-021.mjs`;
- conditional Branch C: `lib/auth/app-context.ts`, `lib/auth/bootstrap.ts`, and directly corresponding focused auth test files already present in the repository;
- `docs/SPRINT_021_PROGRESS.md` and applied 021K acceptance annotations;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, and `planning/ARCHITECT_BRIEFING.md`;
- directly relevant 021K entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

Builder must not edit the operator-managed environment files or any prior migration/harness/evidence file. Any correction outside this set requires a new Architect Pack.

## Validation

Before diagnosis mutation: Pack identity, approved diff/source hashes, new harness self-tests, existing Sprint 021 tests, TypeScript, lint, build, ignored/untracked credential checks, exact target, opening ledger/structure/advisors/health/callback, zero Auth/application/Storage state, and declared diagnostic ceilings.

Before full matrix: named root cause, exact conditional branch, regression and denial tests, successful minimal Administrator read, denied control cases, zero diagnostic state, and for Branch B exact once-only migration/ledger/advisor evidence.

At closeout: complete assertion ledger, cleanup/restoration proof, final hashes, JSON parse, redacted credential/token/private-identifier scan, ignored/untracked checks without content inspection, approved-file diff, and `git diff --check`.

Every acceptance criterion receives exactly one `pass`, `fail`, or `not-run` annotation with named evidence. Failed and not-run criteria remain unchecked.

## Manual Intervention Rule

No manual intervention is expected while the 021J credential files remain compliant. If intervention is required, Builder must record what failed, evidence checked, the exact minimal private action, step-by-step instructions, the safe response only, and subsequent sanitized verification. Never request credentials, file contents, screenshots, identifiers, tokens, links, addresses, or credential-bearing commands.
