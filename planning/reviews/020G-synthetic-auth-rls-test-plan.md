# Sprint 020G Synthetic Auth/RLS Execution Plan

## Status and Authorization Boundary

Sprint 020G is closed candidate-ready. Gate A is complete: A1-A5, B1-B6, C1-C14, D1-D3, and E1-E3 passed. Synthetic Auth/RLS and candidate-connected application-runtime testing did not complete and must not be reported as passed. Gate B was not started.

Credential incident containment: browser inspection retained legacy candidate credential material. Execution stopped before harness execution, runtime startup, Auth identity creation, or fixture creation. The affected Builder task was deleted; replacement publishable and secret keys are present; legacy anon and service_role keys are disabled. No value or fragment is reproduced.

The Site URL remains `https://precisionperformance.com.au`; the callback allowlist is restored to only `https://precisionperformance.com.au/auth/callback`; the temporary localhost callback is removed; exposed schemas remain exactly `graphql_public` and `public`; and the passwordless Free-plan exception is unchanged. Production and old-project mutation and production cutover remain unauthorized.

The remainder of this document is retained as historical 020G test design. Its uncompleted authenticated work transfers to Sprint 021 discovery; it is not a current execution authorization.

This plan targets candidate `uvskssaecdhxcgytkasc` only. Production `https://precisionperformance.com.au` remains connected to old project `tagnbgkroihagjmvehlx`; candidate Auth testing therefore requires the already accepted temporary localhost callback design after separate approval.

Randell Rankin and Philip Rankin jointly own protected identities, fixtures, cleanup, the leaked-password exception, and rollback. The exception applies only while the application remains passwordless; any future password-authentication feature must reopen and resolve it.

## Correct Bootstrap Description

`bootstrapAuthenticatedUser` in `lib/auth/bootstrap.ts` checks `public.users` by `auth_user_id`, inserts one active `public.users` row if absent, then inserts one `public.member_profiles` row if absent. It returns the application user ID.

It does **not** insert `public.user_membership_levels`, choose a membership level, or create trainer, owner, staff, stable, horse, assignment, operational, or biochemistry rows. Every membership and fixture below is a separate protected setup action after Gate B approval.

## Candidate Callback and Secret Controls Preserved

