# Sprint 035D Blueprint

## Delivery sequence

### 1. Open and inventory

- Verify baseline SHA, local/remote equality and clean worktree; create the scoped branch.
- Record Sprint 035D active without altering historical outcomes.
- Inspect the current Auth implementation and Supabase SSR/session conventions before choosing client/server boundaries.
- Read current provider settings and templates through protected tooling. Record only sanitized configuration classifications and fingerprints.
- Establish the exact accepted production deployment and rollback deployment plus all five stable aliases.

### 2. Implement backward-compatible OTP support

- Retain `signInWithOtp` with `shouldCreateUser:false` and same-origin normalized destination.
- Provide a clear request state and an OTP-entry state with resend timing.
- Verify using the official Supabase email OTP method and existing session-cookie conventions.
- Keep email and OTP out of URLs. Prefer transient browser memory for the submitted email; if refresh loses it, return safely to email entry rather than persisting PII casually.
- Normalize only the post-authentication path, never an external destination.
- Return generic request and verification errors. Do not disclose identity existence.
- Do not bootstrap the application user or portal access until session verification succeeds.
- Keep the existing callback functional during rollout/rollback, with existing fail-closed behavior.

### 3. Local and Preview proof

- Add unit/integration coverage for request, verification, anti-enumeration, destination normalization, plus-address preservation and safe failure.
- Add a bounded synthetic harness that can prove unknown-user non-creation, prepared-user OTP verification, session establishment, portal entry, permission isolation and cleanup without emitting protected artifacts.
- Deploy the exact candidate to a fresh generated Preview with zero aliases.
- Add only its exact callback if still required for rollback compatibility; remove the superseded temporary Preview callback.
- Prove Preview build, origin, Auth boundary and `/portal` behavior.

### 4. Production-safe application release

- Before provider-template mutation, deploy the backward-compatible OTP-capable application to production.
- Verify apex, `www` and all accepted stable aliases map only to the new Ready deployment.
- Verify public marketing and protected-route safety, existing callback compatibility, health and rollback readiness.
- If this release fails, restore the prior Ready production deployment and stop without changing the provider template.

### 5. Reversible provider-template cutover

- Capture the existing Magic Link template through a protected method sufficient for exact restoration; store no secret or participant artifact. Durable evidence records only a sanitized fingerprint and restoration readiness.
- Change only the shared Magic Link template to one unambiguous email OTP presentation using the provider-supported token variable. Remove the direct `ConfirmationURL` action from that template.
- Do not change Confirm sign up or any unrelated template/configuration.
- Confirm the saved provider representation can restore the exact prior template.
- If the provider API/dashboard cannot establish exact target or rollback integrity, stop before mutation.

### 6. Synthetic runtime acceptance

- Prove an unknown synthetic inbox receives a generic application response and creates no Auth identity.
- Prepare one exact-owned synthetic Auth identity using the protected path.
- Request OTP through the deployed application, verify private recipient exactness, receive the delivered code through a protected mailbox path and enter it without exposing it to Builder logs or evidence.
- Prove the delivered message contains one intended OTP action and no clickable verification action.
- Prove successful session establishment and `/portal` entry on Preview; perform a minimal production-boundary sign-in smoke only with synthetic owned state if needed to validate the shared cutover.
- Prove incorrect, expired, reused, superseded and malformed codes fail safely. Use provider-supported shortened expiry/test controls or equivalent evidence; do not wait unnecessarily when stronger deterministic proof exists.
- Clean application records first and Auth last; prove synthetic owned `0/0/0`.
- On any material failure after template cutover, restore the prior template and, if necessary, the prior production deployment, then prove restoration.

### 7. Sequential participant pilot

- Guardedly reverify A. Preserve exact plus-address matching and sanitized reporting.
- A requests one new OTP, privately confirms the newest message is addressed to the intended complete identity, enters the code once, and reports only sanitized host/path/session/error status.
- Verify A reaches the exact Preview `/portal`, sees only permitted synthetic horses/workflow state, opens the assigned horse, follows the permitted action and returns oriented to the dashboard.
- Reconcile and clean A-owned application access before B unless retained state is explicitly required for the bounded group pilot.
- Repeat for B, then C, only after the preceding participant passes and ownership is unambiguous.
- Obtain phone-first coverage for each and at least one tablet or desktop pass across the group.
- Do not coach past a product defect or treat Builder/synthetic activity as participant acceptance.

### 8. Cleanup and closeout

- Remove exact-owned synthetic and pilot application records dependency-safely.
- Remove Sprint-owned Auth identities last; preserve pre-existing identities and remove only exact-owned tags/access.
- Confirm Storage remains zero.
- Remove the exact temporary Preview callback when no longer required.
- Clear protected mappings/sessions and confirm parent secret environment absent.
- Prove exact-owned application/Auth/Storage `0/0/0`, except any explicitly preserved pre-existing Auth identity classified not-owned with zero Sprint access.
- Reverify production deployment, provider template fingerprint, Site URL/callback and five stable aliases.
- Refresh state, status, schedule, evidence index and Architect briefing.

## Rollback

Rollback must be executable before template cutover:

1. Restore the exact captured Magic Link template.
2. Confirm its sanitized fingerprint matches the pre-cutover fingerprint.
3. Restore the accepted prior Ready production deployment if application rollback is required.
4. Reverify all five stable aliases, public/protected route safety and provider configuration.
5. Revoke/clean exact-owned synthetic or participant state Auth-last.
6. Record the failure without claiming participant acceptance.

## Approved file areas

Builder may edit only the minimum files in:

- `app/auth/**` and existing sign-in/portal authentication UI;
- `lib/auth/**`, `lib/supabase/**` or equivalent existing Auth helpers where required;
- focused tests and `scripts/**` for Sprint 035D guarded proof/cleanup;
- `planning/sprints/035D-prefetch-resistant-email-otp-authentication/**`;
- Sprint 035D review evidence and current planning/status/briefing indexes required for lifecycle updates.

Stop for schema/migration/RLS/role changes, unrelated application rewrites or any file area whose mutation materially expands the approved outcome.
