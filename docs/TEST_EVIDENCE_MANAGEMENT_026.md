# Sprint 026 — Test Evidence Management

Sprint 026 adds one authenticated evidence manager to the existing biochemistry result route. It lists only safe server-projected metadata, explains every lifecycle state without relying on colour, and presents only server-derived actions. Every mutation still passes through the established database lifecycle RPC, which rechecks the current user, test scope, horse scope, role, permission, timing and hold rules.

The manager supports new upload, cancellation and safe retry, exact-predecessor replacement, soft deletion, restore request and authorised restore, governance hold/release, and separately permissioned governed purge. Replacement is offered only for the active available predecessor. Failed or pending replacements do not displace that predecessor.

JPEG, PNG and PDF remain limited to 5 MiB per item, 10 items and 30 MiB per test. CSV remains disabled. The acknowledgement begins unchecked. Direct transfer remains signed and no-overwrite. Because no approved scanner or sanitiser exists, transferred evidence remains blocked and unavailable; the manager provides no preview, download, signed-read or availability affordance.

The wording describes Singapore processing as overseas from Australia and keeps retention/removal role controlled. Controls have 44 px minimum targets, visible global focus treatment, pending locks, explicit consequence confirmations, polite live announcements and post-mutation focus recovery. Layout uses wrapping grids and break-safe metadata for narrow screens and zoom/reflow. Browser rendering was not required to establish these deterministic contracts; executable source/markup assertions and a successful production build were used as substitute proof.

Validation uses only synthetic fixture classifications. `npm run test:evidence-026` checks exhaustive known and unexpected states, redaction, capability rules, purge separation/hold denial, replacement lineage, disabled download/preview paths, upload constraints, confirmation/pending/live-region/touch contracts and privacy wording. Maintained Sprint 022 and Sprint 023 evidence suites remain green.