- Candidate: `uvskssaecdhxcgytkasc`, `Precision Performance Clean Rebuild`, organization `hohxquwkfehiuyrysufu`, `ap-southeast-1`, Free, `ACTIVE_HEALTHY`.
- Old protected project: `tagnbgkroihagjmvehlx`, required `ACTIVE_HEALTHY` and unchanged.
- Canonical Site URL stays `https://precisionperformance.com.au`.
- Pre/post-test callback allowlist is exactly `https://precisionperformance.com.au/auth/callback`.
- During an approved test only, add exactly `http://localhost:3000/auth/callback` as the second callback.
- Local process uses `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
- Candidate URL, public key, and service-role/secret key are supplied only through a protected process environment using hidden input where applicable. No values in arguments, files, conversation, screenshots, shell history, environment dumps, logs, or retained output.

## Gate A - Exact Read-Only Evidence Orchestration

Gate A is an evidence bundle across supported surfaces. No single tool proves the whole gate. Gate A completed with groups A-E passing independently; it did not require candidate keys or JavaScript harness execution.

### Safety Classes

- **R0 local:** reads repository/local safe-reference state only; no network.
- **R1 remote metadata:** authenticated read-only Management API/CLI request; no project mutation.
- **R2 protected dashboard read:** navigation and visible-state inspection only; no save, rerun, rotate, reveal, copy, or edit action.
- **R3 read-only database:** SQL begins `transaction read only`, returns aggregates/catalog metadata only, and rolls back.
- **R4 limited harness read:** candidate Data API queries through process-only credentials; no insert/update/delete/Auth-admin call.

### Gate A Evidence Matrix

| Assertion | Exact proposed command/tool/step | Surface and safety class | Why read-only | Exact candidate guard | Credential requirement | Sanitized expected result | Stop conditions | Builder verifies afterward |
|---|---|---|---|---|---|---|---|---|
| A1 Candidate identity | `npx --no-install supabase projects list` | Supabase CLI -> Management API, R1 | Lists project metadata; no create/update/delete operation | Exactly one ref `uvskssaecdhxcgytkasc`; name `Precision Performance Clean Rebuild`; org context `hohxquwkfehiuyrysufu` | Existing protected CLI account session; no candidate public key, service key, or DB password | Candidate ref, name, region only | Missing/duplicate/mismatched candidate | Equality with manifest and all later target guards |
| A2 Candidate health | Same `projects list` invocation | Management API, R1 | Metadata list only | Same exact candidate row | Same protected CLI session only | `status=ACTIVE_HEALTHY` | Any other/missing status | Health immediately before other Gate A groups |
| A3 Candidate plan | Open exact candidate dashboard overview and inspect organization/project plan badge; do not enter billing-change flow | Protected dashboard, R2 | Visible-state inspection only | Browser URL/header candidate ref/name plus org ID `hohxquwkfehiuyrysufu` | Existing dashboard session; no candidate keys or DB password | `plan=Free` | Paid plan, billing prompt, ambiguity, wrong org/project | Free plan agrees with accepted exception and no charge action occurred |
| A4 Old-project identity | `npx --no-install supabase projects list` | CLI Management API, R1 | Metadata list only | Exactly one ref `tagnbgkroihagjmvehlx`; never select it for linked/SQL work | Protected CLI account session only | Old ref and region only | Missing/duplicate/mismatched old ref | Old ref is distinct from every candidate target |
| A5 Old-project health | Same `projects list` invocation | Management API, R1 | Metadata list only | Exact old row only | Protected CLI account session only | `status=ACTIVE_HEALTHY` | Any other/missing status | Old project remains rollback-ready and no mutation was issued |
| B1 Canonical Site URL | Candidate Dashboard -> Authentication -> URL Configuration; inspect Site URL | Protected dashboard, R2 | No edit or Save | Candidate ref in URL/header | Dashboard session only; no keys/password | `https://precisionperformance.com.au` | Any other URL or ambiguity | Exact canonical value; field remained untouched |
| B2 Callback allowlist | Same URL Configuration page; inspect every redirect entry | Protected dashboard, R2 | No Add/Remove/Save | Candidate ref in URL/header | Dashboard session only | Exactly one callback: `https://precisionperformance.com.au/auth/callback` | Extra/missing/different callback | List cardinality 1 and exact equality |
| B3 Email provider | Candidate Dashboard -> Authentication -> Sign In / Providers | Protected dashboard, R2 | No provider toggle/save | Candidate ref in URL/header | Dashboard session only | `Email=enabled`; all displayed unsupported providers disabled/absent | Email disabled or another provider enabled | Email is sole supported application provider |
| B4 Email confirmations | Same Providers page; inspect `Confirm email` | Protected dashboard, R2 | No toggle/save | Candidate ref in URL/header | Dashboard session only | `Confirm email=enabled` | Disabled/ambiguous state | Dashboard state matches `supabase/config.toml` intent |
| B5 Leaked-password exception | Candidate Dashboard -> Authentication -> Attack Protection | Protected dashboard, R2 | No upgrade/toggle/save | Candidate ref and Free plan reconfirmed | Dashboard session only | Disabled/unavailable on Free; application remains Email OTP/magic-link only | Password flow exists, paid prompt, or control unexpectedly changes | Exception owners/condition remain valid; no enablement claim |
| B6 Exposed Data API schemas | Candidate Dashboard -> Integrations -> Data API -> Settings; inspect exposed schemas | Protected dashboard, R2 | No Save/Harden action | Candidate ref in URL/header | Dashboard session only | Exposed schemas exactly `graphql_public` and `public` | Additional/missing schema or ambiguity | `public` is required by the current application; `graphql_public` is Supabase-managed; no current application GraphQL dependency exists |
| C1 Linked candidate guard | `Get-Content -LiteralPath supabase\.temp\project-ref` | Local filesystem, R0 | Reads only safe generated ref; no other temp contents | Output exactly `uvskssaecdhxcgytkasc`; explicitly refuse old/every other ref | None | Candidate ref only | Missing file, whitespace/extra content, old/unexpected ref | Exact equality before linked CLI command |
| C2 Migration ledger | After C1: `npx --no-install supabase migration list --linked` | Supabase CLI/database metadata, R1 | Lists migration history; no push/repair/apply | C1 exact candidate equality and candidate-only CLI context | Protected CLI/database authentication if prompted; no candidate public/service key; no password in arguments/output | Local/remote versions exactly `0001`–`0010`, one each, ordered | Extra/missing/mismatch/target ambiguity | Ten exact versions and no repair/double-application |
| C3 Public tables | Execute stored `supabase/verification/020G-clean-project-verification.sql` unchanged in candidate SQL Editor | Existing verification SQL, R3 | Begins read-only transaction and ends rollback | Candidate URL/header/ref immediately before execution; static SQL validator passes | Dashboard session only; no candidate keys/DB password disclosed | `public_table_count=33` | SQL error or count !=33 | Count equals manifest |
| C4 RLS-enabled tables | Same verification SQL | Existing verification SQL, R3 | Catalog aggregate in read-only transaction | Same candidate guard | Same | `rls_table_count=33` | Count !=33 | Every public table is RLS-enabled |
| C5 Policies | Same verification SQL | Existing verification SQL, R3 | Catalog aggregate only | Same candidate guard | Same | `policy_count=78` | Count !=78 | Policy count unchanged |
| C6 Secured helpers | Same verification SQL security assertion | Existing verification SQL, R3 | Catalog privilege/config reads only | Same candidate guard | Same | Helper assertion passes with exactly 11 helpers and 11 safe search paths | Assertion/error or count drift | All expected helper names present and secured |
| C7 Exact helper grants | Same verification SQL security assertion | Existing verification SQL, R3 | Uses privilege inspection only | Same candidate guard | Same | `PUBLIC execute=0`, `anon execute=0`, `authenticated execute=11` assertion passes | Any grant count mismatch | Minimum grants match migration 0010; no public/anon regression |
| C8 Carbs lookup | Same verification SQL lookup aggregate | Existing verification SQL, R3 | Aggregate count only | Same candidate guard | Same | `carbs=151` | Count mismatch | Exact group count |
| C9 pH-average lookup | Same verification SQL | Existing verification SQL, R3 | Aggregate count only | Same | Same | `ph_average=521` | Count mismatch | Exact group count |
| C10 Salts lookup | Same verification SQL | Existing verification SQL, R3 | Aggregate count only | Same | Same | `salts=801` | Count mismatch | Exact group count |
| C11 Urea lookup | Same verification SQL | Existing verification SQL, R3 | Aggregate count only | Same | Same | `urea=301` | Count mismatch | Exact group count |
| C12 Total lookups | Same verification SQL | Existing verification SQL, R3 | Aggregate count only | Same | Same | `total_lookup_count=1774` | Count mismatch | Sum matches four groups |
| C13 Lookup uniqueness | Same verification SQL | Existing verification SQL, R3 | Aggregate distinct comparison only | Same | Same | `duplicate_key_count=0` | Non-zero | No duplicate `(lookup_type, exact_reading, source_version)` key |
| C14 Retired surfaces | Same verification SQL security assertion | Existing verification SQL, R3 | Catalog-name count only; no row payload | Same | Same | Legacy assertion passes with count 0 | Assertion/error/non-zero | All seven exact retired names absent |
| D1 Auth users | Candidate SQL Editor supplemental count block | Protected dashboard SQL, R3 | `transaction read only`; aggregate count; rollback | Candidate header/ref immediately before execution | Dashboard session only; no candidate keys/password disclosed | `auth_user_count=0` | Non-zero/error/ambiguity | No identities exist before Gate B |
| D2 Storage buckets | Same supplemental SQL | Protected dashboard SQL, R3 | Aggregate count only; rollback | Same candidate guard | Same | `storage_bucket_count=0` | Non-zero/error | No bucket exists |
| D3 Storage objects | Same supplemental SQL | Protected dashboard SQL, R3 | Aggregate count only; rollback | Same candidate guard | Same | `storage_object_count=0` | Non-zero/error | No object/metadata exists |
| E1 Advisor errors | Candidate Dashboard -> Advisors -> Security; inspect current tabs without `Rerun linter` | Protected dashboard, R2 | Reads current displayed analysis only | Candidate ref in URL/header | Dashboard session only | `errors=0` | Non-zero/stale/ambiguous/wrong target | No unresolved security error |
| E2 Accepted warnings | Same Advisor page; inspect warning count/titles | Protected dashboard, R2 | No rerun/reset/fix | Same candidate guard | Dashboard session only | `warnings=11`, all matching accepted authenticated-helper disposition | Count/title drift | Every warning maps to recorded joint-owner acceptance |
| E3 Suggestions | Same Advisor page | Protected dashboard, R2 | Visible count only | Same candidate guard | Dashboard session only | `suggestions/info=0` | Non-zero/ambiguous | No new advisory item |
### Exact Group Commands and Operator Steps

