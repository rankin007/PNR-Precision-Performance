# Architect Pack - Sprint 036I Diagnostic-Guided Production Trainer Acceptance

============================================================
FILE: planning/sprints/036I-diagnostic-guided-production-trainer-acceptance/requirements.md
============================================================

# Sprint 036I - Diagnostic-Guided Production Trainer Acceptance

## Outcome

Prove stable live Production trainer access through one exact deployment of the closed Sprint 036H diagnostic build, a governed five-alias cutover and two fresh private trainer sign-ins, while making every failed request non-retriable and immediately recoverable to the known-safe rollback.

Sprint 036I is the first live use of the privacy-safe request diagnostic created in Sprint 036H. It may record only one of the five allowlisted ephemeral categories when the application returns the existing generic `retry-later` result. It must not expose or persist a provider payload, raw error code/status/message, email, OTP, session, identity fact or other protected value.

Target outcome: `production-trainer-access-stable-live-accepted-clean`.

If either private request, delivery, verification, session or bounded trainer journey fails, the attempt is consumed. Builder records only the permitted sanitized classification, performs the exact all-five rollback and closes without another request. Sprint 029N remains outside this sprint; only the target outcome releases its trainer-access dependency for separate later planning.

## Workflow profile

Use `strict`. This sprint touches an unauthenticated Production authentication surface, a new Production-target deployment, five live aliases, an existing protected service-role value used only by the exact-ID retained-pilot verifier, a retained human trainer identity, private mailbox-controlled OTP entry, live sessions and rollback.

Strict controls attach to exact source provenance, the closed 036H privacy contract, the protected verifier, one-deployment and two-request ceilings, independent five-alias routing authority, private human interaction, diagnostic sanitization, immediate rollback and final cleanup. Strict does not require provider-log, Auth-user-list, Management API or raw mailbox evidence when the governed user journey and allowlisted diagnostic provide stronger safe proof.

## Canonical starting authority

Start only from:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

Before any action, resolve the current directory and `git rev-parse --show-toplevel`; both must equal that path after normalizing Windows separators. Expected closed Sprint 036H authority is local SHA `6c0244439c7c938945831c909c1737c615ee8cfa` on `codex/036H-privacy-safe-authentication-failure-diagnostics`, with a clean worktree and exactly one canonical worktree registration.

The 036H branch has no established local remote-tracking authority at Architect handoff. That is known context, not permission to fetch, merge, replace the local starting SHA or deploy before exact scoped 036I remote provenance is established.

The only expected Architect handoff changes are this Pack and `planning/STATUS.json`. Any other uncommitted path, changed starting SHA, extra worktree or ambiguous target is a material baseline mismatch until reconciled.

Dry-run and apply this Pack, verify exactly four generated sprint files, and create only `codex/036I-diagnostic-guided-production-trainer-acceptance` from the exact starting SHA while preserving the Architect handoff. Do not use a retired legacy path, `C:\tmp` checkout/worktree, deployment directory, alternate history or Sprint 035Q.

## Source authority

Use, in descending order:

1. `AGENTS.md`, including the canonical-workspace guard, Architect/Builder separation, Evidence-Proportional Execution Standard and Manual Intervention Rule.
2. This Sprint 036I Pack after Builder applies it and verifies exactly four generated files.
3. Closed Sprint 036H briefing, requirements, acceptance and review for the exact five-category diagnostic, generic public behavior, hidden ephemeral marker and zero-persistence boundary.
4. Closed Sprint 036G requirements, acceptance and review for the exact five-alias affected set, retained-pilot verifier, independent per-alias routing authority, consumed retry, failed authentication and complete rollback.
5. Current application source and focused tests, especially `lib/auth/otp-request.ts`, `app/auth/actions.ts`, `components/auth/sign-in-form.tsx`, `scripts/test-auth-request-diagnostics-036H.mjs`, `scripts/Invoke-LiveTrainerAccess035K.ps1`, `scripts/live-trainer-access-035K-core.mjs` and `scripts/test-live-trainer-access-035K.mjs`.
6. `docs/OPERATIONS_HANDOFF.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/EVIDENCE_INDEX.md`, `docs/WORKFLOW_PROFILE.md` and `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`.
7. Current official Supabase Auth error-code and rate-limit documentation at `https://supabase.com/docs/guides/auth/debugging/error-codes` and `https://supabase.com/docs/guides/auth/rate-limits`, plus current official Vercel CLI documentation and installed execution-time help for `deploy`, `inspect`, `curl` and `alias set`.

Official documentation is mechanism authority only. It does not prove current hosted configuration, request eligibility, delivery, live source, routing or permission to broaden the external-action set. Fresh execution-time evidence governs mutable facts.

## Task contract

**objective:** Deploy the exact closed Sprint 036H diagnostic build once and prove two fresh private Production trainer journeys through a five-alias cutover, or classify the first material request/journey failure safely and restore all five aliases to the exact Ready rollback without retry.

**owns:** Canonical/start-SHA reconciliation; exact two-file protected-verifier branch activation and deterministic proof; closed 036H runtime/hash and diagnostic regression proof; existing service-role protected entry for exact-ID retained-pilot Verify only; one scoped 036I checkpoint commit/push and direct-remote equality; current Vercel mechanism/project/rollback evidence; exactly one new Production-target `--skip-domain` deployment from the clean checkpoint; immediate five-alias post-deploy reread; immutable-candidate smoke; exactly five fixed candidate alias assignments; cache-busted canonical safety; a maximum of two private OTP requests and verifications under the success-only sequence; allowlisted diagnostic consumption on retry-later; exact all-five rollback on any material failure; final retained-pilot/routing/safety proof; proportional review/docs/planning closeout; and scoped 036I closeout commit/push.

