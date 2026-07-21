# Sprint 002B — Delivery System And Project-State Consolidation

## Completion Annotation — 2026-07-22

Outcome: `delivery-consolidation-complete`. All eight canonical commands, dependency-free orchestration, credential-free CI, concise current planning records, exact history archives, evidence index, encoding integrity, complete local/CI validation, and two required local commits completed. Commit 1 is `c961d4be10006d3a95eb90be880be5c0f98caf38`, directly parented to the opening HEAD. No remote, protected, product-behavior, migration, deployment, billing, provider, authenticated-proof, or production action occurred.

## Role And Method

Builder executes this sprint under the `standard` workflow profile. Strict boundaries continue to apply to secrets, protected evidence, auth/RLS, migrations, billing, destructive actions, remote systems, external publication, and production.

This is one delivery outcome, not a chain of diagnostic subtasks. Ordinary mechanical, formatting, deterministic-tooling, and documentation-consistency problems discovered within scope must be resolved inside 002B.

Architect created this Pack only. Builder applies it, verifies this single `SPRINT.md`, and builds from it.

## Starting Point

Sprint 017F is closed `local-baseline-complete`.

- Branch: `develop`
- Opening HEAD: `1d507193a048b0d5dbb3b90e4dcec3247b71679d`
- Local relation: five commits ahead and zero behind the locally recorded `origin/develop`
- Index: empty
- Non-ignored working tree: clean
- Protected/local-only paths remain ignored
- Full credential-free validation passed before the 017F baseline commit

The current delivery system still has gaps:

- `package.json` exposes only `dev`, `build`, `start`, `lint`, and `db:bundle`;
- `.github/workflows/ci.yml` runs only `npm ci` and `npm run build`;
- the full credential-free suite exists as scattered commands rather than one maintained entry point;
- the role self-test emits a `MODULE_TYPELESS_PACKAGE_JSON` warning under direct Node execution;
- planning state, briefing, schedule, risks, and questions retain substantial historical narrative and superseded recommendations;
- there is no concise evidence index connecting current authority to historical reviews;
- encoding/mojibake must be scanned deterministically and repaired only where source intent is unambiguous.

Supabase Sprint 021M remains provider-blocked. Do not rerun hosted Auth/JWT reproduction before a substantive provider response or remediation.

## Goal

Create one reliable delivery system that developers and CI can run with a small set of canonical commands, then consolidate the project’s current planning state so the next Builder can begin Sprint 022 without reading duplicated history or guessing which evidence is authoritative.

## Required Reading

Builder must read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/STATE.md`
5. `planning/STATUS.json`
6. `planning/ARCHITECT_BRIEFING.md`
7. `planning/SPRINT_SCHEDULE.md`
8. `planning/DECISIONS.md`
9. `planning/RISKS.md`
10. `planning/QUESTIONS.md`
11. `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
12. `planning/reviews/017F-local-baseline-completion-review.md`
13. `docs/VALIDATION.md`
14. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
15. `docs/SPRINT_021_PROGRESS.md`
16. `.github/workflows/ci.yml`
17. `package.json`
18. `scripts/README.md`
19. `scripts/validate-json-files.mjs`
20. `scripts/test-validate-json-files.mjs`
21. this applied `SPRINT.md`

## Deliverable 1 — Canonical Validation Commands

Add clear package commands with stable names. Exact internal composition may be adjusted for cross-platform correctness, but the final interface must provide:

- `npm run typecheck`
- `npm run validate:json`
- `npm run test:domain`
- `npm run test:roles`
- `npm run test:supabase-self`
- `npm run validate:static`
- `npm run validate:ci`
- `npm run validate:local`

Required meaning:

### `typecheck`

Run TypeScript with project-local dependencies, no emit, and no incremental state.

### `validate:json`

