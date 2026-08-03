# Architect Briefing - Sprint 034D Final Closeout

## Executive summary

**Business outcome:** The permanent canonical repository is now the sole registered worktree. The exact approved 49-row legacy-retirement manifest completed without losing verified-safe or protected recovery material.

**Current focus:** Sprint 034D is closed. The next roadmap decision is Sprint 036 production promotion; Sprint 029N remains planned behind its privacy/data authority gate.

**What is proven:** All 45 legacy filesystem targets, two stale worktree-administration records and two protected local refs are retired; zero legacy registrations or stale metadata remain; one exact canonical registration remains; the safe archive passes 64/64 SHA-256 equality; and accepted private copy/restore passes 29,897/29,897 with both protected histories recoverable from two verified byte-equal bundles.

**What is not live:** No product, provider, Auth, deployment, DNS, data, billing or production state changed. Sprint 035K remains Preview-accepted and production-not-promoted.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Manifest retirement | passed | 49/49 rows executed individually in recorded dependency order; legacy root retired last |
| Canonical authority | passed | One registration exactly at the permanent canonical path; zero legacy registrations and zero worktree-admin directories |
| Safe-file preservation | passed | 64/64 SHA-256 equality; 65 files including sanitized manifest; zero Git entries and zero linked reparse targets |
| Private containment / recovery | passed | 15/15 `C` and `R` target sets; 29,897/29,897 files and exact bytes; both bundles verify and contain the expected two heads |
| Remote preservation | passed | Scoped 034D checkpoint exact before closeout; Sprint 035Q exact and retained; divergent remote 029F present and unchanged by retirement |

## Where things stand

Sprint 034D is `legacy-worktrees-retired-canonical-authority-final-clean`. The legacy OneDrive root and all recorded `C:\tmp` targets are absent. The legacy metadata control plane is gone; the canonical repository has one clean registration and no stale worktree metadata.

## Since last sprint

Builder revalidated preservation and recovery, then processed 27 linked worktrees, 17 unregistered directories, two dependent stale administration records, two protected local refs and the legacy root. Registration, filesystem, branch, metadata and recovery state were reread after each transaction. The root was processed only after all other rows and reachability dependencies passed.

## Architecture / file map

- `planning/reviews/034D-legacy-worktree-retirement-and-canonical-authority-finalisation.md` - Stage 1 historical ledger plus final Stage 2 addendum.
- `planning/reviews/034D-stage-2-containment-preservation-and-disposition-plan.md` - preservation, private recovery, exact 49-row manifest and post-retirement reconciliation.
- `planning/STATUS.json` and `planning/STATE.md` - closed canonical authority.
- `docs/OPERATIONS_HANDOFF.md` - post-retirement retention and non-recreation boundary.

## Decisions

- Preserve the canonical registration and never recreate or adopt a retired legacy path without new authority.
- Retain the non-Git safe archive, accepted encrypted-vault `C`/`R`/`H` set, private manifest and unaccepted partial attempt until a separate retention or cleanup decision.
- Keep Sprint 035Q as remote-backed alternate non-authoritative history.
- Treat the pre-existing divergent remote 029F branch as distinct from the protected retired local 029F history preserved privately.

## Risks / watch-items

- The unaccepted path-length-limited private-containment attempt remains retained and is not recovery authority; cleanup still requires separate approval.
- The accepted encrypted recovery set must remain operator-controlled, encrypted, non-Git, non-shared and non-OneDrive.
- The safe archive is ordinary OneDrive material, not the encrypted private vault, and must never receive protected material.
- Preview acceptance must not be restated as production promotion.

## Open questions for the Architect

- Decide Sprint 036 production promotion or deliberate non-promotion.
- Separately decide eventual retention/cleanup for the unaccepted private attempt, safe archive and accepted vault set; Sprint 034D does not authorize deletion.

## Evidence

- Filesystem retirement: 45/45 exact manifest paths absent.
- Metadata retirement: zero legacy registrations and zero worktree-administration directories; one canonical registration exactly.
- Protected refs: both local refs absent after accepted-bundle re-verification and compare-and-swap deletion.
- Safe archive: 64/64 recorded SHA-256 equality; manifest SHA-256 `50d74ab296d973941cf1cd2d6fdaf887973a083e736d3e7da653b5e7489fe0fe`.
- Private recovery: 15 target sets; 29,897/29,897 contained and restore files; exact recorded bytes; zero accepted destination reparses; bundle and restore copy byte-equal and Git-verified.
- Browser proof: all three profiles remained dormant and were never launched.
- Remote proof: Sprint 035Q remains exactly `954438dd34d3d91ec3e0cd62868e912acc568e44`; the scoped 034D checkpoint was exact before closeout; remote 029F remains divergent from the protected bundled tip.
- Retention proof: safe archive, accepted vault roots, private manifest and unaccepted attempt all remain present.

## Plan corrections

Git worktree removal succeeded for registrations but OneDrive-backed targetless administration directories sometimes returned permission errors. After proving each registration absent, Builder removed only the exact corresponding unlocked metadata directory; no broad prune ran. Reparse-bearing filesystem rows used no-follow deletion and never traversed junction/symbolic-link targets.

The legacy-root first no-follow pass timed out after 30 minutes and left an expected partial residual with `.git` already absent. Builder did not repeat it blindly. A disposable test proved a compiled reparse-tag-aware walker preserves junction targets while traversing targetless OneDrive cloud-tagged directories; the exact residual then completed, and the entire manifest/preservation state was reread.

The legacy-root ignored-entry count used a stronger reconciliation substitute because OneDrive and Git ignored-enumeration modes returned different aggregate forms. Tracked `38` and untracked `422` matched exactly; all six protected environment paths matched accepted private recovery, and the bounded ignored difference was generated/ignored-only.

## Validation / test status

**Tests:** 101 passing, 0 failing from the unchanged product baseline: 89 Sprint 035K assertions and 12 Sprint 032 public controls. Sprint 034D changed planning/operations evidence only. Closeout passed the JSON self-test (8 cases), all 7 JSON files, 8 maintained static groups, encoding across 981 maintained text files, four-target Pack dry-run, Git integrity and diff checks. Exact scope/safety, final physical reconciliation and post-push equality complete the closeout authority.

## Recommended next Architect action

**Do:** Select Sprint 036 promotion or deliberate non-promotion without reopening retired legacy paths.

**Owner:** Product owner and Architect. The designated security operator and Platform recovery owner retain the recovery set under the recorded boundary.

**Decision:** Sprint 034D is closed. Recovery-set deletion and cleanup of the unaccepted attempt remain separate, explicit decisions.
