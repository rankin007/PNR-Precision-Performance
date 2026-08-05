# Test Auth Mailbox And Protected Process Runbook

## Purpose

This runbook defines protected authentication proof procedures. Sprint 035K supersedes mailbox automation for trainer acceptance: the designated human tester uses their own mailbox and privately enters their own email and six-digit code.

## Test Mailbox Standard

The operator creates and owns one new mailbox that is non-personal, dedicated to Precision Performance testing, protected by a unique password and MFA, and capable of receiving plus-address aliases. It must not be a customer/staff mailbox or any address disclosed in conversation or durable files.

Operator-only setup:

1. Use a private browser window and a reputable provider that documents plus addressing.
2. Create a neutral test-only account containing no personal, customer, horse, or clinical data.
3. Store a unique password in the operator password manager and enable MFA.
4. Prove receipt of one ordinary test message.
5. Prove receipt of one `+alias-test` message in the same inbox.
6. Keep the mailbox accessible for the complete proof and cleanup window.
7. Report only `test_mailbox_ready=yes`, `plus_alias_verified=yes`, provider class, verification date, and operator role. Never report the address.

If alias delivery fails, abandon that mailbox for this purpose. Do not substitute personal addresses.

## Builder-Owned Technical Process

Builder owns PowerShell, repository, API, runtime, verification, and cleanup execution. The operator does not paste scripts, set environment variables, or run harness commands. Operator involvement is limited to mailbox ownership, password/MFA entry, and protected provider interactions Builder cannot safely perform.

For a separately authorized future sprint, Builder must:

1. Acquire protected values through an existing signed-in session or system credential store where possible.
2. Keep secrets, mailbox values, OTPs, links, cookies, and sessions only in process memory for the minimum operation.
3. Never place protected values in arguments, clipboard instructions, screenshots, logs, `.env` files, documents, or conversation.
4. Emit only allowlisted booleans, aliases, aggregate counts, and pass/fail codes.
5. Prove exact candidate equality and refuse the old or unexpected project.
6. Use a fresh run ID; permanently refuse `021E-RLS-20260720-01`.
7. Prove zero starting anchors, declare ceilings, and maintain an in-memory ownership ledger.
8. Compensate partial creation immediately and stop at the first failed assertion.
9. Clean application rows in dependency-safe order and Auth identities last.
10. Prove final zero Auth/application/Storage state, production-only callback, unchanged ledger, healthy projects, and cleared protected processes.

No authenticated attempt may begin without a separate Sprint 021G-or-later Architect Pack.
# Sprint 035H protected single-run entry

Use `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedSingleRun035H.ps1 -Mode Readiness` only from a private interactive console. The command is no-send and currently closes `protected-mailbox-automation-authority-pending-clean` until a reviewed provider-specific read-only OAuth/API adapter is backed by Windows Credential Manager or an equivalently approved provider secure store.

Do not use `-Mode Live` until that adapter, plus-alias receipt, restricted ledger ACL, deterministic provider fixtures and sanitized no-send readiness all pass. Never paste an address, credential, OAuth token, message, OTP or mailbox identifier into arguments, environment files, repository files, output or conversation. Manual mailbox opening, code copying and browser handoffs are prohibited. After any send reservation, only the protected runner may continue; a restart is cleanup-only.

## Sprint 035I Gmail enrollment containment

Google Cloud is configured for External/Testing, one dedicated test user and exactly `gmail.readonly`, with Gmail API enabled. No Desktop client or OAuth grant is retained. Do not recreate a Desktop client through any browser-control path that renders client material into agent-visible output. Future enrollment must transfer the exact client configuration through an operator-only protected channel directly into the fixed current-user Credential Manager targets, prove no credential-file residue and rerun no-send readiness before any identity or email action.

## Sprint 035K human trainer acceptance

Sprint 035K does not use the test-mailbox, Gmail, OAuth, IMAP, POP, forwarding, scraping or mailbox-inspection procedures above. The product owner acts as, or privately coordinates, one designated tester using a mailbox they control.

