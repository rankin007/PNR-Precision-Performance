============================================================
FILE: planning/sprints/021AH-rpc-error-isolation-and-valid-null-safe-sql-closeout/requirements.md
============================================================

# Sprint 021AH - RPC-Error Isolation And Valid Null-Safe SQL Closeout Requirements

## Profile And Completion Target

Workflow profile: **strict**. Sprint 021AG is closed `direct-authorization-proof-failed-clean`. Migration 0016 is applied once, candidate ledger is exactly `0001`-`0016`, metadata/grants/policy inventory and local gates/build passed, but the first genuine active-author direct assertion failed `0/1`; rendered proof correctly did not run; exact Auth-last cleanup restored Auth/application/Storage `0/0/0`.

The strongest source diagnosis is the use of schema-qualified `pg_catalog.coalesce(...)` in migration 0016. PostgreSQL `COALESCE` is a conditional expression rather than an ordinary schema-qualified function. The protected harness intentionally collapsed false and RPC error, so the runtime failure class remains unproven.

This sprint must safely distinguish `false-no-row` from `rpc-error-no-row`, apply only additive migration 0017 with valid explicit null-safe SQL, pass the complete direct authorization matrix before rendered proof, rerun the full rendered 48-assertion matrix, clean exact owned state Auth-last to `0/0/0`, reconcile stale current records, and close the Supabase application-proof workstream only as `supabase-application-proof-complete-clean` when every criterion passes.

Migrations 0014, 0015, and 0016 are immutable applied history. Preserve Sprint 022/029 and all unrelated dirty-tree work untouched and unstaged.

## Opening Reconciliation

1. Apply and verify the four generated 021AH files; record dirty-worktree/index boundaries and relevant repository hashes.
2. Reconcile all 021AG evidence, exact candidate `uvskssaecdhxcgytkasc`, refusal of old project `tagnbgkroihagjmvehlx` and every other project, opening Auth/application/Storage `0/0/0`, remote ledger exactly `0001`-`0016`, immutable 0014-0016 hashes/history, exact current function metadata/grants, unchanged three-policy inventory, and absence of local/remote 0017.
3. Freeze the diagnostic result classes, migration filename/signature, direct actor/target matrix, aliases, ceilings, ownership ledger, cleanup order, rendered assertions, and protected-output rules.
4. Stop `opening-evidence-reconciliation-failed-clean` for target, ledger, zero, history, protected-loading, source, or scope ambiguity.

## Sanitized Direct-Author Diagnostic

Before implementing 0017, start from authoritative zero and create only the minimum genuine active-author fixture/session. Call the exact existing RPC through the actor client with exact note/test arguments and independently inspect mutation/attribution.

The harness may inspect the Supabase error object internally but must emit only one fixed non-disclosing class:

- `true-and-one-row`;
- `false-no-row`;
- `rpc-syntax-or-resolution-error-no-row`;
- `rpc-authorization-error-no-row`;
- `rpc-other-error-no-row`;
- `unexpected-result-no-row`; or
- `unsafe-mutation`.

Classification may use only bounded public error-code families and controlled source reconciliation. Never emit raw error text, detail, hint, body, SQL, identifiers, tokens, claims, headers, or protected values. Record whether the deployed function source contains schema-qualified `coalesce` without reproducing protected remote output; repository migration 0016 remains the source authority.

Clean the diagnostic fixture in reverse dependency order and Auth last; prove `0/0/0` before implementation. Stop immediately for unsafe/ambiguous/excessive mutation. Unless the diagnostic unexpectedly proves exact success, proceed with the frozen 0017 correction below because 0016 must still remove invalid/nonportable schema-qualified conditional syntax and retain explicit null safety.

## Exact Migration 0017 Contract

Create exactly:

`supabase/migrations/0017_valid_null_safe_authenticated_biochemistry_comment_soft_delete.sql`

It must `create or replace` only the existing exact function, with no overload:

```sql
public.soft_delete_biochemistry_comment(target_note_id uuid, target_test_id uuid)
returns boolean
```

Preserve the accepted 0016 contract: `plpgsql`, `volatile`, `security definer`, `search_path = pg_catalog, public`, governed owner, authenticated-only execute, internal actor derivation, exactly one active application user, at least one active profile, exact active note/test lookup with row lock, active Administrator or original-author-with-current-comment-permission authorization, one database timestamp, internal attribution, `user-request`, exact row-count boolean agreement, and no disclosure.

Replace every schema-qualified conditional expression with valid SQL. Prefer exact-true expressions that minimize nullable intermediate state:

```sql
actor_is_admin := public.is_admin() IS TRUE;
actor_is_author := (target_note.created_by_user_id = actor_ids[1]) IS TRUE;
actor_can_comment := public.can_comment_biochemistry_horse(target_note.horse_id) IS TRUE;
authorized := actor_is_admin OR (actor_is_author AND actor_can_comment);

IF authorized IS NOT TRUE THEN
  RETURN false;
END IF;
```

Unqualified `coalesce(expression, false)` is permitted only if required, but no `pg_catalog.coalesce`, schema-qualified `nullif`, schema-qualified `greatest`/`least`, nullable negated authorization, or implicit NULL fallthrough is allowed.

The function must fail closed for Owner, null-role actor, peer, unassigned, cross-stable, suspended/inactive user or profile, anonymous, revoked, wrong-test, nonexistent, already-deleted/repeat, ambiguous/missing actor/profile, null author, and helper-null results. It must return no row, ID, record, authorization reason, raw error, or protected value.

Privileges remain exact:

```sql
revoke all on function public.soft_delete_biochemistry_comment(uuid, uuid) from public;
revoke all on function public.soft_delete_biochemistry_comment(uuid, uuid) from anon;
grant execute on function public.soft_delete_biochemistry_comment(uuid, uuid) to authenticated;
```

Do not change policies, tables, columns, constraints, triggers, roles, helpers, ownership, application action, environment/dependencies, Auth/provider/callback settings, seed/reference data, or any other schema/product behavior.

## Validator, Tests, And Bundle

Regenerate `supabase/bootstrap/remote-init.sql` through the governed command. Align `scripts/validate-supabase-clean-rebuild-020G.ps1` to require exactly `0001`-`0017` while preserving every historical 0010/0013/0014/0015/0016 assertion.

For 0017 require the exact signature/result/language/volatility/security/search-path, internal actor/profile checks, exact target lock, exact-true Administrator/author/comment predicates, final exact-true denial, timestamp/attribution/row-count behavior, and exact grants/revocations. Reject:

- `pg_catalog.coalesce`, or any schema-qualified `coalesce`, `nullif`, `greatest`, or `least` conditional expression;
- `NOT(nullable authorization)` or an authorization guard that permits NULL fallthrough;
- caller actor/role inputs, dynamic SQL, returned rows/details, exception-based allow;
- policy/table/schema/helper/owner changes; and
- public/anon execute or protected output.

Add focused credential-free parsing/source tests that would have failed migration 0016’s schema-qualified conditional syntax and truth-table tests covering TRUE/FALSE/NULL combinations. Preserve 021R update agreement and strict-boolean delete action contract.

## Mandatory Local Gates

Before remote application pass focused 021AG/021AH tests, preserved 021AF/021AD/021R/021T/021V/021AC tests, all canonical JSON/domain/roles/Supabase/static gates, TypeScript, lint, governed bundle regeneration/equality and ordered unique headers, protected-output/prohibition scans, approved-scope/index checks, `git diff --check`, and a clean production build using the established reparse-safe method when required. Freeze hashes of repository files only.

No remote mutation may occur until every local gate passes.

## Governed Candidate Application

Migration 0017 application is expressly included for candidate `uvskssaecdhxcgytkasc` only.

1. Immediately before mutation reconfirm exact target/refusal, Auth/application/Storage `0/0/0`, ledger exactly `0001`-`0016`, accepted earlier hashes, absence of remote 0017, and reviewed 0017 as the sole pending migration.
2. Require the governed dry run to name only `0017_valid_null_safe_authenticated_biochemistry_comment_soft_delete.sql`.
3. Apply only migration 0017 once through the transaction-capable Supabase CLI path. Do not execute the bundle, replay, repair, reset, relink by guessing, or apply another migration.
4. Verify ledger exactly `0001`-`0017`, unchanged earlier history, exact function signature/owner/security/search path/grants, absence of schema-qualified conditional expressions in the effective definition using a bounded boolean check, unchanged three-policy inventory/settings, and no unrelated mutation.
5. Require the second dry run to report the database current. Migration 0017 remains applied after successful verification.

## Complete Direct Authorization Matrix Before Rendering

From authoritative zero, use genuine isolated actor clients. Service role is setup, bounded authoritative inspection, and exact cleanup only. Run once, in frozen order:

Positive controls:

1. Active original author returns exact `true`, mutates exactly one intended active comment, and has correct delete/update attribution.
2. Active Administrator returns exact `true` on another actor’s active comment with correct attribution.

