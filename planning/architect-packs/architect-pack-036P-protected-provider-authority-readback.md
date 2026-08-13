# Architect Pack 036P - Protected Provider Authority Readback

============================================================
FILE: planning/sprints/036P-protected-provider-authority-readback/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/036P-protected-provider-authority-readback/blueprint.md
============================================================

# Sprint 036P Blueprint - Protected Provider Authority Readback

## Flight evidence

1. **Class and reason:** critical — auth, credential and provider-authority discovery has high blast radius. Sprint 036O falsely blocked the graph because a production basename beginning `test-` was classified as a test artifact, while 036P also crosses five protected provider authorities.
2. **Invariant:** only the accepted Git object and independently bound provider-native read-only authority may produce evidence. Caller claims, fixture brands, token possession, screenshots, zero rows without authority, decrypted values and write-capable routes cannot mint success. Every provider write/business effect remains zero.
3. **Affected origin-to-sink paths:** accepted object `bfeb0b23...` -> bounded file/mode/blob enumeration -> import/environment consumer graph -> seven credential roots -> Vercel/Supabase/Resend/Stripe/Railway read-only inventories -> sanitized seven-row capability matrix -> report/fallback. Protected input follows visible parent -> private child stdin -> in-memory provider response -> sanitized child envelope -> validated evidence only.
4. **Sources, transforms and sinks:** sources are exact Git tree bytes, masked expected authority IDs/credentials and fixed provider GET/read-only query responses; transforms are bounded resolution, strict decoders, pagination, ownership reconciliation, taint rejection and value-blind projection; sinks are the three approved evidence artifacts and later closeout records. No raw response, credential or control file is a sink.
5. **Discriminating examples:** admit `components/ops/test-evidence-manager.tsx` but exclude `*.test.*`, `*.spec.*` and test directories; refuse Vercel decrypted-env retrieval; refuse generic Supabase `/database/query`; preserve Railway project-token header semantics; refuse Resend exact-team success without independent team identity; stop before provider request 25 even if pagination is incomplete.
6. **Git truth:** canonical HEAD is `e2b8394...`; accepted deploy object is `bfeb0b23...`; its production component blob is `65d74be5...`; no Product edit is authorized. Names, modes, blobs, edges and final graph hash must be independently reproducible from that object.
7. **Uncertainty and negative/fallback paths:** missing provider access, wrong team/project/account/mode/token type, pagination beyond the global request ceiling, schema drift, zero/inaccessible authority, protected reflection, incomplete graph or residue lands `protected-provider-authority-readback-blocked-clean`. No fallback may claim target, trainer readiness or Product Done; malformed/ambiguous protected execution terminates cleanly.

## Phases

0. Canonical guard: verify CWD/Git root, branch, HEAD, dirty-tree preservation, staged/conflicts and closed 036O at `e2b8394...`.
1. Accepted-source graph: enumerate names/modes/blobs from `bfeb0b23...`; correct the overbroad `test-*` exclusion; prove the production manager edge; reject genuine ambiguity/missing edges/dynamic/client-secret/bounds failures.
2. Current contracts: revalidate official Vercel, Supabase, Resend, Stripe and Railway read-only contracts, versions, pagination and retrieval date; pin the immutable request matrix from `requirements.md`, including Vercel v10 non-decrypt env listing, Supabase `/database/query/read-only`, independent Resend team binding, Stripe account/mode proof and Railway token-specific headers/queries.
3. Protected reader: implement exactly five finite adapters with opaque authority handles, bounded request schemas, timeouts, value-blind projections and no arbitrary command/URL/GraphQL/mutation/reveal mode. Masked parent inputs travel only through one private child stdin pipe; sanitized envelopes alone return and are durably recorded.
4. Red-first local proof: discovery `60`, reader/projection `80`, transport/privacy `40`; focused `180`, retained `1603`, combined `1783`. No caps, padding or uncounted assertion loops.
5. CapabilityGate: establish available transports without provider requests; exhaust safe alternatives before manual intervention.
6. One protected read-only discovery: bind five exact authorities privately, paginate sequentially and stop on wrong authority, protected output, schema drift, cursor ambiguity or mutation signal.
7. Reconcile complete source/provider consumers and exactly seven capability rows; any unknown-blocking row keeps trainer closed.
8. Validate JSON/static/encoding, JS syntax, PowerShell AST, privacy/taint, typecheck, zero-warning lint, production build, diff/scope/lock/migration/Product/staged/conflict and zero-mutation/residue totals.
9. Fresh critical inspection, then exact 16-file closeout only after PASS.

## Action Ceilings

