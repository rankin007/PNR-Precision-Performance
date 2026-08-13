# Provider Authority and Trainer Path — Sprint 036O

Sprint 036O is a local fallback-only safety harness. It is bound to accepted Git object `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`; it does not claim live provider inventory, complete source authority or trainer readiness.

## Bounded source graph

The graph enumerates the accepted object, admits only bounded production/configuration paths under `app`, `lib`, `components`, `middleware.ts`, `vercel.json`, and Supabase functions/migrations, and excludes top-level docs, planning, evidence, references, scripts, tests and fixtures. Blobs are byte bounded and hashed. Relative and `@/` imports are resolved deterministically; ambiguous edges fail closed. Environment roots are exact static reads, and a protected class crossing a client-component boundary is refused.

The executable read found 121 admitted files. Graph hash: `1c4725c67c899c88132e853bfc7104e97f0f92aa27d7b6b21c714d97a2153c42`.

The accepted object contains one immutable unresolved edge:

- `app/(ops)/data-entry/biochemistry/[testId]/page.tsx` → `@/components/ops/test-evidence-manager`

That missing target makes `sourceGraphComplete=false`. It is not skipped or guessed. Provider/deployment sinks are also unresolved because no authenticated provider read occurred. Consequently all seven classes are exactly `unknown-blocking`; source presence or absence cannot upgrade any row.

## Fixture-only provider contracts

Current documented Vercel, Supabase, Resend, Stripe and Railway shapes are exercised only as local fixtures. Every projection is branded `fixtureOnly` and is rejected as provider authority. Pagination, ownership, response bounds, protected fields and captured-value taint fail closed. Individual decoders are not exported.

The wrapper exposes only `SelfTest`, `CapabilityGate` and a fixed-refusal `ReadOnlyDiscovery`. The read mode accepts no endpoint, headers, query, credentials or response and returns `PROVIDER_READER_UNAVAILABLE` with seven unknown-blocking rows and zero actions.

## Official fixture source register

All sources below were retrieved and checked on `2026-08-13`; `current-as-of` is `2026-08-13`. Provider documentation is mutable, so "version" means the provider's published API family or endpoint revision on that date, not a frozen schema. Every fixture remains `fixtureOnly`, `providerEvidence=false`, and cannot prove provider state. The current Resend examples have drifted from the deliberately reduced local fixtures; that mismatch is recorded rather than normalized.

| Fixture kind(s) | Official source URLs | Version/current contract | Recorded use and limitation |
|---|---|---|---|
| `vercel-project` | `https://vercel.com/docs/rest-api`; `https://vercel.com/changelog` | REST `GET /v9/projects/{idOrName}`; current 2026-08-13 | Project/team binding fields only; reduced fixture, not a live decoder. |
| `vercel-deployments` | `https://vercel.com/docs/rest-api`; `https://vercel.com/docs/agent-resources/vercel-mcp/tools`; `https://vercel.com/changelog` | Current REST/MCP list-deployments contract; no global Vercel API version | Project/team filtering and continuation semantics only. |
| `vercel-env` | `https://vercel.com/docs/rest-api`; `https://vercel.com/docs/integrations/create-integration/vercel-api-integrations`; `https://vercel.com/docs/environment-variables`; `https://vercel.com/changelog` | REST `GET /v9/projects/{idOrName}/env` | Metadata names/types/targets only; values are excluded. |
| `vercel-aliases`, `vercel-crons`, `vercel-integrations`, `vercel-webhooks` | `https://vercel.com/docs/rest-api`; `https://vercel.com/docs/cron-jobs/manage-cron-jobs`; `https://vercel.com/changelog` | Mutable REST endpoint revisions plus Vercel Cron documentation | Reduced named-metadata fixtures; no completeness claim. |
| `supabase-keys` | `https://supabase.com/changelog.md`; `https://supabase.com/docs/reference/api/introduction`; `https://supabase.com/docs/guides/getting-started/api-keys` | Management API v1 `GET /v1/projects/{ref}/api-keys?reveal=false` | Key metadata only; values/hashes/templates excluded. |
| `supabase-functions` | `https://supabase.com/changelog.md`; `https://supabase.com/docs/reference/api/introduction`; `https://supabase.com/changelog/33720-deploy-and-update-edge-functions-using-the-management-api` | Management API v1 `GET /v1/projects/{ref}/functions` | Reduced function identity/status fixture only. |
| `supabase-catalog` | `https://supabase.com/changelog.md`; `https://supabase.com/docs/guides/database/webhooks`; `https://supabase.com/docs/guides/cron` | PostgreSQL catalog concepts for Database Webhooks/`pg_net`/`pg_cron`; no remote SQL executed | Local synthetic catalog rows only; no customer/application rows. |
| `resend-keys` | `https://resend.com/docs/api-reference/api-keys/list-api-keys`; `https://resend.com/docs/api-reference/pagination`; `https://resend.com/changelog` | Current REST `GET /api-keys` | Current docs use `{object,has_more,data}` and omit legacy permission/domain fields expected by the reduced fixture; live current responses would be refused. |
| `resend-domains` | `https://resend.com/docs/api-reference/domains/list-domains`; `https://resend.com/docs/api-reference/pagination`; `https://resend.com/changelog` | Current REST `GET /domains` | Current docs represent `capabilities` as an object and include extra fields; the reduced fixture is intentionally not current provider authority. |
| `stripe-account` | `https://docs.stripe.com/api/accounts/retrieve`; `https://docs.stripe.com/changelog` | Stripe API v1 `GET /v1/accounts/{id}` | Reduced ID/object/livemode/country fixture only; no account request occurred. |
| `stripe-webhooks` | `https://docs.stripe.com/api/webhook_endpoints/list`; `https://docs.stripe.com/api/pagination`; `https://docs.stripe.com/changelog` | Stripe API v1 `GET /v1/webhook_endpoints` with cursor pagination | ID/status/URL host/livemode only; no endpoint or secret operation. |
| `railway` | `https://docs.railway.com/integrations/api`; `https://docs.railway.com/integrations/api/graphql-overview`; `https://docs.railway.com/integrations/api/api-cookbook`; `https://railway.com/changelog` | Railway GraphQL v2 at `https://backboard.railway.com/graphql/v2` | Account/workspace tokens use Bearer; project tokens use `Project-Access-Token`; reduced local graph only. |

