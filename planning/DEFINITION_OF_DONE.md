# Precision Performance Definition Of Done

## Source Authority

Source: `Precision Performance Done.docx`, attached by the user and preserved at `references/client-docs/PNR and RJR EPP Working Information/Precision Performance Done.docx`.

Reviewed: 2026-07-14.

Sprint 011 distills that source into canonical project truth. The DOCX remains source material; this file is the working 120x definition Builders and Architects should use.

## Current Status

Precision Performance is live at `https://precisionperformance.com.au`, but it is not Done against the full trainer-ready target.

Sprints 001-010 produced a deployed MVP shell and partial live acceptance evidence. Remaining Sprint 010 live blockers still exist: remote Supabase migration/checks, authenticated Supabase/RLS/member/horse workflow smoke, and Stripe test checkout/signed webhook replay/duplicate delivery verification.

The full Done target is broader than a deployed MVP shell. Done now means a secure, production-ready trainer-facing biochemistry portal behind the public Precision Performance website.

## Done Statement

Precision Performance is Done when trainers can open the mobile portal, speak or enter notes, upload photos/PDFs, submit confirmed readings for a horse in under 60 seconds, and immediately receive Hydration Score, Health Score, trend context, and clear feeding, hydration, water, supplement, and operational recommendations inside a secure role-based portal.

## Product Done Criteria

Trainer workflow:

- Trainer can open the portal on mobile and reach the assigned horse workflow quickly.
- Trainer can create a test record in under 60 seconds.
- Voice-to-text notes attach to the test record.
- Photos and PDFs attach to the test record.
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

Uploads and future extraction:

- PDFs, notes, and photos can attach to the relevant test record.
- Supported photo subjects include pH meter/strips, horses, refractometer readings, and conductivity meter readings.
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
- Uploads are stored securely with access boundaries matching the horse/test record.

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

- Test records include horse, carbs, conductivity, pH urine, pH saliva, turbidity, uploads/photos, voice notes, hydration score, health score, recommendations, creator, and creation time.
- Horse records include name, trainer, owner, baseline values, and performance zone range.
- Protocol/recommendation records support hydration actions, feeding actions, supplement actions, and risk levels.
- User and assignment records support role, membership level, and assigned-horse access.

## Operational Acceptance Criteria

Trainer acceptance:

- Can submit a test in under 60 seconds.
- Voice-to-text works reliably enough for launch or has a clear manual fallback.
- Photos/PDFs upload quickly and attach to the correct test.
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
- Voice-to-text notes attached to test records.
- Photo/PDF upload and secure storage for test records.
- Hydration Score and Health Score implementation with approved formulas.
- Table of Knowledge recommendation content beyond the scaffold requirement.
- Trainer-facing recommendation output from approved domain rules.
- Saved chart favorites/default configurations.
- AM/PM/Both trend chart filtering.
- Zone-highlighted history panel and attention filters.
- Full role set including trainer, owner, vet, stable staff, and admin with trainer-managed exceptions.
- Production live acceptance gates carried from Sprint 010.

## Required Decisions And Inputs

Before implementation sprints can safely build the full Done target, the project needs:

- Exact Hydration Score formula.
- Exact Health Score formula and weights.
- Final pH ideal range and calibration interpretation.
- Conductivity source rules and when the `1.43` multiplier applies.
- Initial Table of Knowledge comments by category and level.
- Recommendation review/disclaimer requirements.
- OCR/photo recognition scope and confirmation rules.
- Voice-to-text provider, fallback, and error-handling behavior.
- Upload retention, allowed file types, storage buckets, and access boundaries.
- Trainer-managed vet and stable-staff access rules.
- Product/pricing/onboarding/support decisions for launch readiness.

## Roadmap Link

Sprint 011 normalizes this Done target. Recommended next sequence:

- Sprint 012 - Live Acceptance Closeout And Safety Hardening.
- Sprint 013 - Biochemistry Test Data Model.
- Sprint 014 - Trainer Mobile Test Capture Workflow.
- Sprint 015 - Scoring And Recommendation Engine.
- Sprint 016 - Trends, History Panel, And Saved Charts.
