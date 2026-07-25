# Sprint 029K Release State Hygiene And Vercel Cleanup Evidence

## Final Status

`release-state-hygiene-complete`

Sprint 029K applied the release-state hygiene Pack, reconciled the Sprint 029 release ledger, verified the intended production aliases after cleanup, removed the accidental temporary Vercel project, and documented the remaining repository boundaries.

This evidence does not establish full public website completion, product Done, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.

## Pack Application

- Architect Pack: `planning/architect-packs/architect-pack-029K-release-state-hygiene-and-vercel-cleanup.md`
- Applied sprint: `planning/sprints/029K-release-state-hygiene-and-vercel-cleanup/SPRINT.md`
- Pack validation: `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-029K-release-state-hygiene-and-vercel-cleanup.md --check` passed.
- Dry run: created only `planning/sprints/029K-release-state-hygiene-and-vercel-cleanup/SPRINT.md`.
- Applied run: created only `planning/sprints/029K-release-state-hygiene-and-vercel-cleanup/SPRINT.md`.

## Release-State Ledger

Pre-staging branch state:

```text
## develop...origin/develop [ahead 14]
```

Local commits ahead of `origin/develop` before the 029K closeout commit:

```text
52eb7a2 Close Sprint 029J rendered visual correction
14bc568 Fix Sprint 029J rendered marketing preview
227be71 Close Sprint 029I live public reconciliation
3c828ee Close Sprint 029H external alias smoke
5c04af6 Close Sprint 029G alias reconciliation
c3debef Close Sprint 029F deployment evidence
ce88697 Deploy Sprint 029F front page marketing preview
f37bbbd docs: close sprint 002B delivery consolidation
c961d4b chore: consolidate validation and project state
1d50719 docs: close sprint 017F repository baseline
9d74786 chore: establish post-sprint-021 repository baseline
171d3aa chore: establish sprint 017 repository baseline
8bf310a Update shop professional kit pricing
72f6f7f feat: implement Stripe checkout integration with database persistence and webhook handling
```

Sprint 029F through 029J provenance:

| Commit | Classification |
|---|---|
| `ce88697` | Sprint 029F source plus planning/evidence release commit: root marketing-preview page, validation script/lint bridge carried forward, status/docs/evidence, and Sprint 029 through 029F sprint files. |
| `c3debef` | Sprint 029F planning/evidence-only closeout after deployment evidence. |
| `5c04af6` | Sprint 029G planning/evidence-only alias reconciliation closeout. |
| `3c828ee` | Sprint 029H planning/evidence-only external alias smoke closeout. |
| `227be71` | Sprint 029I planning/evidence-only live public reconciliation closeout. |
| `14bc568` | Sprint 029J source plus sprint file commit: narrow `app/page.tsx` rendered/mobile correction and Sprint 029J sprint file. |
| `52eb7a2` | Sprint 029J planning/evidence-only closeout with visual artifacts. |

The production deployment remains traceable to source commit `14bc568` through Sprint 029J evidence and Vercel inspect. No later runtime source commit was created during 029K before cleanup verification.

`origin/develop` still lacks the deployed Sprint 029 release commits because local `develop` remains ahead and was not broadly pushed in this sprint.

Modified tracked files that remain dirty from unrelated 021-series/auth/Supabase or mixed pre-existing work:

```text
.env.example
.gitignore
app/(admin)/admin/memberships/actions.ts
app/(ops)/data-entry/biochemistry/actions.ts
docs/AUTH_RLS_PORTAL_ACCESS.md
docs/ENVIRONMENT.md
docs/SPRINT_021_PROGRESS.md
lib/auth/app-context.ts
lib/auth/bootstrap.ts
planning/DECISIONS.md
planning/PROJECT_SPRINT_LIST_2026-07-21.md
planning/QUESTIONS.md
planning/RISKS.md
planning/SPRINT_SCHEDULE.md
scripts/validate-supabase-clean-rebuild-020G.ps1
supabase/bootstrap/remote-init.sql
```

029-series Architect Pack files that remain untracked because historical Architect Packs were never committed:

```text
planning/architect-packs/architect-pack-029-public-front-page-marketing-preview-and-vercel-deployment.md
planning/architect-packs/architect-pack-029B-public-front-page-deployment-completion.md
planning/architect-packs/architect-pack-029C-validation-build-and-deployment-unblock.md
planning/architect-packs/architect-pack-029D-lint-build-workspace-and-deployment-proof.md
planning/architect-packs/architect-pack-029E-visual-smoke-stage-push-and-vercel-deploy.md
planning/architect-packs/architect-pack-029F-browser-proof-release-and-live-deployment.md
planning/architect-packs/architect-pack-029G-production-alias-reconciliation-and-public-smoke.md
planning/architect-packs/architect-pack-029H-external-public-alias-correction-and-final-smoke.md
planning/architect-packs/architect-pack-029I-live-public-content-reconciliation-and-hard-deploy.md
planning/architect-packs/architect-pack-029J-rendered-live-visual-reconciliation-and-deploy-correction.md
planning/architect-packs/architect-pack-029K-release-state-hygiene-and-vercel-cleanup.md
```

Recommended next repository action:

- Push a scoped release/review branch containing Sprint 029 through 029K commits after the operator chooses the desired remote branch strategy.
- Do not blindly push local `develop` until the older ahead commits and active 021-series dirty work are reconciled.
- Keep the existing local-only 021-series/auth/Supabase work isolated from Sprint 029 release provenance.

## Vercel Cleanup

Non-secret local Vercel link shape:

- `.vercel/project.json` exists.
- Properties present: `projectId`, `orgId`, `projectName`.
- `projectId` and `orgId` are present but were not printed.

