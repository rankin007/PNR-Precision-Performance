# Sprint 020F Supabase Preservation Decisions

Status: decisions required. These are stop gates for any Sprint 020G replacement.

1. Business/data owner: decide whether every repository-defined public table is preserved, and approve encrypted export, restore validation, retention, downtime, and recovery objectives.
2. Supabase project administrator: choose the supported Auth migration/continuity approach, including users, identities, MFA and password/session consequences.
3. Supabase project administrator: provide a protected Storage bucket/object/config inventory and decide what must be preserved.
4. Secret custodian: approve rotation/re-entry for project keys, SMTP/provider credentials and Vault values without placing values in Git or conversation.
5. Business owner: decide whether client_applications contains retained business records.
6. Integration owner: decide whether etrakka_sessions and etrakka_biochem_comparison are retained, migrated, or retired.
7. Domain owner: decide how horse_biochemistry_results maps to the Sprint 013 model, including validation of historical meaning.
8. Product/data owner: decide whether horse_gallery_items and its underlying files are retained.
9. Data owner: confirm public."Test User" and its sequence contain no required data or dependencies before accepting remove-legacy.
10. Technical owner: select migration-history strategy: fresh baseline in a replacement project or an explicitly reviewed history reconciliation. Replaying/repairing 0001-0009 against production is not authorized.
11. Security owner: decide remediation scope for the advisor findings before 020G, especially etrakka_biochem_comparison SECURITY DEFINER, client_applications permissive policies, callable SECURITY DEFINER helpers, and leaked-password protection.

For every decision, return the owner, selected treatment, protected source of truth, validation method, and rollback/recovery requirement. Builder will then verify that all unknown-stop items are resolved, create no destructive command until a separately approved 020G pack exists, and require a disposable rebuild plus recovery rehearsal.
