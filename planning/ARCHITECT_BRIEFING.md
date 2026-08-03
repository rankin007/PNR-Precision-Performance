# Architect Briefing - Sprint 034D Preservation Checkpoint

## Executive summary

**Business outcome:** Every verified-safe unique file is now preserved outside active workspaces with exact equality, and every legacy target has a decided disposition without retiring anything.

**Current focus:** Supply a real authorized protected-material operator and exact mounted encrypted-vault root, complete private containment and restore proof, then decide whether to approve the final Stage 2 retirement manifest.

**What is proven:** Stage 1 commit `0a7070ecf073f3f83b657b143a4d20db6e4e40e8` is locally and remotely exact; the non-Git archive contains 64 allowlisted files with 64/64 source/destination and source pre/post SHA-256 equality; every formerly ambiguous unregistered directory has a conservative disposition; and all legacy targets remain present.

**What is not live:** Private containment did not execute because the supplied operator and vault-root values were placeholders. No worktree, directory, metadata record, lock, branch or source file was removed, moved, pruned, recycled or deleted. No product, provider, deployment or production state changed.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Canonical and Stage 1 backup | passed | Scoped commit local/direct-remote/live SHAs exact |
| Safe-file preservation | passed | 64/64 SHA-256 equality; 64 source hashes unchanged; zero Git entries; targetless OneDrive cloud tags do not redirect paths |
| Complete disposition manifest | passed | 28 registered targets, 17 unregistered targets, two stale records and two local-only branches have decided disposition classes |
| Private containment / retirement | attention | Placeholder operator/vault details are not executable; no containment or retirement is approved |

## Where things stand

The safe preservation dependency is finished cleanly. The final Stage 2 manifest no longer contains an ambiguous or unknown disposition, but protected entries still need a real encrypted destination, authorized operator and private restore proof. Every legacy target remains exactly where it was.

## Current status

Sprint 034D is `safe-preservation-complete-private-containment-pending-stage-2-withheld` on the scoped branch. The sprint is not closed and retirement remains unapproved.

## Since last sprint

Builder committed and pushed the exact 18-file Stage 1 checkpoint, proved direct local/remote equality, resolved every ambiguous unregistered-directory disposition, copied only the 64 committed safe blobs to the approved non-Git destination, generated a sanitized CSV manifest and proved 64/64 equality without changing sources.

## Architecture / file map

- `planning/reviews/034D-legacy-worktree-retirement-and-canonical-authority-finalisation.md` - Stage 1 registration/history and source-blob authority.
- `planning/reviews/034D-stage-2-containment-preservation-and-disposition-plan.md` - preservation proof, private actions and final Stage 2 retirement manifest.
- `planning/STATUS.json` - preservation complete, containment/retirement withheld.
- `planning/STATE.md`, roadmap, lifecycle ledger, schedule, risks, questions and evidence index - current checkpoint agreement.
- `docs/OPERATIONS_HANDOFF.md` - operator prohibition against protected material entering the safe archive or premature retirement.

## Decisions

- Keep the safe non-Git archive separate from any private protected-material vault.
- Treat placeholder operator/vault text as missing authority, not a usable destination.
- Resolve all formerly ambiguous source/extract/validation copies to conservative private containment.
- Require private restore proof and a separate final Stage 2 approval before any removal.

## Risks / watch-items

- Protected environment/provider/history findings, browser profiles and uncertain source copies remain only in legacy locations.
- Unsafe 012d and local 029F history remains local and must not be pushed.
- The two stale administration records share dependencies with retained unregistered directories and must not be broadly pruned.
- The safe archive is normal OneDrive material and is not an encrypted private vault.

## Open questions for the Architect

- Who is the actual authorized protected-material operator?
- What is the exact absolute mounted root of the encrypted private vault?
- What retention period and recovery owner govern the safe archive and private vault?
- After containment/restore proof, should the owner approve the exact final Stage 2 retirement manifest?

## Evidence

- Stage 1 commit: `0a7070ecf073f3f83b657b143a4d20db6e4e40e8`; local, direct remote-tracking and live remote exact.
- Allowlist reconstruction: 64 committed blobs, 64 unique source paths, zero missing/duplicate mappings and expected nine-source distribution.
- Safe archive: `C:\Users\rrank\OneDrive\PNR Precision Performance 034D Archive\safe-uncommitted`.
- Preservation: 64/64 source/destination equality and 64/64 source pre/post equality; 65 files including manifest; zero Git entries. OneDrive later applied 104 Microsoft cloud tags with zero link types/targets; hashes remained exact.
- Manifest SHA-256: `50d74ab296d973941cf1cd2d6fdaf887973a083e736d3e7da653b5e7489fe0fe`.
- Ambiguous-directory reconciliation: 26 live tips queried, 25 historical trees available; safety-pattern entries stopped without values; all nine prior ambiguities now have private-containment dispositions.
- Non-mutation reread: one canonical registration, 28 legacy registrations, 29 administration records and all unregistered targets retained.

## Plan corrections

Raw-byte Git hashes matched only 28 of 64 allowlisted blobs because worktree text filters affect the committed identifiers. The authoritative read-only worktree index/attribute route then matched all 64 exactly. The supplied protected operator and encrypted-vault values were placeholders, so Builder completed only the expressly approved safe archive and left browser profiles dormant and every protected target untouched. The approved OneDrive destination changed from zero reparse entries immediately after copy to 104 targetless Microsoft cloud-tagged entries; repeat hash proof and zero link targets provide the stronger storage-independent evidence.

## Validation / test status

**Tests:** 101 passing, 0 failing. Stage 1 passed 89 Sprint 035K assertions and 12 Sprint 032 controls plus JSON/static/encoding, TypeScript, ESLint and production build. The preservation checkpoint passed exact allowlist reconstruction, content/path safety gates, 64/64 SHA-256 equality, source non-mutation, archive-isolation and maintained static validation.

## Recommended next Architect action

**Do:** Obtain a real operator identity and exact encrypted-vault root, approve the private copy/restore procedure, then review the final target-by-target retirement manifest after containment succeeds.

**Owner:** Product owner, designated security/privacy operator and Architect.

**Decision:** Keep all legacy targets retained unless private containment and restore proof complete and the owner separately approves the exact Stage 2 removals.
