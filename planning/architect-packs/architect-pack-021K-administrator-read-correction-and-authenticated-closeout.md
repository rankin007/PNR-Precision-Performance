============================================================
FILE: planning/sprints/021K-administrator-read-correction-and-authenticated-closeout/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/021K-administrator-read-correction-and-authenticated-closeout/blueprint.md
============================================================

# Sprint 021K - Administrator Read Correction And Authenticated Closeout Blueprint

## Phase 1: Source Lock And Harness

1. Read all authority, verify Pack identity, inventory the dirty worktree, and hash the approved diagnostic/correction surfaces.
2. Create the diagnosis record and full-proof manifest with retired IDs, ceilings, error allowlist, cleanup graph, and stop conditions.
3. Build a new default-nonmutating 021K harness; preserve prior harnesses unchanged.
4. Self-test target-first loading, target/run refusal, sanitized error classification, genuine-session checks, branch refusal, ceilings, partial compensation, Auth-last cleanup, hosted-config immutability, and clearing.
5. Run existing static/focused tests, TypeScript, lint, build, and credential ignore/untracked checks.

## Phase 2: Minimal Diagnosis

1. Verify exact candidate, opening remote baselines, ledger, structure/advisors, health, and production-only callback.
2. Select a fresh diagnostic identifier and freeze minimal ceilings.
3. Create one genuine Administrator identity/session, matching active application identity/profile/membership, one stable, and one horse.
4. Reproduce the read and capture only allowlisted sanitized error evidence.
5. Diagnose session construction, identity lifecycle, grants/helpers, policy evaluation, and harness-vs-hosted behavior in the required order.
6. State one evidence-backed root cause; clean the diagnostic topology to zero.

## Phase 3: Cause-Matched Correction

1. Choose exactly Branch A, B, or C.
2. Apply only the permitted files and smallest correction.
3. For Branch B, create forward migration 0013, update bootstrap/validators/tests, validate locally, repeat remote guards, and apply once to the candidate.
4. For Branch C, change only the proven auth integration line(s) and focused tests.
5. Stop diagnosis-complete-blocked-clean if the correction is outside approved scope.

## Phase 4: Correction Gate

1. Run regression/refusal tests, static/focused tests, TypeScript, lint, build, hashes, and diff checks.
2. Verify ledger/advisor/structure state appropriate to the branch.
3. With a new diagnostic identifier, prove genuine Administrator one-row horse read plus anonymous and lower-role denial controls.
4. Clean diagnostic state to zero and clear protected/session state.

## Phase 5: Complete Authenticated Reproof

1. Reverify zero baselines and select a fresh `021K-RLS-YYYYMMDD-NN`.
2. Create ten `.invalid` identities, genuine isolated sessions, and exact bounded topology.
3. Execute every direct-RLS positive/denial case, comment boundary, revocation case, and representative application-route comparison.
4. Record each assertion exactly once and stop on first failure.

## Phase 6: Cleanup, Restoration, And Closeout

1. Delete exact run-owned application state in reverse dependency order and Auth identities last.
2. Clear runtime, sessions, cookies, artifacts, protected variables, processes, and browser state.
3. Prove zero diagnostic/full-run state, hosted configuration restoration, ledger/structure/advisor integrity, both-project health, and old-project non-contact.
4. Annotate every acceptance criterion and update only approved durable records.
5. Run final tests, hashes, JSON, redacted scans, ignore/untracked checks, approved-diff review, and `git diff --check`.
6. If passed-clean, close Sprint 021 and recommend return to the main roadmap.

============================================================
FILE: planning/sprints/021K-administrator-read-correction-and-authenticated-closeout/acceptance.md
============================================================

# Sprint 021K - Administrator Read Correction And Authenticated Closeout Acceptance

