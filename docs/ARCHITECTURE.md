# Architecture

Architecture notes for the existing implementation should stay evidence-backed. Sprint 011 adds planning-level target modules for the expanded trainer-ready Done definition; it does not implement them.

## Known Tech Stack

- Next.js, React, and TypeScript for the app surface.
- Supabase PostgreSQL, Supabase Auth, and Supabase Storage as the expected data/auth/storage platform.
- Vercel for frontend hosting.
- GitHub for source control.
- Stripe is included as a payment system for the commercial workflow, with final launch catalogue/pricing still requiring confirmation.

## Existing Product Foundations

Current project evidence includes public pages, portal routes, data-entry routes, admin routes, shop/checkout/webhook surfaces, horses, daily records, feeding logs, track sessions, products, orders, payments, roles, and RLS foundations.

Sprints 003-010 hardened the MVP shell and deployed it to production, but Sprint 010 live acceptance remains partial.

## Forward Architecture Modules

The full Done target requires these future modules to be designed deliberately before implementation:

| Module | Purpose | Notes |
|---|---|---|
| Test capture | Mobile trainer workflow for per-horse biochemistry tests. | Must support under-60-second submission, structured confirmation, and assigned-horse access. |
| Uploads/storage | Photos, PDFs, and supporting evidence attached to test records. | Needs Supabase Storage bucket design, allowed types, retention, signed access, and audit rules. |
| Voice notes | Voice-to-text or approved fallback notes attached to tests. | Provider, permissions, correction flow, and manual fallback remain open. |
| Scoring | Hydration Score and Health Score calculation. | Must wait for approved formulas and zone thresholds. |
| Recommendations/Table of Knowledge | Editable recommendation scaffold and result-specific outputs. | Must avoid placeholder production guidance unless explicitly accepted. |
| Trends/reporting | Line charts, AM/PM filters, saved chart favorites, and zone history panel. | May require chart preference records and score/recommendation snapshots. |
| Role/access/audit | Trainer, owner, vet, stable staff, admin, assigned-horse access, and correction/upload audit. | Must preserve no cross-stable visibility and RLS boundaries. |

## Planning Constraints

- Do not infer formulas from example prose.
- Do not treat OCR/photo recognition as automatic MVP scope until explicitly approved.
- Require trainer confirmation before any automatically extracted value affects scoring.
- Keep score and recommendation snapshots on test records so history remains stable if formulas or Table of Knowledge content changes later.
- Preserve Sprint 010 live acceptance blockers as production readiness work, not as evidence of full Done.

## Sprint 023D Test-Evidence Design

The approved design is in `docs/TEST_EVIDENCE_UPLOAD_ARCHITECTURE_023D.md`; its local candidate implementation is documented in `docs/TEST_EVIDENCE_UPLOAD_IMPLEMENTATION_023E.md`. Sprint 023E adds candidate migration 0018, typed fail-closed modules, server boundaries, Cron authentication and focused UI without applying schema/Storage or enabling availability.

Australian storage is a pre-production evidence gate: the actual project must be verified as Sydney `ap-southeast-2`; `ap-southeast-1` is Singapore. Separate Storage-object recovery evidence is required because database backups exclude object bytes. Sprint 023D creates no bucket, policy, migration, route, dependency, secret or runtime behavior.
