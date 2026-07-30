# Sprint 035D Email OTP Cutover And Mailbox Checkpoint

## Status

Sprint 035D remains active. Application and provider cutover gates pass; the protected mailbox became available, but the bounded delivered synthetic run failed because the single participant-path OTP request did not produce an OTP message. Exact-owned cleanup is proven `0/0/0`. Participant execution remains unauthorized and unstarted. No permitted closeout outcome is claimed at this checkpoint.

## Proven baseline and application candidate

- Exact starting local/remote Sprint 035C SHA: `819f09add752a64dbf10213f3d481ad3132da9e9`.
- Scoped branch: `codex/035D-prefetch-resistant-email-otp-authentication`.
- Exact application candidate: `3be6b6c3622150a3c2009ed8564795b14e3e6c2b`.
- Generated Preview: `dpl_2ftdehCW4dZTwb5FegppGou9W9XH`, Ready, Preview-classified, exact candidate in Git and `ppSourceSha`, assigned alias array empty.
- Production release: `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, Ready. Prior Ready rollback remains `dpl_fPWqinnfL4YZJq41MQPaXhhuh7hi`.
- Apex, `www` and all five accepted stable aliases were reconciled to the Ready Sprint 035D production deployment. Public health returned `200`; the two Vercel-owned stable hosts retain their expected deployment-protection redirect behavior.

## Provider cutover

- Approved project: `uvskssaecdhxcgytkasc`, Precision Performance Clean Rebuild, Healthy, Singapore `ap-southeast-1`.
- Provider migration ledger was visibly verified as exactly `0001` through `0021`.
- The prior Magic Link/OTP template was captured exactly in protected browser-session memory before mutation. Durable evidence retains only sanitized fingerprint `3e7f17fc3a148193493aedf4567467946ebbf198c7f7931c17b021e748e0554c` and restoration-ready classification.
- Only Magic Link/OTP subject/body changed. Read-before-save and read-after-write prove one `.Token`, zero `ConfirmationURL`, zero links, and saved fingerprint `dc83e62af2ba9644a18f0908f0b42cfa17d95500ec67b7d797f659a5d9df6194`.
- Confirm sign up and unrelated templates/settings were not opened for editing or submitted.
- Production Site URL remains `precisionperformance.com.au`.
- Redirect allowlist is exactly the production callback plus the exact generated Preview callback. The superseded `c16cgcork` Preview callback was removed before `bg9t5lfca` was added.

## Application proof

- `shouldCreateUser:false` remains explicit.
- OTP verification uses `verifyOtp` with email type.
- Email and code remain transient POST/server-action inputs and do not enter URL, storage or committed fixtures.
- Exact plus-address identity is trimmed only; no plus-tag removal or canonicalization was added.
- Generic request behavior does not expose provider identity lookup failure.
- Focused Sprint 035D OTP, Sprint 035C redirect and Sprint 035 dashboard tests pass.
- Typecheck, focused lint, canonical static validation, production build, encoding and diff checks pass.
- Protected rendered Preview smoke shows the six-digit code journey and normalized `/portal` destination.

## Synthetic delivered-OTP acceptance result

The protected Gmail session was confirmed with boolean-only evidence. No mailbox address, account identity, existing message, header, credential or MFA information was returned. A fresh exact plus-addressed recipient was derived only in protected browser memory.

- Exactly one ownership-bounded synthetic Auth identity was prepared in approved project `uvskssaecdhxcgytkasc`; exact-match dashboard proof showed one identity without retaining its address or Auth UUID.
- Exactly one OTP request was submitted through the participant-facing sign-in form on the exact alias-free Preview. The application advanced to its generic code-entry state and emitted no identity-specific error.
- A bounded Gmail provider check found normal delivery of the separate identity-preparation invitation but no OTP message for the exact synthetic recipient, including after one bounded refresh.
- Builder did not submit a second OTP request because the run authority required exactly one. Delivered one-code/no-link proof, verification, session, `/portal`, permission, wrong-horse, RLS and runtime failure-matrix acceptance therefore remain unproved.
- No application or Storage records were created. The exact-owned Auth identity was deleted last and exact-search recheck proved application/Auth/Storage `0/0/0`.
- Protected recipient/template values were cleared from browser memory. No OTP, recipient, token, link, header, UUID or credential entered commands, conversation, screenshots, commits or durable evidence.

This is a material delivered-authentication failure for the bounded synthetic run. Participant A, B and C were not started. Architect review is required before authorizing any retry or participant execution.

## Current cleanup boundary

The latest bounded run created one exact-owned Auth identity and sent one identity-preparation invitation plus exactly one participant-path OTP request. No application or Storage state was created. Auth-last cleanup removed the exact-owned identity and final owned application/Auth/Storage state is `0/0/0`; inherited Participant A remains at the prior sanitized Sprint-owned `0/1/0` state pending guarded reverification. The exact Preview callback remains temporarily required for any Architect-authorized acceptance retry.

## Protected mailbox resumption incident

The operator confirmed protected mailbox readiness. During the required signed-in classification, the browser's open-tab metadata included the mailbox identity in the Gmail tab title and the browser tool emitted that metadata. Builder stopped immediately and did not repeat, use, persist or derive a synthetic address from the exposed value.

No Supabase user, authentication request, delivered message, session, application record or Storage object was created. This synthetic attempt therefore remains application/Auth/Storage `0/0/0`, with Auth-last cleanup vacuous. A/B/C were not started.

The incident is a material Sprint 035D privacy-boundary failure. Delivered OTP, one-action email, session, permission, wrong-horse, safe-failure and runtime cleanup acceptance remain unproved. The current OTP-only provider template and healthy 035D application release were not changed during the failed attempt. The exact prior template body was intentionally retained only in the earlier protected browser session and is no longer available after the browser session reset; therefore Builder did not attempt an uncertain reconstruction or non-exact restore. Architect review is required before any further mailbox or participant execution.

## Post-failure invariant recheck

- Exact Preview `dpl_2ftdehCW4dZTwb5FegppGou9W9XH` remains Ready, Preview-classified and alias-free.
- Production `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` remains Ready. All five stable aliases resolve to it.
- Prior production rollback `dpl_fPWqinnfL4YZJq41MQPaXhhuh7hi` remains Ready.
- Site URL remains `https://precisionperformance.com.au`; production and exact Preview callbacks remain present; the old project reference is absent.
- Protected readback of the current Magic Link/OTP template proves one `.Token`, zero `ConfirmationURL` and zero links. No template mutation was made during this run.

