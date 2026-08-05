# Architect Briefing - Sprint 036I Closed At Protected Preflight

## Where things stand

The new diagnostic build was never deployed. Its local verifier activation and full application checks passed, but the required private retained-pilot verification did not produce an accepted result. The owner chose to close there, so Production stayed untouched on the known-safe rollback and no trainer sign-in was attempted.

## Executive summary

**Business outcome:** Sprint 036I proved the local release candidate remains unchanged and safely activatable for its governed verifier, but it did not prove the retained pilot or stable Production trainer access.

**Current focus:** Decide whether deliberate rollback should remain the long-term direction or whether a later Pack should define a genuinely new privacy-safe retained-pilot evidence channel before any deployment is reconsidered.

**What is proven:** Exact two-file verifier activation; 101 focused assertions; unchanged 70-assertion 036H diagnostic contract; retained auth/dashboard/public/static/JSON/role/Supabase controls; TypeScript; zero-warning lint; 29-page Production build; exact 036H Product hashes; byte-identical protected core; protected SelfTest exit 0; zero Product diff and zero protected residue.

**What is not live:** Exact-ID retained-pilot `8/1/0/0`, a 036I candidate deployment, five-alias cutover, OTP delivery, private trainer sessions, candidate acceptance and Sprint 029N eligibility are not proven.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Local verifier and diagnostic contract | passed | 101 verifier assertions plus 70 diagnostic assertions passed with exact branch order and unchanged Product/core hashes |
| Retained application validation | passed | Auth regressions, dashboard/public/static/JSON/roles/Supabase-self, TypeScript, zero-warning lint and 29-page build passed |
| Protected retained-pilot Verify | attention | SelfTest exited 0; exact-ID Verify exited 2 without accepted `8/1/0/0` or an agent-visible sanitized subcode |
| Live Production trainer access | attention | No candidate, alias, OTP, verification or session action occurred; five/five rollback remains the authoritative live state |

## Current status

Sprint 036I is closed `production-diagnostic-candidate-preflight-blocked-clean`. The user directed closure without the one remaining Pack-permitted Verify. No retry or downstream action is authorized.

## Since last sprint

Sprint 036H supplied a local five-category request diagnostic with no live authority. Sprint 036I added the exact branch-only verifier activation and attempted the mandatory protected retained-pilot gate. Because accepted pilot evidence was not established, the sprint stopped before checkpoint/deployment preflight and no live release transaction began.

## Architecture / file map

- `scripts/Invoke-LiveTrainerAccess035K.ps1` - exact three-branch allowlist: 035K, 036G and 036I.
- `scripts/test-live-trainer-access-035K.mjs` - exact 101-assertion verifier/ownership/source contract.
- `scripts/live-trainer-access-035K-core.mjs` - unchanged protected exact-ID core at approved SHA-256.
- `planning/reviews/036I-diagnostic-guided-production-trainer-acceptance.md` - complete local, protected-stop and zero-downstream-action ledger.
- `docs/OPERATIONS_HANDOFF.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md` and `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md` - durable no-retry and deliberate-rollback boundaries.

## Decisions

- Close at the exact Pack-permitted preflight outcome rather than use the remaining Verify.
- Do not infer the missing private-console subcode or reinterpret exit 2 as retained-pilot proof.
- Preserve the last authoritative five/five Ready rollback and the Sprint 029N gate.
- Require separate Architect authority for any future protected Verify, deployment, alias or OTP attempt.

## Risks / watch-items

- The private wrapper failure subcode is unknown in agent evidence; future planning must not guess which protected boundary refused the run.
- Repeating the same interaction without a new evidence contract would risk another non-actionable stop.
- Local diagnostic readiness still does not prove provider delivery, session establishment or stable Production access.
- The retained pilot ledger remains governed and uninspected; do not alter it outside exact future authority.

## Open questions for the Architect

- Should deliberate rollback remain the chosen direction?
- If a later attempt is proposed, how will its protected result channel preserve secrecy while returning a durable allowlisted success/failure classification?
- Should Sprint 029N remain behind live trainer acceptance, or should the owner make a separate explicit roadmap decision?

## Evidence

- Canonical current directory/Git top-level, exact starting SHA `6c0244439c7c938945831c909c1737c615ee8cfa`, exact 036I branch and one worktree passed.
- Pack dry run reported four creates; application created exactly four strict sprint files.
- All seven starting hashes matched.
- `node --experimental-strip-types scripts/test-live-trainer-access-035K.mjs` passed 101 assertions.
- `node --experimental-strip-types scripts/test-auth-request-diagnostics-036H.mjs` passed 70 assertions.
- Retained 035D, 035C and 035F scripts passed.
- Dashboard, public relaunch, static, JSON, roles and Supabase-self commands passed.
- `npm run typecheck`, `npm run lint -- --max-warnings=0` and `npm run build` passed; build generated 29 pages/routes.
- Product diff/import checks, exact implementation/core hashes, PowerShell parse, JSON, whitespace and protected-residue checks passed.
- Protected wrapper SelfTest exited 0; one exact-ID Verify exited 2 without accepted `8/1/0/0` evidence or protected output capture.
- Vercel/project/deployment/alias, OTP/verification, mailbox/browser-session, provider/configuration and Product/data mutation counts were all zero.

## Plan corrections

The Pack correctly required exact-ID Verify before release work, but the protected console intentionally did not expose its allowlisted failure subcode to agent output. That preserves privacy but leaves only exit code 2 as durable evidence. The safe conclusion is still deterministic: accepted `8/1/0/0` proof is absent, so deployment and authentication remain prohibited. Any future Pack should define a privacy-safe durable result channel before authorizing another attempt.

## Validation / test status

**Tests:** 171 passing, 0 failing.

The counted total is 101 Sprint 036I verifier assertions plus 70 retained Sprint 036H diagnostic assertions. The retained 035D, 035C and 035F scripts and dashboard/public/static/JSON/roles/Supabase-self controls also passed but are not added to the assertion arithmetic. TypeScript, zero-warning lint, the 29-page Production build and local integrity/privacy checks passed. Protected exact-ID Verify is an unmet operational gate, not a counted test failure.

## Recommended next Architect action

**Do:** Review whether to keep Production deliberately on rollback or design a genuinely new protected retained-pilot evidence contract before any future live attempt.

**Owner:** Architect and product owner for roadmap direction; security/platform owner for any future protected-result mechanism.

**Decision:** Sprint 036I is closed at protected preflight. No candidate exists, five/five rollback remains authoritative, no retry is authorized and Sprint 029N remains gated.