#### A. Management metadata

1. In the repository root, run `npx --no-install supabase projects list` using the existing protected CLI account session.
2. Retain only the two safe reference rows and the candidate name/region/status fields; do not retain organization tokens or unrelated project details.
3. Inspect the candidate dashboard plan badge under exact candidate/org identity and retain only `Free`.

#### B. Protected hosted configuration

1. Open only candidate `uvskssaecdhxcgytkasc`.
2. Inspect URL Configuration, Sign In / Providers, Attack Protection, and Data API Settings in that order.
3. Do not click Save, add/remove callbacks, toggle providers, open keys, upgrade, harden, or rerun anything.
4. Return only the sanitized values listed in group B rows.

#### C. Database structure

1. Run `Get-Content -LiteralPath supabase\.temp\project-ref`; continue only on exact candidate equality.
2. Run `npx --no-install supabase migration list --linked`; retain only the local/remote version table.
3. In the candidate SQL Editor, reconfirm candidate identity and execute the repository verification SQL exactly. Do not edit it in the dashboard.
4. Retain aggregate/count rows and pass/fail only; never row payloads.

#### D. Managed data baseline SQL

```sql
begin transaction read only;
select
  (select count(*) from auth.users) as auth_user_count,
  (select count(*) from storage.buckets) as storage_bucket_count,
  (select count(*) from storage.objects) as storage_object_count;
rollback;
```