## Exhausted safe access alternatives

The following inventory was checked on `2026-08-13`. No command below authenticated to or read a provider.

| Alternative checked | Exact result |
|---|---|
| Direct API/GraphQL reader | Refused/unavailable: no composed authority-bound reader exists; all five provider credential environment names were absent and credential values may not be sourced from argv, environment, clipboard, files, chat or output. |
| Vercel connector | Tool catalog exposes project/deployment reads, but not the exhaustive environment/alias/Cron/integration/webhook plus four-provider reconciliation required here. It was not called because its structured output is durable and it cannot supply the single protected five-provider window. |
| Supabase connector | Tool catalog exposes project/function/SQL capabilities, but not the exact five-provider protected reconciliation or complete `reveal=false` secret-key authority. It was not called; no SQL or provider row was read. |
| Resend, Stripe and Railway connectors | No callable connector for these providers was installed in the current tool catalog. |
| Vercel CLI | Installed and repository link marker present; `VERCEL_TOKEN` absent. Authentication/session status was not probed because that would start a provider read and the CLI cannot satisfy the protected no-output five-provider transport. |
| Supabase CLI | Not installed; repository project-ref marker present; `SUPABASE_ACCESS_TOKEN` absent. |
| Resend CLI | Not installed; `RESEND_API_KEY` absent. |
| Stripe CLI | Installed; `STRIPE_SECRET_KEY` absent. Authentication/session status was not probed for the same protected-output reason. |
| Railway CLI | Installed; `RAILWAY_API_TOKEN` absent. Authentication/session status was not probed for the same protected-output reason. |
| Existing browser/Chrome signed-in session | Browser-control capability exists, but no verified single session was available for all five exact authorities. Entering provider pages individually was refused because it would create provider reads without the approved in-memory projection/zero-output composition. |
| Local credential files or copied values | Refused by design; no `.env`, token store, clipboard, chat transcript or provider value was opened or copied. |
## Manual intervention

Safe alternatives were checked previously; there is no verified single protected five-provider session meeting the no-argv, no-environment, no-clipboard, no-file and no-output boundary.

1. Open one visible private operator window on the canonical machine.
2. Establish signed-in read-only access to the exact Vercel, Supabase, Resend, Stripe and Railway authorities without copying credentials into chat, clipboard or repository files.
3. Do not reveal values or run create, update, delete, revoke, send or deploy actions.
4. Keep the window open for a later authorized Builder to verify exact account/project binding and exhaustive pagination through sanitized projections.
5. Tell the later Builder only that the protected window is ready; do not paste credentials, screenshots or provider output.

After that action, the later Builder will verify exact account/team/project/workspace binding, exhaustive continuation for every list, the full 14-field seven-row allowlist, the unresolved accepted-object source edge, sanitized zero-value transport, and provider reads/actions/mutations/residue before changing any classification.

Operator confirmation or screenshots alone never establish provider facts.