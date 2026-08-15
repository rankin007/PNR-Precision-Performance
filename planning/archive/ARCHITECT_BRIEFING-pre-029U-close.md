# Architect Briefing

## Executive summary

**Business outcome:** Sprint 029T closed `provider-copy-prevalidation-blocked-clean`; inspection decision 2/3 passed after local resolution of `INSPECT-001`, with no blockers or advisories.

**Current focus:** Define a new Fly and follow-up sprint for the still-unproven Copy/transport-readiness boundary without starting another provider attempt by inference.

**What is proven:** Exact Vercel command safety, closed command/row JSON shapes and deployment targets, bounded environment/alias/deployment projections, identity-blind provider-control behavior, 932/932 combined assertions, full local gates and the final clean read-only Baseline.

**What is not live:** Public enquiry transport, a new provider key, dedicated or temporary configuration, a 029T credential/candidate, authenticated no-send readiness and Sprint 029R.

## Readiness signals

| Signal | Status | Evidence |
| --- | --- | --- |
| Local command and projection boundary | passed | 108/108 controller/readiness plus 80/80 provider-control assertions; six unknown-shape and three unexpected-target refusals; PowerShell parse/SelfTest passed |
| Retained Product/privacy regression | passed | 744/744 retained; combined total 932/932; mapped quality and privacy gates passed |
| Clean baseline and live routing | passed | Dedicated `0`, temporary `0`, credential absent, generic `5`, 029T deployments `0`, accepted deployment Ready with five aliases, historical candidates unaliased |
| Provider Copy/readiness boundary | attention | Fixed projection returned Copy count `0`; no key or later readiness action began |
| Independent inspection | passed | Decision 1/3 FIX `INSPECT-001`; decision 2/3 PASS with no blockers or advisories |

## Where things stand

The local safety implementation is complete. An early signed-in browser snapshot displayed protected account identity in tool output; no detail is retained, no secret/token appeared and no mutation occurred. The later fixed identity-blind projection remained `not-ready`, so Builder stopped before key creation and proved the clean fallback through the final read-only Baseline.

## Current status

Sprint 029T is closed blocked-clean, not ready or live. `INSPECT-001` is resolved and inspection passed decision 2/3. Public enquiry remains unavailable, 029R remains conditional/not ready and the retained 029S Preview remains Ready/Preview/inert with zero aliases.

## Since last sprint

Sprint 029T replaced the `$Args` hazard with exact non-reserved vectors, added fixed provider controls, corrected Windows child-process handling, accepted multi-target inherited generic metadata while rejecting scoped 029T-owned rows, and replaced aggregate baseline refusal with eight fixed codes. It made no Product/runtime behavior change and no provider/configuration/deployment/request mutation.

## Architecture / file map

- `scripts/PreflightAuth029T.ps1` - exact Vercel vectors, fixed projections, local SelfTest and sanitized Baseline.
- `scripts/autonomous-public-enquiry-029T.mjs` - local validators, immutable-check harness, scanner and manifest.
- `scripts/provider-browser-projection-029T.mjs` - fixed identity-blind browser control projection.
- `scripts/test-autonomous-public-enquiry-029T.mjs` and `scripts/test-provider-browser-projection-029T.mjs` - focused deterministic proof.
- `docs/PUBLIC_ENQUIRY_READINESS_BOUNDARY_RECOVERY_029T.md` - safe operations and evidence boundary.
- `planning/sprints/029T-readiness-boundary-recovery-after-inert-preview/` - governing scope and acceptance disposition.

## Decisions

- Treat the project alias list, bounded below its 100-row limit, as routing authority; use deployment inspection only for target/readiness.
- Stop at Copy count `0`; do not create a key or improvise secret transfer.
- Resolve `INSPECT-001` by refusing unknown top-level/row fields and any target outside the known Production/Preview contract; do not weaken the parser to accommodate a custom target.
- Close the fallback blocked-clean without marking readiness or Product acceptance; require a new Fly and follow-up sprint before any later readiness attempt.

## Risks / watch-items

- Local/read-only proof does not establish SMTP readiness or sender/delivery behavior.
- Protected signed-in surfaces may display account identity; only fixed identity-blind projections are safe evidence.
- The retained Preview is historical evidence, not a target. It must stay inert unless a future Pack gives exact authority.

## Open questions for the Architect

- Does the distinct inspector accept A001-A015, A017, A029 and A031 plus the bounded alias-list substitute?
- What separate future authority could prove Copy/transfer controls before key creation without exposing identity or secret material?
- Should the retained inert Preview remain as evidence or receive a later exact deletion decision?

## Evidence

- Final counted proof: 932 passing, 0 failing.
- PowerShell parse: 0 errors. Non-mutating SelfTest: 21 allowed vectors, 14 refused vectors, four exact child-process arguments, five generic-row fixture, two owned-scope refusals, six unknown-shape refusals, three unexpected-target refusals, eight baseline failure codes and zero residue.
- Typecheck passed; lint passed with zero warnings/errors; Production build generated 28 pages.
- Static, JSON, migration-ledger, Australian-English, role, dashboard, privacy, UTF-8, diff and staged checks passed.
- Protected scan passed `0/17`; manifest contains 17 entries.
- Final read-only Baseline passed with zero target resources and unchanged five-alias routing.
- Final ordered local readback passed with 23 required files, canonical workspace/branch/unchanged HEAD, staged count `0`, consistent recorded provider/Vercel/candidate/live-routing proof and zero external calls.

## Plan corrections

Four deterministic within-intent corrections were required: child-only notifier setup avoided nullable process-environment adapters; inherited generic rows became Production-including while 029T-owned rows remain Production-only/unscoped; Baseline gained eight fixed refusal codes plus bounded alias-list routing proof; and inspection decision 1/3 `INSPECT-001` added exact command/row JSON shapes plus closed deployment targets. No Product behavior or external ceiling changed.

## Validation / test status

**Tests:** 932 passing, 0 failing. Proportional closeout reread, JSON, focused tests, PowerShell parse/SelfTest, protected scan, UTF-8 and diff/staged checks are the final Builder validation set after the inspection correction.

## Recommended next Architect action

**Do:** Use the closed 029T evidence to define a new Fly and follow-up sprint for the unresolved prevalidated Copy and readiness boundary.

**Owner:** Architect / independent inspector.

**Decision:** Keep public enquiry unavailable and 029R conditional/not ready until that separate follow-up has an accepted readiness outcome. Do not authorize another 029T provider/readiness attempt by inference.
