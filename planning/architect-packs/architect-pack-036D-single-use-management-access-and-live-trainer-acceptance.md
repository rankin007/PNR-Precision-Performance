============================================================
FILE: planning/sprints/036D-single-use-management-access-and-live-trainer-acceptance/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/036D-single-use-management-access-and-live-trainer-acceptance/blueprint.md
============================================================

# Sprint 036D Blueprint

## Delivery sequence

1. Prove canonical root, one worktree, exact 036C SHA, clean Architect handoff and direct remote authority.
2. Dry-run/apply the Pack and prove exactly four generated 036D files.
3. Create only the scoped 036D branch.
4. Hash-bind inherited 036C/035K tooling and run inherited deterministic proof.
5. Implement the three new non-runtime lifecycle files; run at least 60 new assertions plus wrapper self-test.
6. Reconcile current official Supabase token and Auth-config endpoint semantics without opening an Authentication users surface.
7. Authorized human privately creates exactly one named 036D token and enters it only into the hidden wrapper.
8. Run one exact provider-config GET; require the full 036C allowlisted pass.
9. Human privately revokes the exact token and confirms only that its row is absent.
10. Reuse the same in-memory token for the fixed invalidation GET; require `401` or `403`; clear all protected state.
11. Run retained-pilot exact-ID Verify through a separate service-role child.
12. Prove application/source bytes unchanged and complete maintained validation.
13. Reconcile current Vercel CLI/mechanisms, exact project, rollback, five-alias set and `baseline`.
14. Commit/push scoped 036D planning/tooling/evidence and prove exact direct-remote equality.
15. Stage one fresh `--prod --skip-domain` candidate; require exact/Ready and `post-stage` five/five rollback.
16. Assign the five aliases one at a time in fixed order, rereading all five after each.
17. Require `candidate-live` five/five candidate and pass cache-busted route safety.
18. Complete first private Production sign-in, governed journey, denial and sign-out.
19. After cooldown, complete a second fresh-session/fresh-code Production sign-in.
20. Rerun retained-pilot Verify, prove `final-accepted`, reconcile zero provider/Product mutation, update proportional records, commit/push scoped closeout and stop.

At any release discrepancy, execute the all-five rollback before unrelated diagnosis or human authentication.

## Credential lifecycle state machine

States are exact and monotonic:

`not-created -> created-private -> provider-pass -> revoked-private -> invalidation-proven -> cleared`

Allowed clean exits before creation:

- `management-access-creation-unavailable-clean`
- `management-access-type-refused-clean`

Allowed clean exits after creation require `revoked-private -> invalidation-proven -> cleared` first:

- `management-access-preflight-failed-revoked-clean`
- `protected-preflight-output-blocked-revoked-clean`
- `protected-preflight-mismatch-revoked-clean`

If the token may remain active, the only state is `management-access-revocation-blocked`; nothing downstream may begin.

The first GET may return only the exact 036C provider projection. The invalidation GET may return only `revocationVerified=true`, fixed response class `unauthorized-or-forbidden`, request count and protected/mutation booleans. Never emit a token fragment, token ID, response body or provider error.

## Token type decision

1. Reconcile the current official account-token controls privately.
2. If a fine-grained token can be restricted to `auth_config_read`, use it and refuse all write permissions.
3. If only a classic PAT is supported, the provider operator privately acknowledges full account privilege and the harness/immediate-revocation compensating controls.
4. If neither allowed path can be established without exposing account/token data, create nothing and close cleanly.
5. Never create an OAuth app, CLI profile, service account or database credential.

## Protected lifecycle architecture

`protected-management-lifecycle-036D-core.mjs`:

- imports the exact 036C provider evaluator for first-pass truth;
- hard-codes the exact approved endpoint and GET;
- exposes provider-pass and invalidation-check modes only;
- rejects redirects and arbitrary targets/methods;
- never reads the invalidation response body;
- returns fixed allowlisted JSON and fixed failure codes only; and
- enforces a total request ceiling of two, or three only for one justified invalidation retry.

`Invoke-ProtectedManagementLifecycle036D.ps1`:

- binds exact root and branch;
- verifies inherited hashes/contracts;
- requires private interactive ConsoleHost and refuses transcription/redirection;
- acquires protected values with `Read-Host -AsSecureString`;
- keeps Management and service-role values separate;
- orchestrates provider pass, private revoke pause and invalidation proof;
- clears clipboard without reading it when paste was used;
- removes process environments and zeroes/disposes protected memory in `finally`; and
- emits fixed sanitized states only.

