# Architect Briefing — Sprint 035M Closeout

## Where things stand

Sprint 035M produced a validated, exact-source, Ready non-production trainer Preview candidate. Human acceptance could not safely begin because the governing Supabase callback policy accepts only the production callback, while this sprint explicitly prohibited provider mutation.

## Executive summary

**Business outcome:** The bounded trainer journey candidate is implemented and machine-validated.

**Current focus:** Resolve exact-Preview authentication authority before private trainer participation.

**What is proven:** 58 local executable/static checks, maintained regressions, canonical validation, production build, candidate/remote equality, Ready Preview identity, and exact callback-origin construction.

**What is not live:** No production change occurred. No fixture or human acceptance attempt occurred. Fourteen authenticated rendered checks and the eight-step trainer journey remain incomplete.

## Readiness signals

| Signal | Status | Meaning |
|---|---|---|
| Candidate implementation | passed | Approved files and fail-closed boundaries validated |
| Exact-source Preview | passed | `dpl_6NBk2VKPZZUS4QqdstqDHtGk8EVV` is Ready and non-production |
| Callback construction | passed | Exact HTTPS Preview origin is derived only from deployment-provided Vercel state |
| Callback acceptance | attention | Existing Supabase policy is production-only |
| Human trainer journey | attention | Not started; no protected values handled |

## Current status

Closed `trainer-access-validation-blocked-clean`. Candidate SHA: `b1bf770dc6ab3839cfc24c53563f6ed6310e08ba`. Core Product Done: false.

## Validation

**Tests:** 58 passing, 0 failing. Fourteen rendered authenticated Preview checks and the separate human acceptance journey were not completed because authentication callback acceptance failed before participation.

Maintained Sprint 021AH and 022/022B regressions, JSON, domain, roles, Supabase self-test, static validation, TypeScript, lint, local validation, production build, exact approved-path verification, diff checks, and secret/private-data scans passed. Local and remote candidate SHAs matched.

## Plan correction

The applied plan assumed the existing callback policy could accept an exact Preview callback without provider mutation. Repository authority proves the sole accepted callback is production. The Builder stopped at that material boundary and created no fixture or human session state.

## File and behavior map

The approved candidate changes the trainer portal presentation, shared horse-access domain behavior, portal-only AppShell composition, bounded callback-origin construction, focused 035M tests, and sprint evidence. Shared AppShell defaults, production origin behavior, permissions, schema, RLS, providers, and production data remain unchanged.

## Risks and decisions

- Adding a Preview callback allowlist entry is a provider mutation and requires explicit authority.
- Any future temporary callback entry must be exact, non-production, dependency-tracked, and removed after acceptance unless retention is explicitly authorized.
- Trainer identity and authentication material must remain privately controlled by the trainer.

## Recommended Architect action

**Do:** Define one narrow 035 follow-up that authorizes either the exact temporary Preview callback policy mutation and cleanup or an equivalent approved authentication route, then resumes the 14 rendered checks and private eight-step journey.

**Owner:** Architect / product owner.

**Decision:** Choose the authentication authority; do not infer it from Sprint 035M candidate approval.
