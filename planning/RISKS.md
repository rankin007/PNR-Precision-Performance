# Current Risks

## Sprint 030 commercial authority

- Price/GST, freight, term, refunds/returns, ownership/warranty/buyback, trial and fulfilment remain unapproved.
- `commerce-disabled-safe` is enforced in typed source, public surfaces, checkout and webhook reconciliation; seeded/historical values are non-authoritative.
- Future business approval does not itself enable commerce; implementation and test/Production action require later authorised execution.

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
| Singapore hosting is misrepresented as Australian-only storage or database backup is mistaken for Storage-object recovery. | Medium | Critical | Require sanitised proof that the intended project is exact approved `ap-southeast-1` Singapore; state international processing accurately; require separate object backup, recovery, expiry and restoration-agreement evidence before production. |
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
# Sprint 023H residual risk — 2026-07-28

The corrected CommonJS tools pass focused behavior and full lint proof, but the required production-build rerun did not complete in two bounded attempts. Treat build completion as unproven until a narrow reparse-safe environment diagnosis passes; do not infer a source defect or production readiness from the timeout alone.
# Sprint 023I residual risk — 2026-07-28

Local combined proof is clean only when the dependency/build path is physically isolated from the OneDrive junction. Original-path build timing remains unreliable. Remote migration, Storage, hosted roles, safety adapters, CSV, Cron, region and recovery evidence remain separate pre-production risks.
# Sprint 023J authority risk — 2026-07-28

Selecting a recorded project merely because it is approved-region `ap-southeast-1`, relying on cached links/names, or proceeding without exact Vercel mapping, synthetic-only classification, provider approval and Storage-object recovery would breach the remaining 023J gates. No external access occurred.
# Sprint 023K regional risk — 2026-07-28

Singapore `ap-southeast-1` is approved international processing and must not be represented as Australian-only storage. Region acceptance does not waive exact-target, provider/privacy, recovery or production-mutation controls.
# Sprint 025 current risks — 2026-07-29

- Production classifications remain unavailable until complete non-overlapping score boundaries, inclusivity, labels and context are approved by a named domain owner.
- Measurement units, device applicability, calibration, display precision, steps and permitted biological/device ranges are unresolved; presenting guessed values would create health-adjacent misinformation risk.
- Table of Knowledge categories, triggers, wording, review class and veterinary escalation language remain unresolved; fixture content must never enter runtime authority.
- The selected committed lineage contains prior evidence-transfer functionality, while Sprint 025 defers new evidence/provider activation. Sprint 025 made no change to that separate subsystem; safety processing still fails closed and Production activation remains outside this sprint.
## Sprint 027B retained risks — 2026-07-29

- Unapproved biological thresholds or knowledge content could create misleading health-adjacent outputs; unavailable states must remain fail closed.
- Evidence safety services are not approved/activated; blocked or unknown evidence must expose no preview/download path.
- Device-keyboard dictation must not be misrepresented as application-managed, local-only, private, offline, secure or accurate; application audio/transcription remains unavailable.
# Sprint 028 watch item — 2026-07-29

- Production clinical-priority authority remains unavailable. Do not convert the operational incomplete signal into severity, diagnosis, treatment or race-readiness language.
# Sprint 031 risk — protected rendered transport

The reconciled lineage lacks a Preview-compatible redacting runner that can install protected Supabase sessions into an isolated rendered browser. Production release planning remains unsupported until that exact matrix passes.
# Sprint 031B risk — matrix ceiling conflict

The unchanged cross-stable denial case cannot be genuinely executed with only one owned stable and no permitted non-owned data. Production release evidence remains incomplete.
