# Sprint 001 Cleanup Manifest

## Summary

Sprint 001 inspected the approved cleanup candidates and attempted archive moves under `references/archive/sprint-001-cleanup/`.

Windows/OneDrive denied access while moving several cloud-managed or locked files, especially inside `.release-main/` and top-level generated/metadata files. No force-delete was attempted. Items that still exist at the project root should be treated as inspected but not fully archived.

## Archive Results

| Original path | Archived path | Result | Reason | Classification |
|---|---|---|---|---|
| `.logs/` | `references/archive/sprint-001-cleanup/.logs/` | Partial/duplicated; source still present | Old dev-server logs; Windows denied file move for log files. | Generated/stale |
| `.release-main/` | `references/archive/sprint-001-cleanup/.release-main/` | Partial/duplicated; source still present | Release/export snapshot with duplicated app, `.git`, `node_modules`, and docs; Windows denied many nested file moves. | Superseded/duplicate/generated |
| `build/` | `references/archive/sprint-001-cleanup/build/` | Partial/duplicated; source still present | Generated Next.js build output. | Generated |
| `desktop.ini` | Not archived | Left in place | Windows metadata file; move denied. | Generated/metadata |
| `tsconfig.tsbuildinfo` | Not archived | Left in place | TypeScript incremental build cache; move denied. | Generated/cache |
| `ORCHESTRATOR.docx` | Not archived | Left in place | Legacy/export document likely superseded by Markdown/planning layer; move denied. | Superseded/duplicate |
| `ORCHESTRATOR-export.docx` | Not archived | Left in place | Legacy/export document likely superseded by Markdown/planning layer; move denied. | Superseded/duplicate |
| `PNR and RJR EPP Working Information/` | `references/archive/sprint-001-cleanup/PNR and RJR EPP Working Information/` | Partial/duplicated; source still present | Top-level source-material folder is empty; canonical copy under `references/client-docs/` contains 22 files. | Empty/superseded |

## Validation Logs

Validation wrapper logs are stored in:

`references/archive/sprint-001-cleanup/validation-logs/`

Known logs:

- `20260711-122855.stdout.log` / `.stderr.log` - bounded lint run.
- `20260711-122902.stdout.log` / `.stderr.log` - bounded build run.

## Follow-Up Cleanup Guidance

Use an elevated or OneDrive-aware cleanup pass if these items must be physically moved or removed later. Do not force-delete the source paths during Sprint 001; the sprint rule was archive, not delete.
