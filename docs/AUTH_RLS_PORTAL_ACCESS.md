# Auth, RLS, And Portal Access Evidence

Sprint 004 verified and hardened the current auth, role, and portal access implementation from local source evidence. Secret values, tokens, passwords, private keys, connection strings, and credential fragments were not printed or stored.

## Implementation Summary

- `/sign-in` now normalizes the `next` destination to a local app path before rendering or submitting the OTP form.
- `signInWithOtpAction` now normalizes `next` before building Supabase email redirect URLs.
- `/auth/callback` now normalizes `next`, handles callback exchange failure with a non-sensitive sign-in error, and preserves the existing bootstrap path on successful exchange.
- App auth context now records app user status, member profile active state, active membership levels, and active permission codes.
- Portal layout now requires either admin permission, active portal membership, or the first-admin bootstrap exception when no admin assignment exists.
- RLS now includes self/admin `select` policies for membership levels, membership-level permissions, and permissions so signed-in users can resolve their own role/permission context without broad admin visibility.
- `supabase/bootstrap/remote-init.sql` was regenerated from migrations with `npm run db:bundle`.

## Current Flow Map

| Area | Current behavior |
|---|---|
| `/sign-in` | Shows OTP form when Supabase public env is configured; otherwise shows setup state. `next` is constrained to local app paths. |
| OTP action | Requests Supabase passwordless email link and sends users back through `/auth/callback`. Missing email and OTP failures redirect with non-sensitive error codes. |
| `/auth/callback` | Exchanges the callback code, sets Supabase cookies, bootstraps app user/profile through the service-role helper, and redirects to the normalized local `next` path. Exchange failures return to `/sign-in?error=callback`. |
| App bootstrap | Creates `users` and `member_profiles` records when service-role configuration exists. If service-role configuration is missing, bootstrap is skipped and the context remains unable to prove app profile state. |
| Portal gate | Requires signed-in session plus admin permission, active app user/profile with at least one active membership level, or initial first-admin claim eligibility. |
| Admin gate | Requires signed-in session plus `platform.admin` permission before rendering admin layouts or running admin mutations. |
| Portal data | Horse list/detail queries use the signed-in user-scoped Supabase client and rely on RLS policies such as `can_access_horse`. |
| Admin data | Admin user/membership snapshots and mutations use the service-role client after admin page/action gates have passed. |

## Role And Permission Matrix

| Case | Expected result | Evidence status |
|---|---|---|
| Anonymous -> `/portal` | Redirected to `/sign-in?next=/portal`. | Code-backed: `requirePortalAppContext` calls `requireSignedInAppContext`; live browser case blocked by missing local Supabase env/session. |
| Signed-in active member -> `/portal` | Allowed when `users.status = active`, `member_profiles.is_active = true`, and at least one active membership assignment exists. | Code-backed: `hasActivePortalMembership`; live test-user case blocked by missing Supabase test-user access. |
| Signed-in active member -> portal horse routes | Allowed to see only horses and related logs permitted by RLS. | Code-backed: portal queries use user-scoped client; RLS uses `can_access_horse`; live RLS case blocked by missing Supabase test-user access. |
| Signed-in inactive/non-member -> `/portal` | Denied with `/sign-in?error=portal-access&next=/portal`, except first-admin bootstrap when no admin assignment exists. | Code-backed: portal guard checks active app/profile/membership state. Live test-user case blocked by missing Supabase test-user access. |
| First signed-in app user when no admin exists | Allowed into portal to claim first admin if app user bootstrap exists. | Code-backed: `hasAnyAdminAssignment` exception remains available for first-admin onboarding. Live case blocked by missing Supabase test-user access. |
| Admin -> `/admin` | Allowed when active permission resolution includes `platform.admin`. | Code-backed: `requireAdminAppContext`; RLS select policies now allow own permission resolution. Live test-user case blocked by missing Supabase test-user access. |
| Non-admin -> `/admin` | Redirected away from admin surface. | Code-backed: `requireAdminAppContext` checks `platform.admin`; live test-user case blocked by missing Supabase test-user access. |
| Supabase RLS role reads | Signed-in users can read only their own active membership level and permission rows needed for app context; admins retain management access. | Code-backed: `membership_levels_self_or_admin_select`, `membership_level_permissions_self_or_admin_select`, and `permissions_self_or_admin_select`. Remote RLS execution blocked by missing Supabase access. |

## Blocked Live Acceptance Cases

