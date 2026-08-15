# Sprint 036Q - Protected Five-Provider Authority Completion

## Purpose

Sprint 036Q attempts one privacy-safe, externally read-only completion of exact Vercel, Supabase, Resend, Stripe and Railway authority for seven retained credential classes. It never rotates, creates, deletes, deploys, sends, verifies, changes Product or claims launch readiness. Accepted Sprint 036L remains the live Production authority.

## Official contract register

Retrieved 2026-08-14 from current official documentation.

- Vercel REST API: `https://vercel.com/docs/rest-api`. Fixed reads are exact project/Cron metadata, cursor-exhausted v6 deployments, non-decrypt v10 project environment metadata, cursor-exhausted aliases, integrations and webhooks under exact team/project scope.
- Supabase Management API: `https://supabase.com/docs/reference/api/introduction`; API key guidance: `https://supabase.com/docs/guides/api/api-keys`; changelog: `https://supabase.com/changelog`. Fixed reads are exact project, `reveal=false` key metadata, Edge Functions and four schema-qualified SELECTs only through `/v1/projects/{ref}/database/query/read-only`.
- Resend pagination and CLI: `https://resend.com/docs/api-reference/pagination` and `https://resend.com/docs/cli`. Exact team identity must come from a pre-existing official authenticated profile or existing signed-in native session before cursor-exhausted API-key/domain lists count. Token possession and list rows cannot mint identity.
- Stripe webhook listing: `https://docs.stripe.com/api/webhook_endpoints/list`. Fixed reads are exact account/live-test mode plus cursor-exhausted webhook endpoints.
- Railway public API: `https://docs.railway.com/integrations/api`. The only endpoint is `https://backboard.railway.com/graphql/v2`; account/workspace tokens use Bearer and project tokens use `Project-Access-Token`, with fixed read-only query shapes.

## Request and action boundary

The fixed order is Vercel, Supabase, Resend, Stripe, Railway. A complete first page uses at least 19 requests; pagination may use at most five additional requests. Request 25 is never issued. Retained four plus one session remains at or below 28. Each provider has a 2 MiB cumulative raw-response ceiling and each child line has a 64 KiB ceiling.

Provider writes, mutations, business effects, reveal/decrypt calls, email, payment, deployment, alias, environment, credential, identity, Auth/session, Storage, trainer, message and verification actions are exactly zero. Arbitrary URL, SQL, GraphQL and command surfaces do not exist. Unknown schema, duplicate/cursor drift, incomplete pages, protected reflection, timeout, stderr or cleanup uncertainty fails closed.

## Protected transport

Run only `scripts/Invoke-ProviderAuthorityCompletion036Q.ps1 -Mode ProtectedReadOnly` in a fresh visible unredirected ConsoleHost with transcription and history capture off. The parent owns one bounded child, releases one provider credential and expected IDs only when that provider requests them, sends them through private stdin, validates sanitized stdout and clears owned transfer references. No protected value enters chat, argv, environment, clipboard, history, temp, repository, evidence or output.

The wrapper first repairs the three evidence files from the canonical ledger. It accepts only one strict sanitized final envelope, translates the retained child outcome to the 036Q outcome, atomically replaces the ledger, deterministically regenerates both Markdown files and rereads all three. No journal, backup or durable control file remains.

## Resend prerequisite

Do not install or log in to Resend, create a profile or credential file, or place a secret/profile in argv or environment. The pre-existing `resend` command must already exist and return an independently bound exact team through fixed `whoami --json`; an equivalent existing signed-in native mechanism requires separately implemented fixed value-blind projection. If neither exists, CapabilityGate returns `PRE_EXISTING_RESEND_IDENTITY_REQUIRED` and the sprint lands `protected-five-provider-authority-blocked-clean` before any provider request.

## Manual intervention

Manual intervention is last resort and never substitutes screenshot or attestation for provider-native proof.

1. Phillip and Randell open one fresh visible ConsoleHost in the canonical root with transcription/history capture off.
2. Run CapabilityGate. If it reports unavailable access, stop. Do not install/login, create a credential or broaden access.
3. Only when CapabilityGate is ready, run ProtectedReadOnly without redirection.
4. Enter requested existing credentials and exact authority IDs only at masked prompts. Never paste them into chat or another tool.
5. On any refusal, stop. Do not retry after process exit or improvise a success claim.
6. Builder independently verifies the sanitized five-provider result, exhausted pages, exactly seven rows, cumulative reads at most 28, and zero writes/mutations/business effects/residue/trainer actions.

For each blocked provider, the durable ledger records what failed, API/connector/CLI/signed-in alternatives checked, the exact read-only surface, the exact later owner action and what Builder will verify afterward.