- Provider requests: maximum 24 total and 100 pages per provider family; the global 24-request ceiling dominates and incomplete pagination at request 24 lands fallback.
- Provider writes and business effects: `0`.
- Protected values revealed or persisted: `0`.
- Deployment/alias/env/domain/key/webhook/event/email/Railway writes: `0`.
- Identity/Auth/session/trainer/message/verification/graph/Storage actions: `0`.
- Product/schema/migration/dependency/lockfile edits: `0`.
- Stage/commit/push/PR inside sprint acceptance: `0`.

## Landing

Target language is permitted only when the corrected graph is complete and all five authorities, pagination chains and seven rows are independently reconciled. Otherwise close `protected-provider-authority-readback-blocked-clean` with the exact provider/access blocker, zero mutation/residue and no trainer/readiness claim. Accepted 036L remains unchanged; Product Done remains false.

============================================================
FILE: planning/sprints/036P-protected-provider-authority-readback/acceptance.md
============================================================

# Sprint 036P Acceptance - Protected Provider Authority Readback

This applied file is immutable sprint authority after the pre-build plan correction. `evidence/professional-engineering/036P-protected-provider-authority-readback/SPRINT-036P-REPORT.md` is the sole AC-01..40 disposition record; `planning/reviews/036P-protected-provider-authority-readback.md` records the final inspection. The third column below identifies that authority and is not a mutable checklist.

| ID | Acceptance criterion | Disposition authority |
| --- | --- | --- |
| AC-01 | Canonical CWD/Git root, branch, HEAD, dirty-tree, staged and conflict guards pass. | SPRINT-036P-REPORT.md |
| AC-02 | Pack dry-run/apply/readback is exact and traversal-safe. | SPRINT-036P-REPORT.md |
| AC-03 | Fresh critical plan review passes before implementation. | SPRINT-036P-REPORT.md |
| AC-04 | Exact 12 implementation/evidence files, 16 closeout files, arithmetic, ceilings and commands are durable. | SPRINT-036P-REPORT.md |
| AC-05 | Source graph is bound only to accepted object `bfeb0b23...`. | SPRINT-036P-REPORT.md |
| AC-06 | Production `test-evidence-manager.tsx` is admitted and its alias resolves exactly. | SPRINT-036P-REPORT.md |
| AC-07 | Test exclusions match only test directories and conventional test/spec suffixes. | SPRINT-036P-REPORT.md |
| AC-08 | Names, modes, blobs, edges and graph hash are independently reproducible. | SPRINT-036P-REPORT.md |
| AC-09 | Genuine missing/ambiguous imports, dynamic env names, client secrets and bounds fail closed. | SPRINT-036P-REPORT.md |
| AC-10 | Seven exact source roots/consumers/sinks reconcile without invented exclusion. | SPRINT-036P-REPORT.md |
| AC-11 | Current official five-provider read contracts, versions and retrieval date are durable. | SPRINT-036P-REPORT.md |
| AC-12 | Fixtures cannot mint authority or target success. | SPRINT-036P-REPORT.md |
| AC-13 | Vercel exact-authority reader and finite metadata pagination pass. | SPRINT-036P-REPORT.md |
| AC-14 | Supabase exact-project non-reveal key/Edge reader and schema-qualified `/database/query/read-only` catalog projection pass; generic query is refused. | SPRINT-036P-REPORT.md |
| AC-15 | Resend exact-team identity is independently bound before current non-value key/domain pagination passes without send. | SPRINT-036P-REPORT.md |
| AC-16 | Stripe exact-account/mode webhook reader passes without business effect. | SPRINT-036P-REPORT.md |
| AC-17 | Railway exact-authority read-only GraphQL reader passes. | SPRINT-036P-REPORT.md |
| AC-18 | All decoders reject wrong authority, duplicates, cursor drift, overflow and authority-affecting unknown fields. | SPRINT-036P-REPORT.md |
| AC-19 | No reveal/decrypt/arbitrary URL/command/GraphQL/mutation mode exists. | SPRINT-036P-REPORT.md |
| AC-20 | One visible unredirected outer window, masked parent inputs and one bounded private child enforce schemas and ceilings. | SPRINT-036P-REPORT.md |
| AC-21 | Protected values travel only from masked parent memory through child stdin and never enter chat, argv, env, clipboard, history, temp, repo, evidence or outer output. | SPRINT-036P-REPORT.md |
| AC-22 | Exact-value taint and protected-pattern reflection fail closed. | SPRINT-036P-REPORT.md |
| AC-23 | Timeout/malformed/extra/stderr/exit/interruption paths leave zero residue. | SPRINT-036P-REPORT.md |
| AC-24 | Exactly seven complete sanitized capability rows persist. | SPRINT-036P-REPORT.md |
| AC-25 | Reachability uses only the three allowed evidence-backed values. | SPRINT-036P-REPORT.md |
| AC-26 | Not-reachable-proven requires complete source plus provider-native absence. | SPRINT-036P-REPORT.md |
| AC-27 | Lifecycle/install/readback/predecessor/oracle capability is recorded but not executed. | SPRINT-036P-REPORT.md |
| AC-28 | Unavailable access records exact alternatives and one later owner action. | SPRINT-036P-REPORT.md |
| AC-29 | Manual intervention follows numbered protected steps and independent readback. | SPRINT-036P-REPORT.md |
| AC-30 | Provider writes and business effects are zero. | SPRINT-036P-REPORT.md |
| AC-31 | Product/schema/migration/RLS/permission/dependency/lockfile changes are zero. | SPRINT-036P-REPORT.md |
| AC-32 | Identity/trainer/message/verification/graph/session/Storage actions are zero. | SPRINT-036P-REPORT.md |
| AC-33 | Discovery `60/60`. | SPRINT-036P-REPORT.md |
| AC-34 | Reader `80/80`. | SPRINT-036P-REPORT.md |
| AC-35 | Transport `40/40`; focused total `180/180`. | SPRINT-036P-REPORT.md |
| AC-36 | Retained `1603/1603`; combined `1783/1783`. | SPRINT-036P-REPORT.md |
| AC-37 | Full quality/privacy/scope/lock/migration gates pass. | SPRINT-036P-REPORT.md |
| AC-38 | Evidence records exact reads, zero writes/actions/residue and target/fallback truth. | SPRINT-036P-REPORT.md |
| AC-39 | Genuinely fresh critical final inspection passes before closeout. | SPRINT-036P-REPORT.md |
| AC-40 | Final readback is consistent; accepted 036L unchanged, Product Done false, no sprint-internal publication. | SPRINT-036P-REPORT.md |

