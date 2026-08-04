============================================================
FILE: planning/sprints/036F-corrected-wrapper-live-lifecycle-retry/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/036F-corrected-wrapper-live-lifecycle-retry/blueprint.md
============================================================

# Sprint 036F Blueprint

## Delivery sequence

1. Prove canonical root, one worktree, exact closed 036E SHA, clean two-file Architect handoff and direct remote authority.
2. Dry-run/apply the Pack and prove exactly four generated 036F files.
3. Create only `codex/036F-corrected-wrapper-live-lifecycle-retry`.
4. Read all generated files and complete closed 036D/036E evidence before changing the wrapper or test.
5. Hash-bind the corrected wrapper/core/test and inherited 036C/035K files.
6. Reconcile current official Supabase endpoint/fine-grained permission and Vercel staged-deploy/alias semantics.
7. Change only the wrapper/test branch binding, 036F token stem, fine-grained-live restriction and required deterministic expectations.
8. Run exactly 360 corrected plus 135 inherited assertions, wrapper self-test, protected-interaction invariants, static/JSON/scope/hash/runtime checks and zero-external-action proof.
9. Confirm one of the two recorded joint administrators, exact-project access, MFA/recovery readiness, fine-grained `auth_config_read` availability and no exact same-name 036F token.
10. Start one private non-transcribed ConsoleHost and run `ManagementLifecycle` exactly once.
11. Complete the six-step orientation and every non-secret control before creating anything.
12. Privately create and enter exactly one fine-grained 036F token at the one protected prompt.
13. Require the exact fixed Auth-config projection pass.
14. Immediately revoke the exact token, confirm its named row absent and require same-token `401`/`403` invalidation; clear protected state.
15. Only after invalidation, run retained-pilot exact-ID Verify and require `8/1/0/0`.
16. Prove Product bytes unchanged, run maintained validation, reconcile the exact Vercel project/rollback/five aliases and capture `baseline` five/five rollback.
17. Commit/push only scoped 036F planning/evidence/tooling and prove local/direct-remote equality.
18. Stage one fresh exact-source `--prod --skip-domain` candidate; require exact/Ready and `post-stage` five/five rollback.
19. Assign the five aliases one at a time in fixed order, rereading all five after each, and require `candidate-live` five/five candidate.
20. Pass cache-busted public/protected/API safety.
21. Complete the first private Production sign-in, governed journey, denial and sign-out.
22. After cooldown, complete a second fresh-session/fresh-code Production sign-in.
23. Rerun retained-pilot Verify, route safety and `final-accepted`; reconcile zero unauthorized mutation.
24. Refresh proportional records, commit/push scoped closeout and stop without beginning Sprint 029N.

## One-attempt credential state machine

The credential lifecycle is monotonic:

`not-created`

-> `orientation-and-non-secret-controls-complete`

-> `creation-instruction-issued`

-> `protected-value-received` or `possible-created-without-protected-value`

-> `provider-pass`

-> `exact-revocation-confirmed`

-> `same-token-invalid` (`401` or `403`)

-> `protected-state-cleared`

Only `protected-state-cleared` after `same-token-invalid` permits retained-pilot or release work.

`possible-created-without-protected-value`, protected output, provider mismatch, wrong token class, revocation ambiguity or invalidation ambiguity enters compensation/stop. No path creates a replacement token or starts a second live wrapper invocation.

One same-token invalidation retry is allowed only after a diagnosed provider propagation or rate-limit classification. It does not create a new lifecycle and the total Management request count remains at most three.

## Corrected wrapper activation

The wrapper remains `scripts/Invoke-ProtectedManagementLifecycle036D.ps1` for operational continuity. Before live use:

- bind it exactly to the 036F branch;
- generate `precision-performance-036F-single-use-<UTC>`;
- permit only `fine-grained-auth-config-read` in the 036F live path;
- preserve the complete 036E interaction contract; and
- update only deterministic expectations in the existing test.

The core remains byte-identical. Protected operations must still refuse deterministic injection. SelfTest remains synthetic/offline and must prove zero remote mutation.

