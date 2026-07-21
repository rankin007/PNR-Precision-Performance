============================================================
FILE: planning/sprints/021L-hosted-auth-jwt-reconciliation-and-closeout/requirements.md
============================================================

# Sprint 021L - Hosted Auth/JWT Reconciliation And Closeout Requirements

## Objective

Determine why candidate Supabase Auth rejects an access token immediately after issuing it, reconcile only the proven hosted Auth/JWT or local API-key-pairing cause, prove the corrected Auth chain, run the complete authenticated role/RLS/comment/revocation/application-route matrix, clean all synthetic state, and close Sprint 021.

Sprint 021L is a consolidated diagnosis-correction-reproof sprint. It must not close successfully after token verification alone. Passed-clean requires the full ten-actor proof, exact cleanup, and restored hosted configuration.

## Workflow Profile

`strict`

## Authoritative Sources

- `AGENTS.md`
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, and `planning/SPRINT_SCHEDULE.md`
- applied Sprint 021 and 021B-021K artifacts and reviews
- `planning/reviews/021K-administrator-read-diagnosis.md`
- `planning/reviews/021K-authenticated-proof-results.md`
- `scripts/supabase-authenticated-proof-021K.mjs` as a read-only diagnostic/safety reference
- `docs/SPRINT_021_PROGRESS.md`
- candidate Supabase dashboard and supported Management/Auth/API surfaces for project `uvskssaecdhxcgytkasc`
- Supabase official JWT signing-key guidance: `https://supabase.com/docs/guides/auth/signing-keys`
- Supabase official API-key guidance: `https://supabase.com/docs/guides/getting-started/api-keys`
- Supabase official key-migration guidance: `https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys`
- Supabase JavaScript Auth reference for `verifyOtp`, `getUser`, and server-side client behavior
- migrations 0001-0012, role helpers/policies, and affected authenticated application routes/actions as unchanged proof targets
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`

Sprint 021K proved the failure layer `auth-issued-session-rejected`: supported exchange returned a session, but Auth identity verification, supported user-token data access, and direct REST were unauthorized before database helper/RLS evaluation. It did not prove the underlying hosted cause.

## Required Outcome Classes

Close with exactly one:

- **authenticated-role-rls-proof-passed-clean**: underlying Auth/JWT cause is proved, any permitted correction is completed, the corrected Auth chain and full authenticated matrix pass, and cleanup/restoration pass;
- **authenticated-role-rls-proof-failed-clean**: Auth verification succeeds but a genuine authorization/application assertion fails, the matrix stops, and cleanup/restoration pass;
- **hosted-auth-reconciled-proof-blocked-clean**: hosted Auth/JWT is corrected and the minimal Auth chain passes, but a separate full-proof prerequisite outside this Pack prevents completion, with zero owned state and restored configuration;
- **provider-escalation-required-clean**: sanitized evidence proves candidate Auth issuance and verification remain internally inconsistent with supported configuration/JWKS state and no safe tenant-side correction exists, with zero owned state and no unresolved hosted mutation;
- **blocked-clean**: an external prerequisite prevents safe diagnosis/correction, with zero owned state and cleared protected state; or
- **credential-incident-contained-clean**: protected output or target mismatch occurs, execution stops, unexpected remote use does not occur, and all state is zero/cleaned and cleared.

Incomplete cleanup or unresolved signing-key state is an active incident, not a permitted closeout outcome. Email delivery and real passwordless callback certification remain outside 021L.

## Credential And Target Boundary

Reuse the working two-file boundary unchanged:

- `.env.local`: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` only;
- `.env.test.local`: `SUPABASE_SERVICE_ROLE_KEY` only.

Builder must not edit, display, copy, hash, measure, stage, or inspect either file through tool output. Stage A validates exact candidate `uvskssaecdhxcgytkasc` before a separate protected Stage B reads protected configuration. Refuse old project `tagnbgkroihagjmvehlx`, unexpected targets, schema violations, and protected output.

Treat API-gateway keys and user Auth JWTs as separate credential classes:

- publishable/anon value is an API key used in `apikey` context;
- secret/service-role value is a server-only API key and must never be used as a user actor;
- the user access token issued by candidate Auth is the only `Authorization: Bearer` value for actor verification and RLS proof.

