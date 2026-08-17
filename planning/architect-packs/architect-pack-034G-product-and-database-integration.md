# Architect Pack - Sprint 034G Product and Database Integration

============================================================
FILE: planning/sprints/034G-product-and-database-integration/requirements.md
============================================================

# Sprint 034G Requirements - Product and Database Integration

## Objective

Integrate the applicable Product/runtime and database continuity source onto the exact merged-main base as one coherent, locally verified security boundary, without applying migrations remotely, accessing providers, deploying, publishing or claiming Product Done.

## Context

- Canonical repository: `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.
- Exact base: merged `main` commit `fcbe38d94f1701c96095edd65bd3a636a476d4c1`.
- Branch: `codex/034G-product-and-database-integration`.
- Immutable continuity source: `3dce7add2909fe4f6c0fbf6244c49611e3f6347b`.
- Flight class: `critical` because the slice crosses authentication, role authorization, RLS, migrations, private horse/biochemistry data, public enquiries and commerce boundaries.
- Product Done remains false before and after this sprint.

## Required outcome

1. Materialise the exact continuity-tree delta for `app/`, `components/`, `lib/`, `public/` and `supabase/`, including its SQL tests and verification queries, from the immutable source commit with path and content verification.
2. Bring forward the directly coupled root/runtime files `.env.example`, `eslint.config.mjs`, `middleware.ts`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `vercel.json`, `package.json` and `package-lock.json`, plus `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`.
3. Preserve the continuity dependency versions and lock graph, but adapt `package.json` scripts to the current integration branch: retain only coherent application commands plus `typecheck` and one new `test:product-database-034G`; do not import scripts whose implementation is deferred to 034H.
4. Preserve migration order and replace conflicting old-main migration names/content exactly as the continuity tree requires. Do not renumber, squash, edit or remotely apply migrations.
5. Add `planning/reviews/034G-product-and-database-source-manifest.json` recording every immutable source add/modify/delete and every bounded local transformation, and add one dependency-light `scripts/test-product-database-integration-034G.mjs` that validates the manifest, scope, migration ledger, package graph, critical fail-closed contracts and exclusions.
6. Run real type, lint, build and focused contract checks; attempt safe local database execution when available. If the local database runtime is unavailable, use equivalent or stronger static/transactional SQL evidence and record why it proves the same boundary without making Docker itself an acceptance condition.
7. Perform operator-visible review of the public, sign-in, portal, operations and administrator surfaces without external writes.
8. Record exact mutations, checks, negative cases, substitutions, residual risks and closeout state. Mark only 034G done after fresh independent critical inspection passes.

## Approved file set

Builder may change only:

- exact source-tree changes between the base and continuity commits under `app/`, `components/`, `lib/`, `public/` and `supabase/`;
- `.env.example`, `eslint.config.mjs`, `middleware.ts`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `vercel.json`, `package.json` and `package-lock.json`;
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`;
- `scripts/test-product-database-integration-034G.mjs`;
- this Pack, its four applied sprint files, the 034G source manifest and independent review;
- current records `planning/STATE.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/ROADMAP.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md` and `delivery_road_map.md` at closeout.

## Out of scope

- Historical planning, reviews, evidence, references and test/operator scripts from the continuity branch beyond the exact files listed above.
- `.gitignore`, `.vercelignore`, `.env.vercel.production`, `README.md`, `AGENTS.md`, method files and the root Architect starter.
- Reading or exposing any live environment value, credential, token, provider secret or protected data.
- Remote migration application, schema mutation, Supabase/provider access, production data, trainer actions, Stripe operations, email delivery, Vercel deployment, aliases or publication.
- Commit, push, pull request, merge, rebase, cherry-pick or remote-ref change.
- Reading, hashing, parsing, staging, ignoring, moving, deleting or otherwise touching `delivery_road_map.docx`.
- Inspecting or changing unrelated untracked `.claude`, `.codex_work`, `supabase/.branches` or `supabase/.temp` content.
- Broad executable-proof and operator-tool integration, which remains 034H; durable historical planning/evidence reconciliation, which remains 034I.

