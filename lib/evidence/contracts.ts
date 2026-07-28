export const EVIDENCE_MAX_BYTES = 5 * 1024 * 1024;
export const EVIDENCE_MAX_FILES_PER_TEST = 10;
export const EVIDENCE_MAX_TEST_BYTES = 30 * 1024 * 1024;
export const EVIDENCE_ACKNOWLEDGEMENT =
  "I confirm that I am authorised to upload this evidence and that it is relevant to this test.";

export const evidenceCategories = ["jpeg", "png", "pdf", "csv"] as const;
export type EvidenceCategory = (typeof evidenceCategories)[number];
export const evidenceStates = [
  "initiated", "upload_pending", "uploaded_unverified", "legacy_unverified",
  "validation_failed", "scan_pending", "sanitisation_pending", "available",
  "blocked", "failed", "soft_deleted", "restore_pending", "purge_pending",
  "purged", "object_missing",
] as const;
export type EvidenceState = (typeof evidenceStates)[number];

export type SafeEvidenceResult<T = undefined> =
  | { ok: true; value: T }
  | { ok: false; code: "denied" | "invalid" | "unavailable" | "conflict" | "temporary" };

export type UploadRequest = {
  testId: string;
  displayName: string;
  declaredMime: string;
  declaredBytes: number;
  acknowledgement: boolean;
  idempotencyKey: string;
  duplicateConfirmed?: boolean;
  replacesId?: string;
};

export type SafeEvidenceMetadata = {
  id: string;
  displayName: string;
  category: EvidenceCategory;
  bytes: number;
  state: EvidenceState;
  version: number;
  createdAt: string;
  canDownload: boolean;
};
