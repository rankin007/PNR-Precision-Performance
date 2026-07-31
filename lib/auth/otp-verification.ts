export type OtpVerificationFacts = {
  email: string;
  token: string;
  hasError?: boolean;
  hasSession?: boolean;
  hasUser?: boolean;
};

export function normalizeOtpEmail(email: string) {
  return email.trim();
}

export function classifyOtpVerification(facts: OtpVerificationFacts): "accepted" | "invalid" {
  if (!normalizeOtpEmail(facts.email) || !/^\d{6}$/.test(facts.token.trim())) return "invalid";
  return !facts.hasError && facts.hasSession && facts.hasUser ? "accepted" : "invalid";
}
