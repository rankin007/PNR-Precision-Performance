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
