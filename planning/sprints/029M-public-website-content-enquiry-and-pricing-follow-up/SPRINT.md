# Sprint 029M - Public Website Content, Enquiry, And Pricing Follow-up

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for public personal-data collection, privacy, email delivery, persistent storage, commercial claims, Git/worktree isolation, secrets, production deployment, protected routes, Supabase, Stripe, destructive actions, and external-system mutation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029M is a content, presentation, enquiry, and bounded pricing follow-up to Sprint 029 through Sprint 029L. It keeps the core sprint number and uses suffix `M`. It is sequenced before Sprint 023 because Sprint 022/022B and authenticated proof through 021AH are now closed. It must not consume Sprint 023, redefine the dashboard roadmap, or expand into uploads, evidence management, commerce checkout, production scoring, SEO launch, or full public relaunch.

## Starting Point

- Sprint 022 is closed `mobile-workflow-complete`; Sprint 022B is closed `evidence-reconciled-clean`.
- Sprint 021AH is closed `supabase-application-proof-complete-clean`, with direct proof 17/17, rendered proof 48/48, and final hosted state `0/0/0`.
- Sprint 023 is the next product sprint and is intentionally sequenced after this bounded 029M follow-up.
- Sprint 029J established the intended live production deployment and rendered parity; Sprint 029K cleaned the accidental temporary Vercel project; Sprint 029L backed up the release lineage to `codex/029-marketing-preview-release`.
- The current `develop` worktree is materially dirty with unrelated 021/022 work and planning changes. Builder must not implement 029M in that worktree.
- The user supplied and approved the content, screenshots, charts, horse icon, BE Kit photograph, testimonials, video references, claims, and anonymisation represented in `WEBSITE CHANGES 27072026.docx`.
- The user supplied `Electrolytes.pdf`; it is a two-page human-physiology explainer, includes Phillip Rankin contact/brand material, and contains spelling/chemical-notation issues requiring editorial correction before any web adaptation or publication.
- The user directed Australian English for all new or edited public copy and requested an enforceable check that prevents edited public copy from drifting back to another English variant.
- The user directed an on-page enquiry form whose submissions are both stored and emailed, but the privacy/data-handling statement, retention rules, recipient address, storage destination, email provider, access rules, deletion process, and spam controls remain unprovided.
- The user wants an Information navigation item, but its exact structure and contents remain to be advised.
- The user approved public advertising of an equipment-and-training offer at AUD $5,500 including GST, with postage additional. The meaning of the supplied `12 months` term is not defined, and software subscription pricing remains undecided.

## Goal

Produce a polished, responsive, verified public marketing-site follow-up that:

- updates the front page using the approved dark racing-green and heritage-gold racing-horse/card direction;
- uses the approved lighter branding/dashboard direction for any secondary page created within this sprint;
- professionally edits supplied text for grammar, spelling, clarity, claim qualification, and Australian English while preserving approved meaning;
- adds the approved method, trainer benefits, monitoring, BE Kit, founder, testimonial/good-news, and safe demonstration content;
- provides a working on-page `Request Trainer Consultation` enquiry form only after its strict privacy/data-handling prerequisites are supplied and implemented safely;
- adds a bounded public pricing page containing only confirmed commercial facts, without checkout or invented subscription terms;
- preserves the Information-page request and Electrolytes source without inventing the still-unprovided information architecture;
- verifies the result locally, obtains the user's visual/content sign-off, deploys through the intended Vercel project, and proves live route and safety behaviour; and
- leaves Sprint 023 architecture, protected application behaviour, uploads, evidence storage, scoring, recommendations, checkout, and unrelated dirty work untouched.

## Hard Start Gate: Repository And Worktree Isolation

Before Pack application or any source edit, Builder must:

1. record the current root `git status --short --branch` without changing it;
2. confirm the scoped release branch `codex/029-marketing-preview-release` and its remote SHA;
3. create a separate clean Git worktree and a new branch named `codex/029m-public-website-follow-up` from the verified Sprint 029 release lineage, or stop if that base cannot be established safely;
4. prove the isolated worktree has no inherited uncommitted 021/022 changes;
5. apply this Pack only inside that isolated worktree; and
6. preserve the original dirty `develop` worktree without staging, cleaning, stashing, resetting, moving, deleting, or rewriting its files.