Execute only in the exact candidate SQL Editor after header/reference equality. Retain the three counts only.

#### E. Security advisor

1. Open candidate Security Advisor.
2. Read the currently displayed Errors, Warnings, and Info/Suggestions tabs/counts.
3. Inspect warning titles only far enough to match the recorded 11 authenticated-helper warnings.
4. Do not click `Rerun linter`; a future rerun is a separate dashboard action, not part of this read-only Gate A definition.

#### Candidate Local Runtime Preflight (formerly Group F)

This is not part of Gate A. It occurs only after temporary localhost callback approval and protected process setup, and before Gate B. It verifies the candidate hostname, required key presence, trainer and owner permission mappings, and zero anchors for the reserved run ID.

Reserved and unused run ID: `020G-RLS-20260720-01`.

After the callback and protected process setup are separately approved and completed, invoke:

`node scripts/supabase-synthetic-auth-rls-020G.mjs --mode=preflight --run-id=020G-RLS-20260720-01`

The command contains no secret value. The process environment supplies candidate URL/public/service-role values. Expected sanitized result is limited to:

```json
{"harness":"020G","mode":"preflight","state":"passed","candidate":"uvskssaecdhxcgytkasc","runId":"020G-RLS-20260720-01","checks":["candidate-equality:pass","seed-permissions:pass","run-anchors-zero:pass"],"messageCode":"LIMITED_HARNESS_PREFLIGHT_COMPLETE"}
```

Historical attempt state: a local invocation reserved `020G-RLS-20260720-01` but stopped with `CANDIDATE_URL_MISSING`. It constructed no Supabase client, made no remote request, accessed no candidate key, and created no callback, Auth identity, or fixture. The run ID remains reserved and unused. This was a Candidate Local Runtime Preflight setup stop, not a Gate A failure.

### Protected Manual Callback Instructions