Denial controls:

3. Active Owner with nullable/no primary role.
4. Distinct explicit null-role actor where supported.
5. Peer commenter.
6. Unassigned actor.
7. Cross-stable actor.
8. Suspended actor.
9. Inactive user.
10. Inactive-profile actor.
11. Anonymous actor.
12. Revoked-session/permission actor.
13. Wrong-test target.
14. Nonexistent note.
15. Already-deleted/repeat call.
16. Ambiguous/missing actor/profile where safely constructible.
17. Null-author target where schema-valid and safely constructible.
18. Any helper-null case identified by reconciliation.

Every denial must return the fixed generic false/error class, mutate zero rows, preserve attribution, and reveal no detail. Ordinary authenticated SELECT must omit deleted rows. Stop immediately on the first unsafe, ambiguous, excessive, cross-row, or wrongly attributed mutation; clean and close truthfully. Do not retry, reorder after results, weaken, or substitute service-role proof.

## Complete Rendered Proof

Only after the entire direct matrix passes, run the preserved production-build, genuine-cookie, ten-actor Playwright matrix unchanged. Require all 48 assertions: route/session agreement, comment creation/update, Administrator cross-author update, peer/Owner UI denial, whitespace and 2,000-character boundaries, own soft-delete, reload omission, original-author/delete attribution, and revocation behavior.

Rendered proof never substitutes for direct authorization. Do not create test-only endpoints or authorization surfaces. Evidence uses only fixed aliases/classes/counts, bounded timing classes, and repository hashes; never emit emails, UUIDs, cookies, tokens, links, OTP material, claims, headers, raw bodies/errors/SQL, protected paths/values, or unrestricted screenshots.

## Cleanup And Final Workstream Closeout

- Maintain exact ownership ledgers and frozen ceilings for diagnostic, direct, and rendered phases; compensate partial creation immediately.
- Remove exact owned application rows in reverse dependency order and Auth identities last; clear sessions/clients, browser profiles, owned processes/ports, runtime variables, and temporary artifacts.
- Prove final candidate Auth/application/Storage `0/0/0`, no owned residue, preserved baseline, ledger exactly `0001`-`0017`, and unchanged callback/provider/settings boundary.
- Rerun every local gate/build, bundle/hash/output/scope/index/diff check after cleanup.
- Create 021AH reconciliation, diagnostic, valid-SQL design, migration-application, direct-results, rendered-results, and cleanup/final-closeout evidence; annotate every criterion `pass`, `fail`, or `not-run`.
- Reconcile `planning/STATE.md`, `planning/STATUS.json`, schedule, roadmap, evidence index, Sprint 021 progress, validation/auth docs, decisions/risks/questions, and Architect briefing. Correct current-action and latest-build statements that remain stale while preserving historical evidence.
- Do not stage, commit, push, open a PR, deploy, change DNS, Stripe, public gate, environment/dependencies, callbacks/providers/Auth settings, or contact old/production projects.

## Approved File Set

Builder may create or update only:

- `supabase/migrations/0017_valid_null_safe_authenticated_biochemistry_comment_soft_delete.sql`;
- generated `supabase/bootstrap/remote-init.sql`;
- `scripts/validate-supabase-clean-rebuild-020G.ps1`;
- minimum focused 021AH parser/security/truth-table tests under `scripts/`;
- minimum diagnostic/direct/rendered harness/helpers under `scripts/` and `scripts/_s/021AH/`;
- preserved rendered harness only for a documented minimum correctness defect with unchanged assertions;
- `planning/reviews/021AH-source-and-scope-reconciliation.md`;
- `planning/reviews/021AH-direct-author-error-isolation.md`;
- `planning/reviews/021AH-valid-null-safe-sql-design.md`;
- `planning/reviews/021AH-candidate-migration-application.md`;
- `planning/reviews/021AH-direct-authorization-results.md`;
- `planning/reviews/021AH-rendered-proof-results.md`;
- `planning/reviews/021AH-cleanup-and-final-closeout.md`;
- applied 021AH acceptance annotations;
- `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/SPRINT_021_PROGRESS.md`, and `docs/VALIDATION.md`;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, `planning/PROJECT_SPRINT_LIST_2026-07-21.md`, `planning/EVIDENCE_INDEX.md`, and `planning/ARCHITECT_BRIEFING.md`;
- directly relevant entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

Preserve application source, migrations `0001`-`0016`, policies/tables/helpers/roles, dependencies/environment, prior sprint evidence, Sprint 022/029 work, and every unrelated file.

