# Sprint 012F - Builder Handoff Prompt

You are Builder for Sprint 012F - Public Under Construction Gate in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012F-public-under-construction-gate/requirements.md`
5. `planning/sprints/012F-public-under-construction-gate/blueprint.md`
6. `planning/sprints/012F-public-under-construction-gate/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant docs under `docs/`

## Mission

Hide the current public website from anonymous visitors and show only the supplied Thoroughbred image as the cover page, with `Under Construction` written prominently across the page and a safe sign-up/interest CTA.

The public must not be able to browse the real website until the user later authorizes reopening it.

## Guardrails

Do not delete current website source files.

Do not add persistent sign-up storage, a database table, a CRM, mailing-list integration, email API, or third-party data transmission unless the user explicitly approves it.

Do not expose `.env*` values, secrets, tokens, credentials, private keys, passwords, connection strings, webhook payloads with sensitive values, or secret fragments.

Do not change auth, RLS, schema, Stripe reconciliation, billing, production data, DNS, Vercel settings, Supabase state, or webhook behavior beyond safely blocking public checkout initiation.

Do not deploy, push, or create a PR unless explicitly authorized.

## Suggested Execution

1. Record branch, commit, and dirty status.
2. Inspect public routes and current guards.
3. Copy `C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg` into the active app `public/` folder.\n4. Implement a reversible holding cover page at `/` using the copied Thoroughbred image with `Under Construction` written across it.
5. Hide or redirect `/home`, `/shop`, `/shop/*`, and `/contact`.
6. Block `/api/checkout` from public checkout creation while under construction.
7. Add noindex/nofollow metadata for the holding surface.
8. Keep protected/admin/operator routes protected.
9. Validate lint, TypeScript, build, image rendering, and local route smoke.
10. Write `docs/PUBLIC_UNDER_CONSTRUCTION_012F.md` with route behavior, cover image asset path, and reopening notes.
11. Update planning/status/briefing.
12. Stop before production deployment unless the user explicitly authorizes deployment.

## Closeout Standard

At close, the next Architect should know:

- whether the public website is hidden locally behind the Thoroughbred under-construction cover
- what routes are allowed and blocked
- whether checkout is blocked
- whether any sign-up storage decision remains open
- validation status
- whether production deployment was performed or still needs explicit user authorization
