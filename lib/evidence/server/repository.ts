import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { EvidenceUploadIntent, SafeEvidenceMetadata, SafeEvidenceResult, UploadRequest } from "../contracts";
import { deleteVerifyAndComplete, type StorageWorkItem } from "../storage-operations";

export type EvidenceActor = { appUserId: string; testId: string; horseId: string; stableId: string };

export async function resolveEvidenceActor(testId: string, appUserId: string | null): Promise<EvidenceActor | null> {
  if (!appUserId || !testId) return null;
  const db = await createSupabaseServerClient();
  const { data } = await db.from("biochemistry_tests").select("id,horse_id,stable_id").eq("id", testId).is("deleted_at", null).maybeSingle();
  if (!data?.stable_id) return null;
  return { appUserId, testId: data.id, horseId: data.horse_id, stableId: data.stable_id };
}

type InitiationRow = { attempt_id: string; upload_id: string; bucket_id: "test-evidence"; object_key: string; expires_at: string };

export async function initiateUpload(actor: EvidenceActor, input: UploadRequest): Promise<SafeEvidenceResult<EvidenceUploadIntent>> {
  if (!input.acknowledgement || input.testId !== actor.testId || input.declaredBytes < 1 || input.declaredBytes > 5 * 1024 * 1024) return { ok: false, code: "invalid" };
  if (/\.csv$/i.test(input.displayName) || ["text/csv", "application/csv"].includes(input.declaredMime)) return { ok: false, code: "unavailable" };
  const db = await createSupabaseServerClient();
  const { data, error } = await db.rpc("initiate_test_evidence_upload", {
    p_test_id: actor.testId, p_declared_name: input.displayName,
    p_declared_mime: input.declaredMime, p_declared_bytes: input.declaredBytes,
    p_idempotency_key: input.idempotencyKey, p_acknowledgement: input.acknowledgement,
    p_replaces_id: input.replacesId ?? null,
  });
  const row = (Array.isArray(data) ? data[0] : null) as InitiationRow | null;
  if (error || !row || row.bucket_id !== "test-evidence" || !row.object_key.startsWith("v1/")) return { ok: false, code: "unavailable" };
  const admin = createSupabaseAdminClient();
  const signed = await admin.storage.from(row.bucket_id).createSignedUploadUrl(row.object_key, { upsert: false });
  if (signed.error || !signed.data?.token) {
    await db.rpc("mutate_test_evidence_lifecycle", { p_operation: "cancel", p_upload_id: row.upload_id, p_test_id: actor.testId });
    return { ok: false, code: "unavailable" };
  }
  return { ok: true, value: {
    attemptId: row.attempt_id, uploadId: row.upload_id, bucket: row.bucket_id,
    key: row.object_key, token: signed.data.token, expiresAt: row.expires_at,
  } };
}

export async function listEvidence(actor: EvidenceActor): Promise<SafeEvidenceMetadata[]> {
  const db = await createSupabaseServerClient();
  const { data, error } = await db.from("biochemistry_test_uploads")
    .select("id,display_name,file_category,size_bytes,state,version_no,created_at")
    .eq("test_id", actor.testId).eq("horse_id", actor.horseId).eq("stable_id", actor.stableId)
    .neq("state", "purged").order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []).map((row) => ({ id: row.id, displayName: row.display_name,
    category: row.file_category, bytes: row.size_bytes, state: row.state,
    version: row.version_no, createdAt: row.created_at, canDownload: row.state === "available" } as SafeEvidenceMetadata));
}

export async function requestDownload(actor: EvidenceActor, uploadId: string): Promise<SafeEvidenceResult<{ url: string; expiresIn: 60 }>> {
  const db = await createSupabaseServerClient();
  const { data } = await db.from("biochemistry_test_uploads").select("bucket_id,object_key,state")
    .eq("id", uploadId).eq("test_id", actor.testId).eq("horse_id", actor.horseId).eq("stable_id", actor.stableId).eq("state", "available").maybeSingle();
  if (!data?.bucket_id || !data.object_key) return { ok: false, code: "denied" };
  const { data: signed, error } = await db.storage.from(data.bucket_id).createSignedUrl(data.object_key, 60);
  return error || !signed ? { ok: false, code: "unavailable" } : { ok: true, value: { url: signed.signedUrl, expiresIn: 60 } };
}

export async function lifecycleMutation(actor: EvidenceActor, operation: string, uploadId: string): Promise<SafeEvidenceResult> {
  const db = await createSupabaseServerClient();
  const { error } = await db.rpc("mutate_test_evidence_lifecycle", { p_operation: operation, p_upload_id: uploadId, p_test_id: actor.testId });
  return error ? { ok: false, code: "denied" } : { ok: true, value: undefined };
}

type PurgeRow = { bucket_id: string | null; object_key: string | null; state: string };
type ReconciliationRow = { attempt_id: string; upload_id: string; test_id: string; bucket_id: string; object_key: string };

async function removeStorageObject(bucket: string, key: string) {
  const admin = createSupabaseAdminClient();
  const { error } = await admin.storage.from(bucket).remove([key]);
  return !error;
}

export async function governedPurge(actor: EvidenceActor, uploadId: string): Promise<SafeEvidenceResult> {
  const db = await createSupabaseServerClient();
  const authorised = await db.rpc("mutate_test_evidence_lifecycle", { p_operation: "purge", p_upload_id: uploadId, p_test_id: actor.testId });
  if (authorised.error) return { ok: false, code: "denied" };
  const selected = await db.from("biochemistry_test_uploads").select("bucket_id,object_key,state")
    .eq("id", uploadId).eq("test_id", actor.testId).eq("horse_id", actor.horseId).eq("stable_id", actor.stableId).maybeSingle();
  const row = selected.data as PurgeRow | null;
  if (selected.error || !row || row.state !== "purge_pending") return { ok: false, code: "temporary" };
  const admin = createSupabaseAdminClient();
  return deleteVerifyAndComplete(
    { uploadId, testId: actor.testId, bucket: row.bucket_id, key: row.object_key },
    {
      remove: removeStorageObject,
      complete: async () => {
        const result = await admin.rpc("complete_test_evidence_purge", { p_upload_id: uploadId, p_test_id: actor.testId });
        return !result.error && result.data === true;
      },
    },
  );
}

export async function reconcileBatch(limit = 25) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.rpc("reconcile_test_evidence_batch", { p_limit: Math.min(Math.max(limit, 1), 50) });
  if (error || !Array.isArray(data)) return { ok: false, processed: 0 };
  let processed = 0;
  let failed = false;
  for (const candidate of data as ReconciliationRow[]) {
    const work: StorageWorkItem = { uploadId: candidate.upload_id, testId: candidate.test_id, bucket: candidate.bucket_id, key: candidate.object_key };
    const result = await deleteVerifyAndComplete(work, {
      remove: removeStorageObject,
      complete: async () => {
        const completion = await admin.rpc("complete_test_evidence_compensation", { p_attempt_id: candidate.attempt_id, p_upload_id: candidate.upload_id });
        return !completion.error && completion.data === true;
      },
    });
    if (result.ok) processed += 1;
    else failed = true;
  }
  return { ok: !failed, processed };
}
