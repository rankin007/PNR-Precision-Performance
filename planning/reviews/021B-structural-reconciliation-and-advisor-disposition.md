# Sprint 021B Structural Reconciliation And Advisor Disposition

## Outcome

Sprint `021B-structural-reconciliation-and-closeout` is closed **structurally-ready** on 2026-07-20. This outcome covers structural reconciliation and advisor disposition only. It does not establish authenticated, runtime, cutover, or production readiness.

Authenticated positive/denial testing, callback changes, protected runtime setup, identity or fixture creation, application-route testing, revocation testing, cleanup, and restoration were deliberately not performed and were outside this sprint. If pursued, they require a separate Architect Pack using the next valid Sprint 021 follow-up suffix.

## Immutable Migration And Target Evidence

- Candidate target: `uvskssaecdhxcgytkasc`, linked and `ACTIVE_HEALTHY`.
- Protected old project: `tagnbgkroihagjmvehlx`, unlinked and `ACTIVE_HEALTHY`; only sanitized project identity/health was read.
- Genuine candidate ledger: exactly `0001` through `0012`, with local and remote entries matched once and in order and no migration after `0012`.
- `0011_definitive_role_matrix_and_comments.sql` SHA-256 at open and close: `737D201791D6A6BB13DD0D380F73ABC1A764518E9186605C3A0F5C6A1BEF69B4`.
- `0012_role_lifecycle_policy_hardening.sql` SHA-256 at open and close: `004D3E2624C905B4B78DC0BF78DA804D71397A5F4A830D994A307935DDD219EA`.
- Bootstrap markers contain `0011` before `0012`, each once; no `0013` source migration or bootstrap marker exists.
- No migration was edited, repaired, replayed, reapplied, renamed, squashed, or created in 021B.

## Structural Reconciliation

The accepted Sprint 021 contract was traced through migrations 0011/0012, bootstrap markers, structural verification SQL, candidate structure test, static validator, central role helpers, and comment authorization surfaces. Existing candidate evidence remains consistent with:

- 35 of 35 public tables RLS-enabled and 87 policies;
- 11 fixed-path core role helpers with zero `anon`/`PUBLIC` execution;
- seven definitive role seeds and six comment permission mappings;
- four comment audit columns, a 2,000-character comment constraint, three expected indexes, and the ownership-history trigger;
- zero horse/stable DELETE policies;
- exactly 1,774 lookup rows; and
- zero Auth users, zero Storage buckets, and zero Storage objects.

Linked database lint has no errors. The candidate began as an empty project and has a genuine sequential ledger, providing the supported integration evidence. Local container replay remains unavailable because Docker, PostgreSQL, Podman, and an installed WSL distribution are absent; the sprint explicitly classifies this as a non-blocking environment limitation.

## Security Advisor Reconciliation

The current read-only database Security Advisor returned 22 `WARN` findings, all type `authenticated_security_definer_function_executable`, with no `ERROR` or suggestion finding. Therefore the reconciled current advisor state is **zero errors / 22 warnings / zero suggestions**.

All 22 functions below have `SECURITY DEFINER` with fixed `search_path = pg_catalog, public`; `EXECUTE` is revoked from `PUBLIC` and `anon` and granted only to `authenticated`; their authenticated execution is intentional because current RLS policies depend on these identity, scope, permission, assignment, and comment predicates. Joint owners for every accepted warning are Randell Rankin and Philip Rankin. Reopen any function row if its caller/grant, search path, RLS dependency, exposed schema, role model, or implementation changes, or if authenticated proof later contradicts the structural contract.

