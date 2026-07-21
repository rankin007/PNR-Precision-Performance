# Architect Briefing

## Where Things Stand

Sprint `017E-validator-reconciliation-and-local-baseline-completion` is closed **baseline-blocked-clean**. The narrow `0001`–`0012` validator correction passed, as did exact 271-path literal staging, manifest equality, exclusions, and 27 Pack checks. Mandatory staged diff checking then found pre-existing whitespace errors outside 017E scope. Builder created no commit, unstaged only manifest paths, restored the empty index, and preserved `develop`/`171d3aa` and every working file. Architect should prepare Sprint 017F to reconcile whitespace and deterministic staged-JSON parsing.

Sprint `017D-intentional-staging-and-local-baseline-commit` is closed **baseline-blocked-clean**. Exact 263-path staging and all safety gates passed, as did credential-free validation through Sprint 020F. Sprint 020G static validation exposed a stale exact-ledger assertion (`0001`–`0010`) against the accepted `0001`–`0012` migration history. Builder created no commit, restored the empty index by unstaging only manifest paths, and preserved `develop`/`171d3aa` and all working files. Architect should first plan a narrow validator reconciliation, then a separate follow-up baseline-commit retry.

Sprint `017C-repository-treatment-and-boundary-reconciliation` is closed **treatment-complete**. The two local-only roots are preserved behind exact anchored ignore rules, the samples scaffold is unchanged, and the supplied sprint-list DOCX is byte-identical at its client-docs destination. The Git index remains empty at unchanged `develop`/`171d3aa`. 017D may now plan coherent staging groups, but no staging or commit has occurred.

Sprint `017B-repository-reconciliation-and-review-baseline` is closed **inventory-complete**. A read-only reconciliation classified every closing working-tree entry while preserving `develop`, HEAD `171d3aa`, and an empty index: 35 tracked modifications, no deletions, and 220 untracked entries. The canonical Markdown/JSON inventories agree at 255 entries. Four ownership groups are decision-ready for 017C; 017D staging remains separate. No repository cleanup, implementation change, protected-content access, commit, or remote action occurred.

Sprint `021M-provider-directed-timed-jwt-reproduction` is closed **provider-escalation-required-clean**. T0 and T+20 used independent one-identity sessions 1,330 seconds apart and consistently reproduced successful exchange followed by unauthorized SDK, direct Auth, and Data API verification. The failure is `provider-internal-inconsistency-persistent`; the restricted support file contains both UTC windows and allowlisted correlations. Final Auth/application/Storage state is zero, with no hosted correction or full matrix.

The operator confirmed submission of the contained Supabase escalation on 2026-07-21. Provider response/remediation is now the only active 021M prerequisite; no further reproduction should occur before that response.

Sprint `021L-hosted-auth-jwt-reconciliation-and-closeout` is closed **provider-escalation-required-clean**. Candidate Auth issued a valid exact-project authenticated JWT whose supported asymmetric key was advertised by candidate JWKS, yet immediate SDK, direct Auth, and Data API controls rejected it. The supported class is `provider-internal-inconsistency`; Branch E produced a sanitized support bundle. No hosted or local correction was justified, the full matrix did not start, and final Auth/application/Storage state is zero.

Sprint `021K-administrator-read-correction-and-authenticated-closeout` is closed **diagnosis-complete-blocked-clean**. The exact failure class is `auth-issued-session-rejected`: candidate Auth returns a session then rejects the issued access token, and independent client/REST controls are unauthorized before RLS evaluation. No approved correction branch applies. All diagnostic state was cleaned to zero; no migration or hosted change occurred.

Sprint `021J-operator-provisioned-authenticated-proof-closeout` is closed **authenticated-role-rls-proof-failed-clean**. Target-first operator provisioning and zero-baseline checks passed; ten genuine sessions and the bounded fixture topology were established. The first Administrator direct-RLS horse read errored (`HORSE_READ_FAILED_ADMIN`), stopping the matrix. Exact cleanup restored zero Auth/application/Storage state, and hosted configuration, ledger, advisors, project health, and old-project non-contact were preserved.

