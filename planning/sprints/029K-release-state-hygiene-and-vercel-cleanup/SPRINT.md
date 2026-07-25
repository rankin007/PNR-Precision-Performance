# Sprint 029K - Release State Hygiene And Vercel Cleanup

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for Git branch/history handling, push strategy, Vercel project/deployment cleanup, production alias verification, secrets, auth/RLS, schema, Supabase, Stripe, billing, production data, destructive actions, and unrelated dirty-worktree isolation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029K is a release-state hygiene follow-up to Sprint 029 through Sprint 029J. It keeps the same core sprint number and uses suffix `K` under the project numbering rule. It must not consume Sprint 030, reopen Sprint 022, or expand into full public website/product/commerce/authenticated/SEO launch work.

## Starting Point

- Sprint 029J is closed as `rendered-live-marketing-preview-corrected`.
- Production marketing-preview deployment is `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy` on the intended Vercel project `pnr-precision-performance`.
- Live URL: `https://precisionperformance.com.au`.
- Sprint 029J evidence records apex/`www` rendered parity screenshots at desktop/tablet/mobile widths and live hero image endpoints returning 200.
- Direct no-cache public review after 029J returned Sprint 029 markers and no old markers.
- Search/index/web-render surfaces may still show stale old-page content; treat those as cache/index evidence unless live no-cache public fetch reproduces them.
- `develop` is ahead of `origin/develop` by 14 local commits.
- Existing unrelated active 021-series/auth/Supabase dirty work remains present and must not be staged, pushed, reverted, deleted, or rewritten in this sprint.
- `planning/RISKS.md` and `planning/SPRINT_SCHEDULE.md` contain mixed pre-existing 021-series diffs and remained unstaged in 029J.
- An accidental temporary Vercel project/deployment was created by an initial unlinked Sprint 029J release-worktree deploy attempt: `dpl_83Yatsa6D3ZmUTA8byspKqnAvPYT`. It was not aliased to production and was not used as evidence.

## Goal

Stabilize Sprint 029 release-control state so future Builder work starts from a clear, traceable baseline.

The target outcome is `release-state-hygiene-complete`: the intended production deployment and aliases are rechecked, the accidental temporary Vercel deployment/project is either safely removed or documented with exact manual cleanup instructions, Sprint 029 commits/artifacts are clearly traceable, and the repository push/staging position is documented without disturbing unrelated 021-series work.

This sprint does not make new public website/product changes. It is a housekeeping and release-control sprint after the successful Sprint 029J rendered deployment correction.

## Required Reading

Builder must read before Git actions, Vercel commands, cleanup, push, or documentation edits:

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
14. `planning/sprints/029J-rendered-live-visual-reconciliation-and-deploy-correction/SPRINT.md`
15. `planning/reviews/029J-rendered-live-visual-reconciliation-and-deploy-correction-evidence.md`
16. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`

## Product And Messaging Boundary

Sprint 029K does not authorize marketing-page redesign, content changes, route changes, commerce enablement, authenticated work, SEO/indexing launch, or product implementation.

Preserve current Sprint 029J public state:

- `https://precisionperformance.com.au` remains the noindex/nofollow marketing preview.
- The approved rendered Sprint 029 presentation remains unchanged.
- No new public claims, pricing, checkout, testimonial content, score thresholds, Table of Knowledge recommendations, veterinary advice, or final commercial terms may be added.
- No secrets, raw horse data, confidential worksheets, proprietary formulas, identifiable stable data, real client data, or private operational records may be exposed.

## Required Release-State Reconciliation

Builder must create a concise release-state ledger covering:

- current branch and `git status --short --branch`.
- local commits ahead of `origin/develop`, at least from Sprint 029F through 029J and any 029K closeout commit.
- which commits contain source changes versus planning/evidence-only changes.
- whether the production deployment source is traceable to commit `14bc568` or a later intended commit.
- whether `origin/develop` lacks deployed Sprint 029 changes.
- exact files that remain dirty from unrelated 021-series/auth/Supabase work.
- exact 029-series files that remain untracked because historical Architect Packs were never committed.
- recommended next repository action after 029K: push a sprint/release branch, open PR, reconcile `develop`, or leave local-only with documented risk.

Builder must not solve the whole 021 dirty worktree problem unless a specific file is required for 029K evidence/status and is safely within the approved file set.

## Required Production Alias Verification

Builder must perform read-only public/Vercel checks after any cleanup action and before closeout:

- `https://precisionperformance.com.au/` returns Sprint 029 markers and no old-page markers.
- `https://www.precisionperformance.com.au/` returns Sprint 029 markers and no old-page markers.
- `https://pnr-precision-performance.vercel.app/` returns Sprint 029 markers and no old-page markers.
- hero image endpoint returns 200 on apex.
- Vercel inspect maps apex and `www` to the intended `pnr-precision-performance` project and deployment `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy` or a later intended deployment.
- final route-safety smoke still passes for root, stale public redirects, sign-in, anonymous protected routes, and safe checkout GET unavailable behavior.

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

- `Equine Biochemistry and Recovery Intelligence`
- `See what observation alone cannot show.`
- `Request a Stable Trial`
- `Recreated sample, not live horse data`

## Vercel Temporary Deployment Cleanup

Builder must inspect the accidental temporary Vercel deployment/project without exposing secrets.

Known temporary deployment:

- `dpl_83Yatsa6D3ZmUTA8byspKqnAvPYT`

Builder may remove the temporary Vercel project/deployment only if all of the following are true:

- it is conclusively identified as the unlinked Sprint 029J release-worktree deploy target.
- it is not the intended `pnr-precision-performance` project.
- it has no production custom-domain aliases.
- it is not mapped to `precisionperformance.com.au`, `www.precisionperformance.com.au`, or `pnr-precision-performance.vercel.app`.
- deletion can be done without exposing secrets and without changing DNS, environment variables, project settings on the intended project, or production aliases.

