# Sprint 035B — Preview Configuration And Trainer Pilot Completion

## Goal

Complete the blocked external acceptance boundary of Sprint 035 by configuring an exact-candidate non-production Preview, proving the authenticated trainer dashboard with synthetic data, conducting the consented three-person trainer pilot, cleaning all exactly owned temporary state, and reconciling Sprint 035 closeout metadata.

This is a corrective completion sprint belonging to core Sprint 035. The target outcome is `trainer-pilot-and-dashboard-mvp-complete-clean`.

## Workflow profile

Strict controls apply to provider configuration, secrets, authenticated multi-user access, participant privacy, temporary account/fixture creation, RLS agreement and cleanup. Product implementation is already complete and must not be redesigned.

## Starting authority and exact baseline

Builder must begin from closed Sprint 035 branch `codex/035-trainer-pilot-and-dashboard-mvp` at exact local/remote SHA `57bfca225a0a41f639b9fa7b0875589bde9372f1` with a clean worktree.

Read and preserve:

- `AGENTS.md` and `templates/method/120x-agent-identity.md`;
- `planning/sprints/035-trainer-pilot-and-dashboard-mvp/SPRINT.md`;
- `planning/reviews/035-trainer-dashboard-implementation-and-validation.md`;
- `planning/reviews/035-preview-target-and-participation-stop.md`;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md` and `planning/ARCHITECT_BRIEFING.md`;
- `docs/END_TO_END_FIELD_TRIAL_AND_LIVE_ACCEPTANCE_031.md`;
- `planning/QUESTIONS.md` resolved Preview designation;
- current deployment, environment, authentication/RLS and synthetic fixture authorities.

Verify the exact local and remote SHA, clean state and Sprint 035 closed outcome before mutation. Create and use branch `codex/035B-preview-configuration-and-trainer-pilot-completion` from that exact SHA. Do not reopen or rewrite Sprint 035.

## Approved authority

The product owner authorizes Builder to perform the minimum protected non-production configuration and synthetic pilot actions required by this sprint.

### Vercel target

- Existing project: `pnr-precision-performance`.
- Environment: generated Vercel `Preview` only.
- Source: the exact Sprint 035B candidate descended from `57bfca225a0a41f639b9fa7b0875589bde9372f1`.
- URL: generated `*.rankin007s-projects.vercel.app` Preview URL.
- No custom domain or stable/production alias.
- No `--prod`, promotion, rollback, DNS change or production environment mutation.

### Supabase target

- Project reference: `uvskssaecdhxcgytkasc`.
- Display name: `Precision Performance Clean Rebuild`.
- Region: `ap-southeast-1` Singapore.
- Required migration ledger: exactly `0001` through `0021`.
- Old project `tagnbgkroihagjmvehlx` is prohibited and must remain unchanged.

### Protected configuration

Builder is authorized to obtain the existing target project's required public/server runtime values through the authenticated protected Supabase provider path and configure only these Vercel Preview environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`;
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`;
- `SUPABASE_SERVICE_ROLE_KEY`.

Do not print, return, paste into chat, place in command arguments, store in repository files, include in screenshots, retain in audit files or reproduce any value or fragment. Use protected provider UI/session mechanisms or another supported secret-safe path. Verify values only by name, presence, target binding and successful bounded runtime behavior.

Do not rotate keys, create replacement credentials, configure Production or Development environment values, change unrelated settings, or inspect unrelated secrets. Stop if the protected source cannot be established without exposing a value.

After the exact Preview URL exists, Builder may add that exact URL plus `/auth/callback` to the approved Supabase Auth redirect allowlist. Preserve the existing production Site URL and callback. Remove only the Sprint-035B-owned Preview callback at cleanup after pilot access is no longer required.

## Participant and privacy authority

The product owner confirms consent and authorizes three designated trainer representatives. Durable evidence must identify them only as `Trainer Participant A`, `Trainer Participant B` and `Trainer Participant C`.

Their names, inboxes and provider identities are protected coordination data. Do not place them in fixtures, run IDs, source, planning files, screenshots, logs or retained evidence. Use the protected mapping only in process/provider context for the duration required.

Use the existing passwordless email OTP/magic-link flow. Do not use supplied or invented passwords, add password authentication, request passwords/OTPs/magic links in chat, or retain credentials or Auth identifiers in evidence.

## Synthetic pilot ceiling

Use one unique Sprint 035B run ID and create no more than:

- one synthetic stable;
- three synthetic horses;
- three controlled synthetic Auth identities;
- the minimum existing application users/profiles, trainer memberships and horse assignments;
- the minimum biochemistry records required to represent `no result`, `draft/incomplete`, `pending review` and `completed` across the bounded acceptance set.

Use visibly synthetic, non-identifying labels derived from the run ID. Create zero commerce, Stripe, upload, Storage, audio, transcription, clinical free-text or real-data fixtures. Do not change schema, migrations, RPCs, RLS, roles, permissions or assignment contracts.

Maintain an exact owned-creation ledger in protected process memory and a sanitized durable ledger containing only run ID, record type, counts, lifecycle state and cleanup result. Do not retain participant inboxes, Auth UUIDs, secret values or personal identifiers.

## Required execution

### 1. Reconcile closeout metadata

Correct current durable records so they state:

- Sprint 035 closed `trainer-dashboard-validation-blocked-clean` at final local/remote SHA `57bfca225a0a41f639b9fa7b0875589bde9372f1`;
- the previously recorded earlier remote tip is historical intermediate evidence, not the final Sprint 035 tip;
- Sprint 035 is no longer the next recommendation;
- Sprint 035B is the active corrective completion sprint.

Do not rewrite historical Sprint 035 evidence; add a concise reconciliation where necessary.

### 2. Prove targets before mutation

Reconfirm Vercel account/project identity, Preview environment, Supabase reference/name/region/health and exact migration ledger. Confirm the old Supabase project and production Vercel aliases are distinct prohibited targets. Record sanitized equality only.

### 3. Configure and deploy exact Preview

Configure the three approved Vercel Preview variables through protected paths. Create a fresh generated non-production Preview from the exact pushed Sprint 035B candidate. Prove source SHA through authoritative deployment metadata, build provenance or an equivalent stronger source marker established before deployment. Do not accept a merely Ready deployment with no exact-source proof.

Confirm the Preview has no production/custom alias and that public production deployment/aliases remain unchanged. Add the one exact temporary Preview callback only after target proof.

### 4. Create controlled accounts and fixtures

Coordinate participant invitations through the protected passwordless provider path. Create only the approved minimum synthetic state, using existing roles, memberships, assignments and RLS. Establish writer/read-only and inaccessible/cross-stable cases without expanding permissions.

### 5. Run authenticated synthetic acceptance

Before participant testing, prove on phone `390x844` or equivalent and at least one tablet/desktop viewport:

- passwordless sign-in and secure portal entry;
- only accessible synthetic horses appear;
- deterministic non-clinical ordering;
- `no result`, `draft/incomplete`, `pending review`, `completed`, failed/unavailable and denied treatment;
- workflow basis/date and permission-correct next action;
- horse workspace navigation and dashboard return;
- writer versus read-only behavior;
- wrong-horse, cross-stable and revoked-access denial without identity/state leakage;
- failed workflow loading exposes sanitized `Unavailable` and no record action;
- keyboard access, visible focus, headings, landmarks, accessible names, reflow and no horizontal overflow.

### 6. Conduct the trainer pilot

Ask each available consented participant to perform the five-step journey:

1. sign in through the supported passwordless flow;
2. land on the trainer dashboard;
3. identify only their accessible synthetic horses and current workflow state;
4. open one horse, understand the displayed context and follow the permitted next action; and
5. return to the dashboard without losing orientation.

Run phone-first and obtain at least one larger-viewport pass across the participant group. Record participants only as A/B/C and capture task completion, confusing language, orientation problems, viewport friction, permission disagreement and material safety/privacy findings.

Builder-only testing is not trainer acceptance. Correct and re-test material findings that remain inside the existing Sprint 035 product contract. Record genuinely different feature requests without implementing them.

### 7. Clean exact-owned state

After accepted pilot evidence is captured, remove Sprint-035B-owned state dependency-safely:

1. any owned application records and biochemistry fixtures;
2. assignments, memberships, profiles/users and synthetic stable/horses in dependency-safe order;
3. any owned Storage state, expected zero;
4. synthetic Auth identities last;
5. the exact temporary Preview callback when no longer required.

Prove final owned application/Auth/Storage counts `0/0/0`. Do not delete or alter anything whose run ownership is uncertain. Preview deployment retention/removal must follow existing non-production operational policy; it is not a substitute for application/Auth/Storage cleanup.

## Approved files and actions

Builder may:

- create/apply the Sprint 035B generated file;
- update current planning/status/evidence/briefing files for truthful reconciliation and closeout;
- create narrow Sprint 035B evidence, run ledger, acceptance and cleanup records;
- make only in-scope deterministic test/harness/fixture/reporter corrections necessary to execute existing acceptance;
- create/switch to the scoped 035B branch, commit a small intentional series and push only that branch;
- configure the three named Vercel Preview variables through protected paths;
- create one exact non-production Preview and one temporary exact callback;
- create and clean only the bounded synthetic accounts/fixtures;
- conduct the three-person pilot through protected coordination.

No product-source change is expected. A product-source correction is allowed only when a material pilot failure is demonstrably inside the existing Sprint 035 contract; record the failure, keep the change narrow and rerun all affected validation.

## Out of scope

- Production deployment, promotion, rollback, alias/domain/DNS change or production environment mutation.
- Old Supabase project access or mutation.
- Schema, migration, RPC, RLS, role, permission, membership-model or assignment-contract changes.
- Password authentication or shared/test passwords.
- Real horse/stable/customer data or participant personal details in durable artifacts.
- Clinical rules, thresholds, recommendations, urgency, treatment, supplementation, performance prediction or race readiness.
- Uploads, Storage use, OCR, voice/audio/transcription, trends, saved views, commerce, public-site work or broad onboarding.
- Merge, `develop` push, PR creation, history rewrite or product-wide Done declaration.

## Validation and evidence

Run:

- focused Sprint 035 dashboard and failure-isolation tests;
- maintained Sprint 021AH, 022/022B and 028 regressions relevant to the journey;
- canonical JSON, domain, roles, Supabase self-test, static and local validation;
- lint and TypeScript checks;
- production build from the exact candidate;
- `git diff --check`;
- exact staged-manifest, secret/private-data and generated-artifact review;
- authoritative exact-SHA Preview proof;
- authenticated rendered synthetic matrix;
- trainer task results;
- exact-owned cleanup and final `0/0/0` proof;
- post-action confirmation that production and prohibited targets remain unchanged.

Evidence must be sanitized and proportional. Record provider identities, references, names, regions, environment classifications, deployment IDs/URLs, source SHAs, counts and pass/fail outcomes only when safe. Never record secret values, protected participant mapping, inboxes, Auth UUIDs, OTPs, magic links or personal details.

## Stop conditions

Stop for a wrong/ambiguous Vercel or Supabase target, source-SHA ambiguity, non-Preview deployment, production alias/environment impact, migration-ledger mismatch, secret exposure, unexpected real/private data, failed auth/RLS/cross-stable/revocation behavior, required schema/permission/clinical expansion, participant consent/coordination failure, partial provider mutation that cannot be safely reconciled, or cleanup whose exact ownership cannot be proven.

Do not stop solely because a preferred CLI, browser, renderer, metadata field or supporting tool is unavailable when equivalent or stronger safe evidence can establish the same boundary. Diagnose once and use the safest effective alternate path. Keep deterministic in-scope tooling, callback, credential-presence, fixture, validator, formatting, encoding and reporter corrections within Sprint 035B.

Manual intervention is the last safe option. If genuinely required, record the blocked fact, evidence checked, exact protected user action, step-by-step instructions that reveal no secret/private data, and what Builder will verify afterward.

## Acceptance

- [ ] Exact Sprint 035 final local/remote SHA and clean baseline are confirmed.
- [ ] Current state/status records reconcile the final Sprint 035 tip and identify Sprint 035B as active.
- [ ] Exact Vercel Preview and Supabase targets pass sanitized preflight.
- [ ] Only the three approved Preview variables are configured through protected paths and values are never exposed or retained.
- [ ] A generated non-production Preview is authoritatively tied to the exact Sprint 035B candidate with no production/custom alias.
- [ ] The one exact Preview callback is configured temporarily while production Site URL/callback remain unchanged.
- [ ] Synthetic accounts/fixtures remain within the approved ceiling and use no real identifying data.
- [ ] Authenticated synthetic phone and larger-viewport acceptance passes all required permission, workflow, failure and accessibility cases.
- [ ] Trainer Participants A, B and C complete the five-step journey, or any unavailable participant is recorded without substituting Builder testing.
- [ ] Material in-scope pilot failures are corrected and re-tested; different feature requests are deferred.
- [ ] All focused, retained and canonical validation/build/diff/safety gates pass.
- [ ] Exact-owned application/Auth/Storage cleanup proves `0/0/0`; temporary callback cleanup is verified.
- [ ] Production deployment, aliases, domains, environments, providers and data remain unchanged.
- [ ] Scoped branch commits are intentional, pushed only to `codex/035B-preview-configuration-and-trainer-pilot-completion`, and exact local/remote final SHA equality is recorded.
- [ ] Durable closeout records exactly one permitted outcome without claiming product-wide Done.

## Permitted outcomes

`trainer-pilot-and-dashboard-mvp-complete-clean` when exact-candidate Preview proof, authenticated synthetic acceptance, three-person trainer pilot, validation and exact-owned cleanup all pass.

`trainer-pilot-participation-partial-clean` when exact-candidate Preview and authenticated synthetic acceptance pass, but fewer than three consented participants can complete the pilot after protected coordination; completed and outstanding A/B/C results are recorded without overstating acceptance.

`preview-configuration-validation-blocked-clean` when protected Preview configuration, target/source proof, authenticated acceptance or provider isolation fails without unsafe mutation.

`trainer-pilot-safety-blocked-clean` when auth/RLS/privacy/participant safety or material in-scope journey behavior fails and cannot be safely corrected within this sprint.

`synthetic-cleanup-blocked` when owned state was created but final exact-owned cleanup cannot be proven; this remains a material open operational incident until resolved and must not be represented as clean.

## Builder Copy/Paste Script

```text
Act as Builder for Sprint 035B — Preview Configuration And Trainer Pilot Completion.

