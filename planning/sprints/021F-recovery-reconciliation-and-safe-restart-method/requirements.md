# Sprint 021F - Recovery Reconciliation And Safe Restart Method Requirements

## Objective

Correct the stale Sprint 021E recovery record, close abandoned run `021E-RLS-20260720-01` as **blocked-clean**, and create a durable PowerShell-first method for any later authenticated-proof attempt. This sprint is cleanup documentation, evidence reconciliation, and local harness/process hardening only. It must not restart authenticated proof.

## Workflow Profile

`strict`

Authentication, protected credentials, synthetic identities, callbacks, and remote cleanup claims make strict evidence and secret-handling controls mandatory even though 021F is non-mutating.

## Authoritative Recovery Facts

- Candidate is exactly `uvskssaecdhxcgytkasc`; protected old project is `tagnbgkroihagjmvehlx`.
- The abandoned run is `021E-RLS-20260720-01` and must never be reused.
- The candidate Admin API authoritatively returned zero Auth users.
- Candidate application/run-owned record counts were zero and Storage bucket count was zero.
- No identity or application deletion was necessary because no persistent run-owned state existed.
- Candidate Site URL is `https://precisionperformance.com.au`.
- The sole callback is `https://precisionperformance.com.au/auth/callback`; localhost callback is absent.
- The secret key used for recovery existed only in process memory and was cleared. No plaintext `.env`, credential document, or repository secret was created.
- The user-supplied personal address and every address disclosed in conversation are prohibited for later proof.
- Authenticated proof did not start and no positive, denial, route/RLS, callback-session, fixture, or revocation result passed.

Builder must corroborate these facts from existing evidence and, where a current check is needed, use read-only sanitized aggregate checks only. A contradictory dashboard estimate is not authoritative over the Admin API.

## Required Outcome

Close 021F as **recovery-reconciled — 021E blocked-clean** only when:

1. every stale claim that ten identities remain is corrected;
2. 021E is classified `blocked-clean`, with authenticated proof explicitly not started;
3. the run ID is permanently retired;
4. production-only callback restoration and zero owned-state evidence are named;
5. no secret or private address appears in durable files or Git diff;
6. a reusable mailbox and protected-process runbook is complete;
7. later proof is deferred to a separate Architect Pack, no earlier than Sprint 021G.

## Safe Credential Method

- Builder performs commands itself through PowerShell or the available execution tools. Do not instruct the operator to paste command blocks or run routine commands.
- Prefer an existing signed-in Supabase session or a system credential store for secret acquisition. Secret values may exist only in process memory for the minimum operation and must be cleared immediately afterward.
- Never store a secret/service-role key, OTP, magic link, cookie, session token, or mailbox password in `.env`, `.env.local`, repository files, planning records, shell command arguments, transcripts, screenshots, clipboard instructions, or an unencrypted document elsewhere on disk.
- A publishable key may be public by product design, but still must not be reproduced in evidence or conversation. Treat accidental interactive entry as a process failure, not proof of secret-key compromise.
- Every future tool must emit allowlisted status fields and aggregate counts only.
- Later remote mutation requires exact candidate equality, old-project refusal, a fresh run ID, ceilings, an ownership ledger, compensation, Auth-last cleanup, and final zero verification.

## Suitable Test Mailbox Standard

The mailbox must be newly created, non-personal, dedicated to Precision Performance testing, operator-accessible, protected by a unique password and MFA, and able to receive plus-address aliases. It must not be a real customer/staff mailbox or an address already disclosed in conversation or durable files.

Create it outside this sprint's evidence trail:

1. Open a private browser window and choose a reputable provider that documents plus addressing; Gmail is acceptable.
2. Create a new account with a neutral test-only name that contains no customer, horse, clinical, or personal data.
3. Use a unique password stored in the operator's password manager and enable MFA; never place either value in the project.
4. Sign in and send one ordinary test message from another account; confirm receipt.
5. Send a second message to a plus alias formed by inserting `+alias-test` before `@`; confirm it reaches the same inbox.
6. Confirm the mailbox can remain accessible for the full proof and cleanup window.
7. Record only `test_mailbox_ready=yes`, `plus_alias_verified=yes`, provider class, verification date, and operator role. Do not record the address.
8. If plus addressing fails, abandon that mailbox for this purpose and select another provider. Do not improvise ten unrelated personal addresses.

Mailbox creation and provider verification are inherently operator-owned because they require account ownership, password/MFA handling, and provider terms. Builder must perform every repository, PowerShell, runtime, API, verification, and cleanup action itself. A later sprint may request only the sanitized readiness statement; it must never request the address or protected mailbox contents in conversation.

## Approved File Set

Builder may update only:

- `planning/reviews/021E-authenticated-proof-manifest.md`
- `planning/reviews/021E-authenticated-proof-results.md`
- a new `planning/reviews/021F-recovery-reconciliation-and-safe-restart-method.md`
- `docs/SPRINT_021_PROGRESS.md`
- a new `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`
- the applied 021F acceptance file for evidence annotations
- `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, and `planning/ARCHITECT_BRIEFING.md`
- directly relevant entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`
- `scripts/supabase-authenticated-proof-021E.mjs` and its focused self-test only if required to remove a false recovery assumption or make all mutating modes default-deny; no capability expansion is allowed.

## Validation

- Architect Pack check and exact applied-file matching.
- JSON parsing and canonical status/outcome wording checks.
- Search proves zero remaining claims that ten identities are pending or exist.
- Search proves the retired run is labelled abandoned/non-reusable.
- Secret/private-address scan includes tracked, untracked, and approved changed files; redact findings rather than printing matched values.
- If harness files change: syntax plus existing focused self-tests, including default non-mutation, missing-secret refusal, old/unexpected target refusal, retired-run refusal, and allowlisted output.
- Approved-file diff inventory and `git diff --check`.
- No technical or remote validation may be represented as newly rerun unless it actually was.

## Prohibitions

- authenticated testing, identity creation, OTP requests, fixtures, sessions, runtime callback proof, or a replacement run;
- callback changes, credential rotation, key creation, plaintext `.env`/credential storage, Auth identity mutation, or Storage mutation;
- application, authorization, schema, RLS, policy, helper, grant, seed, bootstrap, dependency, configuration, infrastructure, or migration change;
- migration 0013;
- deployment, production cutover, Vercel/DNS/billing change, public reopening, or protected old-project access/mutation;
- use of the personal address supplied in conversation or any disclosed address;
- commit, stage, push, or pull request unless separately requested.

## Manual Intervention Rule

If mailbox ownership or another genuinely protected operator action is required, record the blocker, evidence checked, exact operator steps, sanitized response, and Builder verification. Builder must not transfer routine PowerShell, repository, API, runtime, or cleanup work to the operator.
