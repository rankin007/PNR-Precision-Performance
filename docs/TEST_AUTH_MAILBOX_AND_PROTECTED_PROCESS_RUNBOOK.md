# Test Auth Mailbox And Protected Process Runbook

## Purpose

This runbook defines the prerequisites for a future authenticated-proof sprint. It does not authorize a new run, remote mutation, or callback change.

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
