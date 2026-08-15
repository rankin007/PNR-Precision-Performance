# Sprint 036R - Resend-Domain-Bound Five-Provider Authority Completion

## Purpose

Sprint 036R attempts one privacy-safe, externally read-only completion of exact Vercel, Supabase, Resend, Stripe and Railway authority for seven retained credential classes. Resend authority is bound to the retained apex `precisionperformance.com.au`, a unique stable domain ID, verified/sending-enabled capability and exact public DNS. The sprint never rotates, creates, deletes, deploys, sends, verifies, changes Product or claims launch readiness. Accepted Sprint 036L remains the live Production authority.

## Official contract register

Retrieved 2026-08-14 from current official documentation.

- Vercel REST API: `https://vercel.com/docs/rest-api`. Fixed reads are exact project/Cron metadata, cursor-exhausted v6 deployments, non-decrypt v10 project environment metadata, cursor-exhausted aliases, integrations and webhooks under exact team/project scope.
- Supabase Management API: `https://supabase.com/docs/reference/api/introduction`; API key guidance: `https://supabase.com/docs/guides/api/api-keys`. Fixed reads are exact project, `reveal=false` key metadata, Edge Functions and four schema-qualified SELECTs only through `/v1/projects/{ref}/database/query/read-only`.
- Resend domain detail: `https://resend.com/docs/api-reference/domains/get-domain`; list domains: `https://resend.com/docs/api-reference/domains/list-domains`; list API keys and pagination: `https://resend.com/docs/api-reference/api-keys/list-api-keys` and `https://resend.com/docs/api-reference/pagination`; CLI: `https://resend.com/docs/cli`; team model: `https://resend.com/docs/dashboard/team-management/introduction`. `whoami` proves authentication status, not immutable team identity. Authority is instead the unique retained apex domain with matching stable ID, verified/sending-enabled capability, allowed SPF/DKIM records and exact record-aware public DNS.
- Stripe webhook listing: `https://docs.stripe.com/api/webhook_endpoints/list`. Fixed reads are exact account/live-test mode plus cursor-exhausted webhook endpoints.
- Railway public API: `https://docs.railway.com/integrations/api`. The only endpoint is `https://backboard.railway.com/graphql/v2`; account/workspace tokens use Bearer and project tokens use `Project-Access-Token`, with fixed read-only query shapes.

## Resend domain and DNS boundary

The expected apex is fixed from retained Sprint 029P and accepted Production authority; callers cannot choose it. Cursor-exhausted domain metadata must contain exactly one matching domain ID whose detail is verified and sending enabled. Every raw record row is strictly decoded and must carry the documented `ttl: "Auto"`; TTL is never projected into authority tuples. Known non-authority Tracking CNAME rows are validated and ignored. Only sending-purpose SPF TXT/MX and DKIM TXT/CNAME records may become authority tuples. Names are case-insensitive, permit one trailing dot and resolve relative names only beneath the expected apex. TXT data is joined exactly, CNAME targets are normalized, and MX target plus priority must match exactly.

At most five logical `(fqdn,type)` tuples may be selected. Each tuple receives one public DNS read and must return exactly one equal answer; missing, extra, duplicate, mismatched, unsupported or out-of-apex data fails closed. Raw provider or DNS values are held only in memory and never enter durable evidence.

## Request and action boundary

The fixed provider order is Vercel, Supabase, Resend, Stripe, Railway. A target landing uses 19 through 24 provider requests; fallback records the actual ordered prefix from 1 through 24, or zero before the protected session begins. Public DNS reads are tracked separately from 0 through 5. Retained four plus one session remains at or below 28 provider reads. Each provider has a 2 MiB cumulative raw-response ceiling and each child line has a 64 KiB ceiling.

Provider and DNS writes, mutations, business effects, reveal/decrypt calls, email, payment, deployment, alias, environment, credential, identity, Auth/session, Storage, trainer, message and verification actions are exactly zero. Arbitrary URL, SQL, GraphQL and command surfaces do not exist. Unknown schema, duplicate/cursor drift, request 25, DNS read 6, incomplete pages, protected reflection, timeout, stderr or cleanup uncertainty fails closed.

## Protected transport

Only after all local gates and fresh Architect diff inspection PASS, run `scripts/Invoke-ProviderAuthorityCompletion036R.ps1 -Mode ProtectedReadOnly` in one fresh visible unredirected ConsoleHost with transcription and history capture off. The parent owns one child under a monotonic 30-second child-active budget; that budget pauses during every masked prompt, choice and ID entry and resumes only for child/provider/DNS protocol after a remaining-budget check. The parent releases one provider credential and expected IDs only when that provider requests them, sends them through private stdin, validates sanitized stdout and clears owned transfer references. No protected value enters chat, argv, environment, clipboard, history, temp, repository, evidence or output. Resend receives only its credential; the apex is fixed internally and no team/domain identifier is prompted.

The wrapper repairs the three evidence files from the canonical ledger, accepts only one strict sanitized final envelope, atomically replaces the ledger, deterministically regenerates both Markdown files and rereads all three. No journal, backup or durable control file remains.

## Manual intervention

Manual intervention is last resort and never substitutes screenshot or attestation for provider-native proof.

Final protected-attempt checkpoint: four sanitized attempts are recorded. The first three stopped before the protected child or provider work. The fourth was the explicitly authorized nested absolute-process attempt. It passed the local history, visible ConsoleHost, canonical root, branch, HEAD and conflict guards, entered ProtectedReadOnly, started the private child and received the child local need-authority handshake for Vercel. The parent then reached the masked prompt named "vercel management credential".

The user had no pre-existing Vercel management credential, entered no value, pressed Ctrl+C and closed the full PowerShell window as instructed. Cleanup verification found owned wrapper/child processes 0, owned temporary directories 0 and atomic evidence sibling files 0.

The process-start and durable-session facts are deliberately separate:

- Protected wrapper process started: true.
- Private child process started: true.
- Local Vercel need-authority handshake received: true.
- Masked credential prompt reached/requested: true.
- Credential supplied or handled: false; count 0.
- Credential/provider frame released to the child: false; count 0.
- Sprint 036R provider requests and public DNS reads: 0/0.
- Durable sessions array entries: 0. The ledger adds a durable session only after a sanitized final child envelope is returned and atomically committed; no final envelope existed here.
- Writes, mutations, business effects, trainer actions and residue: 0.

Outcome remains resend-domain-bound-five-provider-authority-blocked-clean with target false. The blocking code is PRE_EXISTING_VERCEL_MANAGEMENT_CREDENTIAL_UNAVAILABLE.

Alternatives checked:

- The official Vercel Account Tokens surface cannot reveal an existing token.
- Creating a new Vercel token is outside Sprint 036R authority.
- A safe signed-in read-only alternative was not used and would require separate explicit future authorization and proof.

Do not retry Sprint 036R. Future owner action, under separate explicit authorization, is either provisioning a pre-existing Vercel management credential through an approved protected channel or proving and authorizing a safe signed-in read-only alternative. Token creation, provider login, credential installation and provider mutation are not authorized now.

Builder verifies the canonical ledger plus both generated Markdown artifacts, the process-versus-durable-session distinction, provider/DNS/credential-handled counts 0, all action and residue counters 0, owned processes/temp 0, focused 100, retained 1893, combined 1993 and all required quality/scope/privacy gates before independent fresh inspection.

For each blocked provider, the durable ledger records what failed, API/connector/CLI/signed-in alternatives checked, the exact read-only surface, the exact later owner action and what Builder will verify afterward.