## Evidence-Proportional execution

- Stop only for a material target, authority, secret/privacy, migration/application, destructive, integrity/security, Production, scope or unprovable-cleanup risk.
- Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable, and record the unavailable check and why the substitute proves the same acceptance fact.
- Keep deterministic manifest, materialiser, validator, package, formatting, encoding, reporter and focused-harness corrections inside this sprint when the approved Product/database outcome is unchanged.
- Do not create a follow-up solely because Docker, a browser driver, schema dump, renderer, clipboard control, optional CLI path or redundant verification is unavailable.
- Use manual intervention only after safe in-scope alternatives are exhausted. If it becomes necessary, record what is blocked, evidence checked, exact operator steps and what Builder will verify afterward.

============================================================
FILE: planning/sprints/034G-product-and-database-integration/blueprint.md
============================================================

# Sprint 034G Blueprint - Product and Database Integration

## Implementation design

### 1. Establish immutable source and safety invariants

- Recheck canonical cwd/Git root, branch, base and excluded untracked state before each mutation phase.
- Enumerate the base-to-continuity delta only for the approved source roots and named files. Reject absolute paths, traversal, case-collisions, unapproved destinations and any attempt to read protected environment material.
- Record source commit, Git object identity and SHA-256 for materialised blobs; record exact deleted paths without reading excluded live environment content.
- The governing invariant is: Product code, schema and migrations form one internally coherent fail-closed continuity snapshot, while no remote/provider/Production state changes.

### 2. Materialise Product and database atomically

- Apply immutable continuity additions, modifications, renames and deletions under the five approved source roots.
- Include SQL tests and verification queries under `supabase/` because they directly support migration/RLS proof; do not import the broader historical JavaScript/PowerShell test corpus.
- Materialise the coupled root/runtime files and accepted design/messaging authority.
- Do not cherry-pick, merge or replay the continuity branch wholesale.

### 3. Reconcile dependencies without importing stale commands

- Use the continuity dependency/devDependency versions and matching lock graph, including `server-only`, current `nodemailer` typings/runtime and the local Supabase CLI dependency.
- Retain application scripts `dev`, `build`, `start`, `lint` and `db:bundle`; add `typecheck` and `test:product-database-034G` only.
- The focused verifier must establish that every package imported by Product code resolves from the manifest or Node built-ins and that package/lock root dependency metadata agrees.
- Do not create placeholder commands for deferred 034H scripts.

### 4. Prove critical boundaries

- Verify migration filenames are unique, ordered and exactly match the accepted continuity ledger from `0001` through `0025`; prove the old-main conflicting `0008`-`0016` variants are absent.
- Exercise or structurally prove negative cases for anonymous initial-admin claim, malformed/ambiguous role data, managed read-only roles, unauthorized biochemistry comment mutation, evidence upload ownership/storage boundaries, public enquiry admission/retention and internal reconciliation authentication.
- Run `typecheck`, lint and a production build with non-secret placeholder environment inputs only if required for compilation. Do not contact providers.
- Attempt local Supabase/database execution safely. If the daemon/runtime is unavailable, combine exact migration hashes, SQL parser/ledger assertions, policy/function contract assertions and existing SQL verification queries as substitute evidence; record the substitution.
- Review representative public, authentication, portal, operations and administrator routes for render success, console/server failures, navigation isolation, responsive layout and copy alignment with the design authority.

### 5. Close proportionally

- A fresh context that did not implement the slice inspects the full diff, manifest, critical negative cases, check output and UI evidence against every acceptance criterion.
- Resolve only bounded in-scope findings, rerun affected checks and repeat inspection as required.
- After PASS, update current planning/roadmap/briefing/review/status records, mark 034G done, leave 034H and 034I planned, keep Production readiness unaccepted and Product Done false.