Do not place a publishable or secret API key into the user-token Authorization header. Do not fabricate, sign, repair, or substitute a JWT.

No operator credential action is expected if existing files remain compliant. If a proven API-key pairing error requires private reprovisioning, Builder must give exact value-free instructions and accept only `021L candidate local configuration is ready.`

## Credential-Free And Opening Gates

Before protected access or hosted mutation:

- verify Pack identity and approved file set;
- inventory the dirty worktree and preserve unrelated changes;
- create a new default-nonmutating 021L harness and focused self-tests;
- run existing Sprint 021 static/focused tests, TypeScript, lint, and production build;
- verify credential files are ignored/untracked without displaying them;
- verify candidate and old project are `ACTIVE_HEALTHY`;
- verify candidate ledger exactly 0001-0012, migrations 0011/0012 unchanged, structure/advisor baseline 0 errors / 22 dispositioned warnings / 0 suggestions, zero Auth/application/Storage state, and production-only Site URL/callback;
- capture a sanitized opening hosted Auth/JWT/API-key configuration manifest before any change.

## Minimal Auth/JWT Diagnostic

Use one fresh diagnostic identifier and the smallest topology: one `.invalid` Auth identity only. Do not create application rows, profiles, roles, stables, horses, tests, comments, or Storage objects until the Auth chain passes.

Through supported Admin/Auth operations:

1. create one confirmed `.invalid` identity without delivery;
2. generate a supported one-time verification artifact in protected memory;
3. exchange it for a genuine session;
4. immediately test `getUser(access_token)`;
5. test a supported client using the access-token callback; and
6. test a bounded direct Auth/user endpoint and a bounded Data API request with publishable/anon in `apikey` and the issued user token in `Authorization`.

Capture only fixed allowlisted result classes. Never emit tokens, artifacts, UUIDs, addresses, raw claims, response bodies, unrestricted messages/details/hints, keys, URLs containing secrets, or row contents.

## Sanitized Token And Hosted-Key Evidence

Inside protected memory, decode but do not verify or emit the issued token. Record only:

- token structure valid/invalid;
- issuer exact-candidate match yes/no;
- audience class expected/other/missing;
- role class authenticated/other/missing;
- algorithm class supported-asymmetric/supported-legacy/unsupported/missing;
- key-ID presence yes/no and active/trusted/unknown/revoked match class;
- issued-at class valid/future/stale/missing;
- expiry class valid/expired/invalid/missing;
- local-to-provider clock-skew class within-limit/outside-limit; and
- session subject equals created actor inside protected memory yes/no.

Do not emit the key ID, subject, timestamps, token length, signature, claim values, or token fragment.

Inspect supported candidate hosted state and record sanitized classes only:

- JWT signing system: legacy/new/mixed;
- current signing key: present, algorithm class, and public-discovery state;
- standby, previously used, and revoked key counts/status classes;
- issued-token key-ID relationship to current/previous/revoked/unknown;
- candidate JWKS endpoint availability and whether it advertises the required public verification key;
- JWT expiry setting class within-supported-range/outside-supported-range;
- publishable and secret API-key presence/enabled state and candidate binding;
- legacy anon/service-role enabled/disabled state;
- evidence of incomplete migration, rotation, revocation, or stale key-state transition;
- exact sanitized HTTP/status and provider error categories for `verifyOtp`, `getUser`, direct Auth, and Data API controls.

Public JWKS material may be inspected in protected process memory, but durable evidence may contain only key counts, algorithm classes, and match classes—not key material or identifiers.

## Root-Cause Decision

Before any mutation, record exactly one supported class:

1. `local-api-key-pairing-mismatch`;
2. `issued-token-issuer-or-time-invalid`;
3. `issued-token-key-not-trusted`;
4. `incomplete-signing-key-transition`;
5. `legacy-and-new-key-state-inconsistent`;
6. `hosted-auth-setting-inconsistent`;
7. `transient-provider-state-reconciled-without-change`;
8. `provider-internal-inconsistency`; or
9. `insufficient-safe-evidence`.

The decision record must name the supporting sanitized checks and explicitly rule out local request construction, database/RLS, and application integration where applicable.

## Conditional Correction Branches