Apply this Architect Pack, verify that it generates one SPRINT.md, and execute only from that generated Sprint 035B authority.

Start from closed Sprint 035 branch codex/035-trainer-pilot-and-dashboard-mvp at exact local/remote SHA 57bfca225a0a41f639b9fa7b0875589bde9372f1 with a clean worktree. Create branch codex/035B-preview-configuration-and-trainer-pilot-completion from that exact SHA. Stop on any baseline, remote-tip or dirty-state ambiguity.

First reconcile current status/state records so the final Sprint 035 tip is 57bfca225a0a41f639b9fa7b0875589bde9372f1, the earlier remote tip is historical intermediate evidence, Sprint 035 remains closed trainer-dashboard-validation-blocked-clean, and Sprint 035B is active.

Use only Vercel project pnr-precision-performance in Preview mode and Supabase project uvskssaecdhxcgytkasc, Precision Performance Clean Rebuild, ap-southeast-1 Singapore, at exact migration ledger 0001 through 0021. Never target old project tagnbgkroihagjmvehlx. Never deploy with --prod or attach a production/custom alias.

Through authenticated protected provider paths, obtain the existing approved Supabase runtime values and configure only NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY for Vercel Preview. Never print, log, return, screenshot, retain, pass in command arguments or commit any value or fragment. Do not rotate credentials or change Production or Development variables.

