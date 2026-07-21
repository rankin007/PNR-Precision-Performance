# Sprint 021J - Operator-Provisioned Authenticated Proof And Closeout Requirements

## Objective

Close the outstanding Sprint 021 authentication and authorization work in one strict-profile sprint by:

1. privately provisioning exact-candidate public configuration and the service-role secret through two separate ignored local files;
2. validating the public candidate target before loading protected material;
3. executing the complete authenticated role, RLS, comment, revocation, and representative application-route proof with genuine isolated user sessions;
4. cleaning all run-owned application and Auth state; and
5. producing an evidence-backed Sprint 021 closeout.

Sprint 021J consolidates credential provisioning and full proof. Do not split successful provisioning from proof execution. Stop only for a defined safety condition, an assertion failure, incomplete cleanup, or a genuinely unavailable operator/provider capability.

## Workflow Profile

`strict`

## Authoritative Sources

- `AGENTS.md`
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, and `planning/SPRINT_SCHEDULE.md`
- Sprint 021 and 021B-021I applied artifacts and reviews
- `planning/reviews/021I-build-and-credential-boundary-preflight-results.md`
- `planning/reviews/021H-authenticated-proof-manifest.md`
- `docs/SPRINT_021_PROGRESS.md`
- `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md` for protected-process principles only; 021J remains mailbox-independent
- migrations `0011_definitive_role_matrix_and_comments.sql` and `0012_role_lifecycle_policy_hardening.sql`
- `lib/auth/role-matrix.ts`, `lib/auth/app-context.ts`, `lib/auth/bootstrap.ts`, and affected authenticated routes/actions
- `scripts/supabase-authenticated-proof-021H.mjs` and its focused self-test as safety-pattern references only
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`

Sprint 021I proved the production build gate and found no autonomous candidate-secret injector. Sprint 021J resolves that constraint through explicit operator provisioning without disclosing values to Builder or tool output.

## Required Outcome Classes

Close with exactly one:

- **authenticated-role-rls-proof-passed-clean**: provisioning, every mandatory authenticated/direct-RLS/application-route/revocation assertion, cleanup, and restoration pass;
- **authenticated-role-rls-proof-failed-clean**: the first genuine authorization or application assertion failure stops the matrix, and exact cleanup/restoration pass;
- **blocked-clean**: provisioning or another prerequisite cannot safely complete, while zero run-owned state and unchanged hosted configuration are proved; or
- **credential-incident-contained-clean**: protected output or target mismatch occurs, execution stops, no secret-backed unexpected request occurs, all run-owned state is zero or cleaned, and protected state is cleared.

Incomplete cleanup/restoration is an active incident and is not a permitted closeout outcome. Email delivery and real passwordless callback certification remain outside 021J.

## Operator-Provisioned Credential Boundary

### Approved ignored files

Use exactly:

- `.env.local` for public candidate configuration only:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `.env.test.local` for protected candidate configuration only:
  - `SUPABASE_SERVICE_ROLE_KEY`

Both filenames are already covered by repository ignore rules. Neither file may be staged, committed, copied into evidence, displayed, read with a shell text command, inspected through tool output, uploaded, or screenshotted.

`.env.local` must not contain `SUPABASE_SERVICE_ROLE_KEY`. `.env.test.local` must not contain project URLs, publishable/anon keys, application settings, or unrelated secrets. Do not use `.env.vercel.production` for 021J.

### Mandatory operator intervention

Builder must pause before protected provisioning and ask the operator to perform these steps privately outside Codex and outside any captured terminal/browser tool:

1. Open `.env.local` in a trusted local editor.
2. Replace the Supabase public configuration with the candidate project values for project reference `uvskssaecdhxcgytkasc`:
   - set `NEXT_PUBLIC_SUPABASE_URL` to the candidate project URL;
   - set `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the candidate publishable/anon value;
   - remove any `SUPABASE_SERVICE_ROLE_KEY` line from this file;
   - remove any old-project Supabase URL/key duplicates from this file.
3. Open or create `.env.test.local` in the same trusted editor.
4. Put exactly one non-comment configuration entry in it: `SUPABASE_SERVICE_ROLE_KEY` with the candidate service-role/secret value.
5. Save both files. Do not paste values into conversation, commands, screenshots, or reports.
6. Reply only: `021J candidate local configuration is ready.`

Builder must record the manual intervention using the project Manual Intervention Rule: blocker, evidence, exact action, steps, and subsequent sanitized verification.

### Target-first protected loading

Builder may verify filenames, ignore status, tracked status, permissions, and sanitized line-name/schema rules without displaying file contents.

The harness must use a two-stage process:

1. Stage A reads only `.env.local`, refuses any protected variable name, validates the URL host exactly as `uvskssaecdhxcgytkasc.supabase.co`, confirms required public-variable presence, and emits sanitized status only.
2. Only after Stage A succeeds, a new protected child process reads `.env.test.local`, refuses every name except `SUPABASE_SERVICE_ROLE_KEY`, binds it to the already validated immutable candidate target, and performs the bounded preflight and authorized proof.

