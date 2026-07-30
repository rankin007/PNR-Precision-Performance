# Sprint 035E Acceptance

## Baseline and authority

- [ ] Exact clean 035D local/remote baseline equality is proven at `83fc1a76b20a8b01711a2a2f63e551b49ffe15be`.
- [ ] Provider, plan/cost, sender, privacy, DNS and participant authority are recorded without protected values.
- [ ] Pre-mutation Supabase SMTP, DNS, deployment, alias, callback, template and identity classifications are recorded with rollback readiness.
- [ ] Participant A remains exact-owned; both ambiguous 035D identities remain preserved absent new ownership and deletion authority.

## Provider, DNS and SMTP

- [ ] The owner-selected provider supports production transactional SMTP, TLS, credential rotation and adequate bounded delivery.
- [ ] Sender domain/subdomain and sender identity are verified by the provider.
- [ ] Only exact provider-required DNS records changed; existing unrelated mail and website records remain intact.
- [ ] SPF remains syntactically valid with no duplicate record; DMARC is not weakened.
- [ ] Supabase custom SMTP is enabled in the approved project with protected credentials and sanitized readback.
- [ ] Site URL, callback allowlist, OTP template, Confirm sign up, keys and unrelated Auth settings remain unchanged.
- [ ] SMTP and DNS rollback is executable from captured protected/configuration evidence.

## Delivered OTP and authentication

- [ ] Unknown synthetic email receives generic behavior and creates no Auth identity.
- [ ] One prepared exact-owned synthetic identity receives an OTP through the custom provider.
- [ ] Provider acceptance and protected mailbox delivery are proven without exposing recipient, message, code, Auth identifier or credential.
- [ ] Delivered email contains one intended six-digit OTP and no clickable verification action.
- [ ] OTP verification establishes the normal session and reaches exact Preview `/portal` through a normalized same-origin path.
- [ ] Dashboard permission isolation, wrong-horse denial and RLS agreement pass.
- [ ] Incorrect, malformed, expired, reused and superseded codes fail safely without session/bootstrap/access.
- [ ] Synthetic application/Auth/Storage cleanup proves exact-owned `0/0/0`, Auth-last.

## Participant pilot

- [ ] A is guardedly reverified and completes OTP sign-in plus the five-step dashboard journey on exact Preview phone-first.
- [ ] B begins only after A passes and reconciliation completes; C begins only after B passes.
- [ ] A/B/C each complete phone-first without coaching past a defect.
- [ ] At least one tablet or desktop pass completes across the group.
- [ ] Evidence contains only A/B/C and sanitized task outcomes, with no identity, OTP, link, token, mailbox or protected horse/stable data.
- [ ] Material in-scope findings are corrected and re-proven; different feature requests are deferred without scope expansion.

## Safety, validation and closeout

- [ ] Existing Sprint 035D OTP request/verify, anti-enumeration, redirect, session, plus-address and safe-failure tests pass.
- [ ] Sprint 035 dashboard, permission, wrong-horse and RLS-agreement regressions pass.
- [ ] Applicable canonical JSON/static/domain/role/Supabase-safe validation, lint, typecheck and production build pass.
- [ ] Exact-source alias-free Preview and production/protected-route smoke pass; production remains on the intended Ready deployment unless an approved correction required release.
- [ ] `git diff --check`, encoding, staged-manifest, private-data, secret and generated-artifact checks pass.
- [ ] Temporary callback and protected sessions/mappings are removed when no longer required.
- [ ] Final exact-owned application/Auth/Storage is `0/0/0`, except preserved not-owned identities with zero Sprint access.
- [ ] Five stable aliases, Site URL, callbacks, OTP template fingerprint, custom SMTP classification, production deployment and forward rollback are reconciled.
- [ ] Local/remote 035E tips match, worktree is clean and durable planning records agree.

## Stop conditions

Stop and restore safely for wrong baseline/target, absent commercial or DNS authority, secret/participant-data exposure, ambiguous DNS replacement, provider privacy mismatch, authentication/session/RLS failure, inability to restore SMTP/DNS state, production regression, unauthorized schema/scope expansion, real-data contact or cleanup uncertainty. A supporting-tool failure alone is not a blocker when equivalent or stronger safe evidence proves the same boundary.

## Permitted closeout outcomes

- `custom-smtp-otp-and-trainer-pilot-complete-clean`
- `custom-smtp-otp-proven-participant-acceptance-partial-clean`
- `transactional-smtp-authority-pending-clean`
- `custom-smtp-cutover-rolled-back-clean`
- `custom-smtp-otp-validation-blocked-clean`

Never declare product-wide Done from this sprint.
