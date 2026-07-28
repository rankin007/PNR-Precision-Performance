# Sprint 023F - Migration Hash Validator Portability Correction Blueprint

## Phase 1 - Controlled Baseline And Root Cause

1. Verify the exact existing 023E worktree, branch, baseline, clean index and controlled dirty manifest.
2. Prove migration `0009` has no Git diff.
3. Compute canonical Git LF, raw Windows CRLF and deterministic LF-to-CRLF hashes.
4. Prove the mismatch is exactly line endings and preserve the governed canonical hash.
5. Verify no unrelated file or external action exists.
6. Apply and verify all four Sprint 023F files in the existing worktree.

Stop before editing if any baseline or root-cause statement is false.

## Phase 2 - Narrow Validator Correction

1. Implement strict UTF-8 reading and CRLF-to-LF-only canonicalization.
2. Hash canonicalized bytes with SHA-256 and compare to `6DD2238D…`.
3. Preserve all other validator expectations and output.
4. Do not use Git/runtime branch state, OS special cases, dual accepted hashes or weakened checks.
5. Inspect the diff to confirm no migration or unrelated validator logic changed.

## Phase 3 - Portability And Mutation Proof

1. Create isolated temporary LF and CRLF synthetic copies.
2. Prove equivalent canonical hash and different raw hashes.
3. Prove content, trailing whitespace, newline, BOM, invalid UTF-8 and lone-CR mutations fail.
4. Prove cleanup in success and failure paths.
5. Run the maintained validator against the unchanged Windows checkout.

## Phase 4 - Full 023E Revalidation

1. Run full static validation past the formerly failing gate.
2. Rerun all focused and maintained 023E gates listed in requirements.
3. Confirm no dependency, secret, approved-path, migration or original-worktree drift.
4. Preserve accurate distinctions between structural/local proof and deferred remote/executable proof.
5. Update only the authorised 023E proof and closeout records.

## Phase 5 - Closeout

1. Produce the four required 023F reviews.
2. Reconcile planning state and next-sprint numbering: remote/provider proof is Sprint 023G.
3. Finish with exactly one allowed outcome.
4. Leave all combined work unstaged and uncommitted unless separately instructed.
5. Do not begin Sprint 023G.