`test-protected-management-lifecycle-036D.mjs`:

- injects fake transports and lifecycle events;
- proves ordering, request ceiling, exact statuses and body non-read;
- statically proves branch/root, hidden-input, cleanup and no-enumeration contracts; and
- fails on any protected canary escape.

## Pre-stage state machine

`token-not-created`

-> `provider-config-pass`

-> `token-revoked-and-invalid`

-> `retained-pilot-pass`

-> `unchanged-application-validation-pass`

-> `vercel-baseline-five-rollback`

-> `release-eligible`

Any missing predecessor means `not-release-eligible`. No historical evidence may skip a state.

## Routing ledger state machine

`baseline`: rollback `5`, candidate `0`

`post-stage`: rollback `5`, candidate `0`

`promotion-step-1`: rollback `4`, candidate `1`

`promotion-step-2`: rollback `3`, candidate `2`

`promotion-step-3`: rollback `2`, candidate `3`

`promotion-step-4`: rollback `1`, candidate `4`

`promotion-step-5` / `candidate-live`: rollback `0`, candidate `5`

Any third deployment, unexpected alias, non-Ready target, absent row or count mismatch enters rollback.

Rollback snapshots move candidate `4 -> 3 -> 2 -> 1 -> 0`; `final-rollback` is rollback `5`, candidate `0`, unexpected `0`.

## Command shapes

Run from the canonical root. Reconcile current help before external mutation.

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036D-single-use-management-access-and-live-trainer-acceptance.md --dry-run`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036D-single-use-management-access-and-live-trainer-acceptance.md`

`node scripts/test-protected-production-preflight-036C.mjs`

