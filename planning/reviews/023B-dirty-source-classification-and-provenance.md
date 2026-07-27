# Sprint 023B - Dirty Source Classification And Provenance

Date: 2026-07-28

## Opening Boundary

The original worktree was `develop` at `b8961b9647507af87e6887cf78c1d6e262f944b6`, 16 commits ahead of `origin/develop`, with no staged entries and extensive modified/untracked material. Inventory used `git status --porcelain=v1`; protected values and ignored content were not read, printed, copied, or hashed.

The following rules classify every path reported by that inventory. Exact-file rules take precedence over directory/glob rules.

## Included Classifications

- `include-021AH`: `supabase/migrations/0017_valid_null_safe_authenticated_biochemistry_comment_soft_delete.sql`, `scripts/validate-supabase-clean-rebuild-020G.ps1`, `scripts/test-valid-null-safe-soft-delete-authorization-021AH.mjs`, `scripts/_s/021AH/**`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/SPRINT_021_PROGRESS.md`, `docs/VALIDATION.md`, `planning/architect-packs/architect-pack-021AH-*`, `planning/sprints/021AH-*/**`, and `planning/reviews/021AH-*`.
- `include-022`: `app/(ops)/data-entry/biochemistry/actions.ts`, `app/(ops)/data-entry/biochemistry/page.tsx`, `components/ops/biochemistry-result-panel.tsx`, `components/ops/biochemistry-capture-workflow.tsx`, `components/ops/biochemistry-workflow-state.ts`, `scripts/test-biochemistry-workflow-022.mjs`, `scripts/run-validation-suite.mjs`, `scripts/README.md`, `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`, `docs/BIOCHEMISTRY_WORKFLOW_022.md`, `docs/BIOCHEMISTRY_FIELD_TRIAL_022.md`, `planning/architect-packs/architect-pack-022-*`, `planning/sprints/022-*/**`, and `planning/reviews/022-*`.
- `include-022B`: `planning/architect-packs/architect-pack-022B-*`, `planning/sprints/022B-*/**`, and `planning/reviews/022B-*`.
- `include-shared-required`: `app/(admin)/admin/memberships/actions.ts`, `lib/auth/app-context.ts`, `lib/auth/bootstrap.ts`, migrations `0013` through `0016`, `supabase/bootstrap/remote-init.sql`, and `docs/ENVIRONMENT.md`. These are the accepted role/auth/runtime and immutable-ledger prerequisites exercised by the final 021AH application proof.
- `planning-provenance-only`: the dirty copies of `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md`, `planning/PROJECT_SPRINT_LIST_2026-07-21.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, the Sprint 023/023B Packs, and `planning/reviews/023-*`. Their facts are reconciled onto the 029M base; the mixed dirty files are not blanket-copied.

## Excluded Classifications

- `exclude-029-or-other-sprint`: every dirty `planning/architect-packs/architect-pack-029*` path. The selected base already contains the accepted 029M lineage; dirty release-pack copies are not overlaid.
- `exclude-temporary-or-generated`: `.codex-temp/` in its entirety. Contents were not inventoried or copied.
- `exclude-secret-or-local-only`: none of the reported paths required copying protected values. `.env.example` was not copied because its dirty hunks belong to later runtime-secret work rather than the selected accepted source.
- `exclude-unproven`: `.gitignore`, `package.json`, `package-lock.json`; all dirty `planning/architect-packs/architect-pack-021*` except 021AH; all dirty `planning/sprints/021*/**` except 021AH; all dirty `planning/reviews/021*` except 021AH; all dirty `scripts/*021*.mjs` and `scripts/_s/**` except the focused 021AH paths; and all other dirty paths not matched by an include rule above. The package files specifically add `playwright-core`, which violates Sprint 023B's no-new-dependency boundary.
- `requires-manual-decision`: none after artifact/source comparison. No unresolved path was needed for runtime behaviour, migration integrity, accepted tests, or evidence.

## Provenance Basis

Included source maps to the applied 021AH, 022, and 022B sprint requirements and their accepted reviews. Migrations 0013-0017 and the shared auth helpers are retained because the final 021AH direct/rendered proof depends on that accumulated accepted contract. Sprint 022 source and its deterministic test map directly to the typed mobile workflow. Sprint 022B contributes evidence wording only.

No dirty path was selected merely because it was newer. No blanket directory copy was used for runtime source, planning state, package metadata, or historical 021 experiments.