**must_not:** Change the Sprint 036H application/runtime diagnostic contract or visible sign-in copy; broaden its five categories; inspect or record a raw provider error, code, status, message, response, header, body, user list or identity; inspect, automate or scrape a mailbox; receive an email, OTP, session, cookie or private identifier; persist a diagnostic in logs, analytics, URLs, storage, cookies, files or screenshots; make more than two OTP requests total; make a second request after any first-request or first-journey failure; retry after any `retry-later`; create, rotate, receive, use or revoke a Supabase Management token; call a Supabase Management API; change Supabase/Auth/SMTP/template/callback/rate-limit settings; change Vercel environment/project settings, DNS, Product runtime, dependencies, lockfiles, configuration, migrations, schema, RLS, roles, permissions, identity, fixture, application data or Storage; reuse the old unaccepted Sprint 036 candidate as the 036I diagnostic candidate; make more than one fresh deployment; use `vercel promote`, `vercel rollback`, redeploy or domain auto-assignment as a substitute for exact per-alias control; move an unlisted alias; activate Participants A/B/C; implement Sprint 029N; merge, open a PR, push `develop`, force-push or rewrite history.

**acceptance:** The protected verifier accepts exactly historical 035K, closed 036G and current 036I branches and refuses every other branch; its core remains byte-identical; all 036H application/runtime hashes and the 70-assertion diagnostic contract remain exact; retained focused auth/dashboard/public validation, TypeScript, zero-warning lint and Production build pass; exact-ID retained-pilot Verify passes; the scoped checkpoint is exact on its direct remote; one new deployment is exact-project, Production-targeted, Ready, source-proven and initially alias-free by independent resolution; all five aliases remain on exact rollback after deployment; immutable candidate safety passes; five fixed assignments reach five/five candidate with complete rereads; canonical safety passes; the tester waits at least 120 seconds from the latest known request before request one and at least 120 seconds from request one before request two; each request either advances without a diagnostic or returns retry-later with exactly one allowlisted category; two complete fresh sign-ins prove dashboard, workspace/action, identity-free denial and sign-out; final exact-ID pilot, five/five candidate, canonical safety, privacy and cleanup pass; or any failure produces an exact sanitized outcome and complete five/five rollback without another request.

**verification:** Run Pack dry-run/four-target proof; canonical path/status/SHA/single-worktree checks; starting hashes; code-gate plan; protected wrapper/core/test proof; 70-assertion 036H diagnostic test; retained auth/dashboard/public/static/JSON/role/Supabase-self controls; TypeScript, zero-warning lint and Production build; clean scoped checkpoint/direct-remote equality; current Vercel CLI/help/project/rollback/five-alias proof; one exact deployment and source/Ready/post-deploy routing proof; immutable and canonical cache-busted smoke; timestamped five-alias ledgers; fixed sanitized human reports for up to two journeys; final retained-pilot, route, scope, secret/private-data, JSON, encoding, residue, worktree and direct-remote proof; and exactly one permitted outcome.

## Deliberate 036I decisions

### Deploy the exact 036H diagnostic build once

