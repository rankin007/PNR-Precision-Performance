# Architect Pack 036R - Resend Domain-Bound Five-Provider Authority Completion

============================================================
FILE: planning/sprints/036R-resend-domain-bound-five-provider-authority-completion/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/036R-resend-domain-bound-five-provider-authority-completion/blueprint.md
============================================================

# Sprint 036R Blueprint - Resend Domain-Bound Five-Provider Authority Completion

## Flight evidence

1. **Class and reason:** critical - masked management credentials, five provider authorities and the later credential/identity/trainer gate create high blast radius despite read-only scope.
2. **Invariant:** only fixed provider reads plus unique verified Resend domain and public DNS equality may mint authority. CLI profiles, token possession, caller labels, fixtures, screenshots, raw values and writes cannot.
3. **Paths:** accepted graph -> seven roots -> five readers; retained expected domain -> domain list -> domain get -> SPF/DKIM/MX comparison -> domain account alias; masked parent -> private child -> in-memory projection -> canonical ledger -> Markdown.
4. **Sources/transforms/sinks:** accepted authority, masked credentials/IDs, fixed responses and DNS answers -> strict decode/paginate/reconcile/taint/project -> three approved evidence artifacts. Raw secrets, DNS values, responses and control files are not sinks.
5. **Discriminators:** reject `whoami` as identity, pending/sending-disabled/duplicate domain, unsupported record purpose/type, out-of-apex name, DNS missing/extra/duplicate/ambiguous tuple, MX-priority mismatch, invented key fields, arbitrary DNS and request 25; behaviorally accept both normalized one-TXT-DKIM and three-CNAME-DKIM official shapes only for one verified sending-enabled exact domain.
6. **Git truth:** start `c90c3201...`, accepted object `bfeb0b23...`, retained 029P/Production apex authority, unchanged Product/migration/lock bytes.
7. **Fallbacks:** missing/insufficient access, wrong authority, domain/DNS mismatch, drift, incomplete pagination, taint, timeout or uncertain cleanup lands named blocked-clean with zero actions/residue and no 036S/readiness claim.

## Phases

0. Canonical and applied-Pack guard. 1. Revalidate official contracts. 2. Red-first pure domain/DNS/transport/evidence proof. 3. Integrate only fixed Resend operation with live provenance separation. 4. Pass `100+1893=1993` and full gates. 5. Zero-read CapabilityGate. 6. At most one protected session. 7. Reconcile five authorities/domain/DNS/seven rows and atomically land evidence. 8. Rerun gates. 9. Fresh critical inspection and post-PASS closeout.

## Landing

Use target wording only when every requirement predicate passes. Otherwise close the exact fallback, retain 036L, keep 036S/trainer closed and Product Done false.

============================================================
FILE: planning/sprints/036R-resend-domain-bound-five-provider-authority-completion/acceptance.md
============================================================

# Sprint 036R Acceptance - Resend Domain-Bound Five-Provider Authority Completion

This applied file is immutable authority. `evidence/professional-engineering/036R-resend-domain-bound-five-provider-authority-completion/SPRINT-036R-REPORT.md` is the sole disposition record; `planning/reviews/036R-resend-domain-bound-five-provider-authority-completion.md` records fresh inspection.

