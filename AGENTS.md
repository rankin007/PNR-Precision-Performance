# AGENTS.md

## Project

**Name:** Precision Performance
**Client:** Aprec8 Pty Ltd
**Mode:** Existing Project / Feature or Fix
**Planning folder:** `precision-performance/`
**Existing project notes:** `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

---

## Canonical Workspace Guard

The permanent canonical repository is exactly:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

At the start of every Architect and Builder session, resolve both the current working directory and `git rev-parse --show-toplevel`. Both must equal the canonical path above. If either differs, stop before editing, staging, committing, pushing, copying, moving, deleting, applying a Pack, or changing external state.

`C:\Users\rrank\OneDrive\PNR Precision Performance` and every `C:\tmp` checkout or worktree are legacy/read-only. They may be inspected through sanitized Git metadata only when an approved sprint names the exact target and action. Do not use them as implementation workspaces, synchronize them with the canonical clone, or copy uncertain content between repositories.

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

## Evidence-Proportional Execution Standard

This is a hard project rule for Architect and Builder across every workflow profile, including `strict`.

- Stop only for a material boundary: wrong or ambiguous target, real or unexpected protected data, secret exposure, destructive uncertainty, unauthorized scope expansion, migration/application failure or partial state, failed integrity/security behavior, production impact, or cleanup that cannot be proven safe.
- A supporting tool failure is not, by itself, a sprint blocker when the required fact can be established by equivalent or stronger safe evidence.
- Prefer executable end-to-end behavior over repetitive metadata or tooling proof when the executable result covers the same acceptance boundary.
- Accept a documented substitute proof when it is at least as strong, remains within sprint scope, does not weaken a security/privacy/data boundary, and records what original check was unavailable and why the substitute is sufficient.
- Continue within the current sprint for tooling substitutions, deterministic validator corrections, formatting/encoding issues, credential refreshes, test-harness defects, and other non-product corrections already inside the approved outcome.
- Do not create a new sprint solely because Docker, a browser driver, clipboard automation, schema dump, visual renderer, optional CLI path, or another supporting tool is unavailable.
- Create a corrective follow-up sprint only for a material source/schema/contract change outside current scope, a genuinely different outcome, or an external action that lacks authority.
- Do not repeat a failed action blindly. Diagnose once, select the safest effective alternate path, and continue when its evidence is sufficient.
- Manual intervention is the last safe option, not the default response to inconvenience. Use it only when the agent cannot perform the required action safely and no approved equivalent proof or alternate mechanism is available.
- Keep evidence and closeout proportional. Record decisions, mutations, material risks, failures, substitute proof and final outcomes; do not reproduce the full project history at every gate.
- Strict means stronger boundaries and proof, not maximum ceremony. It must not convert redundant checks or environment limitations into artificial delivery blockers.

## Manual Intervention Rule

When something required for the sprint does not work, Builder must first apply the Evidence-Proportional Execution Standard: determine whether an approved equivalent or stronger proof, safe alternate tool, or in-scope correction can complete the boundary without user action. If so, continue and record the substitution.

Only when the requirement remains materially blocked or genuinely needs user/manual input must Builder flag it clearly instead of leaving it implicit.

For each manual intervention, Builder must record:

- what is blocked or not working
- the evidence already checked
- the exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

This rule must be included in every Builder sprint or Architect Pack when manual intervention may be required.