Create a fresh generated Preview from the exact pushed Sprint 035B candidate. Prove the exact source SHA through authoritative deployment metadata, build provenance or equivalent stronger evidence. Reject a merely Ready deployment without exact-source proof. Confirm no production/custom alias and unchanged production state.

After the exact Preview URL is proven, add only its exact /auth/callback URL to the approved Supabase redirect allowlist. Preserve the existing production Site URL and callback. Remove the Sprint-035B callback during final cleanup when no longer required.

The product owner has authorized three consented trainer representatives. Handle them only through protected coordination and identify them in durable evidence as Trainer Participant A, B and C. Use existing passwordless OTP/magic-link authentication. Do not use passwords, add password authentication, or retain names, inboxes, Auth identifiers, OTPs, magic links, credentials or personal details.

Create at most one synthetic stable, three synthetic horses, three synthetic Auth identities and the minimum existing memberships, assignments and biochemistry records needed for no-result, draft/incomplete, pending-review, completed, failure, denial, writer and read-only cases. Use a unique run ID and visibly synthetic labels. Create no commerce, Storage, upload, audio, transcription, clinical free-text or real-data fixture.

Before participant testing, run authenticated rendered acceptance on phone and at least one tablet/desktop viewport. Prove accessible-only horses, deterministic non-clinical ordering, workflow basis and dates, permission-correct actions, workspace navigation/return, writer/read-only behavior, cross-stable and revoked denial, sanitized unavailable behavior with no record action, keyboard access, focus, landmarks, accessible names, reflow and no horizontal overflow.

