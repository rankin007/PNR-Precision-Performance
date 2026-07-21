# Sprint 021B - Structural Reconciliation And Closeout Requirements

## Purpose

Reconcile and close the completed structural portion of core Sprint 021 without extending implementation or attempting authenticated proof. Sprint 021B is a corrective closeout mini-sprint belonging to core Sprint 021.

The controlling evidence is `planning/STATUS.json` and `docs/SPRINT_021_PROGRESS.md`: migration `0011_definitive_role_matrix_and_comments.sql` was applied once; its discovered lifecycle and policy defects were corrected only through forward-only migration `0012_role_lifecycle_policy_hardening.sql`; the candidate now has genuine ledger `0001`-`0012`; structural, local, build, lint, and linked database lint checks pass; the Security Advisor reports zero errors, 22 warnings, and zero suggestions; and authenticated proof has not started.

This sprint audits that completed state, gives every one of the 22 warnings an explicit evidence-backed disposition, corrects durable sprint identity from active core Sprint 021 to follow-up Sprint 021B, and closes 021B with the outcome **structurally-ready**. It does not claim authenticated readiness, runtime readiness, cutover readiness, or production readiness.

## Workflow Profile

`strict`

## Source Of Truth

- `AGENTS.md`, including the follow-up numbering and Architect/Builder handoff rules
- `planning/STATUS.json`
- `docs/SPRINT_021_PROGRESS.md`
- the applied Sprint 021 four-file set
- migrations `0011_definitive_role_matrix_and_comments.sql` and `0012_role_lifecycle_policy_hardening.sql`
- `supabase/bootstrap/remote-init.sql`
- `supabase/verification/021-role-matrix-structure.sql`
- `supabase/tests/021_candidate_structure.test.sql`
- `scripts/validate-role-matrix-021.ps1` and `scripts/test-role-matrix-021.mjs`
- current sanitized candidate ledger, structure, lint, Security Advisor, and project-health evidence
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`

## Required Outcomes

1. Audit the completed 0011/0012 structural work against Sprint 021 decisions and existing verification evidence.
2. Prove `0011` and `0012` are present once and in order in source, bootstrap, and the genuine candidate ledger, with `0011` unchanged and no migration after `0012`.
3. Reconcile all 22 current Security Advisor warnings individually, with no warning hidden inside an aggregate count.
4. Correct durable current-sprint references so the corrective closeout is consistently identified as `021B-structural-reconciliation-and-closeout`.
5. Close Sprint 021B as **structurally-ready**, while recording authenticated proof as deliberately unperformed and outside this sprint.

## In Scope

- read-only review of the completed 0011/0012 SQL, bootstrap markers, verification SQL, structural tests, static validator, application role helpers, and comment authorization code
- rerunning existing local, static, test, lint, TypeScript, build, JSON, secret-scan, and diff checks where they do not require credentials or mutation
- sanitized, read-only confirmation of candidate ledger, expected structural counts, linked database lint, Security Advisor findings, candidate health, and old-project health through already configured non-secret tooling
- a durable review at `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md`
- one explicit row for each of the 22 advisor warnings, recording stable finding identifier or type, affected object/control, count represented by that row, structural evidence, disposition, owner, rationale, and reopen condition
- exact reconciliation proving the individual warning rows sum to 22 and match zero errors / 22 warnings / zero suggestions
- canonical closeout updates to `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, `planning/ARCHITECT_BRIEFING.md`, `docs/SPRINT_021_PROGRESS.md`, and only directly relevant entries in `planning/DECISIONS.md`, `planning/RISKS.md`, or `planning/QUESTIONS.md`
- preservation of the existing dirty worktree and all unrelated user changes

## Approved File Set

Builder may create or update only:

- `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/SPRINT_SCHEDULE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `docs/SPRINT_021_PROGRESS.md`
- directly relevant 021/021B rows or sections in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`

The applied Sprint 021B sprint files may be checked off or annotated only as part of normal Builder evidence recording. No source, migration, bootstrap, verification SQL, test, script, configuration, application, infrastructure, or environment file may be edited.

## Structural Audit Rules

