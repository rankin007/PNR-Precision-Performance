# Sprint 023L - Remote Application And Hosted Proof Requirements

## Role And Governing Boundary

Builder executes this follow-up under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023L files, and executes from those sprint files.

Sprint 023L is the bounded remote-execution continuation of the committed Sprint 023J candidate. It may mutate only the named non-production Supabase project and its exclusively mapped Vercel Preview environment. It does not authorise production migration, production deployment, production aliases or domains, real customer or horse data, public launch, provider expansion, dependency installation, Git push or merge.

The approved regional authority is Singapore `ap-southeast-1`. Do not reinstate Sydney `ap-southeast-2` as an active requirement. Record Singapore accurately as overseas processing from Australia and make no Australian-only storage claim.

## Mandatory Clean Baseline

Before applying this Pack, Builder must verify:

- exact commit `a15d89b2f95382d77a3f3ed450e1f4f16f254b51`;
- parent `fcf818fe3a8001b12941adc9dd121c6dbe8c002f`, whose parent is `ae5470cb79e7f41f7a8ce30a7ce07e2c796897a9`, with preserved ancestry from the approved Sprint 023D baseline;
- outcome `remote-candidate-committed-clean` for the committed Sprint 023J candidate;
- committed Sprint 023M reconciliation records outcome `committed-candidate-state-reconciled-ready-for-commit` before its documentation-only commit and now durably reconciles the current Sprint 023J committed state;
- clean index and worktree;
- committed migration ledger exactly `0001` through `0019` with no gaps, duplicates or `0020+` candidate;
- migration `0018` unchanged from its approved committed source;
- migration `0019` SHA-256 exactly `67C0877038738EC5D3C4965DE10F3048D37D4E920407C4E675CB948C3450B80A` using the maintained strict UTF-8/LF canonical rules;
- zero production `.schema("storage")` references;
- all required 023J/023K authority, preflight, recovery, implementation and validation records present;
- the generated Sprint 023M file and its four reconciled durable records are present and agree that commit `fcf818f...` is the committed Sprint 023J candidate; and
- the source worktree containing commit `a15d89b...` remains clean and unmodified.

Create an isolated branch/worktree named `codex/023L-remote-application-and-hosted-proof` from that exact commit. Apply this Pack only there. If any baseline fact differs, stop `remote-application-baseline-blocked-clean` without external mutation and use the Manual Intervention Rule.

## Exact External Targets

The only permitted Supabase target is:

- organisation reference: `hohxquwkfehiuyrysufu`;
- project reference: `uvskssaecdhxcgytkasc`;
- project name: `Precision Performance Clean Rebuild`;
- region: `ap-southeast-1`, Singapore; and
- expected status before mutation: `ACTIVE_HEALTHY`.

The only permitted Vercel target is:

- team: `rankin007's projects`;
- project: `pnr-precision-performance`;
- environment: Vercel Preview environment;
- URL boundary: generated `*.rankin007s-projects.vercel.app` deployment URL; and
- no custom domain or production alias.

The Preview environment must map only to Supabase project `uvskssaecdhxcgytkasc`. Never target `precisionperformance.com.au`, `www.precisionperformance.com.au`, a Production environment, another Supabase project, or an ambiguous cached link. Cross-check both targets through two read-only sources where practical immediately before each mutation phase.

## Data, Operator And Secret Boundary

- Use generated, non-personal, synthetic-only accounts, stables, horses, tests and JPEG/PNG/PDF fixtures.
- Do not query, upload, copy or expose real customer, staff, horse or production data.
- Approved operator and rollback owner must match the accepted 023J authority record.
- Incident reporting remains the monitored address recorded in the approved Sprint 023C contract.
- Never print, paste into chat, store in Git, hash into evidence, screenshot visibly or log passwords, service-role keys, anon keys, access tokens, database URIs or `CRON_SECRET` values.
- Record only safe presence, environment scope, target association, timestamps and sanitised error classes.
- CSV remains disabled. Scanner and sanitiser adapters remain unavailable and fail closed. No file may become `available`, previewable or downloadable during this sprint.

## Permitted Remote Mutations

Only the following external mutations are in scope, in this order and after their preceding gates pass:

1. apply the already committed pending migrations `0018` and `0019` through the supported Supabase migration mechanism;
2. thereby create/configure only the migration-governed private `test-evidence` bucket, schema objects, functions, grants and policies;
3. configure only the approved Vercel Preview environment variables required by the committed application, using protected provider settings;
4. create a strong Preview-scoped `CRON_SECRET` through an approved protected mechanism;
5. create one deployment from exact commit `a15d89b...` to the named Vercel Preview environment with no custom domain;
6. create and remove bounded synthetic proof fixtures and exact owned Storage objects; and
7. invoke the reconciliation route manually against Preview for proof.

Do not run reset, repair, force, squash, seed, unrestricted SQL, migration-history edits, bucket-wide deletion, unknown-row cleanup, production promotion, production Cron activation, alias movement or destructive rollback. No migration `0020` is permitted.

## Mandatory Manual Intervention Rule

Whenever a required step fails, is blocked or needs operator input, Builder must record:

1. what is blocked or not working;
2. evidence already checked;
3. exact user/manual action required;
4. step-by-step instructions for that action; and
5. what Builder will verify afterward.

Never request a secret value in conversation. Stop before further mutation when target identity, data classification, recovery readiness, migration state, configuration scope or cleanup ownership is uncertain.

## Required Evidence

Create and maintain:

- `planning/reviews/023L-baseline-target-and-immediate-preflight.md`;
- `planning/reviews/023L-remote-migration-and-storage-proof.md`;
- `planning/reviews/023L-preview-configuration-and-deployment-proof.md`;
- `planning/reviews/023L-hosted-role-lifecycle-and-reconciliation-proof.md`;
- `planning/reviews/023L-recovery-cleanup-and-production-exclusion.md`; and
- `planning/reviews/023L-closeout.md`.

Evidence must use counts, safe identifiers and hashes only, distinguish local/remote/hosted results, redact secrets and avoid row contents, filenames, object keys, signed URLs, emails or personal payloads.

## Approved Local File Set

Builder may create or edit only:

- `planning/sprints/023L-remote-application-and-hosted-proof/**`;
- the six required `planning/reviews/023L-*.md` files;
- `docs/TEST_EVIDENCE_REMOTE_PROOF_023J.md`, only to append the final 023L remote-proof boundary;
- `planning/STATE.md`;
- `planning/STATUS.json`;
- `planning/ARCHITECT_BRIEFING.md`;
- `planning/EVIDENCE_INDEX.md`;
- `planning/DECISIONS.md`, only for durable 023L remote outcomes; and
- `planning/RISKS.md` and `planning/QUESTIONS.md`, only for genuine remaining risks/questions.

No production source, migration, package, lockfile, dependency, provider declaration or configuration file may be edited. If remote proof exposes a source/schema defect, preserve evidence and stop for a later corrective sprint.