The old unaccepted candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf` predates Sprint 036H and cannot emit the new request diagnostic. It is historical evidence only and must not be used for 036I acceptance.

Builder creates exactly one fresh Production-target deployment from an exact clean scoped 036I checkpoint whose Product/runtime bytes equal closed 036H SHA `6c0244439c7c938945831c909c1737c615ee8cfa`. The only pre-deployment source changes are the approved protected wrapper/test activation and proportional planning/docs; application/runtime/package/configuration/migration bytes remain unchanged.

After current installed-help reconciliation, the intended deployment shape is one `vercel deploy --prod --skip-domain` operation against exact project `prj_6To7czLpCEGL6fInkQwE4egePPpq`, `rankin007s-projects/pnr-precision-performance`. Record the returned deployment ID, immutable URL, target, Ready state and source provenance without exposing environment values.

Immediately after deployment, independently resolve all five stable aliases. They must remain five/five on exact Ready rollback. Any unexpected alias movement, third deployment, missing alias or contradictory target triggers the exact all-five rollback and closes without a second deployment or human request.

### Preserve the exact rollback

The known-safe rollback is:

- deployment ID `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`;
- immutable URL `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app`;
- recorded source SHA `3be6b6c3622150a3c2009ed8564795b14e3e6c2b`; and
- recorded state Ready.

Fresh inspection must prove exact project, Production target and Ready state before any deployment or alias mutation. Rollback always assigns each accepted alias explicitly to this immutable URL and rereads all five after every step. Deployment-level alias inventory is corroborating only; independent per-alias resolution governs current routing.

### Exact request ceiling and cooldown

The complete sprint ceiling is two OTP requests and two verification submissions, and only the success path may reach request two.

- Request one may occur only after the retained tester privately confirms the correct retained identity, current mailbox availability and at least 120 seconds since the latest known request for that identity.
- Request two may occur only after request one, verification, the full bounded journey and sign-out all pass, and at least 120 seconds have elapsed from request one's submission timestamp.
- A request result of `retry-later`, missing delivery within the bounded ten-minute observation window, rejected/expired verification, missing session, permission/privacy failure, journey failure or sign-out failure consumes the attempt and prohibits every further request in 036I.
- No resend, same-run cooldown retry, third request or provider/configuration correction is permitted.

The 120-second floor is a conservative execution rule based on current official Supabase documentation's default 60-second same-user window; it is not a claim about current hosted configuration. If the provider still returns cooldown, the allowlisted category is recorded and the run rolls back without retry.

### Privacy-safe diagnostic consumption

On `retry-later`, obtain only the value of `data-auth-request-diagnostic`. The accepted values remain exactly:

- `cooldown`
- `delivery-policy`
- `provider-configuration`
- `transport-timeout`
- `provider-unavailable`

The tester may privately use this exact same-tab expression after the generic notice appears:

`document.querySelector('[data-auth-request-diagnostic]')?.getAttribute('data-auth-request-diagnostic') ?? 'missing'`

An equivalent protected attribute probe is acceptable only if it emits exactly one allowlisted value or `missing` and cannot emit DOM content, form values, accessible text, provider detail or protected data. Do not inspect the element tree, copy the page, capture a screenshot or report anything except the allowlisted value/`missing`.

An allowlisted value is the prospective classification of that exact failed request, not broad provider root-cause proof. `missing`, a sixth value, visible category text, raw detail or any persistence is a diagnostic-contract failure. Every retry-later or diagnostic-contract failure triggers immediate all-five rollback and no further request.

### Two complete journeys define stable acceptance

Each successful request must:

1. advance to current six-digit code entry without a request diagnostic;
2. deliver the newest current code privately within ten minutes;
3. accept one private verification submission;
4. reach `/portal` without redirect loop or bootstrap collision;
5. show only the retained synthetic stable/horse and accurate workflow/action;
6. open the synthetic horse workspace and reach or complete the existing permitted action;
7. prove inaccessible-horse denial without identity, existence, state or count leakage; and
8. sign out and prove protected access is gone.

The retained tester controls email, mailbox and code entry. Builder receives only fixed booleans and any allowlisted request diagnostic. Two complete journeys are required before leaving the candidate live. A first success followed by any second failure still triggers complete rollback and does not establish stable access.

### No provider correction in this sprint

The new diagnostic decides how to classify and recover, not how to repair provider state. Even `provider-configuration` or `delivery-policy` does not authorize a dashboard/API read, SMTP/template/rate-limit change, credential lifecycle, identity action or retry.

Any provider/source/contract correction or new acceptance attempt after a failed 036I run requires separate Architect review and authority. Do not convert an allowlisted category into broader diagnosis or implementation inside this sprint.

## Starting hashes

- `lib/auth/otp-request.ts`: `B7502F1A066B52CA281C5CF6220276750EE42E311728604D67A6102F05A9FC44`
- `app/auth/actions.ts`: `9AD3B90E2CF843C5A7EEEC98375561074CE76430F7C7AEA73959397212CCF0EC`
- `components/auth/sign-in-form.tsx`: `B086A5CC07EC0FBD22B60D61BAD7DACC9A5E9DA0546AF78319143D492106CA33`
- `scripts/test-auth-request-diagnostics-036H.mjs`: `D56D9909199C4309509E8C5CDC8617903854504C3D39563A89243244C8DA9D47`
- `scripts/Invoke-LiveTrainerAccess035K.ps1`: `8C2EAB11471D65CCBD3858ED92E83BFE79887E4519A107FF908E74AFE48667DE`
- `scripts/live-trainer-access-035K-core.mjs`: `603FF16B9F6EB30D2B5E26A39218E8307731D66008D4D384FB9696095CD3AB5A`
- `scripts/test-live-trainer-access-035K.mjs`: `C94F899867F78F87DD68C72E6C8E398610E4970657183303D1676C6DB91AB49E`

Builder must reconcile all seven before editing. A mismatch requires diagnosis against exact starting SHA; do not overwrite unexplained work.

## Protected retained-pilot verifier activation

Builder may modify only the wrapper and deterministic test before protected Verify:

- preserve exact historical 035K and closed 036G branch entries;
- add exact current `codex/036I-diagnostic-guided-production-trainer-acceptance` as the third and only new allowed branch;
- refuse every other branch;
- update the deterministic allowlist assertions for exactly three entries; and
- keep `scripts/live-trainer-access-035K-core.mjs` byte-identical.

The expected focused target is 101 assertions: 99 retained plus one exact-third-entry assertion and one modeled-current-branch acceptance assertion. If implementation-preserving test structure changes the arithmetic, Builder must report the exact target and one-for-one accounting before source editing.

Only `SelfTest` and exact-ID `Verify` are allowed. The existing service-role value is privately entered only at the wrapper's hidden prompt, exists only in the child environment for the minimum operation and is cleared afterward. The accepted sanitized Verify result remains `state=verified`, application `8`, Auth `1`, Storage `0`, wrong-horse rows `0`, using exact-ID reads and no enumeration or mutation.

## Product and release preflight

Before deployment:

1. prove current application/runtime/package/configuration/migration bytes are exact closed 036H bytes;
2. pass the 70-assertion diagnostic contract, the expected 101-assertion verifier test and retained auth/dashboard/public/static controls;
3. pass TypeScript, zero-warning lint and Production build;
4. pass protected verifier SelfTest and exact-ID retained-pilot Verify;
5. create one intentional scoped checkpoint commit containing only approved 036I changes;
6. push only the scoped 036I branch and prove local/direct-remote equality;
7. reconcile installed Vercel CLI/help and exact linked project;
8. freshly prove exact rollback Ready;
9. independently resolve the exact five aliases to five/five rollback; and
10. prove no protected residue or unexpected runtime/source/configuration change.

No deployment or human coordination begins from an incomplete earlier gate.

## Exact five-alias affected set

The five and only stable aliases are:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Any additional Production alias, missing alias, third resolved deployment or target ambiguity stops before mutation. DNS remains unchanged.

## Fixed cutover and rollback

Candidate assignment order, lowest public importance to canonical apex:

1. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`
2. `pnr-precision-performance-rankin007s-projects.vercel.app`
3. `pnr-precision-performance.vercel.app`
4. `www.precisionperformance.com.au`
5. `precisionperformance.com.au`

After every candidate write, independently resolve all five aliases and require candidate/rollback counts `1/4`, `2/3`, `3/2`, `4/1`, `5/0`, with no third deployment, non-Ready state or unexpected movement.

Rollback order, canonical apex outward:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Assign every alias explicitly to `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app`, even when a read appears safe, and independently reread all five after every step. Final recovery requires five/five exact Ready rollback plus canonical route safety.

## Public and protected safety

Before any private request and again at final state, use cache-busting values and prove:

- canonical `/`, `/pricing`, `/disclaimer`, one hero asset, `/sign-in` and `/api/health` return accepted safe states;
- public enquiry remains visibly unavailable and commerce remains disabled-safe;
- anonymous `/portal`, `/portal/horses/<synthetic-or-nonexistent-id>` and `/admin` return safely to sign-in without loop, identity or existence leakage;
- unsafe methods and protected/API boundaries retain expected denial;
- canonical/robots/sitemap and public/authenticated separation remain intact; and
- no confidential, identity, mailbox, clinical or customer data enters evidence.

A regression triggers immediate rollback before another request.

## Approved files and external actions

Builder may change only:

- the four generated Sprint 036I files;
- `scripts/Invoke-LiveTrainerAccess035K.ps1`;
- `scripts/test-live-trainer-access-035K.mjs`;
- new `planning/reviews/036I-diagnostic-guided-production-trainer-acceptance.md`;
- proportional current updates to `planning/STATE.md`, `planning/STATUS.json`, `planning/ROADMAP.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/DECISIONS.md`, `planning/RISKS.md` and `planning/QUESTIONS.md` only where final authority changes; and
- `docs/OPERATIONS_HANDOFF.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md` and `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md` only for proven 036I deployment, diagnostic-consumption, private-journey and rollback boundaries.

No application/runtime/package/configuration/migration file may change.

Approved external actions are limited to sanitized official-documentation/Git/GitHub/Vercel read-only checks; protected verifier SelfTest and up to two exact-ID retained-pilot Verify operations using the existing service-role value; one scoped checkpoint commit/push and direct-remote proof; exactly one new Production-target `--skip-domain` deployment; immutable candidate and canonical HTTP smoke; exactly five candidate alias assignments; up to two private OTP requests and verification submissions only on the success sequence; exact all-five rollback when required; and one scoped closeout commit/push.

No other provider, Auth, email, mailbox, identity, data, deployment, alias, Git or Production action is approved.

## Evidence-proportional execution and manual intervention

Stop only for a material canonical/remote mismatch, wrong or unbounded target, 036H source/privacy regression, protected-output failure, retained-pilot mismatch, deployment/source/rollback mismatch, alias-routing contradiction, secret exposure, authentication/privacy/integrity failure, unauthorized source/provider/schema/contract expansion, partial Production mutation, failed rollback, unexpected real data, destructive uncertainty or cleanup that cannot be proven safe.

Use equivalent or stronger safe proof when an optional supporting tool is unavailable. Keep in-scope wrapper allowlist, deterministic harness, reporter, timestamp, JSON parsing, formatting, encoding and validator corrections inside 036I when they preserve this contract. Do not create a follow-up solely because browser automation, a renderer, deployment alias inventory, audit log, schema dump or optional CLI path is unavailable.

Expected human participation is limited to private entry of the existing service-role value into the verifier and the retained tester's private sign-in/mailbox/code steps. Builder owns fixed commands, routing and sanitized verification. Humans never disclose protected values.

Before private acceptance, Builder supplies step-by-step instructions containing only:

1. privately verify the correct retained email and mailbox are ready;
2. confirm `cooldown-ready=yes` only after the 120-second floor;
3. enter the email privately, submit one request and report `request-state=code-entry`, `retry-later` or `other`;
4. for retry-later only, use the exact attribute expression and report one allowlisted category or `missing`;
5. for code-entry only, privately observe up to ten minutes, enter the newest code once and report fixed journey booleans;
6. never report or screenshot email, OTP, message content, provider detail, session, cookie, identity or customer/horse/stable data; and
7. begin the second request only when Builder confirms first-journey success and the second 120-second floor.

Builder verifies routing, public/protected safety, exact request counts, allowlisted reports, retained-pilot state and cleanup afterward. If the human cannot complete the private steps safely, roll back; do not substitute exposed tool output.

============================================================
FILE: planning/sprints/036I-diagnostic-guided-production-trainer-acceptance/blueprint.md
============================================================

# Sprint 036I Blueprint

## Delivery sequence

1. Verify canonical path, exact closed 036H SHA, clean worktree, one worktree and expected two-file Architect handoff.
2. Dry-run and apply the Pack; prove exactly four generated 036I files; create the exact 036I branch from the exact starting SHA.
3. Read all generated files and named 036H/036G/auth/release authorities.
4. Reconcile all seven starting hashes and current behavior without editing source.
5. Stop at the Builder code gate with the exact wrapper/test plan, unchanged runtime scope, assertion arithmetic and acceptance checks.
6. After the code gate is satisfied, add only the exact 036I branch to the protected verifier allowlist and deterministic proof.
7. Run local diagnostic/verifier/focused/full validation and prove exact closed 036H runtime bytes.
8. Run protected SelfTest and exact-ID retained-pilot Verify; clear protected residue.
9. Commit only approved scoped changes, push only 036I and prove local/direct-remote equality.
10. Reconcile execution-time Vercel help, exact project, rollback and five/five rollback baseline.
11. Create exactly one `--prod --skip-domain` deployment from the clean checkpoint; prove exact source, Ready state and five/five rollback still live.
12. Prove immutable candidate safety, then assign the five aliases in fixed order with complete rereads.
13. Prove candidate-live five/five routing and canonical public/protected/API safety.
14. Coordinate request one privately under the fixed 120-second/two-request contract.
15. On any failure, record only the sanitized category/booleans, prohibit further requests, roll back all five and close.
16. Only after first full journey/sign-out success and the second 120-second floor, coordinate request two and the complete repeat journey.
17. On two complete journeys, rerun exact-ID Verify, five/five candidate and canonical safety, then close with the candidate live.
18. Reconcile exact action counts, scope, privacy, residue, docs/planning and direct remote; make only the scoped closeout commit/push; stop.

## Gate A - canonical, Pack and branch

Require:

- current directory and normalized Git top-level equal the permanent canonical path;
- `HEAD` equals `6c0244439c7c938945831c909c1737c615ee8cfa` before branch creation;
- starting branch is exact closed 036H;
- exactly one worktree is registered;
- worktree is clean except this Pack and `planning/STATUS.json`;
- Pack dry-run reports exactly four new targets;
- Pack application creates exactly those four files;
- exact branch `codex/036I-diagnostic-guided-production-trainer-acceptance` is created from the starting SHA; and
- all seven starting hashes match.

The absent established 036H remote-tracking ref is recorded context. It grants no fetch, replacement or deployment authority. Scoped 036I direct-remote equality is a later mandatory pre-deployment gate.

## Code gate content

Before changing any source/test file, Builder reports this exact intended set:

| File | Intended change |
|---|---|
| `scripts/Invoke-LiveTrainerAccess035K.ps1` | Add exact 036I as the third branch in the closed allowlist while preserving 035K/036G and every protected guard. |
| `scripts/test-live-trainer-access-035K.mjs` | Update the closed allowlist model to exactly three entries and add the two exact 036I assertions. |

Builder states:

- expected focused target is 101 assertions = 99 retained + 2 new;
- protected core remains byte-identical;
- all 036H application/runtime/test files remain unchanged;
- no package, lockfile, environment, configuration, migration, schema, RLS, role, permission, provider or deployment file changes; and
- deployment/alias/private requests do not begin until local, protected-pilot and remote-provenance gates pass.

## Gate B - local contract and Product proof

Run from the repository root:

`node --experimental-strip-types scripts/test-live-trainer-access-035K.mjs`

`node --experimental-strip-types scripts/test-auth-request-diagnostics-036H.mjs`

`node --experimental-strip-types scripts/test-email-otp-035D.mjs`

`node --experimental-strip-types scripts/test-passwordless-redirect-035C.mjs`

`node --experimental-strip-types scripts/test-otp-recovery-path-035F.mjs`

`npm run test:dashboard-035`

`npm run test:public-relaunch-032`

`npm run validate:static`

`npm run validate:json`

`npm run test:roles`

`npm run test:supabase-self`

`npm run typecheck`

`npm run lint -- --max-warnings=0`

`npm run build`

Also prove:

- protected core hash remains exact;
- the four 036H implementation hashes remain exact;
- application/runtime/package/configuration/migration paths have zero difference from closed 036H;
- no Product path imports/references the protected verifier; and
- tests make no live Auth, mailbox, provider or Production mutation.

Use an equivalent-or-stronger local proof only under the Evidence-Proportional Execution Standard and document why it covers the same boundary.

## Gate C - protected verifier and scoped provenance

Run protected wrapper SelfTest and exact-ID Verify only in a visible private, non-transcribed ConsoleHost. The human enters the existing service-role value only at the hidden prompt. Require sanitized Verify `8/1/0/0`, zero enumeration/mutation and zero environment/temp residue.

Create one intentional scoped checkpoint commit containing only approved 036I files/records. Push only `codex/036I-diagnostic-guided-production-trainer-acceptance`. Prove local `HEAD` equals direct remote branch SHA before any Vercel deployment.

If direct-remote equality cannot be established safely, close preflight blocked. Do not deploy from an unbacked or ambiguously sourced checkpoint and never ask for a Git credential value in conversation.

## Gate D - Vercel baseline and one deployment

Reconcile installed Vercel CLI/version/help and current official mechanisms for deploy, inspect, protection-aware curl and alias set. Require exact linked project `prj_6To7czLpCEGL6fInkQwE4egePPpq`, `rankin007s-projects/pnr-precision-performance`.

