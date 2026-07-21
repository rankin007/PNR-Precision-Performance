============================================================
FILE: planning/sprints/021E-authenticated-role-rls-and-application-proof/requirements.md
============================================================

# Sprint 021E - Authenticated Role, RLS, And Application Proof Requirements

## Objective

Prove the already implemented Sprint 021 role matrix through controlled authenticated testing against candidate Supabase project `uvskssaecdhxcgytkasc`, then remove every synthetic identity and fixture and restore the production-only callback state.

Sprints 021B-021D closed the structural and documentary work. Sprint 021E is proof-only. It must not change application behavior, schema, policies, migrations, hosted production configuration, or the protected old project. A failed authorization assertion is evidence for a later corrective follow-up; it is not permission to fix implementation inside 021E.

## Workflow Profile

`strict`

This sprint handles protected credentials, passwordless authentication, temporary candidate callback configuration, synthetic Auth identities, synthetic application data, authenticated sessions, authorization boundaries, and mandatory cleanup.

## Authoritative Sources

- `AGENTS.md`
- `planning/STATUS.json` and `planning/ARCHITECT_BRIEFING.md`
- all applied Sprint 021 and 021B-021D files and reviews
- `docs/SPRINT_021_PROGRESS.md`
- migrations `0011_definitive_role_matrix_and_comments.sql` and `0012_role_lifecycle_policy_hardening.sql`
- `lib/auth/role-matrix.ts` and the existing authenticated route/action implementations
- `scripts/supabase-synthetic-auth-rls-020G.mjs` as historical safety-pattern reference only
- `planning/reviews/020G-synthetic-auth-rls-test-plan.md` as historical protected-process and cleanup guidance only
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`

The definitive permission matrix remains the applied Sprint 021 matrix. Sprint 021E does not redefine it.

## Required Outcome Classes

Close Sprint 021E with exactly one evidence-backed outcome:

- **authenticated-proof-passed-clean**: every mandatory positive, denial, route/RLS agreement, revocation, cleanup, restoration, and final-baseline criterion passes;
- **authenticated-proof-failed-clean**: one or more security/application assertions fail, but exact cleanup, callback restoration, credential clearing, and final baselines all pass; or
- **blocked-clean**: proof cannot start or complete for an environmental/manual reason, but no owned remote state remains and callback/credential state is restored.

Incomplete or ambiguous cleanup is not a closeout outcome. It is an active incident until all exact owned state is removed or the Manual Intervention Rule records the unresolved blocker and recovery steps. Never report authenticated proof as passed after a failed assertion, partial matrix, ambiguous identity, or incomplete cleanup.

## Immutable Technical Baseline

- Candidate target is exactly `uvskssaecdhxcgytkasc`.
- Old project `tagnbgkroihagjmvehlx` and every unexpected project are absolute refusal targets.
- Candidate ledger must remain exactly `0001`-`0012`.
- Migrations 0011 and 0012 are immutable. Migration 0013 is prohibited.
- Expected structural baseline remains 35/35 RLS-enabled public tables, 87 policies, 22 individually dispositioned database-advisor warnings, zero database-advisor errors, zero suggestions, 1,774 lookups, and the separate hosted leaked-password plan exception.
- Initial Auth, Storage, and run-anchor baselines must be recorded through sanitized counts before mutation.
- The repository is dirty and uncommitted. Record Git status plus SHA-256 hashes of every application, authorization, migration, verification, and harness file used for proof. Do not normalize, stage, commit, revert, or rewrite the worktree.

## Synthetic Identity Matrix

Use exactly ten non-personal run-owned Auth identities, each with one primary operational role or test state:

1. `ADMIN` — Administrator.
2. `TRAINER_A` — Trainer assigned to Stable A and its allowed horses.
3. `TRAINER_B` — peer Trainer assigned to Stable B for peer/cross-stable denials.
4. `MANAGER_A` — Stable Manager for Stable A only.
5. `VET_X` — Veterinarian with explicit horses across Stable A and Stable B.
6. `CONSULTANT_X` — Consultant assigned to one horse only.
7. `HAND_A` — Stable Hand in Stable A and explicitly assigned to one Stable A horse.
8. `OWNER_A` — Owner of one Stable A horse.
9. `OWNER_B` — Owner of one Stable B horse for cross-owner denial.
10. `SUSPENDED` — authenticated but inactive or suspended with a retained relationship that would otherwise grant access.

Ownership is a relationship, not a primary operational role. Where the schema requires a primary-role representation for an Owner login, use the already seeded/application-supported owner relationship path exactly as implemented; do not invent a new role or permission.

Use one operator-controlled non-personal inbox with ten distinct plus-address aliases. No address, alias, Auth UUID, OTP, magic link, session token, cookie, or personal value may enter the Pack, repository, retained logs, screenshots, evidence, or conversation.

## Synthetic Fixture Topology And Ceilings

Use one new unique run ID matching `021E-RLS-YYYYMMDD-NN`. Do not reuse reserved `020G-RLS-20260720-01` or any prior run ID.

Create exactly:

- two stables: `STABLE_A`, `STABLE_B`;
- four horses: `A1`, `A2` in Stable A and `B1`, `B2` in Stable B;
- the minimum run-tagged role/profile/membership rows required for the ten identities;
- Trainer A scope for Stable A with allowed horse `A1`; Trainer B scope for Stable B with allowed horse `B1`;
- Manager A scope for Stable A;
- Vet X explicit access to `A1` and `B1` to prove cross-stable professional assignment;
- Consultant X explicit access to `A2` only;
- Hand A stable membership in Stable A and explicit access to `A1`, but not `A2`;
- Owner A ownership of `A2`; Owner B ownership of `B2`;
- one retained relationship for SUSPENDED that would grant `A1` access if active;
- at most four run-owned biochemistry test records, one per horse;
- at most twelve run-owned comments/notes needed for author, cross-author, Administrator, Owner, revocation, and soft-delete cases;
- no uploads, Storage objects, real horse/customer/clinical data, commerce rows, or unrelated operational data.

Hard ceilings before cleanup are: 10 Auth identities, 10 application users, 10 profiles, 10 primary-role/membership rows, 2 stables, 4 horses, 2 ownership relationships, 10 combined stable/horse/professional/staff assignments, 4 biochemistry tests, 12 comments, and zero Storage objects. If the exact implemented schema requires a different table distribution, Builder must keep these business-object ceilings, document the exact row-by-table manifest before creation, and stop rather than exceed a ceiling.

Every mutable row must be owned by the run through an exact direct anchor or an unambiguous join to a run-owned identity/stable/horse. Maintain an in-memory creation ledger containing table, opaque ID, anchor, prior value when updating bootstrap-created rows, and cleanup order. Retained evidence may contain only run ID, actor aliases, fixture aliases, aggregate counts, result classes, and pass/fail codes.

## Mandatory Authenticated Matrix

### Administrator

- Can read both stables/horses, underlying records, biochemistry tests, and comments.
- Can perform one bounded allowed administration operation and reverse it within the run.
- Can remove another actor's comment through the implemented soft-delete path.

### Trainers

- Trainer A can read/write allowed horse `A1`, its record/test, and comments; can comment.
- Trainer A is denied `A2` unless the implemented accepted Stable/horse scope explicitly grants it; use the exact structural contract as authority and record the expected result before execution.
- Trainer A is denied Trainer B's `B1/B2`, self-expansion, peer-Trainer management, and Administrator/Trainer promotion.
- Trainer A may exercise one permitted lower-role assignment/revocation for an already scoped horse, followed by immediate-access-loss proof.
- Trainer B proves the symmetric cross-stable denial.

### Stable Manager

- Manager A can read and perform accepted record/profile operations across Stable A.
- Manager A is denied Stable B and denied stable-security, ownership-change, and user-role-management operations not granted by the matrix.

### Veterinarian And Consultant

- Vet X can read/comment on explicitly assigned `A1` and `B1`, proving permitted cross-stable explicit assignment.
- Vet X is denied unassigned `A2/B2` and all underlying record edits.
- Consultant X can read/comment on assigned `A2`, is denied `A1/B1/B2`, and cannot edit underlying records.

### Stable Hand

- Hand A can read/comment on assigned `A1`.
- Hand A is denied same-stable but unassigned `A2`, all Stable B horses, and underlying record edits.

### Owners

- Owner A can read owned `A2` and its records/comments only.
- Owner B can read owned `B2` only.
- Each Owner is denied the other's horse and all non-owned horses.
- Owners cannot edit horse/test records, comment, edit/delete comments, self-assign, or transfer ownership.

### Suspended And Anonymous

- SUSPENDED authenticates but receives zero application-data access despite the retained relationship.
- Anonymous requests receive zero protected application data and safe redirect/denial behavior.

### Comments And Revocation

- Every allowed commenting role creates one bounded comment where needed.
- Authors can edit and soft-delete their own comment while access remains.
- Non-Administrators cannot edit/delete another author's comment.
- Administrator can soft-delete another author's comment.
- Owner cannot create or mutate comments.
- Empty and over-2,000-character comments are rejected without persistence.
- After one professional or lower-role assignment is revoked, access ends in a fresh request/session check; historical author attribution remains and the comment is not erased.

## Application And RLS Agreement

- Test direct candidate RLS behavior using each actor's real authenticated session, never the service key.
- Use the service/secret key only for bounded setup, aggregate corroboration, exact cleanup, and Auth administration.
- Start the repository application locally against the candidate in one protected process-scoped environment.
- Prove the real passwordless callback once through `http://localhost:3000/auth/callback` using a synthetic actor.
- Exercise affected protected routes and server actions for representative allowed and denied cases across every role class.
- A route may redirect, return not-found, or return access-denied according to existing behavior, but must not disclose inaccessible resource existence.
- Record agreement as `allowed/allowed` or `denied/denied` between application and RLS. Any route/RLS mismatch fails proof.
- Do not alter application code, environment files, or hosted production environment to make a test pass.

