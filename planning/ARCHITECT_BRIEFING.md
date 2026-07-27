# Architect Briefing

## Where things stand

Sprint 023B is closed `clean-product-baseline-established`. In an isolated worktree based on accepted Sprint 029M tip `ad9d419`, Builder reconciled the accepted Sprint 021AH ledger/auth application source and Sprint 022/022B typed mobile workflow source, tests, documentation, and evidence. The user approved the one local reconciliation commit on 2026-07-28. The original dirty `develop` worktree remains unchanged. Builder reports the final clean baseline SHA at handoff because a commit cannot contain its own final SHA.

Sprint 029M is closed `public-website-follow-up-partial-safe`. The signed-off public content, bounded Pricing page, approved local assets, and visibly non-submitting enquiry presentation are live through the intended Vercel project. This is not a working enquiry backend, commerce launch, SEO launch, full public relaunch, or production-readiness claim.

## Current status

- Release source commit: `387707afa58d1d77cfb6cea97e4caacf9141203b`.
- Scoped remote branch: `codex/029M-public-website-content-enquiry-and-pricing-follow-up`, verified at the same SHA before deployment.
- Deployment: `dpl_6F1TMjNRECmTCyMbyWXA6ohG8Q2R`, target production, status Ready.
- Aliases: `precisionperformance.com.au`, `www.precisionperformance.com.au`, and `pnr-precision-performance.vercel.app` map to that deployment.
- Rollback target: prior intended deployment `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy`.

## Since last sprint

- Rebuilt the public front page in the approved racing-green/gold direction with professionally edited Australian-English content.
- Added the lighter bounded Pricing page with only AUD $5,500 including GST, postage additional, and consultation wording.
- Added approved local BE Kit and anonymised demonstration assets plus a code-native horse mark.
- Added an accessible client-only enquiry presentation. It has no form action, transmission, persistence, email, logging, analytics, or backend integration.
- Added Australian-English and focused 029M validators.
- Completed local responsive/accessibility review, sign-off, exact-path staging, scoped commit/push, intended-project deployment, alias inspection, HTTP smoke, and rendered mobile/desktop live checks.

## Architecture / file map

- `app/page.tsx`: public 029M content and non-submitting enquiry entry point.
- `app/pricing/page.tsx`: confirmed partial-safe commercial facts only.
- `components/forms/trainer-enquiry-form.tsx`: local validation and explicit unavailable state only.
- `components/marketing/horse-mark.tsx`: original code-native decorative brand mark.
- `public/029m/`: approved publication assets.
- `scripts/validate-public-australian-english-029M.mjs`, `scripts/test-public-website-029M.mjs`: focused enforcement.
- `docs/PUBLIC_WEBSITE_FOLLOW_UP_029M.md` and `planning/reviews/029M-public-website-content-enquiry-and-pricing-evidence.md`: canonical scope and release evidence.

## Decisions

- Preserve the partial-safe release: public content/Pricing live, enquiry submission visibly unavailable.
- Keep Information/Electrolytes, testimonial/video publication, and the undefined twelve-month term deferred.
- Do not infer that “additional services and software options” are currently available; they are discussed during consultation.

## Risks / watch-items

- Visitors may mistake the enquiry presentation for a working submission channel; the visible unavailable state must remain until the complete privacy/data gate is approved.
- Full static validation remains limited by the inherited migration 0009 Windows working-tree byte-hash mismatch. Sprint 029M did not edit that migration.
- `develop` and unrelated 021/022 work remain separate and were not merged, cleaned, reset, or pushed by 029M.

## Open questions for the Architect

- Resolve all twelve enquiry privacy/data decisions before any backend work.
- Define Information page structure/access and Electrolytes treatment.
- Define or permanently omit the twelve-month term.
- Supply durable testimonial/video files, attribution, captions, and accessible alternatives before publication.

## Validation / test status

Passed: Australian-English validator, focused 029M tests 11/11, JSON, typecheck, lint, production build, local mobile/tablet/desktop/keyboard/reflow/reduced-motion review, exact staged allowlist, Vercel build, alias mapping, public markers/assets/Pricing/form boundary/robots smoke, redirects, protected-route redirects, checkout GET 405, and rendered mobile/desktop checks on all three aliases.

## Recommended next Architect action

Resume Sprint 023 from the reported Sprint 023B clean baseline SHA and run its twenty privacy/storage/lifecycle decision gates before any upload or Storage implementation. Treat Sprint 029M as closed partial-safe and keep its deferred public work separate.
