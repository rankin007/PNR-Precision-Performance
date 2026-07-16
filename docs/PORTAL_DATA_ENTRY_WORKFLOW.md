# Portal And Data Entry Workflow Evidence

Sprint 005 hardened the portal and operational data-entry workflow from local source evidence. Secret values, tokens, passwords, private keys, connection strings, and credential fragments were not printed or stored.

## Implementation Summary

- `/data-entry` routes now require operational write access before rendering the workflow shell. Signed-in users without `platform.admin` or `horse.records.write` are redirected to `/portal?denied=data-entry` with a clear access message.
- Daily record, feeding log, and track session actions now verify the submitted horse can be resolved through the current user-scoped Supabase client before attempting writes.
- Daily record metric inserts now fail visibly instead of silently reporting success when temperature, weight, or water-intake logging fails.
- Submission correction actions now resolve the real record horse from Supabase before updating, so hidden form horse IDs cannot be used to correct unrelated records.
- Daily correction metric updates/inserts now redirect with a failed-update state when the metric correction write fails.
- Submission detail parsing now preserves UUIDs in IDs such as `daily-{uuid}` instead of truncating at the first UUID hyphen.
- The fallback feeding submission link now matches the fallback feeding detail ID.
- User-facing error states now distinguish missing fields, missing Supabase configuration, inaccessible horses/submissions, failed record creation, metric write failure, and failed corrections.

## Workflow Map

| Area | Current behavior |
|---|---|
| `/portal/horses` | Loads horses through the signed-in user-scoped Supabase client and RLS-backed `horses` select policy. Shows sample horses only when Supabase public env is absent. |
| `/portal/horses/[horseId]` | Loads one RLS-visible horse plus recent daily records and latest metric logs. Inaccessible or missing horses render a safe not-available state. |
| `/data-entry` | Requires operational write permission, lists accessible horses, creates/upserts daily records, and optionally creates temperature, weight, and water logs. |
| `/data-entry/feeding` | Requires operational write permission, lists accessible horses and visible food menus, and creates feeding logs for a resolved horse. |
| `/data-entry/track` | Requires operational write permission, lists accessible horses, and creates track sessions for a resolved horse. |
| `/data-entry/submissions` | Reads recent visible daily, feeding, and track records through RLS and links each row to the correction page. |
| `/data-entry/submissions/[submissionId]` | Parses typed submission IDs, loads visible records through RLS, and allows approved-field corrections for daily, feeding, and track records. |

## Permission And RLS Evidence

- App-level data-entry access now requires `platform.admin` or `horse.records.write`.
- RLS remains the final boundary for assigned-horse and horse-record write access through `can_access_horse` and `can_manage_horse_records`.
- Create actions perform a user-scoped horse lookup before writes. If RLS does not expose the horse, the user gets `horse-not-accessible`.
- Correction actions perform a user-scoped source-record lookup before updates. If RLS does not expose the submission record, the user gets `horse-not-accessible`.
- Stripe checkout, Stripe webhook, billing, product catalogue, order/payment reconciliation, production deployment, and production settings were not changed.
- No destructive database/data operation was performed.

## Manual Intervention Required

### Live Supabase And RLS Smoke

What is blocked:
Live verification of assigned horse browsing, record creation, submission correction, and direct RLS checks with real users.

