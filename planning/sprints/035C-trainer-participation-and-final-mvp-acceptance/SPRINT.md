# Sprint 035C — Trainer Participation And Final MVP Acceptance

## Goal

Complete the remaining trainer-visible acceptance boundary for the Sprint 035 Trainer Pilot And Dashboard MVP by running the approved five-step journey with Trainer Participants A, B and C in an exact-candidate non-production Preview, resolving material in-scope findings, cleaning all exactly owned temporary state and recording the final MVP outcome.

The target outcome is `trainer-pilot-and-dashboard-mvp-complete-clean`.

## Workflow profile

Strict controls apply to participant privacy, passwordless authentication, provider configuration, authenticated multi-user access, RLS agreement, temporary synthetic data and cleanup. Product implementation and authenticated synthetic acceptance are already established; this sprint must remain a narrow participation-and-acceptance completion.

## Starting authority and baseline

Start from closed Sprint 035B branch `codex/035B-preview-configuration-and-trainer-pilot-completion` at exact clean local/remote SHA `497c8628c2fe481dcf2ca1d205f379e311b3df75`.

Read and preserve:

- `AGENTS.md` and `templates/method/120x-agent-identity.md`;
- Sprint 035 and 035B sprint authorities;
- `planning/reviews/035-trainer-dashboard-implementation-and-validation.md`;
- `planning/reviews/035-preview-target-and-participation-stop.md`;
- `planning/reviews/035B-preview-configuration-and-trainer-pilot-completion.md`;
- current `planning/STATE.md`, `planning/STATUS.json`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md` and `planning/ARCHITECT_BRIEFING.md`;
- applicable deployment, environment, authentication/RLS, field-trial and cleanup authorities.

Verify exact local/remote baseline equality and a clean worktree before mutation. Create branch `codex/035C-trainer-participation-and-final-mvp-acceptance` from the exact baseline. Do not reopen or rewrite Sprint 035 or 035B.

## Confirmed external prerequisite

The product owner is the authorized provider operator. The product owner has confirmed through sanitized coordination that:

- three valid participant inboxes are configured through the protected provider path;
- Trainer Participants A, B and C are available;
- the supported passwordless invitation flow can be coordinated without disclosing inboxes, credentials, OTPs or magic links to Builder or durable evidence.

Do not record, request, reproduce or infer participant names or inboxes. Durable evidence uses only `Trainer Participant A`, `Trainer Participant B` and `Trainer Participant C`.

## Approved targets

### Vercel

- Project: `pnr-precision-performance`.
- Environment: generated `Preview` only.
- Source: exact pushed Sprint 035C candidate descended from `497c8628c2fe481dcf2ca1d205f379e311b3df75`.
- URL: generated `*.rankin007s-projects.vercel.app` Preview URL.
- No production/custom/stable alias may be attached, moved or promoted at any time.

Use a Preview deployment path that cannot mutate stable or production aliases. Sprint 035B's briefly moved secondary stable alias is a mandatory deployment-safety constraint even though it was restored and production was reverified.

### Supabase

- Project reference: `uvskssaecdhxcgytkasc`.
- Project name: `Precision Performance Clean Rebuild`.
- Region: `ap-southeast-1` Singapore.
- Required migration ledger: exactly `0001` through `0021`.
- Old project `tagnbgkroihagjmvehlx` is prohibited and must remain unchanged.

Only existing approved Preview runtime configuration may be used. Never print, log, return, screenshot, retain, pass through command arguments or commit any secret value or fragment. Do not rotate keys or change Production/Development variables.

After proving the exact Preview URL and source SHA, Builder may add only that Preview's exact `/auth/callback` URL to the Supabase redirect allowlist. Preserve the production Site URL and callback. Remove the exact Sprint-035C callback during cleanup.

## Participant authentication and coordination

Use only the existing passwordless email OTP/magic-link flow. Do not create or use passwords, add password authentication, request authentication artifacts through chat, or retain participant contact/Auth data.

The provider operator performs inbox-specific invitation and magic-link coordination directly through the protected provider/mailbox paths. Builder supplies only the sanitized participant aliases, exact approved Preview destination and timing needed for the five-step journey. Builder must not receive the inbox mapping, OTPs, magic links, session tokens or Auth UUIDs in conversation or evidence.

If protected coordination fails, diagnose once with the operator using sanitized presence/status only. Do not weaken authentication or substitute Builder-controlled accounts for trainer participation.

## Synthetic pilot ceiling

Create one unique Sprint 035C run ID and no more than:

- one synthetic stable;
- three synthetic horses;
- three participant-linked application identities using the operator-managed passwordless Auth identities;
- the minimum existing memberships and assignments;
- the minimum biochemistry records needed for the approved participant journey and permission isolation.

Use visibly synthetic, non-identifying stable/horse labels. Create zero commerce, Stripe, upload, Storage, audio, transcription, clinical free-text or real-data fixtures. Do not change schema, migrations, RPCs, RLS, roles, permissions, membership models or assignment contracts.

Maintain exact run ownership in protected process memory. Durable evidence may contain only run ID, participant alias A/B/C, record type/count, journey result and cleanup state.

## Required execution

### 1. Open Sprint 035C safely

- Verify baseline, branch, clean state and remote equality.
- Record Sprint 035C active without changing historical outcomes.
- Create a concise approved-path/run manifest before external mutation.
- Confirm the product-owner/operator readiness statement remains current.

### 2. Establish an exact safe Preview

- Reconfirm Vercel/Supabase identities, environment classification, health and migration ledger.
- Create or select a generated Preview only when exact authoritative metadata proves the Sprint 035C candidate SHA.
- Ensure the deployment command/path cannot attach or move a stable/production alias.
- Verify production deployment and every approved production/stable alias before and after Preview creation.
- Add one exact temporary Preview callback only after target/source proof.

### 3. Prepare minimum participant-isolated synthetic state

- Create only the bounded stable, horses, memberships, assignments and biochemistry fixtures.
- Map each protected participant account to its A/B/C alias only in protected process memory.
- Give each participant only the existing minimum trainer access required for the assigned synthetic horse(s).
- Include a safe inaccessible/wrong-horse case that proves isolation without exposing another participant's identity.
- Run a short authenticated preflight before inviting participants; do not repeat the full Sprint 035B matrix unless a material change or failure requires it.

### 4. Conduct the trainer-visible pilot

Each participant performs:

1. passwordless sign-in;
2. arrival at the trainer dashboard;
3. identification of only accessible synthetic horses and their workflow state;
4. opening one assigned horse, understanding the displayed context and following the permitted next action; and
5. returning to the dashboard without losing orientation.

Run phone-first for all participants where practicable and obtain at least one tablet or desktop pass across the group. Record only:

- task completion, blocked or failed;
- confusing language;
- missing orientation;
- phone/larger-viewport friction;
- permission/access disagreement;
- material safety/privacy findings;
- concise optional comments without personal, clinical or identifying content.

Do not coach participants past a product defect merely to mark success. Builder-only repetition is not participant acceptance.

### 5. Reconcile findings

Correct and re-test material findings only when they remain within the established Sprint 035 product contract. Keep changes narrow. Re-run affected focused tests, authenticated cases and viewports.

Record cosmetic preferences and genuinely different features for later prioritization without implementing them. Any schema/RLS/role/permission/clinical expansion requires a different outcome and stops this sprint.

### 6. Clean exact-owned state

After accepted evidence capture:

1. remove owned biochemistry/application fixtures dependency-safely;
2. remove owned assignments, memberships, profiles/users, horses and stable in safe dependency order;
3. confirm owned Storage remains zero;
4. remove synthetic/participant pilot Auth identities last when they are Sprint-035C-owned and operator-approved for removal;
5. remove the exact temporary Preview callback;
6. clear protected in-memory mappings and sessions.

Prove final owned application/Auth/Storage counts `0/0/0`. Never delete anything whose exact run ownership is uncertain. If participant Auth identities pre-existed Sprint 035C, do not delete them; remove only the Sprint-035C application access and record Auth cleanup as `not-owned/excluded`, not zero-owned deletion.

## Approved files and actions

Builder may:

- create/apply the Sprint 035C generated file;
- update current planning/status/evidence/briefing records;
- create a narrow run manifest, participant task record and cleanup evidence;
- make minimal in-scope product/test/harness/reporter corrections required by a material participant finding;
- create/switch to the scoped 035C branch, commit intentionally and push only that branch;
- create one generated non-production Preview without aliases;
- configure/remove one exact temporary Preview callback;
- create and clean the bounded synthetic application/Auth state;
- coordinate the passwordless pilot with the provider operator through protected paths.

## Out of scope

- Passwords or password authentication.
- Participant names, inboxes, Auth identifiers, OTPs, magic links or personal data in durable evidence.
- Production deployment/promotion/rollback, stable/custom alias movement, DNS or production environment mutation.
- Old Supabase project access/mutation.
- Schema, migration, RPC, RLS, role, permission, membership-model or assignment-contract changes.
- Clinical thresholds, urgency, diagnosis, treatment, supplementation, prediction or race readiness.
- Uploads, Storage use, OCR, voice/audio/transcription, trends, saved views, commerce, public-site work or broad onboarding.
- Merge, `develop` push, PR creation, history rewrite or product-wide Done declaration.

## Validation and evidence

Run proportionate proof:

- exact baseline/branch/remote and approved-path checks;
- exact Preview source and no-alias proof;
- sanitized Vercel/Supabase target and callback checks;
- focused Sprint 035 dashboard/action/failure tests;
- affected 021AH/022/022B/028 regressions if product source changes;
- canonical validation, lint, TypeScript and production build for any executable change;
- authenticated participant-isolation preflight;
- A/B/C five-step task results and required viewports;
- `git diff --check`, staged-manifest and secret/private-data scans;
- exact-owned cleanup and final `0/0/0` or explicit not-owned treatment;
- post-action proof that production deployment, aliases, callbacks, environments and prohibited providers remain unchanged.

Use equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Do not turn redundant tooling into a blocker. Never weaken auth/RLS/privacy/cleanup proof.

## Stop conditions

Stop for wrong/ambiguous targets, source-SHA ambiguity, any stable/production alias movement, production impact, migration mismatch, secret/private-data exposure, unexpected real data, failed auth/RLS/isolation/revocation behavior, unsupported participant authentication, required contract expansion, participant consent/availability withdrawal, partial provider mutation that cannot be reconciled, or cleanup whose ownership cannot be proven.

Manual intervention is the last safe option. If required, record the blocked fact, evidence checked, exact protected operator action, steps revealing no private/secret data and what Builder will verify afterward.

## Acceptance

- [ ] Exact Sprint 035B final local/remote SHA and clean baseline pass.
- [ ] Scoped Sprint 035C branch and active planning records are correct.
- [ ] Product-owner/operator readiness remains confirmed through sanitized status only.
- [ ] Exact generated Preview is tied to the Sprint 035C candidate and never attaches/moves a stable or production alias.
- [ ] Approved Supabase target, migration ledger and production isolation pass.
- [ ] Exact temporary Preview callback is added only after target proof.
- [ ] Synthetic participant state remains within ceiling and contains no real horse/stable data.
- [ ] Authenticated preflight confirms A/B/C isolation and permission-correct actions.
- [ ] Trainer Participants A, B and C each complete the five-step journey, with phone-first coverage and at least one larger viewport across the group.
- [ ] Durable evidence contains aliases and task findings only, with no participant contact/Auth data.
- [ ] Material in-scope findings are corrected and re-tested; different features are deferred.
- [ ] Applicable focused/canonical/build/diff/safety gates pass.
- [ ] Exact-owned cleanup proves application/Auth/Storage `0/0/0` or documents pre-existing Auth identities as not-owned while all Sprint-035C application access is removed.
- [ ] Exact temporary callback is removed and production configuration remains correct.
- [ ] Final scoped branch local/remote equality is recorded; no merge, PR or `develop` push occurs.
- [ ] Durable closeout records exactly one permitted outcome without declaring product-wide Done.

## Permitted outcomes

`trainer-pilot-and-dashboard-mvp-complete-clean` when A, B and C complete the journey, material in-scope findings are accepted/retested, validation passes and exact-owned cleanup is complete.

`trainer-pilot-participation-incomplete-clean` when protected coordination runs safely but one or more participants cannot complete for a non-product availability/coordination reason; exact completed and outstanding aliases are recorded without claiming full trainer acceptance.

`trainer-pilot-product-validation-blocked-clean` when a material in-scope product, accessibility or navigation failure cannot be corrected safely within this sprint.

`trainer-pilot-access-safety-blocked-clean` when authentication, RLS, isolation, revocation or privacy behavior fails.

`synthetic-cleanup-blocked` when owned state exists but exact cleanup cannot be proven; this remains an open operational incident and must not be represented as clean.

## Builder Copy/Paste Script

```text
Act as Builder for Sprint 035C — Trainer Participation And Final MVP Acceptance.