## Permitted Outcomes

- `supabase-application-proof-complete-clean`
- `direct-error-isolation-failed-clean`
- `valid-null-safe-sql-design-failed-clean`
- `local-validation-failed-clean`
- `candidate-migration-failed-clean`
- `direct-authorization-proof-failed-clean`
- `rendered-proof-failed-clean`
- `cleanup-failed-contained`
- `opening-evidence-reconciliation-failed-clean`
- `blocked-clean`
- `credential-incident-contained-clean`

## Manual Intervention Rule

No operator intervention is expected. If anything required fails, is blocked, or needs manual input, record what failed, evidence checked, the exact minimal user action, safe step-by-step instructions, and what Builder will verify afterward. Never request or expose credentials or protected material.

============================================================
FILE: planning/sprints/021AH-rpc-error-isolation-and-valid-null-safe-sql-closeout/blueprint.md
============================================================

# Sprint 021AH - RPC-Error Isolation And Valid Null-Safe SQL Closeout Blueprint

## Phase 1 - Reconcile

1. Apply/verify four files and freeze scope, hashes, target/refusal, zero, ledger, immutable history, matrices, ceilings, and cleanup.
2. Preserve migrations 0014-0016, policies, application source, settings, and unrelated work.

## Phase 2 - Isolate The 0016 Failure

1. Run one minimum genuine author RPC from zero.
2. Distinguish false from bounded error families without protected output and independently inspect mutation.
3. Clean Auth-last to `0/0/0` and record the source/runtime reconciliation.

## Phase 3 - Implement Valid 0017

1. Replace only the exact function using valid `IS TRUE`/`IS NOT TRUE` null-safe SQL.
2. Preserve every accepted actor/profile/target/lock/timestamp/attribution/security/grant boundary.
3. Reject schema-qualified conditional expressions and nullable authorization fallthrough in validator/tests.
4. Regenerate the bundle.

## Phase 4 - Local And Candidate Gates

1. Pass all focused/preserved/canonical/type/lint/build/bundle/output/scope/index/diff/hash gates.
2. Reconfirm exact candidate/refusal/zero/ledger/no-0017 and sole pending migration.
3. Apply only 0017 once and verify ledger, function, valid expression shape, grants, unchanged policies/settings, and clean second dry run.

## Phase 5 - Direct Matrix

1. Pass author and Administrator positives.
2. Pass every Owner/null-role/peer/scope/status/session/target/repeat/ambiguous/null denial.
3. Prove exact attribution, zero denied mutation, and deleted-row omission.

## Phase 6 - Rendered Matrix

1. Only after direct completion, run the unchanged 48-assertion matrix.
2. Require lifecycle, attribution, omission, UI denial, boundaries, route/session, and revocation agreement.

## Phase 7 - Cleanup And Closeout

1. Clean exact owned state Auth-last and clear runtime/browser/process artifacts.
2. Prove final `0/0/0`, ledger `0001`-`0017`, and preserved external boundary.
3. Rerun all final gates/build.
4. Complete evidence/acceptance and reconcile current records including stale blocker/build text.
5. Claim completion only when every required assertion passes.

============================================================
FILE: planning/sprints/021AH-rpc-error-isolation-and-valid-null-safe-sql-closeout/acceptance.md
============================================================

# Sprint 021AH - RPC-Error Isolation And Valid Null-Safe SQL Closeout Acceptance

Builder annotates every item `pass`, `fail`, or `not-run` with evidence.

## Opening And Diagnostic

- [ ] Pack/generated files, dirty-tree/index scope, hashes, exact candidate/refusal, opening `0/0/0`, ledger `0001`-`0016`, immutable 0014-0016, current metadata/policies, and no 0017 are reconciled.
- [ ] One genuine pre-correction author RPC distinguishes `false-no-row` from a bounded RPC error family without protected output and independently verifies exact mutation/attribution.
- [ ] Diagnostic fixture is cleaned Auth-last to `0/0/0`; no retry, weakening, raw error, or unsafe mutation occurs.

## Valid 0017 Design And Local Gates