Select one branch only after root-cause classification. Snapshot the exact sanitized opening state and define rollback before mutation.

### Branch A: Local API-key pairing mismatch

- No hosted mutation.
- Require the operator to privately replace only the mismatched candidate public and/or server API key in the established ignored files.
- Never request or display values.
- Repeat target-first file schema, candidate binding, and minimal Auth chain.

### Branch B: Supported signing-key state reconciliation

Use only when hosted evidence proves a signing key issued the token but is not in the correct trusted lifecycle state, or an incomplete supported rotation/migration exists.

- Operate only on candidate `uvskssaecdhxcgytkasc` through the supported Supabase signing-key dashboard/API.
- Do not import a custom private/shared key.
- Do not permanently delete a key.
- Do not expose, export, or reproduce any key material.
- Prefer the smallest reversible lifecycle action: restore an accidentally revoked/previous key to standby when supported, complete a documented pending transition, or roll back an incomplete transition.
- Do not rotate merely as a diagnostic experiment.
- Before a rotation action, prove the current/standby relationship, expected issued-token effect, rollback path, and that candidate has zero real Auth users and only owned diagnostic state.
- Respect provider transition/throttle/cache windows; verify state convergence through bounded checks without blocking silently.
- Record state classes before/after and rollback availability.

### Branch C: Supported hosted Auth setting reconciliation

Use only when a specific supported candidate Auth/JWT setting is demonstrably inconsistent with issued-token verification.

- Change only that exact setting.
- Do not change Site URL, callbacks, providers, email/passwordless posture, password settings, plan, billing, exposed schemas, JWT expiry unless it is the proved cause, or any unrelated configuration.
- Record old/new sanitized setting classes and rollback.

### Branch D: Transient provider state

- Make no mutation.
- After the documented bounded convergence/cache window, recreate a fresh identity/session and prove the complete minimal Auth chain twice with separate sessions.

### Branch E: Provider escalation

If supported configuration, JWKS, token metadata, and request construction are internally consistent but candidate Auth still rejects its issued token:

- make no speculative mutation;
- prepare a sanitized Supabase support bundle containing project reference, UTC event windows, HTTP status/error categories, signing/API-key state classes, token metadata classes, reproduction sequence, and zero-state evidence;
- exclude credentials, tokens, claims, UUIDs, addresses, raw response bodies, and customer/horse data;
- record exact operator steps to submit the support request and what Builder will verify after provider resolution;
- close `provider-escalation-required-clean` after cleanup.

## Minimal Correction Verification Gate

After Branch A-D correction/reconciliation:

- delete the original diagnostic identity and prove zero state;
- create a fresh `.invalid` identity and genuine session;
- prove `verifyOtp -> session -> getUser -> supported user-token client -> direct Auth control -> bounded authenticated Data API control` succeeds;
- repeat with a second fresh session if signing state changed;
- prove anonymous remains unauthenticated and the service key was never used as actor;
- clean verification identities to zero;
- verify hosted signing/Auth/API-key state is stable, rollback is no longer required, and Site URL/callback remain production-only.

Do not begin application fixtures or the full matrix unless this gate passes.

## Full Authenticated Reproof

After authoritative zero Auth/application/Storage baselines, select one fresh `021L-RLS-YYYYMMDD-NN`. Refuse every prior/diagnostic identifier including `021J-RLS-20260721-01` and all 021K identifiers.

Create the accepted ten actors with deterministic `.invalid` addresses, supported one-time Auth exchange, verified candidate sessions, and isolated client/cookie containers:

`ADMIN`, `TRAINER_A`, `TRAINER_B`, `MANAGER_A`, `VET_X`, `CONSULTANT_X`, `HAND_A`, `OWNER_A`, `OWNER_B`, and `SUSPENDED`.

Create exactly the two-stable/four-horse topology and accepted relationships from 021J. Preserve hard ceilings: 10 Auth identities, 10 application users, 10 profiles, 10 primary role/membership rows, 2 stables, 4 horses, 2 ownerships, 10 combined assignments, 4 biochemistry tests, 12 comments, and zero Storage objects.

Execute and record every mandatory case:

- Administrator global reads, bounded reversible administration, and cross-author comment soft-delete;
- Trainer positives plus unassigned/wrong-horse/cross-stable/peer/escalation denials and permitted lower-role grant/revoke;
- Manager Stable A positives and Stable B/ownership/security/user-role denials;
- Vet, Consultant, and Hand assigned positives and unassigned/edit denials;
- Owner own-horse reads and edit/comment/assignment/transfer/other-horse denials;
- SUSPENDED and anonymous zero protected application-data access;
- comment creation, own mutation, cross-author denial, Administrator removal, Owner denial, and empty/over-2,000-character rejection;
- immediate fresh-session revocation denial with historical attribution retained;
- direct RLS through genuine actor sessions, never the service key; and
- representative application routes/actions for every role class with direct-RLS agreement and no resource-existence disclosure.

Record every assertion once using sanitized aliases/classes. Stop the matrix on the first failed assertion and begin cleanup.

## Cleanup, Restoration, And Hosted-State Closeout

- Maintain separate in-memory ownership ledgers for diagnostic, verification, and full-proof state.
- Compensate partial creation immediately.
- Delete exact application state in reverse dependency order and Auth identities last.
- Refuse broad, wildcard, ambiguous, copied-ID, or ceiling-exceeding cleanup.
- Clear sessions, cookies, artifacts, tokens, variables, processes, caches under Builder control, and browser reveal state.
- Prove zero Auth/application/Storage owned state.
- Confirm candidate ledger remains exactly 0001-0012, migrations/structure/advisors unchanged, both projects healthy, and old-project non-contact.
- Confirm Site URL and sole production callback unchanged.
- Confirm final hosted signing-key/Auth/API-key state is stable and matches the documented reconciled state; execute rollback if the correction failed and rollback is safe.
- Leave operator-managed environment files ignored, untracked, untouched by Builder, and undisplayed.

## Approved File Set

Builder may create/update only:

- new `scripts/supabase-auth-jwt-reconciliation-021L.mjs` and focused self-test;
- new `scripts/supabase-authenticated-proof-021L.mjs` and focused self-test;
- new `planning/reviews/021L-hosted-auth-jwt-opening-manifest.md`;
- new `planning/reviews/021L-hosted-auth-jwt-diagnosis-and-reconciliation.md`;
- new `planning/reviews/021L-authenticated-proof-manifest.md` and `planning/reviews/021L-authenticated-proof-results.md`;
- new `planning/reviews/021L-supabase-support-bundle.md` only for Branch E;
- `docs/SPRINT_021_PROGRESS.md` and applied 021L acceptance annotations;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, and `planning/ARCHITECT_BRIEFING.md`;
- directly relevant 021L entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

No application, migration, bootstrap, database policy/helper/grant, dependency, configuration, infrastructure, prior harness, prior evidence, or operator-managed environment file may be edited. Hosted candidate mutation is limited to the selected conditional branch.

## Validation

Before diagnosis: Pack identity, source hashes, new harness self-tests, existing Sprint 021 tests, TypeScript, lint, build, credential ignore/untracked checks, exact target, opening ledger/structure/advisors/health/callback, zero state, and hosted opening manifest.

Before hosted mutation: exact root-cause class, named evidence, selected branch, exact target, current/desired state classes, supported action, rollback, zero real/owned Auth state, and sanitized output allowlist.

Before full matrix: successful fresh minimal Auth chain, repeat check where required, zero diagnostic/verification state, stable hosted state, and unchanged production-only callback/Site URL.

At closeout: complete assertion ledger if executed, cleanup/restoration proof, final hosted-state comparison, source hashes, JSON parse, redacted credential/token/claim/private-identifier scan, ignore/untracked checks without content inspection, approved-file diff, and `git diff --check`.

Every acceptance criterion receives exactly one `pass`, `fail`, or `not-run` annotation with named evidence. Failed and not-run criteria remain unchecked.

## Prohibitions

- emitting credentials, JWTs, artifacts, claims, key IDs/material, UUIDs, addresses, raw provider bodies, or private identifiers;
- fabricating/signing/substituting JWTs or using API keys as actor bearer tokens;
- speculative signing-key rotation, custom-key import, permanent key deletion, or unplanned credential rotation;
- database migration 0013, application/auth integration changes, RLS/policy/helper/grant/schema changes;
- Site URL/callback/provider/passwordless/password/plan/billing/exposed-schema changes except the single proven Branch C setting within its stated boundary;
- mailbox/email delivery/message/OTP inspection, Storage objects/uploads, real people/customer/horse data;
- deployment, Vercel environment mutation, cutover, DNS, public reopening, Stripe change, package installation, stage, commit, push, or PR.

