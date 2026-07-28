import "server-only";
import { randomUUID } from "node:crypto";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { SafeEvidenceMetadata, SafeEvidenceResult, UploadRequest } from "../contracts";

export type EvidenceActor = { appUserId: string; testId: string; horseId: string; stableId: string };

export async function resolveEvidenceActor(testId: string, appUserId: string | null): Promise<EvidenceActor | null> {
  if (!appUserId || !testId) return null;
  const db = await createSupabaseServerClient();
  const { data } = await db.from("biochemistry_tests").select("id,horse_id,stable_id").eq("id", testId).is("deleted_at", null).maybeSingle();
  if (!data?.stable_id) return null;
  return { appUserId, testId: data.id, horseId: data.horse_id, stableId: data.stable_id };
}

export async function initiateUpload(actor: EvidenceActor, input: UploadRequest): Promise<SafeEvidenceResult<{ attemptId: string; bucket: string; key: string; expiresAt: string }>> {
  if (!input.acknowledgement || input.testId !== actor.testId || input.declaredBytes < 1 || input.declaredBytes > 5 * 1024 * 1024) return { ok: false, code: "invalid" };
  if (/\.csv$/i.test(input.displayName) || input.declaredMime === "text/csv") return { ok: false, code: "unavailable" };
  const attemptId = randomUUID();
  const key = `v1/${randomUUID()}/${randomUUID()}`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const db = await createSupabaseServerClient();
  const { error } = await db.rpc("initiate_test_evidence_upload", {
    p_attempt_id: attemptId, p_test_id: actor.testId, p_declared_name: input.displayName,
    p_declared_mime: input.declaredMime, p_declared_bytes: input.declaredBytes,
    p_idempotency_key: input.idempotencyKey, p_object_key: key,
  });
  return error ? { ok: false, code: "unavailable" } : { ok: true, value: { attemptId, bucket: "test-evidence", key, expiresAt } };
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

export async function reconcileBatch(limit = 25) {
  const db = createSupabaseAdminClient();
  const { data, error } = await db.rpc("reconcile_test_evidence_batch", { p_limit: Math.min(Math.max(limit, 1), 50) });
  return { ok: !error, processed: Array.isArray(data) ? data.length : 0 };
}
