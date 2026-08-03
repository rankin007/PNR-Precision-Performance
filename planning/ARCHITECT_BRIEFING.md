# Architect Briefing - Sprint 034D Stage 1 Checkpoint

## Executive summary

**Business outcome:** The legacy workspace estate is reconciled into a sanitized, target-specific retirement manifest without deleting or changing any legacy object.

**Current focus:** Decide how to contain protected legacy material and preserve 64 safe unique files before considering separately approved Stage 2 retirement.

**What is proven:** The permanent canonical clone has one registration; separate legacy Git metadata owns 28 registrations; 17 additional directories are unregistered; 27 of 28 registered HEADs are live-remote recoverable; Sprint 035Q is safe remote-backed alternate history; and the two non-remote histories and all uncommitted preservation dependencies are classified.

**What is not live:** No legacy worktree, directory, metadata record, lock, branch or file was retired. No archival branch was pushed, no external archive was created, no 035Q change was adopted, and no product or production state changed.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Canonical authority | passed | Canonical CWD/top-level exact; standalone metadata registers one canonical worktree |
| Legacy reconciliation | passed | 28 legacy-metadata registrations and 17 unregistered directories have exact Stage 2 dispositions |
| Remote recovery | attention | 27 registered HEADs are remote-recoverable; 012d and one other local-only history failed safety gates and remain local |
| Stage 2 retirement | attention | Protected-material containment and approved preservation of 64 safe unique files are unresolved |

## Where things stand

Stage 1 is complete and Stage 2 is deliberately withheld. The reconciliation distinguishes canonical authority from registrations owned by separate legacy Git metadata and from unregistered directories. Every legacy target remains in place, including two stale administrative records found only by dry-run inspection.

## Current status

Sprint 034D is `stage-1-complete-stage-2-withheld` on `codex/034D-legacy-worktree-retirement-and-canonical-authority-finalisation`. The sprint is not closed because no retirement has been authorized or performed.

## Since last sprint

The four-file 034D Pack was applied. Builder completed read-only Git, filesystem and live-remote reconciliation; classified Sprint 035Q; scanned every local branch for non-remote commits; classified dirty material; and wrote the exact retirement manifest. No product source was changed.

## Architecture / file map

- `planning/sprints/034D-legacy-worktree-retirement-and-canonical-authority-finalisation/` - applied Builder authority and acceptance boundary.
- `planning/reviews/034D-legacy-worktree-retirement-and-canonical-authority-finalisation.md` - exact sanitized target ledger, safety gates, recovery evidence and ordered Stage 2 manifest.
- `planning/STATUS.json` - Stage 1 checkpoint awaiting a separate Stage 2 decision.
- `planning/STATE.md`, roadmap, lifecycle ledger, schedule and evidence index - canonical authority and current status.
- `docs/OPERATIONS_HANDOFF.md` - operator prohibition against premature legacy retirement or 035Q adoption.

## Decisions

- Treat the canonical registration, legacy-metadata-owned registrations and unregistered directories as three distinct sets.
- Retain Sprint 035Q remotely as safe non-authoritative alternate history without adopting it.
- Refuse remote backup for the two local-only histories because their safety gates did not fully pass.
- Preserve all source worktrees containing unique files until an approved external-preservation mechanism proves copy equality.

## Risks / watch-items

- The 012d history and two registered worktrees contain protected-path or provider-material findings and require private containment.
- One other local-only commit retains non-placeholder identity metadata.
- Three browser-profile directories were classified without content traversal and require private handling.
- Two stale legacy administrative records and two unregistered directories sharing one stale pointer must not be pruned independently.
- The proposed sibling-folder archive is absent; heuristic safety scans were not accepted as sufficient disclosure authority.

## Open questions for the Architect

- What approved private containment method should handle the protected legacy entries?
- Should the product owner explicitly authorize the 64-file external archive after reviewing the residual disclosure risk, or select another preservation mechanism?
- Which ambiguous source/deployment-copy directories require deeper private reconciliation before retirement?
- Once dependencies are resolved, should Stage 2 authorize the exact ordered removals in the ledger?

## Evidence

- Canonical `git worktree list --porcelain`: one canonical registration.
- Legacy `git worktree list --porcelain`: 28 registrations; administrative inventory: 29 entries.
- Legacy `git worktree prune --dry-run --verbose`: only two absent records reported; no prune executed.
- Fresh `git ls-remote --heads origin`: exact live tips captured; 27/28 registered HEADs reachable.
- All 39 legacy local branches compared with every live remote tip: only 012d and local 029F contain non-remote commits; neither passed all safety conditions.
- Sprint 035Q exact local/tracking/live tip `954438dd34d3d91ec3e0cd62868e912acc568e44`; nine commits ahead and 62 behind accepted 034C.
- Dirty-content reconciliation: 47 paths already represented remotely; 64 unique safe files remain in nine source worktrees.
- External archive destination absent; no remote archival branch created; all legacy targets retained.
- Final non-mutation reread: 1 canonical registration, 28/28 legacy registrations present, 29 legacy administration records, 17/17 unregistered targets present and 39 legacy local branches present.
- Canonical and legacy `git fsck --full --no-progress`: exit zero; Pack agreement: 4/4 exact generated sections.

## Plan corrections

The approved Stage 1 allowed remote backup only for genuinely unique commits that passed sanitized safety checks. No unique commit passed every condition, so no archival push was made. Copying the 64 safe unique files to the proposed sibling archive was rejected at execution review because heuristic scans did not establish sufficient disclosure authority; the source worktrees were retained and the dependency was recorded instead. The Pack's nonexistent `planning/evidence/INDEX.md` path was corrected deterministically to `planning/EVIDENCE_INDEX.md` in both Pack and generated requirements. A sandboxed final-audit Git call hit the legacy repository's ownership guard; command-local `safe.directory` supplied equivalent read-only proof without changing configuration. The first checkpoint commit attempt stopped before commit creation because Git identity was not configured in the sandbox; the retry inherits the accepted base commit's identity through command-local environment values without displaying or persisting it.

## Validation / test status

**Tests:** 101 passing, 0 failing. The Sprint 035K deterministic suite passed 89 assertions and the Sprint 032 public-relaunch suite passed 12/12. JSON, maintained-text encoding across 980 files, static safety, TypeScript and ESLint validation passed; the production build passed. The 18-file changed/untracked safety scan, 17 actionable added-path checks, `git diff --check`, Pack agreement and both Git integrity checks passed.

## Recommended next Architect action

**Do:** Review the exact Stage 2 manifest, choose approved private containment and preservation mechanisms, and issue Stage 2 authority only after those dependencies are proven.

**Owner:** Product owner, Architect and designated security/privacy owner.

**Decision:** Either authorize a defined preservation/containment path and then a bounded target-by-target Stage 2 retirement, or retain the current non-mutating estate. Do not authorize broad cleanup or 035Q adoption by implication.
