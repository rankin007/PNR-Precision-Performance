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