Run the JSON validator self-test and parse the maintained project JSON set, including `package.json`, `package-lock.json`, `planning/STATUS.json`, and current manifest/config JSON files intended for validation. It must not traverse ignored/protected paths.

### `test:domain`

Run the biochemistry scoring and recommendation fixture validators with project-local Node’s supported TypeScript stripping path.

### `test:roles`

Run the focused Sprint 021 role/comment tests. Suppress only the known `MODULE_TYPELESS_PACKAGE_JSON` warning at the command boundary if supported by the pinned Node runtime. Do not set package-wide `"type": "module"` merely to remove the warning, because CommonJS configuration compatibility must remain unchanged.

### `test:supabase-self`

Run exactly the credential-free `test-supabase-*.mjs` self-tests that neither contact a remote service nor require protected input. Never run the `supabase-*.mjs` execution harnesses.

### `validate:static`

Run the local PowerShell static validators for:

- Sprint 019 design system;
- Sprint 020 biochemistry remote readiness;
- Sprint 020C database audit;
- Sprint 020E structural audit;
- Sprint 020F replacement audit;
- Sprint 020G clean rebuild; and
- Sprint 021 role matrix.

The command must work on Windows PowerShell locally and through `pwsh` on GitHub’s Ubuntu runner. Use a small dependency-free Node orchestrator when needed to choose the available PowerShell executable safely.

### `validate:ci`

Run the deterministic credential-free CI sequence:

1. JSON validation;
2. domain fixtures;
3. role tests;
4. Supabase self-tests;
5. static validators;
6. ESLint;
7. TypeScript;
8. production build.

It must fail on the first failed gate with a concise command/category result and must never contact a remote application service.

### `validate:local`

Run the same substantive suite as CI, with local diagnostics and the established bounded build rule:

- first build attempt is authoritative;
- if it exits during page generation without a source/type/lint error, record the safe failure phase, prove no source change, and run one unchanged retry;
- never loop retries;
- persistent failure remains a failure.

Do not add external validation dependencies when the existing Node/PowerShell runtime is sufficient.

## Deliverable 2 — Validation Orchestration

Builder may create narrowly scoped dependency-free scripts under `scripts/`, such as:

- `scripts/run-validation-suite.mjs`
- `scripts/test-run-validation-suite.mjs`

The final implementation must:

- use explicit allowlisted commands;
- distinguish CI and local modes;
- detect `powershell` on Windows and `pwsh` elsewhere without invoking an arbitrary shell string;
- use argument arrays rather than concatenated user-controlled command strings;
- forward useful stdout/stderr without printing protected values;
- return the failed gate and non-zero exit code;
- avoid executing any remote/protected harness;
- avoid modifying application state;
- avoid leaving child processes after completion;
- have focused self-tests for command selection, failure propagation, remote-harness exclusion, and build retry classification.

Update `scripts/README.md` and `docs/VALIDATION.md` so the canonical commands appear first. Preserve historical validation records, but move them below a clearly labelled historical section or reference them through the evidence index.

## Deliverable 3 — Credential-Free CI

Update `.github/workflows/ci.yml` to:

- retain push and pull-request triggers unless a change is needed for correctness;
- use Node `22.14.0` rather than an unpinned major-only version;
- run `npm ci`;
- run the canonical `npm run validate:ci` command;
- set a reasonable job timeout;
- use least privilege with read-only repository contents;
- avoid secrets, protected environment variables, Supabase login/linking, remote database access, Stripe, Vercel, deployment, browser login, or external publication;
- use dependency caching only through the existing supported setup-node/npm mechanism;
- avoid automatic formatting or commits;
- remain deterministic on a fresh checkout.

CI configuration may be syntax-checked locally. Do not push or trigger GitHub Actions in this sprint.

## Deliverable 4 — Concise Current-State Records

Replace duplicated current-state history with concise operational records while preserving historical evidence.

### `planning/STATE.md`

Reduce it to the present operational truth:

- current completed sprint: 002B at closeout;
- repository baseline and local validation state;
- current Supabase provider blocker;
- current product readiness distinction;
- active workflow profile;
- strict boundaries;
- immediate next product sprint: 022;
- manual interventions currently required.

Target: no more than 220 lines unless a table requires slightly more.

### `planning/ARCHITECT_BRIEFING.md`

Make it a concise handoff containing:

- where the project stands;
- what 002B delivered;
- architecture/file map;
- current validated capabilities;
- current blockers and non-blocking risks;
- next Architect action for Sprint 022;
- provider-response branch for Sprint 021N.

Target: no more than 180 lines.

### `planning/SPRINT_SCHEDULE.md`

Retain the canonical roadmap and completed-sprint outcomes, but remove stale “active” and “recommended next” statements. It must identify 017F and 002B accurately and point to Sprint 022 as the next product sprint while 021N waits on Supabase.

### `planning/QUESTIONS.md`

Separate questions into:

- active decision required;
- provider/external blocker;
- future roadmap input;
- historical/superseded.

Move historical/superseded rows into a preserved archive instead of leaving them mixed with live decisions.

### `planning/RISKS.md`

Separate active risks from closed/historical risks. Keep current provider, product-content, commerce, privacy/upload, voice, and remote-backup risks visible. Archive superseded implementation-era risks.

### `planning/DECISIONS.md`

Preserve durable decisions. Add the canonical proportionate-governance and validation-command decisions if not already explicit. Do not rewrite historical decisions or silently change their meaning.

## Deliverable 5 — Preserved Planning History And Evidence Index

Create:

- `planning/history/STATE-THROUGH-017F.md`
- `planning/history/ARCHITECT_BRIEFING-THROUGH-017F.md`
- `planning/history/QUESTIONS-THROUGH-017F.md`
- `planning/history/RISKS-THROUGH-017F.md`
- `planning/EVIDENCE_INDEX.md`

History requirements:

- archive the exact pre-consolidation text before replacing current records;
- add a short header stating archive date, source path, and supersession status;
- do not delete historical facts;
- do not copy protected 021M correlation content;
- do not treat an archived statement as current authority.

Evidence index requirements:

- identify current authority files;
- map completed product/delivery areas to their canonical review/doc evidence;
- distinguish current evidence, historical evidence, protected local-only evidence, and provider-pending evidence;
- link Sprint 017F baseline commits;
- link Supabase structural readiness and provider escalation without exposing correlations;
- link design/messaging, biochemistry model/scoring/recommendations, capture UI, deployment/public gate, commerce, and roadmap evidence;
- identify which evidence is local/static versus hosted/authenticated/production;
- remain concise and navigational rather than duplicating reports.

## Deliverable 6 — Encoding And Documentation Integrity

Run a deterministic UTF-8/mojibake scan over maintained project Markdown, JSON, TypeScript, JavaScript, SQL, PowerShell, YAML, and configuration text, excluding ignored/generated/protected paths.

Builder may repair encoding only when:

- intended Unicode is unambiguous from canonical context;
- the correction changes presentation only, not meaning;
- path and replacement category are recorded;
- Pack delimiters, JSON syntax, SQL, code, and checklist state remain intact.

If terminal rendering alone is corrupt but file bytes are correct UTF-8, record that finding and do not rewrite the file.

Do not mass-normalize line endings. `git diff --check` must pass.

## Bounded In-Sprint Remediation

To keep this as one useful sprint, Builder may fix ordinary local problems discovered by the new suite when corrections:

- are reproducible;
- remain non-behavioural;
- affect validation orchestration, CI syntax, package scripts, documentation consistency, encoding, formatting, lint, imports, or TypeScript annotations;
- do not cross a strict boundary;
- introduce no new dependency;
- affect no more than 40 additional maintained text files beyond the expected scope;
- are individually recorded with reason and validation.