Freshly inspect rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` / `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app` and require Production target, Ready state and exact project.

Record timestamped `baseline-five-rollback` by independently resolving each accepted alias. Require five/five exact Ready rollback and no third deployment.

Run exactly one current-help-confirmed Production-target deployment with `--skip-domain` from the exact clean checkpoint. Capture only sanitized deployment ID, immutable URL, project, target, Ready state and source SHA. Do not emit environment values or build secrets.

Immediately record `post-deploy-five-rollback`. Require all five aliases still resolve to exact rollback. Any movement/discrepancy triggers exact all-five recovery and closes; no second deployment exists.

## Gate E - immutable candidate and cutover

Against the new immutable candidate, use protection-aware cache-busted reads and prove `/`, `/sign-in`, `/api/health`, anonymous `/portal`, nonexistent synthetic horse, `/admin` and unsafe health method retain accepted safe states. Do not request an OTP on the immutable URL.

Assign candidate aliases in fixed order. After each write, independently inspect all five and require counts `1/4`, `2/3`, `3/2`, `4/1`, `5/0`. Record timestamp, exact alias, intended deployment, resolved deployment/state and aggregate counts; no protected data.

At `candidate-live`, require five/five Ready candidate and canonical cache-busted public/protected/API/disabled-commerce safety before private human coordination.

## Gate F - private diagnostic-guided acceptance

### Fixed human report

For each permitted journey, accept only:

- `cooldown-ready`: `yes | no`
- `request-state`: `code-entry | retry-later | other`
- `request-diagnostic`: `not-applicable | cooldown | delivery-policy | provider-configuration | transport-timeout | provider-unavailable | missing`
- `code-received-within-10m`: `yes | no | not-started`
- `verification-submitted`: `yes | no`
- `session`: `yes | no`
- `dashboard`: `yes | no`
- `workspace-action`: `yes | no`
- `denial`: `yes | no`
- `sign-out`: `yes | no`

No free-form provider/mailbox text is accepted. Never receive email, OTP, message content, screenshots, session/cookie or private identifiers.

### Journey one

Require private identity/mailbox readiness and `cooldown-ready=yes` after at least 120 seconds from the latest known request. The tester submits exactly one request.

- `retry-later`: obtain exactly one allowlisted attribute value/`missing`, report remaining booleans `no`/`not-started`, roll back immediately and prohibit request two.
- `other`, invalid marker or privacy contract failure: roll back immediately and prohibit request two.
- `code-entry`: request diagnostic must be `not-applicable`; privately observe up to ten minutes, submit the newest code once and complete all fixed journey checks.

Any `no` consumes the attempt and triggers rollback. Only all `yes` permits the second cooldown clock.

### Journey two

Use a fresh browser/application session only after journey one/sign-out passed and at least 120 seconds elapsed from request one's submission. Repeat the exact one-request/one-verification/full-journey contract.

Any retry-later, delivery, verification, session, permission, privacy, journey or sign-out failure triggers all-five rollback. No third request exists.

## Gate G - success, rollback and closeout

### Success

After two complete journeys:

1. rerun exact-ID retained-pilot Verify and require `8/1/0/0`;
2. require all five aliases resolve to the new Ready candidate;
3. rerun canonical public/protected/API/disabled-commerce safety;
4. prove request/verification counts exactly `2/2`;
5. prove diagnostic report count `0` on the success path;
6. prove no provider/configuration/Product/data mutation and zero protected residue; and
7. close `production-trainer-access-stable-live-accepted-clean` with the candidate live.

This success releases Sprint 029N's trainer-access dependency for separate Architect planning; it does not implement or authorize 029N.

### Rollback

On any failure after deployment/cutover:

1. prohibit every not-yet-used request;
2. assign all five aliases to exact rollback in fixed apex-outward order;
3. reread all five after every assignment;
4. require final five/five exact Ready rollback and canonical safety;
5. preserve only the allowlisted request diagnostic/fixed booleans;
6. prove exact request/verification/action counts and zero unauthorized mutation/residue; and
7. close one failure outcome without retry or provider correction.

If all-five recovery cannot be proven, stop `production-cutover-partial-mutation-blocked` with complete Manual Intervention Rule instructions.

## Permitted outcomes

- `production-trainer-access-stable-live-accepted-clean` - target; one exact diagnostic candidate remains five/five live after two complete journeys and final invariants.
- `production-diagnostic-candidate-preflight-blocked-clean` - canonical/remote/Product/pilot/Vercel/rollback/deployment/source/immutable-candidate proof failed before live cutover, or the one deployment caused a safely recovered unexpected alias movement; no human request occurred.
- `production-auth-request-classified-failure-rollback-clean` - a permitted request returned retry-later with exactly one allowlisted category; no further request occurred and all five aliases are exact rollback.
- `production-auth-diagnostic-contract-failed-rollback-clean` - retry-later lacked exactly one allowlisted marker or the privacy/output contract failed; no further request occurred and all five aliases are exact rollback.
- `production-trainer-acceptance-failed-rollback-clean` - request advanced but delivery, verification, session or bounded journey failed; no retry beyond the success-only ceiling occurred and all five aliases are exact rollback.
- `production-cutover-partial-mutation-blocked` - exact all-five recovery or final routing/safety/cleanup could not be proven; this is a material blocker requiring exact manual intervention.

No permitted outcome authorizes provider correction, a new request, Sprint 029N implementation, broad rollout or product-wide Done.

============================================================
FILE: planning/sprints/036I-diagnostic-guided-production-trainer-acceptance/acceptance.md
============================================================

# Sprint 036I Acceptance

## Canonical and handoff baseline

- [ ] Current directory and Git top-level equal the permanent canonical path.
- [ ] Starting SHA is exact closed 036H `6c0244439c7c938945831c909c1737c615ee8cfa`.
- [ ] Exactly one worktree is registered.
- [ ] Before application, only the Pack and Architect status marker differ.
- [ ] Pack dry-run/apply produces exactly four 036I sprint files.
- [ ] Exact 036I branch is created from the starting SHA.
- [ ] All seven starting hashes match before source editing.
- [ ] No unexplained user work is overwritten.

## Code gate and protected verifier

- [ ] Builder posts the exact two-file wrapper/test plan before editing source/tests.
- [ ] Assertion target is stated as 101 = 99 retained + 2 new, or an exact one-for-one equivalent is justified before editing.
- [ ] Wrapper allowlist contains exactly 035K, 036G and 036I in that order.
- [ ] Every other branch remains refused.
- [ ] Protected core remains byte-identical at its approved hash.
- [ ] Focused verifier test passes its exact counted target.
- [ ] Protected wrapper SelfTest passes or equivalent-or-stronger exact proof is documented.
- [ ] Pre-deployment exact-ID Verify passes sanitized `8/1/0/0` with no enumeration or mutation.
- [ ] Protected environment/temp residue is zero.

## Sprint 036H diagnostic and Product integrity

- [ ] All four 036H implementation hashes remain exact.
- [ ] The 70-assertion diagnostic taxonomy/action/form/privacy test passes.
- [ ] Public disposition remains exactly `indeterminate | retry-later`.
- [ ] Missing-identity behavior and visible sign-in wording remain unchanged.
- [ ] Marker remains one allowlisted, hidden, ephemeral, completely cleared value.
- [ ] No raw provider detail or protected value can enter output or persistence.
- [ ] Application/runtime/package/configuration/migration bytes equal closed 036H.
- [ ] Retained OTP/redirect/recovery/dashboard/public/static/JSON/role/Supabase-self controls pass.
- [ ] TypeScript passes.
- [ ] Lint passes with zero warnings.
- [ ] Production build passes or equivalent-or-stronger exact proof is documented.

## Scoped Git provenance

- [ ] One intentional scoped checkpoint commit contains only approved 036I changes.
- [ ] Only the exact 036I branch is pushed.
- [ ] Local checkpoint and direct remote branch are exact equal before deployment.
- [ ] No merge, PR, `develop` push, force-push or history rewrite occurs.

## Vercel baseline and one deployment

- [ ] Installed/current mechanism authority is reconciled for deploy, inspect, protection-aware curl and alias set.
- [ ] Linked project is exact `prj_6To7czLpCEGL6fInkQwE4egePPpq` / `rankin007s-projects/pnr-precision-performance`.
- [ ] Rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` is exact-project, Production-targeted and Ready.
- [ ] Baseline independently proves all five aliases on exact rollback.
- [ ] Exactly one fresh Production-target `--skip-domain` deployment is created from the clean checkpoint.
- [ ] New deployment ID/immutable URL/source/target/Ready state are recorded sanitized.
- [ ] Immediate post-deploy resolution proves all five aliases still on exact rollback, or exact recovery completes and no request begins.
- [ ] No second deployment, promote, platform rollback, domain, DNS, environment or project-setting action occurs.
- [ ] Immutable candidate public/protected/API smoke passes before alias cutover.

