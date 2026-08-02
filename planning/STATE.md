# Project State

Revalidated: 2026-08-02.

## Sprint 035N closeout

Sprint `035N-exact-preview-callback-and-trainer-acceptance` is closed `preview-callback-mutation-blocked-clean`. It ran from exact 035M closeout SHA `143f03344561c622a074ab40052c2dbb132a6fb3` and preserved candidate `b1bf770dc6ab3839cfc24c53563f6ed6310e08ba` plus alias-free Preview `dpl_6NBk2VKPZZUS4QqdstqDHtGk8EVV`.

Read-only provider inspection proved the production Site URL but found a two-entry allowlist containing the production callback and one unknown pre-existing alternate Preview callback. Repository evidence established no owner or lifecycle authority for that entry. The Sprint stopped before mutation: zero callback delta, zero fixtures, zero sessions, zero human attempts and zero Sprint-owned external state. The 18 focused lifecycle checks and maintained 58 local checks passed; 14 authenticated rendered checks and the eight-step human journey remain unrun. Production and `develop` were unchanged. Core Product Done is false.

## Current candidate

Sprint `035M-first-trainer-preview-access-and-core-journey` is closed `trainer-access-validation-blocked-clean` on `codex/035M-first-trainer-preview-access-and-core-journey`. Candidate SHA `b1bf770dc6ab3839cfc24c53563f6ed6310e08ba` exactly matched the remote branch and produced Ready non-production Preview `dpl_6NBk2VKPZZUS4QqdstqDHtGk8EVV`.

All 58 local executable/static checks and maintained Sprint 021AH and 022/022B regressions passed, together with canonical validation, TypeScript, lint, production build, approved-path, integrity, and secret/private-data checks. The exact callback-origin implementation passed its focused checks.

## Acceptance boundary

The existing Supabase callback policy is production-only and does not accept the exact Preview callback. Changing it was explicitly outside Sprint 035M authority. No fixture was created and no human attempt began; the 14 authenticated rendered checks and eight-step trainer journey remain unproven. No Sprint-owned external state requires cleanup.

Production deployment, aliases, DNS, Site URL, providers, Supabase configuration, production data, `develop`, and unrelated external state remain unchanged. Core Product Done is false.

## Next decision

Architect/product owner must decide whether to authorize a narrowly bounded temporary exact-Preview callback allowlist entry with dependency-safe removal in a 035 follow-up, or approve an equivalent authentication route. Do not infer provider-mutation authority.

## Governing authorities

- `planning/reviews/035M-first-trainer-preview-access-and-core-journey.md`
- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`
- `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`
- `docs/OPERATIONS_HANDOFF.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/ROADMAP.md`
- `planning/SPRINT_LIFECYCLE_LEDGER.md`
