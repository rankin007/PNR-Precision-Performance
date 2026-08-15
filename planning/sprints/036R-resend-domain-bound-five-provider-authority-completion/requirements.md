# Sprint 036R Requirements - Resend Domain-Bound Five-Provider Authority Completion

## Outcome

Replace Sprint 036Q's invalid Resend CLI-profile identity premise with provider-native domain-bound authority, then complete one privacy-safe externally read-only record across exact Vercel, Supabase, Resend, Stripe and Railway boundaries.

Target: `resend-domain-bound-five-provider-authority-complete-clean`.

Fallback: `resend-domain-bound-five-provider-authority-blocked-clean`.

This sprint performs no provider write, resource lifecycle, binding change, deployment, alias move, Product/data change, identity disposition, trainer contact, message, verification or launch claim. Accepted Sprint 036L remains live.

## Starting Authority and Correction

- Branch `codex/025B-versioned-domain-authority-package`; start HEAD `c90c3201380d7f61e03647ca6e46b03dc4c27985`; accepted source `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`.
- Retain Sprint 036Q proof `110 + 1783 = 1893`, four historical provider reads, zero current-sprint reads/sessions and zero writes/mutations/business effects/residue/trainer actions.
- The accepted-source graph is complete; exact five-provider authority and all seven lifecycle rows remain incomplete.
- Sprint 029P durably identifies `precisionperformance.com.au` as the verified domain-restricted Resend sending domain; accepted Production authority independently identifies the same apex.

Official Resend CLI `whoami` is local authentication-status output and does not return an immutable team/account ID. It cannot bind authority. Token possession, caller labels, profiles and API-key rows also cannot mint identity.

Resend documents that teams have distinct keys/domains and a domain can be active on only one account at a time. Exact Resend authority is therefore the tuple `expected public sending domain + stable Resend domain ID + verified/sending-enabled status + provider DNS projection + matching public DNS`, obtained from the authenticated team-scoped domain API. This does not claim a hidden provider team ID.

Current official authority to recheck and date before implementation:

- CLI contract and local `whoami`: `https://resend.com/docs/cli` and `https://github.com/resend/resend-cli/blob/main/src/commands/whoami.ts`.
- Team separation: `https://resend.com/docs/dashboard/settings/team`.
- One-active-account domain rule and Domain Claim: `https://resend.com/docs/knowledge-base/domain-already-registered` and `https://resend.com/changelog/domain-claim`.
- Domain list/detail/status and DNS semantics: `https://resend.com/docs/api-reference/domains/list-domains`, `https://resend.com/docs/api-reference/domains/get-domain`, and `https://resend.com/docs/dashboard/domains/introduction`.
- Cursor contract: `https://resend.com/docs/api-reference/pagination`.

## Exact Classes

Cover only `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `ENQUIRY_ABUSE_HMAC_SECRET`, `PUBLIC_ENQUIRY_SMTP_PASS`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `RAILWAY_API_TOKEN`. Refuse unknown, public, OIDC, historical, provider-wide and value classes.

## Fixed Read Matrix

Provider order is Vercel, Supabase, Resend, Stripe, Railway. Retained 036P/036Q descriptors remain fixed except the corrected Resend identity operation.

- **Vercel:** exact team/project; project/Cron metadata, Pack-pinned `/v6/deployments`, non-decrypt `/v10/projects/{idOrName}/env`, aliases, integrations and webhooks; exhaustive cursors; exact ownership; no arbitrary URL/decrypt/mutation.
- **Supabase:** exact project; project metadata, `reveal=false` keys, Edge Functions and four schema-qualified SELECT catalog reads only through `/v1/projects/{ref}/database/query/read-only`; refuse generic query, non-SELECT, reveal, JWT/session change and writes.
- **Stripe:** exact account and live/test mode; account metadata and exhaustive `/v1/webhook_endpoints`; no secret retrieval, event/delivery/payment/refund/business effect.
- **Railway:** exact token type/account/workspace/project/environment; only fixed read-only queries at `https://backboard.railway.com/graphql/v2`; Bearer for account/workspace or `Project-Access-Token` for project tokens; no arbitrary query/introspection/mutation.

