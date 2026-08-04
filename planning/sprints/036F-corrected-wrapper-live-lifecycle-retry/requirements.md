# Sprint 036F - Corrected-Wrapper Live Lifecycle Retry

## Outcome

Complete exactly one strict end-to-end live retry of the protected Production trainer-access lifecycle using the beginner-safe wrapper proven by Sprint 036E.

The retry begins with one privately created, fine-grained Supabase Management token restricted to `auth_config_read`; uses it for the one fixed identity-blind Auth-config read; immediately revokes that exact token and proves the same in-memory token returns `401` or `403`; and continues only after retained-pilot, unchanged-application, Vercel and five-alias gates pass. The successful path stages one fresh candidate, performs the fixed five-alias transition, proves route safety, and completes two fresh private Production trainer sign-ins plus final retained-pilot and routing proof.

Target outcome: `production-trainer-access-stable-live-accepted-clean`.

Sprint 036F is the live continuation of the closed 036D/036E chain under the suffix rule. Sprint 036D remains historically `production-management-access-revocation-blocked`; Sprint 036E corrected the interaction locally but performed no live action. Sprint 036F does not rewrite either result. Sprint 029N remains behind the live trainer-access gate and is not part of this sprint.

## Workflow profile

Use `strict`. This sprint touches a high-privilege provider credential, private operator input, a service-role credential used by the exact-ID retained-pilot verifier, live Production deployment and aliases, a retained human trainer identity, mailbox-controlled OTP entry, live sessions and rollback.

Strict controls attach to the single credential lifecycle, corrected interaction, exact target, protected output, request ceiling, invalidation, retained-pilot verification, immutable candidate identity, per-alias routing, human authentication, cleanup and rollback. They do not authorize Product behavior changes, Supabase Auth/provider configuration, schema, RLS, roles, permissions, identities, fixtures, data, Storage, DNS or Vercel project-setting changes.

## Canonical starting authority

Start only from:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

Before any action, resolve the current directory and `git rev-parse --show-toplevel`; both must equal that path after normalizing Windows separators. Expected closed Sprint 036E authority is SHA `6c632262438d84ef64931a1c360cc453621762ec` on `codex/036E-beginner-safe-protected-interaction-correction`, with exactly one canonical worktree registration.

The only expected Architect handoff changes are this Pack and `planning/STATUS.json`. Any additional uncommitted path, changed starting SHA, unresolved direct-remote authority or extra worktree is a material baseline mismatch until reconciled.

Create only `codex/036F-corrected-wrapper-live-lifecycle-retry` in the permanent canonical repository. Do not use a retired legacy path, `C:\tmp` worktree, deployment directory, alternate history or Sprint 035Q.

## Source authority

Use, in descending order:

1. `AGENTS.md`, including the canonical-workspace guard, Evidence-Proportional Execution Standard and Manual Intervention Rule.
2. This Sprint 036F Pack after Builder applies it and verifies exactly four generated files.
3. Closed Sprint 036E review, acceptance, briefing and corrected implementation at SHA `6c632262438d84ef64931a1c360cc453621762ec`.
4. Closed Sprint 036D lifecycle/release contract and review, without inheriting its superseded prompt ordering or classic-PAT fallback.
5. Closed Sprint 036C, 036B, 036 and 035K requirements, acceptance and reviews.
6. `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`, `docs/OPERATIONS_HANDOFF.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/EVIDENCE_INDEX.md`, `docs/WORKFLOW_PROFILE.md` and `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`.
7. Current official Supabase Management API documentation for `GET /v1/projects/{ref}/config/auth`, fine-grained `auth_config_read`, authentication and response codes.
8. Current official Vercel CLI documentation and installed help for staged Production deploy, inspect, alias assignment and rollback mechanisms.

Official documentation is execution-time mechanism authority, not permission to broaden scope. Fresh execution-time evidence governs every live fact. Historical evidence supplies baselines only.

## Task contract

**objective:** Establish stable, repeatable live Production trainer access through exactly one beginner-safe create/use/revoke/invalidate Management lifecycle and the downstream retained-pilot, release, rollback-readiness and two-sign-in acceptance chain.

**owns:** Canonical and direct-remote reconciliation; the existing corrected wrapper and deterministic test only for 036F branch/token-stem/fine-grained-live alignment and in-scope contract-preserving corrections; one private fine-grained `auth_config_read` token; one successful fixed Auth-config GET; exact-token revocation and same-token invalidation; exact-ID retained-pilot verification; unchanged Product proof; exact Vercel project/deployment/domain/alias evidence; one fresh `--prod --skip-domain` candidate; a timestamped five-alias routing ledger; exactly five candidate alias assignments; cache-busted public/protected smoke; two fresh private human Production sign-ins; exact all-five rollback when required; proportional operations/planning/closeout records; and scoped 036F branch commit/push.

