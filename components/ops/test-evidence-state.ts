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
