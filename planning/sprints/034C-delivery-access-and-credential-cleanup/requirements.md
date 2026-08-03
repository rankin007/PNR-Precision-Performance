# Sprint 034C — Delivery Access And Credential Cleanup

## Outcome

Apply the recommended cleanup policy to delivery/operator access and credentials: inventory first; rotate before revoke where continuity matters; verify replacement access; then remove only access proven obsolete. Create `docs/change password.md` as a non-secret rotation register and leave one least-privilege, recoverable delivery path with truthful ownership.

The target outcome is `delivery-access-and-credential-cleanup-complete-clean`.

“Manual authentication” in this sprint means human delivery/operator authentication to repository, hosting, database/provider, DNS or related operational control planes. It does not mean removal, disabling, bypassing or replacement of trainer sign-in. Trainer authentication, trainer identities, participant access and application Auth behavior must remain unchanged.

## Workflow profile and starting authority

Use `strict` controls because this work may touch credentials, account access, provider configuration and external systems. Start from the strongest clean, remotely backed-up product lineage established by Sprint 034 and reconcile any later accepted closeout before mutation. Read `AGENTS.md`, `planning/STATE.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md` when present, `docs/OPERATIONS_HANDOFF.md`, `docs/DEPLOYMENT.md`, `docs/ENVIRONMENT.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, and current provider/repository ownership evidence.

Do not use the dirty root, file recency, a proposed Pack, an unverified branch or a remembered login as authority. Do not inspect or reproduce secret values while establishing the inventory.

## Recommended cleanup policy

For every delivery/operator authentication surface in scope:

1. Record the system, purpose, owner/custodian, authentication class, recovery owner, last verified date and proposed disposition without recording secret values.
2. Classify access as required-current, replacement-pending, obsolete-proven, ambiguous-retain, or trainer/application-auth-out-of-scope.
3. Prefer named human accounts, MFA, least privilege and provider-managed secret stores. Do not create shared plaintext credentials.
4. Where a credential or account must be replaced, establish and verify the replacement before revoking the predecessor unless evidence proves immediate revocation is required for containment.
5. Revoke, delete or disable only exact obsolete delivery/operator access whose ownership, dependencies and rollback implications are proven.
6. Retain ambiguous access unchanged, record the evidence gap and assign a manual intervention. Never delete to manufacture a clean result.
7. Re-read each mutated system and prove intended access, recovery and non-impact after every bounded change.

## Non-secret password rotation register

Create `docs/change password.md`. Despite its requested filename, it is a non-secret rotation register, not a password store or procedural invitation to paste credentials.

It must contain:

- an explicit prohibition on passwords, passphrases, tokens, API keys, cookies, recovery codes, MFA seeds, private URLs, secret identifiers and protected personal data;
- one row per delivery/operator system or credential class, using neutral labels rather than secret-bearing identifiers;
- system/service, purpose, owner/custodian role, authentication method class, MFA status, storage location class, rotation trigger or cadence, last-verified date, status/disposition, recovery owner, and sanitized evidence reference;
- `unknown` or `not verified` where evidence is unavailable—never invented dates or assurances;
- an incident rule requiring immediate containment through the provider’s supported controls when exposure is suspected, with secret-free evidence and follow-up verification;
- a clear statement that trainer sign-in and trainer account lifecycle are governed separately and are not cleanup targets in Sprint 034C.

The register may point to a password manager, provider secret store or named operational runbook by class/name only. It must never contain the protected value, a reusable authentication artifact, or instructions that expose one in chat, Git, logs or screenshots.

## Approved files and actions

Builder may:

- create the four Sprint 034C files and proportional sanitized review evidence;
- create `docs/change password.md` and narrowly update `docs/OPERATIONS_HANDOFF.md`, `docs/DEPLOYMENT.md`, `docs/ENVIRONMENT.md`, `.env.example`, `.gitignore`, and canonical planning/closeout files when evidence requires agreement;
- perform read-only inventories of repository, Vercel/hosting, Supabase/provider, DNS and other documented delivery/operator control planes;
- add or verify MFA, rotate operator/delivery passwords or credentials, confirm recovery, and revoke exact obsolete delivery/operator access only under the dependency-safe policy;
- use provider-supported interfaces and require the human operator to enter authentication material privately when agent-safe automation cannot do so;
- create a scoped branch/worktree, intentionally commit secret-free repository changes and push only that scoped branch when the established Sprint 034 lineage and current handoff require remote backup.

Every external mutation requires an exact target, pre-state, dependency/recovery plan, post-state reread and rollback or containment path. Mutation authority is limited to delivery/operator authentication cleanup described here; it does not extend to application authentication.

## Explicitly out of scope

- Removing, disabling, replacing or redesigning trainer sign-in, email OTP, magic-link, OAuth or other application authentication.
- Deleting or altering trainer, participant, customer, horse or stable identities/data.
- Auth/RLS, role, permission, assignment, schema, migration, RPC or application-source changes.
- Reading, copying, logging, committing or asking the user to disclose secret values or protected data.
- Production deployment, public-content change, DNS routing change, provider migration, billing change, product feature work or Core Product Done declaration.
- Blanket account deletion, speculative rotation, shared-account creation, force-push, history rewrite, broad reset, blanket staging or mutation of an unverified target.
- Removing the last verified recovery path or sole required operator before replacement access has passed.

## Evidence-proportional execution and manual intervention

Stop only for material target/ownership ambiguity, secret or protected-data exposure, destructive uncertainty, unauthorized scope expansion, trainer/application-auth impact, loss of required access, partial external mutation, security/integrity failure, production impact or cleanup that cannot be proven safe. Substitute equivalent or stronger safe evidence when a supporting tool is unavailable. Keep deterministic validator, reporter, formatting, encoding, documentation and non-product harness corrections inside Sprint 034C.

Manual authentication is expected when a provider requires a human delivery/operator to sign in, complete MFA, approve recovery or enter a replacement credential privately. Manual intervention is the last safe option for other issues. Record what is blocked, evidence checked, exact secret-free steps, and what Builder will verify afterward. Never request that the user paste authentication material into chat or repository files.