Then conduct the five-step phone-first journey with Trainer Participants A, B and C, with at least one larger-viewport pass across the group. Record only A/B/C task completion, confusing language, orientation problems, viewport friction, permission disagreement and material safety/privacy findings. Builder-only testing is not trainer acceptance.

Correct and re-test material findings only when they remain inside the existing Sprint 035 product contract. Do not add schema, migrations, RPCs, RLS, roles, permissions, clinical rules, uploads, voice, trends, commerce, public work or production changes. Record genuinely different requests for later prioritisation.

Run focused Sprint 035 tests, relevant 021AH/022/022B/028 regressions, canonical validation, lint, typecheck, production build, git diff --check, exact staged-manifest review and secret/private-data scans. Commit a small intentional series and push only codex/035B-preview-configuration-and-trainer-pilot-completion. Do not merge, push develop, open a PR or rewrite history.

After accepted evidence, clean exactly owned application records and fixtures dependency-safely, then owned Storage state if any, then synthetic Auth identities last. Remove the exact temporary Preview callback. Prove final owned application/Auth/Storage counts 0/0/0. Never delete anything whose run ownership is uncertain.

Stop for wrong targets, source-SHA ambiguity, production classification or impact, migration mismatch, secret/private-data exposure, unexpected real data, auth/RLS/cross-stable/revocation failure, required contract expansion, participant coordination failure, partial provider mutation that cannot be reconciled, or cleanup whose ownership cannot be proven. Use equivalent or stronger safe evidence for unavailable supporting tools and keep deterministic in-scope corrections inside Sprint 035B.

Close with exactly one permitted Sprint 035B outcome. Refresh planning/STATE.md, planning/STATUS.json, planning/SPRINT_SCHEDULE.md, planning/EVIDENCE_INDEX.md and planning/ARCHITECT_BRIEFING.md. Record sanitized target, exact source/deployment/final branch SHAs, participant A/B/C results, validation, cleanup, production non-impact and remaining limitations. Do not declare product-wide Done.
```
