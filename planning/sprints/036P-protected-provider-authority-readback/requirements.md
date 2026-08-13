# Sprint 036P Requirements - Protected Provider Authority Readback

## Outcome

Correct the false accepted-source graph blocker from Sprint 036O and execute one privacy-safe, read-only authority reconciliation across the exact Vercel, Supabase, Resend, Stripe and Railway boundaries.

Target outcome: `protected-provider-authority-readback-complete-clean`.

Permitted fallback: `protected-provider-authority-readback-blocked-clean`.

This sprint is externally read-only. It does not rotate credentials, create or delete provider resources, change bindings, deploy, move aliases, disposition identities, contact a trainer, send a message, perform a verification, or claim launch readiness.

## Corrected Source Premise

Sprint 036O recorded `@/components/ops/test-evidence-manager` as absent from accepted Git object `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`. Exact Git-tree readback proves the production component exists there as `components/ops/test-evidence-manager.tsx`, blob `65d74be5a3f701ae9133bf353348b3253f36feef`.

The 036O graph classifier falsely excluded this production file because its basename begins with `test-`. Sprint 036P must treat only test directories and conventional `*.test.*` / `*.spec.*` files as tests; retain production filenames such as `test-evidence-manager.tsx`; bind every admitted file to the accepted Git object's mode and blob; resolve extensionless aliases and relative imports deterministically; and reject true ambiguity, dynamic secret access, client secret access, genuine missing imports, transformed bytes, oversized graphs and invented exclusions. No Product source file is changed to make the graph pass.

## Exact Credential Classes

The authority matrix covers exactly `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `ENQUIRY_ABUSE_HMAC_SECRET`, `PUBLIC_ENQUIRY_SMTP_PASS`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `RAILWAY_API_TOKEN`. Unknown, public, OIDC, historical, provider-wide and raw-value classes are refused.

## Executable Five-Provider Reader

After local source, projection, transport and privacy gates pass, Builder may run one bounded protected read-only session against the exact existing authorities:

- Vercel: exact team/project, all finite deployment pages, five aliases, environment-variable metadata without values, Cron, integrations and project webhooks;
- Supabase: exact project, API-key metadata with reveal disabled, Edge Functions, and exact read-only catalog projections for database webhooks, `pg_net`, `pg_cron` and relevant Vault-name references without values;
- Resend: exact team, API-key metadata and domain metadata without values and without sending. The team-scoped list envelopes do not contain an immutable team identifier, so the target additionally requires an independent protected `resend whoami`/profile or supported signed-in native identity readback bound to the expected team. A caller label, token possession, key rows or domain rows cannot mint team authority; if the independent binding is unavailable, Resend and the sprint land fallback;
- Stripe: exact account/mode and finite webhook endpoint metadata without payments, events, deliveries, activation or secret retrieval;
- Railway: exact token type/account/workspace/project/service/environment/job/integration metadata through read-only GraphQL.

The reader must be real and composed. Fixture decoders, caller booleans, screenshots, operator attestation or a fixed `reader unavailable` result cannot satisfy the target. Each adapter verifies the current official read-only contract immediately before use, binds opaque exact authority privately, paginates to exhaustion under finite ceilings, projects before durable output, and rejects wrong ownership, duplicates, cursor drift, protected output and authority-affecting unknown fields.

Unavailable access after the exact API, installed connector, installed CLI and existing signed-in-session alternatives are checked may land the fallback. The durable record must name the provider, alternatives checked, exact refusal and one later owner action. It may not claim target completion.

### Immutable Read-Only Request Matrix

- Vercel: `GET /v9/projects/{idOrName}`, `GET /v6/deployments`, aliases/Cron/integration/webhook GET surfaces, and `GET /v10/projects/{idOrName}/env` with the exact team scope. The reader must omit every decrypt/reveal flag and refuse the separate decrypted-value endpoint.
- Supabase: exact-project GET metadata, API-key metadata with `reveal=false`, Edge Function GET/list, and only `POST /v1/projects/{ref}/database/query/read-only` using schema-qualified `SELECT` statements and bound parameters. Generic `/database/query`, any non-SELECT statement and any unqualified entity reference are refused.
- Resend: current team-scoped `GET /api-keys` and `GET /domains` documented fields/pagination plus the independent protected team identity binding above. Permission/domain fields must not be invented on API-key rows when the current contract does not return them.
- Stripe: authenticated account readback plus exact live/test-mode consistency and read-only `GET /v1/webhook_endpoints` cursor pagination. Zero/inaccessible account proof, mode ambiguity, secret retrieval, event creation/delivery and every non-GET business surface fall back or refuse.
- Railway: exactly `POST https://backboard.railway.com/graphql/v2` with one fixed read-only query allowlist. Account/workspace tokens use `Authorization: Bearer`; project tokens use `Project-Access-Token` and must prove the exact project/environment. Unknown token type, introspection-driven arbitrary queries, mutations and inaccessible/zero authority rows fall back or refuse.

