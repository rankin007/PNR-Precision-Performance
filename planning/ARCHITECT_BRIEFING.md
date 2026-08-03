# Architect Briefing - Sprint 036 Rolled-Back Closeout

## Executive summary

**Business outcome:** Sprint 036 safely exercised the exact zero-source Production path but did not establish stable live trainer access. An unexpected Vercel alias post-state triggered the approved immediate all-five rollback before human Production authentication.

**Current focus:** Sprint 036 is closed `production-promotion-rolled-back-clean`. Decide deliberate non-promotion or create a corrective Sprint 036B Pack focused on authoritative alias-transition proof. Sprint 029N remains behind this gate.

**What is proven:** The exact remote-backed candidate was Ready and source-matched; retained pilot ownership remained exact; all five stable aliases now independently resolve to Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`; canonical public/health/sign-in and anonymous portal safety passed after rollback.

**What is not live:** Candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf` is not accepted on stable aliases. No Production OTP or human trainer journey was attempted. Stable live access, broad rollout, Sprint 029N and product-wide Done are not claimed.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Candidate / source validation | passed | Permanent canonical authority, accepted 035K ancestry, zero application/source diff, 101 counted assertions, focused auth suites, TypeScript, zero-warning lint and Production build |
| Final five-alias rollback routing | passed | Five/five aliases independently resolve to Ready `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`; final public/protected smoke passed |
| Alias-transition evidence | attention | Deployment alias metadata contradicted authoritative per-alias routing and cannot reconstruct the pre-rollback transition |
| Human Production acceptance | attention | Rollback occurred before any OTP request or sign-in; both required Production journeys remain unmet |

## Where things stand

Production is on the exact compatible rollback, not the Sprint 036 candidate. `/`, `/sign-in` and `/api/health` return 200; anonymous `/portal` returns 307 to the truthful sign-in boundary. Provider/Auth/template/DNS/data state was not mutated. The retained governed trainer pilot remains available for a later separately authorized acceptance attempt.

## Current status

Sprint 036 is sprint-closed with outcome `production-promotion-rolled-back-clean`. The rollback and closeout are complete, but the live trainer-access business outcome is incomplete. No Sprint 036B Pack or external action is authorized by this status.

## Since last sprint

Builder applied the four-file Sprint 036 Pack, reconciled exact source/provider/pilot baselines, ran the unchanged candidate validation, committed and pushed planning-only checkpoint `38ab1acc2776124ba8b54fd33eb346bf7f28f99a`, and deployed it with `--prod --skip-domain`. Candidate inspection reported an unexpected stable alias. Builder stopped before intentional alias promotion or authentication, restored all five aliases to rollback, and independently re-proved route safety.

## Architecture / file map

- `planning/sprints/036-production-trainer-access-stabilisation-and-live-acceptance/` - strict applied authority.
- `planning/reviews/036-production-trainer-access-stabilisation-and-live-acceptance.md` - exact execution, failure diagnosis, rollback and acceptance disposition.
- `docs/OPERATIONS_HANDOFF.md` - current rollback identity, five-alias procedure and Vercel alias-reporting caution.
- `planning/STATUS.json`, `planning/STATE.md`, roadmap, lifecycle, schedule and evidence index - consistent rolled-back closeout.

## Decisions

- Treat the unexpected alias report as a material post-state because the approved plan required automatic alias promotion to be disabled.
- Prefer immediate recovery over reconstructive Production experimentation; no blind redeployment occurred.
- Use independent per-alias resolution as routing authority because deployment-level alias inventory proved stale after rerouting.
- Keep all source/provider/data boundaries unchanged and retain the Sprint 035K pilot under its existing governance.

## Risks / watch-items

- The pre-rollback route of the project-level alias is not reconstructable from the stale deployment alias list.
- A future attempt that relies only on `--skip-domain` plus deployment inspection can repeat the same control ambiguity.
- The Ready Sprint 036 candidate is unaccepted and must not receive stable aliases by inference.
- Preview human acceptance remains valid historical evidence but is not Production acceptance.

## Open questions for the Architect

- Deliberately retain the rollback, or create corrective Sprint 036B under the suffix rule?
- Which Vercel read-only audit or per-alias transition evidence will authoritatively prove no automatic movement of all five aliases, including the project-level alias?
- Is a zero-source/no-provider-change promotion mechanism available, or would any change require a newly scoped exact plan?

## Evidence

- Candidate: `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf`, Ready/production, exact checkpoint metadata.
- Final routing: five/five named aliases resolve to `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, Ready.
- Final HTTP: `/` 200; `/sign-in` 200; `/api/health` 200; anonymous `/portal` 307 to sign-in.
- Protected pilot: private Verify exit 0 with no protected-value capture.
- Mutation boundary: Vercel candidate deployment plus five-alias rollback only; no source, Auth/provider, template, DNS, schema, permission, identity, fixture or data mutation.

## Plan corrections

The first private Verify launch failed closed because the retained wrapper correctly requires its original 035K branch. Builder committed/pushed the clean 036 checkpoint, briefly switched the canonical clone to the exact guarded branch for read-only Verify, then returned immediately to 036. No wrapper, source or data changed.

The canonical domain aggregate stopped at Sprint 031B because optional `playwright-core` was absent. Accepted unchanged-byte evidence from Sprint 035K, all other current domain components and fresh live route boundaries supplied the documented substitute proof; no dependency install or follow-up was created for that supporting limitation.

Vercel deployment inspection was not treated as authoritative after it continued to list an alias that independently resolved to rollback. The release remained rolled back because the pre-rollback routing transition could not be reconstructed safely.

## Validation / test status

**Tests:** 101 passing, 0 failing in the counted Sprint 035K and Sprint 032 suites. Additional focused 035D/035C/035F/035 auth, OTP, redirect, bootstrap, recovery, dashboard and permission tests passed. JSON, roles, Supabase-self, static, TypeScript, zero-warning lint and Production build passed. Domain components passed except the optional-dependency 031B runner; 031C passed directly and substitute proof is recorded. Pack dry-run, JSON parsing, diff/scope and secret/private-identity scans passed.

## Recommended next Architect action

**Do:** Choose deliberate non-promotion or issue a corrective Sprint 036B Pack that first proves authoritative five-alias transition behavior, then permits one fresh zero-source candidate, bounded five-alias promotion, public/protected smoke and the two private Production sign-ins.

**Owner:** Product owner and Architect for the promotion decision; release/platform owner for Vercel evidence; designated trainer tester for private mailbox participation only after a new exact run is authorized.

**Decision:** Sprint 036 is safely closed but the business outcome is not complete. No 036B implementation or Production action is authorized by this briefing.
