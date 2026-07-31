# Sprint 035F — Resend Hosted Integration And Trainer Pilot Completion

## Goal

Connect the owner-established and domain-verified Resend account to the approved hosted Supabase project through Resend's hosted Supabase integration, prove protected OTP delivery and session establishment, then complete the sequential Trainer Participant A/B/C dashboard pilot and exact-owned cleanup.

Target outcome: `resend-otp-and-trainer-pilot-complete-clean`.

## Workflow profile

Strict. This sprint mutates shared production authentication delivery through an external hosted integration, protected credentials, participant identities and live provider configuration.

## Starting authority and baseline

Start from closed Sprint 035E branch `codex/035E-custom-transactional-smtp-and-trainer-pilot-completion` at exact clean local/remote SHA `628bb69c29eb169dd80fe6d9d91d55c417e130b0` and outcome `transactional-smtp-authority-pending-clean`.

Create `codex/035F-resend-hosted-integration-and-trainer-pilot-completion`. Do not reopen or rewrite Sprint 035–035E.

Read and preserve:

- `AGENTS.md`, agent identity and all Sprint 035–035E authorities/evidence;
- `planning/reviews/035E-custom-transactional-smtp-authority-checkpoint.md`;
- current state, status, schedule, evidence index and Architect briefing;
- current Supabase Auth, OTP template, Vercel deployment/rollback, participant ownership and cleanup evidence.

## Owner-selected provider authority

The product owner has established Resend, selected it for Supabase Auth transactional email and verified `precisionperformance.com.au` in Resend. The product owner controls the Resend and Supabase accounts and performs OAuth/MFA privately.

Before mutation, obtain only these remaining sanitized confirmations:

- current Resend account/plan is accepted for the bounded pilot without Builder purchasing or upgrading a plan;
- Resend's applicable privacy, retention, logging and access posture is owner-accepted;
- the owner is ready to perform the hosted integration in a protected browser session;
- Trainer Participants A/B/C remain available, without identities being disclosed.

Never request or receive account passwords, MFA codes, API keys, SMTP passwords, Supabase access/service keys, trainer inboxes, OTPs, links, Auth identifiers or mailbox headers.

## Exact integration selection

Primary and required path: Resend's hosted Supabase integration.

- Resend verified domain: `precisionperformance.com.au`.
- Supabase project reference: `uvskssaecdhxcgytkasc`.
- Supabase project name: `Precision Performance Clean Rebuild`.
- Supabase region: Singapore `ap-southeast-1`.
- Migration ledger: exactly `0001` through `0021`.
- Sender name: `Precision Performance`.
- Sender address: `no-reply@precisionperformance.com.au`.
- Sending purpose: Supabase Auth OTP only.

The operator uses Resend Integrations → Supabase → Connect to Supabase, selects only the approved project and verified domain, permits Resend to create/transfer its integration API key directly, enters the exact sender identity and chooses Configure SMTP Integration.

Manual SMTP host/port/username/password entry is prohibited in this sprint. It is not an automatic fallback. If the hosted integration is unavailable or cannot target the exact approved project, stop cleanly for Architect direction without copying credentials between services.

## Preserved provider and application boundaries

- Never contact old Supabase project `tagnbgkroihagjmvehlx`.
- Preserve the OTP-only Magic Link template: one `.Token`, zero `ConfirmationURL`, zero links.
- Preserve Confirm sign up and all unrelated templates.
- Preserve production Site URL, production/exact Preview callbacks, signup policy, keys and unrelated Auth/provider settings.
- Preserve current OTP-capable production and compatible forward rollback plus all five stable aliases.
- Do not change DNS; the selected root domain is already provider-verified. Stop if Resend requests new or different DNS mutation.
- Preserve Participant A and the two ambiguous Auth-only identities. No ambiguous identity deletion is authorized.
- Existing prepared identities only; retain `shouldCreateUser:false`, exact plus-address matching and generic anti-enumeration behavior.

## Protected operator confirmation

After completing the hosted integration and before any test email, the operator reports only:

`Resend-Supabase integration configured; approved project confirmed; sender configured; credentials remained protected.`

Builder must not interpret any other wording as proof of target, sender or credential protection and must not ask the operator to expose settings screenshots or secret fields.

## Approved actions

- Guarded read-only preflight of Resend/Supabase/Vercel classifications.
- Protected operator execution of the exact hosted integration.
- Sanitized post-integration readback and rollback capture.
- Bounded adjustment of Supabase Auth email rate limits only after recording current values; minimum interval per user remains `60` seconds and no limit is raised beyond the current Resend plan or bounded product need.
- One exact-owned, already-confirmed synthetic identity prepared without invitation email.
- One OTP request after preflight, protected delivery proof, Preview session/dashboard proof and Auth-last cleanup.
- Sequential A, B and C participation only after synthetic acceptance.
- Narrow in-contract harness/reporting corrections and lifecycle evidence.

## Out of scope

- Manual SMTP credentials, custom Auth Functions/Hooks, Edge Function email delivery or another provider.
- Resend plan purchase/upgrade, marketing/broadcast email or broad sender-domain work.
- DNS, nameserver, SPF, DKIM, DMARC, MX or website-record mutation.
- Passwords, SMS, social login, MFA, passkeys or self-registration.
- Schema, migration, RPC, RLS, role, permission, dashboard/product or clinical changes.
- Production data, real horse/stable fixtures, deletion of ambiguous identities, merge/PR/`develop` push or product-wide Done.

## Evidence-Proportional Execution and manual intervention

Stop only for a material target, authority, protected-data/secret, provider, authentication, production, integrity, scope or cleanup boundary. Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep deterministic harness, validator, reporter, formatting and encoding corrections in 035F. Manual intervention is last and must state the blocked fact, evidence checked, exact protected operator steps and Builder verification. Tool inconvenience alone is not a reason to create another sprint.
