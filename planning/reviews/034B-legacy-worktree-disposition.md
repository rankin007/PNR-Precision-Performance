# Sprint 034B Legacy Worktree Disposition

Sanitized Git metadata only. No environment values, credentials, mailbox material, record contents, generated-cache contents, or uncertain file contents were inspected or copied.

## Canonical authority

| Path | Branch | HEAD | Git identity | Disposition |
|---|---|---|---|---|
| `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical` | `codex/034B-canonical-workspace-and-mission-control-realignment` | `47d1df447e819b8ec31aaa085a0ff6aeff6e7e8b` | Standalone `.git`; one registered worktree | Sole active workspace; preserve |

## Registered legacy worktrees preserved

`Remote reachable` means the recorded HEAD is contained by at least one local `origin/*` tracking ref. It is not a new fetch or a claim that the named branch itself was recently pushed.

| Path | Branch | HEAD | Cleanliness | Remote reachable | Disposition |
|---|---|---|---|---|---|
| `C:\Users\rrank\OneDrive\PNR Precision Performance` | `develop` | `b8961b9647507af87e6887cf78c1d6e262f944b6` | Dirty; 318 status entries / 409 untracked files | yes | Preserve dirty/divergent legacy root |
| `C:\tmp\pnr-023-test-evidence-uploads` | `codex/023-test-evidence-uploads-and-storage` | `a7759f691f0e01482f3a396acd14b2a23dbca5ec` | Dirty; 10 / 7 | yes | Preserve |
| `C:\tmp\pnr-023b-source-reconciliation` | `codex/023B-source-reconciliation-and-clean-product-baseline` | `a7759f691f0e01482f3a396acd14b2a23dbca5ec` | Clean; 0 / 0 | yes | Preserve |
| `C:\tmp\pnr-023c-privacy-storage-lifecycle` | `codex/023C-privacy-storage-and-lifecycle-decision-approval` | `50ee7e133e03b82c5f4f14cc296f6d29cf3f74ca` | Clean; 0 / 0 | yes | Preserve |
| `C:\tmp\pnr-023d-upload-storage-design` | `codex/023D-upload-and-storage-architecture-design` | `a7e2ebd63d84353d7a18a0b3d4af7936469913c3` | Clean; 0 / 0 | yes | Preserve |
| `C:\tmp\pnr-023e-local-upload-storage` | `codex/023E-local-upload-and-storage-implementation-and-proof` | `ae5470cb79e7f41f7a8ce30a7ce07e2c796897a9` | Clean; 0 / 0 | yes | Preserve |
| `C:\tmp\pnr-023j-provider-remote-storage-and-hosted-proof` | `codex/023J-provider-remote-storage-and-hosted-proof` | `fcf818fe3a8001b12941adc9dd121c6dbe8c002f` | Clean; 0 / 0 | yes | Preserve |
| `C:\tmp\pnr-023l-remote-application-and-hosted-proof` | `codex/023L-remote-application-and-hosted-proof` | `6f8543020e126a4620f09be017744dcc75061e6e` | Clean; 0 / 0 | yes | Preserve |
| `C:\tmp\pnr-023m-committed-candidate-state-reconciliation` | `codex/023M-committed-candidate-state-reconciliation` | `a15d89b2f95382d77a3f3ed450e1f4f16f254b51` | Clean; 0 / 0 | yes | Preserve |
| `C:\tmp\pnr-023q-evidence-safety-provider-integration-and-production-readiness` | `codex/023Q-evidence-safety-provider-integration-and-production-readiness` | `6f8543020e126a4620f09be017744dcc75061e6e` | Dirty; 2 / 5 | yes | Preserve |
| `C:\tmp\pnr-025-four-reading-biochemistry-authority` | `codex/025-four-reading-biochemistry-authority` | `6f8543020e126a4620f09be017744dcc75061e6e` | Dirty; 16 / 9 | yes | Preserve |
| `C:\tmp\pnr-026-uploads-and-evidence-management` | `codex/026-uploads-and-evidence-management` | `6f8543020e126a4620f09be017744dcc75061e6e` | Dirty; 21 / 9 | yes | Preserve |
| `C:\tmp\pnr-027-voice-assisted-capture` | `codex/027-voice-assisted-capture` | `6f8543020e126a4620f09be017744dcc75061e6e` | Dirty; 15 / 7 | yes | Preserve |
| `C:\tmp\pnr-027b-completed-product-lineage-reconciliation` | `codex/032-public-relaunch-production` | `f7242ee0785ae9b87022394206c89ebdd5c9f6ad` | Clean; 0 / 0 | yes | Preserve |
| `C:\tmp\pnr-029m-public-website` | `codex/029M-public-website-content-enquiry-and-pricing-follow-up` | `ad9d419bc40f0be2e13aa297535d3d8e5e151625` | Clean; 0 / 0 | yes | Preserve |
| `C:\tmp\pnr-034-reconciled-product-baseline` | `codex/035C-trainer-participation-and-final-mvp-acceptance` | `819f09add752a64dbf10213f3d481ad3132da9e9` | Clean; 0 / 0 | yes | Preserve |
| `C:\tmp\pnr-035d-builder` | `codex/035J-operator-only-oauth-enrollment-and-protected-authentication-acceptance` | `fe27561e7452909e588182ac1e47155882fc0c8c` | Dirty; 4 / 7 | yes | Preserve |
| `C:\tmp\pp-012a-clean-20260714-165007` | detached | `8bf310acba101db0415b0a1d18a02e724b9e6574` | Dirty; 1 / 0 | yes | Preserve |
| `C:\tmp\pp-012d-production-baseline` | `codex/012d-production-baseline` | `358e1fcdd0c1950bd622fd9c56e874104caee1f6` | Clean; 0 / 0 | no | Preserve; unique reachability risk |