1. Obtain explicit approval to add the temporary callback; Gate A completion alone does not authorize it.
2. Sign in to the Supabase dashboard through the operator's protected session and open only candidate `uvskssaecdhxcgytkasc` (`Precision Performance Clean Rebuild`).
3. Reconfirm the candidate reference in the dashboard URL/header before any edit. Stop on any mismatch.
4. Open Authentication -> URL Configuration. Leave Site URL exactly `https://precisionperformance.com.au`.
5. Confirm the existing production callback is exactly `https://precisionperformance.com.au/auth/callback`.
6. Add exactly `http://localhost:3000/auth/callback` as the second redirect URL and save once. Do not remove or alter the production callback.
7. Return only the sanitized callback list and confirmation that the Site URL is unchanged. Do not open, copy, reveal, rotate, or report any key or secret.
8. Stop. Builder will verify the allowlist contains exactly those two callbacks before requesting protected process setup; the candidate runtime and Gate B remain unauthorized.
## Exact A/B Membership Model

### User A

- Existing membership level: `trainer` (`Trainer / Record Writer`).
- Exact seeded permission: `horse.records.write` only.
- Application effect: active membership permits `/portal`; `horse.records.write` permits `/data-entry/**`; RLS access/write still requires an active trainer-to-horse assignment.

### User B

- Existing membership level: `owner` (`Owner / Read-Only Member`).
- Exact seeded permissions: none. Migration `0008_launch_membership_permission_seeds.sql` contains no `owner` mapping in `membership_level_permissions`.
- Application effect: active membership permits `/portal`; absence of `horse.records.write` denies `/data-entry/**`; RLS permits access only to a horse connected through an active `public.horse_assignments.owner_id` relationship.

### Why This Does Not Invent Sprint 021

Both codes and their permission mappings are existing repository seeds. Current application gates explicitly use any active membership for portal access and `horse.records.write` for operations access. Current helpers separately define trainer manage/write and owner assigned-horse read. The plan tests those existing contracts only. It does not add a role, permission, policy, cross-stable rule, veterinarian/consultant model, or definitive future role matrix.

## Exact Membership Creation Mechanism

After both users complete passwordless callback and bootstrap, the proposed harness resolves each application user in memory from the protected A/B inbox mapping, resolves seeded level IDs by exact code, proves permissions match the immutable expected sets above, and upserts exactly:

- A application user -> `trainer`
- B application user -> `owner`

into `public.user_membership_levels` using the existing unique `(user_id, membership_level_id)` key. `starts_at` is the test start time, `ends_at` is null. It refuses any additional level or any unexpected seeded permission mapping. This is a service-role candidate-only setup operation, not an RLS assertion. Retained evidence records only `A -> trainer`, `B -> owner`, and permission codes; no email or UUID.

## Fixture Topology and Creation

A unique non-personal run ID is mandatory, format `020G-RLS-YYYYMMDD-NN`. The harness refuses mutation without it.

Create through candidate service-role setup only, then validate through anonymous/A/B clients and application routes:

1. One stable S: `stables.code = <run-id>` and `name = <run-id>-stable`.
2. Two horses:
   - H-A: `horses.slug = <run-id>-horse-a`, stable S.
   - H-B: `horses.slug = <run-id>-horse-b`, stable S.
3. One trainer T-A linked to A profile: `trainers.license_number = <run-id>-trainer-a`; display name uses the run alias.
4. One owner O-B linked to B profile: `owners.display_name = <run-id>-owner-b`; no personal contact fields.
5. Horse assignment HA-A: H-A to T-A, `assignment_type='trainer'`, active, `notes=<run-id>`.
6. Horse assignment HA-B: H-B to O-B, `assignment_type='owner'`, active, `notes=<run-id>`.
7. No `stable_staff_assignments` row. Staff scope is intentionally not tested because there are only two approved actors and adding staff would broaden the model. Baseline and cleanup queries still prove zero run-tagged staff assignments.
8. A creates permitted H-A operational rows through current application actions: daily record; temperature, weight, water, feeding, and track rows; weather where the current flow requires it.
9. Protected setup creates one minimal H-B daily/read fixture and one H-B biochemistry test for B's read-only proof because B cannot enter `/data-entry/**`.
10. A creates one H-A biochemistry test and note through `/data-entry/biochemistry`; no upload metadata, Storage bucket, or object.

No broad admin UI onboarding or first-admin claim is used. Neither A nor B receives `admin`.