Sprint `021I-credential-boundary-corrected-authenticated-proof` is closed **credential-boundary-blocked-clean**. Production build readiness is established by a passing debug run and unchanged confirmation build. The exact-candidate credential boundary remains unresolved: existing injection is absent or bound to the refused old project, and available dashboard transfer paths would expose protected material. No protected value was emitted or used remotely; protected references were cleared and zero remote state was created.

Sprint `021H-mailbox-independent-authenticated-role-rls-proof` is closed **blocked-clean**. The applied Pack and new default-nonmutating harness were implemented; 15/15 harness safety tests and existing Sprint 021 role checks passed. Protected dashboard acquisition stopped before secret access when a visible snapshot emitted a complete publishable-key value. No fresh run, identities, sessions, fixtures, callback changes, Storage objects, assertions, or remote mutations occurred; the old project was untouched.

Sprint `021G-automated-authenticated-role-rls-and-application-proof` is closed **blocked-clean**. Pack/local checks passed, but protected browser preflight stopped after a mailbox probe emitted non-address message metadata. No protected value was retained and no fresh run, callback change, identity, fixture, session, runtime, assertion, or remote mutation occurred. Auth/Storage remained zero and callback state production-only.

Sprint `021F-recovery-reconciliation-and-safe-restart-method` is closed **recovery-reconciled — 021E blocked-clean**. Authoritative Admin API evidence is zero Auth users; application/run and Storage artifacts are zero; no deletion was necessary. Production-only callback state is restored and protected process memory is cleared. Sprint 021E authenticated proof did not start.

Sprint `021D-acceptance-audit-trail-closeout` is closed **acceptance-audit-complete — structurally-ready unchanged**. All 21 Sprint 021C and all 23 Sprint 021D acceptance criteria are mapped to named evidence and checked. This was documentation-only; no technical or external state changed.

Sprint `021C-advisor-accounting-and-acceptance-record-correction` is closed **evidence-corrected — structurally-ready unchanged**. It corrected two transcription errors only: the database Security Advisor has 22 individually dispositioned warnings for 22 distinct `SECURITY DEFINER` functions, while the hosted Auth leaked-password plan exception is separate and excluded from that count. The 22-row table and Sprint 021B technical outcome did not change.

Sprint `021B-structural-reconciliation-and-closeout` is closed **structurally-ready**. Builder applied exactly the four strict-profile sprint files, audited the completed Sprint 021 structural work without changing implementation, and reconciled the current advisor state to zero errors, 22 individually dispositioned warnings, and zero suggestions.

Candidate `uvskssaecdhxcgytkasc` has genuine migration ledger `0001`-`0012`. Migrations 0011 and 0012 retained matching opening/closing hashes. Candidate and protected old project `tagnbgkroihagjmvehlx` remain `ACTIVE_HEALTHY`; old-project application data was not queried and the old project was not mutated.

Authenticated positive/denial, callback, runtime, identity, fixture, route, revocation, cleanup, and restoration proof was outside 021B and was not performed. Structural readiness does not imply authenticated, runtime, cutover, or production readiness. Production cutover remains unauthorized.

## Current Status

Active Builder sprint: none. Latest completed immediate-control sprint: 017C, outcome treatment-complete. Latest product/auth follow-up remains 021M, provider escalation submitted and pending.

021E outcome: `blocked-clean`. Run `021E-RLS-20260720-01` is permanently retired. Any replacement authenticated proof requires a separate 021G-or-later Architect Pack.

Workflow profile: strict.

## Since Last Sprint

- Applied the 021E Pack and created the approved default-nonmutating harness, self-test, manifest, and results records.
- Passed 13 harness safety cases plus credential-free repository validation.
- Confirmed exact candidate/old-project health, ledger 0001-0012, advisor 0/22/0, empty visible Auth/Storage state, and production-only callback baseline.
- Stopped before callback change, protected values, runtime, identities, fixtures, or authenticated assertions.

