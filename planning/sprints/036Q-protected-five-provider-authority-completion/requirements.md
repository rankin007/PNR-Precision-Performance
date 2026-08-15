# Sprint 036Q Requirements - Protected Five-Provider Authority Completion

## Outcome

Complete the missing privacy-safe, read-only authority record for the exact Vercel, Supabase, Resend, Stripe and Railway boundaries so the seven retained credential classes can be dispositioned from provider-native evidence rather than guesses.

Target outcome: `protected-five-provider-authority-complete-clean`.

Permitted fallback: `protected-five-provider-authority-blocked-clean`.

This sprint is externally read-only. It does not rotate credentials, create or delete provider resources, change bindings, deploy, move aliases, change Product or data, disposition identities, contact a trainer, send a message, perform a verification, or claim launch readiness. Accepted Sprint 036L remains the live Production authority.

## Starting Authority

- Canonical branch: `codex/025B-versioned-domain-authority-package`.
- Starting HEAD: `c90c3201380d7f61e03647ca6e46b03dc4c27985`.
- Accepted deploy source: `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`.
- Retained Sprint 036P provider history: four reads; provider writes, mutations, business effects, residue and trainer actions all zero.
- Retained proof boundary: Sprint 036P focused `180/180`, retained `1603/1603`, combined `1783/1783`.
- The accepted-source graph is complete. Exact five-provider authority is incomplete and every one of the seven rows remains `unknown-blocking`.

## Exact Credential Classes

The matrix covers exactly `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `ENQUIRY_ABUSE_HMAC_SECRET`, `PUBLIC_ENQUIRY_SMTP_PASS`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `RAILWAY_API_TOKEN`. Unknown, public, OIDC, historical, provider-wide and raw-value classes are refused.

## Read-Only Authority Session

After local gates and Architect plan PASS, Builder may run at most one visible, non-transcribed, protected 90-minute session with Phillip and Randell. The trainer is not required.

The session may perform no more than 24 new provider requests. Together with the retained four reads, the cumulative durable read count may not exceed 28. Request 25 is never issued. A missing credential, wrong authority, incomplete pagination, response drift, protected reflection, timeout, stderr, uncertain residue or need for a write lands the fallback.

### Vercel

- Bind the exact team and project privately.
- Use the Sprint 036P fixed read-only request matrix, including `GET /v9/projects/{idOrName}`, Pack-pinned `GET /v6/deployments`, distinct alias/Cron/integration/webhook GET surfaces and `GET /v10/projects/{idOrName}/env` without decrypt/reveal behavior.
- Paginate to exhaustion within the global request ceiling and require exact owner/team/project membership.
- Read values, decrypted environment routes, deployment, alias, environment mutation and arbitrary URLs are forbidden.

### Supabase

- Bind the exact project privately with existing supported Management API authority.
- Read project metadata, API-key metadata with `reveal=false`, Edge Functions and four fixed catalog projections only through `POST /v1/projects/{ref}/database/query/read-only`.
- Catalog statements are fixed schema-qualified `SELECT` operations for database webhooks, `pg_net`, `pg_cron` and relevant Vault-name references without values.
- Generic `/database/query`, reveal behavior, non-SELECT SQL, unqualified catalog access, JWT/session mutation and all writes are refused.

### Resend

- Exact team identity must be independently bound before API-key or domain rows can count as authority. Token possession, caller labels, key rows and domain rows cannot mint the team.
- Supported mechanisms are limited to a pre-existing official Resend CLI/profile or existing signed-in native session that can return an exact sanitized team identity without exposing or persisting a new credential during this sprint.
- Builder must not install or log in to the Resend CLI, pass a secret or profile handle in argv or environment, create a credential file, or rely on screenshot/operator attestation.
- If no already-authenticated, non-mutating exact-team readback exists, Resend and the sprint land fallback before Resend API requests.
- When authority exists, paginate current `GET /api-keys` and `GET /domains` envelopes to exhaustion with documented cursor semantics and no send.

### Stripe

- Bind exact account and live/test mode privately.
- Read authenticated account metadata and paginate `GET /v1/webhook_endpoints` to exhaustion.
- Zero/inaccessible authority, mode ambiguity, secret retrieval, event creation/delivery, payment, refund and every non-read business surface refuse or fall back.

### Railway

- Bind exact token type, account/workspace, project and environment privately.
- Use only `POST https://backboard.railway.com/graphql/v2` with fixed read-only queries.
- Account/workspace tokens use `Authorization: Bearer`; project tokens use `Project-Access-Token` and must prove exact project/environment.
- Unknown token type, arbitrary queries, introspection-driven expansion, mutations and inaccessible/zero authority rows refuse or fall back.

## Protected Transport

- One visible interactive ConsoleHost; outer stdin/stdout unredirected; transcription/history capture off.
- At most one bounded child using anonymous redirected stdin/stdout/stderr pipes.
- Parent retains each provider-specific SecureString and opaque expected ID until that provider requests it, converts it immediately before that provider request, sends it only through private child stdin and clears/disposes owned buffers after the response where supported.
- Protected values never enter chat, argv, environment, clipboard, history, temp, repository, evidence, outer output or child output.
- Fixed child argv only. No Resend profile, authority handle or credential may appear in argv.
- Child raw responses remain in memory and are projected to one strict sanitized envelope per request. Parent validates provider order, exact authority, pagination, seven-row schema, request totals, target/fallback consistency, taint and zero-action totals before evidence persistence.
- Request line maximum 64 KiB; cumulative raw response maximum 2 MiB per provider; maximum 100 pages per family but global 24 new-request ceiling dominates.
- Timeout, stderr, malformed/extra output, reflection, early exit or interruption terminates the child and proves owned process/temp residue zero without claiming universal memory erasure.
- A session cannot resume after process exit unless a fresh read-only baseline safely reconstructs every required fact within the same request ceiling; otherwise fallback.

