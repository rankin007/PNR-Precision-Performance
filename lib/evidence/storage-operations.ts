import type { SafeEvidenceResult } from "./contracts";

export type StorageWorkItem = {
  uploadId: string;
  testId: string;
  bucket: string | null;
  key: string | null;
};

export type StorageOperationDependencies = {
  remove: (bucket: string, key: string) => Promise<boolean>;
  complete: () => Promise<boolean>;
};

export async function deleteVerifyAndComplete(
  work: StorageWorkItem,
  dependencies: StorageOperationDependencies,
): Promise<SafeEvidenceResult> {
  if (work.bucket || work.key) {
    if (work.bucket !== "test-evidence" || !work.key?.startsWith("v1/")) return { ok: false, code: "denied" };
    if (!(await dependencies.remove(work.bucket, work.key))) return { ok: false, code: "temporary" };
  }
  return (await dependencies.complete())
    ? { ok: true, value: undefined }
    : { ok: false, code: "temporary" };
}
