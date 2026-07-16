# Sprint 012E Repository Cleanup Manifest

Archive root: `references/archive/sprint-012e-repository-cleanup/`

No files were deleted. Items below were moved into the archive so they can be restored if needed.

## Archived Items

| Original path | Archived path | Classification | Reason | Tracked before move | Validation / inspection note |
|---|---|---|---|---|---|
| `ORCHESTRATOR.md` | `references/archive/sprint-012e-repository-cleanup/root-handoff/ORCHESTRATOR.md` | Superseded legacy handoff | Superseded by 120x planning layer and current sprint docs; root file could misdirect Sprint 013. | Yes | Non-runtime Markdown file; not referenced by app route inventory. |
| `ORCHESTRATOR.docx` | `references/archive/sprint-012e-repository-cleanup/root-handoff/ORCHESTRATOR.docx` | Superseded legacy handoff | Superseded by current planning/docs layer. | Yes | Non-runtime document; no app/source behavior role. |
| `ORCHESTRATOR-export.docx` | `references/archive/sprint-012e-repository-cleanup/root-handoff/ORCHESTRATOR-export.docx` | Superseded legacy handoff/export | Export duplicate of legacy handoff material. | Yes | Non-runtime document; no app/source behavior role. |
| `architect-chat-starter-prompt.md` | `references/archive/sprint-012e-repository-cleanup/root-handoff/architect-chat-starter-prompt.md` | Superseded starter prompt | Root-level starter prompt is no longer canonical; active method files live under `templates/`, `planning/`, and `AGENTS.md`. | No | Non-runtime Markdown file. |
| `project-start.md` | `references/archive/sprint-012e-repository-cleanup/root-handoff/project-start.md` | Superseded starter note | Root-level setup note is no longer canonical after 120x planning installation. | No | Non-runtime Markdown file. |
| `desktop.ini` | `references/archive/sprint-012e-repository-cleanup/root-metadata/desktop.ini` | OneDrive/Windows metadata | OS metadata at repo root is not project source. | No | No app/source behavior role; `.gitignore` now includes `desktop.ini`. |
| `tsconfig.tsbuildinfo` | `references/archive/sprint-012e-repository-cleanup/generated/tsconfig.tsbuildinfo` | Generated TypeScript cache | Incremental compiler cache should not sit as active source. | No, ignored | `*.tsbuildinfo` already ignored. |
| `.logs/` | `references/archive/sprint-012e-repository-cleanup/logs/.logs/` | Stale local logs | Old local dev-server logs from April 2026. | No | `.gitignore` now includes `.logs/`. |
| `.validation-logs/` | `references/archive/sprint-012e-repository-cleanup/logs/.validation-logs/` | Validation proof logs | Sprint 012D wrapper proof logs archived as evidence; future wrapper runs recreate ignored `.validation-logs/` as needed. | No, ignored | `.validation-logs/` already ignored. |
| `PNR and RJR EPP Working Information/` | `references/archive/sprint-012e-repository-cleanup/duplicate-client-docs/PNR and RJR EPP Working Information/` | Empty duplicate client-docs folder | Root folder was empty; canonical client-docs copy remains under `references/client-docs/PNR and RJR EPP Working Information/`. | No | Root folder listing returned no files; canonical references copy contains client documents. |

## Kept / Deferred Items

| Path | Classification | Decision | Reason |
|---|---|---|---|
| `.release-main/` | Legacy release snapshot with runtime source and nested `.git` | Needs user decision | Sprint 012E marks this inspection-only; it includes app/source, env examples, package files, and nested Git metadata. Do not move by assumption. |
| `.next/` | Generated Next.js output/cache | Ignore / leave in place | Validation/build can recreate it. Moving it before validation would be noisy and it may reappear immediately. |
| `build/` | Generated build output | Ignore / left in place | Initial archive move made stale generated `.ts` files visible under `references/` and TypeScript reported module-resolution errors. Move was reversed; root `build/` remains ignored by `.gitignore` and excluded by TypeScript. |

| `node_modules/` | Dependency install tree | Keep | Required for local validation; do not archive in cleanup sprint. |
| `.vercel/` | Local Vercel project metadata | Keep / inspection-only | Needed for deployment context; no values printed. |
| `.env*` | Environment files | Keep / do not inspect values | Sprint forbids archiving or exposing secrets. |
| `.120x/`, `.agents/`, `templates/`, `planning/`, `docs/`, `references/` | Active planning/method surfaces | Keep | Canonical workflow and evidence surfaces. |
| `.claude/`, `samples/` | Tooling/sample material | Needs user decision | Non-runtime-looking, but not clearly stale enough to move by assumption. |

## Safety Confirmations

- No deletion was performed.
- No `.env*` files were archived.
- No secret values or fragments were printed or stored.
- No runtime source under `app/`, `components/`, `lib/`, `supabase/`, or `scripts/` was moved.
- No schema, auth, RLS, Stripe, checkout, webhook, deployment, DNS, or production settings were changed.