Apply this Architect Pack, verify that it generates exactly one Sprint 035C SPRINT.md, and execute only from that generated authority.

Start from branch codex/035B-preview-configuration-and-trainer-pilot-completion at exact clean local/remote SHA 497c8628c2fe481dcf2ca1d205f379e311b3df75. Create branch codex/035C-trainer-participation-and-final-mvp-acceptance from that exact SHA. Stop on any baseline, remote, target or dirty-state ambiguity.

The product owner is the authorized provider operator and has confirmed that three valid participant inboxes are configured through the protected provider path and Trainer Participants A, B and C are available. Do not request, receive, reproduce or retain their names, inboxes, Auth identifiers, OTPs, magic links, credentials or personal details. Durable evidence uses A/B/C only.

Use only Vercel project pnr-precision-performance in generated Preview mode and Supabase project uvskssaecdhxcgytkasc, Precision Performance Clean Rebuild, ap-southeast-1 Singapore, at exact migration ledger 0001 through 0021. Never contact old project tagnbgkroihagjmvehlx.

Create a fresh exact-candidate Preview through a path that cannot attach, move or promote any stable, custom or production alias. Never use --prod. Prove the exact Sprint 035C source SHA through authoritative metadata or equivalent stronger evidence. Verify every production/stable alias remains on its accepted production deployment before and after Preview creation.