## Protected Credential And Session Handling

- Replacement candidate publishable and secret keys may be used only inside one protected process-scoped session.
- Operator enters values through hidden prompts; values must not appear in command arguments, shell history, environment files, screenshots, browser inspection, logs, test artifacts, tool output, or conversation.
- Builder retains only presence booleans and exact candidate hostname/reference equality.
- Do not open API-key pages or inspect key values through browser automation.
- Inbox, magic-link, OTP, cookie, and token handling remains operator-protected or in-memory inside the protected test process.
- Use isolated session containers per actor; never reuse one actor's cookie/session as another.
- Disable debug/network/body logging and redact all output through an allowlist.
- On suspected exposure, stop immediately, preserve no value, begin incident containment, and do not resume proof under the exposed session.

## Temporary Callback Manual Process

Candidate callback baseline must begin and end as exactly:

- Site URL: `https://precisionperformance.com.au`
- sole callback: `https://precisionperformance.com.au/auth/callback`

For the test window only, the operator may add exactly `http://localhost:3000/auth/callback` as a second candidate callback. Do not change the Site URL or production callback. The Builder must verify the sanitized two-URL list before starting protected runtime work.

After success, failure, interruption, or stop, the operator removes only the localhost callback. Builder must verify the sanitized production-only list before closeout. Old-project callback access or mutation is prohibited.

