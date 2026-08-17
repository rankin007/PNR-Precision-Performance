"use server";

import { requirePortalAppContext } from "@/lib/auth/app-context";
import { governedPurge, initiateUpload, lifecycleMutation, listEvidence, requestDownload, resolveEvidenceActor } from "@/lib/evidence/server/repository";
import type { UploadRequest } from "@/lib/evidence";

async function actorFor(testId: string) {
  const context = await requirePortalAppContext(`/data-entry/biochemistry/${testId}`);
  return resolveEvidenceActor(testId, context.appUserId, {
    primaryRole: context.primaryRole,
    permissionCodes: context.permissionCodes,
  });
}

export async function initiateEvidenceUpload(input: UploadRequest) {
  const actor = await actorFor(input.testId);
  return actor ? initiateUpload(actor, input) : { ok: false as const, code: "denied" as const };
}
export async function finaliseEvidenceUpload(testId: string, uploadId: string) { const actor = await actorFor(testId); return actor ? lifecycleMutation(actor, "finalise", uploadId) : { ok: false as const, code: "denied" as const }; }
export async function cancelEvidenceUpload(testId: string, uploadId: string) { const actor = await actorFor(testId); return actor ? lifecycleMutation(actor, "cancel", uploadId) : { ok: false as const, code: "denied" as const }; }
export async function listTestEvidence(testId: string) { const actor = await actorFor(testId); return actor ? listEvidence(actor) : []; }
export async function requestEvidenceDownload(testId: string, uploadId: string) { const actor = await actorFor(testId); return actor ? requestDownload(actor, uploadId) : { ok: false as const, code: "denied" as const }; }
export async function replaceEvidence(input: UploadRequest, predecessorId: string) {
  const actor = await actorFor(input.testId);
  return actor ? initiateUpload(actor, { ...input, replacesId: predecessorId }) : { ok: false as const, code: "denied" as const };
}
export async function softDeleteEvidence(testId: string, uploadId: string) { const actor = await actorFor(testId); return actor ? lifecycleMutation(actor, "soft_delete", uploadId) : { ok: false as const, code: "denied" as const }; }
export async function requestEvidenceRestore(testId: string, uploadId: string) { const actor = await actorFor(testId); return actor ? lifecycleMutation(actor, "request_restore", uploadId) : { ok: false as const, code: "denied" as const }; }
export async function executeEvidenceRestore(testId: string, uploadId: string) { const actor = await actorFor(testId); return actor ? lifecycleMutation(actor, "restore", uploadId) : { ok: false as const, code: "denied" as const }; }
export async function createEvidenceHold(testId: string, uploadId: string) { const actor = await actorFor(testId); return actor ? lifecycleMutation(actor, "create_hold", uploadId) : { ok: false as const, code: "denied" as const }; }
export async function releaseEvidenceHold(testId: string, uploadId: string) { const actor = await actorFor(testId); return actor ? lifecycleMutation(actor, "release_hold", uploadId) : { ok: false as const, code: "denied" as const }; }
export async function purgeEvidence(testId: string, uploadId: string) { const actor = await actorFor(testId); return actor ? governedPurge(actor, uploadId) : { ok: false as const, code: "denied" as const }; }
