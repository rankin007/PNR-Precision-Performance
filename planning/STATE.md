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

## Sprint 035 outcome

Sprint `035-first-trainer-access-and-core-journey` is closed `trainer-contract-expansion-required-clean`. Exact implementation commit `36a87ce341c7a7c1ad7144f97cec62dec913b38d` passed the approved 24-assertion arithmetic, maintained regressions, canonical validation, build and scope/privacy gates and was published only to its scoped branch. Exact-source Preview deployment `dpl_F8nk4bA3V84zsP9k7Wj91V8fGy9E` was Ready, alias-free, healthy and correctly denied anonymous portal access.

One designated trainer completed two bounded sign-in initiation attempts. The second proved the non-production Auth email contract supplies a numeric OTP while the approved UI supports only link completion and exposes no OTP entry/verification action. No product contract was expanded. The revocable Preview link was revoked, the exact alias-free Sprint Preview was deleted and verified absent, no fixture graph was created, and final Sprint-owned Auth/application/Storage state is `0/0/0` with zero orphans. Production project `tagnbgkroihagjmvehlx`, aliases, DNS, Site URL, providers and data were unchanged. Core Product Done remains false.

## Next product outcome

Architect must decide and authorise one coherent private sign-in contract: add numeric OTP verification to the product or change the isolated non-production email template to deliver a usable magic link. That contract work is outside Sprint 035.

## Governing authorities

- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`
- `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`
- `docs/OPERATIONS_HANDOFF.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/ROADMAP.md`
- `planning/SPRINT_LIFECYCLE_LEDGER.md`
- `planning/reviews/034-repository-reconciliation-ledger.md`
- `planning/reviews/034-repository-reconciliation-and-project-simplification.md`
