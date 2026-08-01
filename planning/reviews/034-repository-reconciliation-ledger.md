# Sprint 034 Repository Reconciliation Ledger

Date: 2026-07-30. Revalidated: 2026-08-01.

## Baseline selection

Selected `codex/032-public-relaunch-production` at exact release SHA `f7242ee0785ae9b87022394206c89ebdd5c9f6ad` as the parent of `codex/034-reconciled-product-baseline`. Its ancestry includes reconciliation commit `a7759f6` for accepted Sprint 021AH and 022 source, then the completed lineage through `355327c`, followed by the exact Sprint 032 public release. This is stronger than file recency because it combines accepted ancestry with executable release evidence.

Local `develop` at `b8961b9` is ahead 15/behind 5 relative to `origin/develop` at `502b45a` and is a separate marketing-release lineage. It was not merged. `origin/develop` is not the accepted release. `codex/029-marketing-preview-release` is preserved as historical scoped backup. No shared branch was rebased, reset, force-updated or pushed.

## Dirty root classification

The root contained 36 tracked modifications and 269 untracked paths before Sprint 034 application.

The later 2026-08-01 read-only audit found the still-separate root on `develop` at `b8961b9`, with 38 tracked modifications and 411 untracked paths. The difference remains outside the reconciled baseline and was not copied, staged, moved, archived, deleted or inspected for protected values.

| Group | Disposition | Evidence/rule |
|---|---|---|
| Auth/application changes, scripts and reviews in 021-series | Preserve as accepted history where present in release ancestry; otherwise leave in dirty root | Accepted 021AH boundary and release ancestry; no recency inference |
| Mobile biochemistry source, tests, docs and 022/022B reviews | Preserve in baseline | Accepted reconciliation ancestry and maintained evidence |
| Migrations and lockfile | Preserve exact release ledger through `0021`; required auth/mobile boundary `0001`–`0017` remains immutable | Release ancestry and focused tests; no migration content changed |
| Sprint 032/033 authorities and reviews | Preserve in baseline | Current release and final-handoff authority |
| Sprint 023–031 packs, sprint files, scripts, reviews and visual evidence | Preserve as history in existing location | Mixed lineage/status; uncertain ownership prevents archive/delete |
| Generated `.next`, dependencies, local caches and protected environment paths | Ignore/local-only or reproducible output | Classified by name only; values were not read or copied |
| Applied Sprint 034 Pack and generated sprint files | Preserve in baseline | Current Builder handoff and execution record |

Large homogeneous untracked groups were classified by directory/outcome rather than reproducing hundreds of filenames. Nothing was absorbed merely because it was newer. No secret, credential, environment value or real horse/stable/customer data was copied into evidence.

## Worktrees and candidate lineages

Registered 023–027 worktrees are preserved as historical candidates; the 027B/032 worktree contains the accepted release. The 029M worktree is a separate follow-up lineage. The 012 worktrees are historical. Prunable AppData worktree registrations were observed but not cleaned because Sprint 034 did not own them. The new `C:\tmp\pnr-034-reconciled-product-baseline` worktree is Sprint-owned.

No referenced candidate was deleted. No archive move was made: current indexes and lifecycle classification create clarity without breaking links or manufacturing cleanliness.

## Sprint 035 effect

Sprint 035 has one safe start point: `codex/034-reconciled-product-baseline`. Deferred authority remains explicit in the final acceptance matrix and does not block a bounded trainer-visible dashboard MVP.

Existing 035-series Packs and branches are classified as proposed or historical input only. Sprint 034 did not apply, execute, merge or absorb them.
