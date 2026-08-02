# Project State

Revalidated: 2026-08-02.

## Sprint 035Q closeout

Sprint `035Q-specific-error-summary-contract-and-trainer-acceptance` is closed `accessibility-contract-expansion-required-clean` from exact 035P closeout SHA `1f03578a4e53d9edd17614376dc5c4b7ffa21eee`. The corrected harness targets the specific error summary and no longer assumes page-wide alert cardinality; all `108/108` local checks pass.

Two hosted attempts each passed `6/14` and then proved the specific summary did not receive intended focus, including after one bounded renderer-timing correction. Both attempts cleaned Auth/application/Storage to `0/0/0`; final provider state is production-only and exact. No trainer participated, no product source changed, Sprint 035 remains incomplete, and Core Product Done is false.

## Sprint 035P closeout

Sprint `035P-authorised-callback-disposition-and-trainer-acceptance` is closed `trainer-access-validation-blocked-clean` from exact 035O closeout SHA `63d72c4ab5352ae4dd4bbd623e34e56dfb9e450b`. The authorised obsolete non-production callback was removed exactly; the production Site URL and production callback remained unchanged. The resulting production-only configuration became rollback authority, the exact governing Preview callback was added temporarily, and final cleanup restored the rollback state exactly.

Maintained and focused local validation passed `98/98`. Two hosted synthetic attempts each passed 6 of 14 rendered checks and stopped because the harness asserted an unsupported page-wide alert count instead of targeting the specific form error summary. The second failure exhausted the two-attempt ceiling, so no trainer participated. Both runs restored Auth/application/Storage to `0/0/0`; the final provider reread proves no Sprint-owned callback remains. Sprint 035 and Core Product Done remain incomplete.

## Sprint 035O closeout

Sprint `035O-callback-ownership-reconciliation-and-trainer-acceptance` is closed `callback-ownership-unresolved-clean` from exact 035N closeout SHA `edff01c957f2ec56821c6a786447ebdfbe369ba6`. The approved deterministic harness and ten focused disposition/lifecycle assertions pass; maintained 035M and 035N checks also pass for 86/86 local target checks.

No authorised platform-owner disposition was supplied for the pre-existing alternate Preview callback. No provider read or write, callback delta, fixture, session or human attempt occurred. Fourteen rendered checks and the eight-step trainer journey remain unrun. Production, `develop` and unrelated external state remain unchanged. Core Product Done is false.

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