The corrected interaction order is:

1. six numbered orientation lines;
2. all non-secret intercepted single-key controls;
3. final readiness;
4. exact token name and `CREATE THE CREDENTIAL NOW`;
5. `PROTECTED CREDENTIAL ENTRY - THIS IS THE ONLY CREDENTIAL PROMPT`;
6. immediate `Read-Host -AsSecureString`;
7. provider pass;
8. non-secret revocation/list-absence control; and
9. body-blind same-token invalidation.

No ordinary prompt or echoing input may appear. Buffered input stops before creation. Cancellation after creation instruction is possible-credential compensation, never a clean exit.

## Pre-stage gates

### Gate A - local and protected lifecycle

- canonical/direct-remote/handoff proof;
- exact wrapper/core/test hashes before change;
- exact two-file implementation scope;
- 360 corrected plus 135 inherited assertions, zero failures;
- wrapper self-test and interaction/source invariants;
- current official Supabase mechanism/permission proof;
- exactly one fine-grained token lifecycle;
- exact provider projection;
- exact-token revocation/list absence;
- same-token `401`/`403` invalidation; and
- protected state/residue zero.

### Gate B - retained pilot and Product integrity

- retained-pilot Verify `8/1/0/0`;
- accepted 035K ancestry and unchanged Product/runtime/package bytes;
- no runtime import of protected tooling;
- retained focused/canonical/TypeScript/lint/build proof; and
- scoped branch commit/push with direct-remote equality.

### Gate C - release baseline

- current installed Vercel CLI/help and official mechanism reconciliation;
- exact project ID and Production classification;
- exact five-alias affected set and no unlisted Production alias;
- Ready rollback exact identity/source;
- unaccepted Sprint 036 candidate excluded; and
- `baseline` five independent rows, five/five rollback.

No later gate begins from an incomplete earlier gate.

## Routing ledger

Each row records only UTC timestamp, checkpoint, exact alias, resolved deployment ID, intended project/classification, Production target, Ready state and `candidate`/`rollback`/`unexpected`.

Required full five-row snapshots:

1. `baseline` - five/five rollback before staging;
2. `post-stage` - five/five rollback after fresh candidate Ready;
3. `promotion-step-1` through `promotion-step-5` - all five reread after every assignment;
4. `candidate-live` - five/five candidate before authentication;
5. `final-accepted` - five/five candidate after both sign-ins; or
6. `rollback-step-1` through `rollback-step-5` and `final-rollback`.

Per-alias resolution is authoritative. Deployment-level alias inventory is corroborating only.

## Command shapes

Run from the canonical root.

Pack and repository:

`git worktree list --porcelain`

`git status --short --branch`

`git rev-parse HEAD`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036F-corrected-wrapper-live-lifecycle-retry.md --dry-run`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036F-corrected-wrapper-live-lifecycle-retry.md`

Focused protected proof:

`node scripts/test-protected-production-preflight-036C.mjs`

`node scripts/test-protected-management-lifecycle-036D.mjs`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation SelfTest`

Single live lifecycle, once only:

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation ManagementLifecycle`