Use existing protected Preview configuration without exposing secret values. After exact Preview proof, add only its exact /auth/callback URL to the approved Supabase redirect allowlist. Preserve the production Site URL and callback. Remove the exact Sprint-035C callback during cleanup.

Coordinate participant invitations through the product-owner/operator's protected provider and mailbox paths using only existing passwordless OTP/magic-link authentication. Do not use passwords or ask the operator to transmit inboxes, OTPs, magic links or credentials to Builder.

Create at most one synthetic stable, three synthetic horses, the three participant-linked application identities, minimum existing memberships/assignments and minimum biochemistry fixtures. Use one unique run ID and visibly synthetic labels. Create no real data, clinical free text, commerce, upload, Storage, audio or transcription fixture. Do not change schema, migrations, RPCs, RLS, roles or permissions.

Run a short authenticated preflight proving participant isolation, permission-correct actions, wrong-horse denial and safe Preview behavior. Then have Trainer Participants A, B and C each perform the five-step phone-first journey: passwordless sign-in, dashboard arrival, accessible-horse/workflow identification, horse workspace and permitted action, then dashboard return. Obtain at least one tablet or desktop pass across the group.

Record only A/B/C task completion, confusing language, orientation issues, viewport friction, permission disagreement and material safety/privacy findings. Do not coach past product defects or represent Builder testing as participant acceptance.

