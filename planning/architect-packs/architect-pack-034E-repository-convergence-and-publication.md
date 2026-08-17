============================================================
FILE: planning/sprints/034E-repository-convergence-and-publication/requirements.md
============================================================

# Sprint 034E — Repository Convergence And Publication

## Outcome

Protect the accepted local repository lineage by proving the four local-only commits safe, publishing the exact opening HEAD to a new non-force remote branch, reconciling current Git and planning truth, and recording a reviewable later integration strategy without changing Product, Production, providers, `main`, or the existing pull request.

The target outcome is `repository-continuity-remotely-backed-convergence-strategy-complete-clean`.

This is a strict, critical repository-integrity sprint. It does not complete any of the four remaining current-MVP product outcomes.

## Starting authority

Operate only from `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Before any action, both the current directory and `git rev-parse --show-toplevel` must resolve to that exact canonical path.

The accepted opening facts are:

- local branch: `codex/025B-versioned-domain-authority-package`;
- local opening HEAD: `c1eb5e796188e5088c732968539a95bcdf455b0e`;
- existing remote counterpart / pull request head: `c90c3201380d7f61e03647ca6e46b03dc4c27985`;
- local-only commits: `fa8c6c8`, `54a7249`, `133bacc`, and `c1eb5e7`;
- exact publication range: `c90c3201380d7f61e03647ca6e46b03dc4c27985..c1eb5e796188e5088c732968539a95bcdf455b0e`;
- the existing draft pull request is not an integration vehicle for this sprint;
- the fresh target branch is `codex/034E-repository-convergence-and-publication`;
- `delivery_road_map.docx` is a pre-existing untracked file and is excluded completely.

If any opening SHA, branch, range, cleanliness fact, or target-ref absence differs, stop before publication and return to Architect. The DOCX must remain byte-identical, untracked, unstaged, uncommitted, unpushed, and uninspected.

## In scope

- Apply this Pack and create exactly its four Sprint 034E files.
- Create and switch to the target local branch at the exact opening HEAD without rewriting history.
- Add `scripts/scan-git-delta-secrets-034E.mjs` and `scripts/test-scan-git-delta-secrets-034E.mjs` with no new dependency.
- Scan the exact opening Git range and later the exact staged closeout blobs without reading unrelated untracked content.
- Validate repository integrity, changed content, JSON, type checks, tests and staged scope proportionally.
- Push the exact opening HEAD to the absent target remote branch with no force, then prove local/upstream/remote/API SHA equality.
- Create `docs/REPOSITORY_CONVERGENCE_AND_PUBLICATION_034E.md` and `planning/reviews/034E-repository-convergence-and-publication.md`.
- Reconcile current planning truth and record the later reviewable integration strategy.
- After fresh inspection passes, create one intentional closeout commit, fast-forward the same target remote branch, and prove final equality.

## Scanner contract

The scanner must:

- accept only explicit `--range <base> <head>` or `--staged` modes;
- enumerate Git blobs from the selected range or index rather than scanning the whole working tree;
- detect high-confidence credential/token/private-key/database-URL patterns and protected filename classes;
- permit demonstrably placeholder-only examples such as `.env.example` only after inspecting the Git blob;
- classify expected PNG/JPEG evidence binaries by Git mode, extension and binary signature without emitting content;
- fail closed on unknown or executable binary additions;
- emit only aggregate counts plus path/category findings, never secret values, fragments, matching lines, or value lengths;
- return non-zero for a finding, invalid invocation, Git enumeration error, or undecidable protected boundary;
- make no network, provider, browser, clipboard, environment-secret, or filesystem mutation.

Its tests must prove a safe placeholder passes; synthetic PAT, private-key and database-URL fixtures fail without their values appearing in output; staged mode is bounded to the index; expected image evidence is classified safely; and unknown/executable binary content fails closed.

## Publication sequence

Publication is deliberately two-phase:

1. Prove the opening range scanner-clean, run required validation, recheck that the target remote ref is absent, create/switch the target local branch at the opening HEAD, push that exact SHA with upstream tracking and no force, then prove local, upstream, `ls-remote`, and GitHub readback all equal `c1eb5e796188e5088c732968539a95bcdf455b0e`.
2. After implementation and fresh independent inspection pass, update closeout records, stage only owned paths, scan the staged blobs, create one closeout commit, push it as a fast-forward to the same branch, and prove final local/upstream/remote/API equality with a clean tracked worktree.

The first push is a continuity backup, not approval to merge. The final push must not occur before fresh inspection passes.

## Convergence strategy

`docs/REPOSITORY_CONVERGENCE_AND_PUBLICATION_034E.md` must record the exact local, remote, `main`, and pull-request heads; explain why the oversized divergent pull request is neither enlarged nor merged; and define a later, separately planned integration sequence from current `main` using small reviewable slices:

1. repository and method configuration;
2. Product and database changes;
3. tests and operator tooling;
4. planning and evidence.

This sprint documents that strategy only. It must not rebase, merge, cherry-pick, replay, reset, or otherwise integrate history.

## Durable records

Reconcile, only as required: `planning/ROADMAP.md`, `delivery_road_map.md`, `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

