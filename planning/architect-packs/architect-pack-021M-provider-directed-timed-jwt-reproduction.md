============================================================
FILE: planning/sprints/021M-provider-directed-timed-jwt-reproduction/requirements.md
============================================================

# Sprint 021M - Provider-Directed Timed JWT Reproduction Requirements

## Objective

Produce the exact safe evidence requested for Supabase project-level investigation by running two independent minimal Auth/JWT reproductions at T0 and T+20 minutes, capturing allowlisted correlation identifiers and bounded UTC windows, and then:

- create a sanitized support-escalation bundle and stop cleanly if the failure persists; or
- if verification becomes stable, confirm the corrected Auth chain, run the complete authenticated role/RLS/comment/revocation/application-route proof, clean all state, and close Sprint 021.

Sprint 021M performs no speculative hosted correction. It is a provider-directed evidence and conditional reproof sprint.

## Workflow Profile

`strict`

## Authoritative Sources

- `AGENTS.md`
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, and `planning/SPRINT_SCHEDULE.md`
- applied Sprint 021 and 021B-021L artifacts and reviews
- `planning/reviews/021L-hosted-auth-jwt-diagnosis-and-reconciliation.md`
- `planning/reviews/021L-supabase-support-bundle.md`
- `scripts/supabase-auth-jwt-reconciliation-021L.mjs` as read-only safety reference
- the provider-directed request for T0/T+20 UTC windows, HTTP statuses, top-level error classes, endpoint paths, and response correlation headers
- Supabase official JWT signing-key, API-key, Auth, and JWT verification documentation
- migrations 0001-0012, role helpers/policies, and affected authenticated application routes/actions as unchanged proof targets
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`

Sprint 021L closed `provider-escalation-required-clean`: candidate Auth issued a current exact-project asymmetric JWT advertised by candidate JWKS, but immediate Auth and Data API verification returned unauthorized. No hosted mutation occurred.

## Required Outcome Classes

Close with exactly one:

- **authenticated-role-rls-proof-passed-clean**: timed verification becomes stably successful, the complete authenticated matrix passes, and cleanup/restoration pass;
- **authenticated-role-rls-proof-failed-clean**: the Auth chain is stable but a genuine authorization/application assertion fails, the matrix stops, and cleanup/restoration pass;
- **provider-escalation-required-clean**: both timed windows fail or remain inconsistent, the sanitized support bundle is complete, and all state is zero/cleared with no hosted mutation;
- **auth-recovered-proof-blocked-clean**: timed Auth verification recovers and is confirmed, but another full-proof prerequisite outside this Pack prevents completion, with zero state and restored configuration;
- **blocked-clean**: a provider/environment prerequisite prevents completion of the requested timed evidence, with zero state and cleared protected state; or
- **credential-incident-contained-clean**: protected output or target mismatch occurs, execution stops, unexpected remote use does not occur, and all state is zero/cleaned and cleared.

Incomplete cleanup is an active incident, not a permitted closeout. Email delivery and real passwordless callback certification remain outside 021M.

## Credential And Target Boundary

Reuse the working operator-managed files unchanged:

- `.env.local`: candidate public URL and publishable/anon API key only;
- `.env.test.local`: candidate server secret/service-role API key only.

Builder must not edit, display, copy, hash, measure, stage, or inspect file contents through tool output. Validate candidate `uvskssaecdhxcgytkasc` before protected loading. Refuse old project `tagnbgkroihagjmvehlx`, unexpected targets, schema violations, and protected output.

Keep credential classes separate:

- public key in `apikey` only;
- issued user access token in `Authorization: Bearer` only;
- server secret only for Admin API identity lifecycle and never as an actor.

Never emit or retain credentials, JWTs, token fragments, claims, key IDs/material, generated artifacts, Auth UUIDs, synthetic addresses, environment values, or raw response bodies.

## Credential-Free And Opening Gates

Before T0:

- verify applied Pack identity and approved file set;
- inventory the dirty worktree and preserve unrelated changes;
- create a new default-nonmutating 021M timed-reproduction harness and focused self-test;
- run existing Sprint 021 static/focused tests, TypeScript, lint, and production build;
- verify credential files are ignored/untracked without displaying them;
- verify both projects healthy, exact candidate target, ledger 0001-0012, immutable 0011/0012, advisor baseline 0/22/0, production-only Site URL/callback, and zero Auth/application/Storage state;
- record sanitized signing/JWKS/API-key state classes without changing them;
- freeze the T0 and T+20 evidence schema, cleanup procedure, and header allowlist.

## Timed Reproduction Contract

Use two completely independent minimal attempts:

- `021M-T0-YYYYMMDD-NN`
- `021M-T20-YYYYMMDD-NN`

Each attempt creates exactly one confirmed `.invalid` Auth identity, no application fixture, and zero Storage objects. Each identity must be deleted and zero Auth state proved before the next phase.

For each attempt:

1. Record UTC start timestamp immediately before identity creation.
2. Create one confirmed synthetic identity without email delivery.
3. Generate a supported one-time artifact in protected memory.
4. Exchange it with `verifyOtp` for a genuine session.
5. Run immediate SDK `getUser(access_token)`.
6. Call `/auth/v1/user` with candidate public key in `apikey` and issued user JWT in `Authorization`.
7. Call `/rest/v1/horses?select=id&limit=1` with the same documented separation.
8. Record UTC end timestamp immediately after the final response.
9. Delete the identity, clear session/artifact/token/process state, and prove Auth/application/Storage zero.

Do not reuse identities, sessions, artifacts, addresses, IDs, clients, in-memory caches, or diagnostic identifiers between windows.

## Correlation Evidence Allowlist

For the Auth and Data API calls, durable evidence may contain only:

- attempt alias (`T0` or `T20`);
- endpoint path, without query secrets or project hostname;
- HTTP status code;
- fixed top-level error category/string from this allowlist:
  - `success`
  - `unauthorized`
  - `forbidden`
  - `invalid-jwt`
  - `jwt-expired`
  - `session-not-found`
  - `user-not-found`
  - `api-key-invalid`
  - `server-error`
  - `other-sanitized-error`
  - `no-error-string`;
- UTC start/end window;
- these response-header names and their correlation values only when present:
  - `x-request-id`
  - `x-correlation-id`
  - `traceparent`
  - `x-supabase-request-id`
  - `sb-request-id`;
- header presence/absence for the allowlist; and
- cleanup/clearing result.

Correlation values are support identifiers, not credentials, but must be stored only in `planning/reviews/021M-supabase-support-escalation.md`. Do not reproduce them in status, state, progress, acceptance, briefing, conversation, logs, or general results. No other response header may be retained.

Top-level error text must be mapped to the fixed categories. Do not retain unrestricted error text, details, hints, response bodies, stack traces, or claim-related output.

## T+20 Timing Rule

- The T+20 attempt must start no earlier than 20 minutes and no later than 30 minutes after the T0 end timestamp.
- No Auth identity, session, artifact, protected process, runtime, or browser reveal state may remain during the interval.
- Do not use one blocking sleep or wait that prevents user-facing progress updates for more than 60 seconds.
- Use a supported monitored/wakeup mechanism or bounded repeated waits, communicate concise progress at least every 60 seconds while actively working, and preserve only timestamps/status—not protected state.
- Reconfirm exact target, credential-file ignore/untracked status, project health, zero Auth/application/Storage state, Site URL/callback, and signing/JWKS state classes immediately before T+20.

## Timed Outcome Decision

### Both T0 and T+20 fail consistently

- Classify `provider-internal-inconsistency-persistent`.
- Make no signing-key, Auth, API-key, callback, provider, database, or application change.
- Complete the support escalation bundle with both bounded UTC windows, endpoint paths, statuses, fixed error categories, and allowlisted correlation identifiers.
- Close `provider-escalation-required-clean` after final zero-state/restoration checks.

### T0 fails and T+20 succeeds

- Classify `provider-propagation-recovered`.
- Make no hosted mutation.
- After cleaning T+20 to zero, wait a bounded additional 5-10 minutes with no retained state and execute a third fresh minimal confirmation identity/session.
- Require complete Auth chain success twice in succession before full proof.

### T0 succeeds

- Clean T0 to zero.
- Still perform T+20 with a fresh identity to establish stability.
- Require both windows to pass before full proof.

### Mixed or inconclusive results

- Do not infer recovery.
- Complete the support bundle with exact sanitized classes and close `provider-escalation-required-clean` unless two successive fresh complete Auth chains pass within the sprint.

## Actual Support Escalation Bundle

Create `planning/reviews/021M-supabase-support-escalation.md` containing:

- project reference `uvskssaecdhxcgytkasc`;
- issue summary and provider-directed reproduction sequence;
- T0 and T+20 bounded UTC windows;
- endpoint paths, HTTP statuses, fixed error categories;
- allowlisted correlation header names and values;
- sanitized signing/JWKS/API-key state classes;
- confirmation of correct header separation;
- zero-state cleanup evidence;
- explicit request for project-level inspection of Auth-user and Data API JWT trust propagation;
- explicit statement that credentials, JWTs, claims, key material/IDs, UUIDs, addresses, environment files, and raw response bodies are excluded;
- exact operator steps to submit through real Supabase Support and the safe response phrase after submission: `021M Supabase escalation submitted.`

If the persistent-failure branch is selected, Builder must stop after producing the bundle and manual-intervention record. Do not repeatedly reproduce the defect.

## Stable Auth Gate

Full reproof is permitted only after two successive fresh attempts prove:

`verifyOtp -> session -> getUser -> direct Auth user -> authenticated Data API`

All stages must succeed, candidate issuer/subject/time classes must pass internally, anonymous must remain unauthenticated, and the server secret must never be used as actor. Diagnostic/confirmation identities must be cleaned to zero before full proof.

## Conditional Full Authenticated Reproof

After the stable Auth gate and authoritative zero baselines, select one fresh `021M-RLS-YYYYMMDD-NN`. Refuse every prior and timed identifier.

Create the accepted ten actors with deterministic `.invalid` addresses, supported one-time Auth exchange, verified candidate sessions, and isolated clients/cookie containers:

`ADMIN`, `TRAINER_A`, `TRAINER_B`, `MANAGER_A`, `VET_X`, `CONSULTANT_X`, `HAND_A`, `OWNER_A`, `OWNER_B`, and `SUSPENDED`.

Create exactly the accepted two-stable/four-horse topology with hard ceilings: 10 Auth identities, 10 application users, 10 profiles, 10 primary role/membership rows, 2 stables, 4 horses, 2 ownerships, 10 combined assignments, 4 biochemistry tests, 12 comments, and zero Storage objects.

Execute every mandatory case:

- Administrator global reads, bounded reversible administration, and cross-author comment soft-delete;
- Trainer scoped positives plus unassigned/wrong-horse/cross-stable/peer/escalation denials and permitted lower-role grant/revoke;
- Manager Stable A positives and Stable B/ownership/security/user-role denials;
- Vet, Consultant, and Hand assigned positives and unassigned/edit denials;
- Owner own-horse reads and edit/comment/assignment/transfer/other-horse denials;
- SUSPENDED and anonymous zero protected application-data access;
- comment creation, own mutation, cross-author denial, Administrator removal, Owner denial, and empty/over-2,000 rejection;
- fresh-session revocation denial with historical attribution retained;
- direct RLS through genuine actor sessions only; and
- representative application routes/actions for every role class with direct-RLS agreement and no resource-existence disclosure.

Record every assertion once using sanitized aliases/classes. Stop on first failure and begin cleanup.

## Cleanup And Restoration

- Maintain separate in-memory ownership ledgers for T0, T+20, optional confirmation, and full proof.
- Compensate immediately on partial creation.
- Delete exact application state in reverse dependency order and Auth identities last.
- Refuse broad, wildcard, ambiguous, copied-ID, or ceiling-exceeding cleanup.
- Clear sessions, cookies, artifacts, JWTs, variables, processes, and browser state after every attempt.
- Prove zero Auth/application/Storage state after every timed attempt and at closeout.
- Confirm candidate ledger 0001-0012, immutable migrations, structure/advisors, both-project health, old-project non-contact, production-only Site URL/callback, unchanged signing/JWKS/API-key state, and ignored credential files.

## Approved File Set

Builder may create/update only:

- new `scripts/supabase-timed-jwt-reproduction-021M.mjs` and focused self-test;
- new `scripts/supabase-authenticated-proof-021M.mjs` and focused self-test;
- new `planning/reviews/021M-timed-jwt-reproduction-results.md`;
- new `planning/reviews/021M-supabase-support-escalation.md`;
- new `planning/reviews/021M-authenticated-proof-manifest.md` and `planning/reviews/021M-authenticated-proof-results.md` only if the stable Auth gate passes;
- `docs/SPRINT_021_PROGRESS.md` and applied 021M acceptance annotations;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, and `planning/ARCHITECT_BRIEFING.md`;
- directly relevant 021M entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

No application, migration, bootstrap, database/RLS, dependency, hosted setting, signing key, API key, callback, infrastructure, prior harness/evidence, or operator-managed environment file may be edited or mutated.

## Validation

Before T0: Pack identity, source hashes, harness self-tests, existing Sprint 021 tests, TypeScript, lint, build, credential ignore/untracked checks, exact target, ledger/structure/advisors/health/callback, zero state, signing/JWKS/API-key classes, and evidence allowlist.

Before T+20: T0 cleanup zero, elapsed window, no retained protected state, repeated target/health/zero/configuration guards.

Before full matrix: two successive fresh complete Auth-chain passes, zero timed/confirmation state, unchanged hosted state, and full ceilings/cleanup queries.

At closeout: timed-window evidence, support bundle safety scan, assertion ledger if executed, cleanup/restoration proof, source hashes, JSON parse, redacted credential/token/claim/private-identifier scan, correlation-ID containment check, ignore/untracked checks without content inspection, approved-file diff, and `git diff --check`.

Every acceptance criterion receives exactly one `pass`, `fail`, or `not-run` annotation with named evidence. Failed and not-run criteria remain unchecked.

## Prohibitions

- emitting credentials, JWTs/fragments, artifacts, claims, key IDs/material, UUIDs, synthetic addresses, environment values, raw bodies, unrestricted errors, or non-allowlisted headers;
- reproducing correlation identifier values outside the support-escalation file;
- fabricating/signing/substituting JWTs or using API keys as actor bearer tokens;
- signing-key/Auth/API-key/callback/provider/plan/billing/exposed-schema mutation;
- application/database/migration/RLS/policy/helper/grant/configuration/dependency changes;
- repeated reproduction beyond T0, T+20, and one recovery confirmation;
- mailbox/email delivery/message/OTP inspection, Storage objects/uploads, or real data;
- deployment, Vercel environment mutation, cutover, DNS, public reopening, Stripe change, package installation, stage, commit, push, or PR.

## Manual Intervention Rule

Manual intervention is required only to submit the completed persistent-failure support bundle through actual Supabase Support.

Builder must record:

- persistent provider-level blocker;
- evidence checked and both UTC windows;
- exact value-free submission steps;
- prohibition on attachments containing credentials/tokens/claims/environment files;
- safe response phrase `021M Supabase escalation submitted.`; and
- what a later Builder will verify after provider confirmation/remediation.

Never request protected values, raw headers beyond the allowlist, screenshots, UUIDs, addresses, token-bearing links, or credential-bearing commands.

============================================================
FILE: planning/sprints/021M-provider-directed-timed-jwt-reproduction/blueprint.md
============================================================

# Sprint 021M - Provider-Directed Timed JWT Reproduction Blueprint

## Phase 1: Source Lock And Harness

1. Read authority, verify Pack identity, inventory the dirty worktree, and hash approved surfaces.
2. Create new default-nonmutating timed-reproduction and conditional-proof harnesses; preserve prior harnesses unchanged.
3. Self-test target/run refusal, API-key/JWT separation, error/header allowlists, correlation containment, timing rules, ceilings, compensation, Auth-last cleanup, and clearing.
4. Run existing tests, TypeScript, lint, build, credential checks, and opening remote/configuration guards.

## Phase 2: T0 Reproduction

1. Confirm zero state and select fresh T0 identifier.
2. Record UTC start, create one identity, perform the supported exchange and immediate Auth/Data controls.
3. Capture only allowlisted statuses, categories, endpoint paths, UTC window, and correlation headers.
4. Delete the identity, clear all protected/process state, and prove zero state.

## Phase 3: Clean Timing Interval

1. Record T0 end and calculate the 20-30 minute T+20 window.
2. Retain no identity/session/artifact/token/process/browser state.
3. Use bounded monitored waits with user-visible progress at least every 60 seconds while active.
4. Immediately before T+20, rerun target, health, zero-state, configuration, credential-file, and signing/JWKS guards.

## Phase 4: T+20 Reproduction

1. Select a fresh T+20 identifier and repeat the exact bounded sequence with a new identity/session/client.
2. Capture the same allowlisted evidence.
3. Delete the identity, clear all state, and prove zero.
4. Classify persistent failure, recovered propagation, stable success, or inconclusive result.

## Phase 5A: Persistent Failure Escalation

1. Create the sanitized support-escalation file with both UTC windows and contained correlation identifiers.
2. Record exact operator submission steps and safe response.
3. Run final restoration/safety checks and close provider-escalation-required-clean.

## Phase 5B: Recovery Confirmation

1. If required, wait 5-10 minutes with no retained state.
2. Execute one third fresh minimal Auth chain.
3. Require two successive complete passes; otherwise route to persistent-failure escalation.
4. Clean confirmation state to zero.

## Phase 6: Conditional Full Reproof

1. Reconfirm zero baselines and select a fresh `021M-RLS-YYYYMMDD-NN`.
2. Create ten genuine `.invalid` sessions and the exact bounded topology.
3. Run the complete direct-RLS, comment, denial, revocation, and representative application-route matrix.
4. Record every assertion once and stop on first failure.

## Phase 7: Cleanup And Closeout

1. Delete exact application state in reverse dependency order and Auth identities last.
2. Clear runtime, sessions, cookies, artifacts, tokens, variables, processes, and browser state.
3. Prove zero owned state, unchanged hosted configuration, ledger/structure/advisor integrity, both-project health, and old-project non-contact.
4. Annotate all acceptance criteria and update only approved durable records.
5. Run final tests, hashes, JSON, redacted scans, correlation containment, ignore/untracked checks, approved diff, and `git diff --check`.

============================================================
FILE: planning/sprints/021M-provider-directed-timed-jwt-reproduction/acceptance.md
============================================================

# Sprint 021M - Provider-Directed Timed JWT Reproduction Acceptance

- [ ] Applied four-file sprint matches this Pack.
- [ ] Dirty-worktree inventory/source hashes are recorded and unrelated changes remain untouched.
- [ ] New harnesses default nonmutating and pass target, run, API-key/JWT separation, error/header allowlist, correlation containment, timing, ceiling, compensation, cleanup, and clearing tests.
- [ ] Existing static/focused tests, TypeScript, lint, production build, and credential ignore/untracked checks pass.
- [ ] Exact candidate, old-project refusal, ledger 0001-0012, immutable migrations, structure/advisors, health, production-only callback/Site URL, and zero Auth/application/Storage baselines pass.
- [ ] Signing/JWKS/API-key state classes are recorded and remain unchanged.
- [ ] T0 uses one fresh `.invalid` Auth identity and no application/Storage fixture.
- [ ] T0 records bounded UTC start/end, endpoint paths, statuses, fixed error classes, and only allowlisted correlation headers.
- [ ] T0 identity/session/artifact/token/process state is cleared and Auth/application/Storage returns to zero.
- [ ] T+20 starts between 20 and 30 minutes after T0 end with no retained protected or remote state during the interval.
- [ ] Target, health, zero-state, hosted configuration, credential-file, and signing/JWKS guards pass immediately before T+20.
- [ ] T+20 uses a different fresh `.invalid` identity/session/client and no application/Storage fixture.
- [ ] T+20 records the same bounded allowlisted evidence.
- [ ] T+20 identity/session/artifact/token/process state is cleared and Auth/application/Storage returns to zero.
- [ ] Timed outcome is classified as persistent failure, recovered propagation, stable success, or inconclusive using Pack rules.
- [ ] Correlation values appear only in the support-escalation file and no non-allowlisted header/body/error content is retained.
- [ ] Persistent failure produces a complete sanitized support bundle with both UTC windows and exact operator submission/resumption steps.
- [ ] Recovery requires one additional fresh confirmation and two successive complete Auth-chain passes.
- [ ] Stable Auth gate proves verifyOtp, session, getUser, direct Auth, and authenticated Data API success without service-key actor use.
- [ ] Diagnostic/confirmation Auth/application/Storage state is zero before any full proof.
- [ ] A fresh 021M full run begins with authoritative zero anchors and declared ceilings.
- [ ] Exactly ten deterministic `.invalid` identities and genuine isolated sessions are established without delivery or fabricated JWTs.
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
- [ ] Final timed/confirmation/full-run Auth/application/Storage counts are zero and baselines are restored.
- [ ] Runtime, sessions, cookies, artifacts, tokens, protected memory, and browser/process state are cleared.
- [ ] Final signing/JWKS/API-key state, callback/Site URL, ledger, structure/advisors, health, old-project non-contact, and ignored credential-file status pass.
- [ ] Outcome is exactly authenticated-role-rls-proof-passed-clean, authenticated-role-rls-proof-failed-clean, provider-escalation-required-clean, auth-recovered-proof-blocked-clean, blocked-clean, or credential-incident-contained-clean and matches evidence.
- [ ] Email delivery/passwordless callback proof remains explicitly outside scope and not tested.
- [ ] Sprint 021 closeout accurately distinguishes structural, authenticated, runtime, deployment, and callback readiness.
- [ ] Status, progress, schedule, decisions/risks/questions, results, and Architect briefing agree.
- [ ] Final tests, hashes, JSON, redacted scans, correlation containment, ignore/untracked checks, approved diff, and `git diff --check` pass.
- [ ] No out-of-scope application/database/hosted-setting/deployment/cutover/old-project mutation, package install, stage, commit, push, or PR occurs.

Builder must annotate every item exactly once as `pass`, `fail`, or `not-run` with named evidence or reason. Failed and not-run criteria remain unchecked. Passed-clean requires stable Auth, full authenticated proof, cleanup, and restoration.

============================================================
FILE: planning/sprints/021M-provider-directed-timed-jwt-reproduction/handoff-prompt.md
============================================================

# Sprint 021M - Builder Handoff Prompt

You are Builder for Sprint `021M-provider-directed-timed-jwt-reproduction` under the strict profile.

Apply this Pack, verify the four generated sprint files, and execute only from those files.

Reuse the working target-first credential boundary without editing or displaying environment files. Build new default-nonmutating timed-reproduction and conditional-proof harnesses; preserve prior harnesses unchanged. Emit no credential, JWT, claim, key material/ID, UUID, address, raw body, unrestricted error, or non-allowlisted header.

Run two independent one-identity attempts: T0 and T+20. Capture bounded UTC windows, endpoint paths, statuses, fixed error categories, and only allowlisted correlation response headers. Clean each identity/session/artifact/token/process to zero before continuing. Retain correlation values only inside the sanitized support-escalation file.

Keep no protected or remote state during the 20-30 minute interval. Use monitored bounded waits and concise progress updates rather than one long blocking sleep. Recheck target, health, zero state, hosted configuration, and signing/JWKS classes before T+20.

If both attempts fail or results remain inconsistent, make no hosted mutation. Produce the complete support bundle, record actual Supabase Support submission steps, restore/clear everything, and close provider-escalation-required-clean. Do not repeatedly reproduce beyond the permitted attempts.

If Auth recovers, require two successive fresh complete Auth-chain passes. Clean diagnostic state to zero, then run the full ten-actor direct-RLS, comment, denial, revocation, and representative application-route matrix under a fresh 021M run. Do not stop after Auth or Administrator succeeds. Stop on first failed assertion.

Always clean exact application state in dependency-safe order and Auth identities last. Prove zero owned state, unchanged hosted signing/Auth/API-key and production-only configuration, ledger/structure/advisor integrity, both-project health, and old-project non-contact.

Do not mutate signing keys, Auth settings, API keys, callbacks, providers, plan, billing, database, RLS, application, dependencies, production, or the old project. Do not use email/mailboxes/OTPs, create Storage objects, install packages, deploy, cut over, stage, commit, push, or create a PR.

Close exactly as authenticated-role-rls-proof-passed-clean, authenticated-role-rls-proof-failed-clean, provider-escalation-required-clean, auth-recovered-proof-blocked-clean, blocked-clean, or credential-incident-contained-clean. Annotate every acceptance criterion and leave either a submit-ready support escalation or an evidence-backed Sprint 021 closeout.
