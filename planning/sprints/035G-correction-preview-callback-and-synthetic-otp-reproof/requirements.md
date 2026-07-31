# Sprint 035G — Correction Preview Callback And Synthetic OTP Reproof

## Goal

Replace only the superseded temporary Preview callback with the exact Sprint 035F correction Preview callback, then perform one bounded exact-owned synthetic recovered-code authentication proof against that Preview and clean all Sprint-owned state Auth-last.

Target outcome: `correction-preview-synthetic-otp-proven-clean`.

## Workflow profile

Strict. This follow-up mutates shared Supabase Auth callback configuration and performs one live transactional OTP request against production authentication infrastructure.

## Starting authority and baseline

Start from completed Sprint 035F branch `codex/035F-resend-hosted-integration-and-trainer-pilot-completion` at exact clean local/remote branch-tip SHA `7c43712edc352e5e153e7962c5105569a9bfce8f`.

Create branch `codex/035G-correction-preview-callback-and-synthetic-otp-reproof`. Do not reopen or rewrite Sprint 035 through 035F.

Preserve these accepted facts:

- correction commit `566f308a0c6c1b104531afe22d89580d643f799a`;
- alias-free Ready Preview `dpl_J7bSHyQ8heNrqHWw38GdFNvpaaK4` at `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app`;
- exact new callback `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app/auth/callback`;
- superseded callback belongs to prior Preview `dpl_9HDfeHLHJgcU6TzZqAR9vGEHzEYb` and must be identified from protected current readback, not guessed;
- production Site URL and production callback remain unchanged;
- production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, and five stable aliases remain unchanged;
- Resend hosted integration, sender, OTP template, OTP length `6`, expiry `3600`, rate limit and preserved identities remain unchanged;
- exact-owned pre-run application/Auth/Storage state is `0/0/0` and the ownership ledger is absent;
- Participants A/B/C remain blocked.

## Approved actions

- Read-only target, callback, deployment, provider, identity and clean-state preflight.
- Replace exactly the superseded temporary Preview callback with the exact 035F correction Preview callback.
- Independent post-save readback proving exactly the unchanged production callback plus the new correction Preview callback, with no wildcard or stale Preview callback.
- Fresh exact-owned, already-confirmed synthetic preparation through the existing guarded no-email helper and private operator input path.
- Exactly one OTP request through the exact correction Preview after all gates pass.
- Protected delivery confirmation limited to intended synthetic recipient, one six-digit OTP, zero links and no invitation/confirmation branch.
- Deliberate client-state loss followed by `Already have a code?` private re-entry and exactly one verification submission without another send.
- Sanitized session, landing, permission and dashboard proof, or one allowlisted diagnostic category on failure.
- Dependency-safe exact-owned cleanup with session revocation, application deletion and Auth deletion last, followed by absence proof and ledger removal.
- Focused deterministic harness, validator, reporter, formatting or encoding corrections that do not change product/provider contracts.
- Planning, review, status, schedule, evidence-index and briefing closeout updates.

## Out of scope

- Participant A, B or C authentication, messages, fixtures, access or acceptance.
- A second OTP request, resend, supersession, retry with the same or another synthetic identity, or participant fallback.
- Production deployment, alias assignment/change, rollback deployment, DNS, Resend integration, sender, template, OTP length/expiry, rate-limit, signup-policy, key or unrelated provider mutation.
- Production Site URL or production callback mutation.
- Schema, migration, RPC, RLS, role, permission, dashboard, horse, clinical or product behavior changes.
- Deletion or mutation of Participant A or either ambiguous preserved identity.
- Merge, PR, `develop` push, production push or history rewrite.
- Commit or branch push without a separate explicit user request.
- Product-wide Done or trainer-pilot completion claims.

## Protected-data boundary

Never request, display, record or transmit passwords, MFA codes, API keys, service-role values, participant addresses, synthetic addresses, OTP values, Auth identifiers, provider message identifiers, mailbox headers or raw provider errors. Private operator input stays in the protected execution surface. Durable evidence may contain only sanitized classifications, hashes already permitted by the guarded helper, counts and allowlisted diagnostic categories.

## Evidence-Proportional Execution and manual intervention

Stop only for a material wrong-target, authority, protected-data/secret, callback integrity, authentication, production, scope or cleanup boundary. Use equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep deterministic harness, validator, reporter, formatting and encoding corrections in 035G. Do not repeat a failed action blindly and do not create another sprint solely because an optional browser, renderer, CLI or metadata view is unavailable.

Manual intervention is last. If genuinely required, record the blocked fact, evidence checked, exact private operator steps, prohibited disclosures and what Builder will verify afterward. Callback mutation and OTP execution must not proceed through manual guesswork.
