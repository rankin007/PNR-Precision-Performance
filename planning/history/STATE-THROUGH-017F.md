# Archived Project State Through Sprint 017F

Archived: 2026-07-22
Source: `planning/STATE.md`
Status: Superseded by the concise 002B current-state record. The source text below is preserved as historical evidence and is not current authority.

---

# Project State

**Project:** Precision Performance
**Client:** Aprec8 Pty Ltd
**Mode:** Existing Project / Feature or Fix

---

## Current Status

Sprint `017F-repository-baseline-completion` is closed **local-baseline-complete**. Builder mechanically repaired all 28 recorded whitespace findings, added deterministic Node JSON validation, documented proportionate governance, validated a fresh 278-path manifest through the complete credential-free suite, and created the two required local commits. The repository finishes on `develop` with an empty index and no non-ignored working entries. No remote, protected, production, deployment, billing, provider, migration, authenticated-proof, or product-behavior action occurred. Next planning should combine validation/CI and planning consolidation rather than create another Sprint 017 repository child.

Sprint `017E-validator-reconciliation-and-local-baseline-completion` is closed **baseline-blocked-clean**. The exact `0001`–`0012` validator correction passed independently, and Builder staged a fresh 271-path manifest using literal pathspecs. Manifest equality, exclusions, and 27 Pack checks passed, but mandatory `git diff --cached --check` found pre-existing whitespace errors outside the approved edit set. Builder unstaged only manifest paths, preserved every working file, and restored the empty index. Branch `develop` and HEAD `171d3aa` remain unchanged; no commit or remote action occurred. Sprint 017F must reconcile staged whitespace and deterministic JSON parsing before another baseline attempt.

Sprint `017D-intentional-staging-and-local-baseline-commit` is closed **baseline-blocked-clean**. Builder applied the strict four-file Pack, built a 263-path exact manifest, staged every candidate individually, and passed manifest equality, exclusions, 25 Pack checks, five JSON parses, secret/binary/mode safety, diff checks, and credential-free validators through Sprint 020F. The mandatory Sprint 020G clean-rebuild validator then failed because it still requires exactly migrations `0001`–`0010`, while accepted repository history includes `0011` and `0012`. Builder stopped, unstaged only the exact manifest paths, preserved all working files, and restored the empty index. Branch `develop` and HEAD `171d3aa` remain unchanged; no commit or remote action occurred. A follow-up Pack must reconcile the validator before baseline staging is retried.

Sprint `017C-repository-treatment-and-boundary-reconciliation` is closed **treatment-complete**. Root `.release-main/` and `.claude/` remain present and unchanged as local-only boundaries, now ignored by exact anchored rules. `samples/README.md` remains byte-identical and unignored as a 017D project-scaffold candidate. `Sprint list 190726.docx` moved byte-identically to `references/client-docs/Sprint list 190726.docx`. Branch `develop`, HEAD `171d3aa`, and the empty Git index remain unchanged. No staging, commit, protected-content access, remote action, or 017D work occurred.

Sprint `017B-repository-reconciliation-and-review-baseline` is closed **inventory-complete**. Builder preserved branch `develop`, HEAD `171d3aa4186e04c656a50d91b52b1f086f95f89a`, and the empty Git index while classifying all 255 closing status entries: 35 unstaged tracked modifications, zero tracked deletions, and 220 untracked entries. The inventory makes `.release-main/`, `.claude/commands/*`, `samples/README.md`, the supplied sprint-list DOCX, protected support evidence, environment filenames, generated outputs, and nested repositories explicit. No cleanup, ignore change, source edit, staging, commit, remote action, or product-readiness claim occurred. Next treatment decisions belong to a separate 017C; intentional staging belongs to 017D.