Correct and re-test material findings only when they remain within the established Sprint 035 product contract. Record different feature requests without implementing them. Run applicable focused regressions, canonical validation, lint, typecheck, production build, git diff --check, staged-manifest and secret/private-data scans.

After evidence capture, clean exact-owned application records, assignments, memberships, profiles/users, horses and stable dependency-safely; confirm Storage zero; remove Sprint-035C-owned Auth identities last; remove the exact temporary callback; and clear protected mappings/sessions. Prove final owned application/Auth/Storage 0/0/0. If an Auth identity pre-existed this sprint, do not delete it; classify it not-owned and remove all Sprint-035C application access.

Commit a small intentional series and push only codex/035C-trainer-participation-and-final-mvp-acceptance. Do not merge, push develop, open a PR or rewrite history.

Stop for target/SHA ambiguity, any stable or production alias movement, production impact, migration mismatch, secret/private-data exposure, unexpected real data, auth/RLS/isolation failure, unsupported authentication, contract expansion, consent/availability withdrawal, unreconciled provider mutation or unsafe cleanup. Use equivalent or stronger safe evidence for unavailable supporting tools without weakening security/privacy boundaries.

Close with exactly one permitted Sprint 035C outcome. Refresh current state, status, schedule, evidence index and Architect briefing. Record sanitized targets, exact SHAs, deployment identity, A/B/C results, validation, cleanup and production non-impact. Do not declare product-wide Done.
```