Retained pilot, only after invalidation and again after both sign-ins:

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation RetainedPilotVerify`

Product integrity and maintained validation:

`git diff --name-status 76f66f5f9803e5d1f85a6dd3f71adf302b8a1810 HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json`

`git diff --name-status 6c632262438d84ef64931a1c360cc453621762ec HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json supabase`

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

Release mechanism and final repository checks:

`vercel.cmd --version`

`vercel.cmd deploy --help`

`vercel.cmd alias --help`

`vercel.cmd inspect --help`

`git diff --check`

`git status --short`

Equivalent or stronger safe commands may prove the same fact when current tool syntax changes. Do not weaken exact-target, independent per-alias, protected-output or cleanup boundaries.

## Promotion and rollback

Promotion uses five explicit `alias set` calls in legacy-team, team-project, project, `www`, apex order. Every step rereads all five and must produce candidate/rollback counts `1/4`, `2/3`, `3/2`, `4/1`, `5/0`.

Rollback uses five explicit assignments to the immutable rollback URL in apex, `www`, project, team-project, legacy-team order. Assign all five even if some appear safe. Every step rereads all five; final recovery is five/five Ready rollback plus route safety.

## Failure and recovery

- Wrong canonical/remote baseline or unexpected handoff diff: stop before branch/external action.
- Fine-grained `auth_config_read` token unavailable or ambiguous before creation: create nothing; close type-refused clean.
- Creation instruction issued but protected value absent: private exact-name revocation/list-absence intervention; no second lifecycle; stop blocked unless same-token invalidation remains possible in the original process.
- Provider projection fails after token receipt: revoke exact token, prove invalid, clear state; close before pilot/Vercel.
- Protected output occurs: terminate/finalize the surface, privately revoke exact token, prove invalid when the original process safely retains it, clear state; do not repeat the surface.
- Revocation or same-token invalidation unproven: stop blocked; no pilot/Vercel/release action.
- Retained-pilot mismatch: no repair; close before Vercel.
- Fresh candidate not exact/Ready: no alias movement; close staging blocked clean.
- `post-stage` not five/five rollback: assign all five to rollback; close staging-drift rollback clean.
- Promotion snapshot mismatch: immediate all-five rollback.
- Route/human transient failure: one sanitized diagnosis and one cooldown-safe non-blind retry only; otherwise all-five rollback.
- Source/provider/schema/permission/identity/fixture/data change required: all-five rollback when needed; close source-or-contract-change-required.
- Final rollback or credential cleanup cannot be proven: stop blocked with exact manual intervention.

## Closeout minimum

Record canonical/remote authority, exact two-file diff, before/after hashes, unchanged core/inherited hashes, current official mechanism references, assertion arithmetic, one-attempt credential timeline, sanitized provider projection, exact revocation/list-absence/same-token invalidation result, protected residue, retained-pilot checks, Product validation, candidate identity, every five-row routing snapshot, both private human journeys, route safety, final external-mutation ledger, final outcome, rollback readiness and scoped branch equality.

Only `production-trainer-access-stable-live-accepted-clean` completes the live trainer-access gate. Stop without beginning Sprint 029N.

============================================================
FILE: planning/sprints/036F-corrected-wrapper-live-lifecycle-retry/acceptance.md
============================================================

# Sprint 036F Acceptance

## Canonical and handoff baseline

- [ ] Current directory and Git top-level exactly equal the permanent canonical repository after Windows separator normalization.
- [ ] Exactly one canonical worktree registration exists; no retired, temporary or alternate workspace is used.
- [ ] Exact closed 036E SHA `6c632262438d84ef64931a1c360cc453621762ec` and direct remote authority are proven.
- [ ] Pre-branch state contains only this Pack and `planning/STATUS.json`.
- [ ] Pack dry-run/apply/post-dry-run reports exactly the four 036F sprint files.
- [ ] Only `codex/036F-corrected-wrapper-live-lifecycle-retry` is used.

## Corrected wrapper activation and deterministic proof

- [ ] Starting wrapper/core/test hashes equal `5DF552...`, `98DD491...` and `04D78E...` in full as specified by requirements.
- [ ] Implementation scope is exactly the existing wrapper and deterministic test.
- [ ] The wrapper is bound to the exact 036F branch and generates `precision-performance-036F-single-use-<UTC>`.
- [ ] The 036F live path permits only `fine-grained-auth-config-read` and refuses classic-PAT continuation.
- [ ] The core and every inherited 036C/035K implementation file remain byte-identical.
- [ ] All six beginner orientation steps and required semantic labels remain present before input.
- [ ] Every non-secret control remains intercepted, non-echoing and buffered-input resistant.
- [ ] Creation instruction remains directly adjacent to the sole protected `Read-Host -AsSecureString` prompt.
- [ ] Post-instruction cancellation remains possible-credential compensation and cannot exit clean by assumption.
- [ ] Transcript/redirection, trusted runtime, minimal child environment, credential separation, clipboard, BSTR, disposal, request ceiling, body-blind invalidation and sanitization controls remain executable.
- [ ] Corrected lifecycle suite passes exactly 360 assertions, or at least 360 with exact retained/replaced/new arithmetic for legitimate alignment changes.
- [ ] Inherited Sprint 036C suite passes exactly 135 assertions.
- [ ] Wrapper self-test passes with protected values emitted `false` and remote mutation `none`.
- [ ] No Product/runtime/package/configuration/migration difference or runtime import is introduced.

## Exact operator and one-token authority

- [ ] Acting provider operator is privately confirmed as Randell Rankin or Philip Rankin.
- [ ] Correct approved-project access, current MFA/recovery and exact same-name token absence are privately confirmed without protected output.
- [ ] Current official endpoint and fine-grained `auth_config_read` semantics are reconciled.
- [ ] Exactly one fine-grained token restricted to `auth_config_read` and the narrowest available exact boundary is created.
- [ ] No classic PAT, OAuth app, CLI profile, service account, database credential, project key or unrelated token mutation occurs.
- [ ] Token name is exactly `precision-performance-036F-single-use-<UTC>` and no replacement token is created.
- [ ] `ManagementLifecycle` is invoked live exactly once in one private interactive non-transcribed ConsoleHost.
- [ ] Token value enters only the protected prompt; no value or fragment reaches output, arguments, history, files, environment residue, credential store, clipboard history/sync, Git or evidence.
- [ ] When paste is necessary, clipboard history/sync is privately off and clipboard is cleared without inspection.

## Provider pass, revocation and invalidation

- [ ] One fixed GET targets only `https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth`, with HTTPS GET and redirects refused.
- [ ] Projection proves exact Site URL, one callback/no wildcard, Resend/exact sender, one `.Token`/zero links, OTP `6/3600/60`, no Auth-user enumeration and zero configuration mutation.
- [ ] Acting operator immediately revokes only the exact new token and privately confirms its named row absent.
- [ ] The same in-memory token returns `401` or `403` on the same endpoint; invalidation response body is not read.
- [ ] Request count is exactly two, or three only for one documented diagnosed propagation/rate-limit retry.
- [ ] Sanitized result records `revocationVerified=true`, `protectedValuesEmitted=false` and `remoteMutation=one-management-credential-created-and-revoked`.
- [ ] Management environment, memory, clipboard and temporary residue are cleared before downstream action.
- [ ] No second live lifecycle, second token or replacement attempt occurs for any reason.
- [ ] Any output/preflight failure after possible creation still follows exact compensation and stops downstream unless exact cleanup/invalidation passes.

## Retained pilot and unchanged Product

- [ ] Retained-pilot Verify runs only after same-token invalidation.
- [ ] Verify proves `state=verified`, application `8`, Auth `1`, Storage `0`, wrong-horse rows `0` through exact-ID reads with no enumeration or mutation.
- [ ] No email, Auth ID, row ID, credential, ledger content or provider payload is retained.
- [ ] Accepted 035K correction remains in ancestry and Product/runtime/package bytes have zero unexplained difference from accepted 035K and closed 036E.
- [ ] Focused 035K/dashboard/OTP/redirect/bootstrap/recovery/session/permission and Sprint 032 public controls pass.
- [ ] JSON, domain, roles, Supabase-self, static, TypeScript, zero-warning lint and Production build pass using equivalent or stronger safe evidence where appropriate.
- [ ] Diff, staged, secret, protected-data, unsafe-path, generated-artifact and encoding scans pass.
- [ ] Scoped 036F checkpoint is committed/pushed and exact local/direct-remote equality is proven before deployment.

## Vercel baseline and candidate staging

- [ ] Current Vercel CLI/help and official staged-deploy/alias semantics are recorded.
- [ ] Exact project ID, Production environment, rollback and excluded Sprint 036 candidate are freshly reconciled.
- [ ] Planned affected set is exactly the five accepted aliases and no other Production alias.
- [ ] Deployment-level alias inventory is treated as corroborating only.
- [ ] `baseline` has five independent timestamped rows, all Ready rollback.
- [ ] One fresh candidate deploys from exact pushed 036F SHA with current help-confirmed `--prod --skip-domain` semantics.
- [ ] Candidate is exact-project, Production-targeted, exact-source, immutable and Ready.
- [ ] `post-stage` independently proves all five aliases remain on rollback.

## Authoritative five-alias transition

- [ ] Fixed promotion order uses one explicit alias assignment per step.
- [ ] Every step rereads all five aliases independently.
- [ ] Promotion steps prove candidate/rollback counts `1/4`, `2/3`, `3/2`, `4/1`, `5/0`.
- [ ] Every snapshot has five rows and no third deployment, non-Ready state, automatic movement or unlisted alias.
- [ ] `candidate-live` proves five/five Ready candidate before authentication.
- [ ] Any discrepancy triggers fixed all-five rollback before human authentication.

## Public and protected safety

- [ ] Cache-busted homepage, pricing, disclaimer/asset, disabled enquiry, health and truthful sign-in pass.
- [ ] Anonymous portal and horse routes return safely to sign-in without loop or identity leakage.
- [ ] Unsafe methods and protected/API boundaries retain expected denial.
- [ ] DNS/public-authenticated separation remains unchanged.
- [ ] Compatible rollback remains Ready.

## First private Production journey

- [ ] Tester privately requests, receives and enters one current six-digit code on canonical Production.
- [ ] Session reaches `/portal` without loop or bootstrap collision.
- [ ] Only the retained synthetic stable/horse and accurate workflow/action appear.
- [ ] Synthetic horse workspace/action succeeds.
- [ ] Inaccessible horse is denied without identity, existence, state or count leakage.
- [ ] Sign-out removes protected access.

## Second fresh Production sign-in

- [ ] Fresh browser/application session has no first-session auth state.
- [ ] A new current code, not an old/reused code, establishes a second Production session.
- [ ] `/portal` shows the same bounded assignment and no broader visibility.
- [ ] Tester confirms usability without sharing protected details.
- [ ] No protected mailbox/code/session value enters conversation, commands, URLs, logs, screenshots, Git or durable evidence.

## Final invariants and closeout

- [ ] Final retained-pilot Verify passes `8/1/0/0` without mutation.
- [ ] Final provider substitute consists of the earlier exact pass, same-token invalidation, zero provider-config mutation, two fresh sign-ins and final pilot proof.
- [ ] `final-accepted` proves five/five Ready candidate after both sign-ins.
- [ ] Exactly one Management token was created; that same token is revoked/invalid; no other token changed.
- [ ] No Auth/provider config, callback, SMTP, template, schema, RLS, role, permission, identity, fixture, data, Storage, DNS or unrelated Product mutation occurs.
- [ ] Participants A/B/C, unrelated identities and real data remain untouched.
- [ ] Review and current state/status/roadmap/lifecycle/schedule/evidence/operations/briefing agree.
- [ ] Canonical worktree is clean and exact closeout commit equals scoped direct remote branch.
- [ ] Sprint 029N remains unstarted unless this sprint passes live trainer access or a later separate owner decision changes the road.
- [ ] No merge, PR, `develop` push, force-push, broad rollout or product-wide Done declaration occurs.

## Failure and rollback

- [ ] A material failure receives one focused sanitized diagnosis and no blind retry.
- [ ] Token cleanup completes before any clean exit after creation.
- [ ] Staging drift, transition discrepancy, route failure, material auth failure or scope expansion triggers exact all-five rollback.
- [ ] Rollback assigns all five to the immutable rollback URL in fixed order and rereads all five after every assignment.
- [ ] `final-rollback`, when required, proves five/five Ready rollback and final route safety.
- [ ] No known-broken candidate, third deployment or partial mapping remains live.
- [ ] If token cleanup or alias rollback cannot be proven, exact step-by-step manual intervention is recorded and state is blocked, not clean.

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
FILE: planning/sprints/036F-corrected-wrapper-live-lifecycle-retry/handoff-prompt.md
============================================================

You are Builder for Sprint 036F - Corrected-Wrapper Live Lifecycle Retry.

Your one objective is to complete exactly one strict end-to-end live Production trainer-access retry using the beginner-safe wrapper proven by Sprint 036E. The chain is one fine-grained Management token, one fixed Auth-config pass, immediate exact-token revocation/list absence, same-token `401`/`403` invalidation, retained-pilot proof, unchanged Product validation, a fresh staged candidate, the fixed five-alias transition, route safety and two fresh private Production trainer sign-ins. No downstream work begins unless credential invalidation is exact.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Resolve current directory and Git top-level; both must equal it after normalizing Windows separators. Verify exactly one canonical worktree. Expected starting authority is closed 036E SHA `6c632262438d84ef64931a1c360cc453621762ec`. The only expected Architect handoff changes are this Pack and `planning/STATUS.json`.

Dry-run/apply `planning/architect-packs/architect-pack-036F-corrected-wrapper-live-lifecycle-retry.md`, verify exactly four generated files, create only `codex/036F-corrected-wrapper-live-lifecycle-retry`, and execute only from the generated files. Never use retired paths, `C:\tmp`, deployment directories, alternate history or Sprint 035Q.

Read the agent identity, `AGENTS.md`, all four generated 036F files, current state/status/roadmap/briefing, complete closed 036D and 036E sprint/review evidence, closed 036C/036B/036/035K authorities, exact protected tooling, protected-process and operations docs, workflow profile, design/messaging authority and current official Supabase/Vercel mechanism documentation.

The task contract is:

**objective:** Establish stable live Production trainer access through one beginner-safe create/use/revoke/invalidate Management lifecycle and the complete downstream pilot/release/two-sign-in acceptance chain.

**owns:** The corrected wrapper and deterministic test for exact 036F branch/token-stem/fine-grained alignment; one private fine-grained `auth_config_read` token; one exact provider pass; exact-token revocation and same-token invalidation; retained-pilot Verify; unchanged Product proof; exact Vercel/five-alias evidence; one fresh staged candidate; five candidate alias assignments; route smoke; two private human sign-ins; rollback; proportional records; scoped branch commit/push.

**must_not:** Run more than one live Management lifecycle; create a replacement/second token; use a classic PAT or substitute credential; expose/automate account/token/Auth-user surfaces; enumerate identities; emit provider payloads; persist a credential; call any Management endpoint except fixed Auth-config GET; change provider/Auth/Product/runtime/package/schema/RLS/permission/identity/fixture/data/Storage/DNS/Vercel settings; reuse old candidate; trust deployment alias inventory over per-alias routing; move unlisted aliases; inspect mailbox; activate A/B/C; implement 029N; merge/PR/push `develop`/force-push; claim broad rollout/Done.

**acceptance:** 495 counted deterministic assertions and wrapper self-test pass after exact 036F alignment; one fine-grained token is privately created, the exact projection passes, the token is revoked/list-absent and the same in-memory token returns `401`/`403`; retained pilot passes `8/1/0/0`; Product bytes/validation remain accepted; one fresh exact candidate is Ready with post-stage five/five rollback; the stepwise transition reaches five/five candidate; safety passes; retained trainer completes two fresh sign-ins and governed journey; final pilot/routing invariants pass; rollback remains exact/Ready.

**verification:** Run these exact or execution-time equivalent commands and retain sanitized results:

`git worktree list --porcelain`

`git status --short --branch`

`git rev-parse HEAD`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036F-corrected-wrapper-live-lifecycle-retry.md --dry-run`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036F-corrected-wrapper-live-lifecycle-retry.md`

`node scripts/test-protected-production-preflight-036C.mjs`

`node scripts/test-protected-management-lifecycle-036D.mjs`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation SelfTest`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation ManagementLifecycle`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation RetainedPilotVerify`