**must_not:** Run more than one live `ManagementLifecycle`; create a replacement or second Management token; use a classic PAT, OAuth app, CLI profile, service account, database credential, anon key or service-role key as Management access; automate, scrape, transcribe, screenshot or expose a Supabase account/token or Authentication-user surface; enumerate identities; emit raw provider output; alter unrelated tokens; persist a credential in arguments, history, transcript, file, environment after child exit, clipboard history/sync, credential store, Git or evidence; call any Management endpoint except the fixed Auth-config GET; modify provider/Auth configuration; reuse or promote the Sprint 036 candidate; trust deployment-level alias inventory over independent per-alias routing; move an unlisted alias; change Product/runtime/package/configuration/migration/schema/RLS/role/permission/callback/SMTP/template/identity/fixture/data/Storage/DNS/Vercel settings; inspect or automate a mailbox; activate Participants A/B/C; implement Sprint 029N; merge, open a PR, push `develop`, force-push, rewrite history or claim broad rollout/product-wide Done.

**acceptance:** The corrected wrapper and all 495 counted deterministic assertions pass after exact 036F live binding; one fine-grained credential is privately created by an authorized named joint administrator, the fixed provider projection passes, the exact credential is revoked/list-absent and the same in-memory value returns `401` or `403`; protected state is cleared; retained-pilot Verify passes; Product bytes and validation remain accepted; one fresh exact remote-backed candidate is Ready while all five aliases remain on rollback after staging; the fixed stepwise transaction reaches five/five candidate; route safety passes; the retained trainer completes two fresh private Production code sign-ins and the governed dashboard/workspace/action/denial/sign-out journey; final pilot and routing invariants pass; and the exact rollback remains Ready and executable.

**verification:** Run Pack dry-run/four-target proof; canonical path/worktree/status/SHA/direct-remote checks; exact corrected wrapper/core/test hashes; corrected 360-assertion and inherited 135-assertion proof; wrapper self-test; one protected Management lifecycle invocation in a private non-transcribed ConsoleHost; exact-ID retained-pilot Verify; exact Product-byte comparison; retained focused authentication/dashboard/permission suites; canonical validation, TypeScript, zero-warning lint and Production build; current Vercel CLI/help and official-mechanism reconciliation; exact project/domain/alias inventory; five independent alias inspections at every routing checkpoint; rollback/candidate Ready/source proof; cache-busted public/protected/API/unsafe-method smoke; two fresh private human sign-ins; final retained-pilot proof; diff/secret/private-data/generated-artifact scans; final worktree/direct-remote proof; and one exact permitted outcome.

## Preserved closed truth and exact implementation authority

- Sprint 036D remains `production-management-access-revocation-blocked`; manual revocation and row absence did not prove same-token invalidation.
- Sprint 036E remains `beginner-safe-protected-interaction-corrected-clean`; it made zero provider/release/Production action.
- Current corrected wrapper SHA-256: `5DF552844AF0AAEDF9FFFDDBD0E63EE539238CA5D65BE4486CBB21F12042BB4D`.
- Current unchanged core SHA-256: `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1`.
- Current corrected test SHA-256: `04D78E23AB3DFC897C8084CD3CE25228AB4A9E400618AF1EEF07B8187006C27F`.
- The corrected suite passed exactly `292 retained + 3 one-for-one replacements + 65 new = 360`; inherited Sprint 036C passed `135`; counted total was `495`, with zero failures.
- Product/runtime/package bytes remain unchanged from the accepted Sprint 035K behavior and validated 036D/036E state.
- Production remains on the historically proven Ready rollback according to the last authoritative five-alias proof.

Builder may modify only `scripts/Invoke-ProtectedManagementLifecycle036D.ps1` and `scripts/test-protected-management-lifecycle-036D.mjs` before live execution. The permitted initial changes are limited to:

1. changing the exact branch binding from 036E to 036F;
2. changing the live token-name stem and deterministic expectations from `precision-performance-036D-single-use-<UTC>` to `precision-performance-036F-single-use-<UTC>`;
3. making the 036F live path accept only `fine-grained-auth-config-read` and refuse classic-PAT continuation; and
4. correcting an in-scope wrapper/test/harness defect discovered by deterministic or live-safe preflight when the correction preserves the approved interaction, endpoint, request, output, cleanup and scope contract.