## Five-alias cutover

- [ ] Affected set is exactly the five approved aliases and no others.
- [ ] Candidate assignment order is exact.
- [ ] Exactly five candidate assignments occur on the success path.
- [ ] Complete rereads prove `1/4`, `2/3`, `3/2`, `4/1`, `5/0` with no third deployment.
- [ ] `candidate-live` proves five/five Ready candidate independently.
- [ ] Cache-busted canonical public/protected/API/disabled-commerce safety passes before OTP.

## Request ceiling, cooldown and privacy

- [ ] Total request ceiling is two and only the full-success sequence may reach request two.
- [ ] Request one begins only after private identity/mailbox readiness and the 120-second floor.
- [ ] Request two begins only after first full journey/sign-out and the second 120-second floor.
- [ ] Each request has at most one verification submission and a ten-minute delivery observation ceiling.
- [ ] Any retry-later/failure consumes the run; no resend, same-run retry or third request occurs.
- [ ] Human reports contain only the fixed booleans and allowlisted diagnostic/`missing`.
- [ ] Builder receives no email, OTP, message content, screenshot, provider detail, session/cookie or private identifier.
- [ ] No mailbox automation, scraping or protected DOM/page output occurs.

## Diagnostic-guided failure boundary

- [ ] Retry-later reports exactly one of the five allowlisted categories or `missing` through the exact attribute-only mechanism.
- [ ] No raw provider code/status/message/payload is read or retained.
- [ ] An allowlisted value is recorded only as the classification of that request, not broad root-cause proof.
- [ ] Retry-later, missing/invalid marker or privacy-contract failure prohibits every later request.
- [ ] No diagnostic is logged, stored, placed in a URL/cookie, made visible/accessibly named or retained outside sanitized closeout classification.
- [ ] No provider, SMTP, template, callback, rate-limit or Auth correction occurs.

## Live trainer journeys

- [ ] Journey one advances to code entry with no diagnostic, receives a current code within ten minutes and submits it once.
- [ ] Journey one proves session, dashboard, exact retained workspace/action, identity-free denial and sign-out.
- [ ] Journey two uses a fresh browser/application session and a fresh current code.
- [ ] Journey two proves the same session, dashboard, workspace/action, denial and sign-out sequence.
- [ ] Request/verification counts are exactly `2/2` for target success.
- [ ] No real trainer, horse, stable, mailbox, customer or clinical detail enters evidence.

## Final success invariants

- [ ] Final exact-ID retained-pilot Verify passes `8/1/0/0` with zero mutation.
- [ ] All five aliases independently resolve to the new Ready diagnostic candidate.
- [ ] Final canonical public/protected/API/disabled-commerce safety passes.
- [ ] Provider/project/Product/schema/RLS/identity/fixture/data/Storage mutation counts are zero.
- [ ] Protected process/browser/temp residue is zero.
- [ ] Scoped closeout commit/push and direct-remote equality pass.
- [ ] Sprint 029N is recorded only as eligible for separate planning, not implemented or authorized.

## Failure and rollback

- [ ] Any material failure after cutover triggers the fixed all-five rollback before further request/action.
- [ ] Rollback order is exact and every alias is explicitly assigned to the rollback immutable URL.
- [ ] Complete rereads occur after every rollback assignment.
- [ ] Final five/five exact Ready rollback and canonical route safety pass.
- [ ] Exact request, verification, deployment, alias and protected-operation counts are recorded.
- [ ] No retry/provider correction occurs after rollback.
- [ ] If rollback/cleanup cannot be proven, complete Manual Intervention Rule instructions are recorded.

## Scope and closeout

- [ ] Changed files remain exactly within the approved set.
- [ ] No application/runtime/package/lockfile/configuration/migration/schema/RLS/role/permission file changes.
- [ ] `git diff --check`, JSON, encoding, whitespace, secret/private-data and generated-residue checks pass.
- [ ] Review records exact source, deployment, alias ledger, assertion arithmetic, fixed human reports, action counts and final outcome.
- [ ] State/status/roadmap/lifecycle/schedule/evidence/briefing/docs are updated proportionally.
- [ ] Briefing includes v8 executive summary, readiness signals, exact tests, Evidence and Plan corrections.
- [ ] Final status is exactly one permitted outcome.

Only `production-trainer-access-stable-live-accepted-clean` completes the stable Production trainer-access gate. Every other outcome keeps Sprint 029N gated unless the owner later changes the roadmap separately.

============================================================
FILE: planning/sprints/036I-diagnostic-guided-production-trainer-acceptance/handoff-prompt.md
============================================================

You are Builder for Sprint 036I - Diagnostic-Guided Production Trainer Acceptance.

Your one objective is to deploy the exact closed Sprint 036H diagnostic build once and prove two fresh private Production trainer journeys through a governed five-alias cutover, or classify the first material request/journey failure safely and restore all five aliases to the exact Ready rollback without retry.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Resolve current directory and Git top-level; both must equal it after normalizing Windows separators. Require exact closed 036H SHA `6c0244439c7c938945831c909c1737c615ee8cfa`, branch `codex/036H-privacy-safe-authentication-failure-diagnostics`, a clean worktree and exactly one registered worktree. Only this Pack and `planning/STATUS.json` may differ at handoff.

