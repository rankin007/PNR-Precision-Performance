# Sprint 036F Acceptance

Closeout: Sprint 036F closed `production-management-access-revocation-blocked` on 2026-08-04. Local wrapper and validation gates passed; the single private lifecycle exited with code `3`. The operator confirmed the exact 036F token row absent, no other token changed and no replacement token created. Same-token invalidation remains unproven, so no retained-pilot, Vercel, deployment, alias, OTP, mailbox, session or Production continuation occurred.

**Reconciliation:** 47 criteria are proven, 13 failed, and 33 were unstarted. A checked box means the complete criterion is proven. Failed criteria were required or reached but did not pass, or their complete evidence was unavailable. Unstarted criteria did not begin after the mandatory revocation/invalidation stop, including conditional release/rollback work that was never invoked.

**Git delivery:** Closeout commit `57167a7757e9a5df98560c910fd3b0f8b62fb2fb` exists locally. The attempted scoped push was rejected by the private-repository egress safeguard before any remote branch or upstream was created. Do not push until the owner explicitly approves the new branch tip reported after the separate planning-only correction commit.

## Canonical and handoff baseline

- [x] **Proven** — Current directory and Git top-level exactly equal the permanent canonical repository after Windows separator normalization.
- [x] **Proven** — Exactly one canonical worktree registration exists; no retired, temporary or alternate workspace is used.
- [x] **Proven** — Exact closed 036E SHA `6c632262438d84ef64931a1c360cc453621762ec` and direct remote authority are proven.
- [x] **Proven** — Pre-branch state contains only this Pack and `planning/STATUS.json`.
- [x] **Proven** — Pack dry-run/apply/post-dry-run reports exactly the four 036F sprint files.
- [x] **Proven** — Only `codex/036F-corrected-wrapper-live-lifecycle-retry` is used.

## Corrected wrapper activation and deterministic proof

- [x] **Proven** — Starting wrapper/core/test hashes equal `5DF552...`, `98DD491...` and `04D78E...` in full as specified by requirements.
- [x] **Proven** — Implementation scope is exactly the existing wrapper and deterministic test.
- [x] **Proven** — The wrapper is bound to the exact 036F branch and generates `precision-performance-036F-single-use-<UTC>`.
- [x] **Proven** — The 036F live path permits only `fine-grained-auth-config-read` and refuses classic-PAT continuation.
- [x] **Proven** — The core and every inherited 036C/035K implementation file remain byte-identical.
- [x] **Proven** — All six beginner orientation steps and required semantic labels remain present before input.
- [x] **Proven** — Every non-secret control remains intercepted, non-echoing and buffered-input resistant.
- [x] **Proven** — Creation instruction remains directly adjacent to the sole protected `Read-Host -AsSecureString` prompt.
- [x] **Proven** — Post-instruction cancellation remains possible-credential compensation and cannot exit clean by assumption.
- [x] **Proven** — Transcript/redirection, trusted runtime, minimal child environment, credential separation, clipboard, BSTR, disposal, request ceiling, body-blind invalidation and sanitization controls remain executable.
- [x] **Proven** — Corrected lifecycle suite passes exactly 360 assertions, or at least 360 with exact retained/replaced/new arithmetic for legitimate alignment changes.
- [x] **Proven** — Inherited Sprint 036C suite passes exactly 135 assertions.
- [x] **Proven** — Wrapper self-test passes with protected values emitted `false` and remote mutation `none`.
- [x] **Proven** — No Product/runtime/package/configuration/migration difference or runtime import is introduced.

## Exact operator and one-token authority

- [ ] **Failed** — Acting provider operator is privately confirmed as Randell Rankin or Philip Rankin. **Reason:** The durable sanitized evidence does not identify which of the two authorized operators acted; this is an evidence gap, not evidence of an unauthorized operator.
- [x] **Proven** — Correct approved-project access, current MFA/recovery and exact same-name token absence are privately confirmed without protected output.
- [x] **Proven** — Current official endpoint and fine-grained `auth_config_read` semantics are reconciled.
- [x] **Proven** — Exactly one fine-grained token restricted to `auth_config_read` and the narrowest available exact boundary is created.
- [x] **Proven** — No classic PAT, OAuth app, CLI profile, service account, database credential, project key or unrelated token mutation occurs.
- [x] **Proven** — Token name is exactly `precision-performance-036F-single-use-<UTC>` and no replacement token is created.
- [x] **Proven** — `ManagementLifecycle` is invoked live exactly once in one private interactive non-transcribed ConsoleHost.
- [ ] **Failed** — Token value enters only the protected prompt; no value or fragment reaches output, arguments, history, files, environment residue, credential store, clipboard history/sync, Git or evidence. **Reason:** The private process exposed only exit code 3, so protected-prompt receipt and every live non-persistence sub-claim were not durably proven.
- [ ] **Unstarted** — When paste is necessary, clipboard history/sync is privately off and clipboard is cleared without inspection.