If Stage A sees the old project `tagnbgkroihagjmvehlx`, any unexpected target, duplicate Supabase variables, or a protected variable, stop before reading `.env.test.local`.

Never print, quote, serialize, hash, measure, partially reproduce, or return credential values. Never expose prefixes, suffixes, lengths precise enough to fingerprint, decoded claims, tokens, cookies, generated artifacts, Auth UUIDs, private identifiers, or routable addresses.

## Build And Credential-Free Gate

Before asking for operator provisioning or reading either local file:

- verify the applied Pack identity and approved file set;
- inventory the dirty worktree and preserve unrelated changes;
- run the existing Sprint 021 static validator and focused role/comment tests;
- run TypeScript and lint;
- run one production build; if it repeats the known undiagnosed worker exit, allow one supported debug rerun and one unchanged confirmation run following the 021I method;
- create and pass the new harness refusal/recovery self-tests using synthetic placeholders only;
- verify both credential filenames are ignored and untracked without displaying contents.

Do not request operator provisioning unless these checks pass or the only build behavior is the already characterized transient worker exit resolved by the bounded 021I sequence.

## Immutable Target And Remote Baseline

- Candidate only: `uvskssaecdhxcgytkasc`.
- Absolute refusal target: protected old project `tagnbgkroihagjmvehlx` and every unexpected project.
- Candidate ledger stays exactly `0001`-`0012`; migrations 0011/0012 are immutable; migration 0013 is prohibited.
- Structural baseline stays 35/35 RLS tables, 87 policies, 22 dispositioned database-advisor warnings, zero errors, zero suggestions, and 1,774 lookups; the hosted leaked-password exception remains separate.
- Start with authoritative zero Auth users, zero selected-run application anchors, and zero Storage artifacts. Any unexplained difference stops execution.
- Site URL remains `https://precisionperformance.com.au` and the sole callback remains `https://precisionperformance.com.au/auth/callback`; do not add localhost.
- Candidate and old project must remain healthy. Do not query old-project application data or acquire/use its credentials.
- Refuse all prior/reserved/abandoned identifiers, including `020G-RLS-20260720-01`, `021E-RLS-20260720-01`, and every 021G-021I identifier or attempted reservation.
- Select one fresh `021J-RLS-YYYYMMDD-NN` only after target-first loading and authoritative zero-anchor preflight pass.

## Mailbox-Independent Genuine Sessions

Create exactly ten deterministic, non-routable run-owned Auth identities under the reserved `.invalid` top-level domain:

`ADMIN`, `TRAINER_A`, `TRAINER_B`, `MANAGER_A`, `VET_X`, `CONSULTANT_X`, `HAND_A`, `OWNER_A`, `OWNER_B`, and `SUSPENDED`.

For each actor:

1. create an email-confirmed run-owned identity through the supported candidate Admin API without delivery;
2. generate a supported single-use Auth verification artifact in protected memory;
3. exchange it through supported Supabase Auth for a genuine candidate user session;
4. verify issuer and exact actor binding in protected memory; and
5. isolate the session in its own client/cookie container.

Do not send email, access a mailbox, request an OTP, fabricate/sign JWTs, add passwords, change callback/provider/Auth settings, or use the service key as an actor. Direct RLS and application assertions must use genuine user sessions.

## Fixture Topology And Ceilings

Create exactly two run-owned stables (`STABLE_A`, `STABLE_B`) and four horses (`A1`, `A2`, `B1`, `B2`) with minimum implemented relationships:

- Trainer A: Stable A/A1; Trainer B: Stable B/B1;
- Manager A: Stable A;
- Vet X: A1 and B1;
- Consultant X: A2 only;
- Hand A: Stable A membership and A1 only;
- Owner A: A2; Owner B: B2;
- SUSPENDED: retained A1 relationship while inactive.

Hard ceilings: 10 Auth identities, 10 application users, 10 profiles, 10 primary role/membership rows, 2 stables, 4 horses, 2 ownerships, 10 combined access assignments, 4 biochemistry tests, 12 comments, and zero uploads/Storage objects.

Every mutation must be run-anchored or unambiguously joined to a run-owned object and recorded in an in-memory dependency ledger. Stop and compensate on ambiguity or any ceiling breach.

## Mandatory Proof Matrix

- Administrator: global reads, one bounded reversible administration operation, and soft-delete of another actor's comment.
- Trainers: scoped record/test/comment positives; same-stable-unassigned, wrong-horse, peer/cross-stable, self-expansion, peer-management, and Administrator/Trainer promotion denials; one permitted lower-role grant/revoke.
- Manager A: permitted Stable A operations; Stable B, ownership, stable-security, and user-role-management denials.
- Vet X: assigned A1/B1 read/comment including cross-stable; A2/B2 and underlying-edit denials.
- Consultant X: A2 read/comment only; A1/B1/B2 and underlying-edit denials.
- Hand A: A1 read/comment only; same-stable A2, Stable B, and underlying-edit denials.
- Owners: own-horse associated reads only; other-horse, record-edit, comment/comment-mutation, self-assignment, and ownership-transfer denials.
- SUSPENDED and anonymous: zero protected application-data access.
- Comments: permitted creation; own edit/soft-delete; cross-author denial; Administrator removal; Owner denial; empty and over-2,000-character rejection with zero persistence.
- Revocation: permitted relationship removal causes immediate denial on a fresh session while historical attribution remains.