The core and every 036C/035K implementation file must remain byte-identical. No live action begins until the updated suite still passes exactly 360 corrected assertions, the inherited suite passes 135, wrapper self-test passes, the six-step orientation and protected-input adjacency remain exact, and the core hash remains unchanged. If legitimate branch/token-class alignment changes assertion arithmetic, report exact retained/replaced/new arithmetic and require at least 360 counted corrected assertions plus all 135 inherited assertions.

## Exact operator, credential class and execution window

Only Randell Rankin or Philip Rankin, the recorded joint project administrators and rollback owners, may perform the private provider-account action. The acting operator privately confirms correct access to approved project `uvskssaecdhxcgytkasc`, current MFA/recovery readiness, and absence of the exact generated 036F token name. No account, organization, user, token-list or project-administration detail enters output or evidence.

The only permitted Management credential class is a provider-supported fine-grained token restricted to `auth_config_read` and the narrowest available exact project/organization boundary. No write permission is permitted. If that class or boundary is unavailable, ambiguous or cannot be established without protected output, create nothing and close `production-management-access-type-refused-clean`. Do not fall back to a classic PAT.

The live lifecycle runs once, in one continuous private, interactive, non-transcribed ConsoleHost session after deterministic, canonical, official-mechanism and operator-readiness preflight pass. The session ends only after the exact token is either proven revoked/invalid or the sprint is blocked with exact private cleanup instructions. Do not pause for unrelated work while the credential may exist.

Create exactly one token named `precision-performance-036F-single-use-<UTC>`. Direct hidden entry is preferred. If paste is necessary, the operator privately confirms clipboard history and cross-device sync are off; paste occurs only at `PROTECTED CREDENTIAL ENTRY`; the wrapper clears the clipboard without reading it immediately; and evidence records only `clipboardCleared=true`.

No replacement token and no second live wrapper invocation are permitted after creation is invited, including after wrong input, cancellation, provider mismatch, output failure or cleanup ambiguity. One same-token invalidation retry is allowed only for diagnosed revocation propagation or rate-limit evidence and remains inside the single lifecycle request ceiling of three.

## Corrected protected interaction contract

The live 036F flow must preserve the proven 036E contract:

1. all six `BEGINNER-SAFE PROTECTED FLOW` orientation steps appear before input;
2. `DO NOT CREATE A CREDENTIAL YET` remains in force through all ordinary decisions;
3. every ordinary decision is a non-echoing `NON-SECRET CONTROL - NEVER TYPE OR PASTE A CREDENTIAL HERE` single-key control;
4. unexpected pre/post buffered input is non-echoingly drained and fails sanitized before creation;
5. every account, token-class, scope, input-method, clipboard and readiness decision finishes before token creation;
6. the exact token-name stem plus `CREATE THE CREDENTIAL NOW` leads directly to `PROTECTED CREDENTIAL ENTRY - THIS IS THE ONLY CREDENTIAL PROMPT` and `Read-Host -AsSecureString` with no intervening acknowledgement; and
7. cancellation or ambiguity after the creation instruction enters possible-credential compensation and can never become a clean no-creation result by assumption.

Preserve transcript/redirection refusal, trusted absolute Node/SystemRoot validation, deterministic-injection refusal outside SelfTest, exact minimal child environments, Management/service-role separation, clipboard clearing without inspection, same-token reuse, body-blind invalidation, request ceiling, BSTR zeroing, `SecureString` disposal, process cleanup and fixed sanitized output.

## Single live Management lifecycle

The corrected wrapper performs this exact monotonic chain once:

1. beginner orientation and all non-secret readiness controls;
2. private creation and hidden entry of the one fine-grained 036F token;
3. one fixed HTTPS `GET https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth`, redirects refused;
4. exact 036C allowlisted projection: Production Site URL, one exact callback/no wildcard, Resend/exact sender, one `.Token`/zero links, OTP length `6`, expiry `3600`, cooldown `60`, no Auth-user enumeration and no configuration mutation;
5. immediate private exact-token revocation and exact named-row absence confirmation through the non-secret control;
6. same in-memory token invalidation GET on the same endpoint, response body unread, accepting only `401` or `403`;
7. protected environment/memory/clipboard/process cleanup; and
8. sanitized result `remoteMutation=one-management-credential-created-and-revoked`, `revocationVerified=true`, `protectedValuesEmitted=false`.

A `200`, redirect, unexpected status, transport ambiguity, token still listed, inability to prove exact-token identity, output exposure or cleanup ambiguity stops every retained-pilot/Vercel/Production action. The state is blocked whenever invalidation or required cleanup cannot be proven. Private list absence alone is not a substitute.