## Provider pass, revocation and invalidation

- [ ] **Failed** — One fixed GET targets only `https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth`, with HTTPS GET and redirects refused. **Reason:** The private process did not expose a sanitized provider-attempt record, so actual request execution and target enforcement are not claimed.
- [ ] **Failed** — Projection proves exact Site URL, one callback/no wildcard, Resend/exact sender, one `.Token`/zero links, OTP `6/3600/60`, no Auth-user enumeration and zero configuration mutation. **Reason:** No sanitized provider projection result was retained.
- [ ] **Failed** — Acting operator immediately revokes only the exact new token and privately confirms its named row absent. **Reason:** Manual exact-row absence is proven, but immediate in-process revocation timing and confirmation are not.
- [ ] **Failed** — The same in-memory token returns `401` or `403` on the same endpoint; invalidation response body is not read. **Reason:** Required same-token 401/403 invalidation is unproven.
- [ ] **Failed** — Request count is exactly two, or three only for one documented diagnosed propagation/rate-limit retry. **Reason:** The protected process did not expose a sanitized request count.
- [ ] **Failed** — Sanitized result records `revocationVerified=true`, `protectedValuesEmitted=false` and `remoteMutation=one-management-credential-created-and-revoked`. **Reason:** The required successful sanitized lifecycle result was not produced; the only observed result was exit code 3.
- [ ] **Failed** — Management environment, memory, clipboard and temporary residue are cleared before downstream action. **Reason:** Process-environment and temporary residue are zero, but the full live memory/clipboard cleanup result was not captured.
- [x] **Proven** — No second live lifecycle, second token or replacement attempt occurs for any reason.
- [x] **Proven** — Any output/preflight failure after possible creation still follows exact compensation and stops downstream unless exact cleanup/invalidation passes.

## Retained pilot and unchanged Product

- [x] **Proven** — Retained-pilot Verify runs only after same-token invalidation.
- [ ] **Unstarted** — Verify proves `state=verified`, application `8`, Auth `1`, Storage `0`, wrong-horse rows `0` through exact-ID reads with no enumeration or mutation.
- [x] **Proven** — No email, Auth ID, row ID, credential, ledger content or provider payload is retained.
- [x] **Proven** — Accepted 035K correction remains in ancestry and Product/runtime/package bytes have zero unexplained difference from accepted 035K and closed 036E.
- [x] **Proven** — Focused 035K/dashboard/OTP/redirect/bootstrap/recovery/session/permission and Sprint 032 public controls pass.
- [x] **Proven** — JSON, domain, roles, Supabase-self, static, TypeScript, zero-warning lint and Production build pass using equivalent or stronger safe evidence where appropriate.
- [x] **Proven** — Diff, staged, secret, protected-data, unsafe-path, generated-artifact and encoding scans pass.
- [ ] **Failed** — Scoped 036F checkpoint is committed/pushed and exact local/direct-remote equality is proven before deployment. **Reason:** Local closeout commit 57167a7757e9a5df98560c910fd3b0f8b62fb2fb exists, but the private-repository safeguard blocked push; no upstream or direct-remote equality exists.

## Vercel baseline and candidate staging

- [x] **Proven** — Current Vercel CLI/help and official staged-deploy/alias semantics are recorded.
- [ ] **Unstarted** — Exact project ID, Production environment, rollback and excluded Sprint 036 candidate are freshly reconciled.
- [x] **Proven** — Planned affected set is exactly the five accepted aliases and no other Production alias.
- [ ] **Unstarted** — Deployment-level alias inventory is treated as corroborating only.
- [ ] **Unstarted** — `baseline` has five independent timestamped rows, all Ready rollback.
- [ ] **Unstarted** — One fresh candidate deploys from exact pushed 036F SHA with current help-confirmed `--prod --skip-domain` semantics.
- [ ] **Unstarted** — Candidate is exact-project, Production-targeted, exact-source, immutable and Ready.
- [ ] **Unstarted** — `post-stage` independently proves all five aliases remain on rollback.

## Authoritative five-alias transition

