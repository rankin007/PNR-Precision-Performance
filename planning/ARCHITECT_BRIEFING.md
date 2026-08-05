# Architect Briefing - Sprint 029O Corrected Inert Fallback

## Executive summary

**Business outcome:** The public-enquiry privacy, retention, raw-validation and sanitized proof boundaries are corrected in Production, but public enquiry remains deliberately unavailable because the candidate SMTP no-send readiness gate did not pass.

**Current focus:** Architect must decide one bounded authoritative SMTP-readiness recovery outcome while preserving the accepted Sprint 036L deployment, installed migration 0023, zero enquiry residue and the one-deployment/no-retry ceiling already consumed by 029O.

**What is proven:** Exact checkpoint and direct-remote equality; 416/416 local assertions plus full Product gates; immutable migration 0022 and exact applied 0023; nullable set-null abuse link, two-hour bucket expiry, database-owned cleanup and service-only self-cleaning retention proof; one Ready exact-source 029O candidate with zero aliases; authenticated internal denial/schema/retention/aggregate behavior; final enquiry/bucket aggregate `0/0`; all five public aliases continuously on accepted 036L.

**What is not live:** SMTP readiness, a public enquiry submission, notification acceptance, replay/negative live evidence, 029O alias cutover and public-enquiry acceptance are not established. Real trainer delivery, excluded-identity disposition, final credential rotation and product-wide Done remain later obligations.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Privacy migration and retention | passed | Exact 0023 applied; nullable set-null link, two-hour expiry, active cleanup job and self-cleaning `1/1/1/0` proof passed; final aggregate `0/0` |
| Source and local validation | passed | Checkpoint `ed54481b73fe6968e6597a3e07e09d27c84d29a6`; 416/416 plus TypeScript, zero-warning lint, Production build, static and safety scans |
| Candidate and internal security | passed | `dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq` Ready and zero aliases; absent/wrong bearer denied; schema/retention/schema calls passed |
| SMTP no-send readiness | blocked | Authenticated candidate preflight returned sanitized HTTP 503/non-ready; no provider detail was exposed or inferred |
| Live Production routing | preserved | All five aliases remain on accepted 036L deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf`; 029N and 029O remain unaliased |

## Where things stand

Sprint 029O corrected both independent Sprint 029N inspection defects and installed the additive privacy correction. The database now removes HMAC abuse buckets independently while retaining unexpired enquiries, rejects prohibited raw controls before normalization and exposes only service-role sanitized counts and proof results.

The single governed candidate passed immutable and authenticated internal proof but stopped at the required SMTP readiness gate. Because the gate failed before a public request, no email, enquiry row, notification attempt, replay, live negative request or alias movement occurred. The Pack's safe fallback applies.

## Current status

Sprint 029O is closed as `public-enquiry-corrected-inert-rolled-back-clean`, not done or live accepted. Flight class was `critical`. Plan decisions 1/3, 2/3 and 3/3 passed; stable findings `PLAN-001` and `PLAN-002` are resolved. A distinct fresh inspector passed decision 1/3 with an empty finding/advisory ledger and accepted the safe fallback.

## Since last sprint

Sprint 029N delivered an inert candidate but inspection rejected its retained abuse-link privacy boundary and normalization-before-control validation. Sprint 029O corrected those defects, added no-send SMTP verification, applied migration 0023 and created one corrected candidate. The candidate remained inert when its prospective SMTP verification returned non-ready.

## Architecture / file map

- `supabase/migrations/0023_public_trainer_enquiry_retention_correction.sql` - installed nullable-link, short-expiry, cleanup-job, status and self-cleaning retention correction.
- `lib/enquiries/contract.ts` - raw-control rejection before normalization.
- `lib/enquiries/provider.ts` - bounded no-send SMTP verification and finite prospective error classification.
- `lib/enquiries/server.ts` - exact service-only schema/retention projection and internal proof behavior.
- `scripts/autonomous-public-enquiry-029O.mjs` - sanitized candidate, proof, submission, replay, negative, cleanup and alias controller contract.
- `docs/PUBLIC_ENQUIRY_PRIVACY_AND_OPERATIONS_029O.md` - current privacy, credential-transport, safe-fallback and no-retry operations authority.
- `planning/sprints/029O-public-enquiry-corrective-completion/acceptance.md` - numbered acceptance and fallback disposition.

## Decisions

- Retain exact migration 0023 and its active database cleanup job; do not reapply, repair or remove them by inference.
- Keep the 029N and 029O candidates unaliased and retain accepted 036L five-of-five as live Production truth.
- Treat sanitized SMTP non-ready as an unresolved readiness boundary, not evidence of a specific credential, host, address, provider or mailbox cause.
- Do not make a second deployment, retry SMTP, send a synthetic enquiry or move an alias under closed 029O authority.
- Permit app-owned credential rotation only through an explicitly reviewed process-memory/stdin or API-body path with metadata-only proof; never expose or request the value.

## Risks / watch-items

- Public enquiry remains unavailable until an authoritative encrypted SMTP repair source and bounded recovery plan exist.
- The installed schema is empty and safe, but it is Production state; destructive repair/reset is prohibited.
- The Ready 029O candidate is evidence, not a release target. Do not promote it after its failed readiness gate.
- The one `CRON_SECRET` transport rotation is complete and must not be repeated or manually re-entered by inference.
- Sprint 036L alias/binding compatibility, the two excluded Auth identities and later 036K obligations remain unchanged.

## Open questions for the Architect

- What authoritative encrypted provider/configuration source may safely diagnose and repair the SMTP no-send non-ready result without exposing or manually re-entering values?
- What exact deployment/retry and rollback ceiling should govern any future public-enquiry completion attempt now that 029O consumed its one candidate?
- How should that future work remain separate from Sprint 036K credential rotation, excluded-identity disposition and real trainer delivery rehearsal?

## Evidence

- Canonical directory/Git root, exact 029O branch and start passed; inherited method/template dirt remained excluded.
- Final source checkpoint `ed54481b73fe6968e6597a3e07e09d27c84d29a6` was local/direct-remote equal.
- Migration 0022 stayed byte-for-byte unchanged. Applied 0023 SHA-256 is `8D0B3AD2CEC9E792772C4E1040A599D83181490698430528B90C0C9471489C03` on exact project `uvskssaecdhxcgytkasc`.
- Remote migration head, FK/nullability, two-hour expiry, RLS/grants/functions, exact active cleanup job and self-cleaning retention result passed; final enquiry/bucket aggregate was `0/0`.
- The protected environment API-update attempt returned `api_error` and was transactionally unchanged. Exact-key `env add ... --force` through stdin then updated only one Sensitive Production blank-branch `CRON_SECRET` record at metadata timestamp `1785957325573`; no value was exposed.
- Candidate `dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq` at `pnr-precision-performance-r9qotcp3j-rankin007s-projects.vercel.app` is exact-project, exact branch/checkpoint, Production-targeted, Ready and zero aliases.
- Internal route statuses were exactly `404/404/200/200/200/503`: absent/wrong bearer denied; schema, retention and final schema passed; SMTP no-send preflight was non-ready.
- `/api/enquiries` request, email, stored enquiry, notification attempt, replay, live negative request and submission-fixture purge counts were all zero. Retention proof residue and final aggregate were zero.
- All five aliases remained on accepted 036L throughout; 029N remained zero aliases/inert. No second deployment or retry occurred.
- Plan decisions reached 3/3 with `PLAN-001` and `PLAN-002` resolved; inspection decision 1/3 passed with an empty ledger.

## Plan corrections

- `PLAN-001` resolved the schema-qualified PostgreSQL `substring` parser defect with comma arguments, a discriminating 48/48 assertion and executable server proof. The first migration attempt failed transactionally and left remote head 0022 before corrected 0023 applied once.
- `PLAN-002` resolved inaccessible Sensitive `CRON_SECRET` proof transport through one reviewed app-owned rotation that preserved exact key/type/target metadata and used the same in-memory value for candidate authentication.
- A deterministic pre-deployment implementation correction made `readSchemaStatus()` require both schema and retention RPCs and emit only explicit finite counts. It remained inside the passed A023/A024 outcome and required no schema or product change.

Supporting-tool substitutions were proportional. Local Docker/PostgreSQL was unavailable, so an exact read-only server expression probe plus transactional apply supplied executable parser evidence. The preferred Vercel environment API write returned `api_error` without mutation, so the current exact-key stdin CLI path supplied equivalent metadata-verified transport. Neither substitution exposed a protected value or weakened an acceptance boundary.

## Validation / test status

**Tests:** 416 passing, 0 failing.

Focused 029O core, migration and autonomous suites passed 72/72, 48/48 and 60/60. Retained enquiry, migration, autonomous, trainer, Auth, role, dashboard, commerce, JSON/static and Australian-English controls passed with their recorded group totals. TypeScript, zero-warning lint, Production build, encoding, secret-shape, logging, controlled-email, client/server-boundary and scoped-diff scans passed.

## Recommended next Architect action

**Do:** Discover one bounded authoritative SMTP-readiness recovery outcome. Start from sanitized non-ready evidence, preserve installed 0023 and zero residue, require an authoritative encrypted repair source, and define a fresh one-deployment/retry ceiling without promoting either inert candidate.

**Owner:** Architect with the platform/email configuration owner. No manual password, code, address or secret entry should be required.

**Decision:** 029O is safely closed but not done. Public enquiry remains unavailable; accepted 036L remains live five-of-five. A future sprint requires new Architect authority and a new human `go`.