`git diff --name-status 76f66f5f9803e5d1f85a6dd3f71adf302b8a1810 HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json`

`git diff --name-status 6c632262438d84ef64931a1c360cc453621762ec HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json supabase`

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

Starting hashes are wrapper `5DF552844AF0AAEDF9FFFDDBD0E63EE539238CA5D65BE4486CBB21F12042BB4D`, core `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1` and test `04D78E23AB3DFC897C8084CD3CE25228AB4A9E400618AF1EEF07B8187006C27F`. Change only the wrapper/test for exact 036F branch binding, `precision-performance-036F-single-use-<UTC>`, fine-grained-only live selection and deterministic alignment. Preserve the core and all inherited/Product bytes. Before live work, require 360 corrected plus 135 inherited assertions, wrapper self-test and exact interaction/source/security invariants.

Only Randell Rankin or Philip Rankin may perform the private account action. Require a provider-supported fine-grained token with only `auth_config_read` and the narrowest exact boundary. If unavailable or ambiguous, create nothing and close type-refused clean. No classic PAT fallback is authorized.

Run `ManagementLifecycle` live exactly once, in one continuous private interactive non-transcribed ConsoleHost. Read the six-step orientation. Do not create a token until every `NON-SECRET CONTROL` is complete and the wrapper says `CREATE THE CREDENTIAL NOW`. Enter the value only at `PROTECTED CREDENTIAL ENTRY`. Create exactly one named 036F token and no replacement. If paste is necessary, clipboard history/sync must be privately off and the wrapper must clear the clipboard without reading it.

