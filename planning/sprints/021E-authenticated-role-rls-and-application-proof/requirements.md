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