`node scripts/test-protected-management-lifecycle-036D.mjs`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation SelfTest`

Protected private ConsoleHost only:

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation ManagementLifecycle`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation RetainedPilotVerify`

Candidate staging shape after every pre-stage gate:

`vercel.cmd deploy --prod --skip-domain --yes`

Use current help-required scope/source metadata. Do not place protected values in commands.

Promotion shape:

`vercel.cmd alias set <fresh-candidate-automatic-url> <exact-alias>`

Rollback shape:

`vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app <exact-alias>`

## Promotion and rollback order

Promotion:

1. legacy team-qualified alias
2. team project alias
3. project alias
4. `www`
5. apex

Rollback:

1. apex
2. `www`
3. project alias
4. team project alias
5. legacy team-qualified alias

After every command, reread all five aliases independently. Deployment-level alias inventory is never sole routing authority.

## Failure and recovery

- Wrong canonical/remote baseline or unexpected handoff diff: no branch/external action until reconciled.
- Token type/account access unavailable before creation: create nothing; close the exact clean outcome.
- Token created but provider projection fails: revoke exact token, prove invalid, clear state; close cleanly before pilot/Vercel.
- Protected output occurs: finalize surface, revoke exact token privately, prove invalid, clear state; no repeat of the unsafe surface.
- Token revocation/invalidation unproven: stop blocked; no pilot/Vercel/release action.
- Retained-pilot mismatch: no repair; close cleanly before Vercel.
- Fresh candidate not exact/Ready: no alias movement; close staging blocked clean.
- `post-stage` not five/five rollback: assign all five to rollback; close staging-drift rollback clean.
- Promotion snapshot mismatch: immediate all-five rollback.
- Route/human failure with no material change: one sanitized diagnosis and one non-blind cooldown-safe retry; otherwise all-five rollback.
- Source/provider/schema/permission/identity/fixture/data change required: all-five rollback; close source-or-contract-change-required.
- Final rollback cannot be proven: stop blocked with exact manual intervention.

## Closeout minimum

Record starting/final SHA and branch; exact three-file diff; inherited/new test arithmetic; wrapper self-test; sanitized token class/create/pass/revoke/absence/invalidation/request-count record; provider projection; pilot Verify; Vercel CLI/project/rollback/fresh candidate; every five-row snapshot; route smoke; human-journey booleans; final pilot evidence; exact mutation list; rollback disposition; full validation; protected-output boundary; worktree/direct-remote equality. Retain no credential, token fragment, raw response, account data or protected value.

============================================================
FILE: planning/sprints/036D-single-use-management-access-and-live-trainer-acceptance/acceptance.md
============================================================

# Sprint 036D Acceptance

## Canonical and handoff baseline

- [ ] Current directory and Git top-level exactly equal the permanent canonical repository after Windows separator normalization.
- [ ] Exactly one canonical worktree registration exists and no retired/temporary/alternate workspace is used.
- [ ] Exact closed 036C SHA `9a2af97550ff90924f3c2f0286c67f03ddb20828` and direct remote authority are proven.
- [ ] Pre-branch state contains only this Pack and `planning/STATUS.json`.
- [ ] Pack dry-run/apply/post-dry-run reports exactly the four 036D sprint files.
- [ ] Only `codex/036D-single-use-management-access-and-live-trainer-acceptance` is used.

## Inherited and new tooling

- [ ] Existing 036C provider core/test/wrapper and 035K core match the exact approved SHA-256 values.
- [ ] Existing 036C deterministic suite passes all 135 assertions.
- [ ] Repository implementation scope is exactly the three new 036D operations files.
- [ ] New lifecycle suite passes at least 60 counted assertions and reports exact arithmetic.
- [ ] New wrapper self-test passes.
- [ ] Provider live paths are hard-bound to exact approved project, HTTPS GET and Auth-config endpoint.
- [ ] No arbitrary URL/method, account-token API, Dashboard path, Auth Admin endpoint, user list, pagination or identity enumeration exists.
- [ ] Invalidation mode accepts only 401/403 after prior provider pass and never reads the response body.
- [ ] Request count is exactly two or three only with one documented non-blind invalidation retry.
- [ ] Protected operations require private non-transcribed interactive ConsoleHost input and refuse redirection/pre-existing protected environment.
- [ ] Management token and service role enter only separate relevant child processes and are cleared/zeroed/disposed afterward.
- [ ] Reporter output keys equal the approved allowlist and all failures use fixed sanitized codes.
- [ ] No secret/private canary or raw response/error appears in stdout, stderr, thrown text, files or Git.
- [ ] No package, lockfile, existing helper/test or runtime file changes.

## Single-use Management credential lifecycle

- [ ] Authorized provider operator privately proves correct approved-project access, MFA/recovery readiness and no same-name token without exposing account data.
- [ ] Current official token mechanism is reconciled before creation.
- [ ] Exactly one `precision-performance-036D-single-use-<UTC>` token is created.
- [ ] Fine-grained `auth_config_read`/exact-boundary token is used when provider-supported; otherwise classic-PAT risk acknowledgement and compensating controls are recorded.
- [ ] No OAuth app, CLI profile, service account, database credential or unrelated token mutation occurs.
- [ ] Token value enters only the hidden 036D wrapper prompt.
- [ ] Clipboard history/sync is off when paste is necessary and clipboard is immediately cleared without inspection.
- [ ] One provider GET proves exact Site URL, one callback/no wildcard, Resend/exact sender, one token/no links, 6/3600/60 and zero Auth-user enumeration/config mutation.
- [ ] Operator privately revokes the exact new token and confirms its row absent without exposing the token list.
- [ ] Same in-memory token returns 401/403 on the fixed endpoint and `revocationVerified=true`.
- [ ] All protected token/environment/memory state is cleared after proof.
- [ ] Sanitized lifecycle evidence contains only allowed booleans/counts/classes and `one-management-credential-created-and-revoked`.
- [ ] Any output/preflight failure after creation still completes exact revocation/invalidation before clean close.
- [ ] If revocation/invalidation is unproven, every downstream action is stopped and exact manual intervention is recorded.

## Retained pilot and unchanged application

- [ ] Retained-pilot Verify runs only after token invalidation and proves `verified`, application `8`, Auth `1`, Storage `0`, wrong-horse rows `0`.
- [ ] No Authentication users page, list endpoint, email, Auth ID, row ID, credential, ledger content or provider payload is retained.
- [ ] Accepted 035K correction remains in ancestry and approved runtime paths have zero unexplained difference from accepted 035K and validated 036C.
- [ ] No runtime module imports 036C/036D tooling.
- [ ] Focused 035K, dashboard, OTP, redirect, bootstrap, recovery, session and permission tests pass.
- [ ] Sprint 032 public controls, JSON, domain, roles, Supabase-self and static validation pass.
- [ ] TypeScript, zero-warning lint and Production build pass with equivalent or stronger safe evidence where appropriate.
- [ ] Diff, staged, secret, protected-data, unsafe-path, generated-artifact and encoding scans pass.
- [ ] Scoped 036D checkpoint is committed/pushed and exact local/direct-remote equality is proven before deployment.

## Vercel and authoritative baseline

- [ ] Current Vercel CLI/help and official mechanism semantics are recorded.
- [ ] Exact project ID, Production environment, rollback and unaccepted 036 candidate are freshly reconciled.
- [ ] Planned affected set is exactly the five accepted aliases and no other Production alias.
- [ ] Deployment alias inventory is corroborating only.
- [ ] `baseline` has five independent timestamped rows, all Ready rollback.

## Candidate staging and transition

- [ ] Fresh candidate—not the Sprint 036 candidate—deploys from exact remote-backed 036D SHA with `--prod --skip-domain`.
- [ ] Candidate is exact-project, Production-targeted, exact-source, immutable and Ready.
- [ ] `post-stage` proves five/five aliases remain on rollback.
- [ ] Fixed promotion order uses one exact alias assignment per step.
- [ ] Promotion steps prove candidate/rollback counts 1/4, 2/3, 3/2, 4/1 and 5/0.
- [ ] Every snapshot contains five rows and no third deployment, non-Ready state or unlisted movement.
- [ ] `candidate-live` proves five/five Ready candidate before human authentication.

## Public and protected safety

- [ ] Cache-busted homepage, pricing, disclaimer/asset, disabled enquiry, health and truthful sign-in pass.
- [ ] Anonymous portal and horse routes return safely to sign-in without loop or identity leakage.
- [ ] Unsafe methods and protected/API boundaries retain expected denial.
- [ ] DNS/public-authenticated separation remains unchanged.
- [ ] Compatible rollback remains Ready.

## First private Production journey

- [ ] Tester privately requests/receives/enters one current six-digit code on canonical Production.
- [ ] Session reaches `/portal` without loop/bootstrap collision.
- [ ] Only retained synthetic stable/horse and accurate workflow/action appear.
- [ ] Synthetic horse workspace/action succeeds.
- [ ] Inaccessible horse is denied without identity/existence/state/count leakage.
- [ ] Sign-out removes protected access.

## Second fresh Production sign-in

- [ ] Fresh browser/application session has no first-session auth state.
- [ ] New current code—not an old/reused code—establishes a second Production session.
- [ ] `/portal` shows the same bounded assignment and no broader visibility.
- [ ] Tester confirms usability without sharing protected details.
- [ ] No protected value enters conversation, commands, URLs, logs, screenshots, Git or durable evidence.

## Final invariants and closeout

- [ ] Final retained-pilot Verify passes.
- [ ] Final provider substitute consists of exact pre-stage pass, exact token invalidation, zero provider-config mutation, two successful fresh sign-ins and final pilot proof.
- [ ] `final-accepted` proves five/five Ready candidate after both sign-ins.
- [ ] Exactly one Management token was created and that same token is revoked/invalid; no other token changed.
- [ ] No Auth/provider config, callback, SMTP, template, schema, RLS, role, permission, identity, fixture, data, Storage, DNS or unrelated Product mutation occurs.
- [ ] Participants A/B/C, unrelated identities and real data remain untouched.
- [ ] Review and current state/status/roadmap/lifecycle/schedule/evidence/operations/briefing agree.
- [ ] Canonical worktree is clean and exact closeout commit equals scoped direct remote branch.
- [ ] Sprint 029N remains unstarted unless this sprint passes live trainer access or a later separate owner decision changes the road.
- [ ] No merge, PR, `develop` push, force-push, broad rollout or product-wide Done declaration occurs.

## Failure and rollback

- [ ] A material failure receives one focused sanitized diagnosis and no blind retry.
- [ ] Token cleanup completes before any clean exit after token creation.
- [ ] Staging drift, transition discrepancy, route failure, material auth failure or scope expansion triggers exact all-five rollback.
- [ ] Rollback assigns all five to immutable rollback URL in fixed order, rereading all five after every assignment.
- [ ] `final-rollback`, when required, proves five/five Ready rollback and final route safety.
- [ ] No known-broken candidate, third deployment or partial mapping remains live.
- [ ] If token revocation or alias rollback cannot be proven, exact step-by-step manual intervention is recorded and state is blocked, not clean.

## Permitted outcomes

- `production-trainer-access-stable-live-accepted-clean`
- `production-management-access-creation-unavailable-clean`
- `production-management-access-type-refused-clean`
- `production-management-access-preflight-failed-revoked-clean`
- `production-protected-preflight-output-blocked-revoked-clean`
- `production-protected-preflight-mismatch-revoked-clean`
- `production-management-access-revocation-blocked`
- `production-retained-pilot-preflight-mismatch-clean`
- `production-candidate-staging-blocked-clean`
- `production-candidate-staging-alias-drift-rollback-clean`
- `production-promotion-rolled-back-clean`
- `production-trainer-authentication-failed-rollback-clean`
- `production-access-source-or-contract-change-required-rollback-clean`
- `production-promotion-partial-mutation-blocked`

Only `production-trainer-access-stable-live-accepted-clean` completes the live trainer-access gate.

============================================================
FILE: planning/sprints/036D-single-use-management-access-and-live-trainer-acceptance/handoff-prompt.md
============================================================

You are Builder for Sprint 036D — Single-Use Management Access And Live Trainer Acceptance.

Your one objective is to establish stable live Production trainer access after privately creating exactly one Management credential, using it for the proven identity-blind Auth-config preflight, revoking it and proving it invalid. Continue only after exact token cleanup, retained-pilot proof, unchanged application validation, a five/five rollback baseline and every release gate. Completion requires one fresh staged candidate, the stepwise five-alias transition, route safety, two fresh private Production code sign-ins, the retained synthetic dashboard/workspace/action journey, safe denial/sign-out, final invariants and exact rollback readiness.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Resolve current directory and Git top-level; both must equal it after normalizing Windows separators. Verify one canonical worktree. Expected starting authority is closed 036C SHA `9a2af97550ff90924f3c2f0286c67f03ddb20828`; prove direct remote authority using connected GitHub evidence when needed. The only expected Architect handoff changes are this Pack and `planning/STATUS.json`.

Create only `codex/036D-single-use-management-access-and-live-trainer-acceptance`. Dry-run/apply `planning/architect-packs/architect-pack-036D-single-use-management-access-and-live-trainer-acceptance.md`, verify exactly four generated files, then execute only from them. Never use retired legacy paths, `C:\tmp`, deployment directories or Sprint 035Q.

Read the agent identity, `AGENTS.md`, all four generated 036D files, current state/status/roadmap/briefing, Sprint 036C/036B/036/035K requirements/acceptance/reviews, exact 036C and 035K tooling, current Supabase/Vercel official mechanism docs, Auth/protected-process/operations docs, workflow profile and design/messaging authority.

The task contract is:

**objective:** Establish stable, repeatable live Production trainer access after an exact one-credential create/use/revoke/invalidation lifecycle.

**owns:** Three new 036D operations files/tests; private creation/revocation of exactly one token; one exact Auth-config pass; same-token invalidation proof; exact-ID retained-pilot Verify; unchanged application proof; exact Vercel/five-alias evidence; one fresh staged candidate; five candidate alias assignments; route smoke; two human sign-ins; rollback; proportional closeout; scoped branch commit/push.

**must_not:** Automate/expose Supabase account/token or Authentication-user surfaces; enumerate identities; emit raw provider output; create more than one token; alter unrelated tokens; persist a credential; call any Management endpoint except fixed Auth-config GET; create OAuth/CLI/service-account access; change existing application/runtime/package/helper files or any provider/Auth setting, callback, SMTP/template, schema/RLS/permission, identity/fixture/data/Storage, DNS or Vercel setting; reuse old candidate; move unlisted aliases; inspect mailbox; activate A/B/C; implement 029N; merge/PR/push `develop`/force-push; claim broad rollout/Done.

**acceptance:** One token is privately created, exact provider facts pass, the exact token is revoked/list-absent and returns 401/403 on the same endpoint, retained pilot passes, fresh exact candidate is Ready with post-stage aliases five/five rollback, stepwise transition reaches five/five candidate, safety passes, retained trainer completes both fresh sign-ins and governed journey, final invariants pass and rollback remains exact/Ready.

**verification:** Run these exact or execution-time equivalent commands and retain sanitized results:

`git worktree list --porcelain`

`git status --short --branch`

`git rev-parse HEAD`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036D-single-use-management-access-and-live-trainer-acceptance.md --dry-run`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036D-single-use-management-access-and-live-trainer-acceptance.md`

`node scripts/test-protected-production-preflight-036C.mjs`

`node scripts/test-protected-management-lifecycle-036D.mjs`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation SelfTest`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation ManagementLifecycle`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation RetainedPilotVerify`