Require one exact provider GET and full 036C projection. Immediately revoke the exact token, confirm its named row absent and use the same in-memory token for body-blind invalidation. Only `401`/`403` passes. One diagnosed same-token propagation/rate-limit retry may raise total requests to three. Any output exposure, `200`, redirect, unexpected status, token ambiguity or cleanup uncertainty stops every downstream action. List absence alone is insufficient.

After invalidation and protected cleanup, run retained-pilot Verify and accept only `verified` `8/1/0/0`. Do not enumerate, repair, recreate or clean the pilot. Then prove Product bytes unchanged, complete maintained validation, reconcile exact Vercel project/rollback/five-alias `baseline`, commit/push only scoped 036F work and prove direct-remote equality.

Stage one fresh candidate with current help-confirmed `--prod --skip-domain` semantics. Require exact project/Production/source/Ready and `post-stage` five/five rollback. Promote with five explicit `alias set` calls in legacy-team, team-project, project, `www`, apex order. Reread all five after every call. Per-alias resolution is authoritative; any discrepancy triggers all-five rollback.

At `candidate-live`, pass cache-busted public/protected/API safety. The retained tester privately performs the first current-code sign-in, bounded synthetic dashboard/workspace/action, identity-free denial and sign-out; then, after cooldown, a second fresh-session/fresh-code sign-in. Builder never inspects mailbox or receives protected values. One sanitized, cooldown-safe non-blind retry is allowed only for a transient human/transport classification requiring no source/provider/config change.

Rerun retained-pilot Verify, route safety and `final-accepted`. Do not create another Management token for final readback. Exact rollback assigns all five aliases to `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app` in apex, `www`, project, team-project, legacy-team order, rereading all five after every step.

Apply the Evidence-Proportional Execution Standard. Substitute equivalent or stronger safe proof when optional tooling is unavailable; keep contract-preserving wrapper/harness/reporter corrections inside 036F. Stop only for material target, authority, security/privacy, credential cleanup, Production, integrity, scope or rollback risk. Use manual intervention only after safe alternatives are exhausted, with exact secret-free steps and the verification that follows.

Close `production-trainer-access-stable-live-accepted-clean` only when the one credential is proven invalid, both Production sign-ins pass and every final invariant is exact. Otherwise use one listed permitted outcome, complete credential/alias compensation as applicable, refresh proportional records, intentionally commit/push only the 036F branch and stop. Do not begin Sprint 029N.
