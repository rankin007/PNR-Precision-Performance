============================================================
FILE: planning/sprints/036O-provider-authority-and-trainer-path-discovery/requirements.md
============================================================

# Sprint 036O Requirements - Provider Authority and Trainer-Path Discovery

## Outcome

Establish a current, executable, read-only authority manifest for the exact live provider boundary and prove which of the seven retained credential classes can reach the accepted Sprint 036L trainer/Auth journey.

Target outcome: `trainer-path-provider-authority-manifest-complete-clean`.

Permitted fallback: `provider-authority-discovery-blocked-clean`.

This sprint is discovery and readback only. It does not rotate a credential, create a deployment, move an alias, change an environment binding, disposition an identity, contact a trainer, or claim launch readiness.

## Why This Sprint Exists

Sprints 036K, 036M, and 036N proved strong local safety contracts but did not establish executable provider-native inventory, lifecycle, or predecessor-oracle authority. Sprint 036O narrows the problem before any further live attempt: it must replace guessed provider shapes with current official contracts and sanitized read-only evidence, and it must separate trainer-path blockers from unrelated retained classes.

## Exact Credential Classes

The manifest covers exactly:

1. `SUPABASE_SERVICE_ROLE_KEY`
2. `CRON_SECRET`
3. `ENQUIRY_ABUSE_HMAC_SECRET`
4. `PUBLIC_ENQUIRY_SMTP_PASS`
5. `STRIPE_SECRET_KEY`
6. `STRIPE_WEBHOOK_SECRET`
7. `RAILWAY_API_TOKEN`

Unknown, public, OIDC, historical, provider-wide, and raw-value classes are refused.

## Read-Only Authority Scope

Builder may perform bounded authenticated read-only discovery against the exact existing Vercel, Supabase, Resend, Stripe, and Railway authorities after local privacy and projection tests pass.

Permitted facts are limited to:

- exact provider/account/team/project identity as opaque or approved aliases
- IDs, names, types, targets, status classes, page/cursor counts, and ownership relationships that are non-secret and necessary to reconcile authority
- Vercel project, deployment, alias, environment-variable metadata, Cron, integration, and webhook metadata without decrypting values
- Supabase project API-key metadata with `reveal=false`, Edge Function metadata, and exact read-only SQL catalog projections for database webhooks, `pg_net`, and `pg_cron`
- Resend API-key and domain metadata without key values and without sending email
- Stripe account/mode and webhook-endpoint metadata without payment, event, delivery, activation, or secret retrieval
- Railway token-type classification and account/workspace/project/service/environment/job/integration metadata through read-only GraphQL
- current official lifecycle and predecessor-oracle availability for each class

Every provider call must be exact-scope, finite, projected before durable output, and incapable of mutation. Missing pagination, an unknown response field that affects authority, wrong account/project, ambiguous ownership, or protected output lands the clean fallback.

## Source and Reachability Authority

- Bind the source manifest to accepted Sprint 036L Git object `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`.
- Inspect the Git object directly; never copy from or deploy the dirty worktree.
- Derive direct and transitive consumers for all seven classes, including Next.js server/client boundaries, internal routes, `vercel.json`, Supabase functions/migrations, and provider callbacks represented in source.
- Reconcile source consumers with provider-native metadata.
- For every class, record a falsifiable trainer-path result: `required`, `not-reachable-proven`, or `unknown-blocking`.
- `not-reachable-proven` requires both source-graph exclusion and provider-native absence from Auth, callback, portal, routing, session, trainer, and accepted-live deployment paths. Repository inspection or Vercel absence alone is insufficient.
- Any `unknown-blocking` class continues to block a trainer flight.

## Capability Matrix

For every class, record exactly:

- authoritative provider/account/project
- current consumer inventory and pagination status
- trainer-path reachability disposition
- documented replacement create/select mechanism
- documented install targets
- harmless intended-use authentication/readback mechanism
- predecessor revoke/delete/deactivate mechanism
- independent predecessor absence or rejection oracle
- coupling and refusal conditions
- whether a protected manual UI step would be required
- whether a later mutation sprint is executable, blocked, or needs one named owner action

Documented capability is not permission to execute it in 036O.

## Privacy and Protected Access

