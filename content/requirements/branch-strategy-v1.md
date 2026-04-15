# Branch Strategy V1

This document records the active Git workflow for the project.

## Branch Roles

- `main` is the protected production branch
- `develop` is the shared integration branch
- `feature/*` branches are short-lived work branches cut from `develop`
- `release/*` branches are optional stabilization branches if needed later

## Expected Flow

1. Create feature work from `develop`
2. Open pull requests into `develop`
3. Verify CI and review before merge
4. Promote stable work from `develop` into `main`

## Notes

- all remotes and branch history for this project must stay inside the new `rankin007` GitHub account
- external platform setup should reference `main` for production and may reference `develop` for preview or integration workflows later