## Flight evidence

1. **Class and reason:** `critical`; authentication, role/RLS enforcement, migrations, sensitive horse/biochemistry information, public enquiries and commerce coexist in the changed runtime.
2. **Acceptance invariant at risk:** an authenticated user can reach only the data/actions permitted by one unambiguous role matrix, and schema/runtime remain coherent without any remote mutation.
3. **Affected layers and verified paths/symbols:** Next routes and middleware; Supabase clients/session/bootstrap; `role-matrix`, managed-access adapters, evidence/enquiry/commerce contracts; migrations `0001`-`0025`; RLS policies/functions/storage; package and runtime config.
4. **Source, transformations and sink:** exact base `fcbe38d...`; immutable continuity tree `3dce7add...`; exact tree materialisation plus one bounded package-script adaptation and one current verifier/manifest; sink is the fresh 034G branch only.
5. **Discriminating examples:** anonymous or unauthenticated admin claim/reconciliation fails while the correct authenticated path is structurally permitted; managed veterinarian/stable-hand access reads allowed data while mutations fail; the accepted migration ledger passes while any old-main conflict, omission, duplicate or reordering fails.
6. **Durable verification source:** Git object/SHA manifest, focused test output, type/lint/build output, local SQL execution or documented equivalent proof, route/UI review and final diff.
7. **Known uncertainty:** Docker daemon availability may prevent local Supabase execution. It is a supporting-tool uncertainty, not permission to weaken migration/RLS proof or access a remote database.

============================================================
FILE: planning/sprints/034G-product-and-database-integration/acceptance.md
============================================================

# Sprint 034G Acceptance - Product and Database Integration

| ID | Acceptance criterion | Required evidence |
| --- | --- | --- |
| AC-01 | Cwd/Git root equal the permanent canonical path; branch is the approved 034G branch at exact merged-main base `fcbe38d...`. | Exact command output and opening ledger. |
| AC-02 | Pack dry-run reports exactly four traversal-free files under one 034G sprint folder; application creates exactly those files. | Importer output and reread. |
| AC-03 | Every approved continuity add/modify/delete is represented in the source manifest with immutable source identity; every materialised blob hash matches and no unapproved continuity path is imported. | Machine-readable manifest and focused assertions. |
| AC-04 | Product/runtime source under `app/`, `components/`, `lib/`, `public/` and database source under `supabase/` equals the accepted continuity snapshot, except only enumerated local transformations. | Exact tree comparison and transformation ledger. |
| AC-05 | Root runtime/config/design files equal continuity, while `package.json` differs only by the bounded current script set and dependency/lock metadata remains coherent. | Config hashes, semantic package comparison and lock assertions. |
| AC-06 | Migration ledger is unique, ordered and exactly continuity-aligned; conflicting old-main migrations are absent and no migration was remotely applied. | Focused ledger test, SQL proof and action ledger. |
| AC-07 | Role parsing and access fail closed for malformed, missing or ambiguous data; administrator/trainer actors and managed veterinarian/stable-hand readers match the accepted role matrix. | Positive and negative contract assertions. |
| AC-08 | Initial administrator claim, biochemistry comment mutation, horse/biochemistry access, evidence upload/storage and internal reconciliation reject anonymous or unauthorized paths. | Executable or equivalent structural negative-case evidence. |
| AC-09 | Public enquiry and commerce surfaces use only the accepted environment/authority contracts and perform no provider or Production action during verification. | Contract assertions, build evidence and action ledger. |
| AC-10 | Type checking, lint, production build and the focused 034G test pass; JSON/config parsing and `git diff --check` pass. | Actual command output and exit codes. |
| AC-11 | Database behavior is proven by safe local execution when available, or by a documented equivalent/stronger migration-hash, parser, policy/function and verification-query evidence set when unavailable. | Local test output or substitution record. |
| AC-12 | Representative public, sign-in, portal, operations and administrator routes render without material console/server failure and preserve navigation, role and responsive-layout boundaries. | Operator-visible review record and screenshots/logs as appropriate. |
| AC-13 | No live environment value is read or exposed; `.env.vercel.production`, excluded DOCX and unrelated untracked paths remain untouched and outside index/diff. | Metadata-only status/scope checks and action ledger. |
| AC-14 | No provider, remote migration, data mutation, trainer, Stripe/email, Production, deployment, alias, publication, commit, push, PR or remote-ref action occurs. | Action ledger and final Git/external-state statement. |
| AC-15 | A fresh context that did not implement the slice independently inspects the full diff and critical evidence and returns PASS, or bounded findings are fixed and re-reviewed. | Independent critical review decision. |
| AC-16 | Closeout marks only 034G done, leaves 034H-034I planned, records remaining risks/substitutions, keeps Production readiness unaccepted and Product Done false, and final reread is consistent. | State, decisions, risks, questions, roadmaps, briefing, review, status and final diff reread. |

