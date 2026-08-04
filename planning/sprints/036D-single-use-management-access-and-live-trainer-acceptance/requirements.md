# Sprint 036D — Single-Use Management Access And Live Trainer Acceptance

## Outcome

Complete the unfinished Sprint 036 live trainer-access outcome by closing the one boundary Sprint 036C could not cross: establish one governed, private, single-use Supabase Management credential lifecycle; use the proven identity-blind Auth-config preflight; revoke the exact credential and prove it no longer works; then—only after retained-pilot, application, Vercel and five-alias gates pass—stage one fresh zero-product-change Production candidate, transition exactly five aliases through the proven per-alias transaction, and complete two private human Production trainer sign-ins.

Target outcome: `production-trainer-access-stable-live-accepted-clean`.

Sprint 036D is the corrective continuation of Sprint 036C under the project suffix rule. Sprint 036C safely closed `production-protected-preflight-access-unavailable-clean` after delivering 135-assertion identity-blind tooling but before any provider request because no existing Management API credential was available. Sprint 036D adds only the missing create/use/revoke authority and lifecycle proof. Sprint 029N remains behind this gate.

## Workflow profile

Use `strict`. This sprint touches a high-privilege provider credential lifecycle, a service-role credential used by the existing exact-ID pilot verifier, a retained human trainer identity, Vercel Production deployment and aliases, private mailbox participation, live sessions and rollback.

Strict controls attach to credential creation, protected input, the two-phase Management API proof, output allowlists, exact targets, Production alias mutation, human authentication, integrity and cleanup. They do not authorize Product behavior, Supabase Auth configuration, provider settings, schema, identity, fixture, data or DNS changes.

## Canonical starting authority

Start only from:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

Before any action, resolve the current directory and `git rev-parse --show-toplevel`; both must equal that exact path after normalizing Windows separators. Expected closed Sprint 036C authority is SHA `9a2af97550ff90924f3c2f0286c67f03ddb20828` on `codex/036C-protected-production-preflight-and-live-trainer-acceptance`, with exactly one canonical worktree registration. Prove current status and direct remote authority using connected GitHub evidence when a local remote-tracking ref or credential path is unavailable.

The only expected Architect handoff changes are this Pack and `planning/STATUS.json`. Any additional uncommitted path, changed starting SHA, unresolved remote divergence or extra worktree is a material baseline mismatch until reconciled.

Create only `codex/036D-single-use-management-access-and-live-trainer-acceptance` in the permanent canonical repository. Do not recreate, enter, copy from or use a retired legacy root, `C:\tmp` worktree, deployment directory or Sprint 035Q.

## Source authority

Use, in descending order:

1. `AGENTS.md`, the Evidence-Proportional Execution Standard and Manual Intervention Rule.
2. This Sprint 036D Pack after Builder applies it and verifies exactly four generated files.
3. Closed Sprint 036C review, briefing and exact implementation at SHA `9a2af97550ff90924f3c2f0286c67f03ddb20828`.
4. Closed Sprint 036B/036 release and rollback evidence, and closed Sprint 035K retained-pilot/human Preview evidence.
5. `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/EVIDENCE_INDEX.md`, `docs/OPERATIONS_HANDOFF.md`, `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/WORKFLOW_PROFILE.md` and `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`.
6. Current official Supabase Management API, CLI/token and endpoint documentation, including the exact `GET /v1/projects/{ref}/config/auth` contract and `auth_config_read` fine-grained permission when supported.
7. Current official Vercel deploy, inspect, alias, promote and rollback documentation plus installed CLI help.

Official documentation is execution-time mechanism authority, not permission to broaden scope. Historical evidence supplies baselines only; every release-critical fact must be freshly reread.

## Task contract

**objective:** Establish stable, repeatable live Production trainer access after a privately governed single-use Management credential is created, used for the one identity-blind provider preflight, revoked and proven invalid.

