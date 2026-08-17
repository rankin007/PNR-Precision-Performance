export type OtpEntryMode = "request" | "requested" | "existing-code";

export type OtpEntryTransition = {
  mode: OtpEntryMode;
  effect: "none" | "send";
};

export function initialOtpEntryMode(sent: boolean): OtpEntryMode {
  return sent ? "requested" : "request";
}

export function enterExistingCodeRecovery(): OtpEntryTransition {
  return { mode: "existing-code", effect: "none" };
}

export function enterRequestedCodeMode(): OtpEntryTransition {
  return { mode: "requested", effect: "send" };
}

export function isOtpEntryVisible(mode: OtpEntryMode) {
  return mode !== "request";
}

export function isOtpEmailReadOnly(mode: OtpEntryMode) {
  return mode === "requested";
}