Sprint `021M-provider-directed-timed-jwt-reproduction` is closed **provider-escalation-required-clean**. Independent T0 and T+20 attempts 1,330 seconds apart reproduced successful exchange followed by unauthorized SDK identity verification, direct Auth-user verification, and authenticated Data API access. The supported class is `provider-internal-inconsistency-persistent`. Correlation identifiers are contained only in the support-escalation record. Both identities were deleted; final Auth/application/Storage state is zero. No hosted mutation or full authenticated matrix occurred.

The operator confirmed the 021M Supabase escalation was submitted on 2026-07-21. Await provider investigation or remediation; do not run another reproduction in the interim.

Sprint `021L-hosted-auth-jwt-reconciliation-and-closeout` is closed **provider-escalation-required-clean**. One bounded genuine session proved candidate Auth issued a valid exact-project authenticated JWT, current in time and matched to the asymmetric key advertised by candidate JWKS, but Auth identity verification and Data API controls rejected it. Root cause is `provider-internal-inconsistency`; Branch E was selected and no speculative tenant mutation occurred. The full RLS/application matrix was not started. Cleanup restored zero Auth/application/Storage state; ledger remains 0001-0012 and both projects remain ACTIVE_HEALTHY.

Sprint `021J-operator-provisioned-authenticated-proof-closeout` is closed **authenticated-role-rls-proof-failed-clean**. Operator-provisioned target-first loading passed, authoritative candidate baselines were zero, and ten `.invalid` identities plus genuine isolated sessions and bounded fixtures were created. The first Administrator direct-RLS horse read returned `HORSE_READ_FAILED_ADMIN`, so the matrix stopped before any assertion was credited. Dependency-safe cleanup restored zero Auth/application/Storage state. Candidate ledger remains 0001-0012; both projects remain ACTIVE_HEALTHY; Security Advisor remains 0/22/0; production-only callback state is unchanged. Application-route, remaining RLS, comment, denial, and revocation proof remains unperformed. Production cutover remains unauthorized.

Sprint `021I-credential-boundary-corrected-authenticated-proof` is closed **credential-boundary-blocked-clean**. The initial unchanged build reproduced the page-generation worker exit, the single debug rerun passed with useful dynamic-route diagnostics, and the required unchanged confirmation build passed. Protected acquisition inventory found no exact-candidate compliant route: shell injection is absent, the existing local protected configuration is bound to the refused old project, the browser surface requires prohibited reveal/output transfer, and no other protected injector is available. Protected references were cleared. No secret-backed request, run ID, identity, session, fixture, callback, Storage object, assertion, or remote mutation occurred. Authenticated proof remains unperformed.

Sprint `021H-mailbox-independent-authenticated-role-rls-proof` is closed **blocked-clean**. Builder applied the four-file Pack, activated the sprint, created the approved default-nonmutating harness, focused self-tests, manifest, and results record, and passed 15/15 harness safety checks plus the existing Sprint 021 static and focused role tests, lint, and TypeScript. Protected credential acquisition then stopped before secret access because the dashboard snapshot emitted a complete publishable-key value, violating the evidence allowlist. No fresh run was selected and no identity, fixture, session, callback, Storage, runtime, authenticated assertion, or remote mutation occurred. The old project was untouched. Email delivery and passwordless callback proof remain not tested. Production cutover remains unauthorized.

Sprint `021G-automated-authenticated-role-rls-and-application-proof` is closed **blocked-clean**. The Pack and credential-free checks passed, and the sanitized mailbox-readiness statement was accepted. Protected browser preflight then stopped because a mailbox DOM probe emitted non-address message metadata, violating the no-message-content boundary. No address, credential, OTP, link, token, cookie, Auth identifier, or secret value was emitted or retained. No fresh run, callback mutation, identity, fixture, session, runtime, authenticated assertion, or remote mutation occurred. Protected memory/browser state was cleared; Auth/Storage remained zero and callback state production-only.

