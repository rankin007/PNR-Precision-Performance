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
| Uploads expose operational or personal data without retention/access design. | Medium | High | Require bucket, RLS/access, file-type, retention, deletion, consent, and privacy scope first. |
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
