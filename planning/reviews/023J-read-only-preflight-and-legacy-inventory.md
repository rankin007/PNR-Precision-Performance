# Sprint 023J — Read-Only Preflight And Legacy Inventory

## Authenticated SQL Editor aggregate preflight — 29 July 2026

Builder used the authenticated Supabase SQL Editor visibly scoped to exact project `uvskssaecdhxcgytkasc`, organisation `rankin007's Org`, project `Precision Performance Clean Rebuild`, primary database and postgres role. One bounded statement batch began with `BEGIN TRANSACTION READ ONLY`, selected only counts and classification maps, and ended with explicit `ROLLBACK`. The editor returned one aggregate result row and no error. No row-identifying field or payload was selected.

Exact legacy inventory:

- total `0`; live `0`; deleted `0`;
- category, content-type and extension maps empty;
- all size bands `0`, including invalid/zero and over-5-MiB;
- missing test `0`; missing horse `0`; cross-scope `0`;
- deletion disagreement `0`; ambiguous photo `0`; CSV `0`; invalid category `0`;
- duplicate storage-path groups `0`; and
- prospective migration `0018` inventory-gate discrepancies `0`.

Prospective collision inventory:

- evidence table collisions `0`;
- upload-column collisions `0`;
- evidence index collisions `0`;
- lineage-trigger collisions `0`;
- migration `0018` function collisions `0`;
- hosted-contract function collisions `0`;
- public evidence-policy collisions `0`; and
- Storage evidence-policy collisions `0`.

Exact zero state:

- Auth users `0`;
- application users `0`;
- aggregate operational application rows `0`;
- Storage buckets total `0`;
- `test-evidence` buckets `0`;
- Storage objects total `0`; and
- `test-evidence` objects `0`.

Classification: `remote-preflight-passed-clean`. Combined with the prior exact target/region/health and remote ledger `0001`–`0017` proof, the detailed legacy, prospective schema/function/policy collision, Auth/application/Storage zero-state and bucket/object preflight now passes. No migration, DDL, DML, Storage action, resource creation, configuration change, deployment, repair, reset or other mutation occurred.

## Resumed read-only preflight after operator link — 29 July 2026

The supported Supabase link now resolves exactly to `uvskssaecdhxcgytkasc`. Using pinned Supabase CLI `2.110.0`, read-only project metadata returned exactly one linked project with reference `uvskssaecdhxcgytkasc`, organisation identifier `hohxquwkfehiuyrysufu`, name `Precision Performance Clean Rebuild`, region `ap-southeast-1` and status `ACTIVE_HEALTHY`. The protected old project `tagnbgkroihagjmvehlx` was unlinked and was not queried for application data.

Read-only migration listing passed: remote history is exactly contiguous `0001`–`0017`, once each; local `0018` is pending; no remote `0018+`, failed, repair or unknown entry was reported.

Aggregate public-table statistics reported estimated row count `0` for the legacy upload table and operational user, member, stable, horse, test, note and assignment tables. Maintained lookup/catalogue/history rows were visible only as aggregate estimates and are not synthetic fixture conflicts. These planner estimates are supporting evidence, not the exact count-only legacy or zero-state gate.

The exact schema/collision, legacy breakdown, Auth, Storage bucket/object and application zero-state gate remains unproven. The linked pooler marker contains no password, no `psql` client or protected direct-query binding is available, and the CLI schema-only dump failed before producing schema because its bundled dump path requires an unavailable Docker engine/Postgres image. The deprecated record-count command returned index statistics rather than exact row counts. No filename, object path, email, horse/client name, row payload or secret was retrieved.

Outcome: `remote-preflight-access-blocked-clean`. This is a tooling/credential-boundary stop, not an observed ledger, schema, legacy-row, Storage or data conflict. No migration, SQL mutation, Storage command, deployment, configuration change, synthetic fixture action, repair, reset or push occurred.

### Manual intervention

1. **Blocked/not working:** exact count-only schema/collision, legacy inventory and Auth/application/Storage zero-state checks cannot be executed through the linked CLI alone in this environment.
2. **Evidence checked:** exact link identity and region passed; remote ledger `0001`–`0017` passed; aggregate public estimates support zero operational rows; schema-only dump failed because Docker is unavailable; the linked pooler URL has no embedded password; no direct query client/binding is available.
3. **Exact action required:** approved operator Phillip N Rankin must provide a protected, non-emitting direct SQL execution path for this exact linked project, such as enabling the supported local Docker/Postgres tooling used by Supabase CLI or an approved protected query mechanism. Do not paste or expose a password, database URI, service key or result payload.
4. **Steps:** (1) remain in `C:\tmp\pnr-023j-provider-remote-storage-and-hosted-proof`; (2) keep the link fixed to `uvskssaecdhxcgytkasc`; (3) enable a supported query client that consumes the credential through a protected prompt/keychain, or confirm an approved dashboard SQL path; (4) do not run migrations, `db push`, repair/reset, Storage create/delete, row cleanup or deployment; (5) report only that the protected read-only query path is ready.
5. **Builder verification afterward:** rerun exact-target and ledger checks, execute only identifier/count-producing preflight SQL, verify legacy breakdown and inventory-gate discrepancies, schema/function/policy/bucket collisions, Auth/application/Storage zero, then stop on any discrepancy without remediation.

## Historical pre-link attempt

Target identity preflight partially passed after corrected authority: read-only Supabase project listing and Vercel project inspection agreed with the named project/team, Singapore region and healthy/unlinked state. No secret or environment value was read.

Database/Storage preflight did not begin. Official Supabase CLI documentation confirms remote migration listing requires a linked project or a database URL/password. The isolated worktree is unlinked, and no approved protected mechanism was available to inject the database credential without exposing it or writing unapproved linkage/configuration. Therefore remote ledger 0001–0017, schema collisions, legacy count-only inventory, real-data classification, bucket/policy conflicts and synthetic zero-state remain unproven. No payload, row, filename, object or Auth data was accessed, and no remote mutation occurred.
