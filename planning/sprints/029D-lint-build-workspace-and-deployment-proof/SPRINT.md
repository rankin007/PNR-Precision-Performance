# Sprint 029D - Lint Build Workspace And Deployment Proof

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for public visibility, secrets, production deployment, auth/RLS, schema, Supabase, Stripe, billing, remote data, destructive actions, generated-cache cleanup, reparse-safe build workspace, and external service mutation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029D is a corrective follow-up to Sprint 029, 029B, and 029C. It keeps the same core sprint number and uses suffix `D` under the project numbering rule. It must not reopen earlier 029 work as a broad feature sprint, consume Sprint 030, or expand into Sprint 022 product work.

## Starting Point

- Branch recorded in current state: `develop`.
- Sprint `029-public-front-page-marketing-preview-and-vercel-deployment` is applied and locally built.
- Sprint `029B-public-front-page-deployment-completion` corrected the suspect root page width/layout classes in `app/page.tsx`.
- Sprint `029C-validation-build-and-deployment-unblock` corrected `package.json` scripts so validation/build commands resolve project-local Node 22.14.0 through `npm exec -- node ...`.
- Sprint 029C confirmed `npm.cmd run validate:json`, `npm.cmd run validate:static`, and `npm.cmd run typecheck` pass.
- Sprint 029C proved Next production build can compile once after generated-cache cleanup, then it stalled at `Linting and checking validity of types ...`.
- Direct ESLint isolated the first current blocker: installed ESLint 9.39.4 expects `eslint.config.*`, while the repo still uses `.eslintrc.json`.
- Diagnostic `next build --no-lint` exposed the second current blocker: OneDrive Cloud Files/reparse metadata on generated `.next` output can trigger `readlink '.next\\package.json'` failures.
- Vercel target content remains unconfirmed from `.vercel/project.json`.
- Rendered/browser smoke and deployed smoke have not run after the latest corrections.
- No commit, push, or deployment has occurred.
- The worktree still contains extensive unrelated active Sprint 021AA dirty state outside Sprint 029/029B/029C/029D scope.

Builder must not deploy until lint, full production build, Vercel target confirmation, rendered smoke, and sprint-only staging all pass.

## Goal

Complete the remaining technical proof needed to safely deploy the Sprint 029 marketing-preview front page.

The useful outcome is a clean, evidence-backed deployment path:

1. ESLint 9/Next linting is aligned.
2. A reparse-safe production build path is proven.
3. Local route/render smoke passes.
4. Vercel target is confirmed without secrets or settings mutation.
5. Only Sprint 029/029B/029C/029D files are staged and committed.
6. The branch is pushed and deployed only if all prior gates pass.
7. Deployed route/safety smoke passes.

If any required gate remains blocked, Builder must stop and close 029D with exact manual-intervention evidence.

## Required Reading

Builder must read before source edits, cleanup, staging, push, or deployment:

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
14. `planning/sprints/029-public-front-page-marketing-preview-and-vercel-deployment/SPRINT.md`
15. `planning/sprints/029B-public-front-page-deployment-completion/SPRINT.md`
16. `planning/sprints/029C-validation-build-and-deployment-unblock/SPRINT.md`
17. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
18. `planning/reviews/029B-deployment-completion-evidence.md`
19. `planning/reviews/029C-validation-build-and-deployment-unblock-evidence.md`
20. current public route files for `/`, `/home`, `/contact`, `/shop`, `/shop/[slug]`, and `/sign-in`
21. route/auth layout files needed only to verify anonymous protected-route safety

## Product And Messaging Requirements

Sprint 029D does not authorize new public marketing content except narrow correction needed to preserve or verify the existing front page.

Preserve Sprint 029/029B/029C messaging:

