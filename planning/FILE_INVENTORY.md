# File Inventory

This inventory is for Sprint 001 readiness orientation. Builder should update it after inspection.

---

## Core App Areas

- `app/` - Next.js App Router pages, route groups, and API routes.
- `components/` - UI components and section/layout helpers.
- `lib/` - Supabase, Stripe, auth, runtime, navigation, and domain helpers.
- `supabase/` - Supabase config, migrations, bootstrap SQL.
- `content/` - product requirements and source planning documents from the earlier app build.

---

## 120x Planning Layer

- `AGENTS.md` - canonical agent rules.
- `planning/STATE.md` - current status and implementation authorization.
- `planning/DECISIONS.md` - durable decisions.
- `planning/DOMAIN.md` - product and sprint context.
- `planning/RISKS.md` - active risks.
- `planning/QUESTIONS.md` - open questions.
- `planning/sprints/` - active and historical sprint scope.
- `planning/architect-packs/` - pack storage and pack command instructions.
- `docs/WORKFLOW_PROFILE.md` - workflow rigor profiles.
- `docs/ARCHITECT_BRIEFING_SPEC.md` - sprint-close briefing format.

---

## Source Material

- `references/client-docs/PNR and RJR EPP Working Information/` - client/source documents moved into the reference area.

---

## Cleanup Candidates For Sprint 001 Inspection

Builder may inspect and archive confirmed stale/misdirecting candidates into `references/archive/sprint-001-cleanup/`.

Candidate list:

- `.logs/` - likely generated logs.
- `.release-main/` - likely release/export artifact; inspect before moving.
- `build/` - likely generated build artifact; inspect before moving.
- `desktop.ini` - Windows metadata file.
- `tsconfig.tsbuildinfo` - TypeScript incremental build cache.
- `ORCHESTRATOR.docx` - likely duplicate/legacy document now superseded by 120x planning and `ORCHESTRATOR.md`; inspect before moving.
- `ORCHESTRATOR-export.docx` - likely duplicate/export artifact; inspect before moving.
- top-level `PNR and RJR EPP Working Information/` - should be empty after source materials were moved; confirm before handling.

Do not archive without approval in Sprint 001:

- `.git/`
- `.github/`
- `.vercel/`
- `.next/`
- `node_modules/`
- `app/`
- `components/`
- `lib/`
- `supabase/`
- `content/`
- `references/client-docs/`
- `package.json`
- `package-lock.json`
- environment files
