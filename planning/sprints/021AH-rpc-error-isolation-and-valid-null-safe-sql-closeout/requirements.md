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
