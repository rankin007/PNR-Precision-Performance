# Sprint 034D Stage 2 Containment, Preservation And Disposition Plan

Date: 2026-08-03.

Status: `safe-preservation-complete-private-containment-pending-stage-2-withheld`.

This record is a sanitized preparation document. It authorizes no removal, prune, recycle, move, deletion, branch deletion, metadata change, or protected-content disclosure. The committed Stage 1 checkpoint remains the governing evidence until the owner explicitly approves the exact mechanisms below.

## Stage 1 checkpoint backup proof

- Scoped branch: `codex/034D-legacy-worktree-retirement-and-canonical-authority-finalisation`.
- Exact Stage 1 checkpoint: `0a7070ecf073f3f83b657b143a4d20db6e4e40e8`.
- Local `HEAD`, exact `refs/remotes/origin/codex/034D-legacy-worktree-retirement-and-canonical-authority-finalisation`, and a fresh live remote-ref query all equal that SHA.
- The canonical worktree was clean immediately after equality proof.
- The clone's normal fetch mapping is intentionally limited to two older scoped branches, so `@{u}` does not resolve the new remote-tracking ref. The exact direct remote-tracking ref plus fresh live remote ref provide equivalent stronger equality proof; fetch configuration was not changed.

## Required separation

Two different destinations and handling rules are required.

1. The verified-safe 64-file archive may contain only the exact safe non-secret manifest from the Stage 1 ledger. It must be a normal non-Git copy with per-file SHA-256 equality.
2. Protected or uncertain material must not enter that archive. It requires an operator-owned encrypted private vault on an explicitly named protected local volume or approved secure store. No protected value, content hash, private URL, identity, credential, browser state, or reusable authentication material may be emitted into Git, chat, logs, screenshots, or the safe archive.

## Proposed 64-file non-Git preservation mechanism

The proposed destination is:

`C:\Users\rrank\OneDrive\PNR Precision Performance 034D Archive\safe-uncommitted`

The owner explicitly approved this exact destination and literal-copy/SHA-256 mechanism. Preservation completed without changing any source.

| Source ID | Exact source root | Files |
|---|---|---:|
| `wt-023` | `C:\tmp\pnr-023-test-evidence-uploads` | 6 |
| `wt-023q` | `C:\tmp\pnr-023q-evidence-safety-provider-integration-and-production-readiness` | 5 |
| `wt-025` | `C:\tmp\pnr-025-four-reading-biochemistry-authority` | 12 |
| `wt-026` | `C:\tmp\pnr-026-uploads-and-evidence-management` | 9 |
| `wt-027` | `C:\tmp\pnr-027-voice-assisted-capture` | 9 |
| `wt-035` | `C:\tmp\pnr-035-first-trainer-access-and-core-journey` | 2 |
| `wt-035d` | `C:\tmp\pnr-035d-builder` | 7 |
| `wt-035l` | `C:\tmp\pnr-035l-magic-link-template-correction` | 13 |
| `wt-012a` | `C:\tmp\pp-012a-clean-20260714-165007` | 1 |
| **Total** |  | **64** |

The exact relative paths and Git blob identifiers remain in `planning/reviews/034D-legacy-worktree-retirement-and-canonical-authority-finalisation.md` and are the copy allowlist.

### Exact copy procedure after approval

1. Re-resolve the canonical root, each source root and the destination. Fail unless the canonical root remains exact and the destination is outside every active/legacy Git worktree.
2. Prove the destination is absent or contains only a prior incomplete 034D attempt that the owner has separately dispositioned. Never overwrite an uncertain archive.
3. Expand only the 64 allowlisted source paths. Reject any missing file, directory, reparse point, protected filename class, blob mismatch or content-safety mismatch.
4. Recompute each source Git blob without writing a Git object and require equality with its Stage 1 blob identifier.
5. Compute source SHA-256, byte count and neutral worktree ID. Do not copy timestamps, ACLs, alternate streams or Git metadata as preservation authority.
6. Copy each file to `safe-uncommitted\<source-id>\<relative-path>` using literal paths. Do not initialise Git and do not copy any `.git`, environment, credential, browser-profile, cache, build or unlisted file.
7. Compute destination SHA-256 and require per-file equality with the source. Require exactly 64 destination files plus one sanitized manifest and no reparse points.
8. Write a sanitized CSV manifest containing source ID, relative path, Stage 1 Git blob, byte count, source SHA-256, destination SHA-256 and equality boolean. No protected values are allowed.
9. Compute the manifest SHA-256 and record only the aggregate count, equality result, destination and manifest hash in the canonical 034D ledger.
10. Leave every source worktree unchanged. Preservation proof alone does not authorize retirement.

