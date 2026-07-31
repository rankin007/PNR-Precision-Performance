============================================================
FILE: planning/sprints/035K-live-trainer-access-and-human-acceptance/requirements.md
============================================================

# Sprint 035K — Live Trainer Access And Human Acceptance

## Goal

Turn the existing trainer dashboard into a genuinely usable production journey for one product-owner-designated human tester: privately request and receive a six-digit sign-in code, establish a session, enter the trainer dashboard, see exactly one authorised synthetic stable/horse workspace, follow the existing permitted next action, prove wrong-horse denial, sign out, and sign in again.

Target outcome: `live-trainer-access-and-human-acceptance-complete-clean`.

This is an outcome-recovery sprint. It replaces the unexecuted Sprint 035J direction. Do not apply `architect-pack-035J-operator-only-oauth-enrollment-and-protected-authentication-acceptance.md`, create a Google Desktop OAuth client, automate a mailbox, or extend the protected-harness chain. A human using their own private mailbox is the required product acceptance path.

## Workflow profile

Strict. This sprint includes production authentication, a privately identified tester, bounded production account and synthetic application data, Supabase and Resend behaviour, Preview callback configuration, Vercel Preview and production deployment, session/permission evidence, and exact cleanup or explicitly accepted retention.

## Starting authority and baseline

Start from closed Sprint 035I branch `codex/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance` at exact clean local/remote SHA `fe27561e7452909e588182ac1e47155882fc0c8c` and outcome `gmail-secure-adapter-readiness-blocked-clean`.

Create only `codex/035K-live-trainer-access-and-human-acceptance`. Do not start from the dirty `develop` worktree, the unexecuted 035J branch, a reconstructed historical Pack, a deployment directory, or an older Sprint 035 candidate.

Preserve and re-verify before mutation:

- approved Supabase project `uvskssaecdhxcgytkasc`; never contact old project `tagnbgkroihagjmvehlx`;
- current production deployment `dpl_9zVS8HSujThkFTP3hisyfBVknKWb` at exact source `7d12e0d229324d8b07bcff7cb76bcc11f4d6477a` and all five accepted stable aliases;
- compatible Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`;
- alias-free Preview `dpl_J7bSHyQ8heNrqHWw38GdFNvpaaK4` as historical evidence only, not an assumed current candidate;
- the exact production Site URL and current callback set until the scoped Preview callback is rotated safely;
- Resend hosted integration, approved sender, one-token/no-link template, six-digit OTP, `3600`-second expiry and known rate-limit classifications unless executable evidence proves a narrow correction is required;
- current public website, pricing, disabled public enquiry, protected routes, Supabase schema/migrations/RLS/roles, public aliases, DNS and production data unrelated to the exact tester fixture;
- the three preserved pre-035K Auth identities unless one is privately proven as the exact designated tester and is expressly adopted without ambiguity;
- no retained Google Desktop OAuth client, grant or Gmail Credential Manager material; and
- the later 035F bootstrap-concurrency and OTP recovery corrections already contained in the 035I baseline.

Record the exact baseline, source-to-production product diff, deployment identities, clean worktree and remote equality before product or provider mutation. If the exact 035I baseline is unavailable or materially unclean, close `trainer-baseline-unavailable-clean` without product/provider changes.

## Accepted product-owner decisions

- The product owner will act as, or privately coordinate, the first trainer acceptance tester using a mailbox they control.
- The tester's email address, delivered code, mailbox contents, credentials, tokens and private account identifiers must not enter chat, commands, logs, URLs, screenshots, repository files or retained evidence.
- Human mailbox use is the acceptance mechanism. Gmail API, OAuth client creation, IMAP, browser scraping and mailbox automation are neither required nor permitted.
- The public enquiry remains visibly non-submitting in this sprint. Its accepted storage/email/privacy direction is reserved for Sprint 029N.

## Task contract

**objective:** Deliver one complete, human-proven trainer sign-in and assigned-horse dashboard journey on Preview and then production from one exact accepted candidate.

**owns:** The narrow sign-in/authentication UX and actions, existing bootstrap correction path, existing trainer dashboard/horse workspace composition where executable proof exposes an in-scope defect, focused tests, one bounded tester identity and synthetic fixture graph, scoped Preview configuration/deployment, exact production promotion/rollback, and sprint closeout evidence.

**must_not:** Automate or inspect the mailbox; create Google OAuth material; change schema/migrations/RLS/roles/permission meaning; use real horse/stable or clinical data; implement the public enquiry; change commerce, scoring, recommendations, uploads, voice, trends, DNS or unrelated public content; merge or push `develop`; expose protected values; or claim product-wide Done.

**acceptance:** The designated tester privately receives and enters a code, reaches `/portal`, sees only the authorised synthetic horse, opens its workspace, follows one existing permitted action, is denied an inaccessible horse without leakage, signs out, and repeats sign-in on the exact production candidate. Public and protected safety checks pass, the exact accepted SHA is deployed and rollback-ready, and tester/fixture retention or cleanup is explicit.

**verification:** Run focused auth/OTP/bootstrap/dashboard/permission tests, canonical validation, lint, typecheck, production build, exact Preview rendered acceptance, human Preview acceptance, exact-source deployment checks, production human smoke, wrong-horse denial, route/public safety smoke, private-data/secret scanning, diff/staged-manifest checks and final remote/worktree reconciliation. Equivalent or stronger evidence may replace a supporting tool but not delivered-code, session, permission, production or cleanup/retention behaviour.

## Product and access requirements

### 1. Truthful sign-in experience

The production sign-in page must describe capability truthfully. Environment-variable presence alone must not be represented as proof that a user is provisioned or that delivery has succeeded.

- Replace raw-path presentation such as `Next destination: /portal` with clear user language such as `After sign-in: Trainer dashboard`.
- Remove `Continue after setup`; it does not authenticate and currently creates a redirect loop for anonymous users.
- Preserve a clear return to the public site.
- Explain that access is for approved accounts and that a code may arrive only for an approved account.
- Preserve non-enumerating responses: a missing identity must not be distinguishable from an accepted request through public messaging.
- Preserve the six-digit code entry, `Already have a code?` recovery, resend cooldown, generic invalid/expired/reused handling, transient-only email/code inputs and normalised safe `/portal` redirect.
- Do not add public self-registration, password authentication, social login or a bypass around session/membership enforcement.

### 2. Exact designated tester provisioning

Use one privately designated tester. The Builder must not request the email address, code or credentials in conversation or retain them in evidence.

Before creating anything, use a protected operator-owned input path to classify whether the exact tester already has an Auth identity and application profile. Do not enumerate or expose unrelated identities. If more than one possible match, cross-project uncertainty or ownership ambiguity exists, stop before mutation.

Use existing governed contracts only to establish:

- one exact confirmed Auth identity capable of `shouldCreateUser:false` OTP sign-in;
- one canonical application user/profile;
- one active trainer membership carrying the existing `horse.records.write` permission;
- one synthetic stable with a clearly non-identifying Sprint 035K label;
- one synthetic horse assigned to that trainer/stable through existing access contracts;
- the minimum existing synthetic biochemistry state needed to show one honest dashboard workflow state and one permitted next action; and
- one separately generated inaccessible synthetic horse identifier or governed denial fixture that proves no identity/state leakage without exposing another real record.

Do not change membership codes, permission meaning, role matrix, RLS, schema, migrations, RPCs or assignment semantics. Prefer existing admin/application flows and existing authenticated provisioning or test-fixture mechanisms. If a new source/schema/contract is materially required, close `trainer-provisioning-contract-expansion-required-clean` without inventing it.

The tester fixture must contain no real horse, stable, clinical, owner, trainer-business or customer information. Use obvious synthetic labels and no free-text clinical notes, uploads or Storage objects.

At the end of acceptance, ask the tester privately whether the exact account and synthetic fixture should remain as the bounded pilot account. Retain only after the tester returns the sanitized confirmation `Retain the Sprint 035K pilot trainer account and synthetic fixture.` Otherwise remove the exact 035K application graph dependency-safely and Auth last, then prove exact-owned application/Auth/Storage `0/0/0`. Never delete or modify an ambiguous or pre-existing unrelated identity.

### 3. Preview human journey

Create an exact-source, alias-free Vercel Preview from the clean 035K candidate. Rotate only the superseded temporary Preview callback after read-before-write and preserve production callback/Site URL. Do not attach a production/custom alias.

Before asking the tester to act, prove:

- exact source SHA and Preview identity;
- sign-in and health routes render;
- anonymous `/portal` returns safely to same-Preview sign-in;
- Resend/sender/template/six-digit/cooldown classifications are compatible;
- tester and fixture preconditions are exact and bounded; and
- no production alias, DNS, public enquiry, commerce or unrelated data changed.

The tester then privately:

1. opens the exact Preview sign-in page;
2. enters their private approved email;
3. requests a code;
4. confirms only whether one current six-digit code arrived;
5. enters the code privately;
6. reaches the trainer dashboard;
7. confirms the synthetic stable and horse are recognisable as test data;
8. opens the horse workspace and follows the existing permitted next action;
9. returns to the dashboard, signs out, and signs in again; and
10. reports task completion and confusing wording or friction without sharing protected values.

Builder may inspect/render the authenticated application only after private code entry and only when the visible data is the exact non-identifying synthetic fixture. Do not inspect the mailbox or retain the email/code. Evidence may record boolean/task outcomes, synthetic labels, routes, viewport and timestamps but no protected identifiers or session material.

Allow at most two focused human attempts for a diagnosed delivery or verification failure, respecting the provider cooldown and never repeating blindly. Diagnose the first failure through sanitized application/provider classifications, correct an in-scope cause, redeploy an exact candidate when source changes, and use the second attempt only when safe. A typo corrected before submission is not a provider retry. Do not turn a human acceptance failure into another mailbox-automation sprint.

### 4. Dashboard and permission agreement

After authentication, the exact tester must:

- land on `/portal` without a redirect loop or first-user bootstrap collision;
- see only accessible horses and stable context;
- see the exact synthetic horse with an accurate workflow state, basis/time and one permitted existing next action;
- open `/portal/horses/[horseId]`, return to the trainer dashboard and follow the existing capture/review action;
- receive safe denial for the inaccessible horse without name, stable, state, count or existence leakage;
- retain the same membership/assignment behaviour after sign-out/sign-in; and
- never see missing/failed information presented as normal, Green, complete or actionable.

Correct narrow inherited application defects exposed by this journey inside Sprint 035K. Do not broaden the dashboard, add new product capabilities or reinterpret clinical data.

### 5. Exact production promotion and human smoke

After automated/rendered Preview checks and the complete human Preview journey pass, commit intentionally, push only the scoped 035K branch, verify local/remote equality and deploy the exact accepted SHA to the intended Vercel production project.

Before alias promotion, record the existing Ready production and compatible rollback. Promote without DNS changes, verify all five accepted aliases point to the new Ready deployment, and run public/protected/API smoke.

The tester must then privately repeat the essential production journey: request one code after the applicable cooldown, receive/enter it, reach `/portal`, see the assigned synthetic horse, open its workspace, prove one permitted action is present, sign out and sign in again. A production failure triggers the safest exact rollback when required; do not leave aliases on a known-broken candidate.

Production acceptance does not authorize public self-registration, broad customer onboarding, real horse/stable data, Participant A/B/C activation, commerce, the public enquiry backend or product-wide Done.

## Approved files and actions

Builder may change only files directly required for the accepted journey:

- `app/sign-in/page.tsx`;
- `components/auth/sign-in-form.tsx`;
- `app/auth/actions.ts` and `app/auth/callback/route.ts` only for an executable in-scope auth defect;
- `lib/auth/otp-entry-flow.ts`, `lib/auth/otp-request.ts`, `lib/auth/otp-verification.ts`, `lib/auth/redirect-origin.ts`, `lib/auth/bootstrap-concurrency.ts`, `lib/auth/bootstrap.ts`, `lib/auth/session.ts` and `lib/auth/app-context.ts` only where the accepted journey proves a narrow defect;
- `app/(portal)/portal/page.tsx`, `app/(portal)/portal/horses/[horseId]/page.tsx`, `lib/domain/horses.ts` and `lib/domain/stable-workspace.ts` only where required for permission/state agreement;
- narrow reusable sign-in, portal, status or navigation components directly used by those routes;
- focused deterministic tests and a bounded 035K provisioning/cleanup/acceptance helper under `scripts/`, with protected input and sanitized output only;
- `package.json` only for focused test registration;
- `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md` and `docs/OPERATIONS_HANDOFF.md` only where the working human procedure changes them;
- generated 035K sprint files, one 035K review, and current lifecycle/evidence/briefing files required for closeout.

Approved external actions are limited to:

- read-only reconciliation of the approved Supabase/Vercel/Resend targets;
- one exact privately identified tester Auth/application membership graph and one synthetic stable/horse/test graph;
- exact Preview deployment and one temporary callback rotation;
- bounded OTP requests and verifications needed for the two human journeys, with no blind repetition;
- exact production deployment/promotion and rollback if required;
- exact 035K-owned cleanup or explicitly accepted pilot retention;
- intentional commit and push of only the scoped 035K branch.

Any extra file/action must be demonstrably necessary to the same approved outcome, recorded before mutation, and remain inside these boundaries. A material schema, RLS, role, permission, public enquiry, Gmail/OAuth, commerce or broader product change requires a new Architect decision.

## Explicitly out of scope

- Applying or executing Sprint 035J.
- Gmail API/OAuth clients, mailbox automation, IMAP/POP, browser scraping, email forwarding rules or mailbox credentials.
- Public self-registration, passwords, social login, broad invitations or Participants A/B/C activity.
- Schema, migration, RPC, RLS, role, membership-code, permission-meaning or assignment-contract changes.
- Real horse, stable, trainer-business, owner, customer, clinical, upload or Storage data.
- Public enquiry submission/storage/email; that is Sprint 029N.
- Clinical thresholds, scoring formulas, recommendations, uploads, voice, transcription, trends or broad reporting.
- Checkout, Stripe, pricing, subscriptions, public content redesign, SEO/indexing, DNS or unrelated Vercel/Supabase settings.
- Merge/PR, `develop` push, history rewrite, broad branch cleanup or deletion of ambiguous identities.
- Product-wide Done, broad trainer rollout or production readiness beyond this exact journey.

## Evidence-Proportional Execution and manual intervention

Stop only for a material wrong/ambiguous baseline or target, secret/protected-data exposure, tester-identity ambiguity, destructive uncertainty, unauthorised scope expansion, auth/RLS/privacy/integrity failure, schema/contract requirement, provider/deployment partial state, production impact or cleanup that cannot be proven safe.

Substitute equivalent or stronger safe evidence when a supporting tool is unavailable. Keep in-scope UI, auth/bootstrap, test-harness, provisioning helper, validator, reporter, formatting, encoding, credential-refresh and deterministic fixture corrections in Sprint 035K. Do not create another follow-up solely because browser automation, mailbox automation, a renderer, clipboard access, schema dump, optional CLI path or redundant verifier is unavailable.

Human mailbox and sign-in participation are required product acceptance, not a fallback. Other manual intervention is last resort. For every genuine intervention, record what is blocked, evidence checked, exact private user action, and what Builder will verify afterward. Never request protected values or screenshots containing them.

============================================================
FILE: planning/sprints/035K-live-trainer-access-and-human-acceptance/blueprint.md
============================================================

# Sprint 035K Blueprint

## 1. Establish one clean truth

1. Verify closed 035I local/remote SHA `fe27561e7452909e588182ac1e47155882fc0c8c`, clean worktree and outcome.
2. Create only `codex/035K-live-trainer-access-and-human-acceptance` in a clean worktree.
3. Do not apply 035J. Record it as an unexecuted superseded direction without deleting history.
4. Reconcile current production, rollback, five aliases, approved Supabase project, callback set, Resend/template/OTP configuration and preserved identities through sanitized evidence.
5. Record the exact application-source diff from current production source `7d12e0d229324d8b07bcff7cb76bcc11f4d6477a` to 035I before deciding which already-implemented fixes need production promotion.

## 2. Define the exact human journey and fixture

1. Record the five-step acceptance path: sign in, dashboard, horse workspace, permitted action, sign out/repeat.
2. Record a field-minimal synthetic fixture manifest and dependency-safe cleanup order before creating anything.
3. Define allowlisted sanitized classifications for identity found/created, membership, assignment, OTP requested/received/verified, session, routes, denial, retention and cleanup.
4. Prove that private email/code/session values cannot enter output, URLs, logs, screenshots or durable evidence.

## 3. Make sign-in truthful and bounded

1. Remove the unauthenticated `Continue after setup` loop.
2. Replace raw `/portal` destination language with a trainer-dashboard description.
3. Make status copy distinguish configured service from actual account/delivery success.
4. Preserve approved-account-only OTP, generic anti-enumeration, six-digit entry, recovery, cooldown and safe redirect contracts.
5. Add focused deterministic tests for copy/control truth, missing-account indistinguishability, zero public signup, input privacy, retry/cooldown and redirect behaviour.

## 4. Prepare the tester safely

1. Receive only the tester's sanitized readiness confirmation; do not request their email in chat.
2. Through protected operator input, exact-match the designated tester against the approved project without enumerating unrelated identities.
3. Reuse an exact unambiguous tester identity or create exactly one confirmed identity without public signup or an unnecessary preparation email.
4. Use existing governed contracts to establish the canonical profile, active trainer membership, existing record-write permission, synthetic stable, one assigned synthetic horse and minimum synthetic workflow state.
5. Prove the inaccessible-horse denial fixture without using or exposing real data.
6. Reconcile exact owned counts and record cleanup/retention authority before sending an OTP.

## 5. Deploy and prove Preview

1. Run focused and canonical pre-deployment gates.
2. Commit the exact candidate intentionally and deploy it as an alias-free Preview.
3. Replace only the superseded temporary Preview callback after read-before-write; preserve production callback and Site URL.
4. Prove exact source, Ready/Preview classification, zero aliases, sign-in render, health, same-origin anonymous denial and unchanged production/public boundaries.
5. Guide the tester through private code request/entry and the complete synthetic trainer journey.
6. Record task outcomes and UX friction without protected values.
7. For a material failure, diagnose once using sanitized evidence, make an in-scope correction, revalidate/redeploy, and use at most one further safe human attempt.

## 6. Prove permission and state agreement

1. Confirm session and canonical application user bootstrap without collision.
2. Confirm the exact trainer membership and permission.
3. Confirm dashboard rows/count/order include only the exact assigned synthetic horse.
4. Confirm horse workspace and existing permitted next action.
5. Confirm wrong-horse denial leaks no identity or state.
6. Sign out, prove anonymous denial, sign in again and reconfirm the same assignment.

## 7. Promote the accepted candidate

1. Complete Preview acceptance, final validation/build and private-data/secret/diff/staged-manifest checks.
2. Push only the scoped 035K branch and prove local/remote SHA equality.
3. Record current production and rollback immediately before promotion.
4. Deploy the exact accepted SHA to the intended Vercel production project and map the five existing aliases without DNS changes.
5. Run public, pricing, disabled-enquiry, health, sign-in, protected-route and unsafe-method smoke.
6. Have the tester privately repeat code receipt/entry, dashboard, horse workspace, permitted action, sign-out and second sign-in on production.
7. Roll back exactly if the production journey or safety boundary fails and cannot be corrected safely within the bounded attempt policy.

## 8. Retain or clean up exactly

1. Ask for only the sanitized retain sentence defined in requirements.
2. If received, preserve exactly the tester account and synthetic fixture as the bounded pilot, document owner and purpose, and prove no broader records exist.
3. Otherwise remove exact 035K application records dependency-safely, delete exact 035K-created Auth last and prove application/Auth/Storage `0/0/0`.
4. Never delete an adopted pre-existing tester identity without separate exact authority; remove only 035K-owned application/fixture records where safe.

## 9. Close one outcome

Reconcile source/deployments/aliases/callbacks/provider/template, tester disposition, exact-owned records, preserved identities, public enquiry boundary, production smoke, local/remote equality and clean worktree. Refresh the 035K review, lifecycle ledger/state/status/schedule/evidence/briefing and mark exactly one permitted outcome without declaring product-wide Done.

## Rollback

Before production promotion, remove only exact 035K-owned Preview callback/fixture state when required and preserve the accepted production deployment. After promotion, remap all five aliases to the recorded compatible Ready rollback if the accepted journey or route safety fails. Reconcile session/application records, then clean exact 035K fixture dependencies and Auth last where cleanup is selected. Never delete ambiguous identities, unrelated data, production aliases or provider configuration by inference.

============================================================
FILE: planning/sprints/035K-live-trainer-access-and-human-acceptance/acceptance.md
============================================================

# Sprint 035K Acceptance

## Baseline and scope

- [ ] Exact clean local/remote 035I SHA `fe27561e7452909e588182ac1e47155882fc0c8c` is the starting authority and only the scoped 035K branch/worktree is used.
- [ ] Sprint 035J remains unapplied; no Google OAuth client, grant, Gmail credential or mailbox automation is created or used.
- [ ] Approved Supabase project, current production/rollback/five aliases, callback set, Resend/template/OTP state, preserved identities and dirty-`develop` exclusion are recorded before mutation.
- [ ] Exact production-source-to-035K application diff is reviewed; no unrelated historical branch content is silently promoted.
- [ ] No schema, migration, RPC, RLS, role, permission meaning, public enquiry, commerce, clinical, upload, voice, trend, DNS or unrelated public behaviour changes.

## Truthful sign-in

- [ ] `Continue after setup` is absent and an anonymous user cannot enter a misleading `/portal` loop.
- [ ] Destination/status copy uses plain trainer language and does not treat environment presence as delivery/account proof.
- [ ] Approved-account-only six-digit OTP, `Already have a code?`, cooldown, generic anti-enumeration, safe error handling and normalised `/portal` redirect remain enforced.
- [ ] Email/code stay transient and absent from URL, logs, screenshots, analytics, storage and durable evidence.
- [ ] Public self-registration, passwords, social login and auth bypass remain unavailable.

## Tester and fixture

- [ ] One product-owner-designated tester participates through a private mailbox without sharing protected values.
- [ ] Exact tester identity is privately matched or created without enumerating/mutating unrelated identities.
- [ ] Exactly one canonical profile, active trainer membership, existing write permission, synthetic stable, assigned synthetic horse and minimum workflow fixture exist through existing contracts.
- [ ] Fixture labels/data are clearly synthetic and contain no real horse, stable, clinical, owner, customer or trainer-business information.
- [ ] An inaccessible-horse case exists only for safe denial proof and leaks no protected/real data.
- [ ] Fixture dependency/ownership ledger and cleanup or retention path are established before OTP send.

## Preview human acceptance

- [ ] Exact-source Preview is Ready, Preview-classified, alias-free, uses only its exact temporary callback and preserves production Site URL/callback.
- [ ] Sign-in, health and same-Preview anonymous `/portal` denial pass before human action.
- [ ] The tester privately requests and receives one current six-digit code and enters it without protected-value exposure.
- [ ] Verification establishes a session and lands on `/portal` without redirect loop or bootstrap collision.
- [ ] Dashboard shows exactly the assigned synthetic horse/stable and an accurate workflow state/basis/time/next action.
- [ ] Tester opens the horse workspace, follows one existing permitted action, returns, signs out and signs in again.
- [ ] Wrong-horse denial leaks no name, stable, state, counts or existence.
- [ ] Human task results and material UX findings are recorded without email, code, identifiers, session data or real records.
- [ ] No more than two diagnosed, cooldown-safe human attempts occur; no blind resend/retry or mailbox automation occurs.

## Validation and production promotion

- [ ] Focused OTP/request/verification/redirect/bootstrap/dashboard/permission tests pass.
- [ ] Canonical JSON, domain, roles, Supabase self-test, static, TypeScript, lint and local validation pass.
- [ ] Production build passes from the clean exact candidate or documented equivalent/stronger reparse-safe proof.
- [ ] Private-data/secret, generated-artifact, diff/encoding and staged-manifest checks pass.
- [ ] Scoped branch is intentionally committed/pushed and exact local/remote SHA equality is recorded.
- [ ] Exact accepted SHA deploys Ready to the intended production project; five accepted aliases map to it and compatible rollback remains Ready.
- [ ] Public homepage, pricing, disabled enquiry, health, sign-in, protected redirects and unsafe-method safety smoke pass.
- [ ] Tester repeats code receipt/entry, `/portal`, assigned horse/workspace/action, sign-out and second sign-in on production.
- [ ] Production failure triggers exact rollback when required; no known-broken candidate remains on stable aliases.

## Retention/cleanup and closeout

- [ ] Tester returns either the exact sanitized retain sentence or no retain authority is assumed.
- [ ] If retained, the exact pilot identity/fixture, purpose and owner are recorded without protected values and no broader synthetic graph remains.
- [ ] If not retained, exact-owned application records are deleted dependency-safely, Auth is deleted last when 035K-created, and application/Auth/Storage `0/0/0` is proven.
- [ ] Pre-existing or ambiguous identities remain untouched unless exact adopted-tester authority governs only in-scope application records.
- [ ] Preview callback, production/rollback/aliases, Resend/template/OTP state, public enquiry boundary and unrelated production data reconcile safely.
- [ ] Review/state/status/schedule/evidence/lifecycle/briefing agree; scoped worktree is clean and local/remote tips match.
- [ ] Participant A/B/C, broad rollout, full production readiness and product-wide Done are not claimed.

## Stop conditions

Stop for wrong/ambiguous branch or target, private tester identity ambiguity, secret/protected-data exposure, unsafe external mutation, unexpected real data, schema/RLS/role/permission requirement, authentication or cross-horse isolation failure, source/deployment mismatch, partial promotion, production regression, destructive uncertainty or cleanup that cannot be proven safe. Do not stop solely for a supporting-tool limitation when equivalent or stronger safe evidence proves the same acceptance boundary.

## Permitted outcomes

- `live-trainer-access-and-human-acceptance-complete-clean`
- `preview-trainer-access-proven-production-not-promoted-clean`
- `trainer-baseline-unavailable-clean`
- `trainer-provisioning-contract-expansion-required-clean`
- `trainer-authentication-material-failure-clean`
- `trainer-production-promotion-rolled-back-clean`
- `trainer-access-cleanup-blocked`

Only `trainer-access-cleanup-blocked` may remain materially unclean and requires the complete manual-intervention record. None of these outcomes declares product-wide Done.

============================================================
FILE: planning/sprints/035K-live-trainer-access-and-human-acceptance/handoff-prompt.md
============================================================

You are Builder for Sprint 035K — Live Trainer Access And Human Acceptance.

Apply Architect Pack `planning/architect-packs/architect-pack-035K-live-trainer-access-and-human-acceptance.md`, verify it generates exactly four files under `planning/sprints/035K-live-trainer-access-and-human-acceptance/`, and execute only from those generated files.

Start from closed Sprint 035I branch `codex/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance` at exact clean local/remote SHA `fe27561e7452909e588182ac1e47155882fc0c8c`. Create only `codex/035K-live-trainer-access-and-human-acceptance` in a clean worktree. Do not use the dirty `develop` root, the unexecuted 035J branch, an older Sprint 035 candidate or a deployment directory. Read `AGENTS.md`, the agent identity, all four 035K sprint files, the 035 through 035I closeout evidence, current authentication/dashboard source and current operations handoff before mutation.

Do not apply Sprint 035J. Create no Google OAuth client, grant, Gmail credential or mailbox automation. The product owner has agreed to act as, or privately coordinate, the first human trainer tester. The tester must use their own mailbox and privately enter their email and six-digit code. Never request or expose the address, code, mailbox content, credentials, tokens, session material or private identifiers in chat, commands, logs, URLs, screenshots, repository files or retained evidence.

First prove the exact baseline: approved Supabase project `uvskssaecdhxcgytkasc` and prohibited old project `tagnbgkroihagjmvehlx`; current production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb` at source `7d12e0d229324d8b07bcff7cb76bcc11f4d6477a`; compatible rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`; five stable aliases; production Site URL/callback; Resend sender, one-token/no-link template, six-digit OTP, expiry/cooldown; preserved identities; and clean 035I local/remote equality. Record the exact application diff from production source to 035I. Preserve the public website, pricing, disabled enquiry, commerce, schema/migrations/RLS/roles, DNS and unrelated data. If the baseline is wrong or unavailable, close `trainer-baseline-unavailable-clean` without product/provider changes.

Deliver one outcome: a human-proven Preview and production trainer journey. Make sign-in truthful: remove `Continue after setup`, replace raw `/portal` destination text with `Trainer dashboard` language, and do not describe environment presence as delivery/account proof. Preserve approved-account-only `shouldCreateUser:false`, generic anti-enumeration, six-digit entry, `Already have a code?`, resend cooldown, transient private inputs, safe errors and normalised `/portal` redirect. Do not add signup, passwords, social login or an auth bypass.

Before external mutation, record a field-minimal synthetic fixture manifest, ownership ledger and cleanup order. Through protected operator input, privately exact-match the designated tester without enumerating unrelated identities. Reuse an exact unambiguous tester identity or create exactly one confirmed identity. Through existing governed contracts only, establish one canonical profile, active trainer membership with the existing `horse.records.write` permission, one clearly synthetic stable, one assigned synthetic horse, the minimum synthetic workflow state for one honest next action, and one safe inaccessible-horse denial case. Use no real horse, stable, trainer-business, clinical, owner or customer data. Do not change schema, migrations, RPCs, RLS, role codes, permission meaning or assignment contracts. If a new contract is materially required, close `trainer-provisioning-contract-expansion-required-clean`.

Run focused and canonical gates, commit the exact candidate intentionally and deploy an exact-source alias-free Preview. Rotate only the superseded temporary Preview callback after read-before-write; preserve production Site URL/callback and attach no stable alias. Prove Preview identity, Ready classification, sign-in/health rendering, same-Preview anonymous `/portal` denial, provider compatibility and bounded tester/fixture state before asking the tester to act.

Guide the tester to request one code, confirm only that one current six-digit code arrived, enter it privately, reach `/portal`, recognise the synthetic stable/horse, open the horse workspace, follow the existing permitted next action, return, sign out and sign in again. After private code entry, inspect/render only the exact synthetic authenticated application with tester consent. Prove session/bootstrap, exact membership/permission, one-horse rows/count/order, workflow state/basis/time/action, and wrong-horse denial with no identity/state leakage. Retain only boolean/task, route, viewport, timestamp and synthetic-label evidence.

If the first human attempt fails, diagnose once through sanitized application/provider evidence. Correct an in-scope sign-in, OTP, bootstrap, dashboard, fixture, validator or reporter defect, revalidate and redeploy an exact candidate, then use at most one further cooldown-safe human attempt. Never repeat blindly and never create another mailbox-automation sprint.

After complete Preview acceptance, run focused OTP/request/verification/redirect/bootstrap/dashboard/permission tests; canonical JSON/domain/roles/Supabase-self/static/TypeScript/lint/local validation; a clean production build or equivalent stronger reparse-safe proof; and private-data/secret/generated-artifact/diff/encoding/staged-manifest checks. Push only the scoped 035K branch and prove local/remote SHA equality.

Record current production and rollback immediately before promotion. Deploy the exact accepted SHA to the intended Vercel production project, preserve DNS, map the five existing aliases and run public homepage, pricing, visibly disabled enquiry, health, sign-in, protected-route and unsafe-method smoke. Have the tester privately repeat code receipt/entry, `/portal`, assigned synthetic horse/workspace/action, sign-out and second sign-in on production. Roll back exactly if production acceptance or route safety fails and cannot be corrected safely within the bounded attempt policy. Do not leave stable aliases on a known-broken candidate.

At completion ask only whether the tester returns: `Retain the Sprint 035K pilot trainer account and synthetic fixture.` If received, retain exactly that bounded pilot graph and record purpose/owner without protected values. Otherwise remove exact 035K application records dependency-safely and delete exact 035K-created Auth last, proving application/Auth/Storage `0/0/0`. Never delete an ambiguous or unrelated identity; an adopted pre-existing tester identity may retain Auth while exact 035K-owned application/fixture records are removed.

Use equivalent or stronger safe evidence for unavailable supporting tools. Keep in-scope UI, auth/bootstrap, provisioning helper, fixture, validator, reporter, formatting, encoding and test corrections in Sprint 035K. Stop only for material target/baseline, secret/protected-data, tester ambiguity, destructive, auth/RLS/privacy/integrity, schema/contract, deployment/production, scope or cleanup risk. Human mailbox participation is required product acceptance; for any other genuine manual intervention, record what is blocked, evidence checked, exact private user steps and what you will verify.

At closeout reconcile source/deployments/aliases/callbacks/provider/template, tester/fixture disposition, exact-owned state, preserved identities, public enquiry boundary, production smoke, clean worktree and local/remote equality. Refresh the 035K review and current lifecycle/evidence/briefing files, commit intentionally and push only the scoped branch. Do not merge, open a PR, push `develop`, rewrite history, activate Participants A/B/C, implement the public enquiry, broaden customer onboarding or claim product-wide Done. Close with exactly one permitted 035K outcome.