- [ ] **Unstarted** — Fixed promotion order uses one explicit alias assignment per step.
- [ ] **Unstarted** — Every step rereads all five aliases independently.
- [ ] **Unstarted** — Promotion steps prove candidate/rollback counts `1/4`, `2/3`, `3/2`, `4/1`, `5/0`.
- [ ] **Unstarted** — Every snapshot has five rows and no third deployment, non-Ready state, automatic movement or unlisted alias.
- [ ] **Unstarted** — `candidate-live` proves five/five Ready candidate before authentication.
- [ ] **Unstarted** — Any discrepancy triggers fixed all-five rollback before human authentication.

## Public and protected safety

- [ ] **Unstarted** — Cache-busted homepage, pricing, disclaimer/asset, disabled enquiry, health and truthful sign-in pass.
- [ ] **Unstarted** — Anonymous portal and horse routes return safely to sign-in without loop or identity leakage.
- [ ] **Unstarted** — Unsafe methods and protected/API boundaries retain expected denial.
- [x] **Proven** — DNS/public-authenticated separation remains unchanged.
- [ ] **Unstarted** — Compatible rollback remains Ready.

## First private Production journey

- [ ] **Unstarted** — Tester privately requests, receives and enters one current six-digit code on canonical Production.
- [ ] **Unstarted** — Session reaches `/portal` without loop or bootstrap collision.
- [ ] **Unstarted** — Only the retained synthetic stable/horse and accurate workflow/action appear.
- [ ] **Unstarted** — Synthetic horse workspace/action succeeds.
- [ ] **Unstarted** — Inaccessible horse is denied without identity, existence, state or count leakage.
- [ ] **Unstarted** — Sign-out removes protected access.

## Second fresh Production sign-in

- [ ] **Unstarted** — Fresh browser/application session has no first-session auth state.
- [ ] **Unstarted** — A new current code, not an old/reused code, establishes a second Production session.
- [ ] **Unstarted** — `/portal` shows the same bounded assignment and no broader visibility.
- [ ] **Unstarted** — Tester confirms usability without sharing protected details.
- [x] **Proven** — No protected mailbox/code/session value enters conversation, commands, URLs, logs, screenshots, Git or durable evidence.

## Final invariants and closeout

- [ ] **Unstarted** — Final retained-pilot Verify passes `8/1/0/0` without mutation.
- [ ] **Failed** — Final provider substitute consists of the earlier exact pass, same-token invalidation, zero provider-config mutation, two fresh sign-ins and final pilot proof. **Reason:** Provider pass/invalidation, both Production sign-ins and final pilot proof did not complete.
- [ ] **Unstarted** — `final-accepted` proves five/five Ready candidate after both sign-ins.
- [ ] **Failed** — Exactly one Management token was created; that same token is revoked/invalid; no other token changed. **Reason:** Exactly one token, exact-row absence and no other token change are proven; same-token invalidity is not.
- [x] **Proven** — No Auth/provider config, callback, SMTP, template, schema, RLS, role, permission, identity, fixture, data, Storage, DNS or unrelated Product mutation occurs.
- [x] **Proven** — Participants A/B/C, unrelated identities and real data remain untouched.
- [x] **Proven** — Review and current state/status/roadmap/lifecycle/schedule/evidence/operations/briefing agree.
- [ ] **Failed** — Canonical worktree is clean and exact closeout commit equals scoped direct remote branch. **Reason:** The local worktree was clean at the closeout commit, but exact direct-remote equality is absent because push was blocked.
- [x] **Proven** — Sprint 029N remains unstarted unless this sprint passes live trainer access or a later separate owner decision changes the road.
- [x] **Proven** — No merge, PR, `develop` push, force-push, broad rollout or product-wide Done declaration occurs.

## Failure and rollback

- [x] **Proven** — A material failure receives one focused sanitized diagnosis and no blind retry.
- [x] **Proven** — Token cleanup completes before any clean exit after creation.
- [ ] **Unstarted** — Staging drift, transition discrepancy, route failure, material auth failure or scope expansion triggers exact all-five rollback.
- [ ] **Unstarted** — Rollback assigns all five to the immutable rollback URL in fixed order and rereads all five after every assignment.
- [ ] **Unstarted** — `final-rollback`, when required, proves five/five Ready rollback and final route safety.
- [x] **Proven** — No known-broken candidate, third deployment or partial mapping remains live.
- [x] **Proven** — If token cleanup or alias rollback cannot be proven, exact step-by-step manual intervention is recorded and state is blocked, not clean.

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
