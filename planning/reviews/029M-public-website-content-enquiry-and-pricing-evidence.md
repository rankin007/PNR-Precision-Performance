# Sprint 029M Evidence - Public Website Content, Enquiry, And Pricing

## Start-Gate Reconciliation

Recorded: 2026-07-28

### Isolated worktree and branch

- Worktree: `C:\tmp\pnr-029m-public-website`
- Branch: `codex/029M-public-website-content-enquiry-and-pricing-follow-up`
- Local base/HEAD before production-source edits: `b8961b9647507af87e6887cf78c1d6e262f944b6`
- The branch name is an accepted harmless variation of the Sprint 029M naming used by the applied sprint folder. It is reconciled as-is and will not be renamed unless technically required.
- The original dirty `develop` worktree is outside this sprint and must not be modified, cleaned, stashed, reset, staged, or committed.

### Remote release lineage

- The configured SSH remote query was attempted read-only and failed with `Permission denied (publickey)`; no remote configuration was changed.
- A read-only HTTPS `git ls-remote` query then confirmed `refs/heads/codex/029-marketing-preview-release` at `7e21c9767f3d53e0f2b8ddf126e22b7352c6def4`.
- Local commit `7e21c9767f3d53e0f2b8ddf126e22b7352c6def4` is `Close Sprint 029K release state hygiene`.
- `git merge-base --is-ancestor 7e21c97 b8961b9` passed.
- The only commit from the verified remote release SHA to the isolated local base is `b8961b9 Close Sprint 029L scoped release backup`.
- Therefore `b8961b9647507af87e6887cf78c1d6e262f944b6` is the correct Sprint 029L local release base for Sprint 029M: it contains the remotely backed-up Sprint 029 release lineage plus the local Sprint 029L closeout record.

## Implementation Evidence

### Source and asset review

- The approved `WEBSITE CHANGES 27072026.docx` was extracted to temporary review files without modifying the source. Its complete text and six embedded media files were inspected.
- The two supplied page concepts were used as design references only.
- The supplied raster horse silhouette contains a visible third-party watermark and was not published. An original code-native horse profile was created in `components/marketing/horse-mark.tsx`.
- Approved local publication assets:
  - `public/029m/be-kit.jpeg`: embedded BE Kit photograph; alt text records the open case, field instruments, and sample equipment.
  - `public/029m/anonymised-hydration-demonstration.png`: approved anonymised hydration demonstration; explicitly labelled demonstration content.
  - `public/029m/anonymised-conductivity-demonstration.png`: approved anonymised conductivity/carbohydrate demonstration; explicitly labelled demonstration content.
- No testimonial or video file was embedded. No expiring iCloud URL is hotlinked. The local page truthfully records that approved durable source files, attribution, captions, and accessible alternatives are still required.
- `Electrolytes.pdf` remains source-only and unpublished. No Information navigation/page was invented.

### Implemented public surfaces

- `app/page.tsx`: dark racing-green/gold hero, professionally edited Australian-English copy, Method cards, trainer benefits, accessible horse icon treatment, How It Works demonstration, monitoring topics, BE Kit, `The Phil-osophy`, polished temporary Precision Performance approach treatment without testimonial claims, Get in Touch, consultation CTA, and preserved `noindex`/`nofollow` metadata.
- `app/pricing/page.tsx`: lighter secondary-page direction with only `Equipment and training`, `AUD $5,500`, `Including GST`, `Postage additional`, consultation CTA, and visitor-facing wording that additional services and software options are discussed during consultation without implying current availability.
- `components/forms/trainer-enquiry-form.tsx`: exact approved field concepts, labels, required-state markers, per-field errors, error summary, live review status, and explicit local-preview non-submission boundary.
- `app/layout.tsx`: Australian locale and safe public metadata copy.
- `app/globals.css`: reduced-motion behaviour.

### Enquiry privacy/data boundary

