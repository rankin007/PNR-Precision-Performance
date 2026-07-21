============================================================
FILE: planning/sprints/021G-automated-authenticated-role-rls-and-application-proof/requirements.md
============================================================

# Sprint 021G - Automated Authenticated Role, RLS, And Application Proof Requirements

## Objective

Execute a fresh, controlled authenticated proof of the applied Sprint 021 role matrix against candidate Supabase project `uvskssaecdhxcgytkasc`, using Builder-owned automation, a protected test-only mailbox, genuine actor sessions, bounded synthetic fixtures, immediate compensation, complete cleanup, and production-only callback restoration.

Sprint 021G is proof-only. A failed assertion must stop the matrix and produce a clean failed outcome; it is not authority to change application behavior, schema, RLS, migrations, or production.

## Workflow Profile

`strict`

## Authoritative Sources

- `AGENTS.md`
- `planning/STATE.md`, `planning/STATUS.json`, and `planning/ARCHITECT_BRIEFING.md`
- applied Sprint 021 and 021B-021F artifacts and reviews
- `docs/SPRINT_021_PROGRESS.md`
- `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`
- migrations `0011_definitive_role_matrix_and_comments.sql` and `0012_role_lifecycle_policy_hardening.sql`
- `lib/auth/role-matrix.ts`, `lib/auth/app-context.ts`, `lib/auth/bootstrap.ts`, and affected authenticated routes/actions
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`

## Permitted Outcomes

Close with exactly one:

- **authenticated-proof-passed-clean**: every mandatory assertion, cleanup, and restoration criterion passes;
- **authenticated-proof-failed-clean**: one or more assertions fail, testing stops, and cleanup/restoration pass; or
- **blocked-clean**: proof cannot begin or complete, but zero owned state and production-only restoration are proved.

Incomplete cleanup is an active incident, not a closeout outcome.

## Immutable Target And Baseline

- Candidate only: `uvskssaecdhxcgytkasc`.
- Absolute refusal target: old project `tagnbgkroihagjmvehlx` and every unexpected project.
- Candidate ledger remains exactly `0001`-`0012`; migrations 0011/0012 are immutable; migration 0013 is prohibited.
- Structural baseline remains 35/35 RLS tables, 87 policies, 22 dispositioned database-advisor warnings, zero errors, zero suggestions, and 1,774 lookups. The hosted leaked-password exception remains separate.
- Start from zero Auth users, zero selected-run anchors, and zero Storage artifacts unless a sanitized read-only preflight proves and explains an approved baseline difference. Any unexplained state stops the sprint.
- Site URL begins and ends `https://precisionperformance.com.au`; the sole final callback is `https://precisionperformance.com.au/auth/callback`.
- Runs `021E-RLS-20260720-01`, `020G-RLS-20260720-01`, and every prior/reserved run are forbidden. Select one fresh run ID matching `021G-RLS-YYYYMMDD-NN` only after zero-anchor preflight.

## Protected Mailbox And Credential Handling

- The test mailbox must meet `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`: test-only, non-personal, accessible, MFA-protected, and plus-alias verified. Every address disclosed in conversation or durable files is prohibited.
- Builder performs all PowerShell, browser, dashboard, API, runtime, harness, assertion, verification, and cleanup work.
- Operator action is limited to signing into the mailbox or completing MFA/provider consent when the provider requires the account owner. Builder must not ask the operator to paste commands, set environment variables, copy links, read OTPs aloud, or disclose the address.
- Prefer existing signed-in Supabase and mailbox browser sessions. Acquire candidate keys through the exact signed-in candidate dashboard and keep them only in protected process memory. Never reproduce values.
- Never store secrets, mailbox address, password, MFA value, OTP, magic link, cookie, token, session, or private identifier in `.env`, `.env.local`, arguments, shell history, clipboard instructions, repository files, planning records, screenshots, logs, tool output, or conversation.
- Builder may inspect run-owned test email content and use single-use links in a protected browser/process, but must not emit message bodies, addresses, links, or tokens.
- Clear all protected variables, sessions, browser state, and runtime state immediately after cleanup.

## Authentication Strategy

1. Prove one genuine end-to-end email delivery and localhost callback using the `ADMIN` plus alias and the actual application callback.
2. Create the remaining nine run-owned synthetic identities through bounded Admin/Auth operations.
3. Establish genuine isolated Supabase Auth sessions for all ten actors. Builder may use protected in-memory admin-generated one-time links for the remaining nine actors; links must traverse supported Supabase Auth exchange and must never enter retained output.
4. Direct RLS and application assertions must use each actor's genuine session, never the secret/service key.
5. The secret/service key is restricted to bounded identity administration, fixture setup, aggregate corroboration, and exact cleanup.

## Actor And Fixture Matrix

