# Architect Briefing - Sprint 034D Private Containment Checkpoint

## Executive summary

**Business outcome:** Every verified-safe unique file and every protected/uncertain target is now preserved outside active workspaces with exact recovery proof, without retiring anything.

**Current focus:** Review the final target-by-target Stage 2 retirement manifest and decide whether to authorize those exact ordered transactions.

**What is proven:** Preservation checkpoint `16d5c97660ca7dbf6683d847354a21930aa2b946` is locally and remotely exact; the non-Git archive passes 64/64 SHA-256 equality; the encrypted-vault set and in-vault restore proof pass 29,897/29,897 byte equality plus two-ref private history recovery; every formerly ambiguous directory has a disposition; and all legacy targets remain present.

**What is not live:** No worktree, directory, metadata record, lock, branch or source file was removed, moved, pruned, recycled or deleted. Stage 2 retirement is unapproved. No product, provider, deployment or production state changed.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Canonical and preservation backup | passed | Preservation checkpoint local/direct-remote/live SHAs exact |
| Safe-file preservation | passed | 64/64 SHA-256 equality; 64 source hashes unchanged; zero Git entries; targetless OneDrive cloud tags do not redirect paths |
| Private containment / recovery | passed | 15 target sets pass 29,897/29,897 copy and restore equality; two refs pass private bundle/restore verification; sources unchanged |
| Retirement | attention | Exact final manifest is ready, but no removal, prune, branch deletion or metadata mutation is approved |

## Where things stand

Safe preservation and private containment are finished cleanly. The final Stage 2 manifest contains no ambiguous, unknown, pending-disposition, failed-copy or failed-restore entry. Every legacy target remains exactly where it was because retirement still requires separate approval.

## Current status

Sprint 034D is `safe-preservation-and-private-containment-complete-stage-2-retirement-withheld` on the scoped branch. The sprint is not closed and retirement remains unapproved.

## Since last sprint

Builder retained the exact Stage 1 and preservation checkpoints, then copied the approved protected targets only to the exact encrypted vault. The accepted private set covers 13 directory roots, eight environment files and two unsafe local refs, with full copy/restore proof, dormant browser profiles and unchanged sources. A path-length-limited first attempt remains privately retained and explicitly unaccepted because cleanup was not authorized.

## Architecture / file map

- `planning/reviews/034D-legacy-worktree-retirement-and-canonical-authority-finalisation.md` - Stage 1 registration/history and source-blob authority.
- `planning/reviews/034D-stage-2-containment-preservation-and-disposition-plan.md` - safe preservation, private containment/recovery proof and final Stage 2 retirement manifest.
- `planning/STATUS.json` - preservation and containment complete, retirement withheld.
- `planning/STATE.md`, roadmap, lifecycle ledger, schedule, risks, questions and evidence index - current checkpoint agreement.
- `docs/OPERATIONS_HANDOFF.md` - operator prohibition against protected material entering the safe archive or premature retirement.

## Decisions

- Keep the safe non-Git archive separate from the encrypted private vault.
- Accept the operator-attested encrypted secure store after path, capacity, share, OneDrive, reparse and Git-directory checks; record unavailable BitLocker telemetry without weakening the boundary.
- Treat the short-path `C`/`R`/`H` set as recovery authority and retain the unaccepted first attempt without cleanup.
- Require a separate final Stage 2 approval before any removal.

## Risks / watch-items

- Protected environment/provider/history findings, browser profiles and uncertain source copies remain in their original locations and in the operator-controlled encrypted recovery set; neither ordinary evidence nor the safe archive may receive them.
- Unsafe 012d and local 029F history remains local plus privately bundled and must not be pushed.
- The two stale administration records share dependencies with retained unregistered directories and must not be broadly pruned.
- The safe archive is normal OneDrive material and is not an encrypted private vault.
- The vault's encryption proof is the named operator attestation because Windows BitLocker telemetry returned `0x80041003`; keep the volume private and encrypted.
- Four non-browser directory reparse nodes were deliberately not followed, and the unaccepted first attempt remains retained until separate cleanup approval.

## Open questions for the Architect

- Should the owner approve the exact final Stage 2 retirement manifest now that every preservation dependency and restore proof passes?

## Evidence

- Stage 1 commit: `0a7070ecf073f3f83b657b143a4d20db6e4e40e8`; preservation checkpoint: `16d5c97660ca7dbf6683d847354a21930aa2b946`; local, direct remote-tracking and live remote exact before this checkpoint.
- Allowlist reconstruction: 64 committed blobs, 64 unique source paths, zero missing/duplicate mappings and expected nine-source distribution.
- Safe archive: `C:\Users\rrank\OneDrive\PNR Precision Performance 034D Archive\safe-uncommitted`.
- Preservation: 64/64 source/destination equality and 64/64 source pre/post equality; 65 files including manifest; zero Git entries. OneDrive later applied 104 Microsoft cloud tags with zero link types/targets; hashes remained exact.
- Manifest SHA-256: `50d74ab296d973941cf1cd2d6fdaf887973a083e736d3e7da653b5e7489fe0fe`.
- Ambiguous-directory reconciliation: 26 live tips queried, 25 historical trees available; safety-pattern entries stopped without values; all nine prior ambiguities now have private-containment dispositions.
- Private vault: exact operator-approved root, sufficient local NTFS capacity, outside OneDrive/shares/Git, zero destination reparses and zero Git directories.
- Private content proof: 15 target sets; 29,897/29,897 source-contained byte equality; 29,897/29,897 contained-restore equality; source metadata unchanged; protected content not hashed.
- Private history proof: exact two retained local refs in the accepted bundle and restore copy; both Git-verified and byte-equal; source refs unchanged; no push.
- Browser proof: three profiles dormant before/after, never launched, full equality, zero reparse skips.
- Non-mutation reread: one canonical registration, 28 legacy registrations, 29 administration records and all unregistered targets retained.

## Plan corrections

Raw-byte Git hashes matched only 28 of 64 allowlisted blobs because worktree text filters affect the committed identifiers. The authoritative read-only worktree index/attribute route then matched all 64 exactly. The approved OneDrive destination changed from zero reparse entries immediately after copy to 104 targetless Microsoft cloud-tagged entries; repeat hash proof and zero link targets provide the stronger storage-independent evidence. For private containment, strict PowerShell first misclassified successful Git bundle progress on stderr, then the initial restore layout exceeded the Windows path limit. Independent bundle verification and the accepted short-path layout supplied stronger proof. A 600-second supporting-tool timeout stopped between file pairs with no mismatch; the resumed run reverified all existing pairs without overwrite and completed the missing pairs.

## Validation / test status

**Tests:** 101 passing, 0 failing. Stage 1 passed 89 Sprint 035K assertions and 12 Sprint 032 controls plus JSON/static/encoding, TypeScript, ESLint and production build. Safe preservation passes 64/64 SHA-256 equality. Private containment passes 29,897/29,897 copy and restore byte equality, exact source metadata, two-ref bundle recovery, dormant browser proof, no-follow reparse handling and zero source/retirement mutation.

## Recommended next Architect action

**Do:** Review and either approve or withhold the exact final target-by-target Stage 2 retirement manifest.

**Owner:** Product owner and Architect, with the designated security/privacy operator and Platform recovery owner retaining the vault.

**Decision:** Keep all legacy targets retained unless the owner separately approves the exact Stage 2 removals. Containment proof alone is not retirement authority.
