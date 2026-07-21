# Sprint 020G New Project Manifest

## Confirmed Candidate Identity

- Organization: rankin007's Org
- Organization identifier: hohxquwkfehiuyrysufu
- Project name: Precision Performance Clean Rebuild
- Region: ap-southeast-1
- Classification: replacement production candidate; not production before cutover acceptance
- Joint project administrators: Randell Rankin and Philip Rankin
- Joint maintenance owners: Randell Rankin and Philip Rankin
- Joint rollback owners: Randell Rankin and Philip Rankin
- Rollback project: tagnbgkroihagjmvehlx

## Accepted Clean Start

No legacy public rows, Auth users/identities/MFA/sessions, Storage buckets/objects/metadata, or seven remote-only public surfaces will be migrated. Only repository-defined structure/reference seeds and current required protected hosted configuration/secrets may be recreated.

## Historical Pre-Creation Billing Gate

Historical status: this section records the pre-creation billing check. Current identity and link status are recorded in later sections.

User-reported billing presentation:

- Plan: Free
- Recurring price: none displayed
- Additional compute charge: none displayed
- Immediate charge: none displayed
- Currency amount: none displayed

The user approved exactly one candidate creation on that basis. Any non-zero or additional billing presentation is a stop condition. Project creation does not authorize Vercel/environment changes, redeployment, or production cutover.

Evidence checked:

- Supabase CLI account metadata confirms the organization.
- At the pre-creation check, the read-only project listing reported zero projects named Precision Performance Clean Rebuild.
- At that pre-creation check, old project tagnbgkroihagjmvehlx was linked, ap-southeast-1, and ACTIVE_HEALTHY.
- The in-app browser runtime reported no available browser session, so the protected project-creation screen and its exact billing presentation could not be inspected.

Historical operator action:

1. Make an authenticated in-app browser session available to Builder and return with confirmation that it is ready; do not paste credentials or billing secrets.
2. Alternatively, open Supabase Dashboard, choose New project, select rankin007's Org, enter Precision Performance Clean Rebuild, select ap-southeast-1, and stop before any create/confirm action.
3. Report only the visible plan name, currency, recurring cost, additional compute cost, and immediate charge; do not provide passwords, tokens, keys, or connection strings.
4. Do not submit the form.

This action was completed and is retained only as historical evidence; it is not a current instruction.

## Historical Protected Creation Intervention

Historical blocker: Builder could not safely submit project creation from that thread.

Evidence checked:

- The in-app Browser remains unavailable to the automation session.
- The supported CLI requires a database password in the --db-password command argument.
- Placing that secret in a command argument would violate the Sprint 020G secret-handling boundary.
- At that historical checkpoint, read-only verification reported candidate count zero and old project tagnbgkroihagjmvehlx linked, ap-southeast-1, ACTIVE_HEALTHY.

Historical operator action:

1. In the already-open protected Supabase creation form, reconfirm rankin007's Org, Precision Performance Clean Rebuild, ap-southeast-1, and Free.
2. Stop if the page shows any non-zero charge, paid plan, payment requirement, or new billing information.
3. Enter or generate the database password only inside the protected Supabase form; do not paste or send it to Builder.
4. Submit exactly once.
5. Wait for the project page to report a healthy/ready state.
6. Return only the safe project reference, display name, region, plan, and status. Do not send keys, passwords, tokens, URLs containing credentials, or connection strings.

This action was completed. Builder subsequently proved exactly one candidate, confirmed old-project health, and recorded the identity map. The text is retained only as historical evidence.

## Verified Candidate

- Project reference: uvskssaecdhxcgytkasc
- Display name: Precision Performance Clean Rebuild
- Organization: hohxquwkfehiuyrysufu
- Region: ap-southeast-1
- Plan: Free, as reported and approved at creation
- Status: ACTIVE_HEALTHY
- Repository linked to candidate: true
- Safe URL: https://uvskssaecdhxcgytkasc.supabase.co

Read-only verification found exactly one matching candidate. Old project tagnbgkroihagjmvehlx remains unlinked, ap-southeast-1, ACTIVE_HEALTHY, unchanged, and available for rollback.

## Repository Manifest

