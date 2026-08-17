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
