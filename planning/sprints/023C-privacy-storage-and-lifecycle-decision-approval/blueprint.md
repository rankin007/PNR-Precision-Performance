# Sprint 023C - Privacy, Storage And Lifecycle Decision Approval Blueprint

## Phase 1 - Isolate And Reconcile Sources

1. Verify clean base `a7759f691f0e01482f3a396acd14b2a23dbca5ec` and its 029M ancestry.
2. Create the isolated Sprint 023C branch/worktree.
3. Record read-only source status and fingerprints for the original `develop`, stopped Sprint 023, and committed Sprint 023B worktrees.
4. Apply and verify all four Sprint 023C files.
5. Copy the exact verified stopped Sprint 023 generated files and review evidence into the approved paths.
6. Copy the exact Word decision record into the isolated worktree and record its source SHA-256.
7. Reconcile planning state without blanket-copying mixed dirty planning files.
8. Prove all source worktrees remain unchanged.

Deliver `planning/reviews/023C-decision-source-reconciliation.md`.

## Phase 2 - Build The Canonical Decision Matrix

1. Create `docs/SPRINT_023C_PRIVACY_STORAGE_LIFECYCLE_DECISIONS.md` in Question and Answer format.
2. For each of the twenty items, record:
   - exact question;
   - final answer;
   - status: accepted, rejected, or superseded;
   - decision owner;
   - authority source;
   - effective date;
   - rationale/explanation where useful;
   - binding design constraints; and
   - any pre-production intervention.
3. Compare the candidate answers against Sprint 013 scaffolding and the stopped Sprint 023 matrix.
4. Explicitly mark Sprint 013 values as accepted, replaced, or superseded.
5. Resolve overlap and possible conflict among ownership, confidentiality, operational retention, 30-day deletion, backup expiry, holds, and access/correction requests.
6. Resolve exact semantics for Trainer restoration, administrator/operator purge, consultant access, and Staff replacement of pending uploads.
7. Record controlled-CSV source/template registration as a required Sprint 023D input, not an invented format.
8. Record malware-scanner/provider selection as a Sprint 023D design decision constrained by the accepted policy, not as approval of a processor.

Deliver `planning/reviews/023C-final-decision-contract.md`.

## Phase 3 - Complete Authority

Request only the missing authority details:

1. full decision-owner name;
2. role and privacy/data decision authority;
3. explicit approval of the consolidated contract;
4. effective date;
5. monitored incident email; and
6. historical `Accept` annotation mapping or explicit statement that the final consolidated contract supersedes those annotations.

If supplied, record them identically in Markdown, Word, decision log, state, and closeout. If not supplied, stop before claiming the contract is complete.

## Phase 4 - Synchronise And Validate Documents

1. Update the Word record only from the canonical approved Markdown contract.
2. Verify all twenty question numbers, headings, answers, statuses, tables, explanations, and approval fields agree.
3. Run DOCX accessibility and heading audits.
4. Render and inspect every page when the document runtime supports it; otherwise record the exact LibreOffice absence.
5. Check the Markdown and Word files for placeholders, contradictions, internal citations, secrets, private payloads, and unintended personal data.
6. Record final hashes and validation results.

Deliver `planning/reviews/023C-document-validation.md`.

## Phase 5 - Closeout

Update planning records from evidence only. Preserve the roadmap sequence:

- 023C: decision approval;
- 023D: architecture/design;
- 023E: local implementation; and
- 023F: later bounded remote proof.

Do not begin 023D within this sprint.

Deliver `planning/reviews/023C-closeout.md`.

Without a separate commit instruction, leave the validated isolated decision worktree uncommitted and report the exact next action.
