# Sprint 012A - Fix, Deploy, And Verify Blueprint

## Execution Shape

Sprint 012A is a deploy/provenance sprint. Keep it boring on purpose: confirm the fix, deploy it, verify it, and record what remains blocked.

Run the work in this order:

1. Establish current repo and deployment baseline.
2. Confirm the Sprint 012 checkout fix is present and source state is deployable.
3. Run local validation.
4. Deploy to the existing Vercel production project if stop conditions are clear.
5. Verify deployment status, aliases, and source provenance.
6. Run production public/safety smoke.
7. Re-check whether live acceptance blockers are still blocked.
8. Update evidence docs and close out.

## Baseline Discovery

Builder should inspect and record:

- `git status --short`
- active branch and short revision
- source diff summary for app/source files, especially `app/api/checkout/route.ts`
- `.vercel/project.json` project identity
- `vercel.json`
- current production deployment id/status if Vercel CLI access exists
- name-only `.env*` variable presence; no values
- availability of `supabase`, `psql`, Stripe CLI, Vercel CLI, and `curl.exe`

Do not print secrets. If a command would expose values, do not run it.

## Source-State Verification

Before deployment, Builder must confirm:

- `app/api/checkout/route.ts` guards `request.formData()` parse failures
- malformed/unreadable checkout POST bodies redirect safely before product, Supabase, or Stripe work
- missing slug and invalid slug behavior remains safe
- no unrelated app/source files would be deployed unexpectedly

If unrelated app/source files are dirty or source state is unclear, stop and ask.

## Local Validation

Use the bounded validation wrapper:

- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If the restricted sandbox build repeats a sandbox-only failure, rerun the bounded build outside the restricted sandbox only with approval/escalation and record both outcomes.

Run local route smoke where feasible:

- checkout missing slug form request
- checkout malformed or no-content-type POST request
- unsigned webhook rejection
- public health/setup routes

## Deployment

Deploy only to:

- Vercel project: `pnr-precision-performance`
- Production domain: `https://precisionperformance.com.au`

Use the repo's established Vercel deployment path. Do not change DNS, project settings, env values, build settings, or domains.

After deployment, record:

- deployment command used without secrets
- deployment URL
- deployment id if available
- target/environment
- aliases
- inspected status
- branch/revision/source state used

If the deployment command requires approval/escalation, request it with a narrow justification.

## Production Verification

Run production public/safety smoke after deployment:

- `GET /`
- `GET /shop`
- `GET /sign-in`
- `GET /api/health`
- `GET /api/setup/status`
- `GET /auth/callback` without callback state
- `POST /api/checkout` with missing product/slug
- `POST /api/checkout` malformed/no-content-type body
- `POST /api/stripe/webhook` unsigned request
- anonymous `GET /portal`
- anonymous `GET /data-entry`
- anonymous `GET /admin`
- anonymous `GET /admin/commerce`

Expected result:

- public/setup routes return safe `200` where expected
- callback and protected routes redirect safely
- checkout malformed and missing-slug POSTs do not return raw `500`
- unsigned webhook remains rejected
- protected content is not exposed to anonymous users

Record status codes and non-sensitive outcomes only.

## Remaining Live Acceptance Gates

Re-check availability only. Do not invent access.

Supabase:

- If safe remote SQL/check path exists, verify `0008_launch_membership_permission_seeds.sql` application and membership/permission levels.
- If not, update manual-intervention instructions.

Authenticated workflow/RLS:

- If safe sessions and assigned/unassigned horse fixtures exist, run the matrix from Sprint 012.
- If not, update manual-intervention instructions.

Stripe:

- If safe test-mode checkout/replay path exists, run checkout, signed replay, and duplicate replay.
- If not, update manual-intervention instructions.

## Documentation Updates

At close, Builder should update:

- `docs/DEPLOYMENT.md` with deployment result and provenance
- `docs/PRODUCTION_LAUNCH_READINESS.md` with Sprint 012A smoke and live acceptance status
- `docs/VALIDATION.md` with validation evidence
- `docs/ADMIN_COMMERCE_HARDENING.md` with checkout safety deployment verification
- `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, and `docs/PORTAL_DATA_ENTRY_WORKFLOW.md` if blocker status changed
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` if durable status changed
- `planning/STATE.md`, `planning/STATUS.json`, and `planning/ARCHITECT_BRIEFING.md` at sprint close