Use exactly ten aliases: `ADMIN`, `TRAINER_A`, `TRAINER_B`, `MANAGER_A`, `VET_X`, `CONSULTANT_X`, `HAND_A`, `OWNER_A`, `OWNER_B`, and `SUSPENDED`.

Create exactly two stables (`STABLE_A`, `STABLE_B`) and four horses (`A1`, `A2`, `B1`, `B2`). Establish only the minimum implemented role/profile/membership/ownership/access records required for:

- Trainer A scoped to Stable A and allowed horse A1; Trainer B symmetrically scoped to Stable B/B1;
- Manager A scoped to Stable A;
- Vet X explicitly assigned A1 and B1;
- Consultant X assigned A2 only;
- Hand A in Stable A and assigned A1 only;
- Owner A owns A2; Owner B owns B2;
- SUSPENDED retains an otherwise-valid A1 relationship while inactive.

Ceilings: 10 Auth identities, 10 application users, 10 profiles, 10 primary-role/membership rows, 2 stables, 4 horses, 2 ownership relationships, 10 combined access assignments, 4 biochemistry tests, 12 comments, and zero uploads/Storage objects. Every mutation must be directly run-owned or unambiguously joined to a run-owned object and recorded in an in-memory dependency ledger.

## Mandatory Proof Matrix

- Administrator: global reads, one bounded reversible administration operation, and soft-delete of another actor's comment.
- Trainers: allowed scoped read/write/comment; wrong-horse, peer/cross-stable, self-expansion, peer-management, and promotion denials; one permitted lower-role grant/revoke with immediate fresh-session denial.
- Manager A: accepted Stable A operations; cross-stable, ownership, stable-security, and user-role-management denials.
- Vet X: assigned A1/B1 read/comment including cross-stable; unassigned A2/B2 and underlying-record-edit denials.
- Consultant X: assigned A2 read/comment; all other horses and underlying edits denied.
- Hand A: assigned A1 read/comment; same-stable A2, Stable B, and underlying edits denied.
- Owners: own-horse associated read only; other horses, record edits, comments, comment mutation, self-assignment, and ownership transfer denied.
- SUSPENDED and anonymous: zero protected application-data access.
- Comments: allowed roles create bounded plain text; authors edit/soft-delete own; cross-author mutation denied; Administrator removal allowed; Owner mutation denied; empty and over-2,000-character content rejected with zero persistence.
- Application/RLS agreement: representative protected routes/actions and direct RLS agree for every role class, with no inaccessible-resource disclosure.

## Callback And Runtime

Builder may add exactly `http://localhost:3000/auth/callback` to the candidate callback allowlist for this test window only. Do not change the Site URL or production callback. Verify the two-URL state before runtime. Start the local application in a hidden Builder-owned process against the candidate using process-memory values only. After success, failure, interruption, or stop, remove only localhost and prove production-only restoration.

## Stop, Cleanup, And Recovery

- Default mode is non-mutating. Every mutation requires exact candidate equality, fresh run equality, a mode-specific confirmation internal to Builder automation, ceiling validation, and an initialized ownership ledger.
- Stop at the first failed security/application assertion and move immediately to cleanup/restoration.
- Compensate every partial creation. Delete dependency-safe application rows first and exact run-owned Auth identities last.
- Broad, wildcard, ambiguous, ceiling-exceeding, or manually copied-ID cleanup is prohibited.
- Final proof requires zero run anchors, zero run-owned Auth identities, restored starting Auth/application/Storage counts, zero Storage objects, production-only callback, stopped runtime, cleared protected memory/sessions, ledger still 0001-0012, unchanged structural/advisor baseline, both projects healthy, and old project untouched.

## Approved File Set

Builder may create/update only:

- a new `scripts/supabase-authenticated-proof-021G.mjs` and focused self-test;
- new `planning/reviews/021G-authenticated-proof-manifest.md` and `planning/reviews/021G-authenticated-proof-results.md`;
- `docs/SPRINT_021_PROGRESS.md` and the applied 021G acceptance file for annotations;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, `planning/ARCHITECT_BRIEFING.md`;
- directly relevant 021G entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

No application, library, component, migration, bootstrap, verification SQL, config, dependency, infrastructure, environment, or prior sprint evidence file may be edited.

## Validation

Before mutation: Pack identity, exact diff/source hashes, new harness syntax and refusal/recovery self-tests, existing Sprint 021 focused tests, TypeScript, lint, production build, candidate/old health, exact ledger/structure/advisor state, production-only callback baseline, zero chosen-run anchors, and declared ceilings.

At closeout: complete assertion ledger, cleanup/restoration proof, credential-free checks, final source hashes, JSON parsing, redacted secret/address scan, approved-file diff, and `git diff --check`. Every acceptance item must be individually annotated `pass`, `fail`, or `not-run`; failed/not-run items remain unchecked.

