# AGENTS.md

## Project

**Name:** Precision Performance
**Client:** Aprec8 Pty Ltd
**Mode:** Existing Project / Feature or Fix
**Planning folder:** `precision-performance/`
**Existing project notes:** `C:\Users\rrank\OneDrive\PNR Precision Performance`

---

## Operating Model

This project uses the 120x Architect / Builder method.

The durable handoff lives in the project folder. Conversation is for thinking together; files are the lasting source of truth.

The Architect defines the focused feature-or-fix plan, acceptance criteria, risks, decisions, and Builder handoff.

The Builder executes from approved sprint artifacts and must not redefine scope or invent product behavior.

Production code lives in the existing project around this planning layer. The Builder edits the real project files in place only when implementation is authorized.

---

## Canonical Files

- Agent rules: `AGENTS.md`
- Current status: `planning/STATE.md`
- Workflow rigor: `docs/WORKFLOW_PROFILE.md`
- Architect Pack commands: `planning/architect-packs/README.md`
- Sprint work: `planning/sprints/`
- Sprint-close briefing: `planning/ARCHITECT_BRIEFING.md`
- Design and messaging authority: `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`

---

## Sprint Numbering Rule

This is a hard project rule.

- A planned core sprint uses its numeric identifier, for example `019` or `020`.
- Any later corrective, completion, verification, or follow-up sprint belonging to that core sprint keeps the same number and adds a letter suffix.
- New follow-up suffixes start at `B`, then continue `C`, `D`, and so on. Example: `019B`, `019C`.
- Do not reopen the closed core sprint, consume the next numeric roadmap sprint, or renumber later core sprints for follow-up work.
- Use the suffix consistently in the sprint title, folder, Architect Pack filename, state, status, schedule, briefing, documentation, and handoff references. Example folder: `planning/sprints/019B-mobile-heading-correction/`.
- Historical sprint identifiers, including earlier `A` suffixed sprints, remain unchanged. Do not create new `A` follow-ups.

---

## Workflow Profiles

Use `docs/WORKFLOW_PROFILE.md` to choose the right rigor level.

- `fast`: single-agent, low-risk, local/internal utility.
- `standard`: normal Architect/Builder handoff.
- `strict`: regulated, multi-user, sensitive data, auth, payments, or high-blast-radius work.

---

## Architect Pack Handoff Rule

This is a hard project rule.

- Architect creates the Architect Pack only. Architect defines scope, acceptance criteria, risks, boundaries, and the Builder handoff, then stops.
- Builder applies the Architect Pack, verifies the generated sprint files, and builds from those sprint files.
- Do not add an implementation-authorization heading, field, flag, status, checklist item, approval gate, or equivalent wording to packs, sprint files, state, status, briefings, schedules, prompts, or reports.
- Delivery of the created Architect Pack is the Architect-to-Builder handoff. Builder controls pack application and execution. Architect must not apply the pack.
- Builder remains bound by the sprint scope and approved file set, and must stop for scope expansion, secrets exposure, destructive actions, or external/production actions not expressly included in the sprint.
- Draft or planning-only packs must be labelled clearly and must not be applied until the user asks for application.

---

## First Files To Read

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/DECISIONS.md`
5. `planning/DOMAIN.md`
6. `planning/RISKS.md`
7. `planning/QUESTIONS.md`
8. `docs/WORKFLOW_PROFILE.md`
9. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, if present
10. `planning/ARCHITECT_BRIEFING.md`, if present
11. Active sprint file(s) under `planning/sprints/`
12. Relevant docs under `docs/`
13. Relevant source notes under `references/`

---

## Builder Rules

- Do not start by editing source files.
- Read the active sprint scope and approved file set before implementation.
- For small sprints, prefer `SPRINT.md` as the single sprint source.
- For larger or strict sprints, use `requirements.md`, `blueprint.md`, `acceptance.md`, and `handoff-prompt.md`.
- Preserve existing behavior unless the sprint acceptance criteria require a change.
- Keep the fix narrow and avoid broad rewrites unless explicitly approved.
- Do not store secrets, API keys, passwords, tokens, or private credentials.
- Update planning/docs/tests when the sprint requires it.
- At sprint close, refresh `planning/ARCHITECT_BRIEFING.md` using `docs/ARCHITECT_BRIEFING_SPEC.md`.
- Do not commit unless asked.

## Manual Intervention Rule

Whenever something required for the sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly instead of leaving it implicit.

For each manual intervention, Builder must record:

- what is blocked or not working
- the evidence already checked
- the exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

This rule must be included in every Builder sprint or Architect Pack when manual intervention may be required.
