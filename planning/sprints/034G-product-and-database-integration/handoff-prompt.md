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
