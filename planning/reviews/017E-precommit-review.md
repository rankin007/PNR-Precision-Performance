# Sprint 017E Pre-commit Review

## Opening Repository Evidence

- Branch: `develop`.
- Full HEAD: `171d3aa4186e04c656a50d91b52b1f086f95f89a`.
- Upstream: `origin/develop`; local relation: ahead 3, behind 0.
- Opening index entries: 0.
- Visible non-ignored status after creating the Pack outputs and review artifacts: 271 exact file paths.
- Root `.release-main/`, root `.claude/`, and `planning/reviews/021M-supabase-support-escalation.md` exist and are ignored by exact anchored rules at `.gitignore` lines 27–29. Their contents were not opened, printed, hashed, copied, staged, or scanned.

## Validator Reconciliation

- Local migration filenames are exactly one each from `0001` through `0012`, with no later version.
- Expected range changed from `1..10` to `1..12`.
- Matching failure ledger changed from `0001 through 0010` to `0001 through 0012`.
- The validator was already untracked at opening, so no HEAD diff exists. A normalized old/new comparison replacing only those two exact tokens proves two semantic line changes and every other line identical.
- Existing safety assertions remain unchanged.
- Independent command: `powershell -ExecutionPolicy Bypass -File scripts/validate-supabase-clean-rebuild-020G.ps1`.
- Result: exit 0; `Sprint 020G migration, target, and verification safety checks passed.`
- No migration, verification SQL, harness, remote state, or historical evidence changed.

## Manifest Summary

The fresh `planning/reviews/017E-staging-manifest.json` contains 271 candidates and 20 named exclusions:

| Group | Paths |
|---|---:|
| application-design | 18 |
| auth-role | 5 |
| database-migrations-verification | 15 |
| validation-scripts-tests | 28 |
| planning-evidence | 195 |
| reference-scaffold | 2 |
| repository-method-config | 8 |

Compared with 017D, all 263 earlier candidates remain. Eight current additions are the 017D closeout review, the 017E Pack, four applied sprint files, the fresh manifest, and this pre-commit review. No 017D candidate was removed.

Every candidate is an exact existing file path with one approved group, provenance, opening state, and risk. There are no duplicates, wildcards, directory-recursion candidates, ignored paths, protected paths, missing files, or unsupported deletions. JSON and Markdown totals agree.

## Exact Exclusions

The 20 manifest exclusions cover environment files, root local-only boundaries, the restricted 021M support record, generated output and caches, Supabase temporary link state, desktop metadata, logs, IDE state, credentials/tokens/cookies/sessions, and protected browser/process material. No force-add or stage-then-unstage exclusion method is permitted.

## Representative Review Matrix

| Group | Representative | Safe review result |
|---|---|---|
| application-design | `app/page.tsx` | Existing public holding-page change is within the accepted baseline; no 017E edit. |
| auth-role | `lib/auth/role-matrix.ts` | Existing centralized role contract; no credential content and no 017E edit. |
| database-migrations-verification | `supabase/migrations/0012_role_lifecycle_policy_hardening.sql` | Accepted immutable migration 0012 remains present; no 017E edit. |
| validation-scripts-tests | `scripts/validate-supabase-clean-rebuild-020G.ps1` | Exact two-line ledger reconciliation only; independent validator passes. |
| planning-evidence | `planning/sprints/017E-validator-reconciliation-and-local-baseline-completion/requirements.md` | Applied file matches the validated Pack and preserves strict boundaries. |
| reference-scaffold | `references/client-docs/Sprint list 190726.docx` | Expected supplied DOCX at the 017C-approved path; binary content was not reproduced. |
| repository-method-config | `AGENTS.md` | Project operating rules and Builder boundaries remain intact; no 017E edit. |

## Validation Plan

Stage all 271 manifest candidates one at a time with literal pathspecs, prove exact staged equality and exclusions, run Pack/JSON/secret/binary/mode/diff gates, then run the complete credential-free suite specified by the applied requirements. Any failure before Commit 1 triggers exact manifest-only unstaging and a `baseline-blocked-clean` closeout.
