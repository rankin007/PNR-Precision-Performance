# Current Risks

Historical and closed risks through Sprint 017F are preserved in `planning/history/RISKS-THROUGH-017F.md`.

## Active Risks

| Risk | Likelihood | Impact | Control |
|---|---:|---:|---|
| The deployed Sprint 029M enquiry presentation is mistaken for a working submission channel. | Medium | High | Keep the unavailable state visible; prohibit transmission, storage, email, logging, or analytics until the twelve-item privacy/data gate and exact scope expansion are approved. |
| Supabase continues rejecting candidate-issued JWTs. | High | Critical | Await provider response; run 021N/021O minimal proof before any full matrix. |
| Structural/local evidence is mistaken for authenticated or production readiness. | Medium | High | Keep readiness classes explicit in state, evidence index, and sprint acceptance. |
| Unapproved formulas, thresholds, or recommendation content mislead trainers. | High | High | Block production-facing classifications/advice until domain authority is supplied. |
| Conflicting pricing or catalogue terms reach public surfaces. | Medium | High | Preserve public gate; require one approved commercial schedule before reopening. |
| Upload implementation diverges from the approved privacy/storage/lifecycle contract or silently selects an unapproved processor. | Medium | High | Sprint 023D must design from the canonical 023C contract; keep CSV registration, scanner/provider, provider suitability, retention review, RLS, and lifecycle controls explicit before implementation. |
| The Supabase project is assumed Australian or database backup is mistaken for Storage-object recovery. | Medium | Critical | Require sanitised proof that the intended project is Sydney `ap-southeast-2`; treat `ap-southeast-1` as Singapore/non-compliant; require separate object backup, recovery, expiry and restoration-agreement evidence before production. |
| Duplicate/overlapping Cron invocations or duration exhaustion cause repeated or partial reconciliation. | Medium | High | Verify bearer `CRON_SECRET`, DB-backed concurrency lock, idempotent per-item transitions, bounded UTC batches, durable cursor/eligibility and next-run recovery; service-role access never replaces scope/state/audit. |
| Voice transcription misrecords horse names, quantities, or readings. | Medium | High | Require provider/privacy choice, review-before-save, editable confirmation, and typed fallback. |
| Identifiable horse/stable/person evidence is published without authority. | Medium | High | Use anonymised/recreated assets and require explicit releases. |
| Local commits are lost because no remote backup was authorized. | Medium | High | Treat current commits as local only; request separately scoped push/backup approval. |
| Remote migration, deployment, or production mutation occurs from a local-readiness sprint. | Low | Critical | Maintain strict stop boundaries and explicit authorization requirements. |
| CI/local commands drift or accidentally include remote harnesses. | Low | High | Keep explicit allowlists, orchestrator self-tests, and CI’s canonical command. |

## Non-Blocking Watch Items

- Node/Next upgrades should be planned deliberately; the validated runtime is Node 22.14.0.
- Build page-generation worker exits may be intermittent; local mode permits one unchanged evidence-backed retry only.
- Planning archives are historical and may contain superseded recommendations; current authority is indexed separately.

## Closed / Historical

See `planning/history/RISKS-THROUGH-017F.md`. Archived risks remain evidence but are not automatically active.