- Migration versions: 0001 through 0010, lexical execution order.
- 0010 hash: 0915AD24DEFA6754C4F198B7E9C816041A9CBEE3E055FD4F8487D599DCB8E8B5.
- Generated bootstrap hash after EOF normalization: 27CFEF62DD43858F70108A84011570E35A766A24CDFE3D14D31C27F8EEC8E212.
- Expected application tables: 33.
- Expected helper functions: 11.
- Expected biochemistry lookup rows: Carbs 151, pH Average 521, Salts 801, Urea 301; total 1774; duplicate keys zero.
- Expected retired legacy surfaces: zero.
- Migration ledger: one truthful remote record for each version 0001-0010, verified.
- Migrated structure: 33 public tables, all 33 RLS-enabled, 78 policies, 11 secured helpers.
- Deterministic lookup result: 1774 total, exact 151/521/801/301 groups, duplicate keys zero.
- Retired legacy/Auth/Storage content: zero.

## Config Scope Clarification

The user narrowly expanded the approved file set to include supabase/config.toml. The only authorized change moves enable_confirmations = true from auth to auth.email, preserving its value and intended confirmation behavior. All other configuration must remain byte-for-byte equivalent apart from the section placement and necessary blank line.

## Exact Hosted-Configuration Manifest

| Setting | Required value or sanitized state | Repository/current-state evidence | Timing | Verification |
|---|---|---|---|---|
| Candidate project | uvskssaecdhxcgytkasc / ACTIVE_HEALTHY | Exact CLI identity and health checks | Already established | Read-only project list equality |
| Site URL | https://precisionperformance.com.au | Canonical production alias in docs/DEPLOYMENT.md; candidate dashboard saved this exact value | Changed 2026-07-20 | Dashboard success notification and exact sanitized field value |
| Redirect allowlist | Exactly https://precisionperformance.com.au/auth/callback | app/auth/actions.ts builds origin + /auth/callback; candidate began with no redirect URLs | Changed 2026-07-20 | Exact sanitized callback saved to the candidate allowlist |
| Auth provider | Email enabled; application uses Email OTP/magic-link only | app/auth/actions.ts uses signInWithOtp | Confirmed 2026-07-20 | Email enabled; Phone, SAML, Web3, all listed OAuth providers, and custom providers disabled/absent |
| Email confirmations | Enabled | supabase/config.toml auth.email.enable_confirmations = true | Confirmed 2026-07-20 | Candidate dashboard `Confirm email` control checked |
| Leaked-password protection | Disabled under explicit Free-plan exception | Feature is unavailable on Free; application uses Email OTP/magic-link and has no password sign-in flow | No change; do not upgrade | Verify disabled state; any future password-auth feature reopens this control |
| Exposed API schemas | Exactly `graphql_public` and `public` | `public` is required by the current application; `graphql_public` is Supabase-managed; no current application GraphQL dependency exists | Accepted current state; no mutation made for this decision | No additional custom exposed schema is authorized; any future application GraphQL feature requires separate review |
| Candidate project URL | https://uvskssaecdhxcgytkasc.supabase.co | Platform-generated safe project identity | Already established | Safe hostname/reference equality |
| Replacement publishable key | Present; value prohibited from durable evidence | Required future client credential; protected consumption not yet reviewed | Sprint 020G containment confirmed | Presence only; do not inspect or copy during closeout and do not copy to Vercel |
| Replacement secret key | Present; value prohibited from durable evidence | Required future protected server credential; protected consumption not yet reviewed | Sprint 020G containment confirmed | Presence only; do not inspect or copy during closeout and do not copy to Vercel |
| Legacy anon key | Disabled | Credential-incident containment | Completed | Sanitized enabled/disabled state only |
| Legacy service_role key | Disabled | Credential-incident containment | Completed | Sanitized enabled/disabled state only |
| Production Supabase URL/key environment values | Remain pointed at old project | Production cutover explicitly unauthorized | Deferred to cutover | No Vercel/environment mutation now |
| Custom SMTP/provider secrets | Not configured or invented in this gate | No approved provider or secret source exists | Deferred unless separately approved/evidenced | Confirm no custom SMTP/provider was added |
| OAuth providers | None enabled | No repository-supported OAuth flow exists | Do not enable | Sanitized enabled-provider names |
| Storage buckets/objects | Zero | Clean-start decision and post-migration counts | No change; uploads remain out of scope | Read-only zero counts |

