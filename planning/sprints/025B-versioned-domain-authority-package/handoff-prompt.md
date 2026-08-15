# Sprint 025B Builder Handoff — Versioned Domain Authority Package

## Task contract

**objective:** Produce one versioned, reviewable biochemistry domain authority package with named product/domain and veterinary decisions, or a complete owner-input checkpoint that makes every missing decision explicit.

**owns:** The 025B authority package, its review record, generated sprint files and approved planning/docs closeout files only.

**must_not:** Do not edit Product/runtime/source/test/schema/fixture/package files; invent domain or veterinary rules; expose confidential or identifiable data; create credentials; access or mutate Production/external systems; deploy; move aliases; send email/enquiries; stage; commit; push; merge; or open a PR.

**acceptance:** Every required authority row is either accepted with named reviewer/date/source/version or marked `OWNER INPUT REQUIRED`; the Product remains unchanged and fail closed; the exact outcome and 025C dependency are recorded truthfully.

**verification:**

1. Verify canonical CWD and Git root, branch/HEAD, index and dirty manifest.
2. Review changed paths against the approved file set.
3. Run `node scripts/test-biochemistry-authority-025.mjs` without modifying it.
4. Run `npm run validate:json` and `npm run validate:static` when applicable.
5. Run `git diff --check`.
6. Scan changed files for credentials and identifiable horse/person data.
7. Confirm staged count is zero and no external action occurred.

## Required order

1. Apply this Pack only after a dry-run and reread all four generated sprint files plus the Sprint 025 authority record and closeout.
2. Record canonical/worktree truth and preserve every pre-existing change.
3. Inventory candidate sources without treating them as approval.
4. Build the exact package structure in the blueprint.
5. Reconcile named product/domain and veterinary decisions.
6. If any required decision is absent or conflicting, complete the owner-input checkpoint and stop cleanly.
7. If every decision is complete, record the accepted package without changing Product.
8. Validate, reconcile durable records and report the exact outcome.

## Evidence-Proportional Execution Standard

Use equivalent or stronger safe proof when a supporting tool is unavailable. A renderer or optional checker failure is not itself a blocker when the package content and boundary can be established safely. Stop only for a material target, confidentiality, authority, integrity, destructive, scope or external-state issue.

## Manual intervention

Manual intervention is required only for decisions that cannot be supplied by repository evidence and genuinely need named human authority. When reached, give the user the eight numbered steps in `requirements.md`, state what Builder already checked, and state that Builder will verify package identity, completeness, reviewer scope, conflicts and 025C readiness after the completed package is returned.

## Final report

Report:

- exact package ID/version/status;
- named reviewers recorded, or the exact reviewer roles still required;
- accepted authority sections;
- every `OWNER INPUT REQUIRED` section;
- source documents/versions reviewed;
- changed-file manifest;
- validation results;
- external effects (`0` expected);
- staged count (`0` expected);
- exact outcome; and
- whether Sprint 025C is unblocked.

End by stating exactly what you require from the user. If nothing is required, write: `I need nothing from you.`
