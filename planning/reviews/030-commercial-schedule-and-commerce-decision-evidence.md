# Sprint 030 Evidence

## Baseline and preservation

- Required worktree: `C:\tmp\pnr-027b-completed-product-lineage-reconciliation`
- Branch: `codex/027B-completed-product-lineage-reconciliation`
- HEAD: `355327cebf4ed7fd3e0239bf9e3cbed0c28cd469`
- Sprint 028 outcome: `stable-dashboard-and-horse-workspace-authority-limited-clean`
- The pre-existing dirty manifest contained the completed Sprint 028 portal, horse-domain, validation and planning files recorded by `git status --short`; Sprint 030 did not clean, stage, commit or rewrite that lineage.
- Client DOC/DOCX/XLSX/PDF/PPTX and migrations were read/inventoried only and remain unchanged.

## Authority and selected posture

Material price, GST, freight, term, refund, ownership, trial and fulfilment authority remains incomplete. The selected posture is `commerce-disabled-safe`, producing the accepted outcome `commercial-authority-pending-commerce-disabled-safe`. No Stripe test activity is applicable to this posture.

## Implementation evidence

- A typed versioned authority contract fixes checkout to disabled.
- Pricing contains no active price or invented term and accurately explains consultation/non-transmission.
- Shop and product detail explicitly reject historical/seeded values as active offers.
- Direct checkout creates no Stripe session, order or payment.
- Webhook reconciliation fails closed before payload reading or mutation.
- Admin commerce remains permission-protected/read-only and labels catalogue data as historical reconciliation evidence.
- No schema, migration, RLS, role, permission, dependency, remote, Production or payment-data action occurred.

## Validation record

Passed local evidence:

- Sprint 030 disabled contract: 12 assertions.
- Maintained Sprint 029M public content: 11/11; Australian-English validator passed across four surfaces.
- JSON: validator self-test 8 cases and seven maintained JSON files.
- Domain suite: Sprints 014, 022 and 025–030 passed, including Sprint 030 registration.
- Roles and nine Supabase harness self-test groups passed without remote execution.
- Static suite: encoding across 828 maintained text files plus design, readiness, database-audit, clean-rebuild `0001`–`0021` and role validators.
- TypeScript passed; cache-free ESLint passed with zero warnings/errors.
- Next.js 15.3.8 production build passed and generated 25 pages, including every Sprint 030 route.
- `git diff --check` passed.
- Local built-route smoke: `/pricing`, `/shop` and `/shop/historical-test` returned `200` with safe authority-pending content; checkout returned `303` to `checkout=commercial-authority-incomplete`; webhook returned `503`; anonymous `/admin/commerce` returned `307` to sign-in. The exact owned local server was stopped.

The first ordinary ESLint attempt could not write its inherited `.next` cache because of worktree ownership. Cache-free ESLint is equivalent and passed. No external Stripe or Production proof is applicable or claimed.

## Sprint 030 changed-path manifest

- Commercial contract: `lib/commerce/commercial-authority.ts`, `lib/domain/products.ts`.
- Public/API/admin surfaces: `app/pricing/page.tsx`, `app/shop/page.tsx`, `app/shop/[slug]/page.tsx`, `app/api/checkout/route.ts`, `app/api/stripe/webhook/route.ts`, `app/(admin)/admin/commerce/page.tsx`.
- Tests/registration: `scripts/test-commerce-disabled-030.mjs`, `scripts/test-public-website-029M.mjs`, `scripts/validate-public-australian-english-029M.mjs`, `scripts/run-validation-suite.mjs`, `package.json`.
- Authority/evidence: `docs/COMMERCIAL_SCHEDULE_AND_COMMERCE_DECISION_030.md`, this file and the four generated Sprint 030 files.
- Standard closeout: `planning/STATE.md`, `STATUS.json`, `DECISIONS.md`, `RISKS.md`, `QUESTIONS.md`, `SPRINT_SCHEDULE.md`, `PROJECT_SPRINT_LIST_2026-07-21.md`, `EVIDENCE_INDEX.md`, `ARCHITECT_BRIEFING.md`.

All other dirty paths are preserved Sprint 028 lineage. No migration, lockfile, dependency, reference document or protected-data file changed.

## Manual intervention

Business-owner approval is genuinely required only to move beyond disabled-safe. Exact questions and verification steps are in `docs/COMMERCIAL_SCHEDULE_AND_COMMERCE_DECISION_030.md`. No manual action is required to preserve the completed safe disabled posture.