## Cleanup And Recovery Contract

- Validate cleanup queries and maximum counts locally before any remote creation.
- Perform compensating cleanup immediately after any partial setup failure.
- Stop the matrix on the first failed assertion; proceed only to cleanup/restoration and sanitized evidence capture.
- Delete exact run-owned application rows in dependency-safe reverse order, then delete Auth identities last.
- Never use an unanchored delete, broad filter, manually copied UUID list, wildcard ownership rule, or cleanup above declared ceilings.
- If application cleanup is incomplete, do not delete Auth identities until safe dependency analysis confirms doing so will not erase ownership evidence.
- Restore any temporarily updated bootstrap-created profile field to its exact prior value.
- Clear sessions, cookies, process variables, and protected runtime state; stop the local server and close the protected terminal.
- Final proof requires zero run anchors, zero run-owned Auth identities, initial Auth/Storage aggregate baselines restored, zero Storage objects created, callback production-only, ledger still `0001`-`0012`, unchanged structural/advisor baselines, candidate and old project `ACTIVE_HEALTHY`, and old project unmutated.
- If cleanup cannot be completed, record the exact owned residual counts and manual recovery instructions. Do not claim a closed-clean outcome.

## Approved File Set

Builder may create or update only:

- a new proof harness under `scripts/` named for Sprint 021E
- focused local-only harness self-tests under `scripts/` or the existing test convention
- `planning/reviews/021E-authenticated-proof-manifest.md`
- `planning/reviews/021E-authenticated-proof-results.md`
- `docs/SPRINT_021_PROGRESS.md`
- the applied Sprint 021E acceptance file for evidence annotations
- `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, and `planning/ARCHITECT_BRIEFING.md`
- directly relevant 021E entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`

