# Sprint 023F - Migration Hash Validator Portability Correction Acceptance

## Baseline And Root Cause

- [ ] Exact 023E worktree/branch/baseline and controlled dirty manifest are recorded.
- [ ] Index is clean and every existing change maps to approved 023E or applied 023F planning files.
- [ ] Migration `0009` has no Git diff and migrations `0001`–`0018` are otherwise untouched by 023F.
- [ ] Canonical LF hash is exactly `6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9`.
- [ ] Raw CRLF hash is exactly `B5DE360D33C69F21C8967793AFD66CA670A1FA32672AD60E7A47BD72F56982E3`.
- [ ] Deterministic evidence proves line endings alone caused the mismatch.

## Correction Integrity

- [ ] Maintained validator uses strict UTF-8 and canonicalizes CRLF to LF only.
- [ ] Governed expected hash remains `6DD2238D…`; Windows raw hash is not accepted directly.
- [ ] BOM, invalid UTF-8, arbitrary whitespace, lone CR, content and final-newline changes are not hidden.
- [ ] All prior lookup counts and structural assertions remain unchanged.
- [ ] Validator does not depend on Git, branch/commit, OS special-casing, network or new dependencies.
- [ ] No `.gitattributes`, Git configuration, migration, SQL, product or provider change occurs.

## Focused Proof

- [ ] LF and exact CRLF equivalents yield the same canonicalized hash.
- [ ] Their raw hashes differ.
- [ ] SQL character/content mutation fails.
- [ ] Trailing-space mutation fails.
- [ ] Final-newline mutation fails.
- [ ] UTF-8 BOM addition fails.
- [ ] Invalid UTF-8 fails.
- [ ] Lone carriage-return mutation fails.
- [ ] Temporary artifacts are always cleaned.
- [ ] Corrected maintained validator passes against the unchanged Windows checkout.

## Sprint 023E Revalidation

- [ ] Full static suite passes beyond the former migration-hash gate.
- [ ] Focused 023E migration/evidence tests and Sprint 022 regression pass.
- [ ] JSON, domain, role, Supabase self-tests, encoding and design-system checks pass.
- [ ] TypeScript, ESLint and production build pass.
- [ ] Approved-path, dependency, privacy/secret, original-worktree and `git diff --check` checks pass.
- [ ] 023E evidence records exact rerun commands/results and preserves deferred proof boundaries.
- [ ] If all required gates pass, 023E closes `local-upload-storage-implementation-proven-clean` with Sprint 023F supersession recorded.
- [ ] If another gate fails, 023E remains blocked with the exact independent blocker.

## Scope And Closeout

- [ ] Only approved 023F paths were modified by 023F.
- [ ] Four required reviews and planning reconciliation are complete.
- [ ] No staging, commit, branch/worktree creation, migration application, remote operation, provider contact, dependency installation, deployment, push, merge or Sprint 023G work occurs.
- [ ] Remote/provider follow-up is identified as Sprint 023G.
- [ ] `git diff --check` passes.

## Closeout Outcomes

Close with exactly one:

- `validator-portability-corrected-023E-proven-clean`: canonical integrity remains strict, portability tests pass, the full maintained suite passes, and Sprint 023E is reconciled to its clean local-proof outcome.
- `validator-correction-baseline-blocked-clean`: controlled 023E worktree, unchanged migration, root cause or scope inventory cannot be established; validator remains unchanged.
- `validator-correction-validation-blocked-clean`: candidate correction exists but strict mutation/portability tests, maintained validator, scope or integrity checks fail.
- `validator-corrected-downstream-validation-blocked-clean`: validator and focused portability proof pass, but a separate required Sprint 023E gate still fails and is precisely recorded.

No outcome implies any migration was applied, Storage exists remotely, hosted permissions passed, scanning/sanitisation is operational, CSV is enabled, region/recovery is proven, production is ready, combined work is committed, or Sprint 023G has begun.