## Exact 035K duplicate removal

Before removal, `C:\tmp\pnr-035k-live-trainer-access` was a registered legacy worktree on `codex/035K-live-trainer-access-and-human-acceptance` at exact SHA `47d1df447e819b8ec31aaa085a0ff6aeff6e7e8b`, with zero status entries and zero non-ignored untracked files. The canonical clone was standalone. The connected GitHub comparison reported the remote 035K branch identical to the exact SHA, ahead 0 and behind 0.

Git's non-force `worktree remove` removed the exact directory and it no longer appears in `git worktree list`. Git could not delete the remaining legacy metadata directory because of a permission/lock boundary. Git reports that already-absent metadata as prunable; no manual deletion was attempted. Directory removal is complete and stale metadata cleanup is deferred.

## Already-absent registration pruning

| Path | Recorded branch / state | Recorded HEAD | Result |
|---|---|---|---|
| `C:\Users\rrank\AppData\Local\Temp\pnr-029f-release-branch` | `codex/029F-browser-proof-release-and-live-deployment` | `d79ace238b0e115661e58d9124da0903e22aefca` | Git-confirmed absent/prunable; registration pruned |
| `C:\Users\rrank\AppData\Local\Temp\pnr-029i-worktree-20260724182400` | detached | `3c828eeb24bb1ef8176a6ce905fbe75cc13b2566` | Git-confirmed absent/prunable; registration pruned |
| `C:\Users\rrank\AppData\Local\Temp\pnr-029j-release-worktree-20260724210200` | detached | `14bc568af4dd7491cdcea7c7739be44ea29bf525` | Git-confirmed absent/prunable; registration pruned |
| `C:\tmp\pp-012d-production-baseline-clean` | `codex/012d-production-baseline-clean` | zero/unborn record | Already absent and Git-confirmed prunable; locked metadata cleanup deferred |

## Safety result

- No recursive deletion, manual copy, reset, restore, branch deletion, broad glob or uncertain-content read occurred.
- The dirty legacy root and every other registered worktree/directory remain preserved.
- Cleanup classification: exact 035K directory removal completed; two locked stale metadata directories safely deferred.