## Run-ID Traceability by Table and Field

| Fixture table | Direct run field or required trace |
|---|---|
| `member_profiles` | `display_name`: `<run-id>-user-a` / `<run-id>-user-b` |
| `user_membership_levels` | Join `user_id -> member_profiles.user_id`, exact run display name; exact level code |
| `stables` | `code = <run-id>` |
| `horses` | `slug = <run-id>-horse-a` / `-horse-b`; also `stable_id -> stables.code` |
| `trainers` | `license_number = <run-id>-trainer-a`; `member_profile_id -> A` |
| `owners` | `display_name = <run-id>-owner-b`; `member_profile_id -> B` |
| `horse_assignments` | `notes = <run-id>` plus run-tagged horse and trainer/owner joins |
| `stable_staff_assignments` | None created; cleanup proof checks `notes=<run-id>` and run stable/profile joins return 0 |
| `weather_logs` | `notes = <run-id>` and `stable_id -> stables.code` |
| `daily_records` | `notes = <run-id>` and `horse_id -> horses.slug` |
| `temperature_logs`, `weight_logs`, `water_intake_logs` | `notes = <run-id>` and joins through run daily record/horse |
| `feeding_logs` | `notes = <run-id>` and run horse/daily-record joins |
| `track_sessions` | `notes = <run-id>` and run horse join |
| `biochemistry_horse_access_assignments` | None required; if created, `notes=<run-id>` and run horse/profile joins |
| `biochemistry_tests` | No neutral tag column exists; trace strictly by `horse_id -> horses.slug LIKE '<run-id>-%'` and protected in-memory inserted-ID mapping |
| `biochemistry_test_notes` | `note_text = <run-id>-note-a`; also test/horse joins |
| `public.users` | Trace only through `member_profiles.user_id` with exact run display name; never by retained email/Auth UUID |
| Auth users | Protected in-memory A/B mapping only; no run field is available and no identifier is retained |

A fixture is cleanup-eligible only when its direct run field or required run-anchor join matches exactly. If trace is ambiguous, stop.

## Protected A/B Identity Mapping

The operator supplies two controlled non-personal inboxes through protected process environment variables. The harness resolves Auth and application records in memory and maintains:

- A alias -> protected inbox -> Auth user ID -> `public.users.id` -> `member_profiles.id`
- B alias -> protected inbox -> Auth user ID -> `public.users.id` -> `member_profiles.id`

Retained evidence contains only A/B aliases, membership codes, fixture aliases S/H-A/H-B/T-A/O-B, run ID, aggregate counts, expected-result classes, and pass/fail. It must not contain inboxes, Auth UUIDs, application/profile UUIDs, keys, OTPs, magic links, access/refresh tokens, cookies, connection strings, or raw row payloads.

## Policy-Backed Test Matrix

