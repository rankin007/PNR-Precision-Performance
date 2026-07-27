# Sprint 023B - Reconciled Source Manifest

Date: 2026-07-28

## Included Product Source

- Accepted auth/application prerequisites: membership action, application context, bootstrap helper, and `docs/ENVIRONMENT.md` operational contract.
- Accepted Sprint 022 workflow: biochemistry action/page integration, result panel, capture workflow, pure state model, workflow documentation, and deterministic test registration.
- Accepted immutable ledger: migrations `0013`-`0017`, with existing `0001`-`0012` inherited unchanged from `ad9d419`.
- Accepted deterministic alignment: `supabase/bootstrap/remote-init.sql` and the clean-rebuild validator through `0017`.
- Focused 021AH local proof: valid null-safe SQL parser/truth-table test and bounded diagnostic source.
- Durable provenance: 021AH, 022, 022B, 023, and 023B Packs/sprint artifacts plus the accepted 021AH/022/022B/023 reviews.

Shared tracked files were compared against the selected base individually. Public/marketing, API, commerce, scoring, recommendation, and deployment paths have no diff. `package.json` and `package-lock.json` remain byte-identical to the 029M base; no dependency was added.

## Excluded Material

- All `.codex-temp/**`, generated output, caches, and local runtime material.
- The dirty `playwright-core` package/lockfile addition.
- Intermediate 021AA-021AG and unrelated 021N-021Z Packs, artifacts, evidence, and harnesses not required for the focused accepted baseline.
- Dirty 029 pack copies and other release material already represented by the selected committed 029M base.
- Dirty planning files were not copied wholesale because they mix multiple lineages; only evidence-backed 023B closeout facts are added on top of the 029M state.

## Integrity Boundaries

- Migrations `0001`-`0012` are untouched relative to `ad9d419`; `0013`-`0017` are copied from the accepted dirty source without editing.
- No upload, Storage, privacy, scoring, recommendation, voice, commerce, public-route, or deployment behaviour was introduced.
- The 029M public source and rollback provenance remain unchanged.
- The isolated diff contains no environment values, credentials, signed URLs, private payloads, or real client files.