The sanitized lifecycle record contains only harness/version, UTC timestamps, token-name stem, token class, exact-target boolean, provider projection booleans/counts, credential-created/revoked/list-absent booleans, revocation response class, request count `2` or justified `3`, Auth-users-enumerated `false`, protected-values-emitted `false` and the fixed remote-mutation class. Never retain a token value or fragment, token ID, account identity, organization inventory, raw status body/error, token-list contents or screenshot.

## Retained-pilot and unchanged-Product gate

Only after same-token invalidation passes, run the unchanged exact-ID `scripts/live-trainer-access-035K-core.mjs --verify` through `RetainedPilotVerify`. Require approved Supabase project, prohibited-old-project refusal, child-only service role, private exact tester email/Auth ID, ledger-bound `getUserById`, no user enumeration, exact read-by-ID comparison and no mutation.

The only accepted sanitized result is `state=verified`, application `8`, Auth `1`, Storage `0`, wrong-horse rows `0`. A ledger, identity or row mismatch stops before Vercel. Do not repair, recreate or clean the retained pilot in Sprint 036F.

Prove no unexplained Product/source difference from accepted Sprint 035K and no difference from closed Sprint 036E across approved runtime paths. Prove no runtime module imports the protected operations files. Run the maintained focused and canonical validation set. Commit and push only scoped 036F planning/evidence/tooling and prove exact local/direct-remote equality before deployment.

## Governing release state and pre-stage gate

Fresh execution-time readback governs, with these baselines to reconcile:

- Vercel project `rankin007s-projects/pnr-precision-performance`, project ID `prj_6To7czLpCEGL6fInkQwE4egePPpq`;
- Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, immutable URL `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app`, recorded source `3be6b6c3622150a3c2009ed8564795b14e3e6c2b`;
- unaccepted Sprint 036 candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf`, which must not be reused or promoted;
- approved Supabase project `uvskssaecdhxcgytkasc`; prohibited old project `tagnbgkroihagjmvehlx` must not be contacted;
- Production Site URL `https://precisionperformance.com.au` and callback `https://precisionperformance.com.au/auth/callback`, no wildcard;
- approved Resend sender `no-reply@precisionperformance.com.au`; and
- retained adopted Sprint 035K trainer identity plus exact bounded eight-record synthetic graph, with no real customer, horse, stable, clinical or Storage data.

The five and only stable aliases are:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Before staging: Pack/canonical/direct-remote proof, 495 counted assertions, wrapper self-test, the one clean credential lifecycle, retained-pilot Verify, unchanged Product/validation, current Vercel mechanism/project/domain/alias inventory, Ready rollback and a five-row `baseline` must all pass. Historical evidence cannot replace the live credential, pilot or routing checks.

## Candidate staging and authoritative alias transaction

Deploy exactly one fresh Production-target candidate from the exact pushed 036F SHA using current help-confirmed `vercel.cmd deploy --prod --skip-domain --yes` semantics and exact source/branch metadata. Require exact project, Production classification, immutable automatic URL, exact source and Ready. Then build `post-stage` from five independent alias resolutions and require all five still route to rollback.

Per-alias independent deployment resolution is routing authority. Deployment alias inventory, alias list, project status, audit log and public HTTP are corroborating only.

Promotion order is fixed:

1. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`
2. `pnr-precision-performance-rankin007s-projects.vercel.app`
3. `pnr-precision-performance.vercel.app`
4. `www.precisionperformance.com.au`
5. `precisionperformance.com.au`

Use one explicit `vercel.cmd alias set <fresh-candidate-automatic-url> <exact-alias>` per step. After every assignment reread all five aliases. Required candidate/rollback counts are `1/4`, `2/3`, `3/2`, `4/1`, `5/0`. Any error, automatic movement, third deployment, non-Ready state, unlisted alias or contradiction triggers immediate all-five rollback before authentication.

Rollback order is fixed:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Assign every alias to `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app`, even when an earlier read appears safe, and reread all five after every step. Final recovery requires five/five Ready rollback plus route safety. If it cannot be proven, stop `production-promotion-partial-mutation-blocked` with exact manual intervention.

## Human Production acceptance

Only after `candidate-live` proves five/five candidate and cache-busted public/protected safety passes:

1. the retained tester privately opens canonical Production sign-in;
2. privately requests, receives and enters one current six-digit code;
3. reaches `/portal` without loop or bootstrap collision;
4. sees only the retained synthetic stable/horse and accurate workflow/action;
5. opens the synthetic horse workspace and reaches or completes the existing permitted action;
6. proves inaccessible-horse denial without identity, existence, state or count leakage;
7. signs out and proves protected access is gone; and
8. after cooldown, uses a fresh browser/application session and a fresh current code to reach `/portal` again with the same bounded assignment.

The tester controls mailbox and code entry privately. Builder must not inspect, automate or scrape the mailbox; receive an email/code/session/private identifier; or retain protected values in conversation, commands, URLs, logs, screenshots, Git or evidence.

One sanitized diagnosis and one cooldown-safe non-blind retry are permitted for human input, expiry, cooldown or transient transport only when no source/provider/configuration change is required. A material authentication, session, permission, privacy or integrity failure triggers all-five rollback.

After both sign-ins, rerun retained-pilot Verify, route safety and `final-accepted`. Do not create another Management credential. The accepted final provider substitute is the exact earlier provider pass, same-token invalidation, zero provider-config mutation, two fresh sign-ins and final pilot proof.

## Design, privacy and claims boundary

This sprint touches private operations and Production release only. It crosses no new Product-design, public-content, clinical-claims, pricing, CMS, upload, voice, schema or permission architecture gate.

Preserve truthful sign-in language, public/authenticated separation, mobile/desktop accessibility, no confidential-data display, identity-free denial and professional non-medical messaging. Status evidence uses text/classification, never color alone. No real horse, stable, trainer, mailbox, customer or clinical record may enter evidence.

## Approved files and external actions

Builder may change only:

- the four generated Sprint 036F files;
- `scripts/Invoke-ProtectedManagementLifecycle036D.ps1`;
- `scripts/test-protected-management-lifecycle-036D.mjs`;
- `planning/reviews/036F-corrected-wrapper-live-lifecycle-retry.md`;
- proportional current updates to `planning/STATE.md`, `planning/STATUS.json`, `planning/ROADMAP.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/DECISIONS.md`, `planning/RISKS.md` and `planning/QUESTIONS.md` only where final authority changes; and
- `docs/OPERATIONS_HANDOFF.md` and `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md` only for proven 036F lifecycle/release/rollback procedure changes.

Approved external actions are limited to sanitized Git/GitHub/Vercel/Supabase documentation and state checks; private creation/revocation of one fine-grained 036F token; two fixed Management GETs plus at most one justified same-token invalidation retry; private exact-token list-absence confirmation; retained-pilot exact-ID Verify before staging and after acceptance; one fresh exact-source staged Production deployment with `--skip-domain`; exactly five candidate alias assignments; cache-busted public/protected smoke; bounded private human OTP requests/verifications; exact all-five rollback; and intentional commit/push of only the scoped 036F branch.

No core, inherited helper/test, Product, package, lockfile, runtime configuration, migration, provider/Auth setting, schema, RLS, role, permission, identity, fixture, application data, Storage, DNS or unrelated provider resource may change.

## Evidence-proportional execution and manual intervention

Stop only for a material canonical/remote mismatch, wrong/unbounded target, token-class ambiguity, credential-lifecycle ambiguity, protected-output failure, provider/pilot mismatch, alias-routing contradiction, secret exposure, authentication/privacy/integrity failure, unauthorized source/provider/schema/contract expansion, partial Production mutation, failed credential cleanup, failed rollback, unexpected real data, destructive uncertainty or cleanup that cannot be proven safe.

Use equivalent or stronger safe proof when an optional supporting tool is unavailable. Keep in-scope wrapper, branch/token-stem alignment, deterministic harness, credential-injection, lifecycle-state, projection, field-name, timestamp, JSON parsing, reporting, formatting, encoding and validator corrections inside 036F when they preserve the contract. Do not create a follow-up solely because browser automation, renderer, clipboard control, audit log, schema dump, optional CLI path or redundant verifier is unavailable.

Expected protected human actions are the provider operator's private token creation/revocation and the retained tester's private sign-ins. Builder owns fixed commands and sanitized verification; humans never disclose protected values.

If manual intervention remains necessary after safe alternatives are exhausted, record:

- what is blocked or not working;
- evidence already checked;
- the exact secret-free human action needed;
- step-by-step private instructions;
- the fixed booleans/classifications the human may report and every protected value they must not report; and
- what Builder will verify afterward.

For token cleanup, instructions must name only the exact generated token, require its private revocation and row-absence confirmation, forbid another token and downstream continuation, and state that Builder will run only the same-token body-blind invalidation proof. Never ask for a token, email, OTP, raw response, screenshot, account detail or private identifier in conversation.