Dry-run/apply `planning/architect-packs/architect-pack-036I-diagnostic-guided-production-trainer-acceptance.md`, verify exactly four generated files, create only `codex/036I-diagnostic-guided-production-trainer-acceptance` from the exact starting SHA, and execute only from the generated files. Never use a legacy path, `C:\tmp` worktree, deployment directory, alternate history or Sprint 035Q.

Read the identity/rules, all four generated files, current state/status/roadmap/briefing, complete closed 036H and 036G authority, current auth/verifier source and tests, operations/auth/protected-process docs, workflow/design authority, and current official Supabase/Vercel mechanism documentation.

The task contract is:

**objective:** Deploy the exact closed Sprint 036H diagnostic build once and prove two fresh private Production trainer journeys through a five-alias cutover, or classify the first material request/journey failure safely and restore all five aliases to the exact Ready rollback without retry.

**owns:** Exact canonical/source proof; two-file verifier activation; 036H diagnostic/Product validation; exact-ID retained-pilot Verify; scoped checkpoint/push; one fresh Production-target skip-domain deployment; immutable/canonical smoke; fixed five-alias cutover; up to two private success-only OTP requests/verifications; allowlisted diagnostic consumption; exact all-five rollback; final invariants; proportional closeout and scoped push.

**must_not:** Change app/runtime or visible copy; broaden/expose/persist diagnostics; read raw provider/mailbox/identity data; exceed two requests or retry after failure; change provider/Auth/SMTP/template/callback/rate limits; use a Management token/API; change Vercel settings/DNS/schema/RLS/roles/data; make a second deployment; reuse the old 036 candidate; move unlisted aliases; implement 029N; merge/PR/develop/force-push/rewrite.

**acceptance:** Exact verifier/diagnostic/Product/local/protected/remote gates pass; one exact new Ready source-proven candidate leaves all aliases on rollback until five fixed assignments; candidate-live safety passes; request one and request two obey 120-second floors; any retry-later emits only one allowlisted category and triggers rollback without another request; two complete private code/session/dashboard/workspace/denial/sign-out journeys pass; final pilot/five-alias/safety/privacy/cleanup pass, or one exact failure outcome restores five/five rollback.

**verification:** Pack/four-target, canonical/SHA/worktree/hashes, code gate, 101 verifier and 70 diagnostic assertions, retained focused controls, TypeScript/lint/build, protected Verify, scoped direct-remote equality, one deployment/source/Ready/post-deploy routing, immutable/canonical smoke, per-step alias ledgers, fixed human reports, final pilot/routing/scope/privacy/residue/remote proof and one permitted outcome.

Before editing source/tests, stop at the Builder code gate. Present the exact two-file plan for `scripts/Invoke-LiveTrainerAccess035K.ps1` and `scripts/test-live-trainer-access-035K.mjs`, expected 101 = 99 + 2 assertions, unchanged core and unchanged 036H runtime scope. Do not edit source/tests before explicit code-gate approval.

Starting hashes are listed in requirements. Add exactly the 036I branch as the third allowed wrapper branch, retain 035K/036G, refuse every other branch and keep the core byte-identical.

Run the exact local commands in the blueprint. Require 036H's four implementation hashes and 70 assertions unchanged, verifier target passing, retained focused controls, TypeScript, zero-warning lint and Production build. Run private SelfTest/Verify with hidden protected input and require sanitized `8/1/0/0` plus zero residue.

Commit/push only the scoped 036I checkpoint and prove direct-remote equality before deployment. Reconcile current Vercel help, exact project, exact Ready rollback and five/five rollback baseline. Create exactly one fresh `--prod --skip-domain` deployment from the clean checkpoint. Immediately prove all five aliases stayed on rollback; any movement triggers exact recovery and stop.

Prove immutable candidate safety, then assign only the five accepted aliases in fixed order with full rereads. At five/five candidate, prove canonical safety before private requests.

The complete request ceiling is two, and only success may reach request two. Require at least 120 seconds before request one from the latest known request and 120 seconds from request one before request two. Each request gets one code submission and ten minutes for private delivery observation. Any retry-later, missing/invalid marker, non-delivery, verification/session/journey/privacy failure consumes the run, prohibits later requests and triggers all-five rollback.

On retry-later, accept only the exact `data-auth-request-diagnostic` value through the attribute-only expression in requirements. Record only one of cooldown, delivery-policy, provider-configuration, transport-timeout, provider-unavailable or missing. Never accept raw provider detail, email, OTP, screenshot, mailbox text, session/cookie or private identity data. The category classifies that request only and grants no provider correction.

Success requires two complete fresh journeys: code entry, private current-code verification, portal, retained synthetic dashboard/workspace/action, identity-free denial and sign-out. After success, rerun exact-ID Verify, five/five candidate and canonical safety. Only then close `production-trainer-access-stable-live-accepted-clean` with the candidate live and record 029N as eligible for separate planning.

On any failure, explicitly assign all five aliases to `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app` in fixed rollback order, reread all five after every step and prove five/five exact Ready rollback plus route safety. Close the matching permitted failure outcome. Do not retry, diagnose provider state, begin another sprint or take any unlisted external action.

Apply the Evidence-Proportional Execution Standard. Use equivalent or stronger safe proof for optional supporting tools; keep scope-preserving harness/reporter/format/encoding corrections inside 036I; stop only for a material target, authority, privacy, integrity, partial Production mutation, rollback or cleanup boundary. Human participation is limited to hidden existing service-role entry and private trainer email/mailbox/code interaction under the fixed report. Never request a protected value.

Finish proportional records, exact action counts, privacy/residue checks and only the scoped closeout commit/push. Stop after one permitted outcome; Architect delivery of this Pack is the handoff, not authority to broaden it.