- Completed the 021C checklist from a baseline of 0/21 checked to 21/21 checked using the existing 021C evidence.
- Completed the 021D checklist to 23/23 checked, with group-level evidence mapping and zero unchecked criteria.
- Preserved Pack identity for 021D requirements, blueprint, and handoff after acceptance annotation.
- Passed documentation-only checkbox, JSON, wording, secret-pattern, approved-diff, and whitespace checks; no remote or technical validation was rerun.

- Corrected “21 functions” to “22 functions” in the 021B review and corrected the Sprint progress warning arithmetic.
- Confirmed the authoritative table remains exactly 22 distinct rows/functions with unchanged dispositions, owners, rationales, and reopen conditions.
- Mapped and checked every 021B acceptance item against existing named evidence.
- Reran documentation-only pack, text/count, JSON, secret-pattern, approved-diff, and whitespace checks; no remote or technical validation was rerun.

- Audited migrations 0011/0012, bootstrap order, structural verification/test surfaces, application role helpers, and comment authorization code.
- Confirmed genuine linked-candidate ledger 0001-0012 and no 0013.
- Confirmed the accepted structural baseline: 35/35 RLS tables, 87 policies, fixed-path/non-anonymous helpers, definitive seeds and comment constraints, 1,774 lookups, and zero Auth/Storage baselines.
- Reconciled each of 22 authenticated `SECURITY DEFINER` advisor warnings with evidence, joint ownership, rationale, and reopen condition.
- Preserved the separate passwordless Free-plan leaked-password exception and its mandatory reopen condition.
- Passed static validation, focused tests, TypeScript, lint, production build, JSON, secret-scan, migration-hash, approved-file diff, and whitespace checks.

## Architecture / File Map

- `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md`: canonical structural/advisor evidence and warning dispositions.
- `docs/SPRINT_021_PROGRESS.md`: concise Sprint 021/021B completion and limitation record.
- `planning/sprints/021B-structural-reconciliation-and-closeout/`: applied strict-profile Builder sprint artifacts.
- `supabase/migrations/0011_definitive_role_matrix_and_comments.sql` and `0012_role_lifecycle_policy_hardening.sql`: immutable applied history.

## Decisions

- Close 021B as structurally-ready only; do not claim authenticated, runtime, cutover, or production readiness.
- Accept the 22 authenticated helper warnings as existing controls because each helper has a fixed safe search path, no anonymous execution, an exact authenticated RLS dependency, joint ownership, and a reopen condition.
- Preserve the passwordless Free-plan leaked-password exception. Reopen it before any password-authentication feature or plan change.

## Risks / Watch-Items

- Structural readiness could be mistaken for authenticated or production readiness; durable records explicitly separate them.
- Any future authenticated test requires protected credential handling, exact candidate guards, bounded synthetic data, and complete cleanup/restoration planning in a separate pack.
- Production cutover, deployment, callback change, and old-project mutation remain unauthorized.

## Validation / Test Status

021D passed: initial four-file Pack match, final requirements/blueprint/handoff Pack identity, both zero-unchecked checklist counts, canonical wording checks, JSON parse, secret scan, approved-file diff inspection, and `git diff --check`.

021C passed: pack check/application, 22-row/function count checks, canonical wording checks, JSON parse, secret scan, approved-file diff inspection, and `git diff --check`.

Existing 021B evidence remains: migration hashes/order, candidate ledger, read-only Security Advisor, project health, static role validator, focused role/comment tests, TypeScript, lint, production build, JSON parse, secret scan, approved-file diff inspection, and `git diff --check`. These technical checks were not rerun in 021C.

Not performed in 021E: authenticated callback session, application fixtures, positive/denial assertions, route/RLS agreement, revocation, deployment, cutover, production mutation, commit, push, or PR. Recovery established zero owned state and production-only callback restoration; no deletion was necessary.

## Recommended Next Architect Action

Do not restart 021E. If authenticated proof is still desired, prepare a separate Sprint 021G-or-later Architect Pack using a fresh run ID and `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`.
