============================================================
FILE: planning/sprints/021H-mailbox-independent-authenticated-role-rls-proof/requirements.md
============================================================

# Sprint 021H - Mailbox-Independent Authenticated Role And RLS Proof Requirements

## Objective

Prove the applied Sprint 021 authorization model against candidate Supabase project `uvskssaecdhxcgytkasc` using deterministic non-routable synthetic identities, genuine isolated Supabase Auth sessions, bounded run-owned fixtures, direct RLS checks, representative application-route checks, revocation, and complete cleanup.

Sprint 021H deliberately separates authorization proof from email transport and passwordless callback certification. It must not access a mailbox, send email, inspect message metadata, request an OTP, or change callback configuration.

## Workflow Profile

`strict`

## Authoritative Sources

- `AGENTS.md`
- `planning/STATE.md`, `planning/STATUS.json`, and `planning/ARCHITECT_BRIEFING.md`
- applied Sprint 021 and 021B-021G artifacts and reviews
- `docs/SPRINT_021_PROGRESS.md`
- migrations `0011_definitive_role_matrix_and_comments.sql` and `0012_role_lifecycle_policy_hardening.sql`
- `lib/auth/role-matrix.ts`, `lib/auth/app-context.ts`, `lib/auth/bootstrap.ts`, and affected authenticated routes/actions
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`

Sprint 021G is closed `blocked-clean`. Its mailbox failure is not an application/RLS failure and its run state must not be reused.

## Permitted Outcomes

Close with exactly one:

- **authenticated-role-rls-proof-passed-clean**: every mandatory actor, positive, denial, revocation, direct-RLS, representative application-route, cleanup, and restoration criterion passes;
- **authenticated-role-rls-proof-failed-clean**: an authorization/application assertion fails, the matrix stops, and exact cleanup/restoration pass; or
- **blocked-clean**: the proof cannot begin or complete for an environmental reason, but zero owned state and unchanged hosted configuration are proved.

Email delivery and real passwordless callback remain explicitly **not tested** under every outcome. Incomplete cleanup is an active incident, never a clean closeout.

## Immutable Target And Baseline

- Candidate only: `uvskssaecdhxcgytkasc`.
- Absolute refusal target: protected old project `tagnbgkroihagjmvehlx` and every unexpected project.
- Candidate ledger remains exactly `0001`-`0012`; migrations 0011/0012 are immutable; migration 0013 is prohibited.
- Structural baseline remains 35/35 RLS tables, 87 policies, 22 dispositioned database-advisor warnings, zero errors, zero suggestions, and 1,774 lookups. The hosted leaked-password exception remains separate.
- Starting candidate Auth users, selected-run application anchors, and Storage artifacts must be zero unless a sanitized authoritative preflight explains an approved difference. Any unexplained state stops execution.
- Site URL and the sole production callback must remain unchanged. No localhost callback may be added.
- Permanently refuse `020G-RLS-20260720-01`, `021E-RLS-20260720-01`, every 021G attempt/reservation, and every prior/reused run.
- Select one fresh run ID matching `021H-RLS-YYYYMMDD-NN` only after authoritative zero-anchor preflight.

## Protected Credential Handling

- Builder owns PowerShell, browser/dashboard, API, runtime, harness, assertion, verification, cleanup, and restoration work.
- Acquire the exact candidate publishable and secret/service credentials from an existing signed-in candidate dashboard or system credential store and keep them only in protected process memory.
- Never reproduce, retain, or write a credential, generated link, token hash, access/refresh token, cookie, Auth UUID, or private identifier in `.env`, `.env.local`, command arguments, shell history, clipboard instructions, repository files, planning records, screenshots, logs, tool output, or conversation.
- Emit only allowlisted run IDs, actor/fixture aliases, aggregate counts, expected/result classes, message codes, and pass/fail states.
- Clear all protected values, sessions, cookies, browser state, and runtime state after success, failure, interruption, or stop.
- No operator action is expected. If an existing signed-in candidate session is unavailable and protected acquisition cannot be completed without disclosure, stop `blocked-clean`; do not ask the operator to paste commands or values.

## Mailbox-Independent Authentication Method

Use exactly ten deterministic non-routable run-owned addresses under the reserved `.invalid` top-level domain, derived in memory from the fresh run ID and actor aliases. These are synthetic identifiers, not inboxes. Do not send email.

For each actor:

1. create the Auth identity through the supported candidate Admin API with email already confirmed;
2. create or generate a supported single-use Auth verification artifact in protected memory without delivery;
3. exchange it through the supported Supabase Auth endpoint/client to obtain a genuine user session;
4. verify the session's candidate issuer and exact actor identity in protected memory;
5. isolate the session in its own client/cookie container.

Do not fabricate JWTs, sign tokens directly, use the secret/service key as an actor, disable email confirmation globally, add passwords, or change hosted Auth settings. Admin-created identities and generated-link/session exchange are test setup; all RLS/application assertions must execute as the genuine actor session.

## Actor And Fixture Matrix

Use exactly: `ADMIN`, `TRAINER_A`, `TRAINER_B`, `MANAGER_A`, `VET_X`, `CONSULTANT_X`, `HAND_A`, `OWNER_A`, `OWNER_B`, and `SUSPENDED`.

Create exactly two run-owned stables (`STABLE_A`, `STABLE_B`) and four run-owned horses (`A1`, `A2`, `B1`, `B2`) with only the minimum implemented relationships:

- Trainer A: Stable A and allowed A1; Trainer B: Stable B and allowed B1;
- Manager A: Stable A;
- Vet X: explicit A1 and B1;
- Consultant X: A2 only;
- Hand A: Stable A membership and A1 only;
- Owner A owns A2; Owner B owns B2;
- SUSPENDED retains an otherwise-valid A1 relationship while inactive.

Ceilings: 10 Auth identities, 10 application users, 10 profiles, 10 primary-role/membership rows, 2 stables, 4 horses, 2 ownership relationships, 10 combined access assignments, 4 biochemistry tests, 12 comments, and zero uploads/Storage objects. Every mutation must be directly anchored by the fresh run or unambiguously joined to a run-owned identity/object in an in-memory dependency ledger.

## Mandatory Authorization Matrix

- Administrator: global reads, one bounded reversible administration operation, and soft-delete of another actor's comment.
- Trainers: accepted scoped record/test/comment actions; same-stable-unassigned, wrong-horse, peer/cross-stable, self-expansion, peer-management, and Administrator/Trainer-promotion denials; one allowed lower-role grant/revoke with immediate fresh-session denial.
- Manager A: accepted Stable A operations; Stable B, ownership, stable-security, and user-role-management denials.
- Vet X: assigned A1/B1 reads/comments, including cross-stable; A2/B2 and underlying-record edits denied.
- Consultant X: A2 read/comment only; A1/B1/B2 and underlying edits denied.
- Hand A: A1 read/comment only; same-stable A2, Stable B, and underlying edits denied.
- Owners: own-horse associated reads only; other horses, record edits, comments/comment mutation, self-assignment, and ownership transfer denied.
- SUSPENDED and anonymous: zero protected application-data access.
- Comments: allowed roles create bounded plain text; authors edit/soft-delete own; cross-author mutation denied; Administrator removal allowed; Owner mutation denied; empty and over-2,000-character comments rejected with zero persistence.
- Revocation: one permitted relationship removal causes immediate denial using a fresh actor check while historical attribution remains.

## Direct RLS And Application Agreement

- Execute direct candidate data operations using each actor's genuine session, never the secret/service key.
- Start the repository application locally against the candidate using protected process memory and no callback change.
- Establish isolated application browser/request contexts from the already obtained genuine actor sessions using the current supported Supabase SSR session-cookie contract. Do not modify application code or bypass application authorization logic.
- Exercise representative protected routes/actions for every role class and compare to direct RLS as `allowed/allowed` or `denied/denied`.
- A safe redirect, not-found, or access-denied response may satisfy denial if it matches current behavior and does not reveal resource existence.
- If the current application cannot consume a supported genuine session without an email callback or code change, record the application-route subset `not-run`, continue direct authenticated RLS only if safe, and close at most `blocked-clean`; do not alter implementation.

## Stop, Cleanup, And Recovery

- Harness default is non-mutating. Every mutation requires exact candidate, exact fresh run, mode-specific internal confirmation, ceiling validation, and initialized ownership ledger.
- Stop on the first failed authorization/application assertion and begin cleanup immediately.
- Compensate partial identity, session, or fixture creation.
- Delete run-owned application data in dependency-safe reverse order, then delete exact run-owned Auth identities last.
- Refuse broad, wildcard, ambiguous, ceiling-exceeding, or manually copied-ID cleanup.
- Final proof requires zero run anchors, zero run-owned Auth identities, restored Auth/application/Storage baselines, zero Storage objects, stopped runtime, cleared protected state, unchanged production callback configuration, ledger 0001-0012, unchanged structure/advisor state, both projects healthy, and old project untouched.

## Approved File Set

Builder may create/update only:

- new `scripts/supabase-authenticated-proof-021H.mjs` and focused self-test;
- new `planning/reviews/021H-authenticated-proof-manifest.md` and `planning/reviews/021H-authenticated-proof-results.md`;
- `docs/SPRINT_021_PROGRESS.md` and the applied 021H acceptance file for evidence annotations;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, and `planning/ARCHITECT_BRIEFING.md`;
- directly relevant 021H entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

No application, library, component, migration, bootstrap, verification SQL, config, dependency, infrastructure, environment, prior harness, or prior sprint evidence file may be edited.

## Validation

Before mutation: Pack identity, approved diff/source hashes, harness syntax and refusal/recovery self-tests, existing Sprint 021 validation/tests, TypeScript, lint, production build, exact candidate/old health, ledger/structure/advisor baselines, production-only callback, authoritative Auth/application/Storage counts, and zero fresh-run anchors.

At closeout: complete assertion ledger, exact cleanup/restoration evidence, closing hashes, JSON parse, redacted secret/token/private-identifier scan, approved-file diff, and `git diff --check`. Annotate every acceptance criterion exactly once as `pass`, `fail`, or `not-run`; failed/not-run items remain unchecked.

## Prohibitions

- mailbox/email access, delivery, message metadata/content, OTP handling, or real passwordless callback proof;
- callback, Site URL, provider, hosted Auth setting, password-authentication, plan, billing, or leaked-password-setting change;
- fabricated/signed JWTs, service-key actor assertions, personal/disclosed/routable addresses, or plaintext `.env`/credential documents;
- migration 0013; application, authorization, schema, RLS, policy, helper, grant, seed, bootstrap, config, dependency, or infrastructure changes;
- real people, customers, horses, clinical/production data, uploads, or Storage objects;
- deployment, Vercel/production environment, cutover, DNS, public reopening, or old-project mutation;
- package installation, stage, commit, push, or PR unless separately requested.

## Manual Intervention Rule

No manual intervention is expected. If a protected provider action is genuinely unavoidable, Builder must record the blocker, evidence, exact minimal operator action, sanitized response, and subsequent verification. It must not request commands, credentials, email addresses, tokens, links, or private identifiers in conversation.

============================================================
FILE: planning/sprints/021H-mailbox-independent-authenticated-role-rls-proof/blueprint.md
============================================================

# Sprint 021H - Mailbox-Independent Authenticated Role And RLS Proof Blueprint

## Phase 1: Source Lock And Harness

1. Read all authorities; inventory the dirty worktree and hash exact migrations, auth/role modules, affected routes/actions, validators, and harness inputs.
2. Create the 021H manifest: fresh-run rules, ten actors, topology, row-by-table ceilings, assertion catalogue, evidence allowlist, dependency cleanup graph, and stop conditions.
3. Build a new default-nonmutating 021H harness; do not re-enable or modify 021E/021G mutation.
4. Self-test exact target/refusal, retired runs, `.invalid` identity derivation, no-email behavior, missing-secret refusal, unsafe-output refusal, genuine-session verification, ceiling/ambiguity refusal, partial compensation, Auth-last cleanup, hosted-config immutability, and secret/session clearing.

## Phase 2: Credential-Free And Authoritative Preflight

1. Run existing Sprint 021 tests/validator, TypeScript, lint, and build.
2. Confirm candidate/old health, ledger 0001-0012, structural/advisor baseline, zero Auth/application/Storage state, production-only callback, and zero selected-run anchors.
3. Select one fresh `021H-RLS-YYYYMMDD-NN` run and freeze ceilings/cleanup queries before mutation.

## Phase 3: Protected Identity And Session Bootstrap

1. Acquire exact candidate credentials from signed-in candidate state into protected memory without output.
2. Derive ten deterministic `.invalid` identities in memory.
3. Create confirmed run-owned Auth users through the Admin API.
4. Generate and exchange supported one-time Auth artifacts in memory to obtain ten genuine isolated user sessions.
5. Verify candidate issuer and actor identity for every session; retain aliases/counts only.
6. Compensate immediately on partial failure.

## Phase 4: Fixture Bootstrap

1. Create exact application user/profile/role state and two-stable/four-horse topology within ceilings.
2. Add only required trainer, manager, professional, hand, owner, and suspended relationships.
3. Add at most four tests and bounded comments required by assertions.
4. Verify aggregate ceilings and ledger ownership after each dependency group.

## Phase 5: Authenticated Proof

1. Execute direct-RLS positive and denial cases for all actor classes.
2. Execute comment authorship, mutation, Administrator, Owner, and length-boundary cases.
3. Execute allowed relationship revocation and fresh-session immediate denial.
4. Start local application without callback mutation, seed isolated supported session-cookie contexts, and execute representative route/action cases.
5. Record each assertion exactly once with aliases, expected/result classes, and pass/fail code. Stop on first failure.

## Phase 6: Cleanup And Restoration

1. Preview exact cleanup within ceilings.
2. Delete run-owned application state in reverse dependency order and Auth identities last.
3. Clear browser/request sessions and protected variables; stop runtime.
4. Prove zero owned state, restored baselines, unchanged hosted callback state, ledger/structure/advisor integrity, project health, and old-project non-contact.

## Phase 7: Closeout

Classify the evidence, annotate every acceptance item, update only approved durable records, rerun final local/redacted/diff checks, and refresh the Architect briefing. Keep email delivery/callback proof explicitly separate and unperformed.

============================================================
FILE: planning/sprints/021H-mailbox-independent-authenticated-role-rls-proof/acceptance.md
============================================================

# Sprint 021H - Mailbox-Independent Authenticated Role And RLS Proof Acceptance

- [ ] Applied four-file sprint matches this Pack.
- [ ] Exact candidate is used; old/unexpected projects and all retired/reused runs are refused.
- [ ] Ledger remains 0001-0012; migrations 0011/0012 and structure/advisor baseline remain unchanged.
- [ ] Harness defaults non-mutating and passes target, run, no-email, secret, output, session, ceiling, compensation, cleanup, hosted-config, and clearing self-tests.
- [ ] No mailbox/email/OTP/message/callback work occurs and hosted callback/Site URL state is unchanged.
- [ ] No protected credential, link, token, cookie, UUID, private identifier, or routable address is retained/emitted; no plaintext credential artifact exists.
- [ ] A fresh 021H run begins with authoritative zero anchors and declared ceilings.
- [ ] Exactly ten deterministic `.invalid` run-owned Auth identities are created with no delivery.
- [ ] Exactly ten genuine isolated candidate user sessions are established through supported Auth exchange without fabricated JWTs.
- [ ] Exact two-stable/four-horse topology and required role/ownership/access relationships remain within ceilings.
- [ ] Administrator positive and bounded reversible administration cases pass.
- [ ] Trainer A/B scoped positives, cross-scope denials, escalation denials, and lower-role grant/revoke pass.
- [ ] Manager A positive and cross-stable/security/ownership/role-management denials pass.
- [ ] Vet X, Consultant X, and Hand A assigned positives and unassigned/edit denials pass.
- [ ] Owner A/B own-horse reads and edit/comment/assignment/transfer/other-horse denials pass.
- [ ] SUSPENDED and anonymous receive zero protected application-data access.
- [ ] Comment creation, authorship mutation, Administrator removal, Owner denial, and content boundaries pass.
- [ ] Revocation causes immediate fresh-session denial while historical attribution remains.
- [ ] Direct RLS assertions are executed as genuine actor sessions, never the service key.
- [ ] Representative application routes/actions agree with direct RLS for every role class without resource disclosure.
- [ ] Every mandatory assertion is recorded exactly once using sanitized aliases/result classes.
- [ ] First failed assertion stops the matrix and initiates compensation/cleanup.
- [ ] Exact cleanup removes dependency-safe application state before Auth identities.
- [ ] Final run-owned Auth/application/Storage counts are zero and starting baselines are restored.
- [ ] Runtime, sessions, protected memory, and browser/process state are cleared.
- [ ] Production-only callback/Site URL, ledger, structure/advisors, project health, and old-project integrity are confirmed after cleanup.
- [ ] Outcome is exactly authenticated-role-rls-proof-passed-clean, authenticated-role-rls-proof-failed-clean, or blocked-clean and matches evidence.
- [ ] Email delivery/passwordless callback proof is explicitly recorded as outside 021H and not tested.
- [ ] Status, progress, schedule, decisions/risks/questions, results, and Architect briefing agree.
- [ ] Final tests, hashes, JSON, redacted scans, approved diff, and `git diff --check` pass as applicable.
- [ ] No implementation/schema/migration/config/deployment/cutover/old-project mutation, package install, commit, push, or PR occurs.

Builder must annotate every item exactly once as `pass`, `fail`, or `not-run` with named evidence/reason. Failed and not-run items remain unchecked. Passed-clean requires all applicable authorization, cleanup, and restoration items checked; the explicitly out-of-scope email criterion passes only by proving it was not performed or implied.

============================================================
FILE: planning/sprints/021H-mailbox-independent-authenticated-role-rls-proof/handoff-prompt.md
============================================================

# Sprint 021H - Builder Handoff Prompt

You are Builder for Sprint `021H-mailbox-independent-authenticated-role-rls-proof` under the strict profile.

Apply this Pack and execute only from the verified four generated files. Target candidate `uvskssaecdhxcgytkasc`; refuse old project `tagnbgkroihagjmvehlx`, unexpected targets, all prior/reserved runs, and any reused identifier. Select a fresh `021H-RLS-YYYYMMDD-NN` only after authoritative zero-anchor proof.

Do not access a mailbox, send email, inspect message metadata/content, handle OTPs, or change callbacks. Create exactly ten deterministic non-routable `.invalid` identities through the candidate Admin API, then use supported in-memory one-time Auth exchange to establish genuine isolated actor sessions. Never fabricate JWTs or execute actor assertions with the service key.

Builder owns all PowerShell, browser/dashboard, API, runtime, testing, cleanup, and restoration. Acquire credentials from existing signed-in candidate state into protected memory and emit none. If safe acquisition is unavailable, close blocked-clean; do not delegate commands or credential entry to the operator.

Create only the exact bounded run-owned topology. Execute the full positive, denial, comment, revocation, direct-RLS, and representative application-route matrix. Start the application locally without callback changes and use the supported existing Supabase session-cookie contract; do not alter code to enable testing.

Stop on the first failed assertion. Compensate partial creation, delete exact application state in dependency-safe order, delete Auth identities last, clear all protected state, stop runtime, and prove final zero state plus unchanged hosted configuration and old-project integrity.

Do not change implementation, authorization, schema, RLS, migrations, bootstrap, config, dependencies, infrastructure, production, or the old project. Prohibit migration 0013, routable/personal/disclosed addresses, plaintext credential files, Storage objects, deployment, cutover, package installation, stage, commit, push, and PR.

Close exactly as authenticated-role-rls-proof-passed-clean, authenticated-role-rls-proof-failed-clean, or blocked-clean. Individually annotate every acceptance item and keep email delivery/passwordless callback certification explicitly outside this sprint.
