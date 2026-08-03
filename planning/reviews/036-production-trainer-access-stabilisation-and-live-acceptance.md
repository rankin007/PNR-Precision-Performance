# Sprint 036 Production Trainer Access Stabilisation And Live Acceptance Review

Date: 2026-08-04

Outcome: `production-promotion-rolled-back-clean`

## Executive result

Sprint 036 used the permanent canonical repository and scoped branch `codex/036-production-trainer-access-stabilisation-and-live-acceptance`. The zero-source-change candidate passed deterministic validation, was committed and pushed, and deployed Ready to the exact Vercel Production project with automatic domain promotion explicitly disabled.

The deployment-level Vercel inspection response nevertheless listed one of the five stable aliases on the candidate. That post-state was unexpected under the approved release-control contract. Builder treated the ambiguity as material, did not begin human Production authentication, and immediately remapped all five named aliases to the recorded compatible rollback deployment. Independent per-alias resolution proves all five aliases now route to the Ready rollback and canonical public/protected route safety is restored.

The deployment-level alias list continued to list the same alias on the candidate after authoritative per-alias resolution proved that alias routed to rollback. The field is therefore not current routing authority and cannot retrospectively prove whether the alias moved automatically or was only reported as attached. No blind retry occurred. Stable live trainer access is not established by this sprint.

## Exact authority and candidate

- Canonical directory and Git top-level both resolved to `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.
- Exactly one canonical worktree registration remained; no retired legacy path or temporary worktree was used.
- Starting accepted authority was `7d1210ddef836867bfdb3cf4932a0dbafb701028`.
- Sprint 035K correction `76f66f5f9803e5d1f85a6dd3f71adf302b8a1810` is in ancestry.
- Current application/source bytes had no difference from the accepted Sprint 035K application candidate across the approved application paths.
- Sprint 035Q remained alternate non-authoritative history and contributed no content.
- Pack application generated exactly four targets and the post-application dry-run reported exactly those four targets as updates.
- Planning-only checkpoint `38ab1acc2776124ba8b54fd33eb346bf7f28f99a` was pushed to the scoped remote branch before deployment.
- No application source, test, package, schema, migration, RLS, permission, provider configuration, template, DNS, identity, fixture or data file changed.

## Fresh pre-mutation baseline

- Vercel project: `rankin007s-projects/pnr-precision-performance`, project ID `prj_6To7czLpCEGL6fInkQwE4egePPpq`.
- Accepted Production before Sprint 036 mutation: `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, Ready.
- Compatible rollback: `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, Ready.
- All five stable aliases independently resolved to the accepted Production deployment immediately before the Sprint 036 deployment.
- Approved Supabase project: `uvskssaecdhxcgytkasc`, healthy Production branch; prohibited old project `tagnbgkroihagjmvehlx` was not contacted.
- Production Site URL was `https://precisionperformance.com.au`; callback allowlist was exact Production callback only, with no wildcard.
- Custom SMTP remained enabled with the approved sender classification; the active message template remained one `.Token`, zero `ConfirmationURL`, zero links; email OTP remained six digits with 3600-second expiry and 60-second per-user cooldown.
- The retained Sprint 035K pilot ownership/fixture Verify completed through the protected wrapper with exit code 0. No protected input entered chat, commands, logs, screenshots, Git or durable evidence.

## Validation

- Sprint 035K focused suite: 89 assertions passed.
- Sprint 032 public controls: 12 assertions passed.
- Additional focused 035D/035C/035F/035 trainer OTP, redirect, bootstrap, recovery, dashboard and permission tests passed under the project-local Node 22 runtime.
- JSON self-test passed 8 cases and all 7 maintained JSON files parsed.
- Canonical roles, Supabase-self and static modes passed. Domain components through Sprint 031 plus direct Sprint 031C passed.
- The aggregate domain runner stopped only because the optional local `playwright-core` package was absent before Sprint 031B could start. No source byte changed from the accepted 035K baseline where the isolated transport proof had passed; the remaining current components and fresh live route/session boundaries supplied the accepted substitute evidence. No dependency installation or product change was made.
- TypeScript passed with `--noEmit --incremental false`.
- ESLint passed with zero warnings and zero errors.
- Next.js 15.3.8 Production build passed and generated all 29 static pages.
- Pack dry-run, JSON parsing, exact scope scan, high-confidence secret/private-identity scan and `git diff --check` passed before checkpoint publication.