Sprint `021F-recovery-reconciliation-and-safe-restart-method` is closed **recovery-reconciled — 021E blocked-clean**. Authoritative candidate Admin API evidence returned zero Auth users; run/application anchors and Storage artifacts were zero; no deletion was necessary. Site URL remains canonical and the sole callback is production. Protected process state was cleared.

Sprint 021E authenticated proof did not start. Run `021E-RLS-20260720-01` is abandoned and permanently non-reusable. The earlier OTP-request report and stale dashboard estimate do not establish identities. Any replacement proof requires a separate Sprint 021G-or-later Pack, a new run ID, and the protected mailbox/process method in `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`. Production cutover remains unauthorized.

Sprint `021D-acceptance-audit-trail-closeout` is closed **acceptance-audit-complete — structurally-ready unchanged**. Builder mapped and checked all 21 Sprint 021C acceptance criteria and all 23 Sprint 021D acceptance criteria, leaving zero unchecked items. This was documentation-only: Sprint 021B remains structurally-ready, Sprint 021C remains evidence-corrected — structurally-ready unchanged, and no technical state changed.

Advisor accounting remains zero database-advisor errors / 22 individually dispositioned database warnings / zero suggestions, with the hosted Auth leaked-password exception separate. Authenticated/runtime/callback/identity/fixture/revocation/cleanup/restoration proof remains unperformed. If chosen, it requires a separate Sprint 021E Architect Pack. Production cutover remains unauthorized. See `planning/reviews/021D-acceptance-audit-trail-closeout.md`.

Sprint `021C-advisor-accounting-and-acceptance-record-correction` is closed **evidence-corrected — structurally-ready unchanged**. Builder corrected two 021B transcription errors, confirmed the authoritative advisor table contains 22 distinct database warnings for 22 distinct `SECURITY DEFINER` functions, kept the hosted Auth leaked-password plan exception separate from that arithmetic, and mapped all 021B acceptance criteria to existing durable evidence. Sprint 021B remains closed **structurally-ready**; no technical state changed.

The canonical database-advisor result is zero errors / 22 individually dispositioned warnings / zero suggestions. The hosted Auth leaked-password exception is a separate accepted Free-plan/passwordless control and is not warning 22 or 23. Authenticated/runtime/callback/identity/fixture/revocation/cleanup/restoration proof remains unperformed. If pursued after the documentation-only 021D closeout, Architect must plan Sprint 021E separately. Production cutover remains unauthorized. See `planning/reviews/021C-advisor-accounting-and-acceptance-record-correction.md`.

Sprint `021B-structural-reconciliation-and-closeout` is closed **structurally-ready**. Builder applied the four-file strict-profile pack, audited the completed Sprint 021 structural work without changing implementation, proved immutable matching hashes for migrations `0011` and `0012`, confirmed genuine candidate ledger `0001`-`0012`, and reconciled exactly 22 Security Advisor warnings with individual evidence, ownership, rationale, and reopen conditions. The advisor state is zero errors, 22 dispositioned warnings, and zero suggestions. Candidate `uvskssaecdhxcgytkasc` and protected old project `tagnbgkroihagjmvehlx` remain `ACTIVE_HEALTHY`; the old project was not mutated.

Local TypeScript, lint, build, focused tests, pack validation, static Sprint 021 validation, JSON, secret-scan, and diff checks pass. Containerised replay is unavailable because this environment has no Docker, PostgreSQL, Podman, or installed WSL distribution; it is not a Sprint blocker. Authenticated positive/denial, callback, runtime, identity, fixture, revocation, cleanup, and restoration proof was outside 021B and was not performed or implied. Any future authenticated proof requires a separate Architect Pack using the next valid Sprint 021 follow-up suffix. Production cutover remains unauthorized. See `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md` and `docs/SPRINT_021_PROGRESS.md`.