## Manual Intervention Rule

Manual intervention may be required for private API-key reprovisioning, a protected dashboard signing-key action that automation cannot execute without unsafe output, or provider support submission.

For each intervention, Builder must record:

- the blocker or proven cause;
- sanitized evidence already checked;
- exact minimal operator action;
- step-by-step value-free instructions;
- the safe response/status the operator may return; and
- subsequent verification Builder will perform.

Never request credentials, tokens, claims, key material/identifiers, screenshots containing protected state, file contents, addresses, UUIDs, links with artifacts, or credential-bearing commands.

============================================================
FILE: planning/sprints/021L-hosted-auth-jwt-reconciliation-and-closeout/blueprint.md
============================================================

# Sprint 021L - Hosted Auth/JWT Reconciliation And Closeout Blueprint

## Phase 1: Source Lock And Opening State

1. Read all authority, verify Pack identity, inventory the dirty worktree, and hash approved surfaces.
2. Build new default-nonmutating reconciliation and proof harnesses; preserve prior harnesses unchanged.
3. Self-test target/run refusal, API-key/JWT separation, error/token metadata allowlists, branch refusal, ceilings, compensation, Auth-last cleanup, hosted-state rollback, and clearing.
4. Run existing static/focused tests, TypeScript, lint, build, and credential ignore/untracked checks.
5. Verify exact candidate, zero remote baselines, ledger/structure/advisors, health, callback/Site URL, and create the sanitized hosted opening manifest.

## Phase 2: Minimal Auth/JWT Diagnosis

1. Select a fresh diagnostic identifier and create one confirmed `.invalid` identity without delivery.
2. Exchange a supported one-time artifact for a genuine session.
3. Run immediate getUser, supported user-token client, direct Auth, and bounded Data API controls.
4. Inspect token metadata and JWKS/signing/API-key/Auth state only inside protected memory.
5. Record allowlisted classes and one underlying root-cause classification.
6. Clean the diagnostic identity to zero and clear protected state.

## Phase 3: Conditional Reconciliation

1. Select exactly Branch A, B, C, D, or E.
2. Record opening/desired state, supported action, stop conditions, and rollback.
3. Apply only the cause-matched private local correction, reversible hosted reconciliation, bounded convergence wait, or provider escalation bundle.
4. Verify final state convergence; rollback safely if the correction fails.

## Phase 4: Corrected Auth Chain Gate

1. Create a fresh identity/session after zero-state verification.
2. Prove verifyOtp, getUser, supported client, direct Auth, and bounded authenticated Data API success.
3. Repeat with a second session after signing-state change.
4. Prove anonymous denial and no service-key actor use.
5. Clean all verification identities and sessions to zero.

## Phase 5: Complete Authenticated Reproof

1. Reverify zero baselines and select a fresh `021L-RLS-YYYYMMDD-NN`.
2. Create the ten genuine `.invalid` actor sessions and exact bounded topology.
3. Execute every direct-RLS positive/denial, comment, revocation, and representative application-route case.
4. Record every assertion once and stop on first failure.

## Phase 6: Cleanup, Restoration, And Sprint 021 Closeout

1. Delete exact application state in reverse dependency order and Auth identities last.
2. Clear runtime, sessions, cookies, artifacts, tokens, variables, processes, and browser state.
3. Prove zero owned state, stable reconciled hosted Auth/JWT state, unchanged production-only configuration, ledger/structure/advisor integrity, both-project health, and old-project non-contact.
4. Annotate all acceptance criteria and update only approved durable records.
5. Run final hashes, tests, JSON, redacted scans, ignore/untracked checks, approved diff, and `git diff --check`.
6. If passed-clean, close Sprint 021 and recommend return to the main roadmap; if provider escalation is required, leave exact operator submission and post-resolution verification steps.

============================================================
FILE: planning/sprints/021L-hosted-auth-jwt-reconciliation-and-closeout/acceptance.md
============================================================