Do not create 002C for an allowed mechanical issue. Fix it within 002B and rerun from the earliest affected gate.

Stop only if correction would change product behaviour, domain meaning, schema/migrations, auth/RLS, permissions, secrets, billing, remote/production state, delete user data, require a new dependency/major upgrade, or exceed the remediation allowance.

## Approved File Scope

Builder may create or edit:

- `package.json`
- `package-lock.json`, only if `npm` updates it as a direct consequence of package-script metadata with no dependency/version change; otherwise it must remain unchanged
- `.github/workflows/ci.yml`
- `scripts/README.md`
- `scripts/validate-json-files.mjs`
- `scripts/test-validate-json-files.mjs`
- new dependency-free validation orchestrator/self-test scripts under `scripts/`
- `docs/VALIDATION.md`
- `docs/WORKFLOW_PROFILE.md`, only if clarification is needed
- `AGENTS.md`, only if clarification is needed
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/QUESTIONS.md`
- `planning/RISKS.md`
- `planning/DECISIONS.md`
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`, only for current sequencing consistency
- `planning/EVIDENCE_INDEX.md`
- `planning/history/**`, only the five required archive files
- `planning/reviews/002B-delivery-system-and-project-state-consolidation.md`
- this applied `SPRINT.md` for completion annotation
- up to 40 additional maintained text files under the bounded remediation rule

Do not edit application code, domain logic, migrations, RLS/policies, hosted configuration, commerce, public content, or historical evidence except unambiguous encoding-only repair within the bounded allowance.

## Strict Boundaries

Do not:

- open, print, hash, copy, scan, stage, or commit protected/local-only contents;
- contact Supabase, Vercel, Stripe, GitHub APIs, DNS, email, or other remote systems;
- run protected or remote execution harnesses;
- run migrations or mutate databases;
- change auth/RLS, permissions, product behaviour, domain formulas, thresholds, recommendations, pricing, or hosted configuration;
- deploy, publish, push, fetch, pull, create a PR, merge, tag, or release;
- delete historical evidence;
- add dependencies or upgrade packages;
- weaken existing safety validators to make tests pass;
- create another child sprint for an allowed local mechanical issue.

Ignored/local-only exclusions remain:

- `.env*` except tracked placeholder-only `.env.example`;
- `.release-main/**`;
- `.claude/**`;
- `planning/reviews/021M-supabase-support-escalation.md`;
- `.next/**`, `build/**`, `node_modules/**`;
- logs, caches, IDE state, Supabase temporary-link data, credentials, tokens, cookies, sessions, and protected browser/process material.

## Validation

Before Commit 1, Builder must pass:

1. Current 002B Pack check.
2. New validation-orchestrator self-tests.
3. JSON validator self-tests.
4. `npm run validate:json`.
5. `npm run test:domain`.
6. `npm run test:roles`.
7. `npm run test:supabase-self`.
8. `npm run validate:static`.
9. `npm run lint`.
10. `npm run typecheck`.
11. `npm run build` under the bounded local retry rule.
12. `npm run validate:local` as the complete canonical local entry point.
13. A CI-equivalent local invocation of `npm run validate:ci` without secrets or remote access.
14. CI YAML syntax/structure inspection.
15. Planning archive source-equality verification.
16. Current-state line-limit and required-section checks.
17. Evidence-index link/path existence checks.
18. Encoding/mojibake scan.
19. All maintained Architect Pack format checks.
20. All maintained JSON parsing.
21. High-confidence secret scan over the intended commit without outputting values.
22. Binary/mode review.
23. `git diff --cached --check`.
24. Production build route inventory comparison against the 017F baseline; explain any difference.

`validate:ci` and `validate:local` may repeat component commands by design. Record total duration and any meaningful performance concern, but do not weaken coverage merely to shorten the sprint.

## Commit And Closeout

Create two local commits after all gates pass.

### Commit 1

Subject:

`chore: consolidate validation and project state`

