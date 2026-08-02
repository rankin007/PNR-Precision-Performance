# Sprint 035N Acceptance

## Baseline and scope

- [ ] Work starts only from clean `codex/035M-first-trainer-preview-access-and-core-journey` closeout SHA `143f03344561c622a074ab40052c2dbb132a6fb3` in a scoped 035N branch/worktree.
- [ ] Governing implementation candidate `b1bf770dc6ab3839cfc24c53563f6ed6310e08ba`, Preview `dpl_6NBk2VKPZZUS4QqdstqDHtGk8EVV`, 58 passing checks, 14 unrun rendered checks, zero human attempts, and zero owned external state are reconciled before mutation.
- [ ] No product-contract, schema, migration, RPC, RLS, role, permission, assignment, clinical, upload, voice, trend, commerce, public, or production behavior changes.

## Exact callback mutation

- [ ] Current Supabase Site URL and complete redirect allowlist are read before mutation and recorded without secrets or protected values.
- [ ] Production Site URL and existing production callback remain unchanged.
- [ ] The only configuration addition is the exact HTTPS callback for the governing alias-free 035M Preview origin plus `/auth/callback`; no wildcard, pattern, alternate Preview, localhost, custom alias, or Site URL change exists.
- [ ] Immediate post-write read proves the resulting allowlist equals the before-state plus exactly one approved entry.
- [ ] The exact added entry is dependency-tracked as temporary 035N state and removed after the terminal acceptance attempt.
- [ ] Final read proves exact restoration of the pre-sprint Site URL and redirect allowlist.

## Rendered proof

- [ ] Preview is Ready, exact-source, non-production, alias-free, healthy, and anonymously denies protected routes before protected activity.
- [ ] All 14 maintained authenticated rendered checks pass against the exact Preview.
- [ ] Assigned synthetic horse/stable visibility, wrong-horse/cross-stable denial non-leakage, route/action agreement, sign-out/revocation, responsive behavior, keyboard/focus semantics, and status accessibility pass.
- [ ] Displayed state, timestamps, actions, and absence/error cases agree with existing authorised contracts and fail closed.
- [ ] No rendered evidence contains participant identity, authentication material, session data, or real horse/stable/customer information.

## Human trainer journey

- [ ] One product-owner-designated trainer privately completes approved-account sign-in without exposing authentication material.
- [ ] The trainer recognises only the assigned synthetic horse/stable, opens the horse workspace, follows one existing permitted biochemistry action, and returns to the dashboard.
- [ ] Sign-out denies protected access and repeat sign-in restores the same bounded assignment.
- [ ] Complete task is proven on a supported phone and orientation on one tablet or desktop viewport without horizontal page overflow.
- [ ] Trainer feedback records completion and material friction only in sanitized form.
- [ ] Human attempts do not exceed two; any retry follows one diagnosis and an in-scope correction.
- [ ] No language implies clinical urgency, diagnosis, treatment, supplementation, race readiness, or performance prediction.

## Privacy, cleanup, and non-impact

- [ ] Fixtures are clearly synthetic and contain no real trainer-business, horse, stable, owner, customer, or clinical information.
- [ ] No email, code, link, mailbox content, cookie, token, credential, session material, or personal identifier appears in chat, commands, URLs, logs, screenshots, or repository evidence.
- [ ] Exact Sprint-owned synthetic application dependencies are removed before an exact Sprint-created Auth identity, with Auth last; adopted, pre-existing, and ambiguous identities remain untouched.
- [ ] Auth/application/Storage reconciliation proves zero unexpected Sprint-owned state or records expressly authorised retained synthetic state.
- [ ] Production deployment, aliases, DNS, Site URL, public release, production data, `develop`, and unrelated provider state remain unchanged.

## Validation and closeout

- [ ] Maintained 58 local 035M checks and focused 035N mutation/cleanup checks pass, with the expected-count arithmetic recorded.
- [ ] Maintained 021AH and 022/022B regressions pass.
- [ ] `npm run validate:json`, `npm run test:domain`, `npm run test:roles`, `npm run test:supabase-self`, `npm run validate:static`, `npm run typecheck`, `npm run lint`, and `npm run validate:local` pass.
- [ ] `npm run build` passes from the exact candidate or equivalent clean reparse-safe workspace, with substitution recorded.
- [ ] `git diff --check`, approved-path, exact staged-manifest, secret/private-data, generated-artifact, and source/Preview identity checks pass.
- [ ] Review, lifecycle ledger, state, status, schedule, roadmap, evidence index, acceptance matrix, and briefing agree on one permitted outcome.
- [ ] Roadmap Sprint 035 is marked done only when rendered proof, human acceptance, and cleanup all pass; Core Product Done remains false.
