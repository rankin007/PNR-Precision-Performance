# Sprint 020G Cutover And Rollback

Status: Sprint 020G closed candidate-ready; production cutover not performed and remains unauthorized. This is a retained pre-cutover draft only.

- Old rollback project: tagnbgkroihagjmvehlx
- New candidate: uvskssaecdhxcgytkasc
- Joint maintenance owners: Randell Rankin and Philip Rankin
- Joint rollback owners: Randell Rankin and Philip Rankin
- Public under-construction gate: must remain active

Before cutover, record the maintenance window, environment scopes, protected secret owners, deployment/restart steps, smoke owner/checklist, rollback triggers, rollback time limit, and old-project retention period.

Rollback changes protected application environment references back to tagnbgkroihagjmvehlx and reloads the deployment only if separately approved. It never merges candidate data into or mutates the old project.

Current stop: Vercel/environment changes, deployment/restart, and production cutover require a later approved sprint after Sprint 021 authenticated RLS/application proof, controlled fixture cleanup, maintenance readiness, and smoke planning pass. No cutover claim is implied by candidate-ready status.