Sprint 020G is closed with the evidence-backed outcome **candidate-ready**. Candidate `uvskssaecdhxcgytkasc` has the clean 0001-0010 migration ledger, completed Gate A, and verified database structure, RLS enablement, policies, helpers, lookup data, managed-data baselines, hosted configuration, and advisor disposition. Candidate and old project `tagnbgkroihagjmvehlx` were last confirmed `ACTIVE_HEALTHY`. Production cutover was not performed and remains unauthorized.

Credential incident containment is complete. Browser inspection retained legacy candidate credential material, and execution stopped before harness execution, runtime startup, Auth identity creation, or fixture creation. The affected credential-containing Builder task was deleted; the current Architect/review task was retained. Replacement publishable and secret keys are present, and legacy anon and service_role keys are disabled. No credential value or fragment is reproduced in durable records.

Hosted configuration is restored: Site URL remains `https://precisionperformance.com.au`; the callback allowlist contains only `https://precisionperformance.com.au/auth/callback`; the temporary localhost callback is removed; exposed schemas remain exactly `graphql_public` and `public`; and the accepted passwordless Free-plan leaked-password exception is unchanged. No billing or charge occurred.

Synthetic Auth/RLS and candidate-connected application-runtime testing did not complete and must not be reported as passed. Candidate Local Runtime Preflight is not an incomplete Gate A assertion. Its uncompleted concerns transfer to Sprint 021 discovery: definitive role matrix, synthetic identities, trainer/owner/expanded-role cases, assigned/wrong-horse and cross-user/cross-stable denials, application-route and authenticated-RLS proof, controlled fixtures and zero-count cleanup, and protected review of replacement-key consumption. Sprint 021 implementation has not begun and no Architect Pack has been applied.

Historical Sprint 020G progress below is retained as audit history and does not override this closeout state.

Protected billing-screen inspection is currently blocked because the browser runtime has no available browser session. Read-only CLI verification shows zero candidate projects named Precision Performance Clean Rebuild and old project tagnbgkroihagjmvehlx remains linked and ACTIVE_HEALTHY. The exact manual intervention is recorded in planning/reviews/020G-new-project-manifest.md.

The user subsequently reported and approved the displayed Free plan: no recurring price, additional compute charge, immediate charge, or currency amount was shown. Builder may create exactly one confirmed candidate and must stop before submission if any non-zero charge, paid-plan selection, payment requirement, or undisclosed billing information appears. This approval does not authorize Vercel/production environment changes, redeployment, or maintenance-window cutover; Builder must stop again before those actions.

Protected manual creation is required because Browser automation remains unavailable and the supported CLI requires the database password as a command argument. Latest verification shows zero candidate projects and the old project linked and ACTIVE_HEALTHY. The operator must submit once through the protected Supabase form without sharing the password, then return only safe candidate identity/status fields.

Candidate uvskssaecdhxcgytkasc has now been created and read-only verified exactly once as Precision Performance Clean Rebuild, organization hohxquwkfehiuyrysufu, ap-southeast-1, ACTIVE_HEALTHY, and not linked. Old project tagnbgkroihagjmvehlx remains linked and ACTIVE_HEALTHY. Repository readiness proceeds before the protected linking gate; production cutover remains unauthorized.

The protected link completed. Candidate uvskssaecdhxcgytkasc is now linked and ACTIVE_HEALTHY; old project tagnbgkroihagjmvehlx is unlinked and ACTIVE_HEALTHY. Read-only preflight proved zero application relations, legacy surfaces, Auth users, Storage buckets/objects, and migration-ledger relation; pending versions are exactly 0001-0010. Migration dry-run stopped before SQL because the pinned CLI rejects auth.enable_confirmations at the auth root. Current official config places it under auth.email, but supabase/config.toml is outside the 020G approved file set, so Builder stopped for scope confirmation.

The user approved a narrow 020G file-scope expansion for supabase/config.toml. Only enable_confirmations = true may move from auth to auth.email, preserving every other setting and authentication intent. Builder must inspect the exact diff and repeat full preflight before one-time SQL application.

