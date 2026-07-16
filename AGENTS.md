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

---

## Workflow Profiles

Use `docs/WORKFLOW_PROFILE.md` to choose the right rigor level.

- `fast`: single-agent, low-risk, local/internal utility.
- `standard`: normal Architect/Builder handoff.
- `strict`: regulated, multi-user, sensitive data, auth, payments, or high-blast-radius work.

---

## Builder Authorization Rule

This is the only implementation approval gate.

Once an Architect Pack is created at the user's request, the Architect must apply the pack and authorize implementation for that sprint in `planning/STATE.md` before handing off. Do not leave an approved pack stopped at `apply-pack` or waiting for a second implementation approval unless the user explicitly says the pack is draft/planning-only.

If `planning/STATE.md` says `Implementation authorized: yes`, Builder may edit files inside the approved sprint scope without another approval.

Builder must stop and ask before implementation if any of these are true:

- the work changes scope
- the work touches secrets or credentials outside the sprint's explicit safe-handling instructions
- the work deletes files or data outside the sprint's explicit approved deletion/untracking rules
- the work changes authentication, authorization, billing, or the data model outside the approved sprint scope
- the work modifies more than the approved file set
- the sprint does not clearly say `Implementation authorized: yes`

Authorization to implement a sprint does not authorize push, PR, deployment, remote migration, production data mutation, secret exposure, billing changes, or public reopening unless the sprint explicitly says so.

If approval is ambiguous, ask. If an Architect Pack was created at the user's request and is not marked draft/planning-only, default to applying the pack and setting `Implementation authorized: yes` for that sprint.

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
9. `planning/ARCHITECT_BRIEFING.md`, if present
10. Active sprint file(s) under `planning/sprints/`
11. Relevant docs under `docs/`
12. Relevant source notes under `references/`

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