- Never request or paste protected values in chat.
- Never use reveal/decrypt endpoints or persist raw provider responses.
- Protected access, if needed, occurs in one visible non-transcribed interactive window after local gates pass.
- Credentials may enter only masked process memory and a bounded child pipe; never argv, environment, clipboard, temp files, repository files, evidence, stdout, or stderr.
- Durable evidence contains only provider/class aliases, finite codes, booleans, counts, approved non-secret IDs, Brisbane timestamps, capability dispositions, and zero-action totals.
- Exact captured-value taint and protected-pattern scans must reject reflection before output.

## Mutation Boundary

All mutation ceilings are zero:

- provider create/update/delete/revoke/deactivate calls: `0`
- Vercel environment, deployment, alias, domain, integration, or webhook writes: `0`
- Supabase key, Auth, session, database, Storage, function, Cron, or configuration writes: `0`
- Resend email/key/domain writes: `0`
- Stripe payment/key/webhook writes or events: `0`
- Railway writes: `0`
- identity, trainer, OTP, message, verification, graph, Product, schema, migration, RLS, role, permission, dependency, lockfile, commit, push, and PR actions: `0`

A read-only endpoint that cannot be proved non-mutating is refused.

## File Boundary

Builder plan must stay within these 12 implementation/evidence files before review:

1. `scripts/provider-authority-discovery-036O.mjs`
2. `scripts/provider-authority-projections-036O.mjs`
3. `scripts/Invoke-ProviderAuthorityDiscovery036O.ps1`
4. `scripts/test-provider-authority-discovery-036O.mjs`
5. `scripts/test-provider-authority-projections-036O.mjs`
6. `scripts/test-provider-authority-transport-036O.mjs`
7. `docs/PROVIDER_AUTHORITY_AND_TRAINER_PATH_036O.md`
8. `evidence/professional-engineering/036O-provider-authority-and-trainer-path-discovery/external-ledger.json`
9. `evidence/professional-engineering/036O-provider-authority-and-trainer-path-discovery/evidence.md`
10. `evidence/professional-engineering/036O-provider-authority-and-trainer-path-discovery/SPRINT-036O-REPORT.md`
11. `package.json`
12. `scripts/run-validation-suite.mjs`

After a different fresh final inspector returns PASS on implementation/evidence, synchronize exactly these 16 closeout files and no substitutes:

1. `planning/ARCHITECT_BRIEFING.md`
2. `planning/DECISIONS.md`
3. `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`
4. `planning/DEFINITION_OF_DONE.md`
5. `planning/DOMAIN.md`
6. `planning/EVIDENCE_INDEX.md`
7. `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`
8. `planning/QUESTIONS.md`
9. `planning/RISKS.md`
10. `planning/ROADMAP.md`
11. `planning/SPRINT_LIFECYCLE_LEDGER.md`
12. `planning/SPRINT_SCHEDULE.md`
13. `planning/STATE.md`
14. `planning/STATUS.json`
15. `planning/reviews/036O-provider-authority-and-trainer-path-discovery.md`
16. `delivery_road_map.md`

No Product file is authorized. Any user-requested commit or push occurs only after the sprint landing and final readback, outside 036O acceptance and its zero-publication boundary.

## Evidence-Proportional Execution

Stop only for material target, authority, security, privacy, destructive, integrity, production, scope, or cleanup risk. Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope harness, credential-access, validator, formatting, encoding, reporter, and deterministic corrections in 036O. Do not create another suffix solely because an optional CLI, browser driver, connector, or redundant check is unavailable. Use manual intervention only after safe in-scope alternatives are exhausted.

## Manual Intervention

If read-only provider access genuinely requires an operator:

1. record the unavailable API, connector, CLI, or signed-in-session mechanism and the safe alternatives checked;
2. name the exact provider surface and read-only action;
3. provide numbered instructions that never include a protected value;
4. keep the operator in the protected window and output only the sanitized projection;
5. independently verify scope, page exhaustion, and zero mutations afterward.

Operator attestation or a screenshot alone never passes a provider fact.

============================================================
FILE: planning/sprints/036O-provider-authority-and-trainer-path-discovery/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/036O-provider-authority-and-trainer-path-discovery/acceptance.md
============================================================

# Sprint 036O Acceptance - Provider Authority and Trainer-Path Discovery

Status values at closeout: `PASS`, `FALLBACK`, `NOT STARTED`, or `FAIL`.