## Production transaction and conservative rollback

1. Ignored local `.vercel/project.json` was created through exact project linking and verified against project ID `prj_6To7czLpCEGL6fInkQwE4egePPpq`; no tracked file changed.
2. Exact checkpoint SHA `38ab1acc2776124ba8b54fd33eb346bf7f28f99a` deployed with `--prod --skip-domain` and explicit source/branch metadata.
3. Candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf` at `pnr-precision-performance-k4rhrxq9d-rankin007s-projects.vercel.app` became Ready with target `production`; the custom source SHA and branch metadata matched exactly.
4. Deployment inspection unexpectedly listed `pnr-precision-performance-rankin007s-projects.vercel.app` as a candidate alias. Because that contradicted the required no-auto-promotion post-state, Builder stopped before any intentional candidate alias transaction or human sign-in.
5. All five aliases were immediately assigned to rollback raw deployment `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app`. Every assignment returned success.
6. Independent inspection of each alias proved deployment `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, target `production`, state Ready.
7. Canonical rollback smoke passed: `/` 200, `/sign-in` 200, `/api/health` 200, anonymous `/portal` 307 to `/sign-in?next=%2Fportal`.
8. The candidate deployment inspection still listed the same alias after the alias itself independently resolved to rollback. This establishes a Vercel reporting ambiguity, not a trustworthy record of current routing. The pre-rollback routing state was not reconstructed and the release was not retried.

The five exact aliases now on rollback are:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

## Privacy, data and provider reconciliation

- No OTP was requested and no Production human sign-in began.
- No mailbox, email address, OTP, session material, credential or private identifier was observed or retained.
- The retained adopted Auth identity and bounded eight-record synthetic pilot graph were verified and left governed/retained exactly as before.
- No Supabase/Auth setting, callback, template, SMTP setting, schema, RLS policy, role, permission, identity, fixture, Storage object or application data was changed.
- No DNS, public enquiry, commerce, scoring, recommendation, upload, voice, trend or unrelated public behavior changed.
- The old Supabase project and Participants A/B/C were not contacted.

## Acceptance disposition

The candidate Ready/source boundary passed, but the controlled no-auto-promotion boundary became materially ambiguous. The required two fresh Production code sign-ins, dashboard, assigned horse workspace/action, wrong-horse denial and sign-out evidence were deliberately not attempted after the rollback trigger.

Only `production-trainer-access-stable-live-accepted-clean` could open the downstream roadmap gate. This sprint instead closes `production-promotion-rolled-back-clean`; it is safe but does not satisfy the business outcome. Sprint 029N remains behind the gate.

## Exact next plan

Architect should choose deliberate non-promotion or create corrective follow-up Sprint 036B under the suffix rule. A 036B Pack should remain zero-source/provider-change by default and should:

1. obtain an authoritative per-alias pre-state and timestamped transition method rather than treating a deployment's historical/stale alias list as routing truth;
2. determine through read-only Vercel evidence whether `--skip-domain` can guarantee that all five aliases remain on the recorded safe deployment, including the project-level alias;
3. if that guarantee is available without source, DNS or provider configuration change, deploy one fresh exact remote-backed candidate and independently resolve all five aliases immediately before and after deployment;
4. remap exactly the five aliases only after that proof, with the same all-five rollback transaction on any discrepancy;
5. perform public/protected smoke before the two private Production sign-ins; and
6. stop with a new exact plan before any source, Supabase/Auth configuration, template, DNS, schema, permission, identity, fixture or data change.

No Sprint 036B implementation or external action is authorized by this review.