`git diff --name-status 76f66f5f9803e5d1f85a6dd3f71adf302b8a1810 HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json`

`git diff --name-status 9a2af97550ff90924f3c2f0286c67f03ddb20828 HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json`

`npm run test:live-trainer-035k`

`npm run test:dashboard-035`

`node --experimental-strip-types scripts/test-email-otp-035D.mjs`

`node --experimental-strip-types scripts/test-passwordless-redirect-035C.mjs`

`node --experimental-strip-types scripts/test-bootstrap-concurrency-035F.mjs`

`node --experimental-strip-types scripts/test-otp-recovery-path-035F.mjs`

`node --experimental-strip-types scripts/test-protected-synthetic-otp-recovery-035F.mjs`

`npm run test:public-relaunch-032`

`npm run validate:json`

`npm run test:domain`

`npm run test:roles`

`npm run test:supabase-self`

`npm run validate:static`

`npm run typecheck`

`npm run lint -- --max-warnings=0`

`npm run build`

`vercel.cmd --version`

`vercel.cmd deploy --help`

`vercel.cmd alias --help`

`vercel.cmd inspect --help`

`git diff --check`

`git status --short`

Implement only `scripts/protected-management-lifecycle-036D-core.mjs`, `scripts/Invoke-ProtectedManagementLifecycle036D.ps1` and `scripts/test-protected-management-lifecycle-036D.mjs`. Do not modify the inherited 036C/035K files; verify their exact hashes from requirements. The new core may import the 036C evaluator. Its sole live endpoint is GET `https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth`.