- [ ] Applied four-file sprint matches this Pack.
- [ ] Dirty-worktree inventory/source hashes are recorded and unrelated changes remain untouched.
- [ ] New 021K harness defaults nonmutating and passes target, run, error-allowlist, session, branch, ceiling, compensation, cleanup, hosted-config, and clearing tests.
- [ ] Existing static/focused tests, TypeScript, lint, production build, and credential ignore/untracked checks pass before diagnosis.
- [ ] Exact candidate, old-project refusal, opening ledger 0001-0012, structure/advisors, health, production-only callback, and zero Auth/application/Storage baselines pass.
- [ ] Minimal diagnostic topology stays within one identity/profile/membership/stable/horse and zero Storage objects.
- [ ] Administrator failure is reproduced or conclusively isolated using a genuine actor session.
- [ ] Sanitized provider/database error code and fixed message category are captured without protected or private data.
- [ ] Session/request construction and actor binding are proved or disproved.
- [ ] Active application identity/profile, Administrator role/membership, and permission mapping are proved or disproved.
- [ ] Authenticated privileges and relevant helper results/execute boundaries are proved or disproved.
- [ ] Horse SELECT policy evaluation, including recursion and permission classes, is proved or disproved.
- [ ] Harness-vs-hosted control requests isolate the failing layer.
- [ ] One exact root cause and one conditional correction branch are recorded before modification.
- [ ] Diagnostic state is cleaned to zero before correction validation.
- [ ] Branch A changes only the new harness, Branch B uses only forward migration 0013/bootstrap/validators, or Branch C changes only the named auth integration files/tests.
- [ ] Any migration correction preserves 0001-0012 immutably, applies 0013 once, and produces exact ledger 0001-0013.
- [ ] Any advisor change is rerun, counted accurately, and individually dispositioned without merging the hosted Auth exception.
- [ ] Regression, denial, static/focused, TypeScript, lint, build, hash, and approved-diff checks pass after correction.
- [ ] A fresh minimal correction check proves Administrator one-row horse read plus anonymous and lower-role denial controls.
- [ ] Correction-check state is cleaned to zero before full reproof.
- [ ] A fresh 021K run begins with authoritative zero anchors and declared full ceilings.
- [ ] Exactly ten deterministic `.invalid` identities and ten genuine isolated candidate sessions are established without delivery or fabricated JWTs.
- [ ] Exact two-stable/four-horse topology and role/ownership/access relationships remain within ceilings.
- [ ] Administrator global positive and bounded reversible administration cases pass.
- [ ] Trainer A/B scoped positives, cross-scope denials, escalation denials, and lower-role grant/revoke pass.
- [ ] Manager A positives and cross-stable/security/ownership/role-management denials pass.
- [ ] Vet X, Consultant X, and Hand A assigned positives and unassigned/edit denials pass.
- [ ] Owner A/B own-horse reads and edit/comment/assignment/transfer/other-horse denials pass.
- [ ] SUSPENDED and anonymous receive zero protected application-data access.
- [ ] Comment creation, authorship mutation, Administrator removal, Owner denial, and content boundaries pass.
- [ ] Revocation causes immediate fresh-session denial while historical attribution remains.
- [ ] Direct RLS assertions use genuine actor sessions and never the service key.
- [ ] Representative application routes/actions agree with direct RLS for every role class without resource disclosure.
- [ ] Every mandatory assertion is recorded exactly once using sanitized aliases/result classes.
- [ ] First failed assertion stops the matrix and initiates compensation/cleanup.
- [ ] Exact cleanup removes dependency-safe application state before Auth identities.
- [ ] Final diagnostic/full-run Auth/application/Storage counts are zero and starting baselines are restored.
- [ ] Runtime, sessions, cookies, artifacts, protected memory, and browser/process state are cleared.
- [ ] Closing hosted configuration, ledger, structure/advisors, project health, old-project non-contact, and ignored credential-file status pass.
- [ ] Outcome is exactly authenticated-role-rls-proof-passed-clean, authenticated-role-rls-proof-failed-clean, diagnosis-complete-blocked-clean, blocked-clean, or credential-incident-contained-clean and matches evidence.
- [ ] Email delivery/passwordless callback proof remains explicitly outside scope and not tested.
- [ ] Sprint 021 closeout accurately distinguishes structural, authenticated, runtime, deployment, and callback readiness.
- [ ] Status, progress, schedule, decisions/risks/questions, results, and Architect briefing agree.
- [ ] Final tests, hashes, JSON, redacted scans, ignore/untracked checks, approved diff, and `git diff --check` pass.
- [ ] No out-of-scope application/configuration/dependency/hosted-setting/deployment/cutover/old-project mutation, package install, stage, commit, push, or PR occurs.

Builder must annotate every item exactly once as `pass`, `fail`, or `not-run` with named evidence or reason. Failed and not-run items remain unchecked. Passed-clean requires complete diagnosis, cause-matched correction, full proof, cleanup, and restoration.

============================================================
FILE: planning/sprints/021K-administrator-read-correction-and-authenticated-closeout/handoff-prompt.md
============================================================

# Sprint 021K - Builder Handoff Prompt

You are Builder for Sprint `021K-administrator-read-correction-and-authenticated-closeout` under the strict profile.

Apply this Pack, verify the four generated sprint files, and execute only from those files.

Reuse the working target-first two-file credential boundary without displaying or editing either environment file. Build a new default-nonmutating 021K harness; preserve 021J unchanged.

Start with the smallest diagnostic topology: one genuine Administrator identity/session, one matching active application identity/profile/membership, one stable, and one horse. Capture only allowlisted sanitized error evidence. Diagnose request construction, application identity lifecycle, grants/helpers, horse SELECT policies, and harness-vs-hosted behavior in order. Record one exact root cause before changing anything.

Choose exactly one correction branch. Correct only the new harness for a harness defect. For a proven database authorization defect, create forward-only migration `0013_administrator_horse_read_correction.sql`, preserve migrations 0001-0012, update bootstrap/role validators, validate locally, apply once to the exact candidate, and verify ledger/advisors. For a proven application session integration defect, change only the named auth integration files and focused tests. Stop diagnosis-complete-blocked-clean if the correction is outside this scope.

After correction, prove a genuine Administrator one-row read and anonymous/lower-role denial controls using fresh diagnostic state, then clean it to zero. Only then select a fresh full 021K run, create the ten genuine `.invalid` actor sessions and exact bounded topology, and execute the entire direct-RLS, comment, denial, revocation, and representative application-route matrix. Do not stop after the Administrator case passes. Stop on the first failed assertion.

Always clean exact application state in dependency-safe order and Auth identities last. Clear runtime, sessions, cookies, artifacts, protected values, processes, and browser state. Prove zero diagnostic/full-run state, unchanged production-only hosted configuration, expected ledger/structure/advisors, both-project health, and old-project non-contact.

Do not expose credentials/private identifiers, fabricate JWTs, use the service key as an actor, use email/mailboxes/OTPs, change callbacks/providers/plans/billing, create Storage objects, install packages, deploy, cut over, stage, commit, push, or create a PR.

Close exactly as authenticated-role-rls-proof-passed-clean, authenticated-role-rls-proof-failed-clean, diagnosis-complete-blocked-clean, blocked-clean, or credential-incident-contained-clean. Annotate every acceptance criterion. If passed-clean, close Sprint 021 and recommend return to the main roadmap; otherwise identify only the smallest evidence-backed remaining scope.