The exact config change and repeated preflight passed, and migrations 0001-0010 were applied once to candidate uvskssaecdhxcgytkasc. Genuine ledger, 33 RLS tables, 78 policies, 11 secured helpers, exact 1774 lookups, zero duplicate keys, zero retired surfaces, and zero Auth/Storage content are verified. Advisor errors are zero; eleven authenticated-helper warnings are accepted with joint owners because current RLS requires authenticated execution. Candidate and old project remain ACTIVE_HEALTHY. Builder is stopped at protected hosted Auth/project configuration; production cutover remains unauthorized.

The candidate stays on Free. Leaked-password protection is unavailable and remains disabled under an explicit exception jointly owned by Randell Rankin and Philip Rankin. The current application is Email OTP/magic-link only with no password sign-in. Any future password-authentication feature must reopen and resolve this control before implementation. Protected hosted configuration is complete: exact Site URL/callback, Email/confirmation state, disabled unsupported providers, and exposed schemas exactly `graphql_public` and `public` are verified. `public` is required by the current application; `graphql_public` is Supabase-managed; no current application GraphQL dependency exists; no additional custom exposed schema is authorized; any future application GraphQL feature requires separate review. No Data API configuration mutation was made for this accepted decision. The advisor state remains zero errors, eleven accepted warnings, and zero suggestions. Gate A is complete: A1-A5, B1-B6, C1-C14, D1-D3, and E1-E3 passed. No remote mutation occurred, no candidate key was accessed, no Auth identity or application fixture was created, and production and the old project remained unchanged. The former Group F is now Candidate Local Runtime Preflight, after temporary localhost callback approval/setup and before Gate B; it verifies candidate hostname, required key presence, trainer/owner permission mappings, and zero reserved-run anchors. Its historical local attempt stopped with `CANDIDATE_URL_MISSING` before constructing a Supabase client or making a remote request, so it is not a Gate A failure. Run ID `020G-RLS-20260720-01` remains reserved and unused. No localhost callback or candidate runtime has been created or started; Gate B remains unapproved.

Sprint 020F is complete with a decisions-required outcome. Exact 020E temporary-role cleanup succeeded and proved zero remaining role, membership, session, ownership, ACL, or dependency references with unrelated structure unchanged. A validated read-only production catalog inventory and separate security advisor ran; no replacement or advisor fix occurred. Sprints 020C and 020E are closed as superseded/cleaned-up. Seven remote-only public surfaces plus hosted Auth, Storage, configuration, secrets, application data, recovery, downtime, and migration-history choices remain stop gates before any 020G.

The 120x planning layer is installed inside the existing Precision Performance project.

Client/source reference material is centralized under `references/`, including `references/client-docs/PNR and RJR EPP Working Information`.

Sprints 001-012F are complete. Sprint 012F is production-deployed and the public website remains behind the under-construction gate at `https://precisionperformance.com.au`; public shop/checkout surfaces remain blocked.

Sprint 013 is complete as a local source-controlled biochemistry data model sprint. Builder preserved the supplied `Reading Tables v1.csv`, created the local Supabase migration for biochemistry tests/lookups/uploads/notes/access scaffolds/soft-delete audit, added the TypeScript domain contract, documented the data model and pricing evidence, regenerated `supabase/bootstrap/remote-init.sql`, and validated locally.

Sprint 014 is complete as a local biochemistry scoring service and fixtures sprint. Builder implemented exact lookup scoring, pH Average, conductivity C conversion, Hydration Score, Health Score, blocked/unscored result behavior, fixture-backed validation, and scoring documentation.

Sprint 015 is complete as a local scoring-output and recommendation-engine scaffold sprint. Builder implemented supplied-threshold zone classification contracts, recommendation rule/snapshot structures, blocked/unavailable behavior for missing thresholds/content, fixture-backed validation, and recommendation documentation.

