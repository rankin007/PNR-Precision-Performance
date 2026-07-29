# Sprint 034 — Repository Reconciliation And Project Simplification

## Outcome

Create one clean, validated, remotely backed-up product baseline that preserves the accepted production release, authenticated application work, mobile biochemistry workflow and durable evidence while making current project authority easy to find.

This is repository-control and documentation-hygiene work. It does not add trainer functionality. Its purpose is to make Sprint 035 Trainer Pilot And Dashboard MVP safe and straightforward to execute.

The target outcome is `reconciled-product-baseline-and-project-simplification-complete-clean`.

## Workflow profile

Strict. Most file classification and documentation work is ordinary, but strict controls apply because the worktree is materially dirty, branches have diverged, accepted source exists across multiple lineages, historical evidence must remain trustworthy, archival may affect references, and the requested outcome includes commits and a remote backup branch.

## Starting authority

Use these sources in this order:

1. `AGENTS.md` and `templates/method/120x-agent-identity.md`;
2. `planning/STATE.md`;
3. `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`;
4. `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`;
5. `planning/reviews/033-final-handoff-monitoring-and-done-acceptance.md`;
6. `docs/OPERATIONS_HANDOFF.md`;
7. `planning/EVIDENCE_INDEX.md`;
8. the Sprint 032 release evidence and exact release branch/SHA;
9. accepted Sprint 021AH and Sprint 022/022B evidence;
10. `planning/PROJECT_REVIEW_AND_REVISED_SPRINT_LIST_2026-07-29.md`, using its dated amendment and lean-delivery diagnosis rather than superseded status claims.

Sprint 033 closed `final-handoff-complete-product-not-done-clean`. Sprint 032 remains the valid public release. Product-wide Done is not met. Sprint 034 must preserve those distinctions.

## Required baseline inventory

Before editing or moving any file, record:

- current root path, branch, HEAD and complete tracked/untracked manifest;
- `develop`, `origin/develop`, `codex/032-public-relaunch-production`, `codex/029-marketing-preview-release` and any other branch that contains accepted product work;
- the exact Sprint 032 release SHA and its ancestry;
- every registered Git worktree and any referenced integrated candidate under `C:\tmp` that still exists;
- migrations, lockfile, application source, tests and durable evidence unique to each candidate;
- ignored/generated/local-only/protected paths by name and classification only, without reading or emitting secret values;
- current production identity through maintained Sprint 032/033 evidence, supplemented only by bounded read-only checks if needed to resolve a material ambiguity.

Do not assume the dirty root, remote `develop`, release branch or a temporary worktree is the integrated baseline. Select it from evidence.

## Required deliverables

### 1. Repository reconciliation ledger

Create `planning/reviews/034-repository-reconciliation-ledger.md` containing:

- every material tracked modification and untracked path grouped by sprint/outcome;
- disposition: preserve in baseline, preserve as history, archive, ignore/local-only, reproducible generated output, superseded duplicate, unresolved, or excluded;
- source lineage and evidence for each preserve decision;
- selected baseline branch/SHA and why it is stronger than alternatives;
- exact treatment of local `develop`, `origin/develop`, release branches and separate worktrees;
- migrations and lockfile reconciliation;
- explicit confirmation that no secret or private-data content was copied into evidence;
- any unresolved item and its effect on Sprint 035.

Large homogeneous groups may be summarized by directory and rule when every member has the same proven disposition. Do not reproduce hundreds of filenames merely for ceremony.

### 2. Clean integrated product baseline

Create or use branch `codex/034-reconciled-product-baseline` from the strongest accepted source lineage. Reconcile into it only:

- exact Sprint 032 public release source and metadata required to reproduce the live release;
- accepted Sprint 021AH authenticated application source, migrations through `0017`, tests and current contract documentation;
- accepted Sprint 022/022B mobile biochemistry workflow source, focused tests and current documentation;
- completed Sprint 033 operational handoff and final acceptance authorities;
- necessary current validation, configuration and dependency files;
- Sprint 034 reconciliation, archive/index and closeout artifacts.

Use evidence-led file comparison, commits, patches or narrowly scoped Git operations. Do not copy the entire dirty root, merge blindly, rebase shared history, force-push, or infer acceptance from file recency alone.

Production application behavior must remain unchanged. Deterministic formatting, encoding, broken-reference, validator and manifest corrections discovered within approved files remain in Sprint 034 when they do not change product behavior.

### 3. Planning simplification and archive

Create a concise current planning surface:

- `planning/STATE.md` — current production/product truth and immediate Sprint 035 direction;
- `planning/STATUS.json` — exact Sprint 034 closeout;
- `planning/ARCHITECT_BRIEFING.md` — concise next-Architect briefing;
- `planning/SPRINT_SCHEDULE.md` — operational roadmap beginning with Sprint 035;
- `planning/EVIDENCE_INDEX.md` — current authorities first, history second;
- `planning/SPRINT_LIFECYCLE_LEDGER.md` — compact proposed/applied/completed/superseded/historical status for sprint and pack families where ambiguity matters.