| ID | Acceptance criterion |
|---|---|
| AC-01 | Canonical CWD/Git root, branch, HEAD, dirty baseline, staged zero, and conflicts zero are proved before work and reread at closeout. |
| AC-02 | The Architect Pack validates as exactly four unique traversal-safe sprint files and Builder applies that same Pack. |
| AC-03 | Current official Supabase changelog/API-key/Management authority and Vercel, Resend, Stripe, and Railway documentation are recorded before decoder implementation. |
| AC-04 | A genuinely fresh Architect context returns PASS on the exact Builder file plan, counts, endpoint matrix, privacy boundary, and read-only ceilings before implementation. |
| AC-05 | Source authority is bound to accepted Sprint 036L Git object `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`, not the dirty worktree. |
| AC-06 | Direct and transitive source consumers for exactly seven credential classes are complete and hash-bound. |
| AC-07 | Vercel exact team/project identity is proved through a bounded read-only request. |
| AC-08 | Vercel deployment inventory paginates to exhaustion and rejects omitted, duplicate, foreign, or ambiguous rows. |
| AC-09 | Vercel environment metadata covers exact target/name rows without requesting or exposing values. |
| AC-10 | Vercel aliases, Cron, integrations, and webhooks are inventoried or natively proved absent without mutation. |
| AC-11 | Supabase exact project API-key metadata is read with `reveal=false`; no key value or private provider row is output. |
| AC-12 | Supabase Edge Function metadata is inventoried or natively proved absent. |
| AC-13 | Exact read-only SQL catalog queries project database webhooks, `pg_net`, and `pg_cron` metadata without reading application/customer rows. |
| AC-14 | Resend API-key and domain envelopes are decoded separately and exact account/domain authority is reconciled without send or write. |
| AC-15 | Stripe exact account/mode and paginated webhook endpoint metadata are reconciled with zero commerce or webhook effect. |
| AC-16 | Railway token type and exact account/workspace/project/service/environment/job/integration authority are projected through bounded read-only GraphQL. |
| AC-17 | Every provider reader binds the expected account/team/project before accepting rows; mismatch fails closed. |
| AC-18 | Pagination continuation, cursor, duplicate, page-limit, malformed response, and unknown authority cases fail closed. |
| AC-19 | Raw provider responses and protected values never enter chat, argv, environment, clipboard, temp files, repository, stdout, stderr, or evidence. |
| AC-20 | Exactly seven capability rows are recorded and unknown/public/OIDC/history/provider-wide classes are refused. |
| AC-21 | Every class receives exactly one trainer-path reachability result: `required`, `not-reachable-proven`, or `unknown-blocking`. |
| AC-22 | Auth, PKCE callback, middleware refresh, session, portal, dashboard, horse, and accepted-live deployment paths are included in the transitive reachability graph. |
| AC-23 | `not-reachable-proven` requires both source exclusion and provider-native exclusion; repository or Vercel absence alone cannot pass. |
| AC-24 | Every class records current documented replacement lifecycle availability without executing it. |
| AC-25 | Every class records an independent predecessor rejection/absence oracle or one exact blocking reason. |
| AC-26 | UI-only capability is labelled and cannot pass without a later independent native readback design. |
| AC-27 | Any required manual intervention records the blocker, evidence checked, exact numbered operator action, and post-action verification. |
| AC-28 | Provider, deployment, alias, environment, credential, identity, trainer, OTP, data, and Product mutation counts all remain zero. |
| AC-29 | Trainer contact, message, verification, identity disposition, graph change, and prior-graph retirement remain not started. |
| AC-30 | Target outcome requires complete seven-row authority, exact trainer-path decision, zero protected output, and zero mutation/residue. |
| AC-31 | Fallback preserves accepted Sprint 036L and names one exact unresolved authority/manual boundary without claiming readiness. |
| AC-32 | Focused assertions pass exactly `45 + 50 + 25 = 120/120` with no padding. |
| AC-33 | Retained Sprint 036N proof passes `1483/1483`; combined counted proof is `1603/1603`. |
| AC-34 | JSON, static/encoding, typecheck, zero-warning lint, production build, JS syntax, PowerShell AST, and registered validation gates pass. |
| AC-35 | Exact 12-file implementation/evidence scope plus post-PASS closeout scope protects Product, schema, migrations, RLS, permissions, dependencies, lockfile, DNS, commerce, and enquiry behavior. |
| AC-36 | Sanitized evidence records source/provider authority, page counts, seven rows, reachability, capabilities, zero actions, limitations, and residue without protected values. |
| AC-37 | A different genuinely fresh inspector, not the plan reviewer, returns PASS on the complete implementation/evidence diff and read-only run before closeout. |
| AC-38 | Provider evidence is distinguished from documented capability, operator attestation, and local fixtures; none is silently substituted. |
| AC-39 | The exact 16 closeout paths enumerated in `requirements.md` are synchronized only after PASS. |
| AC-40 | Final disk/Git/provider readback proves truthful outcome, zero staged/unauthorized mutation/residue, no false trainer/launch/Product Done claim, and no sprint-time commit/push/PR; separately requested publication may occur only after landing/readback. |

