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