### Preservation execution proof

- Destination: `C:\Users\rrank\OneDrive\PNR Precision Performance 034D Archive\safe-uncommitted`.
- Exact allowlist: 64 committed Git blobs mapped one-to-one to 64 source paths with the expected `6/5/12/9/9/2/7/13/1` source distribution.
- Source/destination SHA-256 equality: 64/64.
- Source pre/post SHA-256 equality: 64/64; every source remained unchanged.
- Destination file count: 65, consisting of 64 preserved files plus `034D-safe-uncommitted-manifest.csv`.
- Manifest SHA-256: `50d74ab296d973941cf1cd2d6fdaf887973a083e736d3e7da653b5e7489fe0fe`.
- Destination Git entries: 0. Immediate post-copy reparse entries: 0. A later OneDrive reread showed 104 Microsoft cloud-tagged entries (65 files and 39 directories), with zero link types and zero link targets; all 64 destination hashes and all 64 source hashes remained readable and exact.
- No protected path, protected-content safety finding, cache, build output, browser profile, environment file or unlisted file entered the archive.
- No source, worktree registration, branch, metadata record or legacy directory was changed by preservation.

Rollback for a failed copy is to stop, leave sources untouched, label the incomplete destination as not accepted, and obtain a separate exact disposition before retry or cleanup. No automatic deletion of a partial archive is authorized.

## Private-containment mechanism gate

No executable encrypted destination or operator identity is currently named. The supplied values `[operator name and role]` and `[exact mounted root]` are placeholders, not an identity or absolute path. `7z`/`7zz` is unavailable; unencrypted `tar` is unsuitable. BitLocker management is available, but no exact operator-owned protected volume or vault root has been approved. Protected containment therefore did not execute.

Before private containment, the owner must provide:

- the exact absolute encrypted-vault root on a BitLocker-protected local volume or another approved secure store;
- the authorized human operator/security owner;
- confirmation that the vault is not the safe 64-file archive, a Git repository, a public/shared folder, or a normal evidence location;
- the private recovery/restore procedure and retention owner.

The operator must unlock the vault privately, with credentials and recovery material kept out of commands, chat and evidence. Builder may then perform only literal-path copy/bundle operations approved for the exact target, verify an operator-confirmed private restore, and record sanitized success booleans and target counts. Protected content must not be hashed or enumerated into canonical evidence.

## Exact protected-target actions

| ID | Exact retained target | Required private action before any retirement |
|---|---|---|
| `legacy-root` | `C:\Users\rrank\OneDrive\PNR Precision Performance` | Privately contain the six ignored environment-file path findings and any dependent recovery material; retain the full root until every linked worktree and local-only branch is resolved; retire this root last |
| `wt-023l` | `C:\tmp\pnr-023l-remote-application-and-hosted-proof` | Privately contain the two ignored environment-file path findings; do not copy ignored content into the safe archive |
| `wt-012d` | `C:\tmp\pp-012d-production-baseline` | Privately contain the protected environment/provider findings and both local-only commits; preserve branch reachability; do not push or place this history in the safe archive |
| `local-029f` | legacy local branch `codex/029F-browser-proof-release-and-live-deployment` | Preserve the local-only commit in the encrypted private recovery set because non-placeholder identity metadata failed the external archive boundary; do not push it |
| `dir-029m-cdp` | `C:\tmp\pnr-029m-cdp-profile` | Contain the entire browser profile without traversal or ordinary evidence; operator privately verifies restore capability |
| `dir-029m-chrome` | `C:\tmp\pnr-029m-chrome-profile` | Contain the entire browser profile without traversal or ordinary evidence; operator privately verifies restore capability |
| `dir-029m-live-cdp` | `C:\tmp\pnr-029m-live-cdp-profile` | Contain the entire browser profile without traversal or ordinary evidence; operator privately verifies restore capability |

No source is moved into containment. Containment is copy-only until separate Stage 2 retirement approval.