============================================================
FILE: planning/sprints/036P-protected-provider-authority-readback/handoff-prompt.md
============================================================

# Sprint 036P Builder Handoff - Protected Provider Authority Readback

## Task contract

**objective:** Correct the false 036O source-graph exclusion and produce one executable, privacy-safe, read-only five-provider authority manifest for the seven retained credential classes.

**owns:** The exact 12 implementation/evidence files and, only after fresh final inspection PASS, the exact 16 closeout files listed in `requirements.md`.

**must_not:** Do not change Product/schema/migrations/RLS/roles/permissions/dependencies/lockfile; reveal or persist protected values; perform provider writes, credential lifecycle actions, deployment/alias/env changes, identity/Auth/session/trainer/message/verification/graph/Storage actions, business effects, staging, commit, push or PR.

**acceptance:** AC-01..40 are truthfully dispositioned in `SPRINT-036P-REPORT.md`, the sole mutable disposition record. Applied `acceptance.md` remains immutable authority and the review file records final inspection. Target requires a complete corrected graph plus exhaustive exact-authority read-only evidence from all five providers and seven reconciled rows. Any unavailable authority lands only the named fallback with exact manual-action evidence and no readiness claim.

**verification:** Run `npm run test:provider-authority-discovery-036p`, `npm run test:provider-authority-reader-036p`, `npm run test:provider-authority-transport-036p`, the registered focused group, retained exact `1603`, JSON/static, JS syntax, PowerShell AST, privacy/taint, typecheck, zero-warning lint, production build, `git diff --check`, exact scope/lock/migration/Product/staged/conflict checks, sanitized read/write/residue reconciliation, and fresh critical inspection.

## Sequence

1. Verify canonical Git truth and applied four-file authority.
2. Return an exact no-edit plan with files, arithmetic, adapters, request ceilings, manual steps and landings for fresh critical plan review.
3. Implement red-first only after plan PASS.
4. Prove the corrected accepted-object graph before provider access.
5. Build real adapters against the immutable request matrix; fixtures or fixed-unavailable results cannot be target-capable. Resend additionally requires independent protected team identity binding.
6. Run local `180 + 1603 = 1783` gates.
7. Run one protected read-only discovery through the masked-parent/private-child/sanitized-envelope path, or exhaust safe alternatives and land the exact fallback. The global 24-request ceiling overrides per-family pagination ceilings.
8. Reconcile seven rows and zero mutation/action/residue totals.
9. Stop for genuinely fresh critical final inspection.
10. After PASS only, synchronize the exact 16 closeout files and read back.

Follow the Evidence-Proportional and Manual Intervention rules in `requirements.md`. Never ask for a protected value in chat or accept attestation/screenshot as proof.
