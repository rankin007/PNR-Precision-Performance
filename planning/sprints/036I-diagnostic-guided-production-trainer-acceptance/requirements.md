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

## Execution outcome

Closed 2026-08-05 as `production-diagnostic-candidate-preflight-blocked-clean` at Gate C. The exact two-file verifier activation passed 101 assertions, the 036H diagnostic contract passed 70 assertions, all retained local controls, TypeScript, zero-warning lint and the 29-page Production build passed, and protected wrapper `SelfTest` exited 0. The first exact-ID `Verify` wrapper process exited 2 without accepted `8/1/0/0` evidence; its in-console sanitized subcode was not captured into agent output by design. Protected process environment and pending-file residue were zero afterward, and the governed retained ledger remained present.

The user directed the sprint to close without using the one remaining Pack-permitted Verify. No checkpoint/deployment preflight, Git publication, Vercel inspection, deployment, alias assignment, OTP request, verification submission, mailbox inspection, session, provider/configuration change, Product/data mutation or rollback operation began. Production remains on the last authoritative five/five exact Ready rollback; the diagnostic candidate was never created and Sprint 029N remains gated.