Local process environment inspection found the Sprint 004 Supabase variables missing from the command environment:

- `NEXT_PUBLIC_SUPABASE_URL`: missing
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: missing
- `SUPABASE_SERVICE_ROLE_KEY`: missing
- `NEXT_PUBLIC_SITE_URL`: missing

Because no real Supabase test-user session or remote Supabase access was available in this Builder run, live acceptance for admin, active member, inactive/non-member, and direct RLS SQL execution remains blocked.

Smallest non-secret setup needed to complete the blocked cases:

- a configured local or remote Supabase environment for this project
- test users representing admin, active member, inactive/non-member, and non-admin roles
- seeded membership levels, permissions, and at least one assigned horse fixture for portal RLS checks
- permission to execute non-destructive RLS select checks against the target Supabase project

## Validation

| Check | Result |
|---|---|
| `npm run db:bundle` | Completed; regenerated `supabase/bootstrap/remote-init.sql`. |
| Secret-fragment scan of changed auth/RLS files | No `console.log`, `console.warn`, `console.error`, `slice(`, `substring(`, `sk_`, `pk_`, or `whsec_` matches. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0`; log stamp `20260711-164501-964`. |
| `npm run lint` via wrapper | `exited 0`; log stamp `20260711-164849-588`. |
| `npm run build` via wrapper in restricted sandbox | Timed out at the known Next.js startup banner; log stamp `20260711-164508-784`. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0`; log stamp `20260711-164826-212`; generated 22 routes. |
| Post-validation process check | No `node`, `npm`, or `npx` processes remained. |
---

# Sprint 007 Carry-Forward Note

Sprint 007 did not receive live Supabase test-user sessions or remote RLS execution access. The Sprint 004 auth/RLS/portal live acceptance cases remain blocked and are carried into the production launch no-go list in `docs/PRODUCTION_LAUNCH_READINESS.md`.

Local route smoke verified that `/sign-in` loads and `/auth/callback` without callback state redirects safely. Successful sign-in, active member access, inactive/non-member denial, admin access, and direct RLS checks still require the manual Supabase setup described in this document and the Sprint 007 launch-readiness report.

---

# Sprint 008 Supabase Membership Carry-Forward

Sprint 008 added an additive launch membership/permission seed migration: `supabase/migrations/0008_launch_membership_permission_seeds.sql`.

See `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md` for the launch level matrix and smoke fixture shape. Live remote RLS verification still requires applying the migration to the target Supabase project and running the admin, record-writer, read-only member, inactive/non-member, and anonymous smoke matrix.
---

# Sprint 010 Live Auth/RLS Update

Sprint 010 verified anonymous protected-route behavior in production by status code:

| Case | Result |
|---|---|
| Anonymous `GET /portal` | `307` |
| Anonymous `GET /data-entry` | `307` |
| Anonymous `GET /admin` | `307` |
| Anonymous `GET /admin/commerce` | `307` |

Authenticated member, inactive/non-member, admin, non-admin, and direct RLS checks remain blocked because Builder did not have safe launch test sessions, users, fixtures, or remote Supabase execution access.

Manual action remains the same: provide non-secret confirmation of launch test users and fixtures after the Sprint 008 migration is applied, then run the auth/RLS matrix without sharing passwords, magic links, session cookies, or tokens.

---

# Sprint 012 Auth/RLS Live Smoke Update

Sprint 012 attempted to close authenticated portal/RLS/admin smoke.

Result: blocked.

Evidence checked:

- Production anonymous protected-route smoke returned safe redirects for `/portal`, `/data-entry`, `/admin`, and `/admin/commerce`.
- Source-level guards and RLS boundaries remain documented from earlier sprints.
- No safe launch test sessions, users, or assigned/unassigned horse fixtures were available to Builder.

Manual action needed:

1. Provide safe launch test users or operator-controlled sessions for admin, active read-only member, active record writer, inactive/non-member, and anonymous cases.
2. Provide one assigned horse fixture and one unassigned horse fixture for denial checks.
3. Do not send passwords, magic links, session cookies, tokens, or screenshots containing secrets.
4. Confirm which environment should be tested: production, preview, or safe staging.

Builder will verify after action:

- anonymous and non-member denial paths
- active read-only portal access and data-entry denial
- record-writer data-entry access and assigned-horse create behavior
- unassigned-horse write denial
- admin access and non-admin denial
- phone-width and desktop-width critical route smoke
