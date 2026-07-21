# Sprint 017F Pre-commit Review

## Opening Repository State

- Branch: `develop`.
- Opening HEAD: `171d3aa4186e04c656a50d91b52b1f086f95f89a`.
- Local upstream: `origin/develop`; opening relation ahead 3, behind 0.
- Opening index entries: 0.
- Protected/local roots `.release-main/`, `.claude/`, and the restricted 021M support record remain present and ignored by their exact anchored rules; contents were not inspected.

## Exact Whitespace Repairs

All 28 recorded findings across the 19 authorized files were repaired mechanically: trailing whitespace was removed from the five named Markdown files and excess blank EOF lines were removed from the 14 named files. A SHA-256 comparison of each file after removing all whitespace produced 19/19 identical before/after hashes. No semantic text, SQL, PowerShell, Pack delimiter, checklist state, or line ordering changed. All five affected Architect Packs passed format checks after repair.

The exact path/line/category inventory remains in `planning/reviews/017E-local-baseline-completion-review.md`; no unlisted whitespace file was changed during this repair phase.

## Deterministic JSON Validation

- Created `scripts/validate-json-files.mjs` using UTF-8 reads, initial-BOM removal, and native `JSON.parse` without rewriting files.
- Failure output contains only the affected path and sanitized categories (`invalid JSON syntax`, `file not found`, or `file unreadable`).
- Created `scripts/test-validate-json-files.mjs`; 8 cases pass for object, array, BOM, npm-lockfile-like keys, invalid JSON, missing file, no arguments, spaces/brackets/Unicode paths, and source-content suppression.
- Direct validation passes for `package.json`, `package-lock.json`, `planning/STATUS.json`, and the 017D/017E manifest JSON files.
- One bounded plumbing repair corrected Windows CLI entry-point detection with `fileURLToPath(import.meta.url) === resolve(process.argv[1])`; parsing behavior was unchanged and the suite passed afterward.

One additional bounded formatting repair removed a blank EOF line reported at line 421 of the newly created 017F Pack. Its normalized non-whitespace content remained identical and its Pack check passed afterward. Additional existing candidate files repaired beyond the authorized 19-file set: 0; the Pack is a new 017F artifact.

## Proportionate Governance

`docs/WORKFLOW_PROFILE.md` and `planning/PROJECT_SPRINT_LIST_2026-07-21.md` now state that standard is the ordinary-work default, normal work uses one `SPRINT.md`, useful delivery outcomes are preferred over diagnostic micro-sprints, mechanical issues stay within a sprint when boundaries are preserved, child sprints require material expansion/external blockage/different outcomes, and closeout points to canonical evidence. Strict controls remain explicit for auth/RLS, secrets/protected evidence, migrations, production data, billing, destructive actions, external publication, and production deployment. Architect/Builder, handoff, numbering, manual-intervention, secret, and external-stop rules remain intact.

## Fresh Manifest

`planning/reviews/017F-staging-manifest.json` contains 278 exact candidates, 26 paths edited or created by 017F, and 17 named exclusion categories.

| Group | Paths |
|---|---:|
| application-design | 18 |
| auth-role | 5 |
| database-migrations-verification | 15 |
| validation-scripts-tests | 30 |
| planning-evidence | 200 |
| reference-scaffold | 2 |
| repository-method-config | 8 |

Compared with 017E’s 271 candidates, seven paths were added: the 017E completion review, 017F Pack and applied sprint file, two JSON scripts, and the 017F manifest/review. No 017E candidate was removed. Every current visible non-ignored file is represented exactly once; no candidate is ignored, protected, missing, duplicated, a directory, a wildcard, or an unsupported deletion.

## Exclusions

The manifest excludes environment/protected material, `.release-main/**`, `.claude/**`, restricted 021M evidence, `.next/**`, `build/**`, `node_modules/**`, validation/log directories, Supabase temporary link state, desktop metadata, IDE state, caches, credentials/sessions, protected browser/process material, and generated logs. No exclusion may enter the index.

## Representative Group Review

| Group | Representative | Result |
|---|---|---|
| application-design | `app/page.tsx` | Accepted holding-page baseline; no 017F behavioral edit. |
| auth-role | `lib/auth/role-matrix.ts` | Accepted role contract; no 017F edit or credential content. |
| database-migrations-verification | `supabase/migrations/0012_role_lifecycle_policy_hardening.sql` | Accepted immutable migration; no 017F edit. |
| validation-scripts-tests | `scripts/validate-json-files.mjs` | Dependency-free deterministic parsing and sanitized failures. |
| planning-evidence | `planning/sprints/017F-repository-baseline-completion/SPRINT.md` | Applied single-file handoff matches the validated Pack. |
| reference-scaffold | `references/client-docs/Sprint list 190726.docx` | Expected supplied binary at the accepted path. |
| repository-method-config | `AGENTS.md` | Architect/Builder, handoff, suffix, secret, and manual-intervention rules remain intact. |

## Staged Safety And Validation

Initial and final staged safety results:

- manifest/index equality: 278/278 exact paths;
- unstaged tracked candidates: 0; untracked candidates: 0;
- mandatory exclusions in index: 0;
- staged Pack checks: 27 Architect Packs plus the Pack README candidate checked without failure;
- staged JSON: 7/7 passed with the Node validator;
- high-confidence staged secret scan: 0 findings, with path/category-only output policy;
- unexpected file modes: 0;
- binaries: exactly one, `references/client-docs/Sprint list 190726.docx`;
- `git diff --cached --check`: passed with zero findings after the one allowed 017F Pack EOF repair;
- staged aggregate before Commit 1: 278 files, 37,129 insertions, 165 deletions.

Complete credential-free validation passed:

| Validation | Result |
|---|---|
| Current 017F Pack and every staged Architect Pack | Pass |
| JSON validator self-test | Pass: 8 cases |
| Staged JSON validation | Pass: 7 files, including `package-lock.json` |
| Biochemistry scoring fixtures | Pass |
| Biochemistry recommendation fixtures | Pass |
| Sprint 019 design-system validation | Pass |
| Sprint 020 remote-readiness static validation | Pass |
| Sprint 020C database-audit static validation | Pass |
| Sprint 020E structural-audit static validation | Pass |
| Sprint 020F replacement-audit static validation | Pass |
| Sprint 020G clean-rebuild validation | Pass |
| Sprint 021 role-matrix static validation | Pass |
| Sprint 021 focused role/comment tests | Pass |
| Credential-free `test-supabase-*.mjs` self-tests | Pass: 9 scripts |
| ESLint | Pass: no warnings or errors |
| TypeScript | Pass |
| Production build | Pass on first attempt; 24/24 static pages generated |

No remote/protected execution harness ran. No build retry was required. All 017F changes remain within the exact approved files or bounded non-behavioural remediation allowance.