Before any remote mutation, run deterministic checks and record the field-minimal fixture manifest. From a private interactive Windows console with transcription disabled, the Builder uses:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-LiveTrainerAccess035K.ps1 -Operation SelfTest
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-LiveTrainerAccess035K.ps1 -Operation Prepare
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-LiveTrainerAccess035K.ps1 -Operation Verify
```

The wrapper accepts only the operation name as an argument. It prompts privately for the service-role value, and the helper prompts privately for the tester email. For an adopted Auth identity, the operator must also enter its exact Auth ID privately; the helper calls the exact-ID provider contract and checks exact email agreement. It never lists or processes unrelated Auth users. When no exact ID is supplied, the helper attempts one confirmed identity creation; a provider duplicate response without an exact ID fails closed as `EXACT_IDENTITY_CONTRACT_REQUIRED`. Never put protected input, an OTP, session value or private identifier in arguments, environment files, chat, screenshots, logs or retained evidence. The helper must refuse non-interactive or transcribed consoles, the old Supabase project, ambiguous identity/application state, pre-existing fixture labels, missing trainer permission contracts and open or invalid ownership ledgers.

The bounded fixture is exactly one synthetic profile, trainer membership, stable, trainer row, horse, assignment and write-access row. It contains no test result, note, upload or Storage object. Its honest initial workflow is `no-result`, with the existing capture action. The denial target is a generated nonexistent UUID and creates no second horse.

After an exact-source alias-free Preview is ready and its callback is proven, the tester—not Builder—opens sign-in, enters their private email, requests one code, confirms only whether it arrived, enters it privately, completes the synthetic dashboard/workspace/action journey, signs out and signs in again. Builder may inspect only the authenticated synthetic application after the tester consents; Builder must never inspect the mailbox or receive the email/code.

Repeat the same essential journey on production only after Preview acceptance and exact promotion. Allow at most two diagnosed, cooldown-safe attempts per sprint policy; never resend blindly.

At disposition, retain only after the tester returns the exact sanitized sentence `Retain the Sprint 035K pilot trainer account and synthetic fixture.` Then run `-Operation Retain` and privately type that full sentence when prompted. Retention authority is never accepted through an argument, environment variable or inference. Any other input leaves the ledger and records unchanged. Otherwise run `-Operation Cleanup`; before each deletion the helper rereads the exact row and checks its identifier plus synthetic ownership fields against the ledger. It then proves each of the eight application surfaces independently reaches zero and deletes Auth last only when Sprint 035K created it. The ledger is removed only after every required absence check passes. An adopted pre-existing Auth identity is exact-ID reverified and preserved.

## Sprint 036E beginner-safe protected interaction

Sprint 036E proves the local interaction contract only. It does not authorize a real credential, Management API request, retained-pilot operation, provider page, Vercel action, deployment, alias transition, OTP or Production sign-in.

For any separately authorized future lifecycle, the wrapper must run from a private interactive non-transcribed ConsoleHost and present this order:

1. Read all six `BEGINNER-SAFE PROTECTED FLOW` orientation steps and obey `DO NOT CREATE A CREDENTIAL YET`.
2. Use only the displayed single keys at controls labelled `NON-SECRET CONTROL - NEVER TYPE OR PASTE A CREDENTIAL HERE`.
3. Never type or paste a credential at a non-secret control. Keys are intercepted with `Console.ReadKey(true)` and are not printed.
4. If unexpected input is already buffered or arrives after the selected key, the wrapper drains it through the intercepted reader, stops sanitized and does not issue the creation instruction.
5. Complete account preflight, token class, scope/risk, input method, clipboard safety when applicable and final readiness before creating anything.
6. Create only when the wrapper emits the exact token-name stem and `CREATE THE CREDENTIAL NOW`.
7. Enter the credential only at `PROTECTED CREDENTIAL ENTRY - THIS IS THE ONLY CREDENTIAL PROMPT`, which immediately invokes `Read-Host -AsSecureString`.
8. Treat cancellation or ambiguity after the creation instruction as possible credential creation. Follow the fixed private revocation/list-absence intervention and do not continue downstream.
9. Complete revocation and any justified retry decision only through their labelled non-secret single-key controls.

The wrapper retains the inherited transcript/redirection refusal, trusted executable and SystemRoot checks, exact minimal child environments, clipboard clearing without reading, same-token compensation, request ceilings, body-blind invalidation, BSTR zeroing, `SecureString` disposal and process cleanup. Deterministic decision injection is `SelfTest`-only and is refused by protected operations.

Sprint 036E closed `beginner-safe-protected-interaction-corrected-clean` with 360 corrected plus 135 inherited assertions passing and zero external actions. Sprint 036D remains `production-management-access-revocation-blocked`; no later live retry may be inferred from this runbook entry.

## Sprint 036F blocked corrected-wrapper lifecycle

Sprint 036F consumed its exact one-lifecycle authority in one private interactive non-transcribed ConsoleHost. The wrapper returned sanitized exit code `3`, `management-access-revocation-blocked`. Do not rerun it under 036F and do not create a replacement token.

The operator privately confirmed only the authorized sanitized facts: the exact 036F token row is absent, no other token changed and no replacement token was created. This proves exact-token cleanup. It does not prove same-token `401`/`403` invalidation, provider projection success or request-count completion after the protected process terminated.

No retained-pilot, Vercel, deployment, alias, OTP, mailbox, session or Production continuation occurred. Local protected process-environment and `pp036d-*` residue are zero. Any later attempt requires a separate Architect Pack and explicit authority; never infer retry authority from cleanup completion or from the 036E interaction correction.

## Sprint 036I retained-pilot Verify stop

Sprint 036I activated `scripts/Invoke-LiveTrainerAccess035K.ps1` for exactly historical 035K, closed 036G and current 036I. Local deterministic proof passed 101 assertions and the core remained byte-identical. Protected SelfTest exited 0 in a visible private non-transcribed ConsoleHost.

The first exact-ID Verify wrapper process exited 2 without accepted `8/1/0/0` evidence. Its allowlisted private console subcode was not captured into agent output. Process service-role, target and run variables and pending-file residue were zero afterward; the governed retained ledger remained present and uninspected. The owner directed closure without the remaining permitted Verify.

Do not rerun the wrapper under 036I, infer the missing subcode, inspect the ledger, expose a protected value, or continue into Vercel/deployment/alias/OTP work. Any future retained-pilot attempt requires a separate exact Pack that defines both the protected input path and a durable privacy-safe result channel.