Reconcile current official token controls. Prefer a fine-grained `auth_config_read` exact-boundary token. If only a classic PAT exists, proceed only under the Pack's private operator acknowledgement and mandatory compensating controls. Create one uniquely named token only. Do not automate the account page or expose its contents. The operator enters the token privately into hidden ConsoleHost input; never request it in chat.

The lifecycle wrapper must make one exact provider-config request, pause for private exact-token revocation/list-absence confirmation, then use the same in-memory token for an invalidation request that accepts only 401/403 and reads no body. A token still active or cleanup ambiguity stops everything downstream. Clear clipboard without inspection when paste was required; clear/zero/dispose every process, environment and memory path.

Run retained-pilot Verify only after invalidation. Accept only verified 8/1/0/0 through the exact-ID 035K core. No user enumeration or repair is allowed.

After the protected gate, prove application bytes unchanged, validation green, exact Vercel project/affected set and `baseline` five/five Ready rollback. Commit/push only scoped 036D planning/evidence/tooling and prove exact direct-remote equality.

Deploy one fresh candidate with `vercel.cmd deploy --prod --skip-domain --yes` plus current help-required exact source/branch metadata. Do not reuse `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf`. Inspect immutable candidate; require exact project/Production/source/Ready. Build `post-stage` by independently resolving all five aliases; require five/five rollback.