- Technology supports trainer judgment; it does not replace trainers, veterinarians, or qualified professionals.
- Use qualified language such as supports more informed decisions, helps identify changes over time, trend-based visibility, individual baseline, trainer judgement, and professional veterinary review where needed.
- Avoid diagnosis, prediction, guarantee, proof claims, veterinary replacement, final score thresholds, Table of Knowledge recommendations, pricing, checkout, or final commercial terms.
- Do not expose raw horse spreadsheets, pathology records, confidential worksheets, proprietary formulas, identifiable stable data, real client data, private operational records, secrets, or secret fragments.
- Use recreated/anonymised presentation examples only.
- Keep `noindex` and `nofollow` unless a later source authority explicitly changes SEO/indexing status. Sprint 029D does not authorize indexing launch.

## Lint Alignment Requirements

Builder must align linting with the installed dependency set without changing product behavior.

Expected current condition:

- `eslint` is v9.x.
- `eslint-config-next` is `15.3.8`.
- existing config is `.eslintrc.json`.
- direct ESLint reports missing `eslint.config.(js|mjs|cjs)`.

Allowed approaches:

- create a minimal `eslint.config.mjs` or `eslint.config.js` that faithfully wraps or translates the existing Next recommendations for ESLint 9.
- use `@eslint/eslintrc` `FlatCompat` if it is the smallest compatible bridge and uses already installed packages.
- keep `.eslintrc.json` only if needed for compatibility, but ensure the project lint command uses the working ESLint 9 path.
- adjust `package.json` lint script only if diagnostics prove the current script path is obsolete or incompatible.

Controls:

- Do not suppress lint broadly.
- Do not disable `next/core-web-vitals` or TypeScript-related lint coverage without recording a specific failing rule and rationale.
- Do not downgrade, upgrade, install, or remove dependencies unless the current sprint explicitly stops for approval and approval is granted separately.
- Do not make broad source edits for unrelated lint style issues unless required for the front-page deployment gate and within approved files.
- If lint now reports real code issues outside the approved file set, stop and record them rather than rewriting unrelated 021AA work.

## Reparse-Safe Build Workspace Requirements

Builder must prove a build path that avoids OneDrive-generated `.next` reparse metadata failures.

Preferred approaches, in order:

1. Use a clean non-OneDrive worktree or copy under an approved writable non-OneDrive workspace such as `C:\Users\rrank\.codex\visualizations\2026\07\24\019f91b9-2d62-7eb3-87f5-3b725e3ce83f\029D-build-workspace`, if available.
2. Use a temporary project-root generated-output strategy only if it demonstrably avoids OneDrive reparse metadata.
3. Use Vercel preview/build proof only after local lint/build gates and target confirmation are otherwise sufficient and no secrets/settings mutation is required.

Controls for a copied or secondary workspace:

- Copy only the files needed for build proof.
- Exclude `.git/**`, `.env*`, `.vercel/**`, `node_modules/**` unless explicitly needed and safe.
- Do not copy secret values.
- Do not commit from the copied workspace.
- Treat copied output as disposable evidence only.
- Record source path, target path, copy exclusions, and validation commands.
- If dependency installation would be required in the copied workspace, stop for approval before network access or package download.

Controls for generated-cache cleanup:

- Cleanup may remove `.next/**` under the project root only after resolving and recording the absolute path.
- Cleanup may remove TypeScript incremental cache files under the project root only.
- Do not delete source files, planning files, public assets, `.env*`, `.vercel/**`, `node_modules/**`, `.git/**`, Supabase migrations, or unrelated Sprint 021AA files.

## Vercel Target Requirements

Builder must confirm the Vercel target before deployment without exposing secrets or mutating settings.

Allowed target confirmation methods:

- read `.vercel/README.txt`.
- inspect `.vercel/project.json` only for non-secret project/org identifier shape or target confirmation; do not commit it and do not print sensitive/private values unnecessarily.
- use Vercel CLI read-only project/status commands if available and authenticated, provided no settings or environment variables are changed.
- ask the operator to confirm the project target manually if local metadata remains unreadable.

Builder must not:

- print secret values or fragments.
- read `.env*` values.
- change Vercel project settings.
- change Vercel environment variables.
- change DNS.
- deploy if the target remains ambiguous.