All current records must keep `productDone: false`, Sprint 036L as live product authority, Sprint 036S gated/unplanned, and the four remaining current-MVP outcomes unchanged.

## Hard boundaries

Do not modify Product/runtime source, schema, migrations, RLS/Auth, dependencies, providers, deployment, Production, DNS, data, trainer access, billing, or public content. Do not inspect or stage the untracked DOCX. Do not force-push, rewrite history, reset, rebase, merge, cherry-pick, delete refs, modify/close/merge pull request 3, modify `main`, open a replacement pull request, or publish anywhere except the exact new branch.

Stop for a positive/uncertain protected-data scan, target-branch collision, unexpected opening authority, Git integrity failure, remote SHA mismatch, non-fast-forward requirement, need for force, unexpected protected material, or scope expansion.

## Evidence-proportional execution

Equivalent or stronger safe proof may replace an unavailable supporting tool when it proves the same boundary without weakening security, privacy, data, Git-integrity, or external-state controls. Deterministic scanner, test-harness, validator, reporter, formatting, encoding, and other non-product corrections already required for this outcome remain inside Sprint 034E. Do not create a follow-up sprint solely because an optional CLI, renderer, browser, clipboard route, or redundant supporting check is unavailable. Manual intervention is the last safe option after equivalent proof and safe alternate mechanisms are exhausted; if it is genuinely required, record the blocked fact, evidence checked, exact secret-free user steps, and the proof to run afterward.

============================================================
FILE: planning/sprints/034E-repository-convergence-and-publication/blueprint.md
============================================================

# Sprint 034E Blueprint

## Flight declaration

- Workflow: 120x Fly
- Profile: strict
- Flight class: critical
- One Pack, one sprint, one outcome
- Critical causes: public-repository publication, secret-safety boundary, Git history integrity and remote equality

## Invariant

Only an exact scanner-clean accepted lineage may be published. The new remote branch must always equal the verified local SHA. `main`, pull request 3, Product, Production, providers, and `delivery_road_map.docx` remain unchanged.

## Layer map

Git objects/index/worktree → bounded secret scanner → scoped local branch → scoped remote ref → GitHub readback → durable planning truth.

## Task contract

- Target outcome: `repository-continuity-remotely-backed-convergence-strategy-complete-clean`.
- Canonical workspace: exact permanent repository only.
- Opening lineage: `c90c3201380d7f61e03647ca6e46b03dc4c27985..c1eb5e796188e5088c732968539a95bcdf455b0e`.
- Publication target: `codex/034E-repository-convergence-and-publication` only.
- Owned implementation files: the four generated sprint files, two scanner scripts, convergence document, review, and proportional current planning/closeout records.
- External mutations: two non-force pushes to the one fresh branch; no other external write.
- Required proof: scanner tests and scans, integrity/static checks, exact SHA equality, unchanged protected refs/surfaces, fresh inspection, clean closeout.
- Stop conditions: every material boundary listed in requirements.

## Execution plan

