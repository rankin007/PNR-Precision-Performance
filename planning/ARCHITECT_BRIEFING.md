# Architect Briefing - Sprint 036J Rolled Back Clean

## Executive summary

**Business outcome:** Sprint 036J proved the binding, identity, membership graph and positive trainer journey can run autonomously without mailbox codes, but it did not accept the complete live negative-path journey.

**Current focus:** Define one consolidated correction for the live wrong-horse denial proof without reopening solved binding, identity or manual-code work.

**What is proven:** Process-only approved bindings; exactly one authoritative retained identity out of three; two excluded identities unchanged; exact `8/1/0/0` graph; active trainer membership and write permission; one exact-source Ready candidate; five-alias cutover; real SSR session; retained dashboard, exact horse and permitted workflow; complete alias/binding rollback and final safety.

**What is not live:** Wrong-horse denial, sign-out and anonymous post-session denial are not accepted; the candidate is alias-free; Production bindings are restored to the original old-project set; stable Production trainer access and Sprint 029N eligibility remain unproven.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Binding, identity and membership graph foundation | passed | Approved three-binding projection; one ID-plus-hash identity; two excluded unchanged; exact `8/1/0/0`; zero repairs |
| Positive authenticated trainer journey | passed | Real generated-link SSR session rendered portal, exact horse and permitted workflow without email/OTP handling |
| Complete live session acceptance | attention | Sanitized wrong-horse gate failed; sign-out/anonymous steps were not reached |
| Production containment | passed | Five/five exact Ready rollback, original three bindings restored, candidate alias-free, final route safety passed |

## Where things stand

The technical recovery moved materially forward: the legitimate retained trainer and exact membership graph are now known and executable, and secret handling is automated through process-only environment injection. The one candidate was safely tested and fully rolled back after the unresolved negative-path boundary. Production remains on the known-safe release with no partial alias or binding state.

## Current status

Sprint 036J is complete as `autonomous-trainer-access-rolled-back-clean`. Target live acceptance was not reached, and no redeployment, recutover or binding repair remains authorized by this sprint.

## Since last sprint

Sprint 036I stopped before a candidate because its protected retained-pilot verifier did not establish accepted graph evidence. Sprint 036J replaced that manual/protected path with an autonomous harness, proved the exact graph and real positive Production session, exercised one governed candidate and then completed automatic five-alias plus three-binding rollback when the wrong-horse boundary remained unresolved.

## Architecture / file map

- `middleware.ts` - root request-time Supabase session refresh entrypoint.
- `lib/supabase/middleware.ts` - cookie propagation, safe fallback and private/no-store protected responses.
- `scripts/autonomous-trainer-access-036J.mjs` - redacted binding transaction, exact identity/graph reconciliation and in-memory session journey.
- `scripts/test-autonomous-trainer-access-036J.mjs` - 131-assertion deterministic contract including binding compensation and negative-path red controls.
- `planning/sprints/036J-autonomous-trainer-access-recovery-and-membership-acceptance/acceptance.md` - exact execution, rollback and inspection ledger.
- `docs/OPERATIONS_HANDOFF.md` and `docs/AUTH_RLS_PORTAL_ACCESS.md` - durable live-state and no-retry boundaries.

## Decisions

- Treat exact retained Auth ID plus retained email hash as the only authoritative identity rule; preserve both other Auth identities unchanged.
- Keep secrets, token hash and cookies in process memory only; do not send email or request a human code.
- Treat independent per-alias resolution as routing authority.
- Retain corrected Production bindings only on full target success; restore the original complete set on every non-target outcome.
- Close on the governed rollback after the unresolved live wrong-horse gate; do not reinterpret the local `INSPECT-001` correction as live acceptance.

## Risks / watch-items

- Production again uses the original old-project Supabase binding set; the known-safe rollback was built against that historical configuration, but new Product work must not assume the approved project is currently bound.
- Two non-authoritative Auth identities remain intentionally unresolved and unchanged.
- The local harness now distinguishes caller-supplied route metadata from protected identity/state/count leakage, but that corrected proof has not run against a live candidate.
- The 036J candidate is Ready and alias-free; accidental promotion is prohibited.

## Open questions for the Architect

- What exact rendered response contract should establish wrong-horse denial without treating a caller-supplied URL parameter as protected identity leakage?
- Can the next corrective Pack reuse the proven binding, identity, graph and session machinery and limit Product change to the smallest negative-path contract necessary?
- Sprint 029N remains gated; no separate owner decision has released it.

## Evidence

- Canonical current directory and Git top-level matched; inherited method/template changes remained excluded.
- Final focused and retained arithmetic is 131 + 101 + 70 = 302 passing, 0 failing.
- Initial Production binding projection was complete/prohibited; one captured exact-project key read and one three-write transaction produced a complete approved projection; final three-write restoration produced a complete prohibited projection.
- Live classify/reconcile reported three identities, one authoritative, two excluded unchanged, exact `8/1/0/0`, active membership/write permission and zero repairs.
- Checkpoint `cf7c134d3a5d26015be93b17f78dafccd8a1e6eb` was exact on the authorized direct remote.
- Candidate `dpl_HQmutgVoA1rdXDWSgQ5qGwW7YeBY` was exact-project, exact checkpoint source, Production-targeted, Ready and alias-free before cutover.
- Cutover rereads proved `1/4`, `2/3`, `3/2`, `4/1`, `5/0`; rollback rereads proved the same sequence back to exact rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`.
- Immutable, candidate-live and final rollback public/protected/API/disabled-commerce safety matrices passed.
- Secret scan counts for JWT-like values, assigned Supabase values, cookie material and raw token hashes were all zero.
- Fresh critical inspection found `INSPECT-001` on decision 1/3; the scoped correction passed 131/131 plus retained gates, and decision 2/3 returned PASS with no new findings.

## Plan corrections

- `J036-001`: the first Pack contradicted the needed three-binding authority; explicit user approval and Pack amendment resolved it before implementation.
- `J036-002`: Vercel accepted `--sensitive` variables but omitted them from `env run`; the user-authorized focused decision 4/4 corrected the transaction to ordinary encrypted stdin-only writes.
- `INSPECT-001`: the original wrong-horse assertion treated caller-controlled route metadata as protected leakage; the local harness/test correction resolved the false-negative design while preserving owned identity/state/count red controls.

## Validation / test status

**Tests:** 302 passing, 0 failing.

The counted total is 131 Sprint 036J assertions, 101 retained 035K assertions and 70 retained 036H assertions. Mapped auth, role, dashboard, public, static, JSON, Supabase-self and disabled-commerce checks also passed. Both 036J scripts pass syntax checks; TypeScript, zero-warning lint, the 29-page Production build, diff, scope, encoding and privacy checks pass.

## Recommended next Architect action

**Do:** Create one consolidated corrective Pack that starts from the proven 036J foundation, defines an unambiguous live wrong-horse denial sink, preserves automatic binding/alias compensation and completes the remaining wrong-horse, sign-out and anonymous journey without mailbox/code handling.

**Owner:** Architect with security/product review for the negative-path disclosure contract; Builder only after the Pack handoff.

**Decision:** Sprint 036J is closed rolled back clean. Sprint 029N stays gated, Sprint 036K remains later pre-launch rotation/ambiguous-identity/real-delivery work, and no 036J external retry is authorized.