## Public Visibility Policy

Sprint 029D may complete the front-page marketing preview deployment only after required lint/build, target confirmation, worktree isolation, and route smoke pass.

The sprint must still preserve safety:

- Public shop checkout must remain disabled, redirected, or clearly unavailable.
- `/home`, `/contact`, `/shop`, and `/shop/[slug]` must not expose stale or conflicting unfinished public content by accident.
- Existing authenticated, portal, admin, ops, Supabase, Stripe, webhook, and checkout protections must not be weakened.
- No new stored lead capture, mailing-list provider, CRM integration, email API, webhook, CMS, upload, voice, Supabase, Stripe, commerce, schema, or auth behavior may be added.
- Vercel project settings, DNS, environment variables, Supabase, Stripe, production databases, and production data must not be mutated.

If deployment would expose more than the Sprint 029/029B/029C/029D front-page marketing preview or reopen unfinished shop/contact/checkout/auth/admin/portal/ops behavior, Builder must stop and record manual intervention.

## In Scope

Builder may:

- apply this Pack and verify the generated Sprint 029D file.
- inspect current worktree status and identify sprint-related versus unrelated dirty files.
- align ESLint 9 flat config with the existing Next/TypeScript lint intent.
- adjust `package.json` lint/build scripts only where diagnostics prove it is needed for the approved validation path.
- perform bounded generated-cache cleanup with path controls.
- create a reparse-safe build workspace under an approved writable non-OneDrive path for validation evidence only.
- make narrow source fixes only if lint/build diagnostics identify a real Sprint 029/029B/029C-introduced issue within the approved file set.
- preserve existing route redirects/unavailable behavior for `/home`, `/contact`, `/shop`, and `/shop/[slug]`.
- inspect protected route behavior only enough to verify anonymous route safety.
- confirm Vercel target through safe read-only methods.
- run local validation and production build.
- run rendered local or preview browser smoke for `/` and route safety.
- stage only Sprint 029/029B/029C/029D files.
- create an intentional Sprint 029D commit.
- push the sprint branch or agreed branch to the configured remote.
- deploy through the confirmed existing Vercel project workflow.
- run post-deployment smoke checks for deployed front page rendering, route redirects, checkout unavailable behavior, and anonymous protected-route safety.
- update Sprint 029/029B/029C/029D closeout documentation and current planning/status files with evidence-backed results.

## Out Of Scope

Builder must not:

- implement new public sections or a redesign beyond narrow corrections required by diagnostics.
- add CMS, blog/Insights publishing, database content model, or new backend architecture.
- add Supabase schema, migrations, RLS, roles, permissions, Storage, uploads, OCR, voice, providers, or remote data mutation.
- change auth, portal, admin, ops, callback, webhook, or protected route behavior except to confirm it remains protected.
- add Stripe checkout behavior, public purchasing, billing, catalogue mutation, price changes, webhook changes, or commerce enablement.
- create stored lead capture, mailing-list integration, CRM integration, email API, webhook, or third-party marketing automation.
- invent production scoring thresholds, pH rules, Table of Knowledge recommendations, veterinary advice, or final score terminology.
- publish confidential formulas, raw pathology, raw worksheets, private horse/stable data, or identifiable people/horses without approved releases.
- delete historical pages or source files merely because they are not part of the front page.
- mutate DNS, Supabase, Stripe, production databases, Vercel project settings, or environment variables.
- inspect or expose secret values or secret fragments.
- stage, commit, push, deploy, revert, delete, or rewrite unrelated active Sprint 021AA work.
- delete `node_modules/**`, `.git/**`, `.vercel/**`, `.env*`, public assets, planning evidence, source files, Supabase migrations, or unrelated dirty files.
- install, remove, upgrade, or downgrade packages without separate approval.
- resume, retry, modify, or close any Sprint 021AA/021Z authenticated proof work.
- begin Sprint 022 product implementation.

## Approved File Set

Builder may edit:

- `eslint.config.js`
- `eslint.config.mjs`
- `.eslintrc.json`, only to preserve compatibility or document supersession
- `package.json`, only for approved lint/build script corrections
- lockfile only if a package manager command changes it without dependency install; otherwise stop
- `app/page.tsx`, only for diagnostics-backed front-page fixes
- `app/(marketing)/home/page.tsx`, only to preserve redirect/alignment with `/`
- `app/contact/page.tsx`, only to preserve safe redirect/unavailable behavior
- `app/shop/page.tsx`, only to preserve safe redirect/unavailable behavior
- `app/shop/[slug]/page.tsx`, only to preserve safe redirect/unavailable behavior
- `app/layout.tsx`, only for safe public metadata/noindex handling and no secret/config changes
- `components/**`, only for narrow front-page rendering corrections if existing components are involved
- `styles/**` or global CSS files, only for narrow front-page/design-token presentation corrections
- `tailwind.config.ts`, only if needed to correct an existing token/class issue without changing product behavior
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/EVIDENCE_INDEX.md`

Builder may create:

- `planning/sprints/029D-lint-build-workspace-and-deployment-proof/SPRINT.md` through Pack application only.
- focused evidence/review files under `planning/reviews/` to record lint migration, build workspace proof, cache cleanup, worktree isolation, route smoke, target confirmation, deployment smoke, or manual intervention.

Generated cleanup may remove:

- `.next/**` under the project root only.
- TypeScript incremental cache files under the project root only.
- disposable copied build workspace content under the approved non-OneDrive workspace path created for 029D only.

Inspection-only unless needed for route smoke verification:

- `app/(admin)/**`
- `app/(portal)/**`
- `app/(ops)/**`
- `app/auth/**`
- `app/api/**`
- `lib/auth/**`
- `lib/supabase/**`
- `supabase/**`
- `.env*` names/presence only, never values
- `.vercel/**` names/config shape only, never secrets

Any file outside this set requires a stop with exact scope-expansion rationale.

## Worktree Isolation Requirements

Builder must protect unrelated dirty state before commit, push, or deployment.

Minimum required checks:

1. Record `git status --short` before staging.
2. Identify the exact files intended for Sprint 029D staging.
3. Confirm no unrelated 021AA files are staged.
4. Use explicit path staging, not broad `git add .`.
5. Inspect staged diff before commit.
6. If a clean branch/worktree is needed, create or use it without deleting or reverting unrelated work.

If Sprint 029/029B/029C/029D files cannot be isolated without risking unrelated work, Builder must stop and record manual intervention.

## Acceptance Criteria

1. Sprint 029D is applied as `planning/sprints/029D-lint-build-workspace-and-deployment-proof/SPRINT.md`.
2. ESLint 9/Next linting is aligned through a narrow config/script change.
3. `npm.cmd run validate:json` passes.
4. `npm.cmd run validate:static` passes.
5. `npm.cmd run typecheck` passes.
6. `npm.cmd run lint` passes or is replaced by an equivalent documented Next/ESLint 9 lint command that passes.
7. `npm.cmd run build` passes in a reparse-safe path.
8. Any generated-cache cleanup is limited to allowed project-root generated targets and recorded with path evidence.
9. Any copied/non-OneDrive build workspace is documented with source path, target path, exclusions, and proof that it contains no copied secret files.
10. `/` renders a polished, responsive public front page aligned to the accepted design and messaging authority.
11. `/home`, `/contact`, `/shop`, and `/shop/[slug]` remain redirected, blocked, hidden, or clearly unavailable as recorded.
12. Checkout remains unavailable through public routes and direct checkout access does not create a live purchase path.
13. Anonymous protected-route checks show portal/admin/ops boundaries are not weakened.
14. Mobile, tablet, desktop, keyboard, and basic accessibility/render checks pass for the front page, or limitations are recorded with exact evidence.
15. Vercel target is confirmed through a safe method without changing settings or exposing secrets.
16. Staged files are limited to Sprint 029/029B/029C/029D approved scope.
17. The sprint result is committed intentionally and pushed to the configured remote only after staging is confirmed.
18. The result is deployed through the confirmed Vercel project path only if all required gates pass.
19. Deployed smoke confirms front page rendering, route redirect/unavailable behavior, checkout unavailable behavior, and anonymous protected-route safety.
20. Documentation records lint alignment, build workspace proof, any cleanup, page corrections, claims boundaries, route visibility, validation, deployment target, smoke results, worktree isolation, and any remaining manual intervention.
21. Closeout does not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness.

## Validation Plan

Run commands sequentially:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run build`

If all component commands pass and the aggregate command is stable enough to be useful, run:

- `npm.cmd run validate:local`

If a command hangs:

- record timeout duration.
- record last visible output.
- check for owned stuck local processes.
- narrow whether the hang appears before or after TypeScript/Next startup.
- do not proceed to deploy until the required gate is green or the sprint is closed blocked.

Rendered local or preview smoke must cover:

- `/`
- `/home`
- `/contact`
- `/shop`
- `/shop/[slug]`
- `/sign-in`
- anonymous protected routes sufficient to confirm no portal/admin/ops weakening
- direct checkout unavailable/redirect behavior if locally testable

Viewport checks must cover:

- mobile phone width
- tablet width
- desktop width
- keyboard traversal
- contrast/readability of CTA and status/preview elements
- no obvious text overlap, clipping, or awkward overflow

Deployment smoke must repeat the public and safety checks against the deployed URL if deployment occurs.

## Git, Push, And Vercel Deployment

Builder may create or use a branch named:

`codex/029D-lint-build-workspace-and-deployment-proof`

If another branch is safer due to current worktree state, Builder must record the reason and preserve unrelated work.

Commit message should clearly identify Sprint 029D, for example:

`Prove Sprint 029D front page deployment path`

Builder must stop before:

- broad staging or committing unrelated files.
- pushing unrelated or unresolved active Sprint 021AA changes.
- force-pushing or rewriting shared history.
- changing DNS.
- changing Vercel project settings or environment variables.
- deploying if target metadata cannot be confirmed safely.
- deploying a build that exposes unfinished shop/checkout/auth/admin/portal/ops behavior publicly.
- deploying if local validation indicates a material safety or build failure.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly instead of leaving it implicit.

For each manual intervention, Builder must record:

- what is blocked or not working
- the evidence already checked
- the exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

Manual intervention is required if:

- ESLint 9/Next lint alignment requires dependency changes.
- a reparse-safe local build workspace cannot be created without copying secrets or requiring network/dependency installation.
- generated-cache cleanup requires user approval and approval is not available.
- the active 021AA dirty state cannot be safely isolated.
- `.vercel/project.json` or equivalent Vercel target metadata cannot be read safely.
- Vercel authentication is unavailable.
- deployment target selection is unclear.
- local or preview browser smoke cannot be completed.
- deployment exposes a broader public surface than Sprint 029D permits.
- any command would require exposing secrets or secret fragments.

## Closeout

At sprint close, Builder must update:

- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATUS.json`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/DECISIONS.md`, only if a durable decision changed
- `planning/RISKS.md`, only if active risk changed
- `planning/QUESTIONS.md`, only if open questions changed
- `planning/SPRINT_SCHEDULE.md`, only if schedule/current-status references changed

Builder must also create or update a focused 029D evidence file under `planning/reviews/`.

Closeout must state one final status:

- marketing-preview deployed
- deployed but gated/preview-only
- blocked before deployment
- deployed but requiring follow-up corrections

Closeout must include:

- lint alignment details and final command results
- reparse-safe build workspace or output-path proof
- cache/process cleanup performed, if any
- exact files staged and committed, if commit occurs
- branch name, commit hash, and push result, if push occurs
- Vercel project/target confirmation method without secrets
- deployment URL, if deployment occurs
- local and deployed smoke evidence
- remaining manual intervention, if any

Do not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness from this sprint.