Archive only proven superseded or redundant planning material under a dated path such as `planning/history/through-033/` or an existing compatible history structure. Prefer Git moves that preserve history. Update inbound links for moved files or leave a small index/redirect note where stable references would otherwise break.

Do not archive or delete:

- migrations;
- current application source or tests;
- current canonical authorities;
- Sprint 032 release evidence;
- Sprint 033 final acceptance and operational handoff;
- accepted Sprint 021AH or 022/022B evidence needed to establish the integrated baseline;
- adverse security, privacy, migration, cleanup or production evidence;
- anything whose ownership or redundancy is uncertain.

Historical narrative may remain in place when moving it would create more link churn than clarity. Project simplification is measured by discoverability and authority, not file-count reduction.

### 4. Lean-delivery controls

Update `docs/WORKFLOW_PROFILE.md`, `AGENTS.md`, the schedule or another canonical workflow file only as narrowly required to make these rules durable:

- one sprint produces one user-visible or operationally necessary outcome;
- no new Pack is created while the current sprint remains open;
- ordinary product work uses one `SPRINT.md`; four-file Packs are reserved for genuinely strict/high-risk boundaries;
- deterministic tooling, validator, formatting, encoding and evidence corrections stay within the active sprint;
- a follow-up suffix requires a material out-of-scope source/schema/contract change, genuinely different outcome or external action without authority;
- closeout links to evidence instead of repeating full history;
- every second product sprint includes trainer-visible testing;
- progress is measured through accepted user journeys, not pack or document count;
- strict controls attach to the risky boundary, not automatically to the entire feature;
- voice, OCR, transactional commerce, sophisticated saved views and broad public enhancements remain deferred unless a later sprint explicitly promotes them.

Do not weaken security, privacy, migration, production or evidence-integrity controls.

### 5. Validation, commit and remote backup

On the reconciled branch:

- run canonical JSON, domain, roles, Supabase self-test, static, TypeScript, lint and local validation;
- run production build in the project root or an equivalent reparse-safe clean workspace and record the substitution;
- run focused Sprint 021AH and 022/022B regression checks;
- run `git diff --check`;
- validate maintained links/paths and sprint-pack formatting relevant to changed files;
- scan the exact staged set for secrets, private data, generated output and excluded files;
- inspect the complete staged manifest before each commit.

Create a small intentional commit series, preferably one reconciliation commit and one planning/archive closeout commit. Do not create a commit per file or per historical sprint.

Push only `codex/034-reconciled-product-baseline`. Do not push or force-update `develop`, rewrite any remote branch, open a PR, merge, deploy or change production. Verify the remote branch resolves to the exact final local SHA.

## Approved files and actions

Builder may:

- create the Sprint 034 generated files and review artifacts;
- create `planning/SPRINT_LIFECYCLE_LEDGER.md`;
- update canonical planning/workflow/documentation files necessary for truthful reconciliation and lean-delivery controls;
- preserve accepted application, test, migration, configuration and dependency files on the reconciled branch without changing runtime behavior;
- move proven historical planning/evidence files into a dated archive while maintaining navigability;
- update `.gitignore` only for confirmed generated, local-only or protected paths;
- create/switch to the scoped Sprint 034 branch, stage the exact accepted manifest, commit the validated baseline and push that scoped branch;
- use a clean temporary worktree for safe comparison/build validation;
- remove only Sprint-034-owned temporary worktrees/processes after exact-path and ownership verification.

## Explicitly out of scope

- New trainer/dashboard, scoring, recommendation, upload, trend, voice, commerce or public functionality.
- Product schema, migration, RLS, role, permission or data-contract changes.
- Production deployment, rollback, DNS, Vercel setting, Supabase, Stripe, environment or production-data mutation.
- Merging to or pushing `develop`.
- Force-push, history rewrite, broad reset, blanket staging, blanket commit or blanket deletion.
- Reading, copying or emitting secret values, protected local environment contents or real horse/stable/customer data.
- Declaring product-wide Done.
- Reopening historical sprints or changing their identifiers/outcomes.
- Creating the Sprint 035 Pack.

## Safety and execution standard

Follow the Evidence-Proportional Execution Standard in `AGENTS.md`. Stop only for a material target/lineage ambiguity that cannot be resolved safely, secret/private-data exposure, destructive uncertainty, evidence-integrity failure, unauthorized scope expansion, production impact, unsafe Git history operation, or cleanup whose ownership cannot be proven.

Use equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope validator, formatting, encoding, link, manifest, reporter and deterministic harness corrections in Sprint 034. Do not create a follow-up sprint solely because Docker, browser automation, a renderer, schema dump, optional CLI or another supporting tool is unavailable.

Manual intervention is the last safe option. If genuinely required, record what is blocked, evidence checked, exact user action, step-by-step instructions and what Builder will verify afterward. Never ask the user to paste secrets or private production data.
