# Validation

## Anti-Hang / Loop Stopper

Validation commands that may hang must run through a bounded wrapper:

`powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 120`

The wrapper records stdout/stderr logs under `.validation-logs/` by default, or under a caller-supplied `-LogDir`. If that directory cannot be created, it falls back to the user temp directory and prints `LOG_DIR_FALLBACK`. It waits only for the configured timeout and stops validation-related `node`/`npm` processes that appeared during that run. If the timeout fires, Builder records the visible output and continues diagnosis instead of retrying indefinitely.

Use the same wrapper for lint/build if a plain command hangs once. Do not run the same hanging command repeatedly in the same sprint without changing the command, timeout, or hypothesis being tested.

Run wrapper checks sequentially so log names and process cleanup do not collide.

## Current Build Baseline

Sprint 003 preserved the local build baseline:

- `npm run lint` through the wrapper: exited `0`
- `npx tsc --noEmit --incremental false` through the wrapper: exited `0`
- `npm run build` through the wrapper outside the restricted sandbox: exited `0`

Build execution is pinned to project-local Node `22.14.0`. Do not treat global Node `24.14.1` as the project build runtime until a future maintenance sprint proves compatibility.

## Sprint 004 Validation Plan

Builder should record the exact result of each check, including command, status, timeout, exit code when available, log path when generated, and short interpretation.

Required automated checks:

- `git status --short`
- inspect auth, Supabase, portal, admin, and RLS surfaces
- scan changed auth/authorization diagnostics to confirm no secret values or secret fragments are logged
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- post-validation process check for validation-related `node/npm` processes

Required manual or integration smoke evidence:

- anonymous visitor is redirected or denied when requesting `/portal`
- valid active member can sign in and reach `/portal`
- valid active member sees only permitted member/horse data under portal routes
- non-member or inactive member is denied or redirected predictably
- admin user can reach admin-only surfaces needed for Sprint 004 verification
- non-admin user cannot reach admin-only surfaces
- Supabase RLS checks confirm admin/member/non-member boundaries for the tables used by the current portal views
- `/auth/callback` handles success and failure paths without leaking sensitive details

If a smoke case cannot be completed because credentials or remote Supabase access are unavailable, Builder should record:

- the exact case
- evidence already inspected
- why the case is blocked
- the smallest non-secret access/setup request needed
- whether code changes were still made and validated locally

## Environment Verification

Environment verification must not print secret values, credential values, tokens, passwords, private keys, or secret fragments.

Allowed:

- variable names
- required vs optional status
- local/staging/production category
- present/missing status
- short non-sensitive descriptions

Not allowed:

- actual values
- prefixes or suffixes of secret values
- token fragments
- decoded credential contents
- full connection strings
- screenshots or logs that expose values

## Cleanup Validation

Sprint 004 is not a cleanup or deletion sprint.

Builder may inspect `.release-main/`, generated artifacts, or caches only if they directly affect validation, but must not delete, force-move, or archive them without approval.

Historical Sprint 001 cleanup evidence remains in:

`references/archive/sprint-001-cleanup/MANIFEST.md`
## Sprint 004 Validation Results