============================================================
FILE: planning/sprints/036O-provider-authority-and-trainer-path-discovery/handoff-prompt.md
============================================================

# Sprint 036O Builder Handoff - Provider Authority and Trainer-Path Discovery

## Task Contract

**Objective**

Build and execute a bounded read-only provider authority discovery that reconciles current Vercel, Supabase, Resend, Stripe, and Railway metadata with the accepted Sprint 036L source, produces seven exact capability rows, and proves which classes can reach the trainer/Auth journey.

**Owns**

- the exact 12 implementation/evidence files in `requirements.md`
- current official provider documentation and changelog discovery
- bounded authenticated read-only provider metadata calls after local gates
- one source/provider reachability manifest and seven exact capability rows
- the exact 16 closeout files enumerated in `requirements.md`, only after a different fresh final inspector returns PASS

**Must not**

- mutate any provider, deployment, alias, environment binding, credential, webhook, integration, Cron, database, Auth, session, identity, trainer, graph, Storage, Product, schema, migration, RLS, role, permission, dependency, or lockfile state
- reveal or persist secrets, tokens, decrypted environment values, private provider rows, customer data, identities, raw errors, or raw provider responses
- contact the trainer, send or verify OTP, or claim trainer/launch/Product readiness
- treat documentation, fixtures, operator confirmation, source inspection, or Vercel absence as live provider proof
- commit, push, create a PR, or deploy during 036O; any separately requested commit/push occurs only after sprint landing/readback and outside acceptance

**Acceptance**

All AC-01..40 are truthfully dispositioned. The target requires exact paginated provider authority, seven reconciled capability rows, an evidence-backed trainer-path decision, zero protected output, and zero external mutations/residue. Any missing provider authority lands `provider-authority-discovery-blocked-clean` with one exact blocker/manual action and accepted Sprint 036L unchanged.

**Verification**

Run focused `120/120`, retained `1483/1483`, combined `1603/1603`, the bounded read-only provider discovery, and all JSON/static/type/lint/build/syntax/privacy/scope/lock/migration/Git gates. Stop at a sanitized stable checkpoint for review by a different fresh final inspector.

## Builder Sequence

1. Read mandatory boot files, the applied 036O sprint files, 036N closeout/evidence, accepted 036L authority, relevant source, and current official provider docs.
2. Reconfirm canonical workspace and Git guard.
3. Return an exact no-edit plan containing:
   - exact file list and assertion arithmetic
   - endpoint/tool and pagination matrix for each provider
   - exact protected-access and projection design
   - source-manifest and trainer-path graph method
   - seven capability rows and refusal semantics
   - zero-mutation ceilings
   - AC-01..40 mapping
   - manual intervention, if any
4. Wait for a genuinely fresh Architect plan PASS before implementation.
5. Implement red-first. Keep deterministic harness, decoder, formatting, encoding, reporter, and evidence corrections inside 036O.
6. Pass all local gates before any authenticated provider read.
7. Use a single protected read-only window when credentials or signed-in sessions are required; never place protected values in chat or durable output.
8. Stop on wrong account/project, incomplete pagination, protected output, response ambiguity, any mutation-capable request, or cleanup uncertainty.
9. Produce seven exact rows and the trainer-path decision, then request review by a different fresh final inspector.
10. Close out only after PASS.

## Manual Intervention Rule

Before asking for operator help, exhaust safe API, connector, CLI, and existing signed-in-session alternatives. If still blocked, record what failed, what was checked, the exact read-only action required, numbered instructions, and what Builder will verify afterward. Never ask the user to paste credentials or private provider output into chat.

## Stop Conditions

Return `fix` or `ask` before implementation for a material file/count contradiction, an unbounded provider reader, a missing privacy projection, or a reachability model that can self-attest success. During execution, use the clean fallback rather than widening scope or performing any mutation.