- The form has no action or method and contains no `fetch`, server action, persistence, email, analytics, local-storage, or logging integration.
- Empty review produces five invalid fields and a scoped error summary.
- A synthetic locally valid review produces zero invalid fields and states that submission remains unavailable and no information was sent or saved.
- Stable address is presented as optional until requirement 11 of the strict privacy/data gate is answered.
- No privacy notice or consent wording was invented.

### Commercial boundary

- Published locally: equipment and training, AUD $5,500 including GST, postage additional.
- Explicitly omitted: speculative subscription amounts, horse tiers, per-horse pricing, checkout, Stripe, deposits, financing, cancellation, refunds, and any interpretation of the undefined twelve-month term.
- Accepted correction: `Additional services and software options are discussed during consultation.` No specific additional service or software option is described as available.

### Validation

Passed:

- `npm.cmd run validate:public-au-029m`: Australian-English and required brand phrase validation across three public-copy surfaces.
- `npm.cmd run test:public-029m`: 11/11 CTA, demonstration, testimonial-link, pricing, subscription, twelve-month, form non-transmission, field, checkout, and protected-route assertions.
- `npm.cmd run validate:json`.
- `npm.cmd run typecheck`.
- `npm.cmd run lint`: no warnings or errors.
- Sprint 019 design-system/noindex check within `validate:static`.
- `npm.cmd run build`: optimized production build passed; `/` and `/pricing` generated as static routes.
- `git diff --check` (line-ending notices only where applicable).

Limited:

- `npm.cmd run validate:static` continues beyond the passed design-system check and stops on inherited migration 0009 byte-hash mismatch: expected `6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9`, Windows working-tree hash `B5DE360D33C69F21C8967793AFD66CA670A1FA32672AD60E7A47BD72F56982E3`. Migration 0009 is outside the approved file set and was not edited.

### Route safety

- `/`: 200.
- `/pricing`: 200.
- `/home`, `/contact`, `/shop`, `/shop/example`: 307 to `/`.
- `/sign-in`: 200.
- `/admin`, `/portal`, `/data-entry`: 307 to sign-in/setup routes.
- checkout GET: 405; no checkout is exposed by the public pages.
- Root HTML includes `noindex`, `nofollow`, `Request Trainer Consultation`, and `The Phil-osophy`.
- Pricing HTML contains confirmed terms and excludes `$150`, `$250`, and `12 months`.

### Rendered local review

- Mobile: 390 x 844; no document overflow; all images complete with non-zero dimensions.
- Tablet: 768 x 1024; no document overflow; all images complete with non-zero dimensions.
- Desktop: 1440 x 900; no document overflow; all images complete with non-zero dimensions.
- 200%-equivalent reflow: 720 CSS-pixel width; no document overflow.
- Reduced motion: deterministic `prefers-reduced-motion` rule present and verified in rendered CSS.
- Keyboard: public navigation and CTA sequence receives visible solid focus outlines; injected browser-extension controls were outside the application DOM and ignored.
- Form: visible labels, required markers, invalid attributes, error summary, status announcement, and explicit non-transmission state verified.
- Screenshots: `planning/reviews/029M-visual-artifacts/local-mobile.png`, `local-tablet.png`, `local-desktop.png`, and `local-pricing-desktop.png`.
- The four screenshots were regenerated from the restarted local server after the accepted content corrections. CDP measurements were mobile `390/390`, tablet `768/768`, desktop `1440/1440`, and Pricing `1440/1440` for inner/scroll width, with no horizontal overflow.

### Sign-off and proposed deployment source

- Final visual/content sign-off: confirmed by the user on 2026-07-28 after review of the corrected temporary approach treatment, visitor-facing Pricing wording, active local preview, and regenerated mobile/tablet/desktop/Pricing screenshots.
- Partial-safe release path: explicitly accepted. The deployed form must remain visibly unavailable for submission; Information/Electrolytes, the undefined twelve-month term, and testimonial/video publication remain deferred.
- Exact proposed deployment worktree: `C:\tmp\pnr-029m-public-website`.
- Exact proposed branch: `codex/029M-public-website-content-enquiry-and-pricing-follow-up`.
- Verified base: `b8961b9647507af87e6887cf78c1d6e262f944b6`.
- Proposed deployment source: the eventual scoped 029M commit created from the currently verified isolated changes after user sign-off and any approved corrections. No commit SHA exists yet because committing before sign-off is prohibited.
- No commit, push, Vercel deployment, DNS mutation, production mutation, or original dirty-worktree mutation occurred.