## Incident-safe diagnostic stop

Architect authorized a read-only provider diagnosis with all synthetic and participant authentication stopped. Source inspection established that `requestEmailOtpAction` currently converts every Supabase `signInWithOtp` error into `{ ok: true }`; therefore a provider rate-limit, cooldown or submission rejection can be rendered as the same apparent code-sent state as an accepted request. This is a confirmed application error-handling defect. No source correction was attempted after the stop condition below.

The approved Supabase project and signed-in log explorer were opened read-only. A broad visible-log classification unexpectedly emitted a protected Auth identifier in tool output. Builder stopped immediately, did not inspect or reuse the value, cleared the browser session and performed no authentication, provider, deployment, template or data mutation. Provider disposition, cooldown causality and delivery classification remain unproved. Participant A/B/C and synthetic execution remain stopped.

Rollback remains compatibility-incomplete: the retained prior production deployment expects a Magic Link template, while the provider currently emits OTP codes, and the exact pre-cutover template representation is unavailable. Neither historical rollback recovery nor a separately proven forward OTP-compatible rollback pair was completed before the diagnostic privacy stop. Do not describe rollback as ready pending Architect direction.

## Source correction and containment

Architect authorized continuation without raw provider-log access or authentication execution. The exposed protected identifier was not reproduced, searched, correlated or used for deletion. Changed-file, staged-addition and durable-evidence scans contain no mailbox, UUID, token or credential pattern from the incident. No raw diagnostic transcript or exact-owned diagnostic file exists under Builder control; therefore no deletion by uncertain identifier was attempted. Containment classification: `protected-identifier-contained; identity-state=absent` based on the previously proven exact-owned Auth-last `0/0/0` cleanup.

OTP request handling now distinguishes only safe operational classes. Accepted requests and missing identities share the same non-definitive response: `If this email can sign in, a code may arrive shortly. Wait before requesting another code.` Allowlisted rate-limit, disabled-provider/configuration and server/provider failures return a generic retry-later state. Raw Supabase messages, statuses, bodies, identifiers and metadata are not returned or logged. `shouldCreateUser:false`, exact plus-address preservation and generic non-enumeration remain explicit.

The protected synthetic helper now prepares an already-confirmed identity with Admin `createUser`, sends no invitation/confirmation/preparation email, refuses pre-existing or ambiguous exact identities, keeps ownership in protected temporary state and requires Auth-last cleanup. A separate diagnostic sanitizer accepts only bounded `/auth/v1/otp` records, emits allowlisted disposition/coarse-hour/count fields, rejects protected patterns and unexpected fields, and was not run against provider data.

Focused OTP/redirect/dashboard tests, helper and sanitizer self-tests, typecheck, focused lint, JSON/static validation and an exact archived production build pass. The ordinary worktree build stalled before compilation because of its local build directory; the same exact committed archive built locally and on Vercel without source change.

## Corrected deployment and forward rollback

- Corrected source candidate: `7d12e0d229324d8b07bcff7cb76bcc11f4d6477a`.
- Exact alias-free Preview: `dpl_CiYWswcayHztGRHEUUFsZmQkTDie`, Ready/Preview, metadata source exact, assigned aliases zero. Rendered sign-in and same-Preview anonymous `/portal` denial pass without authentication.
- Corrected production: `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, Ready/production, metadata source exact. Production sign-in renders and anonymous `/portal` denies to production `/sign-in`.
- Forward rollback: immediately preceding `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, Ready at exact source `3be6b6c3622150a3c2009ed8564795b14e3e6c2b`. Source readback proves OTP request, `shouldCreateUser:false`, six-digit code entry and email OTP verification, so it is compatible with the current OTP template.
- The current OTP template is preserved exactly in protected temporary storage with canonical sanitized fingerprint `23c6a254d6c68cff676c99500768c1ef8eb7d33ff85eb55c0e409701bd330b49`. Readback matches the artifact byte-for-byte and proves one `.Token`, zero `ConfirmationURL` and zero links. The provider template was not changed.
- Apex, `www` and all five stable aliases resolve to corrected production. Site URL remains unchanged. Callback allowlist is production plus exact corrected Preview; the superseded Preview callback and prohibited old project are absent.

Production authentication is classified `available-static-request-and-protected-route; delivery/session-not-reexecuted`: compatible source/template, sign-in rendering and protected-route denial are proven without sending email. Raw provider disposition and exact prior non-delivery cause remain unproved. Configured provider UI shows the built-in email ceiling of two emails per hour; the invitation plus OTP were close together and other hourly use was not safely knowable, so rate limiting remains plausible rather than proven. One new synthetic attempt is not yet authorized or unconditionally safe; it requires Architect review and a fresh provider rate-limit window, after which preparation itself will send no email.