| Check | Result | Notes |
|---|---|---|
| `git status --short` | Completed | Dirty worktree remains; unrelated/user-owned changes were not reverted. |
| Auth/Supabase/portal/admin/RLS inspection | Completed | Source flow mapped in `docs/AUTH_RLS_PORTAL_ACCESS.md`. |
| Name-only Supabase env presence check | Completed | Required local process env variables were missing; no values were printed. |
| Secret-fragment scan of changed auth/RLS files | Completed | No unsafe logging or secret-fragment patterns found in changed auth/RLS files. |
| `npm run db:bundle` | `exited 0` | Regenerated `supabase/bootstrap/remote-init.sql` from migrations. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0` | Log stamp `20260711-164501-964`. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260711-164849-588`. |
| `npm run build` via wrapper in restricted sandbox | Timed out | Log stamp `20260711-164508-784`; output stopped at the known Next.js startup banner. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260711-164826-212`; strict build completed and generated 22 routes. |
| Post-validation process check | Completed | No `node`, `npm`, or `npx` processes remained. |

Live Supabase test-user smoke cases remain blocked because this Builder run did not have configured Supabase environment variables, real test-user sessions, or remote RLS execution access. The blocked cases and smallest non-secret setup request are recorded in `docs/AUTH_RLS_PORTAL_ACCESS.md`.
## Sprint 005 Validation Results

| Check | Result | Notes |
|---|---|---|
| `git status --short` | Completed | Dirty worktree remains; unrelated/user-owned changes were not reverted. |
| Portal horse, ops/data-entry, domain, auth guard, and RLS inspection | Completed | Workflow map and blocked live cases documented in `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`. |
| Name-only Supabase env presence check | Completed | Required local process env variables were missing; no values were printed. |
| Secret-fragment scan of changed Sprint 005 files | Completed | No unsafe logging or secret fragments found; benign `slice` parsing/list limiting and literal env-name setup text were reviewed. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0` | Log stamp `20260711-170711-021`. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260711-170711-068`. |
| `npm run build` via wrapper in restricted sandbox | Timed out | Log stamp `20260711-170722-999`; output stopped at the known Next.js startup banner. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260711-171041-304`; strict build completed and generated 22 routes. |
| Post-validation process check | Completed | No `node`, `npm`, or `npx` processes remained. |

Live Supabase/test-user/RLS smoke and phone/desktop authenticated workflow smoke remain blocked by missing configured Supabase environment/test-user access in this Builder run. Exact manual-intervention instructions are recorded in `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`.
## Sprint 006 Validation Results

| Check | Result | Notes |
|---|---|---|
| `git status --short` | Completed | Dirty worktree remains; unrelated/user-owned changes were not reverted. |
| Admin user/membership, admin gates, product catalogue, checkout, webhook, Stripe env/server helpers, commerce helper, and commerce migrations inspection | Completed | Behavior map and evidence documented in `docs/ADMIN_COMMERCE_HARDENING.md`. |
| Name-only Supabase/Stripe env presence check | Completed | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_SITE_URL` were missing from the process environment; no values were printed. |
| Secret-fragment scan of Sprint 006 changed diagnostics | Completed | No secret values or fragments found. Matches were sanitized `console.error` calls, boolean webhook-secret configured status, required internal webhook-secret verification use, and display-only ID shortening. |
| Admin smoke matrix | Code-backed completed; live blocked | Admin gates/actions were inspected and hardened. Live admin/non-admin test-user cases remain blocked by missing Supabase env/test users. |
| Commerce smoke matrix | Code-backed completed; live blocked | Shop/checkout/webhook paths were inspected and hardened. Live product, checkout, webhook replay, duplicate delivery, and out-of-order cases remain blocked by missing Supabase/Stripe test access. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0` | Log stamp `20260711-173521-320`. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260711-173528-253`. |
| `npm run build` via wrapper in restricted sandbox | Timed out | Log stamp `20260711-173105-680`; output stopped at the known Next.js startup banner. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260711-173541-626`; strict build completed and generated 23 routes including `/admin/commerce`. |
| Post-validation process check | Completed | No `node`, `npm`, or `npx` processes remained. |

Live Supabase admin/commerce smoke, Stripe test checkout, Stripe webhook replay, duplicate webhook delivery, and carried Sprint 004-005 live smoke cases remain blocked by missing configured environment/test access. Exact manual-intervention instructions are recorded in `docs/ADMIN_COMMERCE_HARDENING.md`.

---

# Sprint 007 Validation Results