## Prohibitions

- migration 0013 or any schema/RLS/policy/helper/grant/seed/data-model change;
- application/route/action/UI/authorization changes or making a failed assertion pass;
- plaintext `.env` or credential document; disclosed/personal address use;
- password authentication, billing/plan/leaked-password-setting changes;
- real people, customers, horses, clinical/production data, uploads, or Storage objects;
- deployment, Vercel/production environment, cutover, DNS, public reopening, or old-project mutation;
- package installation, staging, commit, push, or PR unless separately requested.

## Manual Intervention Rule

For unavoidable mailbox sign-in, MFA, or provider consent, Builder records the blocker/evidence, exact protected operator action, sanitized response, and subsequent verification. Builder continues all technical work itself. No protected value may be requested in conversation.

============================================================
FILE: planning/sprints/021G-automated-authenticated-role-rls-and-application-proof/blueprint.md
============================================================

# Sprint 021G - Automated Authenticated Role, RLS, And Application Proof Blueprint

## Phase 1: Lock Sources And Build Safety Harness

1. Read all authorities and inventory the dirty worktree without changing unrelated files.
2. Hash migrations, role/auth modules, affected routes/actions, validators, and harness inputs.
3. Create the 021G manifest, assertion catalogue, sanitized evidence schema, actor/fixture ceilings, dependency graph, and stop conditions.
4. Build a new default-nonmutating 021G harness; do not re-enable 021E mutation.
5. Self-test old/unexpected target refusal, all retired-run refusal, missing-secret refusal, unsafe-output refusal, invalid/reused run refusal, ceiling refusal, ambiguity refusal, partial compensation, Auth-last cleanup, callback restoration, and secret clearing.

## Phase 2: Credential-Free Preflight

1. Run focused repository validation, TypeScript, lint, and production build.
2. Verify exact candidate and old-project health, ledger 0001-0012, structural/advisor baseline, zero Auth/application/Storage state, and production-only callback.
3. Select one fresh 021G run ID after zero-anchor proof.
4. Confirm the mailbox-readiness statement is present without recording its address.

## Phase 3: Protected Builder Session

1. Use signed-in candidate dashboard/browser state to acquire required keys into protected process memory without output.
2. Use the signed-in test mailbox; if provider sign-in/MFA is required, pause only for that protected operator action.
3. Derive ten plus aliases in memory, verify uniqueness, and retain only actor aliases.
4. Add localhost callback, verify exact two-URL state, and start the application in a hidden Builder-owned process.

## Phase 4: Identities, Callback, Sessions, And Fixtures

1. Send one genuine ADMIN passwordless message, open it in the protected mailbox, and prove the localhost application callback.
2. Create the other nine identities and establish isolated genuine sessions using supported protected in-memory Auth exchange.
3. Create exact bounded fixtures from the ownership ledger, verifying ceilings after each group.
4. On any failure, stop and run compensation/cleanup.

## Phase 5: Proof Matrix

1. Execute positive cases by role.
2. Execute wrong-horse, same-stable-unassigned, cross-user/cross-stable, escalation, suspended, anonymous, and ownership denials.
3. Execute comment authorship, content boundaries, Administrator removal, and Owner denial.
4. Execute revocation and fresh-session immediate denial.
5. Compare direct RLS with representative application routes/actions for every role class.
6. Record each assertion once using aliases, expected/result class, and pass/fail code only. Stop on first failure.

## Phase 6: Cleanup And Restoration

1. Preview exact dependency-safe cleanup within ceilings.
2. Remove run-owned application state in reverse dependency order and Auth identities last.
3. Clear sessions/process values, stop runtime, remove localhost callback, and close protected contexts.
4. Prove final zero owned state, restored baselines, production-only callback, unchanged ledger/structure/advisors, project health, and old-project integrity.

## Phase 7: Closeout

Classify passed-clean, failed-clean, or blocked-clean from evidence. Update only approved records. Individually annotate every acceptance item, run final local/redacted/diff validation, and refresh the Architect briefing.

============================================================
FILE: planning/sprints/021G-automated-authenticated-role-rls-and-application-proof/acceptance.md
============================================================

# Sprint 021G - Automated Authenticated Role, RLS, And Application Proof Acceptance

