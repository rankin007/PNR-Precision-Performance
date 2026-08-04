# Sprint 036G Review

## Current checkpoint

Status: pre-cutover checkpoint green; Production alias mutation has not started.

Recorded 2026-08-04 AEST from the permanent canonical repository on branch `codex/036G-immediate-trainer-access-recovery-and-minimal-production-cutover`, starting at closed Sprint 036F SHA `b88d68d98fe374df7f32f3be4d0f0a73dd02c5e7`.

## Authority and scope

- Current directory and normalized Git top-level both equal the permanent canonical path.
- Exactly one canonical worktree is registered.
- The Sprint 036G Pack applied as exactly four generated sprint files after its four-create dry run.
- The approved code change is exactly `scripts/Invoke-LiveTrainerAccess035K.ps1` and `scripts/test-live-trainer-access-035K.mjs`.
- The wrapper allowlist contains exactly the historical 035K branch and current 036G branch and refuses every other branch.
- Protected core `scripts/live-trainer-access-035K-core.mjs` remains byte-identical at SHA-256 `603FF16B9F6EB30D2B5E26A39218E8307731D66008D4D384FB9696095CD3AB5A`.
- No Product, package, runtime configuration, migration, schema, RLS, role, permission, identity, fixture, data, Storage, DNS, provider setting or Vercel project setting changed.

## Deterministic and local validation

- Focused protected test passed the exact target: 99 assertions = 89 inherited + 10 Sprint 036G assertions.
- Direct core self-test passed all seven protected-contract checks.
- The wrapper SelfTest could not be executed through the redirected agent terminal. Two private-console launch attempts failed before helper execution, with no protected input, remote action or mutation. The accepted stronger substitute combines the direct core self-test, 99 executable wrapper/source assertions, PowerShell parser success, exact guard/hash checks and the successful live wrapper Verify below. No blind third SelfTest attempt occurred.
- PowerShell parser and `git diff --check` passed.
- Dashboard, OTP, passwordless redirect, bootstrap concurrency, OTP recovery, protected synthetic recovery, public relaunch, static, JSON, role, Supabase-self and Sprint 031C control tests passed.
- TypeScript passed; ESLint passed with zero warnings; the Production build passed and generated 29 routes/pages.
- Current approved Product paths have zero difference from immutable candidate source `38ab1acc2776124ba8b54fd33eb346bf7f28f99a` and accepted 035K behavior `76f66f5f9803e5d1f85a6dd3f71adf302b8a1810`; the accepted correction remains in ancestry.
- No Product/runtime path imports or references the protected verifier.

## Protected retained-pilot proof

- The retained ownership ledger was present before Verify.
- `Invoke-LiveTrainerAccess035K.ps1 -Operation Verify` ran once in a visible private, non-transcribed ConsoleHost with protected values entered only at hidden prompts.
- Wrapper exit code 0 proves the fixed core contract: `state=verified`, application 8, Auth 1, Storage 0 and wrong-horse rows 0.
- Protected values and raw output were not captured. Process environment residue was zero after execution.
- The operation used exact-ID reads only and made no enumeration or mutation.

## Existing deployment and routing proof

- Installed Vercel CLI is 50.42.0; installed help and current official documentation confirm independent `inspect`, `curl` protection bypass and explicit `alias set <deployment> <alias>` mechanisms.
- Linked project is exactly `prj_6To7czLpCEGL6fInkQwE4egePPpq`, `rankin007s-projects/pnr-precision-performance`.
- Existing candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf` at `pnr-precision-performance-k4rhrxq9d-rankin007s-projects.vercel.app` is target `production`, state `READY` and project-name exact.
- Exact rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` at `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app` is target `production`, state `READY` and project-name exact.
- Product equality and remote source authority preserve recorded candidate source `38ab1acc2776124ba8b54fd33eb346bf7f28f99a`; no new deployment was created.
- Independent `baseline-five-rollback` resolution proved all five accepted aliases route to the exact Ready rollback. Deployment alias inventory was treated only as corroborating metadata.
- Direct anonymous requests to the immutable candidate stopped at Vercel deployment SSO. Current installed `vercel curl` help explicitly provides automatic protection bypass, so authenticated read-only route proof was used without changing protection or project settings.
- Cache-busted immutable candidate smoke passed: `/`, `/sign-in` and `/api/health` returned 200; anonymous `/portal`, nonexistent synthetic horse route and `/admin` returned 307 to identity-free sign-in destinations; unsafe `POST /api/health` returned 405.

## External action ledger

- Supabase Management tokens created/used/revoked: 0.
- Supabase Management API requests: 0.
- Retained-pilot Verify operations: 1 read-only pre-cutover operation.
- Fresh deployments, promotes or platform rollbacks: 0.
- Candidate alias assignments: 0 of exactly 5 authorized success-path writes.
- Rollback alias assignments: 0.
- DNS, environment, provider, project-setting, Product, identity, fixture and data mutations: 0.
- Private OTP requests/sign-ins: 0; human Production acceptance remains gated on `candidate-live` safety.

## Next exact gate

Commit and push the scoped pre-cutover checkpoint, prove direct-remote equality, reread candidate/rollback/all-five routing, then perform the fixed five alias assignments in legacy-team, team-project, project, `www`, apex order. After every assignment, independently reread all five aliases. Any mismatch enters the fixed all-five rollback before human authentication.