| Check | Result | Notes |
|---|---|---|
| `git status --short` | Completed | Dirty worktree remains; unrelated/user-owned changes were not reverted. |
| Deployment, Vercel linkage, setup/status, environment, and launch docs inspection | Completed | Evidence recorded in `docs/PRODUCTION_LAUNCH_READINESS.md`. |
| Public/auth/shop/setup local route smoke | Passed unsandboxed | Port `3109`; public/shop/sign-in/health/setup/callback/checkout/webhook fallback checks returned expected statuses. Sandboxed dev startup failed with `spawn EPERM`. |
| Name-only environment process check | Completed | Required Supabase, Stripe, site URL, and Vercel marker names were missing from the Builder process environment; no values printed. |
| Env file name-only inspection | Completed | Expected variable names were present in env files; no values printed. |
| Secret-fragment scan of changed launch-readiness files/docs | Completed | Matches were historical docs/planning literal pattern references only, not secret values. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260711-175550-421`. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0` | Log stamp `20260711-175557-729`. |
| `npm run build` via wrapper in restricted sandbox | Timed out | Log stamp `20260711-175604-444`; output stopped at known Next.js startup banner. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260711-175914-324`; strict build completed and generated 23 routes. |
| Post-validation process check | Completed | No `node`, `npm`, or `npx` processes remained. |

Live Supabase/RLS/workflow/admin/commerce/Stripe smoke remains blocked until the user/operator provides safe configured environments, test users, fixtures, Stripe test-mode access, and deployment authorization as documented in `docs/PRODUCTION_LAUNCH_READINESS.md`.

---

# Sprint 008 Validation Results

| Check | Result | Notes |
|---|---|---|
| `git status --short` | Completed | Dirty worktree remains; unrelated/user-owned changes were not reverted. |
| Name-only `.env*` presence inspection | Completed | `.env.local` and `.env.vercel.production` contain nonblank Supabase/Stripe names; no values printed. |
| Stripe shape inspection | Completed | `.env.local` has expected test/webhook shapes; `.env.vercel.production` Stripe names are nonblank but not recognizable as direct Stripe key shapes from local file inspection. |
| Supabase launch migration inspection | Completed | `0008_launch_membership_permission_seeds.sql` is additive/idempotent and documents launch membership levels. |
| `npm run db:bundle` | `exited 0` | Regenerated `supabase/bootstrap/remote-init.sql`; includes `0008_launch_membership_permission_seeds.sql`. |
| Secret-fragment scan of changed Sprint 008 docs/example/migration/bootstrap files | Completed | No real-looking Stripe/Supabase secrets or assignments found. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260712-111717-047`. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0` | Log stamp `20260712-111756-045`. |
| `npm run build` via wrapper in restricted sandbox | Timed out | Log stamp `20260712-111811-025`; output stopped at known Next.js startup banner. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260712-112119-257`; strict build completed and generated 23 routes. |
| Post-validation process check | Completed | No `node`, `npm`, or `npx` processes remained. |

---

# Sprint 009 Validation Results

| Check | Result | Notes |
|---|---|---|
| `git status --short` | Completed | Dirty worktree remains; unrelated/user-owned changes were not reverted. |
| Architect Pack 009 formatting | Passed | `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-009-production-launch-deployment.md --check` found 3 valid file sections. |
| Architect Pack 009 apply | Completed | Created `planning/sprints/009-production-launch-deployment/SPRINT.md` and authorized Sprint 009 deployment work. |
| Vercel linkage inspection | Completed | `.vercel/project.json` names project `pnr-precision-performance`; `vercel.json` declares Next.js. |
| Name-only `.env*` presence inspection | Completed | Required app variable names are present in `.env.example`, `.env.local`, and `.env.vercel.production`; no values printed. |
| Vercel production env listing | Completed | Required Supabase, Stripe, and site URL names are configured as encrypted production values; no values printed. |
| Supabase remote migration application | Blocked | No `supabase` CLI or other safe remote SQL execution path was available. |
| Stripe test checkout and signed webhook replay | Blocked | No safe test-mode checkout/replay path was available without exposing secrets or mutating live payment state. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260712-113411-968`. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0` | Log stamp `20260712-113417-414`. |
| `npm run build` via wrapper in restricted sandbox | Timed out | Log stamp `20260712-113423-353`; output stopped at known Next.js startup banner. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260712-113731-780`; strict build completed and generated 23 routes. |
| Post-validation process check | Completed | No `node`, `npm`, or `npx` processes remained. |
| Vercel production deployment | Ready | Deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`; production alias `https://precisionperformance.com.au`. |
| Vercel inspect | Ready | Deployment target is production; aliases include all three launch domains. |
| Production status-code smoke | Passed | Public, shop, sign-in, health, setup, callback fallback, checkout missing-product redirect, and unsigned webhook rejection behaved as expected. |
| Secondary alias smoke | Passed | `https://www.precisionperformance.com.au` and `https://pnr-precision-performance.vercel.app` returned `200`. |
| Vercel error log scan | Completed | `vercel logs --since 1h --level error` found no logs for branch `develop`. |
---

