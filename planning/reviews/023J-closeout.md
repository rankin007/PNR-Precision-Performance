# Sprint 023J — Closeout

Latest outcome: `remote-candidate-ready-for-commit`. The unsupported application Data API query against `.schema("storage")` is removed; exposed schemas remain unchanged. Purge and expired compensation now perform Storage API deletion followed directly by service-role-only completion RPCs whose atomic `storage.objects` predicates reject completion while bytes/object metadata remain. Deletion or completion failure stays retryable and cannot report success; completed retries are idempotent. Replacement and prior two-phase corrections remain intact. Focused 023E/023J/correction tests, adversarial ledger, complete static/CI/local and maintained suites, JSON/domain/roles/Supabase self-tests, TypeScript, full ESLint, production builds, secret scan and `git diff --check` pass. The candidate remains unstaged and uncommitted with no remote mutation or deployment.

Prior resumed outcome: `remote-preflight-passed-clean`. In the authenticated SQL Editor for exact candidate `uvskssaecdhxcgytkasc`, one bounded aggregate-only batch ran inside `BEGIN TRANSACTION READ ONLY` and ended with `ROLLBACK`. Detailed legacy inventory, migration `0018` inventory discrepancies, prospective evidence table/column/index/trigger/function/policy collisions, exact Auth/application/Storage zero state and bucket/object inventory all returned zero.

Historical outcome: `remote-target-authority-blocked-clean`.

Resumed outcome after corrected authority: `remote-preflight-conflict-blocked-clean` because required database/Storage preflight state cannot be established through the available protected credential boundary. This records an unproven preflight, not an observed ledger/data/schema conflict.

Sprint 023K supersedes the Singapore-region portion of this blocker: `ap-southeast-1` Singapore is now approved and region alone no longer blocks 023J. The outcome remains blocked on the independently missing exact target/Vercel mapping, non-production/synthetic-only classification, operator/rollback authority, provider/privacy suitability and Storage-object recovery method.

Subsequent authority supplied on 28 July 2026 resolves the Supabase identity/classification, operator, rollback owner, provider/privacy suitability and Storage recovery decision. One target conflict remains: `precisionperformance.com.au` is established repository-wide as the live production alias and cannot serve as the named preview environment.

The authority owner subsequently corrected the Vercel designation to the Vercel `Preview` environment using a generated `*.rankin007s-projects.vercel.app` deployment URL with no custom domain and confirmed exclusive mapping to Supabase `uvskssaecdhxcgytkasc`. The earlier target-authority blocker is therefore superseded for read-only preflight. This historical closeout remains the record of the original stop; later 023J evidence governs the resumed result.

The exact clean baseline, ancestry, required outcomes, candidate ledger and isolated worktree passed. Work stopped before external access because the exact authorised non-production Supabase/Vercel target and mutation authority are absent or ambiguous.

## Manual intervention

1. **Blocked/not working:** Sprint 023J cannot perform read-only remote preflight, local hosted-contract completion or any external mutation without the named-target authority contract.
2. **Evidence checked:** baseline/outcomes/ledger/isolation passed; repository records show existing Supabase projects are `ap-southeast-1` Singapore; no exact 023J non-production Supabase/Vercel mapping, synthetic-only declaration, operator/rollback approval, provider suitability or Storage-object recovery method exists.
3. **Exact action required:** the Aprec8 authority owner must replace the Vercel preview-environment value with an actual Vercel Preview environment designation that is not `precisionperformance.com.au`, `www.precisionperformance.com.au`, or another production alias.
4. **Steps:** (1) in Vercel, identify the `Preview` environment for team `rankin007's projects`, project `pnr-precision-performance`; (2) confirm it has no production custom domain/alias; (3) provide the environment designation, for example `Vercel Preview environment — generated *.rankin007s-projects.vercel.app deployment URL, no custom domain`; (4) reconfirm it maps only to Supabase project `uvskssaecdhxcgytkasc`; (5) do not supply or expose environment values/secrets.
5. **Builder verification afterward:** cross-check the corrected Preview environment and Supabase target through two read-only sources, prove no production alias and exact Singapore/synthetic state, recheck official provider documents and recovery method, then perform only the count-only preflight. Any production mapping, real data, ledger, collision or recovery discrepancy stops without mutation.

No source, migration, package or dependency change; no stage/commit; and no remote access, migration, Storage, Vercel, deployment, push, merge or synthetic fixture action occurred.

## Resumed-preflight manual intervention

1. **Blocked/not working:** safe target identity checks pass, but the required remote migration ledger, schema/collision, count-only legacy inventory and zero-state checks require database access; the worktree is unlinked and no non-emitting protected database credential binding is available.
2. **Evidence checked:** Supabase CLI directly confirms the exact project/organisation/region/healthy status; Vercel CLI confirms the team/project; official CLI documentation says remote migration listing requires a linked project or protected database URL/password; no ledger/schema/data query ran.
3. **Exact action required:** approved operator Phillip N Rankin must link this exact isolated worktree to project `uvskssaecdhxcgytkasc` using Supabase's supported interactive protected password prompt, without sharing or echoing the database password in conversation, command history, logs or files.
4. **Steps:** (1) open a local terminal in `C:\tmp\pnr-023j-provider-remote-storage-and-hosted-proof`; (2) confirm the branch is `codex/023J-provider-remote-storage-and-hosted-proof`; (3) run the installed Supabase CLI link command for project reference `uvskssaecdhxcgytkasc`; (4) enter the database password only into the CLI's protected interactive prompt; (5) do not run `db push`, migration repair/reset, SQL editor actions or any other command; (6) report only that linking succeeded or the sanitized error category—never the password or connection URI.
5. **Builder verification afterward:** verify the safe linked project reference/region, ensure no secret-bearing file is tracked, run only count/identifier-safe ledger/schema/legacy/zero-state preflight, and stop without mutation on any mismatch, real data, partial 023E object, unknown migration or recovery discrepancy.

No local contract completion or migration 0019 work begins until that preflight passes.
