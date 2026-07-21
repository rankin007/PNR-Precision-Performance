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
