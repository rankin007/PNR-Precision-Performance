============================================================
FILE: planning/sprints/034C-delivery-access-and-credential-cleanup/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/034C-delivery-access-and-credential-cleanup/blueprint.md
============================================================

# Sprint 034C Blueprint

## Delivery sequence

1. Verify the exact clean starting lineage, branch, SHA and current Sprint 034 lifecycle authority in a scoped worktree.
2. Present the exact file plan, external systems, proposed mutations, scope guards and acceptance criteria at the Builder code gate before editing files or mutating external state.
3. Build a sanitized delivery/operator access inventory without opening protected local files or emitting values.
4. Separate trainer/application authentication as out of scope and prove the planned cleanup has no trainer dependency.
5. Create `docs/change password.md` with the required non-secret fields and explicit prohibited-content warning.
6. For each in-scope surface, classify access as required-current, replacement-pending, obsolete-proven or ambiguous-retain.
7. Establish and verify replacement access and recovery before predecessor revocation wherever continuity matters. Use private human authentication only when required by the provider.
8. Remove only exact obsolete delivery/operator access. Reread the provider after each mutation and prove least-privilege current access, recovery and trainer/application non-impact.
9. Run repository validation, a secret/private-data scan of the exact diff and staged set, link/path checks, `git diff --check`, and proportional authenticated/public non-regression checks that require no protected evidence retention.
10. Refresh the Sprint 034C review and canonical state, status, lifecycle, schedule, evidence index and Architect briefing. Commit intentionally and remotely back up only the scoped branch if current lineage policy requires it.

## Mutation gates and rollback

Treat each external system as a separate bounded stage. Record sanitized pre-state; prove the exact target and dependent workflows; identify the retained/replacement operator and recovery path; mutate one exact item; reread; then continue. If post-state is unexpected, stop further mutations, use the supported rollback or containment path, and record a complete secret-free intervention.

Trainer sign-in is a protected non-target. A provider control that also governs trainer authentication must not be mutated under this sprint unless the delivery/operator change is demonstrably isolated. Otherwise classify it ambiguous-retain and stop that item without blocking safe independent cleanup.

## Permitted outcomes

- `delivery-access-and-credential-cleanup-complete-clean`
- `delivery-access-cleanup-complete-ambiguous-items-retained-clean`
- `delivery-access-ownership-blocked-clean`
- `delivery-access-recovery-blocked-clean`
- `delivery-access-cleanup-partial-mutation-blocked`
- `trainer-auth-impact-risk-blocked-clean`

============================================================
FILE: planning/sprints/034C-delivery-access-and-credential-cleanup/acceptance.md
============================================================

# Sprint 034C Acceptance

## Baseline and inventory

- [ ] Work starts from the exact clean, remote-backed Sprint 034 authority in a scoped branch/worktree; any later accepted lineage is explicitly reconciled.
- [ ] Every in-scope delivery/operator authentication surface has a sanitized owner, purpose, method class, recovery owner, last-verified state and supported disposition.
- [ ] Required-current, replacement-pending, obsolete-proven and ambiguous-retain classifications are evidence-backed.
- [ ] Trainer sign-in, trainer identities and application Auth behavior are expressly classified out of scope and unchanged.

## Non-secret register

- [ ] `docs/change password.md` exists and clearly states that no secret or protected value may be stored there.
- [ ] The register contains the required system, ownership, authentication-class, MFA, storage-class, rotation, verification, disposition, recovery and evidence fields.
- [ ] Unknown facts remain visibly `unknown` or `not verified`; no date, owner, MFA state or recovery assurance is invented.
- [ ] The register contains no password, token, key, cookie, recovery code, MFA seed, private URL, secret identifier or protected personal data.
- [ ] The register distinguishes delivery/operator rotation from trainer sign-in and trainer account lifecycle.

## Cleanup and access continuity

- [ ] Replacement access and recovery are verified before predecessor revocation wherever continuity matters.
- [ ] Only exact obsolete-proven delivery/operator access is removed, revoked or disabled.
- [ ] Ambiguous access is retained unchanged with a documented evidence gap and owner/intervention.
- [ ] Named human access, MFA and least privilege are used where supported; no shared plaintext credential is created.
- [ ] Post-mutation rereads prove intended current access and recovery without exposing protected values.
- [ ] No trainer sign-in, Auth/RLS, role, permission, assignment, schema, application behavior, production deployment, DNS routing, billing or product data changes occur.

## Validation and closeout

