import type { EvidenceState } from "./contracts";

const transitions: Record<EvidenceState, readonly EvidenceState[]> = {
  initiated: ["upload_pending", "failed"],
  upload_pending: ["uploaded_unverified", "failed", "object_missing"],
  uploaded_unverified: ["validation_failed", "scan_pending", "object_missing"],
  legacy_unverified: ["scan_pending", "blocked", "object_missing", "soft_deleted"],
  validation_failed: ["failed"],
  scan_pending: ["sanitisation_pending", "blocked", "failed", "object_missing"],
  sanitisation_pending: ["available", "blocked", "failed", "object_missing"],
  available: ["soft_deleted", "object_missing"],
  blocked: ["purge_pending", "soft_deleted"],
  failed: [],
  soft_deleted: ["restore_pending", "purge_pending"],
  restore_pending: ["available", "legacy_unverified", "soft_deleted"],
  purge_pending: ["purged", "object_missing"],
  purged: [],
  object_missing: ["failed", "purge_pending"],
};

export function canTransition(from: EvidenceState, to: EvidenceState) {
  return transitions[from].includes(to);
}

export function isVisible(state: EvidenceState) {
  return state === "available";
}

export function countsTowardQuota(state: EvidenceState, replacedByAvailable = false) {
  if (state === "purged") return false;
  if ((state === "failed" || state === "validation_failed") && !replacedByAvailable) return false;
  if (state === "soft_deleted" && replacedByAvailable) return false;
  return true;
}

export function assertTransition(from: EvidenceState, to: EvidenceState) {
  if (!canTransition(from, to)) throw new Error("Evidence transition is not permitted.");
}
