# Sprint 034D Stage 1 Reconciliation And Retirement Manifest

Date: 2026-08-03.

Stage 1 outcome: `reconciliation-complete-retirement-withheld-protected-and-archive-dependencies-visible`.

This is a sanitized repository-integrity record. No password, token, key, cookie, MFA/recovery material, private URL, environment value, protected personal datum, or reusable authentication artifact is recorded. No legacy worktree, directory, metadata entry, lock, branch, or file was removed, force-removed, pruned, recycled, moved, or deleted.

## Authority and approved boundary

- Canonical workspace and Git top level both resolved to `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.
- Canonical branch: `codex/034D-legacy-worktree-retirement-and-canonical-authority-finalisation`.
- Accepted starting HEAD: `8e923c66909ea47f96e8276e2e54aa5a38d9989c`.
- Live GitHub query proves `codex/034C-delivery-access-and-credential-cleanup` still points exactly to that SHA.
- Stage 1 authorized sanitized read-only reconciliation, canonical records, Sprint 035Q classification, and only safety-qualified remote backup. Stage 2 retirement remains unapproved.

## Git ownership model

The permanent canonical clone has a standalone `.git` directory and exactly one registered worktree: the canonical path itself. It does not own or register any legacy path.

The legacy root at `C:\Users\rrank\OneDrive\PNR Precision Performance` has separate legacy Git metadata. That metadata owns 28 registrations: the legacy root plus 27 `C:\tmp` linked worktrees. These registrations are not canonical registrations and do not make any legacy path authoritative.

Legacy administration contains 29 worktree metadata directories: 27 active linked-worktree records and two absent/prunable records. `git worktree prune --dry-run --verbose` identified only `pnr-035k-live-trainer-access` and `pp-012d-production-baseline-clean` as prunable. No prune occurred. Neither metadata directory currently has a Git `locked` file; both are OneDrive reparse-backed administrative directories and remain untouched.

## Registered legacy worktree manifest

`T/U/I` means tracked-change count / non-ignored untracked-path count / ignored-entry count. Remote proof is from a fresh live `git ls-remote --heads origin` query plus local ancestry against the exact live tip.

| ID | Legacy-metadata-owned target | Branch / HEAD | T/U/I | Live remote recovery proof | Stage 2 disposition and dependency |
|---|---|---|---:|---|---|
| `legacy-root` | `C:\Users\rrank\OneDrive\PNR Precision Performance` | `develop` / `b8961b964750` | 38/422/204 | Contained by live `codex/029M-public-website-content-enquiry-and-pricing-follow-up` `ad9d419bc40f` | `protected-material-contained-outside-git-then-retire`; six ignored environment-file paths require private containment; retire the main legacy root last only after every linked worktree is resolved |
| `wt-023` | `C:\tmp\pnr-023-test-evidence-uploads` | `codex/023-test-evidence-uploads-and-storage` / `a7759f691f0e` | 6/7/0 | Contained by live `codex/023L-remote-application-and-hosted-proof` `6f8543020e12` | 7 paths already remote; 6 verified safe unique files require approved external preservation before exact worktree removal |
| `wt-023b` | `C:\tmp\pnr-023b-source-reconciliation` | `codex/023B-source-reconciliation-and-clean-product-baseline` / `a7759f691f0e` | 0/0/2 | Contained by live 023L tip | `safe-history-already-represented-retire`; ignored entries are generated-cache class |
| `wt-023c` | `C:\tmp\pnr-023c-privacy-storage-lifecycle` | `codex/023C-privacy-storage-and-lifecycle-decision-approval` / `50ee7e133e03` | 0/0/0 | Contained by live 023L tip | `safe-history-already-represented-retire` |
| `wt-023d` | `C:\tmp\pnr-023d-upload-storage-design` | `codex/023D-upload-and-storage-architecture-design` / `a7e2ebd63d84` | 0/0/0 | Contained by live 023L tip | `safe-history-already-represented-retire` |
| `wt-023e` | `C:\tmp\pnr-023e-local-upload-storage` | `codex/023E-local-upload-and-storage-implementation-and-proof` / `ae5470cb79e7` | 0/0/2 | Contained by live 023L tip | `safe-history-already-represented-retire`; ignored entries are generated-cache class |
| `wt-023j` | `C:\tmp\pnr-023j-provider-remote-storage-and-hosted-proof` | `codex/023J-provider-remote-storage-and-hosted-proof` / `fcf818fe3a80` | 0/0/3 | Contained by live 023L tip | `safe-history-already-represented-retire`; ignored entries remain excluded from preservation |
| `wt-023l` | `C:\tmp\pnr-023l-remote-application-and-hosted-proof` | `codex/023L-remote-application-and-hosted-proof` / `6f8543020e12` | 0/0/4 | Exact live 023L tip | `protected-material-contained-outside-git-then-retire`; two ignored environment-file paths require private containment |
| `wt-023m` | `C:\tmp\pnr-023m-committed-candidate-state-reconciliation` | `codex/023M-committed-candidate-state-reconciliation` / `a15d89b2f953` | 0/0/0 | Contained by live 023L tip | `safe-history-already-represented-retire` |
| `wt-023q` | `C:\tmp\pnr-023q-evidence-safety-provider-integration-and-production-readiness` | `codex/023Q-evidence-safety-provider-integration-and-production-readiness` / `6f8543020e12` | 0/5/0 | Exact live 023L tip contains HEAD | 5 verified safe unique planning files require approved external preservation before removal |
| `wt-025` | `C:\tmp\pnr-025-four-reading-biochemistry-authority` | `codex/025-four-reading-biochemistry-authority` / `6f8543020e12` | 10/9/2 | Exact live 023L tip contains HEAD | 7 paths already remote; 12 verified safe unique files require approved external preservation |
| `wt-026` | `C:\tmp\pnr-026-uploads-and-evidence-management` | `codex/026-uploads-and-evidence-management` / `6f8543020e12` | 15/9/2 | Exact live 023L tip contains HEAD | 15 paths already remote; 9 verified safe unique files require approved external preservation |
| `wt-027` | `C:\tmp\pnr-027-voice-assisted-capture` | `codex/027-voice-assisted-capture` / `6f8543020e12` | 11/7/0 | Exact live 023L tip contains HEAD | 9 paths already remote; 9 verified safe unique files require approved external preservation |
| `wt-027b` | `C:\tmp\pnr-027b-completed-product-lineage-reconciliation` | `codex/032-public-relaunch-production` / `f7242ee0785a` | 0/0/3 | Exact live 032 tip | `safe-history-already-represented-retire` |
| `wt-029m` | `C:\tmp\pnr-029m-public-website` | `codex/029M-public-website-content-enquiry-and-pricing-follow-up` / `ad9d419bc40f` | 0/0/5 | Exact live 029M tip | `safe-history-already-represented-retire` |
| `wt-034` | `C:\tmp\pnr-034-reconciled-product-baseline` | `codex/035C-trainer-participation-and-final-mvp-acceptance` / `819f09add752` | 0/0/4 | Exact live 035C tip | `safe-history-already-represented-retire` |
| `wt-035` | `C:\tmp\pnr-035-first-trainer-access-and-core-journey` | `codex/035-first-trainer-access-and-core-journey` / `3d58b373fd1c` | 1/1/0 | Exact live 035-first tip | 2 verified safe unique planning files require approved external preservation |
| `wt-035-preview` | `C:\tmp\pnr-035-preview-source` | detached / `36a87ce341c7` | 0/0/1 | One commit behind live 035-first tip | `safe-history-already-represented-retire` |
| `wt-035d` | `C:\tmp\pnr-035d-builder` | `codex/035J-operator-only-oauth-enrollment-and-protected-authentication-acceptance` / `fe27561e7452` | 0/7/3 | Exact live 035I tip contains HEAD | 7 verified safe unique planning/script files require approved external preservation |
| `wt-035l` | `C:\tmp\pnr-035l-magic-link-template-correction` | `codex/035L-magic-link-template-correction-and-human-reacceptance` / `3d58b373fd1c` | 7/6/1 | Exact live 035-first tip | 13 verified safe unique planning files require approved external preservation |
| `wt-035m` | `C:\tmp\pnr-035m-first-trainer-preview-access-and-core-journey` | `codex/035M-first-trainer-preview-access-and-core-journey` / `143f03344561` | 0/0/2 | Exact live 035M tip | `safe-history-already-represented-retire` |
| `wt-012a` | `C:\tmp\pp-012a-clean-20260714-165007` | detached / `8bf310acba10` | 1/0/3 | Contained by live `codex/029-marketing-preview-release` | 1 verified safe unique source file requires approved external preservation |
| `wt-012d` | `C:\tmp\pp-012d-production-baseline` | `codex/012d-production-baseline` / `358e1fcdd0c1` | 0/0/12 | Not reachable from any live remote tip | `protected-material-contained-outside-git-then-retire`; two local-only commits failed the archive safety gate and remain preserved locally |
| `wt-034c` | `C:\tmp\precision-performance-034c` | `codex/034C-delivery-access-and-credential-cleanup` / `8e923c66909e` | 0/0/0 | Exact live 034C tip | `safe-history-already-represented-retire`; exact clean duplicate of accepted starting authority |
| `wt-035n` | `C:\tmp\precision-performance-035N` | `codex/035N-exact-preview-callback-and-trainer-acceptance` / `edff01c957f2` | 0/0/2 | Two commits behind live 035P tip | `safe-history-already-represented-retire` |
| `wt-035o` | `C:\tmp\precision-performance-035O` | `codex/035O-callback-ownership-reconciliation-and-trainer-acceptance` / `63d72c4ab535` | 0/0/2 | One commit behind live 035P tip | `safe-history-already-represented-retire` |
| `wt-035p` | `C:\tmp\precision-performance-035P` | `codex/035P-authorised-callback-disposition-and-trainer-acceptance` / `1f03578a4e53` | 0/0/1 | Exact live 035P tip | `safe-history-already-represented-retire` |
| `wt-035q` | `C:\tmp\precision-performance-035Q` | `codex/035Q-specific-error-summary-contract-and-trainer-acceptance` / `954438dd34d3` | 0/0/0 | Exact live 035Q tip | `safe-history-already-represented-retire`; retain remote branch as non-authoritative alternate history |

## Sprint 035Q alternate-lineage classification

- HEAD and live remote ref both equal `954438dd34d3d91ec3e0cd62868e912acc568e44`.
- Merge base with accepted Sprint 034C is `d949069834c375ce4b485a4336eb701944b2d984`.
- Relative to accepted 034C, the lineage is 62 commits behind and 9 commits ahead.
- The nine alternate commits are `ea8417d3`, `9d7f1f19`, `b1bf770d`, `143f0334`, `edff01c9`, `63d72c4a`, `1f03578a`, `ad324f6b`, and `954438dd`.
- Sanitized inspection records 109 changed-path occurrences: planning/closeout material plus bounded product-source/test and configuration changes. No protected path or high-confidence added-secret/provider-material finding was produced, and connectivity passed.
- The branch is safe, already remote backed, retained, and explicitly non-authoritative. Nothing from it was merged, cherry-picked, rebased, replayed, or adopted.

## Unregistered directory manifest

These paths are not canonical registrations and are not among the 28 active legacy-metadata registrations.

| ID | Exact target | Sanitized state | Stage 2 disposition/dependency |
|---|---|---|---|
| `dir-029m-cdp` | `C:\tmp\pnr-029m-cdp-profile` | 34 top-level entries; no Git marker | Protected browser-profile class; no traversal; private containment required |
| `dir-029m-chrome` | `C:\tmp\pnr-029m-chrome-profile` | 34 top-level entries; no Git marker | Protected browser-profile class; no traversal; private containment required |
| `dir-029m-docx-extract` | `C:\tmp\pnr-029m-docx-extract` | 20 files, including 7 binary/rendered; no Git marker | Generated/source-extract candidate; content disposition remains ambiguous, so retirement is withheld |
| `dir-029m-live-cdp` | `C:\tmp\pnr-029m-live-cdp-profile` | 38 top-level entries; no Git marker | Protected browser-profile class; no traversal; private containment required |
| `dir-029m-docx-render` | `C:\tmp\pnr-029m-source-docx-render` | Empty; no Git marker | `generated-or-disposable-proven-retire` after exact Stage 2 path guard |
| `dir-029m-pdf-render` | `C:\tmp\pnr-029m-source-pdf-render` | Empty; no Git marker | `generated-or-disposable-proven-retire` after exact Stage 2 path guard |
| `dir-034-npm-cache` | `C:\tmp\pnr-034-npm-cache` | Generated npm-cache class; 3 top-level entries; no Git marker | Generated-cache candidate; retirement withheld until exact Stage 2 guard |
| `dir-035d-candidate` | `C:\tmp\pnr-035d-candidate-7d12e0d` | 955 non-generated-inventory files; one top-level reparse entry; no Git marker | Source/deployment copy; duplicate/content disposition remains ambiguous |
| `dir-035d-manual` | `C:\tmp\pnr-035d-manual-candidate-494d0db` | 958 non-generated-inventory files; no Git marker | Source/deployment copy; duplicate/content disposition remains ambiguous |
| `dir-035k-validation` | `C:\tmp\pnr-035k-validation` | 1,010 non-generated-inventory files; `.git` is a stale pointer to legacy admin `pnr-035k-live-trainer-access` | Unregistered validation copy; content disposition remains ambiguous; do not prune shared stale admin metadata |
| `dir-035k-validation-corrected` | `C:\tmp\pnr-035k-validation-corrected` | 1,011 non-generated-inventory files; same stale pointer as above | Unregistered validation copy; content disposition remains ambiguous; do not prune shared stale admin metadata |
| `dir-035m-npm-cache` | `C:\tmp\pnr-035m-npm-cache` | Generated npm-cache class; 3 top-level entries; no Git marker | Generated-cache candidate; retirement withheld until exact Stage 2 guard |
| `dir-012c-baseline` | `C:\tmp\pp-012c-baseline-20260714-172850` | 38 non-generated-inventory files; no Git marker | Historical source candidate; duplicate/content disposition remains ambiguous |
| `dir-012c-lean` | `C:\tmp\pp-012c-baseline-lean-20260714-173135` | 126 non-generated-inventory files; one top-level reparse entry; no Git marker | Historical source candidate; duplicate/content disposition remains ambiguous |
| `dir-012d-clean` | `C:\tmp\pp-012d-production-baseline-clean` | 126 non-generated-inventory files; one top-level reparse entry; no Git marker | Historical source candidate; content disposition remains ambiguous; separate stale admin record remains untouched |
| `dir-012f-source` | `C:\tmp\pp-012f-prod-source-20260716-1328` | 137 non-generated-inventory files; no Git marker | Historical source candidate; duplicate/content disposition remains ambiguous |
| `dir-012f-deploy` | `C:\tmp\pp-012f-production-deploy-20260716-1240` | Empty; no Git marker | `generated-or-disposable-proven-retire` after exact Stage 2 path guard |

## Local-only commit backup gate

All 39 local branches in legacy Git metadata were compared against every fresh live remote tip. Only two local branches contain commits absent from all live remote history.

| Local branch | Unique history | Sanitized safety result | Result |
|---|---|---|---|
| `codex/012d-production-baseline` | `8a0d22bb1536eefa4b2a8495b331b2f86248b966`, `358e1fcdd0c1950bd622fd9c56e874104caee1f6` | Tree contains one protected environment-file path, seven high-confidence secret/provider-material matches, and four non-placeholder commit identity fields; connectivity passes | Safety gate failed; no archival branch was created or pushed; retain branch/worktree for private containment |
| `codex/029F-browser-proof-release-and-live-deployment` | `d79ace238b0e115661e58d9124da0903e22aefca` | No protected path, generated path, added secret/provider-material, or added non-example email match; two non-placeholder commit identity fields remain | Safety gate failed under the protected-personal-data boundary; no archival branch was created or pushed; retain local branch |

No genuinely unique commit passed every safety condition, so Stage 1 made no remote push. Existing live remote branches were not changed.

## Verified safe non-secret uncommitted material

Nine dirty worktrees contain 64 byte-unique files that are not represented by path/blob in any fresh live remote tip. They passed protected-path, high-confidence secret/provider-material, and non-example email scans. Another 47 dirty paths are already represented in live remote trees.

| Worktree | Safe unique files | Git blob manifest |
|---|---:|---|
| `wt-023` | 6 | `planning/ARCHITECT_BRIEFING.md@6aa1fe915b84c6f64cca974276d5ad178a93fa31`; `planning/EVIDENCE_INDEX.md@056c1ec9f0db14bd753b30ff7613ed2f8bc7c3f7`; `planning/QUESTIONS.md@2d7b433c946f8c5d72efa930ccc00942f9114792`; `planning/SPRINT_SCHEDULE.md@922452a9a26b04aaa4abc6324018bf2a74b8b234`; `planning/STATE.md@edaa2705735fcc0df816fcab5c2f2f0352d44b52`; `planning/STATUS.json@2a3a8a7b8f4597b253b7869a4ed36c76a4475d20` |
| `wt-023q` | 5 | `planning/reviews/023Q-provider-decision-and-contract.md@6ca675838e3d8b9cc1e3d491e585986bf0886c1b`; four generated sprint files at blobs `85f3f7ad9ff7e8396266d24de9ed4cd29ffc2228`, `48bbcb14c3f6826f723e7ec0408ddf73745743a5`, `1fdcaea1e462c54252e7af52e4f5968e30250da8`, `b92bfea01a0dc6bfbbe05321edfbf0db4050cacd` |
| `wt-025` | 12 | `docs/SPRINT_025_BIOCHEMISTRY_DOMAIN_AUTHORITY.md@e69662a3152ed1aae01ba8201cf06d4170b22660`; planning blobs `b3c232cedc7058b20e6aa30b31947f9080b99154`, `8424be4c164c95e3b003744284d52a4a04c548c2`, `f32c5685b2fdab6ec499bdec4c0c2c9dc0e2b99d`, `edcff3b5ccdfd3009981534af77367352562ade1`, `ca8b093fe4791d12176ed41178127f0ee4079717`, `7a089df97373f5d2d3a2037753ad76ae16238272`, `f42de48c322e4b0ed542175ffb5fa2ecaa155a30`, `aa29669115f3b67da16bc507ed66b8b84876db2d`, `5e95c61934f0f4a85416ed7d1b9a1d61f017b327`, `505d0088b0bca773c79090d36bcb0123020ec948`; `scripts/run-validation-suite.mjs@d3f4c1cfd8c5b6b0d372ce5d0edbe44ffd2cb1e3` |
| `wt-026` | 9 | `package.json@652d3d22dabafbbe69a3d4f0c578faf0373ab6a1`; planning blobs `fabcae806b5dfa7f6a076c5f9b1e7385d7d9c736`, `ea53e35cae94d14f93c534dac259bdd0a3d27254`, `32490a4642cb542701352a137ab0edcfa3117c69`, `479e24a57ff14c2c4e9aea122f05fdfec04a08e1`, `b39f35614689e6b4b9d44f7800865294191db54a`, `34f8c99184f726e4d35e4274b9aee6e423aa5dc6`, `eee57d10ebe588d201a02b40175ee6ad650acd5c`; `scripts/run-validation-suite.mjs@c367a2aab2f44cf45fa7531d44f27d8a4e79d92f` |
| `wt-027` | 9 | `package.json@b6ae0fca0db88a6fa648383f517fb1086fdc406b`; planning blobs `f537fbe80a9472b762246b4e8bca8b22c2745b2e`, `df2e53565bbec506cf39b6f8e44582994692fcdf`, `fe51f1d51ae92ec8e9c9f6f8ae9c48589cd12042`, `ba92c81c9db603f2f37a372463f9cc475a6c845a`, `45947df31228d4c8fbd589bd936eaf274e593561`, `4976f0cecfa427ae7f784f131dc41276269c305b`, `d25aee2584554c65ffa1123fb222c12b2b2ed8a9`; `scripts/run-validation-suite.mjs@eca80b6daaf5cdcf1c7f4d68a5d583ae0c19ac5a` |
| `wt-035` | 2 | `planning/architect-packs/architect-pack-035L-magic-link-template-correction-and-human-reacceptance.md@d9f4f3f67908152c6a4d32f983cd220ec7db5b1c`; `planning/STATUS.json@76e5ec5ebceba81fa183ee7f21ac2995c813e2d4` |
| `wt-035d` | 7 | 035J Pack/sprint blobs `5b448c2bd5638e151df3533b0b479b33f2b8a373`, `9294c1bb854d9c91bd8252a0786762c7c309b19d`, `ebafa846b5d49e2ea3955ad2ee21d1237fb7bedf`, `2365c024aabd4fbdb903c8c16c12f5eb1f7b4a83`, `26566439cdb436283e4963e15dc83cc9c21b5304`; script blobs `6c5c26a53d92254f7ec74c592760da96e7d23d88`, `2fa6714e640acd6af47b9daa009420f5bbbcd56b` |
| `wt-035l` | 13 | planning blobs `5b197486b95c39eee6e80d4401a3fdd1feee32e2`, `dd45f2c1bd584d096103bed1ef9c793a6f2c717f`, `d0248a57a82ad7bd60519068e7a8696e32d95a32`, `51eba3dc947d1073d07f217248fb71de303c379a`, `51b06c606b272e5cd3632dfb9e2fdc71355f7291`, `cfd7b151c55b408aa143821381552f2121fa1e12`, `c9d4f4df3d33b42af10a8b7011d90519d5d2fc95`, `4103452f19ecfc8c719f15ceee2bc084ef876d7b`, `cc969d2a2f6a9450441a190c1ee569f3def0a9a4`, `096cf15debaa0c480af0cad53c082de11e873916`, `e6102efaec6f1b7289ed9986a4f1d53491a3f4e8`, `ab8615091b629fc96f85e5dac4c3e8aad75aa784`, `0d05537e6cf7b92db511101b03f89f5a6e5b012a` |
| `wt-012a` | 1 | `app/api/checkout/route.ts@9ea5d25a12e701075c5ffcbcc73a2560787295a2` |

The proposed destination was `C:\Users\rrank\OneDrive\PNR Precision Performance 034D Archive`. The execution safety reviewer rejected the 64-file copy because heuristic scans could not conclusively authorize disclosure to the sibling folder. No workaround was attempted. The archive path remains absent, every source file remains in place, and these nine worktrees must not be retired until an approved preservation mechanism completes with source/destination SHA-256 equality.

## Exact Stage 2 retirement sequence

1. Resolve the protected-material containment decision for `legacy-root`, `wt-023l`, `wt-012d`, `dir-029m-cdp`, `dir-029m-chrome`, and `dir-029m-live-cdp`. No content is to be pasted into chat or Git.
2. Approve and complete a safe preservation mechanism for the 64-file manifest above, or expressly decide to retain the nine source worktrees instead. Verify SHA-256 equality before any retirement.
3. Resolve the ambiguous unregistered source/extract candidates. Empty render/deploy directories and generated-cache candidates may proceed only after exact target revalidation.
4. Retire exact registered `C:\tmp` worktrees one at a time with supported Git worktree operations. Re-read registration, directory, branch reachability and metadata after each operation.
5. Handle the two stale admin records only after their dependent unregistered directories are resolved. No broad prune is permitted.
6. Remove local branches only after live remote reachability or a separately accepted protected/disposable decision. Retain remote 035Q as alternate history.
7. Retire the legacy OneDrive main root last, after every linked worktree, unique file, local-only commit, protected item and recovery dependency has a completed disposition.
8. Only then correct current authority to Sprint 034D closed, run final integrity/validation, commit the scoped canonical changes, push the scoped branch and prove exact local/remote equality.

## Stage 1 mutation and non-mutation record

- Created the applied four-file Sprint 034D planning handoff and this canonical review/ledger.
- Updated canonical current-authority records only.
- Queried live GitHub branch tips read-only.
- Made no remote push because no local-only commit passed every safety condition.
- Made no external archive because the copy request was rejected before execution.
- Made no product, test, script, schema, migration, Auth/RLS, trainer identity, provider, deployment, DNS, billing, data or public-content change.
- Made no legacy filesystem or legacy Git metadata mutation of any kind.

## Stage 1 recovery proof

- Final non-mutation reread proved one canonical registration, 28/28 legacy-metadata registrations still present, 29 legacy administration records still present, 17/17 unregistered targets still present, and 39 legacy local branches still present.
- The first sandboxed final-audit Git call refused the legacy root because of Git's dubious-ownership guard. A command-local `safe.directory` override supplied equivalent read-only proof without changing global or repository configuration; the two expected stale records remained the only dry-run prune results.
- Canonical and legacy `git fsck --full --no-progress` both exited zero. The legacy scan reported informational unreachable/dangling output only; no connectivity failure occurred.
- Pack dry-run reported exactly four generated targets, and direct normalized-content comparison proved all four generated files exactly match their Pack sections.
- Repository validation passed: 2/2 JSON groups, 8/8 maintained static groups including encoding across 980 maintained text files, TypeScript, ESLint and production build.
- Deterministic non-regression passed 101/101 checks: 89 Sprint 035K assertions and 12 Sprint 032 public controls.
- Exact 18-file changed/untracked scan found zero protected paths, generated paths, product/source/test/script paths, private-key signatures, JWTs, credential URLs, secret assignments or non-example email addresses. The staged set is empty, 17 actionable added repository-path references resolve, and `git diff --check` passes.
- The first checkpoint commit attempt stopped before commit creation because no Git author identity was configured in the sandbox. The retry uses the accepted 034C base commit's existing identity as command-local author/committer values without displaying it or changing repository/global Git configuration.

- Canonical accepted Stage 1 base remains `8e923c66909ea47f96e8276e2e54aa5a38d9989c`; the complete scoped Stage 1 checkpoint is approved for intentional commit and remote backup on the Sprint 034D branch only.
- Twenty-seven of 28 registered legacy HEADs are reachable from fresh live remote tips.
- Sprint 035Q local, tracking and live remote SHAs are exact.
- Both unsafe local-only histories remain reachable from their original local branches and worktrees; neither was rewritten or deleted.
- All 64 verified safe unique files remain byte-preserved at their original paths and have Git blob identifiers above.
- Every retirement target, stale metadata entry and branch remains present because Stage 2 is withheld.

## Stage 2 execution addendum - 2026-08-03

The Stage 1 sections above remain the historical pre-retirement ledger. After safe preservation and private containment/restore proof completed, the owner explicitly approved the exact final 49-row manifest in `planning/reviews/034D-stage-2-containment-preservation-and-disposition-plan.md`.

Builder executed 27 linked worktrees, 17 unregistered directories, two dependent stale administration records, two protected local refs and the legacy OneDrive root individually in recorded dependency order. The root was last. Every transaction re-resolved its exact absolute target and reread registration, filesystem, branch, metadata and recovery state. No broad prune, blanket deletion, history rewrite or force-push ran.

Final sanitized proof:

- 45/45 recorded filesystem targets are absent;
- zero legacy registrations and zero legacy worktree-administration directories remain;
- the two protected local refs are absent after private-bundle re-verification and expected-old-tip compare-and-swap deletion;
- all 37 retained non-protected legacy local branch tips were live-remote-reachable immediately before legacy-root retirement;
- exactly one canonical registration remains and its metadata was not mutated;
- the safe archive remains 64/64 SHA-256 exact, with 65 files, zero Git entries and zero linked reparse targets;
- the accepted encrypted-vault `C` and `R` sets remain 15/15 target sets and 29,897/29,897 files with exact recorded bytes;
- both private bundles remain byte-equal, Git-verified and contain exactly the two expected heads;
- Sprint 035Q remains exact on its live remote branch; the pre-existing divergent remote 029F branch remains distinct from the protected local history and was not changed;
- the accepted vault set, private manifest and unaccepted partial attempt remain retained and untouched; and
- no product, provider, Auth, deployment, DNS, data, billing or production mutation occurred.

Git worktree removal sometimes left targetless OneDrive-tagged administration directories after the registration was already gone. Builder proved the exact registration absent before removing only that exact unlocked metadata directory. Reparse-bearing rows used no-follow handling. The first legacy-root residual pass timed out after `.git` had already gone; a tested compiled reparse-tag-aware walker then completed only the exact remaining root without traversing junction or symbolic-link targets, followed by full physical and recovery reconciliation.
