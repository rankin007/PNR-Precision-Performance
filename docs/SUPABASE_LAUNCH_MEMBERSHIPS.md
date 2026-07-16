# Supabase Launch Memberships

Sprint 008 defines the launch membership and permission shape for Precision Performance. The database implementation is additive and idempotent in `supabase/migrations/0008_launch_membership_permission_seeds.sql`; it updates labels and inserts missing permission mappings without deleting existing user assignments or custom mappings.

## Launch Levels

| Level code | Launch use | Permissions ensured by seed |
|---|---|---|
| `public` | Baseline public/non-member label. Do not assign for portal access. | None. |
| `owner` | Active owner or read-only member. Portal access depends on active membership and assigned-horse RLS. | None. |
| `trainer` | Active trainer or record writer. | `horse.records.write` |
| `stable-staff` | Stable-scoped operational staff. | `stable.staff.read`, `stable.staff.write`, `horse.records.write` |
| `staff` | Backward-compatible legacy alias for existing assignments. Prefer `stable-staff` for new launch assignments. | `stable.staff.read`, `stable.staff.write`, `horse.records.write` |
| `commerce-admin` | Commerce operator without full platform control. | `commerce.finance` |
| `membership-admin` | Membership operator without full platform control. | `membership.manage` |
| `admin` | Full platform administrator. | `platform.admin`, `stable.staff.read`, `stable.staff.write`, `horse.records.write`, `commerce.finance`, `membership.manage` |

## Launch Smoke Users

Use these roles for launch verification. These are role labels only; do not store passwords or magic links in docs.

| Smoke user | Required Supabase shape | Expected result |
|---|---|---|
| Admin | Active app user with `admin` membership. | Can access `/admin`, `/admin/users`, `/admin/memberships`, and `/admin/commerce`. |
| Record writer | Active app user with `trainer` or `stable-staff` membership and assigned horse fixture. | Can access `/portal` and `/data-entry`; can create/correct records only for accessible horses. |
| Read-only member | Active app user with `owner` membership and assigned horse fixture. | Can access permitted portal data; denied from `/data-entry`. |
| Inactive/non-member | Inactive app user/profile or no active membership. | Denied from portal/admin/data-entry protected areas. |
| Anonymous | No session. | Redirected to sign-in for protected areas. |

## Fixture Shape

For RLS verification, seed at minimum:

1. One active stable.
2. One horse assigned to the record-writer user.
3. One horse not assigned to the record-writer user.
4. One owner/read-only assignment for the read-only member.
5. Optional food menu and recent daily/feeding/track records for correction smoke.

## What This Does Not Do

- It does not create real users.
- It does not assign memberships to real users.
- It does not apply migrations to a remote Supabase project.
- It does not delete old levels, old mappings, records, users, products, orders, or payments.

Remote migration application remains a manual/operator step unless explicitly authorized.---

# Sprint 010 Remote Application Status

Sprint 010 did not apply `supabase/migrations/0008_launch_membership_permission_seeds.sql` remotely.

Evidence checked:

- The migration remains present locally and includes the launch levels `owner`, `trainer`, `stable-staff`, `staff`, `commerce-admin`, `membership-admin`, and `admin`.
- The migration uses additive/idempotent conflict handling and inserts missing permission mappings without deleting existing assignments.
- No local `supabase` CLI or `psql` command was available.
- No safe remote SQL execution path was available that avoided exposing secrets.

Manual action needed:

1. Open the target Supabase project using the dashboard SQL editor or an approved CLI environment.
2. Apply `supabase/migrations/0008_launch_membership_permission_seeds.sql` to the target database.
3. Do not paste connection strings, service-role keys, SQL screenshots with values, or secret fragments into chat/docs.
4. Confirm only non-secret completion status back to Builder.

Builder will verify after action:

- the seven launch membership levels exist
- expected permission mappings exist for read-only, operational write, commerce, membership, and admin roles
- existing assignments were not deleted or downgraded

---

# Sprint 012 Supabase Live Acceptance Update

Sprint 012 attempted to close the remote migration/check gate for `supabase/migrations/0008_launch_membership_permission_seeds.sql`.

Result: blocked.

Evidence checked:

- Local migration file exists and remains the target launch membership seed.
- `.env*` variable names were inspected by name only; no values were printed.
- Tool availability check found `supabase` CLI missing and `psql` missing.
- No safe dashboard, CLI, or project-approved remote SQL execution path was available to Builder.

Manual action needed:

1. Use the Supabase dashboard SQL editor or an approved Supabase CLI/SQL environment for the target project.
2. Apply `supabase/migrations/0008_launch_membership_permission_seeds.sql` if it has not already been applied.
3. Do not paste connection strings, service-role keys, screenshots containing values, or SQL results containing sensitive data into chat or docs.
4. Confirm completion by non-secret status only.

Builder will verify after action:

- launch membership levels exist: `owner`, `trainer`, `stable-staff`, `staff`, `commerce-admin`, `membership-admin`, and `admin`
- expected permission mappings exist for portal read, operational write, commerce admin, membership admin, and platform admin roles
- existing assignments were not deleted or downgraded