No existing application, library, component, migration, bootstrap, verification SQL, configuration, dependency, infrastructure, or environment file may be edited. Temporary protected process state and run-owned remote candidate fixtures are allowed only under this Pack and must be removed before clean closeout.

## Validation

Before remote mutation:

- exact approved-file diff inventory and source hashes
- new harness syntax/lint/self-tests, including old/unexpected target refusal, missing-secret refusal, unsafe-output refusal, invalid/reused run-ID refusal, ceiling refusal, ambiguous cleanup refusal, partial-creation compensation, cleanup ordering, and secret redaction
- TypeScript, lint, production build, and existing focused Sprint 021 tests without modifying implementation
- exact candidate/old identity and health, candidate ledger/structure/advisor/baselines, callback baseline, and zero chosen-run anchors

At closeout:

- matrix and route/RLS result completeness
- exact cleanup/restoration evidence
- rerun of credential-free repository checks
- final source hashes, JSON parse, secret/staged-file scan, approved-file diff inspection, and `git diff --check`
- for authenticated-proof-passed-clean, a fully checked Sprint 021E acceptance record with named evidence; for failed-clean or blocked-clean, every criterion explicitly annotated `pass`, `fail`, or `not-run` with evidence/reason and no silent blank item

## Out Of Scope And Prohibitions

- migration 0013 or any schema/RLS/policy/helper/grant/seed/data-model change
- application, route, action, UI, or authorization implementation changes
- production deployment, Vercel/environment changes, production cutover, DNS, public reopening, or old-project mutation
- password authentication, plan upgrade, billing, or leaked-password-setting change
- real people, customers, horses, clinical data, production fixtures, uploads, or Storage objects
- notifications, rich text, links, files, images, OCR, voice, scoring, recommendation, commerce, or Stripe work
- package installation or new dependency
- commit, stage, push, or pull request unless separately requested

## Manual Intervention Rule

Every callback, inbox, protected-session, browser-context, or cleanup action requiring the operator must be recorded as:

1. `Manual process — operator`
2. blocker or protected action and evidence already checked
3. exact numbered steps
4. sanitized response format containing no protected value
5. `Builder process — after operator response`
6. exact verification and next action

Do not combine operator and Builder actions. Request only sanitized callback lists, actor aliases, aggregate counts, and pass/fail codes. Never request a credential, email address, OTP, link, token, cookie, UUID, or row payload in conversation.

============================================================
FILE: planning/sprints/021E-authenticated-role-rls-and-application-proof/blueprint.md
============================================================

# Sprint 021E - Authenticated Role, RLS, And Application Proof Blueprint

## Phase 1: Immutable Source And Safety Inventory

1. Read all required authority and applied Sprint 021/021B-021D artifacts.
2. Inventory the dirty worktree and hash the exact source, migrations, authorization modules, routes/actions, structural verification, and harness inputs under test.
3. Confirm no implementation change is allowed and establish the three permitted outcome classes.
4. Create the 021E manifest with exact actor aliases, topology, row-by-table ceilings, run-ID format, assertion list, cleanup graph, sanitized evidence schema, and stop conditions.
5. Select one new run ID only after proving zero matching anchors and record it without protected identity data.

## Phase 2: Build And Validate Proof Harness Locally

