# Sprint 036P — Protected Provider Authority Readback

## Purpose

Sprint 036P corrects the accepted-source graph’s false exclusion of production file `components/ops/test-evidence-manager.tsx` and provides a bounded, read-only authority reader for Vercel, Supabase, Resend, Stripe and Railway.

This sprint never writes provider state. It does not reveal values, deploy, modify environment variables or aliases, rotate keys, invoke business effects, contact a trainer, change identities, or claim launch readiness.

## Local authority

- Canonical source object: `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`.
- Production manager: `components/ops/test-evidence-manager.tsx`, mode `100644`, blob `65d74be5a3f701ae9133bf353348b3253f36feef`.
- Test exclusions: test directories plus conventional `*.test.*` and `*.spec.*` suffixes only. A production basename beginning `test-` remains admitted.
- Exact focused proof: discovery `60`, reader `80`, transport `40`; total `180`.

## Official contract register

Retrieved/current-as-of `2026-08-14`; every source remains provider documentation, not provider execution evidence.

- Vercel REST API and project environment v10: `https://vercel.com/docs/rest-api` and `https://vercel.com/docs/environment-variables/sensitive-environment-variables`.
- Supabase Management API, read-only SQL endpoint and API-key guidance: `https://supabase.com/docs/reference/api/introduction` and `https://supabase.com/docs/guides/api/api-keys`.
- Supabase platform changelog: `https://supabase.com/changelog`.
- Resend API introduction and CLI identity/profile behavior: `https://resend.com/docs/api-reference/introduction` and `https://resend.com/docs/cli`.
- Stripe account and webhook endpoint API: `https://docs.stripe.com/api/accounts/retrieve` and `https://docs.stripe.com/api/webhook_endpoints/list`.
- Railway public GraphQL API and token-type headers: `https://docs.railway.com/integrations/api`.
## Immutable request boundaries

- Vercel: `GET /v9/projects/{project}` for project plus Cron definitions, cursor-exhausted `GET /v6/deployments`, non-decrypt `GET /v10/projects/{project}/env`, cursor-exhausted `GET /v4/aliases`, `GET /v1/integrations/configurations`, and `GET /v1/webhooks`, all with exact team/project scope. Integration and webhook rows must each carry the exact owner/team and include the exact project; missing ownership or project membership is refused.
- Supabase: exact-project metadata, non-revealing API-key metadata, Edge Function inventory, and four fixed schema-qualified `SELECT` requests through `/v1/projects/{ref}/database/query/read-only` for database webhooks, `pg_net` dependencies, `pg_cron` jobs, and Vault references to the exact seven class names; generic query is forbidden.
- Resend: current key/domain list fields plus a separate protected `whoami`/profile or signed-in native team binding. Both list surfaces are exhausted with `limit=100` and forward `after=<last exact ID>` cursors under the global ceiling, with duplicate and cursor-drift refusal. Token possession or list rows alone cannot prove the team.
- Stripe: exact account and live/test-mode proof plus read-only webhook endpoint listing. No event, delivery, activation or payment surface exists.
- Railway: fixed read-only GraphQL queries. Account/workspace tokens use Bearer authorization; project tokens use `Project-Access-Token` and prove exact project/environment.

Global provider requests are capped at `24`, overriding the per-family `100`-page ceiling. Raw responses are capped at `2 MiB` per provider and projected in child memory before output.

## Protected window

The wrapper offers `SelfTest`, `CapabilityGate`, and `ProtectedReadOnly` only. The live mode requires one fresh visible unredirected ConsoleHost, no transcript/history capture, and no concurrent window. The parent retains every SecureString and expected authority ID until the child requests that exact provider. It then releases only that provider-specific credential and identifiers through the private child stdin pipe, clears the transferred variables after the response, and proceeds to the next provider. No credential, profile, or authority identifier enters argv, environment variables, a temporary file, clipboard, outer output, or durable evidence. Resend uses only fixed child arguments (`resend whoami --json`); if that signed-in identity cannot independently bind the expected team, the provider lands fallback.

The child returns one allowlisted sanitized envelope per request and never writes the filesystem. The parent independently validates the exact result keys, request ceiling, outcome/reason/complete consistency, five ordered authority-row schemas and binding counts, seven ordered 15-field capability-row schemas/enums, and the stronger target prerequisites before any canonical write; malformed or counterfeit results are refused byte-for-byte before `external-ledger.json` changes. Completion is derived only from its private 17-operation/at-least-19-request trace, five independently bound provider authorities, the complete accepted-object graph, exactly seven class rows, request ceilings, and zero writes/mutations/residue; caller-supplied completion is impossible. The parent validates the final envelope, atomically replaces the canonical `external-ledger.json` on the same volume, deterministically regenerates both Markdown artifacts from that ledger, rereads all three, and prints a landing only after they agree. On every entry it first removes only exact-owned `.036p-next-*` siblings and repairs Markdown drift from the canonical ledger. The production reconciliation functions are exercised against a temporary evidence directory with before-ledger-replace, after-ledger-replace, and during-Markdown-write faults. Caught interruptions clean all owned siblings; a hard process kill may leave an owned sibling or Markdown mismatch, but never a false landing, and the next entry repairs it before any provider request. Credentials, raw responses, cookies, tokens and control files are never durable.

## Manual intervention

If a provider cannot be bound autonomously:

1. Open a new visible ConsoleHost at the canonical repository with transcription and history capture off.
2. Run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProviderAuthorityReadback036P.ps1 -Mode ProtectedReadOnly` with no redirection.
3. Enter only the requested protected authority through masked prompts; do not paste it into chat, clipboard, argv, environment variables or a file.
4. If the provider’s exact read-only API/connector/CLI/signed-in path is unavailable, stop. Do not attest success or substitute a screenshot.
5. Builder independently verifies the sanitized authority binding, complete pagination, zero writes/mutations, child termination and zero residue.

Until that window is run, the truthful landing is `protected-provider-authority-readback-blocked-clean` with provider reads, writes, mutations and residue all zero.
