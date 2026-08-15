# Sprint 029V Builder Report

Date: 2026-08-07
Outcome: `agent-envelope-alias-isolation-blocked-clean`

## Plain-English result

The local safety repair is complete and passed review. The read-only baseline confirmed the accepted live deployment still owns all five stable aliases and that Sprint 029V owns no external resources. The next read-only inventory returned a JSON object outside the strict privacy allowlist. The controller refused it exactly as designed, and the sprint stopped before the dashboard or any external change.

## First failing gate

- Operation: bounded full Vercel deployment Inventory.
- Result: sanitized `VERCEL_JSON_REFUSED` at the exact JSON-object allowlist.
- Meaning: the stable empty active queue required before the dashboard freeze could not be proven.
- Required response: Pack-defined pre-freeze blocked-clean stop.

## Proof completed

- Canonical workspace and Git root: exact.
- Branch: `codex/029V-vercel-agent-envelope-and-alias-isolation-recovery`.
- Starting and final HEAD: `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`.
- Staged files: `0`.
- Focused tests: alias isolation 26/26; provider projection 16/16; controller/envelope 68/68; total 110/110.
- TypeScript: passed.
- Lint: passed with zero warnings/errors.
- Production build: passed, 28 pages/routes.
- Protected scan: `0/19`.
- Manifest: `19/19`.
- PowerShell parse/SelfTest: passed.
- Critical inspection: final decision 3/3 PASS, no unresolved finding.

Retained Sprint 029U proof remains historically 1004/1004. A broad retained-suite rerun passed. The old 029U harness refused only its obsolete branch-name lock; the stricter current-branch 029V controller suite passed 68/68 as proportional substitute proof.

## Read-only baseline

- Project class: exact.
- Accepted Sprint 036L deployment: Ready.
- Accepted aliases: `5/5`.
- Wrong stable targets: `0`.
- Sprint 029V deployments: `0`.
- Dedicated SMTP rows: `0`.
- Temporary-auth rows: `0`.
- Activation rows: `0`.
- Generic SMTP rows: `5`, unchanged.
- Fixed live credential: absent.

## Mutation and request ledger

- Dashboard visits or setting transitions: `0`.
- Provider preflights or key creations: `0`.
- Secret transfers or bearer exposures: `0`.
- Windows live credentials created: `0`.
- Environment rows created/changed/deleted: `0`.
- Deployment invocations or candidates: `0`.
- HTTP requests: `0`.
- Emails sent: `0`.
- Enquiries submitted or stored: `0`.
- Mailbox access: `0`.
- Data or migration changes: `0`.
- Public activation: `0`.
- Alias/domain/promote/rollback commands: `0`.
- Alias movements: `0`.
- Compensation actions: `0`; no Sprint-owned resource existed.

## Review corrections

- `INSPECT-001`: each request now independently inspects the recorded owned candidate and exact-compares the supplied origin.
- `INSPECT-002`: live-attempt phase and exact attempt counters are durable and monotonic across processes.
- `INSPECT-003`: protected deployment fields, including `creator` and `meta`, are refused by the PowerShell parser.
- Installed CLI version proof accepts only the exact Vercel 50.42.0 one/two-line output and rejects drift.

## Acceptance and roadmap effect

No Final Product Acceptance Matrix ID changed. Public enquiry remains unavailable. Sprint 029R remains conditional/not ready. Accepted Sprint 036L remains the Production truth with all five stable aliases.

## Archived closeout inputs

- `planning/archive/STATE-pre-029V-close.md` — SHA-256 `4f06d5d1320d6a45fa41bbb872bc9a291d07c47b7a6b23e4cd3a4b7eb66d13d9`.
- `planning/archive/ARCHITECT_BRIEFING-pre-029V-close.md` — SHA-256 `80e298d8d448b9532ddf489490ed8cc1d98c0e92fc959de9f49a76734d742fb5`.

## User action

The sprint is safely closed and requires no manual intervention.

I need nothing from you.