1. Create a new 021E harness; do not silently repurpose the limited two-actor 020G harness.
2. Separate modes for safe preflight, identity/bootstrap verification, fixture creation, authenticated matrix, route corroboration, revocation, aggregate verification, cleanup-plan preview, cleanup, and final verification.
3. Default mode is non-mutating preflight. Every mutating mode requires exact run ID, exact candidate equality, explicit mode-specific confirmation, and in-memory ownership ledger.
4. Implement allowlisted sanitized output only.
5. Implement hard ceilings, old/unexpected target refusal, partial-creation compensation, first-assertion stop, dependency-safe cleanup, Auth-last deletion, and final zero checks.
6. Self-test every refusal and recovery branch before protected values or remote calls.

## Phase 3: Credential-Free And Candidate Preflight

1. Run existing repository validation and record exact hashes/status.
2. Confirm candidate and protected old project identity/health through sanitized metadata; never select old project for data access or mutation.
3. Confirm candidate ledger exactly 0001-0012, structural/advisor baseline, production-only callback, Auth/Storage baselines, and zero selected-run anchors.
4. Confirm exact ten-actor manifest and row ceilings.
5. Stop clean if any identity, ledger, callback, baseline, health, structure, advisor, anchor, or source-hash precondition is wrong.

## Phase 4: Temporary Callback And Protected Runtime

1. Issue separate operator instructions to add only the localhost callback to the candidate.
2. Verify sanitized callback list has exactly production plus localhost and Site URL is unchanged.
3. Issue separate protected-process instructions for hidden candidate values and non-personal inbox handling.
4. Start local runtime against exact candidate with debug/body/network logging disabled.
5. Prove candidate hostname and required-value presence without outputting values.
6. Prove one real passwordless callback and isolate all actor sessions.

## Phase 5: Identity And Fixture Setup

1. Create or bootstrap exactly ten run-owned synthetic identities using protected aliases.
2. Verify exact Auth-to-application mapping in memory without retaining identifiers.
3. Preview the exact row-by-table creation plan and refuse any ceiling or ownership mismatch.
4. Create fixtures in dependency order while appending each mutation to the in-memory ledger.
5. On partial failure, compensate in reverse order, restore callbacks/credentials, record blocked-clean only if zero owned state remains, and stop.
6. Verify aggregate fixture counts and topology before assertions.

## Phase 6: Authenticated RLS And Application Matrix

1. Execute anonymous and each actor's direct RLS cases with actor sessions.
2. Exercise representative local application routes/actions for every role class.
3. Record only actor alias, fixture alias, operation class, expected result, RLS result, application result, and pass/fail.
4. Complete role-management, cross-user, wrong-horse, same-stable-unassigned, cross-stable, suspended, Owner-read-only, comment, and input-boundary denials.
5. Execute permitted comment author operations and Administrator removal.
6. Execute one bounded assignment revocation and prove immediate denial on a fresh request while authorship remains.
7. Stop on first assertion failure and proceed directly to cleanup/restoration.

## Phase 7: Mandatory Cleanup And Restoration

1. Produce an exact bounded cleanup preview from run anchors and in-memory ledger.
2. Refuse ambiguous, broad, missing-anchor, unexpected, or over-ceiling cleanup.
3. Delete run-owned application fixtures in dependency-safe reverse order.
4. Restore any prior bootstrap-created values.
5. Delete exactly the ten run-owned Auth identities last.
6. Clear isolated sessions and protected process values; stop runtime and close protected terminal.
7. Issue separate operator instructions to remove only localhost callback.
8. Verify production-only callback, initial Auth/Storage baselines, zero run anchors, unchanged ledger/structure/advisors, both-project health, and old-project integrity.
9. Treat any residual owned state or callback mismatch as an active cleanup incident, not a completed sprint.

## Phase 8: Classify Outcome And Close

1. Classify exactly one permitted outcome based on assertion completeness and cleanup proof.
2. Write sanitized manifest/results records with no protected values or raw payloads.
3. Reconcile status, state, schedule, progress, briefing, decisions, risks, and questions.
4. Recheck source hashes and approved-file diff; no implementation drift is allowed.
5. Complete and evidence-map every 021E acceptance item. Require zero unchecked items for passed-clean. For failed-clean or blocked-clean, preserve failed/not-run checkboxes as unchecked but annotate every one with its result, evidence/reason, and cleanup disposition.
6. Do not stage, commit, deploy, cut over, or begin a fix.

