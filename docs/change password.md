# Delivery/operator access and rotation register

> **Never place passwords, passphrases, tokens, API keys, cookies, recovery codes, MFA seeds, private URLs, secret identifiers or protected personal data in this file.** Do not paste reusable authentication material into chat, Git, commands, logs, screenshots or evidence. Use only provider-supported private entry and provider or OS secure storage.

This is a non-secret operational register despite its requested filename. It records delivery/operator authentication classes and sanitized verification only. Trainer sign-in, trainer account lifecycle, participant access and application authentication are separately governed and are not Sprint 034C cleanup targets.

## Sprint 033B named operational accountability

- Phillip Norman Rankin is the named business, support, privacy and incident owner for the local operational procedure.
- Randell Rankin is the named repository/platform custodian and migration, release and recovery operator for the local operational procedure.
- Rollback and restoration require joint approval from Phillip Norman Rankin and Randell Rankin.
- These named assignments do not verify provider access, MFA, recovery paths or any `ambiguous-retain` item below. All existing sanitized verification states and dispositions remain unchanged.

## Classification rules

- `required-current`: current delivery depends on the access class and no safe removal is proposed.
- `replacement-pending`: a replacement must be established and verified before predecessor revocation.
- `obsolete-proven`: the exact item is proven unnecessary and dependency-safe; removal still requires a separate mutation checkpoint.
- `ambiguous-retain`: ownership, dependency, recovery or exact target evidence is incomplete, so the item remains unchanged.
- `trainer/application-auth-out-of-scope`: the control is shared with or directly governs application authentication and is not a Sprint 034C cleanup target.

## Sanitized register

| System/service | Purpose | Owner/custodian role | Authentication method class | MFA state | Storage location class | Rotation trigger/cadence | Last verified | Status/disposition | Recovery owner | Sanitized evidence reference |
|---|---|---|---|---|---|---|---|---|---|---|
| GitHub repository | Source control and scoped branch backup | Repository/platform administrator | Named human account through GitHub CLI and HTTPS Git credential flow | not verified | OS secure credential store with configured Git credential helper | Provider policy not documented; rotate on suspected exposure, custodian change or provider direction | 2026-08-03 | `required-current`; one administrator-equivalent repository access path observed; retain unchanged | Repository/platform owner; not durably named | Sprint 034C aggregate read-only API and local Git configuration checks |
| Vercel hosting project | Hosting inspection, Preview/production release and rollback control | Platform/release owner | Team membership and provider CLI session | not verified | Provider CLI protected local configuration; contents not inspected | not verified; rotate on suspected exposure, custodian change or provider direction | 2026-08-03 | `ambiguous-retain`; project read access works through one team, zero explicit project members were returned, inherited role is not verified | Platform owner; recovery path not verified | Sprint 034C aggregate read-only Vercel project/team checks |
| Supabase production control plane | Database, Auth, Storage and provider operations | Platform/database owner | Provider CLI profile and provider console account | not verified | Provider CLI protected configuration; contents not inspected | not verified; rotate on suspected exposure, custodian change or provider direction | 2026-08-03 | `ambiguous-retain`; authenticated CLI sees one organization/project but not the documented production target; no cleanup or target inference permitted | Platform/database owner; recovery path not verified | Sprint 034C sanitized CLI target-visibility comparison and Sprint 035K authority |
| Domain registrar and DNS account | Domain ownership, nameserver and recovery control | Domain/platform owner | Named registrar account; exact method not verified | not verified | Provider-managed account store; exact class not verified | not verified; rotate on suspected exposure, custodian change or registrar direction | 2026-08-03 | `ambiguous-retain`; public registry identifies GoDaddy and both public hostnames resolve, but account ownership/access is not verified | Domain owner; recovery path not verified | Sprint 034C public auDA RDAP and DNS checks |
| Stripe operator account and secret classes | Disabled commerce control and retained runtime configuration | Business/platform owner | Provider account plus provider-managed runtime secret classes | not verified | Vercel/provider secret store by documented class; values not inspected | not verified; immediate rotation on suspected exposure | not verified | `ambiguous-retain`; billing and commerce mutation are outside Sprint 034C and no authenticated account inventory was available | Business/platform owner; not verified | `docs/ENVIRONMENT.md`, `docs/OPERATIONS_HANDOFF.md` and disabled-commerce authority |
| Resend/custom SMTP provider control | Application email OTP delivery | Platform/application-auth owner | Provider account plus protected SMTP credential class | not verified | Supabase/provider protected configuration; value not inspected | not verified; immediate containment on suspected exposure | 2026-08-01 | `trainer/application-auth-out-of-scope`; retained unchanged because it directly governs trainer authentication | Platform/application-auth owner; not verified | Sprint 035K sanitized provider-state evidence |
| Google Cloud/Gmail test control plane | Historical protected mailbox adapter readiness | Provider/operator owner | Named Google account with two-step verification; deleted bounded OAuth client | verified enabled as of cited evidence | Provider-managed account store; exact recovery/storage details not verified | not verified; rotate or contain on suspected exposure | 2026-08-01 | `ambiguous-retain`; the exact Sprint-owned client and local credential targets were already proven absent; no further deletion is justified | Provider/operator owner; recovery path not verified | Sprint 035I sanitized closeout evidence |
| Windows Credential Manager bounded test targets | Historical secure-store contract proof | Local operator | OS secure-store entries with exact bounded targets | not applicable | Windows Credential Manager | Test-only entries must be deleted after proof | 2026-08-01 | `obsolete-proven`; already absent, so no mutation remains | Local operator | Sprint 035I exact absence proof |
| Railway status-token class | Legacy optional platform-status signal | Platform owner | API-token class | unknown | unknown; no value or local protected file inspected | not verified; immediate containment on suspected exposure | not verified | `ambiguous-retain`; no Railway deployment configuration is documented and token presence/ownership was not inspected | Platform owner; not verified | `docs/ENVIRONMENT.md` |
| Vercel platform OIDC class | Provider-issued deployment/build identity | Vercel/platform owner | Provider-issued ephemeral OIDC credential class | provider-managed; user MFA not applicable to token issuance | Provider-managed deployment context | Provider-managed ephemeral lifecycle; do not manually copy | 2026-08-03 | `required-current`; retain provider management and never copy into documentation | Platform owner through Vercel account recovery; not verified | `docs/ENVIRONMENT.md` and Sprint 034C Vercel read access |