## Seven-Row Authority Result

For each class persist exactly these sanitized fields: class; exact provider/account/project alias; source consumers/completeness; provider consumers/pagination; reachability (`required`, `not-reachable-proven`, or `unknown-blocking`); replacement mechanism; install targets; harmless readback; predecessor action; independent predecessor oracle; coupling/refusal; manual UI need; later mutation disposition (`executable`, `blocked`, or `owner-action-required`).

Target requires all five provider authorities independently bound, every required page exhausted, exactly seven complete rows, zero protected reflection and zero writes/mutations/business effects/residue. `not-reachable-proven` requires complete accepted-source exclusion plus exhaustive provider-native absence. Any `unknown-blocking` row keeps later trainer work closed.

## Exact File Boundary

Builder may create or modify only these 12 implementation/evidence files before final Architect diff review:

1. `scripts/Invoke-ProviderAuthorityCompletion036Q.ps1`
2. `scripts/test-provider-authority-completion-036Q.mjs`
3. `scripts/test-provider-authority-transport-036Q.mjs`
4. `docs/PROTECTED_FIVE_PROVIDER_AUTHORITY_COMPLETION_036Q.md`
5. `evidence/professional-engineering/036Q-protected-five-provider-authority-completion/external-ledger.json`
6. `evidence/professional-engineering/036Q-protected-five-provider-authority-completion/evidence.md`
7. `evidence/professional-engineering/036Q-protected-five-provider-authority-completion/SPRINT-036Q-REPORT.md`
8. `package.json`
9. `scripts/run-validation-suite.mjs`
10. `scripts/provider-authority-reader-036P.mjs`
11. `scripts/test-provider-authority-reader-036P.mjs`
12. `scripts/test-provider-authority-transport-036P.mjs`

Files 10-12 may change only when a red-first current-contract or protected-transport discriminator proves the retained reader requires an in-scope correction. Closed Sprint 036P evidence and closeout files remain immutable.

No Product, schema, migration, RLS, role, permission, dependency or lockfile file is authorized.

After the same Architect returns final diff PASS, synchronize exactly these 12 scaled closeout files:

1. `planning/reviews/036Q-protected-five-provider-authority-completion.md`
2. `planning/ARCHITECT_BRIEFING.md`
3. `planning/DECISIONS.md`
4. `planning/RISKS.md`
5. `planning/QUESTIONS.md`
6. `planning/ROADMAP.md`
7. `planning/SPRINT_LIFECYCLE_LEDGER.md`
8. `planning/STATE.md`
9. `planning/STATUS.json`
10. `planning/EVIDENCE_INDEX.md`
11. `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`
12. `delivery_road_map.md`

The sprint `acceptance.md` is immutable direct Fly authority. `SPRINT-036Q-REPORT.md` is the sole AC-01..40 disposition record; the review file records final Architect inspection.

## Verification Arithmetic

- New completion test: exactly `70/70` substantive assertions.
- New protected-transport test: exactly `40/40` substantive assertions.
- Sprint 036Q focused: `110/110`.
- Retained through Sprint 036P: `1783/1783`.
- Combined: `1893/1893`.

Run the registered focused group, retained chain, wrapper SelfTest/CapabilityGate, JSON/static/encoding, JS syntax, PowerShell AST, privacy/taint, typecheck, zero-warning lint, Production build, `git diff --check`, exact planned scope, package-lock/migration/Product no-change, staged/conflict checks and sanitized cumulative provider read/write/action/residue reconciliation before and after the protected session.

## Publication Boundary

Sprint 036Q does not authorize stage, commit, push, PR creation/update, merge or conflict resolution. Existing draft PR #3 and its branch conflict are separate repository housekeeping and remain outside this flight.

## Evidence-Proportional Execution

Stop only for a material target, authority, security, privacy, destructive, integrity, production, scope or cleanup risk. Substitute equivalent or stronger safe evidence for supporting-tool failures. Keep deterministic harness, validator, reporter, formatting and encoding corrections inside the exact file boundary. An unavailable optional connector or CLI is not by itself target evidence; it becomes the named protected fallback only after the permitted alternatives are truthfully exhausted.

## Manual Intervention

If one provider cannot be read autonomously, record: what is blocked; the API, connector, CLI and existing signed-in-session alternatives checked; the exact read-only surface; the exact operator action; and the Builder verification afterward.

Numbered operator procedure:

1. Phillip and Randell open one fresh visible ConsoleHost in the canonical root with transcription/history capture off.
2. Run only the 036Q wrapper in `ProtectedReadOnly` mode without redirection.
3. At each provider prompt, enter the requested existing credential or exact authority ID through the masked prompt; never paste it into chat or another tool.
4. If the wrapper reports unavailable access, stop that provider; do not install/login, create a credential, broaden permissions or improvise a success claim.
5. After the wrapper closes, Builder verifies the sanitized five-provider result, cumulative reads, zero writes/mutations/business effects/residue and exact evidence reconciliation.

Screenshot or operator attestation alone never passes.
