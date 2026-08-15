# Sprint 035R Requirements

## Outcome

Create a clinically neutral, phone-first trainer cockpit and horse-aware biochemistry review path. It must show which accessible horses have a latest record dated today, which are incomplete, what workflow state changed since the prior accessible record, and what useful action comes next. Produce visible and timed evidence at the iPhone XS Max portrait target.

## Authority and limitations

- Primary viewport: iPhone XS Max portrait, 414 × 896 CSS pixels.
- The user-nominated reviewer will perform a guided no-submit phone review when Builder provides a safe local step.
- “Today” is the current Australia/Brisbane calendar date and must be displayed explicitly.
- One guided review is a usability observation, not independent trainer acceptance, Sprint 035S completion, or authority for a public/universal “under 60 seconds” claim.
- Sprint 025C numeric behavior remains unchanged and local-only. Do not apply migration 0024 or deploy.

## Required behavior

1. From accessible records only, show the Brisbane date and counts for: latest record dated today; latest state draft/incomplete or pending review; and no accessible result. Failure shows unavailable with no inferred count/action.
2. Each horse card shows horse/stable, latest workflow/date, one primary action, and “Changed from <prior label>”, “Workflow state unchanged”, or “No earlier workflow record for comparison”.
3. Keep semantics operational only. Do not imply clinical urgency, health priority, treatment or race readiness; no Green/Amber/Red classification, threshold, recommendation or color-only meaning.
4. Use existing permissions:
   - writable + no result: Capture biochemistry with horseId=<accessible id>;
   - writable + incomplete/pending: Review current record;
   - writable + completed: Capture another test with horseId=<accessible id>;
   - read-only: Open horse workspace;
   - failed load: no record action and safe reload guidance.
5. Horse detail uses the same action derivation. Completed must not loop back to the same workspace as its only action.
6. horseId query input is a hint only. Preselect only an exact accessible-horse match; silently ignore missing/malformed/inaccessible values; keep selection editable; server permission/validation stays authoritative.
7. Default new-capture date to Brisbane today and time to AM before 12:00 Brisbane time or PM from 12:00. Use a pure/injected clock, keep defaults editable and never overwrite user edits.
8. Retain four readings, units, inclusive ranges, client/server validation, note review and repeat-tap protection. Review shows exact horse/date/AM-PM/readings/note before submit.
9. Remove stale “Exact lookup only” wording. Replacement must not contradict exact-or-next-lower v2 behavior.
10. Add clear authenticated Portal-to-capture and Operations-to-dashboard links without changing guards/permissions. Keep admin bootstrap behavior intact but visually separate from trainer work.
11. At 414 × 896: no unintended horizontal overflow or clipped core action; core content readable; applicable targets at least 44 × 44 CSS pixels; labels, focus/errors, landmarks and textual status available. At 1440 × 900 and 200% zoom, retain core content/actions.
12. Create synthetic-only screenshots under evidence/professional-engineering/035R-trainer-daily-cockpit-and-timed-mobile-workflow/visuals/:
    - cockpit at 414 × 896;
    - preselected capture/defaults at 414 × 896;
    - populated review at 414 × 896;
    - cockpit at 1440 × 900.
    Link/show them in the Builder report/handoff. No real horse/person, email, credential, token, provider identifier or confidential data.
13. Timed phone task: start before tapping the synthetic horse’s capture action; verify defaults; enter Builder’s four synthetic readings; tap Review test; stop when complete review is visible; do not submit. Record device/orientation/boundaries/fixture/elapsed time/friction/outcome as one observation.
14. If actual phone access would require deployment, public tunnel, credentials, real data or out-of-scope external action, follow the Manual Intervention Rule. Emulation proves layout, not actual-device completion.

## Hard boundaries

Reuse existing auth, RLS, visibility and permissions. No schema, migration, RLS, auth, permission, role, formula, clinical-authority or provider change. No real data, migration 0024 application, deployment, credential action, email, enquiry, alias movement, commit or push.

## File boundary

Product/test files only:

- app/(portal)/portal/page.tsx
- app/(portal)/portal/horses/[horseId]/page.tsx
- app/(ops)/data-entry/biochemistry/page.tsx
- components/ops/biochemistry-capture-workflow.tsx
- components/ops/biochemistry-workflow-state.ts
- components/portal/trainer-cockpit.tsx (new)
- lib/domain/stable-workspace.ts
- lib/domain/horses.ts
- lib/navigation.ts
- scripts/test-trainer-dashboard-035.mjs
- scripts/test-trainer-cockpit-035R.mjs (new)
- scripts/run-validation-suite.mjs
- package.json

Plus Sprint 035R evidence/review/sprint files and required closeout updates to planning/STATE.md, STATUS.json, ROADMAP.md, ARCHITECT_BRIEFING.md, QUESTIONS.md, DECISIONS.md, RISKS.md, FINAL_PRODUCT_ACCEPTANCE_MATRIX.md and delivery_road_map.md. The evidence boundary may contain a separate local Next evidence app generated and controlled by scripts/test-trainer-cockpit-035R.mjs. It must import the same production TrainerCockpit and BiochemistryCaptureWorkflow components, contain synthetic data only, add no Product route or auth bypass, and never be deployed.

## Evidence-Proportional Execution Standard

Stop only for material target, authority, security, privacy, destructive, integrity, production, scope, cleanup or real-device risk. Substitute equivalent or stronger safe proof for unavailable supporting tools. Keep deterministic in-scope harness/validator/format/report corrections in this sprint. Do not create a follow-up only because browser automation, a renderer, Docker, clipboard or optional CLI is unavailable. Never weaken an actual-device claim. Use manual intervention only after safe alternatives are exhausted; record exact steps and follow-up verification.