# Sprint 010 Validation Results

| Check | Result | Notes |
|---|---|---|
| Architect Pack 010 formatting | Passed | `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-010-live-acceptance-closeout.md --check` found 6 valid file sections. |
| Architect Pack 010 dry run/apply | Completed | Created `planning/sprints/010-live-acceptance-closeout/` four-file sprint set and updated `planning/STATE.md` / `planning/STATUS.json`. |
| `git status --short` | Completed | Dirty worktree remains; unrelated/user-owned changes were not reverted. |
| Branch/revision | Completed | `develop` / `8bf310a`. |
| Vercel linkage inspection | Completed | `.vercel/project.json` names project `pnr-precision-performance`; `vercel.json` declares Next.js. |
| Name-only `.env*` inspection | Completed | Expected app variable names present; no values or fragments printed. |
| Supabase tooling | Blocked | `supabase` CLI and `psql` were not available locally, so no safe remote SQL execution path was present. |
| Stripe tooling | Partial | Stripe CLI version `1.40.3` is installed; sandboxed invocation could not access config, escalated version check succeeded. No checkout/replay was run. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260712-120647-878`. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0` | Log stamp `20260712-120652-740`. |
| `npm run build` via wrapper in restricted sandbox | Timed out | Log stamp `20260712-120658-812`; output stopped at known Next.js startup banner. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260712-121013-674`; generated 23 routes. |
| Post-validation process check | Completed | No `node`, `npm`, or `npx` processes remained on final check. |
| Vercel inspect | Ready | Production deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i` remains Ready with launch aliases. |
| Production public/safety smoke | Partial pass | Public/setup/callback/webhook/checkout missing-slug and anonymous protected-route status checks passed; malformed no-content-type checkout POST returned `500`. |
| Vercel error-log scan | Tooling blocked | Installed CLI rejected filtered log flags; no unbounded follow was started. |

Final Sprint 010 live acceptance status: partial with documented blockers.

---

# Sprint 012 Validation Results

