# Architect Briefing - Sprint 036C Access Unavailable Clean

## Executive summary

**Business outcome:** Sprint 036C delivered the approved identity-blind protected-preflight tooling and stopped cleanly before release because no existing authorized Supabase Management API credential was available.

**Current focus:** Retain deliberate non-promotion unless a later separately approved sprint starts with an existing approved Management API access path.

**What is proven:** Exact three-file non-runtime scope, fixed one-GET Auth-config target, hidden child-only credential handling, 135 deterministic assertions, four wrapper checks, unchanged Sprint 035K helper, 101 inherited counted assertions, focused validation, TypeScript, zero-warning lint and a 29-page Production build.

**What is not live:** No provider request or projection, retained-pilot Verify, Vercel baseline, fresh candidate, alias transition, OTP request or human Production acceptance occurred.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Identity-blind preflight tooling | passed | Fixed approved GET only; no user-list/enumeration path; 135 assertions and four wrapper checks passed |
| Unchanged application behavior | passed | Existing 035K core hash exact; 89 Sprint 035K plus 12 Sprint 032 assertions and retained validation/build gates passed |
| Fresh protected provider/pilot proof | attention | No existing authorized Management credential was available; no request or pilot Verify ran |
| Production live trainer acceptance | attention | No deployment, alias mutation, OTP, session or human journey began |

## Where things stand

The repository now contains a deterministic, identity-blind provider preflight that can safely project only the required Auth configuration facts. It was not used live because the required existing Management API access path was unavailable and credential creation/rotation was outside scope. Product, provider and Production state did not change.

## Current status

Sprint 036C is closed `production-protected-preflight-access-unavailable-clean`. The implementation is complete within scope, but the live trainer-access business outcome is incomplete. Sprint 029N remains gated.

## Since last sprint

Builder applied the four-file 036C Pack, created the scoped branch and implemented only the three approved operations files. Deterministic safety and unchanged-application validation passed. The protected console exited without receiving a credential, so Builder took the defined stop before provider, pilot, Vercel or Production actions.

## Architecture / file map

- `scripts/protected-production-preflight-036C-core.mjs` - fixed Management API GET, in-memory truth evaluation and allowlisted sanitized reporting.
- `scripts/Invoke-ProtectedProductionPreflight036C.ps1` - branch/root-bound private operator entry with separate protected child environments.
- `scripts/test-protected-production-preflight-036C.mjs` - deterministic projection, drift, transport, schema and protected-canary coverage.
- `planning/sprints/036C-protected-production-preflight-and-live-trainer-acceptance/` - applied strict execution authority and acceptance disposition.
- `planning/reviews/036C-protected-production-preflight-and-live-trainer-acceptance.md` - exact implementation, validation, protected stop and zero-mutation record.

## Decisions

- Close the sprint at the exact access-unavailable state rather than create or rotate a Supabase token.
- Preserve the identity-blind three-file tooling for later use only under separate approved authority.
- Do not stage a candidate or move aliases without fresh provider and retained-pilot proof.
- Keep Sprint 029N gated because live trainer access was not accepted.

## Risks / watch-items

- Provider callback, SMTP, sender, template and OTP facts remain unproven at current execution time.
- Retained-pilot state was not freshly verified.
- A Supabase project anon/service-role key is not a Management API credential and must not be substituted.
- Historical five-alias rollback proof remains historical; any later release requires a fresh baseline.

## Open questions for the Architect

- Retain deliberate non-promotion, or later authorize another bounded attempt only after an existing approved Management API access path is available?
- If the live-access gate is later completed or explicitly bypassed by a separate owner decision, what exact authority governs Sprint 029N?

## Evidence

- Canonical root and Git top-level exact; one worktree; starting SHA `c7d2a298218d6dc36871732054886145c449f7db`.
- Pack dry-run/application/post-dry-run: exactly four Sprint 036C files.
- New deterministic suite: 135 assertions passed; wrapper self-test: four checks passed.
- Existing Sprint 035K core SHA-256: `603FF16B9F6EB30D2B5E26A39218E8307731D66008D4D384FB9696095CD3AB5A`.
- Tests: 89 Sprint 035K plus 12 Sprint 032 = 101 inherited counted passing; focused dashboard/OTP/redirect/bootstrap/recovery suites passed.
- JSON, roles, Supabase-self, static, TypeScript, zero-warning lint and 29-page Production build passed.
- Application/runtime diffs against accepted authority were empty; no runtime import of the new tooling exists.
- Protected result: no existing Management credential; private console exited; zero provider request and zero protected output.
- Mutation result: repository-only scoped changes; zero candidate, alias, provider, Auth, identity, fixture, data, Storage, DNS, OTP or session mutation.

## Plan corrections

The first deterministic run exposed that the exact endpoint literal was composed from two constants while the test required one auditable literal. The core was narrowed to the exact full endpoint and all 135 assertions then passed.

The aggregate domain runner reached the accepted optional Sprint 031B `playwright-core` availability boundary. Unchanged application bytes plus direct Sprint 031C proof supplied the Pack-approved equivalent evidence without dependency or product change.

## Validation / test status

**Tests:** 236 passing, 0 failing in the counted Sprint 036C, Sprint 035K and Sprint 032 suites. The wrapper added four passing self-test checks. Additional focused auth, recovery, JSON, domain substitute, roles, Supabase-self, static, TypeScript, zero-warning lint and Production build gates passed.

## Recommended next Architect action

**Do:** Preserve deliberate non-promotion. Consider another bounded live-access attempt only if an existing approved Supabase Management API access path is supplied under separate sprint authority.

**Owner:** Product owner and Architect for any future attempt; authorized Supabase account operator for access availability; designated tester only after later provider/pilot/Vercel gates pass.

**Decision:** Sprint 036C is safely closed without external mutation, but live trainer access remains incomplete. Do not begin Sprint 029N.
