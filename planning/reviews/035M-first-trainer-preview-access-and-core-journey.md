# Sprint 035M Review — First Trainer Preview Access And Core Journey

**Outcome:** `trainer-access-validation-blocked-clean`

## Candidate identity

- Branch: `codex/035M-first-trainer-preview-access-and-core-journey`
- Baseline: `ea8417d3c7450f25c90644f23d8558c9f5938552`
- Candidate SHA: `b1bf770dc6ab3839cfc24c53563f6ed6310e08ba`
- Exact-source Preview: `dpl_6NBk2VKPZZUS4QqdstqDHtGk8EVV`
- Preview URL: `https://pnr-precision-performance-e7691a6bn-rankin007s-projects.vercel.app`

## Delivered and validated

The approved trainer journey candidate implements truthful fail-closed horse access across every existing consumer, portal-specific participant-email suppression, bounded navigation/action handoff, and exact Preview callback-origin construction. Preview callback construction uses only Vercel's deployment-provided `VERCEL_URL` when `VERCEL_ENV` is `preview`; production and other configured environments retain `NEXT_PUBLIC_SITE_URL`, and local development retains the localhost fallback.

The 72-check target remains 58 local executable/static checks plus 14 rendered Preview checks. All 58 local checks passed. Maintained Sprint 021AH and 022/022B regressions, JSON, domain, roles, Supabase self-test, static validation, TypeScript, lint, local validation, production build, approved-path verification, diff/whitespace checks, and secret/private-data scans passed. Local and remote candidate SHAs matched. The exact-source deployment reached Ready, was non-production, and was not promoted or manually aliased.

## Material boundary

The repository's governing Supabase records establish the production Site URL and the sole accepted callback as `https://precisionperformance.com.au/auth/callback`. The exact Preview callback is therefore not accepted by the existing policy. Satisfying that boundary would require a Supabase callback configuration mutation, which Sprint 035M expressly forbids.

No fixture was created and no trainer attempt began. The 14 rendered authenticated Preview checks and the eight-step private human journey were not completed. No trainer identity, protected value, credential, session material, or identifier was requested, inspected, transferred, retained, or recorded.

## Lifecycle and cleanup

No Sprint-owned Supabase Auth, application, Storage, callback, alias, DNS, provider, or production data state was created. The Builder-owned local development process was stopped at closeout. Production deployment, Site URL, aliases, DNS, providers, Supabase configuration, production data, `develop`, and unrelated external state remained unchanged.

## Next authority required

A future 035 follow-up may proceed only with explicit, narrowly bounded authority for a temporary exact-Preview Supabase callback allowlist entry and dependency-safe removal after acceptance, or with an approved equivalent authentication mechanism that preserves the same privacy and security boundaries. Core Product Done is false.