1. Reprove canonical path, opening branch/SHA, status, four-commit range, DOCX exclusion, remote configuration, pull-request/main baselines, and target-ref absence.
2. Run `git fsck --no-dangling` and `git diff --check` on the opening range.
3. Implement the dependency-free bounded scanner and its synthetic non-secret tests.
4. Run scanner tests, scan the exact opening range, and run proportionate repository validation.
5. Create/switch the target local branch at the exact opening HEAD, recheck remote absence, push with upstream and no force, and prove four-way SHA equality.
6. Write the sanitized convergence document and implementation review without changing integration state.
7. Run all acceptance checks and present the exact implementation to a fresh Inspector.
8. Only after inspection passes, reconcile closeout records, stage exact owned paths, run staged scanner/validation, commit intentionally, push fast-forward, and prove final equality and clean tracked state.

## Discriminating examples

- `.env.example` containing clear placeholders passes; the same path containing a synthetic token fails.
- A synthetic PAT, private-key block or credential-bearing database URL fails while output omits its value.
- An absent target remote ref permits the scoped push; any existing ref is a collision and stops publication.
- Expected evidence PNG/JPEG blobs with matching signatures are classifiable; unknown or executable binary additions fail closed.
- Local/upstream/API equality passes; any SHA disagreement stops closeout.

## Rollback and recovery

Before the first push, recovery is local and no remote state exists. After the first push, preserve the continuity branch; do not delete or force-update it. If later work fails, leave the verified opening SHA remotely backed, record the partial state, and stop. A closeout push may only be a fast-forward. Never reset or rewrite to manufacture agreement.

## Known uncertainty

The active authenticated GitHub CLI identity may differ from the repository owner while still holding repository scope. The first ordinary non-force push is the bounded authorization proof. Do not switch accounts or broaden credentials unless separately required and authorized.

============================================================
FILE: planning/sprints/034E-repository-convergence-and-publication/acceptance.md
============================================================

# Sprint 034E Acceptance

- [ ] AC-01 Both canonical workspace checks equal the permanent repository before every mutation phase.
- [ ] AC-02 Opening branch, HEAD, remote baseline and exact four-commit range match the Pack.
- [ ] AC-03 `delivery_road_map.docx` remains byte-identical, untracked, unstaged, uncommitted, unpushed and uninspected.
- [ ] AC-04 The Pack creates exactly four files in the Sprint 034E folder and Builder executes from them.
- [ ] AC-05 A separate Builder context produces an exact file-by-file plan and task contract before implementation.
- [ ] AC-06 A genuinely fresh critical Architect review passes the Builder plan before implementation.
- [ ] AC-07 Git integrity and opening-range whitespace checks pass.
- [ ] AC-08 The dependency-free scanner implements only explicit range and staged modes and scans Git blobs, not unrelated working-tree files.
- [ ] AC-09 Scanner output never discloses a detected value, fragment, line or length.
- [ ] AC-10 Safe-placeholder, synthetic credential, staged-boundary and binary-classification tests pass.
- [ ] AC-11 The exact opening range is scanner-clean before any remote publication.
- [ ] AC-12 Required type, JSON, test and static validation passes or stronger substitute proof is recorded.
- [ ] AC-13 The target remote ref is proven absent immediately before publication.
- [ ] AC-14 The target local branch is created at the exact opening HEAD without rewriting history.
- [ ] AC-15 The first push is non-force and publishes exactly the opening HEAD to only the target branch.
- [ ] AC-16 Local, upstream, `ls-remote` and GitHub API SHAs equal the opening HEAD after the first push.
- [ ] AC-17 The convergence document records exact heads, the stalled/divergent state and a later four-slice integration strategy without performing integration.
- [ ] AC-18 Pull request 3 and `main` remain unchanged; no new pull request is opened.
- [ ] AC-19 Product, schema, dependencies, providers, deployment, Production, data and trainer/auth surfaces remain unchanged.
- [ ] AC-20 Current planning truth is reconciled while `productDone` stays false and the four remaining current-MVP outcomes remain unchanged.
- [ ] AC-21 Fresh independent inspection passes the implementation and all critical boundaries before closeout.
- [ ] AC-22 Only owned paths are staged, and the staged scanner plus exact staged-scope checks pass.
- [ ] AC-23 One intentional closeout commit is made and pushed only as a fast-forward to the scoped branch.
- [ ] AC-24 Final local, upstream, `ls-remote` and GitHub API SHAs are equal and the tracked worktree is clean.
- [ ] AC-25 The target outcome and proportional closeout records are complete with no secret/protected content.

