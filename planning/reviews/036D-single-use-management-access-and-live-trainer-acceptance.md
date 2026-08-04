# Sprint 036D Single-Use Management Access And Live Trainer Acceptance Review

Date: 2026-08-04

Checkpoint: `production-management-access-revocation-blocked`

## Executive result

The exact Sprint 036D implementation and deterministic corrections remain green, but the live protected gate failed. The operator created exactly one named token, then entered its value into the wrapper's ordinary preflight-confirmation field instead of the later hidden SecureString prompt. The value appeared visibly; the wrapper rejected the acknowledgement with `OPERATOR_PREFLIGHT_REQUIRED` before protected input, helper execution or any Management API request.

The console was terminated, the authorized local diagnostic image was deleted, and the operator privately revoked the exact token and confirmed its row absent. Because the wrapper never retained that token, the required same-token 401/403 invalidation proof cannot be performed or claimed. The exact permitted checkpoint is `production-management-access-revocation-blocked`. No retained-pilot, Vercel, deployment, alias or Production work began.

## Canonical and handoff authority

- Current directory and Git top-level resolve exactly to `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.
- Exactly one canonical worktree registration is present.
- The branch is `codex/036D-single-use-management-access-and-live-trainer-acceptance` at starting authority `9a2af97550ff90924f3c2f0286c67f03ddb20828`.
- Direct connected GitHub comparison proved the starting SHA identical to the approved 036C remote branch, with zero commits ahead or behind.
- Pack dry-run, apply and post-apply dry-run reconciled exactly the four generated Sprint 036D files.
- No commit, push, pull request, merge, stage operation or Production release was requested or performed at this checkpoint.

## Exact implementation scope

- `scripts/protected-management-lifecycle-036D-core.mjs` implements the monotonic lifecycle state machine, fixed provider request, allowlisted projection, body-blind invalidation proof, bounded request policy and sanitized failure reporting.
- `scripts/Invoke-ProtectedManagementLifecycle036D.ps1` exposes only `SelfTest`, `ManagementLifecycle` and `RetainedPilotVerify`; it enforces canonical branch/hash authority, reads the actual internal ConsoleHost UI `IsTranscribing` state, keeps deterministic injection exclusive to `SelfTest`, routes every post-creation path through compensation before protected-memory disposal, and hard-binds protected children to exact `C:\Program Files\nodejs\node.exe` with a cleared allowlisted environment.
- `scripts/test-protected-management-lifecycle-036D.mjs` proves the request, lifecycle, sanitization, no-automation, one-token, retry, cleanup and inherited-authority contracts. Its corrections add real local PowerShell execution, synthetic fault injection and an executable `NODE_OPTIONS=--require` preload canary against both protected child classes without a live transport.
- Both accepted corrections changed only the wrapper and its test. The 036D core remained unchanged at SHA-256 `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1`.
- No existing helper, test, package, lockfile, runtime module, migration or application file changed.

## Credential and request safety

- The only provider target is `GET https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth`, with redirects refused.
- The default lifecycle ceiling is two requests: one provider proof and one post-revocation invalidation proof. A third request requires the wrapper's exact non-blind retry justification.
- Only 401 or 403 proves invalidation. The invalidation path never reads a response body. A 200 response reports the token still active and refuses continuation; redirect, 400, 404, 429, 500 and transport/timeout outcomes are sanitized failures.
- Token creation and exact-token revocation are presented only as fixed private human instructions. The wrapper contains no account-token API, browser launch, token-page navigation, token creation command or token revocation command.
- The same hidden in-memory Management value is reused only for the provider and invalidation child calls, with child-only environment materialization and memory/environment cleanup. The service-role value belongs to a separate operation and cannot overlap.
- Before protected input, the wrapper validates that the absolute Node executable both exists at and is the currently resolved application `C:\Program Files\nodejs\node.exe`; missing, relative, shadowed or different resolution fails sanitized. It independently derives the genuine Windows directory from OS APIs and refuses an unprovable `SystemRoot`.
- Every credential-bearing `ProcessStartInfo` environment is cleared and exact-key validated before SecureString-to-BSTR conversion. The only inherited Windows entry is `SystemRoot`, executably proven necessary; Management children receive only their exact `PP036D_*` safe set plus `PP036D_MANAGEMENT_API_TOKEN`, while retained-pilot children receive only `PP035K_SUPABASE_URL`, `PP035K_RUN` and `PP035K_SERVICE_ROLE_KEY`.
- Parent `NODE_OPTIONS`, `NODE_PATH`, certificate/TLS, proxy, debug, loader, coverage and arbitrary canaries cannot enter either protected child. Executable offline helpers passed with exact environment-key equality; the preload did not execute, the two synthetic credential classes never overlapped, no synthetic value appeared in output or files, parent environment values were restored and all fixtures were removed.
- The production guard only inspects the actual internal ConsoleHost UI transcription state; it never starts or stops transcription. Missing host UI/type/property/getter/state proof fails closed before token instructions or protected work.
- Once credential creation is confirmed, clipboard, input, helper-start and other failures cannot skip the revoke/list-absence compensation phase. A clean result additionally requires accepted same-token invalidation; every incomplete path emits a fixed sanitized five-step manual intervention and forbids downstream continuation.
- `SelfTest` scenarios cannot be selected under `ManagementLifecycle` or `RetainedPilotVerify`; executable subprocess proof returns `SELF_TEST_SCENARIO_REFUSED` for both protected modes.
- Deterministic output is restricted to the approved keys and fixed codes. The live operator-input incident crossed the protected-output boundary before the hidden prompt, so no clean live result is claimed.

## Deterministic validation

- Sprint 036C inherited provider suite: 135 assertions passed.
- Sprint 036D lifecycle suite: 295 assertions passed: the retained 255 plus exactly 40 new executable protected-child environment-isolation assertions.
- Sprint 035K live-trainer suite: 89 assertions passed.
- Sprint 032 public controls: 12/12 passed.
- Counted deterministic total: 531 passing assertions, 0 failing (`295 + 135 + 89 + 12`).
- Sprint 036D core self-test passed 5 checks; wrapper state self-test passed 2 checks with `protectedValuesEmitted=false` and `remoteMutation=none`.
- Dashboard, email OTP, redirect-origin, bootstrap concurrency, OTP recovery and protected synthetic recovery suites passed.
- JSON self-test passed 8 cases and all 7 maintained JSON files parsed.
- Roles, Supabase-self, static validation, TypeScript and zero-warning ESLint passed.
- Next.js 15.3.8 Production build passed and generated all 29 static pages.
- The aggregate domain runner reached the accepted optional Sprint 031B `playwright-core` availability boundary. Unchanged runtime bytes plus direct Sprint 031C controls supplied the Pack-approved equivalent proof without dependency or product changes.

## Scope and integrity proof

- The inherited 036C core, test and wrapper and the 035K core matched all four approved SHA-256 values; the unchanged 036D core retained its prior exact hash.
- Runtime differences from accepted Sprint 035K and closed Sprint 036C authority were empty.
- No runtime module imports Sprint 036C or 036D operations tooling.
- Exact ten-path repository scope, whitespace, UTF-8/no-BOM/final-line, high-confidence secret and protected-data scans passed for the unstaged implementation. The exposed live value was not written to Git; the console process and local diagnostic image were removed and temporary residue is zero.
- `git diff --check` passed. Staged file count is zero because no staging action was authorized.
- The original deterministic checkpoint used two test-harness expectation fixes and one read-only scope-validator interpolation fix. The accepted transcription/compensation correction additionally required one JavaScript identifier-only harness rename and one Windows PowerShell transcribed-exit expectation correction. The environment-isolation correction required one diagnostic missing-observation guard and one PowerShell expected-key array-flattening fix before the 295-assertion rerun passed; none changed product behavior or external state.

## Protected and external boundary

- One live `ManagementLifecycle` attempt ran in a private non-transcribed ConsoleHost. The operator created one exact named token but supplied its value to the plain preflight acknowledgement; the wrapper stopped `state=failed-sanitized`, `code=OPERATOR_PREFLIGHT_REQUIRED`, exit `2`, before token-creation instruction state, hidden input, helper execution or requests.
- `RetainedPilotVerify` was not invoked.
- The exposed value is not reproduced or retained in repository evidence. The private console was closed and the local diagnostic image deleted immediately after the incident was identified.
- The operator manually revoked the exact created token and confirmed its row absent. Same-token invalidation remains unproven because the wrapper never received or retained the token.
- The provider account-token page was used only for the private human create/revoke actions. No provider API request was sent and no token-list content was retained.
- No service-role credential was requested or supplied; no Auth-user list, mailbox, OTP or authenticated session was accessed.
- No Vercel CLI/action, candidate deployment, alias mutation, rollback, DNS change or Production journey occurred.
- External mutation was limited to creation and manual revocation of that one token. No other token or provider resource was changed.

## Current disposition

Sprint 036D is stopped `production-management-access-revocation-blocked`. Manual exact-token revocation/list absence reduced the immediate provider risk, but the required same-token 401/403 invalidation proof is absent and the protected-output boundary failed. Retained-pilot, Vercel, candidate, alias, human sign-in and final closeout gates remain unstarted. No retry or replacement token is permitted inside this attempt.

## Plan correction and next recommendation

The approved plan placed an ordinary non-secret `Read-Host` acknowledgement before the later hidden SecureString prompt. A first-time operator interpreted that acknowledgement as a request for the credential. The fixed literal was machine-safe but not beginner-safe; prompt order and explanation were therefore a material human-factors defect in the plan, not a reason to weaken transcript, hidden-input, compensation, environment-isolation, sanitization or request-ceiling controls.

Architect should consider a narrow Sprint 036E that defines step-by-step beginner guidance before credential creation, makes non-secret acknowledgement prompts unmistakable and isolates credential entry at the exact hidden-input moment. This is a recommendation only: no 036E Pack was created, no implementation was authorized and no live retry authority follows.

## Sprint closeout and Git integrity

- The closeout manifest is exactly 18 approved 036D paths: the Pack, four sprint files, three implementation files, review, STATUS and eight proportional current-authority records.
- All three implementation files remained byte-for-byte unchanged during closeout. Their frozen SHA-256 values are wrapper `29BEB27F5652985E92F02830196A3F8E2AC7FCDDBB7DDB7245DE559183726028`, core `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1` and test `2B2C72475B50D9C2AADB9504851230C987660075A52075DCBC6F5C257FB6F3F6`.
- Final scope, high-confidence secret/protected-data, temporary-residue, whitespace, JSON/static and Git-integrity checks passed. The exposed credential was not found in repository content or retained temporary artifacts.
- Only `codex/036D-single-use-management-access-and-live-trainer-acceptance` was staged, committed and pushed. No merge, pull request, `develop` push or force-push occurred.
- The exact closeout commit equals the direct remote branch after push; its SHA is reported in the Builder closing handoff.
- `planning/STATUS.json` is `sprint-closed` with exact status `production-management-access-revocation-blocked`. Sprint 029N remains unstarted.
