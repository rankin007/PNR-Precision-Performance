============================================================
FILE: planning/sprints/035-first-trainer-access-and-core-journey/requirements.md
============================================================

# Sprint 035 — First Trainer Access And Core Journey

## Outcome

Prove on one exact non-production Preview candidate that one product-owner-designated human trainer can safely sign in, see only the assigned synthetic horse and stable, open the horse workspace, follow one existing permitted biochemistry action, return to the dashboard, sign out, and sign in again.

This is the first human trainer acceptance outcome on the reconciled product lineage. Existing 035-series Packs and generated artifacts are non-authoritative historical inputs. The target outcome is `first-trainer-access-and-core-journey-complete-clean`.

## Workflow profile

Strict at the authentication, private participant, synthetic data, hosted Preview, permission, external mutation and cleanup boundaries. Ordinary UI and deterministic test corrections remain narrow and proportional. This four-file sprint set is the sole Sprint 035 authority after Pack application.

## Starting authority

Start only from clean branch `codex/034-reconciled-product-baseline` at exact local and remote-backed SHA `ea8417d3c7450f25c90644f23d8558c9f5938552`. Verify this identity before any product or external action. Read:

- `AGENTS.md` and `templates/method/120x-agent-identity.md`;
- the Sprint 034 state, status, briefing, lifecycle ledger, reconciliation review and roadmap;
- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md` and `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`;
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/BIOCHEMISTRY_WORKFLOW_022.md` and `docs/OPERATIONS_HANDOFF.md`;
- accepted Sprint 021AH and 022/022B evidence; and
- current sign-in, portal, horse workspace, permission, biochemistry, validation and Preview surfaces on the exact baseline.

Do not use the dirty `develop` root, an earlier release branch, an older 035 candidate, an unproven 035I lineage, or file recency as authority. Sprint 032 remains the accepted public release, but Sprint 035 does not authorize production deployment.

## Product contract

1. Preserve the existing approved-account passwordless sign-in model unless an in-scope defect prevents the journey. Do not add self-registration, passwords, social login, authentication bypass, mailbox automation or secret transfer.
2. Present a calm, mobile-first trainer dashboard at `/portal`. Only existing authorised server-side contracts may determine visible horses, stable context, workflow state, timestamps and actions.
3. Show explicit empty, incomplete, pending, completed, unavailable, denied and failed states only where supported by the accepted contract. Missing or inaccessible data must never default to normal, Green, complete or actionable.
4. Use neutral operational ordering and language. Do not imply clinical urgency, diagnosis, treatment, supplementation, race readiness or performance prediction.
5. The horse workspace must preserve identity and stable context, show the latest supported workflow/result context, expose one existing permitted next action, provide a clear return to the dashboard and deny wrong-horse/cross-stable access without leaking existence or state.
6. Sign-out and repeat sign-in must preserve the same bounded permission outcome.
7. Reuse existing schema, migrations, RLS, roles, membership, assignment and biochemistry contracts. If the journey requires a material contract change, stop cleanly rather than inventing it.

## Human Preview acceptance

Use exactly one designated trainer representative and clearly synthetic, non-identifying fixtures. The participant privately controls their mailbox and enters authentication material themselves. Never request, inspect, record or commit their email address, code, link, mailbox content, cookies, tokens or other protected values.

The product owner must privately designate the trainer and authorise any required account/fixture creation. Builder may prepare a sanitized task script and evidence template. Human acceptance records only task result, route, supported viewport class, timestamp, synthetic labels and material UX findings.

Use an exact-source, alias-free non-production Preview. Read current target/configuration before mutation, add only the minimum scoped Preview callback or fixture state if required, preserve production Site URL, aliases, DNS, providers and data, and remove exact Sprint-owned temporary state after acceptance unless retention is expressly authorised.

Allow at most two diagnosed, cooldown-safe human attempts. After a failure, diagnose once with sanitized evidence, make an in-scope correction, revalidate/redeploy, and make at most one further attempt. Do not retry blindly.

## Approved files and actions

Builder may:

- create a scoped `codex/035-first-trainer-access-and-core-journey` branch/worktree from the exact 034 SHA;
- change only the sign-in, `/portal`, horse workspace, narrow shared UI, existing authorised read composition and sign-out surfaces required by the journey;
- add focused pure derivations, synthetic fixtures, tests, Preview harness/configuration and sanitized evidence;
- make deterministic validator, reporter, formatting, encoding and harness corrections inside the outcome;
- create and later clean exact synthetic Preview account/application records through existing contracts with private product-owner coordination;
- deploy an exact-source alias-free Preview, commit intentionally and push only the scoped branch when required for Preview; and
- update Sprint 035 review evidence and canonical planning closeout files.

