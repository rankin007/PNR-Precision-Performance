# Sprint 010 - Live Acceptance Closeout Acceptance

## Required Acceptance Criteria

- Architect Pack 010 is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 010.
- Builder records current branch/revision and dirty worktree status without reverting unrelated changes.
- Local validation is attempted and results are recorded.
- Remote Supabase migration application is completed through a safe existing path, or a manual-intervention record explains why it remains blocked.
- Non-destructive Supabase membership/permission checks are completed, or a manual-intervention record explains why they remain blocked.
- Authenticated portal/RLS/data-entry/admin smoke is completed with safe launch users and fixtures, or a manual-intervention record explains why it remains blocked.
- Stripe test checkout, signed webhook replay, and duplicate delivery verification are completed in test mode, or a manual-intervention record explains why they remain blocked.
- Production public/safety smoke is rerun and recorded.
- Final live acceptance status is stated plainly as one of:
  - `complete`
  - `partial with documented blockers`
  - `blocked`
- No secret values or fragments are printed or stored.
- Sprint-close planning docs are updated.
- `planning/ARCHITECT_BRIEFING.md` is refreshed for the next Architect session.

## Supabase Acceptance Matrix

| Case | Expected result |
|---|---|
| `0008_launch_membership_permission_seeds.sql` applied remotely | Completed safely, or blocked with manual-intervention instructions |
| `owner` level | Exists and maps to read-only portal/horse access |
| `trainer` level | Exists and maps to operational write access |
| `stable-staff` level | Exists and maps to operational write access |
| `staff` legacy alias | Still exists and maps to operational write access |
| `commerce-admin` level | Exists and maps to commerce admin visibility |
| `membership-admin` level | Exists and maps to membership admin capability |
| `admin` level | Exists and maps to platform admin capability |
| Existing assignments | Not deleted or downgraded |

## Auth/RLS/Workflow Acceptance Matrix

| Case | Expected result |
|---|---|
| Anonymous user | Denied or redirected from protected portal/admin/data-entry routes |
| Inactive or non-member user | Denied from active member portal surfaces |
| Active read-only member | Can read assigned portal/horse surfaces |
| Active read-only member data-entry | Denied |
| Record writer | Can reach `/data-entry` |
| Record writer assigned horse create | Daily, feeding, and track records succeed |
| Record writer unassigned horse create | Denied |
| Submission correction | Updates only the real record horse |
| Platform/admin user | Can reach admin pages |
| Non-admin user | Denied from admin pages |
| Phone width smoke | Critical portal/data-entry paths render and remain usable |
| Desktop width smoke | Critical portal/data-entry paths render and remain usable |

## Stripe Acceptance Matrix

| Case | Expected result |
|---|---|
| Active DB product checkout | Creates a Stripe test checkout session |
| Fallback product checkout | Remains disabled or redirects safely |
| Completed test checkout | Persists/reconciles order and payment state |
| Signed supported webhook replay | Accepted and reconciled |
| Duplicate supported webhook replay | Idempotent; no duplicate/corrupt records |
| Unsigned webhook request | Rejected safely |
| Live Stripe account mutation | Not performed |

## Production Smoke Matrix

| Case | Expected result |
|---|---|
| `GET /` | `200` |
| `GET /shop` | `200` |
| `GET /sign-in` | `200` |
| `GET /api/health` | `200` with non-sensitive response |
| `GET /api/setup/status` | `200` with configured/missing status only |
| `GET /auth/callback` without callback state | Safe redirect |
| `POST /api/checkout` with missing product/slug | Safe redirect or non-sensitive failure |
| `POST /api/stripe/webhook` unsigned request | Rejected |

## Required Validation

- `git status --short`
- branch and short revision identity
- inspect `.vercel/project.json` and `vercel.json`
- name-only `.env*` presence inspection, no values
- safe tool/path availability check for Supabase and Stripe verification
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- if sandboxed build times out at known Next startup, rerun the bounded build outside the restricted sandbox and record both outcomes
- post-validation process check for `node`, `npm`, and `npx`
- production public/safety smoke checks listed above

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action
