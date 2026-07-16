# Sprint 012B - Production Source Provenance

## Status

Complete as a provenance investigation. No deployment was performed.

## Mission

Identify the exact source state that produced the current live production behavior at `https://precisionperformance.com.au`, especially the deployed behavior that includes `/admin/commerce`.

## Findings

Current production deployment:

- Deployment id: `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`
- Deployment URL: `https://pnr-precision-performance-7j3jqvvw7-rankin007s-projects.vercel.app`
- Target: production
- Status: Ready
- Aliases: `precisionperformance.com.au`, `www.precisionperformance.com.au`, `pnr-precision-performance.vercel.app`, `pnr-precision-performance-rankin007s-projects.vercel.app`, `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`
- Vercel JSON output confirms deployed paths include `admin/commerce` and `admin/commerce.rsc`.

Source provenance:

- Vercel JSON metadata did not include `gitSource`, commit, branch, ref, or repository source fields.
- Sprint 009 docs record deployment from local branch/revision `develop` / `8bf310a` using Vercel CLI.
- Because clean `8bf310a` does not contain `/admin/commerce`, the production deployment cannot have been produced from clean committed `8bf310a` alone.
- The best available inference is that production was deployed from the local dirty workspace as it existed during Sprint 009.
- Exact byte-for-byte production source snapshot is not recoverable from the current non-secret metadata inspected in Sprint 012B.

## Candidate Comparison

| Candidate | Result |
|---|---|
| Current dirty workspace | Closest local match by route shape. Contains `/admin/commerce` and the same broad app surface as live production, but includes many dirty app/source changes and later Sprint 012 checkout edits/docs. |
| Clean `8bf310a` | Not production-equivalent. Missing `app/(admin)/admin/commerce`; clean build generated 22 routes in Sprint 012A. |
| `C:\tmp\pp-012a-clean-20260714-165007` | Not production-equivalent. It is `8bf310a` plus checkout fix only; missing `/admin/commerce`. |
| `.release-main` | Not production-equivalent. It is a clean `main` worktree at `5a70b6a`, contains `/admin/commerce`, but also contains extra routes not present in live production such as admin setup, onboarding, member-experience, platform-stack, preview-access, and additional data-entry horse routes. |
| Vercel deployment metadata | Confirms deployment id, aliases, runtime output, and route output including `/admin/commerce`; does not reveal source commit/snapshot. |

## Stop Conditions Honored

- No deployment was performed.
- No files were reverted or deleted.
- No production, DNS, database, Stripe, or Vercel project setting mutation was performed.
- Build logs were not inspected after the escalation reviewer rejected that path because logs can contain secrets.
- No secret values or environment values were printed or stored.

## Conclusion

A clean production baseline cannot be reconstructed from a committed revision currently available locally.

The current dirty workspace is the closest local production-source candidate, but it is not safe to deploy without explicit approval because it includes many unrelated app/source changes and later local edits.

## Recommended Next Action

Safest path: no deployment until a production-equivalent baseline is recovered or deliberately created.

Recommended narrow next sprint:

1. Create a production-baseline candidate from the current dirty workspace in a temporary tree.
2. Remove only known post-production planning/docs and local-only checkout experiment differences from that candidate.
3. Validate route parity against Vercel output, including `/admin/commerce`.
4. Add the checkout malformed POST fix on top.
5. Deploy only after the user explicitly approves the candidate source diff.

Fallback path: deploy current dirty source only with explicit approval that all included app/source changes are accepted.