Evidence already checked:
Local process environment presence check reported these names as missing: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_SITE_URL`. Source inspection confirms the routes/actions use user-scoped Supabase clients and existing RLS policies. Automated lint, TypeScript, and the known-good unsandboxed build path pass.

Exact user/manual action needed:
Provide a configured local or remote Supabase environment and non-secret test-user setup for this project. Do not paste secret values into chat.

Steps:
1. Configure the app environment locally or in the chosen test deployment with the required Supabase variable values.
2. Create or identify test users for admin, active trainer/record writer, active owner/read-only member, inactive/non-member, and anonymous cases.
3. Seed at least one active horse assignment for the record-writer user and one horse not assigned to that user.
4. Ensure membership levels and permissions include `horse.records.write` for the record-writer and exclude it from the read-only/non-member cases.
5. Run the smoke matrix from `planning/sprints/005-portal-and-data-entry-workflow/SPRINT.md` on phone width and desktop width.
6. Run non-destructive RLS select/write-boundary checks against the target Supabase project.

Builder will verify after action:
- active permitted user sees assigned horses only
- inaccessible horse detail returns the safe not-available state
- daily, feeding, and track creation succeed only for accessible/manageable horses
- recent submissions show only visible records
- daily, feeding, and track corrections update only approved fields on accessible/manageable records
- non-writers are denied from `/data-entry`
- direct RLS checks match the app behavior

Sprint 005 can close with local/code-backed evidence, but live Supabase/RLS smoke must carry forward to launch readiness until the environment and test users are available.

### Browser / Device Smoke

What is blocked:
Phone-width and desktop-width authenticated browser smoke for the live workflow.

Evidence already checked:
The app builds successfully and route generation includes portal and data-entry routes. Local Supabase env was missing in the process environment, so authenticated workflow smoke cannot prove live data behavior in this Builder run.

Exact user/manual action needed:
Run the app with configured Supabase test environment and execute the smoke matrix on phone and desktop widths.

Steps:
1. Start the app with the configured local/test environment.
2. Use a phone-width viewport to sign in as the record-writer test user and complete portal browse, daily creation, feeding creation, track creation, submissions review, and one correction flow.
3. Repeat the same flow at desktop width.
4. Repeat denial checks as read-only/non-member and anonymous users.
5. Capture pass/fail notes without screenshots or logs that expose secret values.

Builder will verify after action:
The smoke results can be added to `docs/PORTAL_DATA_ENTRY_WORKFLOW.md` and any failures can be scoped for the next sprint or launch readiness.

## Validation Results

| Check | Result | Notes |
|---|---|---|
| `git status --short` | Completed | Dirty worktree remains; unrelated/user-owned changes were not reverted. |
| Portal horse, ops/data-entry, domain, auth guard, and RLS inspection | Completed | Workflow map and permission evidence recorded in this document. |
| Name-only Supabase env presence check | Completed | Required local process env variables were missing; no values were printed. |
| Secret-fragment scan of changed Sprint 005 files | Completed | No unsafe logging or secret fragments found. Matches were benign `slice` usage for submission parsing/list limiting and the literal env variable name already shown in a user-facing setup message. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0` | Log stamp `20260711-170711-021`. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260711-170711-068`. |
| `npm run build` via wrapper in restricted sandbox | Timed out | Log stamp `20260711-170722-999`; output stopped at the known Next.js startup banner. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260711-171041-304`; strict build completed and generated 22 routes. |
| Post-validation process check | Completed | No `node`, `npm`, or `npx` processes remained. |
---

# Sprint 007 Carry-Forward Note

Sprint 007 did not receive authenticated Supabase test users, assigned-horse fixtures, or phone/desktop authenticated browser access. The Sprint 005 live portal/data-entry workflow cases remain blocked and are carried into the production launch no-go list in `docs/PRODUCTION_LAUNCH_READINESS.md`.

Local build validation still generates the `/data-entry`, feeding, track, submissions, and correction routes. Live daily record, feeding log, track session, recent submission, correction, assigned-horse boundary, read-only denial, and device-width workflow proof still require the manual setup described in this document and the Sprint 007 launch-readiness report.

---

# Sprint 008 Supabase Membership Carry-Forward

Sprint 008 clarified the launch membership levels used for portal/data-entry verification. Record writers should use `trainer` or `stable-staff`; read-only members should use `owner`; full admins should use `admin`.

The live workflow smoke remains dependent on target Supabase migration application and fixtures described in `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md`.
---

# Sprint 010 Live Workflow Update

Sprint 010 confirmed production anonymous access to `/data-entry` redirects with status `307`, so protected operational workflow content is not exposed to anonymous users.

Live authenticated portal/data-entry workflow smoke remains blocked. Builder still needs safe launch sessions and fixtures for a record writer, read-only member, inactive/non-member, assigned horse, and unassigned horse before verifying daily, feeding, track, submissions, correction, phone-width, and desktop-width acceptance cases.

---

# Sprint 012 Portal/Data-Entry Live Smoke Update

Sprint 012 did not complete authenticated portal/data-entry workflow smoke because safe launch sessions and fixtures were unavailable.

Result: blocked.

Evidence checked:

- Anonymous production `/data-entry` returned `307`, so protected content was not exposed anonymously.
- Existing code-backed workflow hardening from Sprint 005 remains in place.
- No assigned-horse writer session, read-only member session, or assigned/unassigned horse fixtures were available.

Manual action needed:

1. Provide a safe active record-writer user/session with `horse.records.write` or equivalent launch permission.
2. Provide an assigned horse and an unassigned horse for the writer.
3. Provide a read-only member user/session for denial checks.
4. Run or authorize phone-width and desktop-width smoke against the selected environment.
5. Do not expose credentials, tokens, magic links, or private user data.

Builder will verify after action:

- daily, feeding, and track record creation for assigned horse
- write denial for unassigned horse
- submissions review and correction flow uses the real record horse
- read-only member denied from data-entry
- phone and desktop usability of critical paths
