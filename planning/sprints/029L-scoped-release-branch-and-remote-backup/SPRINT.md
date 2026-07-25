# Sprint 029L - Scoped Release Branch And Remote Backup

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for Git branch/history handling, remote push strategy, production provenance, secrets, auth/RLS, schema, Supabase, Stripe, billing, production data, destructive actions, and unrelated dirty-worktree isolation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029L is a release-control follow-up to Sprint 029 through Sprint 029K. It keeps the same core sprint number and uses suffix `L` under the project numbering rule. It must not consume Sprint 030, reopen Sprint 022, or expand into full public website/product/commerce/authenticated/SEO launch work.

## Starting Point

- Sprint 029K is closed as `release-state-hygiene-complete`.
- Production marketing-preview deployment remains `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy` on the intended Vercel project `pnr-precision-performance`.
- Live URL: `https://precisionperformance.com.au`.
- Sprint 029J/029K evidence proves rendered live parity, hero asset delivery, public marker smoke, route-safety smoke, and temporary Vercel project cleanup.
- Local `develop` is ahead of `origin/develop` by 15 commits.
- The ahead commits include Sprint 029F through 029K release commits plus older local history:
  - `7e21c97 Close Sprint 029K release state hygiene`
  - `52eb7a2 Close Sprint 029J rendered visual correction`
  - `14bc568 Fix Sprint 029J rendered marketing preview`
  - `227be71 Close Sprint 029I live public reconciliation`
  - `3c828ee Close Sprint 029H external alias smoke`
  - `5c04af6 Close Sprint 029G alias reconciliation`
  - `c3debef Close Sprint 029F deployment evidence`
  - `ce88697 Deploy Sprint 029F front page marketing preview`
  - older local baseline/shop/checkout commits
- Existing unrelated active 021-series/auth/Supabase dirty work remains present and must not be staged, pushed as uncommitted changes, reverted, deleted, or rewritten in this sprint.
- Historical Architect Pack files remain untracked locally, including 029 through 029K pack files.

## Goal

Create a safe remote backup/review branch for the deployed Sprint 029 release lineage while preserving the messy local `develop` boundary.

The target outcome is `scoped-release-branch-backed-up`: a remote branch such as `codex/029-marketing-preview-release` exists and points to the intended Sprint 029K closeout commit or a later 029L closeout commit, production provenance is recorded, and `origin/develop` remains untouched.

This sprint should make the deployed Sprint 029 source and evidence recoverable from the remote without claiming that `develop` is reconciled.

## Required Reading

Builder must read before Git staging, branch creation, push, or documentation edits:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
5. `planning/STATE.md`
6. `planning/STATUS.json`
7. `planning/ARCHITECT_BRIEFING.md`
8. `planning/DECISIONS.md`
9. `planning/RISKS.md`
10. `planning/QUESTIONS.md`
11. `planning/SPRINT_SCHEDULE.md`
12. `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
13. `planning/EVIDENCE_INDEX.md`
14. `planning/sprints/029K-release-state-hygiene-and-vercel-cleanup/SPRINT.md`
15. `planning/reviews/029K-release-state-hygiene-and-vercel-cleanup-evidence.md`
16. `planning/reviews/029J-rendered-live-visual-reconciliation-and-deploy-correction-evidence.md`
17. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`

## Product And Deployment Boundary

Sprint 029L does not authorize product/source changes, public page redesign, content changes, route changes, commerce enablement, authenticated work, SEO/indexing launch, Vercel deployment, DNS mutation, or production data mutation.

Preserve current Sprint 029K public state:

- `https://precisionperformance.com.au` remains the noindex/nofollow marketing preview.
- Production deployment remains `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy` unless a later sprint changes it.
- No new public claims, pricing, checkout, testimonial content, score thresholds, Table of Knowledge recommendations, veterinary advice, or final commercial terms may be added.
- No secrets, raw horse data, confidential worksheets, proprietary formulas, identifiable stable data, real client data, or private operational records may be exposed.

## Branch Strategy

Preferred remote branch:

- `codex/029-marketing-preview-release`

Builder may use this exact branch unless it already exists with incompatible history. If it exists:

- inspect it first.
- if it already points to the same intended release lineage or an ancestor, update it safely.
- if it has unrelated/incompatible history, create a new branch name such as `codex/029-marketing-preview-release-20260726` and record why.

Builder must not push local `develop` broadly.

Builder must not create a PR unless the user separately asks for one.

## Git Requirements

Builder must protect unrelated dirty state.

Minimum Git requirements:

1. Record `git status --short --branch` before staging.
2. Record `git log --oneline origin/develop..HEAD`.
3. Record whether any uncommitted Sprint 029L files exist before branch push.
4. Decide whether to push the existing `HEAD` first or create one focused Sprint 029L closeout commit before pushing.
5. Use explicit path staging only for Sprint 029L files if committing.
6. Do not use `git add .`.
7. Inspect `git diff --cached --name-status` before commit.
8. Confirm no unrelated 021-series/auth/Supabase files are staged.
9. Push only the scoped release branch.
10. Verify the remote branch after push with `git ls-remote` or equivalent.

Acceptable push shapes:

- push current local `HEAD` to `codex/029-marketing-preview-release` if no 029L closeout commit is required first.
- create a focused Sprint 029L closeout commit and push that commit to `codex/029-marketing-preview-release`.

Do not attempt to rebase, squash, amend, reset, or rewrite the existing local ahead history in this sprint.

## Remote Backup Scope

The pushed branch may contain the existing local ahead commits because Sprint 029F through 029K are built on that local lineage. This is acceptable for a scoped release/review branch if:

- the branch name clearly marks it as the Sprint 029 marketing-preview release branch.
- `origin/develop` is not moved.
- uncommitted 021-series dirty work is not included.
- evidence records that older ahead commits are present in the branch history and still require separate repository reconciliation before any `develop` merge.

Builder must not claim this push reconciles `develop`.

## Required Production Verification

Before closeout, perform a light no-mutation public verification:

- `https://precisionperformance.com.au/` returns Sprint 029 markers and no old-page markers.
- hero image endpoint returns 200.
- Vercel inspect or prior 029K evidence still identifies the intended production deployment `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy`, unless unavailable; if unavailable, record that 029L did not change deployment.

Old markers to check:

- `Biochemistry Analysis for Elite Equine`
- `Apply Now`
- `Shop`
- `Testimonials`
- `Phone App Preview`
- `Members Experience`
- `Professional Kit`
- `Monthly Service`
- `$500 per test`

Sprint markers to check:

- `Equine Biochemistry`
- `Recovery Intelligence`
- `See what`
- `observation`
- `alone cannot`
- `show`
- `Request a Stable Trial`
- `Recreated sample`

## Required Validation

Run:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `git diff --check` for Sprint 029L touched files

If Builder unexpectedly edits runtime source, stop and reassess scope. Sprint 029L should not need source edits or builds.

## In Scope

Builder may:

- apply this Pack and verify the generated Sprint 029L file.
- inspect Git status/log/branch/remote metadata.
- create or update a scoped remote release branch for Sprint 029.
- create one focused Sprint 029L closeout commit if documentation/evidence changes are made.
- push the scoped branch.
- verify the pushed branch.
- update planning/status/evidence docs to record the remote backup.
- perform light public production verification without deploying.

## Out Of Scope

Builder must not:

- push local `develop` broadly.
- open a PR unless separately requested.
- rebase, squash, amend, reset, rewrite, revert, or delete existing history.
- clean up or resolve unrelated 021-series/auth/Supabase dirty work.
- deploy to Vercel.
- change DNS, Vercel settings, Vercel environment variables, Supabase, Stripe, auth/RLS, production databases, billing, checkout, catalogue, or production data.
- inspect, print, store, or commit secrets or secret fragments.
- change public page source/content/design or begin Sprint 022 product implementation.
- stage or commit unrelated 021-series files.

## Approved File Set

Builder may edit:

- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/DECISIONS.md`, only if a durable decision changed.
- `planning/RISKS.md`, only if active risk changed and the 021-series mixed diff can be safely avoided or intentionally isolated.
- `planning/QUESTIONS.md`, only if open questions changed and the 021-series mixed diff can be safely avoided or intentionally isolated.
- `planning/SPRINT_SCHEDULE.md`, only if schedule/current-status references changed and the 021-series mixed diff can be safely avoided or intentionally isolated.

Builder may create:

- `planning/sprints/029L-scoped-release-branch-and-remote-backup/SPRINT.md` through Pack application only.
- `planning/reviews/029L-scoped-release-branch-and-remote-backup-evidence.md`

Builder may inspect:

- Sprint 029 through 029K sprint/evidence files.
- Git status/log/branch/remote metadata.
- Vercel alias/deployment metadata required for light production provenance, without printing secrets.

Any file outside this set requires a stop unless it is a temporary non-secret command output captured inside the evidence file.

## Acceptance Criteria

1. Sprint 029L is applied as `planning/sprints/029L-scoped-release-branch-and-remote-backup/SPRINT.md`.
2. A scoped remote branch exists for Sprint 029 release backup, preferably `codex/029-marketing-preview-release`.
3. Remote branch verification records the remote SHA and branch name.
4. Evidence records which local commits ahead of `origin/develop` are included in the scoped branch.
5. Evidence records that `origin/develop` was not moved.
6. Unrelated 021-series/auth/Supabase dirty work remains uncommitted and unstaged.
7. Light public production verification passes or any failure is recorded without deploying.
8. Validation passes: `validate:json`, `validate:static`, and `git diff --check` for 029L touched files.
9. Planning/status/briefing/evidence docs identify the remote backup branch and remaining repository hygiene risk.
10. Closeout does not claim full public website completion, product Done, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, production readiness, or `develop` reconciliation.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly instead of leaving it implicit.

For each manual intervention, Builder must record:

- what is blocked or not working
- the evidence already checked
- the exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

Manual intervention is required if:

- Git authentication/push is unavailable.
- the preferred remote branch exists with incompatible history.
- a safe scoped branch push cannot be identified.
- public production verification fails.
- any command would expose secrets or secret fragments.

## Closeout

At sprint close, Builder must create:

- `planning/reviews/029L-scoped-release-branch-and-remote-backup-evidence.md`

At sprint close, Builder must update:

- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATUS.json`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/DECISIONS.md`, only if a durable decision changed
- `planning/RISKS.md`, only if active risk changed and safe isolation is possible
- `planning/QUESTIONS.md`, only if open questions changed and safe isolation is possible
- `planning/SPRINT_SCHEDULE.md`, only if current-status references changed and safe isolation is possible

Closeout must state exactly one final status:

- `scoped-release-branch-backed-up`
- `scoped-release-branch-partial`
- `blocked-scoped-release-branch`

Closeout must include:

- branch name and remote SHA
- push command/result
- included commit range
- confirmation that `origin/develop` was not moved
- remaining dirty-worktree boundaries
- light production verification
- validation evidence
- next recommended repository/product action

Do not close as `scoped-release-branch-backed-up` unless the scoped branch exists remotely, points to the intended release lineage, and unrelated dirty work remains isolated.