**owns:** Exact canonical/direct-remote reconciliation; three new non-runtime 036D lifecycle files and deterministic tests; private creation of exactly one uniquely named Management credential; one successful fixed Auth-config GET; exact-token revocation and one bounded invalidation proof; exact-ID retained-pilot verification; unchanged application validation; read-only Vercel project/deployment/domain/alias evidence; one fresh `--prod --skip-domain` candidate; a timestamped five-alias routing ledger; exactly five intentional candidate alias assignments; cache-busted public/protected smoke; two private human Production sign-ins; exact all-five rollback; and proportional operations/planning/closeout records.

**must_not:** Automate, scrape, transcribe, screenshot or expose the Supabase account/token page; open an Authentication users surface; call a user-list endpoint; enumerate identities; emit raw provider responses; create more than one token; rotate/revoke an unrelated token; retain a token in CLI login, native credential storage, file, argument, command history, transcript, browser automation output, environment after the child exits, clipboard history/sync, Git or evidence; use OAuth app creation; call any Management endpoint except the exact fixed Auth-config GET; modify Auth/provider configuration; reuse/promote the Sprint 036 candidate; trust deployment-level alias inventory over per-alias routing; move an unlisted alias; change application, component, library, package, runtime configuration, migration, schema, RLS, role, permission, callback, SMTP, template, identity, fixture, application data, Storage, DNS or Vercel settings; inspect/automate a mailbox; activate Participants A/B/C; implement Sprint 029N; merge, open a PR, push `develop`, force-push, rewrite history or claim broad rollout/product-wide Done.

**acceptance:** One credential is privately created, proves the exact current Auth configuration through the 036C projection, is revoked before release work and returns only an accepted invalid-credential response on the same fixed endpoint; retained-pilot Verify passes; application bytes and validation remain accepted; one fresh exact remote-backed candidate is Ready while all five aliases remain on rollback after staging; the fixed stepwise transaction ends five/five on candidate; public/protected safety passes; the retained trainer completes two fresh private Production code sign-ins plus the governed dashboard/workspace/action/denial/sign-out journey; final pilot and routing invariants pass; and exact rollback remains Ready.

**verification:** Run Pack dry-run/four-target proof; canonical path/worktree/status/lineage/direct-remote checks; inherited 036C hash and 135-assertion proof; new lifecycle tests with at least 60 assertions and wrapper self-test; protected one-credential create/use/revoke/invalidation lifecycle in a non-transcribed private console; retained-pilot exact-ID Verify; exact application-byte comparison; retained focused auth/OTP/redirect/bootstrap/session/dashboard/permission suites; canonical validation, TypeScript, zero-warning lint and Production build; current Vercel CLI/help and official mechanism reconciliation; project/domain/alias inventory; five independent alias inspections at every transition checkpoint; rollback/candidate Ready/source proof; cache-busted public/protected/API/unsafe-method smoke; two fresh private human Production sign-ins; final retained-pilot proof; diff/secret/private-data/generated-artifact scans; final worktree/direct-remote proof; and one exact permitted outcome.

## Governing release and pilot state

Fresh execution-time readback governs, with these baselines to reconcile:

- exact Vercel project `rankin007s-projects/pnr-precision-performance`, project ID `prj_6To7czLpCEGL6fInkQwE4egePPpq`;
- known-safe Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, immutable URL `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app`, recorded source `3be6b6c3622150a3c2009ed8564795b14e3e6c2b`;
- unaccepted Sprint 036 candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf`, which must not be reused or promoted;
- accepted Sprint 035K correction `76f66f5f9803e5d1f85a6dd3f71adf302b8a1810` remains in ancestry and current application/source bytes have zero unexplained difference from accepted 035K and validated 036/036B/036C behavior;
- approved Supabase project `uvskssaecdhxcgytkasc`; prohibited old project `tagnbgkroihagjmvehlx` must not be contacted;
- Production Site URL `https://precisionperformance.com.au`;
- redirect allowlist exactly `https://precisionperformance.com.au/auth/callback`, with no wildcard;
- Resend custom SMTP classification and approved sender `no-reply@precisionperformance.com.au`;
- active magic-link/email-OTP template with exactly one `.Token`, zero `ConfirmationURL` and zero links;
- email OTP length `6`, expiry `3600` seconds and minimum per-user send interval `60` seconds; and
- retained adopted Sprint 035K trainer identity plus exact bounded eight-record synthetic graph, with no real horse, stable, clinical, customer or Storage data.