### Resend domain-bound authority

1. Expected domain is fixed as `precisionperformance.com.au` from retained authority, never operator input.
2. Accept one existing management credential only through protected parent/private-child stdin. Do not install/login, create/switch/rename a profile, store credentials, use `whoami` as identity or put a credential/profile in argv/env.
3. Exhaust `GET /domains?limit=100[&after=...]` using `object=list`, `has_more`, `data` and last-row ID cursors. Require exactly one expected-name row, one valid stable ID, status `verified`, sending capability `enabled`, and no duplicate name/ID. Drift, partial/nonverified status or incomplete pages fall back.
4. Read exactly `GET /domains/{domain_id}`. Project ID/name/status/region/capabilities and only DNS record names/types/statuses needed for reconciliation. Raw record values remain child-memory only.
5. Select only sending records whose provider `record` is `SPF` with type `TXT` or `MX`, or `DKIM` with type `TXT` or `CNAME`; each selected provider row must have an acceptable verified status. Reject every other record purpose/type from the authority tuple. Each record name must be the expected apex or a strict subdomain of it. Construct relative names as FQDNs beneath the apex; normalize DNS names case-insensitively with one trailing dot removed; normalize TXT by joining protocol-returned chunks and removing only transport quotes; normalize CNAME/MX targets the same way; compare MX priority exactly. Query each unique selected `(fqdn,type)` tuple once, to a hard maximum of five logical public-DNS reads, and require exact set equality. Missing, extra, duplicate or ambiguous provider/DNS tuples fall back. Raw provider/DNS values remain in memory; evidence records matched booleans/counts only.
6. Exhaust `GET /api-keys?limit=100[&after=...]`; project only documented ID/name/created/last-used metadata. Never reveal values or invent permission/domain fields.
7. A single unique verified/sending-enabled domain plus exact detail/DNS equality yields alias `resend-domain:precisionperformance.com.au`. Domain Claim, verify, create, update and delete are forbidden.

## Ceilings

- Target completion requires `19..24` new provider requests. A fallback permits zero requests when no protected session starts, or only the actual `1..24` prefix when a started session fails; no padding or later-provider read may follow a material failure. Request 25 is never issued. Durable cumulative reads equal retained baseline four plus actual session reads, therefore `4` before a session or `5..28` afterward.
- Public DNS reads are `0..5`, separate from provider requests and limited to the unique selected sending-record `(fqdn,type)` tuples above.
- Raw bytes max `2 MiB` cumulative/provider; child line max `64 KiB`; pages max 100/family, dominated by request 24.
- Provider writes/mutations/business effects/reveal/decrypt/send/payment/deploy/alias/env/credential/domain/Railway actions `0`.
- Product/schema/migration/RLS/role/permission/dependency/lock edits `0`.
- Identity/Auth/session/trainer/message/verification/graph/Storage actions `0`.
- Stage/commit/push/PR/merge/conflict actions inside sprint acceptance `0`.

## Protected Transport and Evidence

- One visible interactive unredirected ConsoleHost, transcription/history off; one bounded child on anonymous redirected stdin/stdout/stderr.
- Parent holds provider SecureStrings/opaque IDs, releases only the next provider's material immediately before use through child stdin, then clears owned transfer buffers where supported.
- Protected values never enter chat, argv, env, clipboard, history, temp, repo, evidence or output.
- Child keeps raw provider/DNS responses in memory and emits strict sanitized envelopes. Captured-value taint, protected-pattern and reflection checks precede output.
- Parent validates order, exact authorities, domain/DNS proof, pagination, exactly seven ordered rows, counts, outcome consistency and zero actions before persistence.
- A new 036R canonical ledger is the atomic commit point; Markdown evidence/report are deterministic projections repaired before external reads. Fixtures/test brands cannot obtain live persistence provenance.
- Timeout/stderr/malformed/extra/exit/interruption stops cleanly, cleans owned child/temp residue and makes no universal memory-erasure claim.

## Seven-Row Result and Landing

