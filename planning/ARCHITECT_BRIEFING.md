# Architect Briefing — Sprint 035N Closeout

## Where things stand

Sprint 035N stopped safely before changing Supabase. The exact trainer candidate remains Ready and locally validated, but a read-only provider check found one unexplained alternate Preview callback already present. Until an authorised owner identifies whether that entry must be retained or removed, adding another temporary callback and beginning trainer acceptance would make cleanup unsafe.

## Executive summary

**Business outcome:** The callback lifecycle harness is implemented and machine-validated; external state remains unchanged.

**Current focus:** Resolve ownership and lifecycle of the unknown pre-existing Preview callback before private trainer participation.

**What is proven:** 58 maintained local checks, 18 focused lifecycle checks, canonical local validation, TypeScript, lint, production build, sanitized provider read and zero Sprint mutation.

**What is not live:** No callback change, fixture or human attempt occurred. Fourteen authenticated rendered checks and the eight-step trainer journey remain incomplete. Core Product Done is false.

## Readiness signals

| Signal | Status | Meaning |
|---|---|---|
| Candidate implementation | passed | Approved files and fail-closed boundaries validated |
| Exact-source Preview | passed | `dpl_6NBk2VKPZZUS4QqdstqDHtGk8EVV` is Ready and non-production |
| Callback construction | passed | Exact HTTPS Preview origin is derived only from deployment-provided Vercel state |
| Provider lifecycle | attention | One pre-existing alternate Preview callback has unknown ownership |
| Human trainer journey | attention | Not started; no protected values handled |

## Current status

Closed `preview-callback-mutation-blocked-clean`. Candidate SHA: `b1bf770dc6ab3839cfc24c53563f6ed6310e08ba`. Preview: `dpl_6NBk2VKPZZUS4QqdstqDHtGk8EVV`. Core Product Done: false.

## Validation

**Tests:** 76 passing, 0 failing. Fourteen authenticated rendered checks were unrun. The separate eight-step human journey had zero attempts.

The 58 maintained 035M and 18 focused 035N checks passed. JSON, domain including maintained 022/022B, roles/Supabase self-tests covering maintained 021AH contracts, static validation, TypeScript, lint, local validation and production build passed after an exact-lockfile dependency install supplied the missing clean-worktree modules.

## Plan correction

The applied plan expected the provider before-state to be safely attributable. The exact read instead found one alternate Preview callback absent from repository ownership evidence. The Builder stopped before any write and created no fixture or human session state.

## File and behavior map

The approved candidate changes the trainer portal presentation, shared horse-access domain behavior, portal-only AppShell composition, bounded callback-origin construction, focused 035M tests, and sprint evidence. Shared AppShell defaults, production origin behavior, permissions, schema, RLS, providers, and production data remain unchanged.

## Risks and decisions

- Unknown pre-existing callback state cannot be adopted, removed or used as cleanup authority.
- Any future temporary callback entry must be exact, non-production, dependency-tracked and removed after acceptance.
- Trainer identity and authentication material must remain privately controlled by the trainer.

## Recommended Architect action

**Do:** Have an authorised Supabase owner privately classify the existing alternate callback as `retained with owner` or `removed as obsolete`, then plan the smallest continuation that rereads configuration before exact callback work.

**Owner:** Supabase platform owner, then Architect / product owner.

**Decision:** Do not infer ownership, delete the unknown callback, add the governing callback, or begin human acceptance until the sanitized provider disposition is durable.
