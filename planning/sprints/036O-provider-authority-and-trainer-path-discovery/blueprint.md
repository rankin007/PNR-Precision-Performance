# Sprint 036O Blueprint - Provider Authority and Trainer-Path Discovery

## Build Sequence

1. Reconfirm canonical workspace, accepted dirty tree, branch/HEAD, zero staged/conflicts, closed 036N fallback, accepted 036L source, lock hash, and 25-migration/50-dependency authority.
2. Record current official provider contracts and relevant breaking changes before implementing decoders.
3. Build a pure source-manifest and reachability controller bound to `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`.
4. Build strict provider response projections for Vercel, Supabase, Resend, Stripe, and Railway. Raw objects never leave process memory.
5. Build a read-only protected wrapper with exact modes `SelfTest`, `CapabilityGate`, and `ReadOnlyDiscovery`; no mutation verb or arbitrary command exists.
6. Run red-first focused tests and retained 036N proof before provider access.
7. Run one bounded read-only discovery window. Stop at the first material privacy, authority, pagination, or account mismatch.
8. Reconcile the source graph and provider facts into seven exact capability rows and a trainer-path decision.
9. Rerun local gates, request review by a different genuinely fresh inspector, not the plan reviewer, and close out only after PASS.

## Implementation Shape

### Discovery controller

- module-private opaque handles for protected authority values
- exact phase order: `local -> source -> vercel -> supabase -> resend -> stripe -> railway -> reconcile -> close`
- maximum one read-only provider phase per named provider
- immutable snapshot and append-only sanitized ledger
- exact seven-class registry and three reachability states
- no success path from caller-provided booleans, counts, manifests, or provider names

### Provider projections

- bounded response bytes, depth, row counts, and maximum 100 pages per provider
- endpoint-specific schemas derived from current official documentation and executable fixtures
- pagination cursor/has-more semantics validated rather than guessed
- request scope independently binds expected account/team/project before rows are accepted
- duplicate, reordered, cross-owner, missing-page, unknown-authority, and protected-field cases fail closed
- capability descriptions remain separate from live permission and from mutation authority

### Vercel

Read only exact team/project details, project environment metadata, deployments, aliases, project Cron configuration, integrations, and webhooks. Do not request decrypted environment values. Reconcile all addressable deployments and accepted 036L routing without changing either.

### Supabase

Use current Management API or Supabase MCP read-only methods for exact project API-key metadata with `reveal=false` and Edge Functions. Use exact read-only SQL catalog queries for triggers/functions that invoke database webhooks, `supabase_functions.http_request`, `net.http_*`, and `pg_cron`. Query metadata only; no user/customer/application rows.

### Resend

Distinguish API-key and domain response envelopes. Record key ID/name/permission/domain and domain ID/name/status/capability classes only. No key reveal, verification change, or email send.

### Stripe

Record exact account/mode and paginated webhook endpoint ID/status/URL-host projection. Record whether API-key lifecycle and webhook-secret predecessor rejection are actually exposed by current native authority. No payment, checkout, refund, event, delivery, endpoint change, or secret retrieval.

### Railway

Use POST GraphQL with a real bounded read-only query. Respect token-type authentication: project tokens use `Project-Access-Token`; account/workspace tokens use Bearer. Project only account/workspace/project/service/environment/deployment/job/integration identities needed for authority. No mutation or schema-wide dump.

## Reachability Decision

Build a graph whose roots are the seven classes and whose sinks include:

- browser public client
- PKCE callback and middleware session refresh
- server and admin clients
- trainer sign-in and Auth/session state
- portal/dashboard/horse routes
- internal Cron/enquiry routes
- Stripe webhook route
- external email and Railway surfaces
- accepted 036L current deployment and every still-addressable deployment

Each class receives one reachability result:

- `required`: an accepted-live trainer/Auth path consumes it
- `not-reachable-proven`: source and provider facts jointly exclude it from every trainer/Auth sink
- `unknown-blocking`: evidence is incomplete or contradictory

The final trainer-path gate passes only when every class is `required` or `not-reachable-proven`, and each `required` class has a documented executable lifecycle and independent predecessor oracle for a later sprint.

## Exact Local Proof

New focused assertions: `120/120`.