### Scoped staging record

The final pre-commit index contained exactly 23 approved Sprint 029M paths:

- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `app/pricing/page.tsx`
- `components/forms/trainer-enquiry-form.tsx`
- `components/marketing/horse-mark.tsx`
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `docs/PUBLIC_WEBSITE_FOLLOW_UP_029M.md`
- `package.json`
- `planning/EVIDENCE_INDEX.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/reviews/029M-public-website-content-enquiry-and-pricing-evidence.md`
- `planning/reviews/029M-visual-artifacts/local-desktop.png`
- `planning/reviews/029M-visual-artifacts/local-mobile.png`
- `planning/reviews/029M-visual-artifacts/local-pricing-desktop.png`
- `planning/reviews/029M-visual-artifacts/local-tablet.png`
- `planning/sprints/029M-public-website-content-enquiry-and-pricing-follow-up/SPRINT.md`
- `public/029m/anonymised-conductivity-demonstration.png`
- `public/029m/anonymised-hydration-demonstration.png`
- `public/029m/be-kit.jpeg`
- `scripts/test-public-website-029M.mjs`
- `scripts/validate-public-australian-english-029M.mjs`

The staged diff was inspected by complete name/status list, summary, text patch, binary inventory, and `git diff --cached --check`. It contained 1,027 insertions, 261 deletions, seven approved binary evidence/public assets, and no unstaged 029M source changes. It included no `develop` operation, Sprint 021/022/023 file, protected application route/component, Supabase file, Stripe file, checkout file, secret/configuration file, environment file, migration, auth/RLS file, upload/scoring/recommendation file, or unrelated project architecture.

## Outstanding Manual Interventions

### Enquiry privacy and data handling

- Blocked: production submission, storage, email delivery, and deployment of an apparently functional form.
- Evidence: client-only presentation verified; all twelve privacy/data decisions remain unanswered.
- User action: provide each of the twelve items in the applied sprint, including exact notice/consent, purpose, recipient, storage, provider, retention, deletion/correction, access/audit, spam, failure/duplicate behaviour, address requirement, and provider/privacy acceptance.
- Afterward: Builder will record the exact scope expansion before any server/provider work and verify the approved end-to-end behaviour without exposing secrets.

### Information and Electrolytes

- Blocked: Information navigation/page and disposition of `Electrolytes.pdf`.
- User action: provide exact title, section structure, public/restricted status, and HTML/download/post-enquiry-email treatment.
- Afterward: Builder will adapt only the approved structure, correct source issues, preserve human-versus-equine context, and test access/navigation.

### Undefined twelve-month term

- Blocked: any twelve-month wording.
- User action: define exactly what lasts twelve months and its inclusions/exclusions, or direct that it remain omitted.
- Afterward: Builder will publish only approved wording and reconcile it with later commerce planning.

### Testimonials and video assets

- Blocked: actual testimonial/video publication because no durable selected file was embedded and the iCloud share is not suitable as a production hotlink.
- User action: identify/provide exact local approved files plus final attribution/anonymisation and captions.
- Afterward: Builder will ingest, optimise, caption, add accessible alternatives, and verify local delivery.

### Visual/content sign-off

- Blocked: commit, push, and deployment.
- User action: review the supplied mobile, tablet, desktop, and Pricing screenshots plus `http://127.0.0.1:3029/` and `http://127.0.0.1:3029/pricing` while the local server remains available; either sign off or provide one consolidated correction list.
- Afterward: Builder will apply in-scope corrections, rerun affected gates, stage explicit 029M paths, inspect the staged diff, and present the final release action without touching `develop`.
