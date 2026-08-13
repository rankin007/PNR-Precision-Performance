# Sprint 036P Evidence — Protected Provider Authority Readback

Final inspected outcome: `protected-provider-authority-readback-blocked-clean`; target not met.

## Source and local proof

- Accepted object: `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`.
- Corrected graph: `124` admitted production/config files, `0` unresolved imports, hash `36edbef5584b8edbc4363c5425bd66e645a202a90b90caeee8b2223fd0948d6b`.
- Production manager: `components/ops/test-evidence-manager.tsx`, mode `100644`, blob `65d74be5a3f701ae9133bf353348b3253f36feef`.
- Focused: discovery `60/60` + reader `80/80` + transport `40/40` = `180/180`.
- Retained: `1603/1603`; combined `1783/1783`.
- JSON/static/encoding/typecheck/zero-warning lint/Production build 29 pages: PASS.

## Provider readback

Exactly four read-only provider requests occurred:

1. Supabase connected project list: two active healthy candidates; exact Production project is ambiguous, so no project-specific read followed.
2. Vercel connected team list: one team.
3. Vercel connected project list: one project in that team.
4. Vercel connected deployment list: 20 Ready deployments, including seven Production records, with a continuation cursor; pagination is incomplete.

No raw provider response is durable. Only counts, status classes and authority booleans are recorded.

Value-blind local alternatives: Vercel CLI `50.42.0`, Stripe CLI `1.40.3`, Railway CLI `4.36.1`; Supabase and Resend CLIs absent. Process credential presence for all five provider variables was false. Supabase and Vercel connectors are available; Resend, Stripe and Railway connectors are absent in the current tool set. The visible protected window was not launched.

Provider requests/writes/mutations/business effects/residue: `4/0/0/0/0`. Trainer actions: `0`.

All seven credential rows remain `unknown-blocking`; no trainer/readiness or later-mutation success is claimed. Accepted 036L is unchanged and Product Done remains false.

## Inspection repair

- INSPECT-001: the fixed-unavailable path was replaced by one executable five-provider reader using a provider-by-provider `need-authority` handshake. Only the requested provider credential and identifiers are released immediately before that provider request and cleared after its response; child argv is fixed.
- INSPECT-002: target state is derived only from the private 17-operation trace, five authority bindings, the complete accepted-object graph, exactly seven valid rows, bounded reads, and zero writes/mutations/residue. Caller completion cannot mint success.
- INSPECT-003: the child is read/projection-only. The parent uses `external-ledger.json` as the sole same-volume atomic commit point, deterministically regenerates both Markdown artifacts, and withholds the landing until all three reread consistently. The exact production functions pass before-replace, after-replace, Markdown-write-fault, startup-repair, cumulative-read and owned-orphan-cleanup cases in a temporary evidence directory.
- Decision-2 INSPECT-001: Resend key/domain metadata now exhausts forward cursors through the same bounded paginator, and Vercel integration/webhook rows require explicit exact owner/team and project membership. The live injected-core tests prove Resend page 2 and missing/wrong Vercel authority refusal.
- Decision-2 INSPECT-003: the production parent validates the exact final envelope, request ceiling, outcome consistency, five authority rows and all seven ordered 15-field capability rows before persistence. Counterfeit overflow, mismatch, unbound-authority and empty-row envelopes leave the canonical ledger byte-identical; a one-request partial session keeps AC-29 not started.
- INSPECT-004: the aggregate `validate:local` route was unavailable because optional `playwright-core` is absent. The exact named retained chain was run sequentially instead and produced the same stronger counted boundary: retained `1603/1603`, focused `180/180`, combined `1783/1783`.

No provider request was made during this repair. The durable live history remains exactly four earlier read-only requests and zero writes, mutations, business effects, residue, or trainer actions. The visible protected window remains not started.