- discovery/source/reachability: `45`
- provider projections/capability rows: `50`
- protected read-only transport/privacy: `25`

Retain Sprint 036N combined proof: `1483/1483`.

Total counted target: `1603/1603`.

The real read-only provider run is uncounted behavioral evidence and must not be double-counted.

## Flight evidence

**Class:** `critical`. Although 036O permits reads only, a wrong implementation could expose credentials or private provider rows, misclassify an authentication dependency, or authorize a later high-blast-radius rotation from false evidence.

**Acceptance invariant at risk:** every durable provider fact must originate from a current exact-scope read-only authority, survive strict projection and pagination checks, reconcile with the accepted source graph, and produce zero protected output and zero mutations. No caller boolean, repository-only absence, or generic provider row may become a trainer-path or lifecycle success.

**Affected layers and verified paths:**

- source configuration roots: `.env.example`, `lib/supabase/env.ts`, `lib/stripe/env.ts`, `lib/enquiries/env.ts`, and `lib/runtime/platform-status.ts`;
- Auth/session construction: `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/admin.ts`, `lib/supabase/middleware.ts`, and `app/auth/callback/route.ts`;
- credential-consuming routes: `app/api/internal/evidence/reconcile/route.ts`, `app/api/internal/enquiries/route.ts`, `app/api/enquiries/route.ts`, and `app/api/stripe/webhook/route.ts`;
- accepted live-source authority: Git object `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570` and the retained Sprint 036L five-alias/three-binding record;
- provider sinks: exact Vercel team/project metadata, Supabase project/key/Edge/catalog metadata, Resend account/key/domain metadata, Stripe account/mode/webhook metadata, and Railway token-scope/project graph metadata;
- durable sink: the sanitized seven-row capability/reachability manifest and zero-action external ledger.

**Source of truth and transformations:** current official provider documentation defines request/response and pagination contracts; the accepted Git object defines the source consumer graph; exact authenticated read-only responses are decoded into finite endpoint-specific projections; those projections reconcile with source consumers; the graph classifier emits only `required`, `not-reachable-proven`, or `unknown-blocking`; evidence stores only allowlisted aliases, IDs, counts, booleans, dispositions, timestamps, and zero-action totals.

**Discriminating examples:**

1. A Vercel deployment page for the wrong team/project or with a continuation cursor is refused, while a plausible but wrong implementation that trusts the caller's project flag or reads only page one would report completeness.
2. `SUPABASE_SERVICE_ROLE_KEY` is `required` when server/admin paths consume it even if no browser client does; a name-only or client-only graph would incorrectly classify it not reachable.
3. `STRIPE_WEBHOOK_SECRET` remains `unknown-blocking` when an endpoint exists but current native authority exposes no non-business predecessor-rejection oracle; endpoint presence alone must not become lifecycle-ready.
4. Railway project-token metadata authenticated with `Authorization: Bearer` is refused; the documented project-token form uses `Project-Access-Token`, while account/workspace tokens use Bearer.
5. A Resend domains envelope `{object,has_more,data}` cannot be decoded as an API-key row list; conflating the shapes would create false account/domain closure.
6. A provider response containing an exact captured token substring under an innocuous key is refused by taint scanning; a key-name-only redactor would leak it.

**Durable verification state:** canonical Git root and CWD match; branch is `codex/025B-versioned-domain-authority-package`; HEAD is `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`; staged and conflict counts are zero; Sprint 036N closed `native-closure-blocked-clean` with `1483/1483` and external/private/mutation/residue `0/0/0/0`.

**Known uncertainty:** live provider account/session availability, exact current row shapes, and lifecycle/oracle exposure are intentionally unresolved until 036O's bounded authenticated read-only run. Missing authority lands `provider-authority-discovery-blocked-clean`; it is never invented or upgraded through operator attestation.

## Review and Landing

- A genuinely fresh Architect context reviews the exact Builder plan before implementation.
- Builder stops at a sanitized stable implementation/evidence checkpoint.
- A different genuinely fresh inspector, not the plan reviewer, reviews the complete diff and provider evidence.
- Complete target requires seven reconciled rows, complete pagination, no protected output, an exact trainer-path decision, and zero mutations/residue.
- Clean fallback requires zero mutations/residue and one exact blocker/manual action; it is not trainer readiness.
