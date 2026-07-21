# Sprint 020B - Remote Biochemistry Verification

## Outcome

Production Supabase project reference `tagnbgkroihagjmvehlx` is structurally verified for the Sprint 013 biochemistry migration as of 2026-07-19.

The user explicitly authorized implementation and remote migration. The operator confirmed the target is production and backup/PITR is available.

## Execution Evidence

Initial catalog output was misread because the SQL Editor surfaced only the final failing post-apply lookup query. A transaction-wrapped attempt to apply migration `0009` then stopped at:

`ERROR: 42710: policy "biochemistry_lookup_values_read_authenticated" for table "biochemistry_lookup_values" already exists`

Builder instructed the operator not to rerun it. Because the submitted script used explicit `begin;` and `commit;`, the error aborted and rolled back that transaction. No forward fix, deletion, policy replacement, or further write was performed.

A focused read-only inventory proved that all expected migration objects already existed: five tables, three helper functions, seven indexes, and thirteen policies.

| Check | Actual | Expected |
|---|---:|---:|
| Tables with RLS | 5 | 5 |
| Policies | 13 | 13 |
| Total lookup rows | 1,774 | 1,774 |
| Carbs rows | 151 | 151 |
| pH Average rows | 521 | 521 |
| Salts rows | 801 | 801 |
| Urea rows | 301 | 301 |
| Duplicate lookup keys | 0 | 0 |

## Classification

Remote state is **fully applied and structurally verified**, not unapplied or partial. The historical command/hash that originally created the pre-existing objects cannot be recovered from SQL Editor evidence alone; verification is based on the expected object set, RLS/policy/index presence, exact lookup counts, and lookup-key uniqueness.

## Remaining Gate

No synthetic stable, horse, user, assignment, test, note, or upload record was created. Authenticated application persistence and cross-role RLS smoke still require separately approved synthetic fixture ownership and credentials. Sprint 021 owns definitive role/RLS proof.

No deployment, commit, push, PR, Stripe action, public reopening, destructive rollback, or production customer-data mutation occurred.