## Explicitly out of scope

- Production deployment, production aliases/domains, DNS, production provider/data mutation, merging or pushing `develop`, PR creation or public reopening.
- New schema, migration, RPC, RLS, role, permission, membership, assignment or persisted data contract.
- New formulas, thresholds, result labels, recommendations, clinical ranking or domain guidance.
- Upload/evidence lifecycle, voice, OCR, audio/transcription, trends/charts, sophisticated saved views, commerce, enquiry delivery, pricing or broad public work.
- Broad onboarding, multiple participant cohorts, real horse/stable/customer data, support operations or a Core Product Done claim.

## Evidence-proportional execution and manual intervention

Stop only for material baseline/target ambiguity, secret or protected-data exposure, participant ambiguity, destructive uncertainty, unauthorised scope expansion, auth/RLS/privacy/integrity failure, contract expansion, unexpected real data, production impact, partial external mutation or cleanup that cannot be proven safe.

Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope tooling, harness, credential-refresh, validator, formatting, encoding, reporter and deterministic corrections in Sprint 035. Do not create a follow-up solely because Docker, browser automation, a renderer, clipboard control, schema dump, optional CLI path or redundant verifier is unavailable.

Manual intervention is the last safe option. When genuinely required, record what is blocked, evidence checked, exact private user action, step-by-step instructions and what Builder will verify afterward. Never ask the user to paste protected values.

============================================================
FILE: planning/sprints/035-first-trainer-access-and-core-journey/blueprint.md
============================================================

# Sprint 035 Blueprint

## Delivery sequence

1. Verify the exact clean 034 baseline SHA, remote backing, migration/lockfile identity and closed status. Create only the scoped 035 branch/worktree.
2. Inventory the current sign-in, session/bootstrap, portal dashboard, horse workspace, permission, biochemistry action, sign-out, test and Preview surfaces. Record the approved implementation manifest before product edits.
3. Define a typed state/action matrix for zero/one/many accessible horses and applicable incomplete, pending, completed, unavailable, failed, denied and revoked cases. Map every displayed value and action to an existing authorised source.
4. At the mandatory Builder code gate, present the exact file-by-file product plan, scope guards and acceptance criteria and wait for explicit approval before editing files outside `planning/` and `docs/`.
5. Implement only the smallest corrections needed for truthful sign-in, assigned-horse dashboard orientation, horse workspace/action, return navigation, sign-out and repeat sign-in. Keep server composition bounded and permission-aware.
6. Add deterministic synthetic tests for derivation, route/permission agreement, denial non-leakage, empty/error states, keyboard/focus semantics and supported phone/larger viewports.
7. Run focused 021AH and 022/022B regressions plus canonical validation and production build. Correct in-scope deterministic failures without creating another sprint.
8. With private product-owner coordination, establish exactly one designated participant and the minimum clearly synthetic stable, assigned horse, workflow state and inaccessible-horse denial case through existing contracts. Record ownership and cleanup order without identifiers.
9. Commit and push only the scoped branch if required, deploy an exact-source alias-free Preview, prove Preview identity/health/sign-in/anonymous denial, and preserve production configuration.
10. Guide the trainer through sign-in, assigned dashboard, horse workspace, one permitted action, return, sign-out and repeat sign-in on a supported phone; repeat the orientation check on a tablet or desktop viewport. Retain sanitized task evidence only.
11. Correct and retest any material in-scope failure within the two-attempt boundary. Record different feature requests for later planning.
12. Clean exact Sprint-owned temporary callback/fixture/account state unless retention is expressly authorised. Reconcile zero unexpected application/Auth/Storage state and unchanged production.
13. Record one permitted outcome and refresh the Sprint review, lifecycle ledger, state, status, schedule, evidence index and Architect briefing. Keep Core Product Done false.

## Design and messaging application

Use the authenticated utilitarian direction in `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`: racing green/midnight navy relationship, legible mobile task flow, functional status colours with text/context, keyboard-visible focus and informational language supporting trainer judgement. The sprint crosses no design-authority architecture gate unless an existing auth/permission contract proves insufficient; that condition requires a clean stop.

## Rollback and cleanup

Preview must remain alias-free. On failure, remove or replace only the exact Sprint-owned Preview callback/deployment linkage after read-before-write verification. Remove synthetic application dependencies before an exact Sprint-created Auth identity, and Auth last. Never delete an adopted, pre-existing or ambiguous identity. Production release, aliases, Site URL and rollback target remain unchanged.