| ID | Acceptance criterion | Authority |
| --- | --- | --- |
| AC-01 | Canonical root/branch/HEAD/dirty/staged/conflict guards pass. | Report |
| AC-02 | Pack dry-run/apply/readback is exact and traversal-safe. | Report |
| AC-03 | Fresh critical plan review passes before implementation. | Report |
| AC-04 | Exact 12 implementation and 12 post-PASS closeout files/counts/ceilings are durable. | Report |
| AC-05 | Accepted source and closed 036P/036Q evidence stay unchanged. | Report |
| AC-06 | Current official contracts/retrieval date are recorded. | Report |
| AC-07 | `whoami`, profile/token/caller labels/key rows cannot mint Resend identity. | Report |
| AC-08 | Expected domain comes only from retained 029P and Production authority. | Report |
| AC-09 | Resend domain pages exhaust with one unique exact domain ID. | Report |
| AC-10 | Domain detail is exact, verified and sending-enabled without durable DNS values. | Report |
| AC-11 | Up to five unique allowed SPF/DKIM `(fqdn,type)` tuples use record-aware TXT/CNAME/MX normalization and exact set equality including MX priority; evidence is boolean/count only. | Report |
| AC-12 | Resend key metadata exhausts without values/invented fields. | Report |
| AC-13 | Vercel exact read matrix reconciles without decrypt/reveal. | Report |
| AC-14 | Supabase exact non-reveal/read-only matrix reconciles. | Report |
| AC-15 | Stripe exact account/mode/webhooks reconcile without effects. | Report |
| AC-16 | Railway exact fixed read-only authority reconciles. | Report |
| AC-17 | Wrong authority, cursor/duplicate/drift/request25/byte overflow fail closed. | Report |
| AC-18 | Exactly seven ordered complete sanitized rows persist. | Report |
| AC-19 | Target derives internally only from all five/domain/DNS/pages/seven rows/zero actions. | Report |
| AC-20 | Fixtures cannot obtain live persistence provenance. | Report |
| AC-21 | One visible parent and one bounded private child enforce transport. | Report |
| AC-22 | Provider material releases just-in-time and clears where supported. | Report |
| AC-23 | Protected values never enter prohibited channels/sinks. | Report |
| AC-24 | Taint/reflection/error/interruption cases fail before landing and clean owned residue. | Report |
| AC-25 | Ledger and Markdown projections reconcile without stale/partial landing. | Report |
| AC-26 | Target uses provider requests `19..24`; fallback uses zero or the actual `1..24` failure prefix without padding; cumulative equals baseline four plus actual; DNS is `0..5`; request25 is absent. | Report |
| AC-27 | Provider writes/mutations/effects/reveal/persistence are zero. | Report |
| AC-28 | Product/schema/migration/security/dependency/lock changes are zero. | Report |
| AC-29 | Identity/Auth/session/trainer/message/verification/graph/Storage actions are zero. | Report |
| AC-30 | Manual intervention is last, numbered and independently verified. | Report |
| AC-31 | Fallback records alternatives/refusal/owner action/verification. | Report |
| AC-32 | Domain tests pass `60/60` with behavioral one-TXT-DKIM, three-CNAME-DKIM, normalization and set-refusal coverage. | Report |
| AC-33 | Transport tests pass `40/40`; focused `100/100`. | Report |
| AC-34 | Retained `1893/1893`; combined `1993/1993`. | Report |
| AC-35 | Quality/privacy/build/diff gates pass. | Report |
| AC-36 | Scope/lock/migration/Product/staged/conflict guards pass. | Report |
| AC-37 | Evidence records provider/DNS reads and zero actions/residue truthfully. | Report |
| AC-38 | Fresh critical inspector passes before closeout. | Report |
| AC-39 | Exact 12 closeout files reconcile durable truth. | Report |
| AC-40 | Final readback keeps 036L, gates 036S, Product Not Done and no publication. | Report |

============================================================
FILE: planning/sprints/036R-resend-domain-bound-five-provider-authority-completion/handoff-prompt.md
============================================================

# Sprint 036R Builder Handoff - Resend Domain-Bound Five-Provider Authority Completion

## Task contract

**objective:** Replace the false Resend profile/team premise with unique verified-domain authority and complete one privacy-safe read-only five-provider record.

**owns:** Exact 12 implementation/evidence files and, only after fresh inspection PASS, exact 12 closeout files from requirements.

**must_not:** No Product/schema/migration/security/dependency/lock changes; Resend install/login/profile change; protected/DNS value persistence; provider write/lifecycle/deploy/alias/env; identity/Auth/session/trainer/message/verification/graph/Storage; business effect; stage/commit/push/PR.

**acceptance:** Disposition AC-01..40 in the report. Target requires five authorities, exact verified/sending-enabled `precisionperformance.com.au` tuple, public DNS equality, exhausted pages, seven rows and zero actions/residue. Anything less is fallback and keeps 036S closed.

**verification:** Exact domain `60`, transport `40`, focused `100`, retained `1893`, combined `1993`, SelfTest/CapabilityGate, full gates, sanitized provider/DNS/action reconciliation and fresh critical inspection.

## Sequence

1. Verify canonical Git and applied Pack. 2. Return a complete no-edit plan for fresh critical review. 3. Record current official contracts and `whoami` limitation. 4. Implement red-first pure domain/DNS/transport/evidence cases. 5. Integrate only fixed domain-bound Resend operation; fixtures cannot mint live authority. 6. Pass all local gates. 7. Run zero-read CapabilityGate and exhaust safe alternatives. 8. If ready, run at most one protected session with Phillip and Randell; no install/login/send/mutation/retry. 9. Atomically reconcile five authorities/domain/DNS/seven rows/counters. 10. Stop for fresh inspection; close out exact files only after PASS.

Follow Evidence-Proportional and Manual Intervention requirements. Never ask for protected data in chat or accept screenshot/operator attestation.
