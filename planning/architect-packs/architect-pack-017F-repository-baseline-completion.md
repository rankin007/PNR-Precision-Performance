# Architect Pack 017F — Repository Baseline Completion

Created: 2026-07-22
Workflow profile: standard with strict boundaries for protected material and external actions
Architect outcome: Builder handoff to finish the local repository baseline in one sprint.

============================================================
FILE: planning/sprints/017F-repository-baseline-completion/SPRINT.md
============================================================

# Sprint 017F — Repository Baseline Completion

## Role And Working Method

Builder executes this sprint under the `standard` workflow profile with strict boundaries only for secrets, protected evidence, auth/RLS, migrations, billing, destructive actions, remote systems, and production.

This is the final planned local repository-control sprint. Ordinary mechanical problems discovered while completing the baseline must be resolved inside 017F when they remain within the remediation allowance below. Do not create another child sprint for whitespace, encoding, deterministic JSON parsing, formatting, local validation plumbing, manifest reconciliation, or equivalent non-behavioural work.

Architect created this Pack only. Builder applies it, verifies this single `SPRINT.md`, and executes from the applied file.

## Context

Sprints 017B–017E established:

- complete repository classification;
- local-only treatment for `.release-main/` and `.claude/`;
- reference/scaffold treatment for `samples/README.md` and the relocated Sprint-list DOCX;
- exact exclusion of the restricted 021M Supabase escalation record;
- correction of the local clean-rebuild validator from migrations `0001`–`0010` to `0001`–`0012`;
- a verified 271-path staging manifest with no protected exclusions entering the index; and
- an empty final index at unchanged `develop` / `171d3aa4186e04c656a50d91b52b1f086f95f89a` after 017E stopped safely.

017E closed `baseline-blocked-clean` for two local tooling/formatting reasons:

1. `git diff --cached --check` reported 28 exact pre-existing whitespace findings in accepted candidate files.
2. Windows PowerShell `ConvertFrom-Json` rejected valid `package-lock.json`; deterministic Node `JSON.parse` is required instead.

The corrected evidence is authoritative in:

- `planning/reviews/017E-local-baseline-completion-review.md`
- `planning/sprints/017E-validator-reconciliation-and-local-baseline-completion/acceptance.md`

## Goal

Finish the post-Sprint-021 local repository baseline in one pass by:

1. repairing the 28 recorded whitespace findings mechanically;
2. adding deterministic staged-JSON validation using project-local Node;
3. making the accepted proportionate-governance model durable;
4. rebuilding and validating the complete staging manifest;
5. resolving any further ordinary local mechanical validation failures within the bounded allowance;
6. running the complete credential-free validation suite;
7. creating the validated content-baseline commit;
8. creating the planning-closeout commit; and
9. finishing with an empty index and no non-ignored working-tree entries.

## Required Reading

