# Sprint 035H — Protected Single-Run Authentication Acceptance Harness

## Goal

Replace the permanently stopped multi-surface manual OTP procedure with one guarded local execution that performs exact-target preflight, exact-owned preparation, one Preview OTP request, protected mailbox polling, in-memory recovered-code verification, exact-Preview session/permission proof and mandatory Auth-last cleanup while emitting sanitized evidence only.

Target outcome: `protected-single-run-authentication-proven-clean`.

## Workflow profile

Strict. The harness handles live authentication delivery, a protected mailbox, transient OTP/session material, production Supabase Auth infrastructure and exact-owned cleanup.

## Starting authority and baseline

Start from closed Sprint 035G branch `codex/035G-correction-preview-callback-and-synthetic-otp-reproof` at exact clean local/remote SHA `bfd4fc494d68a0f53d6c0f5f40c8fd4c8bec7059` and outcome `synthetic-preparation-blocked-clean`.

Create only `codex/035H-protected-single-run-authentication-acceptance-harness`. Do not reopen or rewrite Sprint 035 through 035G.

Preserve:

- approved Supabase project `uvskssaecdhxcgytkasc`, never old project `tagnbgkroihagjmvehlx`;
- Ready alias-free correction Preview `dpl_J7bSHyQ8heNrqHWw38GdFNvpaaK4` at `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app`;
- exact callback set containing unchanged production plus `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app/auth/callback` only;
- production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` and five stable aliases;
- Resend hosted integration, exact sender, one-token/no-link OTP template, six-digit length, `3600`-second expiry and accepted rate-limit classifications;
- the three preserved identities, with no mutation or deletion authority;
- exact-owned starting application/Auth/Storage `0/0/0` and no open ownership/send ledger;
- Participants A/B/C blocked.

## Required architecture

Build one top-level protected runner and one operator entry command. After the operator supplies or unlocks protected prerequisites privately, the runner owns the complete lifecycle without conversational handoffs.

The runner must contain these isolated capabilities:

1. Exact-target and invariant preflight.
2. Exact-owned no-email Auth preparation.
3. Durable run/ownership/send state machine.
4. Exact-Preview browser or equivalent application-path driver.
5. Protected mailbox adapter for the actual dedicated test-mailbox provider.
6. In-memory OTP validation and recovered-code verification.
7. Exact-Preview session, bootstrap and permission assertions.
8. Cleanup/recovery controller with Auth-last proof.
9. Sanitized allowlisted reporter.

Use the provider's supported read-only mailbox API with OAuth or an equivalently protected signed-in provider mechanism. Store long-lived mailbox authorization only in an OS/provider secure credential store. Password-based IMAP, mailbox passwords in environment variables, `.env` files, command arguments, repository files, browser automation output or conversation are prohibited.

If supported programmatic protected mailbox access cannot be established, close before preparation or send as `protected-mailbox-automation-authority-pending-clean`. Do not fall back to manual mailbox opening, code copying, agent-visible OTP entry or repeated browser prompts.

## Durable one-send state machine

Persist only the minimum recovery-safe protected ledger with restricted local ACLs. It may contain run ID, approved project/Preview fingerprints, recipient keyed digest, exact-owned Auth identifier, state, request/verification counters and cleanup state. It must never contain the address, OTP, mailbox message contents, access/refresh tokens, cookies, service-role value or raw provider output.

Required states:

- `preflight`
- `prepared`
- `send-reserved`
- `send-observed`
- `message-acquired`
- `verification-reserved`
- `verification-observed`
- `cleanup-required`
- `clean`
- `recovery`

Write `send-reserved` durably before the application request. Once that state exists, request count can never return to zero and the run can never send again, even after crash or ambiguous response. Write `verification-reserved` before verification; it likewise forbids a second submission. Any restart from `send-reserved` or later is cleanup-only unless deterministic evidence proves the reserved action never crossed the application boundary and the sprint files explicitly permit continuation; live ambiguity always resolves to cleanup-only.

## Protected-data and observability boundary

The address, OTP, mailbox content, message identifiers, headers, OAuth material, service-role value, Auth identifier, cookies and session tokens remain inside the protected process for the minimum necessary time and are zeroed/released after use.

Disable screenshots, video, tracing, HAR, browser history persistence, clipboard use, downloads, console dumps and unrestricted network logging for the live run. Never put protected values in URLs, filenames, process arguments, environment files, durable logs, test output, planning files or conversation.

Output is a strict schema of allowlisted booleans, counts and classifications. Any unexpected output field or protected-pattern match terminates reporting and enters cleanup.

## Approved actions

- Implement and deterministically test the protected runner, state machine, mailbox-adapter contract, exact-Preview driver, sanitizer and recovery/cleanup controller.
- Establish one protected read-only mailbox authorization for the dedicated non-personal test mailbox through an operator-private OAuth/MFA interaction, stored only in the approved secure credential store.
- Perform unlimited credential-free deterministic fake-adapter tests without email or external mutation.
- After every build/readiness gate passes, perform exactly one live top-level run with one fresh exact plus-address, one OTP request and one verification submission.
- Poll only the dedicated test mailbox, only for the bounded run window, and select only one exact-recipient, expected-sender, expected-branch message newer than the send boundary.
- Exercise recovered-code behavior through a fresh application context; do not verify in the original request context.
- Prove exact Preview session/portal/bootstrap/dashboard/permission/RLS behavior.
- Clean exact-owned state Auth-last on every terminal live path.
- Apply narrow deterministic harness, adapter, validator, reporter, formatting or encoding corrections within this architecture.
- Update sprint review and canonical lifecycle evidence.

## Out of scope

- Manual OTP entry, manual mailbox inspection during a run, copied codes, agent-visible protected values or another multi-window handoff.
- More than one live OTP request or one live verification submission in Sprint 035H.
- Participant A/B/C work, messages, fixtures or acceptance.
- Production deployment, alias mutation, callback mutation, DNS, Resend, sender, template, OTP length/expiry, rate-limit, signup-policy, key or unrelated provider mutation.
- Schema, migration, RPC, RLS, role, permission, dashboard, horse, clinical or product behavior changes.
- Deletion or mutation of any preserved identity.
- General-purpose mailbox reader, inbox export, historical mailbox scan or message retention.
- Commit, push, PR, merge, `develop` mutation or history rewrite without separate explicit user authority.
- Trainer-pilot completion or product-wide Done claims.

## Evidence-Proportional Execution and manual intervention

Stop only for material target, authority, secret/protected-data, mailbox isolation, one-send integrity, authentication, permission/RLS, production, scope or cleanup risk. Substitute equivalent or stronger safe evidence when a supporting tool is unavailable, but never substitute metadata for the required delivered-message/session boundary or weaken the protected mailbox/one-send boundary. Keep deterministic harness, adapter, credential-store integration, validator, reporter, formatting and encoding corrections in 035H.

Manual intervention is limited to the one-time private authorization/unlock needed for the dedicated mailbox and protected runner launch. Record the blocked fact, evidence checked, exact private action, prohibited disclosures and subsequent verification. The live journey itself must remain single-run and automated; if it cannot, stop before send.