## Verification commands

Builder must run the exact applicable equivalents of:

```powershell
$pwd.Path
git rev-parse --show-toplevel
git branch --show-current
git rev-parse HEAD
node --check scripts/test-product-database-integration-034G.mjs
node scripts/test-product-database-integration-034G.mjs
npm run typecheck
npm run lint
npm run build
npx supabase db start
npx supabase test db
git diff --check
git status --short --branch --untracked-files=all
```

The Supabase commands are preferred evidence, not tool-mandatory acceptance gates. If local execution is unavailable, apply the evidence-proportional substitute defined in the blueprint and record the exact reason and proof set. All build/test environment values must be local non-secret placeholders and must not trigger external delivery or data mutation.

============================================================
FILE: planning/sprints/034G-product-and-database-integration/handoff-prompt.md
============================================================

# Builder Handoff - Sprint 034G Product and Database Integration

**objective:** Integrate one coherent, fail-closed Product/runtime/database continuity snapshot onto exact merged `main`, with critical local proof and no external mutation.

**owns:** The immutable continuity delta under the five approved source roots; named coupled root/config/design files; bounded package-script reconciliation; one source manifest; one focused 034G verifier; and current closeout records enumerated by the sprint requirements.

**must_not:** Import unrelated continuity history or deferred test tooling; inspect live environment values, the protected environment file, excluded DOCX or unrelated untracked content; access providers or Production; apply migrations remotely; send email; transact with Stripe; deploy, publish, commit, push, open a PR, merge or change any remote ref.

**acceptance:** AC-01 through AC-16 in `acceptance.md` pass with immutable-source proof, critical negative cases, type/lint/build evidence, local SQL execution or a documented equivalent proof set, operator-visible route review and fresh independent critical PASS.

**verification:** Run canonical/branch checks, focused manifest/contract test, typecheck, lint, production build, safe local database tests when available, exact diff/scope/whitespace checks, UI review, independent inspection and final closeout reread.

## Builder instructions

1. Recheck canonical cwd/Git root, exact branch/base and unrelated exclusions before implementation.
2. Work only from these applied sprint files and immutable Git objects. Do not merge, cherry-pick or replay continuity commits wholesale.
3. Produce an exact Builder execution plan and obtain the Fly-required fresh critical Architect review before changing Product/database files.
4. Preserve unrelated work and stop for any unexpected collision, secret exposure, protected-data access, partial migration/application state or unprovable cleanup.
5. Use the Evidence-Proportional Execution Standard in `requirements.md`; diagnose a supporting-tool failure once, select a safe equivalent or stronger proof and record it.
6. Keep deterministic materialisation, manifest, package, validator, formatting, encoding, reporter and focused-test corrections inside 034G when they do not change the approved outcome.
7. If manual intervention becomes genuinely necessary, record the blocker, evidence checked, exact step-by-step action and what will be verified afterward.
8. Do not commit or publish. Finish only after a fresh independent critical review passes and every closeout file is reread from disk.