| # | Finding | Affected object | Count | Evidence and rationale | Disposition | Owner | Reopen condition |
|---:|---|---|---:|---|---|---|---|
| 1 | `authenticated_security_definer_function_executable` | `public.can_access_horse(uuid)` | 1 | Fixed path; non-anonymous grant; RLS horse-scope predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 2 | same | `public.can_comment_biochemistry_horse(uuid)` | 1 | Fixed path; non-anonymous grant; RLS comment-scope predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 3 | same | `public.can_manage_biochemistry_comment(uuid)` | 1 | Fixed path; non-anonymous grant; RLS comment-author/admin predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 4 | same | `public.can_manage_horse_access_assignment(uuid,uuid,text)` | 1 | Fixed path; non-anonymous grant; RLS assignment-management predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 5 | same | `public.can_manage_horse_records(uuid)` | 1 | Fixed path; non-anonymous grant; RLS record-write predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 6 | same | `public.can_manage_scoped_user(uuid)` | 1 | Fixed path; non-anonymous grant; RLS user-lifecycle predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 7 | same | `public.can_manage_stable_role_assignment(uuid,uuid,text)` | 1 | Fixed path; non-anonymous grant; RLS stable-assignment predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 8 | same | `public.can_read_biochemistry_horse(uuid)` | 1 | Fixed path; non-anonymous grant; RLS biochemistry-read predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 9 | same | `public.can_soft_delete_biochemistry_horse(uuid)` | 1 | Fixed path; non-anonymous grant; RLS soft-delete predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 10 | same | `public.can_write_biochemistry_horse(uuid)` | 1 | Fixed path; non-anonymous grant; RLS biochemistry-write predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 11 | same | `public.can_write_stable_scope(uuid)` | 1 | Fixed path; non-anonymous grant; RLS stable-write predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 12 | same | `public.current_app_user_id()` | 1 | Fixed path; non-anonymous grant; authenticated identity predicate used by RLS helpers. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 13 | same | `public.current_member_profile_id()` | 1 | Fixed path; non-anonymous grant; authenticated profile predicate used by RLS helpers. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 14 | same | `public.current_primary_role()` | 1 | Fixed path; non-anonymous grant; authenticated primary-role predicate used by RLS. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 15 | same | `public.has_active_stable_role(uuid,text)` | 1 | Fixed path; non-anonymous grant; RLS active stable-role predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 16 | same | `public.has_explicit_horse_role(uuid,text[])` | 1 | Fixed path; non-anonymous grant; RLS explicit horse-role predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 17 | same | `public.has_permission(text)` | 1 | Fixed path; non-anonymous grant; RLS permission predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 18 | same | `public.has_stable_scope(uuid)` | 1 | Fixed path; non-anonymous grant; RLS stable-scope predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 19 | same | `public.is_active_app_user()` | 1 | Fixed path; non-anonymous grant; RLS active/suspended boundary predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 20 | same | `public.is_admin()` | 1 | Fixed path; non-anonymous grant; RLS administrator predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 21 | same | `public.is_trainer_for_horse(uuid)` | 1 | Fixed path; non-anonymous grant; RLS trainer horse-scope predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
| 22 | same | `public.is_trainer_for_stable(uuid)` | 1 | Fixed path; non-anonymous grant; RLS trainer stable-scope predicate. | `accepted-existing-control` | Randell Rankin / Philip Rankin | Shared helper condition above. |
The 22 rows above total exactly **22** current Security Advisor warnings. Zero anonymous helper execution is separately confirmed. No warning was reported fixed, hidden, or remediated.

### Hosted Auth Plan Exception

Leaked-password protection remains disabled under the established `accepted-platform-plan-exception`. The application is Email OTP/magic-link only; the control is unavailable on the accepted Free plan, and no paid upgrade is authorized. Joint owners are Randell Rankin and Philip Rankin. This hosted control is not an additional row in the current database-advisor result and therefore is not added to its 22-warning arithmetic. It must be reopened before any password-authentication feature or plan change.

## Validation

Passed on 2026-07-20:

- Architect Pack check, dry-run/application, and exact four-file generation;
- `scripts/validate-role-matrix-021.ps1`;
- `scripts/test-role-matrix-021.mjs`;
- `npx tsc --noEmit`;
- `npm run lint` with no warnings or errors;
- `npm run build`;
- candidate linked migration status and read-only security advisors;
- project identity/health checks; and
- JSON parsing, migration/bootstrap order inspection, migration hash recheck, approved-file diff inspection, secret-pattern scan, and `git diff --check` at closeout.

## Prohibited-Action Confirmation

No callback, credential, key, token, session, Auth identity, inbox, application fixture, run anchor, authenticated test, hosted configuration, migration, schema, policy, function, grant, seed, application file, deployment, production cutover, DNS, Stripe, old-project data query/mutation, commit, push, or pull request action occurred. No manual intervention was required.