## Closeout outcomes

- `first-trainer-access-and-core-journey-complete-clean`
- `trainer-participation-pending-clean` when all non-human Preview proof passes but the designated human/private account action is unavailable
- `trainer-baseline-unavailable-clean`
- `trainer-contract-expansion-required-clean`
- `trainer-access-validation-blocked-clean`
- `trainer-access-cleanup-blocked` only when exact safe cleanup remains materially unresolved and the full manual-intervention record is present

============================================================
FILE: planning/sprints/035-first-trainer-access-and-core-journey/acceptance.md
============================================================

# Sprint 035 Acceptance

## Baseline and scope

- [ ] Work starts only from clean local/remote-backed `codex/034-reconciled-product-baseline` SHA `ea8417d3c7450f25c90644f23d8558c9f5938552` in a scoped 035 branch/worktree.
- [ ] Existing 035-series Packs/artifacts remain non-authoritative historical inputs and no unproven later lineage is inherited.
- [ ] Approved-path manifest and typed state/action matrix are recorded before product edits.
- [ ] No schema, migration, RPC, RLS, role, permission, assignment, clinical, upload, voice, trend, commerce, public or production behaviour changes.

## Trainer journey

- [ ] One designated human trainer privately completes approved-account sign-in without exposing authentication material.
- [ ] `/portal` shows only the exact assigned synthetic horse/stable; inaccessible records affect no row, count, order or navigation.
- [ ] Displayed workflow state, basis, timestamp and next action agree with existing authorised contracts; missing/inaccessible data fails closed.
- [ ] The trainer opens the horse workspace, recognises the synthetic context, follows one existing permitted biochemistry action and returns without losing orientation.
- [ ] Wrong-horse/cross-stable and anonymous/revoked access deny without identity, count, workflow or existence leakage.
- [ ] Sign-out denies protected access and repeat sign-in restores the same bounded assignment.
- [ ] No display implies clinical urgency, diagnosis, treatment, supplementation, race readiness or performance prediction.

## Usability and accessibility

- [ ] The complete task is usable on a supported phone and orientation is verified on at least one tablet or desktop viewport without horizontal page overflow.
- [ ] Headings, landmarks, controls, accessible names, keyboard navigation and visible focus pass.
- [ ] Status never relies on colour alone; empty, incomplete, pending, completed, unavailable, denied and failed states are distinct where applicable.
- [ ] Trainer feedback records task completion, confusing language, missing orientation and mobile friction without protected values or real identifiers.

## Preview, privacy and safety

- [ ] Preview is exact-source, Ready, non-production and alias-free; production Site URL, aliases, DNS, providers and data remain unchanged.
- [ ] Synthetic fixture/account ownership and dependency-safe cleanup order are recorded before creation.
- [ ] Fixtures contain no real horse, stable, clinical, trainer-business, owner or customer information.
- [ ] No email, code, link, mailbox content, cookie, token, credential, session data or personal identifier appears in chat, commands, URLs, logs, screenshots or repository evidence.
- [ ] Human attempts do not exceed two and any retry follows diagnosis and an in-scope correction.
- [ ] Exact Sprint-owned temporary callback/fixture/account state is removed after acceptance unless expressly retained; ambiguous or pre-existing identities are untouched.

## Validation and closeout

- [ ] Focused sign-in/session/bootstrap, dashboard derivation, permission, route, denial, component, responsive and accessibility tests pass.
- [ ] Maintained Sprint 021AH and 022/022B journey regressions pass.
- [ ] `npm run validate:json`, `npm run test:domain`, `npm run test:roles`, `npm run test:supabase-self`, `npm run validate:static`, `npm run typecheck`, `npm run lint` and `npm run validate:local` pass.
- [ ] `npm run build` passes from the exact candidate or an equivalent clean reparse-safe workspace, with substitution recorded.
- [ ] `git diff --check`, approved-path, exact staged-manifest, secret/private-data and generated-artifact checks pass.
- [ ] Scoped local/remote SHA equality and Preview identity are recorded when push/Preview actions occur.
- [ ] Production and unrelated external state remain unchanged; cleanup is proven.
- [ ] Review, lifecycle ledger, state, status, schedule, evidence index and Architect briefing agree on exactly one permitted outcome and do not claim Core Product Done.

============================================================
FILE: planning/sprints/035-first-trainer-access-and-core-journey/handoff-prompt.md
============================================================

