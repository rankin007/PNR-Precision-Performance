# Sprint 011 - Builder Handoff Prompt

You are Builder for Sprint 011 - Done Normalization And Roadmap Realignment in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/011-done-normalization-and-roadmap-realignment/requirements.md`
5. `planning/sprints/011-done-normalization-and-roadmap-realignment/blueprint.md`
6. `planning/sprints/011-done-normalization-and-roadmap-realignment/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant docs under `docs/`

## Mission

Turn the attached `Precision Performance Done.docx` into durable project truth.

This is not a feature implementation sprint. Your job is to normalize the definition of Done, update the roadmap, and record the missing information required before Sprints 012-016 can build safely.

## Source Document

Use:

`C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\PNR and RJR EPP Working Information\Precision Performance Done.docx`

If accessible, copy it into:

`references/client-docs/PNR and RJR EPP Working Information/Precision Performance Done.docx`

Do not edit the source DOCX.

## Guardrails

Do not edit production app source files.

Do not implement test capture, scoring, recommendations, uploads, charts, voice-to-text, or OCR/photo recognition.

Do not change database schema, migrations, RLS, auth, billing, Stripe, checkout, products, deployment, or live data.

Do not print or store secrets.

Do not invent formulas, domain comments, or recommendation logic. Record missing items as questions.

Do not delete files or normalize unrelated dirty worktree changes.

## Suggested Execution

1. Read the sprint files and current planning docs.
2. Record current branch/revision and dirty worktree status.
3. Extract the Done DOCX text.
4. Preserve the DOCX in references if possible.
5. Create `planning/DEFINITION_OF_DONE.md`.
6. Update `planning/SPRINT_SCHEDULE.md` for Sprints 011-016.
7. Update decisions, domain, risks, and questions.
8. Add planning-level architecture/API placeholders if useful.
9. Confirm existing Sprint 010 live blockers remain visible.
10. Refresh `planning/ARCHITECT_BRIEFING.md` and close status.

## Closeout Standard

At close, the next Architect should be able to read `planning/ARCHITECT_BRIEFING.md` and know:

- what the canonical Done target is
- where it is recorded
- what changed from the older MVP Done
- what is still missing before implementation
- which sprint should come next
- what Builder did and did not change
