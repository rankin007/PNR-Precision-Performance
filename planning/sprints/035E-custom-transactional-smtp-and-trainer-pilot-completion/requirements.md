# Sprint 035E — Custom Transactional SMTP And Trainer Pilot Completion

## Goal

Replace Supabase built-in email delivery with an owner-selected production-capable custom transactional SMTP service, prove the existing prefetch-resistant email OTP journey end to end, complete the sequential Trainer Participant A/B/C dashboard pilot, and clean all exactly owned temporary state.

Target outcome: `custom-smtp-otp-and-trainer-pilot-complete-clean`.

This is a corrective completion sprint belonging to core Sprint 035. It does not reopen Sprint 035, 035B, 035C or 035D and must not declare product-wide Done.

## Workflow profile

Strict. The work affects shared production authentication delivery, an external email provider, domain/DNS verification where required, secrets, participant identities, protected mailbox evidence and live provider configuration. Use the four sprint files as the complete Builder authority.

## Starting authority and exact baseline

Start from closed Sprint 035D branch `codex/035D-prefetch-resistant-email-otp-authentication` at exact local SHA `83fc1a76b20a8b01711a2a2f63e551b49ffe15be`. Verify the corresponding remote branch and exact remote equality before mutation. If the remote tip is absent or differs, stop for baseline reconciliation rather than guessing or silently publishing prior work.

Create `codex/035E-custom-transactional-smtp-and-trainer-pilot-completion` from that exact SHA. Read and preserve:

- `AGENTS.md` and `templates/method/120x-agent-identity.md`;
- all Sprint 035 through 035D authorities and closeout evidence;
- `planning/reviews/035D-email-otp-cutover-and-mailbox-checkpoint.md`;
- Sprint 035D `planning/STATE.md`, `planning/STATUS.json`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md` and `planning/ARCHITECT_BRIEFING.md` from the exact baseline;
- current authentication, deployment, provider, DNS, privacy, RLS, participant-ownership and cleanup authorities; and
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` for authenticated messaging and claims.

Preserve the closed 035D facts: corrected OTP-capable production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`; OTP-compatible forward rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`; current OTP template fingerprint prefix `23c6a254...`; five accepted stable aliases; Participant A tagged and Sprint-owned; two other Auth-only identities ambiguous and not deletion-authorized; exact-owned manual-preview and synthetic state `0/0/0`; and no accepted delivered OTP or A/B/C pilot result.

## Required owner/provider authority

The product owner must select or confirm the transactional email provider, approve any account/plan cost, control the provider account and domain/DNS authority, approve the sender identity, and enter SMTP credentials only through protected provider interfaces or child-only secret handling. Builder must not choose a paid plan, accept commercial terms, create an externally billed account, request credentials in conversation, or infer DNS authority.

Before external mutation, record only sanitized classifications:

- provider selected and account/plan authority confirmed;
- sender domain or subdomain and non-personal sender display identity approved;
- the exact intended sending purpose is Supabase Auth OTP only;
- provider region/data-processing, retention, logging and access posture accepted by the owner;
- DNS owner and rollback authority confirmed if verification records are required;
- SMTP host/port/security/username/password fields available through a protected path; and
- participant inbox readiness and A/B/C availability reconfirmed without exposing identities.

If these prerequisites are not available, prepare the exact sanitized operator checklist, perform no provider/DNS/Auth mutation, and close `transactional-smtp-authority-pending-clean`.

## Approved targets and outcome boundary

### Supabase

- Project `uvskssaecdhxcgytkasc`, `Precision Performance Clean Rebuild`, Singapore `ap-southeast-1`.
- Migration ledger remains exactly `0001` through `0021`; no schema or migration change is approved.
- Configure only the supported custom SMTP fields required for Auth email delivery.
- Preserve Site URL, redirect allowlist, OTP-only Magic Link template, Confirm sign up template, keys, Auth security settings and unrelated templates/providers unless an exact SMTP enablement field must change.
- Never contact old project `tagnbgkroihagjmvehlx`.

### Vercel and application