Do not continue implementation if clean isolation cannot be proven. This is a material project-architecture boundary.

## Required Reading And Source Inputs

Builder must read or inspect before source edits:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
5. `docs/DESIGN_SYSTEM_BASELINE_019.md`
6. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
7. `planning/STATE.md`
8. `planning/STATUS.json`
9. `planning/ARCHITECT_BRIEFING.md`
10. `planning/DECISIONS.md`
11. `planning/RISKS.md`
12. `planning/QUESTIONS.md`
13. `planning/SPRINT_SCHEDULE.md`
14. `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
15. Sprint 029 through 029L sprint and closeout evidence relevant to source provenance, deployment, aliases, route safety, and release-branch state
16. current public route/component/style/asset source in the isolated worktree
17. `C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\PNR and RJR EPP Working Information\WEBSITE CHANGES 27072026.docx`
18. `C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\PNR and RJR EPP Working Information\Electrolytes.pdf`

The external DOCX and PDF are approved source inputs, not repository files to modify. Builder may copy only final approved public assets into `public/**`; do not copy the source documents wholesale into the public site unless the acceptance scope below expressly requires it.

## Accepted User Decisions

- Sequence 029M before Sprint 023.
- Do not proceed where 029M would materially damage or destabilise project architecture.
- Edit grammar, spelling, clarity, and claims while preserving meaning.
- Deploy after verification and user sign-off.
- Rename the main CTA to `Request Trainer Consultation`.
- The CTA opens an on-page enquiry form.
- The intended final form behaviour is both persistent storage and email delivery.
- Supplied demonstration information is approved and anonymised.
- Use the dark green/gold racing-horse and cards direction for the front page.
- Use the lighter branding/dashboard direction for secondary public pages.
- The supplied horse icon, BE Kit image, kit claims, testimonials, good-news stories, videos, iCloud media, and other supplied imagery are approved for the stated public use.
- The BE Kit name, contents, and claims are approved as supplied, subject to editorial correction that preserves meaning.
- A public Pricing page is required.
- Confirmed offer: equipment and training, AUD $5,500 including GST; postage is additional; it may be publicly advertised.
- Australian English governs all new or edited public copy.
- Supplied claims are approved, but the site must still use accurate, non-diagnostic, non-guaranteed wording and preserve the existing trainer/veterinary boundary.
- `The Phil-osophy` is intentional and refers to Phillip Rankin.

## Editorial And Australian-English Contract

Builder must create one canonical content map or equivalent central source for the new/edited public copy so headings, CTA labels, navigation text, cards, pricing text, form labels, metadata, and tests do not drift.

All edited public copy must:

- use Australian English (`optimise`, `individualised`, `analyse`, `organisation` where applicable);
- correct grammar, spelling, punctuation, capitalisation, and sentence structure;
- preserve the user's intended commercial and product meaning;
- avoid diagnosis, guaranteed outcomes, veterinary replacement, causal certainty, injury-prevention guarantees, and unsupported universal claims;
- describe the service as supporting trainer decisions and complementing professional care;
- distinguish observed measurements and trends from medical conclusions; and
- use `enquiry` rather than `inquiry` in public-facing copy, while retaining code/API identifiers only where changing them would be harmful.

Builder must add a focused deterministic Australian-English validator for the edited public-copy surface. The validator must check the canonical public content and relevant metadata for a documented set of prohibited US-English variants and required brand phrases. It must support an explicit allowlist for legitimate quotations, proper names, code identifiers, URLs, or unavoidable third-party terms. It must not rewrite unrelated repository content or claim to enforce every possible dialect distinction.

## Front-Page Content Requirements

The front page must incorporate the approved direction from the source DOCX, professionally edited under the contract above. At minimum it must include:

1. **Hero**
   - Brand: `Precision Performance`.
   - Primary message based on `Elite Equine Performance and Recovery Analysis`.
   - Supporting theme based on `Precision Performance - A Science for Elite Equine Athletes`.
   - A concise, qualified explanation of non-invasive urine and saliva analysis, hydration/electrolyte/recovery visibility, and trainer decision support.
   - Primary CTA: `Request Trainer Consultation`.
   - Secondary CTA: `See How It Works`.
   - Dark racing-green/gold racing-horse visual direction.

2. **See How It Works destination**
   - Remove the always-visible existing Preview Snapshot panel from its current placement.
   - The secondary CTA must navigate or reveal a dedicated, accessible explanation using the approved anonymised/recreated dashboard, hydration, conductivity/carbohydrate, or related result examples.
   - Clearly label examples as anonymised, recreated, illustrative, or demonstration content as applicable.
   - Do not reveal proprietary formulas, raw identifiable data, or production thresholds not already authorised for public display.

3. **Precision Performance Method**
   - Use the approved theme `Professional Horsemanship. Go by the Numbers. Trust the Numbers. No Guessing.` with appropriate editorial punctuation and hierarchy.
   - Present three visually coherent cards for biochemical profiling, recovery optimisation, and sustained performance.

4. **For Trainers**
   - Use the approved trainer-focused headline and key benefits.
   - Replace generic green-circle markers with the approved horse-head/silhouette icon treatment.
   - Icons must have accessible semantics and must not carry meaning alone.

5. **Testing Kit And Services / What The Program Monitors**
   - Use `Stable Measurements in Real Time` as the approved subheading, editorially corrected only where necessary.
   - Present the approved monitoring topics with the approved horse-icon treatment.
   - Include the approved BE Kit photograph and approved description.
   - Do not imply live purchase or checkout.

6. **The Phil-osophy**
   - Retain the intentional heading exactly as `The Phil-osophy`.
   - Present the approved founder philosophy in concise Australian English.
   - Preserve the themes of accurate information, informed decisions, practical horsemanship, non-invasive analysis, and `Do No Harm` without promising outcomes.

7. **Testimonials And Good News Stories**
   - Replace the existing Evidence Preview label with `Testimonials and Good News Stories`.
   - Use only the approved assets supplied or specifically identified by the user.
   - Every testimonial/video/image must include an evidence record of its source, public-use approval, displayed attribution/anonymisation choice, alt text/caption, and local repository filename.
   - Do not hotlink an expiring iCloud share; ingest approved assets locally after confirming the exact selected files.

8. **Get In Touch**
   - Replace `Early Stable Review` with `Get in Touch`.
   - State that stable enquiries are personally handled by founder Phillip Rankin.
   - Preserve the truthful boundary that full portal, commerce, and onboarding workflows remain gated.

## Enquiry Form: Strict Privacy And Data Gate

The form must collect only the requested fields:

- trainer name;
- stable name;
- stable address;
- phone number;
- email address;
- approximate horse volume; and
- person referred by.

The intended completed behaviour is to store and email each submission. Builder must not choose or invent the missing privacy/data architecture.

Before implementing server submission, persistence, email delivery, or production activation, Builder must obtain and record all of the following:

1. final privacy notice and consent wording;
2. lawful/business purpose for collection;
3. recipient email address and authorised recipients;
4. selected storage system and data location;
5. selected email delivery method/provider;
6. retention duration;
7. deletion/correction/request process;
8. access-control and audit expectations;
9. spam/abuse protection approach;
10. failure/retry and duplicate-submission behaviour;
11. whether stable address is mandatory and why; and
12. confirmation that provider terms and privacy disclosures are acceptable.

Until every item is supplied, Builder may implement and locally preview the accessible form presentation and client-side validation only, but must not transmit, persist, email, log, or deploy an apparently functional submit action. A production deployment that presents a working form is prohibited until the complete gate passes. Do not silently fall back to `mailto`, a third-party form endpoint, localStorage, analytics events, application logs, or an unapproved database table.

Once the gate passes, any new schema, RLS, server action, API route, provider integration, secret/environment configuration, or remote mutation requires an exact approved file/operation expansion recorded through the sprint's manual-intervention process before implementation. Never print or store secret values in evidence.

## Pricing Page Boundary

Create a public Pricing page using the lighter secondary-page design direction. It may state only:

- `Equipment and training`;
- `AUD $5,500 including GST`;
- `Postage additional`; and
- a safe `Request Trainer Consultation` CTA.

The page must clearly state that software subscription pricing and plan structure are still being finalised or are available by consultation. It must not display the earlier speculative `$150-$250/month`, per-horse pricing, horse-volume tiers, checkout, payment links, deposits, financing, cancellation terms, refund promises, or an interpretation of the undefined `12 months` statement.

Checkout, Stripe, catalogue mutation, orders, billing, subscription activation, and commerce enablement remain Sprint 030 work.

## Information Page And Electrolytes Boundary

The Information navigation/page structure is not yet defined. Builder must not invent categories, navigation hierarchy, gated/public treatment, or additional content.

Builder must:

- preserve `Electrolytes.pdf` as an approved source input;
- record its two-page content and the fact that it is written primarily in human-physiology language;
- correct obvious source issues such as `ELECTROLTES`, `NaCL`, `HCL`, `CL-`, US spelling, and inconsistent brand/contact presentation in any web adaptation;
- avoid representing human physiological statements as equine-specific facts without explicit equine-context wording; and
- leave the Information tab/page unpublished unless the user supplies its exact title, structure, public/restricted status, and whether the PDF should be adapted to HTML, offered as a download, emailed after enquiry, or handled in another stated way.

The missing Information-page decision must not block other safely separable 029M work, but closeout must record it as deferred rather than complete.

## Visual And Accessibility Requirements

- Front page: approved dark racing-green and heritage-gold racing-horse/card direction.
- Secondary pages: approved lighter branding/dashboard direction, while retaining the canonical brand palette and typography.
- Reuse Sprint 019 design tokens and local font stacks; do not add remote font dependencies.
- Maintain premium, practical, credible equine presentation; avoid generic cyber/medical fantasy imagery.
- Meet keyboard, focus, visible-label, error-summary, contrast, reduced-motion, zoom, mobile, tablet, and desktop requirements.
- Forms must associate every label, instruction, error, and consent statement programmatically.
- Do not rely on colour or icons alone for meaning.
- Images require meaningful alt text or intentional decorative treatment.
- No clipping, overlap, illegible text, broken image, layout shift, or inaccessible modal/drawer behaviour at tested widths.

## Deployment And Release Sequence

Deployment is included only after all applicable acceptance gates pass.

Builder must:

1. complete implementation in the isolated worktree/branch;
2. run focused and canonical validation;
3. build from the exact isolated source intended for deployment;
4. run rendered local review at mobile, tablet, and desktop widths, including keyboard and form states;
5. present the verified local/preview result for user visual/content sign-off;
6. stage only 029M files with explicit paths and inspect the staged diff;
7. commit and push only the scoped 029M branch;
8. deploy through the existing intended Vercel project without changing DNS, project settings, or environment configuration except where an expressly recorded enquiry-backend expansion requires it;
9. verify apex, `www`, and the intended Vercel alias against the new deployment;
10. verify hero/assets, Pricing, CTA destinations, protected routes, shop/checkout gating, `noindex/nofollow` state, and old/new content markers; and
11. record rollback target and post-deployment evidence.

If the enquiry privacy/data gate is incomplete, Builder must not deploy an apparently functional data-submitting form. Builder may ask the user whether to defer the entire deployment or deploy only the completed public content with the form visibly marked unavailable; Builder must not choose between those outcomes.

## In Scope

Builder may:

- apply this Pack in the isolated worktree and verify the generated Sprint 029M file;
- edit approved public marketing routes/components/styles/assets;
- create the bounded Pricing page;
- create an accessible on-page enquiry form presentation and validation;
- implement form storage/email only after every strict privacy/data prerequisite and exact scope expansion is recorded;
- ingest specifically selected, approved source assets into `public/**` with safe filenames and optimisation;
- adapt approved anonymised demonstration visuals;
- professionally edit the supplied public copy under the editorial contract;
- add focused public-copy, Australian-English, content-marker, accessibility, form, route, and safety tests;
- update public-site documentation and create 029M evidence;
- perform a scoped commit, push, Vercel deployment, and live verification after all applicable gates pass; and
- update planning closeout records without overwriting unrelated dirty-worktree changes.

## Out Of Scope

Builder must not:

- begin or alter Sprint 023 dashboard work;
- implement uploads, trainer evidence storage, photo/PDF evidence workflows, OCR, or Storage features;
- implement voice/transcription;
- invent the Information page/tab structure;
- invent subscription pricing, horse tiers, the meaning of `12 months`, commercial terms, refunds, cancellation, or support inclusions;
- enable checkout, Stripe, orders, billing, or catalogue mutation;
- invent a privacy statement, retention rule, provider, recipient, database destination, consent model, or spam-control service;
- publish an apparently working enquiry submit action before its strict gate passes;
- change auth, roles, RLS, migrations, protected application routes, scoring, thresholds, recommendations, portal, admin, or ops behaviour except through an expressly recorded form-backend scope expansion;
- publish secrets, private records, raw horse/stable data, proprietary formulas, or source documents containing information not intended for public display;
- alter DNS, unrelated Vercel projects, Supabase projects, Stripe, or production data outside an exact recorded expansion;
- work in, clean, stash, reset, stage, commit, or rewrite the dirty original `develop` worktree; or
- claim full public relaunch, SEO launch, commerce readiness, production readiness, or project Done.

## Approved File Set

Builder may edit or create in the isolated 029M worktree:

- `app/page.tsx`
- `app/(marketing)/home/page.tsx`
- `app/(marketing)/layout.tsx`, only for marketing navigation/layout
- `app/contact/page.tsx`, only if used as a safe fallback/information route and not as a second divergent form implementation
- `app/pricing/page.tsx`
- `app/layout.tsx`, only for safe public metadata and Australian-English metadata copy
- `components/sections/**`, only public marketing sections
- `components/marketing/**`
- `components/forms/**`, only the public trainer-enquiry form
- public-marketing styles or global CSS required by these routes
- `public/**`, only approved, non-confidential, publication-ready 029M assets
- `scripts/validate-public-australian-english-029M.mjs`
- focused 029M tests/validators under existing project conventions
- `package.json` and `package-lock.json`, only if required to register a dependency-free validation command; no dependency additions
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `docs/PUBLIC_WEBSITE_FOLLOW_UP_029M.md`
- `planning/reviews/029M-public-website-content-enquiry-and-pricing-evidence.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/SPRINT_SCHEDULE.md`, only for current status and sequencing
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`, only to record 029M before 023 without redefining later sprint scope
- `planning/DECISIONS.md`, only for durable decisions actually established
- `planning/RISKS.md`, only for changed active risks
- `planning/QUESTIONS.md`, only for resolved/deferred questions

Builder may inspect protected routes and configuration only for route-safety verification. Names/presence may be inspected where required; secret values must never be printed.

The following require a stop and exact approved-file/operation expansion after the privacy/data gate is answered:

- any `app/api/**` route;
- any server action outside the listed marketing/form components;
- `lib/**` email, storage, privacy, rate-limit, or provider code;
- Supabase migrations, policies, tables, functions, or remote mutations;
- environment-variable/configuration changes;
- third-party provider setup; and
- production secrets.

Any other file is outside scope.

## Required Validation

Run, at minimum:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- the focused 029M Australian-English/content validator
- focused tests for CTA, Pricing, route safety, checkout blocking, form labels/validation, and non-submission behaviour while the privacy gate is closed
- `npm.cmd run build`
- `git diff --check` for all 029M touched files

If stable in the isolated worktree, also run `npm.cmd run validate:local`.

Rendered local verification must cover:

- mobile phone width;
- tablet width;
- desktop width;
- keyboard-only traversal;
- 200% zoom or equivalent reflow;
- reduced motion;
- hero, cards, BE Kit, testimonials/good-news, pricing, and demonstration content;
- enquiry form empty, invalid, pending, success, failure, and duplicate-prevention states where implemented;
- no broken or unoptimised source image;
- no raw source-document contact details exposed unintentionally; and
- no stale/contradictory old marketing copy.

Post-deployment verification must cover apex, `www`, intended Vercel alias, assets, Pricing, CTA behaviour, protected routes, shop/checkout gating, metadata/noindex state, and rollback readiness.

## Acceptance Criteria

1. Implementation begins only in a clean isolated worktree based on verified Sprint 029 release lineage; the dirty original `develop` worktree remains untouched.
2. The Pack is applied as `planning/sprints/029M-public-website-content-enquiry-and-pricing-follow-up/SPRINT.md` in that isolated worktree.
3. The front page uses the approved dark racing-green/gold racing-horse and card direction and remains coherent with Sprint 019 tokens.
4. Secondary public pages created by this sprint use the approved lighter branding/dashboard direction without becoming a separate visual brand.
5. Supplied copy is professionally edited for Australian English, grammar, spelling, clarity, and qualified claims while preserving approved meaning.
6. A deterministic validator checks the edited public-copy surface for documented non-Australian variants and required brand phrases with a narrow explicit allowlist.
7. The hero, method, trainer benefits, monitoring, BE Kit, The Phil-osophy, testimonials/good-news, Get in Touch, and demonstration content meet the defined requirements.
8. `Request Trainer Consultation` opens an accessible on-page enquiry form containing exactly the approved fields.
9. No form data is transmitted, persisted, emailed, logged, or deployed as functional until the complete privacy/data gate is answered and its exact implementation scope is recorded.
10. If the privacy/data gate is completed, storage and email delivery both work with consent, access, retention, deletion, spam, failure, duplicate, and secret boundaries verified.
11. The Pricing page displays only `Equipment and training`, `AUD $5,500 including GST`, `Postage additional`, a consultation CTA, and a truthful undecided-subscription statement.
12. No checkout, Stripe, subscription activation, speculative monthly/per-horse pricing, invented 12-month interpretation, or other unapproved commercial term is exposed.
13. The Information page/tab remains explicitly deferred unless the user supplies its exact structure and treatment; no empty or invented navigation item is published.
14. The Electrolytes source is recorded accurately, and any later adaptation is blocked from silently turning human-physiology content into equine-specific advice.
15. Every published image, icon, testimonial, video, or demonstration asset has source/approval/anonymisation/alt-text evidence and is served locally rather than through an expiring iCloud hotlink.
16. Mobile, tablet, desktop, keyboard, focus, zoom/reflow, contrast, reduced-motion, labels, errors, and non-colour meaning verification pass.
17. Focused tests, canonical validation, production build, and exact-source rendered review pass.
18. The user reviews and signs off the verified visual/content result before deployment.
19. Scoped staging, commit, push, intended-project Vercel deployment, apex/`www`/alias smoke, route safety, checkout gating, and rollback evidence pass.
20. Closeout records every completed, deferred, blocked, and manually required item without claiming full public relaunch, commerce readiness, SEO launch, production readiness, Sprint 023 completion, or project Done.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly instead of leaving it implicit.

For each manual intervention, Builder must record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action needed;
- numbered steps for completing that action; and
- what Builder will verify afterward.

Known manual interventions are:

### Enquiry privacy and data handling

- **Blocked:** production submission, storage, email delivery, and deployment of an apparently functional form.
- **Evidence checked:** the user selected both storage and email but deferred the explicit privacy/data-handling decision; no recipient, provider, retention, access, deletion, consent, spam, or failure rules were supplied.
- **User action needed:** provide all twelve items listed in `Enquiry Form: Strict Privacy And Data Gate`.
- **Steps:** answer each numbered item; identify any selected provider/account without sharing secret values; review the resulting privacy/consent wording; confirm the operational recipient and deletion process.
- **Builder verification afterward:** record the decision, identify exact additional files/operations, stop for scope expansion where required, implement without exposing secrets, and verify storage/email/consent/access/retention/deletion/failure behaviour.

### Information page

- **Blocked:** publication of the Information navigation item/page and disposition of `Electrolytes.pdf`.
- **Evidence checked:** the PDF was supplied and inspected, but exact page title, structure, public/restricted state, and HTML/download/email treatment remain `to be advised`.
- **User action needed:** provide those four decisions and any additional approved information content.
- **Steps:** choose page title; list sections; choose public or restricted; choose HTML adaptation, public download, post-enquiry email, or another explicit treatment.
- **Builder verification afterward:** map the supplied structure without adding content, correct source errors, verify Australian English and equine-context boundaries, and test navigation/accessibility.

### Undefined 12-month commercial term

- **Blocked:** publishing any 12-month inclusion or commitment.
- **Evidence checked:** `AUD $5,500 including GST` and `postage additional` are clear, but `12 months` has no defined object, service, support, cancellation, or commencement meaning.
- **User action needed:** state exactly what lasts twelve months and its inclusions/exclusions, or direct that it remain omitted.
- **Steps:** name the service/benefit; define start/end; define included contact/training/support; define cancellation/refund effect; approve final public wording.
- **Builder verification afterward:** include only the approved wording and reconcile it with Sprint 030 commercial planning.

### Asset selection and ingestion

- **Blocked when applicable:** exact extraction of testimonial/video/iCloud files if the local approved source files are not available.
- **Evidence checked:** the user approved the materials generally; expiring share links are not durable production assets.
- **User action needed:** provide or identify the exact local source files selected for publication.
- **Steps:** download/save approved originals locally; identify attribution/anonymisation; confirm captions; provide them without credentials.
- **Builder verification afterward:** optimise local copies, record provenance/approval, add alt text/captions, and verify production delivery.

### Visual sign-off and deployment

- **Blocked:** production deployment until local verification passes and the user signs off the rendered content/design.
- **Evidence checked:** Builder must provide exact preview URL/screenshots and validation summary.
- **User action needed:** review mobile/tablet/desktop evidence and either sign off or list corrections.
- **Steps:** open each preview; check copy, imagery, Pricing, CTA/form state, and routes; provide one consolidated response.
- **Builder verification afterward:** correct within scope if needed, rerun affected gates, then deploy and perform live smoke/rollback verification.

If any intervention remains unresolved, Builder must not disguise it as completion or choose product behaviour on the user's behalf.

## Closeout

Builder must create:

- `docs/PUBLIC_WEBSITE_FOLLOW_UP_029M.md`
- `planning/reviews/029M-public-website-content-enquiry-and-pricing-evidence.md`

Builder must update, only from the isolated 029M worktree and with conflict-safe reconciliation:

- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATUS.json`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` only where evidence changes them

Closeout must state exactly one outcome:

- `public-website-follow-up-deployed`
- `public-website-follow-up-partial-safe`
- `public-website-follow-up-blocked-clean`

`public-website-follow-up-deployed` requires all applicable acceptance criteria, working gated-and-approved enquiry storage/email, user visual sign-off, scoped commit/push, intended-project deployment, live verification, and rollback evidence.

`public-website-follow-up-partial-safe` may be used only when the user expressly chooses a safe content-only deployment with the enquiry submission visibly unavailable and all deferred items clearly recorded.

Closeout evidence must include:

- source branch/worktree/base SHA and isolation proof;
- files changed and why;
- final canonical public copy and Australian-English validator coverage;
- page/section/CTA/form/pricing/asset inventory;
- privacy/data gate decision and exact form behaviour;
- deferred Information/Electrolytes disposition;
- commercial facts published and omitted;
- local validation/build/rendered evidence;
- user visual sign-off record;
- staged file list, commit SHA, remote branch/SHA;
- Vercel project/deployment/alias provenance;
- apex/`www`/alias/asset/route/checkout/protected-route smoke;
- rollback target;
- every manual intervention and residual limitation; and
- confirmation that Sprint 023, uploads, protected application architecture, scoring, checkout, unrelated dirty work, and project-wide Australian-English content outside the approved surface were not changed.

Do not commit unless the sprint's scoped release sequence reaches the commit step. Do not merge or push `develop`, open a PR, or reconcile unrelated dirty history unless separately requested.
