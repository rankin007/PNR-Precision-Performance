# Precision Performance Definition Of Done

## Source Authority

Source: `Precision Performance Done.docx`, attached by the user and preserved at `references/client-docs/PNR and RJR EPP Working Information/Precision Performance Done.docx`.

Reviewed: 2026-07-14.

Sprint 011 distills that source into canonical project truth. The DOCX remains source material; this file is the working 120x definition Builders and Architects should use.

## Current Status

Precision Performance is live at `https://precisionperformance.com.au`, but it is not Done against the full trainer-ready target.

Sprint 036K closes only a local `prelaunch-readiness-blocked-clean` control/evidence boundary. All seven credential classes and both excluded identities remain blocking-retained, and no real-trainer delivery or fresh live/provider readback occurred. L09 remains accepted only with the local-schedule limitation; legal/customer and Production acceptance, representative comprehension/field acceptance, P48 horse-model completeness, under-60 submission and Product-wide Done remain open.

The full Done target is broader than a deployed MVP shell or a locally complete role sprint. Done still means a secure, production-ready trainer-facing biochemistry portal behind the public Precision Performance website.

## Done Statement

For the current MVP, Precision Performance is Done when trainers can open the mobile portal, enter notes through the launch-accepted fallback, submit confirmed readings for a horse in under 60 seconds, and immediately receive the approved numeric scores and trend context inside a secure role-based portal. Private photos/PDFs are an approved MVP 2 deferral; future clinical guidance remains separately deferred by approved scope.

## Product Done Criteria

Trainer workflow:

- Trainer can open the portal on mobile and reach the assigned horse workflow quickly.
- Trainer can create a test record in under 60 seconds.
- Current-MVP notes attach as typed editable text; optional device-keyboard dictation enters the same field, and every non-empty note requires review before submission.
- MVP 2: optional photos and PDFs attach to the test record after the private-evidence safety boundary is approved and proven.
- Trainer can enter or confirm numeric values from instruments before submission.
- The returned result includes Hydration Score, Health Score, recommendations, and today-level guidance.

Inputs and calibration:

- Carbohydrate reading accepts `0-15%`.
- Conductivity reading accepts `0-70C`.
- Pink Horiba conductivity meter input is multiplied by `1.43` before storing or displaying the final C value.
- pH urine and pH saliva use `.1` calibration.
- Turbidity uses levels `1-5`.
- Temperature charting always shows the ideal line at `37.5`.
- Water intake is recorded in litres using `.5` litre increments.
- Workload/context notes from trainer or track team can be recorded.

Scoring:

- Hydration Score uses carbohydrate and conductivity.
- Hydration Score classifies results as Green, Amber, or Red:
  - Green: Optimal Zone.
  - Amber: Borderline, slight adjustments required.
  - Red: Dehydrated, improvements required immediately.
- Health Score uses carbohydrate, conductivity, pH urine, pH saliva, and turbidity.
- Health Score classifies results as Green, Amber, or Red:
  - Green: Health Zone Ideal Result.
  - Amber: Correction Zone, slight adjustments required.
  - Red: Risk Zone, immediate changes to be made.

Recommendations:

- The Table of Knowledge scaffold exists and is editable.
- Recommendation categories include hydration recommendations, feed adjustments, supplement suggestions, water timing and volume guidance, and other guidance.
- Table of Knowledge columns include Level 1 Comments through Level 5 Comments.
- Recommendations are clear enough for trainers to act on immediately.
- Formula and recommendation content must come from approved domain material, not Builder invention.

Uploads and future extraction (MVP 2):

- Optional PDFs and photos can attach to the relevant test record after MVP 2 activation; typed notes remain in the current workflow.
- Future supported photo subjects may include pH meter/strips, horses, refractometer readings, and conductivity meter readings, subject to MVP 2 approval.
- OCR, colour analysis, and meter-screen interpretation are future enhancements unless explicitly promoted into MVP scope.
- Any automatic extraction must include trainer confirmation before the reading is treated as authoritative.

Roles and security:

- Trainer has full data entry for assigned horses.
- Owner is read-only.
- Vet is read-only unless trainer-managed access changes that permission.
- Stable staff has limited write access.
- Admin has full access and control.
- Users see assigned horses only.
- No cross-stable visibility is allowed.
- Corrections are audited.
- When MVP 2 uploads are activated, they must be stored securely with access boundaries matching the horse/test record.

Trends and reporting:

- Trainer can view Hydration Score over time.
- Trainer can view Health Score over time.
- Trainer can view carbohydrate, conductivity, pH urine, pH saliva, and turbidity trends.
- Charts can show individual results or multiple tests/inputs together.
- Charts support AM only, PM only, and both AM/PM views.
- Trainer can save favorite/default chart configurations.
- History panel highlights horses by Green, Amber, and Red zone.
- History panel can filter attention states, including Red only and Amber plus Red.

Website and portal integration:

- Public website explains the offer clearly and includes a CTA to access the secure portal.
- Portal is secure, mobile-first, fast for data entry, and returns scoring/recommendations in real time.

Data model:

- Current-MVP test records retain horse, accepted readings, notes, numeric scores, creator and creation time; optional uploads/photos are reserved for MVP 2, while other deferred fields remain governed by their approved scope decisions.
- Horse records include name, trainer, owner, baseline values, and performance zone range.
- Protocol/recommendation records support hydration actions, feeding actions, supplement actions, and risk levels.
- User and assignment records support role, membership level, and assigned-horse access.

## Operational Acceptance Criteria

Trainer acceptance:

- Can submit a test in under 60 seconds.
- The accepted current-MVP manual fallback is always-available typing with optional device-keyboard dictation and mandatory review; application-controlled audio/transcription is unavailable.
- MVP 2 acceptance: photos/PDFs upload quickly and attach to the correct test after the safety boundary is approved.
- Scores appear immediately after submission.
- Recommendations are clear, actionable, and based on approved domain rules.

Owner acceptance:

- Can view permitted horse scores and trends.
- Can understand recommendation outputs without write access.

Admin acceptance:

- Can manage users and horses as approved by product scope.
- Can audit corrections.
- Can view operational data needed for support and launch operations.

## Launch Readiness Criteria

Done requires:

- Production Supabase configured and migrated.
- RLS validated with real role and horse fixtures.
- Auth boundaries proven for trainer, owner, vet, stable staff, admin, inactive/non-member, and anonymous cases.
- Stripe tested where commerce remains part of launch scope.
- Portal workflows stable on mobile and desktop.
- Mobile UX optimized for the under-60-second trainer workflow.
- No preview mode or placeholder data in production-facing launch flows.
- Monitoring and rollback path documented.
- Clear offering, benefits, pricing, onboarding, and support plan.

## Not Yet Done

Current project evidence does not yet prove:

- Complete biochemistry test capture as defined by this Done target.
- Future application-controlled voice recording/transcription, if separately approved; the reviewed typed/device-keyboard fallback is accepted for the current MVP.
- Deferred to MVP 2 by approved scope: photo/PDF upload and secure storage for test records.
- Hydration Score and Health Score implementation with approved formulas.
- Table of Knowledge recommendation content beyond the scaffold requirement.
- Trainer-facing recommendation output from approved domain rules.
- Saved chart favorites/default configurations.
- AM/PM/Both trend chart filtering.
- Zone-highlighted history panel and attention filters.
- Production and representative-participant acceptance of the locally complete trainer/owner/veterinary/staff/admin role journeys.
- Production live acceptance gates carried from Sprint 010.

## Required Decisions And Inputs

Before implementation sprints can safely build the full Done target, the project needs:

- Exact Hydration Score formula.
- Exact Health Score formula and weights.
- Final pH ideal range and calibration interpretation.
- Conductivity source rules and when the `1.43` multiplier applies.
- Initial Table of Knowledge comments by category and level.
- Recommendation review/disclaimer requirements.
- Future MVP 2 OCR/photo recognition scope and confirmation rules, if promoted.
- Any future application-controlled voice provider, permission, consent, processing, retention/deletion, correction and error-handling contract; the current-MVP typed fallback requires no provider.
- Future MVP 2 upload retention, allowed file types, storage buckets, and access boundaries.
- Representative Owner comprehension and Production activation of the accepted existing-rule managed-access journey.
- Named support/privacy/incident/platform/migration/release/restoration ownership and rehearsal evidence for launch readiness.

## Roadmap Link

Sprint 011 normalizes this Done target. Recommended next sequence:

- Sprint 012 - Live Acceptance Closeout And Safety Hardening.
- Sprint 013 - Biochemistry Test Data Model.
- Sprint 014 - Trainer Mobile Test Capture Workflow.
- Sprint 015 - Scoring And Recommendation Engine.
- Sprint 016 - Trends, History Panel, And Saved Charts.

Sprint 033B locally completes named operational ownership, incident/privacy procedure and synthetic same-process logical database/Storage restoration proof. Sprint 036K adds inspected local fail-closed credential/identity/delivery controls but withholds its target as `prelaunch-readiness-blocked-clean`. O08/O10/L08 strengthen locally; L04 stays deferred and L09 limited. Sprint 036M must address the still-open provider-native credential, exact identity and protected real-delivery boundary; Product-wide Done remains open.

Sprint 036M adds inspected local protected-transaction, compensation, fixture-cleanup and no-leak controls but closes `prelaunch-recovery-blocked-clean`. No live/provider/private action ran and no Done criterion is promoted. Native consumer/old-deployment/class readback, identities, real trainer, representative acceptance and Product-wide Done remain open.

Sprint 036N strengthens the local finite inventory, phase, deletion and privacy contracts but closes `native-closure-blocked-clean`. No provider/private/external action ran and no Done criterion is promoted. Native provider closure, identities, representative trainer acceptance and Product-wide Done remain open.

Sprint 036O adds inspected local accepted-object graph, fixture-separation, pagination/refusal and protected-transport controls but closes `provider-authority-discovery-blocked-clean`; target not met. One exact source edge remains missing, no provider/trainer action ran, all seven classes remain `unknown-blocking`, and no Done criterion is promoted. Accepted Sprint 036L remains the last durable live authority; fresh provider, identity, representative acceptance, Production completion and Product-wide Done remain open.