Candidate API keys are platform-generated credentials tied to the new Supabase project. They are not additional application/provider secrets and must not be copied into Vercel until the separately approved cutover. Application/provider secrets are independently supplied credentials such as SMTP or third-party provider secrets; none are proven or authorized at this gate.

### Exact Dashboard Instructions

1. Open Supabase project uvskssaecdhxcgytkasc and reconfirm the displayed project reference before editing.
2. In Authentication URL Configuration, set Site URL to https://precisionperformance.com.au.
3. Set the redirect allowlist to exactly https://precisionperformance.com.au/auth/callback; remove placeholder/example callback entries from the candidate.
4. In Authentication Providers, enable Email and leave unsupported OAuth providers disabled.
5. Configure Email for OTP/magic-link use and enable email confirmations.
6. Leave leaked-password protection disabled; do not upgrade the Free plan or incur a charge.
7. In API settings, verify exposed schemas are exactly `graphql_public` and `public`; make no Data API configuration mutation for this accepted decision.
8. Confirm candidate-generated public and service-role/secret API keys are present without opening, copying, rotating, or reporting their values.
9. Do not configure custom SMTP/provider secrets, create Storage buckets, or change Vercel/production environment values.
10. Return only: exact site URL, exact redirect URL list, enabled provider names, email-confirmation enabled/disabled, leaked-password protection enabled/disabled, exposed schema names, candidate public key present/missing, candidate service-role/secret key present/missing, custom SMTP present/absent, and OAuth provider names.

Builder will compare the sanitized response to this manifest, verify metadata through supported read-only paths where possible, rerun security advisors, and proceed to synthetic Auth/RLS test planning. Production cutover remains unauthorized.

Security exception owners: Randell Rankin and Philip Rankin. The exception is invalidated immediately if password authentication is proposed or implemented.
## Hosted-Configuration Verification Result

Historical hosted-configuration checkpoint: protected dashboard verification on 2026-07-20 confirmed candidate `uvskssaecdhxcgytkasc`, organization `hohxquwkfehiuyrysufu`, project name `Precision Performance Clean Rebuild`, region `ap-southeast-1`, healthy status, and Free plan. The canonical Site URL and sole callback were saved. Email and email confirmation were enabled. Phone, SAML, Web3, every displayed OAuth provider, and custom providers remained disabled or absent. Leaked-password protection remained disabled without an upgrade. Historical record correction: an earlier summary said Data API exposure was reduced to `public` only; the accepted and verified current state is exactly `graphql_public` and `public`, and no Data API configuration mutation was made for this decision. At this checkpoint no API-key value had been opened or copied. The later credential incident and containment supersede that checkpoint for current credential status. No custom SMTP, Storage, billing, Vercel, production environment, deployment, or old-project change occurred.

After these changes, the security linter was rerun and reported 0 errors, 11 warnings, and 0 informational suggestions. The 11 warnings are the already accepted authenticated-helper findings recorded in `020G-security-disposition.md`.

## Closeout Hosted State And Credential Incident

Confirmed sanitized operator state at closeout:

- Site URL: `https://precisionperformance.com.au`.
- Callback allowlist: only `https://precisionperformance.com.au/auth/callback`.
- Temporary localhost callback: removed.
- Exposed schemas: exactly `graphql_public` and `public`.
- Free-plan/passwordless leaked-password exception: unchanged.
- Replacement publishable key: present.
- Replacement secret key: present.
- Legacy anon key: disabled.
- Legacy service_role key: disabled.
- Billing or charge: none.

Incident record: browser inspection retained legacy candidate credential material. Execution stopped before harness execution, runtime startup, Auth identity creation, or fixture creation. The affected credential-containing Builder task was deleted; the current Architect/review task was retained. No credential value or fragment is reproduced. Closeout did not inspect an API-key page or attempt value verification.

Outcome: Sprint 020G is candidate-ready, not cutover-complete. Candidate and old project were last confirmed `ACTIVE_HEALTHY`; production cutover remains unauthorized.