Pre-cleanup inspect of the intended production aliases:

| Alias | Project | Deployment | Status |
|---|---|---|---|
| `https://precisionperformance.com.au` | `pnr-precision-performance` | `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy` | Ready |
| `https://www.precisionperformance.com.au` | `pnr-precision-performance` | `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy` | Ready |

Pre-cleanup inspect of the accidental temporary deployment:

| Deployment | Project | Production custom-domain aliases |
|---|---|---|
| `dpl_83Yatsa6D3ZmUTA8byspKqnAvPYT` | `pnr-029j-release-worktree-20260724210200` | None |

The temporary project was conclusively the unlinked Sprint 029J release-worktree project, not `pnr-precision-performance`. Its aliases were Vercel-generated only and did not include `precisionperformance.com.au`, `www.precisionperformance.com.au`, or `pnr-precision-performance.vercel.app`.

Cleanup command:

```text
npm.cmd exec -- vercel remove pnr-029j-release-worktree-20260724210200 --yes
```

Result:

```text
Success! Removed 1 project
- pnr-029j-release-worktree-20260724210200
```

Post-cleanup confirmation:

- `npm.cmd exec -- vercel inspect dpl_83Yatsa6D3ZmUTA8byspKqnAvPYT --timeout 2m` returned `Can't find the deployment`, confirming the temporary deployment is no longer fetchable in the Vercel project context.

No DNS, intended-project settings, Vercel environment variables, Supabase, Stripe, auth/RLS, production data, or secrets were changed.

## Production Alias Verification

Post-cleanup Vercel inspect:

| Alias | Project | Deployment | Status |
|---|---|---|---|
| `https://precisionperformance.com.au` | `pnr-precision-performance` | `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy` | Ready |
| `https://www.precisionperformance.com.au` | `pnr-precision-performance` | `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy` | Ready |

Post-cleanup public marker smoke:

| URL | Status | Sprint 029 markers | Old markers |
|---|---:|---|---:|
| `https://precisionperformance.com.au/` | 200 | descriptor pieces, headline pieces, CTA, recreated sample present | 0 |
| `https://www.precisionperformance.com.au/` | 200 | descriptor pieces, headline pieces, CTA, recreated sample present | 0 |
| `https://pnr-precision-performance.vercel.app/` | 200 | descriptor pieces, headline pieces, CTA, recreated sample present | 0 |

The long hero copy is split by markup for responsive rendering, so the check verified the visible phrase parts:

- `Equine Biochemistry`
- `Recovery Intelligence`
- `See what`
- `observation`
- `alone cannot`
- `show.`
- `Request a Stable Trial`
- `Recreated sample`

Old markers checked absent:

- `Biochemistry Analysis for Elite Equine`
- `Apply Now`
- `Shop`
- `Testimonials`
- `Phone App Preview`
- `Members Experience`
- `Professional Kit`
- `Monthly Service`
- `$500 per test`

Hero image endpoint:

| URL | Status | Content type | Content length |
|---|---:|---|---:|
| `https://precisionperformance.com.au/under-construction-thoroughbred.jpg` | 200 | `image/jpeg` | `394632` |

## Route-Safety Smoke

Post-cleanup route smoke against `https://precisionperformance.com.au`:

| Route | Result |
|---|---|
| `/` | `200`, title `Precision Performance` |
| `/home` | `200`, final `https://precisionperformance.com.au/` |
| `/contact` | `200`, final `https://precisionperformance.com.au/` |
| `/shop` | `200`, final `https://precisionperformance.com.au/` |
| `/shop/example` | `200`, final `https://precisionperformance.com.au/` |
| `/sign-in` | `200`, final `https://precisionperformance.com.au/sign-in`, title `Equine Precision Performance` |
| `/admin` | `200`, final `https://precisionperformance.com.au/sign-in?next=%2Fadmin`, title `Equine Precision Performance` |
| `/portal` | `200`, final `https://precisionperformance.com.au/sign-in?next=%2Fportal`, title `Equine Precision Performance` |
| `/data-entry` | `200`, final `https://precisionperformance.com.au/sign-in?next=%2Fdata-entry`, title `Equine Precision Performance` |
| `/api/checkout` | `405`, unavailable for safe GET |

## Validation

Passed after closeout file edits and before staging:

- `npm.cmd run validate:json`: passed.
- `npm.cmd run validate:static`: passed.
- `git diff --check -- docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md planning/STATE.md planning/STATUS.json planning/ARCHITECT_BRIEFING.md planning/EVIDENCE_INDEX.md`: passed with only expected CRLF working-copy warnings.

The untracked Sprint 029K sprint and evidence files were included in the subsequent explicit staging set and inspected through `git diff --cached --name-status` before commit.

## Git Staging And Push Outcome

Sprint 029K should stage only:

- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/sprints/029K-release-state-hygiene-and-vercel-cleanup/SPRINT.md`
- `planning/reviews/029K-release-state-hygiene-and-vercel-cleanup-evidence.md`

`planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/SPRINT_SCHEDULE.md`, `planning/DECISIONS.md`, and `planning/PROJECT_SPRINT_LIST_2026-07-21.md` already contain mixed pre-existing 021-series or unrelated diffs and were not edited for 029K.

Push outcome:

- No broad push of local `develop` is planned in 029K because `develop` is ahead by older local commits and unrelated dirty 021-series work remains unresolved.

## Manual Intervention

No blocking manual intervention remains for Sprint 029K.

Recommended operator follow-up:

1. Decide whether to push a scoped Sprint 029 release branch for review/backup.
2. Reconcile older local `develop` history separately before any broad `develop` push.
3. Continue treating the public page as a noindex/nofollow marketing preview until a later sprint authorizes public relaunch, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.