# Sprint 021L - Hosted Auth/JWT Reconciliation And Closeout Acceptance

- [ ] Applied four-file sprint matches this Pack.
- [ ] Dirty-worktree inventory/source hashes are recorded and unrelated changes remain untouched.
- [ ] New reconciliation/proof harnesses default nonmutating and pass target, run, API-key/JWT separation, metadata/error allowlist, branch, ceiling, compensation, cleanup, rollback, and clearing tests.
- [ ] Existing static/focused tests, TypeScript, lint, production build, and credential ignore/untracked checks pass.
- [ ] Exact candidate, old-project refusal, opening ledger 0001-0012, structure/advisors, both-project health, production-only callback/Site URL, and zero Auth/application/Storage baselines pass.
- [ ] Sanitized opening JWT-signing/Auth/API-key manifest is recorded before mutation.
- [ ] Minimal diagnosis uses exactly one `.invalid` Auth identity and no application/Storage fixtures.
- [ ] Supported exchange returns a session and immediate getUser/client/direct Auth/Data API outcomes are recorded using fixed classes.
- [ ] Issuer, audience, role, algorithm, key-match, issued/expiry/skew, and subject-match classes are recorded without token/claim/key identifiers.
- [ ] Candidate JWKS availability/key-match and hosted signing-key lifecycle classes are recorded without public/private key material or IDs.
- [ ] Publishable/secret and legacy anon/service-role presence/enabled/candidate-binding classes are recorded.
- [ ] One exact underlying root-cause class is supported by named sanitized evidence before correction.
- [ ] Diagnostic identity/session is cleaned to zero before correction.
- [ ] Exactly one conditional Branch A-E is selected with current/desired state, supported action, stop conditions, and rollback.
- [ ] Any local reprovisioning occurs privately with no value disclosure and passes target-first verification.
- [ ] Any hosted signing-key reconciliation is cause-matched, reversible, candidate-only, and performs no custom import/permanent deletion/speculative rotation.
- [ ] Any hosted Auth setting correction changes only the proven setting and preserves callbacks/providers/passwordless/plan/billing/exposed schemas.
- [ ] Provider escalation bundle, if required, is sanitized and contains exact operator submission/post-resolution steps.
- [ ] Final hosted signing/Auth/API-key state converges or is safely rolled back with no unresolved mutation.
- [ ] Fresh corrected Auth chain proves verifyOtp, session, getUser, supported client, direct Auth, and authenticated Data API success.
- [ ] A second fresh session passes after any signing-state change; anonymous remains unauthenticated and service key is never an actor.
- [ ] Diagnostic/verification Auth/application/Storage state is zero before full reproof.
- [ ] A fresh 021L run begins with authoritative zero anchors and full ceilings.
- [ ] Exactly ten deterministic `.invalid` identities and genuine isolated candidate sessions are established without delivery or fabricated JWTs.
- [ ] Exact two-stable/four-horse topology and accepted role/ownership/access relationships remain within ceilings.
- [ ] Administrator global positives and bounded reversible administration pass.
- [ ] Trainer positives, cross-scope/wrong-horse/peer/escalation denials, and lower-role grant/revoke pass.
- [ ] Manager positives and cross-stable/security/ownership/role-management denials pass.
- [ ] Vet, Consultant, and Hand assigned positives and unassigned/edit denials pass.
- [ ] Owner own-horse reads and edit/comment/assignment/transfer/other-horse denials pass.
- [ ] SUSPENDED and anonymous receive zero protected application-data access.
- [ ] Comment creation, authorship mutation, Administrator removal, Owner denial, and content boundaries pass.
- [ ] Revocation causes immediate fresh-session denial while historical attribution remains.
- [ ] Direct RLS assertions use genuine actor sessions and never the service key.
- [ ] Representative application routes/actions agree with direct RLS for every role class without resource disclosure.
- [ ] Every mandatory assertion is recorded exactly once using sanitized aliases/result classes.
- [ ] First failed assertion stops the matrix and initiates compensation/cleanup.
- [ ] Exact cleanup removes dependency-safe application state before Auth identities.
- [ ] Final diagnostic/verification/full-run Auth/application/Storage counts are zero and baselines are restored.
- [ ] Runtime, sessions, cookies, artifacts, tokens, protected memory, and browser/process state are cleared.
- [ ] Final hosted signing/Auth/API-key state, callback/Site URL, ledger, structure/advisors, health, old-project non-contact, and ignored credential-file status pass.
- [ ] Outcome is exactly authenticated-role-rls-proof-passed-clean, authenticated-role-rls-proof-failed-clean, hosted-auth-reconciled-proof-blocked-clean, provider-escalation-required-clean, blocked-clean, or credential-incident-contained-clean and matches evidence.
- [ ] Email delivery/passwordless callback proof remains explicitly outside scope and not tested.
- [ ] Sprint 021 closeout accurately distinguishes structural, authenticated, runtime, deployment, and callback readiness.
- [ ] Status, progress, schedule, decisions/risks/questions, results, and Architect briefing agree.
- [ ] Final tests, hashes, JSON, redacted scans, ignore/untracked checks, approved diff, and `git diff --check` pass.
- [ ] No out-of-scope application/database/configuration/provider/deployment/cutover/old-project mutation, package install, stage, commit, push, or PR occurs.