Contains implementation, CI, documentation, history archives, evidence index, applied 002B sprint file, Pack, pre-closeout review, and all validated in-scope repairs.

Parent must be opening HEAD `1d507193a048b0d5dbb3b90e4dcec3247b71679d` unless the opening-state check discovers an unexpected change, in which case stop and reconcile rather than rewriting history.

### Commit 2

Subject:

`docs: close sprint 002B delivery consolidation`

Contains only:

- `planning/reviews/002B-delivery-system-and-project-state-consolidation.md`
- completion annotation in this applied `SPRINT.md`
- final `planning/STATE.md`
- final `planning/STATUS.json`
- final `planning/ARCHITECT_BRIEFING.md`
- final `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` only if final closeout requires them

Record Commit 1 hash and validation in the review before Commit 2. Do not amend Commit 1.

After Commit 2:

- branch remains `develop`;
- index is empty;
- non-ignored working tree is clean;
- ignored/protected paths remain preserved;
- no remote action occurred.

## Required Review

Create `planning/reviews/002B-delivery-system-and-project-state-consolidation.md` containing:

- outcome;
- opening and closing repository state;
- canonical command table and purpose;
- CI changes and local CI-equivalent evidence;
- validation-orchestrator safety design;
- Node warning treatment;
- planning files archived and current replacements;
- evidence-index coverage;
- encoding scan and repairs, if any;
- bounded remediation used, if any;
- complete validation results and durations;
- Commit 1 hash/parent/subject/statistics;
- Commit 2 subject and closeout set;
- residual risks and blockers;
- confirmation of no remote, protected, product-behaviour, migration, deployment, billing, or production action;
- next recommendation: Sprint 022 Mobile Biochemistry Workflow Completion.

## Acceptance

002B is complete when:

- all eight canonical package commands exist and behave as defined;
- validation orchestration is dependency-free, allowlisted, cross-platform, tested, and remote-safe;
- CI uses Node 22.14.0 and the canonical credential-free command with read-only permissions and timeout;
- the package-wide module type is not changed merely to hide a warning;
- current state and briefing are concise and current;
- historical state/questions/risks/briefing are preserved under `planning/history/`;
- active questions and risks are clearly separated from history;
- evidence index links current and historical authority without exposing protected correlations;
- encoding scan passes or unambiguous presentation-only repairs are recorded;
- complete credential-free validation passes locally and in CI-equivalent mode;
- Pack, JSON, secret, binary/mode, diff, route-inventory, and planning-integrity checks pass;
- Commit 1 and Commit 2 exist with correct parentage and subjects;
- final index and non-ignored working tree are clean;
- no push, PR, remote access, deployment, migration, production mutation, billing, provider action, authenticated proof, public reopening, or product/domain behaviour change occurs.

## Manual Intervention And Failure Handling

Do not create 002C for ordinary allowed local remediation.

If a strict boundary or remediation limit blocks completion before Commit 1:

1. preserve all working files;
2. unstage only exact sprint paths;
3. prove the index is empty;
4. record what is blocked;
5. record evidence checked;
6. give the exact user/manual action;
7. give numbered completion steps;
8. state what Builder will verify afterward;
9. close `delivery-consolidation-blocked-clean`.

If Commit 1 succeeds but Commit 2 cannot complete, preserve Commit 1 without amend/reset/revert and close `delivery-consolidation-committed-closeout-blocked` with exact recovery steps.

## Outcomes

- `delivery-consolidation-complete`: canonical local/CI validation and concise planning state are complete; both commits exist; final working state is clean.
- `delivery-consolidation-blocked-clean`: no commit exists; files are preserved and a true strict-boundary/remediation-limit blocker is documented.
- `delivery-consolidation-committed-closeout-blocked`: Commit 1 exists but the closeout commit could not safely finish.

No outcome implies remote backup, provider resolution, authenticated readiness, deployment, or production readiness.
