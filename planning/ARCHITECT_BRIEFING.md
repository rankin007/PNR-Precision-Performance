# Architect Briefing - Sprint 036G Closed Rolled Back

## Executive summary

**Business outcome:** Sprint 036G safely exercised the existing Ready candidate through an exact five-alias Production cutover, but live authentication did not establish a session; Builder restored every stable alias to the exact Ready rollback.

**Current focus:** Keep the rollback as deliberate live state and decide whether a genuinely distinct future authentication approach is justified. Do not repeat the consumed retry.

**What is proven:** Exact two-file verifier activation; 99 passing assertions; unchanged protected core and Product; pre-cutover retained-pilot `8/1/0/0`; exact candidate/rollback readiness; five/five candidate routing with full rereads; canonical candidate safety; fixed all-five rollback; final five/five Ready rollback; final canonical safety; and zero unauthorized provider, Product or data mutation.

**What is not live:** No accepted Production trainer session, dashboard, workspace/action, denial or sign-out journey was completed. The candidate is unaccepted, stable Production trainer access is unproven, and Sprint 029N remains gated.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Verifier and unchanged Product | passed | 99 assertions, seven-check core self-test, exact core hash, focused suites, TypeScript, zero-warning lint and 29-page Production build passed |
| Candidate transaction and rollback | passed | Five candidate assignments reached five/five candidate; five rollback assignments restored five/five exact Ready rollback with complete per-step rereads |
| Final Production safety | passed | Public, protected, API, disabled-commerce and disabled-webhook checks passed on final rollback |
| Live trainer authentication | attention | First attempt used incorrect private input; the only fresh retry returned generic `retry-later` before code request or session |

## Where things stand

The existing candidate passed every pre-authentication boundary and briefly held all five accepted aliases. Human authentication did not reach a code request or session on the one permitted fresh retry. Builder therefore consumed no further attempt and completed the Pack-defined all-five rollback.

Production is now stable on the same exact Ready rollback that governed the baseline. This is a safe recovery result, not candidate acceptance or live trainer-access proof.

## Current status

Sprint 036G is closed `production-trainer-authentication-failed-rollback-clean`. All five stable aliases independently resolve to Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`. Candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf` remains unaccepted. No further retry or Sprint 029N work is authorized.

## Since last sprint

Builder applied the strict four-file 036G Pack from closed 036F SHA `b88d68d98fe374df7f32f3be4d0f0a73dd02c5e7` and changed only the approved wrapper and deterministic test. The wrapper now permits exactly historical 035K and current 036G while preserving all protected-input, exact-project, exact-ID, no-enumeration, ledger and cleanup controls.

The scoped checkpoint `a66b2e4c17aa10509e9bf3f790b582ccf8305967` was pushed only to the 036G branch before Production mutation. Preflight and candidate route safety passed; the fixed candidate transaction completed; the private journey failed at authentication; and the fixed rollback plus final safety completed without any new deployment or provider/data change.

## Architecture / file map

- `scripts/Invoke-LiveTrainerAccess035K.ps1` - exact 035K/036G branch-allowlisted protected wrapper.
- `scripts/live-trainer-access-035K-core.mjs` - unchanged protected exact-ID verifier at SHA-256 `603FF16B9F6EB30D2B5E26A39218E8307731D66008D4D384FB9696095CD3AB5A`.
- `scripts/test-live-trainer-access-035K.mjs` - 99-assertion deterministic verifier suite.
- `planning/sprints/036G-immediate-trainer-access-recovery-and-minimal-production-cutover/` - applied scope, transaction, private-journey and rollback authority.
- `planning/reviews/036G-immediate-trainer-access-recovery-and-minimal-production-cutover.md` - detailed validation, routing snapshots, sanitized journey, rollback and external-action ledger.
- `docs/OPERATIONS_HANDOFF.md` - current no-retry and five/five rollback operating boundary.

## Decisions

- Close at `production-trainer-authentication-failed-rollback-clean`; do not reinterpret pre-authentication candidate safety as live access.
- Treat the Pack's single fresh retry as consumed. Do not request another code or investigate provider configuration under 036G.
- Preserve exact Ready rollback as the live routing authority and candidate as unaccepted.
- Require separate Architect authority for any genuinely distinct future diagnosis, cutover or authentication acceptance approach.

## Risks / watch-items

- Generic `retry-later` does not distinguish cooldown, delivery, transport or provider compatibility; the root cause is intentionally unresolved because protected mailbox/provider inspection and provider mutation were out of scope.
- Moving even one alias back to candidate would breach the completed rollback boundary.
- The retained pilot verified before cutover, but no accepted Production session followed; these proofs must not be conflated.
- Live trainer access, Sprint 029N and product-wide Done remain gated.

