# Sprint 022 - Mobile Biochemistry Workflow Completion Review

Date: 2026-07-27
Outcome: `mobile-workflow-complete`

## Delivered

The typed biochemistry capture is now a mobile-first capture, review, edit, submit, and result workflow. It preserves the existing fields, formulas, schema, authorization, and internal `healthScore` contract. No threshold, recommendation, clinical, calibration, upload, photo, voice, or production behavior was invented.

Typed state distinguishes required, invalid numeric, non-finite, notes-length, unavailable-environment, sanitized server, and unknown fallback states. Zero and valid decimals are retained. Review shows every value and supports editing without data loss. Pending submission guards ordinary repeat activation; durable server idempotency is not claimed. Results distinguish scored, exact-lookup blocked/unscored, production-zone unavailable, recommendation unavailable, and failure states.

## Repository Boundaries

Sprint work is confined to approved biochemistry, validation, documentation, and planning paths. Extensive pre-existing 021-series auth/Supabase and 029-series work remains preserved and unstaged. The index is empty. No protected content, remote contact, migration, schema, auth/RLS, billing, deployment, push, PR, merge, or commit occurred.

## Evidence

Passed on 2026-07-27: Pack format check; Sprint 022 cases through `npm.cmd run test:domain`; JSON, roles, Supabase self-tests, static validation, lint, typecheck, `validate:local`, `validate:ci`, and `git diff --check`. The original project-root build attempt failed during page-data collection with OneDrive `UNKNOWN: unknown error, read`; an accepted non-OneDrive build was reported, but its exact workspace and output were not preserved in maintained evidence and are therefore not restated as proof here.

Sprint 022B later ran exactly one fresh bounded `npm.cmd run build` from `C:\Users\rrank\OneDrive\PNR Precision Performance`. It exited 0 in 14.6 seconds after compiling, checking types, generating 24 static pages, collecting build traces, and reporting the 27-route inventory. This exact later run supersedes the earlier root failure for current build classification; it does not erase the historical failure. The bounded local route-smoke follow-up was `NOT COMPLETED - interrupted or unavailable local smoke server startup`: the owned process launched on port 3222, readiness was not established, all three requests returned local `NotSupportedException`, and the owned process was stopped.

Executable assertions cover required fields, invalid and non-finite values, zero/decimals, optional and over-limit notes, normalization, selected review values, two server-error mappings, scored output, exact-lookup blocking, threshold blocking, and recommendation blocking. Source-string assertions cover the submitted-ref guard, pending label, review label, empty-notes label, and fixture-only wording exclusion. Edit retention, repeat-activation behavior, unavailable submission, remaining server-error mappings, and responsive/accessibility behavior are static/source contracts or manual inspection—not rendered interaction tests. Route inventory remains 27 routes; Sprint 022 adds no route.

Source/static inspection confirms labels, required/invalid association, focusable error summary, live pending/status messaging, keyboard-friendly order, text progress, non-colour state meaning, and responsive layout. The field-trial checklist covers phone/desktop, 200% zoom, keyboard and screen-reader-oriented inspection, timing, workflow cases, privacy-safe evidence, and observations.

Authenticated hosted and real-device cases are `NOT RUN - provider/auth dependency`; they are not inferred. No user action is required for local closeout. Later execution requires authorized non-identifying fixtures and a session, followed by the checklist in `docs/BIOCHEMISTRY_FIELD_TRIAL_022.md`.

## Residual Limitations

Client repeat prevention is not durable idempotency. Production thresholds, interpretation, pH/device rules, recommendations, upload/privacy design, hosted field acceptance, remote backup, deployment, and public reopening remain separate decisions. Sprint 023 requires its own Architect Pack and accepted data contracts.