Record every mandatory assertion exactly once using sanitized actor/resource aliases, expected class, actual class, and pass/fail. Stop the matrix on the first failed assertion and begin cleanup immediately.

## Direct RLS And Representative Application Agreement

- Direct candidate operations use each genuine actor session, never the service key.
- Start the local application against the candidate with the same target-first protected process boundary and no callback change.
- Establish isolated request/browser contexts through the supported existing Supabase SSR session-cookie contract without modifying application code.
- Exercise representative protected routes/actions for every role class and compare with direct RLS as `allowed/allowed` or `denied/denied`.
- Safe redirect/not-found/access-denied behavior satisfies denial only when it discloses no inaccessible-resource existence.
- If the existing application cannot accept a supported genuine session without implementation or callback change, finish direct RLS evidence if safe, clean completely, and close at most `blocked-clean`; do not change implementation.

## Stop, Compensation, Cleanup, And Restoration

- Default is nonmutating until exact target, fresh run, authoritative zero baselines, ceilings, and ownership ledger are confirmed.
- Compensate immediately after any partial identity/session/fixture creation failure.
- On the first assertion failure, stop proof and begin cleanup.
- Delete exact run-owned application state in dependency-safe reverse order; delete Auth identities last.
- Refuse broad, wildcard, ambiguous, manually copied-ID, or ceiling-exceeding cleanup.
- Stop runtime and clear every user session, cookie container, generated artifact, secret variable, process handle, and browser/provider reveal state.
- Final proof requires zero selected-run anchors, zero run-owned Auth/application/Storage state, restored starting baselines, production-only callback/Site URL, ledger 0001-0012, unchanged structure/advisors, both projects healthy, and old-project non-contact.
- After successful closeout, leave `.env.local` and `.env.test.local` untouched for operator disposition; do not delete or display them. Record that they remain ignored local operator-managed configuration.

## Approved File Set

Builder may create/update only:

- new `scripts/supabase-authenticated-proof-021J.mjs` and focused self-test;
- new `planning/reviews/021J-authenticated-proof-manifest.md` and `planning/reviews/021J-authenticated-proof-results.md`;
- `docs/SPRINT_021_PROGRESS.md` and applied 021J acceptance annotations;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, and `planning/ARCHITECT_BRIEFING.md`;
- directly relevant 021J entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

Builder may not edit either operator-managed environment file. Only the operator performs the specified private provisioning.

No application, library, component, migration, bootstrap, verification SQL, configuration, dependency, infrastructure, prior harness, prior test, or prior sprint evidence file may be edited.

## Validation

Before mutation: Pack identity, approved diff/source hashes, harness syntax and refusal/recovery tests, existing Sprint 021 static/focused tests, TypeScript, lint, production build, ignore/untracked checks, target-first public validation, protected-variable schema validation, exact candidate/old health, ledger/structure/advisor baselines, production-only callback, authoritative zero Auth/application/Storage counts, and zero fresh-run anchors.

At closeout: complete assertion ledger, cleanup/restoration proof, closing hashes, JSON parse, redacted credential/token/private-identifier scan, ignored/untracked credential-file confirmation without content inspection, approved-file diff, and `git diff --check`.

Every acceptance criterion receives exactly one `pass`, `fail`, or `not-run` annotation. Failed and not-run criteria remain unchecked.

## Prohibitions

- printing, inspecting, copying, hashing, measuring, serializing, screenshotting, or retaining environment-file contents or credential material;
- loading `.env.test.local` before exact candidate validation from `.env.local`;
- mailbox/email/message/OTP work or real passwordless callback certification;
- fabricated JWTs, service-key actor assertions, routable/personal/disclosed addresses, or plaintext credential artifacts outside the two operator-managed ignored files;
- callback, Site URL, provider, hosted Auth, password, plan, billing, or leaked-password-setting changes;
- migration 0013; application, authorization, schema, RLS, policy, helper, grant, seed, bootstrap, config, dependency, or infrastructure changes;
- real people/customers/horses/clinical data, uploads, or Storage objects;
- deployment, Vercel/production environment mutation, cutover, DNS, public reopening, old-project application access/mutation, package installation, stage, commit, push, or PR.

## Manual Intervention Rule

The operator provisioning step is required. Builder must clearly record:

- what is blocked: no autonomous protected candidate-secret injector exists;
- evidence checked: Sprint 021I process, dashboard, and alternate-route inventory;
- the exact private two-file operator action listed above;
- step-by-step completion instructions;
- the safe response phrase only; and
- what Builder will verify afterward: ignored/untracked status, file-schema separation, exact target before secret load, sanitized protected presence, remote baselines, and full proof readiness.

If the operator cannot perform this action or the provider cannot supply the candidate values, close `blocked-clean` with no mutation. Never ask the operator to disclose a value.