## Open questions for the Architect

- Should Production remain deliberately on the compatible rollback with no new authentication attempt?
- If future work is warranted, what distinct privacy-safe evidence and mechanism can diagnose the authentication boundary without repeating the retry or exposing mailbox/provider data?
- Should Sprint 029N remain behind live trainer acceptance, or should the owner make a separate explicit roadmap decision?

## Evidence

- Canonical root/Git top-level and single-worktree guard passed; branch is `codex/036G-immediate-trainer-access-recovery-and-minimal-production-cutover`; starting SHA is `b88d68d98fe374df7f32f3be4d0f0a73dd02c5e7`.
- Final tooling hashes: wrapper `8C2EAB11471D65CCBD3858ED92E83BFE79887E4519A107FF908E74AFE48667DE`; test `C94F899867F78F87DD68C72E6C8E398610E4970657183303D1676C6DB91AB49E`; core unchanged `603FF16B9F6EB30D2B5E26A39218E8307731D66008D4D384FB9696095CD3AB5A`.
- Focused proof passed 89 inherited plus 10 new assertions = 99. Direct core self-test passed seven checks. PowerShell parsing, guard/hash checks and live wrapper Verify passed.
- Dashboard, OTP, passwordless redirect, bootstrap concurrency, recovery, public controls, static, JSON, roles, Supabase-self, TypeScript, zero-warning lint and the 29-page Production build passed.
- Product bytes have zero difference from candidate source `38ab1acc2776124ba8b54fd33eb346bf7f28f99a`; accepted correction `76f66f5f9803e5d1f85a6dd3f71adf302b8a1810` remains in ancestry.
- Pre-cutover exact-ID Verify passed application/Auth/Storage/wrong-horse `8/1/0/0`. Management credential/API counts are `0/0`.
- Existing candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf` and rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` were exact Ready Production targets for project `prj_6To7czLpCEGL6fInkQwE4egePPpq`.
- Cutover snapshots proved candidate/rollback `1/4`, `2/3`, `3/2`, `4/1`, `5/0`; separate `candidate-live` was five/five candidate. Exactly five candidate assignments occurred.
- The tester's fixed retry report was code requested `no`, code entered `no`, session `no`, dashboard `no`, workspace/action `no`, denial `no`, sign-out `no`; no protected value was recorded.
- Rollback snapshots proved rollback/candidate `1/4`, `2/3`, `3/2`, `4/1`, `5/0`; separate `final-rollback` was five/five Ready rollback. Exactly five rollback assignments occurred.
- Final canonical responses were 200 for public/sign-in/health, 307 for anonymous protected routes, 405 for unsafe health POST, 303 for disabled checkout and 503 for disabled webhook. No third deployment or partial mapping remained.

## Plan corrections

The first private journey used incorrect input, so it was not accepted. The one Pack-permitted fresh retry then returned generic `retry-later` before a code request or session; the retry ceiling was exhausted and the plan entered its fixed all-five rollback path.

Direct anonymous immutable-deployment requests met Vercel SSO, so authenticated read-only `vercel curl` supplied equivalent candidate smoke without changing protection or settings. Redirected agent-terminal constraints prevented wrapper SelfTest; the accepted stronger substitute combined direct seven-check core self-test, 99 executable assertions, PowerShell parsing, exact guard/hash checks and successful live wrapper Verify. Two deterministic PowerShell harness parse typos were corrected before any request and did not affect Product or external state.

## Validation / test status

**Tests:** 99 passing, 0 failing.

The exact focused target passed 89 inherited plus 10 Sprint 036G assertions. Direct core self-test, PowerShell parsing, focused authentication/dashboard/OTP/redirect/bootstrap/recovery/public suites, static, JSON, roles, Supabase-self, TypeScript, zero-warning lint, 29-page Production build, Product equality, secret/private-data, scope, encoding, whitespace and residue checks passed. Final rollback route safety passed. The wrapper SelfTest and immutable SSO limitations were covered by the documented equivalent-or-stronger proofs above.

## Recommended next Architect action

**Do:** Record deliberate rollback as the immediate direction. If further work is justified, define a genuinely distinct privacy-safe authentication diagnosis/acceptance approach; do not issue a Pack that merely repeats the consumed retry.

**Owner:** Architect and product owner for roadmap/acceptance direction; authorized platform operator only under a future separate live-action Pack.

**Decision:** Sprint 036G is safely closed with all five aliases on exact Ready rollback, the candidate unaccepted, live Production trainer access unproven and Sprint 029N gated.
