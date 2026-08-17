export type OtpVerificationFacts = {
  email: string;
  token: string;
  hasError?: boolean;
  hasSession?: boolean;
  hasUser?: boolean;
};

export type OtpVerificationDiagnostic =
  | "expired"
  | "invalid"
  | "already-used"
  | "email-mismatch"
  | "malformed"
  | "rate-limited"
  | "provider/configuration"
  | "unknown";

type SafeOtpError = {
  code?: unknown;
  message?: unknown;
  status?: unknown;
} | null;

export function normalizeOtpEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizeOtpToken(token: string) {
  return token.trim();
}

export function isValidOtpToken(token: string) {
  return /^\d{6}$/.test(normalizeOtpToken(token));
}

export function classifyOtpVerificationInput(
  input: Pick<OtpVerificationFacts, "email" | "token">,
): "valid" | "invalid" {
  return normalizeOtpEmail(input.email) && isValidOtpToken(input.token) ? "valid" : "invalid";
}

export function classifyOtpVerification(facts: OtpVerificationFacts): "accepted" | "invalid" {
  if (classifyOtpVerificationInput(facts) === "invalid") return "invalid";
  return !facts.hasError && facts.hasSession && facts.hasUser ? "accepted" : "invalid";
}

export function classifyOtpVerificationError(error: SafeOtpError): OtpVerificationDiagnostic {
  if (!error) return "unknown";

  const code = typeof error.code === "string" ? error.code.toLowerCase() : "";
  const message = typeof error.message === "string" ? error.message.toLowerCase() : "";
  const status = typeof error.status === "number" ? error.status : 0;
  const safe = `${code} ${message}`;

  if (status === 429 || /rate.?limit|too many/.test(safe)) return "rate-limited";
  if (/expired/.test(safe)) return "expired";
  if (/already.?used|used.*token|token.*used/.test(safe)) return "already-used";
  if (/email.*mismatch|mismatch.*email|different email/.test(safe)) return "email-mismatch";
  if (/malformed|format|six.?digit/.test(safe)) return "malformed";
  if (/provider|smtp|configuration|configured|disabled/.test(safe) || status >= 500) return "provider/configuration";
  if (/invalid|otp_expired|token/.test(safe) || status === 400 || status === 422) return "invalid";
  return "unknown";
}

export function buildOtpVerificationPayload(emailInput: string, tokenInput: string) {
  return {
    email: normalizeOtpEmail(emailInput),
    token: normalizeOtpToken(tokenInput),
    type: "email" as const,
  };
}
