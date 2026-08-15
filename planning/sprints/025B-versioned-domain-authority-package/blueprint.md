# Sprint 025B Blueprint — Versioned Domain Authority Package

## Delivery sequence

### Phase 1 — Reconcile the existing authority boundary

1. Verify canonical path, Git root, branch, HEAD, index and dirty manifest.
2. Compare the Sprint 025 authority record and closeout with current Product contracts and planning truth.
3. Inventory candidate client sources without treating them as approval.
4. Separate established software facts, proposed/candidate content and unresolved health-adjacent decisions.

## Flight evidence

1. **Class and reason:** `critical`; false attribution, ambiguous thresholds or accidental conversion of candidate content into accepted authority could silently corrupt later health-adjacent Product behavior.
2. **Acceptance invariant at risk:** no Sprint 025C authority dependency is accepted unless its exact value/wording, source/version, named reviewer, role and date are present; incomplete or conflicting slices remain `OWNER INPUT REQUIRED`, and Product/runtime remains unchanged.
3. **Affected layers and verified paths:** candidate client sources under `references/client-docs/` and the established structural contract in `docs/SPRINT_025_BIOCHEMISTRY_DOMAIN_AUTHORITY.md` are read-only origins; the Builder classifies facts versus candidate evidence in `docs/SPRINT_025B_VERSIONED_DOMAIN_AUTHORITY_PACKAGE.md`; planning review/closeout records carry the package status; Sprint 025C is the future and separate Product sink.
4. **Source of truth, transformations and sink:** versioned repository contracts establish current software behavior; named product/domain and veterinary decisions establish health-adjacent authority; 025B performs attribution, completeness and conflict classification only; the sink is a versioned accepted package or a fail-closed owner-input checkpoint, never runtime activation.
5. **Discriminating examples:** a threshold written as “Green from 0.70” without saying whether `0.70` is inclusive must remain unresolved because inclusive and exclusive implementations classify the same boundary differently; a blanket `1.43` conversion and a conversion limited to a named conductivity device produce different results for another device, so device applicability must be explicit; a complete-looking recommendation without the veterinary reviewer/date remains `OWNER INPUT REQUIRED` rather than accepted.
6. **Durable verification source:** canonical branch `codex/025B-versioned-domain-authority-package`, starting HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, current Git diff/status and the applied Sprint 025/Sprint 025B artifacts.
7. **Known uncertainty:** the repository does not currently contain named, dated product/domain and veterinary acceptance for all required measurement, threshold, language, recommendation, disclaimer and escalation rows. Builder must not resolve this uncertainty by inference.

### Phase 2 — Build the reviewable package

1. Create `docs/SPRINT_025B_VERSIONED_DOMAIN_AUTHORITY_PACKAGE.md`.
2. Prefill only facts directly supported by current versioned contracts.
3. Create exact tables for governance, measurements/devices, formulas, score naming, thresholds, Table of Knowledge rules, disclaimers, escalation and supersession.
4. Mark every missing decision `OWNER INPUT REQUIRED`.
5. Include source name, version, effective date and reviewer attribution on every accepted row.

### Phase 3 — Reconcile named review

1. Check that the product/domain owner and veterinary reviewer are named people with roles and dates.
2. Check that both reviewed the same package version.
3. Resolve or explicitly record every conflict; silence is not agreement.
4. Accept the package only when every Sprint 025C authority dependency is complete.
5. Otherwise stop at the clean owner-input checkpoint with the exact user instructions from requirements.

### Phase 4 — Prove the boundary

1. Confirm no Product, source, test, schema, fixture, package or client-source file changed.
2. Confirm no active rule is derived from fixtures or undocumented practice.
3. Confirm the package contains no credential or identifiable horse/person data.
4. Run the retained Sprint 025 structural test and proportionate planning/static checks.
5. Review the full diff and changed-path manifest.

### Phase 5 — Close truthfully

1. Record the exact package version and status.
2. Distinguish accepted authority from `OWNER INPUT REQUIRED` rows.
3. State whether Sprint 025C is unblocked; do not imply activation occurred.
4. Reconcile durable planning files and leave work unstaged/uncommitted.

## Package structure

The package should use this order:

1. Plain-English purpose and safety boundary.
2. Package identity, sources and reviewers.
3. Existing accepted structural facts.
4. Measurement/device decision table.
5. Formula and score-name decision table.
6. Hydration threshold and language table.
7. Internal `healthScore` threshold and trainer-language table.
8. Table of Knowledge rule table.
9. Disclaimer and escalation table.
10. Change control and supersession.
11. Final decision matrix.
12. Reviewer checklist and owner-input instructions when incomplete.

## Architecture trace

`025 established structural scoring` → `025B supplies named versioned authority` → `025C activates only accepted rules` → `035R/028B present and test visible workflow/trends`.

025B must not collapse these separate acceptance boundaries.

## Failure handling

| Condition | Required treatment |
| --- | --- |
| Named reviewer absent | Mark owner input required; do not accept package |
| Source version/effective date absent | Mark affected row owner input required |
| Threshold gap, overlap or ambiguous boundary | Reject affected set; do not choose a value |
| Product/domain and veterinary reviewers conflict | Record conflict; keep affected slice unavailable |
| Client document contains candidate values without named approval | Cite as candidate evidence only |
| Confidential or identifiable content encountered | Stop exposure, record sanitized fact and preserve source privately |
| Runtime/source change appears necessary | Stop and return to Architect; defer implementation to 025C |
| Supporting validator unavailable | Use equivalent safe review evidence under AGENTS.md and record substitution |