The global maximum of 24 provider requests dominates every per-family 100-page ceiling. If exhaustive pagination would require request 25, stop without issuing it and land fallback.

## Protected Transport

- One visible non-transcribed ConsoleHost; outer stdin/stdout unredirected.
- At most one bounded child with private anonymous pipes.
- The parent prompts separately for each required management credential and opaque expected authority ID using masked `Read-Host -AsSecureString`, or uses an approved OS credential-store handle. Missing access follows the numbered protected manual/fallback path; no caller-supplied success flag is accepted.
- Protected authority enters parent process memory only, is converted immediately before one request, and travels in plaintext only over the private child stdin pipe; never chat, argv, environment, clipboard, history, temp, repository, evidence, outer stdout or stderr.
- The child projects raw responses in memory and emits exactly one allowlisted sanitized envelope per request. The parent validates IDs, ordering, schema, bounds, taint and zero-mutation totals, then writes only the approved evidence files; no credential, raw response or control file is durable.
- Maximum request line 64 KiB; maximum 24 requests; maximum 2 MiB raw response per provider before projection; maximum 100 pages per provider family.
- Exact captured-value taint, protected-pattern, unknown-field and reflection checks precede every output.
- Visible mode refuses outer stdin/stdout redirection, transcript/history capture, non-ConsoleHost execution, a second/concurrent window and unsafe resume. Non-visible/redirection cases are executable negative tests.
- Any stderr, timeout, malformed/extra output, early exit or interruption terminates the child, clears/disposes owned buffers where supported, and proves zero child/process/temp residue without claiming universal memory erasure.

## Seven-Row Capability Matrix

For every class persist: class; exact provider/account/project alias; source consumers/completeness; provider consumers/pagination; trainer/Auth/portal/session/routing reachability (`required`, `not-reachable-proven`, or `unknown-blocking`); replacement mechanism; install targets; harmless readback; predecessor action; independent predecessor oracle; coupling/refusal; manual UI need; and later mutation disposition (`executable`, `blocked`, or `owner-action-required`).

`not-reachable-proven` requires complete accepted-source exclusion and exhaustive provider-native absence. Any `unknown-blocking` row blocks trainer work.

## Mutation Boundary

All provider writes, reveal/decrypt calls, environment/deployment/alias/domain/key/webhook/event/email/Railway writes, identity/Auth/session/trainer/message/verification/graph/Storage actions, Product/schema/migration/RLS/permission/dependency/lockfile changes, and sprint-internal stage/commit/push/PR actions have ceiling `0`.

## Exact File Boundary

Builder may create or modify only these 12 implementation/evidence files before final inspection:

1. `scripts/provider-authority-discovery-036P.mjs`
2. `scripts/provider-authority-reader-036P.mjs`
3. `scripts/Invoke-ProviderAuthorityReadback036P.ps1`
4. `scripts/test-provider-authority-discovery-036P.mjs`
5. `scripts/test-provider-authority-reader-036P.mjs`
6. `scripts/test-provider-authority-transport-036P.mjs`
7. `docs/PROTECTED_PROVIDER_AUTHORITY_READBACK_036P.md`
8. `evidence/professional-engineering/036P-protected-provider-authority-readback/external-ledger.json`
9. `evidence/professional-engineering/036P-protected-provider-authority-readback/evidence.md`
10. `evidence/professional-engineering/036P-protected-provider-authority-readback/SPRINT-036P-REPORT.md`
11. `package.json`
12. `scripts/run-validation-suite.mjs`

No Product, schema, migration, RLS, permission, dependency or lockfile file is authorized.

After a genuinely fresh final inspector returns PASS, synchronize exactly these 16 closeout files: `planning/ARCHITECT_BRIEFING.md`, `planning/DECISIONS.md`, `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`, `planning/DEFINITION_OF_DONE.md`, `planning/DOMAIN.md`, `planning/EVIDENCE_INDEX.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/QUESTIONS.md`, `planning/RISKS.md`, `planning/ROADMAP.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/STATE.md`, `planning/STATUS.json`, `planning/reviews/036P-protected-provider-authority-readback.md`, and `delivery_road_map.md`.

The sprint `acceptance.md` is immutable applied authority after this pre-build correction. It is outside both execution file lists. `SPRINT-036P-REPORT.md` is the sole AC-01..40 disposition record; the fresh review file is the final inspection record.

## Evidence-Proportional Execution

Stop only for material target, authority, security, privacy, destructive, integrity, production, scope or cleanup risk. Substitute equivalent or stronger safe evidence for supporting-tool failures. Keep in-scope harness, credential-access, validator, formatting, encoding, reporter and deterministic corrections here. Do not create a follow-up solely for an optional CLI, browser driver, connector or redundant check. Manual intervention is last.

## Manual Intervention

If one provider cannot be read autonomously: record the API, connector, CLI and existing signed-in-session alternatives checked; name the exact read-only surface; give numbered steps without displaying/transcribing a protected value; keep the operator inside the protected window; and independently verify authority, pagination, zero mutations and zero residue afterward. Attestation or screenshot alone never passes.