Builder must read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `docs/WORKFLOW_PROFILE.md`
6. `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
7. `planning/reviews/017B-repository-reconciliation-inventory.md`
8. `planning/reviews/017C-repository-treatment-and-boundary-reconciliation.md`
9. `planning/reviews/017D-local-baseline-commit-review.md`
10. `planning/reviews/017E-local-baseline-completion-review.md`
11. `planning/sprints/017E-validator-reconciliation-and-local-baseline-completion/acceptance.md`
12. `docs/VALIDATION.md`
13. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
14. `docs/SPRINT_021_PROGRESS.md`
15. this applied `SPRINT.md`

## Proportionate Governance Update

Update `docs/WORKFLOW_PROFILE.md` and, only where needed for consistency, `AGENTS.md` and the project sprint list so future work follows these accepted rules:

- `standard` is the default profile for ordinary repository, UI, documentation, local tooling, test, and product-feature work.
- `strict` controls apply when scope touches auth/RLS, secrets/protected evidence, remote migrations, production data, billing/Stripe, destructive operations, external publication, or production deployment.
- Normal sprints should target a useful product or delivery outcome rather than one diagnostic step.
- Mechanical issues found during a sprint stay in that sprint when correction does not alter product behaviour or cross a strict boundary.
- Use one `SPRINT.md` for normal work; reserve four-file Packs for genuinely strict/high-risk work.
- A child sprint is warranted only for material scope expansion, a true external blocker, or a substantially different product outcome.
- Closeout should remain concise and refer to canonical evidence rather than repeating full project history.

Do not remove the hard Architect/Builder role split, Pack handoff rule, sprint suffix rule, secret protections, manual-intervention rule, or production/external stop boundaries.

## Exact Whitespace Repair Set

Repair exactly the 28 findings recorded by 017E:

| Path | Required mechanical repair |
|---|---|
| `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md` | Remove new blank line at EOF. |
| `docs/SUPABASE_CLI_CONNECTIVITY_020D.md` | Remove new blank line at EOF. |
| `docs/SUPABASE_REMOTE_REPLACEMENT_AUDIT_020F.md` | Remove new blank line at EOF. |
| `planning/PROJECT_SPRINT_LIST_2026-07-21.md` | Remove trailing whitespace at recorded lines 3 and 4. |
| `planning/architect-packs/architect-pack-017B-repository-reconciliation-and-review-baseline.md` | Remove trailing whitespace at recorded lines 3 and 4 and new blank line at EOF. |
| `planning/architect-packs/architect-pack-017C-repository-treatment-and-boundary-reconciliation.md` | Remove trailing whitespace at recorded lines 3 and 4 and new blank line at EOF. |
| `planning/architect-packs/architect-pack-017D-intentional-staging-and-local-baseline-commit.md` | Remove trailing whitespace at recorded lines 3 and 4 and new blank line at EOF. |
| `planning/architect-packs/architect-pack-017E-validator-reconciliation-and-local-baseline-completion.md` | Remove new blank line at EOF. |
| `planning/architect-packs/architect-pack-020-remote-biochemistry-migration-live-readiness.md` | Remove new blank line at EOF. |
| `planning/reviews/017D-local-baseline-commit-review.md` | Remove new blank line at EOF. |
| `planning/reviews/020F-supabase-object-classification.md` | Remove new blank line at EOF. |
| `planning/reviews/020F-supabase-preservation-decisions.md` | Remove new blank line at EOF. |
| `planning/reviews/PROJECT_REVIEW_AND_FORWARD_ROADMAP_2026-07-19.md` | Remove trailing whitespace at recorded lines 3–5. |
| `planning/sprints/020F-temporary-role-cleanup-and-remote-repository-replacement-audit/acceptance.md` | Remove new blank line at EOF. |
| `scripts/validate-biochemistry-remote-readiness.ps1` | Remove new blank line at EOF. |
| `supabase/verification/020-biochemistry-readiness.sql` | Remove new blank line at EOF. |
| `supabase/verification/020E-audit-role-setup.sql` | Remove new blank line at EOF. |
| `supabase/verification/020E-structural-audit.sql` | Remove new blank line at EOF. |
| `supabase/verification/020F-temporary-role-cleanup.sql` | Remove new blank line at EOF. |

Requirements:

- change whitespace only;
- preserve semantic text, SQL, PowerShell, Pack delimiters, checklist state, and line ordering;
- preserve each file’s established line-ending style where practical;
- use formatting/mechanical tooling or narrow patches, not manual content rewrites;
- prove each file’s normalized non-whitespace content is unchanged;
- rerun every affected Architect Pack format check after repair.

## Deterministic JSON Validation

Create:

- `scripts/validate-json-files.mjs`
- `scripts/test-validate-json-files.mjs`

The validator must:

- use Node’s `JSON.parse`;
- accept one or more exact file paths as CLI arguments;
- read UTF-8 and safely strip only an initial BOM;
- parse files without transforming or rewriting them;
- fail non-zero when no paths are supplied, a file is missing/unreadable, or JSON is invalid;
- on failure, print only the affected path and a sanitized category/message without file content;
- on success, print a concise file count;
- handle paths containing spaces, parentheses, brackets, and Unicode;
- parse `package.json`, `package-lock.json`, `planning/STATUS.json`, and the staged manifest JSON files;
- avoid external packages and network access.

The self-test must cover:

- valid object and array JSON;
- BOM-prefixed valid JSON;
- duplicate-looking npm lockfile property shapes accepted by `JSON.parse`;
- invalid JSON failure;
- missing file failure;
- no-argument failure;
- path-with-spaces handling;
- confirmation that failure output does not reproduce source content.

Use this Node validator for all staged JSON gates. Do not use PowerShell `ConvertFrom-Json` as the authoritative all-file parser. PowerShell may still read known simple project JSON where unrelated workflows already use it.

## Bounded In-Sprint Remediation Allowance

To prevent another chain of micro-sprints, Builder may correct additional issues discovered by credential-free validation when all conditions below hold:

- the issue is local and reproducible;
- the correction is mechanical, formatting-only, encoding-only, deterministic validation plumbing, a stale local assertion, an import/type/lint correction, or another non-behavioural repair;
- it does not change product rules, visible behaviour, schema, migration contents/history, auth/RLS policy, permissions, score formulas, thresholds, recommendations, pricing, hosted configuration, external state, or production state;
- it touches no protected/local-only file;
- the correction affects no more than 40 additional existing candidate text files in total;
- each corrected path, reason, before/after semantic assessment, and validation is recorded in the pre-commit review;
- the full validation suite restarts from the relevant earliest affected gate.

Examples allowed inside 017F:

- trailing whitespace, EOF newline, line-ending, or mojibake repair where intended Unicode is unambiguous from canonical context;
- deterministic JSON/Pack/manifest validation corrections;
- stale local-only validator ranges/messages already contradicted by accepted immutable evidence;
- lint formatting or unused-import corrections with no runtime change;
- TypeScript annotation/import corrections preserving runtime behaviour;
- test-harness expectation correction where accepted sprint evidence proves the current implementation is authoritative.

Stop and record manual intervention only if correction would:

- exceed 40 additional files;
- change product behaviour or domain meaning;
- change migration SQL/history, auth/RLS, permissions, secrets, billing, production, or remote state;
- delete/overwrite user data;
- require protected content;
- require a new dependency or major upgrade;
- require an external service or user business/domain decision.

Do not create Sprint 017G for an allowed mechanical issue. Complete it in 017F.

## Mandatory Exclusions

Never stage, commit, inspect, print, hash, copy, or scan protected/local-only contents. Confirm existence/ignore state by filename only where needed:

- `.env*` other than placeholder-only `.env.example` already classified for the repository;
- `.release-main/**`;
- `.claude/**`;
- `planning/reviews/021M-supabase-support-escalation.md`;
- `.next/**`, `build/**`, `node_modules/**`;
- `.validation-logs/**`, `.logs/**`;
- `supabase/.temp/**`, `supabase/.temp-old-link/**`;
- `desktop.ini`;
- local IDE state, caches, credentials, keys, tokens, cookies, sessions, protected browser/process material, and generated logs.

The exact anchored ignore rules for root `.release-main/`, root `.claude/`, and the restricted 021M record must remain present once each.

## Approved Work And Files

Builder may:

- edit the exact 19 whitespace-affected files listed above mechanically;
- create the two JSON validation scripts;
- update `docs/WORKFLOW_PROFILE.md`, `AGENTS.md`, and `planning/PROJECT_SPRINT_LIST_2026-07-21.md` for the accepted governance model;
- retain the accepted `scripts/validate-supabase-clean-rebuild-020G.ps1` 0001–0012 correction;
- create `planning/reviews/017F-staging-manifest.json`;
- create `planning/reviews/017F-precommit-review.md`;
- create `planning/reviews/017F-local-baseline-completion-review.md`;
- annotate this applied `SPRINT.md` at closeout;
- update `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/SPRINT_SCHEDULE.md`, and, only as needed, `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`;
- edit additional candidate text files only within the bounded remediation allowance;
- stage the exact reviewed manifest;
- create the two required local commits.

Builder must not perform feature expansion, broad refactoring, dependency upgrades, migration changes, remote work, deployment, or product/domain decision-making.

## Fresh Manifest And Intentional Staging

Create a fresh manifest from live non-ignored status after all repairs and Pack application. Do not reuse 017E’s list blindly.

`planning/reviews/017F-staging-manifest.json` must contain:

- schema version and capture timestamp;
- opening branch, full HEAD, local-ref upstream relation, and empty-index evidence;
- exact candidate file paths;
- group for every path: `application-design`, `auth-role`, `database-migrations-verification`, `validation-scripts-tests`, `planning-evidence`, `reference-scaffold`, or `repository-method-config`;
- originating sprint(s), opening state, risk, and whether 017F edited the file;
- exact exclusions;
- per-group, edited-file, candidate, and exclusion totals.

Every visible non-ignored status entry must be represented exactly once. Candidates must contain no wildcard, directory path, implicit recursion, ignored/protected path, duplicate, missing file, or unsupported deletion.

Stage exact files only. Do not use `git add .`, `git add -A`, wildcard staging, directory staging, or stage-then-unstage exclusions. Use literal pathspec handling and stop on the first staging error.

## Staged Safety Gates

Before Commit 1:

1. Prove staged paths equal manifest candidates exactly.
2. Prove zero non-ignored candidates remain unstaged or untracked.
3. Prove mandatory exclusions never entered the index.
4. Validate every staged Architect Pack.
5. Parse every staged JSON file with `scripts/validate-json-files.mjs` using exact staged JSON paths.
6. Run a high-confidence staged secret scan without printing matched values; report path and category only.
7. Review file modes and binaries; the supplied Sprint-list DOCX should be the only expected new binary unless 017B evidence supports another.
8. Run `git diff --cached --check`; it must pass with zero findings.
9. Record staged statistics.
10. Review at least one safe representative diff from every non-empty manifest group.
11. Verify all 017F repairs remain within the approved or bounded-remediation scope and preserve semantics.

## Complete Credential-Free Validation

Run:

1. Current 017F Pack check.
2. Every staged Architect Pack check.
3. `node scripts/test-validate-json-files.mjs`.
4. Staged JSON validation using `node scripts/validate-json-files.mjs <exact staged JSON paths>`.
5. `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-scoring.ts`.
6. `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-recommendations.ts`.
7. `powershell -ExecutionPolicy Bypass -File scripts/validate-design-system-019.ps1`.
8. `powershell -ExecutionPolicy Bypass -File scripts/validate-biochemistry-remote-readiness.ps1`.
9. `powershell -ExecutionPolicy Bypass -File scripts/validate-database-audit-020C.ps1`.
10. `powershell -ExecutionPolicy Bypass -File scripts/validate-supabase-structural-audit-020E.ps1`.
11. `powershell -ExecutionPolicy Bypass -File scripts/validate-supabase-replacement-audit-020F.ps1`.
12. `powershell -ExecutionPolicy Bypass -File scripts/validate-supabase-clean-rebuild-020G.ps1`.
13. `powershell -ExecutionPolicy Bypass -File scripts/validate-role-matrix-021.ps1`.
14. `node scripts/test-role-matrix-021.mjs`.
15. Every credential-free `scripts/test-supabase-*.mjs` self-test that neither contacts a remote service nor requires protected input. Never run `scripts/supabase-*.mjs` execution harnesses.
16. `npm run lint`.
17. `node_modules/node/bin/node.exe node_modules/typescript/bin/tsc --noEmit --incremental false`.
18. `npm run build`.
19. Repeat manifest/index equality, exclusions, Pack/JSON/secret/binary/mode checks, and `git diff --cached --check` after validation.

### Build retry

If the first build exits during page generation without a source/type/lint error, record the safe failure phase, prove no source/index change, and run one unchanged retry. Accept only if the retry passes and evidence matches the known intermittent worker-exit class. Do not loop.

### Handling ordinary failures

For a failure within the remediation allowance:

1. unstage only the affected exact paths if necessary;
2. make the narrow repair;
3. update manifest/review evidence;
4. restage exact paths;
5. restart from the earliest affected validation gate;
6. continue toward the same 017F outcome.

Do not stop merely because the first mechanical attempt fails. Stop only at a strict boundary or when the remediation allowance is exceeded.

## Commit Structure

### Commit 1 — Validated content baseline

Subject:

`chore: establish post-sprint-021 repository baseline`

Create only after every staged safety and credential-free validation gate passes. It must contain exactly the manifest candidates, including 017F tooling, repairs, initial manifest/pre-commit review, Pack/applied sprint file, accepted earlier work/evidence, samples scaffold, and supplied DOCX, excluding protected/local-only material.

Record the full hash immediately. Parent must be the opening HEAD.

### Commit 2 — 017F closeout

Subject:

`docs: close sprint 017F repository baseline`

After Commit 1, create/update only:

- `planning/reviews/017F-local-baseline-completion-review.md`;
- this applied `SPRINT.md` completion annotation;
- `planning/STATE.md`;
- `planning/STATUS.json`;
- `planning/ARCHITECT_BRIEFING.md`;
- `planning/SPRINT_SCHEDULE.md`;
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` only if needed.

Record Commit 1 hash, parent, statistics, validation, repairs, and exclusions. Stage only those exact closeout files, rerun Node JSON parsing, safe secret/diff review, and `git diff --cached --check`, then create Commit 2. Do not amend Commit 1.

The Builder report records Commit 2’s final hash.

## Required Evidence

### `planning/reviews/017F-precommit-review.md`

Record:

- opening repository state;
- all 28 repaired findings;
- additional bounded repairs, if any;
- JSON validator design/self-test results;
- governance update summary;
- fresh manifest totals and differences from 017E;
- exclusions;
- representative group reviews;
- staged safety results;
- complete validation results before Commit 1.

### `planning/reviews/017F-local-baseline-completion-review.md`

Record:

- outcome;
- Commit 1 hash/parent/subject/file count/statistics;
- Commit 2 intended closeout set and subject;
- validation summary;
- exact repairs and semantic-preservation evidence;
- final branch, HEAD, local-ref ahead/behind, empty index, and status;
- residual ignored/local-only paths by name only;
- confirmation of no remote, protected, production, deployment, provider, billing, or product-behaviour action;
- next recommendation: combined validation/CI/planning consolidation, not another Sprint 017 repository child sprint.

## Acceptance

017F is complete only when:

- the corrected 017E evidence remains intact;
- all 28 named whitespace findings are repaired mechanically;
- normalized non-whitespace content of those files is unchanged;
- the Node JSON validator and self-tests pass, including `package-lock.json`;
- proportionate governance is durably documented without weakening strict risk boundaries;
- any additional remediation stays within the allowance and is fully recorded;
- fresh manifest covers every non-ignored path exactly once;
- exclusions never enter the index;
- all staged Pack, JSON, secret, binary, mode, and whitespace checks pass;
- the full credential-free validation suite passes;
- no protected or remote execution harness runs;
- Commit 1 exists with exact subject and opening HEAD as parent;
- Commit 2 exists with exact subject and Commit 1 as parent;
- final branch remains `develop`;
- final index is empty;
- final `git status --short` contains no non-ignored entries;
- `.release-main/`, `.claude/`, restricted 021M evidence, local environment files, caches, and generated outputs remain ignored/preserved as applicable;
- no push, fetch, pull, PR, remote backup, deployment, migration, production mutation, billing, provider action, authenticated proof, public reopening, or product/domain change occurs.

## Failure And Manual Intervention

Do not create another Sprint 017 child for an allowed mechanical issue.

If a strict boundary or remediation limit blocks completion before Commit 1:

- unstage only exact manifest paths;
- preserve all working files;
- prove the index is empty;
- close `baseline-blocked-clean` with the five-part manual-intervention record.

If Commit 1 succeeds but Commit 2 is blocked:

- preserve Commit 1;
- do not amend, reset, revert, or delete it;
- record exact recovery;
- close `baseline-committed-closeout-blocked`.

Every manual intervention must state:

1. what is blocked;
2. evidence already checked;
3. exact user/manual action;
4. step-by-step instructions;
5. what Builder will verify afterward.

## Outcomes

- `local-baseline-complete`: both commits succeed, all validation passes, index is empty, and no non-ignored working entries remain.
- `baseline-blocked-clean`: no commit exists, index is empty, files are preserved, and a true strict-boundary or remediation-limit blocker is recorded.
- `baseline-committed-closeout-blocked`: Commit 1 exists but closeout commit cannot safely complete.

No outcome implies remote backup, Supabase resolution, authenticated readiness, deployment, or production readiness.