For each class persist: class; exact provider/account/project alias; source consumers/completeness; provider consumers/pagination; reachability (`required`, `not-reachable-proven`, `unknown-blocking`); replacement; install targets; harmless readback; predecessor action; independent oracle; coupling/refusal; manual UI need; later disposition (`executable`, `blocked`, `owner-action-required`).

Target requires five exact authorities, the Resend domain/DNS tuple, exhausted required pages within 24, seven valid ordered rows, no unknown-blocking/reflection and zero actions/residue. Any missing/ambiguous access/domain/DNS, schema drift, cursor/byte ceiling, timeout/stderr/reflection/cleanup uncertainty or need for a write lands only fallback with exact owner action. Sprint 036S/trainer remain closed unless target passes.

## Exact Files

Before final inspection Builder may modify only:

1. `scripts/provider-authority-resend-domain-036R.mjs`
2. `scripts/Invoke-ProviderAuthorityCompletion036R.ps1`
3. `scripts/test-provider-authority-resend-domain-036R.mjs`
4. `scripts/test-provider-authority-transport-036R.mjs`
5. `docs/RESEND_DOMAIN_BOUND_FIVE_PROVIDER_AUTHORITY_036R.md`
6. `evidence/professional-engineering/036R-resend-domain-bound-five-provider-authority-completion/external-ledger.json`
7. `evidence/professional-engineering/036R-resend-domain-bound-five-provider-authority-completion/evidence.md`
8. `evidence/professional-engineering/036R-resend-domain-bound-five-provider-authority-completion/SPRINT-036R-REPORT.md`
9. `package.json`
10. `scripts/run-validation-suite.mjs`
11. `scripts/provider-authority-reader-036P.mjs`
12. `scripts/test-provider-authority-reader-036P.mjs`

Files 11-12 change only after a red-first discriminator proves the retained composed reader needs the domain-bound operation/current-contract correction. Closed 036P/036Q evidence, wrappers, tests and closeout remain immutable. No Product/schema/migration/RLS/permission/dependency/lockfile file is authorized.

After genuinely fresh final inspection PASS, update exactly: `planning/reviews/036R-resend-domain-bound-five-provider-authority-completion.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/ROADMAP.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/STATE.md`, `planning/STATUS.json`, `planning/EVIDENCE_INDEX.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `delivery_road_map.md`.

`acceptance.md` is immutable applied authority. `SPRINT-036R-REPORT.md` is the sole AC disposition record; the review records final inspection.

## Verification

- Domain authority `60/60`, including behavioral fake-DNS coverage for both an official one-TXT-DKIM shape and a three-CNAME-DKIM shape plus normalization/set-refusal cases; transport/evidence `40/40`; focused `100/100`.
- Retained through 036Q `1893/1893`; combined `1993/1993`.
- Run registered focused/retained groups, wrapper SelfTest/zero-request CapabilityGate, JSON/static/encoding, JS syntax, PS AST, privacy/taint, typecheck, zero-warning lint, Production build, diff/scope/lock/migration/Product/staged/conflict and provider/DNS/action/residue reconciliation before and after any session.

## Evidence-Proportional and Manual Intervention

Stop only for material target/authority/security/privacy/destructive/integrity/production/scope/cleanup risk. Substitute equivalent or stronger safe proof for supporting-tool failures. Keep in-scope harness/credential-access/validator/reporter corrections here. Do not create a follow-up only for optional CLI/connector/browser/redundant proof. Manual intervention is last.

If blocked, record what failed, alternatives checked, exact read surface, exact manual action and Builder verification:

1. Phillip and Randell open one fresh ConsoleHost in canonical root with transcription/history off.
2. Run only 036R CapabilityGate; do not install/login/create/switch a profile.
3. If ready, run `ProtectedReadOnly` unredirected and use masked prompts only; never chat.
4. Existing Resend authority must read the exact domain/key metadata; no send/verify/create/update/delete/claim.
5. On refusal stop without retry or improvised success.
6. Builder independently verifies five authorities, domain/DNS booleans, pagination, seven rows, counts, zero actions/residue and all three evidence artifacts.

Screenshot or attestation alone never passes.