The five and only accepted stable aliases are:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

## Single-use Management credential lifecycle

The credential exists only to make the fixed identity-blind read and prove its own cleanup. Provider token creation and exact-token revocation are the only Supabase control-plane mutations in scope.

Before creating anything, the authorized Supabase account operator privately confirms the correct account can access approved project `uvskssaecdhxcgytkasc`, current MFA/recovery is usable, and no same-name 036D token already exists. Do not report account, organization, user, token-list or project-administration details.

Use this decision order:

1. Prefer a provider-supported fine-grained token restricted to `auth_config_read` and the exact project/organization boundary when the current account page offers those controls.
2. If the current official provider surface offers only a classic PAT, one classic PAT is permitted for this lifecycle only after the named provider operator privately acknowledges that Supabase documents it as long-lived and carrying the user account's privileges. The fixed harness, immediate revocation and invalidation proof are then mandatory compensating controls.
3. Do not create an OAuth application, service account, database credential or CLI login profile as a substitute.

Create exactly one uniquely named token using the non-personal stem `precision-performance-036D-single-use-<UTC>`. The token value remains human-private. Enter it only into the hidden prompt of the fixed 036D wrapper in a private, interactive, non-transcribed ConsoleHost. Direct typing is preferred. If copy/paste is operationally necessary, clipboard history and cross-device sync must be off before creation; paste only into the hidden prompt; clear the clipboard immediately without inspecting or emitting it; and record only `clipboardCleared=true`.

The wrapper performs:

1. one fixed provider-config GET and requires the exact 036C allowlisted pass;
2. a private pause while the operator revokes the exact newly created token and confirms only that its named row is absent;
3. one fixed invalidation GET with the same in-memory token, accepting only HTTP `401` or `403` as `revocationVerified=true`; and
4. at most one diagnosed, bounded invalidation retry after operator-confirmed revocation when provider propagation or rate-limit evidence—not a blind retry—justifies it.

The invalidation probe must not read or retain the response body. A `200`, redirect, unexpected status, transport ambiguity or token still listed means revocation is unproven and stops every retained-pilot/Vercel/release action. If an active token cannot be revoked and proven invalid, stop `production-management-access-revocation-blocked` with exact manual intervention; do not describe the state as clean.

The final sanitized lifecycle record contains only: harness/version, UTC timestamps, token name stem, token class (`fine-grained-auth-config-read` or `classic-pat-harness-bounded`), exact-target boolean, provider projection booleans/counts, credential-created boolean, credential-revoked boolean, post-revoke-list-absent boolean, revocation-response class `unauthorized-or-forbidden`, request count `2` or justified `3`, Auth users enumerated `false`, protected values emitted `false`, and remote mutation `one-management-credential-created-and-revoked`.

Never retain a token value, prefix/suffix, token ID, account identity, organization inventory, raw status body, raw provider error, token-list contents or screenshot.

## 036D protected lifecycle tooling

Add only:

- `scripts/protected-management-lifecycle-036D-core.mjs`
- `scripts/Invoke-ProtectedManagementLifecycle036D.ps1`
- `scripts/test-protected-management-lifecycle-036D.mjs`

Reuse without modification:

- `scripts/protected-production-preflight-036C-core.mjs`, expected SHA-256 `0860B6490D477578ADD79514148C0CC899A13C56F496D17A7516FD7F06518B42`;
- `scripts/test-protected-production-preflight-036C.mjs`, expected SHA-256 `CD7B39BCC3AD5907DE526D15C348AA8222FC7B9D084D13A928BDAAFDD18826E0`;
- `scripts/Invoke-ProtectedProductionPreflight036C.ps1`, expected SHA-256 `95CCE22AACBCFEAC8E231CB9358997A28141E94C59DED1326683BC9EA89278DC`; and
- `scripts/live-trainer-access-035K-core.mjs`, expected SHA-256 `603FF16B9F6EB30D2B5E26A39218E8307731D66008D4D384FB9696095CD3AB5A`.

The new core may import the 036C core for provider projection. Its only live target is HTTPS `GET https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth`, with redirects refused. The first mode requires `200` JSON and the exact 036C projection. The invalidation mode uses the same endpoint and token, requires `401` or `403`, does not read the body, and emits only fixed sanitized lifecycle fields. No arbitrary URL/method, account/token API, PATCH/POST/PUT/DELETE, Auth Admin endpoint, user list, Dashboard navigation or identity enumeration exists.

The new PowerShell wrapper is exact-root/036D-branch bound and exposes only `SelfTest`, `ManagementLifecycle` and `RetainedPilotVerify`. Protected operations require an interactive non-transcribed ConsoleHost, hidden `Read-Host -AsSecureString`, no redirected streams and no pre-existing protected process environment. It keeps the Management token only as a `SecureString` between the pass and invalidation child calls, materializes child-only plaintext for the shortest necessary interval, clears child/parent environments, zeroes BSTR memory and disposes process/secure objects in every path. Service-role input uses a separate child/environment and never overlaps Management-token state.

The new tests must cover at least 60 counted assertions across: inherited core hash/contract; exact first pass; wrong/missing target; 401 and 403 accepted only after a prior pass; 200-after-revoke refusal; redirect, 400, 404, 429, 500, timeout and transport ambiguity; response-body non-read on invalidation; request-count ceiling; no arbitrary method/target; exact output-key set; lifecycle-state ordering; one-token ceiling; noninteractive/transcription/pre-existing-environment refusal; cleanup/finally paths; separate Management/service-role environments; and adversarial email, UUID, JWT, password, token, SMTP, account and identity canaries. No canary may appear in stdout, stderr, thrown text, files or Git.

## Retained-pilot verification

Only after the token is proven revoked, run the unchanged `scripts/live-trainer-access-035K-core.mjs --verify` through the 036D wrapper. Require exact approved Supabase URL, prohibited-old-project refusal, child-only service role, retained ownership ledger, private hidden tester email, ledger-bound `getUserById`, no user enumeration, exact read-by-ID comparison of all eight synthetic rows, exact adopted Auth identity, zero wrong-horse rows and no mutation.

The only accepted sanitized result is `state=verified`, application `8`, Auth `1`, Storage `0`, wrong-horse rows `0`. A missing/invalid ledger, identity mismatch, row mismatch or unexpected data stops before Vercel. Do not repair, recreate or clean the retained pilot in Sprint 036D.

## Pre-stage gate

Before any candidate deployment, checkpoint release push or alias mutation:

1. Pack and canonical/direct-remote baseline pass;
2. inherited 036C files/hashes and 135 assertions pass;
3. new lifecycle tests and wrapper self-test pass;
4. exactly one token is created, the provider projection passes, the exact token is revoked, token-list absence is privately confirmed and the same token returns accepted invalidation proof;
5. retained-pilot Verify passes;
6. application/source bytes and all maintained validation pass;
7. current Vercel mechanism, exact project, domain/alias inventory and Ready rollback pass; and
8. `baseline` proves all five aliases independently resolve to the Ready rollback.

If the protected runner emits a protected value, terminate/finalize that surface, privately revoke the exact token immediately and prove invalidation before any other work. If provider/pilot truth mismatches, token lifecycle cleanup still completes, then close cleanly before Vercel. Historical evidence cannot substitute for the first provider pass, token invalidation, retained-pilot Verify or five-alias baseline.