If any condition is unclear, Builder must not delete it. Instead, record exact manual cleanup instructions for the operator.

After any deletion/cleanup, Builder must re-run production alias verification.

## Git And Push Strategy

Builder must protect unrelated dirty state.

Minimum Git requirements:

1. Record `git status --short --branch` before staging.
2. Record `git log --oneline origin/develop..HEAD`.
3. Identify exact files to stage for 029K.
4. Use explicit path staging only.
5. Do not use `git add .`.
6. Inspect `git diff --cached --name-status` before commit.
7. Confirm no unrelated 021-series/auth/Supabase files are staged.
8. If committing, create one focused Sprint 029K closeout commit.
9. If pushing, push only a sprint/release branch or other clearly safe branch/path that does not blindly publish unrelated dirty 021-series work.

Builder may push only if the pushed history and target branch are clearly scoped and safe. Builder must not blindly push local `develop` while it is ahead by older unrelated commits unless the user separately and explicitly directs that repository reconciliation.

## Approved Remote Actions

Builder may:

- run read-only Vercel inspect/list commands.
- delete/remove the accidental temporary Vercel project/deployment only if it satisfies the safe cleanup conditions above.
- push a sprint-only/release branch if needed to preserve Sprint 029 release provenance.

Builder must stop before:

- DNS changes.
- Vercel project settings changes on the intended project.
- Vercel environment-variable changes.
- Supabase, Stripe, auth/RLS, production database, or production data mutation.
- secret inspection or secret output.
- destructive Git commands.
- broad pushing of local `develop`.
- staging/committing unrelated Sprint 021-series files.

## Required Validation

Run:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `git diff --check` for Sprint 029K touched files

If Builder edits runtime source unexpectedly, stop and reassess scope before build/deploy. Sprint 029K should not need source edits.

## In Scope

Builder may:

- apply this Pack and verify the generated Sprint 029K file.
- inspect Git history/status and produce a release-state ledger.
- inspect and, if safe, clean up the accidental temporary Vercel deployment/project.
- verify production aliases, hero asset, and route safety after cleanup.
- update planning/status/evidence docs to reflect release-state hygiene.
- create a focused Sprint 029K closeout commit.
- push a safe sprint/release branch if it does not broaden scope or publish unrelated dirty work.

## Out Of Scope

Builder must not:

- change the public page design/content/source unless a live production regression is newly discovered; if so, stop for a new corrective sprint.
- deploy a new production build unless production alias verification fails and the cause is within Sprint 029J/029K approved correction boundaries.
- begin Sprint 022 product implementation.
- clean up or resolve unrelated 021-series/auth/Supabase dirty work.
- mutate DNS, Vercel intended-project settings, Vercel environment variables, Supabase, Stripe, production databases, auth/RLS, billing, catalogue, checkout, or secrets.
- delete any Vercel project/deployment whose identity, ownership, alias status, or safety is ambiguous.
- rewrite Git history, run destructive Git commands, or push local `develop` broadly.

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

- `planning/sprints/029K-release-state-hygiene-and-vercel-cleanup/SPRINT.md` through Pack application only.
- `planning/reviews/029K-release-state-hygiene-and-vercel-cleanup-evidence.md`

Builder may inspect:

- Sprint 029 through 029J sprint/evidence files.
- `.vercel/**` names/config shape only, never secrets.
- Git log/status/diff metadata.
- Vercel project/deployment metadata required for safe cleanup.

Any file outside this set requires a stop unless it is a temporary non-secret command output captured inside the evidence file.

## Acceptance Criteria

1. Sprint 029K is applied as `planning/sprints/029K-release-state-hygiene-and-vercel-cleanup/SPRINT.md`.
2. Release-state ledger records branch, ahead commits, Sprint 029 commit provenance, dirty/untracked boundaries, and recommended next repository action.
3. Production aliases and hero asset are reverified after any cleanup action.
4. Temporary Vercel deployment/project `dpl_83Yatsa6D3ZmUTA8byspKqnAvPYT` is safely removed or documented with exact manual cleanup instructions.
5. No DNS, intended Vercel project settings, environment variables, Supabase, Stripe, auth/RLS, production data, secrets, or unrelated 021-series files are mutated.
6. Validation passes: `validate:json`, `validate:static`, and `git diff --check` for 029K touched files.
7. Evidence records all checks, any cleanup command/results, remaining risks, and next recommended repo action.
8. Closeout does not claim full public website completion, product Done, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly instead of leaving it implicit.

For each manual intervention, Builder must record:

- what is blocked or not working
- the evidence already checked
- the exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

Manual intervention is required if:

- Vercel authentication is unavailable.
- the temporary Vercel project/deployment identity is ambiguous.
- temporary cleanup requires project deletion privileges Builder lacks.
- production alias verification fails.
- a safe push strategy cannot be identified without resolving unrelated `develop` history.
- any command would expose secrets or secret fragments.

## Closeout

At sprint close, Builder must create:

- `planning/reviews/029K-release-state-hygiene-and-vercel-cleanup-evidence.md`

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

- `release-state-hygiene-complete`
- `release-state-hygiene-partial`
- `blocked-release-state-hygiene`

Closeout must include:

- release-state ledger
- production alias verification
- Vercel temporary deployment/project cleanup result or manual instructions
- Git staging/commit/push outcome
- validation evidence
- remaining dirty-worktree risks
- next recommended repository action

Do not close as `release-state-hygiene-complete` unless production aliases remain correct, the temporary Vercel issue is either safely cleaned or precisely documented, and unrelated dirty work remains isolated.