| Check | Result | Notes |
|---|---|---|
| Architect Pack 012 formatting | Passed | `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-012-live-acceptance-closeout-and-safety-hardening.md --check` found 6 valid file sections. |
| Architect Pack 012 dry run/apply | Completed | Created `planning/sprints/012-live-acceptance-closeout-and-safety-hardening/` four-file sprint set and updated `planning/STATE.md` / `planning/STATUS.json`. |
| `git status --short` | Completed | Dirty worktree remains broad; unrelated/user-owned changes were not reverted. |
| Branch/revision | Completed | `develop` / `8bf310a`. |
| Vercel linkage inspection | Completed | `.vercel/project.json` names project `pnr-precision-performance`; `vercel.json` declares Next.js. |
| Name-only `.env*` inspection | Completed | Expected app variable names present in `.env.example`, `.env.local`, and `.env.vercel.production`; no values or fragments printed. |
| Tool availability | Completed | `supabase` and `psql` missing; Stripe CLI installed as `1.40.3`; Vercel CLI and `curl.exe` available. |
| Focused checkout tests | Not added | No local project test pattern was found outside archived/release artifacts. Sprint used route smoke plus lint/type/build validation. |
| Local checkout malformed-body smoke | Passed | Temporary local dev server on port `3123`; malformed checkout POST returned `307` in server log. |
| Local checkout missing-slug form smoke | Passed | Temporary local dev server on port `3122`; missing slug form POST returned `307` in server log. |
| Local health/setup/webhook smoke | Passed | Temporary local dev server on port `3122`; `/api/health` and `/api/setup/status` returned `200`; unsigned webhook returned `400`. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260714-161319-830`. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0` | Log stamp `20260714-161355-899`. |
| `npm run build` via wrapper in restricted sandbox | Blocked by sandbox | Log stamp `20260714-161404-084`; stderr contained `Build error occurred [Error: spawn EPERM]`, so this was not treated as meaningful build evidence. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260714-161428-593`; strict build completed and generated 23 routes. |
| Production Vercel inspect | Ready | Deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`, target `production`, aliases attached. |
| Production public/safety smoke | Passed | Public/setup/callback/webhook/checkout malformed and missing-slug plus anonymous protected routes returned expected safe statuses. |
| Supabase remote migration/checks | Blocked | No local `supabase` CLI, `psql`, or safe remote SQL execution path available. |
| Authenticated workflow/RLS smoke | Blocked | No safe launch test sessions, users, or assigned/unassigned horse fixtures available. |
| Stripe test checkout/replay | Blocked | Stripe CLI exists, but no safe test-mode checkout/replay target, endpoint setup, fixtures, or credentials were available without exposing secrets. |
| Post-validation process check | Partial | Pre-existing `node.exe` processes were present before local smoke/validation; Builder did not terminate unrelated processes. No temporary dev server process remained after smoke. |

Final Sprint 012 live acceptance status: partial with documented blockers.

---

# Sprint 012A Clean Deployment Attempt

Sprint 012A attempted Option 2: create a clean deployment path containing only the Sprint 012 checkout malformed POST safety fix.

Result: deployment stopped before production deploy.

Evidence checked:

- Temporary clean worktree: `C:\tmp\pp-012a-clean-20260714-165007`.
- Base revision: `8bf310a`.
- Clean worktree diff after patch: only `app/api/checkout/route.ts`.
- Checkout guard present: `readCheckoutFormData()` catches `request.formData()` failures and redirects to `/shop?checkout=missing-product`.
- Focused checkout-route lint passed after a minimal checkout-file unused-import cleanup in the temp tree.
- TypeScript passed: `npx tsc --noEmit --incremental false` exited `0` in the temp tree.
- Clean-tree build passed outside the restricted sandbox: `npm run build` exited `0` and generated 22 routes.
- Deploy stop evidence: the clean tree does not contain `app/(admin)/admin/commerce`, while current production smoke and Sprint 012 evidence expect `/admin/commerce` to exist and redirect for anonymous users.

Why deployment stopped:

Deploying `HEAD + checkout fix` would avoid unrelated dirty app/source changes, but it would also omit route/source that appears to be part of the current deployed MVP behavior. That is an unacceptable regression risk under the Sprint 012A stop condition for unexpected source state.

Manual action needed:

1. Confirm whether the deployment source should be current production-equivalent source plus the checkout fix, rather than literal `HEAD + checkout fix`.
2. If yes, provide or approve a production-baseline source path that includes the already-deployed app/source behavior and only adds the checkout safety fix.
3. Alternatively, explicitly authorize deploying `HEAD + checkout fix` despite the likely removal of current production behavior such as `/admin/commerce`.

Builder will verify after action:

- source diff is bounded to the approved source baseline plus checkout safety fix
- local validation passes or any baseline-only validation gaps are accepted explicitly
- Vercel deploy target is `pnr-precision-performance`
- production smoke, including `/admin/commerce`, behaves as expected after deployment

---

# Sprint 012C Validation Results

