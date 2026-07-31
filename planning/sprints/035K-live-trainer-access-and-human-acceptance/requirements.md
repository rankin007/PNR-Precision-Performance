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