## Incident rule

If exposure is suspected, stop use of the affected delivery path, preserve only secret-free evidence, notify the platform/security owner, and use the provider’s supported containment and rotation controls. Establish and verify a retained/replacement operator and recovery path before revocation unless immediate provider-supported containment is necessary. Reread the exact provider state afterward and record only sanitized classification, timestamps, counts and outcomes.

## Required private verification

The following checks require the authorized human operator to authenticate privately in the named provider. Do not send any authentication material or screenshots containing private account data to Builder.

1. GitHub: confirm current human MFA, recovery path and whether the single administrator-equivalent access path is intentionally retained.
2. Vercel: confirm the current team role, named recovery owner, MFA and recovery path, and all inherited project-access paths.
3. Supabase: authenticate to the documented production organization, then confirm only that the intended production project is visible, the operator role class, MFA state and recovery owner. Do not expose the project identifier or Auth data.
4. GoDaddy: confirm the authorized domain custodian, MFA state, recovery owner and at least one verified recovery path without changing DNS.
5. Stripe and Google: confirm current operator ownership, MFA and recovery only if those control planes remain operationally required.

Until these checks are completed and recorded in sanitized form, all affected items remain unchanged. No external mutation is justified by the current evidence.

## Sprint 036K seven-class pre-public-launch boundary

Sprint 036K narrows credential work to exactly seven non-public classes: `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `ENQUIRY_ABUSE_HMAC_SECRET`, `PUBLIC_ENQUIRY_SMTP_PASS`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` and `RAILWAY_API_TOKEN`. Public configuration and provider-issued Vercel OIDC remain excluded.

Each class needs a complete consumer inventory that includes still-addressable immutable and old deployments, a provider-native creation and installation path, a replacement runtime probe, and an independent provider-native predecessor invalidation oracle. Vercel environment-row absence is not revocation evidence. An unsupported or incomplete mechanism remains `blocked-retained`; do not infer rotation or absence from source, a working replacement, or a failed application request.

Compensation is permitted only before predecessor invalidation: remove the replacement and restore the complete affected binding and caller set. Once predecessor invalidation is independently proven, never restore that predecessor. Record only class, disposition, counts, booleans and sanitized timing; never record a credential value or fragment.

## Sprint 036M opaque-key recovery

Supabase publishable and secret keys migrate as one pair while JWT signing and user sessions remain unchanged. Seal each key's provenance before mutation. Compensation may delete only `created-this-sprint` keys; a `pre-existing-selected` key is never deleted. Deactivate legacy `anon` and `service_role` only after exact-source browser/user/admin probes and fixed-alias readback, then prove both predecessors rejected through independent provider/runtime evidence.