- [ ] Migration 0017 replaces only the exact function and preserves all accepted signature/actor/profile/target/lock/timestamp/attribution/row-count/security/search-path/owner/grant behavior.
- [ ] Authorization uses valid exact-true SQL, denies unless authorization is true, and contains no schema-qualified conditional expression or nullable fallthrough.
- [ ] Owner/null-role and every other unauthorized class fail closed by design; no caller identity, dynamic SQL, returned detail, exception allow, policy/schema/owner change, or expanded privilege exists.
- [ ] Validator requires exactly `0001`-`0017`, preserves historical checks, validates 0017, and rejects schema-qualified conditional expressions.
- [ ] Focused parser/security/truth-table and all preserved tests pass.
- [ ] Every canonical/type/lint/build/bundle/output/scope/index/diff/hash gate passes before remote application.

## Candidate Migration

- [ ] Exact target/refusal/zero/ledger/no-0017/sole-pending gates pass and dry run names only 0017.
- [ ] Only reviewed 0017 is applied once; ledger becomes exactly `0001`-`0017`.
- [ ] Remote function owner/security/search path/grants and valid conditional-expression shape pass; earlier history, three policies, settings, and unrelated schema remain unchanged; second dry run is clean.

## Direct Proof

- [ ] Active original author and active Administrator positives each mutate exactly one intended comment with correct attribution.
- [ ] Owner and distinct null-role controls return generic denial with zero mutation.
- [ ] Peer, unassigned, cross-stable, suspended, inactive-user/profile, anonymous, revoked, wrong-test, nonexistent, already-deleted/repeat, ambiguous/missing actor/profile, null-author, and helper-null controls all fail safely with zero mutation.
- [ ] Ordinary authenticated SELECT omits deleted rows; evidence is genuine, authoritative, fixed-class, and contains no retry/weakening/service-role substitution.

## Rendered Proof

- [ ] Full unchanged rendered matrix runs only after all direct controls pass and finishes 48/48.
- [ ] Lifecycle, omission, attribution, Administrator management, peer/Owner UI denial, input boundaries, route/session, and revocation behavior agree with authoritative state.
- [ ] No UI-only inference, protected output, retry, weakening, or test-only authorization surface is used.

## Cleanup And Final Closeout

- [ ] Exact ownership ceilings hold; partial creation is compensated; application rows are removed in reverse dependency order and Auth last.
- [ ] Final candidate is Auth/application/Storage `0/0/0`, ledger `0001`-`0017`, no owned residue, preserved baseline, and unchanged callback/provider/settings boundary.
- [ ] Complete local gates/build/bundle/hash/output/scope/index/diff checks pass after cleanup.
- [ ] Required 021AH evidence and acceptance annotations are complete; current planning/docs/status/schedule/roadmap/index/briefing and stale active-blocker/build statements are reconciled without rewriting history.
- [ ] No prohibited Git, deployment, public/external, environment/dependency, settings, policy/schema, old-project, or unrelated mutation occurs.
- [ ] Final status is `supabase-application-proof-complete-clean`, or a permitted truthful clean/contained failure with complete manual-intervention detail.

============================================================
FILE: planning/sprints/021AH-rpc-error-isolation-and-valid-null-safe-sql-closeout/handoff-prompt.md
============================================================

# Sprint 021AH - Builder Handoff

Operate as Builder under `AGENTS.md`. Apply this Pack, verify the four generated sprint files, and execute from them. Preserve Sprint 021AG as closed, migrations 0014-0016 as immutable applied history, candidate zero, and unrelated Sprint 022/029 work.

First run the bounded genuine-author diagnostic and distinguish false from a sanitized RPC error family without exposing protected content. Independently inspect mutation, clean Auth-last to `0/0/0`, and record the source/runtime reconciliation.

Then create only migration 0017 replacing the exact function with valid explicit `IS TRUE`/`IS NOT TRUE` null-safe authorization. Preserve every accepted actor/profile/target/lock/timestamp/attribution/security/grant boundary. Add validator/parser coverage that rejects `pg_catalog.coalesce` and other schema-qualified conditional expressions, regenerate the bundle, and exhaust every local gate/build before remote mutation.

Reconfirm exact candidate/refusal/zero/ledger and apply only reviewed 0017 once. Run the complete genuine direct matrix before rendered proof, with Owner/null-role denial mandatory. Only after every direct control passes, run the full unchanged rendered 48-assertion matrix.

Continue through exact Auth-last cleanup to `0/0/0`, final gates/build, evidence, acceptance annotations, and reconciliation of all current records and stale blocker/build text. Close the workstream only as `supabase-application-proof-complete-clean` when every required criterion passes.

Stop only at an explicit safety boundary, credential incident, unsafe mutation, irreducible out-of-scope defect, or manual blocker. Do not stage, commit, push, deploy, or change any public/external system outside the exact candidate migration/proof scope.
