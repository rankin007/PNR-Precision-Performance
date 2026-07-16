# Sprint 012A - Fix, Deploy, And Verify Acceptance

## Required Acceptance Criteria

- Architect Pack 012A is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012A.
- Builder records current branch/revision and dirty worktree status without reverting unrelated changes.
- Builder verifies that the Sprint 012 checkout malformed-body guard is present locally.
- Builder verifies there are no unexpected app/source changes included in deployment, or stops for user confirmation.
- Local validation is attempted and results are recorded.
- Existing Vercel project is confirmed as `pnr-precision-performance`.
- Production deployment is completed only if stop conditions are clear.
- Deployment id/URL/status/aliases/source state are recorded.
- Production malformed checkout POST smoke returns safe redirect or non-sensitive failure, not raw `500`.
- Production missing-slug checkout smoke remains safe.
- Production unsigned webhook remains rejected.
- Anonymous protected routes do not expose protected content.
- Supabase/authenticated/Stripe gates are verified if safe access exists, or re-blocked with manual-intervention instructions.
- No secret values or fragments are printed or stored.
- No destructive production mutation or live financial action is performed.
- Sprint-close planning docs are updated.
- `planning/ARCHITECT_BRIEFING.md` is refreshed for the next Architect session.

## Deployment Acceptance Matrix

| Case | Expected result |
|---|---|
| Vercel project | `pnr-precision-performance` confirmed before deploy |
| Production domain | `https://precisionperformance.com.au` remains launch domain |
| Source state | Sprint 012 checkout fix present; no unexpected app/source changes |
| Validation | Lint, TypeScript, and known-good build pass or only restricted-sandbox failure is documented |
| Deployment | Production deployment succeeds and is inspected as Ready |
| Aliases | Launch aliases remain attached |
| Rollback notes | Existing rollback path remains documented |

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
| `POST /api/checkout` malformed/no-content-type body | Safe redirect or non-sensitive failure, not raw `500` |
| `POST /api/stripe/webhook` unsigned request | Rejected |
| Anonymous protected routes | Redirected; protected content not exposed |

## Live Acceptance Gate Matrix

| Gate | Expected result |
|---|---|
| Supabase remote migration/checks | Completed safely, or blocked with manual-intervention instructions |
| Authenticated workflow/RLS smoke | Completed with safe sessions/fixtures, or blocked with manual-intervention instructions |
| Stripe test checkout/webhook replay | Completed in test mode, or blocked with manual-intervention instructions |

## Required Validation

- `git status --short`
- branch and short revision identity
- app/source diff summary
- inspect `.vercel/project.json` and `vercel.json`
- name-only `.env*` presence inspection, no values
- safe tool/path availability check for Supabase, Stripe, Vercel, and curl
- checkout malformed-body local smoke or direct route test where feasible
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- if sandboxed build fails for known sandbox reasons, rerun the bounded build outside the restricted sandbox and record both outcomes
- post-validation process check for `node`, `npm`, and `npx`
- production public/safety smoke checks listed above

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action