| Actor | Required state | Table/route | Operation | Expected | Governing policy/helper or application gate | Cleanup target |
|---|---|---|---|---|---|---|
| Anonymous | none | `/portal`, `/admin`, `/data-entry` | GET | Redirect to sign-in | `requireSignedInAppContext` | none |
| Anonymous | none | `product_categories`, `products` | SELECT active rows | Allowed | `product_categories_public_read`, `products_public_read_active` | none; seeded data untouched |
| Anonymous | none | `biochemistry_lookup_values` | SELECT | Denied/0 | `biochemistry_lookup_values_read_authenticated` | none |
| Anonymous | none | 11 secured helpers | EXECUTE | Denied | migration 0010 PUBLIC/anon revoke | none |
| A | bootstrapped, `trainer`, HA-A active | `/portal` | GET | Allowed | `hasActivePortalMembership` | A membership/profile/user |
| A | `trainer` permission | `/data-entry/**` | GET/actions | Allowed | `requireOperationalWriteAppContext`; `horse.records.write` | A operational rows |
| A | no admin permission | `/admin/**` | GET | Redirect `/portal?denied=admin` | `requireAdminAppContext`; missing `platform.admin` | none |
| A | self | `users`, `member_profiles` | SELECT/UPDATE self | Allowed | `users_*_self_or_admin`, `member_profiles_*_self_or_admin` | A profile/user |
| A | HA-A trainer | H-A `horses`, `stables`, `horse_assignments` | SELECT | Allowed | `can_access_horse`; `horses_select_accessible`; `stables_visible_through_horse_or_staff_scope_or_admin`; `horse_assignments_select_related_or_admin` | H-A/S/HA-A |
| A | no relation to H-B | H-B horse/assignment | SELECT | Denied/0 | same helpers/policies | H-B/HA-B retained until cleanup |
| A | HA-A trainer | H-A daily/temp/weight/water/feeding/track | INSERT/SELECT/UPDATE | Allowed | `can_manage_horse_records`; corresponding `*_manageable`/`*_accessible` policies | run-tagged operational rows |
| A | HA-A trainer | S weather | INSERT/SELECT/UPDATE | Allowed | `weather_logs_manage_trainers_staff_or_admin`; `can_manage_horse_records` | run weather row |
| A | HA-A trainer | H-A biochemistry test/note | INSERT/SELECT/UPDATE | Allowed | `can_write_biochemistry_horse`; `can_read_biochemistry_horse`; `biochemistry_tests_*`; `biochemistry_notes_*` | H-A test/note |
| A | authenticated | lookups | SELECT | Allowed, exact 151/521/801/301 | `biochemistry_lookup_values_read_authenticated` | none |
| B | bootstrapped, `owner`, HA-B active | `/portal` | GET | Allowed | `hasActivePortalMembership` | B membership/profile/user |
| B | owner, no permissions | `/data-entry/**` | GET/action | Redirect `/portal?denied=data-entry` | `requireOperationalWriteAppContext`; missing `horse.records.write` | none |
| B | no admin permission | `/admin/**` | GET | Redirect denied | `requireAdminAppContext` | none |
| B | HA-B owner | H-B horse/stable/assignment | SELECT | Allowed | owner branch of `can_access_horse`; related SELECT policies | H-B/S/HA-B |
| B | HA-B owner | protected H-B operational/biochemistry fixture | SELECT | Allowed | `can_access_horse`; `can_read_biochemistry_horse`; `*_select_accessible` | protected H-B fixtures |
| B | HA-B owner | H-B operational or biochemistry | INSERT/UPDATE | Denied | owner is absent from `can_manage_horse_records` and `can_write_biochemistry_horse` | none created by denied action |
| B | no relation to H-A | H-A horse/ops/biochemistry | SELECT/INSERT/UPDATE | Denied/0 | access/manage/read/write helpers and corresponding policies | H-A fixtures retained until cleanup |
| B | self vs A | users/profiles/memberships | SELECT B / SELECT A | B allowed; A denied/0 | self-or-admin policies and `user_membership_levels_self_or_admin_select` | B rows; A unchanged |
| A or B | no admin | membership/permission/product/invoice/payment/audit administration | mutation | Denied | `*_admin_manage`, `*_admin_only`, `is_admin` | none |

Delete behavior is tested only where a current explicit policy/action exists. Cleanup itself uses the protected service-role harness and is not counted as an RLS permission test.

## Implemented Harness and Approved File Scope

The local harness provides only group F limited hostname/key-presence/seed/run-anchor preflight plus protected setup, aggregate verification, and exact cleanup. It does not prove project health, plan, hosted settings, migration ledger, complete structure, managed zero baselines, or advisor status.

Proposed path: `scripts/supabase-synthetic-auth-rls-020G.mjs`.

The user narrowly approved and Builder created exactly:

- `scripts/supabase-synthetic-auth-rls-020G.mjs`

Required harness contract:

1. Read candidate URL, public key, service-role/secret key, and protected A/B inboxes only from the current process environment.
2. Never print secrets, connection strings, inboxes, UUIDs, raw rows, OTPs, magic links, sessions, or tokens.
3. Hard-code expected candidate ref `uvskssaecdhxcgytkasc`; parse hostname and refuse every mismatch, explicitly including `tagnbgkroihagjmvehlx`.
4. Require valid run ID format and reject missing/reused/ambiguous IDs.
5. Default operation is `preflight`, strictly non-mutating.
6. Expose separate explicit operations: `preflight`, `create-fixtures`, `verify-aggregates`, and `cleanup`.
7. `create-fixtures` requires a separate confirmation flag plus exact zero baseline and protected A/B mapping; it cannot create Auth users or complete OTP itself.
8. `verify-aggregates` returns aliases/counts/pass-fail only.
9. `cleanup` first produces a bounded count plan, requires an explicit cleanup confirmation, and deletes only rows reachable through exact run anchors and protected A/B mapping.
10. Stop instead of using wildcard/broad delete, truncate, reset, migration repair, guessed identifiers, or any target not uniquely traceable.
11. Clear sensitive variables/references on exit where runtime permits and never serialize them.