## Zero-product-change candidate boundary

The application behavior is already accepted. The three new files are non-runtime operations tooling only. No application, component, library, existing helper/test, package, lockfile, Next/Vercel runtime configuration, migration or provider configuration may change.

Prove current application/source bytes have no unexplained difference from accepted Sprint 035K and no difference from validated Sprint 036C across approved runtime paths. Prove no runtime module imports the 036C or 036D operations files. Run maintained validation on the unchanged application tree.

Intentionally commit and push only scoped 036D planning/evidence/tooling. Prove exact local/direct-remote equality, then deploy one fresh Production-target candidate with `--prod --skip-domain` from that exact SHA. Do not reuse either earlier Sprint 036 candidate.

If application bytes differ unexpectedly, validation exposes a Product defect, live acceptance exposes a source/configuration defect, or any package/runtime/provider change is required, restore all five aliases when needed and close `production-access-source-or-contract-change-required-rollback-clean`.

## Authoritative alias evidence and transition

Current routing authority is the independently resolved deployment identity for each named alias. Record only UTC timestamp, checkpoint, alias, resolved deployment ID, intended project/classification, Production target, Ready state and `candidate`/`rollback`/`unexpected`.

Required full five-row snapshots are:

1. `baseline` — all five on rollback before staging;
2. `post-stage` — all five still on rollback after fresh candidate Ready;
3. `promotion-step-1` through `promotion-step-5` — reread all five after every assignment;
4. `candidate-live` — all five on candidate before human authentication;
5. `final-accepted` — all five on candidate after both sign-ins; or
6. `rollback-step-1` through `rollback-step-5` and `final-rollback`.

Deployment-level alias inventory, alias-list output, project status, audit log and public HTTP are corroborating only and never override contradictory per-alias resolution.

Promotion order is fixed:

1. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`
2. `pnr-precision-performance-rankin007s-projects.vercel.app`
3. `pnr-precision-performance.vercel.app`
4. `www.precisionperformance.com.au`
5. `precisionperformance.com.au`

Use explicit `vercel alias set <fresh-candidate-automatic-url> <exact-alias>`. Do not use `vercel promote` or `vercel rollback` unless current read-only proof establishes that their complete affected set equals exactly the five aliases. After each assignment reread all five. Any command error, unexpected alias, third deployment, non-Ready state, automatic movement or irreconcilable response triggers immediate all-five rollback before human authentication.

Rollback order is fixed:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Assign every alias to `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app` even when an earlier read appears safe, rereading all five after every step. If final five/five Ready rollback cannot be proven, stop `production-promotion-partial-mutation-blocked` with exact manual intervention.

## Human Production acceptance

Only after `candidate-live`, credential revocation, provider/pilot proof and cache-busted safety pass:

1. tester privately opens canonical Production sign-in;
2. privately requests, receives and enters one current six-digit code;
3. reaches `/portal` without loop or bootstrap collision;
4. sees only the retained synthetic stable/horse and accurate workflow/action;
5. opens the synthetic horse workspace and reaches or completes the existing permitted action;
6. proves inaccessible-horse denial without identity, existence, state or count leakage;
7. signs out and proves protected access is gone; and
8. after cooldown, uses a fresh browser/application session and fresh current code to reach `/portal` again with the same bounded assignment.

The tester controls mailbox and code entry privately. Builder must not inspect, automate or scrape the mailbox; receive protected values; or retain email, OTP, message, session or private identifiers in conversation, commands, URLs, logs, screenshots, Git or evidence.

One sanitized diagnosis is permitted for human-input, expiry, cooldown or transient failure. Retry only when non-blind and no source/provider/configuration change is required. A material authentication, session, permission, privacy or integrity failure triggers all-five rollback.

After both sign-ins, rerun retained-pilot Verify and `final-accepted`. Do not recreate a Management credential for a final provider read. The accepted final provider substitute is: exact pre-stage Auth-config pass, exact token invalidation proof, zero Auth/provider-configuration mutation ledger, two successful fresh Production sign-ins and final retained-pilot proof. This substitute cannot override an earlier mismatch, privacy failure or incomplete token cleanup.

## Applicable design, privacy and claims gates

This sprint touches authenticated operations and Production release only. It does not cross a new Product-design, content, clinical-claims, pricing, CMS, upload, voice, schema or permission architecture gate.

Preserve truthful sign-in language, public/authenticated separation, mobile/desktop accessibility, no confidential-data display, identity-free denial and professional non-medical messaging. No real horse, stable, owner, trainer, customer, mailbox or clinical record may enter evidence. Status evidence uses text/classification, never color alone.

## Approved files and external actions

Builder may change only:

- the four generated Sprint 036D files;
- the three new 036D operations files;
- `planning/reviews/036D-single-use-management-access-and-live-trainer-acceptance.md`;
- proportional current updates to `planning/STATE.md`, `planning/STATUS.json`, `planning/ROADMAP.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/DECISIONS.md`, `planning/RISKS.md` and `planning/QUESTIONS.md` only where final authority changes; and
- `docs/OPERATIONS_HANDOFF.md` only for a proven token lifecycle/release/rollback procedure.

Approved external actions are limited to sanitized Git/GitHub/Vercel/Supabase checks; private creation and exact revocation of one 036D Management credential; two fixed Management GETs plus at most one justified invalidation retry; private token-list absence confirmation; one retained-pilot exact-ID Verify before staging and one after acceptance; one fresh exact-source staged Production deployment using `--skip-domain`; exactly five candidate alias assignments; cache-busted public/protected smoke; bounded private human OTP requests/verifications; exact all-five rollback; and intentional commit/push of only the scoped 036D branch.

No existing Product/source/helper/test file, package, lockfile, runtime configuration, migration, provider/Auth setting, schema, RLS, role, permission, identity, fixture, data, Storage, DNS or unrelated provider resource may change.

## Evidence-proportional execution and manual intervention

Stop only for a material canonical/remote mismatch, wrong/unbounded target, credential lifecycle ambiguity, protected-output failure, provider/pilot mismatch, alias-routing contradiction, secret exposure, authentication/privacy/integrity failure, unauthorized source/provider/schema/contract expansion, partial Production mutation, failed credential cleanup, failed rollback, unexpected real data, destructive uncertainty or cleanup that cannot be proven safe.

Use equivalent or stronger safe proof when an optional supporting tool is unavailable. Keep in-scope wrapper, credential-injection, lifecycle-state, projection, field-name, timestamp, JSON parsing, reporting, formatting, encoding and deterministic corrections inside 036D when they preserve the contract. Do not create another sprint solely because browser automation, an audit log, renderer, clipboard tool, schema dump, optional CLI command or redundant verifier is unavailable.

Two protected human actions are expected: the provider operator privately creates/revokes the single credential, and the retained tester privately completes sign-ins. Builder owns the fixed commands and verifies sanitized outcomes; humans never disclose protected values.

If the agent cannot safely continue the token lifecycle, record:

- what is blocked or not working;
- evidence already checked;
- the exact secret-free human action needed;
- step-by-step instructions to privately open the official Supabase account token page, create only the named token under the allowed type decision, enter it only into the hidden wrapper prompt, revoke that exact token after the pass, confirm its row absent and return to the wrapper for invalidation proof;
- fixed booleans/classifications the human may report and every value they must not report; and
- what Builder will verify afterward.

If token revocation or invalidation cannot be proven, manual intervention must say the credential may still be active, provide exact private revocation steps, forbid Vercel/Production continuation, and state that Builder will rerun only the fixed invalidation proof. Never ask the user to paste a token, email, OTP, raw response, screenshot, account detail or protected value into conversation.