| Check | Result | Notes |
|---|---|---|
| Architect Pack 012C formatting | Passed | `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-012C-production-baseline-reconstruction.md --check` found 6 valid file sections. |
| Architect Pack 012C dry run/apply | Completed | Created `planning/sprints/012C-production-baseline-reconstruction/` four-file sprint set and updated state/status. |
| `git status --short` | Completed | Dirty worktree remains broad; unrelated changes were not reverted. |
| Branch/revision | Completed | `develop` / `8bf310a`. |
| Candidate path | Created | `C:\tmp\pp-012c-baseline-lean-20260714-173135`. |
| Candidate secret handling | Passed | `.env*` files were excluded; no secret values were printed or stored. |
| Candidate route parity | Passed | Normalized production and candidate route counts both `25`; no missing or extra routes. |
| `/admin/commerce` preservation | Passed | Present in candidate source and build output. |
| `.release-main` extra route absence | Passed | `/admin/setup`, `/onboarding`, `/member-experience`, `/platform-stack`, and `/preview-access` absent. |
| Checkout guard | Passed | Candidate has `readCheckoutFormData()` catch around `request.formData()` and missing-product redirect. |
| `npm run lint` via wrapper from candidate | `exited 0` | Log stamp `20260714-173159-801`. |
| `npx tsc --noEmit --incremental false` via wrapper from candidate | `exited 0` | Log stamp `20260714-173200-201`. |
| `npm run build` via wrapper from candidate | `exited 0` | Log stamp `20260714-173240-912`; generated app routes including `/admin/commerce`. |
| Local smoke from candidate | Partial pass | Public/setup routes returned `200`; anonymous `/admin/commerce` returned `307`; checkout empty/malformed POST returned `307`; unsigned webhook returned `503` because env files were intentionally excluded. |
| Post-validation process check | Partial | Candidate dev server was stopped; unrelated pre-existing `node.exe` processes remained and were not terminated. |

Final Sprint 012C status: complete, candidate ready for explicit deployment approval. No deployment was performed.
---

# Sprint 012D Validation Results