- Treat migrations `0011` and `0012` as immutable applied history. Do not edit, rename, delete, repair, squash, mark, revert, reapply, or replace either migration.
- Do not create migration `0013` or any other migration.
- Compare implementation to the already accepted Sprint 021 structural contract; do not redefine roles, permissions, lifecycle behavior, ownership, assignments, comments, RLS, or product behavior.
- Confirm the candidate evidence remains consistent with: ledger `0001`-`0012`, 35/35 public tables with RLS, 87 policies, 11 fixed-path role helpers with zero anonymous execution, seven definitive role seeds, six comment permission mappings, four comment audit columns, the 2,000-character constraint, three expected indexes, ownership-history trigger, zero horse/stable DELETE policies, 1,774 lookup rows, zero Auth users, zero Storage buckets, and zero Storage objects.
- A mismatch is a stop condition. Record it as a blocker; do not correct implementation under this pack.
- Local container replay remains unavailable in this environment and is not a blocker. Do not install Docker, PostgreSQL, Podman, WSL, or replacement tooling.

## Advisor Reconciliation Rules

- Capture no credential, token, key, session, identity, inbox, SQL payload, or sensitive row data.
- Use current sanitized advisor evidence, or rerun only the read-only Security Advisor command through the already configured linked context when that requires no credential access or change.
- Reconcile every current warning individually. If repeated warnings share a type, each affected object must still be named on its own row unless one row carries an explicit object list and an exact count that makes the 22-item arithmetic independently checkable.
- Classify each warning as `accepted-existing-control`, `accepted-platform-plan-exception`, or `blocking`. Do not claim a warning is fixed unless the current read-only advisor result no longer contains it.
- For authenticated `SECURITY DEFINER` helper warnings, confirm fixed search path, absence of `anon`/`PUBLIC` execution, exact authenticated need, current RLS dependency, joint ownership, and a reopen condition.
- For leaked-password protection, preserve the existing passwordless Free-plan exception only if current sanitized evidence still supports it; identify Randell Rankin and Philip Rankin as joint owners and require reopening before any password-authentication feature or plan change.
- Zero advisor errors is mandatory. Any error, suggestion requiring investigation, unaccounted warning, count mismatch, anonymous helper execution, unsafe search path, ambiguous ownership, or unsupported rationale blocks closeout.
- No advisor fix or configuration change is permitted.

## Hard Prohibitions

Do not:

- add, remove, or alter any callback, including localhost callbacks
- request, inspect, use, rotate, copy, reveal, or persist credentials, API keys, secrets, tokens, protected environment values, or inbox contents
- create, update, delete, or inspect Auth identities, sessions, or identity payloads
- create, update, delete, or inspect application fixtures, synthetic users, run anchors, or test data
- perform authenticated testing, passwordless flows, application-runtime testing, RLS session testing, route testing, comment authorization testing, revocation testing, or cleanup/restoration testing
- create migration `0013` or modify any schema, policy, function, grant, seed, or data
- deploy, redeploy, change Vercel/environment settings, cut over production, reopen public access, change DNS, or perform production mutation
- link to, query application data from, or mutate old project `tagnbgkroihagjmvehlx`; only sanitized read-only project identity/health confirmation is permitted
- commit, push, or create a pull request unless separately requested

Candidate `uvskssaecdhxcgytkasc` is the only candidate evidence target. Any unexpected target is a refusal condition.

## Durable Numbering And Closeout

- The durable identifier is `021B-structural-reconciliation-and-closeout` everywhere current sprint identity is stated.
- Do not reopen core Sprint 021, rename it as 022, consume a new numeric sprint, or create a new `A` suffix.
- Preserve historical Sprint 021 references when they describe work actually performed under 021; correct only stale current-state, active-sprint, next-action, or closeout wording.
- `planning/STATUS.json` must remain schema-valid and close 021B with an unambiguous structurally-ready status and summary.
- Durable records must state that authenticated proof is not part of 021B, was not performed, and is not implied by structural readiness.
- The next authenticated-proof activity, if ever desired, requires a separate later Architect Pack and must use the next valid Sprint 021 follow-up suffix.

## Design, Messaging, And Manual Intervention

No design, messaging, terminology, accessibility, claims, privacy, public/authenticated surface, or architecture gate is crossed because this sprint changes durable evidence only. The project authority still applies, and no confidential information may enter durable records.

If any required read-only check cannot run without manual input, record the blocker, evidence checked, exact safe operator action, numbered steps, sanitized response requested, and what Builder will verify afterward. A manual path must not request or expose a credential and cannot expand this sprint into a prohibited action.