- Project `pnr-precision-performance`.
- Use a fresh exact-source generated Preview with no production/custom alias for participant proof.
- Production source is not to be changed or redeployed unless an in-scope deterministic correction to the existing OTP/auth harness is required and passes the full release gates.
- Preserve all five accepted stable aliases and the OTP-compatible forward rollback.

### Email provider and DNS

- Configure only the owner-selected provider account, approved sender identity and minimum DNS records explicitly supplied by that provider.
- Read and record existing DNS values before any approved record mutation; do not replace unrelated SPF, DKIM, DMARC, MX or verification records.
- Merge SPF only through a provider-supported, syntactically valid single-record design; never create multiple SPF records for one hostname.
- Prefer a dedicated Auth sending subdomain when approved and compatible, to reduce blast radius.
- Do not weaken DMARC, mailbox security, domain ownership or unrelated mail delivery.
- Store no SMTP secret in Git, planning files, commands, screenshots, logs or conversation.

## Product and acceptance contract

The existing Sprint 035D OTP application contract remains authoritative: existing prepared identities only; `shouldCreateUser:false`; generic anti-enumeration responses; exact plus-address preservation; one six-digit OTP with no direct verification link; supported `verifyOtp` email flow; normalized same-origin continuation; no email or OTP in URLs or durable evidence; no bootstrap before verified session; and generic safe failure for invalid, expired, reused, superseded or malformed codes.

SMTP success requires more than a successful settings save or provider API response. Builder must prove an accepted provider submission, delivery to an exact protected synthetic recipient, a single-code/no-link message, successful code verification, normal session establishment and exact Preview `/portal` access. Provider logs may be used only through sanitized bounded tooling that cannot emit recipient addresses, message bodies, Auth identifiers, tokens or credentials.

Participant execution remains sequential: A first, B only after A passes and state is reconciled, C only after B passes. Durable evidence uses A/B/C only. Never delete either ambiguous 035D identity without new exact ownership and deletion authority. Never coach past an authentication or product defect.

## Approved actions

- Inspect sanitized current provider, DNS and Supabase SMTP state read-only.
- Create/configure the owner-approved transactional provider and sender identity through protected operator coordination.
- Add, update or remove only exact provider-required verification records with confirmed DNS authority and captured rollback values.
- Enter custom SMTP credentials into Supabase through a protected path and verify sanitized readback.
- Run provider verification, deliverability and OTP tests at a bounded cadence consistent with provider limits.
- Make narrow deterministic corrections to Sprint 035D Auth/harness/reporting behavior if runtime proof exposes an in-contract defect.
- Create minimum exact-owned synthetic Auth/application fixtures, run proof, and clean application data first and Auth last.
- Create an exact-source alias-free Preview and rotate only the exact temporary Preview callback.
- Coordinate sanitized A/B/C pilot execution through the owner/operator.
- Commit and push only the scoped 035E branch when needed for exact-source Preview or closeout backup.

## Explicitly out of scope

- Selecting or purchasing an email plan without owner authority; broad marketing email, newsletters or enquiry delivery.
- Passwords, SMS, social login, MFA, passkeys, self-registration or account-recovery redesign.
- Schema, migration, RPC, RLS, role, membership, assignment or permission changes.
- Changes to scoring, clinical content, dashboard features, uploads, voice, commerce or public marketing.
- Broad DNS migration, nameserver changes, weakening DMARC, or modification of unrelated mail records.
- Production data access, real horse/stable records, participant PII in repository evidence, or deletion of ambiguous identities.
- Merge, PR, `develop` push, history rewrite or product-wide Done declaration.

## Evidence-Proportional Execution Standard and manual intervention

Stop only for a material wrong target/baseline, missing owner or billing authority, secret/protected-data exposure, ambiguous DNS change, authentication/privacy/integrity failure, production impact, unauthorized scope expansion, migration requirement or cleanup uncertainty. Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope harness, validator, credential-entry, formatting, encoding, reporter and deterministic corrections in 035E. Do not open another follow-up solely because browser/mailbox automation, Docker, a renderer, schema dump, clipboard control or optional CLI path is unavailable.

Manual intervention is last. When required, record the blocked fact, evidence checked, exact operator action, step-by-step protected instructions and what Builder will verify. Never ask the operator to paste an SMTP password, participant address, OTP, link, token or Auth identifier into conversation.