| Check | Result | Notes |
|---|---|---|
| Branch/worktree | Completed | `codex/012d-production-baseline` at `C:\tmp\pp-012d-production-baseline`. |
| Source candidate | Completed | Imported from `C:\tmp\pp-012c-baseline-lean-20260714-173135`. |
| Original app baseline commit | Completed | `8a0d22b` - `chore: establish production baseline with checkout safety fix`. |
| Current branch head | Completed | `358e1fc` - `chore: harden validation wrapper log path`. |
| Secret/artifact staging check | Passed | No `.env*`, `.next`, `node_modules`, validation logs, dev logs, temp files, or `.vercel` files were staged. Existing tracked `.env.example` and `.env.vercel.production` were unchanged. |
| `/admin/commerce` preservation | Passed | Present in source and build output. |
| `.release-main` extra route absence | Passed | `/admin/setup`, `/onboarding`, `/member-experience`, `/platform-stack`, and `/preview-access` absent. |
| Checkout guard | Passed | `readCheckoutFormData()` catches `request.formData()` failure and redirects missing/malformed requests to `/shop?checkout=missing-product`. |
| Route parity | Passed | Build generated 25 app routes, matching Sprint 012C normalized production parity evidence. |
| `npm run lint` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260715-061311-983`. Restricted sandbox could not create wrapper log directories in the temp worktree before the hardening fix, so this validation was run outside the sandbox. |
| `npx tsc --noEmit --incremental false` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260715-061351-005`. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260715-061405-697`; build output included `/admin/commerce`. |
| Local smoke on port `3126` | Partial pass | `/`, `/shop`, `/sign-in`, `/api/health`, `/api/setup/status` returned `200`; anonymous `/admin/commerce` returned `307`; malformed checkout POST returned `307`; unsigned webhook returned `503` because `.env*` files were intentionally absent. |
| Local checkout empty POST on port `3127` | Passed | Empty/missing slug form returned `307` to `/shop?checkout=missing-product`. |
| Deployment/push/PR | Not performed | Sprint 012D did not authorize deployment, push, or PR. |

Final Sprint 012D status: complete, baseline committed and ready for explicit deployment approval. No deployment was performed.

---
# Validation Wrapper Hardening

Completed after Sprint 012D closeout to remove the tooling hang point observed in temporary worktrees.

Changes:

- `scripts/run-validation-command.ps1` now writes to `.validation-logs/` by default instead of the archived Sprint 001 path.
- The wrapper accepts `-LogDir` for relative or absolute log directory overrides.
- If the requested log directory cannot be created, the wrapper falls back to the user temp directory and prints `LOG_DIR_FALLBACK` instead of failing before the validation command starts.
- `.validation-logs/` is ignored in `.gitignore`.

Proof:

| Check | Result |
|---|---|
| Main workspace wrapper proof: `node -v` | `exited 0`; logged to `.validation-logs/` |
| Main workspace wrapper proof: relative `-LogDir` | `exited 0`; logged under `.validation-logs/override-proof/` |
| Main workspace wrapper proof: `npm run lint` | `exited 0`; log stamp `20260715-071344-304` |
| Sprint 012D temp worktree wrapper proof: `node -v` | `exited 0`; printed `LOG_DIR_FALLBACK` and logged under user temp |
| Sprint 012D temp worktree wrapper proof: `npm run lint` | `exited 0`; printed `LOG_DIR_FALLBACK`; Next lint still wrote an EPERM cache warning to stderr, but the command did not fail or hang |

Sprint 012D branch update:

- Original app baseline commit: `8a0d22b`
- Tooling-hardening follow-up commit: `358e1fc`
- Current branch head for any future deployment approval: `358e1fc`

---

# Sprint 012E Validation Results

| Check | Result | Notes |
|---|---|---|
| Architect Pack 012E check/apply | Passed | Pack checker found 6 valid file sections; apply refreshed `planning/STATE.md` and `planning/STATUS.json`. |
| Branch/revision | Completed | `develop` / `8bf310a`; broad pre-existing dirty workspace remains. |
| Cleanup archive root | Created | `references/archive/sprint-012e-repository-cleanup/`. |
| Manifest | Completed | `references/archive/sprint-012e-repository-cleanup/MANIFEST.md`. |
| Cleanup evidence doc | Completed | `docs/REPOSITORY_CLEANUP_012E.md`. |
| Archived low-risk non-runtime items | Completed | Legacy root handoff files, old logs, `.validation-logs/` proof logs, `tsconfig.tsbuildinfo`, `desktop.ini`, and empty duplicate root client-docs folder. |
| `build/` archive attempt | Reversed | Initial move made stale generated `.ts` files visible under `references/`; TypeScript reported module-resolution errors. `build/` was moved back to the ignored root location and classified as ignore/defer. |
| Secret archive check | Passed | No `.env*` files found under the Sprint 012E archive. No secret values or fragments were printed or stored. |
| Runtime source move check | Passed | No `app/`, `components/`, `lib/`, `supabase/`, or `scripts/` files were moved by cleanup. |
| Route/source inventory | Passed | App route inventory remains 29 route/layout/page files; build output generated 25 app routes including `/admin/commerce`. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260715-080334-419`; no ESLint warnings or errors. |
| `npx tsc --noEmit --incremental false` after reversing `build/` archive | `exited 0` | Log stamp `20260715-080427-904`. Earlier run exposed archived generated build types and drove the reversal decision. |
| `npm run build` via wrapper in restricted sandbox | Timed out | Log stamp `20260715-080433-509`; output stopped at known Next.js startup banner with no source error. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260715-080747-945`; generated 25 app routes including `/admin/commerce`. |
| Deployment/push/PR | Not performed | Sprint 012E did not authorize deployment, push, PR, DNS, Vercel setting, Supabase, Stripe, or production data changes. |

Final Sprint 012E status: complete. Cleanup was archive-first and reversible; no runtime behavior change was introduced.