The approved safe destination is inside OneDrive. After initial proof, OneDrive applied Microsoft cloud reparse tags even though no symbolic-link or junction target exists. This deterministic storage-layer transition does not weaken the copy proof: every preserved file remained directly readable, 64/64 destination hashes still match the manifest, 64/64 source hashes remain unchanged, and the archive still has zero Git entries. Stage 2 must recheck readability/equality rather than treat a targetless OneDrive cloud tag as a source-path redirection.

## Resolved ambiguous unregistered-directory dispositions

Read-only preparation used bounded traversal that did not follow reparse points. It queried 26 unique live remote tips; 25 trees were available in legacy object storage and the missing tree was the newly created canonical 034D checkpoint, which cannot represent older unregistered content. No protected values or matching lines were emitted.

Every previously ambiguous unregistered directory now has one conservative disposition. `Resolved` means the disposition class is decided, not that containment or retirement has executed.

| ID | Exact target | Sanitized evidence | Resolved disposition |
|---|---|---|---|
| `dir-029m-docx-extract` | `C:\tmp\pnr-029m-docx-extract` | 20 OpenXML/extract files, including opaque media and a source ZIP; no canonical DOCX/ZIP hash match was proven | `protected-material-contained-outside-git-then-retire`; contain the complete extract privately because embedded content/metadata is not disclosure-safe |
| `dir-035d-candidate` | `C:\tmp\pnr-035d-candidate-7d12e0d` | 955 non-generated files; `node_modules` reparse point excluded; bounded text scan produced 27 safety-pattern findings and stopped before hashing | `protected-material-contained-outside-git-then-retire`; contain complete source copy privately |
| `dir-035d-manual` | `C:\tmp\pnr-035d-manual-candidate-494d0db` | 958 non-generated files; bounded text scan produced 27 safety-pattern findings and stopped before hashing | `protected-material-contained-outside-git-then-retire`; contain complete source copy privately |
| `dir-035k-validation` | `C:\tmp\pnr-035k-validation` | 1,009 non-generated files after generated exclusions; stale `.git` pointer retained; bounded text scan produced 63 safety-pattern findings and stopped before hashing | `protected-material-contained-outside-git-then-retire`; contain complete validation copy privately and keep shared stale admin metadata untouched |
| `dir-035k-validation-corrected` | `C:\tmp\pnr-035k-validation-corrected` | 1,010 non-generated files after generated exclusions; same stale pointer; bounded text scan produced 66 safety-pattern findings and stopped before hashing | `protected-material-contained-outside-git-then-retire`; contain complete corrected validation copy privately and keep shared stale admin metadata untouched |
| `dir-012c-baseline` | `C:\tmp\pp-012c-baseline-20260714-172850` | 38 non-generated files; provider-metadata, log, binary and unique-file classes remain; 22 path/blob pairs are live-remote represented and 16 are not | `protected-material-contained-outside-git-then-retire`; contain complete historical baseline privately |
| `dir-012c-lean` | `C:\tmp\pp-012c-baseline-lean-20260714-173135` | 126 non-generated files; `node_modules` reparse point excluded; provider metadata and logs remain; 94 path/blob pairs are live-remote represented and 32 are not | `protected-material-contained-outside-git-then-retire`; contain complete lean baseline privately |
| `dir-012d-clean` | `C:\tmp\pp-012d-production-baseline-clean` | 126 non-generated files; `node_modules` reparse point excluded; logs and 32 non-remote files remain; target is coupled to the unsafe 012d lineage and stale admin record | `protected-material-contained-outside-git-then-retire`; contain complete clean-copy candidate privately with the 012d recovery set |
| `dir-012f-source` | `C:\tmp\pp-012f-prod-source-20260716-1328` | 137 non-generated files; provider metadata, logs, binaries and 43 non-remote files remain; 94 path/blob pairs are live-remote represented | `protected-material-contained-outside-git-then-retire`; contain complete historical source privately |

The two empty render directories, one empty deployment directory and two npm-cache directories remain `generated-or-disposable-proven-retire`, subject to exact Stage 2 target guards. Their disposition was already resolved in Stage 1.

## No-retirement gate

No removal may begin until all of the following are true:

1. the exact safe 64-file destination and mechanism are explicitly approved and 64/64 SHA-256 equality is proven — **satisfied**;
2. an exact encrypted private-vault root, operator and restore procedure are approved;
3. every protected target and every directory classified above has completed private containment or an explicitly accepted retain-in-place disposition;
4. the stale 035K metadata/pointer dependency is resolved without broad prune;
5. the final target-by-target manifest contains no `ambiguous`, `pending-disposition`, `unknown`, failed-copy or failed-restore entry;
6. canonical/legacy registrations, branches, remote reachability and filesystem paths are reread immediately before any exact retirement operation; and
7. the owner separately approves the final Stage 2 retirement manifest.