- [ ] Exact diff and staged-set scans pass for secrets, protected data, generated artifacts and excluded files.
- [ ] Maintained repository validation relevant to changed files, link/path checks and `git diff --check` pass using equivalent safe evidence where appropriate.
- [ ] Proportional public and authenticated non-regression evidence shows cleanup did not remove trainer access or alter production behavior.
- [ ] Every external mutation has sanitized pre-state, exact target, reason, post-state and rollback/containment evidence.
- [ ] Review and canonical closeout records agree on one permitted outcome and list every retained ambiguity or manual intervention.
- [ ] Any commit/push is intentional and limited to the scoped Sprint 034C branch; no merge, `develop` push, PR, deployment or force-update occurs.

============================================================
FILE: planning/sprints/034C-delivery-access-and-credential-cleanup/handoff-prompt.md
============================================================

You are Builder for Sprint 034C — Delivery Access And Credential Cleanup.

Start in the Precision Performance repository and assume the Builder role. Read `templates/method/120x-agent-identity.md`, `AGENTS.md`, and the current Sprint 034 lineage/lifecycle authorities. Start only from the strongest clean, remotely backed-up product lineage established by Sprint 034, explicitly reconciling any later accepted closeout. Create a scoped Sprint 034C branch/worktree. Apply `planning/architect-packs/architect-pack-034C-delivery-access-and-credential-cleanup.md`, verify it generates exactly four files under `planning/sprints/034C-delivery-access-and-credential-cleanup/`, and execute only from those generated files.

Before editing any file or mutating external state, read all four generated files plus current state, lifecycle ledger, operations handoff, deployment, environment and Auth/RLS authority. Present the exact file-by-file plan, each external system and proposed mutation, scope guards and acceptance criteria, then wait for explicit approval at the Builder code gate.

Treat “manual authentication” only as human delivery/operator authentication to repository, hosting, database/provider, DNS or related operational control planes. Preserve trainer sign-in, trainer identities, participant access and application Auth behavior unchanged. Do not remove, disable, bypass, replace or redesign trainer authentication. If a shared provider control cannot be proven isolated from trainer authentication, retain it unchanged and record `trainer-auth-impact-risk-blocked-clean` for that item.

Build a sanitized inventory first. For each delivery/operator authentication surface, record system, purpose, owner/custodian role, authentication method class, MFA state, storage class, rotation trigger/cadence, last-verified date, disposition, recovery owner and sanitized evidence reference without reading or emitting protected values. Classify each item as required-current, replacement-pending, obsolete-proven or ambiguous-retain.

Create `docs/change password.md` as a non-secret rotation register. Put a prominent prohibition on passwords, passphrases, tokens, API keys, cookies, recovery codes, MFA seeds, private URLs, secret identifiers and protected personal data. Use `unknown` or `not verified` instead of inventing facts. State explicitly that trainer sign-in and trainer account lifecycle are separately governed and are not Sprint 034C cleanup targets. Reference password managers or provider secret stores only by neutral class/name; never include a reusable authentication artifact.

Apply the cleanup policy one bounded system at a time: inventory first; rotate before revoke where continuity matters; verify replacement access and recovery; then revoke, disable or delete only exact obsolete-proven delivery/operator access. Prefer named human accounts, MFA, least privilege and provider-managed secret storage. Retain ambiguous access unchanged. Record sanitized pre-state, dependency/recovery plan, exact target, post-state reread and rollback or containment evidence for every external mutation.

Use provider-supported controls. When a provider requires a human to sign in, complete MFA, approve recovery or privately enter a replacement delivery/operator credential, give secret-free steps and let the operator enter the material privately. Never ask for a password, token, code, cookie, key, mailbox value, private URL or protected configuration in chat, Git, logs, screenshots or evidence.

Do not change application source, Auth/RLS, roles, permissions, assignments, schema, migrations, trainer/customer/horse/stable data, production deployment, public content, DNS routing, provider platform, billing or product behavior. Do not delete the last verified operator or recovery path. Do not use blanket deletion, broad reset/staging, force-push, history rewrite, speculative rotation or an unverified target.

After cleanup, run maintained validation relevant to changed files, link/path checks, `git diff --check`, exact diff/staged secret and protected-data scans, and proportional public/authenticated non-regression proof. Substitute equivalent or stronger safe evidence when a supporting tool is unavailable. Keep deterministic documentation, validator, reporter, formatting and encoding corrections inside Sprint 034C.

Stop only for material target or ownership ambiguity, secret/protected-data exposure, destructive uncertainty, unauthorized scope expansion, trainer/application-auth impact, loss of required access, partial mutation, security/integrity failure, production impact or cleanup that cannot be proven safe. For manual intervention, record the blocked fact, evidence checked, exact secret-free user steps and what you will verify afterward.

At closeout create a concise Sprint 034C review and refresh canonical state, status, lifecycle ledger, schedule, evidence index and Architect briefing so they agree on one permitted outcome. Record retained ambiguities rather than hiding them. Commit intentionally and push only the scoped Sprint 034C branch if current lineage policy requires remote backup. Do not merge, push `develop`, open a PR, deploy or declare Core Product Done.