The harness does not replace approvals. Gate A is complete. Separate approval is still required for the temporary callback and protected process setup; another approval is required before Auth identities and fixtures.

## Exact Fixture Implementation Operations

After file-scope approval and harness review:

- `preflight`: identity hostname equality; safe metadata/ledger/structure/zero baselines; seeded levels and exact permission mappings; no writes.
- Protected operator creates A/B via Email OTP/magic-link in separate browser contexts; callback/bootstrap creates only users/profiles.
- `create-fixtures`: resolve protected A/B mapping; insert exact memberships and topology in one candidate transaction where supported; abort/roll back on any mismatch; output counts only.
- Application/browser validation: isolated A/B sessions exercise routes and actions; harness performs only policy-safe aggregate corroboration.
- `verify-aggregates`: exact per-alias/run counts and zero cross-scope visibility without raw payloads.
- `cleanup`: bounded count plan, explicit confirmation, dependency-safe transaction for application rows; Auth-user deletion last through candidate admin API after application cleanup succeeds.

## Dependency-Safe Cleanup and Proof Queries

Deletion order:

1. `biochemistry_test_notes` by joins to run horses/tests; `biochemistry_test_uploads` must be zero.
2. `biochemistry_tests` by run-horse join; then any `biochemistry_horse_access_assignments` by run horse/profile join.
3. `temperature_logs`, `weight_logs`, `water_intake_logs`, `feeding_logs`, and `track_sessions` by direct notes and run horse/daily joins.
4. `daily_records`, then `weather_logs`, by run tags/anchors.
5. `horse_assignments` by `notes=<run-id>` and run joins.
6. `stable_staff_assignments` only if a count unexpectedly exists and exact run notes/anchors prove ownership; expected zero. Otherwise stop.
7. `trainers` and `owners` by exact run fields and A/B profile joins.
8. `horses` by exact run slugs.
9. `stables` by exact run code.
10. `user_membership_levels` by exact A/B run-profile join and exact `trainer`/`owner` code.
11. `member_profiles` by exact run display names.
12. `public.users` only through the protected A/B mapping after their profiles/memberships are gone.
13. Auth users A/B last, by protected in-memory Auth mapping through candidate admin API.

Every pre-delete query uses equality on `<run-id>` or prefix equality on the two exact horse slugs plus joins through those anchors. Aggregate proofs use `count(*)`, `exists`, and grouped fixture aliases only. No `DELETE` may omit a run-anchor/mapping predicate; no manual UUID list is accepted; no query returns row payloads.

Post-cleanup proof requires zero for each table group above, Auth users 0, Storage 0/0, exact sole production callback, ledger `0001`-`0010`, unchanged 33/33 RLS tables, 78 policies, 11 secured helpers, exact lookup counts, advisor 0/11/0, both projects `ACTIVE_HEALTHY`, and old project unchanged.

## Closeout And Sprint 021 Transfer

- Harness implementation remains local/static/mock evidence only; it did not contact Supabase.
- Gate A completed independently of Candidate Local Runtime Preflight.
- The temporary callback is removed and must not be re-added under Sprint 020G.
- No A/B inbox, OTP/magic link, Auth identity, membership, application fixture, or cleanup action occurred.
- Reserved run ID `020G-RLS-20260720-01` remains unused.
- Sprint 021 discovery must revisit the definitive role matrix, identities, trainer/owner/expanded roles, assigned/wrong-horse and cross-user/cross-stable denials, application routes and authenticated RLS, fixture lifecycle and zero-count cleanup, and protected replacement-key consumption.
- No credential value may be added to any pack, sprint/repository file, retained output, or conversation.

Production cutover remains unauthorized.
