export type EvidenceUiState = "idle" | "selected" | "uploading" | "checking" | "blocked" | "error";
export type EvidenceUiEvent = { type: "select" | "start" | "transferred" | "blocked" | "error" | "cancel" };
export function evidenceUiReducer(_state: EvidenceUiState, event: EvidenceUiEvent): EvidenceUiState {
  switch (event.type) {
    case "select": return "selected";
    case "start": return "uploading";
    case "transferred": return "checking";
    case "blocked": return "blocked";
    case "error": return "error";
    case "cancel": return "idle";
  }
}

export const evidenceStatusCopy = {
  initiated: ["Initiated", "Upload setup has started but no file is available."],
  upload_pending: ["Transfer pending", "A private transfer is pending completion."],
  uploaded_unverified: ["Transferred, unavailable", "Transfer is complete; safety approval has not occurred."],
  legacy_unverified: ["Unavailable legacy evidence", "This evidence has not passed the required safety process."],
  validation_failed: ["Validation failed", "The file did not pass validation and is unavailable."],
  scan_pending: ["Safety check pending", "The file remains unavailable while safety checks are pending."],
  sanitisation_pending: ["Safety processing pending", "The file remains unavailable while safety processing is pending."],
  available: ["Available", "The evidence is approved for authorised access."],
  blocked: ["Blocked and unavailable", "Transfer is complete, but approved safety services are unavailable."],
  failed: ["Upload failed", "The upload did not complete. A new safe attempt may be made."],
  soft_deleted: ["Deleted, restorable", "The evidence is deleted and may be eligible for a restore request."],
  restore_pending: ["Restore requested", "An authorised restore decision is pending."],
  purge_pending: ["Purge pending", "Governed removal is pending verified Storage deletion."],
  purged: ["Purged", "Governed removal is complete."],
  object_missing: ["File unavailable", "The expected private Storage object is unavailable."],
} as const;

export function safeEvidenceStatus(state: string) {
  return evidenceStatusCopy[state as keyof typeof evidenceStatusCopy]
    ?? ["Status unavailable", "The evidence state is unexpected. No action is available."];
}