============================================================
FILE: planning/sprints/021E-authenticated-role-rls-and-application-proof/acceptance.md
============================================================

# Sprint 021E - Authenticated Role, RLS, And Application Proof Acceptance

## Scope, Source, And Target Safety

- [ ] Sprint identity is consistently `021E-authenticated-role-rls-and-application-proof`.
- [ ] Exact dirty-worktree inventory and proof-source hashes are recorded before and after testing with no implementation drift.
- [ ] Candidate equals `uvskssaecdhxcgytkasc`; old and unexpected projects are refused.
- [ ] Ledger remains 0001-0012; migrations 0011/0012 and structural baseline remain unchanged; no 0013 exists.
- [ ] No deployment, cutover, production/Vercel/DNS/Stripe action, old-project mutation, package installation, staging, commit, push, or PR occurs.

## Harness And Protected Handling

- [ ] New 021E harness defaults non-mutating and passes all target, run-ID, ceiling, ownership, compensation, cleanup-order, and redaction self-tests.
- [ ] Protected values are entered only through hidden process-scoped handling and no protected value or fragment is retained.
- [ ] Ten actor sessions are isolated and exact candidate equality is proved without exposing identifiers or tokens.
- [ ] Temporary callback begins production-only, changes to exactly production plus localhost for the test, and Site URL remains unchanged.
- [ ] One real passwordless callback succeeds against the candidate local runtime.

## Identity And Fixture Boundaries

- [ ] One new valid 021E run ID begins with zero anchors and is never reused.
- [ ] Exactly ten non-personal identities match the required actor matrix.
- [ ] Exact two-stable/four-horse topology and required role/ownership/assignment relationships are created within ceilings.
- [ ] At most four biochemistry tests and twelve comments are created; zero uploads or Storage objects are created.
- [ ] Every mutation has exact run ownership, an in-memory ledger entry, and a dependency-safe cleanup path.

## Authenticated Positive Matrix

- [ ] Administrator global read and bounded administration/comment-removal cases pass.
- [ ] Trainers pass only their accepted horse/stable record, comment, and lower-role management cases.
- [ ] Stable Manager passes accepted Stable A horse/record operations only.
- [ ] Veterinarian passes explicit cross-stable assigned-horse read/comment cases.
- [ ] Consultant and Stable Hand pass only their explicit assigned-horse read/comment cases.
- [ ] Owners pass read-only access to their own horses and associated records/comments.

## Denial Matrix

- [ ] Wrong-horse, same-stable-unassigned, cross-user, and cross-stable denials pass.
- [ ] Trainer self-expansion, peer management, and Administrator/Trainer promotion denials pass.
- [ ] Stable Manager security-boundary, ownership-change, role-management, and cross-stable denials pass.
- [ ] Veterinarian, Consultant, and Stable Hand underlying-record edit denials pass.
- [ ] Owner edit/comment/comment-mutation/self-assignment/ownership-transfer and other-horse denials pass.
- [ ] Suspended and anonymous actors receive zero protected application-data access.
- [ ] Denied application behavior does not disclose inaccessible resource existence.

## Comments, Revocation, And Route/RLS Agreement

- [ ] Allowed roles can create bounded plain-text comments only within scope.
- [ ] Author own-edit/soft-delete and Administrator removal pass; cross-author mutation is denied.
- [ ] Empty and over-2,000-character comments are rejected with zero persistence.
- [ ] Revocation causes immediate denial on a fresh check while historical attribution remains.
- [ ] Representative application routes/actions and direct RLS agree for every role class.
- [ ] Every mandatory assertion is recorded exactly once with expected/result classes and pass/fail.

## Cleanup And Restoration

- [ ] First assertion failure, if any, stops further matrix work and initiates cleanup.
- [ ] Cleanup preview is exact and within ceilings; ambiguous/broad cleanup is refused.
- [ ] All application fixtures are removed in dependency-safe order and prior values are restored.
- [ ] Exactly run-owned Auth identities are deleted last; final run-owned Auth and application anchors are zero.
- [ ] Auth/Storage baselines are restored and Storage remains unchanged with zero run objects.
- [ ] Local sessions/runtime/process values are cleared and stopped.
- [ ] Localhost callback is removed and the production-only callback/Site URL state is proved.
- [ ] Ledger/structure/advisor baselines, both-project health, and old-project integrity are confirmed after cleanup.