- [ ] Applied four-file sprint matches this Pack.
- [ ] Exact candidate is used; old/unexpected projects and every retired run are refused.
- [ ] Ledger remains 0001-0012; migrations 0011/0012 and structural/advisor baseline remain unchanged.
- [ ] Harness defaults non-mutating and passes target, secret, output, run, ceiling, compensation, cleanup, restoration, and clearing self-tests.
- [ ] No protected value/address/identifier is retained or emitted; no plaintext `.env` or credential document exists.
- [ ] Builder performs all technical execution; operator involvement is limited to unavoidable mailbox sign-in/MFA/provider consent.
- [ ] A fresh 021G run begins with zero anchors and declared ceilings.
- [ ] Candidate callback changes only to production plus localhost; Site URL remains unchanged.
- [ ] One real test-mail delivery and application localhost callback succeeds for ADMIN.
- [ ] Exactly ten run-owned identities and ten isolated genuine actor sessions are established.
- [ ] Exact two-stable/four-horse fixture topology and role/ownership/access relationships stay within ceilings.
- [ ] Administrator positive and bounded reversible administration cases pass.
- [ ] Trainer A/B scoped positives, cross-scope denials, escalation denials, and lower-role grant/revoke pass.
- [ ] Manager A positive and cross-stable/security/ownership/role-management denials pass.
- [ ] Vet X, Consultant X, and Hand A assigned positives and unassigned/edit denials pass.
- [ ] Owner A/B own-horse reads and every edit/comment/assignment/transfer/other-horse denial pass.
- [ ] SUSPENDED and anonymous receive zero protected application-data access.
- [ ] Comment create/edit/soft-delete/authorship/Admin/Owner/content-boundary cases pass.
- [ ] Revocation causes immediate fresh-session denial while historical attribution remains.
- [ ] Representative application routes/actions and direct RLS agree for every role class without resource disclosure.
- [ ] Every assertion is recorded exactly once using sanitized aliases and result classes.
- [ ] Testing stops at first failed assertion and compensation begins immediately.
- [ ] Exact dependency-safe cleanup removes application state before Auth identities.
- [ ] Final Auth/run/application/Storage owned counts are zero and starting baselines are restored.
- [ ] Runtime, sessions, protected memory, and browser state are cleared.
- [ ] Localhost callback is removed; production-only callback and Site URL are proved.
- [ ] Candidate/old health, old-project integrity, ledger, structure, and advisor baselines are confirmed after cleanup.
- [ ] Outcome is exactly passed-clean, failed-clean, or blocked-clean and matches evidence.
- [ ] Status, progress, schedule, decisions/risks/questions, results, and Architect briefing agree.
- [ ] Final tests, hashes, JSON, redacted scans, approved diff, and `git diff --check` pass as applicable.
- [ ] No implementation/schema/migration/deployment/cutover/old-project mutation, package install, commit, push, or PR occurs.

Builder must annotate every item `pass`, `fail`, or `not-run` with named evidence/reason. Failed and not-run items remain unchecked. Passed-clean requires all items checked.

============================================================
FILE: planning/sprints/021G-automated-authenticated-role-rls-and-application-proof/handoff-prompt.md
============================================================

# Sprint 021G - Builder Handoff Prompt

You are Builder for Sprint `021G-automated-authenticated-role-rls-and-application-proof` under the strict profile.

Apply this Pack, verify all four generated files, and execute only from them. Target candidate `uvskssaecdhxcgytkasc`; refuse old project `tagnbgkroihagjmvehlx`, every unexpected target, abandoned `021E-RLS-20260720-01`, reserved `020G-RLS-20260720-01`, and every reused run. Use one fresh `021G-RLS-YYYYMMDD-NN` after zero-anchor proof.

Builder owns PowerShell, browser, Supabase dashboard/API, runtime, harness, assertions, cleanup, and restoration. Use existing signed-in sessions and keep keys, mailbox address, OTPs, links, cookies, and sessions only in protected memory. The operator may act only when mailbox sign-in, MFA, or provider consent requires the account owner. Never ask the operator to paste commands, disclose the address, copy a link, or supply protected values in conversation.

Build a new default-nonmutating 021G harness; do not revive 021E mutation. Prove one genuine ADMIN email-to-localhost callback, then establish ten isolated genuine actor sessions and the exact bounded fixture topology. Use actor sessions for RLS/application proof and the secret key only for bounded administration/setup/corroboration/cleanup.

Stop at the first failed assertion. Compensate partial state, remove exact application fixtures in reverse dependency order, delete Auth identities last, clear all protected state, stop runtime, remove localhost callback, and prove zero owned state plus production-only restoration.

Do not change application behavior, authorization, schema, RLS, migrations, bootstrap, config, dependencies, infrastructure, production, or the old project. Prohibit migration 0013, plaintext `.env`/credential storage, disclosed/personal addresses, Storage objects, deployment, cutover, package installation, stage, commit, push, and PR.

Close exactly as authenticated-proof-passed-clean, authenticated-proof-failed-clean, or blocked-clean. Individually annotate every acceptance criterion and never claim passed after a failed/not-run assertion or incomplete cleanup.