Sprint 016 is complete as a repository alignment and done-state baseline sprint. Builder inventoried and classified the dirty working tree, created repository alignment documentation, identified manual-review items, and recommended a separate baseline commit approval step before more feature work.

Sprint 017 is complete locally as a baseline commit approval sprint. Builder resolved the accepted Sprint 016 manual-review items, validated the repository baseline, and created local baseline commit `171d3aa4186e04c656a50d91b52b1f086f95f89a`. `.env.vercel.production` was removed from Git tracking while preserved locally and ignored; deleted root `ORCHESTRATOR*` files were verified against archived copies; deleted root `middleware.ts` passed route-safety validation.

Sprint 018 is complete locally as a mobile biochemistry capture/results foundation sprint. Builder added authenticated operations routes for biochemistry capture and result review, wired operations navigation, used Sprint 014 exact-match scoring, persisted scored/blocked snapshots to the Sprint 013 schema when available, and documented blocked states for missing remote schema, missing exact lookups, missing thresholds, and missing approved recommendation content.

Sprints 013-018 did not apply remote Supabase migrations, mutate production data, deploy, push, create a PR, change Stripe products/prices, reopen the public shop, add OCR/voice provider integration, add trend charts, invent production thresholds, or invent production recommendation content.

On 2026-07-19 the user accepted the supplied design-profile recommendation. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` is now the Builder-facing design and messaging authority. Relevant future sprints must bring it forward without treating visual acceptance as authorization for architecture, auth/RLS, schema, provider, CMS, aggregation, public reopening, pricing publication, migration, or deployment changes.

Sprint 019 - Design System And Product Language Baseline is complete locally. Builder encoded the accepted design tokens and safe font roles, aligned brand metadata and approved shared surfaces, added accessible notice/status primitives, documented provisional display terminology and the dormant marketing audit, and preserved the public/auth/domain gates. Automated validation passed; rendered viewport QA remains a documented manual follow-up because no browser service was available.

Sprint 019B - Mobile Heading Correction is complete locally. The authorized mobile heading class was corrected, all automated/build/route checks passed, and rendered acceptance passed at 390?844 and 1440?900, including keyboard focus, mobile sign-in, overflow, and gate checks.

Sprint 020 is complete locally and follow-up Sprint 020B verified production remotely. All expected biochemistry tables, helpers, indexes, policies, RLS states, and 1,774 lookup rows are present with exact counts and no duplicate lookup keys. A transaction-wrapped replay stopped on a pre-existing policy and rolled back; no additional remote change occurred.

Sprint 020C and Sprint 020E are closed as superseded and exactly cleaned up by Sprint 020F.

Sprint 020D - Supabase CLI Authentication, Linking And Read-Only Connectivity is complete with an `operational` outcome. The pinned local CLI `2.109.1` authenticated through the protected browser flow, the operator confirmed production project `tagnbgkroihagjmvehlx`, the repository linked through protected database prompting, and read-only Management API and remote migration-history checks passed. Remote migration history contains no local `0001`-`0009` version records, so no replay, repair, or reconciliation is authorized. No remote mutation or Sprint 020C audit-account action occurred.

---

Sprint 020E is closed as superseded by Sprint 020F; its temporary access is fully removed.

---

## Workflow Profile

Selected profile: `strict`

Reason: The project remains production-capable and includes auth, RLS, uploads, pricing, Stripe, and deployment surfaces. Sprint 018 added authenticated local mobile biochemistry capture/results UI and server actions only inside the approved sprint scope. Remote migrations, production data mutation, deployment, Stripe product/price changes, public shop reopening, push, PR, uploads/OCR/voice provider integration, trends, and invented domain content remain stop-and-confirm actions.

See `docs/WORKFLOW_PROFILE.md`.

---

## Execution Boundaries

Sprint 020 is closed readiness-only. Architect creates packs only. Builder applies each pack and executes the generated sprint files.

Builder must stop and ask before:

- applying remote Supabase migrations
- mutating production data
- deploying to Vercel
- pushing to remote
- creating a pull request
- committing unless separately requested
- changing DNS, Vercel settings, Supabase settings, Stripe products/prices, charges, refunds, subscriptions, tax, or customer data
- reopening public website/shop surfaces hidden by Sprint 012F
- adding persistent public interest/sign-up storage
- adding uploads/storage policies, OCR, voice-to-text provider integration, trend charts, public marketing rebuilds, or behavior outside the approved Sprint 019 file/scope boundaries
- changing role definitions/RLS boundaries, internally renaming `healthScore`, adding CMS/publishing architecture, or adding stable-level aggregation/status derivation under the accepted design profile
- inventing lookup/formula behavior not supplied by the user
- inventing Green/Amber/Red thresholds
- inventing Table of Knowledge recommendation advice
- printing, copying, staging, or committing secret values or fragments
- deleting the local `.env.vercel.production` file from disk
- staging `.release-main/`, `.claude/`, or `samples/` wholesale

---

## Active Sprints

No Builder sprint is active. Next roadmap activity: Sprint 021 - Definitive Role Matrix And Authenticated RLS Proof, discovery and Architect Pack preparation only.

Sprint 020G applied files remain at `planning/sprints/020G-clean-supabase-project-rebuild-and-cutover/`; outcome: candidate-ready.

## Latest Completed Sprint

Sprint 020G - Clean Supabase Project Rebuild And Cutover.

Architect Pack: planning/architect-packs/architect-pack-020G-clean-supabase-project-rebuild-and-cutover.md

Applied sprint files: planning/sprints/020G-clean-supabase-project-rebuild-and-cutover/

Outcome: candidate-ready. Production cutover and synthetic Auth/RLS/application-runtime testing did not occur.

---

## Approved Sprint Schedule

Sprints 001-018 are complete locally. The updated planning sequence is Sprints 019-033 in `planning/SPRINT_SCHEDULE.md`, supported by `planning/reviews/PROJECT_REVIEW_AND_FORWARD_ROADMAP_2026-07-19.md`.

Sprints 019, 019B, 020, 020B, 020D, 020F, and 020G are complete. Sprints 020C/020E are closed as superseded/cleaned-up. Production cutover is unauthorized; Sprints 021-033 remain planning direction only. The public under-construction gate remains active.

## Next Actions

1. Architect facilitates Sprint 021 definitive role-matrix discovery and prepares an Architect Pack only after roles, permissions, denial cases, fixture ownership/cleanup, and protected replacement-key consumption are decided.
2. Do not begin Sprint 021 implementation or apply an Architect Pack until the user hands it to Builder.
3. Product/domain owner supplies production thresholds, public score terminology, and approved Table of Knowledge content before Sprint 025.
4. Business owner prepares approved photography/releases and one commercial schedule before public/commerce sprints.
5. Keep the public under-construction gate active until Sprint 032 is separately approved.

## Blockers

Sprint 020G has no closeout blocker and is closed candidate-ready. Production cutover remains unauthorized. Sprint 021 discovery must resolve the definitive role matrix and protected authenticated-test design before implementation.

Remaining manual/future actions outside Sprint 018:

- Production biochemistry schema is structurally verified; authenticated persistence and cross-role RLS smoke still require approved synthetic fixtures and sessions.
- Biochemistry lookup rows and scoring assumptions should receive domain review before remote production use.
- Production Green/Amber/Red thresholds remain unsupplied.
- Production Table of Knowledge recommendation content remains unsupplied.
- Upload storage/provider rules remain unapproved.
- Voice-to-text provider/fallback behavior remains unapproved.
- Shop-written pricing is documented, but older seed/product evidence conflicts and should be confirmed before commerce changes.
- Remaining live acceptance blockers are unchanged: Supabase remote checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay still require safe operator access and fixtures.
