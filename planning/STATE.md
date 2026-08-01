# Project State

Revalidated: 2026-08-01.

## Current baseline — 2026-07-30

Sprint `034-repository-reconciliation-and-project-simplification` is closed `reconciled-product-baseline-and-project-simplification-complete-clean` on branch `codex/034-reconciled-product-baseline`. The baseline starts from exact accepted Sprint 032 release SHA `f7242ee0785ae9b87022394206c89ebdd5c9f6ad`, whose ancestry includes accepted Sprint 021AH authenticated application work and Sprint 022/022B mobile biochemistry workflow work. The release migration ledger through `0021` is preserved unchanged, including the required accepted auth/mobile boundary `0001`–`0017`; current application source, focused tests, Sprint 033 final acceptance and operational handoff authorities are preserved.

The public release remains valid at deployment `dpl_fPWqinnfL4YZJq41MQPaXhhuh7hi`; rollback target is `dpl_6F1TMjNRECmTCyMbyWXA6ohG8Q2R`. Sprint 034 did not deploy or mutate production. Product-wide Done is not met: clinical authority, audio, upload acceptance, trends, timed real-device acceptance and complete operational ownership remain deferred, unproven or not done.

## Repository truth

- Governing product baseline: `codex/034-reconciled-product-baseline`.
- Reconciliation commit: `aeb24d2d038f9875973764b25538caaea6473d02`; planning closeout and first verified remote tip: `aa87dfe010ca1ae900f0ce633ee7b2fad2a076bf`.
- Source release: `codex/032-public-relaunch-production` at `f7242ee`.
- Local `develop` (`b8961b9`) and `origin/develop` (`502b45a`) remain separate historical/divergent lineages and were not merged, rebased or pushed.
- The original dirty root remains untouched except for applying the Sprint 034 Pack; its uncommitted material is classified in the Sprint 034 reconciliation ledger.
- No uncertain historical file was deleted or moved. Discoverability was improved through current indexes and lifecycle classification.
- Fresh isolated-worktree revalidation passed 16/16 groups with zero failures. Before this re-attestation, local and freshly queried remote tips were exactly `d949069834c375ce4b485a4336eb701944b2d984`.

## Next product outcome

Sprint 035 is the single next recommendation: Trainer Pilot And Dashboard MVP. It should start from the clean 034 baseline, deliver a trainer-visible journey, and keep voice, OCR, transactional commerce, sophisticated saved views and broad public enhancements deferred unless explicitly promoted.

## Governing authorities

- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`
- `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`
- `docs/OPERATIONS_HANDOFF.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/ROADMAP.md`
- `planning/SPRINT_LIFECYCLE_LEDGER.md`
- `planning/reviews/034-repository-reconciliation-ledger.md`
- `planning/reviews/034-repository-reconciliation-and-project-simplification.md`
