# Sprint 025 Acceptance Criteria

## Baseline and scope

- [x] Builder used a clean isolated baseline containing the accepted four-reading workflow and recorded the exact commit.
- [x] The changed-file manifest contains only approved Sprint 025 paths.
- [x] The accepted PDF/image/CSV/provider and voice deferrals are recorded; those capabilities remain disabled or fail closed.
- [x] No provider account, purchase, credential, remote mutation, deployment, push, merge or PR occurred.

## Measurement and formula authority

- [x] The canonical record clearly distinguishes five raw measurements from four scoring lookup inputs.
- [x] Every raw measurement has an accepted or explicitly unresolved name, unit, precision, step and permitted range.
- [x] pH-average and conductivity-conversion rules are recorded with rounding and applicability.
- [x] Exact lookup/interpolation policy is explicit.
- [x] Hydration Score and internal `healthScore` formulas, precision and source versions are traceable.
- [x] Internal `healthScore` compatibility is preserved unless an expressly approved migration/compatibility plan exists.

## Threshold authority

- [x] Each activated score has exactly one complete Green/Amber/Red threshold set.
- [x] Bounds, inclusivity and score-domain coverage are explicit.
- [x] Active sets have no gap, overlap, inversion or non-finite value.
- [x] Exact boundary and adjacent-value tests pass.
- [x] Missing, incomplete or invalid threshold authority remains blocked/unavailable.
- [x] Fixture-only thresholds are not activated.

## Result language and knowledge authority

- [x] Trainer-facing score names and status labels are explicitly accepted and versioned.
- [x] Colour is accompanied by label, numerical value and explanatory context.
- [x] Every activated recommendation has an approved category, level, trigger, wording, source, version and review/escalation class.
- [x] No Builder-invented biological threshold, diagnosis, treatment, supplement dose, water prescription or guarantee appears.
- [x] Missing or conflicting recommendation authority remains unavailable.
- [x] Supersession and historical snapshots prevent silent reinterpretation of prior results.
- [x] Disclaimer and trainer/veterinary review language are accepted and present where required.

## Operational proof

- [x] Synthetic tests prove the five-raw-to-four-lookup mapping.
- [x] Existing scoring, recommendation, capture and workflow regressions pass.
- [x] Invalid, missing, out-of-range and exact-lookup-miss cases fail safely.
- [x] Maintained JSON, static, TypeScript and lint checks pass.
- [x] A production build passes, or an equivalent/stronger safe build proof is recorded under the Evidence-Proportional Execution Standard.
- [x] `git diff --check` passes.
- [x] Secret, personal-information and generated-artifact scans report no prohibited content.

## Durable closeout

- [x] `planning/STATE.md`, `planning/STATUS.json`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/EVIDENCE_INDEX.md` and `planning/ARCHITECT_BRIEFING.md` agree.
- [x] Closeout distinguishes activated authority from unresolved/unavailable authority.
- [x] Any additive migration candidate is justified, hashed, locally validated and confirmed remotely unapplied.
- [x] Work remains unstaged and uncommitted unless separately instructed.

## Acceptable outcomes

`four-reading-domain-authority-encoded-clean` when all authority required for activated operational results is accepted, encoded and locally proven.

`four-reading-structured-operation-proven-authority-partial-clean` when the structured reading/scoring path is proven but one or more production threshold or recommendation slices remain deliberately unavailable because domain authority was not supplied. This is a valid bounded outcome and must not block later non-dependent product work.
