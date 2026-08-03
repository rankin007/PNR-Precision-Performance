# Architect Briefing - Sprint 036B Preflight Blocked Clean

## Executive summary

**Business outcome:** Sprint 036B proved the unchanged application and exact five-alias rollback baseline but stopped safely before release because signed-in provider preflight emitted protected identity fields.

**Current focus:** Decide deliberate non-promotion or plan a corrective Sprint 036C with a provider/pilot readback mechanism that cannot enumerate or render protected identities.

**What is proven:** Canonical/remote authority, zero application-source difference, 101 counted assertions plus focused regressions, canonical validation, TypeScript, zero-warning lint, Production build, exact Vercel project/affected set and five/five Ready rollback.

**What is not live:** No fresh candidate was staged, no alias moved, provider compatibility and retained-pilot readback did not complete, and neither private Production trainer journey began.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Unchanged application candidate | passed | Accepted 035K ancestry; zero application/source diff against 035K and Sprint 036; 101 counted assertions plus focused and canonical gates |
| Five-alias rollback authority | passed | Exactly five accepted aliases and exactly five rollback aliases; five independent timestamped rows resolve to Ready `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` |
| Provider and retained-pilot preflight | attention | Exact Supabase project was healthy, but protected identity fields appeared before configuration and pilot checks completed |
| Human Production acceptance | attention | No OTP request, session, dashboard journey, sign-out or second fresh sign-in occurred |

## Where things stand

Production never moved. All five public aliases remain on the known-safe Ready rollback, and the application itself passed the complete unchanged-source validation set. The release stopped during provider preflight, before any candidate, alias, account, fixture, data or authentication action.

## Current status

Sprint 036B is closed `production-alias-transition-preflight-blocked-clean`. The repository and Production state are clean, but stable live trainer access remains incomplete. Sprint 029N remains gated.

## Since last sprint

Builder applied the four-file 036B Pack, created the scoped branch, proved direct remote starting authority, validated unchanged application behavior, reconciled current Vercel CLI/docs/project/domain/alias state and produced the first authoritative five-row rollback snapshot. Supabase project health passed, then the signed-in Authentication surface rendered protected identity fields. Builder stopped and finalized the browser before configuration, pilot, staging or human acceptance.

## Architecture / file map

- `planning/sprints/036B-authoritative-production-alias-transition-and-live-trainer-acceptance/` - strict applied authority and acceptance disposition.
- `planning/reviews/036B-authoritative-production-alias-transition-and-live-trainer-acceptance.md` - exact validation, Vercel affected-set, baseline ledger, protected-output stop and mutation record.
- `docs/OPERATIONS_HANDOFF.md` - retained rollback plus future protected provider-readback boundary.
- `planning/STATUS.json`, state, roadmap, lifecycle, schedule and evidence index - consistent blocked-clean closeout.

## Decisions

- Keep independent per-alias inspection as routing authority.
- Keep explicit one-alias assignment as the bounded future mutation mechanism.
- Treat protected identity rendering as a material preflight stop; do not navigate through Auth user-list surfaces for configuration proof.
- Retain Production five/five on rollback and do not stage from incomplete provider/pilot evidence.

## Risks / watch-items

- Fresh callback, SMTP, template, OTP expiry/cooldown and retained-pilot evidence remains incomplete.
- Historical provider/pilot proof cannot substitute for execution-time evidence in a later release.
- A future provider readback must be output-allowlisted and identity-blind before any candidate staging.
- Sprint 029N and product-wide Done remain gated.

## Open questions for the Architect

- Retain deliberate non-promotion, or create corrective Sprint 036C?
- What protected configuration/pilot readback can prove the required booleans and counts without opening or enumerating an Authentication user surface?

## Evidence

- Canonical root and Git top-level exact; one worktree; start `6edc4dab04248c36ca57f9722849fcf16b7acb2f`.
- Pack dry-run/application/post-dry-run: exactly four 036B sprint files.
- Application diff against accepted 035K and validated Sprint 036 paths: empty.
- Tests: 89 Sprint 035K plus 12 Sprint 032 = 101 counted passing; dashboard/OTP/redirect/bootstrap/recovery suites passed.
- JSON, roles, Supabase-self, static, TypeScript, zero-warning lint and 29-page Production build passed.
- Vercel CLI `50.42.0`; project `prj_6To7czLpCEGL6fInkQwE4egePPpq`; accepted-alias count 5; rollback-alias count 5; independent baseline 5/5 Ready rollback.
- Supabase project `uvskssaecdhxcgytkasc`: `ACTIVE_HEALTHY`, `ap-southeast-1`.
- Mutation boundary: ignored local Vercel link plus repository planning/closeout only; zero candidate, alias, provider, Auth, identity, fixture, data, Storage, OTP or session mutation.

## Plan corrections

The Vercel CLI update worker could not write its cache log/lock under the sandbox, but installed help and authenticated commands completed. This was recorded as a supporting limitation.

The aggregate domain runner again stopped at optional local `playwright-core` resolution for Sprint 031B. Unchanged source bytes, accepted 035K evidence, all preceding current domain components and direct 031C proof supplied the approved substitute evidence.

The planned signed-in provider readback was not output-safe because the Authentication landing surface rendered identity rows. That is a material privacy correction for any future Sprint 036C design.

## Validation / test status

**Tests:** 101 passing, 0 failing in the counted Sprint 035K and Sprint 032 suites. Additional dashboard, OTP, redirect, bootstrap, recovery, JSON, roles, Supabase-self, static, TypeScript, zero-warning lint and Production build gates passed. The optional 031B dependency limitation used the recorded equivalent proof; direct 031C passed.

## Recommended next Architect action

**Do:** Choose deliberate non-promotion or issue a corrective Sprint 036C Pack whose first gate is an allowlisted identity-blind provider/pilot readback, followed by fresh five-alias/Vercel evidence before any staging.

**Owner:** Product owner and Architect for the promotion decision; platform/application-auth owner for the protected provider mechanism; designated tester only after a later candidate is five/five live and route-safe.

**Decision:** Sprint 036B is safely closed but the live trainer-access business outcome remains incomplete. Do not begin Sprint 029N.