Builder must annotate every item exactly once as `pass`, `fail`, or `not-run` with named evidence or reason. Failed and not-run items remain unchecked. Passed-clean requires root-cause proof, stable reconciliation, full authenticated proof, cleanup, and restoration.

============================================================
FILE: planning/sprints/021L-hosted-auth-jwt-reconciliation-and-closeout/handoff-prompt.md
============================================================

# Sprint 021L - Builder Handoff Prompt

You are Builder for Sprint `021L-hosted-auth-jwt-reconciliation-and-closeout` under the strict profile.

Apply this Pack, verify the four generated sprint files, and execute only from those files.

Reuse the working target-first credential boundary without editing or displaying either environment file. Build new default-nonmutating reconciliation and proof harnesses; preserve prior harnesses unchanged. Treat API keys and user Auth JWTs as separate credential classes and never use an API key as an actor bearer token.

Start with one `.invalid` Auth identity only. Reproduce the issued-session rejection and collect fixed sanitized classes for the immediate Auth chain, token metadata, candidate JWKS, signing-key lifecycle, API-key state, and hosted Auth configuration. Emit no tokens, claims, key IDs/material, credentials, UUIDs, addresses, raw responses, or private identifiers. Record one underlying root-cause class before changing anything.

Choose exactly one cause-matched Branch A-E. Private local reprovisioning must remain value-free. Hosted signing-key reconciliation must be candidate-only, reversible, supported, and free of custom-key import, permanent deletion, or speculative rotation. Hosted Auth correction may change only the proven setting. If platform state is internally inconsistent with no safe tenant correction, create the sanitized support bundle, clean to zero, and close provider-escalation-required-clean.

After correction/reconciliation, use fresh identities to prove verifyOtp, getUser, supported client, direct Auth, and authenticated Data API success. Repeat after signing-state changes. Clean verification state to zero before the full proof.

Then select a fresh 021L run, create all ten genuine isolated `.invalid` actor sessions and exact bounded topology, and execute the complete direct-RLS, comment, denial, revocation, and representative application-route matrix. Do not stop after Auth or Administrator proof succeeds. Stop on the first failed assertion.

Always clean exact application state in reverse dependency order and Auth identities last. Clear every session, cookie, artifact, token, protected variable, process, and browser state. Prove zero owned state, stable reconciled hosted Auth/JWT state, unchanged production-only configuration, ledger/structure/advisor integrity, both-project health, and old-project non-contact.

Do not change application/database code, migrations, RLS, callbacks, providers, passwordless posture, plan, billing, exposed schemas, production, or the old project outside the single proven conditional hosted setting boundary. Do not use email/mailboxes/OTPs, create Storage objects, install packages, deploy, cut over, stage, commit, push, or create a PR.

Close exactly as authenticated-role-rls-proof-passed-clean, authenticated-role-rls-proof-failed-clean, hosted-auth-reconciled-proof-blocked-clean, provider-escalation-required-clean, blocked-clean, or credential-incident-contained-clean. Annotate every acceptance criterion. If passed-clean, close Sprint 021 and recommend return to the main roadmap; otherwise record only the exact remaining external action.