============================================================
FILE: planning/sprints/034E-repository-convergence-and-publication/handoff-prompt.md
============================================================

You are Builder for Sprint 034E — Repository Convergence And Publication.

Your sole outcome is `repository-continuity-remotely-backed-convergence-strategy-complete-clean`: prove the four accepted local-only commits safe, publish the exact opening HEAD to a fresh non-force remote branch, document the later reviewable integration strategy, reconcile current repository/planning truth, obtain fresh independent inspection, and close on that same branch without changing Product, Production, providers, `main`, pull request 3, or the excluded DOCX.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Prove the current directory and Git top-level both equal it. Read the identity, `AGENTS.md`, all four generated Sprint 034E files and current planning authority. Execute from the generated sprint files, not from the Pack.

Before editing or external mutation, return an exact Builder plan containing: the task contract; opening facts and guards; every file to add or update; scanner design and test cases; validation commands; first-push sequence and SHA readbacks; convergence-document contents; inspection evidence; closeout files; staged-scope controls; and every stop condition. Do not implement until the critical Architect plan review passes.

Use opening branch `codex/025B-versioned-domain-authority-package`, HEAD `c1eb5e796188e5088c732968539a95bcdf455b0e`, remote baseline `c90c3201380d7f61e03647ca6e46b03dc4c27985`, exact range `c90c3201380d7f61e03647ca6e46b03dc4c27985..c1eb5e796188e5088c732968539a95bcdf455b0e`, and target branch `codex/034E-repository-convergence-and-publication`. Stop if these or target-ref absence differ.

Preserve `delivery_road_map.docx` byte-for-byte as untracked and never inspect, stage, commit or push it. Do not use blanket staging.

Implement the two dependency-free scanner scripts exactly to the requirements contract. Keep all fixtures synthetic and generated in disposable temporary storage. Never print a matching value, fragment, line or length. Scan only explicit Git ranges or the index and fail closed for unknown protected boundaries.

Before the first push, pass scanner tests, scan the exact opening range, validate Git integrity and the repository proportionally, and prove the target remote ref absent again. Create/switch the local target branch at the opening SHA and use one ordinary upstream-setting push without force. Immediately prove local, upstream, `ls-remote`, and GitHub API equality. If publication is rejected, mismatched, non-fast-forward or requires force, stop without alternative remote mutation.

Create the convergence document and sanitized review. Record exact local/remote/main/pull-request heads, why the giant divergent pull request will not be enlarged or merged, and a future four-slice integration sequence from current `main`: repository/method configuration; Product/database; tests/operator tooling; planning/evidence. Do not execute that integration.

Present the completed implementation and evidence to a genuinely fresh Inspector. Do not create or push the closeout commit until inspection passes. After pass, update proportional current closeout records, keeping Sprint 036L live, Sprint 036S gated/unplanned, all four remaining current-MVP outcomes, and `productDone: false`.

Stage only the exact owned paths. Prove staged count/list, run the staged scanner and validation, create one intentional Sprint 034E closeout commit, and push only as a fast-forward to the existing scoped branch. Reread exact local/upstream/remote/API equality, `main` and pull-request invariance, DOCX exclusion, and clean tracked status.

Do not change Product/runtime, schema, migrations, RLS/Auth, dependencies, providers, deployments, Production, DNS, data, trainer access, billing or public content. Do not force-push, reset, rebase, merge, cherry-pick, delete refs, change/close/merge pull request 3, change `main`, or open a replacement pull request. Stop for every material boundary in `requirements.md`.

Apply the Evidence-Proportional Execution Standard: use equivalent or stronger safe proof for an unavailable supporting tool when it preserves every protected boundary; keep deterministic scanner/harness/validator/reporter corrections in this sprint; do not create a follow-up only for optional-tool failure; and request manual intervention only after safe alternatives are exhausted, recording the blocked fact, evidence, exact secret-free steps and subsequent verification.
