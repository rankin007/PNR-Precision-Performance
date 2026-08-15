# Sprint 025D — Numeric Results with Deferred Guidance

## Outcome

Present accepted biochemistry readings, derived conductivity, numeric Hydration Score and numeric Biochemistry Trend Score cleanly without visible classification, recommendation or today-guidance panels. Preserve the existing versioned threshold/recommendation engine as an inactive future extension point. Do not invent clinical content, reinterpret historical records or activate any remote change.

Exact closeout outcome when all acceptance criteria pass:

`numeric-results-presented-guidance-deferred-local-complete-clean`

## Authority and decision

- On 2026-08-11 the user decided that the data may be presented without recommendations and that a place should remain for classifications/recommendations to be added later.
- This is product-scope authority to defer absent content. It is not veterinary approval of thresholds, meanings, recommendations, disclaimers, escalation or today guidance.
- Sprint 025C remains the accepted local numeric formula/source authority. Sprint 028B remains the accepted local stored-history/trend authority.
- Keep `Biochemistry Trend Score` as the provisional display-only label for persisted/internal `healthScore`. Do not rename database fields, TypeScript compatibility keys or historical snapshots.
- Green/Amber/Red thresholds, zone meanings, recommendation rules, today guidance, clinical priority, diagnosis, prognosis, treatment, dose, prescribed water volume, urgency and race-readiness claims remain unavailable.
- The existing domain types/functions for versioned threshold sets, inactive/draft/active recommendation rules, validation, blocked/unavailable results and source/version snapshots are the reserved future extension point. Preserve them without activating fixture content.

## User-visible behavior

1. A successfully scored biochemistry result presents:
   - the four accepted current readings: Carbohydrate, Saliva pH, Urine pH and raw Conductivity;
   - derived effective converted C and the selected Salts table reading when available;
   - numeric Hydration Score;
   - numeric Biochemistry Trend Score using the display-only label;
   - formula and lookup-source provenance.
2. Keep the current accepted precision, units, formula/source versions and v1/v2 reconstruction behavior. Do not recalculate or reinterpret stored scores.
3. When scoring is blocked, retain the neutral blocked state and explain that no score was guessed. Do not show a normal/healthy implication.
4. Remove the current visible `Zones` section and its unavailable cards from the result presentation.
5. Remove the current visible `Recommendations` section and its unavailable card/blocker copy from the result presentation.
6. Do not replace those sections with empty boxes, “coming soon”, fake content, sample thresholds, example advice or a trainer action that suggests guidance exists.
7. Do not show Green/Amber/Red colours, zone labels, attention filters, recommendation categories, recommendation levels, today guidance, escalation advice or clinical disclaimers as if approved.
8. Preserve navigation, session/role/horse/test access, capture submission behavior, audit behavior, scoring behavior and Sprint 028B trends unchanged.
9. The result action/page should no longer calculate, transport or require zone/recommendation presentation data when rendering the current numeric result. Keep the underlying pure domain extension contract untouched for future use.

## Approved implementation files

Builder may edit only:

- `components/ops/biochemistry-result-panel.tsx`
- `app/(ops)/data-entry/biochemistry/[testId]/page.tsx`
- `app/(ops)/data-entry/biochemistry/actions.ts`
- `scripts/test-biochemistry-presentation-025D.mjs` (new)
- `package.json`
- `docs/BIOCHEMISTRY_PRESENTATION_025D.md` (new)

Plus Sprint 025D evidence/review/sprint files and the required closeout updates to:

- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ROADMAP.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/QUESTIONS.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`
- `planning/SPRINT_LIFECYCLE_LEDGER.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/EVIDENCE_INDEX.md`
- `delivery_road_map.md`
- `planning/reviews/025D-numeric-results-with-deferred-guidance.md` (new)
- `evidence/professional-engineering/025D-numeric-results-with-deferred-guidance/evidence.md` (new)
- `evidence/professional-engineering/025D-numeric-results-with-deferred-guidance/SPRINT-025D-REPORT.md` (new)

## Explicitly excluded files and actions

- Do not edit `lib/domain/biochemistry.ts`, scoring formulas, lookup fixtures, migration 0024, migration 0025, historical data or the accepted source workbook.
- Do not add a feature flag, hidden clinical value, dormant database row, fixture promotion, threshold default, recommendation default or placeholder content.
- Do not add or apply a migration.
- Do not deploy, create/use credentials, send email, submit enquiries, move aliases, access real horse/person data, stage, commit, push, merge or open a PR.
- Stop for any required implementation file outside the approved set, any authority conflict, protected data, secret exposure, migration need, access-boundary change, destructive uncertainty, Production impact or cleanup that cannot be proven safe.

## Acceptance criteria

- AC-01: Current working directory and Git top both equal the canonical workspace before any change; staged count begins and ends at zero.
- AC-02: The scored result shows the four accepted readings, derived conductivity values, both numeric scores and formula/source provenance.
- AC-03: Numeric values, units, precision and formula/source identity remain consistent with accepted Sprint 025C behavior.
- AC-04: Historical v1 and current v2 result reconstruction remain compatible; no stored value is recalculated.
- AC-05: Blocked scoring remains neutral, visible and fail-closed; no score is guessed.
- AC-06: No visible Zones heading, zone card, Green/Amber/Red label/colour or threshold-required placeholder appears in the current result.
- AC-07: No visible Recommendations heading, recommendation card, recommendation blocker or today-guidance placeholder appears in the current result.
- AC-08: No clinical meaning, urgency, treatment, diagnosis, prognosis, dose, prescribed water volume or race-readiness claim is added.
- AC-09: The result action/page no longer calculates, returns or requires zone/recommendation presentation data for the current numeric result.
- AC-10: `lib/domain/biochemistry.ts` remains byte-unchanged, preserving versioned threshold/recommendation types, validation and unavailable behavior for future approved content.
- AC-11: Fixture-only Sprint 015 thresholds/rules remain inactive and are never imported into Product presentation.
- AC-12: Existing session, role, horse/test access, submission, audit, navigation and trends behavior remain unchanged.
- AC-13: Focused tests prove scored v2 presentation, blocked presentation, absence of every deferred surface/copy, no action-path zone/recommendation composition, and byte/source preservation of the extension contract.
- AC-14: Retained Sprint 025C scoring/workflow, Sprint 028B trends and relevant role/access tests pass.
- AC-15: At exact `414 × 896` CSS pixels, the shared Product result has no unintended document overflow or clipped primary content; applicable targets remain at least `44 × 44` CSS pixels.
- AC-16: At `1440 × 900` and 200% equivalent, all numeric result content and provenance remain available without document overflow.
- AC-17: Exactly two final synthetic visuals are retained: one mobile complete numeric result and one desktop complete numeric result. They contain no real identity, note, credential, provider value or identifiable horse/person data.
- AC-18: Typecheck, zero-warning lint, JSON validation, optimized Product build and exact diff/credential/identity scans pass, using equal-or-stronger safe substitute evidence for a supporting-tool limitation.
- AC-19: Fresh critical inspection finds no unresolved Product, access, clinical-claim, regression, evidence or cleanup blocker.
- AC-20: No migration, deployment, credential, email, enquiry, alias, real-data, stage, commit or push action occurs; external mutation/residue remain zero.
- AC-21: Closeout records the product decision as deferred future scope rather than missing current authority, while keeping the future extension and Product-wide Done truthful.

## Acceptance-matrix closeout boundary

- Preserve P07-P10, P15 and P17 numeric/scoring dispositions.
- Record P06, P16, P18, P20, P22, P43, P44, P49 and O05 as `deferred-by-approved-scope`, with the future versioned extension retained and no implication that those capabilities pass.
- Preserve P19 and P21 as scaffold-only passes.
- Preserve P23 as the fail-closed/no-invention safety boundary.
- Keep O04 unproven until separately authorized Production migration/deployment and immediate-result acceptance occur.
- Reconcile P46 and O07 truthfully without marking them passed merely because numeric local presentation is clean.
- Product-wide Done remains false. This sprint deliberately defers clinical guidance; it does not erase the future roadmap item or manufacture acceptance.

## Validation and evidence

1. Add an npm command for the new focused suite.
2. Run the focused 025D suite and record exact assertion arithmetic.
3. Run retained 025C scoring/workflow and 028B trend suites directly.
4. Run typecheck, zero-warning lint, JSON validation and an optimized Product build.
5. Render the shared Product component with deterministic synthetic data only.
6. Capture exactly:
   - `01-mobile-numeric-result-414x896.png`
   - `02-desktop-numeric-result-1440x900.png`
7. Record viewport/client/document widths, 200% equivalent geometry, target sizes, screenshot hashes and a visual inspection of both files.
8. Obtain fresh critical inspection and correct every stable in-scope finding before closeout.
9. Prove staged count zero, external mutation/residue zero, evidence listener stopped, owned browser/process residue zero and temporary artifacts absent.

## Evidence-Proportional Execution Standard

- Stop only for a material target, authority, security, privacy, migration, destructive, integrity, Production, scope or cleanup risk.
- When a preferred supporting tool is unavailable, use equivalent or stronger safe evidence and record why it proves the same acceptance boundary.
- Keep deterministic test-harness, validator, formatting, encoding, reporter and other non-Product corrections inside this sprint when they remain within the approved outcome and file set.
- Do not create a follow-up sprint solely because Docker, browser automation, a visual renderer, schema dump, optional CLI path or redundant verification is unavailable.
- Do not repeat a failed action blindly. Diagnose once and use the safest effective alternative.
- Use manual intervention only after safe in-scope alternatives are exhausted. If genuine user action remains necessary, record what is blocked, evidence checked, exact step-by-step action and what Builder will verify afterward.

## Builder handoff

1. Reconfirm canonical CWD/Git top and staged zero.
2. Reread this Sprint file, Sprint 025C/028B authority and closeout, the design/messaging authority and relevant result/action/domain files.
3. Run baseline focused and retained tests before Product edits.
4. Implement only the approved numeric-presentation simplification. Preserve the future domain extension byte-for-byte.
5. Add focused proof, capture exactly two synthetic visuals and obtain fresh critical inspection.
6. Reconcile every named closeout file and acceptance-matrix disposition truthfully.
7. Stop cleanly without external action, staging or publication.

The Builder report must lead with delivered behavior, state exact test arithmetic and limitations, identify future deferred content, list safety counts and finish by stating exactly whether anything is required from the user. If nothing is required, end exactly:

`I need nothing from you.`
