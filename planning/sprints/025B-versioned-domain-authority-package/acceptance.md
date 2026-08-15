# Sprint 025B Acceptance — Versioned Domain Authority Package

## Canonical and scope integrity

- [x] Current directory and Git root both equal the canonical workspace.
- [x] Branch, HEAD, index and pre-existing dirty manifest are recorded.
- [x] Pre-existing changes are preserved and Sprint 025B changed paths are within the approved set.
- [x] No legacy checkout or `C:\tmp` worktree was used as an implementation workspace.
- [x] No staging, commit, push, merge or PR occurred.

## Package completeness

- [x] `docs/SPRINT_025B_VERSIONED_DOMAIN_AUTHORITY_PACKAGE.md` exists and has a stable ID/version/status.
- [x] Established software facts are distinguished from candidate evidence and owner decisions.
- [x] Every accepted row has a named reviewer, role, date, source and source version.
- [x] Every missing decision is marked exactly `OWNER INPUT REQUIRED`.
- [x] The package records effective date, change control and supersession.

## Measurement, device and formula authority

- [x] All five raw measurements have explicit names, device applicability, units, precision, step, range, calibration/preparation and invalid-input handling, or are marked owner input required.
- [x] pH average, rounding and calibration semantics are explicit.
- [x] Conductivity device applicability, raw/converted units and the `1.43` rule are explicit.
- [x] Both score formulas, inputs, weights, domains, rounding, display precision, IDs and source versions are explicit.
- [x] The final trainer-facing label for internal `healthScore` is explicit while the persisted key remains unchanged.

## Classification and language authority

- [x] Each accepted score has one complete non-overlapping Green/Amber/Red set covering the approved domain.
- [x] Every boundary has explicit inclusive/exclusive semantics.
- [x] Every zone has text label, context, source/version and named reviewer attribution.
- [x] No fixture value, marketing phrase or historical example is treated as approval.

## Table of Knowledge and safety authority

- [x] Every accepted rule has stable ID, category, level, deterministic trigger, exact wording, review class, source/version, effective date, status and supersession.
- [x] Disclaimer, trainer-review and veterinary-review wording is exact and attributed.
- [x] No diagnosis, prognosis, treatment, dose, prescribed water volume, guarantee or replacement-of-veterinary-judgement claim was invented.
- [x] Missing/conflicting rules remain unavailable.

## No activation boundary

- [x] No file under `app/`, `components/`, `lib/`, `scripts/`, `supabase/`, `references/fixtures/` or package configuration changed for Sprint 025B.
- [x] No Product classification, recommendation, label or UI was activated.
- [x] Sprint 025C remains the separate activation/proof boundary.
- [x] No credentials, Production/external mutation, deployment, alias movement, email or enquiry occurred.

## Validation and closeout

- [x] Retained Sprint 025 structural authority test passes without modification.
- [x] Applicable JSON/static checks pass or an equivalent safe substitute is documented.
- [x] `git diff --check` passes.
- [x] Changed-file credential and identifiable horse/person scans are clean.
- [x] Planning state, status, roadmap, schedule, ledger, matrix, risks, questions, evidence and briefing agree.
- [x] Index is empty and work remains uncommitted.

## Outcome record

- [x] Exact outcome is one of the two defined below.
- [x] Final report states the package version/status, accepted sections, unresolved rows and whether Sprint 025C is unblocked.
- [x] If owner input is required, the final report gives the eight plain-English user steps and ends with the exact things required from the user.
- [x] N/A for Outcome B — if owner input were not required, the final report would end: `I need nothing from you.`

### Outcome A

`versioned-domain-authority-package-accepted-clean`

Use only when every required authority row is accepted by named, dated product/domain and veterinary reviewers using the same package version. This unblocks Architect planning for Sprint 025C but does not claim runtime activation.

### Outcome B

`versioned-domain-authority-package-owner-input-required-clean`

Use when the prefilled package and reviewer checklist are complete but named decisions remain missing or conflicting. Product remains fail closed and Sprint 025C remains blocked.

## Final closeout evidence — corrective inspection 2/3 PASS

- Flight class: `critical`.
- Critical plan review: decision 3/3 PASS; `PLAN-001` resolved.
- Corrective inspection: decision 2/3 PASS; `INSPECT-001`, `INSPECT-002` and `INSPECT-003` resolved with no advisory.
- Package: `docs/SPRINT_025B_VERSIONED_DOMAIN_AUTHORITY_PACKAGE.md`; ID `sprint-025B-authority-v1`; status `owner-input-required`; current SHA-256 `E42EEB9D7D6DF21B5A7BC8E642666020AEDAC11837180DB359FD686760E4303C`.
- Named, dated product/domain complete approvals found: `0`; partial Section 2 decisions are recorded, plus a material unimplemented conflict directing removal of Average pH from a formula that currently contains `L_pH`.
- Named, dated veterinary approvals found: `0`.
- Exact outcome: `versioned-domain-authority-package-owner-input-required-clean`.
- Product/runtime/source/test/schema/fixture/package/client-source edits by Sprint 025B: `0`.
- Final Product Acceptance Matrix IDs changed: none; the matrix file is unchanged.
- Retained structural test: pass, zero failures.
- JSON validator: 8 self-test cases and 7 maintained JSON files passed.
- Static validator: encoding across 1,186 maintained text files plus seven maintained static validators passed.
- `git diff --check`: pass.
- Changed-file credential and identifiable horse/person scans: clean.
- Staged count: `0`; external effects/residue: `0/0`.
- Acceptance accounting: 36 applicable criteria pass plus one conditional N/A = 37/37 accounted.
- Sprint 025C remains blocked. Next Architect focus is Sprint 035R. Public enquiry remains parked.
- No residual risk was accepted; missing named authority remains an explicit owner-input dependency.