You are Builder for Sprint 035 — First Trainer Access And Core Journey.

Apply Architect Pack `planning/architect-packs/architect-pack-035-first-trainer-access-and-core-journey.md`, verify that it generates exactly four files under `planning/sprints/035-first-trainer-access-and-core-journey/`, and execute only from those generated sprint files.

Start only from clean branch `codex/034-reconciled-product-baseline` at exact local and remote-backed SHA `ea8417d3c7450f25c90644f23d8558c9f5938552`. Create a clean scoped branch/worktree named `codex/035-first-trainer-access-and-core-journey`. Do not use the dirty `develop` root, older 035 artifacts, an unproven 035I lineage, a temporary candidate or file recency. Read `AGENTS.md`, the agent identity, all four generated Sprint 035 files, Sprint 034 closeout authorities, the final acceptance/ownership records, design and messaging authority, auth/RLS evidence, biochemistry workflow evidence, operations handoff and current candidate source before mutation.

Deliver one outcome: one product-owner-designated human trainer safely completes approved-account sign-in, sees only the assigned synthetic horse/stable on `/portal`, opens the horse workspace, follows one existing permitted biochemistry action, returns to the dashboard, signs out, and signs in again on an exact-source alias-free non-production Preview. Prove phone usability plus orientation on one larger viewport. Keep language operational and non-clinical.

Before product edits, verify baseline identity and record the approved-path manifest plus typed state/action matrix. At the mandatory code gate, present the exact file-by-file product plan, scope guards and acceptance criteria and wait for explicit approval before editing anything outside `planning/` and `docs/`. Reuse existing auth, schema, migrations, RLS, roles, membership, assignment and biochemistry contracts. If a material contract change is required, close `trainer-contract-expansion-required-clean` without inventing it.

The participant privately controls their mailbox and enters all authentication material. Never request, inspect, transfer, log, screenshot or retain their email, code, link, mailbox content, cookies, tokens, credentials, session material or identifiers. Use only clearly synthetic non-identifying stable, horse and workflow fixtures established through existing contracts. Obtain private product-owner designation and authority before account/fixture creation. Record exact ownership and dependency-safe cleanup order without protected values.

Make only the smallest in-scope sign-in, dashboard, horse workspace, navigation, sign-out, typed composition, synthetic fixture, test, harness and Preview corrections needed for the journey. Do not add signup, passwords, social login, auth bypass, mailbox automation, schema/RLS/role changes, clinical intelligence, uploads, voice/OCR, trends, commerce, enquiry delivery, broad public work or real data.

Run focused auth/dashboard/permission/accessibility tests, maintained 021AH and 022/022B regressions, canonical JSON/domain/roles/Supabase-self/static/TypeScript/lint/local validation, a production build from the exact candidate or documented equivalent clean workspace, `git diff --check`, approved-path, staged-manifest, secret/private-data and generated-artifact checks. Keep equivalent or stronger safe substitute proof and deterministic in-scope corrections inside Sprint 035.

Commit intentionally and push only the scoped Sprint 035 branch if required for Preview. Deploy only an exact-source alias-free non-production Preview after read-before-write target verification. Preserve the accepted production release, Site URL, aliases, DNS, providers and production data. Prove Preview identity, health/sign-in rendering and anonymous protected-route denial before human action.

Guide the trainer through the complete task privately and retain only sanitized task results, route, viewport class, timestamp, synthetic labels and material UX findings. Allow at most two cooldown-safe human attempts. After the first failure, diagnose once, make an in-scope correction, revalidate/redeploy and make at most one further attempt. Builder-only testing is not human acceptance.

After acceptance, remove exact Sprint-owned synthetic application dependencies and temporary callback state unless the product owner expressly authorises retention. Delete an exact Sprint-created Auth identity last. Never delete an adopted, pre-existing or ambiguous identity. Reconcile cleanup and prove production remained unchanged.

Stop only for a material target/baseline, secret/protected-data, participant ambiguity, destructive, auth/RLS/privacy/integrity, contract, production, scope, partial-mutation or cleanup risk. Use manual intervention only after safe alternatives are exhausted; record the blocker, evidence checked, exact private steps and subsequent verification. Never ask for protected values.

At closeout refresh the Sprint review, lifecycle ledger, state, status, schedule, evidence index and Architect briefing; record exact source/Preview identity, participant result, fixture disposition, cleanup, validation and one permitted outcome. Do not deploy to production, merge or push `develop`, open a PR, broaden onboarding or claim Core Product Done.