Promote with explicit `vercel.cmd alias set <fresh-candidate-automatic-url> <alias>` in this order:

1. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`
2. `pnr-precision-performance-rankin007s-projects.vercel.app`
3. `pnr-precision-performance.vercel.app`
4. `www.precisionperformance.com.au`
5. `precisionperformance.com.au`

After every assignment reread all five. Deployment-level alias inventory is corroborating only. Any error/unexpected movement/state enters all-five rollback.

When `candidate-live` is five/five candidate, pass cache-busted public/protected/API safety before authentication. Tester privately requests and enters a current six-digit code, reaches `/portal`, completes retained synthetic dashboard/workspace/action and safe denial, signs out, then after cooldown repeats with a fresh browser/application session and fresh current code. Builder never inspects mailbox or receives protected values.

Rerun retained-pilot Verify, `final-accepted` and route safety. Do not create another Management credential. The final provider substitute is the exact pre-stage pass, same-token invalidation, zero provider-config mutation, two fresh sign-ins and final pilot proof.

Rollback assigns all five to `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app` in order: apex, `www`, project alias, team project alias, legacy team-qualified alias. Assign every row and reread all five after each. Final recovery requires five/five Ready rollback plus route safety. If credential cleanup or rollback cannot be proven, stop blocked with exact manual intervention.

Close `production-trainer-access-stable-live-accepted-clean` only when both Production sign-ins, exact credential invalidation and all final invariants pass. Reconcile mutations, tests, protected boundary, repository and remote; refresh proportional current records; intentionally commit/push only the 036D branch; stop. Do not begin Sprint 029N.