## Outcome And Durable Closeout

- [ ] Outcome is exactly authenticated-proof-passed-clean, authenticated-proof-failed-clean, or blocked-clean and matches the evidence.
- [ ] No passed outcome is claimed after any failed/missing assertion, partial matrix, or incomplete cleanup.
- [ ] Manifest and results contain only sanitized aliases, counts, result classes, and pass/fail codes.
- [ ] Status, state, schedule, progress, briefing, decisions, risks, and questions agree.
- [ ] TypeScript, lint, build, focused tests, harness self-tests, JSON, secret scan, source hashes, approved diff, and `git diff --check` pass as applicable.
- [ ] Acceptance accounting matches the outcome: passed-clean has zero unchecked items; failed-clean or blocked-clean explicitly annotates every unchecked item `fail` or `not-run`, with evidence/reason and no silent blank item.

## Evidence Mapping

Builder must replace this instruction with concise references to the final 021E manifest/results sections and validation evidence. Do not mark unsupported items complete. A failed security assertion may support a failed-clean outcome, but it cannot be checked as a passing positive/denial criterion; leave it unchecked, annotate it `fail` with exact evidence, annotate later unexecuted items `not-run`, and classify the sprint accordingly. No criterion may remain unannotated.

============================================================
FILE: planning/sprints/021E-authenticated-role-rls-and-application-proof/handoff-prompt.md
============================================================

# Sprint 021E - Builder Handoff Prompt

You are Builder for Sprint `021E-authenticated-role-rls-and-application-proof` under the `strict` workflow profile.

Read `AGENTS.md`, all Sprint 021 and 021B-021D artifacts/reviews, the current status/briefing/progress, migrations 0011/0012, role matrix code, affected routes/actions, and historical 020G harness/test plan before editing.

This is authenticated proof only. Do not change application behavior, authorization code, migrations, bootstrap, RLS, policies, helpers, grants, seeds, configuration, dependencies, infrastructure, or environment files. Create only the new 021E harness/self-tests and durable evidence/planning records in the approved file set. If an assertion fails, stop the matrix, clean exact owned state, restore callback/credentials/runtime, classify failed-clean, and leave any fix for a later Architect Pack.

Target only candidate `uvskssaecdhxcgytkasc`. Refuse old project `tagnbgkroihagjmvehlx` and every unexpected project. Preserve ledger 0001-0012 and prohibit migration 0013. Use the exact ten-actor, two-stable, four-horse topology and declared ceilings. Use real actor sessions for RLS/application assertions and the service/secret key only for bounded setup, aggregate corroboration, cleanup, and Auth administration.

Handle keys, inboxes, magic links, OTPs, cookies, sessions, and tokens only in protected process memory. Never output or retain them. Add the localhost callback only through the separate manual operator process after verifying production-only baseline; remove it after any success, failure, interruption, or stop and verify production-only restoration.

Stop on the first failed assertion. Cleanup is mandatory and must remove dependency-safe application fixtures before exact run-owned Auth identities, restore prior values, clear sessions/process variables, stop runtime, and prove zero run anchors, restored baselines, unchanged ledger/structure/advisors, both-project health, and old-project integrity. Incomplete cleanup is an active incident and cannot be called closed-clean.

Close with exactly one outcome: authenticated-proof-passed-clean, authenticated-proof-failed-clean, or blocked-clean. Do not claim passed after a partial matrix. Passed-clean requires zero unchecked acceptance items. For failed-clean or blocked-clean, leave failed/not-run items unchecked but explicitly annotate every one with result and evidence/reason; never falsely check them and never leave a silent blank item.

Do not deploy, cut over production, change Vercel/DNS/production settings, reopen public access, install packages, create Storage objects, use real data, stage, commit, push, or create a pull request.

For every protected/manual step, use the project Manual Intervention Rule with separate operator and Builder sections, exact numbered steps, and sanitized response formats. Never request a credential or protected identifier in conversation.
