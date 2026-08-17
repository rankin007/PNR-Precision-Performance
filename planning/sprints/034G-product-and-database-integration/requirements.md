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
