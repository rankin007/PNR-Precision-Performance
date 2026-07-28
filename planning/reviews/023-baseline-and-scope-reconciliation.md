# Sprint 023 - Baseline And Scope Reconciliation

Date: 2026-07-28  
Result: `PASS`

## Isolation And Ancestry

- Sprint 023 branch: `codex/023-test-evidence-uploads-and-storage`.
- Isolated worktree: `C:\tmp\pnr-023-test-evidence-uploads`.
- Exact base/HEAD before Pack application: `a7759f691f0e01482f3a396acd14b2a23dbca5ec`.
- Base commit subject: `Reconcile Sprint 021AH and 022 product baseline`.
- Base parent: accepted Sprint 029M tip `ad9d419bc40f0be2e13aa297535d3d8e5e151625`.
- `git merge-base --is-ancestor ad9d419 a7759f6` passed.
- The isolated worktree began clean. After Pack application, only the four generated Sprint 023 files were untracked.
- Original `develop` remained on `b8961b9647507af87e6887cf78c1d6e262f944b6` with an empty index. The committed 023B worktree remained separate.

## Accepted Product Baseline

The migration ledger contains one ordered file for every version `0001` through `0017`. Required accepted source is present:

- `supabase/migrations/0017_valid_null_safe_authenticated_biochemistry_comment_soft_delete.sql` — SHA-256 `FC208E0E3EE343F802537AB47A0B4009565858CF8F6BFFABCF4DEE6EF945C2A0`.
- `components/ops/biochemistry-capture-workflow.tsx` — `9108D9E006B8E918C46ED372725E1D9FFD41ABADE7A104C1E51EE5A9D32CEF9E`.
- `components/ops/biochemistry-workflow-state.ts` — `AFC96502011AD77DF24C3E327591D2110C108678EBCD2C497909CD1CF686F73F`.
- `scripts/test-biochemistry-workflow-022.mjs` — `71657966DB87E7FFB5A1A5051B0DF5B2CC51E53239136FEA3B7099C2997B56FC`.
- `lib/auth/app-context.ts` — `5F14CC09D76C812B101B928AE6691838701F7CEAAE0F2311EF296538C111050D`.
- `lib/auth/bootstrap.ts` — `9891877891CB0AE47BA6D1205AB8A16774ED3725C67792DD16422F316541AB79`.
- Accepted Sprint 022B review and the 021AH direct/rendered/cleanup evidence are committed and present.

The 023B commit contains the accepted biochemistry actions/page integration and authenticated application/access helpers required by Sprint 023 discovery. No uncommitted 021/022 source is needed.

## Sprint 029M Preservation

Sprint 029M's commit is the direct parent of the clean baseline. Its public page, Pricing page, approved assets, non-submitting enquiry boundary, documentation, tests, and release evidence remain committed. A path comparison from `ad9d419` to `a7759f6` found no changes in the 029M public source or release-evidence paths.

## Scope Result

The Sprint 023 hard baseline gate passes. The Pack format check passed with four sections; dry-run named exactly the four intended sprint files; application and generated-file verification passed. This permits privacy/data decision discovery. It does not itself authorize schema, Storage, server upload, remote work, or production-source editing.