Until then, every legacy target remains retained exactly where it is.

## Final Stage 2 retirement manifest

Every target now has a decided disposition class. There are zero `ambiguous`, `unknown` or `pending-disposition` entries. `Private containment pending` is a resolved disposition with an unexecuted safety dependency; it is not authority to retire the target.

### Legacy-metadata-owned registered targets

| ID | Exact target | Final disposition | Current gate |
|---|---|---|---|
| `legacy-root` | `C:\Users\rrank\OneDrive\PNR Precision Performance` | `protected-material-contained-outside-git-then-retire`; retire root last | Private containment pending |
| `wt-023` | `C:\tmp\pnr-023-test-evidence-uploads` | `non-secret-uncommitted-material-preserved-outside-active-workspace-then-retire` | 6-file preservation satisfied; final Stage 2 approval required |
| `wt-023b` | `C:\tmp\pnr-023b-source-reconciliation` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-023c` | `C:\tmp\pnr-023c-privacy-storage-lifecycle` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-023d` | `C:\tmp\pnr-023d-upload-storage-design` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-023e` | `C:\tmp\pnr-023e-local-upload-storage` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-023j` | `C:\tmp\pnr-023j-provider-remote-storage-and-hosted-proof` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-023l` | `C:\tmp\pnr-023l-remote-application-and-hosted-proof` | `protected-material-contained-outside-git-then-retire` | Private containment pending |
| `wt-023m` | `C:\tmp\pnr-023m-committed-candidate-state-reconciliation` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-023q` | `C:\tmp\pnr-023q-evidence-safety-provider-integration-and-production-readiness` | `non-secret-uncommitted-material-preserved-outside-active-workspace-then-retire` | 5-file preservation satisfied; final Stage 2 approval required |
| `wt-025` | `C:\tmp\pnr-025-four-reading-biochemistry-authority` | `non-secret-uncommitted-material-preserved-outside-active-workspace-then-retire` | 12-file preservation satisfied; final Stage 2 approval required |
| `wt-026` | `C:\tmp\pnr-026-uploads-and-evidence-management` | `non-secret-uncommitted-material-preserved-outside-active-workspace-then-retire` | 9-file preservation satisfied; final Stage 2 approval required |
| `wt-027` | `C:\tmp\pnr-027-voice-assisted-capture` | `non-secret-uncommitted-material-preserved-outside-active-workspace-then-retire` | 9-file preservation satisfied; final Stage 2 approval required |
| `wt-027b` | `C:\tmp\pnr-027b-completed-product-lineage-reconciliation` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-029m` | `C:\tmp\pnr-029m-public-website` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-034` | `C:\tmp\pnr-034-reconciled-product-baseline` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-035` | `C:\tmp\pnr-035-first-trainer-access-and-core-journey` | `non-secret-uncommitted-material-preserved-outside-active-workspace-then-retire` | 2-file preservation satisfied; final Stage 2 approval required |
| `wt-035-preview` | `C:\tmp\pnr-035-preview-source` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-035d` | `C:\tmp\pnr-035d-builder` | `non-secret-uncommitted-material-preserved-outside-active-workspace-then-retire` | 7-file preservation satisfied; final Stage 2 approval required |
| `wt-035l` | `C:\tmp\pnr-035l-magic-link-template-correction` | `non-secret-uncommitted-material-preserved-outside-active-workspace-then-retire` | 13-file preservation satisfied; final Stage 2 approval required |
| `wt-035m` | `C:\tmp\pnr-035m-first-trainer-preview-access-and-core-journey` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-012a` | `C:\tmp\pp-012a-clean-20260714-165007` | `non-secret-uncommitted-material-preserved-outside-active-workspace-then-retire` | 1-file preservation satisfied; final Stage 2 approval required |
| `wt-012d` | `C:\tmp\pp-012d-production-baseline` | `protected-material-contained-outside-git-then-retire` | Private containment pending; local-only history retained |
| `wt-034c` | `C:\tmp\precision-performance-034c` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-035n` | `C:\tmp\precision-performance-035N` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-035o` | `C:\tmp\precision-performance-035O` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-035p` | `C:\tmp\precision-performance-035P` | `safe-history-already-represented-retire` | Final Stage 2 approval required |
| `wt-035q` | `C:\tmp\precision-performance-035Q` | `safe-history-already-represented-retire`; retain live remote branch as alternate non-authoritative history | Final Stage 2 approval required |

### Unregistered targets

| ID | Exact target | Final disposition | Current gate |
|---|---|---|---|
| `dir-029m-cdp` | `C:\tmp\pnr-029m-cdp-profile` | `protected-material-contained-outside-git-then-retire` | Private containment pending; remain dormant |
| `dir-029m-chrome` | `C:\tmp\pnr-029m-chrome-profile` | `protected-material-contained-outside-git-then-retire` | Private containment pending; remain dormant |
| `dir-029m-docx-extract` | `C:\tmp\pnr-029m-docx-extract` | `protected-material-contained-outside-git-then-retire` | Private containment pending |
| `dir-029m-live-cdp` | `C:\tmp\pnr-029m-live-cdp-profile` | `protected-material-contained-outside-git-then-retire` | Private containment pending; remain dormant |
| `dir-029m-docx-render` | `C:\tmp\pnr-029m-source-docx-render` | `generated-or-disposable-proven-retire` | Final Stage 2 approval required |
| `dir-029m-pdf-render` | `C:\tmp\pnr-029m-source-pdf-render` | `generated-or-disposable-proven-retire` | Final Stage 2 approval required |
| `dir-034-npm-cache` | `C:\tmp\pnr-034-npm-cache` | `generated-or-disposable-proven-retire` | Final Stage 2 approval required |
| `dir-035d-candidate` | `C:\tmp\pnr-035d-candidate-7d12e0d` | `protected-material-contained-outside-git-then-retire` | Private containment pending |
| `dir-035d-manual` | `C:\tmp\pnr-035d-manual-candidate-494d0db` | `protected-material-contained-outside-git-then-retire` | Private containment pending |
| `dir-035k-validation` | `C:\tmp\pnr-035k-validation` | `protected-material-contained-outside-git-then-retire` | Private containment and shared stale-pointer dependency pending |
| `dir-035k-validation-corrected` | `C:\tmp\pnr-035k-validation-corrected` | `protected-material-contained-outside-git-then-retire` | Private containment and shared stale-pointer dependency pending |
| `dir-035m-npm-cache` | `C:\tmp\pnr-035m-npm-cache` | `generated-or-disposable-proven-retire` | Final Stage 2 approval required |
| `dir-012c-baseline` | `C:\tmp\pp-012c-baseline-20260714-172850` | `protected-material-contained-outside-git-then-retire` | Private containment pending |
| `dir-012c-lean` | `C:\tmp\pp-012c-baseline-lean-20260714-173135` | `protected-material-contained-outside-git-then-retire` | Private containment pending |
| `dir-012d-clean` | `C:\tmp\pp-012d-production-baseline-clean` | `protected-material-contained-outside-git-then-retire` | Private containment and stale-admin dependency pending |
| `dir-012f-source` | `C:\tmp\pp-012f-prod-source-20260716-1328` | `protected-material-contained-outside-git-then-retire` | Private containment pending |
| `dir-012f-deploy` | `C:\tmp\pp-012f-production-deploy-20260716-1240` | `generated-or-disposable-proven-retire` | Final Stage 2 approval required |

### Stale administration and local-only branches

| ID | Exact target | Final disposition | Current gate |
|---|---|---|---|
| `admin-035k` | legacy Git administration `worktrees/pnr-035k-live-trainer-access` | Prune only after both 035K validation copies complete containment/retirement | Private containment pending; no prune approved |
| `admin-012d` | legacy Git administration `worktrees/pp-012d-production-baseline-clean` | Prune only after `wt-012d` and `dir-012d-clean` complete containment/retirement | Private containment pending; no prune approved |
| `branch-012d` | `codex/012d-production-baseline` | Preserve in private containment; never push unsafe history | Private containment pending; branch retained |
| `branch-029f` | `codex/029F-browser-proof-release-and-live-deployment` | Preserve in private containment; never push protected identity metadata | Private containment pending; branch retained |

No manifest row authorizes removal. The next required input is a real authorized operator identity and exact mounted encrypted-vault root, followed by successful private containment/restore proof and a separate final Stage 2 retirement approval.
